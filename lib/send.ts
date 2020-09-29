import { Readable } from "stream";
import { HttpResponse } from "uWebSockets.js";

export const getContent = (obj: any) => {
  const data = obj || "";

  if (Buffer.isBuffer(data)) {
    return [data, "application/octet-stream"];
  }

  if (data instanceof Readable || data.readable) {
    return [pipe, "application/octet-stream"];
  }

  if (typeof data === "object" || typeof data === "number") {
    return [JSON.stringify(data), "application/json; charset=utf-8"];
  }

  return [data, "text/plain; charset=utf-8"];
};

export const pipe = (r: HttpResponse, s: Readable) => {
  const end = () => {
    if (!r.sent) {
      r.end();
      s.destroy();
    }
    r.sent = true;
  };

  s.on("data", (d) => !r.sent && r.write(d.buffer.slice(d.byteOffset, d.byteOffset + d.byteLength)))
    .on("end", end)
    .on("error", end);

  r.onAborted(end);
};
