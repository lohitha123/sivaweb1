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
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var HttpService_1 = require("../Shared/HttpService");
var pou_preference_card_optimization_service_1 = require("./pou-preference-card-optimization.service");
var VM_POU_PREF_OPT_HEADER_DATA_1 = require("../Entities/VM_POU_PREF_OPT_HEADER_DATA");
var AtParConstants_1 = require("../Shared/AtParConstants");
var routepath_1 = require("../AtPar/Menus/routepath");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var core_2 = require("@angular/core");
var file_saver_1 = require("file-saver");
var AtParEnums_1 = require("../Shared/AtParEnums");
//declare var module: {
//    id: string;
//}
var PreferenceCardOptimizationComponent = (function () {
    function PreferenceCardOptimizationComponent(httpService, commonService, spinnerService, prefCardOptService, atParConstant) {
        this.httpService = httpService;
        this.commonService = commonService;
        this.spinnerService = spinnerService;
        this.prefCardOptService = prefCardOptService;
        this.atParConstant = atParConstant;
        this.noOfRecords = 0;
        this.lblResultCount = 0;
        this.lblProcRowCount = 0;
        this.lblOptRecsCount = 0;
        this.prefOptBySpecialityRows = 0;
        this.prefOptByProcRows = 0;
        this.prefOptimizeRows = 0;
        this.statusCode = -1;
        this.strUserId = '';
        this.deviceTokenEntry = [];
        this.strMaxAllowQty = '';
        this.selectedRange = '8';
        this.selectedYear = '';
        this.selectedHQM = '';
        this.selectedHalfYear = '';
        this.selectedQuarter = '';
        this.selectedMonth = '';
        this.toMailAddr = '';
        this.lblSpeciality = '';
        this.lblSpecialityDesc = '';
        this.OptRemoveValue = '31';
        this.OptHoldValue1 = '31';
        this.OptHoldValue2 = '70';
        this.OptOpenValue = '70';
        this.lblPrefCardName = '';
        this.lblProcedure = '';
        this.lblPhysician = '';
        this.lessImg = '';
        this.addToHoldImg = '';
        this.greaterImg = '';
        this.lblSelectedRange = '';
        this.lblSelectedHQM = '';
        this.strSelectedHQM = '';
        this.lstRange = [];
        this.lstYear = [];
        this.lstHQM = [];
        this.lstMonths = [];
        this.selectedDDHQM = true;
        this.gvPrefSpeciality = false;
        this.tdExports = false;
        this.showSpecialityGrid = false;
        this.showProcedureGrid = false;
        //SHOW_PHYSICIAN_GRID: boolean = false;
        this.showOptimizationGrid = false;
        this.isMailDialog = false;
        this.isPostback = false;
        this.tabSpeciality = true;
        this.tabProcedure = false;
        this.tabOptimization = false;
        this.tabProcedureDisabled = true;
        this.tabOptimizationDisabled = true;
        this.showDynamictbl = false;
        this.showHQMValues = false;
        this.msgs = [];
        this.dvPrefOptBySpeciality = [];
        this.lstSpecialityFilterData = [];
        this.dvPrefOptByProcedure = [];
        this.lstProcedureDtls = [];
        this.lstPhysicianDetails = [];
        this.prefOptHeaderDetails = [];
        this.lstDetails = [];
        this.prefOptDetailsData = [];
        this.tempPrefOptDtlsData = [];
        this.expandedItems = new Array();
        this.hdrDtlsParams = null;
        try {
            this.spinnerService.start();
            this.breadCrumbMenu = new routepath_1.Menus();
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.noOfRecords = parseInt(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage]);
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
        this.spinnerService.stop();
    }
    PreferenceCardOptimizationComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cYear, year, _a, ex_1, imgserverPath, ex_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.showSpecialityGrid = false;
                        this.showProcedureGrid = false;
                        this.showOptimizationGrid = false;
                        this.lstRange = [];
                        this.lstRange.push({ label: 'Select Value', value: '8' });
                        this.lstRange.push({ label: 'Yearly', value: '0' });
                        this.lstRange.push({ label: 'Half Yearly', value: '1' });
                        this.lstRange.push({ label: 'Quarterly', value: '2' });
                        this.lstRange.push({ label: 'Monthly', value: '3' });
                        cYear = (new Date()).getFullYear();
                        this.lstYear = [];
                        this.lstYear.push({ label: "Select Year", value: "Select Year" });
                        for (year = (cYear - 50); year <= cYear; year++) {
                            this.lstYear.push({
                                label: '' + year + '',
                                value: '' + year + ''
                            });
                        }
                        this.lstHQM = [];
                        this.lstHQM.push({ label: "Select Value", value: "Select Value" });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 8, 9, 10]);
                        try {
                            this.spinnerService.start();
                            this.statusCode = -1;
                            this.strUserId = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID];
                        }
                        catch (ex) {
                            this.msgs = [];
                            this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Failed to get Parameters' });
                            return [2 /*return*/];
                        }
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        _a = this;
                        return [4 /*yield*/, this.getProfileParamValue()];
                    case 3:
                        _a.statusCode = _b.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.msgs = [];
                            this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Internal Server Error' });
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        ex_1 = _b.sent();
                        this.msgs = [];
                        this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Internal Server Error' });
                        return [2 /*return*/];
                    case 5: return [4 /*yield*/, this.getServerIP()];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, this.getSSLConfigDetails()];
                    case 7:
                        _b.sent();
                        imgserverPath = '';
                        //imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
                        imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/AtPar/AtParWebApi/assets/images/';
                        this.lessImg = imgserverPath + "less.png";
                        this.addToHoldImg = imgserverPath + "Addtohold.png";
                        this.greaterImg = imgserverPath + "greater.png";
                        return [3 /*break*/, 10];
                    case 8:
                        ex_2 = _b.sent();
                        this.clientErrorMsg(ex_2);
                        return [3 /*break*/, 10];
                    case 9:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    PreferenceCardOptimizationComponent.prototype.onGoClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var returnValue, selectedRangeIndex, selectedHQMIndex, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, 6, 7]);
                        this.spinnerService.start();
                        this.statusCode = -1;
                        this.msgs = [];
                        this.lblResultCount = 0;
                        this.dvPrefOptByProcedure = [];
                        this.prefOptDetailsData = [];
                        this.lblSelectedRange = '';
                        this.strSelectedHQM = '';
                        this.showHQMValues = false;
                        returnValue = false;
                        this.tdExports = false;
                        this.activeTab = 'By Speciality';
                        return [4 /*yield*/, this.validateFields()];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 4];
                        this.msgs = [];
                        this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: 'Getting data....' });
                        return [4 /*yield*/, this.getHQMDDValues()];
                    case 2:
                        _a.sent();
                        selectedRangeIndex = this.lstRange.findIndex(function (x) { return x.value == _this.selectedRange; });
                        this.lblSelectedRange = this.lstRange[selectedRangeIndex].label;
                        if (this.selectedRange != null && this.selectedRange != '' && this.selectedRange != 'Select Value' && this.selectedRange != '0' && this.selectedRange != '8') {
                            selectedHQMIndex = this.lstHQM.findIndex(function (x) { return x.value == _this.selectedHQM; });
                            if (this.lblSelectedHQM == "Month") {
                                this.strSelectedHQM = this.lstMonths[selectedHQMIndex].label;
                            }
                            else {
                                this.strSelectedHQM = this.lstHQM[selectedHQMIndex].label;
                            }
                            this.showHQMValues = true;
                        }
                        else {
                            this.lblSelectedHQM = '';
                        }
                        return [4 /*yield*/, this.bindPrefOptBySummaryGrid()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3);
                        return [3 /*break*/, 7];
                    case 6:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    PreferenceCardOptimizationComponent.prototype.getHQMDDValues = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.selectedRange != null && this.selectedRange != '' && this.selectedRange != 'Select Value') {
                    if (this.selectedRange == '1') {
                        this.selectedHalfYear = this.selectedHQM;
                        this.lblSelectedHQM = "Half Year:";
                    }
                    else if (this.selectedRange == '2') {
                        this.selectedQuarter = this.selectedHQM;
                        this.lblSelectedHQM = "Quarter:";
                    }
                    else if (this.selectedRange == '3') {
                        this.selectedMonth = this.selectedHQM;
                        this.lblSelectedHQM = "Month:";
                    }
                }
                return [2 /*return*/, true];
            });
        });
    };
    PreferenceCardOptimizationComponent.prototype.ddItemIDChanged = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.selectedRange != null && this.selectedRange != '' && this.selectedRange != 'Select Value') {
                    this.lstHQM = [];
                    this.lstMonths = [];
                    this.selectedHQM = "Select Value";
                    this.selectedHalfYear = '';
                    this.selectedQuarter = '';
                    this.selectedMonth = '';
                    this.tdExports = false;
                    if (this.activeTab.trim() == 'By Speciality') {
                        this.dvPrefOptBySpeciality = [];
                        this.showSpecialityGrid = false;
                    }
                    else if (this.activeTab.trim() == 'By Procedure') {
                        this.dvPrefOptByProcedure = [];
                        this.showProcedureGrid = false;
                    }
                    else if (this.activeTab.trim() == 'Optimization') {
                        this.prefOptDetailsData = [];
                        this.showOptimizationGrid = false;
                    }
                    if (this.selectedRange == '0') {
                        this.selectedDDHQM = false;
                    }
                    else if (this.selectedRange == '1') {
                        this.lstHQM.push({ label: "Select Value", value: "Select Value" });
                        this.lstHQM.push({ label: 'First Half(Jan-Jun)', value: '1' });
                        this.lstHQM.push({ label: 'Second Half(July-Dec)', value: '2' });
                    }
                    else if (this.selectedRange == '2') {
                        this.lstHQM.push({ label: "Select Value", value: "Select Value" });
                        this.lstHQM.push({ label: 'Q1(Jan-Mar)', value: '1' });
                        this.lstHQM.push({ label: 'Q2(Apr-Jun)', value: '2' });
                        this.lstHQM.push({ label: 'Q3(July-Sep)', value: '3' });
                        this.lstHQM.push({ label: 'Q4(Oct-Dec)', value: '4' });
                    }
                    else if (this.selectedRange == '3') {
                        this.lstHQM.push({ label: "Select Value", value: "Select Value" });
                        this.lstHQM.push({ label: 'Jan', value: '1' });
                        this.lstHQM.push({ label: 'Feb', value: '2' });
                        this.lstHQM.push({ label: 'Mar', value: '3' });
                        this.lstHQM.push({ label: 'Apr', value: '4' });
                        this.lstHQM.push({ label: 'May', value: '5' });
                        this.lstHQM.push({ label: 'Jun', value: '6' });
                        this.lstHQM.push({ label: 'July', value: '7' });
                        this.lstHQM.push({ label: 'Aug', value: '8' });
                        this.lstHQM.push({ label: 'Sep', value: '9' });
                        this.lstHQM.push({ label: 'Oct', value: '10' });
                        this.lstHQM.push({ label: 'Nov', value: '11' });
                        this.lstHQM.push({ label: 'Dec', value: '12' });
                        this.lstMonths.push({ label: "Select Value", value: "Select Value" });
                        this.lstMonths.push({ label: 'January', value: '1' });
                        this.lstMonths.push({ label: 'February', value: '2' });
                        this.lstMonths.push({ label: 'March', value: '3' });
                        this.lstMonths.push({ label: 'April', value: '4' });
                        this.lstMonths.push({ label: 'May', value: '5' });
                        this.lstMonths.push({ label: 'June', value: '6' });
                        this.lstMonths.push({ label: 'July', value: '7' });
                        this.lstMonths.push({ label: 'August', value: '8' });
                        this.lstMonths.push({ label: 'September', value: '9' });
                        this.lstMonths.push({ label: 'October', value: '10' });
                        this.lstMonths.push({ label: 'November', value: '11' });
                        this.lstMonths.push({ label: 'December', value: '12' });
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    PreferenceCardOptimizationComponent.prototype.bindPrefOptBySummaryGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ds, dvCharges, tempTodate, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.statusCode = -1;
                        this.msgs = [];
                        ds = [];
                        dvCharges = [];
                        tempTodate = '';
                        //let strDeptID: string = this.selectedDept;
                        this.lstSpecialityFilterData = null;
                        this.lblResultCount = 0;
                        this.dvPrefOptBySpeciality = [];
                        //await this.prefCardOptService.getPrefOptBySpeciality(2016, 0, 0, 0)
                        return [4 /*yield*/, this.prefCardOptService.getPrefOptBySpeciality(this.selectedYear, this.selectedHalfYear, this.selectedQuarter, this.selectedMonth)
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                    _this.tdExports = false;
                                    _this.showSpecialityGrid = false;
                                    _this.lblResultCount = 0;
                                    _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No data found for the given search criteria' });
                                    return;
                                }
                                else if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    _this.dvPrefOptBySpeciality = data.DataList;
                                    if (_this.dvPrefOptBySpeciality.length > 0) {
                                        _this.lblResultCount = _this.dvPrefOptBySpeciality.length;
                                        if (_this.noOfRecords == 0) {
                                            _this.prefOptBySpecialityRows = _this.dvPrefOptBySpeciality.length;
                                        }
                                        else {
                                            _this.prefOptBySpecialityRows = _this.noOfRecords;
                                        }
                                        sessionStorage.setItem('_DS', JSON.stringify(data.DataList));
                                        _this.showSpecialityGrid = true;
                                        _this.tdExports = true;
                                    }
                                }
                                else if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL) {
                                    _this.tdExports = false;
                                    _this.showSpecialityGrid = false;
                                    _this.lblResultCount = 0;
                                    _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Local DB select failed' });
                                    return;
                                }
                                else if (_this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    _this.tdExports = false;
                                    _this.showSpecialityGrid = false;
                                    _this.lblResultCount = 0;
                                    _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Failed to get speciality details' });
                                    return;
                                }
                            })];
                    case 1:
                        //await this.prefCardOptService.getPrefOptBySpeciality(2016, 0, 0, 0)
                        _a.sent();
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
    PreferenceCardOptimizationComponent.prototype.onSpecilaityItemClick = function (field, event) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        this.activeTab = "By Procedure";
                        this.ctabs.filter(function (tab) { return tab.title == 'By Speciality'; })[0].active = false;
                        this.ctabs.filter(function (tab) { return tab.title == 'By Procedure'; })[0].active = true;
                        this.ctabs.filter(function (tab) { return tab.title == 'Optimization'; })[0].active = false;
                        this.spinnerService.start();
                        //this.showSpecialityGrid = false;
                        //alert("second tab");  
                        if (field != null) {
                            //alert("" + field.SPECIALTY_CODE);
                            this.lblSpeciality = field.SPECIALTY_CODE;
                            this.lblSpecialityDesc = field.SPECIALTY_DESCRIPTION;
                        }
                        return [4 /*yield*/, this.bindPrefOptByProceduerGrid()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        ex_5 = _a.sent();
                        this.clientErrorMsg(ex_5);
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PreferenceCardOptimizationComponent.prototype.onPhysicianItemClick = function (field, event) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //alert("second tab");
                        this.activeTab = "Optimization";
                        this.ctabs.filter(function (tab) { return tab.title == 'Optimization'; })[0].active = true;
                        this.ctabs.filter(function (tab) { return tab.title == 'By Speciality'; })[0].active = false;
                        this.ctabs.filter(function (tab) { return tab.title == 'By Procedure'; })[0].active = false;
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 6]);
                        if (!(field != null)) return [3 /*break*/, 3];
                        this.lblPrefCardName = field.PREF_LIST_ID;
                        this.lblProcedure = field.PROCEDURE_CODE;
                        this.lblPhysician = field.PHYSICIAN_NAME;
                        //await this.getPrefOptHeaderdetails(field);
                        this.hdrDtlsParams = field;
                        return [4 /*yield*/, this.bindPrefOptimizationGrid(field)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 6];
                    case 4:
                        ex_6 = _a.sent();
                        this.clientErrorMsg(ex_6);
                        return [3 /*break*/, 6];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    PreferenceCardOptimizationComponent.prototype.onProcedureGoClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var returnValue, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, 6, 7]);
                        this.spinnerService.start();
                        this.statusCode = -1;
                        this.msgs = [];
                        this.prefOptDetailsData = [];
                        returnValue = false;
                        this.tdExports = false;
                        return [4 /*yield*/, this.validateFields()];
                    case 1:
                        returnValue = _a.sent();
                        if (!returnValue) return [3 /*break*/, 4];
                        this.msgs = [];
                        this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: 'Getting data....' });
                        return [4 /*yield*/, this.getHQMDDValues()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.bindPrefOptByProceduerGrid()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        ex_7 = _a.sent();
                        this.clientErrorMsg(ex_7);
                        return [3 /*break*/, 7];
                    case 6:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    PreferenceCardOptimizationComponent.prototype.onOptimizationGoClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var returnValue, ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, 5, 6]);
                        this.spinnerService.start();
                        this.statusCode = -1;
                        this.msgs = [];
                        this.lblOptRecsCount = 0;
                        returnValue = false;
                        this.tdExports = false;
                        return [4 /*yield*/, this.validateFields()];
                    case 1:
                        returnValue = _a.sent();
                        if (!returnValue) return [3 /*break*/, 3];
                        this.msgs = [];
                        this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: 'Getting data....' });
                        //await this.getHQMDDValues();           
                        return [4 /*yield*/, this.bindPrefOptimizationGrid(this.hdrDtlsParams)];
                    case 2:
                        //await this.getHQMDDValues();           
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
    PreferenceCardOptimizationComponent.prototype.bindPrefOptimizationGrid = function (field) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var imgserverPath, upArrow_1, downArrow_1, ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        this.statusCode = -1;
                        this.msgs = [];
                        this.prefOptDetailsData = [];
                        this.tempPrefOptDtlsData = [];
                        this.lstDetails = [];
                        this.prefOptHeaderData = new VM_POU_PREF_OPT_HEADER_DATA_1.VM_POU_PREF_OPT_HEADER_DATA();
                        this.showDynamictbl = false;
                        this.lblOptRecsCount = 0;
                        return [4 /*yield*/, this.initDefaultHeaderData()];
                    case 1:
                        _a.sent();
                        imgserverPath = '';
                        //imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
                        imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/AtPar/AtParWebApi/assets/images/';
                        upArrow_1 = imgserverPath + "up.png";
                        downArrow_1 = imgserverPath + "down.png";
                        //await this.prefCardOptService.getPrefOptDetailsData("Ortho", "ORHPART2", "ROBERTJT", "HIPARJ", 2016, 0, 0, 2)
                        return [4 /*yield*/, this.prefCardOptService.getPrefOptDetailsData(field.SPECIALTY_CODE, field.PROCEDURE_CODE, field.PHYSICIAN_ID, field.PREF_LIST_ID, this.OptRemoveValue, this.OptHoldValue1, this.OptHoldValue2, this.OptOpenValue, this.selectedYear, this.selectedHalfYear, this.selectedQuarter, this.selectedMonth)
                                .catch(this.httpService.handleError)
                                .then(function (response) {
                                var data = response.json();
                                _this.statusCode = data.StatusCode;
                                if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                    _this.tdExports = false;
                                    _this.showOptimizationGrid = false;
                                    //this.lblResultCount = 0;
                                    _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No data found' });
                                    return;
                                }
                                else if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    _this.tempPrefOptDtlsData = data.DataList;
                                    //this.prefOptDetailsData = data.DataList;
                                    if (_this.tempPrefOptDtlsData.length > 0) {
                                        _this.lblOptRecsCount = _this.tempPrefOptDtlsData.length;
                                        for (var i = 0; i <= _this.tempPrefOptDtlsData.length - 1; i++) {
                                            _this.tempPrefOptDtlsData[i].NET_CHANGE_OPEN_QTY = _this.tempPrefOptDtlsData[i].SUGGESTED_OPEN_QTY - _this.tempPrefOptDtlsData[i].CURRENT_OPEN_QTY;
                                            _this.tempPrefOptDtlsData[i].NET_CHANGE_HOLD_QTY = _this.tempPrefOptDtlsData[i].SUGGESTED_HOLD_QTY - _this.tempPrefOptDtlsData[i].CURRENT_HOLD_QTY;
                                            _this.tempPrefOptDtlsData[i].NET_CHANGE_OPEN_VALUE = (_this.tempPrefOptDtlsData[i].SUGGESTED_OPEN_QTY * _this.tempPrefOptDtlsData[i].ITEM_PRICE) - (_this.tempPrefOptDtlsData[i].CURRENT_OPEN_QTY * _this.tempPrefOptDtlsData[i].ITEM_PRICE);
                                            _this.tempPrefOptDtlsData[i].NET_CHANGE_HOLD_VALUE = (_this.tempPrefOptDtlsData[i].SUGGESTED_HOLD_QTY * _this.tempPrefOptDtlsData[i].ITEM_PRICE) - (_this.tempPrefOptDtlsData[i].CURRENT_HOLD_QTY * _this.tempPrefOptDtlsData[i].ITEM_PRICE);
                                            _this.tempPrefOptDtlsData[i].COLORCODE = ("leftCellBorder" + _this.tempPrefOptDtlsData[i].COLORCODE).trim();
                                            //this.prefOptHeaderData.CURRENT_OPEN_QTY_PRICE += (this.tempPrefOptDtlsData[i].CURRENT_OPEN_QTY * this.tempPrefOptDtlsData[i].ITEM_PRICE);
                                            //this.prefOptHeaderData.CURRENT_HOLD_QTY_PRICE += (this.tempPrefOptDtlsData[i].SUGGESTED_OPEN_QTY * this.tempPrefOptDtlsData[i].ITEM_PRICE);
                                            //this.prefOptHeaderData.SUGGESTED_OPEN_QTY_PRICE += (this.tempPrefOptDtlsData[i].CURRENT_HOLD_QTY * this.tempPrefOptDtlsData[i].ITEM_PRICE);
                                            //this.prefOptHeaderData.SUGGESTED_HOLD_QTY_PRICE += (this.tempPrefOptDtlsData[i].SUGGESTED_HOLD_QTY * this.tempPrefOptDtlsData[i].ITEM_PRICE);
                                            //this.prefOptHeaderData.CURRENT_OPEN_QTY += this.tempPrefOptDtlsData[i].CURRENT_OPEN_QTY;
                                            //this.prefOptHeaderData.SUGGESTED_OPEN_QTY += this.tempPrefOptDtlsData[i].SUGGESTED_OPEN_QTY;
                                            //this.prefOptHeaderData.CURRENT_HOLD_QTY += this.tempPrefOptDtlsData[i].CURRENT_HOLD_QTY;
                                            //this.prefOptHeaderData.SUGGESTED_HOLD_QTY += this.tempPrefOptDtlsData[i].SUGGESTED_HOLD_QTY;
                                            _this.prefOptHeaderData.CURRENT_OPEN_QTY_PRICE += (_this.tempPrefOptDtlsData[i].CURRENT_OPEN_QTY * _this.tempPrefOptDtlsData[i].ITEM_PRICE);
                                            _this.prefOptHeaderData.CURRENT_HOLD_QTY_PRICE += (_this.tempPrefOptDtlsData[i].CURRENT_HOLD_QTY * _this.tempPrefOptDtlsData[i].ITEM_PRICE);
                                            _this.prefOptHeaderData.SUGGESTED_OPEN_QTY_PRICE += (_this.tempPrefOptDtlsData[i].SUGGESTED_OPEN_QTY * _this.tempPrefOptDtlsData[i].ITEM_PRICE);
                                            _this.prefOptHeaderData.SUGGESTED_HOLD_QTY_PRICE += (_this.tempPrefOptDtlsData[i].SUGGESTED_HOLD_QTY * _this.tempPrefOptDtlsData[i].ITEM_PRICE);
                                            _this.prefOptHeaderData.CURRENT_OPEN_QTY += _this.tempPrefOptDtlsData[i].CURRENT_OPEN_QTY;
                                            _this.prefOptHeaderData.SUGGESTED_OPEN_QTY += _this.tempPrefOptDtlsData[i].SUGGESTED_OPEN_QTY;
                                            _this.prefOptHeaderData.CURRENT_HOLD_QTY += _this.tempPrefOptDtlsData[i].CURRENT_HOLD_QTY;
                                            _this.prefOptHeaderData.SUGGESTED_HOLD_QTY += _this.tempPrefOptDtlsData[i].SUGGESTED_HOLD_QTY;
                                        }
                                        //console.log(this.tempPrefOptDtlsData[1].COLORCODE);
                                        //this.tempPrefOptDtlsData.forEach(item => {
                                        //    item.NET_CHANGE_OPEN_QTY = item.SUGGESTED_OPEN_QTY - item.CURRENT_OPEN_QTY,
                                        //        item.NET_CHANGE_HOLD_QTY = item.SUGGESTED_HOLD_QTY - item.CURRENT_HOLD_QTY,
                                        //        item.NET_CHANGE_OPEN_VALUE = (item.SUGGESTED_OPEN_QTY * item.ITEM_PRICE) - (item.CURRENT_OPEN_QTY * item.ITEM_PRICE),
                                        //        item.NET_CHANGE_HOLD_VALUE = (item.SUGGESTED_HOLD_QTY * item.ITEM_PRICE) - (item.CURRENT_HOLD_QTY * item.ITEM_PRICE),
                                        //        item.COLORCODE = ("leftCellBorder" + item.COLORCODE).trim(),
                                        //        this.prefOptHeaderData.CURRENT_OPEN_QTY_PRICE += (item.CURRENT_OPEN_QTY * item.ITEM_PRICE),
                                        //        this.prefOptHeaderData.CURRENT_HOLD_QTY_PRICE += (item.SUGGESTED_OPEN_QTY * item.ITEM_PRICE),
                                        //        this.prefOptHeaderData.SUGGESTED_OPEN_QTY_PRICE += (item.CURRENT_HOLD_QTY * item.ITEM_PRICE),
                                        //        this.prefOptHeaderData.SUGGESTED_HOLD_QTY_PRICE += (item.SUGGESTED_HOLD_QTY * item.ITEM_PRICE),
                                        //        this.prefOptHeaderData.CURRENT_OPEN_QTY += item.CURRENT_OPEN_QTY,
                                        //        this.prefOptHeaderData.SUGGESTED_OPEN_QTY += item.SUGGESTED_OPEN_QTY,
                                        //        this.prefOptHeaderData.CURRENT_HOLD_QTY += item.CURRENT_HOLD_QTY,
                                        //        this.prefOptHeaderData.SUGGESTED_HOLD_QTY += item.SUGGESTED_HOLD_QTY
                                        //}); 
                                        _this.prefOptHeaderData.NET_DIFF_OPEN_QTY = _this.prefOptHeaderData.SUGGESTED_OPEN_QTY - _this.prefOptHeaderData.CURRENT_OPEN_QTY;
                                        _this.prefOptHeaderData.NET_DIFF_OPEN_QTY_PRICE = _this.prefOptHeaderData.SUGGESTED_OPEN_QTY_PRICE - _this.prefOptHeaderData.CURRENT_OPEN_QTY_PRICE;
                                        _this.prefOptHeaderData.NET_DIFF_HOLD_QTY = _this.prefOptHeaderData.SUGGESTED_HOLD_QTY - _this.prefOptHeaderData.CURRENT_HOLD_QTY;
                                        _this.prefOptHeaderData.NET_DIFF_HOLD_QTY_PRICE = _this.prefOptHeaderData.SUGGESTED_HOLD_QTY_PRICE - _this.prefOptHeaderData.CURRENT_HOLD_QTY_PRICE;
                                        _this.prefOptHeaderData.CURRENT_OPEN_HOLD_TOTAL = _this.prefOptHeaderData.CURRENT_OPEN_QTY_PRICE + _this.prefOptHeaderData.CURRENT_HOLD_QTY_PRICE;
                                        _this.prefOptHeaderData.SUGGESTED_OPEN_HOLD_TOTAL = _this.prefOptHeaderData.SUGGESTED_OPEN_QTY_PRICE + _this.prefOptHeaderData.SUGGESTED_HOLD_QTY_PRICE;
                                        _this.prefOptHeaderData.NET_DIFF_TOTAL = _this.prefOptHeaderData.SUGGESTED_OPEN_HOLD_TOTAL - _this.prefOptHeaderData.CURRENT_OPEN_HOLD_TOTAL;
                                        _this.prefOptHeaderData.NET_DIFF_OPEN_QTY_IMG = (_this.prefOptHeaderData.SUGGESTED_OPEN_QTY_PRICE > _this.prefOptHeaderData.CURRENT_OPEN_QTY_PRICE) ? upArrow_1 : downArrow_1;
                                        _this.prefOptHeaderData.NET_DIFF_HOLD_QTY_IMG = (_this.prefOptHeaderData.SUGGESTED_HOLD_QTY_PRICE > _this.prefOptHeaderData.CURRENT_HOLD_QTY_PRICE) ? upArrow_1 : downArrow_1;
                                        _this.prefOptHeaderData.NET_DIFF_TOTAL_IMG = (_this.prefOptHeaderData.SUGGESTED_OPEN_HOLD_TOTAL > _this.prefOptHeaderData.CURRENT_OPEN_HOLD_TOTAL) ? upArrow_1 : downArrow_1;
                                        _this.prefOptHeaderData.NET_DIFF_OPEN_QTY = (Math.sign(_this.prefOptHeaderData.NET_DIFF_OPEN_QTY) == -1) ? Math.abs(_this.prefOptHeaderData.NET_DIFF_OPEN_QTY) : _this.prefOptHeaderData.NET_DIFF_OPEN_QTY;
                                        _this.prefOptHeaderData.NET_DIFF_OPEN_QTY_PRICE = (Math.sign(_this.prefOptHeaderData.NET_DIFF_OPEN_QTY_PRICE) == -1) ? Math.abs(_this.prefOptHeaderData.NET_DIFF_OPEN_QTY_PRICE) : _this.prefOptHeaderData.NET_DIFF_OPEN_QTY_PRICE;
                                        _this.prefOptHeaderData.NET_DIFF_HOLD_QTY = (Math.sign(_this.prefOptHeaderData.NET_DIFF_HOLD_QTY) == -1) ? Math.abs(_this.prefOptHeaderData.NET_DIFF_HOLD_QTY) : _this.prefOptHeaderData.NET_DIFF_HOLD_QTY;
                                        _this.prefOptHeaderData.NET_DIFF_HOLD_QTY_PRICE = (Math.sign(_this.prefOptHeaderData.NET_DIFF_HOLD_QTY_PRICE) == -1) ? Math.abs(_this.prefOptHeaderData.NET_DIFF_HOLD_QTY_PRICE) : _this.prefOptHeaderData.NET_DIFF_HOLD_QTY_PRICE;
                                        _this.prefOptHeaderData.NET_DIFF_TOTAL = (Math.sign(_this.prefOptHeaderData.NET_DIFF_TOTAL) == -1) ? Math.abs(_this.prefOptHeaderData.NET_DIFF_TOTAL) : _this.prefOptHeaderData.NET_DIFF_TOTAL;
                                        if (_this.noOfRecords == 0) {
                                            _this.prefOptimizeRows = _this.tempPrefOptDtlsData.length;
                                        }
                                        else {
                                            _this.prefOptimizeRows = _this.noOfRecords;
                                        }
                                        _this.prefOptDetailsData = _this.tempPrefOptDtlsData;
                                        _this.lstDetails[0] = _this.prefOptHeaderData;
                                        sessionStorage.setItem('_optimizationDS', JSON.stringify(_this.prefOptDetailsData));
                                        sessionStorage.setItem('_prefOptHdrDataDS', JSON.stringify(_this.prefOptHeaderData));
                                        _this.showDynamictbl = true;
                                        _this.showOptimizationGrid = true;
                                        _this.tdExports = true;
                                    }
                                }
                                else if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL) {
                                    _this.tdExports = false;
                                    _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Local DB select failed' });
                                    return;
                                }
                                else if (_this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    _this.tdExports = false;
                                    _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Failed to get Optimization details' });
                                    return;
                                }
                            })];
                    case 2:
                        //await this.prefCardOptService.getPrefOptDetailsData("Ortho", "ORHPART2", "ROBERTJT", "HIPARJ", 2016, 0, 0, 2)
                        _a.sent();
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
    PreferenceCardOptimizationComponent.prototype.SetLeftCellBorderColor = function (x, opt) {
        try {
            if (opt.COLORCODE == 'leftCellBorder1') {
                x.parentNode.parentNode.style.borderLeft = "10px solid black";
            }
            else if (opt.COLORCODE == 'leftCellBorder2') {
                x.parentNode.parentNode.style.borderLeft = "10px solid cornflowerblue";
            }
            else if (opt.COLORCODE == 'leftCellBorder3') {
                x.parentNode.parentNode.style.borderLeft = "10px solid red";
            }
            else if (opt.COLORCODE == 'leftCellBorder4') {
                x.parentNode.parentNode.style.borderLeft = "10px solid green";
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    };
    PreferenceCardOptimizationComponent.prototype.initDefaultHeaderData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.prefOptHeaderData.CURRENT_OPEN_QTY = 0;
                this.prefOptHeaderData.CURRENT_OPEN_QTY_PRICE = 0;
                this.prefOptHeaderData.CURRENT_HOLD_QTY = 0;
                this.prefOptHeaderData.CURRENT_HOLD_QTY_PRICE = 0;
                this.prefOptHeaderData.SUGGESTED_OPEN_QTY = 0;
                this.prefOptHeaderData.SUGGESTED_OPEN_QTY_PRICE = 0;
                this.prefOptHeaderData.SUGGESTED_HOLD_QTY = 0;
                this.prefOptHeaderData.SUGGESTED_HOLD_QTY_PRICE = 0;
                this.prefOptHeaderData.NET_DIFF_OPEN_QTY = 0;
                this.prefOptHeaderData.NET_DIFF_OPEN_QTY_PRICE = 0;
                this.prefOptHeaderData.NET_DIFF_HOLD_QTY = 0;
                this.prefOptHeaderData.NET_DIFF_HOLD_QTY_PRICE = 0;
                this.prefOptHeaderData.CURRENT_OPEN_HOLD_TOTAL = 0;
                this.prefOptHeaderData.SUGGESTED_OPEN_HOLD_TOTAL = 0;
                this.prefOptHeaderData.NET_DIFF_TOTAL = 0;
                return [2 /*return*/];
            });
        });
    };
    PreferenceCardOptimizationComponent.prototype.bindPrefOptByProceduerGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.statusCode = -1;
                        this.msgs = [];
                        //let strDeptID: string = this.selectedDept;
                        this.lstSpecialityFilterData = null;
                        this.dvPrefOptByProcedure = [];
                        this.lstProcedureDtls = [];
                        //Cardiac
                        //await this.prefCardOptService.getPrefOptByProcedure("Ortho", 2016, 0, 0, 0)
                        return [4 /*yield*/, this.prefCardOptService.getPrefOptByProcedure(this.lblSpeciality, this.selectedYear, this.selectedHalfYear, this.selectedQuarter, this.selectedMonth)
                                .catch(this.httpService.handleError)
                                .then(function (response) {
                                var data = response.json();
                                _this.statusCode = data.StatusCode;
                                if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                    _this.tdExports = false;
                                    _this.showProcedureGrid = false;
                                    _this.lblProcRowCount = 0;
                                    _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No data found' });
                                    return;
                                }
                                else if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    _this.dvPrefOptByProcedure = data.DataList;
                                    //this.dvPrefOptByProcedure.forEach(x => x.ISSHOW = false);
                                    if (_this.dvPrefOptByProcedure.length > 0) {
                                        _this.lblProcRowCount = _this.dvPrefOptByProcedure.length;
                                        if (_this.noOfRecords == 0) {
                                            _this.prefOptByProcRows = _this.dvPrefOptByProcedure.length;
                                        }
                                        else {
                                            _this.prefOptByProcRows = _this.noOfRecords;
                                        }
                                    }
                                }
                                else if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL) {
                                    _this.tdExports = false;
                                    _this.showProcedureGrid = false;
                                    _this.lblProcRowCount = 0;
                                    _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Local DB select failed' });
                                    return;
                                }
                                else if (_this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    _this.tdExports = false;
                                    _this.showProcedureGrid = false;
                                    _this.lblProcRowCount = 0;
                                    _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Failed to get procedure details' });
                                    return;
                                }
                            })];
                    case 1:
                        //Cardiac
                        //await this.prefCardOptService.getPrefOptByProcedure("Ortho", 2016, 0, 0, 0)
                        _a.sent();
                        if (this.dvPrefOptByProcedure.length > 0) {
                            sessionStorage.setItem('_procDS', JSON.stringify(this.dvPrefOptByProcedure));
                            this.showProcedureGrid = true;
                            this.tdExports = true;
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        ex_10 = _a.sent();
                        this.clientErrorMsg(ex_10);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PreferenceCardOptimizationComponent.prototype.onProcedureItemClick = function (rowData, event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var index1, exists, expandedRowIndex, ex_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.msgs = [];
                        this.lstPhysicianDetails = [];
                        //this.SHOW_PHYSICIAN_GRID = false;
                        this.dvPrefOptByProcedure = JSON.parse(sessionStorage.getItem('_procDS'));
                        index1 = this.dvPrefOptByProcedure.findIndex(function (x) { return x.SPECIALTY_CODE == rowData.SPECIALTY_CODE && x.PROCEDURE_CODE == rowData.PROCEDURE_CODE && x.EFFICIENCY_PERCENTAGE == rowData.EFFICIENCY_PERCENTAGE && x.NO_OF_PROCEDURES == rowData.NO_OF_PROCEDURES && x.NO_OF_PREF_LISTS == rowData.NO_OF_PREF_LISTS; });
                        exists = false;
                        expandedRowIndex = -1;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        if (!(rowData != null)) return [3 /*break*/, 4];
                        this.expandedItems.forEach(function (m) {
                            //if (m == this.dvPrefOptByProcedure[index1]) exists = true;
                            if (m.SPECIALTY_CODE == _this.dvPrefOptByProcedure[index1].SPECIALTY_CODE && m.PROCEDURE_CODE == _this.dvPrefOptByProcedure[index1].PROCEDURE_CODE
                                && m.EFFICIENCY_PERCENTAGE == _this.dvPrefOptByProcedure[index1].EFFICIENCY_PERCENTAGE && m.NO_OF_PROCEDURES == _this.dvPrefOptByProcedure[index1].NO_OF_PROCEDURES
                                && m.NO_OF_PREF_LISTS == _this.dvPrefOptByProcedure[index1].NO_OF_PREF_LISTS) {
                                exists = true;
                                expandedRowIndex = _this.expandedItems.indexOf(m);
                            }
                        });
                        if (!(exists && expandedRowIndex !== -1)) return [3 /*break*/, 2];
                        //this.expandedItems.pop(this.dvPrefOptByProcedure[index1]);
                        this.expandedItems.splice(expandedRowIndex, 1);
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.getPhysicianDetails(rowData, index1)];
                    case 3:
                        _a.sent();
                        this.expandedItems.push(this.dvPrefOptByProcedure[index1]);
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        ex_11 = _a.sent();
                        this.clientErrorMsg(ex_11);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    PreferenceCardOptimizationComponent.prototype.getPhysicianDetails = function (rowData, index1) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prefCardOptService.getPrefOptByPhysician(rowData.SPECIALTY_CODE, rowData.PROCEDURE_CODE, this.selectedYear, this.selectedHalfYear, this.selectedQuarter, this.selectedMonth)
                            .catch(this.httpService.handleError)
                            .then(function (response) {
                            var data = response.json();
                            _this.statusCode = data.StatusCode;
                            if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                return;
                            }
                            else if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                _this.lstPhysicianDetails = data.DataList;
                                if (_this.lstPhysicianDetails.length > 0) {
                                    _this.dvPrefOptByProcedure[index1].PHYSICIAN_DETAILS = _this.lstPhysicianDetails;
                                    _this.dvPrefOptByProcedure[index1].SHOW_PHYSICIAN_GRID = true;
                                    sessionStorage.setItem('_procDS', JSON.stringify(_this.dvPrefOptByProcedure));
                                }
                            }
                            else if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL) {
                                //this.SHOW_PHYSICIAN_GRID = false;
                                _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Local DB select failed' });
                                return;
                            }
                            else if (_this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Failed to get physician details' });
                                //this.SHOW_PHYSICIAN_GRID = false;
                                return;
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PreferenceCardOptimizationComponent.prototype.enableSelectedTab = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    this.ctab = event.tab;
                    this.ctabs = event.tabs;
                    //if (this.isPostback) {
                    //    this.spinnerService.start();
                    //if (event != null) {
                    //    this.activeTab = event.title;
                    //}
                    //this.lblResultCount = 0;
                    this.msgs = [];
                    //if (this.activeTab.trim() == 'By Speciality') {
                    if (event.tab.title == 'By Speciality') {
                        this.activeTab = "By Speciality";
                        //this.tabSpeciality = true;
                        //this.tabProcedure = false;
                        if (this.dvPrefOptBySpeciality != null && this.dvPrefOptBySpeciality.length > 0) {
                            this.showSpecialityGrid = true;
                            this.tdExports = true;
                        }
                        else {
                            this.showSpecialityGrid = false;
                            this.tdExports = false;
                        }
                        //if (await this.validateFields()) {
                        //    //await this.bindPrefOptBySummaryGrid();                       
                        //}
                        //else {
                        //    this.showSpecialityGrid = false;
                        //    this.tdExports = false;
                        //}
                    }
                    else if (event.tab.title == 'By Procedure') {
                        if (this.dvPrefOptByProcedure != null && this.dvPrefOptByProcedure.length > 0) {
                            this.activeTab = "By Procedure";
                            this.showProcedureGrid = true;
                            this.tdExports = true;
                            if (event.tabs != null) {
                                this.ctab = event.tabs.filter(function (tab) { return tab.title == 'By Procedure'; })[0];
                            }
                            event.tabs.filter(function (tab) { return tab.title == 'By Speciality'; })[0].active = false;
                            event.tabs.filter(function (tab) { return tab.title == 'Optimization'; })[0].active = false;
                        }
                        else {
                            this.activeTab = "By Speciality";
                            if (this.dvPrefOptBySpeciality != null && this.dvPrefOptBySpeciality.length > 0) {
                                this.showSpecialityGrid = true;
                                this.tdExports = true;
                                if (event.tabs != null) {
                                    this.ctab = event.tabs.filter(function (tab) { return tab.title == 'By Speciality'; })[0];
                                }
                                event.tabs.filter(function (tab) { return tab.title == 'By Procedure'; })[0].active = false;
                                event.tabs.filter(function (tab) { return tab.title == 'Optimization'; })[0].active = false;
                            }
                            else {
                                this.showSpecialityGrid = false;
                                this.tdExports = false;
                            }
                        }
                    }
                    else if (event.tab.title == 'Optimization') {
                        if (this.prefOptDetailsData != null && this.prefOptDetailsData.length > 0) {
                            this.activeTab = "Optimization";
                            this.showOptimizationGrid = true;
                            this.tdExports = true;
                            if (event.tabs != null) {
                                this.ctab = event.tabs.filter(function (tab) { return tab.title == 'Optimization'; })[0];
                            }
                            event.tabs.filter(function (tab) { return tab.title == 'By Speciality'; })[0].active = false;
                            event.tabs.filter(function (tab) { return tab.title == 'By Procedure'; })[0].active = false;
                        }
                        else if (this.activeTab == "By Procedure" && this.prefOptDetailsData.length == 0) {
                            if (this.dvPrefOptByProcedure != null && this.dvPrefOptByProcedure.length > 0) {
                                this.activeTab = "By Procedure";
                                this.tdExports = true;
                                if (event.tabs != null) {
                                    this.ctab = event.tabs.filter(function (tab) { return tab.title == 'By Procedure'; })[0];
                                }
                                event.tabs.filter(function (tab) { return tab.title == 'By Speciality'; })[0].active = false;
                                event.tabs.filter(function (tab) { return tab.title == 'Optimization'; })[0].active = false;
                            }
                        }
                        else if (this.activeTab == "By Speciality" && this.prefOptDetailsData.length == 0) {
                            this.activeTab = "By Speciality";
                            if (this.dvPrefOptBySpeciality != null && this.dvPrefOptBySpeciality.length > 0) {
                                this.showSpecialityGrid = true;
                                this.tdExports = true;
                                this.ctab = event.tabs.filter(function (tab) { return tab.title == 'By Speciality'; })[0];
                                event.tabs.filter(function (tab) { return tab.title == 'By Procedure'; })[0].active = false;
                                event.tabs.filter(function (tab) { return tab.title == 'Optimization'; })[0].active = false;
                            }
                            else {
                                this.showOptimizationGrid = false;
                                this.tdExports = false;
                            }
                        }
                    }
                    if (event != null) {
                        //this.ctab.active = true;                
                        this.ctab = event.tabs.filter(function (tab) { return tab.title == _this.activeTab; })[0];
                        this.ctab.active = true;
                        if (event.tabs != null && this.tabs == null) {
                            this.tabs = event.tabs;
                        }
                    }
                    //} else {
                    //    this.isPostback = true;
                    //}
                }
                catch (ex) {
                    this.clientErrorMsg(ex);
                }
                finally {
                    this.spinnerService.stop();
                }
                return [2 /*return*/];
            });
        });
    };
    PreferenceCardOptimizationComponent.prototype.validateFields = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.msgs = [];
                    if (this.selectedRange == null || this.selectedRange.toString() == '' || this.selectedRange == '8' || this.selectedYear == null || this.selectedYear.toString() == '' || this.selectedYear == 'Select Year') {
                        this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please select all the fields' });
                        return [2 /*return*/, false];
                    }
                    else if ((this.selectedRange != '0') && (this.selectedHQM == null || this.selectedHQM.toString() == '' || this.selectedHQM == 'Select Value')) {
                        this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please select Half Year/Quarter/Month' });
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, true];
                }
                catch (ex) {
                    this.clientErrorMsg(ex);
                    return [2 /*return*/, false];
                }
                return [2 /*return*/];
            });
        });
    };
    PreferenceCardOptimizationComponent.prototype.onExportToExcelClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, blob, ex_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        event.stopImmediatePropagation();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.exportReportDetails('Excel')];
                    case 1:
                        html = _a.sent();
                        blob = new Blob([html], {
                            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                        });
                        file_saver_1.saveAs(blob, "POUPreferenceCardOptimizationReport.xls");
                        return [3 /*break*/, 4];
                    case 2:
                        ex_12 = _a.sent();
                        this.clientErrorMsg(ex_12);
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PreferenceCardOptimizationComponent.prototype.getServerIP = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var htmlBuilder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        htmlBuilder = '';
                        return [4 /*yield*/, this.commonService.getServerIP()
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.ipAddress = data.DataVariable.toString();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                if (data.StatType != AtParEnums_1.StatusType.Success) {
                                    htmlBuilder = '';
                                    return htmlBuilder;
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PreferenceCardOptimizationComponent.prototype.getSSLConfigDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var htmlBuilder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        htmlBuilder = '';
                        return [4 /*yield*/, this.commonService.getSSLConfigDetails()
                                .catch(this.httpService.handleError)
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
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                                if (data.StatType != AtParEnums_1.StatusType.Success) {
                                    htmlBuilder = '';
                                    return htmlBuilder;
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PreferenceCardOptimizationComponent.prototype.exportReportDetails = function (reqType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var htmlBuilder, sbMailText, _strFrmDt, _strToDt, _DS, _procDS, _optimizeDS, _OptHdrData, imgserverPath, title, _isPrintRequest, _isExcelRequest_1, colspanTwo, ex, ex_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        htmlBuilder = '';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 15, , 16]);
                        this.statusCode = -1;
                        this.msgs = [];
                        sbMailText = void 0;
                        _strFrmDt = void 0;
                        _strToDt = void 0;
                        _DS = [];
                        _procDS = [];
                        _optimizeDS = [];
                        _OptHdrData = void 0;
                        imgserverPath = '';
                        return [4 /*yield*/, this.getServerIP()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.getSSLConfigDetails()];
                    case 3:
                        _a.sent();
                        imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
                        title = '""' + "AtparVersion 2.8" + '""';
                        if (!(this.activeTab == 'By Speciality')) return [3 /*break*/, 6];
                        return [4 /*yield*/, JSON.parse(sessionStorage.getItem('_DS'))];
                    case 4:
                        _DS = (_a.sent());
                        htmlBuilder = "<Table align=left width=90% cellpadding=0 cellspacing = 0 vAlign=top>";
                        if (reqType == 'Print') {
                            htmlBuilder += "<TR width='100%'><td   colspan=2 align=left  width='100%' height=63 nowrap><img height=63 src=" + "'" + imgserverPath + 'logo.jpg' + "'" + "title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td><td align=left  width='85%' height=63 nowrap><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>"
                                + "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                                + "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                                + "<tr><td colspan=5 align=left><span class=c2><b> Preference Card Optimization Report </b></span></td><td align=right valign=top>&nbsp;";
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
                                + "<tr><td colspan=3 align=left><span class=c2><b> Preference Card Optimization Report </b></span></td><td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                            + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                            + "<tr bgcolor=#d3d3d3>"
                            + "<td align=center rowspan=3 width=12% nowrap><span class=c3><b>Speciality</b></span></td>"
                            + "<td align=center rowspan=3 width=8% nowrap><span class=c3><b>No. of Procedures</b></span></td>"
                            + "<td align=center rowspan=3 width=8% nowrap><span class=c3><b>No. of Preference Cards</b></span></td>"
                            + "<td align=center rowspan=3 width=8% nowrap><span class=c3><b>Efficiency</b></span></td>"
                            + "<td align=center colspan=2 width=12% nowrap><span class=c3><b>Total Picked</b></span></td>"
                            + "<td align=center colspan=4 width=20% nowrap><span class=c3><b>Total Issued during case</b></span></td>"
                            + "<td align=center colspan=2 width=12% nowrap><span class=c3><b>Total Returns</b></span></td>"
                            + "<td align=center colspan=2 width=12% nowrap><span class=c3><b>Total Opened/ Unused</b></span></td>"
                            + "<td align=center rowspan=3 width=8% nowrap><span class=c3><b>Total Usage</b></span></td>"
                            + "</tr>"
                            + "<tr bgcolor=#d3d3d3>"
                            + "<td align=center rowspan=2 width=6% nowrap><span class=c3><b>Qty</b></span></td>"
                            + "<td align=center rowspan=2 width=6% nowrap><span class=c3><b>Value</b></span></td>"
                            + "<td align=center colspan=2 width=10% nowrap><span class=c3><b>Existing</b></span></td>"
                            + "<td align=center colspan=2 width=10% nowrap><span class=c3><b>New</b></span></td>"
                            + "<td align=center rowspan=2 width=6% nowrap><span class=c3><b>Qty</b></span></td>"
                            + "<td align=center rowspan=2 width=6% nowrap><span class=c3><b>Value</b></span></td>"
                            + "<td align=center rowspan=2 width=6% nowrap><span class=c3><b>Qty</b></span></td>"
                            + "<td align=center rowspan=2 width=6% nowrap><span class=c3><b>Value</b></span></td>"
                            + "</tr>"
                            + "<tr bgcolor=#d3d3d3>"
                            + "<td align=center width=5% nowrap><span class=c3><b>Qty</b></span></td>"
                            + "<td align=center width=5% nowrap><span class=c3><b>Value</b></span></td>"
                            + "<td align=center width=5% nowrap><span class=c3><b>Qty</b></span></td>"
                            + "<td align=center width=5% nowrap><span class=c3><b>Value</b></span></td>"
                            + "</tr>";
                        return [4 /*yield*/, _DS.forEach(function (header) {
                                htmlBuilder += "<tr>"
                                    + "<td align=left nowrap><span class=c3>" + header.SPECIALTY_CODE + "</span></td>"
                                    + "<td align=left nowrap><span class=c3>" + header.NO_OF_PROCEDURES.toLocaleString('en-US') + "</span></td>"
                                    + "<td align=left nowrap><span class=c3>" + header.NO_OF_PREF_LISTS.toLocaleString('en-US') + "</span></td>"
                                    + "<td align=left nowrap><span class=c3>" + header.EFFICIENCY_PERCENTAGE.toFixed(2) + "%" + "</span></td>"
                                    + "<td align=left nowrap><span class=c3>" + header.TOTAL_PICKED_QTY.toLocaleString('en-US') + "</span></td>"
                                    + "<td align=left ><span class=c3>" + header.TOTAL_PICKED_VALUE.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td>"
                                    + "<td align=left nowrap><span class=c3>" + header.TOTAL_ISSUED_EXISTING_QTY.toLocaleString('en-US') + "</span></td>"
                                    + "<td align=left nowrap><span class=c3>" + header.TOTAL_ISSUED_EXISTING_VALUE.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td>"
                                    + "<td align=left nowrap><span class=c3>" + header.TOTAL_ISSUED_NEW_QTY.toLocaleString('en-US') + "</span></td>"
                                    + "<td align=left nowrap><span class=c3>" + header.TOTAL_ISSUED_NEW_VALUE.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td>"
                                    + "<td align=left nowrap><span class=c3>" + header.TOTAL_RETURN_QTY.toLocaleString('en-US') + "</span></td>"
                                    + "<td align=left nowrap><span class=c3>" + header.TOTAL_RETURN_VALUE.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td>"
                                    + "<td align=left ><span class=c3>" + header.TOTAL_WASTED_QTY.toLocaleString('en-US') + "</span></td>"
                                    + "<td align=left nowrap><span class=c3>" + header.TOTAL_WASTED_VALUE.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td>"
                                    + "<td align=left nowrap><span class=c3>" + header.TOTAL_USAGE.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td>"
                                    + "</tr>";
                            })];
                    case 5:
                        _a.sent();
                        htmlBuilder += "</table></Table>";
                        return [3 /*break*/, 13];
                    case 6:
                        if (!(this.activeTab == 'By Procedure')) return [3 /*break*/, 9];
                        return [4 /*yield*/, JSON.parse(sessionStorage.getItem('_procDS'))];
                    case 7:
                        _procDS = (_a.sent());
                        htmlBuilder = "<Table align=left width=90% cellpadding=0 cellspacing = 0 vAlign=top style='overflow:hidden;'>";
                        if (reqType == 'Print') {
                            htmlBuilder += "<TR width='100%'><td   colspan=2 align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td><td align=left  width='85%' height=63 nowrap><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>"
                                + "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                                + "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                                + "<tr><td colspan=5 align=left><span class=c2><b> Preference Card Optimization Report </b></span></td><td align=right valign=top>&nbsp;";
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
                                + "<tr><td colspan=3 align=left><span class=c2><b> Preference Card Optimization Report </b></span></td><td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                            + "<table width=100% style='border:none; margin-bottom:15px;'>"
                            + "<tr>"
                            + "<td>Range:</td>"
                            + "<td style='font-weight:bold !important'>" + this.lblSelectedRange + "</td>"
                            + "<td>Year:</td>"
                            + "<td style='font-weight:bold !important'>" + this.selectedYear + "</td>"
                            + "<td>Specialty:</td>"
                            + "<td style='font-weight:bold !important'>" + this.lblSpecialityDesc + "&nbsp;(" + this.lblSpeciality + ")</td>"
                            + "<td>" + this.lblSelectedHQM + "</td>"
                            + "<td style='font-weight:bold !important'>" + this.strSelectedHQM + "</td>"
                            + "</tr></table>"
                            + "</td></tr>";
                        //htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                        htmlBuilder += "<tr><td colspan=2> "
                            + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                            + "<tr bgcolor=#d3d3d3>"
                            + "<td align=center rowspan=3 width=11% nowrap><span class=c3><b>Procedure Code</b></span></td>"
                            + "<td align=center rowspan=3 width=11% nowrap><span class=c3><b>Procedure Description</b></span></td>"
                            + "<td align=center rowspan=3 width=7% nowrap><span class=c3><b># of Physicians</b></span></td>"
                            + "<td align=center rowspan=3 width=7% nowrap><span class=c3><b># of Procedures</b></span></td>"
                            + "<td align=center rowspan=3 width=7% nowrap><span class=c3><b># of Preference Cards</b></span></td>"
                            + "<td align=center rowspan=3 width=7% nowrap><span class=c3><b>Efficiancy</b></span></td>"
                            + "<td align=center colspan=2 width=12% nowrap><span class=c3><b>Total Picked</b></span></td>"
                            + "<td align=center colspan=4 width=20% nowrap><span class=c3><b>Total Issued during case</b></span></td>"
                            + "<td align=center colspan=2 width=12% nowrap><span class=c3><b>Total Returns</b></span></td>"
                            + "<td align=center colspan=2 width=12% nowrap><span class=c3><b>Total Opened/ Unused</b></span></td>"
                            + "<td align=center rowspan=3 width=8% nowrap><span class=c3><b>Total Usage</b></span></td>"
                            + "</tr>"
                            + "<tr bgcolor=#d3d3d3>"
                            + "<td align=center rowspan=2 width=6% nowrap><span class=c3><b>Qty</b></span></td>"
                            + "<td align=center rowspan=2 width=6% nowrap><span class=c3><b>Value</b></span></td>"
                            + "<td align=center colspan=2 width=10% nowrap><span class=c3><b>Existing</b></span></td>"
                            + "<td align=center colspan=2 width=10% nowrap><span class=c3><b>New</b></span></td>"
                            + "<td align=center rowspan=2 width=6% nowrap><span class=c3><b>Qty</b></span></td>"
                            + "<td align=center rowspan=2 width=6% nowrap><span class=c3><b>Value</b></span></td>"
                            + "<td align=center rowspan=2 width=6% nowrap><span class=c3><b>Qty</b></span></td>"
                            + "<td align=center rowspan=2 width=6% nowrap><span class=c3><b>Value</b></span></td>"
                            + "</tr>"
                            + "<tr bgcolor=#d3d3d3>"
                            + "<td align=center width=5% nowrap><span class=c3><b>Qty</b></span></td>"
                            + "<td align=center width=5% nowrap><span class=c3><b>Value</b></span></td>"
                            + "<td align=center width=5% nowrap><span class=c3><b>Qty</b></span></td>"
                            + "<td align=center width=5% nowrap><span class=c3><b>Value</b></span></td>"
                            + "</tr>";
                        return [4 /*yield*/, _procDS.forEach(function (header) {
                                htmlBuilder += "<tr>"
                                    + "<td align=left nowrap><span class=c3>" + header.PROCEDURE_CODE + "</span></td>"
                                    + "<td align=left nowrap><span class=c3>" + header.PROCEDURE_DESCRIPTION + "</span></td>"
                                    + "<td align=left nowrap><span class=c3>" + header.NO_OF_PHYSICIANS.toLocaleString('en-US') + "</span></td>"
                                    + "<td align=left nowrap><span class=c3>" + header.NO_OF_PROCEDURES.toLocaleString('en-US') + "</span></td>"
                                    + "<td align=left nowrap><span class=c3>" + header.NO_OF_PREF_LISTS.toLocaleString('en-US') + "</span></td>"
                                    + "<td align=left nowrap><span class=c3>" + header.EFFICIENCY_PERCENTAGE.toFixed(2) + "%" + "</span></td>"
                                    + "<td align=left nowrap><span class=c3>" + header.TOTAL_PICKED_QTY.toLocaleString('en-US') + "</span></td>"
                                    + "<td align=left ><span class=c3>" + header.TOTAL_PICKED_VALUE.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td>"
                                    + "<td align=left nowrap><span class=c3>" + header.TOTAL_ISSUED_EXISTING_QTY.toLocaleString('en-US') + "</span></td>"
                                    + "<td align=left nowrap><span class=c3>" + header.TOTAL_ISSUED_EXISTING_VALUE.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td>"
                                    + "<td align=left nowrap><span class=c3>" + header.TOTAL_ISSUED_NEW_QTY.toLocaleString('en-US') + "</span></td>"
                                    + "<td align=left nowrap><span class=c3>" + header.TOTAL_ISSUED_NEW_VALUE.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td>"
                                    + "<td align=left nowrap><span class=c3>" + header.TOTAL_RETURN_QTY.toLocaleString('en-US') + "</span></td>"
                                    + "<td align=left nowrap><span class=c3>" + header.TOTAL_RETURN_VALUE.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td>"
                                    + "<td align=left ><span class=c3>" + header.TOTAL_WASTED_QTY.toLocaleString('en-US') + "</span></td>"
                                    + "<td align=left nowrap><span class=c3>" + header.TOTAL_WASTED_VALUE.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td>"
                                    + "<td align=left nowrap><span class=c3>" + header.TOTAL_USAGE.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td>"
                                    + "</tr>";
                                if (header.hasOwnProperty("PHYSICIAN_DETAILS")) {
                                    if (header.PHYSICIAN_DETAILS != null && header.PHYSICIAN_DETAILS.length > 0) {
                                        htmlBuilder += "<tr>"
                                            + "<td colspan=17>"
                                            + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse; margin:10px;" + "" + " border=1>"
                                            + "<tr bgcolor=#E0E0E0>"
                                            + "<td align=center rowspan=3 width=11% nowrap><span class=c3><b>Physician Name</b></span></td>"
                                            + "<td align=center rowspan=3 width=7% nowrap><span class=c3><b># of Procedures</b></span></td>"
                                            + "<td align=center rowspan=3 width=7% nowrap><span class=c3><b>Preference Card Name</b></span></td>"
                                            + "<td align=center rowspan=3 width=7% nowrap><span class=c3><b>Efficiancy</b></span></td>"
                                            + "<td align=center colspan=2 width=12% nowrap><span class=c3><b>Total Picked</b></span></td>"
                                            + "<td align=center colspan=4 width=20% nowrap><span class=c3><b>Total Issued during case</b></span></td>"
                                            + "<td align=center colspan=2 width=12% nowrap><span class=c3><b>Total Returns</b></span></td>"
                                            + "<td align=center colspan=2 width=12% nowrap><span class=c3><b>Total Opened/ Unused</b></span></td>"
                                            + "<td align=center rowspan=3 width=8% nowrap><span class=c3><b>Total Usage</b></span></td>"
                                            + "</tr>"
                                            + "<tr bgcolor=#d3d3d3>"
                                            + "<td align=center rowspan=2 width=6% nowrap><span class=c3><b>Qty</b></span></td>"
                                            + "<td align=center rowspan=2 width=6% nowrap><span class=c3><b>Value</b></span></td>"
                                            + "<td align=center colspan=2 width=10% nowrap><span class=c3><b>Existing</b></span></td>"
                                            + "<td align=center colspan=2 width=10% nowrap><span class=c3><b>New</b></span></td>"
                                            + "<td align=center rowspan=2 width=6% nowrap><span class=c3><b>Qty</b></span></td>"
                                            + "<td align=center rowspan=2 width=6% nowrap><span class=c3><b>Value</b></span></td>"
                                            + "<td align=center rowspan=2 width=6% nowrap><span class=c3><b>Qty</b></span></td>"
                                            + "<td align=center rowspan=2 width=6% nowrap><span class=c3><b>Value</b></span></td>"
                                            + "</tr>"
                                            + "<tr bgcolor=#d3d3d3>"
                                            + "<td align=center width=5% nowrap><span class=c3><b>Qty</b></span></td>"
                                            + "<td align=center width=5% nowrap><span class=c3><b>Value</b></span></td>"
                                            + "<td align=center width=5% nowrap><span class=c3><b>Qty</b></span></td>"
                                            + "<td align=center width=5% nowrap><span class=c3><b>Value</b></span></td>"
                                            + "</tr>";
                                        header.PHYSICIAN_DETAILS.forEach(function (details) {
                                            htmlBuilder += "<tr>"
                                                + "<td align=left nowrap><span class=c3>" + details.PHYSICIAN_NAME + "</span></td>"
                                                + "<td align=left nowrap><span class=c3>" + details.NO_OF_PROCEDURES.toLocaleString('en-US') + "</span></td>"
                                                + "<td align=left nowrap><span class=c3>" + details.PREF_LIST_ID + "</span></td>"
                                                + "<td align=left nowrap><span class=c3>" + details.EFFICIENCY_PERCENTAGE.toFixed(2) + "%" + "</span></td>"
                                                + "<td align=left nowrap><span class=c3>" + details.TOTAL_PICKED_QTY.toLocaleString('en-US') + "</span></td>"
                                                + "<td align=left ><span class=c3>" + details.TOTAL_PICKED_VALUE.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td>"
                                                + "<td align=left nowrap><span class=c3>" + details.TOTAL_ISSUED_EXISTING_QTY.toLocaleString('en-US') + "</span></td>"
                                                + "<td align=left nowrap><span class=c3>" + details.TOTAL_ISSUED_EXISTING_VALUE.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td>"
                                                + "<td align=left nowrap><span class=c3>" + details.TOTAL_ISSUED_NEW_QTY.toLocaleString('en-US') + "</span></td>"
                                                + "<td align=left nowrap><span class=c3>" + details.TOTAL_ISSUED_NEW_VALUE.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td>"
                                                + "<td align=left nowrap><span class=c3>" + details.TOTAL_RETURN_QTY.toLocaleString('en-US') + "</span></td>"
                                                + "<td align=left nowrap><span class=c3>" + details.TOTAL_RETURN_VALUE.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td>"
                                                + "<td align=left ><span class=c3>" + details.TOTAL_WASTED_QTY.toLocaleString('en-US') + "</span></td>"
                                                + "<td align=left nowrap><span class=c3>" + details.TOTAL_WASTED_VALUE.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td>"
                                                + "<td align=left nowrap><span class=c3>" + details.TOTAL_USAGE.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td>"
                                                + "</tr>";
                                        });
                                        htmlBuilder += "</table></td></tr>";
                                    }
                                }
                                else {
                                }
                            })];
                    case 8:
                        _a.sent();
                        htmlBuilder += "</table></Table>";
                        return [3 /*break*/, 13];
                    case 9:
                        if (!(this.activeTab == 'Optimization')) return [3 /*break*/, 13];
                        _OptHdrData = new VM_POU_PREF_OPT_HEADER_DATA_1.VM_POU_PREF_OPT_HEADER_DATA();
                        return [4 /*yield*/, JSON.parse(sessionStorage.getItem('_optimizationDS'))];
                    case 10:
                        _optimizeDS = (_a.sent());
                        return [4 /*yield*/, JSON.parse(sessionStorage.getItem('_prefOptHdrDataDS'))];
                    case 11:
                        _OptHdrData = (_a.sent());
                        _isPrintRequest = false;
                        _isExcelRequest_1 = false;
                        colspanTwo = '1';
                        htmlBuilder = "<div style='width:90%;;'><Table align=left width=90% cellpadding=0 cellspacing = 0 vAlign=top margin-left:5px;>";
                        if (reqType == 'Print') {
                            _isPrintRequest = true;
                            htmlBuilder += "<TR width='100%'><td   colspan=2 align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td><td align=left  width='85%' height=63 nowrap><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>"
                                + "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                                + "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                                + "<tr><td colspan=5 align=left><span class=c2><b> Preference Card Optimization Report </b></span></td><td align=right valign=top>&nbsp;";
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
                                + "<tr><td colspan=3 align=left><span class=c2><b> Preference Card Optimization Report </b></span></td><td align=right valign=top>&nbsp;";
                        }
                        _isExcelRequest_1 = (reqType == 'Excel') ? true : false;
                        colspanTwo = (reqType == 'Excel') ? '2' : '1';
                        htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                            + "<div style='margin-bottom:20px; margin-top:10px; width:100%'>"
                            + "<table width='100%' style='border:none; border-spacing:0px;'>"
                            + "<tr>";
                        if (_isExcelRequest_1) {
                            htmlBuilder += "<td width=10></td>";
                        }
                        htmlBuilder += "<td width='150'><label>Procedure Code:</label></td>"
                            + "<td width='200'><strong>" + this.lblProcedure + "</strong></td>"
                            + "<td width='150'><label>Range:</label></td>"
                            + "<td width='200'><strong>" + this.lblSelectedRange + "</strong></td>"
                            + "<td width='150' style='border-left:1px solid #ccc;padding-left:6px;'><label> Remove: </label></td>"
                            + "<td colspan=" + colspanTwo + ">"
                            + "<table style='border:none;'>"
                            + "<tr>";
                        if (!_isExcelRequest_1) {
                            htmlBuilder += "<td><img src=" + "'" + this.lessImg + "'" + "/></td>";
                        }
                        if (_isExcelRequest_1) {
                            htmlBuilder += "<td>"
                                + "<b>" + this.OptRemoveValue + "</b>"
                                + "</td>";
                        }
                        else {
                            htmlBuilder += "<td>"
                                + "<input value=" + this.OptRemoveValue + " name='txtRemove' id='RemoveId' style='width:50px;margin-left:-3px;' type='text' class='form-control'>"
                                + "</td>";
                        }
                        htmlBuilder += "<td><b>&nbsp;% </b></td>"
                            + "</tr>"
                            + "</table>"
                            + "</td>"
                            + "</tr>"
                            + "<tr style='background-color:none;'>";
                        if (_isExcelRequest_1) {
                            htmlBuilder += "<td width=10></td>";
                        }
                        htmlBuilder += "<td width='150'><label>Preference Card Name:</label></td>"
                            + "<td width='200'><strong>" + this.lblPrefCardName + "</strong></td>"
                            + "<td width='150'><label>Year:</label></td>"
                            + "<td width='200'><strong>" + this.selectedYear + "</strong></td>"
                            + "<td width='150' style='border-left:1px solid #ccc;padding-left:6px;'><label> Add to Hold:</label></td>"
                            + "<td colspan=" + colspanTwo + ">"
                            + "<table style='border:none;'>"
                            + "<tr>";
                        if (!_isExcelRequest_1) {
                            htmlBuilder += "<td style='padding-top:2px;'><img src= " + "'" + this.addToHoldImg + "'" + "/></td>";
                        }
                        if (_isExcelRequest_1) {
                            htmlBuilder += "<td>"
                                + "<b>" + this.OptHoldValue1 + "</b>"
                                + "</td>"
                                + "<td style='padding-left:2px; padding-right:2px;'><label><b>&nbsp;-&nbsp;</b></label></td>"
                                + "<td><b>" + this.OptHoldValue2 + "</b></td>";
                        }
                        else {
                            htmlBuilder += "<td><input value=" + this.OptHoldValue1 + " name='txtHold1' id='HoldId1' style='width:50px;margin-left:-3px;' type='text' class='form-control'></td>"
                                + "<td style='padding-left:2px; padding-right:2px;'><label><b>&nbsp;-&nbsp;</b></label></td>"
                                + "<td><input value=" + this.OptHoldValue2 + " [name]='txtHold2 ' id='HoldId2' style='width:50px;margin-left:-2px;' type='text' class='form-control'></td>";
                        }
                        htmlBuilder += "<td><label><b>&nbsp;% </b></label></td>"
                            + "</tr>"
                            + "</table>"
                            + "</td>"
                            + "</tr>"
                            + "<tr>";
                        if (_isExcelRequest_1) {
                            htmlBuilder += "<td width=10></td>";
                        }
                        htmlBuilder += "<td width='150'><label>Physician Name:</label></td>"
                            + "<td width='200'><strong>" + this.lblPhysician + "</strong></td>"
                            + "<td width='150'><label>" + this.lblSelectedHQM + "</label></td>"
                            + "<td width='200'><strong>" + this.strSelectedHQM + "</strong></td>"
                            + "<td width='150' style='border-left:1px solid #ccc;padding-left:6px;'><label>Add to Open: </label></td>"
                            + "<td colspan=" + colspanTwo + ">"
                            + "<table style='border:none;'>"
                            + "<tr>";
                        if (!_isExcelRequest_1) {
                            htmlBuilder += "<td><img src=" + "'" + this.greaterImg + "'" + "/></td>";
                        }
                        if (_isExcelRequest_1) {
                            htmlBuilder += "<td>"
                                + "<b>" + this.OptOpenValue + "</b>"
                                + "</td>";
                        }
                        else {
                            htmlBuilder += "<td> <input value=" + this.OptOpenValue + " name='txtOpen' id='OpenId' style='width:50px;margin-left:-3px;' type='text ' class='form-control'></td>";
                        }
                        htmlBuilder += "<td><label><b>&nbsp;% </b></label></td>"
                            + "</tr>"
                            + "</table>"
                            + " </td>"
                            + "</tr>"
                            + "</table>"
                            + "</div>"
                            + "</td></tr>";
                        if (_isExcelRequest_1) {
                            htmlBuilder += "<tr height=30><td colspan= 2></td></tr>";
                        }
                        //htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                        htmlBuilder += "<tr><td colspan=2>"
                            + "<div style='margin-bottom:20px; margin-top:20px; width:100%'>"
                            + "<table id='tblDynamic' border=1 style= 'border:1px solid black;  width:100%; border-collapse:collapse;'>"
                            + "<thead>"
                            + "<tr>";
                        if (_isExcelRequest_1) {
                            htmlBuilder += "<th width=10></th>";
                        }
                        htmlBuilder += "<th style='width:25%;'></th>"
                            + "<th style='width:25%;' colspan=2> Open Items" + "</th>"
                            + "<th style='width:25%;' colspan=2> Hold Items" + "</th>"
                            + "<th style='width:25%;'> Total" + " </th>"
                            + "</tr>"
                            + "</thead>"
                            + "<tbody>"
                            + "<tr>";
                        if (_isExcelRequest_1) {
                            htmlBuilder += "<td width=10></td>";
                        }
                        htmlBuilder += "<td>Current" + " </td>"
                            + "<td align='right' style=" + "'" + "text-align:right!important;padding-right:3px;" + "'" + " >" + _OptHdrData.CURRENT_OPEN_QTY.toLocaleString('en-US') + "</td>"
                            + "<td align='right' style=" + "'" + "text-align:right!important;padding-right:3px;" + "'" + " >" + _OptHdrData.CURRENT_OPEN_QTY_PRICE.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "  &nbsp; </td>"
                            + "<td align='right' style=" + "'" + "text-align:right!important;padding-right:3px;" + "'" + " >" + _OptHdrData.CURRENT_HOLD_QTY.toLocaleString('en-US') + "</td>"
                            + "<td align='right' style=" + "'" + "text-align:right!important;padding-right:3px;" + "'" + " >" + _OptHdrData.CURRENT_HOLD_QTY_PRICE.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + " &nbsp; </td>"
                            + "<td align='right' style=" + "'" + "text-align:right!important;padding-right:3px;" + "'" + " >" + _OptHdrData.CURRENT_OPEN_HOLD_TOTAL.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + " &nbsp; </td>"
                            + "</tr>"
                            + "<tr>";
                        if (_isExcelRequest_1) {
                            htmlBuilder += "<td width=10></td>";
                        }
                        htmlBuilder += "<td>Optimized " + "</td>"
                            + "<td align='right' style=" + "'" + "text-align:right!important;padding-right:3px;" + "'" + " >" + _OptHdrData.SUGGESTED_OPEN_QTY.toLocaleString('en-US') + "</td>"
                            + "<td align='right' style=" + "'" + "text-align:right!important;padding-right:3px;" + "'" + " >" + _OptHdrData.SUGGESTED_OPEN_QTY_PRICE.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "  &nbsp; </td>"
                            + "<td align='right' style=" + "'" + "text-align:right!important;padding-right:3px;" + "'" + " >" + _OptHdrData.SUGGESTED_HOLD_QTY.toLocaleString('en-US') + "</td>"
                            + "<td align='right' style=" + "'" + "text-align:right!important;padding-right:3px;" + "'" + " >" + _OptHdrData.SUGGESTED_HOLD_QTY_PRICE.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + " &nbsp; </td>"
                            + "<td align='right' style=" + "'" + "text-align:right!important;padding-right:3px;" + "'" + " >" + _OptHdrData.SUGGESTED_OPEN_HOLD_TOTAL.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + " &nbsp; </td>"
                            + "</tr>"
                            + "<tr style=" + "font- weight:bold;" + ">";
                        if (_isExcelRequest_1) {
                            htmlBuilder += "<td width=10></td><td>Net Difference </td>"
                                + "<td align='right'>" + _OptHdrData.NET_DIFF_OPEN_QTY.toLocaleString('en-US') + "</td>"
                                + "<td align='right'>" + _OptHdrData.NET_DIFF_OPEN_QTY_PRICE.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "  &nbsp;&nbsp;<span><img src=" + "'" + _OptHdrData.NET_DIFF_OPEN_QTY_IMG + "'" + "/></span> </td>"
                                + "<td align='right'>" + _OptHdrData.NET_DIFF_HOLD_QTY.toLocaleString('en-US') + "</td>"
                                + "<td align='right'>" + _OptHdrData.NET_DIFF_HOLD_QTY_PRICE.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + " &nbsp;&nbsp;<span><img src=" + "'" + _OptHdrData.NET_DIFF_HOLD_QTY_IMG + "'" + "/></span> </td>"
                                + "<td align='right'>" + _OptHdrData.NET_DIFF_TOTAL.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + " &nbsp;&nbsp;<span><img src=" + "'" + _OptHdrData.NET_DIFF_TOTAL_IMG + "'" + "/></span> </td>";
                        }
                        else {
                            htmlBuilder += "<td>Net Difference </td>"
                                + "<td align='right' style=" + "'" + "text-align:right!important;padding-right:3px;" + "'" + ">" + _OptHdrData.NET_DIFF_OPEN_QTY.toLocaleString('en-US') + "</td>"
                                + "<td align='right' style=" + "'" + "text-align:right!important;padding-right:3px;" + "'" + "><span><img src=" + "'" + _OptHdrData.NET_DIFF_OPEN_QTY_IMG + "'" + "/></span>" + _OptHdrData.NET_DIFF_OPEN_QTY_PRICE.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "  &nbsp; </td>"
                                + "<td align='right' style=" + "'" + "text-align:right!important;padding-right:3px;" + "'" + ">" + _OptHdrData.NET_DIFF_HOLD_QTY.toLocaleString('en-US') + "</td>"
                                + "<td align='right' style=" + "'" + "text-align:right!important;padding-right:3px;" + "'" + "><span><img src=" + "'" + _OptHdrData.NET_DIFF_HOLD_QTY_IMG + "'" + "/></span>" + _OptHdrData.NET_DIFF_HOLD_QTY_PRICE.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + " &nbsp; </td>"
                                + "<td align='right' style=" + "'" + "text-align:right!important;padding-right:3px;" + "'" + "><span><img src=" + "'" + _OptHdrData.NET_DIFF_TOTAL_IMG + "'" + "/></span>" + _OptHdrData.NET_DIFF_TOTAL.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + " &nbsp; </td>";
                        }
                        htmlBuilder += "</tr>"
                            + "</tbody></table></div>"
                            + "</td></tr>";
                        ex = document.getElementById("tble").innerHTML;
                        if (_isPrintRequest) {
                            htmlBuilder += "<tr></tr><tr><td colspan=2>"
                                + "<div>"
                                + "<table id='tblColor' align=center width=100% style='BORDER-COLLAPSE:collapse;' border=1>"
                                + "<tr>"
                                + "<td border=1 width=25%> <div style='background:#008000; width:10; height:10; outline:none; text-align:center; margin:5;-webkit-print-color-adjust: exact;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;New&nbsp;Items </div> </td>"
                                + "<td border=1 width=25%> <div style=" + "'" + "background: #ff0000; width:10; height:10; outline:none; text-align:center; margin:;-webkit-print-color-adjust: exact;" + "'" + ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Delete&nbsp;Items</div></td>"
                                + "<td border=1 width=25%> <div style=" + "'" + "background:#1a7fc7; width:10; height:10; outline:none; text-align:center; margin:5;-webkit-print-color-adjust: exact;" + "'" + ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Move&nbsp;to&nbsp;hold </div></td>"
                                + "<td border=1 width=25%> <div style=" + "'" + "background:#000000; width:10; height:10; outline:none; text-align:center; margin:5;-webkit-print-color-adjust: exact;" + "'" + ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No&nbsp;Change </div></td>"
                                + "</tr>"
                                + "</table></div></td></tr>";
                        }
                        else {
                            htmlBuilder += "<tr></tr><tr><td colspan=2>"
                                + "<div>"
                                + "<table id='tblColor' align=center width=100% style='BORDER-COLLAPSE:collapse;' border=1>"
                                + "<tr>";
                            if (_isExcelRequest_1) {
                                htmlBuilder += "<td width=10></td>";
                            }
                            htmlBuilder += "<td border=1 colspan='2' style='background:#008000; color:white;'> <div style='background:#008000; width:10; height:10; outline:none; text-align:center; margin:5;-webkit-print-color-adjust: exact;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;New&nbsp;Items </div> </td>"
                                + "<td border=1 colspan='3' style='background:#ff0000; color:white;'> <div style=" + "'" + "background: #ff0000; width:10; height:10; outline:none; text-align:center; margin:;-webkit-print-color-adjust: exact;" + "'" + ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Delete&nbsp;Items</div></td>"
                                + "<td border=1 colspan='3' style='background:#1a7fc7; color:white;'> <div style=" + "'" + "background:#1a7fc7; width:10; height:10; outline:none; text-align:center; margin:5;-webkit-print-color-adjust: exact;" + "'" + ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Move&nbsp;to&nbsp;hold </div></td>"
                                + "<td border=1 colspan='6' style='background:#000000; color:white;'> <div style=" + "'" + "background:#000000; width:10; height:10; outline:none; text-align:center; margin:5;-webkit-print-color-adjust: exact;" + "'" + ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No&nbsp;Change </div></td>"
                                + "</tr>"
                                + "</table></div></td></tr>";
                        }
                        htmlBuilder += "<tr><td colspan=2>"
                            + "<div>"
                            + "<table align=center width=100% style='BORDER-COLLAPSE:collapse;' border=1>"
                            + "<tr bgcolor=#d3d3d3>";
                        if (_isExcelRequest_1) {
                            htmlBuilder += "<td width=10 style='background:none;'></td>";
                        }
                        htmlBuilder += "<td align=center rowspan=2 width=10% nowrap><span class=c3><b>Item Id</b></span></td>"
                            + "<td align=center rowspan=2 width=15% nowrap><span class=c3><b>Item Description</b></span></td>"
                            + "<td align=center rowspan=2 width=10% nowrap><span class=c3><b>Item Cost</b></span></td>"
                            + "<td align=center colspan=2 width=10% nowrap><span class=c3><b>Current Quantity</b></span></td>"
                            + "<td align=center colspan=3 width=15% nowrap><span class=c3><b>Usage</b></span></td>"
                            + "<td align=center colspan=2 width=10% nowrap><span class=c3><b>Suggested Pref Qty</b></span></td>"
                            + "<td align=center colspan=2 width=10% nowrap><span class=c3><b>Net Change(Qty)</b></span></td>"
                            + "<td align=center colspan=2 width=20% nowrap><span class=c3><b>Net Change($)</b></span></td>"
                            + "</tr>"
                            + "<tr bgcolor=#d3d3d3>";
                        if (_isExcelRequest_1) {
                            htmlBuilder += "<td width=10 style='background:none;'></td>";
                        }
                        htmlBuilder += "<td align=center width=5% nowrap><span class=c3><b>Open</b></span></td>"
                            + "<td align=center width=5% nowrap><span class=c3><b>Hold</b></span></td>"
                            + "<td align=center width=5% nowrap><span class=c3><b>Max</b></span></td>"
                            + "<td align=center width=5% nowrap><span class=c3><b>Min</b></span></td>"
                            + "<td align=center width=5% nowrap><span class=c3><b>Mean</b></span></td>"
                            + "<td align=center width=5% nowrap><span class=c3><b>Open Qty</b></span></td>"
                            + "<td align=center width=5% nowrap><span class=c3><b>Hold Qty</b></span></td>"
                            + "<td align=center width=5% nowrap><span class=c3><b>Open</b></span></td>"
                            + "<td align=center width=5% nowrap><span class=c3><b>Hold</b></span></td>"
                            + "<td align=center width=10% nowrap><span class=c3><b>Open</b></span></td>"
                            + "<td align=center width=10% nowrap><span class=c3><b>Hold</b></span></td>"
                            + "</tr>";
                        return [4 /*yield*/, _optimizeDS.forEach(function (header) {
                                var leftCellBorder = '';
                                try {
                                    if (header.COLORCODE == 'leftCellBorder1') {
                                        leftCellBorder = "10px solid black";
                                    }
                                    else if (header.COLORCODE == 'leftCellBorder2') {
                                        leftCellBorder = "10px solid cornflowerblue";
                                    }
                                    else if (header.COLORCODE == 'leftCellBorder3') {
                                        leftCellBorder = "10px solid red";
                                    }
                                    else if (header.COLORCODE == 'leftCellBorder4') {
                                        leftCellBorder = "10px solid green";
                                    }
                                }
                                catch (ex) {
                                    _this.clientErrorMsg(ex);
                                }
                                htmlBuilder += "<tr>";
                                if (_isExcelRequest_1) {
                                    htmlBuilder += "<td width=10></td>";
                                }
                                htmlBuilder += "<td align=right nowrap style=" + "'" + "border-left:" + leftCellBorder + "'" + "><span class=c3>" + header.ITEM_ID + "</span></td>"
                                    + "<td align=left nowrap><span class=c3>" + header.ITEM_DESCRIPTION + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + header.ITEM_PRICE.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + header.CURRENT_OPEN_QTY.toLocaleString('en-US') + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + header.CURRENT_HOLD_QTY.toLocaleString('en-US') + "</span></td>"
                                    + "<td align=right ><span class=c3>" + header.MAX_USAGE.toLocaleString('en-US') + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + header.MIN_USAGE.toLocaleString('en-US') + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + header.MEAN_USAGE.toFixed(2) + "%" + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + header.SUGGESTED_OPEN_QTY.toLocaleString('en-US') + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + header.SUGGESTED_HOLD_QTY.toLocaleString('en-US') + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + header.NET_CHANGE_OPEN_QTY.toLocaleString('en-US') + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + header.NET_CHANGE_HOLD_QTY.toLocaleString('en-US') + "</span></td>"
                                    + "<td align=right ><span class=c3>" + header.NET_CHANGE_OPEN_VALUE.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + header.NET_CHANGE_HOLD_VALUE.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td>"
                                    + "</tr>";
                                +"</table></div></td></tr>";
                            })];
                    case 12:
                        _a.sent();
                        htmlBuilder += "</Table>";
                        _a.label = 13;
                    case 13: return [4 /*yield*/, htmlBuilder];
                    case 14: return [2 /*return*/, _a.sent()];
                    case 15:
                        ex_13 = _a.sent();
                        htmlBuilder = '';
                        this.clientErrorMsg(ex_13);
                        return [2 /*return*/, htmlBuilder];
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    PreferenceCardOptimizationComponent.prototype.onSendMailIconClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
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
    PreferenceCardOptimizationComponent.prototype.onSendMailClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var html, toAddr, ex_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, 5, 6]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.exportReportDetails('Mail')];
                    case 1:
                        html = _a.sent();
                        toAddr = '';
                        this.msgs = [];
                        if (!(html != '' && html != null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.commonService.sendEmbeddedEmail(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId], 'Preference Card Optimization Report', JSON.stringify(html), this.toMailAddr, '', 'false', AtParEnums_1.MailPriority.Normal.toString(), '')
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                            })];
                    case 2:
                        _a.sent();
                        if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Mail has been sent' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_FROM_ADDRESS) {
                            this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'From Address is Missing! Please Contact Administrator' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_TO_ADDRESS) {
                            this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Please Enter To Email Address' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_SUBJECT) {
                            this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Subject is Missing! Please Contact Administrator' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_ENTER_BODY) {
                            this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Body is Missing! Please contact Administrator' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_SMTP_SERVER_MISSING) {
                            this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Mail Server is Not Configured! Please Contact Administrator' });
                        }
                        else if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.EMAIL_SEND_FAILED) {
                            this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Mail Not Sent. Please Try Again' });
                        }
                        else {
                            this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Error while sending mail' });
                        }
                        _a.label = 3;
                    case 3:
                        // if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
                        this.isMailDialog = false;
                        this.toMailAddr = '';
                        return [3 /*break*/, 6];
                    case 4:
                        ex_14 = _a.sent();
                        this.clientErrorMsg(ex_14);
                        return [3 /*break*/, 6];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    PreferenceCardOptimizationComponent.prototype.onPrintClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, mywindow, ex_15;
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
                            mywindow.document.write('<html><head><title>' + 'Point Of Use - Preference Card Optimization Report' + '</title>');
                            mywindow.document.write('</head><body >');
                            mywindow.document.write(html);
                            mywindow.document.write('</body></html>');
                            mywindow.document.close(); // necessary for IE >= 10
                            mywindow.focus(); // necessary for IE >= 10*/
                            mywindow.print();
                            mywindow.close();
                            return [2 /*return*/, true];
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_15 = _a.sent();
                        this.clientErrorMsg(ex_15);
                        return [2 /*return*/, false];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PreferenceCardOptimizationComponent.prototype.filterdata = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.lstSpecialityFilterData = event;
                }
                catch (ex) {
                    this.clientErrorMsg(ex);
                }
                return [2 /*return*/];
            });
        });
    };
    PreferenceCardOptimizationComponent.prototype.getProfileParamValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.commonService.getProfileParamValue(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.ProfileID], AtParEnums_1.EnumApps.PointOfUse, 'MAX_ALLOW_QTY')
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    _this.strMaxAllowQty = data.DataVariable.toString();
                                }
                            })];
                    case 1:
                        _a.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        ex_16 = _a.sent();
                        return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                    case 3: return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK];
                }
            });
        });
    };
    //async onRowExpand(originalEvent, data) {
    //    await data.isrowExpand(data)
    //    await this.onProcedureItemClick(data.data);
    //}
    //async isRowExpanded() {
    //}
    PreferenceCardOptimizationComponent.prototype.clientErrorMsg = function (ex) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, ex.toString());
    };
    PreferenceCardOptimizationComponent = __decorate([
        core_1.Component({
            //moduleId: module.id,
            templateUrl: 'pou-preference-card-optimization.component.html',
            providers: [
                atpar_common_service_1.AtParCommonService,
                AtParConstants_1.AtParConstants,
                pou_preference_card_optimization_service_1.PreferenceCardOptimizationServices
            ]
        }),
        core_2.Injectable(),
        __metadata("design:paramtypes", [HttpService_1.HttpService,
            atpar_common_service_1.AtParCommonService,
            event_spinner_service_1.SpinnerService,
            pou_preference_card_optimization_service_1.PreferenceCardOptimizationServices,
            AtParConstants_1.AtParConstants])
    ], PreferenceCardOptimizationComponent);
    return PreferenceCardOptimizationComponent;
}());
exports.PreferenceCardOptimizationComponent = PreferenceCardOptimizationComponent;
//# sourceMappingURL=pou-preference-card-optimization.component.js.map