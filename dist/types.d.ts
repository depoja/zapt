/// <reference types="node" />
import { UrlWithParsedQuery } from "url";
import codes from "./codes";
export declare type Codes = typeof codes;
export declare type ServerError = Error & {
    code: keyof Codes;
};
export declare type Handler = (req: Request, res: Response) => any;
export declare type ErrorHandler = (req: Request, res: Response, err: ServerError) => any;
export declare type Headers = {
    [k: string]: string;
};
export declare type State = {
    [k: string]: unknown;
};
export declare type Request = {
    method: () => string;
    body: () => Promise<unknown>;
    header: (key: string) => string;
    headers: () => Headers;
    param: (index: number) => string;
    url: () => UrlWithParsedQuery;
    state: (key: string, value?: unknown) => unknown | void;
};
export declare type Response = {
    headers: (values: Headers) => void;
    send: (data: any, code?: keyof Codes, headers?: Headers) => void;
};
export declare type Plugin = (req: Request, res: Response) => void;
export declare type PluginFn = (fn: Instance, opts: PluginOpts) => Promise<Plugin | void> | (Plugin | void);
export declare type PluginOpts = {
    [key: string]: any;
};
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
    listen: (port: number) => void;
};
export declare type PluginResult = Promise<Plugin | void>;
