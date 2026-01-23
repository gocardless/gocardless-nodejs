"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimitError = exports.PermissionsError = exports.AuthenticationError = exports.GoCardlessInternalError = exports.InvalidStateError = exports.InvalidApiUsageError = exports.ValidationFailedError = exports.IdempotentCreationConflictError = exports.ApiError = exports.MalformedResponseError = exports.GoCardlessException = void 0;
class GoCardlessException extends Error {
}
exports.GoCardlessException = GoCardlessException;
class MalformedResponseError extends GoCardlessException {
    constructor(message, response) {
        super(message);
        this.response = response;
        this.requestId = response.headers['x-request-id'];
    }
}
exports.MalformedResponseError = MalformedResponseError;
class ApiError extends GoCardlessException {
    constructor(response) {
        const { body: { error }, } = response;
        const { message, errors, documentation_url: documentationUrl, type, request_id: requestId, code } = error;
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
        var _a, _b;
        try {
            const { statusCode, body: { error: { type, errors }, }, } = response;
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
                                return new IdempotentCreationConflictError(response, e.links.conflicting_resource_id);
                            }
                            return new MalformedResponseError('Idempotent Creation Conflict Error missing conflicting_resource_id', response);
                        }
                    }
                    return new InvalidStateError(response);
                case 'gocardless':
                    return new GoCardlessInternalError(response);
                default:
                    return new ApiError(response);
            }
        }
        catch (err) {
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
                        documentation_url: 'https://developer.gocardless.com/api-reference#internal_server_error',
                        type: 'gocardless',
                        request_id: (_b = (_a = response === null || response === void 0 ? void 0 : response.headers) === null || _a === void 0 ? void 0 : _a['x-request-id']) !== null && _b !== void 0 ? _b : null,
                        code: 500,
                    },
                },
            };
            return new GoCardlessInternalError(failureResponse);
        }
    }
    toString() {
        const messages = (this.errors || []).filter((e) => e.message !== this.message).map((e) => e.message);
        if (messages.length > 0) {
            return `${this.message} (${messages.join(', ')})`;
        }
        return this.message;
    }
}
exports.ApiError = ApiError;
class IdempotentCreationConflictError extends ApiError {
    constructor(response, conflictingResourceId) {
        super(response);
        this.conflictingResourceId = conflictingResourceId;
    }
}
exports.IdempotentCreationConflictError = IdempotentCreationConflictError;
class ValidationFailedError extends ApiError {
    toString() {
        const messages = (this.errors || []).filter((e) => e.field).map((e) => `${e.field} ${e.message}`);
        if (messages.length > 0) {
            return `${this.message} (${messages.join(', ')})`;
        }
        return this.message;
    }
}
exports.ValidationFailedError = ValidationFailedError;
class InvalidApiUsageError extends ApiError {
}
exports.InvalidApiUsageError = InvalidApiUsageError;
class InvalidStateError extends ApiError {
}
exports.InvalidStateError = InvalidStateError;
class GoCardlessInternalError extends ApiError {
}
exports.GoCardlessInternalError = GoCardlessInternalError;
class AuthenticationError extends ApiError {
}
exports.AuthenticationError = AuthenticationError;
class PermissionsError extends ApiError {
}
exports.PermissionsError = PermissionsError;
class RateLimitError extends ApiError {
}
exports.RateLimitError = RateLimitError;
//# sourceMappingURL=errors.js.map