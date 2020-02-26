import { Payout, ResponseMetadata, PayoutCurrency, CreatedAtFilter, PayoutPayoutType, PayoutStatus } from '../types/Types';
interface PayoutResponse extends Payout {
    __metadata__: ResponseMetadata;
}
interface PayoutListResponse extends Array<Payout> {
    __metadata__: ResponseMetadata;
}
interface PayoutListRequest {
    after?: string;
    before?: string;
    created_at?: CreatedAtFilter;
    creditor?: string;
    creditor_bank_account?: string;
    currency?: PayoutCurrency;
    limit?: string;
    payout_type?: PayoutPayoutType;
    reference?: string;
    status?: PayoutStatus;
}
export declare class PayoutService {
    private api;
    constructor(api: any);
    list(requestParameters: PayoutListRequest): Promise<PayoutListResponse>;
    find(identity: string): Promise<PayoutResponse>;
}
export {};
