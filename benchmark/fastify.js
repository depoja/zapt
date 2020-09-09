const app = require("fastify")();

app.get("/user/:id", (req, rep) => {
  rep.send({ user: req.params.id });
});

app.listen(3001);
