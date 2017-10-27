import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { Message } from '../components/common/api';
import { LeftBarAnimationService } from '../Home/leftbar-animation.service';
import { Router } from '@angular/router';
import { HttpService } from '../Shared/HttpService';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { AtParConstants } from '../Shared/AtParConstants';
import { POUDeptDeviceAllocateService } from './pou-department-device-allocation.service';
import { TokenEntry_Enum, StatusType, ModeEnum, ScheduleType_Enum, DayOfWeek_Enum, EnumApps } from '../Shared/AtParEnums';
import { MT_POU_DEPT } from '../entities/mt_pou_dept';
import { MT_POU_DEPT_WORKSTATIONS } from '../entities/mt_pou_dept_workstations';
import { ConfirmationService } from '../components/common/api';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { DataTable } from '../components/datatable/datatable';
import { Menus } from '../AtPar/Menus/routepath';

declare var module: {
    id: string;
}

@Component({

    selector: 'atpar-pou-department-device-allocation',
    templateUrl: 'pou-department-device-allocation.component.html',
    providers: [POUDeptDeviceAllocateService, AtParConstants, ConfirmationService]
})

export class DepartmentDeviceAllocationComponent {
    /*Varaible Declaration*/
    @Input() appId: number;
    @ViewChild(DataTable) dataTableComponent: DataTable;
    workStation: boolean = false;
    dept: boolean = false;
    createForm: boolean = false;
    editform: boolean = false;
    headForm: boolean = true;
    ven: any;
    goBackForm: boolean = false;
    macAddressStatus: number;
    departmentID: string = "";
    deptDescr: string = "";
    deviceTokenEntry: string[] = [];
    growlMessage: Message[] = [];
    lstDeptData: MT_POU_DEPT[] = [];
    lstWorkData: MT_POU_DEPT_WORKSTATIONS[] = [];
    lstWrkStationDetails: MT_POU_DEPT_WORKSTATIONS[];
    recordsPerPageSize: number;
    intAppID: number;
    pageName: string = "";
    workStationID: string = "";
    workStationDescription: string = "";
    macAddress: string = "";
    deptName: string = "";
    orgName: string = "";
    iswksExists: boolean = false;

    workIDStatus: number;
    workDescStatus: number;
    disableButton: boolean = true;
    pageHeader: string = '';
    mode: string;
    blnPageName: boolean = false;
    breadCrumbMenu: Menus;
    deptID: string = "";
    descStatus: any;
    desc1Status: any;
    deviceallocation: string;

