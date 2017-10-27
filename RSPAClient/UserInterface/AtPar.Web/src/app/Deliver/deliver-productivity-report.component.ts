import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { Http, Response } from '@angular/http';
import { HttpServiceUtility } from '../shared/atparhttputilityservice';
import { HttpService } from '../Shared/HttpService';
import { MT_ATPAR_ORG_GROUPS } from '../../app/Entities/MT_ATPAR_ORG_GROUPS';
import { CHART_DATASET } from '../../app/Entities/CHART_DATASET';
import { MT_ATPAR_ORG_GROUP_BUNITS } from '../../app/Entities/MT_ATPAR_ORG_GROUP_BUNITS';
import { BusinessType } from '../Shared/AtParEnums';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { SelectItem } from '../components/common/api';
import { TokenEntry_Enum, ClientType, MailPriority } from '../Shared/AtParEnums';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { StatusType, EnumApps } from '../Shared/AtParEnums';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { AtParConstants } from '../Shared/AtParConstants';
import { DeliverProductivityService } from '../Deliver/deliver-productivity-report.component.service';
import { Message } from '../components/common/api';
import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';
import { SSL_CONFIG_DETAILS } from '../Entities/SSL_CONFIG_DETAILS';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MT_ATPAR_USER } from '../../app/Entities/mt_atpar_user';
import { VM_DELV_PROD } from '../../app/Entities/VM_DELV_PROD';
import { VM_TABLE_AVG } from '../../app/Entities/VM_TABLE_AVG';
import { VM_RECVDELV_EMPLOYEE } from '../../app/Entities/VM_RECVDELV_EMPLOYEE';
import { VM_CYCLETIME_DETAILS } from '../../app/Entities/VM_CYCLETIME_DETAILS';
import { VM_RESULTS } from '../../app/Entities/VM_RESULTS';
import { saveAs } from 'file-saver';
declare var module: {
    id: string;
}

@Component({
    templateUrl: 'deliver-productivity-report.component.html',
    providers: [AtParCommonService, AtParConstants, DeliverProductivityService]
})

export class ProductivityReportComponent {
    deviceTokenEntry: string[] = [];
    recordsPerPageSize: number;
    growlMessage: Message[] = [];
    orgGroupData: MT_ATPAR_ORG_GROUPS[];
    blnShowOrgGroupLabel: boolean = false;
    selectedOrgGroupId: string = "";
    selectedDropDownUserId: string[] = [];
    UserId: string[] = [];
    orgGrpId: string = "";
    lstOrgGroups: SelectItem[] = [];
    showGrid: boolean = false;
    lstUsers: SelectItem[] = [];
    lstRepType: SelectItem[] = [];
    lstStartEvent: SelectItem[] = [];
    lstEndEvent: SelectItem[] = [];
    lstFromTime: SelectItem[] = [];
    lstToTime: SelectItem[] = [];
    lstInterval: SelectItem[] = [];
    selectedReportType: string = "";
    selectedStartEvent: string = "";
    selectedEndEvent: string = "";
    startEvent: string = "";
    endEvent: string = "";
    selectedFromTime: string = "";
    selectedToTime: string = "";
    selectedInterval: number;
    blnStartEndEvents: boolean = false;
    blnFromToTimeInterval: boolean = false;
    startIndex: number;
    EndIndex: number;
    blnShowOrgGroupDD: boolean = false;
    orgGroupIDForDBUpdate: string;
    fromDate: Date;
    toDate: Date;
    frmDate: Date;
    date1: Date;
    date2: Date;
    minDateValue1: Date = new Date();
    minDateValue2: Date;
    defDateRange: number = 0;
    statusCode: number = -1;
    lstItemIds: any = [];
    selectedItemId: string = "";
    lstItemIdsData: any = [];
    lstDBData: any = [];
    lstDBTableData: any = [];
    data: any = [];
    dataAvg: any = [];
    dataForRecv1: any = [];
    dataForRecv2: any = [];
    dataForRecv3: any = [];
    dataForRecv4: any = [];
    dataForRecv5: any = [];
    dataForSummaryRecv: any = [];
    dataForDelv1: any = [];
    dataForDelv2: any = [];
    dataForDelv3: any = [];
    dataForDelv4: any = [];
    dataForDelv5: any = [];
    dataForSummaryDeliver: any = [];
    dataForDock1: any = [];
    dataForDock2: any = [];
    dataForDock3: any = [];
    dataForDock4: any = [];
    dataForDock5: any = [];
    dataForSummaryDock: any = [];
    dataSetlabel: string[] = [];
    dataSetbgcolor: string[] = [];
    dataSetbordercolor: string[] = [];
    dataSetdata: number[] = [];
    barColors: string[] = [];
    label: string[] = [];
    labelForAvg: string[] = [];
    chartDataSet: CHART_DATASET[] = [];
    chartDataSetD1: CHART_DATASET[] = [];
    chartDataSetD2: CHART_DATASET[] = [];
    chartDataSetD3: CHART_DATASET[] = [];
    chartDataSetD4: CHART_DATASET[] = [];
    chartDataSetD5: CHART_DATASET[] = [];
    isMailDialog: boolean = false;
    toMailAddr: string = '';
    ipAddress: string;
    gstrProtocal: string;
    gstrServerName: string;
    gstrPortNo: string;
    tdExports: boolean = false;
    bunitFlag: boolean = false;
    item: string;
    bUnit: string;
    cartId: string;
    updateDateTime: any;
    orgGroupId: string;
    activeTab: string;
    ReceivedDataSet: Array<any> = [];
    DeliveredDataSet: Array<any> = [];
    IntHrsParts: number = 0;
    IntNoofHrs: number = 0;
    IntRecPkgCnt: number = 0;
    IntDelPkgCnt: number = 0;
    pacakageSum: number = 0;
    pZeroTimeHrs: number = 0;
    lstChartData: VM_DELV_PROD[] = [];
    option: any;
    optionForAvg: any;
    optionForRecv1: any;
    optionForRecv2: any;
    optionForRecv3: any;
    optionForRecv4: any;
    optionForRecv5: any;
    optionForSummaryRecv: any;
    optionForSummaryDeliver: any;
    optionForSummaryDock: any;
    optionForDeliver1: any;
    optionForDeliver2: any;
    optionForDeliver3: any;
    optionForDeliver4: any;
    optionForDeliver5: any;
    optionForDock1: any;
    optionForDock2: any;
    optionForDock3: any;
    optionForDock4: any;
    optionForDock5: any;
    lstAvgChartData: VM_TABLE_AVG[] = [];
    chartDataSetForRecvLine: CHART_DATASET[] = [];
    chartDataSetForRecvGraph1: CHART_DATASET[] = [];
    chartDataSetForRecvGraph2: CHART_DATASET[] = [];
    chartDataSetForRecvGraph3: CHART_DATASET[] = [];
    chartDataSetForRecvGraph4: CHART_DATASET[] = [];
    chartDataSetForRecvGraph5: CHART_DATASET[] = [];
    chartDataSetForDeliverGraph1: CHART_DATASET[] = [];
    chartDataSetForDeliverGraph2: CHART_DATASET[] = [];
    chartDataSetForDeliverGraph3: CHART_DATASET[] = [];
    chartDataSetForDeliverGraph4: CHART_DATASET[] = [];
    chartDataSetForDeliverGraph5: CHART_DATASET[] = [];
    chartDataSetForDockGraph1: CHART_DATASET[] = [];
    chartDataSetForDockGraph2: CHART_DATASET[] = [];
    chartDataSetForDockGraph3: CHART_DATASET[] = [];
    chartDataSetForDockGraph4: CHART_DATASET[] = [];
    chartDataSetForDockGraph5: CHART_DATASET[] = [];
    lableForReceive: any[] = [];
    lstDataForRecv = [];
    chartDataSetForDelverLine: CHART_DATASET[] = [];
    lableForDeliver: any[] = [];
    lstDataForDeliver = [];
    lstDataForDock = [];
    chartDataSetForDock: CHART_DATASET[] = [];
    labelForDock = [];
    lstDataForSummaryRecv = [];
    chartDataSetForSummaryRecv: CHART_DATASET[] = [];
    labelForSummaryRecv = [];
    lstDataForSummaryDeliver = [];
    chartDataSetForSummaryDeliver: CHART_DATASET[] = [];
    labelForSummaryDeliver = [];
    chartDataSetForSummaryDock: CHART_DATASET[] = [];
    labelForSummaryDock = [];
    DateDisplay: string = "";
    lstDataForSummaryDock = [];
    lstTransactiondata: any[] = [];
    lstEventDetailsData: any[] = [];
    lstTransactionFilterdata: any[] = [];
    lstFinalCycleData: VM_CYCLETIME_DETAILS[] = [];
    lstCycleHourDetails = [];
    showGridCycleTime: boolean = false;
    Count: string = "";
    AVG: string = "";
    StDev: string = "";
    Max: string = "";
    Min: string = "";
    Results: VM_RESULTS[] = [];
    lstTable1Data: any[] = [];
    lstTable2Data: any[] = [];
    randomColors: string[] = [];
    dateString: string[] = [];
    tabSelection: any;
    blnGraph1: boolean = false;
    blnGraph2: boolean = false;
    blnGraph3: boolean = false;
    blnGraph4: boolean = false;
    blnGraph5: boolean = false;

