import { Component, OnDestroy, Inject   } from '@angular/core';
import { Http, Response, Jsonp, RequestOptions, Headers, } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { SpinnerService } from '../components/spinner/event.spinner.service';
import { TokenEntry_Enum, ClientType, ModeEnum } from '../Shared/AtParEnums';
import { SelectItem } from '../components/common/api';
import { StatusType, EnumApps } from '../Shared/AtParEnums';
import { Message } from '../components/common/api';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { AtParSharedDataService } from "../Shared/AtParSharedDataService";
import { AddUserServices } from '../../app/Init/atpar-add-user.service';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { MT_ATPAR_USER } from '../entities/mt_atpar_user';
import { VM_MT_ATPAR_USER_ADD } from '../entities/vm_mt_atpar_user_add';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';
import { AtParConstants } from '../Shared/AtParConstants';
import { MT_ATPAR_SECURITY_PARAMS } from '../Entities/MT_ATPAR_SECURITY_PARAMS';
import { Menus } from '../AtPar/Menus/routepath';
import  {  DOCUMENT }  from  '@angular/platform-browser'; 
declare var module: {
    id: string;
}
@Component({
    templateUrl: 'atpar-add-user.component.html',
    providers: [AddUserServices, AtParCommonService, AtParConstants],
})

export class AddUserComponent {
    _deviceTokenEntry: string[] = [];
    pazeSize: any;
    addUserData = new VM_MT_ATPAR_USER_ADD();
    editUserInfo: any = null;
    searchImpData: any = { FIRST_NAME: '', LAST_NAME: '', USER_ID: '' };
    lstLdapUserData: any = [];
    lstLdapUser: VM_MT_ATPAR_USER_ADD[] = [];
    resType: any;
    securityParams = new MT_ATPAR_SECURITY_PARAMS();
    orgGroups: any = [];
    profiles: any = [];
    dropdownOrgData: SelectItem[] = [];
    dropdownProfileData: SelectItem[] = [];
    growlMessage: Message[] = [];
    arrLst: any = [];

    disableImport: boolean = false;
    showManageEdit: boolean = false;
    displayImportDialog: boolean = false;
    blnPwdChars: boolean = false;
    blnPwdNum: boolean = false;
    blnPwdSplChars: boolean = false;
    continue: boolean = true;
    isImportLDAPUser: boolean = false;
    isLdap: boolean = false;
    ddlOrgGroupEnable: boolean = true;
    ddlProfileEnable: boolean = true;
    chkAccDisable: boolean = true;
    showResetPwdDiv: boolean = true;
    disableButton: boolean = true;
    selectedValue: boolean = false;
    showUploadImage: boolean = false;
    showLdapPwdText: boolean = true;
    enablePasswordRequired: boolean = true;
    enableResetPwdRequired: boolean = true;
    showGoBack: boolean = false;
    strPwdComment: string = '';
    strProtocol: string = '';
    strServerName: string = '';
    strSearchFilter: string = '';
    strFirstNameFilter: string;
    strLastNameFilter: string;
    strUserIDFilter: string;
    strValid: string;
    mode: string;
    stringBuilder: string = '';
    userSelectedFile: string = '';
    userIDStatus: number;
    tokenStatus: number;
    idleTimeStatus: number;
    firstNameStatus: number;
    lastNameStatus: number;
    mNameStatus: number;
    mailStatus: number;
    phone1Status: number;
    phone2Status: number;
    faxStatus: number;
    pagerStatus: number;
    breadCrumbMenu: Menus;

    constructor
        (
        private spinnerService: SpinnerService,
        private router: Router,
        private atParSharedDataService: AtParSharedDataService,
        private route: ActivatedRoute,
        private addUserServices: AddUserServices,
        private atParCommonService: AtParCommonService,
        private httpService: HttpService,
        private atParConstant: AtParConstants,
        private http: Http,
        @Inject(DOCUMENT)  private  document
    ) {
        this.breadCrumbMenu = new Menus();
        this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
    }

