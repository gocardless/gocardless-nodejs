import * as crypto from 'node:crypto';
import { GoCardlessClient } from './client';
import { v4 as uuid } from 'uuid';

export interface ApiRequestSigningOptions {
  privateKeyPem: string;
  publicKeyId: string;
}

export type ApiRequestSigningOptionsInternal = ApiRequestSigningOptions & {
  testMode?: boolean; // For testing purposes, will put dummy values for "created" and "nonce". Won't work in production.
  publicKeyPem?: string; // Optional public key PEM to test signature verification.
};

export class ApiRequestSignatureHelper {
  public constructor(params: {
    apiRequestSigningOptions: ApiRequestSigningOptionsInternal;
    httpMethod: 'GET' | 'PUT' | 'POST' | 'PATCH' | 'DELETE' | string;
    host: string;
    requestPath: string;
    contentDigest?: string;
    contentLength?: number;
    created?: string;
    nonce?: string;
    contentType: string;
  }) {
    const { httpMethod, host, requestPath, contentDigest, contentLength, contentType } = params;
    const nonce = params.nonce || uuid().toString();
    // Notice we expect seconds since epoch (not milliseconds/nanoseconds) to UTC now.
    const created = params.created || Math.floor(Date.now() / 1000).toString();
    const { privateKeyPem, publicKeyId, publicKeyPem, testMode } = params.apiRequestSigningOptions;
    const authority = new URL(host).host;
    const sigBase = this.getSignatureBase(
      httpMethod,
      authority,
      requestPath,
      publicKeyId,
      created,
      nonce,
      contentDigest,
      contentType,
      contentLength,
    );
    const sig = testMode ? 'SIG' : this.getSignature(privateKeyPem, sigBase, publicKeyPem);
    this._gcSignature = this.getSignatureHeader(sig);
    this._gcSignatureInput = this.getSignatureInputHeader(publicKeyId, created, nonce, contentDigest != null);
  }

  private _gcSignature: string;
  private _gcSignatureInput: string;

  public getGcSignature(): string {
    return this._gcSignature;
  }
  public getGcSignatureInput(): string {
    return this._gcSignatureInput;
  }

  public static getSha256DigestHeader(digest: string): string {
    return `sha256=:${digest}:`;
  }

  public static getSha256Digest(content: string): string {
    if (typeof content !== 'string') {
      throw new TypeError('Input content must be a string.');
    }

    const hash = crypto.createHash('sha256');
    hash.update(content, 'utf8');

    return hash.digest('base64');
  }

  private getSignatureBase(
    httpMethod: string,
    host: string,
    requestPath: string,
    keyId: string,
    created: string,
    nonce: string,
    contentDigest?: string,
    contentType?: string,
    contentLength?: number,
  ): string {
    return (
      `\"@method\": ${httpMethod}\n` +
      `\"@authority\": ${host}\n` +
      `\"@request-target\": ${requestPath}\n` +
      (!contentDigest
        ? ''
        : `\"content-digest\": sha256=:${contentDigest}:\n` +
          `\"content-type\": ${contentType}\n` +
          `\"content-length\": ${contentLength}\n`) +
      `\"@signature-params\": ${this.getSignatureParams(keyId, created, nonce, contentDigest != null)}`
    ).trim();
  }

  // ### Sign and return base64 encoded signature for `Gc-Signature` header ###
  private getSignatureHeader(signature: string): string {
    return `sig-1=:${signature}:`;
  }

  // ### Return value for `Gc-Signature-Input` header ###
  private getSignatureInputHeader(
    keyId: string,
    created: string,
    nonce: string,
    includeContentParams: boolean,
  ): string {
    return `sig-1=${this.getSignatureParams(keyId, created, nonce, includeContentParams)}`;
  }

  private getSignatureParams(keyId: string, created: string, nonce: string, includeContentParams: boolean): string {
    return (
      `("@method" "@authority" "@request-target"` +
      (includeContentParams ? ` "content-digest" "content-type" "content-length"` : '') +
      `);keyid="${keyId}";created=${created};nonce="${nonce}"`
    );
  }

  private getSignature(privateKeyPem: string, message: string, publicKeyPem?: string): string {
    const sig = this.signStringSecp521r1(privateKeyPem, message);
    if (publicKeyPem) {
      const isValid = this.verifySignatureSecp521r1(publicKeyPem, message, sig);
      if (!isValid) {
        throw new Error('Signature verification failed');
      }
    }
    return sig;
  }

  private signStringSecp521r1(privateKeyPem: string, dataToSign: string): string {
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

  private verifySignatureSecp521r1(publicKeyPem: string, expectedMessage: string, signatureToVerify: string): boolean {
    const publicKey = crypto.createPublicKey({ key: publicKeyPem, format: 'pem' });
    const dataBuffer = Buffer.from(expectedMessage, 'utf8');
    const verify = crypto.createVerify('SHA512'); // Must match the signing algorithm
    verify.update(dataBuffer);
    verify.end();
    const isValid = verify.verify(publicKey, signatureToVerify, 'base64');
    return isValid;
  }
}
