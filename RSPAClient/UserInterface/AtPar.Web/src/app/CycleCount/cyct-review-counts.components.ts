import { Component, OnDestroy } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { MT_ATPAR_ORG_GROUP_BUNITS } from '../../app/Entities/MT_ATPAR_ORG_GROUP_BUNITS';
import { MT_ATPAR_USER } from '../../app/Entities/MT_ATPAR_USER';
import { MT_ATPAR_ORG_GROUPS } from '../../app/Entities/MT_ATPAR_ORG_GROUPS';
import { TokenEntry_Enum, EnumApps, YesNo_Enum, ClientType, AppParameters_Enum, StatusType, BusinessType, EventType, MailPriority } from '../Shared/AtParEnums';
import { HttpService } from '../Shared/HttpService';
import { SelectItem, Message } from './../components/common/api';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { Http, Response } from "@angular/http";
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { AtParConstants } from '../Shared/AtParConstants';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { ReviewCountsService } from './cyct-review-counts.service';
import { MT_CYCT_EVENT_HDR } from '../../app/Entities/MT_CYCT_EVENT_HDR';
import { VM_REVIEW_COUNTS_EVENT_DATA } from '../entities/vm_review_counts_event_data';
import { SSL_CONFIG_DETAILS } from '../Entities/SSL_CONFIG_DETAILS';
import { saveAs } from 'file-saver';

@Component({
    templateUrl: 'cyct-review-counts.components.html',
    providers: [datatableservice, HttpService, AtParCommonService, AtParConstants, ReviewCountsService]
})

export class ReviewCountsComponent {
    blnSortByColumn: boolean = false;
    totalItems: string = "";
    lstEventId: MT_CYCT_EVENT_HDR[] = [];
    loading: boolean = true;
    strUpdateCntDtWeb: string = "";
    deviceTokenEntry: string[] = [];
    orgGroupData: MT_ATPAR_ORG_GROUPS[];
    growlMessage: Message[] = [];
    bunitsData: any = [];
    userDataList: MT_ATPAR_USER[];
    recntUserDataList: MT_ATPAR_USER[];
    eventIdDataList: MT_CYCT_EVENT_HDR[] = [];
    strEventAllocation: string = "";
    blnRecntUsers: boolean = true;
    blnShowOrgGroupLabel: boolean = false;
    blnShowOrgGroupID: boolean = false;
    orgGrpID: string = "";
    orgGrpIDData: string = "";
    orgGroupIDForDBUpdate: string;
    selectedOrgGroupId: string = "";
    selectedBunit: string = "";
    selectedUser: string = "";
    selectedEvent: string = "";
    selectedRecntUser: string = "";
    performManualCounts: string = "";
    reviewManualCounts: string = "";
    reviewCounts: string = "";
    lstOrgGroups: SelectItem[];
    lstBunit: SelectItem[];
    lstUsers: SelectItem[];
    lstEvents: SelectItem[];
    lstRecntUsers: SelectItem[];
    hdnProfEditTxt: string;
    flgBtnEnable: string = "";
    Users: any[] = [];
    lstEventDetails: VM_REVIEW_COUNTS_EVENT_DATA[] = [];
    recCount: string = "";
    ErrMsg: string = "";
    flgParentEvent: string = "";
    strMenuCode: string = "";
    pageSize: number;
    startIndex: number;
    EndIndex: number;
    blnsortbycolumn: boolean = true;
    custom: string = "custom";
    pazeSize: number;
    showgrid: boolean = false;
    _strUserId: string = "";
    _strDateTime: string = "";
    _intRecCnt: string = "";
    isSend: boolean = false;
    lblEventAllocUsers: string = "";
    lblEventAllocUsersToolTip: string = "";
    rctFlag: boolean = false;
    showDropDowns: boolean = false;
    chkReCntFlag: boolean;
    changedTextBoxVal: string = '';
    btnUpload: boolean;
    toMailAddr: string;
    isMailDialog: boolean = false;
    preField: string = '';
    constructor(public dataservice: datatableservice,
        private atParCommonService: AtParCommonService,
        private httpService: HttpService,
        private spinnerService: SpinnerService,
        private atParConstant: AtParConstants,
        private reviewCountsService: ReviewCountsService,
    ) {

    }


