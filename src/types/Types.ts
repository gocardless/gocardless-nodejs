/** Type for a bankdetailslookup resource. */
export interface BankDetailsLookup {
  // Array of [schemes](#mandates_scheme) supported for this bank account. This
  // will be an empty array if the bank account is not reachable by any schemes.
  available_debit_schemes: BankDetailsLookupAvailableDebitScheme[];

  // The name of the bank with which the account is held (if available).
  bank_name: string;

  // ISO 9362 SWIFT BIC of the bank with which the account is held. <p
  // class="notice">Even if no BIC is returned for an account, GoCardless may
  // still be able to collect payments from it - you should refer to the
  // `available_debit_schemes` attribute to determine reachability.</p>
  bic: string;
}

export enum BankDetailsLookupAvailableDebitScheme {
  Ach = 'ach',
  Autogiro = 'autogiro',
  Bacs = 'bacs',
  Becs = 'becs',
  BecsNz = 'becs_nz',
  Betalingsservice = 'betalingsservice',
  Pad = 'pad',
  SepaCore = 'sepa_core',
}

/** Type for a creditor resource. */
export interface Creditor {
  // The first line of the creditor's address.
  address_line1: string;

  // The second line of the creditor's address.
  address_line2: string;

  // The third line of the creditor's address.
  address_line3: string;

  // Boolean indicating whether the creditor is permitted to create refunds
  can_create_refunds: boolean;

  // The city of the creditor's address.
  city: string;

  // [ISO 3166-1 alpha-2
  // code.](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
  country_code: string;

  // Fixed [timestamp](#api-usage-time-zones--dates), recording when this
  // resource was created.
  created_at: string;

  // Boolean value indicating whether creditor has the [Custom Payment
  // Pages](https://support.gocardless.com/hc/en-gb/articles/115003734705-Custom-payment-pages)
  // functionality enabled.
  custom_payment_pages_enabled: boolean;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) code for the
  // currency in which amounts will be paid out (after foreign exchange).
  // Currently "AUD", "CAD", "DKK", "EUR", "GBP", "NZD", "SEK" and "USD" are
  // supported. Present only if payouts will be (or were) made via foreign
  // exchange.
  fx_payout_currency: CreditorFxPayoutCurrency;

  // Unique identifier, beginning with "CR".
  id: string;

  // Resources linked to this Creditor.

  links: CreditorLinks;

  // URL for the creditor's logo, which may be shown on their payment pages.
  logo_url: string;

  // Boolean value indicating whether creditor has the [Mandate
  // Imports](#core-endpoints-mandate-imports) functionality enabled.
  mandate_imports_enabled: boolean;

  // Boolean value indicating whether the organisation is responsible for
  // sending all customer notifications (note this is separate from the
  // functionality described
  // [here](/getting-started/api/handling-customer-notifications/)). If you are
  // a partner app, and this value is true, you should not send notifications on
  // behalf of this organisation.
  merchant_responsible_for_notifications: boolean;

  // The creditor's name.
  name: string;

  // The creditor's postal code.
  postal_code: string;

  // The creditor's address region, county or department.
  region: string;

  // An array of the scheme identifiers this creditor can create mandates
  // against.
  //
  // The support address, `phone_number` and `email` fields are for customers to
  // contact the merchant for support purposes. They must be displayed on the
  // payment page, please see our [compliance
  // requirements](#appendix-compliance-requirements) for more details.
  scheme_identifiers: CreditorSchemeIdentifier[];

  // The creditor's verification status, indicating whether they can yet receive
  // payouts. For more details on handling verification as a partner, see our
  // ["Helping your users get verified"
  // guide](/getting-started/partners/helping-your-users-get-verified/). One of:
  // <ul>
  // <li>`successful`: The creditor's account is fully verified, and they can
  // receive payouts. Once a creditor has been successfully verified, they may
  // in the future require further verification - for example, if they change
  // their payout bank account, we will have to check that they own the new bank
  // account before they can receive payouts again.</li>
  // <li>`in_review`: The creditor has provided all of the information currently
  // requested, and it is awaiting review by GoCardless before they can be
  // verified and receive payouts.</li>
  // <li>`action_required`: The creditor needs to provide further information to
  // verify their account so they can receive payouts, and should visit the
  // verification flow.</li>
  // </ul>
  verification_status: CreditorVerificationStatus;
}

/** Type for a creditorupdaterequestlinks resource. */
export interface CreditorUpdateRequestLinks {
  // ID of the [bank account](#core-endpoints-creditor-bank-accounts) which is
  // set up to receive payouts in AUD.
  default_aud_payout_account: string;

  // ID of the [bank account](#core-endpoints-creditor-bank-accounts) which is
  // set up to receive payouts in CAD.
  default_cad_payout_account: string;

  // ID of the [bank account](#core-endpoints-creditor-bank-accounts) which is
  // set up to receive payouts in DKK.
  default_dkk_payout_account: string;

  // ID of the [bank account](#core-endpoints-creditor-bank-accounts) which is
  // set up to receive payouts in EUR.
  default_eur_payout_account: string;

  // ID of the [bank account](#core-endpoints-creditor-bank-accounts) which is
  // set up to receive payouts in GBP.
  default_gbp_payout_account: string;

  // ID of the [bank account](#core-endpoints-creditor-bank-accounts) which is
  // set up to receive payouts in NZD.
  default_nzd_payout_account: string;

  // ID of the [bank account](#core-endpoints-creditor-bank-accounts) which is
  // set up to receive payouts in SEK.
  default_sek_payout_account: string;

  // ID of the [bank account](#core-endpoints-creditor-bank-accounts) which is
  // set up to receive payouts in USD.
  default_usd_payout_account: string;
}

export enum CreditorFxPayoutCurrency {
  AUD = 'AUD',
  CAD = 'CAD',
  DKK = 'DKK',
  EUR = 'EUR',
  GBP = 'GBP',
  NZD = 'NZD',
  SEK = 'SEK',
  USD = 'USD',
}

/** Type for a creditorlinks resource. */
export interface CreditorLinks {
  // ID of the [bank account](#core-endpoints-creditor-bank-accounts) which is
  // set up to receive payouts in AUD.
  default_aud_payout_account: string;

  // ID of the [bank account](#core-endpoints-creditor-bank-accounts) which is
  // set up to receive payouts in CAD.
  default_cad_payout_account: string;

  // ID of the [bank account](#core-endpoints-creditor-bank-accounts) which is
  // set up to receive payouts in DKK.
  default_dkk_payout_account: string;

  // ID of the [bank account](#core-endpoints-creditor-bank-accounts) which is
  // set up to receive payouts in EUR.
  default_eur_payout_account: string;

  // ID of the [bank account](#core-endpoints-creditor-bank-accounts) which is
  // set up to receive payouts in GBP.
  default_gbp_payout_account: string;

  // ID of the [bank account](#core-endpoints-creditor-bank-accounts) which is
  // set up to receive payouts in NZD.
  default_nzd_payout_account: string;

  // ID of the [bank account](#core-endpoints-creditor-bank-accounts) which is
  // set up to receive payouts in SEK.
  default_sek_payout_account: string;

  // ID of the [bank account](#core-endpoints-creditor-bank-accounts) which is
  // set up to receive payouts in USD.
  default_usd_payout_account: string;
}

/** Type for a creditorschemeidentifier resource. */
export interface CreditorSchemeIdentifier {
  // The first line of the support address.
  address_line1: string;

  // The second line of the support address.
  address_line2: string;

  // The third line of the support address.
  address_line3: string;

  // Whether a custom reference can be submitted for mandates using this scheme
  // identifier.
  can_specify_mandate_reference: boolean;

  // The city of the support address.
  city: string;

  // [ISO 3166-1 alpha-2
  // code.](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
  country_code: string;

  // The currency of the scheme identifier.
  currency: CreditorSchemeIdentifierCurrency;

  // The support email address.
  email: string;

  // The minimum interval, in working days, between the sending of a
  // pre-notification to the customer, and the charge date of a payment using
  // this scheme identifier.
  //
  // By default, GoCardless sends these notifications automatically. Please see
  // our [compliance requirements](#appendix-compliance-requirements) for more
  // details.
  minimum_advance_notice: number;

  // The name which appears on customers' bank statements.
  name: string;

  // The support phone number.
  phone_number: string;

  // The support postal code.
  postal_code: string;

  // The scheme-unique identifier against which payments are submitted.
  reference: string;

  // The support address region, county or department.
  region: string;

