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
/// <reference types="node" />
import * as crypto from 'crypto';
import { Event } from './types/Types';
declare function InvalidSignatureError(): void;
/**
 * Validates that a webhook was genuinely sent by GoCardless, then parses each `event`
 * object into an array of `GoCardless.Event` classes.
 *
 * @body The raw webhook body.
 * @webhookSecret The webhook endpoint secret for your webhook endpoint, as
 *   configured in your GoCardless Dashboard.
 * @signatureHeader The signature included in the webhook request, as specified
 *   by the `Webhook-Signature` header.
 */
declare function parse(body: crypto.BinaryLike, webhookSecret: string, signatureHeader: string): Event[];
/**
 * Validate the signature header. Note, we're using the `crypto.timingSafeEqual`
 * library for the hash comparison, to protect against timing attacks.
 *
 * @body The raw webhook body.
 * @webhookSecret The webhook endpoint secret for your webhook endpoint, as
 *   configured in your GoCardless Dashboard.
 * @signatureHeader The signature included in the webhook request, as specified
 *   by the `Webhook-Signature` header.
 */
declare function verifySignature(body: crypto.BinaryLike, webhookSecret: string, signatureHeader: string): void;
export { parse, verifySignature, InvalidSignatureError };
//# sourceMappingURL=webhooks.d.ts.map