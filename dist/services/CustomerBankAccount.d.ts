interface CustomerBankAccount {
}
interface CustomerBankAccountResponse {
    customerbankaccount: CustomerBankAccount;
    request: object;
    response: object;
}
interface CustomerBankAccountListResponse {
    customerbankaccount: CustomerBankAccount[];
    request: object;
    response: object;
}
declare function CustomerBankAccounts(api: any): void;
