/// <reference path="../Shared/AtParEnums.ts" />
import { NgModule, OnInit, Component, ElementRef, AfterViewInit, AfterViewChecked, OnDestroy, Input, Output, EventEmitter, Renderer, ContentChild, ViewChild, trigger, state, style, transition, animate } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { AtParConstants } from '../Shared/AtParConstants';
import { HttpService } from '../Shared/HttpService';
import { Http, Response } from "@angular/http";
import { MT_POU_DEPT } from '../../app/Entities/MT_POU_DEPT';
import { StatusType } from '../Shared/AtParEnums';
import { AtParSharedDataService } from "../Shared/AtParSharedDataService";
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { Message } from '../components/common/api';
import { TokenEntry_Enum, ClientType, EnumApps } from '../Shared/AtParEnums';
import { DepartmentUserAllocationServiceComponent } from './pou-department-user-allocation.component.service'
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { VM_ATPAR_DEPT_USER } from '../../app/Entities/VM_ATPAR_DEPT_USER';
import { SelectItem } from '../components/common/api';
import { MT_ATPAR_USER } from '../../app/Entities/mt_atpar_user';
import { List, Enumerable } from 'linqts';
import { asEnumerable } from 'linq-es5';
import { ConfirmationService } from '../components/common/api';
import { DataTable } from "../components/datatable/datatable"
import { Menus } from '../AtPar/Menus/routepath';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
declare var module: {
    id: string;
}
@Component({

    selector: 'atpar-dept-user-alloc-assign',
    templateUrl: 'pou-department-user-allocation.Assign.component.html',

    providers: [datatableservice, AtParCommonService, DepartmentUserAllocationServiceComponent, AtParConstants, ConfirmationService]
})

