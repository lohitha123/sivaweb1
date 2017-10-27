import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit, ViewChild, Input } from '@angular/core';
import { Http, Response } from "@angular/http";
import { MT_ATPAR_ORG_GROUPS } from '../../app/Entities/MT_ATPAR_ORG_GROUPS';
import { MT_ATPAR_ORG_GROUP_BUNITS } from '../../app/Entities/MT_ATPAR_ORG_GROUP_BUNITS';
import { HttpServiceUtility } from '../shared/atparhttputilityservice';
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { ConfirmationService } from '../components/common/api';
import { TokenEntry_Enum, ClientType, MailPriority } from '../Shared/AtParEnums';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { BusinessType } from '../Shared/AtParEnums';
import { StatusType } from '../Shared/AtParEnums';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { Message, SelectItem } from '../components/common/api';
import { DataTable } from '../components/datatable/datatable';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { AtParConstants } from '../Shared/AtParConstants';
import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';
import { EnumApps } from '../Shared/AtParEnums'
import { SSL_CONFIG_DETAILS } from '../Entities/SSL_CONFIG_DETAILS';
import { NavigationExtras } from '@angular/router';
import { saveAs } from 'file-saver';
import { Injectable } from '@angular/core';
import { VM_DELV_PO_COMMENTS } from '../Entities/VM_DELV_PO_COMMENTS';
import { MT_ATPAR_USER } from '../../app/Entities/mt_atpar_user';
import { DeliveryReportServiceComponent } from './deliver-delivery-report.service';

declare var module: {
    id: string;
}

@Component({
    templateUrl: 'deliver-delivery-report.component.html',
    providers: [HttpService, ConfirmationService, AtParCommonService, DeliveryReportServiceComponent],
})

@Injectable()
export class DeliveryReportComponent implements OnInit {
    deviceTokenEntry: string[] = [];
    recordsPerPageSize: number;
    growlMessage: Message[] = [];
    orgGroupData: MT_ATPAR_ORG_GROUPS[];
    blnShowOrgGroupLabel: boolean = false;
    selectedOrgGroupId: string;
    orgGrpId: string = "";
    order: string = "";
    blnShowOrgGroupDD: boolean = false;
    lstOrgGroups: SelectItem[] = [];
    lstOrgGroupsList: SelectItem[] = [];
    showGrid: boolean = false;
    showexport: boolean = false;



    selectedDisplay: string = "";
    showOnAllocateSelection: boolean = false;
    strMenuCode: string = "mt_deliver_report.aspx";
    strAuditData: string = "";
    strRowFilter: string = "";
    startIndex: number;
    EndIndex: number;
    blnsortbycolumn: boolean = true;
    orgGroupIDForDBUpdate: string;
    loading: boolean = true;
    //fromDate: string;
    //toDate: string;

    lstPackType: SelectItem[] = [];
    lstStatus: SelectItem[] = [];
    lstCurrentStatus: SelectItem[] = [];
    lstDeliverdBy: any[] = [];

    selectedPackageType: string = "";
    selectedStatus: string = "";
    selectedCurrStatus: string = "";
    selectedDeliverBy: string = "";
    selectedOrgGrpId: string = "";


    deliverHeaders: any[] = [];
    deliverDetails: any[] = [];
    deliverAttempts: any[] = [];

    deliverPoComments: any[] = [];
    deliverLineComments: any[] = [];

    statusCode: number = -1;
    noOfRecords: number = 0;
    defDateRange: number = 0;
    deliverDetailRows: number = 0;

    fromDate: Date;
    toDate: Date;
    currentDate: Date;

    tdExports: boolean = true;
    plus: boolean = true;
    blnStatus: boolean = false;
    blnCurrStatus: boolean = false;
    pop: boolean = false;

    gstrProtocal: string;
    gstrServerName: string;
    gstrPortNo: string;
    ipAddress: string;
    txtEventsMail: string;
    isMailDialog: boolean = false;
    toMailAddr: string = '';
    gSendEmailParamval: string = '';

    pocomments: VM_DELV_PO_COMMENTS[];

    OrgGroupID: string = ""; srvrUserID: string = ""; PoId: string = ""; DeliverTo: string = "";
    TrackingNo: string = ""; DeliverdBy: string = ""; DeptId: string = ""; VendorName: string = "";
    ItmDesc: string = ""; Loc: string = ""; ItemId: string = "";
    Carrier: string = ""; Requestor: string = ""; BlnTflag: string = ""; DeliveryLoc: string = "";
    Status: string = ""; CurrStatus: string = ""; LocDescr: string = ""; PakageType: string = "";
    Pallet: string = ""

    expandedItems: Array<any> = new Array<any>();

