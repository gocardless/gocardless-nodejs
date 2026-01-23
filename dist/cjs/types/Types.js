"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingRequestWithActionBillingRequestsMandateRequestAuthorisationSource = exports.BillingRequestWithActionBillingRequestsInstalmentScheduleRequestInstalmentsWithScheduleIntervalUnit = exports.BillingRequestWithActionBillingRequestsActionType = exports.BillingRequestWithActionBillingRequestsActionStatus = exports.BillingRequestWithActionBillingRequestsActionInstitutionGuessStatus = exports.BillingRequestWithActionBillingRequestsActionBankAuthorisationAuthorisationType = exports.BillingRequestWithActionBillingRequestsActionBankAuthorisationAdapter = exports.BillingRequestWithActionBillingRequestsNotificationType = exports.BillingRequestWithActionBillingRequestsStatus = exports.BillingRequestWithActionBillingRequestsAccountType = exports.BillingRequestWithActionBillingRequestsPurposeCode = exports.BillingRequestWithActionBankAuthorisationsAuthorisationType = exports.BillingRequestWithActionPurposeCode = exports.BillingRequestWithActionPaymentRequestFundsSettlement = exports.BillingRequestWithActionMandateRequestVerify = exports.BillingRequestWithActionMandateRequestFundsSettlement = exports.BillingRequestWithActionMandateRequestConstraintsPeriodicLimitPeriod = exports.BillingRequestWithActionMandateRequestConstraintsPeriodicLimitAlignment = exports.BillingRequestWithActionMandateRequestAuthorisationSource = exports.BillingRequestWithActionActionsCollectBankAccountAccountType = exports.BillingRequestTemplateMandateRequestConstraintsPeriodicLimitPeriod = exports.BillingRequestTemplateMandateRequestConstraintsPeriodicLimitAlignment = exports.BillingRequestTemplateMandateRequestVerify = exports.BillingRequestFlowPrefilledBankAccountAccountType = exports.BillingRequestSubscriptionRequestMonth = exports.BillingRequestSubscriptionRequestIntervalUnit = exports.BillingRequestResourcesCustomerBankAccountAccountType = exports.BillingRequestPaymentRequestFundsSettlement = exports.BillingRequestMandateRequestVerify = exports.BillingRequestMandateRequestFundsSettlement = exports.BillingRequestMandateRequestConstraintsPeriodicLimitPeriod = exports.BillingRequestMandateRequestConstraintsPeriodicLimitAlignment = exports.BillingRequestMandateRequestAuthorisationSource = exports.BillingRequestInstalmentScheduleRequestInstalmentsWithScheduleIntervalUnit = exports.BillingRequestActionType = exports.BillingRequestActionStatus = exports.BillingRequestActionInstitutionGuessStatus = exports.BillingRequestActionBankAuthorisationAuthorisationType = exports.BillingRequestActionBankAuthorisationAdapter = exports.BillingRequestNotificationType = exports.BillingRequestStatus = exports.BillingRequestAccountType = exports.BillingRequestPurposeCode = exports.BankDetailsLookupAvailableDebitScheme = exports.BankAuthorisationAuthorisationType = exports.BankAccountHolderVerificationStatus = exports.BankAccountHolderVerificationResult = exports.BankAccountHolderVerificationType = exports.BalanceCurrency = exports.BalanceBalanceType = void 0;
exports.OutboundPaymentCurrency = exports.OutboundPaymentStatus = exports.OutboundPaymentScheme = exports.NegativeBalanceLimitCurrency = exports.MandatePdfSubscriptionFrequency = exports.MandatePdfAccountType = exports.MandateImportEntryStatus = exports.MandateImportEntryBankAccountAccountType = exports.MandateImportStatus = exports.MandateImportScheme = exports.MandateStatus = exports.MandateFundsSettlement = exports.MandateConsentType = exports.MandateConsentParametersPeriod = exports.MandateAuthorisationSource = exports.InstitutionStatus = exports.InstalmentScheduleStatus = exports.InstalmentScheduleInstalmentsIntervalUnit = exports.InstalmentScheduleCurrency = exports.ExportExportType = exports.EventSourceType = exports.EventResourceType = exports.EventDetailsScheme = exports.EventDetailsOrigin = exports.EventInclude = exports.CustomerNotificationType = exports.CustomerNotificationActionTaken = exports.CustomerBankAccountAccountType = exports.CustomerSortField = exports.CustomerSortDirection = exports.CustomerCurrency = exports.CreditorBankAccountVerificationStatus = exports.CreditorBankAccountAccountType = exports.CreditorVerificationStatus = exports.CreditorSchemeIdentifierStatus = exports.CreditorSchemeIdentifierScheme = exports.CreditorSchemeIdentifierCurrency = exports.CreditorFxPayoutCurrency = exports.CreditorCreditorType = exports.BlockReferenceType = exports.BlockReasonType = exports.BlockBlockType = exports.BillingRequestWithActionBillingRequestsSubscriptionRequestMonth = exports.BillingRequestWithActionBillingRequestsSubscriptionRequestIntervalUnit = exports.BillingRequestWithActionBillingRequestsResourcesCustomerBankAccountAccountType = exports.BillingRequestWithActionBillingRequestsPaymentRequestFundsSettlement = exports.BillingRequestWithActionBillingRequestsMandateRequestVerify = exports.BillingRequestWithActionBillingRequestsMandateRequestFundsSettlement = exports.BillingRequestWithActionBillingRequestsMandateRequestConstraintsPeriodicLimitPeriod = exports.BillingRequestWithActionBillingRequestsMandateRequestConstraintsPeriodicLimitAlignment = void 0;
exports.SubscriptionStatus = exports.SubscriptionMonth = exports.SubscriptionIntervalUnit = exports.FxCurrency = exports.SchemeIdentifierStatus = exports.SchemeIdentifierCurrency = exports.SchemeIdentifierScheme = exports.RefundStatus = exports.RefundFxFxCurrency = exports.RefundRefundType = exports.RedirectFlowScheme = exports.RedirectFlowPrefilledBankAccountAccountType = exports.PayoutItemType = exports.PayoutItemTaxisCurrency = exports.PayoutItemInclude2020TaxCutover = exports.PayoutFxFxCurrency = exports.PayoutStatus = exports.PayoutPayoutType = exports.PayoutCurrency = exports.PaymentAccountTransactionCurrency = exports.PaymentAccountTransactionDirection = exports.PaymentFxFxCurrency = exports.PaymentStatus = exports.PaymentSortField = exports.PaymentSortDirection = exports.PaymentCurrency = exports.PayerAuthorisationStatus = exports.PayerAuthorisationMandateScheme = exports.PayerAuthorisationBankAccountAccountType = exports.OutboundPaymentVerificationsRecipientBankAccountHolderVerificationType = exports.OutboundPaymentVerificationsRecipientBankAccountHolderVerificationResult = void 0;
var BalanceBalanceType;
(function (BalanceBalanceType) {
    BalanceBalanceType["ConfirmedFunds"] = "confirmed_funds";
    BalanceBalanceType["PendingPayouts"] = "pending_payouts";
    BalanceBalanceType["PendingPaymentsSubmitted"] = "pending_payments_submitted";
})(BalanceBalanceType = exports.BalanceBalanceType || (exports.BalanceBalanceType = {}));
var BalanceCurrency;
(function (BalanceCurrency) {
    BalanceCurrency["AUD"] = "AUD";
    BalanceCurrency["CAD"] = "CAD";
    BalanceCurrency["DKK"] = "DKK";
    BalanceCurrency["EUR"] = "EUR";
    BalanceCurrency["GBP"] = "GBP";
    BalanceCurrency["NZD"] = "NZD";
    BalanceCurrency["SEK"] = "SEK";
    BalanceCurrency["USD"] = "USD";
})(BalanceCurrency = exports.BalanceCurrency || (exports.BalanceCurrency = {}));
var BankAccountHolderVerificationType;
(function (BankAccountHolderVerificationType) {
    BankAccountHolderVerificationType["ConfirmationOfPayee"] = "confirmation_of_payee";
})(BankAccountHolderVerificationType = exports.BankAccountHolderVerificationType || (exports.BankAccountHolderVerificationType = {}));
var BankAccountHolderVerificationResult;
(function (BankAccountHolderVerificationResult) {
    BankAccountHolderVerificationResult["FullMatch"] = "full_match";
    BankAccountHolderVerificationResult["PartialMatch"] = "partial_match";
    BankAccountHolderVerificationResult["NoMatch"] = "no_match";
    BankAccountHolderVerificationResult["UnableToMatch"] = "unable_to_match";
})(BankAccountHolderVerificationResult = exports.BankAccountHolderVerificationResult || (exports.BankAccountHolderVerificationResult = {}));
var BankAccountHolderVerificationStatus;
(function (BankAccountHolderVerificationStatus) {
    BankAccountHolderVerificationStatus["Pending"] = "pending";
    BankAccountHolderVerificationStatus["Completed"] = "completed";
})(BankAccountHolderVerificationStatus = exports.BankAccountHolderVerificationStatus || (exports.BankAccountHolderVerificationStatus = {}));
var BankAuthorisationAuthorisationType;
(function (BankAuthorisationAuthorisationType) {
    BankAuthorisationAuthorisationType["Mandate"] = "mandate";
    BankAuthorisationAuthorisationType["Payment"] = "payment";
})(BankAuthorisationAuthorisationType = exports.BankAuthorisationAuthorisationType || (exports.BankAuthorisationAuthorisationType = {}));
var BankDetailsLookupAvailableDebitScheme;
(function (BankDetailsLookupAvailableDebitScheme) {
    BankDetailsLookupAvailableDebitScheme["Ach"] = "ach";
    BankDetailsLookupAvailableDebitScheme["Autogiro"] = "autogiro";
    BankDetailsLookupAvailableDebitScheme["Bacs"] = "bacs";
    BankDetailsLookupAvailableDebitScheme["Becs"] = "becs";
    BankDetailsLookupAvailableDebitScheme["BecsNz"] = "becs_nz";
    BankDetailsLookupAvailableDebitScheme["Betalingsservice"] = "betalingsservice";
    BankDetailsLookupAvailableDebitScheme["FasterPayments"] = "faster_payments";
    BankDetailsLookupAvailableDebitScheme["Pad"] = "pad";
    BankDetailsLookupAvailableDebitScheme["PayTo"] = "pay_to";
    BankDetailsLookupAvailableDebitScheme["SepaCore"] = "sepa_core";
})(BankDetailsLookupAvailableDebitScheme = exports.BankDetailsLookupAvailableDebitScheme || (exports.BankDetailsLookupAvailableDebitScheme = {}));
var BillingRequestPurposeCode;
(function (BillingRequestPurposeCode) {
    BillingRequestPurposeCode["Mortgage"] = "mortgage";
    BillingRequestPurposeCode["Utility"] = "utility";
    BillingRequestPurposeCode["Loan"] = "loan";
    BillingRequestPurposeCode["DependantSupport"] = "dependant_support";
    BillingRequestPurposeCode["Gambling"] = "gambling";
    BillingRequestPurposeCode["Retail"] = "retail";
    BillingRequestPurposeCode["Salary"] = "salary";
    BillingRequestPurposeCode["Personal"] = "personal";
    BillingRequestPurposeCode["Government"] = "government";
    BillingRequestPurposeCode["Pension"] = "pension";
    BillingRequestPurposeCode["Tax"] = "tax";
    BillingRequestPurposeCode["Other"] = "other";
    BillingRequestPurposeCode["Epayment"] = "Epayment";
    BillingRequestPurposeCode["Commercial"] = "Commercial";
    BillingRequestPurposeCode["OtherPayment"] = "OtherPayment";
    BillingRequestPurposeCode["Trade"] = "Trade";
})(BillingRequestPurposeCode = exports.BillingRequestPurposeCode || (exports.BillingRequestPurposeCode = {}));
var BillingRequestAccountType;
(function (BillingRequestAccountType) {
    BillingRequestAccountType["Savings"] = "savings";
    BillingRequestAccountType["Checking"] = "checking";
})(BillingRequestAccountType = exports.BillingRequestAccountType || (exports.BillingRequestAccountType = {}));
var BillingRequestStatus;
(function (BillingRequestStatus) {
    BillingRequestStatus["Pending"] = "pending";
    BillingRequestStatus["ReadyToFulfil"] = "ready_to_fulfil";
    BillingRequestStatus["Fulfilling"] = "fulfilling";
    BillingRequestStatus["Fulfilled"] = "fulfilled";
    BillingRequestStatus["Cancelled"] = "cancelled";
})(BillingRequestStatus = exports.BillingRequestStatus || (exports.BillingRequestStatus = {}));
var BillingRequestNotificationType;
(function (BillingRequestNotificationType) {
    BillingRequestNotificationType["Email"] = "email";
})(BillingRequestNotificationType = exports.BillingRequestNotificationType || (exports.BillingRequestNotificationType = {}));
var BillingRequestActionBankAuthorisationAdapter;
(function (BillingRequestActionBankAuthorisationAdapter) {
    BillingRequestActionBankAuthorisationAdapter["OpenBankingGatewayPis"] = "open_banking_gateway_pis";
    BillingRequestActionBankAuthorisationAdapter["PlaidAis"] = "plaid_ais";
    BillingRequestActionBankAuthorisationAdapter["OpenBankingGatewayAis"] = "open_banking_gateway_ais";
    BillingRequestActionBankAuthorisationAdapter["BankidAis"] = "bankid_ais";
    BillingRequestActionBankAuthorisationAdapter["BankPayRecurring"] = "bank_pay_recurring";
})(BillingRequestActionBankAuthorisationAdapter = exports.BillingRequestActionBankAuthorisationAdapter || (exports.BillingRequestActionBankAuthorisationAdapter = {}));
var BillingRequestActionBankAuthorisationAuthorisationType;
(function (BillingRequestActionBankAuthorisationAuthorisationType) {
    BillingRequestActionBankAuthorisationAuthorisationType["Payment"] = "payment";
    BillingRequestActionBankAuthorisationAuthorisationType["Mandate"] = "mandate";
})(BillingRequestActionBankAuthorisationAuthorisationType = exports.BillingRequestActionBankAuthorisationAuthorisationType || (exports.BillingRequestActionBankAuthorisationAuthorisationType = {}));
var BillingRequestActionInstitutionGuessStatus;
(function (BillingRequestActionInstitutionGuessStatus) {
    BillingRequestActionInstitutionGuessStatus["NotNeeded"] = "not_needed";
    BillingRequestActionInstitutionGuessStatus["Pending"] = "pending";
    BillingRequestActionInstitutionGuessStatus["Failed"] = "failed";
    BillingRequestActionInstitutionGuessStatus["Success"] = "success";
})(BillingRequestActionInstitutionGuessStatus = exports.BillingRequestActionInstitutionGuessStatus || (exports.BillingRequestActionInstitutionGuessStatus = {}));
var BillingRequestActionStatus;
(function (BillingRequestActionStatus) {
    BillingRequestActionStatus["Pending"] = "pending";
    BillingRequestActionStatus["Completed"] = "completed";
})(BillingRequestActionStatus = exports.BillingRequestActionStatus || (exports.BillingRequestActionStatus = {}));
var BillingRequestActionType;
(function (BillingRequestActionType) {
    BillingRequestActionType["ChooseCurrency"] = "choose_currency";
    BillingRequestActionType["CollectAmount"] = "collect_amount";
    BillingRequestActionType["CollectCustomerDetails"] = "collect_customer_details";
    BillingRequestActionType["CollectBankAccount"] = "collect_bank_account";
    BillingRequestActionType["BankAuthorisation"] = "bank_authorisation";
    BillingRequestActionType["ConfirmPayerDetails"] = "confirm_payer_details";
    BillingRequestActionType["SelectInstitution"] = "select_institution";
})(BillingRequestActionType = exports.BillingRequestActionType || (exports.BillingRequestActionType = {}));
var BillingRequestInstalmentScheduleRequestInstalmentsWithScheduleIntervalUnit;
(function (BillingRequestInstalmentScheduleRequestInstalmentsWithScheduleIntervalUnit) {
    BillingRequestInstalmentScheduleRequestInstalmentsWithScheduleIntervalUnit["Weekly"] = "weekly";
    BillingRequestInstalmentScheduleRequestInstalmentsWithScheduleIntervalUnit["Monthly"] = "monthly";
    BillingRequestInstalmentScheduleRequestInstalmentsWithScheduleIntervalUnit["Yearly"] = "yearly";
})(BillingRequestInstalmentScheduleRequestInstalmentsWithScheduleIntervalUnit = exports.BillingRequestInstalmentScheduleRequestInstalmentsWithScheduleIntervalUnit || (exports.BillingRequestInstalmentScheduleRequestInstalmentsWithScheduleIntervalUnit = {}));
var BillingRequestMandateRequestAuthorisationSource;
(function (BillingRequestMandateRequestAuthorisationSource) {
    BillingRequestMandateRequestAuthorisationSource["Web"] = "web";
    BillingRequestMandateRequestAuthorisationSource["Telephone"] = "telephone";
    BillingRequestMandateRequestAuthorisationSource["Paper"] = "paper";
})(BillingRequestMandateRequestAuthorisationSource = exports.BillingRequestMandateRequestAuthorisationSource || (exports.BillingRequestMandateRequestAuthorisationSource = {}));
var BillingRequestMandateRequestConstraintsPeriodicLimitAlignment;
(function (BillingRequestMandateRequestConstraintsPeriodicLimitAlignment) {
    BillingRequestMandateRequestConstraintsPeriodicLimitAlignment["Calendar"] = "calendar";
    BillingRequestMandateRequestConstraintsPeriodicLimitAlignment["CreationDate"] = "creation_date";
})(BillingRequestMandateRequestConstraintsPeriodicLimitAlignment = exports.BillingRequestMandateRequestConstraintsPeriodicLimitAlignment || (exports.BillingRequestMandateRequestConstraintsPeriodicLimitAlignment = {}));
var BillingRequestMandateRequestConstraintsPeriodicLimitPeriod;
(function (BillingRequestMandateRequestConstraintsPeriodicLimitPeriod) {
    BillingRequestMandateRequestConstraintsPeriodicLimitPeriod["Day"] = "day";
    BillingRequestMandateRequestConstraintsPeriodicLimitPeriod["Week"] = "week";
    BillingRequestMandateRequestConstraintsPeriodicLimitPeriod["Month"] = "month";
    BillingRequestMandateRequestConstraintsPeriodicLimitPeriod["Year"] = "year";
    BillingRequestMandateRequestConstraintsPeriodicLimitPeriod["Flexible"] = "flexible";
})(BillingRequestMandateRequestConstraintsPeriodicLimitPeriod = exports.BillingRequestMandateRequestConstraintsPeriodicLimitPeriod || (exports.BillingRequestMandateRequestConstraintsPeriodicLimitPeriod = {}));
var BillingRequestMandateRequestFundsSettlement;
(function (BillingRequestMandateRequestFundsSettlement) {
    BillingRequestMandateRequestFundsSettlement["Managed"] = "managed";
    BillingRequestMandateRequestFundsSettlement["Direct"] = "direct";
})(BillingRequestMandateRequestFundsSettlement = exports.BillingRequestMandateRequestFundsSettlement || (exports.BillingRequestMandateRequestFundsSettlement = {}));
var BillingRequestMandateRequestVerify;
(function (BillingRequestMandateRequestVerify) {
    BillingRequestMandateRequestVerify["Minimum"] = "minimum";
    BillingRequestMandateRequestVerify["Recommended"] = "recommended";
    BillingRequestMandateRequestVerify["WhenAvailable"] = "when_available";
    BillingRequestMandateRequestVerify["Always"] = "always";
})(BillingRequestMandateRequestVerify = exports.BillingRequestMandateRequestVerify || (exports.BillingRequestMandateRequestVerify = {}));
var BillingRequestPaymentRequestFundsSettlement;
(function (BillingRequestPaymentRequestFundsSettlement) {
    BillingRequestPaymentRequestFundsSettlement["Managed"] = "managed";
    BillingRequestPaymentRequestFundsSettlement["Direct"] = "direct";
})(BillingRequestPaymentRequestFundsSettlement = exports.BillingRequestPaymentRequestFundsSettlement || (exports.BillingRequestPaymentRequestFundsSettlement = {}));
var BillingRequestResourcesCustomerBankAccountAccountType;
(function (BillingRequestResourcesCustomerBankAccountAccountType) {
    BillingRequestResourcesCustomerBankAccountAccountType["Savings"] = "savings";
    BillingRequestResourcesCustomerBankAccountAccountType["Checking"] = "checking";
})(BillingRequestResourcesCustomerBankAccountAccountType = exports.BillingRequestResourcesCustomerBankAccountAccountType || (exports.BillingRequestResourcesCustomerBankAccountAccountType = {}));
var BillingRequestSubscriptionRequestIntervalUnit;
(function (BillingRequestSubscriptionRequestIntervalUnit) {
    BillingRequestSubscriptionRequestIntervalUnit["Weekly"] = "weekly";
    BillingRequestSubscriptionRequestIntervalUnit["Monthly"] = "monthly";
    BillingRequestSubscriptionRequestIntervalUnit["Yearly"] = "yearly";
})(BillingRequestSubscriptionRequestIntervalUnit = exports.BillingRequestSubscriptionRequestIntervalUnit || (exports.BillingRequestSubscriptionRequestIntervalUnit = {}));
var BillingRequestSubscriptionRequestMonth;
(function (BillingRequestSubscriptionRequestMonth) {
    BillingRequestSubscriptionRequestMonth["January"] = "january";
    BillingRequestSubscriptionRequestMonth["February"] = "february";
    BillingRequestSubscriptionRequestMonth["March"] = "march";
    BillingRequestSubscriptionRequestMonth["April"] = "april";
    BillingRequestSubscriptionRequestMonth["May"] = "may";
    BillingRequestSubscriptionRequestMonth["June"] = "june";
    BillingRequestSubscriptionRequestMonth["July"] = "july";
    BillingRequestSubscriptionRequestMonth["August"] = "august";
    BillingRequestSubscriptionRequestMonth["September"] = "september";
    BillingRequestSubscriptionRequestMonth["October"] = "october";
    BillingRequestSubscriptionRequestMonth["November"] = "november";
    BillingRequestSubscriptionRequestMonth["December"] = "december";
})(BillingRequestSubscriptionRequestMonth = exports.BillingRequestSubscriptionRequestMonth || (exports.BillingRequestSubscriptionRequestMonth = {}));
var BillingRequestFlowPrefilledBankAccountAccountType;
(function (BillingRequestFlowPrefilledBankAccountAccountType) {
    BillingRequestFlowPrefilledBankAccountAccountType["Savings"] = "savings";
    BillingRequestFlowPrefilledBankAccountAccountType["Checking"] = "checking";
})(BillingRequestFlowPrefilledBankAccountAccountType = exports.BillingRequestFlowPrefilledBankAccountAccountType || (exports.BillingRequestFlowPrefilledBankAccountAccountType = {}));
var BillingRequestTemplateMandateRequestVerify;
(function (BillingRequestTemplateMandateRequestVerify) {
    BillingRequestTemplateMandateRequestVerify["Minimum"] = "minimum";
    BillingRequestTemplateMandateRequestVerify["Recommended"] = "recommended";
    BillingRequestTemplateMandateRequestVerify["WhenAvailable"] = "when_available";
    BillingRequestTemplateMandateRequestVerify["Always"] = "always";
})(BillingRequestTemplateMandateRequestVerify = exports.BillingRequestTemplateMandateRequestVerify || (exports.BillingRequestTemplateMandateRequestVerify = {}));
var BillingRequestTemplateMandateRequestConstraintsPeriodicLimitAlignment;
(function (BillingRequestTemplateMandateRequestConstraintsPeriodicLimitAlignment) {
    BillingRequestTemplateMandateRequestConstraintsPeriodicLimitAlignment["Calendar"] = "calendar";
    BillingRequestTemplateMandateRequestConstraintsPeriodicLimitAlignment["CreationDate"] = "creation_date";
})(BillingRequestTemplateMandateRequestConstraintsPeriodicLimitAlignment = exports.BillingRequestTemplateMandateRequestConstraintsPeriodicLimitAlignment || (exports.BillingRequestTemplateMandateRequestConstraintsPeriodicLimitAlignment = {}));
var BillingRequestTemplateMandateRequestConstraintsPeriodicLimitPeriod;
(function (BillingRequestTemplateMandateRequestConstraintsPeriodicLimitPeriod) {
    BillingRequestTemplateMandateRequestConstraintsPeriodicLimitPeriod["Day"] = "day";
    BillingRequestTemplateMandateRequestConstraintsPeriodicLimitPeriod["Week"] = "week";
    BillingRequestTemplateMandateRequestConstraintsPeriodicLimitPeriod["Month"] = "month";
    BillingRequestTemplateMandateRequestConstraintsPeriodicLimitPeriod["Year"] = "year";
    BillingRequestTemplateMandateRequestConstraintsPeriodicLimitPeriod["Flexible"] = "flexible";
})(BillingRequestTemplateMandateRequestConstraintsPeriodicLimitPeriod = exports.BillingRequestTemplateMandateRequestConstraintsPeriodicLimitPeriod || (exports.BillingRequestTemplateMandateRequestConstraintsPeriodicLimitPeriod = {}));
var BillingRequestWithActionActionsCollectBankAccountAccountType;
(function (BillingRequestWithActionActionsCollectBankAccountAccountType) {
    BillingRequestWithActionActionsCollectBankAccountAccountType["Savings"] = "savings";
    BillingRequestWithActionActionsCollectBankAccountAccountType["Checking"] = "checking";
})(BillingRequestWithActionActionsCollectBankAccountAccountType = exports.BillingRequestWithActionActionsCollectBankAccountAccountType || (exports.BillingRequestWithActionActionsCollectBankAccountAccountType = {}));
var BillingRequestWithActionMandateRequestAuthorisationSource;
(function (BillingRequestWithActionMandateRequestAuthorisationSource) {
    BillingRequestWithActionMandateRequestAuthorisationSource["Web"] = "web";
    BillingRequestWithActionMandateRequestAuthorisationSource["Telephone"] = "telephone";
    BillingRequestWithActionMandateRequestAuthorisationSource["Paper"] = "paper";
})(BillingRequestWithActionMandateRequestAuthorisationSource = exports.BillingRequestWithActionMandateRequestAuthorisationSource || (exports.BillingRequestWithActionMandateRequestAuthorisationSource = {}));
var BillingRequestWithActionMandateRequestConstraintsPeriodicLimitAlignment;
(function (BillingRequestWithActionMandateRequestConstraintsPeriodicLimitAlignment) {
    BillingRequestWithActionMandateRequestConstraintsPeriodicLimitAlignment["Calendar"] = "calendar";
    BillingRequestWithActionMandateRequestConstraintsPeriodicLimitAlignment["CreationDate"] = "creation_date";
})(BillingRequestWithActionMandateRequestConstraintsPeriodicLimitAlignment = exports.BillingRequestWithActionMandateRequestConstraintsPeriodicLimitAlignment || (exports.BillingRequestWithActionMandateRequestConstraintsPeriodicLimitAlignment = {}));
var BillingRequestWithActionMandateRequestConstraintsPeriodicLimitPeriod;
(function (BillingRequestWithActionMandateRequestConstraintsPeriodicLimitPeriod) {
    BillingRequestWithActionMandateRequestConstraintsPeriodicLimitPeriod["Day"] = "day";
    BillingRequestWithActionMandateRequestConstraintsPeriodicLimitPeriod["Week"] = "week";
    BillingRequestWithActionMandateRequestConstraintsPeriodicLimitPeriod["Month"] = "month";
    BillingRequestWithActionMandateRequestConstraintsPeriodicLimitPeriod["Year"] = "year";
    BillingRequestWithActionMandateRequestConstraintsPeriodicLimitPeriod["Flexible"] = "flexible";
})(BillingRequestWithActionMandateRequestConstraintsPeriodicLimitPeriod = exports.BillingRequestWithActionMandateRequestConstraintsPeriodicLimitPeriod || (exports.BillingRequestWithActionMandateRequestConstraintsPeriodicLimitPeriod = {}));
var BillingRequestWithActionMandateRequestFundsSettlement;
(function (BillingRequestWithActionMandateRequestFundsSettlement) {
    BillingRequestWithActionMandateRequestFundsSettlement["Managed"] = "managed";
    BillingRequestWithActionMandateRequestFundsSettlement["Direct"] = "direct";
})(BillingRequestWithActionMandateRequestFundsSettlement = exports.BillingRequestWithActionMandateRequestFundsSettlement || (exports.BillingRequestWithActionMandateRequestFundsSettlement = {}));
var BillingRequestWithActionMandateRequestVerify;
(function (BillingRequestWithActionMandateRequestVerify) {
    BillingRequestWithActionMandateRequestVerify["Minimum"] = "minimum";
    BillingRequestWithActionMandateRequestVerify["Recommended"] = "recommended";
    BillingRequestWithActionMandateRequestVerify["WhenAvailable"] = "when_available";
    BillingRequestWithActionMandateRequestVerify["Always"] = "always";
})(BillingRequestWithActionMandateRequestVerify = exports.BillingRequestWithActionMandateRequestVerify || (exports.BillingRequestWithActionMandateRequestVerify = {}));
var BillingRequestWithActionPaymentRequestFundsSettlement;
(function (BillingRequestWithActionPaymentRequestFundsSettlement) {
    BillingRequestWithActionPaymentRequestFundsSettlement["Managed"] = "managed";
    BillingRequestWithActionPaymentRequestFundsSettlement["Direct"] = "direct";
})(BillingRequestWithActionPaymentRequestFundsSettlement = exports.BillingRequestWithActionPaymentRequestFundsSettlement || (exports.BillingRequestWithActionPaymentRequestFundsSettlement = {}));
var BillingRequestWithActionPurposeCode;
(function (BillingRequestWithActionPurposeCode) {
    BillingRequestWithActionPurposeCode["Mortgage"] = "mortgage";
    BillingRequestWithActionPurposeCode["Utility"] = "utility";
    BillingRequestWithActionPurposeCode["Loan"] = "loan";
    BillingRequestWithActionPurposeCode["DependantSupport"] = "dependant_support";
    BillingRequestWithActionPurposeCode["Gambling"] = "gambling";
    BillingRequestWithActionPurposeCode["Retail"] = "retail";
    BillingRequestWithActionPurposeCode["Salary"] = "salary";
    BillingRequestWithActionPurposeCode["Personal"] = "personal";
    BillingRequestWithActionPurposeCode["Government"] = "government";
    BillingRequestWithActionPurposeCode["Pension"] = "pension";
    BillingRequestWithActionPurposeCode["Tax"] = "tax";
    BillingRequestWithActionPurposeCode["Other"] = "other";
    BillingRequestWithActionPurposeCode["Epayment"] = "Epayment";
    BillingRequestWithActionPurposeCode["Commercial"] = "Commercial";
    BillingRequestWithActionPurposeCode["OtherPayment"] = "OtherPayment";
    BillingRequestWithActionPurposeCode["Trade"] = "Trade";
})(BillingRequestWithActionPurposeCode = exports.BillingRequestWithActionPurposeCode || (exports.BillingRequestWithActionPurposeCode = {}));
var BillingRequestWithActionBankAuthorisationsAuthorisationType;
(function (BillingRequestWithActionBankAuthorisationsAuthorisationType) {
    BillingRequestWithActionBankAuthorisationsAuthorisationType["Mandate"] = "mandate";
    BillingRequestWithActionBankAuthorisationsAuthorisationType["Payment"] = "payment";
})(BillingRequestWithActionBankAuthorisationsAuthorisationType = exports.BillingRequestWithActionBankAuthorisationsAuthorisationType || (exports.BillingRequestWithActionBankAuthorisationsAuthorisationType = {}));
var BillingRequestWithActionBillingRequestsPurposeCode;
(function (BillingRequestWithActionBillingRequestsPurposeCode) {
    BillingRequestWithActionBillingRequestsPurposeCode["Mortgage"] = "mortgage";
    BillingRequestWithActionBillingRequestsPurposeCode["Utility"] = "utility";
    BillingRequestWithActionBillingRequestsPurposeCode["Loan"] = "loan";
    BillingRequestWithActionBillingRequestsPurposeCode["DependantSupport"] = "dependant_support";
    BillingRequestWithActionBillingRequestsPurposeCode["Gambling"] = "gambling";
    BillingRequestWithActionBillingRequestsPurposeCode["Retail"] = "retail";
    BillingRequestWithActionBillingRequestsPurposeCode["Salary"] = "salary";
    BillingRequestWithActionBillingRequestsPurposeCode["Personal"] = "personal";
    BillingRequestWithActionBillingRequestsPurposeCode["Government"] = "government";
    BillingRequestWithActionBillingRequestsPurposeCode["Pension"] = "pension";
    BillingRequestWithActionBillingRequestsPurposeCode["Tax"] = "tax";
    BillingRequestWithActionBillingRequestsPurposeCode["Other"] = "other";
    BillingRequestWithActionBillingRequestsPurposeCode["Epayment"] = "Epayment";
    BillingRequestWithActionBillingRequestsPurposeCode["Commercial"] = "Commercial";
    BillingRequestWithActionBillingRequestsPurposeCode["OtherPayment"] = "OtherPayment";
    BillingRequestWithActionBillingRequestsPurposeCode["Trade"] = "Trade";
})(BillingRequestWithActionBillingRequestsPurposeCode = exports.BillingRequestWithActionBillingRequestsPurposeCode || (exports.BillingRequestWithActionBillingRequestsPurposeCode = {}));
var BillingRequestWithActionBillingRequestsAccountType;
(function (BillingRequestWithActionBillingRequestsAccountType) {
    BillingRequestWithActionBillingRequestsAccountType["Savings"] = "savings";
    BillingRequestWithActionBillingRequestsAccountType["Checking"] = "checking";
})(BillingRequestWithActionBillingRequestsAccountType = exports.BillingRequestWithActionBillingRequestsAccountType || (exports.BillingRequestWithActionBillingRequestsAccountType = {}));
var BillingRequestWithActionBillingRequestsStatus;
(function (BillingRequestWithActionBillingRequestsStatus) {
    BillingRequestWithActionBillingRequestsStatus["Pending"] = "pending";
    BillingRequestWithActionBillingRequestsStatus["ReadyToFulfil"] = "ready_to_fulfil";
    BillingRequestWithActionBillingRequestsStatus["Fulfilling"] = "fulfilling";
    BillingRequestWithActionBillingRequestsStatus["Fulfilled"] = "fulfilled";
    BillingRequestWithActionBillingRequestsStatus["Cancelled"] = "cancelled";
})(BillingRequestWithActionBillingRequestsStatus = exports.BillingRequestWithActionBillingRequestsStatus || (exports.BillingRequestWithActionBillingRequestsStatus = {}));
var BillingRequestWithActionBillingRequestsNotificationType;
(function (BillingRequestWithActionBillingRequestsNotificationType) {
    BillingRequestWithActionBillingRequestsNotificationType["Email"] = "email";
})(BillingRequestWithActionBillingRequestsNotificationType = exports.BillingRequestWithActionBillingRequestsNotificationType || (exports.BillingRequestWithActionBillingRequestsNotificationType = {}));
var BillingRequestWithActionBillingRequestsActionBankAuthorisationAdapter;
(function (BillingRequestWithActionBillingRequestsActionBankAuthorisationAdapter) {
    BillingRequestWithActionBillingRequestsActionBankAuthorisationAdapter["OpenBankingGatewayPis"] = "open_banking_gateway_pis";
    BillingRequestWithActionBillingRequestsActionBankAuthorisationAdapter["PlaidAis"] = "plaid_ais";
    BillingRequestWithActionBillingRequestsActionBankAuthorisationAdapter["OpenBankingGatewayAis"] = "open_banking_gateway_ais";
    BillingRequestWithActionBillingRequestsActionBankAuthorisationAdapter["BankidAis"] = "bankid_ais";
    BillingRequestWithActionBillingRequestsActionBankAuthorisationAdapter["BankPayRecurring"] = "bank_pay_recurring";
})(BillingRequestWithActionBillingRequestsActionBankAuthorisationAdapter = exports.BillingRequestWithActionBillingRequestsActionBankAuthorisationAdapter || (exports.BillingRequestWithActionBillingRequestsActionBankAuthorisationAdapter = {}));
var BillingRequestWithActionBillingRequestsActionBankAuthorisationAuthorisationType;
(function (BillingRequestWithActionBillingRequestsActionBankAuthorisationAuthorisationType) {
    BillingRequestWithActionBillingRequestsActionBankAuthorisationAuthorisationType["Payment"] = "payment";
    BillingRequestWithActionBillingRequestsActionBankAuthorisationAuthorisationType["Mandate"] = "mandate";
})(BillingRequestWithActionBillingRequestsActionBankAuthorisationAuthorisationType = exports.BillingRequestWithActionBillingRequestsActionBankAuthorisationAuthorisationType || (exports.BillingRequestWithActionBillingRequestsActionBankAuthorisationAuthorisationType = {}));
var BillingRequestWithActionBillingRequestsActionInstitutionGuessStatus;
(function (BillingRequestWithActionBillingRequestsActionInstitutionGuessStatus) {
    BillingRequestWithActionBillingRequestsActionInstitutionGuessStatus["NotNeeded"] = "not_needed";
    BillingRequestWithActionBillingRequestsActionInstitutionGuessStatus["Pending"] = "pending";
    BillingRequestWithActionBillingRequestsActionInstitutionGuessStatus["Failed"] = "failed";
    BillingRequestWithActionBillingRequestsActionInstitutionGuessStatus["Success"] = "success";
})(BillingRequestWithActionBillingRequestsActionInstitutionGuessStatus = exports.BillingRequestWithActionBillingRequestsActionInstitutionGuessStatus || (exports.BillingRequestWithActionBillingRequestsActionInstitutionGuessStatus = {}));
var BillingRequestWithActionBillingRequestsActionStatus;
(function (BillingRequestWithActionBillingRequestsActionStatus) {
    BillingRequestWithActionBillingRequestsActionStatus["Pending"] = "pending";
    BillingRequestWithActionBillingRequestsActionStatus["Completed"] = "completed";
})(BillingRequestWithActionBillingRequestsActionStatus = exports.BillingRequestWithActionBillingRequestsActionStatus || (exports.BillingRequestWithActionBillingRequestsActionStatus = {}));
var BillingRequestWithActionBillingRequestsActionType;
(function (BillingRequestWithActionBillingRequestsActionType) {
    BillingRequestWithActionBillingRequestsActionType["ChooseCurrency"] = "choose_currency";
    BillingRequestWithActionBillingRequestsActionType["CollectAmount"] = "collect_amount";
    BillingRequestWithActionBillingRequestsActionType["CollectCustomerDetails"] = "collect_customer_details";
    BillingRequestWithActionBillingRequestsActionType["CollectBankAccount"] = "collect_bank_account";
    BillingRequestWithActionBillingRequestsActionType["BankAuthorisation"] = "bank_authorisation";
    BillingRequestWithActionBillingRequestsActionType["ConfirmPayerDetails"] = "confirm_payer_details";
    BillingRequestWithActionBillingRequestsActionType["SelectInstitution"] = "select_institution";
})(BillingRequestWithActionBillingRequestsActionType = exports.BillingRequestWithActionBillingRequestsActionType || (exports.BillingRequestWithActionBillingRequestsActionType = {}));
var BillingRequestWithActionBillingRequestsInstalmentScheduleRequestInstalmentsWithScheduleIntervalUnit;
(function (BillingRequestWithActionBillingRequestsInstalmentScheduleRequestInstalmentsWithScheduleIntervalUnit) {
    BillingRequestWithActionBillingRequestsInstalmentScheduleRequestInstalmentsWithScheduleIntervalUnit["Weekly"] = "weekly";
    BillingRequestWithActionBillingRequestsInstalmentScheduleRequestInstalmentsWithScheduleIntervalUnit["Monthly"] = "monthly";
    BillingRequestWithActionBillingRequestsInstalmentScheduleRequestInstalmentsWithScheduleIntervalUnit["Yearly"] = "yearly";
})(BillingRequestWithActionBillingRequestsInstalmentScheduleRequestInstalmentsWithScheduleIntervalUnit = exports.BillingRequestWithActionBillingRequestsInstalmentScheduleRequestInstalmentsWithScheduleIntervalUnit || (exports.BillingRequestWithActionBillingRequestsInstalmentScheduleRequestInstalmentsWithScheduleIntervalUnit = {}));
var BillingRequestWithActionBillingRequestsMandateRequestAuthorisationSource;
(function (BillingRequestWithActionBillingRequestsMandateRequestAuthorisationSource) {
    BillingRequestWithActionBillingRequestsMandateRequestAuthorisationSource["Web"] = "web";
    BillingRequestWithActionBillingRequestsMandateRequestAuthorisationSource["Telephone"] = "telephone";
    BillingRequestWithActionBillingRequestsMandateRequestAuthorisationSource["Paper"] = "paper";
})(BillingRequestWithActionBillingRequestsMandateRequestAuthorisationSource = exports.BillingRequestWithActionBillingRequestsMandateRequestAuthorisationSource || (exports.BillingRequestWithActionBillingRequestsMandateRequestAuthorisationSource = {}));
var BillingRequestWithActionBillingRequestsMandateRequestConstraintsPeriodicLimitAlignment;
(function (BillingRequestWithActionBillingRequestsMandateRequestConstraintsPeriodicLimitAlignment) {
    BillingRequestWithActionBillingRequestsMandateRequestConstraintsPeriodicLimitAlignment["Calendar"] = "calendar";
    BillingRequestWithActionBillingRequestsMandateRequestConstraintsPeriodicLimitAlignment["CreationDate"] = "creation_date";
})(BillingRequestWithActionBillingRequestsMandateRequestConstraintsPeriodicLimitAlignment = exports.BillingRequestWithActionBillingRequestsMandateRequestConstraintsPeriodicLimitAlignment || (exports.BillingRequestWithActionBillingRequestsMandateRequestConstraintsPeriodicLimitAlignment = {}));
var BillingRequestWithActionBillingRequestsMandateRequestConstraintsPeriodicLimitPeriod;
(function (BillingRequestWithActionBillingRequestsMandateRequestConstraintsPeriodicLimitPeriod) {
    BillingRequestWithActionBillingRequestsMandateRequestConstraintsPeriodicLimitPeriod["Day"] = "day";
    BillingRequestWithActionBillingRequestsMandateRequestConstraintsPeriodicLimitPeriod["Week"] = "week";
    BillingRequestWithActionBillingRequestsMandateRequestConstraintsPeriodicLimitPeriod["Month"] = "month";
    BillingRequestWithActionBillingRequestsMandateRequestConstraintsPeriodicLimitPeriod["Year"] = "year";
    BillingRequestWithActionBillingRequestsMandateRequestConstraintsPeriodicLimitPeriod["Flexible"] = "flexible";
})(BillingRequestWithActionBillingRequestsMandateRequestConstraintsPeriodicLimitPeriod = exports.BillingRequestWithActionBillingRequestsMandateRequestConstraintsPeriodicLimitPeriod || (exports.BillingRequestWithActionBillingRequestsMandateRequestConstraintsPeriodicLimitPeriod = {}));
var BillingRequestWithActionBillingRequestsMandateRequestFundsSettlement;
(function (BillingRequestWithActionBillingRequestsMandateRequestFundsSettlement) {
    BillingRequestWithActionBillingRequestsMandateRequestFundsSettlement["Managed"] = "managed";
    BillingRequestWithActionBillingRequestsMandateRequestFundsSettlement["Direct"] = "direct";
})(BillingRequestWithActionBillingRequestsMandateRequestFundsSettlement = exports.BillingRequestWithActionBillingRequestsMandateRequestFundsSettlement || (exports.BillingRequestWithActionBillingRequestsMandateRequestFundsSettlement = {}));
var BillingRequestWithActionBillingRequestsMandateRequestVerify;
(function (BillingRequestWithActionBillingRequestsMandateRequestVerify) {
    BillingRequestWithActionBillingRequestsMandateRequestVerify["Minimum"] = "minimum";
    BillingRequestWithActionBillingRequestsMandateRequestVerify["Recommended"] = "recommended";
    BillingRequestWithActionBillingRequestsMandateRequestVerify["WhenAvailable"] = "when_available";
    BillingRequestWithActionBillingRequestsMandateRequestVerify["Always"] = "always";
})(BillingRequestWithActionBillingRequestsMandateRequestVerify = exports.BillingRequestWithActionBillingRequestsMandateRequestVerify || (exports.BillingRequestWithActionBillingRequestsMandateRequestVerify = {}));
var BillingRequestWithActionBillingRequestsPaymentRequestFundsSettlement;
(function (BillingRequestWithActionBillingRequestsPaymentRequestFundsSettlement) {
    BillingRequestWithActionBillingRequestsPaymentRequestFundsSettlement["Managed"] = "managed";
    BillingRequestWithActionBillingRequestsPaymentRequestFundsSettlement["Direct"] = "direct";
})(BillingRequestWithActionBillingRequestsPaymentRequestFundsSettlement = exports.BillingRequestWithActionBillingRequestsPaymentRequestFundsSettlement || (exports.BillingRequestWithActionBillingRequestsPaymentRequestFundsSettlement = {}));
var BillingRequestWithActionBillingRequestsResourcesCustomerBankAccountAccountType;
(function (BillingRequestWithActionBillingRequestsResourcesCustomerBankAccountAccountType) {
    BillingRequestWithActionBillingRequestsResourcesCustomerBankAccountAccountType["Savings"] = "savings";
    BillingRequestWithActionBillingRequestsResourcesCustomerBankAccountAccountType["Checking"] = "checking";
})(BillingRequestWithActionBillingRequestsResourcesCustomerBankAccountAccountType = exports.BillingRequestWithActionBillingRequestsResourcesCustomerBankAccountAccountType || (exports.BillingRequestWithActionBillingRequestsResourcesCustomerBankAccountAccountType = {}));
var BillingRequestWithActionBillingRequestsSubscriptionRequestIntervalUnit;
(function (BillingRequestWithActionBillingRequestsSubscriptionRequestIntervalUnit) {
    BillingRequestWithActionBillingRequestsSubscriptionRequestIntervalUnit["Weekly"] = "weekly";
    BillingRequestWithActionBillingRequestsSubscriptionRequestIntervalUnit["Monthly"] = "monthly";
    BillingRequestWithActionBillingRequestsSubscriptionRequestIntervalUnit["Yearly"] = "yearly";
})(BillingRequestWithActionBillingRequestsSubscriptionRequestIntervalUnit = exports.BillingRequestWithActionBillingRequestsSubscriptionRequestIntervalUnit || (exports.BillingRequestWithActionBillingRequestsSubscriptionRequestIntervalUnit = {}));
var BillingRequestWithActionBillingRequestsSubscriptionRequestMonth;
(function (BillingRequestWithActionBillingRequestsSubscriptionRequestMonth) {
    BillingRequestWithActionBillingRequestsSubscriptionRequestMonth["January"] = "january";
    BillingRequestWithActionBillingRequestsSubscriptionRequestMonth["February"] = "february";
    BillingRequestWithActionBillingRequestsSubscriptionRequestMonth["March"] = "march";
    BillingRequestWithActionBillingRequestsSubscriptionRequestMonth["April"] = "april";
    BillingRequestWithActionBillingRequestsSubscriptionRequestMonth["May"] = "may";
    BillingRequestWithActionBillingRequestsSubscriptionRequestMonth["June"] = "june";
    BillingRequestWithActionBillingRequestsSubscriptionRequestMonth["July"] = "july";
    BillingRequestWithActionBillingRequestsSubscriptionRequestMonth["August"] = "august";
    BillingRequestWithActionBillingRequestsSubscriptionRequestMonth["September"] = "september";
    BillingRequestWithActionBillingRequestsSubscriptionRequestMonth["October"] = "october";
    BillingRequestWithActionBillingRequestsSubscriptionRequestMonth["November"] = "november";
    BillingRequestWithActionBillingRequestsSubscriptionRequestMonth["December"] = "december";
})(BillingRequestWithActionBillingRequestsSubscriptionRequestMonth = exports.BillingRequestWithActionBillingRequestsSubscriptionRequestMonth || (exports.BillingRequestWithActionBillingRequestsSubscriptionRequestMonth = {}));
var BlockBlockType;
(function (BlockBlockType) {
    BlockBlockType["Email"] = "email";
    BlockBlockType["EmailDomain"] = "email_domain";
    BlockBlockType["BankAccount"] = "bank_account";
    BlockBlockType["BankName"] = "bank_name";
})(BlockBlockType = exports.BlockBlockType || (exports.BlockBlockType = {}));
var BlockReasonType;
(function (BlockReasonType) {
    BlockReasonType["IdentityFraud"] = "identity_fraud";
    BlockReasonType["NoIntentToPay"] = "no_intent_to_pay";
    BlockReasonType["UnfairChargeback"] = "unfair_chargeback";
    BlockReasonType["Other"] = "other";
})(BlockReasonType = exports.BlockReasonType || (exports.BlockReasonType = {}));
var BlockReferenceType;
(function (BlockReferenceType) {
    BlockReferenceType["Customer"] = "customer";
    BlockReferenceType["Mandate"] = "mandate";
})(BlockReferenceType = exports.BlockReferenceType || (exports.BlockReferenceType = {}));
var CreditorCreditorType;
(function (CreditorCreditorType) {
    CreditorCreditorType["Company"] = "company";
    CreditorCreditorType["Individual"] = "individual";
    CreditorCreditorType["Charity"] = "charity";
    CreditorCreditorType["Partnership"] = "partnership";
    CreditorCreditorType["Trust"] = "trust";
})(CreditorCreditorType = exports.CreditorCreditorType || (exports.CreditorCreditorType = {}));
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
    CreditorSchemeIdentifierScheme["Ach"] = "ach";
    CreditorSchemeIdentifierScheme["Autogiro"] = "autogiro";
    CreditorSchemeIdentifierScheme["Bacs"] = "bacs";
    CreditorSchemeIdentifierScheme["Becs"] = "becs";
    CreditorSchemeIdentifierScheme["BecsNz"] = "becs_nz";
    CreditorSchemeIdentifierScheme["Betalingsservice"] = "betalingsservice";
    CreditorSchemeIdentifierScheme["FasterPayments"] = "faster_payments";
    CreditorSchemeIdentifierScheme["Pad"] = "pad";
    CreditorSchemeIdentifierScheme["PayTo"] = "pay_to";
    CreditorSchemeIdentifierScheme["Sepa"] = "sepa";
    CreditorSchemeIdentifierScheme["SepaCreditTransfer"] = "sepa_credit_transfer";
    CreditorSchemeIdentifierScheme["SepaInstantCreditTransfer"] = "sepa_instant_credit_transfer";
})(CreditorSchemeIdentifierScheme = exports.CreditorSchemeIdentifierScheme || (exports.CreditorSchemeIdentifierScheme = {}));
var CreditorSchemeIdentifierStatus;
(function (CreditorSchemeIdentifierStatus) {
    CreditorSchemeIdentifierStatus["Pending"] = "pending";
    CreditorSchemeIdentifierStatus["Active"] = "active";
})(CreditorSchemeIdentifierStatus = exports.CreditorSchemeIdentifierStatus || (exports.CreditorSchemeIdentifierStatus = {}));
var CreditorVerificationStatus;
(function (CreditorVerificationStatus) {
    CreditorVerificationStatus["Successful"] = "successful";
    CreditorVerificationStatus["InReview"] = "in_review";
    CreditorVerificationStatus["ActionRequired"] = "action_required";
})(CreditorVerificationStatus = exports.CreditorVerificationStatus || (exports.CreditorVerificationStatus = {}));
var CreditorBankAccountAccountType;
(function (CreditorBankAccountAccountType) {
    CreditorBankAccountAccountType["Savings"] = "savings";
    CreditorBankAccountAccountType["Checking"] = "checking";
})(CreditorBankAccountAccountType = exports.CreditorBankAccountAccountType || (exports.CreditorBankAccountAccountType = {}));
var CreditorBankAccountVerificationStatus;
(function (CreditorBankAccountVerificationStatus) {
    CreditorBankAccountVerificationStatus["Pending"] = "pending";
    CreditorBankAccountVerificationStatus["InReview"] = "in_review";
    CreditorBankAccountVerificationStatus["Successful"] = "successful";
    CreditorBankAccountVerificationStatus["CouldNotVerify"] = "could_not_verify";
})(CreditorBankAccountVerificationStatus = exports.CreditorBankAccountVerificationStatus || (exports.CreditorBankAccountVerificationStatus = {}));
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
var CustomerSortDirection;
(function (CustomerSortDirection) {
    CustomerSortDirection["Asc"] = "asc";
    CustomerSortDirection["Desc"] = "desc";
})(CustomerSortDirection = exports.CustomerSortDirection || (exports.CustomerSortDirection = {}));
var CustomerSortField;
(function (CustomerSortField) {
    CustomerSortField["Name"] = "name";
    CustomerSortField["CompanyName"] = "company_name";
    CustomerSortField["CreatedAt"] = "created_at";
})(CustomerSortField = exports.CustomerSortField || (exports.CustomerSortField = {}));
var CustomerBankAccountAccountType;
(function (CustomerBankAccountAccountType) {
    CustomerBankAccountAccountType["Savings"] = "savings";
    CustomerBankAccountAccountType["Checking"] = "checking";
})(CustomerBankAccountAccountType = exports.CustomerBankAccountAccountType || (exports.CustomerBankAccountAccountType = {}));
var CustomerNotificationActionTaken;
(function (CustomerNotificationActionTaken) {
    CustomerNotificationActionTaken["Handled"] = "handled";
})(CustomerNotificationActionTaken = exports.CustomerNotificationActionTaken || (exports.CustomerNotificationActionTaken = {}));
var CustomerNotificationType;
(function (CustomerNotificationType) {
    CustomerNotificationType["PaymentCreated"] = "payment_created";
    CustomerNotificationType["PaymentCancelled"] = "payment_cancelled";
    CustomerNotificationType["MandateCreated"] = "mandate_created";
    CustomerNotificationType["MandateBlocked"] = "mandate_blocked";
    CustomerNotificationType["SubscriptionCreated"] = "subscription_created";
    CustomerNotificationType["SubscriptionCancelled"] = "subscription_cancelled";
    CustomerNotificationType["InstalmentScheduleCreated"] = "instalment_schedule_created";
    CustomerNotificationType["InstalmentScheduleCancelled"] = "instalment_schedule_cancelled";
})(CustomerNotificationType = exports.CustomerNotificationType || (exports.CustomerNotificationType = {}));
var EventInclude;
(function (EventInclude) {
    EventInclude["BillingRequest"] = "billing_request";
    EventInclude["Creditor"] = "creditor";
    EventInclude["Customer"] = "customer";
    EventInclude["InstalmentSchedule"] = "instalment_schedule";
    EventInclude["Mandate"] = "mandate";
    EventInclude["OutboundPayment"] = "outbound_payment";
    EventInclude["PayerAuthorisation"] = "payer_authorisation";
    EventInclude["Payment"] = "payment";
    EventInclude["Payout"] = "payout";
    EventInclude["Refund"] = "refund";
    EventInclude["SchemeIdentifier"] = "scheme_identifier";
    EventInclude["Subscription"] = "subscription";
})(EventInclude = exports.EventInclude || (exports.EventInclude = {}));
var EventDetailsOrigin;
(function (EventDetailsOrigin) {
    EventDetailsOrigin["Bank"] = "bank";
    EventDetailsOrigin["Api"] = "api";
    EventDetailsOrigin["Gocardless"] = "gocardless";
    EventDetailsOrigin["Customer"] = "customer";
    EventDetailsOrigin["Payer"] = "payer";
})(EventDetailsOrigin = exports.EventDetailsOrigin || (exports.EventDetailsOrigin = {}));
var EventDetailsScheme;
(function (EventDetailsScheme) {
    EventDetailsScheme["Ach"] = "ach";
    EventDetailsScheme["Autogiro"] = "autogiro";
    EventDetailsScheme["Bacs"] = "bacs";
    EventDetailsScheme["Becs"] = "becs";
    EventDetailsScheme["BecsNz"] = "becs_nz";
    EventDetailsScheme["Betalingsservice"] = "betalingsservice";
    EventDetailsScheme["FasterPayments"] = "faster_payments";
    EventDetailsScheme["Pad"] = "pad";
    EventDetailsScheme["PayTo"] = "pay_to";
    EventDetailsScheme["SepaCore"] = "sepa_core";
    EventDetailsScheme["SepaCor1"] = "sepa_cor1";
})(EventDetailsScheme = exports.EventDetailsScheme || (exports.EventDetailsScheme = {}));
var EventResourceType;
(function (EventResourceType) {
    EventResourceType["BillingRequests"] = "billing_requests";
    EventResourceType["Creditors"] = "creditors";
    EventResourceType["Customers"] = "customers";
    EventResourceType["Exports"] = "exports";
    EventResourceType["InstalmentSchedules"] = "instalment_schedules";
    EventResourceType["Mandates"] = "mandates";
    EventResourceType["Organisations"] = "organisations";
    EventResourceType["OutboundPayments"] = "outbound_payments";
    EventResourceType["PayerAuthorisations"] = "payer_authorisations";
    EventResourceType["Payments"] = "payments";
    EventResourceType["Payouts"] = "payouts";
    EventResourceType["Refunds"] = "refunds";
    EventResourceType["SchemeIdentifiers"] = "scheme_identifiers";
    EventResourceType["Subscriptions"] = "subscriptions";
})(EventResourceType = exports.EventResourceType || (exports.EventResourceType = {}));
var EventSourceType;
(function (EventSourceType) {
    EventSourceType["App"] = "app";
    EventSourceType["User"] = "user";
    EventSourceType["GcTeam"] = "gc_team";
    EventSourceType["AccessToken"] = "access_token";
})(EventSourceType = exports.EventSourceType || (exports.EventSourceType = {}));
var ExportExportType;
(function (ExportExportType) {
    ExportExportType["PaymentsIndex"] = "payments_index";
    ExportExportType["EventsIndex"] = "events_index";
    ExportExportType["RefundsIndex"] = "refunds_index";
    ExportExportType["PayoutsIndex"] = "payouts_index";
    ExportExportType["CustomersIndex"] = "customers_index";
    ExportExportType["SubscriptionsIndex"] = "subscriptions_index";
    ExportExportType["PaymentEvents"] = "payment_events";
    ExportExportType["SubscriptionEvents"] = "subscription_events";
    ExportExportType["PayoutEvents"] = "payout_events";
    ExportExportType["RefundEvents"] = "refund_events";
    ExportExportType["MandateEvents"] = "mandate_events";
    ExportExportType["PayoutEventsBreakdown"] = "payout_events_breakdown";
    ExportExportType["PayoutEventsReconciliation"] = "payout_events_reconciliation";
    ExportExportType["PayoutTransactionsBreakdown"] = "payout_transactions_breakdown";
    ExportExportType["PayoutTransactionsReconciliation"] = "payout_transactions_reconciliation";
    ExportExportType["AuthorisationRequests"] = "authorisation_requests";
    ExportExportType["CustomerBankAccounts"] = "customer_bank_accounts";
    ExportExportType["Users"] = "users";
    ExportExportType["OrganisationAuthorisations"] = "organisation_authorisations";
    ExportExportType["GcInvalidAuthorisationRequests"] = "gc_invalid_authorisation_requests";
    ExportExportType["PartnerFees"] = "partner_fees";
    ExportExportType["PaymentsImportTemplate"] = "payments_import_template";
    ExportExportType["PaymentAccountStatement"] = "payment_account_statement";
})(ExportExportType = exports.ExportExportType || (exports.ExportExportType = {}));
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
var InstalmentScheduleInstalmentsIntervalUnit;
(function (InstalmentScheduleInstalmentsIntervalUnit) {
    InstalmentScheduleInstalmentsIntervalUnit["Weekly"] = "weekly";
    InstalmentScheduleInstalmentsIntervalUnit["Monthly"] = "monthly";
    InstalmentScheduleInstalmentsIntervalUnit["Yearly"] = "yearly";
})(InstalmentScheduleInstalmentsIntervalUnit = exports.InstalmentScheduleInstalmentsIntervalUnit || (exports.InstalmentScheduleInstalmentsIntervalUnit = {}));
var InstalmentScheduleStatus;
(function (InstalmentScheduleStatus) {
    InstalmentScheduleStatus["Pending"] = "pending";
    InstalmentScheduleStatus["Active"] = "active";
    InstalmentScheduleStatus["CreationFailed"] = "creation_failed";
    InstalmentScheduleStatus["Completed"] = "completed";
    InstalmentScheduleStatus["Cancelled"] = "cancelled";
    InstalmentScheduleStatus["Errored"] = "errored";
})(InstalmentScheduleStatus = exports.InstalmentScheduleStatus || (exports.InstalmentScheduleStatus = {}));
var InstitutionStatus;
(function (InstitutionStatus) {
    InstitutionStatus["Enabled"] = "enabled";
    InstitutionStatus["Disabled"] = "disabled";
    InstitutionStatus["TemporarilyDisabled"] = "temporarily_disabled";
})(InstitutionStatus = exports.InstitutionStatus || (exports.InstitutionStatus = {}));
var MandateAuthorisationSource;
(function (MandateAuthorisationSource) {
    MandateAuthorisationSource["Web"] = "web";
    MandateAuthorisationSource["Telephone"] = "telephone";
    MandateAuthorisationSource["Paper"] = "paper";
})(MandateAuthorisationSource = exports.MandateAuthorisationSource || (exports.MandateAuthorisationSource = {}));
var MandateConsentParametersPeriod;
(function (MandateConsentParametersPeriod) {
    MandateConsentParametersPeriod["Day"] = "day";
    MandateConsentParametersPeriod["Week"] = "week";
    MandateConsentParametersPeriod["Month"] = "month";
    MandateConsentParametersPeriod["Year"] = "year";
    MandateConsentParametersPeriod["Flexible"] = "flexible";
})(MandateConsentParametersPeriod = exports.MandateConsentParametersPeriod || (exports.MandateConsentParametersPeriod = {}));
var MandateConsentType;
(function (MandateConsentType) {
    MandateConsentType["OneOff"] = "one_off";
    MandateConsentType["Single"] = "single";
    MandateConsentType["Recurring"] = "recurring";
    MandateConsentType["Standing"] = "standing";
    MandateConsentType["Sporadic"] = "sporadic";
})(MandateConsentType = exports.MandateConsentType || (exports.MandateConsentType = {}));
var MandateFundsSettlement;
(function (MandateFundsSettlement) {
    MandateFundsSettlement["Managed"] = "managed";
    MandateFundsSettlement["Direct"] = "direct";
})(MandateFundsSettlement = exports.MandateFundsSettlement || (exports.MandateFundsSettlement = {}));
var MandateStatus;
(function (MandateStatus) {
    MandateStatus["PendingCustomerApproval"] = "pending_customer_approval";
    MandateStatus["PendingSubmission"] = "pending_submission";
    MandateStatus["Submitted"] = "submitted";
    MandateStatus["Active"] = "active";
    MandateStatus["Failed"] = "failed";
    MandateStatus["Cancelled"] = "cancelled";
    MandateStatus["Expired"] = "expired";
    MandateStatus["Consumed"] = "consumed";
    MandateStatus["Blocked"] = "blocked";
    MandateStatus["SuspendedByPayer"] = "suspended_by_payer";
})(MandateStatus = exports.MandateStatus || (exports.MandateStatus = {}));
var MandateImportScheme;
(function (MandateImportScheme) {
    MandateImportScheme["Ach"] = "ach";
    MandateImportScheme["Autogiro"] = "autogiro";
    MandateImportScheme["Bacs"] = "bacs";
    MandateImportScheme["Becs"] = "becs";
    MandateImportScheme["BecsNz"] = "becs_nz";
    MandateImportScheme["Betalingsservice"] = "betalingsservice";
    MandateImportScheme["FasterPayments"] = "faster_payments";
    MandateImportScheme["Pad"] = "pad";
    MandateImportScheme["PayTo"] = "pay_to";
    MandateImportScheme["SepaCore"] = "sepa_core";
})(MandateImportScheme = exports.MandateImportScheme || (exports.MandateImportScheme = {}));
var MandateImportStatus;
(function (MandateImportStatus) {
    MandateImportStatus["Created"] = "created";
    MandateImportStatus["Submitted"] = "submitted";
    MandateImportStatus["Cancelled"] = "cancelled";
    MandateImportStatus["Processing"] = "processing";
    MandateImportStatus["Processed"] = "processed";
})(MandateImportStatus = exports.MandateImportStatus || (exports.MandateImportStatus = {}));
var MandateImportEntryBankAccountAccountType;
(function (MandateImportEntryBankAccountAccountType) {
    MandateImportEntryBankAccountAccountType["Savings"] = "savings";
    MandateImportEntryBankAccountAccountType["Checking"] = "checking";
})(MandateImportEntryBankAccountAccountType = exports.MandateImportEntryBankAccountAccountType || (exports.MandateImportEntryBankAccountAccountType = {}));
var MandateImportEntryStatus;
(function (MandateImportEntryStatus) {
    MandateImportEntryStatus["SuccessfullyProcessed"] = "successfully_processed";
    MandateImportEntryStatus["UnsuccessfullyProcessed"] = "unsuccessfully_processed";
})(MandateImportEntryStatus = exports.MandateImportEntryStatus || (exports.MandateImportEntryStatus = {}));
var MandatePdfAccountType;
(function (MandatePdfAccountType) {
    MandatePdfAccountType["Savings"] = "savings";
    MandatePdfAccountType["Checking"] = "checking";
})(MandatePdfAccountType = exports.MandatePdfAccountType || (exports.MandatePdfAccountType = {}));
var MandatePdfSubscriptionFrequency;
(function (MandatePdfSubscriptionFrequency) {
    MandatePdfSubscriptionFrequency["Weekly"] = "weekly";
    MandatePdfSubscriptionFrequency["Monthly"] = "monthly";
    MandatePdfSubscriptionFrequency["Yearly"] = "yearly";
})(MandatePdfSubscriptionFrequency = exports.MandatePdfSubscriptionFrequency || (exports.MandatePdfSubscriptionFrequency = {}));
var NegativeBalanceLimitCurrency;
(function (NegativeBalanceLimitCurrency) {
    NegativeBalanceLimitCurrency["AUD"] = "AUD";
    NegativeBalanceLimitCurrency["CAD"] = "CAD";
    NegativeBalanceLimitCurrency["DKK"] = "DKK";
    NegativeBalanceLimitCurrency["EUR"] = "EUR";
    NegativeBalanceLimitCurrency["GBP"] = "GBP";
    NegativeBalanceLimitCurrency["NZD"] = "NZD";
    NegativeBalanceLimitCurrency["SEK"] = "SEK";
    NegativeBalanceLimitCurrency["USD"] = "USD";
})(NegativeBalanceLimitCurrency = exports.NegativeBalanceLimitCurrency || (exports.NegativeBalanceLimitCurrency = {}));
var OutboundPaymentScheme;
(function (OutboundPaymentScheme) {
    OutboundPaymentScheme["FasterPayments"] = "faster_payments";
})(OutboundPaymentScheme = exports.OutboundPaymentScheme || (exports.OutboundPaymentScheme = {}));
var OutboundPaymentStatus;
(function (OutboundPaymentStatus) {
    OutboundPaymentStatus["Verifying"] = "verifying";
    OutboundPaymentStatus["PendingApproval"] = "pending_approval";
    OutboundPaymentStatus["Scheduled"] = "scheduled";
    OutboundPaymentStatus["Executing"] = "executing";
    OutboundPaymentStatus["Executed"] = "executed";
    OutboundPaymentStatus["Cancelled"] = "cancelled";
    OutboundPaymentStatus["Failed"] = "failed";
})(OutboundPaymentStatus = exports.OutboundPaymentStatus || (exports.OutboundPaymentStatus = {}));
var OutboundPaymentCurrency;
(function (OutboundPaymentCurrency) {
    OutboundPaymentCurrency["GBP"] = "GBP";
})(OutboundPaymentCurrency = exports.OutboundPaymentCurrency || (exports.OutboundPaymentCurrency = {}));
var OutboundPaymentVerificationsRecipientBankAccountHolderVerificationResult;
(function (OutboundPaymentVerificationsRecipientBankAccountHolderVerificationResult) {
    OutboundPaymentVerificationsRecipientBankAccountHolderVerificationResult["FullMatch"] = "full_match";
    OutboundPaymentVerificationsRecipientBankAccountHolderVerificationResult["PartialMatch"] = "partial_match";
    OutboundPaymentVerificationsRecipientBankAccountHolderVerificationResult["NoMatch"] = "no_match";
    OutboundPaymentVerificationsRecipientBankAccountHolderVerificationResult["UnableToMatch"] = "unable_to_match";
})(OutboundPaymentVerificationsRecipientBankAccountHolderVerificationResult = exports.OutboundPaymentVerificationsRecipientBankAccountHolderVerificationResult || (exports.OutboundPaymentVerificationsRecipientBankAccountHolderVerificationResult = {}));
var OutboundPaymentVerificationsRecipientBankAccountHolderVerificationType;
(function (OutboundPaymentVerificationsRecipientBankAccountHolderVerificationType) {
    OutboundPaymentVerificationsRecipientBankAccountHolderVerificationType["ConfirmationOfPayee"] = "confirmation_of_payee";
})(OutboundPaymentVerificationsRecipientBankAccountHolderVerificationType = exports.OutboundPaymentVerificationsRecipientBankAccountHolderVerificationType || (exports.OutboundPaymentVerificationsRecipientBankAccountHolderVerificationType = {}));
var PayerAuthorisationBankAccountAccountType;
(function (PayerAuthorisationBankAccountAccountType) {
    PayerAuthorisationBankAccountAccountType["Savings"] = "savings";
    PayerAuthorisationBankAccountAccountType["Checking"] = "checking";
})(PayerAuthorisationBankAccountAccountType = exports.PayerAuthorisationBankAccountAccountType || (exports.PayerAuthorisationBankAccountAccountType = {}));
var PayerAuthorisationMandateScheme;
(function (PayerAuthorisationMandateScheme) {
    PayerAuthorisationMandateScheme["Ach"] = "ach";
    PayerAuthorisationMandateScheme["Autogiro"] = "autogiro";
    PayerAuthorisationMandateScheme["Bacs"] = "bacs";
    PayerAuthorisationMandateScheme["Becs"] = "becs";
    PayerAuthorisationMandateScheme["BecsNz"] = "becs_nz";
    PayerAuthorisationMandateScheme["Betalingsservice"] = "betalingsservice";
    PayerAuthorisationMandateScheme["FasterPayments"] = "faster_payments";
    PayerAuthorisationMandateScheme["Pad"] = "pad";
    PayerAuthorisationMandateScheme["PayTo"] = "pay_to";
    PayerAuthorisationMandateScheme["SepaCore"] = "sepa_core";
})(PayerAuthorisationMandateScheme = exports.PayerAuthorisationMandateScheme || (exports.PayerAuthorisationMandateScheme = {}));
var PayerAuthorisationStatus;
(function (PayerAuthorisationStatus) {
    PayerAuthorisationStatus["Created"] = "created";
    PayerAuthorisationStatus["Submitted"] = "submitted";
    PayerAuthorisationStatus["Confirmed"] = "confirmed";
    PayerAuthorisationStatus["Completed"] = "completed";
    PayerAuthorisationStatus["Failed"] = "failed";
})(PayerAuthorisationStatus = exports.PayerAuthorisationStatus || (exports.PayerAuthorisationStatus = {}));
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
var PaymentSortDirection;
(function (PaymentSortDirection) {
    PaymentSortDirection["Asc"] = "asc";
    PaymentSortDirection["Desc"] = "desc";
})(PaymentSortDirection = exports.PaymentSortDirection || (exports.PaymentSortDirection = {}));
var PaymentSortField;
(function (PaymentSortField) {
    PaymentSortField["ChargeDate"] = "charge_date";
    PaymentSortField["Amount"] = "amount";
})(PaymentSortField = exports.PaymentSortField || (exports.PaymentSortField = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PendingCustomerApproval"] = "pending_customer_approval";
    PaymentStatus["PendingSubmission"] = "pending_submission";
    PaymentStatus["Submitted"] = "submitted";
    PaymentStatus["Confirmed"] = "confirmed";
    PaymentStatus["PaidOut"] = "paid_out";
    PaymentStatus["Cancelled"] = "cancelled";
    PaymentStatus["CustomerApprovalDenied"] = "customer_approval_denied";
    PaymentStatus["Failed"] = "failed";
    PaymentStatus["ChargedBack"] = "charged_back";
})(PaymentStatus = exports.PaymentStatus || (exports.PaymentStatus = {}));
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
var PaymentAccountTransactionDirection;
(function (PaymentAccountTransactionDirection) {
    PaymentAccountTransactionDirection["Credit"] = "credit";
    PaymentAccountTransactionDirection["Debit"] = "debit";
})(PaymentAccountTransactionDirection = exports.PaymentAccountTransactionDirection || (exports.PaymentAccountTransactionDirection = {}));
var PaymentAccountTransactionCurrency;
(function (PaymentAccountTransactionCurrency) {
    PaymentAccountTransactionCurrency["GBP"] = "GBP";
})(PaymentAccountTransactionCurrency = exports.PaymentAccountTransactionCurrency || (exports.PaymentAccountTransactionCurrency = {}));
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
var PayoutPayoutType;
(function (PayoutPayoutType) {
    PayoutPayoutType["Merchant"] = "merchant";
    PayoutPayoutType["Partner"] = "partner";
})(PayoutPayoutType = exports.PayoutPayoutType || (exports.PayoutPayoutType = {}));
var PayoutStatus;
(function (PayoutStatus) {
    PayoutStatus["Pending"] = "pending";
    PayoutStatus["Paid"] = "paid";
    PayoutStatus["Bounced"] = "bounced";
})(PayoutStatus = exports.PayoutStatus || (exports.PayoutStatus = {}));
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
var PayoutItemInclude2020TaxCutover;
(function (PayoutItemInclude2020TaxCutover) {
    PayoutItemInclude2020TaxCutover["True"] = "true";
    PayoutItemInclude2020TaxCutover["False"] = "false";
})(PayoutItemInclude2020TaxCutover = exports.PayoutItemInclude2020TaxCutover || (exports.PayoutItemInclude2020TaxCutover = {}));
var PayoutItemTaxisCurrency;
(function (PayoutItemTaxisCurrency) {
    PayoutItemTaxisCurrency["AUD"] = "AUD";
    PayoutItemTaxisCurrency["CAD"] = "CAD";
    PayoutItemTaxisCurrency["DKK"] = "DKK";
    PayoutItemTaxisCurrency["EUR"] = "EUR";
    PayoutItemTaxisCurrency["GBP"] = "GBP";
    PayoutItemTaxisCurrency["NZD"] = "NZD";
    PayoutItemTaxisCurrency["SEK"] = "SEK";
    PayoutItemTaxisCurrency["USD"] = "USD";
})(PayoutItemTaxisCurrency = exports.PayoutItemTaxisCurrency || (exports.PayoutItemTaxisCurrency = {}));
var PayoutItemType;
(function (PayoutItemType) {
    PayoutItemType["PaymentPaidOut"] = "payment_paid_out";
    PayoutItemType["PaymentFailed"] = "payment_failed";
    PayoutItemType["PaymentChargedBack"] = "payment_charged_back";
    PayoutItemType["PaymentRefunded"] = "payment_refunded";
    PayoutItemType["Refund"] = "refund";
    PayoutItemType["GocardlessFee"] = "gocardless_fee";
    PayoutItemType["AppFee"] = "app_fee";
    PayoutItemType["RevenueShare"] = "revenue_share";
    PayoutItemType["SurchargeFee"] = "surcharge_fee";
    PayoutItemType["RefundFundsReturned"] = "refund_funds_returned";
})(PayoutItemType = exports.PayoutItemType || (exports.PayoutItemType = {}));
var RedirectFlowPrefilledBankAccountAccountType;
(function (RedirectFlowPrefilledBankAccountAccountType) {
    RedirectFlowPrefilledBankAccountAccountType["Savings"] = "savings";
    RedirectFlowPrefilledBankAccountAccountType["Checking"] = "checking";
})(RedirectFlowPrefilledBankAccountAccountType = exports.RedirectFlowPrefilledBankAccountAccountType || (exports.RedirectFlowPrefilledBankAccountAccountType = {}));
var RedirectFlowScheme;
(function (RedirectFlowScheme) {
    RedirectFlowScheme["Ach"] = "ach";
    RedirectFlowScheme["Autogiro"] = "autogiro";
    RedirectFlowScheme["Bacs"] = "bacs";
    RedirectFlowScheme["Becs"] = "becs";
    RedirectFlowScheme["BecsNz"] = "becs_nz";
    RedirectFlowScheme["Betalingsservice"] = "betalingsservice";
    RedirectFlowScheme["Pad"] = "pad";
    RedirectFlowScheme["SepaCore"] = "sepa_core";
})(RedirectFlowScheme = exports.RedirectFlowScheme || (exports.RedirectFlowScheme = {}));
var RefundRefundType;
(function (RefundRefundType) {
    RefundRefundType["Mandate"] = "mandate";
    RefundRefundType["Payment"] = "payment";
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
    RefundStatus["Created"] = "created";
    RefundStatus["PendingSubmission"] = "pending_submission";
    RefundStatus["Submitted"] = "submitted";
    RefundStatus["Paid"] = "paid";
    RefundStatus["Cancelled"] = "cancelled";
    RefundStatus["Bounced"] = "bounced";
    RefundStatus["FundsReturned"] = "funds_returned";
})(RefundStatus = exports.RefundStatus || (exports.RefundStatus = {}));
var SchemeIdentifierScheme;
(function (SchemeIdentifierScheme) {
    SchemeIdentifierScheme["Ach"] = "ach";
    SchemeIdentifierScheme["Autogiro"] = "autogiro";
    SchemeIdentifierScheme["Bacs"] = "bacs";
    SchemeIdentifierScheme["Becs"] = "becs";
    SchemeIdentifierScheme["BecsNz"] = "becs_nz";
    SchemeIdentifierScheme["Betalingsservice"] = "betalingsservice";
    SchemeIdentifierScheme["FasterPayments"] = "faster_payments";
    SchemeIdentifierScheme["Pad"] = "pad";
    SchemeIdentifierScheme["PayTo"] = "pay_to";
    SchemeIdentifierScheme["Sepa"] = "sepa";
    SchemeIdentifierScheme["SepaCreditTransfer"] = "sepa_credit_transfer";
    SchemeIdentifierScheme["SepaInstantCreditTransfer"] = "sepa_instant_credit_transfer";
})(SchemeIdentifierScheme = exports.SchemeIdentifierScheme || (exports.SchemeIdentifierScheme = {}));
var SchemeIdentifierCurrency;
(function (SchemeIdentifierCurrency) {
    SchemeIdentifierCurrency["AUD"] = "AUD";
    SchemeIdentifierCurrency["CAD"] = "CAD";
    SchemeIdentifierCurrency["DKK"] = "DKK";
    SchemeIdentifierCurrency["EUR"] = "EUR";
    SchemeIdentifierCurrency["GBP"] = "GBP";
    SchemeIdentifierCurrency["NZD"] = "NZD";
    SchemeIdentifierCurrency["SEK"] = "SEK";
    SchemeIdentifierCurrency["USD"] = "USD";
})(SchemeIdentifierCurrency = exports.SchemeIdentifierCurrency || (exports.SchemeIdentifierCurrency = {}));
var SchemeIdentifierStatus;
(function (SchemeIdentifierStatus) {
    SchemeIdentifierStatus["Pending"] = "pending";
    SchemeIdentifierStatus["Active"] = "active";
})(SchemeIdentifierStatus = exports.SchemeIdentifierStatus || (exports.SchemeIdentifierStatus = {}));
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
    SubscriptionIntervalUnit["Weekly"] = "weekly";
    SubscriptionIntervalUnit["Monthly"] = "monthly";
    SubscriptionIntervalUnit["Yearly"] = "yearly";
})(SubscriptionIntervalUnit = exports.SubscriptionIntervalUnit || (exports.SubscriptionIntervalUnit = {}));
var SubscriptionMonth;
(function (SubscriptionMonth) {
    SubscriptionMonth["January"] = "january";
    SubscriptionMonth["February"] = "february";
    SubscriptionMonth["March"] = "march";
    SubscriptionMonth["April"] = "april";
    SubscriptionMonth["May"] = "may";
    SubscriptionMonth["June"] = "june";
    SubscriptionMonth["July"] = "july";
    SubscriptionMonth["August"] = "august";
    SubscriptionMonth["September"] = "september";
    SubscriptionMonth["October"] = "october";
    SubscriptionMonth["November"] = "november";
    SubscriptionMonth["December"] = "december";
})(SubscriptionMonth = exports.SubscriptionMonth || (exports.SubscriptionMonth = {}));
var SubscriptionStatus;
(function (SubscriptionStatus) {
    SubscriptionStatus["PendingCustomerApproval"] = "pending_customer_approval";
    SubscriptionStatus["CustomerApprovalDenied"] = "customer_approval_denied";
    SubscriptionStatus["Active"] = "active";
    SubscriptionStatus["Finished"] = "finished";
    SubscriptionStatus["Cancelled"] = "cancelled";
    SubscriptionStatus["Paused"] = "paused";
})(SubscriptionStatus = exports.SubscriptionStatus || (exports.SubscriptionStatus = {}));
//# sourceMappingURL=Types.js.map