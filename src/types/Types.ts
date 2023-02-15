/** Type for a bankauthorisation resource. */
export interface BankAuthorisation {
  // Type of authorisation, can be either 'mandate' or 'payment'.
  authorisation_type?: BankAuthorisationAuthorisationType;

  // Fixed [timestamp](#api-usage-time-zones--dates), recording when the user
  // has been authorised.
  authorised_at?: string | null;

  // Timestamp when the flow was created
  created_at?: string;

  // Timestamp when the url will expire. Each authorisation url currently lasts
  // for 15 minutes, but this can vary by bank.
  expires_at?: string;

  // Unique identifier, beginning with "BAU".
  id?: string;

  // Fixed [timestamp](#api-usage-time-zones--dates), recording when the
  // authorisation URL has been visited.
  last_visited_at?: string | null;

  // Resources linked to this BankAuthorisation.
  links?: BankAuthorisationLinks;

  // URL that the payer can be redirected to after authorising the payment.
  //
  // On completion of bank authorisation, the query parameter of either
  // `outcome=success` or `outcome=failure` will be
  // appended to the `redirect_uri` to indicate the result of the bank
  // authorisation. If the bank authorisation is
  // expired, the query parameter `outcome=timeout` will be appended to the
  // `redirect_uri`, in which case you should
  // prompt the user to try the bank authorisation step again.
  //
  // The `redirect_uri` you provide should handle the `outcome` query parameter
  // for displaying the result of the
  // bank authorisation as outlined above.
  //
  // The BillingRequestFlow ID will also be appended to the `redirect_uri` as
  // query parameter `id=BRF123`.
  //
  // Defaults to `https://pay.gocardless.com/billing/static/thankyou`.
  redirect_uri?: string;

  // URL for an oauth flow that will allow the user to authorise the payment
  url?: string;
}

/** Type for a bankauthorisationcreaterequestlinks resource. */
export interface BankAuthorisationCreateRequestLinks {
  // ID of the [billing request](#billing-requests-billing-requests) against
  // which this authorisation was created.
  billing_request?: string;

  // ID of the [institution](#billing-requests-institutions) against which this
  // authorisation was created.
  institution?: string;
}

export enum BankAuthorisationAuthorisationType {
  Mandate = 'mandate',
  Payment = 'payment',
}

/** Type for a bankauthorisationlinks resource. */
export interface BankAuthorisationLinks {
  // ID of the [billing request](#billing-requests-billing-requests) against
  // which this authorisation was created.
  billing_request?: string;

  // ID of the [institution](#billing-requests-institutions) against which this
  // authorisation was created.
  institution?: string;
}

/** Type for a bankdetailslookup resource. */
export interface BankDetailsLookup {
  // Array of [schemes](#mandates_scheme) supported for this bank account. This
  // will be an empty array if the bank account is not reachable by any schemes.
  available_debit_schemes?: BankDetailsLookupAvailableDebitScheme[];

  // The name of the bank with which the account is held (if available).
  bank_name?: string | null;

  // ISO 9362 SWIFT BIC of the bank with which the account is held.
  //
  // <p class="notice">Even if no BIC is returned for an account, GoCardless may
  // still be able to collect payments from it - you should refer to the
  // `available_debit_schemes` attribute to determine reachability.</p>
  bic?: string | null;
}

export enum BankDetailsLookupAvailableDebitScheme {
  Ach = 'ach',
  Autogiro = 'autogiro',
  Bacs = 'bacs',
  Becs = 'becs',
  BecsNz = 'becs_nz',
  Betalingsservice = 'betalingsservice',
  FasterPayments = 'faster_payments',
  Pad = 'pad',
  PayTo = 'pay_to',
  SepaCore = 'sepa_core',
}

/** Type for a billingrequest resource. */
export interface BillingRequest {
  // List of actions that can be performed before this billing request can be
  // fulfilled.
  actions?: BillingRequestAction[];

  // Fixed [timestamp](#api-usage-time-zones--dates), recording when this
  // resource was created.
  created_at?: string;

  // (Optional) If true, this billing request can fallback from instant payment
  // to direct debit.
  // Should not be set if GoCardless payment intelligence feature is used.
  //
  // See [Billing Requests: Retain customers with
  // Fallbacks](https://developer.gocardless.com/getting-started/billing-requests/retain-customers-with-fallbacks/)
  // for more information.
  fallback_enabled?: boolean;

  // Unique identifier, beginning with "BRQ".
  id?: string;

  // Resources linked to this BillingRequest.
  links?: BillingRequestLinks;

  // Request for a mandate
  mandate_request?: BillingRequestMandateRequest;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  metadata?: JsonMap;

  // Request for a one-off strongly authorised payment
  payment_request?: BillingRequestPaymentRequest;

  // Specifies the high-level purpose of a mandate and/or payment using a set of
  // pre-defined categories. Required for the PayTo scheme, optional for all
  // others.
  purpose_code?: BillingRequestPurposeCode;

  //
  resources?: BillingRequestResources;

  // One of:
  // <ul>
  // <li>`pending`: the billing request is pending and can be used</li>
  // <li>`ready_to_fulfil`: the billing request is ready to fulfil</li>
  // <li>`fulfilling`: the billing request is currently undergoing
  // fulfilment</li>
  // <li>`fulfilled`: the billing request has been fulfilled and a payment
  // created</li>
  // <li>`cancelled`: the billing request has been cancelled and cannot be
  // used</li>
  // </ul>
  status?: BillingRequestStatus;
}

/** Type for a billingrequestcreaterequestlinks resource. */
export interface BillingRequestCreateRequestLinks {
  // ID of the associated [creditor](#core-endpoints-creditors). Only required
  // if your account manages multiple creditors.
  creditor?: string;

  // ID of the [customer](#core-endpoints-customers) against which this request
  // should be made.
  customer?: string;

  // (Optional) ID of the
  // [customer_bank_account](#core-endpoints-customer-bank-accounts) against
  // which this request should be made.
  //
  customer_bank_account?: string;
}

/** Type for a billingrequestcustomer resource. */
export interface BillingRequestCustomer {
  // Customer's company name. Required unless a `given_name` and `family_name`
  // are provided. For Canadian customers, the use of a `company_name` value
  // will mean that any mandate created from this customer will be considered to
  // be a "Business PAD" (otherwise, any mandate will be considered to be a
  // "Personal PAD").
  company_name?: string | null;

  // Customer's email address. Required in most cases, as this allows GoCardless
  // to send notifications to this customer.
  email?: string | null;

  // Customer's surname. Required unless a `company_name` is provided.
  family_name?: string | null;

  // Customer's first name. Required unless a `company_name` is provided.
  given_name?: string | null;

  // [ISO 639-1](http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) code.
  // Used as the language for notification emails sent by GoCardless if your
  // organisation does not send its own (see [compliance
  // requirements](#appendix-compliance-requirements)). Currently only "en",
  // "fr", "de", "pt", "es", "it", "nl", "da", "nb", "sl", "sv" are supported.
  // If this is not provided, the language will be chosen based on the
  // `country_code` (if supplied) or default to "en".
  language?: string | null;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  metadata?: JsonMap;

  // [ITU E.123](https://en.wikipedia.org/wiki/E.123) formatted phone number,
  // including country code.
  phone_number?: string | null;
}

/** Type for a billingrequestcustomerbillingdetail resource. */
export interface BillingRequestCustomerBillingDetail {
  // The first line of the customer's address.
  address_line1?: string | null;

  // The second line of the customer's address.
  address_line2?: string | null;

  // The third line of the customer's address.
  address_line3?: string | null;

  // The city of the customer's address.
  city?: string | null;

  // [ISO 3166-1 alpha-2
  // code.](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
  country_code?: string | null;

  // For Danish customers only. The civic/company number (CPR or CVR) of the
  // customer. Must be supplied if the customer's bank account is denominated in
  // Danish krone (DKK).
  danish_identity_number?: string | null;

  // For ACH customers only. Required for ACH customers. A string containing the
  // IP address of the payer to whom the mandate belongs (i.e. as a result of
  // their completion of a mandate setup flow in their browser).
  //
  // Not required for creating offline mandates where `authorisation_source` is
  // set to telephone or paper.
  //
  ip_address?: string | null;

  // The customer's postal code.
  postal_code?: string | null;

  // The customer's address region, county or department. For US customers a 2
  // letter [ISO3166-2:US](https://en.wikipedia.org/wiki/ISO_3166-2:US) state
  // code is required (e.g. `CA` for California).
  region?: string | null;

  // For Swedish customers only. The civic/company number (personnummer,
  // samordningsnummer, or organisationsnummer) of the customer. Must be
  // supplied if the customer's bank account is denominated in Swedish krona
  // (SEK). This field cannot be changed once it has been set.
  swedish_identity_number?: string | null;
}

export enum BillingRequestAccountType {
  Savings = 'savings',
  Checking = 'checking',
}

export enum BillingRequestNotificationType {
  Email = 'email',
}

/** Type for a billingrequestaction resource. */
export interface BillingRequestAction {
  // List of currencies the current mandate supports
  available_currencies?: string[];

  // Describes the behaviour of bank authorisations, for the bank_authorisation
  // action
  bank_authorisation?: BillingRequestActionBankAuthorisation;

  // Additional parameters to help complete the collect_customer_details action
  collect_customer_details?: BillingRequestActionCollectCustomerDetails;

  // Which other action types this action can complete.
  completes_actions?: string[];

  // Informs you whether the action is required to fulfil the billing request or
  // not.
  required?: boolean;

  // Requires completing these actions before this action can be completed.
  requires_actions?: string[];

  // Status of the action
  status?: BillingRequestActionStatus;

  // Unique identifier for the action.
  type?: BillingRequestActionType;
}

/** Type for a billingrequestactionavailablecurrencies resource. */
export interface BillingRequestActionAvailableCurrencies {
  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency
  // code.
  currency?: string;
}

/** Type for a billingrequestactionbankauthorisation resource. */
export interface BillingRequestActionBankAuthorisation {
  // Which authorisation adapter will be used to power these authorisations
  // (GoCardless internal use only)
  adapter?: BillingRequestActionBankAuthorisationAdapter;

  // What type of bank authorisations are supported on this billing request
  authorisation_type?: BillingRequestActionBankAuthorisationAuthorisationType;

  // Whether an institution is a required field when creating this bank
  // authorisation
  requires_institution?: boolean;
}

export enum BillingRequestActionBankAuthorisationAdapter {
  OpenBankingGatewayPis = 'open_banking_gateway_pis',
  PlaidAis = 'plaid_ais',
  OpenBankingGatewayAis = 'open_banking_gateway_ais',
  BankidAis = 'bankid_ais',
  BankPayRecurring = 'bank_pay_recurring',
}

export enum BillingRequestActionBankAuthorisationAuthorisationType {
  Payment = 'payment',
  Mandate = 'mandate',
}

/** Type for a billingrequestactioncollectcustomerdetails resource. */
export interface BillingRequestActionCollectCustomerDetails {
  // Default customer country code, as determined by scheme and payer location
  default_country_code?: string;
}

export enum BillingRequestActionStatus {
  Pending = 'pending',
  Completed = 'completed',
}

export enum BillingRequestActionType {
  ChooseCurrency = 'choose_currency',
  CollectAmount = 'collect_amount',
  CollectCustomerDetails = 'collect_customer_details',
  CollectBankAccount = 'collect_bank_account',
  BankAuthorisation = 'bank_authorisation',
  ConfirmPayerDetails = 'confirm_payer_details',
  SelectInstitution = 'select_institution',
}

/** Type for a billingrequestlinks resource. */
export interface BillingRequestLinks {
  // (Optional) ID of the [bank
  // authorisation](#billing-requests-bank-authorisations) that was used to
  // verify this request.
  bank_authorisation?: string;

  // ID of the associated [creditor](#core-endpoints-creditors).
  creditor?: string;

  // ID of the [customer](#core-endpoints-customers) that will be used for this
  // request
  customer?: string;

  // (Optional) ID of the
  // [customer_bank_account](#core-endpoints-customer-bank-accounts) that will
  // be used for this request
  customer_bank_account?: string;

  // ID of the customer billing detail that will be used for this request
  customer_billing_detail?: string;

  // (Optional) ID of the associated mandate request
  mandate_request?: string;

  // (Optional) ID of the [mandate](#core-endpoints-mandates) that was created
  // from this mandate request. this mandate request.
  mandate_request_mandate?: string;

  // ID of the associated organisation.
  organisation?: string;

  // (Optional) ID of the associated payment request
  payment_request?: string;

  // (Optional) ID of the [payment](#core-endpoints-payments) that was created
  // from this payment request.
  payment_request_payment?: string;
}

/** Type for a billingrequestmandaterequest resource. */
export interface BillingRequestMandateRequest {
  // This field is ACH specific, sometimes referred to as [SEC
  // code](https://www.moderntreasury.com/learn/sec-codes).
  //
  // This is the way that the payer gives authorisation to the merchant.
  //   web: Authorisation is Internet Initiated or via Mobile Entry (maps to SEC
  // code: WEB)
  //   telephone: Authorisation is provided orally over telephone (maps to SEC
  // code: TEL)
  //   paper: Authorisation is provided in writing and signed, or similarly
  // authenticated (maps to SEC code: PPD)
  //
  authorisation_source?: BillingRequestMandateRequestAuthorisationSource;

  // Constraints that will apply to the mandate_request. (Optional) Specifically
  // for PayTo and VRP.
  constraints?: BillingRequestMandateRequestConstraints | null;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency
  // code.
  currency?: string;

  // A human-readable description of the payment and/or mandate. This will be
  // displayed to the payer when authorising the billing request.
  //
  description?: string | null;

  // Resources linked to this BillingRequestMandateRequest.
  links?: BillingRequestMandateRequestLinks;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  metadata?: JsonMap;

  // A bank payment scheme. Currently "ach", "autogiro", "bacs", "becs",
  // "becs_nz", "betalingsservice", "faster_payments", "pad", "pay_to" and
  // "sepa_core" are supported. Optional for mandate only requests - if left
  // blank, the payer will be able to select the currency/scheme to pay with
  // from a list of your available schemes.
  scheme?: string | null;

  // Verification preference for the mandate. One of:
  // <ul>
  //   <li>`minimum`: only verify if absolutely required, such as when part of
  // scheme rules</li>
  //   <li>`recommended`: in addition to `minimum`, use the GoCardless payment
  // intelligence solution to decide if a payer should be verified</li>
  //   <li>`when_available`: if verification mechanisms are available, use
  // them</li>
  //   <li>`always`: as `when_available`, but fail to create the Billing Request
  // if a mechanism isn't available</li>
  // </ul>
  //
  // By default, all Billing Requests use the `recommended` verification
  // preference. It uses GoCardless payment intelligence solution to determine
  // if a payer is fraudulent or not. The verification mechanism is based on the
  // response and the payer may be asked to verify themselves. If the feature is
  // not available, `recommended` behaves like `minimum`.
  //
  // If you never wish to take advantage of our reduced risk products and
  // Verified Mandates as they are released in new schemes, please use the
  // `minimum` verification preference.
  //
  // See [Billing Requests: Creating Verified
  // Mandates](https://developer.gocardless.com/getting-started/billing-requests/verified-mandates/)
  // for more information.
  verify?: BillingRequestMandateRequestVerify;
}

