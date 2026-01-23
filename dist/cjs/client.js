"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoCardlessClient = void 0;
const constants_js_1 = require("./constants.js");
const api_js_1 = require("./api/api.js");
const balanceService_js_1 = require("./services/balanceService.js");
const bankAccountDetailService_js_1 = require("./services/bankAccountDetailService.js");
const bankAccountHolderVerificationService_js_1 = require("./services/bankAccountHolderVerificationService.js");
const bankAuthorisationService_js_1 = require("./services/bankAuthorisationService.js");
const bankDetailsLookupService_js_1 = require("./services/bankDetailsLookupService.js");
const billingRequestService_js_1 = require("./services/billingRequestService.js");
const billingRequestFlowService_js_1 = require("./services/billingRequestFlowService.js");
const billingRequestTemplateService_js_1 = require("./services/billingRequestTemplateService.js");
const billingRequestWithActionService_js_1 = require("./services/billingRequestWithActionService.js");
const blockService_js_1 = require("./services/blockService.js");
const creditorService_js_1 = require("./services/creditorService.js");
const creditorBankAccountService_js_1 = require("./services/creditorBankAccountService.js");
const currencyExchangeRateService_js_1 = require("./services/currencyExchangeRateService.js");
const customerService_js_1 = require("./services/customerService.js");
const customerBankAccountService_js_1 = require("./services/customerBankAccountService.js");
const customerNotificationService_js_1 = require("./services/customerNotificationService.js");
const eventService_js_1 = require("./services/eventService.js");
const exportService_js_1 = require("./services/exportService.js");
const fundsAvailabilityService_js_1 = require("./services/fundsAvailabilityService.js");
const instalmentScheduleService_js_1 = require("./services/instalmentScheduleService.js");
const institutionService_js_1 = require("./services/institutionService.js");
const logoService_js_1 = require("./services/logoService.js");
const mandateService_js_1 = require("./services/mandateService.js");
const mandateImportService_js_1 = require("./services/mandateImportService.js");
const mandateImportEntryService_js_1 = require("./services/mandateImportEntryService.js");
const mandatePdfService_js_1 = require("./services/mandatePdfService.js");
const negativeBalanceLimitService_js_1 = require("./services/negativeBalanceLimitService.js");
const outboundPaymentService_js_1 = require("./services/outboundPaymentService.js");
const payerAuthorisationService_js_1 = require("./services/payerAuthorisationService.js");
const payerThemeService_js_1 = require("./services/payerThemeService.js");
const paymentService_js_1 = require("./services/paymentService.js");
const paymentAccountService_js_1 = require("./services/paymentAccountService.js");
const paymentAccountTransactionService_js_1 = require("./services/paymentAccountTransactionService.js");
const payoutService_js_1 = require("./services/payoutService.js");
const payoutItemService_js_1 = require("./services/payoutItemService.js");
const redirectFlowService_js_1 = require("./services/redirectFlowService.js");
const refundService_js_1 = require("./services/refundService.js");
const scenarioSimulatorService_js_1 = require("./services/scenarioSimulatorService.js");
const schemeIdentifierService_js_1 = require("./services/schemeIdentifierService.js");
const subscriptionService_js_1 = require("./services/subscriptionService.js");
const taxRateService_js_1 = require("./services/taxRateService.js");
const transferredMandateService_js_1 = require("./services/transferredMandateService.js");
const verificationDetailService_js_1 = require("./services/verificationDetailService.js");
const webhookService_js_1 = require("./services/webhookService.js");
class GoCardlessClient {
    constructor(token, environment = constants_js_1.Environments.Live, options = {}) {
        this._api = new api_js_1.Api(token, environment, options);
        this._balances = undefined;
        this._bankAccountDetails = undefined;
        this._bankAccountHolderVerifications = undefined;
        this._bankAuthorisations = undefined;
        this._bankDetailsLookups = undefined;
        this._billingRequests = undefined;
        this._billingRequestFlows = undefined;
        this._billingRequestTemplates = undefined;
        this._billingRequestWithActions = undefined;
        this._blocks = undefined;
        this._creditors = undefined;
        this._creditorBankAccounts = undefined;
        this._currencyExchangeRates = undefined;
        this._customers = undefined;
        this._customerBankAccounts = undefined;
        this._customerNotifications = undefined;
        this._events = undefined;
        this._exports = undefined;
        this._fundsAvailabilities = undefined;
        this._instalmentSchedules = undefined;
        this._institutions = undefined;
        this._logos = undefined;
        this._mandates = undefined;
        this._mandateImports = undefined;
        this._mandateImportEntries = undefined;
        this._mandatePdfs = undefined;
        this._negativeBalanceLimits = undefined;
        this._outboundPayments = undefined;
        this._payerAuthorisations = undefined;
        this._payerThemes = undefined;
        this._payments = undefined;
        this._paymentAccounts = undefined;
        this._paymentAccountTransactions = undefined;
        this._payouts = undefined;
        this._payoutItems = undefined;
        this._redirectFlows = undefined;
        this._refunds = undefined;
        this._scenarioSimulators = undefined;
        this._schemeIdentifiers = undefined;
        this._subscriptions = undefined;
        this._taxRates = undefined;
        this._transferredMandates = undefined;
        this._verificationDetails = undefined;
        this._webhooks = undefined;
    }
    get balances() {
        if (!this._balances) {
            this._balances = new balanceService_js_1.BalanceService(this._api);
        }
        return this._balances;
    }
    get bankAccountDetails() {
        if (!this._bankAccountDetails) {
            this._bankAccountDetails = new bankAccountDetailService_js_1.BankAccountDetailService(this._api);
        }
        return this._bankAccountDetails;
    }
    get bankAccountHolderVerifications() {
        if (!this._bankAccountHolderVerifications) {
            this._bankAccountHolderVerifications = new bankAccountHolderVerificationService_js_1.BankAccountHolderVerificationService(this._api);
        }
        return this._bankAccountHolderVerifications;
    }
    get bankAuthorisations() {
        if (!this._bankAuthorisations) {
            this._bankAuthorisations = new bankAuthorisationService_js_1.BankAuthorisationService(this._api);
        }
        return this._bankAuthorisations;
    }
    get bankDetailsLookups() {
        if (!this._bankDetailsLookups) {
            this._bankDetailsLookups = new bankDetailsLookupService_js_1.BankDetailsLookupService(this._api);
        }
        return this._bankDetailsLookups;
    }
    get billingRequests() {
        if (!this._billingRequests) {
            this._billingRequests = new billingRequestService_js_1.BillingRequestService(this._api);
        }
        return this._billingRequests;
    }
    get billingRequestFlows() {
        if (!this._billingRequestFlows) {
            this._billingRequestFlows = new billingRequestFlowService_js_1.BillingRequestFlowService(this._api);
        }
        return this._billingRequestFlows;
    }
    get billingRequestTemplates() {
        if (!this._billingRequestTemplates) {
            this._billingRequestTemplates = new billingRequestTemplateService_js_1.BillingRequestTemplateService(this._api);
        }
        return this._billingRequestTemplates;
    }
    get billingRequestWithActions() {
        if (!this._billingRequestWithActions) {
            this._billingRequestWithActions = new billingRequestWithActionService_js_1.BillingRequestWithActionService(this._api);
        }
        return this._billingRequestWithActions;
    }
    get blocks() {
        if (!this._blocks) {
            this._blocks = new blockService_js_1.BlockService(this._api);
        }
        return this._blocks;
    }
    get creditors() {
        if (!this._creditors) {
            this._creditors = new creditorService_js_1.CreditorService(this._api);
        }
        return this._creditors;
    }
    get creditorBankAccounts() {
        if (!this._creditorBankAccounts) {
            this._creditorBankAccounts = new creditorBankAccountService_js_1.CreditorBankAccountService(this._api);
        }
        return this._creditorBankAccounts;
    }
    get currencyExchangeRates() {
        if (!this._currencyExchangeRates) {
            this._currencyExchangeRates = new currencyExchangeRateService_js_1.CurrencyExchangeRateService(this._api);
        }
        return this._currencyExchangeRates;
    }
    get customers() {
        if (!this._customers) {
            this._customers = new customerService_js_1.CustomerService(this._api);
        }
        return this._customers;
    }
    get customerBankAccounts() {
        if (!this._customerBankAccounts) {
            this._customerBankAccounts = new customerBankAccountService_js_1.CustomerBankAccountService(this._api);
        }
        return this._customerBankAccounts;
    }
    get customerNotifications() {
        if (!this._customerNotifications) {
            this._customerNotifications = new customerNotificationService_js_1.CustomerNotificationService(this._api);
        }
        return this._customerNotifications;
    }
    get events() {
        if (!this._events) {
            this._events = new eventService_js_1.EventService(this._api);
        }
        return this._events;
    }
    get exports() {
        if (!this._exports) {
            this._exports = new exportService_js_1.ExportService(this._api);
        }
        return this._exports;
    }
    get fundsAvailabilities() {
        if (!this._fundsAvailabilities) {
            this._fundsAvailabilities = new fundsAvailabilityService_js_1.FundsAvailabilityService(this._api);
        }
        return this._fundsAvailabilities;
    }
    get instalmentSchedules() {
        if (!this._instalmentSchedules) {
            this._instalmentSchedules = new instalmentScheduleService_js_1.InstalmentScheduleService(this._api);
        }
        return this._instalmentSchedules;
    }
    get institutions() {
        if (!this._institutions) {
            this._institutions = new institutionService_js_1.InstitutionService(this._api);
        }
        return this._institutions;
    }
    get logos() {
        if (!this._logos) {
            this._logos = new logoService_js_1.LogoService(this._api);
        }
        return this._logos;
    }
    get mandates() {
        if (!this._mandates) {
            this._mandates = new mandateService_js_1.MandateService(this._api);
        }
        return this._mandates;
    }
    get mandateImports() {
        if (!this._mandateImports) {
            this._mandateImports = new mandateImportService_js_1.MandateImportService(this._api);
        }
        return this._mandateImports;
    }
    get mandateImportEntries() {
        if (!this._mandateImportEntries) {
            this._mandateImportEntries = new mandateImportEntryService_js_1.MandateImportEntryService(this._api);
        }
        return this._mandateImportEntries;
    }
    get mandatePdfs() {
        if (!this._mandatePdfs) {
            this._mandatePdfs = new mandatePdfService_js_1.MandatePdfService(this._api);
        }
        return this._mandatePdfs;
    }
    get negativeBalanceLimits() {
        if (!this._negativeBalanceLimits) {
            this._negativeBalanceLimits = new negativeBalanceLimitService_js_1.NegativeBalanceLimitService(this._api);
        }
        return this._negativeBalanceLimits;
    }
    get outboundPayments() {
        if (!this._outboundPayments) {
            this._outboundPayments = new outboundPaymentService_js_1.OutboundPaymentService(this._api);
        }
        return this._outboundPayments;
    }
    get payerAuthorisations() {
        if (!this._payerAuthorisations) {
            this._payerAuthorisations = new payerAuthorisationService_js_1.PayerAuthorisationService(this._api);
        }
        return this._payerAuthorisations;
    }
    get payerThemes() {
        if (!this._payerThemes) {
            this._payerThemes = new payerThemeService_js_1.PayerThemeService(this._api);
        }
        return this._payerThemes;
    }
    get payments() {
        if (!this._payments) {
            this._payments = new paymentService_js_1.PaymentService(this._api);
        }
        return this._payments;
    }
    get paymentAccounts() {
        if (!this._paymentAccounts) {
            this._paymentAccounts = new paymentAccountService_js_1.PaymentAccountService(this._api);
        }
        return this._paymentAccounts;
    }
    get paymentAccountTransactions() {
        if (!this._paymentAccountTransactions) {
            this._paymentAccountTransactions = new paymentAccountTransactionService_js_1.PaymentAccountTransactionService(this._api);
        }
        return this._paymentAccountTransactions;
    }
    get payouts() {
        if (!this._payouts) {
            this._payouts = new payoutService_js_1.PayoutService(this._api);
        }
        return this._payouts;
    }
    get payoutItems() {
        if (!this._payoutItems) {
            this._payoutItems = new payoutItemService_js_1.PayoutItemService(this._api);
        }
        return this._payoutItems;
    }
    get redirectFlows() {
        if (!this._redirectFlows) {
            this._redirectFlows = new redirectFlowService_js_1.RedirectFlowService(this._api);
        }
        return this._redirectFlows;
    }
    get refunds() {
        if (!this._refunds) {
            this._refunds = new refundService_js_1.RefundService(this._api);
        }
        return this._refunds;
    }
    get scenarioSimulators() {
        if (!this._scenarioSimulators) {
            this._scenarioSimulators = new scenarioSimulatorService_js_1.ScenarioSimulatorService(this._api);
        }
        return this._scenarioSimulators;
    }
    get schemeIdentifiers() {
        if (!this._schemeIdentifiers) {
            this._schemeIdentifiers = new schemeIdentifierService_js_1.SchemeIdentifierService(this._api);
        }
        return this._schemeIdentifiers;
    }
    get subscriptions() {
        if (!this._subscriptions) {
            this._subscriptions = new subscriptionService_js_1.SubscriptionService(this._api);
        }
        return this._subscriptions;
    }
    get taxRates() {
        if (!this._taxRates) {
            this._taxRates = new taxRateService_js_1.TaxRateService(this._api);
        }
        return this._taxRates;
    }
    get transferredMandates() {
        if (!this._transferredMandates) {
            this._transferredMandates = new transferredMandateService_js_1.TransferredMandateService(this._api);
        }
        return this._transferredMandates;
    }
    get verificationDetails() {
        if (!this._verificationDetails) {
            this._verificationDetails = new verificationDetailService_js_1.VerificationDetailService(this._api);
        }
        return this._verificationDetails;
    }
    get webhooks() {
        if (!this._webhooks) {
            this._webhooks = new webhookService_js_1.WebhookService(this._api);
        }
        return this._webhooks;
    }
}
exports.GoCardlessClient = GoCardlessClient;
//# sourceMappingURL=client.js.map