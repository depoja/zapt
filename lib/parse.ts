import { IncomingMessage } from "http";

export const json = (req: IncomingMessage): Promise<object> =>
  new Promise((resolve) => {
    let body = "";

    const error = () => resolve({});

    const parse = () => {
      if (body) {
        try {
          // const result = x.parse(body);
          const result = JSON.parse(body);
          resolve(result);
        } catch (err) {
          error();
        }
      }

      error();
    };

    req.on("data", (chunk) => (body += chunk));
    req.on("error", error);
    req.on("end", parse);
  });
