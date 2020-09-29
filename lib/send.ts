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

export const pipe = (res: HttpResponse, s: Readable, size = 0) => {
  let finished = false;
  let lastChunk: Buffer;
  let lastOffset: number;

  const end = () => {
    !finished && s.destroy();
    finished = true;
  };

  s.on("data", (chunk) => {
    lastChunk = chunk.buffer.slice(chunk.byteOffset, chunk.byteOffset + chunk.byteLength); // Take only standard V8 units of data */
    lastOffset = res.getWriteOffset();

    const [ok, done] = res.tryEnd(chunk, size);
    if (done) {
      return end();
    } else if (!ok) {
      s.pause();
    }

    res.onWritable((offset) => {
      const [ok, done] = res.tryEnd(lastChunk.slice(offset - lastOffset), size);
      if (done) {
        end();
      } else if (ok) {
        s.resume();
      }
      return ok;
    });
  }).on("error", end);

  res.onAborted(end);
};
