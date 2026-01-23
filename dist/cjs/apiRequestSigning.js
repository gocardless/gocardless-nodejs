"use strict";
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
exports.ApiRequestSignatureHelper = void 0;
const crypto = __importStar(require("node:crypto"));
const uuid_1 = require("uuid");
class ApiRequestSignatureHelper {
    constructor(params) {
        const { httpMethod, host, requestPath, contentDigest, contentLength, contentType } = params;
        const nonce = params.nonce || (0, uuid_1.v4)().toString();
        // Notice we expect seconds since epoch (not milliseconds/nanoseconds) to UTC now.
        const created = params.created || Math.floor(Date.now() / 1000).toString();
        const { privateKeyPem, publicKeyId, publicKeyPem, testMode } = params.apiRequestSigningOptions;
        const authority = new URL(host).host;
        const sigBase = this.getSignatureBase(httpMethod, authority, requestPath, publicKeyId, created, nonce, contentDigest, contentType, contentLength);
        const sig = testMode ? 'SIG' : this.getSignature(privateKeyPem, sigBase, publicKeyPem);
        this._gcSignature = this.getSignatureHeader(sig);
        this._gcSignatureInput = this.getSignatureInputHeader(publicKeyId, created, nonce, contentDigest != null);
    }
    getGcSignature() {
        return this._gcSignature;
    }
    getGcSignatureInput() {
        return this._gcSignatureInput;
    }
    static getSha256DigestHeader(digest) {
        return `sha256=:${digest}:`;
    }
    static getSha256Digest(content) {
        if (typeof content !== 'string') {
            throw new TypeError('Input content must be a string.');
        }
        const hash = crypto.createHash('sha256');
        hash.update(content, 'utf8');
        return hash.digest('base64');
    }
    getSignatureBase(httpMethod, host, requestPath, keyId, created, nonce, contentDigest, contentType, contentLength) {
        return (`\"@method\": ${httpMethod}\n` +
            `\"@authority\": ${host}\n` +
            `\"@request-target\": ${requestPath}\n` +
            (!contentDigest
                ? ''
                : `\"content-digest\": sha256=:${contentDigest}:\n` +
                    `\"content-type\": ${contentType}\n` +
                    `\"content-length\": ${contentLength}\n`) +
            `\"@signature-params\": ${this.getSignatureParams(keyId, created, nonce, contentDigest != null)}`).trim();
    }
    // ### Sign and return base64 encoded signature for `Gc-Signature` header ###
    getSignatureHeader(signature) {
        return `sig-1=:${signature}:`;
    }
    // ### Return value for `Gc-Signature-Input` header ###
    getSignatureInputHeader(keyId, created, nonce, includeContentParams) {
        return `sig-1=${this.getSignatureParams(keyId, created, nonce, includeContentParams)}`;
    }
    getSignatureParams(keyId, created, nonce, includeContentParams) {
        return (`("@method" "@authority" "@request-target"` +
            (includeContentParams ? ` "content-digest" "content-type" "content-length"` : '') +
            `);keyid="${keyId}";created=${created};nonce="${nonce}"`);
    }
    getSignature(privateKeyPem, message, publicKeyPem) {
        const sig = this.signStringSecp521r1(privateKeyPem, message);
        if (publicKeyPem) {
            const isValid = this.verifySignatureSecp521r1(publicKeyPem, message, sig);
            if (!isValid) {
                throw new Error('Signature verification failed');
            }
        }
        return sig;
    }
    signStringSecp521r1(privateKeyPem, dataToSign) {
        // Create a private key object. Node.js infers the curve from the PEM key, but we assume it's secp521r1
        const privateKey = crypto.createPrivateKey({ key: privateKeyPem, format: 'pem' });
        // Format the data for signing
        const dataBuffer = Buffer.from(dataToSign, 'utf8');
        // Create a sign object. SHA-512 is appropriate for secp521r1, and what is expected by our API.
        const sign = crypto.createSign('SHA512');
        sign.update(dataBuffer);
        sign.end();
        // Generate the (DER) signature and base64 encode it.
        return sign.sign(privateKey, 'base64');
    }
    verifySignatureSecp521r1(publicKeyPem, expectedMessage, signatureToVerify) {
        const publicKey = crypto.createPublicKey({ key: publicKeyPem, format: 'pem' });
        const dataBuffer = Buffer.from(expectedMessage, 'utf8');
        const verify = crypto.createVerify('SHA512'); // Must match the signing algorithm
        verify.update(dataBuffer);
        verify.end();
        const isValid = verify.verify(publicKey, signatureToVerify, 'base64');
        return isValid;
    }
}
exports.ApiRequestSignatureHelper = ApiRequestSignatureHelper;
//# sourceMappingURL=apiRequestSigning.js.map