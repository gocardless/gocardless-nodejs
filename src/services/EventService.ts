'use strict';

import { Api } from '../api/Api';
import {
  Event,
  APIResponse,
  JsonMap,
  ListMeta,
  PaymentCurrency,
  CustomerCurrency,
  InstalmentScheduleCurrency,
  PayoutCurrency,
  CreatedAtFilter,
  EventInclude,
  EventResourceType,
} from '../types/Types';

interface EventResponse extends Event, APIResponse {}

interface EventListResponse extends APIResponse {
  events: Event[];
  meta: ListMeta;
}

interface EventListRequest {
  // Limit to events with a given `action`.
  action?: string;

  // Cursor pointing to the start of the desired set.
  after?: string;

  // Cursor pointing to the end of the desired set.
  before?: string;

  //
  created_at?: CreatedAtFilter;

  // Includes linked resources in the response. Must be used with the
  // `resource_type` parameter specified. The include should be one of:
  // <ul>
  // <li>`payment`</li>
  // <li>`mandate`</li>
  // <li>`payout`</li>
  // <li>`refund`</li>
  // <li>`subscription`</li>
  // <li>`instalment_schedule`</li>
  // <li>`creditor`</li>
  // </ul>
  include?: EventInclude;

  // Number of records to return.
  limit?: string;

  // ID of a [mandate](#core-endpoints-mandates). If specified, this endpoint will
  // return all events for the given mandate.
  mandate?: string;

  // ID of an event. If specified, this endpint will return all events whose
  // parent_event is the given event ID.
  parent_event?: string;

  // ID of a [payment](#core-endpoints-payments). If specified, this endpoint will
  // return all events for the given payment.
  payment?: string;

  // ID of a [payout](#core-endpoints-payouts). If specified, this endpoint will
  // return all events for the given payout.
  payout?: string;

  // ID of a [refund](#core-endpoints-refunds). If specified, this endpoint will
  // return all events for the given refund.
  refund?: string;

  // Type of resource that you'd like to get all events for. Cannot be used
  // together with the `payment`, `mandate`, `subscription`,
  // `instalment_schedule`, `creditor`, `refund` or `payout` parameter. The type
  // can be one of:
  // <ul>
  // <li>`payments`</li>
  // <li>`mandates`</li>
  // <li>`payouts`</li>
  // <li>`subscriptions`</li>
  // <li>`instalment_schedules`</li>
  // <li>`creditors`</li>
  // <li>`refunds`</li>
  // </ul>
  resource_type?: EventResourceType;

  // ID of a [subscription](#core-endpoints-subscriptions). If specified, this
  // endpoint will return all events for the given subscription.
  subscription?: string;
}

export class EventService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  async list(requestParameters: EventListRequest): Promise<EventListResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/events',
      method: 'get',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: EventListResponse = {
      events: response.body['events'],
      meta: response.body['meta'],
      __response__: response.__response__,
    };

    return response;
  }

  async find(identity: string): Promise<EventResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/events/:identity',
      method: 'get',
      urlParameters,

      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: EventResponse = {
      ...response.body['events'],
      __response__: response.__response__,
    };

    return response;
  }
}
