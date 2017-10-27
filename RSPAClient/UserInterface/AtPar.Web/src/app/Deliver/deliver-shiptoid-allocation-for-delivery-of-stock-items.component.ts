import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { Http, Response } from '@angular/http';
import { MT_DELV_SHIPTO_ID_ALLOCATION } from '../Entities/MT_DELV_SHIPTO_ID_ALLOCATION';
import { ShipToIdAllocationForDeliveryOfStockItemsServices } from '../../app/Deliver/deliver-shiptoid-allocation-for-delivery-of-stock-items.services';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { SelectItem } from './../components/common/api';
import { HttpService } from '../Shared/HttpService';
import { AtParConstants } from '../Shared/AtParConstants';
import { TokenEntry_Enum, StatusType, EnumApps } from '../Shared/AtParEnums';
import { SpinnerSentEvent } from '../components/spinner/spinner.sent.event';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { Message } from '../components/common/api';
import { ConfirmationService } from '../components/common/api';
import { DataTable } from '../components/datatable/datatable';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { MT_ATPAR_ORG_GROUPS } from '../entities/mt_atpar_org_groups';

declare var module: {
    id: string;
}
@Component({
    templateUrl: 'deliver-shiptoid-allocation-for-delivery-of-stock-items.component.html',
    providers: [ConfirmationService, ShipToIdAllocationForDeliveryOfStockItemsServices, AtParCommonService]
})

export class ShipToIdAllocationForDeliveryOfStockItemsComponent implements OnInit {
    @ViewChild(DataTable) dataTableComponent: DataTable;
    /*Varaible Declaration*/
    strOrgGrpId: string = "";
    strlblOrgGrpId: string = "";
    strAllOrgId: string = "";
    statusMesssage: string = "";
    strOrgGroupName: string = "";
    orgGrpIdData: string = "";
    selectedOrgGrpId: string = "";
    blnShowOrgGroupLabel: boolean = false;
    blnShowOrgGroupsDropdown: boolean = false;
    isVisible: boolean = false;
    checked: boolean = false;
    blnSortByColumn: boolean = true;
    recordsPerPageSize: number;
    startIndex: number;
    EndIndex: number;
    statusCode: number;
    lstOrgGroups: SelectItem[] = [];
    deviceTokenEntry: string[] = [];
    growlMessage: Message[] = [];
    sortedCheckedRec: MT_DELV_SHIPTO_ID_ALLOCATION[];
    sortedUnCheckedRec: MT_DELV_SHIPTO_ID_ALLOCATION[];
    dataCheckedSorting: MT_DELV_SHIPTO_ID_ALLOCATION[] = [];
    dataUnCheckedSorting: Array<MT_DELV_SHIPTO_ID_ALLOCATION> = [];
    lstDBData: Array<MT_DELV_SHIPTO_ID_ALLOCATION> = [];
    lstCheckedShiftToIds: Array<MT_DELV_SHIPTO_ID_ALLOCATION> = [];

    /**
     * Constructor
     * @param ShipToIdAllocationForDeliveryOfStockItemsServices
     * @param AtParCommonService
     * @param httpService
     * @param spinnerService   
     */
    constructor(private httpService: HttpService,
        private commonService: AtParCommonService,
        private shipToIdAllocationForDeliveryOfStockItemsServices: ShipToIdAllocationForDeliveryOfStockItemsServices,
        private spinnerService: SpinnerService, private atParConstant: AtParConstants
    ) { }

    /**
    * Init Function for binding OrgGroupIds to the dropdown when page loading 
    */

    async  ngOnInit() {
        try {
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.strlblOrgGrpId = this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID];
            this.recordsPerPageSize = +this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
            this.lstCheckedShiftToIds = new Array<MT_DELV_SHIPTO_ID_ALLOCATION>();
            this.dataCheckedSorting = new Array<MT_DELV_SHIPTO_ID_ALLOCATION>();
            this.dataUnCheckedSorting = new Array<MT_DELV_SHIPTO_ID_ALLOCATION>();
            await this.bindUserOrgGroups();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    }

