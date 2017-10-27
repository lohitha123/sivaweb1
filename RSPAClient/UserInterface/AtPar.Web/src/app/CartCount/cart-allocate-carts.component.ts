import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { Http, Response } from "@angular/http";
import { HttpServiceUtility } from '../shared/atparhttputilityservice';
import { HttpService } from '../Shared/HttpService';
import { MT_ATPAR_ORG_GROUPS } from '../../app/Entities/MT_ATPAR_ORG_GROUPS';
import { MT_ATPAR_ORG_GROUP_BUNITS } from '../../app/Entities/MT_ATPAR_ORG_GROUP_BUNITS';
import { BusinessType } from '../Shared/AtParEnums';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { SelectItem } from '../components/common/api';
import { TokenEntry_Enum, ClientType } from '../Shared/AtParEnums';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { StatusType } from '../Shared/AtParEnums';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { CartCountAllocationServices } from '../CartCount/cart-allocate-carts.component.service';
import { AtParConstants } from '../Shared/AtParConstants';
import { Message } from '../components/common/api';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { DataTable } from '../components/datatable/datatable';
import { MT_ATPAR_USER } from '../../app/Entities/mt_atpar_user';
import { MT_CRCT_USER_ALLOCATION } from '../../app/Entities/MT_CRCT_USER_ALLOCATION';
import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';
declare var module: {
    id: string;
}
@Component({
    templateUrl: 'cart-allocate-carts.component.html',
    providers: [datatableservice, CartCountAllocationServices, AtParCommonService, AtParConstants]
})

