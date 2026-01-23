import * as Types from '../types/Types.js';
interface LogoResponse extends Types.Logo, Types.APIResponse {
}
interface LogoCreateForCreditorRequest {
    image: string;
    links?: Types.LogoCreateForCreditorRequestLinks;
}
export declare class LogoService {
    private api;
    constructor(api: any);
    createForCreditor(requestParameters: LogoCreateForCreditorRequest, idempotencyKey?: string, customHeaders?: Types.JsonMap): Promise<LogoResponse>;
}
export {};
//# sourceMappingURL=logoService.d.ts.map