"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
const querystring_1 = __importDefault(require("querystring"));
const parsers_1 = require("./parsers");
exports.default = (_req, _res, pathParams) => {
    let state = {};
    const param = (key) => {
        const i = pathParams[key];
        return typeof i === "number" ? _req.getParameter(i) : undefined;
    };
    return {
        body: () => parsers_1.json(_res),
        method: () => _req.getMethod(),
        header: (key) => _req.getHeader(key),
        headers: () => {
            const all = {};
            _req.forEach((k, v) => (all[k] = v));
            return all;
        },
        param,
        params: () => Object.keys(pathParams).reduce((_, k) => ({ ..._, [k]: param(k) }), {}),
        query: () => querystring_1.default.parse(_req.getQuery()),
        url: () => url_1.parse(_req.getUrl(), true),
        state: (...args) => (args.length > 1 ? (state[args[0]] = args[1]) : state[args[0]]),
    };
};
