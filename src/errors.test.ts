const { ApiError, GoCardlessInternalError } = require('./errors');

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
});
