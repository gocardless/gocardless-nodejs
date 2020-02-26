import { CustomerBankAccount, ResponseMetadata, JsonMap, CustomerBankAccountAccountType, CustomerBankAccountCreateRequestLinks, CreatedAtFilter } from '../types/Types';
interface CustomerBankAccountResponse extends CustomerBankAccount {
    __metadata__: ResponseMetadata;
}
interface CustomerBankAccountListResponse extends Array<CustomerBankAccount> {
    __metadata__: ResponseMetadata;
}
interface CustomerBankAccountCreateRequest {
    account_holder_name: string;
    account_number?: string;
    account_type?: CustomerBankAccountAccountType;
    bank_code?: string;
    branch_code?: string;
    country_code?: string;
    currency?: string;
    iban?: string;
    links: CustomerBankAccountCreateRequestLinks;
    metadata?: JsonMap;
}
interface CustomerBankAccountListRequest {
    after?: string;
    before?: string;
    created_at?: CreatedAtFilter;
    customer?: string;
    enabled?: boolean;
    limit?: string;
}
interface CustomerBankAccountUpdateRequest {
    metadata?: JsonMap;
}
export declare class CustomerBankAccountService {
    private api;
    constructor(api: any);
    create(requestParameters: CustomerBankAccountCreateRequest, idempotencyKey?: string): Promise<CustomerBankAccountResponse>;
    list(requestParameters: CustomerBankAccountListRequest): Promise<CustomerBankAccountListResponse>;
    find(identity: string): Promise<CustomerBankAccountResponse>;
    update(identity: string, requestParameters: CustomerBankAccountUpdateRequest): Promise<CustomerBankAccountResponse>;
    disable(identity: string): Promise<CustomerBankAccountResponse>;
}
export {};
