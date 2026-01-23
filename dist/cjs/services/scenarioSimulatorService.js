"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScenarioSimulatorService = void 0;
class ScenarioSimulatorService {
    constructor(api) {
        this.api = api;
    }
    async run(identity, requestParameters, customHeaders = {}) {
        const urlParameters = [{ key: 'identity', value: identity }];
        const requestParams = {
            path: '/scenario_simulators/:identity/actions/run',
            method: 'post',
            urlParameters,
            requestParameters,
            payloadKey: null,
            fetch: null,
            customHeaders,
        };
        const response = await this.api.request(requestParams);
        const formattedResponse = {
            ...response.body['scenario_simulators'],
            __response__: response.__response__,
        };
        return formattedResponse;
    }
}
exports.ScenarioSimulatorService = ScenarioSimulatorService;
//# sourceMappingURL=scenarioSimulatorService.js.map