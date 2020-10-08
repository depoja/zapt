"use strict";
// https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaults = exports.all = void 0;
exports.all = {
    allowCredentials: false,
    allowedHeaders: ["*"],
    allowedMethods: ["DELETE", "GET", "HEAD", "PATCH", "POST", "PUT"],
    allowedOrigins: ["*"],
    exposedHeaders: [],
    maxAge: 60 * 60 * 24,
};
exports.defaults = {
    ...exports.all,
    allowedHeaders: ["Origin", "Accept", "Content-Type", "X-Requested-With"],
    allowedMethods: ["GET", "HEAD", "POST"],
    allowedOrigins: [],
};
