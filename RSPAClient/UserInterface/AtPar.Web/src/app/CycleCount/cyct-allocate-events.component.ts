import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Message } from '../components/common/api';
import { LeftBarAnimationService } from '../Home/leftbar-animation.service';
import { Router } from '@angular/router';
import { HttpService } from '../Shared/HttpService';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { AtParConstants } from '../Shared/AtParConstants';
import { CyctAllocateEventsService } from './cyct-allocate-events.service';
import { TokenEntry_Enum, StatusType, EnumApps, BusinessType, Send_CycleCount_Event_Enum } from '../Shared/AtParEnums';
import { ConfirmationService } from '../components/common/api';
import { MT_ATPAR_ORG_GROUPS } from '../../app/Entities/MT_ATPAR_ORG_GROUPS';
import { MT_ATPAR_ORG_GROUP_BUNITS } from '../../app/Entities/MT_ATPAR_ORG_GROUP_BUNITS';
import { MT_ATPAR_USER } from '../../app/Entities/mt_atpar_user';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { MT_CYCT_EVENT_ALLOCATION } from '../entities/mt_cyct_event_allocation';
import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';
import { DataTable } from '../components/datatable/datatable';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';

declare var module: {
    id: string;
}

@Component({
    templateUrl: 'cyct-allocate-events.component.html',
    providers: [AtParConstants, ConfirmationService, CyctAllocateEventsService, AtParCommonService]
})

export class AllocateEventsComponent {
    /*Varaiable declaration*/
    deviceTokenEntry: string[] = [];
    @ViewChild(DataTable) dataTableComponent: DataTable;
    growlMessage: Message[] = [];
    public lstUsers: any[] = [];
    lstOrgGroups: any[] = [];
    lstBUnits: any = [];
    lstFilteredBUnits: any = [];
    blnShowOrgGroupLabel: boolean = false;
    blnShowOrgGroupDD: boolean = false;
    orgGrpId: string = "";
    orgGrpDesc: string = "";
    ven: any = [];
    recordsPerPageSize: number;
    lstCheckedBUnits: Array<MT_CYCT_EVENT_ALLOCATION>;
    orgGroupData: MT_ATPAR_ORG_GROUPS[];
    blnStatusMsg: boolean = false;
    selectedOrgGroupId: string = "";
    selectedDropDownUserId: string = "";
    selectedBunit: string = "";
    selectedDescription: string = "";
    orgGroupIDForDBUpdate: string = "";
    eventDescription: string = "";
    lstsearch: any[] = [];
    selectedSearch: string = "";
    lstNoofRecords: any[] = [];
    selectedRecords: string = "";
    recordsPerPageAll: string = "";
    hdnSelOrgGrpId: string = "";
    lstEventsTotal: MT_CYCT_EVENT_ALLOCATION[];
    lstEvents: MT_CYCT_EVENT_ALLOCATION[];
    sortedCheckedRec: MT_CYCT_EVENT_ALLOCATION[];
    sortedUncheckedRec: MT_CYCT_EVENT_ALLOCATION[];
    lstGridFilterData: MT_CYCT_EVENT_ALLOCATION[];
    dataCheckedSorting: MT_CYCT_EVENT_ALLOCATION[] = [];
    dataUncheckedSorting: Array<MT_CYCT_EVENT_ALLOCATION>;
    page: boolean = true;
    eventDesc: string = "";
    startIndex: number;
    endIndex: number;
    blnSortByColumn: boolean = true;
    custom: string = "custom";
    showGrid: boolean = false;
    lstLength: any;
    lstEventsData: MT_CYCT_EVENT_ALLOCATION[];
    //previousFiled: string = "";

    /**
     * 
     * @param leftBarAnimationservice
     * @param router
     * @param cyctAllocateEventService
     * @param httpService
     * @param spinnerService
     * @param atParConstant
     * @param confirmationService
     */
    constructor(private leftBarAnimationservice: LeftBarAnimationService,
        private router: Router,
        private cyctAllocateEventService: CyctAllocateEventsService,
        private httpService: HttpService,
        private spinnerService: SpinnerService,
        private atParConstant: AtParConstants,
        private confirmationService: ConfirmationService,
        private commonService: AtParCommonService) {
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.growlMessage = [];
    }

