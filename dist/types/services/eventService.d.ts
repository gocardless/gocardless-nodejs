import * as Types from '../types/Types.js';
interface EventResponse extends Types.Event, Types.APIResponse {
}
interface EventListResponse extends Types.APIResponse {
    events: Array<Types.Event>;
    meta: Types.ListMeta;
}
interface EventListRequest {
    action?: string;
    after?: string;
    before?: string;
    billing_request?: string;
    created_at?: Types.CreatedAtFilter;
    creditor?: string;
    export?: string;
    include?: Types.EventInclude;
    instalment_schedule?: string;
    limit?: string;
    mandate?: string;
    outbound_payment?: string;
    parent_event?: string;
    payer_authorisation?: string;
    payment?: string;
    payout?: string;
    refund?: string;
    resource_type?: Types.EventResourceType;
    scheme_identifier?: string;
    subscription?: string;
}
export declare class EventService {
    private api;
    constructor(api: any);
    list(requestParameters: EventListRequest, customHeaders?: Types.JsonMap): Promise<EventListResponse>;
    all(requestParameters: EventListRequest, customHeaders?: Types.JsonMap): AsyncGenerator<Types.Event, void, unknown>;
    find(identity: string, customHeaders?: Types.JsonMap): Promise<EventResponse>;
}
export {};
//# sourceMappingURL=eventService.d.ts.map