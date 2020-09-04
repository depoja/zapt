export type PluginOpts = { [k: string]: any };

export type PluginFn<T, K = {}> = { (ctx: T): T } & K;
export type Plugin<T, K> = (opts?: PluginOpts) => PluginFn<T, K>;
