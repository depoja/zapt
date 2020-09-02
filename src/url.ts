import { IncomingMessage } from "http";
import url from "url";

export default (req: IncomingMessage) => url.parse(req.url || "", true);
