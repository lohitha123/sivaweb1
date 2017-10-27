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
/// <reference path="../Entities/MT_ATPAR_SECURITY_PARAMS.ts" />
var core_1 = require("@angular/core");
var HttpService_1 = require("../Shared/HttpService");
var Rx_1 = require("rxjs/Rx");
var AddUserServices = (function () {
    function AddUserServices(httpservice) {
        this.httpservice = httpservice;
    }
    AddUserServices.prototype.readConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpservice.getSync({
                            "apiMethod": "/api/AddUser/PopulateConfigData",
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ;
    AddUserServices.prototype.populateUserFields = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpservice.getSync({
                            "apiMethod": "/api/Common/GetSecurityParams",
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ;
    AddUserServices.prototype.getLdapUsers = function (userID, strSearchFilter, entryLimit) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpservice.getSync({
                            "apiMethod": "/api/AddUser/GetLdapUsers",
                            params: {
                                userID: userID,
                                strSearchFilter: strSearchFilter,
                                strEntryLimit: entryLimit
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ;
    AddUserServices.prototype.getProfiles = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpservice.getSync({
                            "apiMethod": "/api/Common/GetProfiles",
                            params: {
                                'userID': userId
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ;
    AddUserServices.prototype.checkUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpservice.getSync({
                            "apiMethod": "/api/AddUser/CheckUser",
                            params: { 'userID': userId },
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ;
    AddUserServices.prototype.checkProfile = function (userId, profileID, profileType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpservice.getSync({
                            "apiMethod": "/api/AddUser/CheckProfileAppACL",
                            params: {
                                'userID': userId,
                                'profileID': profileID,
                                'accessType': profileType
                            },
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ;
    AddUserServices.prototype.addUser = function (newUser) {
        return this.httpservice.create({
            "apiMethod": "/api/AddUser/AddUser",
            formData: newUser,
        });
    };
    AddUserServices.prototype.updateUser = function (User) {
        return this.httpservice.create({
            "apiMethod": "/api/ManageUsers/UpdateUser",
            formData: User,
        });
    };
    AddUserServices.prototype.saveLdapUser = function (lstLdapUser, userID, tokenExpiryPeriod, idleTime, orgGroupID, profileID) {
        if (orgGroupID == null || orgGroupID == undefined) {
            orgGroupID = '';
        }
        if (profileID == null || profileID == undefined) {
            profileID = '';
        }
        return this.httpservice.create({
            "apiMethod": "/api/AddUser/SaveLdapUsers",
            formData: lstLdapUser,
            params: {
                'userID': userID,
                'sessionTime': tokenExpiryPeriod,
                'idleTime': idleTime,
                'orgGrpId': orgGroupID,
                'profileID': profileID
            },
        });
    };
    AddUserServices.prototype.refreshUserDN = function (userId, firstName, lastName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpservice.getSync({
                            "apiMethod": "/api/ManageUsers/RefreshUserDN",
                            params: {
                                'user': userId,
                                'userFname': firstName,
                                'userLname': lastName
                            },
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ;
    AddUserServices.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    ;
    AddUserServices = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [HttpService_1.HttpService])
    ], AddUserServices);
    return AddUserServices;
}());
exports.AddUserServices = AddUserServices;
//# sourceMappingURL=atpar-add-user.service.js.map