'use strict';

class GoCardlessException extends Error {}

class MalformedResponseError extends GoCardlessException {
  response: object;
  requestId: string;

  constructor(message, response) {
    super(message);

    this.response = response;
    this.requestId = response.headers['x-request-id'];
  }
}

interface ErrorObject {
  message?: string;
  reason?: string;
  field?: string;
  links?: object;
  metadata?: object;
  request_pointer?: string;
}

class ApiError extends GoCardlessException {
  message: string;
  errors: ErrorObject[];
  documentationUrl: string;
  errorType: string;
  requestId: string;
  code: string;
  response: object;

  constructor(response) {
    const {
      body: { error },
    } = response;
    const {
      message,
      errors,
      documentation_url: documentationUrl,
      type,
      request_id: requestId,
      code,
    } = error;

    super(message);

    this.response = response;
    this.message = message;
    this.errors = errors;
    this.documentationUrl = documentationUrl;
    this.errorType = type;
    this.requestId = requestId;
    this.code = code;
  }

  static buildFromResponse(response) {
    try {
      const {
        statusCode,
        body: {
          error: { type, errors },
        },
      } = response;

      // These statuses are for unique errors
      switch (statusCode) {
        case 401:
          return new AuthenticationError(response);
        case 403:
          return new PermissionsError(response);
        case 429:
          return new RateLimitError(response);
        default:
        //noop
      }

      // Whereas these errors have different meanings over the same codes
      switch (type) {
        case 'validation_failed':
          return new ValidationFailedError(response);
        case 'invalid_api_usage':
          return new InvalidApiUsageError(response);
        case 'invalid_state':
          for (const e of errors) {
            if (e.reason === 'idempotent_creation_conflict') {
              if (e.links && e.links.conflicting_resource_id) {
                return new IdempotentCreationConflictError(
                  response,
                  e.links.conflicting_resource_id
                );
              }

              return new MalformedResponseError(
                'Idempotent Creation Conflict Error missing conflicting_resource_id',
                response
              );
            }
          }

          return new InvalidStateError(response);
        case 'gocardless':
          return new GoCardlessInternalError(response);
        default:
          return new ApiError(response);
      }
    } catch (err) {
      const failureResponse = {
        statusCode: 500,
        body: {
          error: {
            message: response.body,
            errors: [
              {
                reason: 'internal_server_error',
                message: response.body,
              },
            ],
            documentation_url:
              'https://developer.gocardless.com/api-reference#internal_server_error',
            type: 'gocardless',
            request_id: response?.headers?.['x-request-id'] ?? null,
            code: 500,
          },
        },
      };

      return new GoCardlessInternalError(failureResponse);
    }
  }

  toString() {
    const messages = (this.errors || [])
      .filter(e => e.message !== this.message)
      .map(e => e.message);

    if (messages.length > 0) {
      return `${this.message} (${messages.join(', ')})`;
    }

    return this.message;
  }
}

class IdempotentCreationConflictError extends ApiError {
  conflictingResourceId: string;

  constructor(response, conflictingResourceId) {
    super(response);
    this.conflictingResourceId = conflictingResourceId;
  }
}

class ValidationFailedError extends ApiError {
  toString() {
    const messages = (this.errors || [])
      .filter(e => e.field)
      .map(e => `${e.field} ${e.message}`);

    if (messages.length > 0) {
      return `${this.message} (${messages.join(', ')})`;
    }

    return this.message;
  }
}

class InvalidApiUsageError extends ApiError {}
class InvalidStateError extends ApiError {}
class GoCardlessInternalError extends ApiError {}
class AuthenticationError extends ApiError {}
class PermissionsError extends ApiError {}
class RateLimitError extends ApiError {}

export {
  GoCardlessException,
  MalformedResponseError,
  ApiError,
  IdempotentCreationConflictError,
  ValidationFailedError,
  InvalidApiUsageError,
  InvalidStateError,
  GoCardlessInternalError,
  AuthenticationError,
  PermissionsError,
  RateLimitError,
};
