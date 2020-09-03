import Kefir from "kefir";
import send from "../lib/send";
import * as streams from "../lib/streams";

import * as app from "./app";

// const app = server().map(cors()).map(security());
const server = streams.server(3000);

const root = server.r("GET", "/").map((ctx) => [ctx, "Root"]);
const hello = server.r(["GET", "POST"], "/hello/:name").map((ctx) => [ctx, app.hello(ctx.params)]);

// @ts-ignore
const api = Kefir.merge([root, hello]);

// @ts-ignore
api.onValue(async ([ctx, val]) => {
  const data = await Promise.resolve(val);

  // @ts-ignore
  send(ctx.res, data);
});
