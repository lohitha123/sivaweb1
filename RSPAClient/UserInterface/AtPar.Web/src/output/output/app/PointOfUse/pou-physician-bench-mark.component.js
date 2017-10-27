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
var AtParConstants_1 = require("../Shared/AtParConstants");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var datatable_1 = require("../components/datatable/datatable");
var AtParEnums_1 = require("../Shared/AtParEnums");
var HttpService_1 = require("../Shared/HttpService");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var pou_physician_bench_mark_service_1 = require("./pou-physician-bench-mark.service");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var file_saver_1 = require("file-saver");
var yearview_calender_1 = require("../components/calendar/yearview-calender");
var PhysicianBenchMarkingComponent = (function () {
    function PhysicianBenchMarkingComponent(leftBarAnimationservice, router, httpservice, spinnerservice, atParConstant, atparcommonservice, PouPhyBnchMrkngService, yearviewcalender) {
        this.leftBarAnimationservice = leftBarAnimationservice;
        this.router = router;
        this.httpservice = httpservice;
        this.spinnerservice = spinnerservice;
        this.atParConstant = atParConstant;
        this.atparcommonservice = atparcommonservice;
        this.PouPhyBnchMrkngService = PouPhyBnchMrkngService;
        this.yearviewcalender = yearviewcalender;
        /*Varaiable declaration*/
        this.deviceTokenEntry = [];
        this.years = [];
        this.msgs = [];
        this.ddltyear = 0;
        this.showGrid = false;
        this.lstSltRnge = [];
        this.lstSltHQM = [];
        this.pop = false;
        this.tdExports = false;
        this.selectedSltRnge = 'Y1';
        this.selectedSltRngeLbl = '';
        this.growlMessage = [];
        this.lstPhyBnchMrkRnkData = [];
        this.lstPhyScrCrdData = [];
        this.gvPhyRanking = false;
        this.gvPhyScoreCard = false;
        this.lstLength = "";
        this.PhysicianScoreCardTab = false;
        this.PhysicianRankingTab = false;
        this.SummaryBySpecialtyTab = false;
        this.lstSummaryBySpecialty = [];
        this.gvSummaryBySpecialty = false;
        this.statusCode = -1;
        this.isMailDialog = false;
        this.toMailAddr = '';
        this.MaxPhyRnk = 0;
        this.count = 0;
        this.lstPhyScrCrdLngth = 0;
        this.lstYear = [];
        this.showHalfyrlbl = false;
        this.Hlfqtrmnthlbl = '';
        this.Hlfqtrmnthlbltxt = '';
    }
    PhysicianBenchMarkingComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var year;
            return __generator(this, function (_a) {
                this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                this.getYear();
                this.SummaryBySpecialtyTab = true;
                this.lstYear = [];
                this.lstYear.push({ label: "Select Year", value: "Select Year" });
                for (year = 1990; year <= 2030; year++) {
                    this.lstYear.push({
                        label: '' + year + '',
                        value: '' + year + ''
                    });
                }
                this.lstSltRnge.push({ label: 'Select Value', value: 'Y1' }, { label: 'Yearly', value: 'Y' }, { label: 'Half Yearly', value: 'HY' }, { label: 'Quarterly', value: 'Q' }, { label: 'Monthly', value: 'M' });
                this.lstSltHQM.push({ label: 'Select Value', value: 'Select Value' });
                sessionStorage.removeItem('SpltyCode');
                sessionStorage.removeItem('Phyid');
                return [2 /*return*/];
            });
        });
    };
    /**
        redirecting to home when click on breadcrumbs
    */
    PhysicianBenchMarkingComponent.prototype.homeurl = function () {
        this.leftBarAnimationservice.isHomeClicked = false;
        this.leftBarAnimationservice.isHide();
        this.router.navigate(['atpar']);
    };
    PhysicianBenchMarkingComponent.prototype.getYear = function () {
        return __awaiter(this, void 0, void 0, function () {
            var today, i;
            return __generator(this, function (_a) {
                today = new Date();
                this.yy = today.getFullYear();
                for (i = (this.yy - 120); i <= this.yy; i++) {
                    this.years.push(i);
                }
                return [2 /*return*/];
            });
        });
    };
    PhysicianBenchMarkingComponent.prototype.Yearsbind = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.lstSltHQM = [];
                this.pop = false;
                this.tdExports = false;
                this.selectedSltHQM = "";
                this.lstSummaryBySpecialty = [];
                this.gvSummaryBySpecialty = false;
                this.lstSummaryBySpecialty.length = 0;
                if (this.selectedSltRnge == "HY" || this.SltVariancDiagRnge == "HY") {
                    this.lstSltHQM.push({ label: 'Select Value', value: 'Select Value' }, { label: 'First Half(Jan-Jun)', value: '1' }, { label: 'Second Half(July-Dec)', value: '2' });
                }
                else if (this.selectedSltRnge == "Q" || this.SltVariancDiagRnge == "Q") {
                    this.lstSltHQM.push({ label: 'Select Value', value: 'Select Value' }, { label: 'Q1(Jan-March)', value: '1' }, { label: 'Q2(Apr-Jun)', value: '2' }, { label: 'Q3(July-Sep)', value: '3' }, { label: 'Q4(Oct-Dec)', value: '4' });
                }
                else if (this.selectedSltRnge == "M" || this.SltVariancDiagRnge == "M") {
                    this.lstSltHQM.push({ label: 'Select Value', value: 'Select Value' }, { label: 'Jan', value: '1' }, { label: 'Feb', value: '2' }, { label: 'Mar', value: '3' }, { label: 'Apr', value: '4' }, { label: 'May', value: '5' }, { label: 'June', value: '6' }, { label: 'July', value: '7' }, { label: 'Aug', value: '8' }, { label: 'Sep', value: '9' }, { label: 'Oct', value: '10' }, { label: 'Nov', value: '11' }, { label: 'Dec', value: '12' });
                }
                else {
                    this.lstSltHQM.push({ label: 'Select Value', value: 'Select Value' });
                }
                return [2 /*return*/];
            });
        });
    };
    PhysicianBenchMarkingComponent.prototype.Yearsbindphyrnk = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.lstSltHQM = [];
                this.pop = false;
                this.tdExports = false;
                this.selectedSltHQM = "";
                this.lstPhyBnchMrkRnkData = [];
                this.gvPhyRanking = false;
                if (this.selectedSltRnge == "HY" || this.SltVariancDiagRnge == "HY") {
                    this.lstSltHQM.push({ label: 'Select Value', value: 'Select Value' }, { label: 'First Half(Jan-Jun)', value: '1' }, { label: 'Second Half(July-Dec)', value: '2' });
                }
                else if (this.selectedSltRnge == "Q" || this.SltVariancDiagRnge == "Q") {
                    this.lstSltHQM.push({ label: 'Select Value', value: 'Select Value' }, { label: 'Q1(Jan-March)', value: '1' }, { label: 'Q2(Apr-Jun)', value: '2' }, { label: 'Q3(July-Sep)', value: '3' }, { label: 'Q4(Oct-Dec)', value: '4' });
                }
                else if (this.selectedSltRnge == "M" || this.SltVariancDiagRnge == "M") {
                    this.lstSltHQM.push({ label: 'Select Value', value: 'Select Value' }, { label: 'Jan', value: '1' }, { label: 'Feb', value: '2' }, { label: 'Mar', value: '3' }, { label: 'Apr', value: '4' }, { label: 'May', value: '5' }, { label: 'June', value: '6' }, { label: 'July', value: '7' }, { label: 'Aug', value: '8' }, { label: 'Sep', value: '9' }, { label: 'Oct', value: '10' }, { label: 'Nov', value: '11' }, { label: 'Dec', value: '12' });
                }
                else {
                    this.lstSltHQM.push({ label: 'Select Value', value: 'Select Value' });
                }
                return [2 /*return*/];
            });
        });
    };
    PhysicianBenchMarkingComponent.prototype.Yearsbindphyscrcrd = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.lstSltHQM = [];
                this.pop = false;
                this.tdExports = false;
                this.selectedSltHQM = "";
                this.lstPhyScrCrdData = [];
                this.gvPhyScoreCard = false;
                if (this.selectedSltRnge == "HY" || this.SltVariancDiagRnge == "HY") {
                    this.lstSltHQM.push({ label: 'Select Value', value: 'Select Value' }, { label: 'First Half(Jan-Jun)', value: '1' }, { label: 'Second Half(July-Dec)', value: '2' });
                }
                else if (this.selectedSltRnge == "Q" || this.SltVariancDiagRnge == "Q") {
                    this.lstSltHQM.push({ label: 'Select Value', value: 'Select Value' }, { label: 'Q1(Jan-March)', value: '1' }, { label: 'Q2(Apr-Jun)', value: '2' }, { label: 'Q3(July-Sep)', value: '3' }, { label: 'Q4(Oct-Dec)', value: '4' });
                }
                else if (this.selectedSltRnge == "M" || this.SltVariancDiagRnge == "M") {
                    this.lstSltHQM.push({ label: 'Select Value', value: 'Select Value' }, { label: 'Jan', value: '1' }, { label: 'Feb', value: '2' }, { label: 'Mar', value: '3' }, { label: 'Apr', value: '4' }, { label: 'May', value: '5' }, { label: 'June', value: '6' }, { label: 'July', value: '7' }, { label: 'Aug', value: '8' }, { label: 'Sep', value: '9' }, { label: 'Oct', value: '10' }, { label: 'Nov', value: '11' }, { label: 'Dec', value: '12' });
                }
                else {
                    this.lstSltHQM.push({ label: 'Select Value', value: 'Select Value' });
                }
                return [2 /*return*/];
            });
        });
    };
    PhysicianBenchMarkingComponent.prototype.btn_SummaryBySpecialty = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerservice.start();
                        this.growlMessage = [];
                        this.pop = false;
                        this.tdExports = false;
                        sessionStorage.removeItem('SpltyCode');
                        sessionStorage.removeItem('Phyid');
                        this.lstPhyBnchMrkRnkData.length = 0;
                        this.lstPhyScrCrdData.length = 0;
                        this.lstPhyScrCrdLngth = 0;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 9, , 10]);
                        if (!(this.selectedSltRnge == "HY" && (this.selectedSltHQM == undefined || this.selectedSltHQM == "" || this.selectedSltHQM == "Select Value"))) return [3 /*break*/, 2];
                        this.growlMessage = [];
                        this.spinnerservice.stop();
                        this.pop = false;
                        this.tdExports = false;
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Half Year" });
                        return [2 /*return*/];
                    case 2:
                        if (!(this.selectedSltRnge == "Q" && (this.selectedSltHQM == undefined || this.selectedSltHQM == "" || this.selectedSltHQM == "Select Value"))) return [3 /*break*/, 3];
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Quarter" });
                        this.spinnerservice.stop();
                        this.pop = false;
                        this.tdExports = false;
                        return [2 /*return*/];
                    case 3:
                        if (!(this.selectedSltRnge == "M" && (this.selectedSltHQM == undefined || this.selectedSltHQM == "" || this.selectedSltHQM == "Select Value"))) return [3 /*break*/, 4];
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Select Month' });
                        this.spinnerservice.stop();
                        this.pop = false;
                        return [2 /*return*/];
                    case 4:
                        if (!(this.selectedSltRnge == "Y1" || this.selectedSltRnge == undefined || this.selectedSltRnge == "")) return [3 /*break*/, 5];
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Range" });
                        this.spinnerservice.stop();
                        this.pop = false;
                        return [2 /*return*/];
                    case 5:
                        if (!(this.ddltyear == undefined || this.ddltyear == 0)) return [3 /*break*/, 6];
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Year" });
                        this.spinnerservice.stop();
                        this.pop = false;
                        return [2 /*return*/];
                    case 6:
                        this.strHalfyear = "0";
                        this.strQuarter = "0";
                        this.strMonth = "0";
                        switch (this.selectedSltRnge) {
                            case "HY": {
                                this.strHalfyear = this.selectedSltHQM;
                                this.selectedSltRngeLbl = "Half Yearly";
                                this.showHalfyrlbl = true;
                                this.Hlfqtrmnthlbltxt = "Half Year:";
                                if (this.selectedSltHQM == "1") {
                                    this.Hlfqtrmnthlbl = "First Half(Jan-Jun)";
                                }
                                else {
                                    this.Hlfqtrmnthlbl = "Second Half(July-Dec)";
                                }
                                break;
                            }
                            case "Q": {
                                this.strQuarter = this.selectedSltHQM;
                                this.selectedSltRngeLbl = "Quarterly";
                                this.showHalfyrlbl = true;
                                this.Hlfqtrmnthlbltxt = "Quarter:";
                                if (this.selectedSltHQM == "1") {
                                    this.Hlfqtrmnthlbl = "Q1(Jan-March)";
                                }
                                else if (this.selectedSltHQM == "2") {
                                    this.Hlfqtrmnthlbl = "Q2(Apr-Jun)";
                                }
                                else if (this.selectedSltHQM == "3") {
                                    this.Hlfqtrmnthlbl = "Q3(July-Sep)";
                                }
                                else if (this.selectedSltHQM == "4") {
                                    this.Hlfqtrmnthlbl = "Q4(Oct-Dec)";
                                }
                                break;
                            }
                            case "M": {
                                this.strMonth = this.selectedSltHQM;
                                this.selectedSltRngeLbl = "Monthly";
                                this.showHalfyrlbl = true;
                                this.Hlfqtrmnthlbltxt = "Month:";
                                if (this.selectedSltHQM == "1") {
                                    this.Hlfqtrmnthlbl = "January";
                                }
                                else if (this.selectedSltHQM == "2") {
                                    this.Hlfqtrmnthlbl = "February";
                                }
                                else if (this.selectedSltHQM == "3") {
                                    this.Hlfqtrmnthlbl = "March";
                                }
                                else if (this.selectedSltHQM == "4") {
                                    this.Hlfqtrmnthlbl = "April";
                                }
                                else if (this.selectedSltHQM == "5") {
                                    this.Hlfqtrmnthlbl = "May";
                                }
                                else if (this.selectedSltHQM == "6") {
                                    this.Hlfqtrmnthlbl = "June";
                                }
                                else if (this.selectedSltHQM == "7") {
                                    this.Hlfqtrmnthlbl = "July";
                                }
                                else if (this.selectedSltHQM == "8") {
                                    this.Hlfqtrmnthlbl = "August";
                                }
                                else if (this.selectedSltHQM == "9") {
                                    this.Hlfqtrmnthlbl = "September";
                                }
                                else if (this.selectedSltHQM == "10") {
                                    this.Hlfqtrmnthlbl = "October";
                                }
                                else if (this.selectedSltHQM == "11") {
                                    this.Hlfqtrmnthlbl = "November";
                                }
                                else if (this.selectedSltHQM == "12") {
                                    this.Hlfqtrmnthlbl = "December";
                                }
                                break;
                            }
                            default: {
                                this.selectedSltRngeLbl = "Yearly";
                                this.showHalfyrlbl = false;
                                break;
                            }
                        }
                        return [4 /*yield*/, this.PouPhyBnchMrkngService.Getphysiciansummarybyspeciality(this.ddltyear, this.strHalfyear, this.strQuarter, this.strMonth)
                                .catch(this.httpservice.handleError)
                                .then(function (res) {
                                var data = res.json();
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                    _this.spinnerservice.stop();
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Records Found' });
                                    _this.pop = false;
                                    _this.gvSummaryBySpecialty = false;
                                    return;
                                }
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR) {
                                    _this.spinnerservice.stop();
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Failed To Get Data' });
                                    _this.pop = false;
                                    _this.gvSummaryBySpecialty = false;
                                    return;
                                }
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_REMOTEERROR) {
                                    _this.spinnerservice.stop();
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Remote server error' });
                                    _this.pop = false;
                                    _this.gvSummaryBySpecialty = false;
                                    return;
                                }
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstSummaryBySpecialty = data.DataList;
                                        if (_this.lstSummaryBySpecialty != null && _this.lstSummaryBySpecialty.length > 0) {
                                            _this.gvSummaryBySpecialty = true;
                                            _this.showGrid = true;
                                            _this.tdExports = true;
                                            _this.spinnerservice.stop();
                                            _this.lstLength = _this.lstSummaryBySpecialty.length + " Record(s) found";
                                            _this.activeTab = "Summary By Specialty";
                                            sessionStorage.setItem('_DS', JSON.stringify(data.DataList));
                                        }
                                        else {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                                            _this.pop = false;
                                        }
                                        if (_this.lstSummaryBySpecialty.length <= 0) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                                            _this.pop = false;
                                        }
                                        _this.spinnerservice.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.selectedSltRnge = "";
                                        _this.spinnerservice.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.selectedSltRnge = "";
                                        _this.spinnerservice.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.selectedSltRnge = "";
                                        _this.spinnerservice.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        ex_1 = _a.sent();
                        this.displayCatchException(ex_1);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    PhysicianBenchMarkingComponent.prototype.btn_PhysicianRanking = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sessionStorage.removeItem('Phyid');
                        this.lstPhyScrCrdData.length = 0;
                        this.spinnerservice.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (this.selectedSltRnge == "HY" && (this.selectedSltHQM == undefined || this.selectedSltHQM == "" || this.selectedSltHQM == "Select Value")) {
                            this.growlMessage = [];
                            this.spinnerservice.stop();
                            this.pop = false;
                            this.tdExports = false;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Half Year" });
                            return [2 /*return*/];
                        }
                        else if (this.selectedSltRnge == "Q" && (this.selectedSltHQM == undefined || this.selectedSltHQM == "" || this.selectedSltHQM == "Select Value")) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Quarter" });
                            this.spinnerservice.stop();
                            this.pop = false;
                            this.tdExports = false;
                            return [2 /*return*/];
                        }
                        else if (this.selectedSltRnge == "M" && (this.selectedSltHQM == undefined || this.selectedSltHQM == "" || this.selectedSltHQM == "Select Value")) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Select Month' });
                            this.spinnerservice.stop();
                            this.pop = false;
                            this.tdExports = false;
                            return [2 /*return*/];
                        }
                        else if (this.selectedSltRnge == "Y1" || this.selectedSltRnge == undefined || this.selectedSltRnge == "") {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Range" });
                            this.spinnerservice.stop();
                            this.pop = false;
                            this.tdExports = false;
                            return [2 /*return*/];
                        }
                        else if (this.ddltyear == undefined || this.ddltyear == 0) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Year" });
                            this.spinnerservice.stop();
                            this.pop = false;
                            this.tdExports = false;
                            return [2 /*return*/];
                        }
                        else {
                            this.strHalfyear = "0";
                            this.strMonth = "0";
                            this.strQuarter = "0";
                            switch (this.selectedSltRnge) {
                                case "HY": {
                                    this.strHalfyear = this.selectedSltHQM;
                                    break;
                                }
                                case "Q": {
                                    this.strQuarter = this.selectedSltHQM;
                                    break;
                                }
                                case "M": {
                                    this.strMonth = this.selectedSltHQM;
                                    break;
                                }
                                default: {
                                    break;
                                }
                            }
                        }
                        return [4 /*yield*/, this.PouPhyBnchMrkngService.Getphysicianbenchmarkrankingdata(sessionStorage.getItem('SpltyCode'), this.ddltyear, this.strHalfyear, this.strQuarter, this.strMonth).catch(this.httpservice.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerservice.stop();
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                    _this.spinnerservice.stop();
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Records Found' });
                                    _this.pop = false;
                                    _this.gvPhyRanking = false;
                                    _this.tdExports = false;
                                    return;
                                }
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR) {
                                    _this.spinnerservice.stop();
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Failed To Get Data' });
                                    _this.pop = false;
                                    _this.gvPhyRanking = false;
                                    _this.tdExports = false;
                                    return;
                                }
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_REMOTEERROR) {
                                    _this.spinnerservice.stop();
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Remote server error' });
                                    _this.pop = false;
                                    _this.gvPhyRanking = false;
                                    _this.tdExports = false;
                                    return;
                                }
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstPhyBnchMrkRnkData = data.DataList;
                                        if (_this.lstPhyBnchMrkRnkData != null && _this.lstPhyBnchMrkRnkData.length > 0) {
                                            _this.gvPhyRanking = true;
                                            _this.showGrid = true;
                                            _this.tdExports = true;
                                            _this.spinnerservice.stop();
                                            _this.lstLength = _this.lstPhyBnchMrkRnkData.length + " Record(s) found";
                                            _this.activeTab = "Physician Ranking";
                                            sessionStorage.setItem('_DSPhyRnk', JSON.stringify(data.DataList));
                                        }
                                        else {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                                            _this.pop = false;
                                            _this.tdExports = false;
                                        }
                                        if (_this.lstPhyBnchMrkRnkData.length <= 0) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                                            _this.pop = false;
                                            _this.tdExports = false;
                                        }
                                        _this.spinnerservice.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.selectedSltRnge = "";
                                        _this.spinnerservice.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.tdExports = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.selectedSltRnge = "";
                                        _this.spinnerservice.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.tdExports = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.selectedSltRnge = "";
                                        _this.spinnerservice.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.tdExports = false;
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_2 = _a.sent();
                        this.displayCatchException(ex_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PhysicianBenchMarkingComponent.prototype.btn_PhysicianScoreCardTab = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstPhyScrCrdData = [];
                        this.PhysicianRankingTab = false;
                        this.gvPhyRanking = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (this.selectedSltRnge == "HY" && (this.selectedSltHQM == undefined || this.selectedSltHQM == "" || this.selectedSltHQM == "Select Value")) {
                            this.growlMessage = [];
                            this.spinnerservice.stop();
                            this.pop = false;
                            this.tdExports = false;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Half Year" });
                            return [2 /*return*/];
                        }
                        else if (this.selectedSltRnge == "Q" && (this.selectedSltHQM == undefined || this.selectedSltHQM == "" || this.selectedSltHQM == "Select Value")) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Quarter" });
                            this.spinnerservice.stop();
                            this.pop = false;
                            this.tdExports = false;
                            return [2 /*return*/];
                        }
                        else if (this.selectedSltRnge == "M" && (this.selectedSltHQM == undefined || this.selectedSltHQM == "" || this.selectedSltHQM == "Select Value")) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Select Month' });
                            this.spinnerservice.stop();
                            this.pop = false;
                            this.tdExports = false;
                            return [2 /*return*/];
                        }
                        else if (this.selectedSltRnge == "Y1" || this.selectedSltRnge == undefined || this.selectedSltRnge == "") {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Range" });
                            this.spinnerservice.stop();
                            this.pop = false;
                            this.tdExports = false;
                            return [2 /*return*/];
                        }
                        else if (this.ddltyear == undefined || this.ddltyear == 0) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Year" });
                            this.spinnerservice.stop();
                            this.pop = false;
                            this.tdExports = false;
                            return [2 /*return*/];
                        }
                        else {
                            this.strHalfyear = "0";
                            this.strQuarter = "0";
                            this.strMonth = "0";
                            switch (this.selectedSltRnge) {
                                case "HY": {
                                    this.strHalfyear = this.selectedSltHQM;
                                    break;
                                }
                                case "Q": {
                                    this.strQuarter = this.selectedSltHQM;
                                    break;
                                }
                                case "M": {
                                    this.strMonth = this.selectedSltHQM;
                                    break;
                                }
                                default: {
                                    break;
                                }
                            }
                        }
                        return [4 /*yield*/, this.PouPhyBnchMrkngService.GetPhysicianScoreCardData(sessionStorage.getItem('SpltyCode'), sessionStorage.getItem('Phyid'), this.ddltyear, this.strHalfyear, this.strQuarter, this.strMonth).catch(this.httpservice.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerservice.stop();
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                    _this.spinnerservice.stop();
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Records Found' });
                                    _this.pop = false;
                                    _this.tdExports = false;
                                    return;
                                }
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR) {
                                    _this.spinnerservice.stop();
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Failed To Get Data' });
                                    _this.pop = false;
                                    _this.tdExports = false;
                                    return;
                                }
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_REMOTEERROR) {
                                    _this.spinnerservice.stop();
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Remote server error' });
                                    _this.pop = false;
                                    _this.tdExports = false;
                                    return;
                                }
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstPhyScrCrdData = data.DataList;
                                        if (_this.lstPhyScrCrdData != null && _this.lstPhyScrCrdData.length > 0) {
                                            _this.PhysicianScoreCardTab = true;
                                            _this.gvPhyScoreCard = true;
                                            _this.showGrid = true;
                                            _this.tdExports = true;
                                            _this.spinnerservice.stop();
                                            _this.lstLength = _this.lstPhyScrCrdData.length + " Record(s) found";
                                            _this.lstPhyScrCrdLngth = _this.lstPhyScrCrdData.length;
                                            _this.activeTab = "Physician Score Card";
                                            sessionStorage.setItem('_DSPhyScrCrd', JSON.stringify(data.DataList));
                                        }
                                        else {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                                            _this.pop = false;
                                            _this.tdExports = false;
                                        }
                                        if (_this.lstPhyScrCrdData.length <= 0) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                                            _this.pop = false;
                                            _this.tdExports = false;
                                        }
                                        _this.spinnerservice.stop();
                                        for (var _i = 0, _a = _this.lstPhyScrCrdData; _i < _a.length; _i++) {
                                            var entry = _a[_i];
                                            if (entry.PHYSICIAN_RANK >= _this.MaxPhyRnk) {
                                                _this.MaxPhyRnk = entry.PHYSICIAN_RANK;
                                            }
                                        }
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.selectedSltRnge = "";
                                        _this.spinnerservice.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.tdExports = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.selectedSltRnge = "";
                                        _this.spinnerservice.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.tdExports = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.selectedSltRnge = "";
                                        _this.spinnerservice.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.tdExports = false;
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_3 = _a.sent();
                        console.log(ex_3);
                        this.displayCatchException(ex_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PhysicianBenchMarkingComponent.prototype.onPhyNameClick = function (Navdd, event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.activeTab = "Physician Score Card";
                        this.ctabs.filter(function (tab) { return tab.title == 'Summary By Specialty'; })[0].active = false;
                        this.ctabs.filter(function (tab) { return tab.title == 'Physician Ranking'; })[0].active = false;
                        this.ctabs.filter(function (tab) { return tab.title == 'Physician Score Card'; })[0].active = true;
                        sessionStorage.setItem('Phyid', Navdd.PHYSICIAN_ID);
                        this.Phyname = Navdd.PHYSICIAN_NAME;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.PouPhyBnchMrkngService.GetPhysicianScoreCardData(sessionStorage.getItem('SpltyCode'), Navdd.PHYSICIAN_ID, this.ddltyear, this.strHalfyear, this.strQuarter, this.strMonth).catch(this.httpservice.handleError).then(function (res) {
                                var data = res.json();
                                _this.spinnerservice.stop();
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                    _this.spinnerservice.stop();
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Records Found' });
                                    _this.pop = false;
                                    _this.lstPhyScrCrdData.length = 0;
                                    _this.PhysicianScoreCardTab = true;
                                    _this.tdExports = false;
                                    return;
                                }
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR) {
                                    _this.spinnerservice.stop();
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Failed To Get Data' });
                                    _this.pop = false;
                                    _this.lstPhyScrCrdData.length = 0;
                                    _this.PhysicianScoreCardTab = true;
                                    _this.tdExports = false;
                                    return;
                                }
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_REMOTEERROR) {
                                    _this.spinnerservice.stop();
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Remote server error' });
                                    _this.pop = false;
                                    _this.lstPhyScrCrdData.length = 0;
                                    _this.PhysicianScoreCardTab = true;
                                    _this.tdExports = false;
                                    return;
                                }
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstPhyScrCrdData = data.DataList;
                                        if (_this.lstPhyScrCrdData != null && _this.lstPhyScrCrdData.length > 0) {
                                            _this.gvPhyScoreCard = true;
                                            _this.showGrid = true;
                                            _this.tdExports = true;
                                            _this.spinnerservice.stop();
                                            _this.lstLength = _this.lstPhyScrCrdData.length + " Record(s) found";
                                            _this.lstPhyScrCrdLngth = _this.lstPhyScrCrdData.length;
                                            _this.MaxPhyRnk = 0;
                                            for (var _i = 0, _a = _this.lstPhyScrCrdData; _i < _a.length; _i++) {
                                                var entry = _a[_i];
                                                if (entry.PHYSICIAN_RANK >= _this.MaxPhyRnk) {
                                                    _this.MaxPhyRnk = entry.PHYSICIAN_RANK;
                                                }
                                            }
                                            sessionStorage.setItem('_DSPhyScrCrd', JSON.stringify(data.DataList));
                                        }
                                        else {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                                            _this.pop = false;
                                            _this.lstPhyScrCrdData.length = 0;
                                            _this.PhysicianScoreCardTab = true;
                                            _this.tdExports = false;
                                        }
                                        if (_this.lstPhyScrCrdData.length <= 0) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                                            _this.pop = false;
                                            _this.lstPhyScrCrdData.length = 0;
                                            _this.PhysicianScoreCardTab = true;
                                            _this.tdExports = false;
                                        }
                                        _this.spinnerservice.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.selectedSltRnge = "";
                                        _this.spinnerservice.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        _this.lstPhyScrCrdData.length = 0;
                                        _this.PhysicianScoreCardTab = true;
                                        _this.tdExports = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.selectedSltRnge = "";
                                        _this.spinnerservice.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        _this.lstPhyScrCrdData.length = 0;
                                        _this.PhysicianScoreCardTab = true;
                                        _this.tdExports = false;
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.selectedSltRnge = "";
                                        _this.spinnerservice.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        _this.lstPhyScrCrdData.length = 0;
                                        _this.PhysicianScoreCardTab = true;
                                        _this.tdExports = false;
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_4 = _a.sent();
                        this.displayCatchException(ex_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
* This method is for displaying catch block error messages
* @param event
*/
    PhysicianBenchMarkingComponent.prototype.displayCatchException = function (ex) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerservice, ex.toString());
    };
    PhysicianBenchMarkingComponent.prototype.SetPhyRnkGrnColor = function (x) {
        try {
            x.parentNode.parentNode.style.background = "green";
        }
        catch (ex) {
            this.displayCatchException(ex);
        }
    };
    PhysicianBenchMarkingComponent.prototype.SetPhyRnkRdColor = function (x) {
        try {
            x.parentNode.parentNode.style.background = "red";
        }
        catch (ex) {
            this.displayCatchException(ex);
        }
    };
    PhysicianBenchMarkingComponent.prototype.SetPhyRnkWhtColor = function (x) {
        try {
            x.parentNode.parentNode.style.background = "white";
        }
        catch (ex) {
            this.displayCatchException(ex);
        }
    };
    PhysicianBenchMarkingComponent.prototype.onSpltyClick = function (Navdd, event) {
        this.activeTab = "Physician Ranking";
        this.ctabs.filter(function (tab) { return tab.title == 'Summary By Specialty'; })[0].active = false;
        this.ctabs.filter(function (tab) { return tab.title == 'Physician Ranking'; })[0].active = true;
        this.ctabs.filter(function (tab) { return tab.title == 'Physician Score Card'; })[0].active = false;
        this.growlMessage = [];
        this.spinnerservice.start();
        this.lstPhyBnchMrkRnkData.length = 0;
        sessionStorage.setItem('SpltyCode', Navdd.SPECIALTY_CODE);
        this.VarnceSpecialityCode = Navdd.SPECIALTY_DESCRIPTION;
        this.VarnceSpecialityDescription = Navdd.SPECIALTY_DESCRIPTION;
        this.btn_PhysicianRanking();
    };
    PhysicianBenchMarkingComponent.prototype.onExportToExcelClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, blob, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        event.stopImmediatePropagation();
                        this.spinnerservice.start();
                        return [4 /*yield*/, this.exportReportDetails('Excel')];
                    case 1:
                        html = _a.sent();
                        blob = new Blob([html], {
                            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                        });
                        file_saver_1.saveAs(blob, "POUPhysicianBenchmarking.xls");
                        return [3 /*break*/, 4];
                    case 2:
                        ex_5 = _a.sent();
                        this.displayCatchException(ex_5);
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerservice.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PhysicianBenchMarkingComponent.prototype.exportReportDetails = function (reqType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var htmlBuilder, sbMailText, _strFrmDt, _strToDt, imgserverPath, title, _DS, _DS, _DS, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        htmlBuilder = '';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 13, , 14]);
                        this.statusCode = -1;
                        this.msgs = [];
                        sbMailText = void 0;
                        _strFrmDt = void 0;
                        _strToDt = void 0;
                        imgserverPath = '';
                        return [4 /*yield*/, this.atparcommonservice.getServerIP()
                                .catch(this.httpservice.handleError)
                                .then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.ipAddress = data.DataVariable.toString();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                if (data.StatType != AtParEnums_1.StatusType.Success) {
                                    htmlBuilder = '';
                                    return htmlBuilder;
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.atparcommonservice.getSSLConfigDetails()
                                .catch(this.httpservice.handleError)
                                .then(function (res) {
                                _this.msgs = [];
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.gstrProtocal = data.Data.PROTOCOL.toString();
                                        _this.gstrServerName = data.Data.SERVER_NAME.toString();
                                        _this.gstrPortNo = data.Data.PORT_NO.toString();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                if (data.StatType != AtParEnums_1.StatusType.Success) {
                                    htmlBuilder = '';
                                    return htmlBuilder;
                                }
                            })];
                    case 3:
                        _a.sent();
                        imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
                        title = '""' + "AtparVersion 2.8" + '""';
                        htmlBuilder = "<Table align=left width=90% cellpadding=0 cellspacing = 0 vAlign=top>";
                        if (reqType == 'Print') {
                            htmlBuilder += "<TR width='100%'><td   colspan=2 align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td><td align=left  width='85%' height=63 nowrap><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>"
                                + "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                                + "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                                + "<tr><td colspan=5 align=left><span class=c2><b> Physician Benchmarking Report </b></span></td><td align=right valign=top>&nbsp;";
                            htmlBuilder += "<A  href=" + "" + "javascript:printWindow()" + "" + "><img src=" + imgserverPath + "print.jpg></A>";
                        }
                        else {
                            if (reqType == 'Mail') {
                                htmlBuilder += "<TR height=63><TD align=left colspan=2><IMG height=63 width=18% src=cid:logo title=Atpar 3><img src=cid:topbg width=82% height=63></TD></TR>";
                            }
                            else {
                                htmlBuilder += "<TR height=63><TD align=left colspan=2><IMG height=63 width=18% src=" + imgserverPath + "logo.jpg title=Atpar 3><img src=" + imgserverPath + "topbg.jpg width=82% height=63></TD></TR>";
                            }
                            htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                                + "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                                + "<tr><td colspan=3 align=left><span class=c2><b> Physician Benchmarking Report </b></span></td><td align=right valign=top>&nbsp;";
                        }
                        if (!(this.activeTab == "Summary By Specialty")) return [3 /*break*/, 6];
                        if (this.selectedSltRngeLbl == "Yearly") {
                            this.Hlfqtrmnthlbltxt = "";
                            this.Hlfqtrmnthlbl = "";
                        }
                        _DS = [];
                        return [4 /*yield*/, JSON.parse(sessionStorage.getItem('_DS'))];
                    case 4:
                        _DS = (_a.sent());
                        htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                            + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse>"
                            + "<tr bgcolor=#d3d3d3>"
                            + "<td align= center width= 10 % nowrap> <span class=c3><b>Range:</b></span>"
                            + "<span class=c3>" + this.selectedSltRngeLbl + "</span></td> "
                            + "<td align= center width= 10 % nowrap><span class=c3><b>Year:</b></span>"
                            + "<span class=c3>" + this.ddltyear + "</span></td> "
                            + "<td align= center width= 10 % nowrap><span class=c3><b>" + this.Hlfqtrmnthlbltxt + "</b></span>"
                            + "<span class=c3>" + this.Hlfqtrmnthlbl + "</span></td> "
                            + "</tr></table><tr></tr><tr><td colspan=2><br/>"
                            + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                            + "<tr bgcolor=#d3d3d3>"
                            + "<td align=center width=20% nowrap><span class=c3><b>Specialty</b></span></td>"
                            + "<td align=center width=15% nowrap><span class=c3><b># Procedures</b></span></td>"
                            + "<td align=center width=15% nowrap><span class=c3><b># Physicians</b></span></td>"
                            + "<td align=center width=15% nowrap><span class=c3><b>Total Spend</b></span></td>"
                            + "<td align=center width=10% nowrap><span class=c3><b>Total Variance</b></span></td>"
                            + "</tr>";
                        return [4 /*yield*/, _DS.forEach(function (header) {
                                htmlBuilder += "<tr>"
                                    + "<td align=left nowrap><span class=c3>" + header.SPECIALTY_DESCRIPTION + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + header.NO_OF_PROCEDURES.toLocaleString('en-US') + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + header.NO_OF_PHYSICIANS.toLocaleString('en-US') + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + header.TOTAL_SPEND.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + header.TOTAL_VARIANCE.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td>"
                                    + "</tr>";
                            })];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 12];
                    case 6:
                        if (!(this.activeTab == "Physician Ranking")) return [3 /*break*/, 9];
                        if (this.selectedSltRngeLbl == "Yearly") {
                            this.Hlfqtrmnthlbltxt = "";
                            this.Hlfqtrmnthlbl = "";
                        }
                        _DS = [];
                        return [4 /*yield*/, JSON.parse(sessionStorage.getItem('_DSPhyRnk'))];
                    case 7:
                        _DS = (_a.sent());
                        htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                            + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse>"
                            + "<tr bgcolor=#d3d3d3>"
                            + "<td align= center width= 10 % nowrap> <span class=c3><b>Range:</b></span>"
                            + "<span class=c3>" + this.selectedSltRngeLbl + "</span></td> "
                            + "<td align= center width= 10 % nowrap><span class=c3><b>Year:</b></span>"
                            + "<span class=c3>" + this.ddltyear + "</span></td> "
                            + "<td align= center width= 10 % nowrap><span class=c3><b>Specialty:</b></span>"
                            + "<span class=c3>" + this.VarnceSpecialityDescription + "(" + this.VarnceSpecialityCode + ")" + "</span></td> "
                            + "<td align= center width= 10 % nowrap><span class=c3><b>" + this.Hlfqtrmnthlbltxt + "</b></span>"
                            + "<span class=c3>" + this.Hlfqtrmnthlbl + "</span></td> "
                            + "</tr></table><tr></tr><tr><td colspan=2><br/>"
                            + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                            + "<tr bgcolor=#d3d3d3>"
                            + "<td align=center width=20% nowrap><span class=c3><b>Rank</b></span></td>"
                            + "<td align=center width=20% nowrap><span class=c3><b>Physician</b></span></td>"
                            + "<td align=center width=15% nowrap><span class=c3><b># Procedures</b></span></td>"
                            + "<td align=center width=15% nowrap><span class=c3><b>Total Spend</b></span></td>"
                            + "<td align=center width=10% nowrap><span class=c3><b>Total Variance</b></span></td>"
                            + "<td align=center width=10% nowrap><span class=c3><b>% Variance over Total Spend</b></span></td>"
                            + "</tr>";
                        return [4 /*yield*/, _DS.forEach(function (header) {
                                htmlBuilder += "<tr>"
                                    + "<td align=left nowrap><span class=c3>" + header.PHYSICIAN_RANK + "</span></td>"
                                    + "<td align=left nowrap><span class=c3>" + header.PHYSICIAN_NAME + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + header.NO_OF_PROCEDURES.toLocaleString('en-US') + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + header.TOTAL_SPEND.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + header.TOTAL_VARIANCE.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + header.PER_VAR_TOTAL_SPEND.toFixed(2) + "%" + "</span></td>"
                                    + "</tr>";
                            })];
                    case 8:
                        _a.sent();
                        return [3 /*break*/, 12];
                    case 9:
                        if (!(this.activeTab == "Physician Score Card")) return [3 /*break*/, 12];
                        if (this.selectedSltRngeLbl == "Yearly") {
                            this.Hlfqtrmnthlbltxt = "";
                            this.Hlfqtrmnthlbl = "";
                        }
                        _DS = [];
                        return [4 /*yield*/, JSON.parse(sessionStorage.getItem('_DSPhyScrCrd'))];
                    case 10:
                        _DS = (_a.sent());
                        htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                            + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse>"
                            + "<tr bgcolor=#d3d3d3>"
                            + "<td align= center width= 10 % nowrap> <span class=c3><b>Range:</b></span>"
                            + "<span class=c3>" + this.selectedSltRngeLbl + "</span></td> "
                            + "<td align= center width= 10 % nowrap><span class=c3><b>Year:</b></span>"
                            + "<span class=c3>" + this.ddltyear + "</span></td> "
                            + "<td align= center width= 10 % nowrap><span class=c3><b>" + this.Hlfqtrmnthlbltxt + "</b></span>"
                            + "<span class=c3>" + this.Hlfqtrmnthlbl + "</span></td> "
                            + "<td align= center width= 10 % nowrap>"
                            + "<span class=c3><b>Specialty:</b></span>"
                            + this.VarnceSpecialityCode
                            + "</td>"
                            + "<td align= center width= 10 % nowrap>"
                            + "<span class=c3><b>Physician Name:</b></span>"
                            + this.Phyname
                            + "</td>"
                            + "</tr>"
                            + "</table>"
                            + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                            + "<tr bgcolor=#d3d3d3>"
                            + "<td align=center colspan=8 nowrap></td>"
                            + "<td align=center colspan=4 nowrap><span class=c3><b>Department Totals</b></span></td>"
                            + "</tr>"
                            + "<tr bgcolor=#d3d3d3>"
                            + "<td align=center width=20% nowrap><span class=c3><b>Procedure Code</b></span></td>"
                            + "<td align=center width=20% nowrap><span class=c3><b>Procedure Description</b></span></td>"
                            + "<td align=center width=10% nowrap><span class=c3><b># Procedures</b></span></td>"
                            + "<td align=center width=10% nowrap><span class=c3><b>% Procedures Performed</b></span></td>"
                            + "<td align=center width=15% nowrap><span class=c3><b>Average Cost</b></span></td>"
                            + "<td align=center width=15% nowrap><span class=c3><b>Variance from Low Average Cost</b></span></td>"
                            + "<td align=center width=15% nowrap><span class=c3><b>Extended Variance</b></span></td>"
                            + "<td align=center width=10% nowrap><span class=c3><b>Rank</b></span></td>"
                            + "<td align=center width=10% nowrap><span class=c3><b>&nbsp;</b></span></td>"
                            + "<td align=center width=10% nowrap><span class=c3><b># Physicians</b></span></td>"
                            + "<td align=center width=10% nowrap><span class=c3><b># Procedures</b></span></td>"
                            + "<td align=center width=15% nowrap><span class=c3><b>Low Cost Average</b></span></td>"
                            + "</tr>";
                        return [4 /*yield*/, _DS.forEach(function (header) {
                                htmlBuilder += "<tr>"
                                    + "<td align=left nowrap><span class=c3>" + header.PROCEDURE_CODE + "</span></td>"
                                    + "<td align=left nowrap><span class=c3>" + header.PROCEDURE_DESCRIPTION + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + header.NO_OF_PROCEDURES.toLocaleString('en-US') + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + header.PER_PROC_PERFORMED.toFixed(2) + "%" + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + header.AVG_PROC_COST.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + header.VAR_FROM_LOW_AVG.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + header.EXTENDED_VARIANCE.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + header.PHYSICIAN_RANK.toLocaleString('en-US') + "</span></td>"
                                    + "<td align=right nowrap></td>"
                                    + "<td align=right nowrap><span class=c3>" + header.NO_OF_PHY_DEPT.toLocaleString('en-US') + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + header.NO_OF_PROCS_DEPT.toLocaleString('en-US') + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + header.LOW_COST_AVG_DEPT.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td>"
                                    + "</tr>";
                            })];
                    case 11:
                        _a.sent();
                        _a.label = 12;
                    case 12:
                        htmlBuilder += "</table></Table>";
                        return [2 /*return*/, htmlBuilder];
                    case 13:
                        ex_6 = _a.sent();
                        htmlBuilder = '';
                        return [2 /*return*/, htmlBuilder];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    PhysicianBenchMarkingComponent.prototype.onPrintClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, newwindow, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        event.stopImmediatePropagation();
                        this.spinnerservice.start();
                        return [4 /*yield*/, this.exportReportDetails('Print')];
                    case 1:
                        html = _a.sent();
                        if (html != '' && html != null) {
                            newwindow = window.open('', 'PRINT', 'height=600,width=600');
                            newwindow.document.write('<html><head><title>' + 'Point Of Use - Physician Benchmarking Report' + '</title>');
                            newwindow.document.write('</head><body >');
                            newwindow.document.write(html);
                            newwindow.document.write('</body></html>');
                            newwindow.document.close(); // necessary for IE >= 10
                            newwindow.focus(); // necessary for IE >= 10*/
                            newwindow.print();
                            newwindow.close();
                            return [2 /*return*/, true];
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_7 = _a.sent();
                        this.displayCatchException(ex_7);
                        return [2 /*return*/, false];
                    case 3:
                        this.spinnerservice.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PhysicianBenchMarkingComponent.prototype.onSendMailIconClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.isMailDialog = true;
                    this.toMailAddr = '';
                }
                catch (ex) {
                    this.displayCatchException(ex);
                }
                return [2 /*return*/];
            });
        });
    };
    PhysicianBenchMarkingComponent.prototype.onSendMailClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var html, toAddr, ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, 5, 6]);
                        this.spinnerservice.start();
                        return [4 /*yield*/, this.exportReportDetails('Mail')];
                    case 1:
                        html = _a.sent();
                        toAddr = '';
                        this.msgs = [];
                        if (!(html != '' && html != null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.atparcommonservice.sendEmbeddedEmail(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId], 'Physician Benchmarking Report', JSON.stringify(html), this.toMailAddr, '', 'false', AtParEnums_1.MailPriority.Normal.toString(), '')
                                .catch(this.httpservice.handleError)
                                .then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                            })];
                    case 2:
                        _a.sent();
                        if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Mail has been sent' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_FROM_ADDRESS) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'From Address is Missing! Please Contact Administrator' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_TO_ADDRESS) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Please Enter To Email Address' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_SUBJECT) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Subject is Missing! Please Contact Administrator' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_BODY) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Body is Missing! Please contact Administrator' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_SMTP_SERVER_MISSING) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Mail Server is Not Configured! Please Contact Administrator' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_SEND_FAILED) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Mail Not Sent. Please Try Again' });
                        }
                        else {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Error while sending mail' });
                        }
                        _a.label = 3;
                    case 3:
                        this.isMailDialog = false;
                        this.toMailAddr = '';
                        return [3 /*break*/, 6];
                    case 4:
                        ex_8 = _a.sent();
                        this.displayCatchException(ex_8);
                        return [3 /*break*/, 6];
                    case 5:
                        this.spinnerservice.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    PhysicianBenchMarkingComponent.prototype.enableSelectedTab = function (option) {
        this.ctab = option.tab;
        this.ctabs = option.tabs;
        if (option.tab.title == 'Summary By Specialty') {
            this.activeTab = "Summary By Specialty";
            if (this.selectedSltRnge != "Y1") {
                this.gvSummaryBySpecialty = true;
                this.showGrid = true;
                this.tdExports = true;
            }
            if (this.lstSummaryBySpecialty != null && this.lstSummaryBySpecialty.length > 0) {
                this.lstLength = this.lstSummaryBySpecialty.length + " Record(s) found";
                sessionStorage.setItem('_DS', JSON.stringify(this.lstSummaryBySpecialty));
                this.tdExports = true;
            }
            else {
                this.gvSummaryBySpecialty = false;
                this.showGrid = false;
                this.tdExports = false;
            }
        }
        else if (option.tab.title == 'Physician Ranking') {
            if (this.lstPhyBnchMrkRnkData != null && this.lstPhyBnchMrkRnkData.length > 0) {
                this.lstLength = this.lstPhyBnchMrkRnkData.length + " Record(s) found";
                this.activeTab = "Physician Ranking";
                this.gvPhyRanking = true;
                this.showGrid = true;
                this.tdExports = true;
                if (option.tabs != null) {
                    this.ctab = option.tabs.filter(function (tab) { return tab.title == 'Physician Ranking'; })[0];
                }
                option.tabs.filter(function (tab) { return tab.title == 'Summary By Specialty'; })[0].active = false;
                option.tabs.filter(function (tab) { return tab.title == 'Physician Score Card'; })[0].active = false;
            }
            else {
                if (this.lstSummaryBySpecialty != null && this.lstSummaryBySpecialty.length > 0) {
                    this.lstLength = this.lstSummaryBySpecialty.length + " Record(s) found";
                    this.tdExports = true;
                }
                else {
                    this.tdExports = false;
                }
                this.activeTab = "Summary By Specialty";
                if (option.tabs != null) {
                    this.ctab = option.tabs.filter(function (tab) { return tab.title == 'Summary By Specialty'; })[0];
                }
                option.tabs.filter(function (tab) { return tab.title == 'Physician Ranking'; })[0].active = false;
                option.tabs.filter(function (tab) { return tab.title == 'Physician Score Card'; })[0].active = false;
            }
        }
        else if (option.tab.title == 'Physician Score Card') {
            if (this.lstPhyScrCrdData != null && this.lstPhyScrCrdData.length > 0) {
                this.lstLength = this.lstPhyScrCrdData.length + " Record(s) found";
                this.activeTab = "Physician Score Card";
                this.gvPhyScoreCard = true;
                this.showGrid = true;
                this.tdExports = true;
                if (option.tabs != null) {
                    this.ctab = option.tabs.filter(function (tab) { return tab.title == 'Physician Score Card'; })[0];
                }
                option.tabs.filter(function (tab) { return tab.title == 'Summary By Specialty'; })[0].active = false;
                option.tabs.filter(function (tab) { return tab.title == 'Physician Ranking'; })[0].active = false;
            }
            else if (this.activeTab == "Summary By Specialty" && this.lstPhyScrCrdData.length == 0) {
                if (this.lstSummaryBySpecialty != null && this.lstSummaryBySpecialty.length > 0) {
                    this.lstLength = this.lstSummaryBySpecialty.length + " Record(s) found";
                    this.tdExports = true;
                }
                else {
                    this.tdExports = false;
                }
                this.activeTab = "Summary By Specialty";
                if (option.tabs != null) {
                    this.ctab = option.tabs.filter(function (tab) { return tab.title == 'Summary By Specialty'; })[0];
                }
                option.tabs.filter(function (tab) { return tab.title == 'Physician Ranking'; })[0].active = false;
                option.tabs.filter(function (tab) { return tab.title == 'Physician Score Card'; })[0].active = false;
            }
            else if (this.activeTab == "Physician Ranking" && this.lstPhyScrCrdData.length == 0) {
                if (this.lstPhyBnchMrkRnkData != null && this.lstPhyBnchMrkRnkData.length > 0) {
                    this.lstLength = this.lstPhyBnchMrkRnkData.length + " Record(s) found";
                    this.tdExports = true;
                }
                else {
                    this.tdExports = false;
                }
                this.activeTab = "Physician Ranking";
                if (option.tabs != null) {
                    this.ctab = option.tabs.filter(function (tab) { return tab.title == 'Physician Ranking'; })[0];
                }
                option.tabs.filter(function (tab) { return tab.title == 'Summary By Specialty'; })[0].active = false;
                option.tabs.filter(function (tab) { return tab.title == 'Physician Score Card'; })[0].active = false;
            }
        }
        if (option != null) {
            this.ctab.active = true;
            if (option.tabs != null && this.tabs == null) {
                this.tabs = option.tabs;
            }
        }
    };
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], PhysicianBenchMarkingComponent.prototype, "dataTableComponent", void 0);
    PhysicianBenchMarkingComponent = __decorate([
        core_1.Component({
            templateUrl: 'pou-physician-bench-mark.html',
            providers: [AtParConstants_1.AtParConstants, atpar_common_service_1.AtParCommonService, pou_physician_bench_mark_service_1.POUPhysicianBenchmarkingService, yearview_calender_1.yearviewcalender]
        }),
        __metadata("design:paramtypes", [leftbar_animation_service_1.LeftBarAnimationService,
            router_1.Router,
            HttpService_1.HttpService,
            event_spinner_service_1.SpinnerService,
            AtParConstants_1.AtParConstants,
            atpar_common_service_1.AtParCommonService, pou_physician_bench_mark_service_1.POUPhysicianBenchmarkingService, yearview_calender_1.yearviewcalender])
    ], PhysicianBenchMarkingComponent);
    return PhysicianBenchMarkingComponent;
}());
exports.PhysicianBenchMarkingComponent = PhysicianBenchMarkingComponent;
//# sourceMappingURL=pou-physician-bench-mark.component.js.map