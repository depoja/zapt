import { UrlWithParsedQuery } from "url";
import codes from "./codes";

export type Codes = typeof codes;

export type Handler = (req: Request, res: Response) => any;

export type Headers = { [k: string]: string };

export type Request = {
  method: () => string;
  body: () => Promise<unknown>;
  header: (key: string) => string;
  headers: () => Headers;
  param: (index: number) => string;
  url: () => UrlWithParsedQuery;
};

export type Response = {
  sent?: boolean;
  headers: (values: Headers) => void;
  send: (data: any, code?: keyof Codes, headers?: Headers) => void;
};

export type Plugin = (req: Request, res: Response) => void;

export type PluginOpts = { [key: string]: any };

export type PluginFn = (fn: Instace, opts: PluginOpts) => Promise<Plugin | void> | (Plugin | void);

export type Route = (path: string, handler: Handler) => any;

export type Instace = {
  listen: (port: number) => void;
  use: (plugin: PluginFn, opts?: PluginOpts) => Instace;
  get: Route;
  delete: Route;
  options: Route;
  patch: Route;
  post: Route;
  put: Route;
};
