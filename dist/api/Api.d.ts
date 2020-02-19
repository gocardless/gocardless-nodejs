/// <reference types="node" />
import * as url from 'url';
declare enum Environment {
    Live = "LIVE"
}
interface APIOptions {
    proxy?: object;
    raiseOnIdempotencyConflict: boolean;
}
interface APIRequestParameters {
    path: string;
    method: string;
    urlParameters?: any;
    requestParameters?: object;
    payloadKey?: string;
    headers?: object;
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
    constructor(token: string, environment: Environment, options: APIOptions);
    createRequestOptions(method?: string, requestParameters?: {}, payloadKey?: string, headers?: {}): {
        agent: object;
        prefixUrl: string;
        method: any;
        responseType: "json";
        headers: {};
        searchParams: url.URLSearchParams;
        json: any;
    };
    request({ path, method, urlParameters, requestParameters, payloadKey, headers, fetch, }: APIRequestParameters): Promise<any>;
    private getHeaders;
    private getRequestBody;
    private mapQueryParameters;
    private isIdempotencyConflict;
}
export {};
