import { CreditorBankAccount, ResponseMetadata, JsonMap, CreditorBankAccountAccountType, CreditorBankAccountCreateRequestLinks, CreatedAtFilter } from '../types/Types';
interface CreditorBankAccountResponse extends CreditorBankAccount {
    __metadata__: ResponseMetadata;
}
interface CreditorBankAccountListResponse extends Array<CreditorBankAccount> {
    __metadata__: ResponseMetadata;
}
interface CreditorBankAccountCreateRequest {
    account_holder_name: string;
    account_number?: string;
    account_type?: CreditorBankAccountAccountType;
    bank_code?: string;
    branch_code?: string;
    country_code?: string;
    currency?: string;
    iban?: string;
    links: CreditorBankAccountCreateRequestLinks;
    metadata?: JsonMap;
    set_as_default_payout_account?: boolean;
}
interface CreditorBankAccountListRequest {
    after?: string;
    before?: string;
    created_at?: CreatedAtFilter;
    creditor?: string;
    enabled?: boolean;
    limit?: string;
}
export declare class CreditorBankAccountService {
    private api;
    constructor(api: any);
    create(requestParameters: CreditorBankAccountCreateRequest, idempotencyKey?: string): Promise<CreditorBankAccountResponse>;
    list(requestParameters: CreditorBankAccountListRequest): Promise<CreditorBankAccountListResponse>;
    find(identity: string): Promise<CreditorBankAccountResponse>;
    disable(identity: string): Promise<CreditorBankAccountResponse>;
}
export {};
