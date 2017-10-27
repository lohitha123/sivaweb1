import { Component, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { Http, Response } from '@angular/http';
import { VM_MT_ATPAR_USER_PARAMS } from '../Entities/VM_MT_ATPAR_USER_PARAMS';
import { MT_ATPAR_USER } from '../Entities/MT_ATPAR_USER';
import { MT_ATPAR_ORG_GROUPS } from '../entities/mt_atpar_org_groups';
import { MT_ATPAR_SECURITY_AUDIT } from '../Entities/MT_ATPAR_SECURITY_AUDIT';
import { MT_ATPAR_USER_APP_PARAMETERS } from '../entities/mt_atpar_user_app_parameters';
import { ATPAR_VALIDATION_RULES } from '../entities/atpar_validation_rules';
import { TokenEntry_Enum, ClientType, StatusType, EnumApps } from '../Shared/AtParEnums';
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { AtParUserParameterService } from './atpar-user-parameters.service';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { AtParConstants } from '../Shared/AtParConstants';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { SpinnerSentEvent } from '../components/spinner/spinner.sent.event';
import { Message } from './../components/common/api';
import { CustomValidations } from '../common/validations/customvalidation';
import { regExpValidator } from '../components/atpartext/Validators';
declare var module: {
    id: string;
}
@Component({
    selector: 'atpar-user-parameters',
    templateUrl: 'atpar-user-parameters.component.html',
    providers: [HttpService, CustomValidations, AtParUserParameterService, AtParCommonService, AtParConstants]
})

export class UserParametersComponent {
    @Input() appId: string;

    userParamsData: VM_MT_ATPAR_USER_PARAMS[];
    ddUserData: MT_ATPAR_USER[];
    _pdsOrgGroup: MT_ATPAR_ORG_GROUPS[];

    user_Parameter_Details: Array<VM_MT_ATPAR_USER_PARAMS>;
    userAppParamList: Array<MT_ATPAR_USER_APP_PARAMETERS>;
    auditSecurityLst: Array<MT_ATPAR_SECURITY_AUDIT>;

    userAppParameters: MT_ATPAR_USER_APP_PARAMETERS;
    auditSecurity: MT_ATPAR_SECURITY_AUDIT;
    validationrule: ATPAR_VALIDATION_RULES;

    statusMsgs: Message[] = [];
    _deviceTokenEntry: string[] = [];
    ddlOrgGrpID: any;//Values[] = [];

    //Variable   
    ddlUserList: any;
    tblCmbList: any;
    intAppId: number;
    statusCode: number = -1;
    statusType: number = -1;

    statType: any;
    statMsg: any;
    selectedItem: any;
    selectedValue: any = "0";

    //boolean variables  
    blnlblOrgGrpId: boolean = false;
    blnddlOrgGrpID: boolean = false;
    blnlblStar: boolean = false;
    blntblGrid: boolean = false;

    chkbCntrl: string = "";
    lblOrgGrpId: string = "";
    lblStatusMessage: string = "";
    strOrgGrpID: string = "";
    strAudit: string = "";
    strMenuCode: string = "";
    dsParams: string = "";
    strUserID: string = undefined;
    loginUserID: string = undefined;
    errorCode: string = "";
    strAuditStatus: string = "";
    txtCntrl: string = "";
    ddUser: string = "";
    selectedOrgGrpID: string = "";

    strWhereCondition: string = "";
    strWhere: string[] = [];
    selectedCbValue: string = "";
    _blnShowDrpDwn: boolean = false;

    constructor(private httpService: HttpService,
        private activatedRoute: ActivatedRoute,
        private validate: CustomValidations,
        private userService: AtParUserParameterService,
        private spinnerService: SpinnerService,
        private commonService: AtParCommonService,
        private atParConstant: AtParConstants) {
    }

    async ngOnInit() {
        try {
            this.intAppId = parseInt(this.appId);
            this.blntblGrid = false;
            this._deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.user_Parameter_Details = new Array<VM_MT_ATPAR_USER_PARAMS>();
            await this.Page_Load();

        }
        catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    }

    async BindDynamicTable() {
        try {
            this.statusMsgs = [];
            this.user_Parameter_Details = [];
            this.spinnerService.start();
            await this.userService.getUserParameters(this.intAppId.toString(), this.strUserID).
                catch(this.httpService.handleError).then((res: Response) => {
                    this.userParamsData = [];
                    this.userParamsData = res.json().DataList;
                    for (let x = 0; x <= this.userParamsData.length - 1; x++) {

                        if (this.userParamsData[x].PARAMETER_TYPE == "CHECKBOX") {
                            if (this.userParamsData[x].PARAMETER_VALUE == "Y") {
                                this.userParamsData[x].PARAMETER_VALUE = 'true';
                            } else {
                                this.userParamsData[x].PARAMETER_VALUE = 'false';
                            }
                        }

                        if (this.userParamsData[x].PARAMETER_TYPE == "TEXTBOX") {
                            if (this.userParamsData[x].PARAMETER_ID == "DEFAULT_CARRIER_ID") {
                                if (this.userParamsData[x].VALIDATION != null && this.userParamsData[x].VALIDATION != "") {
                                    this.userParamsData[x].validationRules = this.userParamsData[x].VALIDATION + "," + "Max=10";
                                } else {
                                    this.userParamsData[x].validationRules = "Max=10";
                                }

                            } else {
                                if (this.userParamsData[x].VALIDATION != null && this.userParamsData[x].VALIDATION != "") {
                                    this.userParamsData[x].validationRules = this.userParamsData[x].VALIDATION + "," + "Max=50";
                                } else {
                                    this.userParamsData[x].validationRules = "Max=50";
                                }
                            }

                        }

                        this.user_Parameter_Details.push(this.userParamsData[x]);
                    }

                });
            this.spinnerService.stop();

        } catch (ex) {
            this.clientErrorMsg(ex,"BindDynamicTable");
        }
    }

    async Page_Load() {
        try {
            this.statusMsgs = [];
            this.spinnerService.start();
            this.statusCode = -1;
            this.blntblGrid = false;
            this.strUserID = this._deviceTokenEntry[TokenEntry_Enum.UserID];
            this.loginUserID = this._deviceTokenEntry[TokenEntry_Enum.UserID];
            if (typeof this.appId == undefined) {
                this.intAppId = 0;
            } else {
                this.intAppId = parseInt(this.appId);
            }

            await this.BindOrgGroups();
            this.ddlUserList = [];
            this.ddlUserList.push({ label: "Select UserID", value: "Select UserID" });
            this.ddUser = "Select UserID";
            if (this.blnlblOrgGrpId == true) {
                await this.PopulateUsersDropDown();
            }

            if (this.blnddlOrgGrpID == true) {
                this.blnlblStar = true;
                sessionStorage.removeItem("dsUserParam");
            }

            if ((sessionStorage.getItem("dsUserParam") != null)) {
                this.blntblGrid = true;
                await this.BindDynamicTable();
            }
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex,"Page_Load");
        }
    }

    async PopulateUsersDropDown() {
        try {
            this.statusMsgs = [];
            this.ddUserData = [];
            if (this._deviceTokenEntry[TokenEntry_Enum.OrgGrpID] != "All") {
                this.strOrgGrpID = this._deviceTokenEntry[TokenEntry_Enum.OrgGrpID];
            }
            if (this.blnddlOrgGrpID == true) {
                this.strOrgGrpID = this.selectedItem;
            }
            this.spinnerService.start();
            //Get Applications and bind to drop down list  this.strUserID
            await this.commonService.getUsersList(this.loginUserID, this.intAppId.toString(),
                this.strOrgGrpID).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_USER>;
                    this.ddUserData = data.DataList,
                        this.statusCode = data.StatusCode;
                    sessionStorage.removeItem("dsUserParam");
                    this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.ddlUserList = [];
                            this.ddlUserList.push({ label: "Select UserID", value: "Select UserID" });
                            for (var i = 0; i < this.ddUserData.length; i++) {
                                this.ddlUserList.push({ label: this.ddUserData[i].FULLNAME, value: this.ddUserData[i].USER_ID });
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "PopulateUsersDropDown");
        }
    }

    async BindOrgGroups() {
        try {
            this.statusMsgs = [];
            this._pdsOrgGroup = [];
            this.spinnerService.start();
            await this.commonService.getUserOrgGroups(this._deviceTokenEntry[TokenEntry_Enum.UserID],
                this._deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    this._pdsOrgGroup = res.json().DataList;
                });
            this.spinnerService.stop();
            if (sessionStorage.getItem("OrgGroupID") != null && sessionStorage.getItem("OrgGroupID") == "All") {
                this.blnddlOrgGrpID = true;

                //Getting the OrgGroupIDs
                await this.commonService.getOrgGroupIDS().
                    catch(this.httpService.handleError).then((res: Response) => {
                        let data = res.json() as AtParWebApiResponse<MT_ATPAR_USER>;
                        this._pdsOrgGroup = res.json().DataList,
                            this.statusCode = res.json().StatusCode;
                        switch (data.StatType) {
                            case StatusType.Success: {
                                break;
                            }
                            case StatusType.Warn: {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                break;
                            }
                            case StatusType.Error: {
                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                break;
                            }
                        }
                    });

                if (this._pdsOrgGroup.length > 0) {
                    this.ddlOrgGrpID = [];
                    this.ddlOrgGrpID.push({ label: "Select One", value: "Select One" });
                    for (var i = 0; i <= this._pdsOrgGroup.length - 1; i++) {
                        if (this._pdsOrgGroup[i].ORG_GROUP_ID.toString() != "All") {
                            this.ddlOrgGrpID.push({ label: this._pdsOrgGroup[i].ORG_GROUP_ID.toString() + " - " + this._pdsOrgGroup[i].ORG_GROUP_NAME.toString(), value: this._pdsOrgGroup[i].ORG_GROUP_ID.toString() });
                        }
                    }
                }
            }
            else {
                this.blnlblOrgGrpId = true;
                this.lblOrgGrpId = this._pdsOrgGroup[0].ORG_GROUP_ID.toString() + " - " + this._pdsOrgGroup[0].ORG_GROUP_NAME.toString();
            }

        } catch (ex) {
            this.clientErrorMsg(ex, "BindOrgGroups");
        }
    }

    async GOClick() {
        try {
            this.statusMsgs = [];
            this.userParamsData = [];
            this.statType = null;
            this.user_Parameter_Details = null;
            //this.blntblGrid = true;
            if ((this.selectedOrgGrpID == "" || this.selectedOrgGrpID == "Select One") && this.blnddlOrgGrpID == true) {
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select Org Group ID" });
                return;
            }
            if (this.ddUser == "" || this.ddUser == "Select UserID") {
                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please Select User ID" });
                return;
            }
            this.spinnerService.start();
            this.strUserID = this.ddUser;
            setTimeout(() => {    
                this.user_Parameter_Details = new Array<VM_MT_ATPAR_USER_PARAMS>();
                this.user_Parameter_Details = [];
            }, 1);
            if (this.user_Parameter_Details == null) {
                await this.userService.getUserParameters(this.intAppId.toString(), this.strUserID).
                    catch(this.httpService.handleError).then((res: Response) => {
                        let data = res.json() as AtParWebApiResponse<VM_MT_ATPAR_USER_PARAMS>;
                        this.userParamsData = [];
                        this.userParamsData = res.json().DataList;
                        this.statType = res.json().StatType;
                        this.statMsg = res.json().StatusMessage;
                    });
                this.spinnerService.stop();
                switch (this.statType) {
                    case StatusType.Success: {

                        if (this.userParamsData.length > 0) {
                            this.blntblGrid = true;
                            this.userAppParamList = new Array<MT_ATPAR_USER_APP_PARAMETERS>();
                            this.userAppParamList = [];
                            this.user_Parameter_Details = [];
                            for (let x = 0; x <= this.userParamsData.length - 1; x++) {

                                if (this.userParamsData[x].PARAMETER_TYPE == "CHECKBOX") {
                                    if (this.userParamsData[x].PARAMETER_VALUE == "Y") {
                                        this.userParamsData[x].PARAMETER_VALUE = true;
                                    } else {
                                        this.userParamsData[x].PARAMETER_VALUE = false;
                                    }
                                }
                                if (this.userParamsData[x].PARAMETER_TYPE == "COMBOBOX") {

                                    if (this.userParamsData[x].PROMPT_TABLE != null) {

                                        this.strWhereCondition = this.userParamsData[x].WHERE_CONDITION;
                                        this.strWhere = this.strWhereCondition.split(',');
                                        this._blnShowDrpDwn = false;
                                        if (this.strWhere.length > 1) {
                                            this._blnShowDrpDwn = true;
                                            let strCondetion: string = "";
                                            if (this.strWhere.length = 2) {

                                                strCondetion = this.strWhere[0].toString() + "='" + this.ddUser + "'";
                                                strCondetion = strCondetion + " AND " + this.strWhere[1].toString() + "='" + this.intAppId + "'";
                                            }
                                            this.strWhereCondition = strCondetion;

                                        } else {
                                            this.strWhereCondition = this.strWhereCondition + "='" + this.ddUser + "'";
                                        }
                                        this.spinnerService.start();
                                        await this.userService.GetParameterValues(this.userParamsData[x].PARAMETER_ID,
                                            this.userParamsData[x].PROMPT_FIELD, this.userParamsData[x].PROMPT_TABLE,
                                            this.strWhereCondition, this.strUserID).
                                            catch(this.httpService.handleError).then((dresp: Response) => {
                                                let data = dresp.json() as AtParWebApiResponse<any>;
                                                this.tblCmbList = [];
                                                this.tblCmbList.push({ label: "Select One", value: "Select One" })
                                                if ((data.DataList != null && data.DataList.length > 0) || this._blnShowDrpDwn) {

                                                    if (data.DataList != null && data.DataList.length > 0) {
                                                        for (let y = 0; y < data.DataList.length; y++) {
                                                            this.tblCmbList.push({ label: data.DataList[y].toString(), value: data.DataList[y].toString() })
                                                        }

                                                    }

                                                } else {
                                                    this.userParamsData[x].PARAMETER_TYPE = "TEXTBOX";
                                                }
                                                this.userParamsData[x].DDLLIST = this.tblCmbList;
                                            });
                                        this.spinnerService.stop();
                                    }

                                }
                                if (this.userParamsData[x].PARAMETER_TYPE == "TEXTBOX" ||
                                    this.userParamsData[x].PARAMETER_TYPE == "TEXT") {
                                    if (this.userParamsData[x].VALIDATION != "" && this.userParamsData[x].VALIDATION == "NUMBER") {

                                        this.userParamsData[x].TITLE = 'Allows Only Numbers'
                                    }
                                    if (this.userParamsData[x].VALIDATION != "" && this.userParamsData[x].VALIDATION == "TEXT") {

                                        this.userParamsData[x].TITLE = 'Allows Numbers Alphabets No Space - /'
                                    }
                                    if (this.userParamsData[x].VALIDATION != "" && this.userParamsData[x].VALIDATION == "TEXTWITHSPACE") {

                                        this.userParamsData[x].TITLE = 'Allows Alphabets Numbers Space'
                                    }
                                    if (this.userParamsData[x].VALIDATION != "" && this.userParamsData[x].VALIDATION == "TEXTWITHSPECIALCHARS") {

                                        this.userParamsData[x].TITLE = 'Allows Any Characters Alphabets Numbers Space'
                                    }
                                    if (this.userParamsData[x].PARAMETER_ID == "DEFAULT_CARRIER_ID") {
                                        if (this.userParamsData[x].VALIDATION != null && this.userParamsData[x].VALIDATION != "") {
                                            this.userParamsData[x].validationRules = this.userParamsData[x].VALIDATION + "," + "Max=10";
                                        } else {
                                            this.userParamsData[x].validationRules = "Max=10";
                                        }

                                    } else {
                                        if (this.userParamsData[x].VALIDATION != null && this.userParamsData[x].VALIDATION != "") {
                                            this.userParamsData[x].validationRules = this.userParamsData[x].VALIDATION + "," + "Max=50";
                                        } else {
                                            this.userParamsData[x].validationRules = "Max=50";
                                        }
                                    }
                                }

                                this.userAppParameters = new MT_ATPAR_USER_APP_PARAMETERS();
                                this.userAppParameters.PARAMETER_ID = this.userParamsData[x].PARAMETER_ID;
                                this.userAppParameters.PARAMETER_VALUE = this.userParamsData[x].PARAMETER_VALUE;
                                this.userAppParameters.APP_ID = this.intAppId;
                                this.userAppParameters.USER_ID = this.strUserID;
                                this.userAppParameters.LAST_CLIENT_ADDRESS = "";
                                this.userAppParameters.LAST_UPDATE_DATE = new Date();
                                this.userAppParameters.LAST_UPDATE_USER = this._deviceTokenEntry[TokenEntry_Enum.UserID];
                                this.user_Parameter_Details.push(this.userParamsData[x]);

                                this.userAppParamList.push(this.userAppParameters);
                            }
                            sessionStorage.setItem("dsUserParam", this.userParamsData.toString());
                        } else {
                            this.blntblGrid = false;
                        }
                        break;
                    }
                    case StatusType.Warn: {
                        this.blntblGrid = false;
                        this.statusMsgs = [];
                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.statMsg });
                        this.spinnerService.stop();
                        break;
                    }
                    case StatusType.Error: {
                        this.blntblGrid = false;
                        this.statusMsgs = [];
                        this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: this.statMsg });
                        this.spinnerService.stop();
                        break;
                    }
                    case StatusType.Custom: {
                        this.statusMsgs = [];
                        this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: this.statMsg });
                        break;
                    }
                }
            }
            //To get Audit Status
            this.strMenuCode = localStorage.getItem("menuCode");
            this.strAudit = "";
            this.spinnerService.start();
            await this.userService.getAuditAllowed(this.intAppId.toString()).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<string>;
                    this.statusCode = data.StatusCode;
                    this.spinnerService.stop();
                    switch (data.StatType) {
                        case StatusType.Success: {
                            if (this.statusCode == AtparStatusCodes.ATPAR_OK && this.strAudit == "Y") {
                                this.auditSecurity = new MT_ATPAR_SECURITY_AUDIT();
                                this.auditSecurity.KEY_1 = "";
                                this.auditSecurity.KEY_2 = "";
                                this.auditSecurity.KEY_3 = "";
                                this.auditSecurity.KEY_4 = "";
                                this.auditSecurity.KEY_5 = "";
                                this.auditSecurity.FIELD_NAME = "";
                                this.auditSecurity.OLD_VALUE = "";
                                this.auditSecurity.NEW_VALUE = "";

                                sessionStorage.setItem("auditSecurity", this.auditSecurity.FIELD_NAME.toString());
                            }
                            break;
                        }
                        case StatusType.Warn: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.statusMsgs = [];
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                    }
                });

            this.spinnerService.stop();
        }
        catch (ex) {
            this.clientErrorMsg(ex, "GOClick");
        }
    }

    async btnSave_Click() {
        try {
            this.statusMsgs = [];
            this.auditSecurityLst = new Array<MT_ATPAR_SECURITY_AUDIT>();
            if (this.userAppParamList != null && this.userAppParamList.length > 0) {
                this.intAppId = parseInt(this.appId);
                //strAuditStatus = lblAudistStatus.Text;
                this.strUserID = this.ddUser;

                //if (strAuditStatus == "Y") {
                //    dtAudit = (DataTable)Session["Audit"];
                //}

                for (let x = 0; x < this.userAppParamList.length; x++) {

                    if (this.userAppParamList[x].PARAMETER_ID == this.user_Parameter_Details[x].PARAMETER_ID) {

                        //For TextBox Control
                        if (this.user_Parameter_Details[x].PARAMETER_TYPE == "TEXTBOX" ||
                            this.user_Parameter_Details[x].PARAMETER_TYPE == "TEXT") {

                            //To get Audit Data
                            if (this.strAuditStatus == "Y") {
                                if (this.userAppParamList[x].PARAMETER_VALUE != this.txtCntrl.toString()) {
                                    this.auditSecurity = new MT_ATPAR_SECURITY_AUDIT();
                                    this.auditSecurity.KEY_1 = this.strUserID.toString();
                                    this.auditSecurity.KEY_2 = this.intAppId.toString();
                                    this.auditSecurity.KEY_3 = this.user_Parameter_Details[x].PARAMETER_ID;
                                    this.auditSecurity.KEY_4 = "USER PARAMETERS";
                                    this.auditSecurity.FIELD_NAME = "PARAMETER_VALUE";
                                    this.auditSecurity.OLD_VALUE = this.userAppParamList[x].PARAMETER_VALUE.toString();
                                    this.auditSecurity.NEW_VALUE = this.txtCntrl.toString();
                                    this.auditSecurityLst.push(this.auditSecurity);
                                }
                            }

                            let txtValue = this.user_Parameter_Details[x].PARAMETER_VALUE.toString();
                            //Implement Validation Code        


                            if (this.user_Parameter_Details[x].VALIDATION != "" && this.user_Parameter_Details[x].VALIDATION == "NUMBER") {
                                let numaric_regex = "numeric";///^[0-9]+$/
                                this.user_Parameter_Details[x].TITLE='Allows Only Numbers'
                                if (!regExpValidator(numaric_regex, txtValue)) {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.user_Parameter_Details[x].SHORT_DESCR + "- Please enter Numerics" });
                                    return;
                                }
                            } else if (this.user_Parameter_Details[x].PARAMETER_VALUE != "" && this.user_Parameter_Details[x].VALIDATION == "TEXT") {
                                this.user_Parameter_Details[x].TITLE = 'Allows Numbers Alphabets - / No Space'
                                if (!regExpValidator("alpha_numeric_underscore_hyphen_backslash_nospace", txtValue)) {
                                    if (this.user_Parameter_Details[x].SHORT_DESCR.toUpperCase().trim() == "DEFAULTCARRIERID") {
                                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Default Carrier ID - Please enter characters or numbers or _ or -" });
                                    } else {
                                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.user_Parameter_Details[x].SHORT_DESCR + " - Please enter characters or numbers or - or _" });
                                    }
                                    return;
                                }
                            } else if (txtValue != "" && this.user_Parameter_Details[x].VALIDATION == "TEXTWITHSPACE") {
                                let regex = "/^[a-zA-Z0-9_\\s/-]+$/"; //alpha_numeric
                                this.user_Parameter_Details[x].TITLE = 'Allows Alphabets Numbers Space'
                                if (!regExpValidator("alpha_numeric_space", txtValue)) {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.user_Parameter_Details[x].SHORT_DESCR + " - Please enter characters or numbers  with Space" });
                                    return;
                                }
                            } else if (txtValue != "" && this.user_Parameter_Details[x].VALIDATION == "TEXTWITHSPECIALCHARS") {
                                let regex = "/^[a-zA-Z0-9_\\s*#&()-/:']+$/";//alpha_numeric_specialcharacters
                                this.user_Parameter_Details[x].TITLE = 'Allows Any Characters Alphabets Numbers Space'
                                if (!regExpValidator("alpha_numeric_specialcharacters_WithSpace", txtValue)) {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.user_Parameter_Details[x].SHORT_DESCR + " - Please enter characters or numbers or Special Charactors(_\\s*#&()-/:) with Space" });
                                    return;
                                }
                            }

                            if (this.user_Parameter_Details[x].PARAMETER_ID == "DEFAULT_CARRIER_ID") {
                                this.txtCntrl = this.txtCntrl.toUpperCase();
                            }
                            let paramValue = this.user_Parameter_Details[x].PARAMETER_VALUE;
                            this.userAppParamList[x].PARAMETER_VALUE = paramValue;

                            if (this.userAppParamList[x].PARAMETER_VALUE == "Select One"){
                                this.userAppParamList[x].PARAMETER_VALUE = "";
                            }

                        }

                        //For CheckBox Control
                        if (this.user_Parameter_Details[x].PARAMETER_TYPE == "CHECKBOX") {

                            //To get Audit Data
                            if (this.strAuditStatus == "Y") {
                                if (this.userAppParamList[x].PARAMETER_VALUE != this.chkbCntrl) {

                                    this.auditSecurity = new MT_ATPAR_SECURITY_AUDIT();
                                    this.auditSecurity.KEY_1 = this.strUserID.toString();
                                    this.auditSecurity.KEY_2 = this.intAppId.toString();
                                    this.auditSecurity.KEY_3 = this.user_Parameter_Details[x].PARAMETER_ID;
                                    this.auditSecurity.KEY_4 = "USER PARAMETERS";
                                    this.auditSecurity.FIELD_NAME = "PARAMETER_VALUE";
                                    this.auditSecurity.OLD_VALUE = this.userAppParamList[x].PARAMETER_VALUE.toString();
                                    this.auditSecurity.NEW_VALUE = this.chkbCntrl.toString();
                                    this.auditSecurityLst.push(this.auditSecurity);
                                }
                            }

                            if (this.chkbCntrl == "Y") {
                                this.userAppParamList[x].PARAMETER_VALUE = "Y";
                            } else {
                                this.userAppParamList[x].PARAMETER_VALUE = "N";
                            }
                        }

                        //For Radio Button
                        if (this.user_Parameter_Details[x].PARAMETER_TYPE == "RADIO") {
                            //To get Audit Data
                            if (this.strAuditStatus == "Y") {
                                if (this.userAppParamList[x].PARAMETER_VALUE != "") {

                                    this.auditSecurity = new MT_ATPAR_SECURITY_AUDIT();
                                    this.auditSecurity.KEY_1 = this.strUserID.toString();
                                    this.auditSecurity.KEY_2 = this.intAppId.toString();
                                    this.auditSecurity.KEY_3 = this.user_Parameter_Details[x].PARAMETER_ID;
                                    this.auditSecurity.KEY_4 = "USER PARAMETERS";
                                    this.auditSecurity.FIELD_NAME = "PARAMETER_VALUE";
                                    this.auditSecurity.OLD_VALUE = this.userAppParamList[x].PARAMETER_VALUE.toString();
                                    this.auditSecurity.NEW_VALUE = "";//rbLstCntrl.SelectedValue;
                                    this.auditSecurityLst.push(this.auditSecurity);
                                }
                            }
                            this.userAppParamList[x].PARAMETER_VALUE = "";//rbLstCntrl.SelectedValue;
                        }

                        //For COMBOBOX
                        if (this.user_Parameter_Details[x].PARAMETER_TYPE == "COMBOBOX") {
                            //To get Audit Data
                            if (this.strAuditStatus == "Y") {
                                if (this.userAppParamList[x].PARAMETER_VALUE != this.user_Parameter_Details[x].PARAMETER_VALUE) {//this.ddCntrl
                                    this.auditSecurity = new MT_ATPAR_SECURITY_AUDIT();
                                    this.auditSecurity.KEY_1 = this.strUserID.toString();
                                    this.auditSecurity.KEY_2 = this.intAppId.toString();
                                    this.auditSecurity.KEY_3 = this.user_Parameter_Details[x].PARAMETER_ID;
                                    this.auditSecurity.KEY_4 = "USER PARAMETERS";
                                    this.auditSecurity.FIELD_NAME = "PARAMETER_VALUE";
                                    this.auditSecurity.OLD_VALUE = this.userAppParamList[x].PARAMETER_VALUE.toString();
                                    this.auditSecurity.NEW_VALUE = this.user_Parameter_Details[x].PARAMETER_VALUE;// this.ddCntrl.toString();
                                    this.auditSecurityLst.push(this.auditSecurity);
                                }
                            }
                            
                            if (this.user_Parameter_Details[x].PARAMETER_VALUE == null || this.user_Parameter_Details[x].PARAMETER_VALUE == "" ||
                                this.userAppParamList[x].PARAMETER_VALUE == "Select One" || this.user_Parameter_Details[x].PARAMETER_VALUE == undefined) {
                                this.userAppParamList[x].PARAMETER_VALUE = "";
                            } else {
                                this.userAppParamList[x].PARAMETER_VALUE = this.user_Parameter_Details[x].PARAMETER_VALUE;// this.ddCntrl.toString();// this.selectedCbValue.toString();
                            }
                        }
                    }
                }

                this.statusCode = -1;
                this.spinnerService.start();
                await this.userService.setUserParams(this.userAppParamList).
                    catch(this.httpService.handleError).then((res: Response) => {
                        let response = res.json() as AtParWebApiResponse<number>;
                        this.statusCode = response.StatusCode;
                        this.spinnerService.stop();
                        switch (response.StatType) {

                            case StatusType.Success: {
                                // ddUser.SelectedIndex = 0; 
                                //this.chkbCntrl = "";                                 
                                this.lblStatusMessage = "Parameters for User - " + this.ddUser + " have been successfully updated. ";//strUserID  
                                this.statusMsgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: this.lblStatusMessage });
                                this.blntblGrid = false;
                                sessionStorage.removeItem("dsUserParam");
                                this.ddUser = "Select UserID";
                                break;
                            }
                            case StatusType.Warn: {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                break;
                            }
                            case StatusType.Error: {
                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                break;
                            }
                        }
                    });
                this.spinnerService.stop();
                //To Insert Audit Data    
                if (this.strAuditStatus == "Y") {
                    this.strMenuCode = localStorage.getItem("menuCode");
                    this.spinnerService.start();
                    await this.userService.insertAuditData(this.auditSecurityLst, "", this.strMenuCode).
                        catch(this.httpService.handleError).then((res: Response) => {
                            let response = res.json() as AtParWebApiResponse<MT_ATPAR_SECURITY_AUDIT>;
                            this.statusCode = response.StatusCode;
                            this.spinnerService.stop();
                            switch (response.StatType) {
                                case StatusType.Success: {
                                    this.statusMsgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: response.StatusMessage });
                                    break;
                                }
                                case StatusType.Warn: {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: response.StatusMessage });
                                    break;
                                }
                                case StatusType.Error: {
                                    this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: response.StatusMessage });
                                    break;
                                }
                            }
                        });
                }
                this.strUserID = this.ddUser;
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "btnSave_Click");
        }
    }

    ngOnDestroy() {
        this.user_Parameter_Details = null;
        this.statusCode = -1;
        this.ddlUserList = null;
        this.userParamsData = null;
        this.ddUserData = null;
        this.validationrule = null;
        this._pdsOrgGroup = null;
        this.ddlOrgGrpID = null;
        this.auditSecurity = null;
        this.auditSecurityLst = null;
        this.userAppParameters = null;
        this.userAppParamList = null;
        this.statusMsgs = null;
        this.chkbCntrl = "";
        this.strWhere = null;
    }

    bindModelDataChange(data: any) {
        this.selectedValue = data.label;
        this.selectedItem = data.value;
        this.blntblGrid = false;
        this.ddUser = "Select UserID";
        if (this.selectedItem == "Select One") {
            this.ddlUserList = [];
            this.ddlUserList.push({ label: "Select UserID", value: "Select UserID" });
            this.ddUser = "Select UserID";
        } else {
            this.PopulateUsersDropDown();
        }
    }

    ddlUserListChange(data: any) {
        this.statusMsgs = [];
        this.blntblGrid = false;
    }

    txtChanged(event: any) {
        this.txtCntrl = event.val;
    }

    ChkBoxChanged(val) {
        if (val) {
            this.chkbCntrl = "Y";
        } else {
            this.chkbCntrl = "N";
        }
    }

    tblCmbListChanged(parameterLst, event) {
        try {
            if (event != null && event != undefined) {
                parameterLst.PARAMETER_VALUE = event.label;
                let val = parameterLst.PARAMETER_VALUE;
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "tblCmbListChanged");
        }
    }

    clientErrorMsg(strExMsg, funName) {
        this.statusMsgs = [];
        this.atParConstant.catchClientError(this.statusMsgs, this.spinnerService, strExMsg.toString());
    }

}

export class Values {
    id: string;
    name: string;
    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }

}

