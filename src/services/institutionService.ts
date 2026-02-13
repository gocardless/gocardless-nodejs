'use strict';

import { Api } from '../api/api';
import * as Types from '../types/Types';

interface InstitutionResponse extends Types.Institution, Types.APIResponse {}

interface InstitutionListResponse extends Types.APIResponse {
  institutions: Array<Types.Institution>;
  meta: Types.ListMeta;
}

interface InstitutionListRequest {
  //  (Currently only supports UK sort-codes) The six-digit number that identifies
  //  both the bank and the specific branch where an account is held, eg.
  //  '601234'.

  branch_code?: string;

  //  [ISO
  //  3166-1](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
  //  alpha-2 code. The country code of the institution. If nothing is provided,
  //  institutions with the country code 'GB' are returned by default.

  country_code?: string;

  //  The feature that institutions support. The available options include `pis`,
  //  and `vrp_sweeping`. If nothing is provided, institutions supporting 'pis'
  //  are returned by default.

  feature?: string;

  //  The scheme that institutions support. The available options include
  //  `faster_payments`, `sepa_credit_transfer`, and
  //  `sepa_instant_credit_transfer`. If nothing is provided, institutions
  //  supporting 'faster_payments' are returned by default.

  scheme?: string;
}

interface InstitutionListForBillingRequestRequest {
  //  [ISO
  //  3166-1](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
  //  alpha-2 code. The country code of the institution. If nothing is provided,
  //  institutions with the country code 'GB' are returned by default.

  country_code: string;

  //  ID(s) of the institution(s) to retrieve. More than one ID can be specified
  //  using a comma-separated string.

  ids?: string[];

  //  Indicates whether to include temporarily disabled institutions in the
  //  response.
  //  If not provided or set to false, only enabled institutions will be returned.
  //

  include_disabled?: boolean;

  //  A search substring for retrieving institution(s), based on the institution's
  //  name.

  search?: string;
}

export class InstitutionService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  public async list(
    requestParameters: InstitutionListRequest,
    customHeaders: Types.JsonMap = {},
  ): Promise<InstitutionListResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/institutions',
      method: 'get',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: InstitutionListResponse = {
      ...response.body,
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async list_for_billing_request(
    requestParameters: InstitutionListForBillingRequestRequest,
    customHeaders: Types.JsonMap = {},
  ): Promise<InstitutionListResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/billing_requests/:identity/institutions',
      method: 'get',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: InstitutionListResponse = {
      ...response.body,
      __response__: response.__response__,
    };

    return formattedResponse;
  }
}
