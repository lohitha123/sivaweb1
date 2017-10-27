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
var trackit_dashboard_service_1 = require("./trackit-dashboard.service");
var AtParEnums_1 = require("../../Shared/AtParEnums");
var TkitHttpService_1 = require("../../Shared/TkitHttpService");
var AtParConstants_1 = require("../../Shared/AtParConstants");
var event_spinner_service_1 = require("../../components/spinner/event.spinner.service");
var atpar_trackit_common_service_1 = require("../../Shared/atpar-trackit-common.service");
var platform_browser_1 = require("@angular/platform-browser");
var TrackITBodyComponent = (function () {
    function TrackITBodyComponent(service, spinnerService, atParCommonService, httpService, title, atParConstant) {
        this.service = service;
        this.spinnerService = spinnerService;
        this.atParCommonService = atParCommonService;
        this.httpService = httpService;
        this.title = title;
        this.atParConstant = atParConstant;
        this.blnShowHeaderGrid = true;
        this.blnShowDetailsGrid = false;
        this.showDiv = true;
        this.deviceTokenEntry = [];
        this.imgBasePath = "";
        this.title.setTitle('TrackIT - Dashboard');
    }
    TrackITBodyComponent.prototype.goback = function () {
        this.blnShowHeaderGrid = true;
        this.blnShowDetailsGrid = false;
        this.showDiv = true;
    };
    TrackITBodyComponent.prototype.showOrderDetails = function (item) {
        this.orderNumber = item.ORDER_NUMBER;
        this.blnShowHeaderGrid = false;
        this.blnShowDetailsGrid = true;
        this.showDiv = true;
        this.getOrderDetails();
    };
    TrackITBodyComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setImgPath()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getOrderHeaders()];
                    case 2:
                        _a.sent();
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("tkitDeviceTokenEntry"));
                        this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        return [2 /*return*/];
                }
            });
        });
    };
    TrackITBodyComponent.prototype.setImgPath = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.atParCommonService.getServerIP()
                            .catch(this.httpService.handleError)
                            .then(function (res) {
                            var data = res.json();
                            switch (data.StatType) {
                                case AtParEnums_1.StatusType.Success: {
                                    _this.ipAddress = data.DataVariable.toString();
                                    break;
                                }
                                case AtParEnums_1.StatusType.Error: {
                                    _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                    break;
                                }
                                case AtParEnums_1.StatusType.Warn: {
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                    break;
                                }
                                case AtParEnums_1.StatusType.Custom: {
                                    _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                    break;
                                }
                            }
                            //if (data.StatType != StatusType.Success) {
                            //    html = '';
                            //    return html;
                            //}
                        })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.atParCommonService.getSSLConfigDetails()
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                _this.growlMessage = [];
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.gstrProtocal = data.Data.PROTOCOL.toString();
                                        _this.gstrServerName = data.Data.SERVER_NAME.toString();
                                        _this.gstrPortNo = data.Data.PORT_NO.toString();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                //if (data.StatType != StatusType.Success) {
                                //    html = '';
                                //    return html;
                                //}
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TrackITBodyComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    TrackITBodyComponent.prototype.OnDestroy = function () {
        this.lstOrderHeaders = [];
        this.lstOrderDetails = [];
    };
    TrackITBodyComponent.prototype.getOrderHeaders = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstOrderHeaders = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.blnShowDetailsGrid = false;
                        this.spinnerService.start();
                        return [4 /*yield*/, this.service.getOrderHeaders().
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                ;
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.showDiv = true;
                                        _this.blnShowHeaderGrid = true;
                                        _this.lstOrderHeaders = data.DataList;
                                        for (var i = 0; i < _this.lstOrderHeaders.length; i++) {
                                            var changeDate = _this.lstOrderHeaders[i].ORDER_DATE;
                                            var dateStr = new Date(changeDate).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                                            _this.lstOrderHeaders[i].ORDER_DATE = dateStr.replace(',', '');
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.blnShowHeaderGrid = false;
                                        _this.showDiv = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.blnShowHeaderGrid = false;
                                        _this.showDiv = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.blnShowHeaderGrid = false;
                                        _this.showDiv = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "getOrderHeaders");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TrackITBodyComponent.prototype.getOrderDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstOrderDetails = [];
                        this.imgBasePath = this.gstrProtocal + '://' + this.ipAddress + '/AtPar/Web/Uploaded';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.service.getOrderDetails(this.orderNumber).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                ;
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.showDiv = true;
                                        _this.blnShowDetailsGrid = true;
                                        _this.lstOrderDetails = data.DataList;
                                        console.log(data.DataList);
                                        _this.lstOrderDetails.forEach(function (item) {
                                            if (item.IMAGE == null) {
                                                item.IMAGE = '';
                                            }
                                            if (item.IMAGE != "" && item.IMAGE != null && item.IMAGE != undefined) {
                                                item.IMAGE = _this.imgBasePath + '/' + item.IMAGE;
                                            }
                                        });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.blnShowDetailsGrid = false;
                                        _this.showDiv = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.blnShowDetailsGrid = false;
                                        _this.showDiv = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.blnShowDetailsGrid = false;
                                        _this.showDiv = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "getOrderDetails");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TrackITBodyComponent = __decorate([
        core_1.Component({
            templateUrl: 'trackit.body.component.html',
            providers: [
                TkitHttpService_1.TkitHttpService,
                AtParConstants_1.AtParConstants,
                trackit_dashboard_service_1.TrackITDashBoardService,
                atpar_trackit_common_service_1.AtParTrackITCommonService
            ],
        }),
        __metadata("design:paramtypes", [trackit_dashboard_service_1.TrackITDashBoardService,
            event_spinner_service_1.SpinnerService,
            atpar_trackit_common_service_1.AtParTrackITCommonService,
            TkitHttpService_1.TkitHttpService,
            platform_browser_1.Title,
            AtParConstants_1.AtParConstants])
    ], TrackITBodyComponent);
    return TrackITBodyComponent;
}());
exports.TrackITBodyComponent = TrackITBodyComponent;
//# sourceMappingURL=trackit.body.component.js.map