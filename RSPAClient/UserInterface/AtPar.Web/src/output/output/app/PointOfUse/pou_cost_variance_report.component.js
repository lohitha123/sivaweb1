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
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var pou_cost_variance_service_service_1 = require("./pou_cost_variance-service.service");
var VM_POU_COSTVARIANCE_BY_DIAGNOSISCODE_1 = require("../../app/Entities/VM_POU_COSTVARIANCE_BY_DIAGNOSISCODE");
var router_1 = require("@angular/router");
var leftbar_animation_service_1 = require("../Home/leftbar-animation.service");
var AtParConstants_1 = require("../Shared/AtParConstants");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var datatable_1 = require("../components/datatable/datatable");
var AtParEnums_1 = require("../Shared/AtParEnums");
var file_saver_1 = require("file-saver");
var CostVarianceComponent = (function () {
    /**
     * Constructor
     * @param leftBarAnimationservice
     * @param router
     * @param POUCostVarianceService
     * @param httpService
     * @param spinnerService
     * @param atParConstant
     * @param commonService
     */
    function CostVarianceComponent(leftBarAnimationservice, router, PouCstvarianceService, httpService, spinnerService, atParConstant, commonService) {
        this.leftBarAnimationservice = leftBarAnimationservice;
        this.router = router;
        this.PouCstvarianceService = PouCstvarianceService;
        this.httpService = httpService;
        this.spinnerService = spinnerService;
        this.atParConstant = atParConstant;
        this.commonService = commonService;
        this.lstSltRnge = [];
        this.lstSltHQM = [];
        this.lstVarianceType = [];
        this.growlMessage = [];
        this.selectedSltRnge = 'Y1';
        this.selectedSltRngeLbl = '';
        this.deviceTokenEntry = [];
        this.lstCostVarianceBySplt = [];
        this.lstCostVarianceByDiagnsis = [];
        this.lstCostVariaceByPhy = [];
        this.lstCostVarianceSurHdrData = [];
        this.lstCostVarianceItemGroups = [];
        this.lstCostVarianceItemHdrDtls = [];
        this.msgs = [];
        this.pop = false;
        this.showGrid = false;
        this.lstLength = "";
        this.lstICDLength = "";
        this.lstPhyvarianceLength = "";
        this.tdExports = false;
        this.isMailDialog = false;
        this.toMailAddr = '';
        this.statusCode = -1;
        this.isPostback = false;
        this.lblResultCount = 0;
        this.VariancebyICDTab = false;
        this.VariancebySpecialityTab = false;
        this.VariancebyPhyTab = false;
        this.gvVarianceSpelty = false;
        this.gvVarianceICD = false;
        this.DynamicDignsis = new VM_POU_COSTVARIANCE_BY_DIAGNOSISCODE_1.VM_POU_COSTVARIANCE_BY_DIAGNOSISCODE();
        this.VariancebyPhydyTab = false;
        this.SpendbyItemCateTab = false;
        this.lstAny = [];
        this.lstItemData = [];
        this.PhyIds = "";
        this.DynamicPhysloop = "";
        this.NoOfProcedures = 0;
        this.blnselectedVarianceType = false;
        this.ChartColor = "";
        this.SupplyDetailsTab = false;
        this.Fifthtabtble = false;
        this.DynamicShow = false;
        this.lstAny5th = [];
        this.SupplyDetlslngth = 0;
        this.lstYear = [];
        this.lblPhyvariance = "";
        this.lblPhyvarianceDesc = "";
        this.showHalfyrlbl = false;
        this.Hlfqtrmnthlbl = '';
        this.Hlfqtrmnthlbltxt = '';
        this.showSpendByItmTab = true;
    }
    CostVarianceComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var year;
            return __generator(this, function (_a) {
                this.tdExports = false;
                this.VariancebyICDTab = false;
                this.VariancebySpecialityTab = true;
                this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                this.lstYear = [];
                this.lstYear.push({ label: "Select Year", value: "Select Year" });
                for (year = 1940; year <= 2020; year++) {
                    this.lstYear.push({
                        label: '' + year + '',
                        value: '' + year + ''
                    });
                }
                this.selectedVarianceType = "Select Value";
                this.lstSltRnge.push({ label: 'Select Value', value: 'Y1' }, { label: 'Yearly', value: 'Y' }, { label: 'Half Yearly', value: 'HY' }, { label: 'Quartely', value: 'Q' }, { label: 'Monthly', value: 'M' });
                this.lstVarianceType.push({ label: 'Select Diagnosis', value: 'Select Value' }, { label: 'Out Patient', value: 'CPT' }, { label: 'In Patient', value: 'ICD' }, { label: 'Procedure', value: 'Procedure' });
                this.lstSltHQM.push({ label: 'Select Value', value: 'Select Value' });
                return [2 /*return*/];
            });
        });
    };
    /**
   redirecting to home when click on breadcrumbs
   */
    CostVarianceComponent.prototype.homeurl = function () {
        this.leftBarAnimationservice.isHomeClicked = false;
        this.leftBarAnimationservice.isHide();
        this.router.navigate(['atpar']);
    };
    CostVarianceComponent.prototype.Yearsbind = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                /**
               * To clear the all lists
               */
                this.lstCostVarianceBySplt = [];
                this.lstCostVarianceByDiagnsis = [];
                this.lstCostVariaceByPhy = [];
                this.gvVarianceSpelty = false;
                this.lstLength = "0";
                this.lstSltHQM = [];
                this.pop = false;
                this.tdExports = false;
                this.selectedSltHQM = "";
                this.SltVariancDiagHQM = "";
                this.SltVariancPhyHQM = "";
                this.gvVarianceICD = false;
                this.SupplyDetlslngth = 0;
                this.lstAny = [];
                try {
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
                }
                catch (ex) {
                    this.displayCatchException(ex);
                }
                return [2 /*return*/];
            });
        });
    };
    CostVarianceComponent.prototype.ClearData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.lstCostVarianceBySplt = [];
                this.lstCostVarianceByDiagnsis = [];
                this.lstCostVariaceByPhy = [];
                this.SupplyDetlslngth = 0;
                this.lstAny = [];
                this.tdExports = false;
                this.gvVarianceSpelty = false;
                this.lstLength = "0";
                return [2 /*return*/];
            });
        });
    };
    CostVarianceComponent.prototype.btn_GetVarianceBySplt = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lstCostVariaceByPhy = [];
                        this.lstCostVarianceBySplt = [];
                        this.lstCostVariaceByPhy = [];
                        this.lstCostVarianceByDiagnsis = [];
                        this.lstCostVarianceItemGroups = [];
                        this.lstAny = [];
                        this.lstCostVarianceItemHdrDtls = [];
                        this.SupplyDetlslngth = 0;
                        this.spinnerService.start();
                        if (this.dataTableComponent != null) {
                            this.dataTableComponent.reset();
                        }
                        this.growlMessage = [];
                        this.pop = false;
                        this.gvVarianceSpelty = false;
                        this.tdExports = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 10, , 11]);
                        if (!(this.selectedSltRnge == "HY" && (this.selectedSltHQM == undefined || this.selectedSltHQM == "" || this.selectedSltHQM == "Select Value"))) return [3 /*break*/, 2];
                        this.growlMessage = [];
                        this.spinnerService.stop();
                        this.pop = false;
                        this.tdExports = false;
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Half Year" });
                        return [2 /*return*/];
                    case 2:
                        if (!(this.selectedSltRnge == "Q" && (this.selectedSltHQM == undefined || this.selectedSltHQM == "" || this.selectedSltHQM == "Select Value"))) return [3 /*break*/, 3];
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Quarter" });
                        this.spinnerService.stop();
                        this.pop = false;
                        this.tdExports = false;
                        return [2 /*return*/];
                    case 3:
                        if (!(this.selectedSltRnge == "M" && (this.selectedSltHQM == undefined || this.selectedSltHQM == "" || this.selectedSltHQM == "Select Value"))) return [3 /*break*/, 4];
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Select Month' });
                        this.spinnerService.stop();
                        this.pop = false;
                        return [2 /*return*/];
                    case 4:
                        if (!(this.selectedSltRnge == "Select Value" || this.selectedSltRnge == undefined || this.selectedSltRnge == "" || this.selectedSltRnge == "Y1")) return [3 /*break*/, 5];
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Range" });
                        this.spinnerService.stop();
                        this.pop = false;
                        return [2 /*return*/];
                    case 5:
                        if (!(this.ddltyear == undefined || this.ddltyear == "" || this.ddltyear == "Select Year")) return [3 /*break*/, 6];
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Year" });
                        this.spinnerService.stop();
                        this.pop = false;
                        return [2 /*return*/];
                    case 6:
                        if (!(this.selectedVarianceType == "" || this.selectedVarianceType == undefined || this.selectedVarianceType == "Select Value" || this.blnselectedVarianceType == true)) return [3 /*break*/, 7];
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select the one of the option" });
                        this.spinnerService.stop();
                        this.pop = false;
                        return [2 /*return*/];
                    case 7:
                        this.strHalfyear = "0";
                        this.strMonth = "0";
                        this.strQuarter = "0";
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
                                this.Hlfqtrmnthlbltxt = "Quarter";
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
                                this.Hlfqtrmnthlbltxt = "Month";
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
                        if (this.selectedVarianceType == "Procedure") {
                            this.VarianceDiagCode = "PROCEDURE_CODE";
                            this.VarianceDiagDesc = "PROCEDURE_DESCRIPTION";
                            this.lblPhyvariance = "Procedure Code";
                            this.lblPhyvarianceDesc = "Procedure Description";
                        }
                        else if (this.selectedVarianceType == "CPT") {
                            this.VarianceDiagCode = "CPT_CODE";
                            this.VarianceDiagDesc = "CPT_DESCR";
                            this.lblPhyvariance = "Out Patient Code";
                            this.lblPhyvarianceDesc = "Out Patient Description";
                        }
                        else {
                            this.VarianceDiagCode = "ICD_CODE";
                            this.VarianceDiagDesc = "ICD_DESCR";
                            this.lblPhyvariance = "In Patient Code";
                            this.lblPhyvarianceDesc = "In Patient Description";
                        }
                        return [4 /*yield*/, this.PouCstvarianceService.Getcostvarianceanalysisspecialitydata(this.VarianceDiagCode, this.ddltyear, this.strHalfyear, this.strQuarter, this.strMonth).catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                //sessionStorage.setItem('_DS', JSON.stringify(data.DataList));
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
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_REMOTEERROR) {
                                    _this.spinnerService.stop();
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Remote server error' });
                                    _this.pop = false;
                                    return;
                                }
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstCostVarianceBySplt = data.DataList;
                                        if (_this.lstCostVarianceBySplt != null && _this.lstCostVarianceBySplt.length > 0) {
                                            sessionStorage.setItem('SesCostVarianceSplty', JSON.stringify(data.DataList));
                                            _this.gvVarianceSpelty = true;
                                            _this.showGrid = true;
                                            _this.tdExports = true;
                                            _this.spinnerService.stop();
                                            _this.lstLength = _this.lstCostVarianceBySplt.length + " Record(s) found";
                                            _this.activeTab = "Variance by Speciality";
                                        }
                                        else {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                                            _this.pop = false;
                                        }
                                        if (_this.lstCostVarianceBySplt.length <= 0) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                                            _this.pop = false;
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.selectedSltRnge = "";
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.selectedSltRnge = "";
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.selectedSltRnge = "";
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        ex_1 = _a.sent();
                        this.displayCatchException(ex_1);
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    CostVarianceComponent.prototype.onExportToExcelClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, blob, ex_2;
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
                        file_saver_1.saveAs(blob, "POUCostVarianceAnalysis.xls");
                        return [3 /*break*/, 4];
                    case 2:
                        ex_2 = _a.sent();
                        this.displayCatchException(ex_2);
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CostVarianceComponent.prototype.onPrintClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, newwindow, ex_3;
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
                            newwindow = window.open('', null, 'height=650,width=650,status=no,resizable=yes, scrollbars=yes, toolbar=no,location=center,menubar=no');
                            newwindow.document.write('<html><head><title>' + 'Point Of Use - Cost Variance Analysis Report' + '</title>');
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
                        ex_3 = _a.sent();
                        this.displayCatchException(ex_3);
                        return [2 /*return*/, false];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CostVarianceComponent.prototype.onSendMailIconClick = function (event) {
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
    CostVarianceComponent.prototype.onSendMailClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var html, toAddr, ex_4;
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
                        return [4 /*yield*/, this.commonService.sendEmbeddedEmail(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId], 'Cost Variance Analysis Report', JSON.stringify(html), this.toMailAddr, '', 'false', AtParEnums_1.MailPriority.Normal.toString(), '')
                                .catch(this.httpService.handleError)
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
                        ex_4 = _a.sent();
                        this.displayCatchException(ex_4);
                        return [3 /*break*/, 6];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    CostVarianceComponent.prototype.exportReportDetails = function (reqType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var htmlBuilder, sbMailText, _strFrmDt, _strToDt, imgserverPath, title, _DS, ex_5, _DS, ex_6, _DS, ex_7, _DS, imgserverPath_1, chartImage, image, chartName, ChartPath, ProductName, ex, ex_8, ex, ex_9, ex_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        htmlBuilder = '';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 37, , 38]);
                        this.statusCode = -1;
                        this.msgs = [];
                        sbMailText = void 0;
                        _strFrmDt = void 0;
                        _strToDt = void 0;
                        imgserverPath = '';
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
                    case 2:
                        _a.sent();
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
                    case 3:
                        _a.sent();
                        imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
                        title = '""' + "AtparVersion 2.8" + '""';
                        htmlBuilder = "<Table align=left width=90% cellpadding=0 cellspacing = 0 vAlign=top>";
                        if (reqType == 'Print') {
                            htmlBuilder += "<TR width='100%'><td   colspan=2 align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td><td align=left  width='85%' height=63 nowrap><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>"
                                + "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                                + "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                                + "<tr><td colspan=5 align=left><span class=c2><b> Cost Variance Analysis Report </b></span></td><td align=right valign=top>&nbsp;";
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
                                + "<tr><td colspan=3 align=left><span class=c2><b> Cost Variance Analysis Report </b></span></td><td align=right valign=top>&nbsp;";
                        }
                        if (!(this.activeTab == "Variance by Speciality")) return [3 /*break*/, 9];
                        _DS = [];
                        return [4 /*yield*/, JSON.parse(sessionStorage.getItem('SesCostVarianceSplty'))];
                    case 4:
                        _DS = (_a.sent());
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                            + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                            + "<tr bgcolor=#d3d3d3>"
                            + "<td align=center width=20% nowrap><span class=c3><b>Specialty Code</b></span></td>"
                            + "<td align=center width=15% nowrap><span class=c3><b># Procedures</b></span></td>"
                            + "<td align=center width=15% nowrap><span class=c3><b>Total Spend</b></span></td>"
                            + "<td align=center width=10% nowrap><span class=c3><b>Extended Variance</b></span></td>"
                            + "</tr>";
                        return [4 /*yield*/, _DS.forEach(function (header) {
                                htmlBuilder += "<tr>"
                                    + "<td align=left nowrap><span class=c3>" + header.SPECIALTY_CODE + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + header.NO_OF_PROCEDURES.toLocaleString('en-US') + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + header.TOTAL_SPEND.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + header.TOTAL_VARIANCE.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td>"
                                    + "</tr>";
                            })];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        ex_5 = _a.sent();
                        htmlBuilder = '';
                        this.displayCatchException(ex_5);
                        return [3 /*break*/, 8];
                    case 8: return [3 /*break*/, 36];
                    case 9:
                        if (!(this.activeTab == "Variance by ICD" || this.activeTab == "Variance by Procedure" || this.activeTab == "Variance by CPT")) return [3 /*break*/, 15];
                        _a.label = 10;
                    case 10:
                        _a.trys.push([10, 13, , 14]);
                        _DS = [];
                        return [4 /*yield*/, JSON.parse(sessionStorage.getItem('SesCostVarianceICD'))];
                    case 11:
                        _DS = (_a.sent());
                        htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                            + "<div style='margin-bottom:20px; width:100%'>"
                            + "<table align=center width=100% style='BORDER-COLLAPSE:collapse; border:none;'>"
                            + "<tr>"
                            + "<td>Range:</td>"
                            + "<td style='font-weight:bold !important'>" + this.selectedSltRngeLbl + "</td>"
                            + "<td>Year:</td>"
                            + "<td style='font-weight:bold !important'>" + this.ddltyear + "</td>"
                            + "<td>Specialty:</td>"
                            + "<td style='font-weight:bold !important'>" + this.VarnceSpecialityDescription + "(" + this.VarnceSpecialityCode + ")" + "</td>";
                        if (this.showHalfyrlbl) {
                            htmlBuilder += "<td>" + this.Hlfqtrmnthlbltxt + "</td>"
                                + "<td style='font-weight:bold !important'>" + this.Hlfqtrmnthlbl + "</td>";
                        }
                        htmlBuilder += "</tr>"
                            + "</table></div>"
                            + "</td></tr>";
                        htmlBuilder += "<tr><td colspan=2> "
                            + "<table align=center width=100% border=1 style=" + "" + "BORDER-COLLAPSE:collapse" + "" + ">"
                            + "<tr bgcolor=#d3d3d3>"
                            + "<td align=center width=10% nowrap><span class=c3><b>" + this.selectedVarianceType + " Code</b></span></td>"
                            + "<td align=center width=15% wrap><span class=c3><b>" + this.selectedVarianceType + " Description</b></span></td>"
                            + "<td align=center width=10% nowrap><span class=c3><b># Physicians</b></span></td>"
                            + "<td align=center width=10% nowrap><span class=c3><b># Procedures</b></span></td>"
                            + "<td align=center width=10% nowrap><span class=c3><b>Avg.Min</b></span></td>"
                            + "<td align=center width=10% nowrap><span class=c3><b>Avg.Max</b></span></td>"
                            + "<td align=center width=10% nowrap><span class=c3><b>Variance</b></span></td>"
                            + "<td align=center width=10% nowrap><span class=c3><b>Total Spend</b></span></td>"
                            + "<td align=center width=15% nowrap><span class=c3><b>Total Spend Annualized</b></span></td>"
                            + "</tr>";
                        return [4 /*yield*/, _DS.forEach(function (header) {
                                htmlBuilder += "<tr>"
                                    + "<td align=left nowrap><span class=c3>" + header.CODE + "</span></td>"
                                    + "<td align=left wrap><span class=c3>" + header.DESCRIPTION + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + header.NO_OF_PHYSICIANS.toLocaleString('en-US') + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + header.NO_OF_PROCEDURES.toLocaleString('en-US') + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + header.MIN_USAGE.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + header.MAX_USAGE.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + header.TOTAL_VARIANCE.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + header.TOTAL_SPEND.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + header.TOTAL_ANNUAL_SPEND.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td>"
                                    + "</tr>";
                            })];
                    case 12:
                        _a.sent();
                        return [3 /*break*/, 14];
                    case 13:
                        ex_6 = _a.sent();
                        htmlBuilder = '';
                        this.displayCatchException(ex_6);
                        return [3 /*break*/, 14];
                    case 14: return [3 /*break*/, 36];
                    case 15:
                        if (!(this.activeTab == "Physician Variance")) return [3 /*break*/, 21];
                        _a.label = 16;
                    case 16:
                        _a.trys.push([16, 19, , 20]);
                        _DS = [];
                        return [4 /*yield*/, JSON.parse(sessionStorage.getItem('_DSSurgeon'))];
                    case 17:
                        _DS = (_a.sent());
                        htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                            + "<div style='margin-bottom:20px; width:100%'>"
                            + "<table align=center width=100% style='BORDER-COLLAPSE:collapse; margin-bottom:15px; border:none;'>"
                            + "<tr>"
                            + "<td>Range:</td>"
                            + "<td style='font-weight:bold !important'>" + this.selectedSltRngeLbl + "</td>"
                            + "<td>Year:</td>"
                            + "<td style='font-weight:bold !important'>" + this.ddltyear + "</td>"
                            + "<td>Specialty:</td>"
                            + "<td style='font-weight:bold !important'>" + this.VarnceSpecialityDescription + "(" + this.VarnceSpecialityCode + ")" + "</td>";
                        if (this.showHalfyrlbl) {
                            htmlBuilder += "<td>" + this.Hlfqtrmnthlbltxt + "</td>"
                                + "<td style='font-weight:bold !important'>" + this.Hlfqtrmnthlbl + "</td>";
                        }
                        htmlBuilder += "</tr>"
                            + "</table></div>"
                            + "</td></tr>";
                        htmlBuilder += "<tr><td colspan=2>"
                            + "<table style= 'border:1px solid black; border-collapse:collapse;' > <tr><td width='15%' style= 'font-size:12px;font-weight:bold' align= 'center'> No.of Physicians: </td>"
                            + "<td align='right' width='5%'  style='border:black 1px solid;font-size:12px'>" + this.DynamicDignsis.NO_OF_PHYSICIANS + "</td>"
                            + "<td width='15%' style='border:black 1px solid;font-size:12px;font-weight:bold' align='center'>No.of Procedures:</td>"
                            + "<td align='right' width='5%' style='border:black 1px solid;font-size:12px'>" + this.DynamicDignsis.NO_OF_PROCEDURES + "</td>"
                            + "<td style='border:black 1px solid'></td><td style='border:black 1px solid'></td><td style='border:black 1px solid'></td></tr><tr>"
                            + "<td style='border:black 1px solid;font-size:12px'></td><td style='border:black 1px solid;font-size:12px'></td>"
                            + "<td style='border:black 1px solid;font-size:12px'></td><td style='border:black 1px solid;font-size:12px'></td>"
                            + "<td width='5%' style='border:black 1px solid; font-size:12px; font-weight:bold' align='center'>Min Avg</td>"
                            + "<td width='5%' style='border:black 1px solid; font-size:12px; font-weight:bold' align='center'>Max Avg</td>"
                            + "<td width='5%' style='border:black 1px solid; font-size:12px; font-weight:bold' align='center'>Total Variance</td></tr>"
                            + "<tr class='RepAltDataRecord'><td width='15%' style='border:black 1px solid;font-size:12px; font-weight:bold' align='center'>" + this.lblPhyvariance + ":</td>"
                            + "<td width='5%'  style='border:black 1px solid;font-size:12px'>" + this.DynamicDignsis.CODE + "</td>"
                            + "<td style='border:black 1px;solid;font-size:12px'>" + this.DynamicDignsis.DESCRIPTION + "</td>"
                            + "<td width='5%' style='border:black 1px solid;font-size:12px'></td></td>"
                            + "<td align='right' style='border:black 1px solid;font-size:12px'>" + this.DynamicDignsis.MIN_USAGE.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + ""
                            + "<td style='border:black 1px solid;font-size:12px; align='right'>" + this.DynamicDignsis.MAX_USAGE.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</td> "
                            + "<td style='border:black 1px solid;font-size:12px;align='right'>" + this.DynamicDignsis.TOTAL_VARIANCE.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</td></tr> "
                            + " </table> </td> </tr> <tr height=20 > </tr> </table> </td> </tr> <tr><td colspan=2 > ";
                        htmlBuilder += "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                            + "<tr bgcolor=#d3d3d3>"
                            + "<td align=center width=15% nowrap><span class=c3><b>Physician</b></span></td>"
                            + "<td align=center width=10% wrap><span class=c3><b># Procedures</b></span></td>"
                            + "<td align=center width=15% nowrap><span class=c3><b>Min Procedure Cost</b></span></td>"
                            + "<td align=center width=15% nowrap><span class=c3><b>Max Procedure Cost</b></span></td>"
                            + "<td align=center width=15% nowrap><span class=c3><b>Average Procedure Cost</b></span></td>"
                            + "<td align=center width=15% nowrap><span class=c3><b>Variance From Min Procedure Cost</b></span></td>"
                            + "<td align=center width=15% nowrap><span class=c3><b>Extended Variance</b></span></td>"
                            + "</tr>";
                        return [4 /*yield*/, _DS.forEach(function (header) {
                                htmlBuilder += "<tr>"
                                    + "<td align=left nowrap><span class=c3>" + header.PHYSICIAN_NAME + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + header.NO_OF_PROCEDURES.toLocaleString('en-US') + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + header.MIN_PROC_COST.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + header.MAX_PROC_COST.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + header.AVG_PROC_COST.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + header.MIN_PROC_VARIANCE.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + header.EXTENDED_VARIANCE.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td>"
                                    + "</tr>";
                            })];
                    case 18:
                        _a.sent();
                        return [3 /*break*/, 20];
                    case 19:
                        ex_7 = _a.sent();
                        htmlBuilder = '';
                        this.displayCatchException(ex_7);
                        return [3 /*break*/, 20];
                    case 20: return [3 /*break*/, 36];
                    case 21:
                        if (!(this.activeTab == "Spend by Item Category")) return [3 /*break*/, 30];
                        _DS = [];
                        _a.label = 22;
                    case 22:
                        _a.trys.push([22, 28, , 29]);
                        imgserverPath_1 = '';
                        chartImage = document.getElementById("SpndItemChart");
                        image = chartImage.toDataURL("image/png");
                        image = image.replace(/^data:image\/(png|jpg);base64,/, "");
                        return [4 /*yield*/, this.commonService.saveImage(image, "Spend_by_Item_Category").
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
                    case 23:
                        _a.sent();
                        chartName = 'Spend_by_Item_Category.png';
                        imgserverPath_1 = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
                        ChartPath = this.httpService.BaseUrl + '/Uploaded/';
                        ProductName = "Pref Card Performance Summary";
                        htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                            + "<div style='margin-bottom:20px; width:100%'>"
                            + "<table align=center width=100% style='BORDER-COLLAPSE:collapse; border:none;'>"
                            + "<tr>"
                            + "<td>Range:</td>"
                            + "<td style='font-weight:bold !important'>" + this.selectedSltRngeLbl + "</td>"
                            + "<td>Year:</td>"
                            + "<td style='font-weight:bold !important'>" + this.ddltyear + "</td>"
                            + "<td>Specialty:</td>"
                            + "<td style='font-weight:bold !important'>" + this.VarnceSpecialityDescription + "(" + this.VarnceSpecialityCode + ")" + "</td>";
                        if (this.showHalfyrlbl) {
                            htmlBuilder += "<td>" + this.Hlfqtrmnthlbltxt + "</td>"
                                + "<td style='font-weight:bold !important'>" + this.Hlfqtrmnthlbl + "</td>";
                        }
                        htmlBuilder += "</tr>"
                            + "</table></div>"
                            + "</td></tr>";
                        htmlBuilder += "<tr><td> "
                            + "<div><div><table style=" + "" + "BORDER-COLLAPSE:collapse; padding-top:15px;" + "" + " border=1>"
                            + "<tr>"
                            + "<td width=100% align=center colspan= '4' nowrap>"
                            + "<span class=c3><b>" + this.lblPhyvariance + ":" + this.DynamicDignsis.CODE + "</b>(" + this.DynamicDignsis.DESCRIPTION + ")" + "</span></td>"
                            + "</tr>"
                            + "<tr>"
                            + " <td width=20%><span class=c3><b># Procedures:</b></span></td >"
                            + "<td width=80% colspan= '3' align=right><span class=c3> " + this.DynamicDignsis.NO_OF_PROCEDURES + "</span></td>"
                            + "</tr>"
                            + "<tr> "
                            + "<td width=25% align=center><span class=c3><b> Cost Per Case </b></span></td >"
                            + "<td width=25% align=center><span class=c3><b> Avg Min </b></span></td >"
                            + "<td width=25% align=center><span class=c3><b> Avg Max </b></span></td >"
                            + "<td width=25% align=center><span class=c3><b> Total Spend </b></span></td >"
                            + "</tr>"
                            + "<tr>"
                            + " <td></td>"
                            + "<td align='right'><span class=c3>" + this.DynamicDignsis.MIN_USAGE.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td>"
                            + "<td align='right'><span class=c3>" + this.DynamicDignsis.MAX_USAGE.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td> "
                            + "<td align='right'><span class=c3>" + this.DynamicDignsis.TOTAL_ANNUAL_SPEND.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td></tr> "
                            + "</tr>"
                            + "<tr>"
                            + "<td width=25% align=center><span class=c3><b>  Item Group </b></span></td >"
                            + "<td width=25% align=center><span class=c3><b> Total Spend </b></span></td >"
                            + "<td width=25% align=center><span class=c3><b> Percent </b></span></td >"
                            + "<td width=25% align=center><span class=c3><b> Item Count </b></span></td > "
                            + "</tr>";
                        return [4 /*yield*/, this.lstCostVarianceItemHdrDtls.forEach(function (header) {
                                htmlBuilder += "<tr>"
                                    + "<td align=left nowrap><span class=c3>" + header.ITEM_GROUP + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + header.TOTAL_COST_ITEM_GROUP.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + (header.TOTAL_COST_ITEM_GROUP / _this.DynamicDignsis.TOTAL_ANNUAL_SPEND).toLocaleString('en-US', { style: 'percent', maximumFractionDigits: 2 }) + "</span></td>"
                                    + "<td align=right nowrap><span class=c3>" + header.NO_OF_ITEMS_BY_ITEM_GROUP.toLocaleString('en-US') + "</span></td>"
                                    + "</tr>";
                            })];
                    case 24:
                        _a.sent();
                        htmlBuilder += "</table></td><td>"
                            + "<table><tr><td align=center colspan=9 align=left nowrap>"
                            + "<span class=c3><img src= " + ChartPath + chartName + "  width=225 height=175></span></td></tr></table></td>";
                        htmlBuilder += "<tr></tr><table style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                            + "<tr>"
                            + "<td width='25%' align='center'><span class=c3><b> Total Cost By Group </b></span></td>"
                            + "<td align='center' width= '25%' colspan = " + this.lstCostVarianceSurHdrData.length + " ><span class=c3><b> Physician / Total Cases</b></span></td>"
                            + "</tr><tr>"
                            + "<td width='25%' style= 'font-size:12px'> </td>";
                        return [4 /*yield*/, this.lstCostVarianceSurHdrData.forEach(function (header) {
                                htmlBuilder += "<td align=left nowrap><span class=c3><b>" + header.PHYSICIAN_NAME + "</b></span></td>";
                            })];
                    case 25:
                        _a.sent();
                        htmlBuilder += "</tr>"
                            + "<tr><td width='25%' align='center'><span class=c3><b> Group </b></span></td>";
                        return [4 /*yield*/, this.lstCostVariaceByPhy.forEach(function (header) {
                                htmlBuilder += "<td align=right nowrap><span class=c3>" + header.NO_OF_PROCEDURES.toLocaleString('en-US') + "</span></td>";
                            })];
                    case 26:
                        _a.sent();
                        +"</tr>";
                        return [4 /*yield*/, this.lstAny.forEach(function (header) {
                                htmlBuilder += "<tr><td align=left nowrap><span class=c3>" + header.ITEM_GROUP + "</span></td>";
                                _this.lstCostVarianceSurHdrData.forEach(function (header1) {
                                    ex = header[header1.PHYSICIAN_ID] == null || header[header1.PHYSICIAN_ID] == undefined ? "$0.00" : header[header1.PHYSICIAN_ID].toLocaleString('en-US', { style: 'currency', currency: 'USD' });
                                    htmlBuilder += "<td align=right nowrap><span class=c3>" + ex + "</span></td>";
                                });
                                +"</tr>";
                            })];
                    case 27:
                        _a.sent();
                        +"</table>";
                        return [3 /*break*/, 29];
                    case 28:
                        ex_8 = _a.sent();
                        htmlBuilder = '';
                        this.displayCatchException(ex_8);
                        return [3 /*break*/, 29];
                    case 29: return [3 /*break*/, 36];
                    case 30:
                        if (!(this.activeTab == "Supply Details")) return [3 /*break*/, 36];
                        _a.label = 31;
                    case 31:
                        _a.trys.push([31, 35, , 36]);
                        htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                            + "<div style='margin-bottom:20px; width:100%'>"
                            + "<table align=center width=100% style='BORDER-COLLAPSE:collapse; border:none;'>"
                            + "<tr>"
                            + "<td>Range:</td>"
                            + "<td style='font-weight:bold !important'>" + this.selectedSltRngeLbl + "</td>"
                            + "<td>Year:</td>"
                            + "<td style='font-weight:bold !important'>" + this.ddltyear + "</td>"
                            + "<td>Specialty:</td>"
                            + "<td style='font-weight:bold !important'>" + this.VarnceSpecialityDescription + "(" + this.VarnceSpecialityCode + ")" + "</td>";
                        if (this.showHalfyrlbl) {
                            htmlBuilder += "<td>" + this.Hlfqtrmnthlbltxt + "</td>"
                                + "<td style='font-weight:bold !important'>" + this.Hlfqtrmnthlbl + "</td>";
                        }
                        htmlBuilder += "</tr>"
                            + "</table></div>"
                            + "</td></tr>";
                        htmlBuilder += "<tr><td> "
                            + "<table style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                            + "<tr>"
                            + "<td width='15%' align=center nowrap>"
                            + "<span class=c3><b>" + this.lblPhyvariance + "</b></span></td>"
                            + "<td width='10%' align=right nowrap>"
                            + "<span class=c3>" + this.DynamicDignsis.CODE + "</span></td>"
                            + "<td width='20%' align=center nowrap>"
                            + "<span class=c3><b>" + this.DynamicDignsis.DESCRIPTION + "</b></span></td>"
                            + "<td width='20%' align=left nowrap>"
                            + "<span class=c3>No.of procedures:</span></td>"
                            + "<td width='10%' align=right nowrap>"
                            + "<span class=c3>" + this.DynamicDignsis.NO_OF_PROCEDURES.toLocaleString('en-US') + "</span></td>"
                            + "<td width='15%' align=left nowrap>"
                            + "<span class=c3>No.of Physicians</span></td>"
                            + "<td width='10%' align=right nowrap>"
                            + "<span class=c3>" + this.DynamicDignsis.NO_OF_PHYSICIANS.toLocaleString('en-US') + "</span></td>"
                            + "</tr></table></td>"
                            + "</tr><tr></tr>";
                        htmlBuilder += "<tr height=20 ></td></tr><tr><td colspan=2></td></tr><tr><td><table style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                            + "<tr>"
                            + "<td width='25%' style= 'font-size:12px'> </td>";
                        return [4 /*yield*/, this.lstCostVarianceSurHdrData.forEach(function (header) {
                                htmlBuilder += "<td align=left nowrap><span class=c3><b>" + header.PHYSICIAN_NAME + "</b></span></td>";
                            })];
                    case 32:
                        _a.sent();
                        htmlBuilder += "</tr>"
                            + "<tr><td width='25%' align='center'><span class=c3><b> Group </b></span></td>";
                        return [4 /*yield*/, this.lstCostVariaceByPhy.forEach(function (header) {
                                htmlBuilder += "<td align=right nowrap><span class=c3>" + header.NO_OF_PROCEDURES.toLocaleString('en-US') + "</span></td>";
                            })];
                    case 33:
                        _a.sent();
                        htmlBuilder += "</tr>";
                        return [4 /*yield*/, this.lstAny.forEach(function (header) {
                                console.log("Property:-" + header.hasOwnProperty("LSTDYNAMIC"));
                                htmlBuilder += "<tr><td align=left colspan = " + (_this.lstCostVarianceSurHdrData.length + 1) + " nowrap><span class=c3>" + header.ITEM_GROUP + "</span>";
                                if (header.hasOwnProperty("LSTDYNAMIC")) {
                                    if (header.LSTDYNAMIC != null && header.LSTDYNAMIC.length > 0) {
                                        htmlBuilder += "<table width=98% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1><tr>"
                                            + "<td align=right nowrap><span class=c3><b> POU Description</b></span></td>"
                                            + "<td align=right nowrap><span class=c3><b> Item#</b></span></td>"
                                            + "<td align=right nowrap><span class=c3><b> MFR Catalog</b></span></td>"
                                            + "<td align=right nowrap><span class=c3><b> Unit Cost</b></span></td>";
                                        _this.lstCostVarianceSurHdrData.forEach(function (header) {
                                            htmlBuilder += "<td align=left wrap><span class=c3><b>" + header.PHYSICIAN_NAME + "</b></span></td>";
                                        });
                                        htmlBuilder += "</tr>";
                                        header.LSTDYNAMIC.forEach(function (details) {
                                            htmlBuilder += "<tr>"
                                                + "<td align=left wrap><span class=c3>" + details.ITEM_DESCRIPTION + "</span></td>"
                                                + "<td align=left nowrap><span class=c3>" + details.ITEM_ID + "</span></td>"
                                                + "<td align=left nowrap><span class=c3>" + details.MFR_CATALOG_NO + "</span></td>"
                                                + "<td align=left nowrap><span class=c3>" + details.UNIT_COST.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + "</span></td>";
                                            _this.lstCostVarianceSurHdrData.forEach(function (header1) {
                                                ex = details[header1.PHYSICIAN_ID] == null ? "" : details[header1.PHYSICIAN_ID];
                                                htmlBuilder += "<td align=right nowrap><span class=c3>" + ex + "</span></td>";
                                            });
                                            htmlBuilder += "</tr>";
                                        });
                                        htmlBuilder += "</tr></table></tr>";
                                    }
                                }
                                htmlBuilder += "</td></tr>";
                            })];
                    case 34:
                        _a.sent();
                        htmlBuilder += "</table></td></tr>";
                        return [3 /*break*/, 36];
                    case 35:
                        ex_9 = _a.sent();
                        htmlBuilder = '';
                        this.displayCatchException(ex_9);
                        return [3 /*break*/, 36];
                    case 36:
                        htmlBuilder += "</Table>";
                        return [2 /*return*/, htmlBuilder];
                    case 37:
                        ex_10 = _a.sent();
                        htmlBuilder = '';
                        return [2 /*return*/, htmlBuilder];
                    case 38: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * This function is used for filtering data in datatable
    * @param event
    */
    CostVarianceComponent.prototype.filterData = function (event) {
        this.lstCostVarianceBySplt = [];
        this.lstCostVarianceBySplt = new Array();
        this.lstCostVarianceBySplt = event;
    };
    /**
    * This method is for displaying catch block error messages
    * @param event
    */
    CostVarianceComponent.prototype.displayCatchException = function (ex) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, ex.toString());
    };
    CostVarianceComponent.prototype.onchange = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.selectedVarianceType == "Select Value") {
                    this.blnselectedVarianceType = true;
                }
                else {
                    this.blnselectedVarianceType = false;
                }
                this.selectedVarianceType = this.selectedVarianceType == "Select Value" ? "ICD" : this.selectedVarianceType;
                return [2 /*return*/];
            });
        });
    };
    CostVarianceComponent.prototype.selectedTabIndexChanged = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    if (event != null) {
                        this.activeTab = event.title;
                    }
                    if (this.activeTab == 'Variance by Speciality') {
                        this.VariancebyICDTab = false;
                        this.gvVarianceICD = false;
                        this.VariancebySpecialityTab = true;
                        this.VariancebyPhyTab = false;
                        this.SpendbyItemCateTab = false;
                        this.SupplyDetailsTab = false;
                        if (this.lstCostVarianceBySplt.length > 0) {
                            this.gvVarianceSpelty = true;
                            this.tdExports = true;
                        }
                        else {
                            this.gvVarianceSpelty = false;
                            this.tdExports = false;
                        }
                    }
                    else if (this.activeTab == "Variance by ICD" || this.activeTab == "Variance by Procedure" || this.activeTab == "Variance by CPT") {
                        this.VariancebySpecialityTab = false;
                        this.VariancebyICDTab = true;
                        this.gvVarianceSpelty = false;
                        this.VariancebyPhyTab = false;
                        this.SpendbyItemCateTab = false;
                        this.SupplyDetailsTab = false;
                        if (this.lstCostVarianceByDiagnsis.length > 0) {
                            this.gvVarianceICD = true;
                            this.tdExports = true;
                        }
                        else {
                            this.gvVarianceICD = false;
                            this.tdExports = false;
                        }
                    }
                    else if (this.activeTab == 'Physician Variance') {
                        this.VariancebyPhyTab = true;
                        this.VariancebySpecialityTab = false;
                        this.VariancebyICDTab = false;
                        this.SpendbyItemCateTab = false;
                        this.SupplyDetailsTab = false;
                        if (this.lstCostVariaceByPhy.length > 0) {
                            this.pop = true;
                            this.tdExports = true;
                        }
                        else {
                            this.pop = false;
                            this.tdExports = false;
                        }
                    }
                    else if (this.activeTab == 'Spend by Item Category') {
                        this.VariancebyPhyTab = false;
                        this.VariancebySpecialityTab = false;
                        this.VariancebyICDTab = false;
                        this.SpendbyItemCateTab = true;
                        this.SupplyDetailsTab = false;
                    }
                    else if (this.activeTab == 'Supply Details') {
                        this.VariancebyPhyTab = false;
                        this.VariancebySpecialityTab = false;
                        this.VariancebyICDTab = false;
                        this.SpendbyItemCateTab = true;
                        this.SupplyDetailsTab = false;
                    }
                    else {
                        this.VariancebySpecialityTab = true;
                        this.VariancebyPhyTab = false;
                        this.VariancebyICDTab = false;
                        this.SpendbyItemCateTab = false;
                        // alert("Please select first three tab's");
                    }
                }
                catch (ex) {
                    this.displayCatchException(ex);
                }
                return [2 /*return*/];
            });
        });
    };
    CostVarianceComponent.prototype.onCaseDetailsClick = function (Navdd, event) {
        var _this = this;
        this.ctabs.filter(function (tab) { return tab.title == 'Spend by Item Category'; })[0].active = false;
        this.ctabs.filter(function (tab) { return tab.title == 'Variance by Speciality'; })[0].active = false;
        this.ctabs.filter(function (tab) { return tab.title == "Variance by " + _this.selectedVarianceType; })[0].active = true;
        this.ctabs.filter(function (tab) { return tab.title == 'Physician Variance'; })[0].active = false;
        this.ctabs.filter(function (tab) { return tab.title == 'Supply Details'; })[0].active = false;
        this.VarnceSpecialityCode = Navdd.SPECIALTY_CODE;
        this.VarnceSpecialityDescription = Navdd.SPECIALTY_DESCRIPTION;
        this.activeTab = "Variance by " + this.selectedVarianceType;
        this.SltVariancDiagRnge = this.selectedSltRnge;
        this.SltVariancDiagHQM = this.selectedSltHQM;
        this.lstCostVariaceByPhy = [];
        this.lstAny = [];
        this.lstItemData = [];
        this.lstCostVarianceSurHdrData = [];
        this.SupplyDetlslngth = 0;
        this.GetCostVarianceDiagnosis();
    };
    CostVarianceComponent.prototype.btnGetCostVarianceDiagnosis = function () {
        try {
            this.activeTab = "Variance by " + this.selectedVarianceType;
            if (this.selectedVarianceType == "Procedure") {
                this.VarianceDiagCode = "PROCEDURE_CODE";
                this.VarianceDiagDesc = "PROCEDURE_DESCRIPTION";
            }
            else if (this.selectedVarianceType == "CPT") {
                this.VarianceDiagCode = "CPT_CODE";
                this.VarianceDiagDesc = "CPT_DESCR";
            }
            else {
                this.VarianceDiagCode = "ICD_CODE";
                this.VarianceDiagDesc = "ICD_DESCR";
            }
            this.lstCostVarianceBySplt = null;
            this.spinnerService.start();
            if (this.dataTableComponent != null) {
                this.dataTableComponent.reset();
            }
            this.growlMessage = [];
            this.pop = false;
            this.gvVarianceSpelty = false;
            this.tdExports = false;
            if (this.SltVariancDiagRnge == "HY" && (this.SltVariancDiagHQM == undefined || this.SltVariancDiagHQM == "" || this.SltVariancDiagHQM == "Select Value")) {
                this.growlMessage = [];
                this.spinnerService.stop();
                this.pop = false;
                this.tdExports = false;
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Half Year" });
                return;
            }
            else if (this.SltVariancDiagRnge == "Q" && (this.SltVariancDiagHQM == undefined || this.SltVariancDiagHQM == "" || this.SltVariancDiagHQM == "Select Value")) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Quarter" });
                this.spinnerService.stop();
                this.pop = false;
                this.tdExports = false;
                return;
            }
            else if (this.SltVariancDiagRnge == "M" && (this.SltVariancDiagHQM == undefined || this.SltVariancDiagHQM == "" || this.SltVariancDiagHQM == "Select Value")) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Select Month' });
                this.spinnerService.stop();
                this.pop = false;
                return;
            }
            else if (this.SltVariancDiagRnge == "Select Value" || this.SltVariancDiagRnge == undefined || this.SltVariancDiagRnge == "") {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Range" });
                this.spinnerService.stop();
                this.pop = false;
                return;
            }
            else if (this.ddltyear == undefined || this.ddltyear == "") {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please Select Year" });
                this.spinnerService.stop();
                this.pop = false;
                return;
            }
            else {
                this.strHalfyear = "0";
                this.strMonth = "0";
                this.strQuarter = "0";
                switch (this.selectedSltRnge) {
                    case "HY": {
                        this.strHalfyear = this.SltVariancDiagHQM;
                        break;
                    }
                    case "Q": {
                        this.strQuarter = this.SltVariancDiagHQM;
                        break;
                    }
                    case "M": {
                        this.strMonth = this.SltVariancDiagHQM;
                        break;
                    }
                }
                this.GetCostVarianceDiagnosis();
            }
        }
        catch (ex) {
            this.displayCatchException(ex);
        }
    };
    CostVarianceComponent.prototype.GetCostVarianceDiagnosis = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.SpendbyItemCateTab = false;
                        this.VariancebySpecialityTab = false;
                        this.gvVarianceSpelty = false;
                        this.gvVarianceICD = false;
                        this.SpendbyItemCateTab = false;
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.PouCstvarianceService.GetCostVarianceByDiagnosiscode(this.VarnceSpecialityCode, this.VarianceDiagCode, this.VarianceDiagDesc, this.ddltyear, this.strHalfyear, this.strQuarter, this.strMonth).catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                sessionStorage.setItem('_DS', JSON.stringify(data.DataList));
                                sessionStorage.setItem('SesCostVarianceICD', JSON.stringify(data.DataList));
                                _this.lstCostVarianceByDiagnsis = data.DataList;
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                    _this.spinnerService.stop();
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Records Found' });
                                    _this.pop = false;
                                    _this.VariancebyICDTab = true;
                                    return;
                                }
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR) {
                                    _this.spinnerService.stop();
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Failed To Get Data' });
                                    _this.pop = false;
                                    _this.VariancebyICDTab = true;
                                    return;
                                }
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_REMOTEERROR) {
                                    _this.spinnerService.stop();
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Remote server error' });
                                    _this.pop = false;
                                    _this.VariancebyICDTab = true;
                                    return;
                                }
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstCostVarianceByDiagnsis = data.DataList;
                                        if (_this.lstCostVarianceByDiagnsis != null && _this.lstCostVarianceByDiagnsis.length > 0) {
                                            _this.showGrid = true;
                                            _this.tdExports = true;
                                            _this.spinnerService.stop();
                                            _this.gvVarianceICD = true;
                                            _this.VariancebyICDTab = true;
                                            _this.lstICDLength = _this.lstCostVarianceByDiagnsis.length + " Record(s) found";
                                            //this.activeTab = "Variance by ICD";
                                            _this.activeTab = "Variance by " + _this.selectedVarianceType;
                                        }
                                        else {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                                            _this.pop = false;
                                            _this.VariancebyICDTab = true;
                                        }
                                        if (_this.lstCostVarianceByDiagnsis.length <= 0) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                                            _this.pop = false;
                                            _this.VariancebyICDTab = true;
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.SltVariancDiagRnge = "";
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.SltVariancDiagRnge = "";
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.SltVariancDiagRnge = "";
                                        _this.spinnerService.stop();
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
                        ex_11 = _a.sent();
                        this.displayCatchException(ex_11);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CostVarianceComponent.prototype.onVarianceByPhyClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var i, physplit, label, data, backColors, hoverBackColors, i, ex_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        this.ctabs.filter(function (tab) { return tab.title == 'Spend by Item Category'; })[0].active = true;
                        this.ctabs.filter(function (tab) { return tab.title == 'Variance by Speciality'; })[0].active = false;
                        this.ctabs.filter(function (tab) { return tab.title == "Variance by " + _this.selectedVarianceType; })[0].active = false;
                        this.ctabs.filter(function (tab) { return tab.title == 'Physician Variance'; })[0].active = false;
                        this.ctabs.filter(function (tab) { return tab.title == 'Supply Details'; })[0].active = false;
                        this.VariancebySpecialityTab = false;
                        this.gvVarianceSpelty = false;
                        this.gvVarianceICD = false;
                        this.SpendbyItemCateTab = true;
                        this.VariancebyICDTab = false;
                        this.VariancebyPhyTab = false;
                        this.activeTab = "Spend by Item Category";
                        this.PhyIds = "";
                        this.NoOfProcedures = 0;
                        this.lstChartData = [];
                        //this.lstAny = [];
                        //this.SupplyDetlslngth = 0;
                        return [4 /*yield*/, this.PouCstvarianceService.GetCostvarianceSurgeonHdrData(this.DynamicDignsis.CODE, this.VarnceSpecialityCode, this.VarianceDiagCode, this.ddltyear, this.strHalfyear, this.strQuarter, this.strMonth).catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.lstCostVarianceSurHdrData = data.DataList;
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                    _this.spinnerService.stop();
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Records Found' });
                                    return;
                                }
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR) {
                                    _this.spinnerService.stop();
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Failed To Get Data' });
                                    return;
                                }
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_REMOTEERROR) {
                                    _this.spinnerService.stop();
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Remote server error' });
                                    return;
                                }
                            })];
                    case 1:
                        //this.lstAny = [];
                        //this.SupplyDetlslngth = 0;
                        _a.sent();
                        for (i = 0; i < this.lstCostVarianceSurHdrData.length; i++) {
                            physplit = this.lstCostVarianceSurHdrData[i].PHYSICIAN_NAME.split(',');
                            if (physplit != null && physplit.length > 1) {
                                this.lstCostVarianceSurHdrData[i].PHYSICIAN_NAME = physplit[0] + ', ' + physplit[1];
                            }
                            this.PhyIds = this.PhyIds + this.lstCostVarianceSurHdrData[i].PHYSICIAN_ID;
                            this.NoOfProcedures = this.NoOfProcedures + this.lstCostVarianceSurHdrData[i].TOTAL_NO_OF_CASES_PHYSICIAN;
                            if (i != this.lstCostVarianceSurHdrData.length - 1) {
                                this.PhyIds = this.PhyIds + ",";
                            }
                        }
                        //this.PhyIds = '';
                        if (this.PhyIds == '' || this.PhyIds == null) {
                            this.showSpendByItmTab = false;
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.PouCstvarianceService.GetCostVarianceItemGroups(this.VarianceDiagCode, this.VarnceSpecialityCode, this.DynamicDignsis.CODE, this.ddltyear, this.strHalfyear, this.strQuarter, this.strMonth).catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.lstCostVarianceItemGroups = data.DataList;
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                    _this.spinnerService.stop();
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Records Found' });
                                    return;
                                }
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR) {
                                    _this.spinnerService.stop();
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Failed To Get Data' });
                                    return;
                                }
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_REMOTEERROR) {
                                    _this.spinnerService.stop();
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Remote server error' });
                                    return;
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.PouCstvarianceService.GetCostvarianceItemHdrDetails(this.VarianceDiagCode, this.VarnceSpecialityCode, this.DynamicDignsis.CODE, this.ddltyear, this.strHalfyear, this.strQuarter, this.strMonth).catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.lstCostVarianceItemHdrDtls = data.DataList;
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                    _this.spinnerService.stop();
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Records Found' });
                                    return;
                                }
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR) {
                                    _this.spinnerService.stop();
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Failed To Get Data' });
                                    return;
                                }
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_REMOTEERROR) {
                                    _this.spinnerService.stop();
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Remote server error' });
                                    return;
                                }
                            })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.PouCstvarianceService.GetCostvarianceSurgeonItemgroupDetails(this.VarianceDiagCode, this.VarnceSpecialityCode, this.DynamicDignsis.CODE, this.PhyIds, this.ddltyear, this.strHalfyear, this.strQuarter, this.strMonth).catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.lstAny = data.DataDictionary["ItemGroupDetails"]["Table"];
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                    _this.spinnerService.stop();
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Records Found' });
                                    return;
                                }
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR) {
                                    _this.spinnerService.stop();
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Failed To Get Data' });
                                    return;
                                }
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_REMOTEERROR) {
                                    _this.spinnerService.stop();
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Remote server error' });
                                    return;
                                }
                            })];
                    case 4:
                        _a.sent();
                        label = [];
                        data = [];
                        backColors = [];
                        hoverBackColors = [];
                        for (i = 0; i < this.lstCostVarianceItemHdrDtls.length; i++) {
                            this.ChartColor = "";
                            switch (this.lstCostVarianceItemHdrDtls[i].ITEM_GROUP) {
                                case "Preference Card Item": {
                                    this.ChartColor = '#008dfa';
                                    break;
                                }
                                case "Surgical Implant": {
                                    this.ChartColor = '#ff4717';
                                    break;
                                }
                                case "General Surgical Supply": {
                                    this.ChartColor = '#ffa630';
                                    break;
                                }
                                case "Physician Preference": {
                                    this.ChartColor = '#1bb377';
                                    break;
                                }
                                default: {
                                    this.ChartColor = this.getRandomColor();
                                    break;
                                }
                            }
                            label.push(this.lstCostVarianceItemHdrDtls[i].ITEM_GROUP);
                            data.push([Math.round((this.lstCostVarianceItemHdrDtls[i].TOTAL_COST_ITEM_GROUP / this.DynamicDignsis.TOTAL_ANNUAL_SPEND) * 100)]);
                            backColors.push(this.ChartColor);
                            hoverBackColors.push(this.ChartColor);
                        }
                        this.lstChartData = {
                            labels: label,
                            datasets: [
                                {
                                    data: data,
                                    backgroundColor: backColors,
                                    hoverBackgroundColor: hoverBackColors,
                                }
                            ]
                        };
                        return [3 /*break*/, 6];
                    case 5:
                        ex_12 = _a.sent();
                        this.displayCatchException(ex_12);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    CostVarianceComponent.prototype.getRandomColor = function () {
        try {
            var letters = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
        catch (ex) {
            this.displayCatchException(ex);
        }
    };
    CostVarianceComponent.prototype.onVarianceByPhyDyClick = function () {
        var _this = this;
        this.ctabs.filter(function (tab) { return tab.title == 'Spend by Item Category'; })[0].active = false;
        this.ctabs.filter(function (tab) { return tab.title == 'Variance by Speciality'; })[0].active = false;
        this.ctabs.filter(function (tab) { return tab.title == "Variance by " + _this.selectedVarianceType; })[0].active = false;
        this.ctabs.filter(function (tab) { return tab.title == 'Physician Variance'; })[0].active = false;
        this.ctabs.filter(function (tab) { return tab.title == 'Supply Details'; })[0].active = true;
        this.activeTab = "Supply Details";
        this.SupplyDetailsTab = true;
        this.VariancebySpecialityTab = false;
        this.gvVarianceSpelty = false;
        this.VariancebyICDTab = false;
        this.SpendbyItemCateTab = false;
        this.Fifthtabtble = true;
        this.SupplyDetlslngth = 1;
    };
    CostVarianceComponent.prototype.onVarianceByICDClick = function (Navdd, event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.ctabs.filter(function (tab) { return tab.title == 'Spend by Item Category'; })[0].active = false;
                        this.ctabs.filter(function (tab) { return tab.title == 'Variance by Speciality'; })[0].active = false;
                        this.ctabs.filter(function (tab) { return tab.title == "Variance by " + _this.selectedVarianceType; })[0].active = false;
                        this.ctabs.filter(function (tab) { return tab.title == 'Physician Variance'; })[0].active = true;
                        this.ctabs.filter(function (tab) { return tab.title == 'Supply Details'; })[0].active = false;
                        this.spinnerService.start();
                        this.VariancebySpecialityTab = false;
                        this.gvVarianceSpelty = false;
                        this.VariancebyICDTab = false;
                        this.SpendbyItemCateTab = false;
                        this.activeTab = "Physician Variance";
                        this.DynamicDignsis.CODE = Navdd.CODE;
                        this.DynamicDignsis.DESCRIPTION = Navdd.DESCRIPTION;
                        this.DynamicDignsis.MAX_USAGE = Navdd.MAX_USAGE;
                        this.DynamicDignsis.MIN_USAGE = Navdd.MIN_USAGE;
                        this.DynamicDignsis.TOTAL_VARIANCE = Navdd.TOTAL_VARIANCE;
                        this.DynamicDignsis.NO_OF_PHYSICIANS = Navdd.NO_OF_PHYSICIANS;
                        this.DynamicDignsis.NO_OF_PROCEDURES = Navdd.NO_OF_PROCEDURES;
                        this.DynamicDignsis.TOTAL_ANNUAL_SPEND = Navdd.TOTAL_ANNUAL_SPEND;
                        this.lstCostVariaceByPhy = [];
                        this.lstAny = [];
                        //this.SupplyDetlslngth = 0;
                        return [4 /*yield*/, this.PouCstvarianceService.GetCostVarianceBySurgeon(this.VarianceDiagCode, this.VarnceSpecialityCode, this.DynamicDignsis.CODE, this.ddltyear, this.strHalfyear, this.strQuarter, this.strMonth).catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                sessionStorage.setItem('_DSSurgeon', JSON.stringify(data.DataList));
                                _this.lstCostVariaceByPhy = data.DataList;
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                    _this.spinnerService.stop();
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Records Found' });
                                    _this.pop = false;
                                    _this.VariancebyPhyTab = true;
                                    return;
                                }
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR) {
                                    _this.spinnerService.stop();
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Failed To Get Data' });
                                    _this.pop = false;
                                    _this.VariancebyPhyTab = true;
                                    return;
                                }
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_REMOTEERROR) {
                                    _this.spinnerService.stop();
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Remote server error' });
                                    _this.pop = false;
                                    _this.VariancebyPhyTab = true;
                                    return;
                                }
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.lstCostVariaceByPhy = data.DataList;
                                        if (_this.lstCostVariaceByPhy != null && _this.lstCostVariaceByPhy.length > 0) {
                                            _this.pop = true;
                                            _this.showGrid = true;
                                            _this.tdExports = true;
                                            _this.spinnerService.stop();
                                            _this.VariancebyPhyTab = true;
                                            _this.lstPhyvarianceLength = _this.lstCostVariaceByPhy.length + " Record(s) found";
                                            _this.activeTab = "Physician Variance";
                                        }
                                        else {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                                            _this.pop = false;
                                            _this.VariancebyPhyTab = true;
                                        }
                                        if (_this.lstCostVarianceByDiagnsis.length <= 0) {
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                                            _this.pop = false;
                                            _this.VariancebyPhyTab = true;
                                        }
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.spinnerService.stop();
                                        _this.growlMessage = [];
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 1:
                        //this.SupplyDetlslngth = 0;
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_13 = _a.sent();
                        this.displayCatchException(ex_13);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CostVarianceComponent.prototype.onSupplyDtlsByItemGrpClick = function (Navdd, event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var index, exists, i, find, j;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.activeTab = "Supply Details";
                        index = this.lstAny.findIndex(function (x) { return x.ITEM_GROUP == Navdd.ITEM_GROUP; });
                        exists = false;
                        this.lstAny5th.forEach(function (x) {
                            if (x.ITEM_GROUP == _this.lstAny[index].ITEM_GROUP)
                                exists = true;
                        });
                        if (!exists) return [3 /*break*/, 1];
                        this.lstAny5th.splice(this.lstAny[index], 1);
                        this.lstAny[index].SHOW_HIDE = false;
                        return [3 /*break*/, 3];
                    case 1:
                        for (i = 0; i < this.lstAny5th.length; i++) {
                            find = this.lstAny5th[i].ITEM_GROUP;
                            j = this.lstAny.findIndex(function (y) { return y.ITEM_GROUP == find; });
                            this.lstAny5th.splice(this.lstAny[i], 1);
                            this.lstAny[j].SHOW_HIDE = false;
                        }
                        this.lstAny5th.push(this.lstAny[index]);
                        this.lstAny[index].SHOW_HIDE = true;
                        this.spinnerService.start();
                        return [4 /*yield*/, this.PouCstvarianceService.GetCostvarianceSupplyItemData(Navdd.ITEM_GROUP, this.VarianceDiagCode, this.VarnceSpecialityCode, this.DynamicDignsis.CODE, this.PhyIds, this.ddltyear, this.strHalfyear, this.strQuarter, this.strMonth).catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.lstItemData = data.DataDictionary["DictSupplyItemData"]["Table"];
                                _this.lstAny[index].LSTDYNAMIC = _this.lstItemData;
                                _this.SupplyDetlslngth = _this.lstItemData.length;
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                    _this.spinnerService.stop();
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Records Found' });
                                    return;
                                }
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR) {
                                    _this.spinnerService.stop();
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Failed To Get Data' });
                                    return;
                                }
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.E_REMOTEERROR) {
                                    _this.spinnerService.stop();
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Remote server error' });
                                    return;
                                }
                                else {
                                    _this.spinnerService.stop();
                                }
                            })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * This method is for clearing all the variables
    * @param event
    */
    CostVarianceComponent.prototype.ngOnDestroy = function () {
        this.spinnerService.stop();
        this.spinnerService = null;
        this.lstCostVarianceBySplt = null;
        this.lstSltHQM = null;
        this.lstVarianceType = null;
        this.deviceTokenEntry = null;
    };
    CostVarianceComponent.prototype.enableSelectedTab = function (option) {
        var _this = this;
        this.ctab = option.tab;
        this.ctabs = option.tabs;
        if (option.tab.title == 'Variance by Speciality') {
            this.activeTab = "Variance by Speciality";
            if (this.selectedSltRnge != "Y1") {
                this.gvVarianceSpelty = true;
                this.showGrid = true;
            }
            if (this.lstCostVarianceBySplt != null && this.lstCostVarianceBySplt.length > 0) {
                this.tdExports = true;
            }
            else {
                this.tdExports = false;
                this.gvVarianceSpelty = false;
            }
        }
        else if (option.tab.title == "Variance by " + this.selectedVarianceType) {
            if (this.lstCostVarianceByDiagnsis != null && this.lstCostVarianceByDiagnsis.length > 0) {
                this.activeTab = "Variance by " + this.selectedVarianceType;
                this.gvVarianceICD = true;
                this.showGrid = true;
                this.tdExports = true;
                if (option.tabs != null) {
                    this.ctab = option.tabs.filter(function (tab) { return tab.title == "Variance by " + _this.selectedVarianceType; })[0];
                }
                option.tabs.filter(function (tab) { return tab.title == 'Variance by Speciality'; })[0].active = false;
                option.tabs.filter(function (tab) { return tab.title == 'Physician Variance'; })[0].active = false;
            }
            else if (this.activeTab === "Variance by Speciality" && this.lstCostVarianceByDiagnsis.length === 0) {
                if (this.lstCostVarianceBySplt != null && this.lstCostVarianceBySplt.length > 0) {
                    this.tdExports = true;
                }
                else {
                    this.tdExports = false;
                }
                this.activeTab = "Variance by Speciality";
                this.ctab = option.tabs.filter(function (tab) { return tab.title == 'Variance by Speciality'; })[0];
                option.tabs.filter(function (tab) { return tab.title == "Variance by " + _this.selectedVarianceType; })[0].active = false;
                option.tabs.filter(function (tab) { return tab.title == 'Physician Variance'; })[0].active = false;
            }
        }
        else if (option.tab.title == 'Physician Variance') {
            if (this.lstCostVariaceByPhy != null && this.lstCostVariaceByPhy.length > 0) {
                this.activeTab = "Physician Variance";
                this.tdExports = true;
                if (option.tabs != null) {
                    this.ctab = option.tabs.filter(function (tab) { return tab.title == 'Physician Variance'; })[0];
                }
                option.tabs.filter(function (tab) { return tab.title == 'Variance by Speciality'; })[0].active = false;
                option.tabs.filter(function (tab) { return tab.title == "Variance by " + _this.selectedVarianceType; })[0].active = false;
            }
            else if (this.activeTab === "Variance by Speciality" && this.lstCostVariaceByPhy.length === 0) {
                if (this.lstCostVarianceBySplt != null && this.lstCostVarianceBySplt.length > 0) {
                    this.tdExports = true;
                }
                else {
                    this.tdExports = false;
                }
                this.activeTab = "Variance by Speciality";
                this.ctab = option.tabs.filter(function (tab) { return tab.title == 'Variance by Speciality'; })[0];
                option.tabs.filter(function (tab) { return tab.title == "Variance by " + _this.selectedVarianceType; })[0].active = false;
                option.tabs.filter(function (tab) { return tab.title == 'Physician Variance'; })[0].active = false;
            }
            else if (this.activeTab === "Variance by " + this.selectedVarianceType && this.lstCostVariaceByPhy.length === 0) {
                if (this.lstCostVarianceByDiagnsis != null && this.lstCostVarianceByDiagnsis.length > 0) {
                    this.tdExports = true;
                }
                else {
                    this.tdExports = false;
                }
                this.activeTab = "Variance by " + this.selectedVarianceType;
                this.ctab = option.tabs.filter(function (tab) { return tab.title == "Variance by " + _this.selectedVarianceType; })[0];
                option.tabs.filter(function (tab) { return tab.title == 'Variance by Speciality'; })[0].active = false;
                option.tabs.filter(function (tab) { return tab.title == 'Physician Variance'; })[0].active = false;
            }
        }
        else if (option.tab.title == 'Spend by Item Category') {
            if (this.lstAny != null && this.lstCostVarianceItemGroups != null && this.lstCostVarianceItemHdrDtls != null && this.lstAny.length > 0 && this.lstCostVarianceItemGroups.length > 0 && this.lstCostVarianceItemHdrDtls.length > 0) {
                this.activeTab = "Spend by Item Category";
                this.tdExports = true;
                if (option.tabs != null) {
                    this.ctab = option.tabs.filter(function (tab) { return tab.title == 'Spend by Item Category'; })[0];
                }
                option.tabs.filter(function (tab) { return tab.title == 'Variance by Speciality'; })[0].active = false;
                option.tabs.filter(function (tab) { return tab.title == "Variance by " + _this.selectedVarianceType; })[0].active = false;
                option.tabs.filter(function (tab) { return tab.title == 'Physician Variance'; })[0].active = false;
            }
            else if (this.activeTab === "Variance by Speciality" && this.lstCostVarianceItemGroups.length === 0) {
                if (this.lstCostVarianceBySplt != null && this.lstCostVarianceBySplt.length > 0) {
                    this.tdExports = true;
                }
                else {
                    this.tdExports = false;
                }
                this.activeTab = "Variance by Speciality";
                this.ctab = option.tabs.filter(function (tab) { return tab.title == 'Variance by Speciality'; })[0];
                option.tabs.filter(function (tab) { return tab.title == "Variance by " + _this.selectedVarianceType; })[0].active = false;
                option.tabs.filter(function (tab) { return tab.title == 'Physician Variance'; })[0].active = false;
            }
            else if (this.activeTab === "Variance by " + this.selectedVarianceType && this.lstCostVarianceItemGroups.length === 0) {
                if (this.lstCostVarianceByDiagnsis != null && this.lstCostVarianceByDiagnsis.length > 0) {
                    this.tdExports = true;
                }
                else {
                    this.tdExports = false;
                }
                this.activeTab = "Variance by " + this.selectedVarianceType;
                this.ctab = option.tabs.filter(function (tab) { return tab.title == "Variance by " + _this.selectedVarianceType; })[0];
                option.tabs.filter(function (tab) { return tab.title == 'Variance by Speciality'; })[0].active = false;
                option.tabs.filter(function (tab) { return tab.title == 'Physician Variance'; })[0].active = false;
            }
            else if (this.activeTab === "Physician Variance" && this.lstCostVarianceItemGroups.length === 0) {
                if (this.lstCostVariaceByPhy != null && this.lstCostVariaceByPhy.length > 0) {
                    this.tdExports = true;
                }
                else {
                    this.tdExports = false;
                }
                this.activeTab = "Physician Variance";
                this.ctab = option.tabs.filter(function (tab) { return tab.title == 'Physician Variance'; })[0];
                option.tabs.filter(function (tab) { return tab.title == "Variance by " + _this.selectedVarianceType; })[0] = false;
                option.tabs.filter(function (tab) { return tab.title == 'Variance by Speciality'; })[0].active = false;
            }
        }
        else if (option.tab.title == 'Supply Details') {
            if (this.SupplyDetlslngth > 0 && this.SupplyDetlslngth != null) {
                this.activeTab = "Supply Details";
                this.tdExports = true;
                if (option.tabs != null) {
                    this.ctab = option.tabs.filter(function (tab) { return tab.title == 'Supply Details'; })[0];
                }
                option.tabs.filter(function (tab) { return tab.title == 'Variance by Speciality'; })[0].active = false;
                option.tabs.filter(function (tab) { return tab.title == "Variance by " + _this.selectedVarianceType; })[0].active = false;
                option.tabs.filter(function (tab) { return tab.title == 'Physician Variance'; })[0].active = false;
                option.tabs.filter(function (tab) { return tab.title == 'Spend by Item Category'; })[0].active = false;
            }
            else if (this.activeTab === "Variance by Speciality" && this.SupplyDetlslngth === 0) {
                if (this.lstCostVarianceBySplt != null && this.lstCostVarianceBySplt.length > 0) {
                    this.tdExports = true;
                }
                else {
                    this.tdExports = false;
                }
                this.activeTab = "Variance by Speciality";
                this.ctab = option.tabs.filter(function (tab) { return tab.title == 'Variance by Speciality'; })[0];
                option.tabs.filter(function (tab) { return tab.title == "Variance by " + _this.selectedVarianceType; })[0].active = false;
                option.tabs.filter(function (tab) { return tab.title == 'Physician Variance'; })[0].active = false;
            }
            else if (this.activeTab === "Variance by " + this.selectedVarianceType && this.SupplyDetlslngth === 0) {
                if (this.lstCostVarianceByDiagnsis != null && this.lstCostVarianceByDiagnsis.length > 0) {
                    this.tdExports = true;
                }
                else {
                    this.tdExports = false;
                }
                this.activeTab = "Variance by " + this.selectedVarianceType;
                this.ctab = option.tabs.filter(function (tab) { return tab.title == "Variance by " + _this.selectedVarianceType; })[0];
                option.tabs.filter(function (tab) { return tab.title == 'Variance by Speciality'; })[0].active = false;
                option.tabs.filter(function (tab) { return tab.title == 'Physician Variance'; })[0].active = false;
            }
            else if (this.activeTab === "Physician Variance" && this.SupplyDetlslngth === 0) {
                if (this.lstCostVariaceByPhy != null && this.lstCostVariaceByPhy.length > 0) {
                    this.tdExports = true;
                }
                else {
                    this.tdExports = false;
                }
                this.activeTab = "Physician Variance";
                this.ctab = option.tabs.filter(function (tab) { return tab.title == 'Physician Variance'; })[0];
                option.tabs.filter(function (tab) { return tab.title == "Variance by " + _this.selectedVarianceType; })[0] = false;
                option.tabs.filter(function (tab) { return tab.title == 'Variance by Speciality'; })[0].active = false;
            }
            else if (this.activeTab === "Spend by Item Category" && this.SupplyDetlslngth === 0) {
                if (this.lstCostVarianceItemGroups != null && this.lstCostVarianceItemGroups.length > 0) {
                    this.tdExports = true;
                }
                else {
                    this.tdExports = false;
                }
                this.activeTab = "Spend by Item Category";
                this.ctab = option.tabs.filter(function (tab) { return tab.title == 'Spend by Item Category'; })[0];
                option.tabs.filter(function (tab) { return tab.title == "Variance by " + _this.selectedVarianceType; })[0] = false;
                option.tabs.filter(function (tab) { return tab.title == 'Variance by Speciality'; })[0].active = false;
                option.tabs.filter(function (tab) { return tab.title == 'Physician Variance'; })[0].active = false;
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
    ], CostVarianceComponent.prototype, "dataTableComponent", void 0);
    CostVarianceComponent = __decorate([
        core_1.Component({
            templateUrl: 'pou_cost_variance_report.component.html',
            providers: [AtParConstants_1.AtParConstants, atpar_common_service_1.AtParCommonService, pou_cost_variance_service_service_1.POUCostVarianceService]
        }),
        __metadata("design:paramtypes", [leftbar_animation_service_1.LeftBarAnimationService,
            router_1.Router,
            pou_cost_variance_service_service_1.POUCostVarianceService,
            HttpService_1.HttpService,
            event_spinner_service_1.SpinnerService,
            AtParConstants_1.AtParConstants,
            atpar_common_service_1.AtParCommonService])
    ], CostVarianceComponent);
    return CostVarianceComponent;
}());
exports.CostVarianceComponent = CostVarianceComponent;
//# sourceMappingURL=pou_cost_variance_report.component.js.map