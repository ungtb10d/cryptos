class ErrorResponse extends Error {
  constructor(message, statusCode, target) {
    super(message);
    this.statusCode = statusCode;
    this.target = target;
  }
}

module.exports = ErrorResponse;
