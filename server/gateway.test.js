import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import http from "node:http";
import { after, before, test } from "node:test";

const GATEWAY_PORT = 5992;
const LANDING_PORT = 5991;
const APP_PORT = 5990;
const UNUSED_PORT = 5989;
const upstreams = [];
let gateway;

function stub(name, port) {
  const server = http.createServer((req, res) => {
    res.setHeader("cache-control", "max-age=999");
    res.end(`${name}:${req.url}`);
  });
  upstreams.push(server);
  return new Promise((resolve) => server.listen(port, "127.0.0.1", resolve));
}

function startGateway(appPort) {
  return new Promise((resolve) => {
    gateway = spawn("node", ["server/gateway.js"], {
      env: {
        ...process.env,
        GATEWAY_PORT: String(GATEWAY_PORT),
        LANDING_TARGET: `http://127.0.0.1:${LANDING_PORT}`,
        APP_TARGET: `http://127.0.0.1:${appPort}`
      }
    });
    gateway.stdout.once("data", resolve);
  });
}

function stopGateway() {
  return new Promise((resolve) => {
    gateway.once("exit", resolve);
    gateway.kill();
  });
}

const get = (path, cookie) =>
  fetch(`http://127.0.0.1:${GATEWAY_PORT}${path}`, {
    headers: cookie ? { cookie } : {},
    redirect: "manual"
  });

before(async () => {
  await stub("landing", LANDING_PORT);
  await stub("app", APP_PORT);
  await startGateway(APP_PORT);
});

after(async () => {
  await stopGateway();
  for (const server of upstreams) server.close();
});

test("presence cookie routes / to the app", async () => {
  assert.equal(await (await get("/", "flowledger_session=1")).text(), "app:/");
});

test("no cookie routes / to landing with no redirect", async () => {
  const response = await get("/");

  assert.equal(response.status, 200);
  assert.equal(await response.text(), "landing:/landing-assets/");
});

test("a similar cookie name routes / to landing", async () => {
  assert.match(await (await get("/", "flowledger_session_x=1")).text(), /^landing:/);
});

test("the refresh cookie name doesn't route / to the app", async () => {
  assert.match(await (await get("/", "flowledger_refresh_token=x")).text(), /^landing:/);
});

test("/ isn't cacheable on either branch, and other paths keep upstream caching", async () => {
  for (const cookie of [undefined, "flowledger_session=1"]) {
    const response = await get("/", cookie);

    assert.equal(response.headers.get("cache-control"), "private, no-store");
    assert.equal(response.headers.get("vary"), "Cookie");
  }

  assert.equal((await get("/dashboard")).headers.get("cache-control"), "max-age=999");
});

test("every branch sets the security headers", async () => {
  for (const path of ["/", "/landing-assets/a.css", "/dashboard"]) {
    const { headers } = await get(path);

    assert.equal(headers.get("strict-transport-security"), "max-age=31536000");
    assert.equal(headers.get("x-content-type-options"), "nosniff");
    assert.equal(headers.get("x-frame-options"), "DENY");
    assert.match(headers.get("content-security-policy-report-only"), /frame-ancestors 'none'/);
  }
});

test("an upstream failure is a generic 502 with the security headers", async () => {
  await stopGateway();
  await startGateway(UNUSED_PORT);

  const response = await get("/dashboard");

  assert.equal(response.status, 502);
  assert.equal(await response.text(), "Bad gateway");
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
});
