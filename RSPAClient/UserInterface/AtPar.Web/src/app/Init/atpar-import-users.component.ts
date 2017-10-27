import { Component, OnDestroy, ViewChild } from '@angular/core';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { TokenEntry_Enum, ClientType, ModeEnum } from '../Shared/AtParEnums';
import { SelectItem, Message } from '../components/common/api';
import { StatusType, EnumApps } from '../Shared/AtParEnums';
import { AddUserServices } from '../../app/Init/atpar-add-user.service';
import { MT_ATPAR_USER } from '../entities/mt_atpar_user';
import { VM_MT_ATPAR_USER_ADD } from '../entities/vm_mt_atpar_user_add';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { AtParConstants } from '../Shared/AtParConstants';
import { DataTable } from '../components/datatable/datatable';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { Menus } from '../AtPar/Menus/routepath';
import { Http, Response } from "@angular/http";

declare var module: {
    id: string;
}
@Component({
    templateUrl: 'atpar-import-users.component.html',
    providers: [AddUserServices, AtParCommonService, AtParConstants]
})

export class ImportUsersComponent {
    @ViewChild(DataTable) dataTableComponent: DataTable;
    _deviceTokenEntry: any;
    lstLdapUserData: MT_ATPAR_USER[] = [];
    lstLdapUser: VM_MT_ATPAR_USER_ADD[] = [];
    growlMessage: Message[] = [];
    searchImpUser: any = { FilterText: '', EntryLimit: '' };
    pazeSize: number;
    resType: any;
    displayImportUsersDialog: boolean = false;
    orgGroups: any = [];
    profiles: any = [];
    dropdownOrgData: SelectItem[] = [];
    dropdownProfileData: SelectItem[] = [];
    TOKEN_EXPIRY_PERIOD: any;
    IDLE_TIME: any;
    ORG_GROUP_ID: any;
    PROFILE_ID: any;
    disableButton: boolean = true;
    tokenStatus: number;
    idleTimeStatus: number;
    isVisible: boolean = false;
    showStatusMessage: boolean = false;
    statusMessage: string;
    isSave: boolean = false;
    breadCrumbMenu: Menus;

    constructor(private spinnerService: SpinnerService,
        private addUserServices: AddUserServices,
        private atParCommonService: AtParCommonService,
        private httpService: HttpService,
        private atParConstant: AtParConstants) {
        this.breadCrumbMenu = new Menus();
        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
    }

    ngOnInit() {
        this.pazeSize = + this._deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
    }