  // The scheme which this scheme identifier applies to.
  scheme: CreditorSchemeIdentifierScheme;
}

export enum CreditorSchemeIdentifierCurrency {
  AUD = 'AUD',
  CAD = 'CAD',
  DKK = 'DKK',
  EUR = 'EUR',
  GBP = 'GBP',
  NZD = 'NZD',
  SEK = 'SEK',
  USD = 'USD',
}

export enum CreditorSchemeIdentifierScheme {
  Ach = 'ach',
  Autogiro = 'autogiro',
  Bacs = 'bacs',
  Becs = 'becs',
  BecsNz = 'becs_nz',
  Betalingsservice = 'betalingsservice',
  Pad = 'pad',
  Sepa = 'sepa',
}

export enum CreditorVerificationStatus {
  Successful = 'successful',
  InReview = 'in_review',
  ActionRequired = 'action_required',
}

/** Type for a creditorbankaccount resource. */
export interface CreditorBankAccount {
  // Name of the account holder, as known by the bank. Usually this is the same
  // as the name stored with the linked [creditor](#core-endpoints-creditors).
  // This field will be transliterated, upcased and truncated to 18 characters.
  account_holder_name: string;

  // The last few digits of the account number. Currently 4 digits for NZD bank
  // accounts and 2 digits for other currencies.
  account_number_ending: string;

  // Bank account type. Required for USD-denominated bank accounts. Must not be
  // provided for bank accounts in other currencies. See [local
  // details](#local-bank-details-united-states) for more information.
  account_type: CreditorBankAccountAccountType;

  // Name of bank, taken from the bank details.
  bank_name: string;

  // [ISO 3166-1 alpha-2
  // code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements).
  // Defaults to the country code of the `iban` if supplied, otherwise is
  // required.
  country_code: string;

  // Fixed [timestamp](#api-usage-time-zones--dates), recording when this
  // resource was created.
  created_at: string;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency
  // code. Currently "AUD", "CAD", "DKK", "EUR", "GBP", "NZD", "SEK" and "USD"
  // are supported.
  currency: string;

  // Boolean value showing whether the bank account is enabled or disabled.
  enabled: boolean;

  // Unique identifier, beginning with "BA".
  id: string;

  // Resources linked to this CreditorBankAccount.

  links: CreditorBankAccountLinks;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  metadata: JsonMap;
}

/** Type for a creditorbankaccountcreaterequestlinks resource. */
export interface CreditorBankAccountCreateRequestLinks {
  // ID of the [creditor](#core-endpoints-creditors) that owns this bank
  // account.
  creditor: string;
}

export enum CreditorBankAccountAccountType {
  Savings = 'savings',
  Checking = 'checking',
}

/** Type for a creditorbankaccountlinks resource. */
export interface CreditorBankAccountLinks {
  // ID of the [creditor](#core-endpoints-creditors) that owns this bank
  // account.
  creditor: string;
}

/** Type for a currencyexchangerate resource. */
export interface CurrencyExchangeRate {
  // The exchange rate from the source to target currencies provided with up to
  // 10 decimal places.
  rate: string;

  // Source currency
  source: string;

  // Target currency
  target: string;

  // Time at which the rate was retrieved from the provider.
  time: string;
}

/** Type for a customer resource. */
export interface Customer {
  // The first line of the customer's address.
  address_line1: string;

  // The second line of the customer's address.
  address_line2: string;

  // The third line of the customer's address.
  address_line3: string;

  // The city of the customer's address.
  city: string;

  // Customer's company name. Required unless a `given_name` and `family_name`
  // are provided. For Canadian customers, the use of a `company_name` value
  // will mean that any mandate created from this customer will be considered to
  // be a "Business PAD" (otherwise, any mandate will be considered to be a
  // "Personal PAD").
  company_name: string;

  // [ISO 3166-1 alpha-2
  // code.](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
  country_code: string;

  // Fixed [timestamp](#api-usage-time-zones--dates), recording when this
  // resource was created.
  created_at: string;

  // For Danish customers only. The civic/company number (CPR or CVR) of the
  // customer. Must be supplied if the customer's bank account is denominated in
  // Danish krone (DKK).
  danish_identity_number: string;

  // Customer's email address. Required in most cases, as this allows GoCardless
  // to send notifications to this customer.
  email: string;

  // Customer's surname. Required unless a `company_name` is provided.
  family_name: string;

  // Customer's first name. Required unless a `company_name` is provided.
  given_name: string;

  // Unique identifier, beginning with "CU".
  id: string;

  // [ISO 639-1](http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) code.
  // Used as the language for notification emails sent by GoCardless if your
  // organisation does not send its own (see [compliance
  // requirements](#appendix-compliance-requirements)). Currently only "en",
  // "fr", "de", "pt", "es", "it", "nl", "da", "nb", "sl", "sv" are supported.
  // If this is not provided, the language will be chosen based on the
  // `country_code` (if supplied) or default to "en".
  language: string;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  metadata: JsonMap;

  // [ITU E.123](https://en.wikipedia.org/wiki/E.123) formatted phone number,
  // including country code.
  phone_number: string;

  // The customer's postal code.
  postal_code: string;

  // The customer's address region, county or department. For US customers a 2
  // letter state code ([ISO
  // 3166-2:US](https://en.wikipedia.org/wiki/ISO_3166-2:US) e.g CA) is
  // required.
  region: string;

  // For Swedish customers only. The civic/company number (personnummer,
  // samordningsnummer, or organisationsnummer) of the customer. Must be
  // supplied if the customer's bank account is denominated in Swedish krona
  // (SEK). This field cannot be changed once it has been set.
  swedish_identity_number: string;
}

export enum CustomerCurrency {
  AUD = 'AUD',
  CAD = 'CAD',
  DKK = 'DKK',
  EUR = 'EUR',
  GBP = 'GBP',
  NZD = 'NZD',
  SEK = 'SEK',
  USD = 'USD',
}

/** Type for a customerbankaccount resource. */
export interface CustomerBankAccount {
  // Name of the account holder, as known by the bank. Usually this is the same
  // as the name stored with the linked [creditor](#core-endpoints-creditors).
  // This field will be transliterated, upcased and truncated to 18 characters.
  account_holder_name: string;

  // The last few digits of the account number. Currently 4 digits for NZD bank
  // accounts and 2 digits for other currencies.
  account_number_ending: string;

  // Bank account type. Required for USD-denominated bank accounts. Must not be
  // provided for bank accounts in other currencies. See [local
  // details](#local-bank-details-united-states) for more information.
  account_type: CustomerBankAccountAccountType;

  // Name of bank, taken from the bank details.
  bank_name: string;

  // [ISO 3166-1 alpha-2
  // code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements).
  // Defaults to the country code of the `iban` if supplied, otherwise is
  // required.
  country_code: string;

  // Fixed [timestamp](#api-usage-time-zones--dates), recording when this
  // resource was created.
  created_at: string;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency
  // code. Currently "AUD", "CAD", "DKK", "EUR", "GBP", "NZD", "SEK" and "USD"
  // are supported.
  currency: string;

  // Boolean value showing whether the bank account is enabled or disabled.
  enabled: boolean;

  // Unique identifier, beginning with "BA".
  id: string;

  // Resources linked to this CustomerBankAccount.

  links: CustomerBankAccountLinks;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  metadata: JsonMap;
}

/** Type for a customerbankaccountcreaterequestlinks resource. */
export interface CustomerBankAccountCreateRequestLinks {
  // ID of the [customer](#core-endpoints-customers) that owns this bank
  // account.
  customer: string;

  // ID of a [customer bank account
  // token](#javascript-flow-customer-bank-account-tokens) to use in place of
  // bank account parameters.
  customer_bank_account_token: string;
}

export enum CustomerBankAccountAccountType {
  Savings = 'savings',
  Checking = 'checking',
}

/** Type for a customerbankaccountlinks resource. */
export interface CustomerBankAccountLinks {
  // ID of the [customer](#core-endpoints-customers) that owns this bank
  // account.
  customer: string;
}

/** Type for a customernotification resource. */
export interface CustomerNotification {
  // The action that was taken on the notification. Currently this can only be
  // `handled`,
  // which means the integrator sent the notification themselves.
  //
  action_taken: CustomerNotificationActionTaken;

  // Fixed [timestamp](#api-usage-time-zones--dates), recording when this
  // action was taken.
  action_taken_at: string;

  // A string identifying the integrator who was able to handle this
  // notification.
  action_taken_by: string;

  // The id of the notification.
  id: string;

