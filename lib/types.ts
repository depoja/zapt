import { UrlWithParsedQuery } from "url";
import { ParsedUrlQuery } from "querystring";
import codes from "./codes";

export type Codes = typeof codes;

export type ServerError = Error & { code: keyof Codes };

export type Handler = (req: Request, res: Response) => any;
export type ErrorHandler = (req: Request, res: Response, err: ServerError) => any;

export type Map = { [k: string]: string | undefined };

export type Headers = Map;
export type State = { [k: string]: any };

export type Request = {
  method: () => string;
  body: () => Promise<Buffer>;
  json: () => Promise<any>;
  header: (key: string) => string;
  headers: () => Headers;
  param: (key: string) => string | undefined;
  params: () => RequestParams;
  query: () => RequestQuery;
  url: () => RequestUrl;
  state: (key: string, value?: any) => any | void;
};

export type RequestParams = Map;
export type RequestQuery = ParsedUrlQuery;
export type RequestUrl = UrlWithParsedQuery;

export type Response = {
  header: (key: string, value: string) => Response;
  headers: (values?: Headers) => Response;
  status: (value?: keyof Codes) => Response;
  send: (data: any, status?: keyof Codes, headers?: Headers) => void;
};

export type Plugin = (req: Request, res: Response) => void;

export type PluginFn<T = State> = (
  fn: Instance,
  opts: T
) => Promise<Plugin | void> | (Plugin | void);

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
  use: <T>(plugin: PluginFn<T>, opts?: T) => Instance;
};

export type App = Instance & {
  listen: (port?: number | string, cb?: (err?: boolean) => void) => void;
};

export type PluginResult = Promise<Plugin | void>;
