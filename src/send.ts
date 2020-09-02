import { STATUS_CODES, ServerResponse } from "http";
import { Stream } from "stream";

const TYPE = "content-type";
const OSTREAM = "application/octet-stream";

type Data = string | object | Buffer | Stream;
type Obj = {
  [errorCode: number]: string | number | string[];
  [errorCode: string]: string | number | string[];
};

export default (res: ServerResponse, code = 200, data: Data = "", headers: Obj = {}) => {
  const obj: Obj = {};

  for (const k in headers) {
    obj[k.toLowerCase()] = headers[k];
  }

  let type = obj[TYPE] || res.getHeader(TYPE);

  if (typeof data !== "string" && "pipe" in data) {
    res.setHeader(TYPE, type || OSTREAM);
    return data.pipe(res);
  }

  if (data instanceof Buffer) {
    type = type || OSTREAM; // prefer given
  }

  if (typeof data === "object") {
    data = JSON.stringify(data);
    type = type || "application/json;charset=utf-8";
  } else {
    data = data || STATUS_CODES[code]!;
  }

  obj[TYPE] = type || "text/plain";
  obj["content-length"] = Buffer.byteLength(data);

  res.writeHead(code, obj);
  res.end(data);
};
