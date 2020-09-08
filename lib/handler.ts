import { HttpRequest, HttpResponse } from "uWebSockets.js";

import getReq from "./request";
import getRes from "./response";
import { Handler, Plugin } from "./types";

export default (handler: Handler, plugins: Plugin[]) => async (
  _res: HttpResponse,
  _req: HttpRequest
) => {
  const req = getReq(_req, _res);
  const res = getRes(_res);

  plugins.forEach((p) => p(req, res)); // TODO: Async plugins?

  try {
    const result = await Promise.resolve(handler(req, res)); // Add default error handler
    !res.sent && res.send(result);
  } catch (err) {
    !res.sent && res.send(err.message, 500); // TODO: Make default error handler editable
  }
};
