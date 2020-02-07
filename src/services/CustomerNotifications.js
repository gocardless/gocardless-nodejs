

'use strict';

function CustomerNotifications(api) {
  this._api = api;
}

CustomerNotifications.prototype.handle = async function(identity, requestParameters = {}, headers = {}) {
  const urlParameters = [];
  
  urlParameters.push({ key: 'identity', value: identity});
  const request = {
    path: '/customer_notifications/:identity/actions/handle',
    method: 'POST',
    urlParameters,
    requestParameters,
    payloadKey: 'data',
    envelope: 'customer_notifications',
    headers,
    fetch: undefined,
  };

  const response = await this._api.request(request);

  return response;
}

module.exports = CustomerNotifications;