export enum BillingRequestMandateRequestAuthorisationSource {
  Web = 'web',
  Telephone = 'telephone',
  Paper = 'paper',
}

/** Type for a billingrequestmandaterequestconstraints resource. */
export interface BillingRequestMandateRequestConstraints {
  // The latest date at which payments can be taken, must occur after start_date
  // if present
  //
  // This is an optional field and if it is not supplied the agreement will be
  // considered open and
  // will not have an end date. Keep in mind the end date must take into account
  // how long it will
  // take the user to set up this agreement via the BillingRequest.
  //
  end_date?: string;

  // The maximum amount that can be charged for a single payment
  max_amount_per_payment?: number;

  // List of periodic limits and constraints which apply to them
  periodic_limits?: BillingRequestMandateRequestConstraintsPeriodicLimit[];

  // The date from which payments can be taken.
  //
  // This is an optional field and if it is not supplied the start date will be
  // set to the day
  // authorisation happens.
  //
  start_date?: string;
}

/** Type for a billingrequestmandaterequestconstraintsperiodiclimit resource. */
export interface BillingRequestMandateRequestConstraintsPeriodicLimit {
  // The alignment of the period.
  //
  // `calendar` - this will finish on the end of the current period. For example
  // this will expire on the Monday for the current week or the January for the
  // next year.
  //
  // `creation_date` - this will finish on the next instance of the current
  // period. For example Monthly it will expire on the same day of the next
  // month, or yearly the same day of the next year.
  //
  alignment?: BillingRequestMandateRequestConstraintsPeriodicLimitAlignment;

  // The maximum number of payments that can be collected in this periodic limit
  max_payments?: number;

  // The maximum total amount that can be charged for all payments in this
  // periodic limit
  max_total_amount?: number;

  // The repeating period for this mandate
  period?: BillingRequestMandateRequestConstraintsPeriodicLimitPeriod;
}

export enum BillingRequestMandateRequestConstraintsPeriodicLimitAlignment {
  Calendar = 'calendar',
  CreationDate = 'creation_date',
}

export enum BillingRequestMandateRequestConstraintsPeriodicLimitPeriod {
  Day = 'day',
  Week = 'week',
  Month = 'month',
  Year = 'year',
  Flexible = 'flexible',
}

/** Type for a billingrequestmandaterequestlinks resource. */
export interface BillingRequestMandateRequestLinks {
  // (Optional) ID of the [mandate](#core-endpoints-mandates) that was created
  // from this mandate request. this mandate request.
  //
  mandate?: string;
}

export enum BillingRequestMandateRequestVerify {
  Minimum = 'minimum',
  Recommended = 'recommended',
  WhenAvailable = 'when_available',
  Always = 'always',
}

/** Type for a billingrequestpaymentrequest resource. */
export interface BillingRequestPaymentRequest {
  // Amount in minor unit (e.g. pence in GBP, cents in EUR).
  amount?: string;

  // The amount to be deducted from the payment as an app fee, to be paid to the
  // partner integration which created the billing request, in the lowest
  // denomination for the currency (e.g. pence in GBP, cents in EUR).
  app_fee?: string | null;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency
  // code. `GBP` and `EUR` supported; `GBP` with your customers in the UK and
  // for `EUR` with your customers in Germany only.
  currency?: string;

  // A human-readable description of the payment and/or mandate. This will be
  // displayed to the payer when authorising the billing request.
  //
  description?: string | null;

  // Resources linked to this BillingRequestPaymentRequest.
  links?: BillingRequestPaymentRequestLinks;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  metadata?: JsonMap;

  // (Optional) A scheme used for Open Banking payments. Currently
  // `faster_payments` is supported in the UK (GBP) and `sepa_credit_transfer`
  // and `sepa_instant_credit_transfer` are supported in Germany (EUR). In
  // Germany, `sepa_credit_transfer` is used as the default. Please be aware
  // that `sepa_instant_credit_transfer` may incur an additional fee for your
  // customer.
  scheme?: string | null;
}

/** Type for a billingrequestpaymentrequestlinks resource. */
export interface BillingRequestPaymentRequestLinks {
  // (Optional) ID of the [payment](#core-endpoints-payments) that was created
  // from this payment request.
  payment?: string;
}

export enum BillingRequestPurposeCode {
  Mortgage = 'mortgage',
  Utility = 'utility',
  Loan = 'loan',
  DependantSupport = 'dependant_support',
  Gambling = 'gambling',
  Retail = 'retail',
  Salary = 'salary',
  Personal = 'personal',
  Government = 'government',
  Pension = 'pension',
  Tax = 'tax',
  Other = 'other',
}

/** Type for a billingrequestresources resource. */
export interface BillingRequestResources {
  // Embedded customer
  customer?: BillingRequestResourcesCustomer;

  // Embedded customer bank account, only if a bank account is linked
  customer_bank_account?: BillingRequestResourcesCustomerBankAccount | null;

  // Embedded customer billing detail
  customer_billing_detail?: BillingRequestResourcesCustomerBillingDetail;
}

/** Type for a billingrequestresourcescustomer resource. */
export interface BillingRequestResourcesCustomer {
  // Customer's company name. Required unless a `given_name` and `family_name`
  // are provided. For Canadian customers, the use of a `company_name` value
  // will mean that any mandate created from this customer will be considered to
  // be a "Business PAD" (otherwise, any mandate will be considered to be a
  // "Personal PAD").
  company_name?: string | null;

  // Fixed [timestamp](#api-usage-time-zones--dates), recording when this
  // resource was created.
  created_at?: string;

  // Customer's email address. Required in most cases, as this allows GoCardless
  // to send notifications to this customer.
  email?: string | null;

  // Customer's surname. Required unless a `company_name` is provided.
  family_name?: string | null;

  // Customer's first name. Required unless a `company_name` is provided.
  given_name?: string | null;

  // Unique identifier, beginning with "CU".
  id?: string;

  // [ISO 639-1](http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) code.
  // Used as the language for notification emails sent by GoCardless if your
  // organisation does not send its own (see [compliance
  // requirements](#appendix-compliance-requirements)). Currently only "en",
  // "fr", "de", "pt", "es", "it", "nl", "da", "nb", "sl", "sv" are supported.
  // If this is not provided, the language will be chosen based on the
  // `country_code` (if supplied) or default to "en".
  language?: string | null;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  metadata?: JsonMap;

  // [ITU E.123](https://en.wikipedia.org/wiki/E.123) formatted phone number,
  // including country code.
  phone_number?: string | null;
}

/** Type for a billingrequestresourcescustomerbankaccount resource. */
export interface BillingRequestResourcesCustomerBankAccount {
  // Name of the account holder, as known by the bank. Usually this is the same
  // as the name stored with the linked [creditor](#core-endpoints-creditors).
  // This field will be transliterated, upcased and truncated to 18 characters.
  // This field is required unless the request includes a [customer bank account
  // token](#javascript-flow-customer-bank-account-tokens).
  account_holder_name?: string;

  // The last few digits of the account number. Currently 4 digits for NZD bank
  // accounts and 2 digits for other currencies.
  account_number_ending?: string;

  // Bank account type. Required for USD-denominated bank accounts. Must not be
  // provided for bank accounts in other currencies. See [local
  // details](#local-bank-details-united-states) for more information.
  account_type?: BillingRequestResourcesCustomerBankAccountAccountType;

  // Name of bank, taken from the bank details.
  bank_name?: string;

  // [ISO 3166-1 alpha-2
  // code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements).
  // Defaults to the country code of the `iban` if supplied, otherwise is
  // required.
  country_code?: string | null;

  // Fixed [timestamp](#api-usage-time-zones--dates), recording when this
  // resource was created.
  created_at?: string;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency
  // code. Currently "AUD", "CAD", "DKK", "EUR", "GBP", "NZD", "SEK" and "USD"
  // are supported.
  currency?: string | null;

  // Boolean value showing whether the bank account is enabled or disabled.
  enabled?: boolean;

  // Unique identifier, beginning with "BA".
  id?: string;

  // Resources linked to this BillingRequestResourcesCustomerBankAccount.
  links?: BillingRequestResourcesCustomerBankAccountLinks;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  metadata?: JsonMap;
}

export enum BillingRequestResourcesCustomerBankAccountAccountType {
  Savings = 'savings',
  Checking = 'checking',
}

/** Type for a billingrequestresourcescustomerbankaccountlinks resource. */
export interface BillingRequestResourcesCustomerBankAccountLinks {
  // ID of the [customer](#core-endpoints-customers) that owns this bank
  // account.
  customer?: string;
}

/** Type for a billingrequestresourcescustomerbillingdetail resource. */
export interface BillingRequestResourcesCustomerBillingDetail {
  // The first line of the customer's address.
  address_line1?: string | null;

  // The second line of the customer's address.
  address_line2?: string | null;

  // The third line of the customer's address.
  address_line3?: string | null;

  // The city of the customer's address.
  city?: string | null;

  // [ISO 3166-1 alpha-2
  // code.](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
  country_code?: string | null;

  // Fixed [timestamp](#api-usage-time-zones--dates), recording when this
  // resource was created.
  created_at?: string;

  // For Danish customers only. The civic/company number (CPR or CVR) of the
  // customer. Must be supplied if the customer's bank account is denominated in
  // Danish krone (DKK).
  danish_identity_number?: string | null;

  // Unique identifier, beginning with "CU".
  id?: string;

  // For ACH customers only. Required for ACH customers. A string containing the
  // IP address of the payer to whom the mandate belongs (i.e. as a result of
  // their completion of a mandate setup flow in their browser).
  //
  // Not required for creating offline mandates where `authorisation_source` is
  // set to telephone or paper.
  //
  ip_address?: string | null;

  // The customer's postal code.
  postal_code?: string | null;

  // The customer's address region, county or department. For US customers a 2
  // letter [ISO3166-2:US](https://en.wikipedia.org/wiki/ISO_3166-2:US) state
  // code is required (e.g. `CA` for California).
  region?: string | null;

  // The schemes associated with this customer billing detail
  schemes?: string[];

  // For Swedish customers only. The civic/company number (personnummer,
  // samordningsnummer, or organisationsnummer) of the customer. Must be
  // supplied if the customer's bank account is denominated in Swedish krona
  // (SEK). This field cannot be changed once it has been set.
  swedish_identity_number?: string | null;
}

export enum BillingRequestStatus {
  Pending = 'pending',
  ReadyToFulfil = 'ready_to_fulfil',
  Fulfilling = 'fulfilling',
  Fulfilled = 'fulfilled',
  Cancelled = 'cancelled',
}

/** Type for a billingrequestflow resource. */
export interface BillingRequestFlow {
  // URL for a GC-controlled flow which will allow the payer to fulfil the
  // billing request
  authorisation_url?: string;

  // (Experimental feature) Fulfil the Billing Request on completion of the flow
  // (true by default). Disabling the auto_fulfil is not allowed currently.
  auto_fulfil?: boolean;

  // Timestamp when the flow was created
  created_at?: string;

  // URL that the payer can be taken to if there isn't a way to progress ahead
  // in flow.
  exit_uri?: string | null;

  // Timestamp when the flow will expire. Each flow currently lasts for 7 days.
  expires_at?: string;

  // Unique identifier, beginning with "BRF".
  id?: string;

  // Sets the default language of the Billing Request Flow and the customer.
  // [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) code.
  language?: string | null;

  // Resources linked to this BillingRequestFlow.
  links?: BillingRequestFlowLinks;

  // If true, the payer will not be able to change their bank account within the
  // flow. If the bank_account details are collected as part of
  // bank_authorisation then GC will set this value to true mid flow.
  //
  // You can only lock bank account if these have already been completed as a
  // part of the billing request.
  //
  lock_bank_account?: boolean;

  // If true, the payer will not be able to change their currency/scheme
  // manually within the flow. Note that this only applies to the mandate only
  // flows - currency/scheme can never be changed when there is a specified
  // subscription or payment.
  lock_currency?: boolean;

  // If true, the payer will not be able to edit their customer details within
  // the flow. If the customer details are collected as part of
  // bank_authorisation then GC will set this value to true mid flow.
  //
  // You can only lock customer details if these have already been completed as
  // a part of the billing request.
  //
  lock_customer_details?: boolean;

  // Bank account information used to prefill the payment page so your customer
  // doesn't have to re-type details you already hold about them. It will be
  // stored unvalidated and the customer will be able to review and amend it
  // before completing the form.
  prefilled_bank_account?: BillingRequestFlowPrefilledBankAccount | null;

  // Customer information used to prefill the payment page so your customer
  // doesn't have to re-type details you already hold about them. It will be
  // stored unvalidated and the customer will be able to review and amend it
  // before completing the form.
  prefilled_customer?: BillingRequestFlowPrefilledCustomer | null;

  // URL that the payer can be redirected to after completing the request flow.
  redirect_uri?: string | null;

  // Session token populated when responding to the initialise action
  session_token?: string | null;

  // If true, the payer will be able to see redirect action buttons on Thank You
  // page. These action buttons will provide a way to connect back to the
  // billing request flow app if opened within a mobile app. For successful
  // flow, the button will take the payer back the billing request flow where
  // they will see the success screen. For failure, button will take the payer
  // to url being provided against exit_uri field.
  show_redirect_buttons?: boolean;
}

/** Type for a billingrequestflowcreaterequestlinks resource. */
export interface BillingRequestFlowCreateRequestLinks {
  // ID of the [billing request](#billing-requests-billing-requests) against
  // which this flow was created.
  billing_request: string;
}

/** Type for a billingrequestflowlinks resource. */
export interface BillingRequestFlowLinks {
  // ID of the [billing request](#billing-requests-billing-requests) against
  // which this flow was created.
  billing_request: string;
}

/** Type for a billingrequestflowprefilledbankaccount resource. */
export interface BillingRequestFlowPrefilledBankAccount {
  // Bank account type for USD-denominated bank accounts. Must not be provided
  // for bank accounts in other currencies. See [local
  // details](#local-bank-details-united-states) for more information.
  account_type?: BillingRequestFlowPrefilledBankAccountAccountType;
}

export enum BillingRequestFlowPrefilledBankAccountAccountType {
  Savings = 'savings',
  Checking = 'checking',
}

/** Type for a billingrequestflowprefilledcustomer resource. */
export interface BillingRequestFlowPrefilledCustomer {
  // The first line of the customer's address.
  address_line1?: string | null;

  // The second line of the customer's address.
  address_line2?: string | null;

  // The third line of the customer's address.
  address_line3?: string | null;

  // The city of the customer's address.
  city?: string | null;

  // Customer's company name. Company name should only be provided if
  // `given_name` and `family_name` are null.
  company_name?: string | null;

