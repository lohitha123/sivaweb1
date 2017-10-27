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
var api_1 = require("../components/common/api");
var atpar_common_service_1 = require("../Shared/atpar-common.service");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var datatable_1 = require("../components/datatable/datatable");
var AtParEnums_1 = require("../Shared/AtParEnums");
var deliver_assign_signatories_services_1 = require("./deliver-assign-signatories.services");
var AtParEnums_2 = require("../Shared/AtParEnums");
var AtParConstants_1 = require("../Shared/AtParConstants");
var MT_DELV_COST_CENTER_AUTH_PERSON_1 = require("../Entities/MT_DELV_COST_CENTER_AUTH_PERSON");
var routepath_1 = require("../AtPar/Menus/routepath");
var AssignSignatoriesComponent = (function () {
    function AssignSignatoriesComponent(httpService, spinnerService, confirmationService, assignSignatoriesService, commonService, atParConstant) {
        this.httpService = httpService;
        this.spinnerService = spinnerService;
        this.confirmationService = confirmationService;
        this.assignSignatoriesService = assignSignatoriesService;
        this.commonService = commonService;
        this.atParConstant = atParConstant;
        /*Variable Declaration*/
        this.pop = false;
        this.table = false;
        this.form = false;
        this.form2 = false;
        this.filter = true;
        this.deleteToken = false;
        this.editUser = false;
        this.loading = true;
        this.growlMessage = [];
        this.deviceTokenEntry = [];
        this.isEditMode = false;
        this.disableButton = true;
        this.disableButtonUser = true;
        this.tableData = false;
        this.strData = '';
        this.breadCrumbMenu = new routepath_1.Menus();
        this.ven = new MT_DELV_COST_CENTER_AUTH_PERSON_1.MT_DELV_COST_CENTER_AUTH_PERSON();
        this.codes = "";
    }
    AssignSignatoriesComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.growlMessage = [];
                        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
                        this.startIndex = +sessionStorage.getItem("Recordsstartindex");
                        this.EndIndex = +sessionStorage.getItem("RecordsEndindex");
                        this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_1.TokenEntry_Enum.RecordsPerPage];
                        this.newItem = new MT_DELV_COST_CENTER_AUTH_PERSON_1.MT_DELV_COST_CENTER_AUTH_PERSON();
                        return [4 /*yield*/, this.getCodes()];
                    case 1:
                        _a.sent();
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
    /**
     * Auto Complete event for seraching Cost Center
     * @param event
     */
    AssignSignatoriesComponent.prototype.searchAutoCompleteCode = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var query_1;
            return __generator(this, function (_a) {
                try {
                    query_1 = event.query;
                    this.lstDBDataSearch = [];
                    setTimeout(function () {
                        _this.lstDBDataSearch = _this.filterCostCenter(query_1, _this.lstDBDataTotal);
                    }, 50);
                }
                catch (ex) {
                    this.displayCatchException(ex, "searchAutoCompleteCode");
                }
                return [2 /*return*/];
            });
        });
    };
    AssignSignatoriesComponent.prototype.filterCostCenter = function (query, lstDBData) {
        this.growlMessage = [];
        try {
            var filtered = [];
            if (query.length >= 1) {
                for (var i = 0; i < lstDBData.length; i++) {
                    var lstDBDataValue = lstDBData[i];
                    if (lstDBDataValue.COST_CENTER_CODE.toString().toLowerCase().indexOf(query.toString().toLowerCase()) == 0) {
                        filtered.push(lstDBDataValue.COST_CENTER_CODE);
                    }
                }
            }
            return filtered;
        }
        catch (ex) {
            this.displayCatchException(ex, "filterCostCenter");
        }
    };
    AssignSignatoriesComponent.prototype.onMenuSearchKeyPress = function (event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if ((charCode > 31 && charCode <= 47) || (charCode >= 58 && charCode <= 64) || (charCode >= 91 && charCode <= 96) || (charCode >= 123 && charCode <= 126)) {
            this.codes = "";
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Special Characters are not allowed' });
            return false;
        }
    };
    /**
     * This function is called when we click go button
     */
    AssignSignatoriesComponent.prototype.go = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.pop = false;
                        this.form = false;
                        this.form2 = false;
                        this.table = false;
                        this.filter = true;
                        this.isEditMode = false;
                        this.lstDBData = [];
                        this.lstSignDBData = [];
                        this.growlMessage = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.getCodes()];
                    case 2:
                        _a.sent();
                        this.spinnerService.stop();
                        if (this.lstDBData != null && this.lstDBData.length > 0 && this.lstDBData != undefined) {
                            this.pop = true;
                        }
                        if (this.lstDBData.length == 0) {
                            if (this.deleteToken == true) {
                                this.deleteToken = false;
                            }
                            else {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'No Codes(s) Found' });
                            }
                            this.pop = false;
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        ex_2 = _a.sent();
                        this.displayCatchException(ex_2, "go");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Getting Cost Center Codes
     */
    AssignSignatoriesComponent.prototype.getCodes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.assignSignatoriesService.getCodes(this.codes).catch(this.httpService.handleError).then(function (res) {
                                var data = res.json();
                                switch (data.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.lstDBData = data.DataList;
                                        if (_this.codes == '' || _this.codes == undefined || _this.codes == null) {
                                            _this.lstDBDataTotal = data.DataList;
                                        }
                                    }
                                }
                                if (data.StatType != 4) {
                                    _this.commonErrorHandling(data);
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        this.displayCatchException(ex_3, "getCodes");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This function is called when we click on goback
     */
    AssignSignatoriesComponent.prototype.goBack = function () {
        try {
            this.breadCrumbMenu.SUB_MENU_NAME = '';
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.form = false;
            this.form2 = false;
            this.table = false;
            this.filter = true;
            this.isEditMode = false;
            this.pop = false;
            this.growlMessage = [];
        }
        catch (ex) {
            this.displayCatchException(ex, "goBack");
        }
    };
    /**
     * This function is called when we click add button
     */
    AssignSignatoriesComponent.prototype.addCostCenterCode = function () {
        try {
            // this.filter = false;
            this.growlMessage = [];
            if (this.isEditMode == true) {
                if (this.isEditMode) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please  update or cancel before continuing!!!" });
                    return;
                }
                this.disableButton = false;
            }
            else {
                this.disableButton = true;
            }
            this.codes = '';
            this.form = true;
            this.pop = false;
            this.newItem = new MT_DELV_COST_CENTER_AUTH_PERSON_1.MT_DELV_COST_CENTER_AUTH_PERSON();
            this.newItem.COST_CENTER_CODE = "";
        }
        catch (ex) {
            this.displayCatchException(ex, "addCostCenterCode");
        }
    };
    /**
     * This method is for disable submit button untill all basic info is entered
     * @param event
     */
    AssignSignatoriesComponent.prototype.bindModelDataChange = function (event) {
        try {
            if ("Code" == event.TextBoxID.toString()) {
                this.codeStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("userID" == event.TextBoxID.toString()) {
                this.userIDStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("fName" == event.TextBoxID.toString()) {
                this.userNameStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtLastName" == event.TextBoxID.toString()) {
                this.middileNameStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if ("txtMiddleName" == event.TextBoxID.toString()) {
                this.lastNameStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
            }
            if (this.form2 != true) {
                if ((this.codeStatus == 0)) {
                    this.disableButton = false;
                }
                else {
                    this.disableButton = true;
                }
            }
            if (this.form2 == true) {
                if ((this.userIDStatus == 0) && (this.userNameStatus == 0)) {
                    if ((this.middileNameStatus == undefined || this.middileNameStatus == 0) && (this.lastNameStatus == undefined || this.lastNameStatus == 0)) {
                        this.disableButtonUser = false;
                    }
                    else {
                        this.disableButtonUser = true;
                    }
                    // this.disableButtonUser = false;
                }
                else {
                    this.disableButtonUser = true;
                }
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "bindModelDataChange");
        }
    };
    /**
     * This function is called when click on edit button
     * @param costCenterCode
     */
    AssignSignatoriesComponent.prototype.editCostCenterCode = function (costCenterCode) {
        try {
            //this.filter = false;
            this.isEditMode = true;
            this.form = true;
            this.pop = false;
            this.disableButton = false;
            this.newItem = Object.assign({}, costCenterCode);
            this.existingCostCenterCode = costCenterCode.COST_CENTER_CODE;
        }
        catch (ex) {
            this.displayCatchException(ex, "editCostCenterCode");
        }
    };
    /**
     * This function is called when we want to update the Cost Center Code
     */
    AssignSignatoriesComponent.prototype.updateSignatoryCode = function () {
        var _this = this;
        try {
            this.assignSignatoriesService.updateAuthSign(this.newItem.COST_CENTER_CODE, this.existingCostCenterCode).forEach(function (resp) {
                switch (resp.StatType) {
                    case AtParEnums_2.StatusType.Success: {
                        _this.growlMessage = [];
                        var msg = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", 'Cost Center Code').replace("2%", _this.newItem.COST_CENTER_CODE);
                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: msg });
                        _this.isEditMode = true;
                        _this.form = true;
                        break;
                    }
                }
                _this.commonErrorHandling(resp);
            });
        }
        catch (ex) {
            this.displayCatchException(ex, "updateSignatoryCode");
        }
    };
    /**
     * This function is called when we click on save button when adding cost code
     */
    AssignSignatoriesComponent.prototype.saveSignatoryCode = function () {
        try {
            this.form = false;
            if (this.isEditMode) {
                this.updateSignatoryCode();
            }
            else {
                this.assignSignatories(this.newItem);
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "saveSignatoryCode");
        }
    };
    /**
     * This function is called when we want to insert user information for particular cost code
     */
    AssignSignatoriesComponent.prototype.saveAuthSignatoryCode = function () {
        var _this = this;
        try {
            this.assignSignatoriesService.addAuthSign(this.newItem.COST_CENTER_CODE, this.newItem.AUTH_USER_ID, this.newItem.FIRST_NAME, this.newItem.LAST_NAME, this.newItem.MIDDLE_NAME).forEach(function (resp) {
                switch (resp.StatType) {
                    case AtParEnums_2.StatusType.Success: {
                        _this.growlMessage = [];
                        var msg = '';
                        // if (this.newItem.AUTH_USER_ID != null || this.newItem.AUTH_USER_ID !== '') {
                        msg = AtParConstants_1.AtParConstants.Created_Msg.replace("1%", 'Cost Center Code').replace("2%", _this.newItem.COST_CENTER_CODE);
                        //}
                        //else {
                        //    msg = AtParConstants.Created_Msg.replace("1%", 'User ID').replace("2%", this.newItem.AUTH_USER_ID);
                        //}
                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: msg });
                        _this.newItem.AUTH_USER_ID = '';
                        _this.newItem.FIRST_NAME = '';
                        _this.newItem.LAST_NAME = '';
                        _this.newItem.MIDDLE_NAME = '';
                        _this.disableButton = true;
                        _this.disableButtonUser = true;
                        document.getElementById('userID').focus();
                        _this.userIDStatus = 1;
                        _this.userNameStatus = 1;
                        //  this.assignSignatories(this.newItem);
                        break;
                    }
                    case AtParEnums_2.StatusType.Warn: {
                        _this.spinnerService.stop();
                        _this.growlMessage = [];
                        var msg = AtParConstants_1.AtParConstants.AlreadyExist_Msg.replace("1%", 'User ID').replace("2%", _this.newItem.AUTH_USER_ID);
                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: msg });
                        break;
                    }
                    case AtParEnums_2.StatusType.Error: {
                        _this.spinnerService.stop();
                        _this.growlMessage = [];
                        _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                        break;
                    }
                    case AtParEnums_2.StatusType.Custom: {
                        _this.spinnerService.stop();
                        _this.growlMessage = [];
                        _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: resp.StatusMessage });
                        break;
                    }
                }
            });
        }
        catch (ex) {
            this.displayCatchException(ex, "saveAuthSignatoryCode");
        }
    };
    /**
     * This function is called when  getting data of cost center code
     * @param costCenterAuthPerson
     */
    AssignSignatoriesComponent.prototype.assignSignatories = function (costCenterAuthPerson) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.breadCrumbMenu.SUB_MENU_NAME = 'Assign Signatories ';
                        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                        this.form2 = false;
                        this.form = false;
                        this.pop = false;
                        this.filter = false;
                        this.table = true;
                        this.newItem.COST_CENTER_CODE = costCenterAuthPerson.COST_CENTER_CODE;
                        this.lstSignDBData = [];
                        this.editUser = true;
                        if (this.table == true || this.tableData == true) {
                            this.strData = 'Cost Center Code : ' + costCenterAuthPerson.COST_CENTER_CODE;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        this.spinnerService.start();
                        if (!(costCenterAuthPerson == "" || costCenterAuthPerson == null || costCenterAuthPerson == undefined)) return [3 /*break*/, 2];
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: 'Enter Cost Center Code...' });
                        this.spinnerService.stop();
                        return [2 /*return*/];
                    case 2: return [4 /*yield*/, this.assignSignatoriesService.getAuthSign(costCenterAuthPerson.COST_CENTER_CODE).catch(this.httpService.handleError).then(function (res) {
                            var data = res.json();
                            _this.spinnerService.stop();
                            _this.lstSignDBData = data.DataList;
                            switch (data.StatType) {
                                case AtParEnums_2.StatusType.Success: {
                                    if (_this.lstSignDBData != null && _this.lstSignDBData.length > 0) {
                                        _this.tableData = true;
                                    }
                                    else {
                                        _this.growlMessage = [];
                                        _this.tableData = false;
                                        _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        return;
                                    }
                                    for (var i = 0; i < _this.lstSignDBData.length; i++) {
                                        _this.lstSignDBData[i].COST_CENTER_CODE = costCenterAuthPerson.COST_CENTER_CODE;
                                    }
                                    break;
                                }
                                case AtParEnums_2.StatusType.Warn: {
                                    _this.spinnerService.stop();
                                    _this.growlMessage = [];
                                    if (_this.lstSignDBData != null && _this.lstSignDBData.length > 0) {
                                        _this.tableData = true;
                                    }
                                    else {
                                        _this.growlMessage = [];
                                        _this.tableData = false;
                                    }
                                    _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                    break;
                                }
                                case AtParEnums_2.StatusType.Error: {
                                    _this.spinnerService.stop();
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                    break;
                                }
                                case AtParEnums_2.StatusType.Custom: {
                                    _this.spinnerService.stop();
                                    _this.growlMessage = [];
                                    _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                    break;
                                }
                            }
                        })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        ex_4 = _a.sent();
                        this.displayCatchException(ex_4, "assignSignatories");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Common Error Handlingh Method
     * @param data
     */
    AssignSignatoriesComponent.prototype.commonErrorHandling = function (data) {
        try {
            switch (data.StatType) {
                case AtParEnums_2.StatusType.Warn: {
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                    break;
                }
                case AtParEnums_2.StatusType.Error: {
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                    break;
                }
                case AtParEnums_2.StatusType.Custom: {
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                    break;
                }
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "commonErrorHandling");
        }
    };
    AssignSignatoriesComponent.prototype.confirmDelete = function (costCenterAuthPerson, isCostCenterCode) {
        var _this = this;
        try {
            this.growlMessage = [];
            this.confirmationService.confirm({
                message: 'Are you sure you want to delete this?',
                accept: function () { _this.deleteSignatories(costCenterAuthPerson, isCostCenterCode); }
            });
        }
        catch (ex) {
            this.displayCatchException(ex, "confirmDelete");
        }
    };
    /**
     * This function is called when we click delete button
     * @param costCenterAuthPerson
     * @param isCostCenterCode
     */
    AssignSignatoriesComponent.prototype.deleteSignatories = function (costCenterAuthPerson, isCostCenterCode) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isEditMode && isCostCenterCode) {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: "Please update or cancel before continuing!!!" });
                            return [2 /*return*/];
                        }
                        if (this.lstDBData.length == 1) {
                            this.deleteToken = true;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.assignSignatoriesService.deleteAuthSign(costCenterAuthPerson.COST_CENTER_CODE, costCenterAuthPerson.AUTH_USER_ID).forEach(function (resp) {
                                switch (resp.StatType) {
                                    case AtParEnums_2.StatusType.Success: {
                                        _this.growlMessage = [];
                                        var msg = '';
                                        var message = "Deleted Successfully";
                                        if (!isCostCenterCode) {
                                            msg = AtParConstants_1.AtParConstants.Deleted_Msg.replace("1%", 'User ID').replace("2%", costCenterAuthPerson.AUTH_USER_ID);
                                            //message = " User ID " + costCenterAuthPerson.AUTH_USER_ID + message;
                                            _this.assignSignatories(costCenterAuthPerson);
                                        }
                                        else {
                                            msg = AtParConstants_1.AtParConstants.Deleted_Msg.replace("1%", 'Cost center code').replace("2%", costCenterAuthPerson.COST_CENTER_CODE);
                                            // message = " Cost center code " + costCenterAuthPerson.COST_CENTER_CODE + message;
                                            _this.go();
                                        }
                                        _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: msg });
                                        break;
                                    }
                                }
                                _this.commonErrorHandling(resp);
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_5 = _a.sent();
                        this.displayCatchException(ex_5, "deleteSignatories");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This function is called when we click on cancel
     */
    AssignSignatoriesComponent.prototype.goCancel = function () {
        this.form = false;
        this.form2 = false;
        this.table = false;
        this.filter = true;
        this.isEditMode = false;
        this.pop = false;
    };
    /**
     * This function is called when we click on add button to add user info
     */
    AssignSignatoriesComponent.prototype.edit = function () {
        try {
            this.disableButtonUser = true;
            this.breadCrumbMenu.SUB_MENU_NAME = 'Add Signatories ';
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.form2 = true;
            this.form = false;
            this.table = false;
            this.pop = false;
            this.newItem.LAST_NAME = '';
            this.newItem.MIDDLE_NAME = '';
            this.growlMessage = [];
            this.userIDStatus = null;
            this.userNameStatus = null;
            setTimeout(function () {
                document.getElementById("userID").focus();
            }, 500);
        }
        catch (ex) {
            this.displayCatchException(ex, "edit");
        }
    };
    /**
     * This function is called when we click on goback
     */
    AssignSignatoriesComponent.prototype.back = function () {
        this.form2 = false;
        this.table = false;
        this.pop = false;
        this.filter = true;
    };
    /**
     * This function is called when we click on Close
     */
    AssignSignatoriesComponent.prototype.close = function () {
        try {
            this.breadCrumbMenu.SUB_MENU_NAME = '';
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.newItem.AUTH_USER_ID = '';
            this.newItem.FIRST_NAME = '';
            this.newItem.LAST_NAME = '';
            this.newItem.MIDDLE_NAME = '';
            this.disableButton = true;
            this.growlMessage = [];
            this.saveSignatoryCode();
        }
        catch (ex) {
            this.displayCatchException(ex, "close");
        }
    };
    /**
  * This method is for displaying catch block error messages
  * @param event
  */
    AssignSignatoriesComponent.prototype.displayCatchException = function (ex, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, ex.toString(), funName, this.constructor.name);
    };
    /**
   * delete all the values from variables
   */
    AssignSignatoriesComponent.prototype.ngOnDestroy = function () {
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.spinnerService.stop();
        this.spinnerService = null;
        this.lstDBData = [];
        this.lstSignDBData = [];
        this.pop = false;
        this.disableButton = true;
        this.form = false;
        this.form2 = false;
        this.filter = true;
    };
    __decorate([
        core_1.ViewChild(datatable_1.DataTable),
        __metadata("design:type", datatable_1.DataTable)
    ], AssignSignatoriesComponent.prototype, "dataTableComponent", void 0);
    AssignSignatoriesComponent = __decorate([
        core_1.Component({
            templateUrl: 'deliver-assign-signatories.component.html',
            providers: [HttpService_1.HttpService, api_1.ConfirmationService, deliver_assign_signatories_services_1.AssignSignatoriesService, atpar_common_service_1.AtParCommonService, AtParConstants_1.AtParConstants]
        }),
        __metadata("design:paramtypes", [HttpService_1.HttpService,
            event_spinner_service_1.SpinnerService,
            api_1.ConfirmationService,
            deliver_assign_signatories_services_1.AssignSignatoriesService,
            atpar_common_service_1.AtParCommonService,
            AtParConstants_1.AtParConstants])
    ], AssignSignatoriesComponent);
    return AssignSignatoriesComponent;
}());
exports.AssignSignatoriesComponent = AssignSignatoriesComponent;
//# sourceMappingURL=deliver-assign-signatories.component.js.map