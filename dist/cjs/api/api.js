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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
const os = __importStar(require("os"));
const process = __importStar(require("process"));
const uuid_1 = require("uuid");
const url = __importStar(require("url"));
const got_1 = __importDefault(require("got"));
const qs = __importStar(require("qs"));
const constants_js_1 = require("../constants.js");
const GoCardlessErrors = __importStar(require("../errors.js"));
const apiRequestSigning_js_1 = require("../apiRequestSigning.js");
class Api {
    constructor(token, environment = constants_js_1.Environments.Live, options) {
        this.apiRequestSigningOptions = null;
        this._token = token;
        this._environment = environment;
        this._baseUrl = 'https://api.gocardless.com';
        if (this._environment === constants_js_1.Environments.Sandbox) {
            this._baseUrl = 'https://api-sandbox.gocardless.com';
        }
        this._agent = undefined;
        if (options.proxy) {
            this._agent = options.proxy;
        }
        this.raiseOnIdempotencyConflict = options.raiseOnIdempotencyConflict || false;
        this.apiRequestSigningOptions = options.apiRequestSigningOptions;
        this.processVersion = process.version;
        this.osPlatform = os.platform();
        this.osRelease = os.release();
    }
    async request({ path, method, urlParameters = [], requestParameters = {}, payloadKey = '', idempotencyKey = '', customHeaders = {}, fetch, }) {
        urlParameters.forEach((urlParameter) => {
            path = path.replace(`:${urlParameter.key}`, urlParameter.value);
        });
        // `got` adds a slash to the end of `prefix_url` so we don't want one at the
        // start of the path
        if (path[0] === '/') {
            path = path.slice(1);
        }
        let requestOptions = this.createRequestOptions(method, requestParameters, payloadKey, idempotencyKey, customHeaders);
        if (this.apiRequestSigningOptions) {
            requestOptions = this.signApiRequest(`/${path}`, requestOptions);
        }
        try {
            const response = await (0, got_1.default)(path, requestOptions);
            return {
                body: response.body,
                __response__: {
                    headers: response.headers,
                    statusCode: response.statusCode,
                    statusMessage: response.statusMessage,
                    url: response.url,
                },
            };
        }
        catch (e) {
            if (e instanceof got_1.default.ParseError) {
                throw new GoCardlessErrors.MalformedResponseError('Malformed JSON received from GoCardless API', e.response);
            }
            if (e instanceof got_1.default.HTTPError) {
                const err = GoCardlessErrors.ApiError.buildFromResponse(e.response);
                if (err instanceof GoCardlessErrors.IdempotentCreationConflictError && !this.raiseOnIdempotencyConflict) {
                    return fetch(err.conflictingResourceId);
                }
                throw err;
            }
            throw e;
        }
    }
    signApiRequest(path, requestOptions) {
        const body = requestOptions.json !== null && requestOptions.json !== undefined
            ? JSON.stringify(requestOptions.json)
            : undefined;
        const contentDigest = body !== undefined ? apiRequestSigning_js_1.ApiRequestSignatureHelper.getSha256Digest(body) : undefined;
        const contentLength = body !== undefined ? Buffer.byteLength(body, 'utf8') : undefined;
        const signer = new apiRequestSigning_js_1.ApiRequestSignatureHelper({
            apiRequestSigningOptions: this.apiRequestSigningOptions,
            requestPath: path,
            contentType: 'application/json',
            host: this._baseUrl,
            httpMethod: requestOptions.method.toUpperCase(),
            contentDigest,
            contentLength,
            created: this.apiRequestSigningOptions.testMode ? 'created' : undefined,
            nonce: this.apiRequestSigningOptions.testMode ? 'nonce' : undefined,
        });
        return {
            ...requestOptions,
            headers: {
                ...requestOptions.headers,
                'Gc-Signature': signer.getGcSignature(),
                'Gc-Signature-Input': signer.getGcSignatureInput(),
                'Content-Digest': contentDigest ? apiRequestSigning_js_1.ApiRequestSignatureHelper.getSha256DigestHeader(contentDigest) : undefined,
            },
        };
    }
    getHeaders(token, customHeaders = {}) {
        const mandatoryHeaders = {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'GoCardless-Version': `${constants_js_1.API_VERSION}`,
            'GoCardless-Client-Version': `${constants_js_1.CLIENT_VERSION}`,
            'GoCardless-Client-Library': 'gocardless-nodejs',
            'User-Agent': `gocardless-nodejs/${constants_js_1.CLIENT_VERSION} node/${this.processVersion} ${this.osPlatform}/${this.osRelease}`,
        };
        return { ...customHeaders, ...mandatoryHeaders };
    }
    createRequestOptions(method = 'get', requestParameters = {}, payloadKey = '', idempotencyKey = '', customHeaders = {}) {
        const headers = this.getHeaders(this._token, customHeaders);
        const searchParams = method === 'get' ? new url.URLSearchParams(this.formatQueryParameters(requestParameters)) : undefined;
        // We want to always send POST requests with an idempotency key. If the user does not
        // specify one, we'll generate one for them.
        if (method.toLowerCase() === 'post') {
            headers['Idempotency-Key'] = idempotencyKey ? idempotencyKey : this.generateIdempotencyKey();
        }
        const json = this.getRequestBody(method, requestParameters, payloadKey);
        return {
            agent: this._agent,
            prefixUrl: this._baseUrl,
            // tslint:disable-next-line:no-any
            method: method,
            responseType: 'json',
            headers,
            searchParams,
            json,
        };
    }
    getRequestBody(method, requestParameters, payloadKey) {
        if ((method === 'post' || method === 'put') && requestParameters) {
            if (payloadKey) {
                return {
                    [payloadKey]: requestParameters,
                };
            }
            else {
                return {
                    data: requestParameters,
                };
            }
        }
        return undefined;
    }
    generateIdempotencyKey() {
        return (0, uuid_1.v4)();
    }
    formatQueryParameters(parameters) {
        return qs.stringify(parameters, {
            encode: false,
            indices: false,
            arrayFormat: 'comma',
        });
    }
}
exports.Api = Api;
//# sourceMappingURL=api.js.map