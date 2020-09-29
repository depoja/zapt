import { HttpRequest, HttpResponse } from "uWebSockets.js";
import { parse } from "url";
import qs from "querystring";

import bodyParser from "./parsers";
import { Request, Headers, State, RequestParams } from "./types";

export default (_req: HttpRequest, _res: HttpResponse, pathParams: RequestParams): Request => {
  let state = {} as State;

  const param = (key: string) => {
    const i = pathParams[key];
    return typeof i === "number" ? _req.getParameter(i) : undefined;
  };

  return {
    json: () => bodyParser(_res, true),
    body: () => bodyParser(_res),
    method: () => _req.getMethod(),
    header: (key: string) => _req.getHeader(key),
    headers: () => {
      const all: Headers = {};
      _req.forEach((k, v) => (all[k] = v));
      return all;
    },
    param,
    params: () => Object.keys(pathParams).reduce((_, k) => ({ ..._, [k]: param(k) }), {}),
    query: () => qs.parse(_req.getQuery()),
    url: () => parse(_req.getUrl(), true),
    state: (...args) => (args.length > 1 ? (state[args[0]] = args[1]) : state[args[0]]),
  };
};
