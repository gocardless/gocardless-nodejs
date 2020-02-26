import { Environments } from '../Constants';
interface APIOptions {
    proxy?: object;
    raiseOnIdempotencyConflict?: boolean;
}
interface APIRequestParameters {
    path: string;
    method: string;
    urlParameters?: any;
    requestParameters?: object;
    payloadKey?: string;
    idempotencyKey?: string;
    fetch: any;
}
export declare class Api {
    private _token;
    private _environment;
    private _baseUrl;
    private _agent;
    private raiseOnIdempotencyConflict;
    private processVersion;
    private osPlatform;
    private osRelease;
    constructor(token: string, environment: Environments, options: APIOptions);
    request({ path, method, urlParameters, requestParameters, payloadKey, idempotencyKey, fetch, }: APIRequestParameters): Promise<any>;
    private getHeaders;
    private createRequestOptions;
    private getRequestBody;
    private mapQueryParameters;
    private isIdempotencyConflict;
}
export {};
