import Router from "find-my-way";
import flyd from "flyd";
import mergeAll from "flyd/module/mergeall";

import url from "../url";
import * as body from "../parse";
import { CtxHttp, Route, Method, CtxRouter } from "../types";
import { PluginFn } from "./types";

import { sp } from "./utils";
import { send } from "..";

type Methods = {
  get: Route;
  post: Route;
  delete: Route;
  patch: Route;
  put: Route;
  options: Route;
};

export const router = sp(() => {
  const router = Router();

  const fn: PluginFn<CtxHttp, Methods> = (ctx) => {
    router.lookup(ctx.req, ctx.res);
    return ctx;
  };

  const on = (method: Method): Route => (path, handler?: any) => {
    const stream = flyd.stream<CtxRouter>();

    router.on(method, path, async (req, res, params) => {
      const { query } = url(req);
      const data = await body.json(req);
      const ctx = { req, res, params: { ...params, ...query, ...data } };

      if (typeof handler === "function") {
        const result = await Promise.resolve(handler({ req, res, params }));
        stream(ctx);
        send(ctx.res, result);
      } else {
        stream(ctx);
      }
    });

    return stream;
  };

  fn.get = on("GET");
  fn.delete = on("DELETE");
  fn.patch = on("PATCH");
  fn.post = on("POST");
  fn.put = on("PUT");
  fn.options = on("OPTIONS");

  return fn;
});

export const r = (h: Function) => async (ctx: CtxRouter) => {
  const result = h(ctx.params);
  ctx.result = await Promise.resolve(result);
  return ctx;
};
