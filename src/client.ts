'use strict';

import { Environments } from './constants';
import { Api } from './api/api';
import { BalanceService } from './services/balanceService';
import { BankAccountDetailService } from './services/bankAccountDetailService';
import { BankAuthorisationService } from './services/bankAuthorisationService';
import { BankDetailsLookupService } from './services/bankDetailsLookupService';
import { BillingRequestService } from './services/billingRequestService';
import { BillingRequestFlowService } from './services/billingRequestFlowService';
import { BillingRequestTemplateService } from './services/billingRequestTemplateService';
import { BillingRequestWithActionService } from './services/billingRequestWithActionService';
import { BlockService } from './services/blockService';
import { CreditorService } from './services/creditorService';
import { CreditorBankAccountService } from './services/creditorBankAccountService';
import { CurrencyExchangeRateService } from './services/currencyExchangeRateService';
import { CustomerService } from './services/customerService';
import { CustomerBankAccountService } from './services/customerBankAccountService';
import { CustomerNotificationService } from './services/customerNotificationService';
import { EventService } from './services/eventService';
import { ExportService } from './services/exportService';
import { InstalmentScheduleService } from './services/instalmentScheduleService';
import { InstitutionService } from './services/institutionService';
import { LogoService } from './services/logoService';
import { MandateService } from './services/mandateService';
import { MandateImportService } from './services/mandateImportService';
import { MandateImportEntryService } from './services/mandateImportEntryService';
import { MandatePdfService } from './services/mandatePdfService';
import { NegativeBalanceLimitService } from './services/negativeBalanceLimitService';
import { OutboundPaymentService } from './services/outboundPaymentService';
import { PayerAuthorisationService } from './services/payerAuthorisationService';
import { PayerThemeService } from './services/payerThemeService';
import { PaymentService } from './services/paymentService';
import { PayoutService } from './services/payoutService';
import { PayoutItemService } from './services/payoutItemService';
import { RedirectFlowService } from './services/redirectFlowService';
import { RefundService } from './services/refundService';
import { ScenarioSimulatorService } from './services/scenarioSimulatorService';
import { SchemeIdentifierService } from './services/schemeIdentifierService';
import { SubscriptionService } from './services/subscriptionService';
import { TaxRateService } from './services/taxRateService';
import { TransferredMandateService } from './services/transferredMandateService';
import { VerificationDetailService } from './services/verificationDetailService';
import { WebhookService } from './services/webhookService';

export class GoCardlessClient {
  private _api: Api;

  private _balances: BalanceService;
  private _bankAccountDetails: BankAccountDetailService;
  private _bankAuthorisations: BankAuthorisationService;
  private _bankDetailsLookups: BankDetailsLookupService;
  private _billingRequests: BillingRequestService;
  private _billingRequestFlows: BillingRequestFlowService;
  private _billingRequestTemplates: BillingRequestTemplateService;
  private _billingRequestWithActions: BillingRequestWithActionService;
  private _blocks: BlockService;
  private _creditors: CreditorService;
  private _creditorBankAccounts: CreditorBankAccountService;
  private _currencyExchangeRates: CurrencyExchangeRateService;
  private _customers: CustomerService;
  private _customerBankAccounts: CustomerBankAccountService;
  private _customerNotifications: CustomerNotificationService;
  private _events: EventService;
  private _exports: ExportService;
  private _instalmentSchedules: InstalmentScheduleService;
  private _institutions: InstitutionService;
  private _logos: LogoService;
  private _mandates: MandateService;
  private _mandateImports: MandateImportService;
  private _mandateImportEntries: MandateImportEntryService;
  private _mandatePdfs: MandatePdfService;
  private _negativeBalanceLimits: NegativeBalanceLimitService;
  private _outboundPayments: OutboundPaymentService;
  private _payerAuthorisations: PayerAuthorisationService;
  private _payerThemes: PayerThemeService;
  private _payments: PaymentService;
  private _payouts: PayoutService;
  private _payoutItems: PayoutItemService;
  private _redirectFlows: RedirectFlowService;
  private _refunds: RefundService;
  private _scenarioSimulators: ScenarioSimulatorService;
  private _schemeIdentifiers: SchemeIdentifierService;
  private _subscriptions: SubscriptionService;
  private _taxRates: TaxRateService;
  private _transferredMandates: TransferredMandateService;
  private _verificationDetails: VerificationDetailService;
  private _webhooks: WebhookService;

