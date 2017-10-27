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
var atpar_setup_reasons_services_1 = require("../../app/Init/atpar-setup-reasons.services");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var HttpService_1 = require("../Shared/HttpService");
var AtParConstants_1 = require("../Shared/AtParConstants");
var AtParEnums_1 = require("../Shared/AtParEnums");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var api_1 = require("../components/common/api");
var datatable_1 = require("../components/datatable/datatable");
var routepath_1 = require("../AtPar/Menus/routepath");
var SetupReasonsComponent = (function () {
    /**
     * Constructor
     * @param SetupReasonsServices
     * @param ConfirmationService
     * @param httpService
     * @param spinnerService
     * @param atParConstant
     */
    function SetupReasonsComponent(spinnerService, setupReasonsServices, httpService, atParConstant, confirmationService) {
        this.spinnerService = spinnerService;
        this.setupReasonsServices = setupReasonsServices;
        this.httpService = httpService;
        this.atParConstant = atParConstant;
        this.confirmationService = confirmationService;
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.txtReasonCode = "";
        this.txtDesc = "";
        this.txtNewReasonCode = "";
        this.txtNewDesc = "";
        this.lblReasonCode = "";
        this.txtUpDesc = "";
        this.strReasonCode = "reasons";
        this.noOfReasonCodesMessage = "";
        this.isVisible = false;
        this.page = true;
        this.addForm = false;
        this.editForm = false;
        this.loading = false;
        this.statusCode = -1;
        this.reasonCodeStatus = 0;
        this.modeDelete = false;
        this.newDescStatus = 0;
        this.newUpDescStatus = 0;
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    /**
    * Init Function for getting all the ReasonCodse data  when page load
    */
    SetupReasonsComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                this.intAppId = parseInt(this.appId);
                if (this.intAppId == AtParEnums_1.EnumApps.PointOfUse) {
                    this.pageTitle = "Point of Use > Setup Reasons ";
                }
                else {
                    this.pageTitle = "AtPaRx > Setup Reasons ";
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Getting data from database and bind records to data table
     */
    SetupReasonsComponent.prototype.bindDataGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        this.noOfReasonCodesMessage = "";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.setupReasonsServices.getCodes(this.strReasonCode, this.txtReasonCode, this.txtDesc).catch(this.httpService.handleError)
                                .then(function (response) {
                                var data = response.json();
                                _this.lstReasonsCode = response.json().DataList;
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.page = true;
                                        if (_this.lstReasonsCode.length > 0) {
                                            _this.noOfReasonCodesMessage = _this.lstReasonsCode.length + " reason code(s) found";
                                            _this.isVisible = true;
                                            break;
                                        }
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        if (_this.modeDelete == true) {
                                            _this.isVisible = false;
                                            _this.modeDelete = false;
                                            break;
                                        }
                                        else {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            _this.isVisible = false;
                                            break;
                                        }
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.isVisible = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "bindDataGrid");
                        return [3 /*break*/, 5];
                    case 4:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * this method is calling when click on Go button
    */
    SetupReasonsComponent.prototype.btn_GetReasonCodes = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isVisible = false;
                        return [4 /*yield*/, this.bindDataGrid()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
    * Save Button Enable & Disabled
    * @param event
    */
    SetupReasonsComponent.prototype.bindModelDataChange = function (event) {
        try {
            if (this.mode == AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Add].toString()) {
                if ("txtNewReasonCode" == event.TextBoxID.toString()) {
                    this.reasonCodeStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if ("txtNewDesc" == event.TextBoxID.toString()) {
                    this.newDescStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if (this.reasonCodeStatus >= 1 || this.reasonCodeStatus == undefined || this.newDescStatus >= 1 || this.newDescStatus == undefined) {
                    this.loading = true;
                }
                else {
                    if (this.txtNewReasonCode == undefined || this.txtNewReasonCode == "") {
                        this.loading = true;
                    }
                    else {
                        this.loading = false;
                    }
                }
            }
            if (this.mode == AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Edit].toString()) {
                if ("txtUpDesc" == event.TextBoxID.toString()) {
                    this.newUpDescStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if (this.newUpDescStatus == undefined || this.newUpDescStatus == 0) {
                    this.loading = false;
                }
                else {
                    this.loading = true;
                }
            }
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "bindModelDataChange");
        }
    };
    /**
    * this method is calling when click on Add button and display Create form
    */
    SetupReasonsComponent.prototype.add = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Reason';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.txtNewReasonCode = "";
        this.txtNewDesc = "";
        this.growlMessage = [];
        this.addForm = true;
        this.editForm = false;
        this.mode = AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Add].toString();
        this.page = false;
        this.isVisible = false;
        this.loading = true;
        this.reasonCodeStatus = undefined;
    };
    /**
    * this method is calling when click on Save button in CreateForm
    */
    SetupReasonsComponent.prototype.btn_SaveReasonCode = function ($event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        this.txtReasonCode = "";
                        this.txtDesc = "";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.setupReasonsServices.addCodes(this.strReasonCode, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.txtNewReasonCode, this.txtNewDesc, "").
                                catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                _this.statusCode = response.StatusCode;
                                _this.spinnerService.stop();
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        var statusmsg = AtParConstants_1.AtParConstants.Created_Msg.replace("1%", "Reason Code").replace("2%", _this.txtNewReasonCode);
                                        _this.growlMessage.push({
                                            severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: statusmsg
                                        });
                                        _this.txtNewReasonCode = "";
                                        _this.txtNewDesc = "";
                                        _this.loading = true;
                                        document.getElementById("txtNewReasonCode").focus();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        if (response.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage + _this.txtNewReasonCode });
                                            break;
                                        }
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        if (response.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL) {
                                            _this.growlMessage.push({
                                                severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Reason Code" + " " + _this.txtNewReasonCode + " Already Exists "
                                            });
                                            break;
                                        }
                                        else {
                                            _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                            break;
                                        }
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "btn_SaveReasonCode");
                        return [3 /*break*/, 5];
                    case 4:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * this method is calling when click on edit button in Datatable
    */
    SetupReasonsComponent.prototype.edit = function (setupReason) {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Reason';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.growlMessage = [];
        this.editForm = true;
        this.addForm = false;
        this.page = false;
        this.loading = false;
        this.isVisible = false;
        this.lblReasonCode = setupReason.CODE;
        this.txtUpDesc = setupReason.DESCRIPTION;
        this.mode = AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Edit].toString();
    };
    /**
  * this method is calling when click on Save button in editForm
  */
    SetupReasonsComponent.prototype.btn_UpdateReasonCode = function ($event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        this.txtReasonCode = "";
                        this.txtDesc = "";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.setupReasonsServices.updateCodes(this.strReasonCode, this.lblReasonCode, this.txtUpDesc, "")
                                .catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                _this.statusCode = response.StatusCode;
                                _this.spinnerService.stop();
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        var statusmsg = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", "Reason Code").replace("2%", _this.lblReasonCode);
                                        _this.growlMessage.push({
                                            severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: statusmsg
                                        });
                                        document.getElementById('txtUpDesc').focus();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        if (response.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage + _this.lblReasonCode });
                                            break;
                                        }
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "btn_UpdateReasonCode");
                        return [3 /*break*/, 5];
                    case 4:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SetupReasonsComponent.prototype.confirmDelete = function (setupReason) {
        var _this = this;
        try {
            this.growlMessage = [];
            this.confirmationService.confirm({
                message: 'Are you sure you want to delete this Reason Code ' + setupReason.CODE + '?',
                accept: function () { _this.btn_Delete(setupReason); }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "confirmDelete");
        }
    };
    /**
  * this method is calling when click on Delete button in Datatable
  */
    SetupReasonsComponent.prototype.btn_Delete = function (setupReason) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        this.strCode = setupReason.CODE;
                        this.strDescr = setupReason.DESCRIPTION;
                        this.txtReasonCode = "";
                        this.txtDesc = "";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.setupReasonsServices.deleteCodes(this.strReasonCode, this.strCode, this.strDescr).catch(this.httpService.handleError)
                                .then(function (res) {
                                var response = res.json();
                                _this.statusCode = response.StatusCode;
                                _this.spinnerService.stop();
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.modeDelete = true;
                                        _this.isVisible = true;
                                        _this.bindDataGrid();
                                        var statusmsg = AtParConstants_1.AtParConstants.Deleted_Msg.replace("1%", "Reason Code").replace("2%", _this.strCode);
                                        _this.growlMessage.push({
                                            severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: statusmsg
                                        });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        if (response.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage + _this.strCode });
                                            break;
                                        }
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "btn_Delete");
                        return [3 /*break*/, 5];
                    case 4:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * This method is calling when  close the edit form and add form
    */
    SetupReasonsComponent.prototype.close = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.noOfReasonCodesMessage = "";
        this.addForm = false;
        this.page = true;
        this.editForm = false;
        this.growlMessage = [];
        this.txtReasonCode = "";
        this.txtDesc = "";
    };
    /**
        * This method is for displaying catch block error messages
        * @param event
        */
    SetupReasonsComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString()(), funName, this.constructor.name);
    };
    /**
     * This method is for clearing all the variables
     * @param event
     */
    SetupReasonsComponent.prototype.ngOnDestroy = function () {
        this.spinnerService.stop();
        this.spinnerService = null;
        this.lstReasonsCode = null;
        this.strCode = null;
        this.strDescr = null;
        this.txtReasonCode = null;
        this.txtDesc = null;
        this.strReasonCode = null;
        this.txtNewReasonCode = null;
        this.txtNewDesc = null;
        this.reasonCodeStatus = undefined;
        this.newDescStatus = undefined;
        this.newUpDescStatus = undefined;
        this.noOfReasonCodesMessage = null;
        this.deviceTokenEntry = null;
        this.pageTitle = null;
        this.lblReasonCode = null;
        this.txtUpDesc = null;
    };
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], SetupReasonsComponent.prototype, "dataTableComponent", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SetupReasonsComponent.prototype, "appId", void 0);
    SetupReasonsComponent = __decorate([
        core_1.Component({
            selector: 'atpar-setup-reasons',
            templateUrl: 'atpar-setup-reasons.component.html',
            providers: [atpar_setup_reasons_services_1.SetupReasonsServices, api_1.ConfirmationService, HttpService_1.HttpService, AtParConstants_1.AtParConstants]
        }),
        __metadata("design:paramtypes", [event_spinner_service_1.SpinnerService,
            atpar_setup_reasons_services_1.SetupReasonsServices,
            HttpService_1.HttpService,
            AtParConstants_1.AtParConstants,
            api_1.ConfirmationService])
    ], SetupReasonsComponent);
    return SetupReasonsComponent;
}());
exports.SetupReasonsComponent = SetupReasonsComponent;
//# sourceMappingURL=atpar-setup-reasons.component.js.map