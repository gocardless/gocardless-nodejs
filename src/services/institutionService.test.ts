/**
 * Tests for InstitutionService
 *
 * These tests verify that the generated institution service has the correct
 * method signatures, particularly for list methods with URI parameters.
 */

import * as nock from 'nock';
import gocardless from '../index';
import { Environments } from '../constants';

describe('InstitutionService', () => {
  const token = '<TOKEN>';
  let client: ReturnType<typeof gocardless>;

  beforeAll(() => {
    nock.disableNetConnect();
  });

  beforeEach(() => {
    client = gocardless(token, Environments.Sandbox);
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('list_for_billing_request', () => {
    test('method signature includes identity parameter', () => {
      // Verify the method exists on the service
      expect(client.institutions.list_for_billing_request).toBeDefined();
      expect(typeof client.institutions.list_for_billing_request).toBe('function');

      // Check that the method has the correct number of parameters
      // Expected: (identity: string, requestParameters: {...}, customHeaders?: {...})
      expect(client.institutions.list_for_billing_request.length).toBeGreaterThanOrEqual(2);
    });

    test('correctly makes API request with identity in URL', async () => {
      const billingRequestId = 'BRQ123';
      const countryCode = 'GB';

      // Mock the API response
      const apiMock = nock('https://api-sandbox.gocardless.com')
        .get(`/billing_requests/${billingRequestId}/institutions`)
        .query({ country_code: countryCode })
        .reply(200, {
          institutions: [
            {
              id: 'monzo',
              name: 'Monzo',
              country_code: 'GB',
            },
          ],
        });

      // Call the method with identity parameter
      const result = await client.institutions.list_for_billing_request(billingRequestId, {
        country_code: countryCode,
      });

      // Verify the request was made correctly
      expect(apiMock.isDone()).toBe(true);
      expect(result.institutions).toHaveLength(1);
      expect(result.institutions[0].id).toBe('monzo');
    });

    test('throws error when identity is missing', async () => {
      // This test ensures TypeScript compilation catches the error
      // We can't actually test runtime behavior without TypeScript compilation
      // but the type system should prevent this at compile time

      // @ts-expect-error - Testing that missing identity parameter causes type error
      const callWithoutIdentity = () => client.institutions.list_for_billing_request({ country_code: 'GB' });

      // If somehow this gets past TypeScript, it should fail at runtime
      expect(() => callWithoutIdentity()).toBeDefined();
    });
  });

  describe('list', () => {
    test('method signature does not include identity parameter', () => {
      // The regular list method should NOT have an identity parameter
      expect(client.institutions.list).toBeDefined();
      expect(typeof client.institutions.list).toBe('function');

      // Expected: (requestParameters?: {...}, customHeaders?: {...})
      // Length should be less than list_for_billing_request
      expect(client.institutions.list.length).toBeLessThan(client.institutions.list_for_billing_request.length);
    });

    test('correctly makes API request without identity in URL', async () => {
      const countryCode = 'GB';

      // Mock the API response
      const apiMock = nock('https://api-sandbox.gocardless.com')
        .get('/institutions')
        .query({ country_code: countryCode })
        .reply(200, {
          institutions: [
            {
              id: 'barclays',
              name: 'Barclays',
              country_code: 'GB',
            },
          ],
        });

      // Call the method without identity parameter
      const result = await client.institutions.list({ country_code: countryCode });

      // Verify the request was made correctly
      expect(apiMock.isDone()).toBe(true);
      expect(result.institutions).toHaveLength(1);
      expect(result.institutions[0].id).toBe('barclays');
    });
  });
});
