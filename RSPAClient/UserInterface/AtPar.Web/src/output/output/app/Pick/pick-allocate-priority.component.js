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
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var HttpService_1 = require("../Shared/HttpService");
var AtParEnums_1 = require("../Shared/AtParEnums");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var pick_allocate_priority_service_1 = require("./pick-allocate-priority.service");
var AllocatePriorityComponent = (function () {
    function AllocatePriorityComponent(dataservice, atParCommonService, httpService, spinnerService, atParConstant, pickAllocatePriorityService) {
        this.dataservice = dataservice;
        this.atParCommonService = atParCommonService;
        this.httpService = httpService;
        this.spinnerService = spinnerService;
        this.atParConstant = atParConstant;
        this.pickAllocatePriorityService = pickAllocatePriorityService;
        this.pop = false;
        this.table = false;
        this.page = true;
        this.form = false;
        this.editform = false;
        this.loading = true;
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.bunitsData = [];
        this.selectedBunit = '';
        this.selectedOrgGrpId = '';
        this.location = "";
        this.assignpriority = "";
        this.disableButton = true;
        this.priorityStatus = 0;
        this.startIndex = 0;
    }
    AllocatePriorityComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.recordsperpage = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        return [4 /*yield*/, this.getUserOrgGroups()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AllocatePriorityComponent.prototype.go = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        if (this.selectedOrgGrpId == "") {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select valid Org Group ID" });
                            return [2 /*return*/];
                        }
                        if (this.selectedBunit == "") {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit" });
                            return [2 /*return*/];
                        }
                        this.pop = false;
                        this.priorities = [];
                        this.filterpriorities = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.pickAllocatePriorityService.getLocationPriorities(this.selectedBunit, (this.location != '') ? this.location.toUpperCase() : this.location).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.pop = true;
                                        _this.priorities = data.DataList;
                                        if (_this.priorities != null && _this.priorities.length > 0) {
                                            for (var i = 0; i < _this.priorities.length; i++) {
                                                if (_this.priorities[i].CHK_VALUE == 0) {
                                                    _this.priorities[i].ASSIGN = false;
                                                }
                                                else {
                                                    _this.priorities[i].ASSIGN = true;
                                                }
                                            }
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
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
                        this.clientErrorMsg(ex_1, "go");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AllocatePriorityComponent.prototype.bindModelDataChange = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.growlMessage = [];
                    this.disableButton = false;
                    if (event != null && event.TextBoxID != null && event.validationrules != null) {
                        if ("txtPriority" == event.TextBoxID.toString()) {
                            this.priorityStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
                        }
                    }
                    if (this.priorityStatus == 0) {
                        this.disableButton = false;
                    }
                    else {
                        this.disableButton = true;
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, "bindModelDataChange");
                }
                return [2 /*return*/];
            });
        });
    };
    AllocatePriorityComponent.prototype.getBunits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var isOrgBUnitsExist, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        this.bunitsData = [];
                        isOrgBUnitsExist = false;
                        this.lstBunit = [];
                        this.lstBunit.push({ label: "Select BUnit", value: "" });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.atParCommonService.getOrgBusinessUnits(this.selectedOrgGrpId, AtParEnums_1.BusinessType.Inventory).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.spinnerService.stop();
                                        _this.bunitsData = data.DataList;
                                        for (var i = 0; i < _this.bunitsData.length; i++) {
                                            _this.lstBunit.push({
                                                label: _this.bunitsData[i], value: _this.bunitsData[i]
                                            });
                                        }
                                        isOrgBUnitsExist = true;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        isOrgBUnitsExist = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.spinnerService.stop();
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
                        this.clientErrorMsg(ex_2, "getBunits");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AllocatePriorityComponent.prototype.getUserOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        // this.blnddlOrgGrpID = false;
                        return [4 /*yield*/, this.atParCommonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var data, _a, i;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            data = res.json();
                                            this.orgGroupLst = res.json().DataList;
                                            _a = data.StatType;
                                            switch (_a) {
                                                case AtParEnums_1.StatusType.Success: return [3 /*break*/, 1];
                                                case AtParEnums_1.StatusType.Warn: return [3 /*break*/, 5];
                                                case AtParEnums_1.StatusType.Error: return [3 /*break*/, 6];
                                                case AtParEnums_1.StatusType.Custom: return [3 /*break*/, 7];
                                            }
                                            return [3 /*break*/, 8];
                                        case 1:
                                            this.ddOrgGroupdata = [];
                                            if (!(this.orgGroupLst != null && this.orgGroupLst.length > 0)) return [3 /*break*/, 4];
                                            if (!(this.orgGroupLst.length == 1)) return [3 /*break*/, 3];
                                            this.selectedOrgGrpName = this.orgGroupLst[0].ORG_GROUP_ID + " - " + this.orgGroupLst[0].ORG_GROUP_NAME;
                                            this.selectedOrgGrpId = this.orgGroupLst[0].ORG_GROUP_ID;
                                            this.blnddlOrgGrpID = true;
                                            return [4 /*yield*/, this.getBunits()];
                                        case 2:
                                            _b.sent();
                                            return [3 /*break*/, 4];
                                        case 3:
                                            if (this.orgGroupLst.length > 1) {
                                                this.showddlOrgGrpID = true;
                                                this.lstBunit = [];
                                                this.lstBunit.push({ label: "Select BUnit", value: "" });
                                                this.ddOrgGroupdata = [];
                                                this.ddOrgGroupdata.push({ label: "Select One", value: "" });
                                                for (i = 0; i < this.orgGroupLst.length; i++) {
                                                    if (this.orgGroupLst[i].ORG_GROUP_ID !== "All") {
                                                        this.ddOrgGroupdata.push({
                                                            label: this.orgGroupLst[i].ORG_GROUP_ID + " - " + this.orgGroupLst[i].ORG_GROUP_NAME,
                                                            value: this.orgGroupLst[i].ORG_GROUP_ID
                                                        });
                                                    }
                                                }
                                                return [3 /*break*/, 8];
                                            }
                                            _b.label = 4;
                                        case 4: return [3 /*break*/, 8];
                                        case 5:
                                            {
                                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                                return [3 /*break*/, 8];
                                            }
                                            _b.label = 6;
                                        case 6:
                                            {
                                                this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                                return [3 /*break*/, 8];
                                            }
                                            _b.label = 7;
                                        case 7:
                                            {
                                                this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                                return [3 /*break*/, 8];
                                            }
                                            _b.label = 8;
                                        case 8: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        // this.blnddlOrgGrpID = false;
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, "getUserOrgGroups");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AllocatePriorityComponent.prototype.onChange = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.growlMessage = [];
                        this.pop = false;
                        this.selectedBunit = "";
                        if (this.selectedOrgGrpId == "Select One" || this.selectedOrgGrpId == "") {
                            this.lstBunit = [];
                            this.lstBunit.push({ label: "Select BUnit", value: "" });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.getBunits()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, "onChange");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AllocatePriorityComponent.prototype.onBunitChange = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.pop = false;
                        if (this.selectedBunit == "Select BUnit" || this.selectedBunit == "") {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.getBunits()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, "onBunitChange");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AllocatePriorityComponent.prototype.saveAllocatePriorites = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        if (this.assignpriority == "") {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Please assign valid priority" });
                        }
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.growlMessage = [];
                        return [4 /*yield*/, this.pickAllocatePriorityService.saveLocationPriorities(this.assignpriority, this.priorities).
                                catch(this.httpService.handleError).then(function (res) {
                                var resp = res.json();
                                switch (resp.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.selectedBunit = "";
                                        _this.location = "";
                                        _this.assignpriority = "";
                                        _this.loading = true;
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Updated Successfully" });
                                        _this.page = false;
                                        _this.pop = false;
                                        _this.disableButton = true;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        var statusMessage = resp.StatusMessage;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
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
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, "saveAllocatePriorites");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AllocatePriorityComponent.prototype.checkAll = function () {
        try {
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.endIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.filterpriorities != null || this.filterpriorities != undefined) {
                if (this.endIndex > this.filterpriorities.length) {
                    this.endIndex = this.filterpriorities.length;
                }
                for (var i = this.startIndex; i <= this.endIndex - 1; i++) {
                    this.filterpriorities[i].CHK_VALUE = 1;
                }
            }
            else {
                if (this.endIndex > this.priorities.length) {
                    this.endIndex = this.priorities.length;
                }
                for (var i = this.startIndex; i <= this.endIndex - 1; i++) {
                    this.priorities[i].CHK_VALUE = 1;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkAll");
        }
    };
    AllocatePriorityComponent.prototype.unCheckAll = function () {
        try {
            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.endIndex = +sessionStorage.getItem("RecordsEndindex");
            if (this.filterpriorities != null || this.filterpriorities != undefined) {
                if (this.endIndex > this.filterpriorities.length) {
                    this.endIndex = this.filterpriorities.length;
                }
                for (var i = this.endIndex - 1; i >= this.startIndex; i--) {
                    this.filterpriorities[i].CHK_VALUE = 0;
                }
            }
            else {
                if (this.endIndex > this.priorities.length) {
                    this.endIndex = this.priorities.length;
                }
                for (var i = this.endIndex - 1; i >= this.startIndex; i--) {
                    this.priorities[i].CHK_VALUE = 0;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "saveAllocatePriorites");
        }
    };
    AllocatePriorityComponent.prototype.changeStatus = function (obj, status) {
        try {
            if (status == true) {
                obj.CHK_VALUE = 1;
                obj.ASSIGN = true;
            }
            else {
                obj.CHK_VALUE = 0;
                obj.ASSIGN = false;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "changeStatus");
        }
    };
    AllocatePriorityComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    AllocatePriorityComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.spinnerService.stop();
        this.spinnerService = null;
        this.disableButton = true;
        this.priorities = [];
    };
    AllocatePriorityComponent.prototype.myfilterdata = function (event) {
        try {
            this.filterpriorities = new Array();
            this.filterpriorities = event;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "myfilterdata");
        }
    };
    AllocatePriorityComponent = __decorate([
        core_1.Component({
            templateUrl: 'pick-allocate-priority.component.html',
            providers: [datatableservice_1.datatableservice, atpar_common_service_1.AtParCommonService, HttpService_1.HttpService, AtParConstants_1.AtParConstants, pick_allocate_priority_service_1.PickAllocatePriorityService]
        }),
        __metadata("design:paramtypes", [datatableservice_1.datatableservice, atpar_common_service_1.AtParCommonService, HttpService_1.HttpService,
            event_spinner_service_1.SpinnerService, AtParConstants_1.AtParConstants, pick_allocate_priority_service_1.PickAllocatePriorityService])
    ], AllocatePriorityComponent);
    return AllocatePriorityComponent;
}());
exports.AllocatePriorityComponent = AllocatePriorityComponent;
//# sourceMappingURL=pick-allocate-priority.component.js.map