  // Resources linked to this CustomerNotification.

  links: CustomerNotificationLinks;

  // The type of notification the customer shall receive.
  type: CustomerNotificationType;
}

export enum CustomerNotificationActionTaken {
  Handled = 'handled',
}

/** Type for a customernotificationlinks resource. */
export interface CustomerNotificationLinks {
  // The customer who should be contacted with this notification.
  customer: string;

  // The event that triggered the notification to be scheduled.
  event: string;

  // The identifier of the related mandate.
  mandate: string;

  // The identifier of the related payment.
  payment: string;

  // The identifier of the related refund.
  refund: string;

  // The identifier of the related subscription.
  subscription: string;
}

export enum CustomerNotificationType {
  PaymentCreated = 'payment_created',
  PaymentCancelled = 'payment_cancelled',
  MandateCreated = 'mandate_created',
  SubscriptionCreated = 'subscription_created',
  SubscriptionCancelled = 'subscription_cancelled',
  InstalmentScheduleCreated = 'instalment_schedule_created',
  InstalmentScheduleCancelled = 'instalment_schedule_cancelled',
}

/** Type for a event resource. */
export interface Event {
  // What has happened to the resource.
  action: string;

  // Fixed [timestamp](#api-usage-time-zones--dates), recording when this
  // resource was created.
  created_at: string;

  // Present only in webhooks when an integrator is authorised to send their own
  // notifications. See
  // [here](/getting-started/api/handling-customer-notifications/)
  // for further information.
  //
  customer_notifications: EventCustomerNotification[];

  //
  details: EventDetails;

  // Unique identifier, beginning with "EV".
  id: string;

  // Resources linked to this Event.

  links: EventLinks;

  // If the `details[origin]` is `api`, this will contain any metadata you
  // specified when triggering this event. In other cases it will be an empty
  // object.
  metadata: JsonMap;

  // The resource type for this event. One of:
  // <ul>
  // <li>`payments`</li>
  // <li>`mandates`</li>
  // <li>`payouts`</li>
  // <li>`refunds`</li>
  // <li>`subscriptions`</li>
  // <li>`instalment_schedules`</li>
  // <li>`creditors`</li>
  // </ul>
  resource_type: EventResourceType;
}

export enum EventInclude {}

/** Type for a eventcustomernotification resource. */
export interface EventCustomerNotification {
  // Time after which GoCardless will send the notification by email.
  deadline: string;

  // The id of the notification.
  id: string;

  // Whether or not the notification must be sent.
  mandatory: boolean;

  // The type of notification the customer shall receive.
  type: EventCustomerNotificationType;
}

export enum EventCustomerNotificationType {
  PaymentCreated = 'payment_created',
  PaymentCancelled = 'payment_cancelled',
  MandateCreated = 'mandate_created',
  SubscriptionCreated = 'subscription_created',
  SubscriptionCancelled = 'subscription_cancelled',
  InstalmentScheduleCreated = 'instalment_schedule_created',
  InstalmentScheduleCancelled = 'instalment_schedule_cancelled',
}

/** Type for a eventdetails resource. */
export interface EventDetails {
  // What triggered the event. _Note:_ `cause` is our simplified and predictable
  // key indicating what triggered the event.
  cause: string;

  // Human readable description of the cause. _Note:_ Changes to event
  // descriptions are not considered breaking.
  description: string;

  // Who initiated the event. One of:
  // <ul>
  // <li>`bank`: this event was triggered by a report from the banks</li>
  // <li>`gocardless`: this event was performed by GoCardless automatically</li>
  // <li>`api`: this event was triggered by an API endpoint</li>
  // <li>`customer`: this event was triggered by a Customer</li>
  // </ul>
  origin: EventDetailsOrigin;

  // Set when a `bank` is the origin of the event. This is the reason code
  // received in the report from the customer's bank. See the [GoCardless Direct
  // Debit guide](https://gocardless.com/direct-debit/receiving-messages) for
  // information on the meanings of different reason codes. _Note:_
  // `reason_code` is payment scheme-specific and can be inconsistent between
  // banks.
  reason_code: string;

  // A Direct Debit scheme. Set when a bank is the origin of the event.
  scheme: EventDetailsScheme;

  // Whether the payment will be retried automatically. Set on a payment failed
  // event.
  will_attempt_retry: boolean;
}

export enum EventDetailsOrigin {
  Bank = 'bank',
  Api = 'api',
  Gocardless = 'gocardless',
  Customer = 'customer',
}

export enum EventDetailsScheme {
  Ach = 'ach',
  Autogiro = 'autogiro',
  Bacs = 'bacs',
  Becs = 'becs',
  BecsNz = 'becs_nz',
  Betalingsservice = 'betalingsservice',
  Pad = 'pad',
  SepaCore = 'sepa_core',
  SepaCor1 = 'sepa_cor1',
}

/** Type for a eventlinks resource. */
export interface EventLinks {
  // If `resource_type` is `creditor`, this is the ID of the
  // [creditor](#core-endpoints-creditors) which has been updated.
  creditor: string;

  // If `resource_type` is `instalment_schedule`, this is the ID of the
  // [instalment schedule](#core-endpoints-instalment-schedules) which has been
  // updated.
  instalment_schedule: string;

  // If `resource_type` is `mandates`, this is the ID of the
  // [mandate](#core-endpoints-mandates) which has been updated.
  mandate: string;

  // This is only included for mandate transfer events, when it is the ID of the
  // [customer bank account](#core-endpoints-customer-bank-accounts) which the
  // mandate is being transferred to.
  new_customer_bank_account: string;

  // This is only included for mandate replaced events, when it is the ID of the
  // new [mandate](#core-endpoints-mandates) that replaces the existing mandate.
  new_mandate: string;

  // If the event is included in a [webhook](#webhooks-overview) to an [OAuth
  // app](#appendix-oauth), this is the ID of the account to which it belongs.
  organisation: string;

  // If this event was caused by another, this is the ID of the cause. For
  // example, if a mandate is cancelled it automatically cancels all pending
  // payments associated with it; in this case, the payment cancellation events
  // would have the ID of the mandate cancellation event in this field.
  parent_event: string;

  // If `resource_type` is `payments`, this is the ID of the
  // [payment](#core-endpoints-payments) which has been updated.
  payment: string;

  // If `resource_type` is `payouts`, this is the ID of the
  // [payout](#core-endpoints-payouts) which has been updated.
  payout: string;

  // This is only included for mandate transfer events, when it is the ID of the
  // [customer bank account](#core-endpoints-customer-bank-accounts) which the
  // mandate is being transferred from.
  previous_customer_bank_account: string;

  // If `resource_type` is `refunds`, this is the ID of the
  // [refund](#core-endpoints-refunds) which has been updated.
  refund: string;

  // If `resource_type` is `subscription`, this is the ID of the
  // [subscription](#core-endpoints-subscriptions) which has been updated.
  subscription: string;
}

export enum EventResourceType {
  Payments = 'payments',
  Mandates = 'mandates',
  Payouts = 'payouts',
  Refunds = 'refunds',
  Subscriptions = 'subscriptions',
  InstalmentSchedules = 'instalment_schedules',
  Creditors = 'creditors',
}

/** Type for a instalmentschedule resource. */
export interface InstalmentSchedule {
  // Fixed [timestamp](#api-usage-time-zones--dates), recording when this
  // resource was created.
  created_at: string;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency
  // code. Currently "AUD", "CAD", "DKK", "EUR", "GBP", "NZD", "SEK" and "USD"
  // are supported.
  currency: InstalmentScheduleCurrency;

  // Unique identifier, beginning with "IS".
  id: string;

  // Resources linked to this InstalmentSchedule.

  links: InstalmentScheduleLinks;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  metadata: JsonMap;

  // Name of the instalment schedule, up to 100 chars. This name will also be
  // copied to the payments of the instalment schedule if you use schedule-based
  // creation.
  name: string;

  // If the status is `creation_failed`, this property will be populated with
  // validation
  // failures from the individual payments, arranged by the index of the payment
  // that
  // failed.
  //
  payment_errors: JsonMap;

  // One of:
  // <ul>
  // <li>`pending`: we're waiting for GC to create the payments</li>
  // <li>`active`: the payments have been created, and the schedule is
  // active</li>
  // <li>`creation_failed`: payment creation failed</li>
  // <li>`completed`: we have passed the date of the final payment and all
  // payments have been collected</li>
  // <li>`cancelled`: the schedule has been cancelled</li>
  // <li>`errored`: one or more payments have failed</li>
  // </ul>
  status: InstalmentScheduleStatus;

