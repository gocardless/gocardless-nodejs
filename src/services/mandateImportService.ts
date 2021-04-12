'use strict';

import { Api } from '../api/api';
import * as Types from '../types/Types';

interface MandateImportResponse
  extends Types.MandateImport,
    Types.APIResponse {}

interface MandateImportListResponse extends Types.APIResponse {
  mandate_imports: Types.MandateImport[];
  meta: Types.ListMeta;
}

interface MandateImportCreateRequest {
  // A Direct Debit scheme. Currently "ach", "autogiro", "bacs", "becs",
  // "becs_nz", "betalingsservice", "pad" and "sepa_core" are supported.

  scheme: Types.MandateImportScheme;
}

interface MandateImportGetRequest {}

interface MandateImportSubmitRequest {}

interface MandateImportCancelRequest {}

export class MandateImportService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  async create(
    requestParameters: MandateImportCreateRequest,
    idempotencyKey = '',
    customHeaders: Types.JsonMap = {}
  ): Promise<MandateImportResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/mandate_imports',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: 'mandate_imports',
      idempotencyKey,
      customHeaders,
      fetch: async identity => this.find(identity),
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: MandateImportResponse = {
      ...response.body['mandate_imports'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  async find(identity: string): Promise<MandateImportResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/mandate_imports/:identity',
      method: 'get',
      urlParameters,

      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: MandateImportResponse = {
      ...response.body['mandate_imports'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  async submit(identity: string): Promise<MandateImportResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/mandate_imports/:identity/actions/submit',
      method: 'post',
      urlParameters,

      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: MandateImportResponse = {
      ...response.body['mandate_imports'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  async cancel(identity: string): Promise<MandateImportResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/mandate_imports/:identity/actions/cancel',
      method: 'post',
      urlParameters,

      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: MandateImportResponse = {
      ...response.body['mandate_imports'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }
}
