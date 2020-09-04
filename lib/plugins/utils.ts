import { Plugin } from "./types";

export function sp<T, K>(p: Plugin<T, K>) {
  return p;
}
