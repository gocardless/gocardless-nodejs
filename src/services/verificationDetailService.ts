import { Api } from '../api/api.js';
import * as Types from '../types/Types.js';

interface VerificationDetailResponse extends Types.VerificationDetail, Types.APIResponse {}

interface VerificationDetailListResponse extends Types.APIResponse {
  verification_details: Array<Types.VerificationDetail>;
  meta: Types.ListMeta;
}

interface VerificationDetailCreateRequest {
  //  The first line of the company's address.

  address_line1: string;

  //  The second line of the company's address.

  address_line2?: string;

  //  The third line of the company's address.

  address_line3?: string;

  //  The city of the company's address.

  city: string;

  //  The company's registration number.

  company_number: string;

  //  A summary describing what the company does.

  description: string;

  //  The company's directors.

  directors: Types.VerificationDetailDirector[];

  // Resources linked to this VerificationDetail.
  links: Types.VerificationDetailCreateRequestLinks;

  //  The company's legal name.

  name: string;

  //  The company's postal code.

  postal_code: string;
}

interface VerificationDetailListRequest {
  //  Cursor pointing to the start of the desired set.

  after?: string;

  //  Cursor pointing to the end of the desired set.

  before?: string;

  //  Unique identifier, beginning with "CR".

  creditor: string;

  //  Number of records to return.

  limit?: string;
}

export class VerificationDetailService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  public async create(
    requestParameters: VerificationDetailCreateRequest,
    idempotencyKey = '',
    customHeaders: Types.JsonMap = {},
  ): Promise<VerificationDetailResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/verification_details',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: 'verification_details',
      idempotencyKey,
      customHeaders,
      fetch: undefined,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: VerificationDetailResponse = {
      ...(response.body?.['verification_details'] ?? response),
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async list(
    requestParameters: VerificationDetailListRequest,
    customHeaders: Types.JsonMap = {},
  ): Promise<VerificationDetailListResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/verification_details',
      method: 'get',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: VerificationDetailListResponse = {
      ...response.body,
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async *all(
    requestParameters: VerificationDetailListRequest,
    customHeaders: Types.JsonMap = {},
  ): AsyncGenerator<Types.VerificationDetail, void, unknown> {
    let cursor = undefined;
    do {
      const list = await this.list({ ...requestParameters, after: cursor }, customHeaders);

      for (const verificationdetail of list.verification_details) {
        yield verificationdetail;
      }

      cursor = list.meta.cursors.after;
    } while (cursor);
  }
}
