import http from "http";
import flyd from "flyd";

import { CtxHttp } from "./types";

export const createServer = (port = 3000) => {
  const stream = flyd.stream<CtxHttp>();

  const instance = http.createServer((req, res) => {
    stream({ req, res });
  });

  instance.listen(port, () => {
    console.log("Server listening on port:", port);
  });

  return stream;
};
