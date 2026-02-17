'use strict';

import { Api } from '../api/api';
import * as Types from '../types/Types';

interface PayerAuthorisationResponse extends Types.PayerAuthorisation, Types.APIResponse {}

interface PayerAuthorisationListResponse extends Types.APIResponse {
  payer_authorisations: Array<Types.PayerAuthorisation>;
  meta: Types.ListMeta;
}

interface PayerAuthorisationCreateRequest {
  //  All details required for the creation of a
  //  [Customer Bank Account](#core-endpoints-customer-bank-accounts).
  bank_account: Types.PayerAuthorisationBankAccount;

  //  All details required for the creation of a
  //  [Customer](#core-endpoints-customers).
  customer: Types.PayerAuthorisationCustomer;

  //  All details required for the creation of a
  //  [Mandate](#core-endpoints-mandates).
  mandate: Types.PayerAuthorisationMandate;
}

interface PayerAuthorisationUpdateRequest {
  //  All details required for the creation of a
  //  [Customer Bank Account](#core-endpoints-customer-bank-accounts).
  bank_account: Types.PayerAuthorisationBankAccount;

  //  All details required for the creation of a
  //  [Customer](#core-endpoints-customers).
  customer: Types.PayerAuthorisationCustomer;

  //  All details required for the creation of a
  //  [Mandate](#core-endpoints-mandates).
  mandate: Types.PayerAuthorisationMandate;
}

export class PayerAuthorisationService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  public async find(identity: string, customHeaders: Types.JsonMap = {}): Promise<PayerAuthorisationResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/payer_authorisations/:identity',
      method: 'get',
      urlParameters,

      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: PayerAuthorisationResponse = {
      ...response.body['payer_authorisations'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async create(
    requestParameters: PayerAuthorisationCreateRequest,
    idempotencyKey = '',
    customHeaders: Types.JsonMap = {},
  ): Promise<PayerAuthorisationResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/payer_authorisations',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: 'payer_authorisations',
      idempotencyKey,
      customHeaders,
      fetch: async (identity) => await this.find(identity),
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: PayerAuthorisationResponse = {
      ...(response.body?.['payer_authorisations'] ?? response),
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async update(
    identity: string,
    requestParameters: PayerAuthorisationUpdateRequest,
    customHeaders: Types.JsonMap = {},
  ): Promise<PayerAuthorisationResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/payer_authorisations/:identity',
      method: 'put',
      urlParameters,
      requestParameters,
      payloadKey: 'payer_authorisations',
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: PayerAuthorisationResponse = {
      ...response.body['payer_authorisations'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async submit(identity: string, customHeaders: Types.JsonMap = {}): Promise<PayerAuthorisationResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/payer_authorisations/:identity/actions/submit',
      method: 'post',
      urlParameters,

      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: PayerAuthorisationResponse = {
      ...response.body['payer_authorisations'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async confirm(identity: string, customHeaders: Types.JsonMap = {}): Promise<PayerAuthorisationResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/payer_authorisations/:identity/actions/confirm',
      method: 'post',
      urlParameters,

      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: PayerAuthorisationResponse = {
      ...response.body['payer_authorisations'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }
}
