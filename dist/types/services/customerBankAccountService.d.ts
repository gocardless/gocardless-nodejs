import * as Types from '../types/Types.js';
interface CustomerBankAccountResponse extends Types.CustomerBankAccount, Types.APIResponse {
}
interface CustomerBankAccountListResponse extends Types.APIResponse {
    customer_bank_accounts: Array<Types.CustomerBankAccount>;
    meta: Types.ListMeta;
}
interface CustomerBankAccountCreateRequest {
    account_holder_name?: string;
    account_number?: string;
    account_type?: Types.CustomerBankAccountAccountType;
    bank_code?: string;
    branch_code?: string;
    country_code?: string;
    currency?: string;
    iban?: string;
    links: Types.CustomerBankAccountCreateRequestLinks;
    metadata?: Types.JsonMap;
}
interface CustomerBankAccountListRequest {
    after?: string;
    before?: string;
    created_at?: Types.CreatedAtFilter;
    customer?: string;
    enabled?: boolean;
    limit?: string;
}
interface CustomerBankAccountUpdateRequest {
    metadata?: Types.JsonMap;
}
export declare class CustomerBankAccountService {
    private api;
    constructor(api: any);
    create(requestParameters: CustomerBankAccountCreateRequest, idempotencyKey?: string, customHeaders?: Types.JsonMap): Promise<CustomerBankAccountResponse>;
    list(requestParameters: CustomerBankAccountListRequest, customHeaders?: Types.JsonMap): Promise<CustomerBankAccountListResponse>;
    all(requestParameters: CustomerBankAccountListRequest, customHeaders?: Types.JsonMap): AsyncGenerator<Types.CustomerBankAccount, void, unknown>;
    find(identity: string, customHeaders?: Types.JsonMap): Promise<CustomerBankAccountResponse>;
    update(identity: string, requestParameters: CustomerBankAccountUpdateRequest, customHeaders?: Types.JsonMap): Promise<CustomerBankAccountResponse>;
    disable(identity: string, customHeaders?: Types.JsonMap): Promise<CustomerBankAccountResponse>;
}
export {};
//# sourceMappingURL=customerBankAccountService.d.ts.map