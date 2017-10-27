import { Component } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { Http, Response } from "@angular/http";
import { HttpService } from '../Shared/HttpService';
import { ModeEnum, EnumApps } from '../Shared/AtParEnums';
import { TokenEntry_Enum, ClientType } from '../Shared/AtParEnums';
import { MT_ATPAR_APP } from '../../app/Entities/MT_ATPAR_APP';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { SelectItem } from './../components/common/api';
import { StatusType } from './../Shared/AtParEnums';
import { Message } from './../components/common/api';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { AtParConstants } from '../Shared/AtParConstants';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { AtParAuditSetupService } from './atpar-audit-setup.service';
import { MT_ATPAR_MENUS } from '../../app/Entities/MT_ATPAR_MENUS';
import { MT_ATPAR_SECURITY_AUDIT } from '../../app/Entities/MT_ATPAR_SECURITY_AUDIT';
declare var module: {
    id: string;
}
@Component({
    templateUrl: 'atpar-audit-setup.component.html',
    providers: [datatableservice, HttpService, AtParCommonService, AtParAuditSetupService, AtParConstants]
})

export class AuditSetupComponent {
    deviceTokenEntry: string[] = [];
    growlMessage: Message[] = [];
    appsData: MT_ATPAR_APP[];
    lstApps: SelectItem[];
    selectedApp: string;
    lstDBData: MT_ATPAR_MENUS[];
    lstgridfilterData: MT_ATPAR_MENUS[];

    ////for appsDropdown
    blnShowAppsLabel: boolean = false;
    blnShowAppsDD: boolean = false;
    dataCheckedSorting: MT_ATPAR_MENUS[] = [];
    dataUncheckedSorting: Array<MT_ATPAR_MENUS>;
    sortedcheckedrec: MT_ATPAR_MENUS[];
    sorteduncheckedrec: MT_ATPAR_MENUS[];
    lstCheckedBUnits: Array<MT_ATPAR_MENUS>;
    isVisible: boolean = false;
    pazeSize: number;
    startIndex: number;
    EndIndex: number;
    blnsortbycolumn: boolean = true;
    custom: string = "custom";
    preField: string = "";
    appidvalue: number;
    isAuditRequired: string = "";
    strAudit: string = "";
    strPrevGroup: string = "";
    constructor(public atParCommonService: AtParCommonService, private atParConstant: AtParConstants,
        private httpService: HttpService, private spinnerService: SpinnerService, private atParAuditSetupService: AtParAuditSetupService) {

    }

    ngOnInit(): void {
        this.startIndex = + sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.pazeSize = +this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        this.lstCheckedBUnits = new Array<MT_ATPAR_MENUS>();
        this.dataCheckedSorting = new Array<MT_ATPAR_MENUS>();
        this.dataUncheckedSorting = new Array<MT_ATPAR_MENUS>();
        this.lstgridfilterData = new Array<MT_ATPAR_MENUS>();
        this.getApps();
    }
    go() {
        try {
            this.getAppMenus();

        } catch (ex) {
            this.clientErrorMsg(ex, "go");
        }
    }

    ddlChnage() {
        this.isVisible = false;
    }

