import { PayoutItem, ResponseMetadata } from '../types/Types';
interface PayoutItemListResponse extends Array<PayoutItem> {
    __metadata__: ResponseMetadata;
}
interface PayoutItemListRequest {
    after?: string;
    before?: string;
    limit?: string;
    payout: string;
}
export declare class PayoutItemService {
    private api;
    constructor(api: any);
    list(requestParameters: PayoutItemListRequest): Promise<PayoutItemListResponse>;
}
export {};
