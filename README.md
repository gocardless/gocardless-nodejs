GoCardless Node.js
============================================

[![GoCardless](https://circleci.com/gh/gocardless/gocardless-nodejs.svg?style=svg)](https://github.com/gocardless/gocardless-nodejs/commits/master) [![npm version](https://badge.fury.io/js/gocardless-nodejs.svg)](https://badge.fury.io/js/gocardless-nodejs)


A Node.js client for interacting with the GoCardless API.
------------

## Documentation

For the full documentation and code samples, visit the [`gocardless-nodejs` API reference](https://developer.gocardless.com/api-reference/#core-endpoints).


## Installation

```bash
$ npm i gocardless-nodejs
``` 

## Usage

### Initialising a Client

To initialise a new client, you must provide:

* Your access token.
* The environment that this token is for (see [`here`](https://github.com/gocardless/gocardless-nodejs/blob/077ed5f863dfbb277c6cfb7f95a2210b15052ea4/src/Constants.ts#L3) for a list of available environments).
* Any additional options (see [`here`](#available-client-options) for a list of supported options).

<!-- prettier-ignore -->
```js
const GoCardless = require('gocardless-nodejs');
const constants = require('gocardless-nodejs/Constants');


// Initialise a new client.
const client = GoCardless('live_ACCESS_TOKEN_42', Constants.Environments.Live, { option_0: '0', ... });
```

### The Basics

We'll illustrate the basic library usage by demonstrating on the [`Payment` resource](https://developer.gocardless.com/api-reference/#core-endpoints-payments).

*Note*, for a full list of available resources, visit the [`gocardless` API reference](https://developer.gocardless.com/api-reference/#core-endpoints).

<!-- prettier-ignore -->
```js
// Create a new payment.
const newPayment = client.payments.create({
    amount: '42',
    charge_date: '2020-01-01',
    reference: 'This is my reference.',
    ...
  },
  idempotencyKey: 'my_idempotency_key'
);

// List all payments.
const payments = gocardless_client.payments.list();

// List the first three payments past a certain date.
const payments = gocardless_client.payments.list(
  {
    limit: 3,
    created_at: {
      "gt": "2020-01-01T17:01:06.000Z",
    }
  }
);

// Get a payment.
const payment = gocardless_client.payments.find('<MY-PAYMENT-ID>');

// Update a payment.
gocardless_client.payments.update(
  '<MY-PAYMENT-ID>',
  {
    amount: '22',
    ...
  },
  ...
);
    
// Cancel a payment.
gocardless_client.payments.cancel('<MY-PAYMENT-ID>');
```


### The `all` method

All resources with a `list` method will also have an additional `*all` method. This method acts like the regular `list` method and accepts the same parameters, but instead returns an async iterator.

<!-- prettier-ignore -->
```js
const paymentIterator = gocardless_client.payments.all();
for (const payment of paymentIterator) {
  console.log(payment.id);
}
```

### Available client options

`raise_on_idempotency_conflict` -- Set to `true` to raise exceptions on idempotency conflicts. Defaults to `false`.