  // The total amount of the instalment schedule, defined as the sum of all
  // individual
  // payments, in the lowest denomination for the currency (e.g. pence in GBP,
  // cents in
  // EUR). If the requested payment amounts do not sum up correctly, a
  // validation error
  // will be returned.
  total_amount: string;
}

/** Type for a instalmentschedulecreatewithdatesrequestlinks resource. */
export interface InstalmentScheduleCreateWithDatesRequestLinks {
  // ID of the associated [mandate](#core-endpoints-mandates) which the
  // instalment schedule will create payments against.
  mandate: string;
}

/** Type for a instalmentscheduleinstalments resource. */
export interface InstalmentScheduleInstalments {
  // List of amounts of each instalment, in the lowest denomination for the
  // currency (e.g. pence in GBP, cents in EUR).
  //
  amounts: string[];

  // Number of `interval_units` between charge dates. Must be greater than or
  // equal to `1`.
  //
  interval: number;

  // The unit of time between customer charge dates. One of `weekly`, `monthly`
  // or `yearly`.
  interval_unit: InstalmentScheduleInstalmentsIntervalUnit;

  // The date on which the first payment should be charged. Must be on or after
  // the [mandate](#core-endpoints-mandates)'s `next_possible_charge_date`. When
  // blank, this will be set as the mandate's `next_possible_charge_date`.
  start_date: string;
}

export enum InstalmentScheduleInstalmentsIntervalUnit {
  Weekly = 'weekly',
  Monthly = 'monthly',
  Yearly = 'yearly',
}

/** Type for a instalmentschedulecreatewithschedulerequestlinks resource. */
export interface InstalmentScheduleCreateWithScheduleRequestLinks {
  // ID of the associated [mandate](#core-endpoints-mandates) which the
  // instalment schedule will create payments against.
  mandate: string;
}

export enum InstalmentScheduleCurrency {
  AUD = 'AUD',
  CAD = 'CAD',
  DKK = 'DKK',
  EUR = 'EUR',
  GBP = 'GBP',
  NZD = 'NZD',
  SEK = 'SEK',
  USD = 'USD',
}

/** Type for a instalmentschedulelinks resource. */
export interface InstalmentScheduleLinks {
  // ID of the associated [customer](#core-endpoints-customers).
  customer: string;

  // ID of the associated [mandate](#core-endpoints-mandates) which the
  // instalment schedule will create payments against.
  mandate: string;

  // Array of IDs of the associated [payments](#core-endpoints-payments)
  payments: string[];
}

export enum InstalmentScheduleStatus {
  Pending = 'pending',
  Active = 'active',
  CreationFailed = 'creation_failed',
  Completed = 'completed',
  Cancelled = 'cancelled',
  Errored = 'errored',
}

/** Type for a mandate resource. */
export interface Mandate {
  // Fixed [timestamp](#api-usage-time-zones--dates), recording when this
  // resource was created.
  created_at: string;

  // Unique identifier, beginning with "MD". Note that this prefix may not apply
  // to mandates created before 2016.
  id: string;

  // Resources linked to this Mandate.

  links: MandateLinks;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  metadata: JsonMap;

  // The earliest date that can be used as a `charge_date` on any newly created
  // payment for this mandate. This value will change over time.
  next_possible_charge_date: string;

  // Boolean value showing whether payments and subscriptions under this mandate
  // require approval via an automated email before being processed.
  payments_require_approval: boolean;

  // Unique reference. Different schemes have different length and [character
  // set](#appendix-character-sets) requirements. GoCardless will generate a
  // unique reference satisfying the different scheme requirements if this field
  // is left blank.
  reference: string;

  // <a name="mandates_scheme"></a>Direct Debit scheme to which this mandate and
  // associated payments are submitted. Can be supplied or automatically
  // detected from the customer's bank account.
  scheme: string;

  // One of:
  // <ul>
  // <li>`pending_customer_approval`: the mandate has not yet been signed by the
  // second customer</li>
  // <li>`pending_submission`: the mandate has not yet been submitted to the
  // customer's bank</li>
  // <li>`submitted`: the mandate has been submitted to the customer's bank but
  // has not been processed yet</li>
  // <li>`active`: the mandate has been successfully set up by the customer's
  // bank</li>
  // <li>`failed`: the mandate could not be created</li>
  // <li>`cancelled`: the mandate has been cancelled</li>
  // <li>`expired`: the mandate has expired due to dormancy</li>
  // </ul>
  status: MandateStatus;
}

/** Type for a mandatecreaterequestlinks resource. */
export interface MandateCreateRequestLinks {
  // ID of the associated [creditor](#core-endpoints-creditors). Only required
  // if your account manages multiple creditors.
  creditor: string;

  // ID of the associated [customer bank
  // account](#core-endpoints-customer-bank-accounts) which the mandate is
  // created and submits payments against.
  customer_bank_account: string;
}

/** Type for a mandatelinks resource. */
export interface MandateLinks {
  // ID of the associated [creditor](#core-endpoints-creditors).
  creditor: string;

  // ID of the associated [customer](#core-endpoints-customers)
  customer: string;

  // ID of the associated [customer bank
  // account](#core-endpoints-customer-bank-accounts) which the mandate is
  // created and submits payments against.
  customer_bank_account: string;

  // ID of the new mandate if this mandate has been replaced.
  new_mandate: string;
}

export enum MandateStatus {
  PendingCustomerApproval = 'pending_customer_approval',
  PendingSubmission = 'pending_submission',
  Submitted = 'submitted',
  Active = 'active',
  Failed = 'failed',
  Cancelled = 'cancelled',
  Expired = 'expired',
}

/** Type for a mandateimport resource. */
export interface MandateImport {
  // Fixed [timestamp](#api-usage-time-zones--dates), recording when this
  // resource was created.
  created_at: string;

  // Unique identifier, beginning with "IM".
  id: string;

  // The scheme of the mandates to be imported.<br>All mandates in a single
  // mandate
  // import must be for the same scheme.
  scheme: MandateImportScheme;

  // The status of the mandate import.
  // <ul>
  // <li>New mandate imports report the `created` status.</li>
  // <li>When the integrator has finished adding mandates and
  // <a href="#mandate-imports-submit-a-mandate-import">submitted</a> the
  // import, the status will report as `submitted`.</li>
  // <li>If the integrator decided to
  // <a href="#mandate-imports-cancel-a-mandate-import">cancel</a> the mandate
  // import,
  // the status will report `cancelled`.</li>
  // <li>Once a mandate import has been approved by a GoCardless team member,
  // the status will
  // initially report as `processing` (whilst the mandates are being
  // imported).</li>
  // <li>When the mandates have all been imported successfully, the status will
  // report as `processed`.</li>
  // </ul>
  status: MandateImportStatus;
}

export enum MandateImportScheme {
  Ach = 'ach',
  Autogiro = 'autogiro',
  Bacs = 'bacs',
  Becs = 'becs',
  BecsNz = 'becs_nz',
  Betalingsservice = 'betalingsservice',
  Pad = 'pad',
  SepaCore = 'sepa_core',
}

export enum MandateImportStatus {
  Created = 'created',
  Submitted = 'submitted',
  Cancelled = 'cancelled',
  Processing = 'processing',
  Processed = 'processed',
}

/** Type for a mandateimportentry resource. */
export interface MandateImportEntry {
  // Fixed [timestamp](#api-usage-time-zones--dates), recording when this
  // resource was created.
  created_at: string;

  // Resources linked to this MandateImportEntry.

  links: MandateImportEntryLinks;

  // A unique identifier for this entry, which you can use (once the import has
  // been
  // processed by GoCardless) to identify the records that have been created.
  //
  record_identifier: string;
}

/** Type for a mandateimportentryamendment resource. */
export interface MandateImportEntryAmendment {
  // The creditor identifier of the direct debit originator. Required if mandate
  // import scheme is `sepa`.
  //
  original_creditor_id: string;

  // Data about the original mandate to be moved or modified.
  //
  original_creditor_name: string;

  // The unique SEPA reference for the mandate being amended. Required if
  // mandate
  // import scheme is `sepa`.
  //
  original_mandate_reference: string;
}

/** Type for a mandateimportentrybankaccount resource. */
export interface MandateImportEntryBankAccount {
  // Name of the account holder, as known by the bank. Usually this is the same
  // as the name stored with the linked [creditor](#core-endpoints-creditors).
  // This field will be transliterated, upcased and truncated to 18 characters.
  account_holder_name: string;

