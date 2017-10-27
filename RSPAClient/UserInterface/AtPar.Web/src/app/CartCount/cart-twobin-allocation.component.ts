import { Component, ViewChild } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { MT_ATPAR_ORG_GROUPS } from '../entities/mt_atpar_org_groups';
import { MT_ATPAR_ORG_GROUP_BUNITS } from '../entities/mt_atpar_org_group_bunits';
import { MT_CRCT_TWO_BIN_ALLOCATION } from '../entities/mt_crct_two_bin_allocation';
import { TextboxControl } from '../Common/DynamicControls/TextboxControl';
import { DropDownControl } from '../Common/DynamicControls/DropDownControl';
import { HttpService } from '../Shared/HttpService';
import { Http, Response } from "@angular/http";
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { SelectItem } from '../components/common/api';
import { StatusType } from '../Shared/AtParEnums';
import { Message } from '../components/common/api';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { BusinessType } from '../Shared/AtParEnums';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';
import { TokenEntry_Enum, EnumApps } from '../Shared/AtParEnums';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { CartTwoBinService } from './cart-twobin-allocation.service';
import { DataTable } from '../components/datatable/datatable';
import { AtParConstants } from '../Shared/AtParConstants';
declare var module: {
    id: string;
}

@Component({
    templateUrl: 'cart-twobin-allocation.component.html',
    providers: [datatableservice, AtParCommonService, CartTwoBinService, HttpService]
})

export class TwoBinAllocationComponent {
    deviceTokenEntry: string[] = [];
    recordsPerPageSize: number;
    growlMessage: Message[] = [];
    orgGroupData: MT_ATPAR_ORG_GROUPS[];
    blnShowOrgGroupLabel: boolean = false;
    selectedOrgGroupId: string = "";
    selectedDropDownDisplay: string = "A";
    selectedBunit: string = "";
    selectedParlocation: string = "";
    orgGrpId: string = "";
    order: string = "";
    lstDBMainDetails: MT_CRCT_TWO_BIN_ALLOCATION[];
    blnShowOrgGroupDD: boolean = false;
    orgGroupIDForDBUpdate: string;
    showGrid: boolean = false;
    lstOrgGroups: SelectItem[] = [];
    lstFilteredBUnits: SelectItem[] = [];
    lstFilteredDisplay: SelectItem[] = [];
    lstDBData: MT_CRCT_TWO_BIN_ALLOCATION[];
    sortedcheckedrec: MT_CRCT_TWO_BIN_ALLOCATION[];
    sorteduncheckedrec: MT_CRCT_TWO_BIN_ALLOCATION[];
    blnsortbycolumn: boolean = true;
    custom: string = "custom";
    dataCheckedSorting: MT_CRCT_TWO_BIN_ALLOCATION[] = [];
    dataUncheckedSorting: Array<MT_CRCT_TWO_BIN_ALLOCATION>;
    txtIdleTimeStatus: number;
    previousFiled: string = "";

    constructor(private httpService: HttpService,
        private spinnerService: SpinnerService,
        private commonService: AtParCommonService,
        private cartTwoBinService: CartTwoBinService,
        private atParConstant: AtParConstants) {
    }

    ngOnInit() {
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.recordsPerPageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        this.dataCheckedSorting = new Array<MT_CRCT_TWO_BIN_ALLOCATION>();
        this.dataUncheckedSorting = new Array<MT_CRCT_TWO_BIN_ALLOCATION>();
        this.bindOrgGroups();
        this.bindDisplayItems();
    }

