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
var POU_REVIEW_CHARGES_CREDITS_SERVICE_1 = require("./POU-REVIEW-CHARGES-CREDITS.SERVICE");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AtParConstants_1 = require("../Shared/AtParConstants");
var AtParStatusCodes_1 = require("../Shared/AtParStatusCodes");
var VM_POU_CREDIT_HEADER_1 = require("../Entities/VM_POU_CREDIT_HEADER");
var VM_POU_CREDIT_DETAILS_1 = require("../Entities/VM_POU_CREDIT_DETAILS");
var routepath_1 = require("../AtPar/Menus/routepath");
var file_saver_1 = require("file-saver");
var ReviewChargesCreditsComponent = (function () {
    function ReviewChargesCreditsComponent(httpService, commonService, spinnerService, reviewCreditsService, atParConstant) {
        this.httpService = httpService;
        this.commonService = commonService;
        this.spinnerService = spinnerService;
        this.reviewCreditsService = reviewCreditsService;
        this.atParConstant = atParConstant;
        this.isPostback = false;
        this.isMailDialog = false;
        this.showDDStatus = true;
        this.showTxtLotNumber = true;
        this.showTxtSerNumber = true;
        this.btn_SubmitReviews = false;
        this.btn_SubmitReviewsTop = false;
        this.gvCharges = false;
        this.grdCredits = false;
        this.tbReviewCharges = true;
        this.tdExports = false;
        this.pageForm = true;
        this.addChargeForm = false;
        this.editChargeForm = false;
        this.editCreditForm = false;
        this.statusCode = -1;
        this.noOfRecords = 0;
        this.defDateRange = 0;
        this.lblResultCount = 0;
        this.reviewChargesRows = 0;
        this.creditsRows = 0;
        this.strUserId = '';
        this.strMaxAllowQty = '';
        this.strTransactionId = '';
        this.deviceTokenEntry = [];
        this.patientID = '';
        this.accountID = '';
        this.examID = '';
        this.comments = '';
        this.selectedDept = '';
        this.selectedStatus = '';
        this.activeTab = '';
        this.lit_GridVisible = 'N';
        this.selectedItemID = '';
        this._lblPatientID = '';
        this.toMailAddr = '';
        this.htCharges = [];
        this.dsItems = [];
        this.lstDeptId = [];
        this.lstStatus = [];
        this.lstItemIDs = [];
        this.msgs = [];
        this.dvChargesHeaders = [];
        this.dvChargesDetails = [];
        this.dvCreditHeaders = [];
        this.dvCreditDetails = [];
        this.dsDeptItems = [];
        this.lstChkCharges = [];
        this.lstChargesFilterData = [];
        this.disableButton = false;
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
    ReviewChargesCreditsComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, ex_1, _b, ex_2, _c, ex_3;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.tbReviewCharges = false;
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 12, 13, 14]);
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 4, , 5]);
                        this.spinnerService.start();
                        this.statusCode = -1;
                        this.strUserId = this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.UserID];
                        _a = this;
                        return [4 /*yield*/, this.getMyPreferences()];
                    case 3:
                        _a.statusCode = _d.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_1 = _d.sent();
                        this.msgs = [];
                        this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Failed to get Parameters' });
                        return [2 /*return*/];
                    case 5:
                        _d.trys.push([5, 7, , 8]);
                        _b = this;
                        return [4 /*yield*/, this.getProfileParamValue()];
                    case 6:
                        _b.statusCode = _d.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.msgs = [];
                            this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Internal Server Error' });
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 8];
                    case 7:
                        ex_2 = _d.sent();
                        this.msgs = [];
                        this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Internal Server Error' });
                        return [2 /*return*/];
                    case 8: return [4 /*yield*/, this.bindDropDowns()];
                    case 9:
                        _d.sent();
                        this.currentDate = new Date();
                        this.toDate = new Date();
                        this.fromDate = new Date();
                        if (!(this.defDateRange.toString() != '' && this.defDateRange != null)) return [3 /*break*/, 11];
                        _c = this;
                        return [4 /*yield*/, this.addDays(this.fromDate, -this.defDateRange)];
                    case 10:
                        _c.fromDate = _d.sent();
                        _d.label = 11;
                    case 11: return [3 /*break*/, 14];
                    case 12:
                        ex_3 = _d.sent();
                        this.clientErrorMsg(ex_3);
                        return [3 /*break*/, 14];
                    case 13:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    ReviewChargesCreditsComponent.prototype.addDays = function (theDate, days) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000)];
            });
        });
    };
    ReviewChargesCreditsComponent.prototype.getMyPreferences = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4, ex_5, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.commonService.getMyPreferences('DEFAULT_REPORT_DURATION', this.deviceTokenEntry)
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    _this.defDateRange = parseInt(data.DataVariable.toString());
                                }
                            })];
                    case 2:
                        _a.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        ex_4 = _a.sent();
                        return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, this.commonService.getMyPreferences('RECORDS_PER_PAGE', this.deviceTokenEntry)
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    _this.noOfRecords = parseInt(data.DataVariable.toString());
                                }
                            })];
                    case 5:
                        _a.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                        }
                        return [3 /*break*/, 7];
                    case 6:
                        ex_5 = _a.sent();
                        return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        ex_6 = _a.sent();
                        return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                    case 9: return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK];
                }
            });
        });
    };
    ReviewChargesCreditsComponent.prototype.getProfileParamValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_7;
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
                        ex_7 = _a.sent();
                        return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                    case 3: return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK];
                }
            });
        });
    };
    ReviewChargesCreditsComponent.prototype.bindDropDowns = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, ex_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = this;
                        return [4 /*yield*/, this.getUserDepartments()];
                    case 1:
                        _a.statusCode = _b.sent();
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            this.msgs = [];
                            if (this.statusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Department(s) allocated to user ' });
                            }
                            else {
                                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Failed to get User Departments' });
                            }
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        ex_8 = _b.sent();
                        this.msgs = [];
                        this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Error while retrieving Departments' });
                        return [2 /*return*/];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ReviewChargesCreditsComponent.prototype.getUserDepartments = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.lstDeptId = [];
                        this.lstDeptId.push({ label: "Select Department", value: "Select Department" });
                        return [4 /*yield*/, this.commonService.getUserDepartments(this.strUserId, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID], this.deviceTokenEntry)
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    var lstDept = [];
                                    lstDept = data.DataList;
                                    lstDept.forEach(function (dept) {
                                        _this.lstDeptId.push({ label: dept.DEPARTMENT_ID + ' - ' + dept.DEPT_NAME, value: dept.DEPARTMENT_ID });
                                    });
                                }
                            })];
                    case 1:
                        _a.sent();
                        this.lstStatus = [];
                        this.lstStatus.push({ label: 'Not Reviewed', value: '0' });
                        this.lstStatus.push({ label: 'Submitted', value: '1' });
                        this.lstStatus.push({ label: 'Error', value: '2' });
                        this.selectedStatus = '0';
                        if (this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                            return [2 /*return*/, this.statusCode];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        ex_9 = _a.sent();
                        return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.E_SERVERERROR];
                    case 3: return [2 /*return*/, AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK];
                }
            });
        });
    };
    ReviewChargesCreditsComponent.prototype.onGoClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var returnValue, ex_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, 5, 6]);
                        this.spinnerService.start();
                        this.statusCode = -1;
                        this.msgs = [];
                        this.btn_SubmitReviews = false;
                        this.btn_SubmitReviewsTop = false;
                        this.gvCharges = false;
                        this.grdCredits = false;
                        this.lblResultCount = 0;
                        this.tbReviewCharges = false;
                        this.tdExports = false;
                        this.activeTab = 'Charges';
                        returnValue = false;
                        return [4 /*yield*/, this.validateSearchFields()];
                    case 1:
                        //returnValue = await this.clearCheckedFields();
                        returnValue = _a.sent();
                        if (!returnValue) return [3 /*break*/, 3];
                        this.msgs = [];
                        this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: 'Getting data....' });
                        return [4 /*yield*/, this.bindChargesGrid()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 6];
                    case 4:
                        ex_10 = _a.sent();
                        this.clientErrorMsg(ex_10);
                        return [3 /*break*/, 6];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ReviewChargesCreditsComponent.prototype.clearCheckedFields = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 4]);
                        sessionStorage.removeItem('CHECKED_ITEMS');
                        sessionStorage.removeItem('UNCHECKED_ITEMS');
                        sessionStorage.removeItem('ChargesHashTable');
                        return [4 /*yield*/, true];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        ex_11 = _a.sent();
                        return [4 /*yield*/, false];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ReviewChargesCreditsComponent.prototype.validateSearchFields = function () {
        try {
            this.msgs = [];
            if (this.fromDate == null || this.fromDate.toString() == '' || this.toDate == null || this.toDate.toString() == '') {
                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please select a valid date range' });
                return false;
            }
            else if (Date.parse(this.fromDate.toString()) && Date.parse(this.toDate.toString())) {
                if (Date.parse(this.convertDateFormate(this.toDate)) > Date.parse(this.convertDateFormate(this.currentDate))) {
                    this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "To Date should be less than or equal to Today's Date" });
                    return false;
                }
                if (Date.parse(this.convertDateFormate(this.fromDate)) > Date.parse(this.convertDateFormate(this.toDate))) {
                    this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "From Date should be less than To Date" });
                    return false;
                }
                else {
                    if (this.selectedDept == null || this.selectedDept == undefined || this.selectedDept == '' || this.selectedDept == 'Select Department') {
                        this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please select Department" });
                        return false;
                    }
                }
            }
            else {
                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Dates' });
                return false;
            }
            return true;
        }
        catch (ex) {
            this.clientErrorMsg(ex);
            return false;
        }
    };
    ReviewChargesCreditsComponent.prototype.bindChargesGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ds, dvCharges, tempTodate, strDeptID, cDate, fromDate, toDate, ex_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        this.statusCode = -1;
                        this.msgs = [];
                        ds = [];
                        dvCharges = [];
                        tempTodate = '';
                        strDeptID = this.selectedDept;
                        cDate = new Date();
                        cDate.setDate(this.toDate.getDate() + 1);
                        return [4 /*yield*/, this.convertDateFormate(this.fromDate)];
                    case 1:
                        fromDate = _a.sent();
                        return [4 /*yield*/, this.convertDateFormate(cDate)];
                    case 2:
                        toDate = _a.sent();
                        sessionStorage.setItem('reviewStatus', this.selectedStatus);
                        return [4 /*yield*/, this.reviewCreditsService.getCharges(fromDate, toDate, this.patientID, this.examID, this.accountID, strDeptID, this.comments, parseInt(this.selectedStatus), parseInt(AtParEnums_1.EnumApps.PointOfUse.toString()))
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                    _this.lit_GridVisible = 'N';
                                    _this.btn_SubmitReviews = false;
                                    _this.btn_SubmitReviewsTop = false;
                                    _this.gvCharges = false;
                                    _this.lblResultCount = 0;
                                    _this.tbReviewCharges = true;
                                    _this.tdExports = false;
                                    _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No open transactions found for the given search criteria, try another date range' });
                                    return;
                                }
                                else if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    _this.dvChargesHeaders = data.DataDictionary[AtParEnums_1.DataSet_Type[AtParEnums_1.DataSet_Type.HEADERS.toString()]];
                                    _this.dvChargesDetails = data.DataDictionary[AtParEnums_1.DataSet_Type[AtParEnums_1.DataSet_Type.DETAILS.toString()]];
                                    _this.dvChargesDetails.forEach(function (detail) {
                                        detail.ITEM_COUNT = parseFloat(detail.ITEM_COUNT).toFixed(2);
                                        detail.ITEM_PRICE = detail.ITEM_PRICE == null ? parseFloat('0').toFixed(2) : parseFloat(detail.ITEM_PRICE).toFixed(2);
                                    });
                                    _this.dvChargesHeaders.forEach(function (header) {
                                        var details = [];
                                        details = _this.dvChargesDetails.filter(function (detail) { return detail.TRANSACTION_ID == header.TRANSACTION_ID; });
                                        header.DETAILS = details;
                                        ;
                                    });
                                    if (_this.dvChargesHeaders.length > 0) {
                                        _this.lit_GridVisible = 'Y';
                                        _this.btn_SubmitReviews = true;
                                        _this.btn_SubmitReviewsTop = true;
                                        _this.lblResultCount = _this.dvChargesHeaders.length;
                                        sessionStorage.setItem('_DS', JSON.stringify(data.DataList));
                                        if (_this.noOfRecords == 0) {
                                            _this.reviewChargesRows = _this.dvChargesHeaders.length;
                                        }
                                        else {
                                            _this.reviewChargesRows = _this.noOfRecords;
                                        }
                                        _this.gvCharges = true;
                                        _this.tbReviewCharges = true;
                                        _this.tdExports = true;
                                        sessionStorage.setItem('_DS', JSON.stringify(_this.dvChargesHeaders));
                                    }
                                }
                                else if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL) {
                                    _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Local DB select failed' });
                                    _this.tdExports = false;
                                    return;
                                }
                                else if (_this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: 'Failed to get Charge' });
                                    _this.tdExports = false;
                                    return;
                                }
                            })];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_12 = _a.sent();
                        this.clientErrorMsg(ex_12);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ReviewChargesCreditsComponent.prototype.bindCreditsGrid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var dsCredit, strDeptID, cDate, fromDate, toDate, ex_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        this.statusCode = -1;
                        this.showDDStatus = false;
                        this.msgs = [];
                        dsCredit = [];
                        strDeptID = this.selectedDept;
                        cDate = new Date();
                        cDate.setDate(this.toDate.getDate() + 1);
                        return [4 /*yield*/, this.convertDateFormate(this.fromDate)];
                    case 1:
                        fromDate = _a.sent();
                        return [4 /*yield*/, this.convertDateFormate(cDate)];
                    case 2:
                        toDate = _a.sent();
                        return [4 /*yield*/, this.reviewCreditsService.getCredits(fromDate, toDate, this.patientID, this.examID, this.accountID, this.selectedDept, this.comments, false)
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                                if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                    _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No open transactions found for the given search criteria, try another date range' });
                                    _this.btn_SubmitReviews = false;
                                    _this.btn_SubmitReviewsTop = false;
                                    _this.gvCharges = false;
                                    _this.tdExports = false;
                                    _this.lblResultCount = 0;
                                    return;
                                }
                                else if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    _this.dvCreditHeaders = data.DataDictionary[AtParEnums_1.DataSet_Type[AtParEnums_1.DataSet_Type.HEADERS.toString()]];
                                    _this.dvCreditDetails = data.DataDictionary[AtParEnums_1.DataSet_Type[AtParEnums_1.DataSet_Type.DETAILS.toString()]];
                                    _this.dvCreditDetails.forEach(function (detail) {
                                        detail.ITEM_COUNT = parseFloat(detail.ITEM_COUNT).toFixed(2);
                                        detail.ITEM_PRICE = detail.ITEM_PRICE == null ? parseFloat('0').toFixed(2) : parseFloat(detail.ITEM_PRICE).toFixed(2);
                                        detail.BILLED_QTY = detail.BILLED_QTY == null ? detail.BILLED_QTY : parseFloat(detail.BILLED_QTY).toFixed(2);
                                        detail.CREDIT_QTY = detail.CREDIT_QTY == null ? detail.CREDIT_QTY : parseFloat(detail.CREDIT_QTY).toFixed(2);
                                    });
                                    _this.dvCreditHeaders.forEach(function (header) {
                                        var details = [];
                                        details = _this.dvCreditDetails.filter(function (detail) { return detail.TRANSACTION_ID == header.TRANSACTION_ID; });
                                        header.DETAILS = details;
                                    });
                                    if (_this.dvCreditHeaders.length > 0) {
                                        _this.lblResultCount = _this.dvCreditHeaders.length;
                                        sessionStorage.setItem('CreditDetails', JSON.stringify(_this.dvCreditHeaders));
                                        if (_this.noOfRecords == 0) {
                                            _this.creditsRows = _this.dvCreditHeaders.length;
                                        }
                                        else {
                                            _this.creditsRows = _this.noOfRecords;
                                        }
                                        _this.grdCredits = true;
                                        _this.tdExports = true;
                                        sessionStorage.setItem('CreditDetails', JSON.stringify(_this.dvCreditHeaders));
                                    }
                                }
                                else if (_this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: _this.dvCreditHeaders.length + ' Failed to get Credits.' });
                                    return;
                                }
                            })];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_13 = _a.sent();
                        this.clientErrorMsg(ex_13);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ReviewChargesCreditsComponent.prototype.getDepartmentItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.lstItemIDs = [];
                        this.lstItemIDs.push({ label: 'Select Item', value: 'Select Item' });
                        return [4 /*yield*/, this.reviewCreditsService.getDepartmentItems(this.selectedDept, this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.OrgGrpID])
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                var data = res.json();
                                if (data.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    _this.dsDeptItems = data.DataList;
                                    sessionStorage.setItem('dsItems', JSON.stringify(_this.dsDeptItems));
                                    if (_this.dsDeptItems.length > 0) {
                                        _this.dsDeptItems.forEach(function (item) {
                                            _this.lstItemIDs.push({ label: item.ITEM_ID + '-' + item.ITEM_DESCRIPTION, value: item.ITEM_ID });
                                        });
                                    }
                                }
                                else if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.E_NORECORDFOUND) {
                                    _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Items Found.' });
                                }
                                else {
                                    _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_14 = _a.sent();
                        this.clientErrorMsg(ex_14);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ReviewChargesCreditsComponent.prototype.selectedTabIndexChanged = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 12, 13, 14]);
                        if (!this.isPostback) return [3 /*break*/, 10];
                        this.spinnerService.start();
                        if (event != null) {
                            this.activeTab = event.title;
                        }
                        this.lblResultCount = 0;
                        this.msgs = [];
                        if (!(this.activeTab.trim() == 'Charges')) return [3 /*break*/, 5];
                        this.btn_SubmitReviews = true;
                        this.btn_SubmitReviewsTop = true;
                        this.gvCharges = true;
                        this.grdCredits = false;
                        this.showDDStatus = true;
                        return [4 /*yield*/, this.validateSearchFields()];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.bindChargesGrid()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        this.gvCharges = false;
                        this.btn_SubmitReviews = false;
                        this.btn_SubmitReviewsTop = false;
                        this.tdExports = false;
                        _a.label = 4;
                    case 4: return [3 /*break*/, 9];
                    case 5:
                        if (!(this.activeTab == 'Credits')) return [3 /*break*/, 9];
                        this.selectedStatus = '0';
                        this.btn_SubmitReviews = false;
                        this.btn_SubmitReviewsTop = false;
                        this.gvCharges = false;
                        this.showDDStatus = false;
                        return [4 /*yield*/, this.validateSearchFields()];
                    case 6:
                        if (!_a.sent()) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.bindCreditsGrid()];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        this.tdExports = false;
                        _a.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        this.isPostback = true;
                        _a.label = 11;
                    case 11: return [3 /*break*/, 14];
                    case 12:
                        ex_15 = _a.sent();
                        this.clientErrorMsg(ex_15);
                        return [3 /*break*/, 14];
                    case 13:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    ReviewChargesCreditsComponent.prototype.onChargesFilterData = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.lstChargesFilterData = data;
                }
                catch (ex) {
                    this.clientErrorMsg(ex);
                }
                return [2 /*return*/];
            });
        });
    };
    ReviewChargesCreditsComponent.prototype.checkAllCharges = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, i;
            return __generator(this, function (_a) {
                try {
                    this.spinnerService.start();
                    this.lstChkCharges = [];
                    if (this.lstChargesFilterData != null && this.lstChargesFilterData != undefined && this.lstChargesFilterData.length != 0) {
                        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                        if (this.EndIndex > this.lstChargesFilterData.length) {
                            this.EndIndex = this.lstChargesFilterData.length;
                        }
                        for (i = this.startIndex; i <= this.EndIndex - 1; i++) {
                            this.lstChargesFilterData[i].REVIEWED = true;
                            this.lstChkCharges.push(this.lstChargesFilterData[i]);
                        }
                    }
                    else {
                        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                        if (this.EndIndex > this.dvChargesHeaders.length) {
                            this.EndIndex = this.dvChargesHeaders.length;
                        }
                        for (i = this.startIndex; i <= this.EndIndex - 1; i++) {
                            this.dvChargesHeaders[i].REVIEWED = true;
                            this.lstChkCharges.push(this.dvChargesHeaders[i]);
                        }
                    }
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
    ReviewChargesCreditsComponent.prototype.unCheckAllCharges = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, i;
            return __generator(this, function (_a) {
                try {
                    this.spinnerService.start();
                    this.lstChkCharges = [];
                    if (this.lstChargesFilterData != null && this.lstChargesFilterData != undefined && this.lstChargesFilterData.length != 0) {
                        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                        if (this.EndIndex > this.lstChargesFilterData.length) {
                            this.EndIndex = this.lstChargesFilterData.length;
                        }
                        for (i = this.EndIndex - 1; i >= this.startIndex; i--) {
                            this.lstChargesFilterData[i].REVIEWED = false;
                            this.lstChkCharges.push(this.lstChargesFilterData[i]);
                        }
                    }
                    else {
                        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                        if (this.EndIndex > this.dvChargesHeaders.length) {
                            this.EndIndex = this.dvChargesHeaders.length;
                        }
                        for (i = this.EndIndex - 1; i >= this.startIndex; i--) {
                            this.dvChargesHeaders[i].REVIEWED = false;
                            this.lstChkCharges.push(this.dvChargesHeaders[i]);
                        }
                    }
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
    ReviewChargesCreditsComponent.prototype.onSaveReviewsClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var lstReviewed_1, reviewObj_1, status_1, ex_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, 6, 7]);
                        this.spinnerService.start();
                        this.statusCode = -1;
                        this.msgs = [];
                        lstReviewed_1 = [];
                        reviewObj_1 = null;
                        status_1 = JSON.parse(sessionStorage.getItem('reviewStatus'));
                        return [4 /*yield*/, this.dvChargesHeaders.forEach(function (header) {
                                reviewObj_1 = new VM_POU_CREDIT_HEADER_1.VM_POU_CREDIT_HEADER();
                                reviewObj_1.TRANSACTION_ID = header.TRANSACTION_ID;
                                reviewObj_1.REVIEWED = header.REVIEWED;
                                if (parseInt(status_1) == 0) {
                                    if (reviewObj_1.REVIEWED == true) {
                                        lstReviewed_1.push(header);
                                    }
                                }
                                else if (parseInt(status_1) == 1) {
                                    if (reviewObj_1.REVIEWED == false) {
                                        lstReviewed_1.push(header);
                                    }
                                }
                                else if (parseInt(status_1) == 2) {
                                    lstReviewed_1.push(header);
                                }
                            })];
                    case 1:
                        _a.sent();
                        if (!(lstReviewed_1.length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.reviewCreditsService.setReviewed(lstReviewed_1)
                                .then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_1.StatusType.Success: {
                                        _this.gvCharges = false;
                                        _this.btn_SubmitReviews = false;
                                        _this.btn_SubmitReviewsTop = false;
                                        _this.lblResultCount = 0;
                                        _this.tbReviewCharges = false;
                                        _this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Reviewed successfully' });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Warn: {
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Error: {
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                    case AtParEnums_1.StatusType.Custom: {
                                        _this.msgs.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        break;
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please select/unselect the transaction(s) before saving the review' });
                        _a.label = 4;
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        ex_16 = _a.sent();
                        this.clientErrorMsg(ex_16);
                        return [3 /*break*/, 7];
                    case 6:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ReviewChargesCreditsComponent.prototype.addCharge = function (charge) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Item';
                        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        this.spinnerService.start();
                        this.addChargeData = new VM_POU_CREDIT_HEADER_1.VM_POU_CREDIT_HEADER();
                        this.addChargeData = charge;
                        this.chargeNewItem = new VM_POU_CREDIT_DETAILS_1.VM_POU_CREDIT_DETAILS();
                        this.msgs = [];
                        return [4 /*yield*/, this.getDepartmentItems()];
                    case 2:
                        _a.sent();
                        this.disableButton = true;
                        this.pageForm = false;
                        this.editChargeForm = false;
                        this.addChargeForm = true;
                        this.selectedItemID = "";
                        return [3 /*break*/, 5];
                    case 3:
                        ex_17 = _a.sent();
                        this.clientErrorMsg(ex_17);
                        return [3 /*break*/, 5];
                    case 4:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ReviewChargesCreditsComponent.prototype.editCharge = function (charge) {
        return __awaiter(this, void 0, void 0, function () {
            var _DS, editCharge, ex_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.breadCrumbMenu.SUB_MENU_NAME = 'Update Charges';
                        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, 6, 7]);
                        this.spinnerService.start();
                        _DS = [];
                        _DS = JSON.parse(sessionStorage.getItem('_DS'));
                        this.msgs = [];
                        editCharge = [];
                        return [4 /*yield*/, _DS.filter(function (x) { return x.TRANSACTION_ID == charge.TRANSACTION_ID; })];
                    case 2:
                        editCharge = _a.sent();
                        if (!(editCharge.length > 0)) return [3 /*break*/, 4];
                        this.editChargeData = new VM_POU_CREDIT_HEADER_1.VM_POU_CREDIT_HEADER();
                        this.editChargeData = editCharge[0];
                        return [4 /*yield*/, this.editChargeData.DETAILS.forEach(function (detail) {
                                detail.ITEM_COUNT = parseInt(detail.ITEM_COUNT);
                                //detail.ITEM_PRICE = parseInt(detail.ITEM_PRICE);
                            })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        this.pageForm = false;
                        this.addChargeForm = false;
                        this.editChargeForm = true;
                        return [3 /*break*/, 7];
                    case 5:
                        ex_18 = _a.sent();
                        this.clientErrorMsg(ex_18);
                        return [3 /*break*/, 7];
                    case 6:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ReviewChargesCreditsComponent.prototype.bindModelDataChange = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    ReviewChargesCreditsComponent.prototype.onChargeUpdateClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _txtPatientID, _txtAccID, _txtChargeCode, _txtDateTime, _txtItemCount, _txtItemPrice, _txtExamID, _txtComments, _lblItemID, _lblLineNo, _lblPatientID, _lblChargeCode, _lblTransID, _lblItemSerialNo, reg, _tblChargesHeader, _chargesHeader, _tblChargesDetails, _ChargesDetails, i, reg, dicDataItems, ex_19;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, 6, 7]);
                        this.spinnerService.start();
                        this.statusCode = -1;
                        this.msgs = [];
                        _txtPatientID = void 0;
                        _txtAccID = void 0;
                        _txtChargeCode = void 0;
                        _txtDateTime = void 0;
                        _txtItemCount = void 0;
                        _txtItemPrice = void 0;
                        _txtExamID = void 0;
                        _txtComments = void 0;
                        _lblItemID = void 0;
                        _lblLineNo = void 0;
                        _lblPatientID = void 0;
                        _lblChargeCode = void 0;
                        _lblTransID = void 0;
                        _lblItemSerialNo = void 0;
                        if (!(this.editChargeData != null && this.editChargeData != undefined)) return [3 /*break*/, 4];
                        _lblTransID = this.editChargeData.TRANSACTION_ID.toString();
                        _lblPatientID = this.editChargeData.PATIENT_NAME;
                        _txtPatientID = this.editChargeData.PATIENT_ID;
                        _txtAccID = this.editChargeData.ACCOUNT_ID;
                        _txtDateTime = this.convertDateFormate(this.editChargeData.CAPTURE_DATE_TIME);
                        _txtExamID = this.editChargeData.EXAM_ID;
                        _txtComments = this.editChargeData.COMMENTS;
                        if (_txtDateTime == null || _txtDateTime == '') {
                            this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Date of Service.' });
                            return [2 /*return*/];
                        }
                        else {
                            reg = /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/;
                            if (reg.test(_txtDateTime) == false) {
                                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Date of Service.' });
                                return [2 /*return*/];
                            }
                        }
                        if (Date.parse(this.convertDateFormate(_txtDateTime)) > Date.parse(this.convertDateFormate(this.currentDate))) {
                            this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Date of Service should not be greater than Today's date." });
                            return [2 /*return*/];
                        }
                        if (_txtPatientID == null || _txtPatientID == '') {
                            this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please enter PatientID." });
                            return [2 /*return*/];
                        }
                        _tblChargesHeader = [];
                        _chargesHeader = new VM_POU_CREDIT_HEADER_1.VM_POU_CREDIT_HEADER();
                        _chargesHeader.TRANSACTION_ID = parseInt(_lblTransID);
                        _chargesHeader.PATIENT_ID = _txtPatientID;
                        _chargesHeader.ACCOUNT_ID = _txtAccID;
                        _chargesHeader.EXAM_ID = _txtExamID;
                        _chargesHeader.COMMENTS = _txtComments;
                        _chargesHeader.DATE_TIME = _txtDateTime;
                        _tblChargesHeader.push(_chargesHeader);
                        _tblChargesDetails = [];
                        _ChargesDetails = null;
                        for (i = 0; i < this.editChargeData.DETAILS.length; i++) {
                            _lblItemID = this.editChargeData.DETAILS[i].ITEM_ID;
                            _lblLineNo = this.editChargeData.DETAILS[i].LINE_NO.toString();
                            _lblChargeCode = this.editChargeData.DETAILS[i].CHARGE_CODE;
                            _txtChargeCode = this.editChargeData.DETAILS[i].CHARGE_CODE;
                            _txtItemCount = this.editChargeData.DETAILS[i].ITEM_COUNT;
                            _txtItemPrice = this.editChargeData.DETAILS[i].ITEM_PRICE;
                            _lblItemSerialNo = this.editChargeData.DETAILS[i].ITEM_SRNUMBER;
                            if (_txtItemCount == null || _txtItemCount == '') {
                                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter Quantity.' });
                                return [2 /*return*/];
                            }
                            if (parseFloat(_txtItemCount) > parseFloat(this.strMaxAllowQty)) {
                                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Quantity must not be greater than max allowable quantity' });
                                return [2 /*return*/];
                            }
                            if (_lblItemSerialNo != null && _lblItemSerialNo != '') {
                                if (parseInt(_txtItemCount) > 1) {
                                    this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Quantity must not be greater than 1.' });
                                    return [2 /*return*/];
                                }
                            }
                            if (_txtItemPrice != null && _txtItemPrice != '') {
                                reg = /^(\+?((([0-9]+(\.)?)|([0-9]*\.[0-9]+))([eE][+-]?[0-9]+)?))$/;
                                if (reg.test(_txtItemPrice) == false) {
                                    this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Price.' });
                                    return [2 /*return*/];
                                }
                            }
                            _ChargesDetails = new VM_POU_CREDIT_DETAILS_1.VM_POU_CREDIT_DETAILS();
                            _ChargesDetails.ITEM_ID = _lblItemID;
                            _ChargesDetails.LINE_NO = parseInt(_lblLineNo);
                            _ChargesDetails.ITEM_COUNT = _txtItemCount;
                            _ChargesDetails.CHARGE_CODE = _txtChargeCode;
                            _ChargesDetails.ITEM_PRICE = _txtItemPrice;
                            _tblChargesDetails.push(_ChargesDetails);
                        }
                        dicDataItems = null;
                        dicDataItems = { "CHARGES_HEADER": _tblChargesHeader, "CHARGES_DETAILS": _tblChargesDetails };
                        return [4 /*yield*/, this.reviewCreditsService.updateCharges(this.editChargeData.TRANSACTION_ID, dicDataItems)
                                .then(function (res) {
                                _this.spinnerService.stop();
                                var data = res.json();
                                _this.statusCode = data.StatusCode;
                            })];
                    case 1:
                        _a.sent();
                        if (!(this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK)) return [3 /*break*/, 2];
                        this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Failed to Update the Charges Details' });
                        return [2 /*return*/];
                    case 2: return [4 /*yield*/, this.bindChargesGrid()];
                    case 3:
                        _a.sent();
                        this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Updated Successfully' });
                        //this.pageForm = true;
                        //this.editChargeForm = false;
                        //this.addChargeForm = false;
                        //this.editChargeData = null;
                        return [2 /*return*/];
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        ex_19 = _a.sent();
                        this.clientErrorMsg(ex_19);
                        return [3 /*break*/, 7];
                    case 6:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ReviewChargesCreditsComponent.prototype.onChargeGoBackClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_20;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.breadCrumbMenu.SUB_MENU_NAME = '';
                        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        this.spinnerService.start();
                        this.pageForm = true;
                        this.addChargeForm = false;
                        this.editChargeForm = false;
                        this.editChargeData = null;
                        this.activeTab = 'Charges';
                        return [4 /*yield*/, this.bindChargesGrid()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        ex_20 = _a.sent();
                        this.clientErrorMsg(ex_20);
                        return [3 /*break*/, 5];
                    case 4:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ReviewChargesCreditsComponent.prototype.ddItemIDChanged = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var strLotId, strSerialId, strChargeCode, dsFilterItems, ex_21;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.selectedItemID === "Select Item" || this.selectedItemID == undefined) {
                            this.disableButton = true;
                            this.txtItemIDStatus = 1;
                            return [2 /*return*/];
                        }
                        else {
                            this.txtItemIDStatus = 0;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 6]);
                        this.spinnerService.start();
                        strLotId = '';
                        strSerialId = '';
                        strChargeCode = '';
                        this.disableButton = false;
                        if (!(this.selectedItemID != null && this.selectedItemID != '' && this.selectedItemID != 'Select Item')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.dsDeptItems.filter(function (x) { return x.ITEM_ID == _this.selectedItemID; })];
                    case 2:
                        dsFilterItems = _a.sent();
                        if (dsFilterItems.length > 0) {
                            strLotId = dsFilterItems[0].LOT_CONTROLLED;
                            strSerialId = dsFilterItems[0].SERIAL_CONTROLLED;
                            strChargeCode = dsFilterItems[0].CHARGE_CODE;
                        }
                        this.chargeNewItem.CHARGE_CODE = strChargeCode;
                        this.chargeNewItem.ITEM_LOTNUMBER = "";
                        this.chargeNewItem.ITEM_SRNUMBER = "";
                        if (strLotId == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y]) {
                            this.showTxtLotNumber = true;
                        }
                        else {
                            this.showTxtLotNumber = false;
                        }
                        if (strSerialId == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y]) {
                            this.showTxtSerNumber = true;
                        }
                        else {
                            this.showTxtSerNumber = false;
                        }
                        _a.label = 3;
                    case 3: return [3 /*break*/, 6];
                    case 4:
                        ex_21 = _a.sent();
                        this.clientErrorMsg(ex_21);
                        return [3 /*break*/, 6];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ReviewChargesCreditsComponent.prototype.onChargeItemSaveClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _DS, strItemId_1, strQty, strLotId, strSerId, strchargecode, strprice, StrLineNo, intLineNo_1, strTransactionId_1, dsItems, filterItems, isDuplicateExists, strDescription, reg, reg, reg, reg, reg, filterDetails, i, _drItemId, savedata_1, ex_22;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 11, 12, 13]);
                        this.spinnerService.start();
                        this.statusCode = -1;
                        this.msgs = [];
                        _DS = [];
                        strQty = void 0;
                        strLotId = void 0;
                        strSerId = void 0;
                        strchargecode = void 0;
                        strprice = void 0;
                        StrLineNo = void 0;
                        dsItems = [];
                        filterItems = [];
                        return [4 /*yield*/, JSON.parse(sessionStorage.getItem('_DS'))];
                    case 1:
                        _DS = (_a.sent());
                        dsItems = JSON.parse(sessionStorage.getItem('dsItems'));
                        isDuplicateExists = false;
                        if (!(this.chargeNewItem != null && this.chargeNewItem != undefined)) return [3 /*break*/, 10];
                        strQty = this.chargeNewItem.ITEM_COUNT;
                        strItemId_1 = this.selectedItemID;
                        strLotId = this.chargeNewItem.ITEM_LOTNUMBER;
                        strSerId = this.chargeNewItem.ITEM_SRNUMBER;
                        strchargecode = this.chargeNewItem.CHARGE_CODE;
                        strprice = this.chargeNewItem.ITEM_PRICE;
                        strTransactionId_1 = this.addChargeData.TRANSACTION_ID.toString();
                        strDescription = void 0;
                        if (this.selectedItemID == '' || this.selectedItemID == 'Select ItemID' || this.selectedItemID == null) {
                            this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Select Item ID' });
                            return [2 /*return*/];
                        }
                        if (strQty != null && strQty != '') {
                            reg = /((\d+)((\.\d{1,2})?))$/;
                            if (reg.test(strQty) == false) {
                                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Valid Quantity' });
                                return [2 /*return*/];
                            }
                        }
                        if (strLotId != null && strLotId != '') {
                            reg = /^[a-zA-Z0-9_-]+$/;
                            if (reg.test(strLotId) == false) {
                                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Valid Lot Number' });
                                return [2 /*return*/];
                            }
                        }
                        if (strSerId != null && strSerId != '') {
                            reg = /^[a-zA-Z0-9_-]+$/;
                            if (reg.test(strSerId) == false) {
                                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Valid Serial Number' });
                                return [2 /*return*/];
                            }
                        }
                        if (strchargecode != null && strchargecode != '') {
                            reg = /^[a-zA-Z0-9_-]+$/;
                            if (reg.test(strchargecode) == false) {
                                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Valid Charge Code' });
                                return [2 /*return*/];
                            }
                        }
                        if (strprice != null && strprice != '') {
                            reg = /^(\+?((([0-9]+(\.)?)|([0-9]*\.[0-9]+))([eE][+-]?[0-9]+)?))$/;
                            if (reg.test(strprice) == false) {
                                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Valid Price' });
                                return [2 /*return*/];
                            }
                        }
                        return [4 /*yield*/, dsItems.filter(function (x) { return x.ITEM_ID == _this.selectedItemID; })[0].ITEM_DESCRIPTION];
                    case 2:
                        strDescription = _a.sent();
                        if (strQty == '' || strQty == null) {
                            strQty = '0';
                        }
                        if (strprice == '' || strprice == null) {
                            strprice = '0';
                        }
                        if (!(strTransactionId_1 != null && strTransactionId_1 != '' && strItemId_1 != '' && strItemId_1 != null)) return [3 /*break*/, 5];
                        return [4 /*yield*/, _DS.filter(function (x) { return x.TRANSACTION_ID == parseInt(strTransactionId_1); })];
                    case 3:
                        filterItems = _a.sent();
                        if (!(filterItems.length > 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, filterItems[0].DETAILS.filter(function (x) { return x.ITEM_ID == strItemId_1; })];
                    case 4:
                        filterDetails = _a.sent();
                        if (filterDetails.length > 0) {
                            for (i = 0; i < filterDetails.length; i++) {
                                //filterDetails.forEach(detail => {
                                if (strLotId != '' && strLotId != null && strSerId != '' && strSerId != null) {
                                    if (filterDetails[i].ITEM_LOTNUMBER == strLotId && filterDetails[i].ITEM_SRNUMBER == strSerId) {
                                        isDuplicateExists = true;
                                        break;
                                    }
                                    else {
                                        isDuplicateExists = false;
                                    }
                                }
                                else if (strLotId != '' && strLotId != null) {
                                    if (filterDetails[i].ITEM_LOTNUMBER == strLotId) {
                                        isDuplicateExists = true;
                                        break;
                                    }
                                    else {
                                        isDuplicateExists = false;
                                    }
                                }
                                else if (strSerId != '' && strSerId != null) {
                                    if (filterDetails[i].ITEM_SRNUMBER == strSerId) {
                                        isDuplicateExists = true;
                                        break;
                                    }
                                    else {
                                        isDuplicateExists = false;
                                    }
                                }
                                else if (strLotId == '' || strLotId == null || strSerId == '' || strSerId == null) {
                                    isDuplicateExists = true;
                                    break;
                                }
                                //});
                            }
                        }
                        if (isDuplicateExists) {
                            this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Item already exists' });
                            return [2 /*return*/];
                        }
                        _a.label = 5;
                    case 5: return [4 /*yield*/, dsItems.filter(function (x) { return x.ITEM_ID == strItemId_1; })];
                    case 6:
                        _drItemId = _a.sent();
                        if (_drItemId.length == 0) {
                            this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please Select Item ID' });
                            return [2 /*return*/];
                        }
                        if (_drItemId[0].LOT_CONTROLLED == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y.toString()]) {
                            if (strLotId == '' || strLotId == null) {
                                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter Lot Number' });
                                return [2 /*return*/];
                            }
                        }
                        if (_drItemId[0].SERIAL_CONTROLLED == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y.toString()]) {
                            if (strSerId == '' || strSerId == null) {
                                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter Serial Number' });
                                return [2 /*return*/];
                            }
                        }
                        if (_drItemId[0].LOT_CONTROLLED == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y.toString()] && _drItemId[0].SERIAL_CONTROLLED == AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y.toString()]) {
                            if ((strLotId == '' || strLotId == null) && (strSerId == '' || strSerId == null)) {
                                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Please enter Serial Number and Lot Number' });
                                return [2 /*return*/];
                            }
                        }
                        intLineNo_1 = 0;
                        if (!(filterItems.length > 0)) return [3 /*break*/, 8];
                        return [4 /*yield*/, filterItems[0].DETAILS.forEach(function (detail) {
                                if (intLineNo_1 < detail.LINE_NO) {
                                    intLineNo_1 = detail.LINE_NO;
                                }
                            })];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        intLineNo_1 += 1;
                        return [4 /*yield*/, this.reviewCreditsService.insertPouChargeCaptureDetails(strTransactionId_1, strItemId_1, strDescription, strLotId, strSerId, strchargecode, strprice, intLineNo_1, strQty)
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                savedata_1 = res.json();
                                if (savedata_1.StatusCode == AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                    //await this.bindChargesGrid();
                                    _this.msgs = [];
                                    _this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: 'Saved Successfully' });
                                    _this.selectedItemID = "";
                                    _this.chargeNewItem.CHARGE_CODE = "";
                                    _this.chargeNewItem.ITEM_LOTNUMBER = "";
                                    _this.chargeNewItem.ITEM_SRNUMBER = "";
                                    _this.chargeNewItem.ITEM_COUNT = "";
                                    _this.disableButton = true;
                                    //this.pageForm = false;
                                    //this.editChargeForm = false;
                                    //this.addChargeForm = true;
                                }
                                else {
                                    _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: savedata_1.StatusMessage });
                                    _this.selectedItemID = "";
                                    _this.chargeNewItem.CHARGE_CODE = "";
                                    _this.chargeNewItem.ITEM_LOTNUMBER = "";
                                    _this.chargeNewItem.ITEM_SRNUMBER = "";
                                    _this.disableButton = true;
                                    _this.chargeNewItem.ITEM_COUNT = "";
                                }
                            })];
                    case 9:
                        _a.sent();
                        console.log(savedata_1);
                        _a.label = 10;
                    case 10: return [3 /*break*/, 13];
                    case 11:
                        ex_22 = _a.sent();
                        this.clientErrorMsg(ex_22);
                        return [3 /*break*/, 13];
                    case 12:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    ReviewChargesCreditsComponent.prototype.onChargeItemGoBackClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_23;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.breadCrumbMenu.SUB_MENU_NAME = '';
                        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        this.spinnerService.start();
                        this.addChargeData = null;
                        this.chargeNewItem = null;
                        this.addChargeForm = false;
                        this.pageForm = true;
                        this.editChargeForm = false;
                        this.activeTab = 'Charges';
                        return [4 /*yield*/, this.bindChargesGrid()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        ex_23 = _a.sent();
                        this.clientErrorMsg(ex_23);
                        return [3 /*break*/, 5];
                    case 4:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ReviewChargesCreditsComponent.prototype.editCredit = function (credit) {
        return __awaiter(this, void 0, void 0, function () {
            var _dsCreditData, dsCredit, ex_24;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.breadCrumbMenu.SUB_MENU_NAME = 'Update Credits';
                        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, 7, 8]);
                        this.spinnerService.start();
                        this.editCreditData = new VM_POU_CREDIT_HEADER_1.VM_POU_CREDIT_HEADER();
                        _dsCreditData = [];
                        return [4 /*yield*/, JSON.parse(sessionStorage.getItem('CreditDetails'))];
                    case 2:
                        _dsCreditData = (_a.sent());
                        dsCredit = [];
                        return [4 /*yield*/, _dsCreditData.filter(function (x) { return x.TRANSACTION_ID == credit.TRANSACTION_ID; })];
                    case 3:
                        dsCredit = _a.sent();
                        if (!(dsCredit.length > 0)) return [3 /*break*/, 5];
                        this.editCreditData = new VM_POU_CREDIT_HEADER_1.VM_POU_CREDIT_HEADER();
                        this.editCreditData = dsCredit[0];
                        this._lblPatientID = this.editCreditData.PATIENT_ID;
                        return [4 /*yield*/, this.editCreditData.DETAILS.forEach(function (detail) {
                                detail.CREDIT_QTY = '';
                            })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        this.pageForm = false;
                        this.editCreditForm = true;
                        return [3 /*break*/, 8];
                    case 6:
                        ex_24 = _a.sent();
                        this.clientErrorMsg(ex_24);
                        return [3 /*break*/, 8];
                    case 7:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    ReviewChargesCreditsComponent.prototype.onCreditUpdateClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _tblCreditHeader, _tblCreditDetails, _drHeader, _drDetails, _txtPatientID_1, _txtAccID, _txtExamID, _txtComments, _txtItemCredit, _txtChargeCode, _txtDateOfService, _txtItemPrice, _lblItemID, _lblLineNo, _lblPatientID, _lblItemCharge, _lblTransID, i, _dsCredits, ex_25;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        this.spinnerService.start();
                        this.statusCode = -1;
                        this.msgs = [];
                        _tblCreditHeader = [];
                        _tblCreditDetails = [];
                        _drHeader = void 0;
                        _drDetails = void 0;
                        _txtAccID = void 0;
                        _txtExamID = void 0;
                        _txtComments = void 0;
                        _txtItemCredit = void 0;
                        _txtChargeCode = void 0;
                        _txtDateOfService = void 0;
                        _txtItemPrice = void 0;
                        _lblItemID = void 0;
                        _lblLineNo = void 0;
                        _lblPatientID = void 0;
                        _lblItemCharge = void 0;
                        _lblTransID = void 0;
                        if (!(this.editCreditData != null && this.editCreditData != undefined)) return [3 /*break*/, 2];
                        _lblTransID = this.editCreditData.TRANSACTION_ID.toString();
                        _lblPatientID = this._lblPatientID;
                        _txtPatientID_1 = this.editCreditData.PATIENT_ID;
                        _txtAccID = this.editCreditData.ACCOUNT_ID;
                        _txtExamID = this.editCreditData.EXAM_ID;
                        _txtComments = this.editCreditData.COMMENTS;
                        _txtDateOfService = this.convertDateFormate(this.editCreditData.CAPTURE_DATE_TIME);
                        if (Date.parse(this.convertDateFormate(_txtDateOfService)) > Date.parse(this.convertDateFormate(this.currentDate))) {
                            this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Date of Service should not be greater than Today's date." });
                            return [2 /*return*/];
                        }
                        if (_txtPatientID_1 == '' || _txtPatientID_1 == null) {
                            this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please enter PatientID." });
                            return [2 /*return*/];
                        }
                        _drHeader = new VM_POU_CREDIT_HEADER_1.VM_POU_CREDIT_HEADER();
                        _drHeader.TRANSACTION_ID = parseInt(_lblTransID);
                        _drHeader.PATIENT_ID = _txtPatientID_1;
                        _drHeader.ACCOUNT_ID = _txtAccID;
                        _drHeader.EXAM_ID = _txtExamID;
                        _drHeader.COMMENTS = _txtComments;
                        _drHeader.DATE_OF_SERVICE = _txtDateOfService;
                        if (_lblPatientID.trim() != _txtPatientID_1.trim()) {
                            _drHeader.PATIENTID_CHANGED = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y];
                        }
                        else {
                            _drHeader.PATIENTID_CHANGED = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N];
                        }
                        _tblCreditHeader.push(_drHeader);
                        for (i = 0; i < this.editCreditData.DETAILS.length; i++) {
                            _drDetails = new VM_POU_CREDIT_DETAILS_1.VM_POU_CREDIT_DETAILS();
                            _lblItemID = this.editCreditData.DETAILS[i].ITEM_ID;
                            _lblLineNo = this.editCreditData.DETAILS[i].LINE_NO.toString();
                            _lblItemCharge = this.editCreditData.DETAILS[i].BILLED_QTY;
                            _txtItemCredit = this.editCreditData.DETAILS[i].CREDIT_QTY;
                            _txtChargeCode = this.editCreditData.DETAILS[i].CHARGE_CODE;
                            _txtItemPrice = this.editCreditData.DETAILS[i].ITEM_PRICE;
                            if (_txtItemPrice == '' || _txtItemPrice == null) {
                                this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please enter valid Price." });
                                return [2 /*return*/];
                            }
                            if (_txtItemCredit != '' && _txtItemCredit != null) {
                                if (parseFloat(_txtItemCredit) > parseFloat(_lblItemCharge)) {
                                    this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Credit Qty should be less than or equal to Charge Qty." });
                                    return [2 /*return*/];
                                }
                                if (parseFloat(_txtItemCredit) > parseFloat(this.strMaxAllowQty)) {
                                    this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Quantity must not be greater than max allowable quantity" });
                                    return [2 /*return*/];
                                }
                                if (parseFloat(_txtItemCredit) > 0) {
                                    _drDetails.CREDIT_CHANGED = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.Y];
                                }
                                else {
                                    _drDetails.CREDIT_CHANGED = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N];
                                }
                            }
                            else {
                                _drDetails.CREDIT_CHANGED = AtParEnums_1.YesNo_Enum[AtParEnums_1.YesNo_Enum.N];
                            }
                            _drDetails.ITEM_ID = _lblItemID;
                            _drDetails.LINE_NO = parseInt(_lblLineNo);
                            _drDetails.ITEM_COUNT = _txtItemCredit;
                            _drDetails.CHARGE_CODE = _txtChargeCode;
                            _drDetails.ITEM_PRICE = _txtItemPrice;
                            _tblCreditDetails.push(_drDetails);
                        }
                        _dsCredits = { "CREDIT_HEADER": _tblCreditHeader, "CREDIT_DETAILS": _tblCreditDetails };
                        //let data: any;
                        return [4 /*yield*/, this.reviewCreditsService.updateCredits(_dsCredits)
                                .catch(this.httpService.handleError)
                                .then(function (res) {
                                _this.updateData = res.json();
                                _this.statusCode = _this.updateData.StatusCode;
                                if (_this.updateData != undefined) {
                                    if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.S_FAILEDTOCREDITOLDPATIENT) {
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Failed to Credit to the Patient :" + _txtPatientID_1 });
                                        return;
                                    }
                                    else if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.S_FAILEDTOCREDITNEWPATIENT) {
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Failed to Credit to the Patient :" + _txtPatientID_1 });
                                        return;
                                    }
                                    else if (_this.statusCode == AtParStatusCodes_1.AtparStatusCodes.S_FAILEDTOCHARGE) {
                                        _this.msgs.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Failed to Charge to the Patient :" + _txtPatientID_1 });
                                        return;
                                    }
                                    else if (_this.statusCode != AtParStatusCodes_1.AtparStatusCodes.ATPAR_OK) {
                                        _this.msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: "Failed to Update the Credit Details" });
                                        return;
                                    }
                                    else {
                                        //await this.bindCreditsGrid();
                                        //this.pageForm = true;
                                        //this.editCreditForm = false;
                                        //this.editCreditData = null;
                                        _this.msgs.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: "Updated Successfully" });
                                        return;
                                    }
                                }
                            })];
                    case 1:
                        //let data: any;
                        _a.sent();
                        _a.label = 2;
                    case 2: return [3 /*break*/, 5];
                    case 3:
                        ex_25 = _a.sent();
                        this.clientErrorMsg(ex_25);
                        return [3 /*break*/, 5];
                    case 4:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ReviewChargesCreditsComponent.prototype.onCreditGoBackClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_26;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.breadCrumbMenu.SUB_MENU_NAME = '';
                        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        this.spinnerService.start();
                        this.pageForm = true;
                        this.editCreditForm = false;
                        this.editCreditData = null;
                        this.activeTab = 'Credits';
                        return [4 /*yield*/, this.bindCreditsGrid()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        ex_26 = _a.sent();
                        this.clientErrorMsg(ex_26);
                        return [3 /*break*/, 5];
                    case 4:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ReviewChargesCreditsComponent.prototype.onExportToExcelClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, blob, ex_27;
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
                            file_saver_1.saveAs(blob, "POUReviewChargesCreditsReport.xls");
                            //var ua = window.navigator.userAgent;
                            //var msie = ua.indexOf("MSIE ");
                            //// If Internet Explorer
                            //if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
                            //this.statusCode = -1;
                            //let folderName: string = '';
                            //await this.commonService.exportToExcel(html, "POU_Review_Charges_", "POUReviewChargesCreditsReport")
                            //    .then((res: Response) => {
                            //        let data = res.json();
                            //        this.statusCode = data.StatusCode;
                            //        if (this.statusCode.toString() == AtparStatusCodes.ATPAR_OK.toString()) {
                            //            folderName = data.DataVariable.toString();
                            //            var filename = this.httpService.BaseUrl + '/Uploaded/' + folderName + '/POUReviewChargesCreditsReport.xls';
                            //            var query = '?download';
                            //            window.open(filename + query,'_self');
                            //        }
                            //        else {
                            //            this.msgs = [];
                            //            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Internal Server Error.' });
                            //        }
                            //    });
                            //await this.commonService.deleteExcel(folderName, "POUReviewChargesCreditsReport")
                            //    .then((res: Response) => {
                            //    });
                            //}
                            //else {
                            //var a = document.createElement('a');
                            //var data_type = 'data:application/vnd.ms-excel';
                            //html = html.replace(/ /g, '%20');
                            //a.href = data_type + ', ' + html;
                            //a.setAttribute('target', '_self');
                            //a.download = 'POUReviewChargesCreditsReport.xls';
                            //a.click();
                            // }
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        ex_27 = _a.sent();
                        this.clientErrorMsg(ex_27);
                        return [3 /*break*/, 4];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ReviewChargesCreditsComponent.prototype.onPrintClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var html, mywindow, ex_28;
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
                            mywindow.document.write('<html><head><title>' + 'Point Of Use - Review charges/credits' + '</title>');
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
                        ex_28 = _a.sent();
                        this.clientErrorMsg(ex_28);
                        return [2 /*return*/, false];
                    case 3:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ReviewChargesCreditsComponent.prototype.onSendMailIconClick = function (event) {
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
    ReviewChargesCreditsComponent.prototype.onSendMailClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var html, toAddr, ex_29;
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
                        return [4 /*yield*/, this.commonService.sendEmbeddedEmail(this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.SystemId], 'Review Charges/Credits Report', JSON.stringify(html), this.toMailAddr, '', 'false', AtParEnums_1.MailPriority.Normal.toString(), '')
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
                        ex_29 = _a.sent();
                        this.clientErrorMsg(ex_29);
                        return [3 /*break*/, 6];
                    case 5:
                        this.spinnerService.stop();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ReviewChargesCreditsComponent.prototype.exportReportDetails = function (reqType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var htmlBuilder, sbMailText, _strFrmDt, _strToDt, _DS, imgserverPath, title, ex_30;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        htmlBuilder = '';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 11, , 12]);
                        this.statusCode = -1;
                        this.msgs = [];
                        sbMailText = void 0;
                        _strFrmDt = void 0;
                        _strToDt = void 0;
                        _DS = [];
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
                        if (!(this.activeTab == 'Charges')) return [3 /*break*/, 6];
                        return [4 /*yield*/, JSON.parse(sessionStorage.getItem('_DS'))];
                    case 4:
                        _DS = (_a.sent());
                        htmlBuilder = "<Table align=left width=90% cellpadding=0 cellspacing = 0 vAlign=top>";
                        if (reqType == 'Print') {
                            htmlBuilder += "<TR width='100%'><td   colspan=2 align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td><td align=left  width='85%' height=63 nowrap><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>"
                                + "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                                + "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                                + "<tr><td colspan=5 align=left><span class=c2><b> Review Charges Report of the Department " + this.selectedDept + " between " + this.convertDateFormate(this.fromDate) + " and " + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp;";
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
                                + "<tr><td colspan=3 align=left><span class=c2><b> Review Charges Report of the Department " + this.selectedDept + " between " + this.convertDateFormate(this.fromDate) + " and " + this.convertDateFormate(this.toDate) + " </b></span></td><td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                            + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                            + "<tr bgcolor=#d3d3d3>"
                            + "<td align=center width=20% nowrap><span class=c3><b>Date Of Service(MM/DD/YYYY)</b></span></td>"
                            + "<td align=center width=15% nowrap><span class=c3><b>Patient ID / Name</b></span></td>"
                            + "<td align=center width=15% nowrap><span class=c3><b>User ID</b></span></td>"
                            + "<td align=center width=10% nowrap><span class=c3><b>Account ID</b></span></td>"
                            + "<td align=center width=10% nowrap><span class=c3><b>Exam ID</b></span></td>"
                            + "<td align=center width=20% nowrap><span class=c3><b>Comments</b></span></td>"
                            + "<td align=center width=10% nowrap><span class=c3><b>Department</b></span></td>"
                            + "</tr>";
                        return [4 /*yield*/, _DS.forEach(function (header) {
                                htmlBuilder += "<tr>"
                                    + "<td align=left nowrap><span class=c3>" + header.CAPTURE_DATE_TIME + "</span></td>"
                                    + "<td align=left nowrap><span class=c3>" + header.PATIENT_NAME + "</span></td>"
                                    + "<td align=left nowrap><span class=c3>" + header.USER_ID + "</span></td>"
                                    + "<td align=left nowrap><span class=c3>" + header.ACCOUNT_ID + "</span></td>"
                                    + "<td align=left nowrap><span class=c3>" + header.EXAM_ID + "</span></td>"
                                    + "<td align=left ><span class=c3>" + header.COMMENTS + "</span></td>"
                                    + "<td align=left nowrap><span class=c3>" + header.DEPARTMENT_ID + "</span></td>"
                                    + "</tr>";
                                if (header.DETAILS.length > 0) {
                                    htmlBuilder += "<tr>"
                                        + "<td colspan=7>"
                                        + "<table align=center width=90% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                                        + "<tr bgcolor=#E0E0E0>"
                                        + "<td align=center nowrap width=15%><span class=c3><b>Item ID</b></span></td>"
                                        + "<td align=center nowrap width=8%><span class=c3><b>LineNo</b></span></td>"
                                        + "<td align=center nowrap width=21%><span class=c3><b>Description</b></span></td>"
                                        + "<td align=center nowrap width=10%><span class=c3><b>Quantity</b></span></td>"
                                        + "<td align=center nowrap width=12%><span class=c3><b>Lot Number</b></span></td>"
                                        + "<td align=center nowrap width=12%><span class=c3><b>Serial Number</b></span></td>"
                                        + "<td align=center nowrap width=12%><span class=c3><b>Charge Code</b></span></td>"
                                        + "<td align=center nowrap width=10%><span class=c3><b>Price</b></span></td>"
                                        + "</tr>";
                                    header.DETAILS.forEach(function (detail) {
                                        htmlBuilder += "<tr>"
                                            + "<td align=left nowrap style='mso-number-format:\@;'><span class=c3>" + detail.ITEM_ID + "</span></td>"
                                            + "<td align=right nowrap><span class=c3>" + detail.LINE_NO + "</span></td>"
                                            + "<td align=left ><span class=c3>" + detail.ITEM_DESCRIPTION + "</span></td>"
                                            + "<td align=right nowrap style='mso-number-format:\@;'><span class=c3>" + detail.ITEM_COUNT + "</span></td>";
                                        if (detail.ITEM_LOTNUMBER != '' && detail.ITEM_LOTNUMBER != null) {
                                            htmlBuilder += "<td align=left nowrap><span class=c3>" + detail.ITEM_LOTNUMBER + "</span></td>";
                                        }
                                        else {
                                            htmlBuilder += "<td align=left nowrap><span class=c3></span></td>";
                                        }
                                        if (detail.ITEM_SRNUMBER != '' && detail.ITEM_SRNUMBER != null) {
                                            htmlBuilder += "<td align=left nowrap><span class=c3>" + detail.ITEM_SRNUMBER + "</span></td>";
                                        }
                                        else {
                                            htmlBuilder += "<td align=left nowrap><span class=c3></span></td>";
                                        }
                                        if (detail.CHARGE_CODE != '' && detail.CHARGE_CODE != null) {
                                            htmlBuilder += "<td align=right nowrap style='mso-number-format:\@;'><span class=c3>" + detail.CHARGE_CODE + "</span></td>";
                                        }
                                        else {
                                            htmlBuilder += "<td align=right nowrap><span class=c3></span></td>";
                                        }
                                        htmlBuilder += "<td align=right nowrap style='mso-number-format:\@;'><span class=c3>" + detail.ITEM_PRICE + "</span></td>";
                                        htmlBuilder += "</tr>";
                                    });
                                    htmlBuilder += "</table>"
                                        + "</td>"
                                        + "</tr>";
                                }
                            })];
                    case 5:
                        _a.sent();
                        htmlBuilder += "</table></Table>";
                        return [3 /*break*/, 9];
                    case 6:
                        if (!(this.activeTab == 'Credits')) return [3 /*break*/, 9];
                        return [4 /*yield*/, JSON.parse(sessionStorage.getItem('CreditDetails'))];
                    case 7:
                        _DS = (_a.sent());
                        htmlBuilder += "<Table align=left width=90% cellpadding=0 cellspacing = 0 vAlign=top>";
                        if (reqType == 'Print') {
                            htmlBuilder += "<TR width='100%'><td   colspan=2 align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td><td align=left  width='85%' height=63 nowrap><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>"
                                + "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                                + "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                                + "<tr><td colspan=5 align=left><span class=c2><b> Review Credits Report of the Department " + this.selectedDept + " between " + this.convertDateFormate(this.fromDate) + " and " + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp;";
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
                                + "<tr><td colspan=3 align=left><span class=c2><b> Review Credits Report of the Department " + this.selectedDept + " between " + this.convertDateFormate(this.fromDate) + " and " + this.convertDateFormate(this.toDate) + " </b></span></td><td align=right valign=top>&nbsp;";
                        }
                        htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                            + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                            + "<tr bgcolor=#d3d3d3>"
                            + "<td align=center width=20% nowrap><span class=c3><b>Date Of Service(MM/DD/YYYY)</b></span></td>"
                            + "<td align=center width=15% nowrap><span class=c3><b>Patient ID / Name</b></span></td>"
                            + "<td align=center width=15% nowrap><span class=c3><b>User ID</b></span></td>"
                            + "<td align=center width=10% nowrap><span class=c3><b>Account ID</b></span></td>"
                            + "<td align=center width=10% nowrap><span class=c3><b>Exam ID</b></span></td>"
                            + "<td align=center width=20% nowrap><span class=c3><b>Comments</b></span></td>"
                            + "<td align=center width=10% nowrap><span class=c3><b>Department</b></span></td>"
                            + "</tr>";
                        return [4 /*yield*/, _DS.forEach(function (header) {
                                htmlBuilder += "<tr>"
                                    + "<td align=left nowrap><span class=c3>" + header.CAPTURE_DATE_TIME + "</span></td>"
                                    + "<td align=left nowrap><span class=c3>" + header.PATIENT_NAME + "</span></td>"
                                    + "<td align=left nowrap><span class=c3>" + header.USER_ID + "</span></td>"
                                    + "<td align=left nowrap><span class=c3>" + header.ACCOUNT_ID + "</span></td>"
                                    + "<td align=left nowrap><span class=c3>" + header.EXAM_ID + "</span></td>"
                                    + "<td align=left ><span class=c3>" + header.COMMENTS + "</span></td>";
                                htmlBuilder += "<td align=left nowrap><span class=c3>" + header.DEPARTMENT_ID + "</span></td>";
                                htmlBuilder += "</tr>";
                                if (header.DETAILS.length > 0) {
                                    htmlBuilder += "<tr>"
                                        + "<td colspan=7>"
                                        + "<table align=center width=90% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                                        + "<tr bgcolor=#E0E0E0>"
                                        + "<td align=center nowrap width=15%><span class=c3><b>Item ID</b></span></td>"
                                        + "<td align=center nowrap width=8%><span class=c3><b>LineNo</b></span></td>"
                                        + "<td align=center nowrap width=15%><span class=c3><b>Description</b></span></td>"
                                        + "<td align=center nowrap  width=16%><span class=c3>"
                                        + "<table width=100% border=0 ><tr> <td align=center colspan =3>"
                                        + "<span class=c2><b><u>Quantity</u><br /></span></td></tr><tr><td align=left style=width:33.33%>"
                                        + "<span class=c2><b><u>Issue</u><br /></span></td><td align=center style=width:33.33%><span class=c2><b><u>Charge</u><br /></span>"
                                        + "</td><td align=right style=width:33.33%><span class=c2><b><u>Credit</u><br /></span></tr></td></table></span></td>"
                                        + "<td align=center nowrap width=12%><span class=c3><b>Lot Number</b></span></td>"
                                        + "<td align=center nowrap width=12%><span class=c3><b>Serial Number</b></span></td>"
                                        + "<td align=center nowrap width=12%><span class=c3><b>Charge Code</b></span></td>"
                                        + "<td align=center width=10% ><span class=c3><b>Price</b></span></td>"
                                        + "</tr>";
                                    header.DETAILS.forEach(function (detail) {
                                        htmlBuilder += "<tr>"
                                            + "<td align=left nowrap style='mso-number-format:\@;' ><span class=c3>" + detail.ITEM_ID + "</span></td>"
                                            + "<td align=right nowrap><span class=c3>" + detail.LINE_NO + "</span></td>"
                                            + "<td align=left><span class=c3>" + detail.ITEM_DESCRIPTION + "</span></td>";
                                        if (detail.BILLED_QTY == null || detail.BILLED_QTY == '' || detail.BILLED_QTY == undefined) {
                                            detail.BILLED_QTY = '';
                                        }
                                        if (detail.CREDIT_QTY == null || detail.CREDIT_QTY == '' || detail.CREDIT_QTY == undefined) {
                                            detail.CREDIT_QTY = '';
                                        }
                                        htmlBuilder += "<td align=left nowrap><span class=c3>"
                                            + "<table width=100% border=0><tr>"
                                            + "<td align=right width=33.33% style='mso-number-format:\@;'>" + detail.ITEM_COUNT + "</td>"
                                            + "<td align=center width=33.33% style='mso-number-format:\@;'>" + detail.BILLED_QTY + "</td>"
                                            + "<td align=right width=33.33% style='mso-number-format:\@;'>" + detail.CREDIT_QTY + "</td></tr></table>"
                                            + "</span></td>";
                                        if (detail.ITEM_LOTNUMBER != '' && detail.ITEM_LOTNUMBER != null) {
                                            htmlBuilder += "<td align=left nowrap><span class=c3>" + detail.ITEM_LOTNUMBER + "</span></td>";
                                        }
                                        else {
                                            htmlBuilder += "<td align=left nowrap><span class=c3></span></td>";
                                        }
                                        if (detail.ITEM_SRNUMBER != '' && detail.ITEM_SRNUMBER != null) {
                                            htmlBuilder += "<td align=left nowrap><span class=c3>" + detail.ITEM_SRNUMBER + "</span></td>";
                                        }
                                        else {
                                            htmlBuilder += "<td align=left nowrap><span class=c3></span></td>";
                                        }
                                        if (detail.CHARGE_CODE != '' && detail != null) {
                                            htmlBuilder += "<td align=right nowrap style='mso-number-format:\@;'><span class=c3>" + detail.CHARGE_CODE + "</span></td>";
                                        }
                                        else {
                                            htmlBuilder += "<td align=right nowrap><span class=c3></span></td>";
                                        }
                                        htmlBuilder += "<td align=right style='mso-number-format:\@;' ><span class=c3>" + detail.ITEM_PRICE + "</span></td>";
                                        htmlBuilder += "</tr>";
                                    });
                                    htmlBuilder += "</table>"
                                        + "</td>"
                                        + "</tr>";
                                }
                            })];
                    case 8:
                        _a.sent();
                        htmlBuilder += "</table></Table>";
                        _a.label = 9;
                    case 9: return [4 /*yield*/, htmlBuilder];
                    case 10: return [2 /*return*/, _a.sent()];
                    case 11:
                        ex_30 = _a.sent();
                        htmlBuilder = '';
                        return [2 /*return*/, htmlBuilder];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    ReviewChargesCreditsComponent.prototype.convertDateFormate = function (strDate) {
        var date = new Date(strDate), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("/");
    };
    ReviewChargesCreditsComponent.prototype.clientErrorMsg = function (ex) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, ex.toString());
    };
    ReviewChargesCreditsComponent.prototype.OnDestroy = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    ReviewChargesCreditsComponent = __decorate([
        core_1.Component({
            templateUrl: 'pou-review-charges-credits.component.html',
            providers: [
                atpar_common_service_1.AtParCommonService,
                AtParConstants_1.AtParConstants,
                POU_REVIEW_CHARGES_CREDITS_SERVICE_1.ReviewChargesCreditsServices
            ]
        }),
        __metadata("design:paramtypes", [HttpService_1.HttpService,
            atpar_common_service_1.AtParCommonService,
            event_spinner_service_1.SpinnerService,
            POU_REVIEW_CHARGES_CREDITS_SERVICE_1.ReviewChargesCreditsServices,
            AtParConstants_1.AtParConstants])
    ], ReviewChargesCreditsComponent);
    return ReviewChargesCreditsComponent;
}());
exports.ReviewChargesCreditsComponent = ReviewChargesCreditsComponent;
//# sourceMappingURL=pou-review-charges-credits.component.js.map