interface Payment {
}
interface PaymentResponse {
    payment: Payment;
    request: object;
    response: object;
}
interface PaymentListResponse {
    payment: Payment[];
    request: object;
    response: object;
}
declare function Payments(api: any): void;
