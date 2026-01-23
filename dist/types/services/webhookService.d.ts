import * as Types from '../types/Types.js';
interface WebhookResponse extends Types.Webhook, Types.APIResponse {
}
interface WebhookListResponse extends Types.APIResponse {
    webhooks: Array<Types.Webhook>;
    meta: Types.ListMeta;
}
interface WebhookListRequest {
    after?: string;
    before?: string;
    created_at?: Types.CreatedAtFilter;
    is_test?: boolean;
    limit?: string;
    successful?: boolean;
}
export declare class WebhookService {
    private api;
    constructor(api: any);
    list(requestParameters: WebhookListRequest, customHeaders?: Types.JsonMap): Promise<WebhookListResponse>;
    all(requestParameters: WebhookListRequest, customHeaders?: Types.JsonMap): AsyncGenerator<Types.Webhook, void, unknown>;
    find(identity: string, customHeaders?: Types.JsonMap): Promise<WebhookResponse>;
    retry(identity: string, customHeaders?: Types.JsonMap): Promise<WebhookResponse>;
}
export {};
//# sourceMappingURL=webhookService.d.ts.map