  // [ISO 3166-1 alpha-2
  // code.](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
  country_code?: string | null;

  // For Danish customers only. The civic/company number (CPR or CVR) of the
  // customer.
  danish_identity_number?: string | null;

  // Customer's email address.
  email?: string | null;

  // Customer's surname.
  family_name?: string | null;

  // Customer's first name.
  given_name?: string | null;

  // The customer's postal code.
  postal_code?: string | null;

  // The customer's address region, county or department.
  region?: string | null;

  // For Swedish customers only. The civic/company number (personnummer,
  // samordningsnummer, or organisationsnummer) of the customer.
  swedish_identity_number?: string | null;
}

/** Type for a billingrequesttemplate resource. */
export interface BillingRequestTemplate {
  // Permanent URL that customers can visit to allow them to complete a flow
  // based on this template, before being returned to the `redirect_uri`.
  authorisation_url?: string;

  // Fixed [timestamp](#api-usage-time-zones--dates), recording when this
  // resource was created.
  created_at?: string;

  // Unique identifier, beginning with "BRT".
  id?: string;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency
  // code.
  mandate_request_currency?: string;

  // A human-readable description of the payment and/or mandate. This will be
  // displayed to the payer when authorising the billing request.
  //
  mandate_request_description?: string | null;

  // Key-value store of custom data that will be applied to the mandate created
  // when this request is fulfilled. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  mandate_request_metadata?: JsonMap | null;

  // A bank payment scheme. Currently "ach", "autogiro", "bacs", "becs",
  // "becs_nz", "betalingsservice", "faster_payments", "pad", "pay_to" and
  // "sepa_core" are supported. Optional for mandate only requests - if left
  // blank, the payer will be able to select the currency/scheme to pay with
  // from a list of your available schemes.
  mandate_request_scheme?: string | null;

  // Verification preference for the mandate. One of:
  // <ul>
  //   <li>`minimum`: only verify if absolutely required, such as when part of
  // scheme rules</li>
  //   <li>`recommended`: in addition to `minimum`, use the GoCardless payment
  // intelligence solution to decide if a payer should be verified</li>
  //   <li>`when_available`: if verification mechanisms are available, use
  // them</li>
  //   <li>`always`: as `when_available`, but fail to create the Billing Request
  // if a mechanism isn't available</li>
  // </ul>
  //
  // By default, all Billing Requests use the `recommended` verification
  // preference. It uses GoCardless payment intelligence solution to determine
  // if a payer is fraudulent or not. The verification mechanism is based on the
  // response and the payer may be asked to verify themselves. If the feature is
  // not available, `recommended` behaves like `minimum`.
  //
  // If you never wish to take advantage of our reduced risk products and
  // Verified Mandates as they are released in new schemes, please use the
  // `minimum` verification preference.
  //
  // See [Billing Requests: Creating Verified
  // Mandates](https://developer.gocardless.com/getting-started/billing-requests/verified-mandates/)
  // for more information.
  mandate_request_verify?: BillingRequestTemplateMandateRequestVerify;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  metadata?: JsonMap;

  // Name for the template. Provides a friendly human name for the template, as
  // it is shown in the dashboard. Must not exceed 255 characters.
  name?: string;

  // Amount in minor unit (e.g. pence in GBP, cents in EUR).
  payment_request_amount?: string;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency
  // code. `GBP` and `EUR` supported; `GBP` with your customers in the UK and
  // for `EUR` with your customers in Germany only.
  payment_request_currency?: string;

  // A human-readable description of the payment and/or mandate. This will be
  // displayed to the payer when authorising the billing request.
  //
  payment_request_description?: string | null;

  // Key-value store of custom data that will be applied to the payment created
  // when this request is fulfilled. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  payment_request_metadata?: JsonMap | null;

  // (Optional) A scheme used for Open Banking payments. Currently
  // `faster_payments` is supported in the UK (GBP) and `sepa_credit_transfer`
  // and `sepa_instant_credit_transfer` are supported in Germany (EUR). In
  // Germany, `sepa_credit_transfer` is used as the default. Please be aware
  // that `sepa_instant_credit_transfer` may incur an additional fee for your
  // customer.
  payment_request_scheme?: string | null;

  // URL that the payer can be redirected to after completing the request flow.
  redirect_uri?: string | null;

  // Dynamic [timestamp](#api-usage-time-zones--dates) recording when this
  // resource was last updated.
  updated_at?: string;
}

/** Type for a billingrequesttemplatecreaterequestlinks resource. */
export interface BillingRequestTemplateCreateRequestLinks {
  // ID of the associated [creditor](#core-endpoints-creditors). Only required
  // if your account manages multiple creditors.
  creditor?: string;
}

export enum BillingRequestTemplateMandateRequestVerify {
  Minimum = 'minimum',
  Recommended = 'recommended',
  WhenAvailable = 'when_available',
  Always = 'always',
}

/** Type for a block resource. */
export interface Block {
  // Shows if the block is active or disabled. Only active blocks will be used
  // when deciding
  // if a mandate should be blocked.
  active?: boolean | null;

  // Type of entity we will seek to match against when blocking the mandate.
  // This
  // can currently be one of 'email', 'email_domain', 'bank_account', or
  // 'bank_name'.
  block_type?: BlockBlockType;

  // Fixed [timestamp](#api-usage-time-zones--dates), recording when this
  // resource was created.
  created_at?: string;

  // Unique identifier, beginning with "BLC".
  id?: string;

  // This field is required if the reason_type is other. It should be a
  // description of
  // the reason for why you wish to block this payer and why it does not align
  // with the
  // given reason_types. This is intended to help us improve our knowledge of
  // types of
  // fraud.
  reason_description?: string | null;

  // The reason you wish to block this payer, can currently be one of
  // 'identity_fraud',
  // 'no_intent_to_pay', 'unfair_chargeback'. If the reason isn't captured by
  // one of the
  // above then 'other' can be selected but you must provide a reason
  // description.
  reason_type?: BlockReasonType;

  // This field is a reference to the value you wish to block. This may be the
  // raw value
  // (in the case of emails or email domains) or the ID of the resource (in the
  // case of
  // bank accounts and bank names). This means in order to block a specific bank
  // account
  // (even if you wish to block generically by name) it must already have been
  // created as
  // a resource.
  resource_reference?: string;

  // Fixed [timestamp](#api-usage-time-zones--dates), recording when this
  // resource was updated.
  updated_at?: string;
}

export enum BlockReferenceType {
  Customer = 'customer',
  Mandate = 'mandate',
}

export enum BlockBlockType {
  Email = 'email',
  EmailDomain = 'email_domain',
  BankAccount = 'bank_account',
  BankName = 'bank_name',
}

export enum BlockReasonType {
  IdentityFraud = 'identity_fraud',
  NoIntentToPay = 'no_intent_to_pay',
  UnfairChargeback = 'unfair_chargeback',
  Other = 'other',
}

/** Type for a creditor resource. */
export interface Creditor {
  // Boolean value indicating whether the creditor is activated in the product.
  activated?: boolean;

  // The first line of the creditor's address.
  address_line1?: string | null;

  // The second line of the creditor's address.
  address_line2?: string | null;

  // The third line of the creditor's address.
  address_line3?: string | null;

  // Boolean indicating whether the creditor is permitted to create refunds
  can_create_refunds?: boolean;

  // The city of the creditor's address.
  city?: string | null;

  // [ISO 3166-1 alpha-2
  // code.](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
  country_code?: string | null;

  // Fixed [timestamp](#api-usage-time-zones--dates), recording when this
  // resource was created.
  created_at?: string;

  // The type of business of the creditor. Currently, `individual`, `company`,
  // `charity`, `partnership`, and `trust` are supported.
  creditor_type?: CreditorCreditorType;

  // Boolean value indicating whether creditor has the [Custom Payment
  // Pages](https://hub.gocardless.com/s/article/Custom-payment-pages)
  // functionality enabled.
  custom_payment_pages_enabled?: boolean;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) code for the
  // currency in which amounts will be paid out (after foreign exchange).
  // Currently "AUD", "CAD", "DKK", "EUR", "GBP", "NZD", "SEK" and "USD" are
  // supported. Present only if payouts will be (or were) made via foreign
  // exchange.
  fx_payout_currency?: CreditorFxPayoutCurrency;

  // Unique identifier, beginning with "CR".
  id?: string;

  // Resources linked to this Creditor.
  links?: CreditorLinks;

  // URL for the creditor's logo, which may be shown on their payment pages.
  logo_url?: string | null;

  // Boolean value indicating whether creditor has the [Mandate
  // Imports](#core-endpoints-mandate-imports) functionality enabled.
  mandate_imports_enabled?: boolean;

  // Boolean value indicating whether the organisation is responsible for
  // sending all customer notifications (note this is separate from the
  // functionality described
  // [here](/getting-started/api/handling-customer-notifications/)). If you are
  // a partner app, and this value is true, you should not send notifications on
  // behalf of this organisation.
  merchant_responsible_for_notifications?: boolean;

  // The creditor's trading name.
  name?: string;

  // The creditor's postal code.
  postal_code?: string | null;

  // The creditor's address region, county or department.
  region?: string | null;

  // An array of the scheme identifiers this creditor can create mandates
  // against.
  //
  // The support address, `phone_number` and `email` fields are for customers to
  // contact the merchant for support purposes. They must be displayed on the
  // payment page, please see our [compliance
  // requirements](#appendix-compliance-requirements) for more details.
  scheme_identifiers?: CreditorSchemeIdentifier[];

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
  verification_status?: CreditorVerificationStatus;
}

/** Type for a creditorupdaterequestlinks resource. */
export interface CreditorUpdateRequestLinks {
  // ID of the [bank account](#core-endpoints-creditor-bank-accounts) which is
  // set up to receive payouts in AUD.
  default_aud_payout_account?: string | null;

  // ID of the [bank account](#core-endpoints-creditor-bank-accounts) which is
  // set up to receive payouts in CAD.
  default_cad_payout_account?: string | null;

  // ID of the [bank account](#core-endpoints-creditor-bank-accounts) which is
  // set up to receive payouts in DKK.
  default_dkk_payout_account?: string | null;

  // ID of the [bank account](#core-endpoints-creditor-bank-accounts) which is
  // set up to receive payouts in EUR.
  default_eur_payout_account?: string | null;

  // ID of the [bank account](#core-endpoints-creditor-bank-accounts) which is
  // set up to receive payouts in GBP.
  default_gbp_payout_account?: string | null;

  // ID of the [bank account](#core-endpoints-creditor-bank-accounts) which is
  // set up to receive payouts in NZD.
  default_nzd_payout_account?: string | null;

  // ID of the [bank account](#core-endpoints-creditor-bank-accounts) which is
  // set up to receive payouts in SEK.
  default_sek_payout_account?: string | null;

  // ID of the [bank account](#core-endpoints-creditor-bank-accounts) which is
  // set up to receive payouts in USD.
  default_usd_payout_account?: string | null;
}

/** Type for a creditorapplyschemeidentifierrequestlinks resource. */
export interface CreditorApplySchemeIdentifierRequestLinks {
  // Unique identifier, usually beginning with "SU".
  scheme_identifier: string;
}

export enum CreditorCreditorType {
  Company = 'company',
  Individual = 'individual',
  Charity = 'charity',
  Partnership = 'partnership',
  Trust = 'trust',
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
  default_aud_payout_account?: string | null;

  // ID of the [bank account](#core-endpoints-creditor-bank-accounts) which is
  // set up to receive payouts in CAD.
  default_cad_payout_account?: string | null;

  // ID of the [bank account](#core-endpoints-creditor-bank-accounts) which is
  // set up to receive payouts in DKK.
  default_dkk_payout_account?: string | null;

  // ID of the [bank account](#core-endpoints-creditor-bank-accounts) which is
  // set up to receive payouts in EUR.
  default_eur_payout_account?: string | null;

  // ID of the [bank account](#core-endpoints-creditor-bank-accounts) which is
  // set up to receive payouts in GBP.
  default_gbp_payout_account?: string | null;

  // ID of the [bank account](#core-endpoints-creditor-bank-accounts) which is
  // set up to receive payouts in NZD.
  default_nzd_payout_account?: string | null;

  // ID of the [bank account](#core-endpoints-creditor-bank-accounts) which is
  // set up to receive payouts in SEK.
  default_sek_payout_account?: string | null;

  // ID of the [bank account](#core-endpoints-creditor-bank-accounts) which is
  // set up to receive payouts in USD.
  default_usd_payout_account?: string | null;
}

/** Type for a creditorschemeidentifier resource. */
export interface CreditorSchemeIdentifier {
  // The first line of the scheme identifier's support address.
  address_line1?: string;

  // The second line of the scheme identifier's support address.
  address_line2?: string | null;

  // The third line of the scheme identifier's support address.
  address_line3?: string | null;

  // Whether a custom reference can be submitted for mandates using this scheme
  // identifier.
  can_specify_mandate_reference?: boolean;

  // The city of the scheme identifier's support address.
  city?: string;

  // [ISO 3166-1 alpha-2
  // code.](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
  country_code?: string;

  // Fixed [timestamp](#api-usage-time-zones--dates), recording when this
  // resource was created.
  created_at?: string;

  // The currency of the scheme identifier.
  currency?: CreditorSchemeIdentifierCurrency;

  // Scheme identifier's support email address.
  email?: string;

  // Unique identifier, usually beginning with "SU".
  id?: string;

  // The minimum interval, in working days, between the sending of a
  // pre-notification to the customer, and the charge date of a payment using
  // this scheme identifier.
  //
  // By default, GoCardless sends these notifications automatically. Please see
  // our [compliance requirements](#appendix-compliance-requirements) for more
  // details.
  minimum_advance_notice?: number;

  // The name which appears on customers' bank statements. This should usually
  // be the merchant's trading name.
  name?: string;

  // Scheme identifier's support phone number.
  phone_number?: string;

  // The scheme identifier's support postal code.
  postal_code?: string;

  // The scheme-unique identifier against which payments are submitted.
  reference?: string;

  // The scheme identifier's support address region, county or department.
  region?: string | null;

  // The scheme which this scheme identifier applies to.
  scheme?: CreditorSchemeIdentifierScheme;

  // The status of the scheme identifier. Only `active` scheme identifiers will
  // be applied to a creditor and used against payments.
  status?: CreditorSchemeIdentifierStatus;
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
  FasterPayments = 'faster_payments',
  Pad = 'pad',
  PayTo = 'pay_to',
  Sepa = 'sepa',
  SepaCreditTransfer = 'sepa_credit_transfer',
  SepaInstantCreditTransfer = 'sepa_instant_credit_transfer',
}

export enum CreditorSchemeIdentifierStatus {
  Pending = 'pending',
  Active = 'active',
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
  account_holder_name?: string;

  // The last few digits of the account number. Currently 4 digits for NZD bank
  // accounts and 2 digits for other currencies.
  account_number_ending?: string;