  constructor(token: string, environment = Environments.Live, options = {}) {
    this._api = new Api(token, environment, options);

    this._balances = undefined;
    this._bankAccountDetails = undefined;
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

  get balances(): BalanceService {
    if (!this._balances) {
      this._balances = new BalanceService(this._api);
    }

    return this._balances;
  }

  get bankAccountDetails(): BankAccountDetailService {
    if (!this._bankAccountDetails) {
      this._bankAccountDetails = new BankAccountDetailService(this._api);
    }

    return this._bankAccountDetails;
  }

  get bankAuthorisations(): BankAuthorisationService {
    if (!this._bankAuthorisations) {
      this._bankAuthorisations = new BankAuthorisationService(this._api);
    }

    return this._bankAuthorisations;
  }

  get bankDetailsLookups(): BankDetailsLookupService {
    if (!this._bankDetailsLookups) {
      this._bankDetailsLookups = new BankDetailsLookupService(this._api);
    }

    return this._bankDetailsLookups;
  }

  get billingRequests(): BillingRequestService {
    if (!this._billingRequests) {
      this._billingRequests = new BillingRequestService(this._api);
    }

    return this._billingRequests;
  }

  get billingRequestFlows(): BillingRequestFlowService {
    if (!this._billingRequestFlows) {
      this._billingRequestFlows = new BillingRequestFlowService(this._api);
    }

    return this._billingRequestFlows;
  }

  get billingRequestTemplates(): BillingRequestTemplateService {
    if (!this._billingRequestTemplates) {
      this._billingRequestTemplates = new BillingRequestTemplateService(this._api);
    }

    return this._billingRequestTemplates;
  }

  get billingRequestWithActions(): BillingRequestWithActionService {
    if (!this._billingRequestWithActions) {
      this._billingRequestWithActions = new BillingRequestWithActionService(this._api);
    }

    return this._billingRequestWithActions;
  }

  get blocks(): BlockService {
    if (!this._blocks) {
      this._blocks = new BlockService(this._api);
    }

    return this._blocks;
  }

  get creditors(): CreditorService {
    if (!this._creditors) {
      this._creditors = new CreditorService(this._api);
    }

    return this._creditors;
  }

  get creditorBankAccounts(): CreditorBankAccountService {
    if (!this._creditorBankAccounts) {
      this._creditorBankAccounts = new CreditorBankAccountService(this._api);
    }

    return this._creditorBankAccounts;
  }

  get currencyExchangeRates(): CurrencyExchangeRateService {
    if (!this._currencyExchangeRates) {
      this._currencyExchangeRates = new CurrencyExchangeRateService(this._api);
    }

    return this._currencyExchangeRates;
  }

  get customers(): CustomerService {
    if (!this._customers) {
      this._customers = new CustomerService(this._api);
    }

    return this._customers;
  }

  get customerBankAccounts(): CustomerBankAccountService {
    if (!this._customerBankAccounts) {
      this._customerBankAccounts = new CustomerBankAccountService(this._api);
    }

    return this._customerBankAccounts;
  }

  get customerNotifications(): CustomerNotificationService {
    if (!this._customerNotifications) {
      this._customerNotifications = new CustomerNotificationService(this._api);
    }

    return this._customerNotifications;
  }

  get events(): EventService {
    if (!this._events) {
      this._events = new EventService(this._api);
    }

    return this._events;
  }

  get exports(): ExportService {
    if (!this._exports) {
      this._exports = new ExportService(this._api);
    }

    return this._exports;
  }

  get instalmentSchedules(): InstalmentScheduleService {
    if (!this._instalmentSchedules) {
      this._instalmentSchedules = new InstalmentScheduleService(this._api);
    }

    return this._instalmentSchedules;
  }

  get institutions(): InstitutionService {
    if (!this._institutions) {
      this._institutions = new InstitutionService(this._api);
    }

    return this._institutions;
  }

  get logos(): LogoService {
    if (!this._logos) {
      this._logos = new LogoService(this._api);
    }

    return this._logos;
  }

  get mandates(): MandateService {
    if (!this._mandates) {
      this._mandates = new MandateService(this._api);
    }

    return this._mandates;
  }

  get mandateImports(): MandateImportService {
    if (!this._mandateImports) {
      this._mandateImports = new MandateImportService(this._api);
    }

    return this._mandateImports;
  }

  get mandateImportEntries(): MandateImportEntryService {
    if (!this._mandateImportEntries) {
      this._mandateImportEntries = new MandateImportEntryService(this._api);
    }

    return this._mandateImportEntries;
  }

  get mandatePdfs(): MandatePdfService {
    if (!this._mandatePdfs) {
      this._mandatePdfs = new MandatePdfService(this._api);
    }

    return this._mandatePdfs;
  }

  get negativeBalanceLimits(): NegativeBalanceLimitService {
    if (!this._negativeBalanceLimits) {
      this._negativeBalanceLimits = new NegativeBalanceLimitService(this._api);
    }

    return this._negativeBalanceLimits;
  }

  get outboundPayments(): OutboundPaymentService {
    if (!this._outboundPayments) {
      this._outboundPayments = new OutboundPaymentService(this._api);
    }

    return this._outboundPayments;
  }

  get payerAuthorisations(): PayerAuthorisationService {
    if (!this._payerAuthorisations) {
      this._payerAuthorisations = new PayerAuthorisationService(this._api);
    }

    return this._payerAuthorisations;
  }

  get payerThemes(): PayerThemeService {
    if (!this._payerThemes) {
      this._payerThemes = new PayerThemeService(this._api);
    }

    return this._payerThemes;
  }

  get payments(): PaymentService {
    if (!this._payments) {
      this._payments = new PaymentService(this._api);
    }

    return this._payments;
  }

  get payouts(): PayoutService {
    if (!this._payouts) {
      this._payouts = new PayoutService(this._api);
    }

    return this._payouts;
  }

  get payoutItems(): PayoutItemService {
    if (!this._payoutItems) {
      this._payoutItems = new PayoutItemService(this._api);
    }

    return this._payoutItems;
  }

  get redirectFlows(): RedirectFlowService {
    if (!this._redirectFlows) {
      this._redirectFlows = new RedirectFlowService(this._api);
    }

    return this._redirectFlows;
  }

  get refunds(): RefundService {
    if (!this._refunds) {
      this._refunds = new RefundService(this._api);
    }

    return this._refunds;
  }

  get scenarioSimulators(): ScenarioSimulatorService {
    if (!this._scenarioSimulators) {
      this._scenarioSimulators = new ScenarioSimulatorService(this._api);
    }

    return this._scenarioSimulators;
  }

  get schemeIdentifiers(): SchemeIdentifierService {
    if (!this._schemeIdentifiers) {
      this._schemeIdentifiers = new SchemeIdentifierService(this._api);
    }

    return this._schemeIdentifiers;
  }

  get subscriptions(): SubscriptionService {
    if (!this._subscriptions) {
      this._subscriptions = new SubscriptionService(this._api);
    }

    return this._subscriptions;
  }

  get taxRates(): TaxRateService {
    if (!this._taxRates) {
      this._taxRates = new TaxRateService(this._api);
    }

    return this._taxRates;
  }

  get transferredMandates(): TransferredMandateService {
    if (!this._transferredMandates) {
      this._transferredMandates = new TransferredMandateService(this._api);
    }

    return this._transferredMandates;
  }

  get verificationDetails(): VerificationDetailService {
    if (!this._verificationDetails) {
      this._verificationDetails = new VerificationDetailService(this._api);
    }

    return this._verificationDetails;
  }

  get webhooks(): WebhookService {
    if (!this._webhooks) {
      this._webhooks = new WebhookService(this._api);
    }

    return this._webhooks;
  }
}
