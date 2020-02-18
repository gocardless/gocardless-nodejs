interface RedirectFlow {
}
interface RedirectFlowResponse {
    redirectflow: RedirectFlow;
    request: object;
    response: object;
}
interface RedirectFlowListResponse {
    redirectflow: RedirectFlow[];
    request: object;
    response: object;
}
declare function RedirectFlows(api: any): void;
