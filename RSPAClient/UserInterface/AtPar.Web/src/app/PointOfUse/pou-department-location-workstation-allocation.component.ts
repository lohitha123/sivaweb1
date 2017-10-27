import { Component } from '@angular/core';

import { PAR_MNGT_VENDOR } from "../../app/Entities/PAR_MNGT_VENDOR";


import { AtParCommonService } from '../Shared/atpar-common.service';
import { MT_ATPAR_ORG_GROUP_BUNITS } from '../../app/Entities/MT_ATPAR_ORG_GROUP_BUNITS';
import { MT_ATPAR_ORG_GROUPS } from '../../app/Entities/MT_ATPAR_ORG_GROUPS';
import { TokenEntry_Enum, ClientType, StatusType, BusinessType } from '../Shared/AtParEnums';
import { HttpService } from '../Shared/HttpService';
import { SelectItem, Message } from './../components/common/api';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { Http, Response } from "@angular/http";
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { AtParConstants } from '../Shared/AtParConstants';

import { POUDeptLocWrkAllocService } from './pou-department-location-workstation-allocation.service';

import { VM_MT_POU_USER_DEPARTMENTS } from '../../app/Entities/VM_MT_POU_USER_DEPARTMENTS';
import { MT_POU_DEPT_WORKSTATIONS } from '../../app/Entities/MT_POU_DEPT_WORKSTATIONS';
import { MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS } from '../../app/Entities/MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS';
import { VM_MT_POU_DEPT_LOCATION_ALLOCATIONS } from '../../app/Entities/VM_MT_POU_DEPT_LOCATION_ALLOCATIONS';



import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';

declare var module: {
    id: string;
}

@Component({

    templateUrl: 'pou-department-location-workstation-allocation.component.html',
    providers: [HttpService, AtParCommonService, AtParConstants, POUDeptLocWrkAllocService]
})

export class DepartmentLocationWorkstationAllocationComponent {



    pazeSize: number;
    deviceTokenEntry: string[] = [];
    orgGroupData: MT_ATPAR_ORG_GROUPS[];



    lstAllocatedDatalist: MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS[];
    lstDeptWrks: MT_POU_DEPT_WORKSTATIONS[];
    lstAllocatedCarts: MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS[];
    lstCartHeader: VM_MT_POU_DEPT_LOCATION_ALLOCATIONS[];
    lstWrkStationDetails: MT_POU_DEPT_WORKSTATIONS[];


    blnShowOrgGroupLabel: boolean = false;
    blnShowOrgGroupDD: boolean = false;
    orgGrpID: string = "";
    orgGrpIDData: string = "";
    orgGroupIDForDBUpdate: string;
    bunitsData: any = [];
    workstationsData: any = [];
    lstOrgGroups: SelectItem[];
    lstDept: SelectItem[];
    lstLocType: SelectItem[];
    lstBunit: SelectItem[];
    selectedWorkSationID: string = "";
    selectedOrgGroupId: string = "";
    selectedDeptID: string = "";
    selectedLocType: string = "";
    selectedBunit: string = "";
    growlMessage: Message[] = [];
    showgrid: boolean = false;
    lstDBData: MT_POU_DEPT_WORKSTATIONS[];
    lstDBMainDetails: MT_POU_DEPT_WORKSTATIONS[];
    lstSearch: any[] = [];
    selectedSearch: string = "";
    ///workstationsIDs
    lstFilteredWorkstationsIDs: any = [];

    startIndex: number;
    EndIndex: number;

    dataCheckedSorting: MT_POU_DEPT_WORKSTATIONS[] = [];
    dataUncheckedSorting: Array<MT_POU_DEPT_WORKSTATIONS>;
    sortedcheckedrec: MT_POU_DEPT_WORKSTATIONS[];
    sorteduncheckedrec: MT_POU_DEPT_WORKSTATIONS[];
    lstCheckedBUnits: Array<MT_POU_DEPT_WORKSTATIONS>;
    blnsortbycolumn: boolean = true;
    preField: string = "";
    lblcountmsg: string;

    constructor(
        private atParCommonService: AtParCommonService,
        private httpService: HttpService,
        private spinnerService: SpinnerService,
        private PouDeptLocWrkAllocService: POUDeptLocWrkAllocService,
        private atParConstant: AtParConstants) {

    }


    ngOnInit() {
        this.spinnerService.start();
        this.growlMessage = [];
        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.pazeSize = +this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];

