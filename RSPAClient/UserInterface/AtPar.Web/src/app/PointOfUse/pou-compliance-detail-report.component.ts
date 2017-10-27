import { Component } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute, Params } from '@angular/router';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { Http, Response } from "@angular/http";
import { TokenEntry_Enum, ClientType, StatusType, BusinessType, LocationType } from '../Shared/AtParEnums';
import { HttpService } from '../Shared/HttpService';
import { Menus } from '../AtPar/Menus/routepath';
import { MT_POU_DEPT } from '../entities/mt_pou_dept';
import { SelectItem, Message } from './../components/common/api';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { AtParConstants } from '../Shared/AtParConstants';
import { VM_COMPLIANCE_DETAILS } from "../entities/VM_COMPLIANCE_DETAILS";
import { ParLocationComplianceDetailsReportService } from './pou-compliance-detail-report.service';
import { Physicians_Basedn, MailPriority, EnumApps } from '../Shared/AtParEnums';
import { SSL_CONFIG_DETAILS } from '../Entities/SSL_CONFIG_DETAILS';
import { saveAs } from 'file-saver';
declare var module: {
    id: string;
}

@Component({

    templateUrl: 'pou-compliance-detail-report.component.html',
    providers: [HttpService, AtParCommonService, AtParConstants, ParLocationComplianceDetailsReportService
    ]
})

export class ComplianceDetailReportComponent {
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
    noOfrecordsMsg: any;
    growlMessage: Message[] = [];
    defDateRange: number = 0;
    bindLabelData: string = "";
    showGrid: boolean = false;
    statusCode: number = -1;
    fromDate: Date;
    toDate: Date;
    date1: Date;
    date2: Date;
    minDateValue1: Date = new Date();
    minDateValue2: Date;
    ParLoc: string;
    Department: string;
    option: any;
    data1: any = [];

    lstDept: SelectItem[] = [];
    lstParLoc: SelectItem[] = [];
    strCode: string = "";
    strDescr: string = "";
    lblTotalSavings: any = 0;
    lblTotalRecordCount: any = 0;
    appId: number = 0;
    precDept: string = "";
    lblTotalLostCharges: any = 0;
    lblTempLostCharges: any = 0;
    Mode: string = '';
    frmDate: string = '';
    tdate: string = '';

    lstDBData: VM_COMPLIANCE_DETAILS[] = [];

    public constructor(

        private spinnerService: SpinnerService,
        public atParCommonService: AtParCommonService,
        private httpService: HttpService,
        private atParConstant: AtParConstants,
        public parLocationComplianceDetailsReportService: ParLocationComplianceDetailsReportService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.breadCrumbMenu = new Menus();
    }

