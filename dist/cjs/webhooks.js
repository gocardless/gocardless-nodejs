"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidSignatureError = exports.verifySignature = exports.parse = void 0;
const crypto = __importStar(require("crypto"));
function InvalidSignatureError() {
    this.message = 'The signature header secret does not match your webhook secret!';
    this.name = 'InvalidSignatureError';
}
exports.InvalidSignatureError = InvalidSignatureError;
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
function parse(body, webhookSecret, signatureHeader) {
    verifySignature(body, webhookSecret, signatureHeader);
    const bodyString = typeof body === 'string' ? body : body.toString();
    const eventsData = JSON.parse(bodyString);
    return eventsData.events;
}
exports.parse = parse;
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
function verifySignature(body, webhookSecret, signatureHeader) {
    const bufferDigest = crypto.createHmac('sha256', webhookSecret).update(body).digest();
    const bufferSignatureHeader = Buffer.from(signatureHeader, 'hex');
    if (bufferDigest.length !== bufferSignatureHeader.length ||
        !crypto.timingSafeEqual(bufferDigest, bufferSignatureHeader)) {
        throw new InvalidSignatureError();
    }
}
exports.verifySignature = verifySignature;
//# sourceMappingURL=webhooks.js.map