  // Bank account type. Required for USD-denominated bank accounts. Must not be
  // provided for bank accounts in other currencies. See [local
  // details](#local-bank-details-united-states) for more information.
  account_type?: CreditorBankAccountAccountType;

  // Name of bank, taken from the bank details.
  bank_name?: string;

  // [ISO 3166-1 alpha-2
  // code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements).
  // Defaults to the country code of the `iban` if supplied, otherwise is
  // required.
  country_code?: string | null;

  // Fixed [timestamp](#api-usage-time-zones--dates), recording when this
  // resource was created.
  created_at?: string;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency
  // code. Currently "AUD", "CAD", "DKK", "EUR", "GBP", "NZD", "SEK" and "USD"
  // are supported.
  currency?: string | null;

  // Boolean value showing whether the bank account is enabled or disabled.
  enabled?: boolean;

  // Unique identifier, beginning with "BA".
  id?: string;

  // Resources linked to this CreditorBankAccount.
  links?: CreditorBankAccountLinks;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  metadata?: JsonMap;
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
  creditor?: string;
}

/** Type for a currencyexchangerate resource. */
export interface CurrencyExchangeRate {
  // The exchange rate from the source to target currencies provided with up to
  // 10 decimal places.
  rate?: string;

  // Source currency
  source?: string;

  // Target currency
  target?: string;

  // Time at which the rate was retrieved from the provider.
  time?: string;
}

/** Type for a customer resource. */
export interface Customer {
  // The first line of the customer's address.
  address_line1?: string | null;

  // The second line of the customer's address.
  address_line2?: string | null;

  // The third line of the customer's address.
  address_line3?: string | null;

  // The city of the customer's address.
  city?: string | null;

  // Customer's company name. Required unless a `given_name` and `family_name`
  // are provided. For Canadian customers, the use of a `company_name` value
  // will mean that any mandate created from this customer will be considered to
  // be a "Business PAD" (otherwise, any mandate will be considered to be a
  // "Personal PAD").
  company_name?: string | null;

  // [ISO 3166-1 alpha-2
  // code.](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
  country_code?: string | null;

  // Fixed [timestamp](#api-usage-time-zones--dates), recording when this
  // resource was created.
  created_at?: string;

  // For Danish customers only. The civic/company number (CPR or CVR) of the
  // customer. Must be supplied if the customer's bank account is denominated in
  // Danish krone (DKK).
  danish_identity_number?: string | null;

  // Customer's email address. Required in most cases, as this allows GoCardless
  // to send notifications to this customer.
  email?: string | null;

  // Customer's surname. Required unless a `company_name` is provided.
  family_name?: string | null;

  // Customer's first name. Required unless a `company_name` is provided.
  given_name?: string | null;

  // Unique identifier, beginning with "CU".
  id?: string;

  // [ISO 639-1](http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) code.
  // Used as the language for notification emails sent by GoCardless if your
  // organisation does not send its own (see [compliance
  // requirements](#appendix-compliance-requirements)). Currently only "en",
  // "fr", "de", "pt", "es", "it", "nl", "da", "nb", "sl", "sv" are supported.
  // If this is not provided, the language will be chosen based on the
  // `country_code` (if supplied) or default to "en".
  language?: string | null;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  metadata?: JsonMap;

  // [ITU E.123](https://en.wikipedia.org/wiki/E.123) formatted phone number,
  // including country code.
  phone_number?: string | null;

  // The customer's postal code.
  postal_code?: string | null;

  // The customer's address region, county or department. For US customers a 2
  // letter [ISO3166-2:US](https://en.wikipedia.org/wiki/ISO_3166-2:US) state
  // code is required (e.g. `CA` for California).
  region?: string | null;

  // For Swedish customers only. The civic/company number (personnummer,
  // samordningsnummer, or organisationsnummer) of the customer. Must be
  // supplied if the customer's bank account is denominated in Swedish krona
  // (SEK). This field cannot be changed once it has been set.
  swedish_identity_number?: string | null;
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

export enum CustomerSortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export enum CustomerSortField {
  Name = 'name',
  CompanyName = 'company_name',
  CreatedAt = 'created_at',
}

/** Type for a customerbankaccount resource. */
export interface CustomerBankAccount {
  // Name of the account holder, as known by the bank. Usually this is the same
  // as the name stored with the linked [creditor](#core-endpoints-creditors).
  // This field will be transliterated, upcased and truncated to 18 characters.
  // This field is required unless the request includes a [customer bank account
  // token](#javascript-flow-customer-bank-account-tokens).
  account_holder_name?: string;

  // The last few digits of the account number. Currently 4 digits for NZD bank
  // accounts and 2 digits for other currencies.
  account_number_ending?: string;

  // Bank account type. Required for USD-denominated bank accounts. Must not be
  // provided for bank accounts in other currencies. See [local
  // details](#local-bank-details-united-states) for more information.
  account_type?: CustomerBankAccountAccountType;

  // Name of bank, taken from the bank details.
  bank_name?: string;

  // [ISO 3166-1 alpha-2
  // code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements).
  // Defaults to the country code of the `iban` if supplied, otherwise is
  // required.
  country_code?: string | null;

  // Fixed [timestamp](#api-usage-time-zones--dates), recording when this
  // resource was created.
  created_at?: string;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency
  // code. Currently "AUD", "CAD", "DKK", "EUR", "GBP", "NZD", "SEK" and "USD"
  // are supported.
  currency?: string | null;

  // Boolean value showing whether the bank account is enabled or disabled.
  enabled?: boolean;

  // Unique identifier, beginning with "BA".
  id?: string;

  // Resources linked to this CustomerBankAccount.
  links?: CustomerBankAccountLinks;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  metadata?: JsonMap;
}

/** Type for a customerbankaccountcreaterequestlinks resource. */
export interface CustomerBankAccountCreateRequestLinks {
  // ID of the [customer](#core-endpoints-customers) that owns this bank
  // account.
  customer: string;

  // ID of a [customer bank account
  // token](#javascript-flow-customer-bank-account-tokens) to use in place of
  // bank account parameters.
  customer_bank_account_token?: string;
}

export enum CustomerBankAccountAccountType {
  Savings = 'savings',
  Checking = 'checking',
}

/** Type for a customerbankaccountlinks resource. */
export interface CustomerBankAccountLinks {
  // ID of the [customer](#core-endpoints-customers) that owns this bank
  // account.
  customer?: string;
}

/** Type for a customernotification resource. */
export interface CustomerNotification {
  // The action that was taken on the notification. Currently this can only be
  // `handled`,
  // which means the integrator sent the notification themselves.
  //
  action_taken?: CustomerNotificationActionTaken;

  // Fixed [timestamp](#api-usage-time-zones--dates), recording when this
  // action was taken.
  action_taken_at?: string | null;

  // A string identifying the integrator who was able to handle this
  // notification.
  action_taken_by?: string | null;

  // The id of the notification.
  id?: string;

  // Resources linked to this CustomerNotification.
  links?: CustomerNotificationLinks;

  // The type of notification the customer shall receive.
  // One of:
  // <ul>
  // <li>`payment_created`</li>
  // <li>`payment_cancelled`</li>
  // <li>`mandate_created`</li>
  // <li>`mandate_blocked`</li>
  // <li>`subscription_created`</li>
  // <li>`subscription_cancelled`</li>
  // <li>`instalment_schedule_created`</li>
  // <li>`instalment_schedule_cancelled`</li>
  // </ul>
  type?: CustomerNotificationType;
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
  mandate?: string;

  // The identifier of the related payment.
  payment?: string;

  // The identifier of the related refund.
  refund?: string;

  // The identifier of the related subscription.
  subscription?: string;
}

export enum CustomerNotificationType {
  PaymentCreated = 'payment_created',
  PaymentCancelled = 'payment_cancelled',
  MandateCreated = 'mandate_created',
  MandateBlocked = 'mandate_blocked',
  SubscriptionCreated = 'subscription_created',
  SubscriptionCancelled = 'subscription_cancelled',
  InstalmentScheduleCreated = 'instalment_schedule_created',
  InstalmentScheduleCancelled = 'instalment_schedule_cancelled',
}

/** Type for a event resource. */
export interface Event {
  // What has happened to the resource. See [Event Actions](#event-actions) for
  // the possible actions.
  action?: string;

  // Fixed [timestamp](#api-usage-time-zones--dates), recording when this
  // resource was created.
  created_at?: string;

  // Present only in webhooks when an integrator is authorised to send their own
  // notifications. See
  // [here](/getting-started/api/handling-customer-notifications/)
  // for further information.
  //
  customer_notifications?: EventCustomerNotification[] | null;

  //
  details?: EventDetails;

  // Unique identifier, beginning with "EV".
  id?: string;

  // Resources linked to this Event.
  links?: EventLinks;

  // If the `details[origin]` is `api`, this will contain any metadata you
  // specified when triggering this event. In other cases it will be an empty
  // object.
  metadata?: JsonMap;

  // The resource type for this event. One of:
  // <ul>
  // <li>`billing_requests`</li>
  // <li>`creditors`</li>
  // <li>`instalment_schedules`</li>
  // <li>`mandates`</li>
  // <li>`payer_authorisations`</li>
  // <li>`payments`</li>
  // <li>`payouts`</li>
  // <li>`refunds`</li>
  // <li>`subscriptions`</li>
  // </ul>
  resource_type?: EventResourceType;
}

export enum EventInclude {
  Payment = 'payment',
  Mandate = 'mandate',
  Payout = 'payout',
  Refund = 'refund',
  Subscription = 'subscription',
  InstalmentSchedule = 'instalment_schedule',
  Creditor = 'creditor',
  PayerAuthorisation = 'payer_authorisation',
  BillingRequest = 'billing_request',
}

/** Type for a eventcustomernotification resource. */
export interface EventCustomerNotification {
  // Time after which GoCardless will send the notification by email.
  deadline?: string;

  // The id of the notification.
  id?: string;

  // Whether or not the notification must be sent.
  mandatory?: boolean;

  // See [here](#core-endpoints-customer-notifications) for a complete list of
  // customer notification types.
  type?: string;
}

/** Type for a eventdetails resource. */
export interface EventDetails {
  // When we send a creditor `new_payout_currency_added` webhook, we also send
  // the bank account id of the new account
  bank_account_id?: string;

  // What triggered the event. _Note:_ `cause` is our simplified and predictable
  // key indicating what triggered the event.
  cause?: string;

  // When we send a creditor `new_payout_currency_added` webhook, we also send
  // the currency of the new account
  currency?: string;

  // Human readable description of the cause. _Note:_ Changes to event
  // descriptions are not considered breaking.
  description?: string;

  // When will_attempt_retry is set to false, this field will contain
  // the reason the payment was not retried. This can be one of:
  // <ul>
  // <li>`failure_filter_applied`: The payment won't be intelligently retried as
  //   there is a high likelihood of failure on retry.</li>
  // <li>`other`: The payment won't be intelligently retried due to any other
  //   reason.</li>
  // </ul>
  not_retried_reason?: string;

  // Who initiated the event. One of:
  // <ul>
  // <li>`bank`: this event was triggered by a report from the banks</li>
  // <li>`gocardless`: this event was performed by GoCardless automatically</li>
  // <li>`api`: this event was triggered by an API endpoint</li>
  // <li>`customer`: this event was triggered by a Customer</li>
  // <li>`payer`: this event was triggered by a Payer</li>
  // </ul>
  origin?: EventDetailsOrigin;

  // When we send a creditor `creditor_updated` webhook, this tells you which
  // property on the creditor has been updated
  property?: string;

  // Set when a `bank` is the origin of the event. This is the reason code
  // received in the report from the customer's bank. See the [GoCardless Direct
  // Debit guide](https://gocardless.com/direct-debit/receiving-messages) for
  // information on the meanings of different reason codes. _Note:_
  // `reason_code` is payment scheme-specific and can be inconsistent between
  // banks.
  reason_code?: string;

  // A bank payment scheme. Set when a bank is the origin of the event.
  scheme?: EventDetailsScheme;

  // Whether the payment will be retried automatically. Set on a payment failed
  // event.
  will_attempt_retry?: boolean;
}

export enum EventDetailsOrigin {
  Bank = 'bank',
  Api = 'api',
  Gocardless = 'gocardless',
  Customer = 'customer',
  Payer = 'payer',
}

export enum EventDetailsScheme {
  Ach = 'ach',
  Autogiro = 'autogiro',
  Bacs = 'bacs',
  Becs = 'becs',
  BecsNz = 'becs_nz',
  Betalingsservice = 'betalingsservice',
  FasterPayments = 'faster_payments',
  Pad = 'pad',
  PayTo = 'pay_to',
  SepaCore = 'sepa_core',
  SepaCor1 = 'sepa_cor1',
}

/** Type for a eventlinks resource. */
export interface EventLinks {
  // ID of a [bank authorisation](#billing-requests-bank-authorisations).
  bank_authorisation?: string;

  // ID of a [billing request](#billing-requests-billing-requests).
  billing_request?: string;

  // ID of a [billing request flow](#billing-requests-billing-request-flows).
  billing_request_flow?: string;

  // If `resource_type` is `creditor`, this is the ID of the
  // [creditor](#core-endpoints-creditors) which has been updated.
  creditor?: string;

  // ID of a [customer](#core-endpoints-customers).
  customer?: string;

  // ID of a [customer bank account](#core-endpoints-customer-bank-accounts).
  customer_bank_account?: string;

  // If `resource_type` is `instalment_schedule`, this is the ID of the
  // [instalment schedule](#core-endpoints-instalment-schedules) which has been
  // updated.
  instalment_schedule?: string;

  // If `resource_type` is `mandates`, this is the ID of the
  // [mandate](#core-endpoints-mandates) which has been updated.
  mandate?: string;

  // If `resource_type` is `billing_requests`, this is the ID of the
  // [mandate](#core-endpoints-mandates) which has been created.
  mandate_request_mandate?: string;

  // This is only included for mandate transfer events, when it is the ID of the
  // [customer bank account](#core-endpoints-customer-bank-accounts) which the
  // mandate is being transferred to.
  new_customer_bank_account?: string;

  // This is only included for mandate replaced events, when it is the ID of the
  // new [mandate](#core-endpoints-mandates) that replaces the existing mandate.
  new_mandate?: string;

  // If the event is included in a [webhook](#webhooks-overview) to an [OAuth
  // app](#appendix-oauth), this is the ID of the account to which it belongs.
  organisation?: string;

  // If this event was caused by another, this is the ID of the cause. For
  // example, if a mandate is cancelled it automatically cancels all pending
  // payments associated with it; in this case, the payment cancellation events
  // would have the ID of the mandate cancellation event in this field.
  parent_event?: string;

  // ID of a [payer authorisation](#core-endpoints-payer-authorisations).
  payer_authorisation?: string;

  // If `resource_type` is `payments`, this is the ID of the
  // [payment](#core-endpoints-payments) which has been updated.
  payment?: string;

  // If `resource_type` is `billing_requests`, this is the ID of the
  // [payment](#core-endpoints-payments) which has been created for Instant Bank
  // Payment.
  payment_request_payment?: string;

