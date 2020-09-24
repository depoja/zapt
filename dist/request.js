"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
const parsers_1 = require("./parsers");
exports.default = (_req, _res) => {
    let state = {};
    return {
        body: () => parsers_1.json(_res),
        method: () => _req.getMethod(),
        header: (key) => _req.getHeader(key),
        headers: () => {
            const all = {};
            _req.forEach((k, v) => (all[k] = v));
            return all;
        },
        param: (index) => _req.getParameter(index),
        url: () => url_1.parse(_req.getUrl(), true),
        state: (...args) => (args.length > 1 ? (state[args[0]] = args[1]) : state[args[0]]),
    };
};
