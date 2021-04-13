'use strict';

import { Api } from '../api/api';
import * as Types from '../types/Types';

interface ScenarioSimulatorResponse
  extends Types.ScenarioSimulator,
    Types.APIResponse {}

interface ScenarioSimulatorListResponse extends Types.APIResponse {
  scenario_simulators: Types.ScenarioSimulator[];
  meta: Types.ListMeta;
}

interface ScenarioSimulatorRunRequest {
  // [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217#Active_codes) currency code.
  // Currently "AUD", "CAD", "DKK", "EUR", "GBP", "NZD", "SEK" and "USD" are
  // supported.
  // Only required when simulating `payout_create`

  currency?: Types.ScenarioSimulatorCurrency;

  // Resources linked to this ScenarioSimulator.
  links?: Types.ScenarioSimulatorRunRequestLinks;
}

export class ScenarioSimulatorService {
  private api: Api;

  constructor(api) {
    this.api = api;
  }

  async run(
    identity: string,
    requestParameters: ScenarioSimulatorRunRequest
  ): Promise<ScenarioSimulatorResponse> {
    const urlParameters = [{ key: 'identity', value: identity }];
    const requestParams = {
      path: '/scenario_simulators/:identity/actions/run',
      method: 'post',
      urlParameters,
      requestParameters,
      payloadKey: null,
      fetch: null,
    };

    const response = await this.api.request(requestParams);
    const formattedResponse: ScenarioSimulatorResponse = {
      ...response.body['scenario_simulators'],
      __response__: response.__response__,
    };

    return formattedResponse;
  }
}
