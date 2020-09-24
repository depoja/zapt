"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const codes_1 = __importDefault(require("./codes"));
exports.default = (_msg, _code) => {
    const code = _code || 500;
    const msg = _msg || codes_1.default[code];
    const err = new Error(msg);
    err.code = code;
    return err;
};
