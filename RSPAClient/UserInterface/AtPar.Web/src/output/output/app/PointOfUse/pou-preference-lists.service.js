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
var HttpService_1 = require("../Shared/HttpService");
var PreferenceListsService = (function () {
    function PreferenceListsService(http, httpService) {
        this.http = http;
        this.httpService = httpService;
        this.http = http;
    }
    PreferenceListsService.prototype.AddPreferenceListHeader = function (prefListID, prefListDesc, deptID, userID, procedureID, physicianID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.create({
                            "apiMethod": "/api/PreferenceLists/AddPreferenceListHeader",
                            params: {
                                "prefListID": prefListID,
                                "prefListDesc": prefListDesc,
                                "deptID": deptID,
                                "userID": userID,
                                "procedureID": procedureID,
                                "physicianID": physicianID,
                            }
                        }).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PreferenceListsService.prototype.DeletePreferenceList = function (prefListID, procedureID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.create({
                            "apiMethod": "/api/PreferenceLists/DeletePreferenceList",
                            params: {
                                "prefListID": prefListID,
                                "procedureID": procedureID,
                            }
                        }).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PreferenceListsService.prototype.DisablePrefList = function (prefListID, procedureID, status) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.update({
                            "apiMethod": "/api/PreferenceLists/DisablePrefList",
                            params: {
                                "prefListID": prefListID,
                                "procedureID": procedureID,
                                "status": status,
                            }
                        }).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PreferenceListsService.prototype.UpdatePreferenceListItem = function (prefListID, procedureID, itemID, itemQty, holdQty) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.update({
                            "apiMethod": "/api/PreferenceLists/UpdatePreferenceListItem",
                            params: {
                                "prefListID": prefListID,
                                "procedureID": procedureID,
                                "itemID": itemID,
                                "itemQty": itemQty,
                                "holdQty": holdQty,
                            }
                        }).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PreferenceListsService.prototype.AddPreferenceListItem = function (prefListID, procedureID, itemID, itemDesc, itemQty, holdQty, userID, custItemNo) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.create({
                            "apiMethod": "/api/PreferenceLists/AddPreferenceListItem",
                            params: {
                                "prefListID": prefListID,
                                "procedureID": procedureID,
                                "itemID": itemID,
                                "itemDesc": itemDesc,
                                "itemQty": itemQty,
                                "holdQty": holdQty,
                                "userID": userID,
                                "custItemNo": custItemNo,
                            }
                        }).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PreferenceListsService.prototype.DeletePreferenceListItem = function (prefListID, procedureID, itemID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.create({
                            "apiMethod": "/api/PreferenceLists/DeletePreferenceListItem",
                            params: {
                                "prefListID": prefListID,
                                "procedureID": procedureID,
                                "itemID": itemID,
                            }
                        }).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PreferenceListsService.prototype.GetPrefListDetails = function (prefListID, procID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/PreferenceLists/GetPrefListDetails",
                            params: {
                                "prefListID": prefListID,
                                "procID": procID
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PreferenceListsService.prototype.GetDepartmentItems = function (deptID, orgGrpID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/PreferenceLists/GetDepartmentItems",
                            params: {
                                "deptID": deptID,
                                "orgGrpID": orgGrpID,
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PreferenceListsService.prototype.GetUserDepartments = function (userID, orgGrpID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetUserDepartments",
                            params: {
                                "userID": userID,
                                "orgGrpID": orgGrpID
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PreferenceListsService.prototype.GetPrefList = function (id, descr, deptID, procCode, physicians, statusFlag) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetPrefList",
                            params: {
                                "id": id,
                                "descr": descr,
                                "deptID": deptID,
                                "procCode": procCode,
                                "physicians": physicians,
                                "statusFlag": statusFlag
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PreferenceListsService.prototype.GetCodes = function (codeType, code, descr) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetCodes",
                            params: {
                                "codeType": codeType,
                                "code": code,
                                "descr": descr
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PreferenceListsService.prototype.GetPhysicians = function () {
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
    PreferenceListsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, HttpService_1.HttpService])
    ], PreferenceListsService);
    return PreferenceListsService;
}());
exports.PreferenceListsService = PreferenceListsService;
//# sourceMappingURL=pou-preference-lists.service.js.map