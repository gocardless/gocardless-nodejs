

'use strict';

interface Event {

}

interface EventResponse {
  event: Event,
  request: object,
  response: object,
}

// TODO: This wont be needed on every resource...e.g. delete?
interface EventListResponse {
  event: Event[],
  request: object,
  response: object,
}

function Events(api) {
  this._api = api;
}

Events.prototype.list = async function(requestParameters: object = {}, headers: object = {}): Promise<EventListResponse> {
  const urlParameters = [];

  const request = {
    path: '/events',
    method: 'GET',
    urlParameters,
    requestParameters,
    payloadKey: undefined,
    headers,
    fetch: undefined,
  };

  const response = await this._api.request(request);

  return response;
}

// TODO: Should this be an iterator return type?
// Maybe AsyncIterableIterator<Payment>
// Might need this in tsconfig to work properly:
// {
//  "lib": ["esnext.asynciterable"]
// }
// https://github.com/octokit/rest.js/issues/1189
Events.prototype.all = async function*(requestParameters: object = {}, headers: object = {}): any {
  let cursor = undefined;
  do {
    let list = await this.list({ ...requestParameters, after: cursor }, headers);

    for (let event of list.events) {
      yield event;
    }

    cursor = list.meta.cursors.after;
  } while (cursor);
}

Events.prototype.find = async function(identity: string, headers: object = {}): Promise<EventResponse> {
  const urlParameters = [
    { key: 'identity', value: identity},
  ];

  const request = {
    path: '/events/:identity',
    method: 'GET',
    urlParameters,
    
    payloadKey: undefined,
    headers,
    fetch: undefined,
  };

  const response = await this._api.request(request);

  return response;
}

module.exports = Events;
