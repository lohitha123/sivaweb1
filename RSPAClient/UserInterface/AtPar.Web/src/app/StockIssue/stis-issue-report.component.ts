import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, ViewChild, Input } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { HttpService } from '../Shared/HttpService';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { TokenEntry_Enum, ClientType, ModeEnum, BusinessType } from '../Shared/AtParEnums';
import { SelectItem, Message } from '../components/common/api';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { StatusType, EnumApps, MailPriority } from '../Shared/AtParEnums';
import { AtParConstants } from '../Shared/AtParConstants';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { ConfirmationService, Confirmation } from '../components/common/api';
import { DataTable } from '../components/datatable/datatable';
import { Menus } from '../AtPar/Menus/routepath';
import { Http, Response } from "@angular/http";
import { SSL_CONFIG_DETAILS } from '../Entities/SSL_CONFIG_DETAILS';
import { IssueReportService } from './stis-issue-report.service';
import { VM_ISSUEREPORT } from '../entities/vm_issuereport';
import { saveAs } from 'file-saver';



declare var module: {
    id: string;
}

@Component({
    templateUrl: 'stis-issue-report.component.html',
    providers: [AtParCommonService, AtParConstants, IssueReportService],
})

export class IssueReportComponent {
    @Input() appId: string;
    intAppId: number;
    @ViewChild(DataTable) dataTableComponent: DataTable;
    pageSize: number;
    deviceTokenEntry: any;
    growlMessage: Message[] = [];
    breadCrumbMenu: Menus;


    defDuration: number = 0;
    statusCode: number = -1;
    toMailAddr: string;
    ipAddress: string;
    gstrProtocal: string;
    gstrServerName: string;
    gstrPortNo: string;
    showGrid: boolean = false;
    isMailDialog: boolean = false;


    fromDate: Date;
    toDate: Date = new Date();
    strFromDate: string;
    strToDate: string;
    strUserID: string;
    orgGroupId: string;
    userID: string;
    itemID: string;
    itemDesc: string;
    patientID: string;
    deptID: string;
    issueUser: string;
    issueLocation: string;
    businessUnit: string;
    showOrgDropdown: boolean;
    selectedOrgGroupID: string;

    lstOrgGroupIds: SelectItem[] = [];
    lstStatus: SelectItem[] = [];
    lstBusinessUnits: SelectItem[] = [];
    lstUsers: SelectItem[] = [];
    lstIssueReport: VM_ISSUEREPORT[] = [];
    status: string;


