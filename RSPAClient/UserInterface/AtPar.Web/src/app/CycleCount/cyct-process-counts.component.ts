import { Component, OnDestroy, ViewChild } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { HttpService } from '../Shared/HttpService';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { TokenEntry_Enum, ClientType, YesNo_Enum, ModeEnum, BusinessType, AppParameters_Enum, MailPriority } from '../Shared/AtParEnums';
import { SelectItem, Message } from '../components/common/api';
import { StatusType, EnumApps, EventType, ElementType } from '../Shared/AtParEnums';
import { AtParConstants } from '../Shared/AtParConstants';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { DataTable } from '../components/datatable/datatable';
import { MT_ATPAR_ORG_GROUPS } from '../../app/Entities/MT_ATPAR_ORG_GROUPS';
import { MT_ATPAR_ORG_GROUP_BUNITS } from '../../app/Entities/MT_ATPAR_ORG_GROUP_BUNITS';
import { MT_CYCT_EVENT_HDR } from '../../app/Entities/MT_CYCT_EVENT_HDR';
import { ProcessCountsService } from './cyct-process-counts.service';
import { MT_ATPAR_SECURITY_AUDIT } from '../Entities/MT_ATPAR_SECURITY_AUDIT';
import { VM_UPDATE_REVIEWER_DATA } from '../entities/VM_UPDATE_REVIEWER_DATA';
import { ConfirmationService } from '../components/common/api';
import { Http, Response } from '@angular/http';
import { SSL_CONFIG_DETAILS } from '../Entities/SSL_CONFIG_DETAILS';
import { saveAs } from 'file-saver';
import { RadioButton } from '../components/radiobutton/radiobutton'
declare var module: {
    id: string;
}

@Component({
    templateUrl: 'cyct-process-counts.component.html',
    providers: [datatableservice, ProcessCountsService, AtParCommonService, ConfirmationService]
})

export class ProcessCountsComponent {
    @ViewChild(DataTable) dataTableComponent: DataTable;
    @ViewChild(RadioButton) radioButtonComponent: RadioButton;
    pageSize: number;
    deviceTokenEntry: any;
    growlMessage: Message[] = [];
    pop: boolean = false;
    usersList: any[] = [];
    ven: any;
    activateSend: boolean = false;
    loading: boolean = true;
    deviceIDStatus: number;
    descStatus: number;
    lstAuditData: MT_ATPAR_SECURITY_AUDIT[] = [];
    macAddressStatus: number;
    performManualCounts: string = "";
    reviewManualCounts: string = "";
    reviewCounts: string = "";
    lstOrgGroups: MT_ATPAR_ORG_GROUPS[] = [];
    lstBUnits: string[] = [];
    ddlOrgGroups: SelectItem[] = [];
    ddlBunit: SelectItem[] = [];
    ddlEvent: SelectItem[] = [];
    lblOrgGrpID: string = "";
    selectedOrgGrpID: string = "";
    blnShowOrgGroupLabel: boolean = false;
    blnShowOrgGroupID: boolean = false;
    selectedBUnit: string = "";
    selectedEventID: string = "";
    lstEventId: MT_CYCT_EVENT_HDR[] = [];
    startIndex: number = 0;
    EndIndex: number;
    isParentEvent: string = "";
    blnEventIsSplit: boolean = false;
    lstEventDetails: any[] = [];
    transIDCount: number = 0;
    orderHistory: string = "";
    eventDetails: any[] = [];
    lstColDetails: any[] = [];
    activeFlag: string = "true";
    ddlStatus: SelectItem[] = [];
    lstUpdateReviewerData: VM_UPDATE_REVIEWER_DATA[] = []
    selectedUserStatus: string;
    strUpdateCntDtWeb: string = '';
    strMenuCode: string;
    auditSatus: string = '';
    isSend: boolean = false;
    showDropDowns: boolean = false;
    m_strEditCounts: string = '';
    toMailAddr: string;
    isMailDialog: boolean = false;
    blnSortByColumn: boolean = false;
    preField: string = '';

    constructor(public dataservice: datatableservice,
        private spinnerService: SpinnerService,
        private atParCommonService: AtParCommonService,
        private httpService: HttpService,
        private atParConstant: AtParConstants,
        private processSevice: ProcessCountsService,
        private confirmationService: ConfirmationService) {

    }

    async  ngOnInit() {
        try {
            this.growlMessage = [];
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.pageSize = +this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
            this.strMenuCode = localStorage.getItem("menuCode");

            this.getProfileParamValue();
            await this.orgGroupParamValue(AppParameters_Enum[AppParameters_Enum.UPDATE_COUNTDATE_WEB].toString());
            await this.orgGroupParamValue(AppParameters_Enum[AppParameters_Enum.REVIEW_COUNTS].toString());
            await this.orgGroupParamValue(AppParameters_Enum[AppParameters_Enum.PERFORM_MANUAL_COUNTS].toString());
            await this.orgGroupParamValue(AppParameters_Enum[AppParameters_Enum.REVIEW_MANUAL_COUNTS].toString());
            if (this.reviewCounts == YesNo_Enum[YesNo_Enum.N.toString()] &&
                ((this.performManualCounts == YesNo_Enum[YesNo_Enum.N.toString()] && this.reviewManualCounts == YesNo_Enum[YesNo_Enum.N.toString()] ||
                    (this.performManualCounts == YesNo_Enum[YesNo_Enum.N.toString()])))) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Check Review Counts Organization Parameter" });
                this.showDropDowns = false;
                return;
            }
            else {
                this.showDropDowns = true;
                this.spinnerService.start();
                await this.bindOrgGroups();
                this.spinnerService.stop();
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    }

    async  ddlOrgGrpIdChanged() {
        this.pop = false;
        this.growlMessage = [];
        this.ddlEvent = [];
        this.ddlEvent.push({ label: "Select EventId", value: "Select EventId" });
        if (this.selectedOrgGrpID == "Select One") {
            this.ddlBunit = [];
            this.ddlBunit.push({ label: "Select BUnit", value: "Select BUnit" });
            return;
        }
        this.selectedBUnit = "Select BUnit";
        this.selectedEventID = "Select EventId"
        this.spinnerService.start();
        try {
            await this.populateBUnits();
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ddlOrgGrpIdChanged");
        }
    }

    async  ddlBUnitChanged() {
        try {
            this.growlMessage = [];
            this.pop = false;
            this.ddlEvent = [];
            this.ddlEvent.push({ label: "Select EventId", value: "Select EventId" });
            if ((this.selectedBUnit != "Select BUnit") && (this.selectedBUnit != undefined) && (this.selectedBUnit != '')) {
                await this.populateEventIds();
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ddlBUnitChanged");
        }
    }

    ddlEventChanged() {
        this.growlMessage = [];
        this.pop = false;

    }
    gridBound() {

        try {
            for (let item in this.eventDetails) {

                if (this.eventDetails[item].CONSIGNED_FLAG == YesNo_Enum[YesNo_Enum.Y.toString()]) {

                    this.eventDetails[item].rowClsStyle = 'ui-datatable-green';
                }
                else {
                    if (this.eventDetails[item].L_S_CONTROLLED == 'L' || this.eventDetails[item].L_S_CONTROLLED == 'S' ||
                        this.eventDetails[item].L_S_CONTROLLED == 'B') {
                        this.eventDetails[item].rowClsStyle = 'ui-datatable-brown';
                    }
                }

            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "gridBound");
        }
    }
    bindModelDataChange(ven) {
        this.growlMessage = [];
        try {
            if (ven.SERIAL_CONTROLLED == 'Y') {
                if (ven.activeCount > 1) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Qty cannot be greater than 1 for serial item" });
                    ven.activeCount = '';
                }
            }

        } catch (exMsg) {
            this.clientErrorMsg(exMsg, "bindModelDataChange");
        }
    }
    async go() {
        try {
            this.pop = false;
            this.growlMessage = [];
            if (this.selectedOrgGrpID == "Select One" || this.selectedOrgGrpID == undefined || this.selectedOrgGrpID == "") {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                return;
            }
            if (this.selectedBUnit == "Select BUnit" || this.selectedBUnit == undefined || this.selectedOrgGrpID == "") {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
                return;
            }
            if (this.selectedEventID == "Select EventId" || this.selectedEventID == undefined || this.selectedOrgGrpID == "") {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Event ID" });
                return;
            }
            this.spinnerService.start();
            await this.bindGrid();
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "go");
        }
    }

