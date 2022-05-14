"use strict";
/*
  Image Processing API Entry Point
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
var express_1 = __importDefault(require("express"));
var images_1 = require("./Routes/images");
var logger_1 = require("./Middlewares/logger");
// Constants and Requires
var app = (0, express_1.default)();
var PORT = 3000;
// Routes & Middlewares
app.use(logger_1.infoLoggerMW);
app.use('/api/v1/images', images_1.router);
// Server
var startServer = function (PORT) {
    try {
        app.listen(PORT, function () {
            console.log("Server Started on PORT ".concat(PORT));
        });
    }
    catch (err) {
        console.log(err);
    }
};
startServer(PORT);
