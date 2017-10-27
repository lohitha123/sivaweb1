import { Component } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { AtParConstants } from '../Shared/AtParConstants';
import { TokenEntry_Enum, EnumApps, ModeEnum, YesNo_Enum, StatusType, BusinessType, AppParameters_Enum } from '../Shared/AtParEnums'
import { HttpService } from '../Shared/HttpService';
import { AtparStatusCodes, } from '../Shared/AtParStatusCodes';
import { Http, Response } from '@angular/http';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { Message, SelectItem } from './../components/common/api';
import { SplitEventsService } from './cyct-split-events.service';
import { MT_ATPAR_ORG_GROUPS } from '../Entities/MT_ATPAR_ORG_GROUPS';
import { MT_CYCT_EVENT_HDR_MASTER } from '../Entities/MT_CYCT_EVENT_HDR_MASTER';

declare var module: {
    id: string;
}

@Component({
    templateUrl: 'cyct-split-events.component.html',
    providers: [datatableservice, AtParCommonService, SplitEventsService, AtParConstants]
})

export class SplitEventsComponent {
    pop: boolean = false;
    page: boolean = false;
    form: boolean = false;
    editform: boolean = false;
    strReviewCount: string;
    lblOrgGroupID: string;
    selOrgGrpId: string;
    ddlOrgGrpID: SelectItem[] = [];
    ddlEvent: SelectItem[] = [];
    ddlSort: SelectItem[] = [];
    ddlBunit: SelectItem[] = [];
    lstEvents: MT_CYCT_EVENT_HDR_MASTER[] = [];
    eventsSplit: MT_CYCT_EVENT_HDR_MASTER;
    selectedBUnit: string;
    selectedEvent: string;
    loading: boolean = true;
    deviceIDStatus: number;
    descStatus: number;
    macAddressStatus: number;
    growlMessage: Message[] = [];
    deviceTokenEntry: string[] = [];
    orgGroupsInfo: MT_ATPAR_ORG_GROUPS[] = [];
    blnShowOrgGroupLabel: boolean;
    blnShowOrgGroupID: boolean;
    blnSubEventsExists: boolean = false;
    doSplit: boolean = false;
    selectedSortValue: string;

    constructor(public dataservice: datatableservice,
        public commonService: AtParCommonService,
        public spinnerService: SpinnerService,
        public httpService: HttpService,
        public splitEventsServiceObj: SplitEventsService,
        private atParConstant: AtParConstants
    ) {
    }

    async  ngOnInit() {
        try {
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            await this.orgGroupParamValue();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit")
        }
    }

