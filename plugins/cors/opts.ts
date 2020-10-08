// https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

export const all: Options = {
  allowCredentials: false, // whether the request can include user credentials like cookies, HTTP authentication or client side SSL certificates
  allowedHeaders: ["*"], // List of headers the client is allowed to use with cross-domain requests
  allowedMethods: ["DELETE", "GET", "HEAD", "PATCH", "POST", "PUT"], // List of methods the client is allowed to use with cross-domain requests
  allowedOrigins: ["*"], // List of origins from where a cross-domain request can be executed. (i.e.: http://*.domain.com),
  exposedHeaders: [], // List of headers safe to expose
  maxAge: 60 * 60 * 24, // how long (in seconds) the results of a preflight request can be cached
};

export const defaults: Options = {
  ...all,
  allowedHeaders: ["Origin", "Accept", "Content-Type", "X-Requested-With"], // CORS-safelisted request headers
  allowedMethods: ["GET", "HEAD", "POST"], // Default is spec's "simple" methods - ["GET", "HEAD", "POST"]
  allowedOrigins: [],
};

export type Options = {
  allowCredentials?: boolean;
  allowedHeaders?: string[];
  allowedMethods?: string[];
  allowedOrigins?: string[];
  exposedHeaders?: string[];
  maxAge?: number;
};
