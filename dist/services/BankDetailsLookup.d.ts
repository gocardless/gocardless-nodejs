interface BankDetailsLookup {
}
interface BankDetailsLookupResponse {
    bankdetailslookup: BankDetailsLookup;
    request: object;
    response: object;
}
interface BankDetailsLookupListResponse {
    bankdetailslookup: BankDetailsLookup[];
    request: object;
    response: object;
}
declare function BankDetailsLookups(api: any): void;
