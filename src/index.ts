import { GoCardlessClient } from './client.js';
import { Environments } from './constants.js';
import type { APIOptions } from './api/api.js';

/**
 * Initialize a GoCardless client
 * @param token - API token
 * @param environment - Live or Sandbox environment
 * @param options - Additional API options
 */
export default function gocardless(
  token: string,
  environment = Environments.Live,
  options: APIOptions = {},
): GoCardlessClient {
  return new GoCardlessClient(token, environment, options);
}

// Named export for destructuring
export { gocardless };

// Re-export main exports for convenience
export { GoCardlessClient } from './client.js';
export { Environments, CLIENT_VERSION, API_VERSION } from './constants.js';
export { parse, verifySignature, InvalidSignatureError } from './webhooks.js';
export type { APIOptions } from './api/api.js';