    //============= GO CLICK EVENT=============//
    async btnGo_Click(searchImpUser) {
        try {
            this.isSave = false;
            this.growlMessage = [];
            this.lstLdapUserData = [];
            this.isVisible = false;
            if (searchImpUser.EntryLimit != '' && searchImpUser.EntryLimit != null) {
                var strNumbers = '0123456789';
                for (var i = 0; i < searchImpUser.EntryLimit.length; i++) {
                    if (strNumbers.indexOf(searchImpUser.EntryLimit[i]) == -1) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Only numbers are allowed in Entry Limit' });
                        return;
                    }
                }

            }
            this.spinnerService.start();
            if (this.dataTableComponent != undefined) {
                this.dataTableComponent.reset();
            }
            this.showStatusMessage = false;
            await this.addUserServices.getLdapUsers(this._deviceTokenEntry[TokenEntry_Enum.UserID], searchImpUser.FilterText, searchImpUser.EntryLimit).then((res: Response) => {
                this.spinnerService.stop();
                let data = res.json();
                if (data.StatType == StatusType.Success) {
                    this.lstLdapUserData = data.DataList;
                    for (var i = 0; i < this.lstLdapUserData.length; i++) {
                        if (this.lstLdapUserData[i].FIRST_NAME == '' || this.lstLdapUserData[i].LAST_NAME == '' || this.lstLdapUserData[i].USER_ID == '') {
                            this.showStatusMessage = true;
                            this.statusMessage = 'Note: User cannot be imported, if the required fields information is missing from LDAP.';
                        }
                        this.lstLdapUserData[i].SELECTED_USER = false;
                        if (this.lstLdapUserData[i].FIRST_NAME.length > 20 || this.lstLdapUserData[i].LAST_NAME.length > 20 ||
                            this.lstLdapUserData[i].MIDDLE_INITIAL.length > 2 || this.lstLdapUserData[i].EMAIL_ID.length > 50 ||
                            this.lstLdapUserData[i].PHONE1.length > 12 || this.lstLdapUserData[i].FAX.length > 15) {
                            this.lstLdapUserData[i].VALID_USER = 'INVALID';
                        } else {
                            this.lstLdapUserData[i].VALID_USER = 'VALID';
                        }
                    }
                    this.isVisible = true;

                } else if (data.StatType == StatusType.Warn) {
                    this.isVisible = false;
                    if (data.StatusCode == AtparStatusCodes.ATPAR_E_USERALREADYEXISTS) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Users all are imported' });
                    } else {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                    }
                }
                else if (data.StatType == StatusType.Error) {
                    this.isVisible = false;
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnGo_Click");
        }

    }
    //============= GO CLICK EVENT END=========//

    //=============USER SELECT EVENT===========//
    swtUser_Change(e, user) {
        try {
            if (user.VALID_USER == 'INVALID') {
                this.checkUserDetails(user);
            } else {
                if (e) {
                    this.lstLdapUser.push(user);
                } else {
                    for (var i = 0; i < this.lstLdapUser.length; i++) {
                        if (this.lstLdapUser[i].USER_ID === user.USER_ID) {
                            var index = this.lstLdapUser.indexOf(this.lstLdapUser[i], 0)
                            this.lstLdapUser.splice(index, 1);
                        }
                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "swtUser_Change");
        }
    }

    //=============USER SELECT EVENT END=======//

    //=============CHECK USER TO IMPORT========//
    checkUserDetails(user) {
        this.growlMessage = []
        if (user.FIRST_NAME.length > 20) {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: user.USER_ID + ' User Cannot be imported First Name text should be Less than or Equal to 20 Characters' });
        }
        else if (user.LAST_NAME.length > 20) {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: user.USER_ID + ' User Cannot be imported Last Name text should be Less than or Equal to 20 Characters' });
        }
        else if (user.MIDDLE_INITIAL.length > 2) {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: user.USER_ID + ' User Cannot be imported Middle Initial text should be Less than or Equal to 2 Characters' });
        }
        else if (user.EMAIL_ID.length > 50) {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: user.USER_ID + ' User Cannot be imported Email text should be Less than or Equal to 50 Characters' });
        }
        else if (user.PHONE1.length > 12) {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: user.USER_ID + ' User Cannot be imported Phone 1 text should be Less than or Equal to 12 Characters' });
        }
        else if (user.FAX.length > 15) {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: user.USER_ID + ' User Cannot be imported Fax text should be Less than or Equal to 15 Characters' });
        }
    }
    //=============CHECK USER TO IMPORT END====//


    //=============CHECK ALL TO IMPORT========//
    chkAll_Click() {
        try {
            this.spinnerService.start();
            var list = []
            this.lstLdapUser = [];
            for (var i = 0; i < this.lstLdapUserData.length; i++) {
                if (this.lstLdapUserData[i].FIRST_NAME != '' && this.lstLdapUserData[i].LAST_NAME != '' && this.lstLdapUserData[i].USER_ID != '') {
                    if ((this.lstLdapUserData[i].FIRST_NAME.length) > 20 || (this.lstLdapUserData[i].LAST_NAME.length) > 20 || (this.lstLdapUserData[i].MIDDLE_INITIAL.length) > 2
                        || (this.lstLdapUserData[i].EMAIL_ID.length) > 50 || (this.lstLdapUserData[i].PHONE1.length) > 12 || (this.lstLdapUserData[i].FAX.length) > 15) {
                        // if (this.lstLdapUserData[i].VALID_USER != 'VALID') {
                        this.lstLdapUserData[i].SELECTED_USER = false;
                    } else {
                        this.lstLdapUserData[i].SELECTED_USER = true;
                        list.push(this.lstLdapUserData[i]);
                    }
                }
            }
            this.lstLdapUser = list;
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "chkAll_Click");
        }
    }
    //=============CHECK ALL TO IMPORT END====//

    //=============CHECK NONE TO IMPORT========//
    chkNone_Click() {
        try {
            for (var i = 0; i < this.lstLdapUserData.length; i++) {
                this.lstLdapUserData[i].SELECTED_USER = false;
            }
            this.lstLdapUserData = this.lstLdapUserData;
            this.lstLdapUser = [];
        } catch (ex) {
            this.clientErrorMsg(ex, "chkNone_Click");
        }
    }
    //=============CHECK NONE TO IMPORT END====//

    //=============IMPORT CLICK EVENT==========//
    async btnImportUser_Click(val: boolean) {
        this.displayImportUsersDialog = val;
        if (val) {
            this.breadCrumbMenu.SUB_MENU_NAME = 'User(s) Properties';
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
            this.spinnerService.start();
            this.TOKEN_EXPIRY_PERIOD = '';
            this.IDLE_TIME = '';
            this.ORG_GROUP_ID = 'Select Org Group';
            this.PROFILE_ID = 'Select Profile';
            this.disableButton = true;
            this.tokenStatus = 1;
            this.idleTimeStatus = 1;
            await this.bindOrgDropdown();
            if (this.resType.StatType != StatusType.Success) {
                return;
            }
            await this.bindProfileDropdown();
            this.spinnerService.stop();
        }
        else {
            this.breadCrumbMenu.SUB_MENU_NAME = '';
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        }
        // this.lstLdapUser = this.lstLdapUser;
        this.growlMessage = [];
        if (this.isSave) {
            this.growlMessage.push({
                severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'LDAP User(s) Imported Successfully'
            });
        }
    }
    //=============IMPORT CLICK EVENT END======//

    //=============BIND ORG DROPDOWN===========//
    async bindOrgDropdown() {
        try {
            await this.atParCommonService.getUserOrgGroups(this._deviceTokenEntry[TokenEntry_Enum.UserID], this._deviceTokenEntry[TokenEntry_Enum.OrgGrpID])
                .catch(this.httpService.handleError).then((result: Response) => {
                    let res = result.json() as AtParWebApiResponse<string>;
                    this.resType = res;
                    this.growlMessage = [];
                    this.dropdownOrgData = [];
                    if (res.StatType == StatusType.Success) {
                        this.orgGroups = res.DataList;
                        this.dropdownOrgData.push({ label: 'Select Org Group', value: 'Select Org Group' });
                        for (var i = 0; i < this.orgGroups.length; i++) {
                            this.dropdownOrgData.push({ label: (this.orgGroups[i].ORG_GROUP_ID + ' - ' + this.orgGroups[i].ORG_GROUP_NAME), value: this.orgGroups[i].ORG_GROUP_ID })
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
            this.clientErrorMsg(ex, "bindOrgDropdown");
        }
    }
    //=============BIND ORG DROPDOWN END=======//

    //=============BIND PROFILE DROPDOWN=======//
    async bindProfileDropdown() {
        try {
            await this.addUserServices.getProfiles(this._deviceTokenEntry[TokenEntry_Enum.UserID]).then((res: Response) => {
                this.growlMessage = [];
                this.dropdownProfileData = []
                let data = res.json();
                if (data.StatType == StatusType.Success) {
                    this.profiles = data.DataList;
                    this.dropdownProfileData.push({ label: 'Select Profile', value: 'Select Profile' });
                    for (var i = 0; i < this.profiles.length; i++) {
                        if ((this._deviceTokenEntry[TokenEntry_Enum.ProfileID]).toUpperCase() == 'ADMIN') {
                            this.dropdownProfileData.push({ label: (this.profiles[i].PROFILE_ID + ' - ' + this.profiles[i].PROFILE_DESCRIPTION), value: this.profiles[i].PROFILE_ID })
                        }
                        else if ((this.profiles[i].PROFILE_ID).toUpperCase() != 'ADMIN') {
                            this.dropdownProfileData.push({ label: (this.profiles[i].PROFILE_ID + ' - ' + this.profiles[i].PROFILE_DESCRIPTION), value: this.profiles[i].PROFILE_ID })
                        }
                    }
                }
                else if (data.StatType == StatusType.Warn) {
                    this.spinnerService.stop();
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                }
                else {
                    this.spinnerService.stop();
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindProfileDropdown");
        }
    }
    //=============BIND PROFILE DROPDOWN END===//

    //=============SAVE LDAP USER==============//
    async btnSaveLdap_Click() {
        try {
            if (this.TOKEN_EXPIRY_PERIOD == undefined || this.IDLE_TIME == undefined) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please fill mandatory fields' });
            }
            else if (this.TOKEN_EXPIRY_PERIOD.toString().trim() == "" || this.IDLE_TIME.toString().trim() == "") {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please fill mandatory fields' });
            }
            else
                if (this.TOKEN_EXPIRY_PERIOD == 0) {
                    this.growlMessage.push({
                        severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Minimum Session Validity Time should be greater than zero'
                    });
                }
                else if (this.IDLE_TIME == 0) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Minimum Idle Time should be greater than zero' });
                }
                else {
                    if (this.ORG_GROUP_ID == 'Select Org Group' || this.ORG_GROUP_ID == undefined) {
                        this.ORG_GROUP_ID = '';
                    }
                    if (this.PROFILE_ID == 'Select Profile' || this.PROFILE_ID == undefined) {
                        this.PROFILE_ID = '';
                    }
                    this.spinnerService.start();
                    await this.addUserServices.saveLdapUser(this.lstLdapUser, this._deviceTokenEntry[TokenEntry_Enum.UserID],
                        this.TOKEN_EXPIRY_PERIOD, this.IDLE_TIME,
                        this.ORG_GROUP_ID, this.PROFILE_ID)
                        .subscribe((res: Response) => {
                            let data = res.json();
                            this.growlMessage = [];
                            this.spinnerService.stop();
                            switch (data.StatType) {
                                case StatusType.Success:
                                    {
                                        this.isSave = true;
                                        this.TOKEN_EXPIRY_PERIOD = '';
                                        this.IDLE_TIME = '';
                                        this.ORG_GROUP_ID = '';
                                        this.PROFILE_ID = '';
                                        this.disableButton = true;
                                        this.lstLdapUser = [];

                                        this.isVisible = false;
                                        this.lstLdapUserData = [];
                                        this.btnImportUser_Click(false);
                                        break;
                                    }
                                case StatusType.Error:
                                    {
                                        this.spinnerService.stop();
                                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                        break;
                                    }
                                case StatusType.Warn:
                                    {
                                        this.spinnerService.stop();
                                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                        break;
                                    }
                            }

                        });
                }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnSaveLdap_Click");
        }
    }
    //=============SAVE LDAP USER END==============//

    bindModelDataChange(event: any) {
        this.disableButton = true;
        if ("txtSession" == event.TextBoxID.toString()) {
            this.tokenStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("txtIdleTime" == event.TextBoxID.toString()) {
            this.idleTimeStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ((this.tokenStatus == 0 || this.tokenStatus == undefined)
            && (this.idleTimeStatus == 0 || this.idleTimeStatus == undefined)) {
            this.disableButton = false;
        }
        else {
            this.disableButton = true;
        }
    }
    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    ngOnDestroy() {
        this.searchImpUser = { FilterText: '', EntryLimit: '' };
        this.lstLdapUserData = [];
        this.lstLdapUser = []
        this.orgGroups = null;
        this.profiles = null;
        this.dropdownProfileData = null;
        this.dropdownOrgData = null;
        this._deviceTokenEntry = [];
        this.displayImportUsersDialog = false;
        this.growlMessage = [];
        this.spinnerService.stop();
        this.spinnerService = null;

    }
}