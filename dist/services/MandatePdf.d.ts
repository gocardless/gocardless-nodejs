interface MandatePdf {
}
interface MandatePdfResponse {
    mandatepdf: MandatePdf;
    request: object;
    response: object;
}
interface MandatePdfListResponse {
    mandatepdf: MandatePdf[];
    request: object;
    response: object;
}
declare function MandatePdfs(api: any): void;
