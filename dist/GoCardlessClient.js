'use strict';
const Constants = require('./Constants');
const Api = require('./api/Api');
const BankDetailsLookups = require('./services/BankDetailsLookups');
const Creditors = require('./services/Creditors');
const CreditorBankAccounts = require('./services/CreditorBankAccounts');
const Customers = require('./services/Customers');
const CustomerBankAccounts = require('./services/CustomerBankAccounts');
const CustomerNotifications = require('./services/CustomerNotifications');
const Events = require('./services/Events');
const Mandates = require('./services/Mandates');
const MandateImports = require('./services/MandateImports');
const MandateImportEntries = require('./services/MandateImportEntries');
const MandatePdfs = require('./services/MandatePdfs');
const Payments = require('./services/Payments');
const Payouts = require('./services/Payouts');
const PayoutItems = require('./services/PayoutItems');
const RedirectFlows = require('./services/RedirectFlows');
const Refunds = require('./services/Refunds');
const Subscriptions = require('./services/Subscriptions');
function GoCardlessClient(token, environment = Constants.Environments.LIVE, options = {}) {
    this._api = new Api(token, environment, options);
    this._bankDetailsLookups = undefined;
    this._creditors = undefined;
    this._creditorBankAccounts = undefined;
    this._customers = undefined;
    this._customerBankAccounts = undefined;
    this._customerNotifications = undefined;
    this._events = undefined;
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
Object.defineProperty(GoCardlessClient.prototype, 'bankDetailsLookups', {
    get: function () {
        if (!this._bankDetailsLookups) {
            this._bankDetailsLookups = new BankDetailsLookups(this._api);
        }
        return this._bankDetailsLookups;
    },
});
Object.defineProperty(GoCardlessClient.prototype, 'creditors', {
    get: function () {
        if (!this._creditors) {
            this._creditors = new Creditors(this._api);
        }
        return this._creditors;
    },
});
Object.defineProperty(GoCardlessClient.prototype, 'creditorBankAccounts', {
    get: function () {
        if (!this._creditorBankAccounts) {
            this._creditorBankAccounts = new CreditorBankAccounts(this._api);
        }
        return this._creditorBankAccounts;
    },
});
Object.defineProperty(GoCardlessClient.prototype, 'customers', {
    get: function () {
        if (!this._customers) {
            this._customers = new Customers(this._api);
        }
        return this._customers;
    },
});
Object.defineProperty(GoCardlessClient.prototype, 'customerBankAccounts', {
    get: function () {
        if (!this._customerBankAccounts) {
            this._customerBankAccounts = new CustomerBankAccounts(this._api);
        }
        return this._customerBankAccounts;
    },
});
Object.defineProperty(GoCardlessClient.prototype, 'customerNotifications', {
    get: function () {
        if (!this._customerNotifications) {
            this._customerNotifications = new CustomerNotifications(this._api);
        }
        return this._customerNotifications;
    },
});
Object.defineProperty(GoCardlessClient.prototype, 'events', {
    get: function () {
        if (!this._events) {
            this._events = new Events(this._api);
        }
        return this._events;
    },
});
Object.defineProperty(GoCardlessClient.prototype, 'mandates', {
    get: function () {
        if (!this._mandates) {
            this._mandates = new Mandates(this._api);
        }
        return this._mandates;
    },
});
Object.defineProperty(GoCardlessClient.prototype, 'mandateImports', {
    get: function () {
        if (!this._mandateImports) {
            this._mandateImports = new MandateImports(this._api);
        }
        return this._mandateImports;
    },
});
Object.defineProperty(GoCardlessClient.prototype, 'mandateImportEntries', {
    get: function () {
        if (!this._mandateImportEntries) {
            this._mandateImportEntries = new MandateImportEntries(this._api);
        }
        return this._mandateImportEntries;
    },
});
Object.defineProperty(GoCardlessClient.prototype, 'mandatePdfs', {
    get: function () {
        if (!this._mandatePdfs) {
            this._mandatePdfs = new MandatePdfs(this._api);
        }
        return this._mandatePdfs;
    },
});
Object.defineProperty(GoCardlessClient.prototype, 'payments', {
    get: function () {
        if (!this._payments) {
            this._payments = new Payments(this._api);
        }
        return this._payments;
    },
});
Object.defineProperty(GoCardlessClient.prototype, 'payouts', {
    get: function () {
        if (!this._payouts) {
            this._payouts = new Payouts(this._api);
        }
        return this._payouts;
    },
});
Object.defineProperty(GoCardlessClient.prototype, 'payoutItems', {
    get: function () {
        if (!this._payoutItems) {
            this._payoutItems = new PayoutItems(this._api);
        }
        return this._payoutItems;
    },
});
Object.defineProperty(GoCardlessClient.prototype, 'redirectFlows', {
    get: function () {
        if (!this._redirectFlows) {
            this._redirectFlows = new RedirectFlows(this._api);
        }
        return this._redirectFlows;
    },
});
Object.defineProperty(GoCardlessClient.prototype, 'refunds', {
    get: function () {
        if (!this._refunds) {
            this._refunds = new Refunds(this._api);
        }
        return this._refunds;
    },
});
Object.defineProperty(GoCardlessClient.prototype, 'subscriptions', {
    get: function () {
        if (!this._subscriptions) {
            this._subscriptions = new Subscriptions(this._api);
        }
        return this._subscriptions;
    },
});
module.exports = GoCardlessClient;
//# sourceMappingURL=GoCardlessClient.js.map