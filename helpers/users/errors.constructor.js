exports.UnauthorizedError = class UnauthorizedError extends (
  Error
) {
  constructor(message) {
    super(message);

    this.status = 401;
    this.stack = '';
    this.json = {
      message: this.message,
    };
  }
};
