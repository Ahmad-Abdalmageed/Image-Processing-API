"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.infoLoggerMW = void 0;
var winston_1 = require("winston");
var myFormat = winston_1.format.printf(function (_a) {
    var timestamp = _a.timestamp, level = _a.level, message = _a.message;
    return "".concat(timestamp, " ::: ").concat(level, " ::: ").concat(message, "}");
});
var customLogger = (0, winston_1.createLogger)({
    level: 'info',
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.splat(), myFormat),
    defaultMeta: { service: 'Image-Processing-API' },
    transports: [
        new winston_1.transports.File({ filename: 'logs/api-logs.log' }),
        new winston_1.transports.File({ filename: 'logs/api-errors.log', level: 'error' }),
        new winston_1.transports.Console()
    ]
});
var infoLoggerMW = function (req, res, next) {
    customLogger.info("".concat(JSON.stringify(req.query)));
    next();
};
exports.infoLoggerMW = infoLoggerMW;
