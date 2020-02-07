jest.mock('os', () => {
  return {
    platform: () => 'darwin/18.7.0',
    release: () => '18.7.0'
  };
});

jest.mock('process', () => {
  return {
    version: 'v12.14.1',
  };
});

jest.mock('got', () => {
  return jest.fn((p1) => p1);
});

const Api = require('../Api');
const Constants = require('../../Constants');

describe('api', () => {
  describe('the request', () => {
    const token = 'my-token';
    const api = new Api(token);

    test('a proxy can be configured', async () => {
      const proxy = jest.fn();
      const api = new Api(token, Constants.Environments.LIVE, { proxy });

      const response = await api.request({ path: 'test' });

      const agent = response.request.agent;

      expect(proxy).toBe(agent);
    });

    describe('prefix url', () => {
      test('the live url is used by default', async () => {
        const response = await api.request({ path: 'test' });

        const prefixUrl = response.request.prefixUrl;

        expect(prefixUrl).toBe('https://api.gocardless.com');
      });

      test('the sandbox url can be used', async () => {
        const api = new Api(token, Constants.Environments.SANDBOX);

        const response = await api.request({ path: 'test' });

        const prefixUrl = response.request.prefixUrl;

        expect(prefixUrl).toBe('https://api-sandbox.gocardless.com');
      });
    });

    test('the HTTP method is set', async () => {
      const api = new Api(token);

      const response = await api.request({ path: 'test', method: 'POST' });

      const method = response.request.method;

      expect(method).toBe('POST');
    });

    test('the response type is json', async () => {
      const api = new Api(token);

      const response = await api.request({ path: 'test' });

      const responseType = response.request.responseType;

      expect(responseType).toBe('json');
    });

    test('the correct headers are applied to the request', async () => {
      const response = await api.request({ path: 'test' });

      const headers = response.request.headers;

      expect(headers['Accept']).toBe('application/json');
      expect(headers['Authorization']).toBe(`Bearer ${token}`);
      expect(headers['GoCardless-Client-Library']).toBe('gocardless-nodejs');
      expect(headers['GoCardless-Client-Version']).toBe('0.1.0');
      expect(headers['GoCardless-Version']).toBe('2015-07-06');
      expect(headers['User-Agent']).toBe('gocardless-nodejs/0.1.0 node/v12.14.1 darwin/18.7.0/18.7.0');
    });

    describe('searchParams', () => {
      test('is set with a GET request', async () => {
        const api = new Api(token);

        const request = {
          path: 'test',
          requestParameters: {
            one: 1,
          },
        };

        const response = await api.request(request);

        const searchParams = response.request.searchParams;

        expect(searchParams.toString()).toBe('one=1');
      });

      test('is not set when not a GET request', async () => {
        const api = new Api(token);

        const request = {
          path: 'test',
          method: 'POST',
          requestParameters: {
            one: 1,
          },
        };

        const response = await api.request(request);

        const searchParams = response.request.searchParams;

        expect(searchParams).toBeUndefined();
      });
    });

    describe('json', () => {
      test('is not set when a GET request', async () => {
        const api = new Api(token);

        const request = {
          path: 'test',
          requestParameters: {
            one: 1,
          },
        };

        const response = await api.request(request);

        const json = response.request.json;

        expect(json).toBeUndefined();
      });

      test('is set when not a GET request', async () => {
        const api = new Api(token);

        const request = {
          path: 'test',
          method: 'POST',
          requestParameters: {
            one: 1,
          },
        };

        const response = await api.request(request);

        const json = response.request.json;

        expect(JSON.stringify(json)).toBe(JSON.stringify({
          one: 1,
        }));
      });
    });
  });
});