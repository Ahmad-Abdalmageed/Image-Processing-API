"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMW = void 0;
var customAPIError_1 = require("../Errors/customAPIError");
function errorHandlerMW(err, req, res, next) {
    // Check if Error is a CustomAPIError
    if (err instanceof customAPIError_1.CustomAPIError) {
        res.status(err.statusCode).send(err.msg);
        next();
    }
    else {
        // Other Server Errors that might be unhandled
        res.status(500).send(err.message);
        next();
    }
}
exports.errorHandlerMW = errorHandlerMW;
