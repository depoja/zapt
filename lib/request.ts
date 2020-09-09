import { HttpRequest, HttpResponse } from "uWebSockets.js";
import { parse } from "url";

import { json } from "./parsers";
import { Request, Headers, State } from "./types";

export default (_req: HttpRequest, _res: HttpResponse): Request => {
  let state = {} as State;

  return {
    body: () => json(_res),
    method: () => _req.getMethod(),
    header: (key: string) => _req.getHeader(key),
    headers: () => {
      const all: Headers = {};
      _req.forEach((k, v) => (all[k] = v));
      return all;
    },
    param: (index: number) => _req.getParameter(index),
    url: () => parse(_req.getUrl(), true),
    state: (...args) => (args.length > 1 ? (state[args[0]] = args[1]) : state[args[0]]),
  };
};
