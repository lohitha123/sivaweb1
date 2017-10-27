import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { HttpService } from '../Shared/HttpService';
import { Http, Response } from "@angular/http";
import { StatusType, EnumApps, TokenEntry_Enum, MailPriority } from '../Shared/AtParEnums';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { AtParConstants } from '../Shared/AtParConstants';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { Message, SelectItem } from './../components/common/api';
import { VM_MT_ATPAR_TRANSACTION } from '../Entities/VM_MT_ATPAR_TRANSACTION';
import { MT_ATPAR_ORG_GROUPS } from '../Entities/MT_ATPAR_ORG_GROUPS';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { AtParActivityReportServices } from './atpar-activity-report.service';
import { SSL_CONFIG_DETAILS } from '../Entities/SSL_CONFIG_DETAILS';
import { MT_ATPAR_USER } from '../Entities/MT_ATPAR_USER';
import { CHART_DATASET } from '../Entities/CHART_DATASET';
import { saveAs } from 'file-saver';

declare var module: {
    id: string;
}
@Component({

    selector: 'atpar-activity-report',
    templateUrl: 'atpar-activity-report.component.html',
    providers: [HttpService, AtParConstants, AtParCommonService, AtParActivityReportServices]
})

export class AtParActivityReportComponent implements OnInit {

    
    /*VariableDeclaration*/

    @Input() productId: string = '';
    blnShowOrgGroupIdLabel: boolean = false;
    blnShowOrgGroupIdDropDown: boolean = false;
    blnTotal: boolean = false;
    blnUserId: boolean = false;
    blnBunitCompany: boolean = false;
    blnInvalid: boolean = false;
    isVisible: boolean = false;
    isMailDialog: boolean = false;
    toMailAddr: string = '';
    lstActivityData: Array<VM_MT_ATPAR_TRANSACTION> = [];
    deviceTokenEntry: string[] = [];

    growlMessage: Message[] = [];
    tdExports: boolean = false;
    statusCode: number = -1;
    orgGroupData: MT_ATPAR_ORG_GROUPS[];
    lstOrgGroups: SelectItem[] = [];
    orgGrpIdData: string = "";
    selectedOrgGroupId: string = "";
    defDateRange: number = 0;
    fromDate: Date;
    toDate: Date;
    currentDate: Date;
    appId: any;
    pageSize: number = 0;
    chartDetailsDataset: CHART_DATASET[] = [];
    labelData: any[] = [];
    chartData: any;
    options: any;
    showChart: boolean = false;
    ipAddress: string = " ";
    gstrProtocal: string = "";
    gstrServerName: string = "";
    gstrPortNo: string = "";
    filter: any;
    chartName: string = "";
    productName: string = "";

