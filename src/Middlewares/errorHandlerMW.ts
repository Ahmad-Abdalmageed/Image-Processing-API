import { NextFunction, Request, Response } from 'express';
import { CustomAPIError } from '../Errors/customAPIError';

function errorHandlerMW(
  err: CustomAPIError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Check if Error is a CustomAPIError
  if (err instanceof CustomAPIError) {
    res.status(err.statusCode).send(err.msg);
    next();
  } else {
    // Other Server Errors that might be unhandled
    res.status(500).send(err.message);
    next();
  }
}

export { errorHandlerMW };
