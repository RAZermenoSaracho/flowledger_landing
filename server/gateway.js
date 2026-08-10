import http from "node:http";
import httpProxy from "http-proxy";

const GATEWAY_PORT = 5182;
const LANDING_TARGET = "http://127.0.0.1:5181";
const APP_TARGET = "http://127.0.0.1:5173";
const REFRESH_TOKEN_COOKIE_NAME = "flowledger_refresh_token";
const LANDING_ASSETS_PREFIX = "/landing-assets/";

const proxy = httpProxy.createProxyServer({});

/** Checks the raw `Cookie` header for the refresh-token cookie's presence, without decoding or validating it. */
function hasRefreshTokenCookie(cookieHeader) {
  if (!cookieHeader) return false;
  return cookieHeader
    .split(";")
    .some((part) => part.trim().startsWith(`${REFRESH_TOKEN_COOKIE_NAME}=`));
}

const server = http.createServer((req, res) => {
  const path = req.url.split("?")[0];

  if (path.startsWith(LANDING_ASSETS_PREFIX)) {
    proxy.web(req, res, { target: LANDING_TARGET });
    return;
  }

  if (path === "/" && !hasRefreshTokenCookie(req.headers.cookie)) {
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

proxy.on("error", (error, _req, res) => {
  res.writeHead(502, { "Content-Type": "text/plain" });
  res.end(`Bad gateway: ${error.message}`);
});

server.listen(GATEWAY_PORT, () => {
  console.log(`FlowLedger gateway listening on port ${GATEWAY_PORT}`);
});
