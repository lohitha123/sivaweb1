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
import { DataTable } from '../components/datatable/datatable';
import { Http, Response } from "@angular/http";
import { VM_MT_POU_USER_DEPARTMENTS } from "../entities/vm_mt_pou_user_departments";
import { LotSerialTrackReportService } from './pou-lotserial-tracking-report.service';
import { saveAs } from 'file-saver';
import { SSL_CONFIG_DETAILS } from '../Entities/SSL_CONFIG_DETAILS';
declare var module: {
    id: string;
}

@Component({

    templateUrl: 'pou-lotserial-tracking-report.component.html',
    providers: [AtParCommonService, LotSerialTrackReportService, AtParConstants, datatableservice]
})

export class LotSerialTrackingReportComponent {
    pageSize: number;
    deviceTokenEntry: any;
    growlMessage: Message[] = [];
    lstDepartments: SelectItem[] = [];
    txtLotNumber: string = '';
    txtSerialNumber: string = '';
    txtPatientID: string = '';
    txtAccountID: string = '';
    selectedDepartment: string = '';
    recordsPerPageSize: number;

    fromDate: Date;
    toDate: Date;
    currentDate: Date;

    startIndex: number;
    EndIndex: number;
    
    tdExports: boolean = false;
    lstChargeCaptureGrid: any[] = [];
    lstDgrdAvailable: any[] = [];
    firstGrid: boolean = false;
    secondGrid: boolean = false;
    chargeCaptureGridRec: number = 0;
    dgrdAvailableRec: number = 0;
    blnchargeCaptureGridRec: boolean = false;
    blndgrdAvailableRec: boolean = false;

    gstrProtocal: string;
    gstrServerName: string;
    gstrPortNo: string;
    ipAddress: string;
    txtEventsMail: string;
    isMailDialog: boolean = false;
    toMailAddr: string = '';
    statusCode: number = -1;

