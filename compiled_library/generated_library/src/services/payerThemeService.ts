'use strict';

import { Api } from '../api/api';
import * as Types from '../types/Types';

interface PayerThemeResponse extends Types.PayerTheme, Types.APIResponse {}

interface PayerThemeListResponse extends Types.APIResponse {
  payer_themes: Array<Types.PayerTheme>;
  meta: Types.ListMeta;
}

interface PayerThemeCreateForCreditorRequest {
  // Colour for buttons background (hexcode)

  button_background_colour?: string;

  // Colour for content box border (hexcode)

  content_box_border_colour?: string;

  // Colour for header background (hexcode)

  header_background_colour?: string;

  // Colour for text links (hexcode)

  link_text_colour?: string;

  // Resources linked to this PayerTheme.
  links?: Types.PayerThemeCreateForCreditorRequestLinks;
}

export class PayerThemeService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  public async createForCreditor(
    requestParameters: PayerThemeCreateForCreditorRequest,
    idempotencyKey = '',
    customHeaders: Types.JsonMap = {},
  ): Promise<PayerThemeResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/branding/payer_themes',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: 'payer_themes',
      idempotencyKey,
      customHeaders,
      fetch: undefined,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: PayerThemeResponse = {
      ...(response.body?.['payer_themes'] ?? response),
      __response__: response.__response__,
    };

    return formattedResponse;
  }
}
