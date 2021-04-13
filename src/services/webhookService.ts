'use strict';

import { Api } from '../api/api';
import * as Types from '../types/Types';

interface WebhookResponse extends Types.Webhook, Types.APIResponse {}

interface WebhookListResponse extends Types.APIResponse {
  webhooks: Types.Webhook[];
  meta: Types.ListMeta;
}

interface WebhookListRequest {
  // Cursor pointing to the start of the desired set.

  after?: string;

  // Cursor pointing to the end of the desired set.

  before?: string;

  // The creation date of this Webhook.
  created_at?: Types.CreatedAtFilter;

  // Show only test/non test webhooks

  is_test?: boolean;

  // Number of records to return.

  limit?: string;

  // Show only successful/failed webhooks

  successful?: boolean;
}

export class WebhookService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  async list(
    requestParameters: WebhookListRequest
  ): Promise<WebhookListResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/webhooks',
      method: 'get',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: WebhookListResponse = {
      ...response.body,
      __response__: response.__response__,
    };

    return formattedResponse;
  }
  async *all(
    requestParameters: WebhookListRequest
  ): AsyncGenerator<Types.Webhook, void, unknown> {
    let cursor = undefined;
    do {
      const list = await this.list({ ...requestParameters, after: cursor });

      for (const webhook of list.webhooks) {
        yield webhook;
      }

      cursor = list.meta.cursors.after;
    } while (cursor);
  }

  async find(identity: string): Promise<WebhookResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/webhooks/:identity',
      method: 'get',
      urlParameters,

      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: WebhookResponse = {
      ...response.body['webhooks'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  async retry(identity: string): Promise<WebhookResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/webhooks/:identity/actions/retry',
      method: 'post',
      urlParameters,

      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: WebhookResponse = {
      ...response.body['webhooks'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }
}
