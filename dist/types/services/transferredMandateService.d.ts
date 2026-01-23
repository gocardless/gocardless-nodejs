import * as Types from '../types/Types.js';
interface TransferredMandateResponse extends Types.TransferredMandate, Types.APIResponse {
}
export declare class TransferredMandateService {
    private api;
    constructor(api: any);
    transferredMandates(identity: string, customHeaders?: Types.JsonMap): Promise<TransferredMandateResponse>;
}
export {};
//# sourceMappingURL=transferredMandateService.d.ts.map