import { Component } from '@angular/core';
import { TextboxControl } from '../Common/DynamicControls/TextboxControl';
import { DropDownControl } from '../Common/DynamicControls/DropDownControl';
import { HttpService } from '../Shared/HttpService';
import { Http, Response } from "@angular/http";
import { MT_ATPAR_PROFILE } from '../../app/Entities/mt_atpar_profile';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { SelectItem } from '../components/common/api';
import { MT_ATPAR_APP } from '../../app/Entities/MT_ATPAR_APP';
import { MT_ATPAR_PROFILE_APP_ACL } from '../entities/mt_atpar_profile_app_acl';
import { VM_MT_ATPAR_PROFILE_APP_PARAMETERS } from '../entities/vm_mt_atpar_profile_app_parameters';
import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';
import { VM_MT_ATPAR_PROFILE_APP_MENUS } from '../entities/vm_mt_atpar_profile_app_menus';
import { VM_MT_ATPAR_PROFILE_SCREEN_DISPLAY } from '../entities/vm_mt_atpar_profile_screen_display';
import { MT_ATPAR_SETUP_PRO_PRINTERES } from '../entities/mt_atpar_setup_pro_printeres';
import { MT_ATPAR_SECURITY_AUDIT } from '../Entities/MT_ATPAR_SECURITY_AUDIT';
import { StatusType } from '../Shared/AtParEnums';
import { Message } from '../components/common/api';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { Shiping_Label_PrinterType } from '../Shared/AtParEnums';
import { POU_Menus } from '../Shared/AtParEnums';
import { CASE_EDITING_OPTIONS } from '../Shared/AtParEnums';
import { Pharmacy_Menus } from '../Shared/AtParEnums';
import { TokenEntry_Enum, EnumApps } from '../Shared/AtParEnums';
import { MT_ATPAR_GRIDVIEW_PARAMS } from '../entities/mt_atpar_gridview_params';
import { ConfirmationService } from '../components/common/api';
import { AtParConstants } from '../Shared/AtParConstants';
import { Menus } from '../AtPar/Menus/routepath';

declare var module: {
    id: string;
}
@Component({
    templateUrl: 'atpar-manage-profiles.component.html',
    providers: [HttpService, ConfirmationService]
})

export class ManageProfilesComponent {
    content: boolean = false;
    display: boolean = false;
    display2: boolean = false;
    screenDisplay: boolean = false;
    page: boolean = true;
    //deviceTokenEntry: string[] = [];
    orgProfileData: MT_ATPAR_PROFILE[];
    dropdownData: SelectItem[] = [];
    selectedOrgProfileId: string = "";
    BindGrid = new Array<MT_ATPAR_APP>();
    FLAG: boolean = false;
    orgProfileDataList: MT_ATPAR_APP[];
    param: boolean = false;
    menu: boolean = false;
    screen: boolean = false;
    displaymenu: boolean = false;
    selectedProfileId: string = "";
    selectedProfileDesc: string = "";
    pstrAlterProfileCtoS: boolean = false;
    userId: string = "All";
    clientAddr: string = "";
    appId: number;
    profileId: string = "";
    paramDisplay: boolean = false;
    menuDisplay: boolean = false;
    MOG: boolean = true;
    paramGrid: VM_MT_ATPAR_PROFILE_APP_PARAMETERS[] = [];
    paramData: VM_MT_ATPAR_PROFILE_APP_PARAMETERS[];
    menuGrid: VM_MT_ATPAR_PROFILE_APP_MENUS[] = [];
    displayGrid: VM_MT_ATPAR_PROFILE_SCREEN_DISPLAY[] = [];
    displayGridData: any;
    paraDescription: string = "";
    desc: boolean = false;
    paramProfileId: string = "";
    RowsOfGridSelected: any;
    gridRows: any;
    startindex: number;
    lstDBData: any;
    lstCheckedparams: Array<MT_ATPAR_APP>;
    lsthhtCheckedparams: Array<MT_ATPAR_APP>;
    webchkvalue: boolean = false;
    hhtchkvalue: boolean = false;
    webchkallvalue: boolean = false;
    hhtchkallvalue: boolean = false;
    lstmenuCheckedparams: VM_MT_ATPAR_PROFILE_APP_MENUS[] = [];
    lstauditallowed: MT_ATPAR_SECURITY_AUDIT[] = [];
    displaydataGrid: boolean = false;
    dropdowndisplayData: SelectItem[] = [];
    selectedScreenDisplayId: string = "";
    val1: string = "";
    menuchkvalue: boolean = false;
    displaychkvalue: boolean = false;
    lstdisplayCheckedparams: VM_MT_ATPAR_PROFILE_SCREEN_DISPLAY[] = [];
    distinctList: string[];
    temp: Array<VM_MT_ATPAR_PROFILE_SCREEN_DISPLAY>;
    displayEntitys: VM_MT_ATPAR_PROFILE_SCREEN_DISPLAY[] = [];
    menuEntitys: VM_MT_ATPAR_PROFILE_APP_MENUS[] = [];
    paramEntitys: VM_MT_ATPAR_PROFILE_APP_PARAMETERS[] = [];
    buttonId: string = "";
    errormessage: string = "";
    lstgrdData = new Array<MT_ATPAR_APP>();
    appname: boolean = false;
    deviceTokenEntry: string[] = [];
    growlMessage: Message[] = [];
    dropdownparamData: SelectItem[] = [];
    paramdrp: Array<MT_ATPAR_SETUP_PRO_PRINTERES>;
    paramindex: boolean = false;
    paramDspHide: number;
    audistStatus: string = "";
    chrServer: string = "";
    chrClient: string = "";
    menuhide: number;
    hhthide: number;
    profileAppId: number;
    CreateDisplay: Array<VM_MT_ATPAR_PROFILE_SCREEN_DISPLAY> = [];
    CreateParam: Array<VM_MT_ATPAR_PROFILE_APP_PARAMETERS> = [];
    CreateMenu: Array<VM_MT_ATPAR_PROFILE_APP_MENUS> = [];
    CreateProfile: Array<MT_ATPAR_APP> = [];
    allProfileIdsdata: number[] = [];
    lstMenuItems: Array<VM_MT_ATPAR_PROFILE_APP_MENUS> = [];
    totallstParamItems: Array<VM_MT_ATPAR_PROFILE_APP_PARAMETERS> = [];
    totallstDisplayItems: Array<VM_MT_ATPAR_PROFILE_SCREEN_DISPLAY> = [];
    gridViewParamValues: MT_ATPAR_GRIDVIEW_PARAMS[] = [];
    gridViewAllowEditingParamValues: MT_ATPAR_GRIDVIEW_PARAMS[] = [];
    appids: string;
    lstMenuData: Array<VM_MT_ATPAR_PROFILE_APP_MENUS>;
    tempMenu: VM_MT_ATPAR_PROFILE_APP_MENUS[] = [];
    mainMenus: any[] = [];
    mandryDisplay: boolean = false;
    lblerrordisplaymsg: string = "";
    menuId: number;
    mpStatus: number;
    descStatus: number;
    menuSeqNo: number;
    loading: boolean = false;
    pValue: number;
    strParamValue: string = "";
    strModule: string = "";
    strValue: string = "";
    recordsPerPageSize: number;
    str: any;
    strhide: boolean = false;
    strhide1: boolean = false;
    displayErrorString: string = "";
    strProfile: string = "";
    txtParamValue: string = "";
    blnCaseEdit: boolean = false;
    blnPOUMenu: boolean = false;
    mpMaxStatus: number;
    webchk: boolean = false;
    hhtchk: boolean = false;
    statusMsg: string = "";
    saveloading: boolean = false;
    btnscreen: boolean = false;
    breadCrumbMenu: Menus;
    appicon: string = "";
    menubtn: boolean = false;
    id1: any;
    Datachk: string = "chk";
    id2: any;
    userCount: number;
    serverCount: number;
    clientCount: number;
    stralertprofile: boolean = false;
    menusCheckvalues: Array<VM_MT_ATPAR_PROFILE_APP_MENUS> = [];
    //parambtn: boolean = false;

