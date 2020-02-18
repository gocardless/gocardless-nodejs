interface Payout {
}
interface PayoutResponse {
    payout: Payout;
    request: object;
    response: object;
}
interface PayoutListResponse {
    payout: Payout[];
    request: object;
    response: object;
}
declare function Payouts(api: any): void;