  // If `resource_type` is `payouts`, this is the ID of the
  // [payout](#core-endpoints-payouts) which has been updated.
  payout?: string;

  // This is only included for mandate transfer events, when it is the ID of the
  // [customer bank account](#core-endpoints-customer-bank-accounts) which the
  // mandate is being transferred from.
  previous_customer_bank_account?: string;

  // If `resource_type` is `refunds`, this is the ID of the
  // [refund](#core-endpoints-refunds) which has been updated.
  refund?: string;

  // If `resource_type` is `subscription`, this is the ID of the
  // [subscription](#core-endpoints-subscriptions) which has been updated.
  subscription?: string;
}

export enum EventResourceType {
  BillingRequests = 'billing_requests',
  Creditors = 'creditors',
  InstalmentSchedules = 'instalment_schedules',
  Mandates = 'mandates',
  Organisations = 'organisations',
  PayerAuthorisations = 'payer_authorisations',
  Payments = 'payments',
  Payouts = 'payouts',
  Refunds = 'refunds',
  Subscriptions = 'subscriptions',
}

/** Type for a instalmentschedule resource. */
export interface InstalmentSchedule {
  // Fixed [timestamp](#api-usage-time-zones--dates), recording when this
  // resource was created.
  created_at?: string;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency
  // code. Currently "AUD", "CAD", "DKK", "EUR", "GBP", "NZD", "SEK" and "USD"
  // are supported.
  currency?: InstalmentScheduleCurrency;

  // Unique identifier, beginning with "IS".
  id?: string;

  // Resources linked to this InstalmentSchedule.
  links?: InstalmentScheduleLinks;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  metadata?: JsonMap;

  // Name of the instalment schedule, up to 100 chars. This name will also be
  // copied to the payments of the instalment schedule if you use schedule-based
  // creation.
  name?: string;

  // If the status is `creation_failed`, this property will be populated with
  // validation
  // failures from the individual payments, arranged by the index of the payment
  // that
  // failed.
  //
  payment_errors?: JsonMap;

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
  status?: InstalmentScheduleStatus;

  // The total amount of the instalment schedule, defined as the sum of all
  // individual
  // payments, in the lowest denomination for the currency (e.g. pence in GBP,
  // cents in
  // EUR). If the requested payment amounts do not sum up correctly, a
  // validation error
  // will be returned.
  total_amount?: string;
}

/** Type for a instalmentscheduleinstalment resource. */
export interface InstalmentScheduleInstalment {
  // Amount, in the lowest denomination for the currency (e.g. pence in GBP,
  // cents in EUR).
  amount: string;

  // A future date on which the payment should be collected. If the date
  // is before the next_possible_charge_date on the
  // [mandate](#core-endpoints-mandates), it will be automatically rolled
  // forwards to that date.
  charge_date: string | null;

  // A human-readable description of the payment. This will be included in the
  // notification email GoCardless sends to your customer if your organisation
  // does not send its own notifications (see [compliance
  // requirements](#appendix-compliance-requirements)).
  description?: string | null;
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
  // left blank and `month` or `day_of_month` are provided, this will be set to
  // the date of the first payment. If created without `month` or `day_of_month`
  // this will be set as the mandate's `next_possible_charge_date`
  start_date?: string | null;
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
  payments?: string[];
}

export enum InstalmentScheduleStatus {
  Pending = 'pending',
  Active = 'active',
  CreationFailed = 'creation_failed',
  Completed = 'completed',
  Cancelled = 'cancelled',
  Errored = 'errored',
}

/** Type for a institution resource. */
export interface Institution {
  // Flag to show if the institution supports redirection to its authorisation
  // flow or if a provider's one is being used. The bank authorisation screen on
  // the UI is visible based on this property.
  bank_redirect?: boolean;

  // [ISO
  // 3166-1](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
  // alpha-2 code. The country code of the institution.
  country_code?: string;

  // A URL pointing to the icon for this institution
  icon_url?: string;

  // The unique identifier for this institution
  id?: string;

  // A URL pointing to the logo for this institution
  logo_url?: string;

  // A human readable name for this institution
  name?: string;
}

/** Type for a mandate resource. */
export interface Mandate {
  // This field is ACH specific, sometimes referred to as [SEC
  // code](https://www.moderntreasury.com/learn/sec-codes).
  //
  // This is the way that the payer gives authorisation to the merchant.
  //   web: Authorisation is Internet Initiated or via Mobile Entry (maps to SEC
  // code: WEB)
  //   telephone: Authorisation is provided orally over telephone (maps to SEC
  // code: TEL)
  //   paper: Authorisation is provided in writing and signed, or similarly
  // authenticated (maps to SEC code: PPD)
  //
  authorisation_source?: MandateAuthorisationSource;

  // (Optional) Payto and VRP Scheme specific information
  consent_parameters?: MandateConsentParameters | null;

  // Fixed [timestamp](#api-usage-time-zones--dates), recording when this
  // resource was created.
  created_at?: string;

  // Unique identifier, beginning with "MD". Note that this prefix may not apply
  // to mandates created before 2016.
  id?: string;

  // Resources linked to this Mandate.
  links?: MandateLinks;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  metadata?: JsonMap;

  // The earliest date that can be used as a `charge_date` on any newly created
  // payment for this mandate. This value will change over time.
  next_possible_charge_date?: string | null;

  // Boolean value showing whether payments and subscriptions under this mandate
  // require approval via an automated email before being processed.
  payments_require_approval?: boolean;

  // Unique reference. Different schemes have different length and [character
  // set](#appendix-character-sets) requirements. GoCardless will generate a
  // unique reference satisfying the different scheme requirements if this field
  // is left blank.
  reference?: string | null;

  // <a name="mandates_scheme"></a>Bank payment scheme to which this mandate and
  // associated payments are submitted. Can be supplied or automatically
  // detected from the customer's bank account.
  scheme?: string | null;

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
  // <li>`suspended_by_payer`: the mandate has been suspended by payer</li>
  // <li>`failed`: the mandate could not be created</li>
  // <li>`cancelled`: the mandate has been cancelled</li>
  // <li>`expired`: the mandate has expired due to dormancy</li>
  // <li>`consumed`: the mandate has been consumed and cannot be reused (note
  // that this only applies to schemes that are per-payment authorised)</li>
  // <li>`blocked`: the mandate has been blocked and payments cannot be
  // created</li>
  // </ul>
  status?: MandateStatus;

  // [Timestamp](#api-usage-time-zones--dates) recording when this mandate was
  // verified.
  verified_at?: string | null;
}

/** Type for a mandatecreaterequestlinks resource. */
export interface MandateCreateRequestLinks {
  // ID of the associated [creditor](#core-endpoints-creditors). Only required
  // if your account manages multiple creditors.
  creditor?: string;

  // ID of the associated [customer bank
  // account](#core-endpoints-customer-bank-accounts) which the mandate is
  // created and submits payments against.
  customer_bank_account: string;
}

export enum MandateAuthorisationSource {
  Web = 'web',
  Telephone = 'telephone',
  Paper = 'paper',
}

/** Type for a mandateconsentparameters resource. */
export interface MandateConsentParameters {
  // The latest date at which payments can be taken, must occur after start_date
  // if present
  end_date?: string;

  // The maximum amount that can be charged for a single payment
  max_amount_per_payment?: number;

  // Frequency configuration
  periods?: MandateConsentParametersPeriod[];

  // The date from which payments can be taken
  start_date?: string;
}

/** Type for a mandateconsentparametersperiod resource. */
export interface MandateConsentParametersPeriod {
  // The maximum total amount that can be charged for all payments in this
  // period
  max_amount_per_period?: number;

  // The maximum number of payments that can be collected in this period
  max_payments_per_period?: number;

  // The repeating period for this mandate
  period?: MandateConsentParametersPeriodPeriod;
}

export enum MandateConsentParametersPeriodPeriod {
  Day = 'day',
  Week = 'week',
  Month = 'month',
  Year = 'year',
  Flexible = 'flexible',
}

/** Type for a mandatelinks resource. */
export interface MandateLinks {
  // ID of the associated [creditor](#core-endpoints-creditors).
  creditor?: string;

  // ID of the associated [customer](#core-endpoints-customers)
  customer?: string;

  // ID of the associated [customer bank
  // account](#core-endpoints-customer-bank-accounts) which the mandate is
  // created and submits payments against.
  customer_bank_account?: string;

  // ID of the new mandate if this mandate has been replaced.
  new_mandate?: string;
}

export enum MandateStatus {
  PendingCustomerApproval = 'pending_customer_approval',
  PendingSubmission = 'pending_submission',
  Submitted = 'submitted',
  Active = 'active',
  Failed = 'failed',
  Cancelled = 'cancelled',
  Expired = 'expired',
  Consumed = 'consumed',
  Blocked = 'blocked',
  SuspendedByPayer = 'suspended_by_payer',
}

/** Type for a mandateimport resource. */
export interface MandateImport {
  // Fixed [timestamp](#api-usage-time-zones--dates), recording when this
  // resource was created.
  created_at?: string;

  // Unique identifier, beginning with "IM".
  id?: string;

  // The scheme of the mandates to be imported.<br>All mandates in a single
  // mandate
  // import must be for the same scheme.
  scheme?: MandateImportScheme;

  // The status of the mandate import.
  // <ul>
  // <li>`created`: A new mandate import.</li>
  // <li>`submitted`: After the integrator has finished adding mandates and <a
  // href="#mandate-imports-submit-a-mandate-import">submitted</a> the
  // import.</li>
  // <li>`cancelled`: If the integrator <a
  // href="#mandate-imports-cancel-a-mandate-import">cancelled</a> the mandate
  // import.</li>
  // <li>`processing`: Once a mandate import has been approved by a GoCardless
  // team member it will be in this state while mandates are imported.</li>
  // <li>`processed`: When all mandates have been imported successfully.</li>
  // </ul>
  status?: MandateImportStatus;
}

export enum MandateImportScheme {
  Ach = 'ach',
  Autogiro = 'autogiro',
  Bacs = 'bacs',
  Becs = 'becs',
  BecsNz = 'becs_nz',
  Betalingsservice = 'betalingsservice',
  FasterPayments = 'faster_payments',
  Pad = 'pad',
  PayTo = 'pay_to',
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
  created_at?: string;

  // Resources linked to this MandateImportEntry.
  links?: MandateImportEntryLinks;

  // A unique identifier for this entry, which you can use (once the import has
  // been
  // processed by GoCardless) to identify the records that have been created.
  // Limited
  // to 255 characters.
  //
  record_identifier?: string | null;
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
  // This field is required unless the request includes a [customer bank account
  // token](#javascript-flow-customer-bank-account-tokens).
  account_holder_name: string;

  // Bank account number - see [local details](#appendix-local-bank-details) for
  // more information. Alternatively you can provide an `iban`.
  account_number?: string | null;

  // Bank code - see [local details](#appendix-local-bank-details) for more
  // information. Alternatively you can provide an `iban`.
  bank_code?: string | null;

  // Branch code - see [local details](#appendix-local-bank-details) for more
  // information. Alternatively you can provide an `iban`.
  branch_code?: string | null;

  // [ISO 3166-1 alpha-2
  // code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements).
  // Defaults to the country code of the `iban` if supplied, otherwise is
  // required.
  country_code?: string | null;

  // International Bank Account Number. Alternatively you can provide [local
  // details](#appendix-local-bank-details). IBANs are not accepted for Swedish
  // bank accounts denominated in SEK - you must supply [local
  // details](#local-bank-details-sweden).
  iban?: string | null;
}

/** Type for a mandateimportentrycustomer resource. */
export interface MandateImportEntryCustomer {
  // The first line of the customer's address. Required if mandate import scheme
  // is either `bacs` or `sepa`.
  //
  address_line1?: string;

  // The second line of the customer's address.
  address_line2?: string | null;

  // The third line of the customer's address.
  address_line3?: string | null;

  // The city of the customer's address.
  city?: string | null;

  // Customer's company name. Required unless a `given_name` and `family_name`
  // are provided. For Canadian customers, the use of a `company_name` value
  // will mean that any mandate created from this customer will be considered to
  // be a "Business PAD" (otherwise, any mandate will be considered to be a
  // "Personal PAD").
  company_name?: string | null;

  // [ISO 3166-1 alpha-2
  // code.](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
  country_code?: string | null;

  // For Danish customers only. The civic/company number (CPR or CVR) of the
  // customer. Must be supplied if the customer's bank account is denominated in
  // Danish krone (DKK).
  danish_identity_number?: string | null;

  // Customer's email address. Required in most cases, as this allows GoCardless
  // to send notifications to this customer.
  email: string | null;

  // Customer's surname. Required unless a `company_name` is provided.
  family_name?: string | null;

  // Customer's first name. Required unless a `company_name` is provided.
  given_name?: string | null;

  // [ISO 639-1](http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) code.
  // Used as the language for notification emails sent by GoCardless if your
  // organisation does not send its own (see [compliance
  // requirements](#appendix-compliance-requirements)). Currently only "en",
  // "fr", "de", "pt", "es", "it", "nl", "da", "nb", "sl", "sv" are supported.
  // If this is not provided, the language will be chosen based on the
  // `country_code` (if supplied) or default to "en".
  language?: string | null;

  // [ITU E.123](https://en.wikipedia.org/wiki/E.123) formatted phone number,
  // including country code.
  phone_number?: string | null;

  // The customer's postal code. Required if mandate import scheme is either
  // `bacs` or `sepa`.
  //
  postal_code?: string;

  // The customer's address region, county or department. For US customers a 2
  // letter [ISO3166-2:US](https://en.wikipedia.org/wiki/ISO_3166-2:US) state
  // code is required (e.g. `CA` for California).
  region?: string | null;

  // For Swedish customers only. The civic/company number (personnummer,
  // samordningsnummer, or organisationsnummer) of the customer. Must be
  // supplied if the customer's bank account is denominated in Swedish krona
  // (SEK). This field cannot be changed once it has been set.
  swedish_identity_number?: string | null;
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
  customer?: string;

  // The ID of the customer bank account which was created when the mandate
  // import
  // was processed.
  customer_bank_account?: string;

  // The ID of the mandate which was created when the mandate import was
  // processed.
  mandate?: string;

  // The ID of the mandate import. This is returned when you
  // [create a Mandate Import](#mandate-imports-create-a-new-mandate-import).
  //
  mandate_import: string;
}

/** Type for a mandatepdf resource. */
export interface MandatePdf {
  // The date and time at which the `url` will expire (10 minutes after the
  // original request).
  expires_at?: string;

  // The URL at which this mandate PDF can be viewed until it expires at the
  // date and time specified by `expires_at`. You should not store this URL or
  // rely on its structure remaining the same.
  url?: string;
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
  mandate?: string;
}

export enum MandatePdfSubscriptionFrequency {
  Weekly = 'weekly',
  Monthly = 'monthly',
  Yearly = 'yearly',
}

/** Type for a payerauthorisation resource. */
export interface PayerAuthorisation {
  // All details required for the creation of a
  // [Customer Bank Account](#core-endpoints-customer-bank-accounts).
  bank_account?: PayerAuthorisationBankAccount;

