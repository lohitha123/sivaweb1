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
/// <reference path="../shared/atparstatuscodes.ts" />
var core_1 = require("@angular/core");
var datatableservice_1 = require("./../components/datatable/datatableservice");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParEnums_1 = require("../Shared/AtParEnums");
var pou_release_cases_component_service_1 = require("./pou-release-cases.component.service");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var HttpService_1 = require("../Shared/HttpService");
var http_1 = require("@angular/http");
var AtParEnums_2 = require("../Shared/AtParEnums");
var AtParSharedDataService_1 = require("../Shared/AtParSharedDataService");
var router_1 = require("@angular/router");
var linq_es5_1 = require("linq-es5");
var api_1 = require("../components/common/api");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var ReleaseCasesComponent = (function () {
    function ReleaseCasesComponent(httpService, _http, dataservice, commonService, releaseCasesService, spinnerService, atParConstant, router, route, confirmationService, atParSharedDataService) {
        this.httpService = httpService;
        this._http = _http;
        this.dataservice = dataservice;
        this.commonService = commonService;
        this.releaseCasesService = releaseCasesService;
        this.spinnerService = spinnerService;
        this.atParConstant = atParConstant;
        this.router = router;
        this.route = route;
        this.confirmationService = confirmationService;
        this.atParSharedDataService = atParSharedDataService;
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.selectedDeptID = "";
        this.selectedCaseID = "";
        this.searchedDeptID = "";
        this.searchedCaseID = "";
        this.showGrid = false;
        this.lstFilteredDepts = [];
        this.lstFilteredCases = [];
        this.transactionIdlist = [];
        this.msgBoolean = false;
    }
    ReleaseCasesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinnerService.start();
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
        setTimeout(function () {
            _this.spinnerService.stop();
        }, 2000);
    };
    ReleaseCasesComponent.prototype.fillDepartmentsAuto = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var query, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstFilteredDepts = [];
                        query = event.query;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.releaseCasesService.GetDeptUsers(this.deviceTokenEntry).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.lstDBDeptData = data.DataList;
                                        _this.lstFilteredDepts = _this.filterDepartments(query, _this.lstDBDeptData);
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1);
                        this.spinnerService.stop();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ReleaseCasesComponent.prototype.fillCasesAuto = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var query, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstDBCaseData = [];
                        this.lstFilteredCases = [];
                        query = event.query;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.releaseCasesService.GetCases(this.deviceTokenEntry).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.growlMessage = [];
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.lstDBCaseData = data.DataList;
                                        _this.lstFilteredCases = _this.filterCases(query, _this.lstDBCaseData);
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        if (data.StatusCode = AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                            _this.growlMessage = [];
                                        }
                                        else {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.selectedDeptID = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.selectedDeptID = "";
                                        _this.spinnerService.stop();
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
                        this.spinnerService.stop();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ReleaseCasesComponent.prototype.filterDepartments = function (query, departments) {
        var filtered = [];
        this.lstDBDeptData = [];
        this.lstDBDeptData = linq_es5_1.asEnumerable(departments).Where(function (x) { return x.DEPT_ID.toUpperCase().startsWith(query.toUpperCase()) || x.DEPT_ID.toUpperCase().endsWith(query.toUpperCase()) || x.DEPT_NAME.toUpperCase().endsWith(query.toUpperCase()) || x.DEPT_NAME.toUpperCase().startsWith(query.toUpperCase()); }).ToArray();
        if (query == "%") {
            for (var i = 0; i <= departments.length - 1; i++) {
                if ((departments[i].DEPT_ID != null && departments[i].DEPT_NAME != null) || (departments[i].DEPT_ID != null && departments[i].DEPT_NAME !== "")) {
                    var Bunitvalue = departments[i].DEPT_ID + " - " + departments[i].DEPT_NAME;
                    filtered.push(Bunitvalue);
                }
                else {
                    var Bunitvalue = departments[i].DEPT_ID;
                    filtered.push(Bunitvalue);
                }
            }
        }
        else {
            if (query.length >= 0) {
                for (var i = 0; i <= this.lstDBDeptData.length - 1; i++) {
                    if ((this.lstDBDeptData[i].DEPT_ID != null && this.lstDBDeptData[i].DEPT_NAME != null) || (this.lstDBDeptData[i].DEPT_ID != null && this.lstDBDeptData[i].DEPT_NAME !== "")) {
                        var Bunitvalue = this.lstDBDeptData[i].DEPT_ID + " - " + this.lstDBDeptData[i].DEPT_NAME;
                        filtered.push(Bunitvalue);
                    }
                    else {
                        var Bunitvalue = this.lstDBDeptData[i].DEPT_ID;
                        filtered.push(Bunitvalue);
                    }
                }
            }
        }
        return filtered;
    };
    ReleaseCasesComponent.prototype.filterCases = function (query, cases) {
        var filtered = [];
        //this.lstDBCaseData = [];
        this.lstDBCaseData = linq_es5_1.asEnumerable(cases).Where(function (x) { return x.CASE_ID.toUpperCase().startsWith(query.toUpperCase()) || x.CASE_ID.toUpperCase().endsWith(query.toUpperCase()) || x.DESCRIPTION.toUpperCase().endsWith(query.toUpperCase()) || x.DESCRIPTION.toUpperCase().startsWith(query.toUpperCase()); }).ToArray();
        //this.lstDBCaseData = asEnumerable(this.lstDBCaseData).Where(x => x.DEPT_ID.toUpperCase().startsWith(this.selectedDeptID.toUpperCase()) || x.DEPT_ID.toUpperCase().endsWith(this.selectedDeptID.toUpperCase())).ToArray();
        if (this.selectedDeptID != "") {
            var splitSelDepId_1 = this.selectedDeptID.split(" - ");
            this.lstDBCaseData = linq_es5_1.asEnumerable(this.lstDBCaseData).Where(function (x) { return x.DEPT_ID.toUpperCase().startsWith(splitSelDepId_1[0].toUpperCase()) || x.DEPT_ID.toUpperCase().endsWith(splitSelDepId_1[0].toUpperCase()); }).ToArray();
        }
        if (query == "%") {
            for (var i = 0; i <= cases.length - 1; i++) {
                if (cases[i].DESCRIPTION != null && cases[i].DESCRIPTION !== "") {
                    var Bunitvalue = cases[i].CASE_ID + " - " + cases[i].DESCRIPTION;
                    filtered.push(Bunitvalue);
                }
                else {
                    var Bunitvalue = cases[i].CASE_ID;
                    filtered.push(Bunitvalue);
                }
            }
        }
        else {
            if (query.length >= 0) {
                for (var i = 0; i <= this.lstDBCaseData.length - 1; i++) {
                    if (this.lstDBCaseData[i].DESCRIPTION != null && this.lstDBCaseData[i].DESCRIPTION !== "") {
                        var Bunitvalue = this.lstDBCaseData[i].CASE_ID + " - " + this.lstDBCaseData[i].DESCRIPTION;
                        filtered.push(Bunitvalue);
                    }
                    else {
                        var Bunitvalue = this.lstDBCaseData[i].CASE_ID;
                        filtered.push(Bunitvalue);
                    }
                }
            }
        }
        return filtered;
    };
    ReleaseCasesComponent.prototype.GetCasesOnGoClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstgridfilterData = null;
                        this.tranId = 0;
                        this.tranBoolean = false;
                        this.transactionIdlist = [];
                        if (this.selectedDeptID !== "") {
                            this.searchedDeptID = this.selectedDeptID;
                            this.searchedDeptID = this.searchedDeptID.split("-")[0];
                        }
                        if (this.selectedCaseID !== "") {
                            this.searchedCaseID = this.selectedCaseID;
                            this.searchedCaseID = this.searchedCaseID.split("-")[0];
                        }
                        return [4 /*yield*/, this.GetCases()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ReleaseCasesComponent.prototype.GetCases = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.showGrid = false;
                        this.spinnerService.start();
                        if (this.selectedDeptID == "") {
                            this.searchedDeptID = "";
                        }
                        if (this.selectedCaseID == "") {
                            this.searchedCaseID = "";
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.releaseCasesService.ProcessReleaseCases(this.tranBoolean, this.tranId, this.searchedDeptID, this.searchedCaseID, this.deviceTokenEntry, this.transactionIdlist).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.showGrid = true;
                                        _this.lstDBData = data.DataList;
                                        //this.searchedDeptID = "";
                                        //this.searchedCaseID = "";
                                        if (_this.msgBoolean == false) {
                                            _this.growlMessage = [];
                                        }
                                        _this.msgBoolean = false;
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Warn: {
                                        _this.showGrid = false;
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.searchedDeptID = "";
                                        _this.searchedCaseID = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Error: {
                                        _this.showGrid = false;
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.searchedDeptID = "";
                                        _this.searchedCaseID = "";
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_2.StatusType.Custom: {
                                        _this.showGrid = false;
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.searchedDeptID = "";
                                        _this.searchedCaseID = "";
                                        _this.spinnerService.stop();
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
                        this.spinnerService.stop();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ReleaseCasesComponent.prototype.unlockRow = function (event, lstRowData) {
        this.spinnerService.start();
        if (event == true) {
            this.transactionIdlist.push(lstRowData.TRANSACTION_ID);
            this.spinnerService.stop();
        }
        else {
            var index = this.transactionIdlist.indexOf(lstRowData.TRANSACTION_ID, 0);
            if (index > -1) {
                this.transactionIdlist.splice(index, 1);
            }
            this.spinnerService.stop();
        }
    };
    ReleaseCasesComponent.prototype.UnlockSelectedRecords = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.tranBoolean = true;
                if (this.transactionIdlist.length == 0) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select case(s) to release" });
                    return [2 /*return*/];
                }
                this.confirmationService.confirm({
                    message: "Are you sure you want to unlock the Case(s) ?",
                    accept: function () { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.GetCases()];
                                case 1:
                                    _a.sent();
                                    this.msgBoolean = true;
                                    this.growlMessage = [];
                                    setTimeout(function () {
                                        _this.spinnerService.stop();
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Case(s) Released Successfully" });
                                    }, 500);
                                    return [2 /*return*/];
                            }
                        });
                    }); },
                    reject: function () {
                        return;
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    ReleaseCasesComponent.prototype.filterdata = function (event) {
        this.lstgridfilterData = new Array();
        this.lstgridfilterData = event;
    };
    ReleaseCasesComponent.prototype.checkAll = function () {
        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
        if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {
            if (this.EndIndex > this.lstgridfilterData.length) {
                this.EndIndex = this.lstgridfilterData.length;
            }
            for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                this.lstgridfilterData[i].Status = true;
                this.transactionIdlist.push(this.lstgridfilterData[i].TRANSACTION_ID);
            }
        }
        else {
            if (this.EndIndex > this.lstDBData.length) {
                this.EndIndex = this.lstDBData.length;
            }
            for (var i = this.startIndex; i <= this.EndIndex - 1; i++) {
                this.lstDBData[i].Status = true;
                this.transactionIdlist.push(this.lstDBData[i].TRANSACTION_ID);
            }
        }
    };
    ReleaseCasesComponent.prototype.uncheckAll = function () {
        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
        if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {
            if (this.EndIndex > this.lstgridfilterData.length) {
                this.EndIndex = this.lstgridfilterData.length;
            }
            for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                this.lstgridfilterData[i].Status = false;
                var index = this.transactionIdlist.indexOf(this.lstgridfilterData[i].TRANSACTION_ID, 0);
                if (index > -1) {
                    this.transactionIdlist.splice(index, 1);
                }
            }
        }
        else {
            if (this.EndIndex > this.lstDBData.length) {
                this.EndIndex = this.lstDBData.length;
            }
            for (var i = this.EndIndex - 1; i >= this.startIndex; i--) {
                this.lstDBData[i].Status = false;
                var index = this.transactionIdlist.indexOf(this.lstDBData[i].TRANSACTION_ID, 0);
                if (index > -1) {
                    this.transactionIdlist.splice(index, 1);
                }
            }
        }
    };
    ReleaseCasesComponent.prototype.clientErrorMsg = function (strExMsg) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString());
    };
    ReleaseCasesComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = null;
        this.lstDBData = null;
        this.growlMessage = null;
    };
    ReleaseCasesComponent = __decorate([
        core_1.Component({
            templateUrl: 'pou-release-cases.component.html',
            providers: [datatableservice_1.datatableservice, atpar_common_service_1.AtParCommonService, pou_release_cases_component_service_1.ReleaseCasesServiceComponent, AtParConstants_1.AtParConstants, AtParSharedDataService_1.AtParSharedDataService, api_1.ConfirmationService]
        }),
        __metadata("design:paramtypes", [HttpService_1.HttpService, http_1.Http, datatableservice_1.datatableservice,
            atpar_common_service_1.AtParCommonService,
            pou_release_cases_component_service_1.ReleaseCasesServiceComponent,
            event_spinner_service_1.SpinnerService,
            AtParConstants_1.AtParConstants,
            router_1.Router,
            router_1.ActivatedRoute,
            api_1.ConfirmationService,
            AtParSharedDataService_1.AtParSharedDataService])
    ], ReleaseCasesComponent);
    return ReleaseCasesComponent;
}());
exports.ReleaseCasesComponent = ReleaseCasesComponent;
//# sourceMappingURL=pou-release-cases.component.js.map