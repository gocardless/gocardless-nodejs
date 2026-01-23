import { Environments } from './constants.js';
import { Api } from './api/api.js';
import { BalanceService } from './services/balanceService.js';
import { BankAccountDetailService } from './services/bankAccountDetailService.js';
import { BankAccountHolderVerificationService } from './services/bankAccountHolderVerificationService.js';
import { BankAuthorisationService } from './services/bankAuthorisationService.js';
import { BankDetailsLookupService } from './services/bankDetailsLookupService.js';
import { BillingRequestService } from './services/billingRequestService.js';
import { BillingRequestFlowService } from './services/billingRequestFlowService.js';
import { BillingRequestTemplateService } from './services/billingRequestTemplateService.js';
import { BillingRequestWithActionService } from './services/billingRequestWithActionService.js';
import { BlockService } from './services/blockService.js';
import { CreditorService } from './services/creditorService.js';
import { CreditorBankAccountService } from './services/creditorBankAccountService.js';
import { CurrencyExchangeRateService } from './services/currencyExchangeRateService.js';
import { CustomerService } from './services/customerService.js';
import { CustomerBankAccountService } from './services/customerBankAccountService.js';
import { CustomerNotificationService } from './services/customerNotificationService.js';
import { EventService } from './services/eventService.js';
import { ExportService } from './services/exportService.js';
import { FundsAvailabilityService } from './services/fundsAvailabilityService.js';
import { InstalmentScheduleService } from './services/instalmentScheduleService.js';
import { InstitutionService } from './services/institutionService.js';
import { LogoService } from './services/logoService.js';
import { MandateService } from './services/mandateService.js';
import { MandateImportService } from './services/mandateImportService.js';
import { MandateImportEntryService } from './services/mandateImportEntryService.js';
import { MandatePdfService } from './services/mandatePdfService.js';
import { NegativeBalanceLimitService } from './services/negativeBalanceLimitService.js';
import { OutboundPaymentService } from './services/outboundPaymentService.js';
import { PayerAuthorisationService } from './services/payerAuthorisationService.js';
import { PayerThemeService } from './services/payerThemeService.js';
import { PaymentService } from './services/paymentService.js';
import { PaymentAccountService } from './services/paymentAccountService.js';
import { PaymentAccountTransactionService } from './services/paymentAccountTransactionService.js';
import { PayoutService } from './services/payoutService.js';
import { PayoutItemService } from './services/payoutItemService.js';
import { RedirectFlowService } from './services/redirectFlowService.js';
import { RefundService } from './services/refundService.js';
import { ScenarioSimulatorService } from './services/scenarioSimulatorService.js';
import { SchemeIdentifierService } from './services/schemeIdentifierService.js';
import { SubscriptionService } from './services/subscriptionService.js';
import { TaxRateService } from './services/taxRateService.js';
import { TransferredMandateService } from './services/transferredMandateService.js';
import { VerificationDetailService } from './services/verificationDetailService.js';
import { WebhookService } from './services/webhookService.js';
export class GoCardlessClient {
    constructor(token, environment = Environments.Live, options = {}) {
        this._api = new Api(token, environment, options);
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
            this._balances = new BalanceService(this._api);
        }
        return this._balances;
    }
    get bankAccountDetails() {
        if (!this._bankAccountDetails) {
            this._bankAccountDetails = new BankAccountDetailService(this._api);
        }
        return this._bankAccountDetails;
    }
    get bankAccountHolderVerifications() {
        if (!this._bankAccountHolderVerifications) {
            this._bankAccountHolderVerifications = new BankAccountHolderVerificationService(this._api);
        }
        return this._bankAccountHolderVerifications;
    }
    get bankAuthorisations() {
        if (!this._bankAuthorisations) {
            this._bankAuthorisations = new BankAuthorisationService(this._api);
        }
        return this._bankAuthorisations;
    }
    get bankDetailsLookups() {
        if (!this._bankDetailsLookups) {
            this._bankDetailsLookups = new BankDetailsLookupService(this._api);
        }
        return this._bankDetailsLookups;
    }
    get billingRequests() {
        if (!this._billingRequests) {
            this._billingRequests = new BillingRequestService(this._api);
        }
        return this._billingRequests;
    }
    get billingRequestFlows() {
        if (!this._billingRequestFlows) {
            this._billingRequestFlows = new BillingRequestFlowService(this._api);
        }
        return this._billingRequestFlows;
    }
    get billingRequestTemplates() {
        if (!this._billingRequestTemplates) {
            this._billingRequestTemplates = new BillingRequestTemplateService(this._api);
        }
        return this._billingRequestTemplates;
    }
    get billingRequestWithActions() {
        if (!this._billingRequestWithActions) {
            this._billingRequestWithActions = new BillingRequestWithActionService(this._api);
        }
        return this._billingRequestWithActions;
    }
    get blocks() {
        if (!this._blocks) {
            this._blocks = new BlockService(this._api);
        }
        return this._blocks;
    }
    get creditors() {
        if (!this._creditors) {
            this._creditors = new CreditorService(this._api);
        }
        return this._creditors;
    }
    get creditorBankAccounts() {
        if (!this._creditorBankAccounts) {
            this._creditorBankAccounts = new CreditorBankAccountService(this._api);
        }
        return this._creditorBankAccounts;
    }
    get currencyExchangeRates() {
        if (!this._currencyExchangeRates) {
            this._currencyExchangeRates = new CurrencyExchangeRateService(this._api);
        }
        return this._currencyExchangeRates;
    }
    get customers() {
        if (!this._customers) {
            this._customers = new CustomerService(this._api);
        }
        return this._customers;
    }
    get customerBankAccounts() {
        if (!this._customerBankAccounts) {
            this._customerBankAccounts = new CustomerBankAccountService(this._api);
        }
        return this._customerBankAccounts;
    }
    get customerNotifications() {
        if (!this._customerNotifications) {
            this._customerNotifications = new CustomerNotificationService(this._api);
        }
        return this._customerNotifications;
    }
    get events() {
        if (!this._events) {
            this._events = new EventService(this._api);
        }
        return this._events;
    }
    get exports() {
        if (!this._exports) {
            this._exports = new ExportService(this._api);
        }
        return this._exports;
    }
    get fundsAvailabilities() {
        if (!this._fundsAvailabilities) {
            this._fundsAvailabilities = new FundsAvailabilityService(this._api);
        }
        return this._fundsAvailabilities;
    }
    get instalmentSchedules() {
        if (!this._instalmentSchedules) {
            this._instalmentSchedules = new InstalmentScheduleService(this._api);
        }
        return this._instalmentSchedules;
    }
    get institutions() {
        if (!this._institutions) {
            this._institutions = new InstitutionService(this._api);
        }
        return this._institutions;
    }
    get logos() {
        if (!this._logos) {
            this._logos = new LogoService(this._api);
        }
        return this._logos;
    }
    get mandates() {
        if (!this._mandates) {
            this._mandates = new MandateService(this._api);
        }
        return this._mandates;
    }
    get mandateImports() {
        if (!this._mandateImports) {
            this._mandateImports = new MandateImportService(this._api);
        }
        return this._mandateImports;
    }
    get mandateImportEntries() {
        if (!this._mandateImportEntries) {
            this._mandateImportEntries = new MandateImportEntryService(this._api);
        }
        return this._mandateImportEntries;
    }
    get mandatePdfs() {
        if (!this._mandatePdfs) {
            this._mandatePdfs = new MandatePdfService(this._api);
        }
        return this._mandatePdfs;
    }
    get negativeBalanceLimits() {
        if (!this._negativeBalanceLimits) {
            this._negativeBalanceLimits = new NegativeBalanceLimitService(this._api);
        }
        return this._negativeBalanceLimits;
    }
    get outboundPayments() {
        if (!this._outboundPayments) {
            this._outboundPayments = new OutboundPaymentService(this._api);
        }
        return this._outboundPayments;
    }
    get payerAuthorisations() {
        if (!this._payerAuthorisations) {
            this._payerAuthorisations = new PayerAuthorisationService(this._api);
        }
        return this._payerAuthorisations;
    }
    get payerThemes() {
        if (!this._payerThemes) {
            this._payerThemes = new PayerThemeService(this._api);
        }
        return this._payerThemes;
    }
    get payments() {
        if (!this._payments) {
            this._payments = new PaymentService(this._api);
        }
        return this._payments;
    }
    get paymentAccounts() {
        if (!this._paymentAccounts) {
            this._paymentAccounts = new PaymentAccountService(this._api);
        }
        return this._paymentAccounts;
    }
    get paymentAccountTransactions() {
        if (!this._paymentAccountTransactions) {
            this._paymentAccountTransactions = new PaymentAccountTransactionService(this._api);
        }
        return this._paymentAccountTransactions;
    }
    get payouts() {
        if (!this._payouts) {
            this._payouts = new PayoutService(this._api);
        }
        return this._payouts;
    }
    get payoutItems() {
        if (!this._payoutItems) {
            this._payoutItems = new PayoutItemService(this._api);
        }
        return this._payoutItems;
    }
    get redirectFlows() {
        if (!this._redirectFlows) {
            this._redirectFlows = new RedirectFlowService(this._api);
        }
        return this._redirectFlows;
    }
    get refunds() {
        if (!this._refunds) {
            this._refunds = new RefundService(this._api);
        }
        return this._refunds;
    }
    get scenarioSimulators() {
        if (!this._scenarioSimulators) {
            this._scenarioSimulators = new ScenarioSimulatorService(this._api);
        }
        return this._scenarioSimulators;
    }
    get schemeIdentifiers() {
        if (!this._schemeIdentifiers) {
            this._schemeIdentifiers = new SchemeIdentifierService(this._api);
        }
        return this._schemeIdentifiers;
    }
    get subscriptions() {
        if (!this._subscriptions) {
            this._subscriptions = new SubscriptionService(this._api);
        }
        return this._subscriptions;
    }
    get taxRates() {
        if (!this._taxRates) {
            this._taxRates = new TaxRateService(this._api);
        }
        return this._taxRates;
    }
    get transferredMandates() {
        if (!this._transferredMandates) {
            this._transferredMandates = new TransferredMandateService(this._api);
        }
        return this._transferredMandates;
    }
    get verificationDetails() {
        if (!this._verificationDetails) {
            this._verificationDetails = new VerificationDetailService(this._api);
        }
        return this._verificationDetails;
    }
    get webhooks() {
        if (!this._webhooks) {
            this._webhooks = new WebhookService(this._api);
        }
        return this._webhooks;
    }
}
//# sourceMappingURL=client.js.map