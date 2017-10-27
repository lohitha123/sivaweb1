import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Http, Response } from "@angular/http";
import { MT_ATPAR_ORG_GROUP_BUNITS } from "../../app/Entities/mt_atpar_org_group_bunits";
import { MT_ATPAR_ORG_GROUPS } from "../../app/Entities/mt_atpar_org_groups";
import { VM_CART_SCHEDULES } from '../entities/VM_CART_SCHEDULES';
import { MT_CRCT_PAR_LOC_SCHEDULE_DETAILS } from '../entities/mt_crct_par_loc_schedule_details';
import { MT_ATPAR_SCHEDULE_HEADER } from '../Entities/MT_ATPAR_SCHEDULE_HEADER';
import { Message } from './../components/common/api';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../Shared/HttpService';
import { SelectItem } from './../components/common/api';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { BusinessType, StatusType, TokenEntry_Enum, ClientType } from '../Shared/AtParEnums'
import { CartProcessServices } from './cart-process-parameters.service';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { AtParConstants } from '../Shared/AtParConstants';
import { DataTable } from '../components/datatable/datatable';

declare var module: {
    id: string;
}
@Component({

    templateUrl: 'cart-process-parameters.component.html',
    providers: [CartProcessServices, AtParCommonService, HttpService, AtParConstants],


})

export class ProcessParametersComponent {

    @ViewChild(DataTable) dataTableComponent: DataTable;
    growlMessage: Message[] = [];
    deviceTokenEntry: string[] = [];
    statusType: number = -1;
    lstScheduleDetails: MT_CRCT_PAR_LOC_SCHEDULE_DETAILS[];
    lstCheckedParLocation: Array<VM_CART_SCHEDULES>;
    startIndex: number;
    EndIndex: number;
    pageSize: number;
    statusMesssage: string;
    lstGridData: VM_CART_SCHEDULES[];
    lstGridData1 = new VM_CART_SCHEDULES();
    CartIdSearchLst: VM_CART_SCHEDULES[];
    lstgridfilterData: VM_CART_SCHEDULES[] = null;
    lstScheduleData: MT_ATPAR_SCHEDULE_HEADER[];
    ddlSchedId: SelectItem[] = [];
    ddlmodeldata: any;
    ddlSelectedProcessData = new MT_ATPAR_SCHEDULE_HEADER();
    autoCompleteCartID: string = "";
    showGrid: boolean = false;
    ddlShowOrgGroupDD: boolean = false;
    blnShowOrgGroupLabel: boolean = false;
    selectedOrgGroupId: string = "";
    lstOrgGroupData: SelectItem[] = [];
    orgGroupList: MT_ATPAR_ORG_GROUPS[];
    lblOrgGroupId: string;
    ddlBusinessData: SelectItem[] = [];
    businessDatangModel: string = "";
    previousSelected: string = '';
    lstBusinessData: MT_ATPAR_ORG_GROUP_BUNITS[];
    ALL: string = "ALL"
    rowPageOptions: any[];
    orgGroupIDForDBUpdate: string;
    blnsortbycolumn: boolean = true;

    constructor(private httpService: HttpService,
        private cartProcessServices: CartProcessServices,
        private spinnerService: SpinnerService,
        private commonService: AtParCommonService,
        private atParConstant: AtParConstants
    ) {
    }

