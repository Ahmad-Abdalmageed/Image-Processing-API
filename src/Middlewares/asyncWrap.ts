/*
  Async Wrapper Functionality for Better Code Readability
*/

import { NextFunction, Request, Response } from 'express';

const asyncWrapper = (callback: CallableFunction) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Execute the Passed Callback
      await callback(req, res, next);
    } catch (error) {
      //Catch errors if any
      next(error);
    }
  };
};

export { asyncWrapper };
