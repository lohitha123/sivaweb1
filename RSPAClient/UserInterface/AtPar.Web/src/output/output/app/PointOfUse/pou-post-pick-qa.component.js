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
var HttpService_1 = require("../Shared/HttpService");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParEnums_2 = require("../Shared/AtParEnums");
var AtParConstants_1 = require("../Shared/AtParConstants");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var pou_post_pick_qa_service_1 = require("./pou-post-pick-qa.service");
var PostPickQAComponent = (function () {
    function PostPickQAComponent(spinnerService, atParCommonService, httpService, atParConstant, postPickQAService) {
        this.spinnerService = spinnerService;
        this.atParCommonService = atParCommonService;
        this.httpService = httpService;
        this.atParConstant = atParConstant;
        this.postPickQAService = postPickQAService;
        this.growlMessage = [];
        this.userFullName = '';
        this.chkReviewed = false;
        this.showGrid = false;
        this.blnisShortage = false;
        this.showItemGrid = false;
        this.editform = false;
        this.page = true;
        this.dynamicTable = '';
        this.lblPatient = '';
        this.lblCaseID = '';
        this.lblPerformDate = '';
        this.lstCaseItemsInfo = [];
        this.lstCaseforQA = [];
        this.lstDESCRS = [];
        this.lstITEMS = [];
        this.lstPostPick = [];
        this.lblPatientName = '';
        this.scndDynmTbl = '';
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
    }
    PostPickQAComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var defaultReportDuration, duration;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinnerService.start();
                        this.pageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                        return [4 /*yield*/, this.defaultReportDuration()];
                    case 1:
                        defaultReportDuration = _a.sent();
                        this.fromDate = new Date();
                        duration = this.fromDate.getDate() + defaultReportDuration;
                        this.toDate = new Date();
                        this.toDate.setDate(duration);
                        // this.toDate = await this.addDays(this.fromDate, defaultReport);
                        this.spinnerService.stop();
                        return [2 /*return*/];
                }
            });
        });
    };
    PostPickQAComponent.prototype.defaultReportDuration = function () {
        return __awaiter(this, void 0, void 0, function () {
            var defaultReport, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        defaultReport = 0;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this.atParCommonService.getMyPreferences("DEFAULT_REPORT_DURATION", this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID])
                                .then(function (result) {
                                var res = result.json();
                                if (res.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    defaultReport = res.DataVariable;
                                    return defaultReport;
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, defaultReport];
                    case 3:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, 'defaultReportDuration');
                        return [3 /*break*/, 5];
                    case 4:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PostPickQAComponent.prototype.addDays = function (theDate, days) {
        return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
    };
    PostPickQAComponent.prototype.convertDateFormate = function (strDate) {
        var date = new Date(strDate), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("/");
    };
    PostPickQAComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    PostPickQAComponent.prototype.validateSearchFields = function () {
        try {
            this.growlMessage = [];
            if (this.fromDate == null || this.fromDate.toString() == '' || this.toDate == null || this.toDate.toString() == '') {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please select a valid date range' });
                return false;
            }
            else if (Date.parse(this.fromDate.toString()) && Date.parse(this.toDate.toString())) {
                if (Date.parse(this.convertDateFormate(this.fromDate)) < Date.parse(this.convertDateFormate(new Date().toDateString()))) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "From Date should be greater than or equal to Today's Date" });
                    return false;
                }
                if (Date.parse(this.convertDateFormate(this.toDate)) < Date.parse(this.convertDateFormate(this.fromDate))) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "To Date should be greater than From Date" });
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
    PostPickQAComponent.prototype.ngAfterViewChecked = function () {
        // this.createBarcode('krane',2)
    };
    PostPickQAComponent.prototype.bindGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var status_1, fromDate, toDate, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        this.showGrid = false;
                        this.spinnerService.start();
                        return [4 /*yield*/, this.validateSearchFields()];
                    case 1:
                        status_1 = _a.sent();
                        if (!status_1) {
                            this.spinnerService.stop();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.convertDateFormate(this.fromDate)];
                    case 2:
                        fromDate = _a.sent();
                        return [4 /*yield*/, this.convertDateFormate(this.toDate)];
                    case 3:
                        toDate = _a.sent();
                        this.postPickQAService.getCasesforQA(fromDate, toDate, AtParEnums_1.Case_Review_Type.POST, '', '', '')
                            .catch(this.httpService.handleError)
                            .then(function (res) {
                            _this.spinnerService.stop();
                            var data = res.json();
                            switch (data.StatType) {
                                case AtParEnums_2.StatusType.Success: {
                                    //let jsbarcode = require('jsbarcode');
                                    _this.vmcaseDetails = data.Data;
                                    _this.lstPostPick = _this.vmcaseDetails.lstCaseInfo;
                                    _this.lstCaseforQA = _this.vmcaseDetails.lstCaseforQA;
                                    if (_this.lstPostPick.length == 0) {
                                        _this.showGrid = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Record Found" });
                                    }
                                    else {
                                        for (var index in _this.lstPostPick) {
                                            var changeDate = _this.lstPostPick[index].PERFORM_DATE;
                                            var dateStr = new Date(changeDate).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                                            _this.lstPostPick[index].PERFORM_DATE = dateStr.replace(',', '');
                                            var infoDetail = [];
                                            var childGrid = _this.lstCaseforQA.filter(function (a) { return a.CASE_ID == _this.lstPostPick[index].CASE_ID; });
                                            if (childGrid.length > 1) {
                                                _this.lstPostPick[index].isExpander = true;
                                                infoDetail = _this.lstCaseforQA.filter(function (x) { return x.CASE_ID == _this.lstPostPick[index].CASE_ID; });
                                                _this.lstPostPick[index].DETAILS = infoDetail;
                                            }
                                            else {
                                                _this.lstPostPick[index].isExpander = false;
                                            }
                                        }
                                        _this.showGrid = true;
                                    }
                                    break;
                                }
                                case AtParEnums_2.StatusType.Warn: {
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                    break;
                                }
                                case AtParEnums_2.StatusType.Error: {
                                    _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                    break;
                                }
                            }
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        ex_2 = _a.sent();
                        this.clientErrorMsg(ex_2, 'bindGrid');
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PostPickQAComponent.prototype.switch_Click = function () {
        if (this.chkReviewed) {
        }
        else {
        }
    };
    //For Details PopUP
    PostPickQAComponent.prototype.onPickDetailsClick = function (caseInfo, event) {
        return __awaiter(this, void 0, void 0, function () {
            var getDetailsBool, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //this.breadCrumbMenu.SUB_MENU_NAME = 'Case Details';
                        //this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        this.growlMessage = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        this.spinnerService.start();
                        this.getUserFullName();
                        return [4 /*yield*/, this.bindItemsGrid(caseInfo)
                            //let getDetailsBool: boolean = await this.Details_Load(caseInfo);
                        ];
                    case 2:
                        getDetailsBool = _a.sent();
                        //let getDetailsBool: boolean = await this.Details_Load(caseInfo);
                        if (getDetailsBool) {
                            this.editform = true;
                            this.page = false;
                            this.showGrid = false;
                            //this.showItemGrid = true;
                            //this.additem = false;
                        }
                        return [3 /*break*/, 5];
                    case 3:
                        ex_3 = _a.sent();
                        this.clientErrorMsg(ex_3, 'onPickDetailsClick');
                        return [3 /*break*/, 5];
                    case 4:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PostPickQAComponent.prototype.bindItemsGrid = function (caseInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var showDetails;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        showDetails = false;
                        this.spinnerService.start();
                        return [4 /*yield*/, this.postPickQAService.getPostPickQAItems(caseInfo.CASE_ID, AtParEnums_2.EnumApps.PointOfUse)
                                .catch(this.httpService.handleError)
                                .then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var data, _a, cartId, mCnt, m_cntForCompletlyPicked, m_cntForUnknownLoc, index, details;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            this.spinnerService.stop();
                                            data = res.json();
                                            _a = data.StatType;
                                            switch (_a) {
                                                case AtParEnums_2.StatusType.Success: return [3 /*break*/, 1];
                                                case AtParEnums_2.StatusType.Warn: return [3 /*break*/, 5];
                                                case AtParEnums_2.StatusType.Error: return [3 /*break*/, 6];
                                            }
                                            return [3 /*break*/, 7];
                                        case 1:
                                            this.lstDESCRS = data.DataDictionary["CaseItemsInfo"]["DESCRS"];
                                            this.lstITEMS = data.DataDictionary["CaseItemsInfo"]["ITEMS"];
                                            if (!(data.DataDictionary["CaseItemsInfo"].length == 0)) return [3 /*break*/, 2];
                                            this.showGrid = false;
                                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "No Record Found" });
                                            return [3 /*break*/, 4];
                                        case 2:
                                            this.showItemGrid = true;
                                            showDetails = true;
                                            this.chkReviewed = false;
                                            cartId = '';
                                            mCnt = 0;
                                            m_cntForCompletlyPicked = 0;
                                            m_cntForUnknownLoc = 0;
                                            return [4 /*yield*/, this.bindDynamicDetails(caseInfo)];
                                        case 3:
                                            _b.sent();
                                            //this.tblform = <HTMLElement>document.getElementById('tblform');                               
                                            this.scndDynmTbl = '';
                                            this.scndDynmTbl = "                               \n                                <table class='table table-bordered pick-qa-table' cellspacing= '0' cellpadding= '0' style='width:100%' >\n                                <thead>\n                                <tr>\n                                <th class='text-center text-bold' style='width:13%; text-align:center;vertical-align:middle;font-size:12px;background-color:#f2f2f2 !important;'> Item </th>\n                                <th class='text-center text-bold' style='width:8%;text-align:center;vertical-align:middle;font-size:12px;background-color:#f2f2f2 !important;'> Mfg ItemID</th>\n                                <th class='text-center text-bold' style='width:10%;text-align:center;vertical-align:middle;font-size:12px;background-color:#f2f2f2 !important;'> Item Description</th>\n                                <th class='text-center text-bold' style='width:8%;text-align:center;vertical-align:middle;font-size:12px;background-color:#f2f2f2 !important;'> Bin Loc</th>\n                                <th class='text-center text-bold' style='width:7%;text-align:center;vertical-align:middle;font-size:12px;background-color:#f2f2f2 !important;'> O Qty</th>\n                                <th class='text-center text-bold' style='width:7%;text-align:center;vertical-align:middle;font-size:12px;background-color:#f2f2f2 !important;'> H Qty</th>\n                                <th class='text-center text-bold' style='width:7%;text-align:center;vertical-align:middle;font-size:12px;background-color:#f2f2f2 !important;'> Picked Qty</th>\n                                <th class='text-center text-bold' style='width:6%;text-align:center;vertical-align:middle;font-size:12px;background-color:#f2f2f2 !important;'> Shortage Qty</th>\n                                <th class='text-center text-bold' style='text-align:center;vertical-align:middle;font-size:12px;background-color:#f2f2f2 !important;'> Barcode </th>\n                                </tr>\n                                </thead>\n                                <tbody >";
                                            this.lstITEMS = this.lstITEMS.sort(function (a) { return a.CART_ID; }).reverse();
                                            for (index in this.lstITEMS) {
                                                if (parseInt(this.lstITEMS[index].SHORTAGE_QTY) > 0 && (this.lstITEMS[index].CART_ID != null
                                                    && this.lstITEMS[index].CART_ID != "") && this.lstITEMS[index].CART_ID != cartId) {
                                                    if (mCnt == 0) {
                                                        mCnt = mCnt + 1;
                                                        this.scndDynmTbl += "<tr><td colspan='9' class='big-label'> Shortage items: </td></tr>";
                                                    }
                                                    mCnt = mCnt + 1;
                                                    this.scndDynmTbl += "<tr><td colspan='4' class='big-label' > Supply location: ";
                                                    this.scndDynmTbl += this.lstITEMS[index].CART_DESCR + "</td>\n                                                        <td colspan='5' style='text-align:center' class='text-center' >  \n                                                        <img src=\"data:image/jpg;base64," + this.lstITEMS[index].CART_ID_BARCODE + "\" />                                                                                                            \n                                                        </td>\n                                                        </tr>";
                                                }
                                                else if (parseInt(this.lstITEMS[index].SHORTAGE_QTY) == 0 && m_cntForCompletlyPicked == 0) {
                                                    mCnt = mCnt + 1;
                                                    m_cntForCompletlyPicked = 1;
                                                    this.scndDynmTbl += "<tr><td colspan= '9' class='big-label' > Completely picked items: </td></tr>";
                                                }
                                                else if (parseInt(this.lstITEMS[index].SHORTAGE_QTY) > 0 && (this.lstITEMS[index].CART_ID == null
                                                    || this.lstITEMS[index].CART_ID == "") && m_cntForUnknownLoc == 0) {
                                                    m_cntForUnknownLoc = 1;
                                                    mCnt = mCnt + 1;
                                                    this.scndDynmTbl += "<tr><td colspan= '9' class='big-label'> Unknown items: </td></tr>";
                                                }
                                                this.scndDynmTbl += "<tr><td style='width:13%;text-align:center' >";
                                                this.scndDynmTbl += this.lstITEMS[index].ITEM_ID + "</td>";
                                                this.scndDynmTbl += "<td style= 'width:8%;text-align:center' >";
                                                this.scndDynmTbl += this.lstITEMS[index].MANF_ITEM_ID + " </td>";
                                                this.scndDynmTbl += "<td style='width:10%;text-align:center' > ";
                                                this.scndDynmTbl += this.lstITEMS[index].ITEM_DESCR + "</td>";
                                                this.scndDynmTbl += "<td style='width:8%;text-align:center' > ";
                                                this.scndDynmTbl += this.lstITEMS[index].COMPARTMENT + "</td>";
                                                this.scndDynmTbl += "<td style='width:7%;text-align:right' > ";
                                                this.scndDynmTbl += this.lstITEMS[index].PICK_QTY + "</td>";
                                                this.scndDynmTbl += "<td style='width:7%;text-align:right' > ";
                                                this.scndDynmTbl += this.lstITEMS[index].HOLD_QTY + "</td>";
                                                this.scndDynmTbl += "<td style='width:7%;text-align:right' > ";
                                                this.scndDynmTbl += this.lstITEMS[index].QTY + "</td>";
                                                this.scndDynmTbl += "<td style='width:6%;text-align:right' > ";
                                                this.scndDynmTbl += this.lstITEMS[index].SHORTAGE_QTY + "</td>";
                                                this.scndDynmTbl += "<td style='text-align:center' > ";
                                                this.scndDynmTbl += "<img src=\"data:image/jpg;base64," + this.lstITEMS[index].ITEM_ID_BARCODE + "\" />";
                                                this.scndDynmTbl += "</td></tr>";
                                                cartId = this.lstITEMS[index].CART_ID;
                                            }
                                            this.scndDynmTbl += "</tbody>\n                                    </table>";
                                            // this.tblform.innerHTML = scndDynmTbl;
                                            this.blnisShortage = false;
                                            details = this.lstITEMS.filter(function (x) { return x.SHORTAGE_QTY > 0 && x.CART_ID != null && x.CART_ID != ""; });
                                            if (details != null && details.length > 0) {
                                                this.blnisShortage = true;
                                            }
                                            this.showGrid = false;
                                            this.editform = true;
                                            this.page = false;
                                            _b.label = 4;
                                        case 4: return [3 /*break*/, 7];
                                        case 5:
                                            {
                                                showDetails = false;
                                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                                return [3 /*break*/, 7];
                                            }
                                            _b.label = 6;
                                        case 6:
                                            {
                                                showDetails = false;
                                                this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                                return [3 /*break*/, 7];
                                            }
                                            _b.label = 7;
                                        case 7: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, showDetails];
                }
            });
        });
    };
    PostPickQAComponent.prototype.bindDynamicDetails = function (caseInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var htmlString, dr, StrPtName, arr, item;
            return __generator(this, function (_a) {
                try {
                    htmlString = '';
                    htmlString = "<table width='100%'><thead><th>Case ID</th><th>Case Date</th><th>Patient</th></thead>>";
                    dr = this.vmcaseDetails.lstCaseforQA.filter(function (x) { return x.CASE_ID == caseInfo.CASE_ID; });
                    if ((dr.length > 0)) {
                        htmlString += "<tbody><td>" + dr[0].CASE_ID + "</td><td>" + dr[0].PERFORM_DATE + "</td><td></td>";
                        this.lblCaseID = dr[0].CASE_ID;
                        this.lblPerformDate = dr[0].PERFORM_DATE;
                        if (dr[0].PATIENTNAME != null && dr[0].PATIENTNAME != '') {
                            if (dr[0].PATIENTNAME.toString().indexOf("-") != -1) {
                                StrPtName = '';
                                StrPtName = dr[0].PATIENTNAME;
                                arr = StrPtName.split("-");
                                this.lblPatient = dr[0].PATIENT_BARCODE; //MRC No/PatientID
                                this.lblPatientName = arr[1]; // Patient Name
                            }
                            else {
                                this.lblPatient = dr[0].PATIENT_BARCODE;
                                this.lblPatientName = "Patient";
                            }
                        }
                    }
                    //need to remove this logic as already developed in html page
                    if (this.lstDESCRS.length == 1) {
                        this.dynamicTable = "<tr><td width='33%'>Physician: " + this.lstDESCRS[0].PHYSICIAN_DESCR + "</td>";
                        this.dynamicTable += " <td width='33%'>| &nbsp; Procedure: " + this.lstDESCRS[0].PROC_DESCR + "</td>";
                        this.dynamicTable += "<td width='33%'>| &nbsp; Pref List: " + this.lstDESCRS[0].PREF_DESCR + " </td> </tr> ";
                    }
                    else if (this.lstDESCRS.length > 1) {
                        for (item in this.lstDESCRS) {
                            this.dynamicTable = "<tr><td width='33%'>Physician: " + this.lstDESCRS[item].PHYSICIAN_DESCR + "</td>";
                            this.dynamicTable += "<td width='33%'>Procedure: " + this.lstDESCRS[item].PROC_DESCR + "</td>";
                            this.dynamicTable += "<td width='33%'>Pref List: " + this.lstDESCRS[item].PREF_DESCR + " </td></tr> ";
                        }
                    }
                    //Till here
                }
                catch (ex) {
                }
                finally {
                }
                return [2 /*return*/];
            });
        });
    };
    PostPickQAComponent.prototype.onPickGoBackClick = function () {
        this.growlMessage = [];
        this.editform = false;
        this.page = true;
        this.showGrid = true;
        this.showItemGrid = false;
        //this.tblform.innerHTML = '';
        this.scndDynmTbl = '';
    };
    PostPickQAComponent.prototype.onPrintClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var element, html, mywindow, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, 5, 6]);
                        this.growlMessage = [];
                        if (!this.chkReviewed) return [3 /*break*/, 2];
                        element = document.getElementById("tblform");
                        event.stopImmediatePropagation();
                        this.spinnerService.start();
                        return [4 /*yield*/, this.exportReportDetails()];
                    case 1:
                        html = _a.sent();
                        if (html != '' && html != null) {
                            mywindow = window.open('', null, 'height=650,width=650,status=no,resizable=yes, scrollbars=yes, toolbar=no,location=center,menubar=no');
                            if (mywindow != null && mywindow != undefined) {
                                mywindow.document.write('<html><head><title>' + 'Point of Use - Post pick QA items' + '</title>');
                                mywindow.document.write('</head><body >');
                                mywindow.document.write(html);
                                mywindow.document.write('</body></html>');
                                mywindow.document.close(); // necessary for IE >= 10
                                mywindow.focus(); // necessary for IE >= 10*/
                                // mywindow.print();
                                // mywindow.close();
                                return [2 /*return*/, true];
                            }
                            else {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please set allow pop-ups for this site in your browser' });
                            }
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please click on Reviewed check box before printing the report' });
                        return [2 /*return*/, false];
                    case 3: return [3 /*break*/, 6];
                    case 4:
                        ex_4 = _a.sent();
                        this.clientErrorMsg(ex_4, 'onPrintClick');
                        return [2 /*return*/, false];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    PostPickQAComponent.prototype.exportReportDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var statusCode, sbMailText, _strFrmDt, _strToDt, htmlBuilder, ipAddress, gstrProtocal, gstrServerName, gstrPortNo, imgserverPath, perfrmDate, startDate, title, i, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.growlMessage = [];
                        statusCode = -1;
                        htmlBuilder = '';
                        ipAddress = '';
                        gstrProtocal = '';
                        gstrServerName = '';
                        gstrPortNo = '';
                        imgserverPath = '';
                        perfrmDate = new Date(this.lblPerformDate).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                        startDate = new Date(this.lblPerformDate).toLocaleDateString();
                        //if (perfrmDate.includes(',')) {
                        //    startDate = perfrmDate.split(',')[0].replace(',','');
                        //}
                        //else {
                        //    startDate = perfrmDate.split(' ')[0].replace(',', '');
                        //}
                        return [4 /*yield*/, this.atParCommonService.getServerIP()
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        ipAddress = data.DataVariable.toString();
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
                    case 1:
                        //if (perfrmDate.includes(',')) {
                        //    startDate = perfrmDate.split(',')[0].replace(',','');
                        //}
                        //else {
                        //    startDate = perfrmDate.split(' ')[0].replace(',', '');
                        //}
                        _a.sent();
                        return [4 /*yield*/, this.atParCommonService.getSSLConfigDetails()
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                _this.growlMessage = [];
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        gstrProtocal = data.Data.PROTOCOL.toString();
                                        gstrServerName = data.Data.SERVER_NAME.toString();
                                        gstrPortNo = data.Data.PORT_NO.toString();
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
                        imgserverPath = gstrProtocal + '://' + ipAddress + '/atpar/AtParWebApi/assets/images/';
                        title = '""' + "AtparVersion 2.8" + '""';
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        htmlBuilder = "<Table align=left width=100% cellpadding=0 cellspacing = 0 vAlign=top><tr><td>";
                        htmlBuilder += "<Table align=left width=100% cellpadding=0 cellspacing = 0 vAlign=top>";
                        htmlBuilder += "<TR width='100%'>";
                        htmlBuilder += "<td colspan=2 align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=73% height=63></td><td align=left  width='85%' height=63 nowrap><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>";
                        htmlBuilder += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD></TR>";
                        htmlBuilder += "<tr><td align=left><span class=c2>Point of Use - Post pick QA items</span></td><td align=right><A  href=" + "javascript:window.print()" + "><img src=" + imgserverPath + "print.jpg></A></td><tr>";
                        htmlBuilder += "<tr><td colspan=2>";
                        htmlBuilder += "<table align=left width=100% border=1 rules='all'>";
                        htmlBuilder += "<tr><td style='width: 33%' align='center'><b>Case ID</b></td><td style='width: 33%'  align='center'><b>Case Date</b></td><td style='width: 33%'  align='center'><b>" + this.lblPatientName + "</b></td></tr>";
                        htmlBuilder += "<tr><td style='width: 33%'> " + this.lblCaseID + "</td><td style='width: 33%'>" + startDate + "</td><td style='width:33%'  align='center' valign='middle'><img style='vertical-align:middle' src='data:image/jpg;base64," + this.lblPatient + "' /></td></tr>";
                        //htmlBuilder+="<tr><td style='width: 33%'>Case ID: " & lblCaseId.Text & "</td><td style='width: 33%'>Case Date: " & lblCaseDate.Text & "</td><td style='width: 33%'>Patient : " & lblPatient.Text & "</td></tr>")
                        htmlBuilder += "<tr><td colspan=3 align=right valign=top>";
                        htmlBuilder += "<table align=left width=100% border=0 rules='all'>";
                        htmlBuilder += "<tr><td align='center' style='width: 33%' ><b>Physician</b></td><td align='center' style='width: 33%'><b>Procedure</b></td><td align='center' style='width: 33%'><b>Preference List</b></td></tr>";
                        for (i in this.lstDESCRS) {
                            htmlBuilder += "<tr>";
                            htmlBuilder += "<td align='left'>" + this.lstDESCRS[i].PHYSICIAN_DESCR + "</td>";
                            htmlBuilder += "<td align='left'>" + this.lstDESCRS[i].PROC_DESCR + "</td>";
                            htmlBuilder += "<td align='left'>" + this.lstDESCRS[i].PREF_DESCR + "</td>";
                            htmlBuilder += "</tr>";
                        }
                        htmlBuilder += "</table>";
                        htmlBuilder += "</tr>";
                        htmlBuilder += "<tr><td colspan=3 align='right' >Reviewed By: " + this.userFullName + "&nbsp;</td></tr>";
                        htmlBuilder += "</table></td></tr>";
                        htmlBuilder += "<tr><td colspan=2> ";
                        //For Details Table function call      
                        return [4 /*yield*/, this.postPickQAService.buildReportPrint(AtParEnums_2.EnumApps.PointOfUse, "DELIVERY SLIP", "DETAILS", this.lstITEMS)
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                _this.growlMessage = [];
                                var data = res.json();
                                if (data.StatusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Error While Building Details Data" });
                                }
                                else {
                                    htmlBuilder += data.DataVariable;
                                    htmlBuilder += "</td></tr>";
                                    htmlBuilder += "</Table>";
                                }
                            })];
                    case 4:
                        //For Details Table function call      
                        _a.sent();
                        return [2 /*return*/, htmlBuilder];
                    case 5:
                        ex_5 = _a.sent();
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    PostPickQAComponent.prototype.getUserFullName = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.atParCommonService.getUserFullName(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID]).
                                catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.userFullName = data.DataVariable.toString();
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
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_6 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PostPickQAComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.lstCaseItemsInfo = [];
        this.lstDESCRS = [];
        this.lstITEMS = [];
        this.lstPostPick = [];
        this.spinnerService.stop();
        this.lstCaseforQA = [];
        this.vmcaseDetails = null;
    };
    PostPickQAComponent = __decorate([
        core_1.Component({
            templateUrl: 'pou-post-pick-qa.component.html',
            providers: [atpar_common_service_1.AtParCommonService, pou_post_pick_qa_service_1.PostPickQAService, AtParConstants_1.AtParConstants, datatableservice_1.datatableservice],
            encapsulation: core_1.ViewEncapsulation.None,
        }),
        __metadata("design:paramtypes", [event_spinner_service_1.SpinnerService,
            atpar_common_service_1.AtParCommonService,
            HttpService_1.HttpService,
            AtParConstants_1.AtParConstants,
            pou_post_pick_qa_service_1.PostPickQAService])
    ], PostPickQAComponent);
    return PostPickQAComponent;
}());
exports.PostPickQAComponent = PostPickQAComponent;
//# sourceMappingURL=pou-post-pick-qa.component.js.map