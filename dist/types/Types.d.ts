/** Type for a bankdetailslookup resource. */
export interface BankDetailsLookup {
    available_debit_schemes: BankDetailsLookupAvailableDebitScheme[];
    bank_name: string;
    bic: string;
}
export declare enum BankDetailsLookupAvailableDebitScheme {
    Ach = "ACH",
    Autogiro = "AUTOGIRO",
    Bacs = "BACS",
    Becs = "BECS",
    BecsNz = "BECS_NZ",
    Betalingsservice = "BETALINGSSERVICE",
    Pad = "PAD",
    SepaCore = "SEPA_CORE"
}
/** Type for a creditor resource. */
export interface Creditor {
    address_line1: string;
    address_line2: string;
    address_line3: string;
    can_create_refunds: boolean;
    city: string;
    country_code: string;
    created_at: string;
    custom_payment_pages_enabled: boolean;
    fx_payout_currency: CreditorFxPayoutCurrency;
    id: string;
    links: CreditorLinks;
    logo_url: string;
    mandate_imports_enabled: boolean;
    merchant_responsible_for_notifications: boolean;
    name: string;
    postal_code: string;
    region: string;
    scheme_identifiers: CreditorSchemeIdentifier[];
    verification_status: CreditorVerificationStatus;
}
/** Type for a creditorupdaterequestlinks resource. */
export interface CreditorUpdateRequestLinks {
    default_aud_payout_account: string;
    default_cad_payout_account: string;
    default_dkk_payout_account: string;
    default_eur_payout_account: string;
    default_gbp_payout_account: string;
    default_nzd_payout_account: string;
    default_sek_payout_account: string;
    default_usd_payout_account: string;
}
export declare enum CreditorFxPayoutCurrency {
    AUD = "AUD",
    CAD = "CAD",
    DKK = "DKK",
    EUR = "EUR",
    GBP = "GBP",
    NZD = "NZD",
    SEK = "SEK",
    USD = "USD"
}
/** Type for a creditorlinks resource. */
export interface CreditorLinks {
    default_aud_payout_account: string;
    default_cad_payout_account: string;
    default_dkk_payout_account: string;
    default_eur_payout_account: string;
    default_gbp_payout_account: string;
    default_nzd_payout_account: string;
    default_sek_payout_account: string;
    default_usd_payout_account: string;
}
/** Type for a creditorschemeidentifier resource. */
export interface CreditorSchemeIdentifier {
    address_line1: string;
    address_line2: string;
    address_line3: string;
    can_specify_mandate_reference: boolean;
    city: string;
    country_code: string;
    currency: CreditorSchemeIdentifierCurrency;
    email: string;
    minimum_advance_notice: number;
    name: string;
    phone_number: string;
    postal_code: string;
    reference: string;
    region: string;
    scheme: CreditorSchemeIdentifierScheme;
}
export declare enum CreditorSchemeIdentifierCurrency {
    AUD = "AUD",
    CAD = "CAD",
    DKK = "DKK",
    EUR = "EUR",
    GBP = "GBP",
    NZD = "NZD",
    SEK = "SEK",
    USD = "USD"
}
export declare enum CreditorSchemeIdentifierScheme {
    Ach = "ACH",
    Autogiro = "AUTOGIRO",
    Bacs = "BACS",
    Becs = "BECS",
    BecsNz = "BECS_NZ",
    Betalingsservice = "BETALINGSSERVICE",
    Pad = "PAD",
    Sepa = "SEPA"
}
export declare enum CreditorVerificationStatus {
    Successful = "SUCCESSFUL",
    InReview = "IN_REVIEW",
    ActionRequired = "ACTION_REQUIRED"
}
/** Type for a creditorbankaccount resource. */
export interface CreditorBankAccount {
    account_holder_name: string;
    account_number_ending: string;
    account_type: CreditorBankAccountAccountType;
    bank_name: string;
    country_code: string;
    created_at: string;
    currency: string;
    enabled: boolean;
    id: string;
    links: CreditorBankAccountLinks;
    metadata: JsonMap;
}
/** Type for a creditorbankaccountcreaterequestlinks resource. */
export interface CreditorBankAccountCreateRequestLinks {
    creditor: string;
}
export declare enum CreditorBankAccountAccountType {
    Savings = "SAVINGS",
    Checking = "CHECKING"
}
/** Type for a creditorbankaccountlinks resource. */
export interface CreditorBankAccountLinks {
    creditor: string;
}
/** Type for a customer resource. */
export interface Customer {
    address_line1: string;
    address_line2: string;
    address_line3: string;
    city: string;
    company_name: string;
    country_code: string;
    created_at: string;
    danish_identity_number: string;
    email: string;
    family_name: string;
    given_name: string;
    id: string;
    language: string;
    metadata: JsonMap;
    phone_number: string;
    postal_code: string;
    region: string;
    swedish_identity_number: string;
}
export declare enum CustomerCurrency {
    AUD = "AUD",
    CAD = "CAD",
    DKK = "DKK",
    EUR = "EUR",
    GBP = "GBP",
    NZD = "NZD",
    SEK = "SEK",
    USD = "USD"
}
/** Type for a customerbankaccount resource. */
export interface CustomerBankAccount {
    account_holder_name: string;
    account_number_ending: string;
    account_type: CustomerBankAccountAccountType;
    bank_name: string;
    country_code: string;
    created_at: string;
    currency: string;
    enabled: boolean;
    id: string;
    links: CustomerBankAccountLinks;
    metadata: JsonMap;
}
/** Type for a customerbankaccountcreaterequestlinks resource. */
export interface CustomerBankAccountCreateRequestLinks {
    customer: string;
    customer_bank_account_token: string;
}
export declare enum CustomerBankAccountAccountType {
    Savings = "SAVINGS",
    Checking = "CHECKING"
}
/** Type for a customerbankaccountlinks resource. */
export interface CustomerBankAccountLinks {
    customer: string;
}
/** Type for a customernotification resource. */
export interface CustomerNotification {
    action_taken: CustomerNotificationActionTaken;
    action_taken_at: string;
    action_taken_by: string;
    id: string;
    links: CustomerNotificationLinks;
    type: CustomerNotificationType;
}
export declare enum CustomerNotificationActionTaken {
    Handled = "HANDLED"
}
/** Type for a customernotificationlinks resource. */
export interface CustomerNotificationLinks {
    customer: string;
    event: string;
    mandate: string;
    payment: string;
    refund: string;
    subscription: string;
}
export declare enum CustomerNotificationType {
    PaymentCreated = "PAYMENT_CREATED",
    PaymentCancelled = "PAYMENT_CANCELLED",
    MandateCreated = "MANDATE_CREATED",
    SubscriptionCreated = "SUBSCRIPTION_CREATED",
    SubscriptionCancelled = "SUBSCRIPTION_CANCELLED",
    InstalmentScheduleCreated = "INSTALMENT_SCHEDULE_CREATED",
    InstalmentScheduleCancelled = "INSTALMENT_SCHEDULE_CANCELLED"
}
/** Type for a event resource. */
export interface Event {
    action: string;
    created_at: string;
    customer_notifications: EventCustomerNotification[];
    details: EventDetails;
    id: string;
    links: EventLinks;
    metadata: JsonMap;
    resource_type: EventResourceType;
}
export declare enum EventInclude {
    Payment = "PAYMENT",
    Mandate = "MANDATE",
    Payout = "PAYOUT",
    Refund = "REFUND",
    Subscription = "SUBSCRIPTION",
    InstalmentSchedule = "INSTALMENT_SCHEDULE",
    Creditor = "CREDITOR"
}
/** Type for a eventcustomernotification resource. */
export interface EventCustomerNotification {
    deadline: string;
    id: string;
    mandatory: boolean;
    type: EventCustomerNotificationType;
}
export declare enum EventCustomerNotificationType {
    PaymentCreated = "PAYMENT_CREATED",
    PaymentCancelled = "PAYMENT_CANCELLED",
    MandateCreated = "MANDATE_CREATED",
    SubscriptionCreated = "SUBSCRIPTION_CREATED",
    SubscriptionCancelled = "SUBSCRIPTION_CANCELLED",
    InstalmentScheduleCreated = "INSTALMENT_SCHEDULE_CREATED",
    InstalmentScheduleCancelled = "INSTALMENT_SCHEDULE_CANCELLED"
}
/** Type for a eventdetails resource. */
export interface EventDetails {
    cause: string;
    description: string;
    origin: EventDetailsOrigin;
    reason_code: string;
    scheme: EventDetailsScheme;
    will_attempt_retry: boolean;
}
export declare enum EventDetailsOrigin {
    Bank = "BANK",
    Api = "API",
    Gocardless = "GOCARDLESS",
    Customer = "CUSTOMER"
}
export declare enum EventDetailsScheme {
    Ach = "ACH",
    Autogiro = "AUTOGIRO",
    Bacs = "BACS",
    Becs = "BECS",
    BecsNz = "BECS_NZ",
    Betalingsservice = "BETALINGSSERVICE",
    Pad = "PAD",
    SepaCore = "SEPA_CORE",
    SepaCor1 = "SEPA_COR1"
}
/** Type for a eventlinks resource. */
export interface EventLinks {
    creditor: string;
    instalment_schedule: string;
    mandate: string;
    new_customer_bank_account: string;
    new_mandate: string;
    organisation: string;
    parent_event: string;
    payment: string;
    payout: string;
    previous_customer_bank_account: string;
    refund: string;
    subscription: string;
}
export declare enum EventResourceType {
    Payments = "PAYMENTS",
    Mandates = "MANDATES",
    Payouts = "PAYOUTS",
    Refunds = "REFUNDS",
    Subscriptions = "SUBSCRIPTIONS",
    InstalmentSchedules = "INSTALMENT_SCHEDULES",
    Creditors = "CREDITORS"
}
/** Type for a instalmentschedule resource. */
export interface InstalmentSchedule {
    created_at: string;
    currency: InstalmentScheduleCurrency;
    id: string;
    links: InstalmentScheduleLinks;
    metadata: JsonMap;
    name: string;
    payment_errors: JsonMap;
    status: InstalmentScheduleStatus;
    total_amount: string;
}
/** Type for a instalmentschedulecreaterequestlinks resource. */
export interface InstalmentScheduleCreateRequestLinks {
    mandate: string;
}
export declare enum InstalmentScheduleCurrency {
    AUD = "AUD",
    CAD = "CAD",
    DKK = "DKK",
    EUR = "EUR",
    GBP = "GBP",
    NZD = "NZD",
    SEK = "SEK",
    USD = "USD"
}
/** Type for a instalmentschedulelinks resource. */
export interface InstalmentScheduleLinks {
    customer: string;
    mandate: string;
    payments: string[];
}
export declare enum InstalmentScheduleStatus {
    Pending = "PENDING",
    Active = "ACTIVE",
    CreationFailed = "CREATION_FAILED",
    Completed = "COMPLETED",
    Cancelled = "CANCELLED",
    Errored = "ERRORED"
}
/** Type for a mandate resource. */
export interface Mandate {
    created_at: string;
    id: string;
    links: MandateLinks;
    metadata: JsonMap;
    next_possible_charge_date: string;
    payments_require_approval: boolean;
    reference: string;
    scheme: string;
    status: MandateStatus;
}
/** Type for a mandatecreaterequestlinks resource. */
export interface MandateCreateRequestLinks {
    creditor: string;
    customer_bank_account: string;
}
/** Type for a mandatelinks resource. */
export interface MandateLinks {
    creditor: string;
    customer: string;
    customer_bank_account: string;
    new_mandate: string;
}
export declare enum MandateStatus {
    PendingCustomerApproval = "PENDING_CUSTOMER_APPROVAL",
    PendingSubmission = "PENDING_SUBMISSION",
    Submitted = "SUBMITTED",
    Active = "ACTIVE",
    Failed = "FAILED",
    Cancelled = "CANCELLED",
    Expired = "EXPIRED"
}
/** Type for a mandateimport resource. */
export interface MandateImport {
    created_at: string;
    id: string;
    scheme: MandateImportScheme;
    status: MandateImportStatus;
}
export declare enum MandateImportScheme {
    Ach = "ACH",
    Autogiro = "AUTOGIRO",
    Bacs = "BACS",
    Becs = "BECS",
    BecsNz = "BECS_NZ",
    Betalingsservice = "BETALINGSSERVICE",
    Pad = "PAD",
    SepaCore = "SEPA_CORE"
}
export declare enum MandateImportStatus {
    Created = "CREATED",
    Submitted = "SUBMITTED",
    Cancelled = "CANCELLED",
    Processing = "PROCESSING",
    Processed = "PROCESSED"
}
/** Type for a mandateimportentry resource. */
export interface MandateImportEntry {
    created_at: string;
    links: MandateImportEntryLinks;
    record_identifier: string;
}
/** Type for a mandateimportentryamendment resource. */
export interface MandateImportEntryAmendment {
    original_creditor_id: string;
    original_creditor_name: string;
    original_mandate_reference: string;
}
/** Type for a mandateimportentrybankaccount resource. */
export interface MandateImportEntryBankAccount {
    account_holder_name: string;
    account_number: string;
    bank_code: string;
    branch_code: string;
    country_code: string;
    iban: string;
}
/** Type for a mandateimportentrycustomer resource. */
export interface MandateImportEntryCustomer {
    address_line1: string;
    address_line2: string;
    address_line3: string;
    city: string;
    company_name: string;
    country_code: string;
    danish_identity_number: string;
    email: string;
    family_name: string;
    given_name: string;
    language: string;
    phone_number: string;
    postal_code: string;
    region: string;
    swedish_identity_number: string;
}
/** Type for a mandateimportentrycreaterequestlinks resource. */
export interface MandateImportEntryCreateRequestLinks {
    mandate_import: string;
}
/** Type for a mandateimportentrylinks resource. */
export interface MandateImportEntryLinks {
    customer: string;
    customer_bank_account: string;
    mandate: string;
    mandate_import: string;
}
/** Type for a mandatepdf resource. */
export interface MandatePdf {
    expires_at: string;
    url: string;
}
export declare enum MandatePdfAccountType {
    Savings = "SAVINGS",
    Checking = "CHECKING"
}
/** Type for a mandatepdfcreaterequestlinks resource. */
export interface MandatePdfCreateRequestLinks {
    mandate: string;
}
export declare enum MandatePdfSubscriptionFrequency {
    Weekly = "WEEKLY",
    Monthly = "MONTHLY",
    Yearly = "YEARLY"
}
/** Type for a payment resource. */
export interface Payment {
    amount: string;
    amount_refunded: string;
    charge_date: string;
    created_at: string;
    currency: PaymentCurrency;
    description: string;
    fx: PaymentFx;
    id: string;
    links: PaymentLinks;
    metadata: JsonMap;
    reference: string;
    retry_if_possible: boolean;
    status: PaymentStatus;
}
/** Type for a paymentcreaterequestlinks resource. */
export interface PaymentCreateRequestLinks {
    mandate: string;
}
/** Type for a paymentchargedate resource. */
export interface PaymentChargeDate {
    gt: string;
    gte: string;
    lt: string;
    lte: string;
}
export declare enum PaymentCurrency {
    AUD = "AUD",
    CAD = "CAD",
    DKK = "DKK",
    EUR = "EUR",
    GBP = "GBP",
    NZD = "NZD",
    SEK = "SEK",
    USD = "USD"
}
/** Type for a paymentfx resource. */
export interface PaymentFx {
    estimated_exchange_rate: string;
    exchange_rate: string;
    fx_amount: string;
    fx_currency: PaymentFxFxCurrency;
}
export declare enum PaymentFxFxCurrency {
    AUD = "AUD",
    CAD = "CAD",
    DKK = "DKK",
    EUR = "EUR",
    GBP = "GBP",
    NZD = "NZD",
    SEK = "SEK",
    USD = "USD"
}
/** Type for a paymentlinks resource. */
export interface PaymentLinks {
    creditor: string;
    instalment_schedule: string;
    mandate: string;
    payout: string;
    subscription: string;
}
export declare enum PaymentStatus {
    PendingCustomerApproval = "PENDING_CUSTOMER_APPROVAL",
    PendingSubmission = "PENDING_SUBMISSION",
    Submitted = "SUBMITTED",
    Confirmed = "CONFIRMED",
    PaidOut = "PAID_OUT",
    Cancelled = "CANCELLED",
    CustomerApprovalDenied = "CUSTOMER_APPROVAL_DENIED",
    Failed = "FAILED",
    ChargedBack = "CHARGED_BACK"
}
/** Type for a payout resource. */
export interface Payout {
    amount: string;
    arrival_date: string;
    created_at: string;
    currency: PayoutCurrency;
    deducted_fees: string;
    fx: PayoutFx;
    id: string;
    links: PayoutLinks;
    payout_type: PayoutPayoutType;
    reference: string;
    status: PayoutStatus;
}
export declare enum PayoutCurrency {
    AUD = "AUD",
    CAD = "CAD",
    DKK = "DKK",
    EUR = "EUR",
    GBP = "GBP",
    NZD = "NZD",
    SEK = "SEK",
    USD = "USD"
}
/** Type for a payoutfx resource. */
export interface PayoutFx {
    estimated_exchange_rate: string;
    exchange_rate: string;
    fx_amount: string;
    fx_currency: PayoutFxFxCurrency;
}
export declare enum PayoutFxFxCurrency {
    AUD = "AUD",
    CAD = "CAD",
    DKK = "DKK",
    EUR = "EUR",
    GBP = "GBP",
    NZD = "NZD",
    SEK = "SEK",
    USD = "USD"
}
/** Type for a payoutlinks resource. */
export interface PayoutLinks {
    creditor: string;
    creditor_bank_account: string;
}
export declare enum PayoutPayoutType {
    Merchant = "MERCHANT",
    Partner = "PARTNER"
}
export declare enum PayoutStatus {
    Pending = "PENDING",
    Paid = "PAID",
    Bounced = "BOUNCED"
}
/** Type for a payoutitem resource. */
export interface PayoutItem {
    amount: string;
    links: PayoutItemLinks;
    type: PayoutItemType;
}
/** Type for a payoutitemlinks resource. */
export interface PayoutItemLinks {
    mandate: string;
    payment: string;
}
export declare enum PayoutItemType {
    PaymentPaidOut = "PAYMENT_PAID_OUT",
    PaymentFailed = "PAYMENT_FAILED",
    PaymentChargedBack = "PAYMENT_CHARGED_BACK",
    PaymentRefunded = "PAYMENT_REFUNDED",
    Refund = "REFUND",
    GocardlessFee = "GOCARDLESS_FEE",
    AppFee = "APP_FEE",
    RevenueShare = "REVENUE_SHARE",
    SurchargeFee = "SURCHARGE_FEE"
}
/** Type for a redirectflow resource. */
export interface RedirectFlow {
    confirmation_url: string;
    created_at: string;
    description: string;
    id: string;
    links: RedirectFlowLinks;
    redirect_url: string;
    scheme: RedirectFlowScheme;
    session_token: string;
    success_redirect_url: string;
}
/** Type for a redirectflowcreaterequestlinks resource. */
export interface RedirectFlowCreateRequestLinks {
    creditor: string;
}
/** Type for a redirectflowprefilledcustomer resource. */
export interface RedirectFlowPrefilledCustomer {
    address_line1: string;
    address_line2: string;
    address_line3: string;
    city: string;
    company_name: string;
    country_code: string;
    danish_identity_number: string;
    email: string;
    family_name: string;
    given_name: string;
    language: string;
    phone_number: string;
    postal_code: string;
    region: string;
    swedish_identity_number: string;
}
/** Type for a redirectflowlinks resource. */
export interface RedirectFlowLinks {
    creditor: string;
    customer: string;
    customer_bank_account: string;
    mandate: string;
}
export declare enum RedirectFlowScheme {
    Ach = "ACH",
    Autogiro = "AUTOGIRO",
    Bacs = "BACS",
    Becs = "BECS",
    BecsNz = "BECS_NZ",
    Betalingsservice = "BETALINGSSERVICE",
    Pad = "PAD",
    SepaCore = "SEPA_CORE"
}
/** Type for a refund resource. */
export interface Refund {
    amount: string;
    created_at: string;
    currency: string;
    fx: RefundFx;
    id: string;
    links: RefundLinks;
    metadata: JsonMap;
    reference: string;
    status: RefundStatus;
}
/** Type for a refundcreaterequestlinks resource. */
export interface RefundCreateRequestLinks {
    mandate: string;
    payment: string;
}
export declare enum RefundRefundType {
    Mandate = "MANDATE",
    Payment = "PAYMENT"
}
/** Type for a refundfx resource. */
export interface RefundFx {
    estimated_exchange_rate: string;
    exchange_rate: string;
    fx_amount: string;
    fx_currency: RefundFxFxCurrency;
}
export declare enum RefundFxFxCurrency {
    AUD = "AUD",
    CAD = "CAD",
    DKK = "DKK",
    EUR = "EUR",
    GBP = "GBP",
    NZD = "NZD",
    SEK = "SEK",
    USD = "USD"
}
/** Type for a refundlinks resource. */
export interface RefundLinks {
    mandate: string;
    payment: string;
}
export declare enum RefundStatus {
    Created = "CREATED",
    PendingSubmission = "PENDING_SUBMISSION",
    Submitted = "SUBMITTED",
    Paid = "PAID",
    Cancelled = "CANCELLED",
    Bounced = "BOUNCED",
    FundsReturned = "FUNDS_RETURNED"
}
declare type JsonField = boolean | number | string | null;
export interface JsonMap {
    [key: string]: JsonField | JsonMap | JsonArray;
}
export interface JsonArray extends Array<JsonField> {
}
export interface ResponseMetadata {
    request: object;
    response: object;
}
export interface Fx {
    exchange_rate: string;
    estimated_exchange_rate: string;
    fx_amount: string;
    fx_currency: FxCurrency;
}
export declare enum FxCurrency {
    AUD = "AUD",
    CAD = "CAD",
    DKK = "DKK",
    EUR = "EUR",
    GBP = "GBP",
    NZD = "NZD",
    SEK = "SEK",
    USD = "USD"
}
export interface CreatedAtFilter {
    greaterThan?: string;
    greaterThanOrEqual?: string;
    lessThan?: string;
    lessThanOrEqual?: string;
}
/** Type for a subscription resource. */
export interface Subscription {
    amount: string;
    app_fee: string;
    created_at: string;
    currency: string;
    day_of_month: string;
    end_date: string;
    id: string;
    interval: string;
    interval_unit: SubscriptionIntervalUnit;
    links: SubscriptionLinks;
    metadata: JsonMap;
    month: SubscriptionMonth;
    name: string;
    payment_reference: string;
    retry_if_possible: boolean;
    start_date: string;
    status: SubscriptionStatus;
    upcoming_payments: SubscriptionUpcomingPayment[];
}
/** Type for a subscriptioncreaterequestlinks resource. */
export interface SubscriptionCreateRequestLinks {
    mandate: string;
}
export declare enum SubscriptionIntervalUnit {
    Weekly = "WEEKLY",
    Monthly = "MONTHLY",
    Yearly = "YEARLY"
}
/** Type for a subscriptionlinks resource. */
export interface SubscriptionLinks {
    mandate: string;
}
export declare enum SubscriptionMonth {
    January = "JANUARY",
    February = "FEBRUARY",
    March = "MARCH",
    April = "APRIL",
    May = "MAY",
    June = "JUNE",
    July = "JULY",
    August = "AUGUST",
    September = "SEPTEMBER",
    October = "OCTOBER",
    November = "NOVEMBER",
    December = "DECEMBER"
}
export declare enum SubscriptionStatus {
    PendingCustomerApproval = "PENDING_CUSTOMER_APPROVAL",
    CustomerApprovalDenied = "CUSTOMER_APPROVAL_DENIED",
    Active = "ACTIVE",
    Finished = "FINISHED",
    Cancelled = "CANCELLED"
}
/** Type for a subscriptionupcomingpayment resource. */
export interface SubscriptionUpcomingPayment {
    amount: string;
    charge_date: string;
}
export {};
