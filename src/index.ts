import rawy from "../lib";
import { cors } from "../plugins/cors";

const app = rawy();

app.get("/test1", (req, res) => {
  res.send("Test1");
});

app.use((app1) => {
  app1.use(cors);

  app1.get("/test", (req, res) => {
    res.send("Test");
  });
});

app.listen(3000);
