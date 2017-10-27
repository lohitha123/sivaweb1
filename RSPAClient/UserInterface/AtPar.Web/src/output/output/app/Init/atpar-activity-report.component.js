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
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var HttpService_1 = require("../Shared/HttpService");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParConstants_1 = require("../Shared/AtParConstants");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var atpar_activity_report_service_1 = require("./atpar-activity-report.service");
var file_saver_1 = require("file-saver");
var AtParActivityReportComponent = (function () {
    function AtParActivityReportComponent(httpService, atparConstants, commonService, spinnerService, activityReportService) {
        this.httpService = httpService;
        this.atparConstants = atparConstants;
        this.commonService = commonService;
        this.spinnerService = spinnerService;
        this.activityReportService = activityReportService;
        /*VariableDeclaration*/
        this.productId = '';
        this.blnShowOrgGroupIdLabel = false;
        this.blnShowOrgGroupIdDropDown = false;
        this.blnTotal = false;
        this.blnUserId = false;
        this.blnBunitCompany = false;
        this.blnInvalid = false;
        this.isVisible = false;
        this.isMailDialog = false;
        this.toMailAddr = '';
        this.lstActivityData = [];
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.tdExports = false;
        this.statusCode = -1;
        this.lstOrgGroups = [];
        this.orgGrpIdData = "";
        this.selectedOrgGroupId = "";
        this.defDateRange = 0;
        this.pageSize = 0;
        this.chartDetailsDataset = [];
        this.labelData = [];
        this.showChart = false;
        this.ipAddress = " ";
        this.gstrProtocal = "";
        this.gstrServerName = "";
        this.gstrPortNo = "";
        this.chartName = "";
        this.productName = "";
        this.chartOptions = {
            scales: {
                yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            stepSize: 5
                        }
                    }]
            }
        };
        try {
            this.spinnerService.start();
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        }
        catch (ex) {
            this.clientErrorMsg(ex, '');
        }
        finally {
            this.spinnerService.stop();
        }
    }
    AtParActivityReportComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, ex_1, _b, ex_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.pageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        this.appId = this.productId;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 11, 12, 13]);
                        this.spinnerService.start();
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 4, , 5]);
                        this.statusCode = -1;
                        _a = this;
                        return [4 /*yield*/, this.getMyPreferences()];
                    case 3:
                        _a.statusCode = _c.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_1 = _c.sent();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Failed to get Default Report Duration' });
                        return [2 /*return*/];
                    case 5:
                        this.currentDate = new Date();
                        this.toDate = new Date();
                        this.fromDate = new Date();
                        if (!(this.defDateRange.toString() != '' && this.defDateRange.toString != null)) return [3 /*break*/, 7];
                        _b = this;
                        return [4 /*yield*/, this.addDays(this.fromDate, -this.defDateRange)];
                    case 6:
                        _b.fromDate = _c.sent();
                        _c.label = 7;
                    case 7: return [4 /*yield*/, this.bindOrgGroups()];
                    case 8:
                        _c.sent();
                        if (!(this.blnShowOrgGroupIdLabel == true)) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.bindDataGrid(0)];
                    case 9:
                        _c.sent();
                        _c.label = 10;
                    case 10: return [3 /*break*/, 13];
                    case 11:
                        ex_2 = _c.sent();
                        this.clientErrorMsg(ex_2, 'ngOnInit');
                        return [3 /*break*/, 13];
                    case 12:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    AtParActivityReportComponent.prototype.bindOrgGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var i, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, 7, 8]);
                        return [4 /*yield*/, this.commonService.getUserOrgGroups(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID], this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).
                                catch(this.httpService.handleError).then(function (res) {
                                _this.orgGroupData = res.json().DataList;
                                _this.growlMessage = [];
                            })];
                    case 2:
                        _a.sent();
                        if (!(sessionStorage.getItem("OrgGroupID") != null && sessionStorage.getItem("OrgGroupID") == "All")) return [3 /*break*/, 4];
                        this.blnShowOrgGroupIdDropDown = true;
                        //Getting the OrgGroupIDs
                        return [4 /*yield*/, this.commonService.getOrgGroupIDS().
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.orgGroupData = res.json().DataList,
                                    _this.statusCode = res.json().StatusCode;
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
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
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 3:
                        //Getting the OrgGroupIDs
                        _a.sent();
                        if (this.orgGroupData.length > 0) {
                            this.lstOrgGroups = [];
                            this.lstOrgGroups.push({ label: "Select One", value: "Select One" });
                            for (i = 0; i < this.orgGroupData.length; i++) {
                                if (this.orgGroupData[i].ORG_GROUP_ID.toString() != "All") {
                                    this.lstOrgGroups.push({ label: this.orgGroupData[i].ORG_GROUP_ID.toString() + " - " + this.orgGroupData[i].ORG_GROUP_NAME.toString(), value: this.orgGroupData[i].ORG_GROUP_ID.toString() });
                                }
                            }
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        this.blnShowOrgGroupIdLabel = true;
                        this.orgGrpIdData = this.orgGroupData[0].ORG_GROUP_ID.toString() + " - " + this.orgGroupData[0].ORG_GROUP_NAME.toString();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, 'bindOrgGroups');
                        return [3 /*break*/, 8];
                    case 7:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    AtParActivityReportComponent.prototype.getMyPreferences = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.commonService.getMyPreferences('DEFAULT_REPORT_DURATION', this.deviceTokenEntry)
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    _this.defDateRange = parseInt(data.DataVariable.toString());
                                }
                            })];
                    case 1:
                        _a.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, 'getMyPreferences');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK];
                }
            });
        });
    };
    AtParActivityReportComponent.prototype.addDays = function (theDate, days) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000)];
            });
        });
    };
    AtParActivityReportComponent.prototype.bindDataGrid = function (fltr) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var frmDate, toDate, orgGroupId, retValue, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, 6, 7]);
                        frmDate = this.fromDate.toLocaleDateString();
                        toDate = this.toDate.toLocaleDateString();
                        orgGroupId = '';
                        retValue = false;
                        return [4 /*yield*/, this.validateSearchFields()];
                    case 2:
                        retValue = _a.sent();
                        if (!retValue) return [3 /*break*/, 4];
                        if (this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID] != "All") {
                            orgGroupId = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID].toString();
                        }
                        if (this.blnShowOrgGroupIdDropDown == true) {
                            orgGroupId = this.selectedOrgGroupId.toString();
                        }
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: 'Getting data....' });
                        return [4 /*yield*/, this.activityReportService.getActivityReportData(frmDate, toDate, this.appId, fltr, orgGroupId)
                                .catch(this.httpService.handleError).then(function (result) {
                                var data = result.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstActivityData = data.DataList;
                                        if (_this.lstActivityData.length > 0) {
                                            if (fltr == 0) {
                                                _this.filter = fltr;
                                                _this.labelData = [];
                                                _this.labelData.push(_this.lstActivityData.length);
                                                _this.chartDetailsDataset = [];
                                                _this.chartDetailsDataset.push({ label: 'Downloaded', backgroundColor: '#0000ff', borderColor: '#7CB342', data: [_this.lstActivityData[0].DOWNLOAD], fill: false });
                                                _this.chartDetailsDataset.push({ label: 'Sent', backgroundColor: '#90ee90', borderColor: '#7CB342', data: [_this.lstActivityData[0].SENT], fill: false });
                                                if (_this.appId == AtParEnums_1.EnumApps.Receiving || _this.appId == AtParEnums_1.EnumApps.PickPlan || _this.appId == AtParEnums_1.EnumApps.PutAway) {
                                                    _this.chartDetailsDataset.push({ label: 'Invalid', backgroundColor: '#ffff00', borderColor: '#7CB342', data: [_this.lstActivityData[0].INVALID], fill: false });
                                                }
                                                _this.chartDetailsDataset.push({ label: 'Error', backgroundColor: '#c00000', borderColor: '#7CB342', data: [_this.lstActivityData[0].ERROR], fill: false });
                                                _this.chartData = {
                                                    labels: _this.labelData,
                                                    datasets: _this.chartDetailsDataset
                                                };
                                                _this.blnTotal = true;
                                                _this.showChart = true;
                                                _this.blnUserId = false;
                                                _this.blnBunitCompany = false;
                                            }
                                            else if (fltr == 1) {
                                                _this.blnBunitCompany = true;
                                                _this.blnUserId = false;
                                                _this.blnTotal = false;
                                                _this.showChart = false;
                                                _this.filter = fltr;
                                            }
                                            else if (fltr == 2) {
                                                _this.blnUserId = true;
                                                _this.blnTotal = false;
                                                _this.blnBunitCompany = false;
                                                _this.showChart = false;
                                                _this.filter = fltr;
                                            }
                                            if (_this.appId == AtParEnums_1.EnumApps.Receiving || _this.appId == AtParEnums_1.EnumApps.PickPlan || _this.appId == AtParEnums_1.EnumApps.PutAway) {
                                                _this.blnInvalid = true;
                                            }
                                            _this.isVisible = true;
                                            _this.tdExports = true;
                                        }
                                        else {
                                            _this.showChart = false;
                                            _this.isVisible = false;
                                            _this.tdExports = false;
                                            _this.spinnerService.stop();
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                                        }
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
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5, 'bindDataGrid');
                        return [3 /*break*/, 7];
                    case 6:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    AtParActivityReportComponent.prototype.validateSearchFields = function () {
        try {
            this.growlMessage = [];
            if ((this.blnShowOrgGroupIdDropDown == true) && (this.selectedOrgGroupId == 'Select One' || this.selectedOrgGroupId == undefined || this.selectedOrgGroupId == '')) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Valid Org Group ID" });
                return false;
            }
            if (this.fromDate == null || this.fromDate.toString() == '' || this.toDate == null || this.toDate.toString() == '') {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select a Valid Date Range" });
                return false;
            }
            else if (Date.parse(this.fromDate.toString()) && Date.parse(this.toDate.toString())) {
                if (Date.parse(this.convertDateFormat(this.fromDate)) > Date.parse(this.convertDateFormat(this.toDate))) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "From Date should be less than To Date" });
                    return false;
                }
                if (Date.parse(this.convertDateFormat(this.toDate)) > Date.parse(this.convertDateFormat(this.currentDate))) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "To Date should be less than or equal to Today's Date" });
                    return false;
                }
                if (Date.parse(this.convertDateFormat(this.toDate)) < Date.parse(this.convertDateFormat(this.fromDate))) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "To Date must be greater than or equal to From Date" });
                    return false;
                }
            }
            else {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Dates' });
                return false;
            }
            return true;
        }
        catch (ex) {
            this.clientErrorMsg(ex, 'validateSearchFields');
            return false;
        }
    };
    AtParActivityReportComponent.prototype.convertDateFormat = function (strDate) {
        var date = new Date(strDate), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("/");
    };
    AtParActivityReportComponent.prototype.onExportToExcelClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, productScreenName, blob, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, 5, 6]);
                        event.stopImmediatePropagation();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.ExportReportDetails('Excel')];
                    case 1:
                        html = _a.sent();
                        if (!(html != '' && html != null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.screenName()];
                    case 2:
                        productScreenName = _a.sent();
                        blob = new Blob([html], {
                            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                        });
                        file_saver_1.saveAs(blob, productScreenName + 'ActivityReport.xls');
                        _a.label = 3;
                    case 3: return [3 /*break*/, 6];
                    case 4:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6, 'onExportToExcelClick');
                        return [3 /*break*/, 6];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AtParActivityReportComponent.prototype.ExportReportDetails = function (reqType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var htmlBuilder, sbMailText, imgserverPath, productScreenName, chartImage, image, title, ChartPath, i, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        htmlBuilder = '';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        this.growlMessage = [];
                        sbMailText = void 0;
                        imgserverPath = '';
                        return [4 /*yield*/, this.screenName()];
                    case 2:
                        productScreenName = _a.sent();
                        if (!(this.filter == 0)) return [3 /*break*/, 4];
                        chartImage = document.getElementById("myChart");
                        image = chartImage.toDataURL("image/png");
                        image = image.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.commonService.saveImage(image, productScreenName + "_activity_report").
                                then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        break;
                                    }
                                }
                            })];
                    case 3:
                        _a.sent();
                        this.chartName = productScreenName + '_activity_report.png';
                        _a.label = 4;
                    case 4: return [4 /*yield*/, this.commonService.getServerIP()
                            .catch(this.httpService.handleError)
                            .then(function (res) {
                            var data = res.json();
                            switch (data.StatType) {
                                case AtParEnums_1.StatusType.Success: {
                                    _this.ipAddress = data.DataVariable.toString();
                                    break;
                                }
                                case AtParEnums_1.StatusType.Error: {
                                    _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                    break;
                                }
                                case AtParEnums_1.StatusType.Warn: {
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                    break;
                                }
                                case AtParEnums_1.StatusType.Custom: {
                                    _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                    break;
                                }
                            }
                            if (data.StatType != AtParEnums_1.StatusType.Success) {
                                htmlBuilder = '';
                                return htmlBuilder;
                            }
                        })];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.commonService.getSSLConfigDetails()
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                _this.growlMessage = [];
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.gstrProtocal = data.Data.PROTOCOL.toString();
                                        _this.gstrServerName = data.Data.SERVER_NAME.toString();
                                        _this.gstrPortNo = data.Data.PORT_NO.toString();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                if (data.StatType != AtParEnums_1.StatusType.Success) {
                                    htmlBuilder = '';
                                    return htmlBuilder;
                                }
                            })];
                    case 6:
                        _a.sent();
                        imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/AtParWebApi/assets/images/';
                        title = '""' + "AtparVersion 3.0" + '""';
                        ChartPath = this.httpService.BaseUrl + '/Uploaded/';
                        htmlBuilder += "<Table align=left width=100% cellpadding=0 cellspacing = 0 vAlign=top>";
                        if (reqType == 'Print') {
                            htmlBuilder += "<TR width='100%'><td colspan=2 align=left  width='15%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg><img src=" + imgserverPath + "topbg.jpg width=75% height=63>"
                                + "</td></TR>";
                            htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>" + productScreenName + " Activity Report from <b> " + this.convertDateFormat(this.fromDate) + "</b> to <b>" + this.convertDateFormat(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp<tr><td></td></tr>";
                            htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "><img src=" + imgserverPath + "print.jpg></A>";
                        }
                        else {
                            if (reqType == 'Mail') {
                                htmlBuilder += "<TR width='100%'><td colspan=2 bgcolor='#fe9836' align=left  width='100%' nowrap><img src=" + imgserverPath + "logo.jpg></td></TR>";
                            }
                            else {
                                htmlBuilder += "<TR height=55><TD align=left colspan=2><IMG height=55 width=18% src=" + imgserverPath + "logo.jpg title=Atpar 3><img src=" + imgserverPath + "topbg.jpg width=82% height=55></TD></TR>";
                            }
                            htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                            htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td></td></tr>";
                            htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>" + productScreenName + " Activity Report from <b> " + this.convertDateFormat(this.fromDate) + "</b> to <b>" + this.convertDateFormat(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp";
                            htmlBuilder += "<tr><td colspan=12 align= left><span class=c2></span > </td><td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder += "</td></tr></table></td></tr><tr><td colspan=2> ";
                        htmlBuilder += "<tr><td colspan=2 align=center>";
                        if (this.filter == 0) {
                            htmlBuilder += "<table align=center  >";
                            htmlBuilder += "<tr bgcolor=#ffffff>";
                            if (reqType == "Mail") {
                                htmlBuilder += "<td align=center colspan=9 align=left nowrap width=700 height=250><span class=c3><img src= " + ChartPath + this.chartName + "  width=800 height=250></span></td>";
                            }
                            else {
                                htmlBuilder += "<td align=center colspan=9 align=left nowrap width=700 height=250><span class=c3><img src=" + ChartPath + this.chartName + "  width=800 height=250></span></td>";
                            }
                            htmlBuilder += "</tr></table>";
                        }
                        htmlBuilder += "<tr><td>";
                        htmlBuilder += "<table align=left width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>";
                        htmlBuilder += "<tr bgcolor=#d3d3d3>";
                        if (this.filter == 0) {
                            htmlBuilder += "<td align=center nowrap><span class=c2></span></td>";
                        }
                        if (this.filter == 1) {
                            htmlBuilder += "<td align=center nowrap><span class=c2><b>Business Unit/Company</b></span></td>";
                        }
                        if (this.filter == 2) {
                            htmlBuilder += "<td align=center nowrap><span class=c2><b>User</b></span></td>";
                        }
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>Download</b></span></td>";
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>Sent</b></span></td>";
                        if (this.appId == AtParEnums_1.EnumApps.Receiving || this.appId == AtParEnums_1.EnumApps.PickPlan || this.appId == AtParEnums_1.EnumApps.PutAway) {
                            htmlBuilder += "<td align=center nowrap><span class=c2><b>Invalid</b></span></td>";
                        }
                        htmlBuilder += "<td align=center nowrap><span class=c2><b>Error</b></span></td>";
                        htmlBuilder += "</tr>";
                        if (this.lstActivityData.length > 0) {
                            for (i = 0; i < this.lstActivityData.length; i++) {
                                htmlBuilder += "<tr>";
                                if (this.filter == 0) {
                                    htmlBuilder += "<td align=left nowrap><span class=c3>Total</span></td>";
                                }
                                else if (this.filter == 1) {
                                    htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstActivityData[i].BUSINESS_UNIT + "</span></td>";
                                }
                                else if (this.filter == 2) {
                                    htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstActivityData[i].USER_ID + "</span></td>";
                                }
                                htmlBuilder += "<td align=right nowrap><span class=c2>" + this.lstActivityData[i].DOWNLOAD + "</span></td>";
                                htmlBuilder += "<td align=right nowrap><span class=c2>" + this.lstActivityData[i].SENT + "</span></td>";
                                if (this.appId == AtParEnums_1.EnumApps.Receiving || this.appId == AtParEnums_1.EnumApps.PickPlan || this.appId == AtParEnums_1.EnumApps.PutAway) {
                                    htmlBuilder += "<td align=right nowrap><span class=c2>" + this.lstActivityData[i].INVALID + "</span></td>";
                                }
                                htmlBuilder += "<td align=right nowrap><span class=c2>" + this.lstActivityData[i].ERROR + "</span></td>";
                                htmlBuilder += "</tr>";
                            }
                        }
                        htmlBuilder += "</table></td></tr>";
                        htmlBuilder += "</Table>";
                        return [4 /*yield*/, htmlBuilder];
                    case 7: return [2 /*return*/, _a.sent()];
                    case 8:
                        ex_7 = _a.sent();
                        htmlBuilder = '';
                        this.clientErrorMsg(ex_7, 'ExportReportDetails');
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    AtParActivityReportComponent.prototype.onPrintClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, appProductName, mywindow, ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, 5, 6]);
                        event.stopImmediatePropagation();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.ExportReportDetails('Print')];
                    case 1:
                        html = _a.sent();
                        if (!(html != '' && html != null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.screenName()];
                    case 2:
                        appProductName = _a.sent();
                        mywindow = window.open(document.URL, null, 'height=650,width=650,status=no,resizable=yes, scrollbars=yes, toolbar=no,location=center,menubar=no');
                        if (mywindow != null && mywindow != undefined) {
                            mywindow.document.write('<html><head><title>' + appProductName + ' Activity Report' + '</title>');
                            mywindow.document.write('</head><body >');
                            mywindow.document.write(html);
                            mywindow.document.write('</body></html>');
                            mywindow.document.close();
                            mywindow.focus();
                            return [2 /*return*/, true];
                        }
                        else {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please set allow pop-ups for this site in your browser' });
                        }
                        _a.label = 3;
                    case 3: return [3 /*break*/, 6];
                    case 4:
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8, 'onPrintClick');
                        return [2 /*return*/, false];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AtParActivityReportComponent.prototype.onSendMailIconClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
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
    AtParActivityReportComponent.prototype.onSendMailClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var val, html, toAddr, appProductName, ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, 6, 7]);
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
                        this.isMailDialog = false;
                        return [4 /*yield*/, this.ExportReportDetails('Mail')];
                    case 1:
                        html = _a.sent();
                        toAddr = '';
                        return [4 /*yield*/, this.screenName()];
                    case 2:
                        appProductName = _a.sent();
                        if (!(html != '' && html != null)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.commonService.sendEmbeddedEmail(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId], appProductName + ' Activity Report', JSON.stringify(html), this.toMailAddr, this.chartName, false, AtParEnums_1.MailPriority.Normal.toString(), '')
                                .then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                            })];
                    case 3:
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
                        _a.label = 4;
                    case 4:
                        this.isMailDialog = false;
                        this.toMailAddr = '';
                        return [3 /*break*/, 7];
                    case 5:
                        ex_9 = _a.sent();
                        this.clientErrorMsg(ex_9, 'onSendMailClick');
                        return [3 /*break*/, 7];
                    case 6:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    AtParActivityReportComponent.prototype.validateEmail = function (email) {
        var ret = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return ret.test(email);
    };
    AtParActivityReportComponent.prototype.closeMailPopup = function () {
        this.growlMessage = [];
    };
    AtParActivityReportComponent.prototype.clientErrorMsg = function (ex, funName) {
        this.growlMessage = [];
        this.atparConstants.catchClientError(this.growlMessage, this.spinnerService, ex.toString(), funName, this.constructor.name);
    };
    AtParActivityReportComponent.prototype.screenName = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.appId == AtParEnums_1.EnumApps.CartCount) {
                    this.productName = "CartCount";
                }
                else if (this.appId == AtParEnums_1.EnumApps.CycleCount) {
                    this.productName = "CycleCount";
                }
                else if (this.appId == AtParEnums_1.EnumApps.Receiving) {
                    this.productName = "Receive";
                }
                else if (this.appId == AtParEnums_1.EnumApps.PickPlan) {
                    this.productName = "PickPlan";
                }
                else if (this.appId == AtParEnums_1.EnumApps.PutAway) {
                    this.productName = "PutAway";
                }
                return [2 /*return*/, this.productName];
            });
        });
    };
    AtParActivityReportComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.lstActivityData = null;
        this.lstOrgGroups = null;
        this.growlMessage = null;
        this.orgGroupData = null;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AtParActivityReportComponent.prototype, "productId", void 0);
    AtParActivityReportComponent = __decorate([
        core_1.Component({
            selector: 'atpar-activity-report',
            templateUrl: 'atpar-activity-report.component.html',
            providers: [HttpService_1.HttpService, AtParConstants_1.AtParConstants, atpar_common_service_1.AtParCommonService, atpar_activity_report_service_1.AtParActivityReportServices]
        }),
        __metadata("design:paramtypes", [HttpService_1.HttpService,
            AtParConstants_1.AtParConstants,
            atpar_common_service_1.AtParCommonService,
            event_spinner_service_1.SpinnerService,
            atpar_activity_report_service_1.AtParActivityReportServices])
    ], AtParActivityReportComponent);
    return AtParActivityReportComponent;
}());
exports.AtParActivityReportComponent = AtParActivityReportComponent;
//# sourceMappingURL=atpar-activity-report.component.js.map