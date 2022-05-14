"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processImage = void 0;
var path_1 = __importDefault(require("path"));
var sharp_1 = __importDefault(require("sharp"));
var asyncWrap_1 = require("../Middlewares/asyncWrap");
// Constants
var fullDir = '../../assets/full/';
var thumbsDir = '../../assets/thumbs/';
function maskVar(inVar) {
    return typeof inVar == 'undefined' ? undefined : parseInt(inVar);
}
// Resizing Functionality
var processImage = (0, asyncWrap_1.asyncWrapper)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, filename, width, height, rotate, blur, format, imageW, imageH, angle, sigma, outFormat, imageType, newFileName, pipeline;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.query, filename = _a.filename, width = _a.width, height = _a.height, rotate = _a.rotate, blur = _a.blur, format = _a.format;
                imageW = maskVar(width);
                imageH = maskVar(height);
                angle = maskVar(rotate);
                sigma = maskVar(blur);
                outFormat = typeof format == 'undefined'
                    ? undefined
                    : format;
                // Filename is undefined
                if (!filename)
                    return [2 /*return*/, next(Error('Please Provide a Filename'))];
                imageType = filename.split('.')[1];
                newFileName = "".concat(filename.split('.')[0], "_").concat(typeof width === 'undefined' ? '' : width, "x").concat(typeof height === 'undefined' ? '' : height, "_").concat(angle == undefined ? '' : 'rot', "_").concat(sigma == undefined ? '' : 'blur', ".").concat(outFormat ? outFormat : imageType);
                return [4 /*yield*/, (0, sharp_1.default)(path_1.default.join(__dirname, fullDir, filename))];
            case 1:
                pipeline = _b.sent();
                //Start the Processing Pipeline
                pipeline.resize(imageW, imageH);
                if (angle)
                    pipeline.rotate(angle);
                if (sigma)
                    pipeline.blur(sigma);
                if (outFormat)
                    pipeline.toFormat(outFormat);
                return [4 /*yield*/, pipeline.toFile(path_1.default.join(__dirname, thumbsDir, newFileName))];
            case 2:
                _b.sent();
                res.sendFile(path_1.default.join(__dirname, thumbsDir, newFileName));
                return [2 /*return*/];
        }
    });
}); });
exports.processImage = processImage;
