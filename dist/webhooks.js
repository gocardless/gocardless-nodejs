/**
 * GoCardless supports webhooks, allowing you to receive real-time notifications
 * when things happen in your account, so you can take automatic actions in
 * response, for example:
 *
 *   When a customer cancels their mandate with the bank, suspend their club membership
 *
 * The `parse` function does two things; firstly, it validates that a webhook you receive
 * is genuinely from GoCardless, and secondly it parses each `event` object in the
 * JSON object into an `GoCardless.Event` class.
 */
const CryptoJS = require('crypto-js');
const safeCompare = require('buffer-equal-constant-time');
function InvalidSignatureError() {
    this.message =
        'The signature header secret does not match your webhook secret!';
    this.name = 'InvalidSignatureError';
}
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
function parse(body, webhook_secret, signature_header) {
    verify_signature(body, webhook_secret, signature_header);
    events_data = JSON.parse(body)['events'];
    return events_data.map(event_json => event_json);
}
/**
 * Validate the signature header. Note, we're using the `buffer-equal-constant-time`
 * library for the hash comparison, to protect against timing attacks.
 *
 * @body [JSON object]: The raw webhook body.
 * @webhook_secret [string]: The webhook endpoint secret for your webhook endpoint, as
 *   configured in your GoCardless Dashboard.
 * @signature_header [string]: The signature included in the webhook request, as specified
 *   by the `Webhook-Signature` header.
 */
function verify_signature(body, webhook_secret, signature_header) {
    const raw_digest = CryptoJS.HmacSHA256(body, webhook_secret);
    const buffer_digest = Buffer.from(raw_digest.toString(CryptoJS.enc.Hex));
    const buffer_signature_header = Buffer.from(signature_header);
    if (!safeCompare(buffer_digest, buffer_signature_header)) {
        throw new InvalidSignatureError();
    }
}
module.exports = {
    parse: parse,
    InvalidSignatureError: InvalidSignatureError,
};
//# sourceMappingURL=webhooks.js.map