    constructor(private httpService: HttpService, private _http: Http,
        private spinnerService: SpinnerService,
        private commonService: AtParCommonService,
        private atParConstant: AtParConstants,
        private DeliveryReportSevice: DeliveryReportServiceComponent,

    ) {

    }
    async  ngOnInit() {

        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.recordsPerPageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        await this.bindOrgGroups();

        this.lstPackType = [];
        this.lstPackType.push({ label: "ALL", value: "0" }, { label: "PO", value: "PO" }, { label: "NON PO", value: "NON PO" });
        this.selectedPackageType = this.lstPackType[0].value;
        this.lstStatus.push({ label: "Select One", value: "STATUS" }, { label: "ALL", value: "ALL" }, { label: "Receive", value: "0" }, { label: "Download", value: "1" }, { label: "PickUp", value: "20" }, { label: "Load", value: "30" }, { label: "UnLoad", value: "40" }, { label: "Deliver", value: "50" }, { label: "HandOver", value: "100" }, { label: "Cancel", value: "13" });
        this.selectedStatus = this.lstStatus[0].value;
        this.lstCurrentStatus.push({ label: "Select One", value: "STATUS" }, { label: "Receive", value: "0" }, { label: "Download", value: "1" }, { label: "PickUp", value: "20" }, { label: "Load", value: "30" }, { label: "UnLoad", value: "40" }, { label: "Deliver", value: "50" }, { label: "HandOver", value: "100" }, { label: "Cancel", value: "13" });
        this.selectedCurrStatus = this.lstCurrentStatus[0].value;

        await this.getMyPreferences();
        this.bindDeliveredUsersList();
        this.getOrgParamValue();

        this.currentDate = new Date();
        this.toDate = new Date();
        this.fromDate = new Date();
        if (this.defDateRange.toString() != '' && this.defDateRange != null) {
            this.fromDate = await this.addDays(this.fromDate, -this.defDateRange);
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

        } catch (ex) {
            return AtparStatusCodes.E_SERVERERROR;
        }


        return AtparStatusCodes.ATPAR_OK;
    }