    bindModelDataChange(event: any) {
        if ("txtParamProfileId" == event.TextBoxID.toString()) {
            this.mpStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("txtParaDescription" == event.TextBoxID.toString()) {
            this.descStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("manageMenuSeqNo" == event.TextBoxID.toString()) {
            this.menuSeqNo = event.validationrules.filter(x => x.status == false).length;
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
            for (let s = 0; s <= this.totallstDisplayItems.length - 1; s++) {

                this.id1 = "manageDspHeaderColumn" + s;
                // this.id2 = "manageDspToggleColumn" + s;
                if (this.id1 == event.TextBoxID) {
                    //event.TextBoxID = this.id1;
                    //event.val = this.totallstDisplayItems[s].COLUMN_HEADER;
                    // var chk = this.Datachk + s;
                    this.mpMaxStatus = event.validationrules.filter(x => x.status == false).length;
                }
                if (this.mpMaxStatus == 1) {
                    // this.loading = false;
                    this.totallstDisplayItems[s].Isdisable = true;
                    this.mpMaxStatus = null;

                }
                else //{
                    if (this.totallstDisplayItems[s].Isdisable == true && this.mpMaxStatus == 0 && this.id1 == event.TextBoxID) {
                        // this.loading = true;
                        this.totallstDisplayItems[s].Isdisable = false;
                        this.mpMaxStatus = null;

                    }


                // }

            }

            for (let d = 0; d <= this.totallstDisplayItems.length - 1; d++) {

                // this.id1 = "manageDspHeaderColumn" + s;
                this.id2 = "manageDspToggleColumn" + d;
                if (this.id2 == event.TextBoxID) {
                    //event.TextBoxID = this.id1;
                    //event.val = this.totallstDisplayItems[s].COLUMN_HEADER;
                    // var chk = this.Datachk + s;
                    this.mpMaxStatus = event.validationrules.filter(x => x.status == false).length;
                }
                if (this.mpMaxStatus == 1) {
                    // this.loading = false;
                    this.totallstDisplayItems[d].Isdescdisable = true;
                    this.mpMaxStatus = null;

                }
                else //{
                    if (this.totallstDisplayItems[d].Isdescdisable == true && this.mpMaxStatus == 0 && this.id2 == event.TextBoxID) {
                        // this.loading = true;
                        this.totallstDisplayItems[d].Isdescdisable = false;
                        this.mpMaxStatus = null;

                    }


                // }

            }

            var length1 = this.totallstDisplayItems.filter(x => x.Isdisable == true || x.Isdescdisable == true);

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
    }

    //Grid View in Product Items for Web and HHT(Parameters, Menu Access and Screen Display)
    clicked(item1, event) {
        this.btnscreen = false;
        this.loading = false;
        this.statusMsg = "";
        event.preventDefault();
        let blnPickConfirmation: boolean = false;
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
                var paramsdata = this.paramGrid.filter(x => x.APP_ID == this.appId);

                this.paramEntitys = [];
                for (let spe = 0; spe < paramsdata.length; spe++) {
                    let paramEntity = new VM_MT_ATPAR_PROFILE_APP_PARAMETERS()
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

                    this.paramEntitys.push(paramEntity)
                }

                let data = this.paramEntitys;
                for (let i = 0; i <= data.length - 1; i++) {
                    if (data[i].PARAMETER_TYPE == 'CHECKBOX') {
                        if (data[i].PARAMETER_VALUE == "Y") {
                            data[i].FLAG = true;
                        } else {
                            data[i].FLAG = false;
                        }
                    }
                    data[i].val1 = "longDesc" + i;
                    data[i].PARAMETER_TYPE = data[i].PARAMETER_TYPE.toUpperCase();

                    if (data[i].VALIDATION == 'NUMBER') {
                        data[i].VALIDATION = "numeric";
                    }
                    if (data[i].VALIDATION == 'TEXT') {
                        data[i].VALIDATION = "alpa_numeric_underscore_hyphen_backslash";
                    }
                    if (data[i].VALIDATION == 'DECIMAL') {
                        data[i].VALIDATION = "numeric_dot";
                    }
                    if (data[i].PARAMETER_TYPE == 'TEXT' || data[i].PARAMETER_TYPE == 'TEXTBOX') {
                        if (this.appId == 4 && (data[i].PARAMETER_ID.toUpperCase() == "ITEM_UPN_TYPE_CODE" || data[i].PARAMETER_ID.toUpperCase() == "ITEM_NDC_TYPE_CODE")) {
                            data[i].VALIDATION = "alpa_numeric_underscore_hyphen_backslash,max=4";
                        }

                        if (this.appId == 4 && (data[i].PARAMETER_ID.toUpperCase() == "DEFAULT_DATE_RANGE" || data[i].PARAMETER_ID.toUpperCase() == "ITEM_RECV_HIGH_PCT")) {
                            data[i].VALIDATION = "numeric,max=" + data[i].MAX_VALUE;
                        }
                        if (this.appId == 15 && (data[i].PARAMETER_ID.toUpperCase() == "MAX_ALLOW_QTY")) {
                            data[i].VALIDATION = "numeric_dot";
                        }
                    }
                    if (data[i].PARAMETER_TYPE.toUpperCase() == 'RADIO') {
                        if (data[i].PARAMETER_ID == 'SHIPPING_LABEL_PRINT_OPTIONS' || data[i].PARAMETER_ID == 'RECEIPT_DELIVER_PRINT_OPTIONS') {
                            if (data[i].PARAMETER_VALUE == Shiping_Label_PrinterType.None.toString()) {
                                data[i].PARAMETER_VALUE = 'None';
                            }
                            else if (data[i].PARAMETER_VALUE == Shiping_Label_PrinterType.HeaderLbl_MobilePrinter.toString()) {
                                data[i].PARAMETER_VALUE = 'Print Header Label only to a Mobile Printer';
                            }
                            else if (data[i].PARAMETER_VALUE == Shiping_Label_PrinterType.DeliveryTic_StationaryPrinter.toString()) {
                                data[i].PARAMETER_VALUE = 'Print Delivery Ticket only to a Stationary Printer';
                            }
                            else if (data[i].PARAMETER_VALUE == Shiping_Label_PrinterType.Both_MobilePrinter_StationaryPrinter.toString()) {
                                data[i].PARAMETER_VALUE = 'Print Header Label to a Mobile Printer and Delivery Ticket to a Stationary Printer';
                            }
                            else if (data[i].PARAMETER_VALUE == Shiping_Label_PrinterType.User_Option.toString()) {
                                data[i].PARAMETER_VALUE = 'User option';
                            }
                        }
                    }

                    let strChkValues: string[] = [];
                    let strParamVal: string = "";
                    let paramValue: any;
                    strParamVal = data[i].PARAMETER_VALUE.toString();
                    if (data[i].PARAMETER_TYPE.toUpperCase() == 'GRIDVIEW') {
                        let gridParams = null;// new MT_ATPAR_GRIDVIEW_PARAMS();                      
                        if (data[i].PARAMETER_ID.toUpperCase() == 'ALLOW_EDITING_CASE') {

                            strChkValues = strParamVal.split(",");
                            for (let i = 0; i <= strChkValues.length - 1; i++) {
                                let colArr: any[] = [];
                                let strRow: string = "";
                                strRow = strChkValues[i];
                                colArr = strRow.split("-");
                                gridParams = new MT_ATPAR_GRIDVIEW_PARAMS();
                                //DataRow _row = dt.NewRow;
                                for (let _ColCnt = 0; _ColCnt <= colArr.length - 1; _ColCnt++) {
                                    // Because we are placing boolean at this location

                                    if (_ColCnt == 0) {
                                        gridParams.CHECKVALUE = (colArr[_ColCnt] == 0 ? false : true);
                                        //_row(_ColCnt) = (colArr(_ColCnt) == 0 ? false : true);

                                    } else {
                                        gridParams.OPTION = CASE_EDITING_OPTIONS[colArr[_ColCnt]].toString(); //(colArr[_ColCnt]);
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
                            for (let i = 0; i <= strChkValues.length - 1; i++) {
                                let colArr: any[] = [];
                                let strRow: string = "";
                                strRow = strChkValues[i];
                                colArr = strRow.split("-");
                                gridParams = new MT_ATPAR_GRIDVIEW_PARAMS();
                                for (let _ColCnt = 0; _ColCnt <= colArr.length - 1; _ColCnt++) {
                                    // Because we are placing boolean at this location
                                    if (_ColCnt == 0) {
                                        gridParams.CHECKVALUE = (colArr[_ColCnt] == 0 ? false : true);
                                        // Because we are placing Menus values here (at position 1)
                                    } else if (_ColCnt == 1) {
                                        if (this.appId == EnumApps.Pharmacy) {
                                            gridParams.MENU = Pharmacy_Menus[colArr[_ColCnt]].toString();
                                        } else {
                                            gridParams.MENU = POU_Menus[colArr[_ColCnt]].toString();
                                        }
                                    } else {
                                        gridParams.ORDER = colArr[_ColCnt].toString();
                                    }
                                }
                                gridParams.PARAM_ID = gridParams.MENU;
                                this.gridViewParamValues.push(gridParams);
                            }
                        }
                    }
                    data[i].Id = "manageParamValue" + i;
                    if (data[i].PARAMETER_VALUE == 'Y') {
                        data[i].FLAG = true;
                    }
                    else {
                        data[i].FLAG = false;
                    }
                    if (data[i].MULTIPLE_VALUES != "") {
                        var rdvalue: string[] = data[i].MULTIPLE_VALUES.split(",");

                        data[i].listrdo = rdvalue;
                        data[i].val1 = data[i].PARAMETER_VALUE;
                    }
                    else {

                    }

                    if (this.appId == 6 && data[i].PARAMETER_ID == 'AUTO_PICK_ENABLED') {
                        if (data[i].FLAG == true) {
                            blnPickConfirmation = true;
                        }
                        else {
                            blnPickConfirmation = false;
                        }
                    }
                    if (blnPickConfirmation) {
                        if (this.appId == 6 && data[i].PARAMETER_ID == 'PICK_CONFIRMATION') {
                            data[i].PARAMETER_VALUE = "Y";
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
        } else if (value == "menuDisplay") {
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
                let menusdata = this.menuGrid.filter(x => x.APP_ID == this.appId);
                this.menuEntitys = [];
                let menusdatafilter = this.menusCheckvalues.filter(x => x.APP_ID == this.appId);

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
                for (let sm = 0; sm < menusdata.length; sm++) {
                    let menuEntity = new VM_MT_ATPAR_PROFILE_APP_MENUS()
                    {
                        menuEntity.APP_ID = menusdata[sm].APP_ID;
                        menuEntity.MENU_SEQ_NO = menusdata[sm].MENU_SEQ_NO;
                        menuEntity.MENU_NAME = menusdata[sm].MENU_NAME;
                        menuEntity.MENU_CODE = menusdata[sm].MENU_CODE;
                        menuEntity.MENU_SUB_GROUP = menusdata[sm].MENU_SUB_GROUP;
                        menuEntity.FLAG = menusdata[sm].CHKSTATUS == "Y" ? true : false;
                    }

                    this.menuEntitys.push(menuEntity)
                }
                //  let data = this.totallstDisplayItems;
                let menudata = this.menuEntitys;

                for (let i = 0; i <= menudata.length - 1; i++) {
                    menudata[i].Id = "manageMenuSeqNo" + i;
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
                    let txtPasswdValue = <HTMLInputElement>document.getElementById('manageMenuSeqNo0');
                    txtPasswdValue.focus();
                }, 500);

            }
            catch (exception) {
                this.clientErrorMsg(exception, "clicked");

            }
        } else if (value == "screenDisplay") {

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
                this.temp = this.orgProfileDataList["listScreenDisplay"].filter(x => x.APP_ID == this.appId);

                this.distinctList = asEnumerable(this.temp).Select(a => a.SCREEN_NAME.toUpperCase()).Distinct().ToArray();

                this.dropdowndisplayData.push({ label: "Select Screen Name", value: "" })
                for (var i = 0; i < this.distinctList.length; i++) {
                    this.dropdowndisplayData.push({ label: this.distinctList[i], value: this.distinctList[i] })
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
    }

    //Temaprary Save Click
    Save_Click(event) {
        this.loading = false;
        this.saveloading = false;
        this.growlMessage = [];
        this.displayErrorString = "";
        event.preventDefault();
        let menusCheck = this.menuGrid;
        let displayGrdCheck = this.displayGrid;
        let paramGridCheck = this.totallstParamItems;
        let name = event.target.id;
        //if (name != "cancelparam" || name == "" || name == null) {
        if (name == "backparam") {
            let paramGridCheck = this.paramGrid.filter(x => x.APP_ID == this.appId);
            if (this.paramEntitys.length != 0) {
                for (let param = 0; param < this.paramEntitys.length; param++) {
                    if (this.paramEntitys[param].PARAMETER_TYPE == 'CHECKBOX') {
                        if (this.paramEntitys[param].FLAG) {
                            this.paramEntitys[param].PARAMETER_VALUE = "Y";
                        } else {
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
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
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
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
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
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
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
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                                return;
                            }

                        }

                    }
                    if (this.paramEntitys[param].PARAMETER_TYPE == "GRIDVIEW") {
                        this.strValue = "";
                        this.strModule = "";
                        let lstGridview = this.gridViewAllowEditingParamValues;
                        let lstGridParam = this.gridViewParamValues;
                        if (lstGridview.length == 0) {
                            this.paramEntitys[param].PARAMETER_VALUE = this.paramEntitys[param].PARAMETER_VALUE;
                        }
                        else
                            if (this.appId == EnumApps.PointOfUse && this.paramEntitys[param].PARAMETER_ID == "ALLOW_EDITING_CASE") {
                                for (let pg = 0; pg < lstGridview.length; pg++) {
                                    if (lstGridview[pg].CHECKVALUE == true) {
                                        this.strValue = this.strValue + "1" + "-";
                                        this.blnCaseEdit = true;
                                    }
                                    else {
                                        this.strValue = this.strValue + "0" + "-";
                                    }
                                    // strModule = CType(gvRow.FindControl("Option"), Label).Text
                                    this.strModule = lstGridview[pg].OPTION.toString();
                                    if (this.strModule == CASE_EDITING_OPTIONS[CASE_EDITING_OPTIONS.AddCase].toString()) {
                                        this.strValue = this.strValue + CASE_EDITING_OPTIONS.AddCase + ",";
                                    }
                                    else if (this.strModule == CASE_EDITING_OPTIONS[CASE_EDITING_OPTIONS.ChangeStatus].toString()) {
                                        this.strValue = this.strValue + CASE_EDITING_OPTIONS.ChangeStatus + ",";
                                    }
                                    else if (this.strModule == CASE_EDITING_OPTIONS[CASE_EDITING_OPTIONS.ReplaceCase].toString()) {
                                        this.strValue = this.strValue + CASE_EDITING_OPTIONS.ReplaceCase + ",";
                                    }
                                    else if (this.strModule == CASE_EDITING_OPTIONS[CASE_EDITING_OPTIONS.ReplacePref].toString()) {
                                        this.strValue = this.strValue + CASE_EDITING_OPTIONS.ReplacePref + ",";
                                    }
                                }
                            }
                            else
                                if (lstGridParam.length == 0) {
                                    this.paramEntitys[param].PARAMETER_VALUE = this.paramEntitys[param].PARAMETER_VALUE;
                                }
                                else
                                    for (let gp = 0; gp < lstGridParam.length; gp++) {
                                        if (lstGridParam[gp].CHECKVALUE == true) {
                                            this.strValue = this.strValue + "1" + "-";
                                            this.blnPOUMenu = true;
                                        }
                                        else {
                                            this.strValue = this.strValue + "0" + "-";
                                        }
                                        // strModule = CType(gvRow.FindControl("MENU"), Label).Text
                                        this.strModule = lstGridParam[gp].MENU.toString();
                                        if (this.appId == EnumApps.Pharmacy) {
                                            if (this.strModule == Pharmacy_Menus[Pharmacy_Menus.Cyclecount].toString()) {
                                                this.strValue = this.strValue + Pharmacy_Menus.Cyclecount + "-";
                                            }
                                            else if (this.strModule == Pharmacy_Menus[Pharmacy_Menus.Issue].toString()) {
                                                this.strValue = this.strValue + Pharmacy_Menus.Issue + "-";
                                            }
                                            else if (this.strModule == Pharmacy_Menus[Pharmacy_Menus.Pick].toString()) {
                                                this.strValue = this.strValue + Pharmacy_Menus.Pick + "-";
                                            }
                                            else if (this.strModule == Pharmacy_Menus[Pharmacy_Menus.Deliver].toString()) {
                                                this.strValue = this.strValue + Pharmacy_Menus.Deliver + "-";
                                            }
                                            else if (this.strModule == Pharmacy_Menus[Pharmacy_Menus.Putaway].toString()) {
                                                this.strValue = this.strValue + Pharmacy_Menus.Putaway + "-";
                                            }
                                            else if (this.strModule == Pharmacy_Menus[Pharmacy_Menus.RxPick].toString()) {
                                                this.strValue = this.strValue + Pharmacy_Menus.RxPick + "-";
                                            }

                                        }
                                        else {
                                            if (this.strModule == POU_Menus[POU_Menus.Issue].toString()) {
                                                this.strValue = this.strValue + POU_Menus.Issue + "-";
                                            }
                                            else if (this.strModule == POU_Menus[POU_Menus.Returns].toString()) {
                                                this.strValue = this.strValue + POU_Menus.Returns + "-";
                                            }
                                            else if (this.strModule == POU_Menus[POU_Menus.Cyclecount].toString()) {
                                                this.strValue = this.strValue + POU_Menus.Cyclecount + "-";
                                            }
                                            else if (this.strModule == POU_Menus[POU_Menus.Putaway].toString()) {
                                                this.strValue = this.strValue + POU_Menus.Putaway + "-";
                                            }
                                            else if (this.strModule == POU_Menus[POU_Menus.CasePick].toString()) {
                                                this.strValue = this.strValue + POU_Menus.CasePick + "-";
                                            }
                                            else if (this.strModule == POU_Menus[POU_Menus.CaseIssue].toString()) {
                                                this.strValue = this.strValue + POU_Menus.CaseIssue + "-";
                                            }
                                            else if (this.strModule == POU_Menus[POU_Menus.RecordConsumption].toString()) {
                                                this.strValue = this.strValue + POU_Menus.RecordConsumption + "-";
                                            }
                                            else if (this.strModule == POU_Menus[POU_Menus.RecordConSearch].toString()) {
                                                this.strValue = this.strValue + POU_Menus.RecordConSearch + "-";
                                            }
                                            else if (this.strModule == POU_Menus[POU_Menus.Pick].toString()) {
                                                this.strValue = this.strValue + POU_Menus.Pick + "-";
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
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
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
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
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
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
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
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
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
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
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
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
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
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
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
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
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
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
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
                    for (let spd = 0; spd < this.paramEntitys.length; spd++) {
                        paramGridCheck[spd].APP_ID = this.paramEntitys[spd].APP_ID;
                        paramGridCheck[spd].PARAMETER_ID = this.paramEntitys[spd].PARAMETER_ID;
                        paramGridCheck[spd].PARAMETER_VALUE = this.paramEntitys[spd].PARAMETER_VALUE;
                        paramGridCheck[spd].FLAG = this.paramEntitys[spd].FLAG;
                        paramGridCheck[spd].SHORT_DESCR = this.paramEntitys[spd].SHORT_DESCR;
                        paramGridCheck[spd].LONG_DESCR = this.paramEntitys[spd].LONG_DESCR;
                        paramGridCheck[spd].LONG_DESCR1 = this.paramEntitys[spd].LONG_DESCR1;
                        paramGridCheck[spd].PARAMETER_TYPE = this.paramEntitys[spd].PARAMETER_TYPE;
                        paramGridCheck[spd].MULTIPLE_VALUES = this.paramEntitys[spd].MULTIPLE_VALUES;
                        paramGridCheck[spd].VALIDATION = this.paramEntitys[spd].VALIDATION;
                        paramGridCheck[spd].REQUIRED_FLAG = this.paramEntitys[spd].REQUIRED_FLAG;
                        paramGridCheck[spd].MAX_VALUE = this.paramEntitys[spd].MAX_VALUE;
                        paramGridCheck[spd].PARAMETER_COMP_VALUE = this.paramEntitys[spd].PARAMETER_COMP_VALUE;
                    }
                    this.statusMsg = "";
                    this.paramDisplay = true;
                    //  this.loading = true;
                    this.menuDisplay = false;
                    this.MOG = false;
                    this.screenDisplay = false;
                    this.growlMessage = [];
                    this.statusMsg = "Temporarily data is stored, Please click on Save Button in Parent Page to update the changes";
                    this.growlMessage.push({ severity: 'Info', summary: AtParConstants.GrowlTitle_Info, detail: this.statusMsg });
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
            menusCheck = this.menuGrid.filter(x => x.APP_ID == this.appId);
            //this.menusCheckvalues = menusCheck;
            if (this.menuEntitys.length != 0) {
                for (let e = 0; e < this.menuEntitys.length; e++) {
                    if (this.menuEntitys[e].MENU_SEQ_NO == null || this.menuEntitys[e].MENU_SEQ_NO.toString() == "" || this.menuEntitys[e].MENU_SEQ_NO == undefined) {
                        this.paramDisplay = false;
                        this.menuDisplay = true;
                        this.screenDisplay = false;
                        this.MOG = false;
                        this.growlMessage = [];
                        this.errormessage = "Please Enter Menu Sequence Number";
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                        return;
                    }
                    else
                        if (this.menuEntitys[e].MENU_SEQ_NO > 99) {
                            this.paramDisplay = false;
                            this.menuDisplay = true;
                            this.screenDisplay = false;
                            this.MOG = false;
                            this.growlMessage = [];
                            this.errormessage = "Sequence Number should be 0-99";
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                            return;
                        }
                }
                if (this.growlMessage == null || this.growlMessage == undefined || this.growlMessage.length == 0 || this.growlMessage.length == null) {
                    for (let ms = 0; ms < this.menuEntitys.length; ms++) {
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
                    this.growlMessage.push({ severity: 'Info', summary: AtParConstants.GrowlTitle_Info, detail: this.statusMsg });
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
            displayGrdCheck = this.displayGrid.filter(x => x.APP_ID == this.appId && x.SCREEN_NAME.toUpperCase() == this.selectedScreenDisplayId.toUpperCase());

            //displayGrdCheck = this.displayEntitys;
            if (this.displayEntitys.length != 0) {
                this.statusMsg = "";
                this.displayErrorString = "";
                for (let ds = 0; ds < this.displayEntitys.length; ds++) {

                    if (this.displayEntitys[ds].FLAG) {
                        this.displayEntitys[ds].DISPLAY_FIELD = "Y";
                    } else {
                        this.displayEntitys[ds].DISPLAY_FIELD = "N";
                    }
                    if (this.displayEntitys[ds].mandryDisplay == true) {
                        if (this.displayEntitys[ds].FLAG != true) {
                            this.statusMsg = "";
                            this.paramDisplay = false;
                            this.menuDisplay = false;
                            this.screenDisplay = true;
                            this.MOG = false;
                            let lstScreen = this.displayEntitys.filter(x => x.APP_ID == this.appId && x.SCREEN_NAME.toUpperCase() == this.selectedScreenDisplayId.toUpperCase());
                            for (let s = 0; s < lstScreen.length; s++) {
                                if (lstScreen[s].DEFAULT_DISPLAY_FIELD === "Y" && lstScreen[s].FLAG == false) {
                                    this.displayErrorString = this.displayErrorString + ", " + lstScreen[s].DEFAULT_COLUMN_HEADER;
                                }
                            }
                            this.growlMessage = [];
                            this.errormessage = "minimum" + this.displayErrorString + "  have to be selected";
                            var str = this.errormessage.replace("minimum,", "");
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: str });
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
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
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
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                        return;
                    }
                    if (this.displayEntitys[ds].TOGGLE_ORDER != "" && this.displayEntitys[ds].DEFAULT_TOGGLE_TEXT === "") {
                        this.paramDisplay = false;
                        this.menuDisplay = false;
                        this.screenDisplay = true;
                        this.MOG = false;
                        this.growlMessage = [];
                        this.errormessage = " Please Enter Toggle Description";
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                        return;
                    }
                }
                if (this.displayErrorString == null || this.displayErrorString === "") {
                    this.growlMessage = [];
                    for (let ds = 0; ds < this.displayEntitys.length; ds++) {
                        let colwidth = this.displayEntitys[ds].COLUMN_WIDTH;
                        if (this.displayEntitys[ds].COLUMN_HEADER == null || this.displayEntitys[ds].COLUMN_HEADER === "") {
                            this.paramDisplay = false;
                            this.menuDisplay = false;
                            this.screenDisplay = true;
                            this.MOG = false;
                            this.growlMessage = [];
                            this.errormessage = "Please Enter Label";
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                            return;
                        } else if (this.displayEntitys[ds].COLUMN_ORDER == null || this.displayEntitys[ds].COLUMN_ORDER.toString() == "" || displayGrdCheck[ds].COLUMN_ORDER == undefined) {
                            this.paramDisplay = false;
                            this.menuDisplay = false;
                            this.screenDisplay = true;
                            this.MOG = false;
                            this.growlMessage = [];
                            this.errormessage = "Please Enter Order";
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                            return;
                        } else if (this.displayEntitys[ds].COLUMN_ORDER > 99) {
                            this.paramDisplay = false;
                            this.menuDisplay = false;
                            this.screenDisplay = true;
                            this.MOG = false;
                            this.growlMessage = [];
                            this.errormessage = "Please enter value for Order between 0 and 99";
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                            return;
                        } else if (colwidth == null || colwidth === "") {
                            this.paramDisplay = false;
                            this.menuDisplay = false;
                            this.screenDisplay = true;
                            this.MOG = false;
                            this.growlMessage = [];
                            this.errormessage = "Please Enter Width";
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                            return;
                        } else if (this.displayEntitys[ds].COLUMN_WIDTH > 9999) {
                            this.paramDisplay = false;
                            this.menuDisplay = false;
                            this.screenDisplay = true;
                            this.MOG = false;
                            this.growlMessage = [];
                            this.errormessage = "Please enter value for Width between 0 and 9999";
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                            return;
                        }
                        else if (this.displayEntitys[ds].TOGGLE_ORDER === '0') {
                            this.paramDisplay = false;
                            this.menuDisplay = false;
                            this.screenDisplay = true;
                            this.MOG = false;
                            this.growlMessage = [];
                            this.errormessage = "Please enter value for Toggle Order should not be zero";
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                            return;
                        }
                        else if (this.displayEntitys[ds].TOGGLE_ORDER === '0') {
                            this.paramDisplay = false;
                            this.menuDisplay = false;
                            this.screenDisplay = true;
                            this.MOG = false;
                            this.growlMessage = [];
                            this.errormessage = "Please enter value for Toggle order should not be zero";
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                            return;
                        }
                        if (this.displayEntitys[ds].TOGGLE_ORDER > 99) {
                            this.paramDisplay = false;
                            this.menuDisplay = false;
                            this.screenDisplay = true;
                            this.MOG = false;
                            this.growlMessage = [];
                            this.errormessage = "Please enter value for Toggle order between 0 and 99";
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                            return;
                        }
                    }
                }
                if (this.growlMessage == null || this.growlMessage == undefined || this.growlMessage.length == 0 || this.growlMessage.length == null) {
                    for (let sds = 0; sds < this.displayEntitys.length; sds++) {
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
                    this.growlMessage.push({ severity: 'Info', summary: AtParConstants.GrowlTitle_Info, detail: this.statusMsg });
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
    }

    //Go Back Button Click for every navigate Page for params,menus,screen display
    GobackData_Click() {

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
    }

    //screen display down change event
    drpchnage() {
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
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                this.displaydataGrid = false;
            }
            else {
                this.totallstDisplayItems = this.displayGrid.filter(x => x.APP_ID == this.appId && x.SCREEN_NAME.toUpperCase() == this.selectedScreenDisplayId.toUpperCase());
                this.displayEntitys = [];
                for (let sd = 0; sd < this.totallstDisplayItems.length; sd++) {
                    let displayentity = new VM_MT_ATPAR_PROFILE_SCREEN_DISPLAY()
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

                    this.displayEntitys.push(displayentity)
                }
                //  let data = this.totallstDisplayItems;
                let data = this.displayEntitys;
                for (let i = 0; i <= data.length - 1; i++) {
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
                    let txtPasswdValue = <HTMLInputElement>document.getElementById('manageDspHeaderColumn0');
                    txtPasswdValue.focus();
                }, 500);
            }
        }
        catch (exception) {
            this.clientErrorMsg(exception, "drpchnage");
        }
    }


    ddlProfileChnage() {
        this.content = false;
    }

    constructor(private httpservice: HttpService, private _http: Http, private spinnerService: SpinnerService,
        private atParConstant: AtParConstants,
        private confirmationService: ConfirmationService) {
        this.breadCrumbMenu = new Menus();
        this.appicon = "assets/img/app_icon.png";

    }

    ngOnInit(): void {
        this.gridRows = + sessionStorage.getItem("RowsOfGridSelected");
        this.startindex = + sessionStorage.getItem("startindex");
        this.lstCheckedparams = new Array<MT_ATPAR_APP>();
        this.lsthhtCheckedparams = new Array<MT_ATPAR_APP>();
        this.BindGrid = new Array<MT_ATPAR_APP>();
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.BindDropDown();
        this.recordsPerPageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        //this.BindDropDownDisplay();
    }

    //Manage Profile Main DropDown
    async BindDropDown() {

        this.selectedOrgProfileId = "";
        // this.strProfile = this.deviceTokenEntry(TokenEntry_Enum.ProfileID);
        try {
            this.spinnerService.start();
            await this.httpservice.getSync({
                "apiMethod": "/api/Common/GetProfiles",
                params: {
                    "userID": this.deviceTokenEntry[TokenEntry_Enum.UserID]

                }
            }).then(res => <AtParWebApiResponse<any>>res.json()).then((response) => {
                switch (response.StatType) {
                    case StatusType.Success:
                        {
                            this.dropdownData = [];
                            this.spinnerService.stop();
                            this.dropdownData = [];
                            this.orgProfileData = response.DataList;
                            if (this.orgProfileData.length > 1) {
                                this.dropdownData.push({ label: "Select Profile", value: null })
                                for (var i = 0; i < response.DataList.length; i++) {
                                    if (this.deviceTokenEntry[TokenEntry_Enum.ProfileID] == "ADMIN") {
                                        this.dropdownData.push({ label: response.DataList[i].PROFILE_ID + " - " + response.DataList[i].PROFILE_DESCRIPTION.replace(/\%20/g, ' '), value: response.DataList[i].PROFILE_ID })
                                    }
                                    else {
                                        if (response.DataList[i].PROFILE_ID.toUpperCase() !== "ADMIN") {
                                            this.dropdownData.push({ label: response.DataList[i].PROFILE_ID + " - " + response.DataList[i].PROFILE_DESCRIPTION.replace(/\%20/g, ' '), value: response.DataList[i].PROFILE_ID })
                                        }
                                    }
                                }
                            }
                            break;
                        }
                    case StatusType.Error:
                        {
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            break;
                        }
                }
            });
        }
        catch (exception) {
            this.clientErrorMsg(exception, "BindDropDown");
        }
    }

    //Screen display DropDown
    async BindDropDownDisplay() {
        this.displaydataGrid = false;
        this.dropdowndisplayData = [];
        this.selectedScreenDisplayId = "";
        try {
            this.spinnerService.start();
            await this.httpservice.getSync({
                "apiMethod": "/api/ManageProfiles/GetProfileInfo",
                params: {
                    "profileID": this.selectedOrgProfileId,
                    //"deviceTokenEntry": this._deviceTokenEntry
                }
            }).then(res => <AtParWebApiResponse<any>>res.json()).then((response) => {
                switch (response.StatType) {
                    case StatusType.Success:
                        {
                            this.spinnerService.stop();
                            this.temp = response.DataDictionary["listScreenDisplay"].filter(x => x.APP_ID == this.appId);
                            this.distinctList = asEnumerable(this.temp).Select(a => a.SCREEN_NAME.toUpperCase()).Distinct().ToArray();
                            this.dropdowndisplayData.push({ label: "Select Screen Name", value: null })
                            for (var i = 0; i < this.distinctList.length; i++) {
                                this.dropdowndisplayData.push({ label: this.distinctList[i], value: this.distinctList[i] })
                            }
                            //this.spinnerService.stop();
                            break;
                        }
                    case StatusType.Error:
                        {
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            break;
                        }
                }
            });
        }
        catch (exception) {
            this.clientErrorMsg(exception, "BindDropDownDisplay");
        }
    }

    //Params DropDown
    async BindDropDownParam() {
        try {
            this.dropdownparamData = [];
            // this.spinnerService.start();
            await this.httpservice.getSync({
                "apiMethod": "/api/Common/GetPrintersData",
                params: {
                    "appID": this.appId,
                    "printerName": ""

                }
            }).then(res => <AtParWebApiResponse<any>>res.json()).then((response) => {
                switch (response.StatType) {
                    case StatusType.Success:
                        {
                            this.dropdownparamData = [];
                            this.paramdrp = response.DataList;
                            this.dropdownparamData.push({ label: "Select One", value: null })
                            for (var i = 0; i < this.paramdrp.length; i++) {
                                this.dropdownparamData.push({ label: this.paramdrp[i].FRIENDLY_NAME, value: this.paramdrp[i].FRIENDLY_NAME })
                            }
                            break;
                        }
                    case StatusType.Error:
                        {
                            this.dropdownparamData = [];
                            this.dropdownparamData.push({ label: "Select One", value: null })
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            break;
                        }
                    case StatusType.Warn:
                        {
                            this.dropdownparamData = [];
                            this.dropdownparamData.push({ label: "Select One", value: null })
                            this.growlMessage = [];
                            break;
                        }
                }
            });
        }
        catch (exception) {
            this.clientErrorMsg(exception, "BindDropDownParam");

        }
    }

    //Select ProfileId and Click on Go Button
    async go_Click() {
        this.content = false;
        this.paramProfileId = "";
        this.paraDescription = "";
        this.saveloading = false;
        this.buttonId = "";
        this.errormessage = "";
        this.displayErrorString = "";
        if (this.selectedOrgProfileId == "" || this.selectedOrgProfileId == null || this.selectedOrgProfileId == "Select User") {
            this.growlMessage = [];
            this.errormessage = "Please Select Profile ID";
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
            this.content = false;
        }
        else {
            this.growlMessage = [];
            this.BindGrid = [];
            this.desc = false;
            // var profileId: string[] = this.selectedOrgProfileId.split("-");
            var profileId = this.selectedOrgProfileId;
            var prfId = this.dropdownData.filter(x => x.value == profileId);
            var desc = prfId[0].label;
            var val1 = prfId[0].value + " - ";
            var descriptipn = desc.replace(val1, "");
            this.paramProfileId = profileId;
            this.paraDescription = descriptipn;
            this.paraDescription = this.paraDescription.replace(/\%20/g, ' ');
            try {
                this.spinnerService.start();
                await this.httpservice.getSync({
                    "apiMethod": "/api/ManageProfiles/GetProfileInfo",
                    params: {
                        "profileID": profileId,
                        //"deviceTokenEntry": this._deviceTokenEntry
                    }
                }).then(res => <AtParWebApiResponse<any>>res.json()).then((response) => {
                    switch (response.StatType) {
                        case StatusType.Success:
                            {
                                this.spinnerService.stop();
                                this.content = true;
                                this.orgProfileDataList = response.DataDictionary;

                                if (this.orgProfileData != null) {

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
                                        else
                                            if (response.DataDictionary["listProfiles"][i].SERVER_USER != "Y" && response.DataDictionary["listProfiles"][i].CLIENT_USER == "N") {
                                                response.DataDictionary["listProfiles"][i].displayscreen = true;
                                                response.DataDictionary["listProfiles"][i].displayparam = true;
                                                response.DataDictionary["listProfiles"][i].displaymenu = false;
                                            }
                                            else
                                                if (response.DataDictionary["listProfiles"][i].SERVER_USER == "Y" && response.DataDictionary["listProfiles"][i].CLIENT_USER != "N") {
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
                                        if (this.paramProfileId.toUpperCase() == "ADMIN") {
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
                                        if (response.DataDictionary["listProfiles"][i].APP_ID == EnumApps.Auth || response.DataDictionary["listProfiles"][i].APP_ID == EnumApps.Reports) {
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
                                    let griddata = response.DataDictionary["listProfiles"];
                                    this.lstMenuItems = response.DataDictionary["listMenus"];
                                    this.totallstParamItems = response.DataDictionary["listParams"];
                                    this.totallstDisplayItems = response.DataDictionary["listScreenDisplay"];
                                    this.menuGrid = response.DataDictionary["listMenus"];
                                    this.paramGrid = response.DataDictionary["listParams"];
                                    this.displayGrid = response.DataDictionary["listScreenDisplay"];
                                    this.clientCount = response.DataDictionary["clientUserCount"];
                                    this.serverCount = response.DataDictionary["serverUserCount"];
                                    this.userCount = response.DataDictionary["profileIDCount"];
                                    this.BindGrid = griddata;
                                    this.growlMessage = [];
                                }
                                break;
                            }

                        case StatusType.Error:
                            {
                                this.spinnerService.stop();
                                this.growlMessage = [];
                                this.errormessage = response.StatusMessage;

                                this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                break;
                            }
                    }
                });

                await this.httpservice.getSync({
                    "apiMethod": "/api/Common/GetAuditAllowed",
                    params: {
                        "appId": 0,
                        "menuCode": 'mt_atpar_manage_profiles.aspx'

                    }
                }).then(res => <AtParWebApiResponse<any>>res.json()).then((response) => {
                    this.audistStatus = response.Data;
                    switch (response.StatType) {
                        case StatusType.Success:
                            {
                                if (response.Data == "Y") {
                                    this.lstauditallowed;
                                }
                                break;
                            }
                        case StatusType.Error:
                            {
                                this.spinnerService.stop();
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                break;
                            }
                    }

                });
            }
            catch (exception) {
                this.clientErrorMsg(exception, "go_Click");
            }
        }
    }

    // Create the Profile click button
    async create_Click(event) {
        event.preventDefault();
        this.lstmenuCheckedparams = [];
        this.paramEntitys = [];
        this.displayEntitys = [];
        var target = event.target || event.srcElement || event.currentTarget;
        var idAttr = target.attributes.id;
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
        try {
            this.spinnerService.start();

            await this.httpservice.getSync({
                "apiMethod": "/api/ManageProfiles/GetProfileInfo",
                params: {
                    "profileID": this.profileId,
                }
            }).then(res => <AtParWebApiResponse<any>>res.json()).then((response) => {
                switch (response.StatType) {
                    case StatusType.Success:
                        {
                            this.spinnerService.stop();
                            this.content = true;
                            this.orgProfileDataList = response.DataDictionary;
                            if (this.orgProfileData != null) {
                                for (var i = 0; i < response.DataDictionary["listProfiles"].length; i++) {
                                    response.DataDictionary["listProfiles"][i].displayscreen = false;
                                    response.DataDictionary["listProfiles"][i].displayparam = false;
                                    response.DataDictionary["listProfiles"][i].displaymenu = false;
                                    response.DataDictionary["listProfiles"][i].SERVER_USER = "N";
                                    response.DataDictionary["listProfiles"][i].CLIENT_USER = "N";
                                    if (response.DataDictionary["listProfiles"][i].APP_ID == EnumApps.Auth || response.DataDictionary["listProfiles"][i].APP_ID == EnumApps.Reports) {
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
                                let griddata = response.DataDictionary["listProfiles"];
                                this.menuGrid = response.DataDictionary["listMenus"];
                                this.paramGrid = response.DataDictionary["listParams"];
                                this.displayGrid = response.DataDictionary["listScreenDisplay"];
                                this.BindGrid = griddata;
                            }
                            this.saveloading = true;
                            break;
                        }
                    case StatusType.Error:
                        {
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            break;
                        }
                }

            });
        }
        catch (exception) {
            this.clientErrorMsg(exception, "create_Click");
            return 0;
        }
        this.content = true;
    }

    //Finally Save Button
    async save() {
        try {

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
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                return 0;
            }
            else if (this.paramProfileId === "" || this.paramProfileId === null || this.paramProfileId === undefined) {
                this.errormessage = "Please Enter Profile ID";
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                return 0;
            }
            else
                if (this.paraDescription === "" || this.paraDescription === null || this.paraDescription === undefined) {
                    this.errormessage = "Please Enter Profile Description";
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                    return 0;
                }
            this.growlMessage = [];
            this.errormessage = "";
            var PROFILE = new Array<MT_ATPAR_APP>();
            PROFILE = this.BindGrid;
            var HHT = new MT_ATPAR_APP();
            HHT = this.lsthhtCheckedparams[0];
            var PARAMS = new Array<VM_MT_ATPAR_PROFILE_APP_PARAMETERS>();
            PARAMS = this.paramGrid;

            var MENUS = new Array<VM_MT_ATPAR_PROFILE_APP_MENUS>();
            MENUS = this.menuGrid;

            var SCREENDISPLAY = new Array<VM_MT_ATPAR_PROFILE_SCREEN_DISPLAY>();
            SCREENDISPLAY = this.displayGrid;

            var dic1ProfileInfo = { 'PROFILE': PROFILE, 'PARAMS': PARAMS, 'MENUS': MENUS, 'SCREENDISPLAY': SCREENDISPLAY };
            for (let i = 0; i < PROFILE.length; i++) {
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
                    var profileDatarow = new MT_ATPAR_APP();
                    profileDatarow.APP_ID = PROFILE[i].APP_ID;
                    profileDatarow.SERVER_USER = PROFILE[i].FLAG == true ? "Y" : "N";
                    profileDatarow.CLIENT_USER = PROFILE[i].ClientFLAG == true ? "Y" : "N";
                    this.CreateProfile.push(profileDatarow);
                }

                if (PROFILE[i].ClientFLAG == true) {
                    if (SCREENDISPLAY.length != 0) {
                        if (this.buttonId == "create") {
                            for (let s = 0; s <= SCREENDISPLAY.length - 1; s++) {
                                if (this.profileAppId == 0) {
                                }
                                else {
                                    if (SCREENDISPLAY[s].FLAG != undefined || SCREENDISPLAY[s].FLAG != null) {
                                        SCREENDISPLAY[s].DISPLAY_FIELD = SCREENDISPLAY[s].FLAG == true ? "Y" : "N";
                                    }
                                    else {
                                        SCREENDISPLAY[s].DISPLAY_FIELD = SCREENDISPLAY[s].DISPLAY_FIELD
                                    }
                                    // SCREENDISPLAY[s].DISPLAY_FIELD = SCREENDISPLAY[s].FLAG == true ? "Y" : "N";
                                    if (SCREENDISPLAY[s].APP_ID == this.profileAppId) {
                                        var screendata = new VM_MT_ATPAR_PROFILE_SCREEN_DISPLAY();
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
                            for (let s = 0; s <= SCREENDISPLAY.length - 1; s++) {

                                // if (this.profileAppId != 0) {
                                if (SCREENDISPLAY[s].DISPLAY_FIELD != (SCREENDISPLAY[s].FLAG == true ? "Y" : "N")) {
                                    SCREENDISPLAY[s].CHANGE_FLAG = "Y";
                                }
                                // SCREENDISPLAY[s].DISPLAY_FIELD = SCREENDISPLAY[s].FLAG == true ? "Y" : "N";
                                if (SCREENDISPLAY[s].APP_ID == this.profileAppId) {
                                    if (SCREENDISPLAY[s].CHANGE_FLAG == "Y") {

                                        //SCREENDISPLAY[s].DISPLAY_FIELD = SCREENDISPLAY[s].FLAG == true ? "Y" : "N";
                                        //this.CreateDisplay.push(SCREENDISPLAY[s]);
                                        var screendata = new VM_MT_ATPAR_PROFILE_SCREEN_DISPLAY();
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
                                        var screendata = new VM_MT_ATPAR_PROFILE_SCREEN_DISPLAY();
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
                                            var lstSecurity = new MT_ATPAR_SECURITY_AUDIT();
                                            lstSecurity.KEY_1 = this.paramProfileId;
                                            lstSecurity.KEY_2 = this.profileAppId.toString();
                                            lstSecurity.KEY_3 = this.selectedScreenDisplayId;
                                            lstSecurity.FIELD_NAME = "DISPLAY_COLUMN";
                                            lstSecurity.OLD_VALUE = this.displayGrid[s].DISPLAY_FIELD;
                                            lstSecurity.NEW_VALUE = SCREENDISPLAY[s].FLAG == true ? "Y" : "N";
                                            this.lstauditallowed.push(lstSecurity);
                                        }
                                        else
                                            if (this.displayGrid[s].COLUMN_HEADER != SCREENDISPLAY[s].COLUMN_HEADER) {
                                                var lstSecurity = new MT_ATPAR_SECURITY_AUDIT();
                                                lstSecurity.KEY_1 = this.paramProfileId;
                                                lstSecurity.KEY_2 = this.profileAppId.toString();
                                                lstSecurity.KEY_3 = this.selectedScreenDisplayId;
                                                lstSecurity.FIELD_NAME = "COLUMN_HEADER";
                                                lstSecurity.OLD_VALUE = this.displayGrid[s].COLUMN_HEADER;
                                                lstSecurity.NEW_VALUE = SCREENDISPLAY[s].COLUMN_HEADER;
                                                this.lstauditallowed.push(lstSecurity);
                                            }
                                            else
                                                if (this.displayGrid[s].COLUMN_ORDER != SCREENDISPLAY[s].COLUMN_ORDER) {
                                                    var lstSecurity = new MT_ATPAR_SECURITY_AUDIT();
                                                    lstSecurity.KEY_1 = this.paramProfileId;
                                                    lstSecurity.KEY_2 = this.profileAppId.toString();
                                                    lstSecurity.KEY_3 = this.selectedScreenDisplayId;
                                                    lstSecurity.FIELD_NAME = "COLUMN_ORDER";
                                                    lstSecurity.OLD_VALUE = this.displayGrid[s].COLUMN_ORDER.toString();
                                                    lstSecurity.NEW_VALUE = SCREENDISPLAY[s].COLUMN_ORDER.toString();
                                                    this.lstauditallowed.push(lstSecurity);
                                                }
                                                else
                                                    if (this.displayGrid[s].COLUMN_WIDTH != SCREENDISPLAY[s].COLUMN_WIDTH) {
                                                        var lstSecurity = new MT_ATPAR_SECURITY_AUDIT();
                                                        lstSecurity.KEY_1 = this.paramProfileId;
                                                        lstSecurity.KEY_2 = this.profileAppId.toString();
                                                        lstSecurity.KEY_3 = this.selectedScreenDisplayId;
                                                        lstSecurity.FIELD_NAME = "COLUMN_WIDTH";
                                                        lstSecurity.OLD_VALUE = this.displayGrid[s].COLUMN_WIDTH.toString();
                                                        lstSecurity.NEW_VALUE = SCREENDISPLAY[s].COLUMN_WIDTH.toString();
                                                        this.lstauditallowed.push(lstSecurity);
                                                    }
                                                    else
                                                        if (this.displayGrid[s].TOGGLE_ORDER != SCREENDISPLAY[s].TOGGLE_ORDER) {
                                                            var lstSecurity = new MT_ATPAR_SECURITY_AUDIT();
                                                            lstSecurity.KEY_1 = this.paramProfileId;
                                                            lstSecurity.KEY_2 = this.profileAppId.toString();
                                                            lstSecurity.KEY_3 = this.selectedScreenDisplayId;
                                                            lstSecurity.FIELD_NAME = "TOGGLE_ORDER";
                                                            lstSecurity.OLD_VALUE = this.displayGrid[s].TOGGLE_ORDER;
                                                            lstSecurity.NEW_VALUE = SCREENDISPLAY[s].TOGGLE_ORDER;
                                                            this.lstauditallowed.push(lstSecurity);
                                                        }
                                                        else
                                                            if (this.displayGrid[s].DEFAULT_TOGGLE_TEXT != SCREENDISPLAY[s].DEFAULT_TOGGLE_TEXT) {
                                                                var lstSecurity = new MT_ATPAR_SECURITY_AUDIT();
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
                            for (let p = 0; p <= PARAMS.length - 1; p++) {
                                if (this.profileAppId == 0) {

                                }
                                else {
                                    if (PARAMS[p].APP_ID == this.profileAppId) {

                                        var Paramdatarow = new VM_MT_ATPAR_PROFILE_APP_PARAMETERS();
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
                                                    PARAMS[p].PARAMETER_VALUE === Shiping_Label_PrinterType.None.toString()) {

                                                    Paramdatarow.PARAMETER_VALUE = "1";
                                                    //this.strParamValue = Shiping_Label_PrinterType.None.toString();
                                                } else if (PARAMS[p].PARAMETER_VALUE === 'Print Header Label only to a Mobile Printer' ||
                                                    PARAMS[p].PARAMETER_VALUE === Shiping_Label_PrinterType.HeaderLbl_MobilePrinter.toString()) {
                                                    //this.strParamValue = Shiping_Label_PrinterType.HeaderLbl_MobilePrinter.toString();
                                                    Paramdatarow.PARAMETER_VALUE = "2";
                                                } else if (PARAMS[p].PARAMETER_VALUE === 'Print Delivery Ticket only to a Stationary Printer' ||
                                                    PARAMS[p].PARAMETER_VALUE === Shiping_Label_PrinterType.DeliveryTic_StationaryPrinter.toString()) {
                                                    //  this.strParamValue = Shiping_Label_PrinterType.DeliveryTic_StationaryPrinter.toString();
                                                    Paramdatarow.PARAMETER_VALUE = "3";
                                                } else if (PARAMS[p].PARAMETER_VALUE === 'Print Header Label to a Mobile Printer and Delivery Ticket to a Stationary Printer' ||
                                                    PARAMS[p].PARAMETER_VALUE === Shiping_Label_PrinterType.Both_MobilePrinter_StationaryPrinter.toString()) {
                                                    //this.strParamValue = Shiping_Label_PrinterType.Both_MobilePrinter_StationaryPrinter.toString();
                                                    Paramdatarow.PARAMETER_VALUE = "4";
                                                } else {
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
                                        } else if (PARAMS[p].PARAMETER_TYPE == "GRIDVIEW") {
                                            this.strValue = "";
                                            this.strModule = "";
                                            let lstGridview = this.gridViewAllowEditingParamValues;
                                            let lstGridParam = this.gridViewParamValues;
                                            if (lstGridview.length == 0 || lstGridview == undefined || lstGridview == null) {
                                                Paramdatarow.PARAMETER_VALUE = PARAMS[p].PARAMETER_VALUE;
                                            }
                                            else
                                                if (this.appId == EnumApps.PointOfUse && PARAMS[p].PARAMETER_ID == "ALLOW_EDITING_CASE") {
                                                    for (let pg = 0; pg < lstGridview.length; pg++) {
                                                        if (lstGridview[pg].CHECKVALUE == true) {
                                                            this.strValue = this.strValue + "1" + "-";
                                                            this.blnCaseEdit = true;
                                                        }
                                                        else {
                                                            this.strValue = this.strValue + "0" + "-";
                                                        }
                                                        // strModule = CType(gvRow.FindControl("Option"), Label).Text
                                                        this.strModule = lstGridview[pg].OPTION.toString();
                                                        if (this.strModule == CASE_EDITING_OPTIONS[CASE_EDITING_OPTIONS.AddCase].toString()) {
                                                            this.strValue = this.strValue + CASE_EDITING_OPTIONS.AddCase + ",";
                                                        }
                                                        else if (this.strModule == CASE_EDITING_OPTIONS[CASE_EDITING_OPTIONS.ChangeStatus].toString()) {
                                                            this.strValue = this.strValue + CASE_EDITING_OPTIONS.ChangeStatus + ",";
                                                        }
                                                        else if (this.strModule == CASE_EDITING_OPTIONS[CASE_EDITING_OPTIONS.ReplaceCase].toString()) {
                                                            this.strValue = this.strValue + CASE_EDITING_OPTIONS.ReplaceCase + ",";
                                                        }
                                                        else if (this.strModule == CASE_EDITING_OPTIONS[CASE_EDITING_OPTIONS.ReplacePref].toString()) {
                                                            this.strValue = this.strValue + CASE_EDITING_OPTIONS.ReplacePref + ",";
                                                        }
                                                    }
                                                }
                                                else
                                                    if (lstGridParam.length == 0 || lstGridParam == undefined || lstGridParam == null) {
                                                        Paramdatarow.PARAMETER_VALUE = PARAMS[p].PARAMETER_VALUE;
                                                    }
                                                    else
                                                        for (let gp = 0; gp < lstGridParam.length; gp++) {
                                                            if (lstGridParam[gp].CHECKVALUE == true) {
                                                                this.strValue = this.strValue + "1" + "-";
                                                                this.blnPOUMenu = true;
                                                            }
                                                            else {
                                                                this.strValue = this.strValue + "0" + "-";
                                                            }
                                                            // strModule = CType(gvRow.FindControl("MENU"), Label).Text
                                                            this.strModule = lstGridParam[gp].MENU.toString();
                                                            if (this.appId == EnumApps.Pharmacy) {
                                                                if (this.strModule == Pharmacy_Menus[Pharmacy_Menus.Cyclecount].toString()) {
                                                                    this.strValue = this.strValue + Pharmacy_Menus.Cyclecount + "-";
                                                                }
                                                                else if (this.strModule == Pharmacy_Menus[Pharmacy_Menus.Issue].toString()) {
                                                                    this.strValue = this.strValue + Pharmacy_Menus.Issue + "-";
                                                                }
                                                                else if (this.strModule == Pharmacy_Menus[Pharmacy_Menus.Pick].toString()) {
                                                                    this.strValue = this.strValue + Pharmacy_Menus.Pick + "-";
                                                                }
                                                                else if (this.strModule == Pharmacy_Menus[Pharmacy_Menus.Deliver].toString()) {
                                                                    this.strValue = this.strValue + Pharmacy_Menus.Deliver + "-";
                                                                }
                                                                else if (this.strModule == Pharmacy_Menus[Pharmacy_Menus.Putaway].toString()) {
                                                                    this.strValue = this.strValue + Pharmacy_Menus.Putaway + "-";
                                                                }
                                                                else if (this.strModule == Pharmacy_Menus[Pharmacy_Menus.RxPick].toString()) {
                                                                    this.strValue = this.strValue + Pharmacy_Menus.RxPick + "-";
                                                                }

                                                            }
                                                            else {
                                                                if (this.strModule == POU_Menus[POU_Menus.Issue].toString()) {
                                                                    this.strValue = this.strValue + POU_Menus.Issue + "-";
                                                                }
                                                                else if (this.strModule == POU_Menus[POU_Menus.Returns].toString()) {
                                                                    this.strValue = this.strValue + POU_Menus.Returns + "-";
                                                                }
                                                                else if (this.strModule == POU_Menus[POU_Menus.Cyclecount].toString()) {
                                                                    this.strValue = this.strValue + POU_Menus.Cyclecount + "-";
                                                                }
                                                                else if (this.strModule == POU_Menus[POU_Menus.Putaway].toString()) {
                                                                    this.strValue = this.strValue + POU_Menus.Putaway + "-";
                                                                }
                                                                else if (this.strModule == POU_Menus[POU_Menus.CasePick].toString()) {
                                                                    this.strValue = this.strValue + POU_Menus.CasePick + "-";
                                                                }
                                                                else if (this.strModule == POU_Menus[POU_Menus.CaseIssue].toString()) {
                                                                    this.strValue = this.strValue + POU_Menus.CaseIssue + "-";
                                                                }
                                                                else if (this.strModule == POU_Menus[POU_Menus.RecordConsumption].toString()) {
                                                                    this.strValue = this.strValue + POU_Menus.RecordConsumption + "-";
                                                                }
                                                                else if (this.strModule == POU_Menus[POU_Menus.RecordConSearch].toString()) {
                                                                    this.strValue = this.strValue + POU_Menus.RecordConSearch + "-";
                                                                }
                                                                else if (this.strModule == POU_Menus[POU_Menus.Pick].toString()) {
                                                                    this.strValue = this.strValue + POU_Menus.Pick + "-";
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
                            for (let p = 0; p <= PARAMS.length - 1; p++) {
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
                                        let lstGridview = this.gridViewAllowEditingParamValues;
                                        let lstGridParam = this.gridViewParamValues;
                                        if (lstGridview.length == 0) {
                                            PARAMS[p].PARAMETER_VALUE = PARAMS[p].PARAMETER_VALUE;
                                        }
                                        else
                                            if (this.appId == EnumApps.PointOfUse && PARAMS[p].PARAMETER_ID == "ALLOW_EDITING_CASE") {
                                                for (let pg = 0; pg < lstGridview.length; pg++) {
                                                    if (lstGridview[pg].CHECKVALUE == true) {
                                                        this.strValue = this.strValue + "1" + "-";
                                                        this.blnCaseEdit = true;
                                                    }
                                                    else {
                                                        this.strValue = this.strValue + "0" + "-";
                                                    }
                                                    // strModule = CType(gvRow.FindControl("Option"), Label).Text
                                                    this.strModule = lstGridview[pg].OPTION.toString();
                                                    if (this.strModule == CASE_EDITING_OPTIONS[CASE_EDITING_OPTIONS.AddCase].toString()) {
                                                        this.strValue = this.strValue + CASE_EDITING_OPTIONS.AddCase + ",";
                                                    }
                                                    else if (this.strModule == CASE_EDITING_OPTIONS[CASE_EDITING_OPTIONS.ChangeStatus].toString()) {
                                                        this.strValue = this.strValue + CASE_EDITING_OPTIONS.ChangeStatus + ",";
                                                    }
                                                    else if (this.strModule == CASE_EDITING_OPTIONS[CASE_EDITING_OPTIONS.ReplaceCase].toString()) {
                                                        this.strValue = this.strValue + CASE_EDITING_OPTIONS.ReplaceCase + ",";
                                                    }
                                                    else if (this.strModule == CASE_EDITING_OPTIONS[CASE_EDITING_OPTIONS.ReplacePref].toString()) {
                                                        this.strValue = this.strValue + CASE_EDITING_OPTIONS.ReplacePref + ",";
                                                    }
                                                }
                                            }
                                            else
                                                if (lstGridParam.length == 0) {
                                                    PARAMS[p].PARAMETER_VALUE = PARAMS[p].PARAMETER_VALUE;
                                                }
                                                else
                                                    for (let gp = 0; gp < lstGridParam.length; gp++) {
                                                        if (lstGridParam[gp].CHECKVALUE == true) {
                                                            this.strValue = this.strValue + "1" + "-";
                                                            this.blnPOUMenu = true;
                                                        }
                                                        else {
                                                            this.strValue = this.strValue + "0" + "-";
                                                        }
                                                        // strModule = CType(gvRow.FindControl("MENU"), Label).Text
                                                        this.strModule = lstGridParam[gp].MENU.toString();
                                                        if (this.appId == EnumApps.Pharmacy) {
                                                            if (this.strModule == Pharmacy_Menus[Pharmacy_Menus.Cyclecount].toString()) {
                                                                this.strValue = this.strValue + Pharmacy_Menus.Cyclecount + "-";
                                                            }
                                                            else if (this.strModule == Pharmacy_Menus[Pharmacy_Menus.Issue].toString()) {
                                                                this.strValue = this.strValue + Pharmacy_Menus.Issue + "-";
                                                            }
                                                            else if (this.strModule == Pharmacy_Menus[Pharmacy_Menus.Pick].toString()) {
                                                                this.strValue = this.strValue + Pharmacy_Menus.Pick + "-";
                                                            }
                                                            else if (this.strModule == Pharmacy_Menus[Pharmacy_Menus.Deliver].toString()) {
                                                                this.strValue = this.strValue + Pharmacy_Menus.Deliver + "-";
                                                            }
                                                            else if (this.strModule == Pharmacy_Menus[Pharmacy_Menus.Putaway].toString()) {
                                                                this.strValue = this.strValue + Pharmacy_Menus.Putaway + "-";
                                                            }
                                                            else if (this.strModule == Pharmacy_Menus[Pharmacy_Menus.RxPick].toString()) {
                                                                this.strValue = this.strValue + Pharmacy_Menus.RxPick + "-";
                                                            }

                                                        }
                                                        else {
                                                            if (this.strModule == POU_Menus[POU_Menus.Issue].toString()) {
                                                                this.strValue = this.strValue + POU_Menus.Issue + "-";
                                                            }
                                                            else if (this.strModule == POU_Menus[POU_Menus.Returns].toString()) {
                                                                this.strValue = this.strValue + POU_Menus.Returns + "-";
                                                            }
                                                            else if (this.strModule == POU_Menus[POU_Menus.Cyclecount].toString()) {
                                                                this.strValue = this.strValue + POU_Menus.Cyclecount + "-";
                                                            }
                                                            else if (this.strModule == POU_Menus[POU_Menus.Putaway].toString()) {
                                                                this.strValue = this.strValue + POU_Menus.Putaway + "-";
                                                            }
                                                            else if (this.strModule == POU_Menus[POU_Menus.CasePick].toString()) {
                                                                this.strValue = this.strValue + POU_Menus.CasePick + "-";
                                                            }
                                                            else if (this.strModule == POU_Menus[POU_Menus.CaseIssue].toString()) {
                                                                this.strValue = this.strValue + POU_Menus.CaseIssue + "-";
                                                            }
                                                            else if (this.strModule == POU_Menus[POU_Menus.RecordConsumption].toString()) {
                                                                this.strValue = this.strValue + POU_Menus.RecordConsumption + "-";
                                                            }
                                                            else if (this.strModule == POU_Menus[POU_Menus.RecordConSearch].toString()) {
                                                                this.strValue = this.strValue + POU_Menus.RecordConSearch + "-";
                                                            }
                                                            else if (this.strModule == POU_Menus[POU_Menus.Pick].toString()) {
                                                                this.strValue = this.strValue + POU_Menus.Pick + "-";
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
                                                var lstSecurity = new MT_ATPAR_SECURITY_AUDIT();
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
                                            PARAMS[p].PARAMETER_VALUE === Shiping_Label_PrinterType.None.toString()) {

                                            this.strParamValue = "1";
                                            //this.strParamValue = Shiping_Label_PrinterType.None.toString();
                                        } else if (PARAMS[p].PARAMETER_VALUE === 'Print Header Label only to a Mobile Printer' ||
                                            PARAMS[p].PARAMETER_VALUE === Shiping_Label_PrinterType.HeaderLbl_MobilePrinter.toString()) {
                                            //this.strParamValue = Shiping_Label_PrinterType.HeaderLbl_MobilePrinter.toString();
                                            this.strParamValue = "2";
                                        } else if (PARAMS[p].PARAMETER_VALUE === 'Print Delivery Ticket only to a Stationary Printer' ||
                                            PARAMS[p].PARAMETER_VALUE === Shiping_Label_PrinterType.DeliveryTic_StationaryPrinter.toString()) {
                                            //  this.strParamValue = Shiping_Label_PrinterType.DeliveryTic_StationaryPrinter.toString();
                                            this.strParamValue = "3";
                                        } else if (PARAMS[p].PARAMETER_VALUE === 'Print Header Label to a Mobile Printer and Delivery Ticket to a Stationary Printer' ||
                                            PARAMS[p].PARAMETER_VALUE === Shiping_Label_PrinterType.Both_MobilePrinter_StationaryPrinter.toString()) {
                                            //this.strParamValue = Shiping_Label_PrinterType.Both_MobilePrinter_StationaryPrinter.toString();
                                            this.strParamValue = "4";
                                        } else {
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
                                                var lstSecurity = new MT_ATPAR_SECURITY_AUDIT();
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
                                            var lstSecurity = new MT_ATPAR_SECURITY_AUDIT();
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
                                            var lstSecurity = new MT_ATPAR_SECURITY_AUDIT();
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


                //  if (PROFILE[i].FLAG == true) {
                //if (this.lstmenuCheckedparams != null || this.lstmenuCheckedparams.length != 0) {
                //    for (let m1 = 0; m1 <= this.lstmenuCheckedparams.length - 1; m1++) {
                //        if (this.lstmenuCheckedparams[m1].APP_ID == this.profileAppId) {
                //            MENUS[m1].FLAG = this.lstmenuCheckedparams[m1].CHKSTATUS == "Y" ? true : false;
                //            MENUS[m1].CHKSTATUS = this.lstmenuCheckedparams[m1].FLAG == true ? "Y" : "N";
                //        }
                //        else {
                //            MENUS[m1].FLAG = true;
                //            MENUS[m1].CHKSTATUS = "Y";
                //        }
                //    }
                //}
                var data123 = this.lstmenuCheckedparams;
                if (MENUS.length > 0) {
                    for (let m = 0; m <= MENUS.length - 1; m++) {
                        if (this.buttonId == "create") {
                            var count1 = this.lstmenuCheckedparams.filter(x => x.APP_ID == this.profileAppId).length;
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
                                    else
                                        if (MENUS[m].APP_ID == this.profileAppId) {
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
                                    else
                                        if (MENUS[m].APP_ID == this.profileAppId && count1 == 0) {
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
                        var lstSecurity = new MT_ATPAR_SECURITY_AUDIT();
                        lstSecurity.KEY_1 = this.paramProfileId;
                        lstSecurity.KEY_2 = this.profileAppId.toString();
                        lstSecurity.FIELD_NAME = "SERVER_USER";
                        lstSecurity.OLD_VALUE = this.chrServer;
                        lstSecurity.NEW_VALUE = PROFILE[i].FLAG == true ? "Y" : "N";
                        this.lstauditallowed.push(lstSecurity);
                    }
                    if (this.chrClient != (PROFILE[i].ClientFLAG == true ? "Y" : "N")) {
                        var lstSecurity = new MT_ATPAR_SECURITY_AUDIT();
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
                for (let m = 0; m < this.lstmenuCheckedparams.length; m++) {
                    if (MENUS[m].CHK_STATUS != (this.lstmenuCheckedparams[m].FLAG == true ? "Y" : "N")) {
                        var lstSecurity = new MT_ATPAR_SECURITY_AUDIT();
                        lstSecurity.KEY_1 = this.paramProfileId;
                        lstSecurity.KEY_2 = this.profileAppId.toString();
                        lstSecurity.KEY_3 = this.lstmenuCheckedparams[m].MENU_CODE;
                        lstSecurity.FIELD_NAME = "MENU_CODE";
                        lstSecurity.OLD_VALUE = this.lstmenuCheckedparams[m].CHK_STATUS;
                        lstSecurity.NEW_VALUE = MENUS[m].FLAG == true ? "Y" : "N";
                        this.lstauditallowed.push(lstSecurity);
                    }
                    if (MENUS[m].MENU_SEQ_NO != this.lstmenuCheckedparams[m].MENU_SEQ_NO) {
                        var lstSecurity = new MT_ATPAR_SECURITY_AUDIT();
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
            var sectitylst = this.lstauditallowed;

            var dicProfileInfo = { 'PROFILE': this.CreateProfile, 'PARAMS': this.CreateParam, 'MENUS': this.CreateMenu, 'SCREENDISPLAY': this.CreateDisplay };

            if (this.buttonId == "create") {
                this.spinnerService.start();
                try {
                    this.spinnerService.start();
                    await this.httpservice.create({
                        "apiMethod": "/api/ManageProfiles/AddProfileInfo",
                        formData: dicProfileInfo,
                        params: {
                            "profileID": this.paramProfileId,
                            "pstrAlterProfileCtoS": false,
                            "userID": this.deviceTokenEntry[TokenEntry_Enum.UserID],
                            "profileDescr": this.paraDescription.trim(),
                            //dsProfile: dict,
                            "clientAddr": "test",
                            "appID": this.appId
                            //"deviceTokenEntry": this._deviceTokenEntry
                        }
                    }).catch(this.httpservice.handleError).map((res: Response) => res.json() as AtParWebApiResponse<MT_ATPAR_APP>).subscribe(
                        (response) => {
                            switch (response.StatType) {
                                case StatusType.Success:
                                    {
                                        this.orgProfileDataList = this.BindGrid;
                                        if (this.orgProfileData != null) {
                                            for (var i = 0; i < this.BindGrid.length; i++) {
                                                this.BindGrid[i].displayscreen = false;
                                                this.BindGrid[i].displayparam = false;
                                                this.BindGrid[i].displaymenu = false;
                                            }
                                        }
                                        this.spinnerService.stop();
                                        PROFILE = [];
                                        this.CreateProfile = [];
                                        this.CreateParam = [];
                                        this.CreateMenu = [];
                                        this.CreateDisplay = [];
                                        PARAMS = [];
                                        MENUS = [];
                                        SCREENDISPLAY = [];
                                        this.dropdownData = [];
                                        this.BindDropDown();
                                        this.spinnerService.stop();
                                        this.growlMessage = [];
                                        // response.StatusMessage = AtParConstants.Created_Msg.replace("1%", "Profile").replace("2%", this.paramProfileId);
                                        response.StatusMessage = "Profile " + this.paramProfileId + " Created Successfully";
                                        this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: response.StatusMessage });
                                        this.content = false;

                                        break;
                                    }
                                case StatusType.Error:
                                    {
                                        this.spinnerService.stop();
                                        this.growlMessage = [];
                                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                        break;
                                    }
                                case StatusType.Warn:
                                    {
                                        this.spinnerService.stop();
                                        this.growlMessage = [];
                                        var msg = this.toTitleCase(response.StatusMessage);
                                        //var messgedesc = "Profile " + msg + " Already Exists";
                                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: msg });
                                        break;
                                    }
                                case StatusType.Custom:
                                    {
                                        this.spinnerService.stop();
                                        this.growlMessage = [];
                                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                        break;
                                    }
                            }
                        });
                    this.dropdowndisplayData = [];
                    this.BindDropDown();
                    this.temp = [];
                    this.content = false;
                }
                catch (exception) {
                    this.growlMessage = [];
                    this.errormessage = "General Client Error";
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: this.errormessage });
                }
            }
            else {
                try {
                    if (this.paramProfileId == "") {
                        this.errormessage = "Please enter Profile ID and Profile Description";
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                    }
                    else {
                        this.spinnerService.start();
                        await this.httpservice.update({
                            "apiMethod": "/api/ManageProfiles/UpdateProfileInfo",
                            formData: dicProfileInfo,
                            params: {
                                "profileID": this.paramProfileId,
                                "pstrAlterProfileCtoS": this.stralertprofile,
                                "userID": this.deviceTokenEntry[TokenEntry_Enum.UserID],
                                "profileDescr": this.paraDescription.trim(),
                                "clientAddr": "test",
                                "appID": this.appId
                            }
                        }).catch(this.httpservice.handleError).map((res: Response) => res.json() as AtParWebApiResponse<MT_ATPAR_APP>).subscribe(
                            (response) => {
                                switch (response.StatType) {
                                    case StatusType.Success:
                                        {
                                            this.orgProfileDataList = this.BindGrid;
                                            this.InsertAuditData();
                                            if (this.orgProfileData != null) {
                                                for (var i = 0; i < this.BindGrid.length; i++) {
                                                    this.BindGrid[i].displayscreen = false;
                                                    this.BindGrid[i].displayparam = false;
                                                    this.BindGrid[i].displaymenu = false;
                                                }
                                            }
                                            PROFILE = [];
                                            this.CreateProfile = [];
                                            this.CreateParam = [];
                                            this.CreateMenu = [];
                                            this.CreateDisplay = [];
                                            this.BindDropDown();
                                            PARAMS = [];
                                            MENUS = [];
                                            SCREENDISPLAY = [];
                                            this.dropdowndisplayData = [];
                                            this.temp = [];
                                            this.spinnerService.stop();
                                            this.content = false;
                                            this.growlMessage = [];
                                            response.StatusMessage = AtParConstants.Updated_Msg.replace("1%", "Profile").replace("2%", this.paramProfileId);
                                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: response.StatusMessage });
                                            break;
                                        }
                                    case StatusType.Error:
                                        {
                                            this.spinnerService.stop();
                                            this.growlMessage = [];
                                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                            break;
                                        }
                                    case StatusType.Warn:
                                        {
                                            this.spinnerService.stop();
                                            this.growlMessage = [];
                                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                            break;
                                        }
                                    case StatusType.Custom:
                                        {
                                            this.spinnerService.stop();
                                            this.growlMessage = [];
                                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                            break;
                                        }
                                }
                            });
                    }
                }
                catch (exception) {
                    this.clientErrorMsg(exception, "save");
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "save");
        }
    }

    //Audit Insert Method
    InsertAuditData() {
        if (this.audistStatus = "Y") {
            this.spinnerService.start();
            this.httpservice.create({
                "apiMethod": "/api/Common/InsertAuditData",
                formData: this.lstauditallowed,
                params: {
                    "pStrUser": this.deviceTokenEntry[TokenEntry_Enum.UserID],
                    "pStrFunction": 'mt_atpar_manage_profiles.aspx'
                }
            }).catch(this.httpservice.handleError).map((res: Response) => res.json() as AtParWebApiResponse<MT_ATPAR_APP>).subscribe(
                (response) => {
                    switch (response.StatType) {
                        case StatusType.Success:
                            {
                                break;
                            }
                        case StatusType.Error:
                            {
                                this.spinnerService.stop();
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                break;
                            }
                    }
                });
        }
    }

    //Check All for Main Datatable for Web
    webchkAll() {
        try {
            this.gridRows = + sessionStorage.getItem("RowsOfGridSelected");
            this.startindex = + this.BindGrid.length;
            this.webchkallvalue = true;
            this.lstCheckedparams = [];
            for (let i = this.gridRows; i <= this.startindex - 1; i++) {
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
    }

    //Check None for Main Datatable for Web
    webchkNone() {
        try {
            this.gridRows = + sessionStorage.getItem("RowsOfGridSelected");
            this.startindex = + this.BindGrid.length;
            this.webchkallvalue = false;
            this.lstCheckedparams = [];
            for (let i = this.startindex - 1; i >= this.gridRows; i--) {
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

        } catch (ex) {
            this.clientErrorMsg(ex, "webchkNone");
        }
    }

    //Check All for Main Datatable for HHT
    hhtchkall() {
        try {
            this.gridRows = + sessionStorage.getItem("RowsOfGridSelected");
            this.startindex = + this.BindGrid.length;
            this.hhtchkallvalue = true;
            var list = this.BindGrid;
            this.lstCheckedparams = [];
            for (let i = this.gridRows; i <= this.startindex - 1; i++) {
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
    }

    //Check All for Main Datatable for HHT
    hhtchkNone() {
        try {
            this.gridRows = + sessionStorage.getItem("RowsOfGridSelected");
            this.startindex = + this.BindGrid.length;
            this.hhtchkallvalue = false
            this.lstCheckedparams = [];
            for (let i = this.startindex - 1; i >= this.gridRows; i--) {
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
    }

    //Check All for Menu Datatable
    menuchkAll() {
        this.gridRows = + sessionStorage.getItem("RowsOfGridSelected");
        this.startindex = +this.lstMenuItems.length;
        this.webchkallvalue = true;
        this.lstmenuCheckedparams = [];

        for (let i = 0; i <= this.lstMenuItems.length - 1; i++) {
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
    }

    //Check All for Menu Datatable
    menuchkNone() {
        this.gridRows = + sessionStorage.getItem("RowsOfGridSelected");
        this.startindex = +this.lstMenuItems.length;
        this.hhtchkallvalue = false
        this.lstmenuCheckedparams = [];
        for (let i = this.lstMenuItems.length - 1; i >= 0; i--) {
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
    }

    //Single check for Main Datatable for Web
    checkeddata(item1, event) {
        try {
            this.hhtchkvalue = false;
            this.webchkvalue = false;
            item1.FLAG = event.target.checked;
            var paramdata = this.BindGrid;
            this.appId = item1.APP_ID;

            //  this.lstCheckedparams.splice(item1.APP_ID);
            for (var i = 0; i < this.lstCheckedparams.length; i++) {
                if (this.lstCheckedparams[i].APP_ID === item1.APP_ID) {
                    var index = this.lstCheckedparams.indexOf(this.lstCheckedparams[i], 0)
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
    }


    //Single check for Main Datatable for HHT
    checkedhhtdata(item1, event) {
        try {
            this.hhtchkvalue = false;
            this.webchkvalue = false;
            item1.ClientFLAG = event.target.checked;
            // this.lsthhtCheckedparams = [];
            //this.lstCheckedparams = [];
            var lstdata = this.BindGrid[0];
            for (var i = 0; i < this.lstCheckedparams.length; i++) {
                if (this.lstCheckedparams[i].APP_ID === item1.APP_ID) {
                    var index = this.lstCheckedparams.indexOf(this.lstCheckedparams[i], 0)
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
    }

    //Single check for Menu Datatable
    checkedmenudata(chk, event) {
        // this.menuchkvalue = event.target.checked;
        try {
            this.menuchkvalue = chk.FLAG;
            if (this.buttonId != "create") {
                for (var i = 0; i < this.lstmenuCheckedparams.length; i++) {
                    if (this.lstmenuCheckedparams[i].MENU_NAME === chk.MENU_NAME) {
                        var index = this.lstmenuCheckedparams.indexOf(this.lstmenuCheckedparams[i], 0)
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
        } catch (ex) {
            this.clientErrorMsg(ex, "checkedmenudata");
        }
    }

    //Single check for Screen Display Datatable
    selectedRow(chk, event) {
        try {
            // this.displaychkvalue = event.target.checked;
            this.displaychkvalue = chk.FLAG;
            this.lblerrordisplaymsg = "";
            if (this.buttonId != "create") {
                for (var i = 0; i < this.lstdisplayCheckedparams.length; i++) {
                    if (this.lstdisplayCheckedparams[i].COLUMN_HEADER === chk.COLUMN_HEADER) {
                        var index = this.lstdisplayCheckedparams.indexOf(this.lstdisplayCheckedparams[i], 0)
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
    }

    //Conform Dailog for Web check or HHT check
    confirm() {




       
        this.webchk = false;
        this.hhtchk = false;
        this.growlMessage = [];
        let dataWebCheck = this.BindGrid;
        for (let d = 0; d < dataWebCheck.length; d++) {
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
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                return 0;
            }
            else if (this.paramProfileId === "" || this.paramProfileId === null || this.paramProfileId === undefined) {
                this.errormessage = "Please Enter Profile ID";
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                return 0;
            }
            else
                if (this.paraDescription === "" || this.paraDescription === null || this.paraDescription === undefined) {
                    this.errormessage = "Please Enter Profile Description";
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.errormessage });
                    return 0;
                }


            if (this.webchk == true) {
                if (this.paramEntitys.length == 0) {
                    this.confirmationService.confirm({
                        message: 'Parameters are not setup for the profile. Loaded with default values for the parameters.',
                        accept: () => {
                            this.save();
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
            else
                if (this.hhtchk == true) {
                    if (this.displayEntitys.length == 0 && this.paramEntitys.length == 0) {
                        this.confirmationService.confirm({
                            message: 'Parameters,ScreenDisplay are not setup for the profile. Loaded with default values for the parameters.',
                            accept: () => {
                                this.save();
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
                                accept: () => {
                                    this.stralertprofile = true;
                                    this.save();
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
    }

    onKey(event) {
        if (event.target.value == null || event.target.value == "") {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: " Please enter Order. " });
            return;
        }
        else {
            this.growlMessage = [];
            return;
        }
    }

    toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    }

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }
}