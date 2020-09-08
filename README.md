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

Here's how a starter project in Zap performed on an **Intel i7-3667U, 8GB RAM** machine running Ubuntu 20.04 using [autocannon](https://github.com/mcollina/autocannon) and [node-clinic](https://github.com/clinicjs/node-clinic), compared to [fastify](https://github.com/fastify/fastify) and [express](https://github.com/expressjs/express).

| Framework | Req/s  | RAM (max) | CPU (max) |
| --------- | ------ | --------- | --------- |
| zap       | 22'720 | 7 MB      | 223 %     |
| fastify   | 10'277 | 17 MB     | 291 %     |
| express   | 4'671  | 56 MB     | 272 %     |

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
│ Latency │ 0 ms │ 0 ms │ 1 ms  │ 2 ms │ 0.44 ms │ 0.61 ms │ 19.71 ms │
└─────────┴──────┴──────┴───────┴──────┴─────────┴─────────┴──────────┘
┌───────────┬────────┬────────┬─────────┬─────────┬─────────┬─────────┬────────┐
│ Stat      │ 1%     │ 2.5%   │ 50%     │ 97.5%   │ Avg     │ Stdev   │ Min    │
├───────────┼────────┼────────┼─────────┼─────────┼─────────┼─────────┼────────┤
│ Req/Sec   │ 6063   │ 6063   │ 10423   │ 11551   │ 10277   │ 1495.53 │ 6062   │
├───────────┼────────┼────────┼─────────┼─────────┼─────────┼─────────┼────────┤
│ Bytes/Sec │ 855 kB │ 855 kB │ 1.47 MB │ 1.63 MB │ 1.45 MB │ 211 kB  │ 855 kB │
└───────────┴────────┴────────┴─────────┴─────────┴─────────┴─────────┴────────┘

Req/Bytes counts sampled once per second.

103k requests in 10.06s, 14.5 MB read
```

### Express

```sh
Running 10s test @ http://localhost:3000/user/1
10 connections

┌─────────┬──────┬──────┬───────┬──────┬─────────┬─────────┬─────────┐
│ Stat    │ 2.5% │ 50%  │ 97.5% │ 99%  │ Avg     │ Stdev   │ Max     │
├─────────┼──────┼──────┼───────┼──────┼─────────┼─────────┼─────────┤
│ Latency │ 1 ms │ 2 ms │ 4 ms  │ 5 ms │ 1.88 ms │ 0.97 ms │ 25.1 ms │
└─────────┴──────┴──────┴───────┴──────┴─────────┴─────────┴─────────┘
┌───────────┬────────┬────────┬────────┬────────┬────────┬────────┬────────┐
│ Stat      │ 1%     │ 2.5%   │ 50%    │ 97.5%  │ Avg    │ Stdev  │ Min    │
├───────────┼────────┼────────┼────────┼────────┼────────┼────────┼────────┤
│ Req/Sec   │ 2441   │ 2441   │ 4395   │ 4671   │ 4156.2 │ 650.81 │ 2440   │
├───────────┼────────┼────────┼────────┼────────┼────────┼────────┼────────┤
│ Bytes/Sec │ 398 kB │ 398 kB │ 717 kB │ 762 kB │ 677 kB │ 106 kB │ 398 kB │
└───────────┴────────┴────────┴────────┴────────┴────────┴────────┴────────┘

Req/Bytes counts sampled once per second.

42k requests in 10.07s, 6.77 MB read
```
