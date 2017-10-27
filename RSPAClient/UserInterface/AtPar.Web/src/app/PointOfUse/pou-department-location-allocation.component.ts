import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { SelectItem, Message } from '../components/common/api';
import { LeftBarAnimationService } from '../Home/leftbar-animation.service';
import { Router } from '@angular/router';
import { HttpService } from '../Shared/HttpService';
import { Observable } from 'rxjs/Rx';
import { Response } from '@angular/http';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { AtParConstants } from '../Shared/AtParConstants';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { DataTable } from '../components/datatable/datatable';
import { POUDeptLocationAllocateService } from './pou-department-location-allocation.service';
import { TokenEntry_Enum, StatusType, EnumApps, BusinessType, YesNo_Enum } from '../Shared/AtParEnums';
import { MT_POU_DEPT } from '../entities/mt_pou_dept';
import { MT_ATPAR_ORG_GROUPS } from '../../app/Entities/MT_ATPAR_ORG_GROUPS';
import { MT_ATPAR_ORG_GROUP_BUNITS } from '../../app/Entities/MT_ATPAR_ORG_GROUP_BUNITS';
import { VM_MT_POU_USER_DEPARTMENTS } from '../../app/Entities/VM_MT_POU_USER_DEPARTMENTS';
import { MT_POU_DEPT_CART_ALLOCATIONS } from '../entities/mt_pou_dept_cart_allocations';
import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';

declare var module: {
    id: string;
}

@Component({

    selector: 'pou-department-location-allocation',
    templateUrl: 'pou-department-location-allocation.component.html',
    providers: [AtParConstants, AtParCommonService, POUDeptLocationAllocateService]
})

export class DepartmentLocationAllocationComponent {

    /*Varaiable declaration*/
    @Input() appId: number;
    @ViewChild(DataTable) dataTableComponent: DataTable;
    deviceTokenEntry: string[] = [];
    growlMessage: Message[] = [];
    lstOrgGroups: any[] = [];
    lstBUnits: any = [];
    lstFilteredBUnits: any = [];
    blnShowOrgGroupLabel: boolean = false;
    blnShowOrgGroupDD: boolean = false;
    orgGrpId: string = "";
    orgGrpDesc: string = "";
    ven: any = [];
    recordsPerPageSize: number;
    intAppID: number;
    lstDeptData: MT_POU_DEPT[] = [];
    pageHeader: string = '';
    mode: string;
    lstLocType: any = [];
    lstSearch: any[] = [];
    orgGroupIDForDBUpdate: string = "";
    orgGroupData: MT_ATPAR_ORG_GROUPS[];
    blnStatusMsg: boolean = false;
    lstDept: SelectItem[];
    lstDeptLocation: MT_POU_DEPT_CART_ALLOCATIONS[] = [];
    lstCheckedBUnits: Array<MT_POU_DEPT_CART_ALLOCATIONS>;
    lstGridFilterData: MT_POU_DEPT_CART_ALLOCATIONS[];
    lstAllocatedCarts: MT_POU_DEPT_CART_ALLOCATIONS[];
    sortedCheckedRec: MT_POU_DEPT_CART_ALLOCATIONS[];
    sortedUncheckedRec: MT_POU_DEPT_CART_ALLOCATIONS[];
    dataCheckedSorting: MT_POU_DEPT_CART_ALLOCATIONS[] = [];
    dataUncheckedSorting: Array<MT_POU_DEPT_CART_ALLOCATIONS>;
    hdnSelOrgGrpId: string = "";

    selectedOrgGroupId: string = "";
    selectedLocationType: string = "";
    selectedBunit: string = "";
    locationType: string = "";
    selectedDeptID: string = "";
    selectedSearch: string = "";

    lstLength: string = "";
    showGrid: boolean = false;
    startIndex: number;
    endIndex: number;
    blnSortByColumn: boolean = true;
    custom: string = "custom";

