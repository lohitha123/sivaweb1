import { Component, ViewChild, Inject } from '@angular/core';
import { MT_ATPAR_ORG_GROUP_BUNITS } from "../../app/Entities/mt_atpar_org_group_bunits";
import { datatableservice } from './../components/datatable/datatableservice';
import { VM_RECV_SETUPSHIPTO_ID_ALLOCATION } from "../../app/Entities/VM_RECV_SETUPSHIPTO_ID_ALLOCATION";
import { AtParCommonService } from '../Shared/atpar-common.service';
import { SetupShipToIDsServices } from "./recv-setup-shiptoids.service";
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { HttpService } from '../Shared/HttpService';
import { Message } from './../components/common/api';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { SelectItem } from './../components/common/api';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { BusinessType, StatusType, TokenEntry_Enum, ClientType } from '../Shared/AtParEnums';
import { AtParConstants } from '../Shared/AtParConstants';
import { DataTable } from '../components/datatable/datatable';
import { Menus } from '../AtPar/Menus/routepath';
import { Http, Response } from "@angular/http";
import { DOCUMENT } from '@angular/platform-browser';

declare var module: {
    id: string;
}

@Component({
    templateUrl: 'recv-setup-shiptoids.component.html',
    providers: [datatableservice, AtParCommonService, SetupShipToIDsServices, HttpService, AtParConstants]
})

export class SetupShipToIdsComponent {
    @ViewChild(DataTable) dataTableComponent: DataTable;
    growlMessage: Message[] = [];
    deviceTokenEntry: string[] = [];
    statusType: string = "";
    startIndex: number;
    EndIndex: number;
    pageSize: number;
    statusMesssage: string;
    pop: boolean = false;
    page: boolean = true;
    form: boolean = false;
    editform: boolean = false;
    lstBusinessData: string[] = [];
    ddlBusinessData: SelectItem[] = [];
    selectedOrgID: string = '';
    OrgID: string;
    disableAdd: boolean = false;
    disableUpdate: boolean = false;
    newItem: VM_RECV_SETUPSHIPTO_ID_ALLOCATION;
    lstShipToIDs: VM_RECV_SETUPSHIPTO_ID_ALLOCATION[];
    lstShipToIDAllc: VM_RECV_SETUPSHIPTO_ID_ALLOCATION[];
    mainlstGridData: VM_RECV_SETUPSHIPTO_ID_ALLOCATION[];
    addselectedOrgID: string;
    NewOrgId: string;
    _strStatus: string = "";
    status: boolean = false;
    ShipToID: string = '';
    ShipToName: string = '';
    selectedStatus: boolean = false;
    strShipToID: string = "";
    strShipToName: string = "";
    strSelectedOrgID: string;
    SETID: string = "";
    recordsPerPageSize: number;
    SHIPTO_ID: string = "";
    SHIPTO_NAME: string = "";
    ADDRESS1: string = "";
    CITY: string = "";
    STATE: string = "";
    ZIP: string = "";
    PHONE: string = "";
    ATTENTION_TO: string = "";
    COMMENT: string = "";
    editShipToIDDatas: string = "";
    editOrgID: string = '';
    //Validation Variables
    ShipToIDStstaus: number;
    OrgIDStatus: number = 1;
    ShipToNameStatus: number;
    Address1Status: number;
    CityStatus: number;
    StateStatus: number;
    ZipStatus: number;
    tPhoneStatus: number;
    AttentionToStatus: number;
    CommentStatus: number;
    ddlStatusType: any;
    breadCrumbMenu: Menus;

    constructor(public dataservice: datatableservice,
        private httpService: HttpService,
        private spinnerService: SpinnerService,
        private commonService: AtParCommonService,
        private setupShpIdsServices: SetupShipToIDsServices,
        @Inject(DOCUMENT) private document,
        private atParConstant: AtParConstants,
    ) {
        this.breadCrumbMenu = new Menus();
        this.newItem = new VM_RECV_SETUPSHIPTO_ID_ALLOCATION();
    }

