/*
  Image Processing API Routes
*/

// Imports
import express from 'express';
import { resize } from '../Controllers/imagesC';

const router = express.Router();

// Resize Image Routing
router.route('/resize').get(resize);

export { router };
