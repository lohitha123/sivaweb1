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
var PAR_MNGT_VENDOR_1 = require("../../app/Entities/PAR_MNGT_VENDOR");
var pou_preference_lists_service_1 = require("./pou-preference-lists.service");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var HttpService_1 = require("../Shared/HttpService");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParConstants_1 = require("../Shared/AtParConstants");
var datatable_1 = require("../components/datatable/datatable");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var api_1 = require("../components/common/api");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var routepath_1 = require("../AtPar/Menus/routepath");
var PreferenceListsComponent = (function () {
    function PreferenceListsComponent(dataservice, spnrService, preferenceListsService, httpService, atParConstant, confirmationService, atparCommonService) {
        this.dataservice = dataservice;
        this.spnrService = spnrService;
        this.preferenceListsService = preferenceListsService;
        this.httpService = httpService;
        this.atParConstant = atParConstant;
        this.confirmationService = confirmationService;
        this.atparCommonService = atparCommonService;
        this.pop = false;
        this.table = false;
        this.page = true;
        this.form = false;
        this.editform = false;
        this.loading = true;
        this.newItem = new PAR_MNGT_VENDOR_1.PAR_MNGT_VENDOR();
        this.selectedDept = "";
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.procedureVal = "";
        this.physicianVal = "";
        this.txtPreference = "";
        this.txtDescription = "";
        this.selectedProcedure = "";
        this.selectedPhysician = "";
        this.procedureCode = "procedures";
        this.setupCodes = "";
        this.descr = "";
        this.checkData = [];
        this.isDuplicateExists = false;
        this.txtItemQty = "";
        this.txtHoldQty = "";
        this.addMode = "";
        this.itemArray = [];
        this.prefDetailsDesc = "";
        this.loadingPrefDetails = true;
        this.selectedGridDetails = "";
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    PreferenceListsComponent.prototype.go = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.pop == false;
                //if (this.pop == true) {
                //    this.dataTableComponent.reset();
                //}
                if (this.selectedDept === "" || this.selectedDept === "Select Departments") {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select a Department" });
                }
                else {
                    this.bindPrefList();
                }
                return [2 /*return*/];
            });
        });
    };
    PreferenceListsComponent.prototype.ddl_Change = function () {
        this.pop = false;
    };
    PreferenceListsComponent.prototype.bindPrefList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var a, deptID, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.statusList = [];
                        this.statusList.push({ label: 'All', value: null });
                        this.statusList.push({ label: 'Active', value: false });
                        this.statusList.push({ label: 'InActive', value: true });
                        this.spnrService.start();
                        a = this.selectedDept.split('-');
                        deptID = a[0];
                        return [4 /*yield*/, this.preferenceListsService.GetPrefList("", "", deptID, this.procedureVal, this.physicianVal, 1).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (data.DataList.length > 0) {
                                            _this.growlMessage = [];
                                            _this.pop = true;
                                            _this.gridData = data.DataList;
                                        }
                                        var bindData = _this.gridData;
                                        for (var i = 0; i <= bindData.length - 1; i++) {
                                            if (bindData[i].STATUS == true) {
                                                bindData[i].checkvalue = false;
                                            }
                                            else {
                                                bindData[i].checkvalue = true;
                                            }
                                        }
                                        _this.gridData = bindData;
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.spnrService.stop();
                                        _this.growlMessage = [];
                                        _this.gridData = [];
                                        if (data.StatusMessage == "No data found" || data.StatusMessage == "No Data Found") {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No preference lists were found for this department :" + _this.selectedDept });
                                            _this.pop = true;
                                            _this.spnrService.stop();
                                        }
                                        else {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        }
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
                            })];
                    case 1:
                        _a.sent();
                        this.spnrService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PreferenceListsComponent.prototype.addPrefList = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Preference List';
                        this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        if (!(this.selectedDept === "" || this.selectedDept === "Select Departments")) return [3 /*break*/, 1];
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select a Department" });
                        return [3 /*break*/, 4];
                    case 1:
                        this.growlMessage = [];
                        this.form = true;
                        this.editform = false;
                        this.page = false;
                        this.pop = false;
                        return [4 /*yield*/, this.populateProcedureDdl()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.populatePhysicianDdl()];
                    case 3:
                        _a.sent();
                        this.txtPreference = "";
                        this.txtDescription = "";
                        document.getElementById("prefListID").focus();
                        this.loading = true;
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PreferenceListsComponent.prototype.tbl = function () {
        this.form = false;
        this.editform = false;
        this.page = false;
        this.pop = false;
        this.table = true;
    };
    PreferenceListsComponent.prototype.save = function () {
        this.editform = false;
    };
    PreferenceListsComponent.prototype.prefListGoBack = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.form = false;
        this.page = true;
        this.pop = true;
        this.editform = false;
        this.table = false;
        this.growlMessage = [];
        this.bindPrefList();
        this.prefListIDStatus = 1;
        this.departmentIDStatus = 1;
    };
    PreferenceListsComponent.prototype.populateDepts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spnrService.start();
                        return [4 /*yield*/, this.preferenceListsService.GetUserDepartments(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spnrService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.ddlDeptLst = [];
                                        _this.ddlDeptLst.push({ label: "Select Departments", value: "Select Departments" });
                                        if (data.DataList.length > 0) {
                                            _this.ddlDeptLst.push({ label: "All", value: "All" });
                                            for (var i = 0; i <= data.DataList.length - 1; i++) {
                                                _this.ddlDeptLst.push({ label: data.DataList[i].DEPARTMENT_ID + "-" + data.DataList[i].DEPT_NAME, value: data.DataList[i].DEPARTMENT_ID + "-" + data.DataList[i].DEPT_NAME });
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.spnrService.stop();
                                        _this.growlMessage = [];
                                        if (data.StatusMessage == "No data found") {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No departments found" });
                                            return;
                                        }
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
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
                            })];
                    case 1:
                        _a.sent();
                        this.spnrService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PreferenceListsComponent.prototype.clientErrorMsg = function (strExMsg) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spnrService, strExMsg.toString());
    };
    PreferenceListsComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                    this.recordsPerPageSize = parseInt(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage]);
                    this.ddlDeptLst = [];
                    this.ddlDeptLst.push({ label: "Select Departments", value: "Select Departments" });
                    this.populateDepts();
                }
                catch (ex) {
                    this.clientErrorMsg(ex);
                }
                return [2 /*return*/];
            });
        });
    };
    PreferenceListsComponent.prototype.addPreferenceListHeader = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var a, deptID, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spnrService.start();
                        a = this.selectedDept.split('-');
                        deptID = a[0];
                        return [4 /*yield*/, this.preferenceListsService.AddPreferenceListHeader(this.txtPreference, this.txtDescription, deptID, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.selectedProcedure, this.selectedPhysician).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spnrService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.spnrService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Added/Created successfully" });
                                        _this.txtPreference = "";
                                        _this.txtDescription = "";
                                        document.getElementById("prefListID").focus();
                                        _this.loading = true;
                                        _this.selectedPhysician = '';
                                        _this.selectedProcedure = '';
                                        _this.loading = true;
                                        _this.prefListIDStatus = 1;
                                        _this.departmentIDStatus = 1;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.spnrService.stop();
                                        _this.growlMessage = [];
                                        if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.S_PREF_LIST_EXIST) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Preference List " + _this.txtPreference + " already exists" });
                                        }
                                        else {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        }
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
                            })];
                    case 1:
                        _a.sent();
                        this.spnrService.stop();
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
    PreferenceListsComponent.prototype.savePreferenceListHeader = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.addPreferenceListHeader();
                return [2 /*return*/];
            });
        });
    };
    PreferenceListsComponent.prototype.populateProcedureDdl = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spnrService.start();
                        return [4 /*yield*/, this.preferenceListsService.GetCodes(this.procedureCode, this.setupCodes, this.descr).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spnrService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.ddlProcedure = [];
                                        _this.ddlProcedure.push({ label: "Select Procedure ID", value: "" });
                                        _this.selectedProcedure = "";
                                        if (data.DataList.length > 0) {
                                            for (var i = 0; i <= data.DataList.length - 1; i++) {
                                                _this.ddlProcedure.push({ label: data.DataList[i].CODE + "-" + data.DataList[i].DESCRIPTION, value: data.DataList[i].CODE });
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.spnrService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
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
                            })];
                    case 1:
                        _a.sent();
                        this.spnrService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PreferenceListsComponent.prototype.populatePhysicianDdl = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spnrService.start();
                        return [4 /*yield*/, this.preferenceListsService.GetPhysicians().
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spnrService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.ddlPhysician = [];
                                        _this.ddlPhysician.push({ label: "Select Physician", value: "" });
                                        _this.selectedPhysician = "";
                                        if (data.DataList.length > 0) {
                                            for (var i = 0; i <= data.DataList.length - 1; i++) {
                                                _this.ddlPhysician.push({ label: data.DataList[i].PHYSICIAN_ID + "-" + data.DataList[i].FIRST_NAME + " " + data.DataList[i].MIDDLE_INITIAL + " " + data.DataList[i].LAST_NAME + "(" + data.DataList[i].PHYSICIAN_ID + ")", value: data.DataList[i].PHYSICIAN_ID });
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.spnrService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
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
                            })];
                    case 1:
                        _a.sent();
                        this.spnrService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PreferenceListsComponent.prototype.bindPreferenceListDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spnrService.start();
                        return [4 /*yield*/, this.preferenceListsService.GetPrefListDetails(this.selectedGridPrefListID, this.selectedGridProcedureID).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spnrService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (data.DataList.length > 0) {
                                            _this.growlMessage = [];
                                            _this.pop = true;
                                            _this.GridPreferenceListDetails = data.DataList;
                                            _this.form = false;
                                            _this.editform = false;
                                            _this.page = false;
                                            _this.pop = false;
                                            _this.table = true;
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        if (data.DataList.length == 0) {
                                            _this.table = true;
                                            _this.GridPreferenceListDetails = data.DataList;
                                        }
                                        _this.spnrService.stop();
                                        _this.growlMessage = [];
                                        if (data.StatusMessage == "No data found" || data.StatusMessage == "No Data Found") {
                                            _this.GridPreferenceListDetails = [];
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No items added to this preference list" });
                                            return;
                                        }
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
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
                            })];
                    case 1:
                        _a.sent();
                        this.spnrService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PreferenceListsComponent.prototype.editPrefList = function (pref) {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Details';
        this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.table = false;
        if (pref.checkvalue == true) {
            this.GridPreferenceListDetails = [];
            this.selectedGridPrefListID = pref.PREF_LIST_ID;
            this.selectedGridProcedureID = pref.PROCEDURE_ID;
            this.selectedGridDetails = pref.PREF_LIST_DESCR;
            this.form = false;
            this.editform = false;
            this.page = false;
            this.pop = false;
            this.table = false;
            this.bindPreferenceListDetails();
        }
        else {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Preference list is disabled" });
        }
    };
    PreferenceListsComponent.prototype.editPrefListDetails = function (prefDetails) {
        this.loadingPrefDetails = false;
        this.breadCrumbMenu.SUB_MENU_NAME = 'Details';
        this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.isItemEdit = true;
        this.isEditModeButton = true;
        this.itemData = prefDetails.ITEM_ID;
        this.editform = true;
        this.form = false;
        this.page = false;
        this.pop = false;
        this.selectedItem = prefDetails.ITEM_ID;
        this.txtItemQty = prefDetails.QUANTITY;
        this.txtHoldQty = prefDetails.HOLD_QTY;
        this.table = false;
        this.prefDetailsDesc = prefDetails.ITEM_DESCR;
    };
    PreferenceListsComponent.prototype.addprefDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loadingPrefDetails = true;
                        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Preference List-2';
                        this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        this.txtHoldQty = "";
                        this.txtItemQty = "";
                        this.selectedItem = "";
                        this.prefDetailsDesc = '';
                        this.editform = true;
                        this.form = false;
                        this.page = false;
                        this.pop = false;
                        this.isItemEdit = false;
                        this.table = false;
                        this.isEditModeButton = false;
                        return [4 /*yield*/, this.getDepartmentItemsDdl()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PreferenceListsComponent.prototype.updatePreferenceListItem = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var itemID, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.pop == true) {
                            this.dataTableComponent.reset();
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spnrService.start();
                        this.itemArray = this.selectedItem.toString().split('-');
                        itemID = this.itemArray[0];
                        return [4 /*yield*/, this.preferenceListsService.UpdatePreferenceListItem(this.selectedGridPrefListID, this.selectedGridProcedureID, itemID, this.txtItemQty, this.txtHoldQty).
                                catch(this.httpService.handleError).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var data;
                                return __generator(this, function (_a) {
                                    data = res.json();
                                    this.spnrService.stop();
                                    this.growlMessage = [];
                                    switch (data.StatType) {
                                        case AtParEnums_1.StatusType.Success: {
                                            this.growlMessage.push({
                                                severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Updated Successfully"
                                            });
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Warn: {
                                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Error: {
                                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                            break;
                                        }
                                        case AtParEnums_1.StatusType.Custom: {
                                            this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                            break;
                                        }
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        this.spnrService.stop();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PreferenceListsComponent.prototype.getDepartmentItemsDdl = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var a, deptID, ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.growlMessage = [];
                        this.spnrService.start();
                        a = this.selectedDept.split('-');
                        deptID = a[0];
                        return [4 /*yield*/, this.preferenceListsService.GetDepartmentItems(deptID, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spnrService.stop();
                                _this.ddlItem = [];
                                _this.ddlItem.push({ label: "Select Item", value: "" });
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (data.DataList.length > 0) {
                                            for (var i = 0; i <= data.DataList.length - 1; i++) {
                                                _this.ddlItem.push({ label: data.DataList[i].ITEM_ID + "-" + data.DataList[i].ITEM_DESCRIPTION, value: data.DataList[i].ITEM_ID + "-" + data.DataList[i].ITEM_DESCRIPTION });
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.spnrService.stop();
                                        _this.growlMessage = [];
                                        if (data.StatusCode == "1102002") {
                                            _this.growlMessage = [];
                                            _this.editform = false;
                                            _this.form = false;
                                            _this.page = false;
                                            _this.pop = false;
                                            _this.table = true;
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No items found in allocated location" });
                                            return;
                                        }
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
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
                            })];
                    case 1:
                        _a.sent();
                        this.spnrService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PreferenceListsComponent.prototype.addPreferenceList = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.addPreferenceListItem();
                return [2 /*return*/];
            });
        });
    };
    PreferenceListsComponent.prototype.addPreferenceListItem = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var description, itemID, ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.pop == true) {
                            this.dataTableComponent.reset();
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        this.growlMessage = [];
                        this.spnrService.start();
                        this.itemArray = this.selectedItem.toString().split('-');
                        description = this.itemArray[1];
                        itemID = this.itemArray[0];
                        return [4 /*yield*/, this.getProfileParamValue()];
                    case 2:
                        _a.sent();
                        if (this.txtItemQty != "") {
                            if (parseInt(this.txtItemQty) > this.maxAllowQty) {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Quantity must not be greater than max allowable quantity" });
                                return [2 /*return*/];
                            }
                        }
                        if (this.txtHoldQty != "") {
                            if (parseInt(this.txtHoldQty) > this.maxAllowQty) {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Quantity must not be greater than max allowable quantity" });
                                return [2 /*return*/];
                            }
                        }
                        return [4 /*yield*/, this.preferenceListsService.AddPreferenceListItem(this.selectedGridPrefListID, this.selectedGridProcedureID, itemID, description, this.txtItemQty, this.txtHoldQty, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], itemID).
                                catch(this.httpService.handleError).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var data, _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            data = res.json();
                                            this.spnrService.stop();
                                            this.growlMessage = [];
                                            _a = data.StatType;
                                            switch (_a) {
                                                case AtParEnums_1.StatusType.Success: return [3 /*break*/, 1];
                                                case AtParEnums_1.StatusType.Warn: return [3 /*break*/, 3];
                                                case AtParEnums_1.StatusType.Error: return [3 /*break*/, 4];
                                                case AtParEnums_1.StatusType.Custom: return [3 /*break*/, 5];
                                            }
                                            return [3 /*break*/, 6];
                                        case 1: return [4 /*yield*/, this.bindPreferenceListDetails()];
                                        case 2:
                                            _b.sent();
                                            this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Added/Created Successfully" });
                                            this.ddlItem = [];
                                            this.txtItemQty = "";
                                            this.txtHoldQty = "";
                                            this.editform = false;
                                            this.form = false;
                                            this.page = false;
                                            this.pop = false;
                                            this.isItemEdit = false;
                                            this.table = true;
                                            return [3 /*break*/, 6];
                                        case 3:
                                            {
                                                if (data.StatusCode == "1102036") {
                                                    this.growlMessage.push({
                                                        severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Item already exist, add another item"
                                                    });
                                                    return [3 /*break*/, 6];
                                                }
                                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                                return [3 /*break*/, 6];
                                            }
                                            _b.label = 4;
                                        case 4:
                                            {
                                                this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                                return [3 /*break*/, 6];
                                            }
                                            _b.label = 5;
                                        case 5:
                                            {
                                                this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                                return [3 /*break*/, 6];
                                            }
                                            _b.label = 6;
                                        case 6: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 3:
                        _a.sent();
                        this.addMode = "";
                        this.spnrService.stop();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_9 = _a.sent();
                        this.clientErrorMsg(ex_9);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PreferenceListsComponent.prototype.updatePreferenceList = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.updatePreferenceListItem();
                this.editform = true;
                this.form = false;
                this.page = false;
                this.pop = false;
                this.isItemEdit = true;
                this.table = false;
                return [2 /*return*/];
            });
        });
    };
    PreferenceListsComponent.prototype.deletePreferenceListItem = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spnrService.start();
                        return [4 /*yield*/, this.preferenceListsService.DeletePreferenceListItem(this.selectedGridPrefListID, this.selectedGridProcedureID, this.selectedItem).
                                catch(this.httpService.handleError).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var data, _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            this.spnrService.stop();
                                            this.growlMessage = [];
                                            data = res.json();
                                            _a = data.StatType;
                                            switch (_a) {
                                                case AtParEnums_1.StatusType.Success: return [3 /*break*/, 1];
                                                case AtParEnums_1.StatusType.Warn: return [3 /*break*/, 3];
                                                case AtParEnums_1.StatusType.Error: return [3 /*break*/, 4];
                                                case AtParEnums_1.StatusType.Custom: return [3 /*break*/, 5];
                                            }
                                            return [3 /*break*/, 6];
                                        case 1: return [4 /*yield*/, this.bindPreferenceListDetails()];
                                        case 2:
                                            _b.sent();
                                            return [3 /*break*/, 6];
                                        case 3:
                                            {
                                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                                return [3 /*break*/, 6];
                                            }
                                            _b.label = 4;
                                        case 4:
                                            {
                                                this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                                return [3 /*break*/, 6];
                                            }
                                            _b.label = 5;
                                        case 5:
                                            {
                                                this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                                return [3 /*break*/, 6];
                                            }
                                            _b.label = 6;
                                        case 6: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        this.spnrService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_10 = _a.sent();
                        this.clientErrorMsg(ex_10);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PreferenceListsComponent.prototype.deletePrefListDetails = function (prefDetails) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.selectedItem = prefDetails.ITEM_ID;
                        return [4 /*yield*/, this.confirmDelete()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PreferenceListsComponent.prototype.EnableDisablePrefList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spnrService.start();
                        return [4 /*yield*/, this.preferenceListsService.DisablePrefList(this.selectedGridPrefListID, this.selectedGridProcedureID, this.selectedGridPrefListStatus).
                                catch(this.httpService.handleError).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var data, _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            data = res.json();
                                            this.growlMessage = [];
                                            this.spnrService.stop();
                                            _a = data.StatType;
                                            switch (_a) {
                                                case AtParEnums_1.StatusType.Success: return [3 /*break*/, 1];
                                                case AtParEnums_1.StatusType.Warn: return [3 /*break*/, 3];
                                                case AtParEnums_1.StatusType.Error: return [3 /*break*/, 4];
                                                case AtParEnums_1.StatusType.Custom: return [3 /*break*/, 5];
                                            }
                                            return [3 /*break*/, 6];
                                        case 1: return [4 /*yield*/, this.bindPrefList()];
                                        case 2:
                                            _b.sent();
                                            return [3 /*break*/, 6];
                                        case 3:
                                            {
                                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                                return [3 /*break*/, 6];
                                            }
                                            _b.label = 4;
                                        case 4:
                                            {
                                                this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                                return [3 /*break*/, 6];
                                            }
                                            _b.label = 5;
                                        case 5:
                                            {
                                                this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                                return [3 /*break*/, 6];
                                            }
                                            _b.label = 6;
                                        case 6: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        this.spnrService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_11 = _a.sent();
                        this.clientErrorMsg(ex_11);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PreferenceListsComponent.prototype.ngOnDestroy = function () {
        this.spnrService.stop();
    };
    PreferenceListsComponent.prototype.changeStatus = function (prefList) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.selectedGridPrefListID = prefList.PREF_LIST_ID;
                this.selectedGridProcedureID = prefList.PROCEDURE_ID;
                if (prefList.checkvalue == true) {
                    prefList.checkvalue = false;
                }
                else {
                    prefList.checkvalue = true;
                }
                this.selectedGridPrefListStatus = prefList.checkvalue;
                this.confirm();
                return [2 /*return*/];
            });
        });
    };
    PreferenceListsComponent.prototype.confirm = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.growlMessage = [];
                this.confirmationService.confirm({
                    message: 'Are you sure about the change?',
                    accept: function () {
                        _this.EnableDisablePrefList();
                    },
                    reject: function () {
                        _this.bindPrefList();
                    },
                });
                return [2 /*return*/];
            });
        });
    };
    PreferenceListsComponent.prototype.confirmDelete = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        return [4 /*yield*/, this.confirmationService.confirm({
                                message: 'Are you sure you want to delete this Item?',
                                accept: function () {
                                    _this.deletePreferenceListItem();
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PreferenceListsComponent.prototype.prefDetailsAddEditGoBack = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.breadCrumbMenu.SUB_MENU_NAME = 'Details';
                        this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        this.growlMessage = [];
                        this.txtHoldQty = "";
                        this.txtItemQty = "";
                        this.ddlItem = [];
                        this.editform = false;
                        this.form = false;
                        this.page = false;
                        this.pop = false;
                        this.isItemEdit = false;
                        this.table = true;
                        return [4 /*yield*/, this.bindPreferenceListDetails()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PreferenceListsComponent.prototype.goBackToPrefListGrid = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.growlMessage = [];
        this.editform = false;
        this.form = false;
        this.page = true;
        this.pop = true;
        this.isItemEdit = false;
        this.table = false;
    };
    PreferenceListsComponent.prototype.bindModelDataChange = function (event) {
        try {
            if ("prefListID" == event.TextBoxID.toString()) {
                this.prefListIDStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("DepartmentID" == event.TextBoxID.toString()) {
                this.departmentIDStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("openQtyID" == event.TextBoxID.toString()) {
                this.openQtyIDStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if (this.prefListIDStatus == 0 && this.departmentIDStatus == 0) {
                this.loading = false;
            }
            else {
                this.loading = true;
            }
            if (this.openQtyIDStatus == 0 && this.selectedItem != "") {
                this.loadingPrefDetails = false;
            }
            else {
                this.loadingPrefDetails = true;
            }
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg);
        }
    };
    PreferenceListsComponent.prototype.itemChanged = function () {
        if (this.openQtyIDStatus == 0 && this.holdQtyIDStatus == 0 && this.selectedItem != "") {
            this.loadingPrefDetails = false;
        }
        else {
            this.loadingPrefDetails = true;
        }
    };
    PreferenceListsComponent.prototype.getProfileParamValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spnrService.start();
                        return [4 /*yield*/, this.atparCommonService.getProfileParamValue(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID], AtParEnums_1.EnumApps.PointOfUse, "MAX_ALLOW_QTY").
                                catch(this.httpService.handleError).then(function (res) {
                                _this.spnrService.stop();
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.maxAllowQty = parseInt(data.DataVariable.toString());
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
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
                    case 1:
                        _a.sent();
                        this.spnrService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_12 = _a.sent();
                        this.clientErrorMsg(ex_12);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], PreferenceListsComponent.prototype, "dataTableComponent", void 0);
    PreferenceListsComponent = __decorate([
        core_1.Component({
            templateUrl: 'pou-preference-lists.component.html',
            providers: [AtParConstants_1.AtParConstants, datatableservice_1.datatableservice, pou_preference_lists_service_1.PreferenceListsService, api_1.ConfirmationService, atpar_common_service_1.AtParCommonService],
        }),
        __metadata("design:paramtypes", [datatableservice_1.datatableservice, event_spinner_service_1.SpinnerService, pou_preference_lists_service_1.PreferenceListsService, HttpService_1.HttpService, AtParConstants_1.AtParConstants, api_1.ConfirmationService, atpar_common_service_1.AtParCommonService])
    ], PreferenceListsComponent);
    return PreferenceListsComponent;
}());
exports.PreferenceListsComponent = PreferenceListsComponent;
//# sourceMappingURL=pou-preference-lists.component.js.map