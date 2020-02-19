'use strict';

import { MandateImport } from '../types/Types';
import { Api } from '../api/Api';

interface MandateImportResponse extends MandateImport {
  request: object;
  response: object;
}

interface MandateImportListResponse extends MandateImport {
  request: object;
  response: object;
}

class MandateImportService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  async create(
    requestParameters: object,
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
    requestParameters: object,
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
    requestParameters: object,
    headers: object = {}
  ): Promise<MandateImportResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];

    const request = {
      path: '/mandate_imports/:identity/actions/submit',
      method: 'POST',
      urlParameters,
      requestParameters,
      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: MandateImportResponse = await this.api.request(request);
    return response;
  }

  async cancel(
    identity: string,
    requestParameters: object,
    headers: object = {}
  ): Promise<MandateImportResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];

    const request = {
      path: '/mandate_imports/:identity/actions/cancel',
      method: 'POST',
      urlParameters,
      requestParameters,
      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: MandateImportResponse = await this.api.request(request);
    return response;
  }
}
