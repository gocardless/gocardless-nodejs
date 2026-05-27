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

import * as crypto from 'crypto';
import { Event } from './types/Types';

function InvalidSignatureError() {
  this.message = 'The signature header secret does not match your webhook secret!';
  this.name = 'InvalidSignatureError';
}

interface WebhookParseResult {
  events: Event[];
  webhookId: string | null;
}

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
function parse(body: crypto.BinaryLike, webhookSecret: string, signatureHeader: string): Event[] {
  verifySignature(body, webhookSecret, signatureHeader);

  const bodyString = typeof body === 'string' ? body : body.toString();
  const eventsData = JSON.parse(bodyString) as { events: Event[] };
  return eventsData.events;
}

/**
 * Validates that a webhook was genuinely sent by GoCardless, then parses it into
 * a result object containing both the events and the webhook ID from the meta field.
 *
 * @body The raw webhook body.
 * @webhookSecret The webhook endpoint secret for your webhook endpoint, as
 *   configured in your GoCardless Dashboard.
 * @signatureHeader The signature included in the webhook request, as specified
 *   by the `Webhook-Signature` header.
 */
function parseWithMeta(body: crypto.BinaryLike, webhookSecret: string, signatureHeader: string): WebhookParseResult {
  verifySignature(body, webhookSecret, signatureHeader);

  const bodyString = typeof body === 'string' ? body : body.toString();
  const parsed = JSON.parse(bodyString) as { events: Event[]; meta?: { webhook_id?: string } };
  return {
    events: parsed.events,
    webhookId: parsed.meta?.webhook_id ?? null,
  };
}

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
function verifySignature(body: crypto.BinaryLike, webhookSecret: string, signatureHeader: string) {
  const bufferDigest = crypto.createHmac('sha256', webhookSecret).update(body).digest();
  const bufferSignatureHeader = Buffer.from(signatureHeader, 'hex');

  if (
    bufferDigest.length !== bufferSignatureHeader.length ||
    !crypto.timingSafeEqual(bufferDigest, bufferSignatureHeader)
  ) {
    throw new InvalidSignatureError();
  }
}

export { parse, parseWithMeta, verifySignature, InvalidSignatureError, WebhookParseResult };
