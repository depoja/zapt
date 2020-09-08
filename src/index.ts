import rawy from "../lib";

const app = rawy();

app.get("/user/:id", (req, res) => {
  const id = req.param(0);

  res.send(id);
});

app.listen(3000);