    async  orgGroupParamValue() {
        try {
            let paramReviewCounts: string = "REVIEW_COUNTS"
            this.spinnerService.start();
            await this.commonService.getOrgGroupParamValue(paramReviewCounts, EnumApps.CycleCount,
                this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID])
                .catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<string>;
                    this.spinnerService.stop();
                    this.strReviewCount = data.DataVariable.toString();
                    if (this.strReviewCount == YesNo_Enum[YesNo_Enum.N]) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Check Review Counts Organization Parameter" });
                        this.page = false;
                        return;
                    }
                    else {
                        this.page = true;
                        this.bindOrgGroups();
                    }
                });
            this.ddlSort.push({ label: "Item ID", value: "INV_ITEM_ID" });
            this.ddlSort.push({ label: "Storage Location", value: "STORAGE_AREA" });
            this.ddlSort.push({ label: "Description", value: "DESCRIPTION" });
            this.selectedSortValue = this.ddlSort[0].value;
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "orgGroupParamValue")
        }
    }

    async  bindOrgGroups() {
        try {
            this.growlMessage = [];
            this.ddlOrgGrpID = [];
            this.spinnerService.start()
            await this.commonService.getUserOrgGroups(this.deviceTokenEntry[TokenEntry_Enum.UserID],
                this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID])
                .catch(this.httpService.handleError).then((res: Response) => {
                    let orgGroups = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>;
                    this.spinnerService.stop()
                    switch (orgGroups.StatType) {
                        case StatusType.Success: {
                            this.ddlBunit.push({ label: "Select BUnit", value: "SelectBUnit" });
                            this.ddlEvent.push({ label: "Select Event", value: "Select Event" });
                            this.orgGroupsInfo = orgGroups.DataList;
                            if (this.orgGroupsInfo.length == 1) {
                                this.blnShowOrgGroupLabel = true;
                                this.blnShowOrgGroupID = false;
                                this.lblOrgGroupID = this.orgGroupsInfo[0].ORG_GROUP_ID + " - " + this.orgGroupsInfo[0].ORG_GROUP_NAME;
                                this.selOrgGrpId = this.orgGroupsInfo[0].ORG_GROUP_ID;
                            }
                            else if (this.orgGroupsInfo.length > 1) {
                                this.blnShowOrgGroupLabel = false;
                                this.blnShowOrgGroupID = true;
                                this.ddlOrgGrpID.push({ label: "Select One", value: "Select One" });
                                for (var rowCnt = 0; rowCnt < this.orgGroupsInfo.length; rowCnt++) {
                                    if (this.orgGroupsInfo[rowCnt].ORG_GROUP_ID.toString() != "All") {
                                        this.ddlOrgGrpID.push({
                                            label: this.orgGroupsInfo[rowCnt].ORG_GROUP_ID + " - "
                                            + this.orgGroupsInfo[rowCnt].ORG_GROUP_NAME, value: this.orgGroupsInfo[rowCnt].ORG_GROUP_ID
                                        });
                                    }
                                }
                                this.selOrgGrpId = this.ddlOrgGrpID[0].value;
                            }
                            if (this.blnShowOrgGroupLabel) {
                                this.populateBunitsDdlst();

                            }
                            this.selectedBUnit = this.ddlBunit[0].value;
                            this.selectedEvent = this.ddlEvent[0].value;
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: orgGroups.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: orgGroups.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: orgGroups.StatusMessage });
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindOrgGroups");
        }
    }

    async  populateBunitsDdlst() {
        this.growlMessage = [];
        this.ddlBunit = [];
        this.ddlEvent = [];
        this.ddlBunit.push({ label: "Select BUnit", value: "SelectBUnit" });
        this.ddlEvent.push({ label: "Select Event", value: "Select Event" });
        try {
            this.spinnerService.start()
            await this.commonService.getOrgBusinessUnits(this.selOrgGrpId, BusinessType.Inventory)
                .catch(this.httpService.handleError).then((res: Response) => {
                    let response = res.json() as AtParWebApiResponse<string>;
                    this.spinnerService.stop()
                    switch (response.StatType) {
                        case StatusType.Success: {
                            let lstBUnits = response.DataList;
                            if (lstBUnits.length > 0) {
                                for (var rowCnt = 0; rowCnt < lstBUnits.length; rowCnt++) {
                                    this.ddlBunit.push({
                                        label: lstBUnits[rowCnt], value: lstBUnits[rowCnt]
                                    });
                                }
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "populateBunitsDdlst");
        }
    }

    async  ddlBUnitChanged() {
        this.growlMessage = [];
        try {
            this.ddlEvent = [];
            this.pop = false;

            this.ddlEvent.push({ label: "Select Event", value: "Select Event" });
            if (this.selectedBUnit != "SelectBUnit") {
                await this.getEventsList();
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ddlBUnitChanged");
        }
    }

    ddlEventChanged() {
        this.pop = false;
    }

    async  getEventsList() {
        this.growlMessage = []
        try {
            this.spinnerService.start()
            await this.splitEventsServiceObj.GetEventsList(this.selectedBUnit)
                .catch(this.httpService.handleError).then((res: Response) => {
                    let response = res.json() as AtParWebApiResponse<MT_CYCT_EVENT_HDR_MASTER>;
                    this.spinnerService.stop()
                    switch (response.StatType) {
                        case StatusType.Success: {
                            this.lstEvents = response.DataList;
                            if (this.lstEvents.length > 0) {
                                for (var rowCnt = 0; rowCnt < this.lstEvents.length; rowCnt++) {
                                    this.ddlEvent.push({
                                        label: this.lstEvents[rowCnt].EVENT_ID, value: this.lstEvents[rowCnt].EVENT_ID
                                    });
                                }
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            break;
                        }
                    }
                    this.selectedEvent = "Select Event";
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getEventsList");
        }

    }

    async  go() {
        this.growlMessage = [];
        this.pop = false;
        if (this.selOrgGrpId == 'Select One') {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
            return;
        }
        else if (this.selectedBUnit == "SelectBUnit") {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
            return;
        }
        else if (this.selectedEvent == "Select Event") {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Event ID" });
            return;
        }
        try {
            var eventsList = this.lstEvents.filter(a => a.BUSINESS_UNIT == this.selectedBUnit && a.EVENT_ID == this.selectedEvent);
            this.eventsSplit = new MT_CYCT_EVENT_HDR_MASTER();
            if (eventsList.length == 1) {
                this.eventsSplit.EVENT_ID = eventsList[0].EVENT_ID;
                this.eventsSplit.FROM = eventsList[0].FROM;
                this.eventsSplit.TO = eventsList[0].TO;
                this.eventsSplit.NO_OF_ITEMS = eventsList[0].NO_OF_ITEMS;
                this.eventsSplit.PARENT_EVENT_ID = eventsList[0].PARENT_EVENT_ID;
            }
            this.spinnerService.start();
            await this.splitEventsServiceObj.checkForSplit(this.selectedEvent, this.selectedBUnit,true,
                this.deviceTokenEntry[TokenEntry_Enum.UserID])
                .catch(this.httpService.handleError).then((res: Response) => {
                    let response = res.json() as AtParWebApiResponse<boolean>;
                    this.spinnerService.stop()
                    switch (response.StatType) {
                        case StatusType.Success: {
                            let blnCheckSplit = response.DataVariable;
                            if (blnCheckSplit.toString() == "true") {
                                this.doSplit = true;
                            }
                            else if (blnCheckSplit.toString() == "false") {
                                this.doSplit = false;
                            }
                            this.pop = true;
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            break;
                        }
                    }
                });
            this.spinnerService.stop();
        }
        catch (exMsg) {
            this.spinnerService.stop();
            this.clientErrorMsg(exMsg, "go");
        }
    }

    add() {
        this.form = true;
        this.editform = false;
        this.page = false;
        this.pop = false;
    }

    edit() {
        this.editform = true;
        this.form = false;
        this.page = false;
        this.pop = false;
    }

    close() {
        this.form = false;
        this.page = true;
        this.pop = true;
        this.editform = false;
    }

    ddlOrgGrpIdChanged() {
        this.growlMessage = [];
        this.pop = false;
        try {
            if (this.selOrgGrpId == 'Select One') {
                this.ddlBunit = [];
                this.ddlBunit.push({ label: "Select BUnit", value: "SelectBUnit" });
                this.selectedBUnit = "SelectBUnit";
                this.ddlEvent = [];
                this.ddlEvent.push({ label: "Select Event", value: "Select Event" });
                this.selectedEvent = "Select Event"
            }
            else {
                this.selectedBUnit = "SelectBUnit";
                this.selectedEvent = "Select Event"
                this.populateBunitsDdlst();
            }
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "ddlOrgGrpIdChanged");
        }
    }

    async splitEvents() {
        var blnEventCanBeSplit: boolean = false;
        this.growlMessage = [];
        try {
            if (this.selectedBUnit == "SelectBUnit") {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
                return;
            }
            if (this.selectedEvent == "Select Event") {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Event ID" });
                return;
            }
            if (this.eventsSplit.PARENT_EVENT_ID.toString() == "" || this.eventsSplit.PARENT_EVENT_ID == null) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please enter number of Splits required" });
                return;
            }
            if (this.eventsSplit.PARENT_EVENT_ID == 0 || this.eventsSplit.PARENT_EVENT_ID == 1) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Split Into cannot have 0 or 1 value" });
                return;
            }
            if (this.eventsSplit.PARENT_EVENT_ID > parseInt(this.eventsSplit.NO_OF_ITEMS.toString())) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Number splits cannot be more than number of items for an event" });
                return;
            }
            this.spinnerService.start();
            await this.splitEventsServiceObj.checkForSplit(this.selectedEvent, this.selectedBUnit, true,
                this.deviceTokenEntry[TokenEntry_Enum.UserID])
                .catch(this.httpService.handleError).then((res: Response) => {
                    let response = res.json() as AtParWebApiResponse<boolean>;
                    this.spinnerService.stop()
                    switch (response.StatType) {
                        case StatusType.Success: {
                            let blnCheckSplit = response.DataVariable;
                            if (blnCheckSplit.toString() == "false") {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Event cannot be split as it is downloaded by HHT user" });
                                return;
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            break;
                        }
                    }
                });
            this.spinnerService.start()
            await this.splitEventsServiceObj.SplitEvent(this.selectedBUnit, this.selectedEvent, this.eventsSplit.PARENT_EVENT_ID,
                this.deviceTokenEntry[TokenEntry_Enum.UserID], this.deviceTokenEntry[TokenEntry_Enum.ProfileID],
                this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID], this.selectedSortValue,
                this.eventsSplit.FROM, this.eventsSplit.TO)
                .catch(this.httpService.handleError).then((res: Response) => {
                    this.spinnerService.stop()
                    let response = res.json() as AtParWebApiResponse<number>;
                    this.spinnerService.stop()
                    switch (response.StatType) {
                        case StatusType.Success: {
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Event Splitted Successfully" });
                            this.pop = false;
                            this.selectedSortValue = this.ddlSort[0].value;
                            if (this.blnShowOrgGroupID) {
                                //this.selOrgGrpId = 'Select One';                               
                                this.selectedBUnit = "SelectBUnit";
                                this.ddlEvent = [];
                                this.ddlEvent.push({ label: "Select Event", value: "Select Event" });
                                this.selectedEvent = "Select Event"

                            }
                            else {
                                this.selectedBUnit = "SelectBUnit";
                                this.ddlEvent = [];
                                this.ddlEvent.push({ label: "Select Event", value: "Select Event" });
                                this.selectedEvent = "Select Event"
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            if (response.StatusCode == AtparStatusCodes.E_NORECORDFOUND) {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No items for the event to Split" });
                            }
                            else {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                            }
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "splitEvents");
        }
    }

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    ngOnDestroy() {
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.ddlOrgGrpID = [];
        this.ddlEvent = [];
        this.ddlSort = [];
        this.ddlBunit = [];
        this.lstEvents = [];
        this.eventsSplit = null;
        this.growlMessage = [];
        this.deviceTokenEntry = [];
        this.orgGroupsInfo = [];
        this.spinnerService.stop();
    }
}