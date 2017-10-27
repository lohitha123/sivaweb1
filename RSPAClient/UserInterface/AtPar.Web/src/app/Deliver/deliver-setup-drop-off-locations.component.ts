import { OnInit, Component, OnDestroy, Input, ViewChild} from '@angular/core';
import { Http, Response } from "@angular/http";
import { HttpService } from '../Shared/HttpService';
import { AtParConstants } from '../Shared/AtParConstants';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { Message } from './../components/common/api';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { MT_ATPAR_ORG_GROUPS } from '../entities/mt_atpar_org_groups';
import { MT_DELV_LOC_DETAILS } from '../entities/mt_delv_loc_details';
import { DeliverySetupDropOffServices } from './deliver-setup-dropoff-location-services';
import { SelectItem } from './../components/common/api';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { ClientType, BusinessType, ModeEnum, StatusType, YesNo_Enum, TokenEntry_Enum } from '../Shared/AtParEnums';
import { Menus } from '../AtPar/Menus/routepath';
import { DataTable } from '../components/datatable/datatable';


declare var module: {
    id: string;
}

@Component({
    templateUrl: 'deliver-setup-drop-off-locations.component.html',
    providers: [AtParCommonService, HttpService, AtParConstants, DeliverySetupDropOffServices]
})

export class SetupDropOffLoactionsComponent {
    @ViewChild(DataTable) dataTableComponent: DataTable;
    searchFrom: boolean = true;
    addEditFrom: boolean = false;
    orgGrpId: string = "";
    orgGroupData: MT_ATPAR_ORG_GROUPS[];
    lblShowOrgGroupLabel: boolean = false;
    ddlShowOrgGroupId: boolean = false;
    orgGroupIdNgModel: string = "";
    lstOrgGroups: SelectItem[] = [];
    deviceTokenEntry: string[] = [];
    growlMessage: Message[] = [];
    pageSize: number;
    searchLocationNgModel: string = "";
    searchDescriptionNgModel: string = "";
    showGrid: boolean = false;
    previousLocationdata: string;
    ddlStatusType: any;
    deliversetuplocDetails: MT_DELV_LOC_DETAILS;
    lstGridData: MT_DELV_LOC_DETAILS[];
    mainlstGridData: Array<MT_DELV_LOC_DETAILS>;
    orgGroupIDForDBUpdate: string;
    statusMessage: string;
    locationValidation: number;
    orgIdDisabled: boolean = false;
    saveAndUpdateButton: boolean = true;
    mode: string;
    statusType: string = "";
    breadCrumbMenu: Menus;

    public constructor(
        private deliverySetupDropOffServices: DeliverySetupDropOffServices,
        private spinnerService: SpinnerService,
        private commonService: AtParCommonService,
        private httpService: HttpService,
        private atParConstant: AtParConstants,
    ) {
        this.breadCrumbMenu = new Menus();
    }