    constructor(
        private httpService: HttpService,
        private atparConstants: AtParConstants,
        private commonService: AtParCommonService,
        private spinnerService: SpinnerService,
        private activityReportService: AtParActivityReportServices
    ) {
        try {
            this.spinnerService.start();
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        } catch (ex) {
            this.clientErrorMsg(ex, '');
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async ngOnInit() {
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.pageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];       
        this.appId = this.productId;        
        try {
            this.spinnerService.start();
            try {
                this.statusCode = -1;
                this.statusCode = await this.getMyPreferences();
            }
            catch (ex) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Failed to get Default Report Duration' });
                return;
            }

            this.currentDate = new Date();
            this.toDate = new Date();
            this.fromDate = new Date();
            if (this.defDateRange.toString() != '' && this.defDateRange.toString != null) {
                this.fromDate = await this.addDays(this.fromDate, -this.defDateRange);
            }

            await this.bindOrgGroups();

            if (this.blnShowOrgGroupIdLabel == true) {
                await this.bindDataGrid(0);
            }

        }
        catch (ex) {
            this.clientErrorMsg(ex, 'ngOnInit');
        }
        finally {
            this.spinnerService.stop();
        }
    }
    async bindOrgGroups() {
        this.spinnerService.start();
        try {
            await this.commonService.getUserOrgGroups(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    this.orgGroupData = res.json().DataList;
                    this.growlMessage = [];                    
                });
            if (sessionStorage.getItem("OrgGroupID") != null && sessionStorage.getItem("OrgGroupID") == "All") {
                this.blnShowOrgGroupIdDropDown = true;

                //Getting the OrgGroupIDs
                await this.commonService.getOrgGroupIDS().
                    catch(this.httpService.handleError).then((res: Response) => {
                        let data = res.json() as AtParWebApiResponse<MT_ATPAR_USER>;
                        this.orgGroupData = res.json().DataList,
                            this.statusCode = res.json().StatusCode;
                        switch (data.StatType) {
                            case StatusType.Success: {
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
                            case StatusType.Error: {
                                this.spinnerService.stop();
                                this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                break;
                            }
                        }
                    });

                if (this.orgGroupData.length > 0) {
                    this.lstOrgGroups = [];
                    this.lstOrgGroups.push({ label: "Select One", value: "Select One" });
                    for (var i = 0; i < this.orgGroupData.length; i++) {
                        if (this.orgGroupData[i].ORG_GROUP_ID.toString() != "All") {
                            this.lstOrgGroups.push({ label: this.orgGroupData[i].ORG_GROUP_ID.toString() + " - " + this.orgGroupData[i].ORG_GROUP_NAME.toString(), value: this.orgGroupData[i].ORG_GROUP_ID.toString() });
                        }
                    }
                }
            }
            else {
                this.blnShowOrgGroupIdLabel = true;
                this.orgGrpIdData = this.orgGroupData[0].ORG_GROUP_ID.toString() + " - " + this.orgGroupData[0].ORG_GROUP_NAME.toString();
            }

        }
        catch (ex) {
            this.clientErrorMsg(ex, 'bindOrgGroups');
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async getMyPreferences() {
        try {
            await this.commonService.getMyPreferences('DEFAULT_REPORT_DURATION', this.deviceTokenEntry)
                .catch(this.httpService.handleError)
                .then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<number>;
                    this.statusCode = data.StatusCode;
                    if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
                        this.defDateRange = parseInt(data.DataVariable.toString());
                    }
                });
            if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                return AtparStatusCodes.E_SERVERERROR;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, 'getMyPreferences');
        }
        return AtparStatusCodes.ATPAR_OK;
    }

    async addDays(theDate, days) {
        return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
    }

    async bindDataGrid(fltr) {
        this.spinnerService.start();
        try {
            let frmDate = this.fromDate.toLocaleDateString();
            let toDate = this.toDate.toLocaleDateString();
            let orgGroupId: string = '';
            let retValue: boolean = false;
            retValue = await this.validateSearchFields();

            if (retValue) {

                if (this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID] != "All") {
                    orgGroupId = this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID].toString();
                }

                if (this.blnShowOrgGroupIdDropDown == true) {
                    orgGroupId = this.selectedOrgGroupId.toString();
                }                
                await this.activityReportService.getActivityReportData(frmDate, toDate, this.appId, fltr, orgGroupId)
                    .catch(this.httpService.handleError).then((result: Response) => {
                        let data = result.json() as AtParWebApiResponse<VM_MT_ATPAR_TRANSACTION>;
                        this.growlMessage = [];
                        switch (data.StatType) {
                            case StatusType.Success: {
                                this.lstActivityData = data.DataList;
                                if (this.lstActivityData.length > 0) {
                                    if (fltr == 0) {
                                        this.filter = fltr;
                                        this.labelData = [];
                                        this.labelData.push(this.lstActivityData.length);
                                        this.chartDetailsDataset = [];
                                        this.chartDetailsDataset.push({ label: 'Downloaded', backgroundColor: '#0000ff', borderColor: '#7CB342', data: [this.lstActivityData[0].DOWNLOAD], fill: false });
                                        this.chartDetailsDataset.push({ label: 'Sent', backgroundColor: '#90ee90', borderColor: '#7CB342', data: [this.lstActivityData[0].SENT], fill: false });
                                        if (this.appId == EnumApps.Receiving || this.appId == EnumApps.PickPlan || this.appId == EnumApps.PutAway) {
                                            this.chartDetailsDataset.push({ label: 'Invalid', backgroundColor: '#ffff00', borderColor: '#7CB342', data: [this.lstActivityData[0].INVALID], fill: false });
                                        }
                                        this.chartDetailsDataset.push({ label: 'Error', backgroundColor: '#c00000', borderColor: '#7CB342', data: [this.lstActivityData[0].ERROR], fill: false });

                                        this.chartData = {
                                            labels: this.labelData,
                                            datasets: this.chartDetailsDataset
                                        }

                                        this.blnTotal = true;
                                        this.showChart = true;
                                        this.blnUserId = false;
                                        this.blnBunitCompany = false;
                                    }
                                    else if (fltr == 1) {
                                        this.blnBunitCompany = true;
                                        this.blnUserId = false;
                                        this.blnTotal = false;
                                        this.showChart = false;
                                        this.filter = fltr;
                                    }
                                    else if (fltr == 2) {
                                        this.blnUserId = true;
                                        this.blnTotal = false;
                                        this.blnBunitCompany = false;
                                        this.showChart = false;
                                        this.filter = fltr;
                                    }
                                    if (this.appId == EnumApps.Receiving || this.appId == EnumApps.PickPlan || this.appId == EnumApps.PutAway) {
                                        this.blnInvalid = true;
                                    }
                                    this.isVisible = true;
                                    this.tdExports = true;
                                }
                                else {
                                    this.showChart = false;
                                    this.isVisible = false;
                                    this.tdExports = false;
                                    this.spinnerService.stop();
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                                }

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

        }
        catch (ex) {
            this.clientErrorMsg(ex, 'bindDataGrid');
        }
        finally {
            this.spinnerService.stop();
        }
    }

    public chartOptions = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    stepSize: 5
                }
            }]
        }
    }

    validateSearchFields() {
        try {
            this.growlMessage = [];

            if ((this.blnShowOrgGroupIdDropDown == true) && (this.selectedOrgGroupId == 'Select One' || this.selectedOrgGroupId == undefined || this.selectedOrgGroupId == '')) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Valid Org Group ID" });
                return false;
            }

            if (this.fromDate == null || this.fromDate.toString() == '' || this.toDate == null || this.toDate.toString() == '') {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select a Valid Date Range" });
                return false;
            }
            else if (Date.parse(this.fromDate.toString()) && Date.parse(this.toDate.toString())) {
                if (Date.parse(this.convertDateFormat(this.fromDate)) > Date.parse(this.convertDateFormat(this.toDate))) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "From Date should be less than To Date" });
                    return false;
                }
                if (Date.parse(this.convertDateFormat(this.toDate)) > Date.parse(this.convertDateFormat(this.currentDate))) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "To Date should be less than or equal to Today's Date" });
                    return false;
                }
                if (Date.parse(this.convertDateFormat(this.toDate)) < Date.parse(this.convertDateFormat(this.fromDate))) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "To Date must be greater than or equal to From Date" });
                    return false;
                }
            }
            else {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Dates' });
                return false;
            }
            return true;
        }
        catch (ex) {
            this.clientErrorMsg(ex, 'validateSearchFields')
            return false;
        }
    }

    convertDateFormat(strDate) {
        var date = new Date(strDate),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [mnth, day , date.getFullYear()].join("/");
    }

    async onExportToExcelClick(event) {
        try {
            event.stopImmediatePropagation();
            this.spinnerService.start();
            let html: string = await this.ExportReportDetails('Excel');
            if (html != '' && html != null) {
                let productScreenName: string = await this.screenName();
                let blob = new Blob([html], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                });
                saveAs(blob, productScreenName + 'ActivityReport.xls');
            }
            
        }
        catch (ex) {
            this.clientErrorMsg(ex, 'onExportToExcelClick');
        }
        finally {
            this.spinnerService.stop();
        }
    }
    

    async ExportReportDetails(reqType: string) {
        let htmlBuilder: string = '';
        try {
            this.growlMessage = [];
            let sbMailText: string;

            let imgserverPath: string = '';
            let productScreenName: string = await this.screenName();
            if (this.filter == 0) {
                var chartImage = document.getElementById("myChart") as HTMLCanvasElement;
                var image = chartImage.toDataURL("image/png");
                image = image.replace(/^data:image\/(png|jpg);base64,/, "");
                await this.commonService.saveImage(image, productScreenName + "_activity_report").
                    then((res: Response) => {
                        let data = res.json() as AtParWebApiResponse<any>;
                        this.growlMessage = [];
                        switch (data.StatType) {
                            case StatusType.Success: {

                                break;
                            }
                            case StatusType.Warn: {

                                break;
                            }
                            case StatusType.Error: {

                                break;
                            }
                            case StatusType.Custom: {

                                break;
                            }
                        }

                    });
                this.chartName = productScreenName + '_activity_report.png';
            }

            await this.commonService.getServerIP()
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

            await this.commonService.getSSLConfigDetails()
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
            let title: string = '""' + "AtparVersion 3.0" + '""';
            var ChartPath = this.httpService.BaseUrl + '/Uploaded/';

            htmlBuilder += "<Table align=left width=100% cellpadding=0 cellspacing = 0 vAlign=top>";

            if (reqType == 'Print') {
                htmlBuilder += "<TR width='100%'><td colspan=2 align=left  width='15%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg><img src=" + imgserverPath + "topbg.jpg width=75% height=63>"
                    + "</td></TR>"
                htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>" + productScreenName + " Activity Report from <b> " + this.convertDateFormat(this.fromDate) + "</b> to <b>" + this.convertDateFormat(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp<tr><td></td></tr>";
                htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "><img src=" + imgserverPath + "print.jpg></A>"
            }
            else {               

                if (reqType == 'Mail') {                

                    htmlBuilder += "<TR width='100%'><td colspan=2 bgcolor='#fe9836' align=left  width='100%' nowrap><img src=" + imgserverPath + "logo.jpg></td></TR>"

                } else {
                    htmlBuilder += "<TR height=55><TD align=left colspan=2><IMG height=55 width=18% src=" + imgserverPath + "logo.jpg title=Atpar 3><img src=" + imgserverPath + "topbg.jpg width=82% height=55></TD></TR>"
                }

                htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td></td></tr>"
                htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>" + productScreenName + " Activity Report from <b> " + this.convertDateFormat(this.fromDate) + "</b> to <b>" + this.convertDateFormat(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp";
                htmlBuilder += "<tr><td colspan=12 align= left><span class=c2></span > </td><td align=right valign=top>&nbsp;"

            }
            htmlBuilder += "</td></tr></table></td></tr><tr><td colspan=2> "


            htmlBuilder += "<tr><td colspan=2 align=center>"
            if (this.filter == 0) {
                htmlBuilder += "<table align=center  >"
                htmlBuilder += "<tr bgcolor=#ffffff>"
                if (reqType == "Mail") {
                    htmlBuilder += "<td align=center colspan=9 align=left nowrap width=700 height=250><span class=c3><img src= " + ChartPath + this.chartName + "  width=800 height=250></span></td>"
                } else {
                    htmlBuilder += "<td align=center colspan=9 align=left nowrap width=700 height=250><span class=c3><img src=" + ChartPath + this.chartName + "  width=800 height=250></span></td>"
                }
                htmlBuilder += "</tr></table>"
            }
            htmlBuilder += "<tr><td>";
            htmlBuilder += "<table align=left width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
            htmlBuilder += "<tr bgcolor=#d3d3d3>"

            if (this.filter == 0) {
                htmlBuilder += "<td align=center nowrap><span class=c2></span></td>"
            }
            if (this.filter == 1) {
                htmlBuilder += "<td align=center nowrap><span class=c2><b>Business Unit/Company</b></span></td>"
            }
            if (this.filter == 2) {
                htmlBuilder += "<td align=center nowrap><span class=c2><b>User</b></span></td>"
            }

            htmlBuilder += "<td align=center nowrap><span class=c2><b>Download</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c2><b>Sent</b></span></td>"
            if (this.appId == EnumApps.Receiving || this.appId == EnumApps.PickPlan || this.appId == EnumApps.PutAway) {
                htmlBuilder += "<td align=center nowrap><span class=c2><b>Invalid</b></span></td>"
            }

            htmlBuilder += "<td align=center nowrap><span class=c2><b>Error</b></span></td>"
            htmlBuilder += "</tr>"

            if (this.lstActivityData.length > 0) {
                for (var i = 0; i < this.lstActivityData.length; i++) {

                    htmlBuilder += "<tr>"
                    
                    if (this.filter == 0) {
                        htmlBuilder += "<td align=left nowrap><span class=c3>Total</span></td>"
                    }
                    else if (this.filter == 1) {
                        htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstActivityData[i].BUSINESS_UNIT + "</span></td>"
                    }
                    else if (this.filter == 2) {
                        htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstActivityData[i].USER_ID + "</span></td>"
                    }

                    htmlBuilder += "<td align=right nowrap><span class=c2>" + this.lstActivityData[i].DOWNLOAD + "</span></td>"
                    htmlBuilder += "<td align=right nowrap><span class=c2>" + this.lstActivityData[i].SENT + "</span></td>"

                    if (this.appId == EnumApps.Receiving || this.appId == EnumApps.PickPlan || this.appId == EnumApps.PutAway) {
                        htmlBuilder += "<td align=right nowrap><span class=c2>" + this.lstActivityData[i].INVALID + "</span></td>"
                    }
                    htmlBuilder += "<td align=right nowrap><span class=c2>" + this.lstActivityData[i].ERROR + "</span></td>"
                    htmlBuilder += "</tr>"
                    
                }
            }
            htmlBuilder += "</table></td></tr>"
            htmlBuilder += "</Table>"

            return await htmlBuilder;

        }
        catch (ex) {
            htmlBuilder = '';
            this.clientErrorMsg(ex, 'ExportReportDetails');
        }
    }

    async onPrintClick(event) {
        try {
            event.stopImmediatePropagation();
            this.spinnerService.start();
            var html = await this.ExportReportDetails('Print');
            if (html != '' && html != null) {
                let appProductName: string = await this.screenName();
                var mywindow = window.open(document.URL, null, 'height=650,width=650,status=no,resizable=yes, scrollbars=yes, toolbar=no,location=center,menubar=no');                
                if (mywindow != null && mywindow != undefined) {
                    mywindow.document.write('<html><head><title>' + appProductName + ' Activity Report' + '</title>');
                    mywindow.document.write('</head><body >');
                    mywindow.document.write(html);
                    mywindow.document.write('</body></html>');

                    mywindow.document.close();
                    mywindow.focus();                    
                    return true;
                }
                else {
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
            this.isMailDialog = false;
            let html: string = await this.ExportReportDetails('Mail');
            let toAddr: string = '';
            let appProductName: string = await this.screenName();
            if (html != '' && html != null) {
                await this.commonService.sendEmbeddedEmail(this.deviceTokenEntry[TokenEntry_Enum.SystemId], appProductName + ' Activity Report', JSON.stringify(html), this.toMailAddr, this.chartName, false, MailPriority.Normal.toString(), '')
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
            
            this.isMailDialog = false;
            this.toMailAddr = '';
            

        } catch (ex) {
            this.clientErrorMsg(ex, 'onSendMailClick');
        }
        finally {

            this.spinnerService.stop();
        }
    }

    validateEmail(email) {
        var ret = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return ret.test(email);
    }

    closeMailPopup() {
        this.growlMessage = [];
    }

    clientErrorMsg(ex, funName) {
        this.growlMessage = [];
        this.atparConstants.catchClientError(this.growlMessage, this.spinnerService, ex.toString(), funName, this.constructor.name);
    }

    async screenName() {
        if (this.appId == EnumApps.CartCount) {
            this.productName = "CartCount";
        }
        else if (this.appId == EnumApps.CycleCount) {
            this.productName = "CycleCount";
        }
        else if (this.appId == EnumApps.Receiving) {
            this.productName = "Receive";
        }
        else if (this.appId == EnumApps.PickPlan) {
            this.productName = "PickPlan";
        }
        else if (this.appId == EnumApps.PutAway) {
            this.productName = "PutAway";
        }
        return this.productName;
    }

    ngOnDestroy() {
        this.deviceTokenEntry = null;
        this.lstActivityData = null;
        this.lstOrgGroups = null;
        this.growlMessage = null;
        this.orgGroupData = null;
    }
} 