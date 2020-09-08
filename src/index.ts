import rawy from "../lib";
import { cors } from "../plugins/cors";

const app = rawy();

app.use(cors);

app.get("/hello/:name", (req, res) => {
  const name = req.param(0);

  res.send({ name }, 200);
});

app.post("/hello", async (req, res) => {
  const x = await req.body();
  console.log(x);

  return "ok";
});

app.get("/hello", (req, res) => {
  throw new Error("whoops");
  return { name: "Test" };
});

app.listen(3000);
