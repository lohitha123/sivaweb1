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
var AtParEnums_1 = require("../Shared/AtParEnums");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var HttpService_1 = require("../Shared/HttpService");
var http_1 = require("@angular/http");
var AtParEnums_2 = require("../Shared/AtParEnums");
var AtParSharedDataService_1 = require("../Shared/AtParSharedDataService");
var router_1 = require("@angular/router");
var AtParEnums_3 = require("../Shared/AtParEnums");
var routepath_1 = require("../AtPar/Menus/routepath");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var pou_physician_usage_report_component_service_1 = require("./pou-physician-usage-report.component.service");
var VM_POU_PHYSICIAN_USAGE_DETAILS_1 = require("../../app/Entities/VM_POU_PHYSICIAN_USAGE_DETAILS");
var linq_es5_1 = require("linq-es5");
var file_saver_1 = require("file-saver");
var PhysicianUsageReportComponent = (function () {
    function PhysicianUsageReportComponent(httpService, _http, dataservice, commonService, physicianUsageService, spinnerService, atParConstant, router, route, atParSharedDataService) {
        this.httpService = httpService;
        this._http = _http;
        this.dataservice = dataservice;
        this.commonService = commonService;
        this.physicianUsageService = physicianUsageService;
        this.spinnerService = spinnerService;
        this.atParConstant = atParConstant;
        this.router = router;
        this.route = route;
        this.atParSharedDataService = atParSharedDataService;
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.selectedPhysician = "";
        this.selectedPhysicianValue = "";
        this.selectedProcedure = "";
        this.selectedProcedureValue = "";
        this.lstPhysiciansItems = [];
        this.lstPhysiciansItemsList = [];
        this.lstDBData = [];
        this.lstFormData = [];
        this.lstCompareDetailsData = [];
        this.lstCompareHeadersData = [];
        this.lstDBDetailsData = [];
        this.lstcompareData1 = [];
        this.lstcompareData2 = [];
        this.lstcompareData3 = [];
        this.lstcompareData4 = [];
        this.lstFinalComparedate = [];
        this.strCode = "";
        this.strDescr = "";
        this.strProcedureCode = "procedures";
        this.defDateRange = 0;
        this.statusCode = -1;
        this.minDateValue1 = new Date();
        this.showGrid = false;
        this.Chartdata = [];
        this.data1 = [];
        this.detailsChartData = [];
        this.label = [];
        this.dataSetlabel = [];
        this.dataSetbgcolor = [];
        this.dataSetbordercolor = [];
        this.dataSetdata = [];
        this.showControls = true;
        this.showGridForDetails = false;
        this.tdExports = false;
        this.lblProcedureCode = "";
        this.showDetailsGridForSingleRow = false;
        this.isMailDialog = false;
        this.toMailAddr = '';
        this.totalRetCost = 0;
        this.totalUsedCost = 0;
        this.totalWastageCost = 0;
        this.noOfrecordsMsg = "";
        this.phyName = "";
        this.breadCrumbMenu = new routepath_1.Menus();
    }
    PhysicianUsageReportComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.spinnerService.start();
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                        _a = this;
                        return [4 /*yield*/, this.getDefDateRange()];
                    case 1:
                        _a.statusCode = _c.sent();
                        if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Failed to get Default data range" });
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        this.fromDate = new Date();
                        _b = this;
                        return [4 /*yield*/, this.addDays(this.fromDate, this.defDateRange)];
                    case 2:
                        _b.fromDate = _c.sent();
                        this.toDate = new Date();
                        this.spinnerService.stop();
                        return [2 /*return*/];
                }
            });
        });
    };
    PhysicianUsageReportComponent.prototype.getDefDateRange = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 5]);
                        return [4 /*yield*/, this.commonService.GetMyPreferences("DEFAULT_REPORT_DURATION", this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID]).
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
                        ex_1 = _a.sent();
                        return [4 /*yield*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PhysicianUsageReportComponent.prototype.addDays = function (theDate, days) {
        return new Date(theDate.getTime() - days * 24 * 60 * 60 * 1000);
    };
    PhysicianUsageReportComponent.prototype.onfocusFromCalendar = function (e) {
        localStorage.removeItem("FromDate");
        this.date1 = null;
    };
    PhysicianUsageReportComponent.prototype.onfocusToCalendar = function (e) {
        this.date2 = null;
        if (this.date1 == null) {
            this.minDateValue2 = new Date();
        }
        else {
            this.minDateValue2 = this.date1;
        }
    };
    PhysicianUsageReportComponent.prototype.fillPhysiciansAuto = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var query, ex_2;
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
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.lstPhysicians = data.DataList;
                                        _this.lstPhysiciansItemsList = _this.filterPhysicianItems(query, _this.lstPhysicians);
                                        _this.lstPhysiciansItems = [];
                                        for (var i = 0; i <= _this.lstPhysiciansItemsList.length - 1; i++) {
                                            _this.lstPhysiciansItems[i] = _this.lstPhysiciansItemsList[i].FIRST_NAME + " " + _this.lstPhysiciansItemsList[i].MIDDLE_INITIAL + " " + _this.lstPhysiciansItemsList[i].LAST_NAME + "(" + _this.lstPhysiciansItemsList[i].PHYSICIAN_ID + ")";
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        if (data.DataList.length == 0 && data.StatusCode === 1102002) {
                                            _this.growlMessage = [];
                                        }
                                        else {
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
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
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PhysicianUsageReportComponent.prototype.filterPhysicianItems = function (query, items) {
        var filtered = [];
        if (query == "%") {
            var _loop_1 = function (i) {
                var itemValue = items[i];
                if ((filtered.filter(function (x) { return x.PHYSICIAN_ID == itemValue.PHYSICIAN_ID; })).length == 0) {
                    filtered.push(itemValue);
                }
            };
            for (var i = 0; i < items.length; i++) {
                _loop_1(i);
            }
        }
        else {
            if (query.length >= 0) {
                var _loop_2 = function (i) {
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
                    _loop_2(i);
                }
            }
        }
        return filtered;
    };
    PhysicianUsageReportComponent.prototype.fillProceduresAuto = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var query, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstProcedureCodesItems = [];
                        this.lstProcedureCodes = [];
                        query = event.query;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.commonService.getCodes(this.strProcedureCode, this.strCode, this.strDescr).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.lstProcedureCodesItems = data.DataList;
                                        _this.lstProcedureCodes = _this.filterProcedureCodesItems(query, _this.lstProcedureCodesItems);
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        if (data.DataList.length == 0 && data.StatusCode === 1102002) {
                                            _this.growlMessage = [];
                                        }
                                        else {
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        }
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
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
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PhysicianUsageReportComponent.prototype.filterProcedureCodesItems = function (query, items) {
        var filtered = [];
        if (query == "%") {
            for (var i = 0; i < items.length; i++) {
                var itemValue = items[i];
                if (items[i].CODE !== "") {
                    var itemValue_1 = items[i].CODE + " - " + items[i].DESCRIPTION;
                    filtered.push(itemValue_1);
                }
                //else if (items[i].CODE !== "" && items[i].DESCRIPTION === "") {
                //    let itemValue = items[i].CODE;
                //    filtered.push(itemValue);
                //}
            }
        }
        else {
            if (query.length >= 0) {
                for (var i = 0; i < items.length; i++) {
                    if (items[i].CODE.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        if (items[i].CODE !== "") {
                            var itemValue = items[i].CODE + " - " + items[i].DESCRIPTION;
                            filtered.push(itemValue);
                        }
                        //else if (items[i].CODE !== "" && items[i].DESCRIPTION === "") {
                        //    let itemValue = items[i].CODE;
                        //    filtered.push(itemValue);
                        //}
                    }
                }
            }
        }
        return filtered;
    };
    PhysicianUsageReportComponent.prototype.bindGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var presentDate, cDate, frmDate, todate, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        if (this.selectedProcedure == undefined || this.selectedProcedure === "") {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select procedure" });
                            return [2 /*return*/];
                        }
                        if (this.fromDate > this.toDate) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "From Date should be less than To Date" });
                            return [2 /*return*/];
                        }
                        presentDate = new Date();
                        if (this.toDate > presentDate) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "To Date should not be greater than Present Date" });
                            return [2 /*return*/];
                        }
                        if (this.fromDate > presentDate) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "From Date should not be greater than Present Date" });
                            return [2 /*return*/];
                        }
                        this.showDetailsGridForSingleRow = false;
                        this.showGridForDetails = false;
                        this.showGrid = false;
                        this.tdExports = false;
                        this.spinnerService.start();
                        cDate = new Date();
                        cDate.setDate(this.toDate.getDate() + 1);
                        frmDate = this.convert(this.fromDate);
                        todate = this.convert(cDate);
                        if (this.selectedPhysician !== "") {
                            this.selectedPhysicianValue = this.selectedPhysician.split("(")[1].replace(")", "").trim();
                        }
                        this.selectedProcedureValue = this.selectedProcedure.split("-")[0].trim();
                        this.lblProcedureCode = this.selectedProcedure;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.physicianUsageService.GetPhysicianUsage(this.selectedPhysicianValue, this.selectedProcedureValue, frmDate, todate, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID]).catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.showGrid = true;
                                        _this.tdExports = true;
                                        var bgcolor = "#3391CE";
                                        var borderColor = "#1E88E5";
                                        var label = "data";
                                        _this.label = [];
                                        _this.dataSetbgcolor = [];
                                        _this.dataSetdata = [];
                                        _this.dataSetbordercolor = [];
                                        _this.lstDBData = data.DataList;
                                        for (var i = 0; i <= data.DataList.length - 1; i++) {
                                            _this.lstDBData[i].TOTALCOST = parseFloat(_this.lstDBData[i].TOTALCOST).toFixed(2);
                                            _this.lstDBData[i].UNUSEDCOST = parseFloat(_this.lstDBData[i].UNUSEDCOST).toFixed(2);
                                            _this.lstDBData[i].RETURNCOST = parseFloat(_this.lstDBData[i].RETURNCOST).toFixed(2);
                                            var perFormDate = [];
                                            if (data.DataList[i].PERFORM_DATE != '' && data.DataList[i].PERFORM_DATE != null) {
                                                perFormDate = data.DataList[i].PERFORM_DATE.split(':');
                                                _this.lstDBData[i].STRPERFORM_DATE = perFormDate[0] + ":" + perFormDate[1];
                                            }
                                            _this.label.push(data.DataList[i].STRPERFORM_DATE);
                                            _this.dataSetdata.push(data.DataList[i].TOTALCOST);
                                            _this.dataSetbgcolor.push(bgcolor);
                                            _this.dataSetbordercolor.push(borderColor);
                                        }
                                        _this.option = {
                                            scales: {
                                                yAxes: [{
                                                        stacked: true,
                                                        gridLines: {
                                                            display: true,
                                                            color: "rgba(255,99,132,0.2)"
                                                        },
                                                        scaleLabel: {
                                                            display: true,
                                                            labelString: 'Total Cost'
                                                        }
                                                    }],
                                                xAxes: [{
                                                        gridLines: {
                                                            display: false,
                                                            color: "rgba(255,99,132,0.2)"
                                                        },
                                                        scaleLabel: {
                                                            display: true,
                                                            labelString: 'Physician'
                                                        }
                                                    }]
                                            }
                                        };
                                        _this.data1 = {
                                            labels: _this.label,
                                            datasets: [
                                                {
                                                    label: '',
                                                    backgroundColor: _this.dataSetbgcolor,
                                                    borderColor: _this.dataSetbordercolor,
                                                    data: _this.dataSetdata,
                                                    //borderWidth: 1,
                                                    //hoverBackgroundColor: "rgba(255,99,132,0.4)",
                                                    //hoverBorderColor: "rgba(255,99,132,1)",
                                                    title: "Physician Usage"
                                                }
                                            ],
                                            options: _this.option
                                        };
                                        //for (let j = 0; j <= this.lstDBData.length - 1; j++) {
                                        //    this.lstDBData[j].TOTALCOST = parseFloat(this.lstDBData[j].TOTALCOST).toFixed(2);
                                        //    this.lstDBData[j].UNUSEDCOST = parseFloat(this.lstDBData[j].UNUSEDCOST).toFixed(2);
                                        //    this.lstDBData[j].RETURNCOST = parseFloat(this.lstDBData[j].RETURNCOST).toFixed(2);
                                        //}
                                        _this.noOfrecordsMsg = data.DataList.length + " Record(s) Found";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.showGrid = false;
                                        _this.tdExports = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.showGrid = false;
                                        _this.tdExports = false;
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.showGrid = false;
                                        _this.tdExports = false;
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PhysicianUsageReportComponent.prototype.convert = function (str) {
        var date = new Date(str), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("/");
    };
    PhysicianUsageReportComponent.prototype.selectedDetailsRow = function (ven) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        this.showGrid = false;
                        this.showControls = false;
                        this.showGridForDetails = false;
                        this.showDetailsGridForSingleRow = false;
                        this.tdExports = false;
                        this.lstFormData = [];
                        this.lstFormData.push(ven);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.physicianUsageService.GetPhysicianCompareDetails(this.lstFormData).catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.showDetailsGridForSingleRow = true;
                                        var bgcolor = "#3391CE";
                                        var borderColor = "#1E88E5";
                                        var label = "data";
                                        _this.label = [];
                                        _this.dataSetbgcolor = [];
                                        _this.dataSetdata = [];
                                        _this.dataSetbordercolor = [];
                                        for (var i = 0; i <= _this.lstFormData.length - 1; i++) {
                                            _this.label.push(_this.lstFormData[i].STRPERFORM_DATE);
                                            _this.dataSetdata.push(_this.lstFormData[i].TOTALCOST);
                                            _this.dataSetbgcolor.push(bgcolor);
                                            _this.dataSetbordercolor.push(borderColor);
                                        }
                                        _this.option = {
                                            scales: {
                                                yAxes: [{
                                                        stacked: true,
                                                        gridLines: {
                                                            display: true,
                                                            color: "rgba(255,99,132,0.2)"
                                                        },
                                                        scaleLabel: {
                                                            display: true,
                                                            labelString: 'Total Cost'
                                                        }
                                                    }],
                                                xAxes: [{
                                                        gridLines: {
                                                            display: false,
                                                            color: "rgba(255,99,132,0.2)"
                                                        },
                                                        scaleLabel: {
                                                            display: true,
                                                            labelString: 'Physician'
                                                        }
                                                    }]
                                            }
                                        };
                                        _this.detailsChartData = {
                                            labels: _this.label,
                                            datasets: [
                                                {
                                                    label: '',
                                                    backgroundColor: _this.dataSetbgcolor,
                                                    borderColor: _this.dataSetbordercolor,
                                                    data: _this.dataSetdata,
                                                    barwidth: '30px'
                                                }
                                            ],
                                            options: _this.option
                                        };
                                        _this.lstDBDetailsData = data.DataList;
                                        _this.totalRetCost = 0;
                                        _this.totalUsedCost = 0;
                                        _this.totalWastageCost = 0;
                                        for (var j = 0; j <= _this.lstDBDetailsData.length - 1; j++) {
                                            var returnQty = _this.lstDBDetailsData[j].ITEM_COUNT - _this.lstDBDetailsData[j].USED_QTY;
                                            _this.lstDBDetailsData[j].ITEM_COUNT = parseFloat(_this.lstDBDetailsData[j].ITEM_COUNT).toFixed(2);
                                            _this.lstDBDetailsData[j].WASTAGE_QTY = parseFloat(_this.lstDBDetailsData[j].WASTAGE_QTY).toFixed(2);
                                            _this.lstDBDetailsData[j].USED_QTY = parseFloat(_this.lstDBDetailsData[j].USED_QTY).toFixed(2);
                                            _this.lstDBDetailsData[j].SUMRETURN = parseFloat(_this.lstDBDetailsData[j].SUMRETURN).toFixed(2);
                                            _this.lstDBDetailsData[j].RETURNQTY = parseFloat(returnQty.toString()).toFixed(2);
                                            _this.lstDBDetailsData[j].SUMUSED = parseFloat(_this.lstDBDetailsData[j].SUMUSED).toFixed(2);
                                            _this.lstDBDetailsData[j].SUMWASTAGE = parseFloat(_this.lstDBDetailsData[j].SUMWASTAGE).toFixed(2);
                                            _this.lstDBDetailsData[j].ISSUE_PRICE = +parseFloat(_this.lstDBDetailsData[j].ISSUE_PRICE.toString()).toFixed(2);
                                            _this.totalRetCost = parseFloat(_this.totalRetCost) + parseFloat(_this.lstDBDetailsData[j].SUMRETURN.toString());
                                            _this.totalWastageCost = parseFloat(_this.totalWastageCost) + parseFloat(_this.lstDBDetailsData[j].SUMWASTAGE.toString());
                                            _this.totalUsedCost = parseFloat(_this.totalUsedCost) + parseFloat(_this.lstDBDetailsData[j].SUMUSED);
                                        }
                                        _this.totalRetCost = parseFloat(_this.totalRetCost).toFixed(2);
                                        _this.totalWastageCost = parseFloat(_this.totalWastageCost).toFixed(2);
                                        _this.totalUsedCost = parseFloat(_this.totalUsedCost).toFixed(2);
                                        _this.phyName = "Dr. " + ven.PHYSICIAN_NAME + " " + ven.PERFORM_DATE;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.showDetailsGridForSingleRow = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.showDetailsGridForSingleRow = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.showDetailsGridForSingleRow = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PhysicianUsageReportComponent.prototype.filterdata = function (event) {
        this.lstgridfilterData = new Array();
        this.lstgridfilterData = event;
    };
    PhysicianUsageReportComponent.prototype.selectedRow = function (event, ven) {
        if (event == true) {
            this.lstCompareDetailsData.push(ven);
        }
    };
    PhysicianUsageReportComponent.prototype.checkAll = function () {
        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
        this.lstCompareDetailsData = [];
        try {
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstDBData[i].Status = true;
                    this.lstCompareDetailsData.push(this.lstgridfilterData[i]);
                }
            }
            else {
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }
                for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstDBData[i].Status = true;
                    this.lstCompareDetailsData.push(this.lstDBData[i]);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    PhysicianUsageReportComponent.prototype.uncheckAll = function () {
        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
        try {
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstDBData[i].Status = false;
                    var index = this.lstCompareDetailsData.indexOf(this.lstgridfilterData[i], 0);
                    if (index > -1) {
                        this.lstCompareDetailsData.splice(index, 1);
                    }
                }
            }
            else {
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }
                for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstDBData[i].Status = false;
                    var index = this.lstCompareDetailsData.indexOf(this.lstDBData[i], 0);
                    if (index > -1) {
                        this.lstCompareDetailsData.splice(index, 1);
                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    PhysicianUsageReportComponent.prototype.compareDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        this.lstCompareHeadersData = this.lstCompareDetailsData;
                        if (this.lstCompareHeadersData.length <= 1) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select 2,3 or 4 Physicians to compare" });
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        this.showGrid = false;
                        this.showControls = false;
                        this.showDetailsGridForSingleRow = false;
                        this.showGridForDetails = true;
                        this.tdExports = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.physicianUsageService.GetPhysicianCompareDetails(this.lstCompareHeadersData).catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        var bgcolor = "#3391CE";
                                        var borderColor = "#1E88E5";
                                        var label = "data";
                                        _this.label = [];
                                        _this.dataSetbgcolor = [];
                                        _this.dataSetdata = [];
                                        _this.dataSetbordercolor = [];
                                        for (var i = 0; i <= _this.lstCompareHeadersData.length - 1; i++) {
                                            _this.label.push(_this.lstCompareHeadersData[i].PERFORM_DATE);
                                            _this.dataSetdata.push(_this.lstCompareHeadersData[i].TOTALCOST);
                                            _this.dataSetbgcolor.push(bgcolor);
                                            _this.dataSetbordercolor.push(borderColor);
                                        }
                                        _this.option = {
                                            scales: {
                                                yAxes: [{
                                                        stacked: true,
                                                        gridLines: {
                                                            display: true,
                                                            color: "rgba(255,99,132,0.2)"
                                                        },
                                                        scaleLabel: {
                                                            display: true,
                                                            labelString: 'Total Cost'
                                                        }
                                                    }],
                                                xAxes: [{
                                                        gridLines: {
                                                            display: false,
                                                            color: "rgba(255,99,132,0.2)"
                                                        },
                                                        scaleLabel: {
                                                            display: true,
                                                            labelString: 'Physician'
                                                        }
                                                    }]
                                            }
                                        };
                                        _this.detailsChartData = {
                                            labels: _this.label,
                                            datasets: [
                                                {
                                                    label: '',
                                                    backgroundColor: _this.dataSetbgcolor,
                                                    borderColor: _this.dataSetbordercolor,
                                                    data: _this.dataSetdata,
                                                    barwidth: '30px'
                                                }
                                            ],
                                            options: _this.option
                                        };
                                        _this.lstcompareData2 = [];
                                        _this.lstDBDetailsData = data.DataList;
                                        _this.lstcompareData1 = linq_es5_1.asEnumerable(_this.lstDBDetailsData).Distinct(function (x) { return x.ITEM_ID; }).ToArray();
                                        var Physcian_1;
                                        var Procedure_1;
                                        var Caseid_1;
                                        var ItemId_1;
                                        var lstItem;
                                        _this.lstFinalComparedate = [];
                                        for (var i = 0; i <= _this.lstCompareHeadersData.length - 1; i++) {
                                            Physcian_1 = _this.lstCompareHeadersData[i].PHYSICIAN_ID;
                                            Procedure_1 = _this.lstCompareHeadersData[i].PROCEDURE_CODE.split("-")[0];
                                            Caseid_1 = _this.lstCompareHeadersData[i].CASE_ID;
                                            for (var j = 0; j <= _this.lstcompareData1.length - 1; j++) {
                                                if (_this.lstcompareData1[j].Details == null) {
                                                    _this.lstcompareData1[j].Details = [];
                                                }
                                                lstItem = new VM_POU_PHYSICIAN_USAGE_DETAILS_1.VM_POU_PHYSICIAN_USAGE_DETAILS();
                                                lstItem.CASE_ID = Caseid_1;
                                                lstItem.EXAM_ID = Procedure_1;
                                                lstItem.PHYSICIAN_ID = Physcian_1;
                                                ItemId_1 = _this.lstcompareData1[j].ITEM_ID;
                                                console.log(ItemId_1);
                                                var Itmdetls = _this.lstDBDetailsData.filter(function (d) { return d.ITEM_ID == ItemId_1 && d.CASE_ID == Caseid_1 && d.EXAM_ID == Procedure_1 && d.PHYSICIAN_ID == Physcian_1; });
                                                if (Itmdetls.length > 0) {
                                                    lstItem.ITEM_ID = ItemId_1;
                                                    lstItem.ISSUE_PRICE = Itmdetls[0].ISSUE_PRICE;
                                                    lstItem.ISSUE_UOM = Itmdetls[0].ISSUE_UOM;
                                                    lstItem.ITEM_COUNT = Itmdetls[0].ITEM_COUNT;
                                                    lstItem.ITEM_DESCRIPTION = Itmdetls[0].ITEM_DESCRIPTION;
                                                    lstItem.WASTAGE_QTY = Itmdetls[0].WASTAGE_QTY;
                                                    lstItem.USED_QTY = Itmdetls[0].USED_QTY;
                                                    lstItem.SUMRETURN = Itmdetls[0].SUMRETURN;
                                                    lstItem.SUMWASTAGE = Itmdetls[0].SUMWASTAGE;
                                                    lstItem.SUMUSED = Itmdetls[0].SUMUSED;
                                                }
                                                else {
                                                    lstItem.ITEM_ID = ItemId_1;
                                                    lstItem.ISSUE_PRICE = 0;
                                                    lstItem.ISSUE_UOM = _this.lstcompareData1[j].ISSUE_UOM;
                                                    lstItem.ITEM_COUNT = 0;
                                                    lstItem.ITEM_DESCRIPTION = _this.lstcompareData1[j].ITEM_DESCRIPTION;
                                                    lstItem.WASTAGE_QTY = 0;
                                                    lstItem.USED_QTY = 0;
                                                    lstItem.SUMRETURN = 0;
                                                    lstItem.SUMWASTAGE = 0;
                                                    lstItem.SUMUSED = 0;
                                                }
                                                _this.lstcompareData1[j].Details.push(lstItem);
                                                _this.lstFinalComparedate.push(lstItem);
                                            }
                                        }
                                        _this.totalRetCost = 0;
                                        _this.totalUsedCost = 0;
                                        for (var j = 0; j <= _this.lstcompareData1.length - 1; j++) {
                                            _this.lstcompareData1[j].DetailsTotals = [];
                                            for (var k = 0; k <= _this.lstcompareData1[j].Details.length - 1; k++) {
                                                _this.totalRetCost = _this.totalRetCost + _this.lstcompareData1[j].Details[k].SUMRETURN;
                                                _this.totalUsedCost = _this.totalUsedCost + _this.lstcompareData1[j].Details[k].SUMUSED;
                                            }
                                            _this.totalRetCost = parseFloat(_this.totalRetCost).toFixed(2);
                                            _this.totalUsedCost = parseFloat(_this.totalUsedCost).toFixed(2);
                                            _this.lstcompareData1[j].DetailsTotals.ReturnCost = _this.totalRetCost;
                                            _this.lstcompareData1[j].DetailsTotals.UsedCost = _this.totalUsedCost;
                                        }
                                        //for (let j = 0; j <= this.lstcompareData1.length - 1; j++)
                                        //{
                                        //    for (let k = 0; k <= this.lstcompareData1[j].Details.length - 1; k++) {
                                        //        this.totalRetCost = this.totalRetCost + this.lstcompareData1[j].Details[k].SUMRETURN;
                                        //        this.totalUsedCost = this.totalUsedCost + this.lstcompareData1[j].Details[k].SUMUSED;
                                        //        j = j + 1;
                                        //    }
                                        //}
                                        _this.lstFinalComparedate = linq_es5_1.asEnumerable(_this.lstFinalComparedate).OrderBy(function (x) { return x.ITEM_ID; }).ToArray();
                                        console.log(_this.lstcompareData1);
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                                _this.lstCompareDetailsData = [];
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PhysicianUsageReportComponent.prototype.onSendMailIconClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.growlMessage = [];
                    this.isMailDialog = true;
                    this.toMailAddr = '';
                }
                catch (ex) {
                    this.clientErrorMsg(ex);
                }
                return [2 /*return*/];
            });
        });
    };
    PhysicianUsageReportComponent.prototype.onSendMailClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var val, html, toAddr, ex_7;
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
                        this.isMailDialog = false;
                        return [4 /*yield*/, this.exportReportDetails('Mail')];
                    case 1:
                        html = _a.sent();
                        toAddr = '';
                        if (!(html != '' && html != null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.commonService.sendEmail(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId], 'Physician Usage Report', JSON.stringify(html), this.toMailAddr, AtParEnums_3.MailPriority.Normal.toString(), '')
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
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Email Server not configured! Please contact Administrator' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_SEND_FAILED) {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Mail Not Sent. Please Try Again' });
                        }
                        else {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Error while sending mail' });
                        }
                        _a.label = 3;
                    case 3:
                        this.toMailAddr = '';
                        return [3 /*break*/, 6];
                    case 4:
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7);
                        return [3 /*break*/, 6];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    PhysicianUsageReportComponent.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    PhysicianUsageReportComponent.prototype.onPrintClick = function (event) {
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
                                mywindow.document.write('<html><head><title>' + 'Point OF Use - Physician Usage Report' + '</title>');
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
                            }
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_8 = _a.sent();
                        this.clientErrorMsg(ex_8);
                        return [2 /*return*/, false];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PhysicianUsageReportComponent.prototype.onExportToExcelClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, blob, ex_9;
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
                            file_saver_1.saveAs(blob, "PhysicianUsageReport.xls");
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_9 = _a.sent();
                        this.clientErrorMsg(ex_9);
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PhysicianUsageReportComponent.prototype.exportReportDetails = function (reqType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var chartImage, image, htmlBuilder, sbMailText, _strFrmDt, _strToDt, imgserverPath, imgPhyUsagePath, phyname, title, i, ex_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chartImage = document.getElementById("ChartId");
                        image = chartImage.toDataURL("image/png");
                        image = image.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.commonService.saveImage(image, "physician").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        htmlBuilder = '';
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, , 7]);
                        this.statusCode = -1;
                        this.growlMessage = [];
                        sbMailText = void 0;
                        _strFrmDt = void 0;
                        _strToDt = void 0;
                        imgserverPath = '';
                        imgPhyUsagePath = '';
                        return [4 /*yield*/, this.commonService.getServerIP()
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
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.commonService.getSSLConfigDetails()
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
                    case 4:
                        _a.sent();
                        phyname = void 0;
                        //imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/PROJ/new/RSPAClient/WebApi/AtParWebApi/Uploaded/';
                        imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
                        imgPhyUsagePath = this.httpService.BaseUrl + '/Uploaded/';
                        title = '""' + "AtparVersion 2.8" + '""';
                        htmlBuilder = "<Table align=center width=90% cellpadding=0 cellspacing = 0 vAlign=top>";
                        if (reqType == 'Excel') {
                            htmlBuilder += "<TR width='100%'><td align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR></table>";
                            htmlBuilder += "<table width=90% align=center>";
                        }
                        else if (reqType == "Mail") {
                            htmlBuilder += "<TR height=63><td colspan=2 align=left bgcolor='#fe9836' width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg></td></TR>";
                        }
                        else {
                            htmlBuilder += "<TR height=63><TD align=left colspan=2><IMG height=63 width=18% src=" + imgserverPath + "logo.jpg title=Atpar 3><img src=" + imgserverPath + "topbg.jpg width=82% height=63></TD></TR>";
                        }
                        htmlBuilder += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                            "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                        htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                        if (reqType == 'Print') {
                            htmlBuilder += "<tr><td colspan=3 align=left><span class=c3><b>Physician Usage Report From &nbsp;&nbsp;" + this.convertDateFormate(this.fromDate) + " to " + this.convertDateFormate(this.toDate) + "</span></td>";
                            htmlBuilder += "<td><A  href=" + "" + "javascript:window.print()" + "><img src=" + imgserverPath + "print.jpg></A></td></tr>";
                            htmlBuilder += "<tr><td align=right valign=top>&nbsp;";
                        }
                        else {
                            htmlBuilder += "<tr><td colspan=3 align=left><span class=c3><b>Physician Usage Report From &nbsp;&nbsp;" + this.convertDateFormate(this.fromDate) + " to " + this.convertDateFormate(this.toDate) + "</span></td></tr><tr><td align=right valign=top>&nbsp;";
                        }
                        if (reqType == 'Print') {
                            htmlBuilder += "<img src=" + imgPhyUsagePath + "Physician.png  width=1000 height=400>";
                        }
                        else if (reqType == 'Mail') {
                            htmlBuilder += "</td></tr><tr><td><font><B>Procedure Code : <B></FONT>" + this.selectedProcedure + "</td></tr><tr><td align=center colspan=9 align=left nowrap width=1000 height=400><span class=c3><img src=" + imgPhyUsagePath + "Physician.png  width=1000 height=400></span></td></tr></table></td></tr></table>";
                        }
                        else {
                            htmlBuilder += "</td></tr><tr><td><font><B>Procedure Code : <B></FONT>" + this.selectedProcedure + "</td></tr><tr><td align=center colspan=9 align=left nowrap width=1000 height=400><span class=c3><img src=" + imgPhyUsagePath + "Physician.png  width=1000 height=400></span></td></tr></table></td></tr></table>";
                        }
                        htmlBuilder += "<table align=center width=90% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1><tr bgcolor=#d3d3d3>";
                        htmlBuilder += "<td align=center nowrap><span class=c3><b>Physician</b></span></td>";
                        htmlBuilder += "<td align=center  nowrap><span class=c3><b>Case Date (MM/DD/YYYY HH24:MI)</b></span></td>";
                        htmlBuilder += "<td align=center  nowrap><span class=c3><b>Total Cost / Procedure ($)</b></span></td>";
                        htmlBuilder += "<td align=center  nowrap><span class=c3><b>Total Returns Cost / Procedure ($)</b></span></td>";
                        htmlBuilder += "<td align=center  nowrap><span class=c3><b>Total Opened & Unused Cost / Procedure ($)</b></span></td>";
                        htmlBuilder += "</tr>";
                        for (i = 0; i <= this.lstDBData.length - 1; i++) {
                            htmlBuilder += "<tr>";
                            if (reqType == 'Mail' || reqType == 'Print') {
                                htmlBuilder += "<td align=left><span class=c3>" + this.lstDBData[i].PHYSICIAN_NAME + " </span></td>";
                                htmlBuilder += "<td align=left><span class=c3>" + this.lstDBData[i].PERFORM_DATE + " </span></td>";
                                htmlBuilder += "<td align=right><span class=c3>" + this.lstDBData[i].TOTALCOST + " </span></td>";
                                htmlBuilder += "<td align=right><span class=c3>" + this.lstDBData[i].RETURNCOST + " </span></td>";
                                htmlBuilder += "<td align=right><span class=c3>" + this.lstDBData[i].UNUSEDCOST + " </span></td>";
                                htmlBuilder += "</tr>";
                            }
                            else {
                                htmlBuilder += "<td align=left><span class=c3>" + this.lstDBData[i].PHYSICIAN_NAME + " </span></td>";
                                htmlBuilder += "<td align=left><span class=c3>" + this.lstDBData[i].PERFORM_DATE + " </span></td>";
                                htmlBuilder += "<td align=right><span class=c3>" + this.lstDBData[i].TOTALCOST + " </span></td>";
                                htmlBuilder += "<td align=right><span class=c3>" + this.lstDBData[i].RETURNCOST + " </span></td>";
                                htmlBuilder += "<td align=right><span class=c3>" + this.lstDBData[i].UNUSEDCOST + " </span></td>";
                                htmlBuilder += "</tr>";
                            }
                        }
                        htmlBuilder += "</table>";
                        return [4 /*yield*/, htmlBuilder];
                    case 5: return [2 /*return*/, _a.sent()];
                    case 6:
                        ex_10 = _a.sent();
                        htmlBuilder = '';
                        return [2 /*return*/, htmlBuilder];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    PhysicianUsageReportComponent.prototype.closeMailPopup = function () {
        this.growlMessage = [];
    };
    PhysicianUsageReportComponent.prototype.convertDateFormate = function (strDate) {
        var date = new Date(strDate), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("/");
    };
    PhysicianUsageReportComponent.prototype.exportChart = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var chartImage, image;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chartImage = document.getElementById("myChart");
                        image = chartImage.toDataURL("image/png");
                        image = image.replace(/^data:image\/(png|jpg);base64,/, "");
                        console.log(image);
                        return [4 /*yield*/, this.commonService.saveImage(image, "physician").
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        break;
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
    PhysicianUsageReportComponent.prototype.onBackClick = function () {
        this.spinnerService.start();
        this.showGrid = false;
        this.showControls = true;
        this.showGridForDetails = false;
        this.showDetailsGridForSingleRow = false;
        this.selectedProcedure = "";
        this.selectedPhysician = "";
        this.spinnerService.stop();
    };
    PhysicianUsageReportComponent.prototype.clientErrorMsg = function (strExMsg) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString());
    };
    PhysicianUsageReportComponent = __decorate([
        core_1.Component({
            templateUrl: 'pou-physician-usage-report.component.html',
            providers: [datatableservice_1.datatableservice, atpar_common_service_1.AtParCommonService, pou_physician_usage_report_component_service_1.PhysicianUsageReportServiceComponent, AtParConstants_1.AtParConstants]
        }),
        __metadata("design:paramtypes", [HttpService_1.HttpService, http_1.Http, datatableservice_1.datatableservice,
            atpar_common_service_1.AtParCommonService,
            pou_physician_usage_report_component_service_1.PhysicianUsageReportServiceComponent,
            event_spinner_service_1.SpinnerService,
            AtParConstants_1.AtParConstants,
            router_1.Router,
            router_1.ActivatedRoute,
            AtParSharedDataService_1.AtParSharedDataService])
    ], PhysicianUsageReportComponent);
    return PhysicianUsageReportComponent;
}());
exports.PhysicianUsageReportComponent = PhysicianUsageReportComponent;
//# sourceMappingURL=pou-physician-usage-report.component.js.map