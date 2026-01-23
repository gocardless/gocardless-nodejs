"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidSignatureError = exports.verifySignature = exports.parse = exports.API_VERSION = exports.CLIENT_VERSION = exports.Environments = exports.GoCardlessClient = exports.gocardless = void 0;
const client_js_1 = require("./client.js");
const constants_js_1 = require("./constants.js");
/**
 * Initialize a GoCardless client
 * @param token - API token
 * @param environment - Live or Sandbox environment
 * @param options - Additional API options
 */
function gocardless(token, environment = constants_js_1.Environments.Live, options = {}) {
    return new client_js_1.GoCardlessClient(token, environment, options);
}
exports.default = gocardless;
exports.gocardless = gocardless;
// Re-export main exports for convenience
var client_js_2 = require("./client.js");
Object.defineProperty(exports, "GoCardlessClient", { enumerable: true, get: function () { return client_js_2.GoCardlessClient; } });
var constants_js_2 = require("./constants.js");
Object.defineProperty(exports, "Environments", { enumerable: true, get: function () { return constants_js_2.Environments; } });
Object.defineProperty(exports, "CLIENT_VERSION", { enumerable: true, get: function () { return constants_js_2.CLIENT_VERSION; } });
Object.defineProperty(exports, "API_VERSION", { enumerable: true, get: function () { return constants_js_2.API_VERSION; } });
var webhooks_js_1 = require("./webhooks.js");
Object.defineProperty(exports, "parse", { enumerable: true, get: function () { return webhooks_js_1.parse; } });
Object.defineProperty(exports, "verifySignature", { enumerable: true, get: function () { return webhooks_js_1.verifySignature; } });
Object.defineProperty(exports, "InvalidSignatureError", { enumerable: true, get: function () { return webhooks_js_1.InvalidSignatureError; } });
//# sourceMappingURL=index.js.map