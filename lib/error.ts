import { ServerError, Codes } from "./types";
import codes from "./codes";

export default (_msg?: string, _code?: keyof Codes) => {
  const code = _code || 500;
  const msg = _msg || codes[code];

  const err = new Error(msg) as ServerError;
  err.code = code;

  return err;
};
