'use strict';

import { Api } from '../api/api';
import * as Types from '../types/Types';

interface TransferredMandateResponse extends Types.TransferredMandate, Types.APIResponse {}

interface TransferredMandateListResponse extends Types.APIResponse {
  transferred_mandates: Array<Types.TransferredMandate>;
  meta: Types.ListMeta;
}

export class TransferredMandateService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  public async transferredMandates(
    identity: string,
    customHeaders: Types.JsonMap = {},
  ): Promise<TransferredMandateResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/transferred_mandates/:identity',
      method: 'get',
      urlParameters,

      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: TransferredMandateResponse = {
      ...response.body['transferred_mandates'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }
}
