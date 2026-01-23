import * as Types from '../types/Types.js';
interface CreditorBankAccountResponse extends Types.CreditorBankAccount, Types.APIResponse {
}
interface CreditorBankAccountListResponse extends Types.APIResponse {
    creditor_bank_accounts: Array<Types.CreditorBankAccount>;
    meta: Types.ListMeta;
}
interface CreditorBankAccountCreateRequest {
    account_holder_name: string;
    account_number?: string;
    account_type?: Types.CreditorBankAccountAccountType;
    bank_code?: string;
    branch_code?: string;
    country_code?: string;
    currency?: string;
    iban?: string;
    links: Types.CreditorBankAccountCreateRequestLinks;
    metadata?: Types.JsonMap;
    set_as_default_payout_account?: boolean;
}
interface CreditorBankAccountListRequest {
    after?: string;
    before?: string;
    created_at?: Types.CreatedAtFilter;
    creditor?: string;
    enabled?: boolean;
    limit?: string;
}
export declare class CreditorBankAccountService {
    private api;
    constructor(api: any);
    create(requestParameters: CreditorBankAccountCreateRequest, idempotencyKey?: string, customHeaders?: Types.JsonMap): Promise<CreditorBankAccountResponse>;
    list(requestParameters: CreditorBankAccountListRequest, customHeaders?: Types.JsonMap): Promise<CreditorBankAccountListResponse>;
    all(requestParameters: CreditorBankAccountListRequest, customHeaders?: Types.JsonMap): AsyncGenerator<Types.CreditorBankAccount, void, unknown>;
    find(identity: string, customHeaders?: Types.JsonMap): Promise<CreditorBankAccountResponse>;
    disable(identity: string, customHeaders?: Types.JsonMap): Promise<CreditorBankAccountResponse>;
}
export {};
//# sourceMappingURL=creditorBankAccountService.d.ts.map