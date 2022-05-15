"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomAPIError = exports.createCustomAPIError = void 0;
var CustomAPIError = /** @class */ (function () {
    function CustomAPIError(message, statusCode) {
        this.statusCode = statusCode;
        this.msg = message;
    }
    return CustomAPIError;
}());
exports.CustomAPIError = CustomAPIError;
var createCustomAPIError = function (msg, statusCode) {
    return new CustomAPIError(msg, statusCode);
};
exports.createCustomAPIError = createCustomAPIError;
