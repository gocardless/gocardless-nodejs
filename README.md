GoCardless Node.js
============================================

[![<ORG_NAME>](https://circleci.com/gh/gocardless/gocardless-nodejs.svg?style=svg)](https://github.com/gocardless/gocardless-nodejs/commits/master) [![npm version](https://badge.fury.io/js/gocardless-nodejs.svg)](https://badge.fury.io/js/gocardless-nodejs)


A Node.js client for interacting with the GoCardless API.
------------

## Documentation

For the full documentation and code samples, visit the [`gocardless-nodejs` API reference](https://developer.gocardless.com/api-reference/#core-endpoints).


## Installation

```bash
$ npm i gocardless-nodejs
``` 

## Usage

First, create a Client, providing your access token, the environment you want to use, and any additional options.

<!-- prettier-ignore -->
```js
// Initialise a new client.
const client = require('gocardless-nodejs')(<ACCESS_TOKEN>, <ENVIRONMENT>, options={});
```

We'll illustrate the library usage by demonstrating on the [`Payment` resource](https://developer.gocardless.com/api-reference/#core-endpoints-payments). Note, for a full list of available resources, visit the [`gocardless-nodejs` API reference](https://developer.gocardless.com/api-reference/#core-endpoints).

<!-- prettier-ignore -->
```js
// Create a new payment.
const newPayment = client.payments.create({
    amount: '42',
    charge_date: '2020-01-01',
    reference: 'This is my reference.',
    ...
  }
);

// List all payments.
const payments = gocardless_client.payments.list();

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

All resources with a `list` method will also have an additional `*all` method. This method acts like the regular `list` method, but instead returns an async iterator.

<!-- prettier-ignore -->
```js
const paymentIterator = gocardless_client.payments.all();
for (const payment of paymentIterator) {
  console.log(payment.id);
}
```
