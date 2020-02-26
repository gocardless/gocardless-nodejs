import { Event, ResponseMetadata, CreatedAtFilter, EventInclude, EventResourceType } from '../types/Types';
interface EventResponse extends Event {
    __metadata__: ResponseMetadata;
}
interface EventListResponse extends Array<Event> {
    __metadata__: ResponseMetadata;
}
interface EventListRequest {
    action?: string;
    after?: string;
    before?: string;
    created_at?: CreatedAtFilter;
    include?: EventInclude;
    limit?: string;
    mandate?: string;
    parent_event?: string;
    payment?: string;
    payout?: string;
    refund?: string;
    resource_type?: EventResourceType;
    subscription?: string;
}
export declare class EventService {
    private api;
    constructor(api: any);
    list(requestParameters: EventListRequest, headers?: object): Promise<EventListResponse>;
    find(identity: string, headers?: object): Promise<EventResponse>;
}
export {};
