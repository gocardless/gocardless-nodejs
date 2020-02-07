
function GoCardlessException(response) {
  const { body: { error } } = response;
  const {
    message,
    errors,
    documentaton_url: documentatonUrl,
    type,
    request_id: requestId,
    code,
  } = error;

  this.message = message;
  this.errors = errors;
  this.documentatonUrl = documentatonUrl;
  this.type = type;
  this.requestId = requestId;
  this.code = code;
}

module.exports = GoCardlessException;
