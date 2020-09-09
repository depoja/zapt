import { App as createServer, TemplatedApp as Server } from "uWebSockets.js";

import createRouter from "./router";
import { PLUGIN_TIMEOUT } from "./const";
import { notFound } from "./handler";
import { Instance, App } from "./types";
import { wait, Scopes } from "./utils";

const createInstance = (server: Server, scopes = Scopes(), parent?: number) => {
  const scope = scopes.create(parent);
  const router = createRouter(server, async (...args) => {
    const plugins = scopes.plugins[scope] || (await scopes.loadPlugins(scope));
    for (const p of plugins) {
      p(...args);
    }
  });

  const inst: Instance = {
    ...router,
    use: (plugin, opts) => {
      const pinst = createInstance(server, scopes, scope);
      const definition = plugin(pinst, opts || {});
      const timeout = wait(PLUGIN_TIMEOUT);

      const dep = Promise.race([Promise.resolve(definition), timeout]);
      scopes.register(scope, dep);

      return inst;
    },
  };
  return inst;
};

export default () => {
  const server = createServer(); // TODO: Add options, example SSL (HTTPS) etc.
  const app = createInstance(server) as App;

  app.listen = (port = 3000) => {
    app.any("/*", notFound);
    server.listen(port, (sock) => sock && console.log("Listening to port 3000"));
  };

  return app;
};
