import { PluginResult, Plugin } from "./types";

export const wait = (ms: number): Promise<"timeout"> =>
  new Promise((res) => setTimeout(() => res("timeout"), ms));

export const Scopes = () => {
  type Node = { value: PluginResult[]; parent?: number };

  let nodes = 0;
  const tree: Node[] = [];
  const pluginCache: Plugin[][] = [];

  const create = (parent?: number) => ((tree[++nodes] = { value: [], parent }), nodes);

  const register = (id: number, value: PluginResult) => {
    const existing = tree[id];
    if (existing) {
      tree[id].value = [...existing.value, value];
    }
  };

  const collect = (start: number) => {
    const values = [];
    let curr: Node | false = tree[start];
    while (curr) {
      values.push(curr.value);
      curr = !!curr.parent && tree[curr.parent];
    }
    return values;
  };

  const loadPlugins = async (scope: number) => {
    const plugins = [];

    for (let p of await Promise.all(collect(scope).flat())) {
      if (p === "timeout") {
        console.error("Plugin timed out");
        process.exit(1);
      } else if (typeof p === "function") {
        plugins.push(p);
      }
    }

    pluginCache[scope] = plugins;
    return plugins;
  };

  return { create, register, plugins: pluginCache, loadPlugins };
};
