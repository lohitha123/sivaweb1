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
var pou_setup_procedures_services_1 = require("../../app/PointOfUse/pou-setup-procedures.services");
var AtParEnums_1 = require("./../Shared/AtParEnums");
var datatableservice_1 = require("./../components/datatable/datatableservice");
var HttpService_1 = require("../Shared/HttpService");
var AtParConstants_1 = require("../Shared/AtParConstants");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var api_1 = require("../components/common/api");
var AtParStatusCodes_1 = require("./../Shared/AtParStatusCodes");
var routepath_1 = require("../AtPar/Menus/routepath");
var SetupProceduresComponent = (function () {
    function SetupProceduresComponent(dataservice, setupProcedureServices, httpService, spinnerService, confirmationService, atParConstant) {
        this.dataservice = dataservice;
        this.setupProcedureServices = setupProcedureServices;
        this.httpService = httpService;
        this.spinnerService = spinnerService;
        this.confirmationService = confirmationService;
        this.atParConstant = atParConstant;
        this.pop = false;
        this.page = true;
        this.addData = false;
        this.editform = false;
        this.loading = false;
        this.msgs = [];
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.isVisible = true;
        this.specialityCodes = [];
        this.systemData = [];
        this.codeType = 'procedures';
        this.pCodeNew = '';
        this.descrNew = '';
        this.isDuplicateExists = false;
        this.breadCrumbMenu = new routepath_1.Menus();
        //   this.dataservice.getdetails().then(countries => { this.sales = countries; });
        //this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        // this.recordsPerPageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        // this.intAppId = parseInt(this.appId);
    }
    SetupProceduresComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.pageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        return [4 /*yield*/, this.getSpecialityCodes()];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [2 /*return*/];
                }
            });
        });
    };
    SetupProceduresComponent.prototype.go = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.mode = "";
                this.growlMessage = [];
                this.pop = false;
                this.bindDataGrid();
                return [2 /*return*/];
            });
        });
    };
    SetupProceduresComponent.prototype.add = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.breadCrumbMenu.SUB_MENU_NAME = 'Add Procedure Code';
                this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                this.growlMessage = [];
                this.loading = true;
                this.mode = "Add";
                this.addData = true;
                this.editform = false;
                this.page = false;
                this.pop = false;
                this.pCode = '';
                this.sCode = '';
                this.descr = '';
                this.pCodeNew = '';
                this.descrNew = '';
                //   await this.getSpecialityCodes();
                this.ProcedureCodeStatus = undefined;
                this.descStatus = undefined;
                return [2 /*return*/];
            });
        });
    };
    SetupProceduresComponent.prototype.edit = function (record) {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Procedure Code';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.editform = true;
        this.addData = false;
        this.page = false;
        this.pop = false;
        this.pCodeNew = '';
        this.descrNew = '';
        this.pCode = record.PROCEDURE_CODE;
        this.sCode = record.SPECIALTY_CODE;
        this.descr = record.DESCRIPTION;
    };
    SetupProceduresComponent.prototype.close = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.growlMessage = [];
        this.addData = false;
        this.page = true;
        this.pop = false;
        this.editform = false;
        this.pCodeNew = '';
        this.descrNew = '';
    };
    SetupProceduresComponent.prototype.bindDataGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getProcedureCodes(this.codeType, '', '')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SetupProceduresComponent.prototype.getProcedureCodes = function (codeType, code, desr) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.setupProcedureServices.GetProcedureCodes(codeType, this.pCodeNew, this.descrNew)
                                .catch(this.httpService.handleError).then(function (resp) {
                                var data = resp.json();
                                _this.spinnerService.stop();
                                var griddata = data.DataList;
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.page = true;
                                        if (griddata.length > 0) {
                                            _this.procedureCodeList = griddata;
                                            var count = _this.procedureCodeList.length;
                                            _this.proceduresCount = count;
                                            _this.proceduresCount = _this.proceduresCount + " Procedure Code(s) Found";
                                            _this.pop = true;
                                            break;
                                        }
                                        else {
                                            _this.pop = false;
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        if (_this.mode == "delete") {
                                            _this.pop = false;
                                            break;
                                        }
                                        else {
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            _this.pop = false;
                                            _this.isVisible = false;
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.pop = false;
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.pop = false;
                                        _this.growlMessage = [];
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
                        this.clientErrorMsg(ex_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SetupProceduresComponent.prototype.getSpecialityCodes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.mode = "";
                        return [4 /*yield*/, this.setupProcedureServices.GetSpecialtyCodes(this.codeType, '', '')
                                .catch(this.httpService.handleError).then(function (resp) {
                                var data = resp.json();
                                _this.spinnerService.stop();
                                _this.systemData = data.DataList;
                                _this.specialityCodes = [];
                                _this.specialityCodes.push({ label: "Select Specialty / Service", value: null });
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (_this.systemData.length > 0) {
                                            for (var i = 0; i < _this.systemData.length; i++) {
                                                _this.specialityCodes.push({ label: _this.systemData[i].CODE, value: _this.systemData[i].CODE });
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        // this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage = [];
                                        // this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage = [];
                                        // this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                _this.spinnerService.stop();
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SetupProceduresComponent.prototype.addProcedureCodes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.mode = "";
                        //if (this.isDuplicateExists) {
                        //    this.growlMessage = [];
                        //    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Procedures code already exists " });
                        //    this.isDuplicateExists = false;
                        //    return;
                        //}
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (this.sCode == null) {
                            this.sCode = "";
                        }
                        this.growlMessage = [];
                        return [4 /*yield*/, this.setupProcedureServices.AddCodes(this.codeType, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.pCode, this.descr, this.sCode).forEach(function (resp) {
                                _this.spinnerService.stop();
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        //this.specialityCodes = [];
                                        //this.specialityCodes.push({ label: "Please Specialty / Servicee", value: " " })
                                        _this.loading = true;
                                        // this.pop = true;
                                        // this.bindDataGrid();
                                        var statusMessage = AtParConstants_1.AtParConstants.Created_Msg.replace("1%", "Procedure").replace("2%", _this.pCode);
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: statusMessage });
                                        _this.page = false;
                                        _this.addData = true;
                                        _this.pCode = "";
                                        _this.descr = "";
                                        _this.specialityCodes = [];
                                        _this.sCode = " ";
                                        _this.getSpecialityCodes();
                                        document.getElementById('pCodeAdd').focus();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        var statusMessage = resp.StatusMessage;
                                        if (resp.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_ALREADY_EXISTS) {
                                            var statusMessage_1 = AtParConstants_1.AtParConstants.AlreadyExist_Msg.replace("1%", "Procedure Code").replace("2%", _this.pCode);
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: statusMessage_1 });
                                            //this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Procedure Code" + statusMessage.split("1%")[1] + this.pCode });
                                        }
                                        else {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                        }
                                        _this.isVisible = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                                        break;
                                    }
                                }
                                _this.spinnerService.stop();
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_3 = _a.sent();
                        this.spinnerService.stop();
                        this.clientErrorMsg(ex_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SetupProceduresComponent.prototype.updateProcedureCodes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.spinnerService.start();
                try {
                    this.mode = "";
                    if (this.sCode == null) {
                        this.sCode = "";
                    }
                    this.setupProcedureServices.UpdateCodes(this.codeType, this.pCode, this.descr, this.sCode).forEach(function (resp) {
                        _this.spinnerService.stop();
                        switch (resp.StatType) {
                            case AtParEnums_1.StatusType.Success: {
                                // this.close();
                                // this.bindDataGrid();
                                _this.ProcedureCodeStatus = null;
                                _this.descStatus = null;
                                _this.growlMessage = [];
                                var statusMessage = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", "Procedure").replace("2%", _this.pCode);
                                _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: statusMessage });
                                document.getElementById('txtsCode').focus();
                                break;
                            }
                            case AtParEnums_1.StatusType.Warn: {
                                _this.growlMessage = [];
                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                _this.isVisible = false;
                                break;
                            }
                            case AtParEnums_1.StatusType.Error: {
                                _this.growlMessage = [];
                                _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                break;
                            }
                            case AtParEnums_1.StatusType.Custom: {
                                _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                                break;
                            }
                        }
                        _this.spinnerService.stop();
                    });
                }
                catch (ex) {
                    this.spinnerService.stop();
                    this.clientErrorMsg(ex);
                }
                return [2 /*return*/];
            });
        });
    };
    SetupProceduresComponent.prototype.deleteProcedureCodes = function (record) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.spinnerService.start();
                try {
                    this.mode = "delete";
                    this.setupProcedureServices.DeleteCodes(this.codeType, record.PROCEDURE_CODE, record.DESCRIPTION).forEach(function (resp) {
                        _this.spinnerService.stop();
                        switch (resp.StatType) {
                            case AtParEnums_1.StatusType.Success: {
                                _this.page = true;
                                _this.pop = true;
                                var statusMessage = AtParConstants_1.AtParConstants.Deleted_Msg.replace("1%", "Procedure").replace("2%", record.PROCEDURE_CODE);
                                _this.growlMessage.push({
                                    severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: statusMessage
                                });
                                _this.bindDataGrid();
                                break;
                            }
                            case AtParEnums_1.StatusType.Warn: {
                                _this.growlMessage = [];
                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                _this.isVisible = false;
                                break;
                            }
                            case AtParEnums_1.StatusType.Error: {
                                _this.growlMessage = [];
                                _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                break;
                            }
                            case AtParEnums_1.StatusType.Custom: {
                                _this.growlMessage = [];
                                _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                                break;
                            }
                        }
                        _this.spinnerService.stop();
                    });
                }
                catch (ex) {
                    this.spinnerService.stop();
                    this.clientErrorMsg(ex);
                }
                return [2 /*return*/];
            });
        });
    };
    SetupProceduresComponent.prototype.confirmDelete = function (setupProcedure) {
        var _this = this;
        try {
            this.growlMessage = [];
            this.confirmationService.confirm({
                message: 'Are you sure you want to delete this Code?',
                accept: function () { _this.deleteProcedureCodes(setupProcedure); }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    SetupProceduresComponent.prototype.clientErrorMsg = function (strExMsg) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString());
    };
    SetupProceduresComponent.prototype.bindModelDataChange = function (event) {
        try {
            if ("pCodeAdd" == event.TextBoxID.toString()) {
                this.ProcedureCodeStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("DepartmentID" == event.TextBoxID.toString()) {
                this.descStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if (this.ProcedureCodeStatus == 0) {
                if (this.descStatus == 0 || this.descStatus == undefined) {
                    this.loading = false;
                }
                else {
                    this.loading = true;
                }
            }
            else {
                this.loading = true;
            }
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg);
        }
    };
    SetupProceduresComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.pop = null;
        this.page = null;
        this.spinnerService.stop();
        this.pageSize = null;
        this.pCode = null;
        this.sCode = null;
        this.descr = null;
        this.codeType = null;
        this.pCodeNew = null;
        this.descrNew = null;
        this.descrNew = null;
        this.descrNew = null;
        this.addData = null;
        this.descStatus = null;
        this.deviceIDStatus = null;
        this.loading = null;
        this.mode = null;
        this.editform = null;
        this.macAddressStatus = null;
        this.intAppId = null;
        this.isVisible = null;
        this.proceduresCount = null;
    };
    SetupProceduresComponent = __decorate([
        core_1.Component({
            templateUrl: 'pou-setup-procedures.component.html',
            providers: [datatableservice_1.datatableservice, pou_setup_procedures_services_1.SetupProcedureServices, api_1.ConfirmationService, AtParConstants_1.AtParConstants]
        }),
        __metadata("design:paramtypes", [datatableservice_1.datatableservice, pou_setup_procedures_services_1.SetupProcedureServices, HttpService_1.HttpService,
            event_spinner_service_1.SpinnerService, api_1.ConfirmationService, AtParConstants_1.AtParConstants])
    ], SetupProceduresComponent);
    return SetupProceduresComponent;
}());
exports.SetupProceduresComponent = SetupProceduresComponent;
//# sourceMappingURL=pou-setup-procedures.component.js.map