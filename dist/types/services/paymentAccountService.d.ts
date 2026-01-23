import * as Types from '../types/Types.js';
interface PaymentAccountResponse extends Types.PaymentAccount, Types.APIResponse {
}
interface PaymentAccountListResponse extends Types.APIResponse {
    payment_accounts: Array<Types.PaymentAccount>;
    meta: Types.ListMeta;
}
interface PaymentAccountListRequest {
    after?: string;
    before?: string;
    limit?: string;
}
export declare class PaymentAccountService {
    private api;
    constructor(api: any);
    find(identity: string, customHeaders?: Types.JsonMap): Promise<PaymentAccountResponse>;
    list(requestParameters: PaymentAccountListRequest, customHeaders?: Types.JsonMap): Promise<PaymentAccountListResponse>;
    all(requestParameters: PaymentAccountListRequest, customHeaders?: Types.JsonMap): AsyncGenerator<Types.PaymentAccount, void, unknown>;
}
export {};
//# sourceMappingURL=paymentAccountService.d.ts.map