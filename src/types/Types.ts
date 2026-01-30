/** Type for a balance resource. */
export type Balance = {
  // The total amount in the balance, defined as the sum of all debits
  // subtracted from the sum of all credits,
  // in the lowest denomination for the currency (e.g. pence in GBP, cents in
  // EUR).
  amount?: number;

  // Type of the balance. Could be one of
  // <ul>
  // <li>pending_payments_submitted: Payments we have submitted to the scheme
  // but not yet confirmed. This does not exactly correspond to <i>Pending
  // payments</i> in the dashboard, because this balance does not include
  // payments that are pending submission.</li>
  // <li>confirmed_funds: Payments that have been confirmed minus fees and
  // unclaimed debits for refunds, failures and chargebacks. These funds have
  // not yet been moved into a payout.</li>
  // <li>pending_payouts: Confirmed payments that have been moved into a payout.
  // This is the total due to be paid into your bank account in the next payout
  // run (payouts happen once every business day).
  // pending_payouts will only be non-zero while we are generating and
  // submitting the payouts to our partner bank.</li>
  // </ul>
  balance_type?: BalanceBalanceType;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency
  // code. Currently "AUD", "CAD", "DKK", "EUR", "GBP", "NZD", "SEK" and "USD"
  // are supported.
  currency?: BalanceCurrency;

  // Dynamic [timestamp](#api-usage-dates-and-times) recording when this
  // resource was last updated.
  last_updated_at?: string;

  // Resources linked to this Balance.
  links?: BalanceLinks;
};

export enum BalanceBalanceType {
  ConfirmedFunds = 'confirmed_funds',
  PendingPayouts = 'pending_payouts',
  PendingPaymentsSubmitted = 'pending_payments_submitted',
}

export enum BalanceCurrency {
  AUD = 'AUD',
  CAD = 'CAD',
  DKK = 'DKK',
  EUR = 'EUR',
  GBP = 'GBP',
  NZD = 'NZD',
  SEK = 'SEK',
  USD = 'USD',
}

/** Type for a balancelinks resource. */
export type BalanceLinks = {
  // ID of the associated [creditor](#core-endpoints-creditors).
  creditor?: string;
};

/** Type for a bankaccountdetail resource. */
export type BankAccountDetail = {
  // Base64 URL encoded encrypted payload, in this case bank details.
  ciphertext?: string;

  // Base64 URL encoded symmetric content encryption key, encrypted with the
  // asymmetric key from your JWKS.
  encrypted_key?: string;

  // Base64 URL encoded initialization vector, used during content encryption.
  iv?: string;

  // Base64 URL encoded JWE header values, containing the following keys:
  //
  //   - `alg`: the asymmetric encryption type used to encrypt symmetric key,
  // e.g: `RSA-OAEP`.
  //   - `enc`: the content encryption type, e.g: `A256GCM`.
  //   - `kid`: the ID of an RSA-2048 public key, from your JWKS, used to
  // encrypt the AES key.
  protected?: string;

  // Base64 URL encoded authentication tag, used to verify payload integrity
  // during decryption.
  tag?: string;
};

/** Type for a bankaccountholderverification resource. */
export type BankAccountHolderVerification = {
  // The actual account name returned by the recipient's bank, populated only in
  // the case of a partial match.
  actual_account_name?: string | null;

  // The unique identifier for the bank account holder verification resource,
  // e.g. "BAHV123".
  id: string;

  // Result of the verification, could be one of
  // <ul>
  //   <li>`full_match`: The verification has confirmed that the account name
  // exactly matches the details provided.</li>
  //   <li>`partial_match`:  The verification has confirmed that the account
  // name is similar but does not match to the details provided. </li>
  //   <li>`no_match`: The verification concludes the provided name does not
  // match the account details.</li>
  //   <li>`unable_to_match`: The verification could not be performed due to
  // recipient bank issues or technical issues </li>
  // </ul>
  result?: BankAccountHolderVerificationResult;

  // The status of the bank account holder verification.
  // <ul>
  //   <li>`pending`: We have triggered the verification, but the result has not
  // come back yet.</li>
  //   <li>`completed`: The verification is complete and is ready to be
  // used.</li>
  // </ul>
  //
  status: BankAccountHolderVerificationStatus;

  // Type of the verification that has been performed
  // eg. [Confirmation of
  // Payee](https://www.wearepay.uk/what-we-do/overlay-services/confirmation-of-payee/)
  type: BankAccountHolderVerificationType;
};

/** Type for a bankaccountholderverificationcreaterequestlinks resource. */
export type BankAccountHolderVerificationCreateRequestLinks = {
  // The ID of the bank account to verify, e.g. "BA123".
  bank_account: string;
};

export enum BankAccountHolderVerificationType {
  ConfirmationOfPayee = 'confirmation_of_payee',
}

export enum BankAccountHolderVerificationResult {
  FullMatch = 'full_match',
  PartialMatch = 'partial_match',
  NoMatch = 'no_match',
  UnableToMatch = 'unable_to_match',
}

export enum BankAccountHolderVerificationStatus {
  Pending = 'pending',
  Completed = 'completed',
}

/** Type for a bankauthorisation resource. */
export type BankAuthorisation = {
  // Type of authorisation, can be either 'mandate' or 'payment'.
  authorisation_type?: BankAuthorisationAuthorisationType;

  // Fixed [timestamp](#api-usage-dates-and-times), recording when the user has
  // been authorised.
  authorised_at?: string | null;

  // Timestamp when the flow was created
  created_at?: string;

  // Timestamp when the url will expire. Each authorisation url currently lasts
  // for 15 minutes, but this can vary by bank.
  expires_at?: string;

  // Unique identifier, beginning with "BAU".
  id: string;

  // Fixed [timestamp](#api-usage-dates-and-times), recording when the
  // authorisation URL has been visited.
  last_visited_at?: string | null;

  // Resources linked to this BankAuthorisation.
  links?: BankAuthorisationLinks;

  // URL to a QR code PNG image of the bank authorisation url.
  // This QR code can be used as an alternative to providing the `url` to the
  // payer to allow them to authorise with their mobile devices.
  qr_code_url?: string | null;

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
  // Please note: bank authorisations can still fail despite an
  // `outcome=success` on the `redirect_uri`. It is therefore recommended to
  // wait for the relevant bank authorisation event, such as
  // [`BANK_AUTHORISATION_AUTHORISED`](#billing-request-bankauthorisationauthorised),
  // [`BANK_AUTHORISATION_DENIED`](#billing-request-bankauthorisationdenied), or
  // [`BANK_AUTHORISATION_FAILED`](#billing-request-bankauthorisationfailed) in
  // order to show the correct outcome to the user.
  //
  // The BillingRequestFlow ID will also be appended to the `redirect_uri` as
  // query parameter `id=BRF123`.
  //
  // Defaults to `https://pay.gocardless.com/billing/static/thankyou`.
  redirect_uri?: string;

  // URL for an oauth flow that will allow the user to authorise the payment
  url?: string;
};

/** Type for a bankauthorisationcreaterequestlinks resource. */
export type BankAuthorisationCreateRequestLinks = {
  // ID of the [billing request](#billing-requests-billing-requests) against
  // which this authorisation was created.
  billing_request?: string;
};

export enum BankAuthorisationAuthorisationType {
  Mandate = 'mandate',
  Payment = 'payment',
}

/** Type for a bankauthorisationlinks resource. */
export type BankAuthorisationLinks = {
  // ID of the [billing request](#billing-requests-billing-requests) against
  // which this authorisation was created.
  billing_request?: string;

  // ID of the [institution](#billing-requests-institutions) against which this
  // authorisation was created.
  institution?: string;
};

/** Type for a bankdetailslookup resource. */
export type BankDetailsLookup = {
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
};

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
export type BillingRequest = {
  // List of actions that can be performed before this billing request can be
  // fulfilled.
  actions?: BillingRequestAction[];

  // Fixed [timestamp](#api-usage-dates-and-times), recording when this resource
  // was created.
  created_at?: string;

  // (Optional) If true, this billing request can fallback from instant payment
  // to direct debit.
  // Should not be set if GoCardless payment intelligence feature is used.
  //
  // See [Billing Requests: Retain customers with
  // Fallbacks](https://developer.gocardless.com/billing-requests/retain-customers-with-fallbacks/)
  // for more information.
  fallback_enabled?: boolean;

  // True if the billing request was completed with direct debit.
  fallback_occurred?: boolean;

  // Unique identifier, beginning with "BRQ".
  id: string;

  // Request for an instalment schedule. Has to contain either
  // `instalments_with_schedule` object or an array of `instalments_with_dates`
  // objects
  instalment_schedule_request?: BillingRequestInstalmentScheduleRequest | null;

  // Resources linked to this BillingRequest.
  links?: BillingRequestLinks;

  // Request for a mandate
  mandate_request?: BillingRequestMandateRequest;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  metadata?: JsonMap;

  // Specifies the context or scenario in which the payment is being made.
  // Defines whether the payment is for advance/arrears billing, point of sale
  // transactions, ecommerce, or account transfers. This helps banks and payment
  // processors understand the payment scenario and apply appropriate processing
  // rules and risk controls.
  payment_context_code?: BillingRequestPaymentContextCode;

  // Specifies the underlying purpose of the payment. Defines the specific
  // reason or type of service/goods the payment relates to, improving
  // straight-through processing and compliance.
  // See [VRP Commercial Payment Purpose
  // Codes](https://developer.gocardless.com/vrp-commercial-payment-purpose-codes/)
  // for the complete list of valid codes.
  payment_purpose_code?: string;

  // Request for a one-off strongly authorised payment
  payment_request?: BillingRequestPaymentRequest;

  // Specifies the high-level purpose/category of a mandate and/or payment using
  // a set of pre-defined categories. Provides context on the nature and reason
  // for the payment to facilitate processing and compliance.
  // See [Billing Request Purpose
  // Codes](https://developer.gocardless.com/billing-request-purpose-codes/) for
  // the complete list of valid codes.
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

  // Request for a subscription
  subscription_request?: BillingRequestSubscriptionRequest | null;
};

/** Type for a billingrequestcreaterequestlinks resource. */
export type BillingRequestCreateRequestLinks = {
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
};

export enum BillingRequestPaymentContextCode {
  BillingGoodsAndServicesInAdvance = 'billing_goods_and_services_in_advance',
  BillingGoodsAndServicesInArrears = 'billing_goods_and_services_in_arrears',
  FaceToFacePointOfSale = 'face_to_face_point_of_sale',
  EcommerceMerchantInitiatedPayment = 'ecommerce_merchant_initiated_payment',
  TransferToSelf = 'transfer_to_self',
  TransferToThirdParty = 'transfer_to_third_party',
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
  BonusPayment = 'bonus_payment',
  CashManagementTransfer = 'cash_management_transfer',
  CardBulkClearing = 'card_bulk_clearing',
  CreditCardPayment = 'credit_card_payment',
  TradeSettlementPayment = 'trade_settlement_payment',
  DebitCardPayment = 'debit_card_payment',
  Dividend = 'dividend',
  DeliverAgainstPayment = 'deliver_against_payment',
  Epayment = 'epayment',
  FeeCollectionAndInterest = 'fee_collection_and_interest',
  FeeCollection = 'fee_collection',
  PersonToPersonPayment = 'person_to_person_payment',
  GovernmentPayment = 'government_payment',
  HedgingTransaction = 'hedging_transaction',
  IrrevocableCreditCardPayment = 'irrevocable_credit_card_payment',
  IrrevocableDebitCardPayment = 'irrevocable_debit_card_payment',
  IntraCompanyPayment = 'intra_company_payment',
  Interest = 'interest',
  LockboxTransactions = 'lockbox_transactions',
  Commercial = 'commercial',
  Consumer = 'consumer',
  OtherPayment = 'other_payment',
  PensionPayment = 'pension_payment',
  Represented = 'represented',
  ReimbursementReceivedCreditTransfer = 'reimbursement_received_credit_transfer',
  ReceiveAgainstPayment = 'receive_against_payment',
  SalaryPayment = 'salary_payment',
  Securities = 'securities',
  SocialSecurityBenefit = 'social_security_benefit',
  SupplierPayment = 'supplier_payment',
  TaxPayment = 'tax_payment',
  Trade = 'trade',
  TreasuryPayment = 'treasury_payment',
  ValueAddedTaxPayment = 'value_added_tax_payment',
  WithHolding = 'with_holding',
  CashManagementSweepAccount = 'cash_management_sweep_account',
  CashManagementTopAccount = 'cash_management_top_account',
  CashManagementZeroBalanceAccount = 'cash_management_zero_balance_account',
  CrossborderMiPayments = 'crossborder_mi_payments',
  ForeignCurrencyDomesticTransfer = 'foreign_currency_domestic_transfer',
  CashInPreCredit = 'cash_in_pre_credit',
  CashOutNotesCoins = 'cash_out_notes_coins',
  CarrierGuardedWholesaleValuables = 'carrier_guarded_wholesale_valuables',
}

/** Type for a billingrequestcustomer resource. */
export type BillingRequestCustomer = {
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

  //  [ISO 639-1](http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) code.
  // Used as the language for notification emails sent by GoCardless if your
  // organisation does not send its own (see [compliance
  // requirements](#appendix-compliance-requirements)). Currently only "en",
  // "fr", "de", "pt", "es", "it", "nl", "da", "nb", "sl", "sv" are supported.
  // If this is not provided and a customer was linked during billing request
  // creation, the linked customer language will be used. Otherwise, the
  // language is default to "en".
  language?: string | null;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  metadata?: JsonMap;

  // [ITU E.123](https://en.wikipedia.org/wiki/E.123) formatted phone number,
  // including country code.
  phone_number?: string | null;
};

/** Type for a billingrequestcustomerbillingdetail resource. */
export type BillingRequestCustomerBillingDetail = {
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
};

export enum BillingRequestAccountType {
  Savings = 'savings',
  Checking = 'checking',
}

export enum BillingRequestStatus {
  Pending = 'pending',
  ReadyToFulfil = 'ready_to_fulfil',
  Fulfilling = 'fulfilling',
  Fulfilled = 'fulfilled',
  Cancelled = 'cancelled',
}

export enum BillingRequestNotificationType {
  Email = 'email',
}

/** Type for a billingrequestaction resource. */
export type BillingRequestAction = {
  // List of currencies the current mandate supports
  available_currencies?: string[];

  // Describes the behaviour of bank authorisations, for the bank_authorisation
  // action
  bank_authorisation?: BillingRequestActionBankAuthorisation;

  // Additional parameters to help complete the collect_customer_details action
  collect_customer_details?: BillingRequestActionCollectCustomerDetails;

  // Which other action types this action can complete.
  completes_actions?: string[];

  // Describes whether we inferred the institution from the provided bank
  // account details. One of:
  // - `not_needed`: we won't attempt to infer the institution as it is not
  // needed. Either because it was manually selected or the billing request does
  // not support this feature
  // - `pending`: we are waiting on the bank details in order to infer the
  // institution
  // - `failed`: we weren't able to infer the institution
  // - `success`: we inferred the institution and added it to the resources of a
  // Billing Request
  //
  institution_guess_status?: BillingRequestActionInstitutionGuessStatus;

  // Informs you whether the action is required to fulfil the billing request or
  // not.
  required?: boolean;

  // Requires completing these actions before this action can be completed.
  requires_actions?: string[];

  // Status of the action
  status?: BillingRequestActionStatus;

  // Unique identifier for the action.
  type?: BillingRequestActionType;
};

/** Type for a billingrequestactionbankauthorisation resource. */
export type BillingRequestActionBankAuthorisation = {
  // Which authorisation adapter will be used to power these authorisations
  // (GoCardless internal use only)
  adapter?: BillingRequestActionBankAuthorisationAdapter;

  // What type of bank authorisations are supported on this billing request
  authorisation_type?: BillingRequestActionBankAuthorisationAuthorisationType;
};

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
export type BillingRequestActionCollectCustomerDetails = {
  // Default customer country code, as determined by scheme and payer location
  default_country_code?: string;

  //
  incomplete_fields?: BillingRequestActionCollectCustomerDetailsIncompleteFields;
};

/** Type for a billingrequestactioncollectcustomerdetailsincompletefields resource. */
export type BillingRequestActionCollectCustomerDetailsIncompleteFields = {
  //
  customer?: string[];

  //
  customer_billing_detail?: string[];
};

