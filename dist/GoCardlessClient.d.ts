export = GoCardlessClient;
declare function GoCardlessClient(token: any, environment?: string, options?: {}): void;
declare class GoCardlessClient {
    constructor(token: any, environment?: string, options?: {});
    _api: any;
    _bankDetailsLookups: any;
    _creditors: any;
    _creditorBankAccounts: any;
    _customers: any;
    _customerBankAccounts: any;
    _customerNotifications: any;
    _events: any;
    _instalmentSchedules: any;
    _mandates: any;
    _mandateImports: any;
    _mandateImportEntries: any;
    _mandatePdfs: any;
    _payments: any;
    _payouts: any;
    _payoutItems: any;
    _redirectFlows: any;
    _refunds: any;
    _subscriptions: any;
    get bankDetailsLookups(): any;
    get creditors(): any;
    get creditorBankAccounts(): any;
    get customers(): any;
    get customerBankAccounts(): any;
    get customerNotifications(): any;
    get events(): any;
    get instalmentSchedules(): any;
    get mandates(): any;
    get mandateImports(): any;
    get mandateImportEntries(): any;
    get mandatePdfs(): any;
    get payments(): any;
    get payouts(): any;
    get payoutItems(): any;
    get redirectFlows(): any;
    get refunds(): any;
    get subscriptions(): any;
}
