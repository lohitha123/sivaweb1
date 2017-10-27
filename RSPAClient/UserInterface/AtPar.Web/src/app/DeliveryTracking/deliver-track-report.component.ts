import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit, ViewChild, Input, Inject } from '@angular/core';

import { Http, Response } from "@angular/http";
import { MT_ATPAR_ORG_GROUPS } from '../../app/Entities/MT_ATPAR_ORG_GROUPS';
import { ActivatedRoute, Params } from '@angular/router';
import { MT_ATPAR_ORG_GROUP_BUNITS } from '../../app/Entities/MT_ATPAR_ORG_GROUP_BUNITS';
import { HttpServiceUtility } from '../shared/atparhttputilityservice';
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { ConfirmationService } from '../components/common/api';
import { TokenEntry_Enum, ClientType, MailPriority, YesNo_Enum } from '../Shared/AtParEnums';
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
import { NavigationExtras, Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { Injectable } from '@angular/core';
import { VM_DELV_PO_COMMENTS } from '../Entities/VM_DELV_PO_COMMENTS';
import { MT_ATPAR_USER } from '../../app/Entities/mt_atpar_user';
import { DeliveryTrackReportServiceComponent } from './deliver-track-report.service.component';
import { DOCUMENT, Title } from '@angular/platform-browser';

@Component({
    templateUrl: 'deliver-track-report.component.html',
    providers: [HttpService, ConfirmationService, AtParCommonService, DeliveryTrackReportServiceComponent],
})

@Injectable()
export class DeliveryTrackingComponent implements OnInit {
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
    mhsicon: string = "";


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
    defDateRange: number = 10;
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
    systemID: string = '';
    OrderNo: string = "";
    frmDateParam: string = "";
    toDateParam: string = "";
    pocomments: VM_DELV_PO_COMMENTS[];

    OrgGroupID: string = ""; srvrUserID: string = ""; PoId: string = ""; DeliverTo: string = "";
    TrackingNo: string = ""; DeliverdBy: string = ""; DeptId: string = ""; VendorName: string = "";
    ItmDesc: string = ""; Loc: string = ""; ItemId: string = "";
    Carrier: string = ""; Requestor: string = ""; BlnTflag: string = ""; DeliveryLoc: string = "";
    Status: string = ""; CurrStatus: string = ""; LocDescr: string = ""; PakageType: string = "";
    Pallet: string = ""
    blnDate: boolean = false;
    deliverMsg: string[] = [];
    _deviceTokenEntry: string[] = [];
    invalidSystemID: boolean = false;

    constructor(private httpService: HttpService, private _http: Http,
        private spinnerService: SpinnerService,
        private commonService: AtParCommonService,
        private atParConstant: AtParConstants,
        private route: ActivatedRoute,
        private DeliveryReportSevice: DeliveryTrackReportServiceComponent,
        private title: Title,
        @Inject(DOCUMENT) private document,
          private router: Router,

    ) {
        this.mhsicon = "assets/images/MHSAtpar.png";
        localStorage.setItem('isDeliverTracking', YesNo_Enum.Y.toString());
    }
    async  ngOnInit() {
        this.title.setTitle('Delivery Tracking Report');
        this.spinnerService.start();
        var urlFromDate: Date;
        var urlToDate: Date;
        this.route.queryParams.subscribe((params: Params) => {
            this.systemID = params['systemid'];
            this.OrderNo = params['Orderno'];
            this.fromDate = new Date();
            this.fromDate = params['FromDate'];
            urlFromDate = params['FromDate'];
            this.toDate = new Date();
            this.toDate = params['ToDate'];
            urlToDate = params['ToDate'];
        });
        let datetime = new Date().toLocaleString().toString();
        var dateStr = new Date().toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
        datetime = dateStr.replace(',', '')
        this._deviceTokenEntry[TokenEntry_Enum.UserID] = "";
        this._deviceTokenEntry[TokenEntry_Enum.DeviceID] = "";
        this._deviceTokenEntry[TokenEntry_Enum.DateTime] = datetime;
        this._deviceTokenEntry[TokenEntry_Enum.ClientType] = ClientType.WEB.toFixed().toString();
        this._deviceTokenEntry[TokenEntry_Enum.SystemId] = this.systemID;
        this._deviceTokenEntry[TokenEntry_Enum.AccessToken] = "";
        this._deviceTokenEntry[TokenEntry_Enum.IdleTime] = "1000";
        this._deviceTokenEntry[TokenEntry_Enum.DeptID] = "";
        this._deviceTokenEntry[TokenEntry_Enum.AppName] = EnumApps[EnumApps.Deliver].toString()
        localStorage.setItem("DeviceTokenEntry", JSON.stringify(this._deviceTokenEntry));


        this.recordsPerPageSize = 10;
        this.lstPackType = [];
        this.lstPackType.push({ label: "ALL", value: "0" }, { label: "PO", value: "1" }, { label: "NON PO", value: "2" });
        this.selectedPackageType = this.lstPackType[0].value;
        this.lstStatus.push({ label: "Select One", value: "" }, { label: "ALL", value: "ALL" }, { label: "Receive", value: "0" }, { label: "Download", value: "1" }, { label: "PickUp", value: "20" }, { label: "Load", value: "30" }, { label: "UnLoad", value: "40" }, { label: "Deliver", value: "50" }, { label: "HandOver", value: "100" }, { label: "Cancel", value: "13" });
        this.selectedStatus = this.lstStatus[1].value;
        this.lstCurrentStatus.push({ label: "Select One", value: "" }, { label: "ALL", value: "ALL" }, { label: "Receive", value: "0" }, { label: "Download", value: "1" }, { label: "PickUp", value: "20" }, { label: "Load", value: "30" }, { label: "UnLoad", value: "40" }, { label: "Deliver", value: "50" }, { label: "HandOver", value: "100" }, { label: "Cancel", value: "13" });
        this.selectedCurrStatus = this.lstCurrentStatus[0].value;
        this.blnCurrStatus = true;

         //this.getMyPreferences();

        this.growlMessage = [];
        if (this.systemID == '' || this.systemID == null) {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please provide systemid in url to access the report" });
            this.spinnerService.stop();
            return;
        }

        if (this.fromDate == undefined || this.toDate == undefined) {
            this.currentDate = new Date();
            this.toDate = new Date();
            this.fromDate = new Date();
            if (this.defDateRange.toString() != '' && this.defDateRange != null) {
                this.spinnerService.stop();
                this.fromDate = await this.addDays(this.fromDate, -this.defDateRange);
            }
        }

        var date = new Date();
        var todate = new Date(this.toDate);
        console.log(todate);
        console.log(date);
        if (todate > date) {

            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "To date must be less than or equal to current date" });
            this.spinnerService.stop();
            return;
        }


        if (this.systemID == null || this.systemID == undefined) {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please provide systemid in url to access the report" });
            this.selectedCurrStatus = "";
            this.selectedStatus = "";
            this.spinnerService.stop();
            return;
        }

        if (this.systemID != null) {
            if (this.systemID.trim() != "") {
                // Checks whether the systemid from the query string exists in the DB or not
                this.invalidSystemID = false
                this.systemID = this.systemID.toUpperCase();
                await this.DeliveryReportSevice.ValidateSystemID(this.systemID).catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<any>;
                    this.growlMessage = [];
                    if (data.StatusCode == -1) {
                        this.invalidSystemID = true;
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "System Id provided doesn't match with systems installed" });
                        this.spinnerService.stop();
                        return;
                    }
                    switch (data.StatType) {
                        case StatusType.Success:
                            {
                                if (this.OrderNo == undefined) {
                                    this.OrderNo = "";
                                }
                                console.log(urlFromDate);
                                console.log(urlToDate);
                                if (this.OrderNo !== "" && urlFromDate != undefined && urlToDate != undefined) {
                                    this.PoId = this.OrderNo;
                                    this.blnDate = true;
                                    this.getDeliveryDetails();
                                    return;
                                }
                                this.spinnerService.stop();
                                break;

                            }
                        case StatusType.Warn:
                            {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "System Id provided doesn't match with systems installed" });
                                this.spinnerService.stop();
                                break;
                            }
                        case StatusType.Error: {
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.spinnerService.stop();
                            break;
                        }
                    }
                });
            }
        }


    }

    async getMyPreferences() {

        try {
            await this.commonService.getMyPreferences('DEFAULT_REPORT_DURATION', this._deviceTokenEntry)
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



    show() {
        this.plus = !this.plus;
    }

    async ddlStatusChanged() {
        if (this.selectedStatus === "") {
            this.blnCurrStatus = false;
        }
        else {
            this.blnCurrStatus = true;
        }


    }

    async ddlCurrentStatusChanged() {
        if (this.selectedCurrStatus === "") {
            this.blnStatus = false;
        }
        else {
            this.blnStatus = true;
        }

    }

    async ddlOrgGrpIdChanged() {
        this.growlMessage = [];
        if (this.orgGroupIDForDBUpdate === this.selectedOrgGroupId) {


            return;
        }

        this.showGrid = false;
        this.showOnAllocateSelection = false;
        if (this.selectedOrgGroupId == "Select One") {

            return;
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
            this.clientErrorMsg(ex, "confirm");
        }
    }



    async BindDataGrid() {
        this.growlMessage = [];
        this.blnDate = false;
        this.spinnerService.start();
        if (this.systemID == null || this.systemID == '') {
            this.growlMessage.push({
                severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please provide systemid in url to access the report "
            });
            this.showGrid = false;
            this.spinnerService.stop();
            return;
        }
        if (this.invalidSystemID) {
            this.growlMessage.push({
                severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "System Id provided doesn't match with systems installed "
            });
            this.showGrid = false;
            this.spinnerService.stop();
            return;
        }
        if (this.fromDate > this.toDate) {
            this.growlMessage = [];
            this.growlMessage.push({
                severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Valid Date Range ( mm/dd/yyyy)"
            });
            this.spinnerService.stop();
            this.showGrid = false;
            return;
        }

        if (this.TrackingNo == undefined) {
            this.TrackingNo = "";
        }
        if (this.PoId == undefined) {
            this.PoId = "";
        }
        if (this.DeptId == undefined) {
            this.DeptId = "";
        }
        if (this.VendorName == undefined) {
            this.VendorName = "";
        }
        if (this.ItemId == undefined) {
            this.ItemId = "";
        }
        if (this.ItmDesc == undefined) {
            this.ItmDesc = "";
        }
        if (this.Carrier == undefined) {
            this.Carrier = "";
        }
        if (this.Loc == undefined) {
            this.Loc = "";
        }
        if (this.LocDescr == undefined) {
            this.LocDescr = "";
        }
        if (this.DeliverTo == undefined) {
            this.DeliverTo = "";
        }
        if (this.Requestor == undefined) {
            this.Requestor = "";
        }
        if (this.selectedCurrStatus === "" && this.selectedStatus === "") {
            this.spinnerService.stop();
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select either Status/Current Status" });
            this.showGrid = false;
            return;
        }

        if (this.TrackingNo === "" && this.PoId === "" && this.DeptId === "" && this.VendorName === "" && this.ItemId === "" && this.ItmDesc === "" && this.Carrier === "" && this.Loc === "" && this.LocDescr === "" && this.DeliverTo === "" && this.Requestor === "") {
            this.spinnerService.stop();
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please enter value for one of the key fields (Tracking No, Order No, Dept ID, Vendor Name,ItemID,Item Description,Carrier ID,Recipient,Requestor,Location,Location Description)" });
            this.showGrid = false;
            return;
        }

        try {


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
            this.showGrid = true;
            await this.getDeliveryDetails()

            this.spinnerService.stop();

        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindDataGrid");
        }

    }

    validateSearchFields() {

        this.pop = false;

        this.growlMessage = [];

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
            this.clientErrorMsg(ex, "validateSearchFields");
        }
    }


    async getDeliveryDetails() {
        var Fdate;
        var Tdate;
        try {
            if (this.blnDate == true) {
                Fdate = this.convertDateFormate(this.fromDate);
                Tdate = this.convertDateFormate(this.toDate);
            }
            else {
                Fdate = this.convertDateFormate(this.fromDate);
                Tdate = this.convertDateFormate(this.toDate);
            }
            var presentDate = new Date();
            if (this.fromDate > presentDate) {
                this.showGrid = false;
                this.spinnerService.stop();
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "From Date must be less than or equal to current date" });
                return;
            }
            var todate = new Date(this.toDate)
            if (todate > presentDate) {
                this.showGrid = false;
                this.spinnerService.stop();
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "To Date must be less than or equal to current date" });
                return;
            }


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
            this.showGrid = false;

            await this.DeliveryReportSevice.GetDeliveryTrackingReportData(this.TrackingNo, this.PoId, this.DeptId, Fdate, Tdate, this.VendorName, this.ItmDesc,
                this.ItemId, this.Carrier, this.Loc, this.Requestor, this.DeliverTo, this.Status, this.CurrStatus, this.systemID, this.LocDescr)
                .catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<any>;
                    this.growlMessage = [];
                    this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success:
                            {
                                this.showGrid = true;
                                this.deliverHeaders = [];
                                this.deliverHeaders = data.DataDictionary["pDsDetails"]["HEADERS"];
                                this.deliverDetails = data.DataDictionary["pDsDetails"]["DETAILS"];
                                this.deliverAttempts = data.DataDictionary["pDsDataArrayAttempt"]["ATTEMPTS"];
                                this.deliverHeaders.forEach(header => {
                                    let details = this.deliverDetails.filter(detail => detail.TRANSACTION_ID == header.TRANSACTION_ID);
                                    this.showexport = true;
                                    TotCycTime = 0;
                                    PrevCycleDateTime = new Date("1/1/0001 12:00:00 AM");

                                    if (details.length > 0) {

                                        let delvmessage: string;
                                        for (let intCnt = 0; intCnt <= details.length - 1; intCnt++) {
                                            details[intCnt]["CYCLE_TIME"] = "";
                                            CycledateTime = details[intCnt]["EVENT_DATE"];
                                            cycTime = new Date(CycledateTime);

                                            if (PrevCycleDateTime.toDateString() != DefDateTime.toDateString()) {

                                                var diff = (cycTime.getTime() - PrevCycleDateTime.getTime());

                                                if (diff > 0) {
                                                    TotCycTime = TotCycTime + diff;

                                                    details[intCnt]["CYCLE_TIME"] = this.GetTimeString(diff);
                                                }
                                            }


                                            PrevCycleDateTime = cycTime;

                                            if (details[intCnt]["EVENT_STATUS_MESSAGE"] == "Delivered") {

                                                //this.deliverMsg.push(details[intCnt]["EVENT_USER"].toString() + " has Delivered goods on " + details[intCnt]["EVENT_DATE"].toString());
                                                header.DeliverMsg = details[intCnt]["EVENT_USER"].toString() + " has Delivered goods on " + details[intCnt]["EVENT_DATE"].toString();
                                            }
                                            console.log(this.deliverMsg);
                                        }

                                    }




                                    header.DETAILS = details;
                                    console.log(header.DETAILS);


                                    let delAttempts = this.deliverAttempts.filter(attempt => attempt.TRANSACTION_ID == header.TRANSACTION_ID);
                                    header.ATTEMPTS = delAttempts;
                                    if (delAttempts.length > 0) { header.showAttempts = true } else { header.showAttempts = false }
                                });
                                //if (this.deliverMsg.length > 0) {
                                //    for (let i = 0; i <= this.deliverMsg.length - 1; i++) {
                                //        this.deliverHeaders[i].DeliverMsg = this.deliverMsg[i];
                                //    }
                                //}
                                if (this.recordsPerPageSize == 0) {
                                    this.deliverDetailRows = this.deliverHeaders.length;
                                } else {
                                    this.deliverDetailRows = this.recordsPerPageSize;
                                }

                                console.log(this.deliverHeaders);
                                break;

                            }
                        case StatusType.Warn:
                            {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                break;
                            }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;

                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'custom', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getDeliveryDetails");
        }
    }

    async onDeliverFilterData(data) {
        try {
            //  this.lstChargesFilterData = data;
        } catch (ex) {
            this.clientErrorMsg(ex, "onDeliverFilterData");
        }
    }

    async addDays(theDate, days) {
        return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
    }

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
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
                saveAs(blob, "DeliveryReport.xls");
            }


        } catch (ex) {
            this.clientErrorMsg(ex, "onExportToExcelClick");
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async onPrintClick(event) {
        try {
            event.stopImmediatePropagation();
            this.spinnerService.start();
            this.growlMessage = [];
            var html = await this.exportReportDetails('Print');
            if (html != '' && html != null) {
                var mywindow = window.open('', null, 'height=650,width=650,status=no,resizable=yes, scrollbars=yes, toolbar=no,location=center,menubar=no');
                if (mywindow != null && mywindow != undefined) {
                    mywindow.document.write('<html><head><title>' + 'Deliver Tracking Report' + '</title>');
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


            //imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
            imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/AtParWebApi/assets/images/';
            let imgSignaturePath: string = '';
            imgSignaturePath = this.httpService.BaseUrl + '/Uploaded/';



            let title: string = '""' + "AtparVersion 3.0" + '""';


            if (1 == 1) {


                htmlBuilder = "<Table align=left width=90% cellpadding=0 cellspacing = 0 vAlign=top>";

                if (reqType == 'Print') {
                    htmlBuilder += "<TR width='100%'><td   colspan=2 align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td><td align=left  width='85%' height=63 nowrap><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>"
                        + "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                        "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                        + "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                        + "<tr><td colspan=5 align=left><span class=c2><b> Delivery Report From " + this.convertDateFormate(this.fromDate) + " to " + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp;";

                    htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "" + "><img src=" + imgserverPath + "print.jpg></A>";
                } else {
                    if (reqType == 'Mail') {
                        htmlBuilder += "<TR height=63><td colspan=2 align=left bgcolor='#fe9836' width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg></td></TR>";
                    }
                    else {
                        htmlBuilder += "<TR height=63><TD align=left colspan=2><IMG height=63 width=18% src=" + imgserverPath + "logo.jpg title=Atpar 3><img src=" + imgserverPath + "topbg.jpg width=82% height=63></TD></TR>";
                    }
                    htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                        "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                        + "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                        + "<tr><td colspan=3 align=left><span class=c2><b> Delivery Report From " + this.convertDateFormate(this.fromDate) + " to " + this.convertDateFormate(this.toDate) + " </b></span></td><td align=right valign=top>&nbsp;";
                }

                htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                    + "<table align=center width=100% style=" + "BORDER-COLLAPSE:collapse" + " border=1>"
                    + "<tr bgcolor=#d3d3d3>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Order# - Line#</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>External Tracking#</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Internal Tracking#</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Item ID - Item Description</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Location</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Qty-Uom</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>MfgItem ID</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Dept ID</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Carrier ID</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Receipt Date</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Requestor</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Status(Event Time)</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Current Owner</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>PickUp User</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Vendor Name</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Employee Name</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Notes</td>"
                    + "</tr>";


                console.log(this.deliverHeaders);
                await this.deliverHeaders.forEach(header => {

                    if (header.ITEM_DESC == undefined || header.ITEM_DESC === " ") {
                        header.ITEM_DESC = "";
                    }
                    if (header.MFGITEMID == undefined) {
                        header.MFGITEMID = "";
                    }

                    htmlBuilder += "<tr>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.PO_ID + " - " + header.LINE + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.EXTTRACKING + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.INTTRACKING + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.ITEM_ID + " - " + header.ITEM_DESC + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.LOCATION + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.QTY + " - " + header.UOM + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.MFGITEMID + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.DEPT_ID + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.CARRIER_ID + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.RECEIPT_DATE + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff wrap>&nbsp;" + header.RECEPIENT + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.STATUS_MESSAGE + "(" + header.UPDATE_DATE + ")" + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.USER_ID + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.RECEIVE_USERID + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.VENDOR + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.RECEIVER_NAME + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.ITEM_NOTES + "&nbsp;</td>"

                        + "</tr>";

                    if (header.DETAILS.length > 0) {
                        imgserverPath = "C:\\2.8_Web\\UserInterface\\AtPar.Web\\Images\\";
                        htmlBuilder += "<tr>"
                            + "<td colspan=7>"
                            + "<table align=center width=90% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                            + "<tr bgcolor=#E0E0E0>"
                            + "<td align=center nowrap width=15%><span class=c3><b>Event</b></span></td>"
                            + "<td align=center nowrap width=8%><span class=c3><b> Event Date(mm/dd/yyyy) </b></span></td>"
                            + "<td align=center nowrap width=21%><span class=c3><b>Cycle Time</b></span></td>"
                            + "<td align=center nowrap width=10%><span class=c3><b>User</b></span></td>"
                            + "<td align=center nowrap width=12%><span class=c3><b>Delivery Location</b></span></td>"
                            + "<td align=center nowrap width=12%><span class=c3><b>Signature</b></span></td>"
                            + "</tr>";
                        header.DETAILS.forEach(detail => {
                            htmlBuilder += "<tr>"
                                + "<td align=left nowrap ><span class=c3>" + detail.EVENT_STATUS_MESSAGE + "</span></td>"
                                + "<td align=right nowrap><span class=c3>" + detail.EVENT_DATE + "</span></td>"
                                + "<td align=left style='mso-number-format:\@;' ><span class=c3>" + detail.CYCLE_TIME + "</span></td>"
                                + "<td align=right nowrap ><span class=c3>" + detail.EVENT_USER + "</span></td>";
                            + "<td align=left nowrap><span class=c3>" + detail.DELIVERY_LOCATION + "</span></td>";



                            if (detail.STATUS_MESSAGE == "Delivered ") {
                                htmlBuilder += "<td align=right nowrap ><span class=c3>" + imgSignaturePath + detail.SIGNATURE + ".jpg" + "</span></td>";
                            }
                            else {
                                htmlBuilder += "<td align=right Delivered ><span class=c3></span></td>";
                            }
                            htmlBuilder += "</tr>";

                        });
                        htmlBuilder += "</table>"
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

            //imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
            imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/AtParWebApi/assets/images/';




            let title: string = '""' + "AtparVersion 3.0" + '""';


            if (1 == 1) {


                htmlBuilder = "<Table align=left width=90% cellpadding=0 cellspacing = 0 vAlign=top>";

                if (reqType == 'Print') {
                    htmlBuilder += "<TR width='100%'><td   colspan=2 align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td><td align=left  width='85%' height=63 nowrap><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>"
                        + "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "" + "COLOR: #8b4513;FONT-FAMILY: verdana;FONT-SIZE: 8pt" + "" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                        + "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                        + "<tr><td colspan=5 align=left><span class=c2><b> Delivery Report From " + this.convertDateFormate(this.fromDate) + " to " + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp;";

                    htmlBuilder += "<A  href=" + "" + "javascript:printWindow()" + "" + "><img src=" + imgserverPath + "print.jpg></A>";
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
                    + "<table align=center width=100% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>"
                    + "<tr bgcolor=#d3d3d3>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Order# - Line#</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>External Tracking#</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Internal Tracking#</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Item ID - Item Description</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Location</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Qty - Uom</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>MfgItem ID</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Dept ID</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Carrier ID</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Receipt Date</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Requestor</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Status(Event Time)</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Current Owner</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>PickUp User</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Vendor Name</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Employee Name</td>"
                    + "<td bgcolor=#d3d3d3 nowrap>&nbsp;<center><b>Notes</td>"
                    + "</tr>";

                let deliverPrintDetails = this.deliverHeaders.filter(a => a.TRANSACTION_ID == transId);

                await deliverPrintDetails.forEach(header => {
                    htmlBuilder += "<tr>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.PO_ID + " - " + header.LINE_NO + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.EXTTRACKING + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.INTTRACKING + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.ITEM_ID + " - " + header.ITEM_DESC + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.LOCATION + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.QTY + " - " + header.UOM + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.MFG_ITEM_ID + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.DEPT_ID + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.CARRIER_ID + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.RECEIPT_DATE + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.RECEPIENT + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.STATUS_MESSAGE + "(" + header.UPDATE_DATE + ")" + "&nbsp;</td>"

                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.USER_ID + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.RECEIVE_USERID + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.VENDOR + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff nowrap>&nbsp;" + header.RECEIVER_NAME + "&nbsp;</td>"
                        + "<td bgcolor=#ffffff wrap>&nbsp;" + header.ITEM_NOTES + "&nbsp;</td>"

                        + "</tr>";
                    //htmlBuilder += "<tr>"
                    //    + "<td colspan='19'> PO Header Comments:" + header.HDR_COMMENTS + "</td></tr>"

                    if (header.DETAILS.length > 0) {
                        imgserverPath = "C:\\2.8_Web\\UserInterface\\AtPar.Web\\Images\\";
                        htmlBuilder += "<tr>"
                            + "<td colspan=7>"
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
                                + "<td align=left nowrap ><span class=c3>" + detail.EVENT_STATUS_MESSAGE + "</span></td>"
                                + "<td align=right nowrap><span class=c3>" + detail.EVENT_DATE + "</span></td>"
                                //+ "<td align=left style='mso-number-format:\@;' ><span class=c3>" + detail.CYCLE_TIME + "</span></td>"
                                + "<td align=right nowrap ><span class=c3>" + detail.EVENT_USER + "</span></td>";
                            + "<td align=left nowrap><span class=c3>" + detail.DELIVERY_LOCATION + "</span></td>";
                            if (detail.STATUS_MESSAGE == "Delivered ") {
                                htmlBuilder += "<td align=right nowrap ><span class=c3>" + imgserverPath + header.TRANSACTION_ID + ".jpg" + "</span></td>";
                            }
                            else {
                                htmlBuilder += "<td align=right Delivered ><span class=c3></span></td>";
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
            this.growlMessage = [];
            this.isMailDialog = true;
            this.toMailAddr = '';
        } catch (ex) {
            this.clientErrorMsg(ex, "onSendMailIconClick");
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
            this.growlMessage = [];

            if (html != '' && html != null) {
                await this.commonService.sendEmail(this._deviceTokenEntry[TokenEntry_Enum.SystemId], 'Deliver Track Report', JSON.stringify(html), this.toMailAddr, MailPriority.Normal.toString(), '')
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
            // if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
            this.isMailDialog = false;
            this.toMailAddr = '';
            //}

        } catch (ex) {
            this.clientErrorMsg(ex, "onSendMailClick");
        }
        finally {
            this.spinnerService.stop();
        }
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
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
                await this.commonService.sendEmbeddedEmail(this._deviceTokenEntry[TokenEntry_Enum.SystemId], 'Deliver Report', JSON.stringify(html), this.txtEventsMail, '', 'false', MailPriority.Normal.toString(), '')
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

            // if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
            this.isMailDialog = false;
            this.toMailAddr = '';
            //}

        } catch (ex) {
            this.clientErrorMsg(ex, "onSendEventsMailClick");
        }
        finally {

            this.spinnerService.stop();
        }
    }

    closeMailPopup() {
        this.growlMessage = [];
    }

    BreadCrumbMenu_Click() {
        window.location.reload();
    }

} 