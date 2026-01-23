import * as Types from '../types/Types.js';
interface FundsAvailabilityResponse extends Types.FundsAvailability, Types.APIResponse {
}
interface FundsAvailabilityCheckRequest {
    amount?: string;
}
export declare class FundsAvailabilityService {
    private api;
    constructor(api: any);
    check(identity: string, requestParameters: FundsAvailabilityCheckRequest, customHeaders?: Types.JsonMap): Promise<FundsAvailabilityResponse>;
}
export {};
//# sourceMappingURL=fundsAvailabilityService.d.ts.map