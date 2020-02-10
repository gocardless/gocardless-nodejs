'use strict';

function GoCardlessException(response) {
  const { body: { error } } = response;
  const {
    message,
    errors,
    documentation_url: documentationUrl,
    type,
    request_id: requestId,
    code,
  } = error;

  this.message = message;
  this.errors = errors;
  this.documentationUrl = documentationUrl;
  this.type = type;
  this.requestId = requestId;
  this.code = code;
}

module.exports = GoCardlessException;