  // Bank account number - see [local details](#appendix-local-bank-details) for
  // more information. Alternatively you can provide an `iban`.
  account_number: string;

  // Bank code - see [local details](#appendix-local-bank-details) for more
  // information. Alternatively you can provide an `iban`.
  bank_code: string;

  // Branch code - see [local details](#appendix-local-bank-details) for more
  // information. Alternatively you can provide an `iban`.
  branch_code: string;

  // [ISO 3166-1 alpha-2
  // code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements).
  // Defaults to the country code of the `iban` if supplied, otherwise is
  // required.
  country_code: string;

  // International Bank Account Number. Alternatively you can provide [local
  // details](#appendix-local-bank-details). IBANs are not accepted for Swedish
  // bank accounts denominated in SEK - you must supply [local
  // details](#local-bank-details-sweden).
  iban: string;
}

/** Type for a mandateimportentrycustomer resource. */
export interface MandateImportEntryCustomer {
  // The first line of the customer's address. Required if mandate import scheme
  // is `bacs`.
  //
  address_line1: string;

  // The second line of the customer's address.
  address_line2: string;

  // The third line of the customer's address.
  address_line3: string;

  // The city of the customer's address.
  city: string;

  // Customer's company name. Required unless a `given_name` and `family_name`
  // are provided. For Canadian customers, the use of a `company_name` value
  // will mean that any mandate created from this customer will be considered to
  // be a "Business PAD" (otherwise, any mandate will be considered to be a
  // "Personal PAD").
  company_name: string;

  // [ISO 3166-1 alpha-2
  // code.](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
  country_code: string;

  // For Danish customers only. The civic/company number (CPR or CVR) of the
  // customer. Must be supplied if the customer's bank account is denominated in
  // Danish krone (DKK).
  danish_identity_number: string;

  // Customer's email address. Required in most cases, as this allows GoCardless
  // to send notifications to this customer.
  email: string;

  // Customer's surname. Required unless a `company_name` is provided.
  family_name: string;

  // Customer's first name. Required unless a `company_name` is provided.
  given_name: string;

  // [ISO 639-1](http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) code.
  // Used as the language for notification emails sent by GoCardless if your
  // organisation does not send its own (see [compliance
  // requirements](#appendix-compliance-requirements)). Currently only "en",
  // "fr", "de", "pt", "es", "it", "nl", "da", "nb", "sl", "sv" are supported.
  // If this is not provided, the language will be chosen based on the
  // `country_code` (if supplied) or default to "en".
  language: string;

  // [ITU E.123](https://en.wikipedia.org/wiki/E.123) formatted phone number,
  // including country code.
  phone_number: string;

  // The customer's postal code. Required if mandate import scheme is `bacs`.
  //
  postal_code: string;

  // The customer's address region, county or department. For US customers a 2
  // letter state code ([ISO
  // 3166-2:US](https://en.wikipedia.org/wiki/ISO_3166-2:US) e.g CA) is
  // required.
  region: string;

  // For Swedish customers only. The civic/company number (personnummer,
  // samordningsnummer, or organisationsnummer) of the customer. Must be
  // supplied if the customer's bank account is denominated in Swedish krona
  // (SEK). This field cannot be changed once it has been set.
  swedish_identity_number: string;
}

/** Type for a mandateimportentrycreaterequestlinks resource. */
export interface MandateImportEntryCreateRequestLinks {
  // Unique identifier, beginning with "IM".
  mandate_import: string;
}

/** Type for a mandateimportentrylinks resource. */
export interface MandateImportEntryLinks {
  // The ID of the customer which was created when the mandate import was
  // processed.
  customer: string;

  // The ID of the customer bank account which was created when the mandate
  // import
  // was processed.
  customer_bank_account: string;

  // The ID of the mandate which was created when the mandate import was
  // processed.
  mandate: string;

  // The ID of the mandate import. This is returned when you
  // [create a Mandate Import](#mandate-imports-create-a-new-mandate-import).
  //
  mandate_import: string;
}

/** Type for a mandatepdf resource. */
export interface MandatePdf {
  // The date and time at which the `url` will expire (10 minutes after the
  // original request).
  expires_at: string;

  // The URL at which this mandate PDF can be viewed until it expires at the
  // date and time specified by `expires_at`. You should not store this URL or
  // rely on its structure remaining the same.
  url: string;
}

export enum MandatePdfAccountType {
  Savings = 'savings',
  Checking = 'checking',
}

/** Type for a mandatepdfcreaterequestlinks resource. */
export interface MandatePdfCreateRequestLinks {
  // ID of an existing [mandate](#core-endpoints-mandates) to build the PDF
  // from. The customer's bank details will be censored in the generated PDF. No
  // other parameters may be provided alongside this.
  mandate: string;
}

export enum MandatePdfSubscriptionFrequency {
  Weekly = 'weekly',
  Monthly = 'monthly',
  Yearly = 'yearly',
}

/** Type for a payment resource. */
export interface Payment {
  // Amount, in the lowest denomination for the currency (e.g. pence in GBP,
  // cents in EUR).
  amount: string;

  // Amount [refunded](#core-endpoints-refunds), in the lowest denomination for
  // the currency (e.g. pence in GBP, cents in EUR).
  amount_refunded: string;

  // A future date on which the payment should be collected. If not specified,
  // the payment will be collected as soon as possible. This must be on or after
  // the [mandate](#core-endpoints-mandates)'s `next_possible_charge_date`, and
  // will be rolled-forwards by GoCardless if it is not a working day.
  charge_date: string;

  // Fixed [timestamp](#api-usage-time-zones--dates), recording when this
  // resource was created.
  created_at: string;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency
  // code. Currently "AUD", "CAD", "DKK", "EUR", "GBP", "NZD", "SEK" and "USD"
  // are supported.
  currency: PaymentCurrency;

  // A human-readable description of the payment. This will be included in the
  // notification email GoCardless sends to your customer if your organisation
  // does not send its own notifications (see [compliance
  // requirements](#appendix-compliance-requirements)).
  description: string;

  //
  fx: PaymentFx;

  // Unique identifier, beginning with "PM".
  id: string;

  // Resources linked to this Payment.

  links: PaymentLinks;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  metadata: JsonMap;

  // An optional reference that will appear on your customer's bank statement.
  // The character limit for this reference is dependent on the scheme.<br />
  // <strong>ACH</strong> - 10 characters<br /> <strong>Autogiro</strong> - 11
  // characters<br /> <strong>Bacs</strong> - 10 characters<br />
  // <strong>BECS</strong> - 30 characters<br /> <strong>BECS NZ</strong> - 12
  // characters<br /> <strong>Betalingsservice</strong> - 30 characters<br />
  // <strong>PAD</strong> - 12 characters<br /> <strong>SEPA</strong> - 140
  // characters <p class='restricted-notice'><strong>Restricted</strong>: You
  // can only specify a payment reference for Bacs payments (that is, when
  // collecting from the UK) if you're on the <a
  // href='https://gocardless.com/pricing'>GoCardless Plus, Pro or Enterprise
  // packages</a>.</p>
  reference: string;

  // On failure, automatically retry the payment using [Optimise Smart Payment
  // Retries](#optimise-smart-payment-retries). Default is `false`.
  retry_if_possible: boolean;

  // One of:
  // <ul>
  // <li>`pending_customer_approval`: we're waiting for the customer to approve
  // this payment</li>
  // <li>`pending_submission`: the payment has been created, but not yet
  // submitted to the banks</li>
  // <li>`submitted`: the payment has been submitted to the banks</li>
  // <li>`confirmed`: the payment has been confirmed as collected</li>
  // <li>`paid_out`:  the payment has been included in a
  // [payout](#core-endpoints-payouts)</li>
  // <li>`cancelled`: the payment has been cancelled</li>
  // <li>`customer_approval_denied`: the customer has denied approval for the
  // payment. You should contact the customer directly</li>
  // <li>`failed`: the payment failed to be processed. Note that payments can
  // fail after being confirmed if the failure message is sent late by the
  // banks.</li>
  // <li>`charged_back`: the payment has been charged back</li>
  // </ul>
  status: PaymentStatus;
}

/** Type for a paymentcreaterequestlinks resource. */
export interface PaymentCreateRequestLinks {
  // ID of the [mandate](#core-endpoints-mandates) against which this payment
  // should be collected.
  mandate: string;
}

