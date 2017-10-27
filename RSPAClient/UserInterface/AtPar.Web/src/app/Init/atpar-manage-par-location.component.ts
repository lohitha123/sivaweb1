import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, ViewChild, Input } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { HttpService } from '../Shared/HttpService';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { TokenEntry_Enum, ClientType, ModeEnum, BusinessType } from '../Shared/AtParEnums';
import { SelectItem, Message } from '../components/common/api';
import { StatusType, EnumApps } from '../Shared/AtParEnums';
import { AtParConstants } from '../Shared/AtParConstants';
import { ManageParLocServcies } from './atpar-manage-par-location.service';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { VM_PAR_MNGT_SETUP_LOCATIONS } from '../entities/vm_par_mngt_setup_locations';
import { PAR_MNGT_ITEM } from '../entities/par_mngt_item';
import { VM_PAR_MNGT_PAR_LOCATION } from '../entities/vm_par_mngt_par_location';
import { PAR_MNGT_PAR_LOC_DETAILS } from '../entities/par_mngt_par_loc_details';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { ConfirmDialogModule } from '../components/confirmdialog/confirmdialog';
import { ConfirmationService, Confirmation } from '../components/common/api';
import { DataTable } from '../components/datatable/datatable';
import { Menus } from '../AtPar/Menus/routepath';
import { Http, Response } from "@angular/http";
declare var module: {
    id: string;
}

@Component({
    selector: 'manage-par-location',
    templateUrl: 'atpar-manage-par-location.component.html',
    providers: [AtParCommonService, AtParConstants, ManageParLocServcies, ConfirmationService],
})

export class ManageParLocationComponent {
    @Input() appId: string;
    intAppId: number;
    @ViewChild(DataTable) dataTableComponent: DataTable;
    pageSize: number;
    deviceTokenEntry: any;
    growlMessage: Message[] = [];
    lstOrgGroups: SelectItem[] = [];
    lstOrgIds: SelectItem[] = [];
    page: boolean = true;
    pop: boolean = false;
    table: boolean = false;
    showOrgDropdown: boolean = false;
    ORG_GROUP_ID: string;
    ORG_ID: string;
    DEPT_ID: string = '';
    DEPT_NAME: string = '';
    PAR_LOC_ID: string = '';
    PAR_LOC_NAME: string = '';
    ITEM_ID: string = '';
    ITEM_DESC: string = '';
    PRICE_FROM: string = '';
    PRICE_TO: string = '';
    lstParLocations: VM_PAR_MNGT_SETUP_LOCATIONS[] = [];
    lstAddParLocations: VM_PAR_MNGT_SETUP_LOCATIONS[] = [];
    lstAllocLocations: VM_PAR_MNGT_PAR_LOCATION[] = [];
    lstInsertParItems: VM_PAR_MNGT_PAR_LOCATION[] = [];
    lstItems: PAR_MNGT_ITEM[] = [];
    filteredLstItems: PAR_MNGT_ITEM[] = [];
    lstSubItems: SelectItem[] = [];
    selectedItemID: any;
    selectedItem: any;
    showTrSubItem: boolean = false;
    returnType: any;
    lstOrderingTypes: SelectItem[] = [];
    lstReplishmentTypes: SelectItem[] = [];
    lstFKFlags: SelectItem[] = [];
    lstRequisitionTypes: SelectItem[] = [];
    lstInvBunits: SelectItem[] = [];
    lstCostCenters: SelectItem[] = [];
    intInvBcnt: number = 0;
    intCCcnt: number = 0;
    selectType: string;
    subItemID: any;
    strParIDs: string;
    showSaveBtn: boolean = true;
    disableSaveBtn: boolean = true;
    showValidate: boolean = true;
    isFOQMandatory: boolean = false;
    isMaxMandatory: boolean = false;
    breadCrumbMenu: Menus;
    lstGridFilterData: VM_PAR_MNGT_SETUP_LOCATIONS[] = [];
    lstGridParFilterData: VM_PAR_MNGT_PAR_LOCATION[] = [];
    txtPriceFrom: number;
    txtPriceTo: number;
    loading: boolean = false;

    constructor(private spinnerService: SpinnerService,
        private atParCommonService: AtParCommonService,
        private atParManageParLocServices: ManageParLocServcies,
        private httpService: HttpService,
        private confirmationService: ConfirmationService,
        private atParConstant: AtParConstants) {

        this.breadCrumbMenu = new Menus();
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
    }

    async ngOnInit() {
        this.intAppId = parseInt(this.appId);
        this.pageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        await this.bindOrgGroupDropdown();
    }

