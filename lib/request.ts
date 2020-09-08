import { HttpRequest, HttpResponse } from "uWebSockets.js";
import { parse } from "url";

import { json } from "./parsers";
import { Request, Headers } from "./types";

export default (_req: HttpRequest, _res: HttpResponse) => {
  const req: Request = {
    body: () => json(_res),
    method: () => _req.getMethod(),
    header: (key) => _req.getHeader(key),
    headers: () => {
      const all: Headers = {};
      _req.forEach((k, v) => (all[k] = v));
      return all;
    },
    param: (index) => _req.getParameter(index),
    url: () => parse(_req.getUrl(), true),
  };

  return req;
};
