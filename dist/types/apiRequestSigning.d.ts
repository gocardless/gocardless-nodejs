export interface ApiRequestSigningOptions {
    privateKeyPem: string;
    publicKeyId: string;
}
export type ApiRequestSigningOptionsInternal = ApiRequestSigningOptions & {
    testMode?: boolean;
    publicKeyPem?: string;
};
export declare class ApiRequestSignatureHelper {
    constructor(params: {
        apiRequestSigningOptions: ApiRequestSigningOptionsInternal;
        httpMethod: 'GET' | 'PUT' | 'POST' | 'PATCH' | 'DELETE' | string;
        host: string;
        requestPath: string;
        contentDigest?: string;
        contentLength?: number;
        created?: string;
        nonce?: string;
        contentType: string;
    });
    private _gcSignature;
    private _gcSignatureInput;
    getGcSignature(): string;
    getGcSignatureInput(): string;
    static getSha256DigestHeader(digest: string): string;
    static getSha256Digest(content: string): string;
    private getSignatureBase;
    private getSignatureHeader;
    private getSignatureInputHeader;
    private getSignatureParams;
    private getSignature;
    private signStringSecp521r1;
    private verifySignatureSecp521r1;
}
//# sourceMappingURL=apiRequestSigning.d.ts.map