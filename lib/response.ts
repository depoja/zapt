import { HttpResponse } from "uWebSockets.js";

import codes from "./codes";
import { Response, Headers } from "./types";

export default (_: HttpResponse) => {
  const writeHeaders = (headers: Headers = {}) => {
    for (let key in headers) {
      _.writeHeader(key, headers[key]);
    }
  };

  const res: Response = {
    _headers: {},
    headers: (values = {}) => (res._headers = { ...res._headers, ...values }),
    send: (data, code = 200, headers = {}) =>
      !res.sent &&
      _.cork(() => {
        const [content, type] = getContent(data);

        _.writeStatus(codes[code]);
        writeHeaders({ ...res._headers, "Content-Type": type, ...headers });
        _.end(content);
        res.sent = true;
      }),
  };

  return res;
};

const getContent = (data: any): [Buffer | string, string] =>
  Buffer.isBuffer(data)
    ? [data, "application/octet-stream"]
    : [json(data), "application/json; charset=utf-8"];

const json = (x: any) => {
  try {
    return JSON.stringify(x);
  } catch (err) {
    return "";
  }
};
