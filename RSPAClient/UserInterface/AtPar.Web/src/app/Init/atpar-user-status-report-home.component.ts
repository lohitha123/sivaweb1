/// <reference path="atpar-user-status-report.component.service.ts" />
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Http, Response } from "@angular/http";
import { VM_USER_STATUS } from '../../app/Entities/VM_USER_STATUS';
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { TokenEntry_Enum, ClientType, ModeEnum, EnumApps } from '../Shared/AtParEnums';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { StatusType } from '../Shared/AtParEnums';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { Message } from '../components/common/api';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { AtParConstants } from '../Shared/AtParConstants';
import { UserStatusReportService } from '../../app/Init/atpar-user-status-report.component.service';
import { MT_ATPAR_SECURITY_AUDIT } from '../../app/Entities/MT_ATPAR_SECURITY_AUDIT';
import { AtParSharedDataService } from "../Shared/AtParSharedDataService";
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { Menus } from '../AtPar/Menus/routepath';
declare var module: {
    id: string;
}
@Component({

    templateUrl: 'atpar-user-status-report-home.component.html',
    providers: [HttpService, AtParCommonService, AtParConstants, UserStatusReportService]
})

export class UserStatusReportHomeComponent {

    deviceTokenEntry: string[] = [];
    showGrid: boolean = false;
    recordsPerPageSize: number;
    growlMessage: Message[] = [];
    isAuditRequired: string = "";
    lstDBData: VM_USER_STATUS[];
    statusList: any;
    userID: string = '';
    firstName: string = '';
    lastName: string = '';
    status: string = '';
    isDisabled: boolean = false;
    isHidden: boolean = false;
    breadCrumbMenu: Menus;

    constructor(private httpService: HttpService, private _http: Http,
        private spinnerService: SpinnerService,
        private atParConstant: AtParConstants,
        private commonService: AtParCommonService,
        private userService: UserStatusReportService,
        private route: ActivatedRoute,
        private router: Router,
        private atParSharedDataService: AtParSharedDataService) {
        this.breadCrumbMenu = new Menus();

    }

    ngOnInit() {

        this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        this.recordsPerPageSize = + this.deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];

