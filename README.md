<div align="center">
  <img src="icon.svg" alt="Zapt" width="80" />
</div>

<h1 align="center">
  Zapt
</h1>

<p align="center">
A web server so fast, you'll risk getting zapped. ⚡</p>
<br>

![version](https://img.shields.io/github/package-json/v/depoja/zapt)
![downloads](https://img.shields.io/github/downloads/depoja/zapt/total)
![dependencies](https://img.shields.io/david/depoja/zapt)
![vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/depoja/zapt)
![maintainability](https://img.shields.io/codeclimate/maintainability/depoja/zapt)

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
$ npm i depoja/zapt#master
```

## Usage

### Server

```ts
import zapt from "zapt";

const app = zapt();

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

Here's how a starter project in Zapt performed on an **Intel i7-3667U, 8GB RAM** machine running Ubuntu 20.04 using [autocannon](https://github.com/mcollina/autocannon) and [node-clinic](https://github.com/clinicjs/node-clinic), compared to [fastify](https://github.com/fastify/fastify) and [express](https://github.com/expressjs/express).

| Framework | Req/s      | RAM (max) | CPU (max) |
| --------- | ---------- | --------- | --------- |
| **zapt**  | **48'864** | **7MB**   | **219%**  |
| fastify   | 26'691     | 18MB      | 292%      |
| express   | 7'523      | 59MB      | 281%      |

### Zapt

```sh
Running 10s test @ http://localhost:3000/user/1
100 connections with 10 pipelining factor

┌─────────┬──────┬──────┬───────┬───────┬─────────┬─────────┬───────────┐
│ Stat    │ 2.5% │ 50%  │ 97.5% │ 99%   │ Avg     │ Stdev   │ Max       │
├─────────┼──────┼──────┼───────┼───────┼─────────┼─────────┼───────────┤
│ Latency │ 0 ms │ 0 ms │ 20 ms │ 22 ms │ 2.01 ms │ 6.15 ms │ 127.55 ms │
└─────────┴──────┴──────┴───────┴───────┴─────────┴─────────┴───────────┘
┌───────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg     │ Stdev   │ Min     │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Req/Sec   │ 40607   │ 40607   │ 49951   │ 51007   │ 48864   │ 3102.92 │ 40600   │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Bytes/Sec │ 4.67 MB │ 4.67 MB │ 5.75 MB │ 5.87 MB │ 5.62 MB │ 357 kB  │ 4.67 MB │
└───────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┘

Req/Bytes counts sampled once per second.

489k requests in 10.2s, 56.2 MB read
```

### Fastify

```sh
Running 10s test @ http://localhost:3001/user/1
100 connections with 10 pipelining factor

┌─────────┬──────┬──────┬───────┬───────┬─────────┬──────────┬───────────┐
│ Stat    │ 2.5% │ 50%  │ 97.5% │ 99%   │ Avg     │ Stdev    │ Max       │
├─────────┼──────┼──────┼───────┼───────┼─────────┼──────────┼───────────┤
│ Latency │ 0 ms │ 0 ms │ 39 ms │ 42 ms │ 3.67 ms │ 11.61 ms │ 216.86 ms │
└─────────┴──────┴──────┴───────┴───────┴─────────┴──────────┴───────────┘
┌───────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg     │ Stdev   │ Min     │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Req/Sec   │ 18031   │ 18031   │ 27215   │ 29471   │ 26691.2 │ 3055.24 │ 18030   │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Bytes/Sec │ 2.87 MB │ 2.87 MB │ 4.33 MB │ 4.69 MB │ 4.24 MB │ 485 kB  │ 2.87 MB │
└───────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┘

Req/Bytes counts sampled once per second.

267k requests in 10.11s, 42.4 MB read
```

### Express

```sh
Running 10s test @ http://localhost:3002/user/1
100 connections with 10 pipelining factor

┌─────────┬──────┬──────┬────────┬────────┬──────────┬──────────┬───────────┐
│ Stat    │ 2.5% │ 50%  │ 97.5%  │ 99%    │ Avg      │ Stdev    │ Max       │
├─────────┼──────┼──────┼────────┼────────┼──────────┼──────────┼───────────┤
│ Latency │ 0 ms │ 0 ms │ 135 ms │ 141 ms │ 13.09 ms │ 39.95 ms │ 509.61 ms │
└─────────┴──────┴──────┴────────┴────────┴──────────┴──────────┴───────────┘
┌───────────┬─────────┬─────────┬─────────┬─────────┬─────────┬────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg     │ Stdev  │ Min     │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼────────┼─────────┤
│ Req/Sec   │ 4595    │ 4595    │ 7831    │ 8143    │ 7523.82 │ 948.69 │ 4593    │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼────────┼─────────┤
│ Bytes/Sec │ 1.02 MB │ 1.02 MB │ 1.75 MB │ 1.82 MB │ 1.68 MB │ 212 kB │ 1.02 MB │
└───────────┴─────────┴─────────┴─────────┴─────────┴─────────┴────────┴─────────┘

Req/Bytes counts sampled once per second.

83k requests in 11.09s, 18.5 MB read
```