    async  ngOnInit() {
        try {
            this.spinnerService.start();
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.pageSize = +this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
            this.strMenuCode = localStorage.getItem("menuCode");
            this.pazeSize = +this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
            await this.orgGroupParamValue(AppParameters_Enum[AppParameters_Enum.UPDATE_COUNTDATE_WEB].toString());
            await this.getProfileParamValue();
            await this.orgGroupParamValue(AppParameters_Enum[AppParameters_Enum.REVIEW_COUNTS].toString());
            await this.orgGroupParamValue(AppParameters_Enum[AppParameters_Enum.PERFORM_MANUAL_COUNTS].toString());
            await this.orgGroupParamValue(AppParameters_Enum[AppParameters_Enum.REVIEW_MANUAL_COUNTS].toString());
            this.spinnerService.stop();
            if ((this.reviewCounts == "N") &&
                ((this.performManualCounts == "Y" && this.reviewManualCounts == "N") ||
                    (this.performManualCounts == "N"))) {
                this.spinnerService.stop();
                this.showDropDowns = false;
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Review counts Parameter is Unchecked. Please check to review." });
                return;
            }
            else {
                this.showDropDowns = true;
                this.spinnerService.start();
                let blnresult = await this.ChkEventIds();
                this.spinnerService.start()
                await this.bindUserOrgGroups(blnresult);
                this.spinnerService.stop();

                await this.orgGroupParamValue(AppParameters_Enum[AppParameters_Enum.EVENT_ALLOCATION].toString());
                this.selectedRecntUser = "Select User";
                if (this.strEventAllocation == "N") {
                    this.lstRecntUsers = [];
                    this.blnRecntUsers = false;
                    this.lstRecntUsers.push({ label: "Select User", value: "Select User" });
                }
                else if (this.blnShowOrgGroupLabel) {
                    this.lstRecntUsers = [];
                    //this.blnRecntUsers = true;
                    this.lstRecntUsers.push({ label: "Select User", value: "Select User" });
                    //await this.populateReCntUsers();
                }

            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit")
        }
    }

    async  ChkEventIds() {
        this.growlMessage = [];
        let blnisExists: boolean = true;
        try {
            await this.atParCommonService.getEventIds("", this.deviceTokenEntry[TokenEntry_Enum.UserID])
                .catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_CYCT_EVENT_HDR>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.trVisibleTrue();
                            blnisExists = true;
                            return blnisExists;
                        }
                        case StatusType.Warn: {

                            if (data.StatusCode == AtparStatusCodes.E_NORECORDFOUND) {
                                this.trVisibleFalse();
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No events available to review the counts" });

                            }
                            else {
                                this.showgrid = false;
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No events available to review the counts" });
                            }
                            this.spinnerService.stop();
                            blnisExists = false;
                            return blnisExists;
                        }
                        case StatusType.Error: {
                            this.spinnerService.stop();
                            this.showgrid = false;
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            blnisExists = false;
                            return blnisExists;
                        }
                        case StatusType.Custom: {
                            this.spinnerService.stop();
                            this.showgrid = false;
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            blnisExists = false;
                            return blnisExists;
                        }
                    }
                });
            return blnisExists;
        }
        catch (ex) {
            this.spinnerService.stop();
            this.clientErrorMsg(ex, "ChkEventIds");
        }
    }

    trVisibleFalse() {
        this.showgrid = false;
        this.selectedEvent = "Select EventId";
        this.selectedBunit = "Select BUnit";
        this.selectedUser = "Select User";
        this.selectedRecntUser = "Select User";
        if (this.blnShowOrgGroupID) {
            this.selectedOrgGroupId = "Select One";
        }
        this.isSend = false;
    }

    trVisibleTrue() {

    }

    async getProfileParamValue() {
        try {
            await this.atParCommonService.getProfileParamValue(this.deviceTokenEntry[TokenEntry_Enum.ProfileID], EnumApps.CycleCount, 'EDIT_COUNTS')
                .catch(this.httpService.handleError).then((result: Response) => {
                    let res = result.json() as AtParWebApiResponse<any>;

                    switch (res.StatType) {
                        case StatusType.Success: {
                            this.hdnProfEditTxt = res.DataVariable.toString();
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
    }

    async  orgGroupParamValue(orgGrpParamName: string) {
        try {
            let cycleCntAppId: number = EnumApps.CycleCount;
            await this.atParCommonService.getOrgGroupParamValue(orgGrpParamName, cycleCntAppId, this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID])
                .catch(this.httpService.handleError).then(async (res: Response) => {
                    let response = res.json() as AtParWebApiResponse<string>;
                    response.DataVariable = (response.DataVariable != null) ? response.DataVariable : "";
                    if (orgGrpParamName == AppParameters_Enum[AppParameters_Enum.REVIEW_COUNTS].toString()) {
                        this.reviewCounts = response.DataVariable.toString();
                    }
                    else if (orgGrpParamName == AppParameters_Enum[AppParameters_Enum.PERFORM_MANUAL_COUNTS].toString()) {
                        this.performManualCounts = response.DataVariable.toString();
                    }
                    else if (orgGrpParamName == AppParameters_Enum[AppParameters_Enum.REVIEW_MANUAL_COUNTS].toString()) {
                        this.reviewManualCounts = response.DataVariable.toString();
                    }
                    else if (orgGrpParamName.toString() == "UPDATE_COUNTDATE_WEB") {
                        this.strUpdateCntDtWeb = response.DataVariable.toString();
                    }
                    else if (orgGrpParamName.toString() == AppParameters_Enum[AppParameters_Enum.EVENT_ALLOCATION].toString()) {
                        this.strEventAllocation = response.DataVariable.toString();
                    }
                    else {
                        return;
                    }

                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "orgGroupParamValue")
        }
    }

    async  bindUserOrgGroups(blnresult) {
        try {
            await this.atParCommonService.getUserOrgGroups(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>;
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.orgGroupData = data.DataList;
                            if (this.orgGroupData.length == 1) {
                                this.blnShowOrgGroupLabel = true;
                                this.orgGrpIDData = this.orgGroupData[0].ORG_GROUP_ID + " - " + this.orgGroupData[0].ORG_GROUP_NAME;
                                this.orgGrpID = this.orgGroupData[0].ORG_GROUP_ID;
                                this.lstUsers = [];
                                this.lstEvents = [];
                                this.lstRecntUsers = [];
                                this.lstUsers.push({ label: "Select User", value: "Select User" });
                                this.lstEvents.push({ label: "Select EventId", value: "Select EventId" });
                                this.lstRecntUsers.push({ label: "Select User", value: "Select User" });
                                this.populateData(blnresult);
                                this.spinnerService.stop();
                                break;
                            }
                            else if (this.orgGroupData.length > 1) {
                                this.blnShowOrgGroupID = true;
                                this.lstBunit = [];
                                this.lstUsers = [];
                                this.lstEvents = [];
                                this.lstRecntUsers = [];
                                this.lstBunit.push({ label: "Select BUnit", value: "Select BUnit" });
                                this.lstUsers.push({ label: "Select User", value: "Select User" });
                                this.lstEvents.push({ label: "Select EventId", value: "Select EventId" });
                                this.lstRecntUsers.push({ label: "Select User", value: "Select User" });
                                this.lstOrgGroups = [];
                                this.lstOrgGroups.push({ label: "Select One", value: "Select One" })
                                for (var i = 0; i < this.orgGroupData.length; i++) {
                                    if (this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                        this.lstOrgGroups.push({ label: this.orgGroupData[i].ORG_GROUP_ID + "-" + this.orgGroupData[i].ORG_GROUP_NAME, value: this.orgGroupData[i].ORG_GROUP_ID })
                                    }
                                }
                                this.spinnerService.stop();
                                break;
                            }
                            break;
                        }
                        case StatusType.Warn: {

                            this.spinnerService.stop();
                            if (blnresult) {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            }
                            break;
                        }
                        case StatusType.Error: {
                            this.spinnerService.stop();
                            if (blnresult) {
                                this.growlMessage = [];

                                this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            }
                            break;
                        }
                        case StatusType.Custom: {
                            this.spinnerService.stop();
                            if (blnresult) {
                                this.growlMessage = [];

                                this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            }
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindUserOrgGroups");
        }
    }

    async populateData(blnresult) {
        try {
            await this.populateBusinessUnits(blnresult);
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "populateData");
        }
    }

    async populateBusinessUnits(blnresult) {
        if (blnresult != false) {
            this.growlMessage = [];
        }
        this.spinnerService.start();
        if (this.blnShowOrgGroupLabel == true) {
            this.orgGroupIDForDBUpdate = this.orgGrpID;
        }
        else {
            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
        }

        if (this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select One" || this.orgGroupIDForDBUpdate == undefined) {
            this.spinnerService.stop();
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
            return;
        }
        this.lstBunit = [];
        this.lstBunit.push({ label: "Select BUnit", value: "Select BUnit" });
        try {
            await this.atParCommonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, BusinessType.Inventory).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUP_BUNITS>;
                    if (blnresult != false) {
                        this.growlMessage = [];
                    }
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.bunitsData = data.DataList;
                            for (let i = 0; i < this.bunitsData.length; i++) {
                                this.lstBunit.push({
                                    label: this.bunitsData[i],
                                    value: this.bunitsData[i]
                                })
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.spinnerService.stop();
                            this.growlMessage = [];
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
            this.clientErrorMsg(ex, "populateBusinessUnits");
        }
    }

    async  bindUsersList() {
        try {
            if (this.blnShowOrgGroupLabel == true) {
                this.orgGroupIDForDBUpdate = this.orgGrpID;
            }
            else {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            }
            this.lstUsers = [];
            this.lstUsers.push({ label: "Select User", value: "Select User" });
            this.spinnerService.start();
            await this.atParCommonService.getUsersList(this.deviceTokenEntry[TokenEntry_Enum.UserID], 3, this.orgGroupIDForDBUpdate)
                .catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_USER>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.userDataList = data.DataList;
                            for (let i = 0; i < data.DataList.length; i++) {
                                this.lstUsers.push({
                                    label: data.DataList[i].FULLNAME,
                                    value: data.DataList[i].USER_ID
                                })
                            }
                            this.spinnerService.stop();
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
            this.clientErrorMsg(ex, "bindUsersList");
        }

    }

    async ddlOrgGrpIdChanged() {
        try {
            this.growlMessage = [];
            this.showgrid = false;
            this.lstBunit = [];
            this.lstBunit.push({ label: "Select BUnit", value: "Select BUnit" });

            if (this.selectedOrgGroupId == "Select One") {
                this.lstUsers = [];
                this.lstUsers.push({ label: "Select User", value: "Select User" });

                this.lstEvents = [];
                this.lstEvents.push({ label: "Select EventId", value: "Select EventId" });

                this.lstRecntUsers = [];
                this.lstRecntUsers.push({ label: "Select User", value: "Select User" });

                return;
            }
            else {
                this.spinnerService.start();
                this.selectedBunit = "Select BUnit";
                this.selectedUser = "Select User";
                this.selectedEvent = "Select EventId";
                await this.populateBusinessUnits(true);
                this.spinnerService.stop();
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ddlOrgGrpIdChanged");
        }
    }

    async  ddlBUnitChanged() {
        try {
            this.growlMessage = [];
            this.lstEvents = [];
            this.showgrid = false;
            this.selectedUser = "Select User";
            this.lstEvents.push({ label: "Select EventId", value: "Select EventId" });

            if ((this.selectedBunit != "Select BUnit") && (this.selectedBunit != undefined) && (this.selectedBunit != '')) {
                await this.populateUsersList();
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ddlBUnitChanged");
        }
    }

    async  ddlUsersChanged() {
        try {
            this.growlMessage = [];
            this.lstEvents = [];
            this.showgrid = false;
            this.lstEvents.push({ label: "Select EventId", value: "Select EventId" });

            if ((this.selectedUser != "Select User") && (this.selectedUser != undefined) && (this.selectedUser != '')) {
                this.populateEventIds();

                this.populateReCntUsers();


            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ddlUsersChanged");
        }
    }
    ddlEventIDChanged() {
        this.showgrid = false;
    }
    async populateUsersList() {
        try {
            if (this.blnShowOrgGroupLabel) {
                this.orgGroupIDForDBUpdate = this.orgGrpID;
            }
            else if (this.blnShowOrgGroupID) {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            }
            this.spinnerService.start();
            await this.atParCommonService.getUsersList(this.deviceTokenEntry[TokenEntry_Enum.UserID], EnumApps.CycleCount, this.orgGroupIDForDBUpdate).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_USER>;
                    this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.lstUsers = [];
                            this.lstUsers.push({ label: "Select User", value: "Select User" });
                            for (var i = 0; i < data.DataList.length; i++) {
                                this.lstUsers.push({ label: data.DataList[i].FULLNAME, value: data.DataList[i].USER_ID });
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
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "populateUsersList");
        }
    }

    async populateReCntUsers() {
        try {
            if (this.blnShowOrgGroupLabel == true) {
                this.orgGroupIDForDBUpdate = this.orgGrpID;
            }
            else {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            }

            this.lstRecntUsers = [];
            this.lstRecntUsers.push({ label: "Select User", value: "Select User" });
            await this.reviewCountsService.getReCountUsersList(EnumApps.CycleCount, this.orgGroupIDForDBUpdate)
                .catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_USER>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.recntUserDataList = data.DataList;
                            if (this.recntUserDataList.length > 0) {
                                for (let i = 0; i < data.DataList.length; i++) {
                                    this.lstRecntUsers.push({
                                        label: data.DataList[i].FULLNAME,
                                        value: data.DataList[i].USER_ID
                                    })
                                }
                                this.lstRecntUsers = this.lstRecntUsers.filter(a => a.value != this.selectedUser);
                                this.selectedRecntUser = this.lstRecntUsers[0].value;
                            }
                            this.spinnerService.stop();
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
            this.clientErrorMsg(ex, "populateReCntUsers");
        }
    }

    populateEventIds() {
        try {
            if (this.blnShowOrgGroupLabel == true) {
                this.orgGroupIDForDBUpdate = this.orgGrpID;
            }
            else {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            }

            this.lstEvents = [];
            this.lstEvents.push({ label: "Select EventId", value: "Select EventId" });
            this.spinnerService.start();


            this.reviewCountsService.getReviewCountsEventIds(this.selectedBunit, this.selectedUser)
                .subscribe((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_CYCT_EVENT_HDR>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.lstEventId = data.DataList;
                            if (this.lstEventId.length > 0) {
                                if (this.performManualCounts != "" && this.performManualCounts != undefined) {
                                    if (this.reviewCounts == YesNo_Enum[YesNo_Enum.Y] && this.performManualCounts == YesNo_Enum[YesNo_Enum.Y] && this.reviewManualCounts == YesNo_Enum[YesNo_Enum.Y]) {
                                        for (var item in this.lstEventId) {
                                            this.lstEvents.push({ label: this.lstEventId[item].EVENT_ID, value: this.lstEventId[item].EVENT_ID });
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
                                                this.lstEvents.push({ label: drEvents[item].EVENT_ID, value: drEvents[item].EVENT_ID });
                                            }
                                        }
                                        else {
                                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No events available to review the counts" });
                                        }
                                    }
                                }
                                else {
                                    for (var item in this.lstEventId) {
                                        this.lstEvents.push({ label: this.lstEventId[item].EVENT_ID, value: this.lstEventId[item].EVENT_ID });
                                    }
                                }
                            }
                            this.spinnerService.stop();
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

            this.selectedEvent = "Select EventId";
        }
        catch (ex) {
            this.clientErrorMsg(ex, "populateEventIds");
        }
    }

    async btnSend_Click() {
        this.growlMessage = [];
        let statusCode: number = -1;
        this.isSend = true;
        try {

            for (let i = 0; i < this.lstEventDetails.length; i++) {

                if (this.lstEventDetails[i].COUNT_QTY == undefined || this.lstEventDetails[i].COUNT_QTY == null) {
                    this.growlMessage.push({
                        severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Few of the items are not counted, please count them to send to ERP "
                    });
                    this.isSend = false;
                    return;
                }
                if (this.lstEventDetails[i].COUNT_QTY.toString() == '') {
                    this.growlMessage.push({
                        severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Few of the items are not counted, please count them to send to ERP "
                    });
                    this.isSend = false;
                    return;
                }
            }
            if ((this.blnRecntUsers) && (this.selectedRecntUser != '' && this.selectedRecntUser != "Select User")) {
                statusCode = await this.UpdateReviewCountEvent(this.selectedRecntUser);
            }
            else {
                statusCode = await this.UpdateReviewCountEvent("");
            }

            if (statusCode != AtparStatusCodes.ATPAR_OK) {
                this.isSend = false;
                return;
            }
            this.spinnerService.start()
            this.reviewCountsService.SendRevCntEvntsToERP(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.selectedUser, this.selectedBunit, this.selectedEvent, this.lstEventDetails,
                this.deviceTokenEntry[TokenEntry_Enum.ProfileID], this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID])
                .catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<number>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.spinnerService.stop();
                            this.growlMessage.push({
                                severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Review Counts Sent Successfully "
                            });
                            this.showgrid = false;
                            this.lstEvents = [];
                            this.lstEvents.push({ label: "Select EventId", value: "Select EventId" });
                            this.selectedEvent = "Select EventId";
                            this.selectedBunit = "Select BUnit";
                            this.selectedUser = "Select User";
                            this.selectedRecntUser = "Select User";
                            if (this.blnShowOrgGroupID) {
                                this.selectedOrgGroupId = "Select One";
                            }
                            this.isSend = false;
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.isSend = false;
                            if (data.StatusCode == AtparStatusCodes.S_EVENT_PROCESSED_INERP) {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Event already processed in the ERP and cannot upload the counts " });
                            }
                            else if (data.StatusCode == AtparStatusCodes.ATPAR_E_NO_ERP_USER_ID) {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "ERP User Id required to upload to server " });
                            }
                            else if (data.StatusCode != AtparStatusCodes.ATPAR_OK) {
                                if (data.DataVariable.toString() != '' && data.DataVariable.toString() != null) {
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.DataVariable.toString() });
                                }
                            }
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.isSend = false;
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
            this.isSend = false;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnSend_Click");
        }
    }

    async btnSubmit_Click() {
        this.growlMessage = [];
        let statusCode: number = -1;
        let blnIsParentEvent: boolean = false;

        try {
            this.spinnerService.start();
            if ((this.blnRecntUsers) && (this.selectedRecntUser != '' && this.selectedRecntUser != "Select User")) {
                blnIsParentEvent = await this.CheckIfSplitEvntIsPartEvnt();
            }
            if (blnIsParentEvent) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select the split event to assign/unassign recount to another user." });
                return;
            }
            for (let index in this.lstEventDetails) {
                if (this.hdnProfEditTxt == 'Y') {
                    if (this.lstEventDetails[index].ACTUAL_COUNT_QTY != this.lstEventDetails[index].COUNT_QTY) {
                        let _dblConvertRate: number;
                        this.lstEventDetails[index].COUNT_USER_ID = this.deviceTokenEntry[TokenEntry_Enum.UserID];
                        if (this.strUpdateCntDtWeb == YesNo_Enum[YesNo_Enum.Y.toString()]) {
                            var dateStr = new Date().toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');

                            this.lstEventDetails[index].UPDATE_DATE = dateStr.replace(',', '').toString();
                        }
                        if (this.lstEventDetails[index].COUNT_QTY1 == 0 && this.lstEventDetails[index].COUNT_QTY2 == 0) {
                            this.lstEventDetails[index].COUNT_QTY1 = this.lstEventDetails[index].COUNT_QTY;
                            this.lstEventDetails[index].COUNT_QTY2 = 0;
                        } else if (this.lstEventDetails[index].COUNT_QTY1 == 0) {
                            _dblConvertRate = (this.lstEventDetails[index].COUNT_QTY - this.lstEventDetails[index].COUNT_QTY1) / this.lstEventDetails[index].COUNT_QTY2;
                            this.lstEventDetails[index].COUNT_QTY1 = (this.lstEventDetails[index].COUNT_QTY % _dblConvertRate);
                            this.lstEventDetails[index].COUNT_QTY2 = (this.lstEventDetails[index].COUNT_QTY / _dblConvertRate);

                        } else if (this.lstEventDetails[index].COUNT_QTY2 == 0) {
                            this.lstEventDetails[index].COUNT_QTY1 = this.lstEventDetails[index].COUNT_QTY;
                            this.lstEventDetails[index].COUNT_QTY2 = 0;
                        } else {
                            _dblConvertRate = (this.lstEventDetails[index].COUNT_QTY - this.lstEventDetails[index].COUNT_QTY1) / this.lstEventDetails[index].COUNT_QTY2;
                            this.lstEventDetails[index].COUNT_QTY1 = (this.lstEventDetails[index].COUNT_QTY % _dblConvertRate);
                            this.lstEventDetails[index].COUNT_QTY2 = (this.lstEventDetails[index].COUNT_QTY / _dblConvertRate);

                        }

                    }
                }
                if (this.lstEventDetails[index].checkEnable) {

                    if (this.lstEventDetails[index].RECOUNTCHECK_FLAG == true) {
                        if ((this.blnRecntUsers) && (this.selectedRecntUser != '' && this.selectedRecntUser != "Select User" && this.selectedRecntUser != null)) {
                            this.lstEventDetails[index].RECOUNT_FLAG = 'Y';
                            this.lstEventDetails[index].RECOUNT_USER_ID = this.selectedRecntUser;
                        }
                        else {
                            if (this.lstEventDetails[index].RECOUNT_USER_ID == '' || this.lstEventDetails[index].RECOUNT_USER_ID == null) {
                                this.lstEventDetails[index].RECOUNT_FLAG = 'Y';
                                this.lstEventDetails[index].RECOUNT_USER_ID = this.selectedUser;
                            }

                        }
                    }
                    else if (this.lstEventDetails[index].RECOUNTCHECK_FLAG == false) {
                        this.lstEventDetails[index].RECOUNT_FLAG = 'N';
                        this.lstEventDetails[index].RECOUNT_USER_ID = '';
                    }
                    if (this.lstEventDetails[index].ACTUAL_RECOUNT_FLAG != this.lstEventDetails[index].RECOUNT_FLAG) {
                        this.lstEventDetails[index].COUNT_USER_ID = this.deviceTokenEntry[TokenEntry_Enum.UserID];
                    }
                }
                if (this.lstEventDetails[index].COUNT_QTY != null && this.lstEventDetails[index].COUNT_QTY != undefined) {
                    this.lstEventDetails[index].REALVALUEDIFF = (this.lstEventDetails[index].COUNT_QTY.toString() != '') ? Math.abs(Math.round(this.lstEventDetails[index].COUNT_QTY - this.lstEventDetails[index].LATEST_SYSQTY) * this.lstEventDetails[index].ITEM_PRICE) : -1;
                }
                else {
                    this.lstEventDetails[index].REALVALUEDIFF = -1
                }
            }

            if ((this.blnRecntUsers) && (this.selectedRecntUser != '' && this.selectedRecntUser != "Select User")) {
                statusCode = await this.UpdateReviewCountEvent(this.selectedRecntUser);
            }
            else {

                statusCode = await this.UpdateReviewCountEvent("");
            }
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnSubmit_Click");
        }
    }

    async UpdateReviewCountEvent(selectedRecntUser): Promise<number> {
        let StatusCode: number = -1;
        try {
            this.spinnerService.start();
            await this.reviewCountsService.UpdateReviewCountEvent(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.selectedBunit, this.selectedEvent, this.lstEventDetails, this.selectedUser, selectedRecntUser)
                .catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_CYCT_EVENT_HDR>;
                    this.growlMessage = [];
                    this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            StatusCode = AtparStatusCodes.ATPAR_OK;
                            this.ErrMsg = data.DataDictionary["pErrorMsg"];
                            if (this.ErrMsg != "" && this.ErrMsg != null) {
                                this.growlMessage.push({
                                    severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.ErrMsg
                                });
                                this.showgrid = false;
                                this.selectedEvent = "Select EventId";
                                this.selectedBunit = "Select BUnit";
                                this.selectedUser = "Select User";
                                this.selectedRecntUser = "Select User";
                                if (this.blnShowOrgGroupID) {
                                    this.selectedOrgGroupId = "Select One";
                                }
                                return;
                            }
                            else {
                                if (!this.isSend) {
                                    this.lstEventDetails = data.DataDictionary["pDsReviewCountDtls"]["Table1"];
                                    this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Review Counts Updated Successfully " });
                                    this.showgrid = false;
                                    this.selectedEvent = "Select EventId";
                                    this.selectedBunit = "Select BUnit";
                                    this.selectedUser = "Select User";
                                    this.selectedRecntUser = "Select User";
                                    if (this.blnShowOrgGroupID) {
                                        this.selectedOrgGroupId = "Select One";
                                    }
                                }

                            }
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            StatusCode = data.StatusCode;
                            if (StatusCode == AtparStatusCodes.S_CYCT_RECOUNT_USER) {
                                this.growlMessage.push({
                                    severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Highlighted records are already assigned for recount to user:" + this.selectedRecntUser + " Please uncheck and submit."
                                });
                                return;
                            }
                            else {
                                this.growlMessage.push({
                                    severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage
                                });
                            }
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            StatusCode = data.StatusCode;
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            StatusCode = data.StatusCode;
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
            return StatusCode;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "UpdateReviewCountEvent");
        }
    }

    async CheckIfSplitEvntIsPartEvnt(): Promise<boolean> {
        let blnIsParentEvent: boolean = false;
        try {
            await this.reviewCountsService.CheckIfSplitEvntIsPartEvnt(this.selectedBunit, this.selectedEvent)
                .catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_CYCT_EVENT_HDR>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            blnIsParentEvent = <boolean><Boolean>data.DataVariable;
                            this.spinnerService.stop();
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
            return blnIsParentEvent;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "CheckIfSplitEvntIsPartEvnt");
        }
    }

    async btnGo_Click() {
        try {
            this.growlMessage = [];
            this.showgrid = false;
            this.rctFlag = false;
            if (this.blnShowOrgGroupLabel == true) {
                this.orgGroupIDForDBUpdate = this.orgGrpID;
            }
            else {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            }

            if (this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select One" || this.orgGroupIDForDBUpdate == undefined) {
                this.spinnerService.stop();
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                return;
            }

            /////Bunit 
            if (this.selectedBunit == null || this.selectedBunit == "" || this.selectedBunit == "Select BUnit" || this.selectedBunit == undefined) {
                this.spinnerService.stop();
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company" });
                return;
            }

            ///UserID
            if (this.selectedUser == null || this.selectedUser == "" || this.selectedUser == "Select User" || this.selectedUser == undefined) {
                this.spinnerService.stop();
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select User ID" });
                return;
            }

            /// event id 
            if (this.selectedEvent == null || this.selectedEvent == "" || this.selectedEvent == "Select EventId" || this.selectedEvent == undefined) {
                this.spinnerService.stop();
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Event ID" });
                return;
            }

            this.spinnerService.start();
            await this.BindEventDetails();
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnGo_Click");
        }
    }


    async BindEventDetails() {
        let statusCode: number = -1;
        try {
            await this.reviewCountsService.CheckIfEventHasMultipleTransactions(this.selectedEvent, this.selectedBunit, this.selectedUser)
                .catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_USER>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            statusCode = AtparStatusCodes.ATPAR_OK;
                            this.flgBtnEnable = data.DataVariable.toString();
                            this.spinnerService.stop();
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
            this.clientErrorMsg(ex, "BindEventDetails");
        }

        if (this.selectedRecntUser != null && this.selectedRecntUser != "" && this.selectedRecntUser != "Select User" && this.selectedRecntUser != undefined) {
            try {
                this.spinnerService.start();
                await this.reviewCountsService.getReviewCountEventDetails(this.selectedBunit, this.selectedEvent, this.selectedUser, this.selectedRecntUser)
                    .catch(this.httpService.handleError).then(async (res: Response) => {
                        let data = res.json() as AtParWebApiResponse<MT_ATPAR_USER>;
                        this.growlMessage = [];
                        switch (data.StatType) {
                            case StatusType.Success: {
                                statusCode = AtparStatusCodes.ATPAR_OK;
                                this.flgParentEvent = data.DataDictionary["pflgParentEvent"].toString();
                                this.recCount = data.DataDictionary["precCount"].toString();
                                this.lstEventDetails = data.DataDictionary["pDsDetails"]["DETAILS"];
                                this.Users = data.DataDictionary["pDsDetails"]["Table2"];
                                if (this.lstEventDetails.length > 0) {
                                    await this.gridBound();
                                }
                                else {
                                    this.selectedBunit = "Select BUnit";
                                    this.lstUsers = [];
                                    this.lstEvents = [];
                                    this.lstRecntUsers = [];
                                    this.lstUsers.push({ label: "Select User", value: "Select User" });
                                    this.lstEvents.push({ label: "Select EventId", value: "Select EventId" });
                                    this.lstRecntUsers.push({ label: "Select User", value: "Select User" });
                                    this.selectedEvent = "Select EventId";
                                    this.selectedUser = "Select User";
                                    this.selectedRecntUser = "Select User";
                                    statusCode = AtparStatusCodes.E_NORECORDFOUND;
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                                    this.showgrid = false;
                                    return;
                                }
                                this.spinnerService.stop();
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
                this.clientErrorMsg(ex, "BindEventDetails");
            }
        }
        else {

            try {
                this.spinnerService.start();
                await this.reviewCountsService.getReviewCountEventDetails(this.selectedBunit, this.selectedEvent, this.selectedUser, "0", )
                    .catch(this.httpService.handleError).then(async (res: Response) => {
                        let data = res.json() as AtParWebApiResponse<MT_ATPAR_USER>;
                        this.growlMessage = [];
                        switch (data.StatType) {
                            case StatusType.Success: {
                                statusCode = AtparStatusCodes.ATPAR_OK;
                                this.lstEventDetails = data.DataDictionary["pDsDetails"]["DETAILS"];
                                this.Users = data.DataDictionary["pDsDetails"]["Table2"];
                                this.flgParentEvent = data.DataDictionary["pflgParentEvent"].toString();
                                this.recCount = data.DataDictionary["precCount"].toString();
                                if (this.lstEventDetails.length > 0) {
                                    await this.gridBound();
                                }
                                else {
                                    statusCode = AtparStatusCodes.E_NORECORDFOUND;
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                                    this.showgrid = false;
                                    this.spinnerService.stop();
                                    return;
                                }
                                this.spinnerService.stop();
                                break;
                            }
                            case StatusType.Warn: {
                                statusCode = data.StatusCode;
                                this.spinnerService.stop();
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                break;
                            }
                            case StatusType.Error: {
                                statusCode = data.StatusCode;
                                this.spinnerService.stop();
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                break;
                            }
                            case StatusType.Custom: {
                                statusCode = data.StatusCode;
                                this.spinnerService.stop();
                                this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                break;
                            }
                        }
                    });
            }
            catch (ex) {
                this.clientErrorMsg(ex, "BindEventDetails");
            }
        }

        if (statusCode == AtparStatusCodes.ATPAR_OK) {
            try {
                this.spinnerService.start();
                await this.reviewCountsService.getUser_Date(this.selectedBunit, this.selectedEvent, this.selectedUser)
                    .catch(this.httpService.handleError).then((res: Response) => {
                        let data = res.json() as AtParWebApiResponse<MT_ATPAR_USER>;
                        this.growlMessage = [];
                        switch (data.StatType) {
                            case StatusType.Success: {
                                this._strUserId = data.DataDictionary["updateUserId"].toString();

                                this._strDateTime = data.DataDictionary["updateDtTime"].toString();
                                if (this._strDateTime == null || this._strDateTime == '') {
                                    this._strDateTime = new Date().toDateString();
                                }
                                if (this.Users.length > 0) {
                                    if (this.Users[0].Users != null) {
                                        let _strArray = this.Users[0].Users.toString().split(",");
                                        if (_strArray.length > 2) {
                                            this.lblEventAllocUsers = _strArray[0] + "," + _strArray[1] + "....";
                                            this.lblEventAllocUsersToolTip = this.Users[0].Users;
                                        } else {
                                            this.lblEventAllocUsers = this.Users[0].Users;
                                            this.lblEventAllocUsersToolTip = this.Users[0].Users;
                                        }
                                    }
                                }
                                this.showgrid = true;
                                this.spinnerService.stop();
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
                this.clientErrorMsg(ex, "BindEventDetails");
            }
        }
        if (statusCode == AtparStatusCodes.ATPAR_OK) {
            if (this.flgParentEvent == "visible") {
                if (this.flgBtnEnable == "enable") {

                    this.flgParentEvent = "visible"
                }
                else if (this.flgBtnEnable == "disable") {
                    this.flgParentEvent = "hidden"
                }
            }
            if (this.flgParentEvent == "hidden" || this.recCount == YesNo_Enum[YesNo_Enum.Y.toString()]) {
                this.btnUpload = false;
            }
            else if (this.flgParentEvent == "visible" || this.recCount == YesNo_Enum[YesNo_Enum.N.toString()]) {
                this.btnUpload = true
            }
        }
    }


    switch_Click() {
        for (let index in this.lstEventDetails) {
            if (this.rctFlag) {

                if (this.lstEventDetails[index].checkEnable == false) {
                    //It doesn't check the checkbox because it's already in disable mode
                }
                else {
                    this.lstEventDetails[index].RECOUNTCHECK_FLAG = true;
                    //It Means we can change the checkbox value to true because not in disable mode
                }

            } else {

                if (this.lstEventDetails[index].checkEnable == false) {
                    //It doesn't uncheck the checkbox because already in disable mode
                }
                else {
                    this.lstEventDetails[index].RECOUNTCHECK_FLAG = false;
                    //It Means we can change the checkbox value to false because not in disable mode
                }

            }
        }

    }

    switch_changed() {
        let gridLength = 0;
        let filterChecks = 0;
        gridLength = this.lstEventDetails.length
        filterChecks = this.lstEventDetails.filter(a => a.RECOUNTCHECK_FLAG == true).length;
        if (gridLength == filterChecks) {
            this.rctFlag = true;

        }
        else {
            this.rctFlag = false;
        }
    }

    focusEvent(event, ven) {
        if (event) {

            this.changedTextBoxVal = ven;
        } else { this.focusOutEvent(ven) }

    }
    focusOutEvent(ven) {
        if (this.changedTextBoxVal != ven.COUNT_QTY) {
            let _dblConvertRate: number;
            ven.COUNT_USER_ID = this.deviceTokenEntry[TokenEntry_Enum.UserID];
            if (ven.COUNT_QTY1 == 0 && ven.COUNT_QTY2 == 0) {
                ven.COUNT_QTY1 = ven.COUNT_QTY;
                ven.COUNT_QTY2 = 0;
            } else if (ven.COUNT_QTY1 == 0) {
                _dblConvertRate = (ven.COUNT_QTY - ven.COUNT_QTY1) / ven.COUNT_QTY2;
                ven.COUNT_QTY1 = (ven.COUNT_QTY % _dblConvertRate);
                ven.COUNT_QTY2 = (ven.COUNT_QTY / _dblConvertRate);

            } else if (ven.COUNT_QTY2 == 0) {
                ven.COUNT_QTY1 = ven.COUNT_QTY;
                ven.COUNT_QTY2 = 0;
            } else {
                _dblConvertRate = (ven.COUNT_QTY - ven.COUNT_QTY1) / ven.COUNT_QTY2;
                ven.COUNT_QTY1 = (ven.COUNT_QTY % _dblConvertRate);
                ven.COUNT_QTY2 = (ven.COUNT_QTY / _dblConvertRate);

            }

        }
    }
    //customSort(event) {
    //    try {
    //        this.blnSortByColumn = !this.blnSortByColumn;
    //        this.lstEventDetails = this.lstEventDetails.sort(function (a, b) {
    //            if (a["Valdiffs"] < b["Valdiffs"])
    //                return -1;
    //            if (a["Valdiffs"] > b["Valdiffs"])
    //                return 1;
    //            return 0;
    //        });
    //        if (this.blnSortByColumn == false) {
    //            this.lstEventDetails = this.lstEventDetails.reverse();
    //        }
    //    }
    //    catch (ex) {
    //        this.clientErrorMsg(ex, "customSort");
    //    }
    //}
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

            this.lstEventDetails = this.lstEventDetails.sort(function (a, b) {
                if (parseFloat(a[elementname]) < parseFloat(b[elementname]))
                    return -1;
                if (parseFloat(a[elementname]) > parseFloat(b[elementname]))
                    return 1;
                return 0;
            });


            if (this.blnSortByColumn == false) {
                this.lstEventDetails = this.lstEventDetails.reverse();
            }

        }
        catch (ex) {
            this.clientErrorMsg(ex, "customSort");
        }

    }
    gridBound() {
        let itemCount = 0;
        let intCntQty = 0;
        let ItmValueDiff: number = 0;
        let ItmCountDiffernce: number = 0;
        this.totalItems = "";
        try {
            for (let item in this.lstEventDetails) {
                itemCount++;
                if (this.lstEventDetails[item].RECOUNT_FLAG == 'Y') {
                    this.lstEventDetails[item].RECOUNTCHECK_FLAG = true;
                } else {
                    this.lstEventDetails[item].RECOUNTCHECK_FLAG = false;
                }
                let LblItemId_forecolor = this.lstEventDetails[item].INV_ITEM_ID;
                let LblItemNo_forecolor = this.lstEventDetails[item].CUST_ITEM_NO;
                let LblLot_forecolor = this.lstEventDetails[item].INV_LOT_ID;
                let LblSerial_forecolor = this.lstEventDetails[item].SERIAL_ID;
                let lblDiscription_forecolor = this.lstEventDetails[item].DESCRIPTION;
                let lblSTORLOC_forecolor = this.lstEventDetails[item].STORLOC;
                let lblUOM_forecolor = this.lstEventDetails[item].UNIT_OF_MEASURE;
                let lblSysQty_forecolor = this.lstEventDetails[item].LATEST_SYSQTY;
                let lblCntDiff_forecolor = this.lstEventDetails[item].COUNT_QTY - this.lstEventDetails[item].LATEST_SYSQTY;
                let lblDiffQty_forecolor = Math.round(parseFloat((((this.lstEventDetails[item].COUNT_QTY - this.lstEventDetails[item].LATEST_SYSQTY) * 100) / this.lstEventDetails[item].LATEST_SYSQTY).toFixed(2)))
                let lblItmPrice_forecolor = this.lstEventDetails[item].ITEM_PRICE;
                let lblValDifference_forecolor = this.lstEventDetails[item].VALUEDIFF;
                let lblUSERNAME_forecolor = this.lstEventDetails[item].USERNAME;
                let lblReCntUserName_forecolor = this.lstEventDetails[item].RECOUNT_USER_NAME;
                let txtCntQty_forecolor = this.lstEventDetails[item].COUNT_QTY;
                let lblmfgitmid_forecolor = this.lstEventDetails[item].MFG_ITEM_ID;
                let lblConsignedFlag = this.lstEventDetails[item].CONSIGNED_FLAG;
                let lblLotOrSerial = this.lstEventDetails[item].L_S_CONTROLLED;
                let lblEventType = this.lstEventDetails[item].EVENT_TYPE;
                let lblConvRate = this.lstEventDetails[item].CONVERSION_RATE;
                let lblUom = this.lstEventDetails[item].UNIT_OF_MEASURE;
                let lblSTDUOM = this.lstEventDetails[item].STD_PACK_UOM;

                if (this.lstEventDetails[item].CONSIGNED_FLAG == YesNo_Enum[YesNo_Enum.Y.toString()]) {

                    this.lstEventDetails[item].rowClsStyle = 'ui-datatable-green';
                }
                else {
                    if (this.lstEventDetails[item].L_S_CONTROLLED == 'L' || this.lstEventDetails[item].L_S_CONTROLLED == 'S' ||
                        this.lstEventDetails[item].L_S_CONTROLLED == 'B') {
                        this.lstEventDetails[item].rowClsStyle = 'ui-datatable-brown';
                    }
                }

                if (lblEventType == EventType.Manual) {
                    if (lblUom.toUpperCase() == lblSTDUOM.toUpperCase()) {
                        intCntQty = parseFloat(this.lstEventDetails[item].COUNT_QTY.toString());
                    } else {
                        intCntQty = parseFloat(txtCntQty_forecolor.toString()) * parseFloat(lblConvRate.toString());
                    }
                } else {
                    if (this.lstEventDetails[item].COUNT_QTY != undefined) {
                        intCntQty = parseFloat(this.lstEventDetails[item].COUNT_QTY.toString());
                    }

                }

                let intSysQty = parseFloat(this.lstEventDetails[item].LATEST_SYSQTY.toString());
                let itemPrice = parseFloat(this.lstEventDetails[item].ITEM_PRICE.toString());
                let lblReCountUser = this.lstEventDetails[item].RECOUNT_USER_ID

                if (lblReCountUser != '' && lblReCountUser != null) {
                    if (this.blnRecntUsers == true && (this.selectedRecntUser != "Select User" && this.selectedRecntUser != null && this.selectedRecntUser != '')) {
                        if (lblReCountUser == this.selectedRecntUser) {
                            this.lstEventDetails[item].checkEnable = true;
                            this.chkReCntFlag = true;
                        } else {
                            this.lstEventDetails[item].checkEnable = false;
                            this.chkReCntFlag = false;
                        }
                    } else if (lblReCountUser == this.selectedUser) {
                        this.lstEventDetails[item].checkEnable = true;
                        this.chkReCntFlag = true;
                    } else if (lblReCountUser != this.selectedUser) {
                        this.lstEventDetails[item].checkEnable = false;
                        this.chkReCntFlag = false;
                    } else {
                        this.lstEventDetails[item].checkEnable = true;
                        this.chkReCntFlag = true;
                    }
                } else {
                    this.lstEventDetails[item].checkEnable = true;
                    this.chkReCntFlag = true;
                }

                let ValDif = 0;
                if (intCntQty == -1) {
                    let lblValdiff = this.lstEventDetails[item].VALUEDIFF;
                    let lblValdiffp = lblDiffQty_forecolor;
                    let lblCntDiff1 = lblCntDiff_forecolor;
                } else if (intCntQty >= 0 && intCntQty != -1) {
                    ValDif = (intCntQty - intSysQty) * itemPrice;
                    let Valdiff = this.lstEventDetails[item].VALUEDIFF;
                    if (ValDif < 0) {
                        this.lstEventDetails[item].Valdiffd = "(" + Math.abs(ValDif).toFixed(2) + ")";
                        this.lstEventDetails[item].Valdiffs = parseFloat(Math.abs(ValDif).toFixed(2));
                    } else {
                        this.lstEventDetails[item].Valdiffd = ValDif.toString();
                        this.lstEventDetails[item].Valdiffs = ValDif;
                    }

                    ItmValueDiff = ItmValueDiff + ValDif;
                    let DiffPerc = (intCntQty - intSysQty) * 100 / intSysQty;
                    if (DiffPerc == 0) {
                        this.lstEventDetails[item].Valdiffp = "0";
                        this.lstEventDetails[item].CntDiff1 = "0";
                    } else if (DiffPerc < 0) {
                        ItmCountDiffernce = ItmCountDiffernce + 1;
                        this.lstEventDetails[item].Valdiffp = "(" + Math.abs(parseFloat(DiffPerc.toString())).toFixed(2) + ")";
                        if ((intCntQty - intSysQty) < 0) {
                            this.lstEventDetails[item].CntDiff1 = "(" + Math.abs(intCntQty - intSysQty) + ")";
                        }
                    } else {
                        ItmCountDiffernce = ItmCountDiffernce + 1;
                        if (intSysQty == 0) {
                            this.lstEventDetails[item].Valdiffp = "0";
                        } else {
                            this.lstEventDetails[item].Valdiffp = DiffPerc.toFixed(2);
                        }
                        this.lstEventDetails[item].CntDiff1 = (intCntQty - intSysQty).toFixed(2);
                    }
                }
                this.lstEventDetails[item].COUNT_QTY = this.lstEventDetails[item].COUNT_QTY == -1 ? undefined : this.lstEventDetails[item].COUNT_QTY;
            }
            this.totalItems = " <b>Total # Of Items  :</b> <span><font color='#6c276a'>" + itemCount.toString() +
                "</font></span><b> Sum Of Value Difference  :</b> &nbsp;<span><font color='#6c276a'>" + ItmValueDiff.toFixed(2)
                + "</font></span> <b># of items with difference</b>  <span><font color='#6c276a'>" + ItmCountDiffernce.toString() + "</font></span>";

            this.switch_changed();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "gridBound");
        }
    }

    bindModelDataChange(ven) {
        this.growlMessage = [];
        try {
            if (ven.SERIAL_CONTROLLED == 'Y') {
                if (ven.COUNT_QTY > 1) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Qty cannot be greater than 1 for serial item" });
                    ven.COUNT_QTY = '';
                }
            }
            else {

            }


        } catch (exMsg) {
            this.clientErrorMsg(exMsg, "bindModelDataChange");
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
            //        await this.atParCommonService.exportToExcel(html, "cyct-review-counts_", "cyct-review-counts_report")
            //            .then((res: Response) => {
            //                let data = res.json();
            //                statusCode = data.StatusCode;
            //                if (statusCode.toString() == AtparStatusCodes.ATPAR_OK.toString()) {
            //                    folderName = data.DataVariable.toString();
            //                    var filename = this.httpService.BaseUrl + '/Uploaded/' + folderName + '/cyct-review-counts_report.xls';
            //                    var query = '?download';
            //                    window.open(filename + query);
            //                }
            //                else {
            //                    this.growlMessage = [];
            //                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: 'Internal Server Error.' });
            //                }
            //            });

            //        await this.atParCommonService.deleteExcel(folderName, "cyct-review-counts_report")
            //            .then((res: Response) => {
            //            });
            //    } else {

            //        var a = document.createElement('a');
            //        var data_type = 'data:application/vnd.ms-excel';
            //        html = html.replace(/ /g, '%20');
            //        a.href = data_type + ', ' + html;
            //        a.download = 'cyct-review-counts_report.xls';
            //        a.click();
            //    }
            //}
            if (html != '' && html != null) {
                let blob = new Blob([html], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                });
                saveAs(blob, "mt_cyct-review-counts_report.xls");
            }
        } catch (ex) {

        }
        finally {
            this.spinnerService.stop();
        }
    }

    async onPrintClick(event) {
        try {
            this.growlMessage = [];
            event.stopImmediatePropagation();
            this.spinnerService.start();
            var html = await this.exportReportDetails('Print');
            if (html != '' && html != null) {
                var mywindow = window.open('', null, 'height=650,width=650,status=no,resizable=yes, scrollbars=yes, toolbar=no,location=center,menubar=no');
                if (mywindow != null && mywindow != undefined) {

                    mywindow.document.write('<html><head><style>@page{size:landscape;"}</style><title>' + 'Cycle Count - Review Counts' + '</title>');
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
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please set allow pop-ups for this site in your browser' });
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
                await this.atParCommonService.sendEmail(this.deviceTokenEntry[TokenEntry_Enum.SystemId], 'Review Counts', JSON.stringify(html), this.toMailAddr, MailPriority.Normal.toString(), '')
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

            imgserverPath = gstrProtocal + '://' + ipAddress + '/atpar/AtParWebApi/assets/images/';

            htmlBuilder = "<Table id='table1' align=center width=100% cellpadding=0 cellspacing = 0 vAlign=top>"
            htmlBuilder += "<tr><td>"
            if (reqType == "Print") {
                htmlBuilder += "<tr width='100%'><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height='63' nowrap><img height='63' src=" + imgserverPath + "logo.jpg></td><td align=left  width='85%' height='63' nowrap></td></TR>"
                htmlBuilder += "<tr><td height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE:8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></font></td>"
                htmlBuilder += "</tr><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=90% border=0><tr><td></td></tr>" +
                    "<tr><td colspan=5 align=left><span class=c2>Review Counts For Business Unit &nbsp;<b>" + this.selectedBunit + "</b> and EventID<b> " + this.selectedEvent + "</span></td></tr>"
                htmlBuilder = htmlBuilder + "<tr><td colspan=5 align=left>"
                if (this.lblEventAllocUsersToolTip != '') {
                    htmlBuilder += "<span class=c2>Users allocated to count / recount this event: " + this.lblEventAllocUsersToolTip + "</span>"
                }
                htmlBuilder += "</td><td align=right valign=top>&nbsp;"
                htmlBuilder += "<A  href=" + "javascript:window.print()" + "><img src=" + imgserverPath + "print.jpg></A>"
            }
            else if (reqType == "Excel") {
                htmlBuilder += "<tr width='100%' ><td colspan=2  align=left  height=63 width='100%' nowrap><img height='63' src=" + imgserverPath + "logo.jpg nowrap><img src=" + imgserverPath + "topbg.jpg width=100% height=63></td></tr>"
                htmlBuilder += "<tr><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE: 8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></font></td>"
                htmlBuilder += "</tr><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td colspan=6 ></td></tr>" +
                    "<tr><td colspan=6 align=left><span class=c2>Review Counts For Business Unit &nbsp;<b>" + this.selectedBunit + "</b> and EventID<b> " + this.selectedEvent + "</span></td></tr>"
                htmlBuilder = htmlBuilder + "<tr><td colspan=5 align=left>"
                if (this.lblEventAllocUsersToolTip != '') {
                    htmlBuilder += "<span class=c2>Users allocated to count / recount this event: " + this.lblEventAllocUsersToolTip + "</span>"
                }
                htmlBuilder += "</td><td align=right valign=top>&nbsp;"
            }
            else if (reqType == "Mail") {
                htmlBuilder += "<tr width='100%' ><td colspan=2 bgcolor='#fe9836' align=left  width='100%' height='63' nowrap><img height='63' src=" + imgserverPath + "logo.jpg></td></tr>"
                htmlBuilder += "<tr><TD height=27  vAlign=bottom width=100% align=left colspan=2><font size=1 style=" + "COLOR:#8b4513;FONT-FAMILY:verdana;FONT-SIZE: 8pt" + "><B>&nbsp;&nbsp;Mobile Supply Chain Execution<B></font></td>"
                htmlBuilder += "</tr><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2><table align=left width=100% border=0><tr><td colspan=6 ></td></tr>" +
                    "<tr><td colspan=6 align=left><span class=c2>Review Counts For Business Unit &nbsp;<b>" + this.selectedBunit + "</b> and EventID<b> " + this.selectedEvent + "</span></td></tr>"
                htmlBuilder = htmlBuilder + "<tr><td colspan=5 align=left>"
                if (this.lblEventAllocUsersToolTip != '') {
                    htmlBuilder += "<span class=c2>Users allocated to count / recount this event: " + this.lblEventAllocUsersToolTip + "</span>"
                }
                htmlBuilder += "</td><td align=right valign=top>&nbsp;"
            }

            htmlBuilder += "</td></tr><tr height=20></tr></table></td></tr></td><td> " +
                "<table align=center width=90% style=" + "BORDER-COLLAPSE:collapse" + " border=1>" +
                "<tr bgcolor=white><td colspan=17 align=left><b>" + this.totalItems + " </b></td></tr>" +
                "<tr bgcolor=#d3d3d3>" +
                "<td align=center nowrap><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif><b>Item ID</b></span></td>" +
                "<td align=center nowrap><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif><b>Custom Item NO</b></span></td>" +
                "<td align=center nowrap><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif><b>Lot</b></span></td>" +
                "<td align=center nowrap><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif><b>Serial</b></span></td>" +
                "<td align=center nowrap><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif><b>Mfg ID</b></span></td>" +
                "<td align=center nowrap><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif><b>Description</b></span></td>" +
                "<td align=center nowrap><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif><b>Storage Location</b></span></td>" +
                "<td align=center nowrap><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif><b>UOM</b></span></td>" +
                "<td align=center nowrap><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif><b>Count Qty</b></span></td>" +
                "<td align=center nowrap><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif><b>Sys Qty</b></span></td>" +
                "<td align=center nowrap><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif><b>Diff Count Qty</b></span></td>" +
                "<td align=center nowrap><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif><b>Diff Count Qty %</b></span></td>" +
                "<td align=center nowrap><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif><b>Price/ Item</b></span></td>" +
                "<td align=center nowrap><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif><b>Value Diff</b></span></td>" +
                "<td align=center nowrap><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif><b>Re count</b></span></td>" +
                "<td align=center nowrap><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif><b>Count User</b></span></td>" +
                "<td align=center nowrap><span style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif><b>Recount User</b></span></td>" +
                "</tr>"

            for (let row in this.lstEventDetails) {
                let ItemId = ''
                let lblSTORLOC = ''
                let strfontcolor = "None"
                let ChkValue = this.lstEventDetails[row].RECOUNTCHECK_FLAG;
                let TxtValue = this.lstEventDetails[row].COUNT_QTY;
                let LblSysQty = this.lstEventDetails[row].LATEST_SYSQTY
                if ((this.lstEventDetails[row].INV_ITEM_ID.trim() == '')) {
                    ItemId = this.lstEventDetails[row].INV_ITEM_ID;
                }
                else {
                    ItemId = "'" + this.lstEventDetails[row].INV_ITEM_ID
                }
                let ItemNo = this.lstEventDetails[row].CUST_ITEM_NO
                if (ItemNo == null) {
                    ItemNo = '';
                }
                let LotId = this.lstEventDetails[row].INV_LOT_ID
                let SerialId = this.lstEventDetails[row].SERIAL_ID
                let TransId = this.lstEventDetails[row].TRANSACTION_ID
                let ItemRecNum = this.lstEventDetails[row].ITEM_REC_NUM

                let lblMfgId = this.lstEventDetails[row].MFG_ITEM_ID
                let lblDiscription = this.lstEventDetails[row].DESCRIPTION
                let lblUOM = this.lstEventDetails[row].UNIT_OF_MEASURE
                if (this.lstEventDetails[row].STORLOC == '') {
                    lblSTORLOC = this.lstEventDetails[row].STORLOC;
                }
                else {
                    lblSTORLOC = "'" + this.lstEventDetails[row].STORLOC;
                }
                let lblCntDiff = this.lstEventDetails[row].CntDiff1
                let lblDiffQty = this.lstEventDetails[row].Valdiffp
                let lblItmPrice = this.lstEventDetails[row].ITEM_PRICE;
                let lblValDifference = this.lstEventDetails[row].Valdiffd;
                let lblUSERNAME = this.lstEventDetails[row].USERNAME;
                let lblReCntUser = this.lstEventDetails[row].RECOUNT_USER_NAME;
                let lblConsignedFlag = this.lstEventDetails[row].CONSIGNED_FLAG;
                let lblLotOrSerial = this.lstEventDetails[row].L_S_CONTROLLED;
                ;
                if (lblConsignedFlag == YesNo_Enum[YesNo_Enum.Y.toString()]) {
                    strfontcolor = "DarkGreen"
                }
                else {
                    if (lblLotOrSerial == "L" ||
                        lblLotOrSerial == "S" ||
                        lblLotOrSerial == "B") {
                        strfontcolor = "Brown"
                    }
                }
                htmlBuilder += "<tr>" +
                    "<td align=left nowrap><span class=c3 style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif;color:" + strfontcolor + ">" + ItemId + "</span></td>" +
                    "<td align=left nowrap><span class=c3 style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif;color:" + strfontcolor + ">" + ItemNo + "</span></td>" +
                    "<td align=left nowrap><span class=c3 style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif;color:" + strfontcolor + ">" + LotId + "</span></td>" +
                    "<td align=left nowrap><span class=c3 style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif;color:" + strfontcolor + ">" + SerialId + "</span></td>" +
                    "<td align=left nowrap><span class=c3 style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif;color:" + strfontcolor + ">" + lblMfgId + "</span></td>" +
                    "<td align=left nowrap><span class=c3 style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif;color:" + strfontcolor + ">" + lblDiscription + "</span></td>" +
                    "<td align=left nowrap><span class=c3 style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif;color:" + strfontcolor + ">" + lblSTORLOC + "</span></td>" +
                    "<td align=left nowrap><span class=c3 style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif;color:" + strfontcolor + ">" + lblUOM + "</span></td>" +
                    "<td align=right nowrap><span class=c3 style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif;color:" + strfontcolor + ">" + TxtValue + "</span></td>" +
                    "<td align=right nowrap><span class=c3 style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif;color:" + strfontcolor + ">" + LblSysQty + "</span></td>" +
                    "<td align=right nowrap><span class=c3 style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif;color:" + strfontcolor + ">" + lblCntDiff + "</span></td>" +
                    "<td align=right nowrap><span class=c3 style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif;color:" + strfontcolor + ">" + lblDiffQty + "</span></td>" +
                    "<td align=right nowrap><span class=c3 style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif;color:" + strfontcolor + ">" + lblItmPrice + "</span></td>" +
                    "<td align=right nowrap><span class=c3 style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif;color:" + strfontcolor + ">" + lblValDifference + "</span></td>" +
                    "<td bgcolor=#ffffff align='center'><span class=c2><input type=checkbox name=CB value=on "

                if (ChkValue == true)
                    htmlBuilder += "checked"

                htmlBuilder += "/></span></td><td align=left ><span class=c3 style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif;color:" + strfontcolor + ">" + lblUSERNAME + " </span></td>"
                htmlBuilder += "<td align=left ><span class=c3 style=FONT-SIZE:11px;font-family:Verdana,Geneva,sans-serif;color:" + strfontcolor + ">" + lblReCntUser + " </span></td></tr>"
            }
            htmlBuilder += "<tr bgcolor=white><td colspan=17 align=left><b>" + this.totalItems + "</b></td></tr></table>"
            htmlBuilder += "</td></tr></Table>"
            return htmlBuilder;
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
        this.userDataList = [];
        this.lstOrgGroups = [];
        this.eventIdDataList = [];
        this.lstBunit = [];
        this.lstEventDetails = [];
        this.lstEvents = [];
        this.lstOrgGroups = [];
        this.lstRecntUsers = [];
        this.lstUsers = []
        this.lstEventId = [];
        this.spinnerService.stop();
        this.recntUserDataList = []
        this.Users = [];
    }

}