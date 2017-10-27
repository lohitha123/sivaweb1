import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { Http, Response } from "@angular/http";
import { MT_ATPAR_ORG_GROUPS } from '../../app/Entities/MT_ATPAR_ORG_GROUPS';
import { MT_ATPAR_STORAGE_ZONE } from '../../app/Entities/MT_ATPAR_STORAGE_ZONE';
import { MT_ATPAR_ORG_GROUP_BUNITS } from '../../app/Entities/MT_ATPAR_ORG_GROUP_BUNITS';
import { MT_ATPAR_USER } from '../../app/Entities/mt_atpar_user';
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { SelectItem } from '../components/common/api';
import { ConfirmationService } from '../components/common/api';
import { TokenEntry_Enum, ClientType } from '../Shared/AtParEnums';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { BusinessType } from '../Shared/AtParEnums';
import { StatusType } from '../Shared/AtParEnums';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { Message } from '../components/common/api';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { AtParConstants } from '../Shared/AtParConstants';

declare var module: {
    id: string;
}

@Component({
    templateUrl: 'pick-allocate-picking-zones.component.html',
    providers: [HttpService, ConfirmationService, AtParCommonService, AtParConstants]
})

export class AllocatePickingZonesComponent {
    deviceTokenEntry: string[] = [];
    public lstUsers: SelectItem[] = [];
    lstOrgGroups: SelectItem[] = [];
    lstBUnits: any = [];
    lstFilteredBUnits: any = [];
    lstCheckedBUnits: Array<MT_ATPAR_STORAGE_ZONE>;
    lstDisplay: any = [];
    lstDBData: MT_ATPAR_STORAGE_ZONE[];
    lstgridfilterData: MT_ATPAR_STORAGE_ZONE[];
    lstDBDataFullData: MT_ATPAR_STORAGE_ZONE[];
    selectedDropDownDisplay: string = "A";
    startIndex: number;
    EndIndex: number;
    growlMessage: Message[] = [];
    blnShowOrgGroupLabel: boolean = false;
    blnShowOrgGroupDD: boolean = false;
    orgGrpId: string = "";
    orgGrpIDData: string = "";
    selectedOrgGroupId: string = "";
    selectedDropDownUserId: string = "";
    zoneGpID: string = "";
    selectedDescription: string = "";
    orgGroupIDForDBUpdate: string;
    blnStatusMsg: boolean = false;
    statusMsg: string = "";
    dataCheckedSorting: MT_ATPAR_STORAGE_ZONE[] = [];
    dataUncheckedSorting: Array<MT_ATPAR_STORAGE_ZONE>;
    sortedcheckedrec: MT_ATPAR_STORAGE_ZONE[];
    sorteduncheckedrec: MT_ATPAR_STORAGE_ZONE[];
    orgGroupData: MT_ATPAR_ORG_GROUPS[];
    isAuditRequired: string = "";
    strAudit: string = "";
    blnsortbycolumn: boolean = true;
    custom: string = "custom";
    preField: string = "";
    showGrid: boolean = false;
    recordsPerPageSize: number;
    orgGroupId: string;
    zonesAllocatedMsg: string = "";
    zonesAllocatedCount: number = 0;
    zonesDBCount: number = 0;
    constructor(private httpService: HttpService, private _http: Http,
        private spinnerService: SpinnerService,
        private atParConstant: AtParConstants,
        private commonService: AtParCommonService) {

    }

    ngOnInit() {
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.startIndex = + sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
        this.lstCheckedBUnits = new Array<MT_ATPAR_STORAGE_ZONE>();
        this.dataCheckedSorting = new Array<MT_ATPAR_STORAGE_ZONE>();
        this.dataUncheckedSorting = new Array<MT_ATPAR_STORAGE_ZONE>();
        this.recordsPerPageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];

