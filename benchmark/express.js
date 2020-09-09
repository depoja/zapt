const app = require("express")();

app.get("/user/:id", (req, res) => {
  res.send({ user: req.params.id });
});

app.listen(3002);
