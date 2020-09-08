import { HttpRequest, HttpResponse } from "uWebSockets.js";

import getReq from "./request";
import getRes from "./response";
import { ErrorHandler, Handler, Plugin } from "./types";

export default (handler: Handler, plugins: Plugin[]) => async (
  _res: HttpResponse,
  _req: HttpRequest
) => {
  const req = getReq(_req, _res);
  const res = getRes(_res);

  plugins.forEach((p) => p(req, res));

  try {
    const result = await Promise.resolve(handler(req, res)); // Add default error handler
    !res.sent && res.send(result);
  } catch (err) {
    !res.sent && serverError(req, res, err);
  }
};

export const notFound: Handler = (_, res) => {
  res.send({ message: "Not Foundaaa" }, 404);
};

export const serverError: ErrorHandler = (_, res, err) => {
  res.send({ message: err.message || "Something went wrong" }, err.code || 500);
};
