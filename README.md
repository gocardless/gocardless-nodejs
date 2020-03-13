# Node.js client for the GoCardless API

[![GoCardless](https://circleci.com/gh/gocardless/gocardless-nodejs.svg?style=svg)](https://github.com/gocardless/gocardless-nodejs/commits/master) [![npm version](https://badge.fury.io/js/gocardless-nodejs.svg)](https://badge.fury.io/js/gocardless-nodejs)

A Node.js client for the GoCardless API. For full details of the GoCardless API, see the [API docs](https://developer.gocardless.com/).

## Installation

```bash
$ npm i gocardless-nodejs
```

## Usage

### Initialising the client

To initialise the client, you must provide:

- An [access token](https://developer.gocardless.com/getting-started/api/making-your-first-request/#creating-an-access-token).
- The environment that this token is for (see [here](https://github.com/gocardless/gocardless-nodejs/blob/077ed5f863dfbb277c6cfb7f95a2210b15052ea4/src/constants.ts#L3) for a list of available environments).
- Any additional options (see [here](#available-client-options) for a list of supported options).

<!-- prettier-ignore -->
```js
const gocardless = require('gocardless-nodejs');
const constants = require('gocardless-nodejs/constants');


// Initialise the client.
const client = gocardless(
  process.env.GC_ACCESS_TOKEN,
  Constants.Environments.Sandbox,
  { raiseOnIdempotencyConflict: true },
);
```

### The Basics

We'll illustrate the basic library usage by demonstrating on the [payment resource](https://developer.gocardless.com/api-reference/#core-endpoints-payments).

For a full list of available resources, visit the [GoCardless API reference](https://developer.gocardless.com/api-reference/#core-endpoints).

<!-- prettier-ignore -->
```js
const uuidv4 = require('uuid/v4');

// Create a new payment.
const payment = client.payments.create({
    amount: '42',
    charge_date: '2020-01-01',
    reference: 'This is my reference',
    ...
  },
  idempotencyKey: uuidv4(),
);

// List all payments.
const payments = client.payments.list();

// List the first three payments past a certain date.
const payments = client.payments.list(
  {
    limit: 3,
    created_at: {
      gt: '2020-01-01T17:01:06.000Z',
    },
  }
);

// Get a payment.
const payment = client.payments.find('PM123');

// Update a payment.
client.payments.update('PM123', { amount: '22' });

// Cancel a payment.
client.payments.cancel('PM123');
```

### The `all` method

All resources with a `list` method will also have an additional `*all` method. This method acts like the regular `list` method and accepts the same parameters, but instead returns an async generator.

<!-- prettier-ignore -->
```js
for await (const payment of client.payments.all()) {
  console.log(payment.id);
}
```

### Available client options

- `raiseOnIdempotencyConflict`: set to `true` to raise exceptions on [idempotency](https://developer.gocardless.com/api-reference/#making-requests-idempotency-keys) conflicts. Defaults to `false`.
