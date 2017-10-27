
import { Component } from '@angular/core';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { Http, Response } from "@angular/http";
import { TokenEntry_Enum, MailPriority, ClientType, StatusType, BusinessType } from '../Shared/AtParEnums';
import { HttpService } from '../Shared/HttpService';
import { Menus } from '../AtPar/Menus/routepath';
import { SelectItem, Message } from './../components/common/api';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { AtParConstants } from '../Shared/AtParConstants';
import { MT_POU_PHYSICIAN } from "../entities/mt_pou_physician";
import { VM_POU_PREF_CARD_OPTIMIZATION } from "../entities/VM_POU_PREF_CARD_OPTIMIZATION";
import { VM_POU_REASON_PROC_COST_CASE_SPEC_CODES } from "../Entities/VM_POU_REASON_PROC_COST_CASE_SPEC_CODES";
import { PrefCardOptimizationReportService } from './pou-pref-card-optimization-report.service';
import { saveAs } from 'file-saver';

import { SSL_CONFIG_DETAILS } from '../Entities/SSL_CONFIG_DETAILS';



declare var module: {
    id: string;
}

@Component({
    templateUrl: 'pou-pref-card-optimization-report.component.html',
    providers: [HttpService, AtParCommonService, AtParConstants, PrefCardOptimizationReportService]
})

export class PrefCardOptimizationReportComponent {

    deviceTokenEntry: string[] = [];
    gstrServerName: string = "";
    isMailDialog: boolean = false;
    gstrProtocal: string = "";
    toMailAddr: string = '';
    gstrPortNo: string = "";
    ipAddress: string = " ";
    startIndex: number;
    EndIndex: number;
    blnsortbycolumn: boolean = true;
    tdExports: boolean = false;
    custom: string = "custom";
    breadCrumbMenu: Menus;
    pazeSize: number;
    growlMessage: Message[] = [];
    defDateRange: number = 0;
    selectedProcedure: string = "";
    selectedPhysician: string;
    bindLabelData: string = "";
    showGrid: boolean = false;
    statusCode: number = -1;
    fromDate: Date;
    toDate: Date;
    date1: Date;
    date2: Date;
    minDateValue1: Date = new Date();
    minDateValue2: Date;
    strCode: string = "";
    strDescr: string = "";
    lblTotalSavings: any = 0;

    selectedPhysicianValue: string = "";
    selectedProcedureValue: string = "";
    strProcedureCode: string = "procedures";
    lstFilteredPhysicians: any = [];
    lstFilteredPhysiciansList: any = [];
    lstPhysicians: MT_POU_PHYSICIAN[];
    lstFilteredProcedures: VM_POU_REASON_PROC_COST_CASE_SPEC_CODES[];
    lstFilteredProceduresItems: VM_POU_REASON_PROC_COST_CASE_SPEC_CODES[];
    lstDBData: VM_POU_PREF_CARD_OPTIMIZATION[] = [];




    public constructor(

        private spinnerService: SpinnerService,
        public atParCommonService: AtParCommonService,
        private httpService: HttpService,
        private atParConstant: AtParConstants,
        public prefCardOptimizationReportService: PrefCardOptimizationReportService
    ) {
        this.breadCrumbMenu = new Menus();
    }

    async  ngOnInit() {



        this.startIndex = + sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.statusCode = await this.getDefDateRange();
        this.pazeSize = +this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        if (this.statusCode == AtparStatusCodes.E_SERVERERROR) {
            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Failed to get Default data range" });
            return;
        }
        this.lblTotalSavings = 0;
        this.fromDate = new Date();
        this.fromDate = await this.addDays(this.fromDate, this.defDateRange);
        this.toDate = new Date();
        this.spinnerService.stop();


    }


