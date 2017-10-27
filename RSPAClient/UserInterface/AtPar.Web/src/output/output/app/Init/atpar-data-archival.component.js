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
var datatableservice_1 = require("./../components/datatable/datatableservice");
var HttpService_1 = require("../Shared/HttpService");
var AtParConstants_1 = require("../Shared/AtParConstants");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParEnums_1 = require("./../Shared/AtParEnums");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var atpar_data_archival_service_1 = require("./atpar-data-archival.service");
var api_1 = require("../components/common/api");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var DataArchival = (function () {
    function DataArchival(dataservice, spinnerService, atParConstant, httpService, dataArchivalService, confirmationService) {
        this.dataservice = dataservice;
        this.spinnerService = spinnerService;
        this.atParConstant = atParConstant;
        this.httpService = httpService;
        this.dataArchivalService = dataArchivalService;
        this.confirmationService = confirmationService;
        this.table = false;
        this.form = false;
        this._deviceTokenEntry = [];
        this.ddlProductType = [];
        this.growlMessage = [];
        this.lstproducts = [];
    }
    DataArchival.prototype.btnGo_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.dataArchivalService.doArchivalData(this.selectedProduct, this.formateDate(this.archiveDate))
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var atweb = res.json();
                                _this.spinnerService.stop();
                                switch (atweb.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.bindProducts();
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Data Purge is Successful" });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        if (atweb.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_NO_ARCHIVE_DATABASE) {
                                            _this.growlMessage.push({
                                                severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please set archive database details in Configuration Manager Screen'
                                            });
                                        }
                                        else if (atweb.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_INVALID_ARCHIVE_DATABASE) {
                                            _this.growlMessage.push({
                                                severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please set valid database details in Configuration Manager Screen'
                                            });
                                        }
                                        else if (atweb.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                            _this.growlMessage.push({
                                                severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data found to Purge"
                                            });
                                        }
                                        else {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Error occured while data purging " });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Error occured while data purging " });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: atweb.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Error occured while data purging " });
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DataArchival.prototype.close = function () {
        this.table = true;
        this.form = false;
    };
    DataArchival.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var exMsg_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.appID = (AtParEnums_1.EnumApps.Auth).toString();
                        this.menuCode = 'mt_atpar_data_archival.aspx';
                        this.spinnerService.start();
                        return [4 /*yield*/, this.bindProducts()];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        exMsg_1 = _a.sent();
                        this.clientErrorMsg(exMsg_1, "ngOnInit");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DataArchival.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString, funName, this.constructor.name);
    };
    DataArchival.prototype.bindProducts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.ddlProductType = [];
                        this.ddlProductType.push({ label: "Select One", value: "Select One" });
                        return [4 /*yield*/, this.dataArchivalService.getPurgeAppIDs()
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var atweb = res.json();
                                switch (atweb.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstproducts = atweb.DataList;
                                        for (var i = 0; i < _this.lstproducts.length; i++) {
                                            _this.ddlProductType.push({ label: _this.lstproducts[i].APP_NAME, value: _this.lstproducts[i].APP_ID });
                                        }
                                        //var currentDate = new Date().getMonth().toString() + "/" + new Date().getDay().toString() + "/" + new Date().getFullYear();
                                        _this.archiveDate = _this.formateDate(new Date().toDateString());
                                        _this.selectedProduct = _this.ddlProductType[0].value;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        if (atweb.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Products found for data purging " });
                                        }
                                        else {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: atweb.StatusMessage });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: atweb.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: atweb.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_2 = _a.sent();
                        this.spinnerService.stop();
                        this.clientErrorMsg(ex_2, "bindProducts");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DataArchival.prototype.formateDate = function (date) {
        //var customDate = new Date(date).getMonth().toString() + "/" + new Date(date).getDay().toString() + "/" + new Date(date).getFullYear();
        var today = new Date(date);
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        today = mm + '/' + dd + '/' + yyyy;
        return today;
        //return this.archiveDate;
    };
    DataArchival.prototype.confirm = function () {
        var _this = this;
        try {
            this.growlMessage = [];
            if (this.selectedProduct == "Select One") {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Select Product' });
                return;
            }
            // var rowData: any;
            var compareDates = new Date(this.archiveDate);
            var currentDate = new Date();
            if (compareDates.getTime() > currentDate.getTime()) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Todate must be less than or equal to current date " });
                return;
            }
            this.confirmationService.confirm({
                message: 'Are you sure you want to archive the data ? ',
                accept: function () {
                    _this.btnGo_Click();
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "confirm");
        }
    };
    DataArchival.prototype.ngOnDestroy = function () {
        this._deviceTokenEntry = [];
        this.growlMessage = [];
        this.ddlProductType = [];
        this.lstproducts = [];
        this.spinnerService.stop();
        this.archiveDate = null;
    };
    DataArchival = __decorate([
        core_1.Component({
            templateUrl: 'atpar-data-archival.component.html',
            providers: [atpar_common_service_1.AtParCommonService, HttpService_1.HttpService, datatableservice_1.datatableservice, atpar_data_archival_service_1.DataArchivalService, AtParConstants_1.AtParConstants, api_1.ConfirmationService]
        }),
        __metadata("design:paramtypes", [datatableservice_1.datatableservice,
            event_spinner_service_1.SpinnerService,
            AtParConstants_1.AtParConstants,
            HttpService_1.HttpService,
            atpar_data_archival_service_1.DataArchivalService,
            api_1.ConfirmationService])
    ], DataArchival);
    return DataArchival;
}());
exports.DataArchival = DataArchival;
//# sourceMappingURL=atpar-data-archival.component.js.map