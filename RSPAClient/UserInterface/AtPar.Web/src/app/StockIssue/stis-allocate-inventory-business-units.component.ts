import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Http, Response } from "@angular/http";
import { MT_ATPAR_ORG_GROUPS } from '../../app/Entities/MT_ATPAR_ORG_GROUPS';
import { VM_ATPAR_IBU_ALLOCATION } from '../../app/Entities/VM_ATPAR_IBU_ALLOCATION';
import { MT_ATPAR_IBU_ALLOCATION } from '../../app/Entities/MT_ATPAR_IBU_ALLOCATION';
import { MT_ATPAR_ORG_GROUP_BUNITS } from '../../app/Entities/MT_ATPAR_ORG_GROUP_BUNITS';
import { MT_ATPAR_SECURITY_AUDIT } from '../../app/Entities/MT_ATPAR_SECURITY_AUDIT';
import { MT_ATPAR_USER } from '../../app/Entities/mt_atpar_user';
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { SelectItem } from '../components/common/api';
import { ConfirmationService } from '../components/common/api';
import { TokenEntry_Enum, EnumApps, ClientType } from '../Shared/AtParEnums';
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
    templateUrl: 'stis-allocate-inventory-business-units.component.html',
    providers: [HttpService, ConfirmationService, AtParCommonService, AtParConstants]
})

export class SIAllocateInventoryBusinessUnitsComponent implements OnInit {

    lstBUnits: any = [];
    lstDBData: VM_ATPAR_IBU_ALLOCATION[];
    lstgridfilterData: VM_ATPAR_IBU_ALLOCATION[];
    deviceTokenEntry: string[] = [];
    lstUsers: SelectItem[];
    lstOrgGroups: SelectItem[];
    lstCheckedBUnits: Array<VM_ATPAR_IBU_ALLOCATION>;
    userDataList: MT_ATPAR_USER[];

    dataCheckedSorting: VM_ATPAR_IBU_ALLOCATION[] = [];
    dataUncheckedSorting: Array<VM_ATPAR_IBU_ALLOCATION>;
    sortedcheckedrec: VM_ATPAR_IBU_ALLOCATION[];
    sorteduncheckedrec: VM_ATPAR_IBU_ALLOCATION[];
    orgGroupData: MT_ATPAR_ORG_GROUPS[];

    orgGrpID: string = "";
    orgGrpIDData: string = "";
    userID: string = "";

    startIndex: number;
    EndIndex: number;

    ////for orgGrpDropdown
    blnShowOrgGroupLabel: boolean = false;
    blnShowOrgGroupDD: boolean = false;

    ////for userID DropDown
    blnShowUserIDLabel: boolean = false;
    blnShowUserIDDD: boolean = false;

    selectedOrgGroupId: string = "";
    selectedDropDownUserId: string = "";
    selectedBunit: string = "";
    selectedDescription: string = "";

    isVisible: boolean = false;
    growlMessage: Message[] = [];

    ///bunits 
    lstFilteredBUnits: any = [];
    orgGroupIDForDBUpdate: string;
    showGrid: boolean = false;

    blnsortbycolumn: boolean = true;
    preField: string = "";
    custom: string = "custom";
    pazeSize: number;
    isAuditRequired: string = "";
    strAudit: string = "";

    constructor(private httpService: HttpService, private _http: Http,
        private spinnerService: SpinnerService,
        public atParCommonService: AtParCommonService,
        private atParConstant: AtParConstants,
    ) {

    }


