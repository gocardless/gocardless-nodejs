'use strict';

import { Api } from '../api/api';
import * as Types from '../types/Types';

interface FundsAvailabilityResponse extends Types.FundsAvailability, Types.APIResponse {}

interface FundsAvailabilityListResponse extends Types.APIResponse {
  funds_availability: Array<Types.FundsAvailability>;
  meta: Types.ListMeta;
}

interface FundsAvailabilityCheckRequest {
  // The amount of the payment

  amount?: string;
}

export class FundsAvailabilityService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  public async check(
    identity: string,
    requestParameters: FundsAvailabilityCheckRequest,
    customHeaders: Types.JsonMap = {},
  ): Promise<FundsAvailabilityResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/funds_availability/:identity',
      method: 'get',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: FundsAvailabilityResponse = {
      ...response.body['funds_availability'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }
}