    /**
     redirecting to home when click on breadcrumbs
     */
    homeurl() {
        this.leftBarAnimationservice.isHomeClicked = false;
        this.leftBarAnimationservice.isHide();
        this.router.navigate(['atpar']);
    }

    /**
   * Init Function for getting all org group data and UserID and BusinessUnits when page load 
   */
    async ngOnInit() {
        try {
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.endIndex = + sessionStorage.getItem("RecordsEndindex");
            this.lstCheckedBUnits = new Array<MT_CYCT_EVENT_ALLOCATION>();
            this.recordsPerPageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
            this.lstsearch.push({ label: 'All', value: 'All' }, { label: 'Allocated', value: 'Allocated' }, { label: 'Unallocated', value: 'Unallocated' });
            this.lstNoofRecords.push({ label: '10', value: '10' }, { label: '20', value: '20' }, { label: '30', value: '30' }, { label: '40', value: '40' }, { label: '50', value: '50' }, { label: '60', value: '60' }, { label: '70', value: '70' }, { label: '80', value: '80' });
            this.bindOrgGroups();
            this.selectedSearch = 'All';
        }
        catch (ex) {
            this.displayCatchException(ex, "ngOnInit");
        }
    }

    /**
     * Getting Org Group Data at page Load
     */
    async bindOrgGroups() {
        this.spinnerService.start();
        try {
            await this.commonService.getUserOrgGroups(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.spinnerService.stop();
                            this.orgGroupData = data.DataList;
                            this.blnStatusMsg = false;
                            if (this.orgGroupData.length == 1) {
                                this.blnShowOrgGroupLabel = true;
                                this.orgGrpId = this.orgGroupData[0].ORG_GROUP_ID + ' - ' + this.orgGroupData[0].ORG_GROUP_NAME;
                                this.orgGrpDesc = this.orgGroupData[0].ORG_GROUP_ID;

                                this.populateBusinessUnits();
                                this.bindUsersList();
                            }
                            else if (this.orgGroupData.length > 1) {
                                this.blnShowOrgGroupDD = true;
                                this.lstUsers = [];
                                this.lstFilteredBUnits = [];
                                this.lstUsers.push({ label: "Select User", value: "Select User" });
                                this.lstOrgGroups.push({ label: "Select One", value: "Select One" });
                                this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                for (var i = 0; i < this.orgGroupData.length; i++) {
                                    if (this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                        this.lstOrgGroups.push({ label: this.orgGroupData[i].ORG_GROUP_ID + ' - ' + this.orgGroupData[i].ORG_GROUP_NAME, value: this.orgGroupData[i].ORG_GROUP_ID })
                                    }
                                }
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
            this.displayCatchException(ex, "bindOrgGroups");
        }
    }

    /**
     * Getting Business Units at page Load
     */
    async populateBusinessUnits(): Promise<boolean> {
        let isOrgBUnitsExist: boolean = false;
        try {
            if (this.blnShowOrgGroupLabel == true) {
                this.orgGroupIDForDBUpdate = this.orgGrpDesc;
            }
            else {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            }
            this.lstFilteredBUnits = [];
            this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
            this.spinnerService.start();
            await this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, BusinessType.Inventory).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUP_BUNITS>;
                    this.growlMessage = [];
                    if (data.StatusCode == AtparStatusCodes.E_NORECORDFOUND) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Assigned Org Business Units' });
                        this.spinnerService.stop();
                        return;
                    }
                    switch (data.StatType) {
                        case StatusType.Success: {
                            let lstFilteredBUnitsTest = data.DataList;
                            if (lstFilteredBUnitsTest != null) {
                                if (lstFilteredBUnitsTest.length > 0) {
                                    for (var i = 0; i < lstFilteredBUnitsTest.length; i++) {
                                        this.lstFilteredBUnits.push({ label: lstFilteredBUnitsTest[i], value: lstFilteredBUnitsTest[i] })
                                    }
                                }
                            }
                            this.spinnerService.stop();
                            isOrgBUnitsExist = true;
                            break;
                        }
                        case StatusType.Warn: {
                            this.spinnerService.stop();
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            break;
                        }
                        case StatusType.Error: {
                            this.spinnerService.stop();
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            break;
                        }
                        case StatusType.Custom: {
                            this.spinnerService.stop();
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            break;
                        }
                    }
                });
            return Promise.resolve(isOrgBUnitsExist);
        }
        catch (ex) {
            this.displayCatchException(ex, "populateBusinessUnits");
        }
    }

    /**
     * Getting Users List at page Load
     */
    async bindUsersList() {
        try {
            if (this.blnShowOrgGroupLabel == true) {
                this.orgGroupIDForDBUpdate = this.orgGrpDesc;
            }
            else {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            }
            this.lstUsers = [];
            this.lstUsers.push({ label: "Select User", value: "Select User" });
            this.spinnerService.start();
            await this.commonService.getUsersList(this.deviceTokenEntry[TokenEntry_Enum.UserID], EnumApps.CycleCount, this.orgGroupIDForDBUpdate).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_USER>;
                    switch (data.StatType) {
                        case StatusType.Success: {
                            for (let i = 0; i < data.DataList.length; i++) {
                                this.lstUsers.push({
                                    label: data.DataList[i].FULLNAME,
                                    value: data.DataList[i].USER_ID
                                })
                            }
                            if (this.lstUsers.length <= 0 || this.lstUsers == null) {
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
            this.displayCatchException(ex, "bindUsersList");
        }
    }

    /**
     * This function is Change event for OrgGroup ID
     */
    async ddlOrgGrpIdChanged() {
        try {
            this.hdnSelOrgGrpId = this.selectedOrgGroupId;
            this.showGrid = false;
            this.selectedDropDownUserId = '';
            if (this.selectedOrgGroupId == "Select One") {
                this.lstUsers = [];
                this.selectedBunit = '';
                this.selectedDropDownUserId = '';
                this.lstUsers.push({ label: "Select User", value: "Select User" });
                this.lstFilteredBUnits = [];
                this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                return;
            }
            this.lstFilteredBUnits = [];
            this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
            this.selectedBunit = '';
            this.selectedDropDownUserId = '';
            this.lstEvents = new Array<MT_CYCT_EVENT_ALLOCATION>();
            this.spinnerService.start();

            await this.bindUsersList();
            await this.populateBusinessUnits();
            this.spinnerService.stop();
        }
        catch (ex) {
            this.displayCatchException(ex, "ddlOrgGrpIdChanged");
        }
    }

    /**
     * This function is Change event for User ID
     */
    async ddlUserIdChanged(event) {
        this.eventDesc = event.label;
        this.showGrid = false;
    }

    /**
     * This function is Change event for Records per page
     * @param event
     */
    ddlSelectChangePage(event) {
        this.recordsPerPageSize = parseInt(event.value);
    }

    ddlBUnitChanged() {
        this.showGrid = false;
    }

    ddlSelectChanged() {
        this.showGrid = false;
    }

    /**
     * This function is called when we click on go button
     */
    async getAllBUnits() {
        this.lstGridFilterData = null;
        this.growlMessage = [];
        try {
            this.showGrid = false;
            if (this.blnShowOrgGroupLabel == true) {
                this.orgGroupIDForDBUpdate = this.orgGrpDesc;
            }
            else {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            }
            if ((this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == undefined || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select One") && this.blnShowOrgGroupDD) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                return;
            }

            if (this.selectedDropDownUserId === "Select User" || this.selectedDropDownUserId === "undefined" || this.selectedDropDownUserId == "") {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Select User ID' });
                return false;
            }
            await this.bindEventDetails();
        }
        catch (ex) {
            this.displayCatchException(ex, "getAllBUnits");
        }
    }

    /**
     * This function is called when we click on go button
     */
    async bindEventDetails() {
        try {
            await this.buildHeadersInputDataset();
        }
        catch (ex) {
            this.displayCatchException(ex, "bindEventDetails");
        }
    }

    /**
     * This function is called when we click on go button
     */
    async buildHeadersInputDataset() {
        try {

            if (this.dataTableComponent != null) {
                this.dataTableComponent.reset();
            }

            if (this.blnShowOrgGroupLabel == true) {
                this.orgGroupIDForDBUpdate = this.orgGrpDesc;
            }
            else {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            }
            this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID] = this.orgGroupIDForDBUpdate;
            this.spinnerService.start();
            await this.cyctAllocateEventService.getAllocateEvents(this.selectedDropDownUserId, this.selectedBunit, this.orgGroupIDForDBUpdate).
                catch(this.httpService.handleError).then(async(res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_CYCT_EVENT_ALLOCATION>;
                    this.lstEvents = data.DataList;
                    this.lstEventsData = this.lstEvents;
                    this.lstEventsTotal = data.DataList;
                    if (data.StatusCode == AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS) {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No business units allocated for Org Grp Id' });
                        this.spinnerService.stop();
                        this.showGrid = false;
                        return;
                    }
                    switch (data.StatType) {
                        case StatusType.Success: {
                            if (this.lstEvents.length > 0) {
                                this.showGrid = true;
                                for (var i = 0; i < this.lstEvents.length; i++) {
                                    if (this.lstEvents[i].COUNT_HDR_STATUS == "1") {
                                        this.lstEvents[i].isOrphan = true;
                                        this.lstEvents[i].CartColor = "black";
                                    }
                                    else {
                                        this.lstEvents[i].isOrphan = false;
                                        this.lstEvents[i].CartColor = "red";
                                    }
                                }
                                if (this.selectedSearch == 'All') {
                                    if (this.eventDescription == "" || this.eventDescription == null || this.eventDescription == undefined) {
                                        //this.lstEvents = asEnumerable(this.lstEvents).OrderBy(a => a.STATUSALLOCATED === false).ThenByDescending(a => a.BUSINESS_UNIT).ToArray();
                                    }
                                    else {
                                        this.lstEvents = asEnumerable(this.lstEvents).Where(a => (a.STATUSALLOCATED === false || a.STATUSALLOCATED === true) && a.EVENT_ID.toLowerCase().startsWith(this.eventDescription.toLowerCase())).OrderBy(a => a.BUSINESS_UNIT).ToArray();
                                        //this.lstEvents = asEnumerable(this.lstEvents).OrderBy(a => (a.STATUSALLOCATED === false)).ThenByDescending(a => a.BUSINESS_UNIT).ToArray();
                                    }
                                }
                                else if (this.selectedSearch == 'Allocated') {
                                    if (this.eventDescription == "" || this.eventDescription == null || this.eventDescription == undefined) {
                                        this.lstEvents = asEnumerable(this.lstEvents).Where(a => a.STATUSALLOCATED === true).ToArray(); //.OrderBy(a => a.BUSINESS_UNIT).ToArray();
                                    }
                                    else {
                                        this.lstEvents = asEnumerable(this.lstEvents).Where(a => a.STATUSALLOCATED === true && a.EVENT_ID.toLowerCase().startsWith(this.eventDescription.toLowerCase())).OrderBy(a => a.BUSINESS_UNIT).ToArray();
                                        // this.lstEvents = asEnumerable(this.lstEvents).OrderBy(a => (a.STATUSALLOCATED === false)).OrderBy(a => a.BUSINESS_UNIT).ToArray();
                                    }
                                }
                                else if (this.selectedSearch == 'Unallocated') {
                                    if (this.eventDescription == "" || this.eventDescription == null || this.eventDescription == undefined) {
                                        this.lstEvents = asEnumerable(this.lstEvents).Where(a => a.STATUSALLOCATED === false).ToArray();//.OrderBy(a => a.BUSINESS_UNIT).ToArray();
                                    }
                                    else {
                                        this.lstEvents = asEnumerable(this.lstEvents).Where(a => a.STATUSALLOCATED === false && a.EVENT_ID.toLowerCase().startsWith(this.eventDescription.toLowerCase())).OrderBy(a => a.BUSINESS_UNIT).ToArray();
                                        //  this.lstEvents = asEnumerable(this.lstEvents).OrderBy(a => (a.STATUSALLOCATED === false)).ThenByDescending(a => a.BUSINESS_UNIT).ToArray();
                                    }
                                }
                                this.lstLength = "Number of Events allocated to  " + this.eventDesc + " :" + this.lstEventsTotal.filter(x => x.STATUSALLOCATED === true).length;
                                if (this.lstEvents == null || this.lstEvents.length <= 0) {
                                    this.showGrid = false;
                                    this.growlMessage = [];
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Events Found" });
                                }
                            }
                            else {
                                this.growlMessage = [];
                                this.spinnerService.stop();
                                this.showGrid = false;
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Events Found" });
                                break;
                            }

                            this.bindDataGrid();
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage = [];
                            this.spinnerService.stop();
                            if (this.lstEvents == null || this.lstEvents.length <= 0) {
                                this.showGrid = false;
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Events Found" });
                            }
                            else if (data.StatusCode == AtparStatusCodes.S_CYCT_EVENTS_CNCT_UNALLOCATE) {
                                this.showGrid = true;
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            }
                            else {
                                this.showGrid = false;
                                this.growlMessage.push({
                                    severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage
                                });
                            }
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
                    this.spinnerService.stop();
                });
        }
        catch (ex) {
            this.displayCatchException(ex, "buildHeadersInputDataset");
        }
    }

    /**
     * This function is for binding data to datatable
     */
    bindDataGrid() {
        try {
            var lstDBDataList;
            this.dataCheckedSorting = [];
            this.dataUncheckedSorting = [];

            for (let i = 0; i <= this.lstEvents.length - 1; i++) {
                if (this.lstEvents[i].STATUSALLOCATED == true) {
                    this.dataCheckedSorting.push(this.lstEvents[i]);
                }
                else {
                    this.dataUncheckedSorting.push(this.lstEvents[i]);
                }
            }
            this.spinnerService.stop();
        }
        catch (ex) {
            this.displayCatchException(ex, "bindDataGrid");
        }
    }

    /**
     * This event is called when we check or uncheck the swicth component
     * @param values
     * @param event
     */
    async selectedRow(values: any, event) {
        try {
            if (event == true) {
                values.STATUSALLOCATED = true;
            }
            else {
                values.STATUSALLOCATED = false;
            }
            if (this.lstCheckedBUnits.length > 0 && this.lstCheckedBUnits != null) {
                for (var i = 0; i < this.lstCheckedBUnits.length; i++) {
                    if (this.lstCheckedBUnits[i].BUSINESS_UNIT === values.BUSINESS_UNIT) {
                        var index = this.lstCheckedBUnits.indexOf(this.lstCheckedBUnits[i], 0)
                        this.lstCheckedBUnits.splice(index, 1);
                    }
                }
                this.lstCheckedBUnits.push(values);
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "selectedRow");
        }
    }

    /**
    * check all the switches
    */
    async checkAll() {
        try {
            this.lstCheckedBUnits = [];
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.endIndex = + sessionStorage.getItem("RecordsEndindex");
            if (this.lstGridFilterData != null && this.lstGridFilterData != undefined && this.lstGridFilterData.length > 0) {
                if (this.endIndex > this.lstGridFilterData.length) {
                    this.endIndex = this.lstGridFilterData.length;
                }
                for (let i = this.startIndex; i <= this.endIndex - 1; i++) {
                    this.lstGridFilterData[i].STATUSALLOCATED = true;
                    this.lstCheckedBUnits.push(this.lstGridFilterData[i]);
                }
            }
            else {
                if (this.endIndex > this.lstEvents.length) {
                    this.endIndex = this.lstEvents.length;
                }
                for (let i = this.startIndex; i <= this.endIndex - 1; i++) {
                    this.lstEvents[i].STATUSALLOCATED = true;
                    this.lstCheckedBUnits.push(this.lstEvents[i]);
                }
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "checkAll");
        }
    }

    /**
     * Uncheck all the switches
     */
    async unCheckAll() {
        try {
            this.lstCheckedBUnits = [];
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.endIndex = + sessionStorage.getItem("RecordsEndindex");

            if (this.lstGridFilterData != null && this.lstGridFilterData != undefined && this.lstGridFilterData.length > 0) {
                if (this.endIndex > this.lstGridFilterData.length) {
                    this.endIndex = this.lstGridFilterData.length;
                }
                for (let i = this.endIndex - 1; i >= this.startIndex; i--) {
                    this.lstGridFilterData[i].STATUSALLOCATED = false;
                    this.lstCheckedBUnits.push(this.lstGridFilterData[i]);
                }
            }
            else {
                if (this.endIndex > this.lstEvents.length) {
                    this.endIndex = this.lstEvents.length;
                }
                for (let i = this.endIndex - 1; i >= this.startIndex; i--) {
                    this.lstEvents[i].STATUSALLOCATED = false;
                    this.lstCheckedBUnits.push(this.lstEvents[i]);
                }
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "unCheckAll");
        }
    }

    /**
     * Updating Events 
     */
    async updateEvents() {
        try {
            let lstdsEventDetails: any = [];
            if (this.lstEvents.length > 0) {
                lstdsEventDetails = [];
                for (var i = 0; i < this.lstEvents.length; i++) {
                    if (this.lstEvents[i].STATUSALLOCATED != this.lstEvents[i].ACTUAL_STATUSALLOCATED) {
                        let business = Send_CycleCount_Event_Enum.BUSINESS_UNIT;
                        let eventID = Send_CycleCount_Event_Enum.EVENT_ID;
                        let noRecords = Send_CycleCount_Event_Enum.NO_RECORDS;
                        let fromLoc = Send_CycleCount_Event_Enum.FROM_STOR_LOC;
                        let toLoc = Send_CycleCount_Event_Enum.TO_STOR_LOC;
                        let userID = Send_CycleCount_Event_Enum.USER_ID;
                        let statusAllocation = Send_CycleCount_Event_Enum.ALLOCATION_STATUS;
                        let actualStatus = Send_CycleCount_Event_Enum.ACTUAL_ALLOCATION_STATUS;
                        lstdsEventDetails.push({
                            BUSINESS_UNIT: this.lstEvents[i].BUSINESS_UNIT,
                            EVENT_ID: this.lstEvents[i].EVENT_ID,
                            NO_RECORDS: this.lstEvents[i].NO_RECORDS,
                            FROM_STOR_LOC: this.lstEvents[i].FROM_STOR_LOC,
                            TO_STOR_LOC: this.lstEvents[i].TO_STOR_LOC,
                            USER_ID: this.selectedDropDownUserId,
                            STATUSALLOCATED: this.lstEvents[i].STATUSALLOCATED,
                            ALLOCATION_STATUS: this.lstEvents[i].STATUSALLOCATED,
                            ACTUAL_STATUSALLOCATED: this.lstEvents[i].ACTUAL_STATUSALLOCATED
                        });
                    }
                }
                localStorage.setItem('EventDetails', JSON.stringify(lstdsEventDetails));
                this.spinnerService.start();

                await this.cyctAllocateEventService.updateEvents(lstdsEventDetails, this.deviceTokenEntry)
                    .subscribe(async(response) => {
                        this.growlMessage = [];
                        switch (response.StatType) {
                            case StatusType.Success: {
                                this.lstEvents = [];
                                this.showGrid = false;
                                this.selectedDropDownUserId = "";
                                this.selectedBunit = "";
                                this.eventDescription = "";
                                this.spinnerService.stop();
                                this.selectedSearch = 'All';
                                this.growlMessage = [];
                                // this.selectedOrgGroupId = "";
                                this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'User Events Updated Successfully' });
                                break;
                            }
                            case StatusType.Warn: {
                                this.showGrid = true;
                                //this.spinnerService.start();
                                this.growlMessage = [];
                                await this.warnMessage(response.StatusCode, response.StatusMessage);
                               // setTimeout(() => {}, 100);
                                break;
                            }
                            case StatusType.Error: {
                                this.spinnerService.stop();
                                this.showGrid = false;
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                break;
                            }
                            case StatusType.Custom: {
                                this.spinnerService.stop();
                                this.showGrid = false;
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                break;
                            }
                        }
                        this.spinnerService.stop(); 
                    });

            }
        }
        catch (ex) {
            this.displayCatchException(ex, "updateEvents");
        }
    }
    async warnMessage(statusCode, statusMessage) {
        try {
            this.growlMessage = [];
            if (statusCode == AtparStatusCodes.S_CYCT_EVENTS_CNCT_UNALLOCATE) {
                //this.showGrid = false;
               
                await this.bindEventDetails();
                this.showGrid = true;
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: statusMessage });
            }
            else {
                this.showGrid = false;
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: statusMessage });
            }
            this.spinnerService.stop();
        }
        catch (ex) {
            this.displayCatchException(ex, "warnMessage");
        }

    }
    /**
     * This function is used for filtering data in datatable 
     * @param event
     */
    filterdata(event) {
        this.lstGridFilterData = [];
        this.lstGridFilterData = new Array<MT_CYCT_EVENT_ALLOCATION>();
        this.lstGridFilterData = event;
    }

    /**
     * This function  is used for Custom sorting in data table for all columns
     * @param event
     */
    customSort(event) {
        try {
            var element = event;
            this.lstEvents = [];
            this.blnSortByColumn = !this.blnSortByColumn;

            this.sortedCheckedRec = [];
            this.sortedUncheckedRec = [];

            this.sortedCheckedRec = this.dataCheckedSorting.sort(function (a, b) {
                if (a[element.field] < b[element.field])
                    return -1;
                if (a[element.field] > b[element.field])
                    return 1;
                return 0;
            });
            this.sortedUncheckedRec = this.dataUncheckedSorting.sort(function (a, b) {
                if (a[element.field] < b[element.field])
                    return -1;
                if (a[element.field] > b[element.field])
                    return 1;
                return 0;
            });
            if (this.blnSortByColumn == false) {
                this.lstEvents = [];

                if (this.selectedSearch == 'All') {
                    this.lstEvents = this.sortedCheckedRec.reverse().concat(this.sortedUncheckedRec.reverse());
                }
                else if (this.selectedSearch == 'Allocated') {
                    this.lstEvents = this.sortedCheckedRec.reverse();
                }
                else if (this.selectedSearch == 'Unallocated') {
                    this.lstEvents = this.sortedUncheckedRec.reverse();
                }
            }
            else {
                this.lstEvents = [];
                if (this.selectedSearch == 'All') {
                    this.lstEvents = this.sortedCheckedRec.concat(this.sortedUncheckedRec);
                }
                else if (this.selectedSearch == 'Allocated') {
                    this.lstEvents = this.sortedCheckedRec;
                }
                else if (this.selectedSearch == 'Unallocated') {
                    this.lstEvents = this.sortedUncheckedRec;
                }
            }
            this.sortedCheckedRec = [];
            this.sortedUncheckedRec = [];
        }
        catch (ex) {
            this.displayCatchException(ex, "customSort");
        }
    }

    /**
    * This method is for displaying catch block error messages 
    * @param event
    */
    displayCatchException(ex, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, ex.toString(), funName, this.constructor.name);
    }

    /**
   * delete all the values from variables
   */
    ngOnDestroy() {
        this.lstEvents = null;
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.spinnerService.stop();
        this.spinnerService = null;
        this.lstOrgGroups = [];
        this.lstUsers = [];
        this.blnShowOrgGroupLabel = false;
        this.blnShowOrgGroupDD = false;
        this.orgGrpId = "";
        this.lstGridFilterData = [];
        this.sortedCheckedRec = [];
        this.sortedUncheckedRec = [];
        this.lstLength = 0;
        this.blnSortByColumn = true;
    }
}