    async ngOnInit() {
        this.pazeSize = this._deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
        this.spinnerService.start();
        await this.readConfig();
        if (this.resType.StatType != StatusType.Success) {
            return;
        }
        /* PopulateUserFields*/
        await this.populateUserFields();
        if (this.resType.StatType != StatusType.Success) {
            return;
        }
        await this.bindOrgDropdown();
        if (this.resType.StatType != StatusType.Success) {
            return;
        }
        await this.bindProfileDropdown();
        if (this.resType.StatType != StatusType.Success) {
            return;
        }
        

        /* PopulateUserFields*/
        let temp: boolean = false;
        //var editUserInfo;
        if (this.atParSharedDataService.storage != undefined) {
            this.editUserInfo = this.atParSharedDataService.storage.editUserInfo;
        }
        var strUser = this._deviceTokenEntry[TokenEntry_Enum.UserID].toUpperCase();
        if (this.editUserInfo != null) {
            this.addUserData = this.editUserInfo
            this.showManageEdit = true;
            this.disableButton = false;
            this.showGoBack = true;
            temp = this.addUserData.PASSHASH_REQUIRED
            this.addUserData.PASSWORD = '';
            this.addUserData.CPASSWORD = '';
            this.addUserData.TIME_RESTRICTIONS = '1-12:00,23:59;2-12:00,23:59;3-12:00,23:59;4-12:00,23:59;5-12:00,23:59;6-12:00,23:59;7-12:00,23:59;'
            this.ddlOrgGroupEnable = false
            if (this._deviceTokenEntry[TokenEntry_Enum.OrgGrpID] == 'All') {
                this.ddlOrgGroupEnable = true;
            }
            if (this.addUserData.USER_ID.toUpperCase() == 'ADMIN' || this.addUserData.USER_ID.toUpperCase() == strUser) {
                this.ddlOrgGroupEnable = false;
                this.ddlProfileEnable = false;
            }
            if (this.addUserData.USER_ID.toUpperCase() == strUser) {
                this.chkAccDisable = false;
            }
            if (this.addUserData.PASSHASH_REQUIRED) {
                this.showResetPwdDiv = true;
                if (this.addUserData.PASSWD_RESET_REQUIRED == 'Y') {
                    this.addUserData.PWD_RESET_REQUIRED = true;
                } else {
                    this.addUserData.PWD_RESET_REQUIRED = false;
                }
            } else {
                this.showResetPwdDiv = false;
                this.addUserData.PWD_RESET_REQUIRED = false;
            }
            if (this.addUserData.LDAP_USER == 'Y') {
                this.addUserData.LDAP_USER = 'True';
                this.isLdap = true;
                this.isImportLDAPUser = true;
                this.chkAccDisable = true;
                this.addUserData.PASSHASH_REQUIRED = true;
            } else {
                this.addUserData.LDAP_USER = 'False';
                this.isLdap = false;
                this.isImportLDAPUser = false;
            }
            if (this.addUserData.USER_ID.toUpperCase() != strUser) {
                if (this._deviceTokenEntry[TokenEntry_Enum.ProfileID].toUpperCase() == 'ADMIN' && (strUser).toUpperCase() != 'ADMIN') {
                    this.enablePasswordRequired = false;
                    this.enableResetPwdRequired = false;
                    this.chkAccDisable = false;
                }
            }
        }
        //  var ldapUserInfo = JSON.parse(sessionStorage.getItem("ldapUserInfo"));
        var ldapUserInfo;
        if (this.atParSharedDataService.storage != undefined) {
            ldapUserInfo = this.atParSharedDataService.storage.ldapUserInfo;
        }
        if (ldapUserInfo != null) {
            this.addUserData = ldapUserInfo;
            this.isImportLDAPUser = true;
            this.userIDStatus = 0;
            this.firstNameStatus = 0;
            this.lastNameStatus = 0;
            this.addUserData.PASSWORD = '';
            this.addUserData.CPASSWORD = '';
            this.addUserData.PASSHASH_REQUIRED = true;
            this.addUserData.PWD_RESET_REQUIRED = false;
            this.addUserData.TIME_RESTRICTIONS = '1-12:00,23:59;2-12:00,23:59;3-12:00,23:59;4-12:00,23:59;5-12:00,23:59;6-12:00,23:59;7-12:00,23:59;'
            this.showLdapPwdText = false;
        }
        if (this.editUserInfo == null) {

            console.log(this.editUserInfo);
            (<HTMLInputElement>document.getElementById("txtUserID")).focus();
        }
        if (this.editUserInfo != null) {
            setTimeout(function () {
                if (temp) {
                    (<HTMLInputElement>document.getElementById("txtPassword")).focus();
                }
                else {
                    (<HTMLInputElement>document.getElementById("txtToken")).focus();
                }
               
               
            }, 500);
        }
        this.spinnerService.stop();
    }

