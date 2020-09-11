# Zapt Plugins / Secure

Simple security plugin for [Zapt](https://github.com/depoja/zapt).

Sets security headers similar to [helmet](https://github.com/helmetjs/helmet) but for APIs.

For more info check out the [OWASP recommendations](https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html#security-headers).

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

const app = zapt({ frameOptions: "SAMEORIGIN" });
app.use(secure, {});

app.listen(3000);
```

## Options

### [cacheControl](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)

Sensitive page could be cached.

If a response contains sensitive information (e.g. password, payment info) it could be stored and cached by intermediary proxies and what not. Setting this header prevents caching of your APIs responses.

default: `no-store`

values: `must-revalidate, no-cache, no-store, no-transform, public, private, proxy-revalidate, max-age=<seconds>, s-maxage=<seconds>`

### [contentSecurityPolicy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

Prevents [Clickjacking](https://owasp.org/www-community/attacks/Clickjacking) attacks.

Some sites can hijack clicks and keystrokes intented for your site by embedding your site into theirs.

By setting the frame-ancestors directive, you are indicating whether browsers should allow your page to be rendered into another page and ensure your site is not embedded everywhere.

default: `frame-ancestors 'none'`

default (html): `default-src 'none'`

values: check the [Content Security Policy Reference](https://content-security-policy.com)

### [strictTransportSecurity](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security)

Prevents [Certificate Spoofing](https://news.netcraft.com/archives/2016/03/17/95-of-https-servers-vulnerable-to-trivial-mitm-attacks) by restricting connections only to HTTPS and converting every HTTP request to an equivalent HTTPS one.

default: `max-age=600; includeSubDomains`

values: `max-age=<expire-time>`, `max-age=<expire-time>; includeSubDomains`, `max-age=<expire-time>; preload`, `max-age=<expire-time>; includeSubDomains; preload`

If you decide to use `preload`, please check the [Preload Submission Requirements](https://hstspreload.org) and the warnings associated with it.

### [contentTypeOptions](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options)

This directive prevents MIME-based attacks. It forces the browsers to skip [MIME-sniffing](https://en.wikipedia.org/wiki/Content_sniffing) (browsers trying to guess the type of the response when it's absent or believed to be incorrect).

default: `nosniff`

values: `nosniff`

### [frameOptions](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options)

Prevents [Clickjacking](https://owasp.org/www-community/attacks/Clickjacking) attacks.

default: `DENY`

values: `DENY`, `SAMEORIGIN`

### [featurePolicy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy)

Selectively enable, disable, and modify the behavior of browser features and APIs. It's similar to CSP but controls features instead of security.

default: `none`

values: check the [documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy)

### [referrerPolicy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy)

The Referer header contains the address of the webpage you were linked from. It's used for stuff like analytics and logging.
It ca also be used for tracking, stealing and leaking sensitive information.

This directive controls the headers behaviour.

default: `'no-referrer'`

values: `'no-referrer', 'no-referrer-when-downgrade', 'same-origin', 'origin', 'strict-origin', 'origin-when-cross-origin', 'strict-origin-when-cross-origin', 'unsafe-url'`
