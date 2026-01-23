import * as Types from '../types/Types.js';
interface SubscriptionResponse extends Types.Subscription, Types.APIResponse {
}
interface SubscriptionListResponse extends Types.APIResponse {
    subscriptions: Array<Types.Subscription>;
    meta: Types.ListMeta;
}
interface SubscriptionCreateRequest {
    amount: string;
    app_fee?: string;
    count?: string;
    currency: string;
    day_of_month?: string;
    end_date?: string;
    interval?: string;
    interval_unit: Types.SubscriptionIntervalUnit;
    links: Types.SubscriptionCreateRequestLinks;
    metadata?: Types.JsonMap;
    month?: Types.SubscriptionMonth;
    name?: string;
    payment_reference?: string;
    retry_if_possible?: boolean;
    start_date?: string;
}
interface SubscriptionListRequest {
    after?: string;
    before?: string;
    created_at?: Types.CreatedAtFilter;
    customer?: string;
    limit?: string;
    mandate?: string;
    status?: Types.SubscriptionStatus[];
}
interface SubscriptionUpdateRequest {
    amount?: string;
    app_fee?: string;
    metadata?: Types.JsonMap;
    name?: string;
    payment_reference?: string;
    retry_if_possible?: boolean;
}
interface SubscriptionPauseRequest {
    metadata?: Types.JsonMap;
    pause_cycles?: number;
}
interface SubscriptionResumeRequest {
    metadata?: Types.JsonMap;
}
interface SubscriptionCancelRequest {
    metadata?: Types.JsonMap;
}
export declare class SubscriptionService {
    private api;
    constructor(api: any);
    create(requestParameters: SubscriptionCreateRequest, idempotencyKey?: string, customHeaders?: Types.JsonMap): Promise<SubscriptionResponse>;
    list(requestParameters: SubscriptionListRequest, customHeaders?: Types.JsonMap): Promise<SubscriptionListResponse>;
    all(requestParameters: SubscriptionListRequest, customHeaders?: Types.JsonMap): AsyncGenerator<Types.Subscription, void, unknown>;
    find(identity: string, customHeaders?: Types.JsonMap): Promise<SubscriptionResponse>;
    update(identity: string, requestParameters: SubscriptionUpdateRequest, customHeaders?: Types.JsonMap): Promise<SubscriptionResponse>;
    pause(identity: string, requestParameters: SubscriptionPauseRequest, customHeaders?: Types.JsonMap): Promise<SubscriptionResponse>;
    resume(identity: string, requestParameters: SubscriptionResumeRequest, customHeaders?: Types.JsonMap): Promise<SubscriptionResponse>;
    cancel(identity: string, requestParameters: SubscriptionCancelRequest, customHeaders?: Types.JsonMap): Promise<SubscriptionResponse>;
}
export {};
//# sourceMappingURL=subscriptionService.d.ts.map