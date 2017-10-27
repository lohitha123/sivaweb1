import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { Http, Response } from "@angular/http";
import { MT_ATPAR_ORG_GROUPS } from '../../app/Entities/MT_ATPAR_ORG_GROUPS';
import { MT_RECV_SHIPTO_ID_ALLOCATION } from '../../app/Entities/MT_RECV_SHIPTO_ID_ALLOCATION';
import { VM_RECV_SETUPSHIPTO_ID_ALLOCATION } from '../../app/Entities/VM_RECV_SETUPSHIPTO_ID_ALLOCATION';
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
    templateUrl: 'recv-allocate-shiptoids.component.html',
    providers: [HttpService, ConfirmationService, AtParCommonService, AtParConstants]
})

export class AllocateShipToIdsComponent implements OnInit {
    deviceTokenEntry: string[] = [];
    public lstUsers: SelectItem[] = [];
    lstOrgGroups: SelectItem[] = [];
    lstBUnits: any = [];
    lstFilteredBUnits: any = [];
    lstCheckedBUnits: Array<VM_RECV_SETUPSHIPTO_ID_ALLOCATION>;
    lstDBData: VM_RECV_SETUPSHIPTO_ID_ALLOCATION[];
    lstgridfilterData: VM_RECV_SETUPSHIPTO_ID_ALLOCATION[];
    startIndex: number;
    EndIndex: number;
    growlMessage: Message[] = [];
    blnShowOrgGroupLabel: boolean = false;
    blnShowOrgGroupDD: boolean = false;
    orgGrpId: string = "";
    hdnorgGrpId: string = "";
    selectedOrgGroupId: string = "";
    selectedDropDownUserId: string = "";
    selectedBunit: string = "";
    selectedDescription: string = "";
    orgGroupIDForDBUpdate: string;
    blnStatusMsg: boolean = false;
    statusMsg: string = "";
    dataCheckedSorting: VM_RECV_SETUPSHIPTO_ID_ALLOCATION[] = [];
    dataUncheckedSorting: Array<VM_RECV_SETUPSHIPTO_ID_ALLOCATION>;
    sortedcheckedrec: VM_RECV_SETUPSHIPTO_ID_ALLOCATION[];
    sorteduncheckedrec: VM_RECV_SETUPSHIPTO_ID_ALLOCATION[];
    orgGroupData: MT_ATPAR_ORG_GROUPS[];
    blnsortbycolumn: boolean = true;
    custom: string = "custom";
    showGrid: boolean = false;
    recordsPerPageSize: number;
    seletedStatus: string = "true";
    setId: string = "";
    shipToId: string = "";
    displayOptions: any;
    ddlrecords: any;
    selectednoofddlrecords: number;

    constructor(private httpService: HttpService, private _http: Http,
        private spinnerService: SpinnerService,
        private atParConstant: AtParConstants,
        private commonService: AtParCommonService) {
    }

