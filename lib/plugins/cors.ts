import { CtxHttp } from "../types";
import { sp } from "./utils";

export const cors = sp((opts = {}) => {
  const {
    origin = "*",
    maxAge = MAX_AGE_SECONDS,
    allowMethods = ALLOW_METHODS,
    allowHeaders = ALLOW_HEADERS,
    allowCredentials = true,
    exposeHeaders = [],
  } = opts;

  return (ctx: CtxHttp) => {
    const { req, res } = ctx;

    if (res.finished) {
      return ctx;
    }

    res.setHeader("Access-Control-Allow-Origin", origin);
    allowCredentials && res.setHeader("Access-Control-Allow-Credentials", "true");
    exposeHeaders.length && res.setHeader("Access-Control-Expose-Headers", exposeHeaders.join(","));

    if (req.method === "OPTIONS") {
      res.setHeader("Access-Control-Allow-Methods", allowMethods.join(","));
      res.setHeader("Access-Control-Allow-Headers", allowHeaders.join(","));
      res.setHeader("Access-Control-Max-Age", String(maxAge));
    }

    return ctx;
  };
});

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

// const cors = cors({});
// const router = router();

// s.map(cors).map(router)
