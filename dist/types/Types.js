"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BankDetailsLookupAvailableDebitScheme;
(function (BankDetailsLookupAvailableDebitScheme) {
    BankDetailsLookupAvailableDebitScheme["Ach"] = "ACH";
    BankDetailsLookupAvailableDebitScheme["Autogiro"] = "AUTOGIRO";
    BankDetailsLookupAvailableDebitScheme["Bacs"] = "BACS";
    BankDetailsLookupAvailableDebitScheme["Becs"] = "BECS";
    BankDetailsLookupAvailableDebitScheme["BecsNz"] = "BECS_NZ";
    BankDetailsLookupAvailableDebitScheme["Betalingsservice"] = "BETALINGSSERVICE";
    BankDetailsLookupAvailableDebitScheme["Pad"] = "PAD";
    BankDetailsLookupAvailableDebitScheme["SepaCore"] = "SEPA_CORE";
})(BankDetailsLookupAvailableDebitScheme = exports.BankDetailsLookupAvailableDebitScheme || (exports.BankDetailsLookupAvailableDebitScheme = {}));
var CreditorFxPayoutCurrency;
(function (CreditorFxPayoutCurrency) {
    CreditorFxPayoutCurrency["AUD"] = "AUD";
    CreditorFxPayoutCurrency["CAD"] = "CAD";
    CreditorFxPayoutCurrency["DKK"] = "DKK";
    CreditorFxPayoutCurrency["EUR"] = "EUR";
    CreditorFxPayoutCurrency["GBP"] = "GBP";
    CreditorFxPayoutCurrency["NZD"] = "NZD";
    CreditorFxPayoutCurrency["SEK"] = "SEK";
    CreditorFxPayoutCurrency["USD"] = "USD";
})(CreditorFxPayoutCurrency = exports.CreditorFxPayoutCurrency || (exports.CreditorFxPayoutCurrency = {}));
var CreditorSchemeIdentifierCurrency;
(function (CreditorSchemeIdentifierCurrency) {
    CreditorSchemeIdentifierCurrency["AUD"] = "AUD";
    CreditorSchemeIdentifierCurrency["CAD"] = "CAD";
    CreditorSchemeIdentifierCurrency["DKK"] = "DKK";
    CreditorSchemeIdentifierCurrency["EUR"] = "EUR";
    CreditorSchemeIdentifierCurrency["GBP"] = "GBP";
    CreditorSchemeIdentifierCurrency["NZD"] = "NZD";
    CreditorSchemeIdentifierCurrency["SEK"] = "SEK";
    CreditorSchemeIdentifierCurrency["USD"] = "USD";
})(CreditorSchemeIdentifierCurrency = exports.CreditorSchemeIdentifierCurrency || (exports.CreditorSchemeIdentifierCurrency = {}));
var CreditorSchemeIdentifierScheme;
(function (CreditorSchemeIdentifierScheme) {
    CreditorSchemeIdentifierScheme["Ach"] = "ACH";
    CreditorSchemeIdentifierScheme["Autogiro"] = "AUTOGIRO";
    CreditorSchemeIdentifierScheme["Bacs"] = "BACS";
    CreditorSchemeIdentifierScheme["Becs"] = "BECS";
    CreditorSchemeIdentifierScheme["BecsNz"] = "BECS_NZ";
    CreditorSchemeIdentifierScheme["Betalingsservice"] = "BETALINGSSERVICE";
    CreditorSchemeIdentifierScheme["Pad"] = "PAD";
    CreditorSchemeIdentifierScheme["Sepa"] = "SEPA";
})(CreditorSchemeIdentifierScheme = exports.CreditorSchemeIdentifierScheme || (exports.CreditorSchemeIdentifierScheme = {}));
var CreditorVerificationStatus;
(function (CreditorVerificationStatus) {
    CreditorVerificationStatus["Successful"] = "SUCCESSFUL";
    CreditorVerificationStatus["InReview"] = "IN_REVIEW";
    CreditorVerificationStatus["ActionRequired"] = "ACTION_REQUIRED";
})(CreditorVerificationStatus = exports.CreditorVerificationStatus || (exports.CreditorVerificationStatus = {}));
var CreditorBankAccountAccountType;
(function (CreditorBankAccountAccountType) {
    CreditorBankAccountAccountType["Savings"] = "SAVINGS";
    CreditorBankAccountAccountType["Checking"] = "CHECKING";
})(CreditorBankAccountAccountType = exports.CreditorBankAccountAccountType || (exports.CreditorBankAccountAccountType = {}));
var CustomerCurrency;
(function (CustomerCurrency) {
    CustomerCurrency["AUD"] = "AUD";
    CustomerCurrency["CAD"] = "CAD";
    CustomerCurrency["DKK"] = "DKK";
    CustomerCurrency["EUR"] = "EUR";
    CustomerCurrency["GBP"] = "GBP";
    CustomerCurrency["NZD"] = "NZD";
    CustomerCurrency["SEK"] = "SEK";
    CustomerCurrency["USD"] = "USD";
})(CustomerCurrency = exports.CustomerCurrency || (exports.CustomerCurrency = {}));
var CustomerBankAccountAccountType;
(function (CustomerBankAccountAccountType) {
    CustomerBankAccountAccountType["Savings"] = "SAVINGS";
    CustomerBankAccountAccountType["Checking"] = "CHECKING";
})(CustomerBankAccountAccountType = exports.CustomerBankAccountAccountType || (exports.CustomerBankAccountAccountType = {}));
var CustomerNotificationActionTaken;
(function (CustomerNotificationActionTaken) {
    CustomerNotificationActionTaken["Handled"] = "HANDLED";
})(CustomerNotificationActionTaken = exports.CustomerNotificationActionTaken || (exports.CustomerNotificationActionTaken = {}));
var CustomerNotificationType;
(function (CustomerNotificationType) {
    CustomerNotificationType["PaymentCreated"] = "PAYMENT_CREATED";
    CustomerNotificationType["PaymentCancelled"] = "PAYMENT_CANCELLED";
    CustomerNotificationType["MandateCreated"] = "MANDATE_CREATED";
    CustomerNotificationType["SubscriptionCreated"] = "SUBSCRIPTION_CREATED";
    CustomerNotificationType["SubscriptionCancelled"] = "SUBSCRIPTION_CANCELLED";
    CustomerNotificationType["InstalmentScheduleCreated"] = "INSTALMENT_SCHEDULE_CREATED";
    CustomerNotificationType["InstalmentScheduleCancelled"] = "INSTALMENT_SCHEDULE_CANCELLED";
})(CustomerNotificationType = exports.CustomerNotificationType || (exports.CustomerNotificationType = {}));
var EventInclude;
(function (EventInclude) {
    EventInclude["Payment"] = "PAYMENT";
    EventInclude["Mandate"] = "MANDATE";
    EventInclude["Payout"] = "PAYOUT";
    EventInclude["Refund"] = "REFUND";
    EventInclude["Subscription"] = "SUBSCRIPTION";
    EventInclude["InstalmentSchedule"] = "INSTALMENT_SCHEDULE";
    EventInclude["Creditor"] = "CREDITOR";
})(EventInclude = exports.EventInclude || (exports.EventInclude = {}));
var EventCustomerNotificationType;
(function (EventCustomerNotificationType) {
    EventCustomerNotificationType["PaymentCreated"] = "PAYMENT_CREATED";
    EventCustomerNotificationType["PaymentCancelled"] = "PAYMENT_CANCELLED";
    EventCustomerNotificationType["MandateCreated"] = "MANDATE_CREATED";
    EventCustomerNotificationType["SubscriptionCreated"] = "SUBSCRIPTION_CREATED";
    EventCustomerNotificationType["SubscriptionCancelled"] = "SUBSCRIPTION_CANCELLED";
    EventCustomerNotificationType["InstalmentScheduleCreated"] = "INSTALMENT_SCHEDULE_CREATED";
    EventCustomerNotificationType["InstalmentScheduleCancelled"] = "INSTALMENT_SCHEDULE_CANCELLED";
})(EventCustomerNotificationType = exports.EventCustomerNotificationType || (exports.EventCustomerNotificationType = {}));
var EventDetailsOrigin;
(function (EventDetailsOrigin) {
    EventDetailsOrigin["Bank"] = "BANK";
    EventDetailsOrigin["Api"] = "API";
    EventDetailsOrigin["Gocardless"] = "GOCARDLESS";
    EventDetailsOrigin["Customer"] = "CUSTOMER";
})(EventDetailsOrigin = exports.EventDetailsOrigin || (exports.EventDetailsOrigin = {}));
var EventDetailsScheme;
(function (EventDetailsScheme) {
    EventDetailsScheme["Ach"] = "ACH";
    EventDetailsScheme["Autogiro"] = "AUTOGIRO";
    EventDetailsScheme["Bacs"] = "BACS";
    EventDetailsScheme["Becs"] = "BECS";
    EventDetailsScheme["BecsNz"] = "BECS_NZ";
    EventDetailsScheme["Betalingsservice"] = "BETALINGSSERVICE";
    EventDetailsScheme["Pad"] = "PAD";
    EventDetailsScheme["SepaCore"] = "SEPA_CORE";
    EventDetailsScheme["SepaCor1"] = "SEPA_COR1";
})(EventDetailsScheme = exports.EventDetailsScheme || (exports.EventDetailsScheme = {}));
var EventResourceType;
(function (EventResourceType) {
    EventResourceType["Payments"] = "PAYMENTS";
    EventResourceType["Mandates"] = "MANDATES";
    EventResourceType["Payouts"] = "PAYOUTS";
    EventResourceType["Refunds"] = "REFUNDS";
    EventResourceType["Subscriptions"] = "SUBSCRIPTIONS";
    EventResourceType["InstalmentSchedules"] = "INSTALMENT_SCHEDULES";
    EventResourceType["Creditors"] = "CREDITORS";
})(EventResourceType = exports.EventResourceType || (exports.EventResourceType = {}));
var InstalmentScheduleCurrency;
(function (InstalmentScheduleCurrency) {
    InstalmentScheduleCurrency["AUD"] = "AUD";
    InstalmentScheduleCurrency["CAD"] = "CAD";
    InstalmentScheduleCurrency["DKK"] = "DKK";
    InstalmentScheduleCurrency["EUR"] = "EUR";
    InstalmentScheduleCurrency["GBP"] = "GBP";
    InstalmentScheduleCurrency["NZD"] = "NZD";
    InstalmentScheduleCurrency["SEK"] = "SEK";
    InstalmentScheduleCurrency["USD"] = "USD";
})(InstalmentScheduleCurrency = exports.InstalmentScheduleCurrency || (exports.InstalmentScheduleCurrency = {}));
var InstalmentScheduleStatus;
(function (InstalmentScheduleStatus) {
    InstalmentScheduleStatus["Pending"] = "PENDING";
    InstalmentScheduleStatus["Active"] = "ACTIVE";
    InstalmentScheduleStatus["CreationFailed"] = "CREATION_FAILED";
    InstalmentScheduleStatus["Completed"] = "COMPLETED";
    InstalmentScheduleStatus["Cancelled"] = "CANCELLED";
    InstalmentScheduleStatus["Errored"] = "ERRORED";
})(InstalmentScheduleStatus = exports.InstalmentScheduleStatus || (exports.InstalmentScheduleStatus = {}));
var MandateStatus;
(function (MandateStatus) {
    MandateStatus["PendingCustomerApproval"] = "PENDING_CUSTOMER_APPROVAL";
    MandateStatus["PendingSubmission"] = "PENDING_SUBMISSION";
    MandateStatus["Submitted"] = "SUBMITTED";
    MandateStatus["Active"] = "ACTIVE";
    MandateStatus["Failed"] = "FAILED";
    MandateStatus["Cancelled"] = "CANCELLED";
    MandateStatus["Expired"] = "EXPIRED";
})(MandateStatus = exports.MandateStatus || (exports.MandateStatus = {}));
var MandateImportScheme;
(function (MandateImportScheme) {
    MandateImportScheme["Ach"] = "ACH";
    MandateImportScheme["Autogiro"] = "AUTOGIRO";
    MandateImportScheme["Bacs"] = "BACS";
    MandateImportScheme["Becs"] = "BECS";
    MandateImportScheme["BecsNz"] = "BECS_NZ";
    MandateImportScheme["Betalingsservice"] = "BETALINGSSERVICE";
    MandateImportScheme["Pad"] = "PAD";
    MandateImportScheme["SepaCore"] = "SEPA_CORE";
})(MandateImportScheme = exports.MandateImportScheme || (exports.MandateImportScheme = {}));
var MandateImportStatus;
(function (MandateImportStatus) {
    MandateImportStatus["Created"] = "CREATED";
    MandateImportStatus["Submitted"] = "SUBMITTED";
    MandateImportStatus["Cancelled"] = "CANCELLED";
    MandateImportStatus["Processing"] = "PROCESSING";
    MandateImportStatus["Processed"] = "PROCESSED";
})(MandateImportStatus = exports.MandateImportStatus || (exports.MandateImportStatus = {}));
var MandatePdfAccountType;
(function (MandatePdfAccountType) {
    MandatePdfAccountType["Savings"] = "SAVINGS";
    MandatePdfAccountType["Checking"] = "CHECKING";
})(MandatePdfAccountType = exports.MandatePdfAccountType || (exports.MandatePdfAccountType = {}));
var MandatePdfSubscriptionFrequency;
(function (MandatePdfSubscriptionFrequency) {
    MandatePdfSubscriptionFrequency["Weekly"] = "WEEKLY";
    MandatePdfSubscriptionFrequency["Monthly"] = "MONTHLY";
    MandatePdfSubscriptionFrequency["Yearly"] = "YEARLY";
})(MandatePdfSubscriptionFrequency = exports.MandatePdfSubscriptionFrequency || (exports.MandatePdfSubscriptionFrequency = {}));
var PaymentCurrency;
(function (PaymentCurrency) {
    PaymentCurrency["AUD"] = "AUD";
    PaymentCurrency["CAD"] = "CAD";
    PaymentCurrency["DKK"] = "DKK";
    PaymentCurrency["EUR"] = "EUR";
    PaymentCurrency["GBP"] = "GBP";
    PaymentCurrency["NZD"] = "NZD";
    PaymentCurrency["SEK"] = "SEK";
    PaymentCurrency["USD"] = "USD";
})(PaymentCurrency = exports.PaymentCurrency || (exports.PaymentCurrency = {}));
var PaymentFxFxCurrency;
(function (PaymentFxFxCurrency) {
    PaymentFxFxCurrency["AUD"] = "AUD";
    PaymentFxFxCurrency["CAD"] = "CAD";
    PaymentFxFxCurrency["DKK"] = "DKK";
    PaymentFxFxCurrency["EUR"] = "EUR";
    PaymentFxFxCurrency["GBP"] = "GBP";
    PaymentFxFxCurrency["NZD"] = "NZD";
    PaymentFxFxCurrency["SEK"] = "SEK";
    PaymentFxFxCurrency["USD"] = "USD";
})(PaymentFxFxCurrency = exports.PaymentFxFxCurrency || (exports.PaymentFxFxCurrency = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PendingCustomerApproval"] = "PENDING_CUSTOMER_APPROVAL";
    PaymentStatus["PendingSubmission"] = "PENDING_SUBMISSION";
    PaymentStatus["Submitted"] = "SUBMITTED";
    PaymentStatus["Confirmed"] = "CONFIRMED";
    PaymentStatus["PaidOut"] = "PAID_OUT";
    PaymentStatus["Cancelled"] = "CANCELLED";
    PaymentStatus["CustomerApprovalDenied"] = "CUSTOMER_APPROVAL_DENIED";
    PaymentStatus["Failed"] = "FAILED";
    PaymentStatus["ChargedBack"] = "CHARGED_BACK";
})(PaymentStatus = exports.PaymentStatus || (exports.PaymentStatus = {}));
var PayoutCurrency;
(function (PayoutCurrency) {
    PayoutCurrency["AUD"] = "AUD";
    PayoutCurrency["CAD"] = "CAD";
    PayoutCurrency["DKK"] = "DKK";
    PayoutCurrency["EUR"] = "EUR";
    PayoutCurrency["GBP"] = "GBP";
    PayoutCurrency["NZD"] = "NZD";
    PayoutCurrency["SEK"] = "SEK";
    PayoutCurrency["USD"] = "USD";
})(PayoutCurrency = exports.PayoutCurrency || (exports.PayoutCurrency = {}));
var PayoutFxFxCurrency;
(function (PayoutFxFxCurrency) {
    PayoutFxFxCurrency["AUD"] = "AUD";
    PayoutFxFxCurrency["CAD"] = "CAD";
    PayoutFxFxCurrency["DKK"] = "DKK";
    PayoutFxFxCurrency["EUR"] = "EUR";
    PayoutFxFxCurrency["GBP"] = "GBP";
    PayoutFxFxCurrency["NZD"] = "NZD";
    PayoutFxFxCurrency["SEK"] = "SEK";
    PayoutFxFxCurrency["USD"] = "USD";
})(PayoutFxFxCurrency = exports.PayoutFxFxCurrency || (exports.PayoutFxFxCurrency = {}));
var PayoutPayoutType;
(function (PayoutPayoutType) {
    PayoutPayoutType["Merchant"] = "MERCHANT";
    PayoutPayoutType["Partner"] = "PARTNER";
})(PayoutPayoutType = exports.PayoutPayoutType || (exports.PayoutPayoutType = {}));
var PayoutStatus;
(function (PayoutStatus) {
    PayoutStatus["Pending"] = "PENDING";
    PayoutStatus["Paid"] = "PAID";
    PayoutStatus["Bounced"] = "BOUNCED";
})(PayoutStatus = exports.PayoutStatus || (exports.PayoutStatus = {}));
var PayoutItemType;
(function (PayoutItemType) {
    PayoutItemType["PaymentPaidOut"] = "PAYMENT_PAID_OUT";
    PayoutItemType["PaymentFailed"] = "PAYMENT_FAILED";
    PayoutItemType["PaymentChargedBack"] = "PAYMENT_CHARGED_BACK";
    PayoutItemType["PaymentRefunded"] = "PAYMENT_REFUNDED";
    PayoutItemType["Refund"] = "REFUND";
    PayoutItemType["GocardlessFee"] = "GOCARDLESS_FEE";
    PayoutItemType["AppFee"] = "APP_FEE";
    PayoutItemType["RevenueShare"] = "REVENUE_SHARE";
    PayoutItemType["SurchargeFee"] = "SURCHARGE_FEE";
})(PayoutItemType = exports.PayoutItemType || (exports.PayoutItemType = {}));
var RedirectFlowScheme;
(function (RedirectFlowScheme) {
    RedirectFlowScheme["Ach"] = "ACH";
    RedirectFlowScheme["Autogiro"] = "AUTOGIRO";
    RedirectFlowScheme["Bacs"] = "BACS";
    RedirectFlowScheme["Becs"] = "BECS";
    RedirectFlowScheme["BecsNz"] = "BECS_NZ";
    RedirectFlowScheme["Betalingsservice"] = "BETALINGSSERVICE";
    RedirectFlowScheme["Pad"] = "PAD";
    RedirectFlowScheme["SepaCore"] = "SEPA_CORE";
})(RedirectFlowScheme = exports.RedirectFlowScheme || (exports.RedirectFlowScheme = {}));
var RefundRefundType;
(function (RefundRefundType) {
    RefundRefundType["Mandate"] = "MANDATE";
    RefundRefundType["Payment"] = "PAYMENT";
})(RefundRefundType = exports.RefundRefundType || (exports.RefundRefundType = {}));
var RefundFxFxCurrency;
(function (RefundFxFxCurrency) {
    RefundFxFxCurrency["AUD"] = "AUD";
    RefundFxFxCurrency["CAD"] = "CAD";
    RefundFxFxCurrency["DKK"] = "DKK";
    RefundFxFxCurrency["EUR"] = "EUR";
    RefundFxFxCurrency["GBP"] = "GBP";
    RefundFxFxCurrency["NZD"] = "NZD";
    RefundFxFxCurrency["SEK"] = "SEK";
    RefundFxFxCurrency["USD"] = "USD";
})(RefundFxFxCurrency = exports.RefundFxFxCurrency || (exports.RefundFxFxCurrency = {}));
var RefundStatus;
(function (RefundStatus) {
    RefundStatus["Created"] = "CREATED";
    RefundStatus["PendingSubmission"] = "PENDING_SUBMISSION";
    RefundStatus["Submitted"] = "SUBMITTED";
    RefundStatus["Paid"] = "PAID";
    RefundStatus["Cancelled"] = "CANCELLED";
    RefundStatus["Bounced"] = "BOUNCED";
    RefundStatus["FundsReturned"] = "FUNDS_RETURNED";
})(RefundStatus = exports.RefundStatus || (exports.RefundStatus = {}));
// [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) code for the currency in
// which amounts will be paid out (after foreign exchange). Currently "AUD", "CAD", "DKK",
// "EUR", "GBP", "NZD", "SEK" and "USD" are supported. Present only if payouts will be (or
// were) made via foreign exchange.
var FxCurrency;
(function (FxCurrency) {
    FxCurrency["AUD"] = "AUD";
    FxCurrency["CAD"] = "CAD";
    FxCurrency["DKK"] = "DKK";
    FxCurrency["EUR"] = "EUR";
    FxCurrency["GBP"] = "GBP";
    FxCurrency["NZD"] = "NZD";
    FxCurrency["SEK"] = "SEK";
    FxCurrency["USD"] = "USD";
})(FxCurrency = exports.FxCurrency || (exports.FxCurrency = {}));
var SubscriptionIntervalUnit;
(function (SubscriptionIntervalUnit) {
    SubscriptionIntervalUnit["Weekly"] = "WEEKLY";
    SubscriptionIntervalUnit["Monthly"] = "MONTHLY";
    SubscriptionIntervalUnit["Yearly"] = "YEARLY";
})(SubscriptionIntervalUnit = exports.SubscriptionIntervalUnit || (exports.SubscriptionIntervalUnit = {}));
var SubscriptionMonth;
(function (SubscriptionMonth) {
    SubscriptionMonth["January"] = "JANUARY";
    SubscriptionMonth["February"] = "FEBRUARY";
    SubscriptionMonth["March"] = "MARCH";
    SubscriptionMonth["April"] = "APRIL";
    SubscriptionMonth["May"] = "MAY";
    SubscriptionMonth["June"] = "JUNE";
    SubscriptionMonth["July"] = "JULY";
    SubscriptionMonth["August"] = "AUGUST";
    SubscriptionMonth["September"] = "SEPTEMBER";
    SubscriptionMonth["October"] = "OCTOBER";
    SubscriptionMonth["November"] = "NOVEMBER";
    SubscriptionMonth["December"] = "DECEMBER";
})(SubscriptionMonth = exports.SubscriptionMonth || (exports.SubscriptionMonth = {}));
var SubscriptionStatus;
(function (SubscriptionStatus) {
    SubscriptionStatus["PendingCustomerApproval"] = "PENDING_CUSTOMER_APPROVAL";
    SubscriptionStatus["CustomerApprovalDenied"] = "CUSTOMER_APPROVAL_DENIED";
    SubscriptionStatus["Active"] = "ACTIVE";
    SubscriptionStatus["Finished"] = "FINISHED";
    SubscriptionStatus["Cancelled"] = "CANCELLED";
})(SubscriptionStatus = exports.SubscriptionStatus || (exports.SubscriptionStatus = {}));
//# sourceMappingURL=Types.js.map