    constructor(private spinnerService: SpinnerService,
        private atParCommonService: AtParCommonService,
        private httpService: HttpService,
        private atParConstant: AtParConstants,
        private issueReportService: IssueReportService
    ) {
        this.breadCrumbMenu = new Menus();
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));

    }

    async ngOnInit() {

        this.pageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];

        this.lstStatus.push({ label: 'ALL', value: 'ALL' }, { label: 'Issued', value: '6' }, { label: 'Cancelled', value: '13' }, { label: 'Returned', value: '16' });

        this.status = 'ALL';

        this.lstBusinessUnits.push({ label: 'ALL', value: 'ALL' });

        this.businessUnit = 'ALL';

        this.lstUsers.push({ label: 'ALL', value: 'ALL' });

        this.userID = 'ALL';

        this.spinnerService.start();

        await this.getMyPreferences();

        await this.bindOrgGroups();

        if (!this.showOrgDropdown) {
            await this.getOrgGroupAllocInvBUnits();
            await this.getHeirarchyUsersList();
        }

        this.spinnerService.stop();
    }

    async getMyPreferences() {
        try {
            await this.atParCommonService.getMyPreferences('DEFAULT_REPORT_DURATION', this.deviceTokenEntry).then((result: Response) => {
                this.spinnerService.stop();
                let res = result.json() as AtParWebApiResponse<any>;
                this.growlMessage = [];
                switch (res.StatType) {
                    case StatusType.Success: {
                        this.defDuration = parseInt(res.DataVariable.toString());
                        this.fromDate = new Date();
                        var d = this.fromDate.getDate() - this.defDuration;

                        this.fromDate.setDate(d);
                        break;
                    }
                    case StatusType.Warn: {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                        break;
                    }
                    case StatusType.Error: {
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                        break;
                    }
                }

            })
        } catch (ex) {
            this.clientErrorMsg(ex, 'getMyPreferences');
        }
    }

    async bindOrgGroups() {
        try {
            await this.atParCommonService.getUserOrgGroups(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID])
                .catch(this.httpService.handleError).then((result: Response) => {
                    let res = result.json() as AtParWebApiResponse<any>;
                    this.growlMessage = [];
                    this.lstOrgGroupIds = [];
                    switch (res.StatType) {
                        case StatusType.Success: {
                            if (res.DataList.length == 1) {
                                this.showOrgDropdown = false;
                                this.orgGroupId = res.DataList[0].ORG_GROUP_ID + ' - ' + res.DataList[0].ORG_GROUP_NAME;
                                this.selectedOrgGroupID = res.DataList[0].ORG_GROUP_ID;
                            } else {
                                this.showOrgDropdown = true;
                                this.lstOrgGroupIds.push({ label: 'Select One', value: 'Select One' });
                                this.selectedOrgGroupID = 'Select One';
                                for (var i = 0; i < res.DataList.length; i++) {
                                    if (res.DataList[i].ORG_GROUP_ID.toUpperCase() != 'ALL') {
                                        this.lstOrgGroupIds.push({ label: (res.DataList[i].ORG_GROUP_ID + ' - ' + res.DataList[i].ORG_GROUP_NAME), value: res.DataList[i].ORG_GROUP_ID })
                                    }
                                }
                            }

                            break;
                        }
                        case StatusType.Warn: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindOrgGroups");
        }
    }

    async getOrgGroupAllocInvBUnits() {

        try {
            await this.issueReportService.getOrgGroupAllocInvBUnits(EnumApps.StockIssue, this.deviceTokenEntry[TokenEntry_Enum.UserID], this.selectedOrgGroupID).then((result: Response) => {
                let res = result.json() as AtParWebApiResponse<any>;
                this.growlMessage = [];
                this.lstBusinessUnits = [];
                this.businessUnit = '';
                switch (res.StatType) {
                    case StatusType.Success: {
                        this.lstBusinessUnits.push({ label: 'ALL', value: 'ALL' });
                        this.businessUnit = 'ALL';
                        for (var i = 0; i < res.DataList.length; i++) {
                            this.lstBusinessUnits.push({ label: res.DataList[i], value: res.DataList[i] })
                        }

                        break;
                    }
                    case StatusType.Warn: {
                        this.spinnerService.stop();
                        if (!this.showOrgDropdown) {
                            this.lstBusinessUnits.push({ label: 'ALL', value: 'ALL' });
                            this.businessUnit = 'ALL';
                        }
                        else {                           
                            this.lstBusinessUnits.push({ label: 'Select One', value: '' });
                            this.businessUnit = '';
                            if (res.StatusCode == AtparStatusCodes.E_NORECORDFOUND) {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Assigned Org Business Units' });
                            } else {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                            }
                        }
                      

                        break;
                    }
                    case StatusType.Error: {
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                        break;
                    }
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getOrgGroupAllocInvBUnits");
        }
    }

    async getHeirarchyUsersList() {
        try {
            await this.atParCommonService.getHeirarchyUsersList(EnumApps.StockIssue, this.deviceTokenEntry[TokenEntry_Enum.UserID], this.selectedOrgGroupID).then((result: Response) => {
                let res = result.json() as AtParWebApiResponse<any>;

                this.lstUsers = [];
                this.lstUsers.push({ label: 'ALL', value: 'ALL' });
                this.userID = 'ALL';
                switch (res.StatType) {
                    case StatusType.Success: {
                        for (var i = 0; i < res.DataDictionary["pDSUserList"].Table1.length; i++) {
                            this.lstUsers.push({ label: res.DataDictionary["pDSUserList"].Table1[i].FULLNAME, value: res.DataDictionary["pDSUserList"].Table1[i].USER_ID })
                        }
                        break;
                    }
                    case StatusType.Warn: {
                        this.spinnerService.stop();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                        break;
                    }
                    case StatusType.Error: {
                        this.spinnerService.stop();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.spinnerService.stop();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                        break;
                    }
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getHeirarchyUsersList");
        }
    }

    async ddlOrgGroup_SelectedIndexChanged() {
        this.selectedOrgGroupID = this.orgGroupId;
        if (this.orgGroupId != 'Select One') {
            await this.getOrgGroupAllocInvBUnits();
            await this.getHeirarchyUsersList();
        } else {
            this.lstBusinessUnits = [];
            this.lstBusinessUnits.push({ label: 'ALL', value: 'ALL' });
            this.businessUnit = 'ALL';
        }
    }

    async btnGo_Click() {
        try {
            this.growlMessage = [];
            this.showGrid = false;
            var todayDate = new Date();

            if (this.selectedOrgGroupID == 'Select One' || this.selectedOrgGroupID == undefined || this.selectedOrgGroupID == null) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select valid Org Group ID" });
            }
            //else if (this.toDate > todayDate) {
            //    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Todate must be less than or equal to current date" });
            //}
            else if (this.fromDate > this.toDate) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "FromDate must be less than Todate" });
            }
            else {
                //await this.getHeirarchyUsersList();

                var strUserID = '';
                if (this.userID == 'ALL') {
                    if (this.lstUsers.length > 0) {
                        for (var i = 0; i < this.lstUsers.length; i++) {
                            if (strUserID != '') {
                                strUserID = strUserID + ",'" + this.lstUsers[i].value + "'";
                            }
                            else {
                                strUserID = "('" + this.lstUsers[i].value + "'";
                            }
                        }
                        strUserID = strUserID + ")";
                    }
                    else {
                        strUserID = "(' " + "')";
                    }
                }
                else {
                    strUserID = "('" + this.userID + "')";
                }

                var strBU = '';
                if (this.businessUnit == 'ALL') {
                    if (this.lstBusinessUnits.length > 0) {
                        for (var i = 0; i < this.lstBusinessUnits.length; i++) {
                            if (strBU != '') {
                                strBU = strBU + ",'" + this.lstBusinessUnits[i].value + "'"
                            }
                            else {
                                strBU = "('" + this.lstBusinessUnits[i].value + "'"
                            }
                        }
                        strBU = strBU + ")"
                    }
                    else {
                        strBU = "(' " + "')"
                    }
                }
                else {
                    strBU = "('" + this.businessUnit + "')"
                }


                this.deptID = this.deptID == undefined ? '' : this.deptID;
                this.patientID = this.patientID == undefined ? '' : this.patientID;
                this.issueUser = this.issueUser == undefined ? '' : this.issueUser;
                this.itemID = this.itemID == undefined ? '' : this.itemID;
                this.itemDesc = this.itemDesc == undefined ? '' : this.itemDesc;
                this.issueLocation = this.issueLocation == undefined ? '' : this.issueLocation;
                //this.strFromDate = this.fromDate.toLocaleDateString();
                //this.strToDate = this.toDate.toLocaleDateString();
                this.strFromDate = this.getDateString(this.fromDate);
                this.strToDate = this.getDateString(this.toDate);
                this.strUserID = this.userID;
                this.spinnerService.start();
                await this.issueReportService.getIssueReport(strBU, strUserID, this.deptID, this.patientID, this.issueUser, this.itemID, this.itemDesc, '', this.strFromDate, this.strToDate, this.status, this.issueLocation, this.lstUsers).then((result: Response) => {
                    this.spinnerService.stop();
                    let res = result.json() as AtParWebApiResponse<any>;
                    this.growlMessage = [];
                    switch (res.StatType) {
                        case StatusType.Success: {
                            this.showGrid = true;
                            this.lstIssueReport = res.DataDictionary["pDSUserList"].Table1;
                            this.replaceDS();
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                            break;
                        }
                    }
                });
            }

        }
        catch (ex) {
            this.clientErrorMsg(ex, 'btnGo_Click');
        }
    }

    replaceDS() {
        for (var i = 0; i < this.lstIssueReport.length; i++) {
            if (this.lstIssueReport[i].STATUS == '13') {
                this.lstIssueReport[i].STATUS = 'Cancelled';
            }
            else if (this.lstIssueReport[i].STATUS == '16') {
                this.lstIssueReport[i].STATUS = 'Returned';
            }
            else {
                this.lstIssueReport[i].STATUS = 'Issued';
            }
            if (this.lstIssueReport[i].DEPT_ID == null || this.lstIssueReport[i].DEPT_ID == undefined) {
                this.lstIssueReport[i].DEPT_ID = '';
            }
            if (this.lstIssueReport[i].PATIENT_ID == null || this.lstIssueReport[i].PATIENT_ID == undefined) {
                this.lstIssueReport[i].PATIENT_ID = '';
            }
            if (this.lstIssueReport[i].ADJUST_TYPE == null || this.lstIssueReport[i].ADJUST_TYPE == undefined) {
                this.lstIssueReport[i].ADJUST_TYPE = '';
            }
            if (this.lstIssueReport[i].ISSUE_TO_USER == null || this.lstIssueReport[i].ISSUE_TO_USER == undefined) {
                this.lstIssueReport[i].ISSUE_TO_USER = '';
            }
            if (this.lstIssueReport[i].ISSUE_TO_LOCATION == null || this.lstIssueReport[i].ISSUE_TO_LOCATION == undefined) {
                this.lstIssueReport[i].ISSUE_TO_LOCATION = '';
            }
            this.lstIssueReport[i].ISSUEDATE_USER = this.lstIssueReport[i].ISSUE_DATE + '-' + this.lstIssueReport[i].USER_NAME;
            this.lstIssueReport[i].ITEMID_DESC = this.lstIssueReport[i].ITEM_ID + '-' + this.lstIssueReport[i].ITEM_DESC;
            this.lstIssueReport[i].QTY_UOM = this.lstIssueReport[i].QTY + '-' + this.lstIssueReport[i].UOM;
        }
    }

    async onExportToExcelClick(event) {
        try {
            event.stopImmediatePropagation();
            this.spinnerService.start();
            let html: string = await this.exportReportDetails('Excel');
            //if (html != '' && html != null) {
            //    var ua = window.navigator.userAgent;
            //    var msie = ua.indexOf("MSIE ");
            //    // If Internet Explorer
            //    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
            //        this.statusCode = -1;
            //        let folderName: string = '';
            //        await this.atParCommonService.exportToExcel(html, "StockIssueReport", "StockIssueReport")
            //            .then((res: Response) => {
            //                let data = res.json();
            //                this.statusCode = data.StatusCode;
            //                if (this.statusCode.toString() == AtparStatusCodes.ATPAR_OK.toString()) {
            //                    folderName = data.DataVariable.toString();
            //                    var filename = this.httpService.BaseUrl + '/Uploaded/' + folderName + '/StockIssueReport.xls';
            //                    var query = '?download';
            //                    window.open(filename + query);
            //                }
            //                else {
            //                    this.growlMessage = [];
            //                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Internal Server Error.' });
            //                }
            //            });

            //        await this.atParCommonService.deleteExcel(folderName, "StockIssueReport")
            //            .then((res: Response) => {
            //            });
            //    } else {

            //        var a = document.createElement('a');
            //        var data_type = 'data:application/vnd.ms-excel';
            //        html = html.replace(/ /g, '%20');
            //        a.href = data_type + ', ' + html;
            //        a.download = 'StockIssueReport.xls';
            //        a.click();
            //    }
            //}
            if (html != '' && html != null) {
                let blob = new Blob([html], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                });
                saveAs(blob, "StockIssueReport.xls");
            }
        } catch (ex) {
            this.clientErrorMsg(ex, 'onExportToExcelClick');
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async onPrintClick(event) {
        try {
            event.stopImmediatePropagation();
            this.spinnerService.start();
            var html = await this.exportReportDetails('Print');
            if (html != '' && html != null) {

                //var mywindow = window.open('', 'PRINT', 'height=600,width=600');
                var mywindow = window.open('', null, 'height=650,width=650,status=no,resizable=yes, scrollbars=yes, toolbar=no,location=center,menubar=no');
                if (mywindow != null && mywindow != undefined) {
                    mywindow.document.write('<html><head><title>' + 'Stock Issue Report' + '</title>');
                    mywindow.document.write('</head><body >');
                    mywindow.document.write(html);
                    mywindow.document.write('</body></html>');

                    mywindow.document.close(); // necessary for IE >= 10
                    mywindow.focus(); // necessary for IE >= 10*/

                    return true;
                } else {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please set allow pop-ups for this site in your browser' });
                }
            }
        } catch (ex) {
            this.clientErrorMsg(ex, 'onPrintClick');
            return false;
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async onSendMailIconClick(event) {
        try {
            this.growlMessage = [];
            this.isMailDialog = true;
            this.toMailAddr = '';
        } catch (ex) {
            this.clientErrorMsg(ex, 'onSendMailIconClick');
        }
    }

    async onSendMailClick(event) {
        try {
            this.growlMessage = [];
            if (this.toMailAddr == '' || this.toMailAddr == undefined) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Email Address to Send' });
                return;
            }
            var val = this.validateEmail(this.toMailAddr);
            if (!val) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Valid Email Address to Send' });
                return;
            }
            this.spinnerService.start();
            let html: string = await this.exportReportDetails('Mail');
            let toAddr: string = '';

            this.isMailDialog = false;

            if (html != '' && html != null) {
                await this.atParCommonService.sendEmail(this.deviceTokenEntry[TokenEntry_Enum.SystemId], 'Stock Issue Report', JSON.stringify(html), this.toMailAddr, MailPriority.Normal.toString(), '')
                    .then((res: Response) => {
                        let data = res.json() as AtParWebApiResponse<number>;
                        this.statusCode = data.StatusCode;
                    });

                if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
                    this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Mail has been sent' });
                }
                else if (this.statusCode == AtparStatusCodes.EMAIL_ENTER_FROM_ADDRESS) {
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'From Address is Missing! Please Contact Administrator' });
                }
                else if (this.statusCode == AtparStatusCodes.EMAIL_ENTER_TO_ADDRESS) {
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Please Enter valid Email Address to Send' });
                }
                else if (this.statusCode == AtparStatusCodes.EMAIL_ENTER_SUBJECT) {
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Subject is Missing! Please Contact Administrator' });
                }
                else if (this.statusCode == AtparStatusCodes.EMAIL_ENTER_BODY) {
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Body is Missing! Please contact Administrator' });
                }
                else if (this.statusCode == AtparStatusCodes.EMAIL_SMTP_SERVER_MISSING) {
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Email Server is Not Configured! Please Contact Administrator' });
                }
                else if (this.statusCode == AtparStatusCodes.EMAIL_SEND_FAILED) {
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Mail Not Sent. Please Try Again' });
                }
                else {
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Error while sending mail' });
                }
            }
            this.toMailAddr = '';

        } catch (ex) {
            this.clientErrorMsg(ex, 'onSendMailClick');
        }
        finally {

            this.spinnerService.stop();
        }
    }

    async exportReportDetails(reqType: string) {
        let htmlBuilder: string = '';
        try {
            this.statusCode = -1;
            this.growlMessage = [];
            let sbMailText: string;
            let _strFrmDt: string;
            let _strToDt: string;


            let imgserverPath: string = '';

            await this.atParCommonService.getServerIP()
                .catch(this.httpService.handleError)
                .then((res: Response) => {
                    var data = res.json() as AtParWebApiResponse<string>;
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.ipAddress = data.DataVariable.toString();
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                    if (data.StatType != StatusType.Success) {
                        htmlBuilder = '';
                        return htmlBuilder;
                    }
                });


            await this.atParCommonService.getSSLConfigDetails()
                .catch(this.httpService.handleError)
                .then((res: Response) => {
                    this.growlMessage = [];
                    var data = res.json() as AtParWebApiResponse<SSL_CONFIG_DETAILS>;
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.gstrProtocal = data.Data.PROTOCOL.toString();
                            this.gstrServerName = data.Data.SERVER_NAME.toString();
                            this.gstrPortNo = data.Data.PORT_NO.toString();
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                    if (data.StatType != StatusType.Success) {
                        htmlBuilder = '';
                        return htmlBuilder;
                    }

                });



            //imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
            imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/AtParWebApi/assets/images/';




            htmlBuilder = "<Table align=center width=100% cellpadding=0 cellspacing = 0 vAlign=top>"

            if (reqType == "Print") {
                htmlBuilder += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=75% height=63></td></TR>"
                htmlBuilder += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                    "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                htmlBuilder += "<tr><td colspan=10 align=left><span class=c2>Issue Report for <b>" + this.userID + "</b> between <b>" + this.strFromDate + "</b> and <b>" + this.strToDate + "</b></span></td><td align=right valign=top>&nbsp;"

                htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "" + "><img src=" + imgserverPath + "print.jpg></A>"
            } else {
                htmlBuilder += "<TR width='100%'><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg></td></TR>"
                htmlBuilder += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                    "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                htmlBuilder += "<tr><td colspan=10 align=left><span class=c2>Issue Report for <b>" + this.strUserID + "</b> between <b>" + this.strFromDate + "</b> and <b>" + this.strToDate + "</b></span></td><td align=right valign=top>&nbsp;"

            }

            htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr> "
            htmlBuilder += "<table align=center width=90% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
            htmlBuilder += "<tr>"
            htmlBuilder += "<td align=center nowrap><span class=c2><b>Issue Date-User</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c2><b>"
            htmlBuilder += "Issue To Location/Company</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c2><b>Issue To User</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c2><b>Business Unit</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c2><b>Dept ID</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c2><b>Item ID - Item Description</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c2><b>Qty - UOM</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c2><b>Patient ID</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c2><b>Adjustment Type</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c2><b>Status</b></span></td>"
            htmlBuilder += "<td align=center nowrap width=170><span class=c2><b>Signature </b></span><td>"
            htmlBuilder += "</tr>"

            let sigimgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/AtPar/AtParWebApi/Uploaded/';


            for (var i = 0; i < this.lstIssueReport.length; i++) {

                htmlBuilder += "<tr height=90>"
                htmlBuilder += "<td align=right nowrap><span class=c2>" + this.lstIssueReport[i].ISSUE_DATE + " - "
                    + this.lstIssueReport[i].USER_NAME + "</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstIssueReport[i].ISSUE_TO_LOCATION + "</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstIssueReport[i].ISSUE_TO_USER + "</span></td>"
                htmlBuilder += "<td align=left ><span class=c2>" + this.lstIssueReport[i].BUSINESS_UNIT + "</span></td>"
                htmlBuilder += "<td align=right nowrap><span class=c2>" + this.lstIssueReport[i].DEPT_ID + "</span></td>"
                htmlBuilder += "<td align=left wrap><span class=c2>" + this.lstIssueReport[i].ITEM_ID + " - " + this.lstIssueReport[i].ITEM_DESC + "</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstIssueReport[i].QTY + " - " + this.lstIssueReport[i].UOM + "</span></td>"
                htmlBuilder += "<td align=right nowrap><span class=c2>" + this.lstIssueReport[i].PATIENT_ID + "</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstIssueReport[i].ADJUST_TYPE + "</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstIssueReport[i].STATUS + "</span></td>"


                if (this.lstIssueReport[i].SIGNATURE != null) {
                    htmlBuilder += "<td border==#ffffff nowrap>&nbsp;<center><img  src=" + sigimgserverPath + this.lstIssueReport[i].TRANS_ID + ".jpg></td>"
                }
                else {
                    htmlBuilder += "<td border==#ffffff nowrap>&nbsp;<center></td>"
                }

                htmlBuilder += "</tr>"
            }


            htmlBuilder += "</table>"
            htmlBuilder += "</td></td></Table>"

            return await htmlBuilder;
        }
        catch (ex) {
            htmlBuilder = '';
            this.clientErrorMsg(ex, 'exportReportDetails');
        }
    }

    getDateString(MyDate: Date) {
        var MyDateString = ('0' + (MyDate.getMonth() + 1)).slice(-2) + '/' + ('0' + MyDate.getDate()).slice(-2) + '/' + MyDate.getFullYear();
        return MyDateString
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    closeMailPopup() {
        this.growlMessage = [];
    }

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    ngOnDestroy() {

    }

}