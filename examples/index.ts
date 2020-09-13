import rawy from "../lib";
import { cors } from "../plugins/cors";
import { secure } from "../plugins/secure";

const app = rawy();
app.use(cors, { allowedOrigins: ["*"] }).use(secure);

app.get("/user/:id", (req, res) => {
  // console.log(req.params(), req.query());

  return "Hello"; // Send text
});

app.listen(3000, (err) => !err && console.log(`Listening on port: 3000`));
