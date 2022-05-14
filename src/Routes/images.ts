/*
  Image Processing API Routes
*/

// Imports
import express from 'express';
import { processImage } from '../Controllers/imagesC';

const router = express.Router();

// Resize Image Routing
router.route('/').get(processImage);

export { router };
