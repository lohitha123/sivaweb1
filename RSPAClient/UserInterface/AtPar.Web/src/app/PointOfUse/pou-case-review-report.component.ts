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
import { VM_MT_POU_USER_DEPARTMENTS } from "../entities/vm_mt_pou_user_departments";
import { VM_POU_GET_CASES_INFORMATION } from "../entities/vm_pou_get_cases_information";
import { VM_POU_GETCASEREVIEW_RPT_CASE_HEADER_SUMMARY } from "../entities/vm_pou_getcasereview_rpt_case_header_summary";
import { VM_POU_GETCASEREVIEW_RPT_CASE_ITEM_TOTAL_SUMMARY } from "../entities/vm_pou_getcasereview_rpt_case_item_total_summary";
import { VM_POU_GETCASEREVIEW_RPT_CASE_ITEM_INFO } from "../entities/vm_pou_getcasereview_rpt_case_item_info";
import { VM_POU_GETCASEREVIEW_RPT_CASE_ITEM_LOTSERIAL_DETAILS } from "../entities/vm_pou_getcasereview_rpt_case_item_lotserial_details";
import { CaseReviewReportService } from "./pou-case-review-report.service";
import { SSL_CONFIG_DETAILS } from '../Entities/SSL_CONFIG_DETAILS';
import { saveAs } from 'file-saver';
import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';
declare var module: {
    id: string;

}

@Component({
    templateUrl: 'pou-case-review-report.component.html',
    providers: [AtParCommonService, AtParConstants, CaseReviewReportService],
})

export class CaseReviewReportComponent {
    @Input() appId: string;
    intAppId: number;
    @ViewChild(DataTable) dataTableComponent: DataTable;
    pageSize: number;
    deviceTokenEntry: any;
    growlMessage: Message[] = [];
    breadCrumbMenu: Menus;

    lstDepartments: VM_MT_POU_USER_DEPARTMENTS[] = [];
    lstCases: VM_POU_GET_CASES_INFORMATION[] = [];
    lstFilterdDept: VM_MT_POU_USER_DEPARTMENTS[] = [];
    lstFilterdCase: VM_POU_GET_CASES_INFORMATION[] = [];
    lstCasesHeaderSummary: VM_POU_GETCASEREVIEW_RPT_CASE_HEADER_SUMMARY[] = [];
    lstCaseItemTotalSummary: VM_POU_GETCASEREVIEW_RPT_CASE_ITEM_TOTAL_SUMMARY[] = [];
    lstCaseItemInfo: VM_POU_GETCASEREVIEW_RPT_CASE_ITEM_INFO[] = [];
    lstCaseLotSerialDetails: VM_POU_GETCASEREVIEW_RPT_CASE_ITEM_LOTSERIAL_DETAILS[] = [];

    selectedCase: any;
    selectedDept: any;
    pickedTotal: any = 0;
    issuedTotal: any = 0;
    returnedTotal: any = 0;
    wastedTotal: any = 0;
    consumedTotal: any = 0;
    consumedCostTotal: any = 0;



    defDuration: number;
    statusCode: number = -1;
    physician: string='';
    procedure: string='';
    caseDate: string;
    toMailAddr: string;
    ipAddress: string;
    gstrProtocal: string;
    gstrServerName: string;
    gstrPortNo: string;
    showGrid: boolean = false;
    isMailDialog: boolean = false;



