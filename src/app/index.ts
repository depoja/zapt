export const hello = async (params: { name?: string }) => {
  // await wait(500);
  return { name: params.name, age: 21 };
};

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));
