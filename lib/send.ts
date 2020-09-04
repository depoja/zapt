import { STATUS_CODES, ServerResponse } from "http";
import { Stream } from "stream";

const TYPE = "content-type";
const TYPES = {
  OSTREAM: "application/octet-stream",
  JSON: "application/json;charset=utf-8",
  TEXT: "text/plain",
};

type Data = string | object | Buffer | Stream;
type Obj = {
  [errorCode: number]: string | number | string[];
  [errorCode: string]: string | number | string[];
};

export default (res: ServerResponse, data: Data = {}, code = 200, headers: Obj = {}) => {
  const obj: Obj = {};

  for (const k in headers) {
    obj[k.toLowerCase()] = headers[k];
  }

  let type = obj[TYPE] || res.getHeader(TYPE);

  if (typeof data !== "string" && "pipe" in data) {
    res.setHeader(TYPE, type || TYPES.OSTREAM);
    return data.pipe(res);
  }

  if (data instanceof Buffer) {
    type = type || TYPES.OSTREAM; // prefer given
  }

  if (typeof data === "object") {
    data = JSON.stringify(data);
    type = type || TYPES.JSON;
  } else {
    data = data || STATUS_CODES[code]!;
  }

  obj[TYPE] = type || TYPES.TEXT;
  obj["content-length"] = Buffer.byteLength(data);

  res.writeHead(code, obj);
  res.end(data);
};
