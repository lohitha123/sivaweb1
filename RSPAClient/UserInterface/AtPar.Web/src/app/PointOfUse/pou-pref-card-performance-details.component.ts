
import { Component } from '@angular/core';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { Http, Response } from "@angular/http";
import { TokenEntry_Enum, ClientType, StatusType, BusinessType } from '../Shared/AtParEnums';
import { HttpService } from '../Shared/HttpService';
import { Menus } from '../AtPar/Menus/routepath';
import { SelectItem, Message } from './../components/common/api';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { AtParConstants } from '../Shared/AtParConstants';
import { VM_POU_PHYSICIANS_BY_PREF_OR_PROC } from "../entities/VM_POU_PHYSICIANS_BY_PREF_OR_PROC";
import { VM_POU_PREF_CARD_PERFORMANCE_DETAILS } from "../entities/VM_POU_PREF_CARD_PERFORMANCE_DETAILS";
import { VM_POU_REASON_PROC_COST_CASE_SPEC_CODES } from "../Entities/VM_POU_REASON_PROC_COST_CASE_SPEC_CODES";
import { PrefCardPerformanceDetailsService } from './pou-pref-card-performance-details.service';
import { Physicians_Basedn, MailPriority } from '../Shared/AtParEnums';
import { saveAs } from 'file-saver';
import { SSL_CONFIG_DETAILS } from '../Entities/SSL_CONFIG_DETAILS';

declare var module: {
    id: string;
}

@Component({
    templateUrl: 'pou-pref-card-performance-details.component.html',
    providers: [HttpService, AtParCommonService, AtParConstants, PrefCardPerformanceDetailsService]
})

export class PrefCardPerformanceDetailsComponent {
    deviceTokenEntry: string[] = [];
    startIndex: number;
    gstrServerName: string = "";
    isMailDialog: boolean = false;
    gstrProtocal: string = "";
    gstrPortNo: string = "";
     ipAddress: string = " ";
    toMailAddr: string = '';
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
    lblAvgusedcost: any = 0;
    Avgusedcost
    selectedPhysicianValue: string = "";
    selectedProcedureValue: string = "";
    strProcedureCode: string = "procedures";
    lstFilteredPhysicians: any = [];
    lstFilteredPhysiciansList: any = [];
    lstPhysicians: VM_POU_PHYSICIANS_BY_PREF_OR_PROC[];
    lstFilteredProcedures: VM_POU_REASON_PROC_COST_CASE_SPEC_CODES[];
    lstFilteredProceduresItems: VM_POU_REASON_PROC_COST_CASE_SPEC_CODES[];
    lstDBData: VM_POU_PREF_CARD_PERFORMANCE_DETAILS[] = [];
    flag: number = 0;



    public constructor(

        private spinnerService: SpinnerService,
        public atParCommonService: AtParCommonService,
        private httpService: HttpService,
        private atParConstant: AtParConstants,
        public prefCardPerformanceDetailsService: PrefCardPerformanceDetailsService
    ) {
        this.breadCrumbMenu = new Menus();
    }

