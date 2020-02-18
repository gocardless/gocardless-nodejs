interface Refund {
}
interface RefundResponse {
    refund: Refund;
    request: object;
    response: object;
}
interface RefundListResponse {
    refund: Refund[];
    request: object;
    response: object;
}
declare function Refunds(api: any): void;
