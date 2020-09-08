import { PluginFn, Headers } from "../lib";

export const cors: PluginFn = (_, opts = {}) => {
  const {
    origin = "*",
    maxAge = MAX_AGE_SECONDS,
    allowMethods = ALLOW_METHODS,
    allowHeaders = ALLOW_HEADERS,
    allowCredentials = true,
    exposeHeaders = [],
  } = opts;

  return (req, res) => {
    const headers: Headers = {};

    headers["Access-Control-Allow-Origin"] = origin;
    allowCredentials && (headers["Access-Control-Allow-Credentials"] = "true");
    exposeHeaders.length && (headers["Access-Control-Expose-Headers"] = exposeHeaders.join(","));

    if (req.method() === "OPTIONS") {
      headers["Access-Control-Allow-Methods"] = allowMethods.join(",");
      headers["Access-Control-Allow-Headers"] = allowHeaders.join(",");
      headers["Access-Control-Max-Age"] = String(maxAge);
    }

    res.headers(headers);
  };
};

const MAX_AGE_SECONDS = 60 * 60 * 24; // 24 hours

const ALLOW_METHODS = ["POST", "GET", "PUT", "PATCH", "DELETE", "OPTIONS"];

const ALLOW_HEADERS = [
  "X-Requested-With",
  "Access-Control-Allow-Origin",
  "X-HTTP-Method-Override",
  "Content-Type",
  "Authorization",
  "Accept",
];
