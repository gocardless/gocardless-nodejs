declare class GoCardlessException extends Error {
}
declare class MalformedResponseError extends GoCardlessException {
    response: object;
    requestId: string;
    constructor(message: any, response: any);
}
interface ErrorObject {
    message?: string;
    reason?: string;
    field?: string;
    links?: object;
    metadata?: object;
    request_pointer?: string;
}
declare class ApiError extends GoCardlessException {
    message: string;
    errors: Array<ErrorObject>;
    documentationUrl: string;
    errorType: string;
    requestId: string;
    code: string;
    response: object;
    constructor(response: any);
    static buildFromResponse(response: any): MalformedResponseError | ApiError;
    toString(): string;
}
declare class IdempotentCreationConflictError extends ApiError {
    conflictingResourceId: string;
    constructor(response: any, conflictingResourceId: any);
}
declare class ValidationFailedError extends ApiError {
    toString(): string;
}
declare class InvalidApiUsageError extends ApiError {
}
declare class InvalidStateError extends ApiError {
}
declare class GoCardlessInternalError extends ApiError {
}
declare class AuthenticationError extends ApiError {
}
declare class PermissionsError extends ApiError {
}
declare class RateLimitError extends ApiError {
}
export { GoCardlessException, MalformedResponseError, ApiError, IdempotentCreationConflictError, ValidationFailedError, InvalidApiUsageError, InvalidStateError, GoCardlessInternalError, AuthenticationError, PermissionsError, RateLimitError, };
//# sourceMappingURL=errors.d.ts.map