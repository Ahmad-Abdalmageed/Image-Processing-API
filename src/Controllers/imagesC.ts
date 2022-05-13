/*

  Image Processing API Controllers

*/
// Imports
import { NextFunction, Request, Response } from 'express';
import path from 'path';
import sharp from 'sharp';
import { asyncWrapper } from '../Middlewares/asyncWrap';

// Constants
const fullDir = '../../assets/full/';
const thumbsDir = '../../assets/thumbs/';

// Resizing Functionality
const resize = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    //  Extract Filename, width and Height from Query
    const { filename, width, height } = req.query;
    const imageW =
      typeof width == 'undefined' ? undefined : parseInt(<string>width);
    const imageH =
      typeof height == 'undefined' ? undefined : parseInt(<string>height);

    // Filename is undefined
    if (!filename) return next(Error('Please Provide a Filename'));

    const imageType = (<string>filename).split('.')[1];
    const newFileName = `${(<string>filename).split('.')[0]}_${
      typeof width === 'undefined' ? '' : width
    }_${typeof height === 'undefined' ? '' : height}.${imageType}`;

    await sharp(path.join(__dirname, fullDir, <string>filename))
      .resize(imageW, imageH)
      .toFile(path.join(__dirname, thumbsDir, newFileName));

    res.sendFile(path.join(__dirname, thumbsDir, newFileName));
  }
);
export { resize };