export enum BillingRequestActionInstitutionGuessStatus {
  NotNeeded = 'not_needed',
  Pending = 'pending',
  Failed = 'failed',
  Success = 'success',
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

/** Type for a billingrequestinstalmentschedulerequest resource. */
export type BillingRequestInstalmentScheduleRequest = {
  // The amount to be deducted from each payment as an app fee, to be paid to
  // the partner integration which created the subscription, in the lowest
  // denomination for the currency (e.g. pence in GBP, cents in EUR).
  app_fee?: string | null;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency
  // code. Currently "USD" and "CAD" are supported.
  currency?: string;

  // An explicit array of instalment payments, each specifying at least an
  // `amount` and `charge_date`. See [create (with
  // dates)](#instalment-schedules-create-with-dates)
  instalments_with_dates?: BillingRequestInstalmentScheduleRequestInstalmentsWithDate[] | null;

  // Frequency of the payments you want to create, together with an array of
  // payment
  // amounts to be collected, with a specified start date for the first payment.
  // See [create (with schedule)](#instalment-schedules-create-with-schedule)
  //
  instalments_with_schedule?: BillingRequestInstalmentScheduleRequestInstalmentsWithSchedule | null;

  // Resources linked to this BillingRequestInstalmentScheduleRequest.
  links?: BillingRequestInstalmentScheduleRequestLinks;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  metadata?: JsonMap;

  // Name of the instalment schedule, up to 100 chars. This name will also be
  // copied to the payments of the instalment schedule if you use schedule-based
  // creation.
  name?: string;

  // An optional payment reference. This will be set as the reference on each
  // payment
  // created and will appear on your customer's bank statement. See the
  // documentation for
  // the [create payment endpoint](#payments-create-a-payment) for more details.
  // <br />
  payment_reference?: string | null;

  // On failure, automatically retry payments using [intelligent
  // retries](/success-plus/overview). Default is `false`. <p
  // class="notice"><strong>Important</strong>: To be able to use intelligent
  // retries, Success+ needs to be enabled in [GoCardless
  // dashboard](https://manage.gocardless.com/success-plus). </p>
  retry_if_possible?: boolean;

  // The total amount of the instalment schedule, defined as the sum of all
  // individual
  // payments, in the lowest denomination for the currency (e.g. pence in GBP,
  // cents in
  // EUR). If the requested payment amounts do not sum up correctly, a
  // validation error
  // will be returned.
  total_amount?: string;
};

/** Type for a billingrequestinstalmentschedulerequestinstalmentswithdate resource. */
export type BillingRequestInstalmentScheduleRequestInstalmentsWithDate = {
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
};

/** Type for a billingrequestinstalmentschedulerequestinstalmentswithschedule resource. */
export type BillingRequestInstalmentScheduleRequestInstalmentsWithSchedule = {
  // List of amounts of each instalment, in the lowest denomination for the
  // currency (e.g. cents in USD).
  //
  amounts: string[];

  // Number of `interval_units` between charge dates. Must be greater than or
  // equal to `1`.
  //
  interval: number;

  // The unit of time between customer charge dates. One of `weekly`, `monthly`
  // or `yearly`.
  interval_unit: BillingRequestInstalmentScheduleRequestInstalmentsWithScheduleIntervalUnit;

  // The date on which the first payment should be charged. Must be on or after
  // the [mandate](#core-endpoints-mandates)'s `next_possible_charge_date`. When
  // left blank and `month` or `day_of_month` are provided, this will be set to
  // the date of the first payment. If created without `month` or `day_of_month`
  // this will be set as the mandate's `next_possible_charge_date`
  start_date?: string | null;
};

export enum BillingRequestInstalmentScheduleRequestInstalmentsWithScheduleIntervalUnit {
  Weekly = 'weekly',
  Monthly = 'monthly',
  Yearly = 'yearly',
}

/** Type for a billingrequestinstalmentschedulerequestlinks resource. */
export type BillingRequestInstalmentScheduleRequestLinks = {
  // (Optional) ID of the
  // [instalment_schedule](#core-endpoints-instalment-schedules) that was
  // created from this instalment schedule request.
  //
  instalment_schedule?: string;
};

/** Type for a billingrequestlinks resource. */
export type BillingRequestLinks = {
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

  // (Optional) ID of the associated instalment schedule request
  instalment_schedule_request?: string;

  // (Optional) ID of the
  // [instalment_schedule](#core-endpoints-instalment-schedules) that was
  // created from this instalment schedule request.
  instalment_schedule_request_instalment_schedule?: string;

  // (Optional) ID of the associated mandate request
  mandate_request?: string;

  // (Optional) ID of the [mandate](#core-endpoints-mandates) that was created
  // from this mandate request. this mandate request.
  mandate_request_mandate?: string;

  // ID of the associated organisation.
  organisation?: string;

  // (Optional) ID of the associated payment provider
  payment_provider?: string;

  // (Optional) ID of the associated payment request
  payment_request?: string;

  // (Optional) ID of the [payment](#core-endpoints-payments) that was created
  // from this payment request.
  payment_request_payment?: string;

  // (Optional) ID of the associated subscription request
  subscription_request?: string;

  // (Optional) ID of the [subscription](#core-endpoints-subscriptions) that was
  // created from this subscription request.
  subscription_request_subscription?: string;
};

/** Type for a billingrequestmandaterequest resource. */
export type BillingRequestMandateRequest = {
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

  // This attribute represents the authorisation type between the payer and
  // merchant. It can be set to `one_off`,
  // `recurring` or `standing` for ACH scheme. And `single`, `recurring` and
  // `sporadic` for PAD scheme. _Note:_ This is only supported for ACH and PAD
  // schemes.
  //
  consent_type?: string | null;

  // Constraints that will apply to the mandate_request. (Optional) Specifically
  // required for PayTo and VRP.
  constraints?: BillingRequestMandateRequestConstraints | null;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency
  // code.
  currency?: string;

  // A human-readable description of the payment and/or mandate. This will be
  // displayed to the payer when authorising the billing request.
  //
  description?: string | null;

  // This field will decide how GoCardless handles settlement of funds from the
  // customer.
  //
  // - `managed` will be moved through GoCardless' account, batched, and payed
  // out.
  // - `direct` will be a direct transfer from the payer's account to the
  // merchant where
  //   invoicing will be handled separately.
  //
  funds_settlement?: BillingRequestMandateRequestFundsSettlement;

  // Resources linked to this BillingRequestMandateRequest.
  links?: BillingRequestMandateRequestLinks;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  metadata?: JsonMap;

  // This attribute can be set to true if the payer has indicated that multiple
  // signatures are required for the mandate. As long as every other Billing
  // Request actions have been completed, the payer will receive an email
  // notification containing instructions on how to complete the additional
  // signature. The dual signature flow can only be completed using GoCardless
  // branded pages.
  payer_requested_dual_signature?: boolean;

  // A bank payment scheme. Currently "ach", "autogiro", "bacs", "becs",
  // "becs_nz", "betalingsservice", "faster_payments", "pad", "pay_to" and
  // "sepa_core" are supported. Optional for mandate only requests - if left
  // blank, the payer will be able to select the currency/scheme to pay with
  // from a list of your available schemes.
  scheme?: string | null;

  // If true, this billing request would be used to set up a mandate solely for
  // moving (or sweeping) money from one account owned by the payer to another
  // account that the payer also owns. This is required for Faster Payments
  sweeping?: boolean;

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
};

export enum BillingRequestMandateRequestAuthorisationSource {
  Web = 'web',
  Telephone = 'telephone',
  Paper = 'paper',
}

/** Type for a billingrequestmandaterequestconstraints resource. */
export type BillingRequestMandateRequestConstraints = {
  // The latest date at which payments can be taken, must occur after start_date
  // if present
  //
  // This is an optional field and if it is not supplied the agreement will be
  // considered open and
  // will not have an end date. Keep in mind the end date must take into account
  // how long it will
  // take the user to set up this agreement via the Billing Request.
  //
  end_date?: string;

  // The maximum amount that can be charged for a single payment. Required for
  // PayTo and VRP.
  max_amount_per_payment?: number;

  // A constraint where you can specify info (free text string) about how
  // payments are calculated. _Note:_ This is only supported for ACH and PAD
  // schemes.
  //
  payment_method?: string;

  // List of periodic limits and constraints which apply to them
  periodic_limits?: BillingRequestMandateRequestConstraintsPeriodicLimit[];

  // The date from which payments can be taken.
  //
  // This is an optional field and if it is not supplied the start date will be
  // set to the day
  // authorisation happens.
  //
  start_date?: string;
};

/** Type for a billingrequestmandaterequestconstraintsperiodiclimit resource. */
export type BillingRequestMandateRequestConstraintsPeriodicLimit = {
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

  // (Optional) The maximum number of payments that can be collected in this
  // periodic limit.
  max_payments?: number;

  // The maximum total amount that can be charged for all payments in this
  // periodic limit.
  // Required for VRP.
  //
  max_total_amount?: number;

  // The repeating period for this mandate. Defaults to flexible for PayTo if
  // not specified.
  period?: BillingRequestMandateRequestConstraintsPeriodicLimitPeriod;
};

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

export enum BillingRequestMandateRequestFundsSettlement {
  Managed = 'managed',
  Direct = 'direct',
}

/** Type for a billingrequestmandaterequestlinks resource. */
export type BillingRequestMandateRequestLinks = {
  // (Optional) ID of the [mandate](#core-endpoints-mandates) that was created
  // from this mandate request. this mandate request.
  //
  mandate?: string;
};

export enum BillingRequestMandateRequestVerify {
  Minimum = 'minimum',
  Recommended = 'recommended',
  WhenAvailable = 'when_available',
  Always = 'always',
}

/** Type for a billingrequestpaymentrequest resource. */
export type BillingRequestPaymentRequest = {
  // Amount in minor unit (e.g. pence in GBP, cents in EUR).
  amount?: string;

  // The amount to be deducted from the payment as an app fee, to be paid to the
  // partner integration which created the billing request, in the lowest
  // denomination for the currency (e.g. pence in GBP, cents in EUR).
  app_fee?: string | null;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency
  // code. `GBP` and `EUR` supported; `GBP` with your customers in the UK and
  // for `EUR` with your customers in supported Eurozone countries only.
  currency?: string;

  // A human-readable description of the payment and/or mandate. This will be
  // displayed to the payer when authorising the billing request.
  //
  description?: string | null;

  // This field will decide how GoCardless handles settlement of funds from the
  // customer.
  //
  // - `managed` will be moved through GoCardless' account, batched, and payed
  // out.
  // - `direct` will be a direct transfer from the payer's account to the
  // merchant where
  //   invoicing will be handled separately.
  //
  funds_settlement?: BillingRequestPaymentRequestFundsSettlement;

  // Resources linked to this BillingRequestPaymentRequest.
  links?: BillingRequestPaymentRequestLinks;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  metadata?: JsonMap;

  // A custom payment reference defined by the merchant. It is only available
  // for payments on the PayTo scheme or payments using the Direct Funds
  // settlement model on the Faster Payments scheme.
  //
  reference?: string | null;

  // (Optional) A scheme used for Open Banking payments. Currently
  // `faster_payments` is supported in the UK (GBP) and `sepa_credit_transfer`
  // and `sepa_instant_credit_transfer` are supported in supported Eurozone
  // countries (EUR). For Eurozone countries, `sepa_credit_transfer` is used as
  // the default. Please be aware that `sepa_instant_credit_transfer` may incur
  // an additional fee for your customer.
  scheme?: string | null;
};

export enum BillingRequestPaymentRequestFundsSettlement {
  Managed = 'managed',
  Direct = 'direct',
}

/** Type for a billingrequestpaymentrequestlinks resource. */
export type BillingRequestPaymentRequestLinks = {
  // (Optional) ID of the [payment](#core-endpoints-payments) that was created
  // from this payment request.
  payment?: string;
};

/** Type for a billingrequestresources resource. */
export type BillingRequestResources = {
  // Embedded customer
  customer?: BillingRequestResourcesCustomer;

  // Embedded customer bank account, only if a bank account is linked
  customer_bank_account?: BillingRequestResourcesCustomerBankAccount | null;

  // Embedded customer billing detail
  customer_billing_detail?: BillingRequestResourcesCustomerBillingDetail;
};

/** Type for a billingrequestresourcescustomer resource. */
export type BillingRequestResourcesCustomer = {
  // Customer's company name. Required unless a `given_name` and `family_name`
  // are provided. For Canadian customers, the use of a `company_name` value
  // will mean that any mandate created from this customer will be considered to
  // be a "Business PAD" (otherwise, any mandate will be considered to be a
  // "Personal PAD").
  company_name?: string | null;

  // Fixed [timestamp](#api-usage-dates-and-times), recording when this resource
  // was created.
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
};

/** Type for a billingrequestresourcescustomerbankaccount resource. */
export type BillingRequestResourcesCustomerBankAccount = {
  // Name of the account holder, as known by the bank. The full name provided
  // when the customer is created is stored and is available via the API, but is
  // transliterated, upcased, and truncated to 18 characters in bank
  // submissions. This field is required unless the request includes a [customer
  // bank account token](#javascript-flow-customer-bank-account-tokens).
  account_holder_name?: string;

  // The last few digits of the account number. Currently 4 digits for NZD bank
  // accounts and 2 digits for other currencies.
  account_number_ending?: string;

  // Bank account type. Required for USD-denominated bank accounts. Must not be
  // provided for bank accounts in other currencies. See [local
  // details](#local-bank-details-united-states) for more information.
  account_type?: BillingRequestResourcesCustomerBankAccountAccountType;

  // A token to uniquely refer to a set of bank account details. This feature is
  // still in early access and is only available for certain organisations.
  bank_account_token?: string | null;

  // Name of bank, taken from the bank details.
  bank_name?: string;

  // [ISO 3166-1 alpha-2
  // code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements).
  // Defaults to the country code of the `iban` if supplied, otherwise is
  // required.
  country_code?: string | null;

  // Fixed [timestamp](#api-usage-dates-and-times), recording when this resource
  // was created.
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
};

export enum BillingRequestResourcesCustomerBankAccountAccountType {
  Savings = 'savings',
  Checking = 'checking',
}

/** Type for a billingrequestresourcescustomerbankaccountlinks resource. */
export type BillingRequestResourcesCustomerBankAccountLinks = {
  // ID of the [customer](#core-endpoints-customers) that owns this bank
  // account.
  customer?: string;
};

/** Type for a billingrequestresourcescustomerbillingdetail resource. */
export type BillingRequestResourcesCustomerBillingDetail = {
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

  // Fixed [timestamp](#api-usage-dates-and-times), recording when this resource
  // was created.
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
};

/** Type for a billingrequestsubscriptionrequest resource. */
export type BillingRequestSubscriptionRequest = {
  // Amount in the lowest denomination for the currency (e.g. pence in GBP,
  // cents in EUR).
  amount?: string;

  // The amount to be deducted from each payment as an app fee, to be paid to
  // the partner integration which created the subscription, in the lowest
  // denomination for the currency (e.g. pence in GBP, cents in EUR).
  app_fee?: string | null;

  // The total number of payments that should be taken by this subscription.
  count?: string | null;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency
  // code. Currently "USD" and "CAD" are supported.
  currency?: string;

  // As per RFC 2445. The day of the month to charge customers on. `1`-`28` or
  // `-1` to indicate the last day of the month.
  day_of_month?: string | null;

  // Number of `interval_units` between customer charge dates. Must be greater
  // than or equal to `1`. Must result in at least one charge date per year.
  // Defaults to `1`.
  interval?: string;

  // The unit of time between customer charge dates. One of `weekly`, `monthly`
  // or `yearly`.
  interval_unit?: BillingRequestSubscriptionRequestIntervalUnit;

  // Resources linked to this BillingRequestSubscriptionRequest.
  links?: BillingRequestSubscriptionRequestLinks;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  metadata?: JsonMap;

  // Name of the month on which to charge a customer. Must be lowercase. Only
  // applies
  // when the interval_unit is `yearly`.
  //
  month?: BillingRequestSubscriptionRequestMonth;

  // Optional name for the subscription. This will be set as the description on
  // each payment created. Must not exceed 255 characters.
  name?: string | null;

  // An optional payment reference. This will be set as the reference on each
  // payment
  // created and will appear on your customer's bank statement. See the
  // documentation for
  // the [create payment endpoint](#payments-create-a-payment) for more details.
  // <br />
  payment_reference?: string | null;

  // On failure, automatically retry payments using [intelligent
  // retries](/success-plus/overview). Default is `false`. <p
  // class="notice"><strong>Important</strong>: To be able to use intelligent
  // retries, Success+ needs to be enabled in [GoCardless
  // dashboard](https://manage.gocardless.com/success-plus). </p>
  retry_if_possible?: boolean;

  // The date on which the first payment should be charged. If fulfilled after
  // this date, this will be set as the mandate's `next_possible_charge_date`.
  // When left blank and `month` or `day_of_month` are provided, this will be
  // set to the date of the first payment.
  // If created without `month` or `day_of_month` this will be set as the
  // mandate's `next_possible_charge_date`.
  //
  start_date?: string | null;
};

export enum BillingRequestSubscriptionRequestIntervalUnit {
  Weekly = 'weekly',
  Monthly = 'monthly',
  Yearly = 'yearly',
}

/** Type for a billingrequestsubscriptionrequestlinks resource. */
export type BillingRequestSubscriptionRequestLinks = {
  // (Optional) ID of the [subscription](#core-endpoints-subscriptions) that was
  // created from this subscription request.
  //
  subscription?: string;
};

export enum BillingRequestSubscriptionRequestMonth {
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

/** Type for a billingrequestflow resource. */
export type BillingRequestFlow = {
  // URL for a GC-controlled flow which will allow the payer to fulfil the
  // billing request
  authorisation_url?: string;

  // (Experimental feature) Fulfil the Billing Request on completion of the flow
  // (true by default). Disabling the auto_fulfil is not allowed currently.
  auto_fulfil?: boolean;

  // Timestamp when the flow was created
  created_at?: string;

  // Identifies whether a Billing Request belongs to a specific customer
  customer_details_captured?: boolean;

  // URL that the payer can be taken to if there isn't a way to progress ahead
  // in flow, for example if the customer searches for a bank that doesn't exist
  // or isn't supported on the scheme.
  exit_uri?: string | null;

  // Timestamp when the flow will expire. Each flow currently lasts for 7 days.
  expires_at?: string;

  // Unique identifier, beginning with "BRF".
  id: string;

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

  // If true, the payer will be able to see a redirect action button on the
  // Success page. This action button will provide a way to redirect the payer
  // to the given redirect_uri. This functionality is helpful when merchants do
  // not want payers to be automatically redirected or on Android devices, where
  // automatic redirections are not possible.
  show_success_redirect_button?: boolean;

  // If true, the payer will not be redirected to the success screen after
  // completing the flow. A redirect_uri needs to be provided for this parameter
  // to be taken into account.
  skip_success_screen?: boolean;
};

/** Type for a billingrequestflowcreaterequestlinks resource. */
export type BillingRequestFlowCreateRequestLinks = {
  // ID of the [billing request](#billing-requests-billing-requests) against
  // which this flow was created.
  billing_request: string;
};

/** Type for a billingrequestflowlinks resource. */
export type BillingRequestFlowLinks = {
  // ID of the [billing request](#billing-requests-billing-requests) against
  // which this flow was created.
  billing_request: string;
};

/** Type for a billingrequestflowprefilledbankaccount resource. */
export type BillingRequestFlowPrefilledBankAccount = {
  // Bank account type for USD-denominated bank accounts. Must not be provided
  // for bank accounts in other currencies. See [local
  // details](#local-bank-details-united-states) for more information.
  account_type?: BillingRequestFlowPrefilledBankAccountAccountType;
};

export enum BillingRequestFlowPrefilledBankAccountAccountType {
  Savings = 'savings',
  Checking = 'checking',
}

/** Type for a billingrequestflowprefilledcustomer resource. */
export type BillingRequestFlowPrefilledCustomer = {
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
};

/** Type for a billingrequesttemplate resource. */
export type BillingRequestTemplate = {
  // Permanent URL that customers can visit to allow them to complete a flow
  // based on this template, before being returned to the `redirect_uri`.
  authorisation_url?: string;

  // Fixed [timestamp](#api-usage-dates-and-times), recording when this resource
  // was created.
  created_at?: string;

  // Unique identifier, beginning with "BRT".
  id?: string;

  // Constraints that will apply to the mandate_request. (Optional) Specifically
  // required for PayTo and VRP.
  mandate_request_constraints?: BillingRequestTemplateMandateRequestConstraints | null;

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

  // Amount in full.
  payment_request_amount?: string;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency
  // code. `GBP` and `EUR` supported; `GBP` with your customers in the UK and
  // for `EUR` with your customers in supported Eurozone countries only.
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
  // and `sepa_instant_credit_transfer` are supported in supported Eurozone
  // countries (EUR). For Eurozone countries, `sepa_credit_transfer` is used as
  // the default. Please be aware that `sepa_instant_credit_transfer` may incur
  // an additional fee for your customer.
  payment_request_scheme?: string | null;

  // URL that the payer can be redirected to after completing the request flow.
  redirect_uri?: string | null;

  // Dynamic [timestamp](#api-usage-dates-and-times) recording when this
  // resource was last updated.
  updated_at?: string;
};

/** Type for a billingrequesttemplatecreaterequestlinks resource. */
export type BillingRequestTemplateCreateRequestLinks = {
  // ID of the associated [creditor](#core-endpoints-creditors). Only required
  // if your account manages multiple creditors.
  creditor?: string;
};

export enum BillingRequestTemplateMandateRequestVerify {
  Minimum = 'minimum',
  Recommended = 'recommended',
  WhenAvailable = 'when_available',
  Always = 'always',
}

/** Type for a billingrequesttemplatemandaterequestconstraints resource. */
export type BillingRequestTemplateMandateRequestConstraints = {
  // The latest date at which payments can be taken, must occur after start_date
  // if present
  //
  // This is an optional field and if it is not supplied the agreement will be
  // considered open and
  // will not have an end date. Keep in mind the end date must take into account
  // how long it will
  // take the user to set up this agreement via the Billing Request.
  //
  end_date?: string;

  // The maximum amount that can be charged for a single payment. Required for
  // PayTo and VRP.
  max_amount_per_payment?: number;

  // A constraint where you can specify info (free text string) about how
  // payments are calculated. _Note:_ This is only supported for ACH and PAD
  // schemes.
  //
  payment_method?: string;

  // List of periodic limits and constraints which apply to them
  periodic_limits?: BillingRequestTemplateMandateRequestConstraintsPeriodicLimit[];

  // The date from which payments can be taken.
  //
  // This is an optional field and if it is not supplied the start date will be
  // set to the day
  // authorisation happens.
  //
  start_date?: string;
};

/** Type for a billingrequesttemplatemandaterequestconstraintsperiodiclimit resource. */
export type BillingRequestTemplateMandateRequestConstraintsPeriodicLimit = {
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
  alignment?: BillingRequestTemplateMandateRequestConstraintsPeriodicLimitAlignment;

  // (Optional) The maximum number of payments that can be collected in this
  // periodic limit.
  max_payments?: number;

  // The maximum total amount that can be charged for all payments in this
  // periodic limit.
  // Required for VRP.
  //
  max_total_amount?: number;

  // The repeating period for this mandate. Defaults to flexible for PayTo if
  // not specified.
  period?: BillingRequestTemplateMandateRequestConstraintsPeriodicLimitPeriod;
};

export enum BillingRequestTemplateMandateRequestConstraintsPeriodicLimitAlignment {
  Calendar = 'calendar',
  CreationDate = 'creation_date',
}

export enum BillingRequestTemplateMandateRequestConstraintsPeriodicLimitPeriod {
  Day = 'day',
  Week = 'week',
  Month = 'month',
  Year = 'year',
  Flexible = 'flexible',
}

/** Type for a billingrequestwithaction resource. */
export type BillingRequestWithAction = {
  // Bank Authorisations can be used to authorise Billing Requests.
  // Authorisations
  // are created against a specific bank, usually the bank that provides the
  // payer's
  // account.
  //
  // Creation of Bank Authorisations is only permitted from GoCardless hosted
  // UIs
  // (see Billing Request Flows) to ensure we meet regulatory requirements for
  // checkout flows.
  bank_authorisations?: BillingRequestWithActionBankAuthorisations;

  //  Billing Requests help create resources that require input or action from a
  // customer. An example of required input might be additional customer billing
  // details, while an action would be asking a customer to authorise a payment
  // using their mobile banking app.
  //
  // See [Billing Requests:
  // Overview](https://developer.gocardless.com/getting-started/billing-requests/overview/)
  // for how-to's, explanations and tutorials. <p
  // class="notice"><strong>Important</strong>: All properties associated with
  // `subscription_request` and `instalment_schedule_request` are only supported
  // for ACH and PAD schemes.</p>
  billing_requests: BillingRequestWithActionBillingRequests;
};

/** Type for a billingrequestwithactionactions resource. */
export type BillingRequestWithActionActions = {
  // URL for an oauth flow that will allow the user to authorise the payment
  bank_authorisation_redirect_uri?: string;

  //
  collect_bank_account?: BillingRequestWithActionActionsCollectBankAccount;

  //
  collect_customer_details?: BillingRequestWithActionActionsCollectCustomerDetails;

  //
  confirm_payer_details?: BillingRequestWithActionActionsConfirmPayerDetails;

  // Create a bank authorisation object as part of this request
  create_bank_authorisation?: boolean;

  //
  select_institution?: BillingRequestWithActionActionsSelectInstitution;
};

/** Type for a billingrequestwithactionactionscollectbankaccount resource. */
export type BillingRequestWithActionActionsCollectBankAccount = {
  // Name of the account holder, as known by the bank. The full name provided
  // when the customer is created is stored and is available via the API, but is
  // transliterated, upcased, and truncated to 18 characters in bank
  // submissions. This field is required unless the request includes a [customer
  // bank account token](#javascript-flow-customer-bank-account-tokens).
  account_holder_name?: string;

  // Bank account number - see [local details](#appendix-local-bank-details) for
  // more information. Alternatively you can provide an `iban`.
  account_number?: string | null;

  // Account number suffix (only for bank accounts denominated in NZD) - see
  // [local details](#local-bank-details-new-zealand) for more information.
  account_number_suffix?: string | null;

  // Bank account type. Required for USD-denominated bank accounts. Must not be
  // provided for bank accounts in other currencies. See [local
  // details](#local-bank-details-united-states) for more information.
  account_type?: BillingRequestWithActionActionsCollectBankAccountAccountType;

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

  // A unique record such as an email address, mobile number or company number,
  // that can be used to make and accept payments.
  pay_id?: string;
};

export enum BillingRequestWithActionActionsCollectBankAccountAccountType {
  Savings = 'savings',
  Checking = 'checking',
}

/** Type for a billingrequestwithactionactionscollectcustomerdetails resource. */
export type BillingRequestWithActionActionsCollectCustomerDetails = {
  //
  customer?: BillingRequestWithActionActionsCollectCustomerDetailsCustomer;

  //
  customer_billing_detail?: BillingRequestWithActionActionsCollectCustomerDetailsCustomerBillingDetail;
};

/** Type for a billingrequestwithactionactionscollectcustomerdetailscustomer resource. */
export type BillingRequestWithActionActionsCollectCustomerDetailsCustomer = {
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

  //  [ISO 639-1](http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) code.
  // Used as the language for notification emails sent by GoCardless if your
  // organisation does not send its own (see [compliance
  // requirements](#appendix-compliance-requirements)). Currently only "en",
  // "fr", "de", "pt", "es", "it", "nl", "da", "nb", "sl", "sv" are supported.
  // If this is not provided and a customer was linked during billing request
  // creation, the linked customer language will be used. Otherwise, the
  // language is default to "en".
  language?: string | null;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  metadata?: JsonMap;

  // [ITU E.123](https://en.wikipedia.org/wiki/E.123) formatted phone number,
  // including country code.
  phone_number?: string | null;
};

/** Type for a billingrequestwithactionactionscollectcustomerdetailscustomerbillingdetail resource. */
export type BillingRequestWithActionActionsCollectCustomerDetailsCustomerBillingDetail = {
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
};

/** Type for a billingrequestwithactionactionsconfirmpayerdetails resource. */
export type BillingRequestWithActionActionsConfirmPayerDetails = {
  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  metadata?: JsonMap;

  // This attribute can be set to true if the payer has indicated that multiple
  // signatures are required for the mandate. As long as every other Billing
  // Request actions have been completed, the payer will receive an email
  // notification containing instructions on how to complete the additional
  // signature. The dual signature flow can only be completed using GoCardless
  // branded pages.
  payer_requested_dual_signature?: boolean;
};

/** Type for a billingrequestwithactionactionsselectinstitution resource. */
export type BillingRequestWithActionActionsSelectInstitution = {
  // [ISO
  // 3166-1](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
  // alpha-2 code. The country code of the institution. If nothing is provided,
  // institutions with the country code 'GB' are returned by default.
  country_code: string;

  // The unique identifier for this institution
  institution: string;
};

/** Type for a billingrequestwithactioncreatewithactionsrequestlinks resource. */
export type BillingRequestWithActionCreateWithActionsRequestLinks = {
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
};

/** Type for a billingrequestwithactionmandaterequest resource. */
export type BillingRequestWithActionMandateRequest = {
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
  authorisation_source?: BillingRequestWithActionMandateRequestAuthorisationSource;

  // Constraints that will apply to the mandate_request. (Optional) Specifically
  // required for PayTo and VRP.
  constraints?: BillingRequestWithActionMandateRequestConstraints | null;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency
  // code.
  currency?: string;

  // A human-readable description of the payment and/or mandate. This will be
  // displayed to the payer when authorising the billing request.
  //
  description?: string | null;

  // This field will decide how GoCardless handles settlement of funds from the
  // customer.
  //
  // - `managed` will be moved through GoCardless' account, batched, and payed
  // out.
  // - `direct` will be a direct transfer from the payer's account to the
  // merchant where
  //   invoicing will be handled separately.
  //
  funds_settlement?: BillingRequestWithActionMandateRequestFundsSettlement;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  metadata?: JsonMap;

  // Unique reference. Different schemes have different length and [character
  // set](#appendix-character-sets) requirements. GoCardless will generate a
  // unique reference satisfying the different scheme requirements if this field
  // is left blank.
  reference?: string | null;

  // A bank payment scheme. Currently "ach", "autogiro", "bacs", "becs",
  // "becs_nz", "betalingsservice", "faster_payments", "pad", "pay_to" and
  // "sepa_core" are supported. Optional for mandate only requests - if left
  // blank, the payer will be able to select the currency/scheme to pay with
  // from a list of your available schemes.
  scheme?: string | null;

  // If true, this billing request would be used to set up a mandate solely for
  // moving (or sweeping) money from one account owned by the payer to another
  // account that the payer also owns. This is required for Faster Payments
  sweeping?: boolean;

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
  verify?: BillingRequestWithActionMandateRequestVerify;
};

export enum BillingRequestWithActionMandateRequestAuthorisationSource {
  Web = 'web',
  Telephone = 'telephone',
  Paper = 'paper',
}

/** Type for a billingrequestwithactionmandaterequestconstraints resource. */
export type BillingRequestWithActionMandateRequestConstraints = {
  // The latest date at which payments can be taken, must occur after start_date
  // if present
  //
  // This is an optional field and if it is not supplied the agreement will be
  // considered open and
  // will not have an end date. Keep in mind the end date must take into account
  // how long it will
  // take the user to set up this agreement via the Billing Request.
  //
  end_date?: string;

  // The maximum amount that can be charged for a single payment. Required for
  // PayTo and VRP.
  max_amount_per_payment?: number;

  // A constraint where you can specify info (free text string) about how
  // payments are calculated. _Note:_ This is only supported for ACH and PAD
  // schemes.
  //
  payment_method?: string;

  // List of periodic limits and constraints which apply to them
  periodic_limits?: BillingRequestWithActionMandateRequestConstraintsPeriodicLimit[];

  // The date from which payments can be taken.
  //
  // This is an optional field and if it is not supplied the start date will be
  // set to the day
  // authorisation happens.
  //
  start_date?: string;
};

/** Type for a billingrequestwithactionmandaterequestconstraintsperiodiclimit resource. */
export type BillingRequestWithActionMandateRequestConstraintsPeriodicLimit = {
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
  alignment?: BillingRequestWithActionMandateRequestConstraintsPeriodicLimitAlignment;

  // (Optional) The maximum number of payments that can be collected in this
  // periodic limit.
  max_payments?: number;

  // The maximum total amount that can be charged for all payments in this
  // periodic limit.
  // Required for VRP.
  //
  max_total_amount?: number;

  // The repeating period for this mandate. Defaults to flexible for PayTo if
  // not specified.
  period?: BillingRequestWithActionMandateRequestConstraintsPeriodicLimitPeriod;
};

export enum BillingRequestWithActionMandateRequestConstraintsPeriodicLimitAlignment {
  Calendar = 'calendar',
  CreationDate = 'creation_date',
}

export enum BillingRequestWithActionMandateRequestConstraintsPeriodicLimitPeriod {
  Day = 'day',
  Week = 'week',
  Month = 'month',
  Year = 'year',
  Flexible = 'flexible',
}

export enum BillingRequestWithActionMandateRequestFundsSettlement {
  Managed = 'managed',
  Direct = 'direct',
}

export enum BillingRequestWithActionMandateRequestVerify {
  Minimum = 'minimum',
  Recommended = 'recommended',
  WhenAvailable = 'when_available',
  Always = 'always',
}

export enum BillingRequestWithActionPaymentContextCode {
  BillingGoodsAndServicesInAdvance = 'billing_goods_and_services_in_advance',
  BillingGoodsAndServicesInArrears = 'billing_goods_and_services_in_arrears',
  FaceToFacePointOfSale = 'face_to_face_point_of_sale',
  EcommerceMerchantInitiatedPayment = 'ecommerce_merchant_initiated_payment',
  TransferToSelf = 'transfer_to_self',
  TransferToThirdParty = 'transfer_to_third_party',
}

/** Type for a billingrequestwithactionpaymentrequest resource. */
export type BillingRequestWithActionPaymentRequest = {
  // Amount in minor unit (e.g. pence in GBP, cents in EUR).
  amount?: string;

  // The amount to be deducted from the payment as an app fee, to be paid to the
  // partner integration which created the billing request, in the lowest
  // denomination for the currency (e.g. pence in GBP, cents in EUR).
  app_fee?: string | null;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency
  // code. `GBP` and `EUR` supported; `GBP` with your customers in the UK and
  // for `EUR` with your customers in supported Eurozone countries only.
  currency?: string;

  // A human-readable description of the payment and/or mandate. This will be
  // displayed to the payer when authorising the billing request.
  //
  description?: string | null;

  // This field will decide how GoCardless handles settlement of funds from the
  // customer.
  //
  // - `managed` will be moved through GoCardless' account, batched, and payed
  // out.
  // - `direct` will be a direct transfer from the payer's account to the
  // merchant where
  //   invoicing will be handled separately.
  //
  funds_settlement?: BillingRequestWithActionPaymentRequestFundsSettlement;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  metadata?: JsonMap;

  // A custom payment reference defined by the merchant. It is only available
  // for payments on the PayTo scheme or payments using the Direct Funds
  // settlement model on the Faster Payments scheme.
  //
  reference?: string | null;

  // On failure, automatically retry payments using [intelligent
  // retries](/success-plus/overview). Default is `false`. <p
  // class="notice"><strong>Important</strong>: To be able to use intelligent
  // retries, Success+ needs to be enabled in [GoCardless
  // dashboard](https://manage.gocardless.com/success-plus). </p> <p
  // class="notice"><strong>Important</strong>: This is not applicable to IBP
  // and VRP payments. </p>
  retry_if_possible?: boolean;

  // (Optional) A scheme used for Open Banking payments. Currently
  // `faster_payments` is supported in the UK (GBP) and `sepa_credit_transfer`
  // and `sepa_instant_credit_transfer` are supported in supported Eurozone
  // countries (EUR). For Eurozone countries, `sepa_credit_transfer` is used as
  // the default. Please be aware that `sepa_instant_credit_transfer` may incur
  // an additional fee for your customer.
  scheme?: string | null;
};

export enum BillingRequestWithActionPaymentRequestFundsSettlement {
  Managed = 'managed',
  Direct = 'direct',
}

export enum BillingRequestWithActionPurposeCode {
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
  BonusPayment = 'bonus_payment',
  CashManagementTransfer = 'cash_management_transfer',
  CardBulkClearing = 'card_bulk_clearing',
  CreditCardPayment = 'credit_card_payment',
  TradeSettlementPayment = 'trade_settlement_payment',
  DebitCardPayment = 'debit_card_payment',
  Dividend = 'dividend',
  DeliverAgainstPayment = 'deliver_against_payment',
  Epayment = 'epayment',
  FeeCollectionAndInterest = 'fee_collection_and_interest',
  FeeCollection = 'fee_collection',
  PersonToPersonPayment = 'person_to_person_payment',
  GovernmentPayment = 'government_payment',
  HedgingTransaction = 'hedging_transaction',
  IrrevocableCreditCardPayment = 'irrevocable_credit_card_payment',
  IrrevocableDebitCardPayment = 'irrevocable_debit_card_payment',
  IntraCompanyPayment = 'intra_company_payment',
  Interest = 'interest',
  LockboxTransactions = 'lockbox_transactions',
  Commercial = 'commercial',
  Consumer = 'consumer',
  OtherPayment = 'other_payment',
  PensionPayment = 'pension_payment',
  Represented = 'represented',
  ReimbursementReceivedCreditTransfer = 'reimbursement_received_credit_transfer',
  ReceiveAgainstPayment = 'receive_against_payment',
  SalaryPayment = 'salary_payment',
  Securities = 'securities',
  SocialSecurityBenefit = 'social_security_benefit',
  SupplierPayment = 'supplier_payment',
  TaxPayment = 'tax_payment',
  Trade = 'trade',
  TreasuryPayment = 'treasury_payment',
  ValueAddedTaxPayment = 'value_added_tax_payment',
  WithHolding = 'with_holding',
  CashManagementSweepAccount = 'cash_management_sweep_account',
  CashManagementTopAccount = 'cash_management_top_account',
  CashManagementZeroBalanceAccount = 'cash_management_zero_balance_account',
  CrossborderMiPayments = 'crossborder_mi_payments',
  ForeignCurrencyDomesticTransfer = 'foreign_currency_domestic_transfer',
  CashInPreCredit = 'cash_in_pre_credit',
  CashOutNotesCoins = 'cash_out_notes_coins',
  CarrierGuardedWholesaleValuables = 'carrier_guarded_wholesale_valuables',
}

/** Type for a billingrequestwithactionbankauthorisations resource. */
export type BillingRequestWithActionBankAuthorisations = {
  // Type of authorisation, can be either 'mandate' or 'payment'.
  authorisation_type?: BillingRequestWithActionBankAuthorisationsAuthorisationType;

  // Fixed [timestamp](#api-usage-dates-and-times), recording when the user has
  // been authorised.
  authorised_at?: string | null;

  // Timestamp when the flow was created
  created_at?: string;

  // Timestamp when the url will expire. Each authorisation url currently lasts
  // for 15 minutes, but this can vary by bank.
  expires_at?: string;

  // Unique identifier, beginning with "BAU".
  id: string;

  // Fixed [timestamp](#api-usage-dates-and-times), recording when the
  // authorisation URL has been visited.
  last_visited_at?: string | null;

  // Resources linked to this BillingRequestWithActionBankAuthorisations.
  links?: BillingRequestWithActionBankAuthorisationsLinks;

  // URL to a QR code PNG image of the bank authorisation url.
  // This QR code can be used as an alternative to providing the `url` to the
  // payer to allow them to authorise with their mobile devices.
  qr_code_url?: string | null;

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
  // Please note: bank authorisations can still fail despite an
  // `outcome=success` on the `redirect_uri`. It is therefore recommended to
  // wait for the relevant bank authorisation event, such as
  // [`BANK_AUTHORISATION_AUTHORISED`](#billing-request-bankauthorisationauthorised),
  // [`BANK_AUTHORISATION_DENIED`](#billing-request-bankauthorisationdenied), or
  // [`BANK_AUTHORISATION_FAILED`](#billing-request-bankauthorisationfailed) in
  // order to show the correct outcome to the user.
  //
  // The BillingRequestFlow ID will also be appended to the `redirect_uri` as
  // query parameter `id=BRF123`.
  //
  // Defaults to `https://pay.gocardless.com/billing/static/thankyou`.
  redirect_uri?: string;

  // URL for an oauth flow that will allow the user to authorise the payment
  url?: string;
};

/** Type for a billingrequestwithactionbankauthorisationscreaterequestlinks resource. */
export type BillingRequestWithActionBankAuthorisationsCreateRequestLinks = {
  // ID of the [billing request](#billing-requests-billing-requests) against
  // which this authorisation was created.
  billing_request?: string;
};

export enum BillingRequestWithActionBankAuthorisationsAuthorisationType {
  Mandate = 'mandate',
  Payment = 'payment',
}

/** Type for a billingrequestwithactionbankauthorisationslinks resource. */
export type BillingRequestWithActionBankAuthorisationsLinks = {
  // ID of the [billing request](#billing-requests-billing-requests) against
  // which this authorisation was created.
  billing_request?: string;

  // ID of the [institution](#billing-requests-institutions) against which this
  // authorisation was created.
  institution?: string;
};

/** Type for a billingrequestwithactionbillingrequests resource. */
export type BillingRequestWithActionBillingRequests = {
  // List of actions that can be performed before this billing request can be
  // fulfilled.
  actions?: BillingRequestWithActionBillingRequestsAction[];

  // Fixed [timestamp](#api-usage-dates-and-times), recording when this resource
  // was created.
  created_at?: string;

  // (Optional) If true, this billing request can fallback from instant payment
  // to direct debit.
  // Should not be set if GoCardless payment intelligence feature is used.
  //
  // See [Billing Requests: Retain customers with
  // Fallbacks](https://developer.gocardless.com/billing-requests/retain-customers-with-fallbacks/)
  // for more information.
  fallback_enabled?: boolean;

  // True if the billing request was completed with direct debit.
  fallback_occurred?: boolean;

  // Unique identifier, beginning with "BRQ".
  id: string;

  // Request for an instalment schedule. Has to contain either
  // `instalments_with_schedule` object or an array of `instalments_with_dates`
  // objects
  instalment_schedule_request?: BillingRequestWithActionBillingRequestsInstalmentScheduleRequest | null;

  // Resources linked to this BillingRequestWithActionBillingRequests.
  links?: BillingRequestWithActionBillingRequestsLinks;

  // Request for a mandate
  mandate_request?: BillingRequestWithActionBillingRequestsMandateRequest;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  metadata?: JsonMap;

  // Specifies the context or scenario in which the payment is being made.
  // Defines whether the payment is for advance/arrears billing, point of sale
  // transactions, ecommerce, or account transfers. This helps banks and payment
  // processors understand the payment scenario and apply appropriate processing
  // rules and risk controls.
  payment_context_code?: BillingRequestWithActionBillingRequestsPaymentContextCode;

  // Specifies the underlying purpose of the payment. Defines the specific
  // reason or type of service/goods the payment relates to, improving
  // straight-through processing and compliance.
  // See [VRP Commercial Payment Purpose
  // Codes](https://developer.gocardless.com/vrp-commercial-payment-purpose-codes/)
  // for the complete list of valid codes.
  payment_purpose_code?: string;

  // Request for a one-off strongly authorised payment
  payment_request?: BillingRequestWithActionBillingRequestsPaymentRequest;

  // Specifies the high-level purpose/category of a mandate and/or payment using
  // a set of pre-defined categories. Provides context on the nature and reason
  // for the payment to facilitate processing and compliance.
  // See [Billing Request Purpose
  // Codes](https://developer.gocardless.com/billing-request-purpose-codes/) for
  // the complete list of valid codes.
  purpose_code?: BillingRequestWithActionBillingRequestsPurposeCode;

  //
  resources?: BillingRequestWithActionBillingRequestsResources;

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
  status?: BillingRequestWithActionBillingRequestsStatus;

  // Request for a subscription
  subscription_request?: BillingRequestWithActionBillingRequestsSubscriptionRequest | null;
};

/** Type for a billingrequestwithactionbillingrequestscreaterequestlinks resource. */
export type BillingRequestWithActionBillingRequestsCreateRequestLinks = {
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
};

export enum BillingRequestWithActionBillingRequestsPaymentContextCode {
  BillingGoodsAndServicesInAdvance = 'billing_goods_and_services_in_advance',
  BillingGoodsAndServicesInArrears = 'billing_goods_and_services_in_arrears',
  FaceToFacePointOfSale = 'face_to_face_point_of_sale',
  EcommerceMerchantInitiatedPayment = 'ecommerce_merchant_initiated_payment',
  TransferToSelf = 'transfer_to_self',
  TransferToThirdParty = 'transfer_to_third_party',
}

export enum BillingRequestWithActionBillingRequestsPurposeCode {
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
  BonusPayment = 'bonus_payment',
  CashManagementTransfer = 'cash_management_transfer',
  CardBulkClearing = 'card_bulk_clearing',
  CreditCardPayment = 'credit_card_payment',
  TradeSettlementPayment = 'trade_settlement_payment',
  DebitCardPayment = 'debit_card_payment',
  Dividend = 'dividend',
  DeliverAgainstPayment = 'deliver_against_payment',
  Epayment = 'epayment',
  FeeCollectionAndInterest = 'fee_collection_and_interest',
  FeeCollection = 'fee_collection',
  PersonToPersonPayment = 'person_to_person_payment',
  GovernmentPayment = 'government_payment',
  HedgingTransaction = 'hedging_transaction',
  IrrevocableCreditCardPayment = 'irrevocable_credit_card_payment',
  IrrevocableDebitCardPayment = 'irrevocable_debit_card_payment',
  IntraCompanyPayment = 'intra_company_payment',
  Interest = 'interest',
  LockboxTransactions = 'lockbox_transactions',
  Commercial = 'commercial',
  Consumer = 'consumer',
  OtherPayment = 'other_payment',
  PensionPayment = 'pension_payment',
  Represented = 'represented',
  ReimbursementReceivedCreditTransfer = 'reimbursement_received_credit_transfer',
  ReceiveAgainstPayment = 'receive_against_payment',
  SalaryPayment = 'salary_payment',
  Securities = 'securities',
  SocialSecurityBenefit = 'social_security_benefit',
  SupplierPayment = 'supplier_payment',
  TaxPayment = 'tax_payment',
  Trade = 'trade',
  TreasuryPayment = 'treasury_payment',
  ValueAddedTaxPayment = 'value_added_tax_payment',
  WithHolding = 'with_holding',
  CashManagementSweepAccount = 'cash_management_sweep_account',
  CashManagementTopAccount = 'cash_management_top_account',
  CashManagementZeroBalanceAccount = 'cash_management_zero_balance_account',
  CrossborderMiPayments = 'crossborder_mi_payments',
  ForeignCurrencyDomesticTransfer = 'foreign_currency_domestic_transfer',
  CashInPreCredit = 'cash_in_pre_credit',
  CashOutNotesCoins = 'cash_out_notes_coins',
  CarrierGuardedWholesaleValuables = 'carrier_guarded_wholesale_valuables',
}

/** Type for a billingrequestwithactionbillingrequestscustomer resource. */
export type BillingRequestWithActionBillingRequestsCustomer = {
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

  //  [ISO 639-1](http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) code.
  // Used as the language for notification emails sent by GoCardless if your
  // organisation does not send its own (see [compliance
  // requirements](#appendix-compliance-requirements)). Currently only "en",
  // "fr", "de", "pt", "es", "it", "nl", "da", "nb", "sl", "sv" are supported.
  // If this is not provided and a customer was linked during billing request
  // creation, the linked customer language will be used. Otherwise, the
  // language is default to "en".
  language?: string | null;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  metadata?: JsonMap;

  // [ITU E.123](https://en.wikipedia.org/wiki/E.123) formatted phone number,
  // including country code.
  phone_number?: string | null;
};

/** Type for a billingrequestwithactionbillingrequestscustomerbillingdetail resource. */
export type BillingRequestWithActionBillingRequestsCustomerBillingDetail = {
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
};

export enum BillingRequestWithActionBillingRequestsAccountType {
  Savings = 'savings',
  Checking = 'checking',
}

export enum BillingRequestWithActionBillingRequestsStatus {
  Pending = 'pending',
  ReadyToFulfil = 'ready_to_fulfil',
  Fulfilling = 'fulfilling',
  Fulfilled = 'fulfilled',
  Cancelled = 'cancelled',
}

export enum BillingRequestWithActionBillingRequestsNotificationType {
  Email = 'email',
}

/** Type for a billingrequestwithactionbillingrequestsaction resource. */
export type BillingRequestWithActionBillingRequestsAction = {
  // List of currencies the current mandate supports
  available_currencies?: string[];

  // Describes the behaviour of bank authorisations, for the bank_authorisation
  // action
  bank_authorisation?: BillingRequestWithActionBillingRequestsActionBankAuthorisation;

  // Additional parameters to help complete the collect_customer_details action
  collect_customer_details?: BillingRequestWithActionBillingRequestsActionCollectCustomerDetails;

  // Which other action types this action can complete.
  completes_actions?: string[];

  // Describes whether we inferred the institution from the provided bank
  // account details. One of:
  // - `not_needed`: we won't attempt to infer the institution as it is not
  // needed. Either because it was manually selected or the billing request does
  // not support this feature
  // - `pending`: we are waiting on the bank details in order to infer the
  // institution
  // - `failed`: we weren't able to infer the institution
  // - `success`: we inferred the institution and added it to the resources of a
  // Billing Request
  //
  institution_guess_status?: BillingRequestWithActionBillingRequestsActionInstitutionGuessStatus;

  // Informs you whether the action is required to fulfil the billing request or
  // not.
  required?: boolean;

  // Requires completing these actions before this action can be completed.
  requires_actions?: string[];

  // Status of the action
  status?: BillingRequestWithActionBillingRequestsActionStatus;

  // Unique identifier for the action.
  type?: BillingRequestWithActionBillingRequestsActionType;
};

/** Type for a billingrequestwithactionbillingrequestsactionbankauthorisation resource. */
export type BillingRequestWithActionBillingRequestsActionBankAuthorisation = {
  // Which authorisation adapter will be used to power these authorisations
  // (GoCardless internal use only)
  adapter?: BillingRequestWithActionBillingRequestsActionBankAuthorisationAdapter;

  // What type of bank authorisations are supported on this billing request
  authorisation_type?: BillingRequestWithActionBillingRequestsActionBankAuthorisationAuthorisationType;
};

export enum BillingRequestWithActionBillingRequestsActionBankAuthorisationAdapter {
  OpenBankingGatewayPis = 'open_banking_gateway_pis',
  PlaidAis = 'plaid_ais',
  OpenBankingGatewayAis = 'open_banking_gateway_ais',
  BankidAis = 'bankid_ais',
  BankPayRecurring = 'bank_pay_recurring',
}

export enum BillingRequestWithActionBillingRequestsActionBankAuthorisationAuthorisationType {
  Payment = 'payment',
  Mandate = 'mandate',
}

/** Type for a billingrequestwithactionbillingrequestsactioncollectcustomerdetails resource. */
export type BillingRequestWithActionBillingRequestsActionCollectCustomerDetails = {
  // Default customer country code, as determined by scheme and payer location
  default_country_code?: string;

  //
  incomplete_fields?: BillingRequestWithActionBillingRequestsActionCollectCustomerDetailsIncompleteFields;
};

/** Type for a billingrequestwithactionbillingrequestsactioncollectcustomerdetailsincompletefields resource. */
export type BillingRequestWithActionBillingRequestsActionCollectCustomerDetailsIncompleteFields = {
  //
  customer?: string[];

  //
  customer_billing_detail?: string[];
};

export enum BillingRequestWithActionBillingRequestsActionInstitutionGuessStatus {
  NotNeeded = 'not_needed',
  Pending = 'pending',
  Failed = 'failed',
  Success = 'success',
}

export enum BillingRequestWithActionBillingRequestsActionStatus {
  Pending = 'pending',
  Completed = 'completed',
}

export enum BillingRequestWithActionBillingRequestsActionType {
  ChooseCurrency = 'choose_currency',
  CollectAmount = 'collect_amount',
  CollectCustomerDetails = 'collect_customer_details',
  CollectBankAccount = 'collect_bank_account',
  BankAuthorisation = 'bank_authorisation',
  ConfirmPayerDetails = 'confirm_payer_details',
  SelectInstitution = 'select_institution',
}

/** Type for a billingrequestwithactionbillingrequestsinstalmentschedulerequest resource. */
export type BillingRequestWithActionBillingRequestsInstalmentScheduleRequest = {
  // The amount to be deducted from each payment as an app fee, to be paid to
  // the partner integration which created the subscription, in the lowest
  // denomination for the currency (e.g. pence in GBP, cents in EUR).
  app_fee?: string | null;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency
  // code. Currently "USD" and "CAD" are supported.
  currency?: string;

  // An explicit array of instalment payments, each specifying at least an
  // `amount` and `charge_date`. See [create (with
  // dates)](#instalment-schedules-create-with-dates)
  instalments_with_dates?: BillingRequestWithActionBillingRequestsInstalmentScheduleRequestInstalmentsWithDate[] | null;

  // Frequency of the payments you want to create, together with an array of
  // payment
  // amounts to be collected, with a specified start date for the first payment.
  // See [create (with schedule)](#instalment-schedules-create-with-schedule)
  //
  instalments_with_schedule?: BillingRequestWithActionBillingRequestsInstalmentScheduleRequestInstalmentsWithSchedule | null;

  // Resources linked to this BillingRequestWithActionBillingRequestsInstalmentScheduleRequest.
  links?: BillingRequestWithActionBillingRequestsInstalmentScheduleRequestLinks;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  metadata?: JsonMap;

  // Name of the instalment schedule, up to 100 chars. This name will also be
  // copied to the payments of the instalment schedule if you use schedule-based
  // creation.
  name?: string;

  // An optional payment reference. This will be set as the reference on each
  // payment
  // created and will appear on your customer's bank statement. See the
  // documentation for
  // the [create payment endpoint](#payments-create-a-payment) for more details.
  // <br />
  payment_reference?: string | null;

  // On failure, automatically retry payments using [intelligent
  // retries](/success-plus/overview). Default is `false`. <p
  // class="notice"><strong>Important</strong>: To be able to use intelligent
  // retries, Success+ needs to be enabled in [GoCardless
  // dashboard](https://manage.gocardless.com/success-plus). </p>
  retry_if_possible?: boolean;

  // The total amount of the instalment schedule, defined as the sum of all
  // individual
  // payments, in the lowest denomination for the currency (e.g. pence in GBP,
  // cents in
  // EUR). If the requested payment amounts do not sum up correctly, a
  // validation error
  // will be returned.
  total_amount?: string;
};

/** Type for a billingrequestwithactionbillingrequestsinstalmentschedulerequestinstalmentswithdate resource. */
export type BillingRequestWithActionBillingRequestsInstalmentScheduleRequestInstalmentsWithDate = {
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
};

/** Type for a billingrequestwithactionbillingrequestsinstalmentschedulerequestinstalmentswithschedule resource. */
export type BillingRequestWithActionBillingRequestsInstalmentScheduleRequestInstalmentsWithSchedule = {
  // List of amounts of each instalment, in the lowest denomination for the
  // currency (e.g. cents in USD).
  //
  amounts: string[];

  // Number of `interval_units` between charge dates. Must be greater than or
  // equal to `1`.
  //
  interval: number;

  // The unit of time between customer charge dates. One of `weekly`, `monthly`
  // or `yearly`.
  interval_unit: BillingRequestWithActionBillingRequestsInstalmentScheduleRequestInstalmentsWithScheduleIntervalUnit;

  // The date on which the first payment should be charged. Must be on or after
  // the [mandate](#core-endpoints-mandates)'s `next_possible_charge_date`. When
  // left blank and `month` or `day_of_month` are provided, this will be set to
  // the date of the first payment. If created without `month` or `day_of_month`
  // this will be set as the mandate's `next_possible_charge_date`
  start_date?: string | null;
};

export enum BillingRequestWithActionBillingRequestsInstalmentScheduleRequestInstalmentsWithScheduleIntervalUnit {
  Weekly = 'weekly',
  Monthly = 'monthly',
  Yearly = 'yearly',
}

/** Type for a billingrequestwithactionbillingrequestsinstalmentschedulerequestlinks resource. */
export type BillingRequestWithActionBillingRequestsInstalmentScheduleRequestLinks = {
  // (Optional) ID of the
  // [instalment_schedule](#core-endpoints-instalment-schedules) that was
  // created from this instalment schedule request.
  //
  instalment_schedule?: string;
};

/** Type for a billingrequestwithactionbillingrequestslinks resource. */
export type BillingRequestWithActionBillingRequestsLinks = {
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

  // (Optional) ID of the associated instalment schedule request
  instalment_schedule_request?: string;

  // (Optional) ID of the
  // [instalment_schedule](#core-endpoints-instalment-schedules) that was
  // created from this instalment schedule request.
  instalment_schedule_request_instalment_schedule?: string;

  // (Optional) ID of the associated mandate request
  mandate_request?: string;

  // (Optional) ID of the [mandate](#core-endpoints-mandates) that was created
  // from this mandate request. this mandate request.
  mandate_request_mandate?: string;

  // ID of the associated organisation.
  organisation?: string;

  // (Optional) ID of the associated payment provider
  payment_provider?: string;

  // (Optional) ID of the associated payment request
  payment_request?: string;

  // (Optional) ID of the [payment](#core-endpoints-payments) that was created
  // from this payment request.
  payment_request_payment?: string;

  // (Optional) ID of the associated subscription request
  subscription_request?: string;

  // (Optional) ID of the [subscription](#core-endpoints-subscriptions) that was
  // created from this subscription request.
  subscription_request_subscription?: string;
};

/** Type for a billingrequestwithactionbillingrequestsmandaterequest resource. */
export type BillingRequestWithActionBillingRequestsMandateRequest = {
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
  authorisation_source?: BillingRequestWithActionBillingRequestsMandateRequestAuthorisationSource;

  // This attribute represents the authorisation type between the payer and
  // merchant. It can be set to `one_off`,
  // `recurring` or `standing` for ACH scheme. And `single`, `recurring` and
  // `sporadic` for PAD scheme. _Note:_ This is only supported for ACH and PAD
  // schemes.
  //
  consent_type?: string | null;

  // Constraints that will apply to the mandate_request. (Optional) Specifically
  // required for PayTo and VRP.
  constraints?: BillingRequestWithActionBillingRequestsMandateRequestConstraints | null;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency
  // code.
  currency?: string;

  // A human-readable description of the payment and/or mandate. This will be
  // displayed to the payer when authorising the billing request.
  //
  description?: string | null;

  // This field will decide how GoCardless handles settlement of funds from the
  // customer.
  //
  // - `managed` will be moved through GoCardless' account, batched, and payed
  // out.
  // - `direct` will be a direct transfer from the payer's account to the
  // merchant where
  //   invoicing will be handled separately.
  //
  funds_settlement?: BillingRequestWithActionBillingRequestsMandateRequestFundsSettlement;

  // Resources linked to this BillingRequestWithActionBillingRequestsMandateRequest.
  links?: BillingRequestWithActionBillingRequestsMandateRequestLinks;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  metadata?: JsonMap;

  // This attribute can be set to true if the payer has indicated that multiple
  // signatures are required for the mandate. As long as every other Billing
  // Request actions have been completed, the payer will receive an email
  // notification containing instructions on how to complete the additional
  // signature. The dual signature flow can only be completed using GoCardless
  // branded pages.
  payer_requested_dual_signature?: boolean;

  // A bank payment scheme. Currently "ach", "autogiro", "bacs", "becs",
  // "becs_nz", "betalingsservice", "faster_payments", "pad", "pay_to" and
  // "sepa_core" are supported. Optional for mandate only requests - if left
  // blank, the payer will be able to select the currency/scheme to pay with
  // from a list of your available schemes.
  scheme?: string | null;

  // If true, this billing request would be used to set up a mandate solely for
  // moving (or sweeping) money from one account owned by the payer to another
  // account that the payer also owns. This is required for Faster Payments
  sweeping?: boolean;

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
  verify?: BillingRequestWithActionBillingRequestsMandateRequestVerify;
};

export enum BillingRequestWithActionBillingRequestsMandateRequestAuthorisationSource {
  Web = 'web',
  Telephone = 'telephone',
  Paper = 'paper',
}

/** Type for a billingrequestwithactionbillingrequestsmandaterequestconstraints resource. */
export type BillingRequestWithActionBillingRequestsMandateRequestConstraints = {
  // The latest date at which payments can be taken, must occur after start_date
  // if present
  //
  // This is an optional field and if it is not supplied the agreement will be
  // considered open and
  // will not have an end date. Keep in mind the end date must take into account
  // how long it will
  // take the user to set up this agreement via the Billing Request.
  //
  end_date?: string;

  // The maximum amount that can be charged for a single payment. Required for
  // PayTo and VRP.
  max_amount_per_payment?: number;

  // A constraint where you can specify info (free text string) about how
  // payments are calculated. _Note:_ This is only supported for ACH and PAD
  // schemes.
  //
  payment_method?: string;

  // List of periodic limits and constraints which apply to them
  periodic_limits?: BillingRequestWithActionBillingRequestsMandateRequestConstraintsPeriodicLimit[];

  // The date from which payments can be taken.
  //
  // This is an optional field and if it is not supplied the start date will be
  // set to the day
  // authorisation happens.
  //
  start_date?: string;
};

/** Type for a billingrequestwithactionbillingrequestsmandaterequestconstraintsperiodiclimit resource. */
export type BillingRequestWithActionBillingRequestsMandateRequestConstraintsPeriodicLimit = {
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
  alignment?: BillingRequestWithActionBillingRequestsMandateRequestConstraintsPeriodicLimitAlignment;

  // (Optional) The maximum number of payments that can be collected in this
  // periodic limit.
  max_payments?: number;

  // The maximum total amount that can be charged for all payments in this
  // periodic limit.
  // Required for VRP.
  //
  max_total_amount?: number;

  // The repeating period for this mandate. Defaults to flexible for PayTo if
  // not specified.
  period?: BillingRequestWithActionBillingRequestsMandateRequestConstraintsPeriodicLimitPeriod;
};

export enum BillingRequestWithActionBillingRequestsMandateRequestConstraintsPeriodicLimitAlignment {
  Calendar = 'calendar',
  CreationDate = 'creation_date',
}

export enum BillingRequestWithActionBillingRequestsMandateRequestConstraintsPeriodicLimitPeriod {
  Day = 'day',
  Week = 'week',
  Month = 'month',
  Year = 'year',
  Flexible = 'flexible',
}

export enum BillingRequestWithActionBillingRequestsMandateRequestFundsSettlement {
  Managed = 'managed',
  Direct = 'direct',
}

/** Type for a billingrequestwithactionbillingrequestsmandaterequestlinks resource. */
export type BillingRequestWithActionBillingRequestsMandateRequestLinks = {
  // (Optional) ID of the [mandate](#core-endpoints-mandates) that was created
  // from this mandate request. this mandate request.
  //
  mandate?: string;
};

export enum BillingRequestWithActionBillingRequestsMandateRequestVerify {
  Minimum = 'minimum',
  Recommended = 'recommended',
  WhenAvailable = 'when_available',
  Always = 'always',
}

/** Type for a billingrequestwithactionbillingrequestspaymentrequest resource. */
export type BillingRequestWithActionBillingRequestsPaymentRequest = {
  // Amount in minor unit (e.g. pence in GBP, cents in EUR).
  amount?: string;

  // The amount to be deducted from the payment as an app fee, to be paid to the
  // partner integration which created the billing request, in the lowest
  // denomination for the currency (e.g. pence in GBP, cents in EUR).
  app_fee?: string | null;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency
  // code. `GBP` and `EUR` supported; `GBP` with your customers in the UK and
  // for `EUR` with your customers in supported Eurozone countries only.
  currency?: string;

  // A human-readable description of the payment and/or mandate. This will be
  // displayed to the payer when authorising the billing request.
  //
  description?: string | null;

  // This field will decide how GoCardless handles settlement of funds from the
  // customer.
  //
  // - `managed` will be moved through GoCardless' account, batched, and payed
  // out.
  // - `direct` will be a direct transfer from the payer's account to the
  // merchant where
  //   invoicing will be handled separately.
  //
  funds_settlement?: BillingRequestWithActionBillingRequestsPaymentRequestFundsSettlement;

  // Resources linked to this BillingRequestWithActionBillingRequestsPaymentRequest.
  links?: BillingRequestWithActionBillingRequestsPaymentRequestLinks;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  metadata?: JsonMap;

  // A custom payment reference defined by the merchant. It is only available
  // for payments on the PayTo scheme or payments using the Direct Funds
  // settlement model on the Faster Payments scheme.
  //
  reference?: string | null;

  // (Optional) A scheme used for Open Banking payments. Currently
  // `faster_payments` is supported in the UK (GBP) and `sepa_credit_transfer`
  // and `sepa_instant_credit_transfer` are supported in supported Eurozone
  // countries (EUR). For Eurozone countries, `sepa_credit_transfer` is used as
  // the default. Please be aware that `sepa_instant_credit_transfer` may incur
  // an additional fee for your customer.
  scheme?: string | null;
};

export enum BillingRequestWithActionBillingRequestsPaymentRequestFundsSettlement {
  Managed = 'managed',
  Direct = 'direct',
}

/** Type for a billingrequestwithactionbillingrequestspaymentrequestlinks resource. */
export type BillingRequestWithActionBillingRequestsPaymentRequestLinks = {
  // (Optional) ID of the [payment](#core-endpoints-payments) that was created
  // from this payment request.
  payment?: string;
};

/** Type for a billingrequestwithactionbillingrequestsresources resource. */
export type BillingRequestWithActionBillingRequestsResources = {
  // Embedded customer
  customer?: BillingRequestWithActionBillingRequestsResourcesCustomer;

  // Embedded customer bank account, only if a bank account is linked
  customer_bank_account?: BillingRequestWithActionBillingRequestsResourcesCustomerBankAccount | null;

  // Embedded customer billing detail
  customer_billing_detail?: BillingRequestWithActionBillingRequestsResourcesCustomerBillingDetail;
};

/** Type for a billingrequestwithactionbillingrequestsresourcescustomer resource. */
export type BillingRequestWithActionBillingRequestsResourcesCustomer = {
  // Customer's company name. Required unless a `given_name` and `family_name`
  // are provided. For Canadian customers, the use of a `company_name` value
  // will mean that any mandate created from this customer will be considered to
  // be a "Business PAD" (otherwise, any mandate will be considered to be a
  // "Personal PAD").
  company_name?: string | null;

  // Fixed [timestamp](#api-usage-dates-and-times), recording when this resource
  // was created.
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
};

/** Type for a billingrequestwithactionbillingrequestsresourcescustomerbankaccount resource. */
export type BillingRequestWithActionBillingRequestsResourcesCustomerBankAccount = {
  // Name of the account holder, as known by the bank. The full name provided
  // when the customer is created is stored and is available via the API, but is
  // transliterated, upcased, and truncated to 18 characters in bank
  // submissions. This field is required unless the request includes a [customer
  // bank account token](#javascript-flow-customer-bank-account-tokens).
  account_holder_name?: string;

  // The last few digits of the account number. Currently 4 digits for NZD bank
  // accounts and 2 digits for other currencies.
  account_number_ending?: string;

  // Bank account type. Required for USD-denominated bank accounts. Must not be
  // provided for bank accounts in other currencies. See [local
  // details](#local-bank-details-united-states) for more information.
  account_type?: BillingRequestWithActionBillingRequestsResourcesCustomerBankAccountAccountType;

  // A token to uniquely refer to a set of bank account details. This feature is
  // still in early access and is only available for certain organisations.
  bank_account_token?: string | null;

  // Name of bank, taken from the bank details.
  bank_name?: string;

  // [ISO 3166-1 alpha-2
  // code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements).
  // Defaults to the country code of the `iban` if supplied, otherwise is
  // required.
  country_code?: string | null;

  // Fixed [timestamp](#api-usage-dates-and-times), recording when this resource
  // was created.
  created_at?: string;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency
  // code. Currently "AUD", "CAD", "DKK", "EUR", "GBP", "NZD", "SEK" and "USD"
  // are supported.
  currency?: string | null;

  // Boolean value showing whether the bank account is enabled or disabled.
  enabled?: boolean;

  // Unique identifier, beginning with "BA".
  id?: string;

  // Resources linked to this BillingRequestWithActionBillingRequestsResourcesCustomerBankAccount.
  links?: BillingRequestWithActionBillingRequestsResourcesCustomerBankAccountLinks;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  metadata?: JsonMap;
};

export enum BillingRequestWithActionBillingRequestsResourcesCustomerBankAccountAccountType {
  Savings = 'savings',
  Checking = 'checking',
}

/** Type for a billingrequestwithactionbillingrequestsresourcescustomerbankaccountlinks resource. */
export type BillingRequestWithActionBillingRequestsResourcesCustomerBankAccountLinks = {
  // ID of the [customer](#core-endpoints-customers) that owns this bank
  // account.
  customer?: string;
};

/** Type for a billingrequestwithactionbillingrequestsresourcescustomerbillingdetail resource. */
export type BillingRequestWithActionBillingRequestsResourcesCustomerBillingDetail = {
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

  // Fixed [timestamp](#api-usage-dates-and-times), recording when this resource
  // was created.
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
};

/** Type for a billingrequestwithactionbillingrequestssubscriptionrequest resource. */
export type BillingRequestWithActionBillingRequestsSubscriptionRequest = {
  // Amount in the lowest denomination for the currency (e.g. pence in GBP,
  // cents in EUR).
  amount?: string;

  // The amount to be deducted from each payment as an app fee, to be paid to
  // the partner integration which created the subscription, in the lowest
  // denomination for the currency (e.g. pence in GBP, cents in EUR).
  app_fee?: string | null;

  // The total number of payments that should be taken by this subscription.
  count?: string | null;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency
  // code. Currently "USD" and "CAD" are supported.
  currency?: string;

  // As per RFC 2445. The day of the month to charge customers on. `1`-`28` or
  // `-1` to indicate the last day of the month.
  day_of_month?: string | null;

  // Number of `interval_units` between customer charge dates. Must be greater
  // than or equal to `1`. Must result in at least one charge date per year.
  // Defaults to `1`.
  interval?: string;

  // The unit of time between customer charge dates. One of `weekly`, `monthly`
  // or `yearly`.
  interval_unit?: BillingRequestWithActionBillingRequestsSubscriptionRequestIntervalUnit;

  // Resources linked to this BillingRequestWithActionBillingRequestsSubscriptionRequest.
  links?: BillingRequestWithActionBillingRequestsSubscriptionRequestLinks;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  metadata?: JsonMap;

  // Name of the month on which to charge a customer. Must be lowercase. Only
  // applies
  // when the interval_unit is `yearly`.
  //
  month?: BillingRequestWithActionBillingRequestsSubscriptionRequestMonth;

  // Optional name for the subscription. This will be set as the description on
  // each payment created. Must not exceed 255 characters.
  name?: string | null;

  // An optional payment reference. This will be set as the reference on each
  // payment
  // created and will appear on your customer's bank statement. See the
  // documentation for
  // the [create payment endpoint](#payments-create-a-payment) for more details.
  // <br />
  payment_reference?: string | null;

  // On failure, automatically retry payments using [intelligent
  // retries](/success-plus/overview). Default is `false`. <p
  // class="notice"><strong>Important</strong>: To be able to use intelligent
  // retries, Success+ needs to be enabled in [GoCardless
  // dashboard](https://manage.gocardless.com/success-plus). </p>
  retry_if_possible?: boolean;

  // The date on which the first payment should be charged. If fulfilled after
  // this date, this will be set as the mandate's `next_possible_charge_date`.
  // When left blank and `month` or `day_of_month` are provided, this will be
  // set to the date of the first payment.
  // If created without `month` or `day_of_month` this will be set as the
  // mandate's `next_possible_charge_date`.
  //
  start_date?: string | null;
};

export enum BillingRequestWithActionBillingRequestsSubscriptionRequestIntervalUnit {
  Weekly = 'weekly',
  Monthly = 'monthly',
  Yearly = 'yearly',
}

/** Type for a billingrequestwithactionbillingrequestssubscriptionrequestlinks resource. */
export type BillingRequestWithActionBillingRequestsSubscriptionRequestLinks = {
  // (Optional) ID of the [subscription](#core-endpoints-subscriptions) that was
  // created from this subscription request.
  //
  subscription?: string;
};

export enum BillingRequestWithActionBillingRequestsSubscriptionRequestMonth {
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

/** Type for a block resource. */
export type Block = {
  // Shows if the block is active or disabled. Only active blocks will be used
  // when deciding
  // if a mandate should be blocked.
  active?: boolean | null;

  // Type of entity we will seek to match against when blocking the mandate.
  // This
  // can currently be one of 'email', 'email_domain', 'bank_account', or
  // 'bank_name'.
  block_type?: BlockBlockType;

  // Fixed [timestamp](#api-usage-dates-and-times), recording when this
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

  // Fixed [timestamp](#api-usage-dates-and-times), recording when this
  // resource was updated.
  updated_at?: string;
};

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

export enum BlockReferenceType {
  Customer = 'customer',
  Mandate = 'mandate',
}

/** Type for a creditor resource. */
export type Creditor = {
  // The first line of the creditor's address.
  address_line1?: string | null;

  // The second line of the creditor's address.
  address_line2?: string | null;

  // The third line of the creditor's address.
  address_line3?: string | null;

  // Prefix for the bank reference of payouts sent to this creditor. For
  // instance, if
  // the creditor's `bank_reference_prefix` was `ACME`, the bank reference of a
  // payout
  // sent to that creditor could be `ACME-8G7Q8`.
  //
  // This prefix is also used for refunds in EUR and GBP.
  //
  bank_reference_prefix?: string;

  // Boolean indicating whether the creditor is permitted to create refunds.
  can_create_refunds?: boolean;

  // The city of the creditor's address.
  city?: string | null;

  // [ISO 3166-1 alpha-2
  // code.](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
  country_code?: string | null;

  // Fixed [timestamp](#api-usage-dates-and-times), recording when this resource
  // was created.
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
};

export enum CreditorCreditorType {
  Company = 'company',
  Individual = 'individual',
  Charity = 'charity',
  Partnership = 'partnership',
  Trust = 'trust',
}

/** Type for a creditorupdaterequestlinks resource. */
export type CreditorUpdateRequestLinks = {
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
};

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
export type CreditorLinks = {
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
};

/** Type for a creditorschemeidentifier resource. */
export type CreditorSchemeIdentifier = {
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

  // Fixed [timestamp](#api-usage-dates-and-times), recording when this resource
  // was created.
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
};

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
export type CreditorBankAccount = {
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

  // Fixed [timestamp](#api-usage-dates-and-times), recording when this resource
  // was created.
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

  // Verification status of the Bank Account. Can be one of `pending`,
  // `in_review` or `successful`
  verification_status?: CreditorBankAccountVerificationStatus;
};

export enum CreditorBankAccountAccountType {
  Savings = 'savings',
  Checking = 'checking',
}

/** Type for a creditorbankaccountcreaterequestlinks resource. */
export type CreditorBankAccountCreateRequestLinks = {
  // ID of the [creditor](#core-endpoints-creditors) that owns this bank
  // account.
  creditor: string;
};

/** Type for a creditorbankaccountlinks resource. */
export type CreditorBankAccountLinks = {
  // ID of the [creditor](#core-endpoints-creditors) that owns this bank
  // account.
  creditor?: string;
};

export enum CreditorBankAccountVerificationStatus {
  Pending = 'pending',
  InReview = 'in_review',
  Successful = 'successful',
  CouldNotVerify = 'could_not_verify',
}

/** Type for a currencyexchangerate resource. */
export type CurrencyExchangeRate = {
  // The exchange rate from the source to target currencies provided with up to
  // 10 decimal places.
  rate?: string;

  // Source currency
  source?: string;

  // Target currency
  target?: string;

  // Time at which the rate was retrieved from the provider.
  time?: string;
};

/** Type for a customer resource. */
export type Customer = {
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

  // Fixed [timestamp](#api-usage-dates-and-times), recording when this resource
  // was created.
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
};

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
export type CustomerBankAccount = {
  // Name of the account holder, as known by the bank. The full name provided
  // when the customer is created is stored and is available via the API, but is
  // transliterated, upcased, and truncated to 18 characters in bank
  // submissions. This field is required unless the request includes a [customer
  // bank account token](#javascript-flow-customer-bank-account-tokens).
  account_holder_name?: string;

  // The last few digits of the account number. Currently 4 digits for NZD bank
  // accounts and 2 digits for other currencies.
  account_number_ending?: string;

  // Bank account type. Required for USD-denominated bank accounts. Must not be
  // provided for bank accounts in other currencies. See [local
  // details](#local-bank-details-united-states) for more information.
  account_type?: CustomerBankAccountAccountType;

  // A token to uniquely refer to a set of bank account details. This feature is
  // still in early access and is only available for certain organisations.
  bank_account_token?: string | null;

  // Name of bank, taken from the bank details.
  bank_name?: string;

  // [ISO 3166-1 alpha-2
  // code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements).
  // Defaults to the country code of the `iban` if supplied, otherwise is
  // required.
  country_code?: string | null;

  // Fixed [timestamp](#api-usage-dates-and-times), recording when this resource
  // was created.
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
};

export enum CustomerBankAccountAccountType {
  Savings = 'savings',
  Checking = 'checking',
}

/** Type for a customerbankaccountcreaterequestlinks resource. */
export type CustomerBankAccountCreateRequestLinks = {
  // ID of the [customer](#core-endpoints-customers) that owns this bank
  // account.
  customer: string;

  // ID of a [customer bank account
  // token](#javascript-flow-customer-bank-account-tokens) to use in place of
  // bank account parameters.
  customer_bank_account_token?: string;
};

/** Type for a customerbankaccountlinks resource. */
export type CustomerBankAccountLinks = {
  // ID of the [customer](#core-endpoints-customers) that owns this bank
  // account.
  customer?: string;
};

/** Type for a customernotification resource. */
export type CustomerNotification = {
  // The action that was taken on the notification. Currently this can only be
  // `handled`,
  // which means the integrator sent the notification themselves.
  //
  action_taken?: CustomerNotificationActionTaken;

  // Fixed [timestamp](#api-usage-dates-and-times), recording when this
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
};

export enum CustomerNotificationActionTaken {
  Handled = 'handled',
}

/** Type for a customernotificationlinks resource. */
export type CustomerNotificationLinks = {
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
};

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
export type Event = {
  // What has happened to the resource. See [Event Types](#event-types) for the
  // possible actions.
  action?: string;

  // Fixed [timestamp](#api-usage-dates-and-times), recording when this resource
  // was created.
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

  // The metadata that was passed when making the API request that triggered the
  // event
  // (for instance, cancelling a mandate).
  //
  // This field will only be populated if the `details[origin]` field is `api`
  // otherwise it will be an empty object.
  //
  metadata?: JsonMap;

  // The metadata of the resource that the event is for. For example, this field
  // will have the same
  // value of the `mandate[metadata]` field on the response you would receive
  // from performing a GET request on a mandate.
  //
  resource_metadata?: JsonMap;

  // The resource type for this event. One of:
  // <ul>
  // <li>`billing_requests`</li>
  // <li>`creditors`</li>
  // <li>`exports`</li>
  // <li>`instalment_schedules`</li>
  // <li>`mandates`</li>
  // <li>`payer_authorisations`</li>
  // <li>`payments`</li>
  // <li>`payouts`</li>
  // <li>`refunds`</li>
  // <li>`scheme_identifiers`</li>
  // <li>`subscriptions`</li>
  // <li>`outbound_payments`</li>
  // </ul>
  resource_type?: EventResourceType;

  // Audit information about the source of the event.
  source?: EventSource;
};

export enum EventInclude {
  BillingRequest = 'billing_request',
  Creditor = 'creditor',
  Customer = 'customer',
  InstalmentSchedule = 'instalment_schedule',
  Mandate = 'mandate',
  OutboundPayment = 'outbound_payment',
  PayerAuthorisation = 'payer_authorisation',
  Payment = 'payment',
  Payout = 'payout',
  Refund = 'refund',
  SchemeIdentifier = 'scheme_identifier',
  Subscription = 'subscription',
}

/** Type for a eventcustomernotification resource. */
export type EventCustomerNotification = {
  // Time after which GoCardless will send the notification by email.
  deadline?: string;

  // The id of the notification.
  id?: string;

  // Whether or not the notification must be sent.
  mandatory?: boolean;

  // See [here](#core-endpoints-customer-notifications) for a complete list of
  // customer notification types.
  type?: string;
};

/** Type for a eventdetails resource. */
export type EventDetails = {
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

  // Count of rows in the csv. This is sent for export events
  item_count?: number;

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
};

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
export type EventLinks = {
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

  // This is the id of the mandate request associated to this event
  mandate_request?: string;

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

  // If `resource_type` is `outbound_payments`, this is the ID of the
  // outbound_payment which has been updated.
  outbound_payment?: string;

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

  // If `resource_type` is `scheme_identifiers`, this is the ID of the
  // [scheme_identifier](#core-endpoints-scheme-identifiers) which has been
  // updated.
  scheme_identifier?: string;

  // If `resource_type` is `subscription`, this is the ID of the
  // [subscription](#core-endpoints-subscriptions) which has been updated.
  subscription?: string;
};

export enum EventResourceType {
  BillingRequests = 'billing_requests',
  Creditors = 'creditors',
  Customers = 'customers',
  Exports = 'exports',
  InstalmentSchedules = 'instalment_schedules',
  Mandates = 'mandates',
  Organisations = 'organisations',
  OutboundPayments = 'outbound_payments',
  PayerAuthorisations = 'payer_authorisations',
  Payments = 'payments',
  Payouts = 'payouts',
  Refunds = 'refunds',
  SchemeIdentifiers = 'scheme_identifiers',
  Subscriptions = 'subscriptions',
}

/** Type for a eventsource resource. */
export type EventSource = {
  // The name of the event's source.
  name?: string;

  // The type of the event's source.
  type?: EventSourceType;
};

export enum EventSourceType {
  App = 'app',
  User = 'user',
  GcTeam = 'gc_team',
  AccessToken = 'access_token',
}

/** Type for a export resource. */
export type Export = {
  // Fixed [timestamp](#api-usage-dates-and-times), recording when this resource
  // was created.
  created_at?: string;

  // The currency of the export (if applicable)
  currency?: string;

  // Download url for the export file. Subject to expiry.
  download_url?: string | null;

  // The type of the export
  export_type?: ExportExportType;

  // Unique identifier, beginning with "EX".
  id?: string;
};

export enum ExportExportType {
  PaymentsIndex = 'payments_index',
  EventsIndex = 'events_index',
  RefundsIndex = 'refunds_index',
  PayoutsIndex = 'payouts_index',
  CustomersIndex = 'customers_index',
  SubscriptionsIndex = 'subscriptions_index',
  PaymentEvents = 'payment_events',
  SubscriptionEvents = 'subscription_events',
  PayoutEvents = 'payout_events',
  RefundEvents = 'refund_events',
  MandateEvents = 'mandate_events',
  PayoutEventsBreakdown = 'payout_events_breakdown',
  PayoutEventsReconciliation = 'payout_events_reconciliation',
  PayoutTransactionsBreakdown = 'payout_transactions_breakdown',
  PayoutTransactionsReconciliation = 'payout_transactions_reconciliation',
  AuthorisationRequests = 'authorisation_requests',
  CustomerBankAccounts = 'customer_bank_accounts',
  Users = 'users',
  OrganisationAuthorisations = 'organisation_authorisations',
  GcInvalidAuthorisationRequests = 'gc_invalid_authorisation_requests',
  PartnerFees = 'partner_fees',
  PaymentsImportTemplate = 'payments_import_template',
  PaymentAccountStatement = 'payment_account_statement',
}

/** Type for a fundsavailability resource. */
export type FundsAvailability = {
  // Indicates if the amount is available
  available?: boolean;
};

/** Type for a instalmentschedule resource. */
export type InstalmentSchedule = {
  // Fixed [timestamp](#api-usage-dates-and-times), recording when this resource
  // was created.
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
};

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

/** Type for a instalmentscheduleinstalment resource. */
export type InstalmentScheduleInstalment = {
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
};

/** Type for a instalmentschedulecreatewithdatesrequestlinks resource. */
export type InstalmentScheduleCreateWithDatesRequestLinks = {
  // ID of the associated [mandate](#core-endpoints-mandates) which the
  // instalment schedule will create payments against.
  mandate: string;
};

/** Type for a instalmentscheduleinstalments resource. */
export type InstalmentScheduleInstalments = {
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
};

export enum InstalmentScheduleInstalmentsIntervalUnit {
  Weekly = 'weekly',
  Monthly = 'monthly',
  Yearly = 'yearly',
}

/** Type for a instalmentschedulecreatewithschedulerequestlinks resource. */
export type InstalmentScheduleCreateWithScheduleRequestLinks = {
  // ID of the associated [mandate](#core-endpoints-mandates) which the
  // instalment schedule will create payments against.
  mandate: string;
};

/** Type for a instalmentschedulelinks resource. */
export type InstalmentScheduleLinks = {
  // ID of the associated [customer](#core-endpoints-customers).
  customer: string;

  // ID of the associated [mandate](#core-endpoints-mandates) which the
  // instalment schedule will create payments against.
  mandate: string;

  // Array of IDs of the associated [payments](#core-endpoints-payments)
  payments?: string[];
};

export enum InstalmentScheduleStatus {
  Pending = 'pending',
  Active = 'active',
  CreationFailed = 'creation_failed',
  Completed = 'completed',
  Cancelled = 'cancelled',
  Errored = 'errored',
}

/** Type for a institution resource. */
export type Institution = {
  // Flag to show if selecting this institution in the select_institution action
  // can auto-complete the collect_bank_account action. The bank can return the
  // payer's bank account details to GoCardless.
  autocompletes_collect_bank_account?: boolean;

  // [ISO
  // 3166-1](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
  // alpha-2 code. The country code of the institution. If nothing is provided,
  // institutions with the country code 'GB' are returned by default.
  country_code?: string;

  // A URL pointing to the icon for this institution
  icon_url?: string;

  // The unique identifier for this institution
  id?: string;

  // Defines individual limits for business and personal accounts.
  limits?: InstitutionLimits | null;

  // A URL pointing to the logo for this institution
  logo_url?: string;

  // A human readable name for this institution
  name?: string;

  // The status of the institution
  status?: InstitutionStatus;
};

/** Type for a institutionbranchcode resource. */
export type InstitutionBranchCode = {};

/** Type for a institutionfeature resource. */
export type InstitutionFeature = {};

/** Type for a institutionscheme resource. */
export type InstitutionScheme = {};

/** Type for a institutionid resource. */
export type InstitutionId = {};

/** Type for a institutionlimits resource. */
export type InstitutionLimits = {
  // Daily limit details for this institution, in the lowest denomination for
  // the currency (e.g. pence in GBP, cents in EUR). The 'limits' property is
  // only available via an authenticated request with a generated access token
  daily?: JsonMap | null;

  // Single transaction limit details for this institution, in the lowest
  // denomination for the currency (e.g. pence in GBP, cents in EUR). The
  // 'limits' property is only available via an authenticated request with a
  // generated access token
  single?: JsonMap | null;
};

export enum InstitutionStatus {
  Enabled = 'enabled',
  Disabled = 'disabled',
  TemporarilyDisabled = 'temporarily_disabled',
}

/** Type for a logo resource. */
export type Logo = {
  // Unique identifier, beginning with "LO".
  id?: string;
};

/** Type for a logocreateforcreditorrequestlinks resource. */
export type LogoCreateForCreditorRequestLinks = {
  // ID of the creditor the logo belongs to
  creditor?: string;
};

/** Type for a mandate resource. */
export type Mandate = {
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

  // (Optional) Specifies the type of authorisation agreed between the payer and
  // merchant. It can be set to one-off, recurring or standing for ACH, or
  // single, recurring and sporadic for PAD.
  consent_type?: MandateConsentType | null;

  // Fixed [timestamp](#api-usage-dates-and-times), recording when this resource
  // was created.
  created_at?: string;

  // This field will decide how GoCardless handles settlement of funds from the
  // customer.
  //
  // - `managed` will be moved through GoCardless' account, batched, and payed
  // out.
  // - `direct` will be a direct transfer from the payer's account to the
  // merchant where
  //   invoicing will be handled separately.
  //
  funds_settlement?: MandateFundsSettlement;

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

  // If this is an an ACH mandate, the earliest date that can be used as a
  // `charge_date` on any newly created payment to be charged through standard
  // ACH, rather than Faster ACH. This value will change over time.
  //
  // It is only present in the API response for ACH mandates.
  next_possible_standard_ach_charge_date?: string | null;

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

  // [Timestamp](#api-usage-dates-and-times) recording when this mandate was
  // verified.
  verified_at?: string | null;
};

export enum MandateAuthorisationSource {
  Web = 'web',
  Telephone = 'telephone',
  Paper = 'paper',
}

/** Type for a mandatecreaterequestlinks resource. */
export type MandateCreateRequestLinks = {
  // ID of the associated [creditor](#core-endpoints-creditors). Only required
  // if your account manages multiple creditors.
  creditor?: string;

  // ID of the associated [customer bank
  // account](#core-endpoints-customer-bank-accounts) which the mandate is
  // created and submits payments against.
  customer_bank_account: string;
};

/** Type for a mandateconsentparameters resource. */
export type MandateConsentParameters = {
  // The latest date at which payments can be taken, must occur after start_date
  // if present
  end_date?: string;

  // The maximum amount that can be charged for a single payment
  max_amount_per_payment?: number;

  // The maximum total amount that can be charged for all payments in this
  // period
  max_amount_per_period?: number;

  // The maximum number of payments that can be collected in this period
  max_payments_per_period?: number;

  // The repeating period for this mandate
  period?: MandateConsentParametersPeriod;

  // The date from which payments can be taken
  start_date?: string;
};

export enum MandateConsentParametersPeriod {
  Day = 'day',
  Week = 'week',
  Month = 'month',
  Year = 'year',
  Flexible = 'flexible',
}

export enum MandateConsentType {
  OneOff = 'one_off',
  Single = 'single',
  Recurring = 'recurring',
  Standing = 'standing',
  Sporadic = 'sporadic',
}

export enum MandateFundsSettlement {
  Managed = 'managed',
  Direct = 'direct',
}

/** Type for a mandatelinks resource. */
export type MandateLinks = {
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
};

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
export type MandateImport = {
  // Fixed [timestamp](#api-usage-dates-and-times), recording when this resource
  // was created.
  created_at?: string;

  // Unique identifier, beginning with "IM".
  id?: string;

  // Resources linked to this MandateImport.
  links?: MandateImportLinks;

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
};

/** Type for a mandateimportcreaterequestlinks resource. */
export type MandateImportCreateRequestLinks = {
  // ID of the associated creditor. Only required if your account manages
  // multiple creditors.
  creditor?: string;
};

/** Type for a mandateimportlinks resource. */
export type MandateImportLinks = {
  // ID of the associated creditor.
  creditor?: string;
};

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
export type MandateImportEntry = {
  // Fixed [timestamp](#api-usage-dates-and-times), recording when this resource
  // was created.
  created_at?: string;

  // Resources linked to this MandateImportEntry.
  links?: MandateImportEntryLinks;

  // Per-resource processing errors
  processing_errors?: JsonMap | null;

  // A unique identifier for this entry, which you can use (once the import has
  // been
  // processed by GoCardless) to identify the records that have been created.
  // Limited
  // to 255 characters.
  //
  record_identifier?: string | null;
};

/** Type for a mandateimportentryamendment resource. */
export type MandateImportEntryAmendment = {
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
};

/** Type for a mandateimportentrybankaccount resource. */
export type MandateImportEntryBankAccount = {
  // Name of the account holder, as known by the bank. The full name provided
  // when the customer is created is stored and is available via the API, but is
  // transliterated, upcased, and truncated to 18 characters in bank
  // submissions. This field is required unless the request includes a [customer
  // bank account token](#javascript-flow-customer-bank-account-tokens).
  account_holder_name: string;

  // Bank account number - see [local details](#appendix-local-bank-details) for
  // more information. Alternatively you can provide an `iban`.
  account_number?: string | null;

  // Bank account type. Required for USD-denominated bank accounts. Must not be
  // provided for bank accounts in other currencies. See [local
  // details](#local-bank-details-united-states) for more information.
  account_type?: MandateImportEntryBankAccountAccountType;

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

  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  metadata?: JsonMap;
};

export enum MandateImportEntryBankAccountAccountType {
  Savings = 'savings',
  Checking = 'checking',
}

/** Type for a mandateimportentrycustomer resource. */
export type MandateImportEntryCustomer = {
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
};

/** Type for a mandateimportentrycreaterequestlinks resource. */
export type MandateImportEntryCreateRequestLinks = {
  // Unique identifier, beginning with "IM".
  mandate_import: string;
};

/** Type for a mandateimportentrymandate resource. */
export type MandateImportEntryMandate = {
  // Key-value store of custom data. Up to 3 keys are permitted, with key names
  // up to 50 characters and values up to 500 characters.
  metadata?: JsonMap;

  // Unique reference. Different schemes have different length and [character
  // set](#appendix-character-sets) requirements. GoCardless will generate a
  // unique reference satisfying the different scheme requirements if this field
  // is left blank.
  reference?: string | null;
};

export enum MandateImportEntryStatus {
  SuccessfullyProcessed = 'successfully_processed',
  UnsuccessfullyProcessed = 'unsuccessfully_processed',
}

/** Type for a mandateimportentrylinks resource. */
export type MandateImportEntryLinks = {
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
};

/** Type for a mandatepdf resource. */
export type MandatePdf = {
  // The date and time at which the `url` will expire (10 minutes after the
  // original request).
  expires_at?: string;

  // The URL at which this mandate PDF can be viewed until it expires at the
  // date and time specified by `expires_at`. You should not store this URL or
  // rely on its structure remaining the same.
  url?: string;
};

export enum MandatePdfAccountType {
  Savings = 'savings',
  Checking = 'checking',
}

/** Type for a mandatepdfcreaterequestlinks resource. */
export type MandatePdfCreateRequestLinks = {
  // ID of an existing [creditor](#core-endpoints-creditors). Only required if
  // your account manages multiple creditors.
  creditor?: string;

  // ID of an existing [mandate](#core-endpoints-mandates) to build the PDF
  // from. The customer's bank details will be censored in the generated PDF. No
  // other parameters may be provided alongside this.
  mandate?: string;
};

export enum MandatePdfSubscriptionFrequency {
  Weekly = 'weekly',
  Monthly = 'monthly',
  Yearly = 'yearly',
}

/** Type for a negativebalancelimit resource. */
export type NegativeBalanceLimit = {
  // The limit amount in pence (e.g. 10000 for a -100 GBP limit).
  balance_limit?: string;

  // Fixed [timestamp](#api-usage-dates-and-times), recording when this limit
  // was created.
  created_at?: string;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency
  // code. Currently "AUD", "CAD", "DKK", "EUR", "GBP", "NZD", "SEK" and "USD"
  // are supported.
  currency?: NegativeBalanceLimitCurrency;

  // Unique identifier, beginning with "NBL".
  id?: string;

  // Resources linked to this NegativeBalanceLimit.
  links?: NegativeBalanceLimitLinks;
};

export enum NegativeBalanceLimitCurrency {
  AUD = 'AUD',
  CAD = 'CAD',
  DKK = 'DKK',
  EUR = 'EUR',
  GBP = 'GBP',
  NZD = 'NZD',
  SEK = 'SEK',
  USD = 'USD',
}

/** Type for a negativebalancelimitlinks resource. */
export type NegativeBalanceLimitLinks = {
  // ID of the creator_user who created this limit
  creator_user?: string;

  // ID of [creditor](#core-endpoints-creditors) which this limit relates to
  creditor?: string;
};

/** Type for a outboundpayment resource. */
export type OutboundPayment = {
  // Amount, in the lowest denomination for the currency (e.g. pence in GBP,
  // cents in EUR).
  amount?: number;

  // Fixed [timestamp](#api-usage-dates-and-times), recording when the outbound
  // payment was created.
  created_at?: string;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency.
  // Currently only "GBP" is supported.
  currency?: OutboundPaymentCurrency;

  // A human-readable description of the outbound payment
  description?: string;

  // A future date on which the outbound payment should be sent.
  // If not specified, the payment will be sent as soon as possible.
  execution_date?: string;

  // Unique identifier of the outbound payment.
  id: string;

  // Indicates whether the outbound payment is a withdrawal to your verified
  // business bank account.
  is_withdrawal?: boolean;

  // Resources linked to this OutboundPayment.
  links?: OutboundPaymentLinks;

  // Key-value store of custom data. Up to 3 keys are permitted, with
  // key names up to 50 characters and values up to 500 characters.
  metadata?: JsonMap;

  // An optional reference that will appear on your customer's bank statement.
  // The character limit for this reference is dependent on the scheme.<br />
  // <strong>Faster Payments</strong> - 18 characters, including:
  // "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 &-./"<br />
  reference?: string;

  // Bank payment scheme to process the outbound payment. Currently only
  // "faster_payments" (GBP) is supported.
  scheme?: OutboundPaymentScheme;

  // One of:
  // <ul>
  // <li>`verifying`: The payment has been
  // [created](#outbound-payments-create-an-outbound-payment) and the
  // verification process has begun.</li>
  // <li>`pending_approval`: The payment is awaiting
  // [approval](#outbound-payments-approve-an-outbound-payment).</li>
  // <li>`scheduled`: The payment has passed verification &
  // [approval](#outbound-payments-approve-an-outbound-payment), but processing
  // has not yet begun.</li>
  // <li>`executing`: The execution date has arrived and the payment has been
  // placed in queue for processing.</li>
  // <li>`executed`: The payment has been accepted by the scheme and is now on
  // its way to the recipient.</li>
  // <li>`cancelled`: The payment has been
  // [cancelled](#outbound-payments-cancel-an-outbound-payment) or was not
  // [approved](#outbound-payments-approve-an-outbound-payment) on time.</li>
  // <li>`failed`: The payment was not sent, usually due to an error while or
  // after executing.</li>
  // </ul>
  status?: OutboundPaymentStatus;

  // Contains details of the verifications performed for the outbound payment
  verifications?: OutboundPaymentVerifications | null;
};

/** Type for a outboundpaymentcreaterequestlinks resource. */
export type OutboundPaymentCreateRequestLinks = {
  // ID of the creditor who sends the outbound payment.
  creditor?: string;

  // ID of the customer bank account which receives the outbound payment.
  recipient_bank_account: string;
};

export enum OutboundPaymentScheme {
  FasterPayments = 'faster_payments',
}

/** Type for a outboundpaymentwithdrawrequestlinks resource. */
export type OutboundPaymentWithdrawRequestLinks = {
  // ID of the creditor who sends the outbound payment.
  creditor?: string;
};

export enum OutboundPaymentStatus {
  Verifying = 'verifying',
  PendingApproval = 'pending_approval',
  Scheduled = 'scheduled',
  Executing = 'executing',
  Executed = 'executed',
  Cancelled = 'cancelled',
  Failed = 'failed',
}

export enum OutboundPaymentCurrency {
  GBP = 'GBP',
}

/** Type for a outboundpaymentlinks resource. */
export type OutboundPaymentLinks = {
  // ID of the creditor who sends the outbound payment.
  creditor?: string;

  // ID of the [customer](#core-endpoints-customers) that receives this outbound
  // payment
  customer?: string;

  // ID of the customer bank account which receives the outbound payment.
  recipient_bank_account?: string;
};

/** Type for a outboundpaymentverifications resource. */
export type OutboundPaymentVerifications = {
  // Checks if the recipient owns the provided bank account
  recipient_bank_account_holder_verification?: OutboundPaymentVerificationsRecipientBankAccountHolderVerification | null;
};

/** Type for a outboundpaymentverificationsrecipientbankaccountholderverification resource. */
export type OutboundPaymentVerificationsRecipientBankAccountHolderVerification = {
  // The actual account name returned by the recipient's bank, populated only in
  // the case of a partial match.
  actual_account_name?: string | null;

  // Result of the verification, could be one of
  // <ul>
  //   <li>`full_match`: The verification has confirmed that the account name
  // exactly matches the details provided.</li>
  //   <li>`partial_match`:  The verification has confirmed that the account
  // name is similar but does not match to the details provided. </li>
  //   <li>`no_match`: The verification concludes the provided name does not
  // match the account details.</li>
  //   <li>`unable_to_match`: The verification could not be performed due to
  // recipient bank issues or technical issues </li>
  // </ul>
  result?: OutboundPaymentVerificationsRecipientBankAccountHolderVerificationResult;

  // Type of the verification that has been performed
  // eg. [Confirmation of
  // Payee](https://www.wearepay.uk/what-we-do/overlay-services/confirmation-of-payee/)
  type?: OutboundPaymentVerificationsRecipientBankAccountHolderVerificationType;
};

export enum OutboundPaymentVerificationsRecipientBankAccountHolderVerificationResult {
  FullMatch = 'full_match',
  PartialMatch = 'partial_match',
  NoMatch = 'no_match',
  UnableToMatch = 'unable_to_match',
}

export enum OutboundPaymentVerificationsRecipientBankAccountHolderVerificationType {
  ConfirmationOfPayee = 'confirmation_of_payee',
}

/** Type for a payerauthorisation resource. */
export type PayerAuthorisation = {
  // All details required for the creation of a
  // [Customer Bank Account](#core-endpoints-customer-bank-accounts).
  bank_account?: PayerAuthorisationBankAccount;

  // [Timestamp](#api-usage-dates-and-times), recording when this Payer
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
};

/** Type for a payerauthorisationbankaccount resource. */
export type PayerAuthorisationBankAccount = {
  // Name of the account holder, as known by the bank. The full name provided
  // when the customer is created is stored and is available via the API, but is
  // transliterated, upcased, and truncated to 18 characters in bank
  // submissions. This field is required unless the request includes a [customer
  // bank account token](#javascript-flow-customer-bank-account-tokens).
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
};

export enum PayerAuthorisationBankAccountAccountType {
  Savings = 'savings',
  Checking = 'checking',
}

/** Type for a payerauthorisationcustomer resource. */
export type PayerAuthorisationCustomer = {
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
};

/** Type for a payerauthorisationincompletefield resource. */
export type PayerAuthorisationIncompleteField = {
  // The root resource.
  field?: string;

  // A localised error message
  message?: string;

  // The path to the field e.g. "/payer_authorisations/customer/city"
  request_pointer?: string;
};

/** Type for a payerauthorisationlinks resource. */
export type PayerAuthorisationLinks = {
  // Unique identifier, beginning with "BA".
  bank_account?: string;

  // Unique identifier, beginning with "CU".
  customer?: string;

  // Unique identifier, beginning with "MD". Note that this prefix may not apply
  // to mandates created before 2016.
  mandate?: string;
};

/** Type for a payerauthorisationmandate resource. */
export type PayerAuthorisationMandate = {
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
};

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

/** Type for a payertheme resource. */
export type PayerTheme = {
  // Unique identifier, beginning with "PTH".
  id?: string;
};

/** Type for a payerthemecreateforcreditorrequestlinks resource. */
export type PayerThemeCreateForCreditorRequestLinks = {
  // ID of the creditor the payer theme belongs to
  creditor?: string | null;
};

/** Type for a payment resource. */
export type Payment = {
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

  // Fixed [timestamp](#api-usage-dates-and-times), recording when this resource
  // was created.
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

  // This field indicates whether the ACH payment is processed through Faster
  // ACH or standard ACH.
  //
  // It is only present in the API response for ACH payments.
  faster_ach?: boolean | null;

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
  // retries](/success-plus/overview). Default is `false`. <p
  // class="notice"><strong>Important</strong>: To be able to use intelligent
  // retries, Success+ needs to be enabled in [GoCardless
  // dashboard](https://manage.gocardless.com/success-plus). </p>
  retry_if_possible?: boolean;

  // A bank payment scheme. Currently "ach", "autogiro", "bacs", "becs",
  // "becs_nz", "betalingsservice", "faster_payments", "pad", "pay_to" and
  // "sepa_core" are supported.
  scheme?: string | null;

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
};

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

/** Type for a paymentcreaterequestlinks resource. */
export type PaymentCreateRequestLinks = {
  // ID of the [mandate](#core-endpoints-mandates) against which this payment
  // should be collected.
  mandate: string;
};

export enum PaymentPsuInteractionType {
  InSession = 'in_session',
  OffSession = 'off_session',
}

/** Type for a paymentchargedate resource. */
export type PaymentChargeDate = {
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
};

export enum PaymentSortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export enum PaymentSortField {
  ChargeDate = 'charge_date',
  Amount = 'amount',
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

/** Type for a paymentfx resource. */
export type PaymentFx = {
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
};

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
export type PaymentLinks = {
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
};

/** Type for a paymentaccount resource. */
export type PaymentAccount = {
  // Current balance on a payment account in the lowest denomination for the
  // currency (e.g. pence in GBP, cents in EUR).
  // It is time-sensitive as it is ever changing.
  account_balance?: number;

  // Name of the account holder, as known by the bank. Usually this is the same
  // as the name stored with the linked [creditor](#core-endpoints-creditors).
  // This field will be transliterated, upcased and truncated to 18 characters.
  account_holder_name?: string;

  // The last few digits of the account number. Currently 4 digits for NZD bank
  // accounts and 2 digits for other currencies.
  account_number_ending?: string;

  // Name of bank, taken from the bank details.
  bank_name?: string;

  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency
  // code. Currently "AUD", "CAD", "DKK", "EUR", "GBP", "NZD", "SEK" and "USD"
  // are supported.
  currency?: string | null;

  // Unique identifier, beginning with "BA".
  id?: string;

  // Resources linked to this PaymentAccount.
  links?: PaymentAccountLinks;
};

/** Type for a paymentaccountlinks resource. */
export type PaymentAccountLinks = {
  // ID of the [creditor](#core-endpoints-creditors) that owns this bank
  // account.
  creditor?: string;
};

/** Type for a paymentaccounttransaction resource. */
export type PaymentAccountTransaction = {
  // Amount, in the lowest denomination for the currency (e.g. pence in GBP,
  // cents in EUR).
  amount?: number;

  // Balance after transaction, in the lowest denomination for the currency
  // (e.g. pence in GBP, cents in EUR).
  balance_after_transaction?: number;

  // The name of the counterparty of the transaction. The counterparty is the
  // recipient for a credit, or the sender for a debit.
  counterparty_name?: string;

  // The currency of the transaction.
  currency?: PaymentAccountTransactionCurrency;

  // The description of the transaction, if available
  description?: string;

  // The direction of the transaction. Debits mean money leaving the account
  // (e.g. outbound payment), while credits signify money coming in (e.g. manual
  // top-up).
  direction?: PaymentAccountTransactionDirection;

  // The unique ID of the payment account transaction.
  id?: string;

  // Resources linked to this PaymentAccountTransaction.
  links?: PaymentAccountTransactionLinks;

  // The reference of the transaction. This is typically supplied by the sender.
  reference?: string;

  // The date of when the transaction occurred.
  value_date?: string;
};

export enum PaymentAccountTransactionDirection {
  Credit = 'credit',
  Debit = 'debit',
}

export enum PaymentAccountTransactionCurrency {
  GBP = 'GBP',
}

/** Type for a paymentaccounttransactionlinks resource. */
export type PaymentAccountTransactionLinks = {
  // ID of the [outbound_payment](#core-endpoints-outbound-payments) linked to
  // the transaction
  outbound_payment?: string;

  // ID of the payment bank account.
  payment_bank_account?: string;

  // ID of the [payout](#core-endpoints-payouts) linked to the transaction.
  payout?: string;
};

/** Type for a payout resource. */
export type Payout = {
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

  // Fixed [timestamp](#api-usage-dates-and-times), recording when this resource
  // was created.
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
};

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

export enum PayoutPayoutType {
  Merchant = 'merchant',
  Partner = 'partner',
}

export enum PayoutStatus {
  Pending = 'pending',
  Paid = 'paid',
  Bounced = 'bounced',
}

/** Type for a payoutfx resource. */
export type PayoutFx = {
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
};

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
export type PayoutLinks = {
  // ID of [creditor](#core-endpoints-creditors) who will receive this payout,
  // i.e. the owner of the `creditor_bank_account`.
  creditor?: string;

  // ID of [bank account](#core-endpoints-creditor-bank-accounts) which this
  // will be sent to.
  creditor_bank_account?: string;
};

/** Type for a payoutitem resource. */
export type PayoutItem = {
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
};

export enum PayoutItemInclude2020TaxCutover {
  True = 'true',
  False = 'false',
}

/** Type for a payoutitemlinks resource. */
export type PayoutItemLinks = {
  // Unique identifier, beginning with "MD". Note that this prefix may not apply
  // to mandates created before 2016. Present only for the items of type
  // `payment_refunded`, `refund` and `refund_funds_returned`.
  mandate?: string;

  // Unique identifier, beginning with "PM".
  payment?: string;

  // Unique identifier, beginning with "RF". Present only for the items of type
  // `payment_refunded`, `refund` and `refund_funds_returned`.
  refund?: string;
};

/** Type for a payoutitemtaxis resource. */
export type PayoutItemTaxis = {
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
  // webhook](https://developer.gocardless.com/api-reference/#event-types-payout)
  // to know when the exchange rate has been finalised for all fees in the
  // payout.
  exchange_rate?: string | null;

  // The unique identifier created by the jurisdiction, tax type and version
  tax_rate_id?: string;
};

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
  RefundFundsReturned = 'refund_funds_returned',
}

/** Type for a redirectflow resource. */
export type RedirectFlow = {
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

  // Fixed [timestamp](#api-usage-dates-and-times), recording when this resource
  // was created.
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
};

/** Type for a redirectflowcreaterequestlinks resource. */
export type RedirectFlowCreateRequestLinks = {
  // The [creditor](#core-endpoints-creditors) for whom the mandate will be
  // created. The `name` of the creditor will be displayed on the payment page.
  // Required if your account manages multiple creditors.
  creditor?: string;
};

/** Type for a redirectflowprefilledbankaccount resource. */
export type RedirectFlowPrefilledBankAccount = {
  // Bank account type for USD-denominated bank accounts. Must not be provided
  // for bank accounts in other currencies. See [local
  // details](#local-bank-details-united-states) for more information.
  account_type?: RedirectFlowPrefilledBankAccountAccountType;
};

export enum RedirectFlowPrefilledBankAccountAccountType {
  Savings = 'savings',
  Checking = 'checking',
}

/** Type for a redirectflowprefilledcustomer resource. */
export type RedirectFlowPrefilledCustomer = {
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
};

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

/** Type for a redirectflowlinks resource. */
export type RedirectFlowLinks = {
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
};

/** Type for a refund resource. */
export type Refund = {
  // Amount in minor unit (e.g. pence in GBP, cents in EUR).
  amount?: string;

  // Fixed [timestamp](#api-usage-dates-and-times), recording when this resource
  // was created.
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
};

/** Type for a refundcreaterequestlinks resource. */
export type RefundCreateRequestLinks = {
  //  ID of the [mandate](#core-endpoints-mandates) against which the refund is
  // being made. <br /> <p
  // class="restricted-notice"><strong>Restricted</strong>: You must request
  // access to Mandate Refunds by contacting <a
  // href="mailto:support@gocardless.com">our support team</a>.</p>
  mandate?: string;

  // ID of the [payment](#core-endpoints-payments) against which the refund is
  // being made.
  payment?: string;
};

export enum RefundRefundType {
  Mandate = 'mandate',
  Payment = 'payment',
}

/** Type for a refundfx resource. */
export type RefundFx = {
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
};

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
export type RefundLinks = {
  // ID of the [mandate](#core-endpoints-mandates) against which the refund is
  // being made.
  mandate?: string;

  // ID of the [payment](#core-endpoints-payments) against which the refund is
  // being made.
  payment?: string;
};

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
export type ScenarioSimulator = {
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
  // It must start in either the `pending_submission` or `paid_out` state, and
  // its mandate must be in the `activated` state (unless it is a payment for
  // ACH, BECS, BECS_NZ or SEPA, in which cases the mandate may be
  // `pending_submission`, since their mandates are submitted with their first
  // payment). Not compatible with Autogiro mandates.</li>
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
  // `pending_submission` state. Only compatible with Bacs mandates.</li>
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
  // <li>`billing_request_fulfilled_and_payment_confirmed_to_failed`: Authorises
  // the billing request, fulfils it, moves the associated payment to
  // `confirmed` and then moves it to `failed`. The billing request must be in
  // the `pending` state, with all actions completed except for
  // `bank_authorisation`. Only billing requests with a `payment_request` are
  // supported.</li>
  // <li>`billing_request_fulfilled_and_payment_paid_out`: Authorises the
  // billing request, fulfils it, and moves the associated payment to
  // `paid_out`. The billing request must be in the `pending` state, with all
  // actions completed except for `bank_authorisation`. Only billing requests
  // with a `payment_request` are supported.</li>
  // </ul>
  id?: string;
};

/** Type for a scenariosimulatorrunrequestlinks resource. */
export type ScenarioSimulatorRunRequestLinks = {
  // ID of the resource to run the simulation against.
  // Must be same type of resource as the simulator that is being run.
  // eg. Payment ID for `payment_failed`, Mandate ID for `mandate_activated` etc
  resource: string;
};

/** Type for a schemeidentifier resource. */
export type SchemeIdentifier = {
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

  // Fixed [timestamp](#api-usage-dates-and-times), recording when this resource
  // was created.
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
};

/** Type for a schemeidentifiercreaterequestlinks resource. */
export type SchemeIdentifierCreateRequestLinks = {
  // <em>required</em> ID of the associated
  // [creditor](#core-endpoints-creditors).
  //
  creditor?: string;
};

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

export enum SchemeIdentifierStatus {
  Pending = 'pending',
  Active = 'active',
}

type JsonField = boolean | number | string | null;

export interface JsonMap {
  [key: string]: JsonField | JsonMap | JsonArray;
}
export type JsonArray = Array<JsonField>

export type APIResponse = {
  __response__: object;
};

export type Fx = {
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
};

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
export type Subscription = {
  // Amount in the lowest denomination for the currency (e.g. pence in GBP,
  // cents in EUR).
  amount?: string;

  // The amount to be deducted from each payment as an app fee, to be paid to
  // the partner integration which created the subscription, in the lowest
  // denomination for the currency (e.g. pence in GBP, cents in EUR).
  app_fee?: string | null;

  // The total number of payments that should be taken by this subscription.
  count?: string | null;

  // Fixed [timestamp](#api-usage-dates-and-times), recording when this resource
  // was created.
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

  // Whether the parent plan of this subscription is paused.
  parent_plan_paused?: boolean;

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
  // retries](/success-plus/overview). Default is `false`. <p
  // class="notice"><strong>Important</strong>: To be able to use intelligent
  // retries, Success+ needs to be enabled in [GoCardless
  // dashboard](https://manage.gocardless.com/success-plus). </p>
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
};

export enum SubscriptionIntervalUnit {
  Weekly = 'weekly',
  Monthly = 'monthly',
  Yearly = 'yearly',
}

/** Type for a subscriptioncreaterequestlinks resource. */
export type SubscriptionCreateRequestLinks = {
  // ID of the associated [mandate](#core-endpoints-mandates) which the
  // subscription will create payments against.
  mandate: string;
};

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

/** Type for a subscriptionlinks resource. */
export type SubscriptionLinks = {
  // ID of the associated [mandate](#core-endpoints-mandates) which the
  // subscription will create payments against.
  mandate?: string;
};

export enum SubscriptionStatus {
  PendingCustomerApproval = 'pending_customer_approval',
  CustomerApprovalDenied = 'customer_approval_denied',
  Active = 'active',
  Finished = 'finished',
  Cancelled = 'cancelled',
  Paused = 'paused',
}

/** Type for a subscriptionupcomingpayment resource. */
export type SubscriptionUpcomingPayment = {
  // The amount of this payment, in minor unit (e.g. pence in GBP, cents in
  // EUR).
  amount?: string;

  // The date on which this payment will be charged.
  charge_date?: string;
};

/** Type for a taxrate resource. */
export type TaxRate = {
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
};

/** Type for a transferredmandate resource. */
export type TransferredMandate = {
  // Encrypted customer bank account details, containing:
  // `iban`, `account_holder_name`, `swift_bank_code`, `swift_branch_code`,
  // `swift_account_number`
  encrypted_customer_bank_details?: string;

  // Random AES-256 key used to encrypt bank account details, itself encrypted
  // with your public key.
  encrypted_decryption_key?: string;

  // Resources linked to this TransferredMandate.
  links?: TransferredMandateLinks;

  // The ID of an RSA-2048 public key, from your JWKS, used to encrypt the AES
  // key.
  public_key_id?: string;
};

/** Type for a transferredmandatelinks resource. */
export type TransferredMandateLinks = {
  // The ID of the updated
  // [customer_bank_account](#core-endpoints-customer-bank-accounts)
  customer_bank_account?: string;

  // The ID of the transferred mandate
  mandate?: string;
};

/** Type for a verificationdetail resource. */
export type VerificationDetail = {
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
};

/** Type for a verificationdetailcreaterequestlinks resource. */
export type VerificationDetailCreateRequestLinks = {
  // ID of the associated [creditor](#core-endpoints-creditors).
  creditor: string;
};

/** Type for a verificationdetaildirector resource. */
export type VerificationDetailDirector = {
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
};

/** Type for a verificationdetaillinks resource. */
export type VerificationDetailLinks = {
  // ID of the [creditor](#core-endpoints-creditors)
  creditor?: string;
};

/** Type for a webhook resource. */
export type Webhook = {
  // Fixed [timestamp](#api-usage-dates-and-times), recording when this resource
  // was created.
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
};
