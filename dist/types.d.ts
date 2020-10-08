/// <reference types="node" />
import { UrlWithParsedQuery } from "url";
import { ParsedUrlQuery } from "querystring";
import codes from "./codes";
export declare type Codes = typeof codes;
export declare type ServerError = Error & {
    code: keyof Codes;
};
export declare type Handler = (req: Request, res: Response) => any;
export declare type ErrorHandler = (req: Request, res: Response, err: ServerError) => any;
declare type Map = {
    [k: string]: string | undefined;
};
export declare type Headers = Map;
export declare type State = {
    [k: string]: unknown;
};
export declare type Request = {
    method: () => string;
    body: () => Promise<Buffer>;
    json: () => Promise<any>;
    header: (key: string) => string;
    headers: () => Headers;
    param: (key: string) => string | undefined;
    params: () => RequestParams;
    query: () => RequestQuery;
    url: () => RequestUrl;
    state: (key: string, value?: unknown) => unknown | void;
};
export declare type RequestParams = Map;
export declare type RequestQuery = ParsedUrlQuery;
export declare type RequestUrl = UrlWithParsedQuery;
export declare type Response = {
    header: (key: string, value: string) => Response;
    headers: (values?: Headers) => Response;
    status: (value?: keyof Codes) => Response;
    send: (data: any, status?: keyof Codes, headers?: Headers) => void;
};
export declare type Plugin = (req: Request, res: Response) => void;
export declare type PluginFn<T = Map> = (fn: Instance, opts: PluginOpts<T>) => Promise<Plugin | void> | (Plugin | void);
export declare type PluginOpts<T = Map> = T;
export declare type Route = (path: string, handler: Handler) => any;
export declare type Router = {
    any: Route;
    delete: Route;
    get: Route;
    options: Route;
    patch: Route;
    post: Route;
    put: Route;
};
export declare type Instance = Router & {
    use: (plugin: PluginFn, opts?: PluginOpts) => Instance;
};
export declare type App = Instance & {
    listen: (port?: number | string, cb?: (err?: boolean) => void) => void;
};
export declare type PluginResult = Promise<Plugin | void>;
export {};