    pop: boolean = false;
    page: boolean = true;
    bstUnits: boolean = false;

    /**
     * Constructor
     * @param leftBarAnimationservice
     * @param router
     * @param pouDeptLocationService
     * @param httpService
     * @param spinnerService
     * @param atParConstant
     * @param commonService
     */
    constructor(private leftBarAnimationservice: LeftBarAnimationService,
        private router: Router,
        private pouDeptLocationService: POUDeptLocationAllocateService,
        private httpService: HttpService,
        private spinnerService: SpinnerService,
        private atParConstant: AtParConstants,
        private commonService: AtParCommonService) {
    }

    /**
  * Init Function for getting all the schedule data and org group data when page load 
  */
    async ngOnInit() {
        try {
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.intAppID = (this.appId);
            this.lstDeptData = [];
            this.lstLocType.push({ label: 'Select Loc Type', value: '' }, { label: 'Inventory', value: 'I' }, { label: 'Par', value: 'P' });
            this.lstSearch.push({ label: 'All', value: '0' }, { label: 'Allocated', value: '1' }, { label: 'Unallocated', value: '2' });
            this.recordsPerPageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
            this.selectedSearch = '0';
            this.lstCheckedBUnits = new Array<MT_POU_DEPT_CART_ALLOCATIONS>();
            if (isNaN(this.intAppID)) {
                this.pageHeader = "PointOfUse";
                this.intAppID = EnumApps.PointOfUse;
            }
            else {
                if (this.intAppID != EnumApps.PointOfUse) {
                    this.pageHeader = "ATPARX";
                }
                else {
                    this.pageHeader = "PointOfUse";
                }
            }

            this.bindOrgGroups();
        }
        catch (ex) {
            this.displayCatchException(ex, "ngOnInit");
        }
    }

    /**
    redirecting to home when click on breadcrumbs
    */
    homeurl() {
        this.leftBarAnimationservice.isHomeClicked = false;
        this.leftBarAnimationservice.isHide();
        this.router.navigate(['atpar']);
    }

    /**
     * Getting Org Group Data at page Load
     */
    async bindOrgGroups() {
        this.spinnerService.start();
        try {
            await this.commonService.getUserOrgGroups(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>;
                    this.growlMessage = [];

                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.growlMessage = [];
                            this.spinnerService.stop();
                            this.orgGroupData = data.DataList;
                            this.blnStatusMsg = false;

                            if (this.orgGroupData.length == 1) {
                                this.blnShowOrgGroupLabel = true;
                                this.orgGrpId = this.orgGroupData[0].ORG_GROUP_ID + ' - ' + this.orgGroupData[0].ORG_GROUP_NAME;
                                this.orgGrpDesc = this.orgGroupData[0].ORG_GROUP_ID;
                                this.populateBusinessUnits();
                                this.populateDepts();
                               
                            }
                            else if (this.orgGroupData.length > 1) {
                                this.blnShowOrgGroupDD = true;
                                this.lstFilteredBUnits = [];
                                this.lstDept = [];
                                this.lstOrgGroups.push({ label: "Select One", value: "Select One" });
                                this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
                                this.lstDept.push({ label: "Select Department", value: "Select Department" });
                                for (var i = 0; i < this.orgGroupData.length; i++) {
                                    if (this.orgGroupData[i].ORG_GROUP_ID !== "All") {
                                        this.lstOrgGroups.push({ label: this.orgGroupData[i].ORG_GROUP_ID + ' - ' + this.orgGroupData[i].ORG_GROUP_NAME, value: this.orgGroupData[i].ORG_GROUP_ID })
                                    }
                                }
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
        }
        catch (ex) {
            this.displayCatchException(ex, "bindOrgGroups");
        }
    }

    /**
    * Getting Business Units at page Load
    */
    async populateBusinessUnits(): Promise<boolean> {
        this.growlMessage = [];
        let isOrgBUnitsExist: boolean = false;
        try {
            if (this.blnShowOrgGroupLabel == true) {
                this.orgGroupIDForDBUpdate = this.orgGrpDesc;
            }
            else {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            }

            this.lstFilteredBUnits = [];
            this.lstFilteredBUnits.push({ label: "Select BUnit", value: "" });
            this.spinnerService.start();
            await this.commonService.getOrgBusinessUnits(this.orgGroupIDForDBUpdate, BusinessType.Inventory).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUP_BUNITS>;
                    if (data.StatusCode == AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS) {
                        this.spinnerService.stop();
                        this.growlMessage = [];
                        this.bstUnits = true;
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Assigned Org Business Units' });
                        this.pop = false;
                        return;
                    }
                    switch (data.StatType) {
                        case StatusType.Success: {
                            let lstFilteredBUnitsTest = data.DataList;

                            if (lstFilteredBUnitsTest != null) {
                                if (lstFilteredBUnitsTest.length > 0) {
                                    for (var i = 0; i < lstFilteredBUnitsTest.length; i++) {
                                        this.lstFilteredBUnits.push({ label: lstFilteredBUnitsTest[i], value: lstFilteredBUnitsTest[i] })
                                    }
                                }
                            }
                            this.spinnerService.stop();
                            isOrgBUnitsExist = true;
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage = [];
                            this.spinnerService.stop();
                            this.pop = false;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            this.spinnerService.stop();
                            this.pop = false;
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage = [];
                            this.spinnerService.stop();
                            this.pop = false;
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            isOrgBUnitsExist = false;
                            break;
                        }
                    }
                });
            return Promise.resolve(isOrgBUnitsExist);
        }
        catch (ex) {
            this.displayCatchException(ex, "populateBusinessUnits");
        }
    }

