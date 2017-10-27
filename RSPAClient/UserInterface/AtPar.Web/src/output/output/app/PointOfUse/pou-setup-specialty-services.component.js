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
var AtParConstants_1 = require("../Shared/AtParConstants");
var HttpService_1 = require("../Shared/HttpService");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var api_1 = require("../components/common/api");
var pou_setup_specialty_services_service_1 = require("./pou-setup-specialty-services.service");
var datatable_1 = require("../components/datatable/datatable");
var routepath_1 = require("../AtPar/Menus/routepath");
var SetupSpecialtyServiceComponent = (function () {
    /**
    * Constructor
    * @param SetupSpecialtyServices
    * @param ConfirmationService
    * @param spinnerService
    * @param atParConstant
    */
    function SetupSpecialtyServiceComponent(confirmationService, atParConstant, setupSpecialtyServices, spinnerService, httpService) {
        this.confirmationService = confirmationService;
        this.atParConstant = atParConstant;
        this.setupSpecialtyServices = setupSpecialtyServices;
        this.spinnerService = spinnerService;
        this.httpService = httpService;
        /*Varaible Declaration*/
        this.isVisible = false;
        this.page = true;
        this.addForm = false;
        this.editForm = false;
        this.loading = false;
        this.isExist = false;
        this.modeDelete = false;
        this.lblSpecialtyCode = "";
        this.txtSpecialtyCode = "";
        this.txtDesc = "";
        this.txtNewSpecialtyCode = "";
        this.txtNewDesc = "";
        this.txtUpdesc = "";
        this.noOfSpecialtyCodesMessage = "";
        this.deviceTokenEntry = [];
        this.strProcedureCode = "procedures";
        this.strSpecialtyCode = "specialty";
        this.specialityCodeStatus = 0;
        this.newDescStatus = 0;
        this.newUpDescStatus = 0;
        this.growlMessage = [];
        this.statusCode = -1;
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    /**
    * Init Function for getting SpecialtyServiceCodes data when page loading
    */
    SetupSpecialtyServiceComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                return [2 /*return*/];
            });
        });
    };
    /**
    * Getting data from database and bind records to data table
    */
    SetupSpecialtyServiceComponent.prototype.bindDataGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        this.noOfSpecialtyCodesMessage = "";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.setupSpecialtyServices.getSpecialtyCodes(this.strSpecialtyCode, this.txtSpecialtyCode, this.txtDesc).catch(this.httpService.handleError)
                                .then(function (response) {
                                var data = response.json();
                                _this.lstSpecialtyCode = response.json().DataList;
                                _this.statusCode = data.StatusCode;
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.page = true;
                                        if (_this.lstSpecialtyCode.length > 0) {
                                            _this.noOfSpecialtyCodesMessage = _this.lstSpecialtyCode.length + " Specialty / Service Code(s) Found ";
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
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
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
                        this.clientErrorMsg(ex_1);
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
    SetupSpecialtyServiceComponent.prototype.btn_GetSpecialtyCodes = function () {
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
    SetupSpecialtyServiceComponent.prototype.bindModelDataChange = function (event) {
        try {
            if (this.mode == AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Add].toString()) {
                if ("txtNewSpecialtyCode" == event.TextBoxID.toString()) {
                    this.specialityCodeStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if ("txtNewDesc" == event.TextBoxID.toString()) {
                    this.newDescStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if (this.specialityCodeStatus >= 1 || this.specialityCodeStatus == undefined || this.newDescStatus >= 1 || this.newDescStatus == undefined) {
                    this.loading = true;
                }
                else {
                    if (this.txtNewSpecialtyCode == undefined || this.txtNewSpecialtyCode == "") {
                        this.loading = true;
                    }
                    else {
                        this.loading = false;
                    }
                }
            }
            if (this.mode == AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Edit].toString()) {
                if ("txtUpdesc" == event.TextBoxID.toString()) {
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
            this.clientErrorMsg(exMsg);
        }
    };
    /**
    * this method is calling when click on Add button and display Create form
    */
    SetupSpecialtyServiceComponent.prototype.add = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Speciality / Service';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.txtNewSpecialtyCode = "";
        this.txtNewDesc = "";
        this.growlMessage = [];
        this.addForm = true;
        this.editForm = false;
        this.page = false;
        this.isVisible = false;
        this.mode = AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Add].toString();
        this.loading = true;
        this.specialityCodeStatus = undefined;
    };
    /**
    * this method is calling when click on Save button in CreateForm
    */
    SetupSpecialtyServiceComponent.prototype.btn_SaveSpecialtyCode = function ($event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        this.txtSpecialtyCode = "";
                        this.txtDesc = "";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.setupSpecialtyServices.addCodes(this.strSpecialtyCode, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.txtNewSpecialtyCode, this.txtNewDesc, "").
                                catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                _this.statusCode = response.StatusCode;
                                _this.spinnerService.stop();
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        var statusmsg = AtParConstants_1.AtParConstants.Created_Msg.replace("1%", "Specialty / Service Code").replace("2%", _this.txtNewSpecialtyCode);
                                        _this.growlMessage.push({
                                            severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: statusmsg
                                        });
                                        _this.txtNewSpecialtyCode = "";
                                        _this.txtNewDesc = "";
                                        document.getElementById("txtNewSpecialtyCode").focus();
                                        _this.loading = true;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        if (response.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage + _this.txtNewSpecialtyCode });
                                            break;
                                        }
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        if (response.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL) {
                                            _this.growlMessage.push({
                                                severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Specialty / Service Code" + " " + _this.txtNewSpecialtyCode + " Already Exists "
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
                        this.clientErrorMsg(ex_2);
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
    SetupSpecialtyServiceComponent.prototype.edit = function (rowData) {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Speciality / Service';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.growlMessage = [];
        this.editForm = true;
        this.addForm = false;
        this.page = false;
        this.isVisible = false;
        this.loading = false;
        this.mode = AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Edit].toString();
        this.lblSpecialtyCode = rowData.CODE;
        this.txtUpdesc = rowData.DESCRIPTION;
    };
    /**
    * this method is calling when click on Save button in editForm
    */
    SetupSpecialtyServiceComponent.prototype.btn_UpdateSpecialtyCode = function ($event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        this.txtSpecialtyCode = "";
                        this.txtDesc = "";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.setupSpecialtyServices.updateCodes(this.strSpecialtyCode, this.lblSpecialtyCode, this.txtUpdesc, "")
                                .catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                _this.statusCode = response.StatusCode;
                                _this.spinnerService.stop();
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        var statusmsg = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", "Specialty / Service Code").replace("2%", _this.lblSpecialtyCode);
                                        _this.growlMessage.push({
                                            severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: statusmsg
                                        });
                                        document.getElementById('txtUpdesc').focus();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        if (response.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage + _this.lblSpecialtyCode });
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
                        this.clientErrorMsg(ex_3);
                        return [3 /*break*/, 5];
                    case 4:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SetupSpecialtyServiceComponent.prototype.confirmDelete = function (rowData) {
        var _this = this;
        try {
            this.growlMessage = [];
            this.confirmationService.confirm({
                message: 'Are you sure you want to delete this Code?',
                accept: function () { _this.btn_Delete(rowData); }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    /**
    * this method is calling when click on Delete button in Datatable
    */
    SetupSpecialtyServiceComponent.prototype.btn_Delete = function (rowData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        this.txtSpecialtyCode = "";
                        this.txtDesc = "";
                        this.strCode = rowData.CODE;
                        this.strDesc = rowData.DESCRIPTION;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, 6, 7]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.setupSpecialtyServices.getProcedureCodes(this.strProcedureCode, "", "").catch(this.httpService.handleError)
                                .then(function (response) {
                                var data = response.json();
                                _this.statusCode = data.StatusCode;
                                _this.lstProcedureCode = response.json().DataList;
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        for (var i = 0; i <= _this.lstProcedureCode.length - 1; i++) {
                                            if (_this.lstProcedureCode[i].SCODE == _this.strCode) {
                                                _this.isExist = true;
                                            }
                                        }
                                        if (_this.isExist == true) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "This Specialty / Service is assigned to a procedure.Unassign before delete." });
                                            break;
                                        }
                                        else {
                                            break;
                                        }
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        if (_this.lstProcedureCode.length == 0) {
                                            break;
                                        }
                                        else {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            break;
                                        }
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
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
                        if (!(this.isExist == false)) return [3 /*break*/, 4];
                        this.spinnerService.start();
                        return [4 /*yield*/, this.setupSpecialtyServices.deleteCodes(this.strSpecialtyCode, this.strCode, this.strDesc).catch(this.httpService.handleError)
                                .then(function (response) {
                                var data = response.json();
                                _this.statusCode = data.StatusCode;
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.modeDelete = true;
                                        _this.isVisible = true;
                                        _this.bindDataGrid();
                                        var statusmsg = AtParConstants_1.AtParConstants.Deleted_Msg.replace("1%", "Specialty / Service Code").replace("2%", _this.strCode);
                                        _this.growlMessage.push({
                                            severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: statusmsg
                                        });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage + _this.strCode });
                                            break;
                                        }
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        this.isExist = false;
                        return [3 /*break*/, 7];
                    case 5:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4);
                        return [3 /*break*/, 7];
                    case 6:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * This method is calling when  close the edit form and add form
    */
    SetupSpecialtyServiceComponent.prototype.close = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.noOfSpecialtyCodesMessage = "";
        this.addForm = false;
        this.page = true;
        this.editForm = false;
        this.growlMessage = [];
        this.txtSpecialtyCode = "";
        this.txtDesc = "";
    };
    /**
     * This method is for displaying catch block error messages
     * @param event
     */
    SetupSpecialtyServiceComponent.prototype.clientErrorMsg = function (strExMsg) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString());
    };
    /**
     * This method is for clearing all the variables
     * @param event
     */
    SetupSpecialtyServiceComponent.prototype.ngOnDestroy = function () {
        this.spinnerService.stop();
        this.spinnerService = null;
        this.lstSpecialtyCode = null;
        this.strCode = null;
        this.strDesc = null;
        this.txtSpecialtyCode = null;
        this.txtDesc = null;
        this.strProcedureCode = null;
        this.strSpecialtyCode = null;
        this.txtNewDesc = null;
        this.txtNewSpecialtyCode = null;
        this.noOfSpecialtyCodesMessage = null;
        this.deviceTokenEntry = null;
        this.txtUpdesc = null;
        this.specialityCodeStatus = undefined;
        this.newDescStatus = undefined;
        this.newUpDescStatus = undefined;
        this.lstProcedureCode = null;
    };
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], SetupSpecialtyServiceComponent.prototype, "dataTableComponent", void 0);
    SetupSpecialtyServiceComponent = __decorate([
        core_1.Component({
            templateUrl: 'pou-setup-specialty-services.component.html',
            providers: [pou_setup_specialty_services_service_1.SetupSpecialtyServices, AtParConstants_1.AtParConstants, api_1.ConfirmationService, HttpService_1.HttpService]
        }),
        __metadata("design:paramtypes", [api_1.ConfirmationService,
            AtParConstants_1.AtParConstants,
            pou_setup_specialty_services_service_1.SetupSpecialtyServices,
            event_spinner_service_1.SpinnerService,
            HttpService_1.HttpService])
    ], SetupSpecialtyServiceComponent);
    return SetupSpecialtyServiceComponent;
}());
exports.SetupSpecialtyServiceComponent = SetupSpecialtyServiceComponent;
//# sourceMappingURL=pou-setup-specialty-services.component.js.map