    constructor(private spinnerService: SpinnerService,
        private atParCommonService: AtParCommonService,
        private httpService: HttpService,
        private atParConstant: AtParConstants,
        private lotSerialService: LotSerialTrackReportService
    ) {
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));

    }
    async ngOnInit() {
        this.spinnerService.start();
        this.recordsPerPageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        this.startIndex = + sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
        let defaultReport =await this.defaultReportDuration();
        await this.bindDepartmentDropDown();
        this.fromDate = new Date();
        this.fromDate = await this.addDays(this.fromDate, defaultReport);
        this.toDate = new Date();
        this.spinnerService.stop();
    }
    async defaultReportDuration() {
        let defaultReport: number = 0;
       try {
           await this.atParCommonService.getMyPreferences("DEFAULT_REPORT_DURATION", this.deviceTokenEntry[TokenEntry_Enum.UserID])
                .then((result: Response) => {
                    let res = result.json() as AtParWebApiResponse<VM_MT_POU_USER_DEPARTMENTS>;
                    if (res.StatusCode == AtparStatusCodes.ATPAR_OK) {
                        defaultReport = <number>res.DataVariable;
                        return defaultReport;
                    }
               });
           return defaultReport;
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop()
        }
    }
    async bindDepartmentDropDown() {
        this.lstDepartments = [];
        this.lstDepartments.push({
            label: "Select Department", value: ''
        });
        await this.atParCommonService.getUserDepartments(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID], this.deviceTokenEntry).then((result: Response) => {
            let res = result.json() as AtParWebApiResponse<VM_MT_POU_USER_DEPARTMENTS>;
            switch (res.StatType) {
                case StatusType.Success: {
                    let departments = res.DataList;
                    if (this.lstDepartments.length > 0) {
                        for (var index = 0; index < departments.length; index++) {
                            this.lstDepartments.push({
                                label: departments[index].DEPARTMENT_ID + "-" + departments[index].DEPT_NAME, value:
                                departments[index].DEPARTMENT_ID
                            });
                        }
                    }
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
    }

    async btnGo_Click() {

        try {
            this.gridVisibleFalse()
            let returnValue: boolean = false;
            returnValue = this.validateSearchFields();

            if (returnValue) {

                await this.getData();
                //await this.getDepartmentItems();
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }

        finally {
            this.spinnerService.stop();
        }
    }
    async getData() {
        try {
            this.chargeCaptureGridRec = 0
            this.dgrdAvailableRec = 0

            this.spinnerService.start();
            let cDate = new Date();
            cDate.setDate(this.toDate.getDate() + 1);

            let fromDate: string = await this.convertDateFormate(this.fromDate);
            let toDate: string = await this.convertDateFormate(cDate);
            if (this.selectedDepartment == null || this.selectedDepartment == undefined) {
                this.selectedDepartment = '';
            }
            await this.lotSerialService.getLotSerialTrackReport(fromDate, toDate, this.txtLotNumber, this.txtSerialNumber, this.txtPatientID, "", this.txtAccountID, "",
                this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID], this.selectedDepartment, EnumApps.PointOfUse)
                .catch(this.httpService.handleError)
                .then((res: Response) => {
                    this.spinnerService.stop();
                    let data = res.json() as AtParWebApiResponse<number>;
                    this.blnchargeCaptureGridRec = true;
                    this.blndgrdAvailableRec = true;
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.lstChargeCaptureGrid = data.DataDictionary["ChargeReportDS"]["Table1"];
                            this.lstDgrdAvailable = data.DataDictionary["ChargeReportDS"]["Table2"];
                            if (this.lstChargeCaptureGrid.length > 0 || this.lstDgrdAvailable.length > 0) {
                                if (this.lstChargeCaptureGrid.length > 0) {
                                    this.firstGrid = true;
                                    this.chargeCaptureGridRec = this.lstChargeCaptureGrid.length
                                }
                                else {
                                    this.chargeCaptureGridRec = 0
                                    this.firstGrid = false;
                                }
                                if (this.lstDgrdAvailable.length > 0) {
                                    this.secondGrid = true;
                                    this.dgrdAvailableRec = this.lstDgrdAvailable.length;
                                }
                                else {
                                    this.dgrdAvailableRec = 0
                                    this.secondGrid = false;
                                }
                                this.tdExports = true;
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

                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop();
        }
    }
    addDays(theDate, days) {
        return new Date(theDate.getTime() - days * 24 * 60 * 60 * 1000);
    }
    validateSearchFields() {
        try {
            this.growlMessage = [];
            if (this.fromDate == null || this.fromDate.toString() == '' || this.toDate == null || this.toDate.toString() == '') {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please select a valid date range' });
                return false;
            }
            else if (Date.parse(this.fromDate.toString()) && Date.parse(this.toDate.toString())) {
                if (Date.parse(this.convertDateFormate(this.toDate)) > Date.parse(this.convertDateFormate(this.currentDate))) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "To Date should be less than or equal to Today's Date" });
                    return false;
                }
                if (Date.parse(this.convertDateFormate(this.fromDate)) > Date.parse(this.convertDateFormate(this.toDate))) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "From Date should be less than To Date" });
                    return false;
                }
            }
            else {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Dates' });
                return false;
            }
            return true;

        } catch (ex) {
            this.clientErrorMsg(ex);
            return false;
        }

    }
    convertDateFormate(strDate) {
        var date = new Date(strDate),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [mnth, day , date.getFullYear()].join("/");
    }
    clientErrorMsg(ex) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, ex.toString());
    }
    gridVisibleTrue() {
        this.tdExports = true;
        this.firstGrid = true;
        this.secondGrid = true;
    }
    gridVisibleFalse() {
        this.tdExports = false;
        this.firstGrid = false;
        this.secondGrid = false;
        this.blnchargeCaptureGridRec = false;
        this.blndgrdAvailableRec = false;
    }
    async onSendMailIconClick(event) {
        try {
            this.isMailDialog = true;
            this.toMailAddr = '';
        } catch (ex) {
            this.clientErrorMsg(ex);
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

            let selRows = this.lstChargeCaptureGrid.filter(a => a.LotID != '' || a.SerialID != '');
            let selRowsOnhand = this.lstDgrdAvailable.filter(a => a.LotID != '' || a.SerialID != '');
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
            if (1 == 1) {


                htmlBuilder = "<Table align=center width=90% cellpadding=0 cellspacing = 0 vAlign=top>"

                if (reqType=="excel") {
                    htmlBuilder += "<TR height=63><TD align=left colspan=2><IMG height=63 width=18% src=" + imgserverPath + "logo.jpg title=Atpar 3><img src=" + imgserverPath + "topbg.jpg width=82% height=63></TD></tr></table>";
                    htmlBuilder +=  "<table width=90% align=center><tr></tr><tr></tr>"
                }
                else {
                    if (reqType == "Send") {
                        htmlBuilder += "<TR width='100%'  height='27px'><td colspan=2 align=left bgcolor='#fe9836' width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg></td><td align=left  width='85%' height='63' nowrap></td></TR>"
                    } else {
                        htmlBuilder += "<TR height=63><TD align=left colspan=2><IMG height=63 width=18% src=" + imgserverPath + "logo.jpg title=Atpar 3><img src=" + imgserverPath + "topbg.jpg width=82% height=63></TD></tr>"
                    }
                }
                htmlBuilder += "<TR><TD height=27 colspan=2 vAlign=bottom width=260 align=left><font size=1 style=" + "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Point Of Use<B></FONT></TD>";
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>" +
                "<tr><td colspan=3 align=left><span class=c3><b>Lot/Serial Tracking Report </b></span></td><td align=right valign=top>&nbsp;"

                if (reqType=="print"){
                    htmlBuilder += "<A  href='javascript:window.print();'><img src=" + imgserverPath + "print.jpg>";
                }
                htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr></table>";
                if(selRows.length){

                htmlBuilder += "<table align=center width=90%><tr><td align=left><b>Issued</b></td></tr></table>"
                htmlBuilder += "<table align=center width=90% style=" + "BORDER-COLLAPSE:collapse" +" border=1><tr bgcolor=#d3d3d3><td align=center nowrap><span class=c3><b>Date Time</b></span></td>" +
                "<td align=center nowrap><span class=c3><b>Item ID - Description</b></span></td>" +
                "<td align=center nowrap><span class=c3><b>Lot #</b></span></td>" +
                "<td align=center nowrap><span class=c3><b>Serial #</b></span></td>" +
                "<td align=center nowrap><span class=c3><b>Patient Name  - </BR> ID / Account #</b></span></td></tr>"
                let i: number

                if (reqType == "print" || reqType == "Send" ){
                        for (let index in selRows) {
                            htmlBuilder += "<tr><td align=left><span class=" + "c3" + ">" + selRows[index].DateTime + "</span></td>" +
                            "<td align=left><span class=c3>" +selRows[index].ItemID_Descr + " </span></td>" +
                            "<td align=left><span class=c3>" +selRows[index].LotID + " </span></td>" +
                            "<td align=left><span class=c3>" +selRows[index].SerialID + " </span></td>" +
                            "<td align=left><span class=c3>" +selRows[index].Patient+ " </span></td></tr>"
                        }
                }
                else if (reqType=="excel")  {
                        for (let index in selRows) {
                            htmlBuilder += "<tr><td align=left><span class=" + "c3"+ ">" + "'" + selRows[index].DateTime +"</span></td>" +
                                "<td align=left><span class=c3>" + "'" + selRows[index].ItemID_Descr +" </span></td>"+
                                "<td align=left><span class=c3>" + selRows[index].LotID + " </span></td>" +
                                "<td align=left><span class=c3>" + selRows[index].SerialID + " </span></td>" +
                                "<td align=left><span class=c3>" + selRows[index].Patient + " </span></td></tr>"
                        }
                    }
                    htmlBuilder += "</table>"
                }
                if (selRowsOnhand.length > 0) {

                    htmlBuilder += "<table align=center width=90%><tr><td align=left><b>On hand</b></td></tr></table>"
                    htmlBuilder += "<table align=center width=90% style=" + "BORDER-COLLAPSE:collapse" + " border=1><tr bgcolor=#d3d3d3>" +
                        "<td align=center nowrap><span class=c3><b>Item ID - Description</b></span></td>" +
                        "<td align=center nowrap><span class=c3><b>Lot #</b></span></td>" +
                        "<td align=center nowrap><span class=c3><b>Serial #</b></span></td>" +
                        "<td align=center nowrap><span class=c3><b>Location / Bin </BR> Location / Quantity</b></span></td></tr>"

                    if (reqType == "print"  || reqType == "Send") {
                        for (let selRowOnhand in selRowsOnhand) {
                            htmlBuilder += "<tr><td align=left><span class=" + "c3" + ">" + selRowsOnhand[selRowOnhand].ItemID_Descr + "</span></td>" +
                                "<td align=left><span class=c3>" + selRowsOnhand[selRowOnhand].LotID + " </span></td>" +
                                "<td align=left><span class=c3>" + selRowsOnhand[selRowOnhand].SerialID + " </span></td>" +
                                "<td align=left><span class=c3>" + selRowsOnhand[selRowOnhand].Location + " </span></td></tr>"
                        }
                    }
                    else if (reqType=="excel")  {
                        for (let selRowOnhand in selRowsOnhand) {
                            htmlBuilder += "<tr><td align=left><span class=" + "c3" + ">" + "'" + selRowsOnhand[selRowOnhand].ItemID_Descr + "</span></td>" +
                                "<td align=left><span class=c3>" + selRowsOnhand[selRowOnhand].LotID + " </span></td>" +
                                "<td align=left><span class=c3>" + selRowsOnhand[selRowOnhand].SerialID + " </span></td>" +
                                "<td align=left><span class=c3>" + selRowsOnhand[selRowOnhand].Location + " </span></td></tr>"
                        }
                    }
                    htmlBuilder += "</table>"

                }

            }

            return await htmlBuilder;


        }
        catch (ex) {
            htmlBuilder = '';
            return htmlBuilder;
        }
    }
    async onExportToExcelClick(event) {
        try {
            event.stopImmediatePropagation();
            this.spinnerService.start();
            let html: string = await this.exportReportDetails('excel');
       
            let blob = new Blob([html], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
            });
            saveAs(blob, "LotSerailTrackingReport.xls");

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop();
        }
    }
    async onPrintClick(event) {
        try {
            event.stopImmediatePropagation();
            this.spinnerService.start();
            var html = await this.exportReportDetails('print');
            if (html != '' && html != null) {
                var mywindow = window.open('', null, 'height=650,width=650,status=no,resizable=yes, scrollbars=yes, toolbar=no,location=center,menubar=no');        
                if (mywindow != null && mywindow != undefined) {

                    mywindow.document.write('<html><head><title>' + 'Point Of Use - LotSerial Tracking Report' + '</title>');
                    mywindow.document.write('</head><body >');
                    mywindow.document.write(html);
                    mywindow.document.write('</body></html>');

                    mywindow.document.close(); // necessary for IE >= 10
                    mywindow.focus(); // necessary for IE >= 10*/

                    //mywindow.print();
                    //mywindow.close();

                    return true;
                }
                else {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please set allow pop-ups for this site in your browser' });
                }
            }
        } catch (ex) {
            this.clientErrorMsg(ex);
            return false;
        }
        finally {
            this.spinnerService.stop();
        }
    }
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    closeMailPopup() {
        this.growlMessage = [];
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
            let html: string = await this.exportReportDetails('Send');
            let toAddr: string = '';
            this.growlMessage = [];
            this.isMailDialog = false;

            if (html != '' && html != null) {
                await this.atParCommonService.sendEmbeddedEmail(this.deviceTokenEntry[TokenEntry_Enum.SystemId], 'LotSerial Tracking Report', JSON.stringify(html), this.toMailAddr, '', 'false', MailPriority.Normal.toString(), '')
                    .catch(this.httpService.handleError)
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
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Please Enter To Email Address' });
                }
                else if (this.statusCode == AtparStatusCodes.EMAIL_ENTER_SUBJECT) {
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Subject is Missing! Please Contact Administrator' });
                }
                else if (this.statusCode == AtparStatusCodes.EMAIL_ENTER_BODY) {
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Body is Missing! Please contact Administrator' });
                }
                else if (this.statusCode == AtparStatusCodes.EMAIL_SMTP_SERVER_MISSING) {
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Mail Server is Not Configured! Please Contact Administrator' });
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
            this.clientErrorMsg(ex);
        }
        finally {

            this.spinnerService.stop();
        }
    }
    ngOnDestroy() {
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.lstDepartments = [];
        this.spinnerService.stop();
        this.lstChargeCaptureGrid = []
        this.lstDgrdAvailable = [];
        this.spinnerService.stop();
    }    
}