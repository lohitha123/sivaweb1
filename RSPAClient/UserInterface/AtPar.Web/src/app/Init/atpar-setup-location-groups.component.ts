import { Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { BusinessType, StatusType, TokenEntry_Enum, ClientType, EnumApps, AppParameters_Enum } from '../Shared/AtParEnums'
import { MT_ATPAR_ORG_GROUPS } from "../../app/Entities/mt_atpar_org_groups";
import { Message } from './../components/common/api';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';
import { SelectItem } from './../components/common/api';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { AtParConstants } from '../Shared/AtParConstants';
import { Http, Response, Headers } from '@angular/http';
import { MT_ATPAR_LOC_GROUPS } from '../entities/mt_atpar_loc_groups';
import { MT_ATPAR_ORG_GROUP_BUNITS } from "../../app/Entities/mt_atpar_org_group_bunits";
import { MT_DELV_EXCLUDE_LOC } from '../../app/Entities/MT_DELV_EXCLUDE_LOC';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { VM_MT_ATPAR_LOCATION_DETAILS } from '../entities/vm_mt_atpar_location_details';
import { SetupLocationGroupsServices } from './atpar-setup-location-groups.service';
import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';
import { DataTable } from '../components/datatable/datatable';
import { Menus } from '../AtPar/Menus/routepath';

declare var module: {
    id: string;
}

@Component({
    //moduleId: module.id,
    templateUrl: 'atpar-setup-location-groups.component.html',
    providers: [SetupLocationGroupsServices, AtParCommonService, HttpService, AtParConstants],
})

export class SetupLocationGroupsComponent {
    growlMessage: Message[] = [];
    @ViewChild(DataTable) dataTableComponent: DataTable;
    deviceTokenEntry: string[] = [];
    startIndex: number = 0;
    endIndex: number;
    ddlShowOrgGroupDD: boolean = false;
    blnShowOrgGroupLabel: boolean = false;
    selectedOrgGroupId: any;
    lstOrgGroupData: SelectItem[] = [];
    orgGroupList: MT_ATPAR_ORG_GROUPS[];

    lblOrgGroupId: string;
    pageSize: number;
    showGrid: boolean = false;
    dataGrid: boolean = false;
    locationNgModel: any;
    descriptionNgModel: any;
    showDiv1: boolean = true;
    showDiv2: boolean = false;
    showDiv3: boolean = false;
    statusMessage: string;
    lblOrgGroupID: string;

    lstGridData: MT_ATPAR_LOC_GROUPS[];
    mainlstGridData: Array<MT_ATPAR_LOC_GROUPS>;
    statusType: string = "";
    orgGroupIDForDBUpdate: string;
    strOrgGrpId: string;
    disableButton: boolean = true;
    div1DisableButton: boolean = true;


    gridOrgGroupID: string = "";
    gridLocation: string = "";

    lstBusinessData: MT_ATPAR_ORG_GROUP_BUNITS[];
    ddlBusinessData: SelectItem[] = [];
    businessDatangModel: string = "";
    gridLocationNgModel: string = "";
    ddlDisplay: any[] = [];
    selectedDisplayNgModel: string;
    locStatus: number = 0;

    lstDistribData: VM_MT_ATPAR_LOCATION_DETAILS[] = [];
    lstDistribTypes: VM_MT_ATPAR_LOCATION_DETAILS[];
    lstgridfilterData: VM_MT_ATPAR_LOCATION_DETAILS[] = null;
    strExcludeLocs: any;
    blnsortbycolumn: boolean = true;

    ddlStatusType: any;
    selectedOrgGroupIdData: any;
    locationNgModeldData: string = "";
    descriptionNgModelData: string = "";
    sortCol: string = "";
    breadCrumbMenu: Menus;

    OrgGroupId: string;

    constructor(private httpService: HttpService,
        private setupLocationGroupsServices: SetupLocationGroupsServices,
        private spinnerService: SpinnerService,
        private commonService: AtParCommonService,
        private atParConstant: AtParConstants
    ) {
        this.breadCrumbMenu = new Menus();
    }

    async ngOnInit() {
        try {
            this.spinnerService.start();
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.endIndex = + sessionStorage.getItem("RecordsEndindex");
            await this.bindOrgGroups();
            this.pageSize = +this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];

            this.spinnerService.stop();

            this.ddlDisplay.push({ label: 'All', value: 'ALL' });
            this.ddlDisplay.push({ label: 'Allocated', value: 'ALLOC' });
            this.ddlDisplay.push({ label: 'UnAllocated', value: 'UA' });

            this.mainlstGridData = new Array<MT_ATPAR_LOC_GROUPS>()
            this.ddlStatusType = [];
            this.ddlStatusType.push({ label: 'All', value: "" });
            this.ddlStatusType.push({ label: 'Active', value: true });
            this.ddlStatusType.push({ label: 'InActive', value: false });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    }

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    async bindOrgGroups() {
        try {
            await this.commonService.getUserOrgGroups(this.deviceTokenEntry[TokenEntry_Enum.UserID],
                this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.orgGroupList = data.DataList;
                            if (this.orgGroupList.length == 1) {
                                this.blnShowOrgGroupLabel = true;
                                this.selectedOrgGroupId = this.orgGroupList[0].ORG_GROUP_ID + " - " + this.orgGroupList[0].ORG_GROUP_NAME;
                                this.selectedOrgGroupIdData = this.orgGroupList[0].ORG_GROUP_ID;
                                this.lblOrgGroupId = this.orgGroupList[0].ORG_GROUP_ID + " - " + this.orgGroupList[0].ORG_GROUP_NAME;
                                this.OrgGroupId = this.orgGroupList[0].ORG_GROUP_ID;
                                //break;
                            }
                            else if (this.orgGroupList.length > 1) {
                                this.ddlShowOrgGroupDD = true;
                                this.lstOrgGroupData.push({ label: "Select One", value: "Select One" })
                                for (var i = 0; i < this.orgGroupList.length; i++) {
                                    if (this.orgGroupList[i].ORG_GROUP_ID != "All") {
                                        this.lstOrgGroupData.push({ label: this.orgGroupList[i].ORG_GROUP_NAME + " - " + this.orgGroupList[i].ORG_GROUP_ID, value: this.orgGroupList[i].ORG_GROUP_ID })
                                    }
                                }
                                this.selectedOrgGroupId = this.lstOrgGroupData[0].value;
                                this.selectedOrgGroupIdData = this.lstOrgGroupData[0].value;
                                this.OrgGroupId = this.lstOrgGroupData[0].value;
                                // break;
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
            this.clientErrorMsg(ex, "bindOrgGroups");
        }
    }

    ddlOrgGrpIdChanged() {
        this.showGrid = false;
        if (this.selectedOrgGroupId != "Select One") {
            if (this.locationNgModel != null && this.locationNgModel.trim().length > 0) {
                this.disableButton = false;
            } else {
                this.disableButton = true;
            }
        } else {
            this.disableButton = true;
        }
    }

    ddlOrgGrpIdChanged1() {
        if (this.selectedOrgGroupId != "Select One") {
            this.div1DisableButton = true;
        } else {
            this.div1DisableButton = false;
        }
    }

    bindModelDataChange(event: any) {
        if ("location" == event.TextBoxID.toString()) {
            this.locStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if (this.selectedOrgGroupId != "Select One" && this.locStatus == 0) {
            this.disableButton = false;
        }
        else {
            this.disableButton = true;
        }
    }

    close() {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.showDiv2 = false;
        this.showDiv1 = true;
        if (this.lstOrgGroupData.length > 1) {
            this.selectedOrgGroupId = "Select One";
            this.selectedOrgGroupIdData = "Select One";
            this.OrgGroupId = "Select One";
        }

        this.locationNgModel = "";
        this.descriptionNgModel = "";
        this.locationNgModeldData = "";
        this.descriptionNgModelData = "";
        this.growlMessage = [];
    }

    create() {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Create Location Group';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.showDiv1 = false;
        this.showDiv2 = true;
        this.showGrid = false;
        this.disableButton = true;
        this.growlMessage = [];
    }

    manage_Close() {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.sortCol = null;
        this.showDiv1 = true;
        this.showDiv3 = false;
        this.dataGrid = false;
        this.businessDatangModel = "";
        this.gridLocationNgModel = "";
        this.selectedDisplayNgModel = "";

        this.descriptionNgModel = "";
        this.locationNgModel = "";

        this.OrgGroupId = "Select One";
        this.selectedOrgGroupIdData = "Select One";
        this.locationNgModeldData = "";
        this.descriptionNgModelData = "";
        this.growlMessage = [];
    }

    btn_go() {
        this.mainlstGridData = [];
        this.lstGridData = [];
        this.statusType = "";
        if (!this.blnShowOrgGroupLabel) {
            if (this.OrgGroupId == 'Select One' || this.OrgGroupId == '' || this.OrgGroupId == null) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Select Org Group ID' });
                return;
            }
        }
        if (this.showGrid) {
            this.dataTableComponent.reset();
        }
        this.growlMessage = [];
        if (this.locationNgModeldData == undefined && this.descriptionNgModelData == undefined) {
            this.locationNgModeldData = "";
            this.descriptionNgModelData = "";
        }
        try {
            this.lstGridData = [];
            let orgGroupID = this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID];
            if (this.OrgGroupId != '' && this.OrgGroupId != undefined && this.OrgGroupId != 'Select One') {
                orgGroupID = this.OrgGroupId;
            }

            this.spinnerService.start();
            this.setupLocationGroupsServices.getLocationGroups(this.locationNgModeldData,
                this.descriptionNgModelData, orgGroupID)
                .catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_LOC_GROUPS>;
                    this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            let lstGrid = res.json().DataList;
                            if (lstGrid.length >= 0) {
                                this.lstGridData = lstGrid;
                                for (let x = 0; x < this.lstGridData.length; x++) {
                                    let setupLocationDetails = new MT_ATPAR_LOC_GROUPS();
                                    setupLocationDetails.ORG_GROUP_ID = this.lstGridData[x].ORG_GROUP_ID;
                                    setupLocationDetails.LOC_GROUP_ID = this.lstGridData[x].LOC_GROUP_ID;
                                    setupLocationDetails.LOC_DESCR = this.lstGridData[x].LOC_DESCR;
                                    setupLocationDetails.LAST_CLIENT_ADDRESS = this.lstGridData[x].LAST_CLIENT_ADDRESS;
                                    setupLocationDetails.STATUS = this.lstGridData[x].STATUS;
                                    setupLocationDetails.LAST_UPDATE_DATE = this.lstGridData[x].LAST_UPDATE_DATE;
                                    setupLocationDetails.LAST_UPDATE_USER = this.lstGridData[x].LAST_UPDATE_USER;
                                    this.mainlstGridData.push(setupLocationDetails);
                                }
                                this.showGrid = true;
                            }
                            else {
                                this.showGrid = false;
                            }
                        }
                            break;
                        case StatusType.Warn: {
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btn_go");
        }
    }

    btn_Click_Save() {
        this.growlMessage = [];
        try {
            let lblOrgGroupId: string;
            let sas: string;
            if (this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID] != "All") {
                lblOrgGroupId = this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID];
            }
            else {
                lblOrgGroupId = this.selectedOrgGroupId.trim();
            }

            this.growlMessage = [];
            if (this.descriptionNgModel == undefined || this.descriptionNgModel == null) {
                this.descriptionNgModel = "";
                sas = this.descriptionNgModel;
            }
            else {
                let a: string = this.descriptionNgModel;
                sas = a.replace(/\'/g, "''").trim();
            }

            this.spinnerService.start();
            this.setupLocationGroupsServices.insertLocationGroups(lblOrgGroupId, this.locationNgModel, sas, this.deviceTokenEntry[TokenEntry_Enum.UserID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    let response = res.json() as AtParWebApiResponse<number>;
                    this.spinnerService.stop();
                    switch (response.StatType) {
                        case StatusType.Success: {
                            let statusMessage = AtParConstants.Created_Msg.replace("1%", "Location Group").replace("2%", this.locationNgModel)
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: statusMessage });
                            this.locationNgModel = "";

                            this.descriptionNgModel = "";
                            if (!this.blnShowOrgGroupLabel) {
                                this.selectedOrgGroupId = "";
                            }

                            if (this.ddlShowOrgGroupDD) {
                                document.getElementById("txtddllstOrgGroups").focus();
                            }
                            else {
                                (<HTMLInputElement>document.getElementById("location")).focus();
                            }
                            this.disableButton = true;

                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            break;
                        }
                    }
                });

            this.spinnerService.stop();
        } catch (ex) {
            this.clientErrorMsg(ex, "btn_Click_Save");
        }
    }

    async  changeStatus(locationData) {
        try {
            this.growlMessage = [];
            this.spinnerService.start();
            await this.setupLocationGroupsServices.updateLocationGroups(locationData.STATUS, locationData.LOC_GROUP_ID, locationData.ORG_GROUP_ID).
                catch(this.httpService.handleError).then((res: Response) => {
                    let response = res.json() as AtParWebApiResponse<number>;
                    switch (response.StatType) {
                        case StatusType.Success: {

                            let statusMessage = AtParConstants.Updated_Status_Msg.replace("1%", "Location Group").replace("2%", locationData.LOC_GROUP_ID)

                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: statusMessage });

                            let filterData: any = [];
                            this.lstGridData = [];
                            let matchedrecord = this.mainlstGridData.filter(x => x.LOC_GROUP_ID == locationData.LOC_GROUP_ID)
                            matchedrecord[0].STATUS = locationData.STATUS;
                            if (this.statusType.toString() == "true") {
                                filterData = this.mainlstGridData.filter(x => x.STATUS == true)
                            } else if (this.statusType.toString() == "false") {
                                filterData = this.mainlstGridData.filter(x => x.STATUS == false)
                            } else {
                                filterData = this.mainlstGridData
                            }
                            if (filterData != null) {
                                for (let x = 0; x < filterData.length; x++) {
                                    let setuplocDetails = new MT_ATPAR_LOC_GROUPS();
                                    setuplocDetails.ORG_GROUP_ID = filterData[x].ORG_GROUP_ID;
                                    setuplocDetails.LOC_DESCR = filterData[x].LOC_DESCR;
                                    setuplocDetails.LOC_GROUP_ID = filterData[x].LOC_GROUP_ID;
                                    setuplocDetails.LAST_CLIENT_ADDRESS = filterData[x].LAST_CLIENT_ADDRESS;
                                    setuplocDetails.LAST_UPDATE_USER = filterData[x].LAST_UPDATE_USER;
                                    setuplocDetails.LAST_UPDATE_DATE = filterData[x].LAST_UPDATE_DATE;
                                    setuplocDetails.STATUS = filterData[x].STATUS;
                                    this.lstGridData.push(setuplocDetails);
                                }


                            }
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });

                            if (response.StatusCode == 1102210) {
                                this.lstGridData.filter(x => x.LOC_GROUP_ID == locationData.LOC_GROUP_ID)[0].STATUS = !locationData.STATUS;
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
            this.spinnerService.stop();
        }
        catch (ex) {
            this.spinnerService.stop();
            this.clientErrorMsg(ex, "changeStatus");
        }
    }

    async lnkbtnParams_Click(ven) {

        this.breadCrumbMenu.SUB_MENU_NAME = 'Assign Locations';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        var grdiOrgData
        grdiOrgData = ven.ORG_GROUP_ID;
        this.gridLocation = ven.LOC_GROUP_ID;
        this.showDiv1 = false;
        this.showDiv2 = false;
        this.showDiv3 = true;
        this.showGrid = false;

        this.orgGroupIDForDBUpdate = ven.ORG_GROUP_ID.split("-")[0];
        try {
            this.spinnerService.start();
            await this.commonService.getOrgGrpName(this.orgGroupIDForDBUpdate).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<string>;
                    this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success:
                            {
                                let OrgGroupdata = data.Data;
                                this.gridOrgGroupID = grdiOrgData + " - " + OrgGroupdata;

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
            this.clientErrorMsg(ex, "lnkbtnParams_Click");
        }
        try {

            this.spinnerService.start();
            await this.commonService.getOrgGroupBUnits(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.orgGroupIDForDBUpdate, BusinessType[BusinessType.AllBunits].toString()).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUP_BUNITS>;
                    this.spinnerService.stop();
                    this.ddlBusinessData = [];
                    this.ddlBusinessData.push({ label: "Select Org Id ", value: "" })
                    switch (data.StatType) {
                        case StatusType.Success:
                            {
                                this.lstBusinessData = data.DataList;
                                if (this.lstBusinessData.length > 0) {
                                    for (let i = 0; i < this.lstBusinessData.length; i++) {
                                        this.ddlBusinessData.push({ label: this.lstBusinessData[i].toString(), value: this.lstBusinessData[i].toString() })

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
            this.spinnerService.stop();


        }
        catch (ex) {
            this.clientErrorMsg(ex, "lnkbtnParams_Click");
        }
    }

    btn_Manage_go() {

        this.sortCol = null;
        this.growlMessage = [];
        this.getLocationDetails();
    }

    async   getLocationDetails() {
        try {
            if (this.dataGrid) {
                this.dataTableComponent.reset();
            }
            this.lstDistribTypes = [];
            this.growlMessage = [];
            let distribType = null;
            this.dataGrid = false;
            this.spinnerService.start();

            await this.setupLocationGroupsServices.getLocationDetails(this.businessDatangModel, this.gridLocationNgModel, EnumApps.Init, this.deviceTokenEntry[TokenEntry_Enum.UserID], this.orgGroupIDForDBUpdate, this.gridLocation).
                catch(this.httpService.handleError).then((res: Response) => {
                    this.spinnerService.stop();
                    distribType = res.json() as AtParWebApiResponse<VM_MT_ATPAR_LOCATION_DETAILS>;
                    this.lstDistribTypes = new Array<VM_MT_ATPAR_LOCATION_DETAILS>();
                    switch (distribType.StatType) {
                        case StatusType.Success: {
                            this.lstDistribData = distribType.DataList;

                            if (this.lstDistribData.length > 0) {
                                for (let i = 0; i < this.lstDistribData.length; i++) {
                                    if (this.lstDistribData[i].TYPE == "I") {
                                        this.lstDistribData[i].TYPE = "IBU";
                                    }
                                    else {
                                        this.lstDistribData[i].TYPE = "Location";
                                    }
                                }
                                this.dataGrid = true;

                            }
                            else {
                                this.dataGrid = false;
                                return;
                            }

                            if (this.selectedDisplayNgModel == "ALLOC") {

                                this.lstDistribTypes = asEnumerable(this.lstDistribData).Where(a => a.CHK_VALUE == 1).Select(a => a).ToArray();
                                if (this.lstDistribTypes.length > 0) {
                                    this.dataGrid = true;
                                }
                                else {
                                    this.dataGrid = false;
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: " No Data Found" });
                                    return;
                                }
                            }
                            else if (this.selectedDisplayNgModel == "UA") {

                                this.lstDistribTypes = asEnumerable(this.lstDistribData).Where(a => a.CHK_VALUE != 1).Select(a => a).ToArray();
                                if (this.lstDistribTypes.length > 0) {
                                    this.dataGrid = true;
                                }
                                else {
                                    this.dataGrid = false;
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: " No Data Found" });
                                    return;
                                }
                            }
                            else {

                                this.lstDistribTypes = this.lstDistribData;
                                if (this.lstDistribTypes.length > 0) {
                                    this.dataGrid = true;
                                }
                                else {
                                    this.dataGrid = false;
                                    return;
                                }
                            }
                            this.orgGroupParamValue();
                            break;
                        }
                        case StatusType.Warn: {
                            this.dataGrid = false;
                            if (distribType.StatusCode == AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS) {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Org ID is not allocated to Org Group" });
                                return;
                            }
                            else if (distribType.StatusCode == AtparStatusCodes.E_REMOTEERROR) {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please set ERP DataBase Details in Configuration Manager Screen" });
                                return;
                            }
                            else if (distribType.StatusCode == AtparStatusCodes.CRCT_E_ERPCOMPCREATION) {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "ERP interface access failed, may be this installation is for Par Management or it was not successful, please contact your manager/administrator" });
                                return;
                            }
                            else if (distribType.StatusCode == AtparStatusCodes.ATPAR_E_RECORDCOUNTEXCEEDED) {

                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please change the filter criteria to display the number of records. Max limit is 5000" });
                                return;
                            }
                            else {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: distribType.StatusMessage });
                                this.gridLocationNgModel = "";
                                this.businessDatangModel = "";
                                return;
                            }



                        }
                        case StatusType.Error: {
                            this.dataGrid = false;
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: distribType.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.dataGrid = false;
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: distribType.StatusMessage });
                            break;
                        }
                    }
                });
            this.spinnerService.stop();
        }
        catch (ex) {
            this.spinnerService.stop();
            this.clientErrorMsg(ex, "getLocationDetails");
        }
    }

    async  orgGroupParamValue() {
        let recvAppId: number = EnumApps.Deliver;
        this.spinnerService.start();
        await this.commonService.getOrgGroupParamValue(AppParameters_Enum[AppParameters_Enum.EXCLUDE_LOCATIONS].toString(), recvAppId, this.orgGroupIDForDBUpdate)
            .catch(this.httpService.handleError).then((res: Response) => {
                let data = res.json() as AtParWebApiResponse<string>;

                if (this.strExcludeLocs == "Y") {
                    this.getExcludedLocations();
                }
                else {
                    return;
                }

            });
        this.spinnerService.stop();
    }

    async   getExcludedLocations() {
        try {
            this.spinnerService.start();
            await this.setupLocationGroupsServices.getExcludedLocations().
                catch(this.httpService.handleError).then((res: Response) => {
                    let response = res.json() as AtParWebApiResponse<MT_DELV_EXCLUDE_LOC>;
                    switch (response.StatType) {
                        case StatusType.Success: {

                            this.spinnerService.stop();
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
        catch (ex) {
            this.spinnerService.stop();
            this.clientErrorMsg(ex, "getExcludedLocations");
        }
    }

    btnAssignLocs_Click() {
        this.upDateLocations();
    }

    async upDateLocations() {
        this.growlMessage = [];
        try {
            this.spinnerService.start();

            for (var intCnt = 0; intCnt <= this.lstDistribData.length - 1; intCnt++) {
                if (((this.lstDistribData[intCnt].CHK_VALUE == 1) && (this.lstDistribData[intCnt].CHK_ALLOCATED == 0))) {
                    this.lstDistribData[intCnt].PERFORM_ACTION = "1";
                }
                else if (((this.lstDistribData[intCnt].CHK_VALUE == 0) && (this.lstDistribData[intCnt].CHK_ALLOCATED == 1))) {
                    this.lstDistribData[intCnt].PERFORM_ACTION = "2";
                }
                else {
                    this.lstDistribData[intCnt].PERFORM_ACTION = "0";
                }
                if (this.lstDistribData[intCnt].TYPE == "IBU") {
                    this.lstDistribData[intCnt].TYPE = "I";
                }
                else {
                    this.lstDistribData[intCnt].TYPE = "P";
                }
            }

            await this.setupLocationGroupsServices.insertLocationDetails(
                this.businessDatangModel, this.gridLocation, this.deviceTokenEntry[TokenEntry_Enum.DeviceID],

                this.orgGroupIDForDBUpdate, this.deviceTokenEntry[TokenEntry_Enum.UserID],
                this.lstDistribData).
                catch(this.httpService.handleError).then((res: Response) => {
                    let response = res.json() as AtParWebApiResponse<string>;
                    switch (response.StatType) {
                        case StatusType.Success: {

                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Updated Successfully" });
                            this.gridLocationNgModel = "";
                            this.businessDatangModel = "";
                            this.selectedDisplayNgModel = "ALL";



                            this.dataGrid = false;
                            break;
                        }
                        case StatusType.Warn: {
                            this.dataGrid = false;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.dataGrid = false;
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.dataGrid = false;
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            break;
                        }
                    }
                });
            this.spinnerService.stop();


        }
        catch (ex) {
            this.clientErrorMsg(ex, "upDateLocations");
        }
    }

    public onSort(event) {
        try {
            var element = event;
            if (this.sortCol == element.field) {
                this.blnsortbycolumn = !this.blnsortbycolumn;
            } else {
                this.blnsortbycolumn = true;
            }
            this.sortCol = element.field

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

                    this.lstDistribTypes = checkedData.concat(unCheckedData);

                } else {
                    this.lstDistribTypes = checkedData.reverse().concat(unCheckedData.reverse());// sortedUnCheckedData.reverse();

                }
            }
        } catch (exMsg) {
            this.clientErrorMsg(exMsg, "onSort");
        }
    }

    ngOnDestroy() {
        this.ddlDisplay = null
        this.growlMessage = null;
        this.lstOrgGroupData = null;
        this.deviceTokenEntry = null;
        this.showDiv1 = null;
        this.showDiv2 = null;
        this.showDiv3 = null;
        this.showGrid = null;
        this.locationNgModel = null;
        this.descriptionNgModel = null;
        this.ddlShowOrgGroupDD = null;
        this.lblOrgGroupId = null;
        this.strOrgGrpId = null;
        this.disableButton = null;
        this.gridOrgGroupID = null;
        this.gridLocation = null;
        this.lstBusinessData = null;
        this.ddlBusinessData = null;
        this.businessDatangModel = null;
        this.selectedDisplayNgModel = null;
        this.spinnerService.stop();

    }

    checkAll() {
        try {
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.endIndex = + sessionStorage.getItem("RecordsEndindex");

            if (this.lstgridfilterData != null || this.lstgridfilterData != undefined && this.lstgridfilterData.length > 0) {

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
            this.spinnerService.stop();
            this.clientErrorMsg(ex, "checkAll");
        }
    }

    unCheckAll() {
        try {
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.endIndex = + sessionStorage.getItem("RecordsEndindex");

            if (this.lstgridfilterData != null || this.lstgridfilterData != undefined && this.lstgridfilterData.length > 0) {
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

    filterdata(event) {
        this.lstgridfilterData = new Array<VM_MT_ATPAR_LOCATION_DETAILS>();
        this.lstgridfilterData = event;
    }

    async dataFilter(evtdata, filed, filterMatchMode) {
        let filterData;
        this.lstGridData.length = 0;

        if (this.statusType.toString() == "true") {
            filterData = this.mainlstGridData.filter(x => x.STATUS == true)
        } else if (this.statusType.toString() == "false") {
            filterData = this.mainlstGridData.filter(x => x.STATUS == false)
        } else {
            filterData = this.mainlstGridData
        }
        if (filterData != null) {
            for (let x = 0; x < filterData.length; x++) {
                let setupLocationDetails = new MT_ATPAR_LOC_GROUPS();
                setupLocationDetails.ORG_GROUP_ID = filterData[x].ORG_GROUP_ID;
                setupLocationDetails.LOC_GROUP_ID = filterData[x].LOC_GROUP_ID;
                setupLocationDetails.LOC_DESCR = filterData[x].LOC_DESCR;
                setupLocationDetails.LAST_CLIENT_ADDRESS = filterData[x].LAST_CLIENT_ADDRESS;
                setupLocationDetails.STATUS = filterData[x].STATUS;
                setupLocationDetails.LAST_UPDATE_DATE = filterData[x].LAST_UPDATE_DATE;
                setupLocationDetails.LAST_UPDATE_USER = filterData[x].LAST_UPDATE_USER;
                this.lstGridData.push(setupLocationDetails);
            }
        }
    }

}
