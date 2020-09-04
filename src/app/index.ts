export const hello = async ({ params }: { params: { name?: string } }) => {
  // await wait(500);
  return { name: params.name, age: 21 };
};

export const root = ({ params }: { params: object }) => {
  return "TEST";
};

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));
