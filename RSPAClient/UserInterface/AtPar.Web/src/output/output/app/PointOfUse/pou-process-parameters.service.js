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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var Rx_1 = require("rxjs/Rx");
var HttpService_1 = require("../Shared/HttpService");
var AtParEnums_1 = require("../Shared/AtParEnums");
var ProcessParametersService = (function () {
    function ProcessParametersService(http, httpService) {
        this.http = http;
        this.httpService = httpService;
        this.http = http;
    }
    ProcessParametersService.prototype.getDeptAllocatedCarts = function (deptID, userId, bUnit, cartID, appId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/ProcessParameter/GetDeptAllocatedCarts",
                            params: {
                                "departmentID": deptID,
                                "strUserId": userId,
                                "strBunit": bUnit,
                                "strCartID": cartID,
                                "appID": appId
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProcessParametersService.prototype.getAllocDepartment = function (deptID, bUnit, appId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/ProcessParameter/GetAllocDepartment",
                            params: {
                                "departmentID": deptID,
                                "bUnit": bUnit,
                                "appID": appId
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProcessParametersService.prototype.getCartSchedules = function (bUnit, cartID, procType, appId, deviceTokenEntry) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/ProcessParameter/GetCartSchedules",
                            params: {
                                "strBunit": bUnit,
                                "strCartID": cartID,
                                "strUserId": deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID],
                                "procType": procType,
                                "appID": appId
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProcessParametersService.prototype.getSheduleIDs = function (deviceTokenEntry) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/ProcessParameter/GetSheduleIDs",
                            params: {
                                "userId": deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID],
                                "strOrgGroupID": deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProcessParametersService.prototype.assignScheduleToCarts = function (dicAssignSchedule, bunit, appId, deviceTokenEntry) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.create({
                            "apiMethod": "/api/ProcessParameter/AssignScheduleToCarts",
                            formData: dicAssignSchedule,
                            params: {
                                "strBunit": bunit,
                                "strUserId": deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID],
                                "appID": appId
                            }
                        }).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProcessParametersService.prototype.assignAlertSchedules = function (schdAlerts, appId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.create({
                            "apiMethod": "/api/ProcessParameter/AssignAlertSchedules",
                            formData: schdAlerts,
                            params: {
                                "appID": appId
                            }
                        }).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProcessParametersService.prototype.getAssignedLocationDetails = function (bUnit, locId, locationOrgId, locGroupId, orgGrpId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/ProcessParameter/GetAssignedLocationDetails",
                            params: {
                                "bUnit": bUnit,
                                "locId": locId,
                                "locationOrgId": locationOrgId,
                                "locGroupId": locGroupId,
                                "orgGrpId": orgGrpId
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProcessParametersService.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    ProcessParametersService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, HttpService_1.HttpService])
    ], ProcessParametersService);
    return ProcessParametersService;
}());
exports.ProcessParametersService = ProcessParametersService;
//# sourceMappingURL=pou-process-parameters.service.js.map