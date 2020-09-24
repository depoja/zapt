import { TemplatedApp } from "uWebSockets.js";

import getHandler from "./handler";
import { Router, Handler } from "./types";

// TODO: Return instance from each route, so we can chain routes app.get().get()
export default (app: TemplatedApp, hook: Handler): Router => {
  return {
    any: (p, h) => app.any(p, getHandler(p, h, hook)),
    delete: (p, h) => app.del(p, getHandler(p, h, hook)),
    get: (p, h) => app.get(p, getHandler(p, h, hook)),
    options: (p, h) => app.options(p, getHandler(p, h, hook)),
    patch: (p, h) => app.patch(p, getHandler(p, h, hook)),
    post: (p, h) => app.post(p, getHandler(p, h, hook)),
    put: (p, h) => app.put(p, getHandler(p, h, hook)),
  };
};