    async getProfileParamValue() {
        try {
            await this.atParCommonService.getProfileParamValue(this.deviceTokenEntry[TokenEntry_Enum.ProfileID], EnumApps.CycleCount, 'EDIT_COUNTS')
                .catch(this.httpService.handleError).then((result: Response) => {
                    let res = result.json() as AtParWebApiResponse<any>;
                    this.growlMessage = [];
                    switch (res.StatType) {
                        case StatusType.Success: {
                            this.m_strEditCounts = res.DataVariable.toString();
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
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getProfileParamValue");
        }
        //this.eventDetails[0].ColDetails = []; commented code need to check once
        //this.spinnerService.start();          commented code need to check once
        //await this.bindGrid();                commented code need to check once
        //this.spinnerService.stop();           commented code need to check once

    }

    async  orgGroupParamValue(orgGrpParamName: string) {
        try {
            let cycleCntAppId: number = EnumApps.CycleCount;
            this.spinnerService.start();
            await this.atParCommonService.getOrgGroupParamValue(orgGrpParamName, cycleCntAppId, this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID])
                .catch(this.httpService.handleError).then(async (res: Response) => {
                    let response = res.json() as AtParWebApiResponse<string>;
                    if (orgGrpParamName == AppParameters_Enum[AppParameters_Enum.REVIEW_COUNTS].toString()) {
                        this.reviewCounts = (response.DataVariable != null) ? response.DataVariable.toString() : "";
                    }
                    else if (orgGrpParamName == AppParameters_Enum[AppParameters_Enum.PERFORM_MANUAL_COUNTS].toString()) {
                        this.performManualCounts = (response.DataVariable != null) ? response.DataVariable.toString() : "";
                    }
                    else if (orgGrpParamName == AppParameters_Enum[AppParameters_Enum.REVIEW_MANUAL_COUNTS].toString()) {
                        this.reviewManualCounts = (response.DataVariable != null) ? response.DataVariable.toString() : "";
                    }
                    else if (orgGrpParamName == "STORE_DETAILED_COUNT_HISTORY") {
                        this.orderHistory = (response.DataVariable != null) ? response.DataVariable.toString() : "";
                    }
                    else if (orgGrpParamName.toString() == "UPDATE_COUNTDATE_WEB") {
                        this.strUpdateCntDtWeb = (response.DataVariable != null) ? response.DataVariable.toString() : "";
                    }
                    else {
                        return;
                    }
                });
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "orgGroupParamValue");
        }
    }

    async bindOrgGroups() {
        try {
            this.ddlBunit.push({ label: "Select BUnit", value: "Select BUnit" });
            this.ddlEvent.push({ label: "Select EventId", value: "Select EventId" });
            await this.atParCommonService.getUserOrgGroups(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).
                catch(this.httpService.handleError).then(async (res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.lstOrgGroups = data.DataList;
                            this.spinnerService.stop();
                            if (this.lstOrgGroups.length == 1) {
                                this.blnShowOrgGroupLabel = true;
                                this.lblOrgGrpID = this.lstOrgGroups[0].ORG_GROUP_ID + " - " + this.lstOrgGroups[0].ORG_GROUP_NAME;
                                this.selectedOrgGrpID = this.lstOrgGroups[0].ORG_GROUP_ID;
                                await this.populateBUnits();
                                break;
                            }
                            else if (this.lstOrgGroups.length > 1) {
                                this.blnShowOrgGroupID = true;
                                this.ddlOrgGroups = [];
                                this.ddlOrgGroups.push({ label: "Select One", value: "Select One" })
                                for (var i = 0; i < this.lstOrgGroups.length; i++) {
                                    if (this.lstOrgGroups[i].ORG_GROUP_ID !== "All") {
                                        this.ddlOrgGroups.push({ label: this.lstOrgGroups[i].ORG_GROUP_ID + " - " + this.lstOrgGroups[i].ORG_GROUP_NAME, value: this.lstOrgGroups[i].ORG_GROUP_ID })
                                    }
                                }
                                this.selectedOrgGrpID = this.ddlOrgGroups[0].value;
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindOrgGroups");
        }
    }

    async populateBUnits() {
        let isOrgBUnitsExist: boolean = false;
        this.spinnerService.start();

        if ((this.selectedOrgGrpID == "Select One") && this.blnShowOrgGroupID) {
            this.growlMessage = [];
            this.spinnerService.stop();
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
            return;
        }
        try {
            this.ddlBunit = [];
            this.ddlBunit.push({ label: "Select BUnit", value: "Select BUnit" });
            await this.atParCommonService.getOrgBusinessUnits(this.selectedOrgGrpID, BusinessType.Inventory).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<string>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.spinnerService.stop();
                            this.lstBUnits = data.DataList;
                            for (var item in this.lstBUnits) {
                                this.ddlBunit.push({ label: this.lstBUnits[item], value: this.lstBUnits[item] });
                            }
                            this.selectedBUnit = this.ddlBunit[0].value;
                            isOrgBUnitsExist = true;
                            break;
                        }
                        case StatusType.Warn: {
                            this.pop = false;
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            this.ddlEvent = [];
                            this.ddlEvent.push({ label: "Select EventId", value: "Select EventId" });
                            break;
                        }
                        case StatusType.Error: {
                            this.pop = false;
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            break;
                        }
                        case StatusType.Custom: {
                            this.pop = false;
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            break;
                        }
                    }
                });
            return Promise.resolve(isOrgBUnitsExist);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "populateBUnits");
        }
    }

