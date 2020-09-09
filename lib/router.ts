import { TemplatedApp } from "uWebSockets.js";

import getHandler from "./handler";
import { Router, Handler } from "./types";

// TODO: Return instance from each route, so we can chain routes app.get().get()
export default (app: TemplatedApp, hook: Handler): Router => {
  return {
    any: (p, h) => app.any(p, getHandler(h, hook)),
    delete: (p, h) => app.del(p, getHandler(h, hook)),
    get: (p, h) => app.get(p, getHandler(h, hook)),
    options: (p, h) => app.options(p, getHandler(h, hook)),
    patch: (p, h) => app.patch(p, getHandler(h, hook)),
    post: (p, h) => app.post(p, getHandler(h, hook)),
    put: (p, h) => app.put(p, getHandler(h, hook)),
  };
};
