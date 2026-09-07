<!-- This file is generated, please add to it using `knope document-change` in the client-library-templates repo -->
# Changelog

## 9.0.0 (2026-09-07)

### Breaking Changes

#### Correct amount field types from `string` to `integer`

Where fields such as `amount`, `deducted_fees` or pagination `limit` are returned by the API, they are as integers.

However, for backwards compatibility and convenience, our API accepts either number or strings in _requests_.

We incorrectly used `string` as the only type for those fields in both requests and responses in this client library.

We now only specify them as `integer` so that they are correct for responses and still work for requests.

We might add support for `string` _or_ `integer` in the request bodies for these fields at a later date.

## 8.7.3 (2026-09-07)

### Fixes

- Update code samples to match change to integer types for amounts etc

## 8.7.2 (2026-09-04)

### Fixes

#### Define common titles for common types

The intention is to make it possible to define common types in generated code.
Instead of ~37 different currency enum types which are all equivalent, we could have one.

## 8.7.1 (2026-09-02)

### Fixes

- Fix typo in Mandate next_possible_standard_ach_charge_date description

## 8.7.0 (2026-09-01)

### Features

#### Add `app_connected_organisations` export type

Exports can now be created with `resource_type: app_connected_organisations`, allowing connected merchant details to be exported.

## 8.6.4 (2026-08-27)

### Fixes

- Fix typo in subscription status description

## 8.6.3 (2026-08-13)

### Fixes

- Fix typo in mandate_import_entry status description

## 8.6.2 (2026-08-13)

### Fixes

- Fix typo in mandate_import_entry status description

## 8.6.1 (2026-08-13)

### Fixes

- Fix typo in mandate_import_entry status description

## 8.6.0 (2026-08-11)

### Features

- Add app_fee to Payment
- Add PaymentAccountTransactions to ExportExportType

## 8.5.0

Start of changelog tracking with Knope. See [GitHub releases](https://github.com/gocardless/gocardless-nodejs/releases) for the history of earlier versions.
