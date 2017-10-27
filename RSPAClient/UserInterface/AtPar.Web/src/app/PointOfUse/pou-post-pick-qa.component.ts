import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, ViewChild, Input, ViewEncapsulation } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { HttpService } from '../Shared/HttpService';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { TokenEntry_Enum, Case_Review_Type } from '../Shared/AtParEnums';
import { SelectItem, Message } from '../components/common/api';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { StatusType, EnumApps, MailPriority } from '../Shared/AtParEnums';
import { AtParConstants } from '../Shared/AtParConstants';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { DataTable } from '../components/datatable/datatable';
import { Http, Response } from "@angular/http";
import { PostPickQAService } from './pou-post-pick-qa.service';
import { VM_MT_POU_USER_DEPARTMENTS } from "../entities/vm_mt_pou_user_departments";
import { VM_MT_POU_CASE_CART_HEADER } from '../Entities/VM_MT_POU_CASE_CART_HEADER';
import { VM_MT_POU_CASE_CART_HEADER_TB } from '../Entities/VM_MT_POU_CASE_CART_HEADER_TB';
import { SSL_CONFIG_DETAILS } from '../Entities/SSL_CONFIG_DETAILS';
//import { JsBarCode } from 'jsbarcode';
//import * as JsBarCode from 'jsbarcode';
//import * as JsBarcode from "jsbarcode";
//import { VM_MT_POU_CASE_CART_DETAILS } from  '../Entities/VM_MT_POU_CASE_CART_DETAILS'
declare var module: {
    id: string;
}
@Component({

    templateUrl: 'pou-post-pick-qa.component.html',
    providers: [AtParCommonService, PostPickQAService, AtParConstants, datatableservice],
    encapsulation: ViewEncapsulation.None,
})

