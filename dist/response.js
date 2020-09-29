"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const codes_1 = __importDefault(require("./codes"));
const send_1 = require("./send");
exports.default = (_) => {
    const writeHeaders = (headers = {}) => {
        for (let key in headers) {
            const value = headers[key];
            value && _.writeHeader(key, value);
        }
    };
    let headers = {};
    let status = 200;
    const res = {
        header: (key, value) => ((headers = { ...headers, [key]: value }), res),
        headers: (values = {}) => ((headers = { ...headers, ...values }), res),
        status: (value = 200) => ((status = value), res),
        send: (data, s, h) => {
            if (!_.sent) {
                s && res.status(s);
                h && res.headers(h);
                const [content, type] = send_1.getContent(data);
                _.cork(() => {
                    _.writeStatus(`${status} ${codes_1.default[status]}`);
                    writeHeaders({ "Content-Type": type, ...headers });
                    if (typeof content === "function") {
                        content(_, data);
                    }
                    else {
                        _.end(content);
                        _.sent = true;
                    }
                });
            }
        },
    };
    return res;
};
