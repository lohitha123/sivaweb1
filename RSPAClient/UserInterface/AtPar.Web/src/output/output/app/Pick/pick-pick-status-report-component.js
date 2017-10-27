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
var HttpService_1 = require("../Shared/HttpService");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParEnums_2 = require("../Shared/AtParEnums");
var AtParConstants_1 = require("../Shared/AtParConstants");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var datatable_1 = require("../components/datatable/datatable");
var routepath_1 = require("../AtPar/Menus/routepath");
var pick_pick_status_report_component_service_1 = require("../Pick/pick-pick-status-report-component.service");
var file_saver_1 = require("file-saver");
var PickStatusReportComponent = (function () {
    function PickStatusReportComponent(spinnerService, atParCommonService, httpService, atParConstant, pickStatusReportService) {
        this.spinnerService = spinnerService;
        this.atParCommonService = atParCommonService;
        this.httpService = httpService;
        this.atParConstant = atParConstant;
        this.pickStatusReportService = pickStatusReportService;
        this.growlMessage = [];
        this.defDateRange = 0;
        this.minDateValue1 = new Date();
        this.defDuration = 0;
        this.statusCode = -1;
        this.showGrid = false;
        this.isMailDialog = false;
        this.toDate = new Date();
        this.lstOrgGroupIds = [];
        this.lstBUnits = [];
        this.lstFilterBUnits = [];
        this.lstStatus = [];
        this.lstPickStatus = [];
        this.lstDBData = [];
        this.breadCrumbMenu = new routepath_1.Menus();
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
    }
    PickStatusReportComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.pageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        this.lstStatus.push({ label: 'All', value: 'All' }, { label: 'Open', value: 'Open' }, { label: 'Picked(Sent)', value: 'Picked(Sent)' }, { label: 'Downloaded', value: 'Downloaded' });
                        this.status = 'All';
                        this.spinnerService.start();
                        _a = this;
                        return [4 /*yield*/, this.getDefDateRange()];
                    case 1:
                        _a.statusCode = _c.sent();
                        return [4 /*yield*/, this.getMyPreferences()];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, this.bindOrgGroups()];
                    case 3:
                        _c.sent();
                        if (!!this.showOrgDropdown) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.populateBUnitDropDown()];
                    case 4:
                        _c.sent();
                        _c.label = 5;
                    case 5:
                        this.fromDate = new Date();
                        _b = this;
                        return [4 /*yield*/, this.addDays(this.fromDate, this.defDateRange)];
                    case 6:
                        _b.fromDate = _c.sent();
                        this.toDate = new Date();
                        this.spinnerService.stop();
                        return [2 /*return*/];
                }
            });
        });
    };
    PickStatusReportComponent.prototype.getMyPreferences = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.atParCommonService.getMyPreferences('DEFAULT_REPORT_DURATION', this.deviceTokenEntry).then(function (result) {
                                _this.spinnerService.stop();
                                var res = result.json();
                                _this.growlMessage = [];
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.defDuration = parseInt(res.DataVariable.toString());
                                        _this.fromDate = new Date();
                                        var d = _this.fromDate.getDate() - _this.defDuration;
                                        _this.fromDate.setDate(d);
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, 'getMyPreferences');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PickStatusReportComponent.prototype.bindOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.atParCommonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID])
                                .catch(this.httpService.handleError).then(function (result) {
                                var res = result.json();
                                _this.growlMessage = [];
                                _this.lstOrgGroupIds = [];
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        if (res.DataList.length == 1) {
                                            _this.showOrgDropdown = false;
                                            _this.orgGroupId = res.DataList[0].ORG_GROUP_ID + ' - ' + res.DataList[0].ORG_GROUP_NAME;
                                        }
                                        else {
                                            _this.showOrgDropdown = true;
                                            _this.lstOrgGroupIds.push({ label: 'Select One', value: '' });
                                            for (var i = 0; i < res.DataList.length; i++) {
                                                if (res.DataList[i].ORG_GROUP_ID.toUpperCase() != 'ALL') {
                                                    _this.lstOrgGroupIds.push({ label: (res.DataList[i].ORG_GROUP_ID + ' - ' + res.DataList[i].ORG_GROUP_NAME), value: res.DataList[i].ORG_GROUP_ID });
                                                }
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, "bindOrgGroups");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PickStatusReportComponent.prototype.populateBUnitDropDown = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var orggrpid, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orggrpid = this.orgGroupId.split("-")[0].trim();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.atParCommonService.getOrgBusinessUnits(orggrpid, AtParEnums_1.BusinessType.Inventory).then(function (result) {
                                var res = result.json();
                                _this.growlMessage = [];
                                switch (res.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.lstBUnits = res.DataList;
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, 'populateBUnitDropDown');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PickStatusReportComponent.prototype.ddlOrgGroup_SelectedIndexChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.orgGroupId != '')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.populateBUnitDropDown()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    PickStatusReportComponent.prototype.filterBUnits = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var query, tempList, i;
            return __generator(this, function (_a) {
                query = event.query.toUpperCase();
                this.lstFilterBUnits = [];
                tempList = [];
                try {
                    if (this.orgGroupId != 'Select One' && this.orgGroupId != '' && this.orgGroupId != null) {
                        if (query == '%') {
                            tempList = this.lstBUnits;
                        }
                        else {
                            tempList = this.lstBUnits.filter(function (x) { return (x.startsWith(query) ||
                                x.endsWith(query) || x == query); });
                        }
                        for (i = 0; i < tempList.length; i++) {
                            this.lstFilterBUnits.push({ BUnit: tempList[i] });
                        }
                    }
                }
                catch (ex) {
                    this.clientErrorMsg(ex, 'filterProcedures');
                }
                return [2 /*return*/];
            });
        });
    };
    PickStatusReportComponent.prototype.btnGo_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var specialChars, i, i, i, i, todayDate, frmDate, todate, inXmlsb, ex_4, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        this.spinnerService.start();
                        this.growlMessage = [];
                        this.showGrid = false;
                        if (this.showOrgDropdown == true) {
                            if (this.orgGroupId == undefined) {
                                this.orgGroupId = "";
                            }
                            if (this.orgGroupId === "") {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Grp ID" });
                                this.spinnerService.stop();
                                return [2 /*return*/];
                            }
                        }
                        if (this.businessUnit == undefined || this.businessUnit == '' || this.businessUnit["BUnit"] == undefined) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Valid Business Unit / Company" });
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
                        if (this.businessUnit["BUnit"] != undefined) {
                            for (i = 0; i < specialChars.length; i++) {
                                if (this.businessUnit["BUnit"].indexOf(specialChars[i]) > -1) {
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Valid Business Unit / Company" });
                                    this.spinnerService.stop();
                                    return [2 /*return*/];
                                }
                            }
                        }
                        if (this.location != undefined) {
                            for (i = 0; i < specialChars.length; i++) {
                                if (this.location.indexOf(specialChars[i]) > -1) {
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Enter Valid Data" });
                                    this.spinnerService.stop();
                                    return [2 /*return*/];
                                }
                            }
                        }
                        if (this.order != undefined) {
                            for (i = 0; i < specialChars.length; i++) {
                                if (this.order.indexOf(specialChars[i]) > -1) {
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Enter Valid Data" });
                                    this.spinnerService.stop();
                                    return [2 /*return*/];
                                }
                            }
                        }
                        if (this.batch != undefined) {
                            for (i = 0; i < specialChars.length; i++) {
                                if (this.batch.indexOf(specialChars[i]) > -1) {
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Enter Valid Data" });
                                    this.spinnerService.stop();
                                    return [2 /*return*/];
                                }
                            }
                        }
                        todayDate = new Date();
                        if (this.toDate > todayDate) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "To Date must be less than or equal to current date" });
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        else if (this.fromDate > this.toDate) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "From Date must be less than or equal to To Date" });
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        else {
                        }
                        frmDate = this.convert(this.fromDate);
                        todate = this.convert(this.toDate);
                        this.fromDateforDisplay = frmDate;
                        this.toDateforDisplay = todate;
                        inXmlsb = '';
                        inXmlsb += "<ROOT>";
                        inXmlsb += "<BUSINESS_UNIT>" + this.businessUnit["BUnit"].trim().toUpperCase() + "</BUSINESS_UNIT>";
                        if (this.status == undefined) {
                            this.status = "";
                        }
                        if (this.status != null || this.status !== "") {
                            inXmlsb += "<STATUS>" + this.status.trim() + "</STATUS>";
                        }
                        if (this.batch != undefined) {
                            inXmlsb += "<BATCHID>" + this.batch.trim() + "</BATCHID>";
                        }
                        if (this.order != undefined) {
                            inXmlsb += "<ORDER>" + this.order.trim() + "</ORDER>";
                        }
                        if (this.location != undefined) {
                            inXmlsb += "<DELIVERYLOCATION>"
                                + this.location.trim() + "</DELIVERYLOCATION>";
                        }
                        if (frmDate != null || frmDate !== "") {
                            inXmlsb += "<FROMDATE>"
                                + frmDate + "</FROMDATE>";
                        }
                        if (todate != null || todate !== "") {
                            inXmlsb += "<TODATE>"
                                + todate + "</TODATE>";
                        }
                        if (this.showOrgDropdown == false) {
                            inXmlsb += "<ORGGROUPID>"
                                + this.orgGroupId.split("-")[0].trim() + "</ORGGROUPID>";
                        }
                        else {
                            inXmlsb += "<ORGGROUPID>"
                                + this.orgGroupId + "</ORGGROUPID>";
                        }
                        inXmlsb += "</ROOT>";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.pickStatusReportService.GetPickstatusReport(inXmlsb).
                                catch(this.httpService.handleError).then(function (res) {
                                _this.spinnerService.stop();
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.showGrid = true;
                                        _this.lstPickStatus = data.DataDictionary["outputParameters"]["Table1"];
                                        if (_this.status !== "All") {
                                            _this.lstPickStatus = _this.lstPickStatus.filter(function (x) { return x.Status.toUpperCase() === _this.status.toUpperCase(); });
                                        }
                                        if (_this.lstPickStatus.length == 0) {
                                            _this.showGrid = false;
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Plans Found" });
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        if (data.StatusCode = AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Plans Found" });
                                            break;
                                        }
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_4 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, 'btnGo_Click');
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    PickStatusReportComponent.prototype.convert = function (str) {
        var date = new Date(str), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("/");
    };
    PickStatusReportComponent.prototype.getDefDateRange = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 5]);
                        return [4 /*yield*/, this.atParCommonService.GetMyPreferences("DEFAULT_REPORT_DURATION", this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                if (data.StatType == AtParEnums_2.StatusType.Success) {
                                    _this.defDateRange = parseInt(data.DataVariable.toString());
                                }
                                _this.statusCode = data.StatusCode;
                                if (data.StatType == AtParEnums_2.StatusType.Error) {
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Failed to get Default data range" });
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
    PickStatusReportComponent.prototype.onExportToExcelClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, blob, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        event.stopImmediatePropagation();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.exportReportDetails('Excel')];
                    case 1:
                        html = _a.sent();
                        if (html != '' && html != null) {
                            blob = new Blob([html], {
                                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                            });
                            file_saver_1.saveAs(blob, "pick_status_report.xls");
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7, 'onExportToExcelClick');
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PickStatusReportComponent.prototype.onPrintClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, mywindow, ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        event.stopImmediatePropagation();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.exportReportDetails('Print')];
                    case 1:
                        html = _a.sent();
                        if (html != '' && html != null) {
                            mywindow = window.open('', null, 'height=650,width=650,status=no,resizable=yes, scrollbars=yes, toolbar=no,location=center,menubar=no');
                            if (mywindow != null && mywindow != undefined) {
                                mywindow.document.write('<html><head><title>' + 'Pick - Pick Status Report' + '</title>');
                                mywindow.document.write('</head><body >');
                                mywindow.document.write(html);
                                mywindow.document.write('</body></html>');
                                mywindow.document.close(); // necessary for IE >= 10
                                mywindow.focus(); // necessary for IE >= 10*/
                                //mywindow.print();
                                //mywindow.close();
                                return [2 /*return*/, true];
                            }
                            else {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please set allow pop-ups for this site in your browser' });
                                return [2 /*return*/];
                            }
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8, 'onPrintClick');
                        return [2 /*return*/, false];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PickStatusReportComponent.prototype.onSendMailIconClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.growlMessage = [];
                    this.isMailDialog = true;
                    this.toMailAddr = '';
                }
                catch (ex) {
                    this.clientErrorMsg(ex, 'onSendMailIconClick');
                }
                return [2 /*return*/];
            });
        });
    };
    PickStatusReportComponent.prototype.onSendMailClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var val, html, toAddr, ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, 5, 6]);
                        this.growlMessage = [];
                        if (this.toMailAddr == '' || this.toMailAddr == undefined) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Email Address to Send' });
                            return [2 /*return*/];
                        }
                        val = this.validateEmail(this.toMailAddr);
                        if (!val) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Valid Email Address to Send' });
                            return [2 /*return*/];
                        }
                        this.spinnerService.start();
                        return [4 /*yield*/, this.exportReportDetails('Mail')];
                    case 1:
                        html = _a.sent();
                        this.isMailDialog = false;
                        toAddr = '';
                        this.growlMessage = [];
                        if (!(html != '' && html != null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.atParCommonService.sendEmail(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId], 'Pick Plan Status Report', JSON.stringify(html), this.toMailAddr, AtParEnums_2.MailPriority.Normal.toString(), '')
                                .then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                            })];
                    case 2:
                        _a.sent();
                        if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Mail has been sent' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_FROM_ADDRESS) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'From Address is Missing! Please Contact Administrator' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_TO_ADDRESS) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Please Enter valid Email Address to Send' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_SUBJECT) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Subject is Missing! Please Contact Administrator' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_BODY) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Body is Missing! Please contact Administrator' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_SMTP_SERVER_MISSING) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Email Server is Not Configured! Please Contact Administrator' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_SEND_FAILED) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Mail Not Sent. Please Try Again' });
                        }
                        else {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Error while sending mail' });
                        }
                        _a.label = 3;
                    case 3:
                        // if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
                        this.isMailDialog = false;
                        this.toMailAddr = '';
                        return [3 /*break*/, 6];
                    case 4:
                        ex_9 = _a.sent();
                        this.clientErrorMsg(ex_9, 'onSendMailClick');
                        return [3 /*break*/, 6];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    PickStatusReportComponent.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    PickStatusReportComponent.prototype.exportReportDetails = function (reqType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var htmlBuilder, sbMailText, _strFrmDt, _strToDt, imgserverPath, ChartPath, index, ex_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        htmlBuilder = '';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        this.statusCode = -1;
                        this.growlMessage = [];
                        sbMailText = void 0;
                        _strFrmDt = void 0;
                        _strToDt = void 0;
                        imgserverPath = '';
                        return [4 /*yield*/, this.atParCommonService.getServerIP()
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.ipAddress = data.DataVariable.toString();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                if (data.StatType != AtParEnums_2.StatusType.Success) {
                                    htmlBuilder = '';
                                    return htmlBuilder;
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.atParCommonService.getSSLConfigDetails()
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                _this.growlMessage = [];
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.gstrProtocal = data.Data.PROTOCOL.toString();
                                        _this.gstrServerName = data.Data.SERVER_NAME.toString();
                                        _this.gstrPortNo = data.Data.PORT_NO.toString();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                if (data.StatType != AtParEnums_2.StatusType.Success) {
                                    htmlBuilder = '';
                                    return htmlBuilder;
                                }
                            })];
                    case 3:
                        _a.sent();
                        imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
                        ChartPath = this.httpService.BaseUrl + '/Uploaded/';
                        // let title: string = '""' + "AtparVersion 2.8" + '""';
                        htmlBuilder = "<Table align=center width=100% cellpadding=0 cellspacing = 0 vAlign=top>";
                        if (reqType == "Print") {
                            htmlBuilder += "<TR width='100%'><td  align=left  width='8%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4></td><td align=left  width='85%' height=63 nowrap><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>";
                            htmlBuilder += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                                "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>Pick Plan Status Report from " + this.fromDateforDisplay + " to " + this.toDateforDisplay + " </b></span></td><td align=right valign=top>&nbsp;";
                            htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "><img src=" + imgserverPath + "print.jpg></A>";
                        }
                        else {
                            htmlBuilder += "<TR width='100%'  height='27px'><td align=left bgcolor='#fe9836' width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg></td><td align=left  width='85%' height='63' nowrap></td></TR>";
                            htmlBuilder += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                                "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>Pick Plan Status Report from " + this.fromDateforDisplay + " to " + this.toDateforDisplay + " </b></span></td><td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2>";
                        htmlBuilder += "<table align=center width=90% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>";
                        htmlBuilder += "<tr bgcolor=#d3d3d3>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>Org Group ID</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>B Unit</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>Order NO</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>Batch ID</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>Location</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>Order Date</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>Picked or Downloaded Date Time</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>Status</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>User</b></span></td>";
                        htmlBuilder += "</tr>";
                        for (index = 0; index < this.lstPickStatus.length; index++) {
                            if (this.lstPickStatus[index].DOWNLOADTIME == null) {
                                this.lstPickStatus[index].DOWNLOADTIME = "";
                            }
                            htmlBuilder += "<tr>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>" + this.orgGroupId + "</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstPickStatus[index].BUSINESS_UNIT + "</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstPickStatus[index].ORDER_NO + "</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstPickStatus[index].PICK_BATCH_ID + "</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstPickStatus[index].LOCATION + "</span></td>";
                            if (this.lstPickStatus[index].REQUEST_DATE !== "") {
                                htmlBuilder += "<td align=left nowrap><span class=c3>" + this.convertDateFormate(this.lstPickStatus[index].REQUEST_DATE) + "</span></td>";
                            }
                            else {
                                htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstPickStatus[index].REQUEST_DATE + "</span></td>";
                            }
                            htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstPickStatus[index].DOWNLOADTIME + "</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstPickStatus[index].Status + "</span></td>";
                            htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstPickStatus[index].USER_ID + "</span></td>";
                            htmlBuilder += "</tr>";
                        }
                        htmlBuilder += "</table></td></tr></Table>";
                        return [4 /*yield*/, htmlBuilder];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5:
                        ex_10 = _a.sent();
                        htmlBuilder = '';
                        this.clientErrorMsg(ex_10, 'exportReportDetails');
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    PickStatusReportComponent.prototype.convertDateFormate = function (strDate) {
        var date = new Date(strDate), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("/");
    };
    PickStatusReportComponent.prototype.closeMailPopup = function () {
        this.growlMessage = [];
    };
    PickStatusReportComponent.prototype.addDays = function (theDate, days) {
        return new Date(theDate.getTime() - days * 24 * 60 * 60 * 1000);
    };
    PickStatusReportComponent.prototype.onfocusFromCalendar = function (e) {
        localStorage.removeItem("FromDate");
        this.date1 = null;
    };
    PickStatusReportComponent.prototype.onfocusToCalendar = function (e) {
        this.date2 = null;
        if (this.date1 == null) {
            this.minDateValue2 = new Date();
        }
        else {
            this.minDateValue2 = this.date1;
        }
    };
    PickStatusReportComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    PickStatusReportComponent.prototype.ngOnDestroy = function () {
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PickStatusReportComponent.prototype, "appId", void 0);
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], PickStatusReportComponent.prototype, "dataTableComponent", void 0);
    PickStatusReportComponent = __decorate([
        core_1.Component({
            templateUrl: 'pick-pick-status-report-component.html',
            providers: [atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants, pick_pick_status_report_component_service_1.PickStatusReportService],
        }),
        __metadata("design:paramtypes", [event_spinner_service_1.SpinnerService,
            atpar_common_service_1.AtParCommonService,
            HttpService_1.HttpService,
            AtParConstants_1.AtParConstants,
            pick_pick_status_report_component_service_1.PickStatusReportService])
    ], PickStatusReportComponent);
    return PickStatusReportComponent;
}());
exports.PickStatusReportComponent = PickStatusReportComponent;
//# sourceMappingURL=pick-pick-status-report-component.js.map