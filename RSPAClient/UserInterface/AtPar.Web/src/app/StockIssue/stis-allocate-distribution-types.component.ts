import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Http, Response } from "@angular/http";
import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";
import { StatusType, EnumApps, YesNo_Enum, TokenEntry_Enum } from './../Shared/AtParEnums';
import { MT_ATPAR_ORG_GROUPS } from '../entities/mt_atpar_org_groups';
import { MT_ATPAR_USER } from '../entities/mt_atpar_user';
import { MT_STIS_DISTRIB_TYPE } from '../Entities/mt_stis_distrib_type'
import { AllocateDistributionTypesService } from './stis-allocate-distribution-types.service'
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { HttpService } from '../Shared/HttpService';
import { Message, SelectItem } from './../components/common/api';
import { AtParConstants } from '../Shared/AtParConstants';
import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';
import { MT_ATPAR_SECURITY_AUDIT } from '../Entities/MT_ATPAR_SECURITY_AUDIT'
import { DataTable } from '../components/datatable/datatable';

declare var module: {
    id: string;
}
@Component({
    templateUrl: 'stis-allocate-distribution-types.component.html',
    providers: [AtParCommonService, HttpService, AllocateDistributionTypesService, AtParConstants]
})

export class AllocateDistributionTypesComponent {
    @ViewChild(DataTable) dataTableComponent: DataTable;
    blnsortbycolumn: boolean = true;
    loading: boolean = true;
    deviceIDStatus: number;
    descStatus: number;
    macAddressStatus: number;
    dataGrid: boolean = false;
    _deviceTokenEntry: string[] = [];
    growlMessage: Message[] = [];
    orgGroupData: MT_ATPAR_ORG_GROUPS[];
    lstUserData: MT_ATPAR_USER[];
    lblOrgGrpID: string;
    orgGrpID: string;
    blnShowOrgGroupLabel: boolean;
    blnStatusMsg: boolean
    blnShowOrgGroupID: boolean;
    lstOrgGroups: SelectItem[] = [];
    ddlUserId: SelectItem[] = [];
    ddlDisplay: any[] = [];
    lstDistribData: MT_STIS_DISTRIB_TYPE[] = [];
    lstDistribTypes: MT_STIS_DISTRIB_TYPE[];
    // lstCheckedDistribTypes: MT_STIS_DISTRIB_TYPE[];
    sortedcheckedrec: MT_STIS_DISTRIB_TYPE[];
    sorteduncheckedrec: MT_STIS_DISTRIB_TYPE[];

    lstgridfilterData: MT_STIS_DISTRIB_TYPE[] = null;
    dataCheckedSorting: MT_STIS_DISTRIB_TYPE[] = [];
    dataUncheckedSorting: Array<MT_STIS_DISTRIB_TYPE>;

    selectedDisplay: string;
    sortField: string = "";
    appID: string;
    pageSize: number;
    startIndex: number = 0;
    endIndex: number;
    chkValue: number;
    menuCode: string;
    auditSatus: string = "";
    distribType: string = "";
    selectedOrgGroupID: string = "";
    strOrgGrpID: string;
    searched: boolean;
    selectedUserID: string;
    preField: string = "";
    selectedDistTypes: MT_STIS_DISTRIB_TYPE[];
    lstAuditData: MT_ATPAR_SECURITY_AUDIT[] = [];

    public constructor(
        private spinnerService: SpinnerService,
        private commonService: AtParCommonService,
        private httpService: HttpService,
        private distribTypesService: AllocateDistributionTypesService,
        private atParConstant: AtParConstants) {
    }

    async ngOnInit() {
        try {
            this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));

