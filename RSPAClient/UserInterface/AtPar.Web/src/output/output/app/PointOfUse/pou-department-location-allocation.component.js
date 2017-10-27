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
var leftbar_animation_service_1 = require("../Home/leftbar-animation.service");
var router_1 = require("@angular/router");
var HttpService_1 = require("../Shared/HttpService");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var datatable_1 = require("../components/datatable/datatable");
var pou_department_location_allocation_service_1 = require("./pou-department-location-allocation.service");
var AtParEnums_1 = require("../Shared/AtParEnums");
var linq_es5_1 = require("linq-es5");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var DepartmentLocationAllocationComponent = (function () {
    /**
     * Constructor
     * @param leftBarAnimationservice
     * @param router
     * @param pouDeptLocationService
     * @param httpService
     * @param spinnerService
     * @param atParConstant
     * @param commonService
     */
    function DepartmentLocationAllocationComponent(leftBarAnimationservice, router, pouDeptLocationService, httpService, spinnerService, atParConstant, commonService) {
        this.leftBarAnimationservice = leftBarAnimationservice;
        this.router = router;
        this.pouDeptLocationService = pouDeptLocationService;
        this.httpService = httpService;
        this.spinnerService = spinnerService;
        this.atParConstant = atParConstant;
        this.commonService = commonService;
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.lstOrgGroups = [];
        this.lstBUnits = [];
        this.lstFilteredBUnits = [];
        this.blnShowOrgGroupLabel = false;
        this.blnShowOrgGroupDD = false;
        this.orgGrpId = "";
        this.orgGrpDesc = "";
        this.ven = [];
        this.lstDeptData = [];
        this.pageHeader = '';
        this.lstLocType = [];
        this.lstSearch = [];
        this.orgGroupIDForDBUpdate = "";
        this.blnStatusMsg = false;
        this.lstDeptLocation = [];
        this.dataCheckedSorting = [];
        this.hdnSelOrgGrpId = "";
        this.selectedOrgGroupId = "";
        this.selectedLocationType = "";
        this.selectedBunit = "";
        this.locationType = "";
        this.selectedDeptID = "";
        this.selectedSearch = "";
        this.lstLength = "";
        this.showGrid = false;
        this.blnSortByColumn = true;
        this.custom = "custom";
        this.pop = false;
        this.page = true;
        this.bstUnits = false;
    }
    /**
  * Init Function for getting all the schedule data and org group data when page load
  */
    DepartmentLocationAllocationComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                    this.intAppID = (this.appId);
                    this.lstDeptData = [];
                    this.lstLocType.push({ label: 'Select Loc Type', value: '' }, { label: 'Inventory', value: 'I' }, { label: 'Par', value: 'P' });
                    this.lstSearch.push({ label: 'All', value: '0' }, { label: 'Allocated', value: '1' }, { label: 'Unallocated', value: '2' });
                    this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                    this.selectedSearch = '0';
                    this.lstCheckedBUnits = new Array();
                    if (isNaN(this.intAppID)) {
                        this.pageHeader = "PointOfUse";
                        this.intAppID = AtParEnums_1.EnumApps.PointOfUse;
                    }
                    else {
                        if (this.intAppID != AtParEnums_1.EnumApps.PointOfUse) {
                            this.pageHeader = "ATPARX";
                        }
                        else {
                            this.pageHeader = "PointOfUse";
                        }
                    }
                    this.bindOrgGroups();
                }
                catch (ex) {
                    this.displayCatchException(ex, "ngOnInit");
                }
                return [2 /*return*/];
            });
        });
    };
    /**
    redirecting to home when click on breadcrumbs
    */
    DepartmentLocationAllocationComponent.prototype.homeurl = function () {
        this.leftBarAnimationservice.isHomeClicked = false;
        this.leftBarAnimationservice.isHide();
        this.router.navigate(['atpar']);
    };
    /**
     * Getting Org Group Data at page Load
     */
    DepartmentLocationAllocationComponent.prototype.bindOrgGroups = function () {
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
                        return [4 /*yield*/, this.commonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.growlMessage = [];
                                        _this.spinnerService.stop();
                                        _this.orgGroupData = data.DataList;
                                        _this.blnStatusMsg = false;
                                        if (_this.orgGroupData.length == 1) {
                                            _this.blnShowOrgGroupLabel = true;
                                            _this.orgGrpId = _this.orgGroupData[0].ORG_GROUP_ID + ' - ' + _this.orgGroupData[0].ORG_GROUP_NAME;
                                            _this.orgGrpDesc = _this.orgGroupData[0].ORG_GROUP_ID;
                                            _this.populateBusinessUnits();
                                            _this.populateDepts();
                                        }
                                        else if (_this.orgGroupData.length > 1) {
                                            _this.blnShowOrgGroupDD = true;
                                            _this.lstFilteredBUnits = [];
                                            _this.lstDept = [];
                                            _this.lstOrgGroups.push({ label: "Select One", value: "Select One" });
                                            _this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                            _this.lstDept.push({ label: "Select Department", value: "Select Department" });
                                            for (var i = 0; i < _this.orgGroupData.length; i++) {
                                                if (_this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                                    _this.lstOrgGroups.push({ label: _this.orgGroupData[i].ORG_GROUP_ID + ' - ' + _this.orgGroupData[i].ORG_GROUP_NAME, value: _this.orgGroupData[i].ORG_GROUP_ID });
                                                }
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage = [];
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
                        this.displayCatchException(ex_1, "bindOrgGroups");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * Getting Business Units at page Load
    */
    DepartmentLocationAllocationComponent.prototype.populateBusinessUnits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var isOrgBUnitsExist, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        isOrgBUnitsExist = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpDesc;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        this.lstFilteredBUnits = [];
                        this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                        this.spinnerService.start();
                        return [4 /*yield*/, this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, AtParEnums_1.BusinessType.Inventory).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS) {
                                    _this.spinnerService.stop();
                                    _this.growlMessage = [];
                                    _this.bstUnits = true;
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Assigned Org Business Units' });
                                    _this.pop = false;
                                    return;
                                }
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        var lstFilteredBUnitsTest = data.DataList;
                                        if (lstFilteredBUnitsTest != null) {
                                            if (lstFilteredBUnitsTest.length > 0) {
                                                for (var i = 0; i < lstFilteredBUnitsTest.length; i++) {
                                                    _this.lstFilteredBUnits.push({ label: lstFilteredBUnitsTest[i], value: lstFilteredBUnitsTest[i] });
                                                }
                                            }
                                        }
                                        _this.spinnerService.stop();
                                        isOrgBUnitsExist = true;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        _this.spinnerService.stop();
                                        _this.pop = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.spinnerService.stop();
                                        _this.pop = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage = [];
                                        _this.spinnerService.stop();
                                        _this.pop = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, Promise.resolve(isOrgBUnitsExist)];
                    case 3:
                        ex_2 = _a.sent();
                        this.displayCatchException(ex_2, "populateBusinessUnits");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * Getting Departments at page Load
    */
    DepartmentLocationAllocationComponent.prototype.populateDepts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var isDeptExixt, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isDeptExixt = false;
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpDesc;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        this.lstDept = [];
                        this.growlMessage = [];
                        this.lstDept.push({ label: "Select Department", value: "Select Department" });
                        if (this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select OrgGrpID" || this.orgGroupIDForDBUpdate == undefined) {
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: 'warn', detail: "Please Select Org Group ID" });
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.pouDeptLocationService.getUserDepartments(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.orgGroupIDForDBUpdate).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                    if (_this.bstUnits == true) {
                                        return;
                                    }
                                    else {
                                        _this.growlMessage = [];
                                        _this.spinnerService.stop();
                                        _this.bstUnits = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Department(s) Allocated To User' });
                                        return;
                                    }
                                }
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        for (var i = 0; i < data.DataList.length; i++) {
                                            _this.lstDept.push({
                                                label: data.DataList[i].DEPARTMENT_ID + '-' + data.DataList[i].DEPT_NAME,
                                                value: data.DataList[i].DEPARTMENT_ID
                                            });
                                        }
                                        isDeptExixt = true;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        isDeptExixt = false;
                                        _this.selectedBunit = "";
                                        _this.selectedDeptID = "";
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.selectedBunit = "";
                                        _this.selectedDeptID = "";
                                        isDeptExixt = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.selectedBunit = "";
                                        _this.selectedDeptID = "";
                                        isDeptExixt = false;
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, Promise.resolve(isDeptExixt)];
                    case 3:
                        ex_3 = _a.sent();
                        this.displayCatchException(ex_3, "populateDepts");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * getting allocated locations when go button clicks
     */
    DepartmentLocationAllocationComponent.prototype.getDeptLocationDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstGridFilterData = null;
                        this.spinnerService.start();
                        if (this.dataTableComponent != null) {
                            this.dataTableComponent.reset();
                        }
                        this.growlMessage = [];
                        this.pop = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        if (this.blnShowOrgGroupLabel == true) {
                            this.orgGroupIDForDBUpdate = this.orgGrpDesc;
                        }
                        else {
                            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                        }
                        if (!((this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == undefined || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select One") && this.blnShowOrgGroupDD)) return [3 /*break*/, 2];
                        this.growlMessage = [];
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                        return [2 /*return*/];
                    case 2:
                        if (!(this.selectedDeptID == "Select Department" || this.selectedDeptID == undefined || this.selectedDeptID == "")) return [3 /*break*/, 3];
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Select Department' });
                        this.spinnerService.stop();
                        this.pop = false;
                        return [2 /*return*/];
                    case 3:
                        if (!(this.selectedLocationType == "Select Loc Type" || this.selectedLocationType == undefined || this.selectedLocationType == "")) return [3 /*break*/, 4];
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Select Location Type' });
                        this.spinnerService.stop();
                        this.pop = false;
                        return [2 /*return*/];
                    case 4:
                        this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID] = this.orgGroupIDForDBUpdate;
                        return [4 /*yield*/, this.pouDeptLocationService.getDeptCartAllocationDetails(this.selectedBunit, this.locationType, this.selectedSearch, this.selectedLocationType).catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.lstDeptLocation = [];
                                _this.lstLength = "";
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                    _this.spinnerService.stop();
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Records Found' });
                                    _this.pop = false;
                                    return;
                                }
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR) {
                                    _this.spinnerService.stop();
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Failed To Get Data' });
                                    _this.pop = false;
                                    return;
                                }
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS) {
                                    _this.spinnerService.stop();
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Assigned Org Business Units' });
                                    _this.pop = false;
                                    return;
                                }
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_REMOTEERROR) {
                                    _this.spinnerService.stop();
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Remote server error' });
                                    _this.pop = false;
                                    return;
                                }
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstDeptLocation = data.DataVariable["m_Item1"];
                                        _this.lstAllocatedCarts = data.DataVariable["m_Item2"];
                                        if (_this.lstDeptLocation != null && _this.lstDeptLocation.length > 0) {
                                            _this.pop = true;
                                            for (var i = 0; i < _this.lstDeptLocation.length; i++) {
                                                var assignedDept = "";
                                                if (_this.lstDeptLocation[i].ASSIGN_CART == 'Y') {
                                                    _this.lstDeptLocation[i].CHECKED = true;
                                                }
                                                else {
                                                    _this.lstDeptLocation[i].CHECKED = false;
                                                }
                                            }
                                            _this.bindDataGrid();
                                            _this.lstLength = _this.lstDeptLocation.length + " Record(s) found";
                                        }
                                        else {
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                                            _this.pop = false;
                                        }
                                        if (_this.lstDeptLocation.length <= 0) {
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                                            _this.pop = false;
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.selectedBunit = "";
                                        _this.selectedDeptID = "";
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.selectedBunit = "";
                                        _this.selectedDeptID = "";
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.selectedBunit = "";
                                        _this.selectedDeptID = "";
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        ex_4 = _a.sent();
                        this.displayCatchException(ex_4, "getDeptLocationDetails");
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This function is for binding data to datatable
     */
    DepartmentLocationAllocationComponent.prototype.bindDataGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var lstDBDataList, i;
            return __generator(this, function (_a) {
                this.dataCheckedSorting = [];
                this.dataUncheckedSorting = [];
                for (i = 0; i <= this.lstDeptLocation.length - 1; i++) {
                    if (this.lstDeptLocation[i].CHECKED == true) {
                        this.dataCheckedSorting.push(this.lstDeptLocation[i]);
                    }
                    else {
                        this.dataUncheckedSorting.push(this.lstDeptLocation[i]);
                    }
                }
                this.showGrid = true;
                this.spinnerService.stop();
                return [2 /*return*/];
            });
        });
    };
    /**
    * This function is used for filtering data in datatable
    * @param event
    */
    DepartmentLocationAllocationComponent.prototype.filterData = function (event) {
        this.lstGridFilterData = [];
        this.lstGridFilterData = new Array();
        this.lstGridFilterData = event;
    };
    /**
   * This function is Change event for OrgGroup ID
   */
    DepartmentLocationAllocationComponent.prototype.ddlOrgGrpIdChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        this.hdnSelOrgGrpId = this.selectedOrgGroupId;
                        this.selectedDeptID = '';
                        if (this.selectedOrgGroupId == "Select One") {
                            this.lstDept = [];
                            this.lstDept.push({ label: "Select BUnit", value: "" });
                            return [2 /*return*/];
                        }
                        this.lstDeptLocation = new Array();
                        this.spinnerService.start();
                        this.lstDept = [];
                        this.lstDept.push({ label: "Select Department", value: "" });
                        return [4 /*yield*/, this.populateDepts()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.populateBusinessUnits()];
                    case 2:
                        _a.sent();
                        this.spinnerService.stop();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_5 = _a.sent();
                        this.displayCatchException(ex_5, "ddlOrgGrpIdChanged");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DepartmentLocationAllocationComponent.prototype.ddl_Change = function () {
        this.pop = false;
    };
    /**

    * This event is called when we check or uncheck the swicth component
    * @param values
    * @param event
    */
    DepartmentLocationAllocationComponent.prototype.selectedRow = function (values, event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.growlMessage = [];
                    this.lstCheckedBUnits = [];
                    if (event == true) {
                        values.CHECKED = true;
                        values.ASSIGN_CART = 'Y';
                    }
                    else {
                        values.CHECKED = false;
                        values.ASSIGN_CART = 'N';
                    }
                    this.lstCheckedBUnits.push(values);
                    this.maintainState();
                }
                catch (ex) {
                    this.displayCatchException(ex, "selectedRow");
                }
                return [2 /*return*/];
            });
        });
    };
    /**
   * check all the switches
   */
    DepartmentLocationAllocationComponent.prototype.checkAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, i;
            return __generator(this, function (_a) {
                try {
                    this.lstCheckedBUnits = [];
                    this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                    this.endIndex = +sessionStorage.getItem("RecordsEndindex");
                    if (this.lstGridFilterData != null && this.lstGridFilterData != undefined && this.lstGridFilterData.length > 0) {
                        if (this.endIndex > this.lstGridFilterData.length) {
                            this.endIndex = this.lstGridFilterData.length;
                        }
                        for (i = this.startIndex; i <= this.endIndex - 1; i++) {
                            if (this.lstDeptLocation[i].DEPT_ID == this.selectedDeptID || this.lstDeptLocation[i].DEPT_ID == "") {
                                this.lstGridFilterData[i].ASSIGN_CART = 'Y';
                                this.lstGridFilterData[i].CHECKED = true;
                                this.lstCheckedBUnits.push(this.lstGridFilterData[i]);
                            }
                        }
                    }
                    else {
                        if (this.endIndex > this.lstDeptLocation.length) {
                            this.endIndex = this.lstDeptLocation.length;
                        }
                        for (i = this.startIndex; i <= this.endIndex - 1; i++) {
                            if (this.lstDeptLocation[i].DEPT_ID == this.selectedDeptID || this.lstDeptLocation[i].DEPT_ID == "") {
                                this.lstDeptLocation[i].ASSIGN_CART = 'Y';
                                this.lstDeptLocation[i].CHECKED = true;
                                this.lstCheckedBUnits.push(this.lstDeptLocation[i]);
                            }
                        }
                    }
                    this.maintainState();
                }
                catch (ex) {
                    this.displayCatchException(ex, "checkAll");
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Uncheck all the switches
     */
    DepartmentLocationAllocationComponent.prototype.unCheckAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, i;
            return __generator(this, function (_a) {
                try {
                    this.lstCheckedBUnits = [];
                    this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                    this.endIndex = +sessionStorage.getItem("RecordsEndindex");
                    if (this.lstGridFilterData != null && this.lstGridFilterData != undefined && this.lstGridFilterData.length > 0) {
                        if (this.endIndex > this.lstGridFilterData.length) {
                            this.endIndex = this.lstGridFilterData.length;
                        }
                        for (i = this.endIndex - 1; i >= this.startIndex; i--) {
                            if (this.lstDeptLocation[i].DEPT_ID == this.selectedDeptID || this.lstDeptLocation[i].DEPT_ID == "") {
                                this.lstGridFilterData[i].ASSIGN_CART = 'N';
                                this.lstGridFilterData[i].CHECKED = false;
                                this.lstCheckedBUnits.push(this.lstGridFilterData[i]);
                            }
                        }
                    }
                    else {
                        if (this.endIndex > this.lstDeptLocation.length) {
                            this.endIndex = this.lstDeptLocation.length;
                        }
                        for (i = this.endIndex - 1; i >= this.startIndex; i--) {
                            if (this.lstDeptLocation[i].DEPT_ID == this.selectedDeptID || this.lstDeptLocation[i].DEPT_ID == "") {
                                this.lstDeptLocation[i].ASSIGN_CART = 'N';
                                this.lstDeptLocation[i].CHECKED = false;
                                this.lstCheckedBUnits.push(this.lstDeptLocation[i]);
                            }
                        }
                    }
                }
                catch (ex) {
                    this.displayCatchException(ex, "unCheckAll");
                }
                return [2 /*return*/];
            });
        });
    };
    /**
   * This function  is used for Custom sorting in data table for all columns
   * @param event
   */
    DepartmentLocationAllocationComponent.prototype.customSort = function (event) {
        try {
            var element = event;
            this.lstDeptLocation = [];
            this.blnSortByColumn = !this.blnSortByColumn;
            this.sortedCheckedRec = [];
            this.sortedUncheckedRec = [];
            this.sortedCheckedRec = this.dataCheckedSorting.sort(function (a, b) {
                if (a[element.field] < b[element.field])
                    return -1;
                if (a[element.field] > b[element.field])
                    return 1;
                return 0;
            });
            this.sortedUncheckedRec = this.dataUncheckedSorting.sort(function (a, b) {
                if (a[element.field] < b[element.field])
                    return -1;
                if (a[element.field] > b[element.field])
                    return 1;
                return 0;
            });
            if (this.blnSortByColumn == false) {
                this.lstDeptLocation = [];
                if (this.selectedSearch == '0') {
                    this.lstDeptLocation = this.sortedCheckedRec.reverse().concat(this.sortedUncheckedRec.reverse());
                }
                else if (this.selectedSearch == '1') {
                    this.lstDeptLocation = this.sortedCheckedRec.reverse();
                }
                else if (this.selectedSearch == '2') {
                    this.lstDeptLocation = this.sortedUncheckedRec.reverse();
                }
            }
            else {
                this.lstDeptLocation = [];
                if (this.selectedSearch == '0') {
                    this.lstDeptLocation = this.sortedCheckedRec.concat(this.sortedUncheckedRec);
                }
                else if (this.selectedSearch == '1') {
                    this.lstDeptLocation = this.sortedCheckedRec;
                }
                else if (this.selectedSearch == '2') {
                    this.lstDeptLocation = this.sortedUncheckedRec;
                }
            }
            this.sortedCheckedRec = [];
            this.sortedUncheckedRec = [];
        }
        catch (ex) {
            this.displayCatchException(ex, "customSort");
        }
    };
    /**
     * Updating Events
     */
    DepartmentLocationAllocationComponent.prototype.updateEvents = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var lstdsCarts, lstdvData_1, lstdtCarts, lstdtSendTable, lstFilteredData, lstdsEventDetails, i, i, filteredIndex;
            return __generator(this, function (_a) {
                try {
                    lstdsCarts = [];
                    lstdvData_1 = [];
                    lstdtCarts = [];
                    lstdtSendTable = [];
                    this.spinnerService.start();
                    if (this.blnShowOrgGroupLabel == true) {
                        this.orgGroupIDForDBUpdate = this.orgGrpDesc;
                    }
                    else {
                        this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                    }
                    this.maintainState();
                    lstFilteredData = [];
                    lstdsEventDetails = [];
                    lstFilteredData = [];
                    lstdvData_1 = this.lstAllocatedCarts.filter(function (a) { return a.DEPARTMENT_ID === _this.selectedDeptID.toString(); });
                    for (i = 0; i < this.lstDeptLocation.length; i++) {
                        if (this.lstDeptLocation[i].ASSIGN_CART == 'Y' && this.lstDeptLocation[i].DEPT_ID == this.selectedDeptID) {
                            lstdsEventDetails.push({ CART_ID: this.lstDeptLocation[i].LOCATION, BUSINESS_UNIT: this.lstDeptLocation[i].BUSINESS_UNIT, DEPARTMENT_ID: this.selectedDeptID, LOCATION_TYPE: this.lstDeptLocation[i].LOCATION_TYPE });
                        }
                    }
                    for (i = 0; i < lstdvData_1.length; i++) {
                        if (lstdvData_1[i].FLAG == 'I' && lstdvData_1[i].DEPARTMENT_ID == this.selectedDeptID) {
                            if (lstdsEventDetails.length > 0) {
                                filteredIndex = lstdsEventDetails.filter(function (a) { return a.CART_ID === lstdvData_1[i].CART_ID.toString() && a.BUSINESS_UNIT === lstdvData_1[i].BUSINESS_UNIT.toString() && a.DEPARTMENT_ID === lstdvData_1[i].DEPARTMENT_ID.toString() && a.LOCATION_TYPE === lstdvData_1[i].LOCATION_TYPE.toString(); });
                                if (filteredIndex.length <= 0) {
                                    lstdsEventDetails.push({ CART_ID: lstdvData_1[i].CART_ID, BUSINESS_UNIT: lstdvData_1[i].BUSINESS_UNIT, DEPARTMENT_ID: lstdvData_1[i].DEPARTMENT_ID, LOCATION_TYPE: lstdvData_1[i].LOCATION_TYPE });
                                }
                            }
                            else {
                                lstdsEventDetails.push({ CART_ID: lstdvData_1[i].CART_ID, BUSINESS_UNIT: lstdvData_1[i].BUSINESS_UNIT, DEPARTMENT_ID: lstdvData_1[i].DEPARTMENT_ID, LOCATION_TYPE: lstdvData_1[i].LOCATION_TYPE });
                            }
                        }
                    }
                    this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID] = this.orgGroupIDForDBUpdate;
                    if (lstdsEventDetails.length == 0) {
                        lstdsEventDetails.push({ CART_ID: '', BUSINESS_UNIT: '', DEPARTMENT_ID: '', LOCATION_TYPE: '' });
                    }
                    if (lstdsEventDetails.length > 0) {
                        this.growlMessage = [];
                        this.pouDeptLocationService.updateEvents(lstdsEventDetails, this.selectedDeptID, this.orgGroupIDForDBUpdate, this.intAppID)
                            .subscribe(function (response) {
                            switch (response.StatType) {
                                case AtParEnums_1.StatusType.Success: {
                                    _this.spinnerService.stop();
                                    _this.showGrid = false;
                                    _this.selectedDeptID = '';
                                    _this.selectedLocationType = '';
                                    _this.selectedBunit = '';
                                    _this.selectedSearch = '0';
                                    _this.pop = false;
                                    _this.locationType = "";
                                    _this.lstAllocatedCarts = [];
                                    _this.lstDeptLocation = [];
                                    _this.lstCheckedBUnits = [];
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Saved Successfully...' });
                                    break;
                                }
                                case AtParEnums_1.StatusType.Warn: {
                                    _this.spinnerService.stop();
                                    if (response.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                        for (var i = 0; i < _this.lstCheckedBUnits.length; i++) {
                                            _this.lstCheckedBUnits[i].CHECKED = false;
                                            var lst = _this.lstDeptLocation.filter(function (x) { return x.BUSINESS_UNIT == _this.lstCheckedBUnits[i].BUSINESS_UNIT && x.LOCATION == _this.lstCheckedBUnits[i].LOCATION && x.LOCATION_TYPE == _this.lstCheckedBUnits[i].LOCATION_TYPE; });
                                            if (lst != null && lst.length > 0) {
                                                lst[0].CHECKED = false;
                                            }
                                        }
                                        _this.growlMessage = [];
                                        _this.lstDeptLocation = linq_es5_1.asEnumerable(_this.lstDeptLocation).OrderBy(function (a) { return a.CHECKED == false; }).ThenByDescending(function (a) { return a.BUSINESS_UNIT; }).ToArray();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Locations allocated to workstation, cannot be unallocated' });
                                    }
                                    else {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                    }
                                    break;
                                }
                                case AtParEnums_1.StatusType.Error: {
                                    _this.spinnerService.stop();
                                    _this.pop = false;
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                    break;
                                }
                                case AtParEnums_1.StatusType.Custom: {
                                    _this.spinnerService.stop();
                                    _this.pop = false;
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                    break;
                                }
                            }
                        });
                    }
                }
                catch (ex) {
                    this.displayCatchException(ex, "updateEvents");
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * This function is for assiging department for allocating locations and removing data from unallocated data
     */
    DepartmentLocationAllocationComponent.prototype.maintainState = function () {
        return __awaiter(this, void 0, void 0, function () {
            var strCartID, strBUnit, strDept, blnCarts, blnWKS, strLocType, i, intCnt, _with1, lstFilteresList;
            return __generator(this, function (_a) {
                this.lstCheckedBUnits;
                strLocType = "";
                for (i = 0; i < this.lstCheckedBUnits.length; i++) {
                    strCartID = this.lstCheckedBUnits[i].LOCATION;
                    strBUnit = this.lstCheckedBUnits[i].BUSINESS_UNIT;
                    strDept = this.selectedDeptID;
                    strLocType = this.lstCheckedBUnits[i].LOCATION_TYPE;
                    for (intCnt = 0; intCnt < this.lstDeptLocation.length; intCnt++) {
                        _with1 = this.lstDeptLocation[intCnt];
                        if (_with1.LOCATION == strCartID && _with1.BUSINESS_UNIT == strBUnit && _with1.LOCATION_TYPE == strLocType) {
                            _with1.ASSIGN_CART = _with1.CHECKED ? AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y].toString() : AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N].toString();
                            if ((_with1.DEPT_ID == this.selectedDeptID || _with1.DEPT_ID == '') && _with1.CHECKED == true) {
                                _with1.DEPT_ID = this.selectedDeptID;
                            }
                        }
                    }
                    if (this.lstCheckedBUnits[i].CHECKED == false) {
                        lstFilteresList = this.lstAllocatedCarts.filter(function (a) { return a.CART_ID === strCartID.toString() && a.BUSINESS_UNIT === strBUnit.toString() && a.DEPARTMENT_ID === strDept.toString() && a.LOCATION_TYPE === strLocType.toString(); });
                        if (lstFilteresList.length > 0) {
                            lstFilteresList[0].FLAG = 'D';
                        }
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    /**
    * This method is for display error message
    */
    DepartmentLocationAllocationComponent.prototype.displayCatchException = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    /**
     * delete all the values from variables
     */
    DepartmentLocationAllocationComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.spinnerService.stop();
        this.spinnerService = null;
        this.lstDeptData = [];
        this.ven = [];
        this.recordsPerPageSize = 0;
        this.intAppID = 0;
        this.mode = null;
        this.blnSortByColumn = true;
        this.lstCheckedBUnits = [];
        this.lstDeptLocation = [];
        this.lstGridFilterData = [];
        this.lstAllocatedCarts = [];
        this.selectedOrgGroupId = "";
        this.selectedLocationType = "";
        this.selectedBunit = "";
        this.locationType = "";
        this.selectedDeptID = "";
        this.selectedSearch = "";
        this.pop = false;
        this.page = true;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DepartmentLocationAllocationComponent.prototype, "appId", void 0);
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], DepartmentLocationAllocationComponent.prototype, "dataTableComponent", void 0);
    DepartmentLocationAllocationComponent = __decorate([
        core_1.Component({
            selector: 'pou-department-location-allocation',
            templateUrl: 'pou-department-location-allocation.component.html',
            providers: [AtParConstants_1.AtParConstants, atpar_common_service_1.AtParCommonService, pou_department_location_allocation_service_1.POUDeptLocationAllocateService]
        }),
        __metadata("design:paramtypes", [leftbar_animation_service_1.LeftBarAnimationService,
            router_1.Router,
            pou_department_location_allocation_service_1.POUDeptLocationAllocateService,
            HttpService_1.HttpService,
            event_spinner_service_1.SpinnerService,
            AtParConstants_1.AtParConstants,
            atpar_common_service_1.AtParCommonService])
    ], DepartmentLocationAllocationComponent);
    return DepartmentLocationAllocationComponent;
}());
exports.DepartmentLocationAllocationComponent = DepartmentLocationAllocationComponent;
//# sourceMappingURL=pou-department-location-allocation.component.js.map