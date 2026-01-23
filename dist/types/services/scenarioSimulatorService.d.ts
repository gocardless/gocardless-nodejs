import * as Types from '../types/Types.js';
interface ScenarioSimulatorResponse extends Types.ScenarioSimulator, Types.APIResponse {
}
interface ScenarioSimulatorRunRequest {
    links?: Types.ScenarioSimulatorRunRequestLinks;
}
export declare class ScenarioSimulatorService {
    private api;
    constructor(api: any);
    run(identity: string, requestParameters: ScenarioSimulatorRunRequest, customHeaders?: Types.JsonMap): Promise<ScenarioSimulatorResponse>;
}
export {};
//# sourceMappingURL=scenarioSimulatorService.d.ts.map