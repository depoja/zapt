"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverError = exports.notFound = void 0;
const request_1 = __importDefault(require("./request"));
const response_1 = __importDefault(require("./response"));
exports.default = (handler, hooks) => async (_res, _req) => {
    const req = request_1.default(_req, _res);
    const res = response_1.default(_res);
    try {
        await hooks(req, res);
        const result = await Promise.resolve(handler(req, res)); // Add default error handler
        res.send(result);
    }
    catch (err) {
        exports.serverError(req, res, err);
    }
};
exports.notFound = (_, res) => {
    res.send({ message: "Not Foundaaa" }, 404);
};
exports.serverError = (_, res, err) => {
    res.send({ message: err.message || "Something went wrong" }, err.code || 500);
};
