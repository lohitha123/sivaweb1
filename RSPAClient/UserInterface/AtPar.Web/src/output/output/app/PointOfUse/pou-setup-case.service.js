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
var HttpService_1 = require("../Shared/HttpService");
require("rxjs/add/operator/map");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/toPromise");
var POUSetupCaseService = (function () {
    function POUSetupCaseService(httpservice) {
        this.httpservice = httpservice;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    POUSetupCaseService.prototype.getCaseInfo = function (strPhysician, strProcedureCode, deviceTokenEntry) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpservice.getSync({
                            "apiMethod": "/api/SetupCase/GetCaseInfo",
                            params: {
                                "strPhysician": strPhysician,
                                "strProcedureCode": strProcedureCode,
                                "deviceTokenEntry": deviceTokenEntry
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    POUSetupCaseService.prototype.getPreferenceListIDs = function (deviceTokenEntry) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpservice.getSync({
                            "apiMethod": "/api/SetupCase/GetPreferenceListIDs",
                            params: {
                                "deviceTokenEntry": deviceTokenEntry
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    POUSetupCaseService.prototype.addCaseInfo = function (caseID, caseDesc, physID, patient, prefID, procID, date, userID, roomNo, status) {
        return this.httpservice.create({
            "apiMethod": "/api/SetupCase/AddCaseInfo",
            params: {
                "caseID": caseID,
                "caseDesc": caseDesc,
                "physID": physID,
                "patient": patient,
                "prefID": prefID,
                "procID": procID,
                "date": date,
                "userID": userID,
                "roomNo": roomNo,
                "status": status
            }
        }).toPromise();
    };
    POUSetupCaseService.prototype.deleteCaseID = function (caseID, prefID, procID) {
        return this.httpservice.create({
            apiMethod: "/api/SetupCase/DeleteCaseID",
            params: {
                "caseID": caseID,
                "prefID": prefID,
                "procID": procID,
            }
        }).toPromise();
    };
    POUSetupCaseService.prototype.handleError = function (error) {
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    POUSetupCaseService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [HttpService_1.HttpService])
    ], POUSetupCaseService);
    return POUSetupCaseService;
}());
exports.POUSetupCaseService = POUSetupCaseService;
//# sourceMappingURL=pou-setup-case.service.js.map