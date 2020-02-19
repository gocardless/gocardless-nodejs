'use strict';

import { Event } from '../types/Types';
import { Api } from '../api/Api';

interface EventResponse extends Event {
  request: object;
  response: object;
}

interface EventListResponse extends Event {
  request: object;
  response: object;
}

class EventService {
  private api: Api;

  constructor(api) {
    this.api = api;
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
  ): Promise<EventListResponse> {
    const urlParameters = [];
    const request = {
      path: '/events',
      method: 'GET',
      urlParameters,
      requestParameters,
      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: EventListResponse = await this.api.request(request);
    return response;
  }

  async find(
    identity: string,
    requestParameters: object,
    headers: object = {}
  ): Promise<EventResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];

    const request = {
      path: '/events/:identity',
      method: 'GET',
      urlParameters,
      payloadKey: null,
      headers,
      fetch: null,
    };

    const response: EventResponse = await this.api.request(request);
    return response;
  }
}
