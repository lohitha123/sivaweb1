import { Component, ViewChild } from '@angular/core';
import { datatableservice } from './../components/datatable/datatableservice';
import { Employee } from '../components/datatable/employee';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { MT_ATPAR_ORG_GROUPS } from '../Entities/MT_ATPAR_ORG_GROUPS';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';
import { Http, Response, Jsonp } from '@angular/http';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { Message } from './../components/common/api';
import { MT_ATPAR_PROFILE } from '../Entities/MT_ATPAR_PROFILE';
import { TokenEntry_Enum, ClientType, StatusType } from '../Shared/AtParEnums';
import { VM_MT_ATPAR_PROF_USER } from '../Entities/VM_MT_ATPAR_PROF_USER';
import { MT_ATPAR_USER } from '../Entities/MT_ATPAR_USER';
import { AssignProfilesService } from './atpar-assign-profiles.service';
import { MT_ATPAR_SECURITY_PARAMS } from '../Entities/MT_ATPAR_SECURITY_PARAMS';
import { MT_ATPAR_SECURITY_AUDIT } from '../Entities/MT_ATPAR_SECURITY_AUDIT';
import { VM_MT_ATPAR_USER } from '../Entities/VM_MT_ATPAR_USER';
import { DataTable } from '../components/datatable/datatable';
import { AtParConstants } from '../Shared/AtParConstants';
declare var module: {
    id: string;
}
@Component({
    selector: 'assignProfile-app',
    templateUrl: 'atpar-assign-profiles.component.html',
    providers: [datatableservice, HttpService, AssignProfilesService, AtParConstants],
})

export class AssignProfilesComponent {
    @ViewChild(DataTable) dataTableComponent: DataTable;
    content: boolean = false;
    itemList: AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>;
    systemData: MT_ATPAR_ORG_GROUPS[];
    orgGroupIds: any[] = [];
    profileData: AtParWebApiResponse<MT_ATPAR_PROFILE>;
    profileDataList: MT_ATPAR_PROFILE[];
    profileIds: any[] = [];
    userProfile: AtParWebApiResponse<VM_MT_ATPAR_PROF_USER>;
    userProfileList: VM_MT_ATPAR_PROF_USER[];
    filterList: VM_MT_ATPAR_PROF_USER[];
    lstCheckedBUnits: Array<VM_MT_ATPAR_PROF_USER>;
    lstGridFilterData: VM_MT_ATPAR_PROF_USER[];
    uId: string = '';
    orgGrpId: string = '';
    profileId: string = '';
    fName: string = '';
    lDap: string = '';
    organization: string = '';
    statusMessage: string = "";
    msgs: Message[] = [];
    _deviceTokenEntry: string[] = [];
    userId: string = "";
    errorCode: string;
    statusCode: number = -1;
    statusType: any;
    userProf: AtParWebApiResponse<MT_ATPAR_USER>;
    userProfList: MT_ATPAR_USER[];
    allOrgGrp: string = 'All';
    adminProfile: string = 'admin';
    strMenuCode: string = 'mt_atpar_assign_profiles.aspx';
    appId: number = 0;
    securityParam: AtParWebApiResponse<MT_ATPAR_SECURITY_PARAMS>;
    securityParamlist: MT_ATPAR_SECURITY_PARAMS[];
    lblOrgAssign: boolean = false;
    lblProfileAssign: boolean = false;
    intServerProfCnt: number = 0;
    intClientProfCnt: number = 0;
    auditData: MT_ATPAR_SECURITY_AUDIT[] = [];
    audit: MT_ATPAR_SECURITY_AUDIT;
    saveUserProfileList: VM_MT_ATPAR_USER[] = [];
    saveUserProfile: VM_MT_ATPAR_USER;
    checkBoxEnabled: boolean = true;
    blnFlag: boolean = false;
    m_strPwdReq: string = "";
    chkboxAssignOld: boolean[];
    auditFlag: string;
    pageSize: number;
    lblOrgId: string;
    lblProfileId: string;
    isFiltered: boolean = false;
    startIndex: number;
    endIndex: number;

