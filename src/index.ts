import rawy, { PluginFn } from "../lib";
import { cors } from "../plugins/cors";

const app = rawy();

const authenticate: PluginFn = () => {
  const account = undefined; // Get from cookies or smth;

  return (req, res) => {
    req.state("account", account);
  };
};

app.use(cors).use(authenticate);

const protect: PluginFn = () => {
  return (req, res) => {
    if (!req.state("account")) {
      throw new Error("You are not authenticated");
    }
  };
};

const protectedRoutes: PluginFn = (app) => {
  app.use(protect);

  app.get("/x", (req, res) => {
    return { secret: "x" };
  });
};

app.use(protectedRoutes);

app.get("/y", (req, res) => {
  return "Hello World";
});

app.listen(3000);
