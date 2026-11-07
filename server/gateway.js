import http from "node:http";
import httpProxy from "http-proxy";

const GATEWAY_PORT = Number(process.env.GATEWAY_PORT ?? 5182);
const LANDING_TARGET = process.env.LANDING_TARGET ?? "http://127.0.0.1:5181";
const APP_TARGET = process.env.APP_TARGET ?? "http://127.0.0.1:5173";
const SESSION_COOKIE_NAME = "flowledger_session";
const LANDING_ASSETS_PREFIX = "/landing-assets/";

const API_ORIGIN = "https://api-flowledger.razs.dev";
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' https://cdn.skypack.dev https://cdn.jsdelivr.net",
  `connect-src 'self' ${API_ORIGIN}`,
  "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
  `img-src 'self' ${API_ORIGIN} https://lh3.googleusercontent.com data:`,
  "frame-ancestors 'none'",
  "base-uri 'self'"
].join("; ");

const SECURITY_HEADERS = {
  "strict-transport-security": "max-age=300",
  "x-content-type-options": "nosniff",
  "referrer-policy": "strict-origin-when-cross-origin",
  "permissions-policy": "camera=(), microphone=(), geolocation=(), payment=()",
  "x-frame-options": "DENY",
  "content-security-policy-report-only": CONTENT_SECURITY_POLICY
};

const ROOT_CACHE_HEADERS = {
  "cache-control": "private, no-store",
  vary: "Cookie"
};

/** Requests for `/`, whose response depends on the cookie; recorded because the landing branch rewrites `req.url` before the upstream answers. */
const rootRequests = new WeakSet();

const proxy = httpProxy.createProxyServer({});

/**
 * Checks the raw `Cookie` header for the session presence cookie, which holds no credential.
 * It only picks which public shell loads; the app still validates every session.
 */
function hasSessionCookie(cookieHeader) {
  if (!cookieHeader) return false;
  return cookieHeader
    .split(";")
    .some((part) => part.trim().startsWith(`${SESSION_COOKIE_NAME}=`));
}

const server = http.createServer((req, res) => {
  const path = req.url.split("?")[0];

  if (path.startsWith(LANDING_ASSETS_PREFIX)) {
    proxy.web(req, res, { target: LANDING_TARGET });
    return;
  }

  if (path === "/") {
    rootRequests.add(req);
  }

  if (path === "/" && !hasSessionCookie(req.headers.cookie)) {
    // vite preview mounts the built landing site under its `base`
    // (/landing-assets/) and 302-redirects bare `/` to it. Rewriting the
    // upstream request path here keeps the client-visible URL at `/`
    // instead of surfacing that redirect.
    const query = req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : "";
    req.url = `${LANDING_ASSETS_PREFIX}${query}`;
    proxy.web(req, res, { target: LANDING_TARGET });
    return;
  }

  proxy.web(req, res, { target: APP_TARGET });
});

proxy.on("proxyRes", (proxyRes, req) => {
  Object.assign(proxyRes.headers, SECURITY_HEADERS);

  if (rootRequests.has(req)) {
    Object.assign(proxyRes.headers, ROOT_CACHE_HEADERS);
  }
});

proxy.on("error", (error, _req, res) => {
  console.error("Gateway upstream error", error.message);
  res.writeHead(502, { ...SECURITY_HEADERS, "content-type": "text/plain" });
  res.end("Bad gateway");
});

server.listen(GATEWAY_PORT, "127.0.0.1", () => {
  console.log(`FlowLedger gateway listening on 127.0.0.1:${GATEWAY_PORT}`);
});