    constructor(public dataservice: datatableservice, private httpService: HttpService, private spinnerService: SpinnerService, private assignProfilesService: AssignProfilesService, private atParConstant: AtParConstants) {

    }

    ngOnInit() {
        try {
            this.spinnerService.start();
            this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.userId = this._deviceTokenEntry[TokenEntry_Enum.UserID];
            this.pageSize = +this._deviceTokenEntry[TokenEntry_Enum.RecordsPerPage];
            this.lstCheckedBUnits = new Array<VM_MT_ATPAR_PROF_USER>();
            this.BindDropDown();
            this.BindDropDownProfiles();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    }

    private async BindDropDown() {
        try {
            this.spinnerService.start();
            this.itemList = await this.GetOrgGrpIdData();
            this.systemData = this.itemList.DataList,
                this.statusCode = this.itemList.StatusCode;
            this.statusMessage = this.itemList.StatusMessage;
            this.statusType = this.itemList.StatType;
            this.orgGroupIds.push({ label: "Select One ", value: "" })
            switch (this.statusType) {
                case StatusType.Success:
                    if (this.systemData != null) {
                        if (this.systemData.length > 1) {
                            if (this._deviceTokenEntry[TokenEntry_Enum.OrgGrpID].toUpperCase() == this.allOrgGrp.toUpperCase()) {
                                for (var i = 0; i < this.systemData.length; i++) {
                                    var orgString = this.systemData[i].ORG_GROUP_ID + ' - ' + this.systemData[i].ORG_GROUP_NAME;
                                    this.orgGroupIds.push({ label: orgString, value: this.systemData[i].ORG_GROUP_ID })
                                }
                            }
                            else {
                                for (var i = 0; i < this.systemData.length; i++) {
                                    if (this.systemData[i].ORG_GROUP_ID.toUpperCase() == this._deviceTokenEntry[TokenEntry_Enum.OrgGrpID].toUpperCase()) {
                                        var orgString = this.systemData[i].ORG_GROUP_ID + ' - ' + this.systemData[i].ORG_GROUP_NAME;
                                        this.orgGroupIds.push({ label: orgString, value: this.systemData[i].ORG_GROUP_ID })
                                    }
                                }
                            }
                        }
                    }
                    break;
                case StatusType.Error:
                    this.statusMessage = this.statusMessage;
                    this.msgs = [];
                    this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: this.statusMessage });
                    break;
                case StatusType.Warn:
                    this.statusMessage = this.statusMessage;
                    this.msgs = [];
                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
                    break;
                case StatusType.Custom:
                    this.msgs = [];
                    this.msgs.push({ severity: 'custom', summary: AtParConstants.GrowlTitle_Info, detail: this.statusMessage });
                    break;
            }
            this.spinnerService.stop();

        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindDropDown");
            return;
        }
    }

    private async BindDropDownProfiles() {
        try {
            this.spinnerService.start();
            this.profileData = await this.GetProfilesData();
            this.profileDataList = this.profileData.DataList,
                this.statusCode = this.profileData.StatusCode;
            this.statusType = this.profileData.StatType;
            this.statusMessage = this.profileData.StatusMessage;
            this.profileIds.push({ label: "Select One ", value: "" })
            switch (this.statusType) {
                case StatusType.Success:
                    if (this.profileDataList != null) {
                        if (this.profileDataList.length > 1) {
                            for (var i = 0; i < this.profileDataList.length; i++) {
                                var profileString = this.profileDataList[i].PROFILE_ID + ' - ' + this.profileDataList[i].PROFILE_DESCRIPTION;
                                if (this._deviceTokenEntry[TokenEntry_Enum.ProfileID].toUpperCase() == this.adminProfile.toUpperCase()) {
                                    this.profileIds.push({ label: profileString, value: this.profileDataList[i].PROFILE_ID })
                                }
                                else if (this.profileDataList[i].PROFILE_ID.toUpperCase() != this.adminProfile.toUpperCase()) {
                                    this.profileIds.push({ label: profileString, value: this.profileDataList[i].PROFILE_ID })
                                }
                            }

                        }
                    }
                    break;
                case StatusType.Error:
                    this.statusMessage = this.statusMessage;
                    this.msgs = [];
                    this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: this.statusMessage });
                    break;
                case StatusType.Warn:
                    this.statusMessage = this.statusMessage;
                    this.msgs = [];
                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
                    break;
                case StatusType.Custom:
                    this.msgs = [];
                    this.msgs.push({ severity: 'custom', summary: AtParConstants.GrowlTitle_Info, detail: this.statusMessage });
                    break;
            }
            this.spinnerService.stop();

        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindDropDownProfiles");
            return;
        }
    }

    ddlChnage() {
        this.content = false;
        this.lblOrgAssign = false;
        this.lblProfileAssign = false;
        this.blnFlag = false;
    }

    async btnGo_Click() {
        try {
            if (this.orgGrpId == '' && this.profileId == '') {
                this.content = false;
                this.lblOrgAssign = false;
                this.lblProfileAssign = false;
                this.userProfileList = [];
                this.lblOrgAssign = false;
                this.lblProfileAssign = false;
                this.blnFlag = false;
                this.statusMessage = "Select either profile ID or Org Group to the Users";
                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
                return;
            }
            else {
                if (this.content && this.dataTableComponent != undefined) {
                    this.dataTableComponent.reset();
                }
                await this.getSecurityParamValues();
                if (this.profileId != '') {
                    await this.getServerAccessCount();
                    if (this.m_strPwdReq == 'Y') {
                        await this.getClientAccessCount();
                    }
                }
                await this.getData();
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "btnGo_Click")
        }
    }

    async getSecurityParamValues() {
        try {
            this.spinnerService.start();
            await this.assignProfilesService.GetSecurityParamVal(this.userId)
                .catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.m_strPwdReq = data.DataVariable;
                            this.statusCode = data.StatusCode;
                            break;
                        }
                        case StatusType.Error: {
                            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Warn: {

                            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {

                            this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                    this.spinnerService.stop();
                });
        } catch (ex) {
            this.clientErrorMsg(ex, "getSecurityParamValues");
        }

    }

    async getServerAccessCount() {
        try {
            this.spinnerService.start();
            await this.assignProfilesService.GetServerAccessCnt(this.userId, this.profileId).catch(this.httpService.handleError).then((res: Response) => {
                let data = res.json();
                switch (data.StatType) {
                    case StatusType.Success: {
                        this.intServerProfCnt = data.DataVariable;
                        this.statusCode = data.StatusCode;
                        break;
                    }
                    case StatusType.Error: {

                        this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                        break;
                    }
                    case StatusType.Warn: {

                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {

                        this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                        break;
                    }
                }
                this.spinnerService.stop();
            });
        } catch (ex) {
            this.clientErrorMsg(ex, "getServerAccessCount");
        }
    }

    async getClientAccessCount() {
        try {
            this.spinnerService.start();
            await this.assignProfilesService.GetClientAccessCnt(this.userId, this.profileId).catch(this.httpService.handleError).then((res: Response) => {
                let data = res.json();
                switch (data.StatType) {
                    case StatusType.Success: {
                        this.intClientProfCnt = data.DataVariable;
                        this.statusCode = data.StatusCode;
                        break;
                    }
                    case StatusType.Error: {
                        this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                        break;
                    }
                    case StatusType.Warn: {
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                        break;
                    }
                }
                this.spinnerService.stop();
            });
        } catch (ex) {
            this.clientErrorMsg(ex, "getClientAccessCount");
        }
    }

    private async getData() {
        this.content = false;
        this.msgs = [];
        this.lblOrgAssign = false;
        this.lblProfileAssign = false;
        this.chkboxAssignOld = [];
        this.userProfileList = [];
        this.blnFlag = false;
        if ((this.profileId != null) && (this.profileId != undefined) && (this.profileId != '')) {
            this.lblProfileAssign = true;
        }
        if ((this.orgGrpId != null) && (this.orgGrpId != undefined) && (this.orgGrpId != '')) {
            this.lblOrgAssign = true;
        }
        try {
            this.spinnerService.start();
            this.userProfile = await this.GetUserProfileInfo();
            this.userProfileList = this.userProfile.DataList,
                this.statusCode = this.userProfile.StatusCode;
            this.statusType = this.userProfile.StatType;
            this.statusMessage = this.userProfile.StatusMessage;
            switch (this.statusType) {
                case StatusType.Success:
                    if (this.userProfileList.length > 0) {
                        this.content = true;
                        this.lblOrgId = this.orgGrpId.trim();
                        this.lblProfileId = this.profileId.trim();
                        for (var i = 0; i < this.userProfileList.length; i++) {
                            if (this.userProfileList[i].PROFILE_ID != null && this.userProfileList[i].PROFILE_ID != '') {
                                var listProfileId = this.userProfileList[i].PROFILE_ID.toUpperCase();
                            }
                            else {
                                var listProfileId = this.userProfileList[i].PROFILE_ID;
                            }
                            if (this.userProfileList[i].ORG_GROUP_ID != null && this.userProfileList[i].ORG_GROUP_ID != '') {
                                var listGroupId = this.userProfileList[i].ORG_GROUP_ID.toUpperCase();
                            }
                            else {
                                var listGroupId = this.userProfileList[i].PROFILE_ID;
                            }
                            if (this.profileId != null && this.profileId != '') {
                                var profileId = this.profileId.toUpperCase();
                            }
                            else {
                                var profileId = this.profileId;
                            }
                            if (this.orgGrpId != null && this.orgGrpId != '') {
                                var orgGrpId = this.orgGrpId.toUpperCase();
                            }
                            else {
                                var orgGrpId = this.orgGrpId;
                            }

                            if ((listProfileId == profileId) && (listGroupId == orgGrpId)) {
                                this.userProfileList[i]["ASSIGN"] = true;
                            }
                            else if ((listProfileId == profileId) && (orgGrpId == '')) {
                                this.userProfileList[i]["ASSIGN"] = true;
                            }
                            else if ((listGroupId == orgGrpId) && (profileId == '')) {
                                this.userProfileList[i]["ASSIGN"] = true;
                            }
                            else {
                                this.userProfileList[i]["ASSIGN"] = false;
                            }
                            if (this.profileId != '' && (this.intServerProfCnt > 0 || this.intClientProfCnt > 0)) {
                                if (this.userProfileList[i].PASSHASH_REQUIRED == false) {
                                    this.blnFlag = true;
                                    this.checkBoxEnabled = false;
                                    this.userProfileList[i]["CHECKBOX_ENABLED"] = false;
                                }
                                else {

                                    this.userProfileList[i]["CHECKBOX_ENABLED"] = true;
                                }

                            }
                            else {
                                this.userProfileList[i]["CHECKBOX_ENABLED"] = true;
                            }
                            if (this.userProfileList[i].USER_ID == 'admin' || this.userProfileList[i].USER_ID == this.userId) {
                                this.checkBoxEnabled = false;
                                this.userProfileList[i]["CHECKBOX_ENABLED"] = false;
                            }
                            this.chkboxAssignOld[i] = this.userProfileList[i].ASSIGN;
                        }
                    }
                    break;
                case StatusType.Error:
                    this.content = false;
                    this.lblOrgAssign = false;
                    this.lblProfileAssign = false;

                    this.msgs = [];
                    this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: this.statusMessage });
                    break;
                case StatusType.Warn:
                    this.content = false;
                    this.lblOrgAssign = false;
                    this.lblProfileAssign = false;

                    this.msgs = [];
                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
                    break;
                case StatusType.Custom:
                    this.content = false;
                    this.lblOrgAssign = false;
                    this.lblProfileAssign = false;
                    this.msgs = [];
                    this.msgs.push({ severity: 'custom', summary: AtParConstants.GrowlTitle_Info, detail: this.statusMessage });
                    break;
            }
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getData");
            return;
        }
    }
    async assignProfile() {
        try {
            if (this.userProfileList.length != 0) {
                this.saveUserProfileList = [];
                for (var i = 0; i < this.userProfileList.length; i++) {
                    if (this.userProfileList[i].ASSIGN != this.chkboxAssignOld[i]) {
                        if (this.orgGrpId != '' && this.profileId != '') {
                            this.audit = new MT_ATPAR_SECURITY_AUDIT();
                            this.audit.OLD_VALUE = this.userProfileList[i].ORG_GROUP_ID;
                            if (this.userProfileList[i].ASSIGN == true) {
                                this.audit.NEW_VALUE = this.orgGrpId;
                            }
                            else {
                                this.audit.NEW_VALUE = '';
                            }
                            this.audit.FIELD_NAME = 'ORG_GROUP_ID';
                            this.audit.KEY_1 = this.userProfileList[i].USER_ID;
                            this.audit.KEY_2 = '';
                            this.audit.KEY_3 = '';
                            this.audit.KEY_4 = '';
                            this.audit.KEY_5 = '';
                            this.auditData.push(this.audit);
                            this.audit = new MT_ATPAR_SECURITY_AUDIT();
                            this.audit.OLD_VALUE = this.userProfileList[i].PROFILE_ID;
                            if (this.userProfileList[i].ASSIGN == true) {
                                this.audit.NEW_VALUE = this.profileId;
                            }
                            else {
                                this.audit.NEW_VALUE = '';
                            }
                            this.audit.FIELD_NAME = 'PROFILE_ID';
                            this.audit.KEY_1 = this.userProfileList[i].USER_ID;
                            this.audit.KEY_2 = '';
                            this.audit.KEY_3 = '';
                            this.audit.KEY_4 = '';
                            this.audit.KEY_5 = '';
                            this.auditData.push(this.audit);


                        }
                        else if (this.orgGrpId != '') {
                            this.audit = new MT_ATPAR_SECURITY_AUDIT();
                            this.audit.OLD_VALUE = this.userProfileList[i].ORG_GROUP_ID;
                            if (this.userProfileList[i].ASSIGN == true) {
                                this.audit.NEW_VALUE = this.orgGrpId;
                            }
                            else {
                                this.audit.NEW_VALUE = '';
                            }
                            this.audit.FIELD_NAME = 'ORG_GROUP_ID';
                            this.audit.KEY_1 = this.userProfileList[i].USER_ID;
                            this.audit.KEY_2 = '';
                            this.audit.KEY_3 = '';
                            this.audit.KEY_4 = '';
                            this.audit.KEY_5 = '';
                            this.auditData.push(this.audit);

                        }
                        else if (this.profileId != '') {
                            this.audit = new MT_ATPAR_SECURITY_AUDIT();
                            this.audit.OLD_VALUE = this.userProfileList[i].PROFILE_ID;
                            if (this.userProfileList[i].ASSIGN == true) {
                                this.audit.NEW_VALUE = this.profileId;
                            }
                            else {
                                this.audit.NEW_VALUE = '';
                            }
                            this.audit.FIELD_NAME = 'PROFILE_ID';
                            this.audit.KEY_1 = this.userProfileList[i].USER_ID;
                            this.audit.KEY_2 = '';
                            this.audit.KEY_3 = '';
                            this.audit.KEY_4 = '';
                            this.audit.KEY_5 = '';
                            this.auditData.push(this.audit);

                        }
                        this.saveUserProfile = new VM_MT_ATPAR_USER();
                        this.saveUserProfile.FIRST_NAME = this.userProfileList[i].FIRST_NAME;
                        this.saveUserProfile.LAST_NAME = this.userProfileList[i].LAST_NAME;
                        this.saveUserProfile.FULLNAME = this.userProfileList[i].FIRST_NAME + this.userProfileList[i].MIDDLE_INITIAL + this.userProfileList[i].LAST_NAME;
                        this.saveUserProfile.MIDDLE_INITIAL = this.userProfileList[i].MIDDLE_INITIAL;
                        this.saveUserProfile.USER_ID = this.userProfileList[i].USER_ID;
                        if (this.userProfileList[i].ASSIGN == true) {
                            this.saveUserProfile.ASSIGN = 'Y';
                        }
                        else {
                            this.saveUserProfile.ASSIGN = 'N';

                        }
                        this.saveUserProfileList.push(this.saveUserProfile);
                    }

                }


                /* for (var i = 0; i < this.userProfileList.length; i++) {
                     this.saveUserProfile = new VM_MT_ATPAR_USER();
                     this.saveUserProfile.FIRST_NAME = this.userProfileList[i].FIRST_NAME;
                     this.saveUserProfile.LAST_NAME = this.userProfileList[i].LAST_NAME;
                     this.saveUserProfile.FULLNAME = this.userProfileList[i].FIRST_NAME + this.userProfileList[i].MIDDLE_INITIAL + this.userProfileList[i].LAST_NAME;
                     this.saveUserProfile.MIDDLE_INITIAL = this.userProfileList[i].MIDDLE_INITIAL;
                     this.saveUserProfile.USER_ID = this.userProfileList[i].USER_ID;
                     if (this.userProfileList[i].ASSIGN == true) {
                         this.saveUserProfile.ASSIGN = 'Y';
                         console.log('trueeeee');
                     }
                     else {
                         this.saveUserProfile.ASSIGN = 'N';
                         console.log('falseeeeeeeeeee');
                     }
                     this.saveUserProfileList.push(this.saveUserProfile);
     
                 }*/
                await this.getAuditAllowed();
                if (this.auditFlag == 'Y') {
                    await this.insertAuditData();
                }
                await this.assignProfileData();
            }


        }
        catch (ex) {
            this.clientErrorMsg(ex, "assignProfile");
        }
    }

    async GetUserProfileInfo(): Promise<AtParWebApiResponse<VM_MT_ATPAR_PROF_USER>> {
        try {
            this.userProfile = new AtParWebApiResponse<VM_MT_ATPAR_PROF_USER>();

            await this.assignProfilesService.GetProfileUserInfo(this.userId, this.uId, this.lDap, this.fName, this.organization, this._deviceTokenEntry[TokenEntry_Enum.ProfileID], this._deviceTokenEntry[TokenEntry_Enum.OrgGrpID])
                .then((res: Response) => {
                    let data = res.json();
                    this.userProfile = data;
                })
            return this.userProfile
        }
        catch (ex) {
            this.clientErrorMsg(ex, "GetUserProfileInfo");
            return;
        }
    }

    private async assignProfileData() {
        try {
            this.spinnerService.start();
            await this.assignProfilesService.SaveProfileUsersInfo(this.saveUserProfileList, this.profileId, this.orgGrpId, this.userId)
                .then((res: Response) => {
                    let data = res.json();


                    //this.userProf = await this.SaveUserProfileInfo();
                    //if (this.userProf != null && this.userProf.DataList.length>0) { }
                    //this.userProfList = this.userProf.DataList,
                    //    this.statusCode = this.userProf.StatusCode;
                    // this.statusType = this.userProf.StatType;
                    switch (data.StatType) {
                        case StatusType.Success:
                            this.content = false;
                            this.userProfileList = [];
                            this.lblOrgAssign = false;
                            this.lblProfileAssign = false;
                            this.statusMessage = "Upated Successfully";
                            this.msgs = [];
                            this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: this.statusMessage });
                            break;
                        case StatusType.Error:
                            this.statusMessage = this.userProf.StatusMessage;;
                            this.msgs = [];
                            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: this.statusMessage });
                            break;
                        case StatusType.Warn:
                            this.statusMessage = this.userProf.StatusMessage;;
                            this.msgs = [];
                            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
                            break;
                        case StatusType.Custom:
                            this.msgs = [];
                            this.msgs.push({ severity: 'custom', summary: AtParConstants.GrowlTitle_Info, detail: this.statusMessage });
                            break;
                    }
                    this.spinnerService.stop();
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "assignProfileData");
        }
    }

    async GetOrgGrpIdData(): Promise<AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>> {
        this.itemList = new AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>();
        try {
            await this.assignProfilesService.GetOrgGroupIds(this.userId, '', '')
                .then((res: Response) => {
                    let data = res.json();
                    this.itemList = data;
                })
            return this.itemList;
        }
        catch (ex) {
            this.clientErrorMsg(ex, "GetOrgGrpIdData");
        }
    }

    async GetProfilesData(): Promise<AtParWebApiResponse<MT_ATPAR_PROFILE>> {
        this.profileData = new AtParWebApiResponse<MT_ATPAR_PROFILE>();
        try {
            await this.assignProfilesService.GetProfileIds(this.userId)
                .then((res: Response) => {
                    let data = res.json();
                    this.profileData = data;
                })
            return this.profileData
        }
        catch (ex) {
            this.clientErrorMsg(ex, "GetProfilesData");
        }
    }

    async SaveUserProfileInfo(): Promise<AtParWebApiResponse<MT_ATPAR_USER>> {
        this.userProf = new AtParWebApiResponse<MT_ATPAR_USER>();
        try {
            await this.assignProfilesService.SaveProfileUsersInfo(this.saveUserProfileList, this.profileId, this.orgGrpId, this.userId)
                .then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_USER>;
                    this.userProf = data;
                })
            return this.userProf
        }
        catch (ex) {
            this.clientErrorMsg(ex, "SaveUserProfileInfo");
        }
    }

    changeStatus(obj: any, status: any) {
        for (var i = 0; i < this.userProfileList.length; i++) {
            if (this.userProfileList[i] == obj) {
                this.userProfileList[i].ASSIGN = status;
            }
        }
    }

    checkAllCheckboxes() {
        try {
            this.lstCheckedBUnits = [];
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.endIndex = + sessionStorage.getItem("RecordsEndindex");
            if (this.lstGridFilterData != null && this.lstGridFilterData != undefined && this.lstGridFilterData.length > 0) {
                if (this.endIndex > this.lstGridFilterData.length) {
                    this.endIndex = this.lstGridFilterData.length;
                }
                for (let i = this.startIndex; i <= this.endIndex - 1; i++) {
                    if (this.lstGridFilterData[i].CHECKBOX_ENABLED == true) {
                        this.lstGridFilterData[i].ASSIGN = true;
                    }
                    this.lstCheckedBUnits.push(this.lstGridFilterData[i]);
                }
            }
            else {
                if (this.endIndex > this.userProfileList.length) {
                    this.endIndex = this.userProfileList.length;
                }
                for (let i = this.startIndex; i <= this.endIndex - 1; i++) {
                    if (this.userProfileList[i].CHECKBOX_ENABLED == true) {
                        this.userProfileList[i].ASSIGN = true;
                    }
                    this.lstCheckedBUnits.push(this.userProfileList[i]);
                }
            }

            //if (this.isFiltered == true) {
            //    if (this.filterList != null && this.filterList.length > 0) {
            //        for (var i = 0; i < this.filterList.length; i++) {
            //            for (var j = 0; j < this.userProfileList.length; j++) {
            //                if (this.filterList[i] == this.userProfileList[j]) {

            //                    if (this.userProfileList[j].CHECKBOX_ENABLED == true) {

            //                        this.userProfileList[j].ASSIGN = true;
            //                        break;
            //                    }
            //                    break;
            //                }

            //            }

            //        }

            //    }
            //}
            //else {
            //    for (var i = 0; i < this.userProfileList.length; i++) {
            //        if (this.userProfileList[i].CHECKBOX_ENABLED == true) {
            //            this.userProfileList[i].ASSIGN = true;
            //        }
            //    }
            //}
        }
        catch (ex) {
            this.clientErrorMsg(ex, "checkAllCheckboxes");
        }
    }
    onFilterList(filterList) {
        this.filterList = filterList;
        if (this.filterList == null) {
            this.isFiltered = false;
        }
        else {
            this.isFiltered = true;
        }
    }

    uncheckAllCheckboxes() {
        try {
            this.lstCheckedBUnits = [];
            this.startIndex = + sessionStorage.getItem("Recordsstartindex");
            this.endIndex = + sessionStorage.getItem("RecordsEndindex");
            if (this.lstGridFilterData != null && this.lstGridFilterData != undefined && this.lstGridFilterData.length > 0) {
                if (this.endIndex > this.lstGridFilterData.length) {
                    this.endIndex = this.lstGridFilterData.length;
                }
                for (let i = this.endIndex - 1; i >= this.startIndex; i--) {
                    if (this.lstGridFilterData[i].CHECKBOX_ENABLED == true) {
                        this.lstGridFilterData[i].ASSIGN = false;
                    }
                    this.lstCheckedBUnits.push(this.lstGridFilterData[i]);
                }
            }
            else {
                if (this.endIndex > this.userProfileList.length) {
                    this.endIndex = this.userProfileList.length;
                }
                for (let i = this.endIndex - 1; i >= this.startIndex; i--) {
                    if (this.userProfileList[i].CHECKBOX_ENABLED == true) {
                        this.userProfileList[i].ASSIGN = false;
                    }
                    this.lstCheckedBUnits.push(this.userProfileList[i]);
                }
            }
        }
        catch (ex) {
            this.clientErrorMsg(ex, "uncheckAllCheckboxes");
        }
    }

    async getAuditAllowed() {
        try {
            this.spinnerService.start();
            var appId = 0;
            await this.assignProfilesService.GetAuditAllowed(this.userId, appId, this.strMenuCode).catch(this.httpService.handleError).then((res: Response) => {
                let data = res.json();

                switch (data.StatType) {
                    case StatusType.Success: {
                        this.auditFlag = data.Data;
                        this.statusCode = data.StatusCode;
                        break;
                    }
                    case StatusType.Error: {
                        this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                        break;
                    }
                    case StatusType.Warn: {
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                        break;
                    }
                }
                this.spinnerService.stop();
            });
        } catch (ex) {
            this.spinnerService.stop();
            this.clientErrorMsg(ex, "getAuditAllowed");
        }
    }

    async insertAuditData() {
        try {
            this.spinnerService.start();
            var strScreenName = "Assign Profiles";
            await this.assignProfilesService.InsertAuditData(this.auditData, this.userId, strScreenName).forEach((resp: Response) => {

                let data = resp.json();
                switch (data.StatType) {
                    case StatusType.Success: {
                        var response = data.DataList;
                        this.statusCode = data.StatusCode;
                        break;
                    }
                    case StatusType.Error: {
                        this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                        break;
                    }
                    case StatusType.Warn: {
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                        break;
                    }
                    case StatusType.Custom: {
                        this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                        break;
                    }
                }
                this.spinnerService.stop();
            });
        } catch (ex) {
            this.clientErrorMsg(ex, "insertAuditData");
        }
    }

    ngOnDestroy() {
        this._deviceTokenEntry = null;
        this.statusCode = null;
        this.userId = null;
        this.uId = null;
        this.orgGrpId = null;
        this.profileId = null;
        this.fName = null;
        this.lDap = null;
        this.organization = null;
        this.statusMessage = null;
        this.errorCode = null;
        this.m_strPwdReq = null;
        this.auditFlag = null;
        this.userProfileList = null;
        this.userProf = null;
        this.userProfile = null;
        this.profileDataList = null;
        this.profileData = null;
        this.saveUserProfileList = null;
        this.saveUserProfile = null;
        this.spinnerService.stop();
        this.spinnerService = null;

    }

    clientErrorMsg(strExMsg, funName) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }
}