    ngOnInit() {
        try {
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
            this.lstCheckedBUnits = new Array<VM_RECV_SETUPSHIPTO_ID_ALLOCATION>();
            this.dataCheckedSorting = new Array<VM_RECV_SETUPSHIPTO_ID_ALLOCATION>();
            this.dataUncheckedSorting = new Array<VM_RECV_SETUPSHIPTO_ID_ALLOCATION>();
            this.recordsPerPageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
            this.displayOptions = [];
            this.displayOptions.push({ label: 'ALL', value: 'A' });
            this.displayOptions.push({ label: 'Allocated', value: 'L' });
            this.displayOptions.push({ label: 'Unallocated', value: 'U' });
            this.bindOrgGroups();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    }

    async bindUsersList() {
        try {
            if (this.blnShowOrgGroupLabel == true) {
                this.orgGroupIDForDBUpdate = this.hdnorgGrpId;
            }
            else {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            }
            this.lstUsers = [];
            this.lstUsers.push({ label: "Select User", value: "Select User" });
            this.spinnerService.start();
            await this.commonService.getUsersList(this.deviceTokenEntry[TokenEntry_Enum.UserID], 4, this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).
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
                                this.hdnorgGrpId = this.orgGroupData[0].ORG_GROUP_ID;
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
            this.clientErrorMsg(ex, "bindOrgGroups");
        }
    }

    myfilterdata(event) {
        this.lstgridfilterData = new Array<VM_RECV_SETUPSHIPTO_ID_ALLOCATION>();
        this.lstgridfilterData = event;
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
                    this.lstgridfilterData[i].CHK_ALLOCATED = 0;
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
                    this.lstDBData[i].CHK_ALLOCATED = 0;
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
                    this.lstgridfilterData[i].CHK_ALLOCATED = 1;
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
                    this.lstDBData[i].CHK_ALLOCATED = 1;
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
                values.checkvalue = false;
            }
            else {
                values.CHK_ALLOCATED = 1;
                values.CHK_VALUE = 0;
                values.checkvalue = true;
            }

            for (var i = 0; i < this.lstCheckedBUnits.length; i++) {
                if (this.lstCheckedBUnits[i].SETID === values.SETID) {
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
            this.lstUsers = [];
            this.lstUsers.push({ label: "Select User", value: "Select User" });
            return;
        }

        this.lstDBData = new Array<VM_RECV_SETUPSHIPTO_ID_ALLOCATION>();
        this.spinnerService.start();

        try {
            await this.bindUsersList();
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ddlOrgGrpIdChanged");
        }
    }

    ddl_Change() {
        // this.showGrid = false;
    }

    BindDataGrid() {
        try {
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

            if (this.seletedStatus === "L") {
                this.lstDBData = this.lstDBData.filter(x => x.checkvalue == true);
                if (this.lstDBData.length == 0) {
                    this.showGrid = false;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Nd Data Found" });
                }
            }
            else if (this.seletedStatus === "U") {
                this.lstDBData = this.lstDBData.filter(x => x.checkvalue == false);
                if (this.lstDBData.length == 0) {
                    this.showGrid = false;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Nd Data Found" });
                }
            }
            else {
                return;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindDataGrid");
        }
    }

    customSort(event) {
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
                if (this.seletedStatus === "L") {
                    this.lstDBData = this.lstDBData.filter(x => x.checkvalue == true);
                    if (this.lstDBData.length == 0) {
                        this.showGrid = false;
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Nd Data Found" });
                    }
                }
                else if (this.seletedStatus === "U") {
                    this.lstDBData = this.lstDBData.filter(x => x.checkvalue == false);
                    if (this.lstDBData.length == 0) {
                        this.showGrid = false;
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Nd Data Found" });
                    }
                }
            }
            else {
                this.lstDBData = [];
                this.lstDBData = this.sortedcheckedrec.concat(this.sorteduncheckedrec);
                if (this.seletedStatus === "L") {
                    this.lstDBData = this.lstDBData.filter(x => x.checkvalue == true);
                    if (this.lstDBData.length == 0) {
                        this.showGrid = false;
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Nd Data Found" });
                    }
                }
                else if (this.seletedStatus === "U") {
                    this.lstDBData = this.lstDBData.filter(x => x.checkvalue == false);
                    if (this.lstDBData.length == 0) {
                        this.showGrid = false;
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Nd Data Found" });
                    }
                }
            }

            this.sortedcheckedrec = [];
            this.sorteduncheckedrec = [];
        }
        catch (ex) {
            this.clientErrorMsg(ex, "customSort");
        }
    }

