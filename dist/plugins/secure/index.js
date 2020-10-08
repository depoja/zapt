"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secure = void 0;
exports.secure = (_, opts = {}) => {
    return (_, res) => {
        const h = {};
        const { html = false, cacheControl, contentTypeOptions, contentSecurityPolicy, featurePolicy, frameOptions, referrerPolicy, strictTransportSecurity, } = opts;
        // API Headers
        h["Cache-Control"] = cacheControl !== null && cacheControl !== void 0 ? cacheControl : "no-store";
        h["Content-Security-Policy"] = contentSecurityPolicy !== null && contentSecurityPolicy !== void 0 ? contentSecurityPolicy : "frame-ancestors 'none'";
        h["Strict-Transport-Security"] = strictTransportSecurity !== null && strictTransportSecurity !== void 0 ? strictTransportSecurity : "max-age=300; includeSubDomains";
        h["X-Content-Type-Options"] = contentTypeOptions !== null && contentTypeOptions !== void 0 ? contentTypeOptions : "nosniff";
        h["X-Frame-Options"] = frameOptions !== null && frameOptions !== void 0 ? frameOptions : "DENY";
        // HTML Specific Headers
        if (html) {
            h["Content-Security-Policy"] = contentSecurityPolicy !== null && contentSecurityPolicy !== void 0 ? contentSecurityPolicy : "default-src 'none'";
            h["Feature-Policy"] = featurePolicy !== null && featurePolicy !== void 0 ? featurePolicy : "'none'";
            h["Referrer-Policy"] = referrerPolicy !== null && referrerPolicy !== void 0 ? referrerPolicy : "no-referrer";
        }
        res.headers(h);
    };
};