export class AllocateCartsComponent implements OnInit {
    @ViewChild(DataTable) dataTableComponent: DataTable;
    deviceTokenEntry: string[] = [];
    recordsPerPageSize: number;
    growlMessage: Message[] = [];
    orgGroupData: MT_ATPAR_ORG_GROUPS[];
    blnShowOrgGroupLabel: boolean = false;
    selectedOrgGroupId: string = "";
    selectedDropDownUserId: string = "";
    selectedDropDownUserId1: string = "";
    selectedBunit: string = "";
    selectedParlocation: string = "";
    orgGrpId: string = "";
    order: string = "";
    blnShowOrgGroupDD: boolean = false;
    public lstUsers: SelectItem[] = [];
    public lstUsersForCopyMoveDelete: SelectItem[] = [];
    lstOrgGroups: SelectItem[] = [];
    lstOrgGroupsList: SelectItem[] = [];
    showGrid: boolean = false;
    lstFilteredBUnits: SelectItem[] = [];
    lstFilteredDisplay: SelectItem[] = [];
    public newItem = new MT_CRCT_USER_ALLOCATION();
    lstCheckedCarts: Array<MT_CRCT_USER_ALLOCATION>;
    lstDBData: MT_CRCT_USER_ALLOCATION[];
    lstgridfilterData: MT_CRCT_USER_ALLOCATION[];
    lstAuditData: MT_CRCT_USER_ALLOCATION[];
    cartsList: any;
    lstCheckedCartsData: Array<MT_CRCT_USER_ALLOCATION>;
    lstUnCheckedCartsData: Array<MT_CRCT_USER_ALLOCATION>;
    sortedcheckedrec: MT_CRCT_USER_ALLOCATION[];
    sorteduncheckedrec: MT_CRCT_USER_ALLOCATION[];
    selectedDisplay: string = "";
    showOnAllocateSelection: boolean = false;
    strMenuCode: string = "mt_cart_allocation.aspx";
    strAuditData: string = "";
    strRowFilter: string = "";
    startIndex: number;
    EndIndex: number;
    timeConversion: number;
    blnsortbycolumn: boolean = true;
    sales: Employee[];
    ven: any;
    loading: boolean = true;
    deviceIDStatus: number;
    descStatus: number;
    macAddressStatus: number;
    orgGroupIDForDBUpdate: string;
    cartsAllocatedMsg: string;
    selectedUserIdLblValue: string;
    ccstatus: number;
    constructor(private httpService: HttpService, private _http: Http,
        private spinnerService: SpinnerService,
        private commonService: AtParCommonService,
        private atParConstant: AtParConstants,
        private cartAllocationService: CartCountAllocationServices
    ) {
    }
    ngOnInit() {
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.recordsPerPageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        this.startIndex = + sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
        this.lstCheckedCartsData = new Array<MT_CRCT_USER_ALLOCATION>();
        this.lstUnCheckedCartsData = new Array<MT_CRCT_USER_ALLOCATION>();
        this.bindOrgGroups();
        this.bindDisplayItems();
    }
    async bindDisplayItems() {
        this.lstFilteredDisplay.push({ label: "All", value: "A" })
        this.lstFilteredDisplay.push({ label: "Allocated", value: "L" })
        this.lstFilteredDisplay.push({ label: "Unallocated", value: "U" })
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
                                this.populateBusinessUnits();
                                this.spinnerService.stop();
                                break;
                            }
                            else if (this.orgGroupData.length > 1) {
                                this.blnShowOrgGroupDD = true;
                                this.lstUsers = [];
                                this.lstUsers.push({ label: "Select User", value: "Select User" })
                                this.lstOrgGroups.push({ label: "Select One", value: "Select One" })
                                this.lstFilteredBUnits = [];
                                this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" })
                                for (var i = 0; i < this.orgGroupData.length; i++) {
                                    if (this.orgGroupData[i].ORG_GROUP_ID !== "All") {
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
            this.clientErrorMsg(ex, "bindOrgGroups");
        }
    }

    async populateBusinessUnits(): Promise<boolean> {
        this.spinnerService.start();
        let isOrgBUnitsExist: boolean = false;
        try {
            if (this.blnShowOrgGroupLabel == true) {
                this.orgGroupIDForDBUpdate = this.orgGrpId.split("-")[0];
            }
            else {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            }

            await this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, BusinessType.Inventory).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUP_BUNITS>;
                    this.growlMessage = [];
                    this.lstFilteredBUnits = [];
                    this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" })
                    switch (data.StatType) {
                        case StatusType.Success: {
                            for (let i = 0; i < data.DataList.length; i++) {
                                this.lstFilteredBUnits.push({
                                    label: data.DataList[i].toString(),
                                    value: data.DataList[i].toString()
                                })
                            }
                            isOrgBUnitsExist = true;
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.showGrid = false;
                            this.showOnAllocateSelection = false;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.showGrid = false;
                            this.showOnAllocateSelection = false;
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.showGrid = false;
                            this.showOnAllocateSelection = false;
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            this.spinnerService.stop();
                            break;
                        }
                    }
                });
            return Promise.resolve(isOrgBUnitsExist);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "populateBusinessUnits");
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
            this.lstUsers.push({ label: "Select User", value: "" });
            await this.commonService.getUsersList(this.deviceTokenEntry[TokenEntry_Enum.UserID], 2, this.orgGroupIDForDBUpdate).
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

    async bindUsersListForCopyMoveDelete() {
        try {
            if (this.blnShowOrgGroupLabel == true) {
                this.orgGroupIDForDBUpdate = this.orgGrpId.split("-")[0];
            }
            else {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            }
            this.lstUsersForCopyMoveDelete = [];
            this.lstUsersForCopyMoveDelete.push({ label: "Select User", value: "Select User" });
            await this.commonService.getUsersList(this.deviceTokenEntry[TokenEntry_Enum.UserID], 2, this.orgGroupIDForDBUpdate).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_USER>;
                    this.selectedDropDownUserId1 = "";
                    switch (data.StatType) {
                        case StatusType.Success: {
                            for (let i = 0; i < data.DataList.length; i++) {
                                if (data.DataList[i].USER_ID != this.selectedDropDownUserId) {
                                    this.lstUsersForCopyMoveDelete.push({
                                        label: data.DataList[i].FULLNAME,
                                        value: data.DataList[i].USER_ID
                                    })
                                }
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }

                });

        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindUsersListForCopyMoveDelete");
        }
    }


    async ddlOrgGrpIdChanged() {
        this.growlMessage = [];
        this.showGrid = false;
        if (this.orgGroupIDForDBUpdate === this.selectedOrgGroupId) {
            if (this.selectedDropDownUserId === "" || this.selectedDropDownUserId === "Select User") {
                this.bindUsersList();
                return;
            }
            else {
            }

            if (this.selectedDisplay === "L") {
                this.showOnAllocateSelection = true;
            }
            else {
                this.showOnAllocateSelection = false;
            }
            return;
        }
        this.showOnAllocateSelection = false;
        if (this.selectedOrgGroupId == "Select One") {
            this.lstUsers = [];
            this.lstUsers.push({ label: "Select User", value: "" });
            this.lstFilteredBUnits = [];
            this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
            return;
        }
        this.spinnerService.start();
        try {
            this.selectedDropDownUserId = "";
            this.selectedBunit = "";
            this.bindUsersList();
            this.populateBusinessUnits();
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ddlOrgGrpIdChanged");
        }
    }

    async getAllocateCarts() {
        this.growlMessage = [];
        this.order = "ASC";
        this.showGrid = false;
        this.showOnAllocateSelection = false;
        this.spinnerService.start();
        let isChecked: boolean = false;
        if (this.blnShowOrgGroupLabel == true) {
            this.orgGroupIDForDBUpdate = this.orgGrpId.split("-")[0];
        }
        else {
            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            if (this.selectedOrgGroupId == "" || this.selectedOrgGroupId == "Select One" || this.selectedOrgGroupId == undefined) {
                this.showGrid = false;
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID." });
                this.spinnerService.stop();
                return false;
            }
        }
        if (this.selectedDropDownUserId == "" || this.selectedDropDownUserId === "Select User" || this.selectedDropDownUserId == undefined) {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select User ID" });
            this.showGrid = false;
            this.spinnerService.stop();
            return false;
        }
        if (this.lstFilteredBUnits.length == 1) {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Assigned Org Business Units" });
            this.showGrid = false;
            this.spinnerService.stop();
            return false;
        }
        try {
            await this.cartAllocationService.getCartDetails(this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID], this.selectedDropDownUserId, this.selectedBunit, this.selectedParlocation, this.order).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_CRCT_USER_ALLOCATION>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.showGrid = true;
                            let cartsData = data.DataVariable["m_Item2"];
                            this.lstDBData = cartsData;
                            this.cartsAllocatedMsg = "Number of Carts allocated to " + this.selectedUserIdLblValue + " :  " + data.DataVariable["m_Item1"];
                            this.BindDataGrid();
                            this.lstCheckedCartsData = [];
                            this.lstUnCheckedCartsData = [];
                            for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                                if (this.lstDBData[i].IsOrphan === "Y") {
                                    this.lstDBData[i].CartColor = "red";
                                }
                                else {
                                    this.lstDBData[i].CartColor = "black";
                                }
                                this.lstDBData[i].ID = "CartCounterId" + i;

                                if (this.lstDBData[i].CART_COUNT_ORDER == null || this.lstDBData[i].CART_COUNT_ORDER == 0) {
                                    this.lstDBData[i].CART_COUNT_ORDER = null;
                                }
                                if (this.lstDBData[i].ALL == true) {
                                    this.lstCheckedCartsData.push(this.lstDBData[i]);
                                }
                                else {
                                    this.lstUnCheckedCartsData.push(this.lstDBData[i]);
                                }
                                var time = this.lstDBData[i].COUNT_BEFORE;
                                //if (time != "") {
                                //    var hours = Number(time.match(/^(\d+)/)[1]);
                                //    var minutes = Number(time.match(/:(\d+)/)[1]);
                                //    var AMPM = time[5] + time[6];
                                //    if (AMPM == "PM" && hours < 12) hours = hours + 12;
                                //    if (AMPM == "AM" && hours == 12) hours = hours - 12;
                                //    var sHours = hours.toString();
                                //    var sMinutes = minutes.toString();
                                //    if (hours < 10) sHours = "0" + sHours;
                                //    if (minutes < 10) sMinutes = "0" + sMinutes;
                                //    this.lstDBData[i].COUNT_BEFORE = sHours + ":" + sMinutes;
                                //}
                            }
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                    }

                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getAllocateCarts");
            this.showGrid = false;
            this.showOnAllocateSelection = false;
        }
    }

    BindDataGrid() {
        try {
            this.lstgridfilterData = null;
            this.spinnerService.start();
            this.strRowFilter = "";
            if (this.lstDBData.length > 0) {
                for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                    if (this.lstDBData[i].COUNT_BEFORE == null) {
                        this.lstDBData[i].COUNT_BEFORE = "";
                    }
                    if (this.lstDBData[i].DESCR != null) {
                        this.lstDBData[i].DESCR = this.lstDBData[i].DESCR.replace(/\'/g, "''").trim();
                    }
                }
            }
            if (this.selectedParlocation !== "") {
                this.lstDBData = asEnumerable(this.lstDBData).Where(x => x.CART_ID.toUpperCase().startsWith(this.selectedParlocation.toUpperCase())).ToArray();
                if (this.lstDBData.length == 0) {
                    this.showGrid = false;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                    return;
                }
            }
            if (this.selectedDisplay === "L") {
                this.showOnAllocateSelection = true;
                this.bindUsersListForCopyMoveDelete();
                if (this.selectedParlocation !== "") {
                    this.lstDBData = this.lstDBData.filter(x => x.ALL == true);
                }
                else {
                    this.lstDBData = this.lstDBData.filter(x => x.CHK_ALLOCATED == true);
                }
                if (this.lstDBData.length == 0) {
                    this.showGrid = false;
                    this.showOnAllocateSelection = false;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                    this.spinnerService.stop();
                    return;
                }
            }
            else if (this.selectedDisplay === "U") {
                this.showOnAllocateSelection = false;
                if (this.selectedParlocation !== "") {
                    this.lstDBData = this.lstDBData.filter(x => x.ALL == false);
                }
                else {
                    this.lstDBData = this.lstDBData.filter(x => x.CHK_ALLOCATED == false);
                }
                if (this.lstDBData.length == 0) {
                    this.showGrid = false;
                    this.showOnAllocateSelection = false;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                    this.spinnerService.stop();
                    return;
                }
            }
            else {
                this.showOnAllocateSelection = false;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindDataGrid");
        }
    }

    async UpdateGridData() {
        let stime: any = "";
        let timeSplit: any = [];
        this.spinnerService.start();
        for (let i = 0; i <= this.lstDBData.length - 1; i++) {
            //if (this.lstDBData[i].COUNT_BEFORE != "") {
            //    let timeSplit = this.lstDBData[i].COUNT_BEFORE.split(":");
            //    this.timeConversion = +(timeSplit[0]);
            //    if (this.timeConversion < 12) {
            //        let amTime = (this.timeConversion < 10) ? '0' + this.timeConversion.toString() : this.timeConversion.toString();
            //        this.lstDBData[i].COUNT_BEFORE = amTime + ':' + timeSplit[1] + 'AM';
            //    }
            //    else {
            //        this.timeConversion = this.timeConversion - 12;
            //        let pmTime = (this.timeConversion < 10) ? '0' + this.timeConversion.toString() : this.timeConversion.toString();
            //        this.lstDBData[i].COUNT_BEFORE = pmTime + ':' + timeSplit[1] + 'PM';
            //    }
            //}
            if (this.lstDBData[i].COUNT_BEFORE != null && this.lstDBData[i].COUNT_BEFORE != '' && this.lstDBData[i].COUNT_BEFORE != undefined) {
                let dt = this.lstDBData[i].COUNT_BEFORE.toString();
                if (dt.length > 11) {
                    if (this.lstDBData[i].COUNT_BEFORE != '') {
                        stime = new Date(this.lstDBData[i].COUNT_BEFORE).getHours() + ':' + new Date(this.lstDBData[i].COUNT_BEFORE).getMinutes();
                        timeSplit = stime.split(":");
                        this.timeConversion = +(timeSplit[0]);
                        let timeConverMinutes: any;
                        timeConverMinutes = +(timeSplit[1]);
                        if (this.timeConversion < 12) {
                            let amTime = (this.timeConversion < 10) ? '0' + this.timeConversion.toString() : this.timeConversion.toString();
                            let amTimeMinutes = (timeConverMinutes < 10) ? '0' + timeConverMinutes.toString() : timeConverMinutes.toString();
                            if (amTime == "00") {
                                amTime = "12";
                            }
                            this.lstDBData[i].COUNT_BEFORE = amTime + ':' + amTimeMinutes + ' AM';
                        }
                        else {
                            this.timeConversion = this.timeConversion - 12;
                            let pmTime = (this.timeConversion < 10) ? '0' + this.timeConversion.toString() : this.timeConversion.toString();
                            let pmTimeMinutes = (timeConverMinutes < 10) ? '0' + timeConverMinutes.toString() : timeConverMinutes.toString();
                            if (pmTime == "00") {
                                pmTime = "12";
                            }
                            this.lstDBData[i].COUNT_BEFORE = pmTime + ':' + pmTimeMinutes + ' PM';
                        }
                    }
                    else {
                        this.growlMessage = [];
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Time(HH:MM)' });
                        return;
                    }
                }
            }
            //else {
            //    this.growlMessage = [];
            //    this.spinnerService.stop();
            //    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Time(HH:MM)' });
            //    return;
            //}
        }
        try {
            this.spinnerService.start();
            await this.commonService.getAuditAllowed(2, this.strMenuCode).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<string>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.strAuditData = data.Data;
                            break;
                        }
                        case StatusType.Warn: {
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "UpdateGridData");
        }

        if (this.strAuditData === "Y") {
            this.lstAuditData = this.lstDBData;
            for (let i = 0; i <= this.lstAuditData.length - 1; i++) {
                if (this.lstAuditData[i].ALL == false && this.lstAuditData[i].CHK_ALLOCATED == false) {
                    var index = this.lstAuditData.indexOf(this.lstAuditData[i], 0)
                    this.lstAuditData.splice(index, 1);
                }
                else {
                    if (this.lstAuditData[i].ALL == false && this.lstAuditData[i].CHK_ALLOCATED == true) {
                        this.lstAuditData[i].RECORD_MODE = "Delete";
                    }
                    else {
                        this.lstAuditData[i].RECORD_MODE = "";
                    }
                }
            }

            try {
                this.spinnerService.start();
                await this.commonService.doAuditData(this.selectedDropDownUserId, 2, this.strMenuCode, this.lstAuditData).
                    catch(this.httpService.handleError).then((res: Response) => {
                        let data = res.json() as AtParWebApiResponse<string>;
                        this.growlMessage = [];
                        switch (data.StatType) {
                            case StatusType.Success: {
                                this.spinnerService.stop();
                                break;
                            }
                            case StatusType.Warn: {
                                this.showGrid = false;
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                this.spinnerService.stop();
                                break;
                            }
                            case StatusType.Error: {
                                this.showGrid = false;
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                this.spinnerService.stop();
                                break;
                            }
                            case StatusType.Custom: {
                                this.showGrid = false;
                                this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                this.spinnerService.stop();
                                break;
                            }
                        }

                    });
            }
            catch (ex) {
                this.clientErrorMsg(ex, "UpdateGridData");
            }
        }

        try {
            this.spinnerService.start();
            for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                if (this.lstDBData[i].ALL == true) {
                    if (this.lstDBData[i].CART_COUNT_ORDER != null) {
                        this.lstDBData[i].CART_COUNT_ORDER = this.lstDBData[i].CART_COUNT_ORDER;
                    }
                    else {
                        this.lstDBData[i].CART_COUNT_ORDER = 99;
                    }
                }
                else {
                    this.lstDBData[i].CART_COUNT_ORDER = null;
                }
                this.lstDBData[i].DESCR = this.lstDBData[i].DESCR.replace(/\'/g, "''").trim();
            }
            await this.cartAllocationService.AllocateCarts(this.lstDBData, this.deviceTokenEntry[TokenEntry_Enum.UserID], this.selectedDropDownUserId, this.selectedBunit, this.selectedParlocation).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_CRCT_USER_ALLOCATION>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            let statusMessage = AtParConstants.Updated_Msg.replace("1%", "User").replace("2%", this.selectedDropDownUserId);
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: statusMessage });
                            this.showGrid = false;
                            this.showOnAllocateSelection = false;

                            if (this.blnShowOrgGroupLabel == true) {
                                this.selectedDropDownUserId = "";
                                this.selectedBunit = "";
                                this.selectedParlocation = "";

                            } else if (this.blnShowOrgGroupDD == true) {
                                this.selectedDropDownUserId = "";
                                this.selectedBunit = "";
                                this.selectedParlocation = "";
                            }
                            this.selectedDisplay = "";
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            this.showOnAllocateSelection = false;
                            if (this.blnShowOrgGroupLabel == true) {
                                this.selectedDropDownUserId = "";
                                this.selectedBunit = "";
                                this.selectedParlocation = "";

                            } else if (this.blnShowOrgGroupDD == true) {
                                this.selectedDropDownUserId = "";
                                this.selectedBunit = "";
                                this.selectedParlocation = "";
                            }
                            this.selectedDisplay = "";
                            this.showGrid = false;
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            this.showOnAllocateSelection = false;
                            if (this.blnShowOrgGroupLabel == true) {
                                this.selectedDropDownUserId = "";
                                this.selectedBunit = "";
                                this.selectedParlocation = "";

                            } else if (this.blnShowOrgGroupDD == true) {
                                this.selectedDropDownUserId = "";
                                this.selectedParlocation = "";
                                this.selectedBunit = "";
                            }
                            this.selectedDisplay = "";
                            this.showGrid = false;
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            this.showOnAllocateSelection = false;
                            if (this.blnShowOrgGroupLabel == true) {
                                this.selectedDropDownUserId = "";
                                this.selectedBunit = "";
                                this.selectedParlocation = "";

                            } else if (this.blnShowOrgGroupDD == true) {
                                this.selectedDropDownUserId = "";
                                this.selectedBunit = "";
                                this.selectedParlocation = "";
                            }
                            this.selectedDisplay = "";
                            this.spinnerService.stop();
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "UpdateGridData");
        }
    }

    selectedRow(event, selectedData: MT_CRCT_USER_ALLOCATION) {
        try {
            if (event.target.checked == true) {
                for (var i = 0; i <= this.lstDBData.length - 1; i++) {
                    if (this.lstDBData[i].SNO == selectedData.SNO) {
                        this.lstDBData[i].ALL = true;
                        this.lstDBData[i].MON = true;
                        this.lstDBData[i].TUE = true;
                        this.lstDBData[i].WED = true;
                        this.lstDBData[i].THU = true;
                        this.lstDBData[i].FRI = true;
                        this.lstDBData[i].SAT = true;
                        this.lstDBData[i].SUN = true;
                    }
                }
            }
            else {
                for (var i = 0; i <= this.lstDBData.length - 1; i++) {
                    if (this.lstDBData[i].SNO == selectedData.SNO) {
                        this.lstDBData[i].ALL = false;
                        this.lstDBData[i].MON = false;
                        this.lstDBData[i].TUE = false;
                        this.lstDBData[i].WED = false;
                        this.lstDBData[i].THU = false;
                        this.lstDBData[i].FRI = false;
                        this.lstDBData[i].SAT = false;
                        this.lstDBData[i].SUN = false;
                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "selectedRow");
        }
    }

    DaySelected(event, ven: MT_CRCT_USER_ALLOCATION, Day) {
        try {
            if (event.target.checked == true) {
                for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                    if (ven.SNO == this.lstDBData[i].SNO) {
                        this.lstDBData[i].ALL = true;
                    }
                }
            }
            else {
                for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                    if (ven.SNO == this.lstDBData[i].SNO) {
                        ven[Day] = false;
                        if (this.lstDBData[i].MON == true || this.lstDBData[i].TUE == true || this.lstDBData[i].WED == true || this.lstDBData[i].THU == true || this.lstDBData[i].FRI == true || this.lstDBData[i].SAT == true || this.lstDBData[i].SUN == true) {
                            this.lstDBData[i].ALL = true;
                        }
                        else {
                            this.lstDBData[i].ALL = false;
                        }
                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "DaySelected");
        }
    }

    async CopyCarts() {
        this.spinnerService.start();
        if (this.selectedDropDownUserId1 == "" || this.selectedDropDownUserId1 == undefined) {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select User ID" });
            this.spinnerService.stop();
            return;
        }
        for (let i = 0; i <= this.lstDBData.length - 1; i++) {
            if (this.lstDBData[i].CART_COUNT_ORDER == null) {
                this.lstDBData[i].CART_COUNT_ORDER = 99;
            }
        }
        try {
            await this.cartAllocationService.CopyCarts(this.lstDBData, this.selectedDropDownUserId, this.selectedDropDownUserId1, this.selectedBunit, this.selectedParlocation).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_CRCT_USER_ALLOCATION>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.showGrid = false;
                            this.showOnAllocateSelection = false;
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Updated Successfully' });
                            if (this.blnShowOrgGroupLabel == true) {
                                this.selectedDropDownUserId = "";
                                this.selectedBunit = "";
                                this.selectedParlocation = "";
                            } else if (this.blnShowOrgGroupDD == true) {
                                this.selectedOrgGroupId = 'Select One';
                                this.lstUsers = [];
                                this.lstFilteredBUnits = [];
                                this.lstUsers.push({ label: "Select User", value: "" });
                                this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                this.selectedDropDownUserId = "";
                                this.selectedBunit = "";
                                this.selectedParlocation = "";
                            }
                            this.selectedDisplay = "";
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.showGrid = false;
                            this.showOnAllocateSelection = false;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            if (this.blnShowOrgGroupLabel == true) {
                                this.selectedDropDownUserId = "";
                                this.selectedBunit = "";
                                this.selectedParlocation = "";

                            } else if (this.blnShowOrgGroupDD == true) {
                                this.selectedOrgGroupId = 'Select One';
                                this.lstUsers = [];
                                this.lstFilteredBUnits = [];
                                this.lstUsers.push({ label: "Select User", value: "" });
                                this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                this.selectedDropDownUserId = "";
                                this.selectedBunit = "";
                                this.selectedParlocation = "";
                            }
                            this.selectedDisplay = "";
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.showGrid = false;
                            this.showOnAllocateSelection = false;
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            if (this.blnShowOrgGroupLabel == true) {
                                this.selectedDropDownUserId = "";
                                this.selectedBunit = "";
                                this.selectedParlocation = "";

                            } else if (this.blnShowOrgGroupDD == true) {
                                this.selectedOrgGroupId = 'Select One';
                                this.lstUsers = [];
                                this.lstFilteredBUnits = [];
                                this.lstUsers.push({ label: "Select User", value: "" });
                                this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                this.selectedDropDownUserId = "";
                                this.selectedParlocation = "";
                                this.selectedBunit = "";
                            }
                            this.selectedDisplay = "";
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.showGrid = false;
                            this.showOnAllocateSelection = false;
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            if (this.blnShowOrgGroupLabel == true) {
                                this.selectedDropDownUserId = "";
                                this.selectedBunit = "";
                                this.selectedParlocation = "";

                            } else if (this.blnShowOrgGroupDD == true) {
                                this.selectedOrgGroupId = 'Select One';
                                this.lstUsers = [];
                                this.lstFilteredBUnits = [];
                                this.lstUsers.push({ label: "Select User", value: "" });
                                this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                this.selectedDropDownUserId = "";
                                this.selectedBunit = "";
                                this.selectedParlocation = "";
                            }
                            this.selectedDisplay = "";
                            this.spinnerService.stop();
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "CopyCarts");
        }
    }

    async MoveCarts() {
        this.spinnerService.start();
        if (this.selectedDropDownUserId1 == "" || this.selectedDropDownUserId1 == undefined) {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select User ID" });
            this.spinnerService.stop();
            return;
        }
        for (let i = 0; i <= this.lstDBData.length - 1; i++) {
            if (this.lstDBData[i].CART_COUNT_ORDER == null) {
                this.lstDBData[i].CART_COUNT_ORDER = 99;
            }
        }
        this.spinnerService.start();
        try {
            await this.cartAllocationService.MoveCarts(this.lstDBData, this.selectedDropDownUserId, this.selectedDropDownUserId1, this.selectedBunit, this.selectedParlocation).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_CRCT_USER_ALLOCATION>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.showGrid = false;
                            this.showOnAllocateSelection = false;
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Updated Successfully' });
                            if (this.blnShowOrgGroupLabel == true) {
                                this.selectedDropDownUserId = "";
                                this.selectedBunit = "";
                                this.selectedParlocation = "";
                            } else if (this.blnShowOrgGroupDD == true) {
                                this.selectedOrgGroupId = 'Select One';
                                this.lstUsers = [];
                                this.lstFilteredBUnits = [];
                                this.lstUsers.push({ label: "Select User", value: "" });
                                this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                this.selectedDropDownUserId = "";
                                this.selectedBunit = "";
                                this.selectedParlocation = "";
                            }
                            this.selectedDisplay = "";
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.showGrid = false;
                            this.showOnAllocateSelection = false;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            if (this.blnShowOrgGroupLabel == true) {
                                this.selectedDropDownUserId = "";
                                this.selectedBunit = "";
                                this.selectedParlocation = "";

                            } else if (this.blnShowOrgGroupDD == true) {
                                this.selectedOrgGroupId = 'Select One';
                                this.lstUsers = [];
                                this.lstFilteredBUnits = [];
                                this.lstUsers.push({ label: "Select User", value: "" });
                                this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                this.selectedDropDownUserId = "";
                                this.selectedBunit = "";
                                this.selectedParlocation = "";
                            }
                            this.selectedDisplay = "";
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.showGrid = false;
                            this.showOnAllocateSelection = false;
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            if (this.blnShowOrgGroupLabel == true) {
                                this.selectedDropDownUserId = "";
                                this.selectedBunit = "";
                                this.selectedParlocation = "";

                            } else if (this.blnShowOrgGroupDD == true) {
                                this.selectedOrgGroupId = 'Select One';
                                this.lstUsers = [];
                                this.lstFilteredBUnits = [];
                                this.lstUsers.push({ label: "Select User", value: "" });
                                this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                this.selectedDropDownUserId = "";
                                this.selectedBunit = "";
                                this.selectedParlocation = "";
                            }
                            this.selectedDisplay = "";
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.showGrid = false;
                            this.showOnAllocateSelection = false;
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            if (this.blnShowOrgGroupLabel == true) {
                                this.selectedDropDownUserId = "";
                                this.selectedBunit = "";
                                this.selectedParlocation = "";

                            } else if (this.blnShowOrgGroupDD == true) {
                                this.selectedOrgGroupId = 'Select One';
                                this.lstUsers = [];
                                this.lstFilteredBUnits = [];
                                this.lstUsers.push({ label: "Select User", value: "" });
                                this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                this.selectedDropDownUserId = "";
                                this.selectedBunit = "";
                                this.selectedParlocation = "";
                            }
                            this.selectedDisplay = "";
                            this.spinnerService.stop();
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "MoveCarts");
        }
    }

    async DeleteCarts() {
        for (let i = 0; i <= this.lstDBData.length - 1; i++) {
            if (this.lstDBData[i].CART_COUNT_ORDER == null) {
                this.lstDBData[i].CART_COUNT_ORDER = 99;
            }
        }
        this.spinnerService.start();

        try {
            await this.cartAllocationService.DeleteCarts(this.lstDBData, this.selectedDropDownUserId).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_CRCT_USER_ALLOCATION>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Deleted Successfully' });

                            if (this.blnShowOrgGroupLabel == true) {
                                this.selectedDropDownUserId = "";
                                this.selectedBunit = "";
                                this.selectedParlocation = "";
                            } else if (this.blnShowOrgGroupDD == true) {
                                this.selectedOrgGroupId = 'Select One';
                                this.lstUsers = [];
                                this.lstFilteredBUnits = [];
                                this.lstUsers.push({ label: "Select User", value: "" });
                                this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                this.selectedDropDownUserId = "";
                                this.selectedBunit = "";
                                this.selectedParlocation = "";
                            }
                            this.showGrid = false;
                            this.showOnAllocateSelection = false;
                            this.selectedDisplay = "";
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.showGrid = false;
                            this.showOnAllocateSelection = false;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            if (this.blnShowOrgGroupLabel == true) {
                                this.selectedDropDownUserId = "";
                                this.selectedBunit = "";
                                this.selectedParlocation = "";
                            } else if (this.blnShowOrgGroupDD == true) {
                                this.selectedOrgGroupId = 'Select One';
                                this.lstUsers = [];
                                this.lstFilteredBUnits = [];
                                this.lstUsers.push({ label: "Select User", value: "" });
                                this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                this.selectedDropDownUserId = "";
                                this.selectedBunit = "";
                                this.selectedParlocation = "";
                            }
                            this.selectedDisplay = "";
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.showGrid = false;
                            this.showOnAllocateSelection = false;
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            if (this.blnShowOrgGroupLabel == true) {
                                this.selectedDropDownUserId = "";
                                this.selectedBunit = "";
                                this.selectedParlocation = "";
                            } else if (this.blnShowOrgGroupDD == true) {
                                this.selectedOrgGroupId = 'Select One';
                                this.lstUsers = [];
                                this.lstFilteredBUnits = [];
                                this.lstUsers.push({ label: "Select User", value: "" });
                                this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                this.selectedDropDownUserId = "";
                                this.selectedBunit = "";
                                this.selectedParlocation = "";
                            }
                            this.selectedDisplay = "";
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.showGrid = false;
                            this.showOnAllocateSelection = false;
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            if (this.blnShowOrgGroupLabel == true) {
                                this.selectedDropDownUserId = "";
                                this.selectedBunit = "";
                                this.selectedParlocation = "";
                            } else if (this.blnShowOrgGroupDD == true) {
                                this.selectedOrgGroupId = 'Select One';
                                this.lstUsers = [];
                                this.lstFilteredBUnits = [];
                                this.lstUsers.push({ label: "Select User", value: "" });
                                this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                this.selectedDropDownUserId = "";
                                this.selectedBunit = "";
                                this.selectedParlocation = "";
                            }
                            this.selectedDisplay = "";
                            this.spinnerService.stop();
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "DeleteCarts")
        }
    }

    async checkAll() {
        this.startIndex = + sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = + sessionStorage.getItem("RecordsEndindex");

        try {
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstgridfilterData[i].ALL = true;
                    this.lstgridfilterData[i].MON = true;
                    this.lstgridfilterData[i].TUE = true;
                    this.lstgridfilterData[i].WED = true;
                    this.lstgridfilterData[i].THU = true;
                    this.lstgridfilterData[i].FRI = true;
                    this.lstgridfilterData[i].SAT = true;
                    this.lstgridfilterData[i].SUN = true;
                }
            }
            else {
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }
                for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstDBData[i].ALL = true;
                    this.lstDBData[i].MON = true;
                    this.lstDBData[i].TUE = true;
                    this.lstDBData[i].WED = true;
                    this.lstDBData[i].THU = true;
                    this.lstDBData[i].FRI = true;
                    this.lstDBData[i].SAT = true;
                    this.lstDBData[i].SUN = true;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkAll");
        }
    }

    async unCheckAll() {
        this.startIndex = + sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = + sessionStorage.getItem("RecordsEndindex");

        try {
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {

                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstgridfilterData[i].ALL = false;
                    this.lstgridfilterData[i].MON = false;
                    this.lstgridfilterData[i].TUE = false;
                    this.lstgridfilterData[i].WED = false;
                    this.lstgridfilterData[i].THU = false;
                    this.lstgridfilterData[i].FRI = false;
                    this.lstgridfilterData[i].SAT = false;
                    this.lstgridfilterData[i].SUN = false;
                }
            }
            else {
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }
                for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstDBData[i].ALL = false;
                    this.lstDBData[i].MON = false;
                    this.lstDBData[i].TUE = false;
                    this.lstDBData[i].WED = false;
                    this.lstDBData[i].THU = false;
                    this.lstDBData[i].FRI = false;
                    this.lstDBData[i].SAT = false;
                    this.lstDBData[i].SUN = false;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "unCheckAll");
        }
    }

    customSort(event, field) {
        var element = event;
        this.blnsortbycolumn = !this.blnsortbycolumn;
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
        let result = null;

        try {
            this.sortedcheckedrec = this.lstCheckedCartsData.sort(function (a, b) {
                if (a[element.field] == null && b[element.field] != null)
                    result = -1;
                else if (a[element.field] != null && b[element.field] == null)
                    result = 1;
                else if (a[element.field] == null && b[element.field] == null)
                    result = 0;
                else if (typeof a[element.field] === 'string' && typeof b[element.field] === 'string')
                    result = a[element.field].localeCompare(b[element.field]);
                else
                    result = (a[element.field] < b[element.field]) ? -1 : (a[element.field] > b[element.field]) ? 1 : 0;

                return (element.order * result);
            });

            this.sorteduncheckedrec = this.lstUnCheckedCartsData.sort(function (a, b) {
                if (a[element.field] == null && b[element.field] != null)
                    result = -1;
                else if (a[element.field] != null && b[element.field] == null)
                    result = 1;
                else if (a[element.field] == null && b[element.field] == null)
                    result = 0;
                else if (typeof a[element.field] === 'string' && typeof b[element.field] === 'string')
                    result = a[element.field].localeCompare(b[element.field]);
                else
                    result = (a[element.field] < b[element.field]) ? -1 : (a[element.field] > b[element.field]) ? 1 : 0;

                return (element.order * result);
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "customSort");
        }

        this.lstDBData = [];
        this.lstDBData = this.sortedcheckedrec.concat(this.sorteduncheckedrec);
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
    }

    ddlUsersIdChanged() {
        this.showGrid = false;
        this.showOnAllocateSelection = false;

        try {
            for (let i = 0; i <= this.lstUsers.length - 1; i++) {
                if (this.lstUsers[i].value == this.selectedDropDownUserId) {
                    this.selectedUserIdLblValue = this.lstUsers[i].label;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ddlUsersIdChanged")
        }
    }

    ddlBUnitChanged() {
        this.showGrid = false;
        this.showOnAllocateSelection = false;
    }

    ddlDisplayChanged() {
        this.showGrid = false;
        this.showOnAllocateSelection = false;
    }

    filterdata(event) {
        this.lstgridfilterData = new Array<MT_CRCT_USER_ALLOCATION>();
        this.lstgridfilterData = event;
    }
    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    ngOnDestroy() {
        this.deviceTokenEntry = null;
        this.lstDBData = null;
        this.growlMessage = null;
    }


} 