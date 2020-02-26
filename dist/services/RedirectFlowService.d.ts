import { RedirectFlow, ResponseMetadata, RedirectFlowCreateRequestLinks, RedirectFlowPrefilledCustomer, RedirectFlowScheme } from '../types/Types';
interface RedirectFlowResponse extends RedirectFlow {
    __metadata__: ResponseMetadata;
}
interface RedirectFlowCreateRequest {
    description?: string;
    links: RedirectFlowCreateRequestLinks;
    prefilled_customer?: RedirectFlowPrefilledCustomer;
    scheme?: RedirectFlowScheme;
    session_token: string;
    success_redirect_url: string;
}
interface RedirectFlowCompleteRequest {
    session_token: string;
}
export declare class RedirectFlowService {
    private api;
    constructor(api: any);
    create(requestParameters: RedirectFlowCreateRequest, idempotencyKey?: string): Promise<RedirectFlowResponse>;
    find(identity: string): Promise<RedirectFlowResponse>;
    complete(identity: string, requestParameters: RedirectFlowCompleteRequest): Promise<RedirectFlowResponse>;
}
export {};
