import rawy from "../lib";

const app = rawy();

app.get("/text", (req, res) => {
  return "Hello"; // Send text
});

app.get("/res", (req, res) => {
  res.send("Hello"); // Send text (using res.send - equivalent to return)
});

app.get("/json", (req, res) => {
  res.send({ message: "I am JSON" }); // Send json
});

app.get("/status-code", (req, res) => {
  res.send("Status", 200); // Sending a status code
});

app.get("/headers", (req, res) => {
  res.send("Headers", 200, { "Content-Type": "application/json" }); // Sending headers
});

app.get("/error", (req, res) => {
  throw Error("Something went wrong");
});

app.listen(3000);
