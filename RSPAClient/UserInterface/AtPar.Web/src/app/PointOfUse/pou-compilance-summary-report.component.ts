import { Component } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
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
import { VM_POU_PARLOCATION_COMPLIANCE_SUMMARY } from "../entities/VM_POU_PARLOCATION_COMPLIANCE_SUMMARY";
import { ParLocationComplianceSummaryReportService } from './pou-compilance-summary-report.service';
import { Physicians_Basedn, MailPriority, EnumApps } from '../Shared/AtParEnums';
import { SSL_CONFIG_DETAILS } from '../Entities/SSL_CONFIG_DETAILS';
import { saveAs } from 'file-saver';
import { LeftBarAnimationService } from '../Home/leftbar-animation.service';


declare var module: {
    id: string;
}

@Component({

    templateUrl: 'pou-compilance-summary-report.component.html',
    providers: [HttpService, AtParCommonService, AtParConstants, ParLocationComplianceSummaryReportService
    ]
})

export class CompilanceSummaryReportComponent {

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
    label: string[] = [];
    dataSetlabel: string[] = [];
    dataSetbgcolor: string[] = [];
    dataSetbordercolor: string[] = [];
    dataSetdata: number[] = [];
    lstDept: SelectItem[] = [];
    lstParLoc: SelectItem[] = [];
    strCode: string = "";
    strDescr: string = "";
    lblTotalSavings: any = 0;
    lblTotalRecordCount: any = 0;
    appId: number = 0;
    precDept: string = "";




    lstDBData: VM_POU_PARLOCATION_COMPLIANCE_SUMMARY[] = [];
    lstDBtempData: VM_POU_PARLOCATION_COMPLIANCE_SUMMARY[] = [];

    public constructor(
        private leftBarAnimateService: LeftBarAnimationService,
        private spinnerService: SpinnerService,
        public atParCommonService: AtParCommonService,
        private httpService: HttpService,
        private atParConstant: AtParConstants,
        public parLocationComplianceSummaryReportService: ParLocationComplianceSummaryReportService,
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
        this.spinnerService.stop();


    }

