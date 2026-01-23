import { GoCardlessClient } from './client.js';
import { Environments } from './constants.js';
/**
 * Initialize a GoCardless client
 * @param token - API token
 * @param environment - Live or Sandbox environment
 * @param options - Additional API options
 */
export default function gocardless(token, environment = Environments.Live, options = {}) {
    return new GoCardlessClient(token, environment, options);
}
// Named export for destructuring
export { gocardless };
// Re-export main exports for convenience
export { GoCardlessClient } from './client.js';
export { Environments, CLIENT_VERSION, API_VERSION } from './constants.js';
export { parse, verifySignature, InvalidSignatureError } from './webhooks.js';
//# sourceMappingURL=index.js.map