        // checking is Audit enabled for this page
        this.checkAuditAllowed();
        //Active or Inactive for  status column
        this.statusList = [];
        this.statusList.push({ label: 'All', value: null });
        this.statusList.push({ label: 'Active', value: true });
        this.statusList.push({ label: 'InActive', value: false });
    }

    async btnGo_Click() {
        this.showGrid = false;
        try {
            this.lstDBData = new Array<VM_USER_STATUS>();
            this.status = "";
            this.spinnerService.start();
            this.growlMessage = [];
            await this.userService.getUserStatus(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.userID, this.firstName, this.lastName, this.status, this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID], this.deviceTokenEntry[TokenEntry_Enum.ProfileID])
                .forEach((response) => {
                    switch (response.StatType) {
                        case StatusType.Success: {
                            this.lstDBData = [];
                            this.lstDBData = response.DataList;
                            if (this.lstDBData.length > 0) {
                                for (let i = 0; i < this.lstDBData.length; i++) {
                                    let changeDate = this.lstDBData[i].CREATE_DATE;
                                    var dateStr = new Date(changeDate).toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
                                    var date = new Date(dateStr);
                                    this.lstDBData[i].CREATE_DATE = date.toLocaleString();
                                    this.lstDBData[i].CREATE_DATE = this.lstDBData[i].CREATE_DATE.replace(',', ' ');
                                    if (this.lstDBData[i].ACCOUNT_DISABLED) {
                                        this.lstDBData[i].ACCOUNT_DISABLED = false;
                                    } else {
                                        this.lstDBData[i].ACCOUNT_DISABLED = true;
                                    }
                                    if (this.lstDBData[i].USER_ID.toUpperCase() == this.deviceTokenEntry[TokenEntry_Enum.UserID].toUpperCase()) {
                                        this.lstDBData[i].isDisabled = true;
                                    }
                                    else {
                                        this.lstDBData[i].isDisabled = false;
                                    }

                                    if (this.lstDBData[i].USER_ID.toUpperCase() == "ADMIN") {
                                        this.lstDBData[i].isHidden = true;
                                    }
                                    else {
                                        this.lstDBData[i].isHidden = false;
                                    }

                                }
                                this.showGrid = true;
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
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.showGrid = false;
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.showGrid = false;
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                            break;
                        }
                    }
                }

                );

            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnGo_Click");
        }
    }

    ngOnDestroy() {
        this.deviceTokenEntry = null;
        this.growlMessage = null;
        this.lstDBData = null;
    }

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    async checkAuditAllowed() {
        try {
            await this.commonService.getAuditAllowed(0, "mt_user_status.aspx").
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

    async insertAuditData(isActivate: boolean) {
        let auditSecurity: MT_ATPAR_SECURITY_AUDIT;
        let auditSecurityLst: Array<MT_ATPAR_SECURITY_AUDIT>;
        auditSecurityLst = new Array<MT_ATPAR_SECURITY_AUDIT>();


        auditSecurity = new MT_ATPAR_SECURITY_AUDIT();
        auditSecurity.FIELD_NAME = "ACCOUNT_DISABLED";
        auditSecurity.KEY_1 = this.deviceTokenEntry[TokenEntry_Enum.UserID];
        auditSecurity.KEY_2 = "";
        auditSecurity.KEY_3 = "";
        auditSecurity.KEY_4 = "";
        auditSecurity.KEY_5 = "";

        if (isActivate == true) {
            auditSecurity.OLD_VALUE = "0";
            auditSecurity.NEW_VALUE = "1";
        }
        else {
            auditSecurity.OLD_VALUE = "1";
            auditSecurity.NEW_VALUE = "0";
        }

        auditSecurityLst.push(auditSecurity);


        let strScreenName = "mt_user_status.aspx";

        await this.commonService.insertAuditData(auditSecurityLst, this.deviceTokenEntry[TokenEntry_Enum.UserID], strScreenName).
            catch(this.httpService.handleError).then((res: Response) => {
                let response = res.json() as AtParWebApiResponse<MT_ATPAR_SECURITY_AUDIT>;
                switch (response.StatType) {
                    case StatusType.Success: {
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
    }

    changeStatus(user) {
        if (user.isDisabled == true) {
            return;
        }
        this.growlMessage = [];
        this.spinnerService.start();
        let disablestatus = true;
        try {
            if (user.ACCOUNT_DISABLED) {
                disablestatus = false;
            } else {
                disablestatus = true;
            }
            this.userService.updateUserStatus(this.deviceTokenEntry[TokenEntry_Enum.UserID], user.USER_ID, disablestatus)
                .forEach(resp => {
                    switch (resp.StatType) {
                        case StatusType.Success:
                            this.spinnerService.stop();

                            if (this.isAuditRequired == "Y") {
                                this.insertAuditData(user.ACCOUNT_DISABLED);

                                this.spinnerService.stop();
                            } else {
                                this.spinnerService.stop();
                            }

                            this.growlMessage = [];
                            let statusMesssage = AtParConstants.Updated_Msg.replace("1%", "User").replace("2%", user.USER_ID);
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: statusMesssage });

                            break;
                        case StatusType.Error:
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resp.StatusMessage });
                            this.spinnerService.stop();
                            break;
                        case StatusType.Warn:
                            this.growlMessage = [];
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resp.StatusMessage });
                            this.spinnerService.stop();
                            break;
                    }

                });
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "changeStatus");
        }
    }

    async btnEdit_Click(user: VM_USER_STATUS) {

        localStorage.setItem('leftMenuUrl', location.pathname.split('/')[location.pathname.split('/').length - 1]);

        await this.atParSharedDataService.setStorage({ "editUserInfo": user, "mode": ModeEnum.Edit });

        let navigationExtras: NavigationExtras = {
            relativeTo: this.route,
            queryParams: { "mode": ModeEnum.Edit}

        };

        this.breadCrumbMenu.MENU_NAME = "User Status Report";
        this.breadCrumbMenu.ROUTE = 'userstatusreport';
        this.breadCrumbMenu.SUB_MENU_NAME = 'User Properties';
        this.breadCrumbMenu.APP_NAME = 'AtPar';
        this.breadCrumbMenu.IS_DIV = false;
        user.ACCOUNT_DISABLED = !user.ACCOUNT_DISABLED;
       //localStorage.setItem('localBreadCrumb', JSON.stringify(this.breadCrumbMenu));
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.router.navigate(['adduser'], navigationExtras);
       

    }

}