import { BankDetailsLookup, ResponseMetadata } from '../types/Types';
interface BankDetailsLookupResponse extends BankDetailsLookup {
    __metadata__: ResponseMetadata;
}
interface BankDetailsLookupCreateRequest {
    account_number?: string;
    bank_code?: string;
    branch_code?: string;
    country_code?: string;
    iban?: string;
}
export declare class BankDetailsLookupService {
    private api;
    constructor(api: any);
    create(requestParameters: BankDetailsLookupCreateRequest, headers?: object): Promise<BankDetailsLookupResponse>;
}
export {};
