"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = __importDefault(require("./handler"));
// TODO: Return instance from each route, so we can chain routes app.get().get()
exports.default = (app, hook) => {
    return {
        any: (p, h) => app.any(p, handler_1.default(p, h, hook)),
        delete: (p, h) => app.del(p, handler_1.default(p, h, hook)),
        get: (p, h) => app.get(p, handler_1.default(p, h, hook)),
        options: (p, h) => app.options(p, handler_1.default(p, h, hook)),
        patch: (p, h) => app.patch(p, handler_1.default(p, h, hook)),
        post: (p, h) => app.post(p, handler_1.default(p, h, hook)),
        put: (p, h) => app.put(p, handler_1.default(p, h, hook)),
    };
};
