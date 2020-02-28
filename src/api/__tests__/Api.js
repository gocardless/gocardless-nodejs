jest.mock('os', () => {
  return {
    platform: () => 'darwin/18.7.0',
    release: () => '18.7.0',
  };
});

jest.mock('process', () => {
  return {
    version: 'v12.14.1',
  };
});

jest.mock('uuid/v4', () => {
  return jest.fn(() => 'uuid/v4');
});

jest.mock('got', () => {
  return jest.fn(p1 => p1);
});

const Api = require('../Api');
const Constants = require('../../Constants');

describe('api', () => {
  describe('createRequestOptions', () => {
    const token = 'my-token';
    const api = new Api(token);

    test('a proxy can be configured', () => {
      const proxy = jest.fn();
      const api = new Api(token, Constants.Environments.LIVE, { proxy });

      const requestOptions = api.createRequestOptions({});

      const agent = requestOptions.agent;

      expect(proxy).toBe(agent);
    });

    describe('prefix url', () => {
      test('the live url is used by default', () => {
        const requestOptions = api.createRequestOptions({});

        const prefixUrl = requestOptions.prefixUrl;

        expect(prefixUrl).toBe('https://api.gocardless.com');
      });

      test('the sandbox url can be used', () => {
        const api = new Api(token, Constants.Environments.SANDBOX);

        const requestOptions = api.createRequestOptions({});

        const prefixUrl = requestOptions.prefixUrl;

        expect(prefixUrl).toBe('https://api-sandbox.gocardless.com');
      });
    });

    test('the HTTP method is set', () => {
      const requestOptions = api.createRequestOptions({ method: 'POST' });

      const method = requestOptions.method;

      expect(method).toBe('POST');
    });

    test('the response type is json', () => {
      const requestOptions = api.createRequestOptions({});

      const responseType = requestOptions.responseType;

      expect(responseType).toBe('json');
    });

    test('the correct headers are applied to the request', () => {
      const requestOptions = api.createRequestOptions({});

      const headers = requestOptions.headers;

      expect(headers['Accept']).toBe('application/json');
      expect(headers['Authorization']).toBe(`Bearer ${token}`);
      expect(headers['GoCardless-Client-Library']).toBe('gocardless-nodejs');
      expect(headers['GoCardless-Client-Version']).toBe('0.2.1');
      expect(headers['GoCardless-Version']).toBe('2015-07-06');
      expect(headers['User-Agent']).toBe(
        'gocardless-nodejs/0.2.1 node/v12.14.1 darwin/18.7.0/18.7.0'
      );
    });

    describe('searchParams', () => {
      test('is set with a GET request', () => {
        const options = {
          requestParameters: {
            one: 1,
          },
        };

        const requestOptions = api.createRequestOptions(options);

        const searchParams = requestOptions.searchParams;

        expect(searchParams.toString()).toBe('one=1');
      });

      test('is not set when not a GET request', () => {
        const options = {
          method: 'POST',
          requestParameters: {
            one: 1,
          },
        };

        const requestOptions = api.createRequestOptions(options);

        const searchParams = requestOptions.searchParams;

        expect(searchParams).toBeUndefined();
      });
    });

    describe('idemptency key', () => {
      test('it is not set when it is a GET request', () => {
        const requestOptions = api.createRequestOptions({});

        const headers = requestOptions.headers;

        expect(headers['Idempotency-Key']).toBeUndefined();
      });

      test('it is not overriden when set', () => {
        const options = {
          method: 'POST',
          headers: {
            'Idempotency-Key': 'custom',
          },
        };

        const requestOptions = api.createRequestOptions(options);

        const headers = requestOptions.headers;

        expect(headers['Idempotency-Key']).toBe('custom');
      });

      test('it is genrated when not set', () => {
        const options = {
          method: 'POST',
        };

        const requestOptions = api.createRequestOptions(options);

        const headers = requestOptions.headers;

        expect(headers['Idempotency-Key']).toBe('uuid/v4');
      });
    });

    describe('json', () => {
      test('is not set when a GET request', () => {
        const options = {
          requestParameters: {
            one: 1,
          },
        };

        const requestOptions = api.createRequestOptions(options);

        const json = requestOptions.json;

        expect(json).toBeUndefined();
      });

      test('is set when not a GET request', () => {
        const options = {
          method: 'POST',
          requestParameters: {
            one: 1,
          },
        };

        const requestOptions = api.createRequestOptions(options);

        const json = requestOptions.json;

        expect(JSON.stringify(json)).toBe(
          JSON.stringify(options.requestParameters)
        );
      });
    });
  });
});
