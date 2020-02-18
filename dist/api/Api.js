'use strict';
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
const process = require("process");
const _ = require("lodash");
const uuidv4 = require("uuid/v4");
const url = __importStar(require("url"));
const got_1 = __importDefault(require("got"));
const Constants = require("../Constants");
const GoCardlessException = require("../GoCardlessException");
var Environment;
(function (Environment) {
    Environment["Live"] = "LIVE";
})(Environment || (Environment = {}));
var HTTPMethod;
(function (HTTPMethod) {
    HTTPMethod["Post"] = "POST";
    HTTPMethod["Get"] = "GET";
    HTTPMethod["Put"] = "PUT";
})(HTTPMethod || (HTTPMethod = {}));
class Api {
    constructor(token, environment = Environment.Live, options) {
        this._token = token;
        this._environment = environment;
        this._baseUrl = 'https://api.gocardless.com';
        if (this._environment === Constants.Environments.SANDBOX) {
            this._baseUrl = 'https://api-sandbox.gocardless.com';
        }
        this._agent = undefined;
        if (options.proxy) {
            this._agent = options.proxy;
        }
        this.raise_on_idempotency_conflict = options.raise_on_idempotency_conflict || false;
        this.processVersion = process.version;
        this.osPlatform = os.platform();
        this.osRelease = os.release();
    }
    createRequestOptions(method = HTTPMethod.Get, requestParameters = {}, payloadKey = '', headers = {}) {
        headers = this.getHeaders(headers, this._token);
        const searchParams = method === HTTPMethod.Get ? new url.URLSearchParams(this.mapQueryParameters(requestParameters)) : undefined;
        if (method === 'POST' && !headers['Idempotency-Key']) {
            headers['Idempotency-Key'] = uuidv4();
        }
        const json = this.getRequestBody(method, requestParameters, payloadKey);
        return {
            agent: this._agent,
            prefixUrl: this._baseUrl,
            method,
            responseType: 'json',
            headers,
            searchParams,
            json,
        };
    }
    async request(path, method = HTTPMethod.Get, urlParameters = [], requestParameters = {}, payloadKey = '', headers = {}, fetch) {
        urlParameters.forEach(urlParameter => {
            path = path.replace(`:${urlParameter.key}`, urlParameter.value);
        });
        const requestOptions = this.createRequestOptions(method, requestParameters, payloadKey, headers);
        const request = got_1.default(path, requestOptions);
        try {
            const response = await request;
            return {
                ...response.body,
                request: requestOptions,
                response: {
                    headers: response.headers,
                    statusCode: response.statusCode,
                    statusMessage: response.statusMessage,
                    url: response.url
                }
            };
        }
        catch (error) {
            const { response } = error;
            if (this.isIdempotencyConflict(response) && !this.raise_on_idempotency_conflict) {
                const resourceId = response.body.error.errors[0].links.conflicting_resource_id;
                return await fetch(resourceId, headers);
            }
            if (response) {
                throw new GoCardlessException(response);
            }
            throw error;
        }
    }
    getHeaders(headers, token) {
        return {
            ...headers,
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
            'GoCardless-Version': '2015-07-06',
            'GoCardless-Client-Version': '0.1.0',
            'GoCardless-Client-Library': 'gocardless-nodejs',
            'User-Agent': `gocardless-nodejs/0.1.0 node/${this.processVersion} ${this.osPlatform}/${this.osRelease}`,
        };
    }
    getRequestBody(method, requestParameters, payloadKey) {
        if ((method === HTTPMethod.Post || method === HTTPMethod.Put) && requestParameters) {
            if (payloadKey) {
                return {
                    [payloadKey]: requestParameters,
                };
            }
            else {
                return requestParameters;
            }
        }
        return undefined;
    }
    mapQueryParameters(obj) {
        return _.keys(obj)
            .map(k => [k, obj[k]]);
    }
    isIdempotencyConflict(response) {
        return response.statusCode === 409 &&
            response.body &&
            response.body.error &&
            response.body.error.errors &&
            response.body.error.errors[0] &&
            response.body.error.errors[0].reason === 'idempotent_creation_conflict';
    }
}
//# sourceMappingURL=Api.js.map