export class PostPickQAComponent {
    tblform: any;
    pageSize: number;
    deviceTokenEntry: any;
    growlMessage: Message[] = [];
    userFullName: string = '';
    fromDate: Date;
    toDate: Date;
    currentDate: Date;
    chkReviewed: boolean = false;
    startIndex: number;
    EndIndex: number;
    showGrid: boolean = false;
    blnisShortage: boolean = false;
    showItemGrid: boolean = false;
    editform: boolean = false;
    page: boolean = true;
    dynamicTable: string = '';
    lblPatient: string = '';
    lblCaseID: string = '';
    lblPerformDate: string = '';
    lstCaseItemsInfo: any[] = [];
    lstCaseforQA: VM_MT_POU_CASE_CART_HEADER_TB[] = [];
    lstDESCRS: any[] = [];
    lstITEMS: any[] = [];
    lstPostPick: VM_MT_POU_CASE_CART_HEADER_TB[] = [];
    vmcaseDetails: VM_MT_POU_CASE_CART_HEADER;
    lblPatientName: string = '';
    scndDynmTbl: string = '';
    constructor(private spinnerService: SpinnerService,
        private atParCommonService: AtParCommonService,
        private httpService: HttpService,
        private atParConstant: AtParConstants,
        private postPickQAService: PostPickQAService
    ) {
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));

    }
    async ngOnInit() {
        this.spinnerService.start()
        this.pageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        this.startIndex = + sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
        let defaultReportDuration = await this.defaultReportDuration();
        this.fromDate = new Date();
        let duration = this.fromDate.getDate() + parseInt(defaultReportDuration.toString());
        this.toDate = new Date();
        this.toDate.setDate(duration);
        
        // this.toDate = await this.addDays(this.fromDate, defaultReport);
        this.spinnerService.stop();
        //var barcode = require('jsbarcode')
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
            this.clientErrorMsg(ex, 'defaultReportDuration');
        }
        finally {
            this.spinnerService.stop()
        }
    }
    addDays(theDate, days) {
        return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
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
    validateSearchFields() {
        try {
            this.growlMessage = [];
            if (this.fromDate == null || this.fromDate.toString() == '' || this.toDate == null || this.toDate.toString() == '') {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please select a valid date range' });
                return false;
            }
            else if (Date.parse(this.fromDate.toString()) && Date.parse(this.toDate.toString())) {
                if (Date.parse(this.convertDateFormate(this.fromDate)) < Date.parse(this.convertDateFormate(new Date().toDateString()))) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "From Date should be greater than or equal to Today's Date" });
                    return false;
                }
                if (Date.parse(this.convertDateFormate(this.toDate)) < Date.parse(this.convertDateFormate(this.fromDate))) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "To Date should be greater than From Date" });
                    return false;
                }

            }
            else {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Dates' });
                return false;
            }
            return true;

        } catch (ex) {
            this.clientErrorMsg(ex, 'validateSearchFields');
            return false;
        }

    }
    ngAfterViewChecked() {
        // this.createBarcode('krane',2)
    }

    async bindGrid() {
        try {
            this.showGrid = false;
            this.spinnerService.start()
            let status = await this.validateSearchFields();
            if (!status) {
                this.spinnerService.stop();
                return;
            }

            let fromDate: string = await this.convertDateFormate(this.fromDate);
            let toDate: string = await this.convertDateFormate(this.toDate);
            this.postPickQAService.getCasesforQA(fromDate, toDate, Case_Review_Type.POST, '', '', '')
                .catch(this.httpService.handleError)
                .then((res: Response) => {
                    this.spinnerService.stop();
                    let data = res.json() as AtParWebApiResponse<VM_MT_POU_CASE_CART_HEADER>;
                    switch (data.StatType) {
                        case StatusType.Success: {
                            //let jsbarcode = require('jsbarcode');
                            this.vmcaseDetails = data.Data;
                            this.lstPostPick = this.vmcaseDetails.lstCaseInfo;
                            this.lstCaseforQA = this.vmcaseDetails.lstCaseforQA
                            if (this.lstPostPick.length == 0) {
                                this.showGrid = false;
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Record Found" });
                            }
                            else {
                                for (let index in this.lstPostPick) {
                                    let changeDate = this.lstPostPick[index].PERFORM_DATE;
                                    var dateStr = new Date(changeDate).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                                    this.lstPostPick[index].PERFORM_DATE = dateStr.replace(',', '');
                                    let infoDetail: VM_MT_POU_CASE_CART_HEADER_TB[] = [];
                                    let childGrid = this.lstCaseforQA.filter(a => a.CASE_ID == this.lstPostPick[index].CASE_ID);
                                    if (childGrid.length > 1) {
                                        this.lstPostPick[index].isExpander = true;
                                        infoDetail = this.lstCaseforQA.filter(x => x.CASE_ID == this.lstPostPick[index].CASE_ID);
                                        this.lstPostPick[index].DETAILS = infoDetail;
                                    }
                                    else {
                                        this.lstPostPick[index].isExpander = false;
                                    }
                                }
                                this.showGrid = true;
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
            this.clientErrorMsg(ex, 'bindGrid');
        }

    }
    switch_Click() {

        if (this.chkReviewed) {

        } else {

        }
    }

    //For Details PopUP
    async onPickDetailsClick(caseInfo: VM_MT_POU_CASE_CART_HEADER_TB, event) {
        //this.breadCrumbMenu.SUB_MENU_NAME = 'Case Details';
        //this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.growlMessage = [];
        try {
            this.spinnerService.start()
            this.getUserFullName();
            let getDetailsBool = await this.bindItemsGrid(caseInfo)

            //let getDetailsBool: boolean = await this.Details_Load(caseInfo);

            if (getDetailsBool) {
                this.editform = true;
                this.page = false;
                this.showGrid = false;
                //this.showItemGrid = true;
                //this.additem = false;
            }

        } catch (ex) {
            this.clientErrorMsg(ex, 'onPickDetailsClick');
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async  bindItemsGrid(caseInfo: VM_MT_POU_CASE_CART_HEADER_TB) {
        let showDetails: boolean = false;

        this.spinnerService.start()
        await this.postPickQAService.getPostPickQAItems(caseInfo.CASE_ID, EnumApps.PointOfUse)
            .catch(this.httpService.handleError)
            .then(async (res: Response) => {
                this.spinnerService.stop();
                let data = res.json() as AtParWebApiResponse<number>;
                switch (data.StatType) {
                    case StatusType.Success: {

                        this.lstDESCRS = data.DataDictionary["CaseItemsInfo"]["DESCRS"];
                        this.lstITEMS = data.DataDictionary["CaseItemsInfo"]["ITEMS"];


                        // JsBarcode("#barcode", "Hi!");
                        if (data.DataDictionary["CaseItemsInfo"].length == 0) {
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Record Found" });
                        }
                        else {
                            this.showItemGrid = true;
                            showDetails = true;
                            this.chkReviewed = false;
                            let cartId = '';
                            let mCnt = 0;
                            let m_cntForCompletlyPicked = 0;
                            let m_cntForUnknownLoc = 0;
                            await this.bindDynamicDetails(caseInfo);
                            //this.tblform = <HTMLElement>document.getElementById('tblform');                               
                            this.scndDynmTbl = '';
                            this.scndDynmTbl = `                               
                                <table class='table table-bordered pick-qa-table' cellspacing= '0' cellpadding= '0' style='width:100%' >
                                <thead>
                                <tr>
                                <th class='text-center text-bold' style='width:13%; text-align:center;vertical-align:middle;font-size:12px;background-color:#f2f2f2 !important;'> Item </th>
                                <th class='text-center text-bold' style='width:8%;text-align:center;vertical-align:middle;font-size:12px;background-color:#f2f2f2 !important;'> Mfg ItemID</th>
                                <th class='text-center text-bold' style='width:10%;text-align:center;vertical-align:middle;font-size:12px;background-color:#f2f2f2 !important;'> Item Description</th>
                                <th class='text-center text-bold' style='width:8%;text-align:center;vertical-align:middle;font-size:12px;background-color:#f2f2f2 !important;'> Bin Loc</th>
                                <th class='text-center text-bold' style='width:7%;text-align:center;vertical-align:middle;font-size:12px;background-color:#f2f2f2 !important;'> O Qty</th>
                                <th class='text-center text-bold' style='width:7%;text-align:center;vertical-align:middle;font-size:12px;background-color:#f2f2f2 !important;'> H Qty</th>
                                <th class='text-center text-bold' style='width:7%;text-align:center;vertical-align:middle;font-size:12px;background-color:#f2f2f2 !important;'> Picked Qty</th>
                                <th class='text-center text-bold' style='width:6%;text-align:center;vertical-align:middle;font-size:12px;background-color:#f2f2f2 !important;'> Shortage Qty</th>
                                <th class='text-center text-bold' style='text-align:center;vertical-align:middle;font-size:12px;background-color:#f2f2f2 !important;'> Barcode </th>
                                </tr>
                                </thead>
                                <tbody >`
                            this.lstITEMS = this.lstITEMS.sort(a => a.CART_ID).reverse();
                            for (let index in this.lstITEMS) {
                                if (parseInt(this.lstITEMS[index].SHORTAGE_QTY) > 0 && (this.lstITEMS[index].CART_ID != null
                                    && this.lstITEMS[index].CART_ID != "") && this.lstITEMS[index].CART_ID != cartId) {
                                    if (mCnt == 0) {
                                        mCnt = mCnt + 1;
                                        this.scndDynmTbl += `<tr><td colspan='9' class='big-label'> Shortage items: </td></tr>`

                                    }
                                    mCnt = mCnt + 1;

                                    this.scndDynmTbl += "<tr><td colspan='4' class='big-label' > Supply location: ";
                                    this.scndDynmTbl += this.lstITEMS[index].CART_DESCR + `</td>
                                                        <td colspan='5' style='text-align:center' class='text-center' >  
                                                        <img src="data:image/jpg;base64,` + this.lstITEMS[index].CART_ID_BARCODE + `" />                                                                                                            
                                                        </td>
                                                        </tr>`
                                }
                                else if (parseInt(this.lstITEMS[index].SHORTAGE_QTY) == 0 && m_cntForCompletlyPicked == 0) {
                                    mCnt = mCnt + 1;
                                    m_cntForCompletlyPicked = 1
                                    this.scndDynmTbl += `<tr><td colspan= '9' class='big-label' > Completely picked items: </td></tr>`;

                                }
                                else if (parseInt(this.lstITEMS[index].SHORTAGE_QTY) > 0 && (this.lstITEMS[index].CART_ID == null
                                    || this.lstITEMS[index].CART_ID == "") && m_cntForUnknownLoc == 0) {
                                    m_cntForUnknownLoc = 1;
                                    mCnt = mCnt + 1;
                                    this.scndDynmTbl += `<tr><td colspan= '9' class='big-label'> Unknown items: </td></tr>`
                                }
                                this.scndDynmTbl += `<tr><td style='width:13%;text-align:center' >`;
                                this.scndDynmTbl += this.lstITEMS[index].ITEM_ID + `</td>`;
                                this.scndDynmTbl += `<td style= 'width:8%;text-align:center' >`
                                this.scndDynmTbl += this.lstITEMS[index].MANF_ITEM_ID + ` </td>`;
                                this.scndDynmTbl += `<td style='width:10%;text-align:center' > `;
                                this.scndDynmTbl += this.lstITEMS[index].ITEM_DESCR + `</td>`;
                                this.scndDynmTbl += `<td style='width:8%;text-align:center' > `;
                                this.scndDynmTbl += this.lstITEMS[index].COMPARTMENT + `</td>`;
                                this.scndDynmTbl += `<td style='width:7%;text-align:right' > `;
                                this.scndDynmTbl += this.lstITEMS[index].PICK_QTY + `</td>`;
                                this.scndDynmTbl += `<td style='width:7%;text-align:right' > `;
                                this.scndDynmTbl += this.lstITEMS[index].HOLD_QTY + `</td>`;
                                this.scndDynmTbl += `<td style='width:7%;text-align:right' > `;
                                this.scndDynmTbl += this.lstITEMS[index].QTY + `</td>`;
                                this.scndDynmTbl += `<td style='width:6%;text-align:right' > `;
                                this.scndDynmTbl += this.lstITEMS[index].SHORTAGE_QTY + `</td>`;
                                this.scndDynmTbl += `<td style='text-align:center' > `;
                                this.scndDynmTbl += `<img src="data:image/jpg;base64,` + this.lstITEMS[index].ITEM_ID_BARCODE + `" />`;
                                this.scndDynmTbl += `</td></tr>`

                                cartId = this.lstITEMS[index].CART_ID;
                            }
                            this.scndDynmTbl += `</tbody>
                                    </table>`;
                            // this.tblform.innerHTML = scndDynmTbl;
                            this.blnisShortage = false;
                            let details = this.lstITEMS.filter(x => x.SHORTAGE_QTY > 0 && x.CART_ID != null && x.CART_ID != "");

                            if (details != null && details.length > 0) {
                                this.blnisShortage = true;
                            }


                            this.showGrid = false;
                            this.editform = true;
                            this.page = false;

                        }
                        break;
                    }
                    case StatusType.Warn: {
                        showDetails = false;
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });

                        break;
                    }
                    case StatusType.Error: {
                        showDetails = false;
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });

                        break;
                    }

                }
            });
        return showDetails;
    }
    async bindDynamicDetails(caseInfo: VM_MT_POU_CASE_CART_HEADER_TB) {
        try {
            let htmlString = '';
            htmlString = "<table width='100%'><thead><th>Case ID</th><th>Case Date</th><th>Patient</th></thead>>"
            let dr = this.vmcaseDetails.lstCaseforQA.filter(x => x.CASE_ID == caseInfo.CASE_ID);
            if ((dr.length > 0)) {

                htmlString += "<tbody><td>" + dr[0].CASE_ID + "</td><td>" + dr[0].PERFORM_DATE + "</td><td></td>"
                this.lblCaseID = dr[0].CASE_ID
                this.lblPerformDate = dr[0].PERFORM_DATE

                if (dr[0].PATIENTNAME != null && dr[0].PATIENTNAME != '') {
                    if (dr[0].PATIENTNAME.toString().indexOf("-") != -1) {
                        let StrPtName = '';
                        StrPtName = dr[0].PATIENTNAME
                        let arr = StrPtName.split("-");
                        this.lblPatient = dr[0].PATIENT_BARCODE;//MRC No/PatientID

                        this.lblPatientName = arr[1] // Patient Name

                    } else {
                        this.lblPatient = dr[0].PATIENT_BARCODE;
                        this.lblPatientName = "Patient";
                    }

                }
            }
            //need to remove this logic as already developed in html page
            if (this.lstDESCRS.length == 1) {
                this.dynamicTable = "<tr><td width='33%'>Physician: " + this.lstDESCRS[0].PHYSICIAN_DESCR + "</td>";
                this.dynamicTable += " <td width='33%'>| &nbsp; Procedure: " + this.lstDESCRS[0].PROC_DESCR + "</td>"
                this.dynamicTable += "<td width='33%'>| &nbsp; Pref List: " + this.lstDESCRS[0].PREF_DESCR + " </td> </tr> "
            }
            else if (this.lstDESCRS.length > 1) {
                for (let item in this.lstDESCRS) {
                    this.dynamicTable = "<tr><td width='33%'>Physician: " + this.lstDESCRS[item].PHYSICIAN_DESCR + "</td>";
                    this.dynamicTable += "<td width='33%'>Procedure: " + this.lstDESCRS[item].PROC_DESCR + "</td>"
                    this.dynamicTable += "<td width='33%'>Pref List: " + this.lstDESCRS[item].PREF_DESCR + " </td></tr> "
                }
            }
            //Till here
        } catch (ex) {

        } finally {
        }
    }
    onPickGoBackClick() {
        this.growlMessage = []
        this.editform = false;
        this.page = true;
        this.showGrid = true;
        this.showItemGrid = false;
        //this.tblform.innerHTML = '';
        this.scndDynmTbl = '';

    }
    async onPrintClick(event) {
        try {
            this.growlMessage = [];

            if (this.chkReviewed) {
                var element = <HTMLInputElement>document.getElementById("tblform");
                event.stopImmediatePropagation();
                this.spinnerService.start();
                var html = await this.exportReportDetails()
                if (html != '' && html != null) {
                    var mywindow = window.open('', null, 'height=650,width=650,status=no,resizable=yes, scrollbars=yes, toolbar=no,location=center,menubar=no');
                    if (mywindow != null && mywindow != undefined) {

                        mywindow.document.write('<html><head><title>' + 'Point of Use - Post pick QA items' + '</title>');
                        mywindow.document.write('</head><body >');
                        mywindow.document.write(html);
                        mywindow.document.write('</body></html>');

                        mywindow.document.close(); // necessary for IE >= 10
                        mywindow.focus(); // necessary for IE >= 10*/

                        // mywindow.print();
                        // mywindow.close();

                        return true;
                    }
                    else {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please set allow pop-ups for this site in your browser' });
                    }
                }


            }
            else {

                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please click on Reviewed check box before printing the report' });
                return false;
            }
        } catch (ex) {
            this.clientErrorMsg(ex, 'onPrintClick');
            return false;
        }
        finally {
            this.spinnerService.stop();
        }
    }
    async exportReportDetails() {
        this.growlMessage = [];
        let statusCode = -1;
        let sbMailText: string;
        let _strFrmDt: string;
        let _strToDt: string;
        let htmlBuilder: string = '';
        let ipAddress = '';
        let gstrProtocal = '';
        let gstrServerName = ''
        let gstrPortNo = '';
        let imgserverPath: string = '';
        let perfrmDate = new Date(this.lblPerformDate).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
        // let startDate = '';
        let startDate = new Date(this.lblPerformDate).toLocaleDateString();
        //if (perfrmDate.includes(',')) {
        //    startDate = perfrmDate.split(',')[0].replace(',','');
        //}
        //else {
        //    startDate = perfrmDate.split(' ')[0].replace(',', '');
        //}

        await this.atParCommonService.getServerIP()
            .catch(this.httpService.handleError)
            .then((res: Response) => {
                var data = res.json() as AtParWebApiResponse<string>;
                switch (data.StatType) {
                    case StatusType.Success: {
                        ipAddress = data.DataVariable.toString();
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
                        gstrProtocal = data.Data.PROTOCOL.toString();
                        gstrServerName = data.Data.SERVER_NAME.toString();
                        gstrPortNo = data.Data.PORT_NO.toString();
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

        imgserverPath = gstrProtocal + '://' + ipAddress + '/atpar/AtParWebApi/assets/images/';

        let title: string = '""' + "AtparVersion 2.8" + '""';


        try {
            htmlBuilder = "<Table align=left width=100% cellpadding=0 cellspacing = 0 vAlign=top><tr><td>";
            htmlBuilder += "<Table align=left width=100% cellpadding=0 cellspacing = 0 vAlign=top>";
            htmlBuilder += "<TR width='100%'>";
            htmlBuilder += "<td colspan=2 align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=73% height=63></td><td align=left  width='85%' height=63 nowrap><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>";
            htmlBuilder += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD></TR>";
            htmlBuilder += "<tr><td align=left><span class=c2>Point of Use - Post pick QA items</span></td><td align=right><A  href=" + "javascript:window.print()" + "><img src=" + imgserverPath + "print.jpg></A></td><tr>";
            htmlBuilder += "<tr><td colspan=2>";
            htmlBuilder += "<table align=left width=100% border=1 rules='all'>";
            htmlBuilder += "<tr><td style='width: 33%' align='center'><b>Case ID</b></td><td style='width: 33%'  align='center'><b>Case Date</b></td><td style='width: 33%'  align='center'><b>" + this.lblPatientName + "</b></td></tr>";
            htmlBuilder += "<tr><td style='width: 33%'> " + this.lblCaseID + "</td><td style='width: 33%'>" + startDate + "</td><td style='width:33%'  align='center' valign='middle'><img style='vertical-align:middle' src='data:image/jpg;base64," + this.lblPatient + "' /></td></tr>";
            //htmlBuilder+="<tr><td style='width: 33%'>Case ID: " & lblCaseId.Text & "</td><td style='width: 33%'>Case Date: " & lblCaseDate.Text & "</td><td style='width: 33%'>Patient : " & lblPatient.Text & "</td></tr>")
            htmlBuilder += "<tr><td colspan=3 align=right valign=top>";
            htmlBuilder += "<table align=left width=100% border=0 rules='all'>";
            htmlBuilder += "<tr><td align='center' style='width: 33%' ><b>Physician</b></td><td align='center' style='width: 33%'><b>Procedure</b></td><td align='center' style='width: 33%'><b>Preference List</b></td></tr>";
            for (let i in this.lstDESCRS) {
                htmlBuilder += "<tr>";
                htmlBuilder += "<td align='left'>" + this.lstDESCRS[i].PHYSICIAN_DESCR + "</td>";
                htmlBuilder += "<td align='left'>" + this.lstDESCRS[i].PROC_DESCR + "</td>";
                htmlBuilder += "<td align='left'>" + this.lstDESCRS[i].PREF_DESCR + "</td>";
                htmlBuilder += "</tr>";
            }
            htmlBuilder += "</table>";
            htmlBuilder += "</tr>";
            htmlBuilder += "<tr><td colspan=3 align='right' >Reviewed By: " + this.userFullName + "&nbsp;</td></tr>";
            htmlBuilder += "</table></td></tr>";
            htmlBuilder += "<tr><td colspan=2> ";

            //For Details Table function call      
            await this.postPickQAService.buildReportPrint(EnumApps.PointOfUse, "DELIVERY SLIP", "DETAILS", this.lstITEMS)
                .catch(this.httpService.handleError)
                .then((res: Response) => {
                    this.growlMessage = [];
                    var data = res.json() as AtParWebApiResponse<SSL_CONFIG_DETAILS>;

                    if (data.StatusCode != AtparStatusCodes.ATPAR_OK) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Error While Building Details Data" });
                    }
                    else {
                        htmlBuilder += data.DataVariable;
                        htmlBuilder += "</td></tr>";
                        htmlBuilder += "</Table>";
                    }
                });


            return htmlBuilder;

        } catch (ex) {

        }
    }
    async  getUserFullName() {
        try {
            await this.atParCommonService.getUserFullName(this.deviceTokenEntry[TokenEntry_Enum.UserID]).
                catch(this.httpService.handleError).then((res: Response) => {

                    let data = res.json() as AtParWebApiResponse<string>;
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.userFullName = data.DataVariable.toString();
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

                });

        } catch (ex) {

        }
    }
    ngOnDestroy() {
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.lstCaseItemsInfo = [];
        this.lstDESCRS = [];
        this.lstITEMS = [];
        this.lstPostPick = [];
        this.spinnerService.stop();
        this.lstCaseforQA = [];
        this.vmcaseDetails = null;
    }

}