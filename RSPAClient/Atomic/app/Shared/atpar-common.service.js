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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var Rx_1 = require("rxjs/Rx");
var HttpService_1 = require("../Shared/HttpService");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParCommonService = (function () {
    function AtParCommonService(http, httpService) {
        this.http = http;
        this.httpService = httpService;
        this.http = http;
    }
    AtParCommonService.prototype.getOrgGrpIDs = function (orgGroupId, orgGroupName, deviceTokenEntry) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetOrgGrpIDs",
                            params: {
                                "userID": deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID],
                                "orgGrpID": orgGroupId,
                                "name": orgGroupName,
                                "deviceTokenEntry": deviceTokenEntry
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParCommonService.prototype.getOrgGroupIDS = function (deviceTokenEntry) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetOrgGroupIDS",
                            params: {
                                "deviceTokenEntry": deviceTokenEntry
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParCommonService.prototype.getOrgBusinessUnits = function (deviceTokenEntry, orgGroupID, bUnitType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetOrgBusinessUnits",
                            params: {
                                "orgGrpId": orgGroupID,
                                "businessUnitType": bUnitType,
                                "deviceTokenEntry": deviceTokenEntry
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParCommonService.prototype.getAuditAllowed = function (appId, menuCode, deviceTokenEntry) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetAuditAllowed",
                            params: {
                                "appId": appId,
                                "menuCode": menuCode,
                                "deviceTokenEntry": deviceTokenEntry
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParCommonService.prototype.doAuditData = function (userId, appId, strMenuCode, lstConfigData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.httpService.create({
                        apiMethod: "/api/Common/DoAuditData",
                        formData: lstConfigData,
                        params: {
                            "userID": userId,
                            "appId": appId,
                            "strFunctionName": strMenuCode
                        }
                    }).toPromise()];
            });
        });
    };
    AtParCommonService.prototype.getMyPreferences = function (preference, deviceTokenEntry) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetMyPreferences",
                            params: {
                                "preference": preference,
                                "uId": deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID],
                                "deviceTokenEntry": deviceTokenEntry
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParCommonService.prototype.getOrgBUnits = function (orgGroupId, deviceTokenEntry) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetOrgBUnits",
                            params: {
                                "userID": deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID],
                                "orgGrpID": orgGroupId,
                                "deviceTokenEntry": deviceTokenEntry
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParCommonService.prototype.insertAuditData = function (auditSecurityLst, userId, pStrFunction, deviceTokenEntry) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.create({
                            "apiMethod": "/api/Common/InsertAuditData",
                            formData: auditSecurityLst,
                            params: {
                                "pStrUser": userId,
                                "pStrFunction": pStrFunction,
                                "deviceTokenEntry": deviceTokenEntry
                            }
                        }).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParCommonService.prototype.getApps = function (userId, deviceTokenEntry) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetApps",
                            params: {
                                "userID": userId,
                                "deviceTokenEntry": deviceTokenEntry
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParCommonService.prototype.getAppParameters = function (userId, orgGroupId, appID, deviceTokenEntry) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetAppParameters",
                            params: {
                                "userID": userId,
                                "orgGrpID": orgGroupId,
                                "appID": appID,
                                "deviceTokenEntry": deviceTokenEntry
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParCommonService.prototype.getCheckRecall = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/CheckRecall",
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParCommonService.prototype.saveAppParameters = function (lstAppParams, orgGrpId, appId, userId, deviceTokenEntry) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.create({
                            "apiMethod": "/api/Common/SaveAppParameters",
                            formData: lstAppParams,
                            params: {
                                "orgGrpID": orgGrpId,
                                "appID": appId,
                                "user": userId,
                                "deviceTokenEntry": deviceTokenEntry
                            }
                        }).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParCommonService.prototype.getUsersList = function (userId, appId, orgGrpId, deviceTokenEntry) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetUsersList",
                            params: {
                                "userID": userId,
                                "appID": appId,
                                "orgGrpID": orgGrpId,
                                "deviceTokenEntry": deviceTokenEntry
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParCommonService.prototype.getUserOrgGroups = function (userId, orgGrpId, deviceTokenEntry) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetUserOrgGroups",
                            params: {
                                "user": userId,
                                "orgGrpID": orgGrpId,
                                "deviceTokenEntry": deviceTokenEntry
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParCommonService.prototype.getEnterpriseSystem = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetEnterpriseSystem"
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParCommonService.prototype.getPrintersData = function (appID, printerName, deviceTokenEntry) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetPrintersData",
                            params: {
                                "appID": appID,
                                "printerName": printerName,
                                "deviceTokenEntry": deviceTokenEntry
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParCommonService.prototype.getProfileParamValue = function (profileID, appID, parameterID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            apiMethod: "/api/Common/GetProfileParamValue",
                            params: {
                                "profileID": profileID,
                                "appID": appID,
                                "parameterID": parameterID,
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParCommonService.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    return AtParCommonService;
}());
AtParCommonService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, HttpService_1.HttpService])
], AtParCommonService);
exports.AtParCommonService = AtParCommonService;
//# sourceMappingURL=atpar-common.service.js.map