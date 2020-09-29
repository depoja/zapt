import zapt, { PluginFn } from "../lib";

const authenticate: PluginFn = () => {
  const account = undefined; // Get from cookies or smth;

  return (req, res) => {
    req.state("account", account);
  };
};

const protect: PluginFn = () => {
  return (req, res) => {
    if (!req.state("account")) {
      throw new Error("You are not authenticated");
    }
  };
};

const app = zapt();

const protectedRoutes: PluginFn = (app) => {
  app.use(protect);

  app.get("/protected", (req, res) => {
    return "This route is protected";
  });
};

app.use(authenticate).use(protectedRoutes);

app.get("/", (req, res) => {
  return "This one is unprotected";
});

app.listen(3000);
