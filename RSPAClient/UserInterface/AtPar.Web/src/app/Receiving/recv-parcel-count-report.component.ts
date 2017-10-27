import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { HttpService } from '../Shared/HttpService';
import { Http, Response } from "@angular/http";
import { StatusType, EnumApps, TokenEntry_Enum, YesNo_Enum, MailPriority } from '../Shared/AtParEnums';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { AtParConstants } from '../Shared/AtParConstants';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { Message, SelectItem } from './../components/common/api';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { SSL_CONFIG_DETAILS } from '../Entities/SSL_CONFIG_DETAILS';
import { MT_RECV_CARRIER } from '../entities/mt_recv_carrier';
import { ParcelCountReportService } from './recv-parcel-count-report.service';
import { VM_MT_RECV_PARCEL_COUNTS_HEADER } from '../Entities/VM_MT_RECV_PARCEL_COUNTS_HEADER';
import { VM_MT_RECV_PARCEL_COUNTS_DETAILS } from '../Entities/VM_MT_RECV_PARCEL_COUNTS_DETAILS';
import { saveAs } from 'file-saver';

declare var module: {
    id: string;
}

@Component({
    templateUrl: 'recv-parcel-count-report.component.html',
    providers: [HttpService, AtParConstants, AtParCommonService, ParcelCountReportService]
})

export class ParcelCountReportComponent implements OnInit {

    /* Variable Declaration */

    isMailDialog: boolean = false;
    toMailAddr: string = '';    
    deviceTokenEntry: string[] = [];

    growlMessage: Message[] = [];
    tdExports: boolean = false;
    statusCode: number = -1;
    defDateRange: number = 0;
    fromDate: Date;
    toDate: Date;
    currentDate: Date;
    appId: any;
    pageSize: number = 0;
    ipAddress: string = " ";
    gstrProtocal: string = "";
    gstrServerName: string = "";
    gstrPortNo: string = "";
    lstCarriers: SelectItem[] = [];
    showGrid: boolean = false;
    selectedDropDownCarrierId: any;
    trackingNumber: string = '';
    lstParcelCountReportHeader: VM_MT_RECV_PARCEL_COUNTS_HEADER[] = [];
    lstParcelCountReportDetails: VM_MT_RECV_PARCEL_COUNTS_DETAILS[] = [];
    carrierID: string = '';
    

    constructor(
        private httpService: HttpService,
        private atparConstants: AtParConstants,
        private commonService: AtParCommonService,
        private spinnerService: SpinnerService,
        private parcelCountReportService: ParcelCountReportService
    ) { 
        try {
            this.spinnerService.start();
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        }
        catch (ex) {
            this.clientErrorMsg(ex, '');
        }
        finally { this.spinnerService.stop();}
    }

    async ngOnInit() {
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.pageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];

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

