interface Mandate {
}
interface MandateResponse {
    mandate: Mandate;
    request: object;
    response: object;
}
interface MandateListResponse {
    mandate: Mandate[];
    request: object;
    response: object;
}
declare function Mandates(api: any): void;
