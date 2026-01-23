import * as Types from '../types/Types.js';
interface RedirectFlowResponse extends Types.RedirectFlow, Types.APIResponse {
}
interface RedirectFlowCreateRequest {
    description?: string;
    links?: Types.RedirectFlowCreateRequestLinks;
    metadata?: Types.JsonMap;
    prefilled_bank_account?: Types.RedirectFlowPrefilledBankAccount;
    prefilled_customer?: Types.RedirectFlowPrefilledCustomer;
    scheme?: Types.RedirectFlowScheme;
    session_token: string;
    success_redirect_url: string;
}
interface RedirectFlowCompleteRequest {
    session_token: string;
}
export declare class RedirectFlowService {
    private api;
    constructor(api: any);
    create(requestParameters: RedirectFlowCreateRequest, idempotencyKey?: string, customHeaders?: Types.JsonMap): Promise<RedirectFlowResponse>;
    find(identity: string, customHeaders?: Types.JsonMap): Promise<RedirectFlowResponse>;
    complete(identity: string, requestParameters: RedirectFlowCompleteRequest, customHeaders?: Types.JsonMap): Promise<RedirectFlowResponse>;
}
export {};
//# sourceMappingURL=redirectFlowService.d.ts.map