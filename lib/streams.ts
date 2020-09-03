import { createServer, IncomingMessage, ServerResponse } from "http";
import { ParsedUrlQuery } from "querystring";
import Kefir, { Stream, Emitter } from "kefir";
import Router, { HTTPMethod } from "find-my-way";

import url from "./url";
import * as body from "./body";

function createStreamEmitter<V, E>() {
  const x = {} as { stream: Stream<V, E>; emitter: Emitter<V, E> };
  x.stream = Kefir.stream((e) => {
    x.emitter = e;
  });
  return x;
}

type PayloadHTTP = {
  req: IncomingMessage;
  res: ServerResponse;
};

type Params = ParsedUrlQuery & {
  [key: string]: any;
};

type PayloadRouter = PayloadHTTP & {
  params: Params;
};

const server = (port = 3000) => {
  const ss = createStreamEmitter<PayloadHTTP, any>();
  const stream = ss.stream as Stream<PayloadHTTP, any> & { r: Route };

  const instance = createServer(async (req, res) => {
    ss.emitter.emit({ req, res });
  });

  instance.listen(port, () => {
    console.log("Server listening on port:", port);
  });

  const router = Router();

  stream.onValue((ctx) => {
    const result = router.lookup(ctx.req, ctx.res); // CHANGE OUTPUT
  });

  type Route = (method: HTTPMethod | HTTPMethod[], path: string) => Stream<PayloadRouter, any>;

  stream.r = (method, path) => {
    const rs = createStreamEmitter<PayloadRouter, any>();

    router.on(method, path, async (req, res, params) => {
      const { query } = url(req);
      const data = await body.json(req);

      rs.emitter.emit({ req, res, params: { ...params, ...query, ...data } }); // Merge body + route + query params
    });

    return rs.stream;
  };

  return stream;
};

export { server };
