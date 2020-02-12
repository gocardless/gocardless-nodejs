

'use strict';

interface CustomerNotification {

}

interface CustomerNotificationResponse {
  customernotification: CustomerNotification,
  request: object,
  response: object,
}

// TODO: This wont be needed on every resource...e.g. delete?
interface CustomerNotificationListResponse {
  customernotification: CustomerNotification[],
  request: object,
  response: object,
}

function CustomerNotifications(api) {
  this._api = api;
}

CustomerNotifications.prototype.handle = async function(identity: string, requestParameters: object = {}, headers: object = {}): Promise<CustomerNotificationResponse> {
  const urlParameters = [
    { key: 'identity', value: identity},
  ];

  const request = {
    path: '/customer_notifications/:identity/actions/handle',
    method: 'POST',
    urlParameters,
    requestParameters,
    payloadKey: 'data',
    headers,
    fetch: undefined,
  };

  const response = await this._api.request(request);

  return response;
}

module.exports = CustomerNotifications;