  // [Timestamp](#api-usage-time-zones--dates), recording when this Payer
  // Authorisation was created.
  created_at?: string | null;

  // All details required for the creation of a
  // [Customer](#core-endpoints-customers).
  customer?: PayerAuthorisationCustomer;

  // Unique identifier, beginning with "PA".
  id?: string;

  // An array of fields which are missing and is required to set up the mandate.
  incomplete_fields?: PayerAuthorisationIncompleteField[];

  // Resources linked to this PayerAuthorisation.
  links?: PayerAuthorisationLinks;

  // All details required for the creation of a
  // [Mandate](#core-endpoints-mandates).
  mandate?: PayerAuthorisationMandate;

  // One of:
  // <ul>
  // <li>`created`: The PayerAuthorisation has been created, and not been
  // confirmed yet</li>
  // <li>`submitted`: The payer information has been submitted</li>
  // <li>`confirmed`: PayerAuthorisation is confirmed and resources are ready to
  // be created</li>
  // <li>`completed`: The PayerAuthorisation has been completed and customer,
  // bank_account and mandate has been created</li>
  // <li>`failed`: The PayerAuthorisation has failed and customer, bank_account
  // and mandate is not created</li>
  // </ul>
  status?: PayerAuthorisationStatus;
}

/** Type for a payerauthorisationbankaccount resource. */
export interface PayerAuthorisationBankAccount {
  // Name of the account holder, as known by the bank. Usually this is the same
  // as the name stored with the linked [creditor](#core-endpoints-creditors).
  // This field will be transliterated, upcased and truncated to 18 characters.
  // This field is required unless the request includes a [customer bank account
  // token](#javascript-flow-customer-bank-account-tokens).
  account_holder_name?: string;

  // Bank account number - see [local details](#appendix-local-bank-details) for
  // more information. Alternatively you can provide an `iban`.
  account_number?: string | null;

  // The last few digits of the account number. Currently 4 digits for NZD bank
  // accounts and 2 digits for other currencies.
  account_number_ending?: string;

  // Account number suffix (only for bank accounts denominated in NZD) - see
  // [local details](#local-bank-details-new-zealand) for more information.
  account_number_suffix?: string | null;

  // Bank account type. Required for USD-denominated bank accounts. Must not be
  // provided for bank accounts in other currencies. See [local
  // details](#local-bank-details-united-states) for more information.
  account_type?: PayerAuthorisationBankAccountAccountType;

  // Bank code - see [local details](#appendix-local-bank-details) for more
  // information. Alternatively you can provide an `iban`.
  bank_code?: string | null;

  // Branch code - see [local details](#appendix-local-bank-details) for more
  // information. Alternatively you can provide an `iban`.
  branch_code?: string | null;

  // [ISO 3166-1 alpha-2
  // code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements).
  // Defaults to the country code of the `iban` if supplied, otherwise is
  // required.
  country_code?: string | null;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency
  // code. Currently "AUD", "CAD", "DKK", "EUR", "GBP", "NZD", "SEK" and "USD"
  // are supported.
  currency?: string | null;

  // International Bank Account Number. Alternatively you can provide [local
  // details](#appendix-local-bank-details). IBANs are not accepted for Swedish
  // bank accounts denominated in SEK - you must supply [local
  // details](#local-bank-details-sweden).
  iban?: string | null;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  metadata?: JsonMap;
}

export enum PayerAuthorisationBankAccountAccountType {
  Savings = 'savings',
  Checking = 'checking',
}

/** Type for a payerauthorisationcustomer resource. */
export interface PayerAuthorisationCustomer {
  // The first line of the customer's address.
  address_line1?: string | null;

  // The second line of the customer's address.
  address_line2?: string | null;

  // The third line of the customer's address.
  address_line3?: string | null;

  // The city of the customer's address.
  city?: string | null;

  // Customer's company name. Required unless a `given_name` and `family_name`
  // are provided. For Canadian customers, the use of a `company_name` value
  // will mean that any mandate created from this customer will be considered to
  // be a "Business PAD" (otherwise, any mandate will be considered to be a
  // "Personal PAD").
  company_name?: string | null;

  // [ISO 3166-1 alpha-2
  // code.](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
  country_code?: string | null;

  // For Danish customers only. The civic/company number (CPR or CVR) of the
  // customer. Must be supplied if the customer's bank account is denominated in
  // Danish krone (DKK).
  danish_identity_number?: string | null;

  // Customer's email address. Required in most cases, as this allows GoCardless
  // to send notifications to this customer.
  email?: string | null;

  // Customer's surname. Required unless a `company_name` is provided.
  family_name?: string | null;

  // Customer's first name. Required unless a `company_name` is provided.
  given_name?: string | null;

  // An [IETF Language Tag](https://tools.ietf.org/html/rfc5646), used for both
  // language
  // and regional variations of our product.
  //
  locale?: string | null;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  metadata?: JsonMap;

  // The customer's postal code.
  postal_code?: string | null;

  // The customer's address region, county or department. For US customers a 2
  // letter [ISO3166-2:US](https://en.wikipedia.org/wiki/ISO_3166-2:US) state
  // code is required (e.g. `CA` for California).
  region?: string | null;

  // For Swedish customers only. The civic/company number (personnummer,
  // samordningsnummer, or organisationsnummer) of the customer. Must be
  // supplied if the customer's bank account is denominated in Swedish krona
  // (SEK). This field cannot be changed once it has been set.
  swedish_identity_number?: string | null;
}

/** Type for a payerauthorisationincompletefield resource. */
export interface PayerAuthorisationIncompleteField {
  // The root resource.
  field?: string;

  // A localised error message
  message?: string;

  // The path to the field e.g. "/payer_authorisations/customer/city"
  request_pointer?: string;
}

/** Type for a payerauthorisationlinks resource. */
export interface PayerAuthorisationLinks {
  // Unique identifier, beginning with "BA".
  bank_account?: string;

  // Unique identifier, beginning with "CU".
  customer?: string;

  // Unique identifier, beginning with "MD". Note that this prefix may not apply
  // to mandates created before 2016.
  mandate?: string;
}

/** Type for a payerauthorisationmandate resource. */
export interface PayerAuthorisationMandate {
  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  metadata?: JsonMap;

  // For ACH customers only. Required for ACH customers. A string containing the
  // IP address of the payer to whom the mandate belongs (i.e. as a result of
  // their completion of a mandate setup flow in their browser).
  //
  // Not required for creating offline mandates where `authorisation_source` is
  // set to telephone or paper.
  //
  payer_ip_address?: string | null;

  // Unique reference. Different schemes have different length and [character
  // set](#appendix-character-sets) requirements. GoCardless will generate a
  // unique reference satisfying the different scheme requirements if this field
  // is left blank.
  reference?: string | null;

  // A bank payment scheme. Currently "ach", "autogiro", "bacs", "becs",
  // "becs_nz", "betalingsservice", "faster_payments", "pad", "pay_to" and
  // "sepa_core" are supported.
  scheme?: PayerAuthorisationMandateScheme;
}

export enum PayerAuthorisationMandateScheme {
  Ach = 'ach',
  Autogiro = 'autogiro',
  Bacs = 'bacs',
  Becs = 'becs',
  BecsNz = 'becs_nz',
  Betalingsservice = 'betalingsservice',
  FasterPayments = 'faster_payments',
  Pad = 'pad',
  PayTo = 'pay_to',
  SepaCore = 'sepa_core',
}

export enum PayerAuthorisationStatus {
  Created = 'created',
  Submitted = 'submitted',
  Confirmed = 'confirmed',
  Completed = 'completed',
  Failed = 'failed',
}

/** Type for a payment resource. */
export interface Payment {
  // Amount, in the lowest denomination for the currency (e.g. pence in GBP,
  // cents in EUR).
  amount?: string;

  // Amount [refunded](#core-endpoints-refunds), in the lowest denomination for
  // the currency (e.g. pence in GBP, cents in EUR).
  amount_refunded?: string;

  // A future date on which the payment should be collected. If not specified,
  // the payment will be collected as soon as possible. If the value is before
  // the [mandate](#core-endpoints-mandates)'s `next_possible_charge_date`
  // creation will fail. If the value is not a working day it will be rolled
  // forwards to the next available one.
  charge_date?: string | null;

  // Fixed [timestamp](#api-usage-time-zones--dates), recording when this
  // resource was created.
  created_at?: string;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency
  // code. Currently "AUD", "CAD", "DKK", "EUR", "GBP", "NZD", "SEK" and "USD"
  // are supported.
  currency?: PaymentCurrency;

  // A human-readable description of the payment. This will be included in the
  // notification email GoCardless sends to your customer if your organisation
  // does not send its own notifications (see [compliance
  // requirements](#appendix-compliance-requirements)).
  description?: string | null;

  //
  fx?: PaymentFx;

  // Unique identifier, beginning with "PM".
  id?: string;

  // Resources linked to this Payment.
  links?: PaymentLinks;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  metadata?: JsonMap;

  // An optional reference that will appear on your customer's bank statement.
  // The character limit for this reference is dependent on the scheme.<br />
  // <strong>ACH</strong> - 10 characters<br /> <strong>Autogiro</strong> - 11
  // characters<br /> <strong>Bacs</strong> - 10 characters<br />
  // <strong>BECS</strong> - 30 characters<br /> <strong>BECS NZ</strong> - 12
  // characters<br /> <strong>Betalingsservice</strong> - 30 characters<br />
  // <strong>Faster Payments</strong> - 18 characters<br /> <strong>PAD</strong>
  // - scheme doesn't offer references<br /> <strong>PayTo</strong> - 18
  // characters<br /> <strong>SEPA</strong> - 140 characters<br /> Note that
  // this reference must be unique (for each merchant) for the BECS scheme as it
  // is a scheme requirement. <p
  // class='restricted-notice'><strong>Restricted</strong>: You can only specify
  // a payment reference for Bacs payments (that is, when collecting from the
  // UK) if you're on the <a href='https://gocardless.com/pricing'>GoCardless
  // Plus, Pro or Enterprise packages</a>.</p> <p
  // class='restricted-notice'><strong>Restricted</strong>: You can not specify
  // a payment reference for Faster Payments.</p>
  reference?: string | null;

  // On failure, automatically retry the payment using [intelligent
  // retries](#success-intelligent-retries). Default is `false`.
  retry_if_possible?: boolean;

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
  status?: PaymentStatus;
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
  gt?: string;

  // Limit to records where the payment was or will be collected from the
  // customer's bank account on or after the specified date.
  gte?: string;

  // Limit to records where the payment was or will be collected from the
  // customer's bank account before the specified date.
  lt?: string;

  // Limit to records where the payment was or will be collected from the
  // customer's bank account on or before the specified date.
  lte?: string;
}

export enum PaymentSortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export enum PaymentSortField {
  ChargeDate = 'charge_date',
  Amount = 'amount',
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
  estimated_exchange_rate?: string | null;

  // Rate used in the foreign exchange of the `amount` into the `fx_currency`.
  // Present only after a resource is paid out. Has up to 10 decimal places.
  exchange_rate?: string | null;

  // Amount that was paid out in the `fx_currency` after foreign exchange.
  // Present only after the resource has been paid out.
  fx_amount?: string | null;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) code for the
  // currency in which amounts will be paid out (after foreign exchange).
  // Currently "AUD", "CAD", "DKK", "EUR", "GBP", "NZD", "SEK" and "USD" are
  // supported. Present only if payouts will be (or were) made via foreign
  // exchange.
  fx_currency?: PaymentFxFxCurrency;
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
  creditor?: string;

  // ID of [instalment_schedule](#core-endpoints-instalment-schedules) from
  // which this payment was created.<br/>**Note**: this property will only be
  // present if this payment is part of an instalment schedule.
  instalment_schedule?: string;

  // ID of the [mandate](#core-endpoints-mandates) against which this payment
  // should be collected.
  mandate?: string;

  // ID of [payout](#core-endpoints-payouts) which contains the funds from this
  // payment.<br/>_Note_: this property will not be present until the payment
  // has been successfully collected.
  payout?: string;

  // ID of [subscription](#core-endpoints-subscriptions) from which this payment
  // was created.<br/>_Note_: this property will only be present if this payment
  // is part of a subscription.
  subscription?: string;
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
  amount?: string;

  // Date the payout is due to arrive in the creditor's bank account.
  // One of:
  // <ul>
  //   <li>`yyyy-mm-dd`: the payout has been paid and is due to arrive in the
  // creditor's bank
  //   account on this day</li>
  //   <li>`null`: the payout hasn't been paid yet</li>
  // </ul>
  //
  arrival_date?: string | null;

  // Fixed [timestamp](#api-usage-time-zones--dates), recording when this
  // resource was created.
  created_at?: string;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency
  // code. Currently "AUD", "CAD", "DKK", "EUR", "GBP", "NZD", "SEK" and "USD"
  // are supported.
  currency?: PayoutCurrency;

  // Fees that have already been deducted from the payout amount in minor unit
  // (e.g. pence in GBP, cents in EUR), inclusive of tax if applicable.
  // <br />
  // For each `late_failure_settled` or `chargeback_settled` action, we refund
  // the transaction fees in a payout. This means that a payout can have a
  // negative `deducted_fees` value.
  // <br />
  // This field is calculated as `(GoCardless fees + app fees + surcharge fees)
  // - (refunded fees)`
  // <br />
  // If the merchant is invoiced for fees separately from the payout, then
  // `deducted_fees` will be 0.
  deducted_fees?: string;

  //
  fx?: PayoutFx;

  // Unique identifier, beginning with "PO".
  id?: string;

  // Resources linked to this Payout.
  links?: PayoutLinks;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters. _Note:_ This should
  // not be used for storing PII data.
  metadata?: JsonMap;

  // Whether a payout contains merchant revenue or partner fees.
  payout_type?: PayoutPayoutType;

  // Reference which appears on the creditor's bank statement.
  reference?: string;

