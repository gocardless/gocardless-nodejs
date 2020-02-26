'use strict';

import { Api } from '../api/Api';
import {
  Mandate,
  ResponseMetadata,
  JsonMap,
  PaymentCurrency,
  CustomerCurrency,
  InstalmentScheduleCurrency,
  PayoutCurrency,
  MandateCreateRequestLinks,
  CreatedAtFilter,
  MandateStatus,
} from '../types/Types';

interface MandateResponse extends Mandate {
  __metadata__: ResponseMetadata;
}

interface MandateListResponse extends Array<Mandate> {
  __metadata__: ResponseMetadata;
}

interface MandateCreateRequest {
  //
  links: MandateCreateRequestLinks;

  // Key-value store of custom data. Up to 3 keys are permitted, with key names up
  // to 50 characters and values up to 500 characters.
  metadata?: JsonMap;

  // For ACH customers only. Required for ACH customers. A string containing the
  // IP address of the payer to whom the mandate belongs (i.e. as a result of
  // their completion of a mandate setup flow in their browser).
  payer_ip_address?: string;

  // Unique reference. Different schemes have different length and [character
  // set](#appendix-character-sets) requirements. GoCardless will generate a
  // unique reference satisfying the different scheme requirements if this field
  // is left blank.
  reference?: string;

  // <a name="mandates_scheme"></a>Direct Debit scheme to which this mandate and
  // associated payments are submitted. Can be supplied or automatically detected
  // from the customer's bank account.
  scheme?: string;
}

interface MandateListRequest {
  // Cursor pointing to the start of the desired set.
  after?: string;

  // Cursor pointing to the end of the desired set.
  before?: string;

  //
  created_at?: CreatedAtFilter;

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

  // Unique reference. Different schemes have different length and [character
  // set](#appendix-character-sets) requirements. GoCardless will generate a
  // unique reference satisfying the different scheme requirements if this field
  // is left blank.
  reference?: string;

  // At most four valid status values
  status?: MandateStatus[];
}

interface MandateUpdateRequest {
  // Key-value store of custom data. Up to 3 keys are permitted, with key names up
  // to 50 characters and values up to 500 characters.
  metadata?: JsonMap;
}

interface MandateCancelRequest {
  // Key-value store of custom data. Up to 3 keys are permitted, with key names up
  // to 50 characters and values up to 500 characters.
  metadata?: JsonMap;
}

interface MandateReinstateRequest {
  // Key-value store of custom data. Up to 3 keys are permitted, with key names up
  // to 50 characters and values up to 500 characters.
  metadata?: JsonMap;
}

class MandateService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  async create(
    requestParameters: MandateCreateRequest,
    headers: object = {}
  ): Promise<MandateResponse> {
    const urlParameters = [];
    const request = {
      path: '/mandates',
      method: 'POST',
      urlParameters,
      requestParameters,
      payloadKey: 'mandates',
      headers,
      fetch: async (identity, headers) => this.find(identity, headers),
    };

    const response: MandateResponse = await this.api.request(request);
    return response;
  }

  async list(
    requestParameters: MandateListRequest,
    headers: object = {}
  ): Promise<MandateListResponse> {
    const urlParameters = [];
    const request = {
      path: '/mandates',
      method: 'GET',
      urlParameters,
      requestParameters,
      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: MandateListResponse = await this.api.request(request);
    return response;
  }

  async find(identity: string, headers: object = {}): Promise<MandateResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const request = {
      path: '/mandates/:identity',
      method: 'GET',
      urlParameters,

      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: MandateResponse = await this.api.request(request);
    return response;
  }

  async update(
    identity: string,
    requestParameters: MandateUpdateRequest,
    headers: object = {}
  ): Promise<MandateResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const request = {
      path: '/mandates/:identity',
      method: 'PUT',
      urlParameters,
      requestParameters,
      payloadKey: 'mandates',
      headers,
      fetch: null,
    };

    const response: MandateResponse = await this.api.request(request);
    return response;
  }

  async cancel(
    identity: string,
    requestParameters: MandateCancelRequest,
    headers: object = {}
  ): Promise<MandateResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const request = {
      path: '/mandates/:identity/actions/cancel',
      method: 'POST',
      urlParameters,
      requestParameters,
      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: MandateResponse = await this.api.request(request);
    return response;
  }

  async reinstate(
    identity: string,
    requestParameters: MandateReinstateRequest,
    headers: object = {}
  ): Promise<MandateResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const request = {
      path: '/mandates/:identity/actions/reinstate',
      method: 'POST',
      urlParameters,
      requestParameters,
      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: MandateResponse = await this.api.request(request);
    return response;
  }
}
