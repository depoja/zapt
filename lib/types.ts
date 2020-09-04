import { IncomingMessage, ServerResponse } from "http";
import { ParsedUrlQuery } from "querystring";
import { HTTPMethod } from "find-my-way";

export type CtxHttp = {
  req: IncomingMessage;
  res: ServerResponse;
};

export type Params = ParsedUrlQuery & {
  [key: string]: any;
};

export type CtxRouter = CtxHttp & {
  params: Params;
  result?: any;
};

export type Route = (path: string, handler: Function) => flyd.Stream<CtxRouter>;
export type Method = HTTPMethod | HTTPMethod[];
