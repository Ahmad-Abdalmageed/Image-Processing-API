class CustomAPIError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createCustomAPIError = (msg: string, code: number) => {
  return new CustomAPIError(msg, code);
};

export { createCustomAPIError, CustomAPIError };
