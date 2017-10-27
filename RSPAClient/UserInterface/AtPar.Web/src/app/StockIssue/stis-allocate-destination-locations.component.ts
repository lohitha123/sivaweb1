import { Component } from '@angular/core';
import { MT_ATPAR_USER } from '../../app/Entities/MT_ATPAR_USER';
import { MT_ATPAR_ORG_GROUPS } from '../../app/Entities/MT_ATPAR_ORG_GROUPS';
import { MT_ATPAR_ORG_GROUP_BUNITS } from '../../app/Entities/MT_ATPAR_ORG_GROUP_BUNITS';
import { MT_STIS_DEST_LOC_ALLOCATION } from '../../app/Entities/MT_STIS_DEST_LOC_ALLOCATION';
import { AllocateDestinationLocationsService } from '../../app/StockIssue/stis-allocate-destination-locations.services';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { Http, Response } from "@angular/http";
import { TokenEntry_Enum, ClientType, StatusType, BusinessType, EnumApps } from '../Shared/AtParEnums';
import { HttpService } from '../Shared/HttpService';
import { SelectItem, Message } from './../components/common/api';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { AtParConstants } from '../Shared/AtParConstants';
import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';

declare var module: {
    id: string;
}
@Component({

    templateUrl: 'stis-allocate-destination-locations.component.html',
    providers: [AllocateDestinationLocationsService, HttpService, AtParCommonService, AtParConstants]
})

export class AllocateDestinationLocationsComponent {
    appID: number = 10;
    lstBUnits: any[];
    lstDBData: MT_STIS_DEST_LOC_ALLOCATION[];
    lstgridfilterData: MT_STIS_DEST_LOC_ALLOCATION[];
    deviceTokenEntry: string[] = [];
    lstUsers: SelectItem[];
    lstOrgGroups: SelectItem[];
    ddllBunit: SelectItem[];
    displayOptions: SelectItem[];
    lstCheckedLocations: Array<MT_STIS_DEST_LOC_ALLOCATION>;
    userDataList: MT_ATPAR_USER[];
    selectedUserIDList: string = "";
    blnSortByColumn: boolean = true;
    dataCheckedSorting: MT_STIS_DEST_LOC_ALLOCATION[] = [];
    dataUncheckedSorting: Array<MT_STIS_DEST_LOC_ALLOCATION>;
    sortedcheckedrec: MT_STIS_DEST_LOC_ALLOCATION[];
    sorteduncheckedrec: MT_STIS_DEST_LOC_ALLOCATION[];
    orgGroupData: MT_ATPAR_ORG_GROUPS[];

    orgGrpID: string = "";
    orgGrpIDData: string = "";
    userID: string = "";
    seletedStatus: string = "";
    startIndex: number;
    EndIndex: number;

    //for orgGrpDropdown
    blnShowOrgGroupLabel: boolean = false;
    blnShowOrgGroupDD: boolean = false;

    //for userID DropDown
    blnShowUserIDLabel: boolean = false;
    blnShowUserIDDD: boolean = false;

    selectedOrgGroupId: string = "";
    selectedDropDownUserId: string = "";
    selectedBunit: string = "";
    selectedLocation: string = "";

    isVisible: boolean = false;
    growlMessage: Message[] = [];
    lstLocations: MT_STIS_DEST_LOC_ALLOCATION[] = [];
    orgGroupIDForDBUpdate: string;
    lstFilteredLocation: any;
    blnsortbycolumn: boolean = true;
    custom: string = "custom";
    pazeSize: number;

    public constructor(
        private allocateDestinationLocationsService: AllocateDestinationLocationsService,
        private spinnerService: SpinnerService,
        public atParCommonService: AtParCommonService,
        private httpService: HttpService,
        private atParConstant: AtParConstants
    ) {

    }

    ngOnInit(): void {
        this.startIndex = + sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
        this.lstCheckedLocations = new Array<MT_STIS_DEST_LOC_ALLOCATION>();
        this.dataCheckedSorting = new Array<MT_STIS_DEST_LOC_ALLOCATION>();
        this.dataUncheckedSorting = new Array<MT_STIS_DEST_LOC_ALLOCATION>();
        this.lstFilteredLocation = new Array<MT_STIS_DEST_LOC_ALLOCATION>();
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.displayOptions = [];
        this.displayOptions.push({ label: 'ALL', value: 'A' });
        this.displayOptions.push({ label: 'Allocated', value: 'L' });
        this.displayOptions.push({ label: 'Unallocated', value: 'U' });
        this.seletedStatus = "A";
        this.bindOrgGroups();

        this.ddllBunit = [];

        this.ddllBunit.push({ label: "Select BUnit", value: "Select BUnit" })

        this.pazeSize = +this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
    }

