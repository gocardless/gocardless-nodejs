interface Subscription {
}
interface SubscriptionResponse {
    subscription: Subscription;
    request: object;
    response: object;
}
interface SubscriptionListResponse {
    subscription: Subscription[];
    request: object;
    response: object;
}
declare function Subscriptions(api: any): void;