    async getAllShipToIds() {
        this.growlMessage = [];
        this.lstgridfilterData = null;
        this.showGrid = false;
        await this.getOrgBunits();
        try {
            if ((this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == undefined || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select One") && this.blnShowOrgGroupDD) {
                this.growlMessage = [];
                this.spinnerService.stop();
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                return;
            }

            if (this.selectedDropDownUserId === "Select User" || this.selectedDropDownUserId === "undefined" || this.selectedDropDownUserId == "") {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please select valid User Id' });
                this.showGrid = false;
                return false;
            }

            if (this.blnShowOrgGroupLabel == true) {
                this.orgGroupIDForDBUpdate = this.hdnorgGrpId;
            }
            else {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            }

            if (this.lstBUnits.length == 0) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Assigned Org Business Units' });
                this.showGrid = false;
                return false;
            }

            this.lstDBData = new Array<VM_RECV_SETUPSHIPTO_ID_ALLOCATION>();

            this.spinnerService.start();
            this.httpService.get({
                "apiMethod": "/api/ShipToIDs/GetShipToIDs",
                params: {
                    "bArray": this.lstBUnits,
                    "userID": this.selectedDropDownUserId,
                    "setID": this.setId,
                    "shipToID": this.shipToId,
                    "shipToName": this.selectedDescription,
                    "serverUserID": this.deviceTokenEntry[TokenEntry_Enum.UserID],
                    "status": this.seletedStatus
                }
            }).catch(this.httpService.handleError).map((res: Response) => res.json() as AtParWebApiResponse<VM_RECV_SETUPSHIPTO_ID_ALLOCATION>)
                .subscribe((response) => {
                    switch (response.StatType) {
                        case StatusType.Success: {
                            this.lstDBData = [];
                            this.lstDBData = response.DataList;

                            for (let i = 0; i <= response.DataList.length - 1; i++) {
                                if (response.DataList[i].CHK_ALLOCATED == 1) {
                                    response.DataList[i].checkvalue = true;
                                }
                                else {
                                    response.DataList[i].checkvalue = false;
                                }
                            }

                            this.lstDBData = response.DataList;
                            this.BindDataGrid();
                            if (this.lstDBData.length != 0)
                                this.showGrid = true;
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
        catch (ex) {
            this.clientErrorMsg(ex, "getAllShipToIds");
        }
    }

    async allocateShipToIds() {
        this.growlMessage = [];
        this.spinnerService.start();
        try {
            //for (let i = 0; i <= this.lstDBData.length - 1; i++) {
            //    if (this.lstDBData[i].checkvalue) {
            //        this.lstDBData[i].CHK_ALLOCATED = 1;
            //    }
            //    else {
            //        this.lstDBData[i].CHK_ALLOCATED = 0;
            //    }
            //}
            this.httpService.create({
                "apiMethod": "/api/ShipToIDs/AllocateShipTOIDs",
                formData: this.lstDBData,
                params: {
                    "userID": this.selectedDropDownUserId,
                    "serverUserID": this.deviceTokenEntry[TokenEntry_Enum.UserID],
                    "searched": true
                }
            }).catch(this.httpService.handleError).map((res: Response) => res.json() as AtParWebApiResponse<MT_RECV_SHIPTO_ID_ALLOCATION>).subscribe(
                (response) => {
                    this.growlMessage = [];
                    switch (response.StatType) {
                        case StatusType.Success: {
                            this.spinnerService.stop();
                            if (response.DataVariable > 0) {
                                this.showGrid = false;
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'One of the Ship To ID unallocated is assigned as Default Ship To ID for the user. Please Unselect Default Ship To ID before Unallocating it.' });
                                this.spinnerService.stop();
                                break;
                            }
                            //if (this.blnShowOrgGroupDD) {
                            //    this.lstUsers = [];
                            //    this.lstUsers.push({ label: "Select User", value: "Select User" })
                            //}
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Updated Successfully' });
                            this.selectedDropDownUserId = "";
                            //this.selectedOrgGroupId = "";
                            this.selectedDescription = "";
                            this.selectedBunit = "";
                            this.showGrid = false;
                            this.spinnerService.stop();
                            this.lstDBData = [];
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
                            this.showGrid = false;
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "allocateShipToIds");
        }
    }

    public async getOrgBunits() {
        try {
            await this.commonService.getOrgGroupBUnits(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.orgGroupIDForDBUpdate, BusinessType[BusinessType.Purchasing].toString()).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUP_BUNITS>;
                    this.spinnerService.stop();
                    this.lstBUnits = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            if (data.DataList.length > 0) {
                                for (let i = 0; i < data.DataList.length; i++) {
                                    this.lstBUnits.push(data.DataList[i].toString());
                                }
                            }
                            else {
                                break;
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
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getOrgBunits");
        }
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
        this.lstBUnits = null;
        this.lstFilteredBUnits = null;
        this.lstCheckedBUnits = null;
        this.lstDBData = null;
        this.growlMessage = null;
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
    }
} 
