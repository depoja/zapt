"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = require("./const"); // TODO: Move to an option?
exports.default = (res, json = false) => new Promise((resolve, reject) => {
    let buffer;
    res.onData((chunk, isLast) => {
        const data = Buffer.from(chunk);
        buffer = buffer ? Buffer.concat([buffer, data]) : data;
        buffer.byteLength > const_1.MAX_BODY_SIZE && reject();
        if (isLast) {
            try {
                resolve(json ? JSON.parse(buffer) : buffer);
            }
            catch (e) {
                reject();
            }
        }
    });
    res.onAborted(reject);
});
