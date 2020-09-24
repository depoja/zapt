"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const codes_1 = __importDefault(require("./codes"));
exports.default = (_) => {
    const writeHeaders = (headers = {}) => {
        for (let key in headers) {
            _.writeHeader(key, headers[key]);
        }
    };
    let headers = {};
    let sent = false;
    return {
        headers: (values = {}) => (headers = { ...headers, ...values }),
        send: (data, code = 200, headers = {}) => !sent &&
            _.cork(() => {
                const [content, type] = getContent(data);
                _.writeStatus(codes_1.default[code]);
                writeHeaders({ ...headers, "Content-Type": type, ...headers });
                _.end(content);
                sent = true;
            }),
    };
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