/** Type for a paymentchargedate resource. */
export interface PaymentChargeDate {
  // Limit to records where the payment was or will be collected from the
  // customer's bank account after the specified date.
  gt: string;

  // Limit to records where the payment was or will be collected from the
  // customer's bank account on or after the specified date.
  gte: string;

  // Limit to records where the payment was or will be collected from the
  // customer's bank account before the specified date.
  lt: string;

  // Limit to records where the payment was or will be collected from the
  // customer's bank account on or before the specified date.
  lte: string;
}

export enum PaymentCurrency {
  AUD = 'AUD',
  CAD = 'CAD',
  DKK = 'DKK',
  EUR = 'EUR',
  GBP = 'GBP',
  NZD = 'NZD',
  SEK = 'SEK',
  USD = 'USD',
}

/** Type for a paymentfx resource. */
export interface PaymentFx {
  // Estimated rate that will be used in the foreign exchange of the `amount`
  // into the `fx_currency`.
  // This will vary based on the prevailing market rate until the moment that it
  // is paid out.
  // Present only before a resource is paid out. Has up to 10 decimal places.
  estimated_exchange_rate: string;

  // Rate used in the foreign exchange of the `amount` into the `fx_currency`.
  // Present only after a resource is paid out. Has up to 10 decimal places.
  exchange_rate: string;

  // Amount that was paid out in the `fx_currency` after foreign exchange.
  // Present only after the resource has been paid out.
  fx_amount: string;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) code for the
  // currency in which amounts will be paid out (after foreign exchange).
  // Currently "AUD", "CAD", "DKK", "EUR", "GBP", "NZD", "SEK" and "USD" are
  // supported. Present only if payouts will be (or were) made via foreign
  // exchange.
  fx_currency: PaymentFxFxCurrency;
}

export enum PaymentFxFxCurrency {
  AUD = 'AUD',
  CAD = 'CAD',
  DKK = 'DKK',
  EUR = 'EUR',
  GBP = 'GBP',
  NZD = 'NZD',
  SEK = 'SEK',
  USD = 'USD',
}

/** Type for a paymentlinks resource. */
export interface PaymentLinks {
  // ID of [creditor](#core-endpoints-creditors) to which the collected payment
  // will be sent.
  creditor: string;

  // ID of [instalment_schedule](#core-endpoints-instalment-schedules) from
  // which this payment was created.<br/>**Note**: this property will only be
  // present if this payment is part of an instalment schedule.
  instalment_schedule: string;

  // ID of the [mandate](#core-endpoints-mandates) against which this payment
  // should be collected.
  mandate: string;

  // ID of [payout](#core-endpoints-payouts) which contains the funds from this
  // payment.<br/>**Note**: this property will not be present until the payment
  // has been successfully collected.
  payout: string;

  // ID of [subscription](#core-endpoints-subscriptions) from which this payment
  // was created.<br/>**Note**: this property will only be present if this
  // payment is part of a subscription.
  subscription: string;
}

export enum PaymentStatus {
  PendingCustomerApproval = 'pending_customer_approval',
  PendingSubmission = 'pending_submission',
  Submitted = 'submitted',
  Confirmed = 'confirmed',
  PaidOut = 'paid_out',
  Cancelled = 'cancelled',
  CustomerApprovalDenied = 'customer_approval_denied',
  Failed = 'failed',
  ChargedBack = 'charged_back',
}

/** Type for a payout resource. */
export interface Payout {
  // Amount in minor unit (e.g. pence in GBP, cents in EUR).
  amount: string;

  // Date the payout is due to arrive in the creditor's bank account.
  // One of:
  // <ul>
  //   <li>`yyyy-mm-dd`: the payout has been paid and is due to arrive in the
  // creditor's bank
  //   account on this day</li>
  //   <li>`null`: the payout hasn't been paid yet</li>
  // </ul>
  //
  arrival_date: string;

  // Fixed [timestamp](#api-usage-time-zones--dates), recording when this
  // resource was created.
  created_at: string;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency
  // code. Currently "AUD", "CAD", "DKK", "EUR", "GBP", "NZD", "SEK" and "USD"
  // are supported.
  currency: PayoutCurrency;

  // Fees that have already been deducted from the payout amount in minor unit
  // (e.g. pence in GBP, cents in EUR).
  //
  // For each `late_failure_settled` or `chargeback_settled` action, we refund
  // the transaction fees in a payout. This means that a payout can have a
  // negative `deducted_fees` value.
  //
  // This field is calculated as `(GoCardless fees + app fees + surcharge fees)
  // - (refunded fees)`
  //
  // If the merchant is invoiced for fees separately from the payout, then
  // `deducted_fees` will be 0.
  deducted_fees: string;

  //
  fx: PayoutFx;

  // Unique identifier, beginning with "PO".
  id: string;

  // Resources linked to this Payout.

  links: PayoutLinks;

  // Whether a payout contains merchant revenue or partner fees.
  payout_type: PayoutPayoutType;

  // Reference which appears on the creditor's bank statement.
  reference: string;

  // One of:
  // <ul>
  // <li>`pending`: the payout has been created, but not yet sent to the
  // banks</li>
  // <li>`paid`: the payout has been sent to the banks</li>
  // <li>`bounced`: the payout bounced when sent, the payout can be
  // retried.</li>
  // </ul>
  status: PayoutStatus;
}

export enum PayoutCurrency {
  AUD = 'AUD',
  CAD = 'CAD',
  DKK = 'DKK',
  EUR = 'EUR',
  GBP = 'GBP',
  NZD = 'NZD',
  SEK = 'SEK',
  USD = 'USD',
}

/** Type for a payoutfx resource. */
export interface PayoutFx {
  // Estimated rate that will be used in the foreign exchange of the `amount`
  // into the `fx_currency`.
  // This will vary based on the prevailing market rate until the moment that it
  // is paid out.
  // Present only before a resource is paid out. Has up to 10 decimal places.
  estimated_exchange_rate: string;

  // Rate used in the foreign exchange of the `amount` into the `fx_currency`.
  // Present only after a resource is paid out. Has up to 10 decimal places.
  exchange_rate: string;

  // Amount that was paid out in the `fx_currency` after foreign exchange.
  // Present only after the resource has been paid out.
  fx_amount: string;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) code for the
  // currency in which amounts will be paid out (after foreign exchange).
  // Currently "AUD", "CAD", "DKK", "EUR", "GBP", "NZD", "SEK" and "USD" are
  // supported. Present only if payouts will be (or were) made via foreign
  // exchange.
  fx_currency: PayoutFxFxCurrency;
}

export enum PayoutFxFxCurrency {
  AUD = 'AUD',
  CAD = 'CAD',
  DKK = 'DKK',
  EUR = 'EUR',
  GBP = 'GBP',
  NZD = 'NZD',
  SEK = 'SEK',
  USD = 'USD',
}

/** Type for a payoutlinks resource. */
export interface PayoutLinks {
  // ID of [creditor](#core-endpoints-creditors) who will receive this payout,
  // i.e. the owner of the `creditor_bank_account`.
  creditor: string;

  // ID of [bank account](#core-endpoints-creditor-bank-accounts) which this
  // will be sent to.
  creditor_bank_account: string;
}

export enum PayoutPayoutType {
  Merchant = 'merchant',
  Partner = 'partner',
}

export enum PayoutStatus {
  Pending = 'pending',
  Paid = 'paid',
  Bounced = 'bounced',
}

/** Type for a payoutitem resource. */
export interface PayoutItem {
  // The positive (credit) or negative (debit) value of the item, in fractional
  // currency;
  // the lowest denomination for the currency (e.g. pence in GBP, cents in EUR),
  // to one decimal place.
  // <p class="notice">For accuracy, we store some of our fees to greater
  // precision than
  // we can actually pay out (for example, a GoCardless fee we record might come
  // to 0.5
  // pence, but it is not possible to send a payout via bank transfer including
  // a half
  // penny).<br><br>To calculate the final amount of the payout, we sum all of
  // the items
  // and then round to the nearest currency unit.</p>
  //
  amount: string;

  // Resources linked to this PayoutItem.

  links: PayoutItemLinks;

