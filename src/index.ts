import rawy from "./rawy";
import url from "./url";

const app = rawy();

app.router.get("/:name", (req, _, params) => {
  // const { query } = url(req);
  return { name: params.name, age: 30 };
});

app.use("test", (req) => {
  // console.log(req);
});

app.server.listen(3000, () => {
  console.log("opps");
});
