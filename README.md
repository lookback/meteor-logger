# Lookback Logger

[![Circle CI](https://circleci.com/gh/lookback/meteor-logger.svg?style=svg)](https://circleci.com/gh/lookback/meteor-logger)

A Meteor logger that logs to [Loggly](https://www.loggly.com/) or local `console.log` on the server (no client side support as of now).

## Install

Lookback Logger is available on [Atmosphere](https://atmospherejs.com/lookback/logger) as `lookback:logger`:

```bash
meteor add lookback:logger
```

## Usage

A global `Logger` object is automatically exported from within the package and available in your app (server side only). It has the log level methods `debug`, `warn`, `error` and `info`.

```js
Logger.info('Some logging');
Logger.warn('Watch out!');
Logger.error('Someone screwed up ...');
Logger.debug('Herp-a-derp!');
```

Locally, the `info`, `warn`, `debug`, and `error` methods correspond to their corresponding methods on the `console` object (with the exception of `debug`: it uses `console.log`).

Each `Logger` method takes a message as a string, and optionally an array of tags:

```js
Logger.info('Some logging', ['my-tag']);
```
This can be shown in the Loggly interface.

Additionally, a global `logger` factory function is exported. It is used to create a logger:

```js
someLogger = logger(params);
```

`logger` takes an object of parameters:

```js
myLogger = logger({
  // Local logging. Defaults to true.
  local: true,

  // Loggly options. Defaults to {}. If set, local logging will be disabled.
  loggly: {
    // Options to send to the Loggly npm module.
    logglyModuleOptions: {
      token: '<your loggly token>',
      subdomain: 'foobar',
      json: true
    },
    // Params to send to Loggly with every request.
    baseParams: {
      environment: 'development',   // Defaults to process.env.NODE_ENV
      serverName: 'My Computer'
    }
  }
});
```
Please refer to the documentation for the [`loggly`](http://npmjs.org/package/loggly) npm module for documentation on the `logglyModuleOptions`.

## Tests

```bash
meteor test-packages lookback:logger
```

Locally:

```bash
meteor test-packages ./
```

## Version history

- `1.1.0` - Locally, output tags in front of message for easy scanning.
- `1.0.0` - Initial publish.

## Contributions

Contributions are welcome. Please open issues and/or file Pull Requests.

Made by [Lookback](http://lookback.io).
