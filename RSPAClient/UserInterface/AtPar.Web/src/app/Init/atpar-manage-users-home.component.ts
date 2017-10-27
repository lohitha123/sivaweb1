import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { HttpService } from '../Shared/HttpService';
import { Headers, Http, Response } from '@angular/http';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { MT_ATPAR_APP } from '../entities/mt_atpar_app';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { TokenEntry_Enum, ClientType, ModeEnum, EnumApps } from '../Shared/AtParEnums';
import { AtParSharedDataService } from "../Shared/AtParSharedDataService";
import { StatusType } from '../Shared/AtParEnums';
import { Message, SelectItem } from '../components/common/api';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { ManageUsersServices } from '../../app/Init/atpar-manage-users.service';
import { AtParConstants } from '../Shared/AtParConstants';
import { DataTable } from '../components/datatable/datatable';
import { Menus } from '../AtPar/Menus/routepath';


declare var module: {
    id: string;
}

@Component({

    templateUrl: 'atpar-manage-users.component.html',
    providers: [HttpService, AtParCommonService, ManageUsersServices, AtParConstants],
})

export class ManageUsersHomeComponent {
    @ViewChild(DataTable) dataTableComponent: DataTable;
    _deviceTokenEntry: string[] = [];
    pazeSize: number;
    searchText: any;
    lstUserData: any = [];
    lstAutoSearchUser: any = [];
    filteredUsers: any[] = [{ "FIRST_NAME": '', "LAST_NAME": '', "USER_ID": '', "SEARCH_STRING": '' }];
    mode: string;
    growlMessage: Message[] = [];
    ddlStatusType: SelectItem[] = [];
    strAuditAllowed: string;
    disableAddUser: boolean = false;
    breadCrumbMenu: Menus;
    grdshow: boolean=false;

    constructor(
        private httpService: HttpService,
        private http: Http,
        private spinnerService: SpinnerService,
        private router: Router,
        private atParSharedDataService: AtParSharedDataService,
        private route: ActivatedRoute,
        private atParCommonService: AtParCommonService,
        private manageUsersServices: ManageUsersServices,
        private atParConstant: AtParConstants
    ) {
        this.breadCrumbMenu = new Menus();
        this.route.queryParams.subscribe(params => {
            this.mode = params["mode"];
        });
        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
    }

    async ngOnInit() {
        alert(navigator.onLine);
        if (navigator.onLine) {
            this.spinnerService.start();
            this.pazeSize = + this._deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
            await this.getAuditAllowed();

            await this.isMenuAssigned();

            await this.getManageUsers();

            var fromPage;
            if (this.atParSharedDataService.storage != null) {
                fromPage = this.atParSharedDataService.storage.fromPage;
                if (fromPage == "AddUser") {
                    await this.btnGo_Click();
                }
            }
            this.ddlStatusType = [];
            this.ddlStatusType.push({ label: 'All', value: null });
            this.ddlStatusType.push({ label: 'Active', value: 'Active' });
            this.ddlStatusType.push({ label: 'InActive', value: 'InActive' });
        }
        else
        {
            alert('offline mode');
        }

    }

