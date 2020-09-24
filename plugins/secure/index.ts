import { PluginFn, Headers } from "../../lib";

export const secure: PluginFn = (_, opts = {}) => {
  return (_, res) => {
    const h: Headers = {};

    const {
      html = false,
      cacheControl,
      contentTypeOptions,
      contentSecurityPolicy,
      featurePolicy,
      frameOptions,
      referrerPolicy,
      strictTransportSecurity,
    } = opts;

    // API Headers
    h["Cache-Control"] = cacheControl ?? "no-store";
    h["Content-Security-Policy"] = contentSecurityPolicy ?? "frame-ancestors 'none'";
    h["Strict-Transport-Security"] = strictTransportSecurity ?? "max-age=300; includeSubDomains";
    h["X-Content-Type-Options"] = contentTypeOptions ?? "nosniff";
    h["X-Frame-Options"] = frameOptions ?? "DENY";

    // HTML Specific Headers
    if (html) {
      h["Content-Security-Policy"] = contentSecurityPolicy ?? "default-src 'none'";
      h["Feature-Policy"] = featurePolicy ?? "'none'";
      h["Referrer-Policy"] = referrerPolicy ?? "no-referrer";
    }

    res.headers(h);
  };
};
