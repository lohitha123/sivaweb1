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
var http_1 = require("@angular/http");
var MT_ATPAR_APP_1 = require("../../app/Entities/MT_ATPAR_APP");
var vm_mt_atpar_profile_app_parameters_1 = require("../entities/vm_mt_atpar_profile_app_parameters");
var linq_es5_1 = require("linq-es5");
var vm_mt_atpar_profile_app_menus_1 = require("../entities/vm_mt_atpar_profile_app_menus");
var vm_mt_atpar_profile_screen_display_1 = require("../entities/vm_mt_atpar_profile_screen_display");
var MT_ATPAR_SECURITY_AUDIT_1 = require("../Entities/MT_ATPAR_SECURITY_AUDIT");
var AtParEnums_1 = require("../Shared/AtParEnums");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var AtParEnums_2 = require("../Shared/AtParEnums");
var AtParEnums_3 = require("../Shared/AtParEnums");
var AtParEnums_4 = require("../Shared/AtParEnums");
var AtParEnums_5 = require("../Shared/AtParEnums");
var AtParEnums_6 = require("../Shared/AtParEnums");
var mt_atpar_gridview_params_1 = require("../entities/mt_atpar_gridview_params");
var api_1 = require("../components/common/api");
var AtParConstants_1 = require("../Shared/AtParConstants");
var routepath_1 = require("../AtPar/Menus/routepath");
var ManageProfilesComponent = (function () {
    function ManageProfilesComponent(httpservice, _http, spinnerService, atParConstant, confirmationService) {
        this.httpservice = httpservice;
        this._http = _http;
        this.spinnerService = spinnerService;
        this.atParConstant = atParConstant;
        this.confirmationService = confirmationService;
        this.content = false;
        this.display = false;
        this.display2 = false;
        this.screenDisplay = false;
        this.page = true;
        this.dropdownData = [];
        this.selectedOrgProfileId = "";
        this.BindGrid = new Array();
        this.FLAG = false;
        this.param = false;
        this.menu = false;
        this.screen = false;
        this.displaymenu = false;
        this.selectedProfileId = "";
        this.selectedProfileDesc = "";
        this.pstrAlterProfileCtoS = false;
        this.userId = "All";
        this.clientAddr = "";
        this.profileId = "";
        this.paramDisplay = false;
        this.menuDisplay = false;
        this.MOG = true;
        this.paramGrid = [];
        this.menuGrid = [];
        this.displayGrid = [];
        this.paraDescription = "";
        this.desc = false;
        this.paramProfileId = "";
        this.webchkvalue = false;
        this.hhtchkvalue = false;
        this.webchkallvalue = false;
        this.hhtchkallvalue = false;
        this.lstmenuCheckedparams = [];
        this.lstauditallowed = [];
        this.displaydataGrid = false;
        this.dropdowndisplayData = [];
        this.selectedScreenDisplayId = "";
        this.val1 = "";
        this.menuchkvalue = false;
        this.displaychkvalue = false;
        this.lstdisplayCheckedparams = [];
        this.displayEntitys = [];
        this.menuEntitys = [];
        this.paramEntitys = [];
        this.buttonId = "";
        this.errormessage = "";
        this.lstgrdData = new Array();
        this.appname = false;
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.dropdownparamData = [];
        this.paramindex = false;
        this.audistStatus = "";
        this.chrServer = "";
        this.chrClient = "";
        this.CreateDisplay = [];
        this.CreateParam = [];
        this.CreateMenu = [];
        this.CreateProfile = [];
        this.allProfileIdsdata = [];
        this.lstMenuItems = [];
        this.totallstParamItems = [];
        this.totallstDisplayItems = [];
        this.gridViewParamValues = [];
        this.gridViewAllowEditingParamValues = [];
        this.tempMenu = [];
        this.mainMenus = [];
        this.mandryDisplay = false;
        this.lblerrordisplaymsg = "";
        this.loading = false;
        this.strParamValue = "";
        this.strModule = "";
        this.strValue = "";
        this.strhide = false;
        this.strhide1 = false;
        this.displayErrorString = "";
        this.strProfile = "";
        this.txtParamValue = "";
        this.blnCaseEdit = false;
        this.blnPOUMenu = false;
        this.webchk = false;
        this.hhtchk = false;
        this.statusMsg = "";
        this.saveloading = false;
        this.btnscreen = false;
        this.appicon = "";
        this.menubtn = false;
        this.Datachk = "chk";
        this.stralertprofile = false;
        this.menusCheckvalues = [];
        this.breadCrumbMenu = new routepath_1.Menus();
        this.appicon = "assets/img/app_icon.png";
    }
    //parambtn: boolean = false;
    ManageProfilesComponent.prototype.bindModelDataChange = function (event) {
        if ("txtParamProfileId" == event.TextBoxID.toString()) {
            this.mpStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("txtParaDescription" == event.TextBoxID.toString()) {
            this.descStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        if ("manageMenuSeqNo" == event.TextBoxID.toString()) {
            this.menuSeqNo = event.validationrules.filter(function (x) { return x.status == false; }).length;
        }
        //if (event.TextBoxID == event.TextBoxID.toString()) {
        //    this.mpMaxStatus = event.validationrules.filter(x => x.status == false).length;
        //}
        //if (this.mpMaxStatus == 0) {
        //    this.loading = false;
        //}
        //else {
        //    this.loading = true;
        //}
        if (this.totallstDisplayItems.length > 0) {
            for (var s = 0; s <= this.totallstDisplayItems.length - 1; s++) {
                this.id1 = "manageDspHeaderColumn" + s;
                // this.id2 = "manageDspToggleColumn" + s;
                if (this.id1 == event.TextBoxID) {
                    //event.TextBoxID = this.id1;
                    //event.val = this.totallstDisplayItems[s].COLUMN_HEADER;
                    // var chk = this.Datachk + s;
                    this.mpMaxStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if (this.mpMaxStatus == 1) {
                    // this.loading = false;
                    this.totallstDisplayItems[s].Isdisable = true;
                    this.mpMaxStatus = null;
                }
                else if (this.totallstDisplayItems[s].Isdisable == true && this.mpMaxStatus == 0 && this.id1 == event.TextBoxID) {
                    // this.loading = true;
                    this.totallstDisplayItems[s].Isdisable = false;
                    this.mpMaxStatus = null;
                }
                // }
            }
            for (var d = 0; d <= this.totallstDisplayItems.length - 1; d++) {
                // this.id1 = "manageDspHeaderColumn" + s;
                this.id2 = "manageDspToggleColumn" + d;
                if (this.id2 == event.TextBoxID) {
                    //event.TextBoxID = this.id1;
                    //event.val = this.totallstDisplayItems[s].COLUMN_HEADER;
                    // var chk = this.Datachk + s;
                    this.mpMaxStatus = event.validationrules.filter(function (x) { return x.status == false; }).length;
                }
                if (this.mpMaxStatus == 1) {
                    // this.loading = false;
                    this.totallstDisplayItems[d].Isdescdisable = true;
                    this.mpMaxStatus = null;
                }
                else if (this.totallstDisplayItems[d].Isdescdisable == true && this.mpMaxStatus == 0 && this.id2 == event.TextBoxID) {
                    // this.loading = true;
                    this.totallstDisplayItems[d].Isdescdisable = false;
                    this.mpMaxStatus = null;
                }
                // }
            }
            var length1 = this.totallstDisplayItems.filter(function (x) { return x.Isdisable == true || x.Isdescdisable == true; });
            if (length1.length == 0) {
                this.loading = false;
            }
            else {
                this.loading = true;
            }
        }
        if (this.buttonId == "create") {
            if ((this.mpStatus == 0 && this.descStatus == 0) || (this.mpStatus == undefined && this.descStatus == undefined)) {
                this.saveloading = false;
            }
            else {
                this.saveloading = true;
            }
        }
        if (this.buttonId != "create") {
            if ((this.mpStatus == 0 || this.descStatus == 0) || (this.mpStatus == undefined && this.descStatus == undefined)) {
                this.saveloading = false;
            }
            else {
                this.saveloading = true;
            }
        }
    };
    //Grid View in Product Items for Web and HHT(Parameters, Menu Access and Screen Display)
    ManageProfilesComponent.prototype.clicked = function (item1, event) {
        var _this = this;
        this.btnscreen = false;
        this.loading = false;
        this.statusMsg = "";
        event.preventDefault();
        var blnPickConfirmation = false;
        var target = event.target || event.srcElement || event.currentTarget;
        var idAttr = target.attributes.id;
        var value = idAttr.nodeValue;
        this.appId = item1.APP_ID;
        this.growlMessage = [];
        //  this.menusCheckvalues = [];
        //alert(itemId);
        if (value == "paramDisplay") {
            this.gridViewParamValues = [];
            this.gridViewAllowEditingParamValues = [];
            this.BindDropDownParam();
            // this.totallstParamItems = [];
            // this.paramGrid = [];
            this.paramDisplay = true;
            this.menuDisplay = false;
            this.MOG = false;
            this.screenDisplay = false;
            try {
                this.breadCrumbMenu.SUB_MENU_NAME = 'Assign Parameters';
                this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                // var data = this.orgProfileDataList["listParams"].filter(x => x.APP_ID == this.appId)
                var paramsdata = this.paramGrid.filter(function (x) { return x.APP_ID == _this.appId; });
                this.paramEntitys = [];
                for (var spe = 0; spe < paramsdata.length; spe++) {
                    var paramEntity = new vm_mt_atpar_profile_app_parameters_1.VM_MT_ATPAR_PROFILE_APP_PARAMETERS();
                    {
                        paramEntity.APP_ID = paramsdata[spe].APP_ID;
                        paramEntity.PARAMETER_ID = paramsdata[spe].PARAMETER_ID;
                        paramEntity.PARAMETER_VALUE = paramsdata[spe].PARAMETER_VALUE;
                        paramEntity.FLAG = paramsdata[spe].FLAG;
                        paramEntity.SHORT_DESCR = paramsdata[spe].SHORT_DESCR;
                        paramEntity.LONG_DESCR = paramsdata[spe].LONG_DESCR;
                        paramEntity.LONG_DESCR1 = paramsdata[spe].LONG_DESCR1;
                        paramEntity.PARAMETER_TYPE = paramsdata[spe].PARAMETER_TYPE;
                        paramEntity.MULTIPLE_VALUES = paramsdata[spe].MULTIPLE_VALUES;
                        paramEntity.VALIDATION = paramsdata[spe].VALIDATION;
                        paramEntity.REQUIRED_FLAG = paramsdata[spe].REQUIRED_FLAG;
                        paramEntity.MAX_VALUE = paramsdata[spe].MAX_VALUE;
                        paramEntity.PARAMETER_COMP_VALUE = paramsdata[spe].PARAMETER_COMP_VALUE;
                    }
                    this.paramEntitys.push(paramEntity);
                }
                var data = this.paramEntitys;
                for (var i_1 = 0; i_1 <= data.length - 1; i_1++) {
                    if (data[i_1].PARAMETER_TYPE == 'CHECKBOX') {
                        if (data[i_1].PARAMETER_VALUE == "Y") {
                            data[i_1].FLAG = true;
                        }
                        else {
                            data[i_1].FLAG = false;
                        }
                    }
                    data[i_1].val1 = "longDesc" + i_1;
                    data[i_1].PARAMETER_TYPE = data[i_1].PARAMETER_TYPE.toUpperCase();
                    if (data[i_1].VALIDATION == 'NUMBER') {
                        data[i_1].VALIDATION = "numeric";
                    }
                    if (data[i_1].VALIDATION == 'TEXT') {
                        data[i_1].VALIDATION = "alpa_numeric_underscore_hyphen_backslash";
                    }
                    if (data[i_1].VALIDATION == 'DECIMAL') {
                        data[i_1].VALIDATION = "numeric_dot";
                    }
                    if (data[i_1].PARAMETER_TYPE == 'TEXT' || data[i_1].PARAMETER_TYPE == 'TEXTBOX') {
                        if (this.appId == 4 && (data[i_1].PARAMETER_ID.toUpperCase() == "ITEM_UPN_TYPE_CODE" || data[i_1].PARAMETER_ID.toUpperCase() == "ITEM_NDC_TYPE_CODE")) {
                            data[i_1].VALIDATION = "alpa_numeric_underscore_hyphen_backslash,max=4";
                        }
                        if (this.appId == 4 && (data[i_1].PARAMETER_ID.toUpperCase() == "DEFAULT_DATE_RANGE" || data[i_1].PARAMETER_ID.toUpperCase() == "ITEM_RECV_HIGH_PCT")) {
                            data[i_1].VALIDATION = "numeric,max=" + data[i_1].MAX_VALUE;
                        }
                        if (this.appId == 15 && (data[i_1].PARAMETER_ID.toUpperCase() == "MAX_ALLOW_QTY")) {
                            data[i_1].VALIDATION = "numeric_dot";
                        }
                    }
                    if (data[i_1].PARAMETER_TYPE.toUpperCase() == 'RADIO') {
                        if (data[i_1].PARAMETER_ID == 'SHIPPING_LABEL_PRINT_OPTIONS' || data[i_1].PARAMETER_ID == 'RECEIPT_DELIVER_PRINT_OPTIONS') {
                            if (data[i_1].PARAMETER_VALUE == AtParEnums_2.Shiping_Label_PrinterType.None.toString()) {
                                data[i_1].PARAMETER_VALUE = 'None';
                            }
                            else if (data[i_1].PARAMETER_VALUE == AtParEnums_2.Shiping_Label_PrinterType.HeaderLbl_MobilePrinter.toString()) {
                                data[i_1].PARAMETER_VALUE = 'Print Header Label only to a Mobile Printer';
                            }
                            else if (data[i_1].PARAMETER_VALUE == AtParEnums_2.Shiping_Label_PrinterType.DeliveryTic_StationaryPrinter.toString()) {
                                data[i_1].PARAMETER_VALUE = 'Print Delivery Ticket only to a Stationary Printer';
                            }
                            else if (data[i_1].PARAMETER_VALUE == AtParEnums_2.Shiping_Label_PrinterType.Both_MobilePrinter_StationaryPrinter.toString()) {
                                data[i_1].PARAMETER_VALUE = 'Print Header Label to a Mobile Printer and Delivery Ticket to a Stationary Printer';
                            }
                            else if (data[i_1].PARAMETER_VALUE == AtParEnums_2.Shiping_Label_PrinterType.User_Option.toString()) {
                                data[i_1].PARAMETER_VALUE = 'User option';
                            }
                        }
                    }
                    var strChkValues = [];
                    var strParamVal = "";
                    var paramValue = void 0;
                    strParamVal = data[i_1].PARAMETER_VALUE.toString();
                    if (data[i_1].PARAMETER_TYPE.toUpperCase() == 'GRIDVIEW') {
                        var gridParams = null; // new MT_ATPAR_GRIDVIEW_PARAMS();                      
                        if (data[i_1].PARAMETER_ID.toUpperCase() == 'ALLOW_EDITING_CASE') {
                            strChkValues = strParamVal.split(",");
                            for (var i_2 = 0; i_2 <= strChkValues.length - 1; i_2++) {
                                var colArr = [];
                                var strRow = "";
                                strRow = strChkValues[i_2];
                                colArr = strRow.split("-");
                                gridParams = new mt_atpar_gridview_params_1.MT_ATPAR_GRIDVIEW_PARAMS();
                                //DataRow _row = dt.NewRow;
                                for (var _ColCnt = 0; _ColCnt <= colArr.length - 1; _ColCnt++) {
                                    // Because we are placing boolean at this location
                                    if (_ColCnt == 0) {
                                        gridParams.CHECKVALUE = (colArr[_ColCnt] == 0 ? false : true);
                                        //_row(_ColCnt) = (colArr(_ColCnt) == 0 ? false : true);
                                    }
                                    else {
                                        gridParams.OPTION = AtParEnums_4.CASE_EDITING_OPTIONS[colArr[_ColCnt]].toString(); //(colArr[_ColCnt]);
                                        //_row(_ColCnt) = ((CASE_EDITING_OPTIONS)colArr(_ColCnt)).ToString();
                                    }
                                }
                                gridParams.PARAM_ID = gridParams.OPTION;
                                this.gridViewAllowEditingParamValues.push(gridParams);
                            }
                            // data[i].PARAMETER_VALUE = paramValue;
                        }
                        else {
                            strChkValues = strParamVal.split(",");
                            for (var i_3 = 0; i_3 <= strChkValues.length - 1; i_3++) {
                                var colArr = [];
                                var strRow = "";
                                strRow = strChkValues[i_3];
                                colArr = strRow.split("-");
                                gridParams = new mt_atpar_gridview_params_1.MT_ATPAR_GRIDVIEW_PARAMS();
                                for (var _ColCnt = 0; _ColCnt <= colArr.length - 1; _ColCnt++) {
                                    // Because we are placing boolean at this location
                                    if (_ColCnt == 0) {
                                        gridParams.CHECKVALUE = (colArr[_ColCnt] == 0 ? false : true);
                                        // Because we are placing Menus values here (at position 1)
                                    }
                                    else if (_ColCnt == 1) {
                                        if (this.appId == AtParEnums_6.EnumApps.Pharmacy) {
                                            gridParams.MENU = AtParEnums_5.Pharmacy_Menus[colArr[_ColCnt]].toString();
                                        }
                                        else {
                                            gridParams.MENU = AtParEnums_3.POU_Menus[colArr[_ColCnt]].toString();
                                        }
                                    }
                                    else {
                                        gridParams.ORDER = colArr[_ColCnt].toString();
                                    }
                                }
                                gridParams.PARAM_ID = gridParams.MENU;
                                this.gridViewParamValues.push(gridParams);
                            }
                        }
                    }
                    data[i_1].Id = "manageParamValue" + i_1;
                    if (data[i_1].PARAMETER_VALUE == 'Y') {
                        data[i_1].FLAG = true;
                    }
                    else {
                        data[i_1].FLAG = false;
                    }
                    if (data[i_1].MULTIPLE_VALUES != "") {
                        var rdvalue = data[i_1].MULTIPLE_VALUES.split(",");
                        data[i_1].listrdo = rdvalue;
                        data[i_1].val1 = data[i_1].PARAMETER_VALUE;
                    }
                    else {
                    }
                    if (this.appId == 6 && data[i_1].PARAMETER_ID == 'AUTO_PICK_ENABLED') {
                        if (data[i_1].FLAG == true) {
                            blnPickConfirmation = true;
                        }
                        else {
                            blnPickConfirmation = false;
                        }
                    }
                    if (blnPickConfirmation) {
                        if (this.appId == 6 && data[i_1].PARAMETER_ID == 'PICK_CONFIRMATION') {
                            data[i_1].PARAMETER_VALUE = "Y";
                        }
                    }
                }
                //this.BindDropDownParam();
                this.totallstParamItems = data;
                if (this.totallstParamItems.length == 0) {
                    this.loading = true;
                }
                else {
                    this.loading = false;
                }
                //  this.paramGrid = data;
            }
            catch (exception) {
                this.clientErrorMsg(exception, "clicked");
            }
        }
        else if (value == "menuDisplay") {
            // this.menuGrid = [];
            //this.lstMenuItems = [];
            this.menuDisplay = true;
            this.paramDisplay = false;
            this.screenDisplay = false;
            this.MOG = false;
            try {
                this.breadCrumbMenu.SUB_MENU_NAME = 'Assign Menus';
                this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                //var data = this.orgProfileDataList["listMenus"].filter(x => x.APP_ID == this.appId)
                var menusdata = this.menuGrid.filter(function (x) { return x.APP_ID == _this.appId; });
                this.menuEntitys = [];
                var menusdatafilter = this.menusCheckvalues.filter(function (x) { return x.APP_ID == _this.appId; });
                //for (let m1 = 0; m1 <= menusdatafilter.length - 1; m1++) {
                //    if (menusdatafilter[m1].APP_ID == this.appId) {
                //        if (menusdata[m1].FLAG != undefined || menusdata[m1].FLAG != null) {
                //            menusdata[m1].FLAG = menusdatafilter[m1].CHKSTATUS == "Y" ? true : false;;
                //            menusdata[m1].CHKSTATUS = menusdatafilter[m1].FLAG == true ? "Y" : "N";
                //        }
                //        else {
                //            menusdata[m1].CHKSTATUS = menusdatafilter[m1].CHKSTATUS;
                //            // MENUS[m1].CHKSTATUS = this.menusCheckvalues[m1].FLAG == true ? "Y" : "N";
                //        }
                //        //menusdata[m1].FLAG = this.menusCheckvalues[m1].CHKSTATUS == "Y" ? true : false;
                //        //menusdata[m1].CHKSTATUS = this.menusCheckvalues[m1].FLAG == true ? "Y" : "N";
                //    }
                //}
                //for (let m1 = 0; m1 <= this.menusCheckvalues.length - 1; m1++) {
                //    if (this.menusCheckvalues[m1].APP_ID == this.appId) {
                //        if (menusdata[m1].FLAG != undefined || menusdata[m1].FLAG != null) {
                //            menusdata[m1].FLAG = this.menusCheckvalues[m1].CHKSTATUS == "Y" ? true : false;;
                //            menusdata[m1].CHKSTATUS = this.menusCheckvalues[m1].FLAG == true ? "Y" : "N";
                //        }
                //        else {
                //            menusdata[m1].CHKSTATUS = this.menusCheckvalues[m1].CHKSTATUS;
                //            // MENUS[m1].CHKSTATUS = this.menusCheckvalues[m1].FLAG == true ? "Y" : "N";
                //        }
                //        //menusdata[m1].FLAG = this.menusCheckvalues[m1].CHKSTATUS == "Y" ? true : false;
                //        //menusdata[m1].CHKSTATUS = this.menusCheckvalues[m1].FLAG == true ? "Y" : "N";
                //    }
                //}
                for (var sm = 0; sm < menusdata.length; sm++) {
                    var menuEntity = new vm_mt_atpar_profile_app_menus_1.VM_MT_ATPAR_PROFILE_APP_MENUS();
                    {
                        menuEntity.APP_ID = menusdata[sm].APP_ID;
                        menuEntity.MENU_SEQ_NO = menusdata[sm].MENU_SEQ_NO;
                        menuEntity.MENU_NAME = menusdata[sm].MENU_NAME;
                        menuEntity.MENU_CODE = menusdata[sm].MENU_CODE;
                        menuEntity.MENU_SUB_GROUP = menusdata[sm].MENU_SUB_GROUP;
                        menuEntity.FLAG = menusdata[sm].CHKSTATUS == "Y" ? true : false;
                    }
                    this.menuEntitys.push(menuEntity);
                }
                //  let data = this.totallstDisplayItems;
                var menudata = this.menuEntitys;
                for (var i_4 = 0; i_4 <= menudata.length - 1; i_4++) {
                    menudata[i_4].Id = "manageMenuSeqNo" + i_4;
                    if (this.buttonId == "create" || this.buttonId != "create") {
                    }
                    else {
                        //if (menudata[i].CHK_STATUS == "N") {
                        //    menudata[i].FLAG = false;
                        //}
                        //else {
                        //    menudata[i].FLAG = true;
                        //}
                    }
                }
                // this.menuGrid = menudata;
                this.lstMenuItems = menudata;
                if (this.lstMenuItems.length == 0) {
                    this.menubtn = true;
                }
                else {
                    this.menubtn = false;
                }
                setTimeout(function () {
                    var txtPasswdValue = document.getElementById('manageMenuSeqNo0');
                    txtPasswdValue.focus();
                }, 500);
            }
            catch (exception) {
                this.clientErrorMsg(exception, "clicked");
            }
        }
        else if (value == "screenDisplay") {
            this.displaydataGrid = false;
            // this.paramGrid = [];
            this.paramDisplay = false;
            this.menuDisplay = false;
            this.MOG = false;
            this.screenDisplay = true;
            this.lblerrordisplaymsg = "";
            this.temp = [];
            this.dropdowndisplayData = [];
            this.selectedScreenDisplayId = "";
            try {
                this.breadCrumbMenu.SUB_MENU_NAME = 'Assign Screen Display';
                this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                this.temp = this.orgProfileDataList["listScreenDisplay"].filter(function (x) { return x.APP_ID == _this.appId; });
                this.distinctList = linq_es5_1.asEnumerable(this.temp).Select(function (a) { return a.SCREEN_NAME.toUpperCase(); }).Distinct().ToArray();
                this.dropdowndisplayData.push({ label: "Select Screen Name", value: "" });
                for (var i = 0; i < this.distinctList.length; i++) {
                    this.dropdowndisplayData.push({ label: this.distinctList[i], value: this.distinctList[i] });
                }
            }
            catch (exception) {
                this.clientErrorMsg(exception, "clicked");
            }
        }
        else {
            this.paramDisplay = false;
            this.menuDisplay = false;
            this.MOG = true;
            this.screenDisplay = false;
        }
    };
    //Temaprary Save Click
    ManageProfilesComponent.prototype.Save_Click = function (event) {
        var _this = this;
        this.loading = false;
        this.saveloading = false;
        this.growlMessage = [];
        this.displayErrorString = "";
        event.preventDefault();
        var menusCheck = this.menuGrid;
        var displayGrdCheck = this.displayGrid;
        var paramGridCheck = this.totallstParamItems;
        var name = event.target.id;
        //if (name != "cancelparam" || name == "" || name == null) {
        if (name == "backparam") {
            var paramGridCheck_1 = this.paramGrid.filter(function (x) { return x.APP_ID == _this.appId; });
            if (this.paramEntitys.length != 0) {
                for (var param = 0; param < this.paramEntitys.length; param++) {
                    if (this.paramEntitys[param].PARAMETER_TYPE == 'CHECKBOX') {
                        if (this.paramEntitys[param].FLAG) {
                            this.paramEntitys[param].PARAMETER_VALUE = "Y";
                        }
                        else {
                            this.paramEntitys[param].PARAMETER_VALUE = "N";
                        }
                    }
                    if (this.paramEntitys[param].PARAMETER_TYPE == 'TEXTBOX' || this.paramEntitys[param].PARAMETER_TYPE == "TEXT") {
                        if (this.paramEntitys[param].VALIDATION == 'numeric' || this.paramEntitys[param].VALIDATION == 'numeric_dot') {
                            if (this.paramEntitys[param].PARAMETER_VALUE == null || this.paramEntitys[param].PARAMETER_VALUE == '') {
                                this.paramDisplay = true;
                                this.menuDisplay = false;
                                this.screenDisplay = false;
                                // this.loading = false;
                                this.MOG = false;
                                this.growlMessage = [];
                                this.errormessage = this.paramEntitys[param].SHORT_DESCR + "- Please Enter Numeric Value ";
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                                return;
                            }
                        }
                        if (this.paramEntitys[param].VALIDATION == 'digit') {
                            if (this.paramEntitys[param].PARAMETER_VALUE == null || this.paramEntitys[param].PARAMETER_VALUE == '') {
                                this.paramDisplay = true;
                                this.menuDisplay = false;
                                this.screenDisplay = false;
                                this.MOG = false;
                                // this.loading = false;
                                this.growlMessage = [];
                                this.errormessage = this.paramEntitys[param].SHORT_DESCR + "- Please Enter Numeric Value ";
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                                return;
                            }
                        }
                        if ((this.paramEntitys[param].PARAMETER_VALUE == null || this.paramEntitys[param].PARAMETER_VALUE == "") && (this.paramEntitys[param].REQUIRED_FLAG == "Y")) {
                            this.paramDisplay = true;
                            this.menuDisplay = false;
                            this.screenDisplay = false;
                            this.MOG = false;
                            this.growlMessage = [];
                            this.errormessage = this.paramEntitys[param].SHORT_DESCR + "- Please Enter Numeric Value";
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                            return;
                        }
                        if ((this.paramEntitys[param].PARAMETER_VALUE != null && this.paramEntitys[param].PARAMETER_VALUE != "") && (this.paramEntitys[param].VALIDATION == "NUMBER" || this.paramEntitys[param].VALIDATION == ("numeric,max=" + this.paramEntitys[param].MAX_VALUE) || this.paramEntitys[param].VALIDATION == "numeric")) {
                            if (!(/^[0-9]+$/.test(this.paramEntitys[param].PARAMETER_VALUE))) {
                                this.paramDisplay = true;
                                this.menuDisplay = false;
                                this.screenDisplay = false;
                                this.MOG = false;
                                this.growlMessage = [];
                                this.errormessage = this.paramEntitys[param].SHORT_DESCR + "- Please Enter positive Numerics";
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                                return;
                            }
                        }
                    }
                    if (this.paramEntitys[param].PARAMETER_TYPE == "GRIDVIEW") {
                        this.strValue = "";
                        this.strModule = "";
                        var lstGridview = this.gridViewAllowEditingParamValues;
                        var lstGridParam = this.gridViewParamValues;
                        if (lstGridview.length == 0) {
                            this.paramEntitys[param].PARAMETER_VALUE = this.paramEntitys[param].PARAMETER_VALUE;
                        }
                        else if (this.appId == AtParEnums_6.EnumApps.PointOfUse && this.paramEntitys[param].PARAMETER_ID == "ALLOW_EDITING_CASE") {
                            for (var pg = 0; pg < lstGridview.length; pg++) {
                                if (lstGridview[pg].CHECKVALUE == true) {
                                    this.strValue = this.strValue + "1" + "-";
                                    this.blnCaseEdit = true;
                                }
                                else {
                                    this.strValue = this.strValue + "0" + "-";
                                }
                                // strModule = CType(gvRow.FindControl("Option"), Label).Text
                                this.strModule = lstGridview[pg].OPTION.toString();
                                if (this.strModule == AtParEnums_4.CASE_EDITING_OPTIONS[AtParEnums_4.CASE_EDITING_OPTIONS.AddCase].toString()) {
                                    this.strValue = this.strValue + AtParEnums_4.CASE_EDITING_OPTIONS.AddCase + ",";
                                }
                                else if (this.strModule == AtParEnums_4.CASE_EDITING_OPTIONS[AtParEnums_4.CASE_EDITING_OPTIONS.ChangeStatus].toString()) {
                                    this.strValue = this.strValue + AtParEnums_4.CASE_EDITING_OPTIONS.ChangeStatus + ",";
                                }
                                else if (this.strModule == AtParEnums_4.CASE_EDITING_OPTIONS[AtParEnums_4.CASE_EDITING_OPTIONS.ReplaceCase].toString()) {
                                    this.strValue = this.strValue + AtParEnums_4.CASE_EDITING_OPTIONS.ReplaceCase + ",";
                                }
                                else if (this.strModule == AtParEnums_4.CASE_EDITING_OPTIONS[AtParEnums_4.CASE_EDITING_OPTIONS.ReplacePref].toString()) {
                                    this.strValue = this.strValue + AtParEnums_4.CASE_EDITING_OPTIONS.ReplacePref + ",";
                                }
                            }
                        }
                        else if (lstGridParam.length == 0) {
                            this.paramEntitys[param].PARAMETER_VALUE = this.paramEntitys[param].PARAMETER_VALUE;
                        }
                        else
                            for (var gp = 0; gp < lstGridParam.length; gp++) {
                                if (lstGridParam[gp].CHECKVALUE == true) {
                                    this.strValue = this.strValue + "1" + "-";
                                    this.blnPOUMenu = true;
                                }
                                else {
                                    this.strValue = this.strValue + "0" + "-";
                                }
                                // strModule = CType(gvRow.FindControl("MENU"), Label).Text
                                this.strModule = lstGridParam[gp].MENU.toString();
                                if (this.appId == AtParEnums_6.EnumApps.Pharmacy) {
                                    if (this.strModule == AtParEnums_5.Pharmacy_Menus[AtParEnums_5.Pharmacy_Menus.Cyclecount].toString()) {
                                        this.strValue = this.strValue + AtParEnums_5.Pharmacy_Menus.Cyclecount + "-";
                                    }
                                    else if (this.strModule == AtParEnums_5.Pharmacy_Menus[AtParEnums_5.Pharmacy_Menus.Issue].toString()) {
                                        this.strValue = this.strValue + AtParEnums_5.Pharmacy_Menus.Issue + "-";
                                    }
                                    else if (this.strModule == AtParEnums_5.Pharmacy_Menus[AtParEnums_5.Pharmacy_Menus.Pick].toString()) {
                                        this.strValue = this.strValue + AtParEnums_5.Pharmacy_Menus.Pick + "-";
                                    }
                                    else if (this.strModule == AtParEnums_5.Pharmacy_Menus[AtParEnums_5.Pharmacy_Menus.Deliver].toString()) {
                                        this.strValue = this.strValue + AtParEnums_5.Pharmacy_Menus.Deliver + "-";
                                    }
                                    else if (this.strModule == AtParEnums_5.Pharmacy_Menus[AtParEnums_5.Pharmacy_Menus.Putaway].toString()) {
                                        this.strValue = this.strValue + AtParEnums_5.Pharmacy_Menus.Putaway + "-";
                                    }
                                    else if (this.strModule == AtParEnums_5.Pharmacy_Menus[AtParEnums_5.Pharmacy_Menus.RxPick].toString()) {
                                        this.strValue = this.strValue + AtParEnums_5.Pharmacy_Menus.RxPick + "-";
                                    }
                                }
                                else {
                                    if (this.strModule == AtParEnums_3.POU_Menus[AtParEnums_3.POU_Menus.Issue].toString()) {
                                        this.strValue = this.strValue + AtParEnums_3.POU_Menus.Issue + "-";
                                    }
                                    else if (this.strModule == AtParEnums_3.POU_Menus[AtParEnums_3.POU_Menus.Returns].toString()) {
                                        this.strValue = this.strValue + AtParEnums_3.POU_Menus.Returns + "-";
                                    }
                                    else if (this.strModule == AtParEnums_3.POU_Menus[AtParEnums_3.POU_Menus.Cyclecount].toString()) {
                                        this.strValue = this.strValue + AtParEnums_3.POU_Menus.Cyclecount + "-";
                                    }
                                    else if (this.strModule == AtParEnums_3.POU_Menus[AtParEnums_3.POU_Menus.Putaway].toString()) {
                                        this.strValue = this.strValue + AtParEnums_3.POU_Menus.Putaway + "-";
                                    }
                                    else if (this.strModule == AtParEnums_3.POU_Menus[AtParEnums_3.POU_Menus.CasePick].toString()) {
                                        this.strValue = this.strValue + AtParEnums_3.POU_Menus.CasePick + "-";
                                    }
                                    else if (this.strModule == AtParEnums_3.POU_Menus[AtParEnums_3.POU_Menus.CaseIssue].toString()) {
                                        this.strValue = this.strValue + AtParEnums_3.POU_Menus.CaseIssue + "-";
                                    }
                                    else if (this.strModule == AtParEnums_3.POU_Menus[AtParEnums_3.POU_Menus.RecordConsumption].toString()) {
                                        this.strValue = this.strValue + AtParEnums_3.POU_Menus.RecordConsumption + "-";
                                    }
                                    else if (this.strModule == AtParEnums_3.POU_Menus[AtParEnums_3.POU_Menus.RecordConSearch].toString()) {
                                        this.strValue = this.strValue + AtParEnums_3.POU_Menus.RecordConSearch + "-";
                                    }
                                    else if (this.strModule == AtParEnums_3.POU_Menus[AtParEnums_3.POU_Menus.Pick].toString()) {
                                        this.strValue = this.strValue + AtParEnums_3.POU_Menus.Pick + "-";
                                    }
                                }
                                this.strValue = this.strValue + lstGridParam[gp].ORDER.toString() + ",";
                            }
                        if (this.strValue != "") {
                            this.strValue = this.strValue.substring(0, (this.strValue.length - 1));
                            this.paramEntitys[param].PARAMETER_VALUE = this.strValue;
                        }
                        else {
                            this.paramEntitys[param].PARAMETER_VALUE = this.paramEntitys[param].PARAMETER_VALUE;
                        }
                    }
                    if ((this.paramEntitys[param].PARAMETER_VALUE != "") && (this.paramEntitys[param].PARAMETER_ID == "TEMPVENDOR")) {
                        if (!(this.paramEntitys[param].PARAMETER_VALUE.match("^[/.a-zA-Z0-9.\\/_-]+$"))) {
                            this.paramDisplay = true;
                            this.menuDisplay = false;
                            this.screenDisplay = false;
                            this.MOG = false;
                            //  this.loading = false;
                            this.growlMessage = [];
                            this.errormessage = this.paramEntitys[param].SHORT_DESCR + "- Please enter characters or numbers or _, -,.,/";
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                            return;
                        }
                    }
                    if ((this.paramEntitys[param].PARAMETER_VALUE != "") && (this.paramEntitys[param].PARAMETER_ID == "TEMPLOCATION")) {
                        if (!(this.paramEntitys[param].PARAMETER_VALUE.match("^[/.a-zA-Z0-9.\\/_-]+$"))) {
                            this.paramDisplay = true;
                            this.menuDisplay = false;
                            this.screenDisplay = false;
                            this.MOG = false;
                            // this.loading = false;
                            this.growlMessage = [];
                            this.errormessage = this.paramEntitys[param].SHORT_DESCR + "- Please enter characters or numbers or _, -,.,/";
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                            return;
                        }
                    }
                    if (this.appId == 4 && this.paramEntitys[param].PARAMETER_ID != null &&
                        (this.paramEntitys[param].PARAMETER_ID.toUpperCase() == 'DEFAULT_DATE_RANGE' || this.paramEntitys[param].PARAMETER_ID.toUpperCase() == 'ITEM_RECV_HIGH_PCT' || this.paramEntitys[param].PARAMETER_ID.toUpperCase() == 'ITEM_RECV_LOW_PCT')) {
                        if (this.paramEntitys[param].PARAMETER_VALUE != null || this.paramEntitys[param].PARAMETER_VALUE != "") {
                            if (this.paramEntitys[param].PARAMETER_VALUE > this.paramEntitys[param].MAX_VALUE) {
                                this.paramDisplay = true;
                                this.menuDisplay = false;
                                this.screenDisplay = false;
                                //  this.loading = false;
                                this.MOG = false;
                                this.growlMessage = [];
                                this.errormessage = this.paramEntitys[param].SHORT_DESCR + "- Please enter less than or equal to " + this.paramEntitys[param].MAX_VALUE;
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                                return;
                            }
                        }
                    }
                    if (this.appId == 2 && this.paramEntitys[param].PARAMETER_ID != null &&
                        (this.paramEntitys[param].PARAMETER_ID.toUpperCase() == 'RESTRICT_COUNT_QTY' ||
                            this.paramEntitys[param].PARAMETER_ID.toUpperCase() == 'RESTRICT_COUNT_QTY_DIGITS')) {
                        if (this.paramEntitys[param].PARAMETER_VALUE != null || this.paramEntitys[param].PARAMETER_VALUE != "") {
                            if (this.paramEntitys[param].PARAMETER_VALUE == '0') {
                                this.paramDisplay = true;
                                this.menuDisplay = false;
                                //  this.loading = false;
                                this.screenDisplay = false;
                                this.MOG = false;
                                this.growlMessage = [];
                                this.errormessage = this.paramEntitys[param].SHORT_DESCR + "- Can not be zero ";
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                                return;
                            }
                            if (this.paramEntitys[param].PARAMETER_VALUE > '0') {
                                if (this.paramEntitys[param].PARAMETER_VALUE > this.paramEntitys[param].MAX_VALUE) {
                                    this.paramDisplay = true;
                                    this.menuDisplay = false;
                                    this.screenDisplay = false;
                                    // this.loading = false;
                                    this.MOG = false;
                                    this.growlMessage = [];
                                    this.errormessage = this.paramEntitys[param].SHORT_DESCR + "- Please enter less than or equal to " + this.paramEntitys[param].MAX_VALUE;
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                                    return;
                                }
                            }
                        }
                    }
                    if (this.appId == 10 && this.paramEntitys[param].PARAMETER_ID != null &&
                        (this.paramEntitys[param].PARAMETER_ID.toUpperCase() == 'RESTRICT_ISSUE_QTY' ||
                            this.paramEntitys[param].PARAMETER_ID.toUpperCase() == 'RESTRICT_ISSUE_QTY_DIGITS')) {
                        if (this.paramEntitys[param].PARAMETER_VALUE != null || this.paramEntitys[param].SHORT_DESCR != "") {
                            if (this.paramEntitys[param].PARAMETER_VALUE > '0') {
                                if (this.paramEntitys[param].PARAMETER_VALUE > this.paramEntitys[param].MAX_VALUE) {
                                    this.paramDisplay = true;
                                    this.menuDisplay = false;
                                    this.screenDisplay = false;
                                    //  this.loading = false;
                                    this.MOG = false;
                                    this.growlMessage = [];
                                    this.errormessage = this.paramEntitys[param].SHORT_DESCR + "- Please enter less than or equal to " + this.paramEntitys[param].MAX_VALUE;
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                                    return;
                                }
                            }
                        }
                    }
                    if (this.appId == 15 && this.paramEntitys[param].PARAMETER_ID != null &&
                        (this.paramEntitys[param].PARAMETER_ID.toUpperCase() == 'MAX_ALLOW_QTY')) {
                        if (this.paramEntitys[param].PARAMETER_VALUE != null || this.paramEntitys[param].SHORT_DESCR != "") {
                            if (this.paramEntitys[param].PARAMETER_VALUE == "0") {
                                this.paramDisplay = true;
                                this.menuDisplay = false;
                                //  this.loading = false;
                                this.screenDisplay = false;
                                this.MOG = false;
                                this.growlMessage = [];
                                this.errormessage = this.paramEntitys[param].SHORT_DESCR + "- Can not be zero ";
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                                return;
                            }
                            if (this.paramEntitys[param].PARAMETER_VALUE.split(".").length >= 0) {
                                if (this.paramEntitys[param].PARAMETER_VALUE.split(".").length > 2) {
                                    this.paramDisplay = true;
                                    this.menuDisplay = false;
                                    // this.loading = false;
                                    this.screenDisplay = false;
                                    this.MOG = false;
                                    this.growlMessage = [];
                                    this.errormessage = this.paramEntitys[param].SHORT_DESCR + "- Please enter valid number ";
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                                    return;
                                }
                                else {
                                    this.growlMessage = null;
                                }
                            }
                            if (this.paramEntitys[param].PARAMETER_VALUE != "0") {
                                if (this.paramEntitys[param].PARAMETER_VALUE > this.paramEntitys[param].MAX_VALUE) {
                                    this.paramDisplay = true;
                                    this.menuDisplay = false;
                                    // this.loading = false;
                                    this.screenDisplay = false;
                                    this.MOG = false;
                                    this.growlMessage = [];
                                    this.errormessage = this.paramEntitys[param].SHORT_DESCR + "- Please enter less than or equal to " + this.paramEntitys[param].MAX_VALUE;
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                                    return;
                                }
                                else {
                                    this.growlMessage = null;
                                }
                            }
                        }
                    }
                }
                if (this.growlMessage == null || this.growlMessage == undefined || this.growlMessage.length == 0 || this.growlMessage.length == null) {
                    for (var spd = 0; spd < this.paramEntitys.length; spd++) {
                        paramGridCheck_1[spd].APP_ID = this.paramEntitys[spd].APP_ID;
                        paramGridCheck_1[spd].PARAMETER_ID = this.paramEntitys[spd].PARAMETER_ID;
                        paramGridCheck_1[spd].PARAMETER_VALUE = this.paramEntitys[spd].PARAMETER_VALUE;
                        paramGridCheck_1[spd].FLAG = this.paramEntitys[spd].FLAG;
                        paramGridCheck_1[spd].SHORT_DESCR = this.paramEntitys[spd].SHORT_DESCR;
                        paramGridCheck_1[spd].LONG_DESCR = this.paramEntitys[spd].LONG_DESCR;
                        paramGridCheck_1[spd].LONG_DESCR1 = this.paramEntitys[spd].LONG_DESCR1;
                        paramGridCheck_1[spd].PARAMETER_TYPE = this.paramEntitys[spd].PARAMETER_TYPE;
                        paramGridCheck_1[spd].MULTIPLE_VALUES = this.paramEntitys[spd].MULTIPLE_VALUES;
                        paramGridCheck_1[spd].VALIDATION = this.paramEntitys[spd].VALIDATION;
                        paramGridCheck_1[spd].REQUIRED_FLAG = this.paramEntitys[spd].REQUIRED_FLAG;
                        paramGridCheck_1[spd].MAX_VALUE = this.paramEntitys[spd].MAX_VALUE;
                        paramGridCheck_1[spd].PARAMETER_COMP_VALUE = this.paramEntitys[spd].PARAMETER_COMP_VALUE;
                    }
                    this.statusMsg = "";
                    this.paramDisplay = true;
                    //  this.loading = true;
                    this.menuDisplay = false;
                    this.MOG = false;
                    this.screenDisplay = false;
                    this.growlMessage = [];
                    this.statusMsg = "Temporarily data is stored, Please click on Save Button in Parent Page to update the changes";
                    this.growlMessage.push({ severity: 'Info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: this.statusMsg });
                }
            }
            else {
                this.paramDisplay = false;
                this.menuDisplay = false;
                // this.loading = true;
                this.MOG = true;
                this.screenDisplay = false;
            }
        }
        if (name == "backmenu") {
            menusCheck = this.menuGrid.filter(function (x) { return x.APP_ID == _this.appId; });
            //this.menusCheckvalues = menusCheck;
            if (this.menuEntitys.length != 0) {
                for (var e = 0; e < this.menuEntitys.length; e++) {
                    if (this.menuEntitys[e].MENU_SEQ_NO == null || this.menuEntitys[e].MENU_SEQ_NO.toString() == "" || this.menuEntitys[e].MENU_SEQ_NO == undefined) {
                        this.paramDisplay = false;
                        this.menuDisplay = true;
                        this.screenDisplay = false;
                        this.MOG = false;
                        this.growlMessage = [];
                        this.errormessage = "Please Enter Menu Sequence Number";
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                        return;
                    }
                    else if (this.menuEntitys[e].MENU_SEQ_NO > 99) {
                        this.paramDisplay = false;
                        this.menuDisplay = true;
                        this.screenDisplay = false;
                        this.MOG = false;
                        this.growlMessage = [];
                        this.errormessage = "Sequence Number should be 0-99";
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                        return;
                    }
                }
                if (this.growlMessage == null || this.growlMessage == undefined || this.growlMessage.length == 0 || this.growlMessage.length == null) {
                    for (var ms = 0; ms < this.menuEntitys.length; ms++) {
                        menusCheck[ms].APP_ID = this.menuEntitys[ms].APP_ID;
                        menusCheck[ms].MENU_SEQ_NO = this.menuEntitys[ms].MENU_SEQ_NO;
                        menusCheck[ms].MENU_NAME = this.menuEntitys[ms].MENU_NAME;
                        menusCheck[ms].MENU_CODE = this.menuEntitys[ms].MENU_CODE;
                        menusCheck[ms].MENU_SUB_GROUP = this.menuEntitys[ms].MENU_SUB_GROUP;
                        menusCheck[ms].CHKSTATUS = this.menuEntitys[ms].FLAG == true ? "Y" : "N";
                        //menusCheck[ms].FLAG = this.menuEntitys[ms].FLAG;
                        this.menusCheckvalues.push(menusCheck[ms]);
                    }
                    this.statusMsg = "";
                    this.paramDisplay = false;
                    this.menuDisplay = true;
                    this.MOG = false;
                    this.screenDisplay = false;
                    this.growlMessage = [];
                    this.statusMsg = "Temporarily data is stored, Please click on Save Button in Parent Page to update the changes";
                    this.growlMessage.push({ severity: 'Info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: this.statusMsg });
                }
            }
            else {
                this.paramDisplay = false;
                this.menuDisplay = false;
                this.MOG = true;
                this.screenDisplay = false;
            }
        }
        if (name == "backscreen") {
            displayGrdCheck = this.displayGrid.filter(function (x) { return x.APP_ID == _this.appId && x.SCREEN_NAME.toUpperCase() == _this.selectedScreenDisplayId.toUpperCase(); });
            //displayGrdCheck = this.displayEntitys;
            if (this.displayEntitys.length != 0) {
                this.statusMsg = "";
                this.displayErrorString = "";
                for (var ds = 0; ds < this.displayEntitys.length; ds++) {
                    if (this.displayEntitys[ds].FLAG) {
                        this.displayEntitys[ds].DISPLAY_FIELD = "Y";
                    }
                    else {
                        this.displayEntitys[ds].DISPLAY_FIELD = "N";
                    }
                    if (this.displayEntitys[ds].mandryDisplay == true) {
                        if (this.displayEntitys[ds].FLAG != true) {
                            this.statusMsg = "";
                            this.paramDisplay = false;
                            this.menuDisplay = false;
                            this.screenDisplay = true;
                            this.MOG = false;
                            var lstScreen = this.displayEntitys.filter(function (x) { return x.APP_ID == _this.appId && x.SCREEN_NAME.toUpperCase() == _this.selectedScreenDisplayId.toUpperCase(); });
                            for (var s = 0; s < lstScreen.length; s++) {
                                if (lstScreen[s].DEFAULT_DISPLAY_FIELD === "Y" && lstScreen[s].FLAG == false) {
                                    this.displayErrorString = this.displayErrorString + ", " + lstScreen[s].DEFAULT_COLUMN_HEADER;
                                }
                            }
                            this.growlMessage = [];
                            this.errormessage = "minimum" + this.displayErrorString + "  have to be selected";
                            var str = this.errormessage.replace("minimum,", "");
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: str });
                            return;
                        }
                    }
                    if (this.displayEntitys[ds].MANDATORY_TOGGLE != null && this.displayEntitys[ds].MANDATORY_TOGGLE.toUpperCase() == "Y") {
                        if (this.displayEntitys[ds].TOGGLE_ORDER === "" || this.displayEntitys[ds].TOGGLE_ORDER == null || this.displayEntitys[ds].DEFAULT_TOGGLE_TEXT === "" || this.displayEntitys[ds].DEFAULT_TOGGLE_TEXT == null) {
                            this.paramDisplay = false;
                            this.menuDisplay = false;
                            this.screenDisplay = true;
                            this.MOG = false;
                            this.growlMessage = [];
                            this.errormessage = "Mandatory Toggle field " + this.displayEntitys[ds].DEFAULT_COLUMN_HEADER + " : Can not be removed";
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                            return;
                        }
                    }
                    if (this.displayEntitys[ds].TOGGLE_ORDER === "" && this.displayEntitys[ds].DEFAULT_TOGGLE_TEXT != "") {
                        this.paramDisplay = false;
                        this.menuDisplay = false;
                        this.screenDisplay = true;
                        this.MOG = false;
                        this.growlMessage = [];
                        this.errormessage = " Please Enter Toggle Order";
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                        return;
                    }
                    if (this.displayEntitys[ds].TOGGLE_ORDER != "" && this.displayEntitys[ds].DEFAULT_TOGGLE_TEXT === "") {
                        this.paramDisplay = false;
                        this.menuDisplay = false;
                        this.screenDisplay = true;
                        this.MOG = false;
                        this.growlMessage = [];
                        this.errormessage = " Please Enter Toggle Description";
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                        return;
                    }
                }
                if (this.displayErrorString == null || this.displayErrorString === "") {
                    this.growlMessage = [];
                    for (var ds = 0; ds < this.displayEntitys.length; ds++) {
                        var colwidth = this.displayEntitys[ds].COLUMN_WIDTH;
                        if (this.displayEntitys[ds].COLUMN_HEADER == null || this.displayEntitys[ds].COLUMN_HEADER === "") {
                            this.paramDisplay = false;
                            this.menuDisplay = false;
                            this.screenDisplay = true;
                            this.MOG = false;
                            this.growlMessage = [];
                            this.errormessage = "Please Enter Label";
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                            return;
                        }
                        else if (this.displayEntitys[ds].COLUMN_ORDER == null || this.displayEntitys[ds].COLUMN_ORDER.toString() == "" || displayGrdCheck[ds].COLUMN_ORDER == undefined) {
                            this.paramDisplay = false;
                            this.menuDisplay = false;
                            this.screenDisplay = true;
                            this.MOG = false;
                            this.growlMessage = [];
                            this.errormessage = "Please Enter Order";
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                            return;
                        }
                        else if (this.displayEntitys[ds].COLUMN_ORDER > 99) {
                            this.paramDisplay = false;
                            this.menuDisplay = false;
                            this.screenDisplay = true;
                            this.MOG = false;
                            this.growlMessage = [];
                            this.errormessage = "Please enter value for Order between 0 and 99";
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                            return;
                        }
                        else if (colwidth == null || colwidth === "") {
                            this.paramDisplay = false;
                            this.menuDisplay = false;
                            this.screenDisplay = true;
                            this.MOG = false;
                            this.growlMessage = [];
                            this.errormessage = "Please Enter Width";
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                            return;
                        }
                        else if (this.displayEntitys[ds].COLUMN_WIDTH > 9999) {
                            this.paramDisplay = false;
                            this.menuDisplay = false;
                            this.screenDisplay = true;
                            this.MOG = false;
                            this.growlMessage = [];
                            this.errormessage = "Please enter value for Width between 0 and 9999";
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                            return;
                        }
                        else if (this.displayEntitys[ds].TOGGLE_ORDER === '0') {
                            this.paramDisplay = false;
                            this.menuDisplay = false;
                            this.screenDisplay = true;
                            this.MOG = false;
                            this.growlMessage = [];
                            this.errormessage = "Please enter value for Toggle Order should not be zero";
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                            return;
                        }
                        else if (this.displayEntitys[ds].TOGGLE_ORDER === '0') {
                            this.paramDisplay = false;
                            this.menuDisplay = false;
                            this.screenDisplay = true;
                            this.MOG = false;
                            this.growlMessage = [];
                            this.errormessage = "Please enter value for Toggle order should not be zero";
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                            return;
                        }
                        if (this.displayEntitys[ds].TOGGLE_ORDER > 99) {
                            this.paramDisplay = false;
                            this.menuDisplay = false;
                            this.screenDisplay = true;
                            this.MOG = false;
                            this.growlMessage = [];
                            this.errormessage = "Please enter value for Toggle order between 0 and 99";
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                            return;
                        }
                    }
                }
                if (this.growlMessage == null || this.growlMessage == undefined || this.growlMessage.length == 0 || this.growlMessage.length == null) {
                    for (var sds = 0; sds < this.displayEntitys.length; sds++) {
                        displayGrdCheck[sds].APP_ID = this.displayEntitys[sds].APP_ID;
                        displayGrdCheck[sds].COLUMN_WIDTH = this.displayEntitys[sds].COLUMN_WIDTH;
                        displayGrdCheck[sds].COLUMN_ORDER = this.displayEntitys[sds].COLUMN_ORDER;
                        displayGrdCheck[sds].COLUMN_HEADER = this.displayEntitys[sds].COLUMN_HEADER.trim();
                        displayGrdCheck[sds].TOGGLE_ORDER = this.displayEntitys[sds].TOGGLE_ORDER;
                        displayGrdCheck[sds].DEFAULT_TOGGLE_TEXT = this.displayEntitys[sds].DEFAULT_TOGGLE_TEXT.trim();
                        displayGrdCheck[sds].FLAG = this.displayEntitys[sds].FLAG;
                        displayGrdCheck[sds].mandryDisplay = this.displayEntitys[sds].mandryDisplay;
                        displayGrdCheck[sds].DEFAULT_DISPLAY_FIELD = this.displayEntitys[sds].DEFAULT_DISPLAY_FIELD;
                    }
                    this.statusMsg = "";
                    this.paramDisplay = false;
                    this.menuDisplay = false;
                    this.MOG = false;
                    this.screenDisplay = true;
                    this.growlMessage = [];
                    this.statusMsg = "Temporarily data is stored, Please click on Save Button in Parent Page to update the changes";
                    this.growlMessage.push({ severity: 'Info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: this.statusMsg });
                }
            }
            else {
                this.growlMessage = [];
                this.paramDisplay = false;
                this.menuDisplay = false;
                this.MOG = true;
                this.screenDisplay = false;
            }
        }
    };
    //Go Back Button Click for every navigate Page for params,menus,screen display
    ManageProfilesComponent.prototype.GobackData_Click = function () {
        if (name != "cancelscreen" || name == "" || name == null) {
            this.statusMsg = "";
            this.growlMessage = [];
            this.paramDisplay = false;
            this.menuDisplay = false;
            this.MOG = true;
            this.screenDisplay = false;
        }
        if (name != "cancelparam" || name == "" || name == null) {
            this.statusMsg = "";
            this.growlMessage = [];
            this.paramDisplay = false;
            this.menuDisplay = false;
            this.MOG = true;
            this.screenDisplay = false;
        }
        if (name != "cancelmenu" || name == "" || name == null) {
            this.statusMsg = "";
            this.growlMessage = [];
            this.paramDisplay = false;
            this.menuDisplay = false;
            this.MOG = true;
            this.screenDisplay = false;
        }
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
    };
    //screen display down change event
    ManageProfilesComponent.prototype.drpchnage = function () {
        var _this = this;
        this.statusMsg = "";
        this.growlMessage = [];
        this.lstdisplayCheckedparams = [];
        this.lblerrordisplaymsg = "";
        var iss = this.appId;
        this.loading = false;
        try {
            if (this.selectedScreenDisplayId == "") {
                this.growlMessage = [];
                this.displaydataGrid = false;
                this.btnscreen = false;
                return;
            }
            if (this.selectedScreenDisplayId == null) {
                this.growlMessage = [];
                this.errormessage = "Please select valid Screen Name";
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                this.displaydataGrid = false;
            }
            else {
                this.totallstDisplayItems = this.displayGrid.filter(function (x) { return x.APP_ID == _this.appId && x.SCREEN_NAME.toUpperCase() == _this.selectedScreenDisplayId.toUpperCase(); });
                this.displayEntitys = [];
                for (var sd = 0; sd < this.totallstDisplayItems.length; sd++) {
                    var displayentity = new vm_mt_atpar_profile_screen_display_1.VM_MT_ATPAR_PROFILE_SCREEN_DISPLAY();
                    {
                        displayentity.APP_ID = this.totallstDisplayItems[sd].APP_ID;
                        displayentity.SCREEN_NAME = this.totallstDisplayItems[sd].SCREEN_NAME;
                        displayentity.FIELD_NAME = this.totallstDisplayItems[sd].FIELD_NAME;
                        displayentity.COLUMN_HEADER = this.totallstDisplayItems[sd].COLUMN_HEADER;
                        displayentity.COLUMN_HEADER = displayentity.COLUMN_HEADER.replace(/\./g, ' ');
                        displayentity.DEFAULT_COLUMN_HEADER = this.totallstDisplayItems[sd].DEFAULT_COLUMN_HEADER;
                        displayentity.COLUMN_ORDER = this.totallstDisplayItems[sd].COLUMN_ORDER;
                        displayentity.COLUMN_WIDTH = this.totallstDisplayItems[sd].COLUMN_WIDTH;
                        displayentity.DEFAULT_DISPLAY_FLAG = this.totallstDisplayItems[sd].DEFAULT_DISPLAY_FLAG;
                        if (this.totallstDisplayItems[sd].FLAG != null || this.totallstDisplayItems[sd].FLAG != undefined) {
                            displayentity.DISPLAY_FIELD = this.totallstDisplayItems[sd].FLAG == true ? "Y" : "N";
                        }
                        else {
                            displayentity.DISPLAY_FIELD = this.totallstDisplayItems[sd].DISPLAY_FIELD;
                        }
                        displayentity.CHANGE_FLAG = this.totallstDisplayItems[sd].CHANGE_FLAG;
                        displayentity.MANDATORY_TOGGLE = this.totallstDisplayItems[sd].MANDATORY_TOGGLE;
                        displayentity.TOGGLE_FIELD = this.totallstDisplayItems[sd].TOGGLE_FIELD;
                        displayentity.DEFAULT_TOGGLE_TEXT = this.totallstDisplayItems[sd].DEFAULT_TOGGLE_TEXT;
                        displayentity.TOGGLE_ORDER = this.totallstDisplayItems[sd].TOGGLE_ORDER;
                        displayentity.DEFAULT_DISPLAY_FIELD = this.totallstDisplayItems[sd].DEFAULT_DISPLAY_FIELD;
                        displayentity.Isdisable = false;
                    }
                    this.displayEntitys.push(displayentity);
                }
                //  let data = this.totallstDisplayItems;
                var data = this.displayEntitys;
                for (var i = 0; i <= data.length - 1; i++) {
                    data[i].DEFAULT_COLUMN_HEADER = data[i].DEFAULT_COLUMN_HEADER.trim();
                    if (data[i].COLUMN_WIDTH == data[i].COLUMN_WIDTH) {
                        data[i].widthID = "manageDspColumn" + i;
                    }
                    if (data[i].COLUMN_ORDER == data[i].COLUMN_ORDER) {
                        data[i].DspId = "manageDspOrderColumn" + i;
                    }
                    if (data[i].DEFAULT_TOGGLE_TEXT == data[i].DEFAULT_TOGGLE_TEXT) {
                        data[i].toggleID = "manageDspToggleColumn" + i;
                        if (data[i].DEFAULT_TOGGLE_TEXT == "") {
                            data[i].toggleTextValue = false;
                        }
                        else {
                            data[i].toggleTextValue = true;
                        }
                    }
                    if (data[i].TOGGLE_ORDER == data[i].TOGGLE_ORDER) {
                        data[i].toggleOrderID = "manageDspTogOrderColumn" + i;
                        if (data[i].DEFAULT_TOGGLE_TEXT == "") {
                            data[i].toggleTextOrder = false;
                        }
                        else {
                            data[i].toggleTextOrder = true;
                        }
                    }
                    if (data[i].TOGGLE_FIELD.toUpperCase() == "I") {
                        data[i].toggleTextOrder = false;
                        data[i].toggleTextValue = false;
                    }
                    else {
                        data[i].toggleTextOrder = true;
                        data[i].toggleTextValue = true;
                    }
                    if (data[i].COLUMN_HEADER == data[i].COLUMN_HEADER) {
                        data[i].headerID = "manageDspHeaderColumn" + i;
                    }
                    if (data[i].DEFAULT_DISPLAY_FIELD == "Y") {
                        data[i].mandryDisplay = true;
                        data[i].FLAG = true;
                    }
                    else {
                        data[i].mandryDisplay = false;
                        data[i].FLAG = false;
                    }
                    if (data[i].DISPLAY_FIELD == "Y") {
                        data[i].FLAG = true;
                    }
                    else if (data[i].DEFAULT_DISPLAY_FIELD == "Y") {
                        data[i].FLAG = true;
                    }
                    else {
                        data[i].FLAG = false;
                    }
                }
                this.displaydataGrid = true;
                this.btnscreen = true;
                this.totallstDisplayItems = data;
                setTimeout(function () {
                    var txtPasswdValue = document.getElementById('manageDspHeaderColumn0');
                    txtPasswdValue.focus();
                }, 500);
            }
        }
        catch (exception) {
            this.clientErrorMsg(exception, "drpchnage");
        }
    };
    ManageProfilesComponent.prototype.ddlProfileChnage = function () {
        this.content = false;
    };
    ManageProfilesComponent.prototype.ngOnInit = function () {
        this.gridRows = +sessionStorage.getItem("RowsOfGridSelected");
        this.startindex = +sessionStorage.getItem("startindex");
        this.lstCheckedparams = new Array();
        this.lsthhtCheckedparams = new Array();
        this.BindGrid = new Array();
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.BindDropDown();
        this.recordsPerPageSize = +this.deviceTokenEntry[AtParEnums_6.TokenEntry_Enum.RecordsPerPage];
        //this.BindDropDownDisplay();
    };
    //Manage Profile Main DropDown
    ManageProfilesComponent.prototype.BindDropDown = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var exception_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.selectedOrgProfileId = "";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.httpservice.getSync({
                                "apiMethod": "/api/Common/GetProfiles",
                                params: {
                                    "userID": this.deviceTokenEntry[AtParEnums_6.TokenEntry_Enum.UserID]
                                }
                            }).then(function (res) { return res.json(); }).then(function (response) {
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        {
                                            _this.dropdownData = [];
                                            _this.spinnerService.stop();
                                            _this.dropdownData = [];
                                            _this.orgProfileData = response.DataList;
                                            if (_this.orgProfileData.length > 1) {
                                                _this.dropdownData.push({ label: "Select Profile", value: null });
                                                for (var i = 0; i < response.DataList.length; i++) {
                                                    if (_this.deviceTokenEntry[AtParEnums_6.TokenEntry_Enum.ProfileID] == "ADMIN") {
                                                        _this.dropdownData.push({ label: response.DataList[i].PROFILE_ID + " - " + response.DataList[i].PROFILE_DESCRIPTION.replace(/\%20/g, ' '), value: response.DataList[i].PROFILE_ID });
                                                    }
                                                    else {
                                                        if (response.DataList[i].PROFILE_ID.toUpperCase() !== "ADMIN") {
                                                            _this.dropdownData.push({ label: response.DataList[i].PROFILE_ID + " - " + response.DataList[i].PROFILE_DESCRIPTION.replace(/\%20/g, ' '), value: response.DataList[i].PROFILE_ID });
                                                        }
                                                    }
                                                }
                                            }
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Error:
                                        {
                                            _this.spinnerService.stop();
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                            break;
                                        }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        exception_1 = _a.sent();
                        this.clientErrorMsg(exception_1, "BindDropDown");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //Screen display DropDown
    ManageProfilesComponent.prototype.BindDropDownDisplay = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var exception_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.displaydataGrid = false;
                        this.dropdowndisplayData = [];
                        this.selectedScreenDisplayId = "";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.httpservice.getSync({
                                "apiMethod": "/api/ManageProfiles/GetProfileInfo",
                                params: {
                                    "profileID": this.selectedOrgProfileId,
                                }
                            }).then(function (res) { return res.json(); }).then(function (response) {
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        {
                                            _this.spinnerService.stop();
                                            _this.temp = response.DataDictionary["listScreenDisplay"].filter(function (x) { return x.APP_ID == _this.appId; });
                                            _this.distinctList = linq_es5_1.asEnumerable(_this.temp).Select(function (a) { return a.SCREEN_NAME.toUpperCase(); }).Distinct().ToArray();
                                            _this.dropdowndisplayData.push({ label: "Select Screen Name", value: null });
                                            for (var i = 0; i < _this.distinctList.length; i++) {
                                                _this.dropdowndisplayData.push({ label: _this.distinctList[i], value: _this.distinctList[i] });
                                            }
                                            //this.spinnerService.stop();
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Error:
                                        {
                                            _this.spinnerService.stop();
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                            break;
                                        }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        exception_2 = _a.sent();
                        this.clientErrorMsg(exception_2, "BindDropDownDisplay");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //Params DropDown
    ManageProfilesComponent.prototype.BindDropDownParam = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var exception_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.dropdownparamData = [];
                        // this.spinnerService.start();
                        return [4 /*yield*/, this.httpservice.getSync({
                                "apiMethod": "/api/Common/GetPrintersData",
                                params: {
                                    "appID": this.appId,
                                    "printerName": ""
                                }
                            }).then(function (res) { return res.json(); }).then(function (response) {
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        {
                                            _this.dropdownparamData = [];
                                            _this.paramdrp = response.DataList;
                                            _this.dropdownparamData.push({ label: "Select One", value: null });
                                            for (var i = 0; i < _this.paramdrp.length; i++) {
                                                _this.dropdownparamData.push({ label: _this.paramdrp[i].FRIENDLY_NAME, value: _this.paramdrp[i].FRIENDLY_NAME });
                                            }
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Error:
                                        {
                                            _this.dropdownparamData = [];
                                            _this.dropdownparamData.push({ label: "Select One", value: null });
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Warn:
                                        {
                                            _this.dropdownparamData = [];
                                            _this.dropdownparamData.push({ label: "Select One", value: null });
                                            _this.growlMessage = [];
                                            break;
                                        }
                                }
                            })];
                    case 1:
                        // this.spinnerService.start();
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        exception_3 = _a.sent();
                        this.clientErrorMsg(exception_3, "BindDropDownParam");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //Select ProfileId and Click on Go Button
    ManageProfilesComponent.prototype.go_Click = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var profileId, prfId, desc, val1, descriptipn, exception_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.content = false;
                        this.paramProfileId = "";
                        this.paraDescription = "";
                        this.saveloading = false;
                        this.buttonId = "";
                        this.errormessage = "";
                        this.displayErrorString = "";
                        if (!(this.selectedOrgProfileId == "" || this.selectedOrgProfileId == null || this.selectedOrgProfileId == "Select User")) return [3 /*break*/, 1];
                        this.growlMessage = [];
                        this.errormessage = "Please Select Profile ID";
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                        this.content = false;
                        return [3 /*break*/, 6];
                    case 1:
                        this.growlMessage = [];
                        this.BindGrid = [];
                        this.desc = false;
                        profileId = this.selectedOrgProfileId;
                        prfId = this.dropdownData.filter(function (x) { return x.value == profileId; });
                        desc = prfId[0].label;
                        val1 = prfId[0].value + " - ";
                        descriptipn = desc.replace(val1, "");
                        this.paramProfileId = profileId;
                        this.paraDescription = descriptipn;
                        this.paraDescription = this.paraDescription.replace(/\%20/g, ' ');
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.httpservice.getSync({
                                "apiMethod": "/api/ManageProfiles/GetProfileInfo",
                                params: {
                                    "profileID": profileId,
                                }
                            }).then(function (res) { return res.json(); }).then(function (response) {
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        {
                                            _this.spinnerService.stop();
                                            _this.content = true;
                                            _this.orgProfileDataList = response.DataDictionary;
                                            if (_this.orgProfileData != null) {
                                                for (var i = 0; i < response.DataDictionary["listProfiles"].length; i++) {
                                                    if (response.DataDictionary["listProfiles"][i].SERVER_USER == "Y") {
                                                        response.DataDictionary["listProfiles"][i].FLAG = true;
                                                    }
                                                    else {
                                                        response.DataDictionary["listProfiles"][i].FLAG = false;
                                                    }
                                                    if (response.DataDictionary["listProfiles"][i].CLIENT_USER == "Y") {
                                                        response.DataDictionary["listProfiles"][i].ClientFLAG = true;
                                                    }
                                                    else {
                                                        response.DataDictionary["listProfiles"][i].ClientFLAG = false;
                                                    }
                                                    if (response.DataDictionary["listProfiles"][i].SERVER_USER == "Y" && response.DataDictionary["listProfiles"][i].CLIENT_USER == "Y") {
                                                        response.DataDictionary["listProfiles"][i].displayscreen = true;
                                                        response.DataDictionary["listProfiles"][i].displayparam = true;
                                                        response.DataDictionary["listProfiles"][i].displaymenu = true;
                                                    }
                                                    else if (response.DataDictionary["listProfiles"][i].SERVER_USER != "Y" && response.DataDictionary["listProfiles"][i].CLIENT_USER == "N") {
                                                        response.DataDictionary["listProfiles"][i].displayscreen = true;
                                                        response.DataDictionary["listProfiles"][i].displayparam = true;
                                                        response.DataDictionary["listProfiles"][i].displaymenu = false;
                                                    }
                                                    else if (response.DataDictionary["listProfiles"][i].SERVER_USER == "Y" && response.DataDictionary["listProfiles"][i].CLIENT_USER != "N") {
                                                        response.DataDictionary["listProfiles"][i].displayscreen = false;
                                                        response.DataDictionary["listProfiles"][i].displayparam = true;
                                                        response.DataDictionary["listProfiles"][i].displaymenu = true;
                                                    }
                                                    else if (response.DataDictionary["listProfiles"][i].SERVER_USER == "Y" && response.DataDictionary["listProfiles"][i].CLIENT_USER == "N") {
                                                        response.DataDictionary["listProfiles"][i].displayscreen = false;
                                                        response.DataDictionary["listProfiles"][i].displayparam = true;
                                                        response.DataDictionary["listProfiles"][i].displaymenu = true;
                                                    }
                                                    else if (response.DataDictionary["listProfiles"][i].SERVER_USER == "N" && response.DataDictionary["listProfiles"][i].CLIENT_USER == "Y") {
                                                        response.DataDictionary["listProfiles"][i].displayscreen = true;
                                                        response.DataDictionary["listProfiles"][i].displayparam = true;
                                                        response.DataDictionary["listProfiles"][i].displaymenu = false;
                                                    }
                                                    if (_this.paramProfileId.toUpperCase() == "ADMIN") {
                                                        if (response.DataDictionary["listProfiles"][i].APP_NAME == "AtPar") {
                                                            response.DataDictionary["listProfiles"][i].paramDspHide = false;
                                                            response.DataDictionary["listProfiles"][i].menuhide = false;
                                                            response.DataDictionary["listProfiles"][i].hhthide = false;
                                                            response.DataDictionary["listProfiles"][i].AtparHide = true;
                                                        }
                                                        else {
                                                            response.DataDictionary["listProfiles"][i].paramDspHide = true;
                                                            response.DataDictionary["listProfiles"][i].menuhide = true;
                                                            response.DataDictionary["listProfiles"][i].hhthide = true;
                                                            response.DataDictionary["listProfiles"][i].AtparHide = false;
                                                        }
                                                    }
                                                    else {
                                                        if (response.DataDictionary["listProfiles"][i].APP_NAME == "AtPar") {
                                                            response.DataDictionary["listProfiles"][i].paramDspHide = false;
                                                            response.DataDictionary["listProfiles"][i].menuhide = true;
                                                            response.DataDictionary["listProfiles"][i].AtparHide = false;
                                                            response.DataDictionary["listProfiles"][i].hhthide = false;
                                                        }
                                                        else {
                                                            response.DataDictionary["listProfiles"][i].paramDspHide = true;
                                                            response.DataDictionary["listProfiles"][i].menuhide = true;
                                                            response.DataDictionary["listProfiles"][i].hhthide = true;
                                                            response.DataDictionary["listProfiles"][i].AtparHide = false;
                                                        }
                                                    }
                                                    if (response.DataDictionary["listProfiles"][i].APP_ID == AtParEnums_6.EnumApps.Auth || response.DataDictionary["listProfiles"][i].APP_ID == AtParEnums_6.EnumApps.Reports) {
                                                        response.DataDictionary["listProfiles"][i].paramDspHide = false;
                                                        response.DataDictionary["listProfiles"][i].hhthide = false;
                                                        response.DataDictionary["listProfiles"][i].menuhide = true;
                                                    }
                                                    else {
                                                        response.DataDictionary["listProfiles"][i].paramDspHide = true;
                                                        response.DataDictionary["listProfiles"][i].hhthide = true;
                                                        response.DataDictionary["listProfiles"][i].menuhide = true;
                                                    }
                                                }
                                                var griddata = response.DataDictionary["listProfiles"];
                                                _this.lstMenuItems = response.DataDictionary["listMenus"];
                                                _this.totallstParamItems = response.DataDictionary["listParams"];
                                                _this.totallstDisplayItems = response.DataDictionary["listScreenDisplay"];
                                                _this.menuGrid = response.DataDictionary["listMenus"];
                                                _this.paramGrid = response.DataDictionary["listParams"];
                                                _this.displayGrid = response.DataDictionary["listScreenDisplay"];
                                                _this.clientCount = response.DataDictionary["clientUserCount"];
                                                _this.serverCount = response.DataDictionary["serverUserCount"];
                                                _this.userCount = response.DataDictionary["profileIDCount"];
                                                _this.BindGrid = griddata;
                                                _this.growlMessage = [];
                                            }
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Error:
                                        {
                                            _this.spinnerService.stop();
                                            _this.growlMessage = [];
                                            _this.errormessage = response.StatusMessage;
                                            _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                            break;
                                        }
                                }
                            })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.httpservice.getSync({
                                "apiMethod": "/api/Common/GetAuditAllowed",
                                params: {
                                    "appId": 0,
                                    "menuCode": 'mt_atpar_manage_profiles.aspx'
                                }
                            }).then(function (res) { return res.json(); }).then(function (response) {
                                _this.audistStatus = response.Data;
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        {
                                            if (response.Data == "Y") {
                                                _this.lstauditallowed;
                                            }
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Error:
                                        {
                                            _this.spinnerService.stop();
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                            break;
                                        }
                                }
                            })];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        exception_4 = _a.sent();
                        this.clientErrorMsg(exception_4, "go_Click");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    // Create the Profile click button
    ManageProfilesComponent.prototype.create_Click = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var target, idAttr, exception_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.preventDefault();
                        this.lstmenuCheckedparams = [];
                        this.paramEntitys = [];
                        this.displayEntitys = [];
                        target = event.target || event.srcElement || event.currentTarget;
                        idAttr = target.attributes.id;
                        if (idAttr != null || idAttr != "") {
                            if (idAttr.nodeValue == undefined || idAttr.nodeValue == null || idAttr.nodeValue == "") {
                                this.buttonId = "create";
                            }
                            else {
                                this.buttonId = idAttr.nodeValue;
                            }
                        }
                        else {
                            this.buttonId = "create";
                        }
                        this.content = false;
                        this.errormessage = "";
                        this.BindGrid = [];
                        this.desc = true;
                        this.loading = false;
                        this.saveloading = false;
                        this.paramProfileId = "";
                        this.paraDescription = "";
                        this.growlMessage = [];
                        //this.PROFILE = [];
                        this.CreateProfile = [];
                        this.CreateParam = [];
                        this.CreateMenu = [];
                        this.CreateDisplay = [];
                        this.menuGrid = [];
                        this.paramGrid = [];
                        this.displayGrid = [];
                        this.BindDropDown();
                        this.orgProfileDataList = [];
                        if (this.profileId == undefined || this.profileId == null) {
                            this.profileId = '';
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.httpservice.getSync({
                                "apiMethod": "/api/ManageProfiles/GetProfileInfo",
                                params: {
                                    "profileID": this.profileId,
                                }
                            }).then(function (res) { return res.json(); }).then(function (response) {
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        {
                                            _this.spinnerService.stop();
                                            _this.content = true;
                                            _this.orgProfileDataList = response.DataDictionary;
                                            if (_this.orgProfileData != null) {
                                                for (var i = 0; i < response.DataDictionary["listProfiles"].length; i++) {
                                                    response.DataDictionary["listProfiles"][i].displayscreen = false;
                                                    response.DataDictionary["listProfiles"][i].displayparam = false;
                                                    response.DataDictionary["listProfiles"][i].displaymenu = false;
                                                    response.DataDictionary["listProfiles"][i].SERVER_USER = "N";
                                                    response.DataDictionary["listProfiles"][i].CLIENT_USER = "N";
                                                    if (response.DataDictionary["listProfiles"][i].APP_ID == AtParEnums_6.EnumApps.Auth || response.DataDictionary["listProfiles"][i].APP_ID == AtParEnums_6.EnumApps.Reports) {
                                                        response.DataDictionary["listProfiles"][i].paramDspHide = false;
                                                        response.DataDictionary["listProfiles"][i].hhthide = false;
                                                        response.DataDictionary["listProfiles"][i].menuhide = true;
                                                    }
                                                    else {
                                                        response.DataDictionary["listProfiles"][i].paramDspHide = true;
                                                        response.DataDictionary["listProfiles"][i].hhthide = true;
                                                        response.DataDictionary["listProfiles"][i].menuhide = true;
                                                    }
                                                }
                                                var griddata = response.DataDictionary["listProfiles"];
                                                _this.menuGrid = response.DataDictionary["listMenus"];
                                                _this.paramGrid = response.DataDictionary["listParams"];
                                                _this.displayGrid = response.DataDictionary["listScreenDisplay"];
                                                _this.BindGrid = griddata;
                                            }
                                            _this.saveloading = true;
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Error:
                                        {
                                            _this.spinnerService.stop();
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                            break;
                                        }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        exception_5 = _a.sent();
                        this.clientErrorMsg(exception_5, "create_Click");
                        return [2 /*return*/, 0];
                    case 4:
                        this.content = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    //Finally Save Button
    ManageProfilesComponent.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var PROFILE, HHT, PARAMS, MENUS, SCREENDISPLAY, dic1ProfileInfo, i, profileDatarow, s, screendata, s, screendata, screendata, lstSecurity, lstSecurity, lstSecurity, lstSecurity, lstSecurity, lstSecurity, p, Paramdatarow, lstGridview, lstGridParam, pg, gp, p, lstGridview, lstGridParam, pg, gp, lstSecurity, lstSecurity, lstSecurity, lstSecurity, data123, m, count1, lstSecurity, lstSecurity, m, lstSecurity, lstSecurity, sectitylst, dicProfileInfo, exception_6, exception_7, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 11, , 12]);
                        //var data12 = this.menusCheckvalues;
                        //if (this.menusCheckvalues.length > 0) {
                        //}
                        if (this.appId == undefined || this.appId == null) {
                            this.appId = 0;
                        }
                        if (this.buttonId != "create") {
                            // this.paraDescription = this.paramProfileId;
                        }
                        if (this.paramProfileId === "" && this.paraDescription === "") {
                            this.errormessage = "Please Enter Profile ID and Profile Description";
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                            return [2 /*return*/, 0];
                        }
                        else if (this.paramProfileId === "" || this.paramProfileId === null || this.paramProfileId === undefined) {
                            this.errormessage = "Please Enter Profile ID";
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                            return [2 /*return*/, 0];
                        }
                        else if (this.paraDescription === "" || this.paraDescription === null || this.paraDescription === undefined) {
                            this.errormessage = "Please Enter Profile Description";
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                            return [2 /*return*/, 0];
                        }
                        this.growlMessage = [];
                        this.errormessage = "";
                        PROFILE = new Array();
                        PROFILE = this.BindGrid;
                        HHT = new MT_ATPAR_APP_1.MT_ATPAR_APP();
                        HHT = this.lsthhtCheckedparams[0];
                        PARAMS = new Array();
                        PARAMS = this.paramGrid;
                        MENUS = new Array();
                        MENUS = this.menuGrid;
                        SCREENDISPLAY = new Array();
                        SCREENDISPLAY = this.displayGrid;
                        dic1ProfileInfo = { 'PROFILE': PROFILE, 'PARAMS': PARAMS, 'MENUS': MENUS, 'SCREENDISPLAY': SCREENDISPLAY };
                        for (i = 0; i < PROFILE.length; i++) {
                            this.profileAppId = PROFILE[i].APP_ID;
                            if (PROFILE[i].SERVER_USER != "Y") {
                                this.chrServer = "N";
                            }
                            else {
                                this.chrServer = "Y";
                            }
                            if (PROFILE[i].CLIENT_USER != "Y") {
                                this.chrClient = "N";
                            }
                            else {
                                this.chrClient = "Y";
                            }
                            if ((this.chrServer != (PROFILE[i].FLAG == true ? "Y" : "N"))
                                || (this.chrClient != (PROFILE[i].ClientFLAG == true ? "Y" : "N"))) {
                                profileDatarow = new MT_ATPAR_APP_1.MT_ATPAR_APP();
                                profileDatarow.APP_ID = PROFILE[i].APP_ID;
                                profileDatarow.SERVER_USER = PROFILE[i].FLAG == true ? "Y" : "N";
                                profileDatarow.CLIENT_USER = PROFILE[i].ClientFLAG == true ? "Y" : "N";
                                this.CreateProfile.push(profileDatarow);
                            }
                            if (PROFILE[i].ClientFLAG == true) {
                                if (SCREENDISPLAY.length != 0) {
                                    if (this.buttonId == "create") {
                                        for (s = 0; s <= SCREENDISPLAY.length - 1; s++) {
                                            if (this.profileAppId == 0) {
                                            }
                                            else {
                                                if (SCREENDISPLAY[s].FLAG != undefined || SCREENDISPLAY[s].FLAG != null) {
                                                    SCREENDISPLAY[s].DISPLAY_FIELD = SCREENDISPLAY[s].FLAG == true ? "Y" : "N";
                                                }
                                                else {
                                                    SCREENDISPLAY[s].DISPLAY_FIELD = SCREENDISPLAY[s].DISPLAY_FIELD;
                                                }
                                                // SCREENDISPLAY[s].DISPLAY_FIELD = SCREENDISPLAY[s].FLAG == true ? "Y" : "N";
                                                if (SCREENDISPLAY[s].APP_ID == this.profileAppId) {
                                                    screendata = new vm_mt_atpar_profile_screen_display_1.VM_MT_ATPAR_PROFILE_SCREEN_DISPLAY();
                                                    screendata.APP_ID = SCREENDISPLAY[s].APP_ID;
                                                    screendata.SCREEN_NAME = SCREENDISPLAY[s].SCREEN_NAME;
                                                    screendata.FIELD_NAME = SCREENDISPLAY[s].FIELD_NAME;
                                                    screendata.COLUMN_HEADER = SCREENDISPLAY[s].COLUMN_HEADER;
                                                    screendata.COLUMN_ORDER = SCREENDISPLAY[s].COLUMN_ORDER;
                                                    screendata.COLUMN_WIDTH = SCREENDISPLAY[s].COLUMN_WIDTH;
                                                    screendata.DISPLAY_FIELD = SCREENDISPLAY[s].DISPLAY_FIELD;
                                                    screendata.DEFAULT_TOGGLE_TEXT = SCREENDISPLAY[s].DEFAULT_TOGGLE_TEXT;
                                                    screendata.TOGGLE_ORDER = SCREENDISPLAY[s].TOGGLE_ORDER;
                                                    screendata.TOGGLE_FIELD = SCREENDISPLAY[s].TOGGLE_FIELD;
                                                    this.CreateDisplay.push(screendata);
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        for (s = 0; s <= SCREENDISPLAY.length - 1; s++) {
                                            // if (this.profileAppId != 0) {
                                            if (SCREENDISPLAY[s].DISPLAY_FIELD != (SCREENDISPLAY[s].FLAG == true ? "Y" : "N")) {
                                                SCREENDISPLAY[s].CHANGE_FLAG = "Y";
                                            }
                                            // SCREENDISPLAY[s].DISPLAY_FIELD = SCREENDISPLAY[s].FLAG == true ? "Y" : "N";
                                            if (SCREENDISPLAY[s].APP_ID == this.profileAppId) {
                                                if (SCREENDISPLAY[s].CHANGE_FLAG == "Y") {
                                                    screendata = new vm_mt_atpar_profile_screen_display_1.VM_MT_ATPAR_PROFILE_SCREEN_DISPLAY();
                                                    screendata.APP_ID = SCREENDISPLAY[s].APP_ID;
                                                    screendata.SCREEN_NAME = SCREENDISPLAY[s].SCREEN_NAME;
                                                    screendata.FIELD_NAME = SCREENDISPLAY[s].FIELD_NAME;
                                                    screendata.COLUMN_HEADER = SCREENDISPLAY[s].COLUMN_HEADER;
                                                    screendata.COLUMN_ORDER = SCREENDISPLAY[s].COLUMN_ORDER;
                                                    screendata.COLUMN_WIDTH = SCREENDISPLAY[s].COLUMN_WIDTH;
                                                    if (SCREENDISPLAY[s].FLAG == undefined || SCREENDISPLAY[s].FLAG == null) {
                                                        screendata.DISPLAY_FIELD = SCREENDISPLAY[s].DISPLAY_FIELD;
                                                    }
                                                    else {
                                                        screendata.DISPLAY_FIELD = SCREENDISPLAY[s].FLAG == true ? "Y" : "N";
                                                    }
                                                    screendata.DEFAULT_TOGGLE_TEXT = SCREENDISPLAY[s].DEFAULT_TOGGLE_TEXT;
                                                    screendata.TOGGLE_ORDER = SCREENDISPLAY[s].TOGGLE_ORDER;
                                                    screendata.TOGGLE_FIELD = SCREENDISPLAY[s].TOGGLE_FIELD;
                                                    this.CreateDisplay.push(screendata);
                                                }
                                                else {
                                                    screendata = new vm_mt_atpar_profile_screen_display_1.VM_MT_ATPAR_PROFILE_SCREEN_DISPLAY();
                                                    screendata.APP_ID = SCREENDISPLAY[s].APP_ID;
                                                    screendata.SCREEN_NAME = SCREENDISPLAY[s].SCREEN_NAME;
                                                    screendata.FIELD_NAME = SCREENDISPLAY[s].FIELD_NAME;
                                                    screendata.COLUMN_HEADER = SCREENDISPLAY[s].COLUMN_HEADER;
                                                    screendata.COLUMN_ORDER = SCREENDISPLAY[s].COLUMN_ORDER;
                                                    screendata.COLUMN_WIDTH = SCREENDISPLAY[s].COLUMN_WIDTH;
                                                    if (SCREENDISPLAY[s].FLAG == undefined || SCREENDISPLAY[s].FLAG == null) {
                                                        screendata.DISPLAY_FIELD = SCREENDISPLAY[s].DISPLAY_FIELD;
                                                    }
                                                    else {
                                                        screendata.DISPLAY_FIELD = SCREENDISPLAY[s].FLAG == true ? "Y" : "N";
                                                    }
                                                    screendata.DEFAULT_TOGGLE_TEXT = SCREENDISPLAY[s].DEFAULT_TOGGLE_TEXT;
                                                    screendata.TOGGLE_ORDER = SCREENDISPLAY[s].TOGGLE_ORDER;
                                                    screendata.TOGGLE_FIELD = SCREENDISPLAY[s].TOGGLE_FIELD;
                                                    this.CreateDisplay.push(screendata);
                                                }
                                            }
                                            if (this.displayGrid[s].APP_ID == this.profileAppId && this.displayGrid[s].SCREEN_NAME == this.selectedScreenDisplayId &&
                                                this.displayGrid[s].DEFAULT_COLUMN_HEADER == SCREENDISPLAY[s].COLUMN_HEADER) {
                                                if (this.buttonId != "create" && this.audistStatus == "Y") {
                                                    if (this.displayGrid[s].DISPLAY_FIELD != (SCREENDISPLAY[s].FLAG == true ? "Y" : "N")) {
                                                        lstSecurity = new MT_ATPAR_SECURITY_AUDIT_1.MT_ATPAR_SECURITY_AUDIT();
                                                        lstSecurity.KEY_1 = this.paramProfileId;
                                                        lstSecurity.KEY_2 = this.profileAppId.toString();
                                                        lstSecurity.KEY_3 = this.selectedScreenDisplayId;
                                                        lstSecurity.FIELD_NAME = "DISPLAY_COLUMN";
                                                        lstSecurity.OLD_VALUE = this.displayGrid[s].DISPLAY_FIELD;
                                                        lstSecurity.NEW_VALUE = SCREENDISPLAY[s].FLAG == true ? "Y" : "N";
                                                        this.lstauditallowed.push(lstSecurity);
                                                    }
                                                    else if (this.displayGrid[s].COLUMN_HEADER != SCREENDISPLAY[s].COLUMN_HEADER) {
                                                        lstSecurity = new MT_ATPAR_SECURITY_AUDIT_1.MT_ATPAR_SECURITY_AUDIT();
                                                        lstSecurity.KEY_1 = this.paramProfileId;
                                                        lstSecurity.KEY_2 = this.profileAppId.toString();
                                                        lstSecurity.KEY_3 = this.selectedScreenDisplayId;
                                                        lstSecurity.FIELD_NAME = "COLUMN_HEADER";
                                                        lstSecurity.OLD_VALUE = this.displayGrid[s].COLUMN_HEADER;
                                                        lstSecurity.NEW_VALUE = SCREENDISPLAY[s].COLUMN_HEADER;
                                                        this.lstauditallowed.push(lstSecurity);
                                                    }
                                                    else if (this.displayGrid[s].COLUMN_ORDER != SCREENDISPLAY[s].COLUMN_ORDER) {
                                                        lstSecurity = new MT_ATPAR_SECURITY_AUDIT_1.MT_ATPAR_SECURITY_AUDIT();
                                                        lstSecurity.KEY_1 = this.paramProfileId;
                                                        lstSecurity.KEY_2 = this.profileAppId.toString();
                                                        lstSecurity.KEY_3 = this.selectedScreenDisplayId;
                                                        lstSecurity.FIELD_NAME = "COLUMN_ORDER";
                                                        lstSecurity.OLD_VALUE = this.displayGrid[s].COLUMN_ORDER.toString();
                                                        lstSecurity.NEW_VALUE = SCREENDISPLAY[s].COLUMN_ORDER.toString();
                                                        this.lstauditallowed.push(lstSecurity);
                                                    }
                                                    else if (this.displayGrid[s].COLUMN_WIDTH != SCREENDISPLAY[s].COLUMN_WIDTH) {
                                                        lstSecurity = new MT_ATPAR_SECURITY_AUDIT_1.MT_ATPAR_SECURITY_AUDIT();
                                                        lstSecurity.KEY_1 = this.paramProfileId;
                                                        lstSecurity.KEY_2 = this.profileAppId.toString();
                                                        lstSecurity.KEY_3 = this.selectedScreenDisplayId;
                                                        lstSecurity.FIELD_NAME = "COLUMN_WIDTH";
                                                        lstSecurity.OLD_VALUE = this.displayGrid[s].COLUMN_WIDTH.toString();
                                                        lstSecurity.NEW_VALUE = SCREENDISPLAY[s].COLUMN_WIDTH.toString();
                                                        this.lstauditallowed.push(lstSecurity);
                                                    }
                                                    else if (this.displayGrid[s].TOGGLE_ORDER != SCREENDISPLAY[s].TOGGLE_ORDER) {
                                                        lstSecurity = new MT_ATPAR_SECURITY_AUDIT_1.MT_ATPAR_SECURITY_AUDIT();
                                                        lstSecurity.KEY_1 = this.paramProfileId;
                                                        lstSecurity.KEY_2 = this.profileAppId.toString();
                                                        lstSecurity.KEY_3 = this.selectedScreenDisplayId;
                                                        lstSecurity.FIELD_NAME = "TOGGLE_ORDER";
                                                        lstSecurity.OLD_VALUE = this.displayGrid[s].TOGGLE_ORDER;
                                                        lstSecurity.NEW_VALUE = SCREENDISPLAY[s].TOGGLE_ORDER;
                                                        this.lstauditallowed.push(lstSecurity);
                                                    }
                                                    else if (this.displayGrid[s].DEFAULT_TOGGLE_TEXT != SCREENDISPLAY[s].DEFAULT_TOGGLE_TEXT) {
                                                        lstSecurity = new MT_ATPAR_SECURITY_AUDIT_1.MT_ATPAR_SECURITY_AUDIT();
                                                        lstSecurity.KEY_1 = this.paramProfileId;
                                                        lstSecurity.KEY_2 = this.profileAppId.toString();
                                                        lstSecurity.KEY_3 = this.selectedScreenDisplayId;
                                                        lstSecurity.FIELD_NAME = "DEFAULT_TOGGLE_TEXT";
                                                        lstSecurity.OLD_VALUE = this.displayGrid[s].DEFAULT_TOGGLE_TEXT;
                                                        lstSecurity.NEW_VALUE = SCREENDISPLAY[s].DEFAULT_TOGGLE_TEXT;
                                                        this.lstauditallowed.push(lstSecurity);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            if (PROFILE[i].ClientFLAG == true || PROFILE[i].FLAG == true) {
                                if (PARAMS.length > 0) {
                                    if (this.buttonId == "create") {
                                        for (p = 0; p <= PARAMS.length - 1; p++) {
                                            if (this.profileAppId == 0) {
                                            }
                                            else {
                                                if (PARAMS[p].APP_ID == this.profileAppId) {
                                                    Paramdatarow = new vm_mt_atpar_profile_app_parameters_1.VM_MT_ATPAR_PROFILE_APP_PARAMETERS();
                                                    Paramdatarow.APP_ID = PARAMS[p].APP_ID;
                                                    Paramdatarow.PARAMETER_ID = PARAMS[p].PARAMETER_ID;
                                                    if (PARAMS[p].PARAMETER_TYPE == "CHECKBOX") {
                                                        if (PARAMS[p].PARAMETER_VALUE == "Y") {
                                                            PARAMS[p].FLAG = true;
                                                        }
                                                        Paramdatarow.PARAMETER_VALUE = PARAMS[p].FLAG == true ? "Y" : "N";
                                                    }
                                                    else if (PARAMS[p].PARAMETER_TYPE == "RADIO") {
                                                        if ((this.appId == 5 && PARAMS[p].PARAMETER_ID === "SHIPPING_LABEL_PRINT_OPTIONS") || (this.appId == 4 && PARAMS[p].PARAMETER_ID === "RECEIPT_DELIVER_PRINT_OPTIONS")) {
                                                            Paramdatarow.PARAMETER_VALUE = "";
                                                            if (PARAMS[p].PARAMETER_VALUE === 'None' ||
                                                                PARAMS[p].PARAMETER_VALUE === AtParEnums_2.Shiping_Label_PrinterType.None.toString()) {
                                                                Paramdatarow.PARAMETER_VALUE = "1";
                                                                //this.strParamValue = Shiping_Label_PrinterType.None.toString();
                                                            }
                                                            else if (PARAMS[p].PARAMETER_VALUE === 'Print Header Label only to a Mobile Printer' ||
                                                                PARAMS[p].PARAMETER_VALUE === AtParEnums_2.Shiping_Label_PrinterType.HeaderLbl_MobilePrinter.toString()) {
                                                                //this.strParamValue = Shiping_Label_PrinterType.HeaderLbl_MobilePrinter.toString();
                                                                Paramdatarow.PARAMETER_VALUE = "2";
                                                            }
                                                            else if (PARAMS[p].PARAMETER_VALUE === 'Print Delivery Ticket only to a Stationary Printer' ||
                                                                PARAMS[p].PARAMETER_VALUE === AtParEnums_2.Shiping_Label_PrinterType.DeliveryTic_StationaryPrinter.toString()) {
                                                                //  this.strParamValue = Shiping_Label_PrinterType.DeliveryTic_StationaryPrinter.toString();
                                                                Paramdatarow.PARAMETER_VALUE = "3";
                                                            }
                                                            else if (PARAMS[p].PARAMETER_VALUE === 'Print Header Label to a Mobile Printer and Delivery Ticket to a Stationary Printer' ||
                                                                PARAMS[p].PARAMETER_VALUE === AtParEnums_2.Shiping_Label_PrinterType.Both_MobilePrinter_StationaryPrinter.toString()) {
                                                                //this.strParamValue = Shiping_Label_PrinterType.Both_MobilePrinter_StationaryPrinter.toString();
                                                                Paramdatarow.PARAMETER_VALUE = "4";
                                                            }
                                                            else {
                                                                //this.strParamValue = Shiping_Label_PrinterType.User_Option.valueOf();
                                                                Paramdatarow.PARAMETER_VALUE = "5";
                                                            }
                                                        }
                                                        else {
                                                            Paramdatarow.PARAMETER_VALUE = PARAMS[p].PARAMETER_VALUE;
                                                        }
                                                    }
                                                    else if (PARAMS[p].PARAMETER_TYPE == "TEXTBOX") {
                                                        Paramdatarow.PARAMETER_VALUE = PARAMS[p].PARAMETER_VALUE;
                                                    }
                                                    else if (PARAMS[p].PARAMETER_TYPE == "GRIDVIEW") {
                                                        this.strValue = "";
                                                        this.strModule = "";
                                                        lstGridview = this.gridViewAllowEditingParamValues;
                                                        lstGridParam = this.gridViewParamValues;
                                                        if (lstGridview.length == 0 || lstGridview == undefined || lstGridview == null) {
                                                            Paramdatarow.PARAMETER_VALUE = PARAMS[p].PARAMETER_VALUE;
                                                        }
                                                        else if (this.appId == AtParEnums_6.EnumApps.PointOfUse && PARAMS[p].PARAMETER_ID == "ALLOW_EDITING_CASE") {
                                                            for (pg = 0; pg < lstGridview.length; pg++) {
                                                                if (lstGridview[pg].CHECKVALUE == true) {
                                                                    this.strValue = this.strValue + "1" + "-";
                                                                    this.blnCaseEdit = true;
                                                                }
                                                                else {
                                                                    this.strValue = this.strValue + "0" + "-";
                                                                }
                                                                // strModule = CType(gvRow.FindControl("Option"), Label).Text
                                                                this.strModule = lstGridview[pg].OPTION.toString();
                                                                if (this.strModule == AtParEnums_4.CASE_EDITING_OPTIONS[AtParEnums_4.CASE_EDITING_OPTIONS.AddCase].toString()) {
                                                                    this.strValue = this.strValue + AtParEnums_4.CASE_EDITING_OPTIONS.AddCase + ",";
                                                                }
                                                                else if (this.strModule == AtParEnums_4.CASE_EDITING_OPTIONS[AtParEnums_4.CASE_EDITING_OPTIONS.ChangeStatus].toString()) {
                                                                    this.strValue = this.strValue + AtParEnums_4.CASE_EDITING_OPTIONS.ChangeStatus + ",";
                                                                }
                                                                else if (this.strModule == AtParEnums_4.CASE_EDITING_OPTIONS[AtParEnums_4.CASE_EDITING_OPTIONS.ReplaceCase].toString()) {
                                                                    this.strValue = this.strValue + AtParEnums_4.CASE_EDITING_OPTIONS.ReplaceCase + ",";
                                                                }
                                                                else if (this.strModule == AtParEnums_4.CASE_EDITING_OPTIONS[AtParEnums_4.CASE_EDITING_OPTIONS.ReplacePref].toString()) {
                                                                    this.strValue = this.strValue + AtParEnums_4.CASE_EDITING_OPTIONS.ReplacePref + ",";
                                                                }
                                                            }
                                                        }
                                                        else if (lstGridParam.length == 0 || lstGridParam == undefined || lstGridParam == null) {
                                                            Paramdatarow.PARAMETER_VALUE = PARAMS[p].PARAMETER_VALUE;
                                                        }
                                                        else
                                                            for (gp = 0; gp < lstGridParam.length; gp++) {
                                                                if (lstGridParam[gp].CHECKVALUE == true) {
                                                                    this.strValue = this.strValue + "1" + "-";
                                                                    this.blnPOUMenu = true;
                                                                }
                                                                else {
                                                                    this.strValue = this.strValue + "0" + "-";
                                                                }
                                                                // strModule = CType(gvRow.FindControl("MENU"), Label).Text
                                                                this.strModule = lstGridParam[gp].MENU.toString();
                                                                if (this.appId == AtParEnums_6.EnumApps.Pharmacy) {
                                                                    if (this.strModule == AtParEnums_5.Pharmacy_Menus[AtParEnums_5.Pharmacy_Menus.Cyclecount].toString()) {
                                                                        this.strValue = this.strValue + AtParEnums_5.Pharmacy_Menus.Cyclecount + "-";
                                                                    }
                                                                    else if (this.strModule == AtParEnums_5.Pharmacy_Menus[AtParEnums_5.Pharmacy_Menus.Issue].toString()) {
                                                                        this.strValue = this.strValue + AtParEnums_5.Pharmacy_Menus.Issue + "-";
                                                                    }
                                                                    else if (this.strModule == AtParEnums_5.Pharmacy_Menus[AtParEnums_5.Pharmacy_Menus.Pick].toString()) {
                                                                        this.strValue = this.strValue + AtParEnums_5.Pharmacy_Menus.Pick + "-";
                                                                    }
                                                                    else if (this.strModule == AtParEnums_5.Pharmacy_Menus[AtParEnums_5.Pharmacy_Menus.Deliver].toString()) {
                                                                        this.strValue = this.strValue + AtParEnums_5.Pharmacy_Menus.Deliver + "-";
                                                                    }
                                                                    else if (this.strModule == AtParEnums_5.Pharmacy_Menus[AtParEnums_5.Pharmacy_Menus.Putaway].toString()) {
                                                                        this.strValue = this.strValue + AtParEnums_5.Pharmacy_Menus.Putaway + "-";
                                                                    }
                                                                    else if (this.strModule == AtParEnums_5.Pharmacy_Menus[AtParEnums_5.Pharmacy_Menus.RxPick].toString()) {
                                                                        this.strValue = this.strValue + AtParEnums_5.Pharmacy_Menus.RxPick + "-";
                                                                    }
                                                                }
                                                                else {
                                                                    if (this.strModule == AtParEnums_3.POU_Menus[AtParEnums_3.POU_Menus.Issue].toString()) {
                                                                        this.strValue = this.strValue + AtParEnums_3.POU_Menus.Issue + "-";
                                                                    }
                                                                    else if (this.strModule == AtParEnums_3.POU_Menus[AtParEnums_3.POU_Menus.Returns].toString()) {
                                                                        this.strValue = this.strValue + AtParEnums_3.POU_Menus.Returns + "-";
                                                                    }
                                                                    else if (this.strModule == AtParEnums_3.POU_Menus[AtParEnums_3.POU_Menus.Cyclecount].toString()) {
                                                                        this.strValue = this.strValue + AtParEnums_3.POU_Menus.Cyclecount + "-";
                                                                    }
                                                                    else if (this.strModule == AtParEnums_3.POU_Menus[AtParEnums_3.POU_Menus.Putaway].toString()) {
                                                                        this.strValue = this.strValue + AtParEnums_3.POU_Menus.Putaway + "-";
                                                                    }
                                                                    else if (this.strModule == AtParEnums_3.POU_Menus[AtParEnums_3.POU_Menus.CasePick].toString()) {
                                                                        this.strValue = this.strValue + AtParEnums_3.POU_Menus.CasePick + "-";
                                                                    }
                                                                    else if (this.strModule == AtParEnums_3.POU_Menus[AtParEnums_3.POU_Menus.CaseIssue].toString()) {
                                                                        this.strValue = this.strValue + AtParEnums_3.POU_Menus.CaseIssue + "-";
                                                                    }
                                                                    else if (this.strModule == AtParEnums_3.POU_Menus[AtParEnums_3.POU_Menus.RecordConsumption].toString()) {
                                                                        this.strValue = this.strValue + AtParEnums_3.POU_Menus.RecordConsumption + "-";
                                                                    }
                                                                    else if (this.strModule == AtParEnums_3.POU_Menus[AtParEnums_3.POU_Menus.RecordConSearch].toString()) {
                                                                        this.strValue = this.strValue + AtParEnums_3.POU_Menus.RecordConSearch + "-";
                                                                    }
                                                                    else if (this.strModule == AtParEnums_3.POU_Menus[AtParEnums_3.POU_Menus.Pick].toString()) {
                                                                        this.strValue = this.strValue + AtParEnums_3.POU_Menus.Pick + "-";
                                                                    }
                                                                }
                                                                this.strValue = this.strValue + lstGridParam[gp].ORDER.toString() + ",";
                                                            }
                                                        if (this.strValue != "") {
                                                            this.strValue = this.strValue.substring(0, (this.strValue.length - 1));
                                                            Paramdatarow.PARAMETER_VALUE = this.strValue;
                                                        }
                                                        else {
                                                            Paramdatarow.PARAMETER_VALUE = PARAMS[p].PARAMETER_VALUE;
                                                        }
                                                    }
                                                    else {
                                                        Paramdatarow.PARAMETER_VALUE = PARAMS[p].PARAMETER_VALUE;
                                                    }
                                                    this.CreateParam.push(Paramdatarow);
                                                }
                                            }
                                            this.strModule = "";
                                            this.strValue = "";
                                        }
                                    }
                                    else {
                                        for (p = 0; p <= PARAMS.length - 1; p++) {
                                            //  if (this.profileAppId != 0) {
                                            if (PARAMS[p].APP_ID == this.profileAppId) {
                                                if (PARAMS[p].PARAMETER_TYPE == "CHECKBOX") {
                                                    if (PARAMS[p].PARAMETER_VALUE == "Y") {
                                                        PARAMS[p].FLAG = true;
                                                    }
                                                    PARAMS[p].PARAMETER_VALUE = PARAMS[p].FLAG == true ? "Y" : "N";
                                                }
                                                else if (PARAMS[p].PARAMETER_TYPE == "GRIDVIEW") {
                                                    this.strValue = "";
                                                    this.strModule = "";
                                                    lstGridview = this.gridViewAllowEditingParamValues;
                                                    lstGridParam = this.gridViewParamValues;
                                                    if (lstGridview.length == 0) {
                                                        PARAMS[p].PARAMETER_VALUE = PARAMS[p].PARAMETER_VALUE;
                                                    }
                                                    else if (this.appId == AtParEnums_6.EnumApps.PointOfUse && PARAMS[p].PARAMETER_ID == "ALLOW_EDITING_CASE") {
                                                        for (pg = 0; pg < lstGridview.length; pg++) {
                                                            if (lstGridview[pg].CHECKVALUE == true) {
                                                                this.strValue = this.strValue + "1" + "-";
                                                                this.blnCaseEdit = true;
                                                            }
                                                            else {
                                                                this.strValue = this.strValue + "0" + "-";
                                                            }
                                                            // strModule = CType(gvRow.FindControl("Option"), Label).Text
                                                            this.strModule = lstGridview[pg].OPTION.toString();
                                                            if (this.strModule == AtParEnums_4.CASE_EDITING_OPTIONS[AtParEnums_4.CASE_EDITING_OPTIONS.AddCase].toString()) {
                                                                this.strValue = this.strValue + AtParEnums_4.CASE_EDITING_OPTIONS.AddCase + ",";
                                                            }
                                                            else if (this.strModule == AtParEnums_4.CASE_EDITING_OPTIONS[AtParEnums_4.CASE_EDITING_OPTIONS.ChangeStatus].toString()) {
                                                                this.strValue = this.strValue + AtParEnums_4.CASE_EDITING_OPTIONS.ChangeStatus + ",";
                                                            }
                                                            else if (this.strModule == AtParEnums_4.CASE_EDITING_OPTIONS[AtParEnums_4.CASE_EDITING_OPTIONS.ReplaceCase].toString()) {
                                                                this.strValue = this.strValue + AtParEnums_4.CASE_EDITING_OPTIONS.ReplaceCase + ",";
                                                            }
                                                            else if (this.strModule == AtParEnums_4.CASE_EDITING_OPTIONS[AtParEnums_4.CASE_EDITING_OPTIONS.ReplacePref].toString()) {
                                                                this.strValue = this.strValue + AtParEnums_4.CASE_EDITING_OPTIONS.ReplacePref + ",";
                                                            }
                                                        }
                                                    }
                                                    else if (lstGridParam.length == 0) {
                                                        PARAMS[p].PARAMETER_VALUE = PARAMS[p].PARAMETER_VALUE;
                                                    }
                                                    else
                                                        for (gp = 0; gp < lstGridParam.length; gp++) {
                                                            if (lstGridParam[gp].CHECKVALUE == true) {
                                                                this.strValue = this.strValue + "1" + "-";
                                                                this.blnPOUMenu = true;
                                                            }
                                                            else {
                                                                this.strValue = this.strValue + "0" + "-";
                                                            }
                                                            // strModule = CType(gvRow.FindControl("MENU"), Label).Text
                                                            this.strModule = lstGridParam[gp].MENU.toString();
                                                            if (this.appId == AtParEnums_6.EnumApps.Pharmacy) {
                                                                if (this.strModule == AtParEnums_5.Pharmacy_Menus[AtParEnums_5.Pharmacy_Menus.Cyclecount].toString()) {
                                                                    this.strValue = this.strValue + AtParEnums_5.Pharmacy_Menus.Cyclecount + "-";
                                                                }
                                                                else if (this.strModule == AtParEnums_5.Pharmacy_Menus[AtParEnums_5.Pharmacy_Menus.Issue].toString()) {
                                                                    this.strValue = this.strValue + AtParEnums_5.Pharmacy_Menus.Issue + "-";
                                                                }
                                                                else if (this.strModule == AtParEnums_5.Pharmacy_Menus[AtParEnums_5.Pharmacy_Menus.Pick].toString()) {
                                                                    this.strValue = this.strValue + AtParEnums_5.Pharmacy_Menus.Pick + "-";
                                                                }
                                                                else if (this.strModule == AtParEnums_5.Pharmacy_Menus[AtParEnums_5.Pharmacy_Menus.Deliver].toString()) {
                                                                    this.strValue = this.strValue + AtParEnums_5.Pharmacy_Menus.Deliver + "-";
                                                                }
                                                                else if (this.strModule == AtParEnums_5.Pharmacy_Menus[AtParEnums_5.Pharmacy_Menus.Putaway].toString()) {
                                                                    this.strValue = this.strValue + AtParEnums_5.Pharmacy_Menus.Putaway + "-";
                                                                }
                                                                else if (this.strModule == AtParEnums_5.Pharmacy_Menus[AtParEnums_5.Pharmacy_Menus.RxPick].toString()) {
                                                                    this.strValue = this.strValue + AtParEnums_5.Pharmacy_Menus.RxPick + "-";
                                                                }
                                                            }
                                                            else {
                                                                if (this.strModule == AtParEnums_3.POU_Menus[AtParEnums_3.POU_Menus.Issue].toString()) {
                                                                    this.strValue = this.strValue + AtParEnums_3.POU_Menus.Issue + "-";
                                                                }
                                                                else if (this.strModule == AtParEnums_3.POU_Menus[AtParEnums_3.POU_Menus.Returns].toString()) {
                                                                    this.strValue = this.strValue + AtParEnums_3.POU_Menus.Returns + "-";
                                                                }
                                                                else if (this.strModule == AtParEnums_3.POU_Menus[AtParEnums_3.POU_Menus.Cyclecount].toString()) {
                                                                    this.strValue = this.strValue + AtParEnums_3.POU_Menus.Cyclecount + "-";
                                                                }
                                                                else if (this.strModule == AtParEnums_3.POU_Menus[AtParEnums_3.POU_Menus.Putaway].toString()) {
                                                                    this.strValue = this.strValue + AtParEnums_3.POU_Menus.Putaway + "-";
                                                                }
                                                                else if (this.strModule == AtParEnums_3.POU_Menus[AtParEnums_3.POU_Menus.CasePick].toString()) {
                                                                    this.strValue = this.strValue + AtParEnums_3.POU_Menus.CasePick + "-";
                                                                }
                                                                else if (this.strModule == AtParEnums_3.POU_Menus[AtParEnums_3.POU_Menus.CaseIssue].toString()) {
                                                                    this.strValue = this.strValue + AtParEnums_3.POU_Menus.CaseIssue + "-";
                                                                }
                                                                else if (this.strModule == AtParEnums_3.POU_Menus[AtParEnums_3.POU_Menus.RecordConsumption].toString()) {
                                                                    this.strValue = this.strValue + AtParEnums_3.POU_Menus.RecordConsumption + "-";
                                                                }
                                                                else if (this.strModule == AtParEnums_3.POU_Menus[AtParEnums_3.POU_Menus.RecordConSearch].toString()) {
                                                                    this.strValue = this.strValue + AtParEnums_3.POU_Menus.RecordConSearch + "-";
                                                                }
                                                                else if (this.strModule == AtParEnums_3.POU_Menus[AtParEnums_3.POU_Menus.Pick].toString()) {
                                                                    this.strValue = this.strValue + AtParEnums_3.POU_Menus.Pick + "-";
                                                                }
                                                            }
                                                            this.strValue = this.strValue + lstGridParam[gp].ORDER.toString() + ",";
                                                        }
                                                    if (this.strValue != "") {
                                                        this.strValue = this.strValue.substring(0, (this.strValue.length - 1));
                                                        PARAMS[p].PARAMETER_VALUE = this.strValue;
                                                    }
                                                    else {
                                                        PARAMS[p].PARAMETER_VALUE = PARAMS[p].PARAMETER_VALUE;
                                                    }
                                                    this.CreateParam.push(PARAMS[p]);
                                                }
                                                if (PARAMS[p].PARAMETER_VALUE != PARAMS[p].PARAMETER_COMP_VALUE) {
                                                    if (PARAMS[p].PARAMETER_TYPE == "CHECKBOX") {
                                                        PARAMS[p].PARAMETER_VALUE = PARAMS[p].FLAG == true ? "Y" : "N";
                                                    }
                                                    this.CreateParam.push(PARAMS[p]);
                                                }
                                                if ((this.chrServer == "N" && ((PROFILE[i].FLAG == true ? "Y" : "N") == "Y"))
                                                    || (this.chrClient == "N" && ((PROFILE[i].ClientFLAG == true ? "Y" : "N") == "Y"))) {
                                                    if (PARAMS[p].PARAMETER_TYPE == "CHECKBOX") {
                                                        PARAMS[p].PARAMETER_VALUE = PARAMS[p].FLAG == true ? "Y" : "N";
                                                    }
                                                    this.CreateParam.push(PARAMS[p]);
                                                }
                                            }
                                            //  for (i = 0; i < this.paramGrid.length; i++) {
                                            if (this.paramGrid[p].APP_ID == this.profileAppId && this.paramGrid[p].PARAMETER_ID != PARAMS[p].PARAMETER_VALUE) {
                                                if (PARAMS[p].PARAMETER_TYPE == "CHECKBOX" || PARAMS[p].PARAMETER_TYPE == "TEXTBOX" ||
                                                    PARAMS[p].PARAMETER_TYPE == "COMBOBOX") {
                                                    if (this.buttonId != "create" && this.audistStatus == "Y") {
                                                        if (this.paramGrid[p].PARAMETER_COMP_VALUE != PARAMS[p].PARAMETER_VALUE) {
                                                            lstSecurity = new MT_ATPAR_SECURITY_AUDIT_1.MT_ATPAR_SECURITY_AUDIT();
                                                            lstSecurity.KEY_1 = this.paramProfileId;
                                                            lstSecurity.KEY_2 = this.profileAppId.toString();
                                                            lstSecurity.KEY_3 = PARAMS[p].PARAMETER_ID;
                                                            lstSecurity.FIELD_NAME = "PARAMETER_VALUE";
                                                            lstSecurity.OLD_VALUE = this.paramGrid[p].PARAMETER_COMP_VALUE;
                                                            lstSecurity.NEW_VALUE = PARAMS[p].PARAMETER_VALUE;
                                                            this.lstauditallowed.push(lstSecurity);
                                                        }
                                                    }
                                                }
                                            }
                                            if (PARAMS[p].PARAMETER_TYPE === "RADIO") {
                                                if ((this.appId == 5 && PARAMS[p].PARAMETER_ID === "SHIPPING_LABEL_PRINT_OPTIONS") || (this.appId == 4 && PARAMS[p].PARAMETER_ID === "RECEIPT_DELIVER_PRINT_OPTIONS")) {
                                                    this.strParamValue = "";
                                                    if (PARAMS[p].PARAMETER_VALUE === 'None' ||
                                                        PARAMS[p].PARAMETER_VALUE === AtParEnums_2.Shiping_Label_PrinterType.None.toString()) {
                                                        this.strParamValue = "1";
                                                        //this.strParamValue = Shiping_Label_PrinterType.None.toString();
                                                    }
                                                    else if (PARAMS[p].PARAMETER_VALUE === 'Print Header Label only to a Mobile Printer' ||
                                                        PARAMS[p].PARAMETER_VALUE === AtParEnums_2.Shiping_Label_PrinterType.HeaderLbl_MobilePrinter.toString()) {
                                                        //this.strParamValue = Shiping_Label_PrinterType.HeaderLbl_MobilePrinter.toString();
                                                        this.strParamValue = "2";
                                                    }
                                                    else if (PARAMS[p].PARAMETER_VALUE === 'Print Delivery Ticket only to a Stationary Printer' ||
                                                        PARAMS[p].PARAMETER_VALUE === AtParEnums_2.Shiping_Label_PrinterType.DeliveryTic_StationaryPrinter.toString()) {
                                                        //  this.strParamValue = Shiping_Label_PrinterType.DeliveryTic_StationaryPrinter.toString();
                                                        this.strParamValue = "3";
                                                    }
                                                    else if (PARAMS[p].PARAMETER_VALUE === 'Print Header Label to a Mobile Printer and Delivery Ticket to a Stationary Printer' ||
                                                        PARAMS[p].PARAMETER_VALUE === AtParEnums_2.Shiping_Label_PrinterType.Both_MobilePrinter_StationaryPrinter.toString()) {
                                                        //this.strParamValue = Shiping_Label_PrinterType.Both_MobilePrinter_StationaryPrinter.toString();
                                                        this.strParamValue = "4";
                                                    }
                                                    else {
                                                        //this.strParamValue = Shiping_Label_PrinterType.User_Option.valueOf();
                                                        this.strParamValue = "5";
                                                    }
                                                }
                                                else {
                                                    this.strParamValue = PARAMS[p].PARAMETER_VALUE;
                                                }
                                                if (PARAMS[p].PARAMETER_TYPE == "RADIO") {
                                                    if (this.buttonId != "create" && this.audistStatus == "Y") {
                                                        if (this.paramGrid[p].PARAMETER_VALUE != PARAMS[p].PARAMETER_VALUE) {
                                                            lstSecurity = new MT_ATPAR_SECURITY_AUDIT_1.MT_ATPAR_SECURITY_AUDIT();
                                                            lstSecurity.KEY_1 = this.paramProfileId;
                                                            lstSecurity.KEY_2 = this.profileAppId.toString();
                                                            lstSecurity.KEY_3 = PARAMS[p].PARAMETER_ID;
                                                            lstSecurity.FIELD_NAME = "PARAMETER_VALUE";
                                                            lstSecurity.OLD_VALUE = this.paramGrid[p].PARAMETER_VALUE;
                                                            lstSecurity.NEW_VALUE = this.strParamValue;
                                                            this.lstauditallowed.push(lstSecurity);
                                                        }
                                                    }
                                                }
                                                PARAMS[p].PARAMETER_VALUE = this.strParamValue;
                                            }
                                            if (PARAMS[p].PARAMETER_TYPE == "CHECKBOX" || PARAMS[p].PARAMETER_TYPE == "TEXTBOX" ||
                                                PARAMS[p].PARAMETER_TYPE == "COMBOBOX") {
                                                if (this.buttonId != "create" && this.audistStatus == "Y") {
                                                    if (this.paramGrid[p].PARAMETER_VALUE != PARAMS[p].PARAMETER_VALUE) {
                                                        lstSecurity = new MT_ATPAR_SECURITY_AUDIT_1.MT_ATPAR_SECURITY_AUDIT();
                                                        lstSecurity.KEY_1 = this.paramProfileId;
                                                        lstSecurity.KEY_2 = this.profileAppId.toString();
                                                        lstSecurity.KEY_3 = PARAMS[p].PARAMETER_ID;
                                                        lstSecurity.FIELD_NAME = "PARAMETER_VALUE";
                                                        lstSecurity.OLD_VALUE = this.paramGrid[p].PARAMETER_VALUE;
                                                        lstSecurity.NEW_VALUE = PARAMS[p].PARAMETER_VALUE;
                                                        this.lstauditallowed.push(lstSecurity);
                                                    }
                                                }
                                            }
                                            // }
                                            if (PARAMS[p].PARAMETER_TYPE == "RADIO") {
                                                if (this.buttonId != "create" && this.audistStatus == "Y") {
                                                    if (this.paramGrid[p].PARAMETER_VALUE != PARAMS[p].PARAMETER_VALUE) {
                                                        lstSecurity = new MT_ATPAR_SECURITY_AUDIT_1.MT_ATPAR_SECURITY_AUDIT();
                                                        lstSecurity.KEY_1 = this.paramProfileId;
                                                        lstSecurity.KEY_2 = this.profileAppId.toString();
                                                        lstSecurity.KEY_3 = PARAMS[p].PARAMETER_ID;
                                                        lstSecurity.FIELD_NAME = "PARAMETER_VALUE";
                                                        lstSecurity.OLD_VALUE = this.paramGrid[p].PARAMETER_VALUE;
                                                        lstSecurity.NEW_VALUE = this.strValue;
                                                        this.lstauditallowed.push(lstSecurity);
                                                    }
                                                }
                                            }
                                            // }
                                        }
                                    }
                                }
                            }
                            data123 = this.lstmenuCheckedparams;
                            if (MENUS.length > 0) {
                                for (m = 0; m <= MENUS.length - 1; m++) {
                                    if (this.buttonId == "create") {
                                        count1 = this.lstmenuCheckedparams.filter(function (x) { return x.APP_ID == _this.profileAppId; }).length;
                                        if (this.paramProfileId != null && this.paramProfileId.toUpperCase() == "ADMIN") {
                                            if (this.profileAppId != 0) {
                                                if (count1 >= 1 || count1 == 1) {
                                                    if (MENUS[m].APP_ID == this.profileAppId) {
                                                        MENUS[m].APP_ID = MENUS[m].APP_ID;
                                                        MENUS[m].MENU_CODE = MENUS[m].MENU_CODE;
                                                        MENUS[m].MENU_SEQ_NO = MENUS[m].MENU_SEQ_NO;
                                                        //  MENUS[m].CHKSTATUS = MENUS[m].FLAG == true ? "Y" : "N";
                                                        if (MENUS[m].FLAG == undefined || MENUS[m].FLAG == null) {
                                                            MENUS[m].CHKSTATUS = MENUS[m].CHKSTATUS;
                                                        }
                                                        else {
                                                            MENUS[m].CHKSTATUS = MENUS[m].FLAG == true ? "Y" : "N";
                                                        }
                                                        MENUS[m].CHK_STATUS = MENUS[m].CHKSTATUS;
                                                        this.CreateMenu.push(MENUS[m]);
                                                    }
                                                }
                                                else if (MENUS[m].APP_ID == this.profileAppId) {
                                                    MENUS[m].APP_ID = MENUS[m].APP_ID;
                                                    MENUS[m].MENU_CODE = MENUS[m].MENU_CODE;
                                                    MENUS[m].MENU_SEQ_NO = MENUS[m].MENU_SEQ_NO;
                                                    //  MENUS[m].CHKSTATUS = MENUS[m].FLAG == true ? "Y" : "N";
                                                    if (MENUS[m].FLAG == undefined || MENUS[m].FLAG == null) {
                                                        MENUS[m].CHKSTATUS = "Y";
                                                    }
                                                    else {
                                                        MENUS[m].CHKSTATUS = "Y";
                                                    }
                                                    MENUS[m].CHK_STATUS = MENUS[m].CHKSTATUS;
                                                    this.CreateMenu.push(MENUS[m]);
                                                }
                                            }
                                        }
                                        else {
                                            if (this.profileAppId != 0) {
                                                if (count1 >= 1 || count1 == 1) {
                                                    if (MENUS[m].APP_ID == this.profileAppId) {
                                                        MENUS[m].APP_ID = MENUS[m].APP_ID;
                                                        MENUS[m].MENU_CODE = MENUS[m].MENU_CODE;
                                                        MENUS[m].MENU_SEQ_NO = MENUS[m].MENU_SEQ_NO;
                                                        //  MENUS[m].CHKSTATUS = MENUS[m].FLAG == true ? "Y" : "N";
                                                        if (MENUS[m].FLAG == undefined || MENUS[m].FLAG == null) {
                                                            MENUS[m].CHKSTATUS = MENUS[m].CHKSTATUS;
                                                        }
                                                        else {
                                                            MENUS[m].CHKSTATUS = MENUS[m].FLAG == true ? "Y" : "N";
                                                        }
                                                        MENUS[m].CHK_STATUS = MENUS[m].CHKSTATUS;
                                                        this.CreateMenu.push(MENUS[m]);
                                                    }
                                                }
                                                else if (MENUS[m].APP_ID == this.profileAppId && count1 == 0) {
                                                    MENUS[m].APP_ID = MENUS[m].APP_ID;
                                                    MENUS[m].MENU_CODE = MENUS[m].MENU_CODE;
                                                    MENUS[m].MENU_SEQ_NO = MENUS[m].MENU_SEQ_NO;
                                                    if (MENUS[m].FLAG == undefined || MENUS[m].FLAG == null) {
                                                        MENUS[m].CHKSTATUS = "Y";
                                                    }
                                                    else {
                                                        MENUS[m].CHKSTATUS = "Y";
                                                    }
                                                    // MENUS[m].CHKSTATUS = MENUS[m].FLAG == true ? "Y" : "N";
                                                    MENUS[m].CHK_STATUS = MENUS[m].CHKSTATUS;
                                                    this.CreateMenu.push(MENUS[m]);
                                                }
                                            }
                                            else {
                                                if (this.profileAppId == 0) {
                                                    if (MENUS[m].APP_ID == this.profileAppId) {
                                                        MENUS[m].APP_ID = MENUS[m].APP_ID;
                                                        MENUS[m].MENU_CODE = MENUS[m].MENU_CODE;
                                                        MENUS[m].MENU_SEQ_NO = MENUS[m].MENU_SEQ_NO;
                                                        MENUS[m].CHKSTATUS = "Y";
                                                        // MENUS[m].CHKSTATUS = MENUS[m].FLAG == true ? "Y" : "N";
                                                        MENUS[m].CHK_STATUS = MENUS[m].CHKSTATUS;
                                                        this.CreateMenu.push(MENUS[m]);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        if (MENUS[m].APP_ID == this.profileAppId) {
                                            MENUS[m].APP_ID = MENUS[m].APP_ID;
                                            MENUS[m].MENU_CODE = MENUS[m].MENU_CODE;
                                            MENUS[m].MENU_SEQ_NO = MENUS[m].MENU_SEQ_NO;
                                            if (MENUS[m].FLAG == undefined || MENUS[m].FLAG == null) {
                                                MENUS[m].CHKSTATUS = MENUS[m].CHKSTATUS;
                                            }
                                            else {
                                                MENUS[m].CHKSTATUS = MENUS[m].FLAG == true ? "Y" : "N";
                                            }
                                            // MENUS[m].CHKSTATUS = MENUS[m].FLAG == true ? "Y" : "N";
                                            MENUS[m].CHK_STATUS = MENUS[m].CHKSTATUS;
                                            this.CreateMenu.push(MENUS[m]);
                                        }
                                    }
                                }
                            }
                            // }
                            if (this.audistStatus = "Y") {
                                if (this.chrServer != (PROFILE[i].FLAG == true ? "Y" : "N")) {
                                    lstSecurity = new MT_ATPAR_SECURITY_AUDIT_1.MT_ATPAR_SECURITY_AUDIT();
                                    lstSecurity.KEY_1 = this.paramProfileId;
                                    lstSecurity.KEY_2 = this.profileAppId.toString();
                                    lstSecurity.FIELD_NAME = "SERVER_USER";
                                    lstSecurity.OLD_VALUE = this.chrServer;
                                    lstSecurity.NEW_VALUE = PROFILE[i].FLAG == true ? "Y" : "N";
                                    this.lstauditallowed.push(lstSecurity);
                                }
                                if (this.chrClient != (PROFILE[i].ClientFLAG == true ? "Y" : "N")) {
                                    lstSecurity = new MT_ATPAR_SECURITY_AUDIT_1.MT_ATPAR_SECURITY_AUDIT();
                                    lstSecurity.KEY_1 = this.paramProfileId;
                                    lstSecurity.KEY_2 = this.profileAppId.toString();
                                    lstSecurity.FIELD_NAME = "CLIENT_USER";
                                    lstSecurity.OLD_VALUE = this.chrClient;
                                    lstSecurity.NEW_VALUE = PROFILE[i].ClientFLAG == true ? "Y" : "N";
                                    this.lstauditallowed.push(lstSecurity);
                                }
                            }
                        }
                        if (this.buttonId != "create") {
                            for (m = 0; m < this.lstmenuCheckedparams.length; m++) {
                                if (MENUS[m].CHK_STATUS != (this.lstmenuCheckedparams[m].FLAG == true ? "Y" : "N")) {
                                    lstSecurity = new MT_ATPAR_SECURITY_AUDIT_1.MT_ATPAR_SECURITY_AUDIT();
                                    lstSecurity.KEY_1 = this.paramProfileId;
                                    lstSecurity.KEY_2 = this.profileAppId.toString();
                                    lstSecurity.KEY_3 = this.lstmenuCheckedparams[m].MENU_CODE;
                                    lstSecurity.FIELD_NAME = "MENU_CODE";
                                    lstSecurity.OLD_VALUE = this.lstmenuCheckedparams[m].CHK_STATUS;
                                    lstSecurity.NEW_VALUE = MENUS[m].FLAG == true ? "Y" : "N";
                                    this.lstauditallowed.push(lstSecurity);
                                }
                                if (MENUS[m].MENU_SEQ_NO != this.lstmenuCheckedparams[m].MENU_SEQ_NO) {
                                    lstSecurity = new MT_ATPAR_SECURITY_AUDIT_1.MT_ATPAR_SECURITY_AUDIT();
                                    lstSecurity.KEY_1 = this.paramProfileId;
                                    lstSecurity.KEY_2 = this.profileAppId.toString();
                                    lstSecurity.KEY_3 = this.lstmenuCheckedparams[m].MENU_CODE;
                                    lstSecurity.FIELD_NAME = "MENU_SEQ_NO";
                                    lstSecurity.OLD_VALUE = this.lstmenuCheckedparams[m].MENU_SEQ_NO.toString();
                                    lstSecurity.NEW_VALUE = MENUS[m].MENU_SEQ_NO.toString();
                                    this.lstauditallowed.push(lstSecurity);
                                }
                            }
                        }
                        sectitylst = this.lstauditallowed;
                        dicProfileInfo = { 'PROFILE': this.CreateProfile, 'PARAMS': this.CreateParam, 'MENUS': this.CreateMenu, 'SCREENDISPLAY': this.CreateDisplay };
                        if (!(this.buttonId == "create")) return [3 /*break*/, 5];
                        this.spinnerService.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.spinnerService.start();
                        return [4 /*yield*/, this.httpservice.create({
                                "apiMethod": "/api/ManageProfiles/AddProfileInfo",
                                formData: dicProfileInfo,
                                params: {
                                    "profileID": this.paramProfileId,
                                    "pstrAlterProfileCtoS": false,
                                    "userID": this.deviceTokenEntry[AtParEnums_6.TokenEntry_Enum.UserID],
                                    "profileDescr": this.paraDescription.trim(),
                                    //dsProfile: dict,
                                    "clientAddr": "test",
                                    "appID": this.appId
                                    //"deviceTokenEntry": this._deviceTokenEntry
                                }
                            }).catch(this.httpservice.handleError).map(function (res) { return res.json(); }).subscribe(function (response) {
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        {
                                            _this.orgProfileDataList = _this.BindGrid;
                                            if (_this.orgProfileData != null) {
                                                for (var i = 0; i < _this.BindGrid.length; i++) {
                                                    _this.BindGrid[i].displayscreen = false;
                                                    _this.BindGrid[i].displayparam = false;
                                                    _this.BindGrid[i].displaymenu = false;
                                                }
                                            }
                                            _this.spinnerService.stop();
                                            PROFILE = [];
                                            _this.CreateProfile = [];
                                            _this.CreateParam = [];
                                            _this.CreateMenu = [];
                                            _this.CreateDisplay = [];
                                            PARAMS = [];
                                            MENUS = [];
                                            SCREENDISPLAY = [];
                                            _this.dropdownData = [];
                                            _this.BindDropDown();
                                            _this.spinnerService.stop();
                                            _this.growlMessage = [];
                                            // response.StatusMessage = AtParConstants.Created_Msg.replace("1%", "Profile").replace("2%", this.paramProfileId);
                                            response.StatusMessage = "Profile " + _this.paramProfileId + " Created Successfully";
                                            _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: response.StatusMessage });
                                            _this.content = false;
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Error:
                                        {
                                            _this.spinnerService.stop();
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Warn:
                                        {
                                            _this.spinnerService.stop();
                                            _this.growlMessage = [];
                                            var msg = _this.toTitleCase(response.StatusMessage);
                                            //var messgedesc = "Profile " + msg + " Already Exists";
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: msg });
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Custom:
                                        {
                                            _this.spinnerService.stop();
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                            break;
                                        }
                                }
                            })];
                    case 2:
                        _a.sent();
                        this.dropdowndisplayData = [];
                        this.BindDropDown();
                        this.temp = [];
                        this.content = false;
                        return [3 /*break*/, 4];
                    case 3:
                        exception_6 = _a.sent();
                        this.growlMessage = [];
                        this.errormessage = "General Client Error";
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: this.errormessage });
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 10];
                    case 5:
                        _a.trys.push([5, 9, , 10]);
                        if (!(this.paramProfileId == "")) return [3 /*break*/, 6];
                        this.errormessage = "Please enter Profile ID and Profile Description";
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                        return [3 /*break*/, 8];
                    case 6:
                        this.spinnerService.start();
                        return [4 /*yield*/, this.httpservice.update({
                                "apiMethod": "/api/ManageProfiles/UpdateProfileInfo",
                                formData: dicProfileInfo,
                                params: {
                                    "profileID": this.paramProfileId,
                                    "pstrAlterProfileCtoS": this.stralertprofile,
                                    "userID": this.deviceTokenEntry[AtParEnums_6.TokenEntry_Enum.UserID],
                                    "profileDescr": this.paraDescription.trim(),
                                    "clientAddr": "test",
                                    "appID": this.appId
                                }
                            }).catch(this.httpservice.handleError).map(function (res) { return res.json(); }).subscribe(function (response) {
                                switch (response.StatType) {
                                    case AtParEnums_1.StatusType.Success:
                                        {
                                            _this.orgProfileDataList = _this.BindGrid;
                                            _this.InsertAuditData();
                                            if (_this.orgProfileData != null) {
                                                for (var i = 0; i < _this.BindGrid.length; i++) {
                                                    _this.BindGrid[i].displayscreen = false;
                                                    _this.BindGrid[i].displayparam = false;
                                                    _this.BindGrid[i].displaymenu = false;
                                                }
                                            }
                                            PROFILE = [];
                                            _this.CreateProfile = [];
                                            _this.CreateParam = [];
                                            _this.CreateMenu = [];
                                            _this.CreateDisplay = [];
                                            _this.BindDropDown();
                                            PARAMS = [];
                                            MENUS = [];
                                            SCREENDISPLAY = [];
                                            _this.dropdowndisplayData = [];
                                            _this.temp = [];
                                            _this.spinnerService.stop();
                                            _this.content = false;
                                            _this.growlMessage = [];
                                            response.StatusMessage = AtParConstants_1.AtParConstants.Updated_Msg.replace("1%", "Profile").replace("2%", _this.paramProfileId);
                                            _this.growlMessage.push({ severity: 'success', summary: AtParConstants_1.AtParConstants.GrowlTitle_Success, detail: response.StatusMessage });
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Error:
                                        {
                                            _this.spinnerService.stop();
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Warn:
                                        {
                                            _this.spinnerService.stop();
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                            break;
                                        }
                                    case AtParEnums_1.StatusType.Custom:
                                        {
                                            _this.spinnerService.stop();
                                            _this.growlMessage = [];
                                            _this.growlMessage.push({ severity: 'info', summary: AtParConstants_1.AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                            break;
                                        }
                                }
                            })];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        exception_7 = _a.sent();
                        this.clientErrorMsg(exception_7, "save");
                        return [3 /*break*/, 10];
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        ex_1 = _a.sent();
                        this.clientErrorMsg(ex_1, "save");
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    //Audit Insert Method
    ManageProfilesComponent.prototype.InsertAuditData = function () {
        var _this = this;
        if (this.audistStatus = "Y") {
            this.spinnerService.start();
            this.httpservice.create({
                "apiMethod": "/api/Common/InsertAuditData",
                formData: this.lstauditallowed,
                params: {
                    "pStrUser": this.deviceTokenEntry[AtParEnums_6.TokenEntry_Enum.UserID],
                    "pStrFunction": 'mt_atpar_manage_profiles.aspx'
                }
            }).catch(this.httpservice.handleError).map(function (res) { return res.json(); }).subscribe(function (response) {
                switch (response.StatType) {
                    case AtParEnums_1.StatusType.Success:
                        {
                            break;
                        }
                    case AtParEnums_1.StatusType.Error:
                        {
                            _this.spinnerService.stop();
                            _this.growlMessage = [];
                            _this.growlMessage.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            break;
                        }
                }
            });
        }
    };
    //Check All for Main Datatable for Web
    ManageProfilesComponent.prototype.webchkAll = function () {
        try {
            this.gridRows = +sessionStorage.getItem("RowsOfGridSelected");
            this.startindex = +this.BindGrid.length;
            this.webchkallvalue = true;
            this.lstCheckedparams = [];
            for (var i = this.gridRows; i <= this.startindex - 1; i++) {
                this.BindGrid[i].FLAG = true;
                // this.BindGrid[i].CLIENT_USER = "Y";
                if (this.BindGrid[i].ClientFLAG == true) {
                    this.hhtchkallvalue = true;
                }
                else {
                    this.hhtchkallvalue = false;
                }
                if (this.webchkallvalue == true && this.hhtchkallvalue == true) {
                    this.BindGrid[i].displayscreen = true;
                    this.BindGrid[i].displayparam = true;
                    this.BindGrid[i].displaymenu = true;
                    // this.BindGrid[i].CLIENT_USER = "Y";
                    // this.BindGrid[i].SERVER_USER = "Y";
                }
                else if (this.hhtchkallvalue == false && this.webchkallvalue == true) {
                    this.BindGrid[i].displayparam = true;
                    this.BindGrid[i].displaymenu = true;
                    this.BindGrid[i].displayscreen = false;
                    //  this.BindGrid[i].CLIENT_USER = "N";
                    //  this.BindGrid[i].SERVER_USER = "Y";
                }
                this.lstCheckedparams.push(this.BindGrid[i]);
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "webchkAll");
        }
    };
    //Check None for Main Datatable for Web
    ManageProfilesComponent.prototype.webchkNone = function () {
        try {
            this.gridRows = +sessionStorage.getItem("RowsOfGridSelected");
            this.startindex = +this.BindGrid.length;
            this.webchkallvalue = false;
            this.lstCheckedparams = [];
            for (var i = this.startindex - 1; i >= this.gridRows; i--) {
                if (this.paramProfileId.toUpperCase() == "ADMIN") {
                    if (this.BindGrid[i].APP_NAME == "AtPar") {
                        this.BindGrid[i].FLAG = true;
                    }
                    else {
                        this.BindGrid[i].FLAG = false;
                    }
                }
                else {
                    this.BindGrid[i].FLAG = false;
                }
                // this.BindGrid[i].FLAG = false;
                //  this.BindGrid[i].CLIENT_USER = "N";
                if (this.BindGrid[i].ClientFLAG == true) {
                    this.hhtchkallvalue = true;
                }
                else {
                    this.hhtchkallvalue = false;
                }
                if (this.webchkallvalue == false && this.hhtchkallvalue == false) {
                    this.BindGrid[i].displayscreen = false;
                    this.BindGrid[i].displayparam = false;
                    this.BindGrid[i].displaymenu = false;
                    //  this.BindGrid[i].CLIENT_USER = "N";
                    // this.BindGrid[i].SERVER_USER = "N";
                }
                else if (this.hhtchkallvalue == true && this.webchkallvalue == false) {
                    this.BindGrid[i].displayparam = true;
                    this.BindGrid[i].displaymenu = false;
                    this.BindGrid[i].displayscreen = true;
                    // this.BindGrid[i].CLIENT_USER = "Y";
                    // this.BindGrid[i].SERVER_USER = "N";
                }
                //this.lstDBData[i].CHK_VALUE  =  0;
                this.lstCheckedparams.push(this.BindGrid[0]);
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "webchkNone");
        }
    };
    //Check All for Main Datatable for HHT
    ManageProfilesComponent.prototype.hhtchkall = function () {
        try {
            this.gridRows = +sessionStorage.getItem("RowsOfGridSelected");
            this.startindex = +this.BindGrid.length;
            this.hhtchkallvalue = true;
            var list = this.BindGrid;
            this.lstCheckedparams = [];
            for (var i = this.gridRows; i <= this.startindex - 1; i++) {
                this.BindGrid[i].ClientFLAG = true;
                // this.BindGrid[i].SERVER_USER = "Y";
                if (this.BindGrid[i].FLAG == true) {
                    this.webchkallvalue = true;
                }
                else {
                    this.webchkallvalue = false;
                }
                if (this.webchkallvalue == false && this.hhtchkallvalue == true) {
                    this.BindGrid[i].displayscreen = true;
                    this.BindGrid[i].displayparam = true;
                    this.BindGrid[i].displaymenu = false;
                    // this.BindGrid[i].CLIENT_USER = "Y";
                    // this.BindGrid[i].SERVER_USER = "N";
                }
                else if (this.hhtchkallvalue == true && this.webchkallvalue == true) {
                    this.BindGrid[i].displayparam = true;
                    this.BindGrid[i].displaymenu = true;
                    this.BindGrid[i].displayscreen = true;
                    // this.BindGrid[i].CLIENT_USER = "Y";
                    // this.BindGrid[i].SERVER_USER = "Y";
                }
                //this.BindGrid[i].CHK_VALUE  =  1;
                this.lstCheckedparams.push(this.BindGrid[i]);
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "hhtchkall");
        }
    };
    //Check All for Main Datatable for HHT
    ManageProfilesComponent.prototype.hhtchkNone = function () {
        try {
            this.gridRows = +sessionStorage.getItem("RowsOfGridSelected");
            this.startindex = +this.BindGrid.length;
            this.hhtchkallvalue = false;
            this.lstCheckedparams = [];
            for (var i = this.startindex - 1; i >= this.gridRows; i--) {
                this.BindGrid[i].ClientFLAG = false;
                //  this.BindGrid[i].SERVER_USER = "N";
                if (this.BindGrid[i].FLAG == true) {
                    this.webchkallvalue = true;
                }
                else {
                    this.webchkallvalue = false;
                }
                if (this.webchkallvalue == false && this.hhtchkallvalue == false) {
                    this.BindGrid[i].displayscreen = false;
                    this.BindGrid[i].displayparam = false;
                    this.BindGrid[i].displaymenu = false;
                    //  this.BindGrid[i].CLIENT_USER = "N";
                    //this.BindGrid[i].SERVER_USER = "N";
                }
                else if (this.hhtchkallvalue == false && this.webchkallvalue == true) {
                    this.BindGrid[i].displayparam = true;
                    this.BindGrid[i].displaymenu = true;
                    this.BindGrid[i].displayscreen = false;
                    // this.BindGrid[i].CLIENT_USER = "N";
                    // this.BindGrid[i].SERVER_USER = "Y";
                }
                //this.lstDBData[i].CHK_VALUE  =  0;
                this.lstCheckedparams.push(this.BindGrid[0]);
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "hhtchkNone");
        }
    };
    //Check All for Menu Datatable
    ManageProfilesComponent.prototype.menuchkAll = function () {
        this.gridRows = +sessionStorage.getItem("RowsOfGridSelected");
        this.startindex = +this.lstMenuItems.length;
        this.webchkallvalue = true;
        this.lstmenuCheckedparams = [];
        for (var i = 0; i <= this.lstMenuItems.length - 1; i++) {
            this.lstMenuItems[i].FLAG = true;
            // menusdata[i].CHKSTATUS = "Y";
            this.lstMenuItems[i].Id = "manageMenuSeqNo" + i;
            if (this.lstMenuItems[i].MENU_SEQ_NO != null || this.lstMenuItems[i].MENU_SEQ_NO.toString() != "" || this.lstMenuItems[i].MENU_SEQ_NO != undefined) {
                this.lstMenuItems[i].MENU_SEQ_NO = this.lstMenuItems[i].MENU_SEQ_NO;
            }
            this.lstmenuCheckedparams.push(this.lstMenuItems[i]);
        }
        // this.lstMenuItems = menusdata;
        // this.menuEntitys = menusdata;
    };
    //Check All for Menu Datatable
    ManageProfilesComponent.prototype.menuchkNone = function () {
        this.gridRows = +sessionStorage.getItem("RowsOfGridSelected");
        this.startindex = +this.lstMenuItems.length;
        this.hhtchkallvalue = false;
        this.lstmenuCheckedparams = [];
        for (var i = this.lstMenuItems.length - 1; i >= 0; i--) {
            this.lstMenuItems[i].FLAG = false;
            // this.menuGrid[i].CHKSTATUS = "N";
            this.lstMenuItems[i].Id = "manageMenuSeqNo" + i;
            if (this.lstMenuItems[i].MENU_SEQ_NO != null || this.lstMenuItems[i].MENU_SEQ_NO.toString() != "" || this.lstMenuItems[i].MENU_SEQ_NO != undefined) {
                this.lstMenuItems[i].MENU_SEQ_NO = this.lstMenuItems[i].MENU_SEQ_NO;
            }
            this.lstmenuCheckedparams.push(this.lstMenuItems[i]);
        }
        //this.lstMenuItems = menusdata;
        //this.menuEntitys = menusdata;
    };
    //Single check for Main Datatable for Web
    ManageProfilesComponent.prototype.checkeddata = function (item1, event) {
        try {
            this.hhtchkvalue = false;
            this.webchkvalue = false;
            item1.FLAG = event.target.checked;
            var paramdata = this.BindGrid;
            this.appId = item1.APP_ID;
            //  this.lstCheckedparams.splice(item1.APP_ID);
            for (var i = 0; i < this.lstCheckedparams.length; i++) {
                if (this.lstCheckedparams[i].APP_ID === item1.APP_ID) {
                    var index = this.lstCheckedparams.indexOf(this.lstCheckedparams[i], 0);
                    this.lstCheckedparams.splice(index, 1);
                }
            }
            if (item1.ClientFLAG == true && item1.FLAG == true) {
                this.hhtchkvalue = true;
                this.webchkvalue = true;
            }
            else if (item1.ClientFLAG == false && item1.FLAG == true) {
                this.hhtchkvalue = false;
                this.webchkvalue = true;
            }
            else if (item1.ClientFLAG == true && item1.FLAG == false) {
                this.hhtchkvalue = true;
                this.webchkvalue = false;
            }
            else if (item1.ClientFLAG == undefined && item1.FLAG == true) {
                this.hhtchkvalue = false;
                this.webchkvalue = true;
            }
            else if (item1.ClientFLAG == true && item1.FLAG == undefined) {
                this.hhtchkvalue = true;
                this.webchkvalue = false;
            }
            else {
                this.hhtchkvalue = false;
                this.webchkvalue = false;
            }
            if (this.webchkvalue == true && this.hhtchkvalue == false) {
                item1.displayscreen = false;
                item1.displayparam = true;
                item1.displaymenu = true;
                // item1.CLIENT_USER = "Y";
                // item1.SERVER_USER = "N";
            }
            else if (this.hhtchkvalue == true && this.webchkvalue == false) {
                item1.displayparam = true;
                item1.displaymenu = false;
                item1.displayscreen = true;
                // item1.CLIENT_USER = "N";
                // item1.SERVER_USER = "Y";
            }
            else if (this.hhtchkvalue == false && this.webchkvalue == false) {
                item1.displayparam = false;
                item1.displaymenu = false;
                item1.displayscreen = false;
                //  item1.CLIENT_USER = "N";
                // item1.SERVER_USER = "N";
            }
            else if (this.hhtchkvalue == true && this.webchkvalue == true) {
                item1.displayparam = true;
                item1.displaymenu = true;
                item1.displayscreen = true;
                //  item1.CLIENT_USER = "Y";
                //  item1.SERVER_USER = "Y";
            }
            this.lstCheckedparams.push(item1);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkeddata");
        }
    };
    //Single check for Main Datatable for HHT
    ManageProfilesComponent.prototype.checkedhhtdata = function (item1, event) {
        try {
            this.hhtchkvalue = false;
            this.webchkvalue = false;
            item1.ClientFLAG = event.target.checked;
            // this.lsthhtCheckedparams = [];
            //this.lstCheckedparams = [];
            var lstdata = this.BindGrid[0];
            for (var i = 0; i < this.lstCheckedparams.length; i++) {
                if (this.lstCheckedparams[i].APP_ID === item1.APP_ID) {
                    var index = this.lstCheckedparams.indexOf(this.lstCheckedparams[i], 0);
                    this.lstCheckedparams.splice(index, 1);
                }
            }
            if (item1.ClientFLAG == true && item1.FLAG == true) {
                this.hhtchkvalue = true;
                this.webchkvalue = true;
            }
            else if (item1.ClientFLAG == false && item1.FLAG == true) {
                this.hhtchkvalue = false;
                this.webchkvalue = true;
            }
            else if (item1.ClientFLAG == true && item1.FLAG == false) {
                this.hhtchkvalue = true;
                this.webchkvalue = false;
            }
            else if (item1.ClientFLAG == undefined && item1.FLAG == true) {
                this.hhtchkvalue = false;
                this.webchkvalue = true;
            }
            else if (item1.ClientFLAG == true && item1.FLAG == undefined) {
                this.hhtchkvalue = true;
                this.webchkvalue = false;
            }
            else {
                this.hhtchkvalue = false;
                this.webchkvalue = false;
            }
            if (this.webchkvalue == true && this.hhtchkvalue == false) {
                item1.displayscreen = false;
                item1.displayparam = true;
                item1.displaymenu = true;
                // item1.CLIENT_USER = "Y";
                // item1.SERVER_USER = "N";
            }
            else if (this.hhtchkvalue == true && this.webchkvalue == false) {
                item1.displayparam = true;
                item1.displaymenu = false;
                item1.displayscreen = true;
                // item1.CLIENT_USER = "N";
                // item1.SERVER_USER = "Y";
            }
            else if (this.hhtchkvalue == false && this.webchkvalue == false) {
                item1.displayparam = false;
                item1.displaymenu = false;
                item1.displayscreen = false;
                //  item1.CLIENT_USER = "N";
                // item1.SERVER_USER = "N";
            }
            else if (this.hhtchkvalue == true && this.webchkvalue == true) {
                item1.displayparam = true;
                item1.displaymenu = true;
                item1.displayscreen = true;
                //  item1.CLIENT_USER = "Y";
                //  item1.SERVER_USER = "Y";
            }
            this.lstCheckedparams.push(item1);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkedhhtdata");
        }
    };
    //Single check for Menu Datatable
    ManageProfilesComponent.prototype.checkedmenudata = function (chk, event) {
        // this.menuchkvalue = event.target.checked;
        try {
            this.menuchkvalue = chk.FLAG;
            if (this.buttonId != "create") {
                for (var i = 0; i < this.lstmenuCheckedparams.length; i++) {
                    if (this.lstmenuCheckedparams[i].MENU_NAME === chk.MENU_NAME) {
                        var index = this.lstmenuCheckedparams.indexOf(this.lstmenuCheckedparams[i], 0);
                        this.lstmenuCheckedparams.splice(index, 1);
                    }
                }
                if (this.menuchkvalue == true) {
                    chk.FLAG = true;
                    this.lstmenuCheckedparams.push(chk);
                }
                else {
                    chk.FLAG = false;
                    this.lstmenuCheckedparams.push(chk);
                }
            }
            else {
                if (this.menuchkvalue == true) {
                    chk.FLAG = true;
                    this.lstmenuCheckedparams.push(chk);
                }
                else {
                    chk.FLAG = false;
                    this.lstmenuCheckedparams.push(chk);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkedmenudata");
        }
    };
    //Single check for Screen Display Datatable
    ManageProfilesComponent.prototype.selectedRow = function (chk, event) {
        try {
            // this.displaychkvalue = event.target.checked;
            this.displaychkvalue = chk.FLAG;
            this.lblerrordisplaymsg = "";
            if (this.buttonId != "create") {
                for (var i = 0; i < this.lstdisplayCheckedparams.length; i++) {
                    if (this.lstdisplayCheckedparams[i].COLUMN_HEADER === chk.COLUMN_HEADER) {
                        var index = this.lstdisplayCheckedparams.indexOf(this.lstdisplayCheckedparams[i], 0);
                        this.lstdisplayCheckedparams.splice(index, 1);
                    }
                }
                if (this.displaychkvalue == true) {
                    chk.FLAG = true;
                    this.lstdisplayCheckedparams.push(chk);
                }
                else {
                    chk.FLAG = false;
                    this.lstdisplayCheckedparams.push(chk);
                }
            }
            else {
                if (this.displaychkvalue == true) {
                    chk.FLAG = true;
                    this.lstdisplayCheckedparams.push(chk);
                }
                else {
                    chk.FLAG = false;
                    this.lstdisplayCheckedparams.push(chk);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "selectedRow");
        }
    };
    //Conform Dailog for Web check or HHT check
    ManageProfilesComponent.prototype.confirm = function () {
        var _this = this;
        this.webchk = false;
        this.hhtchk = false;
        this.growlMessage = [];
        var dataWebCheck = this.BindGrid;
        for (var d = 0; d < dataWebCheck.length; d++) {
            if (dataWebCheck[d].FLAG == true) {
                this.webchk = true;
            }
            if (dataWebCheck[d].ClientFLAG == true) {
                this.hhtchk = true;
            }
        }
        if (this.buttonId == "create") {
            if (this.paramProfileId === "" && this.paraDescription === "") {
                this.errormessage = "Please Enter Profile ID and Profile Description";
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                return 0;
            }
            else if (this.paramProfileId === "" || this.paramProfileId === null || this.paramProfileId === undefined) {
                this.errormessage = "Please Enter Profile ID";
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                return 0;
            }
            else if (this.paraDescription === "" || this.paraDescription === null || this.paraDescription === undefined) {
                this.errormessage = "Please Enter Profile Description";
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                return 0;
            }
            if (this.webchk == true) {
                if (this.paramEntitys.length == 0) {
                    this.confirmationService.confirm({
                        message: 'Parameters are not setup for the profile. Loaded with default values for the parameters.',
                        accept: function () {
                            _this.save();
                            //Actual logic to perform a confirmation
                        }
                    });
                }
                else {
                    //this.confirmationService.confirm({
                    //    message: 'Do you want to default the Password "atpar", to the users who does not have the Password.',
                    //    accept: () => {
                    //        this.save();
                    //        //Actual logic to perform a confirmation
                    //    }
                    //});
                    this.save();
                }
            }
            else if (this.hhtchk == true) {
                if (this.displayEntitys.length == 0 && this.paramEntitys.length == 0) {
                    this.confirmationService.confirm({
                        message: 'Parameters,ScreenDisplay are not setup for the profile. Loaded with default values for the parameters.',
                        accept: function () {
                            _this.save();
                            //Actual logic to perform a confirmation
                        }
                    });
                }
                else {
                    this.save();
                }
            }
            else {
                this.save();
            }
        }
        else {
            if (this.userCount != 0) {
                if (this.serverCount == 0) {
                    if (this.clientCount != 0) {
                        if (this.webchk == true) {
                            this.confirmationService.confirm({
                                message: 'Do you want to default the Password "atpar", to the users who does not have the Password.',
                                accept: function () {
                                    _this.stralertprofile = true;
                                    _this.save();
                                    //Actual logic to perform a confirmation
                                    return;
                                }
                            });
                        }
                        else {
                            this.stralertprofile = false;
                            this.save();
                            return;
                        }
                    }
                }
            }
            this.stralertprofile = true;
            this.save();
            return;
        }
    };
    ManageProfilesComponent.prototype.onKey = function (event) {
        if (event.target.value == null || event.target.value == "") {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants_1.AtParConstants.GrowlTitle_Warn, detail: " Please enter Order. " });
            return;
        }
        else {
            this.growlMessage = [];
            return;
        }
    };
    ManageProfilesComponent.prototype.toTitleCase = function (str) {
        return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    };
    ManageProfilesComponent.prototype.clientErrorMsg = function (strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    };
    ManageProfilesComponent = __decorate([
        core_1.Component({
            templateUrl: 'atpar-manage-profiles.component.html',
            providers: [HttpService_1.HttpService, api_1.ConfirmationService]
        }),
        __metadata("design:paramtypes", [HttpService_1.HttpService, http_1.Http, event_spinner_service_1.SpinnerService,
            AtParConstants_1.AtParConstants,
            api_1.ConfirmationService])
    ], ManageProfilesComponent);
    return ManageProfilesComponent;
}());
exports.ManageProfilesComponent = ManageProfilesComponent;
//# sourceMappingURL=atpar-manage-profiles.component.js.map