    async  bindGrid(/*intTransIDCount, true, , Session("PageNo") * ddlNoOfRec.SelectedValue*/) {
        this.usersList = [];
        this.ddlStatus = [];
        this.ddlStatus.push({ label: "Downloaded", value: "1" });
        this.ddlStatus.push({ label: "Counting", value: "4" });
        this.ddlStatus.push({ label: "Completed", value: "7" });
        this.ddlStatus.push({ label: "Cancelled", value: "13" });
        try {
            await this.getProfileParamValue();
            if (this.selectedEventID == "Select EventId" || this.selectedEventID == undefined || this.selectedOrgGrpID == "") {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Event ID" });
                return;
            }
            if (this.selectedBUnit != "Select BUnit" && this.selectedEventID != "Select EventId") {
                await this.getCount();
                await this.getEventDetails();
                if (this.lstEventDetails["EVENT_DETAILS"].length == 0) {
                    this.pop = false;
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                    return;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindGrid");
        }
    }

    userCount(col, col1): string {
        try {
            let val: string = "";
            let userIndex = this.usersList.findIndex(a => a.header == col1.header);
            let ColName: string;
            ColName = "COUNT" + userIndex;           
            val = col[ColName];
            return val;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "userCount");
        }
    }

    async getCount() {
        try {
            await this.processSevice.CheckIfEventIsParentEvent(this.selectedBUnit, this.selectedEventID, this.deviceTokenEntry[TokenEntry_Enum.UserID])
                .catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_CYCT_EVENT_HDR>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.isParentEvent = data.DataVariable.toString();
                            if (this.isParentEvent == "true") {
                                this.activateSend = true;
                            }
                            else {
                                this.activateSend = false;
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.pop = false;
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.pop = false;
                            break;
                        }
                        case StatusType.Custom: {
                            this.pop = false;
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getCount");
        }
    }

    async getEventDetails() {
        try {

            await this.processSevice.getEventDetails(this.selectedEventID, this.selectedBUnit, this.deviceTokenEntry[TokenEntry_Enum.UserID])
                .catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<any>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.spinnerService.stop();
                            this.lstEventDetails = [];
                            this.eventDetails = [];
                            this.usersList = [];
                            let lstData = data.DataDictionary["EVENT_SPLIT_DETAILS"];
                            if (lstData[0].ISSPLITTED.toString() > 0) {
                                this.blnEventIsSplit = true;
                            }
                            else {
                                this.blnEventIsSplit = false;
                            }
                            this.lstEventDetails = data.DataDictionary;
                            if (data.DataDictionary["EVENT_DETAILS"].length > 0) {
                                this.eventDetails = data.DataDictionary["EVENT_DETAILS"];
                                if (this.lstEventDetails["EVENT_TRANSACTIONS"].length > 0) {
                                    for (let cnt in this.lstEventDetails["EVENT_TRANSACTIONS"]) {
                                        if (this.lstEventDetails["EVENT_TRANSACTIONS"][cnt].COMPLETED_DATE != null && this.lstEventDetails["EVENT_TRANSACTIONS"][cnt].COMPLETED_DATE != '') {
                                            var dateStr = new Date(this.lstEventDetails["EVENT_TRANSACTIONS"][cnt].COMPLETED_DATE).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                                        }
                                        this.usersList.push({
                                            header:
                                            this.lstEventDetails["EVENT_TRANSACTIONS"][cnt].EVENTUSERS,
                                            completedDate: this.lstEventDetails["EVENT_TRANSACTIONS"][cnt].COMPLETED_DATE != null ? dateStr.replace(',', '') : "",
                                            userstatus: this.lstEventDetails["EVENT_TRANSACTIONS"][cnt].EVENT_STATUS,
                                            previousStatus: this.lstEventDetails["EVENT_TRANSACTIONS"][cnt].EVENT_STATUS,
                                            USER_ID: this.lstEventDetails["EVENT_TRANSACTIONS"][cnt].USER_ID,
                                            TRANSACTION_ID: this.lstEventDetails["EVENT_TRANSACTIONS"][cnt].TRANSACTION_ID,
                                        });
                                    }
                                }
                                let iscalled: boolean = false;
                                let LtCnt: any = 0
                                
                                let checkedUser: string = "";
                                for (let intCnt = 0; intCnt <= this.eventDetails.length - 1; intCnt++) {
                                    iscalled = false;
                                    LtCnt = 0
                                    checkedUser = "";
                                    this.eventDetails[intCnt].DESCRIPTION = (this.eventDetails[intCnt].DESCRIPTION != null) ? this.eventDetails[intCnt].DESCRIPTION : ''
                                    this.eventDetails[intCnt].INV_ITEM_ID1 = this.eventDetails[intCnt].INV_ITEM_ID + " " + this.eventDetails[intCnt].DESCRIPTION;
                                    this.eventDetails[intCnt]["checkedUser"] = "";
                                    this.eventDetails[intCnt]["previousCount"] = "";
                                    this.eventDetails[intCnt]["rowUpdated"] = "N";
                                    this.eventDetails[intCnt]["CountDate"] = "";
                                    this.eventDetails[intCnt]["TransID"] = "";
                                    this.eventDetails[intCnt]["FinalCount"] = '';
                                    this.eventDetails[intCnt]["User_TransID"] = '';
                                    this.eventDetails[intCnt].COUNT_DIFF = (this.eventDetails[intCnt].COUNT_DIFF == '-9999') ? '' : this.eventDetails[intCnt].COUNT_DIFF;
                                    this.eventDetails[intCnt].COUNT_DIFFS = this.eventDetails[intCnt].COUNT_DIFF;
                                    this.eventDetails[intCnt].COUNT_DIFF_PER = (this.eventDetails[intCnt].COUNT_DIFF_PER == '-9999') ? '' : this.eventDetails[intCnt].COUNT_DIFF_PER;
                                    this.eventDetails[intCnt].COUNT_DIFF_PERS = this.eventDetails[intCnt].COUNT_DIFF_PER;
                                    this.eventDetails[intCnt].VALUE_DIFF = (this.eventDetails[intCnt].VALUE_DIFF == '-9999') ? '' : this.eventDetails[intCnt].VALUE_DIFF;
                                    this.eventDetails[intCnt].VALUE_DIFFS = this.eventDetails[intCnt].VALUE_DIFF
                                    this.eventDetails[intCnt].EXT_VALUE = (this.eventDetails[intCnt].EXT_VALUE == '-9999') ? '' : this.eventDetails[intCnt].EXT_VALUE;
                                    this.eventDetails[intCnt].EXT_VALUES = this.eventDetails[intCnt].EXT_VALUE;
                                    for (let Cnt = 0; Cnt <= this.usersList.length - 1; Cnt++) {
                                        let ColName = "COUNT_" + Cnt;
                                        let ColName1 = "activeFlag_" + Cnt;
                                        let _strCount: any;
                                        let arrCount: any[] = this.eventDetails[intCnt]["COUNT" + Cnt].toString().split(",");

                                        this.eventDetails[intCnt][ColName] = arrCount[0];
                                        _strCount = arrCount[0];
                                        if (arrCount[5] == 'Y') {
                                            iscalled = false;
                                        }
                                        if (_strCount == "N") {
                                            iscalled = true;
                                            if ((this.eventDetails[intCnt].EVENT_TYPE != null || this.eventDetails[intCnt].EVENT_TYPE != '')
                                                && parseInt(this.eventDetails[intCnt].EVENT_TYPE) == EventType.Manual
                                                && (this.eventDetails[intCnt].UNIT_OF_MEASURE.toString().toUpperCase() != this.eventDetails[intCnt].STD_PACK_UOM.toString().toUpperCase())) {
                                                this.eventDetails[intCnt].SYS_QTY1 = this.eventDetails[intCnt].SYS_QTY + " " + this.eventDetails[intCnt].STD_PACK_UOM;
                                            }
                                            else if (this.eventDetails[intCnt].UNIT_OF_MEASURE.toString().toUpperCase() == this.eventDetails[intCnt].STD_PACK_UOM.toString().toUpperCase())
                                                this.eventDetails[intCnt].SYS_QTY1 = this.eventDetails[intCnt].SYS_QTY + " " + this.eventDetails[intCnt].UNIT_OF_MEASURE;
                                            else
                                                this.eventDetails[intCnt].SYS_QTY1 = this.eventDetails[intCnt].SYS_QTY + " " + this.eventDetails[intCnt].UNIT_OF_MEASURE + " " + this.eventDetails[intCnt].STD_PACK_UOM;
                                        }
                                        else {
                                            if (!iscalled) {
                                                if ((this.eventDetails[intCnt].EVENT_TYPE != null || this.eventDetails[intCnt].EVENT_TYPE != '')
                                                    && parseInt(this.eventDetails[intCnt].EVENT_TYPE) == EventType.Manual
                                                    && (this.eventDetails[intCnt].UNIT_OF_MEASURE.toString().toUpperCase() != this.eventDetails[intCnt].STD_PACK_UOM.toString().toUpperCase())) {
                                                    if ((_strCount != null && _strCount != '') && this.eventDetails[intCnt].CONVERSION_RATE != '' && this.eventDetails[intCnt].CONVERSION_RATE != undefined) {
                                                        _strCount = (parseFloat(_strCount) * parseFloat(this.eventDetails[intCnt].CONVERSION_RATE)).toString();
                                                        this.eventDetails[intCnt].SYS_QTY1 = this.eventDetails[intCnt].SYS_QTY + " " + this.eventDetails[intCnt].STD_PACK_UOM;
                                                    }
                                                }
                                                else if (this.eventDetails[intCnt].UNIT_OF_MEASURE.toString().toUpperCase() == this.eventDetails[intCnt].STD_PACK_UOM.toString().toUpper)
                                                    this.eventDetails[intCnt].SYS_QTY1 = this.eventDetails[intCnt].SYS_QTY + " " + this.eventDetails[intCnt].UNIT_OF_MEASURE;

                                                else
                                                    this.eventDetails[intCnt].SYS_QTY1 = this.eventDetails[intCnt].SYS_QTY + " " + this.eventDetails[intCnt].UNIT_OF_MEASURE;
                                            }
                                            if (arrCount[5] == 'Y') {
                                                LtCnt = arrCount[0];
                                            }
                                            if (arrCount[5] == "Y") {
                                                this.eventDetails[intCnt].SELECTEDITEM = intCnt.toString() + Cnt.toString();
                                                this.eventDetails[intCnt]["FinalCount"] = arrCount[0];
                                                this.eventDetails[intCnt][ColName1] = true;
                                                this.eventDetails[intCnt]["R"+intCnt+'' + Cnt] = intCnt +''+Cnt;
                                                this.eventDetails[intCnt]["showSelectedCount"] = true;
                                                this.eventDetails[intCnt]["activeFlag"] = "true";
                                                this.eventDetails[intCnt]["User_TransID"] = arrCount[3];
                                                if (_strCount == null || _strCount == '' || _strCount == undefined) {
                                                    _strCount = "0";
                                                }
                                                if ((parseFloat(_strCount) - parseFloat(this.eventDetails[intCnt].LATEST_SYSQTY)) < 0) {
                                                    this.eventDetails[intCnt].COUNT_DIFFS = Math.abs(parseFloat(_strCount) - parseFloat(this.eventDetails[intCnt].LATEST_SYSQTY)).toFixed(2);
                                                    this.eventDetails[intCnt].COUNT_DIFF = "(" + parseFloat(Math.abs(parseFloat(_strCount) - parseFloat(this.eventDetails[intCnt].LATEST_SYSQTY)).toFixed(2)).toLocaleString('en') + ")";
                                                } else {
                                                    this.eventDetails[intCnt].COUNT_DIFFS = parseFloat((parseFloat(_strCount) - parseFloat(this.eventDetails[intCnt].LATEST_SYSQTY)).toFixed(2));
                                                    this.eventDetails[intCnt].COUNT_DIFF = parseFloat((parseFloat(_strCount) - parseFloat(this.eventDetails[intCnt].LATEST_SYSQTY)).toFixed(2)).toLocaleString('en');
                                                }
                                                this.eventDetails[intCnt].COUNT_DIFF_PER = (((parseFloat(_strCount) - parseFloat(this.eventDetails[intCnt].LATEST_SYSQTY)) / parseFloat(this.eventDetails[intCnt].LATEST_SYSQTY)) * 100);
                                                this.eventDetails[intCnt].COUNT_DIFF_PERS = (((parseFloat(_strCount) - parseFloat(this.eventDetails[intCnt].LATEST_SYSQTY)) / parseFloat(this.eventDetails[intCnt].LATEST_SYSQTY)) * 100);
                                                if (this.eventDetails[intCnt].LATEST_SYSQTY == 0) {
                                                    this.eventDetails[intCnt].COUNT_DIFF_PER = this.addZeroes(this.eventDetails[intCnt].LATEST_SYSQTY)
                                                    this.eventDetails[intCnt].COUNT_DIFF_PERS = this.addZeroes(this.eventDetails[intCnt].LATEST_SYSQTY);
                                                }
                                                else {
                                                    if (parseFloat(this.eventDetails[intCnt].COUNT_DIFF_PER) < 0) {
                                                        this.eventDetails[intCnt].COUNT_DIFF_PERS = (Math.abs(parseFloat(this.eventDetails[intCnt].COUNT_DIFF_PER))).toFixed(2);
                                                        this.eventDetails[intCnt].COUNT_DIFF_PER = "(" + (Math.abs(parseFloat(this.eventDetails[intCnt].COUNT_DIFF_PER))).toFixed(2) + ")";
                                                    } else {
                                                        this.eventDetails[intCnt].COUNT_DIFF_PER = this.addZeroes(this.eventDetails[intCnt].COUNT_DIFF_PER);
                                                        this.eventDetails[intCnt].COUNT_DIFF_PERS = this.addZeroes(this.eventDetails[intCnt].COUNT_DIFF_PER);//sorting purpose
                                                    }
                                                }
                                                if ((parseFloat(_strCount) - parseFloat(this.eventDetails[intCnt].LATEST_SYSQTY)) < 0) {
                                                    this.eventDetails[intCnt].VALUE_DIFFS = parseFloat((parseFloat((Math.abs(parseFloat(_strCount) - parseFloat(this.eventDetails[intCnt].LATEST_SYSQTY))).toString()) * (this.eventDetails[intCnt].ITEM_PRICE)).toFixed(2));
                                                    this.eventDetails[intCnt].VALUE_DIFF = "(" + parseFloat((parseFloat((Math.abs(parseFloat(_strCount) - parseFloat(this.eventDetails[intCnt].LATEST_SYSQTY))).toString()) * (this.eventDetails[intCnt].ITEM_PRICE)).toFixed(2)).toLocaleString('en') + ")";
                                                    if (this.eventDetails[intCnt].VALUE_DIFFS == 0) {
                                                        this.eventDetails[intCnt].VALUE_DIFF = "(" + parseFloat("0.0").toFixed(2) + ")";
                                                        this.eventDetails[intCnt].VALUE_DIFFS = parseFloat("0.0").toFixed(2);
                                                    }
                                                } else {
                                                    this.eventDetails[intCnt].VALUE_DIFF = parseFloat(((parseFloat(_strCount) - parseFloat(this.eventDetails[intCnt].LATEST_SYSQTY)) * (this.eventDetails[intCnt].ITEM_PRICE)).toFixed(2)).toLocaleString('en');
                                                    this.eventDetails[intCnt].VALUE_DIFFS = parseFloat(((parseFloat(_strCount) - parseFloat(this.eventDetails[intCnt].LATEST_SYSQTY)) * (this.eventDetails[intCnt].ITEM_PRICE)).toFixed(2));
                                                }
                                                this.eventDetails[intCnt].EXT_VALUES = parseFloat((_strCount * (this.eventDetails[intCnt].ITEM_PRICE)).toFixed(2));
                                                this.eventDetails[intCnt].EXT_VALUE = parseFloat((_strCount * (this.eventDetails[intCnt].ITEM_PRICE)).toFixed(2)).toLocaleString('en');
                                                this.eventDetails[intCnt]["rowUpdated"] = "Y";
                                                this.eventDetails[intCnt]["CountDate"] = arrCount[4];
                                               
                                            }
                                            else {
                                                this.eventDetails[intCnt][ColName1] = false;
                                                this.eventDetails[intCnt]["R" + intCnt + '' + Cnt] = intCnt + '' + Cnt;
                                                // this.eventDetails[intCnt]["activeFlag"] = "false";                                                
                                            }
                                            
                                            this.eventDetails[intCnt]["previousCount"] = arrCount[0];
                                            this.eventDetails[intCnt]["checkedUser"] = arrCount[2];
                                            this.eventDetails[intCnt]["TransID"] = arrCount[3];
                                            this.eventDetails[intCnt].ITEM_REC_NUM = (this.eventDetails[intCnt].ITEM_REC_NUM == '' || this.eventDetails[intCnt].ITEM_REC_NUM == undefined) ? arrCount[1] : this.eventDetails[intCnt].ITEM_REC_NUM;
                                        }
                                        this.eventDetails[intCnt]["rowIndex"] = intCnt.toString();
                                        this.eventDetails[intCnt]["activeCount"] = /*(LtCnt == 0) ? '' : */ LtCnt;
                                        
                                        
                                    }
                                }
                                this.gridBound();
                                this.pop = true;
                            }
                            else {
                                this.pop = false;
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.pop = false;
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.pop = false;
                            break;
                        }
                        case StatusType.Custom: {
                            this.pop = false;
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getEventDetails");
        }
    }

    populateEventIds() {
        this.growlMessage = [];
        try {
            this.spinnerService.start();
            this.atParCommonService.getEventIds(this.selectedBUnit, this.deviceTokenEntry[TokenEntry_Enum.UserID])
                .catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_CYCT_EVENT_HDR>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.ddlEvent = [];
                            this.spinnerService.stop();
                            this.lstEventId = data.DataList;
                            this.ddlEvent.push({ label: "Select EventId", value: "Select EventId" });
                            if (data.DataList.length > 0) {
                                if (this.performManualCounts != "" && this.performManualCounts != undefined) {
                                    if (this.reviewCounts == YesNo_Enum[YesNo_Enum.Y] && this.performManualCounts == YesNo_Enum[YesNo_Enum.Y] && this.reviewManualCounts == YesNo_Enum[YesNo_Enum.Y]) {
                                        for (var item in this.lstEventId) {
                                            this.ddlEvent.push({ label: this.lstEventId[item].EVENT_ID, value: this.lstEventId[item].EVENT_ID });
                                        }
                                    }
                                    else {
                                        let drEvents = new Array<MT_CYCT_EVENT_HDR>();
                                        if (this.reviewCounts == YesNo_Enum[YesNo_Enum.Y].toString() &&
                                            (this.performManualCounts == YesNo_Enum[YesNo_Enum.Y].toString() && this.reviewManualCounts == YesNo_Enum[YesNo_Enum.N].toString())
                                            || (this.performManualCounts == YesNo_Enum[YesNo_Enum.N].toString())) {
                                            drEvents = this.lstEventId.filter(a => a.EVENT_TYPE == EventType.Regular);
                                        }
                                        else if (this.reviewCounts == YesNo_Enum[YesNo_Enum.N].toString() &&
                                            (this.performManualCounts == YesNo_Enum[YesNo_Enum.Y].toString() && this.reviewManualCounts == YesNo_Enum[YesNo_Enum.Y].toString())) {
                                            drEvents = this.lstEventId.filter(a => a.EVENT_TYPE == EventType.Manual);
                                        }
                                        if (drEvents.length > 0) {
                                            for (var item in drEvents) {
                                                this.ddlEvent.push({ label: drEvents[item].EVENT_ID, value: drEvents[item].EVENT_ID });
                                            }
                                        }
                                        else {
                                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                                            return;
                                        }
                                    }
                                }
                                else {
                                    for (var item in this.lstEventId) {
                                        this.ddlEvent.push({ label: this.lstEventId[item].EVENT_ID, value: this.lstEventId[item].EVENT_ID });
                                    }
                                }
                            }
                            this.selectedEventID = this.ddlEvent[0].value;
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.pop = false;
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            this.ddlEvent = [];
                            this.ddlEvent.push({ label: "Select EventId", value: "Select EventId" });
                            break;
                        }
                        case StatusType.Error: {
                            this.pop = false;
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.pop = false;
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "populateEventIds");
        }
    }

    async SaveData() {
        this.growlMessage = [];
        this.spinnerService.start();
        this.lstUpdateReviewerData = [];
        this.lstAuditData = [];
        this.startIndex = + sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
        let saveStatusCode: number = 0;
        if (this.selectedOrgGrpID == "Select One" || this.selectedOrgGrpID == undefined || this.selectedOrgGrpID == "") {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
            return;
        }
        if (this.selectedBUnit == "Select BUnit" || this.selectedBUnit == undefined || this.selectedOrgGrpID == "") {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
            return;
        }
        if (this.selectedEventID == "Select EventId" || this.selectedEventID == undefined || this.selectedOrgGrpID == "") {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Event ID" });
            return;
        }
        try {
            await this.orgGroupParamValue("STORE_DETAILED_COUNT_HISTORY");
            this.spinnerService.start();
            var lstIssueOrqQty = await this.eventDetails.filter(a => a.rowUpdated == 'Y');

            if (lstIssueOrqQty.length > 0) {
                for (let cnt = 0; cnt <= lstIssueOrqQty.length - 1; cnt++) {
                    if (lstIssueOrqQty[cnt].activeCount != '' && lstIssueOrqQty[cnt].activeCount != null) {
                        var strCount = lstIssueOrqQty[cnt].activeCount;
                        var strItemRecNum = lstIssueOrqQty[cnt].ITEM_REC_NUM;
                        var strCountUser = lstIssueOrqQty[cnt].checkedUser;
                        var strTransID = lstIssueOrqQty[cnt].User_TransID;
                        var strCountDate = lstIssueOrqQty[cnt].CountDate;
                        var strPrevCount = lstIssueOrqQty[cnt].previousCount;
                        var strItemID = lstIssueOrqQty[cnt].INV_ITEM_ID;
                        var strCount1 = lstIssueOrqQty[cnt].COUNT_QTY1;
                        var strCount2 = lstIssueOrqQty[cnt].COUNT_QTY2;
                        var _dblConvertRate: any;
                        var strIssueQty: any;
                        var strOrderQty: any;

                        if (strCount1 == null || strCount1 == '')
                            strCount1 = 0;

                        if (strCount2 == null || strCount2 == '')
                            strCount2 = 0
                        if (strCount.toString() != strPrevCount.toString()) {
                            var audit = new MT_ATPAR_SECURITY_AUDIT();
                            audit.OLD_VALUE = strPrevCount;
                            audit.NEW_VALUE = strCount;
                            audit.KEY_2 = this.selectedBUnit;
                            audit.KEY_3 = this.selectedEventID;
                            audit.KEY_4 = strCount;
                            audit.KEY_5 = '';
                            audit.FIELD_NAME = "REVIEWER_COUNT";
                            this.lstAuditData.push(audit);

                            if (strCount1 == 0 && strCount2 == 0) {
                                strIssueQty = strCount.ToString;
                                strOrderQty = 0;
                            } else if (strCount1 == 0) {
                                _dblConvertRate = (strPrevCount.ToString - strCount1) / strCount2;
                                strIssueQty = (strCount % _dblConvertRate);
                                strOrderQty = (strCount / _dblConvertRate);
                            } else if (strCount2 == 0) {
                                strIssueQty = strCount;
                                strOrderQty = 0;
                            } else {
                                _dblConvertRate = (strPrevCount - strCount1) / strCount2;
                                strIssueQty = (strCount.ToString % _dblConvertRate);
                                strOrderQty = (strCount.ToString / _dblConvertRate);
                            }
                        } else {
                            strIssueQty = strCount1;
                            strOrderQty = strCount2;
                        }
                        let updateReviewerData = new VM_UPDATE_REVIEWER_DATA();
                        updateReviewerData.REVIEWERCNT = strCount
                        updateReviewerData.ISSUECNT = strIssueQty
                        updateReviewerData.ORDERCNT = strOrderQty

                        if (strCount != strCountUser)
                            updateReviewerData.UPDATEUSER = this.deviceTokenEntry[TokenEntry_Enum.UserID];
                        else
                            updateReviewerData.UPDATEUSER = strCountUser

                        updateReviewerData.ITEMRECNUM = strItemRecNum
                        updateReviewerData.TRANSID = strTransID
                        updateReviewerData.UPDATEDT = strCountDate
                        updateReviewerData.UPDATECNTDTWEB = this.strUpdateCntDtWeb;
                        updateReviewerData.INVITEMID = strItemID
                        this.lstUpdateReviewerData.push(updateReviewerData)

                        strIssueQty = '';
                        strOrderQty = '';
                        strCount1 = '';
                        strCount2 = '';
                    }
                }
            }
            let blnFlag: boolean = false;
            if (this.lstUpdateReviewerData.length > 0) {
                await this.processSevice.updateReviewer(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.lstUpdateReviewerData, this.selectedEventID, this.selectedBUnit)
                    .catch(this.httpService.handleError).then(async (res: Response) => {
                        let data = res.json() as AtParWebApiResponse<string>;
                        this.growlMessage = [];
                        switch (data.StatType) {
                            case StatusType.Success: {
                                this.spinnerService.stop();
                                saveStatusCode = data.StatusCode;
                                if (saveStatusCode != AtparStatusCodes.ATPAR_OK) {
                                    return saveStatusCode;
                                }
                                break;
                            }
                            case StatusType.Warn: {
                                this.pop = false;
                                saveStatusCode = data.StatusCode;
                                this.spinnerService.stop();
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                this.ddlEvent = [];
                                this.ddlEvent.push({ label: "Select EventId", value: "Select EventId" });
                                break;
                            }
                            case StatusType.Error: {
                                this.pop = false;
                                saveStatusCode = data.StatusCode;
                                this.spinnerService.stop();
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                break;
                            }
                            case StatusType.Custom: {
                                this.pop = false;
                                saveStatusCode = data.StatusCode;
                                this.spinnerService.stop();
                                this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                break;
                            }
                        }
                    });
            }
            this.spinnerService.start();
            await this.processSevice.updateHdrDetails(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.selectedBUnit, this.selectedEventID)
                .catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<string>;
                    if (data.StatusCode != AtparStatusCodes.ATPAR_OK) {
                        return data.StatusCode;
                    }
                });
            saveStatusCode = await this.checkAuditAllowed();
            if (saveStatusCode != AtparStatusCodes.ATPAR_OK) {
                return saveStatusCode;
            }
            if (this.auditSatus == 'Y') {
                saveStatusCode = <number><Number>await this.insertAuditData(this.lstAuditData);
            }
            this.spinnerService.start();
            if (saveStatusCode != AtparStatusCodes.ATPAR_OK) {
                this.spinnerService.stop();
                return saveStatusCode;
            }
            if (await this.usersList.length > 0) {
                let finalUserList = [];
                let finalCount = this.eventDetails.filter(x => x.activeCount != '' && x.activeCount != null);
                let usersListStatus = this.usersList.filter(a => a.previousStatus != a.userstatus);               
                if (usersListStatus.length > 0) {
                    for (let intCnt = 0; intCnt <= usersListStatus.length - 1; intCnt++) {
                        let strStatus: string = '';
                        let strTransStatus: string = '';
                        let strTransId: string = '';
                        let eventStatus: string = '';                 
                      //  let transID = this.eventDetails.filter(a => a.User_TransID == usersListStatus[intCnt].TRANSACTION_ID);
                        //if (transID.length > 0) {
                        //    strTransId = transID[0].User_TransID;
                        //}
                        //let transStatus = usersListStatus.filter(a => a.TRANSACTION_ID == strTransId);
                        //updated on 09-09-2017 Begining

                        eventStatus = usersListStatus[intCnt].previousStatus;
                        strStatus = usersListStatus[intCnt].userstatus;
                        strTransId = usersListStatus[intCnt].TRANSACTION_ID;
                            if (eventStatus != strStatus) {
                                if (((strStatus.toString() == "7" || strStatus.toString() == "4") && (finalCount.length>0)) || strStatus == "13") {
                                    saveStatusCode = await this.updateStatusForTransaction(strStatus, strTransId);
                                    if (saveStatusCode != AtparStatusCodes.ATPAR_OK) {

                                        this.revertUserStatusToPreviosState();
                                        return saveStatusCode;
                                    }
                                }
                                else {
                                    blnFlag = true;
                                }
                            }                        
                        
                        //end for 09-09-2017

                         //updated on 09-09-2017 Beging
                        //if (usersListStatus.length > 0) {
                          
                        //    eventStatus = usersListStatus[intCnt].previousStatus;
                        //    strStatus = usersListStatus[intCnt].userstatus;
                        //    strTransId = usersListStatus[intCnt].TRANSACTION_ID;
                        //    if (eventStatus != strStatus) {
                        //        if (((strStatus == "7" || strStatus == "4") && (this.eventDetails[intCnt].activeCount != '')) || strStatus == "13") {
                        //            saveStatusCode = await this.updateStatusForTransaction(strStatus, strTransId);
                        //            if (saveStatusCode != AtparStatusCodes.ATPAR_OK) {

                        //                this.revertUserStatusToPreviosState();
                        //                return;
                        //            }
                        //        }
                        //        else {
                        //            blnFlag = true;
                        //        }
                        //    }
                            

                        //    // if (eventStatus != strStatus) {
                        //    //     if (((strStatus == "7" || strStatus == "4") && (this.eventDetails[intCnt].activeCount != '')) || strStatus == "13") {
                        //    //         saveStatusCode = await this.updateStatusForTransaction(strStatus, strTransId);
                        //    //         if (saveStatusCode != AtparStatusCodes.ATPAR_OK) {

                        //    //             this.revertUserStatusToPreviosState();
                        //    //             return;
                        //    //         }
                        //    //     }
                        //    //     else {                       
                        //    //         blnFlag = true;
                        //    //     }
                        //    // }
                        //}
                        //end for 09-09-2017
                    }
                }
            }
            if (blnFlag) {
                await this.getEventDetails();
                if (this.isSend) {
                    saveStatusCode = AtparStatusCodes.ATPAR_OK;
                }
                else {

                    this.spinnerService.stop();
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No counts selected to update" });
                    saveStatusCode = 1111;
                }
            }
            else if (saveStatusCode == AtparStatusCodes.ATPAR_OK) {
                this.growlMessage = [];
                saveStatusCode = AtparStatusCodes.ATPAR_OK;
                if (!this.isSend) {
                    this.spinnerService.stop();
                    this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Saved Successfully" });
                    if (saveStatusCode == AtparStatusCodes.ATPAR_OK) {
                        this.pop = false;
                        this.ddlEvent = [];
                        this.ddlEvent.push({ label: "Select EventId", value: "Select EventId" });
                        this.selectedEventID = "Select EventId";
                        this.selectedBUnit = "Select BUnit";
                    }
                }
            }
            else {
                this.spinnerService.stop();
                return saveStatusCode;

            }
            this.spinnerService.stop();
            return saveStatusCode;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "SaveData");
            return saveStatusCode;
        }
    }
    revertUserStatusToPreviosState() {
        for (let intCnt in this.usersList) {

            this.usersList[intCnt].userstatus = this.usersList[intCnt].previousStatus;
        }

    }
    private async checkAuditAllowed(): Promise<number> {
        let statusCode: number = -1;
        this.growlMessage = [];
        try {
            this.spinnerService.start();
            let webresp = new AtParWebApiResponse<string>();
            await this.atParCommonService.getAuditAllowed(EnumApps.CycleCount, this.strMenuCode)
                .catch(this.httpService.handleError).then((res: Response) => {
                    webresp = res.json() as AtParWebApiResponse<string>
                    statusCode = webresp.StatusCode;
                    this.spinnerService.stop();
                    if (statusCode == AtparStatusCodes.ATPAR_OK) {
                        this.auditSatus = webresp.Data.toString();
                    }
                });
        } catch (exMsg) {
            this.clientErrorMsg(exMsg, "checkAuditAllowed");
            return statusCode;
        }
        return statusCode;
    }

    async insertAuditData(lstAuditData): Promise<number> {
        let statusCode: number = -1;
        try {
            await this.atParCommonService.insertAuditData(lstAuditData, this.deviceTokenEntry[TokenEntry_Enum.UserID], this.strMenuCode).
                catch(this.httpService.handleError).then((res: Response) => {
                    let response = res.json() as AtParWebApiResponse<MT_ATPAR_SECURITY_AUDIT>;
                    this.spinnerService.stop();
                    switch (response.StatType) {
                        case StatusType.Success: {
                            statusCode = response.StatusCode;
                            this.spinnerService.stop();
                            //this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Saved Successfully" });
                            break;
                        }
                        case StatusType.Warn: {
                            statusCode = response.StatusCode;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            statusCode = response.StatusCode;
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            statusCode = response.StatusCode;
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                    }
                });
        } catch (exMsg) {
            statusCode = AtparStatusCodes.E_SERVERERROR;
            this.clientErrorMsg(exMsg, "insertAuditData");
        }
        return statusCode;
    }

    changeStatus(ven, val, finalCount, selectedUser, transID,myindex) {
        try {
           // this.radioButtonComponent.checked = false;
           // this.radioButtonComponent.input.checked = false;
            //this.radioButtonComponent.handleClick();
            let y = 123;
            ven.activeCount = val;
            ven.rowUpdated = "Y";
            ven.SELECTEDITEM = ven.rowIndex.toString()+myindex.toString();
            ven.FinalCount = finalCount;
            if (finalCount.split(',').length > 0) {
                ven.transID = finalCount.split(',')[3];
                ven.INV_ITEM_ID = finalCount.split(',')[7];
                ven.ITEM_REC_NUM = finalCount.split(',')[1];
            }
            //ven.activeFlag = "true";        
            //ven["activeFlag_"+index] = true;
            ven.showSelectedCount = true;
            this.populateSelectedCounts(val, ven, finalCount, selectedUser, transID);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "changeStatus");
        }
    }

    addZeroes(num) {
        try {
            // Cast as number
            let result;
            let numb = Number(num);
            // If not a number, return 0
            if (isNaN(numb)) {
                return 0;
            }
            // If there is no decimal, or the decimal is less than 2 digits, toFixed           
            if (numb.toString().split(".").length < 2 || numb.toString().split(".")[1].length <= 2) {
                result = numb.toFixed(2);
            }
            // Return the number
            return result;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "addZeroes");
        }
    }

    populateSelectedCounts(val, ven, finalCount, selectedUser, userTransID) {
        try {
            var txtCount;
            var lblCount;
            var rdCount;
            var intcnt;
            if (ven != null) {
                var strCount;
                var lblCountDiff;
                var lblCountDiffPer;
                var lblValDiff;
                var lblExtVal;
                var lblSysQty;
                var lblPrice;
                var intCountDiff;
                var lblFinalCount;
                var lblItemID;
                var lblDispCount;
                var lblLot;
                var lblCustItemNo;
                var lblSerial;
                lblCountDiff = ven.COUNT_DIFF;
                lblCountDiffPer = ven.COUNT_DIFF_PER;
                lblValDiff = ven.VALUE_DIFF;
                lblExtVal = ven.EXT_VALUE;
                //  ContentPlaceHolder1_dgdrEvents_lblSysqty_0
                lblSysQty = ven.LATEST_SYSQTY;
                lblPrice = ven.ITEM_PRICE;
                //Label with counts beside the radio button
                lblCount = finalCount;
                //Hidden label containing the final counts(data) which needs to be updated to the database
                //Textbox with the selected count when edit counts parameter is checked
                lblItemID = ven.INV_ITEM_ID;
                //Label with the selected count when edit counts parameter is unchecked
                lblLot = ven.INV_LOT_ID;
                lblCustItemNo = ven.CUST_ITEM_NO;
                lblSerial = ven.SERIAL_ID;
                txtCount = val;
                lblDispCount = val;
                /*If edit counts parameter checked then display textbox, if not display label in 
                selected counts cloumn */
                var intCountDiffPer;
                var intValDiff;
                var intExtVal;
                ven.User_TransID = userTransID;
                if (val != '') {
                    //Format the count diff, count diff percentage, val diff, ext val values to precision 2
                    ven.checkedUser = selectedUser;
                    intCountDiff = val - lblSysQty;

                    if (intCountDiff < 0) {
                        ven.COUNT_DIFF = "(" + Math.abs(intCountDiff.toFixed(2)) + ")";
                    }
                    else {
                        ven.COUNT_DIFF = intCountDiff.toFixed(2);
                    }
                    if (lblSysQty == 0) {
                        ven.COUNT_DIFF_PER = 0.00;
                    }
                    else {
                        intCountDiffPer = intCountDiff / lblSysQty * 100;
                        if (intCountDiffPer < 0) {
                            ven.COUNT_DIFF_PER = "(" + Math.abs(intCountDiffPer.toFixed(2)) + ")";
                        }
                        else {
                            ven.COUNT_DIFF_PER = intCountDiffPer.toFixed(2);
                        }
                    }
                    intValDiff = intCountDiff * lblPrice;
                    if (intValDiff < 0) {
                        ven.VALUE_DIFF = "(" + Math.abs(intValDiff.toFixed(2)) + ")";
                    }
                    else {
                        ven.VALUE_DIFF = intValDiff.toFixed(2);
                    }
                    intExtVal = val * lblPrice
                    if (intExtVal < 0) {
                        ven.EXT_VALUE = "(" + Math.abs(intExtVal.toFixed(2)) + ")";
                    }
                    else {
                        ven.EXT_VALUE = intExtVal.toFixed(2);
                    }
                }
                else {
                    ven.COUNT_DIFF = '';
                    ven.COUNT_DIFF_PER = '';
                    ven.VALUE_DIFF = '';
                    ven.EXT_VALUE = '';
                }
                lblFinalCount = lblCount.split(',')[0];
                var arrFinalCount;
                var strFinalCount;
                var i;
                if (lblFinalCount != '' && lblFinalCount != null) {
                    ven.FinalCount = lblFinalCount;
                }
                strFinalCount = lblFinalCount;
                arrFinalCount = strFinalCount.split(',');
                /* Updates the hidden label values with the counts changed while radio button changed 
                and the prev value being updated */
                for (i = 0; i <= arrFinalCount.length - 3; i++) {
                    if (i == 0) {
                        /*when we change the radio button the value in textbox also changes hence 
                        using the textbox value itself*/
                        lblFinalCount = txtCount;
                    }
                    else {
                        lblFinalCount = lblFinalCount + ',' + arrFinalCount[i];
                    }
                }
                /* Appending the label value with the prev count and item id these are required 
                while updating the counts */
                lblFinalCount = lblFinalCount + ',' + arrFinalCount[0] + ',' + lblItemID;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "populateSelectedCounts");
        }
    }

    async sendEvent() {
        this.growlMessage = [];
        let statusCode: any = -1;
        let blnAllEventsDownloaded: boolean = false;
        let blnAllEventsCounted: boolean = false;
        let blnStatusUpdated: boolean = false;
        let blnSend: boolean = false;
        this.isSend = true;
        if (this.selectedOrgGrpID == "Select One" || this.selectedOrgGrpID == undefined || this.selectedOrgGrpID == "") {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
            return;
        }
        if (this.selectedBUnit == "Select BUnit" || this.selectedBUnit == undefined || this.selectedOrgGrpID == "") {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
            return;
        }
        if (this.selectedEventID == "Select EventId" || this.selectedEventID == undefined || this.selectedOrgGrpID == "") {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Event ID" });
            return;
        }
        try {
            statusCode = await this.SaveData();
            this.isSend = false;
            if (statusCode != AtparStatusCodes.ATPAR_OK) {
                this.growlMessage = [];
                this.isSend = false;
                this.spinnerService.stop();
                if (statusCode == AtparStatusCodes.S_CYCT_RECOUNTS_EXIST) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "This event has Items assigned for recount, please unassign before cancelling the event." });
                    return;
                }
                else if (statusCode == 1111) {
                    return;
                }
            }
            this.spinnerService.start();
            if (this.blnEventIsSplit) {
                await this.processSevice.CheckIfAllEventsDownloaded(this.selectedEventID, this.selectedBUnit, this.deviceTokenEntry[TokenEntry_Enum.UserID])
                    .catch(this.httpService.handleError).then((res: Response) => {
                        let response = res.json() as AtParWebApiResponse<string>;
                        switch (response.StatType) {
                            case StatusType.Success: {
                                blnAllEventsDownloaded = <boolean><Boolean>response.DataVariable
                                break;
                            }
                            case StatusType.Warn: {
                                this.isSend = false;
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                this.spinnerService.stop();
                                break;
                            }
                            case StatusType.Error: {
                                this.isSend = false;
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                this.spinnerService.stop();
                                break;
                            }
                            case StatusType.Custom: {
                                this.isSend = false;
                                this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                this.spinnerService.stop();
                                break;
                            }
                        }
                    });

                if (!blnAllEventsDownloaded) {
                    //this.pop = false;
                    this.isSend = false;
                    await this.getEventDetails();
                    this.spinnerService.stop();
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Few of the sub events are not downloaded, please download and count them to send to ERP" });

                    return;
                }
            }
            await this.processSevice.CheckIfAllEventsCounted(this.selectedEventID, this.selectedBUnit, this.deviceTokenEntry[TokenEntry_Enum.UserID])
                .catch(this.httpService.handleError).then((res: Response) => {
                    let response = res.json() as AtParWebApiResponse<string>;
                    switch (response.StatType) {
                        case StatusType.Success: {
                            blnAllEventsCounted = <boolean><Boolean>response.DataVariable
                            break;
                        }
                        case StatusType.Warn: {
                            this.isSend = false;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.isSend = false;
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.isSend = false;
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                    }
                });
            if (!blnAllEventsCounted) {
                await this.getEventDetails();
                this.spinnerService.stop();
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Few of the items are not counted, Please count them to send to ERP" });
                this.isSend = false;
                return;
            }
            await this.processSevice.CheckIfStatusUpdatedForCountedEvent(this.selectedEventID, this.selectedBUnit, this.deviceTokenEntry[TokenEntry_Enum.UserID])
                .catch(this.httpService.handleError).then((res: Response) => {
                    let response = res.json() as AtParWebApiResponse<string>;
                    switch (response.StatType) {
                        case StatusType.Success: {
                            blnStatusUpdated = <boolean><Boolean>response.DataVariable
                            break;
                        }
                        case StatusType.Warn: {
                            this.isSend = false;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.isSend = false;
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.isSend = false;
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                    }
                });
            if (!blnStatusUpdated) {
                this.spinnerService.stop();
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select Counting or Completed status to Submit the counts" });
                this.isSend = false;
                return;
            }
            await this.processSevice.CheckStatusOfEvents(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.selectedBUnit, this.selectedEventID)
                .catch(this.httpService.handleError).then((res: Response) => {
                    let response = res.json() as AtParWebApiResponse<string>;
                    switch (response.StatType) {
                        case StatusType.Success: {
                            blnSend = <boolean><Boolean>response.DataVariable
                            break;
                        }
                        case StatusType.Warn: {
                            this.isSend = false;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.isSend = false;
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.isSend = false;
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                    }
                });
            if (blnSend) {
                await this.processSevice.SendEvent(this.selectedBUnit, this.selectedEventID, this.deviceTokenEntry[TokenEntry_Enum.UserID], this.deviceTokenEntry[TokenEntry_Enum.ProfileID], this.orderHistory)
                    .catch(this.httpService.handleError).then((res: Response) => {
                        let response = res.json() as AtParWebApiResponse<string>;
                        switch (response.StatType) {
                            case StatusType.Success: {
                                blnSend = <boolean><Boolean>response.DataVariable
                                this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Sent Successfully" });
                                this.spinnerService.stop();
                                this.pop = false;
                                this.ddlEvent = [];
                                this.ddlEvent.push({ label: "Select EventId", value: "Select EventId" });
                                this.selectedEventID = "Select EventId";
                                this.selectedBUnit = "Select BUnit";
                                break;
                            }
                            case StatusType.Warn: {
                                this.isSend = false;
                                if (response.StatusCode == AtparStatusCodes.S_EVENT_PROCESSED_INERP) {
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Event already processed in the ERP and cannot upload the counts" });
                                    return;
                                } else if (response.StatusCode == AtparStatusCodes.ATPAR_E_NO_ERP_USER_ID) {
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "ERP User Id required to upload to server" });
                                    return;
                                }
                                else {
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                    this.spinnerService.stop();
                                }
                                break;
                            }
                            case StatusType.Error: {
                                this.isSend = false;
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                this.spinnerService.stop();
                                break;
                            }
                            case StatusType.Custom: {
                                this.isSend = false;
                                this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                this.spinnerService.stop();
                                break;
                            }
                        }
                    });
            }
            else {
                this.spinnerService.stop();
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Events with status other than Completed cannot be sent" });
                return;
            }
            this.isSend = false;
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "sendEvent");
        }
    }

    async  updateStatusForTransaction(strStatus, strTransId): Promise<number> {
        let saveStatusCode: number = -1;
        try {
            await this.processSevice.updateStatusForTransaction(strStatus, strTransId, this.deviceTokenEntry[TokenEntry_Enum.UserID])
                .catch(this.httpService.handleError).then(async (res: Response) => {
                    let data = res.json() as AtParWebApiResponse<string>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            saveStatusCode = data.StatusCode;
                            let blnNoCntsExists: string = '';
                            blnNoCntsExists = data.DataVariable.toString();
                            if (blnNoCntsExists == "true" && strStatus != '13') {
                                await this.getEventDetails();
                                this.spinnerService.stop();

                                if (!this.isSend) {
                                    saveStatusCode = AtparStatusCodes.INV_E_ITEMDONOTEXIST;
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Counts for the items.Please count them before changing the status for the event" });
                                }
                                this.revertUserStatusToPreviosState();
                                return;
                            }
                            else {
                                saveStatusCode = AtparStatusCodes.ATPAR_OK;
                                if (!this.isSend) {
                                    // this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Saved Successfully" });
                                }
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.pop = false;
                            if (data.StatusCode == AtparStatusCodes.S_CYCT_RECOUNTS_EXIST) {
                                saveStatusCode = data.StatusCode;
                                this.spinnerService.stop();
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "This event has Items assigned for recount,please unassign before cancelling the event." });
                                //this.ddlEvent = [];
                                //this.ddlEvent.push({ label: "Select EventId", value: "Select EventId" });
                            }
                            else {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                saveStatusCode = data.StatusCode;
                            }
                            break;
                        }
                        case StatusType.Error: {
                            saveStatusCode = data.StatusCode;
                            this.pop = false;
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            saveStatusCode = data.StatusCode;
                            this.pop = false;
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "updateStatusForTransaction");
            return saveStatusCode;
        }
        return saveStatusCode;
    }

      confirm() {
        try {
            this.growlMessage = [];
            this.confirmationService.confirm({
                message: 'Do you want to Send Data to ERP? ',
                accept: () => {
                    this.sendEvent();
                },
                reject: async () => {
                    this.spinnerService.start();
                    await this.bindGrid();
                    this.spinnerService.stop();
                   // this.revertUserStatusToPreviosState();
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "confirm");
        }
    }

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }
    async onExportToExcelClick(event) {
        try {
            let statusCode = -1;
            event.stopImmediatePropagation();
            this.spinnerService.start();
            let html: string = await this.exportReportDetails('Excel');
            //if (html != '' && html != null) {
            //    var ua = window.navigator.userAgent;
            //    var msie = ua.indexOf("MSIE ");
            //    // If Internet Explorer
            //    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
            //        statusCode = -1;
            //        let folderName: string = '';
            //        await this.atParCommonService.exportToExcel(html, "cyct-process-counts_", "cyct-process-counts_report")
            //            .then((res: Response) => {
            //                let data = res.json();
            //                statusCode = data.StatusCode;
            //                if (statusCode.toString() == AtparStatusCodes.ATPAR_OK.toString()) {
            //                    folderName = data.DataVariable.toString();
            //                    var filename = this.httpService.BaseUrl + '/Uploaded/' + folderName + '/cyct-process-counts_report.xls';
            //                    var query = '?download';
            //                    window.open(filename + query);
            //                }
            //                else {
            //                    this.growlMessage = [];
            //                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Internal Server Error.' });
            //                }
            //            });

            //        await this.atParCommonService.deleteExcel(folderName, "cyct-process-counts_report")
            //            .then((res: Response) => {
            //            });
            //    } else {

            //        var a = document.createElement('a');
            //        var data_type = 'data:application/vnd.ms-excel';
            //        html = html.replace(/ /g, '%20');
            //        a.href = data_type + ', ' + html;
            //        a.download = 'cyct-process-counts_report.xls';
            //        a.click();
            //    }
            //}
            if (html != '' && html != null) {
                let blob = new Blob([html], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                });
                saveAs(blob, "ProcessCountReport.xls");
            }
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
          
                var mywindow = window.open('', null, 'height=650,width=650,status=no,resizable=yes, scrollbars=yes, toolbar=no,location=center,menubar=no');
               if (mywindow != null && mywindow != undefined) {
                   
                   mywindow.document.write('<html><head><style>@page{size:landscape;"}</style><title>' + 'CycleCount - Process Count' + '</title>');
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
            this.growlMessage = [];
            let statusCode: number = -1;
            if (html != '' && html != null) {
                this.spinnerService.start();
                await this.atParCommonService.sendEmail(this.deviceTokenEntry[TokenEntry_Enum.SystemId], 'Process Count', JSON.stringify(html), this.toMailAddr, MailPriority.Normal.toString(), '')
                    .then((res: Response) => {
                        this.spinnerService.stop();
                        let data = res.json() as AtParWebApiResponse<number>;
                        statusCode = data.StatusCode;
                    });

                if (statusCode == AtparStatusCodes.ATPAR_OK) {
                    this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Mail has been sent' });
                }
                else if (statusCode == AtparStatusCodes.EMAIL_ENTER_FROM_ADDRESS) {
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'From Address is Missing! Please Contact Administrator' });
                }
                else if (statusCode == AtparStatusCodes.EMAIL_ENTER_TO_ADDRESS) {
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Please Enter valid Email Address to Send' });
                }
                else if (statusCode == AtparStatusCodes.EMAIL_ENTER_SUBJECT) {
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Subject is Missing! Please Contact Administrator' });
                }
                else if (statusCode == AtparStatusCodes.EMAIL_ENTER_BODY) {
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Body is Missing! Please contact Administrator' });
                }
                else if (statusCode == AtparStatusCodes.EMAIL_SMTP_SERVER_MISSING) {
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Email Server not configured! Please contact Administrator' });
                }
                else if (statusCode == AtparStatusCodes.EMAIL_SEND_FAILED) {
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Mail Not Sent. Please Try Again' });
                }
                else {
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Error while sending mail' });
                }
            }

            // if (this.statusCode == AtparStatusCodes.ATPAR_OK) {

            this.toMailAddr = '';
            //}

        } catch (ex) {
            this.clientErrorMsg(ex, 'onSendMailClick');
        }
        finally {

            this.spinnerService.stop();
        }
    }

    async exportReportDetails(reqType: string) {
        let htmlBuilder: string = '';
        let ipAddress = '';
        let gstrProtocal = '';
        let gstrServerName = ''
        let gstrPortNo = '';
        try {
            let statusCode = -1;
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
                .then(async (res: Response) => {
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

            imgserverPath = gstrProtocal + '://' + ipAddress + '/atpar/AtParWebApi/assets/images/' ;

            htmlBuilder += "<Table align=left width=100% cellpadding=0 cellspacing = 0 vAlign=top>"

            if (reqType == "Print") {
                htmlBuilder += "<TR width='100%'><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height='63' nowrap><img height='63' src=" + imgserverPath + "logo.jpg nowrap></td><td align=left  width='85%' height='63' nowrap></td></TR>"
                htmlBuilder += "<TR><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                htmlBuilder += "<tr><td colspan=12 align=left><span class=c2>Process Counts for Business Unit <b>" + this.selectedBUnit + "</b> and EventID  <b>" + this.selectedEventID + "</b></span></td><td align=right valign=top>&nbsp;"
                htmlBuilder += "<A  href=" + "" + "javascript:window.print()" + "><img src=" + imgserverPath + "print.jpg></A>"
            }
            else if (reqType == "Excel") {
                htmlBuilder += "<TR width='100%'  height='27px'><td colspan=2 align=left bgcolor='#fe9836' width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td><td align=left  width='85%' height='63' nowrap></td></TR>"
                htmlBuilder += "<TR  height='27px'><TD height='27px'  vAlign=bottom width=100% align=left colspan=2><font size=1 style=COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                htmlBuilder += "<tr><td colspan=12 align=left><span class=c2>Process Counts For Business Unit <b>" + this.selectedBUnit + "</b> and EventID  <b>" + this.selectedEventID + "</b></span></td><td align=right valign=top>&nbsp;"
            }
            else if (reqType == "Mail") {
                htmlBuilder += "<TR width='100%'  height='27px'><td colspan=2 align=left bgcolor='#fe9836' width='100%' height=63 nowrap><img height=63 src=" + imgserverPath + "logo.jpg></td><td align=left  width='85%' height='63' nowrap></td></TR>"
                htmlBuilder += "<TR  height='27px'><TD height='27px'  vAlign=bottom width=100% align=left colspan=2><font size=1 style=COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></FONT></TD>"
                htmlBuilder += "</TR><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>"
                htmlBuilder += "<tr><td colspan=12 align=left><span class=c2>Process Counts For Business Unit <b>" + this.selectedBUnit + "</b> and EventID  <b>" + this.selectedEventID + "</b></span></td><td align=right valign=top>&nbsp;"
            }
            htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr><tr><td colspan=2> "
            htmlBuilder += "<table align=left width=99% style=" + "BORDER-COLLAPSE:collapse" + " border=1>"
            htmlBuilder += "<tr >"
            htmlBuilder += "<td align=center><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif;word-wrap:break-word;><b>Item ID (Description)</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif;><b>Custom Item NO</b></span></td>"
            htmlBuilder += "<td align=center nowrap><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif;><b>Lot #</b></span></td>"
            htmlBuilder += "<td align=center><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif;><b>Serial #</b></span></td>"
            htmlBuilder += "<TD align=center nowrap><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif;><b>Mfg ItemID </b></span></TD>"
            htmlBuilder += "<TD align=center nowrap><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif;><b>Storage Location</b></span></TD>"
            htmlBuilder += "<TD align=center nowrap><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif;><b>Item Price($)</b></span></TD>"
            htmlBuilder += "<TD align=center nowrap><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif;><b>Sys Qty - UOM</b></span></TD>"

            for (let drow in this.usersList) {
                let _strTransStatus = this.usersList[drow].userstatus.toString();
                let strStatus = '';
                if (_strTransStatus == "1")
                    strStatus = "Downloaded"
                else if (_strTransStatus == "7")
                    strStatus = "Completed"
                else if (_strTransStatus == "4")
                    strStatus = "Counting"
                else if (_strTransStatus == "13")
                    strStatus = "Cancelled"
                else if (_strTransStatus == "11")
                    strStatus = "Sent"

                htmlBuilder += "<td align=center nowrap><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif;word-wrap:break-word;><b>" + this.lstEventDetails["EVENT_TRANSACTIONS"][drow].EVENTUSERS + "<br /> Status <br />" + strStatus + "<br /> Count Qty</b></span></TD>"

            }
            htmlBuilder += "<TD align=center nowrap><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif;word-wrap:break-word;><b>Selected Count</b></span></TD>"
            htmlBuilder += "<TD align=center nowrap><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif;word-wrap:break-word;><b>Count Diff</b></span></TD>"
            htmlBuilder += "<TD align=center nowrap><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif;word-wrap:break-word;><b>Count Diff (%)</b></span></TD>"
            htmlBuilder += "<TD align=center nowrap><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif;word-wrap:break-word;><b>Value Diff($)</b></span></TD>"
            htmlBuilder += "<TD align=center nowrap><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif;word-wrap:break-word;><b>Ext $ Value</b></span></TD>"
            htmlBuilder += "</tr>"

            if (this.eventDetails != null) {
                for (let dgItem in this.eventDetails) {
                    let strFontColor = "None"
                    let strConsignedflag = this.eventDetails[dgItem].CONSIGNED_FLAG;
                    let strLotOrSerial = this.eventDetails[dgItem].L_S_CONTROLLED;
                    if (strConsignedflag == YesNo_Enum[YesNo_Enum.Y.toString()]) {
                        strFontColor = "DarkGreen"
                    }
                    else {
                        if (strLotOrSerial == "L" ||
                            strLotOrSerial == "S" ||
                            strLotOrSerial == "B") {
                            strFontColor = "Brown"
                        }
                    }

                    htmlBuilder += "<tr>"
                    htmlBuilder += "<td align=left><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif;word-wrap:break-word;color:" + strFontColor + ">" + this.eventDetails[dgItem].INV_ITEM_ID + " " + this.eventDetails[dgItem].DESCRIPTION + "</span></td>"
                    htmlBuilder += "<td align=left nowrap><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif;color:" + strFontColor + ">" + this.eventDetails[dgItem].CUST_ITEM_NO + "</span></td>"
                    htmlBuilder += "<td align=left nowrap><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif;color:" + strFontColor + ">" + this.eventDetails[dgItem].INV_LOT_ID + "</span></td>"
                    htmlBuilder += "<td align=left ><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif;color:" + strFontColor + ">" + this.eventDetails[dgItem].SERIAL_ID + "</span></td>"
                    htmlBuilder += "<td align=left nowrap><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif;color:" + strFontColor + ">" + this.eventDetails[dgItem].MFG_ITEM_ID + "</span></td>"
                    htmlBuilder += "<td align=left nowrap><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif;color:" + strFontColor + ">" + this.eventDetails[dgItem].STORAGE_LOCATION + "</span></td>"
                    htmlBuilder += "<td align=left nowrap><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif;color:" + strFontColor + ">" + this.eventDetails[dgItem].ITEM_PRICE + "</span></td>"
                    htmlBuilder += "<td align=left nowrap><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif;color:" + strFontColor + ">" + this.eventDetails[dgItem].LATEST_SYSQTY + " " + this.eventDetails[dgItem].UNIT_OF_MEASURE + "</span></td>"

                    for (let intuser in this.usersList) {
                        let StrCountQty = '';
                        if (this.eventDetails[dgItem].rowUpdated == 'Y') {
                            if (this.eventDetails[dgItem]["activeFlag_" + intuser]) {
                                StrCountQty = this.eventDetails[dgItem].activeCount;
                            }
                        }
                        else {
                            if (this.eventDetails[dgItem]["COUNT_" + intuser] != undefined && this.eventDetails[dgItem]["COUNT_" + intuser] != "N") {
                                StrCountQty = this.eventDetails[dgItem]["COUNT_" + intuser];
                            }
                        }
                        htmlBuilder += "<td align=right nowrap><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif;color:" + strFontColor + ">" + StrCountQty + "</span></td>"
                    }
                    if (this.eventDetails[dgItem].showSelectedCount) {
                        htmlBuilder += "<td align=right nowrap><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif;color:" + strFontColor + ">" + this.eventDetails[dgItem].activeCount + "</span></td>"
                    }
                    else {
                        htmlBuilder += "<td align=right nowrap><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif;color:" + strFontColor + ">" + "&nbsp;" + "</span></td>"
                    }
                    htmlBuilder += "<td align=right nowrap><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif;color:" + strFontColor + ">" + this.eventDetails[dgItem].COUNT_DIFF + "</span></td>"
                    htmlBuilder += "<td align=right nowrap><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif;color:" + strFontColor + ">" + this.eventDetails[dgItem].COUNT_DIFF_PER + "</span></td>"
                    htmlBuilder += "<td align=right nowrap><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif;color:" + strFontColor + ">" + this.eventDetails[dgItem].VALUE_DIFF + "</span></td>"
                    htmlBuilder += "<td align=right nowrap><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif;color:" + strFontColor + ">" + this.eventDetails[dgItem].EXT_VALUE + "</span></td>"

                    htmlBuilder += "</tr>"
                }

            }

            htmlBuilder += "</table></td></tr>"
            htmlBuilder += "</Table>"
            return await htmlBuilder;
            //BindGrid(_intTransIDCount)
        }

        catch (ex) {

            this.clientErrorMsg(ex, 'exportReportDetails');
            htmlBuilder = '';
            return htmlBuilder;
        }
        finally {

            this.spinnerService.stop();
        }
    }

    customSort(event, elementname) {
        var element = event;
        //this.eventDetails = [];
        if (this.preField == element.field) {
            this.blnSortByColumn = !this.blnSortByColumn;
            // element.order = !element.order;

        } else {
            this.blnSortByColumn = true;
        }
        this.preField = element.field;


        try {
            let emptyValues = this.eventDetails.filter(a => a[elementname] === '' || a[elementname] === null);
            if (emptyValues.length == this.eventDetails.length) {
                return;
            }
            this.eventDetails = this.eventDetails.sort(function (a, b) {
                if (a[elementname] != '' && b[elementname] != '' && a[elementname] != undefined && b[elementname] != undefined) {
                    if (parseFloat(a[elementname]) < parseFloat(b[elementname]))
                        return -1;
                    if (parseFloat(a[elementname]) > parseFloat(b[elementname]))
                        return 1;
                    return 0;

                }
                else {
                    if (a[elementname] < b[elementname])
                        return -1;
                    if (a[elementname] > b[elementname])
                        return 1;
                    return 0;
                }
                //if (parseFloat(a[elementname]) < parseFloat(b[elementname]))
                //        return -1;
                //    if (parseFloat(a[elementname]) > parseFloat(b[elementname]))
                //        return 1;
                //    return 0;

            });


            if (this.blnSortByColumn == false) {
                this.eventDetails = this.eventDetails.reverse();
            }

        }
        catch (ex) {
            this.clientErrorMsg(ex, "customSort");
        }

    }
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    closeMailPopup() {
        this.growlMessage = [];
    }

    ngOnDestroy() {
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.usersList = [];
        this.lstOrgGroups = [];
        this.lstAuditData = [];
        this.lstBUnits = [];
        this.ddlOrgGroups = [];
        this.ddlBunit = [];
        this.ddlEvent = [];
        this.lstEventId = [];
        this.spinnerService.stop();
        this.lstEventDetails = [];
        this.eventDetails = [];
        this.lstColDetails = [];
        this.ddlStatus = [];
        this.lstUpdateReviewerData = [];
    }

}