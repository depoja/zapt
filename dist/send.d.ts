import { Readable } from "stream";
import { HttpResponse } from "uWebSockets.js";
export declare const getContent: (obj: any) => any[];
export declare const pipe: (r: HttpResponse, s: Readable) => void;