    /**
     * Constructor
     * @param leftBarAnimationservice
     * @param router
     * @param pouDeptAllocateService
     * @param httpService
     * @param spinnerService
     * @param atParConstant
     */
    constructor(private leftBarAnimationservice: LeftBarAnimationService,
        private router: Router,
        private pouDeptAllocateService: POUDeptDeviceAllocateService,
        private httpService: HttpService,
        private spinnerService: SpinnerService,
        private atParConstant: AtParConstants, private confirmationService: ConfirmationService) {
        this.breadCrumbMenu = new Menus();

        //this.intAppID = (this.appId);
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
    * Init Function for getting all the schedule data and org group data when page load 
    */
    async ngOnInit() {
        try {

            this.deviceallocation = "assets/images/icons/common/deviceAllocation.png";

            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.intAppID = (this.appId);
            this.lstDeptData = [];
            this.recordsPerPageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
            // this.spinnerService.start();
            //  await this.bindDataGrid();
            if (isNaN(this.intAppID)) {
                // this.pageName = "Point of Use - Department Device Allocation";
                this.pageHeader = "PointOfUse";
                this.intAppID = EnumApps.PointOfUse;
            }
            else {
                if (this.intAppID != EnumApps.PointOfUse) {
                    //   this.pageName = "AtPaRx - Department Device Allocation";
                    this.pageHeader = "ATPARX";
                }
                else {
                    //  this.pageName = "Point of Use - Department Device Allocation";
                    this.pageHeader = "PointOfUse";
                }
            }
        }
        catch (ex) {
            this.displayCatchException(ex);
        }
    }

    /**
     * Getting data from database and bind records to data table
     */
    async bindDataGrid() {
        try {

            if (this.dataTableComponent != null) {
                this.dataTableComponent.reset();
            }
            this.lstDeptData = [];
            if (this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID] == "All") {
                var OrgGroup = this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID].charAt(0).toUpperCase() + this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID].substr(1).toLowerCase();
            }
            else {
                var OrgGroup = this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID];
            }
            this.departmentID = this.departmentID.trim();
            this.deptDescr = this.deptDescr.trim();
            await this.pouDeptAllocateService.getDeptAllocateDetails(this.departmentID, this.deptDescr, OrgGroup)
                .catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<any>;
                    this.lstDeptData = data.DataList;
                    switch (data.StatType) {
                        case StatusType.Success: {
                            if (this.lstDeptData != null) {
                                if (this.lstDeptData.length > 0) {
                                    this.dept = true;

                                    this.workStation = false;
                                } else {
                                    this.growlMessage = [];
                                    this.dept = false;
                                    this.departmentID = '';
                                    this.deptDescr = '';
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Allocated Departments were found' });
                                }
                            }
                            else {
                                this.growlMessage = [];
                                this.dept = false;
                                this.departmentID = '';
                                this.deptDescr = '';
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Allocated Departments were found' });
                            }
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            if (data.StatusCode == AtparStatusCodes.E_NORECORDFOUND) {
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Departments found' });
                            }
                            this.dept = false;
                            this.departmentID = '';
                            this.deptDescr = '';
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            if (this.lstDeptData != null) {
                                if (this.lstDeptData.length > 0) {
                                    this.dept = true;
                                    this.workStation = false;
                                } else {
                                    this.growlMessage = [];
                                    this.dept = false;
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Allocated Departments were found' });
                                }
                            }
                            else {
                                this.growlMessage = [];
                                this.dept = false;
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Allocated Departments were found' });
                            }
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                    }


                });
        }
        catch (ex) {
            this.displayCatchException(ex);
        }
    }

    /**
     * This function is used when we click go button on search departments based on departmentid and departmentdesc
     */
    async searchDepartment() {
        this.growlMessage = [];
        this.spinnerService.start();

        await this.bindDataGrid();
    }

    /**
     * this method is for getting worksations for particular department and orggroup
     */
    async selectedRow(departmentID, orgGoupID) {
        this.deptID = departmentID;
        this.breadCrumbMenu.SUB_MENU_NAME = "Allocate Workstations / Devices - " + departmentID;
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.deptName = departmentID;
        this.orgName = orgGoupID;
        this.headForm = false;
        this.pageName = "Department :" + departmentID;
        if (isNaN(this.intAppID)) {
            // this.pageName = "Point of Use - Department Device Allocation - " + departmentID;
            this.pageHeader = "PointOfUse";
        }
        else {
            if (this.intAppID != EnumApps.PointOfUse) {
                // this.pageName = "AtPaRx - Department Device Allocation - " + departmentID;
                this.pageHeader = "ATPARX";
            }
            else {
                //  this.pageName = "Point of Use - Department Device Allocation - " + departmentID;
                this.pageHeader = "PointOfUse";
            }
        }
        this.workStation = true;
        this.createForm = false;
        this.dept = false;
        await this.bindWorkStations(departmentID, orgGoupID);
    }

    /**
     * this method is for bind the work stations for particular department and orggroup
     */
    async bindWorkStations(departmentID, orgGoupID) {
        try {
            if (this.dataTableComponent != null) {
                this.dataTableComponent.reset();
            }
            this.lstWorkData = [];
            await this.pouDeptAllocateService.getWorkStationsDetails(departmentID, orgGoupID)
                .catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<any>;
                    this.lstWorkData = data.DataList;
                    this.blnPageName = true;
                    this.goBackForm = true;
                    switch (data.StatType) {
                        case StatusType.Success: {
                            if (this.lstWorkData != null) {
                                if (this.lstWorkData.length > 0) {
                                    this.workStation = true;
                                    this.dept = false;
                                }
                                else {
                                    this.workStation = false;
                                    this.growlMessage = [];
                                    this.goBackForm = true;
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Allocated Workstations were found' });
                                }
                            }
                            else {
                                this.workStation = false;
                                this.growlMessage = [];
                                this.goBackForm = true;
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Allocated Workstations were found' });
                            }
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            if (this.lstWorkData != null) {
                                if (this.lstWorkData.length > 0) {
                                    this.workStation = true;
                                    this.dept = false;
                                }
                                else {
                                    this.workStation = false;
                                    this.growlMessage = [];
                                    this.goBackForm = true;
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Allocated Workstations were found' });
                                }
                            }
                            else {
                                this.workStation = false;
                                this.goBackForm = true;
                                this.growlMessage = [];
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Allocated Workstations were found' });
                            }
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            if (this.lstWorkData != null) {
                                if (this.lstWorkData.length > 0) {
                                    this.workStation = true;
                                    this.goBackForm = true;
                                    this.dept = false;
                                }
                                else {
                                    this.workStation = false;
                                    this.growlMessage = [];
                                    this.goBackForm = true;
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Allocated Workstations were found' });
                                }
                            }
                            else {
                                this.workStation = false;
                                this.growlMessage = [];
                                this.goBackForm = true;
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'No Allocated Workstations were found' });
                            }
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.displayCatchException(ex);
        }
    }

    /**
    * this method is for when click on edit button it will show create form
    */
    add() {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Add Workstation / Device';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.createForm = true;
        this.editform = false;
        this.dept = false;
        this.workStationID = "";
        this.workStationDescription = "";
        this.macAddress = "";
        this.growlMessage = [];
        this.disableButton = true;
        this.workStation = false;
        this.goBackForm = false;
        this.mode = ModeEnum[ModeEnum.Add].toString();
    }

    /**
     * this method is for when click on edit button it will show edit form
     * @param ven
     */
    edit(ven) {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Edit Workstation / Device';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.disableButton = false;
        this.createForm = false;
        this.editform = true;
        this.ven = ven;
        this.growlMessage = [];
        this.workStationID = ven.WORKSTATION_ID;
        this.macAddress = ven.WORKSTATION_MAC_ADDRESS;
        this.workStationDescription = ven.WORKSTATION_DESCR;
        this.dept = false;
        this.workStation = false;
        this.goBackForm = false;
        this.mode = ModeEnum[ModeEnum.Edit].toString();
    }

    /**
     * This method is for close the edit form and delete form when ading or updating time
     */
    close() {
        this.breadCrumbMenu.SUB_MENU_NAME = 'Allocate Workstations / Devices - ' + this.deptID;
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.createForm = false;
        this.editform = false;
        this.workStationID = "";
        this.workStationDescription = "";
        this.macAddress = "";
        this.disableButton = true;
        this.growlMessage = [];
        if (this.lstWorkData != null && this.lstWorkData.length > 0) {
            this.workStation = true;
        }
        this.goBackForm = true;
        this.mode = null;
        this.workDescStatus = null;
        this.workIDStatus = null;
        this.macAddressStatus = null;
        this.bindWorkStations(this.deptName, this.orgName);
    }

    /**
     * this method is for saving workstataion details to database
     * @param ven
     */
    async saveWorkStation(ven) {
        try {
            if (this.workStationID == null || this.workStationID == "" || this.workStationID == undefined) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter Valid Workstation ID/Device ID' });
                return;
            }
            else if (this.macAddress == null || this.macAddress == "" || this.macAddress == undefined) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter Valid MAC Address' });
                return;
            }
            else {
                await this.pouDeptAllocateService.addHospGroupWorkstations(this.deptName, this.workStationID, this.workStationDescription, this.macAddress, this.orgName)
                    .subscribe(res => {
                        this.growlMessage = [];
                        if (res.StatusCode == AtparStatusCodes.S_WORKSTATION_EXIST) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Workstation ID/Mac Address already exists' });
                            this.spinnerService.stop();
                            return;
                        }
                        else {
                            switch (res.StatType) {
                                case StatusType.Success: {
                                    let msg = AtParConstants.Created_Msg.replace("1%", "Workstation").replace("2%", this.workStationID);
                                    this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: msg });
                                    //this.bindWorkStations(this.deptName, this.orgName);
                                    this.createForm = true;
                                    this.workStationID = "";
                                    this.workStationDescription = "";
                                    this.macAddress = "";
                                    (<HTMLInputElement>document.getElementById('txtworkStationID')).focus();
                                    this.spinnerService.stop();
                                    break;
                                }
                                case StatusType.Warn: {
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                    this.spinnerService.stop();
                                    break;
                                }
                                case StatusType.Error: {
                                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                    this.spinnerService.stop();
                                    break;
                                }
                                case StatusType.Custom: {
                                    this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                    this.spinnerService.stop();
                                    break;
                                }
                            }
                        }
                    });
            }
        }
        catch (ex) {
            this.displayCatchException(ex);
        }
    }

    /**
     * This method is for when we clcik gobac button it will redirect to department page
     */
    goBack() {
        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.workStation = false;
        this.growlMessage = [];
        this.headForm = true;
        this.goBackForm = false;
        this.disableButton = true;
        this.pageName = "";
        if (isNaN(this.intAppID)) {
            // this.pageName = "Point of Use - Department Device Allocation";
            this.pageHeader = "PointOfUse";
        }
        else {
            if (this.intAppID != EnumApps.PointOfUse) {
                //   this.pageName = "AtPaRx - Department Device Allocation";
                this.pageHeader = "ATPARX";
            }
            else {
                //   this.pageName = "Point of Use - Department Device Allocation";
                this.pageHeader = "PointOfUse";
            }
        }
        this.dept = false;
        this.createForm = false;
        this.editform = false;
        this.workDescStatus = null;
        this.workIDStatus = null;
        this.macAddressStatus = null;
    }

    /**
     * deleting a record from workstation grid
     * @param workstation
     */
    async deleteRow(workstation) {
        this.growlMessage = [];
        this.createForm = false;
        this.editform = false;
        try {
            this.confirmationService.confirm({
                message: "Are you sure you want to delete " + workstation + " workstation?",
                accept: async () => {
                    this.spinnerService.start();
                    var blnVar: boolean;
                    await this.checkWksCartAllocation(workstation, this.deptName);
                    if (this.iswksExists == true) {
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'This Workstation is assigned to a Cart, Unassign before deleting' });
                        return;
                    }
                    else {
                        this.pouDeptAllocateService.deleteHospgroupWorkstation(this.deptName, workstation).
                            catch(this.httpService.handleError).then((res: Response) => {
                                let data = res.json() as AtParWebApiResponse<number>;
                                this.spinnerService.stop();
                                this.growlMessage = [];
                                switch (data.StatType) {
                                    case StatusType.Success: {
                                        let msg = AtParConstants.Deleted_Msg.replace("1%", "Workstation").replace("2%", workstation);
                                        this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: msg });
                                        //this.bindWorkStations(this.deptName, this.orgName);
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
                    this.bindWorkStations(this.deptName, this.orgName);
                }
            });
            this.spinnerService.stop();
        }
        catch (ex) {
            this.displayCatchException(ex);
        }
    }

    /**
     * Checking if workstation alreday exists or not
     * @param workStation
     * @param deptID
     */
    async  checkWksCartAllocation(workStation, deptID) {
        try {

            let rcount: number = 0;
            await this.pouDeptAllocateService.getCartWorkstations('', '', this.orgName, this.intAppID).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_POU_DEPT_WORKSTATIONS>;
                    this.lstWrkStationDetails = [];
                    this.growlMessage = [];

                    this.lstWrkStationDetails = data.DataList;
                    var filterData = this.lstWrkStationDetails.filter(a => a.DEPARTMENT_ID == deptID && a.WORKSTATION_ID == workStation);
                    if (filterData.length > 0) {
                        this.iswksExists = true;
                    }
                    else { this.iswksExists = false; }
                });

        }
        catch (ex) {
            this.displayCatchException(ex);
        }
    }

    /**
     * This Method is for Updating Work Station Details 
     */
    async updateWorkStation() {
        try {
            if (this.macAddress == null || this.macAddress == "" || this.macAddress == undefined) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter Valid MAC Address' });
                return;
            }
            else {
                await this.pouDeptAllocateService.updateHospGroupWorkstations(this.deptName, this.workStationID, this.workStationDescription, this.macAddress)
                    .subscribe(res => {
                        this.growlMessage = [];
                        if (res.StatusCode == AtparStatusCodes.S_WORKSTATION_EXIST) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Mac Address already exists' });
                            this.spinnerService.stop();
                            return;
                        }
                        else {
                            switch (res.StatType) {
                                case StatusType.Success: {
                                    let msg = AtParConstants.Updated_Msg.replace("1%", "Workstation").replace("2%", this.workStationID);
                                    this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: msg });
                                    //this.bindWorkStations(this.deptName, this.orgName);
                                    this.editform = true;
                                    //this.workStationID = "";
                                    //this.workStationDescription = "";
                                    //this.macAddress = "";
                                    (<HTMLInputElement>document.getElementById('txtworkStationDescription1')).focus();
                                    this.spinnerService.stop();
                                    break;
                                }
                                case StatusType.Warn: {
                                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                                    this.spinnerService.stop();
                                    break;
                                }
                                case StatusType.Error: {
                                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                                    this.spinnerService.stop();
                                    break;
                                }
                                case StatusType.Custom: {
                                    this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                                    this.spinnerService.stop();
                                    break;
                                }
                            }

                        }
                    });
            }
        }
        catch (ex) {
            this.displayCatchException(ex);
        }
    }

    /**
     * This method is for disable submit button untill all basic info is entered 
     * @param event
     */
    bindModelDataChange(event: any) {
        try {
            if ("txtworkStationID" == event.TextBoxID.toString()) {
                this.workIDStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("txtMacAddress" == event.TextBoxID.toString()) {
                this.workDescStatus = event.validationrules.filter(x => x.status == false).length;
            }

            if ("txtMacAddress1" == event.TextBoxID.toString()) {
                this.macAddressStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("txtworkStationDescription" == event.TextBoxID.toString()) {
                this.descStatus = event.validationrules.filter(x => x.status == false).length;
            }
            if ("txtworkStationDescription1" == event.TextBoxID.toString()) {
                this.desc1Status = event.validationrules.filter(x => x.status == false).length;
            }
            if (this.mode == ModeEnum[ModeEnum.Add].toString()) {

                if (this.workIDStatus == 0 && this.workDescStatus == 0 && (this.descStatus == 0 || this.descStatus == undefined)) {
                    this.disableButton = false;
                }
                else {
                    this.disableButton = true;
                }
            }

            if (this.mode == ModeEnum[ModeEnum.Edit].toString()) {
                if ((this.macAddressStatus == 0 || this.macAddressStatus == undefined) && (this.desc1Status == 0 || this.desc1Status == undefined)) {
                    this.disableButton = false;
                }
                else {
                    this.disableButton = true;
                }
            }
        }
        catch (ex) {
            this.displayCatchException(ex);
        }
    }

    /**
     * This method is for displaying catch block error messages 
     * @param event
     */
    displayCatchException(ex) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, ex.toString());

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
        this.lstWorkData = [];
        this.workStation = false;
        this.dept = true;
        this.createForm = false;
        this.editform = false;
        this.workStationID = "";
        this.workStationDescription = "";
        this.macAddress = "";
        this.deptName = "";
        this.orgName = "";
        this.disableButton = true;
        this.ven = [];
        this.recordsPerPageSize = 0;
        this.intAppID = 0;
        this.pageName = "";
        this.departmentID = "";
        this.deptDescr = "";
        this.headForm = true;
        this.goBackForm = false;
        this.mode = null;
        this.blnPageName = false;
    }
}