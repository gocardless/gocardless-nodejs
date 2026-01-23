import * as Types from '../types/Types.js';
interface PayerThemeResponse extends Types.PayerTheme, Types.APIResponse {
}
interface PayerThemeCreateForCreditorRequest {
    button_background_colour?: string;
    content_box_border_colour?: string;
    header_background_colour?: string;
    link_text_colour?: string;
    links?: Types.PayerThemeCreateForCreditorRequestLinks;
}
export declare class PayerThemeService {
    private api;
    constructor(api: any);
    createForCreditor(requestParameters: PayerThemeCreateForCreditorRequest, idempotencyKey?: string, customHeaders?: Types.JsonMap): Promise<PayerThemeResponse>;
}
export {};
//# sourceMappingURL=payerThemeService.d.ts.map