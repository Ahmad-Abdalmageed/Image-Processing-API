/*

  Image Processing API Controllers

*/
// Imports
import { NextFunction, Request, Response } from 'express';
import path from 'path';
import sharp from 'sharp';
import { asyncWrapper } from '../Middlewares/asyncWrap';
import qs from 'qs';

// Constants
const fullDir = '../../assets/full/';
const thumbsDir = '../../assets/thumbs/';

function maskVar(
  inVar: string | string[] | qs.ParsedQs | undefined | qs.ParsedQs[]
): number | undefined {
  return typeof inVar == 'undefined' ? undefined : parseInt(<string>inVar);
}

// Resizing Functionality
const processImage = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    //  Extract Filename, width and Height from Query
    const { filename, width, height, rotate, blur, format } = req.query;
    const imageW = maskVar(width);
    const imageH = maskVar(height);
    const angle = maskVar(rotate);
    const sigma = maskVar(blur);
    const outFormat =
      typeof format == 'undefined'
        ? undefined
        : <sharp.AvailableFormatInfo>(<unknown>format);
    // Filename is undefined
    if (!filename) return next(Error('Please Provide a Filename'));

    const imageType = (<string>filename).split('.')[1];

    const newFileName = `${(<string>filename).split('.')[0]}_${
      typeof width === 'undefined' ? '' : width
    }x${typeof height === 'undefined' ? '' : height}_${
      angle == undefined ? '' : 'rot'
    }_${sigma == undefined ? '' : 'blur'}.${outFormat ? outFormat : imageType}`;

    //Create a Sharp Object Instance
    const pipeline = await sharp(
      path.join(__dirname, fullDir, <string>filename)
    );

    //Start the Processing Pipeline
    pipeline.resize(imageW, imageH);
    if (angle) pipeline.rotate(angle);
    if (sigma) pipeline.blur(sigma);
    if (outFormat) pipeline.toFormat(outFormat);

    await pipeline.toFile(path.join(__dirname, thumbsDir, newFileName));
    res.sendFile(path.join(__dirname, thumbsDir, newFileName));
  }
);
export { processImage };