    async fillProceduresAuto(event) {
        this.lstFilteredProceduresItems = [];
        this.lstFilteredProcedures = [];
        let query = event.query;
        try {
            await this.atParCommonService.getCodes(this.strProcedureCode, this.strCode, this.strDescr).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<VM_POU_REASON_PROC_COST_CASE_SPEC_CODES>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.lstFilteredProceduresItems = data.DataList;
                            this.lstFilteredProcedures = this.filterProcedureCodesItems(query, this.lstFilteredProceduresItems);
                            break;
                        }
                        case StatusType.Warn: {
                            if (data.DataList.length == 0 && data.StatusCode === 1102002) {
                                this.growlMessage = [];
                            }
                            else {
                                this.growlMessage = [];
                                this.showGrid = false;
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            }
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }

                });

        }
        catch (ex) {
            this.clientErrorMsg(ex, "fillProceduresAuto");
        }
    }

    filterProcedureCodesItems(query, items: any[]) {
        let filtered : any[] = [];

        if (query == "%") {
            for (let i = 0; i < items.length; i++) {
                let itemValue = items[i];
                if (items[i].CODE !== "") {
                    let itemValue = items[i].CODE + " - " + items[i].DESCRIPTION;
                    filtered.push(itemValue);
                }

            }
        }
        else {
            if (query.length >= 0) {
                for (let i = 0; i < items.length; i++) {
                    if (items[i].CODE.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        if (items[i].CODE !== "") {
                            let itemValue = items[i].CODE + " - " + items[i].DESCRIPTION;
                            filtered.push(itemValue);
                        }

                    }
                }
            }
        }
        return filtered;
    }

    async fillPhysiciansAuto(event) {

        this.lstFilteredPhysicians = [];
        this.lstFilteredPhysiciansList = [];
        let query = event.query;
        try {

            await this.atParCommonService.getPhysicians().
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_POU_PHYSICIAN>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.lstPhysicians = data.DataList;
                            this.lstFilteredPhysiciansList = this.filterPhysicianItems(query, this.lstPhysicians)
                            this.lstFilteredPhysicians = [];
                            for (let i = 0; i <= this.lstFilteredPhysiciansList.length - 1; i++) {
                                this.lstFilteredPhysicians[i] = this.lstFilteredPhysiciansList[i].PHYSICIAN_ID + " - " + this.lstFilteredPhysiciansList[i].FIRST_NAME + " " + this.lstFilteredPhysiciansList[i].MIDDLE_INITIAL + " " + this.lstFilteredPhysiciansList[i].LAST_NAME;
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            if (data.DataList.length == 0 && data.StatusCode === 1102002) {
                                this.growlMessage = [];
                            }
                            else {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            }
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }

                });

        }
        catch (ex) {
            this.clientErrorMsg(ex, "fillPhysiciansAuto");
        }
    }

    filterPhysicianItems(query, items: any[]) {
        let filtered : any[] = [];

        if (query == "%") {
            for (let i = 0; i < items.length; i++) {
                let itemValue = items[i];
                if ((filtered.filter(x => x.PHYSICIAN_ID == itemValue.PHYSICIAN_ID)).length == 0) {
                    filtered.push(itemValue);
                }
            }
        }
        else {
            if (query.length >= 0) {
                for (let i = 0; i < items.length; i++) {
                    let itemValue = items[i];
                    if (itemValue.PHYSICIAN_ID.toLowerCase().indexOf(query.toLowerCase()) == 0 ||
                        itemValue.FIRST_NAME.toLowerCase().indexOf(query.toLowerCase()) == 0 ||
                        itemValue.MIDDLE_INITIAL.toLowerCase().indexOf(query.toLowerCase()) == 0 ||
                        itemValue.LAST_NAME.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        if ((filtered.filter(x => x.PHYSICIAN_ID == itemValue.PHYSICIAN_ID ||
                            x.FIRST_NAME == itemValue.FIRST_NAME ||
                            x.MIDDLE_INITIAL == itemValue.MIDDLE_INITIAL ||
                            x.LAST_NAME == itemValue.LAST_NAME)).length == 0) {
                            filtered.push(itemValue);
                        }
                    }
                }
            }
        }
        return filtered;
    }

    async getDefDateRange() {
        try {
            await this.atParCommonService.GetMyPreferences("DEFAULT_REPORT_DURATION", this.deviceTokenEntry[TokenEntry_Enum.UserID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<string>;
                    this.growlMessage = [];
                    if (data.StatType == StatusType.Success) {
                        this.defDateRange = parseInt(data.DataVariable.toString());
                    }
                    this.statusCode = data.StatusCode;
                    if (data.StatType == StatusType.Error) {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Failed to get Default data range" });
                        return;
                    }
                });
            return await this.statusCode;

        }
        catch (ex) {
            return await AtparStatusCodes.E_SERVERERROR;
        }
    }


    addDays(theDate, days) {
        return new Date(theDate.getTime() - days * 24 * 60 * 60 * 1000);
    }

    onfocusFromCalendar(e) {
        localStorage.removeItem("FromDate");
        this.date1 = null;
    }

    onfocusToCalendar(e) {
        this.date2 = null;
        if (this.date1 == null) {
            this.minDateValue2 = new Date();
        } else {
            this.minDateValue2 = this.date1;
        }
    }

    async getPrefCardOptimizationData() {


        let returnValue: boolean = false;

        returnValue = await this.validateSearchFields();

        if (returnValue) {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: 'Getting data....' });
            await this.bindDataGrid();
        }


    }

    async bindDataGrid() {
        let frmDate = this.convert(this.fromDate);
        let CDate = new Date();
        CDate.setDate(this.toDate.getDate() + 1);
        let todate = this.convert(CDate);
        let templblTotalSavings: any = 0;
        let tmp: string = '';
        this.selectedPhysicianValue = (this.selectedPhysician == null || this.selectedPhysician == undefined) ? "" : this.selectedPhysician.split("-")[0].trim();
        this.selectedProcedureValue = this.selectedProcedure.split("-")[0].trim();

        if (this.selectedProcedure == null || this.selectedProcedure == undefined || this.selectedProcedure == "") {

            this.showGrid = false;
            this.tdExports = false;
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Procedure code is mandatory" });
            return;
        }
        try {
            this.spinnerService.start();
            await this.prefCardOptimizationReportService.getPrefCardOptimizationRpt(frmDate, todate, this.selectedProcedureValue, this.selectedPhysicianValue
            ).catch(this.httpService.handleError).then((res: Response) => {
                let data = res.json();
                this.spinnerService.stop();
                this.growlMessage = [];

                switch (data.StatType) {
                    case StatusType.Success: {
                        if (data.DataDictionary["listPrefCardOptimization"].length > 0) {
                            this.showGrid = true;
                            this.tdExports = true;
                            this.bindLabelData = data.DataDictionary["Count"];
                            this.lstDBData = data.DataDictionary["listPrefCardOptimization"];
                            templblTotalSavings = 0;
                            this.lstDBData.forEach(x => {
                                x.ITEMCOST = parseFloat(x.ITEMCOST).toFixed(2);
                                x.CURRENTOPENQTY = parseFloat(x.CURRENTOPENQTY).toFixed(2);
                                x.CURRENTHOLDQTY = parseFloat(x.CURRENTHOLDQTY).toFixed(2);
                                x.MAXUSAGE = parseFloat(x.MAXUSAGE).toFixed(2);
                                x.MINUSAGE = parseFloat(x.MINUSAGE).toFixed(2);
                                x.MEANUSAGE = parseFloat(x.MEANUSAGE).toFixed(2);
                                x.OPENQTY = parseFloat(x.OPENQTY).toFixed(2);
                                x.HOLDQTY = parseFloat(x.HOLDQTY).toFixed(2);
                                x.VARIANCE = parseFloat(x.VARIANCE).toFixed(2);
                                x.VARIANCE_PERCENTAGE = parseFloat(x.VARIANCE_PERCENTAGE).toFixed(2);
                                templblTotalSavings = templblTotalSavings + x.SAVINGS;
                                x.SAVINGS = parseFloat(x.SAVINGS).toFixed(2);

                            });
                            this.lblTotalSavings = parseFloat(templblTotalSavings).toFixed(2);

                        }
                        else {
                            this.showGrid = false;
                            this.tdExports = false;
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                        }
                        break;
                    }
                    case StatusType.Warn: {
                        this.showGrid = false;
                        this.tdExports = false;
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
            this.clientErrorMsg(ex, "getPrefCardOptimizationData");
        }

    }

    convert(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [mnth, day , date.getFullYear()].join("/");
    }

    validateSearchFields() {
        try {
            this.growlMessage = [];

            if (this.fromDate == null || this.fromDate.toString() == '' || this.toDate == null || this.toDate.toString() == '') {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please select a valid date range' });
                return false;
            }
            else if (Date.parse(this.fromDate.toString()) && Date.parse(this.toDate.toString())) {
                if (Date.parse(this.convert(this.fromDate)) > Date.parse(this.convert(this.toDate))) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "From Date must be less than or equal to To Date" });
                    return false;
                }

            }
            else {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Dates' });
                return false;
            }
            return true;

        } catch (ex) {
            this.clientErrorMsg(ex, "validateSearchFields");
            return false;
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
            this.isMailDialog = false;
            let html: string = await this.ExportReportDetails('Mail');
            let toAddr: string = '';



            if (html != '' && html != null) {
                await this.atParCommonService.sendEmail(this.deviceTokenEntry[TokenEntry_Enum.SystemId], 'Pref Card Optimization Report', JSON.stringify(html), this.toMailAddr, MailPriority.Normal.toString(), '')
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

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    async onPrintClick(event) {
        try {
            event.stopImmediatePropagation();
            this.spinnerService.start();
            var html = await this.ExportReportDetails('Print');
            
                
                if (html != '' && html != null) {

                    var mywindow = window.open('', null, 'height=600,width=600,resizable=yes, scrollbars=yes, toolbar=no,location=center,menubar=no');
                    if (mywindow != null && mywindow != undefined) {
                        mywindow.document.write('<html><head><title>' + 'Point Of Use - Pref Card Performance Details Report' + '</title>');
                        mywindow.document.write('</head><body >');
                        mywindow.document.write(html);
                        mywindow.document.write('</body></html>');

                        mywindow.document.close(); // necessary for IE >= 10
                        mywindow.focus(); // necessary for IE >= 10*/

                        //mywindow.print();
                        //mywindow.close();
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

    async onExportToExcelClick(event) {
        try {
            event.stopImmediatePropagation();
            this.spinnerService.start();
            let html: string = await this.ExportReportDetails('Excel');

            if (html != '' && html != null) {
                let blob = new Blob([html], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                });
                saveAs(blob, "PrefCardOptimizationReport.xls");
            }



        } catch (ex) {
            this.clientErrorMsg(ex, 'onExportToExcelClick');
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async ExportReportDetails(reqType: string) {
        let htmlBuilder: string = '';
        try {
            this.statusCode = -1;
            this.growlMessage = [];
            let sbMailText: string;
            let _strFrmDt: string;
            let _strToDt: string;
            let _DS: VM_POU_PREF_CARD_OPTIMIZATION[] = [];
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

            let title: string = '""' + "AtparVersion 2.8" + '""';

            htmlBuilder += "<Table align=left width=90% cellpadding=0 cellspacing = 0 vAlign=top>";

            if (reqType == 'Print') {
                htmlBuilder += "<TR width='100%'><td  align=left  width='15%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=" + title + ">"
                    + "</td><td align=left  width='85%' height=63 nowrap><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td > </TR>"
                htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>Pref Card Optimization Report <b>" + this.convert(this.fromDate) + "</b> and  <b>" + this.convert(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp<tr><td></td></tr>";
                htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "" + "><img src=" + imgserverPath + "print.jpg></A>"
            }

            else if (reqType == 'Excel') {
                htmlBuilder += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=" + title + "><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>"
                htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td></td></tr>"
                htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>Pref Card Optimization Report <b>" + this.convert(this.fromDate) + "</b> and  <b>" + this.convert(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp<tr><td></td></tr>";
                htmlBuilder += "<tr><td colspan=12 align= left><span class=c2></span > </td><td align=right valign=top>&nbsp;"

            }
            else {
                htmlBuilder += "<tr width='100%' ><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height='80px' nowrap><img height='63px' src=" + imgserverPath + "logo.jpg></td></tr>"
                htmlBuilder += "<tr><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE: 8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></font></td>"
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td></td></tr>"
                htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>Pref Card Optimization Report <b>" + this.convert(this.fromDate) + "</b> and  <b>" + this.convert(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp<tr><td></td></tr>";
                htmlBuilder += "<tr><td colspan=12 align= left><span class=c2></span > </td><td align=right valign=top>&nbsp;"

            }

            htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                + "<tr bgcolor=#d3d3d3>"
                + "<td align=center  nowrap><span class=c3><b>Item</b></span></td>"
                + "<td align=center nowrap><span class=c2><b>Item Type</b></span></td>"
                + "<td align=center  nowrap><span class=c3><b>Description</b></span></td>"
                + "<td align=center nowrap><span class=c2><b>Item Cost($)</b></span></td></td>"
                + "<td align=center nowrap><span class=c2><b>Current Open Qty</b></span></td>"
                + "<td align=center nowrap><span class=c2><b>Current Hold Qty</b></span></td>"
                + "<td align=center nowrap><span class=c2><b>Max Usage</b></span></td>"
                + "<td align=center nowrap><span class=c2><b>Min Usage</b></span></td>"
                + "<td align=center nowrap><span class=c2><b>Mean Usage</b></span></td>"
                + "<td align=center nowrap><span class=c2>"
                + "<table align=left width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                + "<tr><td align=center nowrap colspan=2><span class=c2><b>Suggested Pref Qty</b></td></tr>"
                + "<tr><td align=center nowrap><b>Open Qty</b></td><td align=center nowrap><b>Hold Qty</b></td></tr>"
                + "</table>"
                + "</td>"
                + "<td align=center nowrap><span class=c2><b>Variance</b></span></td>"
                + "<td align=center nowrap><span class=c2><b>Variance%</b></span></td>"
                + "<td align=center nowrap><span class=c2><b>Savings($)</b></span></td>"
                + "</tr>";
            //For Execl
            if (reqType == 'Excel') {
                await this.lstDBData.forEach(header => {
                    htmlBuilder += "<tr>"
                        + "<td align=left nowrap> <span class=c2>" + "'" + header.ITEM + "</span></td>"
                        + "<td align=left nowrap >" + header.ITEMTYPE + "</td>"
                        + "<td align=left nowrap nowrap >"+ header.DESCRIPTION + "</td>"
                        + "<td align=left nowrap nowrap> <span class=c2>" + "'" + header.ITEMCOST + "</span></td>"
                        + "<td align=right nowrap nowrap> <span class=c2>" + "'" + header.CURRENTOPENQTY + "</span></td>"
                        + "<td align=right nowrap nowrap> <span class=c2>" + "'" + header.CURRENTHOLDQTY.toString() + "</span></td>"
                        + "<td align=right nowrap nowrap> <span class=c2>" + "'" + header.MAXUSAGE + "</span></td>"
                        + "<td align=right nowrap nowrap> <span class=c2>" + "'" + header.MINUSAGE + "</span></td>"
                        + "<td align=right nowrap nowrap> <span class=c2>" + "'" + header.MEANUSAGE + "</span></td>"

                        + "<td align=right nowrap><span class=c2>"
                        + "<table align=left width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                        + "<tr>"
                        + "<td align= right nowrap> <span class=c2> " + "'" + header.OPENQTY + "</span></td>"
                        + "<td align= right nowrap> <span class=c2> " + "'" + header.HOLDQTY + "</span></td>"
                        + "</tr>"
                        + "</table>"
                        + "</td>"
                        + "<td align=right nowrap><span class=c2>" + header.VARIANCE + "</span></td>"
                        + "<td align=right nowrap><span class=c2>" + header.VARIANCE_PERCENTAGE + "</span></td>"
                        + "<td align=right nowrap><span class=c2>" + header.SAVINGS + "</span></td>"
                        + "</tr>";
                });

                htmlBuilder += "<tr>"
                    + "<td align=left nowrap><span class=c2></span></td>"
                    + "<td align=left nowrap><span class=c2></span></td>"
                    + "<td align=left nowrap><span class=c2></span></td>"
                    + "<td align=left nowrap><span class=c2></span></td>"
                    + "<td align=left nowrap><span class=c2></span></td>"
                    + "<td align=left nowrap><span class=c2></span></td>"
                    + "<td align=left nowrap><span class=c2></span></td>"
                    + "<td align=left nowrap><span class=c2></span></td>"
                    + "<td align=left nowrap><span class=c2></span></td>"
                    + "<td align=left nowrap><span class=c2></span></td>"
                    + "<td align=left nowrap><span class=c2></span></td>"
                    + "<td align=right nowrap><span class=c2><b>Total Savings($)</b></span></td>"
                    + "<td align=right nowrap><span class=c2>" + "'"+ this.lblTotalSavings + "</span></td>"
                    + "</tr>"
                htmlBuilder += "</table></td></tr></Table>";
            }
            //For Print and Mail
            else {
                await this.lstDBData.forEach(header => {
                    htmlBuilder += "<tr>"
                        + "<td align=left nowrap> <span class=c2>" + header.ITEM + "</span></td>"
                        + "<td align=left nowrap >" + header.ITEMTYPE + "</td>"
                        + "<td align=left nowrap nowrap >" + header.DESCRIPTION + "</td>"
                        + "<td align=left nowrap nowrap> <span class=c2>"   + header.ITEMCOST + "</span></td>"
                        + "<td align=right nowrap nowrap> <span class=c2>"  + header.CURRENTOPENQTY + "</span></td>"
                        + "<td align=right nowrap nowrap> <span class=c2>"  + header.CURRENTHOLDQTY.toString() + "</span></td>"
                        + "<td align=right nowrap nowrap> <span class=c2>"  + header.MAXUSAGE + "</span></td>"
                        + "<td align=right nowrap nowrap> <span class=c2>"  + header.MINUSAGE + "</span></td>"
                        + "<td align=right nowrap nowrap> <span class=c2>"  + header.MEANUSAGE + "</span></td>"

                        + "<td align=right nowrap><span class=c2>"
                        + "<table align=left width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                        + "<tr>"
                        + "<td align= right nowrap> <span class=c2> "  + header.OPENQTY + "</span></td>"
                        + "<td align= right nowrap> <span class=c2> "  + header.HOLDQTY + "</span></td>"
                        + "</tr>"
                        + "</table>"
                        + "</td>"
                        + "<td align=right nowrap><span class=c2>" + header.VARIANCE + "</span></td>"
                        + "<td align=right nowrap><span class=c2>" + header.VARIANCE_PERCENTAGE + "</span></td>"
                        + "<td align=right nowrap><span class=c2>" + header.SAVINGS + "</span></td>"
                        + "</tr>";
                });

                htmlBuilder += "<tr>"
                    + "<td align=left nowrap><span class=c2></span></td>"
                    + "<td align=left nowrap><span class=c2></span></td>"
                    + "<td align=left nowrap><span class=c2></span></td>"
                    + "<td align=left nowrap><span class=c2></span></td>"
                    + "<td align=left nowrap><span class=c2></span></td>"
                    + "<td align=left nowrap><span class=c2></span></td>"
                    + "<td align=left nowrap><span class=c2></span></td>"
                    + "<td align=left nowrap><span class=c2></span></td>"
                    + "<td align=left nowrap><span class=c2></span></td>"
                    + "<td align=left nowrap><span class=c2></span></td>"
                    + "<td align=left nowrap><span class=c2></span></td>"
                    + "<td align=right nowrap><span class=c2><b>Total Savings($)</b></span></td>"
                    + "<td align=right nowrap><span class=c2>"+ this.lblTotalSavings + "</span></td>"
                    + "</tr>"
                htmlBuilder += "</table></td></tr></Table>";
            }
           
            return htmlBuilder;
        }
        catch (ex) {
            this.clientErrorMsg(ex, 'ExportReportDetails');

        }
    }

   
    ngOnDestroy() {
        this.deviceTokenEntry = null;
        this.lstFilteredPhysicians = null;

        this.lstFilteredPhysiciansList = null;
        this.lstPhysicians = null;
        this.lstFilteredProcedures = null;

        this.lstDBData = null;
        this.lblTotalSavings = null;
        this.lstFilteredProceduresItems = null;
        this.growlMessage = null;

    }

    closeMailPopup() {
        this.growlMessage = [];
    }
    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }
}