    async bindOrgGroups() {
        try {
            this.spinnerService.start();
            await this.commonService.getUserOrgGroups(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>;
                    this.growlMessage = [];

                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.orgGroupData = data.DataList;


                            if (this.orgGroupData.length == 1) {

                                this.blnShowOrgGroupLabel = true;
                                this.selectedOrgGroupId = this.orgGroupData[0].ORG_GROUP_ID;
                                this.orgGrpId = this.orgGroupData[0].ORG_GROUP_ID + " - " + this.orgGroupData[0].ORG_GROUP_NAME;
                                this.spinnerService.stop();
                                break;

                            }
                            else if (this.orgGroupData.length > 1) {
                                this.blnShowOrgGroupDD = true;
                                this.lstOrgGroups.push({ label: "Select One", value: "Select One" })
                                this.selectedOrgGrpId = this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID].toString();

                                for (var i = 0; i < this.orgGroupData.length; i++) {
                                    if (this.orgGroupData[i].ORG_GROUP_ID != "All") {
                                        this.lstOrgGroups.push({ label: this.orgGroupData[i].ORG_GROUP_ID + " - " + this.orgGroupData[i].ORG_GROUP_NAME, value: this.orgGroupData[i].ORG_GROUP_ID })
                                    }
                                }
                                this.spinnerService.stop();
                                break;
                            }

                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                    }

                });

        }
        catch (ex) {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: AtParConstants.ClientErrorMessage });
            this.spinnerService.stop();
        }
    }

    async bindDeliveredUsersList() {
        try {

            if (this.blnShowOrgGroupDD == true) {

                this.selectedOrgGroupId = this.selectedOrgGrpId;
            }
            this.lstDeliverdBy = [];
            this.lstDeliverdBy.push({ label: "Select User", value: "Select User" });
            this.spinnerService.start();
            await this.commonService.getUsersList(this.deviceTokenEntry[TokenEntry_Enum.UserID], EnumApps.Deliver, this.selectedOrgGroupId).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_USER>;


                    switch (data.StatType) {
                        case StatusType.Success: {
                            for (let i = 0; i < data.DataList.length; i++) {
                                this.lstDeliverdBy.push({
                                    label: data.DataList[i].FULLNAME,
                                    value: data.DataList[i].USER_ID
                                })
                            }
                            if (this.lstDeliverdBy.length <= 0 || this.lstDeliverdBy == null) {
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
            this.clientErrorMsg(ex);

        }
    }

    show() {
        this.plus = !this.plus;
    }

    async ddlStatusChanged() {
        if (this.selectedStatus != 'STATUS' && this.selectedStatus != '') {
            this.blnCurrStatus = true;
        }
        else {
            this.blnCurrStatus = false;
        }


    }

    async ddlCurrentStatusChanged() {

        if (this.selectedCurrStatus != 'STATUS' && this.selectedCurrStatus != '') {
            this.blnStatus = true;
        }
        else {
            this.blnStatus = false;
        }
    }

    async ddlOrgGrpIdChanged() {
        this.growlMessage = [];
        if (this.selectedOrgGrpId == "Select One") {
            this.lstDeliverdBy = [];
            this.lstDeliverdBy.push({ label: "Select User", value: "Select User" });
            // this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: " " });
            return;
        } else {            

            this.bindDeliveredUsersList();

        }

    }

    convertDateFormate(strDate) {
        var date = new Date(strDate),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [mnth, day , date.getFullYear()].join("/");
    }

    confirm() {
        try {
            this.growlMessage = [];
            // var rowData: any;
            var compareDates = new Date(this.toDate);
            var currentDate = new Date();
            if (compareDates.getTime() > currentDate.getTime()) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Todate must be less than or equal to current date " });
                return;
            }

        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async BindDataGrid() {

        try {


            this.strRowFilter = "";
            let returnValue: boolean = false;
            returnValue = await this.validateSearchFields();
            if (returnValue) {
                this.spinnerService.start();
                this.srvrUserID = this.deviceTokenEntry[TokenEntry_Enum.UserID].toString();
                this.OrgGroupID = this.selectedOrgGrpId;

                if (this.selectedStatus == "ALL" || this.selectedStatus == "STATUS") {
                    this.Status = "";

                }
                else {
                    this.Status = this.selectedStatus;
                }

                if (this.selectedCurrStatus == "ALL" || this.selectedCurrStatus == "STATUS") {
                    this.CurrStatus = "";
                }
                else {
                    this.CurrStatus = this.selectedCurrStatus;
                }

                await this.getDeliveryDetails()

                this.spinnerService.stop();
            }


        }
        catch (ex) {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: AtParConstants.ClientErrorMessage });
            this.spinnerService.stop();
        }

    }

    validateSearchFields() {

        this.pop = false;

        this.growlMessage = [];
        this.showGrid = false;

        try {
            this.growlMessage = [];

            if (this.blnCurrStatus == true) {
                if (this.selectedStatus == "STATUS" || this.selectedStatus == undefined || this.selectedStatus == "") {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Staus" });
                    return false;
                }
            }
            if (this.blnStatus == true) {
                if (this.selectedCurrStatus == "STATUS" || this.selectedCurrStatus == undefined || this.selectedCurrStatus == "") {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Current Status" });
                    return false;
                }
            }

            if (this.blnStatus == false && this.blnCurrStatus == false) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Status" });
                return false;
            }

            if (this.fromDate == null || this.fromDate.toString() == '' || this.toDate == null || this.toDate.toString() == '') {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please select a valid date range' });
                return false;
            }

            if (Date.parse(this.fromDate.toString()) && Date.parse(this.toDate.toString())) {
                if (Date.parse(this.convertDateFormate(this.toDate)) > Date.parse(this.convertDateFormate(this.currentDate))) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "To Date should be less than or equal to Today's Date" });
                    return false;
                }
            }

            if (Date.parse(this.convertDateFormate(this.fromDate)) > Date.parse(this.convertDateFormate(this.toDate))) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "From Date should be less than To Date" });
                return false;
            }


            return true;

        } catch (ex) {
            this.clientErrorMsg(ex);
            return false;
        }
    }


    async getDeliveryDetails() {

        try {
            this.showGrid = false;
            var Fdate = this.convertDateFormate(this.fromDate.toDateString());
            var Tdate = this.convertDateFormate(this.toDate.toDateString());

            var repItemlst: List<VM_DELV_PO_COMMENTS>
            var repItem: VM_DELV_PO_COMMENTS
            let DefDateTime: Date;
            let StausDateTime: Date;
            let CycledateTime: Date;
            let PrevCycleDateTime: Date;
            DefDateTime = new Date("1/1/0001 12:00:00 AM");
            let cycTime: Date;
            let TotCycTime: number;
            this.deliverHeaders = [];
            this.deliverDetails = [];
            this.deliverAttempts = [];
            this.showexport = false;
            await this.DeliveryReportSevice.GetDeliveryReportData(this.selectedOrgGroupId, Fdate, Tdate, this.srvrUserID, this.PoId, this.DeliverTo, this.TrackingNo, this.DeliverdBy, this.DeptId, this.VendorName, this.ItmDesc, this.Loc, this.ItemId,
                this.Carrier, this.Requestor, this.BlnTflag, this.DeliveryLoc, this.Status, this.CurrStatus, this.LocDescr, this.selectedPackageType, this.Pallet).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<any>;
                    this.growlMessage = [];
                    this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success:
                            {
                                this.showGrid = true;
                                this.deliverHeaders = data.DataDictionary["deliverHeaders"];
                                this.deliverDetails = data.DataDictionary["deliverDetails"];
                                this.deliverAttempts = data.DataDictionary["deliverAttempts"];

                                this.deliverHeaders.forEach(header => {
                                    let details = this.deliverDetails.filter(detail => detail.TRANSACTION_ID == header.TRANSACTION_ID);
                                    this.showexport = true;
                                    TotCycTime = 0;
                                    PrevCycleDateTime = new Date("1/1/0001 12:00:00 AM");
                                    if (details.length > 0) {

                                        for (let intCnt = 0; intCnt <= details.length - 1; intCnt++) {
                                            details[intCnt]["CYCLE_TIME"] = "";
                                            CycledateTime = details[intCnt]["STATUS_TIME"];
                                            cycTime = new Date(CycledateTime);

                                            if (PrevCycleDateTime.toDateString() != DefDateTime.toDateString()) {

                                                var diff = (cycTime.getTime() - PrevCycleDateTime.getTime());

                                                if (diff > 0) {
                                                    TotCycTime = TotCycTime + diff;

                                                    details[intCnt]["CYCLE_TIME"] = this.GetTimeString(diff);
                                                }
                                            }
                                            //var diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 

                                            PrevCycleDateTime = cycTime;
                                        }
                                    }

                                    let newTotRow = Object.assign({}, details[0]);
                                    newTotRow["CYCLE_TIME"] = this.GetTimeString(TotCycTime);
                                    newTotRow["STATUS_MESSAGE"] = "Total Cycle Time";
                                    newTotRow["STATUS_TIME"] = "";
                                    newTotRow["STATUS_USER"] = "";
                                    newTotRow["RECEPIENT"] = "";
                                    newTotRow["DELIVERY_LOCATION"] = "";
                                    newTotRow["SIGNATURE"] = "";
                                    details.push(newTotRow);


                                    header.DETAILS = details;
                                    header.IsExpand = false;
                                    
                                    repItem = new VM_DELV_PO_COMMENTS();
                                    repItemlst = new List<VM_DELV_PO_COMMENTS>();
                                    repItem.HEADER_COMMENTS = details[0].HDR_COMMENTS;
                                    repItem.LINE_COMMENTS = details[0].COMMENTS;

                                    if (details[0].HDR_COMMENTS == "") {
                                        header.SHOW_PO_COMMENTS = false;
                                    }
                                    else {
                                        header.SHOW_PO_COMMENTS = true;
                                    }
                                    header.styleExpand = 'right';

                                    if (details[0].COMMENTS == "") {
                                        header.SHOW_LINE_COMMENTS = false;
                                    }
                                    else {
                                        header.SHOW_LINE_COMMENTS = true;
                                    }

                                    repItemlst.Add(repItem)
                                    header.POCOMMENTS = repItemlst.ToArray();
                                    this.expandedItems.push(header);
                                  
                                    let delAttempts = this.deliverAttempts.filter(attempt => attempt.TRANSACTION_ID == header.TRANSACTION_ID);
                                    header.ATTEMPTS = delAttempts;
                                    if (delAttempts.length > 0) { header.showAttempts = true } else { header.showAttempts = false }
                                });

                                if (this.recordsPerPageSize == 0) {
                                    this.deliverDetailRows = this.deliverHeaders.length;
                                } else {
                                    this.deliverDetailRows = this.recordsPerPageSize;
                                }


                                break;

                            }
                        case StatusType.Warn:
                            {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
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
        }
        catch (ex) {
            this.spinnerService.stop();
            this.clientErrorMsg(ex);
        }
    }
    async onPOLineClick(rowData: any, event: any) {
        if (rowData.styleExpand == 'down') {
            rowData.IsExpand = false;
            rowData.styleExpand = 'right';
        } else {
            rowData.IsExpand = true;
            rowData.styleExpand = 'down';
        }
      
    }
    async onDeliverFilterData(data) {
        try {
            //  this.lstChargesFilterData = data;
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async addDays(theDate, days) {
        return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
    }

    clientErrorMsg(strExMsg) {
        this.growlMessage = [];
        this.spinnerService.stop();
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString());
    }

    async onExportToExcelClick(event) {
        try {
            event.stopImmediatePropagation();
            this.spinnerService.start();
            let html: string = await this.exportReportDetails('Excel');  
            let blob = new Blob([html], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
            });
            saveAs(blob, "DeliveryReport.xls");

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {
            this.spinnerService.stop();
        }
    }

    public GetTimeString(millseconds) {
        var seconds = Math.floor(millseconds / 1000);
        var scndstr: string;
        var hourstr: string;
        var minutesstr: string;
        scndstr = "";
        hourstr = "";
        minutesstr = "";

        var h = 3600;
        var m = 60;
        var hours = Math.floor(seconds / h);
        var minutes = Math.floor((seconds % h) / m);
        var scnds = Math.floor((seconds % m));
        var timeString = '';
        if (scnds < 10) { scndstr = "0" + scnds } else { scndstr = scnds.toString() };
        if (hours < 10) { hourstr = "0" + hours } else { hourstr = hours.toString() };
        if (minutes < 10) { minutesstr = "0" + minutes } else { minutesstr = minutes.toString() };
        timeString = hourstr + ":" + minutesstr + ":" + scndstr;
        return timeString;
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

           imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/AtPar/AtParWebApi/assets/images/'



            let title: string = '""' + "AtparVersion 3.0" + '""';


            if (1 == 1) {


                htmlBuilder = "<Table align=left width=90% cellpadding=0 cellspacing = 0 vAlign=top>";

                if (reqType == 'Print') {
                    htmlBuilder += "<TR width='100%'><td   colspan=2 align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td><td align=left  width='85%' height=63 nowrap><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>"
                        + "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                        + "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                        + "<tr><td colspan=5 align=left><span class=c2><b> Delivery Report From " + this.convertDateFormate(this.fromDate) + " to " + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp;";
                                       
                    htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "><img src=" + imgserverPath + "print.jpg></A>"
                } else {
                    if (reqType == 'Mail') {
                        htmlBuilder += "<TR height=63><TD align=left colspan=2><IMG height=63 width=18% src=cid:logo title=Atpar 3><img src=cid:topbg width=82% height=63></TD></TR>";
                    }
                    else {
                        htmlBuilder += "<TR height=63><TD align=left colspan=2><IMG height=63 width=18% src=" + imgserverPath + "logo.jpg title=Atpar 3><img src=" + imgserverPath + "topbg.jpg width=82% height=63></TD></TR>";
                    }
                    htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                        + "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                        + "<tr><td colspan=3 align=left><span class=c2><b> Delivery Report From " + this.convertDateFormate(this.fromDate) + " to " + this.convertDateFormate(this.toDate) + " </b></span></td><td align=right valign=top>&nbsp;";
                }

                htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                    + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1 cellpadding='4'>"
                    + "<tr bgcolor=#d3d3d3>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Order# - Line#</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>External Tracking#</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Internal Tracking#</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Location - Description</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Dept ID</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Qty</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Uom</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Current Owner</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Item ID</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>MfgItem ID</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Item Description</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Carrier</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Receipt Date</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>PickUp User</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Requestor</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Status</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Vendor Name</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Notes</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Pallet</td>"
                    + "</tr>";



                await this.deliverHeaders.forEach(header => {
                    htmlBuilder += "<tr>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.PO_ID + " - " + header.LINE_NO + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.REPORT_DATA_31 + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.REPORT_DATA_3 + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.LOCATION + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.DEPT_ID + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.QTY + "&nbsp;</td>";
                    if (header.UOM == null || header.UOM == '') {
                        htmlBuilder += "<td bgcolor=#ffffff wrap>&nbsp;</td>";
                    }
                    else {
                        htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + header.UOM + "&nbsp;</td>";
                    }
                    if (header.CURRENT_STATUS_USER == null || header.CURRENT_STATUS_USER == '') {
                        htmlBuilder += "<td bgcolor=#ffffff wrap>&nbsp;</td>";
                    }
                    else {
                        htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + header.CURRENT_STATUS_USER + "&nbsp;</td>";
                    }
                    if (header.ITEM_ID == null || header.ITEM_ID == '') {
                        htmlBuilder += "<td bgcolor=#ffffff wrap>&nbsp;</td>";
                    }
                    else {
                        htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + header.ITEM_ID + "&nbsp;</td>";
                    }
                    if (header.MFGITEMID == null || header.MFGITEMID == '') {
                        htmlBuilder += "<td bgcolor=#ffffff wrap>&nbsp;</td>";
                    }
                    else {
                        htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + header.MFGITEMID + "&nbsp;</td>";
                    }
                      
                    
                    htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + header.REPORT_DATA_8 + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.CARRIER_ID + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.RECEIPT_DATE + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.PICKUP_USER + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.DELIVERED_TO + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.STATUS_MESSAGE + "(" + header.STATUS_TIME + ")" + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.VENDOR_NAME + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff wrap>&nbsp;" + header.ITEM_NOTES + "&nbsp;</td>";
                    if (header.PALLET == null || header.PALLET == '') {
                        htmlBuilder += "<td bgcolor=#ffffff wrap>&nbsp;</td>";
                    }
                    else {
                        htmlBuilder += "<td bgcolor=#ffffff wrap>&nbsp;" + header.PALLET + "&nbsp;</td>";
                    }
                    htmlBuilder += "</tr>";
                    htmlBuilder += "<tr>"
                        + "<td colspan='19'> PO Header Comments:" + header.HDR_COMMENTS + "</td></tr>"

                    if (header.DETAILS.length > 0) {
                        let sigimgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/AtPar/AtParWebApi/Uploaded/';
                        htmlBuilder += "<tr>"
                            + "<td colspan=19>"
                            + "<table align=center width=90% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1 cellpadding='4'>"
                            + "<tr bgcolor=#E0E0E0>"
                            + "<td align=center nowrap width=15%><span class=c3><b>Event</b></span></td>"
                            + "<td align=center nowrap width=8%><span class=c3><b> Event Date(mm/dd/yyyy) </b></span></td>"
                            + "<td align=center nowrap width=21%><span class=c3><b>Cycle Time</b></span></td>"
                            + "<td align=center nowrap width=10%><span class=c3><b>User</b></span></td>"
                            + "<td align=center nowrap width=12%><span class=c3><b>Recepient</b></span></td>"
                            + "<td align=center nowrap width=12%><span class=c3><b>Delivery Location</b></span></td>"
                            + "<td align=center nowrap width=10%><span class=c3><b>Drop Off </b></span></td>"
                            + "<td align=center nowrap width=12%><span class=c3><b>Signature</b></span></td>"
                            + "</tr>";
                        header.DETAILS.forEach(detail => {
                            htmlBuilder += "<tr>"
                                + "<td align=left nowrap ><span class=c3>" + detail.STATUS_MESSAGE + "</span></td>"
                                + "<td align=right nowrap><span class=c3>" + detail.STATUS_TIME + "</span></td>"
                                + "<td align=left style='mso-number-format:\@;' ><span class=c3>" + detail.CYCLE_TIME + "</span></td>";
                               
                            if (detail.STATUS_USER == '' || detail.STATUS_USER == null) {
                                htmlBuilder += "<td align=right nowrap ><span class=c3>&nbsp;</span></td>";
                            }
                            else {
                                htmlBuilder += "<td align=left nowrap ><span class=c3>" + detail.STATUS_USER + "</span></td>";
                            }

                            if (detail.RECEPIENT == '' || detail.RECEPIENT == null) {
                                htmlBuilder += "<td align=right nowrap ><span class=c3>&nbsp;</span></td>";
                            }
                            else {
                                htmlBuilder += "<td align=left nowrap ><span class=c3>" + detail.RECEPIENT + "</span></td>";
                            }
                            if (detail.DELIVERY_LOCATION == '' || detail.DELIVERY_LOCATION == null) {
                                htmlBuilder += "<td align=right nowrap ><span class=c3>&nbsp;</span></td>";
                            }
                            else {
                                htmlBuilder += "<td align=left nowrap ><span class=c3>" + detail.DELIVERY_LOCATION + "</span></td>";
                            }

                            if (detail.HANDOVER == '' || detail.HANDOVER == null) {
                                htmlBuilder += "<td align=right nowrap ><span class=c3>&nbsp;</span></td>";
                            }
                            else {
                                htmlBuilder += "<td align=left nowrap ><span class=c3>" + detail.HANDOVER + "</span></td>";
                            }
                                                       


                            if (detail.STATUS_MESSAGE == "Delivered") {

                                if (reqType == 'Mail') {

                                    if (this.gSendEmailParamval == "Y") {
                                        htmlBuilder += "<td align=right nowrap ><img  src=" + sigimgserverPath + header.TRANSACTION_ID + ".jpg ></td>";
                                    }
                                    else {
                                        htmlBuilder += "<td align=right ><span class=c3></span></td>";
                                    }
                                }
                                else {
                                    htmlBuilder += "<td align=right nowrap ><img  src=" + sigimgserverPath + header.TRANSACTION_ID + ".jpg ></td>";
                                }
                            }
                            else {
                                htmlBuilder += "<td align=right ><span class=c3></span></td>";
                            }


                            htmlBuilder += "</tr>";

                        });



                        htmlBuilder += "</table>"
                        htmlBuilder += "<tr>"
                            + "<td colspan=19> PO Line Comments: " + header.COMMENTS + "</td></tr>"
                            + "</td>"
                            + "</tr>";
                    }

                    if (header.ATTEMPTS.length > 0) {

                        htmlBuilder += "<tr><td colspan=19>"
                            + "<table align=center width=90% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                            + "<tr bgcolor=#E0E0E0>"
                            + "<td align=center nowrap width=25%><span class=c3><b>Attempt Date(mm/dd/yyyyy)</b></span></td>"
                            + "<td align=center nowrap width=75%><span class=c3><b>Comments</b></span></td>"
                            + "</tr>";
                        header.ATTEMPTS.forEach(attempts => {
                            htmlBuilder += "<tr>"
                                + "<td align=center nowrap width=25%><span class=c3>" + attempts.ATTEMPT_DATE + "</span></td>"
                                + "<td align=center nowrap width=75%><span class=c3>" + attempts.COMMENT + "</td>"
                                + "</tr>";
                        });

                        htmlBuilder += "</table>";
                        htmlBuilder += "</td></tr>"
                    }

                });

                htmlBuilder += "</table></Table>";

            }

            return await htmlBuilder;


        }
        catch (ex) {
            htmlBuilder = '';
            return htmlBuilder;
        }
    }

    async exportsubReportDetails(reqType: string, transId: string) {
        let htmlBuilder: string = '';
        try {
            this.statusCode = -1;
            this.growlMessage = [];
            let sbMailText: string;
            let _strFrmDt: string;
            let _strToDt: string;


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

           // imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
            imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/AtPar/AtParWebApi/assets/images/'





            let title: string = '""' + "AtparVersion 3.0" + '""';


            if (1 == 1) {


                htmlBuilder = "<Table align=left width=90% cellpadding=0 cellspacing = 0 vAlign=top>";

                if (reqType == 'Print') {
                    htmlBuilder += "<TR width='100%'><td   colspan=2 align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td><td align=left  width='85%' height=63 nowrap><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>"
                        + "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                        + "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                        + "<tr><td colspan=5 align=left><span class=c2><b> Delivery Report From " + this.convertDateFormate(this.fromDate) + " to " + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp;";

                   
                    htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "><img src=" + imgserverPath + "print.jpg></A>"
                } else {
                    if (reqType == 'Mail') {
                        htmlBuilder += "<TR height=63><TD align=left bgcolor='#fe9836' colspan=2><IMG height=63  width=18% src=cid:logo title=Atpar 3></TD></TR>";
                    }
                    else {
                        htmlBuilder += "<TR height=63><TD align=left colspan=2><IMG height=63 width=18% src=" + imgserverPath + "logo.jpg title=Atpar 3><img src=" + imgserverPath + "topbg.jpg width=82% height=63></TD></TR>";
                    }
                    htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                        + "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                        + "<tr><td colspan=3 align=left><span class=c2><b> Delivery Report From " + this.convertDateFormate(this.fromDate) + " to " + this.convertDateFormate(this.toDate) + " </b></span></td><td align=right valign=top>&nbsp;";
                }

                htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                    + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                    + "<tr bgcolor=#d3d3d3>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Order# - Line#</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>External Tracking#</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Internal Tracking#</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Location - Description</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Dept ID</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Qty</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Uom</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Current Owner</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Item ID</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>MfgItem ID</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Item Description</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Carrier</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Receipt Date</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>PickUp User</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Requestor</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Status</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Vendor Name</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Notes</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Pallet</td>"
                    + "</tr>";

                let deliverPrintDetails = this.deliverHeaders.filter(a => a.TRANSACTION_ID == transId);

                await deliverPrintDetails.forEach(header => {
                    htmlBuilder += "<tr>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.PO_ID + " - " + header.LINE_NO + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.REPORT_DATA_31 + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.REPORT_DATA_3 + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.LOCATION + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.DEPT_ID + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.QTY + "&nbsp;</td>"
                    if (header.UOM == null || header.UOM == '') {
                        htmlBuilder += "<td bgcolor=#ffffff wrap>&nbsp;</td>";
                    }
                    else {
                        htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + header.UOM + "&nbsp;</td>";
                    }
                    if (header.CURRENT_STATUS_USER == null || header.CURRENT_STATUS_USER == '') {
                        htmlBuilder += "<td bgcolor=#ffffff wrap>&nbsp;</td>";
                    }
                    else {
                        htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + header.CURRENT_STATUS_USER + "&nbsp;</td>";
                    }
                    if (header.ITEM_ID == null || header.ITEM_ID == '') {
                        htmlBuilder += "<td bgcolor=#ffffff wrap>&nbsp;</td>";
                    }
                    else {
                        htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + header.ITEM_ID + "&nbsp;</td>";
                    }
                    if (header.MFGITEMID == null || header.MFGITEMID == '') {
                        htmlBuilder += "<td bgcolor=#ffffff wrap>&nbsp;</td>";
                    }
                    else {
                        htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + header.MFGITEMID + "&nbsp;</td>";
                    }
                    htmlBuilder += "<td bgcolor=#ffffff nowrap>&nbsp;" + header.REPORT_DATA_8 + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.CARRIER_ID + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.RECEIPT_DATE + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.PICKUP_USER + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.DELIVERED_TO + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.STATUS_MESSAGE + "(" + header.STATUS_TIME + ")" + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.VENDOR_NAME + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff wrap>&nbsp;" + header.ITEM_NOTES + "&nbsp;</td>";
                    if (header.PALLET == null || header.PALLET == '') {
                        htmlBuilder += "<td bgcolor=#ffffff wrap>&nbsp;</td>";
                    }
                    else {
                        htmlBuilder += "<td bgcolor=#ffffff wrap>&nbsp;" + header.PALLET + "&nbsp;</td>";
                    }
                    htmlBuilder += "</tr>";
                    htmlBuilder += "<tr>"
                        + "<td colspan='19'> PO Header Comments:" + header.HDR_COMMENTS + "</td></tr>"

                    if (header.DETAILS.length > 0) {
                        let sigimgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/AtPar/AtParWebApi/Uploaded/';
                        htmlBuilder += "<tr>"
                            + "<td colspan=19>"
                            + "<table align=center width=90% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                            + "<tr bgcolor=#E0E0E0>"
                            + "<td align=center nowrap width=15%><span class=c3><b>Event</b></span></td>"
                            + "<td align=center nowrap width=8%><span class=c3><b> Event Date(mm/dd/yyyy) </b></span></td>"
                            + "<td align=center nowrap width=21%><span class=c3><b>Cycle Time</b></span></td>"
                            + "<td align=center nowrap width=10%><span class=c3><b>User</b></span></td>"
                            + "<td align=center nowrap width=12%><span class=c3><b>Recepient</b></span></td>"
                            + "<td align=center nowrap width=12%><span class=c3><b>Delivery Location</b></span></td>"
                            + "<td align=center nowrap width=10%><span class=c3><b>Drop Off </b></span></td>"
                            + "<td align=center nowrap width=12%><span class=c3><b>Signature</b></span></td>"
                            + "</tr>";
                        header.DETAILS.forEach(detail => {
                            htmlBuilder += "<tr>"
                                + "<td align=left nowrap ><span class=c3>" + detail.STATUS_MESSAGE + "</span></td>"
                                + "<td align=right nowrap><span class=c3>" + detail.STATUS_TIME + "</span></td>"
                                + "<td align=left style='mso-number-format:\@;' ><span class=c3>" + detail.CYCLE_TIME + "</span></td>";

                            if (detail.STATUS_USER == '' || detail.STATUS_USER == null) {
                                htmlBuilder += "<td align=right nowrap ><span class=c3>&nbsp;</span></td>";
                            }
                            else {
                                htmlBuilder += "<td align=left nowrap ><span class=c3>" + detail.STATUS_USER + "</span></td>";
                            }

                            if (detail.RECEPIENT == '' || detail.RECEPIENT == null) {
                                htmlBuilder += "<td align=left nowrap ><span class=c3>&nbsp;</span></td>";
                            }
                            else {
                                htmlBuilder += "<td align=left nowrap ><span class=c3>" + detail.RECEPIENT + "</span></td>";
                            }
                            if (detail.DELIVERY_LOCATION == '' || detail.DELIVERY_LOCATION == null) {
                                htmlBuilder += "<td align=right nowrap ><span class=c3>&nbsp;</span></td>";
                            }
                            else {
                                htmlBuilder += "<td align=left nowrap ><span class=c3>" + detail.DELIVERY_LOCATION + "</span></td>";
                            }

                            if (detail.HANDOVER == '' || detail.HANDOVER == null) {
                                htmlBuilder += "<td align=left nowrap ><span class=c3>&nbsp;</span></td>";
                            }
                            else {
                                htmlBuilder += "<td align=right nowrap ><span class=c3>" + detail.HANDOVER + "</span></td>";
                            }


                            if (detail.STATUS_MESSAGE == "Delivered") {

                                if (reqType == 'Mail') {

                                    if (this.gSendEmailParamval == "Y") {
                                        htmlBuilder += "<td align=right nowrap ><img  src=" + sigimgserverPath + header.TRANSACTION_ID + ".jpg ></td>";
                                    }
                                    else {
                                        htmlBuilder += "<td align=right ><span class=c3></span></td>";
                                    }
                                }
                                else {
                                    htmlBuilder += "<td align=right nowrap ><img  src=" + sigimgserverPath + header.TRANSACTION_ID + ".jpg ></td>";
                                }
                            }
                            else {
                                htmlBuilder += "<td align=right ><span class=c3></span></td>";
                            }



                            htmlBuilder += "</tr>";

                        });



                        htmlBuilder += "</table>"
                        htmlBuilder += "<tr>"
                            + "<td colspan=19> PO Line Comments: " + header.COMMENTS + "</td></tr>"
                            + "</td>"
                            + "</tr>";
                    }

                    if (header.ATTEMPTS.length > 0) {

                        htmlBuilder += "<tr><td colspan=19>"
                            + "<table align=center width=90% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                            + "<tr bgcolor=#E0E0E0>"
                            + "<td align=center nowrap width=25%><span class=c3><b>Attempt Date(mm/dd/yyyyy)</b></span></td>"
                            + "<td align=center nowrap width=75%><span class=c3><b>Comments</b></span></td>"
                            + "</tr>";
                        header.ATTEMPTS.forEach(attempts => {
                            htmlBuilder += "<tr>"
                                + "<td align=center nowrap width=25%><span class=c3>" + attempts.ATTEMPT_DATE + "</span></td>"
                                + "<td align=center nowrap width=75%><span class=c3>" + attempts.COMMENT + "</td>"
                                + "</tr>";
                        });

                        htmlBuilder += "</table>";
                        htmlBuilder += "</td></tr>"
                    }

                });

                htmlBuilder += "</table></Table>";

            }

            return await htmlBuilder;


        }
        catch (ex) {
            htmlBuilder = '';
            return htmlBuilder;
        }
    }

    async onSendMailIconClick(event) {
        try {
            this.isMailDialog = true;
            this.toMailAddr = '';
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async onSendMailClick(event) {
        try {
            this.spinnerService.start();
            let html: string = await this.exportReportDetails('Mail');
            let toAddr: string = '';
            this.growlMessage = [];
            this.isMailDialog = false;

            if (html != '' && html != null) {
                await this.commonService.sendEmbeddedEmail(this.deviceTokenEntry[TokenEntry_Enum.SystemId], 'Deliver Report', JSON.stringify(html), this.toMailAddr, '', 'false', MailPriority.Normal.toString(), '')
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

    async onPrintClick(event) {
        
        try {
            event.stopImmediatePropagation();
            this.spinnerService.start();
            var html = await this.exportReportDetails('Print');
            if (html != '' && html != null) {

                var mywindow = window.open(document.URL, null, 'height=650,width=650,status=no,resizable=yes, scrollbars=yes, toolbar=no,location=center,menubar=no');
                if (mywindow != null && mywindow != undefined) {
                   
                    mywindow.document.write('<html><head><title>' + 'Deliver - Delivery Report' + '</title>');
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
            this.clientErrorMsg(ex);
            return false;
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async onSendEventsMailClick(event, EventsData) {
        try {

            let Transid = EventsData[0].TRANSACTION_ID;
            this.spinnerService.start();
            let html: string = await this.exportsubReportDetails('Mail', Transid);
            let toAddr: string = '';
            this.growlMessage = [];
            //let blob = new Blob([html], {
            //    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
            //});
            //saveAs(blob, "DeliveryReport.xls");  


            if (html != '' && html != null) {
                await this.commonService.sendEmbeddedEmail(this.deviceTokenEntry[TokenEntry_Enum.SystemId], 'Deliver Report', JSON.stringify(html), this.txtEventsMail, '', 'false', MailPriority.Normal.toString(), '')
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
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Email Server not configured! Please contact Administrator' });
                }
                else if (this.statusCode == AtparStatusCodes.EMAIL_SEND_FAILED) {
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Mail Not Sent. Please Try Again' });
                }
                else {
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Error while sending mail' });
                }
            }

            // if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
            this.isMailDialog = false;
            this.toMailAddr = '';
            //}

        } catch (ex) {
            this.clientErrorMsg(ex);
        }
        finally {

            this.spinnerService.stop();
        }
    }

    async getOrgParamValue() {
        try {
            await this.commonService.getOrgGroupParamValue('DELIVER_SEND_SIGN_IN_MAIL', EnumApps.Deliver, this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID])
                .catch(this.httpService.handleError)
                .then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<number>;
                    this.statusCode = data.StatusCode;
                    if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
                        this.gSendEmailParamval = data.DataVariable.toString();
                    }
                });
            if (this.statusCode != AtparStatusCodes.ATPAR_OK) {
                return AtparStatusCodes.E_SERVERERROR;
            }
        } catch (ex) {
            return AtparStatusCodes.E_SERVERERROR;
        }
        return AtparStatusCodes.ATPAR_OK;
    }

    ngOnDestroy() {

        this.deliverHeaders = null
        this.deliverDetails = null;
        this.deliverAttempts = null;

        this.deliverPoComments = null;
        this.deliverLineComments = null;
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.showGrid = null;
        this.spinnerService.stop();

    }


} 
