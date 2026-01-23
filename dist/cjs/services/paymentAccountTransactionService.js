"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentAccountTransactionService = void 0;
class PaymentAccountTransactionService {
    constructor(api) {
        this.api = api;
    }
    async list(requestParameters, customHeaders = {}) {
        const urlParameters = [];
        const requestParams = {
            path: '/payment_accounts/:identity/transactions',
            method: 'get',
            urlParameters,
            requestParameters,
            payloadKey: null,
            fetch: null,
            customHeaders,
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...response.body,
            __response__: response.__response__,
        };
        return formattedResponse;
    }
    async *all(requestParameters, customHeaders = {}) {
        let cursor = undefined;
        do {
            const list = await this.list({ ...requestParameters, after: cursor }, customHeaders);
            for (const paymentaccounttransaction of list.payment_account_transactions) {
                yield paymentaccounttransaction;
            }
            cursor = list.meta.cursors.after;
        } while (cursor);
    }
}
exports.PaymentAccountTransactionService = PaymentAccountTransactionService;
//# sourceMappingURL=paymentAccountTransactionService.js.map