    async  bindOrgGroups() {

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

                                this.bindUsersList();

                                this.populateBusinessUnits();

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

    async  ddlOrgGrpIdChanged() {
        this.isVisible = false;
        this.growlMessage = [];

        if (this.selectedOrgGroupId == "Select One") {
            this.selectedBunit = "Select BUnit";
            this.selectedDropDownUserId = "Select User";
            this.lstUsers = [];
            this.ddllBunit = [];
            this.ddllBunit.push({ label: "Select BUnit", value: "Select BUnit" })
            this.lstUsers.push({ label: "Select User", value: "Select User" });
            return;
        }
        this.selectedBunit = "Select BUnit";
        this.selectedDropDownUserId = "";
        this.lstDBData = new Array<MT_STIS_DEST_LOC_ALLOCATION>();
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

    ddl_Change() {
        this.isVisible = false;
    }

    async  bindUsersList() {
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


            await this.atParCommonService.getUsersList(this.deviceTokenEntry[TokenEntry_Enum.UserID], EnumApps.StockIssue, this.orgGroupIDForDBUpdate)

                .catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_USER>;
                    this.growlMessage = [];

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

    selectedRow(values: any, event) {

        if (event == true) {
            values.CHK_VALUE = 1;
        }
        else {
            values.CHK_VALUE = 0;
        }

        for (var i = 0; i < this.lstCheckedLocations.length; i++) {
            if (this.lstCheckedLocations[i].LOCATION_ID === values.LOCATION_ID) {
                var index = this.lstCheckedLocations.indexOf(this.lstCheckedLocations[i], 0)
                this.lstCheckedLocations.splice(index, 1);
            }
        }

        this.lstCheckedLocations.push(values);
    }

    async  populateBusinessUnits(): Promise<boolean> {

        if (this.blnShowOrgGroupLabel == true) {
            this.orgGroupIDForDBUpdate = this.orgGrpID;
        }
        else {
            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
        }
        this.lstBUnits = [];
        this.ddllBunit = [];
        this.ddllBunit.push({ label: "Select BUnit", value: "Select BUnit" })

        let isOrgBUnitsExist: boolean = false;
        this.spinnerService.start();

        if ((this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == undefined || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select One") && this.blnShowOrgGroupDD) {

            this.growlMessage = [];
            this.spinnerService.stop();
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select OrgGroupID" });
            return;
        }


        try {
            await this.allocateDestinationLocationsService.getAllocInvBUnits(this.appID, this.deviceTokenEntry[TokenEntry_Enum.UserID], this.orgGroupIDForDBUpdate)
                .forEach((res) => {

                    this.growlMessage = [];
                    if (res.StatusCode == AtparStatusCodes.E_NORECORDFOUND) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Assigned Org Business Units' });
                        this.spinnerService.stop();
                        return;
                    }
                    switch (res.StatType) {
                        case StatusType.Success: {
                            this.spinnerService.stop();
                            this.ddllBunit = [];
                            this.lstBUnits = res.DataList;
                            this.ddllBunit.push({ label: "Select BUnit", value: "Select BUnit" })
                            for (var i = 0; i < this.lstBUnits.length; i++) {
                                this.ddllBunit.push({ label: this.lstBUnits[i], value: this.lstBUnits[i] });

                            }

                            isOrgBUnitsExist = true;
                            break;
                        }
                        case StatusType.Warn: {
                            this.isVisible = false;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                            isOrgBUnitsExist = false;
                            break;
                        }
                        case StatusType.Error: {
                            this.isVisible = false;
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                            isOrgBUnitsExist = false;
                            break;
                        }
                        case StatusType.Custom: {
                            this.isVisible = false;
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
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
        this.lstCheckedLocations = [];
        this.startIndex = + sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = + sessionStorage.getItem("RecordsEndindex");


        if (this.lstgridfilterData != null && this.lstgridfilterData != undefined && this.lstgridfilterData.length > 0) {

            if (this.EndIndex > this.lstgridfilterData.length) {
                this.EndIndex = this.lstgridfilterData.length;
            }

            for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                this.lstgridfilterData[i].checkvalue = true;
                this.lstgridfilterData[i].CHK_VALUE = 1;
                this.lstCheckedLocations.push(this.lstgridfilterData[i]);
            }

        }
        else {

            if (this.EndIndex > this.lstDBData.length) {
                this.EndIndex = this.lstDBData.length;
            }

            for (let i = this.startIndex; i <= this.EndIndex - 1; i++) {
                this.lstDBData[i].checkvalue = true;
                this.lstDBData[i].CHK_VALUE = 1;
                this.lstCheckedLocations.push(this.lstDBData[i]);
            }
        }
    }

    unCheckAll() {
        this.lstCheckedLocations = [];
        this.startIndex = + sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = + sessionStorage.getItem("RecordsEndindex");

        if (this.lstgridfilterData != null && this.lstgridfilterData != undefined && this.lstgridfilterData.length > 0) {

            if (this.EndIndex > this.lstgridfilterData.length) {
                this.EndIndex = this.lstgridfilterData.length;
            }

            for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {
                this.lstgridfilterData[i].checkvalue = false;
                this.lstgridfilterData[i].CHK_VALUE = 0;
                this.lstCheckedLocations.push(this.lstgridfilterData[i]);
            }
        }
        else {
            if (this.EndIndex > this.lstDBData.length) {
                this.EndIndex = this.lstDBData.length;
            }

            for (let i = this.EndIndex - 1; i >= this.startIndex; i--) {
                this.lstDBData[i].checkvalue = false;
                this.lstDBData[i].CHK_VALUE = 0;
                this.lstCheckedLocations.push(this.lstDBData[i]);
            }
        }


    }

    BindDataGrid() {
        try {
            var lstDBDataList;
            this.growlMessage = [];

            this.spinnerService.stop();
            if (this.seletedStatus === "L") {
                this.lstDBData = this.lstDBData.filter(x => x.checkvalue == true);
                if (this.lstDBData.length == 0) {
                    this.isVisible = false;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No data found" });
                    return;
                }
            }
            else if (this.seletedStatus === "U") {
                this.lstDBData = this.lstDBData.filter(x => x.checkvalue == false);
                if (this.lstDBData.length == 0) {
                    this.isVisible = false;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No data found" });
                    return;
                }
            }

            if (this.lstDBData != null && this.lstDBData.length > 0) {
                this.isVisible = true;
            } else {

                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No data found" });
            }


            this.lstCheckedLocations = new Array<MT_STIS_DEST_LOC_ALLOCATION>();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindDataGrid");
        }

    }

    filterdata(event) {
        this.lstgridfilterData = [];
        this.lstgridfilterData = new Array<MT_STIS_DEST_LOC_ALLOCATION>();
        this.lstgridfilterData = event;
    }
    preField: string = "";
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
    //        this.lstCheckedLocations = new Array<MT_STIS_DEST_LOC_ALLOCATION>();
    //    }

    //    catch (ex) {
    //        this.clientErrorMsg(ex, "customSort");
    //    }
    //}
    customSort(event, field) {
        this.blnSortByColumn = !this.blnSortByColumn;
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
        if (element.field == 'BUSINESS_UNIT') {
            if (this.lstgridfilterData != null) {
                let filterlist = asEnumerable(this.lstgridfilterData).Distinct(x => x.BUSINESS_UNIT).ToArray();
                if (filterlist != null && filterlist.length == 1) {
                    return;
                }
            }
            else {
                let filterlist = asEnumerable(this.lstDBData).Distinct(x => x.BUSINESS_UNIT).ToArray();
                if (filterlist != null && filterlist.length == 1) {
                    return;
                }
            }
        }
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
            this.lstDBData = [];
            //if (this.blnSortByColumn == false) {
            //    this.lstDBData = this.sortedcheckedrec.reverse().concat(this.sorteduncheckedrec.reverse());
            //}
            //else {
            //  this.sorteduncheckedrec = asEnumerable(this.sorteduncheckedrec).OrderBy(a => (a.BUSINESS_UNIT)).ToArray();//.ThenByDescending(a => a.LOCATION_ID).ToArray();
            this.lstDBData = this.sortedcheckedrec.concat(this.sorteduncheckedrec);
            // }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "customSort");
        }



        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
    }
    async getDesLocations() {

        this.isVisible = false;
        this.lstgridfilterData = null;
        this.growlMessage = [];
        try {
            if ((this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == undefined || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select One") && this.blnShowOrgGroupDD) {

                this.growlMessage = [];
                this.spinnerService.stop();
                if (this.selectedOrgGroupId == "Select One" || this.selectedOrgGroupId == undefined || this.selectedOrgGroupId == "") {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select valid Org Group ID" });
                    return;
                }
            }
            if (this.selectedDropDownUserId === "Select User" || this.selectedDropDownUserId === undefined || this.selectedDropDownUserId == "") {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please select valid User ID' });

                this.isVisible = false;
                return false;
            }
            if (this.blnShowOrgGroupLabel == true) {
                this.orgGroupIDForDBUpdate = this.orgGrpID;
            }
            else {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            }
            let lstBUnitsArray: any[];
            if (this.lstBUnits == undefined || this.lstBUnits.length == 0) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Assigned Inventory Business Units' });
                this.spinnerService.stop();
                return;
            }
            if (this.selectedBunit == 'Select BUnit' || this.selectedBunit == '' || this.selectedBunit == undefined) {
                if (this.lstBUnits == undefined) {
                    lstBUnitsArray = null;
                }
                else {
                    lstBUnitsArray = this.lstBUnits;
                }

            }
            else {
                lstBUnitsArray = [];
                lstBUnitsArray.push(this.selectedBunit);
            }
            if (this.selectedDropDownUserId === "Select User" || this.selectedDropDownUserId === "undefined" || this.selectedDropDownUserId == "") {
                this.selectedUserIDList = this.deviceTokenEntry[TokenEntry_Enum.UserID];
            }
            else {
                this.selectedUserIDList = this.selectedDropDownUserId;
            }
            this.lstDBData = new Array<MT_STIS_DEST_LOC_ALLOCATION>();
            this.spinnerService.start();
            await this.allocateDestinationLocationsService.getDestinationLocations(lstBUnitsArray, this.selectedLocation, this.selectedUserIDList, this.orgGroupIDForDBUpdate, this.selectedDropDownUserId)
                .forEach((response) => {
                    switch (response.StatType) {
                        case StatusType.Success: {

                            this.lstDBData = [];
                            this.lstDBData = response.DataList;
                            this.lstLocations = [];
                            for (let i = 0; i <= this.lstDBData.length - 1; i++) {

                                this.lstLocations.push(this.lstDBData[i]);
                                if (this.lstDBData[i].CHK_ALLOCATED == 1) {
                                    this.lstDBData[i].checkvalue = true;
                                }
                                else {
                                    this.lstDBData[i].checkvalue = false;
                                }
                            }



                            this.BindDataGrid();


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
        catch (ex) {
            this.clientErrorMsg(ex, "getDesLocations");
        }
    }

    allocateDestinationLocatons() {
        if (this.selectedDropDownUserId === "Select User" || this.selectedDropDownUserId === "undefined" || this.selectedDropDownUserId == "") {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please select valid User ID' });
            return false;
        }
        try {
            this.spinnerService.start();

            this.allocateDestinationLocationsService.allocatedDestLocations(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.selectedDropDownUserId, this.lstDBData, true, this.selectedBunit)
                .subscribe((response) => {
                    this.growlMessage = [];
                    switch (response.StatType) {
                        case StatusType.Success: {
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Updated Successfully' });
                            this.selectedDropDownUserId = "";
                            this.selectedLocation = "";
                            this.selectedBunit = "";
                            this.lstCheckedLocations = new Array<MT_STIS_DEST_LOC_ALLOCATION>();
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
                            this.isVisible = false;
                            break;
                        }
                        case StatusType.Custom: {

                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            this.spinnerService.stop();
                            this.isVisible = false;
                            break;
                        }
                    }


                });

        }
        catch (ex) {
            this.clientErrorMsg(ex, "allocateDestinationLocatons");
        }
    }

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    async fillLocationsAuto(event) {
        this.lstFilteredLocation = [];
        let query = event.query;
        this.lstFilteredLocation = this.filteredLoations(query, this.lstLocations)
    }

    filteredLoations(query, deslocatiions: MT_STIS_DEST_LOC_ALLOCATION[]): any[] {

        try {
            let filtered : any[] = [];
            deslocatiions = asEnumerable(deslocatiions).Distinct(x => x.LOCATION_ID).ToArray()
            if (query == "%") {
                for (let i = 0; i < deslocatiions.length; i++) {
                    let desLocValue = deslocatiions[i].LOCATION_ID;
                    filtered.push(desLocValue);
                }

            } else {
                if (query.length >= 1) {
                    for (let i = 0; i < deslocatiions.length; i++) {
                        let desLocValue = deslocatiions[i].LOCATION_ID;
                        if (desLocValue.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                            filtered.push(desLocValue);
                        }
                    }
                }
            }
            return filtered;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "allocateDestinationLocatons");
        }
    }

    ngOnDestroy() {
        this.deviceTokenEntry = null;
        this.lstOrgGroups = null;
        this.lstUsers = null;
        this.lstOrgGroups = null;
        this.lstBUnits = null;
        this.lstFilteredLocation = null;
        this.lstCheckedLocations = null;
        this.lstDBData = null;
        this.orgGroupData = null;
        this.growlMessage = null;
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
        this.appID = -1;
        this.ddllBunit = null
        this.selectedLocation = null;
    }
} 