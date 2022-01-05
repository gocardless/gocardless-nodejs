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

const cryptoJS = require('crypto-js');
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
 * @body [string]: The raw webhook body.
 * @webhookSecret [string]: The webhook endpoint secret for your webhook endpoint, as
 *   configured in your GoCardless Dashboard.
 * @signatureHeader [string]: The signature included in the webhook request, as specified
 *   by the `Webhook-Signature` header.
 */
function parse(body, webhookSecret, signatureHeader) {
  verifySignature(body, webhookSecret, signatureHeader);

  const eventsData = JSON.parse(body)['events'];
  return eventsData.map(eventJson => eventJson);
}

/**
 * Validate the signature header. Note, we're using the `buffer-equal-constant-time`
 * library for the hash comparison, to protect against timing attacks.
 *
 * @body [string]: The raw webhook body.
 * @webhookSecret [string]: The webhook endpoint secret for your webhook endpoint, as
 *   configured in your GoCardless Dashboard.
 * @signatureHeader [string]: The signature included in the webhook request, as specified
 *   by the `Webhook-Signature` header.
 */
function verifySignature(body, webhookSecret, signatureHeader) {
  const rawDigest = cryptoJS.HmacSHA256(body, webhookSecret);

  const bufferDigest = Buffer.from(rawDigest.toString(cryptoJS.enc.Hex));
  const bufferSignatureHeader = Buffer.from(signatureHeader);

  if (!safeCompare(bufferDigest, bufferSignatureHeader)) {
    throw new InvalidSignatureError();
  }
}

export {
  parse,
  InvalidSignatureError,
};
