interface CreditorBankAccount {
}
interface CreditorBankAccountResponse {
    creditorbankaccount: CreditorBankAccount;
    request: object;
    response: object;
}
interface CreditorBankAccountListResponse {
    creditorbankaccount: CreditorBankAccount[];
    request: object;
    response: object;
}
declare function CreditorBankAccounts(api: any): void;