        //dropdownlist
        this.lstDisplay = [];
        this.lstDisplay.push({ label: 'All', value: 'A' });
        this.lstDisplay.push({ label: 'Allocated', value: 'L' });
        this.lstDisplay.push({ label: 'Unallocated', value: 'U' });
        this.bindOrgGroups();

    }

    ngOnDestroy() {
        this.deviceTokenEntry = null;
        this.lstOrgGroups = null;
        this.lstUsers = null;
        this.lstOrgGroups = null;
        this.lstBUnits = null;
        this.lstFilteredBUnits = null;
        this.lstCheckedBUnits = null;
        this.lstDBData = null;
        this.lstDBDataFullData = null;
        this.growlMessage = null;
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
    }

    bindModelDataChange(event: any) { }

    async bindUsersList() {
        try {
            if (this.blnShowOrgGroupLabel == true) {
                this.orgGroupIDForDBUpdate = this.orgGrpId;
            }
            else {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            }

            this.lstUsers = [];
            this.lstUsers.push({ label: "Select User", value: "Select User" });
            this.spinnerService.start();
            await this.commonService.getUsersList(this.deviceTokenEntry[TokenEntry_Enum.UserID], 5, this.orgGroupIDForDBUpdate).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_USER>;
                    this.growlMessage = [];
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

    async populateUserStorageZones(): Promise<boolean> {
        let isOrgBUnitsExist: boolean = false;
        try {
            if (this.blnShowOrgGroupLabel == true) {
                this.orgGroupIDForDBUpdate = this.orgGrpId;
            }
            else {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            }

            this.spinnerService.start();
            await this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, BusinessType.Inventory).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUP_BUNITS>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.lstFilteredBUnits = data.DataList;
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
            this.clientErrorMsg(ex, "populateUserStorageZones");
        }
    }

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
                                this.orgGrpIDData = this.orgGroupData[0].ORG_GROUP_ID + " - " + this.orgGroupData[0].ORG_GROUP_NAME;
                                this.orgGrpId = this.orgGroupData[0].ORG_GROUP_ID;
                                this.populateUserStorageZones();
                                this.bindUsersList();
                                break;
                            }
                            else if (this.orgGroupData.length > 1) {
                                this.blnShowOrgGroupDD = true;
                                this.lstUsers = [];
                                this.lstUsers.push({ label: "Select User", value: "Select User" })
                                this.lstOrgGroups.push({ label: "Select One", value: "Select One" })
                                for (var i = 0; i < this.orgGroupData.length; i++) {
                                    if (this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                        this.lstOrgGroups.push({ label: this.orgGroupData[i].ORG_GROUP_ID + " - " + this.orgGroupData[i].ORG_GROUP_NAME, value: this.orgGroupData[i].ORG_GROUP_ID })
                                    }
                                }
                                break;
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
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: AtParConstants.ClientErrorMessage });
            this.spinnerService.stop();
        }
    }


    myfilterdata(event) {
        try {
            this.lstgridfilterData = new Array<MT_ATPAR_STORAGE_ZONE>();
            this.lstgridfilterData = event;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "myfilterdata");
        }
    }

    checkAll() {
        try {
            this.lstCheckedBUnits = [];
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {
                this.startIndex = + sessionStorage.getItem("Recordsstartindex");
                this.EndIndex = + sessionStorage.getItem("RecordsEndindex");

                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }

                for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstgridfilterData[i].checkvalue = true;
                    this.lstgridfilterData[i].CHK_VALUE = 1;
                    this.lstCheckedBUnits.push(this.lstgridfilterData[i]);
                }
            }
            else {
                this.startIndex = + sessionStorage.getItem("Recordsstartindex");
                this.EndIndex = + sessionStorage.getItem("RecordsEndindex");

                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }

                for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstDBData[i].checkvalue = true;
                    this.lstDBData[i].CHK_VALUE = 1;
                    this.lstCheckedBUnits.push(this.lstDBData[i]);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkAll");
        }
    }

    unCheckAll() {
        try {
            this.lstCheckedBUnits = [];
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {
                this.startIndex = + sessionStorage.getItem("Recordsstartindex");
                this.EndIndex = + sessionStorage.getItem("RecordsEndindex");

                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }

                for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstgridfilterData[i].checkvalue = false;
                    this.lstgridfilterData[i].CHK_VALUE = 0;
                    this.lstCheckedBUnits.push(this.lstgridfilterData[i]);
                }
            }
            else {
                this.startIndex = + sessionStorage.getItem("Recordsstartindex");
                this.EndIndex = + sessionStorage.getItem("RecordsEndindex");

                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }

                for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstDBData[i].checkvalue = false;
                    this.lstDBData[i].CHK_VALUE = 0;
                    this.lstCheckedBUnits.push(this.lstDBData[i]);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "unCheckAll");
        }
    }

    selectedRow(values: any, event) {
        try {
            if (event == true) {
                values.CHK_VALUE = 1;
            }
            else {
                values.CHK_VALUE = 0;
            }

            for (var i = 0; i < this.lstCheckedBUnits.length; i++) {
                if (this.lstCheckedBUnits[i].STORAGE_ZONE_ID === values.STORAGE_ZONE_ID) {
                    var index = this.lstCheckedBUnits.indexOf(this.lstCheckedBUnits[i], 0)
                    this.lstCheckedBUnits.splice(index, 1);
                }
            }
            this.lstCheckedBUnits.push(values);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "selectedRow");
        }
    }

    async ddlOrgGrpIdChanged() {
        this.showGrid = false;
        if (this.selectedOrgGroupId == "Select One") {
            this.orgGroupIDForDBUpdate = "";
            this.lstUsers = [];
            this.lstUsers.push({ label: "Select User", value: "Select User" });
            return;
        }
        this.zoneGpID = "";
        this.selectedDropDownUserId = "";
        this.selectedDescription = "";
        this.lstDBData = new Array<MT_ATPAR_STORAGE_ZONE>();
        this.spinnerService.start();

        try {
            await this.bindUsersList();
            await this.populateUserStorageZones();
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ddlOrgGrpIdChanged");
        }


    }

    ddlUserChanged() {
        this.showGrid = false;
    }

    customSort1(event) {
        try {
            var element = event;
            this.lstDBData = [];
            this.blnsortbycolumn = !this.blnsortbycolumn;
            this.sortedcheckedrec = [];
            this.sorteduncheckedrec = [];

            this.sortedcheckedrec = this.dataCheckedSorting.sort(function (a, b) {
                if (a[element.field] < b[element.field])
                    return -1;
                if (a[element.field] > b[element.field])
                    return 1;
                return 0;
            });

            this.sorteduncheckedrec = this.dataUncheckedSorting.sort(function (a, b) {
                if (a[element.field] < b[element.field])
                    return -1;
                if (a[element.field] > b[element.field])
                    return 1;
                return 0;
            });

            if (this.blnsortbycolumn == false) {
                this.lstDBData = [];
                this.lstDBData = this.sortedcheckedrec.reverse().concat(this.sorteduncheckedrec.reverse());
            }
            else {
                this.lstDBData = [];
                this.lstDBData = this.sortedcheckedrec.concat(this.sorteduncheckedrec);
            }

            this.sortedcheckedrec = [];
            this.sorteduncheckedrec = [];
        }
        catch (ex) {
            this.clientErrorMsg(ex, "customSort");
        }
    }

    customSort(event, field) {
        var element = event;
        if (this.preField == element.field) {
            if (element.order == 1) {
                element.order = -1;
            } else {
                element.order = 1;
            }
            // element.order = !element.order;

        } else {
            element.order = 1;
        }
        this.preField = element.field;
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
        let result = null;
        let order: boolean;

        try {
            this.sortedcheckedrec = this.dataCheckedSorting.sort(function (a, b) {
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

            this.sorteduncheckedrec = this.dataUncheckedSorting.sort(function (a, b) {
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

    async getUserStorageZones() {
        this.lstgridfilterData = null;
        this.showGrid = false;
        this.zonesAllocatedCount = 0;
        this.zonesDBCount = 0;

        try {
            if ((this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == undefined || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select One") && this.blnShowOrgGroupDD) {
                this.growlMessage = [];
                this.spinnerService.stop();
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                return;
            }

            if (this.selectedDropDownUserId === "Select User" || this.selectedDropDownUserId === "undefined" || this.selectedDropDownUserId == "") {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Select User ID' });
                this.showGrid = false;
                return false;
            }

            if (this.blnShowOrgGroupLabel == true) {
                this.orgGroupIDForDBUpdate = this.orgGrpId;
            }
            else {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            }

            this.lstDBData = new Array<MT_ATPAR_STORAGE_ZONE>();
            let isBUnitsExists = await this.populateUserStorageZones();

            if (isBUnitsExists == true) {
                this.spinnerService.start();
                this.httpService.get({
                    "apiMethod": "/api/AllocatePickingZones/GetUserStorageZones",
                    params: {
                        "orgGroupId": this.orgGroupIDForDBUpdate,
                        "appId": "5",
                        "userId": this.selectedDropDownUserId,
                        "storageZoneId": this.zoneGpID

                    }
                }).catch(this.httpService.handleError).map((res: Response) => res.json() as AtParWebApiResponse<MT_ATPAR_STORAGE_ZONE>)
                    .subscribe((response) => {
                        switch (response.StatType) {
                            case StatusType.Success: {
                                this.lstDBData = [];
                                this.lstDBData = response.DataList;
                                this.zonesDBCount = response.DataList.length;

                                for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                                    if (this.lstDBData[i].CHK_VALUE == 1) {
                                        this.zonesAllocatedCount = this.zonesAllocatedCount + 1;
                                    }
                                }
                                this.BindGrid();

                                this.dataCheckedSorting = [];
                                this.dataUncheckedSorting = [];

                                for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                                    if (this.lstDBData[i].CHK_ALLOCATED == 1) {
                                        this.dataCheckedSorting.push(this.lstDBData[i]);
                                    }
                                    else {
                                        this.dataUncheckedSorting.push(this.lstDBData[i]);
                                    }
                                }


                                this.spinnerService.stop();
                                break;
                            }
                            case StatusType.Warn: {
                                this.spinnerService.stop();
                                this.showGrid = false;
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                break;
                            }
                            case StatusType.Error: {
                                this.spinnerService.stop();
                                this.showGrid = false;
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                break;
                            }
                            case StatusType.Custom: {
                                this.spinnerService.stop();
                                this.showGrid = false;
                                this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                break;
                            }
                        }
                    });
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getUserStorageZones");
        }
    }

    BindGrid() {
        try {
            this.lstgridfilterData = null;
            this.lstDBDataFullData = this.lstDBData;

            if (this.selectedDropDownDisplay === "L") {
                this.showGrid = true;
                this.lstDBData = this.lstDBData.filter(x => x.CHK_ALLOCATED == 1);

                if (this.lstDBData.length == 0) {
                    this.showGrid = false;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                    this.selectedDropDownUserId = "";
                    this.selectedDescription = "";
                    this.zoneGpID = "";
                    this.selectedDropDownDisplay = "";
                    this.showGrid = false;
                    return;
                }
            }

            else if (this.selectedDropDownDisplay === "U") {
                this.showGrid = false;
                
                this.lstDBData = this.lstDBData.filter(x => x.CHK_ALLOCATED != 1);
                if (this.lstDBData.length == 0) {
                    this.showGrid = false;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                    this.selectedDropDownUserId = "";
                    this.selectedDescription = "";
                    this.zoneGpID = "";
                    this.selectedDropDownDisplay = "";
                    this.showGrid = false;
                    return;
                }

            }
            else {
                this.showGrid = false;
            }

            if (this.zoneGpID != undefined && this.zoneGpID != null && this.zoneGpID.trim().length != 0) {
                
                this.lstDBData = this.lstDBData.filter(x => x.STORAGE_ZONE_ID.toUpperCase().startsWith(this.zoneGpID.toUpperCase()))
            }

            for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                if (this.lstDBData[i].CHK_ALLOCATED == 1) {
                    this.lstDBData[i].checkvalue = true;
                }
                else {
                    this.lstDBData[i].checkvalue = false;
                }
            }

            if (this.lstDBData.length > 0)
                this.showGrid = true;
            else {
                this.growlMessage = [];
                this.showGrid = false;
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                this.selectedDropDownUserId = "";
                this.selectedDescription = "";
                this.zoneGpID = "";
                this.selectedDropDownDisplay = "";
                this.showGrid = false;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindGrid");
        }
    }

    async allocateZonePickingZones() {
        this.spinnerService.start();
        try {
            this.httpService.update({
                "apiMethod": "/api/AllocatePickingZones/InsertUserStorageZones",
                formData: this.lstDBDataFullData,
                params: {
                    "orgGroupId": this.orgGroupIDForDBUpdate,
                    "storageZoneId": this.zoneGpID,
                    "assignedUserId": this.selectedDropDownUserId,
                    "userId": this.deviceTokenEntry[TokenEntry_Enum.UserID],
                    "appId": 5,
                }
            }).catch(this.httpService.handleError).map((res: Response) => res.json() as AtParWebApiResponse<MT_ATPAR_STORAGE_ZONE>).subscribe(
                (response) => {
                    this.growlMessage = [];
                    switch (response.StatType) {
                        case StatusType.Success: {
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Updated Successfully' });
                            this.selectedDropDownUserId = "";
                            this.selectedDescription = "";
                            this.zoneGpID = "";
                            this.selectedDropDownDisplay = "";
                            this.showGrid = false;
                            this.spinnerService.stop();
                            this.lstDBData = [];
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                            this.selectedDropDownUserId = "";
                            this.selectedDescription = "";
                            this.zoneGpID = "";
                            this.selectedDropDownDisplay = "";
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            this.selectedDropDownUserId = "";
                            this.selectedDescription = "";
                            this.zoneGpID = "";
                            this.selectedDropDownDisplay = "";
                            this.spinnerService.stop();
                            this.showGrid = false;
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            this.selectedDropDownUserId = "";
                            this.selectedDescription = "";
                            this.zoneGpID = "";
                            this.selectedDropDownDisplay = "";
                            this.spinnerService.stop();
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "allocateZonePickingZones");
        }
    }

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    } 

} 