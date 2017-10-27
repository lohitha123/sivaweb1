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
var tkitHttpService_1 = require("../Shared/tkitHttpService");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParTrackITCommonService = (function () {
    function AtParTrackITCommonService(http, httpService) {
        this.http = http;
        this.httpService = httpService;
        this.http = http;
    }
    AtParTrackITCommonService.prototype.getOrgGrpIDs = function (orgGroupId, orgGroupName, deviceTokenEntry) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetOrgGrpIDs",
                            params: {
                                "userID": deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID],
                                "orgGrpID": orgGroupId,
                                "name": orgGroupName
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService.prototype.getOrgGroupIDS = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetOrgGroupIDS",
                            params: {}
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService.prototype.getOrgBusinessUnits = function (orgGroupID, bUnitType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetOrgBusinessUnits",
                            params: {
                                "orgGrpId": orgGroupID,
                                "businessUnitType": bUnitType
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService.prototype.getAuditAllowed = function (appId, menuCode) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetAuditAllowed",
                            params: {
                                "appId": appId,
                                "menuCode": menuCode
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService.prototype.doAuditData = function (userId, appId, strMenuCode, lstConfigData) {
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
    AtParTrackITCommonService.prototype.saveImage = function (Image, Imagename) {
        return __awaiter(this, void 0, void 0, function () {
            var bodyTextDic;
            return __generator(this, function (_a) {
                bodyTextDic = { "bodyText": Image };
                return [2 /*return*/, this.httpService.create({
                        apiMethod: "/api/Common/SaveImage",
                        formData: bodyTextDic,
                        params: {
                            "ImgName": Imagename
                        }
                    }).toPromise()];
            });
        });
    };
    AtParTrackITCommonService.prototype.getMyPreferences = function (preference, deviceTokenEntry) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetMyPreferences",
                            params: {
                                "preference": preference,
                                "uId": deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID]
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService.prototype.getOrgBUnits = function (orgGroupId, deviceTokenEntry) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetOrgBUnits",
                            params: {
                                "userID": deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID],
                                "orgGrpID": orgGroupId
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService.prototype.insertAuditData = function (auditSecurityLst, userId, pStrFunction) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.create({
                            "apiMethod": "/api/Common/InsertAuditData",
                            formData: auditSecurityLst,
                            params: {
                                "pStrUser": userId,
                                "pStrFunction": pStrFunction
                            }
                        }).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService.prototype.getApps = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetApps",
                            params: {
                                "userID": userId
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService.prototype.getAppParameters = function (userId, orgGroupId, appID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetAppParameters",
                            params: {
                                "userID": userId,
                                "orgGrpID": orgGroupId,
                                "appID": appID
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService.prototype.getCheckRecall = function () {
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
    AtParTrackITCommonService.prototype.saveAppParameters = function (lstAppParams, orgGrpId, appId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.create({
                            "apiMethod": "/api/Common/SaveAppParameters",
                            formData: lstAppParams,
                            params: {
                                "orgGrpID": orgGrpId,
                                "appID": appId,
                                "user": userId
                            }
                        }).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService.prototype.getUsersList = function (userId, appId, orgGrpId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetUsersList",
                            params: {
                                "userID": userId,
                                "appID": appId,
                                "orgGrpID": orgGrpId
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService.prototype.getUserOrgGroups = function (userId, orgGrpId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetUserOrgGroups",
                            params: {
                                "user": userId,
                                "orgGrpID": orgGrpId
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService.prototype.getEnterpriseSystem = function () {
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
    AtParTrackITCommonService.prototype.getPrintersData = function (appID, printerName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetPrintersData",
                            params: {
                                "appID": appID,
                                "printerName": printerName
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService.prototype.getProfileParamValue = function (profileID, appID, parameterID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            apiMethod: "/api/Common/GetProfileParamValue",
                            params: {
                                "profileID": profileID,
                                "appID": appID,
                                "parameterID": parameterID
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService.prototype.getOrgGroupBUnits = function (userId, orgGrpId, bUnitType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetOrgGroupBUnits",
                            params: {
                                "userId": userId,
                                "orgGrpId": orgGrpId,
                                "businessUnitType": bUnitType
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService.prototype.getOrgGroupParamValue = function (orgParamName, appID, orgGroupID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetOrgGroupParamValue",
                            params: {
                                "orgParamName": orgParamName,
                                "appID": appID,
                                "orgGroupID": orgGroupID
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService.prototype.GetOrderHeaders = function (fromDate, toDate, CompID, locID, deptID, vendorID, ordStatus, strReqNo, strItemID, orgGrpID, appid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            apiMethod: "/api/ManageOrders/GetOrderHeaders",
                            params: {
                                "fromDate": fromDate,
                                "toDate": toDate,
                                "compID": CompID,
                                "locID": locID,
                                "deptID": deptID,
                                "vendorID": vendorID,
                                "ordStatus": ordStatus,
                                "reqNo": strReqNo,
                                "itemID": strItemID,
                                "orgGrpID": orgGrpID,
                                "appID": appid,
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService.prototype.GetProfileParamValue = function (profileID, appID, parameterID) {
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
    AtParTrackITCommonService.prototype.GetMyPreferences = function (preference, userID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            apiMethod: "/api/Common/GetMyPreferences",
                            params: {
                                "preference": preference,
                                "uId": userID,
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService.prototype.GetOrderDetails_ManageOrders = function (CompID, ordStatus, parID, deptID, orgID, ItemId, appid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            apiMethod: "/api/ManageOrders/GetOrderDetails_ManageOrders",
                            params: {
                                "ordNo": CompID,
                                "ordStatus": ordStatus,
                                "cartID": parID,
                                "bUnit": deptID,
                                "itemID": ItemId,
                                "orgGrpID": orgID,
                                "appID": appid,
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService.prototype.UpdateOrderDetails = function (lstPouOrderDetails) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.update({
                            apiMethod: "/api/Common/UpdateOrderDetails",
                            formData: lstPouOrderDetails,
                            params: {}
                        }).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService.prototype.getOrgGrpName = function (OrgGrpId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            apiMethod: "/api/Common/GetOrgGroupName",
                            params: {
                                "orgGrpID": OrgGrpId
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService.prototype.getBusinessUnits = function (userId, bUnitType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetBusinessUnits",
                            params: {
                                "userID": userId,
                                "busineesUnitType": bUnitType
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService.prototype.getLocations = function (orgGrpID, status, locID, locName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            apiMethod: "/api/Common/GetLocations",
                            params: {
                                "orgGrpID": orgGrpID,
                                "status": status,
                                "locID": locID,
                                "locName": locName
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService.prototype.UpdateLocIDStatus = function (orgGrpID, status, locID) {
        return this.httpService.update({
            apiMethod: "/api/Common/UpdateLocIDStatus",
            params: {
                "orgGrpID": orgGrpID,
                "status": status,
                "locID": locID
            }
        }).map(function (res) { return res.json(); }).catch(this.handleError);
    };
    AtParTrackITCommonService.prototype.getOrgIds = function (userID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            apiMethod: "/api/Common/GetOrgIds",
                            params: {
                                "userId": userID
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService.prototype.getLocByOrgId = function (orgID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            apiMethod: "/api/Common/GetLocByOrgId",
                            params: {
                                "orgID": orgID
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    AtParTrackITCommonService.prototype.getSSLConfigDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetSSLConfigDetails",
                            params: {}
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService.prototype.getServerIP = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetServerIP",
                            params: {}
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService.prototype.getItems = function (ItemID, OrgId, AppID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetItems",
                            params: {
                                ItemID: ItemID,
                                OrgId: OrgId,
                                AppID: AppID
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService.prototype.getOrgDetails = function (userID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetOrgDetails",
                            params: {
                                "userID": userID
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService.prototype.getCostCenterOrgIds = function (userID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetCostCenterOrgIds",
                            params: {
                                userID: userID
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService.prototype.getUserDepartments = function (userID, orgGrpID, deviceTokenEntry) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetUserDepartments",
                            params: {
                                userID: userID,
                                orgGrpID: orgGrpID,
                                deviceTokenEntry: deviceTokenEntry
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService.prototype.getPhysiciansByPrefOrProc = function (flag) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetPhysiciansByPrefOrProc",
                            params: {
                                flag: flag
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService.prototype.getBUnits = function (serverUserID, bUnits, appId, selectedUserID, bUnit, descr) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetBUnits",
                            params: {
                                bArray: bUnits,
                                appId: appId,
                                userID: selectedUserID,
                                bUnit: bUnit,
                                description: descr,
                                serverUserID: serverUserID
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService.prototype.getBUs = function (userID, bArray, appID, selectedUserID, bUnit, descr) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetBUs",
                            params: {
                                userID: userID,
                                bArray: bArray,
                                appID: appID,
                                selectedUserID: selectedUserID,
                                bUnit: bUnit,
                                descr: descr,
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService.prototype.allocateBUnits = function (appID, selectedUserID, serverUserID, lstBUnitsAllocation, blnSearched) {
        return this.httpService.create({
            apiMethod: "/api/Common/AllocateBUnits",
            formData: lstBUnitsAllocation,
            params: {
                "appId": appID,
                "userId": selectedUserID,
                "serverUserId": serverUserID,
                "searched": blnSearched
            }
        }).toPromise();
    };
    AtParTrackITCommonService.prototype.getNiceLabelsPrintersData = function (appID, status, printerType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetNiceLabelsPrintersData",
                            params: {
                                appID: appID,
                                status: status,
                                printerType: printerType
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService.prototype.getCarriersData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/CarrierInformation/GetCarriersData",
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService.prototype.getPhysicians = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetPhysicians",
                            params: {}
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService.prototype.getCodes = function (codeType, code, descr) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetCodes",
                            params: {
                                codeType: codeType,
                                code: code,
                                descr: descr
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService.prototype.sendEmbeddedEmail = function (systemID, subject, bodyText, toAddress, imageName, deliverSign, mailPriority, attachment) {
        return __awaiter(this, void 0, void 0, function () {
            var bodyTextDic;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bodyText.replace(/&nbsp;/g, "")];
                    case 1:
                        bodyText = _a.sent();
                        bodyTextDic = { "bodyText": bodyText };
                        return [4 /*yield*/, this.httpService.create({
                                "apiMethod": "/api/Common/SendEmbeddedEmail",
                                formData: bodyTextDic,
                                params: {
                                    "systemID": systemID,
                                    "subject": subject,
                                    "toAddress": toAddress,
                                    "imageName": imageName,
                                    "deliverSign": deliverSign,
                                    "mailPriority": mailPriority,
                                    "attachment": attachment
                                }
                            }).toPromise()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService.prototype.sendEmail = function (systemID, subject, bodyText, toAddress, mailPriority, attachment) {
        return __awaiter(this, void 0, void 0, function () {
            var bodyTextDic;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bodyText.replace(/&nbsp;/g, "")];
                    case 1:
                        bodyText = _a.sent();
                        bodyTextDic = { "bodyText": bodyText };
                        return [4 /*yield*/, this.httpService.create({
                                "apiMethod": "/api/Common/SendEmail",
                                formData: bodyTextDic,
                                params: {
                                    "systemID": systemID,
                                    "subject": subject,
                                    "toAddress": toAddress,
                                    "mailPriority": mailPriority,
                                    "attachment": attachment
                                }
                            }).toPromise()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService.prototype.exportToExcel = function (html, screenName, excelName) {
        return __awaiter(this, void 0, void 0, function () {
            var dicData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, html.replace(/&nbsp;/g, "%%%")];
                    case 1:
                        html = _a.sent();
                        dicData = { "html": html };
                        return [4 /*yield*/, this.httpService.create({
                                apiMethod: "/api/Common/ExportToExcel",
                                formData: dicData,
                                params: {
                                    "screenName": screenName,
                                    "excelName": excelName
                                }
                            }).toPromise()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService.prototype.deleteExcel = function (folderName, excelName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            apiMethod: "/api/Common/DeleteExcel",
                            params: {
                                "folderName": folderName,
                                "excelName": excelName
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService.prototype.getEventIds = function (bUnit, userID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            apiMethod: "/api/Common/GetEventIds",
                            params: {
                                "bUnit": bUnit,
                                "userID": userID
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService.prototype.getDepartment = function (departmentID, deptDescr, orgGrpID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetDepartment",
                            params: {
                                departmentID: departmentID,
                                deptDescr: deptDescr,
                                orgGrpID: orgGrpID
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService.prototype.getUserFullName = function (userID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetUserFullName",
                            params: {
                                userID: userID
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService.prototype.getHeirarchyUsersList = function (appID, userID, orgGroupID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/IssueReport/GetHeirarchyUsersList",
                            params: {
                                appID: appID,
                                userID: userID,
                                orgGrpID: orgGroupID
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParTrackITCommonService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, tkitHttpService_1.TkitHttpService])
    ], AtParTrackITCommonService);
    return AtParTrackITCommonService;
}());
exports.AtParTrackITCommonService = AtParTrackITCommonService;
//# sourceMappingURL=atpar-trackit-common.service.js.map