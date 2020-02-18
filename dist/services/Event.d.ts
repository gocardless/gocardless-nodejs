interface Event {
}
interface EventResponse {
    event: Event;
    request: object;
    response: object;
}
interface EventListResponse {
    event: Event[];
    request: object;
    response: object;
}
declare function Events(api: any): void;
