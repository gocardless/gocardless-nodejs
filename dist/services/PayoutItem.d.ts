interface PayoutItem {
}
interface PayoutItemResponse {
    payoutitem: PayoutItem;
    request: object;
    response: object;
}
interface PayoutItemListResponse {
    payoutitem: PayoutItem[];
    request: object;
    response: object;
}
declare function PayoutItems(api: any): void;
