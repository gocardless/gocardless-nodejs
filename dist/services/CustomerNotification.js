'use strict';
function CustomerNotifications(api) {
    this._api = api;
}
CustomerNotifications.prototype.handle = async function (identity, requestParameters = {}, headers = {}) {
    const urlParameters = [
        { key: 'identity', value: identity },
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
};
//# sourceMappingURL=CustomerNotification.js.map