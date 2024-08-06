'use strict';

import { Api } from '../api/api';
import * as Types from '../types/Types';

interface ExportResponse extends Types.Export, Types.APIResponse {}

interface ExportListResponse extends Types.APIResponse {
  exports: Types.Export[];
  meta: Types.ListMeta;
}

interface ExportListRequest {
  // Cursor pointing to the start of the desired set.

  after?: string;

  // Cursor pointing to the end of the desired set.

  before?: string;

  // Number of records to return.

  limit?: string;
}

export class ExportService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  async find(identity: string): Promise<ExportResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/exports/:identity',
      method: 'get',
      urlParameters,

      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: ExportResponse = {
      ...response.body['exports'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  async list(
    requestParameters: ExportListRequest
  ): Promise<ExportListResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/exports',
      method: 'get',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: ExportListResponse = {
      ...response.body,
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  async *all(
    requestParameters: ExportListRequest
  ): AsyncGenerator<Types.Export, void, unknown> {
    let cursor = undefined;
    do {
      const list = await this.list({ ...requestParameters, after: cursor });

      for (const exportdata of list.exports) {
        yield exportdata;
      }

      cursor = list.meta.cursors.after;
    } while (cursor);
  }
}