  // One of:
  // <ul>
  // <li>`pending`: the payout has been created, but not yet sent to your bank
  // or it is in the process of being exchanged through our FX provider.</li>
  // <li>`paid`: the payout has been sent to the your bank. FX payouts will
  // become `paid` after we emit the `fx_rate_confirmed` webhook.</li>
  // <li>`bounced`: the payout bounced when sent, the payout can be
  // retried.</li>
  // </ul>
  status?: PayoutStatus;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) code for the
  // currency in which tax is paid out to the tax authorities of your tax
  // jurisdiction. Currently “EUR”, “GBP”, for French or British merchants, this
  // will be `null` if tax is not applicable <em>beta</em>
  tax_currency?: string | null;
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
  estimated_exchange_rate?: string | null;

  // Rate used in the foreign exchange of the `amount` into the `fx_currency`.
  // Present only after a resource is paid out. Has up to 10 decimal places.
  exchange_rate?: string | null;

  // Amount that was paid out in the `fx_currency` after foreign exchange.
  // Present only after the resource has been paid out.
  fx_amount?: string | null;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) code for the
  // currency in which amounts will be paid out (after foreign exchange).
  // Currently "AUD", "CAD", "DKK", "EUR", "GBP", "NZD", "SEK" and "USD" are
  // supported. Present only if payouts will be (or were) made via foreign
  // exchange.
  fx_currency?: PayoutFxFxCurrency;
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
  creditor?: string;

  // ID of [bank account](#core-endpoints-creditor-bank-accounts) which this
  // will be sent to.
  creditor_bank_account?: string;
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
  // precision than we can actually pay out (for example, a GoCardless fee we
  // record might come to 0.5 pence, but it is not possible to send a payout via
  // bank transfer including a half penny).<br><br>To calculate the final amount
  // of the payout, we sum all of the items and then round to the nearest
  // currency unit.</p>
  amount?: string;

  // Resources linked to this PayoutItem.
  links?: PayoutItemLinks;

  // An array of tax items <em>beta</em>
  //
  // _Note_: VAT applies to transaction and surcharge fees for merchants
  // operating in the UK and France.
  taxes?: PayoutItemTaxis[];

  // The type of the credit (positive) or debit (negative) item in the payout
  // (inclusive of VAT if applicable). One of:
  // <ul>
  // <li>`payment_paid_out` (credit)</li>
  // <li>`payment_failed` (debit): The payment failed to be processed.</li>
  // <li>`payment_charged_back` (debit): The payment has been charged back.</li>
  // <li>`payment_refunded` (debit): The payment has been refunded to the
  // customer.</li>
  // <li>`refund` (debit): A refund sent to a customer, not linked to a
  // payment.</li>
  // <li>`refund_funds_returned` (credit): The refund could not be sent to the
  // customer, and the funds have been returned to you.</li>
  // <li>`gocardless_fee` (credit/debit): The fees that GoCardless charged for a
  // payment. In the case of a payment failure or chargeback, these will appear
  // as credits. Will include taxes if applicable for merchants.</li>
  // <li>`app_fee` (credit/debit): The optional fees that a partner may have
  // taken for a payment. In the case of a payment failure or chargeback, these
  // will appear as credits.</li>
  // <li>`revenue_share` (credit/debit): A share of the fees that GoCardless
  // collected which some partner integrations receive when their users take
  // payments. Only shown in partner payouts. In the case of a payment failure
  // or chargeback, these will appear as credits.</li>
  // <li>`surcharge_fee` (credit/debit): GoCardless deducted a surcharge fee as
  // the payment failed or was charged back, or refunded a surcharge fee as the
  // bank or customer cancelled the chargeback. Will include taxes if applicable
  // for merchants.</li>
  // </ul>
  //
  type?: PayoutItemType;
}

export enum PayoutItemInclude2020TaxCutover {
  True = 'true',
  False = 'false',
}

/** Type for a payoutitemlinks resource. */
export interface PayoutItemLinks {
  // Unique identifier, beginning with "MD". Note that this prefix may not apply
  // to mandates created before 2016. Present only for the items of type
  // `payment_refunded`, `refund` and `refund_funds_returned`.
  mandate?: string;

  // Unique identifier, beginning with "PM".
  payment?: string;

  // Unique identifier, beginning with "RF". Present only for the items of type
  // `payment_refunded`, `refund` and `refund_funds_returned`.
  refund?: string;
}

/** Type for a payoutitemtaxis resource. */
export interface PayoutItemTaxis {
  // The amount of tax applied to a fee in fractional currency; the lowest
  // denomination for the currency (e.g. pence in GBP, cents in EUR), to one
  // decimal place.
  amount?: string;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency
  // code. Currently "AUD", "CAD", "DKK", "EUR", "GBP", "NZD", "SEK" and "USD"
  // are supported.
  currency?: PayoutItemTaxisCurrency;

  // The amount of tax to be paid out to the tax authorities in fractional
  // currency; the lowest denomination for the currency (e.g. pence in GBP,
  // cents in EUR), to one decimal place.
  //
  // When `currency` and `destination_currency` don't match this will be `null`
  // until the `exchange_rate` has been finalised.
  destination_amount?: string | null;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) code for the
  // currency in which tax is paid out to the tax authorities of your tax
  // jurisdiction. Currently “EUR” for French merchants and “GBP” for British
  // merchants.
  destination_currency?: string;

  // The exchange rate for the tax from the currency into the destination
  // currency.
  //
  // Present only if the currency and the destination currency don't match and
  // the exchange rate has been finalised.
  //
  // You can listen for the payout's [`tax_exchange_rates_confirmed`
  // webhook](https://developer.gocardless.com/api-reference/#event-actions-payout)
  // to know when the exchange rate has been finalised for all fees in the
  // payout.
  exchange_rate?: string | null;

  // The unique identifier created by the jurisdiction, tax type and version
  tax_rate_id?: string;
}

export enum PayoutItemTaxisCurrency {
  AUD = 'AUD',
  CAD = 'CAD',
  DKK = 'DKK',
  EUR = 'EUR',
  GBP = 'GBP',
  NZD = 'NZD',
  SEK = 'SEK',
  USD = 'USD',
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
  confirmation_url?: string;

  // Fixed [timestamp](#api-usage-time-zones--dates), recording when this
  // resource was created.
  created_at?: string;

  // A description of the item the customer is paying for. This will be shown on
  // the hosted payment pages.
  description?: string;

  // Unique identifier, beginning with "RE".
  id?: string;

  // Resources linked to this RedirectFlow.
  links?: RedirectFlowLinks;

  // Mandate reference generated by GoCardless or submitted by an integrator.
  mandate_reference?: string;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters. _Note:_ This should
  // not be used for storing PII data.
  metadata?: JsonMap;

  // The URL of the hosted payment pages for this redirect flow. This is the URL
  // you should redirect your customer to.
  redirect_url?: string;

  // The Direct Debit scheme of the mandate. If specified, the payment pages
  // will only allow the set-up of a mandate for the specified scheme. It is
  // recommended that you leave this blank so the most appropriate scheme is
  // picked based on the customer's bank account.
  scheme?: RedirectFlowScheme;

  // The customer's session ID must be provided when the redirect flow is set up
  // and again when it is completed. This allows integrators to ensure that the
  // user who was originally sent to the GoCardless payment pages is the one who
  // has completed them.
  session_token?: string;

  // The URL to redirect to upon successful mandate setup. You must use a URL
  // beginning `https` in the live environment.
  success_redirect_url?: string;
}

/** Type for a redirectflowcreaterequestlinks resource. */
export interface RedirectFlowCreateRequestLinks {
  // The [creditor](#core-endpoints-creditors) for whom the mandate will be
  // created. The `name` of the creditor will be displayed on the payment page.
  // Required if your account manages multiple creditors.
  creditor?: string;
}

/** Type for a redirectflowprefilledbankaccount resource. */
export interface RedirectFlowPrefilledBankAccount {
  // Bank account type for USD-denominated bank accounts. Must not be provided
  // for bank accounts in other currencies. See [local
  // details](#local-bank-details-united-states) for more information.
  account_type?: RedirectFlowPrefilledBankAccountAccountType;
}

export enum RedirectFlowPrefilledBankAccountAccountType {
  Savings = 'savings',
  Checking = 'checking',
}

/** Type for a redirectflowprefilledcustomer resource. */
export interface RedirectFlowPrefilledCustomer {
  // The first line of the customer's address.
  address_line1?: string | null;

  // The second line of the customer's address.
  address_line2?: string | null;

  // The third line of the customer's address.
  address_line3?: string | null;

  // The city of the customer's address.
  city?: string | null;

  // Customer's company name. Company name should only be provided if
  // `given_name` and `family_name` are null.
  company_name?: string | null;

  // [ISO 3166-1 alpha-2
  // code.](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
  country_code?: string | null;

  // For Danish customers only. The civic/company number (CPR or CVR) of the
  // customer.
  danish_identity_number?: string | null;

  // Customer's email address.
  email?: string | null;

  // Customer's surname.
  family_name?: string | null;

  // Customer's first name.
  given_name?: string | null;

  // [ISO 639-1](http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) code.
  language?: string | null;

  // For New Zealand customers only.
  phone_number?: string | null;

  // The customer's postal code.
  postal_code?: string | null;

  // The customer's address region, county or department.
  region?: string | null;

  // For Swedish customers only. The civic/company number (personnummer,
  // samordningsnummer, or organisationsnummer) of the customer.
  swedish_identity_number?: string | null;
}

/** Type for a redirectflowlinks resource. */
export interface RedirectFlowLinks {
  // ID of [billing request](#billing-requests-billing-requests) that a redirect
  // flow can create.<br />**Note**: The redirect flow will only create a
  // billing request in the event the redirect flow is eligible to send the
  // payer down this new and improved flow
  billing_request?: string;

  // The [creditor](#core-endpoints-creditors) for whom the mandate will be
  // created. The `name` of the creditor will be displayed on the payment page.
  creditor?: string;

  // ID of [customer](#core-endpoints-customers) created by this redirect
  // flow.<br/>**Note**: this property will not be present until the redirect
  // flow has been successfully completed.
  customer?: string;

  // ID of [customer bank account](#core-endpoints-customer-bank-accounts)
  // created by this redirect flow.<br/>**Note**: this property will not be
  // present until the redirect flow has been successfully completed.
  customer_bank_account?: string;

  // ID of [mandate](#core-endpoints-mandates) created by this redirect
  // flow.<br/>**Note**: this property will not be present until the redirect
  // flow has been successfully completed.
  mandate?: string;
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
  amount?: string;

  // Fixed [timestamp](#api-usage-time-zones--dates), recording when this
  // resource was created.
  created_at?: string;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency
  // code. This is set to the currency of the refund's
  // [payment](#core-endpoints-payments).
  currency?: string;

  //
  fx?: RefundFx;

  // Unique identifier, beginning with "RF".
  id?: string;

  // Resources linked to this Refund.
  links?: RefundLinks;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  metadata?: JsonMap;

  // An optional reference that will appear on your customer's bank statement.
  // The character limit for this reference is dependent on the scheme.<br />
  // <strong>ACH</strong> - 10 characters<br /> <strong>Autogiro</strong> - 11
  // characters<br /> <strong>Bacs</strong> - 10 characters<br />
  // <strong>BECS</strong> - 30 characters<br /> <strong>BECS NZ</strong> - 12
  // characters<br /> <strong>Betalingsservice</strong> - 30 characters<br />
  // <strong>Faster Payments</strong> - 18 characters<br /> <strong>PAD</strong>
  // - scheme doesn't offer references<br /> <strong>PayTo</strong> - 18
  // characters<br /> <strong>SEPA</strong> - 140 characters<br /> Note that
  // this reference must be unique (for each merchant) for the BECS scheme as it
  // is a scheme requirement. <p
  // class='restricted-notice'><strong>Restricted</strong>: You can only specify
  // a payment reference for Bacs payments (that is, when collecting from the
  // UK) if you're on the <a href='https://gocardless.com/pricing'>GoCardless
  // Plus, Pro or Enterprise packages</a>.</p> <p
  // class='restricted-notice'><strong>Restricted</strong>: You can not specify
  // a payment reference for Faster Payments.</p>
  reference?: string | null;

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
  status?: RefundStatus;
}

/** Type for a refundcreaterequestlinks resource. */
export interface RefundCreateRequestLinks {
  //  ID of the [mandate](#core-endpoints-mandates) against which the refund is
  // being made. <br /> <p
  // class="restricted-notice"><strong>Restricted</strong>: You must request
  // access to Mandate Refunds by contacting <a
  // href="mailto:support@gocardless.com">our support team</a>.</p>
  mandate?: string;

  // ID of the [payment](#core-endpoints-payments) against which the refund is
  // being made.
  payment?: string;
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
  estimated_exchange_rate?: string | null;

  // Rate used in the foreign exchange of the `amount` into the `fx_currency`.
  // Present only after a resource is paid out. Has up to 10 decimal places.
  exchange_rate?: string | null;

  // Amount that was paid out in the `fx_currency` after foreign exchange.
  // Present only after the resource has been paid out.
  fx_amount?: string | null;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) code for the
  // currency in which amounts will be paid out (after foreign exchange).
  // Currently "AUD", "CAD", "DKK", "EUR", "GBP", "NZD", "SEK" and "USD" are
  // supported. Present only if payouts will be (or were) made via foreign
  // exchange.
  fx_currency?: RefundFxFxCurrency;
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
  mandate?: string;

  // ID of the [payment](#core-endpoints-payments) against which the refund is
  // being made.
  payment?: string;
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