    async bindOrgGroupDropdown() {
        try {
            await this.atParCommonService.getOrgDetails(this.deviceTokenEntry[TokenEntry_Enum.UserID])
                .catch(this.httpService.handleError).then((result: Response) => {
                    let res = result.json() as AtParWebApiResponse<any>;
                    this.growlMessage = [];
                    this.lstOrgIds = [];
                    this.lstOrgGroups = [];
                    this.lstOrgIds.push({ label: 'Select One', value: '' });
                    switch (res.StatType) {
                        case StatusType.Success: {
                            if (res.DataList.length > 1) {
                                this.spinnerService.stop();
                                this.showOrgDropdown = true;
                                this.lstOrgGroups.push({ label: 'Select One', value: 'Select One' });
                                for (var i = 0; i < res.DataList.length; i++) {
                                    if (res.DataList[i].ORG_GROUP_ID != 'All') {
                                        this.lstOrgGroups.push({ label: (res.DataList[i].ORG_GROUP_ID + ' - ' + res.DataList[i].ORG_GROUP_NAME), value: res.DataList[i].ORG_GROUP_ID })
                                    }
                                }
                            }
                            else {
                                this.showOrgDropdown = false;
                                this.ORG_GROUP_ID = res.DataList[0].ORG_GROUP_ID + ' - ' + res.DataList[0].ORG_GROUP_NAME;
                                this.atParCommonService.getOrgIds(this.deviceTokenEntry[TokenEntry_Enum.UserID])
                                    .catch().then((result) => {
                                        this.spinnerService.stop();
                                        let res = result.json() as AtParWebApiResponse<any>;
                                        switch (res.StatType) {
                                            case StatusType.Success: {
                                                for (var i = 0; i < res.DataList.length; i++) {
                                                    this.lstOrgIds.push({ label: res.DataList[i].toString(), value: res.DataList[i].toString() })
                                                }
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
                                    })
                            }

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
            this.clientErrorMsg(ex, "bindOrgGroupDropdown");
        }
    }

    async ddlOrgGroup_SelectedIndexChanged() {
        this.lstParLocations = [];
        if (this.ORG_GROUP_ID != undefined && this.ORG_GROUP_ID != 'Select One') {
            await this.bindOrgIds();
            //trDetails.Visible = False
        }
        else {
            this.lstOrgIds = [];
            this.lstOrgIds.push({ label: 'Select One', value: '' });
        }
        this.ORG_ID = 'Select One';

    }

    ddlBUnit_SelectedIndexChanged() {
        this.lstParLocations = [];
    }
    async bindOrgIds() {
        try {
            this.spinnerService.start();
            await this.atParCommonService.getOrgBusinessUnits(this.ORG_GROUP_ID, BusinessType.Inventory.toString())
                .catch(this.httpService.handleError).then((result: Response) => {
                    this.spinnerService.stop();
                    let res = result.json() as AtParWebApiResponse<any>;
                    this.growlMessage = [];
                    this.lstOrgIds = [];
                    this.lstOrgIds.push({ label: 'Select One', value: '' });
                    switch (res.StatType) {
                        case StatusType.Success: {
                            for (var i = 0; i < res.DataList.length; i++) {
                                this.lstOrgIds.push({ label: res.DataList[i].toString(), value: res.DataList[i].toString() })
                            }
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

                })
        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindOrgIds");
        }
    }

    async btnGo_Click() {
        try {
            this.growlMessage = [];
            this.lstAddParLocations = [];
            this.selectedItem = '';
            this.selectedItemID = '';

            this.validateInput();

            if (this.returnType == StatusType.Success) {
                let orgGroupID = '';
                if (this.showOrgDropdown) {
                    orgGroupID = this.ORG_GROUP_ID;
                } else {
                    orgGroupID = this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID];
                }
                this.spinnerService.start();
                await this.atParManageParLocServices.getMultipleLocations(this.ORG_ID, this.PAR_LOC_ID, this.PAR_LOC_NAME, orgGroupID, this.DEPT_ID, this.DEPT_NAME, this.ITEM_ID, this.ITEM_DESC, this.PRICE_FROM, this.PRICE_TO, this.intAppId)
                    .catch(this.httpService.handleError).then((result: Response) => {
                        this.spinnerService.stop();
                        let res = result.json() as AtParWebApiResponse<VM_PAR_MNGT_SETUP_LOCATIONS>;
                        this.growlMessage = [];
                        this.lstParLocations = [];
                        switch (res.StatType) {
                            case StatusType.Success: {
                                this.lstParLocations = res.DataList;
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
                    })
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnGo_Click");
        }
    }

    async filterItemID(event) {
        try {
            let query = event.query.toUpperCase();
            this.atParCommonService.getItems('', this.ORG_ID, this.intAppId)
                .catch(this.httpService.handleError).then((result: Response) => {
                    this.spinnerService.stop();
                    let res = result.json() as AtParWebApiResponse<PAR_MNGT_ITEM>;
                    this.growlMessage = [];
                    this.lstItems = [];
                    switch (res.StatType) {
                        case StatusType.Success: {
                            this.lstItems = res.DataList;
                            if (query == '%') {
                                this.filteredLstItems = this.lstItems;
                            }
                            else {
                                this.filteredLstItems = this.lstItems.filter(x => (x.ITEM_ID.toUpperCase().startsWith(query) ||
                                    x.ITEM_ID.toUpperCase().endsWith(query) || x.ITEM_ID.toUpperCase() == query ||
                                    x.SHORT_DESCR.toUpperCase().startsWith(query) || x.SHORT_DESCR.toUpperCase().endsWith(query) ||
                                    x.SHORT_DESCR.toUpperCase() == query) && x.STATUS == 0);
                            }

                            for (var i = 0; i < this.filteredLstItems.length; i++) {
                                this.filteredLstItems[i].FILTERED_STRING = this.filteredLstItems[i].ITEM_ID + ' - ' + this.filteredLstItems[i].SHORT_DESCR;
                            }
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
                })
        }
        catch (ex) {
            this.clientErrorMsg(ex, "filterItemID");
        }
    }

    myfirstfilterdata(event) {
        this.lstGridFilterData = new Array<VM_PAR_MNGT_SETUP_LOCATIONS>();
        this.lstGridFilterData = event;
    }

    chkAll_Click() {
        try {
            this.spinnerService.start();
            var list = []
            if (this.lstGridFilterData == undefined || this.lstGridFilterData == null || this.lstGridFilterData.length == 0) {
                for (var i = 0; i < this.lstParLocations.length; i++) {
                    this.lstParLocations[i].SELECTED_LOCATION = true;
                    list.push(this.lstParLocations[i]);
                }
            } else {
                for (var i = 0; i < this.lstGridFilterData.length; i++) {
                    this.lstGridFilterData[i].SELECTED_LOCATION = true;
                    list.push(this.lstGridFilterData[i]);
                }
            }
            this.lstAddParLocations = list;
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "chkAll_Click");
        }
    }

    chkNone_Click() {
        try {
            this.spinnerService.start();
            if (this.lstGridFilterData == undefined || this.lstGridFilterData != null || this.lstGridFilterData.length == 0) {
                for (var i = 0; i < this.lstParLocations.length; i++) {
                    this.lstParLocations[i].SELECTED_LOCATION = false;
                }
            } else {
                for (var i = 0; i < this.lstGridFilterData.length; i++) {
                    this.lstGridFilterData[i].SELECTED_LOCATION = false;
                }
            }
            this.lstAddParLocations = [];
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "chkNone_Click");
        }
    }

    switch_Click(e, objParLoc) {
        if (e) {
            objParLoc.SELECTED_LOCATION = true;
            this.lstAddParLocations.push(objParLoc);
        } else {
            objParLoc.SELECTED_LOCATION = false;
            for (var i = 0; i < this.lstAddParLocations.length; i++) {
                if (this.lstAddParLocations[i].PAR_LOC_ID === objParLoc.PAR_LOC_ID) {
                    var index = this.lstAddParLocations.indexOf(this.lstAddParLocations[i], 0)
                    this.lstAddParLocations.splice(index, 1);
                }
            }
        }
    }

    async  btnAdd_Click(SelType) {
        await this.getProfileParamValue();
        await this.showItemsPopUp(SelType);
    }

    async  btnUpdate_Click(SelType) {
        await this.getProfileParamValue();
        await this.showItemsPopUp(SelType);
    }

    async getProfileParamValue() {
        try {
            await this.atParCommonService.getProfileParamValue(this.deviceTokenEntry[TokenEntry_Enum.ProfileID], this.intAppId, 'MAX_ALLOW_QTY')
                .catch(this.httpService.handleError).then((result: Response) => {
                    let res = result.json() as AtParWebApiResponse<any>;
                    this.growlMessage = [];
                    switch (res.StatType) {
                        case StatusType.Success: {
                            if (res.DataVariable != null) {
                                sessionStorage.setItem("strMaxAllowQty", res.DataVariable.toString());
                            }
                            else {
                                sessionStorage.setItem("strMaxAllowQty", "0");
                            }
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

    async showItemsPopUp(SelType) {
        try {
            this.selectType = SelType;
            this.subItemID = '';
            this.selectedItemID = '';
            if (SelType == 'U') {
                if (this.selectedItem == undefined || this.selectedItem == null || this.selectedItem == '') {
                    this.selectedItemID = 'All';
                }
                else {
                    if (this.selectedItem.ITEM_ID != undefined) {
                        this.selectedItemID = this.selectedItem.ITEM_ID;
                    }
                    else {
                        this.selectedItemID = this.selectedItem;
                    }
                }
            }
            else {
                if (this.selectedItem != undefined) {
                    if (this.selectedItem.ITEM_ID != undefined) {
                        this.selectedItemID = this.selectedItem.ITEM_ID;
                    }
                    else {
                        this.selectedItemID = this.selectedItem;
                    }
                }
            }
            if (this.selectedItemID == undefined || this.selectedItemID == '') {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Item ID' });
                return;
            }
            else {
                if (this.lstAddParLocations.length == 0) {
                    if (SelType == "U") {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please select any Par Location to Update Items' });
                    }
                    else {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please select any Par Location to Add Items' });
                    }
                } else {
                    this.validateInput();

                    this.strParIDs = '';

                    if (this.returnType == StatusType.Success) {
                        for (var i = 0; i < this.lstAddParLocations.length; i++) {
                            this.strParIDs = this.strParIDs + this.lstAddParLocations[i].PAR_LOC_ID + '^';
                        }
                        this.spinnerService.start();
                        if (SelType == 'U') {
                            await this.getItemsToAddMulParLocReqTypeU(this.selectedItemID, '', this.ORG_ID, this.strParIDs, SelType, this.intAppId);
                            if (this.returnType == StatusType.Success) {
                                this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Item';
                                this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                            }
                        } else {
                            await this.getItemsToAddMultipleParLocations(this.selectedItemID, '', this.ORG_ID, this.strParIDs, SelType, this.intAppId);
                            if (this.returnType == StatusType.Success) {
                                this.breadCrumbMenu.SUB_MENU_NAME = 'Add Item';
                                this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
                            }
                        }

                        this.spinnerService.stop();

                    }


                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "showItemsPopUp");
        }
    }

    async getItemsToAddMultipleParLocations(itemID, orgGroupID, ordID, parLocIDs, transType, appID) {
        this.returnType = '';
        try {
            await this.atParManageParLocServices.getItemsToAddMultipleParLocations(itemID, orgGroupID, ordID, parLocIDs, transType, appID)
                .catch(this.httpService.handleError).then((result: Response) => {
                    let res = result.json() as AtParWebApiResponse<VM_PAR_MNGT_PAR_LOCATION>;
                    this.lstAllocLocations = [];
                    this.returnType = res.StatType;
                    switch (res.StatType) {
                        case StatusType.Success: {
                            this.page = false;
                            this.table = true;
                            this.lstAllocLocations = res.DataList;
                            for (var i = 0; i < this.lstAllocLocations.length; i++) {
                                this.lstAllocLocations[i].PREV_BIN_LOC = this.lstAllocLocations[i].BIN_LOC;
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                            break;
                        }
                    }
                });
        } catch (ex) {
            this.clientErrorMsg(ex, "getItemsToAddMultipleParLocations");
        }
        if (this.returnType == StatusType.Success) {
            await this.bindDataGrid();
        }
    }

    async getItemsToAddMulParLocReqTypeU(itemID, orgGroupID, ordID, parLocIDs, transType, appID) {

        this.returnType = '';
        try {
            await this.atParManageParLocServices.getItemsToAddMulParLocReqTypeU(itemID, orgGroupID, ordID, parLocIDs, transType, appID)
                .catch(this.httpService.handleError).then((result: Response) => {
                    let res = result.json() as AtParWebApiResponse<VM_PAR_MNGT_PAR_LOCATION>;
                    this.lstAllocLocations = [];
                    this.returnType = res.StatType;
                    switch (res.StatType) {
                        case StatusType.Success: {
                            this.page = false;
                            this.table = true;

                            this.lstAllocLocations = res.DataList;
                            for (var i = 0; i < this.lstAllocLocations.length; i++) {
                                this.lstAllocLocations[i].PREV_BIN_LOC = this.lstAllocLocations[i].BIN_LOC;
                            }

                            break;
                        }
                        case StatusType.Warn: {
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                            break;
                        }
                    }
                });
        } catch (ex) {
            this.clientErrorMsg(ex, "getItemsToAddMulParLocReqTypeU");
        }
        if (this.returnType == StatusType.Success) {
            await this.bindDataGrid();
        }
    }

    async bindDataGrid() {
        if (this.lstAllocLocations.length > 0) {
            this.lstInsertParItems = [];
            this.populateStaticDropdowns();
            this.grid_RowDataBound();
            await this.bindInvBUnitsDropdown();
            await this.bindCostCenterDetailsDropdown();

            if (this.selectType == 'U') {
                if (this.selectedItemID != 'All') {
                    this.showTrSubItem = true;
                    await this.populateItemsDropDown()
                }
                else {
                    this.showTrSubItem = false;
                }
            }
            else {
                this.showTrSubItem = false;
            }
        }
        else {
            this.showSaveBtn = false;
        }
    }

    grid_RowDataBound() {
        try {
            for (var i = 0; i < this.lstAllocLocations.length; i++) {
                this.lstAllocLocations[i].COUNT_ID = 'COUNT_ID' + i;
                this.lstAllocLocations[i].COMP_ID = 'COMP_ID' + i;
                this.lstAllocLocations[i].ORDTYPE_ID = 'ORDTYPE_ID' + i;
                this.lstAllocLocations[i].OPTQTY_ID = 'OPTQTY_ID' + i;
                this.lstAllocLocations[i].FOQTY_ID = 'FOQTY_ID' + i;
                this.lstAllocLocations[i].MAXQTY_ID = 'MAXQTY_ID' + i;
                this.lstAllocLocations[i].PROC_ID = 'PROC_ID' + i;
                this.lstAllocLocations[i].UNITISSUE_ID = 'UNITISSUE_ID' + i;
                this.lstAllocLocations[i].CONVRATE_ID = 'CONVRATE_ID' + i;
                this.lstAllocLocations[i].PARUOM_ID = 'PARUOM_ID' + i;
                this.lstAllocLocations[i].CONVRATE_PARUOM_ID = 'CONVRATE_PARUOM_ID' + i;
                this.lstAllocLocations[i].CHARGE_ID = 'CHARGE_ID' + i;
                this.lstAllocLocations[i].REPL_ID = 'REPL_ID' + i;
                this.lstAllocLocations[i].FILLKILL_ID = 'FILLKILL_ID' + i;
                this.lstAllocLocations[i].COSTCENTER_ID = 'COSTCENTER_ID' + i;
                this.lstAllocLocations[i].INV_BUS_ID = 'INV_BUS_ID' + i;
                this.lstAllocLocations[i].REQ_ID = 'REQ_ID' + i;
                this.lstAllocLocations[i].STATUS_NAME = 'STATUS_NAME' + i;


                if (this.lstAllocLocations[i].COUNT_REQUIRED == 'Y') {
                    this.lstAllocLocations[i].ISCOUNT_REQUIRED = true;
                } else {
                    this.lstAllocLocations[i].ISCOUNT_REQUIRED = false;
                }
                if (this.lstAllocLocations[i].LOT_CONTROLLED == 'Y') {
                    this.lstAllocLocations[i].ISLOT_CONTROLLED = true;
                } else {
                    this.lstAllocLocations[i].ISLOT_CONTROLLED = false;
                }
                if (this.lstAllocLocations[i].SERIAL_CONTROLLED == 'Y') {
                    this.lstAllocLocations[i].ISSERIAL_CONTROLLED = true;
                } else {
                    this.lstAllocLocations[i].ISSERIAL_CONTROLLED = false;
                }
                if (this.selectType == 'N') {
                    this.lstAllocLocations[i].STATUS = 'Y';
                }
                if (this.lstAllocLocations[i].PAR_UOM == null || this.lstAllocLocations[i].PAR_UOM == undefined) {
                    this.lstAllocLocations[i].CONV_RATE_PAR_UOM = '';
                }

            }
        } catch (ex) {
            this.clientErrorMsg(ex, "grid_RowDataBound");
        }
    }

    populateStaticDropdowns() {
        try {
            this.lstOrderingTypes = [];
            this.lstOrderingTypes.push({ label: 'Select One', value: 'Select One' });
            this.lstOrderingTypes.push({ label: 'Par', value: '01' });
            this.lstOrderingTypes.push({ label: 'Foq', value: '02' });
            this.lstOrderingTypes.push({ label: 'Min/Max', value: '03' });
            this.lstOrderingTypes.push({ label: 'Issue', value: '04' });

            this.lstReplishmentTypes = [];
            this.lstReplishmentTypes.push({ label: 'Select One', value: '0' })
            this.lstReplishmentTypes.push({ label: 'Stock', value: '1' })
            this.lstReplishmentTypes.push({ label: 'Nonstock', value: '2' })
            this.lstReplishmentTypes.push({ label: 'Stockless', value: '3' })
            this.lstReplishmentTypes.push({ label: 'Consignment', value: '4' })

            this.lstFKFlags = [];
            this.lstFKFlags.push({ label: 'Select One', value: '0' });
            this.lstFKFlags.push({ label: 'Fill', value: 'F' });
            this.lstFKFlags.push({ label: 'Kill', value: 'K' });

            this.lstRequisitionTypes = [];
            this.lstRequisitionTypes.push({ label: 'Select One', value: '0' });
            this.lstRequisitionTypes.push({ label: 'Issue', value: 'I' });
            this.lstRequisitionTypes.push({ label: 'Transfer', value: 'T' });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "populateStaticDropdowns");
        }
    }

    async bindInvBUnitsDropdown() {
        try {
            if (this.intInvBcnt == 0) {

                await this.atParCommonService.getOrgIds(this.deviceTokenEntry[TokenEntry_Enum.UserID])
                    .catch(this.httpService.handleError).then((result: Response) => {
                        let res = result.json() as AtParWebApiResponse<any>;

                        this.intInvBcnt = this.intInvBcnt + 1;
                        this.lstInvBunits = [];
                        //this.lstInvBunits.push({ label: 'Select One', value: 'Select One' });
                        // this.parItem.INV_BUSINESS_UNIT = this.ORG_ID;
                        switch (res.StatType) {
                            case StatusType.Success: {
                                for (var i = 0; i < res.DataList.length; i++) {
                                    this.lstInvBunits.push({ label: res.DataList[i], value: res.DataList[i] });
                                }
                                break;
                            }
                            case StatusType.Warn: {
                                this.spinnerService.stop();
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                break;
                            }
                            case StatusType.Error: {
                                this.spinnerService.stop();
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                break;
                            }
                            case StatusType.Custom: {
                                this.spinnerService.stop();
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                break;
                            }
                        }
                    });
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "bindInvBUnitsDropdown");
        }
    }

    async bindCostCenterDetailsDropdown() {
        try {
            if (this.intCCcnt == 0) {
                await this.atParCommonService.getCostCenterOrgIds(this.deviceTokenEntry[TokenEntry_Enum.UserID])
                    .catch(this.httpService.handleError).then((result: Response) => {

                        let res = result.json() as AtParWebApiResponse<any>;

                        this.intCCcnt = this.intCCcnt + 1;
                        this.lstCostCenters = [];
                        this.lstCostCenters.push({ label: 'Select One', value: 'Select One' });
                        // this.parItem.COST_CENTER = 'Select One';
                        switch (res.StatType) {
                            case StatusType.Success: {
                                for (var i = 0; i < res.DataList.length; i++) {
                                    this.lstCostCenters.push({ label: res.DataList[i], value: res.DataList[i] });
                                }
                                break;
                            }
                            case StatusType.Warn: {
                                this.spinnerService.stop();
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                break;
                            }
                            case StatusType.Error: {
                                this.spinnerService.stop();
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                break;
                            }
                            case StatusType.Custom: {
                                this.spinnerService.stop();
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                break;
                            }
                        }
                    });
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "bindCostCenterDetailsDropdown");
        }
    }

    async populateItemsDropDown() {
        try {
            await this.atParCommonService.getItems('', this.ORG_ID, this.intAppId)
                .catch(this.httpService.handleError).then((result: Response) => {
                    let res = result.json() as AtParWebApiResponse<any>;

                    this.lstSubItems = [];
                    this.lstSubItems.push({ label: 'Select One', value: '' });
                    switch (res.StatType) {
                        case StatusType.Success: {
                            for (var i = 0; i < res.DataList.length; i++) {
                                if (res.DataList[i].STATUS == 0) {
                                    if (res.DataList[i].ITEM_ID != this.selectedItemID) {
                                        this.lstSubItems.push({ label: res.DataList[i].ITEM_ID + '-' + res.DataList[i].SHORT_DESCR, value: res.DataList[i].ITEM_ID });
                                    }
                                }
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "populateItemsDropDown");
        }
    }

    validateInput() {
        this.returnType = 1;
        if (this.showOrgDropdown == true) {
            if (this.ORG_GROUP_ID == 'Select One' || this.ORG_GROUP_ID == '' || this.ORG_GROUP_ID == undefined) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Select Org Group ID' });
                return;
            }
        }
        if (this.ORG_ID == 'Select One' || this.ORG_ID == '' || this.ORG_ID == undefined) {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Select Org ID' });
            return;
        }
        if ((this.PRICE_FROM != '' && this.PRICE_FROM != undefined) && (this.PRICE_TO == '' || this.PRICE_TO == undefined)) {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Valid Item Price between' });
            return;
        }
        if ((this.PRICE_FROM == '' || this.PRICE_FROM == undefined) && (this.PRICE_TO != '' && this.PRICE_TO != undefined)) {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Valid Item Price between' });
            return;
        }
        if (this.PRICE_FROM != '' && this.PRICE_FROM != undefined && this.PRICE_TO != '' && this.PRICE_TO != undefined) {
            if (parseFloat(this.PRICE_FROM) > parseFloat(this.PRICE_TO)) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Valid Item Price between' });
                return;
            }
        }
        this.returnType = 4;
    }

    btnGoBack_Click() {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.table = false;
        this.page = true;
        this.growlMessage = [];
        this.lstAllocLocations = [];
        this.intCCcnt = 0;
        this.intInvBcnt = 0;
        this.selectedItemID = '';

        if (this.showOrgDropdown) {
            this.ORG_GROUP_ID = 'Select One';
        }

        this.ORG_ID = '';
        this.DEPT_ID = '';
        this.DEPT_NAME = '';
        this.PAR_LOC_ID = '';
        this.PAR_LOC_NAME = '';
        this.ITEM_ID = '';
        this.ITEM_DESC = '';
        this.PRICE_FROM = '';
        this.PRICE_TO = '';
        this.lstParLocations = [];
        this.selectedItem = '';

    }

    chkAllPar_Click() {
        this.spinnerService.start();
        var list = []
        if (this.lstGridParFilterData == undefined || this.lstGridParFilterData == null || this.lstGridParFilterData.length == 0) {
            for (var i = 0; i < this.lstAllocLocations.length; i++) {
                this.lstAllocLocations[i].SELECTED_PARITEM = true;
                list.push(this.lstAllocLocations[i]);
            }
        } else {
            for (var i = 0; i < this.lstGridParFilterData.length; i++) {
                this.lstGridParFilterData[i].SELECTED_PARITEM = true;
                list.push(this.lstGridParFilterData[i]);
            }
        }

        this.lstInsertParItems = list;
        this.spinnerService.stop();
    }

    chkNonePar_Click() {
        this.spinnerService.start();
        var list = [];

        if (this.lstGridParFilterData == undefined || this.lstGridParFilterData == null || this.lstGridParFilterData.length == 0) {

            for (var i = 0; i < this.lstAllocLocations.length; i++) {
                this.lstAllocLocations[i].SELECTED_PARITEM = false;
            }
        }
        else {
            for (var i = 0; i < this.lstGridParFilterData.length; i++) {
                this.lstGridParFilterData[i].SELECTED_PARITEM = false;
            }

        }
        this.lstInsertParItems = [];
        this.spinnerService.stop();
    }


    myfilterdata(event) {
        this.lstGridParFilterData = new Array<VM_PAR_MNGT_PAR_LOCATION>();
        this.lstGridParFilterData = event;
    }

    switchPar_Click(e, parItem: VM_PAR_MNGT_PAR_LOCATION) {
        if (e) {
            parItem.SELECTED_PARITEM = true;
            this.lstInsertParItems.push(parItem);
        } else {
            parItem.SELECTED_PARITEM = false;
            for (var i = 0; i < this.lstInsertParItems.length; i++) {
                if (this.lstInsertParItems[i].PAR_LOC_ID == parItem.PAR_LOC_ID && this.lstInsertParItems[i].BIN_LOC == parItem.BIN_LOC && this.lstInsertParItems[i].ORG_ID == parItem.ORG_ID && this.lstInsertParItems[i].ITEM_ID == parItem.ITEM_ID) {
                    var index = this.lstInsertParItems.indexOf(this.lstInsertParItems[i], 0)
                    this.lstInsertParItems.splice(index, 1);
                }
            }
        }
    }

    async btnSave_Click() {
        await this.validateGrid();
    }

    async saveMultipleParItems() {
        for (var i = 0; i < this.lstInsertParItems.length; i++) {
            var maxQty = sessionStorage.getItem('strMaxAllowQty');
            if (maxQty != '' && maxQty != null) {
                if (this.lstInsertParItems[i].OPTIMAL_QTY != null) {
                    if (this.lstInsertParItems[i].OPTIMAL_QTY > parseInt(maxQty)) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Quantity must not be greater than max allowable quantity' });
                        (<HTMLInputElement>document.getElementById(this.lstInsertParItems[i].OPTQTY_ID)).focus();
                        return;
                    }
                }
                if (this.lstInsertParItems[i].FOQ_QTY != null) {
                    if (this.lstInsertParItems[i].FOQ_QTY > parseInt(maxQty)) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Quantity must not be greater than max allowable quantity' });
                        (<HTMLInputElement>document.getElementById(this.lstInsertParItems[i].FOQTY_ID)).focus();
                        return;
                    }
                }
                if (this.lstInsertParItems[i].MAX_QTY != null) {
                    if (this.lstInsertParItems[i].MAX_QTY > parseInt(maxQty)) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Quantity must not be greater than max allowable quantity' });
                        (<HTMLInputElement>document.getElementById(this.lstInsertParItems[i].MAXQTY_ID)).focus();
                        return;
                    }
                }
            }
            if (this.lstInsertParItems[i].ISCOUNT_REQUIRED) {
                this.lstInsertParItems[i].COUNT_REQUIRED = 'Y';
            } else {
                this.lstInsertParItems[i].COUNT_REQUIRED = 'N';
            }
            if (this.lstInsertParItems[i].ISLOT_CONTROLLED) {
                this.lstInsertParItems[i].LOT_CONTROLLED = 'Y';
            } else {
                this.lstInsertParItems[i].LOT_CONTROLLED = 'N';
            }
            if (this.lstInsertParItems[i].ISSERIAL_CONTROLLED) {
                this.lstInsertParItems[i].SERIAL_CONTROLLED = 'Y';
            } else {
                this.lstInsertParItems[i].SERIAL_CONTROLLED = 'N';
            }


            if (this.subItemID != '' && this.subItemID != undefined) {
                this.lstInsertParItems[i].PREV_ITM_ID = this.lstInsertParItems[i].ITEM_ID;
                this.lstInsertParItems[i].ITEM_ID = this.subItemID;
            }
            else {
                this.lstInsertParItems[i].PREV_ITM_ID = '';
            }
            //this.lstInsertParItems[i].PREV_BIN_LOC = this.lstInsertParItems[i].BIN_LOC;
            this.lstInsertParItems[i].PREV_OPTIMAL_QTY = this.lstInsertParItems[i].OPTIMAL_QTY.toString();
            this.lstInsertParItems[i].RECORDTYPE = this.selectType;
        }
        try {
            this.spinnerService.start();
            await this.atParManageParLocServices.updateMultipleParItems(this.lstInsertParItems)
                .catch(this.httpService.handleError).then((result: Response) => {
                    let res = result.json() as AtParWebApiResponse<any>;
                    this.growlMessage = [];
                    switch (res.StatType) {
                        case StatusType.Success: {
                            if (this.selectType == 'U') {
                                this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Item(s) Updated Sucessfully' });
                            } else {
                                this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Item(s) Inserted Successfully' });
                            }
                            this.lstInsertParItems = [];
                            break;

                        }
                        case StatusType.Warn: {
                            if (AtparStatusCodes.ATPAR_E_PRIMARYKEYVOILATION == res.StatusCode) {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Some Items With Same Values Already Exists' });
                            }

                            else {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                            }

                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "saveMultipleParItems");
        }
        await this.getItemsToAddMulParLocReqTypeU(this.selectedItemID, '', this.ORG_ID, this.strParIDs, 'U', this.intAppId);
        this.spinnerService.stop();
    }

    async validateGrid() {
        this.growlMessage = [];
        if (this.lstInsertParItems.length == 0) {
            if (this.selectType == 'U') {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please select any item to update' });
            }
            else {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please select any item to insert' });
            }
            return;
        }
        let showError: boolean = false;
        for (var i = 0; i < this.lstAllocLocations.length; i++) {




            if (this.lstAllocLocations[i].SELECTED_PARITEM) {
                if (!showError) {
                    var str = this.lstAllocLocations[i].OPTIMAL_QTY.toString();
                    var strUOM = this.lstAllocLocations[i].UNIT_OF_PROCUREMENT.toString();
                    ///^[a-zA-Z0-9- ]*$/
                    if (/^\d+(?:\.\d*)?$/.test(str) == false) {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Correct Optimum Quantity' });
                        (<HTMLInputElement>document.getElementById(this.lstAllocLocations[i].OPTQTY_ID)).focus();
                        showError = true;

                    }
                    else if (/^[A-Z]+$/.test(strUOM) == false) {
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Enter only Upper Case Letters' });
                        (<HTMLInputElement>document.getElementById(this.lstAllocLocations[i].PROC_ID)).focus();
                        showError = true;

                    }
                    else if (this.lstAllocLocations[i].BIN_LOC == null || this.lstAllocLocations[i].BIN_LOC == '') {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Compartment' });
                        (<HTMLInputElement>document.getElementById(this.lstAllocLocations[i].COMP_ID)).focus();
                        showError = true;
                    }
                    else if (this.lstAllocLocations[i].ORDERING_TYPE == 'Select One' || this.lstAllocLocations[i].ORDERING_TYPE == '') {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Select Ordering Type' });
                        (<HTMLInputElement>document.getElementById(this.lstAllocLocations[i].ORDTYPE_ID)).focus();

                        showError = true;
                    }
                    else if (this.lstAllocLocations[i].OPTIMAL_QTY == null || this.lstAllocLocations[i].OPTIMAL_QTY.toString() == '') {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Optimum Quantity' });
                        (<HTMLInputElement>document.getElementById(this.lstAllocLocations[i].OPTQTY_ID)).focus();
                        showError = true;
                    }
                    else if ((this.lstAllocLocations[i].ORDERING_TYPE == '02' && (this.lstAllocLocations[i].FOQ_QTY == null || this.lstAllocLocations[i].FOQ_QTY.toString() == ''))) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Enter FOQ Quantity' });
                        (<HTMLInputElement>document.getElementById(this.lstAllocLocations[i].FOQTY_ID)).focus();
                        showError = true;
                    }
                    else if (this.lstAllocLocations[i].ORDERING_TYPE == '03' && (this.lstAllocLocations[i].MAX_QTY == null || this.lstAllocLocations[i].MAX_QTY.toString() == '')) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Max Quantity' });
                        (<HTMLInputElement>document.getElementById(this.lstAllocLocations[i].MAXQTY_ID)).focus();
                        showError = true;
                    }
                    else if (this.lstAllocLocations[i].UNIT_OF_PROCUREMENT == null || this.lstAllocLocations[i].UNIT_OF_PROCUREMENT == '') {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Unit of Procurement' });
                        (<HTMLInputElement>document.getElementById(this.lstAllocLocations[i].PROC_ID)).focus();
                        showError = true;
                    }
                    else if (this.lstAllocLocations[i].UNIT_OF_ISSUE == null || this.lstAllocLocations[i].UNIT_OF_ISSUE == '') {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Unit of Issue' });
                        (<HTMLInputElement>document.getElementById(this.lstAllocLocations[i].UNITISSUE_ID)).focus();
                        showError = true;
                    }
                    else if (this.lstAllocLocations[i].CONVERSION_RATE == null || this.lstAllocLocations[i].CONVERSION_RATE.toString() == '') {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Enter UOM Conversion Rate' });
                        (<HTMLInputElement>document.getElementById(this.lstAllocLocations[i].CONVRATE_ID)).focus();

                        showError = true;
                    }
                    else if (this.lstAllocLocations[i].REPLENISHMENT_TYPE == 0 || this.lstAllocLocations[i].REPLENISHMENT_TYPE.toString() == '') {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Select Replishment Type' });
                        (<HTMLInputElement>document.getElementById(this.lstAllocLocations[i].REPL_ID)).focus();
                        showError = true;
                    }

                    else if (this.lstAllocLocations[i].COST_CENTER == '' || this.lstAllocLocations[i].COST_CENTER == 'Select One') {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Select Cost Center' });
                        (<HTMLInputElement>document.getElementById(this.lstAllocLocations[i].COSTCENTER_ID)).focus();
                        showError = true;
                    }
                    else if (this.lstAllocLocations[i].REQUISITION_TYPE == '0' || this.lstAllocLocations[i].REQUISITION_TYPE == 'Select One' || this.lstAllocLocations[i].REQUISITION_TYPE == '') {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Select Requisition Type' });
                        (<HTMLInputElement>document.getElementById(this.lstAllocLocations[i].REQ_ID)).focus();
                        showError = true;
                    }

                }
                if (showError == true || this.lstAllocLocations[i].BIN_LOC == null || this.lstAllocLocations[i].BIN_LOC == '' || this.lstAllocLocations[i].ORDERING_TYPE == 'Select One' || this.lstAllocLocations[i].ORDERING_TYPE == '' || this.lstAllocLocations[i].OPTIMAL_QTY == null || this.lstAllocLocations[i].OPTIMAL_QTY.toString() == '' || this.lstAllocLocations[i].UNIT_OF_PROCUREMENT == null || this.lstAllocLocations[i].UNIT_OF_PROCUREMENT == '' || this.lstAllocLocations[i].UNIT_OF_ISSUE == null || this.lstAllocLocations[i].UNIT_OF_ISSUE == '' || this.lstAllocLocations[i].CONVERSION_RATE == null || this.lstAllocLocations[i].CONVERSION_RATE.toString() == '' || this.lstAllocLocations[i].REPLENISHMENT_TYPE == 0 || this.lstAllocLocations[i].REPLENISHMENT_TYPE.toString() == '' || this.lstAllocLocations[i].COST_CENTER == '' || this.lstAllocLocations[i].COST_CENTER == 'Select One' || this.lstAllocLocations[i].REQUISITION_TYPE == '0' || this.lstAllocLocations[i].REQUISITION_TYPE == 'Select One' || this.lstAllocLocations[i].REQUISITION_TYPE == '' || (this.lstAllocLocations[i].ORDERING_TYPE == '02' && (this.lstAllocLocations[i].FOQ_QTY == null || this.lstAllocLocations[i].FOQ_QTY.toString() == '')) || (this.lstAllocLocations[i].ORDERING_TYPE == '03' && (this.lstAllocLocations[i].MAX_QTY == null || this.lstAllocLocations[i].MAX_QTY.toString() == ''))) {
                    this.lstAllocLocations[i].rowClsStyle = 'ui-datatable-err';
                } else {
                    this.lstAllocLocations[i].rowClsStyle = null;
                }
            }

        }
        if (showError) {
            return;
        }



        if (this.subItemID != null && this.subItemID != '' && this.subItemID != undefined) {
            await this.confirmationService.confirm({
                message: 'Do you want to Substitute Selected Item for GridView Items  ',
                accept: () => {
                    this.saveMultipleParItems();
                },
                reject: () => {
                    this.subItemID = '';
                }
            });
        }
        else {
            await this.saveMultipleParItems();
        }
    }

    txtbox_KeyPress(e) {
        this.growlMessage = []
        var charCode = (e.which) ? e.which : e.keyCode;
        if (charCode < 65 || charCode > 90) {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Enter only Upper Case Letters' });
            return false;
        }
    }

    lstOrdType_Change(e, orderingType) {
        if (orderingType == '02') {
            this.isFOQMandatory = true;
            this.isMaxMandatory = false;
        }
        else if (orderingType == '03') {
            this.isFOQMandatory = false;
            this.isMaxMandatory = true;
        }
        else {
            this.isFOQMandatory = false;
            this.isMaxMandatory = false;
        }
    }


    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString, funName, this.constructor.name);
    }

    ngOnDestroy() {
        this.lstAddParLocations = [];
        this.lstAllocLocations = [];
        this.lstInsertParItems = [];
        this.lstInvBunits = [];
        this.lstCostCenters = [];
        this.lstFKFlags = [];
        this.lstItems = [];
        this.lstOrderingTypes = [];
        this.lstOrgGroups = [];
        this.lstOrgIds = [];
        this.lstParLocations = [];
        this.lstReplishmentTypes = [];
        this.lstRequisitionTypes = [];
        this.lstSubItems = [];
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.spinnerService.stop();
        this.spinnerService = null;
    }

    //bindModelDataChange(event: any) {
    //    try {
    //        if ("txtPriceFrom" == event.TextBoxID.toString()) {
    //            this.txtPriceFrom = event.validationrules.filter(x => x.status == false).length;
    //        }
    //        if ("txtPriceTo" == event.TextBoxID.toString()) {
    //            this.txtPriceTo = event.validationrules.filter(x => x.status == false).length;
    //        }


    //        if (this.txtPriceFrom == 0 && this.txtPriceTo == 0) {
    //            this.loading = false;
              
    //        }
    //        else {
    //            this.loading = true; 
    //            this.growlMessage = [];
    //            //this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Enter Numeric Values' });              
    //        }


    //    } catch (exMsg) {
    //        this.clientErrorMsg(exMsg, "bindModelDataChange");
    //    }
    //}

}