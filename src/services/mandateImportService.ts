'use strict';

import { Api } from '../api/api';
import * as Types from '../types/Types';

interface MandateImportResponse extends Types.MandateImport, Types.APIResponse {}

interface MandateImportListResponse extends Types.APIResponse {
  mandate_imports: Array<Types.MandateImport>;
  meta: Types.ListMeta;
}

interface MandateImportCreateRequest {
  // Resources linked to this MandateImport.
  links?: Types.MandateImportCreateRequestLinks;

  // A bank payment scheme. Currently "ach", "autogiro", "bacs", "becs",
  // "becs_nz", "betalingsservice", "faster_payments", "pad", "pay_to" and
  // "sepa_core" are supported.

  scheme: Types.MandateImportScheme;
}

export class MandateImportService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  public async create(
    requestParameters: MandateImportCreateRequest,
    idempotencyKey = '',
    customHeaders: Types.JsonMap = {},
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
      fetch: async (identity) => await this.find(identity),
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: MandateImportResponse = {
      ...(response.body?.['mandate_imports'] ?? response),
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async find(identity: string, customHeaders: Types.JsonMap = {}): Promise<MandateImportResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/mandate_imports/:identity',
      method: 'get',
      urlParameters,

      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: MandateImportResponse = {
      ...response.body['mandate_imports'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async submit(identity: string, customHeaders: Types.JsonMap = {}): Promise<MandateImportResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/mandate_imports/:identity/actions/submit',
      method: 'post',
      urlParameters,

      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: MandateImportResponse = {
      ...response.body['mandate_imports'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async cancel(identity: string, customHeaders: Types.JsonMap = {}): Promise<MandateImportResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/mandate_imports/:identity/actions/cancel',
      method: 'post',
      urlParameters,

      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: MandateImportResponse = {
      ...response.body['mandate_imports'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }
}
