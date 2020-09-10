# Zapt Plugins / Secure

Simple security plugin for [Zapt](github.com/depoja/zapt).

Sets security headers similar to [helmet](https://github.com/helmetjs/helmet).

## Install

```
$ npm i depoja/zapt-secure#master
```

## Usage

Default Usage:

```js
import zapt from "zapt";
import secure from "zapt-secure";

const app = zapt();
app.use(secure, {});

app.listen(3000);
```

Custom Options:

```js
import zapt from "zapt";
import secure from "zapt-secure";

const app = zapt({ dnsPrefetchControl: "on" });
app.use(secure, {});

app.listen(3000);
```

## Options

### [contentTypeOptions](developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options)

default: `'nosniff'`

values: `'nosniff'`

### [dnsPrefetchControl](developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control)

default: `'off'`

values: `'off', 'on'`

### [frameOptions](developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options)

default: `'SAMEORIGIN'`

values: `'SAMEORIGIN', 'DENY'`

### referrerPolicy

default: `'no-referrer'`

values: `'no-referrer', 'no-referrer-when-downgrade', 'same-origin', 'origin', 'strict-origin', 'origin-when-cross-origin', 'strict-origin-when-cross-origin', 'unsafe-url'`