    async getApps() {
        this.growlMessage = [];
        this.spinnerService.start();
        try {
            await this.atParCommonService.getApps(this.deviceTokenEntry[TokenEntry_Enum.UserID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_APP>;
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.appsData = data.DataList;
                            if (this.appsData.length == 1) {
                            }
                            else if (this.appsData.length > 1) {
                                this.blnShowAppsDD = true;
                                this.lstApps = [];
                                this.lstApps.push({ label: "Select One", value: "Select One" })
                                for (var i = 0; i < this.appsData.length; i++) {
                                    if (this.appsData[i].APP_ID != EnumApps.Reports) {
                                        this.lstApps.push({ label: this.appsData[i].APP_NAME, value: this.appsData[i].APP_ID })
                                    }
                                }
                            }
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }

                });

        }
        catch (ex) {
            this.clientErrorMsg(ex, "getApps");
        }
   }

    async  getAppMenus() {
        this.isVisible = false;
        this.growlMessage = [];
        this.spinnerService.start();
        try {
            if (this.selectedApp == null || this.selectedApp == undefined || this.selectedApp == "Select One") {
                this.appidvalue = -1
                this.selectedApp = this.appidvalue.toString()
            }
            await this.atParAuditSetupService.getAppMenus(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.selectedApp)
                .forEach((response) => {
                    switch (response.StatType) {
                        case StatusType.Success: {
                            this.lstDBData = [];
                            this.lstDBData = response.DataList;

                            for (let i = 0; i <= response.DataList.length - 1; i++) {
                                if (response.DataList[i].UPDATE_DELETE == "True") {
                                    response.DataList[i].checkvalue = true;
                                }
                                else {
                                    response.DataList[i].checkvalue = false;
                                }
                            }
                            this.lstDBData = response.DataList;
                            this.BindDataGrid();

                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                            this.isVisible = false;
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            this.isVisible = false;
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            this.isVisible = false;
                            break;
                        }
                    }

                });
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getAppMenus");
        }
    }

    async BindDataGrid() {
        try {
            this.dataCheckedSorting = [];
            this.dataUncheckedSorting = [];
            for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                if (this.lstDBData[i].UPDATE_DELETE == "True") {
                    this.dataCheckedSorting.push(this.lstDBData[i]);
                    this.lstDBData[i].AUDIT = "Y";
                }
                else {
                    this.dataUncheckedSorting.push(this.lstDBData[i]);
                    this.lstDBData[i].AUDIT = "N";
                }
            }
            this.isVisible = true;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindDataGrid");
        }
    }

    filterdata(event) {
        this.lstgridfilterData = [];
        this.lstgridfilterData = new Array<MT_ATPAR_MENUS>();
        this.lstgridfilterData = event;
    }

    checkAll() {
        try {
            this.lstCheckedBUnits = [];
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined && this.lstgridfilterData.length > 0) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstgridfilterData[i].checkvalue = true;
                    this.lstgridfilterData[i].AUDIT = "Y";
                    this.lstgridfilterData[i].UPDATE_DELETE = "True";
                    this.lstCheckedBUnits.push(this.lstgridfilterData[i]);
                }

            } else {
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }

                for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstDBData[i].checkvalue = true;
                    this.lstDBData[i].AUDIT = "Y";
                    this.lstDBData[i].UPDATE_DELETE = "True";
                    this.lstCheckedBUnits.push(this.lstDBData[i]);
                }
            }

        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkAll");
        }
    }

    unCheckAll() {
        try {
            this.lstCheckedBUnits = [];
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined && this.lstgridfilterData.length > 0) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstgridfilterData[i].checkvalue = false;
                    this.lstgridfilterData[i].AUDIT = "N";
                    this.lstgridfilterData[i].UPDATE_DELETE = "False";
                    this.lstCheckedBUnits.push(this.lstgridfilterData[i]);
                }

            } else {
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }

                for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstDBData[i].checkvalue = false;
                    this.lstDBData[i].AUDIT = "N";
                    this.lstDBData[i].UPDATE_DELETE = "False";
                    this.lstCheckedBUnits.push(this.lstDBData[i]);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "unCheckAll");
        }
    }

    selectedRow(values: any, event) {
        try {
            if (event == true) {
                values.AUDIT = "Y";
                values.UPDATE_DELETE = "True";
            }
            else {
                values.AUDIT = "N";
                values.UPDATE_DELETE = "False";
            }
            for (var i = 0; i < this.lstCheckedBUnits.length; i++) {
                if (this.lstCheckedBUnits[i].MENU_ID === values.MENU_ID) {
                    var index = this.lstCheckedBUnits.indexOf(this.lstCheckedBUnits[i], 0)
                    this.lstCheckedBUnits.splice(index, 1);
                }
            }
            this.lstCheckedBUnits.push(values);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "selectedRow");
        }
    }

    customSort(event, field) {
        var element = event;
        if (this.preField == element.field) {
            if (element.order == 1) {
                element.order = -1;
            } else {
                element.order = 1;
            }
            // element.order = !element.order;

        } else {
            element.order = 1;
        }
        this.preField = element.field;
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
        let result = null;
        let order: boolean;

        try {
            this.sortedcheckedrec = this.dataCheckedSorting.sort(function (a, b) {
                if (a[element.field] == null && b[element.field] != null)
                    result = -1;
                else if (a[element.field] != null && b[element.field] == null)
                    result = 1;
                else if (a[element.field] == null && b[element.field] == null)
                    result = 0;
                else if (typeof a[element.field] === 'string' && typeof b[element.field] === 'string')
                    result = a[element.field].localeCompare(b[element.field]);
                else
                    result = (a[element.field] < b[element.field]) ? -1 : (a[element.field] > b[element.field]) ? 1 : 0;

                return (element.order * result);
            });

            this.sorteduncheckedrec = this.dataUncheckedSorting.sort(function (a, b) {
                if (a[element.field] == null && b[element.field] != null)
                    result = -1;
                else if (a[element.field] != null && b[element.field] == null)
                    result = 1;
                else if (a[element.field] == null && b[element.field] == null)
                    result = 0;
                else if (typeof a[element.field] === 'string' && typeof b[element.field] === 'string')
                    result = a[element.field].localeCompare(b[element.field]);
                else
                    result = (a[element.field] < b[element.field]) ? -1 : (a[element.field] > b[element.field]) ? 1 : 0;

                return (element.order * result);
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "customSort");
        }

        this.lstDBData = [];
        this.lstDBData = this.sortedcheckedrec.concat(this.sorteduncheckedrec);
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
    }

    //customSort1(event) {
    //    try {
    //        var element = event;
    //        this.blnsortbycolumn = !this.blnsortbycolumn;
    //        this.sortedcheckedrec = [];
    //        this.sorteduncheckedrec = [];
    //        this.sortedcheckedrec = this.dataCheckedSorting.sort(function (a, b) {
    //            if (a[element.field] < b[element.field])
    //                return -1;
    //            if (a[element.field] > b[element.field])
    //                return 1;
    //            return 0;
    //        });
    //        this.sorteduncheckedrec = this.dataUncheckedSorting.sort(function (a, b) {

    //            if (a[element.field] < b[element.field])
    //                return -1;
    //            if (a[element.field] > b[element.field])
    //                return 1;
    //            return 0;


    //        });
    //        if (this.blnsortbycolumn == false) {
    //            this.lstDBData = [];
    //            this.lstDBData = this.sortedcheckedrec.reverse().concat(this.sorteduncheckedrec.reverse());
    //        }
    //        else {
    //            this.lstDBData = [];

    //            this.lstDBData = this.sortedcheckedrec.concat(this.sorteduncheckedrec);
    //        }
    //        this.sortedcheckedrec = [];
    //        this.sorteduncheckedrec = [];
    //    }
    //    catch (ex) {
    //        this.clientErrorMsg(ex, "customSort");
    //    }
    //}

    async save() {
        this.growlMessage = [];
        this.spinnerService.start();
        try {
            await this.atParAuditSetupService.saveAuditSetUpInfo(this.lstDBData, this.deviceTokenEntry[TokenEntry_Enum.UserID])
                .subscribe((response) => {
                    this.growlMessage = [];
                    switch (response.StatType) {
                        case StatusType.Success: {
                            this.checkAuditAllowed();
                            this.blnShowAppsDD = true;
                            this.selectedApp = undefined;
                            this.isVisible = false;
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                    }


                });





        }
        catch (ex) {
            this.clientErrorMsg(ex, "save");
        }
    }

    async checkAuditAllowed() {
        try {
            let strAudit: string = "";
            var appid = 0;
            await this.atParCommonService.getAuditAllowed(appid, "mt_atpar_audit_setup.aspx").
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json();
                    this.growlMessage = [];

                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.isAuditRequired = data.Data;
                            strAudit = this.isAuditRequired;

                            if (this.isAuditRequired == "Y") {

                                this.insertAuditData();
                            }
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Audit setup Updated Successfully' });

                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });

                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });

                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });

                            break;
                        }
                    }

                });

        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkAuditAllowed");
        }
    }
    async insertAuditData() {
        this.growlMessage = [];
        try {
            let auditSecurity: MT_ATPAR_SECURITY_AUDIT;
            let auditSecurityLst: Array<MT_ATPAR_SECURITY_AUDIT>;
            auditSecurityLst = new Array<MT_ATPAR_SECURITY_AUDIT>();
            for (let intCnount = 0; intCnount <= this.lstCheckedBUnits.length - 1; intCnount++) {
                if (this.lstCheckedBUnits[intCnount].AUDIT.toString() == "Y") {
                    auditSecurity = new MT_ATPAR_SECURITY_AUDIT();
                    auditSecurity.FIELD_NAME = "UPDATE_DELETE";
                    auditSecurity.OLD_VALUE = "N";
                    auditSecurity.NEW_VALUE = "Y";
                    auditSecurity.KEY_1 = this.lstCheckedBUnits[intCnount].APP_ID.toString();
                    auditSecurity.KEY_2 = this.lstCheckedBUnits[intCnount].MENU_NAME.toString();
                    auditSecurity.KEY_3 = "";
                    auditSecurity.KEY_4 = "";
                    auditSecurity.KEY_5 = "";
                    auditSecurityLst.push(auditSecurity);
                }
                else {
                    auditSecurity = new MT_ATPAR_SECURITY_AUDIT();
                    auditSecurity.FIELD_NAME = "UPDATE_DELETE";
                    auditSecurity.OLD_VALUE = "Y";
                    auditSecurity.NEW_VALUE = "N";
                    auditSecurity.KEY_1 = this.lstCheckedBUnits[intCnount].APP_ID.toString();
                    auditSecurity.KEY_2 = this.lstCheckedBUnits[intCnount].MENU_NAME.toString();
                    auditSecurity.KEY_3 = "";
                    auditSecurity.KEY_4 = "";
                    auditSecurity.KEY_5 = "";
                    auditSecurityLst.push(auditSecurity);
                }
            }

            let strFunctionName = "Audit Setup";
            await this.atParCommonService.insertAuditData(auditSecurityLst, this.deviceTokenEntry[TokenEntry_Enum.UserID], strFunctionName).
                catch(this.httpService.handleError).then((res: Response) => {
                    let response = res.json() as AtParWebApiResponse<MT_ATPAR_SECURITY_AUDIT>;
                    this.spinnerService.stop();
                    switch (response.StatType) {
                        case StatusType.Success: {
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            break;
                        }
                    }
                });


        }
        catch (ex) {
            this.clientErrorMsg(ex, "insertAuditData");
        }
    }

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    ngOnDestroy() {
        this.lstCheckedBUnits = null;
        this.lstDBData = null;
        this.growlMessage = null;
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
    }


}