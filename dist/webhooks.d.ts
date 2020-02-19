/**
 * Validates that a webhook was genuinely sent by GoCardless, then parses each `event`
 * object into an array of `GoCardless.Event` classes.
 *
 * @body [JSON object]: The raw webhook body.
 * @webhook_secret [string]: The webhook endpoint secret for your webhook endpoint, as
 *   configured in your GoCardless Dashboard.
 * @signature_header [string]: The signature included in the webhook request, as specified
 *   by the `Webhook-Signature` header.
 */
export function parse(body: any, webhook_secret: any, signature_header: any): any;
export function InvalidSignatureError(): void;
export class InvalidSignatureError {
    message: string;
    name: string;
}
