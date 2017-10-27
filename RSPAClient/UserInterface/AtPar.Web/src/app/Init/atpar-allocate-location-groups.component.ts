import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit, ViewChild, Input } from '@angular/core';
import { Http, Response } from "@angular/http";
import { MT_ATPAR_USER_ACL } from '../../app/Entities/mt_atpar_user_acl';
import { MT_ATPAR_ORG_GROUPS } from '../../app/Entities/MT_ATPAR_ORG_GROUPS';
import { MT_ATPAR_LOC_GROUPS } from '../../app/Entities/MT_ATPAR_LOC_GROUPS';
import { MT_ATPAR_ORG_GROUP_BUNITS } from '../../app/Entities/MT_ATPAR_ORG_GROUP_BUNITS';
import { MT_ATPAR_SECURITY_AUDIT } from '../../app/Entities/MT_ATPAR_SECURITY_AUDIT';
import { MT_ATPAR_USER } from '../../app/Entities/mt_atpar_user';
import { AllocateLocationGroupsService } from './atpar-allocate-location-groups.service';
import { HttpServiceUtility } from '../shared/atparhttputilityservice';
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { SelectItem } from '../components/common/api';
import { ConfirmationService } from '../components/common/api';
import { TokenEntry_Enum, ClientType } from '../Shared/AtParEnums';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { BusinessType } from '../Shared/AtParEnums';
import { StatusType } from '../Shared/AtParEnums';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { SpinnerSentEvent } from '../components/spinner/spinner.sent.event';
import { Message } from '../components/common/api';
import { DataTable } from '../components/datatable/datatable';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { AtParConstants } from '../Shared/AtParConstants';
import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';
declare var module: {
    id: string;
}
@Component({
    selector: 'atpar-allocate-location-groups',
    templateUrl: 'atpar-allocate-location-groups.component.html',
    providers: [HttpService, ConfirmationService, AtParCommonService, AllocateLocationGroupsService],
})

export class AllocateLocationGroupsComponent implements OnInit {
    @Input() appId: string;
    intAppId: number;
    @ViewChild(DataTable) dataTableComponent: DataTable;
    deviceTokenEntry: string[] = [];
    public lstUsers: SelectItem[] = [];
    lstOrgGroups: SelectItem[] = [];
    lstDisplay: any = [];
    lstBUnits: any = [];
    lstFilteredBUnits: any = [];
    lstCheckedBUnits: Array<MT_ATPAR_LOC_GROUPS>;
    lstDBData: MT_ATPAR_LOC_GROUPS[];
    lstDBMainDetails: MT_ATPAR_LOC_GROUPS[];
    lstgridfilterData: MT_ATPAR_LOC_GROUPS[];
    startIndex: number;
    EndIndex: number;
    growlMessage: Message[] = [];
    blnShowOrgGroupLabel: boolean = false;
    blnShowOrgGroupDD: boolean = false;
    orgGrpId: string = "";
    orgGrpIDData: string = "";
    selectedOrgGroupId: string = "";
    selectedDropDownUserId: string = "";
    selectedLocGrpId: string = "";
    selectedDropDownDisplay: string = "A";
    orgGroupIDForDBUpdate: string;
    blnStatusMsg: boolean = false;
    statusMsg: string = "";
    preField: string = "";
    data1: MT_ATPAR_LOC_GROUPS[];
    dataCheckedSorting: MT_ATPAR_LOC_GROUPS[] = [];
    dataUncheckedSorting: Array<MT_ATPAR_LOC_GROUPS>;
    sortedcheckedrec: MT_ATPAR_LOC_GROUPS[];
    sorteduncheckedrec: MT_ATPAR_LOC_GROUPS[];
    orgGroupData: MT_ATPAR_ORG_GROUPS[];
    isAuditRequired: string = "";
    strAudit: string = "";
    blnsortbycolumn: boolean = true;
    custom: string = "custom";
    showGrid: boolean = false;
    recordsPerPageSize: number;
    showAllocGroup: boolean = false;
    allocOp: string = "Copy";
    lstUsersForCopyMoveDelete: SelectItem[] = [];
    selectedDropDownUserIdOp: string;
    clientIP: string = "";
    totalCount: number = 0;
    allocatedCount: number = 0;
    constructor(private httpService: HttpService, private _http: Http,
        private spinnerService: SpinnerService,
        private commonService: AtParCommonService,
        private confirmationService: ConfirmationService,
        private atParConstant: AtParConstants,
        private AllocateLocationGroupsService: AllocateLocationGroupsService) {

    }

