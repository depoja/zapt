import { HttpResponse } from "uWebSockets.js";

import codes from "./codes";
import { Response, Headers, Codes } from "./types";
import { getContent } from "./send";

export default (_: HttpResponse) => {
  const writeHeaders = (headers: Headers = {}) => {
    for (let key in headers) {
      const value = headers[key];
      value && _.writeHeader(key, value);
    }
  };

  let headers = {};
  let status: keyof Codes = 200;

  const res: Response = {
    header: (key: string, value: string) => ((headers = { ...headers, [key]: value }), res),
    headers: (values = {}) => ((headers = { ...headers, ...values }), res),
    status: (value = 200) => ((status = value), res),
    send: (data, s, h) => {
      if (!_.sent) {
        s && res.status(s);
        h && res.headers(h);
        const [content, type] = getContent(data);

        _.cork(() => {
          _.writeStatus(`${status} ${codes[status]}`);
          writeHeaders({ "Content-Type": type, ...headers });

          if (typeof content === "function") {
            content(_, data);
          } else {
            _.end(content);
            _.sent = true;
          }
        });
      }
    },
  };

  return res;
};
