'use strict';

import { Api } from '../api/api';
import * as Types from '../types/Types';

interface BankAuthorisationResponse
  extends Types.BankAuthorisation,
    Types.APIResponse {}

interface BankAuthorisationListResponse extends Types.APIResponse {
  bank_authorisations: Types.BankAuthorisation[];
  meta: Types.ListMeta;
}

interface BankAuthorisationCreateRequest {
  // Type of authorisation, can be either 'mandate' or 'payment'.

  authorisation_type?: Types.BankAuthorisationAuthorisationType;

  // Resources linked to this BankAuthorisation.
  links: Types.BankAuthorisationCreateRequestLinks;

  // URL that the payer can be redirected to after authorising the payment.

  redirect_uri?: string;
}

export class BankAuthorisationService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  async find(identity: string): Promise<BankAuthorisationResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/bank_authorisations/:identity',
      method: 'get',
      urlParameters,

      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: BankAuthorisationResponse = {
      ...response.body['bank_authorisations'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  async create(
    requestParameters: BankAuthorisationCreateRequest,
    idempotencyKey = '',
    customHeaders: Types.JsonMap = {}
  ): Promise<BankAuthorisationResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/bank_authorisations',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: 'bank_authorisations',
      idempotencyKey,
      customHeaders,
      fetch: async identity => this.find(identity),
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: BankAuthorisationResponse = {
      ...response.body['bank_authorisations'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }
}
