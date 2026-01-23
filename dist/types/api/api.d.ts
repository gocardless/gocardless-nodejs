import { Agents } from 'got';
import { Environments } from '../constants.js';
import { ApiRequestSigningOptions } from '../apiRequestSigning.js';
export interface APIOptions {
    proxy?: Agents;
    raiseOnIdempotencyConflict?: boolean;
    apiRequestSigningOptions?: ApiRequestSigningOptions;
}
interface UrlParameter {
    key?: string;
    value?: string;
}
interface APIRequestParameters {
    path: string;
    method: string;
    urlParameters?: UrlParameter[];
    requestParameters?: object;
    payloadKey?: string | null;
    idempotencyKey?: string;
    fetch?: (identity: string) => Promise<any> | null;
    customHeaders?: object;
}
export declare class Api {
    private _token;
    private _environment;
    private _baseUrl;
    private _agent;
    private raiseOnIdempotencyConflict;
    private apiRequestSigningOptions;
    private processVersion;
    private osRelease;
    private osPlatform;
    constructor(token: string, environment: Environments, options: APIOptions);
    request({ path, method, urlParameters, requestParameters, payloadKey, idempotencyKey, customHeaders, fetch, }: APIRequestParameters): Promise<any>;
    private signApiRequest;
    private getHeaders;
    private createRequestOptions;
    private getRequestBody;
    private generateIdempotencyKey;
    private formatQueryParameters;
}
export {};
//# sourceMappingURL=api.d.ts.map