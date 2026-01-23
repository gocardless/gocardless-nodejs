import * as Types from '../types/Types.js';
interface BankAccountDetailResponse extends Types.BankAccountDetail, Types.APIResponse {
}
export declare class BankAccountDetailService {
    private api;
    constructor(api: any);
    find(identity: string, customHeaders?: Types.JsonMap): Promise<BankAccountDetailResponse>;
}
export {};
//# sourceMappingURL=bankAccountDetailService.d.ts.map