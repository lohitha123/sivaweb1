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
var http_2 = require("@angular/http");
var HttpService_1 = require("../Shared/HttpService");
var AtParUserParameterService = (function () {
    function AtParUserParameterService(http, httpService) {
        this.http = http;
        this.httpService = httpService;
        this.http = http;
        this.headers = new http_2.Headers();
        this.headers.append('Content-Type', 'application/json');
    }
    AtParUserParameterService.prototype.getUserParameters = function (appId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/UserParams/GetUserParams",
                            params: {
                                "appID": appId,
                                "userID": userId
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParUserParameterService.prototype.GetParameterValues = function (parameterId, fieldName, tableName, whereCondition, userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/UserParams/GetParameterValues",
                            params: {
                                "parameterID": parameterId,
                                "fieldName": fieldName,
                                "tableName": tableName,
                                "whereCondition": whereCondition,
                                "userID": userId
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParUserParameterService.prototype.getAuditAllowed = function (appId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.getSync({
                            "apiMethod": "/api/Common/GetAuditAllowed",
                            params: {
                                "appId": appId,
                                "menuCode": "mt_user_parameter.aspx"
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AtParUserParameterService.prototype.setUserParams = function (userAppParamList) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.update({
                            "apiMethod": "/api/UserParams/SetUserParams",
                            formData: userAppParamList,
                            params: {}
                        }).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()]; //.catch(this.httpService.handleError)//.map((res: Response) => res.json() as AtParWebApiResponse<number>);
                }
            });
        });
    };
    AtParUserParameterService.prototype.insertAuditData = function (auditSecurityLst, userId, pStrFunction) {
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
    AtParUserParameterService.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    AtParUserParameterService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, HttpService_1.HttpService])
    ], AtParUserParameterService);
    return AtParUserParameterService;
}());
exports.AtParUserParameterService = AtParUserParameterService;
//# sourceMappingURL=atpar-user-parameters.service.js.map