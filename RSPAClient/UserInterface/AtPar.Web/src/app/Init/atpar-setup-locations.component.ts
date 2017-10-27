import { Component, ViewChild,Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { datatableservice } from './../components/datatable/datatableservice';
import { VM_MT_ATPAR_INSERT_UPDATE_LOC_IDS } from "../../app/Entities/VM_MT_ATPAR_INSERT_UPDATE_LOC_IDS";
import { VM_MT_ATPAR_LOCATIONS } from "../../app/Entities/VM_MT_ATPAR_LOCATIONS";
import { SetupLocationServices } from "./atpar-setup-locations.service";
import { TokenEntry_Enum, YesNo_Enum, BusinessType, StatusType } from '../Shared/AtParEnums';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { SpinnerSentEvent } from '../components/spinner/spinner.sent.event';
import { Message } from './../components/common/api';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { Http, Response } from '@angular/http';
import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';
import { AtParConstants } from '../Shared/AtParConstants';
import { DataTable } from '../components/datatable/datatable';
import { Menus } from '../AtPar/Menus/routepath';
import { DOCUMENT } from '@angular/platform-browser';

declare var module: {
    id: string;
}
@Component({
    templateUrl: 'atpar-setup-locations.component.html',
    providers: [SetupLocationServices, datatableservice, AtParCommonService],

})

export class SetupLocationsComponent {
    @ViewChild(DataTable) dataTableComponent: DataTable;
    showGrid: boolean = false;
    page: boolean = true; //home
    form: boolean = false; //add
    readonly: boolean = false;
    loading: boolean = true;
    newItem: VM_MT_ATPAR_INSERT_UPDATE_LOC_IDS;
    LocationsData: VM_MT_ATPAR_LOCATIONS[];
    lstLocationdetails: Array<VM_MT_ATPAR_INSERT_UPDATE_LOC_IDS>;
    deviceTokenEntry: string[] = [];
    recordsPerPageSize: number;
    statusMsgs: Message[] = [];
    getBunitsLst: string[] = [];
    ddlbusunits: any;
    statusList: any;
    buttonTitle: string;
    mode: string;
    isEditMode: boolean;
    statusType: string = "";
    bindSymbol: string = "";

    //validating textbox
    txtLocIDStatus: number;
    txtLocNameStatus: number;
    txtDeptIDStatus: number;
    txtAddress1Status: number;
    txtAddress2Status: number;
    txtCityStatus: number;
    txtStateStatus: number;
    txtZipStatus: number;
    txtPhoneStatus: number;
    txtAttentionToStatus: number;
    txtEmailStatus: number;
    txtCommentsStatus: number;
    ddlOrgIDStatus: number;
    breadCrumbMenu: Menus;

    constructor(public dataservice: datatableservice,
        private spinnerService: SpinnerService,
        private SetupLocationServices: SetupLocationServices,
        private commonService: AtParCommonService,
        private atParConstant: AtParConstants,
        @Inject(DOCUMENT) private document,
        private httpService: HttpService
    ) {
        this.breadCrumbMenu = new Menus();
    }

    async ngOnInit() {
        try {
            this.newItem = new VM_MT_ATPAR_INSERT_UPDATE_LOC_IDS();
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.recordsPerPageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
            this.ddlbusunits = [];
            this.ddlbusunits.push({ label: "Select org", value: "Select Org" });
            this.populateBusinessUnits();
            this.statusList = [];
            this.statusList.push({ label: 'All', value: "" });
            this.statusList.push({ label: 'Active', value: false });
            this.statusList.push({ label: 'InActive', value: true });
        }
        catch (ex) {
            this.serverErrorMsg(ex,"ngOnInit");
        }
    }

    populateBusinessUnits() {
        try {
            this.spinnerService.start();
            this.commonService.getBusinessUnits(this.deviceTokenEntry[TokenEntry_Enum.UserID], BusinessType.AllBunits.toString()).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<string>;
                    this.getBunitsLst = res.json().DataList,
                        this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            if (this.getBunitsLst.length > 0) {
                                for (var i = 0; i <= this.getBunitsLst.length - 1; i++) {
                                    this.ddlbusunits.push({ label: this.getBunitsLst[i].toString(), value: this.getBunitsLst[i].toString() });
                                }
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                    if (this.ddlbusunits.length <= 1) {
                        this.statusMsgs = [];
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Org IDs are not allocated for the Org Group of the logged in user " + this.deviceTokenEntry[TokenEntry_Enum.UserID] });
                    }
                });
            this.spinnerService.stop();
        }
        catch (ex) {
            this.serverErrorMsg(ex,"populateBusinessUnits");
        }
    }

    ddlChnage() {
        this.showGrid = false;
    }

    async go() {
        this.statusMsgs = [];      
        this.statusType = "";
        if (this.showGrid == true) {
            this.dataTableComponent.reset();
        }
        try {
            if (this.newItem.ORG_ID == "Select Org" || this.newItem.ORG_ID == undefined || this.newItem.ORG_ID == null || this.newItem.ORG_ID == "") {
                this.statusMsgs = [];
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Org ID" });
                this.showGrid = false;
            }
            else {                
                this.spinnerService.start();
                if (this.newItem.LOCATION_ID == undefined) {
                    this.newItem.LOCATION_ID = "";
                }
                if (this.newItem.LOCATION_NAME == undefined) {
                    this.newItem.LOCATION_NAME = "";
                }
                this.showGrid = false;
                this.LocationsData = [];
                this.bindGrid();
            }
        }
        catch (ex) {
            this.serverErrorMsg(ex, "go");
        }
    }

    add() {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Create Location';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.form = true;
        this.page = false;
        this.isEditMode = true;
        this.showGrid = false;
        //this.populateBusinessUnits();
        this.statusMsgs = [];
        this.readonly = false;
        this.buttonTitle = "Save";
        this.bindSymbol="floppy-o"
        this.loading = true;
        this.newItem = new VM_MT_ATPAR_INSERT_UPDATE_LOC_IDS();
        this.txtLocIDStatus = null;
        this.txtLocNameStatus = null;
        this.ddlOrgIDStatus = null;

    }

    editLocationData(location) {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Location';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.newItem = new VM_MT_ATPAR_INSERT_UPDATE_LOC_IDS();
        this.form = true;
        this.page = false;
        this.showGrid = false;
        this.isEditMode = false;
        //this.populateBusinessUnits();
        this.statusMsgs = [];
        this.loading = false;
        this.readonly = true;
        this.buttonTitle = "Update";
        this.bindSymbol="check"
        this.newItem.LOCATION_ID = location.LOCATION;
        this.newItem.ORG_ID = location.SETCNTRLVALUE;
        this.newItem.LOCATION_NAME = location.DESCR;
        this.newItem.DEPARTMENT_ID = location.DEPARTMENT_ID;
        this.newItem.ADDRESS_1 = location.ADDRESS1;
        this.newItem.ADDRESS_2 = location.ADDRESS_2;
        this.newItem.STATE = location.STATE;
        this.newItem.CITY = location.CITY;
        this.newItem.ZIP = location.ZIP;
        this.newItem.PHONE_NO = location.PHONE_NO;
        this.newItem.ATTENTION_TO = location.ATTENTION_TO;
        this.newItem.EMAIL = location.EMAIL;
        if (location.STATUS == "Active") {
            this.newItem.STATUS = true;
        }
        else {
            this.newItem.STATUS = false;
        }
        this.newItem.COMMENTS = location.COMMENTS;
        this.newItem.PREV_ORGID = location.SETCNTRLVALUE;


    }

    close() {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.form = false;
        this.page = true;
        this.statusMsgs = [];
        this.newItem = new VM_MT_ATPAR_INSERT_UPDATE_LOC_IDS();
    }

    bindModelDataChange(event: any) {
        if ("LocationID" == event.TextBoxID.toString()) {
            this.txtLocIDStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("LocationName" == event.TextBoxID.toString()) {
            this.txtLocNameStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("DepartmentID" == event.TextBoxID.toString()) {
            this.txtDeptIDStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("Address1" == event.TextBoxID.toString()) {
            this.txtAddress1Status = event.validationrules.filter(x => x.status == false).length;
        }
        if ("Address2" == event.TextBoxID.toString()) {
            this.txtAddress2Status = event.validationrules.filter(x => x.status == false).length;
        }
        if ("City" == event.TextBoxID.toString()) {
            this.txtCityStatus = event.validationrules.filter(x => x.status == false).length;
        }

        if ("ZIP" == event.TextBoxID.toString()) {
            this.txtZipStatus = event.validationrules.filter(x => x.status == false).length;
        }

        if ("Attention" == event.TextBoxID.toString()) {
            this.txtAttentionToStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("Phone" == event.TextBoxID.toString()) {
            this.txtPhoneStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("Email" == event.TextBoxID.toString()) {
            this.txtEmailStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("State" == event.TextBoxID.toString()) {
            this.txtStateStatus = event.validationrules.filter(x => x.status == false).length;
        }

        if ("Comments" == event.TextBoxID.toString()) {
            this.txtCommentsStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if (this.buttonTitle == "UPDATE") {
            this.txtLocIDStatus = 0;
            if (this.txtLocNameStatus >= 1) {
                this.txtLocNameStatus = 1;
            }
            else {
                this.txtLocNameStatus = 0;
            }
            this.ddlOrgIDChanged();
        }


        if (this.txtLocIDStatus == 0 && this.txtLocNameStatus == 0 && this.ddlOrgIDStatus == 0) {
            if ((this.txtDeptIDStatus == undefined || this.txtDeptIDStatus == 0) &&
                (this.txtAddress1Status == undefined || this.txtAddress1Status == 0) &&
                (this.txtAddress2Status == undefined || this.txtAddress2Status == 0) &&
                (this.txtCityStatus == undefined || this.txtCityStatus == 0) &&
                (this.txtZipStatus == undefined || this.txtZipStatus == 0) &&
                (this.txtAttentionToStatus == undefined || this.txtAttentionToStatus == 0) &&
                (this.txtPhoneStatus == undefined || this.txtPhoneStatus == 0) &&
                (this.txtEmailStatus == undefined || this.txtEmailStatus == 0) &&
                (this.txtStateStatus == undefined || this.txtStateStatus == 0) &&
                (this.txtCommentsStatus == undefined || this.txtCommentsStatus == 0)) {
                this.loading = false;
            }
            else {
                this.loading = true;
            }


        }
        else {
            this.loading = true;
        }

    }

    ddlOrgIDChanged() {
        if (this.newItem.ORG_ID == "Select Org" || this.newItem.ORG_ID == undefined || this.newItem.ORG_ID == null || this.newItem.ORG_ID == "") {
            this.ddlOrgIDStatus = 1;
        }
        else {
            this.ddlOrgIDStatus = 0;
        }
        if (this.buttonTitle == "UPDATE") {
            this.txtLocIDStatus = 0;
            if (this.txtLocNameStatus >= 1) {
                this.txtLocNameStatus = 1;
            }
            else {
                this.txtLocNameStatus = 0;
            }
        }
        if (this.txtLocIDStatus == 0 && this.txtLocNameStatus == 0 && this.ddlOrgIDStatus == 0 &&
            (this.newItem.LOCATION_ID != "" && this.newItem.LOCATION_ID != undefined && this.newItem.LOCATION_ID != null) && (this.newItem.LOCATION_NAME != "" && this.newItem.LOCATION_NAME != undefined && this.newItem.LOCATION_NAME != null)) {
            if ((this.txtDeptIDStatus == undefined || this.txtDeptIDStatus == 0) &&
                (this.txtAddress1Status == undefined || this.txtAddress1Status == 0) &&
                (this.txtAddress2Status == undefined || this.txtAddress2Status == 0) &&
                (this.txtCityStatus == undefined || this.txtCityStatus == 0) &&
                (this.txtZipStatus == undefined || this.txtZipStatus == 0) &&
                (this.txtAttentionToStatus == undefined || this.txtAttentionToStatus == 0) &&
                (this.txtPhoneStatus == undefined || this.txtPhoneStatus == 0) &&
                (this.txtEmailStatus == undefined || this.txtEmailStatus == 0) &&
                (this.txtStateStatus == undefined || this.txtStateStatus == 0) &&
                (this.txtCommentsStatus == undefined || this.txtCommentsStatus == 0)) {
                this.loading = false;
            }
            else {
                this.loading = true;
            }
        }
        else {
            this.loading = true;
        }

    }

    async submitData() {
        this.showGrid = false;
        try {
            this.spinnerService.start();
            this.statusMsgs = [];
            if (this.newItem.ORG_ID == "Select Org" || this.newItem.ORG_ID == undefined || this.newItem.ORG_ID == null || this.newItem.ORG_ID == "") {
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Org ID" });
                this.showGrid = false;
            }
            else {
                if (this.buttonTitle == "Save") {
                    this.newItem.STATUS = true;
                    this.mode = "Add";

                }
                else if (this.buttonTitle == "UPDATE") {
                    this.mode = "Edit";
                }

                this.lstLocationdetails = new Array<VM_MT_ATPAR_INSERT_UPDATE_LOC_IDS>();
                this.lstLocationdetails.push(this.newItem);

                await this.SetupLocationServices.InsertUpdateLocIDs(this.lstLocationdetails, this.mode, this.newItem.ORG_ID).
                    catch(this.httpService.handleError).then((res: Response) => {
                        let resp = res.json() as AtParWebApiResponse<number>;
                        this.spinnerService.stop();
                        switch (resp.StatType) {
                            case StatusType.Success:
                                if (this.buttonTitle == "Add") {
                                    this.statusMsgs = [];
                                    let statusMessage = AtParConstants.Created_Msg.replace("1%", "Location").replace("2%", this.newItem.LOCATION_ID);
                                    this.statusMsgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: statusMessage });
                                    this.newItem = new VM_MT_ATPAR_INSERT_UPDATE_LOC_IDS();
                                    this.loading = true;
                                    this.txtLocIDStatus = null;
                                    this.txtLocNameStatus = null;
                                    this.ddlOrgIDStatus = null;
                                    document.getElementById("LocationID").focus(); 
                                }
                                else if (this.buttonTitle == "UPDATE") {
                                    this.statusMsgs = [];
                                    let statusMessage = AtParConstants.Updated_Msg.replace("1%", "Location").replace("2%", this.newItem.LOCATION_ID);
                                    this.statusMsgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: statusMessage });
                                    document.getElementById("txtddlOrgId").focus();
                                }
                                break;

                            case StatusType.Error:
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                                break;
                            case StatusType.Warn:
                                this.statusMsgs = [];
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                                if (!this.isEditMode) {
                                    document.getElementById("txtddlOrgId").focus();
                                }
                                else {
                                    document.getElementById("LocationID").focus();
                                }
                                break;
                        }
                        this.atParConstant.scrollToTop();
                    });
            }
        }
        catch (ex) {
            this.serverErrorMsg(ex, "submitData");
        }
    }

    serverErrorMsg(strExMsg, funName) {
        this.statusMsgs = [];
        this.atParConstant.catchClientError(this.statusMsgs, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    async updateLocationStatus(location) {
        this.spinnerService.start();
        this.statusMsgs = [];
        try {
            await this.commonService.UpdateLocIDStatus(location.SETCNTRLVALUE, location.STATUS_BOOL, location.LOCATION)
                .forEach(async resp => {
                    switch (resp.StatType) {
                        case StatusType.Success:
                            await this.bindGrid();
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Location ID " + location.LOCATION + " status updated successfully" });
                            this.showGrid = true;
                            this.spinnerService.stop();
                            break;
                        case StatusType.Error:
                            await this.bindGrid();
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                            this.spinnerService.stop();
                            this.showGrid = true;
                            break;
                        case StatusType.Warn:
                            await this.bindGrid();
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                            this.spinnerService.stop();
                            this.showGrid = true;
                            break;
                    }

                });

        }
        catch (ex) {
            this.serverErrorMsg(ex, "updateLocationStatus");
        }
    }

    async bindGrid() {
        try {
            this.spinnerService.start();
            await this.commonService.getLocations(this.newItem.ORG_ID, "", this.newItem.LOCATION_ID, this.newItem.LOCATION_NAME).
                catch(this.httpService.handleError).then((res: Response) => {
                    let resp = res.json() as AtParWebApiResponse<VM_MT_ATPAR_LOCATIONS>;
                    switch (resp.StatType) {
                        case StatusType.Success:
                            for (let i = 0; i <= resp.DataList.length - 1; i++) {
                                if (resp.DataList[i].STATUS == "InActive") {
                                    resp.DataList[i].STATUS_BOOL = true;
                                }
                                else if (resp.DataList[i].STATUS == "Active") {
                                    resp.DataList[i].STATUS_BOOL = false;
                                }
                            }
                            this.LocationsData = resp.DataList;
                            this.showGrid = true;
                            this.spinnerService.stop();
                            break;
                        case StatusType.Error:
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                            this.showGrid = false;
                            this.spinnerService.stop();
                            break;
                        case StatusType.Warn:
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                            this.showGrid = false;
                            this.spinnerService.stop();
                            break;
                    }
                });
            this.spinnerService.stop();
        }
        catch (ex) {
            this.serverErrorMsg(ex, "bindGrid");
        }
    }

    ngOnDestroy() {
        this.deviceTokenEntry = null;
        this.statusMsgs = null;
        this.recordsPerPageSize = null;
        this.ddlbusunits = null;
        this.getBunitsLst = null;
        this.newItem = null;
        this.LocationsData = null;
        this.statusList = null;
        this.mode = null;
        this.buttonTitle = null;
    }

}