    async readConfig() {
        try {
            await this.addUserServices.readConfig().then((resType: Response) => {
                let res = resType.json();
                this.growlMessage = [];
                this.resType = res;
                switch (res.StatType) {
                    case StatusType.Success: {
                        this.strProtocol = res.DataDictionary["strProtocol"];
                        this.strSearchFilter = res.DataDictionary["strSearchFilter"];
                        this.strServerName = res.DataDictionary["strServerName"];
                        this.strFirstNameFilter = res.DataDictionary["strFirstNameFilter"];
                        this.strLastNameFilter = res.DataDictionary["strLastNameFilter"];
                        this.strUserIDFilter = res.DataDictionary["strUserIDFilter"];
                        if (this.isNullOrEmpty(this.strProtocol) || this.isNullOrEmpty(this.strSearchFilter) || this.isNullOrEmpty(this.strServerName)) {
                            this.disableImport = true
                        }
                        break;
                    }
                    case StatusType.Warn: {
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                        break;
                    }
                    case StatusType.Error: {
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                        break;
                    }
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "readConfig");
        }
    }

    async populateUserFields() {
        try {
            await this.addUserServices.populateUserFields().then((result: Response) => {
                let res = result.json() as AtParWebApiResponse<MT_ATPAR_SECURITY_PARAMS>;
                this.resType = res;
                this.growlMessage = [];
                if (res.StatType == StatusType.Success) {
                    this.securityParams = res.Data;
                    this.strPwdComment = "Password should be between " +
                        this.securityParams.PASSWD_MIN_LENGTH + " to " +
                        this.securityParams.PASSWD_MAX_LENGTH + " characters. Complexity of the password is ";
                    var intPwdComplexity = this.securityParams.PASSWD_COMPLEXITY;
                    switch (intPwdComplexity) {
                        case 0:
                            {
                                this.strPwdComment = this.strPwdComment + "Any Characters."
                                break;
                            }
                        case 1:
                            {
                                this.strPwdComment = this.strPwdComment + "Alphabets. ie; Combination of A-Z, a-z "
                                break;
                            }
                        case 2:
                            {
                                this.strPwdComment = this.strPwdComment + "Alphanumerics. ie; Combination of A-Z, a-z and 0-9"
                                break;
                            }
                        case 3:
                            {
                                this.strPwdComment = this.strPwdComment + "Alphanumeric and Non Alphanumeric. ie; Combination of A-Z, a-z, and 0-9 and ! @ # $… "
                                break;
                            }
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
            })
        }
        catch (ex) {
            this.clientErrorMsg(ex, "populateUserFields");
        }
    }

    async bindOrgDropdown() {
        try {
            await this.atParCommonService.getUserOrgGroups(this._deviceTokenEntry[TokenEntry_Enum.UserID], this._deviceTokenEntry[TokenEntry_Enum.OrgGrpID])
                .catch(this.httpService.handleError).then((result: Response) => {
                    let res = result.json() as AtParWebApiResponse<string>;
                    this.resType = res;
                    this.growlMessage = [];
                    this.dropdownOrgData = [];
                    switch (res.StatType) {
                        case StatusType.Success: {
                            this.orgGroups = res.DataList;
                            this.dropdownOrgData.push({ label: 'Select Org Group', value: 'Select Org Group' });
                            for (var i = 0; i < this.orgGroups.length; i++) {
                                this.dropdownOrgData.push({ label: (this.orgGroups[i].ORG_GROUP_ID + ' - ' + this.orgGroups[i].ORG_GROUP_NAME), value: this.orgGroups[i].ORG_GROUP_ID })
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.spinnerService.stop();
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res.StatusMessage });
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "bindOrgDropdown");
        }
    }

    async bindProfileDropdown() {
        try {
            await this.addUserServices.getProfiles(this._deviceTokenEntry[TokenEntry_Enum.UserID]).then((res: Response) => {
                let data = res.json();
                this.growlMessage = [];
                this.dropdownProfileData = [];
                switch (data.StatType) {
                    case StatusType.Success: {
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
            this.clientErrorMsg(ex, "bindProfileDropdown");
        }
    }

    async btnCreateSave_Click(mode) {
        try {
            this.validateControls();
            if (this.continue) {
                this.growlMessage = [];
                this.addUserData.USER_ID = (this.addUserData.USER_ID.trim()).toUpperCase();
                this.addUserData.FIRST_NAME = this.addUserData.FIRST_NAME.trim();
                this.addUserData.LAST_NAME = this.addUserData.LAST_NAME.trim();
                this.addUserData.PASSWORD = this.addUserData.PASSWORD.trim();
                this.addUserData.TOKEN_EXPIRY_PERIOD = this.addUserData.TOKEN_EXPIRY_PERIOD;
                this.addUserData.IDLE_TIME = this.addUserData.IDLE_TIME;

                if (this.addUserData.PASSHASH_REQUIRED) {
                    if (this.addUserData.PWD_RESET_REQUIRED == true || (this.securityParams.PASSWD_RESET_REQUIRED == 'Y' && mode == 'Add')) {
                        this.addUserData.PASSWD_RESET_REQUIRED = 'Y';
                    } else {
                        this.addUserData.PASSWD_RESET_REQUIRED = 'N';
                    }
                } else {
                    this.addUserData.PASSWD_RESET_REQUIRED = 'N';
                }
                this.addUserData.ORG_GROUP_ID = '' ? 'Select Org Group' : this.addUserData.ORG_GROUP_ID;
                this.addUserData.PROFILE_ID = '' ? 'Vendor Profile' : this.addUserData.PROFILE_ID;
                this.addUserData.LAST_UPDATE_USER = this._deviceTokenEntry[TokenEntry_Enum.UserID];
                this.spinnerService.start();

                //'Checking the user whether already exist or not
                if (mode == 'Add') {
                    let resType= await this.checkUser();
                    if (resType.StatType != StatusType.Success) {
                        return;
                    }
                }
                
                // 'Checking the Profile whether Server Assigned
                await this.checkProfile(ClientType.WEB);
                if ((this.resType.StatType != StatusType.Success) || ((this.resType.DataVariable) && (!this.addUserData.PASSHASH_REQUIRED))) {
                    return;
                }

                //'Checking the Profile whether Client Assigned
                if (this.securityParams.PASS_REQ_HHT_USERS == 'Y') {
                    await this.checkProfile(ClientType.HHT);
                }
                if ((this.resType.StatType != StatusType.Success) || ((this.resType.DataVariable) && (!this.addUserData.PASSHASH_REQUIRED))) {
                    return;
                }
                if (mode == 'Add') {
                    if (this.isImportLDAPUser) {
                        await this.saveLdapUser();
                    } else {
                        await this.createUser();
                    }

                } else {
                    // ========AUDIT IMPLEMENTATION============
                    if (sessionStorage.getItem("strAuditAllowed") == 'Y') {
                        await this.doAuditData();
                    }
                    //if (this.addUserData.PASSHASH_REQUIRED && this.editUserInfo != undefined) {
                    //    if (this.addUserData.PASSWORD == '') {
                    //        this.addUserData.PASSWORD = this.editUserInfo.PASSWORD;
                    //    }
                    //}

                    // ==============Update User=============
                    await this.updateUser();
                }
                this.spinnerService.stop();
            }
            this.atParConstant.scrollToTop();
           
        }

        catch (ex) {
            this.clientErrorMsg(ex, "btnCreateSave_Click");
        }
    }

    validateControls() {
        try {
            this.continue = true;
            this.growlMessage = [];
            //========================Common Mandatory Validations=====================

            if (this.addUserData.USER_ID == undefined || this.addUserData.TOKEN_EXPIRY_PERIOD == undefined ||
                this.addUserData.IDLE_TIME == undefined || this.addUserData.FIRST_NAME == undefined ||
                this.addUserData.LAST_NAME == undefined || (this.addUserData.PASSHASH_REQUIRED == true
                    && !this.isImportLDAPUser && this.editUserInfo == undefined
                    && (this.addUserData.PASSWORD == undefined || this.addUserData.CPASSWORD == undefined))) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please fill mandatory fields' });
                this.continue = false;
            }

            else if (this.addUserData.USER_ID.trim() == "" || this.addUserData.TOKEN_EXPIRY_PERIOD.toString().trim() == "" ||
                this.addUserData.IDLE_TIME.toString().trim() == "" || this.addUserData.FIRST_NAME.trim() == "" ||
                this.addUserData.LAST_NAME.trim() == ""
                || (this.addUserData.PASSHASH_REQUIRED == true && !this.isImportLDAPUser && this.editUserInfo == undefined
                    && (this.addUserData.PASSWORD.trim() == "" || this.addUserData.CPASSWORD.trim() == ""))) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please fill mandatory fields' });
                this.continue = false;
            }
            else if (this.addUserData.PASSHASH_REQUIRED == true && !this.isImportLDAPUser && this.editUserInfo == undefined &&
                (this.addUserData.PASSWORD.trim() != this.addUserData.CPASSWORD.trim())) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Password and Confirm Password should be same' });
                this.continue = false;
            }

            if (!this.continue) {
                return;
            }
            var strChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            var strNumbers = "0123456789";
            var strSplChars = "@#$%&!";
            var strSpace = " ";
            var strSymbols = "<>";
            var strCtrlText = '';
            //===============User ID================================
            strCtrlText = this.addUserData.USER_ID.trim();
            if (strCtrlText.startsWith('_')) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Underscore is not allowed as a first character in User ID' });
                this.continue = false;
            }
            else {
                this.strValid = strChars + strNumbers + "_";
                for (var i = 0; i < strCtrlText.length; i++) {
                    if (this.strValid.indexOf(strCtrlText[i]) == -1) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Only characters, numbers or underscore is allowed in User ID' });
                        this.continue = false;
                        break;
                    }
                }
            }
            if (!this.continue) {
                return;
            }

            //===============First Name=================================
            strCtrlText = this.addUserData.FIRST_NAME.trim();
            this.strValid = strSymbols;
            for (var i = 0; i < strCtrlText.length; i++) {
                if (this.strValid.indexOf(strCtrlText[i]) != -1) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Less than(<) and greater than(>) are not allowed in First Name' });
                    this.continue = false;
                    break;
                }
            }
            if (!this.continue) {
                return;
            }

            //===============Last Name=================================
            strCtrlText = this.addUserData.LAST_NAME.trim();
            this.strValid = strSymbols;
            for (var i = 0; i < strCtrlText.length; i++) {
                if (this.strValid.indexOf(strCtrlText[i]) != -1) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Less than(<) and greater than(>) are not allowed in Last Name' });
                    this.continue = false;
                    //break;
                    return;
                }
            }
            if (!this.continue) {
                return;
            }

            //===============Middle Name=================================
            strCtrlText = this.addUserData.MIDDLE_INITIAL.trim();
            this.strValid = strSymbols;
            for (var i = 0; i < strCtrlText.length; i++) {
                if (this.strValid.indexOf(strCtrlText[i]) != -1) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Less than(<) and greater than(>) are not allowed in Middle Initial' });
                    this.continue = false;
                    break;
                }
            }

            if (!this.continue) {
                return;
            }

            //===============Idle Time=================================
            strCtrlText = this.addUserData.IDLE_TIME.toString().trim();
            if (strCtrlText.length - 1 > 3) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Maximum Length of Idle Time is 4' });
                this.continue = false;
            }
            else if (strCtrlText == "0") {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Idle Time must be greater than 0' });
                this.continue = false;
            }
            else {
                for (var i = 0; i < strCtrlText.length; i++) {
                    if (strNumbers.indexOf(strCtrlText[i]) == -1) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Only numbers are allowed in Idle Time' });
                        this.continue = false;
                        break;
                    }
                }
            }
            if (!this.continue) {
                return;
            }

            //===============Session Time=================================
            strCtrlText = this.addUserData.TOKEN_EXPIRY_PERIOD.toString().trim();

            if (strCtrlText.length - 1 > 3) {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Maximum Length of Session Time is 4' });
                this.continue = false;
            }
            else if (strCtrlText == "0") {
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Session Validity Time must be greater than 0' });
                this.continue = false;

            }

            else {
                for (var i = 0; i < strCtrlText.length; i++) {
                    if (strNumbers.indexOf(strCtrlText[i]) == -1) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Only numbers are allowed in Session Time' });
                        this.continue = false;
                        break;
                    }
                }
            }
            if (!this.continue) {
                return;
            }
            //===============Password=================================
            if (this.addUserData.PASSHASH_REQUIRED == true) {
                strCtrlText = this.addUserData.PASSWORD.trim();
                this.blnPwdChars = false;
                this.blnPwdNum = false;
                this.blnPwdSplChars = false;
                if (strCtrlText != null && strCtrlText != '') {
                    if (strCtrlText.length < this.securityParams.PASSWD_MIN_LENGTH) {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: ' Minimum Length of Password is ' + this.securityParams.PASSWD_MIN_LENGTH });
                        this.continue = false;
                    }
                    else {

                        //To Check Characters Space 
                        for (var i = 0; i < strCtrlText.length; i++) {
                            if (strSpace.indexOf(strCtrlText[i]) != -1) {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Space is not allowed in Password' });
                                this.continue = false;
                                break;
                            }
                        }
                        //To Check Characters
                        for (var i = 0; i < strCtrlText.length; i++) {
                            if (strChars.indexOf(strCtrlText[i]) != -1) {
                                this.blnPwdChars = true;
                                break;
                            }
                        }

                        //To Check Numbers
                        for (var i = 0; i < strCtrlText.length; i++) {
                            if (strNumbers.indexOf(strCtrlText[i]) != -1) {
                                this.blnPwdNum = true;
                                break;
                            }
                        }

                        //To Check Special Characters
                        for (var i = 0; i < strCtrlText.length; i++) {
                            if (strSplChars.indexOf(strCtrlText[i]) != -1) {
                                this.blnPwdSplChars = true;
                                break;
                            }
                        }
                        switch (this.securityParams.PASSWD_COMPLEXITY) {
                            case 1:
                                {
                                    if (!this.blnPwdChars || this.blnPwdNum || this.blnPwdSplChars) {
                                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Only characters are allowed in Password' });
                                        this.continue = false;
                                    }
                                    break;
                                }
                            case 2:
                                {
                                    if (!this.blnPwdChars || !this.blnPwdNum || this.blnPwdSplChars) {
                                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Password must be combination of Characters and Digits' });
                                        this.continue = false;
                                    }
                                    break;
                                }
                            case 3:
                                {
                                    if (!this.blnPwdChars || !this.blnPwdNum || !this.blnPwdSplChars) {
                                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Password must be combination of Characters, Digits and Special Characters' });
                                        this.continue = false;
                                    }
                                    break;
                                }
                        }
                    }
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "validateControls");
        }

    }

    async checkUser() {
        try {
            let resType: any;
            await this.addUserServices.checkUser(this.addUserData.USER_ID).then((res: Response) => {
                this.growlMessage = [];
                resType  = res.json();

                switch (resType.StatType) {
                    case StatusType.Success: {
                        break;
                    }
                    case StatusType.Warn: {
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: resType.StatusMessage });
                        this.addUserData.PASSWORD = '';
                        this.addUserData.CPASSWORD = '';
                        this.spinnerService.stop();
                        break;
                    }
                    case StatusType.Error: {
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: resType.StatusMessage });
                        this.spinnerService.stop();
                        break;
                    }
                    case StatusType.Custom: {
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: resType.StatusMessage });
                        break;
                    }
                }
            });
            return resType;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkUser");
        }
    }

    async checkProfile(typeclient) {
        try {
            await this.addUserServices.checkProfile(this._deviceTokenEntry[TokenEntry_Enum.UserID], this.addUserData.PROFILE_ID, typeclient).then((res: Response) => {
                let data = res.json();
                this.growlMessage = [];
                this.resType = data;
                if (data.StatType == StatusType.Error) {
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                    this.spinnerService.stop();
                }
                if ((data.DataVariable == true) && (!this.addUserData.PASSHASH_REQUIRED)) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Password is Mandatory for Profile - " + this.addUserData.PROFILE_ID });
                    this.spinnerService.stop();
                }

            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkProfile");
        }
    };

    async createUser() {
        try {
            await this.addUserServices.addUser(this.addUserData).subscribe((res: Response) => {
                this.growlMessage = [];
                this.spinnerService.stop();
                let data = res.json();
                switch (data.StatType) {
                    case StatusType.Success: {
                        let statusMessage = AtParConstants.Created_Msg.replace("1%", "User").replace("2%", this.addUserData.USER_ID);
                        this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: statusMessage });
                        this.addUserData = new VM_MT_ATPAR_USER_ADD();
                        this.disableButton = true;
                        document.getElementById('txtUserID').focus();
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
                this.atParConstant.scrollToTop();
                this.userSelectedFile = '';
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "createUser");
        }
    }

    async updateUser() {
        try {
            await this.addUserServices.updateUser(this.addUserData).subscribe((res: Response) => {
                this.growlMessage = [];
                this.spinnerService.stop();
                let data = res.json();
                switch (data.StatType) {
                    case StatusType.Success:
                        {
                            let statusmsg = AtParConstants.Updated_Msg.replace("1%", "User").replace("2%", this.addUserData.USER_ID);
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: statusmsg });
                            this.addUserData.PASSWORD = '';
                            this.addUserData.CPASSWORD = '';                        
                            if (this.addUserData.PASSWD_RESET_REQUIRED == 'Y') {
                                this.addUserData.PWD_RESET_REQUIRED = true;
                            } else {
                                this.addUserData.PWD_RESET_REQUIRED = false;
                            }
                            if (this.addUserData.PASSHASH_REQUIRED) {
                                document.getElementById('txtPassword').focus();
                            }
                            else {
                                document.getElementById('txtToken').focus();
                            }
                            break;
                        }
                    case StatusType.Error:
                        {
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                    case StatusType.Warn:
                        {
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                    case StatusType.Custom: {
                        this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                        break;
                    }
                }
                this.atParConstant.scrollToTop();
            });
            this.userSelectedFile = '';
        }
        catch (ex) {
            this.clientErrorMsg(ex, "updateUser");
        }
    }

    async saveLdapUser() {
        try {
            this.lstLdapUser.push(this.addUserData);
            await this.addUserServices.saveLdapUser(this.lstLdapUser, this._deviceTokenEntry[TokenEntry_Enum.UserID],
                this.addUserData.TOKEN_EXPIRY_PERIOD, this.addUserData.IDLE_TIME,
                this.addUserData.ORG_GROUP_ID, this.addUserData.PROFILE_ID)
                .subscribe((res: Response) => {
                    let data = res.json();
                    this.growlMessage = [];
                    this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success:
                            {
                                let statusMessage = AtParConstants.Created_Msg.replace("1%", "User").replace("2%", this.addUserData.USER_ID);
                                this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: statusMessage });
                                this.addUserData = new VM_MT_ATPAR_USER_ADD();
                                this.isImportLDAPUser = false;
                                break;
                            }
                        case StatusType.Error:
                            {
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                break;
                            }
                        case StatusType.Warn:
                            {
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                break;
                            }
                    }
                    this.atParConstant.scrollToTop();
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "saveLdapUser");
        }
    }

    async doAuditData() {
        try {
            let lstAuditData: VM_MT_ATPAR_USER_ADD[] = []
            lstAuditData.push(this.addUserData);
            await this.atParCommonService.doAuditData(this._deviceTokenEntry[TokenEntry_Enum.UserID], EnumApps.Auth, 'mt_atpar_users.aspx', lstAuditData)              
                .catch(this.httpService.handleError).then((result: Response) => {
                    let res = result.json() as AtParWebApiResponse<string>;
                    this.resType = res;
                    this.growlMessage = [];
                    if (res.StatType != StatusType.Success) {
                        this.spinnerService.stop();
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res.StatusMessage });
                    }

                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "doAuditData");
        }

    }

    swtPassword_Click() {
        this.addUserData.PASSWORD = '';
        this.addUserData.CPASSWORD = '';
        if (this.addUserData.PASSHASH_REQUIRED == true) {
            setTimeout(function () {
                let txtPasswdValue = <HTMLInputElement>document.getElementById("txtPassword");
                txtPasswdValue.focus();
            }, 500);
        }
    }

    isNullOrEmpty = function (s) {
        if (s == null || s === "")
            return true;
        return false;
    }

    btnGoBack_Click() {
        if (this.editUserInfo != null && this.editUserInfo != undefined) {
            this.atParSharedDataService.setStorage({ "fromPage": "AddUser" });
        }
        let navigationExtras: NavigationExtras = {
            relativeTo: this.route
        };
        var menu = localStorage.getItem('leftMenuUrl').toString();
        if (menu == 'userstatusreport') {
            this.breadCrumbMenu.MENU_NAME = 'User Status Report';
        } else {
            this.breadCrumbMenu.MENU_NAME = 'Manage Users';
        }
        this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        this.router.navigate(['atpar/' + localStorage.getItem('leftMenuUrl').toString() + '']);
    }

    async btnGo_Click(searchValues) {
        this.continue = true;
        this.growlMessage = []
        if (searchValues.USER_ID == '' && searchValues.FIRST_NAME == '' && searchValues.LAST_NAME == '') {
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please Enter valid LDAP Search Filter(s)' });
            this.continue = false;
        }
        else {
            this.arrLst = [];
            if (searchValues.USER_ID != '') {
                this.arrLst.push(this.strUserIDFilter + "=" + searchValues.USER_ID.trim());
            }
            if (searchValues.FIRST_NAME != '') {
                this.arrLst.push(this.strFirstNameFilter + '=' + searchValues.FIRST_NAME.trim());
            }
            if (searchValues.LAST_NAME != '') {
                this.arrLst.push(this.strLastNameFilter + '=' + searchValues.LAST_NAME.trim());
            }
            switch (this.arrLst.length) {
                case 1: {
                    this.stringBuilder = this.arrLst[0];
                    break;
                }
                case 2: {
                    this.stringBuilder = this.arrLst[0] + "," + this.arrLst[1];
                    break;
                }
                case 3: {
                    this.stringBuilder = this.arrLst[0] + "," + this.arrLst[1] + "," + this.arrLst[2];
                    break;
                }
            }
            this.populateLDAPUsers(this.stringBuilder);
        }
    }

    async populateLDAPUsers(strValue) {
        try {
            this.spinnerService.start();
            this.lstLdapUserData = [];
            this.atParSharedDataService.storage = {};
            await this.addUserServices.getLdapUsers(this._deviceTokenEntry[TokenEntry_Enum.UserID], strValue, '').then((res: Response) => {
                let data = res.json();
                this.growlMessage = [];
                this.spinnerService.stop();
                if (data.StatType == StatusType.Success) {
                    this.lstLdapUserData = data.DataList;
                    for (var i = 0; i < this.lstLdapUserData.length; i++) {
                        this.lstLdapUserData[i].SELECTED_USER = false;
                        if (this.lstLdapUserData[i].FIRST_NAME.length > 20 || this.lstLdapUserData[i].LAST_NAME.length > 20 ||
                            this.lstLdapUserData[i].MIDDLE_INITIAL.length > 2 || this.lstLdapUserData[i].EMAIL_ID.length > 50 ||
                            this.lstLdapUserData[i].PHONE1.length > 12 || this.lstLdapUserData[i].FAX.length > 15) {
                            this.lstLdapUserData[i].VALID_USER = 'INVALID';
                        } else {
                            this.lstLdapUserData[i].VALID_USER = 'VALID';
                        }
                    }
                } else if (data.StatType == StatusType.Warn) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                }
                else if (data.StatType == StatusType.Error) {
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "populateLDAPUsers");
        }
    }
    async btnImport_Click() {
        //var ldapUserInfo = JSON.parse(sessionStorage.getItem("ldapUserInfo"));
        var ldapUserInfo;
        if (this.atParSharedDataService.storage != null) {
            ldapUserInfo = this.atParSharedDataService.storage.ldapUserInfo;
        }
        if (ldapUserInfo != null) {
            this.displayImportDialog = false;
            await this.ngOnInit();
        } else {
            this.growlMessage = [];
            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please select atleast one LDAP User to Import' });
        }
    }

    goBackButton_Click(val: boolean) {
        this.displayImportDialog = val;
        this.searchImpData = { FIRST_NAME: '', LAST_NAME: '', USER_ID: '' };
        this.lstLdapUserData = [];
        this.addUserData = new VM_MT_ATPAR_USER_ADD()
        this.growlMessage = [];
        this.isImportLDAPUser = false;
        this.disableButton = true;
        if (val) {
            this.breadCrumbMenu.SUB_MENU_NAME = 'Import User';
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));

        } else {
            this.breadCrumbMenu.SUB_MENU_NAME = '';
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu));
        }
    }

    rdBtnUser_Click(e, user) {
        if (user.VALID_USER == 'INVALID') {
            this.checkUserDetails(user);
        } else {
            this.atParSharedDataService.storage = { "ldapUserInfo": user, "mode": ModeEnum.Add };
        }
    }

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

    async btnRefreshUserDn_Click() {
        try {
            this.spinnerService.start();
            await this.addUserServices.refreshUserDN(this.addUserData.USER_ID, this.addUserData.FIRST_NAME, this.addUserData.LAST_NAME).then((res: Response) => {
                let data = res.json();
                this.growlMessage = [];
                this.spinnerService.stop();
                if (data.StatType == StatusType.Success) {
                    if (data.DataList.length > 0) {
                        this.addUserData.FIRST_NAME = data.DataList[0].FIRST_NAME;
                        this.addUserData.LAST_NAME = data.DataList[0].LAST_NAME;
                        this.addUserData.MIDDLE_INITIAL = data.DataList[0].MIDDLE_INITIAL;
                        this.addUserData.PHONE1 = data.DataList[0].PHONE1;
                        this.addUserData.EMAIL_ID = data.DataList[0].EMAIL_ID;
                        this.addUserData.FAX = data.DataList[0].FAX;
                    }
                    this.btnCreateSave_Click('Edit');
                }
                else if (data.StatType != StatusType.Warn) {
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                    this.addUserData.PASSWORD = '';
                    this.addUserData.CPASSWORD = '';
                }
                else {
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                }
            });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnRefreshUserDn_Click");
        }
    }

    bindModelDataChange(event: any) {
        if ("txtUserID" == event.TextBoxID.toString()) {
            this.userIDStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("txtToken" == event.TextBoxID.toString()) {
            this.tokenStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("txtIdleTime" == event.TextBoxID.toString()) {
            this.idleTimeStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("txtFirstName" == event.TextBoxID.toString()) {
            this.firstNameStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("txtLastName" == event.TextBoxID.toString()) {
            this.lastNameStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("txtMName" == event.TextBoxID.toString()) {
            this.mNameStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("txtEmail" == event.TextBoxID.toString()) {
            this.mailStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("txtPhone1" == event.TextBoxID.toString()) {
            this.phone1Status = event.validationrules.filter(x => x.status == false).length;
        }
        if ("txtPhone2" == event.TextBoxID.toString()) {
            this.phone2Status = event.validationrules.filter(x => x.status == false).length;
        }
        if ("txtFAX" == event.TextBoxID.toString()) {
            this.faxStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("txtPager" == event.TextBoxID.toString()) {
            this.pagerStatus = event.validationrules.filter(x => x.status == false).length;
        }

        //edit
        if (this.showManageEdit == true) {
            this.userIDStatus = 0;
            if (this.tokenStatus >= 1) {
                this.tokenStatus = 1;
            }
            else {
                this.tokenStatus = 0;
            }
            if (this.idleTimeStatus >= 1) {
                this.idleTimeStatus = 1;
            }
            else {
                this.idleTimeStatus = 0;
            }
            if (this.firstNameStatus >= 1) {
                this.firstNameStatus = 1;
            }
            else {
                this.firstNameStatus = 0;
            }
            if (this.lastNameStatus >= 1) {
                this.lastNameStatus = 1;
            }
            else {
                this.lastNameStatus = 0;
            }
        }
        //Add and Edit
        if (this.userIDStatus == 0 && this.tokenStatus == 0 && this.idleTimeStatus == 0 && this.firstNameStatus == 0 && this.lastNameStatus == 0) {
            if ((this.mNameStatus == 0 || this.mNameStatus == undefined) && (this.mailStatus == 0 || this.mailStatus == undefined)
                && (this.phone1Status == 0 || this.phone1Status == undefined) && (this.phone2Status == 0 || this.phone2Status == undefined)
                && (this.faxStatus == 0 || this.faxStatus == undefined) && (this.pagerStatus == 0 || this.pagerStatus == undefined)) {
                this.disableButton = false;
            }
            else {
                this.disableButton = true;
            }
        }
        else {
            this.disableButton = true;
        }
    }

    files: any;
    fileUpload(event) {
        try {
            this.spinnerService.start();
            let fileList: FileList = event.target.files;
            this.userSelectedFile = event.target.files[0].name;
            let formData: FormData = new FormData();
            if (fileList.length > 0) {
                let file: File = fileList[0];
                this.files = file.name;
                var listData = [];
                var obj = { FileName: file.name, File: file };
                listData.push(obj);
                formData.append('uploadFile', file, file.name);
            }
            let headers = new Headers();
            headers.append('Authorization', 'bearer');
            headers.append('enctype', 'multipart/form-data');
            let options = new RequestOptions({ headers: headers });
            let apiUrl = this.httpService.BaseUrl + "/api/AddUser/SaveUserProfileImage";

            this.http.post(apiUrl, formData, options)
                .toPromise()
                .then((res: Response) => {
                    this.growlMessage = [];
                    this.spinnerService.stop();
                    let data = res.json();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.files = '';
                            this.showUploadImage = false;
                            this.growlMessage.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Warn: {
                            this.showUploadImage = true;
                            this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.showUploadImage = true;
                            this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                },
                error => console.log(error)
                );

        }
        catch (ex) {
            this.clientErrorMsg(ex, "fileUpload");
        }
    }

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }

    ngOnDestroy() {
        this.addUserData = new VM_MT_ATPAR_USER_ADD();
        this.orgGroups = null;
        this.profiles = null;
        if (this.atParSharedDataService.storage != undefined) {
            this.atParSharedDataService.storage.editUserInfo = null;
            if (this.atParSharedDataService.storage.fromPage == "ManageUser") {
                this.atParSharedDataService.storage.fromPage = null;
            }
        }
        this.dropdownProfileData = null;
        this.dropdownOrgData = null;
        this._deviceTokenEntry = [];
        this.growlMessage = [];
        this.spinnerService.stop();
        this.spinnerService = null;
    }
}