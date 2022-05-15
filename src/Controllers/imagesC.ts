/*

  Image Processing API Controllers

*/
// Imports
import { NextFunction, Request, Response } from 'express';
import path from 'path';
import { AvailableFormatInfo } from 'sharp';
import { asyncWrapper } from '../Middlewares/asyncWrap';
import qs from 'qs';
import { pipeline, thumbsDir, fullDir } from './utils';
import { createCustomAPIError } from '../Errors/customAPIError';
import fs from 'fs';

// Functions
function maskQParam(
  inVar: string | string[] | qs.ParsedQs | undefined | qs.ParsedQs[]
): number | undefined {
  return typeof inVar == 'undefined' ? undefined : parseInt(<string>inVar);
}

// Resizing Functionality
const processImage = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    //  Extract Filename, width and Height from Query
    const { filename, width, height, rotate, blur, format } = req.query;
    const imageW = maskQParam(width);
    const imageH = maskQParam(height);
    const angle = maskQParam(rotate);
    const sigma = maskQParam(blur);
    const outFormat =
      typeof format == 'undefined'
        ? undefined
        : <AvailableFormatInfo>(<unknown>format);
    // Filename is undefined
    if (!filename)
      return next(
        createCustomAPIError('Image Filename was not Specified', 404)
      );

    // Path Passed in not Correct
    if (!fs.existsSync(path.join(__dirname, fullDir, <string>filename)))
      return next(
        createCustomAPIError('Wrong Image Filename or Does not Exist', 404)
      );

    const newImgName = await pipeline(
      <string>filename,
      imageW,
      imageH,
      angle,
      sigma,
      outFormat
    );
    res.sendFile(path.join(__dirname, thumbsDir, newImgName));
  }
);
export { processImage };
