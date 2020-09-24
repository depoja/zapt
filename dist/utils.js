"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exitOnTimeout = exports.wait = exports.Scopes = void 0;
const const_1 = require("./const");
exports.Scopes = () => {
    let nodes = 0;
    const tree = [];
    const pluginCache = [];
    const create = (parent) => ((tree[++nodes] = { value: [], parent }), nodes);
    const register = (id, value) => {
        const existing = tree[id];
        if (existing) {
            tree[id].value = [...existing.value, value];
        }
    };
    const collect = (start) => {
        const values = [];
        let curr = tree[start];
        while (curr) {
            values.push(curr.value);
            curr = !!curr.parent && tree[curr.parent];
        }
        return values;
    };
    const loadPlugins = async (scope) => {
        const plugins = [];
        for (let p of await Promise.all(collect(scope).flat())) {
            typeof p === "function" && plugins.unshift(p);
        }
        pluginCache[scope] = plugins;
        return plugins;
    };
    return { create, register, plugins: pluginCache, loadPlugins };
};
exports.wait = (ms) => new Promise((res) => setTimeout(() => res("timeout"), ms));
exports.exitOnTimeout = (p) => Promise.race([exports.wait(const_1.PLUGIN_TIMEOUT), p]).then((v) => {
    if (v === "timeout") {
        console.error("Plugin timed out");
        process.exit(1);
    }
});
