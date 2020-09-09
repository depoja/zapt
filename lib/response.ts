import { HttpResponse } from "uWebSockets.js";

import codes from "./codes";
import { Response, Headers } from "./types";

export default (_: HttpResponse): Response => {
  const writeHeaders = (headers: Headers = {}) => {
    for (let key in headers) {
      _.writeHeader(key, headers[key]);
    }
  };

  let headers = {};
  let sent = false;

  return {
    headers: (values = {}) => (headers = { ...headers, ...values }),
    send: (data, code = 200, headers = {}) =>
      !sent &&
      _.cork(() => {
        const [content, type] = getContent(data);
        _.writeStatus(codes[code]);
        writeHeaders({ ...headers, "Content-Type": type, ...headers });
        _.end(content);
        sent = true;
      }),
  };
};

const getContent = (data: any): [Buffer | string, string] =>
  // Buffer.isBuffer(data) ? [data, "application/octet-stream"] :
  typeof data === "string"
    ? [data, "text/plain; charset=utf-8"]
    : [json(data), "application/json; charset=utf-8"];

const json = (x: any) => {
  try {
    return JSON.stringify(x);
  } catch (err) {
    return "";
  }
};