    edit(ven) {
        try {
            this.editform = true;
            this.form = false;
            this.page = false;
            this.pop = false;
        } catch (ex) {
            this.clientErrorMsg(ex, "edit");
        }
    }

    btnBack_Click() {
        try {
            this.growlMessage = [];
            this.breadCrumbMenu.SUB_MENU_NAME = '';
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.selectedOrgID = "Select Org";
            this.ShipToID = "";
            this.ShipToName = "";
            this.form = false;
            this.page = true;
            this.pop = false;
            this.editform = false;
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnBack_Click");
        }
    }

    async ngOnInit() {
        try {
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
            this.recordsPerPageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
            this.addStatusTypes();
            this.populateBusinessUnits();
            this.mainlstGridData = new Array<VM_RECV_SETUPSHIPTO_ID_ALLOCATION>()
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    }

    async addStatusTypes() {
        this.ddlStatusType = [];
        this.ddlStatusType.push({ label: 'All', value: "" });
        this.ddlStatusType.push({ label: 'Active', value: true });
        this.ddlStatusType.push({ label: 'InActive', value: false });
    }

    async populateBusinessUnits(): Promise<any> {
        try {
            let isOrgBUnitsExist: boolean = false;
            this.spinnerService.start();
            await this.commonService.getBusinessUnits(this.deviceTokenEntry[TokenEntry_Enum.UserID], BusinessType.Purchasing.toString())
                .catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<string>;
                    this.spinnerService.stop();
                    this.ddlBusinessData = [];
                    this.ddlBusinessData.push({ label: "Select Org", value: "Select Org" })
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.lstBusinessData = data.DataList;
                            if (this.lstBusinessData.length > 0) {
                                for (let i = 0; i < this.lstBusinessData.length; i++) {
                                    this.ddlBusinessData.push({ label: this.lstBusinessData[i].toString(), value: this.lstBusinessData[i].toString() })
                                }
                            }
                            this.selectedOrgID = this.ddlBusinessData[0].value;
                            isOrgBUnitsExist = true;
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            break;
                        }
                    }
                });
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "populateBusinessUnits");
        }
    }

    async getShiptoIdDetails(): Promise<any> {
        try {
            this.ddlBusinessData = [];
            let isOrgBUnitsExist: boolean = false;
            this.growlMessage = [];
            this.spinnerService.start();
            await this.commonService.getBusinessUnits(this.deviceTokenEntry[TokenEntry_Enum.UserID], BusinessType.Purchasing.toString())
                .catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<string>;
                    this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.lstBusinessData = data.DataList;
                            if (this.lstBusinessData.length > 0) {
                                for (let i = 0; i < this.lstBusinessData.length; i++) {
                                    this.ddlBusinessData.push({ label: this.lstBusinessData[i], value: this.lstBusinessData[i] });
                                }
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            break;
                        }
                    }
                });
            await this.getShipToIDS();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getShiptoIdDetails");
        }
    }

    btnAddShipToID_Click() {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Add ShipTo ID';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.growlMessage = [];
        this.selectedOrgID = "";
        this.form = true;
        this.editform = false;
        this.page = false;
        this.pop = false;
        this.disableAdd = true;

        try {
            this.spinnerService.start();
            this.populateBusinessUnits();
            this.spinnerService.stop();
            this.newItem = new VM_RECV_SETUPSHIPTO_ID_ALLOCATION;
            this.addselectedOrgID = "";
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnAddShipToID_Click");
        }
    }

    async getShipToIDS() {
        try {
            this.mainlstGridData = [];
            this.spinnerService.start();

            if (this.ShipToID != "" || this.newItem.ORG_ID == undefined || this.newItem.ORG_ID == null) {
                this.strShipToID = this.ShipToID;
            }
            if (this.ShipToName != "" || this.newItem.ORG_ID == undefined || this.newItem.ORG_ID == null) {
                this.strShipToName = this.ShipToName;
            }
            await this.setupShpIdsServices.getShipToIDs(this.selectedOrgID, this.ShipToID, this.ShipToName, "", this.lstBusinessData, this.deviceTokenEntry[TokenEntry_Enum.UserID])
                .catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<VM_RECV_SETUPSHIPTO_ID_ALLOCATION>;
                    switch (data.StatType) {
                        case StatusType.Success: {
                            if (data.DataList.length > 0) {
                                this.lstShipToIDAllc = data.DataList;
                                for (let i = 0; i < this.lstShipToIDAllc.length; i++) {
                                    if (this.lstShipToIDAllc[i].ACTIVESTATUS == "Active") {
                                        this.lstShipToIDAllc[i].CURRENTSTATUS = false;
                                    }
                                    else {
                                        this.lstShipToIDAllc[i].CURRENTSTATUS = true;
                                    }
                                    this.mainlstGridData.push(this.lstShipToIDAllc[i]);
                                }
                                this.pop = true;
                                break;
                            }
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            this.pop = false;
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            this.pop = false;
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            this.pop = false;
                            break;
                        }
                    }
                });
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getShipToIDS");
        }
    }

    async btnGo_Click() {
        try {
            this.pop = false;
            this.statusType = "";
            await this.addStatusTypes();
            if (this.pop) {
                this.dataTableComponent.reset();
            }
            this.growlMessage = [];
            if (this.selectedOrgID == "Select Org") {
                this.pop = false;
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Org ID" });
                return;
            }
            else {
                await this.getShipToIDS();
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnGo_Click");
        }
    }

    ddlOrgIdChanged() {
        try {
            if (this.form) {
                if (this.addselectedOrgID == "Select Org" || this.addselectedOrgID == "" || this.addselectedOrgID == undefined || this.addselectedOrgID == null) {
                    this.OrgIDStatus = 1;
                } else {
                    this.OrgIDStatus = 0;
                }
            }
            if (this.editform) {
                this.ShipToIDStstaus = 0;
                if ((this.editShipToIDDatas == "Select Org" || this.editShipToIDDatas == "" || this.editShipToIDDatas == undefined || this.editShipToIDDatas == null)) {
                    this.OrgIDStatus = 1;
                } else {
                    this.OrgIDStatus = 0;
                }
            }

            if (this.ShipToIDStstaus == 0 && this.OrgIDStatus == 0 && (this.newItem.SHIPTO_ID != "" || this.newItem.SHIPTO_ID != undefined || this.newItem.SHIPTO_ID != null)) {
                if ((this.ShipToNameStatus == 0 || this.ShipToNameStatus == undefined) &&
                    (this.Address1Status == 0 || this.Address1Status == undefined) &&
                    (this.CityStatus == 0 || this.CityStatus == undefined) &&
                    (this.StateStatus == 0 || this.StateStatus == undefined) &&
                    (this.ZipStatus == 0 || this.ZipStatus == undefined) &&
                    (this.tPhoneStatus == 0 || this.tPhoneStatus == undefined) &&
                    (this.AttentionToStatus == 0 || this.AttentionToStatus == undefined) &&
                    (this.CommentStatus == 0 || this.CommentStatus == undefined)) {
                    this.disableAdd = false;
                    this.disableUpdate = false;
                }
                else {
                    this.disableAdd = true;
                    this.disableUpdate = true;
                }
            }
            else {
                this.disableAdd = true;
                this.disableUpdate = true;
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ddlOrgIdChanged");
        }
    }

    async  btnSave_Click() {
        try {
            this.lstShipToIDs = [];
            this.newItem.SHIPTO_NAME = this.newItem.DESCR;
            this.newItem.ORG_ID = this.addselectedOrgID;
            this.newItem.STATUS = true;
            this.lstShipToIDs.push(this.newItem);
            this.growlMessage = [];
            this.spinnerService.start();
            await this.setupShpIdsServices.insertShipToIDs(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.lstShipToIDs)
                .catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<number>;
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.statusMesssage = AtParConstants.Added_Msg.replace("1%", "ShipTo ID").replace("2%", this.newItem.SHIPTO_ID);
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: this.statusMesssage });
                            this.OrgIDStatus = 1;
                            this.form = true;
                            this.page = false;
                            document.getElementById("ShipToId").focus();
                            this.disableAdd = true;
                            this.newItem = new VM_RECV_SETUPSHIPTO_ID_ALLOCATION();
                            this.addselectedOrgID = "";
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
                    this.atParConstant.scrollToTop();
                });
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnSave_Click");
        }
    }

    async btnUpdate_Click() {
        try {
            this.lstShipToIDs = [];
            if (this.editOrgID != this.editShipToIDDatas) {
                this.NewOrgId = '*' + this.editShipToIDDatas;
                this.newItem.ORG_ID = this.editOrgID;
            }
            else {
                this.NewOrgId = this.editShipToIDDatas;
                this.newItem.ORG_ID = this.editShipToIDDatas;
            }
            this.newItem.SHIPTO_NAME = this.newItem.DESCR;
            this.lstShipToIDs.push(this.newItem);
            for (let i = 0; i < this.lstShipToIDs.length; i++) {
                if (this.lstShipToIDs[i].STATUS == false) {
                    this.lstShipToIDs[i].STATUS = true;
                }

            }

            this.growlMessage = [];
            this.spinnerService.start();
            await this.setupShpIdsServices.updateShiptoIDs(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.lstShipToIDs, this.NewOrgId)
                .catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<number>;
                    if (data.StatType != StatusType.Success) {
                        this.editShipToIDDatas = this.editOrgID;
                    }
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.statusMesssage = AtParConstants.Updated_Msg.replace("1%", "ShipTo ID").replace("2%", this.newItem.SHIPTO_ID);
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: this.statusMesssage });
                            this.editform = true;
                            this.page = false;
                            this.form = false;
                            document.getElementById("txtddlOrgID").focus();
                            this.OrgIDStatus = 1;
                            this.ShipToIDStstaus = 1;
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
                    this.atParConstant.scrollToTop();
                });
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnUpdate_Click");
        }
    }

    async updateShiptoIDStatus(status: VM_RECV_SETUPSHIPTO_ID_ALLOCATION): Promise<number> {
        try {           
            let prStatus = status.STATUS;
            let statuscode: number;
            this.growlMessage = [];
            this.spinnerService.start;
            await this.setupShpIdsServices.updateShipToIDStatus(this.deviceTokenEntry[TokenEntry_Enum.UserID], status.ORG_ID, status.SHIPTO_ID, status.CURRENTSTATUS)
                .catch(this.httpService.handleError).then(async (res: Response) => {
                    let data = res.json() as AtParWebApiResponse<number>;
                    statuscode = data.StatusCode;
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.growlMessage = [];
                            this.statusMesssage = AtParConstants.Updated_Msg.replace("1%", "ShipTo ID").replace("2%", status.SHIPTO_ID + ' Status');
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: this.statusMesssage });
                            this.editform = false;
                            this.page = true;
                            this.form = false;
                            let filterData: any = [];
                            this.lstShipToIDAllc = [];
                            let matchedrecord = this.mainlstGridData.filter(x => x.SHIPTO_ID == status.SHIPTO_ID);                        
                            matchedrecord[0].CURRENTSTATUS = status.CURRENTSTATUS;

                            if (this.statusType.toString() == "false") {
                                filterData = this.mainlstGridData.filter(x => x.CURRENTSTATUS == false)
                            } else if (this.statusType.toString() == "true") {
                                filterData = this.mainlstGridData.filter(x => x.CURRENTSTATUS == true)
                            } else {
                                filterData = this.mainlstGridData
                            }
                            if (filterData != null) {
                                for (let x = 0; x < filterData.length; x++) {
                                    let lstVendorDetails = new VM_RECV_SETUPSHIPTO_ID_ALLOCATION();
                                    lstVendorDetails.ORG_ID = filterData[x].ORG_ID;
                                    lstVendorDetails.SHIPTO_ID = filterData[x].SHIPTO_ID;
                                    lstVendorDetails.SHIPTO_NAME = filterData[x].SHIPTO_NAME;
                                    lstVendorDetails.ADDRESS_1 = filterData[x].ADDRESS_1;
                                    lstVendorDetails.CITY = filterData[x].CITY;
                                    lstVendorDetails.STATE = filterData[x].STATE;
                                    lstVendorDetails.ZIP = filterData[x].ZIP;
                                    lstVendorDetails.PHONE_NO = filterData[x].PHONE_NO;

                                    lstVendorDetails.STATUS = filterData[x].STATUS;
                                    lstVendorDetails.CITY = filterData[x].CITY;
                                    lstVendorDetails.ATTENTION_TO = filterData[x].ATTENTION_TO;
                                    lstVendorDetails.COMMENTS = filterData[x].COMMENTS;
                                    lstVendorDetails.CHK_VALUE = filterData[x].CHK_VALUE;

                                    lstVendorDetails.CHK_ALLOCATED = filterData[x].CHK_ALLOCATED;
                                    lstVendorDetails.ROWINDEX = filterData[x].ROWINDEX;
                                    lstVendorDetails.DESCR = filterData[x].DESCR;
                                    lstVendorDetails.CURRENTSTATUS = filterData[x].CURRENTSTATUS;

                                    //   lstVendorDetails.ACTIVESTATUS = filterData[x].ACTIVESTATUS;
                                    lstVendorDetails.EFF_STATUS = filterData[x].EFF_STATUS;
                                    lstVendorDetails.USER_ID = filterData[x].USER_ID;
                                    lstVendorDetails.SETID = filterData[x].SETID;

                                    lstVendorDetails.checkvalue = filterData[x].checkvalue;
                                    lstVendorDetails.LAST_UPDATE_USERID = filterData[x].LAST_UPDATE_USERID;

                                    this.lstShipToIDAllc.push(lstVendorDetails);
                                }

                            }
                            break;
                        }
                        case StatusType.Warn: {
                            if (data.StatusCode == "1142311") {
                                status.CURRENTSTATUS = !status.CURRENTSTATUS;
                            }
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
            return statuscode;
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "updateShiptoIDStatus");
        }
    }

    async statusShipToIDUpdate(setupshipid: VM_RECV_SETUPSHIPTO_ID_ALLOCATION) {
        try {
            this.growlMessage = [];
            this.spinnerService.start();
            await this.updateShiptoIDStatus(setupshipid);
            this.spinnerService.stop();
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "statusShipToIDUpdate");
        }
    }

    async dataFilter(evtdata, filed, filterMatchMode) {
        let filterData;
        this.growlMessage = [];

        this.lstShipToIDAllc.length = 0;

        if (this.statusType.toString() == "true") {
            filterData = this.mainlstGridData.filter(x => x.CURRENTSTATUS == true)
        } else if (this.statusType.toString() == "false") {
            filterData = this.mainlstGridData.filter(x => x.CURRENTSTATUS == false)
        } else {
            filterData = this.mainlstGridData
        }
        if (filterData != null) {
            for (let x = 0; x < filterData.length; x++) {
                let lstVendorDetails = new VM_RECV_SETUPSHIPTO_ID_ALLOCATION();
                lstVendorDetails.ORG_ID = filterData[x].ORG_ID;
                lstVendorDetails.SHIPTO_ID = filterData[x].SHIPTO_ID;
                lstVendorDetails.SHIPTO_NAME = filterData[x].SHIPTO_NAME;
                lstVendorDetails.ADDRESS_1 = filterData[x].ADDRESS_1;
                lstVendorDetails.CITY = filterData[x].CITY;
                lstVendorDetails.STATE = filterData[x].STATE;
                lstVendorDetails.ZIP = filterData[x].ZIP;
                lstVendorDetails.PHONE_NO = filterData[x].PHONE_NO;

                lstVendorDetails.STATUS = filterData[x].BILL_ONLY_EMAIL;
                lstVendorDetails.ATTENTION_TO = filterData[x].ATTENTION_TO;
                lstVendorDetails.COMMENTS = filterData[x].COMMENTS;
                lstVendorDetails.CHK_VALUE = filterData[x].CHK_VALUE;
                lstVendorDetails.CHK_ALLOCATED = filterData[x].CHK_ALLOCATED;

                lstVendorDetails.ROWINDEX = filterData[x].ROWINDEX;
                lstVendorDetails.DESCR = filterData[x].DESCR;
                lstVendorDetails.CURRENTSTATUS = filterData[x].CURRENTSTATUS;
                // lstVendorDetails.ACTIVESTATUS = filterData[x].ACTIVESTATUS;

                lstVendorDetails.EFF_STATUS = filterData[x].EFF_STATUS;
                lstVendorDetails.USER_ID = filterData[x].USER_ID;
                lstVendorDetails.SETID = filterData[x].SETID;
                lstVendorDetails.checkvalue = filterData[x].checkvalue;

                lstVendorDetails.LAST_UPDATE_USERID = filterData[x].LAST_UPDATE_USERID;


                this.lstShipToIDAllc.push(lstVendorDetails);
            }

        }
    }

    bindModelDataChange(event: any) {
        try {
            if ("ShipToId" == event.TextBoxID.toString()) {
                this.ShipToIDStstaus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("ShipToName" == event.TextBoxID.toString()) {
                this.ShipToNameStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("Address1" == event.TextBoxID.toString()) {
                this.Address1Status = event.validationrules.filter(x => x.status == false).length;
            }
            if ("City" == event.TextBoxID.toString()) {
                this.CityStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("State" == event.TextBoxID.toString()) {
                this.StateStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("Zip" == event.TextBoxID.toString()) {
                this.ZipStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("Phone" == event.TextBoxID.toString()) {
                this.tPhoneStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("AttentionTo" == event.TextBoxID.toString()) {
                this.AttentionToStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("Comment" == event.TextBoxID.toString()) {
                this.CommentStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if (this.editform) {
                this.ShipToIDStstaus = 0;
                this.OrgIDStatus = 0;
            }

            if (this.ShipToIDStstaus == 0 && this.OrgIDStatus == 0) {
                if ((this.ShipToNameStatus == 0 || this.ShipToNameStatus == undefined) &&
                    (this.Address1Status == 0 || this.Address1Status == undefined) &&
                    (this.CityStatus == 0 || this.CityStatus == undefined) &&
                    (this.StateStatus == 0 || this.StateStatus == undefined) &&
                    (this.ZipStatus == 0 || this.ZipStatus == undefined) &&
                    (this.tPhoneStatus == 0 || this.tPhoneStatus == undefined) &&
                    (this.AttentionToStatus == 0 || this.AttentionToStatus == undefined) &&
                    (this.CommentStatus == 0 || this.CommentStatus == undefined)) {
                    this.disableAdd = false;
                    this.disableUpdate = false;
                }
                else {
                    this.disableAdd = true;
                    this.disableUpdate = true;
                }
            }
            else {
                this.disableAdd = true;
                this.disableUpdate = true;
            }
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "bindModelDataChange");
        }
    }

    editShipToIDData(ven: VM_RECV_SETUPSHIPTO_ID_ALLOCATION) {
        try {
            this.breadCrumbMenu.SUB_MENU_NAME = 'Edit ShipTo ID';
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.growlMessage = [];
            this.newItem = ven;
            this.editform = true;
            this.editShipToIDDatas = ven.SETID;
            this.editOrgID = ven.SETID;
            this.pop = false;
            this.page = false;
            this.form = false;
            this.disableUpdate = false;
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "editShipToIDData");
        }
    }

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    ngOnDestroy() {
        this.deviceTokenEntry = null;
        this.growlMessage = null;
        this.recordsPerPageSize = null;
        this.ddlBusinessData = null;
        this.ddlStatusType = null;
        this.newItem = null;
        this.lstShipToIDAllc = null;
        this.lstBusinessData = null;
        this.spinnerService = null;
    }
}