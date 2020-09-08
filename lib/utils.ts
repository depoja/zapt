export const wait = (ms: number): Promise<"timeout"> =>
  new Promise((res) => setTimeout(() => res("timeout"), ms));
