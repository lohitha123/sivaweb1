import { Component } from '@angular/core';
import { datatableservice } from '../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { VM_ATPAR_IBU_ALLOCATION } from '../../app/Entities/VM_ATPAR_IBU_ALLOCATION';
import { HttpService } from '../Shared/HttpService';
import { AtParConstants } from '../Shared/AtParConstants';
import { AtparStatusCodes, } from '../Shared/AtParStatusCodes';
import { Http, Response } from '@angular/http';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { Message, SelectItem } from './../components/common/api';
import { MT_ATPAR_USER } from '../entities/mt_atpar_user';
import { MT_ATPAR_ORG_GROUPS } from '../entities/mt_atpar_org_groups';
import { TokenEntry_Enum, EnumApps, ModeEnum, YesNo_Enum, StatusType, BusinessType, AppParameters_Enum } from '../Shared/AtParEnums'
import { MT_ATPAR_ORG_GROUP_BUNITS } from '../../app/Entities/MT_ATPAR_ORG_GROUP_BUNITS';

declare var module: {
    id: string;
}
@Component({
    templateUrl: 'cyct-allocate-ibus-maunal-counts.component.html',
    providers: [datatableservice, HttpService, AtParConstants, AtParCommonService]
})

export class AllocateIBUsManualCountsComponent {
    isVisible: boolean = false;
    deviceTokenEntry: string[] = [];
    growlMessage: Message[] = [];
    orgGroupData: MT_ATPAR_ORG_GROUPS[];
    lstUserData: MT_ATPAR_USER[];
    blnShowOrgGroupLabel: boolean;
    blnStatusMsg: boolean
    blnShowOrgGroupID: boolean;
    lstOrgGroups: SelectItem[] = [];
    ddlUserID: SelectItem[] = [];
    lblOrgGrpID: string;
    orgGrpID: string;
    selectedOrgGroupID: string = "";
    searched: boolean;
    selectedUserID: string;
    selectedDescription: string = "";
    lstFilteredBUnits: any = [];
    lstDBData: VM_ATPAR_IBU_ALLOCATION[];
    allocateDBData: VM_ATPAR_IBU_ALLOCATION[];
    lstgridfilterData: VM_ATPAR_IBU_ALLOCATION[];
    lstBUnits: string[] = [];
    selectedBunit: string = "";
    orgGroupIDForDBUpdate: string;
    startIndex: number;
    EndIndex: number;
    pageSize: number;
    blnsortbycolumn: boolean = false;
    showGrid: boolean = false;
    preField: string = "";
    lstCheckedBUnits: Array<VM_ATPAR_IBU_ALLOCATION>;
    dataCheckedSorting: VM_ATPAR_IBU_ALLOCATION[] = [];
    dataUncheckedSorting: Array<VM_ATPAR_IBU_ALLOCATION>;

    constructor(public datatableservice: datatableservice,
        public commonService: AtParCommonService,
        public httpService: HttpService,
        private atParConstant: AtParConstants,
        public spinnerService: SpinnerService, )
    { }

