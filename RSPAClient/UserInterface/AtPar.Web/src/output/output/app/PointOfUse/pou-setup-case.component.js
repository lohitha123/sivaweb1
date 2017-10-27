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
var AtParEnums_1 = require("./../Shared/AtParEnums");
var datatableservice_1 = require("./../components/datatable/datatableservice");
var HttpService_1 = require("../Shared/HttpService");
var AtParConstants_1 = require("../Shared/AtParConstants");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var api_1 = require("../components/common/api");
var AtParStatusCodes_1 = require("./../Shared/AtParStatusCodes");
var pou_setup_case_service_1 = require("./pou-setup-case.service");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var routepath_1 = require("../AtPar/Menus/routepath");
var SetupCaseComponent = (function () {
    function SetupCaseComponent(dataservice, httpService, pouSetupCaseService, commonService, spinnerService, confirmationService, atParConstant) {
        this.dataservice = dataservice;
        this.httpService = httpService;
        this.pouSetupCaseService = pouSetupCaseService;
        this.commonService = commonService;
        this.spinnerService = spinnerService;
        this.confirmationService = confirmationService;
        this.atParConstant = atParConstant;
        this.searchFrom = true;
        this.showGrid = false;
        this.addFrom = false;
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.searchPhysicianNgModel = " ";
        this.searchProcedureCodeNgModel = " ";
        this.caseIDNgModel = "";
        this.caseDescNgModel = "";
        this.physicianddlNgModel = "";
        this.patientIDNgModel = "";
        this.roomNoNgModel = "";
        this.preferenceCardNgModel = "";
        this.procedureCodeNgModel = "";
        this.statusTypeNgModel = "";
        this.ddlProcedure = [];
        this.ddlPreferencess = [];
        this.saveButton = true;
        this.isDuplicateExists = false;
        this.ddlPhysician = [];
        this.setupCaseDate = new Date();
        this.isDisabled = false;
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    ;
    SetupCaseComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var exMsg_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.pageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        this.spinnerService.stop();
                        return [4 /*yield*/, this.commonService.getOrgGroupParamValue("CASE_PICK_INTERFACE", AtParEnums_1.EnumApps.PointOfUse, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID])
                                .catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                _this.orgGrpParamName = response.DataVariable;
                                if (_this.orgGrpParamName == "HeadersandDetails") {
                                    _this.isDisabled = true;
                                }
                                else {
                                    _this.isDisabled = false;
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        exMsg_1 = _a.sent();
                        this.clientErrorMsg(exMsg_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SetupCaseComponent.prototype.addSetupCase = function () {
        return __awaiter(this, void 0, void 0, function () {
            var changeDate, dateStr, date;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.breadCrumbMenu.SUB_MENU_NAME = 'Setup Case';
                        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        this.spinnerService.start();
                        this.spinnerService.stop();
                        this.growlMessage = [];
                        this.searchFrom = false;
                        this.showGrid = false;
                        this.mode = "Add";
                        this.addFrom = true;
                        this.ddlProcedure = [];
                        this.ddlProcedure.push({ label: "Select Procedure", value: "" });
                        this.procedureCodeNgModel = "Select Procedure";
                        this.ddlPreferencess = [];
                        this.ddlPreferencess.push({ label: "Select Preference", value: "" });
                        this.preferenceCardNgModel = "Select Preference";
                        this.saveButton = true;
                        this.setupCaseDate = null;
                        return [4 /*yield*/, this.ddlpopulatePhysician()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.ddlPreferncess()];
                    case 2:
                        _a.sent();
                        this.physicianddlNgModel = "Select Physician";
                        this.ddlStatusType = [];
                        this.ddlStatusType.push({ label: "Select Status", value: "" });
                        this.ddlStatusType.push({ label: 'OPEN', value: 1 });
                        this.ddlStatusType.push({ label: 'PENDING', value: 2 });
                        changeDate = new Date();
                        dateStr = new Date(changeDate).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                        date = new Date(dateStr);
                        this.setupCaseDate = date.toLocaleDateString().replace(',', ' ');
                        this.statusTypeNgModel = "Select Status";
                        this.searchPhysicianNgModel = "";
                        this.searchProcedureCodeNgModel = "";
                        return [2 /*return*/];
                }
            });
        });
    };
    SetupCaseComponent.prototype.btn_go = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.mode = " ";
                        this.growlMessage = [];
                        this.showGrid = false;
                        return [4 /*yield*/, this.BindGrid()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SetupCaseComponent.prototype.clientErrorMsg = function (strExMsg) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString());
    };
    SetupCaseComponent.prototype.close = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.addFrom = false;
        this.showGrid = false;
        this.searchFrom = true;
        this.caseIDNgModel = "";
        this.caseDescNgModel = "";
        this.patientIDNgModel = "";
        this.roomNoNgModel = "";
        this.procedureCodeNgModel = "Select Procedure";
        this.statusTypeNgModel = "Select Status";
        this.preferenceCardNgModel = "Select Preference";
        this.physicianddlNgModel = "Select Physician";
        this.growlMessage = [];
        this.setupCaseDate = null;
    };
    SetupCaseComponent.prototype.BindGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.lstGridData = [];
                        this.spinnerService.start();
                        return [4 /*yield*/, this.pouSetupCaseService.getCaseInfo(this.searchPhysicianNgModel.trim(), this.searchProcedureCodeNgModel.trim(), this.deviceTokenEntry)
                                .catch(this.httpService.handleError).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                var data, casedata, count, selRows;
                                return __generator(this, function (_a) {
                                    data = res.json();
                                    this.spinnerService.stop();
                                    switch (data.StatType) {
                                        case AtParEnums_1.StatusType.Success:
                                            {
                                                casedata = res.json().DataList;
                                                if (casedata.length >= 0) {
                                                    this.lstGridData = casedata;
                                                    this.lstGridData = this.lstGridData.reverse();
                                                    //  this.lstGridData = this.lstGridData.sort(x => x.CASE_ID);
                                                    this.showGrid = true;
                                                    count = casedata.length;
                                                    this.setupCaseCount = count;
                                                    this.setupCaseCount = this.setupCaseCount + " Case(s) Found";
                                                    if (this.mode == "Add") {
                                                        if (this.lstGridData != null) {
                                                            selRows = this.lstGridData.filter(function (x) { return x.CASE_ID == _this.caseIDNgModel && x.PREF_LIST_ID ==
                                                                _this.preferenceCardNgModel && x.PROCEDURE_ID == _this.procedureCodeNgModel; });
                                                            if (selRows.length > 0) {
                                                                this.isDuplicateExists = true;
                                                            }
                                                        }
                                                        this.showGrid = false;
                                                    }
                                                }
                                                else {
                                                    this.showGrid = false;
                                                }
                                            }
                                            break;
                                        case AtParEnums_1.StatusType.Warn: {
                                            this.showGrid = false;
                                            if (this.deleteMode == "delete") {
                                                this.deleteMode = "";
                                            }
                                            else {
                                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            }
                                            this.deleteMode = "";
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Error: {
                                            this.showGrid = false;
                                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Custom: {
                                            this.showGrid = false;
                                            this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                            break;
                                        }
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1);
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SetupCaseComponent.prototype.confirmDelete = function (setupCase) {
        var _this = this;
        try {
            this.growlMessage = [];
            this.confirmationService.confirm({
                message: 'Are you sure you want to delete this case?',
                accept: function () {
                    _this.DeleteCaseID(setupCase);
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    SetupCaseComponent.prototype.DeleteCaseID = function (setupCase) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.spinnerService.start();
                try {
                    this.pouSetupCaseService.deleteCaseID(setupCase.CASE_ID, setupCase.PREF_LIST_ID, setupCase.PROCEDURE_ID).
                        catch(this.httpService.handleError).then(function (res) {
                        var data = res.json();
                        _this.spinnerService.stop();
                        _this.growlMessage = [];
                        switch (data.StatType) {
                            case AtParEnums_1.StatusType.Success: {
                                //  let statusMessage = AtParConstants.Deleted_Msg.replace("1%", "Procedure").replace("2%",);
                                var statusMessage = AtParConstants_1.AtParConstants.Deleted_Msg.replace("1%", "Case").replace("2%", setupCase.CASE_ID);
                                _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: statusMessage });
                                //this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: " delete Sucessfully" });
                                _this.deleteMode = "delete";
                                _this.BindGrid();
                                break;
                            }
                            case AtParEnums_1.StatusType.Warn: {
                                _this.growlMessage = [];
                                _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                _this.showGrid = false;
                                break;
                            }
                            case AtParEnums_1.StatusType.Error: {
                                _this.growlMessage = [];
                                _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                break;
                            }
                            case AtParEnums_1.StatusType.Custom: {
                                _this.growlMessage = [];
                                _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
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
    SetupCaseComponent.prototype.ddlpopulatePhysician = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getPhysicians().
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.ddlPhysician = [];
                                        _this.ddlPhysician.push({ label: "Select Physician", value: "" });
                                        if (data.DataList.length > 0) {
                                            for (var i = 0; i <= data.DataList.length - 1; i++) {
                                                _this.ddlPhysician.push({ label: data.DataList[i].PHYSICIAN_ID + "-" + data.DataList[i].FIRST_NAME + " " + data.DataList[i].MIDDLE_INITIAL + " " + data.DataList[i].LAST_NAME + "(" + data.DataList[i].PHYSICIAN_ID + ")", value: data.DataList[i].PHYSICIAN_ID });
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        // this.growlMessage = [];
                                        // this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        // this.growlMessage = [];
                                        // this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        // this.growlMessage = [];
                                        // this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2);
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SetupCaseComponent.prototype.ddlPreferncess = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.pouSetupCaseService.getPreferenceListIDs(this.deviceTokenEntry).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.ddlPreferencess = [];
                                        _this.ddlPreferencess.push({ label: "Select Preference", value: "" });
                                        if (data.DataList.length > 0) {
                                            _this.preferencessData = data.DataList;
                                            for (var i = 0; i <= data.DataList.length - 1; i++) {
                                                _this.ddlPreferencess.push({ label: data.DataList[i].PREF_LIST_ID + "-" + data.DataList[i].PREF_LIST_DESCR, value: data.DataList[i].PREF_LIST_ID });
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        //  this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
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
                            })];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SetupCaseComponent.prototype.addCaseDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var statusMessage, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.BindGrid()];
                    case 1:
                        _a.sent();
                        if (!this.isDuplicateExists) return [3 /*break*/, 2];
                        this.growlMessage = [];
                        statusMessage = AtParConstants_1.AtParConstants.AlreadyExist_Msg.replace("1%", "Case").replace("2%", this.caseIDNgModel);
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: statusMessage });
                        this.isDuplicateExists = false;
                        this.saveButton = false;
                        return [2 /*return*/];
                    case 2: return [4 /*yield*/, this.addCaseInfo()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    SetupCaseComponent.prototype.addCaseInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var todayDate, expDate, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (!(this.setupCaseDate != null)) return [3 /*break*/, 3];
                        this.growlMessage = [];
                        todayDate = new Date();
                        expDate = new Date(this.setupCaseDate);
                        if (!(expDate < todayDate)) return [3 /*break*/, 1];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Date must be greater than or equal to today's date" });
                        return [2 /*return*/];
                    case 1:
                        this.convertDate = this.convert(this.setupCaseDate);
                        this.growlMessage = [];
                        this.spinnerService.start();
                        return [4 /*yield*/, this.pouSetupCaseService.addCaseInfo(this.caseIDNgModel.trim(), this.caseDescNgModel.trim(), this.physicianddlNgModel, this.patientIDNgModel.trim(), this.preferenceCardNgModel, this.procedureCodeNgModel, this.convertDate, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.roomNoNgModel.trim(), this.statusTypeNgModel).
                                catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                _this.spinnerService.stop();
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        var statusMessage = AtParConstants_1.AtParConstants.Created_Msg.replace("1%", "Case").replace("2%", _this.caseIDNgModel);
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: statusMessage });
                                        _this.caseIDNgModel = "";
                                        _this.caseDescNgModel = "";
                                        _this.patientIDNgModel = "";
                                        _this.roomNoNgModel = "";
                                        _this.procedureCodeNgModel = "Select Procedure";
                                        _this.statusTypeNgModel = "Select Status";
                                        _this.preferenceCardNgModel = "Select Preference";
                                        _this.physicianddlNgModel = "Select Physician";
                                        _this.setupCaseDate = null;
                                        _this.saveButton = true;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        if (response.StatusCode == AtParStatusCodes_1.AtparStatusCodes.S_POU_CASE_ALREADY_EXISTS) {
                                            _this.growlMessage = [];
                                            var statusMessage = AtParConstants_1.AtParConstants.AlreadyExist_Msg.replace("1%", "Case").replace("2%", _this.caseIDNgModel);
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: statusMessage });
                                        }
                                        else {
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                                _this.atParConstant.scrollToTop();
                            })];
                    case 2:
                        _a.sent();
                        this.spinnerService.stop();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5);
                        this.spinnerService.stop();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SetupCaseComponent.prototype.convert = function (str) {
        var date = new Date(str), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("/");
    };
    SetupCaseComponent.prototype.ddlPhysicianIdChanged = function () {
        this.buttonEnableDisableValidations();
    };
    SetupCaseComponent.prototype.Validate = function () {
        this.buttonEnableDisableValidations();
    };
    SetupCaseComponent.prototype.ddlPreferencesIdChanged = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var processcode, i;
            return __generator(this, function (_a) {
                this.buttonEnableDisableValidations();
                this.showGrid = false;
                if (this.preferenceCardNgModel != "") {
                    processcode = this.preferencessData.filter(function (x) { return x.PREF_LIST_ID == _this.preferenceCardNgModel; });
                    {
                        this.ddlProcedure = [];
                        this.ddlProcedure.push({ label: "Select Procedure", value: "" });
                        if (processcode.length > 0) {
                            for (i = 0; i <= processcode.length - 1; i++) {
                                this.ddlProcedure.push({ label: processcode[i].PROCEDURE_ID, value: processcode[i].PROCEDURE_ID });
                            }
                        }
                        else {
                            this.procedureCodeNgModel = "";
                            this.saveButton = true;
                        }
                    }
                }
                else {
                    this.ddlProcedure = [];
                    this.ddlProcedure.push({ label: "Select Procedure", value: "" });
                    this.procedureCodeNgModel = "";
                    this.saveButton = true;
                }
                return [2 /*return*/];
            });
        });
    };
    SetupCaseComponent.prototype.ddlProcedureCodeChanged = function () {
        this.buttonEnableDisableValidations();
    };
    SetupCaseComponent.prototype.ddlStatusChanged = function () {
        this.buttonEnableDisableValidations();
    };
    SetupCaseComponent.prototype.buttonEnableDisableValidations = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.mode == AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Add].toString()) {
                    if (this.caseIDNgModel.trim() != "" &&
                        this.caseDescNgModel.trim() != "" &&
                        this.patientIDNgModel.trim() != "" &&
                        this.roomNoNgModel.trim() != "" &&
                        this.setupCaseDate != null &&
                        (this.physicianddlNgModel != "Select Physician" && this.physicianddlNgModel != "") &&
                        (this.statusTypeNgModel != "Select Status" && this.statusTypeNgModel != "")
                        && (this.preferenceCardNgModel != "Select Preference" && this.preferenceCardNgModel != "") &&
                        (this.procedureCodeNgModel != "Select Procedure" && this.procedureCodeNgModel != "")) {
                        this.saveButton = false;
                    }
                    else {
                        this.saveButton = true;
                    }
                }
                return [2 /*return*/, this.saveButton];
            });
        });
    };
    SetupCaseComponent.prototype.bindModelDataChange = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, exMsg_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        if ("CaseId" == event.TextBoxID.toString()) {
                            this.caseIDValidation = event.validationrules.filter(function (x) { return x.status == false; }).length;
                        }
                        if ("caseDescription" == event.TextBoxID.toString()) {
                            this.caseDescValidation = event.validationrules.filter(function (x) { return x.status == false; }).length;
                        }
                        if ("patientID" == event.TextBoxID.toString()) {
                            this.patientValidation = event.validationrules.filter(function (x) { return x.status == false; }).length;
                        }
                        if ("roomNo" == event.TextBoxID.toString()) {
                            this.roomNoValidation = event.validationrules.filter(function (x) { return x.status == false; }).length;
                        }
                        if (!(this.mode == AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Add].toString())) return [3 /*break*/, 4];
                        if (!(this.caseIDValidation == 0 && this.caseDescValidation == 0 &&
                            this.patientValidation == 0 && this.roomNoValidation == 0)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.buttonEnableDisableValidations()];
                    case 1:
                        _a.saveButton = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        this.saveButton = true;
                        _b.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        this.saveButton = true;
                        _b.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        exMsg_2 = _b.sent();
                        this.clientErrorMsg(exMsg_2);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    SetupCaseComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.showGrid = null;
        this.spinnerService.stop();
        this.pageSize = null;
        this.deviceIDStatus = null;
        this.mode = null;
        this.addFrom = null;
        this.searchFrom = null;
        this.intAppId = null;
        this.setupCaseCount = null;
        this.searchPhysicianNgModel = null;
        this.searchProcedureCodeNgModel = null;
        this.caseIDNgModel = null;
        this.caseDescNgModel = null;
        this.physicianddlNgModel = null;
        this.patientIDNgModel = null;
        this.roomNoNgModel = null;
        this.preferenceCardNgModel = null;
        this.procedureCodeNgModel = null;
        this.lstGridData = null;
        this.ddlPhysician = null;
        this.ddlProcedure = null;
        this.ddlPreferencess = null;
        this.saveButton = null;
        this.setupCaseCount = null;
        this.isDuplicateExists = null;
        this.caseIDValidation = null;
        this.caseDescValidation = null;
        this.patientValidation = null;
        this.roomNoValidation = null;
        this.statusValidations = null;
        this.deleteMode = null;
    };
    SetupCaseComponent = __decorate([
        core_1.Component({
            templateUrl: 'pou-setup-case.component.html',
            providers: [datatableservice_1.datatableservice, api_1.ConfirmationService, AtParConstants_1.AtParConstants, atpar_common_service_1.AtParCommonService, pou_setup_case_service_1.POUSetupCaseService]
        }),
        __metadata("design:paramtypes", [datatableservice_1.datatableservice, HttpService_1.HttpService, pou_setup_case_service_1.POUSetupCaseService,
            atpar_common_service_1.AtParCommonService,
            event_spinner_service_1.SpinnerService, api_1.ConfirmationService, AtParConstants_1.AtParConstants])
    ], SetupCaseComponent);
    return SetupCaseComponent;
}());
exports.SetupCaseComponent = SetupCaseComponent;
//# sourceMappingURL=pou-setup-case.component.js.map