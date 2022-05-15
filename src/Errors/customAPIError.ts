class CustomAPIError {
  msg: string;
  statusCode: number;
  constructor(message: string, statusCode: number) {
    this.statusCode = statusCode;
    this.msg = message;
  }
}

const createCustomAPIError = (
  msg: string,
  statusCode: number
): CustomAPIError => {
  return new CustomAPIError(msg, statusCode);
};

export { createCustomAPIError, CustomAPIError };