    async getDataGrid() {


        this.showGrid = false;
        this.tdExports = false;
        this.spinnerService.start();
        let cDate = new Date();
        cDate.setDate(this.toDate.getDate() + 1);

        let frmDate = this.convert(this.fromDate);
        let todate = this.convert(cDate);

        try {
            this.Department = (this.Department == null || this.Department == undefined) ? '' : this.Department;
            this.ParLoc = (this.ParLoc == null || this.ParLoc == undefined) ? '' : this.ParLoc;
            await this.parLocationComplianceSummaryReportService.getComplianceSummary(frmDate, todate, this.Department, this.ParLoc, this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID], this.appId).catch(this.httpService.handleError).then((res: Response) => {
                let data = res.json() as AtParWebApiResponse<any>;
                this.growlMessage = [];

                switch (data.StatType) {
                    case StatusType.Success: {

                        let bgcolor = "#3391CE";
                        let borderColor = "#1E88E5";
                        let label = "data";

                        this.label = [];
                        this.dataSetbgcolor = [];
                        this.dataSetdata = [];
                        this.dataSetbordercolor = [];

                        this.lstDBtempData = data.DataDictionary["pReturnDS"]["Table1"];
                        this.showGrid = this.lstDBtempData.length == 0 ? false : true;
                        this.tdExports = this.lstDBtempData.length == 0 ? false : true;

                        if (this.showGrid == false && this.tdExports == false) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No records were returned for the search criteria' });
                            this.spinnerService.stop();
                            return;

                        }
                        this.spinnerService.stop();

                        for (let i = 0; i <= this.lstDBtempData.length - 1; i++) {
                            this.label.push(this.lstDBtempData[i].POU_LOC);
                            this.dataSetdata.push(this.lstDBtempData[i].COMPLIANCE);
                            this.dataSetbgcolor.push(bgcolor);
                            this.dataSetbordercolor.push(borderColor);
                        }

                        this.option = {
                            scales: {
                                yAxes: [{
                                    stacked: true,
                                    gridLines: {
                                        display: true,
                                        color: "rgba(255,99,132,0.2)"
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: '%Compliance'

                                    }
                                }],
                                xAxes: [{
                                    gridLines: {
                                        display: false,
                                        color: "rgba(255,99,132,0.2)"
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Par Location'

                                    }
                                }]
                            },
                            title: {
                                display: true,
                                text: "Par Location Compliance Summary"
                            }
                        };

                        this.data1 = {
                            labels: this.label,
                            datasets: [
                                {
                                    label: '',
                                    backgroundColor: this.dataSetbgcolor,
                                    borderColor: this.dataSetbordercolor,
                                    data: this.dataSetdata,
                                    //borderWidth: 1,
                                    //hoverBackgroundColor: "rgba(255,99,132,0.4)",
                                    //hoverBorderColor: "rgba(255,99,132,1)",

                                }
                            ],
                            options: this.option

                        }
                        this.lstDBData = this.lstDBtempData;//.forEach(x => { x.ISSUE_QTY = parseFloat(x.ISSUE_QTY).toFixed(2) });

                        this.lstDBData.forEach(x => {
                            x.ISSUE_QTY = parseFloat(x.ISSUE_QTY).toFixed(2),
                                x.ISSUE_VALUE = parseFloat(x.ISSUE_VALUE).toFixed(2),
                                x.RET_QTY = parseFloat(x.RET_QTY).toFixed(2),
                                x.RET_VALUE = parseFloat(x.RET_VALUE).toFixed(2),
                                x.UN_ACC_QTY = parseFloat(x.UN_ACC_QTY).toFixed(2),
                                x.UN_ACC_VALUE = parseFloat(x.UN_ACC_VALUE).toFixed(2)
                            x.COMPLIANCE = parseFloat(x.COMPLIANCE).toFixed(2),
                                x.DOLLARS_CAPTURED = parseFloat(x.DOLLARS_CAPTURED).toFixed(2)
                        });


                        this.noOfrecordsMsg = this.lstDBtempData.length;

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
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                        this.spinnerService.stop();
                        break;
                    }
                    case StatusType.Custom: {
                        this.showGrid = false;
                        this.tdExports = false;
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

    async ddlDept_SelectedIndexChanged(dept) {
        this.ParLoc = '';
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
            await this.parLocationComplianceSummaryReportService.getDeptCartAllocations(bUnit, deptID, appID, locType).then((result: Response) => {
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


    convert(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [mnth, day , date.getFullYear()].join("/");
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
                await this.atParCommonService.sendEmail(this.deviceTokenEntry[TokenEntry_Enum.SystemId], 'Par Location Compliance Summary Report', JSON.stringify(html), this.toMailAddr, MailPriority.Normal.toString(), '')
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

    async onPrintClick(event) {
        try {
            event.stopImmediatePropagation();
            this.spinnerService.start();
            var html = await this.ExportReportDetails('Print');
           
            if (html != '' && html != null) {

                var mywindow = window.open('', null, 'height=600,width=600,resizable=yes, scrollbars=yes, toolbar=no,location=center,menubar=no');
                if (mywindow != null && mywindow != undefined) {
                    mywindow.document.write('<html><head><title>' + 'Point Of Use - Par Location Compliance Summary Report' + '</title>');
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

    closeMailPopup() {
        this.growlMessage = [];
    }

    async onExportToExcelClick(event) {
        try {
            event.stopImmediatePropagation();
            this.spinnerService.start();
            let html: string = await this.ExportReportDetails('Excel');
            let blob = new Blob([html], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
            });
            saveAs(blob, "ParLocationComplianceSummaryReport.xls");


        } catch (ex) {
            this.clientErrorMsg(ex, 'onExportToExcelClick');
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async onPouLocClick(item: VM_POU_PARLOCATION_COMPLIANCE_SUMMARY) {
        try {


            let cDate = new Date();
            cDate.setDate(this.toDate.getDate() + 1);

            let fromDate = this.convert(this.fromDate);
            let toDate = this.convert(cDate);

            let navigationExtras: NavigationExtras = {
                //relativeTo: this.route
                queryParams: {

                    "mode": 'Go',
                    "parLoc": item.POU_LOC,
                    "DeptID": item.DEPARTMENT_ID,
                    "fromDate": fromDate,
                    "toDate": toDate,
                    "OrgID": this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID],
                    "appId": EnumApps.PointOfUse,

                }

            };
            this.breadCrumbMenu.MENU_NAME = "Par Location Compliance Detail Report";
            this.breadCrumbMenu.ROUTE = 'pointofuse/parlocationcompliancedetailreport';
            this.breadCrumbMenu.SUB_MENU_NAME = '';
            this.breadCrumbMenu.GROUP_NAME = 'Reports & Dashboards';
            this.breadCrumbMenu.APP_NAME = 'Point Of Use';
            this.breadCrumbMenu.IS_DIV = false;
            localStorage.setItem('localBreadCrumb', JSON.stringify(this.breadCrumbMenu));

            var menuItems = JSON.parse(localStorage.getItem('MenuList'));
            for (var i = 0; i < menuItems.length; i++) {
                if ((menuItems[i] as Menus).ROUTE == 'pointofuse/parlocationcompliancedetailreport') {
                    await this.leftBarAnimateService.emitChangeReportaActiveMenu((menuItems[i] as Menus).MENU_NAME.trim());
                    break;
                }
            }

            await this.router.navigate(['atpar/pointofuse/parlocationcompliancedetailreport'], navigationExtras);
        } catch (ex) {
            this.clientErrorMsg(ex, "onPouLocClick");
        }
    }


    async ExportReportDetails(reqType: string) {

        var chartImage = document.getElementById("ChartId") as HTMLCanvasElement;
        var image = chartImage.toDataURL("image/png");
        image = image.replace(/^data:image\/(png|jpg);base64,/, "");
        await this.atParCommonService.saveImage(image, "POUComplianceSummary").
            catch(this.httpService.handleError).then((res: Response) => {
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

        let htmlBuilder: string = '';
        try {
            this.statusCode = -1;
            this.growlMessage = [];
            let sbMailText: string;
            let _strFrmDt: string;
            let _strToDt: string;

            let imgserverPath: string = '';
            let imgParComplianceSummPath: string = '';

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

            // let phyname;

            //imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/PROJ/new/RSPAClient/WebApi/AtParWebApi/Uploaded/';
            imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/AtParWebApi/assets/images/';
            imgParComplianceSummPath = this.httpService.BaseUrl + '/Uploaded/';
            //imgParComplianceSummPath = this.gstrProtocal + '://' + this.ipAddress + '/RSPAClient/WebApi/AtParWebApi/Uploaded/';
            //imgserverPath = "E:/PROJ/new/RSPAClient/WebApi/AtPar.WebApi/Uploaded/";
            let ProductName: string = "Par Location Compliance Summary Report "

            let title: string = '""' + "AtparVersion 2.8" + '""';

            htmlBuilder = "<Table align=center width=90% cellpadding=0 cellspacing = 0 vAlign=top>";

            if (reqType == 'Print') {

                htmlBuilder += "<TR width='100%'><td colspan=2 align=left height=63 nowrap><img width=18% height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=82% height=63></td></TR>";
                htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td></td></tr>";
                htmlBuilder += "<table width=90% align=center>";
                htmlBuilder += "<tr><td colspan=5 align=left><span class=c2> " + ProductName + "<b>" + this.convertDateFormate(this.fromDate) + "  to  " + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp;";
                //htmlBuilder += "<img src=" + imgserverPath + "POUComplianceSummary.png  width=1000 height=400>";
                htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "" + "><img src=" + imgserverPath + "print.jpg></A>"
            }
            else {
                if (reqType == 'Mail') {
                    htmlBuilder += "<tr width='100%' ><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height='80px' nowrap><img height='63px' src=" + imgserverPath + "logo.jpg></td></tr>";
                }
                else {
                    htmlBuilder += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img width=18% height=63 src=" + imgserverPath + "logo.jpg title=Atpar 3><img src=" + imgserverPath + "topbg.jpg width=82% height=63></td></TR>";
                }
                htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>";
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>";
                htmlBuilder += "<tr><td colspan=3 align=left><span class=c2>" + ProductName + "<b>" + this.convertDateFormate(this.fromDate) + "  to  " + this.convertDateFormate(this.toDate) + " </b></span></td><td align=right valign=top>&nbsp;"
            }
            htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr>";
            htmlBuilder += "<tr><td colspan=2 align=center>";
            htmlBuilder += "<table align=center  >";
            htmlBuilder += "<tr bgcolor=#ffffff>";
            if (reqType == 'Mail') {
                htmlBuilder += "<td align=center colspan=9 align=left nowrap width=700 height=250><span class=c3><img src=" + imgParComplianceSummPath + "POUComplianceSummary.png  width=700 height=250></span></td>";
            }
            else {
                htmlBuilder += "<td align=center colspan=9 align=left nowrap width=700 height=250><span class=c3><img src=" + imgParComplianceSummPath + "POUComplianceSummary.png  width=700 height=250></span></td>";
            }
            htmlBuilder += "</tr></table><tr><td>";
            htmlBuilder += "<table border=1 align=left width=99% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>";
            htmlBuilder += "<tr bgcolor=#d3d3d3>";
            htmlBuilder += "<td align=center nowrap><span class=c3><b>Par Location</b></span></td>";
            htmlBuilder += "<td align=center nowrap><span class=c3><b>Issue Quantity</b></span></td>";
            htmlBuilder += "<td align=center nowrap><span class=c3><b>Issue Value ($)</b></span></td>";
            htmlBuilder += "<td align=center nowrap><span class=c3><b>Return Quantity</b></span></td>";
            htmlBuilder += "<td align=center nowrap><span class=c3><b>Return Value ($)</b></span></td>";
            htmlBuilder += "<td align=center nowrap><span class=c3><b>Unaccounted Quantity</b></span></td>";
            htmlBuilder += "<td align=center nowrap><span class=c3><b>Unaccounted Value ($)</b></span></td>";
            htmlBuilder += "<td align=center nowrap><span class=c3><b>% Compliance</b></span></td>";
            htmlBuilder += "<td align=center nowrap><span class=c3><b>% Dollars Captured</b></span></td>";
            htmlBuilder += "</tr>"
            if (reqType == 'Print' || reqType == 'Mail') {
                await this.lstDBData.forEach(header => {
                    htmlBuilder += "<tr>"
                        + "<td align=left nowrap> <span class=c2>" + header.POU_LOC + "</span></td>"
                        + "<td align=right nowrap><span class=c2>" + header.ISSUE_QTY + "</span></td>"
                        + "<td align=right nowrap><span class=c2>" + header.ISSUE_VALUE + "</span></td>"
                        + "<td align=right nowrap><span class=c2>" + header.RET_QTY + "</span></td>"
                        + "<td align=right nowrap><span class=c2>" + header.RET_VALUE + "</span></td>"
                        + "<td align=right nowrap><span class=c2>" + header.UN_ACC_QTY + "</span></td>"
                        + "<td align=right nowrap><span class=c2>" + header.UN_ACC_VALUE + "</span></td>"
                        + "<td align=right nowrap><span class=c2>" + header.COMPLIANCE + "</span></td>"
                        + "<td align=right nowrap><span class=c2>" + header.DOLLARS_CAPTURED + "</span></td>"

                        + "</tr>";

                });

            }
            else {
                await this.lstDBData.forEach(header => {
                    htmlBuilder += "<tr>"
                        + "<td align=left nowrap> <span class=c2>" + header.POU_LOC + "</span></td>"
                        + "<td align=right nowrap><span class=c2>" + "'" + header.ISSUE_QTY + "</span></td>"
                        + "<td align=right nowrap><span class=c2>" + "'" + header.ISSUE_VALUE + "</span></td>"
                        + "<td align=right nowrap><span class=c2>" + "'" + header.RET_QTY + "</span></td>"
                        + "<td align=right nowrap><span class=c2>" + "'" + header.RET_VALUE + "</span></td>"
                        + "<td align=right nowrap><span class=c2>" + "'" + header.UN_ACC_QTY + "</span></td>"
                        + "<td align=right nowrap><span class=c2>" + "'" + header.UN_ACC_VALUE + "</span></td>"
                        + "<td align=right nowrap><span class=c2>" + "'" + header.COMPLIANCE + "</span></td>"
                        + "<td align=right nowrap><span class=c2>" + "'" + header.DOLLARS_CAPTURED + "</span></td>"

                        + "</tr>";

                });

            }
            htmlBuilder += "</table></td></tr></table>";
            return await htmlBuilder;
        }
        catch (ex) {
            htmlBuilder = '';
            return htmlBuilder;
        }
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    convertDateFormate(strDate) {
        var date = new Date(strDate),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [mnth, day , date.getFullYear()].join("/");
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
        this.lstDept = null;
        this.lstParLoc = null;
        this.atParCommonService = null;
        this.startIndex = null;
        this.EndIndex = null;
        this.dataSetbgcolor = null;
        this.dataSetdata = null;
        this.dataSetlabel = null;
        this.bindLabelData = null;
        this.breadCrumbMenu = null;
        this.defDateRange = null;
        this.date2 = null;
        this.data1 = null;

    }



}