    /**
    * Getting Departments at page Load
    */
    async  populateDepts(): Promise<boolean> {
        let isDeptExixt: boolean = false;

        if (this.blnShowOrgGroupLabel == true) {
            this.orgGroupIDForDBUpdate = this.orgGrpDesc;
        }
        else {
            this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
        }
        this.lstDept = [];
        this.growlMessage = [];
        this.lstDept.push({ label: "Select Department", value: "Select Department" });
        if (this.orgGroupIDForDBUpdate == null || this.orgGroupIDForDBUpdate == "" || this.orgGroupIDForDBUpdate == "Select OrgGrpID" || this.orgGroupIDForDBUpdate == undefined) {
            this.spinnerService.stop();
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: 'warn', detail: "Please Select Org Group ID" });
            return;
        }
        try {
            await this.pouDeptLocationService.getUserDepartments(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.orgGroupIDForDBUpdate).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<VM_MT_POU_USER_DEPARTMENTS>;
                    if (data.StatusCode == AtparStatusCodes.E_NORECORDFOUND) {
                        if (this.bstUnits == true) { return; }
                        else {
                            this.growlMessage = [];
                            this.spinnerService.stop();
                            this.bstUnits = false;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Department(s) Allocated To User' });
                            return;
                        }
                    }
                    switch (data.StatType) {
                        case StatusType.Success: {
                            for (let i = 0; i < data.DataList.length; i++) {
                                this.lstDept.push({
                                    label: data.DataList[i].DEPARTMENT_ID + '-' + data.DataList[i].DEPT_NAME,
                                    value: data.DataList[i].DEPARTMENT_ID
                                })
                            }
                            isDeptExixt = true;
                            break;
                        }
                        case StatusType.Warn: {
                            isDeptExixt = false;
                            this.selectedBunit = "";
                            this.selectedDeptID = "";
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.selectedBunit = "";
                            this.selectedDeptID = "";
                            isDeptExixt = false;
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.selectedBunit = "";
                            this.selectedDeptID = "";
                            isDeptExixt = false;
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
            return Promise.resolve(isDeptExixt);
        }
        catch (ex) {
            this.displayCatchException(ex, "populateDepts");
        }
    }

    /**
     * getting allocated locations when go button clicks
     */
    async getDeptLocationDetails() {
        this.lstGridFilterData = null;
        this.spinnerService.start();
        if (this.dataTableComponent != null) {
            this.dataTableComponent.reset();
        }
        this.growlMessage = [];
        this.pop = false;
        try {
            if (this.blnShowOrgGroupLabel == true) {
                this.orgGroupIDForDBUpdate = this.orgGrpDesc;
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
            else if (this.selectedDeptID == "Select Department" || this.selectedDeptID == undefined || this.selectedDeptID == "") {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Select Department' });
                this.spinnerService.stop();
                this.pop = false;
                return;
            }
            else if (this.selectedLocationType == "Select Loc Type" || this.selectedLocationType == undefined || this.selectedLocationType == "") {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Select Location Type' });
                this.spinnerService.stop();
                this.pop = false;
                return;
            }
            else {
                this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID] = this.orgGroupIDForDBUpdate;

                await this.pouDeptLocationService.getDeptCartAllocationDetails(this.selectedBunit, this.locationType, this.selectedSearch, this.selectedLocationType).catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_POU_DEPT_CART_ALLOCATIONS>;
                    this.lstDeptLocation = [];
                    this.lstLength = "";
                    if (data.StatusCode == AtparStatusCodes.E_NORECORDFOUND) {
                        this.spinnerService.stop();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Records Found' });
                        this.pop = false;
                        return;
                    }
                    if (data.StatusCode == AtparStatusCodes.E_SERVERERROR) {
                        this.spinnerService.stop();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Failed To Get Data' });
                        this.pop = false;
                        return;
                    }

                    if (data.StatusCode == AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS) {
                        this.spinnerService.stop();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Assigned Org Business Units' });
                        this.pop = false;
                        return;
                    }
                    if (data.StatusCode == AtparStatusCodes.E_REMOTEERROR) {
                        this.spinnerService.stop();
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Remote server error' });
                        this.pop = false;
                        return;
                    }
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.lstDeptLocation = data.DataVariable["m_Item1"];
                            this.lstAllocatedCarts = data.DataVariable["m_Item2"];

                            if (this.lstDeptLocation != null && this.lstDeptLocation.length > 0) {
                                this.pop = true;
                                for (var i = 0; i < this.lstDeptLocation.length; i++) {
                                    var assignedDept: string = "";
                                    if (this.lstDeptLocation[i].ASSIGN_CART == 'Y') {
                                        this.lstDeptLocation[i].CHECKED = true;
                                    }
                                    else {
                                        this.lstDeptLocation[i].CHECKED = false;
                                    }
                                }
                                this.bindDataGrid();
                                this.lstLength = this.lstDeptLocation.length + " Record(s) found";
                            }
                            else {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                                this.pop = false;
                            }

                            if (this.lstDeptLocation.length <= 0) {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Data Found' });
                                this.pop = false;
                            }
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.selectedBunit = "";
                            this.selectedDeptID = "";
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.selectedBunit = "";
                            this.selectedDeptID = "";
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.selectedBunit = "";
                            this.selectedDeptID = "";
                            this.spinnerService.stop();
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                })
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "getDeptLocationDetails");
        }
    }

    /**
     * This function is for binding data to datatable
     */
    async bindDataGrid() {
        var lstDBDataList;
        this.dataCheckedSorting = [];
        this.dataUncheckedSorting = [];

        for (let i = 0; i <= this.lstDeptLocation.length - 1; i++) {
            if (this.lstDeptLocation[i].CHECKED == true) {
                this.dataCheckedSorting.push(this.lstDeptLocation[i]);
            }
            else {
                this.dataUncheckedSorting.push(this.lstDeptLocation[i]);
            }
        }
        this.showGrid = true;
        this.spinnerService.stop();
    }

    /**
    * This function is used for filtering data in datatable 
    * @param event
    */
    filterData(event) {
        this.lstGridFilterData = [];
        this.lstGridFilterData = new Array<MT_POU_DEPT_CART_ALLOCATIONS>();
        this.lstGridFilterData = event;
    }

    /**
   * This function is Change event for OrgGroup ID
   */
    async ddlOrgGrpIdChanged() {
        try {
            this.hdnSelOrgGrpId = this.selectedOrgGroupId;
            this.selectedDeptID = '';

            if (this.selectedOrgGroupId == "Select One") {
                this.lstDept = [];
                this.lstDept.push({ label: "Select BUnit", value: "" });
                return;
            }
            this.lstDeptLocation = new Array<MT_POU_DEPT_CART_ALLOCATIONS>();
            this.spinnerService.start();
            this.lstDept = [];
            this.lstDept.push({ label: "Select Department", value: "" });
            await this.populateDepts();
            await this.populateBusinessUnits();
            this.spinnerService.stop();
        }
        catch (ex) {
            this.displayCatchException(ex, "ddlOrgGrpIdChanged");
        }
    }

    ddl_Change() {
        this.pop = false;
    }

    /**

    * This event is called when we check or uncheck the swicth component
    * @param values
    * @param event
    */
    async selectedRow(values: any, event) {
        try {
            this.growlMessage = [];
            this.lstCheckedBUnits = [];
            if (event == true) {
                values.CHECKED = true;
                values.ASSIGN_CART = 'Y';
            }
            else {
                values.CHECKED = false;
                values.ASSIGN_CART = 'N';
            }

            this.lstCheckedBUnits.push(values);
            this.maintainState();
        }
        catch (ex) {
            this.displayCatchException(ex, "selectedRow");
        }
        //if (this.lstCheckedBUnits.length > 0 && this.lstCheckedBUnits != null) {
        //    for (var i = 0; i < this.lstCheckedBUnits.length; i++) {
        //        if (this.lstCheckedBUnits[i].BUSINESS_UNIT === values.BUSINESS_UNIT) {
        //            var index = this.lstCheckedBUnits.indexOf(this.lstCheckedBUnits[i], 0)
        //            this.lstCheckedBUnits.splice(index, 1);
        //        }
        //    }
        //    this.lstCheckedBUnits.push(values);
        //}
    }

    /**
   * check all the switches
   */
    async checkAll() {
        try {
            this.lstCheckedBUnits = [];

            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.endIndex = + sessionStorage.getItem("RecordsEndindex");
            if (this.lstGridFilterData != null && this.lstGridFilterData != undefined && this.lstGridFilterData.length > 0) {
                if (this.endIndex > this.lstGridFilterData.length) {
                    this.endIndex = this.lstGridFilterData.length;
                }
                for (let i = this.startIndex; i <= this.endIndex - 1; i++) {
                    if (this.lstDeptLocation[i].DEPT_ID == this.selectedDeptID || this.lstDeptLocation[i].DEPT_ID == "") {
                        this.lstGridFilterData[i].ASSIGN_CART = 'Y';
                        this.lstGridFilterData[i].CHECKED = true;
                        this.lstCheckedBUnits.push(this.lstGridFilterData[i]);
                    }
                }
            }
            else {
                if (this.endIndex > this.lstDeptLocation.length) {
                    this.endIndex = this.lstDeptLocation.length;
                }
                for (let i = this.startIndex; i <= this.endIndex - 1; i++) {
                    if (this.lstDeptLocation[i].DEPT_ID == this.selectedDeptID || this.lstDeptLocation[i].DEPT_ID == "") {
                        this.lstDeptLocation[i].ASSIGN_CART = 'Y';
                        this.lstDeptLocation[i].CHECKED = true;
                        this.lstCheckedBUnits.push(this.lstDeptLocation[i]);
                    }
                }
            }
            this.maintainState();
        }
        catch (ex) {
            this.displayCatchException(ex, "checkAll");
        }
    }

    /**
     * Uncheck all the switches
     */
    async unCheckAll() {
        try {
            this.lstCheckedBUnits = [];
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.endIndex = + sessionStorage.getItem("RecordsEndindex");

            if (this.lstGridFilterData != null && this.lstGridFilterData != undefined && this.lstGridFilterData.length > 0) {
                if (this.endIndex > this.lstGridFilterData.length) {
                    this.endIndex = this.lstGridFilterData.length;
                }
                for (let i = this.endIndex - 1; i >= this.startIndex; i--) {
                    if (this.lstDeptLocation[i].DEPT_ID == this.selectedDeptID || this.lstDeptLocation[i].DEPT_ID == "") {
                        this.lstGridFilterData[i].ASSIGN_CART = 'N';
                        this.lstGridFilterData[i].CHECKED = false;
                        this.lstCheckedBUnits.push(this.lstGridFilterData[i]);
                    }
                }
            }
            else {
                if (this.endIndex > this.lstDeptLocation.length) {
                    this.endIndex = this.lstDeptLocation.length;
                }
                for (let i = this.endIndex - 1; i >= this.startIndex; i--) {
                    if (this.lstDeptLocation[i].DEPT_ID == this.selectedDeptID || this.lstDeptLocation[i].DEPT_ID == "") {
                        this.lstDeptLocation[i].ASSIGN_CART = 'N';
                        this.lstDeptLocation[i].CHECKED = false;
                        this.lstCheckedBUnits.push(this.lstDeptLocation[i]);
                    }
                }
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "unCheckAll");
        }
    }

    /**
   * This function  is used for Custom sorting in data table for all columns
   * @param event
   */
    customSort(event) {
        try {
            var element = event;
            this.lstDeptLocation = [];
            this.blnSortByColumn = !this.blnSortByColumn;

            this.sortedCheckedRec = [];
            this.sortedUncheckedRec = [];

            this.sortedCheckedRec = this.dataCheckedSorting.sort(function (a, b) {
                if (a[element.field] < b[element.field])
                    return -1;
                if (a[element.field] > b[element.field])
                    return 1;
                return 0;
            });
            this.sortedUncheckedRec = this.dataUncheckedSorting.sort(function (a, b) {
                if (a[element.field] < b[element.field])
                    return -1;
                if (a[element.field] > b[element.field])
                    return 1;
                return 0;
            });
            if (this.blnSortByColumn == false) {
                this.lstDeptLocation = [];

                if (this.selectedSearch == '0') {
                    this.lstDeptLocation = this.sortedCheckedRec.reverse().concat(this.sortedUncheckedRec.reverse());
                }
                else if (this.selectedSearch == '1') {
                    this.lstDeptLocation = this.sortedCheckedRec.reverse();
                }
                else if (this.selectedSearch == '2') {
                    this.lstDeptLocation = this.sortedUncheckedRec.reverse();
                }
            }
            else {
                this.lstDeptLocation = [];
                if (this.selectedSearch == '0') {
                    this.lstDeptLocation = this.sortedCheckedRec.concat(this.sortedUncheckedRec);
                }
                else if (this.selectedSearch == '1') {
                    this.lstDeptLocation = this.sortedCheckedRec;
                }
                else if (this.selectedSearch == '2') {
                    this.lstDeptLocation = this.sortedUncheckedRec;
                }
            }
            this.sortedCheckedRec = [];
            this.sortedUncheckedRec = [];
        }
        catch (ex) {
            this.displayCatchException(ex, "customSort");
        }
    }

    /**
     * Updating Events 
     */
    async updateEvents() {
        try {
            let lstdsCarts: any = [];
            let lstdvData: Array<MT_POU_DEPT_CART_ALLOCATIONS> = [];
            let lstdtCarts: any = [];
            let lstdtSendTable: any = [];
            this.spinnerService.start();
            if (this.blnShowOrgGroupLabel == true) {
                this.orgGroupIDForDBUpdate = this.orgGrpDesc;
            }
            else {
                this.orgGroupIDForDBUpdate = this.selectedOrgGroupId;
            }

            this.maintainState();
            let lstFilteredData: any = [];
            let lstdsEventDetails: any = [];
            lstFilteredData = [];
            lstdvData = this.lstAllocatedCarts.filter(a => a.DEPARTMENT_ID === this.selectedDeptID.toString());

            for (var i = 0; i < this.lstDeptLocation.length; i++) {
                if (this.lstDeptLocation[i].ASSIGN_CART == 'Y' && this.lstDeptLocation[i].DEPT_ID == this.selectedDeptID) {
                    lstdsEventDetails.push({ CART_ID: this.lstDeptLocation[i].LOCATION, BUSINESS_UNIT: this.lstDeptLocation[i].BUSINESS_UNIT, DEPARTMENT_ID: this.selectedDeptID, LOCATION_TYPE: this.lstDeptLocation[i].LOCATION_TYPE });
                }
            }

            for (var i = 0; i < lstdvData.length; i++) {
                if (lstdvData[i].FLAG == 'I' && lstdvData[i].DEPARTMENT_ID == this.selectedDeptID) {
                    if (lstdsEventDetails.length > 0) {
                        var filteredIndex = lstdsEventDetails.filter(a => a.CART_ID === lstdvData[i].CART_ID.toString() && a.BUSINESS_UNIT === lstdvData[i].BUSINESS_UNIT.toString() && a.DEPARTMENT_ID === lstdvData[i].DEPARTMENT_ID.toString() && a.LOCATION_TYPE === lstdvData[i].LOCATION_TYPE.toString());
                        if (filteredIndex.length <= 0) {
                            lstdsEventDetails.push({ CART_ID: lstdvData[i].CART_ID, BUSINESS_UNIT: lstdvData[i].BUSINESS_UNIT, DEPARTMENT_ID: lstdvData[i].DEPARTMENT_ID, LOCATION_TYPE: lstdvData[i].LOCATION_TYPE });
                        }
                    }
                    else {
                        lstdsEventDetails.push({ CART_ID: lstdvData[i].CART_ID, BUSINESS_UNIT: lstdvData[i].BUSINESS_UNIT, DEPARTMENT_ID: lstdvData[i].DEPARTMENT_ID, LOCATION_TYPE: lstdvData[i].LOCATION_TYPE });
                    }
                }
            }

            this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID] = this.orgGroupIDForDBUpdate;
            if (lstdsEventDetails.length == 0) { lstdsEventDetails.push({ CART_ID: '', BUSINESS_UNIT: '', DEPARTMENT_ID: '', LOCATION_TYPE: '' }); }
            if (lstdsEventDetails.length > 0) {
                this.growlMessage = [];
                this.pouDeptLocationService.updateEvents(lstdsEventDetails, this.selectedDeptID, this.orgGroupIDForDBUpdate, this.intAppID)
                    .subscribe((response) => {
                        switch (response.StatType) {
                            case StatusType.Success: {
                                this.spinnerService.stop();
                                this.showGrid = false;
                                this.selectedDeptID = '';
                                this.selectedLocationType = '';
                                this.selectedBunit = '';
                                this.selectedSearch = '0';
                                this.pop = false;
                                this.locationType = "";
                                this.lstAllocatedCarts = [];
                                this.lstDeptLocation = [];
                                this.lstCheckedBUnits = [];
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Saved Successfully...' });
                                break;
                            }
                            case StatusType.Warn: {
                                this.spinnerService.stop();
                                if (response.StatusCode == AtparStatusCodes.E_NORECORDFOUND) {
                                    for (var i = 0; i < this.lstCheckedBUnits.length; i++) {
                                        this.lstCheckedBUnits[i].CHECKED = false;
                                        var lst = this.lstDeptLocation.filter(x => x.BUSINESS_UNIT == this.lstCheckedBUnits[i].BUSINESS_UNIT && x.LOCATION == this.lstCheckedBUnits[i].LOCATION && x.LOCATION_TYPE == this.lstCheckedBUnits[i].LOCATION_TYPE);
                                        if (lst != null && lst.length > 0) {
                                            lst[0].CHECKED = false;
                                        }
                                    }
                                    this.growlMessage = [];
                                    this.lstDeptLocation = asEnumerable(this.lstDeptLocation).OrderBy(a => a.CHECKED == false).ThenByDescending(a => a.BUSINESS_UNIT).ToArray();
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Locations allocated to workstation, cannot be unallocated' });
                                }
                                else {
                                    this.growlMessage = [];
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                }
                                break;
                            }
                            case StatusType.Error: {
                                this.spinnerService.stop();
                                this.pop = false;
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                break;
                            }
                            case StatusType.Custom: {
                                this.spinnerService.stop();
                                this.pop = false;
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                break;
                            }
                        }
                    });
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "updateEvents");
        }
    }

    /**
     * This function is for assiging department for allocating locations and removing data from unallocated data
     */
    async maintainState() {
        this.lstCheckedBUnits;
        let strCartID: string;
        let strBUnit: string;
        let strDept: string;
        let blnCarts: boolean;
        let blnWKS: boolean;
        let strLocType: string = "";
        for (var i = 0; i < this.lstCheckedBUnits.length; i++) {
            strCartID = this.lstCheckedBUnits[i].LOCATION;
            strBUnit = this.lstCheckedBUnits[i].BUSINESS_UNIT;
            strDept = this.selectedDeptID;
            strLocType = this.lstCheckedBUnits[i].LOCATION_TYPE;

            for (var intCnt = 0; intCnt < this.lstDeptLocation.length; intCnt++) {
                var _with1 = this.lstDeptLocation[intCnt];
                if (_with1.LOCATION == strCartID && _with1.BUSINESS_UNIT == strBUnit && _with1.LOCATION_TYPE == strLocType) {
                    _with1.ASSIGN_CART = _with1.CHECKED ? YesNo_Enum[YesNo_Enum.Y].toString() : YesNo_Enum[YesNo_Enum.N].toString();
                    if ((_with1.DEPT_ID == this.selectedDeptID || _with1.DEPT_ID == '') && _with1.CHECKED == true) {
                        _with1.DEPT_ID = this.selectedDeptID;
                    }
                }
            }

            if (this.lstCheckedBUnits[i].CHECKED == false) {
                var lstFilteresList = this.lstAllocatedCarts.filter(a => a.CART_ID === strCartID.toString() && a.BUSINESS_UNIT === strBUnit.toString() && a.DEPARTMENT_ID === strDept.toString() && a.LOCATION_TYPE === strLocType.toString());
                if (lstFilteresList.length > 0) {
                    lstFilteresList[0].FLAG = 'D';
                }
            }

        }
    }

    /**
    * This method is for display error message
    */
    displayCatchException(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    /**
     * delete all the values from variables
     */
    ngOnDestroy() {
        this.deviceTokenEntry = [];
        this.growlMessage = [];
        this.spinnerService.stop();
        this.spinnerService = null;
        this.lstDeptData = [];
        this.ven = [];
        this.recordsPerPageSize = 0;
        this.intAppID = 0;
        this.mode = null;
        this.blnSortByColumn = true;
        this.lstCheckedBUnits = [];
        this.lstDeptLocation = [];
        this.lstGridFilterData = [];
        this.lstAllocatedCarts = [];
        this.selectedOrgGroupId = "";
        this.selectedLocationType = "";
        this.selectedBunit = "";
        this.locationType = "";
        this.selectedDeptID = "";
        this.selectedSearch = "";
        this.pop = false;
        this.page = true;
    }
}