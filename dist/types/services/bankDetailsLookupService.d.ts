import * as Types from '../types/Types.js';
interface BankDetailsLookupResponse extends Types.BankDetailsLookup, Types.APIResponse {
}
interface BankDetailsLookupCreateRequest {
    account_holder_name?: string;
    account_number?: string;
    bank_code?: string;
    branch_code?: string;
    country_code?: string;
    iban?: string;
}
export declare class BankDetailsLookupService {
    private api;
    constructor(api: any);
    create(requestParameters: BankDetailsLookupCreateRequest, idempotencyKey?: string, customHeaders?: Types.JsonMap): Promise<BankDetailsLookupResponse>;
}
export {};
//# sourceMappingURL=bankDetailsLookupService.d.ts.map