'use strict';
const Constants_1 = require("./Constants");
const Api_1 = require("./api/Api");
const BankDetailsLookupService_1 = require("./services/BankDetailsLookupService");
const CreditorService_1 = require("./services/CreditorService");
const CreditorBankAccountService_1 = require("./services/CreditorBankAccountService");
const CustomerService_1 = require("./services/CustomerService");
const CustomerBankAccountService_1 = require("./services/CustomerBankAccountService");
const CustomerNotificationService_1 = require("./services/CustomerNotificationService");
const EventService_1 = require("./services/EventService");
const InstalmentScheduleService_1 = require("./services/InstalmentScheduleService");
const MandateService_1 = require("./services/MandateService");
const MandateImportService_1 = require("./services/MandateImportService");
const MandateImportEntryService_1 = require("./services/MandateImportEntryService");
const MandatePdfService_1 = require("./services/MandatePdfService");
const PaymentService_1 = require("./services/PaymentService");
const PayoutService_1 = require("./services/PayoutService");
const PayoutItemService_1 = require("./services/PayoutItemService");
const RedirectFlowService_1 = require("./services/RedirectFlowService");
const RefundService_1 = require("./services/RefundService");
const SubscriptionService_1 = require("./services/SubscriptionService");
class GoCardlessClient {
    constructor(token, environment = Constants_1.Environments.Live, options = {}) {
        this._api = new Api_1.Api(token, environment, options);
        this._bankDetailsLookups = undefined;
        this._creditors = undefined;
        this._creditorBankAccounts = undefined;
        this._customers = undefined;
        this._customerBankAccounts = undefined;
        this._customerNotifications = undefined;
        this._events = undefined;
        this._instalmentSchedules = undefined;
        this._mandates = undefined;
        this._mandateImports = undefined;
        this._mandateImportEntries = undefined;
        this._mandatePdfs = undefined;
        this._payments = undefined;
        this._payouts = undefined;
        this._payoutItems = undefined;
        this._redirectFlows = undefined;
        this._refunds = undefined;
        this._subscriptions = undefined;
    }
    get bankDetailsLookups() {
        if (!this._bankDetailsLookups) {
            this._bankDetailsLookups = new BankDetailsLookupService_1.BankDetailsLookupService(this._api);
        }
        return this._bankDetailsLookups;
    }
    get creditors() {
        if (!this._creditors) {
            this._creditors = new CreditorService_1.CreditorService(this._api);
        }
        return this._creditors;
    }
    get creditorBankAccounts() {
        if (!this._creditorBankAccounts) {
            this._creditorBankAccounts = new CreditorBankAccountService_1.CreditorBankAccountService(this._api);
        }
        return this._creditorBankAccounts;
    }
    get customers() {
        if (!this._customers) {
            this._customers = new CustomerService_1.CustomerService(this._api);
        }
        return this._customers;
    }
    get customerBankAccounts() {
        if (!this._customerBankAccounts) {
            this._customerBankAccounts = new CustomerBankAccountService_1.CustomerBankAccountService(this._api);
        }
        return this._customerBankAccounts;
    }
    get customerNotifications() {
        if (!this._customerNotifications) {
            this._customerNotifications = new CustomerNotificationService_1.CustomerNotificationService(this._api);
        }
        return this._customerNotifications;
    }
    get events() {
        if (!this._events) {
            this._events = new EventService_1.EventService(this._api);
        }
        return this._events;
    }
    get instalmentSchedules() {
        if (!this._instalmentSchedules) {
            this._instalmentSchedules = new InstalmentScheduleService_1.InstalmentScheduleService(this._api);
        }
        return this._instalmentSchedules;
    }
    get mandates() {
        if (!this._mandates) {
            this._mandates = new MandateService_1.MandateService(this._api);
        }
        return this._mandates;
    }
    get mandateImports() {
        if (!this._mandateImports) {
            this._mandateImports = new MandateImportService_1.MandateImportService(this._api);
        }
        return this._mandateImports;
    }
    get mandateImportEntries() {
        if (!this._mandateImportEntries) {
            this._mandateImportEntries = new MandateImportEntryService_1.MandateImportEntryService(this._api);
        }
        return this._mandateImportEntries;
    }
    get mandatePdfs() {
        if (!this._mandatePdfs) {
            this._mandatePdfs = new MandatePdfService_1.MandatePdfService(this._api);
        }
        return this._mandatePdfs;
    }
    get payments() {
        if (!this._payments) {
            this._payments = new PaymentService_1.PaymentService(this._api);
        }
        return this._payments;
    }
    get payouts() {
        if (!this._payouts) {
            this._payouts = new PayoutService_1.PayoutService(this._api);
        }
        return this._payouts;
    }
    get payoutItems() {
        if (!this._payoutItems) {
            this._payoutItems = new PayoutItemService_1.PayoutItemService(this._api);
        }
        return this._payoutItems;
    }
    get redirectFlows() {
        if (!this._redirectFlows) {
            this._redirectFlows = new RedirectFlowService_1.RedirectFlowService(this._api);
        }
        return this._redirectFlows;
    }
    get refunds() {
        if (!this._refunds) {
            this._refunds = new RefundService_1.RefundService(this._api);
        }
        return this._refunds;
    }
    get subscriptions() {
        if (!this._subscriptions) {
            this._subscriptions = new SubscriptionService_1.SubscriptionService(this._api);
        }
        return this._subscriptions;
    }
}
module.exports = GoCardlessClient;
//# sourceMappingURL=GoCardlessClient.js.map