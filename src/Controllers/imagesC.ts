/*

  Image Processing API Controllers

*/

// Resizing Functionality
import { NextFunction, Request, Response } from 'express';

const resize = (req: Request, res: Response, next: NextFunction) => {
  //  Extract Filename, width and Height from Query
  const { filename, height, width } = req.query;
};

export { resize };