    async  ngOnInit() {
        try {
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
            this.lstCheckedBUnits = new Array<VM_ATPAR_IBU_ALLOCATION>();
            this.dataCheckedSorting = new Array<VM_ATPAR_IBU_ALLOCATION>();
            this.dataUncheckedSorting = new Array<VM_ATPAR_IBU_ALLOCATION>();
            this.lstFilteredBUnits = new Array<VM_ATPAR_IBU_ALLOCATION>();
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.pageSize = +this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
            await this.bindOrgGroups();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    }

    async bindOrgGroups() {
        try {
            this.growlMessage = [];
            this.spinnerService.start();
            await this.commonService.getUserOrgGroups(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    let orgGroups = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>;
                    this.spinnerService.stop()
                    switch (orgGroups.StatType) {
                        case StatusType.Success: {
                            this.ddlUserID.push({ label: "Select User", value: "Select User" });
                            this.orgGroupData = orgGroups.DataList;
                            if (this.orgGroupData.length == 1) {
                                this.blnShowOrgGroupLabel = true;
                                this.lblOrgGrpID = this.orgGroupData[0].ORG_GROUP_ID + " - " + this.orgGroupData[0].ORG_GROUP_NAME;
                                this.orgGrpID = this.orgGroupData[0].ORG_GROUP_ID;
                            }
                            else if (this.orgGroupData.length > 1) {
                                this.blnShowOrgGroupID = true;
                                this.lstOrgGroups.push({ label: "Select One", value: "Select One" })
                                for (var i = 0; i < this.orgGroupData.length; i++) {
                                    if (this.orgGroupData[i].ORG_GROUP_ID != "All") {
                                        this.lstOrgGroups.push({ label: this.orgGroupData[i].ORG_GROUP_ID + " - " + this.orgGroupData[i].ORG_GROUP_NAME, value: this.orgGroupData[i].ORG_GROUP_ID })
                                    }
                                }
                            }
                            if (this.blnShowOrgGroupLabel) {
                                this.populateUsersDropDown();
                                this.populateBunitsDdlst();
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
        catch (exMsg) {
            this.spinnerService.stop();
            this.clientErrorMsg(exMsg,"bindOrgGroups");
        }
    }

    async  ddlOrgGrpIdChanged() {
        this.isVisible = false;
        this.growlMessage = [];
        if (this.selectedOrgGroupID == "Select One") {
            this.ddlUserID = [];
            this.ddlUserID.push({ label: "Select User", value: "Select User" });
            return;
        }
        this.selectedUserID = "";
        this.spinnerService.start();
        try {
            await this.populateUsersDropDown();
            await this.populateBunitsDdlst();
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ddlOrgGrpIdChanged");
        }
    }

    async populateBunitsDdlst(): Promise<boolean> {
        let isOrgBUnitsExist: boolean = false;
        try {
            if (this.blnShowOrgGroupLabel == true) {
                this.orgGroupIDForDBUpdate = this.orgGrpID;
            }
            else {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupID;
            }
            this.spinnerService.start();
            if ((this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == undefined || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select One") && this.blnShowOrgGroupID) {
                this.growlMessage = [];
                this.spinnerService.stop();
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select OrgGroupID" });
                return;
            }
            await this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, BusinessType.Inventory).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<string>;
                    this.growlMessage = [];
                    this.lstBUnits = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.lstBUnits = data.DataList;
                            isOrgBUnitsExist = true;
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Custom: {
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
            this.clientErrorMsg(ex, "populateBunitsDdlst");
        }
    }

    async populateUsersDropDown() {
        try {
            this.ddlUserID = [];
            this.selectedUserID = "";
            if (this.blnShowOrgGroupLabel) {
                this.orgGroupIDForDBUpdate = this.orgGrpID;
            }
            if (this.blnShowOrgGroupID) {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupID;
            }
            this.spinnerService.start();
            await this.commonService.getUsersList(this.deviceTokenEntry[TokenEntry_Enum.UserID], EnumApps.CycleCount, this.orgGroupIDForDBUpdate)
                .catch(this.httpService.handleError).then((res: Response) => {
                    let webresp = res.json() as AtParWebApiResponse<MT_ATPAR_USER>
                    this.spinnerService.stop();
                    this.ddlUserID.push({ label: "Select User", value: "Select User" });
                    switch (webresp.StatType) {
                        case StatusType.Success: {
                            this.lstUserData = webresp.DataList;
                            if (this.lstUserData.length > 0) {
                                for (var i = 0; i < this.lstUserData.length; i++) {
                                    this.ddlUserID.push({ label: this.lstUserData[i].FULLNAME, value: this.lstUserData[i].USER_ID })
                                }
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
        catch (exMsg) {
            this.clientErrorMsg(exMsg, "populateUsersDropDown");
        }
    }

    async fillBUnitsAuto(event) {
        this.lstFilteredBUnits = [];
        let query = event.query;
        if (this.blnShowOrgGroupLabel == true) {
            this.orgGroupIDForDBUpdate = this.orgGrpID;
        }
        else {
            this.orgGroupIDForDBUpdate = this.selectedOrgGroupID;
        }
        if (this.orgGroupIDForDBUpdate == undefined || this.orgGroupIDForDBUpdate == "Select One") {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select OrgGroupID" });
            return;
        }
        try {
            await this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, BusinessType.Inventory).
                catch(this.httpService.handleError).then((res: Response) => {
                    this.spinnerService.stop();
                    let data = res.json() as AtParWebApiResponse<string>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.lstBUnits = data.DataList;
                            this.lstFilteredBUnits = this.filterBusinessUnits(query, this.lstBUnits);
                            break;
                        }
                        case StatusType.Warn: {
                            if (data.StatusCode != AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS) {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            }
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
            this.clientErrorMsg(ex, "fillBUnitsAuto");
        }
    }

    filterBusinessUnits(query, businessunits: any[]): any[] {

        let filtered : any[] = [];

        if (query == "%") {
            for (let i = 0; i < businessunits.length; i++) {
                let Bunitvalue = businessunits[i];
                filtered.push(Bunitvalue);
            }

        } else {
            if (query.length >= 1) {
                for (let i = 0; i < businessunits.length; i++) {
                    let Bunitvalue = businessunits[i];
                    if (Bunitvalue.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        filtered.push(Bunitvalue);
                    }
                }
            }
        }
        return filtered;
    }

    checkAll() {
        try {
            this.lstCheckedBUnits = [];
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.EndIndex = + sessionStorage.getItem("RecordsEndindex");

            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined && this.lstgridfilterData.length > 0) {

                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }

                for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstgridfilterData[i].checkvalue = true;
                    this.lstgridfilterData[i].CHK_VALUE = 1;
                    this.lstCheckedBUnits.push(this.lstgridfilterData[i]);
                }
            }
            else {
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }
                for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                    this.lstDBData[i].checkvalue = true;
                    this.lstDBData[i].CHK_VALUE = 1;
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

            if (this.lstgridfilterData != null && this.lstgridfilterData != undefined && this.lstgridfilterData.length > 0) {
                if (this.EndIndex > this.lstgridfilterData.length) {
                    this.EndIndex = this.lstgridfilterData.length;
                }
                for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstgridfilterData[i].checkvalue = false;
                    this.lstgridfilterData[i].CHK_VALUE = 0;
                    this.lstCheckedBUnits.push(this.lstgridfilterData[i]);
                }
            }
            else {
                if (this.EndIndex > this.lstDBData.length) {
                    this.EndIndex = this.lstDBData.length;
                }
                for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {
                    this.lstDBData[i].checkvalue = false;
                    this.lstDBData[i].CHK_VALUE = 0;
                    this.lstCheckedBUnits.push(this.lstDBData[i]);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "unCheckAll");
        }
    }

    filterdata(event) {
        this.lstgridfilterData = [];
        this.lstgridfilterData = new Array<VM_ATPAR_IBU_ALLOCATION>();
        this.lstgridfilterData = event;
    }

    //customSort1(event) {
    //    try {
    //        var element = event;
    //        this.lstDBData = [];
    //        this.blnsortbycolumn = !this.blnsortbycolumn;

    //        let sortedcheckedrec = [];
    //        let sorteduncheckedrec = [];

    //        sortedcheckedrec = this.dataCheckedSorting.sort(function (a, b) {
    //            if (a[element.field] < b[element.field])
    //                return -1;
    //            if (a[element.field] > b[element.field])
    //                return 1;
    //            return 0;
    //        });
    //        sorteduncheckedrec = this.dataUncheckedSorting.sort(function (a, b) {
    //            if (a[element.field] < b[element.field])
    //                return -1;
    //            if (a[element.field] > b[element.field])
    //                return 1;
    //            return 0;
    //        });
    //        if (this.blnsortbycolumn == false) {
    //            this.lstDBData = [];
    //            this.lstDBData = sortedcheckedrec.reverse().concat(sorteduncheckedrec.reverse());
    //        }
    //        else {
    //            this.lstDBData = [];
    //            this.lstDBData = sortedcheckedrec.concat(sorteduncheckedrec);
    //        }
    //        sortedcheckedrec = [];
    //        sorteduncheckedrec = [];
    //    }
    //    catch (ex) {
    //        this.clientErrorMsg(ex, "customSort");
    //    }
    //}

    customSort(event, field) {
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
       let dataChecked = [];
         let dataUnchecked= [];
        let result = null;
        let order: boolean;

        try {
            dataChecked = this.dataCheckedSorting.sort(function (a, b) {
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

            dataUnchecked = this.dataUncheckedSorting.sort(function (a, b) {
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
        this.lstDBData = this.dataCheckedSorting.concat(this.dataUncheckedSorting);
        dataChecked  = [];
        dataUnchecked = [];
    }

    async getAllBUnits() {
        this.lstgridfilterData = null;
        this.isVisible = false;
        try {
            if (this.blnShowOrgGroupLabel == true) {
                this.orgGroupIDForDBUpdate = this.orgGrpID;
            }
            else {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupID;
            }
            if ((this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == undefined || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select One") && this.blnShowOrgGroupID) {
                this.growlMessage = [];
                this.spinnerService.stop();
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                return;
            }
            if (this.selectedUserID === "Select User" || this.selectedUserID === "undefined" || this.selectedUserID == "") {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please select valid User ID' });
                this.showGrid = false;
                return false;
            }
            this.lstDBData = new Array<VM_ATPAR_IBU_ALLOCATION>();
            let isBUnitsExists = await this.populateBunitsDdlst();
            if (isBUnitsExists == true) {
                this.spinnerService.start();
                this.commonService.getBUs(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.lstBUnits, EnumApps.CycleCount, this.selectedUserID, this.selectedBunit, this.selectedDescription)
                    .catch(this.httpService.handleError).then((res: Response) => {
                        let response = res.json() as AtParWebApiResponse<VM_ATPAR_IBU_ALLOCATION>;
                        this.spinnerService.stop()
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
                                break;
                            }
                            case StatusType.Warn: {
                                this.isVisible = false;
                                this.spinnerService.stop();
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                break;
                            }
                            case StatusType.Error: {
                                this.isVisible = false;
                                this.spinnerService.stop();
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                break;
                            }
                            case StatusType.Custom: {
                                this.isVisible = false;
                                this.spinnerService.stop();
                                this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                break;
                            }
                        }
                    });
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getAllBUnits");
        }

    }

    BindDataGrid() {
        try {
            var lstDBDataList;
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
            this.showGrid = true;
            this.isVisible = true;
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindDataGrid");
        }
    }

    allocateBUnits() {
        try {
            if ((this.selectedBunit != null && this.selectedBunit != undefined && this.selectedBunit != "") || (this.selectedDescription != null && this.selectedDescription != undefined && this.selectedDescription != "")) {
                this.searched = true;
            }
            else {
                this.searched = false;
            }
            this.allocateDBData = new Array<VM_ATPAR_IBU_ALLOCATION>();
            this.spinnerService.start();
            for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                if (this.lstDBData[i].checkvalue == true) {
                    this.lstDBData[i].CHK_ALLOCATED = 1;
                    this.lstDBData[i].CHK_VALUE = 1;
                }
                else {
                    this.lstDBData[i].CHK_ALLOCATED = 0;
                    this.lstDBData[i].CHK_VALUE = 0;
                }
            }
            this.allocateDBData = this.lstDBData;
            if (!this.searched) {
                this.allocateDBData = this.lstDBData.filter(obj => obj.CHK_VALUE == 1);
            }
            this.commonService.allocateBUnits(EnumApps.CycleCount, this.selectedUserID, this.deviceTokenEntry[TokenEntry_Enum.UserID], this.allocateDBData, this.searched)
                .catch(this.httpService.handleError).then((res: Response) => {
                    let response = res.json() as AtParWebApiResponse<VM_ATPAR_IBU_ALLOCATION>;

                    this.growlMessage = [];
                    switch (response.StatType) {
                        case StatusType.Success: {
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Updated Successfully' });
                            if (this.blnShowOrgGroupID) {
                                this.ddlUserID = [];
                                this.ddlUserID.push({ label: "Select User", value: "Select User" })
                            }
                            this.selectedUserID = "";
                            this.selectedOrgGroupID = "";
                            this.selectedDescription = "";
                            this.selectedBunit = "";
                            this.isVisible = false;
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
                            this.showGrid = false;
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "allocateBUnits");
        }
    }

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    ngOnDestroy() {
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.lstFilteredBUnits = [];
        this.ddlUserID = [];
        this.lstBUnits = [];
        this.lstOrgGroups = [];
        this.lstCheckedBUnits = [];
        this.lstDBData = [];
        this.growlMessage = [];
        this.deviceTokenEntry = [];
        this.lstgridfilterData = [];
        this.allocateDBData = [];
        this.dataCheckedSorting = [];
        this.dataUncheckedSorting = [];
        this.orgGroupData = [];
        this.spinnerService.stop();
    }
}