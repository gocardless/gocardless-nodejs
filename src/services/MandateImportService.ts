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

export class MandateImportService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  async create(
    requestParameters: MandateImportCreateRequest,
    idempotencyKey = ''
  ): Promise<MandateImportResponse> {
    const urlParameters = [];
    const request = {
      path: '/mandate_imports',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: 'mandate_imports',
      idempotencyKey,
      fetch: async identity => this.find(identity),
    };

    const response: MandateImportResponse = await this.api.request(request);
    return response;
  }

  async find(identity: string): Promise<MandateImportResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const request = {
      path: '/mandate_imports/:identity',
      method: 'get',
      urlParameters,

      payloadKey: null,
      fetch: null,
    };

    const response: MandateImportResponse = await this.api.request(request);
    return response;
  }

  async submit(identity: string): Promise<MandateImportResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const request = {
      path: '/mandate_imports/:identity/actions/submit',
      method: 'post',
      urlParameters,

      payloadKey: null,
      fetch: null,
    };

    const response: MandateImportResponse = await this.api.request(request);
    return response;
  }

  async cancel(identity: string): Promise<MandateImportResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const request = {
      path: '/mandate_imports/:identity/actions/cancel',
      method: 'post',
      urlParameters,

      payloadKey: null,
      fetch: null,
    };

    const response: MandateImportResponse = await this.api.request(request);
    return response;
  }
}