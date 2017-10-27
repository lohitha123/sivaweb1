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
var tkitHttpService_1 = require("../../Shared/tkitHttpService");
var TrackITCreateRequestService = (function () {
    function TrackITCreateRequestService(httpService, http) {
        this.httpService = httpService;
        this.http = http;
    }
    TrackITCreateRequestService.prototype.getLocations = function () {
        return this.httpService.getSync({
            apiMethod: "/api/CommonTrackIT/GetLocations"
        });
    };
    TrackITCreateRequestService.prototype.getRequestorDefaultLocation = function () {
        return this.httpService.getSync({
            apiMethod: "/api/CommonTrackIT/GetRequestorDefLoc"
        });
    };
    TrackITCreateRequestService.prototype.getPatients = function (itemID) {
        return this.httpService.getSync({
            apiMethod: "/api/CreateRequest/GetPatientList",
            params: {
                "itemID": itemID
            }
        });
    };
    TrackITCreateRequestService.prototype.getEquipmentType = function (userID) {
        return this.httpService.getSync({
            apiMethod: "/api/CreateRequest/GetEquipmentType",
            params: {
                "userID": userID
            }
        });
    };
    TrackITCreateRequestService.prototype.getMasterItems = function (eqType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.httpService.getSync({
                        apiMethod: "/api/CommonTrackIT/GetMasterItemsForTheSelectedEqType",
                        params: {
                            "eqType": eqType
                        }
                    })];
            });
        });
    };
    TrackITCreateRequestService.prototype.getItemsForAutoSearch = function (eqType, eqpInidcator) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.httpService.getSync({
                        apiMethod: "/api/CreateRequest/GetItemsForAutoSearch",
                        params: {
                            "eqType": eqType,
                            "eqpInidcator": eqpInidcator
                        }
                    })];
            });
        });
    };
    TrackITCreateRequestService.prototype.getEquipmentItems = function (eqpType, itemDescr) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.httpService.getSync({
                        apiMethod: "/api/CreateRequest/GetEquipmentItems",
                        params: {
                            "eqpType": eqpType,
                            "itemDescr": itemDescr
                        }
                    })];
            });
        });
    };
    TrackITCreateRequestService.prototype.getLatestValue = function (appId, fieldName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.httpService.getSync({
                        apiMethod: "/api/CommonTrackIT/GetLatestValue",
                        params: {
                            "appId": appId,
                            "fieldName": fieldName
                        }
                    })];
            });
        });
    };
    TrackITCreateRequestService.prototype.getOrgGroupParamValue = function (orgGpId, appId, fieldName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.httpService.getSync({
                        apiMethod: "/api/Common/GetOrgGroupParamValue",
                        params: {
                            "orgGroupID": orgGpId,
                            "appID": appId,
                            "orgParamName": fieldName
                        }
                    })];
            });
        });
    };
    TrackITCreateRequestService.prototype.addToCart = function (eqIndicator, itemDetails) {
        return this.httpService.create({
            apiMethod: "/api/CommonTrackIT/AddToCart",
            formData: itemDetails,
            params: {
                "eqIndicator": eqIndicator
            }
        }).toPromise();
    };
    TrackITCreateRequestService.prototype.getTKITMyPreferences = function (preference, userID) {
        return this.httpService.getSync({
            apiMethod: "/api/CommonTrackIT/GetTKITMyPreferences",
            params: {
                "preference": preference,
                "requestorID": userID
            }
        });
    };
    TrackITCreateRequestService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [tkitHttpService_1.TkitHttpService, http_1.Http])
    ], TrackITCreateRequestService);
    return TrackITCreateRequestService;
}());
exports.TrackITCreateRequestService = TrackITCreateRequestService;
//# sourceMappingURL=trackit-create-request.service.js.map