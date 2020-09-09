const app = require("../dist/index").default();

app.get("/user/:id", (req, res) => {
  res.send({ user: req.param(0) });
});

app.listen(3000);
