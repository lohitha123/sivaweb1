/// <reference path="../entities/vm_transaction.ts" />
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, ViewChild, Input } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { HttpService } from '../Shared/HttpService';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { TokenEntry_Enum, ClientType, ModeEnum, BusinessType, AppTransactionStatus, CASE_PICK_STATUS, } from '../Shared/AtParEnums';
import { SelectItem, Message } from '../components/common/api';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { StatusType, EnumApps, MailPriority } from '../Shared/AtParEnums';
import { AtParConstants } from '../Shared/AtParConstants';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { DataTable } from '../components/datatable/datatable';
import { Http, Response } from "@angular/http";
import { LotSerialTrackReportService } from './pou-lotserial-tracking-report.service';
import { saveAs } from 'file-saver';
import { SSL_CONFIG_DETAILS } from '../Entities/SSL_CONFIG_DETAILS';
import { MT_ATPAR_USER } from '../../app/Entities/mt_atpar_user';
import { DailyUserActivityReportService } from './pou-daily-user-activity-report.service';
import { VM_TRANSACTION } from '../entities/vm_transaction';

declare var module: {
    id: string;
}

@Component({

    templateUrl: 'pou-daily-user-activity-report.component.html',
    providers: [AtParCommonService, DailyUserActivityReportService, AtParConstants, datatableservice]
})

export class DailyUserActivityReportComponent {

    pageSize: number;
    deviceTokenEntry: any;
    growlMessage: Message[] = [];
    lstTransactionType: SelectItem[] = [];
    lstUsers: SelectItem[] = [];
    UserID: string = '';
    selectedTransType: string = '';
    selectedUser: string = '';
    recordsPerPageSize: number;


    toDate: Date;
    currentDate: Date;

    startIndex: number;
    EndIndex: number;

    tdExports: boolean = false;

    gstrProtocal: string;
    gstrServerName: string;
    gstrPortNo: string;
    ipAddress: string;
    txtEventsMail: string;
    isMailDialog: boolean = false;
    toMailAddr: string = '';
    statusCode: number = -1;

    lstActivityDetails: VM_TRANSACTION[] = [];
    lstActivitySummary: any[] = [];
    activitysummary: any[] = [];
    showGrid: boolean = false;
    showexport: boolean = false;
    ClinicalGrid: boolean = false;
    ClinalType: boolean = false;
    Supply: boolean = false;
    CaseCart: boolean = false;
    strUserID: string;
    strTempUser: string;
    strDate: string;
    activityType1: string;
    activityType2: string;


