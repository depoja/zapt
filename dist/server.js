"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uWebSockets_js_1 = require("uWebSockets.js");
const router_1 = __importDefault(require("./router"));
const handler_1 = require("./handler");
const utils_1 = require("./utils");
const createInstance = (server, scopes = utils_1.Scopes(), parent) => {
    const scope = scopes.create(parent);
    const router = router_1.default(server, async (...args) => {
        const plugins = scopes.plugins[scope] || (await scopes.loadPlugins(scope));
        for (const p of plugins) {
            p(...args);
        }
    });
    const inst = {
        ...router,
        use: (plugin, opts) => {
            const pinst = createInstance(server, scopes, scope);
            const definition = plugin(pinst, opts || {});
            const result = Promise.resolve(definition);
            scopes.register(scope, result);
            utils_1.exitOnTimeout(result);
            return inst;
        },
    };
    return inst;
};
exports.default = () => {
    const server = uWebSockets_js_1.App(); // TODO: Add options, example SSL (HTTPS) etc.
    const app = createInstance(server);
    app.listen = (port = 3000, cb) => {
        app.any("/*", handler_1.notFound);
        server.listen(port, (sock) => typeof cb == "function" && cb(!sock));
    };
    return app;
};
