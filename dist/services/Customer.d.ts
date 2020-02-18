interface Customer {
}
interface CustomerResponse {
    customer: Customer;
    request: object;
    response: object;
}
interface CustomerListResponse {
    customer: Customer[];
    request: object;
    response: object;
}
declare function Customers(api: any): void;
