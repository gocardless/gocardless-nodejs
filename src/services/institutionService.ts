'use strict';

import { Api } from '../api/api';
import * as Types from '../types/Types';

interface InstitutionResponse extends Types.Institution, Types.APIResponse {}

interface InstitutionListResponse extends Types.APIResponse {
  institutions: Types.Institution[];
  meta: Types.ListMeta;
}

interface InstitutionListRequest {
  // [ISO
  // 3166-1](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
  // alpha-2 code. The country code of the institution.

  country_code?: string;
}

export class InstitutionService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  async list(
    requestParameters: InstitutionListRequest
  ): Promise<InstitutionListResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/institutions',
      method: 'get',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: InstitutionListResponse = {
      ...response.body,
      __response__: response.__response__,
    };

    return formattedResponse;
  }
}