    async bindOrgGroups() {
        try {
            this.spinnerService.start();
            await this.commonService.getUserOrgGroups(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.orgGroupData = data.DataList;
                            if (this.orgGroupData.length == 1) {
                                this.blnShowOrgGroupLabel = true;
                                this.orgGrpId = this.orgGroupData[0].ORG_GROUP_ID + " - " + this.orgGroupData[0].ORG_GROUP_NAME;
                                this.populateBusinessUnits();
                                this.spinnerService.stop();
                                break;
                            }
                            else if (this.orgGroupData.length > 1) {
                                this.blnShowOrgGroupDD = true;
                                this.lstOrgGroups.push({ label: "Select One", value: "Select One" })
                                this.lstFilteredBUnits = [];
                                this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" })
                                for (var i = 0; i < this.orgGroupData.length; i++) {
                                    if (this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                        this.lstOrgGroups.push({ label: this.orgGroupData[i].ORG_GROUP_ID + " - " + this.orgGroupData[i].ORG_GROUP_NAME, value: this.orgGroupData[i].ORG_GROUP_ID })
                                    }
                                }
                                this.spinnerService.stop();
                                break;
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                    }

                });

        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindOrgGroups");
        }
    }

    async populateBusinessUnits(): Promise<boolean> {
        this.spinnerService.start();
        let isOrgBUnitsExist: boolean = false;

        try {
            if (this.blnShowOrgGroupLabel == true) {
                this.orgGroupIDForDBUpdate = this.orgGrpId.split("-")[0];
            }
            else {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            }

            await this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, BusinessType.Inventory).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUP_BUNITS>;
                    this.growlMessage = [];
                    this.lstFilteredBUnits = [];
                    this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" })
                    switch (data.StatType) {
                        case StatusType.Success: {
                            for (let i = 0; i < data.DataList.length; i++) {
                                this.lstFilteredBUnits.push({
                                    label: data.DataList[i].toString(),
                                    value: data.DataList[i].toString()
                                })
                            }
                            isOrgBUnitsExist = true;
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.showGrid = false;
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            this.spinnerService.stop();
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

    async  ddlOrgGrpIdChanged() {
        this.showGrid = false;
        this.growlMessage = [];

        if (this.selectedOrgGroupId == "Select One") {
            this.lstFilteredBUnits = [];
            this.lstFilteredBUnits.push({ label: "Select BUnit", value: " " });
            return;
        }

        this.selectedBunit = "";
        this.lstDBData = new Array<MT_CRCT_TWO_BIN_ALLOCATION>();
        this.spinnerService.start();
        try {
            await this.populateBusinessUnits();
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ddlOrgGrpIdChanged");
        }
    }

    ddl_Changed() {
        this.showGrid = false;
    }

    async bindDisplayItems() {
        this.lstFilteredDisplay.push({ label: "All", value: "A" })
        this.lstFilteredDisplay.push({ label: "Allocated", value: "L" })
        this.lstFilteredDisplay.push({ label: "Unallocated", value: "U" })
    }

    async getAllocateCarts() {
        this.growlMessage = [];
        this.showGrid = false;
        this.spinnerService.start();
        let isChecked: boolean = false;

        if (this.blnShowOrgGroupLabel == true) {
            this.orgGroupIDForDBUpdate = this.orgGrpId.split("-")[0];
        }
        else {
            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            if (this.selectedOrgGroupId == "" || this.selectedOrgGroupId == "Select One" || this.selectedOrgGroupId == undefined) {
                this.showGrid = false;
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID." });
                this.spinnerService.stop();
                return false;
            }
        }

        if (this.selectedBunit == "" || this.selectedBunit == "Select BUnit" || this.selectedBunit == undefined) {
            this.showGrid = false;
            this.growlMessage = [];
            this.growlMessage.push({
                severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Business Unit / Company"
            });
            this.spinnerService.stop();
            return false;
        }

        try {
            await this.cartTwoBinService.getCartDetails(this.selectedBunit, this.selectedParlocation).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_CRCT_TWO_BIN_ALLOCATION>;
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            if (data.DataList.length > 0) {
                                this.showGrid = true;
                                this.lstDBData = [];
                                this.lstDBData = data.DataList;
                                this.BindDataGrid();
                                this.dataCheckedSorting = [];
                                this.dataUncheckedSorting = [];
                                for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                                    this.lstDBData[i].Sno = i + 1;
                                    if (this.lstDBData[i].TWO_BIN_ALLOCATION == 'TRUE') {
                                        this.lstDBData[i].checkvalue = true;
                                        this.lstDBData[i].TWO_BIN_ALLOCATION = 'Y';
                                        this.dataCheckedSorting.push(this.lstDBData[i]);
                                    }
                                    else {
                                        this.lstDBData[i].checkvalue = false;
                                        this.lstDBData[i].TWO_BIN_ALLOCATION = 'N';
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
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
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
            this.showGrid = false;
            this.clientErrorMsg(ex, "getAllocateCarts");
        }
    }

    selectedRow(ven: MT_CRCT_TWO_BIN_ALLOCATION, event) {
        try {
            if (event == true) {
                for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                    if (this.lstDBData[i].Sno == ven.Sno) {
                        this.lstDBData[i].CHK_VALUE = 1;
                        this.lstDBData[i].TWO_BIN_ALLOCATION = "Y";
                    }
                }
            }
            else {
                for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                    if (this.lstDBData[i].Sno == ven.Sno) {
                        this.lstDBData[i].CHK_VALUE = 0;
                        this.lstDBData[i].TWO_BIN_ALLOCATION = "N";
                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "selectedRow");
        }
    }

    async   allocateTwoBinLocData() {
        try {
            this.spinnerService.start();
            if (this.selectedBunit == "" || this.selectedBunit == "Select BUnit" || this.selectedBunit == undefined) {
                this.growlMessage = [];
                this.spinnerService.stop();
                this.growlMessage.push({
                    severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select valid Business Unit/Company"
                });
                return;
            }
            for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                if (this.lstDBData[i].TWO_BIN_ALLOCATION == 'Y') {
                    if (this.lstDBData[i].DEF_PERCENTAGE_VALUE === "" || this.lstDBData[i].DEF_PERCENTAGE_VALUE == null || this.lstDBData[i].DEF_PERCENTAGE_VALUE == undefined) {
                        this.spinnerService.stop();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Default percent values is mandatory when 2 Bin Location is checked." });
                        return;
                    }
                }
            }
            for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                if (this.lstDBData[i].checkvalue) {
                    this.lstDBData[i].CHK_ALLOCATED = 1;
                    this.lstDBData[i].TWO_BIN_ALLOCATION = "Y";
                }
                else {
                    this.lstDBData[i].CHK_ALLOCATED = 0;
                    this.lstDBData[i].TWO_BIN_ALLOCATION = "N";
                    this.lstDBData[i].DEF_PERCENTAGE_VALUE = "";
                }
            }

            await this.cartTwoBinService.TwoBinSaving(this.lstDBMainDetails, this.selectedBunit).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_CRCT_TWO_BIN_ALLOCATION>;
                    this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Updated Successfully' });
                            this.selectedBunit = "";
                            this.showGrid = false;
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            this.showGrid = false;
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            this.showGrid = false;
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            this.showGrid = false;
                            this.spinnerService.stop();
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "allocateTwoBinLocData");
            this.showGrid = false;
        }
    }

    BindDataGrid() {
        var lstDBDataList;
        this.lstDBMainDetails = [];

        try {
            for (let k = 0; k < this.lstDBData.length; k++) {
                this.lstDBMainDetails.push(this.lstDBData[k]);
            }

            if (this.selectedDropDownDisplay === "L") {
                this.showGrid = true;
                this.lstDBData = this.lstDBData.filter(x => x.TWO_BIN_ALLOCATION == 'TRUE');
                if (this.lstDBData.length == 0) {
                    this.showGrid = false;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                    return;
                }
            }
            else if (this.selectedDropDownDisplay === "U") {
                this.showGrid = false;
                this.lstDBData = this.lstDBData.filter(x => x.TWO_BIN_ALLOCATION == 'FALSE');
                if (this.lstDBData.length == 0) {
                    this.showGrid = false;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                    return;
                }
            }
            else {
              
                this.showGrid = false;
            }

            if (this.selectedParlocation != undefined && this.selectedParlocation != null && this.selectedParlocation.trim().length != 0) {
                this.lstDBData = this.lstDBData.filter(x => x.CART_ID.indexOf(this.selectedParlocation.toUpperCase()) !== -1)
                if (this.lstDBData.length == 0) {
                    this.showGrid = false;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                    return;

                }
            }
            this.showGrid = true;
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindDataGrid");
        }
    }


    customSort(event) {
        var element = event;
        this.lstDBData = [];
        try {
            if (this.previousFiled == element.field) {
                this.blnsortbycolumn = !this.blnsortbycolumn;
            } else {

                this.blnsortbycolumn = false;
            }
            this.previousFiled = element.field;
            this.sortedcheckedrec = [];
            this.sorteduncheckedrec = [];
            this.sortedcheckedrec = this.dataCheckedSorting.sort(function (a, b) {

                if (a[element.field] < b[element.field])
                    return -1;
                if (a[element.field] > b[element.field])
                    return 1;
                return 0;
            });

            if (element.field != "DEF_PERCENTAGE_VALUE") {
                this.sorteduncheckedrec = this.dataUncheckedSorting.sort(function (a, b) {
                    if (a[element.field] < b[element.field])
                        return -1;
                    if (a[element.field] > b[element.field])
                        return 1;
                    return 0;
                });
                if (this.blnsortbycolumn == false) {
                    this.sorteduncheckedrec = this.sorteduncheckedrec.reverse();
                }
            } else {
                this.sorteduncheckedrec = this.dataUncheckedSorting;
            }
            if (this.blnsortbycolumn == false) {
                this.lstDBData = [];
                this.lstDBData = this.sortedcheckedrec.reverse().concat(this.sorteduncheckedrec);
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

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    ngOnDestroy() {
        this.deviceTokenEntry = null;
        this.lstOrgGroups = null;
        this.lstFilteredBUnits = null;
        this.lstOrgGroups = null;
        this.lstFilteredDisplay = null;
        this.lstFilteredBUnits = null;
        this.lstDBData = null;
        this.orgGroupData = null;
        this.growlMessage = null;
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
        this.dataCheckedSorting = [];
        this.dataUncheckedSorting = [];
        this.lstDBMainDetails = [];
        this.orgGroupData = null;

    }

}