export class DepartmentUserAllocationAssignComponent implements OnInit {
    @ViewChild(DataTable) dataTableComponent: DataTable;
    deviceTokenEntry: string[] = [];
    recordsPerPageSize: number;
    growlMessage: Message[] = [];
    public newItem = new MT_POU_DEPT();
    lstDBData: VM_ATPAR_DEPT_USER[];
    lstDBUserCheckedData: VM_ATPAR_DEPT_USER[];
    addUserAlloc: boolean = false;
    blnShowUserIdLabel: boolean = false;
    blnShowUserIdDD: boolean = false;
    selectedUserID: string;
    showHideGrid: boolean = false;
    showHideForGoback: boolean = false;
    public lstUsers: SelectItem[] = [];
    blnHomeDept: boolean = false;
    UserId: string;
    Mode: string;
    AppId: number;
    DeptId: string;
    pageName: string = "";
    editMsg: string = "";
    breadCrumbMenu: Menus;
    statusCode: number = -1;
    constructor(private httpService: HttpService, private _http: Http, public dataservice: datatableservice,
        private commonService: AtParCommonService,
        private deptUserAllocationService: DepartmentUserAllocationServiceComponent,
        private spinnerService: SpinnerService,
        private atParConstant: AtParConstants,
        private router: Router,
        private route: ActivatedRoute,
        private confirmationService: ConfirmationService,
        private atParSharedDataService: AtParSharedDataService) {
        this.breadCrumbMenu = new Menus();
    }
    ngOnInit() {

        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.recordsPerPageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        this.newItem = this.atParSharedDataService.storage.Departmentdata;
        this.AppId = this.atParSharedDataService.storage.AppId;
        this.BindGrid();
    }
    async BindGrid() {
        if (this.showHideGrid == true) {
            this.dataTableComponent.reset();
        }
        this.spinnerService.start();
        if (this.AppId == EnumApps.PointOfUse) {

            this.pageName = "Department: " + this.newItem.DEPT_ID;

        }
        else {
            this.pageName = "Department: " + this.newItem.DEPT_ID;
        }
        this.showHideGrid = false;
        try {
            await this.deptUserAllocationService.GetDepartmentUsers(this.newItem.DEPT_ID, this.newItem.ORG_GROUP_ID).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<VM_ATPAR_DEPT_USER>;

                    switch (data.StatType) {
                        case StatusType.Success: {

                            this.lstDBData = data.DataList;
                            this.showHideGrid = true;
                            this.showHideForGoback = true;
                            for (let i = 0; i <= this.lstDBData.length - 1; i++) {
                                if (this.lstDBData[i].HOME_DEPARTMENT === "Y") {
                                    this.lstDBData[i].checkvalue = true;
                                }
                                this.lstDBData[i].disabled = true
                                if (this.lstDBData[i].CURRENT_HOME_DEPT !== "" && this.lstDBData[i].CURRENT_HOME_DEPT !== this.newItem.DEPT_ID) {
                                    this.lstDBData[i].editMsg = "Home department cannot be edited";
                                    //this.lstDBData[i].disabledForEdit = "disabled";
                                }
                                else {
                                    this.lstDBData[i].editMsg = "Click here to Edit this item";
                                    //this.lstDBData[i].disabledForEdit = "";
                                }
                            }


                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            this.showHideGrid = false;
                            this.showHideForGoback = true;
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            this.showHideGrid = false;
                            this.showHideForGoback = true;
                            this.spinnerService.stop();
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            this.showHideGrid = false;
                            this.showHideForGoback = true;
                            this.spinnerService.stop();
                            break;
                        }
                    }
                });



        }
        catch (ex) {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: AtParConstants.ClientErrorMessage });
            this.spinnerService.stop();
        }

    }

    async addUserAllocation() {
        this.Mode = "I";
        this.addUserAlloc = true;
        await this.bindUsersList();
        this.selectedUserID = "";
        this.blnHomeDept = false;


    }
    async SaveUserAllocation() {
        if (this.Mode === "I") {
            if (this.selectedUserID === "" || this.selectedUserID == undefined) {
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select User" });
                this.spinnerService.stop();
                return;
            }
            await this.CheckForDuplicates(this.selectedUserID);
        }
        else if (this.Mode === "U") {
            this.editSaveUserAllocation()
        }


    }
    async editUserAllocation(editData: VM_ATPAR_DEPT_USER) {
        if (this.addUserAlloc) {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please save or close before continuing!!!" });
        }
        else {
            this.spinnerService.start();
            this.growlMessage = [];
            if (editData.editMsg === "Home department cannot be edited") {
                this.addUserAlloc = false;
                this.spinnerService.stop();
                return;
            }
            this.addUserAlloc = true;
            this.blnShowUserIdDD = false;
            this.blnShowUserIdLabel = true;
            this.UserId = editData.USER_ID;
            this.blnHomeDept = editData.checkvalue;
            this.Mode = "U";
            this.spinnerService.stop();
        }

    }
    async editSaveUserAllocation() {

        await this.AllocateUserToDept(this.UserId, this.blnHomeDept, this.Mode);
    }

    async bindUsersList() {

        try {

            this.lstUsers = [];
            this.lstUsers.push({ label: "Select User", value: "Select User" });
            this.spinnerService.start();
            await this.commonService.getUsersList(this.deviceTokenEntry[TokenEntry_Enum.UserID], 15, this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_USER>;
                    this.growlMessage = [];
                    this.addUserAlloc = true;
                    this.blnShowUserIdDD = true;
                    this.blnShowUserIdLabel = false;
                    switch (data.StatType) {
                        case StatusType.Success: {
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
            this.clientErrorMsg(ex);
        }
    }

    async CheckForDuplicates(UserID) {
        try {
            await this.deptUserAllocationService.GetDepartmentUsers(this.newItem.DEPT_ID, this.newItem.ORG_GROUP_ID).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<VM_ATPAR_DEPT_USER>;
                    this.growlMessage = [];
                    this.lstDBUserCheckedData = data.DataList;
                    this.lstDBUserCheckedData = asEnumerable(this.lstDBUserCheckedData).Where(x => x.USER_ID == UserID).ToArray();
                    if (this.lstDBUserCheckedData.length > 0) {
                        this.growlMessage = [];
                        let statusMessage = AtParConstants.AlreadyExist_Msg.replace("1%", "User").replace("2%", UserID);
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: statusMessage });
                        this.addUserAlloc = false;
                        return;
                    }
                    else {
                        this.AllocateUserToDept(UserID, this.blnHomeDept, "I")
                    }

                });



        }
        catch (ex) {
            this.clientErrorMsg(ex);
        }
    }

    async AllocateUserToDept(UserId, BlnHomeDept, Mode) {

        if (BlnHomeDept != undefined) {
            this.spinnerService.start();
            this.statusCode = -1;
            try {
                await this.deptUserAllocationService.AllocateUserToDepartment(this.newItem.DEPT_ID, UserId, this.newItem.ORG_GROUP_ID.trim(), BlnHomeDept, Mode).
                    catch(this.httpService.handleError).then((res: Response) => {
                        let data = res.json() as AtParWebApiResponse<VM_ATPAR_DEPT_USER>;
                        this.statusCode = data.StatusCode;
                        this.growlMessage = [];
                        switch (data.StatType) {
                            case StatusType.Success: {

                                break;
                            }
                            case StatusType.Warn: {
                                this.addUserAlloc = false;
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });


                                break;
                            }
                            case StatusType.Error: {
                                this.addUserAlloc = false;
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });


                                break;
                            }
                            case StatusType.Custom: {
                                this.addUserAlloc = false;
                                this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });


                                break;
                            }
                        }
                    });

                if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
                    this.addUserAlloc = false;
                    await this.BindGrid();

                    if (this.Mode === "I") {
                        //let statusMessage = AtParConstants.Created_Msg.replace("1%", "User").replace("2%", UserId);
                        let statusMessage = ("User " + UserId + " Added Successfully")
                        this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: statusMessage });
                    }
                    else if (this.Mode === "U") {
                        let statusMessage = AtParConstants.Updated_Msg.replace("1%", "User").replace("2%", UserId);
                        this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: statusMessage });
                    }

                }

            }
            catch (ex) {
                this.clientErrorMsg(ex);
            }
            finally {
                this.spinnerService.stop();
            }
        }
        else {
            this.addUserAlloc = false;
            this.spinnerService.start();
            this.growlMessage = [];
            let statusMessage = AtParConstants.Updated_Msg.replace("1%", "User").replace("2%", UserId);
            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: statusMessage });
            this.spinnerService.stop();
        }



    }


    async DeallocateUserToDepartment(deleteData: VM_ATPAR_DEPT_USER) {
        if (this.addUserAlloc) {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please save or close before continuing!!!" });
        }
        else {
            //this.spinnerService.start();
            try {
                this.growlMessage = [];
                this.confirmationService.confirm({
                    message: "Are you sure you want to delete this user " + deleteData.USER_ID + '?',
                    accept: () => {


                        this.deptUserAllocationService.DeallocateUserToDepartment(this.newItem.DEPT_ID, deleteData.USER_ID).
                            catch(this.httpService.handleError).then((res: Response) => {
                                let data = res.json() as AtParWebApiResponse<VM_ATPAR_DEPT_USER>;
                                this.growlMessage = [];

                                switch (data.StatType) {
                                    case StatusType.Success: {
                                        let statusMessage = AtParConstants.Deleted_Msg.replace("1%", "User").replace("2%", deleteData.USER_ID);
                                        this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: statusMessage });
                                        this.BindGrid();
                                        //this.spinnerService.stop();
                                        break;
                                    }
                                    case StatusType.Warn: {

                                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        //this.spinnerService.stop();
                                        break;
                                    }
                                    case StatusType.Error: {
                                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        //this.spinnerService.stop();
                                        break;
                                    }
                                    case StatusType.Custom: {
                                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                        //this.spinnerService.stop();
                                        break;
                                    }
                                }

                            });

                    },
                    reject: () => {
                        //this.spinnerService.stop();
                    }



                });

            } catch (ex) {
                this.clientErrorMsg(ex);
            }
        }
    }

    clientErrorMsg(strExMsg) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString());
    }

    navigateToPOUUserAllocationHome() {

        this.breadCrumbMenu.SUB_MENU_NAME = '';
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        let navigationExtras: NavigationExtras = {

            relativeTo: this.route
        };
        this.router.navigate(['../'], navigationExtras);
    }

    close() {
        this.addUserAlloc = false;
        this.growlMessage = [];
    }

    ngOnDestroy() {
        this.deviceTokenEntry = null;
        this.lstDBData = null;
        this.lstUsers = null;
        this.growlMessage = null;

    }
}