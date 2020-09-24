"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.json = void 0;
const const_1 = require("./const"); // TODO: Move to an option?
// TODO: Move to plugin & handle body of type text fails
exports.json = (res) => new Promise((resolve, reject) => {
    let data = Buffer.from([]);
    res.onData((chunk, isLast) => {
        data = Buffer.concat([data, Buffer.from(chunk)]);
        data.byteLength > const_1.MAX_BODY_SIZE && reject();
        if (isLast) {
            try {
                resolve(data.byteLength ? JSON.parse(data) : {});
            }
            catch (e) {
                reject();
            }
        }
    });
    res.onAborted(reject);
});
