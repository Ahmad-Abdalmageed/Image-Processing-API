"use strict";
/*
  Image Processing API Entry Point
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
// Imports
var express_1 = __importDefault(require("express"));
var images_1 = require("./Routes/images");
var logger_1 = require("./Middlewares/logger");
var notFound_1 = require("./Middlewares/notFound");
var errorHandlerMW_1 = require("./Middlewares/errorHandlerMW");
// Constants and Requires
var app = (0, express_1.default)();
exports.app = app;
var PORT = 3000;
// Routes & Middlewares
app.use(logger_1.infoLoggerMW);
app.use('/api/v1/images', images_1.router);
app.use(notFound_1.notFound);
app.use(errorHandlerMW_1.errorHandlerMW);
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
