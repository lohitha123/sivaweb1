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
/// <reference path="../Shared/AtParEnums.ts" />
var core_1 = require("@angular/core");
var leftbar_animation_service_1 = require("../Home/leftbar-animation.service");
var router_1 = require("@angular/router");
var HttpService_1 = require("../Shared/HttpService");
var atpar_stationary_print_design_service_1 = require("./atpar-stationary-print-design.service");
var AtParEnums_1 = require("../Shared/AtParEnums");
var linq_es5_1 = require("linq-es5");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var AtParEnums_2 = require("../Shared/AtParEnums");
var AtParConstants_1 = require("../Shared/AtParConstants");
var StationaryPrintDesign = (function () {
    function StationaryPrintDesign(leftBarAnimationsewrvice, router, route, printScreenService, httpService, spinnerService, atParConstant) {
        this.leftBarAnimationsewrvice = leftBarAnimationsewrvice;
        this.router = router;
        this.route = route;
        this.printScreenService = printScreenService;
        this.httpService = httpService;
        this.spinnerService = spinnerService;
        this.atParConstant = atParConstant;
        //#region Declaration
        this.lstProduct = [];
        this.lstPrinterType = [];
        this.lstReportType = [];
        this.lstHeaderRows = [];
        this.lstHeaderColumns = [];
        this.lstDetailsColumns = [];
        this._deviceTokenEntry = [];
        this.headerFontName = "";
        this.valueFontName = "";
        this.intHdrColumns = 0;
        this.intHdrRows = 0;
        this.intDetColumns = 0;
        this.blnLayout = false;
        this.headerRows = "6";
        this.headerColumns = "5";
        this.detailColumns = "6";
        this.growlMessage = [];
        this.lstPrintRepHeaderColumnsMain = []; //lstPrintRepdetailslist1
        this.lstPrintRepDetailColumnsMain = []; //lstPrintRepdetailslist2
        this.lstPrintRepHeaderColumnsRight = []; //lstPrintRepdetailslist3
        this.lstPrintRepDetailColumnsRight = []; //lstPrintRepdetailslist4
        this.lstPrintRepdetailslist7 = [];
        this.lstPrintRepHeaderFont = []; //lstPrintRepdetailslist5
        this.lstPrintRepValueFont = []; //lstPrintRepdetailslist6
        this.lstPrintRepHeaderColumnsLeft = []; //lstPrintRepdetailslist8
        this.lstPrintSavedRepdetails = []; //savingList to database
        this.lstHeaderFont = [];
        this.lstColumnsFont = [];
        this.HdrRows = 0;
        this.newIndexValue = [];
        this.showDiv = false;
        this.lstReportDtls = [];
        this.lstTest = [];
        this.headerColumnsList = [];
        this.headdetailcolumns = [];
        this.detailColumnsheader = [];
        this.isDraggable = true;
        this.lstHeaderRowsCount = [];
        this.lstHeaderColCount = [];
        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        var allFonts = [];
    }
    //#endregion
    /**
     redirecting to home when click on breadcrumbs
     */
    StationaryPrintDesign.prototype.homeurl = function () {
        this.leftBarAnimationsewrvice.isHomeClicked = false;
        this.leftBarAnimationsewrvice.isHide();
        this.router.navigate(['atpar']);
    };
    /**
     OnInit method for getting data when page load
     */
    StationaryPrintDesign.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        this.lstProduct = [];
                        this.lstProduct.push({ label: "Select Product", value: '' });
                        return [4 /*yield*/, this.getProductDetails()];
                    case 1:
                        _a.sent();
                        this.lstReportType = [];
                        this.lstReportType.push({ label: "Select One", value: '' });
                        this.lstPrinterType = [{ label: 'Select Printer Type', value: '' }, { label: 'Stationary', value: '1' }];
                        this.lstHeaderRows = [{ label: '1', value: '1' }, { label: '2', value: '2' }, { label: '3', value: '3' }, { label: '4', value: '4' }, { label: '5', value: '5' }, { label: '6', value: '6' }];
                        this.lstHeaderColumns = [{ label: '1', value: '1' }, { label: '2', value: '2' }, { label: '3', value: '3' }, { label: '4', value: '4' }, { label: '5', value: '5' }];
                        this.lstDetailsColumns = [{ label: '1', value: '1' }, { label: '2', value: '2' }, { label: '3', value: '3' }, { label: '4', value: '4' }, { label: '5', value: '5' }, { label: '6', value: '6' },
                            { label: '7', value: '7' }, { label: '8', value: '8' }, { label: '9', value: '9' }, { label: '10', value: '10' }, { label: '11', value: '11' }];
                        this.lstPrintRepdetailslist7 = new Array();
                        this.lstPrintRepValueFont = [];
                        this.lstPrintRepHeaderFont = [];
                        this.lstPrintRepHeaderColumnsRight = [];
                        this.lstPrintRepDetailColumnsRight = [];
                        this.lstPrintRepDetailColumnsMain = [];
                        this.lstPrintRepHeaderColumnsMain = [];
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        this.displayCatchException(ex_1, "ngOnInit");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    StationaryPrintDesign.prototype.ngAfterViewInit = function () {
    };
    StationaryPrintDesign.prototype.ngAfterContentInit = function () {
    };
    /**
     getting Products details when page Load from database
     */
    StationaryPrintDesign.prototype.getProductDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.printScreenService.getDynamicPrintProducts(this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID])
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                var products = data.DataList;
                                for (var i = 0; i < products.length; i++) {
                                    _this.lstProduct.push({ label: products[i].APP_NAME, value: products[i].APP_ID });
                                }
                                _this.spinnerService.stop();
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_2 = _a.sent();
                        this.displayCatchException(ex_2, "getProductDetails");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Change Event for dropdown report type
     */
    StationaryPrintDesign.prototype.ddlSelectChangeReport = function (event) {
        this.growlMessage = [];
        this.report = event.value;
        this.reportValue = event.label;
    };
    /**
    * Change Event for dropdown Product and based on product getting report types
    */
    StationaryPrintDesign.prototype.ddlSelectChangeProduct = function (event) {
        var _this = this;
        this.showDiv = false;
        this.report = '';
        this.growlMessage = [];
        this.productValue = event.label;
        this.product = event.value;
        this.lstReportType = [];
        this.lstReportType.push({ label: "Select One", value: '' });
        try {
            if (this.product != "") {
                this.printScreenService.getDynamicPrintReportTypes(this.product)
                    .catch(this.httpService.handleError).then(function (res) {
                    var data = res.json();
                    var products = data.DataList;
                    for (var i = 0; i < products.length; i++) {
                        _this.lstReportType.push({ label: products[i], value: products[i] });
                    }
                });
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "ddlSelectChangeProduct");
        }
    };
    /**
    * Change Event for dropdown printer type
    */
    StationaryPrintDesign.prototype.ddlSelectChangePrinter = function (event) {
        this.growlMessage = [];
        this.printer = event.value;
        this.printerValue = event.label;
    };
    /**
     * Event for getting data from database based on selection of product,printer,Report when GetReports button Click event
     */
    StationaryPrintDesign.prototype.getReports = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var s, s, val, s, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        this.blnLayout = false;
                        if (this.product == null || this.product == "" || this.product == undefined) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Select Product' });
                            return [2 /*return*/];
                        }
                        if (this.printer == null || this.printer == "" || this.printer == undefined) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Select Printer Type' });
                            return [2 /*return*/];
                        }
                        if (this.report == null || this.report == "" || this.report == undefined) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Select Report Type' });
                            return [2 /*return*/];
                        }
                        if (!((this.product != null || this.product != "" || this.product != undefined) && (this.printer != null || this.printer != "" || this.printer != undefined) && (this.report != null || this.report != "" || this.report != undefined))) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.bindData()];
                    case 2:
                        _a.sent();
                        this.strMsg1 = "";
                        this.strMsg2 = "";
                        this.strMsg3 = "";
                        if (!(this.lstPrintRepHeaderColumnsMain.length > 0)) return [3 /*break*/, 4];
                        if (this.lstPrintRepHeaderColumnsRight.length > 0) {
                            this.intHdrRows = linq_es5_1.asEnumerable(this.lstPrintRepHeaderColumnsRight).Select(function (a) { return a.ROW_POSITION; }).Max();
                            this.intHdrColumns = linq_es5_1.asEnumerable(this.lstPrintRepHeaderColumnsRight).Select(function (a) { return a.COLUMN_POSITION; }).Max();
                        }
                        if (this.lstPrintRepDetailColumnsRight.length > 0) {
                            this.intDetColumns = linq_es5_1.asEnumerable(this.lstPrintRepDetailColumnsRight).Select(function (a) { return a.COLUMN_POSITION; }).Max();
                        }
                        if (this.intHdrRows > parseInt(this.headerRows)) {
                            this.strMsg1 = "No.of Header Rows";
                            this.blnLayout = true;
                            s = this.lstHeaderRows.filter(function (report) { return report.label === _this.intHdrRows; });
                            if (s != undefined && s != null) {
                                if (s.length < 0) { }
                                else {
                                    this.headerRows = this.intHdrRows;
                                }
                            }
                        }
                        if (this.intHdrColumns > parseInt(this.headerColumns)) {
                            this.blnLayout = true;
                            this.strMsg2 = (this.strMsg1.length > 0 ? ",No.of Header Columns" : "No.of Header Columns");
                            s = this.lstHeaderColumns.filter(function (report) { return (report.label) === _this.intHdrColumns.toString(); });
                            if (s != undefined && s != null && s.length > 0) {
                                val = parseInt(s[0].value);
                                if (val < 0) { }
                                else {
                                    this.headerColumns = this.intHdrColumns;
                                }
                            }
                            //else {
                            //    this.headerColumns = this.intHdrColumns;
                            //}
                        }
                        if (this.intDetColumns > parseInt(this.detailColumns)) {
                            this.blnLayout = true;
                            this.strMsg3 = "No.of Details Columns";
                            this.strMsg3 = ((this.strMsg1.length > 0 || this.strMsg2.length > 0) ? ",No.of Details Columns" : "No.of Details Columns");
                            s = this.lstDetailsColumns.filter(function (report) { return report.label === _this.intDetColumns; });
                            if (s != undefined && s != null) {
                                if (s.length < 0) { }
                                else {
                                    this.detailColumns = this.intDetColumns;
                                }
                            }
                        }
                        this.reBindData();
                        if (this.blnLayout == true) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Selected ' + this.strMsg1 + this.strMsg2 + this.strMsg3 + ' values  are less than Saved Design Format Rows/Columns. Report Design is binded with default Saved Values.  ' });
                        }
                        return [4 /*yield*/, this.bindSavedDataToHtmlTables()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Data Present' });
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        ex_3 = _a.sent();
                        this.displayCatchException(ex_3, "getReports");
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Binding data to tables
     */
    StationaryPrintDesign.prototype.bindData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.printScreenService.getDynamicReport(this.product, this.reportValue, this._deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID], this.printer)
                                .catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                _this.lstPrintRepHeaderColumnsMain = [];
                                _this.lstPrintRepDetailColumnsMain = [];
                                _this.lstPrintRepHeaderColumnsRight = [];
                                _this.lstPrintRepDetailColumnsRight = [];
                                _this.lstPrintRepHeaderFont = [];
                                _this.lstPrintRepValueFont = [];
                                _this.lstPrintRepHeaderColumnsMain = data.DataDictionary["list1"];
                                _this.lstPrintRepDetailColumnsMain = data.DataDictionary["list2"];
                                _this.lstPrintRepHeaderColumnsRight = data.DataDictionary["list3"];
                                _this.lstPrintRepDetailColumnsRight = data.DataDictionary["list4"];
                                _this.lstPrintRepHeaderFont = data.DataDictionary["list5"];
                                _this.lstPrintRepValueFont = data.DataDictionary["list6"];
                                _this.lstPrintRepdetailslist7 = _this.lstPrintRepHeaderColumnsMain;
                                _this.spinnerService.stop();
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_4 = _a.sent();
                        this.displayCatchException(ex_4, "bindData");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    StationaryPrintDesign.prototype.reBindData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var Hcolumn, x, x, x, x, listcount, x, item, y, fieldName, lineNo, displayName, TextValue, i, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        Hcolumn = '';
                        if (this.lstPrintRepHeaderFont.length > 0) {
                            this.headerFontName = this.lstPrintRepHeaderFont[0].HEADERFONT;
                            this.valueFontName = this.lstPrintRepHeaderFont[0].VALUEFONT;
                        }
                        if (this.headerFontName == null || this.headerFontName == '' || this.headerFontName == undefined) {
                            if (this.lstPrintRepValueFont.length > 0) {
                                this.headerFontName = this.lstPrintRepValueFont[0].HEADERFONT;
                            }
                        }
                        if (this.valueFontName == null || this.valueFontName == '' || this.valueFontName == undefined) {
                            if (this.lstPrintRepValueFont.length > 0) {
                                this.valueFontName = this.lstPrintRepValueFont[0].VALUEFONT;
                            }
                        }
                        if (this.headerFontName != null || this.headerFontName != '' || this.headerFontName != undefined) {
                            this.headerFont = this.headerFontName;
                        }
                        else {
                            this.headerFont = '';
                        }
                        if (this.valueFontName != null || this.valueFontName != '' || this.valueFontName != undefined) {
                            this.columnFont = this.valueFontName;
                        }
                        else {
                            this.columnFont = '';
                        }
                        this.showDiv = true;
                        this.headdetailcolumns = [];
                        for (x = 0; x < (this.lstPrintRepDetailColumnsMain.length); x++) {
                            this.headdetailcolumns.push(x);
                        }
                        this.detailColumnsheader = [];
                        for (x = 1; x <= parseInt(this.detailColumns); x++) {
                            this.detailColumnsheader.push(x);
                            if (this.lstPrintRepDetailColumnsRight.length < x) {
                                this.lstPrintRepDetailColumnsRight.push({
                                    APP_ID: "",
                                    OBJECT_ID: "",
                                    LINE_NO: lineNo,
                                    FIELD_NAME: "",
                                    FIELD_TYPE: "",
                                    TEXT_VALUE: "",
                                    FIELD_GROUP: "",
                                    ROW_POSITION: 1,
                                    COLUMN_POSITION: x,
                                    DISPLAY_NAME: "",
                                    VISIBLE: "",
                                    HColumn: "",
                                    FIELD_SIZE: "",
                                    ALIGNMENT: "",
                                    HEADERFONT: "",
                                    VALUEFONT: "",
                                    SECTION: ""
                                });
                                this.lstPrintRepDetailColumnsMain.push({
                                    APP_ID: "",
                                    OBJECT_ID: "",
                                    LINE_NO: lineNo,
                                    FIELD_NAME: "",
                                    FIELD_TYPE: "",
                                    TEXT_VALUE: "",
                                    FIELD_GROUP: "",
                                    ROW_POSITION: x,
                                    COLUMN_POSITION: 1,
                                    DISPLAY_NAME: "",
                                    VISIBLE: "",
                                    HColumn: "",
                                    FIELD_SIZE: "",
                                    ALIGNMENT: "",
                                    HEADERFONT: "",
                                    VALUEFONT: "",
                                    SECTION: ""
                                });
                            }
                        }
                        this.lstHeaderRowsCount = [];
                        this.lstHeaderColCount = [];
                        for (x = 1; x <= parseInt(this.headerRows); x++) {
                            this.lstHeaderRowsCount.push(x);
                        }
                        for (x = 1; x <= parseInt(this.headerColumns); x++) {
                            this.lstHeaderColCount.push(x);
                        }
                        this.headerColumnsList = [];
                        this.lstPrintRepHeaderColumnsLeft = [];
                        listcount = this.lstPrintRepHeaderColumnsMain.length * 2;
                        for (x = 0; x < listcount; x++) {
                            this.headerColumnsList.push(x);
                            item = parseInt((x / 2).toString());
                            y = x % 2;
                            fieldName = this.lstPrintRepHeaderColumnsMain[item].FIELD_NAME;
                            lineNo = this.lstPrintRepHeaderColumnsMain[item].LINE_NO;
                            displayName = this.lstPrintRepHeaderColumnsMain[item].DISPLAY_NAME;
                            if (y.toString() == "0") {
                                this.lstPrintRepHeaderColumnsMain[item].TEXT_VALUE = "TEXT";
                                TextValue = this.lstPrintRepHeaderColumnsMain[item].TEXT_VALUE;
                            }
                            else {
                                this.lstPrintRepHeaderColumnsMain[item].TEXT_VALUE = "VALUE";
                                TextValue = this.lstPrintRepHeaderColumnsMain[item].TEXT_VALUE;
                            }
                            if (this.lstPrintRepHeaderColumnsMain[item].TEXT_VALUE == "VALUE") {
                                Hcolumn = '{Value}';
                                this.lstPrintRepHeaderColumnsMain[item].HColumn = Hcolumn;
                            }
                            else {
                                Hcolumn = '{Header}';
                                this.lstPrintRepHeaderColumnsMain[item].HColumn = Hcolumn;
                            }
                            this.lstPrintRepHeaderColumnsLeft.push({
                                APP_ID: "",
                                OBJECT_ID: "",
                                LINE_NO: lineNo,
                                FIELD_NAME: fieldName,
                                FIELD_TYPE: "",
                                TEXT_VALUE: TextValue,
                                FIELD_GROUP: "",
                                ROW_POSITION: x,
                                COLUMN_POSITION: 1,
                                DISPLAY_NAME: displayName,
                                VISIBLE: "",
                                HColumn: Hcolumn,
                                FIELD_SIZE: "",
                                ALIGNMENT: "",
                                HEADERFONT: "",
                                VALUEFONT: "",
                                SECTION: ""
                            });
                        }
                        if (this.lstPrintRepHeaderColumnsRight.length > 0) {
                            for (i = 0; i < this.lstPrintRepHeaderColumnsRight.length; i++) {
                                if (this.lstPrintRepHeaderColumnsRight[i].TEXT_VALUE == "VALUE") {
                                    Hcolumn = '{Value}';
                                    this.lstPrintRepHeaderColumnsRight[i].HColumn = Hcolumn;
                                }
                                else {
                                    Hcolumn = '{Header}';
                                    this.lstPrintRepHeaderColumnsRight[i].HColumn = Hcolumn;
                                }
                            }
                        }
                        this.lstHeaderFont = [];
                        return [4 /*yield*/, this.printScreenService.getDynamicFonts()
                                .catch(this.httpService.handleError).then(function (res) {
                                var data1 = res.json();
                                var lstdata = [];
                                lstdata = data1.DataList;
                                _this.lstHeaderFont.push({ label: 'Select Font', value: '' });
                                for (var i = 0; i < lstdata.length; i++) {
                                    _this.lstHeaderFont.push({ label: lstdata[i], value: lstdata[i] });
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_5 = _a.sent();
                        this.displayCatchException(ex_5, "reBindData");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * Drag Start event
    */
    StationaryPrintDesign.prototype.dragStart = function (event, row, col, list) {
        this.selectedItem = list.filter(function (x) { return (x.ROW_POSITION == row) && (x.COLUMN_POSITION == col); })[0];
        if (this.selectedItem.DISPLAY_NAME == "") {
            return;
        }
    };
    /**
    * Drop Event: drag from right Header Columns table and drop into left side header Columns and drop within the left side header columns
    */
    StationaryPrintDesign.prototype.onDropHeaderLeft = function (event, row, col) {
        var _this = this;
        try {
            var newindex;
            if (this.selectedItem.DISPLAY_NAME == "") {
                return;
            }
            if (this.selectedItem) {
                var draggedItem = this.lstPrintRepHeaderColumnsLeft.filter(function (x) { return (x.DISPLAY_NAME + '-' + x.HColumn) == (_this.selectedItem.DISPLAY_NAME + '-' + _this.selectedItem.HColumn); });
                if (draggedItem.length == 0) {
                    var droppedItem_1;
                    droppedItem_1 = this.lstPrintRepHeaderColumnsLeft.filter(function (x) { return (x.ROW_POSITION == row) && (x.COLUMN_POSITION == col); });
                    var index = this.findIndex(this.selectedItem, this.lstPrintRepHeaderColumnsRight, this.selectedItem.ROW_POSITION, this.selectedItem.COLUMN_POSITION);
                    if (droppedItem_1.length > 0) {
                        newindex = this.findIndex((droppedItem_1), this.lstPrintRepHeaderColumnsLeft, droppedItem_1[0].ROW_POSITION, droppedItem_1[0].COLUMN_POSITION);
                        this.lstPrintRepHeaderColumnsRight[index] = droppedItem_1[0];
                    }
                    else {
                        this.lstPrintRepHeaderColumnsLeft[index] = "";
                    }
                    this.lstPrintRepHeaderColumnsRight[index].ROW_POSITION = this.selectedItem.ROW_POSITION;
                    this.lstPrintRepHeaderColumnsRight[index].COLUMN_POSITION = this.selectedItem.COLUMN_POSITION;
                    this.lstPrintRepHeaderColumnsLeft[newindex] = this.selectedItem;
                    this.lstPrintRepHeaderColumnsLeft[newindex].ROW_POSITION = row;
                    this.lstPrintRepHeaderColumnsLeft[newindex].COLUMN_POSITION = col;
                }
                else {
                    var droppedItem = this.lstPrintRepHeaderColumnsLeft.filter(function (x) { return (x.ROW_POSITION == row) && (x.COLUMN_POSITION == col); });
                    var index = this.findIndex(this.selectedItem, this.lstPrintRepHeaderColumnsLeft, this.selectedItem.ROW_POSITION, this.selectedItem.COLUMN_POSITION);
                    if (droppedItem.length > 0) {
                        newindex = this.findIndex((droppedItem), this.lstPrintRepHeaderColumnsLeft, droppedItem[0].ROW_POSITION, droppedItem[0].COLUMN_POSITION);
                        this.lstPrintRepHeaderColumnsLeft[index] = droppedItem[0];
                    }
                    else {
                        this.lstPrintRepHeaderColumnsLeft[index] = "";
                    }
                    this.lstPrintRepHeaderColumnsLeft[index].ROW_POSITION = this.selectedItem.ROW_POSITION;
                    this.lstPrintRepHeaderColumnsLeft[index].COLUMN_POSITION = this.selectedItem.COLUMN_POSITION;
                    this.lstPrintRepHeaderColumnsLeft[newindex] = this.selectedItem;
                    this.lstPrintRepHeaderColumnsLeft[newindex].ROW_POSITION = row;
                    this.lstPrintRepHeaderColumnsLeft[newindex].COLUMN_POSITION = col;
                }
                this.selectedItem = null;
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "onDropHeaderLeft");
        }
    };
    /**
    * Drop Event: drag from left Header Columns table and drop into right side header Columns and drop within the right side header columns
    */
    StationaryPrintDesign.prototype.onDropHeaderRight = function (event, row, col) {
        var _this = this;
        try {
            if (this.selectedItem.DISPLAY_NAME == "") {
                return;
            }
            var newindex;
            if (this.selectedItem) {
                var draggedItem = this.lstPrintRepHeaderColumnsLeft.filter(function (x) { return (x.DISPLAY_NAME + '-' + x.HColumn) == (_this.selectedItem.DISPLAY_NAME + '-' + _this.selectedItem.HColumn); }) && (this.lstPrintRepHeaderColumnsRight.filter(function (x) { return (x.DISPLAY_NAME + '-' + x.HColumn) == (_this.selectedItem.DISPLAY_NAME + '-' + _this.selectedItem.HColumn); }));
                if (draggedItem.length == 0) {
                    if (draggedItem.length == 0) {
                        var droppedItem_2;
                        droppedItem_2 = this.lstPrintRepHeaderColumnsRight.filter(function (x) { return (x.ROW_POSITION == row) && (x.COLUMN_POSITION == col); });
                        var index = this.findIndex(this.selectedItem, this.lstPrintRepHeaderColumnsLeft, this.selectedItem.ROW_POSITION, this.selectedItem.COLUMN_POSITION);
                        if (droppedItem_2.length > 0) {
                            newindex = this.findIndex((droppedItem_2), this.lstPrintRepHeaderColumnsRight, droppedItem_2[0].ROW_POSITION, droppedItem_2[0].COLUMN_POSITION);
                            this.lstPrintRepHeaderColumnsLeft[index] = droppedItem_2[0];
                        }
                        else {
                            this.lstPrintRepHeaderColumnsLeft[index] = "";
                        }
                        this.lstPrintRepHeaderColumnsLeft[index].ROW_POSITION = this.selectedItem.ROW_POSITION;
                        this.lstPrintRepHeaderColumnsLeft[index].COLUMN_POSITION = this.selectedItem.COLUMN_POSITION;
                        this.lstPrintRepHeaderColumnsRight[newindex] = this.selectedItem;
                        this.lstPrintRepHeaderColumnsRight[newindex].ROW_POSITION = row;
                        this.lstPrintRepHeaderColumnsRight[newindex].COLUMN_POSITION = col;
                    }
                }
                else {
                    var droppedItem = this.lstPrintRepHeaderColumnsRight.filter(function (x) { return (x.ROW_POSITION == row) && (x.COLUMN_POSITION == col); });
                    var index = this.findIndex(this.selectedItem, this.lstPrintRepHeaderColumnsRight, this.selectedItem.ROW_POSITION, this.selectedItem.COLUMN_POSITION);
                    if (droppedItem.length > 0) {
                        newindex = this.findIndex((droppedItem), this.lstPrintRepHeaderColumnsRight, droppedItem[0].ROW_POSITION, droppedItem[0].COLUMN_POSITION);
                        this.lstPrintRepHeaderColumnsRight[index] = droppedItem[0];
                    }
                    else {
                        this.lstPrintRepHeaderColumnsLeft[index] = "";
                    }
                    this.lstPrintRepHeaderColumnsRight[index].ROW_POSITION = this.selectedItem.ROW_POSITION;
                    this.lstPrintRepHeaderColumnsRight[index].COLUMN_POSITION = this.selectedItem.COLUMN_POSITION;
                    this.lstPrintRepHeaderColumnsRight[newindex] = this.selectedItem;
                    this.lstPrintRepHeaderColumnsRight[newindex].ROW_POSITION = row;
                    this.lstPrintRepHeaderColumnsRight[newindex].COLUMN_POSITION = col;
                }
                this.selectedItem = null;
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "onDropHeaderRight");
        }
    };
    /**
    * Drop Event: drag from right Details Columns table and drop into left side Details Columns and drop within the left side details columns
    */
    StationaryPrintDesign.prototype.onDropDetailsLeft = function (event, row, col) {
        var _this = this;
        try {
            if (this.selectedItem.DISPLAY_NAME == "") {
                return;
            }
            var newindex;
            if (this.selectedItem) {
                var draggedItem = this.lstPrintRepDetailColumnsMain.filter(function (x) { return (x.DISPLAY_NAME) == (_this.selectedItem.DISPLAY_NAME); });
                if (draggedItem.length == 0) {
                    var droppedItem = this.lstPrintRepDetailColumnsMain.filter(function (x) { return (x.ROW_POSITION == row) && (x.COLUMN_POSITION == col); });
                    var index = this.findIndex(this.selectedItem, this.lstPrintRepDetailColumnsRight, this.selectedItem.ROW_POSITION, this.selectedItem.COLUMN_POSITION);
                    if (droppedItem.length > 0) {
                        newindex = this.findIndex((droppedItem), this.lstPrintRepDetailColumnsMain, droppedItem[0].ROW_POSITION, droppedItem[0].COLUMN_POSITION);
                        this.lstPrintRepDetailColumnsRight[index] = droppedItem[0];
                    }
                    else {
                        this.lstPrintRepDetailColumnsMain[index] = "";
                    }
                    this.lstPrintRepDetailColumnsRight[index].ROW_POSITION = this.selectedItem.ROW_POSITION;
                    this.lstPrintRepDetailColumnsRight[index].COLUMN_POSITION = this.selectedItem.COLUMN_POSITION;
                    this.lstPrintRepDetailColumnsMain[newindex] = this.selectedItem;
                    this.lstPrintRepDetailColumnsMain[newindex].ROW_POSITION = row;
                    this.lstPrintRepDetailColumnsMain[newindex].COLUMN_POSITION = col;
                }
                else {
                    var droppedItem = this.lstPrintRepDetailColumnsMain.filter(function (x) { return (x.ROW_POSITION == row) && (x.COLUMN_POSITION == col); });
                    var index = this.findIndex(this.selectedItem, this.lstPrintRepDetailColumnsMain, this.selectedItem.ROW_POSITION, this.selectedItem.COLUMN_POSITION);
                    if (droppedItem.length > 0) {
                        newindex = this.findIndex((droppedItem), this.lstPrintRepDetailColumnsMain, droppedItem[0].ROW_POSITION, droppedItem[0].COLUMN_POSITION);
                        this.lstPrintRepDetailColumnsMain[index] = droppedItem[0];
                    }
                    else {
                        this.lstPrintRepDetailColumnsMain[index] = "";
                    }
                    this.lstPrintRepDetailColumnsMain[index].ROW_POSITION = this.selectedItem.ROW_POSITION;
                    this.lstPrintRepDetailColumnsMain[index].COLUMN_POSITION = this.selectedItem.COLUMN_POSITION;
                    this.lstPrintRepDetailColumnsMain[newindex] = this.selectedItem;
                    this.lstPrintRepDetailColumnsMain[newindex].ROW_POSITION = row;
                    this.lstPrintRepDetailColumnsMain[newindex].COLUMN_POSITION = col;
                }
                this.selectedItem = null;
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "onDropDetailsLeft");
        }
    };
    /**
    * Drop Event: drag from left Details Columns table and drop into right side details Columns and drop within the right side Details columns
    */
    StationaryPrintDesign.prototype.onDropDetailsRight = function (event, row, col) {
        var _this = this;
        try {
            if (this.selectedItem.DISPLAY_NAME == "") {
                return;
            }
            var newindex;
            if (this.selectedItem) {
                var draggedItem = this.lstPrintRepDetailColumnsMain.filter(function (x) { return (x.DISPLAY_NAME) == (_this.selectedItem.DISPLAY_NAME); }) && (this.lstPrintRepDetailColumnsRight.filter(function (x) { return (x.DISPLAY_NAME) == (_this.selectedItem.DISPLAY_NAME); }));
                var draggedItem1 = this.lstPrintRepDetailColumnsRight.filter(function (x) { return (x.DISPLAY_NAME) == (_this.selectedItem.DISPLAY_NAME); });
                if (draggedItem.length == 0) {
                    var droppedItem = this.lstPrintRepDetailColumnsRight.filter(function (x) { return (x.ROW_POSITION == row) && (x.COLUMN_POSITION == col); });
                    var index = this.findIndex(this.selectedItem, this.lstPrintRepDetailColumnsMain, this.selectedItem.ROW_POSITION, this.selectedItem.COLUMN_POSITION);
                    if (droppedItem.length > 0) {
                        newindex = this.findIndex((droppedItem), this.lstPrintRepDetailColumnsRight, droppedItem[0].ROW_POSITION, droppedItem[0].COLUMN_POSITION);
                        this.lstPrintRepDetailColumnsMain[index] = droppedItem[0];
                    }
                    else {
                        this.lstPrintRepDetailColumnsRight[index] = "";
                    }
                    this.lstPrintRepDetailColumnsMain[index].ROW_POSITION = this.selectedItem.ROW_POSITION;
                    this.lstPrintRepDetailColumnsMain[index].COLUMN_POSITION = this.selectedItem.COLUMN_POSITION;
                    this.lstPrintRepDetailColumnsRight[newindex] = this.selectedItem;
                    this.lstPrintRepDetailColumnsRight[newindex].ROW_POSITION = row;
                    this.lstPrintRepDetailColumnsRight[newindex].COLUMN_POSITION = col;
                }
                else {
                    var droppedItem = this.lstPrintRepDetailColumnsRight.filter(function (x) { return (x.ROW_POSITION == row) && (x.COLUMN_POSITION == col); });
                    var index = this.findIndex(this.selectedItem, this.lstPrintRepDetailColumnsRight, this.selectedItem.ROW_POSITION, this.selectedItem.COLUMN_POSITION);
                    if (droppedItem.length > 0) {
                        newindex = this.findIndex((droppedItem), this.lstPrintRepDetailColumnsRight, droppedItem[0].ROW_POSITION, droppedItem[0].COLUMN_POSITION);
                        this.lstPrintRepDetailColumnsRight[index] = droppedItem[0];
                    }
                    else {
                        this.lstPrintRepDetailColumnsRight[index] = "";
                    }
                    this.lstPrintRepDetailColumnsRight[index].ROW_POSITION = this.selectedItem.ROW_POSITION;
                    this.lstPrintRepDetailColumnsRight[index].COLUMN_POSITION = this.selectedItem.COLUMN_POSITION;
                    this.lstPrintRepDetailColumnsRight[newindex] = this.selectedItem;
                    this.lstPrintRepDetailColumnsRight[newindex].ROW_POSITION = row;
                    this.lstPrintRepDetailColumnsRight[newindex].COLUMN_POSITION = col;
                }
                this.selectedItem = null;
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "onDropDetailsRight");
        }
    };
    /**
     * Drag end event
     */
    StationaryPrintDesign.prototype.dragEnd = function (event) {
        this.selectedItem = null;
    };
    /**
     * Finding index of a list item based on row, col position
     */
    StationaryPrintDesign.prototype.findIndex = function (list, list1, row, col) {
        try {
            var index = -1;
            var name_1;
            for (var i = 0; i < list1.length; i++) {
                if ((list1[i].ROW_POSITION == row) && (list1[i].COLUMN_POSITION == col)) {
                    this.newIndexValue = list1[i];
                    index = i;
                    break;
                }
            }
            return index;
        }
        catch (ex) {
            this.displayCatchException(ex, "findIndex");
        }
    };
    /**
    Function for binding data to right side Header Columns table
    */
    StationaryPrintDesign.prototype.getRowCalHeader = function (row, col) {
        try {
            var listrowcol = this.lstPrintRepHeaderColumnsRight.filter(function (x) { return x.ROW_POSITION == row && x.COLUMN_POSITION == col; });
            if (listrowcol != null && listrowcol.length > 0) {
                if (listrowcol[0].DISPLAY_NAME == null || listrowcol[0].DISPLAY_NAME == "" || listrowcol[0].DISPLAY_NAME == undefined) {
                    return '';
                }
                if (listrowcol[0].DISPLAY_NAME != null || listrowcol[0].DISPLAY_NAME != "" || listrowcol[0].DISPLAY_NAME != undefined) {
                    return listrowcol[0].DISPLAY_NAME + '-' + listrowcol[0].HColumn;
                }
            }
            else {
                this.lstPrintRepHeaderColumnsRight.push({
                    APP_ID: "",
                    OBJECT_ID: "",
                    LINE_NO: "",
                    FIELD_NAME: "",
                    FIELD_TYPE: "",
                    TEXT_VALUE: "",
                    FIELD_GROUP: "",
                    ROW_POSITION: row,
                    COLUMN_POSITION: col,
                    DISPLAY_NAME: "",
                    VISIBLE: "",
                    FIELD_SIZE: "",
                    ALIGNMENT: "",
                    HColumn: "",
                    HEADERFONT: "",
                    VALUEFONT: "",
                    SECTION: ""
                });
                return '';
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "getRowCalHeader");
        }
    };
    /**
   Function for returning true or false value for checking if product is point of use
    */
    StationaryPrintDesign.prototype.isDraggableCheck = function (row, col, list) {
        try {
            var item = list.filter(function (x) { return x.ROW_POSITION == row && x.COLUMN_POSITION == col; });
            if (this.product == AtParEnums_2.EnumApps.PointOfUse) {
                if (item != undefined && item.length > 0) {
                    var fieldName = item[0].FIELD_NAME;
                    if (fieldName == "PHYSICIAN_NAME" || fieldName == "PROCEDURE_CODE" || fieldName == "PREF_LIST_ID") {
                        return false;
                    }
                    else {
                        if (item.length > 0) {
                            if (item[0].DISPLAY_NAME == null || item[0].DISPLAY_NAME == "" || item[0].DISPLAY_NAME == undefined) {
                                return false;
                            }
                            if (item[0].DISPLAY_NAME != null || item[0].DISPLAY_NAME != "" || item[0].DISPLAY_NAME != undefined) {
                                return true;
                            }
                        }
                    }
                }
                else {
                    return true;
                }
            }
            else {
                if (item.length > 0) {
                    if (item[0].DISPLAY_NAME == null || item[0].DISPLAY_NAME == "" || item[0].DISPLAY_NAME == undefined) {
                        return false;
                    }
                    if (item[0].DISPLAY_NAME != null || item[0].DISPLAY_NAME != "" || item[0].DISPLAY_NAME != undefined) {
                        return true;
                    }
                }
                else {
                    return false;
                }
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "isDraggableCheck");
        }
    };
    /**
    Function for binding data to right side Details Columns table
     */
    StationaryPrintDesign.prototype.getRowCalDetails = function (row, col) {
        try {
            var listrowcol = this.lstPrintRepDetailColumnsRight.filter(function (x) { return x.ROW_POSITION == row && x.COLUMN_POSITION == col; });
            if (listrowcol != null && listrowcol.length > 0) {
                return listrowcol[0].DISPLAY_NAME;
            }
            else {
                this.lstPrintRepDetailColumnsRight.push({
                    APP_ID: "",
                    OBJECT_ID: "",
                    LINE_NO: "",
                    FIELD_NAME: "",
                    FIELD_TYPE: "",
                    TEXT_VALUE: "",
                    FIELD_GROUP: "",
                    ROW_POSITION: row,
                    COLUMN_POSITION: col,
                    DISPLAY_NAME: "",
                    VISIBLE: "",
                    FIELD_SIZE: "",
                    ALIGNMENT: "",
                    Hcolumn: "",
                    HEADERFONT: "",
                    VALUEFONT: "",
                    SECTION: ""
                });
                return '';
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "getRowCalDetails");
        }
    };
    /**
    Function for binding data to left side Header Columns table
     */
    StationaryPrintDesign.prototype.bindHeaderRows = function (item, col) {
        try {
            var fieldName = this.lstPrintRepHeaderColumnsLeft[item].FIELD_NAME;
            var lineNo = this.lstPrintRepHeaderColumnsLeft[item].LINE_NO;
            var displayName = this.lstPrintRepHeaderColumnsLeft[item].DISPLAY_NAME;
            var HColumn = this.lstPrintRepHeaderColumnsLeft[item].HColumn; // "{Header}";
            var txtValue = this.lstPrintRepHeaderColumnsLeft[item].TEXT_VALUE;
            var section = this.lstPrintRepHeaderColumnsLeft[item].SECTION;
            var hColumnExsists = this.repColumnBinded(fieldName, lineNo, txtValue, "HEADER");
            if (hColumnExsists) {
                this.lstPrintRepHeaderColumnsLeft[item].ROW_POSITION = item;
                this.lstPrintRepHeaderColumnsLeft[item].COLUMN_POSITION = col;
                this.lstPrintRepHeaderColumnsLeft[item].HColumn = "";
                this.lstPrintRepHeaderColumnsLeft[item].OBJECT_ID = "";
                this.lstPrintRepHeaderColumnsLeft[item].LINE_NO = lineNo;
                this.lstPrintRepHeaderColumnsLeft[item].APP_ID = "";
                this.lstPrintRepHeaderColumnsLeft[item].FIELD_NAME = fieldName;
                this.lstPrintRepHeaderColumnsLeft[item].FIELD_TYPE = "";
                this.lstPrintRepHeaderColumnsLeft[item].TEXT_VALUE = txtValue;
                this.lstPrintRepHeaderColumnsLeft[item].FIELD_GROUP = "";
                this.lstPrintRepHeaderColumnsLeft[item].FIELD_SIZE = "";
                this.lstPrintRepHeaderColumnsLeft[item].VISIBLE = "";
                this.lstPrintRepHeaderColumnsLeft[item].DISPLAY_NAME = "";
                this.lstPrintRepHeaderColumnsLeft[item].ALIGNMENT = "";
                this.lstPrintRepHeaderColumnsLeft[item].HEADERFONT = "";
                this.lstPrintRepHeaderColumnsLeft[item].VALUEFONT = "";
                this.lstPrintRepHeaderColumnsLeft[item].SECTION = section;
                return '';
            }
            else {
                this.lstPrintRepHeaderColumnsLeft[item].ROW_POSITION = item;
                this.lstPrintRepHeaderColumnsLeft[item].COLUMN_POSITION = col;
                this.lstPrintRepHeaderColumnsLeft[item].HColumn = HColumn;
                this.lstPrintRepHeaderColumnsLeft[item].OBJECT_ID = "";
                this.lstPrintRepHeaderColumnsLeft[item].LINE_NO = lineNo;
                this.lstPrintRepHeaderColumnsLeft[item].APP_ID = "";
                this.lstPrintRepHeaderColumnsLeft[item].FIELD_NAME = fieldName;
                this.lstPrintRepHeaderColumnsLeft[item].FIELD_TYPE = "";
                this.lstPrintRepHeaderColumnsLeft[item].TEXT_VALUE = txtValue;
                this.lstPrintRepHeaderColumnsLeft[item].FIELD_GROUP = "";
                this.lstPrintRepHeaderColumnsLeft[item].FIELD_SIZE = "";
                this.lstPrintRepHeaderColumnsLeft[item].VISIBLE = "";
                this.lstPrintRepHeaderColumnsLeft[item].DISPLAY_NAME = displayName;
                this.lstPrintRepHeaderColumnsLeft[item].ALIGNMENT = "";
                this.lstPrintRepHeaderColumnsLeft[item].HEADERFONT = "";
                this.lstPrintRepHeaderColumnsLeft[item].VALUEFONT = "";
                this.lstPrintRepHeaderColumnsLeft[item].SECTION = section;
                if (displayName == "") {
                    return '';
                }
                else {
                    return displayName + "-" + HColumn;
                }
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "bindHeaderRows");
        }
    };
    /**
    Function for binding data to left side Details Columns table
     */
    StationaryPrintDesign.prototype.bindDetailsRows = function (item, col) {
        try {
            var x = item;
            var fieldName = this.lstPrintRepDetailColumnsMain[x].FIELD_NAME;
            var lineNo = this.lstPrintRepDetailColumnsMain[x].LINE_NO;
            var displayName = this.lstPrintRepDetailColumnsMain[x].DISPLAY_NAME;
            var hColumnExsists = this.repColumnDeatilsBinded(fieldName, lineNo, "VALUE", "DETAILS");
            if (hColumnExsists) {
                this.lstPrintRepDetailColumnsMain[x].ROW_POSITION = item + 1;
                this.lstPrintRepDetailColumnsMain[x].COLUMN_POSITION = col;
                this.lstPrintRepDetailColumnsMain[x].OBJECT_ID = "";
                this.lstPrintRepDetailColumnsMain[x].LINE_NO = "";
                this.lstPrintRepDetailColumnsMain[x].APP_ID = "";
                this.lstPrintRepDetailColumnsMain[x].FIELD_NAME = "";
                this.lstPrintRepDetailColumnsMain[x].FIELD_TYPE = "";
                this.lstPrintRepDetailColumnsMain[x].TEXT_VALUE = "";
                this.lstPrintRepDetailColumnsMain[x].FIELD_GROUP = "";
                this.lstPrintRepDetailColumnsMain[x].FIELD_SIZE = "";
                this.lstPrintRepDetailColumnsMain[x].VISIBLE = "";
                this.lstPrintRepDetailColumnsMain[x].DISPLAY_NAME = "";
                this.lstPrintRepDetailColumnsMain[x].ALIGNMENT = "";
                this.lstPrintRepDetailColumnsMain[x].HEADERFONT = "";
                this.lstPrintRepDetailColumnsMain[x].VALUEFONT = "";
                this.lstPrintRepDetailColumnsMain[x].SECTION = "";
                this.lstPrintRepDetailColumnsMain[x].HColumn = "";
                return '';
            }
            else {
                this.lstPrintRepDetailColumnsMain[x].ROW_POSITION = item + 1;
                this.lstPrintRepDetailColumnsMain[x].COLUMN_POSITION = col;
                this.lstPrintRepDetailColumnsMain[x].HEADERFONT = "";
                this.lstPrintRepDetailColumnsMain[x].VALUEFONT = "";
                return displayName;
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "bindDetailsRows");
        }
    };
    /**
    Function for filtering data from  right side header Columns table based on fieldname,lineno,textvalue,section
    section:'HEADER'
    TextValue:'TEXT'or 'VALUE'
    lineNo:21
    filedName:END_DT_TIME
     */
    StationaryPrintDesign.prototype.repColumnBinded = function (fieldName, lineNo, TextValue, Section) {
        try {
            var listrowcol = this.lstPrintRepHeaderColumnsRight.filter(function (x) { return x.FIELD_NAME == fieldName && x.TEXT_VALUE == TextValue && x.LINE_NO == lineNo && x.SECTION == Section; });
            if (listrowcol != null && listrowcol.length > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "repColumnBinded");
        }
    };
    /**
    Function for filtering data from  right side Details Columns table based on fieldname,lineno,textvalue,section
    section:'DEATILS'
    TextValue:'TEXT'or 'VALUE'
    lineNo:21
    filedName:OpenQuantity
    */
    StationaryPrintDesign.prototype.repColumnDeatilsBinded = function (fieldName, lineNo, TextValue, Section) {
        try {
            var listrowcol = this.lstPrintRepDetailColumnsRight.filter(function (x) { return x.FIELD_NAME == fieldName && x.TEXT_VALUE == TextValue && x.LINE_NO == lineNo && x.SECTION == Section; });
            if (listrowcol != null && listrowcol.length > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "repColumnDeatilsBinded");
        }
    };
    /**
    Function for Save Print details to database
     */
    StationaryPrintDesign.prototype.saveDesign = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var x, index, x, index, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        this.spinnerService.start();
                        if (this.headerFont == null || this.headerFont == "" || this.headerFont == undefined) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Select Header Font' });
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        if (this.columnFont == null || this.columnFont == "" || this.columnFont == undefined) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Select Value Font' });
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        this.lstPrintSavedRepdetails = [];
                        //list3 and list4 need to save
                        //inserting Header column data to Main List
                        for (x = 0; x < this.lstPrintRepHeaderColumnsRight.length; x++) {
                            if (this.lstPrintRepHeaderColumnsRight[x].DISPLAY_NAME != "" && this.lstPrintRepHeaderColumnsRight[x].DISPLAY_NAME != null && this.lstPrintRepHeaderColumnsRight[x].DISPLAY_NAME != "-") {
                                this.lstPrintSavedRepdetails.push(this.lstPrintRepHeaderColumnsRight[x]);
                                index = this.findIndexSave((this.lstPrintRepHeaderColumnsRight[x]), this.lstPrintRepHeaderColumnsRight[x].DISPLAY_NAME + '-' + this.lstPrintRepHeaderColumnsRight[x].HColumn, this.lstPrintSavedRepdetails);
                                this.lstPrintRepHeaderColumnsRight[index].HEADERFONT = this.headerFont;
                                this.lstPrintRepHeaderColumnsRight[index].VALUEFONT = this.columnFont;
                            }
                        }
                        //inserting detals Column data to Main List
                        for (x = 0; x < this.lstPrintRepDetailColumnsRight.length; x++) {
                            if (this.lstPrintRepDetailColumnsRight[x].DISPLAY_NAME != "" && this.lstPrintRepDetailColumnsRight[x].DISPLAY_NAME != null && this.lstPrintRepDetailColumnsRight[x].DISPLAY_NAME != "-") {
                                this.lstPrintSavedRepdetails.push(this.lstPrintRepDetailColumnsRight[x]);
                                index = this.findIndexSave((this.lstPrintRepDetailColumnsRight[x]), this.lstPrintRepDetailColumnsRight[x].DISPLAY_NAME + '-' + this.lstPrintRepDetailColumnsRight[x].HColumn, this.lstPrintSavedRepdetails);
                                this.lstPrintSavedRepdetails[index].HEADERFONT = this.headerFont;
                                this.lstPrintSavedRepdetails[index].VALUEFONT = this.columnFont;
                                this.lstPrintSavedRepdetails[index].TEXT_VALUE = "VALUE";
                            }
                        }
                        if (!((this.headerFontName != null || this.headerFontName != '' || this.headerFontName != undefined) && (this.valueFontName != null || this.valueFontName != '' || this.valueFontName != undefined))) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.printScreenService.saveDynamicPrintReport(this.product, this.report, this.printerValue, this.report, this.lstPrintSavedRepdetails).subscribe(function (res) {
                                _this.growlMessage = [];
                                switch (res.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        {
                                            _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Updated Successfully' });
                                            _this.spinnerService.stop();
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                        _this.spinnerService.stop();
                                        break;
                                    }
                                }
                                _this.showDiv = false;
                                _this.lstPrintRepValueFont = [];
                                _this.lstPrintRepHeaderFont = [];
                                _this.lstPrintRepHeaderColumnsRight = [];
                                _this.lstPrintRepDetailColumnsRight = [];
                                _this.lstPrintRepDetailColumnsMain = [];
                                _this.lstPrintRepHeaderColumnsMain = [];
                                _this.lstPrintRepHeaderColumnsLeft = [];
                                _this.lstPrintSavedRepdetails = [];
                                _this.spinnerService.stop();
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        ex_6 = _a.sent();
                        this.displayCatchException(ex_6, "saveDesign");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Finding index of a list item based on list when saving updating headerfont and value font )
     */
    StationaryPrintDesign.prototype.findIndexSave = function (list, name, list1) {
        try {
            var index = -1;
            var name1 = void 0;
            for (var i = 0; i < list1.length; i++) {
                var namelist = list1[i].DISPLAY_NAME + '-' + list1[i].HColumn;
                if (name === namelist) {
                    index = i;
                    break;
                }
            }
            return index;
        }
        catch (ex) {
            this.displayCatchException(ex, "findIndexSave");
        }
    };
    /**
    Function for Clear Data When Reset Button Click
    */
    StationaryPrintDesign.prototype.reset = function () {
        try {
            this.product = '';
            this.printer = '';
            this.report = '';
            this.showDiv = false;
            this.lstPrintRepValueFont = [];
            this.lstPrintRepHeaderFont = [];
            this.lstPrintRepHeaderColumnsRight = [];
            this.lstPrintRepDetailColumnsRight = [];
            this.lstPrintRepDetailColumnsMain = [];
            this.lstPrintRepHeaderColumnsMain = [];
            this.lstPrintRepHeaderColumnsLeft = [];
            this.lstPrintSavedRepdetails = [];
            this.headerFont = '';
            this.columnFont = '';
        }
        catch (ex) {
            this.displayCatchException(ex, "reset");
        }
    };
    StationaryPrintDesign.prototype.bindValueRows = function (item) {
        try {
            var fieldName = item.FIELD_NAME;
            var lineNo = item.LINE_NO;
            var displayName = item.DISPLAY_NAME;
            var hColumnExsists = this.repColumnBinded(fieldName, lineNo, "VALUE", "HEADER");
            if (hColumnExsists) {
                return '-';
            }
            else {
                return displayName + "-" + "{Value}";
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "bindValueRows");
        }
    };
    StationaryPrintDesign.prototype.bindSavedDataToHtmlTables = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.HdrRows = parseInt(this.headerRows);
                this.HdrCells = parseInt(this.headerColumns);
                this.DetailCells = parseInt(this.detailColumns);
                this.nOfColumns = (this.HdrCells, 10);
                this.nOfRows = (this.HdrRows, 10);
                return [2 /*return*/];
            });
        });
    };
    /**
     * This method is for displaying catch block error messages
     * @param event
     */
    StationaryPrintDesign.prototype.displayCatchException = function (ex, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, ex.toString(), funName, this.constructor.name);
    };
    /**
     * Destroy all data in this page when redirect
     */
    StationaryPrintDesign.prototype.ngOnDestroy = function () {
        this._deviceTokenEntry = [];
        this.growlMessage = [];
        this.product = '';
        this.printer = '';
        this.report = '';
        this.showDiv = false;
        this.lstPrintRepValueFont = [];
        this.lstPrintRepHeaderFont = [];
        this.lstPrintRepHeaderColumnsRight = [];
        this.lstPrintRepDetailColumnsRight = [];
        this.lstPrintRepDetailColumnsMain = [];
        this.lstPrintRepHeaderColumnsMain = [];
        this.lstPrintRepHeaderColumnsLeft = [];
        this.lstPrintSavedRepdetails = [];
        this.spinnerService.stop();
        this.spinnerService = null;
        this.headerFont = '';
        this.columnFont = '';
    };
    StationaryPrintDesign = __decorate([
        core_1.Component({
            templateUrl: 'atpar-stationary-print-design.component.html',
            providers: [atpar_stationary_print_design_service_1.PrintScreenService, HttpService_1.HttpService, AtParConstants_1.AtParConstants]
        }),
        __metadata("design:paramtypes", [leftbar_animation_service_1.LeftBarAnimationService,
            router_1.Router,
            router_1.ActivatedRoute,
            atpar_stationary_print_design_service_1.PrintScreenService,
            HttpService_1.HttpService,
            event_spinner_service_1.SpinnerService,
            AtParConstants_1.AtParConstants])
    ], StationaryPrintDesign);
    return StationaryPrintDesign;
}());
exports.StationaryPrintDesign = StationaryPrintDesign;
//# sourceMappingURL=atpar-stationary-print-design.component.js.map