    constructor(private spinnerService: SpinnerService,
        private atParCommonService: AtParCommonService,
        private httpService: HttpService,
        private atParConstant: AtParConstants,
        private caseReviewReportService: CaseReviewReportService) {

        this.breadCrumbMenu = new Menus();
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));

    }

    async ngOnInit() {
        this.pageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        //await this.getMyPreferences();
        //this.spinnerService.start();
        //await this.getUserDepartments();
        //this.spinnerService.stop();
    }

    async getMyPreferences() {

        await this.atParCommonService.getMyPreferences('DEFAULT_REPORT_DURATION', this.deviceTokenEntry).then((result: Response) => {
            let res = result.json() as AtParWebApiResponse<any>;
            this.growlMessage = [];
            switch (res.StatType) {
                case StatusType.Success: {
                    this.defDuration = parseInt(res.DataVariable.toString());
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

    async getUserDepartments() {
        await this.atParCommonService.getUserDepartments(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID], this.deviceTokenEntry).then((result: Response) => {
            let res = result.json() as AtParWebApiResponse<VM_MT_POU_USER_DEPARTMENTS>;
            switch (res.StatType) {
                case StatusType.Success: {
                    this.lstDepartments = res.DataList;
                    for (var index = 0; index < this.lstDepartments.length; index++) {
                        if (this.lstDepartments[index].DEPT_NAME != null && this.lstDepartments[index].DEPT_NAME != '') {
                            this.lstDepartments[index].FILTERED_DEPT = this.lstDepartments[index].DEPARTMENT_ID + ' - ' + this.lstDepartments[index].DEPT_NAME;
                        } else {
                            this.lstDepartments[index].FILTERED_DEPT = this.lstDepartments[index].DEPARTMENT_ID;
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

    async selectDepartment() {
        this.selectedCase = '';
        await this.getCasesInformation()
    }

    async fillLabels() {
        try {
            this.spinnerService.start();
            var filterList = this.lstCases.filter(x => (x.CASEDESCR == this.selectedCase.CASEDESCR || x.CASE_ID == this.selectedCase.CASE_ID));
            if (filterList.length > 0) {
                this.caseDate = filterList[0].PERFORM_DATE;
                this.procedure = filterList[0].PROCEDURENAME;
                this.physician = filterList[0].PHYSICIANNAME;
                if (filterList.length > 1) {
                    this.procedure = '';
                    this.physician = '';
                    for (var i = 0; i < filterList.length; i++) {
                        this.procedure += filterList[i].PROCEDURENAME + "<br/>";
                        this.physician += filterList[i].PHYSICIANNAME + "<br/>";
                    }
                }
            }
            else {
                this.caseDate = '';
                this.procedure = '';
                this.physician = '';
            }
            this.spinnerService.stop();
        } catch (ex) {
            this.clientErrorMsg(ex, 'fillLabels');
        }
    }

    async getCasesInformation() {
        try {
            await this.caseReviewReportService.getCasesInformation(this.selectedDept.DEPARTMENT_ID).then((result: Response) => {
                let res = result.json() as AtParWebApiResponse<VM_POU_GET_CASES_INFORMATION>;
                this.growlMessage = [];
                switch (res.StatType) {
                    case StatusType.Success: {
                        this.lstCases = res.DataList;

                        for (var index = 0; index < this.lstCases.length; index++) {
                            if (this.lstCases[index].CASE_DESC != null && this.lstCases[index].CASE_DESC != '') {
                                this.lstCases[index].FILTERED_CASE = this.lstCases[index].CASEDESCR;
                            } else {
                                this.lstCases[index].FILTERED_CASE = this.lstCases[index].CASE_ID;
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
        } catch (ex) {
            this.clientErrorMsg(ex, 'getCasesInformation');
        }
    }

    async selectCase() {
        await this.getCasesInformation()
        this.fillLabels();
    }

    async filterDepartments(event) {
        await this.getUserDepartments();
        let query = event.query.toUpperCase();
        this.lstFilterdDept = [];
        try {

            if (query == '%') {
                this.lstFilterdDept = this.lstDepartments;
            }
            else {
                this.lstFilterdDept = this.lstDepartments.filter(x => (x.DEPARTMENT_ID.toUpperCase().startsWith(query) ||
                    x.DEPARTMENT_ID.toUpperCase().endsWith(query) || x.DEPARTMENT_ID.toUpperCase() == query ||
                    x.DEPT_NAME.toUpperCase().startsWith(query) || x.DEPT_NAME.toUpperCase().endsWith(query) ||
                    x.DEPT_NAME.toUpperCase() == query));
            }
        } catch (ex) {
            this.clientErrorMsg(ex, 'filterDepartments');
        }
    }

    async filterCases(event) {
        let query = event.query.toUpperCase();
        this.lstFilterdCase = [];
        try {

            if (query == '%') {
                this.lstFilterdCase = asEnumerable(this.lstCases).Distinct(x => x.CASE_ID).ToArray();
            }
            else {
                this.lstFilterdCase = asEnumerable(this.lstCases.filter(x => (x.CASE_ID.toUpperCase().startsWith(query) ||
                    x.CASE_ID.toUpperCase().endsWith(query) || x.CASE_ID.toUpperCase() == query ||
                    x.CASE_DESC.toUpperCase().startsWith(query) || x.CASE_DESC.toUpperCase().endsWith(query) ||
                    x.CASE_DESC.toUpperCase() == query))).Distinct(x => x.CASE_ID).ToArray();
            }
        } catch (ex) {
            this.clientErrorMsg(ex, 'filterCases');
        }
    }

    async btnGo_Click() {
        try {
            this.growlMessage = [];
            this.showGrid = false;
            this.pickedTotal = 0;
            this.issuedTotal = 0;
            this.returnedTotal = 0;
            this.wastedTotal = 0;
            this.consumedTotal = 0;
            this.consumedCostTotal = 0;

            if (this.selectedDept == undefined || this.selectedDept.DEPARTMENT_ID == '' || this.selectedDept.DEPARTMENT_ID == null) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Dept ID is mandatory' });
                return;
            }

            if (this.selectedCase == undefined || this.selectedCase.CASE_ID == '' || this.selectedCase.CASE_ID == null) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Case is mandatory' });
                return;
            }
            if (this.lstCases.length > 0) {
                var filterCaseList = null;
                filterCaseList = this.lstCases.filter(x => x.CASEDESCR == this.selectedCase.CASE_ID || x.CASE_ID == this.selectedCase.CASE_ID)

                if (filterCaseList != null) {
                    this.spinnerService.start();
                    await this.caseReviewReportService.getCaseReview(this.selectedCase.CASE_ID).then((result: Response) => {
                        this.spinnerService.stop();
                        let res = result.json() as AtParWebApiResponse<any>;
                        switch (res.StatType) {
                            case StatusType.Success: {
                                if (res.DataDictionary != null) {
                                    this.lstCasesHeaderSummary = res.DataDictionary["lstGetcasereviewRptCaseHeaderSummary"];
                                    this.lstCaseItemInfo = res.DataDictionary["lstGetcasereviewRptCaseItemInfo"];
                                    this.lstCaseLotSerialDetails = res.DataDictionary["lstGetcasereviewRptCaseItemLotserialDetails"];
                                    this.lstCaseItemTotalSummary = res.DataDictionary["lstGetcasereviewRptCaseItemTotalSummary"];
                                    if (this.lstCasesHeaderSummary.length > 0) {
                                        var timeVal = this.lstCasesHeaderSummary[0].ELAPSEDTIME.split(':');
                                        if (timeVal.length > 0) {
                                            this.lstCasesHeaderSummary[0].ELAPSEDTIME = parseInt(timeVal[0]).toFixed(2) + " hrs : " + parseInt(timeVal[1]).toFixed(2) + " mins";
                                        } else {
                                            this.lstCasesHeaderSummary[0].ELAPSEDTIME = "0.00 hrs : 0.00 mins";
                                        }
                                    }


                                    for (var i = 0; i < this.lstCaseItemInfo.length; i++) {
                                        var list = this.lstCaseLotSerialDetails.filter(x => x.ITEM == this.lstCaseItemInfo[i].ITEM);
                                        if (list.length > 0) {

                                            let childPickedTotal = 0;
                                            let childIssuedTotal = 0;
                                            let childReturnedTotal = 0;
                                            let childWastedTotal = 0;
                                            let childConsumedTotal = 0;

                                            for (var j = 0; j < list.length; j++) {
                                                if (j == 0) {
                                                    list[j].ITEM_ID = list[j].ITEM;
                                                }
                                                else {
                                                    list[j].ITEM_ID = '';
                                                }
                                                list[j].OPEN_QTY = parseFloat(list[j].OPEN_QTY).toFixed(2);
                                                list[j].HOLD_QTY = parseFloat(list[j].HOLD_QTY).toFixed(2);
                                                list[j].ADDED_PREPICK_QA = parseFloat(list[j].ADDED_PREPICK_QA).toFixed(2);
                                                list[j].ADDED_DURING_PICK = parseFloat(list[j].ADDED_DURING_PICK).toFixed(2);
                                                list[j].TOTAL_PICKED = parseFloat(list[j].TOTAL_PICKED).toFixed(2);
                                                list[j].ISSUED_AFTER_PICK = parseFloat(list[j].ISSUED_AFTER_PICK).toFixed(2);
                                                list[j].RETURNED = parseFloat(list[j].RETURNED).toFixed(2);
                                                list[j].WASTED = parseFloat(list[j].WASTED).toFixed(2);
                                                list[j].CONSUMED = parseFloat(list[j].CONSUMED).toFixed(2);
                                                childPickedTotal += parseFloat(list[j].TOTAL_PICKED);
                                                childIssuedTotal += parseFloat(list[j].ISSUED_AFTER_PICK);
                                                childReturnedTotal += parseFloat(list[j].RETURNED);
                                                childWastedTotal += parseFloat(list[j].WASTED);
                                                childConsumedTotal += parseFloat(list[j].CONSUMED);
                                                if (list[j].EXPIRY_DATE == null) {
                                                    list[j].EXPIRY_DATE = '';
                                                }
                                            }


                                            this.lstCaseItemInfo[i].ITEMDETAILS = list;
                                            this.lstCaseItemInfo[i].CHILDPICKEDTOTAL = childPickedTotal.toFixed(2);
                                            this.lstCaseItemInfo[i].CHILDISSUEDTOTAL = childIssuedTotal.toFixed(2);
                                            this.lstCaseItemInfo[i].CHILDRETURNEDTOTAL = childReturnedTotal.toFixed(2);
                                            this.lstCaseItemInfo[i].CHILDWASTEDTOTAL = childWastedTotal.toFixed(2);
                                            this.lstCaseItemInfo[i].CHILDCONSUMEDTOTAL = childConsumedTotal.toFixed(2);
                                            this.lstCaseItemInfo[i].ITEM_COST = parseFloat(this.lstCaseItemInfo[i].ITEM_COST).toFixed(2);
                                            this.lstCaseItemInfo[i].PICKED = parseFloat(this.lstCaseItemInfo[i].PICKED).toFixed(2);
                                            this.lstCaseItemInfo[i].ISSUED_DURING_PROCEDURE = parseFloat(this.lstCaseItemInfo[i].ISSUED_DURING_PROCEDURE).toFixed(2);
                                            this.lstCaseItemInfo[i].RETURNED = parseFloat(this.lstCaseItemInfo[i].RETURNED).toFixed(2);
                                            this.lstCaseItemInfo[i].WASTED = parseFloat(this.lstCaseItemInfo[i].WASTED).toFixed(2);
                                            this.lstCaseItemInfo[i].CONSUMED = parseFloat(this.lstCaseItemInfo[i].CONSUMED).toFixed(2);
                                            this.lstCaseItemInfo[i].CONSUMED_COST = parseFloat(this.lstCaseItemInfo[i].CONSUMED_COST).toFixed(2);


                                            this.pickedTotal = parseFloat(this.pickedTotal) + parseFloat(this.lstCaseItemInfo[i].PICKED);
                                            this.issuedTotal = parseFloat(this.issuedTotal) + parseFloat(this.lstCaseItemInfo[i].ISSUED_DURING_PROCEDURE);
                                            this.returnedTotal = parseFloat(this.returnedTotal) + parseFloat(this.lstCaseItemInfo[i].RETURNED);
                                            this.wastedTotal = parseFloat(this.wastedTotal) + parseFloat(this.lstCaseItemInfo[i].WASTED);
                                            this.consumedTotal = parseFloat(this.consumedTotal) + parseFloat(this.lstCaseItemInfo[i].CONSUMED);
                                            this.consumedCostTotal = parseFloat(this.consumedCostTotal) + parseFloat(this.lstCaseItemInfo[i].CONSUMED_COST);

                                        }
                                        this.pickedTotal = this.pickedTotal.toFixed(2);
                                        this.issuedTotal = this.issuedTotal.toFixed(2);
                                        this.returnedTotal = this.returnedTotal.toFixed(2);
                                        this.wastedTotal = this.wastedTotal.toFixed(2);
                                        this.consumedTotal = this.consumedTotal.toFixed(2);
                                        this.consumedCostTotal = this.consumedCostTotal.toFixed(2);


                                    }
                                    this.showGrid = true;

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

                } else {
                    //tdImages.Visible = False
                    //pnlCaseReview.Visible = False
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No data found' });
                }


            } else {
                //tdImages.Visible = False
                //pnlCaseReview.Visible = False
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No data found' });
            }

        }
        catch (ex) {
            this.clientErrorMsg(ex, 'btnGo_Click');
        }
    }

    async onExportToExcelClick(event) {
        try {
            event.stopImmediatePropagation();
            this.spinnerService.start();
            let html: string = await this.exportReportDetails('Excel');
            if (html != '' && html != null) {
                let blob = new Blob([html], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                });
                saveAs(blob, "pou_case_review_report.xls");
            }
            //if (html != '' && html != null) {
            //    var ua = window.navigator.userAgent;
            //    var msie = ua.indexOf("MSIE ");
            //    // If Internet Explorer
            //    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
            //        this.statusCode = -1;
            //        let folderName: string = '';
            //        await this.atParCommonService.exportToExcel(html, "POU_Case_Review_", "pou_case_review_report")
            //            .then((res: Response) => {
            //                let data = res.json();
            //                this.statusCode = data.StatusCode;
            //                if (this.statusCode.toString() == AtparStatusCodes.ATPAR_OK.toString()) {
            //                    folderName = data.DataVariable.toString();
            //                    var filename = this.httpService.BaseUrl + '/Uploaded/' + folderName + '/pou_case_review_report.xls';
            //                    var query = '?download';
            //                    window.open(filename + query);
            //                }
            //                else {
            //                    this.growlMessage = [];
            //                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Internal Server Error.' });
            //                }
            //            });

            //        await this.atParCommonService.deleteExcel(folderName, "pou_case_review_report")
            //            .then((res: Response) => {
            //            });
            //    } else {

            //        var a = document.createElement('a');
            //        var data_type = 'data:application/vnd.ms-excel';
            //        html = html.replace(/ /g, '%20');
            //        a.href = data_type + ', ' + html;
            //        a.download = 'pou_case_review_report.xls';
            //        a.click();
            //    }
            //}
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
                    mywindow.document.write('<html><head><title>' + 'Point Of Use - Case Review Report' + '</title>');
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
            this.isMailDialog = false;
            let html: string = await this.exportReportDetails('Mail');
            let toAddr: string = '';



            if (html != '' && html != null) {
                await this.atParCommonService.sendEmail(this.deviceTokenEntry[TokenEntry_Enum.SystemId], 'Case Review Report', JSON.stringify(html), this.toMailAddr, MailPriority.Normal.toString(), '')
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
                .then(async (res: Response) => {
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
                .then(async (res: Response) => {
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
            imgserverPath = this.gstrProtocal + '://' + this.ipAddress+ '/atpar/AtParWebApi/assets/images/';

            let title: string = '""' + "AtparVersion 2.8" + '""';

            htmlBuilder = "<Table align=left width=90% cellpadding=0 cellspacing = 0 vAlign=top>";

            if (reqType == 'Print') {
                htmlBuilder += "<TR width='100%'><td  align=left  width='15%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=" + title + ">"
                    + "</td><td align=left  width='85%' height=63 nowrap><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td > </TR>"
                htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                    "color:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt"+ "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                htmlBuilder += "<tr><td colspan=5 align=left><span class=c2><b> Point Of Use Case Review Report </b></span></td><td align=right valign=top>&nbsp;"
                htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "" + "><img src=" + imgserverPath + "print.jpg></A>"
            }
            else {
                htmlBuilder += "<TR width='100%'><td colspan=2  align=left bgcolor='#fe9836' width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=" + title + " nowrap></td></TR>"
                htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                    "color:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td></td></tr>"
                htmlBuilder += "<tr><td colspan=5 align=left><span class=c2><b> Point Of Use Case Review Report </b></span></td><td align=right valign=top>&nbsp;"
            }

            htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr> ";
            if (reqType == 'Excel') {
                htmlBuilder += "<table align=center border=1 width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + ">"
                htmlBuilder += "<tr>"
                htmlBuilder += "<td align=left nowrap><span class=c3>Case Open</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c3>'" + this.lstCasesHeaderSummary[0].CASE_PERFORM_DATE + "</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c3>Total Qty Items Picked & Issued </span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c3>'" + this.lstCaseItemTotalSummary[0].TOTAL_QTY_ITEMS_PICKED_ISSUED + "</span></td>"
                htmlBuilder += "</tr>"

                htmlBuilder += "<tr>"
                htmlBuilder += "<td align=left nowrap><span class=c3>Case Closed</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c3>'" + this.lstCasesHeaderSummary[0].CASE_CLOSED_DATE + "</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c3>Total Qty Items Consumed</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c3>'" + this.lstCaseItemTotalSummary[0].TOTAL_QTY_ITEMS_CONSUMED + "</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c3>Consumed</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c3>'" + this.lstCaseItemTotalSummary[0].CONSUMED_PERCENTAGE + "% </span></td>"
                htmlBuilder += "</tr>"

                htmlBuilder += "<tr>"
                htmlBuilder += "<td align=left nowrap><span class=c3>Total Time Elapsed</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c3>'" + this.lstCasesHeaderSummary[0].ELAPSEDTIME + "</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c3>Total Qty Items Returned</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c3>'" + this.lstCaseItemTotalSummary[0].TOTAL_QTY_ITEMS_RETURNED + "</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c3>Returned</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c3>'" + this.lstCaseItemTotalSummary[0].RETURNED_PERCENTAGE + "% </span></td>"
                htmlBuilder += "</tr>"

                htmlBuilder += "<tr>"
                htmlBuilder += "<td align=left nowrap><span class=c3>Total # Items for Case</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstCaseItemInfo.length + "</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c3>Total Qty Items Wasted</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c3>'" + this.lstCaseItemTotalSummary[0].TOTAL_QTY_ITEMS_WASTED + "</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c3>Wasted</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c3>'" + this.lstCaseItemTotalSummary[0].WASTED_PERCENTAGE + "% </span></td>"
                htmlBuilder += "</tr>"
                htmlBuilder += "</table>"


            }
            else {
                htmlBuilder += "<table align=center border=1 width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + ">"

                htmlBuilder += "<tr>"
                htmlBuilder += "<td align=left nowrap><span class=c3>Case Open</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstCasesHeaderSummary[0].CASE_PERFORM_DATE + "</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c3>Total Qty Items Picked & Issued </span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstCaseItemTotalSummary[0].TOTAL_QTY_ITEMS_PICKED_ISSUED + "</span></td>"
                htmlBuilder += "</tr>"

                htmlBuilder += "<tr>"
                htmlBuilder += "<td align=left nowrap><span class=c3>Case Closed</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstCasesHeaderSummary[0].CASE_CLOSED_DATE + "</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c3>Total Qty Items Consumed</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstCaseItemTotalSummary[0].TOTAL_QTY_ITEMS_CONSUMED + "</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c3>Consumed</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstCaseItemTotalSummary[0].CONSUMED_PERCENTAGE + "% </span></td>"
                htmlBuilder += "</tr>"

                htmlBuilder += "<tr>"
                htmlBuilder += "<td align=left nowrap><span class=c3>Total Time Elapsed</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstCasesHeaderSummary[0].ELAPSEDTIME + "</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c3>Total Qty Items Returned</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstCaseItemTotalSummary[0].TOTAL_QTY_ITEMS_RETURNED + "</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c3>Returned</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstCaseItemTotalSummary[0].RETURNED_PERCENTAGE + "% </span></td>"
                htmlBuilder += "</tr>"

                htmlBuilder += "<tr>"
                htmlBuilder += "<td align=left nowrap><span class=c3>Total # Items for Case</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstCaseItemInfo.length + "</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c3>Total Qty Items Wasted</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstCaseItemTotalSummary[0].TOTAL_QTY_ITEMS_WASTED + "</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c3>Wasted</span></td>"
                htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstCaseItemTotalSummary[0].WASTED_PERCENTAGE + "% </span></td>"
                htmlBuilder += "</tr>"
                htmlBuilder += "</table>"

            }


            htmlBuilder += "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
            htmlBuilder += "<tr bgcolor=#d3d3d3>"
            htmlBuilder += "<td align=center nowrap><span class=c3><b>Item</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c3><b>Item Description</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c3><b>Item Cost</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c3><b>Picked</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c3><b>Issued during Procedure</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c3><b>Returned</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c3><b>Wasted</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c3><b>Consumed</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span class=c3><b>Consumed Cost</b></span></td>"
            htmlBuilder += "</tr>"

            for (var i = 0; i < this.lstCaseItemInfo.length; i++) {
                htmlBuilder += "<tr>"

                if (reqType == 'Excel') {
                    htmlBuilder += "<td align=left nowrap><span class=c3>'" + this.lstCaseItemInfo[i].ITEM + "</span></td>"
                    htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstCaseItemInfo[i].ITEM_DESCRIPTION + "</span></td>"
                    htmlBuilder += "<td align=right nowrap><span class=c3>'" + this.lstCaseItemInfo[i].ITEM_COST + "</span></td>"
                    htmlBuilder += "<td align=right nowrap><span class=c3>'" + this.lstCaseItemInfo[i].PICKED + "</span></td>"
                    htmlBuilder += "<td align=right nowrap><span class=c3>'" + this.lstCaseItemInfo[i].ISSUED_DURING_PROCEDURE + "</span></td>"
                    htmlBuilder += "<td align=right nowrap><span class=c3>'" + this.lstCaseItemInfo[i].RETURNED + "</span></td>"
                    htmlBuilder += "<td align=right nowrap><span class=c3>'" + this.lstCaseItemInfo[i].WASTED + "</span></td>"
                    htmlBuilder += "<td align=right nowrap><span class=c3>'" + this.lstCaseItemInfo[i].CONSUMED + "</span></td>"
                    htmlBuilder += "<td align=right nowrap><span class=c3>'" + this.lstCaseItemInfo[i].CONSUMED_COST + "</span></td>"
                }
                else {
                    htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstCaseItemInfo[i].ITEM + "</span></td>"
                    htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstCaseItemInfo[i].ITEM_DESCRIPTION + "</span></td>"
                    htmlBuilder += "<td align=right nowrap><span class=c3>" + this.lstCaseItemInfo[i].ITEM_COST + "</span></td>"
                    htmlBuilder += "<td align=right nowrap><span class=c3>" + this.lstCaseItemInfo[i].PICKED + "</span></td>"
                    htmlBuilder += "<td align=right nowrap><span class=c3>" + this.lstCaseItemInfo[i].ISSUED_DURING_PROCEDURE + "</span></td>"
                    htmlBuilder += "<td align=right nowrap><span class=c3>" + this.lstCaseItemInfo[i].RETURNED + "</span></td>"
                    htmlBuilder += "<td align=right nowrap><span class=c3>" + this.lstCaseItemInfo[i].WASTED + "</span></td>"
                    htmlBuilder += "<td align=right nowrap><span class=c3>" + this.lstCaseItemInfo[i].CONSUMED + "</span></td>"
                    htmlBuilder += "<td align=right nowrap><span class=c3>" + this.lstCaseItemInfo[i].CONSUMED_COST + "</span></td>"
                }
                htmlBuilder += "</tr>";
                if (this.lstCaseItemInfo[i].ITEMDETAILS.length > 0) {
                    htmlBuilder += "<tr>"
                    htmlBuilder += "<td colspan=9>"
                    htmlBuilder += "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                    htmlBuilder += "<tr bgcolor=#d3d3d3>"
                    htmlBuilder += "<td align=center nowrap><span class=c3><b>Item</b></span></td>"
                    htmlBuilder += "<td align=center nowrap><span class=c3><b>Transaction Date</b></span></td>"
                    htmlBuilder += "<td align=center nowrap><span class=c3><b>Transaction Time</b></span></td>"
                    htmlBuilder += "<td align=center nowrap><span class=c3><b>User ID</b></span></td>"
                    htmlBuilder += "<td align=center nowrap><span class=c3><b>Serial No</b></span></td>"
                    htmlBuilder += "<td align=center nowrap><span class=c3><b>Lot No</b></span></td>"
                    htmlBuilder += "<td align=center nowrap><span class=c3><b>Expiration Date</b></span></td>"
                    htmlBuilder += "<td align=center nowrap><span class=c3><b>Pref Qty</b></span></td>"
                    htmlBuilder += "<td align=center nowrap><span class=c3><b>Hold Qty</b></span></td>"
                    htmlBuilder += "<td align=center nowrap><span class=c3><b>Added Prepick QA</b></span></td>"
                    htmlBuilder += "<td align=center nowrap><span class=c3><b>Added during Pick</b></span></td>"
                    htmlBuilder += "<td align=center nowrap><span class=c3><b>Total Picked</b></span></td>"
                    htmlBuilder += "<td align=center nowrap><span class=c3><b>Issued after Pick</b></span></td>"
                    htmlBuilder += "<td align=center nowrap><span class=c3><b>Returned</b></span></td>"
                    htmlBuilder += "<td align=center nowrap><span class=c3><b>Wasted</b></span></td>"
                    htmlBuilder += "<td align=center nowrap><span class=c3><b>Consumed</b></span></td>"
                    htmlBuilder += "</tr>"
                }
                for (var j = 0; j < this.lstCaseItemInfo[i].ITEMDETAILS.length; j++) {
                    htmlBuilder += "<tr>"

                    if (reqType == 'Excel') {
                        htmlBuilder += "<td align=left nowrap><span class=c3>'" + this.lstCaseItemInfo[i].ITEMDETAILS[j].ITEM_ID + "</span></td>"
                        htmlBuilder += "<td align=left nowrap><span class=c3>'" + this.lstCaseItemInfo[i].ITEMDETAILS[j].TRANSACTION_DATE + "</span></td>"
                        htmlBuilder += "<td align=left nowrap><span class=c3>'" + this.lstCaseItemInfo[i].ITEMDETAILS[j].TRANSACTION_TIME + "</span></td>"
                        htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstCaseItemInfo[i].ITEMDETAILS[j].USER_ID + "</span></td>"
                        htmlBuilder += "<td align=right nowrap><span class=c3>'" + this.lstCaseItemInfo[i].ITEMDETAILS[j].SERIAL_NUMBER + "</span></td>"
                        htmlBuilder += "<td align=right nowrap><span class=c3>'" + this.lstCaseItemInfo[i].ITEMDETAILS[j].LOT_NUMBER + "</span></td>"
                        htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstCaseItemInfo[i].ITEMDETAILS[j].EXPIRY_DATE + "</span></td>"
                        htmlBuilder += "<td align=right nowrap><span class=c3>'" + this.lstCaseItemInfo[i].ITEMDETAILS[j].ADDED_PREPICK_QA + "</span></td>"
                        htmlBuilder += "<td align=right nowrap><span class=c3>'" + this.lstCaseItemInfo[i].ITEMDETAILS[j].HOLD_QTY + "</span></td>"
                        htmlBuilder += "<td align=right nowrap><span class=c3>'" + this.lstCaseItemInfo[i].ITEMDETAILS[j].ADDED_PREPICK_QA + "</span></td>"
                        htmlBuilder += "<td align=right nowrap><span class=c3>'" + this.lstCaseItemInfo[i].ITEMDETAILS[j].ADDED_DURING_PICK + "</span></td>"
                        htmlBuilder += "<td align=right nowrap><span class=c3>'" + this.lstCaseItemInfo[i].ITEMDETAILS[j].TOTAL_PICKED + "</span></td>"
                        htmlBuilder += "<td align=right nowrap><span class=c3>'" + this.lstCaseItemInfo[i].ITEMDETAILS[j].ISSUED_AFTER_PICK + "</span></td>"
                        htmlBuilder += "<td align=right nowrap><span class=c3>'" + this.lstCaseItemInfo[i].ITEMDETAILS[j].RETURNED + "</span></td>"
                        htmlBuilder += "<td align=right nowrap><span class=c3>'" + this.lstCaseItemInfo[i].ITEMDETAILS[j].WASTED + "</span></td>"

                    }
                    else {
                        htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstCaseItemInfo[i].ITEMDETAILS[j].ITEM_ID + "</span></td>"
                        htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstCaseItemInfo[i].ITEMDETAILS[j].TRANSACTION_DATE + "</span></td>"
                        htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstCaseItemInfo[i].ITEMDETAILS[j].TRANSACTION_TIME + "</span></td>"
                        htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstCaseItemInfo[i].ITEMDETAILS[j].USER_ID + "</span></td>"
                        htmlBuilder += "<td align=right nowrap><span class=c3>" + this.lstCaseItemInfo[i].ITEMDETAILS[j].SERIAL_NUMBER + "</span></td>"
                        htmlBuilder += "<td align=right nowrap><span class=c3>" + this.lstCaseItemInfo[i].ITEMDETAILS[j].LOT_NUMBER + "</span></td>"
                        htmlBuilder += "<td align=left nowrap><span class=c3>" + this.lstCaseItemInfo[i].ITEMDETAILS[j].EXPIRY_DATE + "</span></td>"
                        htmlBuilder += "<td align=right nowrap><span class=c3>" + this.lstCaseItemInfo[i].ITEMDETAILS[j].ADDED_PREPICK_QA + "</span></td>"
                        htmlBuilder += "<td align=right nowrap><span class=c3>" + this.lstCaseItemInfo[i].ITEMDETAILS[j].HOLD_QTY + "</span></td>"
                        htmlBuilder += "<td align=right nowrap><span class=c3>" + this.lstCaseItemInfo[i].ITEMDETAILS[j].ADDED_PREPICK_QA + "</span></td>"
                        htmlBuilder += "<td align=right nowrap><span class=c3>" + this.lstCaseItemInfo[i].ITEMDETAILS[j].ADDED_DURING_PICK + "</span></td>"
                        htmlBuilder += "<td align=right nowrap><span class=c3>" + this.lstCaseItemInfo[i].ITEMDETAILS[j].TOTAL_PICKED + "</span></td>"
                        htmlBuilder += "<td align=right nowrap><span class=c3>" + this.lstCaseItemInfo[i].ITEMDETAILS[j].ISSUED_AFTER_PICK + "</span></td>"
                        htmlBuilder += "<td align=right nowrap><span class=c3>" + this.lstCaseItemInfo[i].ITEMDETAILS[j].RETURNED + "</span></td>"
                        htmlBuilder += "<td align=right nowrap><span class=c3>" + this.lstCaseItemInfo[i].ITEMDETAILS[j].WASTED + "</span></td>"

                    }
                    htmlBuilder += "<td align=right nowrap><span class=c3>" + "" + "</span></td>"
                    htmlBuilder += "</tr>"
                }
                htmlBuilder += "<tr bgcolor=#d3d3d3>"
                htmlBuilder += "<td align=right nowrap colspan='11'><span class=c3>" + " " + "</span></td>"

                //If Not grdDetails.FooterRow Is Nothing Then
                if (reqType == "Excel") {
                    htmlBuilder += "<td align=right nowrap><span class=c3><b>'" + this.lstCaseItemInfo[i].CHILDPICKEDTOTAL + "</b></span></td>"
                    htmlBuilder += "<td align=right nowrap><span class=c3><b>'" + this.lstCaseItemInfo[i].CHILDISSUEDTOTAL + "</b></span></td>"
                    htmlBuilder += "<td align=right nowrap><span class=c3><b>'" + this.lstCaseItemInfo[i].CHILDRETURNEDTOTAL + "</b></span></td>"
                    htmlBuilder += "<td align=right nowrap><span class=c3><b>'" + this.lstCaseItemInfo[i].CHILDWASTEDTOTAL + "</b></span></td>"
                    htmlBuilder += "<td align=right nowrap><span class=c3><b>'" + this.lstCaseItemInfo[i].CHILDCONSUMEDTOTAL + "</b></span></td>"
                }
                else {
                    htmlBuilder += "<td align=right nowrap><span class=c3><b>" + this.lstCaseItemInfo[i].CHILDPICKEDTOTAL + "</b></span></td>"
                    htmlBuilder += "<td align=right nowrap><span class=c3><b>" + this.lstCaseItemInfo[i].CHILDISSUEDTOTAL + "</b></span></td>"
                    htmlBuilder += "<td align=right nowrap><span class=c3><b>" + this.lstCaseItemInfo[i].CHILDRETURNEDTOTAL + "</b></span></td>"
                    htmlBuilder += "<td align=right nowrap><span class=c3><b>" + this.lstCaseItemInfo[i].CHILDWASTEDTOTAL + "</b></span></td>"
                    htmlBuilder += "<td align=right nowrap><span class=c3><b>" + this.lstCaseItemInfo[i].CHILDCONSUMEDTOTAL + "</b></span></td>"
                }
                htmlBuilder += "</tr>"
                htmlBuilder += "</table>"
                htmlBuilder += "</td>"
                htmlBuilder += "</tr>"

            }



            htmlBuilder += "<tr bgcolor=#d3d3d3>"
            htmlBuilder += "<td align=left nowrap><span class=c3><b>" + "Totals" + "</b></span></td>"
            htmlBuilder += "<td align=right nowrap colspan='2'><span class=c3>" + " " + "</span></td>"
            //If Not grdCaseReview.FooterRow Is Nothing Then
            if (reqType == 'Excel') {
                htmlBuilder += "<td align=right nowrap><span class=c3><b>'" + this.pickedTotal + "</b></span></td>"
                htmlBuilder += "<td align=right nowrap><span class=c3><b>'" + this.issuedTotal + "</b></span></td>"
                htmlBuilder += "<td align=right nowrap><span class=c3><b>'" + this.returnedTotal + "</b></span></td>"
                htmlBuilder += "<td align=right nowrap><span class=c3><b>'" + this.wastedTotal + "</b></span></td>"
                htmlBuilder += "<td align=right nowrap><span class=c3><b>'" + this.consumedTotal + "</b></span></td>"
                htmlBuilder += "<td align=right nowrap><span class=c3><b>'" + this.consumedCostTotal + "</b></span></td>"

            }
            else {
                htmlBuilder += "<td align=right nowrap><span class=c3><b>" + this.pickedTotal + "</b></span></td>"
                htmlBuilder += "<td align=right nowrap><span class=c3><b>" + this.issuedTotal + "</b></span></td>"
                htmlBuilder += "<td align=right nowrap><span class=c3><b>" + this.returnedTotal + "</b></span></td>"
                htmlBuilder += "<td align=right nowrap><span class=c3><b>" + this.wastedTotal + "</b></span></td>"
                htmlBuilder += "<td align=right nowrap><span class=c3><b>" + this.consumedTotal + "</b></span></td>"
                htmlBuilder += "<td align=right nowrap><span class=c3><b>" + this.consumedCostTotal + "</b></span></td>"

            }

            htmlBuilder += "</tr>"
            htmlBuilder += "</table></Table>"
            return await htmlBuilder;
        }
        catch (ex) {
            htmlBuilder = '';
            return htmlBuilder;
        }
    }

    calculatePickedTotal(Item) {
        var Total = 0;
        for (var i = 0; i < this.lstCaseLotSerialDetails.length; i++) {
            if (this.lstCaseLotSerialDetails[i].ITEM == Item) {
                Total += parseFloat(this.lstCaseLotSerialDetails[i].TOTAL_PICKED);
            }
        }
        return Total;
    }

    calculateIssuedTotal(Item) {
        var Total = 0;
        for (var i = 0; i < this.lstCaseLotSerialDetails.length; i++) {
            if (this.lstCaseLotSerialDetails[i].ITEM == Item) {
                Total += parseFloat(this.lstCaseLotSerialDetails[i].ISSUED_AFTER_PICK);
            }
        }
        return Total;
    }

    calculateReturnedTotal(Item) {
        var Total = 0;
        for (var i = 0; i < this.lstCaseLotSerialDetails.length; i++) {
            if (this.lstCaseLotSerialDetails[i].ITEM == Item) {
                Total += parseFloat(this.lstCaseLotSerialDetails[i].RETURNED);
            }
        }
        return Total;
    }

    calculateWastedTotal(Item) {
        var Total = 0;
        for (var i = 0; i < this.lstCaseLotSerialDetails.length; i++) {
            if (this.lstCaseLotSerialDetails[i].ITEM == Item) {
                Total += parseFloat(this.lstCaseLotSerialDetails[i].WASTED);
            }
        }
        return Total;
    }

    calculateConsumedTotal(Item) {
        var Total = 0;
        for (var i = 0; i < this.lstCaseLotSerialDetails.length; i++) {
            if (this.lstCaseLotSerialDetails[i].ITEM == Item) {
                Total += parseFloat(this.lstCaseLotSerialDetails[i].CONSUMED);
            }
        }
        return Total;
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
        this.lstDepartments = [];
        this.lstCases = [];
        this.lstFilterdDept = [];
        this.lstFilterdCase = [];
        this.selectedCase = null;
        this.selectedDept = null;
        this.physician = '';
        this.procedure = '';
        this.caseDate = '';
    }

}