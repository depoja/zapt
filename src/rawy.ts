import Router from "find-my-way";
import { createServer } from "http";
import { IncomingMessage, ServerResponse } from "http";

import send from "./send";

const apply = async (res: ServerResponse, result: any) => {
  if (res.finished) return; // In case the handler manually called 'send'

  const data = await Promise.resolve(result); // If the result is a promise or value, await both cases
  send(res, res.statusCode || 200, data);
};

export default () => {
  const plugin: { [key: string]: Plugin } = {};

  const onRequest = async (req: IncomingMessage, res: ServerResponse) => {
    for (const name in plugin) {
      const fn = plugin[name];
      await fn(req, res);
    }

    const result = router.lookup(req, res);

    await apply(res, result);
  };

  const router = Router();
  const server = createServer(onRequest);

  const use = (name: string, fn: Plugin) => {
    plugin[name] = fn;
  };

  return { server, router, use };
};

type Plugin = (req: IncomingMessage, res: ServerResponse) => void;