    ngOnInit() {
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.intAppId = parseInt(this.appId);
        this.startIndex = + sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
        this.lstCheckedBUnits = new Array<MT_ATPAR_LOC_GROUPS>();
        this.dataCheckedSorting = new Array<MT_ATPAR_LOC_GROUPS>();
        this.dataUncheckedSorting = new Array<MT_ATPAR_LOC_GROUPS>();
        this.recordsPerPageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        this.lstDisplay = [];
        this.lstDisplay.push({ label: 'All', value: 'A' });
        this.lstDisplay.push({ label: 'Allocated', value: 'L' });
        this.lstDisplay.push({ label: 'Unallocated', value: 'U' });
        this.checkAuditAllowed();
        this.bindOrgGroups();

    }

    confirm() {
        this.growlMessage = [];
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected user ?',
            accept: () => {
                this.deleteAllocateLocationGroups();
            }
        });
    }

    bindModelDataChange(event: any) { }

    async bindUsersList() {
        try {
            this.spinnerService.start();
            if (this.blnShowOrgGroupLabel == true) {
                this.orgGroupIDForDBUpdate = this.orgGrpId.split("-")[0];
            }
            else {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            }
            this.lstUsers = [];
            this.lstUsers.push({ label: "Select User", value: "" });
            await this.commonService.getUsersList(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.intAppId, this.orgGroupIDForDBUpdate).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_USER>;
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            for (let i = 0; i < data.DataList.length; i++) {
                                this.lstUsers.push({
                                    label: data.DataList[i].FULLNAME,
                                    value: data.DataList[i].USER_ID
                                })
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
            this.clientErrorMsg(ex, "bindUsersList");
        }
    }

    async checkAuditAllowed() {
        try {
            this.spinnerService.start();
            await this.commonService.getAuditAllowed(this.intAppId, "mt_recv_inv_bunit_alloc.aspx").
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json();
                    this.growlMessage = [];

                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.isAuditRequired = data.Data;
                            break;
                        }
                        case StatusType.Warn: {
                            //this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
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
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkAuditAllowed");
        }
    }

    async populateBusinessUnits(): Promise<boolean> {

        let isOrgBUnitsExist: boolean = false;
        try {
            this.spinnerService.start();

            if (this.blnShowOrgGroupLabel == true) {
                this.orgGroupIDForDBUpdate = this.orgGrpId.split("-")[0];
            }
            else {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            }

            await this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, BusinessType.Inventory).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUP_BUNITS>;
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.lstFilteredBUnits = data.DataList;
                            isOrgBUnitsExist = true;
                            break;
                        }
                        case StatusType.Warn: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            break;
                        }
                        case StatusType.Error: {

                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            break;
                        }
                        case StatusType.Custom: {
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
            this.clientErrorMsg(ex, "populateBusinessUnits");
        }
    }

    async bindOrgGroups() {
        try {
            this.spinnerService.start();
            this.growlMessage = [];
            await this.commonService.getUserOrgGroups(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>;
                    this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.orgGroupData = data.DataList;
                            this.blnStatusMsg = false;

                            if (this.orgGroupData.length == 1) {
                                this.blnShowOrgGroupLabel = true;
                                this.orgGrpId = this.orgGroupData[0].ORG_GROUP_ID + ' - ' + this.orgGroupData[0].ORG_GROUP_NAME;
                                this.bindUsersList();
                                break;

                            }
                            else if (this.orgGroupData.length > 1) {
                                this.blnShowOrgGroupDD = true;
                                this.lstUsers = [];
                                this.lstUsers.push({ label: "Select User", value: "" })
                                this.lstOrgGroups.push({ label: "Select One", value: "Select One" })
                                for (var i = 0; i < this.orgGroupData.length; i++) {
                                    if (this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                        this.lstOrgGroups.push({ label: this.orgGroupData[i].ORG_GROUP_ID + ' - ' + this.orgGroupData[i].ORG_GROUP_NAME, value: this.orgGroupData[i].ORG_GROUP_ID })
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
            this.clientErrorMsg(ex, "bindOrgGroups");
        }
    }

    checkAll() {
        try {
            this.lstCheckedBUnits = [];
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstgridfilterData[i].checkvalue = true;
                    this.lstgridfilterData[i].CHK_VALUE = 1;
                    this.lstgridfilterData[i].STATUS = true;
                }
            }
            else {
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }
                for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstDBData[i].checkvalue = true;
                    this.lstDBData[i].CHK_VALUE = 1;
                    this.lstDBData[i].STATUS = true;
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
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstgridfilterData[i].checkvalue = false;
                    this.lstgridfilterData[i].CHK_VALUE = 0;
                    this.lstgridfilterData[i].STATUS = false;
                }
            }
            else {
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }
                for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstDBData[i].checkvalue = false;
                    this.lstDBData[i].CHK_VALUE = 0;
                    this.lstDBData[i].STATUS = false;
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
                values.STATUS = true;
                values.checkvalue = true;
            }
            else {
                values.CHK_VALUE = 0;
                values.STATUS = false;
                values.checkvalue = false;
            }
            for (var i = 0; i < this.lstCheckedBUnits.length; i++) {
                var index = this.lstCheckedBUnits.indexOf(this.lstCheckedBUnits[i], 0)
                this.lstCheckedBUnits.splice(index, 1);
            }
            this.lstCheckedBUnits.push(values);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "selectedRow");
        }
    }

    ddlChange() {
        this.showGrid = false;
    }

    async ddlOrgGrpIdChanged() {
        this.showGrid = false;
        if (this.selectedOrgGroupId == "Select One") {
            this.lstUsers = [];
            this.lstUsers.push({ label: "Select User", value: "" });
            return;
        }
        this.lstDBData = new Array<MT_ATPAR_LOC_GROUPS>();
        this.spinnerService.start();
        try {
            this.bindUsersList();
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ddlOrgGrpIdChanged");
        }
    }
    BindDataGrid() {
        try {
            this.lstgridfilterData = null;
            this.lstUsersForCopyMoveDelete = [];
            this.totalCount = this.lstDBData.length;
            this.allocatedCount = this.lstDBData.filter(x => x.CHK_ALLOCATED == 1).length;
            this.lstDBMainDetails = [];
            for (let k = 0; k < this.lstDBData.length; k++) {
                this.lstDBMainDetails.push(this.lstDBData[k]);
            }
            if (this.selectedDropDownDisplay === "L") {
                this.showAllocGroup = true;
                for (let i = 0; i < this.lstUsers.length; i++) {
                    if (this.lstUsers[i].value !== this.selectedDropDownUserId)
                        this.lstUsersForCopyMoveDelete.push(this.lstUsers[i]);
                }
                this.lstDBData = this.lstDBData.filter(x => x.CHK_ALLOCATED == 1);

                if (this.lstDBData.length == 0) {
                    this.showGrid = false;
                    this.showAllocGroup = false;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });

                    return;
                }
            }
            else if (this.selectedDropDownDisplay === "U") {
                this.showAllocGroup = false;

                for (let i = 0; i < this.lstUsers.length; i++) {
                    if (this.lstUsers[i].value !== this.selectedDropDownUserId)
                        this.lstUsersForCopyMoveDelete.push(this.lstUsers[i]);
                }
                this.lstDBData = this.lstDBData.filter(x => x.CHK_ALLOCATED != 1);
                if (this.lstDBData.length == 0) {
                    this.showGrid = false;
                    this.showAllocGroup = false;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });

                    return;
                }
            }
            else {
                this.lstDBData = this.lstDBData;
                this.showAllocGroup = false;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindDataGrid");
        }
    }

    customSort1(event) {
        try {
            var element = event;
            this.lstDBData = [];
            // this.blnsortbycolumn = !this.blnsortbycolumn;
            if (this.preField == element.field) {
                if (element.order == 1) {
                    element.order = -1;
                } else {
                    element.order = 1;
                }
            } else {
                element.order = 1;
            }
            this.preField = element.field;

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
        } catch (ex) {
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

    async getAllLocationGroups() {
        this.showGrid = false;
        try {
            this.spinnerService.start();
            this.growlMessage = [];
            if (this.blnShowOrgGroupLabel == true) {
                this.orgGroupIDForDBUpdate = this.orgGrpId.split("-")[0];
            }
            else {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
                if (this.selectedOrgGroupId == "" || this.selectedOrgGroupId == "Select One" || this.selectedOrgGroupId == undefined) {
                    this.showGrid = false;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                    this.spinnerService.stop();
                    return false;
                }
            }
            if (this.selectedDropDownUserId === "Select User" || this.selectedDropDownUserId === "undefined" || this.selectedDropDownUserId == "") {
                this.spinnerService.stop();
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please select valid User ID' });
                this.showGrid = false;
                return false;
            }

            this.lstDBData = new Array<MT_ATPAR_LOC_GROUPS>();
            this.showAllocGroup = false;

            await this.AllocateLocationGroupsService.getLocationGroups(this.orgGroupIDForDBUpdate, this.selectedDropDownUserId, this.selectedLocGrpId, this.selectedDropDownDisplay, this.intAppId).catch(this.httpService.handleError).
                then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_LOC_GROUPS>;
                    this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            if (data.DataList.length > 0) {
                                this.lstDBData = [];
                                this.lstDBData = data.DataList;
                                this.showGrid = true;
                                this.selectedDropDownUserIdOp = "";

                                this.dataCheckedSorting = [];
                                this.dataUncheckedSorting = [];
                                this.BindDataGrid();
                                for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                                    if (this.lstDBData[i].CHK_ALLOCATED == 1) {
                                        this.lstDBData[i].checkvalue = true;
                                        this.dataCheckedSorting.push(this.lstDBData[i]);
                                    }
                                    else {
                                        this.lstDBData[i].checkvalue = false;
                                        this.dataUncheckedSorting.push(this.lstDBData[i]);
                                    }
                                }

                            }
                            else {
                                this.showGrid = false;
                                this.spinnerService.stop();
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                            }

                            break;
                        }
                        case StatusType.Warn: {
                            this.showGrid = false;
                            if (data.StatusCode == AtparStatusCodes.E_REMOTEERROR) {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please set ERP DataBase Details in Configuration Manager Screen" });
                            }
                            else {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            }
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
            this.clientErrorMsg(ex, "getAllLocationGroups");
        }
    }

    async insertAuditData() {
        try {
            this.spinnerService.start();
            let auditSecurity: MT_ATPAR_SECURITY_AUDIT;
            let auditSecurityLst: Array<MT_ATPAR_SECURITY_AUDIT>;
            auditSecurityLst = new Array<MT_ATPAR_SECURITY_AUDIT>();
            for (let intCnount = 0; intCnount <= this.lstFilteredBUnits.length - 1; intCnount++) {
                if (this.lstFilteredBUnits[intCnount].CHK_VALUE.toString() == "true") {
                    auditSecurity = new MT_ATPAR_SECURITY_AUDIT();
                    auditSecurity.FIELD_NAME = "CHK_VALUE";
                    auditSecurity.OLD_VALUE = "0";
                    auditSecurity.NEW_VALUE = "1";
                    auditSecurity.KEY_1 = this.deviceTokenEntry[TokenEntry_Enum.UserID];
                    auditSecurity.KEY_2 = "4";
                    auditSecurity.KEY_3 = this.lstFilteredBUnits[intCnount].BUSINESS_UNIT;
                    auditSecurity.KEY_4 = "";
                    auditSecurity.KEY_5 = "";
                    auditSecurityLst.push(auditSecurity);

                }
            }
            let strScreenName = "mt_recv_inv_bunit_alloc.aspx";
            await this.commonService.insertAuditData(auditSecurityLst, this.deviceTokenEntry[TokenEntry_Enum.UserID], strScreenName).
                catch(this.httpService.handleError).then((res: Response) => {
                    let response = res.json() as AtParWebApiResponse<MT_ATPAR_SECURITY_AUDIT>;
                    this.spinnerService.stop();
                    switch (response.StatType) {
                        case StatusType.Success: {
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: response.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                    }
                });

        } catch (ex) {
            this.clientErrorMsg(ex, "insertAuditData");
        }
    }

    async allocateLocationGroups() {
        try {
            this.growlMessage = [];
            this.spinnerService.start();
            for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                if (this.lstDBData[i].checkvalue) {
                    this.lstDBData[i].CHK_ALLOCATED = 1;
                }
                else {
                    this.lstDBData[i].CHK_ALLOCATED = 0;
                }
            }
            if (this.blnShowOrgGroupLabel == true) {
                this.orgGroupIDForDBUpdate = this.orgGrpId.split("-")[0];
            }
            else {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            }
            await this.AllocateLocationGroupsService.allocateLocationGroups(this.lstDBMainDetails, this.orgGroupIDForDBUpdate.trim(), this.selectedLocGrpId, this.selectedDropDownUserId, this.deviceTokenEntry[TokenEntry_Enum.UserID], this.clientIP, this.intAppId).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_LOC_GROUPS>;
                    this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Updated Successfully' });
                            this.selectedDropDownUserId = "";
                            this.selectedOrgGroupId = "";
                            this.selectedDropDownDisplay = "";
                            this.showGrid = false;
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            this.showGrid = false;
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            this.showGrid = false;
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            this.showGrid = false;
                            this.spinnerService.stop();
                            break;
                        }
                    }
                });

            if (this.isAuditRequired == "Y") {
                this.insertAuditData();
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "allocateLocationGroups");
        }
    }

    async copyAllocateLocationGroups() {
        this.spinnerService.start();
        this.growlMessage = [];
        if (this.selectedDropDownUserIdOp == "" || this.selectedDropDownUserIdOp == undefined) {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Valid User ID" });
            this.spinnerService.stop();
            return;
        }
        try {
            await this.AllocateLocationGroupsService.copyAllocateLocationGroups(this.lstDBData, this.selectedDropDownUserIdOp, this.deviceTokenEntry[TokenEntry_Enum.UserID],
                this.orgGroupIDForDBUpdate.trim(), this.selectedLocGrpId, this.clientIP, this.intAppId).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_LOC_GROUPS>;
                    this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Copied Successfully' });
                            this.selectedDropDownUserId = "";
                            this.selectedDropDownUserIdOp = "";
                            this.selectedOrgGroupId = "";
                            this.selectedDropDownDisplay = "";
                            this.showGrid = false;
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            this.showGrid = false;
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            this.showGrid = false;
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            this.showGrid = false;
                            this.spinnerService.stop();
                            break;
                        }
                    }
                });
            if (this.isAuditRequired == "Y") {
                this.insertAuditData();
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "copyAllocateLocationGroups");
        }
    }

    async moveAllocateLocationGroups() {
        this.spinnerService.start();
        this.growlMessage = [];
        if (this.selectedDropDownUserIdOp == "" || this.selectedDropDownUserIdOp == undefined) {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Valid User ID" });
            this.spinnerService.stop();
            return;
        }
        try {
            await this.AllocateLocationGroupsService.moveAllocateLocationGroups(this.lstDBData, this.selectedDropDownUserId, this.selectedDropDownUserIdOp,
                this.deviceTokenEntry[TokenEntry_Enum.UserID], this.orgGroupIDForDBUpdate.trim(), this.selectedLocGrpId, this.clientIP, this.intAppId).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_LOC_GROUPS>;
                    this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Moved Successfully' });
                            this.selectedDropDownUserId = "";
                            this.selectedDropDownUserIdOp = "";
                            this.selectedOrgGroupId = "";
                            this.selectedDropDownDisplay = "";
                            this.showGrid = false;
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            this.showGrid = false;
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            this.showGrid = false;
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            this.showGrid = false;
                            break;
                        }
                    }

                });



            if (this.isAuditRequired == "Y") {
                this.insertAuditData();
            }

            this.spinnerService.stop();

        }
        catch (ex) {
            this.clientErrorMsg(ex, "moveAllocateLocationGroups");
        }
    }

    async deleteAllocateLocationGroups() {
        this.spinnerService.start();
        this.growlMessage = [];
        try {
            await this.AllocateLocationGroupsService.deleteAllocateLocationGroups(this.lstDBData, this.orgGroupIDForDBUpdate.trim(), this.selectedLocGrpId, this.selectedDropDownUserId, this.intAppId).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_LOC_GROUPS>;
                    this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Deleted Successfully' });
                            this.selectedDropDownUserId = "";
                            this.selectedDropDownUserIdOp = "";
                            this.selectedOrgGroupId = "";
                            this.selectedDropDownDisplay = "";
                            this.showGrid = false;
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            this.showGrid = false;
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            this.showGrid = false;
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            this.showGrid = false;
                            this.spinnerService.stop();
                            break;
                        }
                    }

                });


            if (this.isAuditRequired == "Y") {
                this.insertAuditData();
            }

        }
        catch (ex) {
            this.clientErrorMsg(ex, "deleteAllocateLocationGroups");
        }
    }

    filterdata(event) {
        this.lstgridfilterData = new Array<MT_ATPAR_LOC_GROUPS>();
        this.lstgridfilterData = event;

    }

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }
    ngOnDestroy() {
        this.deviceTokenEntry = null;
        this.lstOrgGroups = null;
        this.lstUsers = null;
        this.lstOrgGroups = null;
        this.intAppId = null;
        this.lstBUnits = null;
        this.lstFilteredBUnits = null;
        this.lstCheckedBUnits = null;
        this.lstDBData = null;
        this.growlMessage = null;
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
        this.orgGrpIDData = null;
    }


}


