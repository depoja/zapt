import { createServer, plugins } from "../lib";

import * as app from "./app";

const cors = plugins.cors();
const router = plugins.router();

const server = createServer(3000).map(cors).map(router);

router.get("/", app.root);
router.get("/hello/:name", app.hello);
router.post("/hello/:name", app.hello);

// router.get("/").map(r(app.root));
// router.get("/hello/:name").map(r(app.hello));
// router.post("/hello/:name").map(r(app.hello));

// TODO: Create `r` - route and `p` - plugin decorators