/** Type for a scenariosimulator resource. */
export interface ScenarioSimulator {
  // The unique identifier of the simulator, used to initiate simulations. One
  // of:
  // <ul>
  // <li>`creditor_verification_status_action_required`: Sets a creditor's
  // `verification status` to `action required`, meaning that the creditor must
  // provide further information to GoCardless in order to verify their account
  // to receive payouts.</li>
  // <li>`creditor_verification_status_in_review`: Sets a creditor's
  // `verification status` to `in review`, meaning that the creditor has
  // provided all of the information requested by GoCardless to verify their
  // account, and is now awaiting review.</li>
  // <li>`creditor_verification_status_successful`: Sets a creditor's
  // `verification status` to `successful`, meaning that the creditor is fully
  // verified and can receive payouts.</li>
  // <li>`payment_confirmed`: Transitions a payment through to `confirmed`. It
  // must start in the `pending_submission` state, and its mandate must be in
  // the `activated` state (unless it is a payment for ACH, BECS, BECS_NZ or
  // SEPA, in which cases the mandate may be `pending_submission`, since their
  // mandates are submitted with their first payment).</li>
  // <li>`payment_paid_out`: Transitions a payment through to `paid_out`, having
  // been collected successfully and paid out to you. It must start in the
  // `pending_submission` state, and its mandate must be in the `activated`
  // state (unless it is a payment for ACH, BECS, BECS_NZ or SEPA, in which
  // cases the mandate may be `pending_submission`, since their mandates are
  // submitted with their first payment).</li>
  // <li>`payment_failed`: Transitions a payment through to `failed`. It must
  // start in the `pending_submission` state, and its mandate must be in the
  // `activated` state (unless it is a payment for ACH, BECS, BECS_NZ or SEPA,
  // in which cases the mandate may be `pending_submission`, since their
  // mandates are submitted with their first payment).</li>
  // <li>`payment_charged_back`: Behaves the same as the `payout_paid_out`
  // simulator, except that the payment is transitioned to `charged_back` after
  // it is paid out, having been charged back by the customer.</li>
  // <li>`payment_chargeback_settled`: Behaves the same as the
  // `payment_charged_back` simulator, except that the charged back payment is
  // additionally included as a debit item in a payout, thereby settling the
  // charged back payment.</li>
  // <li>`payment_late_failure`: Transitions a payment through to
  // `late_failure`, having been apparently collected successfully beforehand.
  // It must start in the `pending_submission` state, and its mandate must be in
  // the `activated` state (unless it is a payment for ACH, BECS, BECS_NZ or
  // SEPA, in which cases the mandate may be `pending_submission`, since their
  // mandates are submitted with their first payment). Not compatible with
  // Autogiro mandates.</li>
  // <li>`payment_late_failure_settled`: Behaves the same as the
  // `payment_late_failure` simulator, except that the late failure is
  // additionally included as a debit item in a payout, thereby settling the
  // late failure.</li>
  // <li>`payment_submitted`: Transitions a payment to `submitted`, without
  // proceeding any further. It must start in the `pending_submission`
  // state.</li>
  // <li>`mandate_activated`: Transitions a mandate through to `activated`,
  // having been submitted to the banks and set up successfully. It must start
  // in the `pending_submission` state. Not compatible with ACH, BECS, BECS_NZ
  // and SEPA mandates, which are submitted and activated with their first
  // payment.</li>
  // <li>`mandate_customer_approval_granted`: Transitions a mandate through to
  // `pending_submission`, as if the customer approved the mandate creation. It
  // must start in the `pending_customer_approval` state. Compatible only with
  // Bacs and SEPA mandates, which support customer signatures on the mandate.
  // All payments associated with the mandate will be transitioned to
  // `pending_submission`. All subscriptions associated with the mandate will
  // become `active`.</li>
  // <li>`mandate_customer_approval_skipped`: Transitions a mandate through to
  // `pending_submission`, as if the customer skipped the mandate approval
  // during the mandate creation process. It must start in the
  // `pending_customer_approval` state. Compatible only with Bacs and SEPA
  // mandates, which support customer signatures on the mandate. All payments
  // associated with the mandate will be transitioned to `pending_submission`.
  // All subscriptions associated with the mandate will become `active`.</li>
  // <li>`mandate_failed`: Transitions a mandate through to `failed`, having
  // been submitted to the banks but found to be invalid (for example due to
  // invalid bank details). It must start in the `pending_submission` or
  // `submitted` states. Not compatible with SEPA mandates, which are submitted
  // with their first payment.</li>
  // <li>`mandate_expired`: Transitions a mandate through to `expired`, having
  // been submitted to the banks, set up successfully and then expired because
  // no collection attempts were made against it for longer than the scheme's
  // dormancy period (13 months for Bacs, 3 years for SEPA, 15 months for ACH,
  // Betalingsservice, and BECS). It must start in the `pending_submission`
  // state. Not compatible with Autogiro, BECS NZ, and PAD mandates, which do
  // not expire.</li>
  // <li>`mandate_transferred`: Transitions a mandate through to `transferred`,
  // having been submitted to the banks, set up successfully and then moved to a
  // new bank account due to the customer using the UK's Current Account
  // Switching Service (CASS). It must start in the `pending_submission` state.
  // Only compatible with Bacs mandates.</li>
  // <li>`mandate_transferred_with_resubmission`: Transitions a mandate through
  // `transferred` and resubmits it to the banks, can be caused be the UK's
  // Current Account Switching Service (CASS) or when a customer contacts
  // GoCardless to change their bank details. It must start in the
  // `pending_submission` state. Only compatible with Bacs, SEPA and Autogiro
  // mandates.</li>
  // <li>`mandate_suspended_by_payer`: Transitions a mandate to
  // `suspended_by_payer`, as if payer has suspended the mandate after it has
  // been setup successfully. It must start in the `activated` state. Only
  // compatible with PAY_TO mandates.</li>
  // <li>`refund_paid`: Transitions a refund to `paid`. It must start in either
  // the `pending_submission` or `submitted` state.</li>
  // <li>`refund_settled`: Transitions a refund to `paid`, if it's not already,
  // then generates a payout that includes the refund, thereby settling the
  // funds. It must start in one of `pending_submission`, `submitted` or `paid`
  // states.</li>
  // <li>`refund_bounced`: Transitions a refund to `bounced`. It must start in
  // either the `pending_submission`, `submitted`, or `paid` state.</li>
  // <li>`refund_returned`: Transitions a refund to `refund_returned`. The
  // refund must start in `pending_submission`.</li>
  // <li>`payout_bounced`: Transitions a payout to `bounced`. It must start in
  // the `paid` state.</li>
  // <li>`billing_request_fulfilled`: Authorises the billing request, and then
  // fulfils it. The billing request must be in the `pending` state, with all
  // actions completed except for `bank_authorisation`. Only billing requests
  // with a `payment_request` are supported.</li>
  // <li>`billing_request_fulfilled_and_payment_failed`: Authorises the billing
  // request, fulfils it, and moves the associated payment to `failed`. The
  // billing request must be in the `pending` state, with all actions completed
  // except for `bank_authorisation`. Only billing requests with a
  // `payment_request` are supported.</li>
  // <li>`billing_request_fulfilled_and_payment_paid_out`: Authorises the
  // billing request, fulfils it, and moves the associated payment to
  // `paid_out`. The billing request must be in the `pending` state, with all
  // actions completed except for `bank_authorisation`. Only billing requests
  // with a `payment_request` are supported.</li>
  // </ul>
  id?: string;
}

/** Type for a scenariosimulatorrunrequestlinks resource. */
export interface ScenarioSimulatorRunRequestLinks {
  // ID of the resource to run the simulation against.
  // Must be same type of resource as the simulator that is being run.
  // eg. Payment ID for `payment_failed`, Mandate ID for `mandate_activated` etc
  resource: string;
}

/** Type for a schemeidentifier resource. */
export interface SchemeIdentifier {
  // The first line of the scheme identifier's support address.
  address_line1?: string;

  // The second line of the scheme identifier's support address.
  address_line2?: string | null;

  // The third line of the scheme identifier's support address.
  address_line3?: string | null;

  // Whether a custom reference can be submitted for mandates using this scheme
  // identifier.
  can_specify_mandate_reference?: boolean;

  // The city of the scheme identifier's support address.
  city?: string;

  // [ISO 3166-1 alpha-2
  // code.](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
  country_code?: string;

  // Fixed [timestamp](#api-usage-time-zones--dates), recording when this
  // resource was created.
  created_at?: string;

  // The currency of the scheme identifier.
  currency?: SchemeIdentifierCurrency;

  // Scheme identifier's support email address.
  email?: string;

  // Unique identifier, usually beginning with "SU".
  id?: string;

  // The minimum interval, in working days, between the sending of a
  // pre-notification to the customer, and the charge date of a payment using
  // this scheme identifier.
  //
  // By default, GoCardless sends these notifications automatically. Please see
  // our [compliance requirements](#appendix-compliance-requirements) for more
  // details.
  minimum_advance_notice?: number;

  // The name which appears on customers' bank statements. This should usually
  // be the merchant's trading name.
  name?: string;

  // Scheme identifier's support phone number.
  phone_number?: string;

  // The scheme identifier's support postal code.
  postal_code?: string;

  // The scheme-unique identifier against which payments are submitted.
  reference?: string;

  // The scheme identifier's support address region, county or department.
  region?: string | null;

  // The scheme which this scheme identifier applies to.
  scheme?: SchemeIdentifierScheme;

  // The status of the scheme identifier. Only `active` scheme identifiers will
  // be applied to a creditor and used against payments.
  status?: SchemeIdentifierStatus;
}

export enum SchemeIdentifierCurrency {
  AUD = 'AUD',
  CAD = 'CAD',
  DKK = 'DKK',
  EUR = 'EUR',
  GBP = 'GBP',
  NZD = 'NZD',
  SEK = 'SEK',
  USD = 'USD',
}

export enum SchemeIdentifierScheme {
  Ach = 'ach',
  Autogiro = 'autogiro',
  Bacs = 'bacs',
  Becs = 'becs',
  BecsNz = 'becs_nz',
  Betalingsservice = 'betalingsservice',
  FasterPayments = 'faster_payments',
  Pad = 'pad',
  PayTo = 'pay_to',
  Sepa = 'sepa',
  SepaCreditTransfer = 'sepa_credit_transfer',
  SepaInstantCreditTransfer = 'sepa_instant_credit_transfer',
}

export enum SchemeIdentifierStatus {
  Pending = 'pending',
  Active = 'active',
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
  before: string | null;
  after: string | null;
}

/** Type for a subscription resource. */
export interface Subscription {
  // Amount in the lowest denomination for the currency (e.g. pence in GBP,
  // cents in EUR).
  amount?: string;

  // The amount to be deducted from each payment as an app fee, to be paid to
  // the partner integration which created the subscription, in the lowest
  // denomination for the currency (e.g. pence in GBP, cents in EUR).
  app_fee?: string | null;

  // The total number of payments that should be taken by this subscription.
  count?: string | null;

  // Fixed [timestamp](#api-usage-time-zones--dates), recording when this
  // resource was created.
  created_at?: string;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency
  // code. Currently "AUD", "CAD", "DKK", "EUR", "GBP", "NZD", "SEK" and "USD"
  // are supported.
  currency?: string;

  // As per RFC 2445. The day of the month to charge customers on. `1`-`28` or
  // `-1` to indicate the last day of the month.
  day_of_month?: string | null;

  // The earliest date that will be used as a `charge_date` on payments
  // created for this subscription if it is resumed. Only present for `paused`
  // subscriptions.
  // This value will change over time.
  earliest_charge_date_after_resume?: string | null;

  // Date on or after which no further payments should be created.
  // <br />
  // If this field is blank and `count` is not specified, the subscription will
  // continue forever.
  // <br />
  // <p class="deprecated-notice"><strong>Deprecated</strong>: This field will
  // be removed in a future API version. Use `count` to specify a number of
  // payments instead.</p>
  end_date?: string | null;

  // Unique identifier, beginning with "SB".
  id?: string;

  // Number of `interval_units` between customer charge dates. Must be greater
  // than or equal to `1`. Must result in at least one charge date per year.
  // Defaults to `1`.
  interval?: string;

  // The unit of time between customer charge dates. One of `weekly`, `monthly`
  // or `yearly`.
  interval_unit?: SubscriptionIntervalUnit;

  // Resources linked to this Subscription.
  links?: SubscriptionLinks;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  metadata?: JsonMap;

  // Name of the month on which to charge a customer. Must be lowercase. Only
  // applies
  // when the interval_unit is `yearly`.
  //
  month?: SubscriptionMonth;

  // Optional name for the subscription. This will be set as the description on
  // each payment created. Must not exceed 255 characters.
  name?: string | null;

  // An optional payment reference. This will be set as the reference on each
  // payment
  // created and will appear on your customer's bank statement. See the
  // documentation for
  // the [create payment endpoint](#payments-create-a-payment) for more details.
  // <br />
  // <p class="restricted-notice"><strong>Restricted</strong>: You need your own
  // Service User Number to specify a payment reference for Bacs payments.</p>
  payment_reference?: string | null;

  // On failure, automatically retry payments using [intelligent
  // retries](#success-intelligent-retries). Default is `false`.
  retry_if_possible?: boolean;

  // The date on which the first payment should be charged. Must be on or after
  // the [mandate](#core-endpoints-mandates)'s `next_possible_charge_date`. When
  // left blank and `month` or `day_of_month` are provided, this will be set to
  // the date of the first payment. If created without `month` or `day_of_month`
  // this will be set as the mandate's `next_possible_charge_date`
  start_date?: string | null;

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
  // <li>`paused`: the subscription has been paused and will not create
  // payments</li>
  // </ul>
  status?: SubscriptionStatus;

  // Up to 10 upcoming payments with their amounts and charge dates.
  upcoming_payments?: SubscriptionUpcomingPayment[];
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
  mandate?: string;
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
  Paused = 'paused',
}

/** Type for a subscriptionupcomingpayment resource. */
export interface SubscriptionUpcomingPayment {
  // The amount of this payment, in minor unit (e.g. pence in GBP, cents in
  // EUR).
  amount?: string;

  // The date on which this payment will be charged.
  charge_date?: string;
}

/** Type for a taxrate resource. */
export interface TaxRate {
  // Date at which GoCardless stopped applying the tax rate for the
  // jurisdiction.
  end_date?: string | null;

  // The unique identifier created by the jurisdiction, tax type and version
  id?: string;

  // The jurisdiction this tax rate applies to
  jurisdiction?: string;

  // The percentage of tax that is applied onto of GoCardless fees
  percentage?: string;

  // Date at which GoCardless started applying the tax rate in the jurisdiction.
  start_date?: string;

  // The type of tax applied by this rate
  type?: string;
}

/** Type for a verificationdetail resource. */
export interface VerificationDetail {
  // The first line of the company's address.
  address_line1?: string;

  // The second line of the company's address.
  address_line2?: string | null;

  // The third line of the company's address.
  address_line3?: string | null;

  // The city of the company's address.
  city?: string;

  // The company's registration number.
  company_number?: string;

  // A summary describing what the company does.
  description?: string;

  // The company's directors.
  directors?: VerificationDetailDirector[];

  // Resources linked to this VerificationDetail.
  links?: VerificationDetailLinks;

  // The company's legal name.
  name?: string;

  // The company's postal code.
  postal_code?: string;
}

/** Type for a verificationdetailcreaterequestlinks resource. */
export interface VerificationDetailCreateRequestLinks {
  // ID of the associated [creditor](#core-endpoints-creditors).
  creditor: string;
}

/** Type for a verificationdetaildirector resource. */
export interface VerificationDetailDirector {
  // The city of the person's address.
  city: string;

  // [ISO 3166-1 alpha-2
  // code.](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
  country_code: string;

  // The person's date of birth.
  date_of_birth: string;

  // The person's family name.
  family_name: string;

  // The person's given name.
  given_name: string;

  // The person's postal code.
  postal_code: string;

  // The street of the person's address.
  street: string;
}

/** Type for a verificationdetaillinks resource. */
export interface VerificationDetailLinks {
  // ID of the [creditor](#core-endpoints-creditors)
  creditor?: string;
}

/** Type for a webhook resource. */
export interface Webhook {
  // Fixed [timestamp](#api-usage-time-zones--dates), recording when this
  // resource was created.
  created_at?: string;

  // Unique identifier, beginning with "WB".
  id?: string;

  // Boolean value showing whether this was a demo webhook for testing
  is_test?: boolean;

  // The body of the request sent to the webhook URL
  request_body?: string;

  // The request headers sent with the webhook
  request_headers?: JsonMap;

  // The body of the response from the webhook URL
  response_body?: string;

  // Boolean value indicating the webhook response body was truncated
  response_body_truncated?: boolean;

  // The response code from the webhook request
  response_code?: number;

  // The headers sent with the response from the webhook URL
  response_headers?: JsonMap;

  // Boolean indicating the content of response headers was truncated
  response_headers_content_truncated?: boolean;

  // Boolean indicating the number of response headers was truncated
  response_headers_count_truncated?: boolean;

  // Boolean indicating whether the request was successful or failed
  successful?: boolean;

  // URL the webhook was POST-ed to
  url?: string;
}
