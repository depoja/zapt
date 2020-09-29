import zapt, { PluginFn } from "../lib";

const app = zapt();

// Plugin declaration
const log: PluginFn = () => {
  console.log("Setting up plugin");

  return (res, req) => {
    console.log("Request");
  };
};

// Plugin registration
app.use(log); // Whenever a request is made, the log plugin will be called, then the rest (get route below)

app.get("/logs", (req, res) => {
  return "Check your terminal";
});

// Nested plugin
const greet: PluginFn = () => (res, req) => {
  console.log("Hello");
};

const nested: PluginFn = (a) => {
  a.use(greet); // Only applied to the current scope ('a'), will be called only for the items declared by it

  a.get("/greet", (req, res) => {
    return "Check your terminal, both log and greet";
  });
};

app.use(nested);

app.listen(3000);
