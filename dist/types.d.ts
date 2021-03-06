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
export declare type Map = {
    [k: string]: string | undefined;
};
export declare type Headers = Map;
export declare type State = {
    [k: string]: any;
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
    state: (key: string, value?: any) => any | void;
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
export declare type PluginFn<T = State> = (fn: Instance, opts: T) => Promise<Plugin | void> | (Plugin | void);
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
    use: <T>(plugin: PluginFn<T>, opts?: T) => Instance;
};
export declare type App = Instance & {
    listen: (port?: number | string, cb?: (err?: boolean) => void) => void;
};
export declare type PluginResult = Promise<Plugin | void>;
