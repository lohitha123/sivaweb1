"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var HttpService_1 = require("../Shared/HttpService");
var Rx_1 = require("rxjs/Rx");
var MaintainPrinterServices = (function () {
    function MaintainPrinterServices(httpService) {
        this.httpService = httpService;
    }
    MaintainPrinterServices.prototype.updatePrinterStatus = function (appID, friendlyName, labelType, status) {
        return this.httpService.update({
            "apiMethod": "/api/MaintainPrinter/UpdatePrinterStatus",
            params: {
                appID: appID,
                friendlyName: friendlyName,
                functionality: labelType,
                status: status
            }
        }).toPromise();
    };
    ;
    MaintainPrinterServices.prototype.getPrinterModels = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/MaintainPrinter/GetPrinterModels",
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MaintainPrinterServices.prototype.getFunctionalities = function (appID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/MaintainPrinter/GetFunctionalities",
                            params: {
                                appID: appID,
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MaintainPrinterServices.prototype.getLinkedFunctionalities = function (appID, labelType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/MaintainPrinter/GetLinkedFunctionalities",
                            params: {
                                appID: appID,
                                labelType: labelType
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MaintainPrinterServices.prototype.getModelImage = function (appID, model, functionality, printerModelType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/MaintainPrinter/GetModelImage",
                            params: {
                                appID: appID,
                                model: model,
                                functionality: functionality,
                                printerModelType: printerModelType
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MaintainPrinterServices.prototype.getModels = function (appID, functionality, printerCode) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/MaintainPrinter/GetModels",
                            params: {
                                appID: appID,
                                functionality: functionality,
                                printerCode: printerCode
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MaintainPrinterServices.prototype.savePrinterDetails = function (lstPrintData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.create({
                            "apiMethod": "/api/MaintainPrinter/SavePrinterDetails",
                            formData: lstPrintData,
                        }).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MaintainPrinterServices.prototype.updatePrinterDetails = function (oldFriendlyName, blnPrinterExists, lstPrintData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.update({
                            "apiMethod": "/api/MaintainPrinter/UpdatePrinterDetails",
                            formData: lstPrintData,
                            params: {
                                oldFriendlyName: oldFriendlyName,
                                blnPrinterExists: blnPrinterExists
                            }
                        }).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MaintainPrinterServices.prototype.getPrinterData = function (appID, friendlyName, functionality) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/MaintainPrinter/GetPrinterData",
                            params: {
                                appID: appID,
                                functionality: functionality,
                                friendlyName: friendlyName
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MaintainPrinterServices.prototype.uploadSingleFile = function (formData, header, strLvx, strPnl, getModels, labelWidth, labelHeight, appID, printerCode, functionality, userID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.createUpload({
                            "apiMethod": "/api/MaintainPrinter/UploadSingleFile",
                            formData: formData,
                            params: {
                                _strLvx: strLvx,
                                _strPnl: strPnl,
                                getModels: getModels,
                                labelWidth: labelWidth,
                                labelHeight: labelHeight,
                                appID: appID,
                                printerCode: printerCode,
                                functionality: functionality,
                                userID: userID
                            }
                        }, header).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MaintainPrinterServices.prototype.uploadMultipleFiles = function (formData, header, strLvx, strPnl, getModels, appID, printerCode, functionality, userID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.createUpload({
                            "apiMethod": "/api/MaintainPrinter/UploadMultipleFiles",
                            formData: formData,
                            params: {
                                _strLvx: strLvx,
                                _strPnl: strPnl,
                                getModels: getModels,
                                appID: appID,
                                printerCode: printerCode,
                                functionality: functionality,
                                userID: userID
                            }
                        }, header).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MaintainPrinterServices.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    ;
    MaintainPrinterServices = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [HttpService_1.HttpService])
    ], MaintainPrinterServices);
    return MaintainPrinterServices;
}());
exports.MaintainPrinterServices = MaintainPrinterServices;
//# sourceMappingURL=atpar-maintain-printers.service.js.map