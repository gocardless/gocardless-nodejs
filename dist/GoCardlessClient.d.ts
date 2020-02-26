import { Environments } from './Constants';
import { BankDetailsLookupService } from './services/BankDetailsLookupService';
import { CreditorService } from './services/CreditorService';
import { CreditorBankAccountService } from './services/CreditorBankAccountService';
import { CustomerService } from './services/CustomerService';
import { CustomerBankAccountService } from './services/CustomerBankAccountService';
import { CustomerNotificationService } from './services/CustomerNotificationService';
import { EventService } from './services/EventService';
import { InstalmentScheduleService } from './services/InstalmentScheduleService';
import { MandateService } from './services/MandateService';
import { MandateImportService } from './services/MandateImportService';
import { MandateImportEntryService } from './services/MandateImportEntryService';
import { MandatePdfService } from './services/MandatePdfService';
import { PaymentService } from './services/PaymentService';
import { PayoutService } from './services/PayoutService';
import { PayoutItemService } from './services/PayoutItemService';
import { RedirectFlowService } from './services/RedirectFlowService';
import { RefundService } from './services/RefundService';
import { SubscriptionService } from './services/SubscriptionService';
declare class GoCardlessClient {
    private _api;
    private _bankDetailsLookups;
    private _creditors;
    private _creditorBankAccounts;
    private _customers;
    private _customerBankAccounts;
    private _customerNotifications;
    private _events;
    private _instalmentSchedules;
    private _mandates;
    private _mandateImports;
    private _mandateImportEntries;
    private _mandatePdfs;
    private _payments;
    private _payouts;
    private _payoutItems;
    private _redirectFlows;
    private _refunds;
    private _subscriptions;
    constructor(token: string, environment?: Environments, options?: {});
    get bankDetailsLookups(): BankDetailsLookupService;
    get creditors(): CreditorService;
    get creditorBankAccounts(): CreditorBankAccountService;
    get customers(): CustomerService;
    get customerBankAccounts(): CustomerBankAccountService;
    get customerNotifications(): CustomerNotificationService;
    get events(): EventService;
    get instalmentSchedules(): InstalmentScheduleService;
    get mandates(): MandateService;
    get mandateImports(): MandateImportService;
    get mandateImportEntries(): MandateImportEntryService;
    get mandatePdfs(): MandatePdfService;
    get payments(): PaymentService;
    get payouts(): PayoutService;
    get payoutItems(): PayoutItemService;
    get redirectFlows(): RedirectFlowService;
    get refunds(): RefundService;
    get subscriptions(): SubscriptionService;
}
export = GoCardlessClient;
