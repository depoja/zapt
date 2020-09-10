import { UrlWithParsedQuery } from "url";
import codes from "./codes";

export type Codes = typeof codes;

export type ServerError = Error & { code: keyof Codes };

export type Handler = (req: Request, res: Response) => any;
export type ErrorHandler = (req: Request, res: Response, err: ServerError) => any;

export type Headers = { [k: string]: string };
export type State = { [k: string]: unknown };

export type Request = {
  method: () => string;
  body: () => Promise<unknown>;
  header: (key: string) => string;
  headers: () => Headers;
  param: (index: number) => string;
  url: () => UrlWithParsedQuery;
  state: (key: string, value?: unknown) => unknown | void;
};

export type Response = {
  header: (key: string, value: string) => Response;
  headers: (values?: Headers) => Response;
  status: (value?: keyof Codes) => Response;
  send: (data: any, status?: keyof Codes, headers?: Headers) => void;
};

export type Plugin = (req: Request, res: Response) => void;
export type PluginFn = (fn: Instance, opts: PluginOpts) => Promise<Plugin | void> | (Plugin | void);
export type PluginOpts = { [key: string]: any };

export type Route = (path: string, handler: Handler) => any;

export type Router = {
  any: Route;
  delete: Route;
  get: Route;
  options: Route;
  patch: Route;
  post: Route;
  put: Route;
};

export type Instance = Router & {
  use: (plugin: PluginFn, opts?: PluginOpts) => Instance;
};

export type App = Instance & {
  listen: (port: number, cb?: (err?: boolean) => void) => void;
};

export type PluginResult = Promise<Plugin | void>;
