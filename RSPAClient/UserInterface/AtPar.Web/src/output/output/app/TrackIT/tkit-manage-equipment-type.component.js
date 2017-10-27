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
var employee_1 = require("../components/datatable/employee");
var TKIT_ITEM_TYPE_1 = require("../Entities/TKIT_ITEM_TYPE");
var tkit_manage_equipment_type_service_1 = require("./tkit-manage-equipment-type.service");
var AtParEnums_1 = require("../Shared/AtParEnums");
var HttpService_1 = require("../Shared/HttpService");
var AtParWebApiResponse_1 = require("../Shared/AtParWebApiResponse");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var datatable_1 = require("../components/datatable/datatable");
var routepath_1 = require("../AtPar/Menus/routepath");
var leftbar_animation_service_1 = require("../Home/leftbar-animation.service");
var linq_es5_1 = require("linq-es5");
var ManageEquipmentTypeComponent = (function () {
    function ManageEquipmentTypeComponent(dataservice, mngEqTypeService, httpService, spinnerService, commonService, atParConstant, leftBarAnimationService) {
        this.dataservice = dataservice;
        this.mngEqTypeService = mngEqTypeService;
        this.httpService = httpService;
        this.spinnerService = spinnerService;
        this.commonService = commonService;
        this.atParConstant = atParConstant;
        this.leftBarAnimationService = leftBarAnimationService;
        this.equipmentIDSearch = "";
        this.showAddButton = true;
        this.pop = false;
        this.table = true;
        this.form = false;
        this.editform = false;
        this.Title = "";
        this.bindSymbal = "";
        this.loading = true;
        this.minDateValue1 = new Date();
        this.showTextBox = false;
        this.showLable = false;
        this.departmentID = "";
        this.newItem = new TKIT_ITEM_TYPE_1.TKIT_ITEM_TYPE();
        this.growlMessage = [];
        this._deviceTokenEntry = [];
        this.auditSatus = "";
        this.checkvalue = false;
        this.lstOrgGroups = [];
        this.blnShowOrgGroupLabel = false;
        this.blnShowOrgGroupDD = false;
        this.orgGrpId = "";
        this.selectedOrgGroupId = "";
        this.selectedIndicator = "";
        this.equipmentType = "";
        this.showEquipmentTypelbl = false;
        this.showIndicatorlbl = false;
        this.Indicator = "";
        this.blnSortByColumn = true;
        this.preField = "";
        this.ven = new employee_1.Employee();
        this.departmentID = "dept1";
        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    ManageEquipmentTypeComponent.prototype.fillIndicatorDD = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        this.growlMessage = [];
                        return [4 /*yield*/, this.mngEqTypeService.getEqIndicators().
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.ddlIndicatorList = [];
                                        _this.ddlIndicatorList.push({ label: "Select Indicator", value: "Select Indicator" });
                                        for (var i = 0; i < data.DataList.length; i++) {
                                            _this.ddlIndicatorList.push({ label: data.DataList[i].EQ_INDICATOR + ' ( ' + data.DataList[i].EQ_DESC + ' ) ', value: data.DataList[i].EQ_INDICATOR });
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: AtParConstants_1.AtParConstants.ClientErrorMessage });
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentTypeComponent.prototype.customSort = function (event, field) {
        this.blnSortByColumn = !this.blnSortByColumn;
        var element = event;
        if (this.preField == element.field) {
            if (element.order == 1) {
                element.order = -1;
            }
            else {
                element.order = 1;
            }
        }
        else {
            element.order = 1;
        }
        this.preField = element.field;
        // this.sortedcheckedrec = [];
        //this.sorteduncheckedrec = [];
        var result = null;
        var order;
        if (element.field == 'ORG_GROUP_ID') {
            this.lstDepts = this.templstDepts;
            var filterlist = linq_es5_1.asEnumerable(this.lstDepts).Distinct(function (x) { return x.ORG_GROUP_ID; }).ToArray();
            if (filterlist != null || filterlist.length == 1) {
                return;
            }
        }
        try {
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    ManageEquipmentTypeComponent.prototype.addEquipment = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Equipment Type';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.showTextBox = true;
        this.showLable = false;
        this.form = true;
        this.editform = false;
        this.table = false;
        this.pop = false;
        this.Title = "Save";
        this.bindSymbal = "floppy-o";
        this.showAddButton = false;
        this.mode = AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Add].toString();
        this.equipmentStatus = null;
        this.descStatus = null;
        this.ddlOrgGpStatus = null;
        this.ddlindicatorStatus = null;
        this.loading = true;
        this.newItem = new TKIT_ITEM_TYPE_1.TKIT_ITEM_TYPE();
        this.equipmentIDSearch = "";
        this.bindOrgGroups();
        this.fillIndicatorDD();
        this.showEquipmentTypelbl = false;
        this.showIndicatorlbl = false;
        this.selectedIndicator = "";
        this.selectedOrgGroupId = "";
    };
    ManageEquipmentTypeComponent.prototype.tbl = function () {
        this.form = false;
        this.editform = false;
        this.table = false;
        this.pop = false;
        this.table = true;
    };
    ManageEquipmentTypeComponent.prototype.edit = function (data) {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Equipment Type';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.showTextBox = false;
        this.showLable = true;
        this.form = true;
        this.table = false;
        this.showAddButton = false;
        this.showEquipmentTypelbl = true;
        this.showIndicatorlbl = true;
        this.Title = "Update";
        this.bindSymbal = "check";
        this.newItem = data;
        this.mode = AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Edit].toString();
        this.loading = false;
        this.equipmentIDSearch = "";
        this.equipmentType = data.ITEM_TYPE;
        this.Indicator = data.ITEM_TYPE_INDICATOR;
        this.orgGrpId = data.ORG_GROUP_ID;
        this.blnShowOrgGroupLabel = true;
        this.blnShowOrgGroupDD = false;
        // this.bindOrgGroups();
        this.fillIndicatorDD();
    };
    ManageEquipmentTypeComponent.prototype.save = function () {
        this.editform = false;
    };
    ManageEquipmentTypeComponent.prototype.close = function () {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.form = false;
        this.table = true;
        this.pop = true;
        this.editform = false;
        this.table = false;
        this.showAddButton = true;
        this.newItem = new TKIT_ITEM_TYPE_1.TKIT_ITEM_TYPE();
        this.equipmentIDSearch = "";
        this.selectedOrgGroupId = "";
        this.selectedIndicator = "";
        this.growlMessage = [];
    };
    ManageEquipmentTypeComponent.prototype.clientErrorMsg = function (strExMsg) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString());
    };
    ManageEquipmentTypeComponent.prototype.ngOnInit = function () {
        this.table = false;
        this.showAddButton = true;
        this.newItem = new TKIT_ITEM_TYPE_1.TKIT_ITEM_TYPE();
        this.pageSize = +this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
        this.menuCode = localStorage.getItem("menuCode") != null ? localStorage.getItem("menuCode") : 'mt_tkit_manage_equipment_type.aspx';
        this.appID = (AtParEnums_1.EnumApps.TrackIT).toString();
        this.checkAuditAllowed();
        this.fillSerachIndicatorDD();
        this.statusType = null;
    };
    ManageEquipmentTypeComponent.prototype.fillSerachIndicatorDD = function () {
        this.statusList = [];
        this.statusList.push({ label: 'All', value: null });
        this.statusList.push({ label: 'B (BOX)', value: 'B (BOX)' });
        this.statusList.push({ label: 'E (EQUIPMENT)', value: 'E (EQUIPMENT)' });
        this.statusList.push({ label: 'F (FURNITURE)', value: 'F (FURNITURE)' });
    };
    ManageEquipmentTypeComponent.prototype.ngOnDestroy = function () {
        this.equipmentIDSearch = null;
        this.mode = null;
        this.Title = null;
        this.bindSymbal = null;
        this.equipmentStatus = null;
        this.descStatus = null;
        this.ddlOrgGpStatus = null;
        this.ddlindicatorStatus = null;
        this.departmentID = null;
        this.newItem = null;
        this.growlMessage = null;
        this._deviceTokenEntry = null;
        this.lstDepts = null;
        this.pageSize = null;
        this.menuCode = null;
        this.appID = null;
        this.auditSatus = null;
        this.changeDeptStatus = null;
    };
    ManageEquipmentTypeComponent.prototype.bindOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        this.growlMessage = [];
                        return [4 /*yield*/, this.commonService.getUserOrgGroups(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerService.stop();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.orgGroupData = data.DataList;
                                        // this.blnStatusMsg = false;
                                        if (_this.orgGroupData.length == 1) {
                                            _this.blnShowOrgGroupDD = false;
                                            ;
                                            _this.blnShowOrgGroupLabel = true;
                                            _this.orgGrpId = _this.orgGroupData[0].ORG_GROUP_ID + ' - ' + _this.orgGroupData[0].ORG_GROUP_NAME;
                                            break;
                                        }
                                        else if (_this.orgGroupData.length > 1) {
                                            _this.blnShowOrgGroupDD = true;
                                            _this.blnShowOrgGroupLabel = false;
                                            _this.lstOrgGroups = [];
                                            _this.lstOrgGroups.push({ label: "Select One", value: "Select One" });
                                            for (var i = 0; i < _this.orgGroupData.length; i++) {
                                                if (_this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                                    _this.lstOrgGroups.push({ label: _this.orgGroupData[i].ORG_GROUP_ID + ' - ' + _this.orgGroupData[i].ORG_GROUP_NAME, value: _this.orgGroupData[i].ORG_GROUP_ID });
                                                }
                                            }
                                            break;
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_2 = _a.sent();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: AtParConstants_1.AtParConstants.ClientErrorMessage });
                        this.spinnerService.stop();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentTypeComponent.prototype.ddlOrgGpChange = function () {
        if (this.blnShowOrgGroupDD) {
            if (this.selectedOrgGroupId == "Select One" || this.selectedOrgGroupId == undefined || this.selectedOrgGroupId == null || this.selectedOrgGroupId == "") {
                this.ddlOrgGpStatus = 1;
            }
            else {
                this.ddlOrgGpStatus = 0;
            }
        }
        else if (this.blnShowOrgGroupLabel) {
            this.ddlOrgGpStatus = 0;
        }
        if (this.showIndicatorlbl) {
            this.ddlindicatorStatus = 0;
        }
        else {
            if (this.selectedIndicator == "Select Indicator" || this.selectedIndicator == undefined || this.selectedIndicator == null || this.selectedIndicator == "") {
                this.ddlindicatorStatus = 1;
            }
            else {
                this.ddlindicatorStatus = 0;
            }
        }
        if (this.equipmentStatus == 0 && this.descStatus == 0 && this.ddlindicatorStatus == 0 && this.ddlOrgGpStatus == 0 && (this.newItem.ITEM_TYPE != "" || this.newItem.ITEM_TYPE != undefined || this.newItem.ITEM_TYPE != null) && (this.newItem.ITEM_TYPE_DESCR != "" || this.newItem.ITEM_TYPE_DESCR != undefined || this.newItem.ITEM_TYPE_DESCR != null)) {
            this.loading = false;
        }
        else {
            this.loading = true;
        }
        this.newItem.ORG_GROUP_ID = this.selectedOrgGroupId;
    };
    // Add and Update button validations
    ManageEquipmentTypeComponent.prototype.bindModelDataChange = function (event) {
        try {
            if ("txtEquipment" == event.TextBoxID.toString()) {
                this.equipmentStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtDesc" == event.TextBoxID.toString()) {
                this.descStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            this.ddlOrgGpChange();
            if (this.mode == AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Add].toString()) {
                if (this.equipmentStatus == 0 && this.descStatus == 0 && this.ddlindicatorStatus == 0 && this.ddlOrgGpStatus == 0) {
                    this.loading = false;
                }
                else {
                    this.loading = true;
                }
            }
            if (this.mode == AtParEnums_1.ModeEnum[AtParEnums_1.ModeEnum.Edit].toString()) {
                if (this.descStatus == 0) {
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
    ManageEquipmentTypeComponent.prototype.BindGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var exMsg_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.table == true) {
                            this.dataTableComponent.reset();
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.statusType = null;
                        this.table = false;
                        if (this.mode == "Edit") {
                            this.showAddButton = true;
                        }
                        this.spinnerService.start();
                        if (this.equipmentIDSearch == null || this.equipmentIDSearch == undefined || this.equipmentIDSearch === "") {
                            this.equipmentIDSearch = "";
                        }
                        return [4 /*yield*/, this.mngEqTypeService.getEquipmentTypes("", this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID], this.equipmentIDSearch)
                                .catch(this.httpService.handleError)
                                .then(function (resp) {
                                var webresp = resp.json();
                                _this.spinnerService.stop();
                                switch (webresp.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.growlMessage = [];
                                        _this.lstDepts = [];
                                        _this.lstDepts = webresp.DataList;
                                        _this.templstDepts = webresp.DataList;
                                        _this.table = true;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.table = false;
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: "warn", summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.table = false;
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: "info", summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: webresp.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.table = false;
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: "error", summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        exMsg_1 = _a.sent();
                        this.clientErrorMsg(exMsg_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentTypeComponent.prototype.checkAuditAllowed = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var webresp_1, exMsg_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        webresp_1 = new AtParWebApiResponse_1.AtParWebApiResponse();
                        return [4 /*yield*/, this.commonService.getAuditAllowed(this.appID, this.menuCode)
                                .catch(this.httpService.handleError).then(function (res) {
                                webresp_1 = res.json();
                                _this.spinnerService.stop();
                                switch (webresp_1.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.auditSatus = webresp_1.Data;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: webresp_1.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: webresp_1.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: webresp_1.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        exMsg_2 = _a.sent();
                        this.clientErrorMsg(exMsg_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ManageEquipmentTypeComponent.prototype.saveOrUpdateReasonCode = function () {
        var _this = this;
        this.showAddButton = false;
        this.table = false;
        this.growlMessage = [];
        if (this.blnShowOrgGroupLabel == true) {
            this.orgGroupIDForDBUpdate = this.orgGrpId.split("-")[0];
        }
        else {
            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            if (this.selectedOrgGroupId == "" || this.selectedOrgGroupId == "Select One" || this.selectedOrgGroupId == undefined) {
                this.table = false;
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                this.spinnerService.stop();
                return false;
            }
        }
        this.newItem.ITEM_TYPE_INDICATOR = this.selectedIndicator;
        this.newItem.ORG_GROUP_ID = this.orgGroupIDForDBUpdate;
        if (this.Title == "Save") {
            try {
                var webresp_2 = new AtParWebApiResponse_1.AtParWebApiResponse();
                this.spinnerService.start();
                this.mngEqTypeService.saveEqTypeData(this.newItem)
                    .catch(this.httpService.handleError).then(function (resp) {
                    webresp_2 = resp.json();
                    _this.spinnerService.stop();
                    switch (webresp_2.StatType) {
                        case AtParEnums_1.StatusType.Success: {
                            _this.growlMessage = [];
                            var msg = AtParConstants_1.AtParConstants.Created_Msg.replace("1%", 'Equipment Type').replace("2%", _this.newItem.ITEM_TYPE);
                            _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: msg });
                            _this.equipmentStatus = null;
                            _this.descStatus = null;
                            _this.ddlOrgGpStatus = null;
                            _this.ddlindicatorStatus = null;
                            _this.loading = true;
                            _this.selectedOrgGroupId = "";
                            _this.newItem = new TKIT_ITEM_TYPE_1.TKIT_ITEM_TYPE();
                            if (_this.blnShowOrgGroupDD) {
                                document.getElementById('txtddllstOrgGroups').focus();
                            }
                            else {
                                document.getElementById('txtEquipment').focus();
                            }
                            _this.selectedIndicator = "Select Indicator";
                            _this.selectedOrgGroupId = "";
                            break;
                        }
                        case AtParEnums_1.StatusType.Error: {
                            _this.growlMessage = [];
                            _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: webresp_2.StatusMessage });
                            break;
                        }
                        case AtParEnums_1.StatusType.Warn: {
                            _this.growlMessage = [];
                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: webresp_2.StatusMessage });
                            break;
                        }
                        case AtParEnums_1.StatusType.Custom: {
                            _this.growlMessage = [];
                            _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: webresp_2.StatusMessage });
                            break;
                        }
                    }
                });
            }
            catch (exMsg) {
                this.clientErrorMsg(exMsg);
            }
        }
        else {
            try {
                var webresp_3 = new AtParWebApiResponse_1.AtParWebApiResponse();
                this.spinnerService.start();
                this.mngEqTypeService.updateEqTypeData(this.newItem)
                    .catch(this.httpService.handleError).then(function (resp) {
                    webresp_3 = resp.json();
                    _this.spinnerService.stop();
                    switch (webresp_3.StatType) {
                        case AtParEnums_1.StatusType.Success: {
                            _this.growlMessage = [];
                            var msg = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", 'Equipment Type').replace("2%", _this.newItem.ITEM_TYPE);
                            _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: msg });
                            _this.loading = false;
                            //this.newItem = new TKIT_ITEM_TYPE();
                            document.getElementById('txtDesc').focus();
                            break;
                        }
                        case AtParEnums_1.StatusType.Error: {
                            _this.growlMessage = [];
                            _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: webresp_3.StatusMessage });
                            break;
                        }
                        case AtParEnums_1.StatusType.Warn: {
                            _this.growlMessage = [];
                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: webresp_3.StatusMessage });
                            break;
                        }
                        case AtParEnums_1.StatusType.Custom: {
                            _this.growlMessage = [];
                            _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: webresp_3.StatusMessage });
                            break;
                        }
                    }
                });
            }
            catch (exMsg) {
                this.clientErrorMsg(exMsg);
            }
        }
    };
    ManageEquipmentTypeComponent.prototype.filterStatus = function (value, field, mode) {
        if (value == null) {
            this.lstDepts = this.templstDepts;
        }
        else {
            this.lstDepts = linq_es5_1.asEnumerable(this.templstDepts).Where(function (x) { return x.ITEM_TYPE_INDICATOR_DESC === value; }).Select(function (x) { return x; }).ToArray();
        }
    };
    ManageEquipmentTypeComponent.prototype.ddlIndicatorChange = function () {
        this.newItem.ITEM_TYPE_INDICATOR = this.selectedIndicator;
        this.ddlOrgGpChange();
    };
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], ManageEquipmentTypeComponent.prototype, "dataTableComponent", void 0);
    ManageEquipmentTypeComponent = __decorate([
        core_1.Component({
            templateUrl: 'tkit-manage-equipment-type.component.html',
            providers: [datatableservice_1.datatableservice, tkit_manage_equipment_type_service_1.ManageEqTypeService, HttpService_1.HttpService, atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants]
        }),
        __metadata("design:paramtypes", [datatableservice_1.datatableservice,
            tkit_manage_equipment_type_service_1.ManageEqTypeService,
            HttpService_1.HttpService,
            event_spinner_service_1.SpinnerService,
            atpar_common_service_1.AtParCommonService,
            AtParConstants_1.AtParConstants,
            leftbar_animation_service_1.LeftBarAnimationService])
    ], ManageEquipmentTypeComponent);
    return ManageEquipmentTypeComponent;
}());
exports.ManageEquipmentTypeComponent = ManageEquipmentTypeComponent;
//# sourceMappingURL=tkit-manage-equipment-type.component.js.map