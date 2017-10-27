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
require("rxjs/add/operator/map");
var Rx_1 = require("rxjs/Rx");
var HttpService_1 = require("../Shared/HttpService");
var RecvPoNonPoReceiptsService = (function () {
    function RecvPoNonPoReceiptsService(httpService) {
        this.httpService = httpService;
    }
    RecvPoNonPoReceiptsService.prototype.getReceivePrerequisites = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/POorNONPOReceipts/GetReceivePrerequisites",
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RecvPoNonPoReceiptsService.prototype.getIUTDetails = function (lstIUTHeader) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.create({
                            "apiMethod": "/api/POorNONPOReceipts/GetIUTDetails",
                            formData: lstIUTHeader
                        }).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RecvPoNonPoReceiptsService.prototype.getHeader = function (lstPoHeader) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.httpService.create({
                        apiMethod: "/api/POorNONPOReceipts/GetHeader",
                        formData: lstPoHeader
                    }).toPromise()];
            });
        });
    };
    RecvPoNonPoReceiptsService.prototype.deleteHeader = function (lstDeleteHeader) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.create({
                            "apiMethod": "/api/POorNONPOReceipts/DeleteHeader",
                            formData: lstDeleteHeader
                        }).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RecvPoNonPoReceiptsService.prototype.sendIUTDetails = function (dicDataItems) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.update({
                            "apiMethod": "/api/POorNONPOReceipts/SendIUTDetails",
                            formData: dicDataItems
                        }).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RecvPoNonPoReceiptsService.prototype.sendDetails = function (dicSendDataItems) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.update({
                            "apiMethod": "/api/POorNONPOReceipts/SendDetails",
                            formData: dicSendDataItems
                        }).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RecvPoNonPoReceiptsService.prototype.printNiceLabel = function (prntrAddressOrName, pntrPort, pntrTye, niceLblName, noOfPrints, errMsg, lstprintDetails) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.update({
                            "apiMethod": "/api/POorNONPOReceipts/PrintNiceLabel",
                            formData: lstprintDetails,
                            params: {
                                "printerAddressOrName": prntrAddressOrName,
                                "printerPort": pntrPort,
                                "printerTye": pntrTye,
                                "niceLabelName": niceLblName,
                                "noOfPrints": noOfPrints,
                                "errMsg": errMsg
                            }
                        }).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RecvPoNonPoReceiptsService.prototype.printStaionaryReport = function (dicPrintDetails, noOfCopies) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.update({
                            "apiMethod": "/api/POorNONPOReceipts/PrintStaionaryReport",
                            formData: dicPrintDetails,
                            params: {
                                "noOfCopies": noOfCopies
                            }
                        }).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RecvPoNonPoReceiptsService.prototype.searchHeader = function (lstRecvPOHeader) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.create({
                            "apiMethod": "/api/POorNONPOReceipts/SearchHeader",
                            formData: lstRecvPOHeader
                        }).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RecvPoNonPoReceiptsService.prototype.searchIUTHeader = function (lstIUTHeader) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.create({
                            "apiMethod": "/api/POorNONPOReceipts/SearchIUTHeader",
                            formData: lstIUTHeader
                        }).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    //Non Po
    RecvPoNonPoReceiptsService.prototype.sendNonPoDetails = function (lstSendHeader) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.update({
                            "apiMethod": "/api/POorNONPOReceipts/SendNonPos",
                            formData: lstSendHeader
                        }).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RecvPoNonPoReceiptsService.prototype.generateTrackingNumber = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/POorNONPOReceipts/GenerateTrackingNo",
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RecvPoNonPoReceiptsService.prototype.getRecipients = function (recipient) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/POorNONPOReceipts/GetBadgeDetails",
                            params: {
                                "recpName": recipient
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RecvPoNonPoReceiptsService.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    RecvPoNonPoReceiptsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [HttpService_1.HttpService])
    ], RecvPoNonPoReceiptsService);
    return RecvPoNonPoReceiptsService;
}());
exports.RecvPoNonPoReceiptsService = RecvPoNonPoReceiptsService;
//# sourceMappingURL=recv-po-nonpo-receipts.service.js.map