  // The type of the credit (positive) or debit (negative) item in the payout.
  // One of:
  // <ul>
  // <li>`payment_paid_out` (credit)</li>
  // <li>`payment_failed` (debit): The payment failed to be processed.</li>
  // <li>`payment_charged_back` (debit): The payment has been charged back.</li>
  // <li>`payment_refunded` (debit): The payment has been refunded to the
  // customer.</li>
  // <li>`refund` (debit): <em>private beta</em> A refund sent to a customer,
  // not linked to a payment.</li>
  // <li>`refund_funds_returned` (credit): The refund could not be sent to the
  // customer, and the funds have been returned to you.</li>
  // <li>`gocardless_fee` (credit/debit): The fees that GoCardless charged for a
  // payment. In the case of a payment failure or chargeback, these will appear
  // as credits.</li>
  // <li>`app_fee` (credit/debit): The optional fees that a partner may have
  // taken for a payment. In the case of a payment failure or chargeback, these
  // will appear as credits.</li>
  // <li>`revenue_share` (credit/debit): A share of the fees that GoCardless
  // collected which some partner integrations receive when their users take
  // payments. Only shown in partner payouts. In the case of a payment failure
  // or chargeback, these will appear as credits.</li>
  // <li>`surcharge_fee` (credit/debit): GoCardless deducted a surcharge fee as
  // the payment failed or was charged back, or refunded a surcharge fee as the
  // bank or customer cancelled the chargeback.</li>
  // </ul>
  //
  type: PayoutItemType;
}

/** Type for a payoutitemlinks resource. */
export interface PayoutItemLinks {
  // Unique identifier, beginning with "MD". Note that this prefix may not apply
  // to mandates created before 2016.
  mandate: string;

  // Unique identifier, beginning with "PM".
  payment: string;
}

export enum PayoutItemType {
  PaymentPaidOut = 'payment_paid_out',
  PaymentFailed = 'payment_failed',
  PaymentChargedBack = 'payment_charged_back',
  PaymentRefunded = 'payment_refunded',
  Refund = 'refund',
  GocardlessFee = 'gocardless_fee',
  AppFee = 'app_fee',
  RevenueShare = 'revenue_share',
  SurchargeFee = 'surcharge_fee',
}

/** Type for a redirectflow resource. */
export interface RedirectFlow {
  // The URL of a confirmation page, which you may optionally redirect the
  // customer to rather than use your own page, that confirms in their chosen
  // language that their Direct Debit has been set up successfully. Only
  // returned once the customer has set up their mandate via the payment pages
  // and the redirect flow has been
  // [completed](#redirect-flows-complete-a-redirect-flow), and only available
  // for 15 minutes from when you complete the redirect flow. The structure of
  // this URL may change at any time, so you should read it directly from the
  // API response.
  confirmation_url: string;

  // Fixed [timestamp](#api-usage-time-zones--dates), recording when this
  // resource was created.
  created_at: string;

  // A description of the item the customer is paying for. This will be shown on
  // the hosted payment pages.
  description: string;

  // Unique identifier, beginning with "RE".
  id: string;

  // Resources linked to this RedirectFlow.

  links: RedirectFlowLinks;

  // The URL of the hosted payment pages for this redirect flow. This is the URL
  // you should redirect your customer to.
  redirect_url: string;

  // The Direct Debit scheme of the mandate. If specified, the payment pages
  // will only allow the set-up of a mandate for the specified scheme. It is
  // recommended that you leave this blank so the most appropriate scheme is
  // picked based on the customer's bank account.
  scheme: RedirectFlowScheme;

  // The customer's session ID must be provided when the redirect flow is set up
  // and again when it is completed. This allows integrators to ensure that the
  // user who was originally sent to the GoCardless payment pages is the one who
  // has completed them.
  session_token: string;

  // The URL to redirect to upon successful mandate setup. You must use a URL
  // beginning `https` in the live environment.
  success_redirect_url: string;
}

/** Type for a redirectflowcreaterequestlinks resource. */
export interface RedirectFlowCreateRequestLinks {
  // The [creditor](#core-endpoints-creditors) for whom the mandate will be
  // created. The `name` of the creditor will be displayed on the payment page.
  // Required if your account manages multiple creditors.
  creditor: string;
}

/** Type for a redirectflowprefilledcustomer resource. */
export interface RedirectFlowPrefilledCustomer {
  // The first line of the customer's address.
  address_line1: string;

  // The second line of the customer's address.
  address_line2: string;

  // The third line of the customer's address.
  address_line3: string;

  // The city of the customer's address.
  city: string;

  // Customer's company name.
  company_name: string;

  // [ISO 3166-1 alpha-2
  // code.](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
  country_code: string;

  // For Danish customers only. The civic/company number (CPR or CVR) of the
  // customer.
  danish_identity_number: string;

  // Customer's email address.
  email: string;

  // Customer's surname.
  family_name: string;

  // Customer's first name.
  given_name: string;

  // [ISO 639-1](http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) code.
  language: string;

  // For New Zealand customers only.
  phone_number: string;

  // The customer's postal code.
  postal_code: string;

  // The customer's address region, county or department.
  region: string;

  // For Swedish customers only. The civic/company number (personnummer,
  // samordningsnummer, or organisationsnummer) of the customer.
  swedish_identity_number: string;
}

/** Type for a redirectflowlinks resource. */
export interface RedirectFlowLinks {
  // The [creditor](#core-endpoints-creditors) for whom the mandate will be
  // created. The `name` of the creditor will be displayed on the payment page.
  creditor: string;

  // ID of [customer](#core-endpoints-customers) created by this redirect
  // flow.<br/>**Note**: this property will not be present until the redirect
  // flow has been successfully completed.
  customer: string;

  // ID of [customer bank account](#core-endpoints-customer-bank-accounts)
  // created by this redirect flow.<br/>**Note**: this property will not be
  // present until the redirect flow has been successfully completed.
  customer_bank_account: string;

  // ID of [mandate](#core-endpoints-mandates) created by this redirect
  // flow.<br/>**Note**: this property will not be present until the redirect
  // flow has been successfully completed.
  mandate: string;
}

export enum RedirectFlowScheme {
  Ach = 'ach',
  Autogiro = 'autogiro',
  Bacs = 'bacs',
  Becs = 'becs',
  BecsNz = 'becs_nz',
  Betalingsservice = 'betalingsservice',
  Pad = 'pad',
  SepaCore = 'sepa_core',
}

/** Type for a refund resource. */
export interface Refund {
  // Amount in minor unit (e.g. pence in GBP, cents in EUR).
  amount: string;

  // Fixed [timestamp](#api-usage-time-zones--dates), recording when this
  // resource was created.
  created_at: string;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency
  // code. This is set to the currency of the refund's
  // [payment](#core-endpoints-payments).
  currency: string;

  //
  fx: RefundFx;

  // Unique identifier, beginning with "RF".
  id: string;

  // Resources linked to this Refund.

  links: RefundLinks;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  metadata: JsonMap;

  // An optional reference that will appear on your customer's bank statement.
  // The character limit for this reference is dependent on the scheme.<br />
  // <strong>ACH</strong> - 10 characters<br /> <strong>Autogiro</strong> - 11
  // characters<br /> <strong>Bacs</strong> - 10 characters<br />
  // <strong>BECS</strong> - 30 characters<br /> <strong>BECS NZ</strong> - 12
  // characters<br /> <strong>Betalingsservice</strong> - 30 characters<br />
  // <strong>PAD</strong> - 12 characters<br /> <strong>SEPA</strong> - 140
  // characters <p class='restricted-notice'><strong>Restricted</strong>: You
  // can only specify a payment reference for Bacs payments (that is, when
  // collecting from the UK) if you're on the <a
  // href='https://gocardless.com/pricing'>GoCardless Plus, Pro or Enterprise
  // packages</a>.</p>
  reference: string;

  // One of:
  // <ul>
  // <li>`created`: the refund has been created</li>
  // <li>`pending_submission`: the refund has been created, but not yet
  // submitted to the banks</li>
  // <li>`submitted`: the refund has been submitted to the banks</li>
  // <li>`paid`:  the refund has been included in a
  // [payout](#core-endpoints-payouts)</li>
  // <li>`cancelled`: the refund has been cancelled</li>
  // <li>`bounced`: the refund has failed to be paid</li>
  // <li>`funds_returned`: the refund has had its funds returned</li>
  // </ul>
  status: RefundStatus;
}

/** Type for a refundcreaterequestlinks resource. */
export interface RefundCreateRequestLinks {
  // <em>private beta</em> ID of the [mandate](#core-endpoints-mandates) against
  // which the refund is being made.
  mandate: string;

  // ID of the [payment](#core-endpoints-payments) against which the refund is
  // being made.
  payment: string;
}

export enum RefundRefundType {
  Mandate = 'mandate',
  Payment = 'payment',
}

