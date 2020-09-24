import { HttpRequest, HttpResponse } from "uWebSockets.js";
import { ErrorHandler, Handler } from "./types";
declare const _default: (path: string, handler: Handler, hooks: Handler) => (_res: HttpResponse, _req: HttpRequest) => Promise<void>;
export default _default;
export declare const notFound: Handler;
export declare const serverError: ErrorHandler;
