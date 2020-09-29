import { HttpResponse } from "uWebSockets.js";
import { MAX_BODY_SIZE } from "./const"; // TODO: Move to an option?

export default (res: HttpResponse, json = false): Promise<Buffer | any> =>
  new Promise((resolve, reject) => {
    let buffer: Buffer;

    res.onData((chunk, isLast) => {
      const data = Buffer.from(chunk);
      buffer = buffer ? Buffer.concat([buffer, data]) : data;

      buffer.byteLength > MAX_BODY_SIZE && reject();

      if (isLast) {
        try {
          resolve(json ? JSON.parse(buffer as any) : buffer);
        } catch (e) {
          reject();
        }
      }
    });

    res.onAborted(reject);
  });