            this.startIndex = +sessionStorage.getItem("Recordsstartindex");
            this.endIndex = +sessionStorage.getItem("RecordsEndindex");
            //   this.lstCheckedDistribTypes = new Array<MT_STIS_DISTRIB_TYPE>();
            this.dataCheckedSorting = new Array<MT_STIS_DISTRIB_TYPE>();
            this.dataUncheckedSorting = new Array<MT_STIS_DISTRIB_TYPE>();
            this.appID = (EnumApps.StockIssue).toString();
            this.menuCode = 'mt_stis_allocate_dist_types_setup.aspx';
            this.ddlDisplay.push({ label: 'All', value: 'A' });
            this.ddlDisplay.push({ label: 'Allocated', value: 'AL' });
            this.ddlDisplay.push({ label: 'UnAllocated', value: 'N' });
            this.selectedDisplay = this.ddlDisplay[0].value;
            this.spinnerService.start();
            this.checkAuditAllowed();
            await this.bindOrgGroups();
            if (this.blnShowOrgGroupID) {
                this.ddlUserId = [];
                this.ddlUserId.push({ label: "Select User", value: "Select User" });
            }
            this.pageSize = + this._deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
            this.spinnerService.stop();
        } catch (exMsg) {
            this.clientErrorMsg(exMsg, 'ngOnInit');
        }
    }

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    async bindOrgGroups() {
        try {
            this.spinnerService.start();
            this.growlMessage = [];
            if (this._deviceTokenEntry[TokenEntry_Enum.OrgGrpID] == "All") {
                await this.commonService.getOrgGroupIDS().
                    catch(this.httpService.handleError).then((res: Response) => {
                        let webresp = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>;
                        this.spinnerService.stop();
                        switch (webresp.StatType) {
                            case StatusType.Success: {
                                this.orgGroupData = webresp.DataList;

                                // this.blnStatusMsg = false;
                                if (this.orgGroupData.length > 0) {
                                    this.blnShowOrgGroupID = true;
                                    this.lstOrgGroups.push({ label: "Select One", value: "Select One" })
                                    for (var i = 0; i < this.orgGroupData.length; i++) {
                                        if (this.orgGroupData[i].ORG_GROUP_ID != "All") {
                                            this.lstOrgGroups.push({ label: this.orgGroupData[i].ORG_GROUP_ID + " - " + this.orgGroupData[i].ORG_GROUP_NAME, value: this.orgGroupData[i].ORG_GROUP_ID })
                                        }
                                    }
                                }
                                break;
                            }
                            case StatusType.Warn: {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                                break;
                            }
                            case StatusType.Error: {
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                                break;
                            }
                            case StatusType.Custom: {
                                this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: webresp.StatusMessage });
                                break;
                            }
                        }
                    });
            }
            else {
                this.spinnerService.start();
                await this.commonService.getUserOrgGroups(this._deviceTokenEntry[TokenEntry_Enum.UserID], this._deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).
                    catch(this.httpService.handleError).then((res: Response) => {
                        let orgGroups = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>;
                        this.spinnerService.stop()
                        switch (orgGroups.StatType) {
                            case StatusType.Success: {
                                this.orgGroupData = orgGroups.DataList;
                                this.blnShowOrgGroupLabel = true;
                                this.lblOrgGrpID = this.orgGroupData[0].ORG_GROUP_ID + " - " + this.orgGroupData[0].ORG_GROUP_NAME;

                                if (this.blnShowOrgGroupLabel) {
                                    this.populateUsersDropDown();
                                }
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
        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindOrgGroups");
        }
    }

    private async checkAuditAllowed() {
        this.growlMessage = [];
        try {
            let webresp = new AtParWebApiResponse<string>();
            await this.commonService.getAuditAllowed(this.appID, this.menuCode)
                .catch(this.httpService.handleError).then((res: Response) => {
                    webresp = res.json() as AtParWebApiResponse<string>
                    this.spinnerService.stop();
                    switch (webresp.StatType) {

                        case StatusType.Success: {
                            this.auditSatus = webresp.Data;
                            break
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage })
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage })
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: webresp.StatusMessage })
                            break;
                        }
                    }

                });
        } catch (ex) {
            this.clientErrorMsg(ex, "checkAuditAllowed");
        }
    }

    async populateUsersDropDown() {
        try {
            this.ddlUserId = [];
            this.selectedUserID = "";
            if (this._deviceTokenEntry[TokenEntry_Enum.OrgGrpID] != "All") {
                this.orgGrpID = this._deviceTokenEntry[TokenEntry_Enum.OrgGrpID];
            }
            if (this.blnShowOrgGroupID) {
                this.orgGrpID = this.selectedOrgGroupID;
            }

            this.spinnerService.start();
            await this.commonService.getUsersList(this._deviceTokenEntry[TokenEntry_Enum.UserID], EnumApps.StockIssue, this.orgGrpID)
                .catch(this.httpService.handleError).then((res: Response) => {
                    let webresp = res.json() as AtParWebApiResponse<MT_ATPAR_USER>
                    this.spinnerService.stop();
                    this.ddlUserId.push({ label: "Select User", value: "Select User" });
                    switch (webresp.StatType) {
                        case StatusType.Success: {
                            this.lstUserData = webresp.DataList;
                            for (var i = 0; i < this.lstUserData.length; i++) {
                                this.ddlUserId.push({ label: this.lstUserData[i].FULLNAME, value: this.lstUserData[i].USER_ID })
                            }
                            break
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage })
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage })
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: webresp.StatusMessage })
                            break;
                        }
                    }

                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "populateUsersDropDown");
        }
    }

    public async go() {
        try {

            this.lstgridfilterData = null;
            this.dataGrid = false;
            this.sortField = "CHK_VALUE";
            this.growlMessage = [];
            if (this.blnShowOrgGroupID) {
                if (this.selectedOrgGroupID == 'Select One' || this.selectedOrgGroupID == undefined || this.selectedOrgGroupID == "") {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID " });
                    return;
                }
            }
            if (this.selectedUserID == 'Select User' || this.selectedUserID == undefined || this.selectedUserID == "") {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select valid UserId " });
                return;
            }
            else {
                this.spinnerService.start();
                if (this.distribType != null || this.distribType != "") {
                    this.searched = true;
                }
                if (this.blnShowOrgGroupLabel) {
                    this.strOrgGrpID = this._deviceTokenEntry[TokenEntry_Enum.OrgGrpID].toString();
                }
                if (this.blnShowOrgGroupID) {
                    this.strOrgGrpID = this.selectedOrgGroupID;
                }

                await this.distribTypesService.getDistributionTypes(this.distribType, this.selectedUserID, this.strOrgGrpID)
                    .catch(this.httpService.handleError).then((res: Response) => {
                        let distribType = res.json() as AtParWebApiResponse<MT_STIS_DISTRIB_TYPE>;
                        this.lstDistribTypes = new Array<MT_STIS_DISTRIB_TYPE>();

                        switch (distribType.StatType) {
                            case StatusType.Success: {
                                this.dataGrid = true;
                                this.lstDistribData = distribType.DataList;
                                this.dataCheckedSorting = asEnumerable(this.lstDistribData).Where(a => a.CHK_VALUE == 1).Select(a => a).ToArray();
                                this.dataUncheckedSorting = asEnumerable(this.lstDistribData).Where(a => a.CHK_VALUE != 1).Select(a => a).ToArray();

                                if (this.lstDistribData.length > 0) {
                                    if (this.selectedDisplay == "AL") {

                                        //  this.lstDistribTypes = asEnumerable(this.lstDistribData).Where(a => a.CHK_VALUE == 1).Select(a => a).ToArray();
                                        this.lstDistribTypes = this.dataCheckedSorting.sort((a, b) => {
                                            if (a.DISTRIB_TYPE < b.DISTRIB_TYPE) return -1;
                                            if (a.DISTRIB_TYPE > b.DISTRIB_TYPE) return 1;
                                            return 0;
                                        })

                                    }
                                    else if (this.selectedDisplay == "N") {

                                        // this.lstDistribTypes = asEnumerable(this.lstDistribData).Where(a => a.CHK_VALUE != 1).Select(a => a).ToArray();
                                        this.lstDistribTypes = this.dataUncheckedSorting.sort((a, b) => {
                                            if (a.DISTRIB_TYPE < b.DISTRIB_TYPE) return -1;
                                            if (a.DISTRIB_TYPE > b.DISTRIB_TYPE) return 1;
                                            return 0;
                                        })
                                    }
                                    else {

                                        this.lstDistribTypes = this.dataCheckedSorting.sort((a, b) => {
                                            if (a.DISTRIB_TYPE < b.DISTRIB_TYPE) return -1;
                                            if (a.DISTRIB_TYPE > b.DISTRIB_TYPE) return 1;
                                            return 0;
                                        }).concat(this.dataUncheckedSorting.sort((a, b) => {
                                            if (a.DISTRIB_TYPE < b.DISTRIB_TYPE) return -1;
                                            if (a.DISTRIB_TYPE > b.DISTRIB_TYPE) return 1;
                                            return 0;
                                        }));
                                    }
                                }
                                else {
                                    this.dataGrid = false;
                                }
                                this.dataCheckedSorting = asEnumerable(this.lstDistribData).Where(a => a.CHK_VALUE == 1).Select(a => a).ToArray();
                                this.dataUncheckedSorting = asEnumerable(this.lstDistribData).Where(a => a.CHK_VALUE != 1).Select(a => a).ToArray();

                                break;
                            }

                            case StatusType.Warn: {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: distribType.StatusMessage });
                                break;
                            }
                            case StatusType.Error: {
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: distribType.StatusMessage });
                                break;
                            }
                            case StatusType.Custom: {
                                this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: distribType.StatusMessage });
                                break;
                            }
                        }

                    });
                this.spinnerService.stop();
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "go");
        }

    }

    filterdata(event) {
        this.lstgridfilterData = new Array<MT_STIS_DISTRIB_TYPE>();
        this.lstgridfilterData = event;
    }

    public onSort1(event) {
        try {
            var element = event;
            this.blnsortbycolumn = !this.blnsortbycolumn;
            this.blnsortbycolumn = !this.blnsortbycolumn;
            let checkedData = asEnumerable(this.lstDistribTypes).Where(a => a.CHK_VALUE == 1).ToArray();
            let unCheckedData = asEnumerable(this.lstDistribTypes).Where(a => a.CHK_VALUE == 0).ToArray();
            if (event.data != null && event.data.length > 0) {


                checkedData = checkedData.sort(function (a, b) {

                    if (a[element.field] < b[element.field])
                        return -1;
                    if (a[element.field] > b[element.field])
                        return 1;
                    return 0;
                });
                unCheckedData = unCheckedData.sort(function (a, b) {

                    if (a[element.field] < b[element.field])
                        return -1;
                    if (a[element.field] > b[element.field])
                        return 1;
                    return 0;
                });
                if (event.order == -1) {


                    this.lstDistribTypes = checkedData.reverse().concat(unCheckedData.reverse());// sortedUnCheckedData.reverse();
                } else {

                    this.lstDistribTypes = checkedData.concat(unCheckedData);
                }
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "onSort");
        }

    }

    onSort(event, field) {
        try {
            var element = event;
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
            let result = null;
            let order: boolean;

            if (this.selectedDisplay == "AL") {
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
                this.lstDistribTypes = this.sortedcheckedrec;

            }

            else if (this.selectedDisplay == "N") {
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
                this.lstDistribTypes = this.sorteduncheckedrec;
            }
            else {


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
                this.lstDistribTypes = this.sortedcheckedrec.concat(this.sorteduncheckedrec);
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "customSort");
        }

       // this.lstDistribTypes = [];

        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
    }

    checkAll() {
        try {
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.endIndex = + sessionStorage.getItem("RecordsEndindex");

            if (this.lstgridfilterData != null || this.lstgridfilterData != undefined) {

                if (this.endIndex > this.lstgridfilterData.length) {
                    this.endIndex = this.lstgridfilterData.length;
                }

                for (let i = this.startIndex; i <= this.endIndex - 1; i++) {
                    this.lstgridfilterData[i].CHK_VALUE = 1;
                }

            }
            else {
                if (this.endIndex > this.lstDistribTypes.length) {
                    this.endIndex = this.lstDistribTypes.length;
                }
                for (let i = this.startIndex; i <= this.endIndex - 1; i++) {
                    this.lstDistribTypes[i].CHK_VALUE = 1;
                }
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "checkAll");
        }
    }

    unCheckAll() {

        try {
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.endIndex = + sessionStorage.getItem("RecordsEndindex");

            if (this.lstgridfilterData != null || this.lstgridfilterData != undefined) {

                if (this.endIndex > this.lstgridfilterData.length) {
                    this.endIndex = this.lstgridfilterData.length;
                }

                for (let i = this.endIndex - 1; i >= this.startIndex; i--) {
                    this.lstgridfilterData[i].CHK_VALUE = 0;
                }
            } else {
                if (this.endIndex > this.lstDistribTypes.length) {
                    this.endIndex = this.lstDistribTypes.length;
                }
                for (let i = this.endIndex - 1; i >= this.startIndex; i--) {
                    this.lstDistribTypes[i].CHK_VALUE = 0;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "unCheckAll");
        }
    }

    changeStatus(allocate) {
        try {
            let lstAllocateDistTypes = new Array<MT_STIS_DISTRIB_TYPE>();

            for (let x = 0; x < allocate.length; x++) {

                this.lstDistribTypes.push(allocate);
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "changeStatus");
        }
    }

    allocateDistributionTypes() {
        try {
            this.growlMessage = [];
            if (this.distribType != "") {
                this.searched = true;
            }
            else {
                this.searched = false;
            }
            if (this.selectedUserID == "Select User") {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select valid UserId" });
                return;
            }
            this.spinnerService.start();
            let selectedDistbTypes = asEnumerable(this.lstDistribData).Where(a => a.CHK_VALUE == 1).Select(a => a).ToArray();
            this.distribTypesService.allocateDistributionTypes(this._deviceTokenEntry[TokenEntry_Enum.UserID], this.selectedUserID, selectedDistbTypes, this.searched)
                .catch(this.httpService.handleError).then((res: Response) => {
                    let webresp = res.json() as AtParWebApiResponse<MT_STIS_DISTRIB_TYPE>
                    switch (webresp.StatType) {
                        case StatusType.Success: {
                            webresp.StatusMessage = "Updated Successfully"
                            this.distribType = ""
                            this.dataGrid = false;
                            this.selectedDisplay = this.ddlDisplay[0].value;
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: webresp.StatusMessage });
                            if (this.auditSatus == YesNo_Enum[YesNo_Enum.Y].toString()) {
                                for (var i = 0; i <= selectedDistbTypes.length - 1; i++) {
                                    let auditData = new MT_ATPAR_SECURITY_AUDIT();
                                    auditData.FIELD_NAME = "CHK_VALUE";
                                    auditData.OLD_VALUE = "0";
                                    auditData.NEW_VALUE = "1";
                                    auditData.KEY_1 = this.selectedUserID;
                                    auditData.KEY_2 = this.appID;
                                    auditData.KEY_3 = selectedDistbTypes[i].DISTRIB_TYPE;
                                    auditData.KEY_4 = '';
                                    auditData.KEY_5 = '';
                                    this.lstAuditData.push(auditData);
                                }
                                this.spinnerService.start();
                                this.commonService.insertAuditData(this.lstAuditData, this._deviceTokenEntry[TokenEntry_Enum.UserID], this.menuCode).
                                    catch(this.httpService.handleError).then((res: Response) => {
                                        let response = res.json() as AtParWebApiResponse<MT_ATPAR_SECURITY_AUDIT>;
                                        this.spinnerService.stop();
                                        switch (response.StatType) {
                                            case StatusType.Success: {
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
                            this.spinnerService.stop();
                            if (this.blnShowOrgGroupID) {
                                this.selectedUserID = "Select User";
                            }
                            if (this.blnShowOrgGroupLabel) {
                                this.populateUsersDropDown();
                            }
                            break;
                        }

                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: webresp.StatusMessage });
                            break;
                        }
                    }
                });

        } catch (ex) {
            this.clientErrorMsg(ex, "allocateDistributionTypes");
        }
    }

    ddlOrgGrpIdChanged() {
        try {
            this.growlMessage = [];
            this.dataGrid = false;
            if (this.selectedOrgGroupID == 'Select One') {
                this.dataGrid = false;
                this.ddlUserId = [];
                this.ddlUserId.push({ label: 'Select User', value: 'Select User' });
            }
            else {
                this.populateUsersDropDown();
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ddlOrgGrpIdChanged");
        }
    }

    ddlUserChange() {
        this.dataGrid = false;
    }

    ngOnDestroy() {
        this._deviceTokenEntry = [];
        this.growlMessage = [];
        this.orgGroupData = [];
        this.lstUserData = [];
        this.lblOrgGrpID = "";
        this.orgGrpID = "";
        this.lstOrgGroups = [];
        this.ddlUserId = [];
        this.ddlDisplay = [];
        this.lstDistribData = [];
        this.lstDistribTypes = [];
        //  this.lstCheckedDistribTypes = [];
        this.dataCheckedSorting = null;
        this.dataUncheckedSorting = null;
        this.selectedDistTypes = [];
        this.lstAuditData = [];
        this.spinnerService.stop();
    }

}