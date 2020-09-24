import { HttpRequest, HttpResponse } from "uWebSockets.js";

import error from "./error";
import getReq from "./request";
import getRes from "./response";
import { ErrorHandler, Handler } from "./types";

export default (path: string, handler: Handler, hooks: Handler) => {
  const pathParams = path
    .split("/")
    .reduce((_, p) => (p[0] === ":" ? { ..._, [p.slice(1)]: Object.keys(_).length } : _), {});

  return async (_res: HttpResponse, _req: HttpRequest) => {
    const req = getReq(_req, _res, pathParams);
    const res = getRes(_res);

    // In case response times-out (required by uws for async)
    _res.onAborted(() => serverError(req, res, error(undefined, 408)));

    try {
      await hooks(req, res);
      const result = await handler(req, res); // Add default error handler
      res.send(result);
    } catch (err) {
      serverError(req, res, err);
    }
  };
};

export const notFound: Handler = (req, res) => serverError(req, res, error(undefined, 404));

export const serverError: ErrorHandler = (_, res, err) =>
  res.send({ message: err.message || "Something went wrong" }, err.code || 500);
