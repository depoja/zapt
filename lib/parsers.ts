import { HttpResponse } from "uWebSockets.js";
import { MAX_BODY_SIZE } from "./const"; // TODO: Move to an option?

// TODO: Move to plugin & handle body of type text fails
export const json = (res: HttpResponse) =>
  new Promise((resolve, reject) => {
    let data = Buffer.from([]);

    res.onData((chunk, isLast) => {
      data = Buffer.concat([data, Buffer.from(chunk)]);
      data.byteLength > MAX_BODY_SIZE && reject();

      if (isLast) {
        try {
          resolve(data.byteLength ? JSON.parse(data as any) : {});
        } catch (e) {
          reject();
        }
      }
    });

    res.onAborted(reject);
  });