    async  ngOnInit() {
        try {
            this.spinnerService.start();
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.pageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
            this.ddlStatusType = [];
            this.ddlStatusType.push({ label: 'All', value: "" });
            this.ddlStatusType.push({ label: 'Active', value: true });
            this.ddlStatusType.push({ label: 'InActive', value: false });
            this.spinnerService.stop();
            this.spinnerService.start();
            this.deliversetuplocDetails = new MT_DELV_LOC_DETAILS();
            this.mainlstGridData = new Array<MT_DELV_LOC_DETAILS>()
            await this.bindOrgGroups();
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    }

    async bindOrgGroups() {
        try {
            this.spinnerService.start();
            await this.commonService.getUserOrgGroups(this.deviceTokenEntry[TokenEntry_Enum.UserID],
                this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>;
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.orgGroupData = data.DataList;
                            if (this.orgGroupData.length == 1) {
                                this.lblShowOrgGroupLabel = true;
                                this.orgGrpId = this.orgGroupData[0].ORG_GROUP_ID + " - " + this.orgGroupData[0].ORG_GROUP_NAME;
                                this.orgGroupIdNgModel = this.orgGroupData[0].ORG_GROUP_ID;
                                break;
                            }
                            else if (this.orgGroupData.length > 1) {
                                this.ddlShowOrgGroupId = true;
                                this.lstGridData = [];
                                this.lstOrgGroups = [];
                                this.lstOrgGroups.push({ label: "Select One", value: "Select One" })
                                for (var i = 0; i < this.orgGroupData.length; i++) {
                                    if (this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                        this.lstOrgGroups.push({ label: this.orgGroupData[i].ORG_GROUP_ID + " - " + this.orgGroupData[i].ORG_GROUP_NAME, value: this.orgGroupData[i].ORG_GROUP_ID + " - " + this.orgGroupData[i].ORG_GROUP_NAME })
                                    }
                                }
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
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindOrgGroups");
        }
    }

    async ddlOrgGrpIdChanged() {
        try {
            this.showGrid = false;
            if (this.orgGroupIdNgModel != "Select One") {
                if (this.deliversetuplocDetails.DROP_OFF_LOCATION_ID != null &&
                    this.deliversetuplocDetails.DROP_OFF_LOCATION_ID != undefined

                    && this.deliversetuplocDetails.DROP_OFF_LOCATION_ID.trim().length > 0) {
                    this.saveAndUpdateButton = false;
                } else {
                    this.saveAndUpdateButton = true;
                }
            }
            else {
                this.saveAndUpdateButton = true;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ddlOrgGrpIdChanged");
        }
    }

    async  btn_go() {
        try {
            this.statusType = "";
            this.mainlstGridData = [];
            this.lstGridData = [];
            this.growlMessage = [];
            if (this.ddlShowOrgGroupId) {
                if (this.orgGroupIdNgModel == "Select One" || this.orgGroupIdNgModel == "") {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select the Org Group Id " });
                }
                else {
                    this.showGrid = false;
                    this.growlMessage = [];
                    await this.getDropOffLocsLists();
                }
            }
            else {
                this.showGrid = false;
                this.growlMessage = [];
                await this.getDropOffLocsLists();
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btn_go");
        }
    }

    editOrggroupId: string;

    async   getDropOffLocsLists() {
        if (this.lblShowOrgGroupLabel) {
            this.editOrggroupId = this.orgGrpId;
            this.orgGroupIDForDBUpdate = this.orgGrpId.split("-")[0].trim();
        }
        else {
            this.editOrggroupId = this.orgGroupIdNgModel;
            this.orgGroupIDForDBUpdate = this.orgGroupIdNgModel.split("-")[0].trim();
        }
        if (this.searchLocationNgModel == undefined || this.searchLocationNgModel == null ||
            this.searchDescriptionNgModel == undefined || this.searchDescriptionNgModel == null) {
            this.searchLocationNgModel.replace(/\'/g, "''").trim();
            this.searchDescriptionNgModel.replace(/\'/g, "''").trim();
        }
        try {
            this.growlMessage = [];
            this.lstGridData = [];
            this.spinnerService.start();
            await this.deliverySetupDropOffServices.getDropOffLocs(this.searchLocationNgModel, this.searchDescriptionNgModel, this.orgGroupIDForDBUpdate, this.deviceTokenEntry)
                .catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_DELV_LOC_DETAILS>;
                    this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            let lstGrid = res.json().DataList;
                            if (lstGrid.length > 0) {
                                this.lstGridData = lstGrid;
                                for (let x = 0; x < this.lstGridData.length; x++) {
                                    let dropOfflocDetails = new MT_DELV_LOC_DETAILS();
                                    dropOfflocDetails.DROP_OFF_LOCATION_ID = this.lstGridData[x].DROP_OFF_LOCATION_ID;
                                    dropOfflocDetails.LAST_CLIENT_ADDRESS = this.lstGridData[x].LAST_CLIENT_ADDRESS;
                                    dropOfflocDetails.LAST_UPDATE_DATE = this.lstGridData[x].LAST_UPDATE_DATE;
                                    dropOfflocDetails.LAST_UPDATE_USER = this.lstGridData[x].LAST_UPDATE_USER;
                                    dropOfflocDetails.LOCATION_DESC = this.lstGridData[x].LOCATION_DESC;
                                    dropOfflocDetails.ORG_GROUP_ID = this.lstGridData[x].ORG_GROUP_ID;
                                    dropOfflocDetails.STATUS = this.lstGridData[x].STATUS;
                                    this.mainlstGridData.push(dropOfflocDetails);
                                }
                                this.showGrid = true;
                            }
                            else {
                                this.showGrid = false;
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage = [];
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage = [];
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getDropOffLocsLists");
        }
    }

    editdropOffLocation(rowData) {
        try {
            this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Drop Off Location';
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.growlMessage = [];
            this.deliversetuplocDetails = new MT_DELV_LOC_DETAILS();
            this.deliversetuplocDetails.DROP_OFF_LOCATION_ID = rowData.DROP_OFF_LOCATION_ID;
            this.previousLocationdata = rowData.DROP_OFF_LOCATION_ID;
            this.deliversetuplocDetails.LOCATION_DESC = rowData.LOCATION_DESC;
            this.deliversetuplocDetails.ORG_GROUP_ID = rowData.ORG_GROUP_ID;
            this.orgGrpId = rowData.ORG_GROUP_ID
            this.orgGrpId = this.editOrggroupId;
            this.lblShowOrgGroupLabel = true;
            this.ddlShowOrgGroupId = false;
            this.addEditFrom = true;
            this.searchFrom = false;
            this.showGrid = false;
            this.mode = ModeEnum[ModeEnum.Edit].toString();
            this.locationValidation = 0;
            this.saveAndUpdateButton = false;
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "editdropOffLocation");
        }
    }

    bindModelDataChange(event: any) {
        try {
            if ("saveLocationsNgModel" == event.TextBoxID.toString()) {
                this.locationValidation = event.validationrules.filter(x => x.status == false).length;
            }
            if (this.ddlShowOrgGroupId) {
                if (this.orgGroupIdNgModel != "Select One" && this.locationValidation == 0) {
                    this.saveAndUpdateButton = false;
                }
                else {
                    this.saveAndUpdateButton = true;
                }
            }
            else if (!this.ddlShowOrgGroupId) {
                if (this.locationValidation == 0) {
                    this.saveAndUpdateButton = false;
                }
                else {
                    this.saveAndUpdateButton = true;
                }
            }
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "bindModelDataChange");
        }
    }

    add() {
        try {
            this.breadCrumbMenu.SUB_MENU_NAME = 'Create Drop Off Location';
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.growlMessage = [];
            this.deliversetuplocDetails = new MT_DELV_LOC_DETAILS();
            this.deliversetuplocDetails.LOCATION_DESC = null;
            this.deliversetuplocDetails.DROP_OFF_LOCATION_ID = null;
            this.addEditFrom = true;
            this.searchFrom = false;
            this.showGrid = false;
            this.orgGroupIdNgModel = "Select One"
            this.mode = ModeEnum[ModeEnum.Add].toString();
            this.mode = "Add"
            this.saveAndUpdateButton = true;
            this.orgIdDisabled = false;
            this.searchDescriptionNgModel = "";
            this.searchLocationNgModel = "";
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "add");
        }
    }

    close() {
        try {
            this.breadCrumbMenu.SUB_MENU_NAME = '';
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.addEditFrom = false;
            this.searchFrom = true;
            this.showGrid = false;
            this.orgGroupIdNgModel = "Select One"
            this.deliversetuplocDetails = new MT_DELV_LOC_DETAILS();
            this.growlMessage = [];
            this.deliversetuplocDetails.DROP_OFF_LOCATION_ID = null;
            this.searchLocationNgModel = "";
            if (this.mode == "Edit") {
                this.bindOrgGroups();
                this.lblShowOrgGroupLabel = false;
            }
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "close");
        }
    }

    async saveOrUpdate() {
        try {
            if (this.mode == "Add") {
                await this.saveDropoffLocDetails();
            }
            else if (this.mode == "Edit") {
                await this.upDateDropoffLocDetails();
            }
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "saveOrUpdate");
        }
    }

    async saveDropoffLocDetails() {
        this.growlMessage = [];
        try {
            if (this.deliversetuplocDetails.LOCATION_DESC == undefined || this.deliversetuplocDetails.LOCATION_DESC == null) {
                this.deliversetuplocDetails.LOCATION_DESC = "";
            }
            if (this.lblShowOrgGroupLabel == true) {
                this.orgGroupIDForDBUpdate = this.orgGrpId.split(" - ")[0].trim();
            }
            else {
                this.orgGroupIDForDBUpdate = this.orgGroupIdNgModel;
            }
            this.deliversetuplocDetails.ORG_GROUP_ID = this.orgGroupIDForDBUpdate.split("-")[0];
            this.deliversetuplocDetails.DROP_OFF_LOCATION_ID.replace(/\'/g, "''").trim();
            this.deliversetuplocDetails.LOCATION_DESC.replace(/\'/g, "''").trim();
            this.deliversetuplocDetails.STATUS = true;
            this.spinnerService.start();
            await this.deliverySetupDropOffServices.addDropOffLocs(this.deliversetuplocDetails, this.deviceTokenEntry)
                .catch(this.httpService.handleError).then((res: Response) => {
                    let webresp = res.json() as AtParWebApiResponse<MT_DELV_LOC_DETAILS>;
                    this.spinnerService.stop();
                    switch (webresp.StatType) {
                        case StatusType.Success: {
                            this.growlMessage = [];
                            this.statusMessage = AtParConstants.Created_Msg.replace("1%", "Drop Off Location").replace("2%", this.deliversetuplocDetails.DROP_OFF_LOCATION_ID);
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: this.statusMessage });
                            this.deliversetuplocDetails = new MT_DELV_LOC_DETAILS();
                            this.orgGroupIdNgModel = "Select One";
                            this.saveAndUpdateButton = true;
                            this.showGrid = false;
                            if (this.ddlShowOrgGroupId) {
                                document.getElementById('txtddllstOrgGroups').focus();
                            }
                            else {
                                document.getElementById('saveLocationsNgModel').focus();
                            }
                            this.locationValidation = null;
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: webresp.StatusMessage });
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage = [];
                            if (webresp.StatusCode == AtparStatusCodes.ATPAR_E_LOCGRPIDALREADYEXISTS) {
                                this.growlMessage.push({
                                    severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Drop Off Location " + this.deliversetuplocDetails.DROP_OFF_LOCATION_ID + " Already  Exists"
                                });
                            }
                            else {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: webresp.StatusMessage });
                            }
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: webresp.StatusMessage });
                            break;
                        }
                    }
                });
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "saveDropoffLocDetails");
        }
    }

    async upDateDropoffLocDetails() {
        this.growlMessage = [];
        try {
            this.spinnerService.start();
            await this.deliverySetupDropOffServices.UpdateDropOffLocs(this.deliversetuplocDetails.DROP_OFF_LOCATION_ID, this.deliversetuplocDetails.LOCATION_DESC,
                this.deliversetuplocDetails.ORG_GROUP_ID, this.deviceTokenEntry[TokenEntry_Enum.UserID], this.previousLocationdata, this.deviceTokenEntry)
                .catch(this.httpService.handleError).then((webresp: Response) => {
                    this.spinnerService.stop();
                    let response = webresp.json() as AtParWebApiResponse<number>;
                    switch (response.StatType) {
                        case StatusType.Success: {
                            this.growlMessage = [];
                            this.statusMessage = AtParConstants.Updated_Msg.replace("1%", "Drop Off Location").replace("2%", this.deliversetuplocDetails.DROP_OFF_LOCATION_ID);
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: this.statusMessage });
                            document.getElementById('saveLocationsNgModel').focus();
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage = [];
                            if (response.StatusCode == AtparStatusCodes.ATPAR_E_LOCGRPIDALREADYEXISTS) {
                                this.growlMessage.push({
                                    severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Drop Off Location Id " + this.deliversetuplocDetails.DROP_OFF_LOCATION_ID + " Already  Exists"
                                });
                            }
                            else {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                            }
                        } break;
                        case StatusType.Custom: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            break;
                        }
                    }
                });
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "upDateDropoffLocDetails");
        }
    }

    edit() {
        this.growlMessage = [];
        this.addEditFrom = false;
        this.searchFrom = false;
        this.showGrid = false;
    }

    async changeStatus(droplocationData) {
        try {
            this.deliversetuplocDetails = new MT_DELV_LOC_DETAILS();
            this.deliversetuplocDetails.DROP_OFF_LOCATION_ID = droplocationData.DROP_OFF_LOCATION_ID;
            this.deliversetuplocDetails.LOCATION_DESC = droplocationData.LOCATION_DESC;
            this.deliversetuplocDetails.ORG_GROUP_ID = droplocationData.ORG_GROUP_ID;
            this.deliversetuplocDetails.STATUS = droplocationData.STATUS;
            await this.statusUpdate();
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "changeStatus");
        }
    }

    async statusUpdate() {
        let updatestatus
        this.growlMessage = [];
        try {
            this.spinnerService.start();
            if (this.deliversetuplocDetails.STATUS == true) {
                updatestatus = 1;
            }
            else {
                updatestatus = 0;
            }
            await this.deliverySetupDropOffServices.statusUpdateDropOffLocS(updatestatus, this.deliversetuplocDetails.ORG_GROUP_ID, this.deliversetuplocDetails.DROP_OFF_LOCATION_ID, this.deviceTokenEntry[TokenEntry_Enum.UserID], this.deviceTokenEntry)
                .catch(this.httpService.handleError).then(async (webresp: Response) => {
                    this.spinnerService.stop();
                    let response = webresp.json() as AtParWebApiResponse<number>;
                    switch (response.StatType) {
                        case StatusType.Success: {
                            this.lstGridData.length = 0;
                            this.growlMessage = [];
                            this.statusMessage = AtParConstants.Updated_Status_Msg.replace("1%", "Drop Off Location").replace("2%", this.deliversetuplocDetails.DROP_OFF_LOCATION_ID);
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: this.statusMessage });
                            let filterData: any = [];
                            let matchedrecord = this.mainlstGridData.filter(x => x.DROP_OFF_LOCATION_ID == this.deliversetuplocDetails.DROP_OFF_LOCATION_ID)
                            matchedrecord[0].STATUS = this.deliversetuplocDetails.STATUS;
                            if (this.statusType.toString() == "true") {
                                filterData = this.mainlstGridData.filter(x => x.STATUS == true)
                            } else if (this.statusType.toString() == "false") {
                                filterData = this.mainlstGridData.filter(x => x.STATUS == false)
                            } else {
                                filterData = this.mainlstGridData
                            }
                            if (filterData != null) {
                                for (let x = 0; x < filterData.length; x++) {
                                    let dropOfflocDetails = new MT_DELV_LOC_DETAILS();
                                    dropOfflocDetails.DROP_OFF_LOCATION_ID = filterData[x].DROP_OFF_LOCATION_ID;
                                    dropOfflocDetails.LAST_CLIENT_ADDRESS = filterData[x].LAST_CLIENT_ADDRESS;
                                    dropOfflocDetails.LAST_UPDATE_DATE = filterData[x].LAST_UPDATE_DATE;
                                    dropOfflocDetails.LAST_UPDATE_USER = filterData[x].LAST_UPDATE_USER;
                                    dropOfflocDetails.LOCATION_DESC = filterData[x].LOCATION_DESC;
                                    dropOfflocDetails.ORG_GROUP_ID = filterData[x].ORG_GROUP_ID;
                                    dropOfflocDetails.STATUS = filterData[x].STATUS;
                                    this.lstGridData.push(dropOfflocDetails);
                                }
                            }
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            break;
                        }
                    }
                });
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "statusUpdate");
        }
    }

    async dataFilter(evtdata, filed, filterMatchMode) {
        try {
            let filterData;
            this.lstGridData = [];
            if (this.statusType.toString() == "true") {
                filterData = this.mainlstGridData.filter(x => x.STATUS == true)
            } else if (this.statusType.toString() == "false") {
                filterData = this.mainlstGridData.filter(x => x.STATUS == false)
            } else {
                filterData = this.mainlstGridData
            }
            if (filterData != null) {
                for (let x = 0; x < filterData.length; x++) {
                    let dropOfflocDetails = new MT_DELV_LOC_DETAILS();
                    dropOfflocDetails.DROP_OFF_LOCATION_ID = filterData[x].DROP_OFF_LOCATION_ID;
                    dropOfflocDetails.LAST_CLIENT_ADDRESS = filterData[x].LAST_CLIENT_ADDRESS;
                    dropOfflocDetails.LAST_UPDATE_DATE = filterData[x].LAST_UPDATE_DATE;
                    dropOfflocDetails.LAST_UPDATE_USER = filterData[x].LAST_UPDATE_USER;
                    dropOfflocDetails.LOCATION_DESC = filterData[x].LOCATION_DESC;
                    dropOfflocDetails.ORG_GROUP_ID = filterData[x].ORG_GROUP_ID;
                    dropOfflocDetails.STATUS = filterData[x].STATUS;
                    this.lstGridData.push(dropOfflocDetails);
                }
            }
            this.dataTableComponent.reset();
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "dataFilter");
        }
    }

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    ngOnDestroy() {
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.showGrid = null;
        this.spinnerService.stop();
        this.pageSize = null;
        this.statusMessage = null;
        this.addEditFrom = null;
        this.locationValidation = null;
        this.saveAndUpdateButton = null;
        this.searchFrom = null;
        this.mode = null;
        this.lstGridData = null;
        this.lstOrgGroups = null;
        this.orgGroupIdNgModel = null;
        this.ddlShowOrgGroupId = null;
        this.orgGroupData = null;
        this.searchLocationNgModel = null;
        this.searchDescriptionNgModel = null;
        this.previousLocationdata = null;
        this.ddlStatusType = null;
        this.deliversetuplocDetails = null;
        this.orgGroupIDForDBUpdate = null;
        this.statusMessage = null;
        this.orgIdDisabled = null;
        this.mode = null;
        this.orgGrpId = null;
        this.lblShowOrgGroupLabel = null;
    }
}