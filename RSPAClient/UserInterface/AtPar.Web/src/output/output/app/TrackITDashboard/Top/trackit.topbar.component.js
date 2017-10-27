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
var router_1 = require("@angular/router");
var AtParEnums_1 = require("../../Shared/AtParEnums");
var event_spinner_service_1 = require("../../components/spinner/event.spinner.service");
var api_1 = require("../../components/common/api");
var TKIT_REQUESTOR_1 = require("../../Entities/TKIT_REQUESTOR");
var trackit_profile_service_1 = require("../Body/trackit-profile.service");
var tkitHttpService_1 = require("../../Shared/tkitHttpService");
var AtParEnums_2 = require("../../Shared/AtParEnums");
var AtParConstants_1 = require("../../Shared/AtParConstants");
var TrackITTopBarComponent = (function () {
    function TrackITTopBarComponent(router, spinnerService, confirmationService, service, httpService, atParConstant) {
        this.router = router;
        this.spinnerService = spinnerService;
        this.confirmationService = confirmationService;
        this.service = service;
        this.httpService = httpService;
        this.atParConstant = atParConstant;
        this.countvalue = 0;
        this.mhsatparicon = "";
        this.dropdown = true;
        this.color1 = 'red';
        this.color2 = 'green';
        this.color3 = 'yellow';
        this.tkitDeviceTokenEntry = [];
        this.growlMessage = [];
    }
    TrackITTopBarComponent.prototype.onAtPar = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    this.router.navigate(['trackitdashboard/sameurl']);
                    setTimeout(function () {
                        _this.router.navigate(['trackitdashboard']);
                    }, 1);
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "onAtPar");
                }
                return [2 /*return*/];
            });
        });
    };
    TrackITTopBarComponent.prototype.ngOnInit = function () {
        var _this = this;
        try {
            this.mhsatparicon = "assets/images/MHSAtpar.png";
            this.user = new TKIT_REQUESTOR_1.TKIT_REQUESTOR();
            this.tkitDeviceTokenEntry = JSON.parse(localStorage.getItem("tkitDeviceTokenEntry"));
            this.getUserDetails();
            this.spinnerService.changeEmittedofCount.subscribe(function (countedvalue) {
                _this.countvalue = 0;
                _this.countvalue = countedvalue;
            });
            if (localStorage.getItem('tkitViewCartItemsCount') != null && localStorage.getItem('tkitViewCartItemsCount') != undefined && localStorage.getItem('tkitViewCartItemsCount') != '') {
                this.countvalue = parseInt(localStorage.getItem('tkitViewCartItemsCount').toString());
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    };
    TrackITTopBarComponent.prototype.onCreateRequestClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.router.navigate(['trackitdashboard/sameurl']);
                        return [4 /*yield*/, setTimeout(function () {
                                _this.router.navigate(['trackitdashboard/createrequest']);
                            }, 1)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "onCreateRequestClick");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TrackITTopBarComponent.prototype.onRequestStatusClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.router.navigate(['trackitdashboard/sameurl']);
                        return [4 /*yield*/, setTimeout(function () {
                                _this.router.navigate(['trackitdashboard/requeststatus']);
                            }, 1)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "onRequestStatusClick");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TrackITTopBarComponent.prototype.onRequestorItemReportClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.router.navigate(['trackitdashboard/sameurl']);
                        return [4 /*yield*/, setTimeout(function () {
                                _this.router.navigate(['trackitdashboard/requestoritemvisibilityreport']);
                            }, 1)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "onRequestorItemReportClick");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TrackITTopBarComponent.prototype.onViewCartClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.router.navigate(['trackitdashboard/sameurl']);
                        return [4 /*yield*/, setTimeout(function () {
                                _this.router.navigate(['trackitdashboard/viewcart']);
                            }, 1)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "onViewCartClick");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TrackITTopBarComponent.prototype.onMyProfileClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.router.navigate(['trackitdashboard/sameurl']);
                        return [4 /*yield*/, setTimeout(function () {
                                _this.router.navigate(['trackitdashboard/myprofile']);
                            }, 1)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "onMyProfileClick");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TrackITTopBarComponent.prototype.getUserDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        this.growlMessage = [];
                        return [4 /*yield*/, this.service.getUserDetails(this.tkitDeviceTokenEntry[AtParEnums_2.TokenEntry_Enum.UserID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        if (data.Data != null) {
                                            _this.user = data.Data;
                                            if (_this.user.FIRST_NAME != null && _this.user.FIRST_NAME != '') {
                                                _this.user.FIRST_NAME = _this.user.FIRST_NAME.toLowerCase();
                                            }
                                            if (_this.user.LAST_NAME != null && _this.user.LAST_NAME != '') {
                                                _this.user.LAST_NAME = _this.user.LAST_NAME.toLowerCase();
                                            }
                                            if (_this.user.IMAGE_PATH == null) {
                                                _this.user.IMAGE_PATH = 'assets/images/users/default.png';
                                            }
                                            break;
                                        }
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, "getUserDetails");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TrackITTopBarComponent.prototype.onLogOut = function () {
        var _this = this;
        try {
            this.spinnerService.start();
            this.httpService.clearAppSession();
            localStorage.setItem('isTrackITLogin', AtParEnums_1.YesNo_Enum.Y.toString());
            setTimeout(function () {
                _this.spinnerService.stop();
                _this.router.navigate(['trackitlogin']);
            }, 1000);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "onLogOut");
        }
    };
    TrackITTopBarComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    TrackITTopBarComponent.prototype.dropdownMenu = function (menu) {
        try {
            this.dropdown = !this.dropdown;
            if (this.dropdown) {
                this.smallMenu = menu;
            }
            else {
                this.smallMenu = "";
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "dropdownMenu");
        }
    };
    TrackITTopBarComponent.prototype.OnDestroy = function () {
        this.countvalue = null;
        this.mhsatparicon = null;
        this.menu = null;
        this.user = null;
        this.smallMenu = null;
        this.color1 = null;
        this.color2 = null;
        this.color3 = null;
        this.tkitDeviceTokenEntry = null;
        ;
        this.growlMessage = null;
    };
    TrackITTopBarComponent = __decorate([
        core_1.Component({
            selector: 'trackit-topbar-cmp',
            templateUrl: 'trackit.topbar.component.html',
            providers: [
                api_1.ConfirmationService,
                trackit_profile_service_1.TrackITUserProfileService,
                tkitHttpService_1.TkitHttpService,
                AtParConstants_1.AtParConstants
            ]
        }),
        __metadata("design:paramtypes", [router_1.Router,
            event_spinner_service_1.SpinnerService,
            api_1.ConfirmationService,
            trackit_profile_service_1.TrackITUserProfileService,
            tkitHttpService_1.TkitHttpService,
            AtParConstants_1.AtParConstants])
    ], TrackITTopBarComponent);
    return TrackITTopBarComponent;
}());
exports.TrackITTopBarComponent = TrackITTopBarComponent;
//# sourceMappingURL=trackit.topbar.component.js.map