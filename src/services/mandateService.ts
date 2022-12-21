'use strict';

import { Api } from '../api/api';
import * as Types from '../types/Types';

interface MandateResponse extends Types.Mandate, Types.APIResponse {}

interface MandateListResponse extends Types.APIResponse {
  mandates: Types.Mandate[];
  meta: Types.ListMeta;
}

interface MandateCreateRequest {
  // This field is ACH specific, sometimes referred to as [SEC
  // code](https://www.moderntreasury.com/learn/sec-codes).
  //
  // This is the way that the payer gives authorisation to the merchant.
  //   web: Authorisation is Internet Initiated or via Mobile Entry (maps to SEC
  // code: WEB)
  //   telephone: Authorisation is provided orally over telephone (maps to SEC
  // code: TEL)
  //   paper: Authorisation is provided in writing and signed, or similarly
  // authenticated (maps to SEC code: PPD)
  //

  authorisation_source?: Types.MandateAuthorisationSource;

  // Resources linked to this Mandate.
  links: Types.MandateCreateRequestLinks;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names up
  // to 50 characters and values up to 500 characters.

  metadata?: Types.JsonMap;

  // For ACH customers only. Required for ACH customers. A string containing the
  // IP address of the payer to whom the mandate belongs (i.e. as a result of
  // their completion of a mandate setup flow in their browser).

  payer_ip_address?: string;

  // Unique reference. Different schemes have different length and [character
  // set](#appendix-character-sets) requirements. GoCardless will generate a
  // unique reference satisfying the different scheme requirements if this field
  // is left blank.

  reference?: string;

  // <a name="mandates_scheme"></a>Bank payment scheme to which this mandate and
  // associated payments are submitted. Can be supplied or automatically detected
  // from the customer's bank account.

  scheme?: string;
}

interface MandateListRequest {
  // Cursor pointing to the start of the desired set.

  after?: string;

  // Cursor pointing to the end of the desired set.

  before?: string;

  // The creation date of this Mandate.
  created_at?: Types.CreatedAtFilter;

  // ID of a [creditor](#core-endpoints-creditors). If specified, this endpoint
  // will return all mandates for the given creditor. Cannot be used in
  // conjunction with `customer` or `customer_bank_account`

  creditor?: string;

  // ID of a [customer](#core-endpoints-customers). If specified, this endpoint
  // will return all mandates for the given customer. Cannot be used in
  // conjunction with `customer_bank_account` or `creditor`

  customer?: string;

  // ID of a [customer bank account](#core-endpoints-customer-bank-accounts). If
  // specified, this endpoint will return all mandates for the given bank account.
  // Cannot be used in conjunction with `customer` or `creditor`

  customer_bank_account?: string;

  // Number of records to return.

  limit?: string;

  // Mandate type

  mandate_type?: string;

  // Unique reference. Different schemes have different length and [character
  // set](#appendix-character-sets) requirements. GoCardless will generate a
  // unique reference satisfying the different scheme requirements if this field
  // is left blank.

  reference?: string;

  // Scheme you'd like to retrieve mandates for

  scheme?: string[];

  // At most four valid status values

  status?: Types.MandateStatus[];
}

interface MandateUpdateRequest {
  // Key-value store of custom data. Up to 3 keys are permitted, with key names up
  // to 50 characters and values up to 500 characters.

  metadata?: Types.JsonMap;
}

interface MandateCancelRequest {
  // Key-value store of custom data. Up to 3 keys are permitted, with key names up
  // to 50 characters and values up to 500 characters.

  metadata?: Types.JsonMap;
}

interface MandateReinstateRequest {
  // Key-value store of custom data. Up to 3 keys are permitted, with key names up
  // to 50 characters and values up to 500 characters.

  metadata?: Types.JsonMap;
}

export class MandateService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  async create(
    requestParameters: MandateCreateRequest,
    idempotencyKey = '',
    customHeaders: Types.JsonMap = {}
  ): Promise<MandateResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/mandates',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: 'mandates',
      idempotencyKey,
      customHeaders,
      fetch: async identity => this.find(identity),
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: MandateResponse = {
      ...(response.body?.['mandates'] ?? response),
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  async list(
    requestParameters: MandateListRequest
  ): Promise<MandateListResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/mandates',
      method: 'get',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: MandateListResponse = {
      ...response.body,
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  async *all(
    requestParameters: MandateListRequest
  ): AsyncGenerator<Types.Mandate, void, unknown> {
    let cursor = undefined;
    do {
      const list = await this.list({ ...requestParameters, after: cursor });

      for (const mandate of list.mandates) {
        yield mandate;
      }

      cursor = list.meta.cursors.after;
    } while (cursor);
  }

  async find(identity: string): Promise<MandateResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/mandates/:identity',
      method: 'get',
      urlParameters,

      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: MandateResponse = {
      ...response.body['mandates'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  async update(
    identity: string,
    requestParameters: MandateUpdateRequest
  ): Promise<MandateResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/mandates/:identity',
      method: 'put',
      urlParameters,
      requestParameters,
      payloadKey: 'mandates',
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: MandateResponse = {
      ...response.body['mandates'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  async cancel(
    identity: string,
    requestParameters: MandateCancelRequest
  ): Promise<MandateResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/mandates/:identity/actions/cancel',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: MandateResponse = {
      ...response.body['mandates'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  async reinstate(
    identity: string,
    requestParameters: MandateReinstateRequest
  ): Promise<MandateResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/mandates/:identity/actions/reinstate',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: MandateResponse = {
      ...response.body['mandates'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }
}
