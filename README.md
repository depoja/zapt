<div align="center">
  <img src="icon.svg" alt="Zap" width="80" />
</div>

<h1 align="center">
  Zapt
</h1>

<p align="center">
A web server so fast, you'll risk getting zapped. ⚡</p>
<br>

**Zapt** is a minimal and highly performant Node.js framework.

It swaps out the native [HTTP Server](https://nodejs.org/dist/latest/docs/api/http.html#http_class_http_server) for [uWebSockets.js](https://github.com/uNetworking/uWebSockets.js) resulting in much faster (possibly an order of magnitude) and lower memory footprint servers.

And, of course, it also packs a punch on its own:

- Full async/await support
- Plugin system with async/await and scope support
- ~200 LOC in total (anyone can review and change the source code)

## Motivation

While Node.js is plenty fast for a lot of applications, when put against lower level runtimes it is far from optimal.

Instead of entirely switching to a faster runtime or language when a project you're working on has demands Node.js cannot meet, why not just swap out the native [HTTP Server](https://nodejs.org/dist/latest/docs/api/http.html#http_class_http_server) for a better performing one?

## Installation

Run the following command inside your npm project:

```sh
$ npm i depoja/zap#master
```

## Usage

### Server

```ts
import zap from "zap";

const app = zap();

app.use(log).use(db);

app.get("/hello", hello);
app.get("/hello/:name", greet); // Route param :name

app.listen(3000);
```

### Handlers

```ts
// JSON Response
const hello = (req, res) => {
  res.send({ message: "Hello World!" }, 200); // status 200
};

// Text Response
const greet = (req, res) => {
  const name = req.params(0); // Get the route param
  res.send(`Hello ${name}!`); // default status (200)
};
```

### Plugins

```ts
// Sync
const log = () => {
  return (req, res) => {
    console.log(req.url());
  };
};

// Async
const db = async () => {
  const conn = await connectToDb("DB_URI");

  return (req, res) => {
    req.db = conn; // decorate request
  };
};
```

## API

Coming soon

## Benchmarks

And here's the most loved, least meaningful metric of them all.

Here's how Zap performed on an **Intel i7-3667U, 8GB RAM** machine running Ubuntu 20.04 using [autocannon](https://github.com/mcollina/autocannon).

|     | Framework | Req/s  |
| --- | --------- | ------ |
| 1   | zap       | 22'720 |
| 2   | fastify   | 17'036 |
| 3   | express   | 5'342  |

### Zap

```sh
Running 10s test @ http://localhost:3000/user/1
10 connections

┌─────────┬──────┬──────┬───────┬──────┬─────────┬────────┬──────────┐
│ Stat    │ 2.5% │ 50%  │ 97.5% │ 99%  │ Avg     │ Stdev  │ Max      │
├─────────┼──────┼──────┼───────┼──────┼─────────┼────────┼──────────┤
│ Latency │ 0 ms │ 0 ms │ 0 ms  │ 1 ms │ 0.03 ms │ 0.2 ms │ 14.34 ms │
└─────────┴──────┴──────┴───────┴──────┴─────────┴────────┴──────────┘
┌───────────┬─────────┬─────────┬─────────┬─────────┬──────────┬─────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg      │ Stdev   │ Min     │
├───────────┼─────────┼─────────┼─────────┼─────────┼──────────┼─────────┼─────────┤
│ Req/Sec   │ 17279   │ 17279   │ 23343   │ 24175   │ 22720.73 │ 1779.03 │ 17279   │
├───────────┼─────────┼─────────┼─────────┼─────────┼──────────┼─────────┼─────────┤
│ Bytes/Sec │ 1.81 MB │ 1.81 MB │ 2.45 MB │ 2.54 MB │ 2.39 MB  │ 187 kB  │ 1.81 MB │
└───────────┴─────────┴─────────┴─────────┴─────────┴──────────┴─────────┴─────────┘

Req/Bytes counts sampled once per second.

250k requests in 11.07s, 26.2 MB read
```

### Fastify

```sh
Running 10s test @ http://localhost:3000/user/1
10 connections

┌─────────┬──────┬──────┬───────┬──────┬─────────┬─────────┬──────────┐
│ Stat    │ 2.5% │ 50%  │ 97.5% │ 99%  │ Avg     │ Stdev   │ Max      │
├─────────┼──────┼──────┼───────┼──────┼─────────┼─────────┼──────────┤
│ Latency │ 0 ms │ 0 ms │ 1 ms  │ 1 ms │ 0.05 ms │ 0.31 ms │ 20.77 ms │
└─────────┴──────┴──────┴───────┴──────┴─────────┴─────────┴──────────┘
┌───────────┬─────────┬─────────┬─────────┬────────┬──────────┬─────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%  │ Avg      │ Stdev   │ Min     │
├───────────┼─────────┼─────────┼─────────┼────────┼──────────┼─────────┼─────────┤
│ Req/Sec   │ 9455    │ 9455    │ 17631   │ 18431  │ 17036.73 │ 2435.36 │ 9452    │
├───────────┼─────────┼─────────┼─────────┼────────┼──────────┼─────────┼─────────┤
│ Bytes/Sec │ 1.33 MB │ 1.33 MB │ 2.49 MB │ 2.6 MB │ 2.4 MB   │ 343 kB  │ 1.33 MB │
└───────────┴─────────┴─────────┴─────────┴────────┴──────────┴─────────┴─────────┘

Req/Bytes counts sampled once per second.

187k requests in 11.06s, 26.4 MB read
```

### Express

```sh
Running 10s test @ http://localhost:3000/user/1
10 connections

┌─────────┬──────┬──────┬───────┬──────┬─────────┬─────────┬──────────┐
│ Stat    │ 2.5% │ 50%  │ 97.5% │ 99%  │ Avg     │ Stdev   │ Max      │
├─────────┼──────┼──────┼───────┼──────┼─────────┼─────────┼──────────┤
│ Latency │ 1 ms │ 1 ms │ 4 ms  │ 5 ms │ 1.27 ms │ 0.79 ms │ 24.67 ms │
└─────────┴──────┴──────┴───────┴──────┴─────────┴─────────┴──────────┘
┌───────────┬────────┬────────┬────────┬────────┬────────┬────────┬────────┐
│ Stat      │ 1%     │ 2.5%   │ 50%    │ 97.5%  │ Avg    │ Stdev  │ Min    │
├───────────┼────────┼────────┼────────┼────────┼────────┼────────┼────────┤
│ Req/Sec   │ 2967   │ 2967   │ 5743   │ 5847   │ 5342.1 │ 898.16 │ 2967   │
├───────────┼────────┼────────┼────────┼────────┼────────┼────────┼────────┤
│ Bytes/Sec │ 484 kB │ 484 kB │ 936 kB │ 953 kB │ 871 kB │ 146 kB │ 484 kB │
└───────────┴────────┴────────┴────────┴────────┴────────┴────────┴────────┘

Req/Bytes counts sampled once per second.

53k requests in 10.06s, 8.71 MB read
```
