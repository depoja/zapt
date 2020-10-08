import {
  App as createServer,
  TemplatedApp as Server,
  us_listen_socket_close as closeSock,
} from "uWebSockets.js";

import createRouter from "./router";
import { notFound } from "./handler";
import { Instance, App } from "./types";
import { exitOnTimeout, Scopes } from "./utils";

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
      const definition = plugin(pinst, opts || ({} as any));
      const result = Promise.resolve(definition);

      scopes.register(scope, result);
      exitOnTimeout(result);

      return inst;
    },
  };
  return inst;
};

export default () => {
  const server = createServer(); // TODO: Add options, example SSL (HTTPS) etc.
  const app = createInstance(server) as App;

  app.listen = (path = 3000, cb) => {
    app.any("/*", notFound);

    const split = path.toString().split(":");

    const host = split.length > 1 ? split[0] : "0.0.0.0";
    const port = Number(split.length > 1 ? split[1] : split[0]);

    console.log(`Starting server on ${host}:${port}`);

    server.listen(host, port, (sock) => {
      typeof cb == "function" && cb(!sock);
      const close = () => closeSock(sock);

      process.on("SIGINT", close);
      process.on("SIGTERM", close);
    });
  };

  return app;
};
