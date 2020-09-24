"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverError = exports.notFound = void 0;
const error_1 = __importDefault(require("./error"));
const request_1 = __importDefault(require("./request"));
const response_1 = __importDefault(require("./response"));
exports.default = (path, handler, hooks) => {
    const pathParams = path
        .split("/")
        .reduce((_, p) => (p[0] === ":" ? { ..._, [p.slice(1)]: Object.keys(_).length } : _), {});
    return async (_res, _req) => {
        const req = request_1.default(_req, _res, pathParams);
        const res = response_1.default(_res);
        // In case response times-out (required by uws for async)
        _res.onAborted(() => exports.serverError(req, res, error_1.default(undefined, 408)));
        try {
            await hooks(req, res);
            const result = await handler(req, res); // Add default error handler
            res.send(result);
        }
        catch (err) {
            exports.serverError(req, res, err);
        }
    };
};
exports.notFound = (req, res) => exports.serverError(req, res, error_1.default(undefined, 404));
exports.serverError = (_, res, err) => res.send({ message: err.message || "Something went wrong" }, err.code || 500);
