import { Subscription, ResponseMetadata, JsonMap, SubscriptionIntervalUnit, SubscriptionCreateRequestLinks, SubscriptionMonth, CreatedAtFilter, SubscriptionStatus } from '../types/Types';
interface SubscriptionResponse extends Subscription {
    __metadata__: ResponseMetadata;
}
interface SubscriptionListResponse extends Array<Subscription> {
    __metadata__: ResponseMetadata;
}
interface SubscriptionCreateRequest {
    amount: string;
    app_fee?: string;
    count?: string;
    currency: string;
    day_of_month?: string;
    end_date?: string;
    interval?: string;
    interval_unit: SubscriptionIntervalUnit;
    links: SubscriptionCreateRequestLinks;
    metadata?: JsonMap;
    month?: SubscriptionMonth;
    name?: string;
    payment_reference?: string;
    retry_if_possible?: boolean;
    start_date?: string;
}
interface SubscriptionListRequest {
    after?: string;
    before?: string;
    created_at?: CreatedAtFilter;
    customer?: string;
    limit?: string;
    mandate?: string;
    status?: SubscriptionStatus[];
}
interface SubscriptionUpdateRequest {
    amount?: string;
    app_fee?: string;
    metadata?: JsonMap;
    name?: string;
    payment_reference?: string;
}
interface SubscriptionCancelRequest {
    metadata?: JsonMap;
}
export declare class SubscriptionService {
    private api;
    constructor(api: any);
    create(requestParameters: SubscriptionCreateRequest, headers?: object): Promise<SubscriptionResponse>;
    list(requestParameters: SubscriptionListRequest, headers?: object): Promise<SubscriptionListResponse>;
    find(identity: string, headers?: object): Promise<SubscriptionResponse>;
    update(identity: string, requestParameters: SubscriptionUpdateRequest, headers?: object): Promise<SubscriptionResponse>;
    cancel(identity: string, requestParameters: SubscriptionCancelRequest, headers?: object): Promise<SubscriptionResponse>;
}
export {};
