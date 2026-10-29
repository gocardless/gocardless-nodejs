import { Api } from '../api/api.js';
import * as Types from '../types/Types.js';

 
interface EventResponse extends Types.Event, Types.APIResponse {}

 
interface EventListResponse extends Types.APIResponse {
  events: Array<Types.Event>;
  meta: Types.ListMeta;
}

interface EventListRequest {
  // Limit to events with a given `action`.

  action?: string;

  // Cursor pointing to the start of the desired set.

  after?: string;

  // Cursor pointing to the end of the desired set.

  before?: string;

  // ID of a billing request
  // (https://docs.gocardless.com/docs/api-reference/billing-request). If
  // specified, this endpoint will return all events for the given billing
  // request.

  billing_request?: string;

  // The creation date of this Event.
  created_at?: Types.CreatedAtFilter;

  // ID of an creditor (https://docs.gocardless.com/docs/api-reference/creditor).
  // If specified, this endpoint will return all events for the given creditor.

  creditor?: string;

  // ID of an export. If specified, this endpoint will return all events for the
  // given export.

  export?: string;

  // Includes linked resources in the response. Must be used with the
  // `resource_type` parameter specified.

  include?: `${Types.EventInclude}`;

  // ID of an instalment schedule
  // (https://docs.gocardless.com/docs/api-reference/instalment-schedule). If
  // specified, this endpoint will return all events for the given instalment
  // schedule.

  instalment_schedule?: string;

  // Number of records to return.

  limit?: number;

  // ID of a mandate (https://docs.gocardless.com/docs/api-reference/mandate). If
  // specified, this endpoint will return all events for the given mandate.

  mandate?: string;

  // ID of an outbound_payment
  // (https://docs.gocardless.com/docs/api-reference/outbound-payment). If
  // specified, this endpoint will return all events for the given payment.

  outbound_payment?: string;

  // ID of an event. If specified, this endpoint will return all events whose
  // parent_event is the given event ID.

  parent_event?: string;

  // ID of a payer authorisation
  // (https://docs.gocardless.com/docs/api-reference/payer-authorisation).

  payer_authorisation?: string;

  // ID of a payment (https://docs.gocardless.com/docs/api-reference/payment). If
  // specified, this endpoint will return all events for the given payment.

  payment?: string;

  // ID of a payment account transaction. If specified, this endpoint will return
  // all events for the given transaction.

  payment_account_transaction?: string;

  // ID of a payout (https://docs.gocardless.com/docs/api-reference/payout). If
  // specified, this endpoint will return all events for the given payout.

  payout?: string;

  // ID of a refund (https://docs.gocardless.com/docs/api-reference/refund). If
  // specified, this endpoint will return all events for the given refund.

  refund?: string;

  // Type of resource that you'd like to get all events for.
  // Cannot be used together with the `billing_request`, `creditor`,
  // `export`,`instalment_schedule`, `mandate`, `payer_authorisation`, `payment`,
  // `payout`, `refund`, `scheme_identifier`, `subscription`, `outbound_payment`
  // or `payment_account_transaction` parameters.

  resource_type?: `${Types.EventResourceType}`;

  // ID of a scheme identifier
  // (https://docs.gocardless.com/docs/api-reference/scheme-identifier). If
  // specified, this endpoint will return all events for the given scheme
  // identifier.

  scheme_identifier?: string;

  // ID of a subscription
  // (https://docs.gocardless.com/docs/api-reference/subscription). If specified,
  // this endpoint will return all events for the given subscription.

  subscription?: string;
}

export class EventService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  public async list(
    requestParameters?: Partial<EventListRequest>,
    customHeaders: Types.JsonMap = {},
  ): Promise<EventListResponse> {
    const urlParameters = [];
    const requestParams = {
      path: '/events',
      method: 'get',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: EventListResponse = {
      ...response.body,
      __response__: response.__response__,
    };

    return formattedResponse;
  }

  public async *all(
    requestParameters?: Partial<EventListRequest>,
    customHeaders: Types.JsonMap = {},
  ): AsyncGenerator<Types.Event, void, unknown> {
    let cursor = undefined;
    do {
      let list = await this.list({ ...requestParameters, after: cursor }, customHeaders);

      for (let event of list.events) {
        yield event;
      }

      cursor = list.meta.cursors.after;
    } while (cursor);
  }

  public async find(identity: string, customHeaders: Types.JsonMap = {}): Promise<EventResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/events/:identity',
      method: 'get',
      urlParameters,

      payloadKey: null,
      fetch: null,
      customHeaders,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: EventResponse = {
      ...response.body['events'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }
}
