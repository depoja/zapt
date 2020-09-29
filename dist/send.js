"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pipe = exports.getContent = void 0;
const stream_1 = require("stream");
exports.getContent = (obj) => {
    const data = obj || "";
    if (Buffer.isBuffer(data)) {
        return [data, "application/octet-stream"];
    }
    if (data instanceof stream_1.Readable || data.readable) {
        return [exports.pipe, "application/octet-stream"];
    }
    if (typeof data === "object" || typeof data === "number") {
        return [JSON.stringify(data), "application/json; charset=utf-8"];
    }
    return [data, "text/plain; charset=utf-8"];
};
exports.pipe = (r, s) => {
    const end = () => {
        s.destroy();
        if (!r.sent) {
            r.end();
            r.sent = true;
        }
    };
    s.on("data", (d) => r.sent ? end() : r.write(d.buffer.slice(d.byteOffset, d.byteOffset + d.byteLength)))
        .on("end", end)
        .on("error", end);
    r.onAborted(end);
};
