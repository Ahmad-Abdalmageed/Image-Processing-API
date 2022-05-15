/*
  Utilities Functionality File
*/

import path from 'path';
import sharp, { AvailableFormatInfo } from 'sharp';
import fs from 'fs';

// Constants
const fullDir = '../../assets/full/';
const thumbsDir = '../../assets/thumbs/';

// Check Folders Sanity
if (!fs.existsSync(path.join(__dirname, thumbsDir))) {
  fs.mkdir(path.join(__dirname, thumbsDir), (err) => {
    if (err) return console.log(err);
    console.log('Thumbs Dir Created');
  });
}

const pipeline = async (
  imgName: string,
  imgW: undefined | number,
  imgH: undefined | number,
  angle: undefined | number,
  sigma: undefined | number,
  format: undefined | AvailableFormatInfo = undefined
): Promise<string> => {
  // Extract Image Format
  const imgFormat = imgName.split('.')[1];

  // Define the New Processed Image Name
  const newImgName = `${imgName.split('.')[0]}_${
    typeof imgW == 'undefined' ? '' : imgW
  }x${typeof imgH === 'undefined' ? '' : imgH}_${
    angle == undefined ? '' : angle
  }_${sigma == undefined ? '' : sigma}.${format ? '' : imgFormat}`;

  // If Image Already Exists
  if (fs.existsSync(path.join(__dirname, thumbsDir, newImgName)))
    return newImgName;

  //Create a Sharp Object Instance
  const pipeline = await sharp(path.join(__dirname, fullDir, imgName));

  //Start the Processing Pipeline
  pipeline.resize(imgW, imgH);
  if (angle) pipeline.rotate(angle);
  if (sigma) pipeline.blur(sigma);
  if (format) pipeline.toFormat(format);

  await pipeline.toFile(path.join(__dirname, thumbsDir, newImgName));
  return newImgName;
};

export { pipeline, fullDir, thumbsDir };
