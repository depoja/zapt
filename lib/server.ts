import uws from "uWebSockets.js";

import { PLUGIN_TIMEOUT } from "./const";
import getHandler from "./handler";
import { Instace, Plugin } from "./types";
import { wait } from "./utils";

export default () => {
  const app = uws.App(); // TODO: Add options, example SSL (HTTPS) etc.

  const deps: Promise<Plugin | "timeout" | void>[] = [];
  const plugins: Plugin[] = [];

  const bootstrap = async () => {
    for (let p of await Promise.all(deps)) {
      if (p === "timeout") {
        console.error("Plugin timed out");
        process.exit(1);
      } else if (typeof p === "function") {
        plugins.push(p);
      }
    }
  };

  let inst: Instace = {
    listen: async (port = 3000) => {
      await bootstrap();
      app.listen(port, (sock) => sock && console.log("Listening to port 3000"));
    },
    use: (p, opts) => (
      deps.push(Promise.race([Promise.resolve(p(inst, opts || {})), wait(PLUGIN_TIMEOUT)])), inst
    ),
    delete: (p, h) => app.del(p, getHandler(h, plugins)),
    get: (p, h) => app.get(p, getHandler(h, plugins)),
    options: (p, h) => app.options(p, getHandler(h, plugins)),
    patch: (p, h) => app.patch(p, getHandler(h, plugins)),
    post: (p, h) => app.post(p, getHandler(h, plugins)),
    put: (p, h) => app.put(p, getHandler(h, plugins)),
  };

  return inst;
};
