'use strict';

import { Api } from '../api/Api';
import {
  MandateImport,
  ResponseMetadata,
  JsonMap,
  PaymentCurrency,
  CustomerCurrency,
  InstalmentScheduleCurrency,
  PayoutCurrency,
  MandateImportScheme,
} from '../types/Types';

interface MandateImportResponse extends MandateImport {
  __metadata__: ResponseMetadata;
}

interface MandateImportListResponse extends Array<MandateImport> {
  __metadata__: ResponseMetadata;
}

interface MandateImportCreateRequest {
  // A Direct Debit scheme. Currently "ach", "autogiro", "bacs", "becs",
  // "becs_nz", "betalingsservice", "pad" and "sepa_core" are supported.
  scheme: MandateImportScheme;
}

class MandateImportService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  async create(
    requestParameters: MandateImportCreateRequest,
    headers: object = {}
  ): Promise<MandateImportResponse> {
    const urlParameters = [];
    const request = {
      path: '/mandate_imports',
      method: 'POST',
      urlParameters,
      requestParameters,
      payloadKey: 'mandate_imports',
      headers,
      fetch: async (identity, headers) => this.find(identity, headers),
    };

    const response: MandateImportResponse = await this.api.request(request);
    return response;
  }

  async find(
    identity: string,
    headers: object = {}
  ): Promise<MandateImportResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const request = {
      path: '/mandate_imports/:identity',
      method: 'GET',
      urlParameters,

      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: MandateImportResponse = await this.api.request(request);
    return response;
  }

  async submit(
    identity: string,
    headers: object = {}
  ): Promise<MandateImportResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const request = {
      path: '/mandate_imports/:identity/actions/submit',
      method: 'POST',
      urlParameters,

      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: MandateImportResponse = await this.api.request(request);
    return response;
  }

  async cancel(
    identity: string,
    headers: object = {}
  ): Promise<MandateImportResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const request = {
      path: '/mandate_imports/:identity/actions/cancel',
      method: 'POST',
      urlParameters,

      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: MandateImportResponse = await this.api.request(request);
    return response;
  }
}
