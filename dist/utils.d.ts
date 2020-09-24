import { PluginResult, Plugin } from "./types";
export declare const Scopes: () => {
    create: (parent?: number | undefined) => number;
    register: (id: number, value: PluginResult) => void;
    plugins: Plugin[][];
    loadPlugins: (scope: number) => Promise<Plugin[]>;
};
export declare const wait: (ms: number) => Promise<"timeout">;
export declare const exitOnTimeout: (p: Promise<any>) => Promise<void>;
