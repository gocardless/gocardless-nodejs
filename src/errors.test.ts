const {
  ApiError,
  AuthenticationError,
  GoCardlessException,
  GoCardlessInternalError,
  MalformedResponseError,
} = require('./errors');

describe('MalformedResponseError', () => {
  test('includes status code and body preview in message', () => {
    const response = {
      statusCode: 502,
      headers: { 'x-request-id': 'REQ789' },
      body: '<html>502 Bad Gateway</html>',
    };

    const err = new MalformedResponseError('Malformed JSON received from GoCardless API', response);

    expect(err.statusCode).toBe(502);
    expect(err.requestId).toBe('REQ789');
    expect(err.message).toContain('HTTP 502');
    expect(err.message).toContain('502 Bad Gateway');
  });

  test('truncates long bodies to 500 chars', () => {
    const body = 'x'.repeat(800);
    const err = new MalformedResponseError('Malformed', {
      statusCode: 500,
      headers: {},
      body,
    });

    expect(err.message).toContain('x'.repeat(500) + '...');
    expect(err.message).not.toContain('x'.repeat(501));
  });

  test('handles missing headers and status code', () => {
    const err = new MalformedResponseError('Malformed', {});

    expect(err.statusCode).toBeNull();
    expect(err.requestId).toBeNull();
    expect(err.message).toBe('Malformed');
  });
});

describe('ApiError.buildFromResponse', () => {
  test('handles string error in response body', () => {
    const response = {
      statusCode: 400,
      headers: { 'x-request-id': 'REQ123' },
      body: {
        error: 'bank_authorisation_expired',
      },
    };

    const err = ApiError.buildFromResponse(response);

    expect(err).toBeInstanceOf(GoCardlessInternalError);
    expect(err.message).toBe('bank_authorisation_expired');
    expect(err.errors).toEqual([]);
    expect(err.errorType).toBe('gocardless');
    expect(err.code).toBe(400);
    expect(err.requestId).toBe('REQ123');
  });

  test('handles string error without request id header', () => {
    const response = {
      statusCode: 502,
      headers: {},
      body: {
        error: 'bad gateway',
      },
    };

    const err = ApiError.buildFromResponse(response);

    expect(err).toBeInstanceOf(GoCardlessInternalError);
    expect(err.message).toBe('bad gateway');
    expect(err.requestId).toBeNull();
  });

  test('handles object error as before', () => {
    const response = {
      statusCode: 422,
      headers: { 'x-request-id': 'REQ456' },
      body: {
        error: {
          message: 'Validation failed',
          errors: [{ field: 'amount', message: 'is too large' }],
          documentation_url: 'https://developer.gocardless.com/api-reference',
          type: 'validation_failed',
          request_id: 'REQ456',
          code: 422,
        },
      },
    };

    const err = ApiError.buildFromResponse(response);

    expect(err.message).toBe('Validation failed');
    expect(err.errorType).toBe('validation_failed');
    expect(err.code).toBe(422);
  });

  test('exposes status code and headers', () => {
    const response = {
      statusCode: 429,
      headers: { 'x-request-id': 'REQ999', 'ratelimit-reset': 'Tue, 13 Oct 2026 10:00:00 GMT' },
      body: {
        error: {
          message: 'Rate limit exceeded',
          errors: [],
          type: 'invalid_api_usage',
          request_id: 'REQ999',
          code: 429,
        },
      },
    };

    const err = ApiError.buildFromResponse(response);

    expect(err.statusCode).toBe(429);
    expect(err.headers).toEqual(response.headers);
  });

  test('exposes status code and headers when error body is a string', () => {
    const response = {
      statusCode: 400,
      headers: { 'x-request-id': 'REQ123' },
      body: { error: 'bank_authorisation_expired' },
    };

    const err = ApiError.buildFromResponse(response);

    expect(err.statusCode).toBe(400);
    expect(err.headers).toEqual({ 'x-request-id': 'REQ123' });
  });
});

describe('error names', () => {
  const apiResponse = (statusCode: number) => ({
    statusCode,
    headers: {},
    body: {
      error: { message: 'Nope', errors: [], type: 'invalid_api_usage', code: statusCode },
    },
  });

  test('subclasses are named after their class', () => {
    expect(new GoCardlessException('x').name).toBe('GoCardlessException');
    expect(new MalformedResponseError('x', {}).name).toBe('MalformedResponseError');
    expect(ApiError.buildFromResponse(apiResponse(401)).name).toBe('AuthenticationError');
    expect(ApiError.buildFromResponse(apiResponse(400)).name).toBe('InvalidApiUsageError');
    expect(new AuthenticationError(apiResponse(401)).name).toBe('AuthenticationError');
  });

  test('stack trace starts with the class name and message', () => {
    const err = ApiError.buildFromResponse(apiResponse(401));

    expect(err.stack).toMatch(/^AuthenticationError: Nope\n/);
  });
});
