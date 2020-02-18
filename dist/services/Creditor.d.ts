interface Creditor {
}
interface CreditorResponse {
    creditor: Creditor;
    request: object;
    response: object;
}
interface CreditorListResponse {
    creditor: Creditor[];
    request: object;
    response: object;
}
declare function Creditors(api: any): void;