    async ngOnInit() {
        try {
            this.spinnerService.start();
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
            this.lstCheckedParLocation = new Array<VM_CART_SCHEDULES>();
            this.bindOrgGroups();
            this.rowPageOptions = [];
            this.rowPageOptions = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
            this.ddlSchedId = [];
            this.pageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
            this.spinnerService.start();
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
                            this.orgGroupList = data.DataList;
                            this.ddlBusinessData.push({ label: "Select Org ID ", value: "" })
                            if (this.orgGroupList.length == 1) {
                                this.blnShowOrgGroupLabel = true;
                                this.lblOrgGroupId = this.orgGroupList[0].ORG_GROUP_ID + " - " + this.orgGroupList[0].ORG_GROUP_NAME;
                                this.selectedOrgGroupId = this.orgGroupList[0].ORG_GROUP_ID;
                                this.populateBusinessUnits();
                                break;
                            }
                            else if (this.orgGroupList.length > 1) {
                                this.ddlShowOrgGroupDD = true;
                                this.lstOrgGroupData.push({ label: "Select One", value: "" })
                                for (var i = 0; i < this.orgGroupList.length; i++) {
                                    if (this.orgGroupList[i].ORG_GROUP_ID != 'All') {
                                        this.lstOrgGroupData.push({ label: this.orgGroupList[i].ORG_GROUP_ID + " - " + this.orgGroupList[i].ORG_GROUP_NAME, value: this.orgGroupList[i].ORG_GROUP_ID })
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

    async ddlOrgGrpIdChanged(event) {
        try {
            this.showGrid = false;
            this.businessDatangModel = "";
            this.autoCompleteCartID = "";
            this.ddlBusinessData = [];
            this.growlMessage = [];
            this.ddlBusinessData.push({ label: "Select Org ID ", value: "" })
            if (this.selectedOrgGroupId == "Select One" || this.selectedOrgGroupId == "") {
                return;
            }
            if (this.previousSelected == "" || event.label != this.previousSelected) {

                this.previousSelected = this.selectedOrgGroupId;
                this.spinnerService.start();
                this.populateBusinessUnits();
                this.spinnerService.stop();
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ddlOrgGrpIdChanged");
        }
    }

    ddlBUnitChanged() {
        this.autoCompleteCartID = "";
        this.CartIdSearchLst = [];
        this.showGrid = false;
    }

    async populateBusinessUnits(): Promise<boolean> {
        let isOrgBUnitsExist: boolean = false;
        this.showGrid = false;

        try {
            if (this.blnShowOrgGroupLabel == true) {
                this.orgGroupIDForDBUpdate = this.lblOrgGroupId.split("-")[0].trim();
            }
            else {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            }
            this.spinnerService.start();
            await this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, BusinessType.Inventory).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUP_BUNITS>;
                    this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.lstBusinessData = data.DataList;
                            if (this.lstBusinessData.length > 0) {
                                for (let i = 0; i < this.lstBusinessData.length; i++) {
                                    this.ddlBusinessData.push({ label: this.lstBusinessData[i].toString(), value: this.lstBusinessData[i].toString() })
                                }
                            }
                            isOrgBUnitsExist = true;
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage = []
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage = []
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage = []
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            break;
                        }
                    }

                });
            this.spinnerService.stop();
            return Promise.resolve(isOrgBUnitsExist);
        }
        catch (ex) {
            this.clientErrorMsg(ex, "populateBusinessUnits");
        }
    }

    searchAutoCompleteCartIdName(event) {
        let query = event.query;
        this.CartIdSearchLst = this.lstGridData;
        this.CartIdSearchLst = this.filterCartIdNames(query, this.CartIdSearchLst)
    }

    filterCartIdNames(query, cartIdNames: any[]): any[] {
        if (cartIdNames != null) {
            let filtered : any[] = [];
            if (query == "%") {
                for (let i = 0; i < cartIdNames.length; i++) {
                    let cartIdNamesValue = cartIdNames[i];
                    filtered.push(cartIdNamesValue.CART_ID);
                }
            } else {
                if (query.length >= 1) {
                    for (let i = 0; i < cartIdNames.length; i++) {
                        let cartIdNamesValue = cartIdNames[i];
                        if (cartIdNamesValue.CART_ID.toString().toUpperCase().indexOf(query.toString().toUpperCase()) == 0) {
                            filtered.push(cartIdNamesValue.CART_ID);
                        }
                    }
                }
            }
            return filtered;
        }
    }



    async  btnGo_Click() {
        try {
            if (this.ddlShowOrgGroupDD) {
                if (this.selectedOrgGroupId == null || this.selectedOrgGroupId == undefined || this.selectedOrgGroupId == "") {
                    this.showGrid = false;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                    return;
                }
            }
            if (this.businessDatangModel == "" || this.businessDatangModel == "0" || this.businessDatangModel == null) {
                this.showGrid = false;
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Org ID" });
                return;
            }
            await this.PopulateCarts();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnGo_Click");
        }
    }

    async  PopulateCarts() {
        this.lstgridfilterData = null;
        this.showGrid = false;
        this.growlMessage = [];

        try {
            let orgGroupId: string;
            if (this.blnShowOrgGroupLabel) {
                orgGroupId = this.lblOrgGroupId.split("-")[0];
            } else {
                orgGroupId = this.selectedOrgGroupId;
            }
            if (this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID] != "All") {
                orgGroupId = this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID];
            }
            this.spinnerService.start();
            await this.cartProcessServices.GetProcessParametersCarts(orgGroupId,
                this.businessDatangModel, this.autoCompleteCartID, this.deviceTokenEntry[TokenEntry_Enum.UserID])
                .then(async(res: Response) => {
                    let data = res.json();
                    this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.lstGridData = new Array<VM_CART_SCHEDULES>();
                            let dataList = data.DataList;
                            for (let x = 0; x < dataList.length; x++) {
                                if (dataList[x].ASSIGN_CART == "Y") {
                                    dataList[x].ASSIGN_CART = true;
                                }
                                else {
                                    dataList[x].ASSIGN_CART = false;
                                }
                                this.lstGridData1 = new VM_CART_SCHEDULES();
                                this.lstGridData1.CART_ID = dataList[x].CART_ID;
                                this.lstGridData1.BUSINESS_UNIT = dataList[x].BUSINESS_UNIT;
                                this.lstGridData1.ASSIGN_CART = dataList[x].ASSIGN_CART;
                                this.lstGridData1.SCHEDULER = dataList[x].SCHEDULER;
                                this.lstGridData.push(this.lstGridData1);
                            }
                            this.lstGridData = asEnumerable(this.lstGridData).OrderByDescending(x => x.ASSIGN_CART).ToArray();
                            let sortedUnCheckedData = asEnumerable(this.lstGridData).OrderBy(x => x.ASSIGN_CART).ToArray();
                            this.lstGridData = new Array<VM_CART_SCHEDULES>();
                            this.lstGridData = sortedUnCheckedData.reverse();
                            if (this.lstGridData.length >= 1) {
                                this.growlMessage = [];
                                this.showGrid = true;
                                //this.ddlSchedId = [];
                                //this.ddlSchedId.push({ label: "Select one", value: "" })
                            }
                            else {
                                this.showGrid = false;
                            }
                            break;
                        }
                        case StatusType.Error:
                            {
                                this.growlMessage = [];
                                this.statusMesssage = data.StatusMessage;
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                this.showGrid = false;
                                break;
                            }
                        case StatusType.Warn:
                            {
                                this.growlMessage = [];
                                this.statusMesssage = data.StatusMessage;
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                this.showGrid = false;
                                break;
                            }
                        case StatusType.Custom:
                            {
                                this.growlMessage = [];
                                this.statusMesssage = data.StatusMessage;
                                this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                this.showGrid = false;
                                break;
                            }
                    }
                });
            await this.getSheduleIds();
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "PopulateCarts");
        }
    }

    async  getSheduleIds() {
        try {
            let orgGroupId: string;

            //if (this.blnShowOrgGroupLabel) {
            //    orgGroupId = this.lblOrgGroupId;
            //} else {
            //    orgGroupId = this.selectedOrgGroupId;
            //}

            //if (this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID] != "All") {
                orgGroupId = this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID];
            //}

                this.spinnerService.start();






            await this.cartProcessServices.GetSheduleIdata(orgGroupId)
                .then((res: Response) => {
                    this.spinnerService.stop();
                    let data = res.json();
                    switch (data.StatType) {
                        case StatusType.Success:
                            {
                                this.ddlSchedId = [];
                                this.ddlSchedId.push({ label: "Select one", value: "" })
                                this.lstScheduleData = data.DataList;
                                for (let i = 0; i < this.lstScheduleData.length; i++) {
                                    this.ddlSchedId.push({ label: this.lstScheduleData[i].SCHEDULE_ID, value: this.lstScheduleData[i].SCHEDULE_ID })
                                }
                                break;
                            }
                        case StatusType.Error:
                            {
                                this.statusMesssage = data.StatusMessage;
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                break;
                            }
                        case StatusType.Warn:
                            {
                                this.statusMesssage = data.StatusMessage;
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                break;
                            }
                        case StatusType.Custom:
                            {
                                this.statusMesssage = data.StatusMessage;
                                this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                break;
                            }
                    }
                });
            this.spinnerService.stop();
        }

        catch (ex) {
            this.clientErrorMsg(ex, "getSheduleIds");
        }
    }

    changeStatus(cartdata) {
        try {
            let lstCartSchedules = cartdata;
            for (let x = 0; x < lstCartSchedules.length; x++) {
                if (lstCartSchedules[x].ASSIGN_CART == true) {
                    lstCartSchedules[x].ASSIGN_CART = "1";
                }
                else {
                    lstCartSchedules[x].ASSIGN_CART = false;
                }
                this.lstGridData1 = new VM_CART_SCHEDULES();
                this.lstGridData1.CART_ID = lstCartSchedules[x].CART_ID;
                this.lstGridData1.ASSIGN_CART = lstCartSchedules[x].ASSIGN_CART;
                this.lstGridData1.SCHEDULER = lstCartSchedules[x].SCHEDULER;
                this.lstGridData.push(this.lstGridData1);
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "changeStatus");
        }
    }

    async  btnSubmit_Click() {
        try {
            if (this.blnShowOrgGroupLabel == true) {

                this.orgGroupIDForDBUpdate = this.lblOrgGroupId.split("-")[0];
            }
            else {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            }
            this.spinnerService.start();
            if (this.lstGridData != null) {
                let data = this.lstGridData.filter(x => x.ASSIGN_CART == true && x.SCHEDULER == "");
                if (data == null || data.length > 0) {
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    return this.growlMessage.push({ severity: "warn", summary: AtParConstants.GrowlTitle_Warn, detail: "Please select Inventory Schedule" });;
                }
                var schedules = this.lstGridData;
                this.lstScheduleDetails = Array<MT_CRCT_PAR_LOC_SCHEDULE_DETAILS>();
                for (let x = 0; x < schedules.length; x++) {
                    let scheduleDetails = new MT_CRCT_PAR_LOC_SCHEDULE_DETAILS();
                    if (schedules[x].ASSIGN_CART == true) {
                        scheduleDetails.CHK_VALUE = "1";
                        scheduleDetails.PAR_LOC_ID = schedules[x].CART_ID
                        scheduleDetails.SCHEDULE_ID = schedules[x].SCHEDULER;
                        this.lstScheduleDetails.push(scheduleDetails);
                    }
                    else {
                        scheduleDetails.CHK_VALUE = "0";
                        scheduleDetails.PAR_LOC_ID = schedules[x].CART_ID
                        scheduleDetails.SCHEDULE_ID = schedules[x].SCHEDULER;
                        scheduleDetails.ORG_GROUP_ID = " "
                        scheduleDetails.ORG_ID = " "
                        this.lstScheduleDetails.push(scheduleDetails);
                    }
                }
                this.spinnerService.start();
                await this.cartProcessServices.AssignScheduleToCarts(this.lstScheduleDetails, this.orgGroupIDForDBUpdate.trim(), this.businessDatangModel)
                    .catch(this.httpService.handleError).then((webresponse: Response) => {
                        let response = webresponse.json() as AtParWebApiResponse<MT_CRCT_PAR_LOC_SCHEDULE_DETAILS>;
                        this.spinnerService.stop();
                        switch (response.StatType) {
                            case StatusType.Success:
                                {
                                    this.growlMessage = [];
                                    this.showGrid = false;
                                    this.businessDatangModel = '';
                                   // this.selectedOrgGroupId = '';
                                    this.autoCompleteCartID = '';
                                    this.growlMessage.push({ severity: "success", summary: AtParConstants.GrowlTitle_Success, detail: "Updated Successfully" })
                                    break;
                                }
                            case StatusType.Error:
                                {
                                    this.growlMessage = [];
                                    this.statusMesssage = response.StatusMessage;
                                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                    break;
                                }
                            case StatusType.Warn:
                                {
                                    this.statusMesssage = response.StatusMessage;
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                    break;
                                }
                            case StatusType.Custom:
                                {
                                    this.statusMesssage = response.StatusMessage;
                                    this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                    break;
                                }
                        }
                    });
            }
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnSubmit_Click");
        }
    }

    public onSort1(event) {
        try {
            if (event.data != null && event.data.length > 0) {
                for (let x = 0; x < event.data.length; x++) {
                    event.data[x].ASSIGN_CART = false;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "onSort1");
        }
    }

    public onSort(event) {
        try {
            var element = event;
            this.blnsortbycolumn = !this.blnsortbycolumn;
            let checkedData = asEnumerable(this.lstGridData).Where(a => a.ASSIGN_CART == 1).ToArray();
            let unCheckedData = asEnumerable(this.lstGridData).Where(a => a.ASSIGN_CART == 0).ToArray();

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
                    this.lstGridData = checkedData.reverse().concat(unCheckedData.reverse());// sortedUnCheckedData.reverse();
                } else {
                    this.lstGridData = checkedData.concat(unCheckedData);
                }
            }
        } catch (exMsg) {
            this.clientErrorMsg(exMsg, "onSort");
        }
    }

    checkAll() {
        try {
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = + sessionStorage.getItem("RecordsEndindex");

            if (this.lstgridfilterData != null || this.lstgridfilterData != undefined) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstgridfilterData[i].ASSIGN_CART = true;
                }
            }
            else {
                if (this.EndIndex > this.lstGridData.length) {
                    this.EndIndex = this.lstGridData.length;
                }
                for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstGridData[i].ASSIGN_CART = true;
                }
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "checkAll");
        }
    }


    unCheckAll() {
        try {
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = + sessionStorage.getItem("RecordsEndindex");

            if (this.lstgridfilterData != null || this.lstgridfilterData != undefined) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstgridfilterData[i].ASSIGN_CART = false;
                }
            } else {
                if (this.EndIndex > this.lstGridData.length) {
                    this.EndIndex = this.lstGridData.length;
                }
                for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstGridData[i].ASSIGN_CART = false;
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "unCheckAll");
        }
    }

    filterdata(event) {
        this.lstgridfilterData = new Array<VM_CART_SCHEDULES>();
        this.lstgridfilterData = event;
    }

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    ngOnDestroy() {
        this.deviceTokenEntry = null;
        this.orgGroupList = null;
        this.CartIdSearchLst = null;
        this.growlMessage = null;
        this.lstGridData = null;
        this.lstScheduleData = null;
        this.lstGridData1 = null;
        this.growlMessage = null;
        this.lstGridData1 = null;
        this.spinnerService.stop();
        this.lstOrgGroupData = null;
        this.lblOrgGroupId = null;
        this.ddlBusinessData = null;
        this.businessDatangModel = null;
        this.previousSelected = null;
        this.lstBusinessData = null;
        this.orgGroupIDForDBUpdate = null;
    }

}