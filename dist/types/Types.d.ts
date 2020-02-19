/** Type for a bankdetailslookup resource. */
export interface BankDetailsLookup {
    available_debit_schemes: BankDetailsLookupAvailableDebitScheme[];
    bank_name: string;
    bic: string;
}
declare enum BankDetailsLookupAvailableDebitScheme {
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
    fx_payout_currency: CreditorFxPayoutCurrency;
    id: string;
    links: CreditorLinks;
    logo_url: string;
    name: string;
    postal_code: string;
    region: string;
    scheme_identifiers: CreditorSchemeIdentifier[];
    verification_status: CreditorVerificationStatus;
}
declare enum CreditorFxPayoutCurrency {
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
declare enum CreditorSchemeIdentifierCurrency {
    AUD = "AUD",
    CAD = "CAD",
    DKK = "DKK",
    EUR = "EUR",
    GBP = "GBP",
    NZD = "NZD",
    SEK = "SEK",
    USD = "USD"
}
declare enum CreditorSchemeIdentifierScheme {
    Ach = "ACH",
    Autogiro = "AUTOGIRO",
    Bacs = "BACS",
    Becs = "BECS",
    BecsNz = "BECS_NZ",
    Betalingsservice = "BETALINGSSERVICE",
    Pad = "PAD",
    Sepa = "SEPA"
}
declare enum CreditorVerificationStatus {
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
    metadata: Metadata;
}
declare enum CreditorBankAccountAccountType {
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
    metadata: Metadata;
    phone_number: string;
    postal_code: string;
    region: string;
    swedish_identity_number: string;
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
    metadata: Metadata;
}
declare enum CustomerBankAccountAccountType {
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
declare enum CustomerNotificationActionTaken {
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
declare enum CustomerNotificationType {
    PaymentCreated = "PAYMENT_CREATED",
    MandateCreated = "MANDATE_CREATED",
    SubscriptionCreated = "SUBSCRIPTION_CREATED"
}
/** Type for a event resource. */
export interface Event {
    action: string;
    created_at: string;
    customer_notifications: EventCustomerNotification[];
    details: EventDetails;
    id: string;
    links: EventLinks;
    metadata: Metadata;
    resource_type: EventResourceType;
}
/** Type for a eventcustomernotification resource. */
export interface EventCustomerNotification {
    deadline: string;
    id: string;
    mandatory: boolean;
    type: EventCustomerNotificationType;
}
declare enum EventCustomerNotificationType {
    PaymentCreated = "PAYMENT_CREATED",
    MandateCreated = "MANDATE_CREATED",
    SubscriptionCreated = "SUBSCRIPTION_CREATED"
}
/** Type for a eventdetails resource. */
export interface EventDetails {
    cause: string;
    description: string;
    origin: EventDetailsOrigin;
    reason_code: string;
    scheme: EventDetailsScheme;
}
declare enum EventDetailsOrigin {
    Bank = "BANK",
    Api = "API",
    Gocardless = "GOCARDLESS",
    Customer = "CUSTOMER"
}
declare enum EventDetailsScheme {
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
declare enum EventResourceType {
    Payments = "PAYMENTS",
    Mandates = "MANDATES",
    Payouts = "PAYOUTS",
    Refunds = "REFUNDS",
    Subscriptions = "SUBSCRIPTIONS"
}
/** Type for a mandate resource. */
export interface Mandate {
    created_at: string;
    id: string;
    links: MandateLinks;
    metadata: Metadata;
    next_possible_charge_date: string;
    payments_require_approval: boolean;
    reference: string;
    scheme: string;
    status: MandateStatus;
}
/** Type for a mandatelinks resource. */
export interface MandateLinks {
    creditor: string;
    customer: string;
    customer_bank_account: string;
    new_mandate: string;
}
declare enum MandateStatus {
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
    scheme: string;
    status: MandateImportStatus;
}
declare enum MandateImportStatus {
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
    metadata: Metadata;
    reference: string;
    status: PaymentStatus;
}
declare enum PaymentCurrency {
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
declare enum PaymentFxFxCurrency {
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
    mandate: string;
    payout: string;
    subscription: string;
}
declare enum PaymentStatus {
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
declare enum PayoutCurrency {
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
declare enum PayoutFxFxCurrency {
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
declare enum PayoutPayoutType {
    Merchant = "MERCHANT",
    Partner = "PARTNER"
}
declare enum PayoutStatus {
    Pending = "PENDING",
    Paid = "PAID"
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
declare enum PayoutItemType {
    PaymentPaidOut = "PAYMENT_PAID_OUT",
    PaymentFailed = "PAYMENT_FAILED",
    PaymentChargedBack = "PAYMENT_CHARGED_BACK",
    PaymentRefunded = "PAYMENT_REFUNDED",
    Refund = "REFUND",
    GocardlessFee = "GOCARDLESS_FEE",
    AppFee = "APP_FEE",
    RevenueShare = "REVENUE_SHARE"
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
/** Type for a redirectflowlinks resource. */
export interface RedirectFlowLinks {
    creditor: string;
    customer: string;
    customer_bank_account: string;
    mandate: string;
}
declare enum RedirectFlowScheme {
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
    metadata: Metadata;
    reference: string;
}
/** Type for a refundfx resource. */
export interface RefundFx {
    estimated_exchange_rate: string;
    exchange_rate: string;
    fx_amount: string;
    fx_currency: RefundFxFxCurrency;
}
declare enum RefundFxFxCurrency {
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
import { JsonMap } from './utils/json';
interface Metadata extends JsonMap {
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
    metadata: Metadata;
    month: SubscriptionMonth;
    name: string;
    payment_reference: string;
    start_date: string;
    status: SubscriptionStatus;
    upcoming_payments: SubscriptionUpcomingPayment[];
}
declare enum SubscriptionIntervalUnit {
    Weekly = "WEEKLY",
    Monthly = "MONTHLY",
    Yearly = "YEARLY"
}
/** Type for a subscriptionlinks resource. */
export interface SubscriptionLinks {
    mandate: string;
}
declare enum SubscriptionMonth {
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
declare enum SubscriptionStatus {
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