    constructor(private httpService: HttpService, private _http: Http,
        private spinnerService: SpinnerService,
        private commonService: AtParCommonService,
        private atParConstant: AtParConstants,
        private DeliverProductivityService: DeliverProductivityService,
        private route: ActivatedRoute
    ) {

    }
    async ngOnInit() {
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.recordsPerPageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        this.startIndex = + sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
        this.bindOrgGroups();
        this.lstRepType = [];
        this.lstRepType.push({ label: "Select One", value: "" }, { label: "Productivity", value: "1" }, { label: "Cycle Time", value: "2" });
        this.lstStartEvent = [];
        this.lstStartEvent.push({ label: "Select One", value: "" }, { label: "Parcel Count", value: "-1" }, { label: "Received", value: "-2" }, { label: "Download", value: "1" }, { label: "Picked", value: "20" }, { label: "Load", value: "30" }, { label: "UnLoad", value: "40" }, { label: "Delivered", value: "50" })
        this.lstEndEvent = [];
        this.lstEndEvent.push({ label: "Select One", value: "" }, { label: "Parcel Count", value: "-1" }, { label: "Received", value: "-2" }, { label: "Download", value: "1" }, { label: "Picked", value: "20" }, { label: "Load", value: "30" }, { label: "UnLoad", value: "40" }, { label: "Delivered", value: "50" })

        this.lstFromTime = [];
        this.lstFromTime.push({ label: "Select One", value: "" }, { label: "00:00", value: "00:00" }, { label: "00:30", value: "00:30" }, { label: "01:00", value: "01:00" }, { label: "01:30", value: "01:30" }, { label: "02:00", value: "02:00" }, { label: "02:30", value: "02:30" }, { label: "03:00", value: "03:00" }, { label: "03:30", value: "03:30" }, { label: "04:00", value: "04:00" }, { label: "04:30", value: "04:30" }, { label: "05:00", value: "05:00" }, { label: "05:30", value: "05:30" }, { label: "06:00", value: "06:00" }, { label: "06:30", value: "06:30" }, { label: "07:00", value: "07:00" }, { label: "07:30", value: "07:30" }, { label: "08:00", value: "08:00" }, { label: "08:30", value: "08:30" }, { label: "09:00", value: "09:00" }, { label: "09:30", value: "09:30" }, { label: "10:00", value: "10:00" }, { label: "10:30", value: "10:30" }, { label: "11:00", value: "11:00" }, { label: "11:30", value: "11:30" }, { label: "12:00", value: "12:00" }, { label: "12:30", value: "12:30" }, { label: "13:00", value: "13:00" }, { label: "13:30", value: "13:30" }, { label: "14:00", value: "14:00" }, { label: "14:30", value: "14:30" }, { label: "15:00", value: "15:00" }, { label: "15:30", value: "15:30" }, { label: "16:00", value: "16:00" }, { label: "16:30", value: "16:30" }, { label: "17:00", value: "17:00" }, { label: "17:30", value: "17:30" }, { label: "18:00", value: "18:00" }, { label: "18:30", value: "18:30" }, { label: "19:00", value: "19:00" }, { label: "19:30", value: "19:30" }, { label: "20:00", value: "20:00" }, { label: "20:30", value: "20:30" }, { label: "21:00", value: "21:00" }, { label: "21:30", value: "21:30" }, { label: "22:00", value: "22:00" }, { label: "22:30", value: "22:30" }, { label: "23:00", value: "23:00" }, { label: "23:30", value: "23:30" })
        this.lstToTime = [];
        this.lstToTime.push({ label: "Select One", value: "" }, { label: "00:00", value: "00:00" }, { label: "00:30", value: "00:30" }, { label: "01:00", value: "01:00" }, { label: "01:30", value: "01:30" }, { label: "02:00", value: "02:00" }, { label: "02:30", value: "02:30" }, { label: "03:00", value: "03:00" }, { label: "03:30", value: "03:30" }, { label: "04:00", value: "04:00" }, { label: "04:30", value: "04:30" }, { label: "05:00", value: "05:00" }, { label: "05:30", value: "05:30" }, { label: "06:00", value: "06:00" }, { label: "06:30", value: "06:30" }, { label: "07:00", value: "07:00" }, { label: "07:30", value: "07:30" }, { label: "08:00", value: "08:00" }, { label: "08:30", value: "08:30" }, { label: "09:00", value: "09:00" }, { label: "09:30", value: "09:30" }, { label: "10:00", value: "10:00" }, { label: "10:30", value: "10:30" }, { label: "11:00", value: "11:00" }, { label: "11:30", value: "11:30" }, { label: "12:00", value: "12:00" }, { label: "12:30", value: "12:30" }, { label: "13:00", value: "13:00" }, { label: "13:30", value: "13:30" }, { label: "14:00", value: "14:00" }, { label: "14:30", value: "14:30" }, { label: "15:00", value: "15:00" }, { label: "15:30", value: "15:30" }, { label: "16:00", value: "16:00" }, { label: "16:30", value: "16:30" }, { label: "17:00", value: "17:00" }, { label: "17:30", value: "17:30" }, { label: "18:00", value: "18:00" }, { label: "18:30", value: "18:30" }, { label: "19:00", value: "19:00" }, { label: "19:30", value: "19:30" }, { label: "20:00", value: "20:00" }, { label: "20:30", value: "20:30" }, { label: "21:00", value: "21:00" }, { label: "21:30", value: "21:30" }, { label: "22:00", value: "22:00" }, { label: "22:30", value: "22:30" }, { label: "23:00", value: "23:00" }, { label: "23:30", value: "23:30" })

        this.lstInterval = [];
        this.lstInterval.push({ label: "Select One", value: "0" }, { label: "15", value: "15" }, { label: "30", value: "30" }, { label: "45", value: "45" }, { label: "60", value: "60" })

        this.defDateRange = 4;
        this.fromDate = new Date();
        this.fromDate = await this.addDays(this.fromDate, this.defDateRange);
        this.toDate = new Date();


        this.route.queryParams.subscribe(params => {
            this.item = params["p2value"];
            this.orgGroupId = params["p3value"];
            this.updateDateTime = params["p4value"];
            this.cartId = params["p5value"];
            this.bUnit = params["p6value"];
        });


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
                                this.orgGrpId = this.orgGroupData[0].ORG_GROUP_ID + " - " + this.orgGroupData[0].ORG_GROUP_NAME;
                                this.bindUsersList();
                                this.spinnerService.stop();
                                break;
                            }
                            else if (this.orgGroupData.length > 1) {
                                this.blnShowOrgGroupDD = true;
                                this.lstUsers = [];
                                this.lstUsers.push({ label: "ALL", value: "ALL" })
                                this.lstOrgGroups.push({ label: "Select One", value: "" })
                                for (var i = 0; i < this.orgGroupData.length; i++) {
                                    if (this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                        this.lstOrgGroups.push({ label: this.orgGroupData[i].ORG_GROUP_ID + " - " + this.orgGroupData[i].ORG_GROUP_NAME, value: this.orgGroupData[i].ORG_GROUP_ID })
                                    }
                                }
                                this.selectedDropDownUserId = [];
                                this.selectedDropDownUserId.push("ALL");
                                this.spinnerService.stop();
                                break;
                            }


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
            this.clientErrorMsg(ex, "bindOrgGroups");
        }
    }

    async bindUsersList() {
        this.spinnerService.start();
        try {
            if (this.blnShowOrgGroupLabel == true) {
                this.orgGroupIDForDBUpdate = this.orgGrpId.split("-")[0];
            }
            else {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            }
            this.lstUsers = [];
            this.lstUsers.push({ label: "ALL", value: "ALL" });

            await this.commonService.getHeirarchyUsersList(EnumApps.Deliver, this.deviceTokenEntry[TokenEntry_Enum.UserID], this.orgGroupIDForDBUpdate).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_USER>;
                    switch (data.StatType) {
                        case StatusType.Success: {
                            for (let i = 0; i <= data.DataDictionary["pDSUserList"]["Table1"].length - 1; i++) {
                                this.lstUsers.push({
                                    label: data.DataDictionary["pDSUserList"]["Table1"][i].FULLNAME,
                                    value: data.DataDictionary["pDSUserList"]["Table1"][i].USER_ID
                                })
                            }
                            this.selectedDropDownUserId = [];
                            this.selectedDropDownUserId.push("ALL");
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                    }

                });

        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindUsersList");
        }
    }

    async ddlOrgGrpIdChanged() {
        this.growlMessage = [];
        this.showGrid = false;
        if (this.selectedOrgGroupId === "") {
            this.lstUsers = [];
            this.orgGroupIDForDBUpdate = "";
            this.lstUsers.push({ label: "ALL", value: "ALL" })
            return;
        }

        try {

            this.bindUsersList();

        }
        catch (ex) {
            this.clientErrorMsg(ex, "ddlOrgGrpIdChanged");
        }
    }

    async ddlRepTypeChanged() {
        if (this.selectedReportType === "1") {
            this.blnStartEndEvents = true;
            this.blnFromToTimeInterval = false;
            this.selectedStartEvent = "";
            this.selectedEndEvent = "";
        }
        else if (this.selectedReportType === "2") {
            this.blnStartEndEvents = false;
            this.blnFromToTimeInterval = true;
            this.selectedFromTime = "";
            this.selectedToTime = "";
            this.selectedInterval = null;
        }
        else {
            this.blnStartEndEvents = false;
            this.blnFromToTimeInterval = false;
            this.selectedFromTime = "";
            this.selectedToTime = "";
            this.selectedStartEvent = "";
            this.selectedEndEvent = "";
            this.selectedInterval = null;
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

    async onGoClick() {
        let isValidate: boolean;
        try {
            this.showGrid = false;
            //this.lstCaseInfo = [];
            isValidate = await this.validateSearchFields();
            this.spinnerService.start();
            if (isValidate) {
                //await this.BindGrid();
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "onGoClick");
        }
        finally {
            this.spinnerService.stop();
        }
    }

    validateSearchFields() {
        try {

            if (this.fromDate == null || this.fromDate.toString() == '' || this.toDate == null || this.toDate.toString() == '') {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please select a valid date range' });
                return false;
            }
            else if (Date.parse(this.fromDate.toString()) && Date.parse(this.toDate.toString())) {
                if (Date.parse(this.convert(this.fromDate)) > Date.parse(this.convert(this.toDate))) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "To Date should be greater than From Date" });
                    return false;
                }
            }
            else {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Dates' });
                return false;
            }
            return true;

        } catch (ex) {
            this.clientErrorMsg(ex, "validateSearchFields");
            return false;
        }
    }

    convert(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [mnth, day , date.getFullYear()].join("/");
    }

    async bindGrid() {

        this.showGridCycleTime = false;
        this.tdExports = false;
        if (this.orgGroupIDForDBUpdate === "" || this.orgGroupIDForDBUpdate == undefined) {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select OrgGrp ID" });
            return;
        }
        if (this.selectedReportType === "" || this.selectedReportType == undefined) {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Report type" });
            return;
        }
        if (this.selectedDropDownUserId == undefined || this.selectedDropDownUserId.length == 0) {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select User ID" });
            return;
        }

        if (this.selectedDropDownUserId.length != 1) {
            if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "ALL User selection is not considerd when Multiple users Selected" });
                return;
            }
        }

        if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
            this.UserId = [];
            for (let k = 0; k <= this.lstUsers.length - 1; k++) {
                if (this.lstUsers[k].value !== "ALL") {
                    this.UserId.push(this.lstUsers[k].value);
                }

            }

        }
        if (this.blnShowOrgGroupDD == true) {
            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId.split("-")[0].trim();
        }
        else {
            this.orgGroupIDForDBUpdate = this.orgGrpId.split("-")[0].trim();
        }
        if (this.selectedStartEvent === "-1" || this.selectedStartEvent === "-2") {
            this.startEvent = "0";
        }
        else {
            this.startEvent = this.selectedStartEvent;
        }
        if (this.selectedEndEvent === "-1" || this.selectedEndEvent === "-2") {
            this.endEvent = "30";
        }
        else {
            this.endEvent = this.selectedEndEvent;
        }

        if (this.selectedReportType === "1") {

            if (this.selectedFromTime === "" || this.selectedFromTime == undefined) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select From Time" });
                return;
            }
            if (this.selectedToTime === "" || this.selectedToTime == undefined) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select To Time" });
                return;
            }

            let startTime = this.selectedFromTime.split(":");
            let endTime = this.selectedToTime.split(":");

            var startDate = new Date(0, 0, 0, parseInt(startTime[0]), parseInt(startTime[1]), 0);
            var endDate = new Date(0, 0, 0, parseInt(endTime[0]), parseInt(endTime[1]), 0);

            var difference = startDate.getTime() - endDate.getTime();
            if (difference >= 0) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select To Time greater than from Time" });
                return;
            }

            if (this.selectedInterval == null || this.selectedInterval == undefined) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Interval" });
                return;
            }

            let today = new Date();

            if (this.fromDate > today) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select From Date less than or equal to current date" });
                return;
            }

            if (this.toDate > today) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select To Date less than or equal to current date" });
                return;
            }

            if (this.fromDate > this.toDate) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Valid Date Range ( mm/dd/yyyy)" });
                return;
            }
            let count: number = Math.round((Date.parse(this.toDate.toString()) - Date.parse(this.fromDate.toString())) / (1000 * 3600 * 24));
            if (count > 4) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Duration in days should not exceed 5 days" });
                return;
            }


            this.randomColors = [];
            if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                for (let color = 0; color <= this.UserId.length - 1; color++) {
                    let randmColor = this.getRandomColor();
                    this.randomColors.push(randmColor);
                }
            }
            else {
                for (let color = 0; color <= this.selectedDropDownUserId.length - 1; color++) {
                    let randmColor = this.getRandomColor();
                    this.randomColors.push(randmColor);
                }
            }

            this.BindDayCharts();

        }
        else {

            if (this.selectedStartEvent === "" || this.selectedStartEvent == undefined) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Start Event" });
                return;
            }
            if (this.selectedEndEvent === "" || this.selectedEndEvent == undefined) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select End Event" });
                return;
            }
            let today = new Date();

            if (this.fromDate > today) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select From Date less than or equal to current date" });
                return;
            }

            if (this.toDate > today) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select To Date less than or equal to current date" });
                return;
            }
            if (this.fromDate > this.toDate) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Valid Date Range ( mm/dd/yyyy)" });
                return;
            }
            let count = Math.round((Date.parse(this.toDate.toString()) - Date.parse(this.fromDate.toString())) / (1000 * 3600 * 24));
            if (count > 4) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Duration in days should not exceed 5 days" });
                return;
            }
            let blnstartendevent: boolean = false;
            if (this.selectedStartEvent === "-1" && this.selectedEndEvent === "-2") {
                blnstartendevent = true;
            }
            if (this.selectedStartEvent === "-2" && this.selectedEndEvent === "-1") {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select End Event greater than Start Event" });
                return;
            }
            if (blnstartendevent == false) {
                if (parseInt(this.selectedStartEvent) >= parseInt(this.selectedEndEvent)) {
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select End Event greater than Start Event" });
                    return;
                }
            }


            this.showGrid = false;
            this.BindCycleTimeReport();
        }



    }

    async BindDayCharts() {
        this.spinnerService.start();
        this.growlMessage = [];
        let frmDate = this.convert(this.fromDate);
        let dt = this.convert(this.fromDate);
        this.frmDate = new Date(dt);
        let todate = this.convert(this.toDate);
        this.IntRecPkgCnt = 0;
        this.IntDelPkgCnt = 0;
        let userString: string = "";
        for (let a = 0; a <= this.selectedDropDownUserId.length - 1; a++) {
            userString = userString + this.selectedDropDownUserId[a] + ",";
        }
        userString = userString.replace(/,\s*$/, "");
        if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
            if (this.lstUsers.length == 1) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                this.spinnerService.stop();
                return;
            }
        }
        this.DeliverProductivityService.GetProductivityReport(this.orgGroupIDForDBUpdate, frmDate, todate, userString, this.selectedInterval, this.selectedFromTime, this.selectedToTime).catch(this.httpService.handleError).then((res: Response) => {
            let data = res.json() as AtParWebApiResponse<any>;

            switch (data.StatType) {
                case StatusType.Success: {
                    this.showGrid = true;
                    this.lstChartData = [];
                    this.lstAvgChartData = [];
                    if (data.DataDictionary["pDsProductivityRep"]["Table1"].length > 0) {
                        this.lstTable1Data = data.DataDictionary["pDsProductivityRep"]["Table1"];
                        this.PopulateGraphsForReceive(0, data, 0, "Receiving");
                    }
                    if (data.DataDictionary["pDsProductivityRep"]["Table2"].length > 0) {
                        this.lstTable2Data = data.DataDictionary["pDsProductivityRep"]["Table2"];
                        this.PopulateGraphsForDeliver(0, data, 0, "Deliver");
                    }
                    if (data.DataDictionary["pDsProductivityRep"]["Table1"].length > 0 || data.DataDictionary["pDsProductivityRep"]["Table2"].length > 0) {
                        this.BindSummaryChartsRecv(data);
                        this.BindSummaryChartsDeliver(data);
                        this.PopulateEmpProdColumnChart(data);
                        this.PopulateDockGraph(data, 0);
                    }
                    this.tdExports = true;
                    this.spinnerService.stop();
                    break;
                }
                case StatusType.Warn: {
                    this.showGrid = false;
                    this.tdExports = true;
                    this.showGridCycleTime = false;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                    this.spinnerService.stop();
                    break;
                }
                case StatusType.Error: {
                    this.showGrid = false;
                    this.tdExports = true;
                    this.showGridCycleTime = false;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                    this.spinnerService.stop();
                    break;
                }
                case StatusType.Custom: {
                    this.showGrid = false;
                    this.tdExports = true;
                    this.showGridCycleTime = false;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                    this.spinnerService.stop();
                    break;
                }
            }

        })
    }

    PopulateEmpProdColumnChart(data) {
        let _IntPkgCount: number = 0;
        let _dblZeroWHours: number = 0;
        var lstItem: VM_DELV_PROD;
        let frmDate: Date = this.frmDate;
        let Curdate: Date = frmDate;
        if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
            for (let i = 0; i <= this.UserId.length - 1; i++) {
                let dtfromdate = this.fromDate
                let chartDate = new Date(dtfromdate);
                let dttodate = this.toDate
                let datediff: number = Math.round((Date.parse(this.toDate.toString()) - Date.parse(this.fromDate.toString())) / (1000 * 3600 * 24));
                //let datediff = new Date(this.toDate).getDate() - new Date(this.fromDate).getDate();
                let UserName: string = this.UserId[i];
                let AvgPack: number = 0
                let AvgTime: number = 0
                let daycount: number = 0
                if (UserName !== "ALL") {
                    let x = 0;
                    while (x <= datediff) {
                        daycount += 1;
                        let currentDate = this.convert(chartDate);
                        this.GetProductivityReportValues(data, UserName, currentDate);
                        lstItem = new VM_DELV_PROD();
                        lstItem.PACKAGE_COUNT = this.pacakageSum;
                        lstItem.UserId = UserName;
                        lstItem.TIME = Math.ceil(this.pZeroTimeHrs * 10) / 10;
                        lstItem.TRANS_DATE = Curdate.toString();
                        lstItem.Day = "D" + daycount.toString();
                        this.lstChartData.push(lstItem);
                        chartDate = new Date(chartDate.setDate(chartDate.getDate() + 1));
                        x = x + 1;
                    }

                }

            }
        }
        else {
            for (let i = 0; i <= this.selectedDropDownUserId.length - 1; i++) {
                let dtfromdate = this.frmDate
                let chartDate = new Date(dtfromdate);
                let dttodate = this.toDate
                let datediff: number = Math.round((Date.parse(this.toDate.toString()) - Date.parse(this.fromDate.toString())) / (1000 * 3600 * 24));
                //let datediff = new Date(this.toDate).getDate() - new Date(this.fromDate).getDate();
                let UserName: string = this.selectedDropDownUserId[i];
                let AvgPack: number = 0
                let AvgTime: number = 0
                let daycount: number = 0
                if (UserName !== "ALL") {
                    let z = 0;
                    while (z <= datediff) {
                        daycount += 1;
                        let currentDate = this.convert(chartDate);
                        this.GetProductivityReportValues(data, UserName, currentDate);
                        lstItem = new VM_DELV_PROD();
                        lstItem.PACKAGE_COUNT = this.pacakageSum;
                        lstItem.UserId = UserName;
                        lstItem.TIME = this.pZeroTimeHrs;
                        lstItem.TRANS_DATE = chartDate.toString();
                        lstItem.Day = "D" + daycount.toString();
                        this.lstChartData.push(lstItem);
                        chartDate = new Date(chartDate.setDate(chartDate.getDate() + 1));
                        z = z + 1;
                    }
                }

            }
        }
        console.log(this.lstChartData);
        this.barColors = ["#FFB552", "#FFB552"];
        this.dataSetbgcolor = [];
        this.dataSetdata = [];
        this.dataSetbordercolor = [];
        var dataPackageCount = [];
        var dataTimePackage = [];
        var dataForInsideTable = [];
        var dataPackageCountD1 = [];
        var dataTimePackageD1 = [];
        var dataPackageCountD2 = [];
        var dataTimePackageD2 = [];
        var dataPackageCountD3 = [];
        var dataTimePackageD3 = [];
        var dataPackageCountD4 = [];
        var dataTimePackageD4 = [];
        var dataPackageCountD5 = [];
        var dataTimePackageD5 = [];
        this.label = [];
        for (let i = 0; i <= this.lstChartData.length - 1; i++) {

            this.label.push(this.lstChartData[i].UserId);
            dataPackageCount.push(this.lstChartData[i].PACKAGE_COUNT);
            dataTimePackage.push(this.lstChartData[i].TIME);
        }
        let distinctUsersArray: any[] = [];
        distinctUsersArray = asEnumerable(this.label).Distinct().ToArray();



        for (let cdata = 0; cdata <= distinctUsersArray.length - 1; cdata++) {
            let listOfseparateUsers: any[] = [];
            let dataPackageCount: any[] = [];
            listOfseparateUsers = asEnumerable(this.lstChartData).Where(x => x.UserId == distinctUsersArray[cdata]).ToArray();
            if (listOfseparateUsers.length > 0) {
                if (listOfseparateUsers[0] != undefined) {
                    dataPackageCountD1.push(listOfseparateUsers[0].PACKAGE_COUNT);
                    dataTimePackageD1.push(listOfseparateUsers[0].TIME);
                }
                if (listOfseparateUsers[1] != undefined) {
                    dataPackageCountD2.push(listOfseparateUsers[1].PACKAGE_COUNT);
                    dataTimePackageD2.push(listOfseparateUsers[1].TIME);
                }
                if (listOfseparateUsers[2] != undefined) {
                    dataPackageCountD3.push(listOfseparateUsers[2].PACKAGE_COUNT);
                    dataTimePackageD3.push(listOfseparateUsers[2].TIME);
                }
                if (listOfseparateUsers[3] != undefined) {
                    dataPackageCountD4.push(listOfseparateUsers[3].PACKAGE_COUNT);
                    dataTimePackageD4.push(listOfseparateUsers[3].TIME);
                }
                if (listOfseparateUsers[4] != undefined) {
                    dataPackageCountD5.push(listOfseparateUsers[4].PACKAGE_COUNT);
                    dataTimePackageD5.push(listOfseparateUsers[4].TIME);
                }

            }
        }


        this.chartDataSet = [];
        if (dataPackageCountD1.length > 0) {
            this.chartDataSet.push({ label: 'D1', backgroundColor: '#3391CE', borderColor: '', data: dataPackageCountD1, fill: true });
            this.chartDataSet.push({ label: 'D1', backgroundColor: '#48BF7D', borderColor: '', data: dataTimePackageD1, fill: true });
        }
        if (dataPackageCountD2.length > 0) {
            this.chartDataSet.push({ label: 'D2', backgroundColor: '#3391CE', borderColor: '', data: dataPackageCountD2, fill: true });
            this.chartDataSet.push({ label: 'D2', backgroundColor: '#48BF7D', borderColor: '', data: dataTimePackageD2, fill: true });
        }
        if (dataPackageCountD3.length > 0) {
            this.chartDataSet.push({ label: 'D3', backgroundColor: '#3391CE', borderColor: '', data: dataPackageCountD3, fill: true });
            this.chartDataSet.push({ label: 'D3', backgroundColor: '#48BF7D', borderColor: '', data: dataTimePackageD3, fill: true });
        }
        if (dataPackageCountD4.length > 0) {
            this.chartDataSet.push({ label: 'D4', backgroundColor: '#3391CE', borderColor: '', data: dataPackageCountD4, fill: true });
            this.chartDataSet.push({ label: 'D4', backgroundColor: '#48BF7D', borderColor: '', data: dataTimePackageD4, fill: true });
        }
        if (dataPackageCountD5.length > 0) {
            this.chartDataSet.push({ label: 'D5', backgroundColor: '#3391CE', borderColor: '', data: dataPackageCountD5, fill: true });
            this.chartDataSet.push({ label: 'D5', backgroundColor: '#48BF7D', borderColor: '', data: dataTimePackageD5, fill: true });
        }
        let tooltipData: any[] = [];
        tooltipData = this.lstChartData;
        this.option = {
            scales: {
                yAxes: [{
                    stacked: false,
                    gridLines: {
                        display: true,
                        color: "rgba(255,99,132,0.2)"
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Packages'

                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: false,
                        color: "rgba(255,99,132,0.2)"
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'User'

                    }
                }]
            },
            title: {
                display: true,
                text: "Employee Productivity By Day"
            },
            legend: {
                display: false,
            },
            
            //tooltips: {
            //    enabled: true,
            //    mode: 'single',
            //    callbacks: {
            //        label: function (tooltipItems, data) {

            //            return tooltipItems.yLabel;
            //        }
            //    }
            //},
            animation: {
                onComplete: function () {
                    var chartInstance = this.chart,
                        ctx = chartInstance.ctx;
                    ctx.textAlign = 'center';
                    ctx.fillStyle = "#34251B";
                    ctx.textBaseline = 'bottom';
                    this.data.datasets.forEach(function (dataset, i) {
                        var meta = chartInstance.controller.getDatasetMeta(i);
                        meta.data.forEach(function (bar, index) {
                            var data = dataset.data[index];
                            if (data == 0) {
                                var value = bar._model.y;
                            }
                            else if (data > 0 && data < 1) {
                                var value = bar._model.y;
                            }
                            else {
                                var value = bar._model.y + 30;
                            }
                            ctx.fillText(data, bar._model.x, value);
                        });
                    });
                }
            }
        };



        this.data = [];
        this.data = {
            labels: distinctUsersArray,
            datasets: this.chartDataSet,
            options: this.option
        }
        this.PopulateEmpProdAverageChart(this.lstChartData);
    }

    async GetProductivityReportValues(data, UserName, Curdate) {
        let DelRecvLength: number = 0;
        let length: number = 0;
        this.IntRecPkgCnt = 0;
        this.IntDelPkgCnt = 0;
        length = data.DataDictionary["pDsProductivityRep"]["Table1"].length;
        this.IntHrsParts = (60 / this.selectedInterval);
        this.IntNoofHrs = (parseFloat(length.toString()) / this.IntHrsParts);
        this.ReceivedDataSet = data.DataDictionary["pDsProductivityRep"]["Table1"]
        this.ReceivedDataSet = asEnumerable(this.ReceivedDataSet).Where(x => x.PACKAGE_COUNT != 0 && x.UserId == UserName && x.TRANS_DATE == Curdate).ToArray();
        if (this.ReceivedDataSet.length > 0) {
            for (let j = 0; j <= this.ReceivedDataSet.length - 1; j++) {
                this.IntRecPkgCnt += this.ReceivedDataSet[j].PACKAGE_COUNT;
            }
        }
        this.DeliveredDataSet = data.DataDictionary["pDsProductivityRep"]["Table2"]
        this.DeliveredDataSet = asEnumerable(this.DeliveredDataSet).Where(x => x.PACKAGE_COUNT != 0 && x.UserId == UserName && x.TRANS_DATE == Curdate).ToArray();
        if (this.DeliveredDataSet.length > 0) {
            for (let j = 0; j <= this.DeliveredDataSet.length - 1; j++) {
                this.IntDelPkgCnt += this.DeliveredDataSet[j].PACKAGE_COUNT;
            }
        }

        let recvData: any[] = [];
        let delvData: any[] = [];
        let totalData: any[] = [];
        for (let recv = 0; recv <= this.ReceivedDataSet.length - 1; recv++) {
            recvData.push(this.ReceivedDataSet[recv].START_INTERVAL);
        }

        for (let delv = 0; delv <= this.ReceivedDataSet.length - 1; delv++) {
            delvData.push(this.ReceivedDataSet[delv].START_INTERVAL);
        }

        this.pacakageSum = this.IntRecPkgCnt + this.IntDelPkgCnt;
        totalData = recvData.concat(delvData);
        totalData = asEnumerable(totalData).Distinct().ToArray();
        if (totalData.length > 0) {
            if (this.selectedInterval > 0) {
                this.pZeroTimeHrs = Math.round(this.IntNoofHrs - (parseFloat(totalData.length.toString()) / this.IntHrsParts)) - 1
            }

        }
        else {
            this.pZeroTimeHrs = (Math.trunc(((this.IntNoofHrs - 1) * 100)) / 100);
        }

    }

    async PopulateEmpProdAverageChart(Delvdata: VM_DELV_PROD[]) {
        var lstItem: VM_TABLE_AVG;
        let Delvdata1: VM_DELV_PROD[] = [];

        if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
            for (let i = 0; i <= this.UserId.length - 1; i++) {

                let UserName: string = this.UserId[i];
                let AvgPack: number = 0
                let AvgTime: number = 0
                let daycount: number = 0
                if (UserName !== "ALL") {
                    lstItem = new VM_TABLE_AVG();
                    Delvdata1 = asEnumerable(Delvdata).Where(x => x.UserId == UserName).ToArray();
                    for (let i = 0; i <= Delvdata1.length - 1; i++) {
                        AvgPack += Delvdata1[i].PACKAGE_COUNT;
                        AvgTime += Delvdata1[i].TIME;
                    }
                    AvgPack = AvgPack / Delvdata1.length;
                    AvgTime = AvgTime / Delvdata1.length;
                    lstItem.PACKAGE_COUNT = AvgPack
                    lstItem.AVG_TIME = Math.trunc(AvgTime * 100) / 100;
                    lstItem.UserId = UserName;
                    this.lstAvgChartData.push(lstItem);

                }
            }
        }
        else {
            for (let i = 0; i <= this.selectedDropDownUserId.length - 1; i++) {

                let UserName: string = this.selectedDropDownUserId[i];
                let AvgPack: number = 0
                let AvgTime: number = 0
                let daycount: number = 0
                if (UserName !== "ALL") {
                    lstItem = new VM_TABLE_AVG();
                    Delvdata1 = asEnumerable(Delvdata).Where(x => x.UserId == UserName).ToArray();
                    for (let i = 0; i <= Delvdata1.length - 1; i++) {
                        AvgPack += Delvdata1[i].PACKAGE_COUNT;
                        AvgTime += Delvdata1[i].TIME;
                    }
                    AvgPack = AvgPack / Delvdata1.length;
                    AvgTime = AvgTime / Delvdata1.length;
                    lstItem.PACKAGE_COUNT = AvgPack;
                    lstItem.AVG_TIME = Math.ceil(AvgTime * 10) / 10;
                    lstItem.UserId = UserName;
                    this.lstAvgChartData.push(lstItem);

                }
            }
        }

        this.barColors = ["#FFB552", "#FFB552"];
        this.dataSetbgcolor = [];
        this.dataSetdata = [];
        this.dataSetbordercolor = [];
        var dataPackageCount = [];
        var dataAvgTimePackage = [];

        this.labelForAvg = [];

        for (let i = 0; i <= this.lstAvgChartData.length - 1; i++) {


            this.labelForAvg.push(this.lstAvgChartData[i].UserId);
            dataPackageCount.push(this.lstAvgChartData[i].PACKAGE_COUNT);
            dataAvgTimePackage.push(this.lstAvgChartData[i].AVG_TIME);

        }
        this.chartDataSet = [];
        this.chartDataSet.push({ label: 'Average Packages', backgroundColor: '#3391CE', borderColor: '', data: dataPackageCount, fill: true });
        this.chartDataSet.push({ label: 'Average Time', backgroundColor: '#48BF7D', borderColor: '', data: dataAvgTimePackage, fill: true });

        this.optionForAvg = {
            scales: {
                yAxes: [{
                    stacked: false,
                    gridLines: {
                        display: true,
                        color: "rgba(255,99,132,0.2)"
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Packages'

                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: false,
                        color: "rgba(255,99,132,0.2)"
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'User'

                    }
                }]
            },
            title: {
                display: true,
                text: "Average Employee Productivity"
            },
            animation: {
                onComplete: function () {
                    var chartInstance = this.chart,
                        ctx = chartInstance.ctx;
                    ctx.textAlign = 'center';
                    ctx.fillStyle = "#34251B";
                    ctx.textBaseline = 'bottom';
                    this.data.datasets.forEach(function (dataset, i) {
                        var meta = chartInstance.controller.getDatasetMeta(i);
                        meta.data.forEach(function (bar, index) {
                            var data = dataset.data[index];
                            if (data == 0) {
                                var value = bar._model.y;
                            }
                            else if (data > 0 && data < 1) {
                                var value = bar._model.y;
                            }
                            else {
                                var value = bar._model.y + 30;
                            }
                            ctx.fillText(data, bar._model.x, value);
                        });
                    });
                }
            }
        };


        this.dataAvg = [];
        this.dataAvg = {
            labels: this.labelForAvg,
            datasets: this.chartDataSet,
            options: this.optionForAvg
        }





    }

    async PopulateGraphsForReceive(TblIndex, data, pDay, ReportName) {
        try {
            let dtfromdate = this.frmDate
            let chartDate = new Date(dtfromdate);
            let intPcnt: number = 0
            this.lstDataForRecv = [];
            let dayWiseData = [];
            let DisplayName: string = "";
            this.dateString = [];
            let count: number = Math.round((Date.parse(this.toDate.toString()) - Date.parse(this.fromDate.toString())) / (1000 * 3600 * 24));
            for (let x = 0; x <= count;) {
                this.dateString.push(this.convertDateFormate(chartDate));
                if (this.lstDataForRecv[x] == null) {
                    this.lstDataForRecv[x] = [];
                    if (this.lstDataForRecv[x].PACKAGE_COUNT == null) {
                        this.lstDataForRecv[x].PACKAGE_COUNT = [];
                    }

                    this.lstDataForRecv[x].START_INTERVAL = [];
                    this.lstDataForRecv[x].ReceiveData = [];
                    this.lstDataForRecv[x].ReceiveLables = [];
                }
                if (this.lstDataForRecv[x].ReceiveData == null) {
                    this.lstDataForRecv[x].ReceiveData = [];
                }

                if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                    for (let i = 0; i <= this.UserId.length - 1; i++) {
                        let UserName: string = this.UserId[i];
                        if (UserName !== "ALL") {
                            this.lstDataForRecv[x].PACKAGE_COUNT[i] = [];
                            this.lstDataForRecv[x].START_INTERVAL[i] = [];
                            dayWiseData[x] = [];
                            let table1Data: any[] = [];
                            table1Data = data.DataDictionary["pDsProductivityRep"]["Table1"];
                            let recvDate = this.convertDateFormate(chartDate);
                            for (let j = 0; j <= this.lstTable1Data.length - 1; j++) {
                                let filteredList = asEnumerable(table1Data).Where(x => x.PACKAGE_COUNT != 0 && x.UserId == UserName && x.TRANS_DATE == recvDate && x.START_INTERVAL == this.lstTable1Data[j].START_INTERVAL).ToArray();
                                if (filteredList.length > 0) {
                                    dayWiseData[x].push({ START_INTERVAL: filteredList[0].START_INTERVAL, PACKAGE_COUNT: filteredList[0].PACKAGE_COUNT, USER_ID: UserName, TRANS_DATE: filteredList[0].TRANS_DATE })
                                }
                                else {
                                    dayWiseData[x].push({ START_INTERVAL: this.lstTable1Data[j].START_INTERVAL, PACKAGE_COUNT: 0, USER_ID: UserName, TRANS_DATE: recvDate })
                                }

                                this.lstDataForRecv[x].START_INTERVAL[i].push(dayWiseData[x][j].START_INTERVAL);
                                this.lstDataForRecv[x].PACKAGE_COUNT[i].push(dayWiseData[x][j].PACKAGE_COUNT);
                            }

                        }
                        this.lstDataForRecv[x].ReceiveData[i] = [];
                        this.lstDataForRecv[x].ReceiveLables.push(this.lstDataForRecv[x].START_INTERVAL[0]);
                        this.lstDataForRecv[x].ReceiveData[i].push(this.lstDataForRecv[x].PACKAGE_COUNT[i]);
                    }
                }
                else {
                    for (let i = 0; i <= this.selectedDropDownUserId.length - 1; i++) {
                        let UserName: string = this.selectedDropDownUserId[i];
                        if (UserName !== "ALL") {
                            this.lstDataForRecv[x].PACKAGE_COUNT[i] = [];
                            this.lstDataForRecv[x].START_INTERVAL[i] = [];
                            dayWiseData[x] = [];
                            let table1Data: any[] = [];
                            table1Data = data.DataDictionary["pDsProductivityRep"]["Table1"];
                            let recvDate = this.convertDateFormate(chartDate);

                            for (let j = 0; j <= this.lstTable1Data.length - 1; j++) {
                                let filteredList = asEnumerable(table1Data).Where(x => x.PACKAGE_COUNT != 0 && x.UserId == UserName && x.TRANS_DATE == recvDate && x.START_INTERVAL == this.lstTable1Data[j].START_INTERVAL).ToArray();
                                if (filteredList.length > 0) {
                                    dayWiseData[x].push({ START_INTERVAL: filteredList[0].START_INTERVAL, PACKAGE_COUNT: filteredList[0].PACKAGE_COUNT, USER_ID: UserName, TRANS_DATE: filteredList[0].TRANS_DATE })
                                }
                                else {
                                    dayWiseData[x].push({ START_INTERVAL: this.lstTable1Data[j].START_INTERVAL, PACKAGE_COUNT: 0, USER_ID: UserName, TRANS_DATE: recvDate })
                                }

                                this.lstDataForRecv[x].START_INTERVAL[i].push(dayWiseData[x][j].START_INTERVAL);
                                this.lstDataForRecv[x].PACKAGE_COUNT[i].push(dayWiseData[x][j].PACKAGE_COUNT);
                            }

                        }


                        this.lstDataForRecv[x].ReceiveData[i] = [];
                        this.lstDataForRecv[x].ReceiveLables.push(this.lstDataForRecv[x].START_INTERVAL[0]);
                        this.lstDataForRecv[x].ReceiveData[i].push(this.lstDataForRecv[x].PACKAGE_COUNT[i]);
                    }
                }

                x += 1;
                chartDate = new Date(chartDate.setDate(chartDate.getDate() + 1));

            }

            this.chartDataSetForRecvLine = [];
            this.lableForReceive = [];
            for (let cnt = 0; cnt <= this.lstDataForRecv.length - 1; cnt++) {
                let list: any[] = [];
                for (let cntData = 0; cntData <= this.lstDataForRecv[cnt].ReceiveData.length - 1; cntData++) {

                    list.push(this.lstDataForRecv[cnt].ReceiveData[cntData][0]);

                }

                this.chartDataSetForRecvLine.push({ label: '', backgroundColor: '', borderColor: '#00FF00', data: list, fill: false });
                this.lableForReceive.push(this.lstDataForRecv[cnt].ReceiveLables)
            }

            this.dataForRecv1 = [];
            this.dataForRecv2 = [];
            this.dataForRecv3 = [];
            this.dataForRecv4 = [];
            this.dataForRecv5 = [];

            this.optionForRecv1 = {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        stacked: true,
                        gridLines: {
                            display: true,
                            color: "rgba(255,99,132,0.2)"
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Packages'

                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display: false,
                            color: "rgba(255,99,132,0.2)"
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Time'

                        }
                    }]
                },
                title: {
                    display: true,
                    text: 'Dock Receiving By Employee - ' + this.dateString[0] + " Day"
                },
                //legend: {
                //    display: true,
                //    position: 'right',
                //}

            };
            this.optionForRecv2 = {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        stacked: true,
                        gridLines: {
                            display: true,
                            color: "rgba(255,99,132,0.2)"
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Packages'

                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display: false,
                            color: "rgba(255,99,132,0.2)"
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Time'

                        }
                    }]
                },
                title: {
                    display: true,
                    text: 'Dock Receiving By Employee - ' + this.dateString[1] + " Day"
                }
            };
            this.optionForRecv3 = {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        stacked: true,
                        gridLines: {
                            display: true,
                            color: "rgba(255,99,132,0.2)"
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Packages'

                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display: false,
                            color: "rgba(255,99,132,0.2)"
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Time'

                        }
                    }]
                },
                title: {
                    display: true,
                    text: 'Dock Receiving By Employee - ' + this.dateString[2] + " Day"
                }
            };
            this.optionForRecv4 = {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        stacked: true,
                        gridLines: {
                            display: true,
                            color: "rgba(255,99,132,0.2)"
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Packages'

                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display: false,
                            color: "rgba(255,99,132,0.2)"
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Time'

                        }
                    }]
                },
                title: {
                    display: true,
                    text: 'Dock Receiving By Employee - ' + this.dateString[3] + " Day"
                }
            };
            this.optionForRecv5 = {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        stacked: true,
                        gridLines: {
                            display: true,
                            color: "rgba(255,99,132,0.2)"
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Packages'

                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display: false,
                            color: "rgba(255,99,132,0.2)"
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Time'

                        }
                    }]
                },
                title: {
                    display: true,
                    text: 'Dock Receiving By Employee - ' + this.dateString[4] + " Day"
                }
            };
            this.chartDataSetForRecvGraph1 = [];
            if (this.chartDataSetForRecvLine[0] != undefined) {
                if (this.chartDataSetForRecvLine[0].data != undefined) {
                    this.blnGraph1 = true;
                    for (var i in this.chartDataSetForRecvLine[0].data) {
                        if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                            this.chartDataSetForRecvGraph1.push({ label: this.UserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForRecvLine[0].data[i], fill: false, borderColor: this.randomColors[i] })
                        }
                        else {
                            this.chartDataSetForRecvGraph1.push({ label: this.selectedDropDownUserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForRecvLine[0].data[i], fill: false, borderColor: this.randomColors[i] })
                        }
                    }
                }
            } else {
                this.blnGraph1 = false;
            }
            this.chartDataSetForRecvGraph2 = [];
            if (this.chartDataSetForRecvLine[1] != undefined) {
                if (this.chartDataSetForRecvLine[1].data != undefined) {
                    this.blnGraph2 = true;
                    for (var i in this.chartDataSetForRecvLine[1].data) {

                        if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                            this.chartDataSetForRecvGraph2.push({ label: this.UserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForRecvLine[1].data[i], fill: false, borderColor: this.randomColors[i] })
                        }
                        else {
                            this.chartDataSetForRecvGraph2.push({ label: this.selectedDropDownUserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForRecvLine[1].data[i], fill: false, borderColor: this.randomColors[i] })
                        }

                    }
                }
            }
            else {
                this.blnGraph2 = false;
            }
            this.chartDataSetForRecvGraph3 = [];
            if (this.chartDataSetForRecvLine[2] != undefined) {
                if (this.chartDataSetForRecvLine[2].data != undefined) {
                    this.blnGraph3 = true;
                    for (var i in this.chartDataSetForRecvLine[2].data) {
                        if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                            this.chartDataSetForRecvGraph3.push({ label: this.UserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForRecvLine[2].data[i], fill: false, borderColor: this.randomColors[i] })
                        }
                        else {
                            this.chartDataSetForRecvGraph3.push({ label: this.selectedDropDownUserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForRecvLine[2].data[i], fill: false, borderColor: this.randomColors[i] })
                        }

                    }
                }
            }
            else {
                this.blnGraph3 = false;
            }


            this.chartDataSetForRecvGraph4 = [];
            if (this.chartDataSetForRecvLine[3] != undefined) {
                if (this.chartDataSetForRecvLine[3].data != undefined) {
                    this.blnGraph4 = true;
                    for (var i in this.chartDataSetForRecvLine[3].data) {
                        if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                            this.chartDataSetForRecvGraph4.push({ label: this.UserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForRecvLine[3].data[i], fill: false, borderColor: this.randomColors[i] })
                        }
                        else {
                            this.chartDataSetForRecvGraph4.push({ label: this.selectedDropDownUserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForRecvLine[3].data[i], fill: false, borderColor: this.randomColors[i] })
                        }
                    }
                }
            }
            else {
                this.blnGraph4 = false;
            }


            this.chartDataSetForRecvGraph5 = [];
            if (this.chartDataSetForRecvLine[4] != undefined) {
                if (this.chartDataSetForRecvLine[4].data != undefined) {
                    this.blnGraph5 = true;
                    for (var i in this.chartDataSetForRecvLine[4].data) {
                        if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                            this.chartDataSetForRecvGraph5.push({ label: this.UserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForRecvLine[4].data[i], fill: false, borderColor: this.randomColors[i] })
                        }
                        else {
                            this.chartDataSetForRecvGraph5.push({ label: this.selectedDropDownUserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForRecvLine[4].data[i], fill: false, borderColor: this.randomColors[i] })
                        }

                    }
                }
            }
            else {
                this.blnGraph5 = false;
            }

            if (this.blnGraph1 == true) {
                this.dataForRecv1 = {
                    labels: this.lableForReceive[0][0],
                    datasets: this.chartDataSetForRecvGraph1,
                    options: this.optionForRecv1
                }
            }
            if (this.blnGraph2 == true) {
                this.dataForRecv2 = {
                    labels: this.lableForReceive[1][0],
                    datasets: this.chartDataSetForRecvGraph2,
                    options: this.optionForRecv2
                }
            }
            if (this.blnGraph3 == true) {
                this.dataForRecv3 = {
                    labels: this.lableForReceive[2][0],
                    datasets: this.chartDataSetForRecvGraph3,
                    options: this.optionForRecv3
                }
            }
            if (this.blnGraph4 == true) {
                this.dataForRecv4 = {
                    labels: this.lableForReceive[3][0],
                    datasets: this.chartDataSetForRecvGraph4,
                    options: this.optionForRecv4
                }
            }
            if (this.blnGraph5 == true) {
                this.dataForRecv5 = {
                    labels: this.lableForReceive[4][0],
                    datasets: this.chartDataSetForRecvGraph5,
                    options: this.optionForRecv5
                }
            }

            console.log(this.chartDataSetForRecvGraph4);


        }

        catch (ex) {
            this.clientErrorMsg(ex, "")
        }



    }

    async PopulateGraphsForDeliver(TblIndex, data, pDay, ReportName) {
        let frmDate: Date = this.fromDate;
        let CurdateForRecvDelv: Date = frmDate;
        let dtfromdate = this.frmDate
        let chartDate = new Date(dtfromdate);
        let intPcnt: number = 0
        this.lstDataForDeliver = [];
        let dayWiseData = [];
        let count: number = Math.round((Date.parse(this.toDate.toString()) - Date.parse(this.fromDate.toString())) / (1000 * 3600 * 24));
        //let count = this.toDate.getDate() - this.fromDate.getDate();
        for (let x = 0; x <= count;) {
            if (this.lstDataForDeliver[x] == null) {
                this.lstDataForDeliver[x] = [];
                if (this.lstDataForDeliver[x].PACKAGE_COUNT == null) {
                    this.lstDataForDeliver[x].PACKAGE_COUNT = [];
                }

                this.lstDataForDeliver[x].START_INTERVAL = [];
                this.lstDataForDeliver[x].ReceiveData = [];
                this.lstDataForDeliver[x].ReceiveLables = [];
            }
            if (this.lstDataForDeliver[x].ReceiveData == null) {
                this.lstDataForDeliver[x].ReceiveData = [];
            }

            if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                for (let i = 0; i <= this.UserId.length - 1; i++) {
                    let UserName: string = this.UserId[i];
                    if (UserName !== "ALL") {
                        this.lstDataForDeliver[x].PACKAGE_COUNT[i] = [];
                        this.lstDataForDeliver[x].START_INTERVAL[i] = [];
                        dayWiseData[x] = [];
                        let table2Data: any[] = [];
                        table2Data = data.DataDictionary["pDsProductivityRep"]["Table2"];
                        let recvDate = this.convertDateFormate(chartDate);
                        //let filteredList = asEnumerable(table2Data).Where(x => x.PACKAGE_COUNT != 0 && x.UserId == UserName && x.TRANS_DATE == recvDate).ToArray();
                        for (let j = 0; j <= this.lstTable2Data.length - 1; j++) {
                            let filteredList = asEnumerable(table2Data).Where(x => x.PACKAGE_COUNT != 0 && x.UserId == UserName && x.TRANS_DATE == recvDate && x.START_INTERVAL == this.lstTable2Data[j].START_INTERVAL).ToArray();
                            if (filteredList.length > 0) {
                                dayWiseData[x].push({ START_INTERVAL: filteredList[0].START_INTERVAL, PACKAGE_COUNT: filteredList[0].PACKAGE_COUNT, USER_ID: UserName, TRANS_DATE: filteredList[0].TRANS_DATE })
                            }
                            else {
                                dayWiseData[x].push({ START_INTERVAL: this.lstTable2Data[j].START_INTERVAL, PACKAGE_COUNT: 0, USER_ID: UserName, TRANS_DATE: recvDate })
                            }
                            this.lstDataForDeliver[x].START_INTERVAL[i].push(dayWiseData[x][j].START_INTERVAL);
                            this.lstDataForDeliver[x].PACKAGE_COUNT[i].push(dayWiseData[x][j].PACKAGE_COUNT);
                        }
                    }
                    this.lstDataForDeliver[x].ReceiveData[i] = [];
                    this.lstDataForDeliver[x].ReceiveLables.push(this.lstDataForDeliver[x].START_INTERVAL[0]);
                    this.lstDataForDeliver[x].ReceiveData[i].push(this.lstDataForDeliver[x].PACKAGE_COUNT[i]);

                }
            }
            else {
                for (let i = 0; i <= this.selectedDropDownUserId.length - 1; i++) {
                    console.log(this.selectedDropDownUserId);
                    let UserName: string = this.selectedDropDownUserId[i];

                    if (UserName !== "ALL") {
                        this.lstDataForDeliver[x].PACKAGE_COUNT[i] = [];
                        this.lstDataForDeliver[x].START_INTERVAL[i] = [];
                        dayWiseData[x] = [];
                        let table2Data: any[] = [];
                        table2Data = data.DataDictionary["pDsProductivityRep"]["Table2"];
                        let recvDate = this.convertDateFormate(chartDate);
                        //let filteredList = asEnumerable(table2Data).Where(x => x.PACKAGE_COUNT != 0 && x.UserId == UserName && x.TRANS_DATE == recvDate).ToArray();
                        for (let j = 0; j <= this.lstTable2Data.length - 1; j++) {
                            let filteredList = asEnumerable(table2Data).Where(x => x.PACKAGE_COUNT != 0 && x.UserId == UserName && x.TRANS_DATE == recvDate && x.START_INTERVAL == this.lstTable2Data[j].START_INTERVAL).ToArray();
                            if (filteredList.length > 0) {
                                dayWiseData[x].push({ START_INTERVAL: filteredList[0].START_INTERVAL, PACKAGE_COUNT: filteredList[0].PACKAGE_COUNT, USER_ID: UserName, TRANS_DATE: filteredList[0].TRANS_DATE })
                            }
                            else {
                                dayWiseData[x].push({ START_INTERVAL: this.lstTable2Data[j].START_INTERVAL, PACKAGE_COUNT: 0, USER_ID: UserName, TRANS_DATE: recvDate })
                            }
                            this.lstDataForDeliver[x].START_INTERVAL[i].push(dayWiseData[x][j].START_INTERVAL);
                            this.lstDataForDeliver[x].PACKAGE_COUNT[i].push(dayWiseData[x][j].PACKAGE_COUNT);
                        }

                    }
                    this.lstDataForDeliver[x].ReceiveData[i] = [];
                    this.lstDataForDeliver[x].ReceiveLables.push(this.lstDataForDeliver[x].START_INTERVAL[0]);
                    this.lstDataForDeliver[x].ReceiveData[i].push(this.lstDataForDeliver[x].PACKAGE_COUNT[i]);
                }
            }

            chartDate = new Date(chartDate.setDate(chartDate.getDate() + 1));
            x += 1;
        }


        this.chartDataSetForDelverLine = [];
        this.lableForDeliver = [];
        for (let cnt = 0; cnt <= this.lstDataForDeliver.length - 1; cnt++) {

            let list: any[] = [];
            for (let cntData = 0; cntData <= this.lstDataForDeliver[cnt].ReceiveData.length - 1; cntData++) {
                list.push(this.lstDataForDeliver[cnt].ReceiveData[cntData][0]);
            }
            this.chartDataSetForDelverLine.push({ label: '', backgroundColor: '', borderColor: '#00FF00', data: list, fill: false });
            this.lableForDeliver.push(this.lstDataForDeliver[cnt].ReceiveLables)

        }

        this.dataForDelv1 = [];
        this.dataForDelv2 = [];
        this.dataForDelv3 = [];
        this.dataForDelv4 = [];
        this.dataForDelv5 = [];

        this.optionForDeliver1 = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    stacked: true,
                    gridLines: {
                        display: true,
                        color: "rgba(255,99,132,0.2)"
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Packages'

                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: false,
                        color: "rgba(255,99,132,0.2)"
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Time'

                    }
                }]
            },
            title: {
                display: true,
                text: "Dock Deliver By Employee - " + this.dateString[0] + " Day"
            }
        };
        this.optionForDeliver2 = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    stacked: true,
                    gridLines: {
                        display: true,
                        color: "rgba(255,99,132,0.2)"
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Packages'

                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: false,
                        color: "rgba(255,99,132,0.2)"
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Time'

                    }
                }]
            },
            title: {
                display: true,
                text: "Dock Deliver By Employee - " + this.dateString[1] + " Day"
            }
        };
        this.optionForDeliver3 = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    stacked: true,
                    gridLines: {
                        display: true,
                        color: "rgba(255,99,132,0.2)"
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Packages'

                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: false,
                        color: "rgba(255,99,132,0.2)"
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Time'

                    }
                }]
            },
            title: {
                display: true,
                text: "Dock Deliver By Employee - " + this.dateString[2] + " Day"
            }
        };
        this.optionForDeliver4 = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    stacked: true,
                    gridLines: {
                        display: true,
                        color: "rgba(255,99,132,0.2)"
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Packages'

                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: false,
                        color: "rgba(255,99,132,0.2)"
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Time'

                    }
                }]
            },
            title: {
                display: true,
                text: "Dock Deliver By Employee - " + this.dateString[3] + " Day"
            }
        };
        this.optionForDeliver5 = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    stacked: true,
                    gridLines: {
                        display: true,
                        color: "rgba(255,99,132,0.2)"
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Packages'

                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: false,
                        color: "rgba(255,99,132,0.2)"
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Time'

                    }
                }]
            },
            title: {
                display: true,
                text: "Dock Deliver By Employee - " + this.dateString[4] + " Day"
            }
        };


        this.chartDataSetForDeliverGraph1 = [];
        if (this.chartDataSetForDelverLine[0] != undefined) {
            if (this.chartDataSetForDelverLine[0].data != undefined) {
                for (var i in this.chartDataSetForDelverLine[0].data) {
                    if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                        this.chartDataSetForDeliverGraph1.push({ label: this.UserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDelverLine[0].data[i], fill: false, borderColor: this.randomColors[i] })
                    } else {
                        this.chartDataSetForDeliverGraph1.push({ label: this.selectedDropDownUserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDelverLine[0].data[i], fill: false, borderColor: this.randomColors[i] })
                    }

                }
            }

        }

        this.chartDataSetForDeliverGraph2 = [];
        if (this.chartDataSetForDelverLine[1] != undefined) {
            if (this.chartDataSetForDelverLine[1].data != undefined) {
                for (var i in this.chartDataSetForDelverLine[1].data) {
                    if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                        this.chartDataSetForDeliverGraph2.push({ label: this.UserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDelverLine[1].data[i], fill: false, borderColor: this.randomColors[i] })
                    } else {
                        this.chartDataSetForDeliverGraph2.push({ label: this.selectedDropDownUserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDelverLine[1].data[i], fill: false, borderColor: this.randomColors[i] })
                    }

                }
            }
        }
        this.chartDataSetForDeliverGraph3 = [];
        if (this.chartDataSetForDelverLine[2] != undefined) {
            if (this.chartDataSetForDelverLine[2].data != undefined) {
                for (var i in this.chartDataSetForDelverLine[2].data) {
                    if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                        this.chartDataSetForDeliverGraph3.push({ label: this.UserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDelverLine[2].data[i], fill: false, borderColor: this.randomColors[i] })
                    } else {
                        this.chartDataSetForDeliverGraph3.push({ label: this.selectedDropDownUserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDelverLine[2].data[i], fill: false, borderColor: this.randomColors[i] })
                    }

                }
            }
        }
        this.chartDataSetForDeliverGraph4 = [];
        if (this.chartDataSetForDelverLine[3] != undefined) {
            if (this.chartDataSetForDelverLine[3].data != undefined) {
                for (var i in this.chartDataSetForDelverLine[3].data) {
                    if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                        this.chartDataSetForDeliverGraph4.push({ label: this.UserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDelverLine[3].data[i], fill: false, borderColor: this.randomColors[i] })
                    } else {
                        this.chartDataSetForDeliverGraph4.push({ label: this.selectedDropDownUserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDelverLine[3].data[i], fill: false, borderColor: this.randomColors[i] })
                    }

                }
            }
        }

        this.chartDataSetForDeliverGraph5 = [];
        if (this.chartDataSetForDelverLine[4] != undefined) {
            if (this.chartDataSetForDelverLine[4].data != undefined) {
                for (var i in this.chartDataSetForDelverLine[4].data) {
                    if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                        this.chartDataSetForDeliverGraph5.push({ label: this.UserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDelverLine[4].data[i], fill: false, borderColor: this.randomColors[i] })
                    } else {
                        this.chartDataSetForDeliverGraph5.push({ label: this.selectedDropDownUserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDelverLine[4].data[i], fill: false, borderColor: this.randomColors[i] })
                    }

                }
            }
        }

        if (this.blnGraph1 == true) {
            this.dataForDelv1 = {
                labels: this.lableForDeliver[0][0],
                datasets: this.chartDataSetForDeliverGraph1,
                options: this.optionForRecv1
            }
        }
        if (this.blnGraph2 == true) {
            this.dataForDelv2 = {
                labels: this.lableForDeliver[1][0],
                datasets: this.chartDataSetForDeliverGraph2,
                options: this.optionForRecv2
            }
        }
        if (this.blnGraph3 == true) {
            this.dataForDelv3 = {
                labels: this.lableForDeliver[2][0],
                datasets: this.chartDataSetForDeliverGraph3,
                options: this.optionForRecv3
            }
        }
        if (this.blnGraph4 == true) {
            this.dataForDelv4 = {
                labels: this.lableForDeliver[3][0],
                datasets: this.chartDataSetForDeliverGraph4,
                options: this.optionForRecv4
            }
        }
        if (this.blnGraph5 == true) {
            this.dataForDelv5 = {
                labels: this.lableForDeliver[4][0],
                datasets: this.chartDataSetForDeliverGraph5,
                options: this.optionForRecv5
            }
        }


    }

    async PopulateDockGraph(data, day) {
        var lstItem: VM_DELV_PROD;
        let frmDate: Date = this.fromDate;
        let Curdate: Date = frmDate;
        let dtfromdate = this.frmDate
        let chartDate = new Date(dtfromdate);
        this.lstDataForDock = [];
        let dayWiseData = [];
        let dataForDockSummChart: any[] = [];
        let count: number = Math.round((Date.parse(this.toDate.toString()) - Date.parse(this.fromDate.toString())) / (1000 * 3600 * 24));
        //let count = this.toDate.getDate() - this.fromDate.getDate();
        for (let x = 0; x <= count;) {

            if (this.lstDataForDock[x] == null) {
                this.lstDataForDock[x] = [];
                if (this.lstDataForDock[x].PACKAGE_COUNT == null) {
                    this.lstDataForDock[x].PACKAGE_COUNT = [];
                }

                this.lstDataForDock[x].START_INTERVAL = [];
                this.lstDataForDock[x].DockData = [];
                this.lstDataForDock[x].DockLables = [];
            }
            if (this.lstDataForDock[x].DockData == null) {
                this.lstDataForDock[x].DockData = [];
            }
            if (this.lstDataForDock[x].START_INTERVAL == null) {
                this.lstDataForDock[x].START_INTERVAL = [];
            }
            if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                for (let i = 0; i <= this.UserId.length - 1; i++) {

                    let UserName: string = this.UserId[i];
                    let startIntervalTotalSum: number = 0
                    let packageCountTotalSum: number = 0
                    let PackageCountReceive: number = 0
                    let PackageCountDeliver: number = 0
                    let j = 0;
                    if (UserName !== "ALL") {
                        this.lstDataForDock[x].PACKAGE_COUNT[i] = [];
                        this.lstDataForDock[x].START_INTERVAL[i] = [];
                        dayWiseData[x] = [];
                        let table1Data: any[] = [];
                        table1Data = data.DataDictionary["pDsProductivityRep"]["Table1"];
                        let table2Data: any[] = [];
                        table2Data = data.DataDictionary["pDsProductivityRep"]["Table2"];
                        let recvDate = this.convertDateFormate(chartDate);
                        console.log(this.lstTable1Data);
                        console.log(this.lstTable2Data);
                        let distinctUsersArray: any[] = [];
                        distinctUsersArray = asEnumerable(table1Data).GroupBy(x => x.START_INTERVAL).Distinct().ToArray();
                        console.log(distinctUsersArray);
                        for (let j = 0; j <= distinctUsersArray.length - 1; j++) {
                            console.log(distinctUsersArray[j]["key"]);
                            var rows = asEnumerable(table1Data).Where(x => x.START_INTERVAL == distinctUsersArray[j]["key"] && x.UserId == UserName && x.TRANS_DATE == recvDate).ToArray();
                            var rows1 = asEnumerable(table2Data).Where(x => x.START_INTERVAL == distinctUsersArray[j]["key"] && x.UserId == UserName && x.TRANS_DATE == recvDate).ToArray();

                            var value: string = "";
                            var value1: string = "";
                            if (rows.length > 0) {
                                value = rows[0].PACKAGE_COUNT;
                            }
                            else {
                                value = "0";
                            }
                            if (rows1.length > 0) {
                                value1 = rows1[0].PACKAGE_COUNT;
                            }
                            else {
                                value1 = "0";
                            }
                            var sum = parseInt(value) + parseInt(value1);
                            dayWiseData[x].push({ START_INTERVAL: distinctUsersArray[j]["key"], PACKAGE_COUNT: sum, USER_ID: UserName, TRANS_DATE: data.DataDictionary["pDsProductivityRep"]["Table1"][j].TRANS_DATE });
                            dataForDockSummChart.push({ START_INTERVAL: distinctUsersArray[j]["key"], PACKAGE_COUNT: sum, USER_ID: UserName, TRANS_DATE: data.DataDictionary["pDsProductivityRep"]["Table1"][j].TRANS_DATE });
                            this.lstDataForDock[x].START_INTERVAL[i].push(dayWiseData[x][j].START_INTERVAL);
                            this.lstDataForDock[x].PACKAGE_COUNT[i].push(dayWiseData[x][j].PACKAGE_COUNT);
                        }


                    }
                    this.lstDataForDock[x].DockData[i] = [];
                    this.lstDataForDock[x].DockLables.push(this.lstDataForDock[x].START_INTERVAL[0]);
                    this.lstDataForDock[x].DockData[i].push(this.lstDataForDock[x].PACKAGE_COUNT[i]);

                }

            }
            else {
                for (let i = 0; i <= this.selectedDropDownUserId.length - 1; i++) {
                    let UserName: string = this.selectedDropDownUserId[i];
                    let startIntervalTotalSum: number = 0
                    let packageCountTotalSum: number = 0
                    let PackageCountReceive: number = 0
                    let PackageCountDeliver: number = 0
                    let j = 0;
                    if (UserName !== "ALL") {
                        this.lstDataForDock[x].PACKAGE_COUNT[i] = [];
                        this.lstDataForDock[x].START_INTERVAL[i] = [];
                        dayWiseData[x] = [];
                        let table1Data: any[] = [];
                        table1Data = data.DataDictionary["pDsProductivityRep"]["Table1"];
                        let table2Data: any[] = [];
                        table2Data = data.DataDictionary["pDsProductivityRep"]["Table2"];
                        let recvDate = this.convertDateFormate(chartDate);
                        let distinctUsersArray: any[] = [];
                        distinctUsersArray = asEnumerable(table1Data).GroupBy(x => x.START_INTERVAL).Distinct().ToArray();
                        for (let j = 0; j <= distinctUsersArray.length - 1; j++) {
                            var rows = asEnumerable(table1Data).Where(x => x.START_INTERVAL == distinctUsersArray[j]["key"] && x.UserId == UserName && x.TRANS_DATE == recvDate).ToArray();
                            var rows1 = asEnumerable(table2Data).Where(x => x.START_INTERVAL == distinctUsersArray[j]["key"] && x.UserId == UserName && x.TRANS_DATE == recvDate).ToArray();

                            var value: string = "";
                            var value1: string = "";
                            if (rows.length > 0) {
                                value = rows[0].PACKAGE_COUNT;
                            }
                            else {
                                value = "0";
                            }
                            if (rows1.length > 0) {
                                value1 = rows1[0].PACKAGE_COUNT;
                            }
                            else {
                                value1 = "0";
                            }
                            var sum = parseInt(value) + parseInt(value1);
                            dayWiseData[x].push({ START_INTERVAL: distinctUsersArray[j]["key"], PACKAGE_COUNT: sum, USER_ID: UserName, TRANS_DATE: data.DataDictionary["pDsProductivityRep"]["Table1"][j].TRANS_DATE })
                            dataForDockSummChart.push({ START_INTERVAL: distinctUsersArray[j]["key"], PACKAGE_COUNT: sum, USER_ID: UserName, TRANS_DATE: data.DataDictionary["pDsProductivityRep"]["Table1"][j].TRANS_DATE });
                            this.lstDataForDock[x].START_INTERVAL[i].push(dayWiseData[x][j].START_INTERVAL);
                            this.lstDataForDock[x].PACKAGE_COUNT[i].push(dayWiseData[x][j].PACKAGE_COUNT);
                        }


                    }
                    this.lstDataForDock[x].DockData[i] = [];
                    this.lstDataForDock[x].DockLables.push(this.lstDataForDock[x].START_INTERVAL[0]);
                    this.lstDataForDock[x].DockData[i].push(this.lstDataForDock[x].PACKAGE_COUNT[i]);
                }
            }


            chartDate = new Date(chartDate.setDate(chartDate.getDate() + 1));
            x += 1;
        }
        console.log(dataForDockSummChart);
        this.chartDataSetForDock = [];
        this.labelForDock = [];
        for (let cnt = 0; cnt <= this.lstDataForDock.length - 1; cnt++) {

            let list: any[] = [];
            for (let cntData = 0; cntData <= this.lstDataForDock[cnt].DockData.length - 1; cntData++) {

                list.push(this.lstDataForDock[cnt].DockData[cntData][0]);

            }

            this.chartDataSetForDock.push({ label: '', backgroundColor: '', borderColor: '#00FF00', data: list, fill: false });
            this.labelForDock.push(this.lstDataForDock[cnt].DockLables)
        }

        this.dataForDock1 = [];
        this.dataForDock2 = [];
        this.dataForDock3 = [];
        this.dataForDock4 = [];
        this.dataForDock5 = [];

        this.optionForDock1 = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    stacked: true,
                    gridLines: {
                        display: true,
                        color: "rgba(255,99,132,0.2)"
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Packages'

                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: false,
                        color: "rgba(255,99,132,0.2)"
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Time'

                    }
                }]
            },
            title: {
                display: true,
                text: "Dock Performance By Employee - " + this.dateString[0] + " Day"
            }
        };
        this.optionForDock2 = {
            scales: {

                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    stacked: true,
                    gridLines: {
                        display: true,
                        color: "rgba(255,99,132,0.2)"
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Packages'

                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: false,
                        color: "rgba(255,99,132,0.2)"
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Time'

                    }
                }]
            },
            title: {
                display: true,
                text: "Dock Performance By Employee - " + this.dateString[1] + " Day"
            }
        };
        this.optionForDock3 = {
            scales: {

                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    stacked: true,
                    gridLines: {
                        display: true,
                        color: "rgba(255,99,132,0.2)"
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Packages'

                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: false,
                        color: "rgba(255,99,132,0.2)"
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Time'

                    }
                }]
            },
            title: {
                display: true,
                text: "Dock Performance By Employee - " + this.dateString[2] + " Day"
            }
        };
        this.optionForDock4 = {
            scales: {

                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    stacked: true,
                    gridLines: {
                        display: true,
                        color: "rgba(255,99,132,0.2)"
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Packages'

                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: false,
                        color: "rgba(255,99,132,0.2)"
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Time'

                    }
                }]
            },
            title: {
                display: true,
                text: "Dock Performance By Employee - " + this.dateString[3] + " Day"
            }
        };
        this.optionForDock5 = {
            scales: {

                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    stacked: true,
                    gridLines: {
                        display: true,
                        color: "rgba(255,99,132,0.2)"
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Packages'

                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: false,
                        color: "rgba(255,99,132,0.2)"
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Time'

                    }
                }]
            },
            title: {
                display: true,
                text: "Dock Performance By Employee - " + this.dateString[4] + " Day"
            }
        };


        this.chartDataSetForDockGraph1 = [];
        if (this.chartDataSetForDock[0] != undefined) {
            if (this.chartDataSetForDock[0].data != undefined) {
                for (var i in this.chartDataSetForDock[0].data) {
                    if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                        this.chartDataSetForDockGraph1.push({ label: this.UserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDock[0].data[i], fill: false, borderColor: this.randomColors[i] })
                    }
                    else {
                        this.chartDataSetForDockGraph1.push({ label: this.selectedDropDownUserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDock[0].data[i], fill: false, borderColor: this.randomColors[i] })
                    }

                }
            }
        }


        this.chartDataSetForDockGraph2 = [];
        if (this.chartDataSetForDock[1] != undefined) {
            if (this.chartDataSetForDock[1].data != undefined) {
                for (var i in this.chartDataSetForDock[1].data) {
                    if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                        this.chartDataSetForDockGraph2.push({ label: this.UserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDock[1].data[i], fill: false, borderColor: this.randomColors[i] })
                    }
                    else {
                        this.chartDataSetForDockGraph2.push({ label: this.selectedDropDownUserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDock[1].data[i], fill: false, borderColor: this.randomColors[i] })
                    }

                }
            }
        }

        this.chartDataSetForDockGraph3 = [];
        if (this.chartDataSetForDock[2] != undefined) {
            if (this.chartDataSetForDock[2].data != undefined) {
                for (var i in this.chartDataSetForDock[2].data) {
                    if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                        this.chartDataSetForDockGraph3.push({ label: this.UserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDock[2].data[i], fill: false, borderColor: this.randomColors[i] })
                    }
                    else {
                        this.chartDataSetForDockGraph3.push({ label: this.selectedDropDownUserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDock[2].data[i], fill: false, borderColor: this.randomColors[i] })
                    }
                }
            }
        }
        this.chartDataSetForDockGraph4 = [];
        if (this.chartDataSetForDock[3] != undefined) {
            if (this.chartDataSetForDock[3].data != undefined) {
                for (var i in this.chartDataSetForDock[3].data) {
                    if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                        this.chartDataSetForDockGraph4.push({ label: this.UserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDock[3].data[i], fill: false, borderColor: this.randomColors[i] })
                    }
                    else {
                        this.chartDataSetForDockGraph4.push({ label: this.selectedDropDownUserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDock[3].data[i], fill: false, borderColor: this.randomColors[i] })
                    }
                }
            }
        }


        this.chartDataSetForDockGraph5 = [];
        if (this.chartDataSetForDock[4] != undefined) {
            if (this.chartDataSetForDock[4].data != undefined) {
                for (var i in this.chartDataSetForDock[4].data) {
                    if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                        this.chartDataSetForDockGraph5.push({ label: this.UserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDock[4].data[i], fill: false, borderColor: this.randomColors[i] })
                    }
                    else {
                        this.chartDataSetForDockGraph5.push({ label: this.selectedDropDownUserId[i], backgroundColor: '#FFFFFF', data: this.chartDataSetForDock[4].data[i], fill: false, borderColor: this.randomColors[i] })
                    }
                }
            }
        }
        if (this.blnGraph1 == true) {
            this.dataForDock1 = {
                labels: this.labelForDock[0][0],
                datasets: this.chartDataSetForDockGraph1,
                options: this.optionForDock1
            }
        }
        if (this.blnGraph2 == true) {
            this.dataForDock2 = {
                labels: this.labelForDock[1][0],
                datasets: this.chartDataSetForDockGraph2,
                options: this.optionForDock2
            }
        }
        if (this.blnGraph3 == true) {
            this.dataForDock3 = {
                labels: this.labelForDock[2][0],
                datasets: this.chartDataSetForDockGraph3,
                options: this.optionForDock3
            }
        }
        if (this.blnGraph4 == true) {
            this.dataForDock4 = {
                labels: this.labelForDock[3][0],
                datasets: this.chartDataSetForDockGraph4,
                options: this.optionForDock4
            }
        }
        if (this.blnGraph5 == true) {
            this.dataForDock5 = {
                labels: this.labelForDock[4][0],
                datasets: this.chartDataSetForDockGraph5,
                options: this.optionForDock5
            }
        }

        this.BindSummaryChartsDock(dataForDockSummChart);


    }

    getRandomColor() {

        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    async BindSummaryChartsRecv(data) {
        var lstItem: VM_DELV_PROD;
        let frmDate: Date = this.fromDate;
        let Curdate: Date = frmDate;
        this.lstDataForSummaryRecv = [];
        if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
            for (let i = 0; i <= this.UserId.length - 1; i++) {

                if (this.lstDataForSummaryRecv[i] == null) {
                    this.lstDataForSummaryRecv[i] = [];
                    if (this.lstDataForSummaryRecv[i].PACKAGE_COUNT == null) {
                        this.lstDataForSummaryRecv[i].PACKAGE_COUNT = [];
                    }

                    this.lstDataForSummaryRecv[i].START_INTERVAL = [];
                    this.lstDataForSummaryRecv[i].DataSummaryRecv = [];
                    this.lstDataForSummaryRecv[i].LabelSummaryRecv = [];
                    this.lstDataForSummaryRecv[i].UserId = [];
                }
                if (this.lstDataForSummaryRecv[i].DataSummaryRecv == null) {
                    this.lstDataForSummaryRecv[i].DataSummaryRecv = [];
                }
                if (this.lstDataForSummaryRecv[i].START_INTERVAL == null) {
                    this.lstDataForSummaryRecv[i].START_INTERVAL = [];
                }
                if (this.lstDataForSummaryRecv[i].UserId == null) {
                    this.lstDataForSummaryRecv[i].UserId = [];
                }

                let UserName: string = this.UserId[i];
                let startIntervalTotalSum: number = 0
                let packageCountTotalSum: number = 0
                let PackageCountReceive: number = 0
                let PackageCountDeliver: number = 0
                if (UserName !== "ALL") {

                    for (let j = 0; j <= data.DataDictionary["pDsProductivityRep"]["Table1"].length - 1; j++) {
                        let table1Data: any[] = [];
                        table1Data = data.DataDictionary["pDsProductivityRep"]["Table1"];
                        var rows = asEnumerable(table1Data).Where(x => x.START_INTERVAL == data.DataDictionary["pDsProductivityRep"]["Table1"][j].START_INTERVAL && x.UserId == UserName).ToArray();
                        var value: string = "";
                        if (rows.length > 0) {
                            value = rows[0].PACKAGE_COUNT.toString();
                        }
                        else {
                            value = "0";
                        }
                        this.lstDataForSummaryRecv[i].START_INTERVAL.push(data.DataDictionary["pDsProductivityRep"]["Table1"][j].START_INTERVAL);
                        this.lstDataForSummaryRecv[i].PACKAGE_COUNT.push(value);
                        this.lstDataForSummaryRecv[i].UserId.push(UserName);
                    }
                }
                this.lstDataForSummaryRecv[i].DataSummaryRecv.push(this.lstDataForSummaryRecv[i].PACKAGE_COUNT);
                this.lstDataForSummaryRecv[i].LabelSummaryRecv.push(this.lstDataForSummaryRecv[i].START_INTERVAL);

            }
        }
        else {
            for (let i = 0; i <= this.selectedDropDownUserId.length - 1; i++) {

                if (this.lstDataForSummaryRecv[i] == null) {
                    this.lstDataForSummaryRecv[i] = [];
                    if (this.lstDataForSummaryRecv[i].PACKAGE_COUNT == null) {
                        this.lstDataForSummaryRecv[i].PACKAGE_COUNT = [];
                    }

                    this.lstDataForSummaryRecv[i].START_INTERVAL = [];
                    this.lstDataForSummaryRecv[i].DataSummaryRecv = [];
                    this.lstDataForSummaryRecv[i].LabelSummaryRecv = [];
                    this.lstDataForSummaryRecv[i].UserId = [];
                }
                if (this.lstDataForSummaryRecv[i].DataSummaryRecv == null) {
                    this.lstDataForSummaryRecv[i].DataSummaryRecv = [];
                }
                if (this.lstDataForSummaryRecv[i].START_INTERVAL == null) {
                    this.lstDataForSummaryRecv[i].START_INTERVAL = [];
                }
                if (this.lstDataForSummaryRecv[i].UserId == null) {
                    this.lstDataForSummaryRecv[i].UserId = [];
                }

                let UserName: string = this.selectedDropDownUserId[i];
                let startIntervalTotalSum: number = 0
                let packageCountTotalSum: number = 0
                let PackageCountReceive: number = 0
                let PackageCountDeliver: number = 0
                if (UserName !== "ALL") {

                    for (let j = 0; j <= data.DataDictionary["pDsProductivityRep"]["Table1"].length - 1; j++) {
                        let table1Data: any[] = [];
                        table1Data = data.DataDictionary["pDsProductivityRep"]["Table1"];
                        var rows = asEnumerable(table1Data).Where(x => x.START_INTERVAL == data.DataDictionary["pDsProductivityRep"]["Table1"][j].START_INTERVAL && x.UserId == UserName).ToArray();
                        var value: string = "";
                        if (rows.length > 0) {
                            value = rows[0].PACKAGE_COUNT.toString();
                        }
                        else {
                            value = "0";
                        }
                        this.lstDataForSummaryRecv[i].START_INTERVAL.push(data.DataDictionary["pDsProductivityRep"]["Table1"][j].START_INTERVAL);
                        this.lstDataForSummaryRecv[i].PACKAGE_COUNT.push(value);
                        this.lstDataForSummaryRecv[i].UserId.push(UserName);
                    }
                }
                this.lstDataForSummaryRecv[i].DataSummaryRecv.push(this.lstDataForSummaryRecv[i].PACKAGE_COUNT);
                this.lstDataForSummaryRecv[i].LabelSummaryRecv.push(this.lstDataForSummaryRecv[i].START_INTERVAL);

            }
        }

        this.chartDataSetForSummaryRecv = [];
        this.labelForSummaryRecv = [];
        for (let cnt = 0; cnt <= this.lstDataForSummaryRecv.length - 1; cnt++) {
            if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                this.chartDataSetForSummaryRecv.push({ label: this.UserId[cnt], backgroundColor: '#FFFFFF', borderColor: this.randomColors[cnt], data: this.lstDataForSummaryRecv[cnt].DataSummaryRecv[0], fill: false });
                this.labelForSummaryRecv.push(this.lstDataForSummaryRecv[cnt].LabelSummaryRecv)
            }
            else {
                this.chartDataSetForSummaryRecv.push({ label: this.selectedDropDownUserId[cnt], backgroundColor: '#FFFFFF', borderColor: this.randomColors[cnt], data: this.lstDataForSummaryRecv[cnt].DataSummaryRecv[0], fill: false });
                this.labelForSummaryRecv.push(this.lstDataForSummaryRecv[cnt].LabelSummaryRecv)
            }
        }

        this.optionForSummaryRecv = {
            scales: {
                yAxes: [{
                    stacked: true,
                    gridLines: {
                        display: true,
                        color: "rgba(255,99,132,0.2)"
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Packages'

                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: false,
                        color: "rgba(255,99,132,0.2)"
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Time'

                    }
                }]
            },
            title: {
                display: true,
                text: "Dock Receiving By Employee - Summary"
            }
        };

        this.dataForSummaryRecv = {
            labels: this.labelForSummaryRecv[0][0],
            datasets: this.chartDataSetForSummaryRecv,
            options: this.optionForSummaryRecv
        }





    }

    async BindSummaryChartsDeliver(data) {
        var lstItem: VM_DELV_PROD;
        let frmDate: Date = this.fromDate;
        let Curdate: Date = frmDate;
        this.lstDataForSummaryDeliver = [];
        if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
            for (let i = 0; i <= this.UserId.length - 1; i++) {

                if (this.lstDataForSummaryDeliver[i] == null) {
                    this.lstDataForSummaryDeliver[i] = [];
                    if (this.lstDataForSummaryDeliver[i].PACKAGE_COUNT == null) {
                        this.lstDataForSummaryDeliver[i].PACKAGE_COUNT = [];
                    }

                    this.lstDataForSummaryDeliver[i].START_INTERVAL = [];
                    this.lstDataForSummaryDeliver[i].DataSummaryRecv = [];
                    this.lstDataForSummaryDeliver[i].LabelSummaryRecv = [];
                    this.lstDataForSummaryDeliver[i].UserId = [];
                }
                if (this.lstDataForSummaryDeliver[i].DataSummaryRecv == null) {
                    this.lstDataForSummaryDeliver[i].DataSummaryRecv = [];
                }
                if (this.lstDataForSummaryDeliver[i].START_INTERVAL == null) {
                    this.lstDataForSummaryDeliver[i].START_INTERVAL = [];
                }
                if (this.lstDataForSummaryDeliver[i].UserId == null) {
                    this.lstDataForSummaryDeliver[i].UserId = [];
                }

                let UserName: string = this.UserId[i];
                let startIntervalTotalSum: number = 0
                let packageCountTotalSum: number = 0
                let PackageCountReceive: number = 0
                let PackageCountDeliver: number = 0
                if (UserName !== "ALL") {

                    for (let j = 0; j <= data.DataDictionary["pDsProductivityRep"]["Table2"].length - 1; j++) {
                        let table2Data: any[] = [];
                        table2Data = data.DataDictionary["pDsProductivityRep"]["Table2"];
                        var rows = asEnumerable(table2Data).Where(x => x.START_INTERVAL == data.DataDictionary["pDsProductivityRep"]["Table2"][j].START_INTERVAL && x.UserId == UserName).ToArray();
                        var value: string = "";
                        if (rows.length > 0) {
                            value = rows[0].PACKAGE_COUNT.toString();
                        }
                        else {
                            value = "0";
                        }
                        this.lstDataForSummaryDeliver[i].START_INTERVAL.push(data.DataDictionary["pDsProductivityRep"]["Table2"][j].START_INTERVAL);
                        this.lstDataForSummaryDeliver[i].PACKAGE_COUNT.push(value);
                        this.lstDataForSummaryDeliver[i].UserId.push(UserName);
                    }
                }
                this.lstDataForSummaryDeliver[i].DataSummaryRecv.push(this.lstDataForSummaryDeliver[i].PACKAGE_COUNT);
                this.lstDataForSummaryDeliver[i].LabelSummaryRecv.push(this.lstDataForSummaryDeliver[i].START_INTERVAL);

            }
        }
        else {
            for (let i = 0; i <= this.selectedDropDownUserId.length - 1; i++) {

                if (this.lstDataForSummaryDeliver[i] == null) {
                    this.lstDataForSummaryDeliver[i] = [];
                    if (this.lstDataForSummaryDeliver[i].PACKAGE_COUNT == null) {
                        this.lstDataForSummaryDeliver[i].PACKAGE_COUNT = [];
                    }

                    this.lstDataForSummaryDeliver[i].START_INTERVAL = [];
                    this.lstDataForSummaryDeliver[i].DataSummaryRecv = [];
                    this.lstDataForSummaryDeliver[i].LabelSummaryRecv = [];
                    this.lstDataForSummaryDeliver[i].UserId = [];
                }
                if (this.lstDataForSummaryDeliver[i].DataSummaryRecv == null) {
                    this.lstDataForSummaryDeliver[i].DataSummaryRecv = [];
                }
                if (this.lstDataForSummaryDeliver[i].START_INTERVAL == null) {
                    this.lstDataForSummaryDeliver[i].START_INTERVAL = [];
                }
                if (this.lstDataForSummaryDeliver[i].UserId == null) {
                    this.lstDataForSummaryDeliver[i].UserId = [];
                }

                let UserName: string = this.selectedDropDownUserId[i];
                let startIntervalTotalSum: number = 0
                let packageCountTotalSum: number = 0
                let PackageCountReceive: number = 0
                let PackageCountDeliver: number = 0
                if (UserName !== "ALL") {
                    for (let j = 0; j <= data.DataDictionary["pDsProductivityRep"]["Table2"].length - 1; j++) {

                        let table2Data: any[] = [];
                        table2Data = data.DataDictionary["pDsProductivityRep"]["Table2"];
                        var rows = asEnumerable(table2Data).Where(x => x.START_INTERVAL == data.DataDictionary["pDsProductivityRep"]["Table2"][j].START_INTERVAL && x.UserId == UserName).ToArray();
                        var value: string = "";
                        if (rows.length > 0) {
                            value = rows[0].PACKAGE_COUNT.toString();
                        }
                        else {
                            value = "0";
                        }

                        this.lstDataForSummaryDeliver[i].START_INTERVAL.push(data.DataDictionary["pDsProductivityRep"]["Table2"][j].START_INTERVAL);
                        this.lstDataForSummaryDeliver[i].PACKAGE_COUNT.push(value);
                        this.lstDataForSummaryDeliver[i].UserId.push(UserName);
                    }
                }
                this.lstDataForSummaryDeliver[i].DataSummaryRecv.push(this.lstDataForSummaryDeliver[i].PACKAGE_COUNT);
                this.lstDataForSummaryDeliver[i].LabelSummaryRecv.push(this.lstDataForSummaryDeliver[i].START_INTERVAL);

            }
        }


        this.chartDataSetForSummaryDeliver = [];
        this.labelForSummaryDeliver = [];
        for (let cnt = 0; cnt <= this.lstDataForSummaryDeliver.length - 1; cnt++) {
            if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                this.chartDataSetForSummaryDeliver.push({ label: this.UserId[cnt], backgroundColor: '#FFFFFF', borderColor: this.randomColors[cnt], data: this.lstDataForSummaryDeliver[cnt].DataSummaryRecv[0], fill: false });
                this.labelForSummaryDeliver.push(this.lstDataForSummaryDeliver[cnt].LabelSummaryRecv)
            }
            else {
                this.chartDataSetForSummaryDeliver.push({ label: this.selectedDropDownUserId[cnt], backgroundColor: '#FFFFFF', borderColor: this.randomColors[cnt], data: this.lstDataForSummaryDeliver[cnt].DataSummaryRecv[0], fill: false });
                this.labelForSummaryDeliver.push(this.lstDataForSummaryDeliver[cnt].LabelSummaryRecv)
            }

        }

        this.optionForSummaryDeliver = {
            scales: {
                yAxes: [{
                    stacked: true,
                    gridLines: {
                        display: true,
                        color: "rgba(255,99,132,0.2)"
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Packages'

                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: false,
                        color: "rgba(255,99,132,0.2)"
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Time'

                    }
                }]
            },
            title: {
                display: true,
                text: "Dock Deliver By Employee - Summary"
            }
        };


        this.dataForSummaryDeliver = {
            labels: this.labelForSummaryDeliver[0][0],
            datasets: this.chartDataSetForSummaryDeliver,
            options: this.optionForSummaryDeliver
        }





    }

    async BindSummaryChartsDock(DockSummaryChartData: any[]) {

        let frmDate: Date = this.fromDate;
        let Curdate: Date = frmDate;
        this.lstDataForSummaryDock = [];
        if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
            for (let i = 0; i <= this.UserId.length - 1; i++) {

                if (this.lstDataForSummaryDock[i] == null) {
                    this.lstDataForSummaryDock[i] = [];
                    if (this.lstDataForSummaryDock[i].PACKAGE_COUNT == null) {
                        this.lstDataForSummaryDock[i].PACKAGE_COUNT = [];
                    }

                    this.lstDataForSummaryDock[i].START_INTERVAL = [];
                    this.lstDataForSummaryDock[i].DataSummaryDock = [];
                    this.lstDataForSummaryDock[i].LabelSummaryDock = [];
                    this.lstDataForSummaryDock[i].UserId = [];
                }
                if (this.lstDataForSummaryDock[i].DataSummaryDock == null) {
                    this.lstDataForSummaryDock[i].DataSummaryDock = [];
                }
                if (this.lstDataForSummaryDock[i].START_INTERVAL == null) {
                    this.lstDataForSummaryDock[i].START_INTERVAL = [];
                }
                if (this.lstDataForSummaryDock[i].UserId == null) {
                    this.lstDataForSummaryDock[i].UserId = [];
                }

                let UserName: string = this.UserId[i];
                let startIntervalTotalSum: number = 0
                let packageCountTotalSum: number = 0
                let PackageCountReceive: number = 0
                let PackageCountDeliver: number = 0
                if (UserName !== "ALL") {
                    let table1Data: any[] = [];
                    table1Data = this.lstTable1Data;
                    let distinctUsersArray: any[] = [];
                    distinctUsersArray = asEnumerable(table1Data).GroupBy(x => x.START_INTERVAL).Distinct().ToArray();
                    console.log(distinctUsersArray);
                    for (let j = 0; j <= distinctUsersArray.length - 1; j++) {
                        let dockDusmmarData: any[] = [];
                        dockDusmmarData = DockSummaryChartData;
                        var rows = asEnumerable(DockSummaryChartData).Where(x => x.START_INTERVAL == distinctUsersArray[j]["key"] && x.USER_ID == UserName).ToArray();
                        var value: number = 0;
                        for (let summ = 0; summ <= rows.length - 1; summ++) {
                            value += parseInt(rows[summ].PACKAGE_COUNT);
                        }
                        this.lstDataForSummaryDock[i].START_INTERVAL.push(rows[0].START_INTERVAL);
                        this.lstDataForSummaryDock[i].PACKAGE_COUNT.push(value.toString());
                        this.lstDataForSummaryDock[i].UserId.push(UserName);
                    }
                }
                this.lstDataForSummaryDock[i].DataSummaryDock.push(this.lstDataForSummaryDock[i].PACKAGE_COUNT);
                this.lstDataForSummaryDock[i].LabelSummaryDock.push(this.lstDataForSummaryDock[i].START_INTERVAL);

            }
        }
        else {
            for (let i = 0; i <= this.selectedDropDownUserId.length - 1; i++) {

                if (this.lstDataForSummaryDock[i] == null) {
                    this.lstDataForSummaryDock[i] = [];
                    if (this.lstDataForSummaryDock[i].PACKAGE_COUNT == null) {
                        this.lstDataForSummaryDock[i].PACKAGE_COUNT = [];
                    }

                    this.lstDataForSummaryDock[i].START_INTERVAL = [];
                    this.lstDataForSummaryDock[i].DataSummaryDock = [];
                    this.lstDataForSummaryDock[i].LabelSummaryDock = [];
                    this.lstDataForSummaryDock[i].UserId = [];
                }
                if (this.lstDataForSummaryDock[i].DataSummaryDock == null) {
                    this.lstDataForSummaryDock[i].DataSummaryDock = [];
                }
                if (this.lstDataForSummaryDock[i].START_INTERVAL == null) {
                    this.lstDataForSummaryDock[i].START_INTERVAL = [];
                }
                if (this.lstDataForSummaryDock[i].UserId == null) {
                    this.lstDataForSummaryDock[i].UserId = [];
                }

                let UserName: string = this.selectedDropDownUserId[i];
                let startIntervalTotalSum: number = 0
                let packageCountTotalSum: number = 0
                let PackageCountReceive: number = 0
                let PackageCountDeliver: number = 0
                if (UserName !== "ALL") {
                    let table1Data: any[] = [];
                    table1Data = this.lstTable1Data;
                    let distinctUsersArray: any[] = [];
                    distinctUsersArray = asEnumerable(table1Data).GroupBy(x => x.START_INTERVAL).Distinct().ToArray();
                    for (let j = 0; j <= distinctUsersArray.length - 1; j++) {
                        let dockDusmmarData: any[] = [];
                        dockDusmmarData = DockSummaryChartData;
                        var rows = asEnumerable(DockSummaryChartData).Where(x => x.START_INTERVAL == distinctUsersArray[j]["key"] && x.USER_ID == UserName).ToArray();
                        var value: number = 0;
                        for (let summ = 0; summ <= rows.length - 1; summ++) {
                            value += parseInt(rows[summ].PACKAGE_COUNT);
                        }
                        this.lstDataForSummaryDock[i].START_INTERVAL.push(rows[0].START_INTERVAL);
                        this.lstDataForSummaryDock[i].PACKAGE_COUNT.push(value.toString());
                        this.lstDataForSummaryDock[i].UserId.push(UserName);
                    }
                }
                this.lstDataForSummaryDock[i].DataSummaryDock.push(this.lstDataForSummaryDock[i].PACKAGE_COUNT);
                this.lstDataForSummaryDock[i].LabelSummaryDock.push(this.lstDataForSummaryDock[i].START_INTERVAL);

            }
        }

        this.chartDataSetForSummaryDock = [];
        this.labelForSummaryDock = [];
        for (let cnt = 0; cnt <= this.lstDataForSummaryDock.length - 1; cnt++) {
            if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                this.chartDataSetForSummaryDock.push({ label: this.UserId[cnt], backgroundColor: '#FFFFFF', borderColor: this.randomColors[cnt], data: this.lstDataForSummaryDock[cnt].DataSummaryDock[0], fill: false });
                this.labelForSummaryDock.push(this.lstDataForSummaryDock[cnt].LabelSummaryDock)
            }
            else {
                this.chartDataSetForSummaryDock.push({ label: this.selectedDropDownUserId[cnt], backgroundColor: '#FFFFFF', borderColor: this.randomColors[cnt], data: this.lstDataForSummaryDock[cnt].DataSummaryDock[0], fill: false });
                this.labelForSummaryDock.push(this.lstDataForSummaryDock[cnt].LabelSummaryDock)
            }
        }

        this.optionForSummaryDock = {
            scales: {
                yAxes: [{
                    stacked: true,
                    gridLines: {
                        display: true,
                        color: "rgba(255,99,132,0.2)"
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Packages'

                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: false,
                        color: "rgba(255,99,132,0.2)"
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Time'

                    }
                }]
            },
            title: {
                display: true,
                text: "Dock Performance By Employee - Summary"
            }
        };

        this.dataForSummaryDock = {
            labels: this.labelForSummaryDock[0][0],
            datasets: this.chartDataSetForSummaryDock,
            options: this.optionForSummaryDock
        }

    }


    async BindCycleTimeReport() {
        this.spinnerService.start();
        this.growlMessage = [];
        this.activeTab = "Cycle Time";
        this.showGridCycleTime = false;
        let frmDate = this.convert(this.fromDate);
        let dt = this.convert(this.fromDate);
        this.frmDate = new Date(dt);
        let todate = this.convert(this.toDate);
        if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
            if (this.lstUsers.length == 1) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                this.spinnerService.stop();
                return;
            }
        }
        let userString: string = "";
        for (let a = 0; a <= this.selectedDropDownUserId.length - 1; a++) {
            userString = userString + this.selectedDropDownUserId[a] + ",";
        }
        userString = userString.replace(/,\s*$/, "");
        this.DeliverProductivityService.GetCycleTimeReport(this.orgGroupIDForDBUpdate, frmDate, todate, userString, this.startEvent, this.endEvent).catch(this.httpService.handleError).then((res: Response) => {
            let data = res.json() as AtParWebApiResponse<any>;
            switch (data.StatType) {
                case StatusType.Success: {
                    let lstEventRows = [];
                    this.lstTransactiondata = data.DataDictionary["pDsDelvDetailRep"]["TRANSACTIONS"];
                    this.lstEventDetailsData = data.DataDictionary["pDsDelvDetailRep"]["EVENTDETAILS"];
                    console.log(this.lstTransactiondata);
                    console.log(this.lstEventDetailsData);
                    if (this.lstTransactiondata.length > 0 && this.lstEventDetailsData.length > 0) {
                        this.showGridCycleTime = true;
                        let lstItem: VM_CYCLETIME_DETAILS;
                        this.lstFinalCycleData = [];
                        if (this.lstTransactiondata.length > 0) {
                            for (let i = 0; i <= this.lstTransactiondata.length - 1; i++) {
                                if (this.lstEventDetailsData.length > 0) {
                                    if (this.selectedStartEvent === "-1" && this.selectedEndEvent === "-2") {
                                        this.lstTransactionFilterdata = asEnumerable(this.lstEventDetailsData).Where(x => x.TRANSACTION_ID == this.lstTransactiondata[i].TRANSACTION_ID && (x.STATUS_MESSAGE == "MMIS Receipt" || x.STATUS_MESSAGE == "Parcel Receipt")).OrderBy(x => x.STATUS_TIME).ToArray();
                                    }
                                    else if (this.selectedStartEvent === "-2") {
                                        this.lstTransactionFilterdata = asEnumerable(this.lstEventDetailsData).Where(x => x.TRANSACTION_ID == this.lstTransactiondata[i].TRANSACTION_ID && (x.STATUS_MESSAGE != "Parcel Receipt")).OrderBy(x => x.STATUS_TIME).ToArray();
                                    }
                                    else if (this.selectedStartEvent === "1") {
                                        this.lstTransactionFilterdata = asEnumerable(this.lstEventDetailsData).Where(x => x.TRANSACTION_ID == this.lstTransactiondata[i].TRANSACTION_ID && (x.STATUS_MESSAGE != "MMIS Receipt" && x.STATUS_MESSAGE != "Parcel Receipt")).OrderBy(x => x.STATUS_TIME).ToArray();
                                    }
                                    else {
                                        this.lstTransactionFilterdata = asEnumerable(this.lstEventDetailsData).Where(x => x.TRANSACTION_ID == this.lstTransactiondata[i].TRANSACTION_ID).OrderBy(x => x.STATUS_TIME).ToArray();

                                    }
                                    console.log(this.lstTransactionFilterdata);
                                    if (this.lstTransactionFilterdata.length > 0) {
                                        lstItem = new VM_CYCLETIME_DETAILS();
                                        lstItem.TRANSACTION_ID = this.lstTransactiondata[i].TRANSACTION_ID;
                                        lstItem.TRACKING_NBR = this.lstTransactiondata[i].EXTTRACKING;
                                        lstItem.DELIVER_FROM = this.lstTransactiondata[i].DELIVERED_BY;
                                        let intTotVal: number = 0
                                        let dtPrevCycletime: Date = null;
                                        let dtCycletime: Date;
                                        let defaultDateString: string = "1/1/0001 12:00:00 AM";
                                        var dtdefaultdate = Date.parse(defaultDateString);
                                        let dtTimediff: Date;
                                        let dtPrevCycletimeCount: number = 0;
                                        let dtCycletimeCount: number = 0;
                                        for (let j = 0; j <= this.lstTransactionFilterdata.length - 1; j++) {
                                            if (this.lstTransactionFilterdata[j].STATUS_TIME != null) {
                                                dtCycletime = this.lstTransactionFilterdata[j].STATUS_TIME;
                                                if (dtPrevCycletime != null) {
                                                    if (dtPrevCycletime.toString() != dtdefaultdate.toString()) {
                                                        dtPrevCycletimeCount = new Date(dtPrevCycletime).getTime();
                                                        dtCycletimeCount = new Date(dtCycletime).getTime();
                                                        if ((dtCycletimeCount - dtPrevCycletimeCount) / 1000 >= 0) {
                                                            intTotVal = intTotVal + parseInt(((dtCycletimeCount - dtPrevCycletimeCount) / 1000).toString());
                                                        }

                                                    }
                                                }
                                                dtPrevCycletime = dtCycletime

                                            }
                                        }
                                        let intHrs: number = 0
                                        let intDurationInSec: number = intTotVal;
                                        var seconds = Math.floor(intDurationInSec % 60);

                                        let minutes: number = Math.floor((intDurationInSec / 60) % 60);

                                        var hours = Math.floor(intDurationInSec / 3600);

                                        var days = Math.floor(intDurationInSec / 24 / 60 / 60);


                                        let h, m, s: string = "";

                                        if (hours < 10) {
                                            h = "0" + hours;
                                        }
                                        else {
                                            h = hours.toString();
                                        }
                                        if (minutes < 10) {
                                            m = "0" + minutes;
                                        }
                                        else {
                                            m = minutes.toString();
                                        }
                                        if (seconds < 10) {
                                            s = "0" + seconds;
                                        }
                                        else {
                                            s = seconds.toString();
                                        }

                                        let strDuration: String = "";
                                        let span: Date;
                                        let Hspan: number;
                                        strDuration = h + ":" + m + ':' + s;
                                        Hspan = intDurationInSec / 60;
                                        lstItem.CYCLE_TIME = strDuration.toString();
                                        lstItem.HOURS = h;
                                        lstItem.MINS = m;
                                        lstItem.SECONDS = s;
                                        lstItem.TOT_HOURS = (Math.trunc((Hspan / 60) * 100) / 100).toString();
                                        this.lstFinalCycleData.push(lstItem);

                                    }
                                }
                            }
                            console.log(this.lstFinalCycleData);
                            this.BindCycleTimeHoursSummary();
                            this.BindCycleTimeSummaryDetails();
                            this.tdExports = true;

                        }
                    }
                    else {
                        this.showGrid = false;
                        this.showGridCycleTime = false;
                        this.tdExports = false;
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                    }
                    this.spinnerService.stop();
                    break;
                }
                case StatusType.Warn: {
                    this.showGrid = false;
                    this.showGridCycleTime = false;
                    this.tdExports = false;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                    this.spinnerService.stop();
                    break;
                }
                case StatusType.Error: {
                    this.showGrid = false;
                    this.showGridCycleTime = false;
                    this.tdExports = false;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                    this.spinnerService.stop();
                    break;
                }
                case StatusType.Custom: {
                    this.showGrid = false;
                    this.showGridCycleTime = false;
                    this.tdExports = false;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                    this.spinnerService.stop();
                    break;
                }
            }

        })
    }

    async CalculateCycleTime(cycleFilterData, cycleSingleData) {
        let intTotVal: number = 0
        let dtPrevCycletime: Date = null;
        let dtCycletime: Date;
        let defaultDateString: string = "1/1/0001 12:00:00 AM";
        var dtdefaultdate = Date.parse(defaultDateString);
        let dtTimediff: Date
        for (let i = 0; i <= cycleFilterData.length - 1; i++) {
            if (cycleFilterData[i].STATUS_TIME != null) {
                dtCycletime = cycleFilterData[i].STATUS_TIME;
                if (dtPrevCycletime.toString() != dtdefaultdate.toString()) {
                    if ((dtPrevCycletime.getTime() - dtCycletime.getTime()) >= 0) {
                        intTotVal = intTotVal + parseInt((dtPrevCycletime.getTime() - dtCycletime.getTime()).toString());
                    }

                }
                dtPrevCycletime = dtCycletime

            }
        }

    }


    async BindCycleTimeHoursSummary() {
        let ArrHrsList: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 24, 48, 72, 100];
        let _IntHrsCnt: number = 0
        let _IntTotCounts: number = 0
        let lstitem: VM_CYCLETIME_DETAILS;
        _IntTotCounts = this.lstFinalCycleData.length;
        this.lstCycleHourDetails = [];
        let totalHoursList: any[] = [];
        for (let c = 0; c <= this.lstFinalCycleData.length - 1; c++) {
            totalHoursList.push({ TOT_HOURS: parseFloat(this.lstFinalCycleData[c].TOT_HOURS) })
        }
        for (let i = 0; i <= ArrHrsList.length - 1; i++) {

            _IntHrsCnt = asEnumerable(totalHoursList).Where(x => x.TOT_HOURS <= parseFloat((ArrHrsList[i]).toString())).ToArray().length;
            lstitem = new VM_CYCLETIME_DETAILS();
            lstitem.HOURSSUMMARY = ArrHrsList[i].toString();
            lstitem.COUNTSUMMARY = _IntHrsCnt.toString();
            lstitem.COUNT_PERCENTSUMMARY = ((_IntHrsCnt > 0) ? (Math.trunc(((_IntHrsCnt / _IntTotCounts) * 100)) / 100) : 0);
            this.lstCycleHourDetails.push(lstitem);

        }
        console.log(this.lstFinalCycleData);
    }

    async BindCycleTimeSummaryDetails() {
        let AvgCount: number = 0;
        let TotTotalHoursArray: number[] = new Array();
        let result: VM_RESULTS;
        this.Results = [];
        result = new VM_RESULTS();
        result.Count = this.lstFinalCycleData.length.toString();
        for (let i = 0; i <= this.lstFinalCycleData.length - 1; i++) {
            AvgCount = AvgCount + parseFloat(this.lstFinalCycleData[i].TOT_HOURS);
            TotTotalHoursArray.push(parseFloat(this.lstFinalCycleData[i].TOT_HOURS));
        }
        result.AVG = (Math.trunc((AvgCount / this.lstFinalCycleData.length) * 100) / 100).toString();
        result.Min = Math.min(...TotTotalHoursArray).toString();
        result.Max = Math.max(...TotTotalHoursArray).toString();
        var length = this.lstFinalCycleData.length;
        var sum = 0;
        var SumOfSqrs = 0;
        let defaultValue = 0;
        for (let cnt = 0; cnt <= TotTotalHoursArray.length - 1; cnt++) {
            sum += TotTotalHoursArray[cnt];
            SumOfSqrs += Math.pow(TotTotalHoursArray[cnt], 2);
        }
        if (TotTotalHoursArray.length == 0) {
            result.StDev = defaultValue.toString();
        }

        let topSum: number = (TotTotalHoursArray.length * SumOfSqrs) - (Math.pow(sum, 2));
        let val: number = TotTotalHoursArray.length;
        result.StDev = (Math.trunc((Math.sqrt(topSum / (val * (val - 1)))) * 100) / 100).toString();
        this.Results.push(result);
        console.log(this.lstFinalCycleData);
    }

    async onSendMailIconClick(event) {
        try {
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
            let html: string = await this.exportReportDetails('Mail');
            this.isMailDialog = false;
            let toAddr: string = '';
            let mailName: string = "";
            if (this.activeTab === "Employee Productivity") {
                mailName = "Employee Productivity Report";
            }
            else if (this.activeTab === "Receive by Employee") {
                mailName = "Productivity Receive By Employee";
            }
            else if (this.activeTab === "Deliver by Employee") {
                mailName = "Productivity Deliver By Employee";
            }
            else if (this.activeTab === "Dock Performance") {
                mailName = "Productivity Dock Performance By Employee";
            }
            else {
                mailName = "Cycle Time Report";
            }
            if (html != '' && html != null) {
                await this.commonService.sendEmail(this.deviceTokenEntry[TokenEntry_Enum.SystemId], mailName, JSON.stringify(html), this.toMailAddr, MailPriority.Normal.toString(), '')
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

    async onPrintClick(event) {
        try {
            event.stopImmediatePropagation();
            this.spinnerService.start();
            var html = await this.exportReportDetails('Print');
            let printName: string = "";
            if (this.activeTab === "Employee Productivity") {
                printName = "Employee Productivity Report";
            }
            else if (this.activeTab === "Receive by Employee") {
                printName = "Productivity Receive By Employee";
            }
            else if (this.activeTab === "Deliver by Employee") {
                printName = "Productivity Deliver By Employee";
            }
            else if (this.activeTab === "Dock Performance") {
                printName = "Productivity Dock Performance By Employee";
            }
            else {
                printName = "Cycle Time Report";
            }
            if (html != '' && html != null) {

                var mywindow = window.open('', null, 'height=650,width=650,status=no,resizable=yes, scrollbars=yes, toolbar=no,location=center,menubar=no');
                if (mywindow != null && mywindow != undefined) {

                    mywindow.document.write('<html><head><title>' + printName + '</title>');
                    mywindow.document.write('</head><body >');
                    mywindow.document.write(html);
                    mywindow.document.write('</body></html>');

                    mywindow.document.close(); // necessary for IE >= 10
                    mywindow.focus(); // necessary for IE >= 10*/

                    //mywindow.print();
                    // mywindow.close();

                    return true;

                } else {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please set allow pop-ups for this site in your browser' });
                }
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "onPrintClick");
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
            let html: string = await this.exportReportDetails('Excel');
            let excelName: string = "";
            if (this.activeTab === "Employee Productivity") {
                excelName = "Deliver_EmployeeProductivity.xls";
            }
            else if (this.activeTab === "Receive by Employee") {
                excelName = "ProductivityReceiveByEmployee.xls";
            }
            else if (this.activeTab === "Deliver by Employee") {
                excelName = "ProductivityDeliverByEmployee.xls";
            }
            else if (this.activeTab === "Dock Performance") {
                excelName = "ProductivityDockPerformanceByEmployee.xls";
            }
            else {
                excelName = "ProductivityCycleTimeReport.xls";
            }
            if (html != '' && html != null) {
                let blob = new Blob([html], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                });
                saveAs(blob, excelName);


            }
        } catch (ex) {
            this.clientErrorMsg(ex, "onExportToExcelClick");
        }
        finally {
            this.spinnerService.stop();
        }
    }


    async exportReportDetails(reqType: string) {

        if (this.activeTab === "Employee Productivity") {

            var chartImageEmpDay = document.getElementById("ChartIdEmpDay") as HTMLCanvasElement;
            var imageEmpDay = chartImageEmpDay.toDataURL("image/png");
            imageEmpDay = imageEmpDay.replace(/^data:image\/(png|jpg);base64,/, "");
            await this.commonService.saveImage(imageEmpDay, "EmpProdByDay").
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
            var chartImageAvgEmp = document.getElementById("ChartIdAvgEmpProd") as HTMLCanvasElement;
            var imageAvgEmp = chartImageAvgEmp.toDataURL("image/png");
            imageAvgEmp = imageAvgEmp.replace(/^data:image\/(png|jpg);base64,/, "");
            await this.commonService.saveImage(imageAvgEmp, "AvgEmpProd").
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
                let imgEmpDayAvgPath: string = '';

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

                let phyname;
                imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
                imgEmpDayAvgPath = this.httpService.BaseUrl + '/Uploaded/';
                let Curdate: Date = this.frmDate;
                let pint: number = 0;
                let strTitle: string = "\"" + "AtparVersion2.4.4" + "\"";
                let title: string = '""' + "AtparVersion 2.8" + '""';

                htmlBuilder += "<Table align= left width= 100 % cellpadding=0 cellspacing = 0 vAlign= top>";
                if (reqType === "Print") {
                    htmlBuilder += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>"
                    htmlBuilder += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                        "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                    htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                    htmlBuilder += "<tr><td colspan=5 align=left><b><span class=c2>Employee Productivity by Day From " + this.convertDateFormate(this.fromDate) + " To " + this.convertDateFormate(this.toDate) + " </span></b></td><td align=right valign=top>&nbsp;"
                    htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "><img src=" + imgserverPath + "print.jpg></A>"
                }
                else {
                    if (reqType === "Mail") {
                        //htmlBuilder += "<TR width='100%'><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg></td></TR>";
                        htmlBuilder += "<TR width='100%'  height='27px'><td colspan=2 align=left bgcolor='#fe9836' width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg></td><td align=left  width='85%' height='63' nowrap></td></TR>"
                    }
                    else {
                        htmlBuilder += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>";
                    }
                    htmlBuilder += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                        "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                    htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0></tr>"
                    htmlBuilder += "<tr><td colspan=5 align=left><b><span class=c2>Employee Productivity by Day From " + this.convertDateFormate(this.fromDate) + " To " + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp;";
                }
                htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
                htmlBuilder += "<table align=left width=99% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1 cellpadding=4>"
                htmlBuilder += "<tr bgcolor=#d3d3d3>"
                htmlBuilder += "<td align=center nowrap ><b><span class=c2></span></b></td>"
                let dtfromdate = this.fromDate
                let chartDatee = new Date(dtfromdate);
                let dttodate = this.toDate
                let datediff: number = Math.round((Date.parse(this.toDate.toString()) - Date.parse(this.fromDate.toString())) / (1000 * 3600 * 24));
                //let datediff = new Date(this.toDate).getDate() - new Date(this.fromDate).getDate();
                let x = 0;
                while (x <= datediff) {
                    pint += 1
                    htmlBuilder += "<td align=center nowrap colspan=2><b><span class=c2>Day " + pint.toString() + " (" + this.convertDateFormate(chartDatee.toString()) + ")</span></b></td>"
                    chartDatee = new Date(chartDatee.setDate(chartDatee.getDate() + 1));
                    x += 1;
                }
                htmlBuilder += "</tr>";
                pint = 0;
                htmlBuilder += "<tr bgcolor=#d3d3d3>"
                htmlBuilder += "<td align=center nowrap ><b><span class=c2>Employee</span></b></td>";
                let dtfromdate1 = this.fromDate
                let chartDate1 = new Date(dtfromdate1);
                let dttodate1 = this.toDate
                let datediff1: number = Math.round((Date.parse(this.toDate.toString()) - Date.parse(this.fromDate.toString())) / (1000 * 3600 * 24));
                //let datediff1 = new Date(this.toDate).getDate() - new Date(this.fromDate).getDate();
                let xy = 0;
                while (xy <= datediff1) {
                    pint += 1
                    htmlBuilder += "<td align=center nowrap ><b><span class=c2>Packages</span></b></td>"
                    htmlBuilder += "<td align=center nowrap ><b><span class=c2>Time</span></b></td>"
                    chartDate1 = new Date(chartDate1.setDate(chartDate1.getDate() + 1));
                    xy += 1;
                }

                htmlBuilder += "</tr>";
                pint = 0;
                let SelDate: String;
                let lstEmpDayList = [];

                if (this.selectedDropDownUserId.indexOf("ALL") > -1) {

                    for (let j = 0; j <= this.UserId.length - 1; j++) {

                        let UserName: String = this.UserId[j];
                        if (UserName !== "ALL") {
                            let dtfromdate2 = this.fromDate
                            let chartDate2 = new Date(dtfromdate2);
                            let dttodate2 = this.toDate
                            let datediff2: number = Math.round((Date.parse(this.toDate.toString()) - Date.parse(this.fromDate.toString())) / (1000 * 3600 * 24));
                            //let datediff2 = new Date(this.toDate).getDate() - new Date(this.fromDate).getDate();
                            let xy = 0;
                            pint = 0;
                            htmlBuilder += "<tr width='100%'>"
                            htmlBuilder += "<td align=left nowrap ><b><span class=c2>" + UserName + "</span></b></td>"
                            while (xy <= datediff2) {
                                SelDate = chartDate2.toString();
                                lstEmpDayList = asEnumerable(this.lstChartData).Where(i => i.TRANS_DATE == SelDate && i.UserId === UserName).ToArray();
                                xy += 1;
                                if (lstEmpDayList.length > 0) {
                                    htmlBuilder += "<td align=right nowrap ><span class=c2>" + lstEmpDayList[0].PACKAGE_COUNT + "</span></td>";
                                    htmlBuilder += "<td align=right nowrap ><span class=c2>" + lstEmpDayList[0].TIME + "</span></td>"
                                }
                                else {
                                    htmlBuilder += "<td align=right nowrap ><span class=c2>0</span></td>";
                                    htmlBuilder += "<td align=right nowrap ><span class=c2>0</span></td>";
                                }
                                chartDate2 = new Date(chartDate2.setDate(chartDate2.getDate() + 1));
                            }
                        }
                        htmlBuilder += "</tr>";
                    }

                }

                else {
                    for (let j = 0; j <= this.selectedDropDownUserId.length - 1; j++) {

                        let UserName: String = this.selectedDropDownUserId[j];
                        if (UserName !== "ALL") {
                            let dtfromdate2 = this.fromDate
                            let chartDate2 = new Date(dtfromdate2);
                            let dttodate2 = this.toDate
                            let datediff2: number = Math.round((Date.parse(this.toDate.toString()) - Date.parse(this.fromDate.toString())) / (1000 * 3600 * 24));
                            //let datediff2 = new Date(this.toDate).getDate() - new Date(this.fromDate).getDate();
                            let xy = 0;
                            pint = 0;
                            htmlBuilder += "<tr width='100%'>"
                            htmlBuilder += "<td align=left nowrap ><b><span class=c2>" + UserName + "</span></b></td>"
                            while (xy <= datediff2) {
                                SelDate = chartDate2.toString();
                                lstEmpDayList = asEnumerable(this.lstChartData).Where(i => i.TRANS_DATE == SelDate && i.UserId === UserName).ToArray();
                                xy += 1;
                                if (lstEmpDayList.length > 0) {
                                    htmlBuilder += "<td align=right nowrap ><span class=c2>" + lstEmpDayList[0].PACKAGE_COUNT + "</span></td>";
                                    htmlBuilder += "<td align=right nowrap ><span class=c2>" + lstEmpDayList[0].TIME + "</span></td>"
                                }
                                else {
                                    htmlBuilder += "<td align=right nowrap ><span class=c2>0</span></td>";
                                    htmlBuilder += "<td align=right nowrap ><span class=c2>0</span></td>";
                                }
                                chartDate2 = new Date(chartDate2.setDate(chartDate2.getDate() + 1));
                            }
                        }
                        htmlBuilder += "</tr>";
                    }
                }


                htmlBuilder += "<br/>";
                htmlBuilder += "<br/>";
                htmlBuilder += "</table>";
                htmlBuilder += "<div align=center>";
                htmlBuilder += "<table>";
                htmlBuilder += "<tr nowrap>";
                if (reqType === "Mail") {
                    htmlBuilder += "<td align=left colspan=" + ((pint * 2) + 1).toString() + " ><img src=" + imgEmpDayAvgPath + "EmpProdByDay.png /></td>"
                }
                else {
                    htmlBuilder += "<td align=left colspan=" + ((pint * 2) + 1).toString() + " ><img src=" + imgEmpDayAvgPath + "EmpProdByDay.png /></td>"
                }
                htmlBuilder += "</tr>";

                htmlBuilder += "</table>";
                htmlBuilder += "</div>";
                htmlBuilder += "</td></tr>";

                htmlBuilder += "<tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr>";

                htmlBuilder += "</br><tr><td colspan=5 align=left><span class=c2><b>Average Employee Productivity by Day From " + this.convertDateFormate(this.fromDate) + " To " + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp;"
                htmlBuilder += "<tr><td colspan=2> "
                htmlBuilder += "<table align=left width=99% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1 cellpadding=4>";
                htmlBuilder += "<tr>";
                htmlBuilder += "<td align=center nowrap colspan=4 ><b><span class=c2>Average Package Handled</span></b></td>";
                htmlBuilder += "</tr>";

                htmlBuilder += "<td align=center nowrap ><b><span class=c2>Employee</span></b></td>"
                htmlBuilder += "<td align=center nowrap ><b><span class=c2>Packages</span></b></td>"
                htmlBuilder += "<td align=center nowrap ><b><span class=c2>Average Time (hours)</span></b></td>"
                htmlBuilder += "<td align=center nowrap ><b><span class=c2>Max Time (Hours)</span></b></td>"


                if (this.selectedDropDownUserId.indexOf("ALL") > -1) {

                    for (let j = 0; j <= this.UserId.length - 1; j++) {

                        let UserName: String = this.UserId[j];
                        if (UserName !== "ALL") {
                            htmlBuilder += "<tr>";
                            htmlBuilder += "<td align=left nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                            let AvgPackageCount = 0;
                            let AvgTimeCount = 0;
                            let AvgMaxCount = 0;
                            let TotTotalHoursArray: number[] = new Array();
                            let lstAvgList = [];
                            lstAvgList = asEnumerable(this.lstChartData).Where(z => z.UserId == UserName).ToArray();
                            for (let k = 0; k <= lstAvgList.length - 1; k++) {
                                AvgPackageCount += lstAvgList[k].PACKAGE_COUNT;
                                AvgTimeCount += lstAvgList[k].TIME;
                                TotTotalHoursArray.push(lstAvgList[k].TIME);
                            }
                            AvgPackageCount = AvgPackageCount / lstAvgList.length;
                            AvgMaxCount = Math.max(...TotTotalHoursArray);
                            AvgTimeCount = AvgTimeCount / lstAvgList.length;
                            htmlBuilder += "<td align=right nowrap ><span class=c2>" + AvgPackageCount + "</span></td>"
                            htmlBuilder += "<td align=right nowrap ><span class=c2>" + AvgTimeCount + "</span></td>"
                            htmlBuilder += "<td align=right nowrap ><span class=c2>" + AvgMaxCount + "</span></td>"
                            htmlBuilder += "</tr>"
                            //htmlBuilder += "<tr>"
                        }

                    }

                }
                else {
                    for (let j = 0; j <= this.selectedDropDownUserId.length - 1; j++) {

                        let UserName: String = this.selectedDropDownUserId[j];
                        if (UserName !== "ALL") {
                            htmlBuilder += "<tr>";
                            htmlBuilder += "<td align=left nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                            let AvgPackageCount = 0;
                            let AvgTimeCount = 0;
                            let AvgMaxCount = 0;
                            let TotTotalHoursArray: number[] = new Array();
                            let lstAvgList = [];
                            lstAvgList = asEnumerable(this.lstChartData).Where(z => z.UserId == UserName).ToArray();
                            for (let k = 0; k <= lstAvgList.length - 1; k++) {
                                AvgPackageCount += lstAvgList[k].PACKAGE_COUNT;
                                AvgTimeCount += lstAvgList[k].TIME;
                                TotTotalHoursArray.push(lstAvgList[k].TIME);
                            }
                            AvgPackageCount = AvgPackageCount / lstAvgList.length;
                            AvgMaxCount = Math.max(...TotTotalHoursArray);
                            AvgTimeCount = AvgTimeCount / lstAvgList.length;
                            htmlBuilder += "<td align=right nowrap ><span class=c2>" + AvgPackageCount + "</span></td>"
                            htmlBuilder += "<td align=right nowrap ><span class=c2>" + AvgTimeCount + "</span></td>"
                            htmlBuilder += "<td align=right nowrap ><span class=c2>" + AvgMaxCount + "</span></td>"
                            htmlBuilder += "</tr>"
                            htmlBuilder += "<tr>"
                        }

                    }
                }



                htmlBuilder += "<tr nowrap>"
                if (reqType === "Mail") {
                    htmlBuilder += "<td align=left colspan='4' ><img src=" + imgEmpDayAvgPath + "AvgEmpProd.png /></td>";
                }
                else {
                    htmlBuilder += "<td align=left colspan='4' ><img src=" + imgEmpDayAvgPath + "AvgEmpProd.png /></td>"
                }
                htmlBuilder += "</tr>"
                htmlBuilder += "</table>"
                htmlBuilder += "</td></tr>"
                htmlBuilder += "</Table>"
                return await htmlBuilder;

            }
            catch (ex) {
                htmlBuilder = '';
                return htmlBuilder;
            }


        }

        else if (this.activeTab === "Receive by Employee") {
            if (this.blnGraph1 == true) {
                var chartImageRecv1 = document.getElementById("ChartIdForRecv1") as HTMLCanvasElement;
                var imageRecv1 = chartImageRecv1.toDataURL("image/png");
                imageRecv1 = imageRecv1.replace(/^data:image\/(png|jpg);base64,/, "");
                await this.commonService.saveImage(imageRecv1, "EmpProdRecv0").
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
            }
            if (this.blnGraph2 == true) {
                var chartImageRecv2 = document.getElementById("ChartIdForRecv2") as HTMLCanvasElement;
                var imageRecv2 = chartImageRecv2.toDataURL("image/png");
                imageRecv2 = imageRecv2.replace(/^data:image\/(png|jpg);base64,/, "");
                await this.commonService.saveImage(imageRecv2, "EmpProdRecv1").
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
            }
            if (this.blnGraph3 == true) {
                var chartImageRecv3 = document.getElementById("ChartIdForRecv3") as HTMLCanvasElement;
                var imageRecv3 = chartImageRecv3.toDataURL("image/png");
                imageRecv3 = imageRecv3.replace(/^data:image\/(png|jpg);base64,/, "");
                await this.commonService.saveImage(imageRecv3, "EmpProdRecv2").
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
            }
            if (this.blnGraph4 == true) {
                var chartImageRecv4 = document.getElementById("ChartIdForRecv4") as HTMLCanvasElement;
                var imageRecv4 = chartImageRecv4.toDataURL("image/png");
                imageRecv4 = imageRecv4.replace(/^data:image\/(png|jpg);base64,/, "");
                await this.commonService.saveImage(imageRecv4, "EmpProdRecv3").
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
            }
            if (this.blnGraph5 == true) {
                var chartImageRecv5 = document.getElementById("ChartIdForRecv5") as HTMLCanvasElement;
                var imageRecv5 = chartImageRecv5.toDataURL("image/png");
                imageRecv5 = imageRecv5.replace(/^data:image\/(png|jpg);base64,/, "");
                await this.commonService.saveImage(imageRecv5, "EmpProdRecv4").
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
            }

            var chartImageRecvSumm = document.getElementById("ChartIdForSummaryRecv") as HTMLCanvasElement;
            var imageRecvSumm = chartImageRecvSumm.toDataURL("image/png");
            imageRecvSumm = imageRecvSumm.replace(/^data:image\/(png|jpg);base64,/, "");
            await this.commonService.saveImage(imageRecvSumm, "EmpProdRecvSumm").
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
                let imgEmpDayForRecvPath: string = '';

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

                let phyname;
                imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
                imgEmpDayForRecvPath = this.httpService.BaseUrl + '/Uploaded/';
                let Curdate: Date = this.frmDate;
                let strTitle: string = "\"" + "AtparVersion2.4.4" + "\"";
                let title: string = '""' + "AtparVersion 2.8" + '""';

                htmlBuilder += "<Table align=left width=100% cellpadding=0 cellspacing = 0 vAlign=top>";

                if (reqType == "Print") {

                    htmlBuilder += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>"
                    htmlBuilder += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                        "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                    htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                    htmlBuilder += "<tr><td colspan=5 align=left><span class=c2><b>Dock Performance Report From " + this.convertDateFormate(this.fromDate) + " To " + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp;"
                    htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "><img src=" + imgserverPath + "print.jpg></A>"
                }
                else {
                    if (reqType == "Mail") {
                        htmlBuilder += "<TR width='100%'  height='27px'><td colspan=2 align=left bgcolor='#fe9836' width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg></td><td align=left  width='85%' height='63' nowrap></td></TR>"
                    }
                    else {
                        htmlBuilder += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>"
                    }
                    htmlBuilder += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                        "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                    htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                    htmlBuilder += "<tr><td align=left><span class=c2><b>Dock Receive   By Employee From " + this.convertDateFormate(this.fromDate) + " To " + this.convertDateFormate(this.toDate) + " </b></span></td><td align=right valign=top>&nbsp;"

                }
                htmlBuilder += "</td></tr></table></td></tr><br/>";
                let dtfromdate = this.fromDate
                let chartDatee = new Date(dtfromdate);
                let dttodate = this.toDate
                let datediff: number = Math.round((Date.parse(this.toDate.toString()) - Date.parse(this.fromDate.toString())) / (1000 * 3600 * 24));
                //let datediff = new Date(this.toDate).getDate() - new Date(this.fromDate).getDate();
                let x = 0;
                let pint: number = 0
                while (x <= datediff) {
                    pint += 1;
                    let SelDate: string = chartDatee.toString();
                    htmlBuilder += "<br/><tr><td colspan=2 align=left><b><span class=c2> Receiving By Employee Day - " + this.convertDateFormate(SelDate) + "</span></b></td><td align=right valign=top>&nbsp;"
                    htmlBuilder += "<tr><td colspan=2><table align=left width=99% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1 cellpadding=4>"
                    htmlBuilder += "<tr width='100%' bgcolor=#d3d3d3>"
                    htmlBuilder += "<td align=center nowrap ><b><span class=c2></span></b></td>"
                    if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                        for (let i = 0; i <= this.UserId.length - 1; i++) {
                            let UserName: string = this.UserId[i];
                            htmlBuilder += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>"
                        }
                    }
                    else {
                        for (let i = 0; i <= this.selectedDropDownUserId.length - 1; i++) {
                            let UserName: string = this.selectedDropDownUserId[i];
                            htmlBuilder += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>"
                        }
                    }
                    htmlBuilder += "<td align=Center nowrap width='100%'><b><span class=c2>Graph</span></b></td>"

                    htmlBuilder += "</tr>";

                    for (let z = 0; z <= this.lstTable1Data.length - 1; z++) {
                        htmlBuilder += "<tr width='100%'>";
                        htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstTable1Data[z].START_INTERVAL + "</span></td>";

                        if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                            for (let xy = 0; xy <= this.UserId.length - 1; xy++) {
                                let UserName: string = this.UserId[xy];
                                //htmlBuilder += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                                let dr: any = asEnumerable(this.lstTable1Data).Where(cnt => cnt.UserId == UserName && cnt.START_INTERVAL == this.lstTable1Data[z].START_INTERVAL && cnt.TRANS_DATE == this.convertDateFormate(SelDate)).ToArray();
                                if (dr.length > 0) {
                                    htmlBuilder += "<td align=right nowrap><span class=c2>" + dr[0].PACKAGE_COUNT + "</span></td>";
                                }
                                else {
                                    htmlBuilder += "<td align=right nowrap><span class=c2>" + "0" + "</span></td>";
                                }
                            }
                        }
                        else {
                            for (let xy = 0; xy <= this.selectedDropDownUserId.length - 1; xy++) {
                                let UserName: string = this.selectedDropDownUserId[xy];
                                //htmlBuilder += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                                console.log(this.lstTable1Data);
                                let dr: any = asEnumerable(this.lstTable1Data).Where(cnt => cnt.UserId == UserName && cnt.START_INTERVAL == this.lstTable1Data[z].START_INTERVAL && cnt.TRANS_DATE == this.convertDateFormate(SelDate)).ToArray();
                                if (dr.length > 0) {
                                    htmlBuilder += "<td align=right nowrap><span class=c2>" + dr[0].PACKAGE_COUNT + "</span></td>";
                                }
                                else {
                                    htmlBuilder += "<td align=right nowrap><span class=c2>" + "0" + "</span></td>";
                                }
                            }
                        }


                        if (z == 0) {
                            if (reqType == "Mail") {
                                htmlBuilder += "<td  width='100%' align='left' valign='middle' rowspan=" + this.lstTable1Data.length + "><img width='800px;' src=" + imgEmpDayForRecvPath + "EmpProdRecv" + x.toString() + ".png /></td>"

                            }

                            else {
                                htmlBuilder += "<td  colspan='12' align='left' valign='middle' rowspan=" + this.lstTable1Data.length + "> <div align='center' style='text-align:center'><img height='280' width='550' src=" + imgEmpDayForRecvPath + "EmpProdRecv" + x.toString() + ".png /></div></td>";
                            }


                        }
                        htmlBuilder += "</tr>";
                    }
                    htmlBuilder += "</table>";
                    htmlBuilder += "</td></tr>";
                    x += 1;
                    chartDatee = new Date(chartDatee.setDate(chartDatee.getDate() + 1));
                }

                htmlBuilder += "<br/><tr><td colspan=5 align=left><b><span class=c2>Dock Receiving By Employee -Summary </span></b></td><td align=right valign=top>&nbsp;"
                htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><br/><tr><td colspan=2> "
                htmlBuilder += "<table align=left width=99% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1 cellpadding=4>"
                htmlBuilder += "<tr width='100%' bgcolor=#d3d3d3>"
                htmlBuilder += "<td align=center nowrap ><b><span class=c2></span></b></td>"
                if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                    for (let summ = 0; summ <= this.UserId.length - 1; summ++) {
                        let UserName: string = this.UserId[summ];

                        htmlBuilder += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                    }
                }
                else {
                    for (let summ = 0; summ <= this.selectedDropDownUserId.length - 1; summ++) {
                        let UserName: string = this.selectedDropDownUserId[summ];

                        htmlBuilder += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                    }
                }
                htmlBuilder += "<td align=left nowrap width='100%'></td>"
                htmlBuilder += "</tr>"
                let strPckgCnt: string;
                for (let summcnt = 0; summcnt <= this.lstTable1Data.length - 1; summcnt++) {
                    htmlBuilder += "<tr width='100%'>"
                    htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstTable1Data[summcnt].START_INTERVAL + "</span></td>";

                    if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                        for (let user = 0; user <= this.UserId.length - 1; user++) {
                            let UserName: string = this.UserId[user];
                            let pckgcnt: number = 0;
                            let List: any = [];
                            List = asEnumerable(this.lstTable1Data).Where(pck => pck.UserId == UserName && pck.START_INTERVAL == this.lstTable1Data[summcnt].START_INTERVAL).ToArray();
                            for (let summPckgcnt = 0; summPckgcnt <= List.length - 1; summPckgcnt++) {
                                pckgcnt = List[summPckgcnt].PACKAGE_COUNT;
                            }

                            strPckgCnt = pckgcnt.toString();
                            if (strPckgCnt == null || strPckgCnt === "") {
                                strPckgCnt = "0";
                            }

                            htmlBuilder += "<td align=right nowrap><span class=c2>" + strPckgCnt + "</span></td>"

                        }
                    }
                    else {
                        for (let user = 0; user <= this.selectedDropDownUserId.length - 1; user++) {
                            let UserName: string = this.selectedDropDownUserId[user];
                            let pckgcnt: number = 0;
                            let List: any = [];
                            List = asEnumerable(this.lstTable1Data).Where(pck => pck.UserId == UserName && pck.START_INTERVAL == this.lstTable1Data[summcnt].START_INTERVAL).ToArray();
                            for (let summPckgcnt = 0; summPckgcnt <= List.length - 1; summPckgcnt++) {
                                pckgcnt = List[summPckgcnt].PACKAGE_COUNT;
                            }

                            strPckgCnt = pckgcnt.toString();
                            if (strPckgCnt == null || strPckgCnt === "") {
                                strPckgCnt = "0";
                            }

                            htmlBuilder += "<td align=right nowrap><span class=c2>" + strPckgCnt + "</span></td>"

                        }
                    }


                    if (summcnt == 0) {
                        if (reqType == "Mail") {
                            htmlBuilder += "<td  width='100%' align='left' valign='middle' rowspan=" + this.lstTable1Data.length + " ><img width='800px;' src=" + imgEmpDayForRecvPath + "EmpProdRecvSumm.png /></td>";

                        }
                        else {
                            htmlBuilder += "<td  colspan='12' align='left' valign='middle' rowspan=" + this.lstTable1Data.length + " ><div align='center' style='text-align:center'><img height='280' width='550' src=" + imgEmpDayForRecvPath + "EmpProdRecvSumm.png /></div></td>";

                        }



                    }
                    htmlBuilder += "</tr>";
                }
                htmlBuilder += "</table>";
                htmlBuilder += "</td></tr>";
                htmlBuilder += "</Table>";
                return await htmlBuilder;

            }
            catch (ex) {
                htmlBuilder = '';
                return htmlBuilder;
            }

        }

        else if (this.activeTab === "Deliver by Employee") {
            if (this.blnGraph1 == true) {
                var chartImageDelv1 = document.getElementById("ChartIdForDelv1") as HTMLCanvasElement;
                var imageDelv1 = chartImageDelv1.toDataURL("image/png");
                imageDelv1 = imageDelv1.replace(/^data:image\/(png|jpg);base64,/, "");
                await this.commonService.saveImage(imageDelv1, "EmpProdDelv0").
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
            }
            if (this.blnGraph2 == true) {
                var chartImageDelv2 = document.getElementById("ChartIdForDelv2") as HTMLCanvasElement;
                var imageDelv2 = chartImageDelv2.toDataURL("image/png");
                imageDelv2 = imageDelv2.replace(/^data:image\/(png|jpg);base64,/, "");
                await this.commonService.saveImage(imageDelv2, "EmpProdDelv1").
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
            }
            if (this.blnGraph3 == true) {
                var chartImageDelv3 = document.getElementById("ChartIdForDelv3") as HTMLCanvasElement;
                var imageDelv3 = chartImageDelv3.toDataURL("image/png");
                imageDelv3 = imageDelv3.replace(/^data:image\/(png|jpg);base64,/, "");
                await this.commonService.saveImage(imageDelv3, "EmpProdDelv2").
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
            }
            if (this.blnGraph4 == true) {
                var chartImageDelv4 = document.getElementById("ChartIdForDelv4") as HTMLCanvasElement;
                var imageDelv4 = chartImageDelv4.toDataURL("image/png");
                imageDelv4 = imageDelv4.replace(/^data:image\/(png|jpg);base64,/, "");
                await this.commonService.saveImage(imageDelv4, "EmpProdDelv3").
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
            }
            if (this.blnGraph5 == true) {
                var chartImageDelv5 = document.getElementById("ChartIdForDelv5") as HTMLCanvasElement;
                var imageDelv5 = chartImageDelv5.toDataURL("image/png");
                imageDelv5 = imageDelv5.replace(/^data:image\/(png|jpg);base64,/, "");
                await this.commonService.saveImage(imageDelv5, "EmpProdDelv4").
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
            }

            var chartImageDelvSumm = document.getElementById("ChartIdForSummaryDeliver") as HTMLCanvasElement;
            var imageDelvSumm = chartImageDelvSumm.toDataURL("image/png");
            imageDelvSumm = imageDelvSumm.replace(/^data:image\/(png|jpg);base64,/, "");
            await this.commonService.saveImage(imageDelvSumm, "EmpProdDelvSumm").
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
                let imgEmpDayForDelvPath: string = '';

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

                let phyname;
                imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
                imgEmpDayForDelvPath = this.httpService.BaseUrl + '/Uploaded/';
                let Curdate: Date = this.frmDate;
                let strTitle: string = "\"" + "AtparVersion2.4.4" + "\"";
                let title: string = '""' + "AtparVersion 2.8" + '""';

                htmlBuilder += "<Table align=left width=100% cellpadding=0 cellspacing = 0 vAlign=top>";

                if (reqType == "Print") {

                    htmlBuilder += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>"
                    htmlBuilder += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                        "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                    htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                    htmlBuilder += "<tr><td colspan=5 align=left><span class=c2><b>Dock Performance Report From " + this.convertDateFormate(this.fromDate) + " To " + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp;"
                    htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "><img src=" + imgserverPath + "print.jpg></A>"
                }
                else {
                    if (reqType == "Mail") {
                        htmlBuilder += "<TR width='100%'  height='27px'><td colspan=2 align=left bgcolor='#fe9836' width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg></td><td align=left  width='85%' height='63' nowrap></td></TR>"
                    }
                    else {
                        htmlBuilder += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>"
                    }
                    htmlBuilder += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                        "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                    htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                    htmlBuilder += "<tr><td align=left><span class=c2><b>Dock Receive   By Employee From " + this.convertDateFormate(this.fromDate) + " To " + this.convertDateFormate(this.toDate) + " </b></span></td><td align=right valign=top>&nbsp;"

                }
                htmlBuilder += "</td></tr></table></td></tr><br/>";
                let dtfromdate = this.fromDate
                let chartDatee = new Date(dtfromdate);
                let dttodate = this.toDate
                let datediff: number = Math.round((Date.parse(this.toDate.toString()) - Date.parse(this.fromDate.toString())) / (1000 * 3600 * 24));
                //let datediff = new Date(this.toDate).getDate() - new Date(this.fromDate).getDate();
                let x = 0;
                let pint: number = 0
                while (x <= datediff) {
                    pint += 1;
                    let SelDate: string = chartDatee.toString();
                    htmlBuilder += "<br/><tr><td colspan=2 align=left><b><span class=c2> Deliver By Employee Day - " + this.convertDateFormate(SelDate) + "</span></b></td><td align=right valign=top>&nbsp;"
                    htmlBuilder += "<tr><td colspan=2><table align=left width=99% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1 cellpadding=4>"
                    htmlBuilder += "<tr width='100%' bgcolor=#d3d3d3>"
                    htmlBuilder += "<td align=center nowrap ><b><span class=c2></span></b></td>"
                    if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                        for (let i = 0; i <= this.UserId.length - 1; i++) {
                            let UserName: string = this.UserId[i];
                            htmlBuilder += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>"
                        }
                    }
                    else {
                        for (let i = 0; i <= this.selectedDropDownUserId.length - 1; i++) {
                            let UserName: string = this.selectedDropDownUserId[i];
                            htmlBuilder += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>"
                        }
                    }
                    htmlBuilder += "<td align=Center nowrap width='100%'><b><span class=c2>Graph</span></b></td>"

                    htmlBuilder += "</tr>";

                    for (let z = 0; z <= this.lstTable1Data.length - 1; z++) {
                        htmlBuilder += "<tr width='100%'>";
                        htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstTable1Data[z].START_INTERVAL + "</span></td>";
                        if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                            for (let xy = 0; xy <= this.UserId.length - 1; xy++) {
                                let UserName: string = this.UserId[xy];
                                //htmlBuilder += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                                let dr: any = asEnumerable(this.lstTable2Data).Where(cnt => cnt.UserId == UserName && cnt.START_INTERVAL == this.lstTable1Data[z].START_INTERVAL && cnt.TRANS_DATE == this.convertDateFormate(SelDate)).ToArray();
                                if (dr.length > 0) {
                                    htmlBuilder += "<td align=right nowrap><span class=c2>" + dr[0].PACKAGE_COUNT + "</span></td>";
                                }
                                else {
                                    htmlBuilder += "<td align=right nowrap><span class=c2>" + "0" + "</span></td>";
                                }
                            }
                        }
                        else {
                            for (let xy = 0; xy <= this.selectedDropDownUserId.length - 1; xy++) {
                                let UserName: string = this.selectedDropDownUserId[xy];
                                //htmlBuilder += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                                let dr: any = asEnumerable(this.lstTable2Data).Where(cnt => cnt.UserId == UserName && cnt.START_INTERVAL == this.lstTable1Data[z].START_INTERVAL && cnt.TRANS_DATE == this.convertDateFormate(SelDate)).ToArray();
                                if (dr.length > 0) {
                                    htmlBuilder += "<td align=right nowrap><span class=c2>" + dr[0].PACKAGE_COUNT + "</span></td>";
                                }
                                else {
                                    htmlBuilder += "<td align=right nowrap><span class=c2>" + "0" + "</span></td>";
                                }
                            }
                        }



                        if (z == 0) {
                            if (reqType == "Mail") {
                                htmlBuilder += "<td  width='100%' align='left' valign='middle' rowspan=" + this.lstTable2Data.length + "><img width='800px;' src=" + imgEmpDayForDelvPath + "EmpProdDelv" + x.toString() + ".png /></td>"

                            }

                            else {
                                htmlBuilder += "<td  colspan='12' align='left' valign='middle' rowspan=" + this.lstTable2Data.length + "><div align='center' style='text-align:center'><img height='280' width='550' src=" + imgEmpDayForDelvPath + "EmpProdDelv" + x.toString() + ".png /></div></td>";
                            }


                        }
                        htmlBuilder += "</tr>";
                    }
                    htmlBuilder += "</table>";
                    htmlBuilder += "</td></tr>";
                    x += 1;
                    chartDatee = new Date(chartDatee.setDate(chartDatee.getDate() + 1));
                }

                htmlBuilder += "<br/><tr><td colspan=5 align=left><b><span class=c2>Dock Deliver By Employee -Summary </span></b></td><td align=right valign=top>&nbsp;"
                htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><br/><tr><td colspan=2> "
                htmlBuilder += "<table align=left width=99% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1 cellpadding=4>"
                htmlBuilder += "<tr width='100%' bgcolor=#d3d3d3>"
                htmlBuilder += "<td align=center nowrap ><b><span class=c2></span></b></td>"
                if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                    for (let summ = 0; summ <= this.UserId.length - 1; summ++) {
                        let UserName: string = this.UserId[summ];

                        htmlBuilder += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                    }
                }
                else {
                    for (let summ = 0; summ <= this.selectedDropDownUserId.length - 1; summ++) {
                        let UserName: string = this.selectedDropDownUserId[summ];

                        htmlBuilder += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                    }
                }
                htmlBuilder += "<td align=left nowrap width='100%'></td>"
                htmlBuilder += "</tr>"
                let strPckgCnt: string;
                for (let summcnt = 0; summcnt <= this.lstTable2Data.length - 1; summcnt++) {
                    htmlBuilder += "<tr width='100%'>"
                    htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstTable2Data[summcnt].START_INTERVAL + "</span></td>";

                    if (this.selectedDropDownUserId.indexOf("ALL") > -1) {

                        for (let user = 0; user <= this.UserId.length - 1; user++) {
                            let UserName: string = this.UserId[user];
                            let pckgcnt: number = 0;
                            let List: any = [];
                            List = asEnumerable(this.lstTable2Data).Where(pck => pck.UserId == UserName && pck.START_INTERVAL == this.lstTable2Data[summcnt].START_INTERVAL).ToArray();
                            for (let summPckgcnt = 0; summPckgcnt <= List.length - 1; summPckgcnt++) {
                                pckgcnt = List[summPckgcnt].PACKAGE_COUNT;
                            }

                            strPckgCnt = pckgcnt.toString();
                            if (strPckgCnt == null || strPckgCnt === "") {
                                strPckgCnt = "0";
                            }

                            htmlBuilder += "<td align=right nowrap><span class=c2>" + strPckgCnt + "</span></td>"

                        }
                    }
                    else {
                        for (let user = 0; user <= this.selectedDropDownUserId.length - 1; user++) {
                            let UserName: string = this.selectedDropDownUserId[user];
                            let pckgcnt: number = 0;
                            let List: any = [];
                            List = asEnumerable(this.lstTable2Data).Where(pck => pck.UserId == UserName && pck.START_INTERVAL == this.lstTable2Data[summcnt].START_INTERVAL);
                            for (let summPckgcnt = 0; summPckgcnt <= List.length - 1; summPckgcnt++) {
                                pckgcnt = List[summPckgcnt].PACKAGE_COUNT;
                            }

                            strPckgCnt = pckgcnt.toString();
                            if (strPckgCnt == null || strPckgCnt === "") {
                                strPckgCnt = "0";
                            }

                            htmlBuilder += "<td align=right nowrap><span class=c2>" + strPckgCnt + "</span></td>"

                        }
                    }


                    if (summcnt == 0) {
                        if (reqType == "Mail") {
                            htmlBuilder += "<td  width='100%' align='left' valign='middle' rowspan=" + this.lstTable2Data.length + " ><img width='800px;' src=" + imgEmpDayForDelvPath + "EmpProdDelvSumm.png /></td>";

                        }
                        else {
                            htmlBuilder += "<td colspan='12' align='left' valign='middle' rowspan=" + this.lstTable2Data.length + " ><div align='center' style='text-align:center'><img height='280' width='550' src=" + imgEmpDayForDelvPath + "EmpProdDelvSumm.png /></div></td>";

                        }



                    }
                    htmlBuilder += "</tr>";
                }
                htmlBuilder += "</table>";
                htmlBuilder += "</td></tr>";
                htmlBuilder += "</Table>";
                return await htmlBuilder;

            }
            catch (ex) {
                htmlBuilder = '';
                return htmlBuilder;
            }

        }
        else if (this.activeTab === "Dock Performance") {
            if (this.blnGraph1 == true) {
                var chartImageDock1 = document.getElementById("ChartIdForDock1") as HTMLCanvasElement;
                var imageDock1 = chartImageDock1.toDataURL("image/png");
                imageDock1 = imageDock1.replace(/^data:image\/(png|jpg);base64,/, "");
                await this.commonService.saveImage(imageDock1, "EmpProdDock0").
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
            }
            if (this.blnGraph2 == true) {
                var chartImageDock2 = document.getElementById("ChartIdForDock2") as HTMLCanvasElement;
                var imageDock2 = chartImageDock2.toDataURL("image/png");
                imageDock2 = imageDock2.replace(/^data:image\/(png|jpg);base64,/, "");
                await this.commonService.saveImage(imageDock2, "EmpProdDock1").
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
            }
            if (this.blnGraph3 == true) {
                var chartImageDock3 = document.getElementById("ChartIdForDock3") as HTMLCanvasElement;
                var imageDock3 = chartImageDock3.toDataURL("image/png");
                imageDock3 = imageDock3.replace(/^data:image\/(png|jpg);base64,/, "");
                await this.commonService.saveImage(imageDock3, "EmpProdDock2").
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
            }
            if (this.blnGraph4 == true) {
                var chartImageDock4 = document.getElementById("ChartIdForDock4") as HTMLCanvasElement;
                var imageDock4 = chartImageDock4.toDataURL("image/png");
                imageDock4 = imageDock4.replace(/^data:image\/(png|jpg);base64,/, "");
                await this.commonService.saveImage(imageDock4, "EmpProdDock3").
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
            }
            if (this.blnGraph5 == true) {
                var chartImageDock5 = document.getElementById("ChartIdForDock5") as HTMLCanvasElement;
                var imageDock5 = chartImageDock5.toDataURL("image/png");
                imageDock5 = imageDock5.replace(/^data:image\/(png|jpg);base64,/, "");
                await this.commonService.saveImage(imageDock5, "EmpProdDock4").
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
            }

            var chartImageDockSumm = document.getElementById("ChartIdForSummaryDock") as HTMLCanvasElement;
            var imageDockSumm = chartImageDockSumm.toDataURL("image/png");
            imageDockSumm = imageDockSumm.replace(/^data:image\/(png|jpg);base64,/, "");
            await this.commonService.saveImage(imageDockSumm, "EmpProdDockSumm").
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
                let imgEmpDayForDockPath: string = '';

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

                let phyname;
                imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
                imgEmpDayForDockPath = this.httpService.BaseUrl + '/Uploaded/';
                let Curdate: Date = this.frmDate;
                let strTitle: string = "\"" + "AtparVersion2.4.4" + "\"";
                let title: string = '""' + "AtparVersion 2.8" + '""';

                htmlBuilder += "<Table align=left width=100% cellpadding=0 cellspacing = 0 vAlign=top>";

                if (reqType == "Print") {

                    htmlBuilder += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>"
                    htmlBuilder += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                        "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                    htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                    htmlBuilder += "<tr><td colspan=5 align=left><span class=c2><b>Dock Performance Report From " + this.convertDateFormate(this.fromDate) + " To " + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp;"
                    htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "><img src=" + imgserverPath + "print.jpg></A>"
                }
                else {
                    if (reqType == "Mail") {
                        htmlBuilder += "<TR width='100%'  height='27px'><td colspan=2 align=left bgcolor='#fe9836' width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg></td><td align=left  width='85%' height='63' nowrap></td></TR>"
                    }
                    else {
                        htmlBuilder += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>"
                    }
                    htmlBuilder += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                        "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                    htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                    htmlBuilder += "<tr><td align=left><span class=c2><b>Dock Performance Report From " + this.convertDateFormate(this.fromDate) + " To " + this.convertDateFormate(this.toDate) + " </b></span></td><td align=right valign=top>&nbsp;"

                }
                htmlBuilder += "</td></tr></table></td></tr><br/>";
                let dtfromdate = this.fromDate
                let chartDatee = new Date(dtfromdate);
                let dttodate = this.toDate
                let datediff: number = Math.round((Date.parse(this.toDate.toString()) - Date.parse(this.fromDate.toString())) / (1000 * 3600 * 24));
                //let datediff = new Date(this.toDate).getDate() - new Date(this.fromDate).getDate();
                let x = 0;
                let pint: number = 0
                while (x <= datediff) {
                    pint += 1;
                    let SelDate: string = chartDatee.toString();
                    htmlBuilder += "<br/><tr><td colspan=2 align=left><b><span class=c2> Dock Performance By Employee Day - " + this.convertDateFormate(SelDate) + "</span></b></td><td align=right valign=top>&nbsp;"
                    htmlBuilder += "<tr><td colspan=2><table align=left width=99% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1 cellpadding=4>"
                    htmlBuilder += "<tr width='100%' bgcolor=#d3d3d3>"
                    htmlBuilder += "<td align=center nowrap ><b><span class=c2></span></b></td>"
                    if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                        for (let i = 0; i <= this.UserId.length - 1; i++) {
                            let UserName: string = this.UserId[i];
                            htmlBuilder += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>"
                        }
                    }
                    else {
                        for (let i = 0; i <= this.selectedDropDownUserId.length - 1; i++) {
                            let UserName: string = this.selectedDropDownUserId[i];
                            htmlBuilder += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>"
                        }
                    }
                    htmlBuilder += "<td align=Center nowrap width='100%'><b><span class=c2>Graph</span></b></td>"

                    htmlBuilder += "</tr>";

                    for (let z = 0; z <= this.lstTable1Data.length - 1; z++) {
                        htmlBuilder += "<tr width='100%'>";
                        htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstTable1Data[z].START_INTERVAL + "</span></td>";

                        if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                            for (let xy = 0; xy <= this.UserId.length - 1; xy++) {
                                let UserName: string = this.UserId[xy];
                                //htmlBuilder += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                                let dr: any = asEnumerable(this.lstTable1Data).Where(cnt => cnt.UserId == UserName && cnt.START_INTERVAL == this.lstTable1Data[z].START_INTERVAL && cnt.TRANS_DATE == this.convertDateFormate(SelDate)).ToArray();
                                let dr1: any = asEnumerable(this.lstTable2Data).Where(cnt => cnt.UserId == UserName && cnt.START_INTERVAL == this.lstTable1Data[z].START_INTERVAL && cnt.TRANS_DATE == this.convertDateFormate(SelDate)).ToArray();
                                let sumDock: number = 0;
                                if (dr.length > 0) {
                                    sumDock += dr[0].PACKAGE_COUNT;
                                }
                                if (dr1.length > 0) {
                                    sumDock += dr1[0].PACKAGE_COUNT;
                                }
                                htmlBuilder += "<td align=right nowrap><span class=c2>" + sumDock.toString() + "</span></td>"
                            }

                        }
                        else {
                            for (let xy = 0; xy <= this.selectedDropDownUserId.length - 1; xy++) {
                                let UserName: string = this.selectedDropDownUserId[xy];
                                //htmlBuilder += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                                let dr: any = asEnumerable(this.lstTable1Data).Where(cnt => cnt.UserId == UserName && cnt.START_INTERVAL == this.lstTable1Data[z].START_INTERVAL && cnt.TRANS_DATE == this.convertDateFormate(SelDate)).ToArray();
                                let dr1: any = asEnumerable(this.lstTable2Data).Where(cnt => cnt.UserId == UserName && cnt.START_INTERVAL == this.lstTable1Data[z].START_INTERVAL && cnt.TRANS_DATE == this.convertDateFormate(SelDate)).ToArray();
                                let sumDock: number = 0;
                                if (dr.length > 0) {
                                    sumDock += dr[0].PACKAGE_COUNT;
                                }
                                if (dr1.length > 0) {
                                    sumDock += dr1[0].PACKAGE_COUNT;
                                }
                                htmlBuilder += "<td align=right nowrap><span class=c2>" + sumDock.toString() + "</span></td>"
                            }
                        }


                        if (z == 0) {
                            if (reqType == "Mail") {
                                htmlBuilder += "<td  width='100%'  align='left' valign='middle' rowspan=" + this.lstTable2Data.length + "><img width='800px;' src=" + imgEmpDayForDockPath + "EmpProdDock" + x.toString() + ".png /></td>"

                            }

                            else {
                                htmlBuilder += "<td colspan='12'  align='left' valign='middle' rowspan=" + this.lstTable2Data.length + " ><div align='center' style='text-align:center'><img height='280' width='550' src=" + imgEmpDayForDockPath + "EmpProdDock" + x.toString() + ".png /></div></td>";
                            }


                        }
                        htmlBuilder += "</tr>";
                    }
                    htmlBuilder += "</table>";
                    htmlBuilder += "</td></tr>";
                    x += 1;
                    chartDatee = new Date(chartDatee.setDate(chartDatee.getDate() + 1));
                }

                htmlBuilder += "<br/><tr><td colspan=5 align=left><b><span class=c2>Dock Performance By Employee -Summary </span></b></td><td align=right valign=top>&nbsp;"
                htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><br/><tr><td colspan=2> "
                htmlBuilder += "<table align=left width=99% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1 cellpadding=4>"
                htmlBuilder += "<tr width='100%' bgcolor=#d3d3d3>"
                htmlBuilder += "<td align=center nowrap ><b><span class=c2></span></b></td>"
                if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                    for (let summ = 0; summ <= this.UserId.length - 1; summ++) {
                        let UserName: string = this.UserId[summ];
                        htmlBuilder += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                    }
                }
                else {
                    for (let summ = 0; summ <= this.selectedDropDownUserId.length - 1; summ++) {
                        let UserName: string = this.selectedDropDownUserId[summ];
                        htmlBuilder += "<td align=center nowrap ><b><span class=c2>" + UserName + "</span></b></td>";
                    }
                }
                htmlBuilder += "<td align=left nowrap width='100%'></td>"
                htmlBuilder += "</tr>"
                let strPckgCnt: string;
                if (this.selectedDropDownUserId.indexOf("ALL") > -1) {
                    for (let summcnt = 0; summcnt <= this.lstTable1Data.length - 1; summcnt++) {
                        htmlBuilder += "<tr width='100%'>"
                        htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstTable1Data[summcnt].START_INTERVAL + "</span></td>";
                        for (let user = 0; user <= this.UserId.length - 1; user++) {
                            let UserName: string = this.UserId[user];
                            let pckgcnt: number = 0;
                            let pckgcnt1: number = 0;
                            let List: any = [];
                            let List1: any = [];
                            List = asEnumerable(this.lstTable1Data).Where(pck => pck.UserId == UserName && pck.START_INTERVAL == this.lstTable1Data[summcnt].START_INTERVAL).ToArray();
                            List1 = asEnumerable(this.lstTable2Data).Where(pck => pck.UserId == UserName && pck.START_INTERVAL == this.lstTable2Data[summcnt].START_INTERVAL).ToArray();
                            for (let summPckgcnt = 0; summPckgcnt <= List.length - 1; summPckgcnt++) {
                                pckgcnt = List[summPckgcnt].PACKAGE_COUNT;
                            }
                            for (let summPckgcnt1 = 0; summPckgcnt1 <= List1.length - 1; summPckgcnt1++) {
                                pckgcnt1 = List1[summPckgcnt1].PACKAGE_COUNT;
                            }
                            if (pckgcnt.toString() == null || pckgcnt.toString() === "") {
                                pckgcnt = 0;
                            }
                            if (pckgcnt1.toString() == null || pckgcnt1.toString() === "") {
                                pckgcnt1 = 0;
                            }
                            let totalValue = pckgcnt + pckgcnt1;
                            strPckgCnt = totalValue.toString();
                            if (strPckgCnt == null || strPckgCnt === "") {
                                strPckgCnt = "0";
                            }

                            htmlBuilder += "<td align=right nowrap><span class=c2>" + strPckgCnt + "</span></td>"

                        }
                        if (summcnt == 0) {
                            if (reqType == "Mail") {
                                htmlBuilder += "<td  width='100%' align='left' valign='middle' rowspan=" + this.lstTable2Data.length + " ><img width='800px;' src=" + imgEmpDayForDockPath + "EmpProdDockSumm.png /></td>";

                            }
                            else {
                                htmlBuilder += "<td  colspan='12' align='left' valign='middle' rowspan=" + this.lstTable2Data.length + " ><div align='center' style='text-align:center'><img height='280' width='550' src=" + imgEmpDayForDockPath + "EmpProdDockSumm.png /></div></td>";

                            }



                        }
                        htmlBuilder += "</tr>";
                    }
                }
                else {
                    for (let summcnt = 0; summcnt <= this.lstTable1Data.length - 1; summcnt++) {
                        htmlBuilder += "<tr width='100%'>"
                        htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstTable1Data[summcnt].START_INTERVAL + "</span></td>";
                        for (let user = 0; user <= this.selectedDropDownUserId.length - 1; user++) {
                            let UserName: string = this.selectedDropDownUserId[user];
                            let pckgcnt: number = 0;
                            let pckgcnt1: number = 0;
                            let List: any = [];
                            let List1: any = [];
                            List = asEnumerable(this.lstTable1Data).Where(pck => pck.UserId == UserName && pck.START_INTERVAL == this.lstTable1Data[summcnt].START_INTERVAL).ToArray();
                            List1 = asEnumerable(this.lstTable2Data).Where(pck => pck.UserId == UserName && pck.START_INTERVAL == this.lstTable2Data[summcnt].START_INTERVAL).ToArray();
                            for (let summPckgcnt = 0; summPckgcnt <= List.length - 1; summPckgcnt++) {
                                pckgcnt = List[summPckgcnt].PACKAGE_COUNT;
                            }
                            for (let summPckgcnt1 = 0; summPckgcnt1 <= List1.length - 1; summPckgcnt1++) {
                                pckgcnt1 = List1[summPckgcnt1].PACKAGE_COUNT;
                            }
                            if (pckgcnt.toString() == null || pckgcnt.toString() === "") {
                                pckgcnt = 0;
                            }
                            if (pckgcnt1.toString() == null || pckgcnt1.toString() === "") {
                                pckgcnt1 = 0;
                            }
                            let totalValue = pckgcnt + pckgcnt1;
                            strPckgCnt = totalValue.toString();

                            if (strPckgCnt == null || strPckgCnt === "") {
                                strPckgCnt = "0";
                            }

                            htmlBuilder += "<td align=right nowrap><span class=c2>" + strPckgCnt + "</span></td>"

                        }
                        if (summcnt == 0) {
                            if (reqType == "Mail") {
                                htmlBuilder += "<td  width='100%' align='left' valign='middle' rowspan=" + this.lstTable2Data.length + " ><img width='800px;' src=" + imgEmpDayForDockPath + "EmpProdDockSumm.png /></td>";

                            }
                            else {
                                htmlBuilder += "<td  colspan='12' align='left' valign='middle' rowspan=" + this.lstTable2Data.length + " ><div align='center' style='text-align:center'><img height='280' width='550' src=" + imgEmpDayForDockPath + "EmpProdDockSumm.png /></div></td>";

                            }



                        }
                        htmlBuilder += "</tr>";
                    }
                }

                htmlBuilder += "</table>";
                htmlBuilder += "</td></tr>";

                htmlBuilder += "</Table>";
                return await htmlBuilder;

            }
            catch (ex) {
                htmlBuilder = '';
                return htmlBuilder;
            }
        }
        else {
            let htmlBuilder: string = '';
            try {
                this.statusCode = -1;
                this.growlMessage = [];
                let sbMailText: string;
                let _strFrmDt: string;
                let _strToDt: string;

                let imgserverPath: string = '';
                let imgEmpDayForDockPath: string = '';

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

                let phyname;
                imgserverPath = this.gstrProtocal + '://' + this.ipAddress + '/atpar/web/images/';
                let Curdate: Date = this.frmDate;
                let strTitle: string = "\"" + "AtparVersion2.4.4" + "\"";
                let title: string = '""' + "AtparVersion 2.8" + '""';


                htmlBuilder += "<Table align= left width= 100 % cellpadding=0 cellspacing = 0 vAlign= top>";
                if (reqType === "Print") {

                    htmlBuilder += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg title=Atpar Version 2.4.4><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>"
                    htmlBuilder += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                        "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                    htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                    htmlBuilder += "<tr><td colspan=5 align=left><b><span class=c2>Deliver cycle time report from  " + this.convertDateFormate(this.fromDate) + " To " + this.convertDateFormate(this.toDate) + " </span></b></td><td align=right valign=top>&nbsp;"
                    htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "><img src=" + imgserverPath + "print.jpg></A>"
                }
                else {
                    if (reqType === "Mail") {
                        htmlBuilder += "<TR width='100%'  height='27px'><td colspan=2 align=left bgcolor='#fe9836' width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg></td><td align=left  width='85%' height='63' nowrap></td></TR>"
                    }
                    else {
                        htmlBuilder += "<TR width='100%'><td colspan=2  align=left  width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></TR>";
                    }
                    htmlBuilder += "<TR><TD height=27 vAlign=bottom width=100% align=left colspan=2><font size=1 style=" +
                        "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                    htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0></tr>"
                    htmlBuilder += "<tr><td colspan=5 align=left><b><span class=c2>Deliver cycle time report from " + this.convertDateFormate(this.fromDate) + " To " + this.convertDateFormate(this.toDate) + "</b></span></td><td align=right valign=top>&nbsp;";
                }
                htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> ";
                htmlBuilder += "<table align=left width=40% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1 cellpadding=4>";
                htmlBuilder += "<tr bgcolor=#d3d3d3>";
                htmlBuilder += "<td align=center nowrap><b><span class=c2>Less than (hours)</span></b></td>";
                htmlBuilder += "<td align=center nowrap><b><span class=c2>Count</span></b></td>";
                htmlBuilder += "<td align=center nowrap><b><span class=c2>%</span></b></td>";
                htmlBuilder += "</tr>";

                for (let i = 0; i <= this.lstCycleHourDetails.length - 1; i++) {
                    htmlBuilder += "<tr>"
                    htmlBuilder += "<td align=right nowrap><span class=c2>" + this.lstCycleHourDetails[i].HOURSSUMMARY + "</span></td>";
                    htmlBuilder += "<td align=right nowrap><span class=c2>" + this.lstCycleHourDetails[i].COUNTSUMMARY + "</span></td>";
                    htmlBuilder += "<td align=right nowrap><span class=c2>" + this.lstCycleHourDetails[i].COUNT_PERCENTSUMMARY + "</span></td>";
                    htmlBuilder += "</tr>"
                }
                htmlBuilder += "</table></td></tr><tr><td colspan=2>"
                htmlBuilder += "<table align=left width=40% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>";
                htmlBuilder += "<tr bgcolor=#d3d3d3>"
                htmlBuilder += "<td align=center nowrap colspan=2><b><span class=c2>Results</span></b></td>"
                htmlBuilder += "</tr>"
                htmlBuilder += "<tr>"
                htmlBuilder += "<td align=center nowrap><span class=c2>COUNT</span></td>"
                htmlBuilder += "<td align=right nowrap><span class=c2>" + this.Results[0].Count + "</span></td>"
                htmlBuilder += "</tr>"
                htmlBuilder += "<tr>"
                htmlBuilder += "<td align=center nowrap><span class=c2>AVG</span></td>"
                htmlBuilder += "<td align=right nowrap><span class=c2>" + this.Results[0].AVG + "</span></td>"
                htmlBuilder += "</tr>"
                htmlBuilder += "<tr>"
                htmlBuilder += "<td align=center nowrap><span class=c2>ST.DEV</span></td>"
                htmlBuilder += "<td align=right nowrap><span class=c2>" + this.Results[0].StDev + "</span></td>"
                htmlBuilder += "</tr>"
                htmlBuilder += "<tr>"
                htmlBuilder += "<td align=center nowrap><span class=c2>MAX</span></td>"
                htmlBuilder += "<td align=right nowrap><span class=c2>" + this.Results[0].Max + "</span></td>"
                htmlBuilder += "</tr>"
                htmlBuilder += "<tr>"
                htmlBuilder += "<td align=center nowrap><span class=c2>MIN</span></td>"
                htmlBuilder += "<td align=right nowrap><span class=c2>" + this.Results[0].Min + "</span></td>"
                htmlBuilder += "</tr>"
                htmlBuilder += "</table></td></tr><tr><td colspan=2>"
                htmlBuilder += "<table align=left width=99% style=" + "" + "BORDER-COLLAPSE:collapse" + "" + " border=1>";
                htmlBuilder += "<tr bgcolor=#d3d3d3>";
                htmlBuilder += "<td align=center nowrap ><b><span class=c2>Tracking #</span></b></td>";
                htmlBuilder += "<td align=center nowrap ><b><span class=c2>Delivery Person</span></b></td>";
                htmlBuilder += "<td align=center nowrap ><b><span class=c2>Cycle Time</span></b></td>";
                htmlBuilder += "<td align=center nowrap ><b><span class=c2>Hours</span></b></td>";
                htmlBuilder += "<td align=center nowrap ><b><span class=c2>Minutes</span></b></td>";
                htmlBuilder += "<td align=center nowrap ><b><span class=c2>Seconds</span></b></td>";
                htmlBuilder += "<td align=center nowrap><b><span class=c2>Total Hours</span></b></td>";
                htmlBuilder += "</tr>";

                for (let j = 0; j <= this.lstFinalCycleData.length - 1; j++) {
                    htmlBuilder += "<tr>";
                    if (reqType === "Print") {
                        if (this.lstFinalCycleData[j].TRACKING_NBR == null || this.lstFinalCycleData[j].TRACKING_NBR === "") {
                            this.lstFinalCycleData[j].TRACKING_NBR = "";
                        }

                        htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstFinalCycleData[j].TRACKING_NBR + "</span></td>";
                    }
                    else {
                        if (this.lstFinalCycleData[j].TRACKING_NBR == null || this.lstFinalCycleData[j].TRACKING_NBR === "") {
                            this.lstFinalCycleData[j].TRACKING_NBR = "";
                        }

                        htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstFinalCycleData[j].TRACKING_NBR + "</span></td>";
                    }

                    htmlBuilder += "<td align=left nowrap><span class=c2>" + this.lstFinalCycleData[j].DELIVER_FROM + "</span></td>";
                    htmlBuilder += "<td align=right nowrap><span class=c2>" + this.lstFinalCycleData[j].CYCLE_TIME + "</span></td>";
                    htmlBuilder += "<td align=right nowrap><span class=c2>" + this.lstFinalCycleData[j].HOURS + "</span></td>";
                    htmlBuilder += "<td align=right nowrap><span class=c2>" + this.lstFinalCycleData[j].MINS + "</span></td>";
                    htmlBuilder += "<td align=right nowrap><span class=c2>" + this.lstFinalCycleData[j].SECONDS + "</span></td>";
                    htmlBuilder += "<td align=right nowrap><span class=c2>" + this.lstFinalCycleData[j].TOT_HOURS + "</span></td>";
                    htmlBuilder += "</tr>";

                }
                htmlBuilder += "</table>";
                htmlBuilder += "</td></tr>";
                htmlBuilder += "</Table>";
                return htmlBuilder;
            }
            catch (ex) {
                this.clientErrorMsg(ex, "");
            }
        }

    }

    convertDateFormate(strDate) {
        var date = new Date(strDate),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [mnth, day , date.getFullYear()].join("/");
    }

    selectedTab(option: any) {

    }

    enableSelectedTab(option: any) {
        this.tabSelection = option;
        if (option != null) {
            this.activeTab = option.title;
        }
    }

    closeMailPopup() {
        this.growlMessage = [];
    }

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }
} 