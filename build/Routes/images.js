"use strict";
/*
  Image Processing API Routes
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
// Imports
var express_1 = __importDefault(require("express"));
var imagesC_1 = require("../Controllers/imagesC");
var router = express_1.default.Router();
exports.router = router;
// Resize Image Routing
router.route('/').get(imagesC_1.processImage);