    /**
    * Getting data from database and bind records to data table
    * Using Ternary Operator instead of if/else condition
    */
    async   bindUserOrgGroups() {
        try {
            this.spinnerService.start();
            if (this.strlblOrgGrpId == "All") {
                this.blnShowOrgGroupLabel = false;
                this.blnShowOrgGroupsDropdown = true;
                await this.commonService.getUserOrgGroups(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.strlblOrgGrpId).catch(this.httpService.handleError).then((response: Response) => {
                    let data = response.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>;
                    this.spinnerService.stop();
                    this.statusCode = data.StatusCode;
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.lstOrgGroups = [];
                            this.lstOrgGroups.push({ label: "Select One", value: "Select One" });
                            for (let i = 0; i <= data.DataList.length - 1; i++) {
                                if (data.DataList[i].ORG_GROUP_ID !== "All") {
                                    this.strAllOrgId = data.DataList[i].ORG_GROUP_ID + " - " + data.DataList[i].ORG_GROUP_NAME;
                                    this.lstOrgGroups.push({ label: this.strAllOrgId, value: data.DataList[i].ORG_GROUP_ID })
                                }
                            }
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
            }
            else {
                this.blnShowOrgGroupsDropdown = false;
                await this.commonService.getOrgGrpIDs(this.strlblOrgGrpId, this.strOrgGroupName, this.deviceTokenEntry)
                    .catch(this.httpService.handleError).then((response: Response) => {
                        let data = response.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>;
                        this.spinnerService.stop();
                        this.statusCode = data.StatusCode;
                        switch (data.StatType) {
                            case StatusType.Success: {
                                this.blnShowOrgGroupLabel = true;
                                this.orgGrpIdData = data.DataList[0].ORG_GROUP_ID + " - " + data.DataList[0].ORG_GROUP_NAME;
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
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindUserOrgGroups");
        }
        finally {
            this.spinnerService.stop();
        }
    }

    /**
    * This method is calling when click on Go button
    * Using Ternary Operator instead of if/else & if/else(if) conditions
    */
    async   btnGoClick() {
        if (this.isVisible == true) {
            this.dataTableComponent.reset();
        }
        if (this.blnShowOrgGroupsDropdown == true) {
            if (this.selectedOrgGrpId == "Select One" || this.selectedOrgGrpId == "") {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select valid Org Group ID" });
                return;
            }
        }
        this.strOrgGrpId = (this.blnShowOrgGroupsDropdown == false) ? this.strlblOrgGrpId : this.selectedOrgGrpId;
        this.isVisible = false;
        this.growlMessage = [];
        this.lstDBData = new Array<MT_DELV_SHIPTO_ID_ALLOCATION>();
        try {
            this.spinnerService.start();
            await this.shipToIdAllocationForDeliveryOfStockItemsServices.getOrgGrpShiptoIDs(this.strOrgGrpId, this.deviceTokenEntry[TokenEntry_Enum.UserID]).catch(this.httpService.handleError).then((response: Response) => {
                let data = response.json() as AtParWebApiResponse<MT_DELV_SHIPTO_ID_ALLOCATION>;
                this.statusCode = data.StatusCode;
                status = data.StatusCode;
                this.spinnerService.stop();
                switch (data.StatType) {
                    case StatusType.Success: {
                        this.lstDBData = [];
                        for (let i = 0; i <= data.DataList.length - 1; i++) {
                            data.DataList[i].checkvalue = (data.DataList[i].CHK_ALLOCATED == 1) ? true : false;
                        }
                        this.lstDBData = data.DataList;
                        this.BindDataGrid();
                        break;
                    }
                    case StatusType.Error: {
                        this.isVisible = false;
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                        break;
                    }
                    case StatusType.Warn: {
                        this.isVisible = false;
                        if (this.statusCode == AtparStatusCodes.ATPAR_BUNIT_NOTALLOC) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Assigned Org Business Units " });
                            break;
                        }
                        else {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                    }
                    case StatusType.Custom: {
                        this.isVisible = false;
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                        break;
                    }
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnGoClick");
        }
        finally {
            this.spinnerService.stop();
        }
    }

    /*
    * Storing data for sorting in two different  lists one for allocated and another for Unallocated 
    */
    BindDataGrid() {
        try {
            this.dataCheckedSorting = [];
            this.dataUnCheckedSorting = [];
            for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                if (this.lstDBData[i].CHK_ALLOCATED == 1) {
                    this.dataCheckedSorting.push(this.lstDBData[i]);
                }
                else {
                    this.dataUnCheckedSorting.push(this.lstDBData[i]);
                }
            }
            this.isVisible = true;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindDataGrid");
        }
    }

    /*
    * This method is calling when we selecting particular record in DataTable and getting selected record data
    */
    selectedRow(values: any, event) {
        try {
            values.CHK_VALUE = (event == true) ? 1 : 0;
            for (var i = 0; i < this.lstCheckedShiftToIds.length; i++) {
                if (this.lstCheckedShiftToIds[i].SHIPTO_ID == values.SHIPTO_ID) {
                    var index = this.lstCheckedShiftToIds.indexOf(this.lstCheckedShiftToIds[i], 0);
                    this.lstCheckedShiftToIds.splice(index, 1);
                }
            }
            this.lstCheckedShiftToIds.push(values);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "selectedRow");
        }
    }

    /*
    * This method is for sorting the data  based on seleted column in DataTable
    * Using Ternary Operator instead of if/else condition
    */
    customSort(event) {
        try {
            var element = event;
            this.lstDBData = [];
            this.blnSortByColumn = !this.blnSortByColumn;
            this.sortedCheckedRec = [];
            this.sortedUnCheckedRec = [];
            this.sortedCheckedRec = this.dataCheckedSorting.sort(function (a, b) {
                if (a[element.field] < b[element.field])
                    return -1;
                if (a[element.field] > b[element.field])
                    return 1;
                return 0;
            });
            this.sortedUnCheckedRec = this.dataUnCheckedSorting.sort(function (a, b) {
                if (a[element.field] < b[element.field])
                    return -1;
                if (a[element.field] > b[element.field])
                    return 1;
                return 0;
            });
            this.lstDBData = [];
            this.lstDBData = (this.blnSortByColumn == false) ? this.sortedCheckedRec.reverse().concat(this.sortedUnCheckedRec.reverse()) : this.sortedCheckedRec.concat(this.sortedUnCheckedRec);
            this.sortedCheckedRec = [];
            this.sortedUnCheckedRec = [];
        }
        catch (ex) {
            this.clientErrorMsg(ex, "customSort");
        }
    }

    /**
    * This method is calling when click on CheckAll Button in Datatable
    */
    checkAll() {
        try {
            this.lstCheckedShiftToIds = [];
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
            if (this.EndIndex > this.lstDBData.length) {
                this.EndIndex = this.lstDBData.length;
            }

            for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                this.lstDBData[i].checkvalue = true;
                this.lstDBData[i].CHK_VALUE = 1;
                this.lstCheckedShiftToIds.push(this.lstDBData[i]);
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkAll");
        }
    }

    /**
    * This method is calling when click on None Button in Datatable
    */
    unCheckAll() {
        try {
            this.lstCheckedShiftToIds = [];
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
            if (this.EndIndex > this.lstDBData.length) {
                this.EndIndex = this.lstDBData.length;
            }
            for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {
                this.lstDBData[i].checkvalue = false;
                this.lstDBData[i].CHK_VALUE = 0;
                this.lstCheckedShiftToIds.push(this.lstDBData[i]);
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "unCheckAll");
        }
    }

    /**
    * This method is calling when user selecting  OrgGrpId in dropdown
    */
    ddlOrgGrpIdChanged() {
        this.growlMessage = [];
        this.spinnerService.start();
        this.isVisible = false;
        try {
            this.strOrgGrpId = this.selectedOrgGrpId;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ddlOrgGrpIdChanged");
        }
        finally {
            this.spinnerService.stop();
        }
    }

    /**
    * This method is calling when user click on Submit Button 
    */
    async btn_Submit($event) {
        this.growlMessage = [];
        try {
            this.spinnerService.start();
            if (this.blnShowOrgGroupsDropdown == false) {
                for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                    this.lstDBData[i].ORG_GROUP_ID = this.strlblOrgGrpId;
                }
            }
            else {
                for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                    this.lstDBData[i].ORG_GROUP_ID = this.strOrgGrpId;
                }
            }
            await this.shipToIdAllocationForDeliveryOfStockItemsServices.allocateShiptoIDs(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.lstDBData)
                .catch(this.httpService.handleError).then((response: Response) => {
                    let data = response.json() as AtParWebApiResponse<MT_DELV_SHIPTO_ID_ALLOCATION>;
                    this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Updated Successfully' });
                            this.isVisible = false;
                            this.lstDBData = [];
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
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btn_Submit");
        }
        finally {
            this.spinnerService.stop();
        }
    }

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    /**
     * This method is for clearing all the variables
     * @param event
     */
    ngOnDestroy() {
        this.deviceTokenEntry = null;
        this.lstCheckedShiftToIds = null;
        this.lstDBData = null;
        this.lstOrgGroups = null;
        this.growlMessage = null;
        this.sortedCheckedRec = [];
        this.sortedUnCheckedRec = [];
        this.strOrgGrpId = null;
        this.strAllOrgId = null;
        this.strOrgGroupName = null;
        this.strlblOrgGrpId = null;
    }
}
