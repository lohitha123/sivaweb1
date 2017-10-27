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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var HttpService_1 = require("../Shared/HttpService");
var pou_manage_cases_component_service_1 = require("./pou-manage-cases.component.service");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var employee_1 = require("../components/datatable/employee");
var PAR_MNGT_VENDOR_1 = require("../../app/Entities/PAR_MNGT_VENDOR");
var AtParEnums_1 = require("../Shared/AtParEnums");
var VM_MT_POU_CASE_CART_HEADER_TB_1 = require("../../app/Entities/VM_MT_POU_CASE_CART_HEADER_TB");
var VM_SEARCHITEM_DETAILS_1 = require("../../app/Entities/VM_SEARCHITEM_DETAILS");
var linq_es5_1 = require("linq-es5");
var vm_mt_pou_case_info_1 = require("../entities/vm_mt_pou_case_info");
var routepath_1 = require("../AtPar/Menus/routepath");
var api_1 = require("../components/common/api");
var platform_browser_1 = require("@angular/platform-browser");
var ManageCasesComponent = (function () {
    function ManageCasesComponent(dataservice, httpService, spinnerService, manageCasesService, commonService, document, atParConstant, confirmationService) {
        this.dataservice = dataservice;
        this.httpService = httpService;
        this.spinnerService = spinnerService;
        this.manageCasesService = manageCasesService;
        this.commonService = commonService;
        this.document = document;
        this.atParConstant = atParConstant;
        this.confirmationService = confirmationService;
        this.showGrid = false;
        this.table = false;
        this.page = true;
        this.form = false;
        this.editform = false;
        this.loading = true;
        this.minDateValue1 = new Date();
        this.newItem = new PAR_MNGT_VENDOR_1.PAR_MNGT_VENDOR();
        this.deviceTokenEntry = [];
        this.noOfRecords = 0;
        this.defDateRange = 0;
        this.statusCode = -1;
        this.strVndrReviewReq = "";
        this.strCaseEditingOption = "";
        this.lstDepts = [];
        this.lstServiceCodes = [];
        this.lstCaseDescr = [];
        this.lstCaseInfo = [];
        this.lstCaseForQA = [];
        this.lstCaseItemsInfo = [];
        this.lstProcedureCodes = [];
        this.lstPrefItems = [];
        this.strChkValues = [];
        this.colArr = [];
        this.blnChkValue = false;
        this.strOption = "";
        this.btnAddCase = false;
        this.strCaseID = "";
        this.strDeptID = "";
        this.strServiceCode = "";
        this.caseID = "";
        this.deptID = "";
        this.serviceCode = "";
        this.statusData = [];
        this.repCaseData = [];
        this.itemStatus = "N";
        this.lstCasesItems = [];
        this.lstServiceCodesItems = [];
        this.statusMsgs = [];
        this.lstProcedureItems = [];
        this.lstProcedureItemsList = [];
        this.lstPhysiciansItems = [];
        this.lstPhysiciansItemsList = [];
        this.lstPreferenceItems = [];
        this.lstPreferenceItemsList = [];
        this.lstdeptItems = [];
        this.lstdeptItemsList = [];
        this.lstReviewedItems = [];
        this.ProcedureItem = "";
        this.PhysiciansItem = "";
        this.caseId = "";
        this.caseDesc = "";
        this.Preference = "";
        this.patient = "";
        this.dept = "";
        this.convertDate = "";
        this.strcostcenter = "";
        this.IsDuplicate = false;
        this.replacePrefformSaveEnableDisable = true;
        this.replacePrefform = false;
        this.replacePref_patient = "";
        this.replacePref_Procedure = "";
        this.rep_Preference = "";
        this.lstReplacePreferenceItems = [];
        this.dtCases = [];
        this.dtCasesItem = new vm_mt_pou_case_info_1.VM_MT_POU_CASE_INFO();
        this.ddlStatus = false;
        this.ddlRepCase = false;
        this.chkSelect = false;
        this.repCaseValue = '';
        this.statusValue = '';
        this.checked = "";
        this.prefListID = "";
        this.procCode = "";
        this.ddlDtlStatus = false;
        this.isSave = false;
        //Details
        this._strMaxAllowQty = "";
        this.status = "";
        this.patID = "";
        this.itemCaseID = '';
        this.physician = '';
        this.replaceprefCardStatus = false;
        //LookUp
        this.lookupItem = '';
        this.description = '';
        this.mfgItem = '';
        this.venItem = '';
        this.upcID = '';
        this.gtin = '';
        this.subItem = new VM_SEARCHITEM_DETAILS_1.VM_SEARCHITEM_DETAILS();
        this.lstSubItemData = [];
        this.procedureCode = '';
        this.preferenceList = '';
        this.isDetailSaved = false;
        this.isAddItem = true;
        this.showItemGrid = false;
        this.addItems = false;
        this.additem = false;
        this.breadCrumbMenu = new routepath_1.Menus();
        this.ven = new employee_1.Employee();
        try {
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }
    ;
    ManageCasesComponent.prototype.add = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Case';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.form = true;
        this.editform = false;
        this.page = false;
        this.showGrid = false;
        this.loading = true;
        this.txtcaseIDStatus = null;
        this.txtcaseDescStatus = null;
        this.txtpatientStatus = null;
        this.performDateStatus = null;
        this.physiciansItemStatus = null;
        this.procedureItemStatus = null;
        this.preferenceStatus = null;
        this.deptStatus = null;
        this.ProcedureItem = "";
        this.PhysiciansItem = "";
        this.caseId = "";
        this.caseDesc = "";
        this.performDate = null;
        this.Preference = "";
        this.patient = "";
        this.dept = "";
        this.strcostcenter = "";
        this.strServiceCode = "";
        this.currentDate = new Date();
        this.GetDeptCostCenters();
    };
    ManageCasesComponent.prototype.onGoBack = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.form = false;
        this.page = true;
        this.showGrid = false;
        this.editform = false;
        this.table = false;
        this.statusMsgs = [];
    };
    ManageCasesComponent.prototype.onfocusToCalendar = function (e) {
        this.date2 = null;
        if (this.date1 == null) {
            this.minDateValue2 = new Date();
        }
        else {
            this.minDateValue2 = this.date1;
        }
    };
    ManageCasesComponent.prototype.onfocusFromCalendar = function (e) {
        localStorage.removeItem("FromDate");
        this.date1 = null;
    };
    ManageCasesComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var Ispagepostback, IspagepostbackReplacePref, _a, _b, _c, _d, _e, _f, i, colCnt, ex_1;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        this.btnTopSave = true;
                        this.btnBottomSave = true;
                        Ispagepostback = "";
                        IspagepostbackReplacePref = "";
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.noOfRecords = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        return [4 /*yield*/, this.commonService.getProfileParamValue(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID], AtParEnums_1.EnumApps.PointOfUse, "ALLOW_EDITING_CASE")
                                .catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                console.log(response);
                                var temp = response.DataVariable.toString().split(',');
                                var tempdata = temp[3].split('-');
                                if (tempdata[0] == "1") {
                                    _this.replaceprefCardStatus = true;
                                }
                                else {
                                    _this.replaceprefCardStatus = false;
                                }
                            })];
                    case 1:
                        _g.sent();
                        _g.label = 2;
                    case 2:
                        _g.trys.push([2, 9, , 10]);
                        _a = this;
                        return [4 /*yield*/, this.getDefDateRange()];
                    case 3:
                        _a.statusCode = _g.sent();
                        if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR) {
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Failed to get Default data range" });
                            return [2 /*return*/];
                        }
                        this.fromDate = new Date();
                        _b = this;
                        return [4 /*yield*/, this.addDays(this.fromDate, this.defDateRange)];
                    case 4:
                        _b.toDate = _g.sent();
                        _c = this;
                        return [4 /*yield*/, this.getDepartments()];
                    case 5:
                        _c.statusCode = _g.sent();
                        if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR) {
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Failed to get Departments" });
                            return [2 /*return*/];
                        }
                        _d = this;
                        return [4 /*yield*/, this.getServiceCodes()];
                    case 6:
                        _d.statusCode = _g.sent();
                        if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR) {
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Failed to get Service Codes" });
                            return [2 /*return*/];
                        }
                        _e = this;
                        return [4 /*yield*/, this.getCases()];
                    case 7:
                        _e.statusCode = _g.sent();
                        if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR) {
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Failed to get Cases" });
                            return [2 /*return*/];
                        }
                        sessionStorage.setItem("lstDepts", JSON.stringify(this.lstDepts));
                        sessionStorage.setItem("lstServiceCodes", JSON.stringify(this.lstServiceCodes));
                        sessionStorage.setItem("lstCaseDescr", JSON.stringify(this.lstCaseDescr));
                        _f = this;
                        return [4 /*yield*/, this.getProfileParamValue()];
                    case 8:
                        _f.statusCode = _g.sent();
                        this.strChkValues = this.strCaseEditingOption.split(",");
                        for (i = 0; i <= this.strChkValues.length - 1; i++) {
                            this.colArr = this.strChkValues[i].split("-");
                            for (colCnt = 0; colCnt <= this.colArr.length - 1; colCnt++) {
                                if (colCnt == 0) {
                                    this.blnChkValue = (parseInt(this.colArr[colCnt]) == 0 ? false : true);
                                }
                                else {
                                    this.strOption = AtParEnums_1.CASE_EDITING_OPTIONS[AtParEnums_1.CASE_EDITING_OPTIONS[this.colArr[colCnt]]].toString();
                                    switch (this.strOption) {
                                        case AtParEnums_1.CASE_EDITING_OPTIONS.AddCase.toString():
                                            this.m_IsAddCaseEnabled = this.blnChkValue;
                                            break;
                                        case AtParEnums_1.CASE_EDITING_OPTIONS.ChangeStatus.toString():
                                            this.m_IsChangeStatusEnabled = this.blnChkValue;
                                            break;
                                        case AtParEnums_1.CASE_EDITING_OPTIONS.ReplaceCase.toString():
                                            this.m_IsReplaceCaseEnabled = this.blnChkValue;
                                            break;
                                        case AtParEnums_1.CASE_EDITING_OPTIONS.ReplacePref.toString():
                                            this.m_IsReplacePrefEnabled = this.blnChkValue;
                                            break;
                                    }
                                }
                            }
                            if (this.m_IsAddCaseEnabled) {
                                this.btnAddCase = true;
                            }
                        }
                        return [3 /*break*/, 10];
                    case 9:
                        ex_1 = _g.sent();
                        this.clientErrorMsg(ex_1);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    ManageCasesComponent.prototype.addDays = function (theDate, days) {
        return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
    };
    ManageCasesComponent.prototype.getDefDateRange = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 5]);
                        return [4 /*yield*/, this.commonService.GetMyPreferences("DEFAULT_REPORT_DURATION", this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.statusMsgs = [];
                                if (data.StatType == AtParEnums_1.StatusType.Success) {
                                    _this.defDateRange = parseInt(data.DataVariable.toString());
                                }
                                _this.statusCode = data.StatusCode;
                                if (data.StatType == AtParEnums_1.StatusType.Error) {
                                    _this.statusMsgs = [];
                                    _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Failed to get Default data range" });
                                    return;
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.statusCode];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        ex_2 = _a.sent();
                        return [4 /*yield*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ManageCasesComponent.prototype.getDepartments = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 5]);
                        return [4 /*yield*/, this.manageCasesService.getDepartments().
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.statusMsgs = [];
                                if (data.StatType == AtParEnums_1.StatusType.Success) {
                                    _this.lstDepts = data.DataList;
                                }
                                _this.statusCode = data.StatusCode;
                                if (data.StatType == AtParEnums_1.StatusType.Error) {
                                    _this.statusMsgs = [];
                                    _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Failed to get Departments" });
                                    return;
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.statusCode];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        ex_3 = _a.sent();
                        return [4 /*yield*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ManageCasesComponent.prototype.getServiceCodes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 5]);
                        return [4 /*yield*/, this.manageCasesService.getServiceCodes().
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.statusMsgs = [];
                                if (data.StatType == AtParEnums_1.StatusType.Success) {
                                    _this.lstServiceCodes = data.DataList;
                                }
                                _this.statusCode = data.StatusCode;
                                if (data.StatType == AtParEnums_1.StatusType.Error) {
                                    _this.statusMsgs = [];
                                    _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Failed to get Service Codes" });
                                    return;
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.statusCode];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        ex_4 = _a.sent();
                        return [4 /*yield*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ManageCasesComponent.prototype.getCases = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 5]);
                        return [4 /*yield*/, this.manageCasesService.getCases().
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.statusMsgs = [];
                                if (data.StatType == AtParEnums_1.StatusType.Success) {
                                    _this.lstCaseDescr = data.DataList;
                                }
                                _this.statusCode = data.StatusCode;
                                if (data.StatType == AtParEnums_1.StatusType.Error) {
                                    _this.statusMsgs = [];
                                    _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                    return;
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.statusCode];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        ex_5 = _a.sent();
                        return [4 /*yield*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ManageCasesComponent.prototype.getProfileParamValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 5]);
                        return [4 /*yield*/, this.commonService.GetProfileParamValue(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID], AtParEnums_1.EnumApps.PointOfUse, "ALLOW_EDITING_CASE").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.statusMsgs = [];
                                if (data.StatType == AtParEnums_1.StatusType.Success) {
                                    _this.strCaseEditingOption = data.DataVariable.toString();
                                }
                                _this.statusCode = data.StatusCode;
                                if (data.StatType == AtParEnums_1.StatusType.Error) {
                                    _this.statusMsgs = [];
                                    _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                    return;
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.statusCode];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        ex_6 = _a.sent();
                        return [4 /*yield*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ManageCasesComponent.prototype.BindGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _strCaseID, _strDeptID, _strServiceCode, _strAddVisible, _arrCaseAttributes, _arrCaseAttributes, _arrCaseAttributes, frmDate, todate, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.caseStatusList = [];
                        this.caseStatusList.push({ label: 'All', value: null });
                        this.caseStatusList.push({ label: 'OPEN', value: 'OPEN' });
                        this.caseStatusList.push({ label: 'READY', value: 'READY' });
                        this.caseStatusList.push({ label: 'CANCELLED', value: 'CANCELLED' });
                        this.caseStatusList.push({ label: 'PICKED', value: 'PICKED' });
                        this.caseStatusList.push({ label: 'PARTIALLY PICKED', value: 'PARTIALLY PICKED' });
                        this.caseStatusList.push({ label: 'REPLACED', value: 'REPLACED' });
                        this.caseStatusList.push({ label: 'REVIEWED', value: 'REVIEWED' });
                        this.caseStatusList.push({ label: 'RETURNED', value: 'RETURNED' });
                        this.caseStatusList.push({ label: 'CASEISSUED', value: 'CASEISSUED' });
                        _strCaseID = '';
                        _strDeptID = '';
                        _strServiceCode = '';
                        _strAddVisible = "True";
                        if (this.caseID != null && this.caseID != "" && this.caseID != undefined) {
                            if (this.caseID.trim().indexOf(' ') >= 0) {
                                _arrCaseAttributes = [];
                                _arrCaseAttributes = this.caseID.trim().split(' ');
                                _strCaseID = _arrCaseAttributes[0];
                            }
                            else {
                                _strCaseID = this.caseID.trim();
                            }
                        }
                        if (this.deptID != null && this.deptID != "" && this.deptID != undefined) {
                            if (this.deptID.trim().indexOf(' ') >= 0) {
                                _arrCaseAttributes = [];
                                _arrCaseAttributes = this.deptID.trim().split(' ');
                                _strDeptID = _arrCaseAttributes[0];
                            }
                            else {
                                _strDeptID = this.deptID.trim();
                            }
                        }
                        if (this.serviceCode != null && this.serviceCode != "" && this.serviceCode != undefined) {
                            if (this.serviceCode.trim().indexOf(' ') >= 0) {
                                _arrCaseAttributes = [];
                                _arrCaseAttributes = this.serviceCode.trim().split(' ');
                                _strServiceCode = _arrCaseAttributes[0];
                            }
                            else {
                                _strServiceCode = this.serviceCode.trim();
                            }
                        }
                        frmDate = this.convert(this.fromDate);
                        todate = this.convert(this.toDate);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.manageCasesService.getCasesforQA(frmDate, todate, AtParEnums_1.Case_Review_Type.PRE, _strDeptID, _strServiceCode, _strCaseID).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.statusMsgs = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.objCaseInfo = data.Data;
                                        _this.lstCaseInfo = _this.objCaseInfo.lstCaseInfo;
                                        sessionStorage.setItem("lstCaseInfo", JSON.stringify(_this.lstCaseInfo));
                                        _this.lstCaseForQA = _this.objCaseInfo.lstCaseforQA;
                                        _this.lstCaseInfo.forEach(function (info) {
                                            if ((info.STATUS == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.REVIEWED].toString() || info.STATUS == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.OPEN].toString() || info.STATUS == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.PICKED].toString() ||
                                                info.STATUS == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.CASEISSUED].toString() || info.STATUS == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.READY].toString() || info.STATUS == "PARTIALLY PICKED") && _this.replaceprefCardStatus == true) {
                                                info.cursor = 'pointer';
                                            }
                                            else {
                                                info.cursor = 'none';
                                            }
                                            info.selectToggle = false;
                                            var changeDate = info.PERFORM_DATE;
                                            var dateStr = new Date(changeDate).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                                            info.PERFORM_DATE = dateStr.replace(',', '');
                                            var objCaseQA;
                                            var lstSearch = [];
                                            var lstCases = [];
                                            var lstFilter = [];
                                            var infoDetail = [];
                                            var lstStatus = [];
                                            var _blnMultiStatus = false;
                                            var _strCaseStatus = '';
                                            var _strAddVisible = "True";
                                            info.statusData = [];
                                            info.statusData.push({ label: "Select Status", value: "Select Status" });
                                            if (_this.objCaseInfo != null) {
                                                objCaseQA = _this.objCaseInfo;
                                                lstSearch = objCaseQA.lstCaseInfo.filter(function (x) { return x.PROCEDURE_CODE == 'EMPTY_ROW'; });
                                                if (lstSearch.length > 0) {
                                                    return;
                                                }
                                            }
                                            lstCases = objCaseQA.lstCaseforQA.filter(function (x) { return x.CASE_ID == info.CASE_ID; });
                                            lstFilter = objCaseQA.lstCaseInfo.filter(function (x) { return x.CASE_ID == info.CASE_ID; });
                                            if (_this.m_IsChangeStatusEnabled == true) {
                                                info.selectStatus = false;
                                            }
                                            else {
                                                info.selectStatus = true;
                                            }
                                            if (_this.m_IsReplaceCaseEnabled == true) {
                                                info.selectCase = false;
                                            }
                                            else {
                                                info.selectCase = true;
                                            }
                                            info.isExpander = false;
                                            if (lstCases.length > 1) {
                                                infoDetail = _this.lstCaseForQA.filter(function (x) { return x.CASE_ID == info.CASE_ID; });
                                                info.DETAILS = infoDetail;
                                                if (infoDetail.length > 1) {
                                                    info.isExpander = true;
                                                }
                                                var lstStatus1 = [];
                                                lstStatus1 = linq_es5_1.asEnumerable(lstCases).Select(function (x) { return x.STATUS; }).ToArray();
                                                lstStatus1.forEach(function (status) {
                                                    if (lstStatus.filter(function (x) { return x == status; }).length == 0) {
                                                        lstStatus.push(status);
                                                    }
                                                });
                                                if (lstStatus.length > 1) {
                                                    _blnMultiStatus = true;
                                                    info.selectStatus = true;
                                                    var lstAddbtnStatus = [];
                                                    lstAddbtnStatus = lstStatus.filter(function (x) { return x == AtParEnums_1.CASE_PICK_STATUS.PICKED.toString() ||
                                                        x == AtParEnums_1.CASE_PICK_STATUS.REVIEWED.toString() ||
                                                        x == AtParEnums_1.CASE_PICK_STATUS.REPLACED.toString() ||
                                                        x == AtParEnums_1.CASE_PICK_STATUS.RETURNED.toString(); });
                                                    if (lstAddbtnStatus.length > 0) {
                                                        _strAddVisible = "False";
                                                    }
                                                }
                                                else {
                                                    _strCaseStatus = lstStatus[0];
                                                    if (_strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.OPEN.toString()]) {
                                                        info.statusData.push({ label: AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.READY.toString()], value: AtParEnums_1.CASE_PICK_STATUS.READY.toString() });
                                                        info.statusData.push({ label: "CANCEL", value: AtParEnums_1.CASE_PICK_STATUS.CANCELLED });
                                                    }
                                                    else if (_strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.READY.toString()]) {
                                                        info.statusData.push({ label: "CANCEL", value: AtParEnums_1.CASE_PICK_STATUS.CANCELLED.toString() });
                                                    }
                                                    else if (_strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.PICKED.toString()] || _strCaseStatus == "PARTIALLY PICKED") {
                                                        info.statusData.push({ label: "CANCEL", value: AtParEnums_1.CASE_PICK_STATUS.CANCELLED });
                                                    }
                                                    else if (_strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.CANCELLED.toString()]) {
                                                        info.statusData.push({ label: AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.READY.toString()], value: AtParEnums_1.CASE_PICK_STATUS.READY });
                                                    }
                                                    else if (_strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.REVIEWED.toString()] || _strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.RETURNED.toString()]) {
                                                        info.statusData.push({ label: "CANCEL", value: AtParEnums_1.CASE_PICK_STATUS.CANCELLED });
                                                        //if (info.EMERGENCY_CASE == YesNo_Enum[YesNo_Enum.Y.toString()]) {
                                                        info.statusData.push({ label: "REMOVE", value: AtParEnums_1.CASE_PICK_STATUS.REMOVE });
                                                        //}
                                                    }
                                                    else if (_strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.CASEISSUED.toString()]) {
                                                        info.statusData.push({ label: "CANCEL", value: AtParEnums_1.CASE_PICK_STATUS.CANCELLED });
                                                    }
                                                    else if (_strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.REPLACED.toString()]) {
                                                    }
                                                    if (_strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.REPLACED.toString()]) {
                                                        info.selectStatus = true;
                                                        info.selectCase = true;
                                                        info.rowClsStyle = 'ui-datatable-green';
                                                        info.selectToggle = true;
                                                    }
                                                    if (_strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.REVIEWED.toString()] ||
                                                        _strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.REPLACED.toString()] ||
                                                        _strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.PICKED.toString()] ||
                                                        _strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.CASEISSUED.toString()] ||
                                                        _strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.RETURNED.toString()]) {
                                                        _strAddVisible = "False";
                                                    }
                                                }
                                                info.selectPref = false;
                                            }
                                            else {
                                                _strCaseStatus = info.STATUS.toString();
                                                if (_strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.OPEN.toString()]) {
                                                    info.statusData.push({ label: AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.READY.toString()], value: AtParEnums_1.CASE_PICK_STATUS.READY.toString() });
                                                    info.statusData.push({ label: "CANCEL", value: AtParEnums_1.CASE_PICK_STATUS.CANCELLED });
                                                }
                                                else if (_strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.READY.toString()]) {
                                                    info.statusData.push({ label: "CANCEL", value: AtParEnums_1.CASE_PICK_STATUS.CANCELLED.toString() });
                                                }
                                                else if (_strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.PICKED.toString()] || _strCaseStatus == "PARTIALLY PICKED") {
                                                    info.statusData.push({ label: "CANCEL", value: AtParEnums_1.CASE_PICK_STATUS.CANCELLED });
                                                }
                                                else if (_strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.CANCELLED.toString()]) {
                                                    info.statusData.push({ label: AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.READY.toString()], value: AtParEnums_1.CASE_PICK_STATUS.READY });
                                                }
                                                else if (_strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.REVIEWED.toString()] || _strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.RETURNED.toString()]) {
                                                    info.statusData.push({ label: "CANCEL", value: AtParEnums_1.CASE_PICK_STATUS.CANCELLED });
                                                    //if (info.EMERGENCY_CASE == YesNo_Enum[YesNo_Enum.Y.toString()]) {
                                                    info.statusData.push({ label: "REMOVE", value: AtParEnums_1.CASE_PICK_STATUS.REMOVE });
                                                    // }
                                                }
                                                else if (_strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.CASEISSUED.toString()]) {
                                                    info.statusData.push({ label: "CANCEL", value: AtParEnums_1.CASE_PICK_STATUS.CANCELLED });
                                                }
                                                else if (_strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.REPLACED.toString()]) {
                                                }
                                                if (_strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.REPLACED.toString()]) {
                                                    info.selectStatus = true;
                                                    info.selectCase = true;
                                                    info.rowClsStyle = 'ui-datatable-green';
                                                    info.selectToggle = true;
                                                }
                                                if (_strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.REVIEWED.toString()] ||
                                                    _strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.REPLACED.toString()] ||
                                                    _strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.PICKED.toString()] ||
                                                    _strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.CASEISSUED.toString()] ||
                                                    _strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.RETURNED.toString()]) {
                                                    _strAddVisible = "False";
                                                }
                                                if (_strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.REVIEWED.toString()] ||
                                                    _strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.OPEN.toString()] ||
                                                    _strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.PICKED.toString()] ||
                                                    _strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.CASEISSUED.toString()] ||
                                                    _strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.READY.toString()] ||
                                                    _strCaseStatus == "PARTIALLY PICKED") {
                                                    if (_this.m_IsReplacePrefEnabled) {
                                                    }
                                                }
                                                info.selectPref = true;
                                            }
                                            info.repCaseData = [];
                                            info.repCaseData.push({ label: "Select Case", value: "Select Case" });
                                            if (lstFilter[0].EMERGENCY_CASE == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N.toString()] && (!_blnMultiStatus)) {
                                                if (_strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.OPEN.toString()] ||
                                                    _strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.READY.toString()]) {
                                                    if (objCaseQA.lstDstCaseCartHeader.length > 0) {
                                                        objCaseQA.lstDstCaseCartHeader.forEach(function (infoCase) {
                                                            info.repCaseData.push({ label: infoCase.CASE_ID + " - " + infoCase.CASE_DESCR, value: infoCase.CASE_ID });
                                                        });
                                                    }
                                                }
                                                else {
                                                    info.selectCase = true;
                                                }
                                            }
                                            else {
                                                info.selectCase = true;
                                            }
                                            infoDetail = _this.lstCaseForQA.filter(function (x) { return x.CASE_ID == info.CASE_ID; });
                                            infoDetail.forEach(function (detail) {
                                                if (_this.m_IsChangeStatusEnabled == true) {
                                                    detail.selectStatus = false;
                                                }
                                                else {
                                                    detail.selectStatus = true;
                                                }
                                                if ((detail.STATUS == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.REVIEWED].toString() || detail.STATUS == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.OPEN].toString() || detail.STATUS == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.PICKED].toString() ||
                                                    detail.STATUS == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.CASEISSUED].toString() || detail.STATUS == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.READY].toString() || detail.STATUS == "PARTIALLY PICKED") && _this.replaceprefCardStatus == true) {
                                                    detail.cursor = 'pointer';
                                                }
                                                else {
                                                    detail.cursor = 'none';
                                                }
                                                detail.statusData = [];
                                                detail.statusData.push({ label: "Select Status", value: "Select Status" });
                                                var dtlsStatus = detail.STATUS;
                                                if (dtlsStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.OPEN.toString()]) {
                                                    detail.statusData.push({ label: AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.READY.toString()], value: AtParEnums_1.CASE_PICK_STATUS.READY.toString() });
                                                    detail.statusData.push({ label: "CANCEL", value: AtParEnums_1.CASE_PICK_STATUS.CANCELLED });
                                                }
                                                else if (dtlsStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.READY.toString()]) {
                                                    detail.statusData.push({ label: "CANCEL", value: AtParEnums_1.CASE_PICK_STATUS.CANCELLED.toString() });
                                                }
                                                else if (dtlsStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.PICKED.toString()] || dtlsStatus == "PARTIALLY PICKED") {
                                                    detail.statusData.push({ label: "CANCEL", value: AtParEnums_1.CASE_PICK_STATUS.CANCELLED });
                                                }
                                                else if (dtlsStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.CANCELLED.toString()]) {
                                                    detail.statusData.push({ label: AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.READY.toString()], value: AtParEnums_1.CASE_PICK_STATUS.READY });
                                                }
                                                else if (dtlsStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.REVIEWED.toString()] || dtlsStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.RETURNED.toString()]) {
                                                    detail.statusData.push({ label: "CANCEL", value: AtParEnums_1.CASE_PICK_STATUS.CANCELLED });
                                                    if (detail.EMERGENCY_CASE == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y.toString()]) {
                                                        detail.statusData.push({ label: "REMOVE", value: AtParEnums_1.CASE_PICK_STATUS.REMOVE });
                                                    }
                                                }
                                                else if (dtlsStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.CASEISSUED.toString()]) {
                                                    detail.statusData.push({ label: "CANCEL", value: AtParEnums_1.CASE_PICK_STATUS.CANCELLED });
                                                }
                                                else if (dtlsStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.REPLACED.toString()]) {
                                                }
                                                if (dtlsStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.REVIEWED.toString()] ||
                                                    dtlsStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.OPEN.toString()] ||
                                                    dtlsStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.PICKED.toString()] ||
                                                    dtlsStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.CASEISSUED.toString()] ||
                                                    dtlsStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.READY.toString()] ||
                                                    dtlsStatus == "PARTIALLY PICKED") {
                                                    if (_this.m_IsReplacePrefEnabled) {
                                                    }
                                                }
                                                if (detail.PREFERENCENAME == null || detail.PREFERENCENAME == undefined) {
                                                    detail.PREFERENCENAME = "";
                                                }
                                                detail.selectPref = true;
                                            });
                                            info.qCaseId = info.CASE_ID + ":" + _strAddVisible;
                                        });
                                        _this.showGrid = true;
                                        _this.statusCode = data.StatusCode;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.lstCaseInfo = [];
                                        _this.showGrid = false;
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
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
    ManageCasesComponent.prototype.validateSearchFields = function () {
        try {
            if (this.fromDate == null || this.fromDate.toString() == '' || this.toDate == null || this.toDate.toString() == '') {
                this.statusMsgs = [];
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please select a valid date range' });
                return false;
            }
            else if (Date.parse(this.fromDate.toString()) && Date.parse(this.toDate.toString())) {
                if (Date.parse(this.convert(this.fromDate)) > Date.parse(this.convert(this.toDate))) {
                    this.statusMsgs = [];
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "To Date should be greater than From Date" });
                    return false;
                }
            }
            else {
                this.statusMsgs = [];
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Dates' });
                return false;
            }
            return true;
        }
        catch (ex) {
            this.clientErrorMsg(ex);
            return false;
        }
    };
    ManageCasesComponent.prototype.onGoClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isValidate, ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, 5, 6]);
                        this.showGrid = false;
                        this.lstCaseInfo = [];
                        return [4 /*yield*/, this.validateSearchFields()];
                    case 1:
                        isValidate = _a.sent();
                        this.spinnerService.start();
                        if (!isValidate) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.BindGrid()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 6];
                    case 4:
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8);
                        return [3 /*break*/, 6];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ManageCasesComponent.prototype.ddlStatusBind = function (dtlsStatus, emergencyCase) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(dtlsStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.OPEN.toString()])) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.statusData.push({ label: AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.READY.toString()], value: AtParEnums_1.CASE_PICK_STATUS.READY.toString() })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.statusData.push({ label: "CANCEL", value: AtParEnums_1.CASE_PICK_STATUS.CANCELLED })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 16];
                    case 3:
                        if (!(dtlsStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.READY.toString()])) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.statusData.push({ label: "CANCEL", value: AtParEnums_1.CASE_PICK_STATUS.CANCELLED.toString() })];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 16];
                    case 5:
                        if (!(dtlsStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.PICKED.toString()] || dtlsStatus == "PARTIALLY PICKED")) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.statusData.push({ label: "CANCEL", value: AtParEnums_1.CASE_PICK_STATUS.CANCELLED })];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 16];
                    case 7:
                        if (!(dtlsStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.CANCELLED.toString()])) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.statusData.push({ label: AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.READY.toString()], value: AtParEnums_1.CASE_PICK_STATUS.READY })];
                    case 8:
                        _a.sent();
                        return [3 /*break*/, 16];
                    case 9:
                        if (!(dtlsStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.REVIEWED.toString()] || dtlsStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.RETURNED.toString()])) return [3 /*break*/, 13];
                        return [4 /*yield*/, this.statusData.push({ label: "CANCEL", value: AtParEnums_1.CASE_PICK_STATUS.CANCELLED })];
                    case 10:
                        _a.sent();
                        if (!(emergencyCase == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y.toString()])) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.statusData.push({ label: "REMOVE", value: AtParEnums_1.CASE_PICK_STATUS.REMOVE })];
                    case 11:
                        _a.sent();
                        _a.label = 12;
                    case 12: return [3 /*break*/, 16];
                    case 13:
                        if (!(dtlsStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.CASEISSUED.toString()])) return [3 /*break*/, 15];
                        return [4 /*yield*/, this.statusData.push({ label: "CANCEL", value: AtParEnums_1.CASE_PICK_STATUS.CANCELLED })];
                    case 14:
                        _a.sent();
                        return [3 /*break*/, 16];
                    case 15:
                        if (dtlsStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.REPLACED.toString()]) {
                        }
                        _a.label = 16;
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    ManageCasesComponent.prototype.gvCaseInfo_RowDataBound = function (lstCaseInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var objCaseQA, lstSearch, lstCases, lstFilter, infoDetail, lstStatus, _blnMultiStatus, _strCaseStatus, _strAddVisible;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lstSearch = [];
                        lstCases = [];
                        lstFilter = [];
                        infoDetail = [];
                        lstStatus = [];
                        _blnMultiStatus = false;
                        _strCaseStatus = '';
                        _strAddVisible = "True";
                        return [4 /*yield*/, lstCaseInfo.forEach(function (info) {
                                if (_this.objCaseInfo != null) {
                                    objCaseQA = _this.objCaseInfo;
                                    lstSearch = objCaseQA.lstCaseInfo.filter(function (x) { return x.PROCEDURE_CODE == 'EMPTY_ROW'; });
                                    if (lstSearch.length > 0) {
                                        return;
                                    }
                                }
                                lstCases = objCaseQA.lstCaseforQA.filter(function (x) { return x.CASE_ID == info.CASE_ID; });
                                lstFilter = objCaseQA.lstCaseInfo.filter(function (x) { return x.CASE_ID == info.CASE_ID; });
                                if (_this.m_IsChangeStatusEnabled == true) {
                                    _this.ddlStatus = true;
                                }
                                else {
                                    _this.ddlStatus = false;
                                }
                                if (_this.m_IsReplaceCaseEnabled == true) {
                                    _this.ddlRepCase = true;
                                }
                                else {
                                    _this.ddlRepCase = false;
                                }
                                if (lstCases.length > 1) {
                                    infoDetail = _this.lstCaseForQA.filter(function (x) { return x.CASE_ID == info.CASE_ID; });
                                    info.DETAILS = infoDetail;
                                    //lstStatus=
                                    if (lstStatus.length > 1) {
                                        _blnMultiStatus = true;
                                        _this.ddlStatus = false;
                                        var lstAddbtnStatus = [];
                                        // lstAddbtnStatus = lstStatus.(x => x.STATUS==
                                        if (lstAddbtnStatus.length > 0) {
                                            _strAddVisible = "False";
                                        }
                                        else {
                                            _strCaseStatus = lstStatus[0].STATUS.toString();
                                            ;
                                            _this.ddlStatusBind(_strCaseStatus, info.EMERGENCY_CASE);
                                            if (_strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.REPLACED.toString()]) {
                                                _this.ddlStatus = false;
                                                _this.ddlRepCase = false;
                                            }
                                            if (_strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.REVIEWED.toString()] ||
                                                _strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.REPLACED.toString()] ||
                                                _strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.PICKED.toString()] ||
                                                _strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.CASEISSUED.toString()] ||
                                                _strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.RETURNED.toString()]) {
                                                _strAddVisible = "False";
                                            }
                                        }
                                    }
                                    else {
                                        _strCaseStatus = info.STATUS.toString();
                                        _this.ddlStatusBind(_strCaseStatus, info.EMERGENCY_CASE);
                                        if (_strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.REPLACED.toString()]) {
                                            _this.ddlStatus = false;
                                            _this.ddlRepCase = false;
                                        }
                                        if (_strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.REVIEWED.toString()] ||
                                            _strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.REPLACED.toString()] ||
                                            _strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.PICKED.toString()] ||
                                            _strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.CASEISSUED.toString()] ||
                                            _strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.RETURNED.toString()]) {
                                            _strAddVisible = "False";
                                        }
                                        if (_strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.REVIEWED.toString()] ||
                                            _strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.OPEN.toString()] ||
                                            _strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.PICKED.toString()] ||
                                            _strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.CASEISSUED.toString()] ||
                                            _strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.READY.toString()] ||
                                            _strCaseStatus == "PARTIALLY PICKED") {
                                            if (_this.m_IsReplacePrefEnabled) {
                                            }
                                        }
                                    }
                                    if (lstFilter[0].EMERGENCY_CASE == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N.toString()] && (!_blnMultiStatus)) {
                                        if (_strCaseStatus = AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.OPEN.toString()] ||
                                            _strCaseStatus == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.READY.toString()]) {
                                            if (objCaseQA.lstDstCaseCartHeader.length > 0) {
                                                objCaseQA.lstDstCaseCartHeader.forEach(function (info) {
                                                    _this.repCaseData.push({ label: "CANCEL", value: AtParEnums_1.CASE_PICK_STATUS.CANCELLED });
                                                });
                                            }
                                            else {
                                                _this.ddlRepCase = false;
                                            }
                                        }
                                        else {
                                            _this.ddlRepCase = false;
                                        }
                                        if (_this.ddlRepCase == false && _this.ddlStatus == false) {
                                            _this.chkSelect = false;
                                        }
                                        else {
                                            _this.chkSelect = true;
                                        }
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageCasesComponent.prototype.gvDetails_RowDataBound = function (lstDetails) {
        var _this = this;
        var objCaseQA;
        var lstSearch = [];
        var lstCases = [];
        var lstFilter = [];
        objCaseQA = this.objCaseInfo;
        objCaseQA.lstCaseforQA.forEach(function (details) {
            lstFilter = objCaseQA.lstCaseInfo.filter(function (x) { return (function (x) { return x.CASE_ID == details.CASE_ID &&
                x.PROCEDURE_CODE == details.PROCEDURE_CODE &&
                x.PREF_LIST_ID == details.PREF_LIST_ID; }); });
            if (_this.m_IsChangeStatusEnabled) {
                _this.ddlDtlStatus = true;
            }
            else {
                _this.ddlDtlStatus = false;
            }
            _this.ddlStatusBind(details.STATUS, lstFilter[0].EMERGENCY_CASE);
            if (details.STATUS == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.REVIEWED.toString()] ||
                details.STATUS == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.OPEN.toString()] ||
                details.STATUS == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.PICKED.toString()] ||
                details.STATUS == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.CASEISSUED.toString()] ||
                details.STATUS == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.READY.toString()] ||
                details.STATUS == "PARTIALLY PICKED") {
                if (_this.m_IsReplacePrefEnabled) {
                }
            }
        });
    };
    ManageCasesComponent.prototype.onSaveClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var objCaseQA, lstSearch, lstFilter, lstCases, _drRepSearch, _drEmrSearch_1, _blnIsValidReplaceCase_1, ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lstSearch = [];
                        lstFilter = [];
                        lstCases = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 12, , 13]);
                        return [4 /*yield*/, this.UpdateDataset(event)];
                    case 2:
                        objCaseQA = _a.sent();
                        if (!(objCaseQA != null)) return [3 /*break*/, 11];
                        return [4 /*yield*/, objCaseQA.lstCaseforQA.filter(function (x) { return x.CHECKED.toString().toLowerCase() == 'true'; })];
                    case 3:
                        lstSearch = _a.sent();
                        if (!(lstSearch.length == 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, objCaseQA.lstCaseInfo.filter(function (x) { return x.CHECKED.toString().toLowerCase() == 'true'; })];
                    case 4:
                        lstSearch = _a.sent();
                        if (lstSearch.length == 0) {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No cases were selected to save" });
                            return [2 /*return*/];
                        }
                        _a.label = 5;
                    case 5: return [4 /*yield*/, objCaseQA.lstCaseInfo.forEach(function (info) {
                            var changeStatus = info.CHANGE_STATUS;
                            if (info.CHECKED.toString().toLowerCase() == 'true') {
                                if (info.CHANGE_STATUS != undefined || info.CHANGE_STATUS != null) {
                                    lstSearch = objCaseQA.lstCaseforQA.filter(function (x) { return x.CASE_ID == info.CASE_ID; });
                                    if (lstSearch.length > 1) {
                                        lstSearch.forEach(function (searchInfo) {
                                            var objRow = new VM_MT_POU_CASE_CART_HEADER_TB_1.VM_MT_POU_CASE_CART_HEADER_TB();
                                            objRow.CASE_ID = searchInfo.CASE_ID;
                                            objRow.PROCEDURE_CODE = searchInfo.PROCEDURE_CODE;
                                            objRow.PREF_LIST_ID = searchInfo.PREF_LIST_ID;
                                            objRow.CURRENT_STATUS = searchInfo.STATUS;
                                            objRow.CHANGED_STATUS = changeStatus;
                                            objRow.REPLACE_CASE = '';
                                            lstCases.push(objRow);
                                        });
                                    }
                                    else {
                                        var objRow = new VM_MT_POU_CASE_CART_HEADER_TB_1.VM_MT_POU_CASE_CART_HEADER_TB();
                                        objRow.CASE_ID = lstSearch[0].CASE_ID;
                                        objRow.PROCEDURE_CODE = lstSearch[0].PROCEDURE_CODE;
                                        objRow.PREF_LIST_ID = lstSearch[0].PREF_LIST_ID;
                                        objRow.CURRENT_STATUS = lstSearch[0].STATUS;
                                        objRow.CHANGED_STATUS = changeStatus;
                                        objRow.REPLACE_CASE = '';
                                        lstCases.push(objRow);
                                    }
                                }
                                else if (parseInt(info.REPLACE_CASE) != -1) {
                                    var objRow = new VM_MT_POU_CASE_CART_HEADER_TB_1.VM_MT_POU_CASE_CART_HEADER_TB();
                                    objRow.CASE_ID = info.CASE_ID;
                                    objRow.PROCEDURE_CODE = '';
                                    objRow.PREF_LIST_ID = '';
                                    objRow.CURRENT_STATUS = '';
                                    objRow.CHANGED_STATUS = '';
                                    objRow.REPLACE_CASE = info.REPLACE_CASE;
                                    ;
                                    lstCases.push(objRow);
                                }
                            }
                            else {
                                lstSearch = objCaseQA.lstCaseforQA.filter(function (x) { return x.CASE_ID == info.CASE_ID; });
                                if (lstSearch.length > 0) {
                                    lstSearch.forEach(function (searchInfo) {
                                        if (searchInfo.CHECKED.toString().toLowerCase() == 'true') {
                                            var objRow = new VM_MT_POU_CASE_CART_HEADER_TB_1.VM_MT_POU_CASE_CART_HEADER_TB();
                                            objRow.CASE_ID = searchInfo.CASE_ID;
                                            objRow.PROCEDURE_CODE = searchInfo.PROCEDURE_CODE;
                                            objRow.PREF_LIST_ID = searchInfo.PREF_LIST_ID;
                                            objRow.CURRENT_STATUS = searchInfo.STATUS;
                                            objRow.CHANGED_STATUS = searchInfo.CHANGE_STATUS;
                                            objRow.REPLACE_CASE = '';
                                            lstCases.push(objRow);
                                        }
                                    });
                                }
                            }
                        })];
                    case 6:
                        _a.sent();
                        if (!(lstCases.length > 0)) return [3 /*break*/, 11];
                        _drRepSearch = [];
                        _drEmrSearch_1 = [];
                        _blnIsValidReplaceCase_1 = true;
                        return [4 /*yield*/, lstCases.filter(function (x) { return x.REPLACE_CASE != ''; })];
                    case 7:
                        _drRepSearch = _a.sent();
                        if (!(_drRepSearch.length > 0)) return [3 /*break*/, 9];
                        return [4 /*yield*/, _drRepSearch.forEach(function (repSearch) {
                                if (objCaseQA.lstCaseIdDesc.length > 0) {
                                    _drEmrSearch_1 = objCaseQA.lstCaseIdDesc.filter(function (x) { return x.CASE_ID = repSearch.REPLACE_CASE; });
                                    if (_drEmrSearch_1.length > 0) {
                                        _drEmrSearch_1.filter(function (emrSearch) {
                                            lstSearch = objCaseQA.lstCaseforQA.filter(function (x) { return x.CASE_ID == repSearch.CASE_ID &&
                                                x.PROCEDURE_CODE == emrSearch.PROCEDURE_CODE &&
                                                x.PREF_LIST_ID == emrSearch.PREF_LIST_ID &&
                                                x.PHYSICIAN == emrSearch.PHYSICIAN; });
                                            if (lstSearch.length == 0) {
                                                _blnIsValidReplaceCase_1 = false;
                                                _this.confirmationService.confirm({
                                                    message: 'Procedure, Pref List does not match with the case being replaced, do you want to continue?',
                                                    accept: function () {
                                                        _this.manageCasesService.processCases(lstCases).
                                                            catch(_this.httpService.handleError).subscribe(function (res) {
                                                            var data = res.json();
                                                            _this.statusMsgs = [];
                                                            switch (data.StatType) {
                                                                case AtParEnums_1.StatusType.Success: {
                                                                    _this.statusMsgs = [];
                                                                    _this.statusMsgs.push({
                                                                        severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Saved successfully"
                                                                    });
                                                                    _this.showGrid = false;
                                                                    break;
                                                                }
                                                                case AtParEnums_1.StatusType.Warn: {
                                                                    _this.statusMsgs = [];
                                                                    _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                                                    break;
                                                                }
                                                                case AtParEnums_1.StatusType.Error: {
                                                                    _this.statusMsgs = [];
                                                                    _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                                                    break;
                                                                }
                                                                case AtParEnums_1.StatusType.Custom: {
                                                                    _this.statusMsgs = [];
                                                                    _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                                                    break;
                                                                }
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                }
                            })];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9:
                        if (!_blnIsValidReplaceCase_1) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.manageCasesService.processCases(lstCases).
                                catch(this.httpService.handleError).subscribe(function (res) {
                                var data = res.json();
                                _this.statusMsgs = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({
                                            severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Saved successfully"
                                        });
                                        _this.showGrid = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        ex_9 = _a.sent();
                        this.clientErrorMsg(ex_9);
                        return [3 /*break*/, 13];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    ManageCasesComponent.prototype.UpdateDataset = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var objCaseQA, isChecked, lstSearch, lstFilter, _loop_1, this_1, i, state_1;
            return __generator(this, function (_a) {
                isChecked = true;
                try {
                    this.statusMsgs = [];
                    lstSearch = [];
                    lstFilter = [];
                    _loop_1 = function (i) {
                        var info = new VM_MT_POU_CASE_CART_HEADER_TB_1.VM_MT_POU_CASE_CART_HEADER_TB();
                        info = this_1.lstCaseInfo[i];
                        if (info.CHECKED == "true") {
                            if (info.selectCase == false && info.selectStatus == false) {
                                if ((info.statusValue == null || info.statusValue == '' || info.statusValue == "Select Status" || info.statusValue == undefined) &&
                                    (info.repCaseValue == null || info.repCaseValue == '' || info.repCaseValue == "Select Case" || info.repCaseValue == undefined)) {
                                    this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select the Replace Case / Change Status" });
                                    isChecked = false;
                                    return "break";
                                }
                                else if ((info.statusValue != null && info.statusValue != '' && info.statusValue.toString() != 'Select Status' && info.statusValue != undefined) &&
                                    (info.repCaseValue != null && info.repCaseValue != '' && info.repCaseValue.toString() != 'Select Case' && info.repCaseValue != undefined)) {
                                    this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Only one transaction(Change Status/Replace Case) is allowed at a time" });
                                    isChecked = false;
                                    return "break";
                                }
                            }
                            else if (info.selectCase == false && (info.repCaseValue == null || info.repCaseValue == '' || info.repCaseValue == "Select Case")) {
                                this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select the Replace Case" });
                                isChecked = false;
                                return "break";
                            }
                            else if (info.selectStatus == false && (info.statusValue == null || info.statusValue == '' || info.statusValue == "Select Status")) {
                                this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select the Change Status" });
                                isChecked = false;
                                return "break";
                            }
                        }
                        objCaseQA = this_1.objCaseInfo;
                        lstSearch = objCaseQA.lstCaseInfo.filter(function (x) { return x.CASE_ID == info.CASE_ID; });
                        lstSearch[0].REPLACE_CASE = info.repCaseValue;
                        lstSearch[0].CHANGE_STATUS = info.statusValue;
                        lstSearch[0].CHECKED = info.CHECKED;
                        if (info.DETAILS != null || info.DETAILS != undefined) {
                            if (info.DETAILS.length > 1) {
                                var _loop_2 = function () {
                                    var infoDetail = info.DETAILS[j];
                                    if (infoDetail.CHECKED == "true") {
                                        if (infoDetail.statusValue == null || infoDetail.statusValue == '' || infoDetail.statusValue == "Select Status") {
                                            this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select the Change Status" });
                                            isChecked = false;
                                            return "break";
                                        }
                                        else if ((infoDetail.statusValue != null || infoDetail.statusValue != '' || infoDetail.statusValue.toString() != 'Select Status') &&
                                            (infoDetail.repCaseValue != null || infoDetail.repCaseValue != '' || infoDetail.repCaseValue.toString() != 'Select Case')) {
                                            this_1.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Only one transaction(Change Status/Replace Case) is allowed at a time" });
                                            isChecked = false;
                                            return "break";
                                        }
                                        lstFilter = objCaseQA.lstCaseInfo.filter(function (x) { return x.CASE_ID == infoDetail.CASE_ID && x.PROCEDURE_CODE == _this.procCode && x.PREF_LIST_ID == _this.prefListID; });
                                        lstFilter[0].CHANGE_STATUS = infoDetail.statusValue;
                                        lstFilter[0].CHECKED = infoDetail.CHECKED;
                                    }
                                };
                                //info.DETAILS.forEach(infoDetail => {
                                for (var j = 0; j <= info.DETAILS.length - 1; j++) {
                                    var state_2 = _loop_2();
                                    if (state_2 === "break")
                                        break;
                                }
                            }
                        }
                    };
                    this_1 = this;
                    //await this.lstCaseInfo.forEach(info => {
                    for (i = 0; i <= this.lstCaseInfo.length - 1; i++) {
                        state_1 = _loop_1(i);
                        if (state_1 === "break")
                            break;
                    }
                    if (isChecked == false) {
                        objCaseQA = null;
                    }
                    return [2 /*return*/, objCaseQA];
                }
                catch (ex) {
                    objCaseQA = null;
                    return [2 /*return*/, objCaseQA];
                }
                return [2 /*return*/];
            });
        });
    };
    ManageCasesComponent.prototype.fillCasesAuto = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var lstCaseDes, query, i;
            return __generator(this, function (_a) {
                lstCaseDes = [];
                query = event.query;
                try {
                    lstCaseDes = this.filterCaseItems(query, this.lstCaseDescr);
                    this.lstCasesItems = [];
                    for (i = 0; i <= lstCaseDes.length - 1; i++) {
                        if (lstCaseDes[i].DESCRIPTION != null && lstCaseDes[i].DESCRIPTION != "" && lstCaseDes[i].DESCRIPTION != undefined) {
                            this.lstCasesItems[i] = lstCaseDes[i].CASE_ID + " - " + lstCaseDes[i].DESCRIPTION;
                        }
                        else {
                            this.lstCasesItems[i] = lstCaseDes[i].CASE_ID;
                        }
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex);
                }
                return [2 /*return*/];
            });
        });
    };
    ManageCasesComponent.prototype.fillServiceCodesAuto = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var lstCaseDes, query, i;
            return __generator(this, function (_a) {
                lstCaseDes = [];
                query = event.query;
                try {
                    lstCaseDes = this.filterServiceItems(query, this.lstServiceCodes);
                    this.lstServiceCodesItems = [];
                    for (i = 0; i <= lstCaseDes.length - 1; i++) {
                        if (lstCaseDes[i].DESCRIPTION != null && lstCaseDes[i].DESCRIPTION != "" && lstCaseDes[i].DESCRIPTION != undefined) {
                            this.lstServiceCodesItems[i] = lstCaseDes[i].SPECIALTY_CODE + " - " + lstCaseDes[i].DESCRIPTION;
                        }
                        else {
                            this.lstServiceCodesItems[i] = lstCaseDes[i].SPECIALTY_CODE;
                        }
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex);
                }
                return [2 /*return*/];
            });
        });
    };
    ManageCasesComponent.prototype.fillProceduresAuto = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var query, ex_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstProcedureItems = [];
                        this.lstProcedureItemsList = [];
                        query = event.query;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.manageCasesService.getProcedureCodes("PROCEDURES", "", "").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.statusMsgs = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstProcedures = data.DataList;
                                        _this.lstProcedureItemsList = _this.filterCodeItems(query, _this.lstProcedures);
                                        for (var i = 0; i <= _this.lstProcedureItemsList.length - 1; i++) {
                                            _this.lstProcedureItems[i] = _this.lstProcedureItemsList[i].CODE + " - " + _this.lstProcedureItemsList[i].DESCRIPTION;
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        if (data.DataList.length == 0 && data.StatusCode === 1102002) {
                                            _this.statusMsgs = [];
                                        }
                                        else {
                                            _this.statusMsgs = [];
                                            _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_10 = _a.sent();
                        this.clientErrorMsg(ex_10);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ManageCasesComponent.prototype.fillDepartmentsAuto = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var query, ex_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstdeptItems = [];
                        this.lstdeptItemsList = [];
                        query = event.query;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.manageCasesService.getDepartments().
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.statusMsgs = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstdepts = data.DataList;
                                        _this.lstdeptItemsList = _this.filterDeptItems(query, _this.lstdepts);
                                        _this.lstdeptItems = [];
                                        for (var i = 0; i <= _this.lstdeptItemsList.length - 1; i++) {
                                            _this.lstdeptItems[i] = _this.lstdeptItemsList[i].DEPT_ID + " - " + _this.lstdeptItemsList[i].DEPT_NAME;
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        if (data.DataList.length == 0 && data.StatusCode === 1102002) {
                                            _this.statusMsgs = [];
                                        }
                                        else {
                                            _this.statusMsgs = [];
                                            _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_11 = _a.sent();
                        this.clientErrorMsg(ex_11);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ManageCasesComponent.prototype.fillPhysiciansAuto = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var query, ex_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstPhysiciansItems = [];
                        this.lstPhysiciansItemsList = [];
                        query = event.query;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.commonService.getPhysicians().
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.statusMsgs = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstPhysicians = data.DataList;
                                        _this.lstPhysiciansItemsList = _this.filterPhysicianItems(query, _this.lstPhysicians);
                                        _this.lstPhysiciansItems = [];
                                        for (var i = 0; i <= _this.lstPhysiciansItemsList.length - 1; i++) {
                                            _this.lstPhysiciansItems[i] = _this.lstPhysiciansItemsList[i].PHYSICIAN_ID + " - " + _this.lstPhysiciansItemsList[i].FIRST_NAME + " " + _this.lstPhysiciansItemsList[i].MIDDLE_INITIAL + " " + _this.lstPhysiciansItemsList[i].LAST_NAME;
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        if (data.DataList.length == 0 && data.StatusCode === 1102002) {
                                            _this.statusMsgs = [];
                                        }
                                        else {
                                            _this.statusMsgs = [];
                                            _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_12 = _a.sent();
                        this.clientErrorMsg(ex_12);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ManageCasesComponent.prototype.fillPreferenceListAuto = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var query, ex_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstPreferenceItems = [];
                        this.lstPreferenceItemsList = [];
                        query = event.query;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.manageCasesService.getPreferenceListIDs().
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.statusMsgs = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        var procitem_1 = [];
                                        var phyitem_1 = [];
                                        if (_this.ProcedureItem != null && _this.ProcedureItem != "") {
                                            procitem_1 = _this.ProcedureItem.split(" - ");
                                        }
                                        if (_this.PhysiciansItem != null && _this.PhysiciansItem != "") {
                                            phyitem_1 = _this.PhysiciansItem.split(" - ");
                                        }
                                        _this.totallstpreferences = data.DataList;
                                        _this.lstPreferences = linq_es5_1.asEnumerable(data.DataList).Where(function (x) { return x.PROCEDURE_ID === procitem_1[0] && x.PHYSICIAN_ID === phyitem_1[0]; }).Select(function (x) { return x; }).ToArray();
                                        _this.lstPreferenceItemsList = _this.filterPrefItems(query, _this.lstPreferences);
                                        _this.lstPreferenceItems = [];
                                        for (var i = 0; i <= _this.lstPreferenceItemsList.length - 1; i++) {
                                            _this.lstPreferenceItems[i] = _this.lstPreferenceItemsList[i].PREF_LIST_ID + " - " + _this.lstPreferenceItemsList[i].PREF_LIST_DESCR;
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        if (data.DataList.length == 0 && data.StatusCode === 1102002) {
                                            _this.statusMsgs = [];
                                        }
                                        else {
                                            _this.statusMsgs = [];
                                            _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_13 = _a.sent();
                        this.clientErrorMsg(ex_13);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ManageCasesComponent.prototype.fillProcCodeAuto = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var lstProcedures, lstProcoCode, filter, query, i;
            return __generator(this, function (_a) {
                lstProcedures = [];
                lstProcoCode = [];
                filter = [];
                this.lstProcedureCodes = [];
                query = event.query;
                try {
                    lstProcedures = this.objCaseInfo.lstCaseforQA;
                    filter = lstProcedures.filter(function (x) { return x.CASE_ID == _this.itemCaseID; });
                    lstProcoCode = this.filterProcCodeItems(query, filter);
                    for (i = 0; i <= lstProcoCode.length - 1; i++) {
                        this.lstProcedureCodes[i] = lstProcoCode[i].PROCEDURE_CODE;
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex);
                }
                return [2 /*return*/];
            });
        });
    };
    ManageCasesComponent.prototype.fillPreferenceAuto = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var lstProcedures, lstProcoCode, filter, query, i;
            return __generator(this, function (_a) {
                lstProcedures = [];
                lstProcoCode = [];
                filter = [];
                query = event.query;
                try {
                    lstProcedures = this.objCaseInfo.lstCaseforQA;
                    filter = lstProcedures.filter(function (x) { return x.CASE_ID == _this.itemCaseID && x.PROCEDURE_CODE == _this.subItem.PROCEDURE_CODE; });
                    this.lstPrefItems = [];
                    lstProcoCode = this.filterPrefItems(query, filter);
                    for (i = 0; i <= lstProcoCode.length - 1; i++) {
                        this.lstPrefItems[i] = lstProcoCode[i].PREF_LIST_ID;
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex);
                }
                return [2 /*return*/];
            });
        });
    };
    ManageCasesComponent.prototype.GetDeptCostCenters = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.manageCasesService.getDeptCostCenters().
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.statusMsgs = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstdeptcostcenters = data.DataList;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        if (data.DataList.length == 0 && data.StatusCode === 1102002) {
                                            _this.statusMsgs = [];
                                        }
                                        else {
                                            _this.statusMsgs = [];
                                            _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_14 = _a.sent();
                        this.clientErrorMsg(ex_14);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageCasesComponent.prototype.filterProcCodeItems = function (query, items) {
        var filtered = [];
        if (query == "%") {
            var _loop_3 = function (i) {
                var itemValue = items[i];
                if ((filtered.filter(function (x) { return x.PROCEDURE_CODE == itemValue.PROCEDURE_CODE; })).length == 0) {
                    filtered.push(itemValue);
                }
            };
            for (var i = 0; i < items.length; i++) {
                _loop_3(i);
            }
        }
        else {
            if (query.length >= 0) {
                var _loop_4 = function (i) {
                    var itemValue = items[i];
                    if (itemValue.PROCEDURE_CODE.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        if ((filtered.filter(function (x) { return x.PROCEDURE_CODE == itemValue.PROCEDURE_CODE; })).length == 0) {
                            filtered.push(itemValue);
                        }
                    }
                };
                for (var i = 0; i < items.length; i++) {
                    _loop_4(i);
                }
            }
        }
        return filtered;
    };
    ManageCasesComponent.prototype.filterCaseItems = function (query, items) {
        var filtered = [];
        if (query == "%") {
            var _loop_5 = function (i) {
                var itemValue = items[i];
                if ((filtered.filter(function (x) { return x.CASE_ID == itemValue.CASE_ID; })).length == 0) {
                    filtered.push(itemValue);
                }
            };
            for (var i = 0; i < items.length; i++) {
                _loop_5(i);
            }
        }
        else {
            if (query.length >= 0) {
                var _loop_6 = function (i) {
                    var itemValue = items[i];
                    if (itemValue.CASE_ID.toLowerCase().indexOf(query.toLowerCase()) == 0 || itemValue.DESCRIPTION.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        if ((filtered.filter(function (x) { return x.CASE_ID == itemValue.CASE_ID || x.DESCRIPTION == itemValue.DESCRIPTION; })).length == 0) {
                            filtered.push(itemValue);
                        }
                    }
                };
                for (var i = 0; i < items.length; i++) {
                    _loop_6(i);
                }
            }
        }
        return filtered;
    };
    ManageCasesComponent.prototype.filterServiceItems = function (query, items) {
        var filtered = [];
        if (query == "%") {
            var _loop_7 = function (i) {
                var itemValue = items[i];
                if ((filtered.filter(function (x) { return x.SPECIALTY_CODE == itemValue.SPECIALTY_CODE; })).length == 0) {
                    filtered.push(itemValue);
                }
            };
            for (var i = 0; i < items.length; i++) {
                _loop_7(i);
            }
        }
        else {
            if (query.length >= 0) {
                var _loop_8 = function (i) {
                    var itemValue = items[i];
                    if (itemValue.SPECIALTY_CODE.toLowerCase().indexOf(query.toLowerCase()) == 0 || itemValue.DESCRIPTION.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        if ((filtered.filter(function (x) { return x.SPECIALTY_CODE == itemValue.SPECIALTY_CODE || x.DESCRIPTION == itemValue.DESCRIPTION; })).length == 0) {
                            filtered.push(itemValue);
                        }
                    }
                };
                for (var i = 0; i < items.length; i++) {
                    _loop_8(i);
                }
            }
        }
        return filtered;
    };
    ManageCasesComponent.prototype.filterCodeItems = function (query, items) {
        var filtered = [];
        if (query == "%") {
            var _loop_9 = function (i) {
                var itemValue = items[i];
                if ((filtered.filter(function (x) { return x.CODE == itemValue.CODE || x.DESCRIPTION == itemValue.DESCRIPTION; })).length == 0) {
                    filtered.push(itemValue);
                }
            };
            for (var i = 0; i < items.length; i++) {
                _loop_9(i);
            }
        }
        else {
            if (query.length >= 0) {
                var _loop_10 = function (i) {
                    var itemValue = items[i];
                    if (itemValue.CODE.toLowerCase().indexOf(query.toLowerCase()) == 0 || itemValue.DESCRIPTION.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        if ((filtered.filter(function (x) { return x.CODE == itemValue.CODE || x.DESCRIPTION == itemValue.DESCRIPTION; })).length == 0) {
                            filtered.push(itemValue);
                        }
                    }
                };
                for (var i = 0; i < items.length; i++) {
                    _loop_10(i);
                }
            }
        }
        return filtered;
    };
    ManageCasesComponent.prototype.filterDeptItems = function (query, items) {
        var filtered = [];
        if (query == "%") {
            var _loop_11 = function (i) {
                var itemValue = items[i];
                if ((filtered.filter(function (x) { return x.DEPT_ID == itemValue.DEPT_ID; })).length == 0) {
                    filtered.push(itemValue);
                }
            };
            for (var i = 0; i < items.length; i++) {
                _loop_11(i);
            }
        }
        else {
            if (query.length >= 0) {
                var _loop_12 = function (i) {
                    var itemValue = items[i];
                    if (itemValue.DEPT_ID.toLowerCase().indexOf(query.toLowerCase()) == 0 || itemValue.DEPT_NAME.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        if ((filtered.filter(function (x) { return x.DEPT_ID == itemValue.DEPT_ID || x.DEPT_NAME == itemValue.DEPT_NAME; })).length == 0) {
                            filtered.push(itemValue);
                        }
                    }
                };
                for (var i = 0; i < items.length; i++) {
                    _loop_12(i);
                }
            }
        }
        return filtered;
    };
    ManageCasesComponent.prototype.filterPhysicianItems = function (query, items) {
        var filtered = [];
        if (query == "%") {
            var _loop_13 = function (i) {
                var itemValue = items[i];
                if ((filtered.filter(function (x) { return x.PHYSICIAN_ID == itemValue.PHYSICIAN_ID; })).length == 0) {
                    filtered.push(itemValue);
                }
            };
            for (var i = 0; i < items.length; i++) {
                _loop_13(i);
            }
        }
        else {
            if (query.length >= 0) {
                var _loop_14 = function (i) {
                    var itemValue = items[i];
                    if (itemValue.PHYSICIAN_ID.toLowerCase().indexOf(query.toLowerCase()) == 0 ||
                        itemValue.FIRST_NAME.toLowerCase().indexOf(query.toLowerCase()) == 0 ||
                        itemValue.MIDDLE_INITIAL.toLowerCase().indexOf(query.toLowerCase()) == 0 ||
                        itemValue.LAST_NAME.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        if ((filtered.filter(function (x) { return x.PHYSICIAN_ID == itemValue.PHYSICIAN_ID ||
                            x.FIRST_NAME == itemValue.FIRST_NAME ||
                            x.MIDDLE_INITIAL == itemValue.MIDDLE_INITIAL ||
                            x.LAST_NAME == itemValue.LAST_NAME; })).length == 0) {
                            filtered.push(itemValue);
                        }
                    }
                };
                for (var i = 0; i < items.length; i++) {
                    _loop_14(i);
                }
            }
        }
        return filtered;
    };
    ManageCasesComponent.prototype.filterPrefItems = function (query, items) {
        var filtered = [];
        if (query == "%") {
            var _loop_15 = function (i) {
                var itemValue = items[i];
                if ((filtered.filter(function (x) { return x.PREF_LIST_ID == itemValue.PREF_LIST_ID; })).length == 0) {
                    filtered.push(itemValue);
                }
            };
            for (var i = 0; i < items.length; i++) {
                _loop_15(i);
            }
        }
        else {
            if (query.length >= 0) {
                var _loop_16 = function (i) {
                    var itemValue = items[i];
                    if (itemValue.PREF_LIST_ID.toLowerCase().indexOf(query.toLowerCase()) != -1) {
                        if (itemValue.PREF_LIST_ID.toLowerCase().indexOf(query.toLowerCase()) == 0 || itemValue.PREF_LIST_DESCR.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                            if ((filtered.filter(function (x) { return x.PREF_LIST_ID == itemValue.PREF_LIST_ID || x.PREF_LIST_DESCR == itemValue.PREF_LIST_DESCR; })).length == 0) {
                                filtered.push(itemValue);
                            }
                        }
                    }
                };
                for (var i = 0; i < items.length; i++) {
                    _loop_16(i);
                }
            }
        }
        return filtered;
    };
    ManageCasesComponent.prototype.clientErrorMsg = function (strExMsg) {
        this.statusMsgs = [];
        this.atParConstant.catchClientError(this.statusMsgs, this.spinnerService, strExMsg.toString());
    };
    ManageCasesComponent.prototype.Validate = function () {
        try {
            if (this.performDate != null) {
                this.performDateStatus = 0;
            }
            else {
                this.performDateStatus = 1;
            }
            if (this.PhysiciansItem != null && this.PhysiciansItem != "" && this.PhysiciansItem != "%") {
                this.physiciansItemStatus = 0;
            }
            else {
                this.physiciansItemStatus = 1;
            }
            if (this.ProcedureItem != null && this.ProcedureItem != "" && this.ProcedureItem != "%") {
                this.procedureItemStatus = 0;
            }
            else {
                this.procedureItemStatus = 1;
            }
            if (this.Preference != null && this.Preference != "" && this.Preference != "%") {
                this.preferenceStatus = 0;
            }
            else {
                this.preferenceStatus = 1;
            }
            if (this.dept != null && this.dept != "" && this.dept != "%") {
                this.deptStatus = 0;
            }
            else {
                this.deptStatus = 1;
            }
            if (this.txtcaseIDStatus == 0 && this.txtcaseDescStatus == 0 && this.txtpatientStatus == 0 && this.performDateStatus == 0 && this.physiciansItemStatus == 0
                && this.procedureItemStatus == 0 && this.preferenceStatus == 0 && this.deptStatus == 0 &&
                (this.caseId != "" || this.caseId != undefined || this.caseId != null) && (this.caseDesc != "" || this.caseDesc != undefined || this.caseDesc != null) &&
                (this.patient != "" || this.patient != undefined || this.patient != null)) {
                this.loading = false;
            }
            else {
                this.loading = true;
            }
            if (this.rep_Preference != null && this.rep_Preference != "" && this.rep_Preference != "%") {
                this.replacePrefformSaveEnableDisable = false;
            }
            else {
                this.replacePrefformSaveEnableDisable = true;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ManageCasesComponent.prototype.bindModelDataChange = function (event) {
        try {
            if ("txtCaseID" == event.TextBoxID.toString()) {
                this.txtcaseIDStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtCaseDesc" == event.TextBoxID.toString()) {
                this.txtcaseDescStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtpatient" == event.TextBoxID.toString()) {
                this.txtpatientStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            this.Validate();
            if (this.txtcaseIDStatus == 0 && this.txtcaseDescStatus == 0 && this.txtpatientStatus == 0 && this.performDateStatus == 0 && this.physiciansItemStatus == 0
                && this.procedureItemStatus == 0 && this.preferenceStatus == 0 && this.deptStatus == 0) {
                this.loading = false;
            }
            else {
                this.loading = true;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ManageCasesComponent.prototype.Save_Click = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var procitem_2, procitem1, phyitem_2, phyitem1, prefitem_1, prefitem1, deptlst_1, deptlist1, getdeptCostcenter, ex_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        this.spinnerService.start();
                        procitem_2 = [];
                        procitem1 = [];
                        phyitem_2 = [];
                        phyitem1 = [];
                        prefitem_1 = [];
                        prefitem1 = [];
                        deptlst_1 = [];
                        deptlist1 = [];
                        getdeptCostcenter = [];
                        //date validating
                        if (this.performDate != null) {
                            if (Date.parse(this.performDate.getMonth() + '/' + this.performDate.getDate() + '/' + this.performDate.getFullYear()) < Date.parse(this.currentDate.getMonth() + "/" + this.currentDate.getDate() + "/" + this.currentDate.getFullYear())) {
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Perform Date must be greater than or equal to today's date" });
                                this.spinnerService.stop();
                                return [2 /*return*/];
                            }
                            else {
                                this.convertDate = this.convert(this.performDate);
                            }
                        }
                        else {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please enter date" });
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        //procedure item validating
                        if (this.ProcedureItem != null || this.ProcedureItem != "") {
                            procitem_2 = this.ProcedureItem.split(" - ");
                        }
                        if (this.lstProcedures != null && this.lstProcedures.length > 0) {
                            procitem1 = linq_es5_1.asEnumerable(this.lstProcedures).Where(function (x) { return x.CODE == procitem_2[0]; }).Select(function (x) { return x; }).ToArray();
                            if (procitem1.length == 0) {
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please enter valid Procedure ID" });
                                this.spinnerService.stop();
                                return [2 /*return*/];
                            }
                            else {
                                this.strServiceCode = procitem1[0].SCODE;
                            }
                        }
                        else {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please enter valid Procedure ID" });
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        //physician item validating
                        if (this.PhysiciansItem != null || this.PhysiciansItem != "") {
                            phyitem_2 = this.PhysiciansItem.split(" - ");
                        }
                        if (this.lstPhysicians != null && this.lstPhysicians.length > 0) {
                            phyitem1 = linq_es5_1.asEnumerable(this.lstPhysicians).Where(function (x) { return x.PHYSICIAN_ID == phyitem_2[0]; }).Select(function (x) { return x.PHYSICIAN_ID; }).ToArray();
                            if (phyitem1.length == 0) {
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please enter valid Physician ID" });
                                this.spinnerService.stop();
                                return [2 /*return*/];
                            }
                        }
                        else {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please enter valid Physician ID" });
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        //preference list validating
                        if (this.Preference != null || this.Preference != "") {
                            prefitem_1 = this.Preference.split(" - ");
                        }
                        if (this.totallstpreferences != null && this.totallstpreferences.length > 0) {
                            prefitem1 = linq_es5_1.asEnumerable(this.totallstpreferences).Where(function (x) { return x.PREF_LIST_ID == prefitem_1[0] && x.PHYSICIAN_ID == phyitem_2[0] && x.PROCEDURE_ID == procitem_2[0]; }).Select(function (x) { return x.PREF_LIST_ID; }).ToArray();
                            if (prefitem1.length == 0) {
                                prefitem1 = linq_es5_1.asEnumerable(this.totallstpreferences).Where(function (x) { return x.PREF_LIST_ID == prefitem_1[0] && x.PROCEDURE_ID == procitem_2[0]; }).Select(function (x) { return x.PREF_LIST_ID; }).ToArray();
                                if (prefitem1.length == 0) {
                                    this.statusMsgs = [];
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please enter valid Preference ID" });
                                    this.spinnerService.stop();
                                    return [2 /*return*/];
                                }
                            }
                        }
                        else {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please enter valid Preference ID" });
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        //department list validating
                        if (this.dept != null || this.dept != "") {
                            deptlst_1 = this.dept.split(" - ");
                        }
                        if (this.lstdepts != null && this.lstdepts.length > 0) {
                            deptlist1 = linq_es5_1.asEnumerable(this.lstdepts).Where(function (x) { return x.DEPT_ID == deptlst_1[0]; }).Select(function (x) { return x.DEPT_ID; }).ToArray();
                            if (deptlist1.length == 0) {
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please enter valid Dept ID" });
                                this.spinnerService.stop();
                                return [2 /*return*/];
                            }
                        }
                        else {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please enter valid Dept ID" });
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        if (this.lstdeptcostcenters != null && this.lstdeptcostcenters.length > 0) {
                            this.lstdeptcostcenters = linq_es5_1.asEnumerable(this.lstdeptcostcenters).Where(function (x) { return x.DEPT_ID == deptlst_1[0]; }).OrderBy(function (x) { return x.COST_CENTER_CODE; }).Select(function (x) { return x; }).ToArray();
                            if (this.lstdeptcostcenters.length > 0) {
                                this.strcostcenter = this.lstdeptcostcenters[0].COST_CENTER_CODE;
                            }
                        }
                        this.CheckForDuplicates(this.caseId, prefitem_1[0], procitem_2[0]);
                        if (!this.IsDuplicate) return [3 /*break*/, 1];
                        this.statusMsgs = [];
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Case ID already exists" });
                        this.spinnerService.stop();
                        return [2 /*return*/];
                    case 1: return [4 /*yield*/, this.AddCaseInfo(this.caseId, this.caseDesc, phyitem_2[0], this.patient, prefitem_1[0], procitem_2[0], this.convertDate, "", AtParEnums_1.CASE_PICK_STATUS.OPEN.toString(), deptlst_1[0], this.strServiceCode, this.strcostcenter)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        this.spinnerService.stop();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_15 = _a.sent();
                        this.clientErrorMsg(ex_15);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ManageCasesComponent.prototype.convert = function (str) {
        var date = new Date(str), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("/");
    };
    ManageCasesComponent.prototype.CheckForDuplicates = function (caseID, prefID, procID) {
        try {
            var caseIDs = [];
            if (this.objCaseInfo != undefined || this.objCaseInfo != null) {
                if (this.objCaseInfo.lstCaseInfo.length > 0) {
                    caseIDs = this.objCaseInfo.lstCaseforQA;
                    var selRows = linq_es5_1.asEnumerable(caseIDs).Where(function (x) { return x.CASE_ID == caseID && x.PREF_LIST_ID == prefID && x.PROCEDURE_CODE == procID; }).Select(function (X) { return X; }).ToArray();
                    if (selRows.length > 0) {
                        this.IsDuplicate = true;
                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ManageCasesComponent.prototype.AddCaseInfo = function (CaseID, CaseDesc, PhyID, Patient, PrefID, ProcID, Date, RoomNo, Status, DeptId, ServiceCode, CostCenter) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.manageCasesService.addCaseInfo(CaseID, CaseDesc, PhyID, Patient, PrefID, ProcID, Date, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], RoomNo, Status, AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString(), DeptId, ServiceCode, CostCenter).
                                catch(this.httpService.handleError).then(function (res) {
                                var resp = res.json();
                                _this.spinnerService.stop();
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Emergency case is created successfully" });
                                        _this.loading = true;
                                        _this.ProcedureItem = "";
                                        _this.PhysiciansItem = "";
                                        _this.caseId = "";
                                        _this.caseDesc = "";
                                        _this.performDate = null;
                                        _this.Preference = "";
                                        _this.patient = "";
                                        _this.dept = "";
                                        _this.strcostcenter = "";
                                        _this.strServiceCode = "";
                                        document.getElementById("txtCaseID").focus();
                                        break;
                                    case AtParEnums_1.StatusType.Error:
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                        break;
                                    case AtParEnums_1.StatusType.Warn:
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                        break;
                                }
                                _this.atParConstant.scrollToTop();
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_16 = _a.sent();
                        this.clientErrorMsg(ex_16);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageCasesComponent.prototype.review_Case_Items = function (pref) {
        try {
            this.breadCrumbMenu.SUB_MENU_NAME = 'Replace Pref Card';
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            if ((pref.STATUS == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.REVIEWED].toString() || pref.STATUS == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.OPEN].toString() || pref.STATUS == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.PICKED].toString() ||
                pref.STATUS == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.CASEISSUED].toString() || pref.STATUS == AtParEnums_1.CASE_PICK_STATUS[AtParEnums_1.CASE_PICK_STATUS.READY].toString() || pref.STATUS == "PARTIALLY PICKED") && this.replaceprefCardStatus == true) {
                this.replacePrefform = true;
                this.page = false;
                this.showGrid = false;
                this.form = false;
                this.table = false;
                this.editform = false;
                this.rep_Preference = "";
                this.replacePref_patient = pref.PATIENTNAME;
                this.replacePref_Procedure = pref.PROCEDURENAME;
                this.dtCasesItem = new vm_mt_pou_case_info_1.VM_MT_POU_CASE_INFO();
                this.dtCasesItem.CASE_ID = pref.CASE_ID;
                this.dtCasesItem.PREF_LIST_ID = pref.PREF_LIST_ID;
                this.dtCasesItem.STATUS = pref.STATUS;
                this.replacePrefformSaveEnableDisable = true;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ManageCasesComponent.prototype.fillReplacePreferenceListAuto = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var query, ex_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstReplacePreferenceItems = [];
                        this.lstReplacePreferenceItemsList = [];
                        query = event.query;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.manageCasesService.getPreferenceListIDs().
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.statusMsgs = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstReplacePreference = data.DataList;
                                        _this.lstReplacePreferenceItemsList = _this.filterPrefItems(query, _this.lstReplacePreference);
                                        for (var i = 0; i <= _this.lstReplacePreferenceItemsList.length - 1; i++) {
                                            _this.lstReplacePreferenceItems[i] = _this.lstReplacePreferenceItemsList[i].PREFLISTNAME + " /" + _this.lstReplacePreferenceItemsList[i].PREF_PROCEDURES;
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_17 = _a.sent();
                        this.clientErrorMsg(ex_17);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ManageCasesComponent.prototype.goReplacePref_Back = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.breadCrumbMenu.SUB_MENU_NAME = '';
                        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        this.spinnerService.start();
                        return [4 /*yield*/, this.BindGrid()];
                    case 1:
                        _a.sent();
                        this.spinnerService.stop();
                        this.replacePrefform = false;
                        this.page = true;
                        this.showGrid = true;
                        this.form = false;
                        this.table = false;
                        this.editform = false;
                        this.replacePref_patient = "";
                        this.replacePref_Procedure = "";
                        this.rep_Preference = "";
                        this.statusMsgs = [];
                        return [3 /*break*/, 3];
                    case 2:
                        ex_18 = _a.sent();
                        this.clientErrorMsg(ex_18);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageCasesComponent.prototype.replacePref_Save = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var replacePref_Procitem, arrSplitPrefProc, arrPrefAttributes, arrProcAttributes, strPrefID, strNewProcID, ex_19;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        replacePref_Procitem = [];
                        arrSplitPrefProc = [];
                        arrPrefAttributes = [];
                        arrProcAttributes = [];
                        if (this.replacePref_Procedure != null && this.replacePref_Procedure != "") {
                            replacePref_Procitem = this.replacePref_Procedure.split(" - ");
                        }
                        if (this.rep_Preference != null || this.rep_Preference != "") {
                            if (this.rep_Preference.indexOf(") /") > 1) {
                                arrSplitPrefProc = this.rep_Preference.split(") /");
                                if (arrSplitPrefProc != null && arrSplitPrefProc.length > 0) {
                                    if (arrSplitPrefProc[0] != null || arrSplitPrefProc[0] != "") {
                                        arrSplitPrefProc[0] = arrSplitPrefProc[0].trim();
                                        arrPrefAttributes = arrSplitPrefProc[0].split("(");
                                        strPrefID = arrPrefAttributes[arrPrefAttributes.length - 1];
                                    }
                                    if (arrSplitPrefProc[1] != null || arrSplitPrefProc[1] != "") {
                                        arrProcAttributes = arrSplitPrefProc[1].split("(");
                                        strNewProcID = arrProcAttributes[arrProcAttributes.length - 1];
                                        strNewProcID = strNewProcID.replace(")", "");
                                    }
                                }
                            }
                            else {
                                if (this.lstReplacePreference != null && this.lstReplacePreference.length > 0) {
                                    this.lstReplacePreference = linq_es5_1.asEnumerable(this.lstReplacePreference).Where(function (x) { return x.PREF_LIST_ID === _this.rep_Preference; }).Select(function (x) { return x; }).ToArray();
                                    if (this.lstReplacePreference.length == 0) {
                                        this.statusMsgs = [];
                                        this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Please enter valid Preference ID" });
                                        this.spinnerService.stop();
                                        return [2 /*return*/];
                                    }
                                    else {
                                        if (this.lstReplacePreference.length > 1) {
                                            this.statusMsgs = [];
                                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Please select the correct pref / procedure combination" });
                                            this.spinnerService.stop();
                                            return [2 /*return*/];
                                        }
                                        else {
                                            strPrefID = this.rep_Preference;
                                            strNewProcID = this.lstReplacePreference[0].PROCEDURE_ID;
                                        }
                                    }
                                }
                            }
                        }
                        this.spinnerService.stop();
                        //VM_MT_POU_CASE_INFO
                        this.dtCasesItem.PROCEDURE_CODE = replacePref_Procitem[0];
                        this.dtCasesItem.NEW_PREF_LIST_ID = strPrefID;
                        this.dtCasesItem.NEW_PROCEDURE_CODE = strNewProcID;
                        this.dtCases = [];
                        this.dtCases.push(this.dtCasesItem);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.manageCasesService.replacePrefCard(this.dtCases).
                                catch(this.httpService.handleError).then(function (res) {
                                var resp = res.json();
                                _this.spinnerService.stop();
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: " Pref card: " + _this.dtCasesItem.PREF_LIST_ID + " in case: " + _this.dtCasesItem.CASE_ID + " replaced with pref card: " + _this.dtCasesItem.NEW_PREF_LIST_ID });
                                        _this.replacePrefformSaveEnableDisable = true;
                                        break;
                                    case AtParEnums_1.StatusType.Error:
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                        break;
                                    case AtParEnums_1.StatusType.Warn:
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                        break;
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_19 = _a.sent();
                        this.clientErrorMsg(ex_19);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ManageCasesComponent.prototype.Details_Load = function (caseInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _strCaseID, _strCaseInfo, objCaseQA, lstFilter, ex_20;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, 5, 6]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.manageCasesService.SearchItem().
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.statusMsgs = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.dataDictionary = data.DataDictionary;
                                        _this.lstSearchDetails = data.DataDictionary["lstSearchDetails"];
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Error while getting data" });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        this.statusList = [];
                        this.statusList.push({ label: 'All', value: null });
                        this.statusList.push({ label: 'Active', value: true });
                        this.statusList.push({ label: 'InActive', value: false });
                        return [4 /*yield*/, this.commonService.getProfileParamValue(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID], AtParEnums_1.EnumApps.PointOfUse.toString(), "MAX_ALLOW_QTY").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.statusMsgs = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this._strMaxAllowQty = data.DataVariable.toString();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        _strCaseID = caseInfo.qCaseId;
                        _strCaseInfo = _strCaseID.split(':');
                        this.itemCaseID = caseInfo.CASE_ID;
                        this.status = _strCaseInfo[1];
                        if (this.status == "False") {
                            this.isAddItem = false;
                        }
                        else {
                            this.isAddItem = true;
                        }
                        objCaseQA = void 0;
                        lstFilter = [];
                        objCaseQA = this.objCaseInfo;
                        lstFilter = objCaseQA.lstCaseforQA.filter(function (x) { return x.CASE_ID == _this.itemCaseID; });
                        if (lstFilter.length > 1) {
                            this.isDetails = true;
                        }
                        else {
                            this.procedureCode = lstFilter[0].PROCEDURE_CODE;
                            this.preferenceList = lstFilter[0].PREF_LIST_ID;
                            this.isDetails = false;
                        }
                        this.patID = lstFilter[0].PATIENTNAME;
                        return [4 /*yield*/, this.itemBindGrid()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 4:
                        ex_20 = _a.sent();
                        return [2 /*return*/, false];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ManageCasesComponent.prototype.itemBindGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_21;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.manageCasesService.getCaseItems(this.itemCaseID, AtParEnums_1.Case_Review_Type.PRE).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.statusMsgs = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.dataDictionary = data.DataDictionary;
                                        var lstCartDetails = [];
                                        var lstCaseCartheader = [];
                                        var lstCartheader = [];
                                        lstCartDetails = _this.dataDictionary["CARTDETAILS"];
                                        lstCartheader = _this.dataDictionary["CARTSHEADERS"];
                                        lstCaseCartheader = _this.dataDictionary["CASECARTHEADER"];
                                        _this.lstCaseItemsInfo = _this.dataDictionary["CARTDETAILS"];
                                        if (lstCartheader.length > 0) {
                                            _this.physician = lstCartheader[0].PHYSICIAN_DESCR;
                                        }
                                        _this.lstCaseData = [];
                                        if (lstCartDetails.length > 0) {
                                            for (var i = 0; i <= lstCartDetails.length - 1; i++) {
                                                lstCartDetails[i].oldpickqty = lstCartDetails[i].OLD_PICK_QTY;
                                                lstCartDetails[i].oldholdqty = lstCartDetails[i].HOLD_QTY;
                                                var lstCartSearch = [];
                                                // lstCartSearch = lstCaseCartheader.filter(x => x.CASE_ID == this.itemCaseID && x.PROCEDURE_CODE == this.procedureCode && x.PREF_LIST_ID == this.preferenceList);
                                                lstCartSearch = lstCaseCartheader.filter(function (x) { return x.CASE_ID == _this.itemCaseID; });
                                                if (lstCartSearch.length > 0) {
                                                    var intStatus = lstCartSearch[0].STATUS;
                                                    if (intStatus == AtParEnums_1.CASE_PICK_STATUS.READY || intStatus == AtParEnums_1.CASE_PICK_STATUS.OPEN) {
                                                        lstCartDetails[i].ITEMSTATUS = false;
                                                        lstCartDetails[i].isHoldQty = false;
                                                        lstCartDetails[i].isPickQty = false;
                                                        _this.lnkItemStatus = true;
                                                        if (lstCartDetails[i].ITEM_STATUS === "Y") {
                                                            lstCartDetails[i].ITEMSTATUS = true;
                                                            lstCartDetails[i].isHoldQty = false;
                                                            lstCartDetails[i].isPickQty = false;
                                                        }
                                                        else {
                                                            lstCartDetails[i].ITEMSTATUS = false;
                                                            lstCartDetails[i].isHoldQty = true;
                                                            lstCartDetails[i].isPickQty = true;
                                                        }
                                                    }
                                                    else {
                                                        lstCartDetails[i].isHoldQty = true;
                                                        lstCartDetails[i].isPickQty = true;
                                                        _this.lnkItemStatus = false;
                                                    }
                                                }
                                            }
                                            if (_this.isDetailSaved == true) {
                                                _this.statusMsgs = [];
                                                _this.statusMsgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Saved successfully" });
                                                _this.lstCaseData = lstCartDetails;
                                                sessionStorage.setItem("cartDetails", JSON.stringify(_this.lstCaseData));
                                                return _this.lstCaseData;
                                            }
                                            else {
                                                _this.lstCaseData = lstCartDetails;
                                                sessionStorage.setItem("cartDetails", JSON.stringify(_this.lstCaseData));
                                                return _this.lstCaseData;
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_21 = _a.sent();
                        this.clientErrorMsg(ex_21);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageCasesComponent.prototype.lookup = function () {
        var _this = this;
        var strItemID = '';
        var _sbSearch = '';
        try {
            strItemID = this.subItem.ITEMID;
            this.statusMsgs = [];
            if (strItemID == null || strItemID == '' || strItemID == undefined) {
                this.lookupitem = false;
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please enter any search text" });
                return;
            }
            var filterItems = [];
            var itemIfo = [];
            itemIfo = this.lstSearchDetails;
            var filtercount = 0;
            var _sbSearch_1 = '';
            if (itemIfo != null && itemIfo != undefined) {
                if (itemIfo.length > 0) {
                    if (strItemID == '%') {
                        filterItems = itemIfo;
                    }
                    else if (strItemID != null && strItemID != '') {
                        filterItems = itemIfo.filter(function (x) { return (x.ITEMID.toLowerCase() == strItemID.toLowerCase()) || (x.MFG_ITEM_ID.toLowerCase() == strItemID.toLowerCase()) || (x.VENDOR_ITEM_ID.toLowerCase() == strItemID.toLowerCase()) ||
                            (x.UPCID.toLowerCase() == strItemID.toLowerCase()) || (x.GTIN.toLowerCase() == strItemID.toLowerCase())
                            || (x.ITEM_DESCR.toLowerCase().indexOf(strItemID.toLowerCase()) >= 0); });
                    }
                    this.lookupitem = false;
                    if (filterItems.length > 0) {
                        this.lstSubItemData = [];
                        this.subItem.ITEMID = filterItems[0].ITEMID;
                        this.subItem.ITEM_DESCR = filterItems[0].ITEM_DESCR;
                        if (filterItems.length != 1) {
                            filterItems.forEach(function (item) {
                                if (_this.lstSubItemData.filter(function (x) { return x.ITEMID == item.ITEMID && x.ITEM_DESCR == item.ITEM_DESCR
                                    && x.CUST_ITEM_ID == item.CUST_ITEM_ID && x.VENDOR_ITEM_ID == item.VENDOR_ITEM_ID && x.MFG_ITEM_ID == item.MFG_ITEM_ID
                                    && x.UPCID == item.UPCID && x.GTIN == item.GTIN; }).length == 0) {
                                    _this.lstSubItemData.push(item);
                                }
                            });
                        }
                        if (this.lstSubItemData.length > 1) {
                            this.lookupitem = true;
                        }
                    }
                    else {
                        this.subItem.ITEM_DESCR = '';
                        this.statusMsgs = [];
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please enter the valid item" });
                        return;
                    }
                }
                else {
                    this.statusMsgs = [];
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No locations allocated" });
                    return;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
        }
    };
    ManageCasesComponent.prototype.onCaseDetailsClick = function (caseInfo, event) {
        return __awaiter(this, void 0, void 0, function () {
            var getDetailsBool, ex_22;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.breadCrumbMenu.SUB_MENU_NAME = 'Case Details';
                        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.Details_Load(caseInfo)];
                    case 2:
                        getDetailsBool = _a.sent();
                        if (getDetailsBool) {
                            this.editform = true;
                            this.page = false;
                            this.showGrid = false;
                            this.showItemGrid = true;
                            this.additem = false;
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        ex_22 = _a.sent();
                        this.clientErrorMsg(ex_22);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ManageCasesComponent.prototype.onCaseDetailsGoBackClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.breadCrumbMenu.SUB_MENU_NAME = '';
                this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                try {
                    this.statusMsgs = [];
                    this.editform = false;
                    this.page = true;
                    this.showGrid = true;
                    this.showItemGrid = false;
                    this.additem = false;
                    this.subItem.ITEMID = '';
                    this.subItem.ITEM_DESCR = '';
                    this.lookupitem = false;
                }
                catch (ex) {
                    this.clientErrorMsg(ex);
                }
                return [2 /*return*/];
            });
        });
    };
    ManageCasesComponent.prototype.onItemSearchClick = function () {
        try {
            this.showItemGrid = false;
            this.addItems = false;
            this.editform = false;
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ManageCasesComponent.prototype.onAddItems = function () {
        try {
            this.showItemGrid = true;
            this.addItems = true;
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ManageCasesComponent.prototype.insertSubItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var lstProcedures, lstProcoCode, filter, filterRow, filterItem, filterCaseInfo, item, ex_23;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lstProcedures = [];
                        lstProcoCode = [];
                        filter = [];
                        filterRow = [];
                        filterItem = [];
                        filterCaseInfo = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        lstProcedures = this.objCaseInfo.lstCaseforQA;
                        filter = this.objCaseInfo.lstCaseforQA.filter(function (x) { return x.CASE_ID == _this.itemCaseID && x.PROCEDURE_CODE == _this.subItem.PROCEDURE_CODE; });
                        filterRow = this.objCaseInfo.lstCaseforQA.filter(function (x) { return x.CASE_ID == _this.itemCaseID && x.PROCEDURE_CODE == _this.subItem.PROCEDURE_CODE && x.PREF_LIST_ID == _this.subItem.PREF_LIST_ID; });
                        filterItem = this.lstSearchDetails.filter(function (x) { return x.CUST_ITEM_ID == _this.subItem.ITEMID; });
                        if (filterItem.length == 0) {
                            filterItem = this.lstSearchDetails.filter(function (x) { return x.ITEMID == _this.subItem.ITEMID; });
                            if (filterItem.length == 0) {
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter the valid item' });
                                return [2 /*return*/];
                            }
                        }
                        if (this.isDetails == true) {
                            if (this.subItem.PROCEDURE_CODE == null || this.subItem.PROCEDURE_CODE == '' || this.subItem.PROCEDURE_CODE == undefined) {
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter the valid Procedure Code' });
                                return [2 /*return*/];
                            }
                            else if (filter.length == 0) {
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter the valid Procedure Code' });
                                return [2 /*return*/];
                            }
                            else if (this.subItem.PREF_LIST_ID == null || this.subItem.PREF_LIST_ID == '' || this.subItem.PREF_LIST_ID == undefined) {
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter the valid Preference List' });
                                return [2 /*return*/];
                            }
                            else if (filterRow.length == 0) {
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter the valid Preference List' });
                                return [2 /*return*/];
                            }
                        }
                        if (this.subItem.ITEMID == null || this.subItem.ITEMID == '' || this.subItem.ITEMID == undefined) {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter the valid item' });
                            return [2 /*return*/];
                        }
                        else if ((this.subItem.OLD_PICK_QTY == null || this.subItem.OLD_PICK_QTY == '' || this.subItem.OLD_PICK_QTY == undefined) &&
                            (this.subItem.HOLD_QTY == null || this.subItem.HOLD_QTY == '' || this.subItem.HOLD_QTY == undefined)) {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter Open Qty / Hold Qty' });
                            return [2 /*return*/];
                        }
                        else if (parseFloat(this.subItem.OLD_PICK_QTY) > parseFloat(this._strMaxAllowQty)) {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Open qty must not be greater than max allowable quantity' });
                            return [2 /*return*/];
                        }
                        else if (parseFloat(this.subItem.HOLD_QTY) > parseFloat(this._strMaxAllowQty)) {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Hold qty must not be greater than max allowable quantity' });
                            return [2 /*return*/];
                        }
                        if (!(this.isDetails == false)) return [3 /*break*/, 4];
                        filterCaseInfo = this.lstCaseItemsInfo.filter(function (x) { return x.PROCEDURE_CODE == _this.procedureCode && x.PREF_LIST_ID == _this.preferenceList && x.ITEM_ID == _this.subItem.ITEMID; });
                        if (!(filterCaseInfo.length > 0)) return [3 /*break*/, 3];
                        this.statusMsgs = [];
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Item already exists' });
                        return [4 /*yield*/, this.onClearData()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                    case 3: return [3 /*break*/, 6];
                    case 4:
                        filterCaseInfo = this.lstCaseItemsInfo.filter(function (x) { return x.PROCEDURE_CODE == _this.subItem.PROCEDURE_CODE && x.PREF_LIST_ID == _this.subItem.PREF_LIST_ID && x.ITEM_ID == _this.subItem.ITEMID; });
                        if (!(filterCaseInfo.length > 0)) return [3 /*break*/, 6];
                        this.statusMsgs = [];
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Item already exists' });
                        return [4 /*yield*/, this.onClearData()];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                    case 6:
                        item = new VM_SEARCHITEM_DETAILS_1.VM_SEARCHITEM_DETAILS();
                        if (this.isDetails == false) {
                            item.PROCEDURE_CODE = this.procedureCode;
                            item.PREF_LIST_ID = this.preferenceList;
                        }
                        else {
                            item.PROCEDURE_CODE = this.subItem.PROCEDURE_CODE;
                            item.PREF_LIST_ID = this.subItem.PREF_LIST_ID;
                        }
                        if ((this.subItem.OLD_PICK_QTY != null && this.subItem.OLD_PICK_QTY != '' && this.subItem.OLD_PICK_QTY != undefined) &&
                            (this.subItem.HOLD_QTY == null || this.subItem.HOLD_QTY == '' || this.subItem.HOLD_QTY == undefined)) {
                            this.subItem.HOLD_QTY = '0';
                        }
                        if ((this.subItem.OLD_PICK_QTY == null || this.subItem.OLD_PICK_QTY == '' || this.subItem.OLD_PICK_QTY == undefined) &&
                            (this.subItem.HOLD_QTY != null && this.subItem.HOLD_QTY != '' && this.subItem.HOLD_QTY != undefined)) {
                            this.subItem.OLD_PICK_QTY = '0';
                        }
                        item.ITEM = this.subItem.ITEMID;
                        item.ITEM_DESCR = this.subItem.ITEM_DESCR;
                        item.OLD_PICK_QTY = this.subItem.OLD_PICK_QTY;
                        item.HOLD_QTY = this.subItem.HOLD_QTY;
                        item.IS_NEWITEM = "Y";
                        item.isNew = true;
                        this.lstCaseData.push(item);
                        this.statusMsgs = [];
                        this.statusMsgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Item added successfully' });
                        return [4 /*yield*/, this.onClearData()];
                    case 7:
                        _a.sent();
                        this.additem = false;
                        this.lookupitem = false;
                        return [3 /*break*/, 9];
                    case 8:
                        ex_23 = _a.sent();
                        this.clientErrorMsg(ex_23);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    ManageCasesComponent.prototype.onClearData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.subItem.PROCEDURE_CODE = '';
                    this.subItem.PREF_LIST_ID = '';
                    this.subItem.ITEMID = '';
                    this.subItem.ITEM_DESCR = '';
                    this.subItem.OLD_PICK_QTY = '';
                    this.subItem.HOLD_QTY = '';
                }
                catch (ex) {
                    this.clientErrorMsg(ex);
                }
                return [2 /*return*/];
            });
        });
    };
    ManageCasesComponent.prototype.selectedRow = function (selectedRowData) {
        try {
            if (selectedRowData.CUST_ITEM_ID != null && selectedRowData.CUST_ITEM_ID != '' && selectedRowData.CUST_ITEM_ID != undefined) {
                this.subItem.ITEMID = selectedRowData.CUST_ITEM_ID;
            }
            else {
                this.subItem.ITEMID = selectedRowData.ITEMID;
            }
            this.subItem.ITEM_DESCR = selectedRowData.ITEM_DESCR;
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ManageCasesComponent.prototype.SaveReviewCaseItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var msg, ex_24;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstReviewedItems = [];
                        msg = '';
                        ;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, 8, 9]);
                        this.lstCaseData.filter(function (info) {
                            var newItem = false;
                            info.ITEM_ID = info.ITEM;
                            info.CASE_ID = _this.itemCaseID;
                            info.PICK_QTY = info.OLD_PICK_QTY;
                            if ((info.OLD_PICK_QTY == null || info.OLD_PICK_QTY == '' || info.OLD_PICK_QTY == undefined) &&
                                (info.HOLD_QTY == null || info.HOLD_QTY == '' || info.HOLD_QTY == undefined)) {
                                if ((info.OLD_PICK_QTY != '0' && info.HOLD_QTY != '0')) {
                                    msg = 'Please enter Open Qty / Hold Qty';
                                    return;
                                }
                            }
                            info.OLD_PICK_QTY = info.OLD_PICK_QTY == '' ? '0' : info.OLD_PICK_QTY;
                            info.HOLD_QTY = info.HOLD_QTY == '' ? '0' : info.HOLD_QTY;
                            if (info.IS_NEWITEM == "Y") {
                                info.ITEM_STATUS = "Y";
                                newItem = true;
                            }
                            if ((info.OLD_PICK_QTY != info.oldpickqty) || (info.HOLD_QTY != info.oldholdqty)) {
                                newItem = true;
                            }
                            if (info.itemStatus == null || info.itemStatus == '' || info.itemStatus == undefined) {
                                info.itemStatus = info.ITEM_STATUS;
                            }
                            if (info.ITEM_STATUS != info.itemStatus) {
                                newItem = true;
                            }
                            if (newItem) {
                                if (parseFloat(info.OLD_PICK_QTY) > parseFloat(_this._strMaxAllowQty)) {
                                    msg = 'Open qty must not be greater than max allowable quantity';
                                    return;
                                }
                                else if (parseFloat(info.HOLD_QTY) > parseFloat(_this._strMaxAllowQty)) {
                                    msg = 'Hold qty must not be greater than max allowable quantity';
                                    return;
                                }
                                else {
                                    _this.lstReviewedItems.push(info);
                                }
                            }
                        });
                        if (msg != '') {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: msg });
                            return [2 /*return*/];
                        }
                        this.spinnerService.start();
                        if (!(this.lstReviewedItems.length > 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.manageCasesService.SaveReviewCaseItems(this.lstReviewedItems).
                                catch(this.httpService.handleError).then(function (res) {
                                var resp = res.json();
                                _this.spinnerService.stop();
                                _this.statusCode = resp.StatusCode;
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        break;
                                    case AtParEnums_1.StatusType.Error:
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Error while getting data" });
                                        break;
                                    case AtParEnums_1.StatusType.Warn:
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                        break;
                                }
                            })];
                    case 2:
                        _a.sent();
                        if (!(this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK)) return [3 /*break*/, 4];
                        this.isDetailSaved = true;
                        return [4 /*yield*/, this.itemBindGrid()];
                    case 3:
                        _a.sent();
                        this.isDetailSaved = false;
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        this.statusMsgs = [];
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No items to review" });
                        return [2 /*return*/];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        ex_24 = _a.sent();
                        this.clientErrorMsg(ex_24);
                        return [3 /*break*/, 9];
                    case 8:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    ManageCasesComponent.prototype.onAddItemClick = function () {
        try {
            this.subItem = new VM_SEARCHITEM_DETAILS_1.VM_SEARCHITEM_DETAILS();
            this.lookupitem = false;
            this.lstSubItemData = [];
            setTimeout(function () {
                document.getElementById("txtItemID").focus();
            }, 500);
            this.additem = true;
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ManageCasesComponent.prototype.updateSubItems = function (subItemData, event) {
        return __awaiter(this, void 0, void 0, function () {
            var filterData;
            return __generator(this, function (_a) {
                try {
                    if (event == true) {
                        subItemData.itemStatus = subItemData.ITEM_STATUS;
                        subItemData.ITEM_STATUS = "Y";
                        subItemData.isPickQty = false;
                        subItemData.isHoldQty = false;
                    }
                    else {
                        subItemData.itemStatus = subItemData.ITEM_STATUS;
                        subItemData.ITEM_STATUS = "N";
                        subItemData.isPickQty = true;
                        subItemData.isHoldQty = true;
                        filterData = (JSON.parse(sessionStorage.getItem("cartDetails"))).filter(function (x) { return x.ITEM == subItemData.ITEM; });
                        if (filterData != null && filterData != undefined) {
                            if (filterData.length > 0) {
                                subItemData.OLD_PICK_QTY = filterData[0].OLD_PICK_QTY;
                                subItemData.HOLD_QTY = filterData[0].HOLD_QTY;
                            }
                        }
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex);
                }
                return [2 /*return*/];
            });
        });
    };
    ManageCasesComponent.prototype.updateItems = function (item, event) {
        if (event == true) {
            item.CHECKED = "true";
        }
        else {
            item.CHECKED = "false";
        }
    };
    ManageCasesComponent.prototype.close = function () {
        this.additem = false;
        this.statusMsgs = [];
    };
    ManageCasesComponent.prototype.OnDestroy = function () {
        this.deviceTokenEntry = null;
        this.noOfRecords = null;
        this.defDateRange = null;
        this.statusCode = null;
        this.strVndrReviewReq = null;
        this.strCaseEditingOption = null;
        this.lstDepts = null;
        this.lstServiceCodes = null;
        this.lstCaseDescr = null;
        this.objCaseInfo = null;
        this.lstCaseInfo = null;
        this.lstCaseForQA = null;
        this.lstCaseItemsInfo = null;
        this.lstProcedureCodes = null;
        this.lstPrefItems = null;
        this.strChkValues = null;
        this.colArr = null;
        this.strOption = null;
        this.strCaseID = null;
        this.strDeptID = null;
        this.strServiceCode = null;
        this.caseID = null;
        this.deptID = null;
        this.serviceCode = null;
        this.fromDate = null;
        this.toDate = null;
        this.statusData = null;
        this.repCaseData = null;
        this.statusList = null;
        this.itemStatus = null;
        this.lstCasesItems = null;
        this.lstServiceCodesItems = null;
        this.statusMsgs = null;
        this.lstProcedureItems = null;
        this.lstProcedureItemsList = null;
        this.lstProcedures = null;
        this.lstPhysiciansItems = null;
        this.lstPhysiciansItemsList = null;
        this.lstPhysicians = null;
        this.lstPreferenceItems = null;
        this.lstPreferenceItemsList = null;
        this.lstPreferences = null;
        this.totallstpreferences = null;
        this.lstdeptItems = null;
        this.lstdeptItemsList = null;
        this.lstdepts = null;
        this.lstdeptcostcenters = null;
        this.lstSearchDetails = null;
        this.lstReviewedItems = null;
        this.ProcedureItem = null;
        this.PhysiciansItem = null;
        this.caseId = null;
        this.caseDesc = null;
        this.performDate = null;
        this.Preference = null;
        this.patient = null;
        this.dept = null;
        this.convertDate = null;
        this.currentDate = null;
        this.strcostcenter = null;
        this.txtcaseIDStatus = null;
        this.txtcaseDescStatus = null;
        this.txtpatientStatus = null;
        this.performDateStatus = null;
        this.physiciansItemStatus = null;
        this.procedureItemStatus = null;
        this.preferenceStatus = null;
        this.deptStatus = null;
        this.replacePref_patient = null;
        this.replacePref_Procedure = null;
        this.rep_Preference = null;
        this.lstReplacePreference = null;
        this.lstReplacePreferenceItemsList = null;
        this.lstReplacePreferenceItems = null;
        this.dtCases = null;
        this.dtCasesItem = null;
        this.m_IsAddCaseEnabled = null;
        this.m_IsChangeStatusEnabled = null;
        this.m_IsReplaceCaseEnabled = null;
        this.m_IsReplacePrefEnabled = null;
        this.repCaseValue = null;
        this.statusValue = null;
        this.checked = null;
        this.prefListID = null;
        this.procCode = null;
        this._strMaxAllowQty = null;
        this.status = null;
        this.patID = null;
        this.qCaseId = null;
        this.itemCaseID = null;
        this.physician = null;
        this.dataDictionary = null;
        this.lstCaseData = null;
        this.lookupItem = null;
        this.description = null;
        this.mfgItem = null;
        this.venItem = null;
        this.upcID = null;
        this.gtin = null;
        this.subItem = null;
        this.lstSubItemData = null;
    };
    ManageCasesComponent = __decorate([
        core_1.Component({
            templateUrl: 'pou-manage-cases.component.html',
            providers: [datatableservice_1.datatableservice,
                atpar_common_service_1.AtParCommonService,
                pou_manage_cases_component_service_1.ManageCasesServices,
                AtParConstants_1.AtParConstants,
                api_1.ConfirmationService]
        }),
        __param(5, core_1.Inject(platform_browser_1.DOCUMENT)),
        __metadata("design:paramtypes", [datatableservice_1.datatableservice,
            HttpService_1.HttpService,
            event_spinner_service_1.SpinnerService,
            pou_manage_cases_component_service_1.ManageCasesServices,
            atpar_common_service_1.AtParCommonService, Object, AtParConstants_1.AtParConstants,
            api_1.ConfirmationService])
    ], ManageCasesComponent);
    return ManageCasesComponent;
}());
exports.ManageCasesComponent = ManageCasesComponent;
//# sourceMappingURL=pou-manage-cases.component.js.map