    async  ngOnInit() {


        //this.dataCheckedSorting = new Array<VM_POU_PREF_CARD_OPTIMIZATION>();
        //this.dataUncheckedSorting = new Array<VM_POU_PREF_CARD_OPTIMIZATION>();
        this.startIndex = + sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.statusCode = await this.getDefDateRange();
        this.pazeSize = +this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        if (this.statusCode == AtparStatusCodes.E_SERVERERROR) {
            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Failed to get Default data range" });
            return;
        }
        this.lblAvgusedcost = 0;
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
                //else if (items[i].CODE !== "" && items[i].DESCRIPTION === "") {
                //    let itemValue = items[i].CODE;
                //    filtered.push(itemValue);
                //}
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
                        //else if (items[i].CODE !== "" && items[i].DESCRIPTION === "") {
                        //    let itemValue = items[i].CODE;
                        //    filtered.push(itemValue);
                        //}

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

            await this.atParCommonService.getPhysiciansByPrefOrProc(Physicians_Basedn.PROCEDURE).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<VM_POU_PHYSICIANS_BY_PREF_OR_PROC>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.lstPhysicians = data.DataList;
                            this.lstFilteredPhysiciansList = this.filterPhysicianItems(query, this.lstPhysicians)
                            this.lstFilteredPhysicians = [];
                            for (let i = 0; i <= this.lstFilteredPhysiciansList.length - 1; i++) {
                                this.lstFilteredPhysicians[i] = this.lstFilteredPhysiciansList[i].PHYSICIAN_ID + " - " + this.lstFilteredPhysiciansList[i].FIRST_NAME + " " + this.lstFilteredPhysiciansList[i].MIDDLE_INITIAL + " " + this.lstFilteredPhysiciansList[i].LAST_NAME ;
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
        this.selectedProcedureValue = this.selectedProcedure.split("-")[0].trim();
        if (query == "%") {
            for (let i = 0; i < items.length; i++) {
                let itemValue = items[i];
                if (itemValue.PROCEDURE_CODE == this.selectedProcedureValue)
                    filtered.push(items[i]);
                //if ((items.filter(x => x.PHYSICIAN_ID == itemValue.PHYSICIAN_ID && itemValue.PROCEDURE_CODE == this.selectedProcedureValue))) {
                //    filtered.push(itemValue);
                //}
                
            }
        }
        else {
            if (query.length >= 0) {
                for (let i = 0; i < items.length; i++) {
                    let itemValue = items[i];
                    if (itemValue.PROCEDURE_CODE.toLowerCase().indexOf(query.toLowerCase()) == 0 ){
                        if ((itemValue.PROCEDURE_CODE == this.selectedProcedureValue)) {
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

    async getPrefCardPerformanceDetailsRpt() {


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
      
        
        let cDate = new Date();
        cDate.setDate(this.toDate.getDate() + 1);
        let todate = this.convert(cDate);
        let templblAvgusedcost: any = 0;
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
            await this.prefCardPerformanceDetailsService.getPrefCardPerformanceDetailsRpt(frmDate, todate, this.selectedProcedureValue, this.selectedPhysicianValue
            ).catch(this.httpService.handleError).then((res: Response) => {
                let data = res.json();
                this.spinnerService.stop();
                this.growlMessage = [];

                switch (data.StatType) {
                    case StatusType.Success: {
                        if (data.DataList.length > 0) {
                            this.showGrid = true;
                            this.tdExports = true;
                           
                            this.lstDBData = data.DataList;
                            
                            this.lstDBData.forEach(x => {
                                
                                x.CURRENTITEMCOST = parseFloat(x.CURRENTITEMCOST).toFixed(2);
                                templblAvgusedcost = templblAvgusedcost + x.AVGUSEDCOST;
                                x.AVGUSEDCOST = parseFloat(x.AVGUSEDCOST).toFixed(2);
                                x.AVGQTYRETURNED = parseFloat(x.AVGQTYRETURNED).toFixed(2);
                                x.AVGQTYSUPPLIED = parseFloat(x.AVGQTYSUPPLIED).toFixed(2)
                                x.AVGQTYUSED = parseFloat(x.AVGQTYUSED).toFixed(2);
                               
                                
                            });
                            this.lblAvgusedcost = parseFloat(templblAvgusedcost).toFixed(2);
                            
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
            this.clientErrorMsg(ex,'onSendMailIconClick');
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
                await this.atParCommonService.sendEmail(this.deviceTokenEntry[TokenEntry_Enum.SystemId], 'Pref Card Performance Details Report', JSON.stringify(html), this.toMailAddr, MailPriority.Normal.toString(), '')
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
                saveAs(blob, "PrefCardPerformanceDetails.xls");
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
            let _DS: VM_POU_PREF_CARD_PERFORMANCE_DETAILS[] = [];
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
                htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>Pref Card Performance Details <b>" + this.convert(this.fromDate) + "</b> and  <b>" + this.convert(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp<tr><td></td></tr>";
                htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "" + "><img src=" + imgserverPath + "print.jpg></A>"
            }

            else if (reqType =='Excel') {
                htmlBuilder += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=" + title + "><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>"
                htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td></td></tr>"
                htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>Pref Card Performance Details <b>" + this.convert(this.fromDate) + "</b> and  <b>" + this.convert(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp<tr><td></td></tr>";
                htmlBuilder += "<tr><td colspan=12 align= left><span class=c2></span > </td><td align=right valign=top>&nbsp;"

            }
            else {
                htmlBuilder += "<tr width='100%' ><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height='80px' nowrap><img height='63px' src=" + imgserverPath + "logo.jpg></td></tr>"
                htmlBuilder += "<tr><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE: 8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></font></td>"
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td></td></tr>"
                htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>Pref Card Performance Details <b>" + this.convert(this.fromDate) + "</b> and  <b>" + this.convert(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp<tr><td></td></tr>";
                htmlBuilder += "<tr><td colspan=12 align= left><span class=c2></span > </td><td align=right valign=top>&nbsp;"

            }

            htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                + "<tr bgcolor=#d3d3d3>"
                + "<td align=center nowrap><span class=c3><b>Item</b></span></td>"                
                + "<td align=center nowrap><span class=c3><b>Description</b></span></td>"
                + "<td align=center nowrap><span class=c3><b>Current Item Cost($)</b></span></td>"
                + "<td align=center nowrap><span class=c3><b>Avg Qty Supplied</b></span></td>"
                + "<td align=center nowrap><span class=c3><b>Avg Qty Returned</b></span></td>"
                + "<td align=center nowrap><span class=c3><b>Avg Qty Used</b></span></td>"
                + "<td align=center nowrap><span class=c3><b>Avg Used Cost($)</b></span></td>"               
                + "</tr>";

            if (reqType == 'Excel') {
                await this.lstDBData.forEach(header => {
                    htmlBuilder += "<tr>"
                        + "<td align=left nowrap><span class=c2>" + "'" + header.ITEM + "</span></td>"
                        + "<td align=left nowrap><span class=c2>" + header.DESCRIPTION + "</span></td>"
                        + "<td align=right nowrap><span class=c2>" + "'" + header.CURRENTITEMCOST + "</span></td>"
                        + "<td align=right nowrap><span class=c2>" + "'" + header.AVGQTYSUPPLIED + "</span></td>"
                        + "<td align=right nowrap><span class=c2>" + "'" + header.AVGQTYRETURNED + "</span></td>"
                        + "<td align=right nowrap><span class=c2>" + "'" + header.AVGQTYUSED + "</span></td>"
                        + "<td align=right nowrap><span class=c2>" + "'" + header.AVGUSEDCOST + "</span></td>"
                        + "</tr>";
                });

            }
            else {
                await this.lstDBData.forEach(header => {
                    htmlBuilder += "<tr>"
                        + "<td align=left nowrap><span class=c2>"  + header.ITEM + "</span></td>"
                        + "<td align=left nowrap><span class=c2>"  + header.DESCRIPTION + "</span></td>"
                        + "<td align=right nowrap><span class=c2>" + header.CURRENTITEMCOST + "</span></td>"
                        + "<td align=right nowrap><span class=c2>" + header.AVGQTYSUPPLIED + "</span></td>"
                        + "<td align=right nowrap><span class=c2>" + header.AVGQTYRETURNED + "</span></td>"
                        + "<td align=right nowrap><span class=c2>" + header.AVGQTYUSED + "</span></td>"
                        + "<td align=right nowrap><span class=c2>" + header.AVGUSEDCOST + "</span></td>"
                        + "</tr>";
                });

            }
            
            htmlBuilder += "<tr><td></td><td></td><td></td><td></td><td></td><td></td><td align=right ><b>"+this.lblAvgusedcost
            htmlBuilder += "</b></td > </tr></table></td></tr></Table>";
            return htmlBuilder;
        }
        catch (ex) {
            this.clientErrorMsg(ex,'ExportReportDetails');

        }
    }


    closeMailPopup() {
        this.growlMessage = [];
    }

    ngOnDestroy() {
        this.deviceTokenEntry = null;
        this.lstFilteredPhysicians = null;

        this.lstFilteredPhysiciansList = null;
        this.lstPhysicians = null;
        this.lstFilteredProcedures = null;

        this.lstDBData = null;
        this.lblAvgusedcost = null;
        this.lstFilteredProceduresItems = null;
        this.growlMessage = null;



    }

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

}