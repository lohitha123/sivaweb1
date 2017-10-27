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
var linq_es5_1 = require("linq-es5");
var api_1 = require("../components/common/api");
var AtParEnums_1 = require("../Shared/AtParEnums");
var HttpService_1 = require("../Shared/HttpService");
var AtParConstants_1 = require("../Shared/AtParConstants");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var pou_process_parameters_service_1 = require("./pou-process-parameters.service");
var mt_pou_replen_source_location_1 = require("../entities/mt_pou_replen_source_location");
var mt_pou_par_loc_process_schedule_1 = require("../entities/mt_pou_par_loc_process_schedule");
var vm_mt_pou_assign_locations_1 = require("../entities/vm_mt_pou_assign_locations");
var datatable_1 = require("../components/datatable/datatable");
var routepath_1 = require("../AtPar/Menus/routepath");
var ProcessParametersComponent = (function () {
    function ProcessParametersComponent(spnrService, httpService, atParConstant, commonService, processParmService, confirmationService) {
        this.spnrService = spnrService;
        this.httpService = httpService;
        this.atParConstant = atParConstant;
        this.commonService = commonService;
        this.processParmService = processParmService;
        this.confirmationService = confirmationService;
        //Variables
        this.pop = false;
        this.tab = false;
        this.table = false;
        this.page = true;
        this.form = false;
        this.editform = false;
        this.deviceTokenEntry = [];
        this.statusMsgs = [];
        this.txtCartId = "";
        this.lblOrgGrpId = "";
        this.lblLocGrpId = "";
        this.txtLocation = "";
        this.ddlDisplaySelectValue = "";
        this.ddlSelectedAsgnLocOrgId = "";
        this.strLocation = "";
        this.sourceLocs = "";
        this.tabReplenishment = true;
        this.tabBilling = true;
        this.tabAlert = true;
        this.isEditMode = true;
        //reviewChargesValue: boolean = false;
        //blnBillScheduleId: boolean = true;
        //chkBillOption: boolean = true;
        this.tabEvent = false;
        this.blnEnable = false;
        this.selectedOrgId = "Select One";
        this.selectedDept = "Select One";
        this.selectedLowStockSchedId = "Select One";
        this.selectedExpSchedId = "Select One";
        this.selectedRecallSchedId = "Select One";
        this.selectedBillOnlySchedId = "Select One";
        this.selectedInvSchedule = "Select One";
        this.selectedReplenish = "Select One";
        this.ddlAssignLocationOrgIdLst = "Select Org ID";
        this.statusCode = -1;
        this.blnAssignLoc = false;
        this.repStatusCode = -1;
        this.cartStatus = -1;
        this.billStatus = -1;
        this.alertStatus = -1;
        this.lstRepSorceData = [];
        this.lstBillingData = [];
        this.lstAlertsData = [];
        this.lstAssignLocData = [];
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    ProcessParametersComponent.prototype.go = function () {
        this.table = !this.table;
        this.tab = true;
        this.page = false;
    };
    ProcessParametersComponent.prototype.add = function () {
        this.form = true;
        this.editform = false;
        this.page = false;
        this.tab = false;
    };
    ProcessParametersComponent.prototype.edit = function () {
        this.editform = true;
        this.form = false;
        this.page = false;
        this.pop = false;
    };
    ProcessParametersComponent.prototype.close = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.dsTemp = this.dsTemp.filter(function (x) { return x.CHK_VALUE == 1; });
        this.form = false;
        this.table = false;
        this.page = true;
        this.tab = true;
    };
    ProcessParametersComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        // this.intAppId = EnumApps.PointOfUse;
                        this.deptCartLst = new Array();
                        this.intAppId = parseInt(this.appId);
                        if (isNaN(this.intAppId)) {
                            this.intAppId = AtParEnums_1.EnumApps.PointOfUse;
                        }
                        else {
                            if (this.intAppId != AtParEnums_1.EnumApps.PointOfUse) {
                                this.intAppId = AtParEnums_1.EnumApps.Pharmacy;
                            }
                            else {
                                this.intAppId = AtParEnums_1.EnumApps.PointOfUse;
                            }
                        }
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.recordsPerPageSize = parseInt(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage]);
                        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                        this.ddlDeptLst = [];
                        this.ddlDeptLst.push({ label: "Select One", value: "Select One" });
                        return [4 /*yield*/, this.page_Load()];
                    case 1:
                        _a.sent();
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
    ProcessParametersComponent.prototype.page_Load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, ex_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        this.statusMsgs = [];
                        if (this.intAppId != AtParEnums_1.EnumApps.PointOfUse) {
                            this.tabBilling = false;
                        }
                        _a = this;
                        return [4 /*yield*/, this.populateOrgIds()];
                    case 1:
                        _a.statusCode = _b.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS) {
                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "No Assigned Org Business Units" });
                            }
                            this.spnrService.stop();
                            return [2 /*return*/];
                        }
                        //await this.PopulateCarts();
                        this.spnrService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_2 = _b.sent();
                        this.clientErrorMsg(ex_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProcessParametersComponent.prototype.ddlOrgId_SelectChanged = function (option, event) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        this.statusMsgs = [];
                        this.selectedDept = '';
                        this.parLocProcessScheduleLst = [];
                        this.parBillProcessScheduleLst = [];
                        this.parRepProcessScheduleLst = [];
                        this.deptCartLst = [];
                        this.deptLst = [];
                        this.schdAlerts = [];
                        this.tab = false;
                        this.spnrService.start();
                        if (!(this.selectedOrgId == "" || this.selectedOrgId == 'Select One' || this.selectedOrgId == null)) return [3 /*break*/, 1];
                        //this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select Org Id "  });
                        this.spnrService.stop();
                        return [2 /*return*/];
                    case 1: return [4 /*yield*/, this.populateDepts()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ProcessParametersComponent.prototype.ddlDept_SelectChanged = function (option, event) {
        return __awaiter(this, void 0, void 0, function () {
            var statusCode, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.statusMsgs = [];
                        this.tab = false;
                        this.parLocProcessScheduleLst = [];
                        this.parBillProcessScheduleLst = [];
                        this.parRepProcessScheduleLst = [];
                        this.schdAlerts = [];
                        this.deptLst = [];
                        this.deptAlertLst = [];
                        this.deptCartLst = [];
                        statusCode = -1;
                        return [4 /*yield*/, this.populateCarts()];
                    case 1:
                        statusCode = _a.sent();
                        this.cartStatus = statusCode;
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
    ProcessParametersComponent.prototype.searchAutoCompleteParLocation = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                try {
                    this.statusMsgs = [];
                    query = event.query;
                    this.parLocationSearchLst = [];
                    //this.parLocationSearchLst = this.deptCartLst;
                    this.parLocationSearchLst1 = this.deptCartLst;
                    this.parLocationSearchLst = this.filterParLocation(query, this.parLocationSearchLst1);
                }
                catch (ex) {
                    this.clientErrorMsg(ex);
                }
                return [2 /*return*/];
            });
        });
    };
    ProcessParametersComponent.prototype.btnGo_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var statusCode, strBunit, statusRep, _strCartId, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        this.spnrService.start();
                        statusCode = -1;
                        this.statusMsgs = [];
                        this.tab = false;
                        this.tabBilling = false;
                        this.tabReplenishment = false;
                        strBunit = "";
                        statusRep = -1;
                        _strCartId = "";
                        this.parLocProcessScheduleLst = [];
                        this.parBillProcessScheduleLst = [];
                        this.parRepProcessScheduleLst = [];
                        this.lstRepSorceData = [];
                        this.lstBillingData = [];
                        this.lstAlertsData = [];
                        this.lstAssignLocData = [];
                        this.schdAlerts = [];
                        this.deptLst = [];
                        localStorage.removeItem("tempBillData");
                        localStorage.removeItem("tempAlertsData");
                        localStorage.removeItem("tempRepData");
                        localStorage.removeItem("tempLocationData");
                        this.deptAlertLst = [];
                        if (this.selectedOrgId == '' || this.selectedOrgId == null || this.selectedOrgId == undefined || this.selectedOrgId == 'Select One') {
                            this.statusMsgs = [];
                            this.spnrService.stop();
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select Org ID " });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.populateData(AtParEnums_1.Process_Type[AtParEnums_1.Process_Type.Replenishment].toString())];
                    case 1:
                        statusRep = _a.sent();
                        this.spnrService.stop();
                        if (this.parRepProcessScheduleLst != null && this.parRepProcessScheduleLst.length > 0) {
                            this.tabReplenishment = true;
                            this.repStatusCode = statusRep;
                            localStorage.setItem("tempRepData", JSON.stringify(this.parRepProcessScheduleLst));
                            //setTimeout(() => {
                            //    this.tab = true;
                            //}, 10);
                            //return;
                        }
                        if (statusRep == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                            //this.tabBilling = true;
                            //this.tab = true;
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No data found" });
                            //for billing tab if inventory locations allocated
                            return [2 /*return*/];
                        }
                        else if (statusRep == AtParStatusCodes_1.AtparStatusCodes.INV_NOT_MNGD_IN_ATPAR) {
                            //  this.tabBilling = true;
                            this.tab = true;
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Inventory is not managed in @Par for the department(s)" });
                            this.spnrService.stop();
                            return [2 /*return*/];
                        }
                        else if (statusRep != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            // this.tabBilling = false;
                            // this.tab = false;
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Internal Server Error" });
                            this.spnrService.stop();
                            return [2 /*return*/];
                        }
                        if (this.ddlDeptLst.length > 1) {
                            this.tabBilling = true;
                            //this.tab = true;
                        }
                        return [4 /*yield*/, this.getBillingData()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.getAlertsData()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ProcessParametersComponent.prototype.getBillingData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var billStatusCode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        billStatusCode = -1;
                        return [4 /*yield*/, this.populateData(AtParEnums_1.Process_Type[AtParEnums_1.Process_Type.Billing].toString())];
                    case 1:
                        // if (this.parBillProcessScheduleLst == undefined || this.parBillProcessScheduleLst.length == 0) {
                        billStatusCode = _a.sent();
                        this.billStatus = billStatusCode;
                        // }
                        if (this.parBillProcessScheduleLst != null && this.parBillProcessScheduleLst.length > 0) {
                            this.tabBilling = true;
                            localStorage.setItem("tempBillData", JSON.stringify(this.parBillProcessScheduleLst));
                            this.lstBillingData = this.parBillProcessScheduleLst;
                        }
                        if (billStatusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                            this.tab = false;
                            this.tabReplenishment = false;
                            this.tabBilling = false;
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No data found" });
                            return [2 /*return*/];
                        }
                        else if (billStatusCode == AtParStatusCodes_1.AtparStatusCodes.BILNG_NOT_MNGD_IN_ATPAR) {
                            this.tab = true;
                            this.tabBilling = false;
                            this.tabReplenishment = false;
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Billing is not managed in @Par for the department(s)" });
                            return [2 /*return*/];
                        }
                        else if (billStatusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.tab = false;
                            this.tabBilling = false;
                            this.tabReplenishment = false;
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Internal Server Error" });
                            return [2 /*return*/];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ProcessParametersComponent.prototype.getAlertsData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alertStatusCode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        alertStatusCode = -1;
                        return [4 /*yield*/, this.populateData(AtParEnums_1.Process_Type[AtParEnums_1.Process_Type.Alerts].toString())];
                    case 1:
                        // if (this.schdAlerts == undefined || this.schdAlerts.length == 0) {
                        alertStatusCode = _a.sent();
                        this.alertStatus = alertStatusCode;
                        //}
                        if (this.schdAlerts != null && this.schdAlerts.length > 0) {
                            this.tabAlert = true;
                            localStorage.setItem("tempAlertsData", JSON.stringify(this.schdAlerts));
                            //this.lstAlertsData = this.schdAlerts;
                        }
                        if (alertStatusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                            this.tabAlert = true;
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No data found" });
                            return [2 /*return*/];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ProcessParametersComponent.prototype.btnReplenishmentSubmit_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var statusCode, strBunit, i, i, _ddlReplenishFrom, _intSelectedValue, dicAssignSchedule, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.statusMsgs = [];
                        statusCode = -1;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        strBunit = "";
                        for (i = 0; i < this.parRepProcessScheduleLst.length; i++) {
                            if (this.parRepProcessScheduleLst[i].CHK_VALUE == true) {
                                if (this.parRepProcessScheduleLst[i].SCHEDULE_ID == "" || this.parRepProcessScheduleLst[i].SCHEDULE_ID == "Select One") {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select Inventory Schedule" });
                                    if (this.parRepProcessScheduleLst[i].REPLENISH_FROM.toString() != "1") {
                                        // _dgItem.Cells(5).Text = string.Empty;
                                    }
                                    return [2 /*return*/];
                                }
                                if (this.parRepProcessScheduleLst[i].REPLENISH_FROM.toString() == "" || this.parRepProcessScheduleLst[i].REPLENISH_FROM == "-1") {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select Replenish From" });
                                    if (this.parRepProcessScheduleLst[i].REPLENISH_FROM.toString() != "1") {
                                        // _dgItem.Cells(5).Text = string.Empty;
                                    }
                                    return [2 /*return*/];
                                }
                            }
                            else {
                                if (this.parRepProcessScheduleLst[i].SCHEDULE_ID != "" && this.parRepProcessScheduleLst[i].SCHEDULE_ID != "Select One") {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select Replenishment Location" });
                                    if (this.parRepProcessScheduleLst[i].REPLENISH_FROM.toString() != "1") {
                                        // _dgItem.Cells(5).Text = string.Empty;
                                    }
                                    return [2 /*return*/];
                                }
                            }
                            if (this.parRepProcessScheduleLst[i].REPLENISH_FROM.toString() == "1") {
                                //' If log.IsDebugEnabled Then log.Debug("SOURCE LOCATIONS:" & _dgItem.Cells(5).Text)
                                //  _dgItem.Cells(5).Text = _dgItem.Cells(5).Text.Replace("&nbsp;", "");                 
                                if (this.parRepProcessScheduleLst[i].SOURCELOCATIONS == "") {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Source Locations are mandatory when Replenish From is Par Locations" });
                                    return [2 /*return*/];
                                }
                            }
                        }
                        return [4 /*yield*/, this.updateDataset()];
                    case 2:
                        statusCode = _a.sent();
                        if (statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            if (statusCode == AtParStatusCodes_1.AtparStatusCodes.E_INVALIDPARAMETER) {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Invenorty Management/Materials Schedule" });
                            }
                            else {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Internal Server Error" });
                            }
                            return [2 /*return*/];
                        }
                        strBunit = this.selectedOrgId;
                        if (this.replenSourecLocationLst != null && this.replenSourecLocationLst.length > 0) {
                            //Check Once
                            for (i = 0; i < this.parRepProcessScheduleLst.length; i++) {
                                _ddlReplenishFrom = this.parRepProcessScheduleLst[i].REPLENISH_FROM;
                                _intSelectedValue = -1;
                                if (_ddlReplenishFrom == 0) {
                                    _intSelectedValue = -1;
                                }
                                else {
                                    _intSelectedValue = _ddlReplenishFrom;
                                }
                                //if (_intSelectedValue != 1) {
                                //    for (dRow = 0; dRow <= dRows.Length - 1; dRow++) {
                                //        dsSourceLocDetails.Tables(0).Rows.Remove(dRows(dRow));
                                //    }
                                //    dsSourceLocDetails.AcceptChanges();
                                //}
                            }
                        }
                        dicAssignSchedule = { 'lstParLocProcessSchedules': this.parRepProcessScheduleLst, 'lstPouReplanLocation': this.replenSourecLocationLst };
                        this.spnrService.start();
                        return [4 /*yield*/, this.processParmService.assignScheduleToCarts(dicAssignSchedule, strBunit, this.intAppId, this.deviceTokenEntry).
                                catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                _this.spnrService.stop();
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.statusMsgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Updated Successfully." });
                                        _this.clearFields();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs = [];
                                        _this.spnrService.stop();
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.spnrService.stop();
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.spnrService.stop();
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 3:
                        _a.sent();
                        this.spnrService.stop();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ProcessParametersComponent.prototype.selectAllReplenishmentLst = function () {
        try {
            this.statusMsgs = [];
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    if (this.lstgridfilterData[i].INV_INTERFACE_ENABLE == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() || this.lstgridfilterData[i].INV_INTERFACE_ENABLE == "" || this.lstgridfilterData[i].INV_INTERFACE_ENABLE == undefined) {
                        this.lstgridfilterData[i].CHK_VALUE = true;
                    }
                }
            }
            else {
                if (this.EndIndex > this.parRepProcessScheduleLst.length) {
                    this.EndIndex = this.parRepProcessScheduleLst.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    if (this.parRepProcessScheduleLst[i].INV_INTERFACE_ENABLE == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() || this.parRepProcessScheduleLst[i].INV_INTERFACE_ENABLE == "" || this.parRepProcessScheduleLst[i].INV_INTERFACE_ENABLE == undefined) {
                        this.parRepProcessScheduleLst[i].CHK_VALUE = true;
                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ProcessParametersComponent.prototype.unSelectAllReplenishmentLst = function () {
        var _this = this;
        try {
            this.statusMsgs = [];
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    if (this.lstgridfilterData[i].INV_INTERFACE_ENABLE == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() || this.lstgridfilterData[i].INV_INTERFACE_ENABLE == "" || this.lstgridfilterData[i].INV_INTERFACE_ENABLE == undefined) {
                        this.lstgridfilterData[i].CHK_VALUE = false;
                    }
                }
            }
            else {
                if (this.EndIndex > this.parRepProcessScheduleLst.length) {
                    this.EndIndex = this.parRepProcessScheduleLst.length;
                }
                var _loop_1 = function (i) {
                    if (this_1.parRepProcessScheduleLst[i].INV_INTERFACE_ENABLE == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() || this_1.parRepProcessScheduleLst[i].INV_INTERFACE_ENABLE == "" || this_1.parRepProcessScheduleLst[i].INV_INTERFACE_ENABLE == undefined) {
                        if (this_1.parRepProcessScheduleLst[i].REPLENISH_FROM == '1') {
                            this_1.parRepProcessScheduleLst[i].SOURCELOCATIONS = "";
                            this_1.parRepProcessScheduleLst[i].OLDSOURCELOCATIONS = "";
                        }
                        this_1.parRepProcessScheduleLst[i].SCHEDULE_ID = '';
                        this_1.parRepProcessScheduleLst[i].REPLENISH_FROM = '';
                        if (this_1.replenSourecLocationLst != null && this_1.replenSourecLocationLst.length > 0) {
                            var drCartSourceLocations = linq_es5_1.asEnumerable(this_1.replenSourecLocationLst).Where(function (x) { return (x.PAR_LOC_ID == _this.parRepProcessScheduleLst[i].ID) && (x.ORG_ID == _this.parRepProcessScheduleLst[i].ORG_ID); }).ToArray();
                            if (drCartSourceLocations != null && drCartSourceLocations.length > 0) {
                                for (var j = 0; j < drCartSourceLocations.length; j++) {
                                    drCartSourceLocations[j].SOURCE_LOCATION = "";
                                }
                            }
                        }
                        this_1.parRepProcessScheduleLst[i].CHK_VALUE = false;
                    }
                };
                var this_1 = this;
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    _loop_1(i);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ProcessParametersComponent.prototype.filterReplenishmentdata = function (event) {
        this.statusMsgs = [];
        this.lstgridfilterData = new Array();
        this.lstgridfilterData = event;
    };
    ProcessParametersComponent.prototype.inventoryScheduleChanged = function (inventoryScheduleLst, event) {
        this.statusMsgs = [];
        try {
            if (event != null && event != undefined) {
                inventoryScheduleLst.SCHEDULE_ID = event.value;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ProcessParametersComponent.prototype.replenishmentFromChanged = function (replenishmentFromLst, event) {
        var _this = this;
        this.statusMsgs = [];
        try {
            if (event.value == "1") {
                replenishmentFromLst.SOURCELOCATIONS = replenishmentFromLst.OLDSOURCELOCATIONS;
                replenishmentFromLst.REPLENISH_FROM = event.value;
                replenishmentFromLst.OLDREPLENISH_FROM = replenishmentFromLst.REPLENISH_FROM;
            }
            else {
                if (replenishmentFromLst.SOURCELOCATIONS == "" || replenishmentFromLst.SOURCELOCATIONS == null || replenishmentFromLst.SOURCELOCATIONS == undefined) {
                }
                else {
                    this.confirmationService.confirm({
                        message: "Source Locations are going to invisible.",
                        accept: function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                replenishmentFromLst.OLDSOURCELOCATIONS = replenishmentFromLst.SOURCELOCATIONS;
                                replenishmentFromLst.SOURCELOCATIONS = '';
                                replenishmentFromLst.REPLENISH_FROM = event.value;
                                replenishmentFromLst.OLDREPLENISH_FROM = replenishmentFromLst.REPLENISH_FROM;
                                return [2 /*return*/];
                            });
                        }); },
                        reject: function () {
                            replenishmentFromLst.REPLENISH_FROM = replenishmentFromLst.OLDREPLENISH_FROM;
                        }
                    });
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ProcessParametersComponent.prototype.parScheduleLstChkboxChanged = function (lstData, event) {
        return __awaiter(this, void 0, void 0, function () {
            var drCartSourceLocations, i;
            return __generator(this, function (_a) {
                this.statusMsgs = [];
                try {
                    if (event != null && event != undefined) {
                        lstData.CHK_VALUE = event;
                    }
                    if (event == false) {
                        lstData.SCHEDULE_ID = '';
                        lstData.REPLENISH_FROM = '';
                        lstData.SOURCELOCATIONS = '';
                        lstData.OLDSOURCELOCATIONS = '';
                        if (this.replenSourecLocationLst != null && this.replenSourecLocationLst.length > 0) {
                            drCartSourceLocations = linq_es5_1.asEnumerable(this.replenSourecLocationLst).Where(function (x) { return (x.PAR_LOC_ID == lstData.ID) && (x.ORG_ID == lstData.ORG_ID); }).ToArray();
                            if (drCartSourceLocations != null && drCartSourceLocations.length > 0) {
                                for (i = 0; i < drCartSourceLocations.length; i++) {
                                    drCartSourceLocations[i].SOURCE_LOCATION = "";
                                }
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
    ProcessParametersComponent.prototype.tabContainer_ActiveTabChanged = function (option) {
        return __awaiter(this, void 0, void 0, function () {
            var statusCode, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (option != null) {
                            this.activeTab = option.title;
                        }
                        this.statusMsgs = [];
                        statusCode = -1;
                        this.tabBilling = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        if (!(this.activeTab.toString() == AtParEnums_1.Process_Type[AtParEnums_1.Process_Type.Replenishment].toString())) return [3 /*break*/, 3];
                        //if (this.tabEvent) {
                        //    this.parLocProcessScheduleLst = [];
                        //}
                        this.lstAlertsData = JSON.parse(localStorage.getItem("tempAlertsData"));
                        if (this.lstAlertsData != null && this.lstAlertsData != undefined && this.lstAlertsData.length > 0) {
                            this.schdAlerts = [];
                            this.schdAlerts = this.lstAlertsData;
                        }
                        this.lstBillingData = JSON.parse(localStorage.getItem("tempBillData"));
                        if (this.lstBillingData != null && this.lstBillingData != undefined && this.lstBillingData.length > 0) {
                            this.parBillProcessScheduleLst = [];
                            this.parBillProcessScheduleLst = this.lstBillingData;
                        }
                        this.tabReplenishment = false;
                        this.tabBilling = false;
                        this.statusMsgs = [];
                        this.blnEnable = false;
                        return [4 /*yield*/, this.populateData(AtParEnums_1.Process_Type[AtParEnums_1.Process_Type.Replenishment].toString())];
                    case 2:
                        //txtCartId.Enabled = true; 
                        //if (this.parRepProcessScheduleLst == undefined || this.parRepProcessScheduleLst.length == 0) {
                        statusCode = _a.sent();
                        //}
                        if (this.parRepProcessScheduleLst != null && this.parRepProcessScheduleLst.length > 0) {
                            this.tabReplenishment = true;
                            setTimeout(function () {
                                //this.tab = true;
                            }, 10);
                            this.lstRepSorceData = this.parRepProcessScheduleLst;
                            // if (this.repStatusCode != null && this.repStatusCode !== 0 && this.repStatusCode != undefined) {
                            statusCode = this.repStatusCode;
                            // }
                        }
                        if (statusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                            this.tab = false;
                            this.tabReplenishment = false;
                            this.tabBilling = false;
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No data found" });
                            //for billing tab if inventory locations allocated
                            if (this.ddlDeptLst.length > 1) {
                                this.tabBilling = true;
                                //this.tab = true;
                            }
                            return [2 /*return*/];
                        }
                        else if (statusCode == AtParStatusCodes_1.AtparStatusCodes.INV_NOT_MNGD_IN_ATPAR) {
                            this.tab = true;
                            this.tabBilling = true;
                            this.tabReplenishment = false;
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Inventory is not managed in @Par for the department(s)" });
                            return [2 /*return*/];
                        }
                        else if (statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.tab = false;
                            this.tabBilling = false;
                            this.tabReplenishment = false;
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Internal Server Error" });
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 7];
                    case 3:
                        if (!(this.activeTab.toString() == AtParEnums_1.Process_Type[AtParEnums_1.Process_Type.Billing].toString())) return [3 /*break*/, 5];
                        this.lstAlertsData = JSON.parse(localStorage.getItem("tempAlertsData"));
                        if (this.lstAlertsData != null && this.lstAlertsData != undefined && this.lstAlertsData.length > 0) {
                            this.schdAlerts = [];
                            this.schdAlerts = this.lstAlertsData;
                        }
                        this.lstRepSorceData = JSON.parse(localStorage.getItem("tempRepData"));
                        if (this.lstRepSorceData != null && this.lstRepSorceData != undefined && this.lstRepSorceData.length > 0) {
                            this.parRepProcessScheduleLst = [];
                            this.parRepProcessScheduleLst = this.lstRepSorceData;
                        }
                        this.lstAssignLocData = JSON.parse(localStorage.getItem("tempLocationData"));
                        if (this.lstAssignLocData != null && this.lstAssignLocData != undefined && this.lstAssignLocData.length > 0) {
                            this.assignLocationLst = [];
                            this.assignLocationLst = this.lstAssignLocData;
                        }
                        this.tabEvent = true;
                        this.txtCartId = "";
                        //this.isEditMode = false;
                        this.blnEnable = true;
                        //this.tabBilling = true;
                        this.tabReplenishment = false;
                        return [4 /*yield*/, this.populateData(AtParEnums_1.Process_Type[AtParEnums_1.Process_Type.Billing].toString())];
                    case 4:
                        statusCode = _a.sent();
                        if (this.parBillProcessScheduleLst != null && this.parBillProcessScheduleLst.length > 0) {
                            this.tabBilling = true;
                        }
                        if (statusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                            this.tab = false;
                            this.tabReplenishment = false;
                            this.tabBilling = false;
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No data found" });
                            return [2 /*return*/];
                        }
                        else if (statusCode == AtParStatusCodes_1.AtparStatusCodes.BILNG_NOT_MNGD_IN_ATPAR) {
                            this.tab = true;
                            this.tabBilling = false;
                            this.tabReplenishment = false;
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Billing is not managed in @Par for the department(s)" });
                            return [2 /*return*/];
                        }
                        else if (statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.tab = false;
                            this.tabBilling = false;
                            this.tabReplenishment = false;
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Internal Server Error" });
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 7];
                    case 5:
                        if (!(this.activeTab.toString() == AtParEnums_1.Process_Type[AtParEnums_1.Process_Type.Alerts].toString())) return [3 /*break*/, 7];
                        this.tabEvent = true;
                        this.txtCartId = "";
                        this.blnEnable = true;
                        // this.isEditMode = false;
                        this.tabBilling = false;
                        this.tabReplenishment = false;
                        this.tabAlert = false;
                        this.lstBillingData = JSON.parse(localStorage.getItem("tempBillData"));
                        if (this.lstBillingData != null && this.lstBillingData != undefined && this.lstBillingData.length > 0) {
                            this.parBillProcessScheduleLst = [];
                            this.parBillProcessScheduleLst = this.lstBillingData;
                        }
                        this.lstRepSorceData = JSON.parse(localStorage.getItem("tempRepData"));
                        if (this.lstRepSorceData != null && this.lstRepSorceData != undefined && this.lstRepSorceData.length > 0) {
                            this.parRepProcessScheduleLst = [];
                            this.parRepProcessScheduleLst = this.lstRepSorceData;
                        }
                        this.lstAssignLocData = JSON.parse(localStorage.getItem("tempLocationData"));
                        if (this.lstAssignLocData != null && this.lstAssignLocData != undefined && this.lstAssignLocData.length > 0) {
                            this.assignLocationLst = [];
                            this.assignLocationLst = this.lstAssignLocData;
                        }
                        return [4 /*yield*/, this.populateData(AtParEnums_1.Process_Type[AtParEnums_1.Process_Type.Alerts].toString())];
                    case 6:
                        statusCode = _a.sent();
                        if (this.schdAlerts != null && this.schdAlerts.length > 0) {
                            this.tabAlert = true;
                        }
                        _a.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    ProcessParametersComponent.prototype.rdbtnBillingOptionChanged = function (parameterLst, event) {
        this.statusMsgs = [];
        try {
            if (event != null && event != undefined) {
                if (event == 1) {
                    parameterLst.blnBillScheduleId = false;
                    parameterLst.chkBillOption = false;
                    parameterLst.BILLING_OPTION = 1;
                }
                else if (event == 2) {
                    parameterLst.blnBillScheduleId = true;
                    parameterLst.chkBillOption = true;
                    parameterLst.BILLING_OPTION = 2;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ProcessParametersComponent.prototype.chkBoxReviewChargeChanged = function (parameterLst, event) {
        this.statusMsgs = [];
        try {
            if (event != null && event != undefined) {
                if (event) {
                    parameterLst.REVIEW_CHARGES = "Y";
                    parameterLst.BlnReviewChargeValue = event;
                }
                else {
                    parameterLst.REVIEW_CHARGES = "N";
                    parameterLst.BlnReviewChargeValue = event;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ProcessParametersComponent.prototype.ddlBillScheduleIdChanged = function (parameterLst, event) {
        this.statusMsgs = [];
        try {
            if (event != null && event != undefined) {
                parameterLst.SCHEDULE_ID = event.value;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ProcessParametersComponent.prototype.billingChkboxChanged = function (lstData, event) {
        this.statusMsgs = [];
        try {
            if (event != null && event != undefined) {
                if (event) {
                    lstData.CHK_VALUE = event;
                }
                else {
                    lstData.CHK_VALUE = event;
                    lstData.SCHEDULE_ID = "";
                    lstData.REVIEW_CHARGES = "N";
                    lstData.BILLING_OPTION = 0;
                    lstData.BlnReviewChargeValue = false;
                    //this.reviewChargesValue = false;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ProcessParametersComponent.prototype.selectAllBillingLst = function () {
        this.statusMsgs = [];
        try {
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    if (this.lstgridfilterData[i].BILLING_ENABLE == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() || this.lstgridfilterData[i].BILLING_ENABLE == "" || this.lstgridfilterData[i].BILLING_ENABLE == undefined) {
                        this.lstgridfilterData[i].CHK_VALUE = true;
                    }
                }
            }
            else {
                if (this.EndIndex > this.parBillProcessScheduleLst.length) {
                    this.EndIndex = this.parBillProcessScheduleLst.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    if (this.parBillProcessScheduleLst[i].BILLING_ENABLE == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() || this.parBillProcessScheduleLst[i].BILLING_ENABLE == "" || this.parBillProcessScheduleLst[i].BILLING_ENABLE == undefined) {
                        this.parBillProcessScheduleLst[i].CHK_VALUE = true;
                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ProcessParametersComponent.prototype.unSelectAllBillingLst = function () {
        try {
            this.statusMsgs = [];
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    if (this.lstgridfilterData[i].BILLING_ENABLE == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() || this.lstgridfilterData[i].BILLING_ENABLE == "" || this.lstgridfilterData[i].BILLING_ENABLE == undefined) {
                        this.lstgridfilterData[i].CHK_VALUE = false;
                    }
                }
            }
            else {
                if (this.EndIndex > this.parBillProcessScheduleLst.length) {
                    this.EndIndex = this.parBillProcessScheduleLst.length;
                }
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    if (this.parBillProcessScheduleLst[i].BILLING_ENABLE == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() || this.parBillProcessScheduleLst[i].BILLING_ENABLE == "" || this.parBillProcessScheduleLst[i].BILLING_ENABLE == undefined) {
                        this.parBillProcessScheduleLst[i].CHK_VALUE = false;
                        this.parBillProcessScheduleLst[i].SCHEDULE_ID = 'Select One';
                        this.parBillProcessScheduleLst[i].BILLING_OPTION = null;
                        this.parBillProcessScheduleLst[i].BlnReviewChargeValue = false;
                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ProcessParametersComponent.prototype.filterBillData = function (event) {
        this.statusMsgs = [];
        this.lstgridfilterData = new Array();
        this.lstgridfilterData = event;
    };
    ProcessParametersComponent.prototype.btnBillSubmit_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var statusCode, strBunit, intReplenishFrom, i, dicAssignSchedule, ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.statusMsgs = [];
                        statusCode = -1;
                        strBunit = "";
                        intReplenishFrom = 0;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        // txtCartId.Enabled = true;
                        this.blnEnable = false;
                        for (i = 0; i < this.parBillProcessScheduleLst.length; i++) {
                            if (this.parBillProcessScheduleLst[i].CHK_VALUE == true) {
                                if ((this.parBillProcessScheduleLst[i].SCHEDULE_ID == "Select One" || this.parBillProcessScheduleLst[i].SCHEDULE_ID == "" ||
                                    this.parBillProcessScheduleLst[i].SCHEDULE_ID == null) && this.parBillProcessScheduleLst[i].blnBillScheduleId == true) {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select Billing Schedule" });
                                    return [2 /*return*/];
                                }
                                else if (this.parBillProcessScheduleLst[i].BILLING_OPTION != 2 && this.parBillProcessScheduleLst[i].BILLING_OPTION != 1) {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select Billing Option" });
                                    return [2 /*return*/];
                                }
                            }
                            else {
                                if (this.parBillProcessScheduleLst[i].CHK_VALUE != true) {
                                    if ((this.parBillProcessScheduleLst[i].SCHEDULE_ID != "Select One" &&
                                        this.parBillProcessScheduleLst[i].SCHEDULE_ID != null && this.parBillProcessScheduleLst[i].SCHEDULE_ID != "") &&
                                        this.parBillProcessScheduleLst[i].blnBillScheduleId == true) {
                                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select Billing Department" });
                                        return [2 /*return*/];
                                    }
                                    else if (this.parBillProcessScheduleLst[i].BILLING_OPTION == 2 || this.parBillProcessScheduleLst[i].BILLING_OPTION == 1 ||
                                        this.parBillProcessScheduleLst[i].BlnReviewChargeValue == true) {
                                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select Billing Department" });
                                        return [2 /*return*/];
                                    }
                                }
                            }
                        }
                        return [4 /*yield*/, this.billing_UpdatedLst()];
                    case 2:
                        statusCode = _a.sent();
                        if (statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            if (statusCode == AtParStatusCodes_1.AtparStatusCodes.E_INVALIDPARAMETER) {
                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Please Select Invenorty Management/Materials Schedule" });
                            }
                            else {
                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Internal Server Error" });
                            }
                            return [2 /*return*/];
                        }
                        dicAssignSchedule = { 'lstParLocProcessSchedules': this.parBillProcessScheduleLst, 'lstPouReplanLocation': null };
                        this.spnrService.start();
                        return [4 /*yield*/, this.processParmService.assignScheduleToCarts(dicAssignSchedule, this.selectedOrgId, this.intAppId, this.deviceTokenEntry).
                                catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                _this.spnrService.stop();
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.statusMsgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Updated Successfully." });
                                        _this.clearFields();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs = [];
                                        _this.spnrService.stop();
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.spnrService.stop();
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.spnrService.stop();
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 3:
                        _a.sent();
                        this.spnrService.stop();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ProcessParametersComponent.prototype.ddlLowStockSchedIdChanged = function (parameterLst, event) {
        this.statusMsgs = [];
        try {
            if (event != null && event != undefined) {
                parameterLst.LOW_STK_SCHEDULE_ID = event.value;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ProcessParametersComponent.prototype.ddlExpSchedIdChanged = function (parameterLst, event) {
        this.statusMsgs = [];
        try {
            if (event != null && event != undefined) {
                parameterLst.EXP_SCHEDULE_ID = event.value;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ProcessParametersComponent.prototype.ddlRecallSchedIdChanged = function (parameterLst, event) {
        this.statusMsgs = [];
        try {
            if (event != null && event != undefined) {
                parameterLst.RECALL_SCHEDULE_ID = event.value;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ProcessParametersComponent.prototype.ddlBillOnlySchedIdChanged = function (parameterLst, event) {
        try {
            this.statusMsgs = [];
            if (event != null && event != undefined) {
                parameterLst.BILLONLY_SCHEDULE_ID = event.value;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ProcessParametersComponent.prototype.selectAllAlertLst = function () {
        try {
            this.statusMsgs = [];
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstschdalertsgridfilterData != null && this.lstschdalertsgridfilterData != undefined) {
                if (this.EndIndex > this.lstschdalertsgridfilterData.length) {
                    this.EndIndex = this.lstschdalertsgridfilterData.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstschdalertsgridfilterData[i].CHK_VALUE = true;
                }
            }
            else {
                if (this.EndIndex > this.schdAlerts.length) {
                    this.EndIndex = this.schdAlerts.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.schdAlerts[i].CHK_VALUE = true;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ProcessParametersComponent.prototype.unSelectAllAlertLst = function () {
        try {
            this.statusMsgs = [];
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstschdalertsgridfilterData != null && this.lstschdalertsgridfilterData != undefined) {
                if (this.EndIndex > this.lstschdalertsgridfilterData.length) {
                    this.EndIndex = this.lstschdalertsgridfilterData.length;
                }
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstschdalertsgridfilterData[i].CHK_VALUE = false;
                    this.lstschdalertsgridfilterData[i].LOW_STK_SCHEDULE_ID = "";
                    this.lstschdalertsgridfilterData[i].RECALL_SCHEDULE_ID = "";
                    this.lstschdalertsgridfilterData[i].EXP_SCHEDULE_ID = "";
                    this.lstschdalertsgridfilterData[i].BILLONLY_SCHEDULE_ID = "";
                }
            }
            else {
                if (this.EndIndex > this.schdAlerts.length) {
                    this.EndIndex = this.schdAlerts.length;
                }
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.schdAlerts[i].CHK_VALUE = false;
                    this.schdAlerts[i].LOW_STK_SCHEDULE_ID = "";
                    this.schdAlerts[i].RECALL_SCHEDULE_ID = "";
                    this.schdAlerts[i].EXP_SCHEDULE_ID = "";
                    this.schdAlerts[i].BILLONLY_SCHEDULE_ID = "";
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ProcessParametersComponent.prototype.filterAlertsData = function (event) {
        this.statusMsgs = [];
        this.lstschdalertsgridfilterData = new Array();
        this.lstschdalertsgridfilterData = event;
    };
    ProcessParametersComponent.prototype.alertChkboxChanged = function (lstData, event) {
        try {
            this.statusMsgs = [];
            if (event != null && event != undefined) {
                if (event) {
                    lstData.CHK_VALUE = event;
                }
                else {
                    lstData.CHK_VALUE = event;
                    lstData.LOW_STK_SCHEDULE_ID = "";
                    lstData.RECALL_SCHEDULE_ID = "";
                    lstData.EXP_SCHEDULE_ID = "";
                    lstData.BILLONLY_SCHEDULE_ID = "";
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ProcessParametersComponent.prototype.btnAlertSubmit_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var statusCode, strBunit, i, ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.statusMsgs = [];
                        statusCode = -1;
                        strBunit = "";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        for (i = 0; i < this.schdAlerts.length; i++) {
                            if (this.schdAlerts[i].CHK_VALUE == true) {
                                if ((this.schdAlerts[i].LOW_STK_SCHEDULE_ID == null || this.schdAlerts[i].LOW_STK_SCHEDULE_ID == "" ||
                                    this.schdAlerts[i].LOW_STK_SCHEDULE_ID == "Select One") &&
                                    (this.schdAlerts[i].EXP_SCHEDULE_ID == null || this.schdAlerts[i].EXP_SCHEDULE_ID == "" ||
                                        this.schdAlerts[i].EXP_SCHEDULE_ID == "Select One") &&
                                    (this.schdAlerts[i].RECALL_SCHEDULE_ID == null || this.schdAlerts[i].RECALL_SCHEDULE_ID == "" ||
                                        this.schdAlerts[i].RECALL_SCHEDULE_ID == "Select One") &&
                                    (this.schdAlerts[i].BILLONLY_SCHEDULE_ID == null || this.schdAlerts[i].BILLONLY_SCHEDULE_ID == "" ||
                                        this.schdAlerts[i].BILLONLY_SCHEDULE_ID == "Select One")) {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select Schedule" });
                                    return [2 /*return*/];
                                }
                            }
                            else {
                                if ((this.schdAlerts[i].LOW_STK_SCHEDULE_ID != null && this.schdAlerts[i].LOW_STK_SCHEDULE_ID != "" &&
                                    this.schdAlerts[i].LOW_STK_SCHEDULE_ID != "Select One") ||
                                    (this.schdAlerts[i].EXP_SCHEDULE_ID != null && this.schdAlerts[i].EXP_SCHEDULE_ID != "" &&
                                        this.schdAlerts[i].EXP_SCHEDULE_ID != "Select One") ||
                                    (this.schdAlerts[i].RECALL_SCHEDULE_ID != null && this.schdAlerts[i].RECALL_SCHEDULE_ID != "" &&
                                        this.schdAlerts[i].RECALL_SCHEDULE_ID != "Select One") ||
                                    (this.schdAlerts[i].BILLONLY_SCHEDULE_ID != null && this.schdAlerts[i].BILLONLY_SCHEDULE_ID != "" &&
                                        this.schdAlerts[i].BILLONLY_SCHEDULE_ID != "Select One")) {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select Department" });
                                    return [2 /*return*/];
                                }
                            }
                        }
                        this.spnrService.start();
                        return [4 /*yield*/, this.processParmService.assignAlertSchedules(this.schdAlerts, this.intAppId).
                                catch(this.httpService.handleError).then(function (res) {
                                var response = res.json();
                                _this.spnrService.stop();
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.statusMsgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Updated Successfully." });
                                        _this.clearFields();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs = [];
                                        _this.spnrService.stop();
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.spnrService.stop();
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.spnrService.stop();
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        this.spnrService.stop();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_9 = _a.sent();
                        this.clientErrorMsg(ex_9);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProcessParametersComponent.prototype.onClickLnkbtnAssignLoc = function (selectedRowData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.statusMsgs = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        this.breadCrumbMenu.SUB_MENU_NAME = 'Assign Locations';
                        this.spnrService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        this.selectedRowReplenishment = selectedRowData;
                        if (!(selectedRowData.REPLENISH_FROM.toString() == "1")) return [3 /*break*/, 6];
                        this.form = true;
                        this.editform = false;
                        this.page = false;
                        this.tab = false;
                        this.lblOrgGrpId = "";
                        this.lblLocGrpId = "";
                        this.txtLocation = "";
                        this.ddlDisplaySelectAllLst = [];
                        this.ddlDisplaySelectAllLst.push({ label: "All", value: "ALL" });
                        this.ddlDisplaySelectAllLst.push({ label: "Allocated", value: "ALLOC" });
                        this.ddlDisplaySelectAllLst.push({ label: "Unallocated", value: "UA" });
                        this.lblOrgGrpId = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID].toString();
                        this.lblLocGrpId = selectedRowData.ID;
                        this.intValue = selectedRowData.ROW_INDEX;
                        this.blnAssignLoc = true;
                        this.spnrService.start();
                        //  if (this.assignLocationOrgIdLst == null && this.assignLocationOrgIdLst.length <= 0) {
                        return [4 /*yield*/, this.commonService.getOrgGroupBUnits(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.lblOrgGrpId, AtParEnums_1.BusinessType[AtParEnums_1.BusinessType.AllBunits].toString()).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.assignLocationOrgIdLst = res.json().DataList;
                                _this.spnrService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.ddlAssignLocationOrgIdLst = [];
                                        _this.ddlAssignLocationOrgIdLst.push({ label: "Select Org ID", value: "Select Org ID" });
                                        if (_this.assignLocationOrgIdLst.length > 0) {
                                            for (var i = 0; i <= _this.assignLocationOrgIdLst.length - 1; i++) {
                                                _this.ddlAssignLocationOrgIdLst.push({ label: _this.assignLocationOrgIdLst[i].toString(), value: _this.assignLocationOrgIdLst[i].toString() });
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
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        //  if (this.assignLocationOrgIdLst == null && this.assignLocationOrgIdLst.length <= 0) {
                        _a.sent();
                        this.spnrService.stop();
                        if (!(selectedRowData.SOURCELOCATIONS == null || selectedRowData.SOURCELOCATIONS == undefined)) return [3 /*break*/, 3];
                        this.ddlDisplaySelectValue = "ALL";
                        return [3 /*break*/, 5];
                    case 3:
                        if (!(selectedRowData.SOURCELOCATIONS != "" && selectedRowData.SOURCELOCATIONS != null && selectedRowData.SOURCELOCATIONS.length > 0 && selectedRowData.SOURCELOCATIONS != undefined)) return [3 /*break*/, 5];
                        this.ddlDisplaySelectValue = "ALLOC";
                        return [4 /*yield*/, this.btnAssignLocationGo()];
                    case 4:
                        _a.sent();
                        if (this.dtAllocTable == null || this.dtAllocTable.length == 0) {
                            this.ddlDisplaySelectValue = "ALL";
                        }
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Source Locations can be allocated when Replenish From is Par Locations." });
                        return [2 /*return*/];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        ex_10 = _a.sent();
                        this.clientErrorMsg(ex_10);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    ProcessParametersComponent.prototype.btnAssignLocationGo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ddlSelectedOrgId, strLoc, data_1, statusCode_1, rows_1, intCnt, _loop_2, this_2, i, intCnt, i, intCnt, _loop_3, this_3, drows, intCntrows, index, ex_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.statusMsgs = [];
                        ddlSelectedOrgId = "";
                        if (this.ddlSelectedAsgnLocOrgId == "Select Org Id" || this.ddlSelectedAsgnLocOrgId == "") {
                            ddlSelectedOrgId = "";
                        }
                        else {
                            ddlSelectedOrgId = this.ddlSelectedAsgnLocOrgId.toUpperCase();
                        }
                        strLoc = "";
                        if (this.txtLocation != "") {
                            strLoc = this.txtLocation.toUpperCase();
                            this.strLocation = this.txtLocation.trim();
                        }
                        else {
                            strLoc = "";
                        }
                        data_1 = null;
                        this.spnrService.start();
                        return [4 /*yield*/, this.processParmService.getAssignedLocationDetails(ddlSelectedOrgId, strLoc, this.selectedOrgId, this.lblLocGrpId, this.lblOrgGrpId).
                                catch(this.httpService.handleError).then(function (res) {
                                data_1 = res.json();
                                _this.assignLocationLst = data_1.DataList;
                                localStorage.setItem("tempLocationData", JSON.stringify(_this.assignLocationLst));
                                _this.assignLocationLsttest = data_1.DataList;
                                statusCode_1 = data_1.StatusCode;
                                switch (data_1.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.setValues();
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data_1.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.setValues();
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data_1.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.setValues();
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data_1.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        //if (this.selectedRowReplenishment != null && this.selectedRowReplenishment.SOURCELOCATIONS != null && this.selectedRowReplenishment.SOURCELOCATIONS != "") {
                        //    this.dsTemp = [];
                        //    let sourceLocsplit = this.selectedRowReplenishment.SOURCELOCATIONS.split(', ');
                        //    if (sourceLocsplit != null && sourceLocsplit.length > 0) {
                        //        for (let x = 0; x < sourceLocsplit.length; x++) {
                        //            if (sourceLocsplit[x].toString() != "") {
                        //                let sourcelocation = this.assignLocationLst.filter(s => s.LOCATION == sourceLocsplit[x].toString() && s.PAR_LOC_ID == this.lblLocGrpId);//&& s.BUSINESS_UNIT == this.selectedOrgId);
                        //                if (sourcelocation != null && sourcelocation.length > 0) {
                        //                    for (let y = 0; y < sourcelocation.length; y++) {
                        //                        sourcelocation[y].CHK_VALUE = 1;
                        //                        this.dsTemp.push(sourcelocation[y]);
                        //                    }
                        //                }
                        //            }
                        //        }
                        //    }
                        //}
                        if (this.dsTemp != null && this.dsTemp.length > 0) {
                            rows_1 = this.dsTemp.filter(function (x) { return x.M_LOCATION == _this.lblLocGrpId && x.M_BUSINESS_UNIT == _this.selectedOrgId; });
                            if (rows_1 != null && rows_1.length > 0 && this.assignLocationLst.length > 0) {
                                for (intCnt = 0; intCnt < this.assignLocationLst.length; intCnt++) {
                                    this.assignLocationLst[intCnt].CHK_ALLOCATED = 0;
                                    this.assignLocationLst[intCnt].CHK_VALUE = 0;
                                    this.assignLocationLst[intCnt].PERFORM_ACTION = 0;
                                    this.assignLocationLst[intCnt].M_BUSINESS_UNIT = this.selectedOrgId;
                                    this.assignLocationLst[intCnt].M_LOCATION = this.lblLocGrpId;
                                }
                                _loop_2 = function (i) {
                                    if (this_2.assignLocationLst != null) {
                                        //for (let intCnt = 0; intCnt < this.assignLocationLst.length; intCnt++) {
                                        var testList = this_2.assignLocationLst.filter(function (x) { return x.BUSINESS_UNIT.toUpperCase() == rows_1[i].BUSINESS_UNIT.toUpperCase() && x.LOCATION.toUpperCase() == rows_1[i].LOCATION.toUpperCase(); });
                                        if (testList != undefined && testList.length > 0) {
                                            // if (this.assignLocationLst[intCnt].BUSINESS_UNIT.toUpperCase() == rows[i].BUSINESS_UNIT.toUpperCase() &&
                                            //  this.assignLocationLst[intCnt].LOCATION.toUpperCase() == rows[i].LOCATION.toUpperCase()) {
                                            for (var z = 0; z < testList.length; z++) {
                                                if (rows_1[i].PERFORM_ACTION == 2) {
                                                    testList[z].CHK_ALLOCATED = 0;
                                                    testList[z].CHK_VALUE = 0;
                                                    testList[z].PERFORM_ACTION = 2;
                                                    //this.assignLocationLst[intCnt].CHK_ALLOCATED = 0;
                                                    //this.assignLocationLst[intCnt].CHK_VALUE = 0;
                                                    //this.assignLocationLst[intCnt].PERFORM_ACTION = 2;
                                                }
                                                else {
                                                    //this.assignLocationLst[intCnt].CHK_ALLOCATED = 1;
                                                    //this.assignLocationLst[intCnt].CHK_VALUE = 1;
                                                    //this.assignLocationLst[intCnt].PERFORM_ACTION = 0;
                                                    testList[z].CHK_ALLOCATED = 1;
                                                    testList[z].CHK_VALUE = 1;
                                                    testList[z].PERFORM_ACTION = 0;
                                                }
                                            }
                                            //}
                                        }
                                        //}
                                    }
                                };
                                this_2 = this;
                                for (i = 0; i < rows_1.length; i++) {
                                    _loop_2(i);
                                }
                            }
                            else {
                                if (this.dsLocDetailsDeleted != null) {
                                    rows_1 = this.dsLocDetailsDeleted.filter(function (x) { return x.M_LOCATION == _this.lblLocGrpId && x.M_BUSINESS_UNIT == _this.selectedOrgId; });
                                    if (rows_1.length > 0) {
                                        for (intCnt = 0; intCnt < this.assignLocationLst.length; intCnt++) {
                                            this.assignLocationLst[intCnt].CHK_ALLOCATED = 0;
                                            this.assignLocationLst[intCnt].CHK_VALUE = 0;
                                            this.assignLocationLst[intCnt].PERFORM_ACTION = 0;
                                        }
                                        for (i = 0; i < rows_1.length; i++) {
                                            if (this.assignLocationLst != null) {
                                                for (intCnt = 0; intCnt < this.assignLocationLst.length; intCnt++) {
                                                    if (this.assignLocationLst[intCnt].BUSINESS_UNIT.toUpperCase() == rows_1[i].BUSINESS_UNIT.toUpperCase() &&
                                                        this.assignLocationLst[intCnt].LOCATION.toUpperCase() == rows_1[i].LOCATION.toUpperCase()) {
                                                        this.assignLocationLst[intCnt].CHK_ALLOCATED = 1;
                                                        this.assignLocationLst[intCnt].CHK_VALUE = 0;
                                                        this.assignLocationLst[intCnt].PERFORM_ACTION = 2;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (statusCode_1 == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            if (this.assignLocationLst != null) {
                                if (this.assignLocationLst.length > 0) {
                                    this.dtAllocTable = [];
                                    this.dtUnAllocTable = [];
                                    _loop_3 = function (intCntrows) {
                                        var mt_pouAssign_Location = new vm_mt_pou_assign_locations_1.VM_MT_POU_ASSIGN_LOCATIONS();
                                        this_3.assignLocationLst[intCntrows].M_BUSINESS_UNIT = this_3.selectedOrgId;
                                        this_3.assignLocationLst[intCntrows].M_LOCATION = this_3.lblLocGrpId;
                                        mt_pouAssign_Location.BUSINESS_UNIT = this_3.assignLocationLst[intCntrows].BUSINESS_UNIT;
                                        mt_pouAssign_Location.CHK_ALLOCATED = this_3.assignLocationLst[intCntrows].CHK_ALLOCATED;
                                        mt_pouAssign_Location.CHK_VALUE = this_3.assignLocationLst[intCntrows].CHK_VALUE;
                                        mt_pouAssign_Location.LOCATION = this_3.assignLocationLst[intCntrows].LOCATION;
                                        mt_pouAssign_Location.LOCATION_DESCR = this_3.assignLocationLst[intCntrows].LOCATION_DESCR;
                                        mt_pouAssign_Location.PERFORM_ACTION = this_3.assignLocationLst[intCntrows].PERFORM_ACTION;
                                        mt_pouAssign_Location.ROWINDEX = this_3.assignLocationLst[intCntrows].ROWINDEX;
                                        mt_pouAssign_Location.TYPE = this_3.assignLocationLst[intCntrows].TYPE;
                                        mt_pouAssign_Location.M_BUSINESS_UNIT = this_3.selectedOrgId;
                                        mt_pouAssign_Location.M_LOCATION = this_3.lblLocGrpId;
                                        if (this_3.assignLocationLst[intCntrows].CHK_VALUE == 1) {
                                            this_3.dtAllocTable.push(mt_pouAssign_Location);
                                            if (this_3.dsTemp != null) {
                                                drows = this_3.dsTemp.filter(function (x) { return x.M_LOCATION == _this.lblLocGrpId && x.M_BUSINESS_UNIT == _this.selectedOrgId && x.LOCATION == mt_pouAssign_Location.LOCATION; });
                                                if (drows != null && drows.length == 0) {
                                                    this_3.dsTemp.push(mt_pouAssign_Location);
                                                }
                                            }
                                            // this.dsTemp = this.dtAllocTable;
                                        }
                                        else if (this_3.assignLocationLst[intCntrows].CHK_VALUE == 0) {
                                            this_3.dtUnAllocTable.push(mt_pouAssign_Location);
                                        }
                                    };
                                    this_3 = this;
                                    for (intCntrows = 0; intCntrows < this.assignLocationLst.length; intCntrows++) {
                                        _loop_3(intCntrows);
                                    }
                                    if ((this.dtAllocTable != null) && (this.dsTemp == null || this.dsTemp == undefined || this.dsTemp.length == 0)) {
                                        this.srcLocationsOnLoad = this.dtAllocTable;
                                        for (index = 0; index < this.srcLocationsOnLoad.length; index++) {
                                            this.srcLocationsOnLoad[index].ROW_INDEX = this.intValue;
                                            this.srcLocationsOnLoad[index].M_BUSINESS_UNIT = this.selectedOrgId;
                                            this.srcLocationsOnLoad[index].M_LOCATION = this.lblLocGrpId;
                                            this.srcLocationsOnLoad[index].ORG_GROUP_ID = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID].toString();
                                        }
                                        this.dsTemp = this.srcLocationsOnLoad;
                                    }
                                }
                            }
                            //Session["UnAllocDS"] = dtUnAllocTable;
                            if (this.ddlDisplaySelectValue == "ALLOC") {
                                if (this.dtAllocTable.length > 0) {
                                    this.table = true;
                                    // Session["AllocDS"] = dtAllocTable;
                                    this.bindDataGrid();
                                }
                                else {
                                    this.table = false;
                                    if (this.blnAssignLoc == false) {
                                        this.statusMsgs = [];
                                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                                    }
                                    this.blnAssignLoc = true;
                                }
                            }
                            if (this.ddlDisplaySelectValue == "UA") {
                                if (this.dtUnAllocTable.length > 0) {
                                    this.table = true;
                                    //Session["UnAllocDS"] = dtUnAllocTable;
                                    this.bindDataGrid();
                                }
                                else {
                                    this.table = false;
                                    this.statusMsgs = [];
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                                }
                            }
                            //For Sorting Begins ENDS
                            if (this.ddlDisplaySelectValue == "ALL") {
                                if (this.assignLocationLst != null) {
                                    if (this.assignLocationLst.length > 0) {
                                        this.table = true;
                                        //Session["AllocDS"] = dtAllocTable;
                                        //Session["UnAllocDS"] = dtUnAllocTable;
                                        this.bindDataGrid();
                                    }
                                }
                            }
                        }
                        this.spnrService.stop();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_11 = _a.sent();
                        this.clientErrorMsg(ex_11.toString());
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProcessParametersComponent.prototype.btnAssignLocs_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.statusMsgs = [];
                try {
                    //if (this.assignLocationLsttest.length > 0) {
                    //    for (let i = 0; i < this.assignLocationLsttest.length; i++) {
                    //        this.assignLocationLsttest[i].M_LOCATION = this.assignLocationLsttest[i].LOCATION;
                    //        this.assignLocationLsttest[i].M_BUSINESS_UNIT = this.assignLocationLsttest[i].BUSINESS_UNIT;
                    //        if (this.assignLocationLsttest[i].CHK_VALUE == 1 && this.assignLocationLsttest[i].CHK_ALLOCATED == 0) {
                    //            this.assignLocationLsttest[i].PERFORM_ACTION = 1;
                    //        }
                    //        else if (this.assignLocationLsttest[i].CHK_VALUE == 0 && this.assignLocationLsttest[i].CHK_ALLOCATED == 1) {
                    //            this.assignLocationLsttest[i].PERFORM_ACTION = 2;
                    //        }
                    //        else {
                    //            this.assignLocationLsttest[i].PERFORM_ACTION = 0;
                    //        }
                    //    }
                    //}
                    //if (this.assignLocationLst.length > 0) {
                    //    for (let i = 0; i < this.assignLocationLst.length; i++) {
                    //        this.assignLocationLst[i].M_LOCATION = this.assignLocationLst[i].LOCATION;
                    //        this.assignLocationLst[i].M_BUSINESS_UNIT = this.assignLocationLst[i].BUSINESS_UNIT;
                    //        if (this.assignLocationLst[i].CHK_VALUE == 1 && this.assignLocationLst[i].CHK_ALLOCATED == 0) {
                    //            this.assignLocationLst[i].PERFORM_ACTION = 1;
                    //        }
                    //        else if (this.assignLocationLst[i].CHK_VALUE == 0 && this.assignLocationLst[i].CHK_ALLOCATED == 1) {
                    //            this.assignLocationLst[i].PERFORM_ACTION = 2;
                    //        }
                    //        else {
                    //            this.assignLocationLst[i].PERFORM_ACTION = 0;
                    //        }
                    //    }
                    //}
                    this.table = false;
                    this.statusMsgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Updated Successfully." });
                }
                catch (ex) {
                    this.clientErrorMsg(ex);
                }
                return [2 /*return*/];
            });
        });
    };
    ProcessParametersComponent.prototype.assignLocChkboxChanged = function (lstData, event) {
        try {
            this.statusMsgs = [];
            if (event != null && event != undefined) {
                if (event == true) {
                    lstData.CHK_VALUE = 1;
                }
                else {
                    lstData.CHK_VALUE = 0;
                }
                var tempList = linq_es5_1.asEnumerable(this.dsTemp).Where(function (x) { return x.BUSINESS_UNIT == lstData.BUSINESS_UNIT && x.LOCATION == lstData.LOCATION && x.M_LOCATION == lstData.M_LOCATION && x.M_BUSINESS_UNIT == lstData.M_BUSINESS_UNIT; }).ToArray();
                if (tempList != null && tempList.length > 0) {
                    for (var k = 0; k < tempList.length; k++) {
                        if (event == false) {
                            tempList[k].CHK_VALUE = 0;
                        }
                        else {
                            tempList[k].CHK_VALUE = 1;
                        }
                    }
                    if (lstData.CHK_VALUE == 1 && lstData.CHK_ALLOCATED == 0) {
                        tempList[0].PERFORM_ACTION = 1;
                    }
                    else if (lstData.CHK_VALUE == 0 && lstData.CHK_ALLOCATED == 1) {
                        for (var k = 0; k < tempList.length; k++) {
                            if (tempList[k].CHK_VALUE == 0) {
                                tempList[k].PERFORM_ACTION = 2;
                                tempList[k].M_BUSINESS_UNIT = this.selectedOrgId;
                                tempList[k].M_LOCATION = this.lblLocGrpId;
                            }
                        }
                    }
                    else {
                        tempList[0].PERFORM_ACTION = 0;
                    }
                }
                else {
                    lstData.PERFORM_ACTION = 0;
                    lstData.M_BUSINESS_UNIT = this.selectedOrgId;
                    lstData.M_LOCATION = this.lblLocGrpId;
                    this.dsTemp.push(lstData);
                }
                //  this.dsTemp = this.dsTemp.filter(x => x.CHK_VALUE==1);
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ProcessParametersComponent.prototype.selectAllAssignLocLst = function () {
        try {
            this.statusMsgs = [];
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstAssignLocfilterData != null && this.lstAssignLocfilterData != undefined) {
                if (this.EndIndex > this.lstAssignLocfilterData.length) {
                    this.EndIndex = this.lstAssignLocfilterData.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    if (this.selectedRowReplenishment != null) {
                        if (this.selectedRowReplenishment.ID == this.lstAssignLocfilterData[i].LOCATION) {
                        }
                        else {
                            this.lstAssignLocfilterData[i].CHK_VALUE = true;
                        }
                    }
                    else {
                        this.lstAssignLocfilterData[i].CHK_VALUE = true;
                    }
                    this.lstAssignLocfilterData[i].M_LOCATION = this.lblLocGrpId;
                    this.lstAssignLocfilterData[i].M_BUSINESS_UNIT = this.selectedOrgId;
                    this.lstAssignLocfilterData[i].CHK_ALLOCATED = 1;
                    this.dsTemp.push(this.lstAssignLocfilterData[i]);
                }
            }
            else {
                if (this.EndIndex > this.assignLocationLst.length) {
                    this.EndIndex = this.assignLocationLst.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    if (this.selectedRowReplenishment != null) {
                        if (this.selectedRowReplenishment.ID == this.assignLocationLst[i].LOCATION) {
                            continue;
                        }
                        else {
                            this.assignLocationLst[i].CHK_VALUE = 1;
                        }
                    }
                    else {
                        this.assignLocationLst[i].CHK_VALUE = 1;
                    }
                    this.assignLocationLst[i].M_LOCATION = this.lblLocGrpId;
                    this.assignLocationLst[i].M_BUSINESS_UNIT = this.selectedOrgId;
                    this.assignLocationLst[i].CHK_ALLOCATED = 1;
                    this.dsTemp.push(this.assignLocationLst[i]);
                }
            }
            //  this.dsTemp = this.dsTemp.filter(x => x.CHK_VALUE == 1);
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ProcessParametersComponent.prototype.unSelectAllAssignLocLst = function () {
        var _this = this;
        try {
            this.statusMsgs = [];
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.lstAssignLocfilterData != null && this.lstAssignLocfilterData != undefined) {
                if (this.EndIndex > this.lstAssignLocfilterData.length) {
                    this.EndIndex = this.lstAssignLocfilterData.length;
                }
                var _loop_4 = function (i) {
                    this_4.lstAssignLocfilterData[i].CHK_VALUE = 0;
                    this_4.lstAssignLocfilterData[i].M_LOCATION = this_4.lblLocGrpId;
                    this_4.lstAssignLocfilterData[i].M_BUSINESS_UNIT = this_4.selectedOrgId;
                    this_4.lstAssignLocfilterData[i].CHK_ALLOCATED = 1;
                    var tempList = linq_es5_1.asEnumerable(this_4.dsTemp).Where(function (x) { return x.BUSINESS_UNIT == _this.lstAssignLocfilterData[i].BUSINESS_UNIT && x.LOCATION == _this.lstAssignLocfilterData[i].LOCATION && x.M_LOCATION == _this.lstAssignLocfilterData[i].M_LOCATION && x.M_BUSINESS_UNIT == _this.lstAssignLocfilterData[i].M_BUSINESS_UNIT; }).ToArray();
                    if (tempList != null && tempList.length > 0) {
                        for (var k = 0; k < tempList.length; k++) {
                            tempList[k].CHK_VALUE = 0;
                        }
                        if (this_4.lstAssignLocfilterData[i].CHK_VALUE == 1 && this_4.lstAssignLocfilterData[i].CHK_ALLOCATED == 0) {
                            tempList[0].PERFORM_ACTION = 1;
                        }
                        else if (this_4.lstAssignLocfilterData[i].CHK_VALUE == 0 && this_4.lstAssignLocfilterData[i].CHK_ALLOCATED == 1) {
                            for (var k = 0; k < tempList.length; k++) {
                                if (tempList[k].CHK_VALUE == 0) {
                                    tempList[k].PERFORM_ACTION = 2;
                                    tempList[k].M_BUSINESS_UNIT = this_4.selectedOrgId;
                                    tempList[k].M_LOCATION = this_4.lblLocGrpId;
                                }
                            }
                        }
                        else {
                            tempList[0].PERFORM_ACTION = 0;
                        }
                    }
                    else {
                        this_4.lstAssignLocfilterData[i].PERFORM_ACTION = 0;
                        this_4.lstAssignLocfilterData[i].M_BUSINESS_UNIT = this_4.selectedOrgId;
                        this_4.lstAssignLocfilterData[i].M_LOCATION = this_4.lblLocGrpId;
                        this_4.dsTemp.push(this_4.lstAssignLocfilterData[i]);
                    }
                    this_4.dsTemp.push(this_4.lstAssignLocfilterData[i]);
                };
                var this_4 = this;
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    _loop_4(i);
                }
            }
            else {
                if (this.EndIndex > this.assignLocationLst.length) {
                    this.EndIndex = this.assignLocationLst.length;
                }
                var _loop_5 = function (i) {
                    this_5.assignLocationLst[i].CHK_VALUE = 0;
                    this_5.assignLocationLst[i].M_LOCATION = this_5.lblLocGrpId;
                    this_5.assignLocationLst[i].M_BUSINESS_UNIT = this_5.selectedOrgId;
                    this_5.assignLocationLst[i].CHK_ALLOCATED = 1;
                    var tempList = linq_es5_1.asEnumerable(this_5.dsTemp).Where(function (x) { return x.BUSINESS_UNIT == _this.assignLocationLst[i].BUSINESS_UNIT && x.LOCATION == _this.assignLocationLst[i].LOCATION && x.M_LOCATION == _this.assignLocationLst[i].M_LOCATION && x.M_BUSINESS_UNIT == _this.assignLocationLst[i].M_BUSINESS_UNIT; }).ToArray();
                    if (tempList != null && tempList.length > 0) {
                        for (var k = 0; k < tempList.length; k++) {
                            tempList[k].CHK_VALUE = 0;
                        }
                        if (this_5.assignLocationLst[i].CHK_VALUE == 1 && this_5.assignLocationLst[i].CHK_ALLOCATED == 0) {
                            tempList[0].PERFORM_ACTION = 1;
                        }
                        else if (this_5.assignLocationLst[i].CHK_VALUE == 0 && this_5.assignLocationLst[i].CHK_ALLOCATED == 1) {
                            for (var k = 0; k < tempList.length; k++) {
                                if (tempList[k].CHK_VALUE == 0) {
                                    tempList[k].PERFORM_ACTION = 2;
                                    tempList[k].M_BUSINESS_UNIT = this_5.selectedOrgId;
                                    tempList[k].M_LOCATION = this_5.lblLocGrpId;
                                }
                            }
                        }
                        else {
                            tempList[0].PERFORM_ACTION = 0;
                        }
                    }
                    else {
                        this_5.assignLocationLst[i].PERFORM_ACTION = 0;
                        this_5.assignLocationLst[i].M_BUSINESS_UNIT = this_5.selectedOrgId;
                        this_5.assignLocationLst[i].M_LOCATION = this_5.lblLocGrpId;
                        this_5.dsTemp.push(this_5.assignLocationLst[i]);
                    }
                };
                var this_5 = this;
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    _loop_5(i);
                }
                //for (let v = 0; v < this.dsTemp.length; v++) {
                //    let testList = this.assignLocationLst.filter(x => x.BUSINESS_UNIT.toUpperCase() == this.dsTemp[v].BUSINESS_UNIT.toUpperCase() && x.LOCATION.toUpperCase() == this.dsTemp[v].LOCATION.toUpperCase());
                //    if (testList != undefined && testList.length > 0) {
                //        if (testList[v].CHK_VALUE == 0) {
                //            this.dsTemp[v].CHK_VALUE = 0;
                //        }
                //    }
                //}
                //   this.dsTemp = this.dsTemp.filter(x => x.CHK_VALUE == 1);
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ProcessParametersComponent.prototype.filterAssignLocData = function (event) {
        this.statusMsgs = [];
        this.lstAssignLocfilterData = new Array();
        this.lstAssignLocfilterData = event;
    };
    ProcessParametersComponent.prototype.ddlAssignLocationOrgIdChanged = function (data) {
        try {
            this.ddlSelectedAsgnLocOrgId = data.value;
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ProcessParametersComponent.prototype.ddlDisplayChanged = function (data) {
        try {
            this.ddlDisplaySelectValue = data.value;
            if (this.ddlDisplaySelectValue == 'ALLOC') {
                this.blnAssignLoc = false;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    //Private Methods
    ProcessParametersComponent.prototype.populateOrgIds = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var data_2, ex_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.statusMsgs = [];
                        data_2 = [];
                        //this.spnrService.start();
                        return [4 /*yield*/, this.commonService.getBusinessUnits(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], AtParEnums_1.BusinessType[AtParEnums_1.BusinessType.Inventory].toString()).
                                catch(this.httpService.handleError).then(function (res) {
                                data_2 = res.json();
                                _this.orgIdLstData = res.json().DataList;
                                _this.spnrService.stop();
                                _this.ddlOrgIdLst = [];
                                _this.ddlOrgIdLst.push({ label: "Select One", value: "Select One" });
                                switch (data_2.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (_this.orgIdLstData.length > 0) {
                                            for (var i = 0; i <= _this.orgIdLstData.length - 1; i++) {
                                                _this.ddlOrgIdLst.push({ label: _this.orgIdLstData[i].toString(), value: _this.orgIdLstData[i].toString() });
                                            }
                                        }
                                        else {
                                            data_2.StatusCode = AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS;
                                            break;
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data_2.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data_2.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data_2.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        //this.spnrService.start();
                        _a.sent();
                        this.spnrService.stop();
                        return [2 /*return*/, data_2.StatusCode];
                    case 2:
                        ex_12 = _a.sent();
                        this.clientErrorMsg(ex_12);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProcessParametersComponent.prototype.populateCarts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _strDept, strBunit, data_3, ex_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.statusMsgs = [];
                        _strDept = "";
                        strBunit = "";
                        if (this.selectedDept != "Select One") {
                            _strDept = this.selectedDept;
                        }
                        if (this.selectedOrgId != "Select One") {
                            strBunit = this.selectedOrgId;
                        }
                        data_3 = [];
                        this.deptCartLst = new Array();
                        this.deptCartLst = [];
                        this.replenSourecLocationLst = [];
                        //this.spnrService.start();
                        return [4 /*yield*/, this.processParmService.getDeptAllocatedCarts(_strDept, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], strBunit, this.txtCartId, this.intAppId).
                                catch(this.httpService.handleError).then(function (res) {
                                data_3 = res.json();
                                _this.deptCartLst = res.json().DataDictionary.pouCartWorkAllocationList;
                                _this.replenSourecLocationLst = res.json().DataDictionary.pouReplenSourceLocationList;
                                switch (data_3.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs = [];
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data_3.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data_3.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data_3.StatusMessage });
                                        _this.spnrService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        //this.spnrService.start();
                        _a.sent();
                        //this.spnrService.stop();
                        return [2 /*return*/, data_3.StatusCode];
                    case 2:
                        ex_13 = _a.sent();
                        this.clientErrorMsg(ex_13);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProcessParametersComponent.prototype.filterParLocation = function (query, parLocationsLst) {
        this.statusMsgs = [];
        try {
            var filtered = [];
            if (query == "%") {
                for (var i = 0; i < parLocationsLst.length; i++) {
                    var parLocationsValue = parLocationsLst[i];
                    filtered.push(parLocationsValue.CART_ID);
                }
            }
            else {
                if (query.length >= 1) {
                    for (var i = 0; i < parLocationsLst.length; i++) {
                        var parLocationsValue = parLocationsLst[i];
                        if (parLocationsValue.CART_ID.toString().toLowerCase().indexOf(query.toString().toLowerCase()) == 0) {
                            filtered.push(parLocationsValue.CART_ID);
                        }
                    }
                }
            }
            return filtered;
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ProcessParametersComponent.prototype.populateDepts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _strDept, strBunit, ex_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.statusMsgs = [];
                        _strDept = "";
                        strBunit = "";
                        if (this.selectedDept != "Select One") {
                            _strDept = this.selectedDept;
                        }
                        if (this.selectedOrgId != "Select One") {
                            strBunit = this.selectedOrgId;
                        }
                        //this.spnrService.start();
                        return [4 /*yield*/, this.processParmService.getAllocDepartment(_strDept, strBunit, this.intAppId).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spnrService.stop();
                                _this.ddlDeptLst = [];
                                _this.ddlDeptLst.push({ label: "Select One", value: "Select One" });
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.BILNG_NOT_MNGD_IN_ATPAR) {
                                    if (data.DataList.length > 0) {
                                        for (var i = 0; i <= data.DataList.length - 1; i++) {
                                            _this.ddlDeptLst.push({ label: data.DataList[i].DEPARTMENT_ID + "-" + data.DataList[i].DEPT_NAME, value: data.DataList[i].DEPARTMENT_ID });
                                        }
                                    }
                                }
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        if (data.DataList.length > 0) {
                                            for (var i = 0; i <= data.DataList.length - 1; i++) {
                                                _this.ddlDeptLst.push({ label: data.DataList[i].DEPARTMENT_ID + "-" + data.DataList[i].DEPT_NAME, value: data.DataList[i].DEPARTMENT_ID });
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.spnrService.stop();
                                        // this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.spnrService.stop();
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.spnrService.stop();
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        //this.spnrService.start();
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
    ProcessParametersComponent.prototype.populateData = function (pTabName) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var statusCode, strBunit, _strCartID, _loop_6, this_6, i, _loop_7, this_7, i, lst_1, i, _loop_8, this_8, x, assinglocations, x, replenSourecLocDataEntity, lst, i, _loop_9, this_9, i, _loop_10, this_10, i, _loop_11, this_11, i, _loop_12, this_12, i, ex_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.statusMsgs = [];
                        statusCode = -1;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 27, , 28]);
                        strBunit = "";
                        _strCartID = "";
                        if (!(pTabName == AtParEnums_1.Process_Type[AtParEnums_1.Process_Type.Replenishment].toString())) return [3 /*break*/, 11];
                        if (!(this.deptCartLst == undefined || this.deptCartLst.length == 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.populateCarts()];
                    case 2:
                        statusCode = _a.sent();
                        this.cartStatus = statusCode;
                        if (statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            return [2 /*return*/, statusCode];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        if (this.cartStatus != 0) {
                            if (this.cartStatus != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                return [2 /*return*/, this.cartStatus];
                            }
                        }
                        _a.label = 4;
                    case 4:
                        if (!(this.deptCartLst.length > 0)) return [3 /*break*/, 9];
                        //grdTable.Visible = true;
                        //TabContainer.Visible = true;
                        strBunit = this.selectedOrgId;
                        _strCartID = this.txtCartId;
                        if (!(this.parRepProcessScheduleLst == null || this.parRepProcessScheduleLst.length == 0 || this.parRepProcessScheduleLst == undefined)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.getCartSchedulesData(strBunit, _strCartID, AtParEnums_1.Process_Type.Replenishment.toString(), this.intAppId, this.deviceTokenEntry)];
                    case 5:
                        statusCode = _a.sent();
                        if (statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            return [2 /*return*/, statusCode];
                        }
                        _loop_6 = function (i) {
                            var _drCartIds = [];
                            this_6.parLocProcessScheduleLst[i].OLDREPLENISH_FROM = this_6.parLocProcessScheduleLst[i].REPLENISH_FROM;
                            this_6.parLocProcessScheduleLst[i].OLDSOURCELOCATIONS = this_6.parLocProcessScheduleLst[i].SOURCELOCATIONS;
                            _drCartIds = linq_es5_1.asEnumerable(this_6.deptCartLst).Where(function (x) { return x.CART_ID == _this.parLocProcessScheduleLst[i].ID; }).ToArray();
                            if (_drCartIds.length == 0) {
                                this_6.parLocProcessScheduleLst[i].blnSplice = false;
                                //this.parLocProcessScheduleLst.splice(i, 1);
                            }
                        };
                        this_6 = this;
                        for (i = 0; i < this.parLocProcessScheduleLst.length; i++) {
                            _loop_6(i);
                        }
                        this.parLocProcessScheduleLst = this.parLocProcessScheduleLst.filter(function (x) { return x.blnSplice != false; });
                        _loop_7 = function (i) {
                            var _drCartSourceLocations = [];
                            _drCartSourceLocations = linq_es5_1.asEnumerable(this_7.replenSourecLocationLst).Where(function (x) { return (x.PAR_LOC_ID == _this.deptCartLst[i].CART_ID) && (x.ORG_ID == _this.deptCartLst[i].BUSINESS_UNIT); }).ToArray();
                            if (_drCartSourceLocations != null && _drCartSourceLocations.length > 0) {
                                this_7.deptCartLst[i].SOURCELOCATIONS = "";
                                this_7.deptCartLst[i].OLDSOURCELOCATIONS = "";
                                for (var j = 0; j < _drCartSourceLocations.length; j++) {
                                    if (_drCartSourceLocations.length - 1 != j) {
                                        this_7.deptCartLst[i].SOURCELOCATIONS += _drCartSourceLocations[j].SOURCE_LOCATION.toString() + ", ";
                                    }
                                    else {
                                        this_7.deptCartLst[i].SOURCELOCATIONS += _drCartSourceLocations[j].SOURCE_LOCATION.toString();
                                    }
                                }
                                this_7.deptCartLst[i].OLDSOURCELOCATIONS = this_7.deptCartLst[i].SOURCELOCATIONS;
                            }
                            else {
                                this_7.deptCartLst[i].SOURCELOCATIONS = "";
                                this_7.deptCartLst[i].OLDSOURCELOCATIONS = "";
                            }
                            //if (this.deptCartLst[i].SOURCELOCATIONS != null && this.deptCartLst[i].SOURCELOCATIONS.toString().length > 0) {
                            //    this.deptCartLst[i].SOURCELOCATIONS = this.deptCartLst[i].SOURCELOCATIONS.slice(0, this.deptCartLst[i].SOURCELOCATIONS.length - 1);//.toString().trim().replace(",", "").trim();
                            //}
                            if (this_7.parLocProcessScheduleLst != null && this_7.parLocProcessScheduleLst.length > 0) {
                                var _drCartSchedules = [];
                                _drCartSchedules = linq_es5_1.asEnumerable(this_7.parLocProcessScheduleLst).Where(function (x) { return x.ID == _this.deptCartLst[i].CART_ID; }).ToArray();
                                if (_drCartSchedules.length > 0) {
                                    _drCartSchedules[0].ROW_INDEX = i;
                                    _drCartSchedules[0].CHK_VALUE = true;
                                    _drCartSchedules[0].DESCRIPTION = "";
                                    //if (this.deptCartLst[i].SOURCELOCATIONS != "") {
                                    //    this.deptCartLst[i].SOURCELOCATIONS = this.deptCartLst[i].SOURCELOCATIONS.substring(0, this.deptCartLst[i].SOURCELOCATIONS.length - 1);
                                    //}
                                    if (this_7.deptCartLst[i].SOURCELOCATIONS == "" && this_7.deptCartLst[i].SOURCELOCATIONS == null && this_7.deptCartLst[i].SOURCELOCATIONS == undefined && this_7.deptCartLst[i].SOURCELOCATIONS.length == 0) {
                                    }
                                    else if (this_7.deptCartLst[i].SOURCELOCATIONS != "" && this_7.deptCartLst[i].SOURCELOCATIONS != null && this_7.deptCartLst[i].SOURCELOCATIONS != undefined && this_7.deptCartLst[i].SOURCELOCATIONS.length > 0) {
                                        this_7.deptCartLst[i].SOURCELOCATIONS = this_7.deptCartLst[i].SOURCELOCATIONS.replace(/^,/, '');
                                    }
                                    _drCartSchedules[0].SOURCELOCATIONS = this_7.deptCartLst[i].SOURCELOCATIONS;
                                    _drCartSchedules[0].OLDSOURCELOCATIONS = this_7.deptCartLst[i].SOURCELOCATIONS;
                                }
                                else if (_drCartSchedules.length == 0) {
                                    var parLocProcessSchdEntity = void 0;
                                    parLocProcessSchdEntity = new mt_pou_par_loc_process_schedule_1.MT_POU_PAR_LOC_PROCESS_SCHEDULE();
                                    parLocProcessSchdEntity.ROW_INDEX = i;
                                    parLocProcessSchdEntity.ORG_ID = this_7.selectedOrgId;
                                    parLocProcessSchdEntity.ID = this_7.deptCartLst[i].CART_ID;
                                    parLocProcessSchdEntity.SCHEDULE_ID = "";
                                    parLocProcessSchdEntity.REVIEW_CHARGES = "";
                                    parLocProcessSchdEntity.DESCRIPTION = "";
                                    parLocProcessSchdEntity.CHK_VALUE = false;
                                    parLocProcessSchdEntity.BILLING_OPTION = 5;
                                    parLocProcessSchdEntity.REPLENISH_FROM = "";
                                    parLocProcessSchdEntity.OLDREPLENISH_FROM = "";
                                    parLocProcessSchdEntity.PROCESS_TYPE = AtParEnums_1.Process_Type.Replenishment;
                                    if (this_7.deptCartLst[i].SOURCELOCATIONS == "" && this_7.deptCartLst[i].SOURCELOCATIONS == null && this_7.deptCartLst[i].SOURCELOCATIONS == undefined && this_7.deptCartLst[i].SOURCELOCATIONS.length == 0) {
                                    }
                                    else if (this_7.deptCartLst[i].SOURCELOCATIONS != "" && this_7.deptCartLst[i].SOURCELOCATIONS != null && this_7.deptCartLst[i].SOURCELOCATIONS != undefined && this_7.deptCartLst[i].SOURCELOCATIONS.length > 0) {
                                        this_7.deptCartLst[i].SOURCELOCATIONS = this_7.deptCartLst[i].SOURCELOCATIONS.replace(/^,/, '');
                                    }
                                    parLocProcessSchdEntity.SOURCELOCATIONS = this_7.deptCartLst[i].SOURCELOCATIONS;
                                    parLocProcessSchdEntity.OLDSOURCELOCATIONS = parLocProcessSchdEntity.SOURCELOCATIONS;
                                    parLocProcessSchdEntity.INV_INTERFACE_ENABLE = this_7.deptCartLst[i].INV_INTERFACE_ENABLE;
                                    //  parLocProcessSchdEntity.BILLING_ENABLE = this.deptCartLst[i].BILLING_ENABLE;
                                    this_7.parLocProcessScheduleLst.push(parLocProcessSchdEntity);
                                }
                            }
                            else {
                                var parLocProcessSchdEntity = void 0;
                                parLocProcessSchdEntity = new mt_pou_par_loc_process_schedule_1.MT_POU_PAR_LOC_PROCESS_SCHEDULE();
                                parLocProcessSchdEntity.ROW_INDEX = i;
                                parLocProcessSchdEntity.ORG_ID = this_7.selectedOrgId;
                                parLocProcessSchdEntity.ID = this_7.deptCartLst[i].CART_ID.toString();
                                parLocProcessSchdEntity.SCHEDULE_ID = "";
                                parLocProcessSchdEntity.REVIEW_CHARGES = "";
                                parLocProcessSchdEntity.DESCRIPTION = "";
                                parLocProcessSchdEntity.CHK_VALUE = false;
                                parLocProcessSchdEntity.BILLING_OPTION = 5;
                                parLocProcessSchdEntity.REPLENISH_FROM = "";
                                parLocProcessSchdEntity.OLDREPLENISH_FROM = "";
                                parLocProcessSchdEntity.PROCESS_TYPE = AtParEnums_1.Process_Type.Replenishment;
                                if (this_7.deptCartLst[i].SOURCELOCATIONS == "" && this_7.deptCartLst[i].SOURCELOCATIONS == null && this_7.deptCartLst[i].SOURCELOCATIONS == undefined && this_7.deptCartLst[i].SOURCELOCATIONS.length == 0) {
                                }
                                else if (this_7.deptCartLst[i].SOURCELOCATIONS != "" && this_7.deptCartLst[i].SOURCELOCATIONS != null && this_7.deptCartLst[i].SOURCELOCATIONS != undefined && this_7.deptCartLst[i].SOURCELOCATIONS.length > 0) {
                                    this_7.deptCartLst[i].SOURCELOCATIONS = this_7.deptCartLst[i].SOURCELOCATIONS.replace(/^,/, '');
                                }
                                parLocProcessSchdEntity.SOURCELOCATIONS = this_7.deptCartLst[i].SOURCELOCATIONS;
                                parLocProcessSchdEntity.OLDSOURCELOCATIONS = parLocProcessSchdEntity.SOURCELOCATIONS;
                                parLocProcessSchdEntity.INV_INTERFACE_ENABLE = this_7.deptCartLst[i].INV_INTERFACE_ENABLE;
                                //parLocProcessSchdEntity.BILLING_ENABLE = this.deptCartLst[i].BILLING_ENABLE;
                                this_7.parLocProcessScheduleLst.push(parLocProcessSchdEntity);
                            }
                        };
                        this_7 = this;
                        for (i = 0; i < this.deptCartLst.length; i++) {
                            _loop_7(i);
                        }
                        return [4 /*yield*/, this.getSheduleIdsData()];
                    case 6:
                        // Session["_dsCartSchedules"] = _dsCartSchedules;
                        statusCode = _a.sent();
                        if (statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            return [2 /*return*/, statusCode];
                        }
                        this.bindGrid(this.parLocProcessScheduleLst);
                        return [3 /*break*/, 8];
                    case 7:
                        if (this.assignLocationLst != null && this.assignLocationLst.length > 0) {
                            if (this.ddlDisplaySelectValue == "UA") {
                                lst_1 = this.assignLocationLsttest.filter(function (x) { return x.CHK_VALUE == 1; });
                                if (lst_1 != null && lst_1.length > 0) {
                                    this.assignLocationLst = [];
                                    for (i = 0; i < lst_1.length; i++) {
                                        this.assignLocationLst.push(lst_1[i]);
                                    }
                                }
                            }
                            _loop_8 = function (x) {
                                var lstReplenlst = linq_es5_1.asEnumerable(this_8.replenSourecLocationLst).Where(function (a) { return a.PAR_LOC_ID == _this.lblLocGrpId && a.SOURCE_LOCATION == _this.assignLocationLst[x].LOCATION && (_this.assignLocationLst[x].CHK_VALUE == 0); }).ToArray(); //this.assignLocationLst[x].CHK_VALUE == false || 
                                if (lstReplenlst != null && lstReplenlst.length > 0) {
                                    lstReplenlst[0].CHK_VALUE = false;
                                }
                            };
                            this_8 = this;
                            for (x = 0; x < this.assignLocationLst.length; x++) {
                                _loop_8(x);
                            }
                            this.sourceLocs = "";
                            assinglocations = this.assignLocationLst.filter(function (x) { return x.CHK_VALUE == 1; });
                            if (assinglocations != null && assinglocations.length > 0) {
                                for (x = 0; x < assinglocations.length; x++) {
                                    replenSourecLocDataEntity = void 0;
                                    replenSourecLocDataEntity = new mt_pou_replen_source_location_1.MT_POU_REPLEN_SOURCE_LOCATION();
                                    if (assinglocations.length - 1 != x) {
                                        this.sourceLocs += assinglocations[x].LOCATION + ", ";
                                    }
                                    else {
                                        this.sourceLocs += assinglocations[x].LOCATION;
                                    }
                                    //if (this.sourceLocs != ""){
                                    //    this.sourceLocs = this.sourceLocs.substring(0, this.sourceLocs.length - 1);
                                    //}
                                    replenSourecLocDataEntity.BUSINESS_UNIT = assinglocations[x].BUSINESS_UNIT;
                                    //if (assinglocations[x].LOCATION != "") {
                                    //    assinglocations[x].LOCATION = assinglocations[x].LOCATION.substring(0, this.sourceLocs.length - 1);
                                    //}
                                    replenSourecLocDataEntity.SOURCE_LOCATION = assinglocations[x].LOCATION;
                                    replenSourecLocDataEntity.SOURCE_ORG_ID = assinglocations[x].BUSINESS_UNIT;
                                    replenSourecLocDataEntity.ORG_GROUP_ID = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID].toString();
                                    replenSourecLocDataEntity.ORG_ID = this.selectedOrgId.toString();
                                    replenSourecLocDataEntity.PAR_LOC_ID = this.lblLocGrpId;
                                    replenSourecLocDataEntity.M_BUSINESS_UNIT = assinglocations[x].M_BUSINESS_UNIT;
                                    replenSourecLocDataEntity.M_LOCATION = assinglocations[x].M_LOCATION;
                                    replenSourecLocDataEntity.BUSINESS_UNIT = assinglocations[x].BUSINESS_UNIT;
                                    replenSourecLocDataEntity.LOCATION = assinglocations[x].LOCATION;
                                    replenSourecLocDataEntity.CHK_VALUE = assinglocations[x].CHK_VALUE;
                                    this.replenSourecLocationLst.push(replenSourecLocDataEntity);
                                }
                            }
                            lst = linq_es5_1.asEnumerable(this.parRepProcessScheduleLst).Where(function (x) { return x.ID == _this.selectedRowReplenishment.ID; }).ToArray();
                            if (this.sourceLocs != "" && this.sourceLocs != undefined && this.sourceLocs != null && this.sourceLocs.length > 0) {
                                lst[0].SOURCELOCATIONS = this.sourceLocs;
                                lst[0].SOURCELOCATIONS = lst[0].SOURCELOCATIONS.replace(/^,/, '');
                                //lst[0].SOURCELOCATIONS = this.sourceLocs.slice(0, this.sourceLocs.length - 1);
                            }
                            else {
                                lst[0].SOURCELOCATIONS = "";
                                lst[0].OLDSOURCELOCATIONS = "";
                            }
                            //for (let i = 0; i < this.parLocProcessScheduleLst.length; i++) {
                            //    if (this.parLocProcessScheduleLst[i].SOURCELOCATIONS != "") {
                            //        this.parLocProcessScheduleLst[i].SOURCELOCATIONS = this.parLocProcessScheduleLst[i].SOURCELOCATIONS.slice(0, this.parLocProcessScheduleLst[i].SOURCELOCATIONS.length - 1);
                            //    }
                            //}
                            //for (let i = 0; i < this.replenSourecLocationLst.length; i++) {
                            //    if (this.replenSourecLocationLst[i].SOURCE_LOCATION != "") {
                            //        this.replenSourecLocationLst[i].SOURCE_LOCATION = this.replenSourecLocationLst[i].SOURCE_LOCATION.slice(0, this.replenSourecLocationLst[i].SOURCE_LOCATION.length - 1);
                            //    }
                            //}
                        }
                        _a.label = 8;
                    case 8:
                        //Session["_dsSchedules"] = _dsSchedules;
                        this.hdnParLocProcessScheduleLst = this.parRepProcessScheduleLst;
                        return [3 /*break*/, 10];
                    case 9: 
                    //grdTable.Visible = false;
                    //trStatusMessage.Visible = true;
                    //TabContainer.Visible = false;
                    //tblBilling.Visible = false;                   
                    return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND];
                    case 10:
                        for (i = 0; i < this.parRepProcessScheduleLst.length; i++) {
                            if (this.parRepProcessScheduleLst[i].SOURCELOCATIONS != "" && this.parRepProcessScheduleLst[i].SOURCELOCATIONS != undefined &&
                                this.parRepProcessScheduleLst[i].SOURCELOCATIONS != null && this.parRepProcessScheduleLst[i].SOURCELOCATIONS.length > 0) {
                                this.parRepProcessScheduleLst[i].SOURCELOCATIONS = this.parRepProcessScheduleLst[i].SOURCELOCATIONS.replace(/,\s$/, "");
                            }
                        }
                        return [3 /*break*/, 26];
                    case 11:
                        if (!(pTabName == AtParEnums_1.Process_Type[AtParEnums_1.Process_Type.Billing].toString())) return [3 /*break*/, 19];
                        if (!(this.deptLst == undefined || this.deptLst.length == 0)) return [3 /*break*/, 13];
                        return [4 /*yield*/, this.populateBillingDept(AtParEnums_1.Process_Type[AtParEnums_1.Process_Type.Billing].toString())];
                    case 12:
                        statusCode = _a.sent();
                        this.billStatus = statusCode;
                        _a.label = 13;
                    case 13:
                        statusCode = this.billStatus;
                        if (statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            return [2 /*return*/, statusCode];
                        }
                        if (!(this.deptLst.length > 0)) return [3 /*break*/, 17];
                        strBunit = this.selectedOrgId.toString();
                        _strCartID = "";
                        if (!(this.parBillProcessScheduleLst == null || this.parBillProcessScheduleLst.length == 0 || this.parBillProcessScheduleLst == undefined)) return [3 /*break*/, 16];
                        return [4 /*yield*/, this.getCartSchedulesData(strBunit, _strCartID, AtParEnums_1.Process_Type.Billing.toString(), this.intAppId, this.deviceTokenEntry)];
                    case 14:
                        statusCode = _a.sent();
                        if (statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            return [2 /*return*/, statusCode];
                        }
                        if (this.parBillProcessScheduleLst != null && this.parBillProcessScheduleLst.length > 0) {
                            this.parBillProcessScheduleLst = this.parBillProcessScheduleLst;
                        }
                        _loop_9 = function (i) {
                            var _drDeptIds = [];
                            _drDeptIds = linq_es5_1.asEnumerable(this_9.deptLst).Where(function (x) { return x.DEPARTMENT_ID == _this.parBillProcessScheduleLst[i].ID; }).ToArray();
                            if (_drDeptIds.length == 0) {
                                this_9.parBillProcessScheduleLst.splice(i, 1);
                            }
                        };
                        this_9 = this;
                        for (i = 0; i < this.parBillProcessScheduleLst.length; i++) {
                            _loop_9(i);
                        }
                        _loop_10 = function (i) {
                            if (this_10.parBillProcessScheduleLst.length > 0) {
                                var _drDeptSchedules = [];
                                _drDeptSchedules = linq_es5_1.asEnumerable(this_10.parBillProcessScheduleLst).Where(function (x) { return x.ID == _this.deptLst[i].DEPARTMENT_ID; }).ToArray();
                                if (_drDeptSchedules.length > 0) {
                                    _drDeptSchedules[0].ROW_INDEX = i;
                                    _drDeptSchedules[0].CHK_VALUE = true;
                                    _drDeptSchedules[0].DESCRIPTION = "";
                                    _drDeptSchedules[0].DEPT_NAME = this_10.deptLst[i].DEPT_NAME;
                                    if (_drDeptSchedules[0].REVIEW_CHARGES == "Y") {
                                        _drDeptSchedules[0].BlnReviewChargeValue = true;
                                    }
                                    else if (_drDeptSchedules[0].REVIEW_CHARGES == "N") {
                                        _drDeptSchedules[0].BlnReviewChargeValue = false;
                                    }
                                }
                                else if (_drDeptSchedules.length == 0) {
                                    var parLocProcessSchdEntity = void 0;
                                    parLocProcessSchdEntity = new mt_pou_par_loc_process_schedule_1.MT_POU_PAR_LOC_PROCESS_SCHEDULE();
                                    parLocProcessSchdEntity.ROW_INDEX = i;
                                    parLocProcessSchdEntity.ORG_ID = this_10.selectedOrgId;
                                    parLocProcessSchdEntity.ID = this_10.deptLst[i].DEPARTMENT_ID;
                                    parLocProcessSchdEntity.SCHEDULE_ID = "";
                                    parLocProcessSchdEntity.REVIEW_CHARGES = "N";
                                    parLocProcessSchdEntity.DESCRIPTION = "";
                                    parLocProcessSchdEntity.CHK_VALUE = false;
                                    parLocProcessSchdEntity.BILLING_OPTION = 5;
                                    parLocProcessSchdEntity.REPLENISH_FROM = "";
                                    parLocProcessSchdEntity.DEPT_NAME = this_10.deptLst[i].DEPT_NAME;
                                    parLocProcessSchdEntity.PROCESS_TYPE = AtParEnums_1.Process_Type.Billing;
                                    parLocProcessSchdEntity.BILLING_ENABLE = this_10.deptLst[i].BILLING_ENABLE;
                                    this_10.parBillProcessScheduleLst.push(parLocProcessSchdEntity);
                                }
                            }
                            else {
                                var parLocProcessSchdEntity = void 0;
                                parLocProcessSchdEntity = new mt_pou_par_loc_process_schedule_1.MT_POU_PAR_LOC_PROCESS_SCHEDULE();
                                parLocProcessSchdEntity.ROW_INDEX = i;
                                parLocProcessSchdEntity.ORG_ID = this_10.selectedOrgId;
                                parLocProcessSchdEntity.ID = this_10.deptLst[i].DEPARTMENT_ID;
                                parLocProcessSchdEntity.SCHEDULE_ID = "";
                                parLocProcessSchdEntity.REVIEW_CHARGES = "N";
                                parLocProcessSchdEntity.DESCRIPTION = "";
                                parLocProcessSchdEntity.CHK_VALUE = false;
                                parLocProcessSchdEntity.BILLING_OPTION = 5;
                                parLocProcessSchdEntity.REPLENISH_FROM = "";
                                parLocProcessSchdEntity.DEPT_NAME = this_10.deptLst[i].DEPT_NAME;
                                parLocProcessSchdEntity.PROCESS_TYPE = AtParEnums_1.Process_Type.Billing;
                                parLocProcessSchdEntity.BILLING_ENABLE = this_10.deptLst[i].BILLING_ENABLE;
                                this_10.parBillProcessScheduleLst.push(parLocProcessSchdEntity);
                            }
                        };
                        this_10 = this;
                        for (i = 0; i < this.deptLst.length; i++) {
                            _loop_10(i);
                        }
                        return [4 /*yield*/, this.getSheduleIdsData()];
                    case 15:
                        statusCode = _a.sent();
                        if (statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            return [2 /*return*/, statusCode];
                        }
                        if (this.parBillProcessScheduleLst != null && this.parBillProcessScheduleLst.length > 0) {
                            this.parBillProcessScheduleLst = this.parBillProcessScheduleLst;
                        }
                        _a.label = 16;
                    case 16:
                        this.billing_BindGrid(this.parBillProcessScheduleLst);
                        return [3 /*break*/, 18];
                    case 17: return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND];
                    case 18: return [3 /*break*/, 26];
                    case 19:
                        if (!(pTabName == AtParEnums_1.Process_Type[AtParEnums_1.Process_Type.Alerts].toString())) return [3 /*break*/, 26];
                        if (!(this.deptAlertLst == undefined || this.deptAlertLst.length == 0)) return [3 /*break*/, 21];
                        return [4 /*yield*/, this.populateBillingDept(AtParEnums_1.Process_Type[AtParEnums_1.Process_Type.Alerts].toString())];
                    case 20:
                        statusCode = _a.sent();
                        this.alertStatus = statusCode;
                        _a.label = 21;
                    case 21:
                        this.alertStatus = 0;
                        statusCode = this.alertStatus;
                        if (statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            return [2 /*return*/, statusCode];
                        }
                        if (!(this.deptAlertLst.length > 0)) return [3 /*break*/, 25];
                        strBunit = this.selectedOrgId.toString();
                        _strCartID = "";
                        if (!(this.schdAlerts == undefined || this.schdAlerts.length == 0)) return [3 /*break*/, 24];
                        return [4 /*yield*/, this.getCartSchedulesData(strBunit, _strCartID, AtParEnums_1.Process_Type.Alerts.toString(), this.intAppId, this.deviceTokenEntry)];
                    case 22:
                        statusCode = _a.sent();
                        if (statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            return [2 /*return*/, statusCode];
                        }
                        _loop_11 = function (i) {
                            var _drDeptIds = [];
                            _drDeptIds = linq_es5_1.asEnumerable(this_11.deptAlertLst).Where(function (x) { return x.DEPARTMENT_ID == _this.parLocProcessScheduleLst[i].ID; }).ToArray();
                            if (_drDeptIds.length == 0) {
                                this_11.parLocProcessScheduleLst.splice(i, 1);
                            }
                        };
                        this_11 = this;
                        for (i = 0; i < this.parLocProcessScheduleLst.length; i++) {
                            _loop_11(i);
                        }
                        this.schdAlerts = [];
                        _loop_12 = function (i) {
                            if (this_12.parLocProcessScheduleLst.length > 0) {
                                var _drDeptSchedules = [];
                                _drDeptSchedules = linq_es5_1.asEnumerable(this_12.parLocProcessScheduleLst).Where(function (x) { return x.ID == _this.deptAlertLst[i].DEPARTMENT_ID; }).ToArray();
                                if (_drDeptSchedules.length > 0) {
                                    var schdAlertsEntity = void 0;
                                    schdAlertsEntity = new mt_pou_par_loc_process_schedule_1.MT_POU_PAR_LOC_PROCESS_SCHEDULE();
                                    schdAlertsEntity.ROW_INDEX = i;
                                    schdAlertsEntity.ORG_ID = this_12.selectedOrgId;
                                    schdAlertsEntity.ID = this_12.deptAlertLst[i].DEPARTMENT_ID;
                                    schdAlertsEntity.SCHEDULE_ID = "";
                                    schdAlertsEntity.REVIEW_CHARGES = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
                                    schdAlertsEntity.DESCRIPTION = "";
                                    //schdAlertsEntity.CHK_VALUE = false;
                                    schdAlertsEntity.CHK_VALUE = true;
                                    schdAlertsEntity.BILLING_OPTION = 5;
                                    schdAlertsEntity.DEPT_NAME = this_12.deptAlertLst[i].DEPT_NAME;
                                    var _drSchAlerts = [];
                                    _drSchAlerts = linq_es5_1.asEnumerable(this_12.parLocProcessScheduleLst).Where(function (x) { return (x.ID == _this.deptAlertLst[i].DEPARTMENT_ID) && (x.PROCESS_TYPE == AtParEnums_1.Process_Type.LowStock); }).ToArray();
                                    if (_drSchAlerts.length > 0) {
                                        schdAlertsEntity.LOW_STK_SCHEDULE_ID = _drSchAlerts[0].SCHEDULE_ID.toString();
                                    }
                                    else {
                                        schdAlertsEntity.LOW_STK_SCHEDULE_ID = "";
                                    }
                                    _drSchAlerts = linq_es5_1.asEnumerable(this_12.parLocProcessScheduleLst).Where(function (x) { return (x.ID == _this.deptAlertLst[i].DEPARTMENT_ID) && (x.PROCESS_TYPE == AtParEnums_1.Process_Type.Expiration); }).ToArray();
                                    if (_drSchAlerts.length > 0) {
                                        schdAlertsEntity.EXP_SCHEDULE_ID = _drSchAlerts[0].SCHEDULE_ID.toString();
                                    }
                                    else {
                                        schdAlertsEntity.EXP_SCHEDULE_ID = "";
                                    }
                                    _drSchAlerts = linq_es5_1.asEnumerable(this_12.parLocProcessScheduleLst).Where(function (x) { return (x.ID == _this.deptAlertLst[i].DEPARTMENT_ID) && (x.PROCESS_TYPE == AtParEnums_1.Process_Type.Recall); }).ToArray();
                                    if (_drSchAlerts.length > 0) {
                                        schdAlertsEntity.RECALL_SCHEDULE_ID = _drSchAlerts[0].SCHEDULE_ID.toString();
                                    }
                                    else {
                                        schdAlertsEntity.RECALL_SCHEDULE_ID = "";
                                    }
                                    _drSchAlerts = linq_es5_1.asEnumerable(this_12.parLocProcessScheduleLst).Where(function (x) { return (x.ID == _this.deptAlertLst[i].DEPARTMENT_ID) && (x.PROCESS_TYPE == AtParEnums_1.Process_Type.BillOnly); }).ToArray();
                                    if (_drSchAlerts.length > 0) {
                                        schdAlertsEntity.BILLONLY_SCHEDULE_ID = _drSchAlerts[0].SCHEDULE_ID.toString();
                                    }
                                    else {
                                        schdAlertsEntity.BILLONLY_SCHEDULE_ID = "";
                                    }
                                    this_12.schdAlerts.push(schdAlertsEntity);
                                }
                                else if (_drDeptSchedules.length == 0) {
                                    var schdAlertsEntity = void 0;
                                    schdAlertsEntity = new mt_pou_par_loc_process_schedule_1.MT_POU_PAR_LOC_PROCESS_SCHEDULE();
                                    schdAlertsEntity.ROW_INDEX = i;
                                    schdAlertsEntity.ORG_ID = this_12.selectedOrgId;
                                    schdAlertsEntity.ID = this_12.deptAlertLst[i].DEPARTMENT_ID;
                                    schdAlertsEntity.SCHEDULE_ID = "";
                                    schdAlertsEntity.REVIEW_CHARGES = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
                                    schdAlertsEntity.DESCRIPTION = "";
                                    schdAlertsEntity.CHK_VALUE = false;
                                    schdAlertsEntity.BILLING_OPTION = 5;
                                    schdAlertsEntity.DEPT_NAME = this_12.deptAlertLst[i].DEPT_NAME;
                                    schdAlertsEntity.LOW_STK_SCHEDULE_ID = "";
                                    schdAlertsEntity.EXP_SCHEDULE_ID = "";
                                    schdAlertsEntity.RECALL_SCHEDULE_ID = "";
                                    schdAlertsEntity.BILLONLY_SCHEDULE_ID = "";
                                    schdAlertsEntity.PROCESS_TYPE = AtParEnums_1.Process_Type.Alerts;
                                    this_12.schdAlerts.push(schdAlertsEntity);
                                }
                            }
                            else {
                                var schdAlertsEntity = void 0;
                                schdAlertsEntity = new mt_pou_par_loc_process_schedule_1.MT_POU_PAR_LOC_PROCESS_SCHEDULE();
                                schdAlertsEntity.ROW_INDEX = i;
                                schdAlertsEntity.ORG_ID = this_12.selectedOrgId;
                                schdAlertsEntity.ID = this_12.deptAlertLst[i].DEPARTMENT_ID;
                                schdAlertsEntity.SCHEDULE_ID = "";
                                schdAlertsEntity.REVIEW_CHARGES = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
                                schdAlertsEntity.DESCRIPTION = "";
                                schdAlertsEntity.CHK_VALUE = false;
                                schdAlertsEntity.BILLING_OPTION = 5;
                                schdAlertsEntity.DEPT_NAME = this_12.deptAlertLst[i].DEPT_NAME;
                                schdAlertsEntity.LOW_STK_SCHEDULE_ID = "";
                                schdAlertsEntity.EXP_SCHEDULE_ID = "";
                                schdAlertsEntity.RECALL_SCHEDULE_ID = "";
                                schdAlertsEntity.BILLONLY_SCHEDULE_ID = "";
                                schdAlertsEntity.PROCESS_TYPE = AtParEnums_1.Process_Type.Alerts;
                                this_12.schdAlerts.push(schdAlertsEntity);
                            }
                        };
                        this_12 = this;
                        // this.schdAlerts = this.parLocProcessScheduleLst;
                        for (i = 0; i < this.deptAlertLst.length; i++) {
                            _loop_12(i);
                        }
                        return [4 /*yield*/, this.getSheduleIdsData()];
                    case 23:
                        statusCode = _a.sent();
                        if (statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            return [2 /*return*/, statusCode];
                        }
                        if (this.parLocProcessScheduleLst != null && this.parLocProcessScheduleLst != undefined && this.parLocProcessScheduleLst.length > 0) {
                            this.schdAlerts = this.schdAlerts;
                        }
                        _a.label = 24;
                    case 24:
                        this.alerts_BindGrid(this.schdAlerts);
                        return [3 /*break*/, 26];
                    case 25: return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND];
                    case 26: 
                    //this.spnrService.stop();
                    return [2 /*return*/, statusCode];
                    case 27:
                        ex_15 = _a.sent();
                        this.clientErrorMsg(ex_15);
                        return [2 /*return*/, statusCode];
                    case 28: return [2 /*return*/];
                }
            });
        });
    };
    ProcessParametersComponent.prototype.getCartSchedulesData = function (bUnit, cartID, procType, appId, deviceTokenEntry) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var data_4, ex_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.statusMsgs = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        data_4 = [];
                        //this.spnrService.start();
                        //this.parLocProcessScheduleLst = [];
                        //this.replenSourecLocationLst = [];
                        return [4 /*yield*/, this.processParmService.getCartSchedules(bUnit, cartID, procType, appId, this.deviceTokenEntry).
                                catch(this.httpService.handleError).then(function (res) {
                                data_4 = res.json();
                                if (procType == "1") {
                                    _this.parBillProcessScheduleLst = res.json().DataDictionary.pouParLocationProcessScheduleList;
                                }
                                else {
                                    _this.parLocProcessScheduleLst = res.json().DataDictionary.pouParLocationProcessScheduleList;
                                    _this.replenSourecLocationLst = res.json().DataDictionary.pouReplenSourceLocationList;
                                }
                                switch (data_4.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs = [];
                                        _this.spnrService.stop();
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data_4.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs = [];
                                        _this.spnrService.stop();
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data_4.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs = [];
                                        _this.spnrService.stop();
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data_4.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        //this.spnrService.start();
                        //this.parLocProcessScheduleLst = [];
                        //this.replenSourecLocationLst = [];
                        _a.sent();
                        //this.spnrService.stop();
                        return [2 /*return*/, data_4.StatusCode];
                    case 3:
                        ex_16 = _a.sent();
                        this.clientErrorMsg(ex_16);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProcessParametersComponent.prototype.getSheduleIdsData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var data, ex_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.statusMsgs = [];
                        data = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.scheduleHeader = [];
                        //  this.spnrService.start();
                        return [4 /*yield*/, this.processParmService.getSheduleIDs(this.deviceTokenEntry).
                                catch(this.httpService.handleError).then(function (res) {
                                data = res.json();
                                _this.scheduleHeader = data.DataList;
                                //this.spnrService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs = [];
                                        _this.spnrService.stop();
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.spnrService.stop();
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.spnrService.stop();
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        //  this.spnrService.start();
                        _a.sent();
                        // this.spnrService.stop();
                        return [2 /*return*/, data.StatusCode];
                    case 3:
                        ex_17 = _a.sent();
                        this.clientErrorMsg(ex_17);
                        return [2 /*return*/, data.StatusCode];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProcessParametersComponent.prototype.bindGrid = function (cartSchedules) {
        var _this = this;
        this.statusMsgs = [];
        try {
            this.selectedInvSchedule = "Select One";
            this.selectedReplenish = "Select One";
            var deplItems = void 0;
            deplItems = linq_es5_1.asEnumerable(this.deptCartLst).Where(function (x) { return (x.BUSINESS_UNIT == _this.parLocProcessScheduleLst[0].ORG_ID) &&
                (x.CART_ID == _this.parLocProcessScheduleLst[0].ID); });
            if (deplItems.length > 0) {
                if (deplItems[0].INV_INTERFACE_ENABLE == "N") {
                }
            }
            this.ddlSchedIdLst = [];
            this.ddlSchedIdLst.push({ label: "Select One", value: "Select One" });
            for (var i_1 = 0; i_1 < this.scheduleHeader.length; i_1++) {
                this.ddlSchedIdLst.push({ label: this.scheduleHeader[i_1].SCHEDULE_ID, value: this.scheduleHeader[i_1].SCHEDULE_ID });
                //this.parLocProcessScheduleLst[i].SCHEDULE_ID=this.scheduleHeader[i].SCHEDULE_ID;
            }
            if (this.parLocProcessScheduleLst.length > 0) {
                if (this.parLocProcessScheduleLst[0].SCHEDULE_ID != null || this.parLocProcessScheduleLst[0].SCHEDULE_ID != "") {
                    this.selectedInvSchedule = this.parLocProcessScheduleLst[0].SCHEDULE_ID;
                }
            }
            this.ddlReplenishLst = [];
            this.ddlReplenishLst.push({ label: "Select One", value: "-1" });
            this.ddlReplenishLst.push({ label: "POU Inventory", value: "0" });
            this.ddlReplenishLst.push({ label: "Par Locations", value: "1" });
            this.ddlReplenishLst.push({ label: "MMIS", value: "2" });
            this.tab = true;
            this.tabReplenishment = true;
            for (var i = 0; i < this.parLocProcessScheduleLst.length; i++) {
                if (this.parLocProcessScheduleLst[i].SOURCELOCATIONS != undefined && this.parLocProcessScheduleLst[i].SOURCELOCATIONS != null
                    && this.parLocProcessScheduleLst[i].SOURCELOCATIONS != "" && this.parLocProcessScheduleLst[i].SOURCELOCATIONS.length > 0) {
                    this.parLocProcessScheduleLst[i].SOURCELOCATIONS = this.parLocProcessScheduleLst[i].SOURCELOCATIONS.replace(/^,/, '');
                }
            }
            this.parRepProcessScheduleLst = this.parLocProcessScheduleLst;
            //this.spnrService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ProcessParametersComponent.prototype.billing_BindGrid = function (deptSchedules) {
        var _this = this;
        this.statusMsgs = [];
        try {
            var drBilling = [];
            drBilling = linq_es5_1.asEnumerable(this.deptLst).Where(function (x) { return x.BUSINESS_UNIT == _this.parBillProcessScheduleLst[0].ORG_ID &&
                x.DEPARTMENT_ID == _this.parBillProcessScheduleLst[0].ID; }).ToArray();
            var _dr = this.deptLst.filter(function (x) { return x.BUSINESS_UNIT == _this.parBillProcessScheduleLst[0].ORG_ID && x.DEPARTMENT_ID == _this.parBillProcessScheduleLst[0].ID; });
            if (_dr.length > 0) {
                if (_dr[0].BILLING_ENABLE == "N") {
                }
            }
            if (this.parBillProcessScheduleLst[0].REVIEW_CHARGES == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString()) {
                // this.reviewChargesValue = true;
                this.parBillProcessScheduleLst[0].BlnReviewChargeValue = true;
            }
            else {
                // this.reviewChargesValue = false;
                this.parBillProcessScheduleLst[0].BlnReviewChargeValue = false;
            }
            this.ddlBillingSchedIdLst = [];
            this.ddlBillingSchedIdLst.push({ label: "Select One", value: "Select One" });
            for (var i = 0; i < this.scheduleHeader.length; i++) {
                this.ddlBillingSchedIdLst.push({ label: this.scheduleHeader[i].SCHEDULE_ID, value: this.scheduleHeader[i].SCHEDULE_ID });
            }
            if (this.parBillProcessScheduleLst.length > 0) {
                if (this.parBillProcessScheduleLst[0].SCHEDULE_ID != null || this.parBillProcessScheduleLst[0].SCHEDULE_ID != "") {
                    this.selectedInvSchedule = this.parBillProcessScheduleLst[0].SCHEDULE_ID;
                }
            }
            if (this.parBillProcessScheduleLst[0].BILLING_OPTION == 1) {
                this.parBillProcessScheduleLst[0].BILLING_OPTION = 1;
                this.parBillProcessScheduleLst[0].blnBillScheduleId = false;
                this.parBillProcessScheduleLst[0].chkBillOption = false;
            }
            else if (this.parBillProcessScheduleLst[0].BILLING_OPTION == 2) {
                this.parBillProcessScheduleLst[0].BILLING_OPTION = 2;
                this.parBillProcessScheduleLst[0].blnBillScheduleId = true;
                this.parBillProcessScheduleLst[0].chkBillOption = true;
            }
            if (this.parBillProcessScheduleLst[0].CHK_VALUE == true) {
                if ((this.parBillProcessScheduleLst[0].SCHEDULE_ID == null &&
                    this.parBillProcessScheduleLst[0].SCHEDULE_ID == "" &&
                    this.parBillProcessScheduleLst[0].SCHEDULE_ID == "Select One") &&
                    this.parBillProcessScheduleLst[0].blnBillScheduleId == true) {
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select Billing Schedule" });
                    return;
                }
                else if (this.parBillProcessScheduleLst[0].BILLING_OPTION != 1 &&
                    this.parBillProcessScheduleLst[0].BILLING_OPTION != 2) {
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select Billing Option" });
                    return;
                }
            }
            else if (this.parBillProcessScheduleLst[0].CHK_VALUE == false) {
                if ((this.parBillProcessScheduleLst[0].SCHEDULE_ID != null &&
                    this.parBillProcessScheduleLst[0].SCHEDULE_ID != "" &&
                    this.parBillProcessScheduleLst[0].SCHEDULE_ID != "Select One") &&
                    this.parBillProcessScheduleLst[0].blnBillScheduleId == true) {
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select Billing Department" });
                    return;
                }
                else if (this.parBillProcessScheduleLst[0].BILLING_OPTION == 1 ||
                    this.parBillProcessScheduleLst[0].BILLING_OPTION == 2 ||
                    this.parBillProcessScheduleLst[0].BlnReviewChargeValue == true) {
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select Billing Department" });
                    return;
                }
            }
            // this.parBillProcessScheduleLst = this.parLocProcessScheduleLst;
            //}
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ProcessParametersComponent.prototype.alerts_BindGrid = function (deptSchedules) {
        this.statusMsgs = [];
        try {
            if (this.intAppId == AtParEnums_1.EnumApps.Pharmacy) {
            }
            this.ddlBillOnlySchedId = [];
            this.ddlRecallSchedId = [];
            this.ddlExpSchedId = [];
            this.ddlLowStockSchedId = [];
            this.ddlBillOnlySchedId.push({ label: "Select One", value: "Select One" });
            this.ddlRecallSchedId.push({ label: "Select One", value: "Select One" });
            this.ddlExpSchedId.push({ label: "Select One", value: "Select One" });
            this.ddlLowStockSchedId.push({ label: "Select One", value: "Select One" });
            for (var intCnt = 0; intCnt <= this.scheduleHeader.length - 1; intCnt++) {
                this.ddlBillOnlySchedId.push({ label: this.scheduleHeader[intCnt].SCHEDULE_ID, value: this.scheduleHeader[intCnt].SCHEDULE_ID });
                this.ddlRecallSchedId.push({ label: this.scheduleHeader[intCnt].SCHEDULE_ID, value: this.scheduleHeader[intCnt].SCHEDULE_ID });
                this.ddlExpSchedId.push({ label: this.scheduleHeader[intCnt].SCHEDULE_ID, value: this.scheduleHeader[intCnt].SCHEDULE_ID });
                this.ddlLowStockSchedId.push({ label: this.scheduleHeader[intCnt].SCHEDULE_ID, value: this.scheduleHeader[intCnt].SCHEDULE_ID });
            }
            if (this.schdAlerts.length > 0) {
                if (this.schdAlerts[0].LOW_STK_SCHEDULE_ID != null || this.schdAlerts[0].LOW_STK_SCHEDULE_ID != "") {
                    this.selectedLowStockSchedId = this.schdAlerts[0].LOW_STK_SCHEDULE_ID;
                }
            }
            if (this.schdAlerts.length > 0) {
                if (this.schdAlerts[0].EXP_SCHEDULE_ID != null || this.schdAlerts[0].EXP_SCHEDULE_ID != "") {
                    this.selectedExpSchedId = this.schdAlerts[0].EXP_SCHEDULE_ID;
                }
            }
            if (this.schdAlerts.length > 0) {
                if (this.schdAlerts[0].RECALL_SCHEDULE_ID != null || this.schdAlerts[0].RECALL_SCHEDULE_ID != "") {
                    this.selectedRecallSchedId = this.schdAlerts[0].RECALL_SCHEDULE_ID;
                }
            }
            if (this.schdAlerts.length > 0) {
                if (this.schdAlerts[0].BILLONLY_SCHEDULE_ID != null || this.schdAlerts[0].BILLONLY_SCHEDULE_ID != "") {
                    this.selectedBillOnlySchedId = this.schdAlerts[0].BILLONLY_SCHEDULE_ID;
                }
            }
            if (this.schdAlerts.length > 0) {
                this.tabAlert = true;
            }
            this.schdAlerts;
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ProcessParametersComponent.prototype.populateBillingDept = function (tabName) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var data, _strDeptId, strBunit, ex_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.statusMsgs = [];
                        data = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        _strDeptId = "";
                        strBunit = "";
                        if (this.selectedDept.toString().trim() != "Select One") {
                            _strDeptId = this.selectedDept.toString().trim();
                        }
                        if (this.selectedOrgId.toString().trim() != "Select One") {
                            strBunit = this.selectedOrgId.toString().trim();
                        }
                        if (this.deptLst != undefined && this.deptLst.length > 0) {
                            this.deptLst;
                        }
                        if (tabName == "Alerts") {
                            this.deptAlertLst = [];
                        }
                        else if (tabName == "Billing") {
                            this.deptLst = [];
                        }
                        // this.spnrService.start();
                        return [4 /*yield*/, this.processParmService.getAllocDepartment(_strDeptId, strBunit, this.intAppId).
                                catch(this.httpService.handleError).then(function (res) {
                                data = res.json();
                                if (tabName == "Alerts") {
                                    _this.deptAlertLst = data.DataList;
                                    //this.spnrService.stop();
                                }
                                else {
                                    _this.deptLst = data.DataList;
                                }
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.statusMsgs = [];
                                        _this.spnrService.stop();
                                        _this.statusMsgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.statusMsgs = [];
                                        _this.spnrService.stop();
                                        _this.statusMsgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.statusMsgs = [];
                                        _this.spnrService.stop();
                                        _this.statusMsgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        // this.spnrService.start();
                        _a.sent();
                        if (tabName == AtParEnums_1.Process_Type[AtParEnums_1.Process_Type.Alerts].toString()) {
                            //In Alerts tab there in no impact of "Billing is enabled in @Par" dept parameter, so ignoring the statuscode
                            if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.BILNG_NOT_MNGD_IN_ATPAR ||
                                data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            }
                            else if (data.StatusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                return [2 /*return*/, data.StatusCode];
                            }
                            return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK];
                        }
                        else if (tabName == AtParEnums_1.Process_Type[AtParEnums_1.Process_Type.Billing].toString()) {
                            if (data.StatusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                return [2 /*return*/, data.StatusCode];
                            }
                        }
                        return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK];
                    case 3:
                        ex_18 = _a.sent();
                        this.clientErrorMsg(ex_18);
                        //this.spnrService.stop();
                        return [2 /*return*/, data.StatusCode];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProcessParametersComponent.prototype.updateDataset = function () {
        return __awaiter(this, void 0, void 0, function () {
            var statusCode, i;
            return __generator(this, function (_a) {
                this.statusMsgs = [];
                statusCode = 0;
                try {
                    for (i = 0; i < this.parRepProcessScheduleLst.length; i++) {
                        // _intCnt = Convert.ToInt32(_dgItem.Cells(0).Text);
                        //if (this.selectedInvSchedule == "Select One") {
                        //    this.parLocProcessScheduleLst[i].SCHEDULE_ID = "";
                        //} else {
                        //    this.parLocProcessScheduleLst[i].SCHEDULE_ID = this.selectedInvSchedule;
                        //}
                        //if (this.selectedReplenish == "Select One") {
                        //    this.parLocProcessScheduleLst[i].REPLENISH_FROM = -1;
                        //} else {
                        //    this.parLocProcessScheduleLst[i].REPLENISH_FROM = this.selectedReplenish;
                        //}
                        //if (this.parLocProcessScheduleLst[i].CHK_VALUE == true) {
                        //    this.parLocProcessScheduleLst[i].CHK_VALUE = true;
                        //} else {
                        //    this.parLocProcessScheduleLst[i].CHK_VALUE = false;
                        //}
                        this.parRepProcessScheduleLst[i].REVIEW_CHARGES = "";
                        this.parRepProcessScheduleLst[i].PROCESS_TYPE = AtParEnums_1.Process_Type.Replenishment;
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex);
                    return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                }
                return [2 /*return*/, statusCode];
            });
        });
    };
    ProcessParametersComponent.prototype.billing_UpdatedLst = function () {
        return __awaiter(this, void 0, void 0, function () {
            var statusCode, intCnt, i;
            return __generator(this, function (_a) {
                statusCode = 0;
                this.statusMsgs = [];
                try {
                    intCnt = 0;
                    for (i = 0; i < this.parLocProcessScheduleLst.length; i++) {
                        if (this.parLocProcessScheduleLst[i].BlnReviewChargeValue == true) {
                            this.parLocProcessScheduleLst[i].REVIEW_CHARGES = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString();
                        }
                        else {
                            this.parLocProcessScheduleLst[i].REVIEW_CHARGES = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
                        }
                        if ((this.parLocProcessScheduleLst[i].SCHEDULE_ID == "Select One" ||
                            this.parLocProcessScheduleLst[i].SCHEDULE_ID == "") || this.parLocProcessScheduleLst[i].BILLING_OPTION != 2) {
                            this.parLocProcessScheduleLst[i].SCHEDULE_ID = "";
                        }
                        else {
                            this.parLocProcessScheduleLst[i].SCHEDULE_ID = this.parLocProcessScheduleLst[i].SCHEDULE_ID;
                        }
                        if (this.parLocProcessScheduleLst[i].BILLING_OPTION != 1 &&
                            this.parLocProcessScheduleLst[i].BILLING_OPTION != 2) {
                            this.parLocProcessScheduleLst[i].BILLING_OPTION = 5;
                        }
                        this.parLocProcessScheduleLst[i].PROCESS_TYPE = AtParEnums_1.Process_Type.Billing;
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex);
                    return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                }
                return [2 /*return*/, statusCode];
            });
        });
    };
    ProcessParametersComponent.prototype.updateAlertDataset = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.statusMsgs = [];
                try {
                }
                catch (ex) {
                    this.clientErrorMsg(ex);
                }
                return [2 /*return*/];
            });
        });
    };
    ProcessParametersComponent.prototype.clearFields = function () {
        try {
            this.selectedOrgId = "";
            //this.selectedDept = "";
            this.selectedDept = "";
            this.txtCartId = "";
            this.tab = false;
            this.blnEnable = false;
            this.tabReplenishment = false;
            this.tabBilling = false;
            this.tabAlert = false;
            this.ddlDeptLst = [];
            this.ddlDeptLst.push({ label: "Select One", value: "Select One" });
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ProcessParametersComponent.prototype.updateLocations = function () {
        try {
            this.statusMsgs = [];
            for (var i = 0; i < this.assignLocationLst.length; i++) {
                if (this.assignLocationLst[i].CHK_VALUE == "true") {
                    this.assignLocationLst[i].CHK_VALUE = 1;
                }
                else {
                    this.assignLocationLst[i].CHK_VALUE = 0;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ProcessParametersComponent.prototype.bindDataGrid = function () {
        this.statusMsgs = [];
        try {
            if (this.ddlDisplaySelectValue == "ALLOC") {
                this.assignLocationLst = linq_es5_1.asEnumerable(this.assignLocationLst).Where(function (a) { return a.CHK_VALUE == 1; }).Select(function (a) { return a; }).ToArray();
            }
            else if (this.ddlDisplaySelectValue == "UA") {
                this.assignLocationLst = linq_es5_1.asEnumerable(this.assignLocationLst).Where(function (a) { return a.CHK_VALUE == 0; }).Select(function (a) { return a; }).ToArray();
            }
            else {
                this.assignLocationLst = linq_es5_1.asEnumerable(this.assignLocationLst).OrderBy(function (a) { return a.CHK_VALUE == 1; }).ToArray().reverse();
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ProcessParametersComponent.prototype.setValues = function () {
        this.statusMsgs = [];
        this.table = false;
        this.ddlDisplaySelectValue = "ALL";
        this.ddlSelectedAsgnLocOrgId = "Select Org Id";
        this.txtLocation = "";
    };
    ProcessParametersComponent.prototype.clientErrorMsg = function (strExMsg) {
        this.statusMsgs = [];
        this.atParConstant.catchClientError(this.statusMsgs, this.spnrService, strExMsg.toString());
    };
    ProcessParametersComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.statusMsgs = null;
        this.orgIdLstData = null;
        this.assignLocationOrgIdLst = null;
        this.deptCartLst = null;
        this.deptLst = null;
        this.replenSourecLocationLst = null;
        this.parLocationSearchLst = null;
        this.parLocProcessScheduleLst = null;
        this.schdAlerts = null;
        this.scheduleHeader = null;
        this.assignLocationLst = null;
        this.srcLocationsOnLoad = null;
        this.lstgridfilterData = null;
        this.lstschdalertsgridfilterData = null;
        this.lstAssignLocfilterData = null;
        this.dtAllocTable = null;
        this.dtUnAllocTable = null;
        this.dsTemp = null;
        this.dsLocDetailsDeleted = null;
        this.assingnLocations = null;
        this.parBillProcessScheduleLst = [];
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ProcessParametersComponent.prototype, "appId", void 0);
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], ProcessParametersComponent.prototype, "dataTableComponent", void 0);
    ProcessParametersComponent = __decorate([
        core_1.Component({
            selector: 'pou-process-parameters',
            templateUrl: 'pou-process-parameters.component.html',
            providers: [AtParConstants_1.AtParConstants, atpar_common_service_1.AtParCommonService, pou_process_parameters_service_1.ProcessParametersService, api_1.ConfirmationService]
        }),
        __metadata("design:paramtypes", [event_spinner_service_1.SpinnerService,
            HttpService_1.HttpService,
            AtParConstants_1.AtParConstants,
            atpar_common_service_1.AtParCommonService,
            pou_process_parameters_service_1.ProcessParametersService, api_1.ConfirmationService])
    ], ProcessParametersComponent);
    return ProcessParametersComponent;
}());
exports.ProcessParametersComponent = ProcessParametersComponent;
//# sourceMappingURL=pou-process-parameters.component.js.map