/** Type for a refundfx resource. */
export interface RefundFx {
  // Estimated rate that will be used in the foreign exchange of the `amount`
  // into the `fx_currency`.
  // This will vary based on the prevailing market rate until the moment that it
  // is paid out.
  // Present only before a resource is paid out. Has up to 10 decimal places.
  estimated_exchange_rate: string;

  // Rate used in the foreign exchange of the `amount` into the `fx_currency`.
  // Present only after a resource is paid out. Has up to 10 decimal places.
  exchange_rate: string;

  // Amount that was paid out in the `fx_currency` after foreign exchange.
  // Present only after the resource has been paid out.
  fx_amount: string;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) code for the
  // currency in which amounts will be paid out (after foreign exchange).
  // Currently "AUD", "CAD", "DKK", "EUR", "GBP", "NZD", "SEK" and "USD" are
  // supported. Present only if payouts will be (or were) made via foreign
  // exchange.
  fx_currency: RefundFxFxCurrency;
}

export enum RefundFxFxCurrency {
  AUD = 'AUD',
  CAD = 'CAD',
  DKK = 'DKK',
  EUR = 'EUR',
  GBP = 'GBP',
  NZD = 'NZD',
  SEK = 'SEK',
  USD = 'USD',
}

/** Type for a refundlinks resource. */
export interface RefundLinks {
  // ID of the [mandate](#core-endpoints-mandates) against which the refund is
  // being made.
  mandate: string;

  // ID of the [payment](#core-endpoints-payments) against which the refund is
  // being made.
  payment: string;
}

export enum RefundStatus {
  Created = 'created',
  PendingSubmission = 'pending_submission',
  Submitted = 'submitted',
  Paid = 'paid',
  Cancelled = 'cancelled',
  Bounced = 'bounced',
  FundsReturned = 'funds_returned',
}

type JsonField = boolean | number | string | null;

export interface JsonMap {
  [key: string]: JsonField | JsonMap | JsonArray;
}
export interface JsonArray extends Array<JsonField> {}

export interface APIResponse {
  __response__: object;
}

export interface Fx {
  // Rate used in the foreign exchange of the `amount` into the `fx_currency`.
  // Present only after a resource is paid out. Has up to 10 decimal places.,
  exchange_rate: string;

  // Estimated rate that will be used in the foreign exchange of the `amount` into
  // the `fx_currency`.\nThis will vary based on the prevailing market rate until
  // the moment that it is paid out.\nPresent only before a resource is paid out. Has
  // up to 10 decimal places.,
  estimated_exchange_rate: string;

  // Amount that was paid out in the `fx_currency` after foreign exchange. Present only
  // after the resource has been paid out.
  fx_amount: string;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) code for the currency in
  // which amounts will be paid out (after foreign exchange). Currently "AUD", "CAD", "DKK",
  // "EUR", "GBP", "NZD", "SEK" and "USD" are supported. Present only if payouts will be (or
  // were) made via foreign exchange.,
  fx_currency: FxCurrency;
}

// [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) code for the currency in
// which amounts will be paid out (after foreign exchange). Currently "AUD", "CAD", "DKK",
// "EUR", "GBP", "NZD", "SEK" and "USD" are supported. Present only if payouts will be (or
// were) made via foreign exchange.
export enum FxCurrency {
  AUD = 'AUD',
  CAD = 'CAD',
  DKK = 'DKK',
  EUR = 'EUR',
  GBP = 'GBP',
  NZD = 'NZD',
  SEK = 'SEK',
  USD = 'USD',
}

export interface CreatedAtFilter {
  gt?: string;
  gte?: string;
  lt?: string;
  lte?: string;
}

export interface ListMeta {
  limit: number;
  cursors: ListMetaCursor;
}

export interface ListMetaCursor {
  before: string;
  after: string;
}

/** Type for a subscription resource. */
export interface Subscription {
  // Amount in the lowest denomination for the currency (e.g. pence in GBP,
  // cents in EUR).
  amount: string;

  // The amount to be deducted from each payment as an app fee, to be paid to
  // the partner integration which created the subscription, in the lowest
  // denomination for the currency (e.g. pence in GBP, cents in EUR).
  app_fee: string;

  // The total number of payments that should be taken by this subscription.
  count: string;

  // Fixed [timestamp](#api-usage-time-zones--dates), recording when this
  // resource was created.
  created_at: string;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217) currency code. Currently
  // `GBP`, `EUR`, `SEK`, `DKK`, `AUD`, `NZD` and `CAD` are supported.
  currency: string;

  // As per RFC 2445. The day of the month to charge customers on. `1`-`28` or
  // `-1` to indicate the last day of the month.
  day_of_month: string;

  // Date on or after which no further payments should be created. If this field
  // is blank and `count` is not specified, the subscription will continue
  // forever. <p class='deprecated-notice'><strong>Deprecated</strong>: This
  // field will be removed in a future API version. Use `count` to specify a
  // number of payments instead. </p>
  end_date: string;

  // Unique identifier, beginning with "SB".
  id: string;

  // Number of `interval_units` between customer charge dates. Must be greater
  // than or equal to `1`. Must result in at least one charge date per year.
  // Defaults to `1`.
  interval: string;

  // The unit of time between customer charge dates. One of `weekly`, `monthly`
  // or `yearly`.
  interval_unit: SubscriptionIntervalUnit;

  // Resources linked to this Subscription.

  links: SubscriptionLinks;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  metadata: JsonMap;

  // Name of the month on which to charge a customer. Must be lowercase. Only
  // applies
  // when the interval_unit is `yearly`.
  //
  month: SubscriptionMonth;

  // Optional name for the subscription. This will be set as the description on
  // each payment created. Must not exceed 255 characters.
  name: string;

  // An optional payment reference. This will be set as the reference on each
  // payment created and will appear on your customer's bank statement. See the
  // documentation for the [create payment endpoint](#payments-create-a-payment)
  // for more details. <p class='restricted-notice'><strong>Restricted</strong>:
  // You need your own Service User Number to specify a payment reference for
  // Bacs payments.</p>
  payment_reference: string;

  // On failure, automatically retry payments using [Optimise Smart Payment
  // Retries](#optimise-smart-payment-retries). Default is `false`.
  retry_if_possible: boolean;

  // The date on which the first payment should be charged. Must be on or after
  // the [mandate](#core-endpoints-mandates)'s `next_possible_charge_date`. When
  // blank, this will be set as the mandate's `next_possible_charge_date`.
  start_date: string;

  // One of:
  // <ul>
  // <li>`pending_customer_approval`: the subscription is waiting for customer
  // approval before becoming active</li>
  // <li>`customer_approval_denied`: the customer did not approve the
  // subscription</li>
  // <li>`active`: the subscription is currently active and will continue to
  // create payments</li>
  // <li>`finished`: all of the payments scheduled for creation under this
  // subscription have been created</li>
  // <li>`cancelled`: the subscription has been cancelled and will no longer
  // create payments</li>
  // </ul>
  status: SubscriptionStatus;

  // Up to 10 upcoming payments with their amounts and charge dates.
  upcoming_payments: SubscriptionUpcomingPayment[];
}

/** Type for a subscriptioncreaterequestlinks resource. */
export interface SubscriptionCreateRequestLinks {
  // ID of the associated [mandate](#core-endpoints-mandates) which the
  // subscription will create payments against.
  mandate: string;
}

export enum SubscriptionIntervalUnit {
  Weekly = 'weekly',
  Monthly = 'monthly',
  Yearly = 'yearly',
}

/** Type for a subscriptionlinks resource. */
export interface SubscriptionLinks {
  // ID of the associated [mandate](#core-endpoints-mandates) which the
  // subscription will create payments against.
  mandate: string;
}

export enum SubscriptionMonth {
  January = 'january',
  February = 'february',
  March = 'march',
  April = 'april',
  May = 'may',
  June = 'june',
  July = 'july',
  August = 'august',
  September = 'september',
  October = 'october',
  November = 'november',
  December = 'december',
}

export enum SubscriptionStatus {
  PendingCustomerApproval = 'pending_customer_approval',
  CustomerApprovalDenied = 'customer_approval_denied',
  Active = 'active',
  Finished = 'finished',
  Cancelled = 'cancelled',
}

/** Type for a subscriptionupcomingpayment resource. */
export interface SubscriptionUpcomingPayment {
  // The amount of this payment, in minor unit (e.g. pence in GBP, cents in
  // EUR).
  amount: string;

  // The date on which this payment will be charged.
  charge_date: string;
}