        this.startIndex = + sessionStorage.getItem("Recordsstartindex");
        this.EndIndex = + sessionStorage.getItem("RecordsEndindex");
        this.lstCheckedBUnits = new Array<MT_POU_DEPT_WORKSTATIONS>();
        this.dataCheckedSorting = new Array<MT_POU_DEPT_WORKSTATIONS>();
        this.dataUncheckedSorting = new Array<MT_POU_DEPT_WORKSTATIONS>();

        //for org group data
        this.bindUserOrgGroups();
        this.populateLocTypeDD();
        this.populateDisplayTypeDD();

        this.lstBunit = [];
        this.lstBunit.push({ label: "Select BUnit", value: "Select BUnit" });


        this.lstDept = [];
        this.lstDept.push({ label: "Select Department", value: "Select Department" });
        this.showgrid = false;
        this.selectedSearch = '0';
    }


    populateDisplayTypeDD() {
        this.lstSearch.push({ label: 'All', value: '0' }, { label: 'Allocated', value: '1' }, { label: 'Unallocated', value: '2' });
    }


    async  bindUserOrgGroups() {


        try {

            this.spinnerService.start();
            await this.atParCommonService.getUserOrgGroups(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>;
                  //  this.growlMessage = [];

                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.orgGroupData = data.DataList;

                            if (this.orgGroupData.length == 1) {

                                this.blnShowOrgGroupLabel = true;
                                this.orgGrpIDData = this.orgGroupData[0].ORG_GROUP_ID + " - " + this.orgGroupData[0].ORG_GROUP_NAME;
                                this.orgGrpID = this.orgGroupData[0].ORG_GROUP_ID;

                                this.populateData();
                                this.spinnerService.stop();
                                break;

                            }
                            else if (this.orgGroupData.length > 1) {
                                this.blnShowOrgGroupDD = true;

                                this.lstBunit = [];
                                this.lstBunit.push({ label: "Select BUnit", value: "Select BUnit" });

                                this.lstOrgGroups = [];
                                this.lstOrgGroups.push({ label: "Select OrgGrpID", value: "Select OrgGrpID" })
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


        } catch (ex) {
            this.clientErrorMsg(ex);
        }

    }


    async populateData() {

        let isDeptExists = await this.PopulateDepts();

        if (isDeptExists == true) {


            await this.populateBusinessUnits();
            this.spinnerService.stop();
        }

        this.populateLocTypeDD();

    }

    async ddlOrgGrpIdChanged() {

        this.growlMessage = [];
        this.showgrid = false;

        this.lstDept = [];
        this.lstDept.push({ label: "Select Department", value: "Select Department" });

        if (this.selectedOrgGroupId == "Select OrgGrpID") {
            this.lstBunit = [];
            this.lstBunit.push({ label: "Select BUnit", value: "Select BUnit" });

            this.lstDept = [];
            this.lstDept.push({ label: "Select Department", value: "Select Department" });
            this.lstLocType = [];
            this.lstLocType.push({ label: "Select Loc Type", value: "Select Loc Type" });
            return;
        }


        this.spinnerService.start();

        try {

            this.selectedBunit = "";
            this.selectedDeptID = "";
            this.selectedLocType = "";

            let isDeptExists = await this.PopulateDepts();
            if (isDeptExists == true) {


                await this.populateBusinessUnits();
            }
            else {
                this.lstBunit = [];
                this.lstBunit.push({ label: "Select BUnit", value: "Select BUnit" });

            }

            this.populateLocTypeDD();
            this.spinnerService.stop();
        }
        catch (ex) {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: AtParConstants.ClientErrorMessage });
            this.spinnerService.stop();
        }

    }

    ddl_Change() {
        this.showgrid = false;
    }

    async  PopulateDepts(): Promise<boolean> {


        let isDeptExixt: boolean = false;



        if (this.blnShowOrgGroupLabel == true) {
            this.orgGroupIDForDBUpdate = this.orgGrpID;
        }
        else {
            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
        }



        if (this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select OrgGrpID" || this.orgGroupIDForDBUpdate == undefined) {
            this.growlMessage = [];
            this.spinnerService.stop();
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
            return;
        }

        try {

            await this.PouDeptLocWrkAllocService.getUserDepartments(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.orgGroupIDForDBUpdate).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<VM_MT_POU_USER_DEPARTMENTS>;

                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.lstDept = [];
                            this.lstDept.push({ label: "Select Department", value: "Select Department" });

                            for (let i = 0; i < data.DataList.length; i++) {
                                this.lstDept.push({
                                    label: data.DataList[i].DEPARTMENT_ID + "-" + data.DataList[i].DEPT_NAME,
                                    value: data.DataList[i].DEPARTMENT_ID


                                })
                            }

                            isDeptExixt = true;
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage = [];
                            if (data.StatusCode == 1102002) {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Department(s) Allocated To User" });
                            }
                            else {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            }

                            isDeptExixt = false;
                            this.selectedBunit = "";
                            this.selectedDeptID = "";
                            this.spinnerService.stop();

                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            this.selectedBunit = "";
                            this.selectedDeptID = "";
                            isDeptExixt = false;
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage = [];
                            this.selectedBunit = "";
                            this.selectedDeptID = "";
                            isDeptExixt = false;
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                }

                );

            return Promise.resolve(isDeptExixt);
        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }




    }

    async populateBusinessUnits(): Promise<boolean> {
      
        let isOrgBUnitsExist: boolean = false;
        this.spinnerService.start();


        if (this.blnShowOrgGroupLabel == true) {
            this.orgGroupIDForDBUpdate = this.orgGrpID;
        }
        else {
            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
        }



        if (this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select OrgGrpID" || this.orgGroupIDForDBUpdate == undefined) {
            this.spinnerService.stop();
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
            return;
        }

        this.lstBunit = [];
        this.lstBunit.push({ label: "Select BUnit", value: "Select BUnit" });

        try {
            await this.atParCommonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, BusinessType.Inventory).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUP_BUNITS>;
                  
                    switch (data.StatType) {
                        case StatusType.Success: {


                            this.bunitsData = data.DataList;
                            for (let i = 0; i < this.bunitsData.length; i++) {
                                this.lstBunit.push({
                                    label: this.bunitsData[i],
                                    value: this.bunitsData[i]
                                })
                            }

                            isOrgBUnitsExist = true;
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage = [];
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;

                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage = [];
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
            this.clientErrorMsg(ex);
        }
    }


    populateLocTypeDD() {
        this.lstLocType = [];
        this.lstLocType.push({ label: "Select Loc Type", value: "Select Loc Type" });
        this.lstLocType.push({ label: "Inventory", value: "I" });
        this.lstLocType.push({ label: "Par", value: "P" });
    }


    clientErrorMsg(strExMsg) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString());
    }

    btn_go_Click() {

        this.growlMessage = [];
        this.showgrid = false;

        if (this.blnShowOrgGroupLabel == true) {
            this.orgGroupIDForDBUpdate = this.orgGrpID;
        }
        else {
            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
        }


        if (this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select OrgGrpID" || this.orgGroupIDForDBUpdate == undefined) {
            this.spinnerService.stop();
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
            return;
        }


        ///department ID

        if (this.selectedDeptID == null || this.selectedDeptID == "" || this.selectedDeptID == "Select Department" || this.selectedDeptID == undefined) {
            this.spinnerService.stop();
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Department" });
            return;
        }


        ///Location Type

        if (this.selectedLocType == null || this.selectedLocType == "" || this.selectedLocType == "Select Loc Type" || this.selectedLocType == undefined) {
            this.spinnerService.stop();
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Location Type" });
            return;
        }


        /////Bunit 

        if (this.selectedBunit == null || this.selectedBunit == "" || this.selectedBunit == "Select BUnit" || this.selectedBunit == undefined) {
            this.selectedBunit = "";
        }



        this.GetData();
    }

    async GetData() {

        try {
            this.spinnerService.start();

            await this.PouDeptLocWrkAllocService.GetDeptAllocCarts(this.selectedBunit, "", +this.selectedSearch, this.selectedLocType, 15, this.selectedDeptID, this.orgGroupIDForDBUpdate).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json();
                    this.growlMessage = [];

                    switch (data.StatType) {
                        case StatusType.Success: {

                            this.lstDBData = [];

                            this.lstDBData = data.DataList;


                            if (data.DataDictionary != null && data.DataDictionary != undefined) {



                                if (data.DataDictionary['allocatedlist'] != null && data.DataDictionary['allocatedlist'] != '' && data.DataDictionary['allocatedlist'] != undefined) {

                                    this.dataCheckedSorting = [];

                                    this.dataCheckedSorting = data.DataDictionary['allocatedlist'];

                                }


                                if (data.DataDictionary['unallocatedlist'] != null && data.DataDictionary['unallocatedlist'] != '' && data.DataDictionary['unallocatedlist'] != undefined) {

                                    this.dataUncheckedSorting = [];

                                    this.dataUncheckedSorting = data.DataDictionary['unallocatedlist'];

                                }
                            }

                            this.binddata();

                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.spinnerService.stop();
                            this.showgrid = false;
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


        } catch (ex) {
            this.clientErrorMsg(ex);

        }
    }

    binddata() {


        this.lstDBMainDetails = [];
        this.lblcountmsg = "";
        var count = this.lstDBData.length;
        this.lblcountmsg = count + " Record(s) Found";
        for (let k = 0; k < this.lstDBData.length; k++) {
            this.lstDBMainDetails.push(this.lstDBData[k]);
        }

        this.showgrid = false;

        this.dataCheckedSorting = [];
        this.dataUncheckedSorting = [];


        for (var it = 0; it < this.lstDBData.length; it++) {
            for (var item = 0; item < this.lstDBData[it].DETAILS.length; item++) {
                if (this.lstDBData[it].DETAILS[item].FLAG == "I") {
                    this.lstDBData[it].DETAILS[item].chkvalue = true;

                }
                else {
                    this.lstDBData[it].DETAILS[item].chkvalue = false;

                }


            }
        }



        if (this.selectedSearch == "1") {


            //only allocated
            this.lstDBData = this.lstDBData.filter(x => x.Allocated == 'Y');

            if (this.lstDBData.length == 0) {
                this.showgrid = false;

                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });

                return;
            }
        }
        else if (this.selectedSearch === "2") {

            this.lstDBData = this.lstDBData.filter(x => x.Allocated == 'N');

            if (this.lstDBData.length == 0) {
                this.showgrid = false;

                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });

                return;
            }

        }
        else {
            this.lstDBData = this.lstDBData;

        }





        if (this.selectedWorkSationID != null && this.selectedWorkSationID != undefined && this.selectedWorkSationID != "") {
            var rows = asEnumerable(this.lstDBData).Where(x => x.DEPARTMENT_ID == this.selectedDeptID
                && x.WORKSTATION_ID == this.selectedWorkSationID).ToArray();

            this.lstDBData = [];
            this.lstDBData = rows;

            if (this.lstDBData == null || this.lstDBData == undefined || this.lstDBData.length == 0) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No Data Found" });
                return;
            }

        }


        ////sorting for custom sort
        for (var it = 0; it < this.lstDBData.length; it++) {

            if (asEnumerable(this.lstDBData[it].DETAILS).Any(x => x.FLAG == "I")) {
                this.dataCheckedSorting.push(this.lstDBData[it]);
            }
            else {
                this.dataUncheckedSorting.push(this.lstDBData[it]);
            }


        }



        //  list.Sort((a, b) => a.Item2.CompareTo(b.Item2)); 

        this.showgrid = true;

    }

    GetCartHeaderDetails(workstationId): any[] {

        this.lstAllocatedDatalist = [];
        try {
            if (workstationId != null && workstationId != undefined) {

                this.lstCartHeader.forEach(header => {

                    var rows = asEnumerable(this.lstAllocatedCarts).Where(x => x.DEPARTMENT_ID == this.selectedDeptID && x.BUSINESS_UNIT == header.BUSINESS_UNIT
                        && x.CART_ID == header.LOCATION && x.WORKSTATION_ID == workstationId).ToArray();

                    let data: MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS;


                    data = new MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS;
                    data.BUSINESS_UNIT = header.BUSINESS_UNIT;
                    data.CART_ID = header.LOCATION;
                    data.LOCATION_DESCR = header.LOCATION_DESCR;
                    data.LOCATION_TYPE = header.LOCATION_TYPE;

                    if (rows.length > 0) {
                        data.PRIORITY = rows[0].PRIORITY;
                        data.FLAG = rows[0].FLAG;
                    }
                    else {
                        data.PRIORITY = 3;
                        data.FLAG = "D";
                    }

                    this.lstAllocatedDatalist.push(data);

                });



                for (var i = 0; i < this.lstAllocatedDatalist.length; i++) {


                    if (this.lstAllocatedDatalist[i].FLAG == "I") {
                        this.lstAllocatedDatalist[i].chkvalue = true;
                    }
                    else {
                        this.lstAllocatedDatalist[i].chkvalue = false;
                    }


                }

            }
        } catch (ex) {
            this.lstAllocatedDatalist = [];
        } finally {
            workstationId = null;
            return this.lstAllocatedDatalist;
        }
    }

    Save_Click() {
        this.spinnerService.start();

        this.growlMessage = [];


        if (this.blnShowOrgGroupLabel == true) {
            this.orgGroupIDForDBUpdate = this.orgGrpID;
        }
        else {
            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
        }


        if (this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select OrgGrpID" || this.orgGroupIDForDBUpdate == undefined) {
            this.spinnerService.stop();
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
            return;
        }


        ///department ID

        if (this.selectedDeptID == null || this.selectedDeptID == "" || this.selectedDeptID == "Select Department" || this.selectedDeptID == undefined) {
            this.spinnerService.stop();
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Department" });
            return;
        }


        ///Location Type

        if (this.selectedLocType == null || this.selectedLocType == "" || this.selectedLocType == "Select Loc Type" || this.selectedLocType == undefined) {
            this.spinnerService.stop();
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Location Type" });
            return;
        }



        this.SaveData();

    }

    async SaveData() {


        this.growlMessage = [];

        try {

            await this.PouDeptLocWrkAllocService.SaveDeptCartAllocations(this.lstDBMainDetails, this.selectedDeptID, 15)
                .then((response: Response) => {

                    let data = response.json();
                  

                    switch (data.StatType) {
                        case StatusType.Success: {


                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Saved Successfully..." });
                            this.spinnerService.stop();
                            this.showgrid = false;
                            this.lstDept = [];
                            this.lstDBData = [];
                            this.lstOrgGroups = [];
                            this.lstOrgGroups.push({ label: "Select OrgGrpID", value: "Select OrgGrpID" })
                            this.selectedOrgGroupId = "";
                            this.selectedBunit = "";
                            this.selectedDeptID = "";
                            this.selectedLocType = "";
                            this.selectedSearch = "";
                            this.bindUserOrgGroups();

                            this.lstDept.push({ label: "Select Department", value: "Select Department" });
                            //this.selectedOrgGroupId = "";
                            // this.orgGroupIDForDBUpdate = "";
                         
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


        } catch (ex) {
            this.clientErrorMsg(ex);

        }
    }


    async changeStatus(values: any, statusType: string) {
        this.spinnerService.start();

        if (values.FLAG == "I") {
            if (statusType == '1') {
                values.PRIORITY = 1;
            } else if (statusType == '2') {
                values.PRIORITY = 2;
            }
            else {
                values.PRIORITY = 100;
            }
        }
        else {
            values.PRIORITY = 3;
            statusType = '3';
        }



        this.spinnerService.stop();
    }


    async fillWorkStationIDSAuto(event) {
        try {


            this.growlMessage = [];


            if (this.blnShowOrgGroupLabel == true) {
                this.orgGroupIDForDBUpdate = this.orgGrpID;
            }
            else {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            }




            let query = event.query;

            await this.PouDeptLocWrkAllocService.GetCartWorkstations(this.selectedDeptID, this.selectedBunit, this.orgGroupIDForDBUpdate, 15).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_POU_DEPT_WORKSTATIONS>;
                    this.growlMessage = [];

                    switch (data.StatType) {
                        case StatusType.Success: {


                            this.lstWrkStationDetails = data.DataList;

                            this.maintainWorkStationIDs();

                            this.lstFilteredWorkstationsIDs = this.filterFilteredWrksDetails(query, this.workstationsData)
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


        } catch (ex) {
            this.clientErrorMsg(ex);

        }
    }


    maintainWorkStationIDs() {
        this.workstationsData = [];
        for (let j = 0; j < this.lstWrkStationDetails.length; j++) {
            this.workstationsData.push(this.lstWrkStationDetails[j].WORKSTATION_ID);
        }
    }

    filterFilteredWrksDetails(query, workstations: any[]): any[] {

        let filtered : any[] = [];

        if (query == "%") {
            for (let i = 0; i < workstations.length; i++) {
                let Bunitvalue = workstations[i];
                filtered.push(Bunitvalue);
            }

        } else {
            if (query.length >= 1) {
                for (let i = 0; i < workstations.length; i++) {
                    let Bunitvalue = workstations[i];
                    if (Bunitvalue.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                        filtered.push(Bunitvalue);
                    }
                }
            }
        }


        return filtered;
    }    

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
            this.clientErrorMsg(ex);
        }

        this.lstDBData = [];
        this.lstDBData = this.sortedcheckedrec.concat(this.sorteduncheckedrec);
        this.sortedcheckedrec = [];
        this.sorteduncheckedrec = [];
    }
    selectedRow(values: any, event) {

        if (event == true) {
            values.FLAG = "I";
            values.PRIORITY = "100";
        }
        else {
            values.FLAG = "D";
            values.PRIORITY = "3";
        }


    }

    myfilterdata(event) {
        
        if (event != null) {
            this.lblcountmsg = "";
            var count = event.length;
            this.lblcountmsg = count + " record(s) found";
        }
        else {
            this.lblcountmsg = "";
            var count1 = this.lstDBData.length;
            this.lblcountmsg = count1 + " record(s) found";
        }
        

    }


    ngOnDestroy() {
        this.deviceTokenEntry = null;

        this.lstOrgGroups = null;
        this.lstDBData = null;
        this.orgGroupData = null;
        this.growlMessage = null;

    }


}