    constructor(private spinnerService: SpinnerService,
        private atParCommonService: AtParCommonService,
        private httpService: HttpService,
        private atParConstant: AtParConstants,
        private dailyUserActivityReportService: DailyUserActivityReportService
    ) {
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));

    }

    async ngOnInit() {
        this.spinnerService.start();
        this.recordsPerPageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        this.startIndex = + sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
        this.toDate = new Date();
        this.lstTransactionType = [];
        this.lstTransactionType.push({ label: "Select Trans Type", value: "-1" }, { label: "Clinical", value: "0" }, { label: "Supply Chain", value: "1" }, { label: "Case Cart", value: "2" });
        this.selectedTransType = this.lstTransactionType[0].value;
        await this.bindUsersList();
        this.spinnerService.stop();
    }

    convertDateFormate(strDate) {
        var date = new Date(strDate),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [mnth, day , date.getFullYear()].join("/");
    }

    async bindUsersList() {
        try {
            this.growlMessage = [];

            this.lstUsers = [];
            this.lstUsers.push({ label: "Select User", value: "Select User" });
            this.selectedUser = this.lstUsers[0].value;
            this.spinnerService.start();
            await this.atParCommonService.getUsersList(this.deviceTokenEntry[TokenEntry_Enum.UserID], EnumApps.PointOfUse, this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_USER>;


                    switch (data.StatType) {
                        case StatusType.Success: {
                            for (let i = 0; i < data.DataList.length; i++) {
                                this.lstUsers.push({
                                    label: data.DataList[i].FULLNAME,
                                    value: data.DataList[i].USER_ID
                                })
                            }
                            if (this.lstUsers.length <= 0 || this.lstUsers == null) {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No users Available' });
                            }
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage = [];
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage = [];
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            console.log(ex);
            this.clientErrorMsg(ex, 'bindUsersList');

        }
    }

    ddlUser_SelectedIndexChanged(e) {
        this.strTempUser = e.label;
    }

    async BindActivityDetails() {

        try {
            this.growlMessage = [];
            let returnValue: boolean = false;
            returnValue = await this.validateSearchFields();
            if (returnValue) {
                this.spinnerService.start();


                await this.getActivityDetails()

                this.spinnerService.stop();
            }


        }
        catch (ex) {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: AtParConstants.ClientErrorMessage });
            this.spinnerService.stop();
        }

    }

    async getActivityDetails() {

        try {
            this.growlMessage = [];
            var Tdate = this.convertDateFormate(this.toDate.toDateString());
            this.strDate = Tdate;
            this.strUserID = this.strTempUser;
            this.lstActivityDetails = [];
            this.lstActivitySummary = [];
            this.activitysummary = [];
            this.ClinalType = false;
            this.Supply = false;
            this.CaseCart = false;
            this.showexport = false;
            this.activityType1 = '';
            this.activityType2 = '';
            await this.dailyUserActivityReportService.getDailyUserActivityRep(this.selectedUser, this.selectedTransType, Tdate, EnumApps.PointOfUse).then((res: Response) => {
                let data = res.json() as AtParWebApiResponse<any>;
                console.log(data);
                this.spinnerService.stop();
                switch (data.StatType) {
                    case StatusType.Success:
                        {
                            if (data.DataDictionary["pReturnDS"].DETAILS.length == 0) {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No records found' });
                                break;
                            }
                            this.lstActivityDetails = data.DataDictionary["pReturnDS"].DETAILS;
                            this.lstActivitySummary = data.DataDictionary["pReturnDS"].SUMMARY;    
                            if (this.selectedTransType == "0") {
                                this.ClinalType = true;
                                this.activityType1 = 'Issues';
                                this.activityType2 = 'Returns';
                            }
                            else if (this.selectedTransType == "1") {
                                this.Supply = true;
                                this.activityType1 = 'Count';
                                this.activityType2 = 'PutAway';
                            }
                            else if (this.selectedTransType == "2") {
                                this.CaseCart = true;
                                this.activityType1 = 'Case Pick';
                                this.activityType2 = 'Case Return';
                            }
                            for (var i in this.lstActivityDetails) {
                                if (this.lstActivityDetails[i].STATUS == AppTransactionStatus.Returned || this.lstActivityDetails[i].STATUS == AppTransactionStatus.PutAway || this.lstActivityDetails[i].STATUS == CASE_PICK_STATUS.CLOSED || this.lstActivityDetails[i].STATUS == CASE_PICK_STATUS.REMOVE || this.lstActivityDetails[i].STATUS == CASE_PICK_STATUS.REVIEWED || this.lstActivityDetails[i].STATUS == CASE_PICK_STATUS.RETURNED) {
                                    this.lstActivityDetails[i].rowClsStyle = 'ui-datatable-grey';

                                } else {
                                    this.lstActivityDetails[i].rowClsStyle = 'ui-datatable-lightgrey';
                                }
                                
                            }


                            this.showexport = true;
                            this.ClinicalGrid = true;

                            break;
                        }
                    case StatusType.Warn:
                        {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                    case StatusType.Error: {

                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });

                        break;
                    }
                    case StatusType.Custom: {

                        break;
                    }
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, 'getActivityDetails');
        }
    }

    validateSearchFields() {



        this.growlMessage = [];
        this.ClinicalGrid = false;

        try {

            if (this.selectedUser == "Select User" || this.selectedUser == undefined || this.selectedUser == "") {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select User" });
                return false;
            }

            if (this.selectedTransType == "-1" || this.selectedTransType == undefined || this.selectedTransType == "") {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Transaction Type" });
                return false;
            }



            if (Date.parse(this.toDate.toString())) {
                if (Date.parse(this.convertDateFormate(this.toDate)) > Date.parse(this.convertDateFormate(this.currentDate))) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "To Date should be less than or equal to Today's Date" });
                    return false;
                }
            }




            return true;

        } catch (ex) {
            this.clientErrorMsg(ex, 'validateSearchFields');
            return false;
        }
    }

    async onExportToExcelClick(event) {
        try {
            event.stopImmediatePropagation();
            this.spinnerService.start();
            let html: string = await this.exportReportDetails('Excel');
            let blob = new Blob([html], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
            });
            saveAs(blob, "DailyUserActivity.xls");

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

                var mywindow = window.open(document.URL, null, 'height=650,width=650,status=no,resizable=yes, scrollbars=yes, toolbar=no,location=center,menubar=no');
                if (mywindow != null && mywindow != undefined) {
                   
                    mywindow.document.write('<html><head><title>' + 'POU - Daily User Activity Report' + '</title>');
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
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Email Server not configured! Please contact Administrator' });
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



            imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/AtParWebApi/assets/images/';




            htmlBuilder = "<Table align=center width=100% cellpadding=0 cellspacing = 0 vAlign=top>"

            if (reqType == "Print") {
                htmlBuilder += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=75% height=63></td></TR>"
                htmlBuilder += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                    "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                htmlBuilder += "<tr><td colspan=10 align=left><span class=c2>Daily User Activity of User: " + this.strUserID + " for the date: " + this.strDate + "</span></td><td align=right valign=top>&nbsp;"

               
                htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "><img src=" + imgserverPath + "print.jpg></A>"

            } else {
                htmlBuilder += "<TR width='100%'><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg></td></TR>"
                htmlBuilder += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                    "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                htmlBuilder += "<tr><td colspan=10 align=left><span class=c2>Daily User Activity of User: " + this.strUserID +" for the date: " + this.strDate + "</span></td><td align=right valign=top>&nbsp;"

            }

            htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr> "
            htmlBuilder += "<table align=center width=90% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1 cellpadding=4>"
            htmlBuilder += "<tr>"
            htmlBuilder += "<td align=center nowrap><span class=c2><b>Org ID</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c2><b>Start Time (HH24:MI:SS)</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c2><b>End Time (HH24:MI:SS)</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c2><b>Total Time (HH:MI:SS)</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c2><b>Issues / Returns</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c2><b>Scanned</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c2><b>Workstation ID / Device ID</b></span></td>"


            htmlBuilder += "</tr>"

            let lstActivityDetailssigimgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/AtPar/AtParWebApi/Uploaded/';


            for (var i = 0; i < this.lstActivityDetails.length; i++) {

                htmlBuilder += "<tr height=90>"

                htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstActivityDetails[i].BUSINESS_UNIT + "</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstActivityDetails[i].START_TIME + "</span></td>"
                htmlBuilder += "<td align=left ><span class=c2>" + this.lstActivityDetails[i].END_TIME + "</span></td>"
                htmlBuilder += "<td align=right nowrap><span class=c2>" + this.lstActivityDetails[i].TOTAL_TIME + "</span></td>"
                htmlBuilder += "<td align=left wrap><span class=c2>" + this.lstActivityDetails[i].TOTAL_REC_SENT + "</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstActivityDetails[i].SCANS_COUNT + "</span></td>"
                htmlBuilder += "<td align=right nowrap><span class=c2>" + this.lstActivityDetails[i].DEVICE_ID + "</span></td>"





                htmlBuilder += "</tr>"
            }


            htmlBuilder += "</table>"
            htmlBuilder += "</br>"
            htmlBuilder += "</br>"

            htmlBuilder += "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1 cellpadding=4>"
            htmlBuilder += "<tr>"
            htmlBuilder += "<td align=center nowrap colspan=2><span class=c2><b>" + this.activityType1 +"</b></span></td>"
            htmlBuilder += "<td align=center nowrap colspan=2><span class=c2><b>" + this.activityType2 +"</b></span></td>"
            htmlBuilder += "</tr>"
            htmlBuilder += "<tr>"
            htmlBuilder += "<td align=left nowrap><span class=c2>Total transaction time</span></td>"
            htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstActivitySummary[0].TOT_ISSUE_TIME + "</span></td>"
            htmlBuilder += "<td align=left nowrap><span class=c2>Total transaction time</span></td>"
            htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstActivitySummary[0].TOT_RETURN_TIME + "</span></td>"
            htmlBuilder += "</tr>"
            htmlBuilder += "<tr>"
            htmlBuilder += "<td align=left nowrap><span class=c2>Average time taken for a transaction</span></td>"
            htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstActivitySummary[0].AVG_ISSUE_TIME + "</span></td>"
            htmlBuilder += "<td align=left nowrap><span class=c2>Average time taken for a transaction</span></td>"
            htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstActivitySummary[0].AVG_RETURN_TIME + "</span></td>"
            htmlBuilder += "</tr>"
            htmlBuilder += "<tr>"

            if (this.ClinalType == true) {
                htmlBuilder += "<td align=left nowrap><span class=c2>Total items Issued</span></td>"
            }
            else {
                htmlBuilder += "<td align=left nowrap><span class=c2>Total items " + this.activityType1 + "</span></td>"
            }
          
            htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstActivitySummary[0].TOT_ISSUE_ITEMS + "</span></td>"
            if (this.ClinalType == true) {
                htmlBuilder += "<td align=left nowrap><span class=c2>Total items Returned</span></td>"
            }
            else {
                htmlBuilder += "<td align=left nowrap><span class=c2>Total items " + this.activityType2 + "</span></td>"
            }
           
            htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstActivitySummary[0].TOT_RETURN_ITEMS + "</span></td>"
            htmlBuilder += "</tr>"
            htmlBuilder += "<tr>"
            htmlBuilder += "<td align=left nowrap><span class=c2>Maximum time taken for a transaction</span></td>"
            htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstActivitySummary[0].MAX_ISSUE_TIME + "</span></td>"
            htmlBuilder += "<td align=left nowrap><span class=c2>Maximum time taken for a transaction</span></td>"
            htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstActivitySummary[0].MAX_RETURN_TIME + "</span></td>"
            htmlBuilder += "</tr>"
            htmlBuilder += "<tr>"
            htmlBuilder += "<td align=left nowrap><span class=c2>Minimum time taken for a transaction</span></td>"
            htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstActivitySummary[0].MIN_ISSUE_TIME + "</span></td>"
            htmlBuilder += "<td align=left nowrap><span class=c2>Minimum time taken for a transaction</span></td>"
            htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstActivitySummary[0].MIN_RETURN_TIME + "</span></td>"
            htmlBuilder += "</tr>"

            htmlBuilder += "<tr>"
            htmlBuilder += "<td align=left colspan=4><span class=c2>Total Time : " + this.lstActivitySummary[0].TOT_TIME + " </span></td>"

            htmlBuilder += "</tr>"

            htmlBuilder += "</table>"
            htmlBuilder += "</td></td>"
                       
         

            htmlBuilder += "</Table>"

            return await htmlBuilder;
        }
        catch (ex) {
            htmlBuilder = '';
            this.clientErrorMsg(ex, 'exportReportDetails');
        }
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


}