    async getAuditAllowed() {
        try {
            await this.atParCommonService.getAuditAllowed(EnumApps.Auth, 'mt_atpar_users.aspx')
                .catch(this.httpService.handleError).then((result: Response) => {
                    let res = result.json() as AtParWebApiResponse<any>;
                    if (res.StatType == StatusType.Success) {
                        this.strAuditAllowed = res.Data;
                        //  this.strAuditAllowed = 'Y'; // (kept for Testing)
                        sessionStorage.setItem("strAuditAllowed", this.strAuditAllowed);
                    }
                    else if (res.StatType == StatusType.Warn) {
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                    }
                    else {
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getAuditAllowed");
        }
    }

    async isMenuAssigned() {
        try {
            var strChkMenuName = "add user";
            await this.manageUsersServices.isMenuAssigned(strChkMenuName).
                catch(this.httpService.handleError).then((result: Response) => {
                    let res = result.json() as AtParWebApiResponse<any>;
                    this.disableAddUser = false
                    if (res.StatType == StatusType.Success) {
                        if (res.DataVariable == 0) {
                            this.disableAddUser = true;
                        }
                    }
                    else if (res.StatType == StatusType.Warn) {
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                    }
                    else {
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "isMenuAssigned");
        }
    }

    async getManageUsers() {
        try {
            await this.manageUsersServices.getManageUsers().
                catch(this.httpService.handleError).then((result: Response) => {
                    let res = result.json() as AtParWebApiResponse<any>;
                    this.spinnerService.stop();
                    if (res.StatType == StatusType.Success) {
                        this.lstAutoSearchUser = res.DataList;

                    } else if (res.StatType == StatusType.Warn) {
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                    } else {
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getManageUsers");
        }
    }

    async btnGo_Click() {
        this.grdshow = false;
        var searchString = "";
        if (this.searchText == undefined || this.searchText == null) {
            searchString = "";
            this.searchText = "";
        }
        if (this.searchText.USER_ID != undefined && this.searchText.USER_ID != null) {
            searchString = this.searchText.USER_ID;
        } else {
            searchString = this.searchText;
        }

        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));

        if (this._deviceTokenEntry != null) {
            try {
                this.spinnerService.start();
                if (this.dataTableComponent != undefined) {
                    this.dataTableComponent.reset();
                }
                await this.manageUsersServices.getUsers(searchString).
                    catch(this.httpService.handleError).then((result: Response) => {
                        let res = result.json() as AtParWebApiResponse<any>;
                        this.spinnerService.stop();
                        this.lstUserData = [];
                        this.growlMessage = [];
                        if (res.StatType == StatusType.Success) {
                            this.grdshow = true;
                            this.lstUserData = res.DataList;
                            for (var i = 0; i < this.lstUserData.length; i++) {
                                if (this.lstUserData[i].ACCOUNT_DISABLED) {
                                    this.lstUserData[i].ACCOUNT_STATUS = 'InActive';
                                } else {
                                    this.lstUserData[i].ACCOUNT_STATUS = 'Active';
                                }
                            }

                        }
                        else if (res.StatType == StatusType.Warn) {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                        }
                        else {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                        }

                    });
            }
            catch (ex) {
                this.clientErrorMsg(ex, "btnGo_Click");
            }
        }
    }

    filterUser(event) {
        try {
            let query = event.query;
            //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
            this.filteredUsers = [];
            for (let i = 0; i < this.lstAutoSearchUser.length; i++) {
                let user = this.lstAutoSearchUser[i];
                if (user.USER_ID.toLowerCase().indexOf(query.toLowerCase()) == 0) {//user.FIRST_NAME.toLowerCase().indexOf(query.toLowerCase()) == 0 || user.LAST_NAME.toLowerCase().indexOf(query.toLowerCase()) == 0 ||
                    user.SEARCH_STRING = user.FIRST_NAME + " " + user.LAST_NAME + " (" + user.USER_ID + ")";
                    this.filteredUsers.push(user);
                }
            }
            return this.filteredUsers;
        } catch (ex) {
            this.clientErrorMsg(ex, "filterUser");
        }
    }

    async btnEdit_Click(userRow) {  
       localStorage.setItem('leftMenuUrl', location.pathname.split('/')[location.pathname.split('/').length - 1]);

       await this.atParSharedDataService.setStorage({ "editUserInfo": userRow, "mode": ModeEnum.Edit });
       let navigationExtras: NavigationExtras = {
                     
            relativeTo: this.route,
             queryParams: { "mode": ModeEnum.Edit }
       };

       this.breadCrumbMenu.MENU_NAME = "Manage Users";
       this.breadCrumbMenu.ROUTE = 'manageusers';
       this.breadCrumbMenu.SUB_MENU_NAME = 'Edit User';
       this.breadCrumbMenu.APP_NAME = 'AtPar';
       this.breadCrumbMenu.IS_DIV = false;
      // localStorage.setItem('localBreadCrumb', JSON.stringify(this.breadCrumbMenu));
       this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
       await this.router.navigate(['adduser'], navigationExtras); 
    
    }

    async btnAddNewUser_Click() {
        //localStorage.setItem('leftMenuUrl', location.pathname.split('/')[location.pathname.split('/').length - 1]);
       let navigationExtras: NavigationExtras = {
           relativeTo: this.route,
           queryParams: { "mode": ModeEnum.Add },
       };
       this.breadCrumbMenu.MENU_NAME = "Add User";
       this.breadCrumbMenu.ROUTE = 'adduser';
       this.breadCrumbMenu.SUB_MENU_NAME = '';
       this.breadCrumbMenu.APP_NAME = 'AtPar';
       this.breadCrumbMenu.IS_DIV = false;
      // localStorage.setItem('localBreadCrumb', JSON.stringify(this.breadCrumbMenu));
       this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
       await this.router.navigate(['adduser'], navigationExtras);
   }

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    ngOnDestroy() {
        this.searchText = '';
        this.lstUserData = [];
        this._deviceTokenEntry = [];
        this.growlMessage = [];
        this.spinnerService = null;
        if (this.atParSharedDataService.storage != null && this.atParSharedDataService.storage != null) {
            if (this.atParSharedDataService.storage.fromPage == "AddUser") {
                this.atParSharedDataService.storage.fromPage = null;
            }
        }
    }

 
}