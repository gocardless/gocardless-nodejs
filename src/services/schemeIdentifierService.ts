import { Api } from '../api/api.js';
import * as Types from '../types/Types.js';

interface SchemeIdentifierResponse extends Types.SchemeIdentifier, Types.APIResponse {}

interface SchemeIdentifierListResponse extends Types.APIResponse {
  scheme_identifiers: Array<Types.SchemeIdentifier>;
  meta: Types.ListMeta;
}

interface SchemeIdentifierCreateRequest {
  // Resources linked to this SchemeIdentifier.
  links?: Types.SchemeIdentifierCreateRequestLinks;

  //  The name which appears on customers' bank statements. This should usually be
  //  the merchant's trading name.

  name: string;

  //  The scheme which this scheme identifier applies to.

  scheme: Types.SchemeIdentifierScheme;
}

interface SchemeIdentifierListRequest {
  //  Cursor pointing to the start of the desired set.

  after?: string;

  //  Cursor pointing to the end of the desired set.

  before?: string;

  //  Unique identifier, beginning with "CR".

  creditor?: string;

  //  Number of records to return.

  limit?: string;
}

export class SchemeIdentifierService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  public async create(
    requestParameters: SchemeIdentifierCreateRequest,
    idempotencyKey = '',
    customHeaders: Types.JsonMap = {},
  ): Promise<SchemeIdentifierResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/scheme_identifiers',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: 'scheme_identifiers',
      idempotencyKey,
      customHeaders,
      fetch: async (identity) => await this.find(identity),
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: SchemeIdentifierResponse = {
      ...(response.body?.['scheme_identifiers'] ?? response),
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async list(
    requestParameters: SchemeIdentifierListRequest,
    customHeaders: Types.JsonMap = {},
  ): Promise<SchemeIdentifierListResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/scheme_identifiers',
      method: 'get',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: SchemeIdentifierListResponse = {
      ...response.body,
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async *all(
    requestParameters: SchemeIdentifierListRequest,
    customHeaders: Types.JsonMap = {},
  ): AsyncGenerator<Types.SchemeIdentifier, void, unknown> {
    let cursor = undefined;
    do {
      const list = await this.list({ ...requestParameters, after: cursor }, customHeaders);

      for (const schemeidentifier of list.scheme_identifiers) {
        yield schemeidentifier;
      }

      cursor = list.meta.cursors.after;
    } while (cursor);
  }

  public async find(identity: string, customHeaders: Types.JsonMap = {}): Promise<SchemeIdentifierResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/scheme_identifiers/:identity',
      method: 'get',
      urlParameters,

      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: SchemeIdentifierResponse = {
      ...response.body['scheme_identifiers'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }
}
