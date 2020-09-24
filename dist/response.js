"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const codes_1 = __importDefault(require("./codes"));
exports.default = (_) => {
    const writeHeaders = (headers = {}) => {
        for (let key in headers) {
            const value = headers[key];
            value && _.writeHeader(key, value);
        }
    };
    let headers = {};
    let status = 200;
    let sent = false;
    const res = {
        header: (key, value) => ((headers = { ...headers, [key]: value }), res),
        headers: (values = {}) => ((headers = { ...headers, ...values }), res),
        status: (value = 200) => ((status = value), res),
        send: (data, s, h) => {
            if (!sent) {
                s && res.status(s);
                h && res.headers(h);
                const [content, type] = getContent(data);
                _.cork(() => {
                    _.writeStatus(`${status} ${codes_1.default[status]}`);
                    writeHeaders({ "Content-Type": type, ...headers });
                    _.end(content);
                    sent = true;
                });
            }
        },
    };
    return res;
};
const getContent = (data) => 
// Buffer.isBuffer(data) ? [data, "application/octet-stream"] :
typeof data === "string"
    ? [data, "text/plain; charset=utf-8"]
    : [json(data), "application/json; charset=utf-8"];
const json = (x) => {
    try {
        return JSON.stringify(x);
    }
    catch (err) {
        return "";
    }
};
