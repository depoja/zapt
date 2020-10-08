"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cors = void 0;
const opts_1 = require("./opts");
// Reference implementation: https://github.com/rs/cors/blob/master/cors.go
exports.cors = (_, options) => {
    const o = cleanOptions(options);
    return (req, res) => {
        const origin = req.header("Origin");
        const method = req.method().toUpperCase();
        const headers = req.headers();
        const headerNames = Object.keys(headers);
        const preflight = method === "OPTIONS" && req.header("Access-Control-Request-Method");
        const originAllowed = o.allOrigins || o.allowedOrigins[origin];
        const methodAllowed = o.allMethods || o.allowedMethods[method];
        const headersAllowed = o.allHeaders || headerNames.every((h) => o.allowedHeaders[h]);
        const hdrs = {};
        // 1 - All Requests
        if (!originAllowed || !methodAllowed) {
            console.log(origin, o.allOrigins, o.allowedOrigins);
            console.log(method, o.allMethods, o.allowedMethods);
            return;
        }
        hdrs["Access-Control-Allow-Origin"] = o.allOrigins ? "*" : origin;
        o.allowCredentials && (hdrs["Access-Control-Allow-Credentials"] = "true");
        // 2 - Preflight Requests
        if (preflight) {
            hdrs["Vary"] = "Origin, Access-Control-Request-Method, Access-Control-Request-Headers";
            // Return if headers not allowed
            if (!headersAllowed) {
                return;
            }
            hdrs["Access-Control-Allow-Methods"] = method;
            headerNames.length && (hdrs["Access-Control-Allow-Headers"] = headerNames.join(", "));
            o.maxAge && (hdrs["Access-Control-Max-Age"] = String(o.maxAge));
            return res.status(204);
        }
        // 3 - Other Requests
        if (!preflight) {
            hdrs["Vary"] = "Origin";
            o.exposedHeaders.length &&
                (hdrs["Access-Control-Expose-Headers"] = o.exposedHeaders.join(", "));
        }
        res.headers(hdrs);
    };
};
const cleanOptions = (opts) => {
    const o = { ...opts_1.defaults, ...(opts || {}) };
    // Handle wildcards
    const allOrigins = o.allowedOrigins.includes("*");
    const allMethods = o.allowedMethods.includes("*");
    const allHeaders = o.allowedHeaders.includes("*");
    // Handle wildcard defaults
    const allowedOrigins = (allOrigins ? opts_1.all : o).allowedOrigins;
    const allowedMethods = (allMethods ? opts_1.all : o).allowedMethods;
    const allowedHeaders = (allHeaders ? opts_1.all : o).allowedHeaders;
    return {
        ...o,
        allOrigins,
        allMethods,
        allHeaders,
        // Lookup optimizations - convert to objects
        allowedOrigins: allowedOrigins.reduce((_, o) => ({ ..._, [o]: true }), {}),
        allowedMethods: allowedMethods.reduce((_, m) => ({ ..._, [m]: true }), {}),
        allowedHeaders: allowedHeaders.reduce((_, h) => ({ ..._, [h]: true }), {}),
    };
};
