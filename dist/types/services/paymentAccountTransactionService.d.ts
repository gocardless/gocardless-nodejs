import * as Types from '../types/Types.js';
interface PaymentAccountTransactionListResponse extends Types.APIResponse {
    payment_account_transactions: Array<Types.PaymentAccountTransaction>;
    meta: Types.ListMeta;
}
interface PaymentAccountTransactionListRequest {
    after?: string;
    before?: string;
    direction?: Types.PaymentAccountTransactionDirection;
    limit?: string;
    value_date_from: string;
    value_date_to: string;
}
export declare class PaymentAccountTransactionService {
    private api;
    constructor(api: any);
    list(requestParameters: PaymentAccountTransactionListRequest, customHeaders?: Types.JsonMap): Promise<PaymentAccountTransactionListResponse>;
    all(requestParameters: PaymentAccountTransactionListRequest, customHeaders?: Types.JsonMap): AsyncGenerator<Types.PaymentAccountTransaction, void, unknown>;
}
export {};
//# sourceMappingURL=paymentAccountTransactionService.d.ts.map