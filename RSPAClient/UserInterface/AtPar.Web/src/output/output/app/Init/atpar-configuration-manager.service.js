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
var ConfigurationManagerService = (function () {
    function ConfigurationManagerService(http, httpService) {
        this.http = http;
        this.httpService = httpService;
        this.name = "AtPar";
        this.urlString = "";
    }
    ConfigurationManagerService.prototype.getConfigDetails = function (systemId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/ConfigurationManager/GetConfigurationDetails",
                            params: {
                                "pSystemId": systemId,
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ConfigurationManagerService.prototype.SaveSSLConfigDetails = function (protocol, serverNameValue, portNoValue) {
        return this.httpService.create({
            "apiMethod": "/api/ConfigurationManager/SaveSSLConfigDetails",
            params: {
                "pStrProtocalValue": protocol,
                "pStrServerNameValue": serverNameValue,
                "pStrPortNoValue": portNoValue
            }
        }).toPromise();
    };
    ConfigurationManagerService.prototype.GetSSLConfigDetails = function () {
        return this.httpService.get({
            "apiMethod": "/api/ConfigurationManager/GetSSLConfigDetails"
        });
    };
    ConfigurationManagerService.prototype.updateConfigDetails = function (systemId, userId, configdata) {
        return this.httpService.update({
            apiMethod: "/api/ConfigurationManager/SaveConfigurationDetails",
            formData: configdata,
            params: {
                "systemId": systemId,
                "userId": userId
            }
        }).toPromise();
    };
    ConfigurationManagerService.prototype.UpdateReportsConnection = function (body, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.urlString = window.location.protocol + "//" + window.location.hostname + "/AtPar/ReportingApi/api/connection";
                        return [4 /*yield*/, this.http.post(this.urlString, body, options)
                                .toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ConfigurationManagerService.prototype.UpdateEmailSettings = function (body, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.urlString = window.location.protocol + "//" + window.location.hostname + "/AtPar/ReportingApi/api/systemSetting/email";
                        return [4 /*yield*/, this.http.post(this.urlString, body, options)
                                .toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ConfigurationManagerService.prototype.UpdateQuerySource = function (hostName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.httpService.update({
                        "apiMethod": "/api/ConfigurationManager/UpdateQuerySource",
                        params: {
                            "HostName": hostName
                        }
                    }).toPromise()];
            });
        });
    };
    ConfigurationManagerService.prototype.UpdateLogConfigDetails = function (userId, confXml) {
        return this.httpService.update({
            apiMethod: "/api/ConfigurationManager/SetEntrpServiceConfDtls",
            params: {
                "userID": userId,
                "confXml": confXml
            }
        }).toPromise();
    };
    ConfigurationManagerService.prototype.GetAuditAllowed = function (appId, strMenuCode) {
        return this.httpService.get({
            apiMethod: "/api/Common/GetAuditAllowed",
            params: {
                "appId": appId,
                "menuCode": strMenuCode
            }
        });
    };
    ConfigurationManagerService.prototype.DoAuditData = function (userId, appId, strMenuCode, lstConfigData) {
        return this.httpService.create({
            apiMethod: "/api/Common/DoAuditData",
            formData: lstConfigData,
            params: {
                "userID": userId,
                "appId": appId,
                "strFunctionName": strMenuCode
            }
        });
    };
    ConfigurationManagerService.prototype.GetEntrpServiceConffile = function (userId, boolRequestType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            apiMethod: "/api/ConfigurationManager/GetEntrpServiceConffile",
                            params: {
                                "userID": userId,
                                "boolRequestType": boolRequestType
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ConfigurationManagerService.prototype.getOracleConnection = function (server, userId, pwd) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            apiMethod: "/api/ConfigurationManager/GetOracleConnection",
                            params: {
                                "server": server,
                                "userId": userId,
                                "pwd": pwd
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ConfigurationManagerService.prototype.getSqlServerConnection = function (server, userId, pwd, dataSource) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            apiMethod: "/api/ConfigurationManager/GetSqlServerConnection",
                            params: {
                                "server": server,
                                "userId": userId,
                                "pwd": pwd,
                                "dataSource": dataSource
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ConfigurationManagerService.prototype.getConfigTabNames = function () {
        return this.http.get("/api/ConfigurationManager/GetTabNames")
            .map(function (res) { return res.json(); }).catch(this.handleError);
        //http://localhost:8001/api/ConfigurationManager/GetTabNames
    };
    ConfigurationManagerService.prototype.TestLDAPConnection = function (ldapConnectString, userName, password, authType, entryLimit, resultsFields, searchFilterValue, searchScope, strserverName, strProtocol) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            apiMethod: "/api/ConfigurationManager/TestLDAPConnection",
                            params: {
                                "ldapConnectString": ldapConnectString,
                                "userName": userName,
                                "pwd": password,
                                "authType": authType,
                                "entryLimit": entryLimit,
                                "resultsFields": resultsFields,
                                "searchFilterValue": searchFilterValue,
                                "searchScope": searchScope,
                                "strserverName": strserverName,
                                "strProtocol": strProtocol
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ConfigurationManagerService.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    ConfigurationManagerService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, HttpService_1.HttpService])
    ], ConfigurationManagerService);
    return ConfigurationManagerService;
}());
exports.ConfigurationManagerService = ConfigurationManagerService;
//# sourceMappingURL=atpar-configuration-manager.service.js.map