    async  ngOnInit() {

        this.startIndex = + sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));

        this.statusCode = await this.getDefDateRange();
        this.pazeSize = +this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        this.appId = 15;

        if (this.statusCode == AtparStatusCodes.E_SERVERERROR) {
            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Failed to get Default data range" });
            return;
        }

        this.fromDate = new Date();
        this.fromDate = await this.addDays(this.fromDate, this.defDateRange);
        this.toDate = new Date();
        await this.bindDropDowns();

        var queryMode;
        this.route.queryParams.subscribe((params: Params) => {
            queryMode = params['mode'];
            this.appId = params['appId'];
            if (queryMode == "Go") {
                this.Mode = queryMode;
                this.Department = params['DeptID'];
                this.ddlDept_SelectedIndexChanged(this.Department);
                this.ParLoc = params['parLoc'];
                this.frmDate = params['fromDate'];
                this.tdate = params['toDate'];
                this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID] = params['OrgID'];
                this.getDataGrid();
               // return;
            }
        });
        
            
        
        //if(this.Mode!='Go')
        //this.spinnerService.stop();
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



    async ddlDept_SelectedIndexChanged(dept) {
        this.ParLoc = ''
        if (this.precDept != dept) {
            this.precDept = dept;
            this.showGrid = false;
            this.tdExports = false;
        }
        if (dept != '') {
            await this.getDeptCartAllocations('', dept, EnumApps.PointOfUse, LocationType.P.toString());
        } else {
            this.lstParLoc = [];
            this.lstParLoc.push({ label: 'Select Loc', value: '' });
            this.ParLoc = '';
        }
    }

    async getDeptCartAllocations(bUnit, deptID, appID, locType) {
        try {
            await this.parLocationComplianceDetailsReportService.getDeptCartAllocations(bUnit, deptID, appID, locType).then((result: Response) => {
                let res = result.json() as AtParWebApiResponse<any>;
                this.growlMessage = [];
                this.lstParLoc = [];

                this.lstParLoc.push({ label: 'Select Loc', value: '' });

                switch (res.StatType) {
                    case StatusType.Success: {

                        for (var i = 0; i < res.DataList.length; i++) {
                            this.lstParLoc.push({ label: res.DataList[i].CART_ID, value: res.DataList[i].CART_ID });
                        }
                        break;
                    }
                    case StatusType.Warn: {
                        this.showGrid = false;
                        this.tdExports = false;
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                        break;
                    }
                    case StatusType.Error: {
                        this.showGrid = false;
                        this.tdExports = false;
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.showGrid = false;
                        this.tdExports = false;
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                        break;
                    }
                }

            });
        } catch (ex) {
            this.clientErrorMsg(ex, 'getDeptCartAllocations');
        }
    }
    async btnGo_Click() {

        let returnValue: boolean = false;

        returnValue = await this.validateSearchFields();

        if (returnValue) {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: 'Getting data....' });
            await this.getDataGrid();
        }


    }

    async getDataGrid() {


        this.showGrid = false;
        this.tdExports = false;

        this.spinnerService.start();
        if (this.Mode != 'Go') {
            let cDate = new Date();
            cDate.setDate(this.toDate.getDate() + 1);

            this.frmDate = this.convertDate(this.fromDate);
            this.tdate = this.convertDate(cDate);
        }
        
        try {
            this.Department = (this.Department == null || this.Department == undefined) ? '' : this.Department;
            this.ParLoc = (this.ParLoc == null || this.ParLoc == undefined) ? '' : this.ParLoc;
            await this.parLocationComplianceDetailsReportService.getComplianceDetails(this.Department, this.ParLoc, '', this.frmDate, this.tdate, this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID], this.appId = 15).catch(this.httpService.handleError).then((res: Response) => {
                let data = res.json() as AtParWebApiResponse<any>;
                this.growlMessage = [];

                switch (data.StatType) {
                    case StatusType.Success: {

                        this.showGrid = true;
                        this.tdExports = true;
                        
                        this.lstDBData = data.DataDictionary["pDSDetails"]["COMPLIANCE_DETAILS"];
                        if (this.lstDBData.length == 0) {
                            this.showGrid = false;
                            this.tdExports = false;
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No records were returned for the search criteria'});
                            this.spinnerService.stop();
                            break;
                        }
                        this.lblTempLostCharges = 0;
                        this.lstDBData.forEach(x => {
                            x.TRANS_DATE = this.convert(x.TRANS_DATE);
                            x.ISSUE_QTY = parseFloat(x.ISSUE_QTY).toFixed(2);
                            x.PRICE = parseFloat(x.PRICE).toFixed(2);
                            x.UN_ACC_QTY = parseFloat(x.UN_ACC_QTY).toFixed(2);
                            this.lblTempLostCharges = this.lblTempLostCharges + x.LOST_CHARGES;
                            x.LOST_CHARGES = parseFloat(x.LOST_CHARGES).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g,  ",");

                        });

                        this.lblTotalLostCharges = parseFloat(this.lblTempLostCharges).toFixed(2);

                        this.noOfrecordsMsg = this.lstDBData.length;
                        this.spinnerService.stop();
                        break;
                    }
                    case StatusType.Warn: {
                        if (data.StatusCode == 1102002) {
                            this.showGrid = false;
                            this.tdExports = false;
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No records were returned for the search criteria' });
                            this.spinnerService.stop();
                            break;
                        }
                        else {
                            this.showGrid = false;
                            this.tdExports = false;
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                       
                    }
                    case StatusType.Error: {
                        this.showGrid = false;
                        this.tdExports = false;
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                        this.spinnerService.stop();
                        break;
                    }
                    case StatusType.Custom: {
                        this.showGrid = false;
                        this.tdExports = false;
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                        this.spinnerService.stop();
                        break;
                    }
                }

            });

        }
        catch (ex) {
            this.clientErrorMsg(ex, 'getDataGrid');
        }
        finally {
            this.spinnerService.stop();
        }

    }


    async bindDropDowns() {
        try {
            await this.atParCommonService.getDepartment('', '', this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).then((result: Response) => {
                let res = result.json() as AtParWebApiResponse<MT_POU_DEPT>;
                this.growlMessage = [];
                this.lstDept = [];
                this.lstDept.push({ label: 'Select Dept', value: '' });
                this.lstParLoc.push({ label: 'Select Loc', value: '' });
                switch (res.StatType) {
                    case StatusType.Success: {
                        for (var i = 0; i < res.DataList.length; i++) {
                            this.lstDept.push({ label: res.DataList[i].DEPT_ID + " - " + res.DataList[i].DEPT_NAME, value: res.DataList[i].DEPT_ID });
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

            });
        } catch (ex) {
            this.clientErrorMsg(ex, 'bindDropDowns');
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
                await this.atParCommonService.sendEmail(this.deviceTokenEntry[TokenEntry_Enum.SystemId], 'Par Location Compliance Detail Report', JSON.stringify(html), this.toMailAddr, MailPriority.Normal.toString(), '')
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
                    mywindow.document.write('<html><head><title>' + 'Point Of Use - Par Location Compliance Details Report' + '</title>');
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
                saveAs(blob, "ParLocationComplianceDetailsReport.xls");
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
            let _DS: VM_COMPLIANCE_DETAILS[] = [];
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
                htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>Par Location Compliance Detail Report From <b>" + this.convertDate(this.fromDate) + "</b> and  <b>" + this.convertDate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp<tr><td></td></tr>";
                htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "" + "><img src=" + imgserverPath + "print.jpg></A>"
            }

            else if (reqType == 'Excel') {
                htmlBuilder += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=" + title + "><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>"
                htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td></td></tr>"
                htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>Par Location Compliance Detail Report From <b>" + this.convertDate(this.fromDate) + "</b> and  <b>" + this.convertDate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp<tr><td></td></tr>";
                htmlBuilder += "<tr><td colspan=12 align= left><span class=c2></span > </td><td align=right valign=top>&nbsp;"

            }
            else {
                htmlBuilder += "<tr width='100%' ><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height='80px' nowrap><img height='63px' src=" + imgserverPath + "logo.jpg></td></tr>"
                htmlBuilder += "<tr><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE: 8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></font></td>"
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td></td></tr>"
                htmlBuilder += "<tr><td colspan=5 align=left><span class=c2>Par Location Compliance Detail Report From <b>" + this.convertDate(this.fromDate) + "</b> and  <b>" + this.convertDate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp<tr><td></td></tr>";
                htmlBuilder += "<tr><td colspan=12 align= left><span class=c2></span > </td><td align=right valign=top>&nbsp;"

            }

            htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                + "<tr bgcolor=#d3d3d3>"
                + "<td align=center nowrap><span class=c3><b>TransactionDate</b></span></td>"
                + "<td align=center nowrap><span class=c3><b>Item ID</b></span></td>"
                + "<td align=center nowrap><span class=c3><b>Item Description</b></span></td>"
                + "<td align=center nowrap><span class=c3><b>Item Price($)</b></span></td>"
                + "<td align=center nowrap><span class=c3><b>Issue Qty</b></span></td>"
                + "<td align=center nowrap><span class=c3><b>Un accounted Quantity</b></span></td>"
                + "<td align=center nowrap><span class=c3><b>Lost Charges($)</b></span></td>"
                + "</tr>";

            if (reqType == 'Excel') {
                await this.lstDBData.forEach(header => {
                    htmlBuilder += "<tr>"
                        + "<td align=left nowrap><span class=c3>" + "'" + header.TRANS_DATE + "</span></td>"
                        + "<td align=left nowrap><span class=c3>" + "'" + header.ITEM_ID + "</span></td>"
                        + "<td align=right nowrap><span class=c3>"+ header.ITEM_DESCR + "</span></td>"
                        + "<td align=right nowrap><span class=c3>" + "'" + header.PRICE + "</span></td>"
                        + "<td align=right nowrap><span class=c3>" + "'" + header.ISSUE_QTY + "</span></td>"
                        + "<td align=right nowrap><span class=c3>" + "'" + header.UN_ACC_QTY + "</span></td>"
                        + "<td align=right nowrap><span class=c3>" + "'" + header.LOST_CHARGES + "</span></td>"
                        + "</tr>";
                });
                htmlBuilder += "<tr><td colspan=5></td><td align=center><span class=c3> <b>Total Lost Charges:</b></span></td><td align=right><span class=c3>" + "'"  + "$ " + this.lblTotalLostCharges + "</span></td></tr>";
            }
            else {
                await this.lstDBData.forEach(header => {
                    htmlBuilder += "<tr>"
                        + "<td align=left nowrap><span class=c3>" + header.TRANS_DATE + "</span></td>"
                        + "<td align=left nowrap><span class=c3>" + header.ITEM_ID + "</span></td>"
                        + "<td align=right nowrap><span class=c3>" + header.ITEM_DESCR + "</span></td>"
                        + "<td align=right nowrap><span class=c3>" + header.PRICE + "</span></td>"
                        + "<td align=right nowrap><span class=c3>" + header.ISSUE_QTY + "</span></td>"
                        + "<td align=right nowrap><span class=c3>" + header.UN_ACC_QTY + "</span></td>"
                        + "<td align=right nowrap><span class=c3>" + header.LOST_CHARGES + "</span></td>"
                        + "</tr>";
                });
                htmlBuilder += "<tr><td colspan=5></td><td align=center><span class=c3> <b>Total Lost Charges:</b></span></td><td align=right><span class=c3>" + "$ " + this.lblTotalLostCharges + "</span></td></tr>";
            }


            htmlBuilder += "</table>";
            return htmlBuilder;
        }
        catch (ex) {
            this.clientErrorMsg(ex, 'ExportReportDetails');

        }
    }

    convertDate(str) {
        
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2)
       return [mnth, day, date.getFullYear()].join("/");
    }
    convert(str) {
        //var converteddate;
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2),
            hours = ("0"+date.getHours()).slice(-2),
            minuts = ("0" + date.getMinutes()).slice(-2),
            seconds = ("0" + date.getSeconds()).slice(-2)
        // converteddate = [mnth, day, date.getFullYear()].join("/") +" "+[hours, minuts, seconds].join(":");

        return [mnth, day, date.getFullYear()].join("/") + " " + [hours, minuts, seconds].join(":");
    }

    convertTimeFormat(strDate)  {
               var  date  =  new  Date(strDate),
                       hours  =  date.getHours(),
                       minuts  =  date.getMinutes();
               return  [hours,  minuts].join(":");
    }

    closeMailPopup() {
        this.growlMessage = [];
    }

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    ngOnDestroy() {
        this.deviceTokenEntry = null;
        this.lstDBData = null;
        this.lblTotalSavings = null;
        this.growlMessage = null;
        this.atParCommonService = null;
        this.atParConstant = null;
        this.bindLabelData = null;
        this.breadCrumbMenu = null;
        this.data1 = null;
        this.date1 = null;
        this.bindLabelData = null;
        this.blnsortbycolumn = null;
        this.defDateRange = null;

    }

}