'use strict';

import { MandateImportEntry } from '../types/Types';
import { Api } from '../api/Api';

interface MandateImportEntryResponse extends MandateImportEntry {
  request: object;
  response: object;
}

interface MandateImportEntryListResponse extends MandateImportEntry {
  request: object;
  response: object;
}

class MandateImportEntryService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  async create(
    requestParameters: object,
    headers: object = {}
  ): Promise<MandateImportEntryResponse> {
    const urlParameters = [];
    const request = {
      path: '/mandate_import_entries',
      method: 'POST',
      urlParameters,
      requestParameters,
      payloadKey: 'mandate_import_entries',
      headers,
      fetch: undefined,
    };

    const response: MandateImportEntryResponse = await this.api.request(
      request
    );
    return response;
  }

  // TODO: Should this be an iterator return type?
  // Maybe AsyncIterableIterator<Payment>
  // Might need this in tsconfig to work properly:
  // {
  //  "lib": ["esnext.asynciterable"]
  // }
  // https://github.com/octokit/rest.js/issues/1189
  async list(
    requestParameters: object,
    headers: object = {}
  ): Promise<MandateImportEntryListResponse> {
    const urlParameters = [];
    const request = {
      path: '/mandate_import_entries',
      method: 'GET',
      urlParameters,
      requestParameters,
      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: MandateImportEntryListResponse = await this.api.request(
      request
    );
    return response;
  }
}
