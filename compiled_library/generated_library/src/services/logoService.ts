'use strict';

import { Api } from '../api/api';
import * as Types from '../types/Types';

interface LogoResponse extends Types.Logo, Types.APIResponse {}

interface LogoListResponse extends Types.APIResponse {
  logos: Array<Types.Logo>;
  meta: Types.ListMeta;
}

interface LogoCreateForCreditorRequest {
  // Base64 encoded string.

  image: string;

  // Resources linked to this Logo.
  links?: Types.LogoCreateForCreditorRequestLinks;
}

export class LogoService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  public async createForCreditor(
    requestParameters: LogoCreateForCreditorRequest,
    idempotencyKey = '',
    customHeaders: Types.JsonMap = {},
  ): Promise<LogoResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/branding/logos',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: 'logos',
      idempotencyKey,
      customHeaders,
      fetch: undefined,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: LogoResponse = {
      ...(response.body?.['logos'] ?? response),
      __response__: response.__response__,
    };

    return formattedResponse;
  }
}