            await this.populateCarriers();
            

        }
        catch (ex) {
            this.clientErrorMsg(ex, 'ngOnInit');
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

    async populateCarriers() {
        this.spinnerService.start();
        try {
            await this.commonService.getCarriersData().
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_RECV_CARRIER>;
                    this.lstCarriers = res.json().DataList;
                    this.growlMessage = [];
                    this.lstCarriers = [];
                    this.lstCarriers.push({ label: "Select Carrier", value: "" })                   
                    switch (data.StatType) {
                        case StatusType.Success: {                                                        
                            for (let i = 0; i < data.DataList.length; i++) {
                                 this.lstCarriers.push({ label: data.DataList[i].CARRIER_ID, value: data.DataList[i].CARRIER_ID });                                
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
                        case StatusType.Error: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, 'bindOrgGroups');
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async btnGo_Click() {
        try {
            this.growlMessage = [];
            this.showGrid = false;
            this.spinnerService.start();
            let frmDate = this.fromDate.toLocaleDateString();
            let toDate = this.toDate.toLocaleDateString();
            let retValue: boolean = false;
            retValue = await this.validateSearchFields();

            if (retValue) {

                if (this.selectedDropDownCarrierId != '' && this.selectedDropDownCarrierId != undefined && this.selectedDropDownCarrierId != 'Select Carrier') {
                    this.carrierID = this.selectedDropDownCarrierId;
                }

                await this.parcelCountReportService.getParcelCountReport(frmDate, toDate, this.carrierID, this.trackingNumber)
                    .catch(this.httpService.handleError).then((res: Response) => {
                        this.spinnerService.stop();
                        this.carrierID = '';
                        let result = res.json() as AtParWebApiResponse<any>;
                        switch (result.StatType) {
                            case StatusType.Success: {
                                if (result.DataDictionary != null) {
                                    this.lstParcelCountReportHeader = result.DataDictionary["lstGetParcelCountRepHeader"];
                                    this.lstParcelCountReportDetails = result.DataDictionary["lstGetParcelCountRepDetails"];
                                    if (this.lstParcelCountReportHeader.length > 0) {
                                        for (var i = 0; i < this.lstParcelCountReportHeader.length; i++) {
                                            let startDateTime = this.lstParcelCountReportHeader[i].START_DT_TIME;
                                            var convStartDateTime = new Date(startDateTime).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                                            this.lstParcelCountReportHeader[i].START_DT_TIME = convStartDateTime.replace(',', '');
                                            var lstDetails = this.lstParcelCountReportDetails.filter(x => x.TRANSACTION_ID == this.lstParcelCountReportHeader[i].TRANSACTION_ID);
                                            if (lstDetails.length > 0) {
                                                this.lstParcelCountReportHeader[i].DETAILS = lstDetails;
                                            }
                                        }
                                        this.showGrid = true;
                                        this.tdExports = true;
                                    }
                                    else {
                                        this.showGrid = false;
                                        this.tdExports = false;
                                        this.spinnerService.stop();
                                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                                    }
                                }
                                else {
                                    this.showGrid = false;
                                    this.tdExports = false;
                                    this.spinnerService.stop();
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                                }
                                break;
                            }
                            case StatusType.Warn: {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: result.StatusMessage });
                                break;
                            }
                            case StatusType.Error: {
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: result.StatusMessage });
                                break;
                            }
                            case StatusType.Custom: {
                                this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: result.StatusMessage });
                                break;
                            }
                        }
                    });
            }          
            
        }
        catch (ex) {
            this.clientErrorMsg(ex, 'btnGo_Click');
        }
        finally { this.spinnerService.stop();}
    }    

    validateSearchFields() {
        try {
            this.growlMessage = [];            

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
                let blob = new Blob([html], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                });
                saveAs(blob, "ReceiveParcelCountReport.xls");
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
                htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>" + " Receive Parcel Count Report from <b> " + this.convertDateFormat(this.fromDate) + "</b> to <b>" + this.convertDateFormat(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp<tr><td></td></tr>";
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
                htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>" + " Receive Parcel Count Report from <b> " + this.convertDateFormat(this.fromDate) + "</b> to <b>" + this.convertDateFormat(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp";
                htmlBuilder += "<tr><td colspan=12 align= left><span class=c2></span > </td><td align=right valign=top>&nbsp;"

            }
            htmlBuilder += "</td></tr></table></td></tr>"

           
            htmlBuilder += "<tr><td colspan=2>"
            htmlBuilder += "<table align=left width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
            htmlBuilder += "<tr bgcolor=#d3d3d3>"
            htmlBuilder += "<td align=center nowrap><span class=c2><b>Date Time</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c2><b>User</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c2><b>Total Count</b></span></td>"        
            htmlBuilder += "<td align=center nowrap><span class=c2><b>Signature</b></span></td>"
            htmlBuilder += "</tr>"
            let sigimgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/AtPar/AtParWebApi/Uploaded/';

            await this.lstParcelCountReportHeader.forEach(header => {
                htmlBuilder += "<tr height=90>"
                htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + header.START_DT_TIME + "&nbsp;</td>"
                htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + header.USER_ID + "&nbsp;</td>"
                htmlBuilder += "<td bgcolor=#ffffff align=right nowrap>&nbsp;" + header.TOTCNT + "&nbsp;</td>"
                if (header.SIGNATURE != null && header.SIGNATURE != '')
                {
                    htmlBuilder += "<td align=right border==#ffffff nowrap>&nbsp;<center><img src=" + sigimgserverPath + header.TRANSACTION_ID + ".jpg ></td>"
                }
                else {
                    htmlBuilder += "<td border==#ffffff nowrap>&nbsp;<center></td>"
                }
                htmlBuilder += "</tr>"

                if (header.DETAILS.length > 0) {
                    htmlBuilder += "<tr>"
                    htmlBuilder += "<td colspan =5>"
                    htmlBuilder += "<table align=right width=60% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                    htmlBuilder += "<tr bgcolor=#d3d3d3>"
                    htmlBuilder += "<td align=center nowrap width=15%><span class=c3><b>Tracking Number</b></span></td>"
                    htmlBuilder += "<td align=center nowrap width=8%><span class=c3><b>Quantity</b></span></td>"                        
                    htmlBuilder += "</tr>"
                    header.DETAILS.forEach(detail => {
                        htmlBuilder += "<tr>"
                        htmlBuilder += "<td align=left nowrap ><span class=c3>" +"'"+ detail.TRACKING_NO + "</span></td>"
                        htmlBuilder += "<td align=right nowrap><span class=c3>" + detail.NO_OF_BOXES + "</span></td>"
                        htmlBuilder += "</tr>"
                    });
                    htmlBuilder += "</table></td></tr>"
                }

            });
            
            htmlBuilder += "</tr>"
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
                var mywindow = window.open(document.URL, null, 'height=650,width=650,status=no,resizable=yes, scrollbars=yes, toolbar=no,location=center,menubar=no');
                if (mywindow != null && mywindow != undefined) {
                    mywindow.document.write('<html><head><title>' + 'Receive - Parcel Count Report' + '</title>');
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
            
            if (html != '' && html != null) {
                await this.commonService.sendEmbeddedEmail(this.deviceTokenEntry[TokenEntry_Enum.SystemId], 'Receive Parcel Count Report', JSON.stringify(html), this.toMailAddr, '', false, MailPriority.Normal.toString(), '')
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

    ngOnDestroy() {
        this.deviceTokenEntry = null;
        this.lstParcelCountReportHeader = null;
        this.lstParcelCountReportDetails = null;
        this.lstCarriers = null;
        this.growlMessage = null;        
    }

}