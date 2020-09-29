import fs from "fs";
import zapt from "../lib";
import { cors } from "../plugins/cors";
import { secure } from "../plugins/secure";

const app = zapt();
app.use(cors, { allowedOrigins: ["*"] }).use(secure);

app.get("/hello", (req, res) => {
  return "Hello";
});

app.post("/", async (req, res) => {
  const body = await req.body();

  return body.toString(); // Send text
});

app.get("/", async (req, res) => {
  const file = "/home/someone/Downloads/sintel-1024-stereo.mp4";

  return fs.createReadStream(file);
});

app.listen("0.0.0.0:4000", (err) => !err && console.log("Started"));
