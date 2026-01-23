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
- The environment that this token is for (see [here](https://github.com/gocardless/gocardless-nodejs/blob/master/src/constants.ts) for a list of available environments).
- Any additional options (see [here](#available-client-options) for a list of supported options).

```js
import gocardless from 'gocardless-nodejs';
import { Environments } from 'gocardless-nodejs/constants';

// Initialize the client
const client = gocardless(
  process.env.GC_ACCESS_TOKEN,
  Environments.Sandbox,
  { raiseOnIdempotencyConflict: true }
);
```

TypeScript:

```typescript
import gocardless, { GoCardlessClient } from 'gocardless-nodejs';
import { Environments } from 'gocardless-nodejs/constants';
import type { Payment } from 'gocardless-nodejs/types';

const client: GoCardlessClient = gocardless(
  process.env.GC_ACCESS_TOKEN,
  Environments.Sandbox
);

const payment: Payment = await client.payments.find('PM123');
```

### The Basics

We'll illustrate the basic library usage by demonstrating on the [payment resource](https://developer.gocardless.com/api-reference/#core-endpoints-payments).

For a full list of available resources, visit the [GoCardless API reference](https://developer.gocardless.com/api-reference/#core-endpoints).

<!-- prettier-ignore -->
```js
import { v4 as uuidv4 } from 'uuid';

// Create a new payment.
const payment = await client.payments.create(
  {
    amount: 100,
    currency: "GBP",
    links: { mandate: "MD123" },
  },
  { uuidv4() },
);

// List the first three payments past a certain date.
const payments = await client.payments.list({
  limit: 3,
  created_at: {
    gt: '2020-01-01T17:01:06.000Z',
  },
});

// Get a payment.
const payment = await client.payments.find('PM123');

// Update a payment.
await client.payments.update('PM123', { amount: '22' });

// Cancel a payment.
await client.payments.cancel('PM123');
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


### CommonJS backwards compatibility

We provide a CommonJS implementation for backwards compatibility. For CommonJS, change the imports to:

```js
const gocardless = require('gocardless-nodejs');
const { Environments } = require('gocardless-nodejs/constants');
```