# Zapt Plugins / CORS

Simple [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) plugin for [Zapt](https://github.com/depoja/zapt).

## Install

```
$ npm i depoja/zapt-cors#master
```

## Usage

Default Usage:

```js
import zapt from "zapt";
import cors from "zapt-cors";

const app = zapt();
app.use(cors, {});

app.listen(3000);
```

Custom Options:

```js
import zapt from "zapt";
import cors from "zapt-cors";

const app = zapt({ allowMethods: ["PUT", "POST"] });
app.use(cors, {});

app.listen(3000);
```

## Options

### `allowMethods`

default: `['POST','GET','PUT','PATCH','DELETE','OPTIONS']`

### `allowHeaders`

default: `['X-Requested-With','Access-Control-Allow-Origin','X-HTTP-Method-Override','Content-Type','Authorization','Accept']`

### `allowCredentials`

default: `true`

### `exposeHeaders`

default: `[]`

### `maxAge`

default: `86400`

### `origin`

default: `*`