    ngOnInit(): void {

        this.startIndex = + sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
        this.lstCheckedBUnits = new Array<VM_ATPAR_IBU_ALLOCATION>();
        this.dataCheckedSorting = new Array<VM_ATPAR_IBU_ALLOCATION>();
        this.dataUncheckedSorting = new Array<VM_ATPAR_IBU_ALLOCATION>();
        this.lstFilteredBUnits = new Array<VM_ATPAR_IBU_ALLOCATION>();
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));


        // checking is Audit enabled for this page
        this.checkAuditAllowed();
        this.bindOrgGroups();

        this.pazeSize = +this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
    }

    async bindOrgGroups() {

        this.spinnerService.start();
        try {
            await this.atParCommonService.getUserOrgGroups(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>;
                    this.growlMessage = [];

                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.orgGroupData = data.DataList;
                            this.spinnerService.stop();
                            if (this.orgGroupData.length == 1) {

                                this.blnShowOrgGroupLabel = true;
                                this.orgGrpIDData = this.orgGroupData[0].ORG_GROUP_ID + " - " + this.orgGroupData[0].ORG_GROUP_NAME;
                                this.orgGrpID = this.orgGroupData[0].ORG_GROUP_ID;

                                this.populateBusinessUnits();
                                this.bindUsersList();
                                break;

                            }
                            else if (this.orgGroupData.length > 1) {
                                this.blnShowOrgGroupDD = true;
                                this.lstUsers = [];
                                this.lstUsers.push({ label: "Select User", value: "Select User" })
                                this.lstOrgGroups = [];
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

    async ddlOrgGrpIdChanged() {

        this.isVisible = false;
        this.growlMessage = [];

        if (this.selectedOrgGroupId == "Select One") {
            this.lstUsers = [];
            this.lstUsers.push({ label: "Select User", value: "Select User" });
            return;
        }

        this.selectedDropDownUserId = "";

        this.lstDBData = new Array<VM_ATPAR_IBU_ALLOCATION>();
        this.spinnerService.start();

        try {

            await this.bindUsersList();

            await this.populateBusinessUnits();

            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ddlOrgGrpIdChanged");
        }

    }

    ddlUserChange() {
        this.isVisible = false;
    }

    async bindUsersList() {
        try {
            if (this.blnShowOrgGroupLabel == true) {
                this.orgGroupIDForDBUpdate = this.orgGrpID;
            }
            else {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            }

            this.lstUsers = [];
            this.lstUsers.push({ label: "Select User", value: "Select User" });
            this.spinnerService.start();

            await this.atParCommonService.getUsersList(this.deviceTokenEntry[TokenEntry_Enum.UserID],EnumApps.StockIssue, this.orgGroupIDForDBUpdate)
                .catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_USER>;             

                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.userDataList = data.DataList;
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
                            this.growlMessage = [];
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage = [];
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

    selectedRow(values: any, event) {

        if (event == true) {
            values.CHK_VALUE = 1;
        }
        else {
            values.CHK_VALUE = 0;
            values.COUNT_FLAG = 0;
            values.ALLOW_SIC_CONSIGN = "N";
            values.blnCountFlag = 0;
            values.blnAllowSicConsign = 0;
        }

        for (var i = 0; i < this.lstCheckedBUnits.length; i++) {
            if (this.lstCheckedBUnits[i].BUSINESS_UNIT === values.BUSINESS_UNIT) {
                var index = this.lstCheckedBUnits.indexOf(this.lstCheckedBUnits[i], 0)
                this.lstCheckedBUnits.splice(index, 1);
            }
        }

        this.lstCheckedBUnits.push(values);
    }

    checkedCountFlag(values: any, event) {

        if (event == true) {
            values.CHK_VALUE = 1;
            values.COUNT_FLAG = "1";
            values.checkvalue = 1;

        }
        else {
            values.COUNT_FLAG = "0";
            values.ALLOW_SIC_CONSIGN = "N";
            values.blnAllowSicConsign = 0;
            values.blnCountFlag = 0;
        }

        for (var i = 0; i < this.lstCheckedBUnits.length; i++) {
            if (this.lstCheckedBUnits[i].BUSINESS_UNIT === values.BUSINESS_UNIT) {
                var index = this.lstCheckedBUnits.indexOf(this.lstCheckedBUnits[i], 0)
                this.lstCheckedBUnits.splice(index, 1);
            }
        }

        this.lstCheckedBUnits.push(values);
    }

    checkedConsignFlag(values: any, event) {

        if (event == true) {
            values.CHK_VALUE = 1;
            values.COUNT_FLAG = 1;
            values.ALLOW_SIC_CONSIGN = "Y";
            values.checkvalue = 1;
            values.blnCountFlag = 1;

        }
        else {
            values.ALLOW_SIC_CONSIGN = "N";
        }

        for (var i = 0; i < this.lstCheckedBUnits.length; i++) {
            if (this.lstCheckedBUnits[i].BUSINESS_UNIT === values.BUSINESS_UNIT) {
                var index = this.lstCheckedBUnits.indexOf(this.lstCheckedBUnits[i], 0)
                this.lstCheckedBUnits.splice(index, 1);
            }
        }

        this.lstCheckedBUnits.push(values);
    }

    async populateBusinessUnits(): Promise<boolean> {

        if (this.blnShowOrgGroupLabel == true) {
            this.orgGroupIDForDBUpdate = this.orgGrpID;
        }
        else {
            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
        }

        let isOrgBUnitsExist: boolean = false;
        this.spinnerService.start();

        if ((this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == undefined || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select One") && this.blnShowOrgGroupDD) {
            this.growlMessage = [];
            this.spinnerService.stop();
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select OrgGroupID" });
            return;
        }


        try {
            await this.atParCommonService.getOrgBusinessUnits( this.orgGroupIDForDBUpdate, BusinessType.Inventory).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUP_BUNITS>;
                    this.growlMessage = [];
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.spinnerService.stop();
                            this.lstFilteredBUnits = data.DataList;
                            isOrgBUnitsExist = true;
                            break;
                        }
                        case StatusType.Warn: {
                            this.showGrid = false;
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;                       
                            break;
                        }
                        case StatusType.Error: {
                            this.showGrid = false;
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            break;
                        }
                        case StatusType.Custom: {
                            this.showGrid = false;
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
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

    checkAll() {
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

    unCheckAll() {
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

                this.lstgridfilterData[i].blnCountFlag = false;
                this.lstgridfilterData[i].COUNT_FLAG == "0";

                this.lstgridfilterData[i].blnAllowSicConsign = false;
                this.lstgridfilterData[i].ALLOW_SIC_CONSIGN == "N";


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

                this.lstDBData[i].blnCountFlag = false;
                this.lstDBData[i].COUNT_FLAG == "0";

                this.lstDBData[i].blnAllowSicConsign = false;
                this.lstDBData[i].ALLOW_SIC_CONSIGN == "N";


                this.lstCheckedBUnits.push(this.lstDBData[i]);
            }
        }


    }

    BindDataGrid() {

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

    //        this.sortedcheckedrec = [];
    //        this.sorteduncheckedrec = [];

    //        this.sortedcheckedrec = this.dataCheckedSorting.sort(function (a, b) {

    //            if (a[element.field] < b[element.field])
    //                return -1;
    //            if (a[element.field] > b[element.field])
    //                return 1;
    //            return 0;


    //        });
    //        this.sorteduncheckedrec = this.dataUncheckedSorting.sort(function (a, b) {

    //            if (a[element.field] < b[element.field])
    //                return -1;
    //            if (a[element.field] > b[element.field])
    //                return 1;
    //            return 0;


    //        });
    //        if (this.blnsortbycolumn == false) {
    //            this.lstDBData = [];
    //            this.lstDBData = this.sortedcheckedrec.reverse().concat(this.sorteduncheckedrec.reverse());
    //        }
    //        else {
    //            this.lstDBData = [];

    //            this.lstDBData = this.sortedcheckedrec.concat(this.sorteduncheckedrec);
    //        }

    //        this.sortedcheckedrec = [];
    //        this.sorteduncheckedrec = [];
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
            // element.order = !element.order;

        } else {
            element.order = 1;
        }
        this.preField = element.field;
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
        let result = null;
        let order: boolean;

        try {
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
        }
        catch (ex) {
            this.clientErrorMsg(ex, "customSort");
        }

        this.lstDBData = [];
        this.lstDBData = this.sortedcheckedrec.concat(this.sorteduncheckedrec);
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
    }
    async fillBUnitsAuto(event) {

        this.lstFilteredBUnits = [];


        let query = event.query;
        if (this.blnShowOrgGroupLabel == true) {
            this.orgGroupIDForDBUpdate = this.orgGrpID;

        }
        else {
            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
        }

        if (this.orgGroupIDForDBUpdate == undefined || this.orgGroupIDForDBUpdate == "Select One") {

            this.growlMessage = [];

            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select OrgGroupID" });
            return;
        }
        try {
            await this.atParCommonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, BusinessType.Inventory).
                catch(this.httpService.handleError).then((res: Response) => {
                    this.spinnerService.stop();
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUP_BUNITS>;
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
        try {
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
        catch (ex) {
            this.clientErrorMsg(ex, "filterBusinessUnits");
        }
    }

    async getAllBUnits() {

        this.lstgridfilterData = null;
        this.isVisible = false;
        try {

            if (this.blnShowOrgGroupLabel == true) {
                this.orgGroupIDForDBUpdate = this.orgGrpID;
            }
            else {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            }

            if ((this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == undefined || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select One") && this.blnShowOrgGroupDD) {

                this.growlMessage = [];
                this.spinnerService.stop();
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                return;
            }

            if (this.selectedDropDownUserId === "Select User" || this.selectedDropDownUserId === "undefined" || this.selectedDropDownUserId == "") {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please select valid User ID' });

                this.showGrid = false;
                return false;
            }

            this.lstDBData = new Array<VM_ATPAR_IBU_ALLOCATION>();

            let isBUnitsExists = await this.populateBusinessUnits();

            if (isBUnitsExists == true) {
                this.spinnerService.start();

                this.httpService.getSync({
                    "apiMethod": "/api/SIAllocBU/GetBUnits",
                    params: {
                        "bArray": this.lstFilteredBUnits,
                        "appId": "10",
                        "userID": this.selectedDropDownUserId,
                        "bUnit": this.selectedBunit,
                        "description": this.selectedDescription,
                        "serverUserID": this.deviceTokenEntry[TokenEntry_Enum.UserID]
                        
                    }
                }).catch(this.httpService.handleError)
                    .then((response: Response) => {
                        let data = response.json();
                        this.spinnerService.stop();
                        switch (data.StatType) {
                            case StatusType.Success: {


                                this.lstDBData = [];
                                this.lstDBData = data.DataList;

                                for (let i = 0; i <= data.DataList.length - 1; i++) {
                                    if (data.DataList[i].CHK_ALLOCATED == 1) {
                                        data.DataList[i].checkvalue = true;
                                    }
                                    else {
                                        data.DataList[i].checkvalue = false;
                                    }

                                    if (data.DataList[i].COUNT_FLAG == "1") {
                                        data.DataList[i].blnCountFlag = true;
                                    }
                                    else {
                                        data.DataList[i].blnCountFlag = false;
                                    }

                                    if (data.DataList[i].ALLOW_SIC_CONSIGN == "Y") {
                                        data.DataList[i].blnAllowSicConsign = true;
                                    }
                                    else {
                                        data.DataList[i].blnAllowSicConsign = false;
                                    }
                                }

                                this.lstDBData = data.DataList;

                                this.BindDataGrid();
                                this.showGrid = true;
                                this.spinnerService.stop();
                                break;
                            }
                            case StatusType.Warn: {
                                this.spinnerService.stop();
                                this.showGrid = false;
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                break;
                            }
                            case StatusType.Error: {
                                this.spinnerService.stop();
                                this.showGrid = false;
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                break;
                            }
                            case StatusType.Custom: {
                                this.spinnerService.stop();
                                this.showGrid = false;
                                this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                break;
                            }
                        }
                    }

                    );

            }


        }
        catch (ex) {
            this.clientErrorMsg(ex, "getAllBUnits");
        }

    }

    async allocateBUnits() {
        this.growlMessage = [];  

        try {
            if (this.selectedDropDownUserId === "Select User" || this.selectedDropDownUserId === "undefined" || this.selectedDropDownUserId == "") {
                this.growlMessage = [];              
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please select valid User ID' });                
                return;
            }
            this.spinnerService.start();

            this.httpService.create({
                "apiMethod": "/api/SIAllocBU/AllocateBUnits",
                formData: this.lstDBData,
                params: {
                    "appId": "10",
                    "userID": this.selectedDropDownUserId,
                    "serverUserID": this.deviceTokenEntry[TokenEntry_Enum.UserID],
                    "bArray": this.lstFilteredBUnits,
                    "searched": true,
                    "bUnit": this.selectedBunit,
                    "description": this.selectedDescription
                    
                }
            }).catch(this.httpService.handleError).map((res: Response) => res.json() as AtParWebApiResponse<MT_ATPAR_IBU_ALLOCATION>).subscribe(
                (response) => {

                    this.growlMessage = [];
                    switch (response.StatType) {
                        case StatusType.Success: {                        
                            this.selectedDropDownUserId = "";                           
                            this.selectedDescription = "";
                            this.selectedBunit = "";
                            this.isVisible = false;

                            if (this.isAuditRequired == "Y") {
                                this.insertAuditData();
                                this.spinnerService.stop();
                            } else {
                                this.spinnerService.stop();
                            }

                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Updated Successfully' });
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
            this.clientErrorMsg(ex, "allocateBUnits");
        }

    }

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    } 

    async checkAuditAllowed() {
        try {

            await this.atParCommonService.getAuditAllowed(10, "mt_stis_inv_bunit_alloc.aspx").
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json();
                    this.growlMessage = [];

                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.isAuditRequired = data.Data;
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
            this.clientErrorMsg(ex, "checkAuditAllowed");
        }
    }

    async insertAuditData() {

        try {
            let auditSecurity: MT_ATPAR_SECURITY_AUDIT;
            let auditSecurityLst: Array<MT_ATPAR_SECURITY_AUDIT>;
            auditSecurityLst = new Array<MT_ATPAR_SECURITY_AUDIT>();

            for (let intCnount = 0; intCnount <= this.lstCheckedBUnits.length - 1; intCnount++) {

                if (this.lstCheckedBUnits[intCnount].CHK_VALUE == 1) {

                    auditSecurity = new MT_ATPAR_SECURITY_AUDIT();

                    auditSecurity.FIELD_NAME = "CHK_VALUE";
                    auditSecurity.OLD_VALUE = "0";
                    auditSecurity.NEW_VALUE = "1";
                    auditSecurity.KEY_1 = this.deviceTokenEntry[TokenEntry_Enum.UserID];
                    auditSecurity.KEY_2 = "10";
                    auditSecurity.KEY_3 = this.lstCheckedBUnits[intCnount].BUSINESS_UNIT;
                    auditSecurity.KEY_4 = "";
                    auditSecurity.KEY_5 = "";

                    auditSecurityLst.push(auditSecurity);

                }

            }


            let strScreenName = "mt_stis_inv_bunit_alloc.aspx";

            await this.atParCommonService.insertAuditData(auditSecurityLst, this.deviceTokenEntry[TokenEntry_Enum.UserID], strScreenName).
                catch(this.httpService.handleError).then((res: Response) => {
                    let response = res.json() as AtParWebApiResponse<MT_ATPAR_SECURITY_AUDIT>;


                    switch (response.StatType) {
                        case StatusType.Success: {


                            this.lstDBData = [];
                            break;
                        }
                        case StatusType.Warn: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            break;
                        }
                    }
                });
        } catch (ex){
            this.clientErrorMsg(ex, "insertAuditData");
        }

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
        this.orgGroupData = null;
        this.growlMessage = null;
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
    }

} 
