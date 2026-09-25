<!-- This file is generated, please add to it using `knope document-change` in the client-library-templates repo -->
# Changelog

## 10.2.0 (2026-09-25)

### Features

#### Add `interval` param to `GET /reporting/metrics` for aggregating results by day, week, or month

You can now pass `interval` (`daily`, `weekly`, or `monthly`) when fetching metrics to have values aggregated over that period, instead of only receiving a single value for the full `start_date`/`end_date` range.

## 10.1.3 (2026-09-23)

### Fixes

- Fix a bug where API request signing didn't work when a query parameter was added to the request.

## 10.1.2 (2026-09-22)

### Fixes

- Fix example values for a small number of fields to comply with the schema

## 10.1.1 (2026-09-22)

### Fixes

- Fix schema definition/component names to avoid losing types in openapi schema

## 10.1.0 (2026-09-17)

### Features

- Add "reference" to Create Bank Account Holder Verification

## 10.0.3 (2026-09-16)

### Fixes

- Clean up docs and use a shared definition of event `include` and `resource_type` enums

## 10.0.2 (2026-09-14)

### Fixes

#### Fix nullable field declarations and missing properties across multiple resources

Adds `null` to type declarations for fields that legitimately return nil across redirect_flows, webhooks, scheme_identifiers, customer_bank_accounts, outbound_payments, and billing_request_with_actions. Also adds the missing `period_alignment` property to mandate consent_parameters.

## 10.0.1 (2026-09-14)

### Fixes

#### Add missing enum values to schema definitions

Adds `sepa_credit_transfer` and `sepa_instant_credit_transfer` to the complete scheme enum, adds hosted payment flow sources to the event source/type enum, and makes `creditor_type` nullable for legacy creditors.

## 10.0.0 (2026-09-14)

### Breaking Changes

#### Add typed nullable references for billing request template fields

`mandate_request_verify`, `mandate_currency`, and `payment_currency` on
`billing_request_template` are now generated as typed nullable fields instead
of untyped objects. For example, `mandate_request_verify` is now typed as
`MandateRequestVerify` (or the language equivalent) rather than a generic
object type.

This is a breaking change — code that accesses these fields using untyped
patterns (e.g. casting from `Object` in Java) will need to be updated to
use the new typed accessors.

## 9.1.0 (2026-09-11)

### Features

#### Use specific sub-endpoints URLs for create /instalment_schedules: with_schedule and with_dates

The two variants for creating an instalment_schedule were surfaced as separate functions. However, they both went to the same URL and endpoint on the backend.

This created some bugs in generating our openapi schema and therefore our API reference documentation.

Therefore, we've added specific URLs for each endpoint aliased to the original one: `POST /instalment_schedules/with_dates` or `POST /instalment_schedules/with_schedule`.

The existing POST /instalment_schedules endpoint is unchanged and will remain available for the foreseeable future.

Client libraries will now use the specific endpoint matching the method - if you are stubbing the HTTP call you may need to update those stubs.

## 9.0.2 (2026-09-09)

### Fixes

- Add remember_me to ui_components bootstrap endpoint

## 9.0.1 (2026-09-08)

### Fixes

#### Remove incorrect Pro/Enterprise restriction from mandate and customer bank account endpoints

The "Create a mandate", "Reinstate a mandate", and "Create a customer bank account" endpoints incorrectly stated they were restricted to GoCardless Pro and Enterprise accounts. Custom payment pages are available to any merchant — they are not package-restricted.

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
