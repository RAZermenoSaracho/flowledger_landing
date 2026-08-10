/**
 * Links into the FlowLedger web app. This landing page has no backend of
 * its own — every call to action ultimately points here. Paths are
 * same-origin relative paths (not absolute URLs): both the landing page
 * and the app are served from flowledger.razs.dev behind a gateway that
 * routes by path and login state, so an absolute cross-origin URL isn't
 * needed and would bypass that routing.
 */
export const appLinks = {
  login: "/login",
  register: "/register"
} as const;
