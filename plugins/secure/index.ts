import { PluginFn, Headers } from "../../lib";

export const cors: PluginFn = (_, opts = {}) => {
  return (req, res) => {
    const headers: Headers = {};

    const {
      contentTypeOptions = "nosniff",
      dnsPrefetchControl = "off", // "on", "off"
      frameOptions = "SAMEORIGIN", // "SAMEORIGIN", "DENY"
      referrerPolicy = "no-referrer", // "no-referrer", "no-referrer-when-downgrade", "same-origin", "origin", "strict-origin", "origin-when-cross-origin", "strict-origin-when-cross-origin", "unsafe-url"
    } = opts;

    headers["Referrer-Policy"] = referrerPolicy;

    headers["X-Content-Type-Options"] = contentTypeOptions;
    headers["X-DNS-Prefetch-Control"] = dnsPrefetchControl;
    headers["X-Frame-Options"] = frameOptions;

    // Legacy
    // X-Download-Options
    // X-Permitted-Cross-Domain-Policies
    // X-XSS-Protection

    res.headers(headers);
  };
};
