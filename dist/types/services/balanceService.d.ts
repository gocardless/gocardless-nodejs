import * as Types from '../types/Types.js';
interface BalanceListResponse extends Types.APIResponse {
    balances: Array<Types.Balance>;
    meta: Types.ListMeta;
}
interface BalanceListRequest {
    after?: string;
    before?: string;
    creditor: string;
    limit?: string;
}
export declare class BalanceService {
    private api;
    constructor(api: any);
    list(requestParameters: BalanceListRequest, customHeaders?: Types.JsonMap): Promise<BalanceListResponse>;
    all(requestParameters: BalanceListRequest, customHeaders?: Types.JsonMap): AsyncGenerator<Types.Balance, void, unknown>;
}
export {};
//# sourceMappingURL=balanceService.d.ts.map