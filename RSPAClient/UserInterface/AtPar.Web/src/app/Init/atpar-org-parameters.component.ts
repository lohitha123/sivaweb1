import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ManageOrgGroupsService } from './atpar-manage-org-groups.service';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { HttpService } from '../Shared/HttpService';
import { Http, Response } from '@angular/http';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { MT_ATPAR_ORG_GROUPS } from '../entities/mt_atpar_org_groups';
import { Message } from './../components/common/api';
import { MT_ATPAR_APP } from '../entities/mt_atpar_app';
import { VM_MT_ATPAR_ORG_GROUP_PARAMETERS } from '../entities/vm_mt_atpar_org_group_parameters';
import { AtParCommonService } from '../Shared/atpar-common.service';
import { MT_ATPAR_SECURITY_AUDIT } from '../Entities/MT_ATPAR_SECURITY_AUDIT';
import { MT_ATPAR_ORG_GROUP_PARAMETERS } from '../entities/mt_atpar_org_group_parameters';
import { TokenEntry_Enum, ClientType, StatusType, EnumApps, Enable_Lot_Serial_Tracking, YesNo_Enum } from '../Shared/AtParEnums';
import { regExpValidator } from '../components/atpartext/Validators';
import { AtParConstants } from '../Shared/AtParConstants';
declare var module: {
    id: string;
}
@Component({
    templateUrl: 'atpar-org-parameters.component.html',
    providers: [ManageOrgGroupsService, AtParCommonService, HttpService, AtParConstants],

})

export class OrgParametersComponent {
    deviceTokenEntry: any;
    strOrgGrpId: string;
    ddOrgGroupdata: any;
    ddProductType: any;
    strMenuCode: string;
    orgGroupId: string;
    orgGroupName: string;
    statusMsgs: Message[] = [];
    orgGroupLst: MT_ATPAR_ORG_GROUPS[];
    strUserID: string;
    atParAppsLst: MT_ATPAR_APP[];
    atParOrgGrpParametersLst: VM_MT_ATPAR_ORG_GROUP_PARAMETERS[];
    divOrgParamsData: boolean;
    ddlApps: any;
    strAppId: string = "-1";
    strAudit: string
    selectedOrgGrpId: string = "0";
    selectedOrgGrpName: string = "";
    selectedProductType: string;
    datableOrgParams: any;
    auditSecurity: MT_ATPAR_SECURITY_AUDIT;
    assignParamEntity: MT_ATPAR_ORG_GROUP_PARAMETERS;
    assignParamLst: Array<MT_ATPAR_ORG_GROUP_PARAMETERS>;
    auditSecurityLst: Array<MT_ATPAR_SECURITY_AUDIT>;
    isShow: boolean = false;
    loading: boolean = true;
    deviceIDStatus: number;
    descStatus: number;
    macAddressStatus: number;
    blnddlOrgGrpID: boolean = false;
    recallParameter: string = "false";
    boolAudit: boolean = false;
    blnCall: boolean = true;
    blnChkBillingSystem: boolean = false;
    disableButton: boolean = false;
    recallStatus: number = 0;
    puserStatus: number = 0;
    defaultBUnitStatus: number = 0;
    customViewErpUser: number = 0;
    receiveappStatus: number = 0;
    receiveFacility: number = 0;
    countQtyThreshold: number = 0;
    countDlrValueThres: number = 0;
    countSendPort: number = 0;
    countRecevApp: number = 0;
    countRecevFacility: number = 0;
    countRecevAddress: number = 0;
    sendLowStockEmailAlertsStatus: number = 0;
    sendProductExpEmailAlertsStatus: number = 0;
    defaultPriorityStatus: number = 0;
    maxnoOfRecordsStatus: number = 0;
    limiOfListsStatus: number = 0;
    badgeTrackingNo: number = 0;
    noOfRequestsforSame: number = 0;
    emailIdLowStockAlerts: number = 0;
    emailIdProductExpAlerts: number = 0;
    percentageOptimalQty: number = 0;
    emailIdForAlerts: number = 0;
    defaultLeadTimeStatus: number = 0;
    constructor(
        private route: ActivatedRoute,
        private mngOrgGroupsService: ManageOrgGroupsService,
        private spinnerService: SpinnerService,
        private atParCommonService: AtParCommonService,
        private atParConstant: AtParConstants,
        private httpService: HttpService
    ) {

    }

    async  ngOnInit() {
        try {
            this.spinnerService.start();
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            this.strUserID = this.deviceTokenEntry[TokenEntry_Enum.UserID];
            this.strOrgGrpId = this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID];
            this.strMenuCode = localStorage.getItem("menuCode");
            await this.getUserOrgGroups();
            await this.getApps();
            this.spinnerService.stop();
        }
        catch (ex) {
            this.displayCatchException(ex, "ngOnInit");
        }
    }

    async  getUserOrgGroups() {
        try {
            this.blnddlOrgGrpID = false;
            await this.atParCommonService.getUserOrgGroups(this.deviceTokenEntry[TokenEntry_Enum.UserID],
                this.deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>;
                    this.orgGroupLst = res.json().DataList;
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.ddOrgGroupdata = [];
                            if (this.orgGroupLst != null && this.orgGroupLst.length > 0) {
                                if (this.orgGroupLst.length == 1) {
                                    this.selectedOrgGrpName = this.orgGroupLst[0].ORG_GROUP_ID + " - " + this.orgGroupLst[0].ORG_GROUP_NAME;
                                    this.selectedOrgGrpId = this.orgGroupLst[0].ORG_GROUP_ID;
                                    this.blnddlOrgGrpID = true;
                                }
                            }
                            this.ddOrgGroupdata.push({ label: "Select One", value: "0" });
                            if (this.orgGroupLst != null && this.orgGroupLst.length > 0) {
                                for (let x = 0; x < this.orgGroupLst.length; x++) {
                                    this.ddOrgGroupdata.push({
                                        label: this.orgGroupLst[x].ORG_GROUP_ID + " - " + this.orgGroupLst[x].ORG_GROUP_NAME,
                                        value: this.orgGroupLst[x].ORG_GROUP_ID
                                    });
                                }
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
                        case StatusType.Custom: {
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });

        }
        catch (ex) {
            this.displayCatchException(ex, "getUserOrgGroups");
        }
    }

    async  getApps() {
        try {

            await this.atParCommonService.getApps(this.strUserID).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<MT_ATPAR_APP>;
                    this.atParAppsLst = res.json().DataList;
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.ddlApps = [];
                            this.ddlApps.push({ label: "Select One", value: "-1" });
                            if (this.atParAppsLst.length > 0) {
                                for (var i = 0; i <= this.atParAppsLst.length - 1; i++) {
                                    if (this.atParAppsLst[i].APP_ID.toString().toLocaleUpperCase() != "0" && this.atParAppsLst[i].APP_ID != EnumApps.Reports) {
                                        this.ddlApps.push({ label: this.atParAppsLst[i].APP_NAME.toString(), value: this.atParAppsLst[i].APP_ID.toString() });
                                    }
                                }
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
                        case StatusType.Custom: {
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });

        } catch (ex) {
            this.displayCatchException(ex, "getApps");
        }

    }

    async getAppParameters(strUserID, strGrpID, strAppId) {

        try {

            await this.atParCommonService.getAppParameters(strUserID, strGrpID, strAppId).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<VM_MT_ATPAR_ORG_GROUP_PARAMETERS>;

                    this.atParOrgGrpParametersLst = res.json().DataList;
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.isShow = true;
                            this.addValidations();
                            break;
                        }
                        case StatusType.Warn: {
                            this.isShow = false;
                            this.divOrgParamsData = false;
                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Error: {
                            this.isShow = false;
                            this.divOrgParamsData = false;
                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                            break;
                        }
                        case StatusType.Custom: {
                            this.isShow = false;
                            this.divOrgParamsData = false;
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });

            await this.checkAuditAllowed()
        }
        catch (ex) {
            this.divOrgParamsData = false;
            this.displayCatchException(ex, "getAppParameters");
        }
    }

    async checkAuditAllowed() {
        try {
            this.strAudit = "";
            await this.atParCommonService.getAuditAllowed(EnumApps.Auth, this.strMenuCode).
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<string>;

                    switch (data.StatType) {
                        case StatusType.Success: {
                            if (data.DataVariable != null) {
                                this.strAudit = data.DataVariable.toString();
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
                        case StatusType.Custom: {
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });

        } catch (ex) {
            this.displayCatchException(ex, "checkAuditAllowed");
        }
    }

    async addValidations() {
        try {
            for (let x = 0; x <= this.atParOrgGrpParametersLst.length - 1; x++) {
                this.atParOrgGrpParametersLst[x].BLN_DISABLE = false
                this.atParOrgGrpParametersLst[x].OLD_PARAMETERVALUE = this.atParOrgGrpParametersLst[x].PARAMETER_VALUE;
                if (this.atParOrgGrpParametersLst[x].PARAMETER_TYPE == "CHECKBOX") {
                    if (this.atParOrgGrpParametersLst[x].PARAMETER_VALUE == "Y") {
                        this.atParOrgGrpParametersLst[x].PARAMETER_VALUE = true;
                    } else {
                        this.atParOrgGrpParametersLst[x].PARAMETER_VALUE = false;
                    }
                }
                if (this.atParOrgGrpParametersLst[x].PARAMETER_TYPE == "RADIO") {
                    if (this.atParOrgGrpParametersLst[x].PARAMETER_ID == "LOT_SERIAL_ENABLED" ||
                        this.atParOrgGrpParametersLst[x].PARAMETER_ID == "PICK_ENABLE_LOT_SRL_TRACKING") {
                        let paramVal = this.atParOrgGrpParametersLst[x].PARAMETER_VALUE;
                        let filterItem = this.atParOrgGrpParametersLst.filter(x => x.PARAMETER_ID == "PICK_SEND_LOT_SRL_INFO_TO_MMIS");
                        let filterItem1 = this.atParOrgGrpParametersLst.filter(x => x.PARAMETER_ID == "SEND_LOT_SERIAL_INFO_TO_MMIS");

                        if (paramVal == "MMIS") {

                            if (filterItem != null && filterItem.length > 0) {
                                if (filterItem[0].PARAMETER_TYPE == "CHECKBOX") {
                                    filterItem[0].PARAMETER_VALUE = true;
                                    filterItem[0].BLN_DISABLE = true;
                                }
                            }
                            if (filterItem1 != null && filterItem1.length > 0) {
                                if (filterItem1[0].PARAMETER_TYPE == "CHECKBOX") {
                                    filterItem1[0].PARAMETER_VALUE = true;
                                    filterItem1[0].BLN_DISABLE = true;
                                }
                            }
                        } else if (paramVal == "None") {

                            if (filterItem != null && filterItem.length > 0) {
                                if (filterItem[0].PARAMETER_TYPE == "CHECKBOX") {
                                    filterItem[0].BLN_DISABLE = false;
                                }
                            }
                            if (filterItem1 != null && filterItem1.length > 0) {
                                if (filterItem1[0].PARAMETER_TYPE == "CHECKBOX") {
                                    filterItem1[0].PARAMETER_VALUE = false;
                                    filterItem1[0].BLN_DISABLE = true;
                                }
                            }
                        }
                        else {
                            if (filterItem != null && filterItem.length > 0) {
                                filterItem[0].BLN_DISABLE = false;
                            }
                            if (filterItem1 != null && filterItem1.length > 0) {
                                filterItem1[0].BLN_DISABLE = false;
                            }
                        }
                    }
                }
                if (this.atParOrgGrpParametersLst[x].PARAMETER_TYPE == "TEXTBOX" ||
                    this.atParOrgGrpParametersLst[x].PARAMETER_TYPE == "TEXT" ||
                    this.atParOrgGrpParametersLst[x].PARAMETER_TYPE == "TEXTAREA") {

                    if (this.atParOrgGrpParametersLst[x].VALIDATION == "NUMBER") {
                        this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                    }
                    if (this.atParOrgGrpParametersLst[x].VALIDATION == "EMAIL") {
                        this.atParOrgGrpParametersLst[x].Title = "Should follow Email pattern";
                    }
                    switch (this.atParOrgGrpParametersLst[x].PARAMETER_ID) {
                        case "REASON_CODE" || "ADJ_REASON_CODE":
                            {
                                this.atParOrgGrpParametersLst[x].VALIDATION =
                                    this.atParOrgGrpParametersLst[x].VALIDATION + "," + "Max=10";
                                break;
                            }
                        case "MAX_NO_OF_REC_DOWNLOAD":
                            {
                                this.atParOrgGrpParametersLst[x].VALIDATION =
                                    this.atParOrgGrpParametersLst[x].VALIDATION + "," + "Mandatory,Max=2"
                                if (this.atParOrgGrpParametersLst[x].PARAMETER_VALUE != "") {
                                    if (!this.disableButton) {
                                        this.disableButton = false;
                                    }
                                } else {
                                    this.disableButton = true;
                                    this.maxnoOfRecordsStatus = 1;
                                }
                                break;
                            }
                        case "FACTOR_OF_SAFETY":
                            {
                                if (this.atParOrgGrpParametersLst[x].VALIDATION == "NUMBER") {
                                    this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                }
                                this.atParOrgGrpParametersLst[x].VALIDATION =
                                    this.atParOrgGrpParametersLst[x].VALIDATION + "," + "Max=3";
                                break;
                            }


                        case "RECALL_NOTIFICATION_EMAIL":
                            {
                                this.atParOrgGrpParametersLst[x].Title = "Should follow Email pattern";
                                if (this.recallParameter == "true") {
                                    this.atParOrgGrpParametersLst[x].VALIDATION = "Mandatory,EMAIL";
                                } else {
                                    this.atParOrgGrpParametersLst[x].VALIDATION = "EMAIL"
                                }
                                if (this.atParOrgGrpParametersLst[x].PARAMETER_VALUE != "") {

                                    var emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                    let validate = (new RegExp(emailPattern)).test(this.atParOrgGrpParametersLst[x].PARAMETER_VALUE) ? true : false;
                                    if (validate) {
                                        //if already disabled , should not enable for next iteration
                                        if (!this.disableButton) {
                                            this.disableButton = false;
                                        }
                                    } else {
                                        this.disableButton = true;
                                        this.recallStatus = 1;
                                    }
                                } else {
                                    if (this.recallParameter == "true") {
                                        this.disableButton = true;
                                        this.recallStatus = 1;
                                    }
                                }
                                break;
                            }
                        case "RECORDS_PER_PAGE":
                            {
                                this.atParOrgGrpParametersLst[x].VALIDATION = "NUMBER";
                                this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                break;
                            }
                        case "DEFAULT_DATE_RANGE": {
                            this.atParOrgGrpParametersLst[x].VALIDATION = "NUMBER,MAX=3";
                            this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                            break;
                        }
                        case "DEFAULT_LEAD_TIME": {
                            this.atParOrgGrpParametersLst[x].VALIDATION = "Mandatory,NUMBER,MAX=3";
                            this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                            if (this.atParOrgGrpParametersLst[x].PARAMETER_VALUE != "") {
                                //if already disabled , should not enable for next iteration
                                if (!this.disableButton) {
                                    this.disableButton = false;
                                }
                            } else {
                                this.disableButton = true;
                                this.defaultLeadTimeStatus = 1;
                            }

                            break;
                        }
                        case "PS_USER": {
                            this.atParOrgGrpParametersLst[x].VALIDATION = "Mandatory,alpha_numeric_underscore_hyphen_nospace,Max=10";
                            this.atParOrgGrpParametersLst[x].Title = "Please enter a characters or numbers or _-";
                            if (this.atParOrgGrpParametersLst[x].PARAMETER_VALUE != "") {
                                //if already disabled , should not enable for next iteration
                                if (!this.disableButton) {
                                    this.disableButton = false;
                                }
                            } else {
                                this.disableButton = true;
                                this.puserStatus = 1;
                            }
                            break;
                        }
                        case "DEFAULT_PRIORITY": {
                            this.atParOrgGrpParametersLst[x].VALIDATION = "Mandatory,NUMBER,MAX=2";
                            this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                            if (this.atParOrgGrpParametersLst[x].PARAMETER_VALUE != "") {
                                if (!this.disableButton) {
                                    this.disableButton = false;
                                }
                            } else {
                                this.disableButton = true;
                                this.defaultPriorityStatus = 1;
                            }
                            break;
                        }
                        case "BADGE_TRACK_INFO":
                            {
                                this.atParOrgGrpParametersLst[x].VALIDATION = "Mandatory,NUMBER,MAX=1"
                                this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                if (this.atParOrgGrpParametersLst[x].PARAMETER_VALUE != "") {
                                    if (!this.disableButton) {
                                        this.disableButton = false;
                                    }
                                } else {
                                    this.disableButton = true;
                                    this.badgeTrackingNo = 1;
                                }
                                break;
                            }
                        case "LIMIT_OF_LISTS": {
                            this.atParOrgGrpParametersLst[x].VALIDATION = "Mandatory,NUMBER,MAX=2";
                            this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                            if (this.atParOrgGrpParametersLst[x].PARAMETER_VALUE != "") {
                                if (!this.disableButton) {
                                    this.disableButton = false;
                                }
                            } else {
                                this.disableButton = true;
                                this.limiOfListsStatus = 1;
                            }
                            break;
                        }
                        case "DEFAULT_BUSINESS_UNIT": {
                            this.atParOrgGrpParametersLst[x].VALIDATION = "Mandatory,alpha_numeric_underscore_hyphen_nospace,Max=10";
                            this.atParOrgGrpParametersLst[x].Title = "Please enter a characters or numbers or _-";
                            if (this.atParOrgGrpParametersLst[x].PARAMETER_VALUE != "") {
                                if (!this.disableButton) {
                                    this.disableButton = false;
                                }
                            } else {
                                this.disableButton = true;
                                this.defaultBUnitStatus = 1;
                            }
                            break;
                        }
                        case "B_MAX_STOR": {
                            this.atParOrgGrpParametersLst[x].VALIDATION = "NUMBER,MAX=4";
                            this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                            break;
                        }
                        case "E_MAX_STOR": {
                            this.atParOrgGrpParametersLst[x].VALIDATION = "NUMBER,MAX=4";
                            this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                            break;
                        }
                        case "F_MAX_STOR": {
                            this.atParOrgGrpParametersLst[x].VALIDATION = "NUMBER,MAX=4";
                            this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                            break;
                        }
                        case "NO_OF_REQUESTS_FOR_SAME_EQ_ITM": {
                            this.atParOrgGrpParametersLst[x].VALIDATION = "Mandatory,NUMBER,MAX=4,MIN=1";
                            this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                            if (this.atParOrgGrpParametersLst[x].PARAMETER_VALUE != "") {
                                if (!this.disableButton) {
                                    this.disableButton = false;
                                }
                            } else {
                                this.disableButton = true;
                                this.noOfRequestsforSame = 1;
                            }

                            break;
                        }
                        case "EMAILID_FOR_ALERTS": {
                            this.atParOrgGrpParametersLst[x].VALIDATION = "EMAIL,MAX=50";
                            this.atParOrgGrpParametersLst[x].Title = "Should follow Email pattern";
                            break;
                        }
                        case "FREQUENCY_EMAIL_ALERTS": {
                            this.atParOrgGrpParametersLst[x].VALIDATION = "NUMBER,MAX=10";
                            this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                            break;
                        }
                        case "PERCENTAGE_OPTIMUM_QTY": {
                            this.atParOrgGrpParametersLst[x].VALIDATION = "Mandatory,NUMBER,MAX=3";
                            this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                            if (this.atParOrgGrpParametersLst[x].PARAMETER_VALUE != "") {
                                if (!this.disableButton) {
                                    this.disableButton = false;
                                }
                            } else {
                                this.disableButton = true;
                                this.percentageOptimalQty = 1;
                            }
                            break;
                        }
                        case "REFRESH_DATA_PERIOD": {
                            this.atParOrgGrpParametersLst[x].VALIDATION = "NUMBER,MAX=10";
                            this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                            break;
                        }
                        case "SYNC_FREQUENCY": {
                            this.atParOrgGrpParametersLst[x].VALIDATION = "NUMBER,MAX=2";
                            this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                            break;
                        }
                        case "CUSTOM_VIEW_ERPUSER": {
                            this.atParOrgGrpParametersLst[x].VALIDATION = "Mandatory";
                            if (this.atParOrgGrpParametersLst[x].PARAMETER_VALUE != "") {
                                if (!this.disableButton) {
                                    this.disableButton = false;
                                }
                            } else {
                                this.disableButton = true;
                                this.customViewErpUser = 1;
                            }
                            break;
                        }
                        case "EMAILID_FOR_LOWSTOCK_ALERTS": {
                            let filterRecord = this.atParOrgGrpParametersLst.filter(option => option.PARAMETER_ID == "SEND_LOWSTOCK_EMAIL_ALERTS")
                            if (filterRecord != null && filterRecord.length > 0) {
                                if (filterRecord[0].PARAMETER_VALUE == YesNo_Enum.Y.toString() ||
                                    filterRecord[0].PARAMETER_VALUE == true) {
                                    this.atParOrgGrpParametersLst[x].VALIDATION = "Mandaory,EMAIL";
                                    if (this.atParOrgGrpParametersLst[x].PARAMETER_VALUE != "") {
                                        if (!this.disableButton) {
                                            this.disableButton = false;
                                        }
                                    } else {
                                        this.disableButton = true;
                                        this.emailIdLowStockAlerts = 1;
                                    }

                                } else {

                                    this.atParOrgGrpParametersLst[x].VALIDATION = "EMAIL";
                                }
                            }

                            this.atParOrgGrpParametersLst[x].Title = "Should follow Email pattern";
                            break;
                        }
                        case "EMAILID_FOR_PRODUCT_EXP_ALERTS":
                            {
                                let filterRecord = this.atParOrgGrpParametersLst.filter(option => option.PARAMETER_ID == "SEND_PRODUCT_EXP_EMAIL_ALERTS")
                                if (filterRecord != null && filterRecord.length > 0) {
                                    if (filterRecord[0].PARAMETER_VALUE == YesNo_Enum.Y.toString() ||
                                        filterRecord[0].PARAMETER_VALUE == true) {
                                        this.atParOrgGrpParametersLst[x].VALIDATION = "Mandaory,EMAIL";
                                        if (this.atParOrgGrpParametersLst[x].PARAMETER_VALUE != "") {
                                            if (!this.disableButton) {
                                                this.disableButton = false;
                                            }
                                        } else {
                                            this.disableButton = true;
                                            this.emailIdProductExpAlerts = 1;
                                        }

                                    } else {

                                        this.atParOrgGrpParametersLst[x].VALIDATION = "EMAIL";
                                    }
                                }
                                this.atParOrgGrpParametersLst[x].Title = "Should follow Email pattern";

                                break;
                            }

                        case "REQUESTOR_EMAIL_TABLE": {
                            this.atParOrgGrpParametersLst[x].VALIDATION = "MAX=50";
                            this.atParOrgGrpParametersLst[x].Title = "Table/view name to read Email ID for Requestor - Number of characters cannot be more than 50";
                            break;
                        }

                        case "SEND_LOWSTOCK_EMAIL_ALERTS": {
                            if (this.atParOrgGrpParametersLst[x].PARAMETER_VALUE == YesNo_Enum.Y.toString() ||
                                this.atParOrgGrpParametersLst[x].PARAMETER_VALUE == true) {
                                var filteritem = this.atParOrgGrpParametersLst.filter(x => x.PARAMETER_ID == "EMAILID_FOR_LOWSTOCK_ALERTS");
                                if (filteritem != null) {
                                    filteritem[0].VALIDATION = "Mandatory,EMAIL";
                                    if (filteritem[0].PARAMETER_VALUE != "") {

                                        var emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                        let validate = (new RegExp(emailPattern)).test(filteritem[0].PARAMETER_VALUE) ? true : false;
                                        if (validate) {
                                            //if already disabled , should not enable for next iteration
                                            if (!this.disableButton) {
                                                this.disableButton = false;
                                            }
                                        } else {
                                            this.disableButton = true;
                                            this.sendLowStockEmailAlertsStatus = 1;
                                        }
                                    } else {
                                        this.disableButton = true;
                                        this.sendLowStockEmailAlertsStatus = 1;
                                    }
                                }
                            }


                            break;
                        }

                        case "SEND_PRODUCT_EXP_EMAIL_ALERTS": {
                            if (this.atParOrgGrpParametersLst[x].PARAMETER_VALUE == YesNo_Enum.Y.toString()) {
                                if (this.atParOrgGrpParametersLst[x].PARAMETER_VALUE == YesNo_Enum.Y.toString() ||
                                    this.atParOrgGrpParametersLst[x].PARAMETER_VALUE == true) {
                                    var filteritem = this.atParOrgGrpParametersLst.filter(x => x.PARAMETER_ID
                                        == "EMAILID_FOR_PRODUCT_EXP_ALERTS");
                                    if (filteritem != null) {
                                        filteritem[0].VALIDATION = "Mandatory,EMAIL";
                                        if (filteritem[0].PARAMETER_VALUE != "") {

                                            var emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                            let validate = (new RegExp(emailPattern)).test(filteritem[0].PARAMETER_VALUE) ? true : false;
                                            if (validate) {
                                                //if already disabled , should not enable for next iteration
                                                if (!this.disableButton) {
                                                    this.disableButton = false;
                                                }
                                            } else {
                                                this.disableButton = true;
                                                this.sendProductExpEmailAlertsStatus = 0
                                            }
                                        } else {
                                            this.disableButton = true;
                                            this.sendProductExpEmailAlertsStatus = 0;
                                        }
                                    }
                                }
                            }
                            break;
                        }

                        case "ADT_BILLING_SEND_ADDRESS":
                            {
                                this.atParOrgGrpParametersLst[x].VALIDATION = "NUMBER,MAX=2";
                                this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                break;
                            }
                        case "ADT_BILLING_SEND_PORT":
                            {
                                this.atParOrgGrpParametersLst[x].VALIDATION = "NUMBER,MAX=2";
                                this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                break;
                            }
                        case "ADT_BILLING_THRESHOLD_VALUE":
                            {
                                this.atParOrgGrpParametersLst[x].VALIDATION = "NUMBER,MAX=2";
                                this.atParOrgGrpParametersLst[x].Title = "Allow Only Numbers";
                                break;
                            }
                        case "ADT_RECEIVING_APPLICATION":
                            {
                                this.atParOrgGrpParametersLst[x].VALIDATION = "alpha_numerics_nospace";
                                this.atParOrgGrpParametersLst[x].Title = "Allow the Alphabets and Numbers";
                                break;
                            }
                        case "ADT_RECEIVING_FACILITY":
                            {
                                this.atParOrgGrpParametersLst[x].VALIDATION = "alpha_numerics_nospace";
                                this.atParOrgGrpParametersLst[x].Title = "Allow the Alphabets and Numbers";
                                break;
                            }
                        case "COUNT_QTY_THRESHOLD":
                            {
                                this.atParOrgGrpParametersLst[x].VALIDATION = "Mandatory,numerics_doubleprecision";
                                this.atParOrgGrpParametersLst[x].Title = "Allows numerics,a double precision value";
                                if (this.atParOrgGrpParametersLst[x].PARAMETER_VALUE != "") {
                                    //if already disabled , should not enable for next iteration
                                    if (!this.disableButton) {
                                        this.disableButton = false;
                                    }
                                } else {
                                    this.disableButton = true;
                                    this.countQtyThreshold = 1;
                                }
                                break;
                            }
                        case "COUNT_DLR_VALUE_THRESHOLD":
                            {
                                this.atParOrgGrpParametersLst[x].VALIDATION = "Mandatory,numerics_doubleprecision";
                                if (this.atParOrgGrpParametersLst[x].PARAMETER_VALUE != "") {
                                    //if already disabled , should not enable for next iteration
                                    if (!this.disableButton) {
                                        this.disableButton = false;
                                    }
                                } else {
                                    this.disableButton = true;
                                    this.countDlrValueThres = 1;
                                }
                                this.atParOrgGrpParametersLst[x].Title = "Allows numerics,a double precision value";
                                break;
                            }
                        case "CUSTOM_SQL_DESTLOCATION":
                            {
                                this.atParOrgGrpParametersLst[x].PARAMETER_TYPE = "TEXTAREA";
                                break;
                            }
                        case "CUSTOM_SQL_DEPT":
                            {
                                this.atParOrgGrpParametersLst[x].PARAMETER_TYPE = "TEXTAREA";
                                break;
                            }



                    }
                }
            }
        }
        catch (ex) {
            this.displayCatchException(ex, "addValidations");
        }
    }

    async getReCallInfo() {
        try {
            this.recallParameter = "false";
            await this.atParCommonService.getCheckRecall().
                catch(this.httpService.handleError).then((res: Response) => {
                    let data = res.json() as AtParWebApiResponse<boolean>;
                    switch (data.StatType) {
                        case StatusType.Success: {
                            this.recallParameter = data.DataVariable.toString();
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
                        case StatusType.Custom: {
                            this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                            break;
                        }
                    }
                });
        } catch (ex) {
            this.displayCatchException(ex, "getReCallInfo");
        }
    }

    ddlChnage() {
        this.isShow = false;
    }

    async btnGo_Click() {
        try {
            this.disableButton = false;
            this.statusMsgs = [];
            this.spinnerService.start();
            if (this.selectedOrgGrpId == "" || this.selectedOrgGrpId == '0' || this.strAppId == '-1' || this.strAppId == "") {

                if (this.selectedOrgGrpId == '0' && this.strAppId == '-1') {
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Org Group and Product are Mandatory" });
                    this.atParOrgGrpParametersLst = [];
                    this.isShow = false;
                    this.spinnerService.stop();
                    return false;
                }
                else if (this.selectedOrgGrpId == '0') {
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Org Group Is Mandatory" });
                    this.atParOrgGrpParametersLst = [];
                    this.spinnerService.stop();
                    this.isShow = false;
                    return false;
                }
                else if (this.strAppId == '-1') {
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Product Is Mandatory" });
                    this.atParOrgGrpParametersLst = [];
                    this.spinnerService.stop();

                    this.isShow = false;
                    return false;
                }

            }
            if (parseInt(this.strAppId) > 0) {

                await this.getReCallInfo()

                await this.getAppParameters(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.selectedOrgGrpId, this.strAppId);
            }
            this.spinnerService.stop();
        } catch (ex) {
            this.displayCatchException(ex, "btnGo_Click");
        }

    }

    async  checkBillingInformation() {
        try {
            if (this.atParOrgGrpParametersLst != null) {
                let filterItems = this.atParOrgGrpParametersLst.filter(x =>
                    x.PARAMETER_ID == "ADT_BILLING_SEND_ADDRESS" ||
                    x.PARAMETER_ID == "ADT_RECEIVING_APPLICATION" ||
                    x.PARAMETER_ID == "ADT_RECEIVING_FACILITY" ||
                    x.PARAMETER_ID == "ADT_BILLING_SEND_PORT");
                if (filterItems != null && filterItems.length > 0) {
                    for (let x = 0; x < filterItems.length; x++) {
                        if (filterItems[x].PARAMETER_VALUE != "") {
                            return true;
                        }
                    }
                }

            }
            return false;
        }
        catch (ex) {
            this.displayCatchException(ex, "checkBillingInformation");
            return false;
        }

    }

    async btnSaveParams_Click() {
        try {
            this.statusMsgs = [];
            this.spinnerService.start();
            if (this.selectedOrgGrpId == "" || this.selectedOrgGrpId == '0' || this.strAppId == '-1' || this.strAppId == "") {

                if (this.selectedOrgGrpId == '0' && this.strAppId == '-1') {
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Org Group and Product are Mandatory" });
                    this.atParOrgGrpParametersLst = [];
                    this.isShow = false;
                    this.spinnerService.stop();
                    return false;
                }
                else if (this.selectedOrgGrpId == '0') {
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Org Group Is Mandatory" });
                    this.atParOrgGrpParametersLst = [];
                    this.isShow = false;
                    this.spinnerService.stop();
                    return false;
                }
                else if (this.strAppId == '-1') {
                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Product Is Mandatory" });
                    this.atParOrgGrpParametersLst = [];
                    this.isShow = false;
                    this.spinnerService.stop();
                    return false;
                }

            }
            await this.saveOrgParameters();

            this.spinnerService.stop();
        } catch (ex) {
            this.displayCatchException(ex, "btnSaveParams_Click");
        }
    }

    async saveOrgParameters() {
        try {

            this.statusMsgs = [];

            if (this.strAppId == EnumApps.PointOfUse.toString()) {
                this.blnChkBillingSystem = await this.checkBillingInformation();
            }
            let blnvalidation = await this.changeInput();

        }
        catch (ex) {
            this.displayCatchException(ex, "saveOrgParameters");
        }
    }

    //todo remove
    //public async validateInput(): Promise<boolean> {
    //    try {

    //        let blnCheckValueAsNone: boolean = false;
    //        let blnCheckRadioValue: boolean = false;
    //        let boolAudit: boolean = false;
    //        let blnChkCustSQLDept: boolean = false;
    //        let strParamID: string = "";
    //        let strNewParamValue: any = "";
    //        let strOldParamValue: string = "";
    //        for (var i = 0; i <= this.atParOrgGrpParametersLst.length - 1; i++) {
    //            this.assignParamEntity = new MT_ATPAR_ORG_GROUP_PARAMETERS();
    //            if (this.atParOrgGrpParametersLst[i].PARAMETER_TYPE.toString() == "RADIO") {
    //                strParamID = this.atParOrgGrpParametersLst[i].PARAMETER_ID;
    //                if (strParamID == "PICK_ENABLE_LOT_SRL_TRACKING" ||
    //                    strParamID == "LOT_SERIAL_ENABLED") {
    //                    if (this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString()
    //                        == Enable_Lot_Serial_Tracking.MMIS.toString()) {
    //                        blnCheckRadioValue = true;
    //                    }
    //                    else if (this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString()
    //                        == Enable_Lot_Serial_Tracking.None.toString()) {
    //                        blnCheckValueAsNone = true;
    //                    } else {
    //                        blnCheckRadioValue = false;
    //                        blnCheckValueAsNone = false;
    //                    }
    //                }
    //            }

    //            if (this.atParOrgGrpParametersLst[i].PARAMETER_TYPE.toString() == "CHECKBOX") {

    //                let strOldChkValue = this.atParOrgGrpParametersLst[i].OLD_PARAMETERVALUE.toString();
    //                strParamID = this.atParOrgGrpParametersLst[i].PARAMETER_ID.toString();
    //                this.assignParamEntity.PARAMETER_ID = strParamID;

    //                if (this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString() == "true" ||
    //                    this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString() == "Y") {

    //                    this.assignParamEntity.PARAMETER_VALUE = "Y";
    //                    if (strOldChkValue != "Y") {
    //                        boolAudit = true;
    //                        this.auditSecurity = new MT_ATPAR_SECURITY_AUDIT();
    //                        this.auditSecurity.OLD_VALUE = "N";
    //                        this.auditSecurity.NEW_VALUE = "Y";
    //                        this.auditSecurity.FIELD_NAME = "PARAMETER_VALUE";
    //                        this.auditSecurity.KEY_1 = this.strOrgGrpId;
    //                        this.auditSecurity.KEY_2 = this.strAppId;
    //                        this.auditSecurity.KEY_3 = strParamID;
    //                        this.auditSecurity.KEY_4 = "";
    //                        this.auditSecurity.KEY_5 = "";
    //                        this.auditSecurityLst.push(this.auditSecurity);

    //                    }
    //                } else {
    //                    this.assignParamEntity.PARAMETER_VALUE = "N";
    //                    if (strOldChkValue != "N") {
    //                        boolAudit = true;
    //                        this.auditSecurity = new MT_ATPAR_SECURITY_AUDIT();
    //                        this.auditSecurity.OLD_VALUE = "Y";
    //                        this.auditSecurity.NEW_VALUE = "N";
    //                        this.auditSecurity.FIELD_NAME = "PARAMETER_VALUE";
    //                        this.auditSecurity.KEY_1 = this.strOrgGrpId;
    //                        this.auditSecurity.KEY_2 = this.strAppId;
    //                        this.auditSecurity.KEY_3 = strParamID;
    //                        this.auditSecurity.KEY_4 = "";
    //                        this.auditSecurity.KEY_5 = "";
    //                        this.auditSecurityLst.push(this.auditSecurity);

    //                    }
    //                }
    //            }

    //            if (blnCheckRadioValue) {
    //                if (strParamID == "PICK_SEND_LOT_SRL_INFO_TO_MMIS" ||
    //                    strParamID == "SEND_LOT_SERIAL_INFO_TO_MMIS") {
    //                    this.assignParamEntity.PARAMETER_VALUE = "Y";
    //                }
    //            } else if (blnCheckValueAsNone) {
    //                if (strParamID == "PICK_SEND_LOT_SRL_INFO_TO_MMIS" ||
    //                    strParamID == "SEND_LOT_SERIAL_INFO_TO_MMIS") {
    //                    this.assignParamEntity.PARAMETER_VALUE = "N";
    //                }
    //            }
    //            if (strParamID == "VALIDATE_DEPT") {
    //                if (this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString() == "true") {
    //                    if (blnChkCustSQLDept) {
    //                        this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Please provide Custom SQL for Syncing Valid Departments." });
    //                        return false;
    //                    }
    //                }
    //            }


    //            if (this.atParOrgGrpParametersLst[i].PARAMETER_TYPE.toString() == "TEXTBOX") {
    //                strParamID = this.atParOrgGrpParametersLst[i].PARAMETER_ID.toString();
    //                strNewParamValue = this.atParOrgGrpParametersLst[i].PARAMETER_VALUE;
    //                let numaric_regex = /^[0-9]*$/;//"numeric"//
    //                if (this.atParOrgGrpParametersLst[i].VALIDATION == YesNo_Enum.Y.toString() &&
    //                    (this.atParOrgGrpParametersLst[i].PARAMETER_ID == "BADGE_TRACK_INFO")) {

    //                    if (this.atParOrgGrpParametersLst[i].PARAMETER_VALUE != "") {

    //                        if (((new RegExp(numaric_regex)).test(strNewParamValue) ? true : false)) {//!regExpValidator(numaric_regex, strNewParamValue)) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Track Numbers - Please enter a positive numeric value." });
    //                            return false;
    //                        }
    //                        if (this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString() > 3 ||
    //                            this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString() < 1) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "The valid Track Numbers used for reading info from Badge are 1,2,3" });
    //                            return false;
    //                        }
    //                    } else {
    //                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Track Numbers - Please enter valid Swipe Card Track Number" });
    //                        return false;
    //                    }
    //                }

    //                strOldParamValue = this.atParOrgGrpParametersLst[i].OLD_PARAMETERVALUE.toString();

    //                this.assignParamEntity.PARAMETER_ID = strParamID;
    //                this.assignParamEntity.PARAMETER_VALUE = strNewParamValue;
    //                switch (strParamID) {
    //                    //RT 4353
    //                    case "CUSTOM_SQL_DESTLOCATION": {
    //                        this.assignParamEntity.PARAMETER_VALUE = strNewParamValue.replace("'", "''");
    //                        break;
    //                    }

    //                    case "CUSTOM_VIEW_ERPUSER": {
    //                        this.assignParamEntity.PARAMETER_VALUE = strNewParamValue.replace("'", "''");
    //                        break;
    //                    }

    //                    case "CUSTOM_SQL_DEPT": {
    //                        this.assignParamEntity.PARAMETER_VALUE = strNewParamValue.replace("'", "''");
    //                        break;
    //                    }

    //                    case "DEFAULT_DURATION": {

    //                        if (!regExpValidator(numaric_regex, strNewParamValue)) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Default Duration in days - Please enter a positive numeric value." });
    //                            return false;
    //                        } else if (this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString().length > 2) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Default Duration in days - Number of digits cannot be more than 2" });
    //                            return false;
    //                        }
    //                        break;
    //                    }

    //                    case "DURATION_TRACKING_EXP": {
    //                        if (!regExpValidator(numaric_regex, strNewParamValue)) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Duration Tracking Expiration in days - Please enter a positive numeric value." });
    //                            return false;
    //                        } else if (strNewParamValue.toString().length > 3) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Duration Tracking Expiration in days - Number of digits cannot be more than 3" });
    //                            return false;
    //                        }
    //                        break;
    //                    }

    //                    case "FACTOR_OF_SAFETY": {

    //                        if (strNewParamValue != "") {
    //                            if (((new RegExp(numaric_regex)).test(strNewParamValue) ? true : false)) { //(!regExpValidator(numaric_regex, strNewParamValue)) {
    //                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Factor of safety for recommended par - Please enter a positive numeric value." });
    //                                return false;
    //                            } else if (strNewParamValue.toString().length > 3) {
    //                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Factor of safety for recommended par - Number of digits cannot be more than 3" });
    //                                return false;
    //                            }
    //                        }
    //                        break;
    //                    }

    //                    case "RECORDS_PER_PAGE": {
    //                        if (!regExpValidator(numaric_regex, strNewParamValue)) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No. Of records per page - Please enter a positive numeric value." });
    //                            return false;
    //                        } else if (strNewParamValue.toString().length > 4) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No. Of records per page - Number of digits cannot be more than 4" });
    //                            return false;
    //                        }
    //                    }

    //                    case "DEFAULT_DATE_RANGE": {
    //                        if (!regExpValidator(numaric_regex, strNewParamValue)) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Default Date Range - Please enter a positive numeric value." });
    //                            return false;
    //                        } else if (strNewParamValue.toString().length > 2) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Default Date Range - Number of digits cannot be more than 3" });
    //                            return false;
    //                        }
    //                        break;
    //                    }

    //                    case "MAX_NO_OF_REC_DOWNLOAD": {
    //                        if (!regExpValidator(numaric_regex, strNewParamValue)) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Max Number of Records to download - Please enter a positive numeric value." });
    //                            return false;
    //                        } else if (strNewParamValue.toString().length > 2) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Max Number of Records to download - Number of digits cannot be more than 2" });
    //                            return false;
    //                        }
    //                        //NB-0003466
    //                        if (!(strNewParamValue.toString().length > 0)) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Max Number of Records to download - Should not be less than 1." });
    //                            return false;
    //                        }
    //                        break;
    //                    }

    //                    case "PS_USER": {
    //                        let alphaNumaric_RegEx = "alpha_numeric_underscore_hyphen_nospace"; //"/^[a- zA-Z0-9_-]+$/";
    //                        if (strNewParamValue.toString() == "") {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "User ID - Please enter characters or numbers or _." });
    //                            return false;
    //                        } else if (!regExpValidator(alphaNumaric_RegEx, strNewParamValue)) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "User ID - Please enter characters or numbers or _." });
    //                            return false;
    //                        } else if (strNewParamValue.toString().length > 10) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "User ID - Number of characters cannot be more than 10" });
    //                            return false;
    //                        }
    //                        break;
    //                    }

    //                    case "DEFAULT_PRIORITY": {
    //                        if (!regExpValidator(numaric_regex, strNewParamValue)) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Default Location Priority - Please enter a positive numeric value." });
    //                            return false;
    //                        } else if (strNewParamValue.toString().length > 2) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Default Location Priority - Number of digits cannot be more than 2" });
    //                            return false;
    //                        }
    //                        break;
    //                    }

    //                    case "LIMIT_OF_LISTS": {
    //                        if (!regExpValidator(numaric_regex, strNewParamValue)) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Limit number of downloaded pick plans - Please enter a positive numeric value." });
    //                            return false;
    //                        } else if (strNewParamValue.toString().length > 2) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Limit number of downloaded pick plans - Number of digits cannot be more than 2" });
    //                            return false;
    //                        }
    //                        break;
    //                    }

    //                    case "DEFAULT_BUSINESS_UNIT": {
    //                        let char_RegEx = "alpha_numeric_underscore_hyphen_nospace";//"/^[a-zA-Z_-]+$/";
    //                        if (strNewParamValue.toString() == "") {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Default Business Unit - Please enter characters or numbers or _." });
    //                            return false;
    //                        } else if (!regExpValidator(char_RegEx, strNewParamValue)) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Default Business Unit - Please enter characters or numbers or _." });
    //                            return false;
    //                        } else if (strNewParamValue.toString().length > 10) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Default Business Unit - Number of characters cannot be more than 10" });
    //                            return false;
    //                        }
    //                        break;
    //                    }

    //                    case "REQUESTOR_EMAIL_TABLE": {

    //                        if (strNewParamValue.toString().length > 50) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Table/view name to read Email ID for Requester - Number of characters cannot be more than 50" });
    //                            return false;
    //                        }
    //                        break;
    //                    }

    //                    case "B_MAX_STOR": {
    //                        if (strNewParamValue.toString() != "") {
    //                            if (!regExpValidator(numaric_regex, strNewParamValue)) {
    //                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Max. Storage Period for Box Items - Please enter a positive numeric value." });
    //                                return false;
    //                            } else if (strNewParamValue.toString().length > 4) {
    //                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Max. Storage Period for Box Items - Number of digits cannot be more than 4" });
    //                                return false;
    //                            }
    //                        }
    //                        break;
    //                    }

    //                    case "E_MAX_STOR": {
    //                        if (strNewParamValue.toString() != "") {
    //                            if (!regExpValidator(numaric_regex, strNewParamValue)) {
    //                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Max. Storage Period for Equipment Items - Please enter a positive numeric value." });
    //                                return false;
    //                            } else if (strNewParamValue.toString().length > 4) {
    //                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Max. Storage Period for Equipment Items - Number of digits cannot be more than 4" });
    //                                return false;
    //                            }
    //                        }
    //                        break;
    //                    }

    //                    case "F_MAX_STOR": {
    //                        if (strNewParamValue.toString() != "") {
    //                            if (!regExpValidator(numaric_regex, strNewParamValue)) {
    //                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Max. Storage Period for Furniture Items - Please enter a positive numeric value." });
    //                                return false;
    //                            } else if (strNewParamValue.toString().length > 4) {
    //                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Max. Storage Period for Furniture Items - Number of digits cannot be more than 4" });
    //                                return false;
    //                            }
    //                        }
    //                        break;
    //                    }

    //                    case "NO_OF_REQUESTS_FOR_SAME_EQ_ITM": {
    //                        if (!regExpValidator(numaric_regex, strNewParamValue)) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No. Of Requests for same EQ Item - Please enter a positive numeric value." });
    //                            return false;
    //                        } else if (strNewParamValue.toString().length > 4) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No. Of Requests for same EQ Item - Number of digits cannot be more than 4" });
    //                            return false;
    //                        } else if (strNewParamValue.toString().length == 0) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "No. Of Requests for same EQ Item - should not be less than 1" });
    //                            return false;
    //                        }
    //                        break;
    //                    }

    //                    case "EMAILID_FOR_ALERTS": {
    //                        if (strNewParamValue.toString().length > 50) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Email Id for alerts - Number of characters cannot be more than 50" });
    //                            return false;
    //                        }
    //                        break;
    //                    }

    //                    case "FREQUENCY_EMAIL_ALERTS": {
    //                        if (!regExpValidator(numaric_regex, strNewParamValue)) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Frequency of Email Alerts - Please enter a positive numeric value." });
    //                            return false;
    //                        } else if (strNewParamValue.toString().length > 10) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Frequency of Email Alerts - Number of digits cannot be more than 10" });
    //                            return false;
    //                        }
    //                        break;
    //                    }

    //                    case "PERCENTAGE_OPTIMUM_QTY": {
    //                        if (!regExpValidator(numaric_regex, strNewParamValue)) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Percentage of Optimum quantity - Please enter a positive numeric value." });
    //                            return false;
    //                        } else if (strNewParamValue.toString().length > 3) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Percentage of Optimum quantity - Number of digits cannot be more than 3" });
    //                            return false;
    //                        }
    //                        break;
    //                    }

    //                    case "REFRESH_DATA_PERIOD": {
    //                        if (!regExpValidator(numaric_regex, strNewParamValue)) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Time period for scheduled refresh of ERP data - Please enter a positive numeric value." });
    //                            return false;
    //                        } else if (strNewParamValue.toString().length > 10) {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Time period for scheduled refresh of ERP data - Number of digits cannot be more than 10" });
    //                            return false;
    //                        }
    //                        break;
    //                    }

    //                    case "SYNC_FREQUENCY": {
    //                        if (strNewParamValue.toString() != "") {
    //                            if (!regExpValidator(numaric_regex, strNewParamValue)) {
    //                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Frequency for Syncing - Please enter a positive numeric value." });
    //                                return false;
    //                            } else if (strNewParamValue.toString().length > 2) {
    //                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Frequency for Syncing - Max. allowable Frequency value is 99" });
    //                                return false;
    //                            }
    //                        }
    //                        break;
    //                    }

    //                    case "CUSTOM_SQL_DEPT": {
    //                        if (strNewParamValue.toString() == "") {
    //                            blnChkCustSQLDept = true;
    //                        }
    //                        break;
    //                    }

    //                    case "CUSTOM_VIEW_ERPUSER": {
    //                        if (strNewParamValue.toString() == "") {
    //                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please enter Sql View for Employee details" });
    //                            return false;
    //                        }
    //                        break;
    //                    }

    //                    case "RECALL_NOTIFICATION_EMAIL": {

    //                        if (this.recallParameter == "true") {
    //                            if (strNewParamValue.toString() == "") {
    //                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Email for Recall Notification is Mandatory when Recall Management is implemented" });
    //                                return false;
    //                            }
    //                            if (strNewParamValue.toString() != "") {
    //                                var emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //                                //let recalItem_regex = "/^[a-zA-Z][a-zA-Z|0-9|]*([_][a-zA-Z|0-9]+)*([.][a-zA-Z|0-9]+([_][a-zA-Z|0-9]+)*)?@[a-zA-Z][a-zA-Z|0-9|]*([-][a-zA-Z|0-9]+)*\\.([a-zA-Z][a-zA-Z|0-9]*(\\.[a-zA-Z][a-zA-Z|0-9]*)?)$/";
    //                                let validate = (new RegExp(emailPattern)).test(strNewParamValue) ? true : false;
    //                                if (!validate) {
    //                                    this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Please enter valid Email ID in Email for Recall Notification Text box" });
    //                                    return false;
    //                                }
    //                            }
    //                        }
    //                        break;
    //                    }

    //                    case "CATEGORY_CODE": {
    //                        if (strNewParamValue.toString() != "") {
    //                            let regex = "/^[a-zA-Z0-9_-]+$/";
    //                            let validate = (new RegExp(regex)).test(strNewParamValue) ? true : false;
    //                            if (!validate) {
    //                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Category Code - Please enter characters or numbers or _." });
    //                                return false;
    //                            } else if (strNewParamValue.toString().length > 50) {
    //                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Category Code - Number of characters cannot be more than 50" });
    //                                return false;
    //                            }
    //                        }
    //                        break;
    //                    }

    //                    case "EXCLUDE_CHRG_CODE_ITEMS_BILING": {
    //                        let regex = "/^[a-zA-Z0-9_-]+$/";
    //                        let validate = (new RegExp(regex)).test(strNewParamValue) ? true : false;
    //                        if (!validate) {
    //                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Exclude Items for billing - Please enter characters or numbers" });
    //                            return false;
    //                        }
    //                        break;
    //                    }

    //                    case "ADT_BILLING_SEND_ADDRESS": {
    //                        if (this.blnChkBillingSystem == true) {
    //                            let regex = "/^[0-9.]+$/";
    //                            let validate = (new RegExp(regex)).test(strNewParamValue) ? true : false;

    //                            if (strNewParamValue.toString() == "") {
    //                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Billing Send Address - Please enter numbers" });
    //                                return false;
    //                            } else if (!validate) {
    //                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Billing Send Address - Please enter positive numbers" });
    //                                return false;
    //                            }
    //                        }
    //                        break;
    //                    }

    //                    case "ADT_BILLING_SEND_PORT": {
    //                        if (this.blnChkBillingSystem == true) {
    //                            let regex = "/^[0-9.]+$/";
    //                            let validate = (new RegExp(regex)).test(strNewParamValue) ? true : false;

    //                            if (strNewParamValue.toString() == "") {
    //                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Billing Send Port - Please enter numbers" });
    //                                return false;
    //                            } else if (!validate) {
    //                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Billing Send Port - Please enter positive numbers" });
    //                                return false;
    //                            }
    //                        }
    //                        break;
    //                    }

    //                    case "ADT_RECEIVING_APPLICATION": {
    //                        let regex = "/^[a-zA-Z0-9]+$/";
    //                        let validate = (new RegExp(regex)).test(strNewParamValue) ? true : false;

    //                        if (this.blnChkBillingSystem == true) {
    //                            if (strNewParamValue.toString() == "") {
    //                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Receiving Application - Please enter characters or numbers" });
    //                                return false;
    //                            } else if (!validate) {
    //                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Receiving Application - Please enter characters or numbers" });
    //                                return false;
    //                            }
    //                        }
    //                        break;
    //                    }

    //                    case "ADT_RECEIVING_FACILITY": {

    //                        if (this.blnChkBillingSystem == true) {
    //                            let regex = "/^[a-zA-Z0-9]+$/";
    //                            let validate = (new RegExp(regex)).test(strNewParamValue) ? true : false;

    //                            if (strNewParamValue.toString() == "") {
    //                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Receiving Facility - Please enter characters or numbers" });
    //                                return false;
    //                            } else if (!validate) {
    //                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Receiving Facility - Please enter characters or numbers" });
    //                                return false;
    //                            }
    //                        }
    //                        break;
    //                    }

    //                    case "ADT_BILLING_THRESHOLD_VALUE": {
    //                        if (this.blnChkBillingSystem == true) {
    //                            let validate = (new RegExp(numaric_regex)).test(strNewParamValue) ? true : false;
    //                            if (strNewParamValue.toString() == "") {
    //                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Billing Threshold value - Please enter numbers" });
    //                                return false;
    //                            } else if (!regExpValidator(numaric_regex, strNewParamValue)) {
    //                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Billing Threshold value - Please enter positive numbers" });
    //                                return false;
    //                            }
    //                        }

    //                    }

    //                    case "EMAILID_FOR_LOWSTOCK_ALERTS": {
    //                        var emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //                        // let regex = "/^[a-zA-Z][a-zA-Z|0-9|]*([_][a-zA-Z|0-9]+)*([.][a-zA-Z|0-9]+([_][a-zA-Z|0-9]+)*)?@[a-zA-Z][a-zA-Z|0-9|]*([-][a-zA-Z|0-9]+)*\\.([a-zA-Z][a-zA-Z|0-9]*(\\.[a-zA-Z][a-zA-Z|0-9]*)?)$/";
    //                        let validate = (new RegExp(emailPattern)).test(strNewParamValue) ? true : false;

    //                        if (strNewParamValue.toString() != "") {
    //                            if (!validate) {
    //                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Invalid Email ID for Low Stock Alerts" });
    //                                return false;
    //                            }
    //                        }
    //                        break;
    //                    }

    //                    case "EMAILID_FOR_PRODUCT_EXP_ALERTS": {

    //                        let regex = "/^[a-zA-Z][a-zA-Z|0-9|]*([_][a-zA-Z|0-9]+)*([.][a-zA-Z|0-9]+([_][a-zA-Z|0-9]+)*)?@[a-zA-Z][a-zA-Z|0-9|]*([-][a-zA-Z|0-9]+)*\\.([a-zA-Z][a-zA-Z|0-9]*(\\.[a-zA-Z][a-zA-Z|0-9]*)?)$/";
    //                        let validate = (new RegExp(regex)).test(strNewParamValue) ? true : false;

    //                        if (strNewParamValue.toString() != "") {
    //                            if (!validate) {
    //                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Invalid Email ID for Product Expiration Alerts" });
    //                                return false;
    //                            }
    //                        }
    //                        break;
    //                    }

    //                    case "DEFAULT_LEAD_TIME": {
    //                        let validate = (new RegExp(numaric_regex)).test(strNewParamValue) ? true : false;

    //                        if (!validate) {
    //                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Default lead time in days - Please enter a positive numeric value." });
    //                            return false;
    //                        } else if (strNewParamValue.toString().length > 3) {
    //                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Default lead time in days  - Number of digits cannot be more than 3." });
    //                            return false;
    //                        }
    //                        break;
    //                    }

    //                    case "COUNT_QTY_THRESHOLD": {
    //                        if (strNewParamValue.toString() != "") {
    //                            let regex = "/^[0-9]\\d*(\\.\\d+)?$/";
    //                            let validate = (new RegExp(regex)).test(strNewParamValue) ? true : false;

    //                            if (!validate) {
    //                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Max allowable count quantity - Please enter a positive numeric value." });
    //                                return false;
    //                            } else if (parseInt(strNewParamValue) > 99999999999.99) {
    //                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Max allowable count quantity - Max. allowable count quantity value is 99999999999.99" });
    //                                return false;
    //                            } else if (parseInt(strNewParamValue) <= 0) {
    //                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Max allowable count quantity - Can not be zero" });
    //                                return false;
    //                            }
    //                        } else if (strNewParamValue.toString().length == 0) {
    //                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Max allowable count quantity - Please enter Numeric Value" });
    //                            return false;
    //                        }
    //                        break;
    //                    }

    //                    case "COUNT_DLR_VALUE_THRESHOLD": {
    //                        if (strNewParamValue.toString() != "") {
    //                            let regex = "/^[0-9]\\d*(\\.\\d+)?$/";
    //                            let validate = (new RegExp(regex)).test(strNewParamValue) ? true : false;

    //                            if (!validate) {
    //                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Max allowable value $ - Please enter a positive numeric value." });
    //                                return false;
    //                            } else if (parseInt(strNewParamValue.toString()) > 99999999999.99) {
    //                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Max allowable value $ - Max. allowable $ value is 99999999999.99" });
    //                                return false;
    //                            } else if (parseInt(strNewParamValue.toString()) <= 0) {
    //                                this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Max allowable value $ - Can not be zero" });
    //                                return false;
    //                            }
    //                        } else if (strNewParamValue.toString().length == 0) {
    //                            this.statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Max allowable value $ - Please enter Numeric Value" });
    //                            return false;
    //                        }
    //                        break;
    //                    }

    //                }

    //            }

    //            if (this.atParOrgGrpParametersLst[i].PARAMETER_TYPE.toString() == "RADIO") {
    //                strNewParamValue = this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString();
    //                strParamID = this.atParOrgGrpParametersLst[i].PARAMETER_ID.toString()
    //                strOldParamValue = this.atParOrgGrpParametersLst[i].OLD_PARAMETERVALUE.toString();
    //                this.assignParamEntity.PARAMETER_ID = strParamID;
    //                this.assignParamEntity.PARAMETER_VALUE = strNewParamValue;
    //                if (strOldParamValue != strNewParamValue) {
    //                    boolAudit = true;
    //                    this.auditSecurity = new MT_ATPAR_SECURITY_AUDIT();
    //                    this.auditSecurity.OLD_VALUE = strOldParamValue;
    //                    this.auditSecurity.NEW_VALUE = strNewParamValue;
    //                    this.auditSecurity.FIELD_NAME = "PARAMETER_VALUE";
    //                    this.auditSecurity.KEY_1 = this.strOrgGrpId;
    //                    this.auditSecurity.KEY_2 = this.strAppId;
    //                    this.auditSecurity.KEY_3 = strParamID;
    //                    this.auditSecurity.KEY_4 = "";
    //                    this.auditSecurity.KEY_5 = "";
    //                    this.auditSecurityLst.push(this.auditSecurity);

    //                }

    //            }

    //            this.assignParamLst.push(this.assignParamEntity);
    //        }
    //        return true;
    //    } catch (ex) {
    //        this.displayCatchException(ex);
    //    }
    //}

    async  changeInput() {
        try {
            let blnCheckValueAsNone: boolean = false;
            let blnCheckRadioValue: boolean = false;
            let boolAudit: boolean = false;
            let blnChkCustSQLDept: boolean = false;
            let strParamID: string = "";
            let strNewParamValue: any = "";
            let strOldParamValue: string = "";
            this.statusMsgs = [];
            this.assignParamLst = new Array<MT_ATPAR_ORG_GROUP_PARAMETERS>();
            this.auditSecurityLst = new Array<MT_ATPAR_SECURITY_AUDIT>();
            for (var i = 0; i <= this.atParOrgGrpParametersLst.length - 1; i++) {
                this.statusMsgs = [];
                this.assignParamEntity = new MT_ATPAR_ORG_GROUP_PARAMETERS();
                strParamID = this.atParOrgGrpParametersLst[i].PARAMETER_ID.toString()
                strNewParamValue = this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString();
                strOldParamValue = this.atParOrgGrpParametersLst[i].OLD_PARAMETERVALUE.toString();
                //RADIO
                if (this.atParOrgGrpParametersLst[i].PARAMETER_TYPE.toString() == "RADIO") {

                    this.assignParamEntity.PARAMETER_ID = strParamID;
                    this.assignParamEntity.PARAMETER_VALUE = this.atParOrgGrpParametersLst[i].PARAMETER_VALUE;
                    if (strParamID == "PICK_ENABLE_LOT_SRL_TRACKING" ||
                        strParamID == "LOT_SERIAL_ENABLED") {
                        if (this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString()
                            == Enable_Lot_Serial_Tracking.MMIS.toString()) {
                            blnCheckRadioValue = true;
                        }
                        else if (this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString()
                            == Enable_Lot_Serial_Tracking.None.toString()) {
                            blnCheckValueAsNone = true;
                        } else {
                            blnCheckRadioValue = false;
                            blnCheckValueAsNone = false;
                        }
                        if (this.atParOrgGrpParametersLst[i].PARAMETER_VALUE) {
                            this.atParOrgGrpParametersLst[i].PARAMETER_TYPE = "Y";
                        } else {
                            this.atParOrgGrpParametersLst[i].PARAMETER_TYPE = "N";
                        }
                    }
                    strNewParamValue = this.atParOrgGrpParametersLst[i].PARAMETER_VALUE;
                    strOldParamValue = this.atParOrgGrpParametersLst[i].OLD_PARAMETERVALUE;
                    if (strNewParamValue != strOldParamValue) {
                        boolAudit = true;
                        this.auditSecurity = new MT_ATPAR_SECURITY_AUDIT();
                        this.auditSecurity.OLD_VALUE = "N";
                        this.auditSecurity.NEW_VALUE = "Y";
                        this.auditSecurity.FIELD_NAME = "PARAMETER_VALUE";
                        this.auditSecurity.KEY_1 = this.strOrgGrpId;
                        this.auditSecurity.KEY_2 = this.strAppId;
                        this.auditSecurity.KEY_3 = strParamID;
                        this.auditSecurity.KEY_4 = "";
                        this.auditSecurity.KEY_5 = "";
                        this.auditSecurityLst.push(this.auditSecurity);
                    }
                }

                if (strParamID == "CUSTOM_SQL_DEPT") {
                    if (this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString() == "" ||
                        this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString() == null) {
                        blnChkCustSQLDept = true;
                    }
                }
                //CHECKBOX
                if (this.atParOrgGrpParametersLst[i].PARAMETER_TYPE.toString() == "CHECKBOX") {

                    let strOldChkValue = this.atParOrgGrpParametersLst[i].OLD_PARAMETERVALUE.toString();
                    this.assignParamEntity.PARAMETER_ID = strParamID;

                    if (this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString() == "true" ||
                        this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString() == "Y") {

                        this.assignParamEntity.PARAMETER_VALUE = "Y";
                        if (strOldChkValue != "Y") {
                            boolAudit = true;
                            this.auditSecurity = new MT_ATPAR_SECURITY_AUDIT();
                            this.auditSecurity.OLD_VALUE = "N";
                            this.auditSecurity.NEW_VALUE = "Y";
                            this.auditSecurity.FIELD_NAME = "PARAMETER_VALUE";
                            this.auditSecurity.KEY_1 = this.strOrgGrpId;
                            this.auditSecurity.KEY_2 = this.strAppId;
                            this.auditSecurity.KEY_3 = strParamID;
                            this.auditSecurity.KEY_4 = "";
                            this.auditSecurity.KEY_5 = "";
                            this.auditSecurityLst.push(this.auditSecurity);

                        }
                    } else {
                        this.assignParamEntity.PARAMETER_VALUE = "N";
                        if (strOldChkValue != "N") {
                            boolAudit = true;
                            this.auditSecurity = new MT_ATPAR_SECURITY_AUDIT();
                            this.auditSecurity.OLD_VALUE = "Y";
                            this.auditSecurity.NEW_VALUE = "N";
                            this.auditSecurity.FIELD_NAME = "PARAMETER_VALUE";
                            this.auditSecurity.KEY_1 = this.strOrgGrpId;
                            this.auditSecurity.KEY_2 = this.strAppId;
                            this.auditSecurity.KEY_3 = strParamID;
                            this.auditSecurity.KEY_4 = "";
                            this.auditSecurity.KEY_5 = "";
                            this.auditSecurityLst.push(this.auditSecurity);

                        }
                    }
                    if (blnCheckRadioValue) {
                        if (strParamID == "PICK_SEND_LOT_SRL_INFO_TO_MMIS" ||
                            strParamID == "SEND_LOT_SERIAL_INFO_TO_MMIS") {
                            this.assignParamEntity.PARAMETER_VALUE = "Y";
                        }
                    } else if (blnCheckValueAsNone) {
                        if (strParamID == "PICK_SEND_LOT_SRL_INFO_TO_MMIS" ||
                            strParamID == "SEND_LOT_SERIAL_INFO_TO_MMIS") {
                            this.assignParamEntity.PARAMETER_VALUE = "N";
                        }
                    }
                    if (strParamID == "VALIDATE_DEPT") {
                        if (this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString() == "true" ||
                            this.atParOrgGrpParametersLst[i].PARAMETER_VALUE.toString() == true) {
                            if (blnChkCustSQLDept) {
                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please provide Custom SQL for Syncing Valid Departments." });
                                return false;
                            }
                        }
                    }
                }

                //TEXTBOX
                if (this.atParOrgGrpParametersLst[i].PARAMETER_TYPE.toString() == "TEXTBOX" ||
                    this.atParOrgGrpParametersLst[i].PARAMETER_TYPE.toString() == "TEXT" ||
                    this.atParOrgGrpParametersLst[i].PARAMETER_TYPE.toString() == "TEXTAREA") {
                    {

                        let numaric_regex = /^[0-9.]+$/;
                        this.assignParamEntity.PARAMETER_ID = strParamID;
                        switch (strParamID) {
                            case "BADGE_TRACK_INFO": {
                                if (strNewParamValue != "" && strNewParamValue != null) {
                                    if (parseInt(strNewParamValue) > 3 || parseInt(strNewParamValue) < 1) {
                                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "The valid Track Numbers used for reading info from Badge are 1,2,3" });
                                        let orgId = document.getElementById(this.atParOrgGrpParametersLst[i].PARAMETER_ID);
                                        if (orgId != null) {
                                            orgId.focus();
                                        }
                                        return false;
                                    }
                                }
                                break;
                            }
                            case "ADT_BILLING_SEND_ADDRESS": {
                                if (this.blnChkBillingSystem == true) {
                                    //let regex = "/^[0-9.]+$/";
                                    let validate = (new RegExp(numaric_regex)).test(strNewParamValue) ? true : false;

                                    if (strNewParamValue.toString() == "") {
                                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Billing Send Address - Please enter numbers" });
                                        let orgId = document.getElementById(this.atParOrgGrpParametersLst[i].PARAMETER_ID);
                                        if (orgId != null) {
                                            orgId.focus();
                                        }
                                        return false;
                                    } else if (!validate) {
                                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Billing Send Address - Please enter positive numbers" });
                                        let orgId = document.getElementById(this.atParOrgGrpParametersLst[i].PARAMETER_ID);
                                        if (orgId != null) {
                                            orgId.focus();
                                        }
                                        return false;
                                    }
                                }
                                break;
                            }


                            case "ADT_BILLING_SEND_PORT": {
                                if (this.blnChkBillingSystem == true) {

                                    let validate = (new RegExp(numaric_regex)).test(strNewParamValue) ? true : false;

                                    if (strNewParamValue.toString() == "") {
                                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Billing Send Port - Please enter numbers" });
                                        let orgId = document.getElementById(this.atParOrgGrpParametersLst[i].PARAMETER_ID);
                                        if (orgId != null) {
                                            orgId.focus();
                                        }
                                        return false;
                                    } else if (!validate) {
                                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Billing Send Port - Please enter positive numbers" });
                                        let orgId = document.getElementById(this.atParOrgGrpParametersLst[i].PARAMETER_ID);
                                        if (orgId != null) {
                                            orgId.focus();
                                        }
                                        return false;
                                    }
                                }
                                break;
                            }

                            case "ADT_RECEIVING_APPLICATION": {
                                let regex = /^[a-zA-Z0-9]+$/;
                                let validate = (new RegExp(regex)).test(strNewParamValue) ? true : false;

                                if (this.blnChkBillingSystem == true) {
                                    if (strNewParamValue.toString() == "") {
                                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Receiving Application - Please enter characters or numbers" });
                                        let orgId = document.getElementById(this.atParOrgGrpParametersLst[i].PARAMETER_ID);
                                        if (orgId != null) {
                                            orgId.focus();
                                        }
                                        return false;
                                    } else if (!validate) {
                                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Receiving Application - Please enter characters or numbers" });
                                        let orgId = document.getElementById(this.atParOrgGrpParametersLst[i].PARAMETER_ID);
                                        if (orgId != null) {
                                            orgId.focus();
                                        }
                                        return false;
                                    }
                                }
                                break;
                            }

                            case "ADT_RECEIVING_FACILITY": {
                                this.blnChkBillingSystem = await this.checkBillingInformation();

                                if (this.blnChkBillingSystem == true) {
                                    let regex = /^[a-zA-Z0-9]+$/;
                                    let validate = (new RegExp(regex)).test(strNewParamValue) ? true : false;

                                    if (strNewParamValue.toString() == "") {
                                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Receiving Facility - Please enter characters or numbers" });
                                        let orgId = document.getElementById(this.atParOrgGrpParametersLst[i].PARAMETER_ID);
                                        if (orgId != null) {
                                            orgId.focus();
                                        }
                                        return false;
                                    } else if (!validate) {
                                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Receiving Facility - Please enter characters or numbers" });
                                        let orgId = document.getElementById(this.atParOrgGrpParametersLst[i].PARAMETER_ID);
                                        if (orgId != null) {
                                            orgId.focus();
                                        }
                                        return false;
                                    }
                                }
                                break;
                            }

                            case "ADT_BILLING_THRESHOLD_VALUE": {
                                if (this.blnChkBillingSystem == true) {
                                    let validate = (new RegExp(numaric_regex)).test(strNewParamValue) ? true : false;
                                    if (strNewParamValue.toString() == "") {
                                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Billing Threshold value - Please enter numbers" });
                                        let orgId = document.getElementById(this.atParOrgGrpParametersLst[i].PARAMETER_ID);
                                        if (orgId != null) {
                                            orgId.focus();
                                        }
                                        return false;
                                    } else if (!validate) {
                                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Billing Threshold value - Please enter positive numbers" });
                                        let orgId = document.getElementById(this.atParOrgGrpParametersLst[i].PARAMETER_ID);
                                        if (orgId != null) {
                                            orgId.focus();
                                        }
                                        return false;
                                    }
                                }
                                break;

                            }
                            case "COUNT_QTY_THRESHOLD": {
                                if (strNewParamValue.toString() != "") {
                                    let regex = /^[0-9]\d*(\.\d+)?$/;// "/^[0-9]\\d*(\\.\\d+)?$/";
                                    let validate = (new RegExp(regex)).test(strNewParamValue) ? true : false;

                                    if (!validate) {
                                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Max allowable count quantity - Please enter a positive numeric value." });
                                        let orgId = document.getElementById(this.atParOrgGrpParametersLst[i].PARAMETER_ID);
                                        if (orgId != null) {
                                            orgId.focus();
                                        }
                                        return false;
                                    } else if (parseInt(strNewParamValue) > 99999999999.99) {
                                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Max allowable count quantity - Max. allowable count quantity value is 99999999999.99" });
                                        let orgId = document.getElementById(this.atParOrgGrpParametersLst[i].PARAMETER_ID);
                                        if (orgId != null) {
                                            orgId.focus();
                                        }
                                        return false;
                                    } else if (parseInt(strNewParamValue) <= 0) {
                                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Max allowable count quantity - Can not be zero" });
                                        let orgId = document.getElementById(this.atParOrgGrpParametersLst[i].PARAMETER_ID);
                                        if (orgId != null) {
                                            orgId.focus();
                                        }
                                        return false;
                                    }
                                } else if (strNewParamValue.toString().length == 0) {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Max allowable count quantity - Please enter Numeric Value" });
                                    let orgId = document.getElementById(this.atParOrgGrpParametersLst[i].PARAMETER_ID);
                                    if (orgId != null) {
                                        orgId.focus();
                                    }
                                    return false;
                                }
                                break;
                            }

                            case "COUNT_DLR_VALUE_THRESHOLD": {
                                if (strNewParamValue.toString() != "") {
                                    let regex = /^[0-9]\d*(\.\d+)?$/;
                                    let validate = (new RegExp(regex)).test(strNewParamValue) ? true : false;

                                    if (!validate) {
                                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Max allowable value $ - Please enter a positive numeric value." });
                                        let orgId = document.getElementById(this.atParOrgGrpParametersLst[i].PARAMETER_ID);
                                        if (orgId != null) {
                                            orgId.focus();
                                        }
                                        return false;
                                    } else if (parseInt(strNewParamValue.toString()) > 99999999999.99) {
                                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Max allowable value $ - Max. allowable $ value is 99999999999.99" });
                                        let orgId = document.getElementById(this.atParOrgGrpParametersLst[i].PARAMETER_ID);
                                        if (orgId != null) {
                                            orgId.focus();
                                        }
                                        return false;
                                    } else if (parseInt(strNewParamValue.toString()) <= 0) {
                                        this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Max allowable value $ - Can not be zero" });
                                        let orgId = document.getElementById(this.atParOrgGrpParametersLst[i].PARAMETER_ID);
                                        if (orgId != null) {
                                            orgId.focus();
                                        }
                                        return false;
                                    }
                                } else if (strNewParamValue.toString().length == 0) {
                                    this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Max allowable value $ - Please enter Numeric Value" });
                                    let orgId = document.getElementById(this.atParOrgGrpParametersLst[i].PARAMETER_ID);
                                    if (orgId != null) {
                                        orgId.focus();
                                    }
                                    return false;
                                }
                                break;
                            }
                            case "EMAILID_FOR_LOWSTOCK_ALERTS": {
                                let filterRecord = this.atParOrgGrpParametersLst.filter(option => option.PARAMETER_ID == "SEND_LOWSTOCK_EMAIL_ALERTS")
                                if (filterRecord != null && filterRecord.length > 0) {
                                    
                                    if (filterRecord[0].PARAMETER_VALUE.toString() == YesNo_Enum.Y.toString() ||
                                        filterRecord[0].PARAMETER_VALUE.toString() == 'true') {
                                        if (strNewParamValue == "") {
                                            this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Email ID for Low Stock Alerts is mandatory." });
                                            let orgId = document.getElementById(this.atParOrgGrpParametersLst[i].PARAMETER_ID);
                                            if (orgId != null) {
                                                orgId.focus();
                                            }
                                            return false;
                                        }
                                    }
                                }
                                break;
                            }
                            case "EMAILID_FOR_PRODUCT_EXP_ALERTS":
                                {
                                    let filterRecord = this.atParOrgGrpParametersLst.filter(option => option.PARAMETER_ID == "SEND_PRODUCT_EXP_EMAIL_ALERTS")
                                    if (filterRecord != null && filterRecord.length > 0) {
                                        if (filterRecord[0].PARAMETER_VALUE.toString() == YesNo_Enum.Y.toString() ||
                                            filterRecord[0].PARAMETER_VALUE.toString() == 'true') {
                                            if (strNewParamValue == "") {
                                                this.statusMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Email for Product Expiration Alerts is mandatory." });
                                                let orgId = document.getElementById(this.atParOrgGrpParametersLst[i].PARAMETER_ID);
                                                if (orgId != null) {
                                                    orgId.focus();
                                                }
                                                return false;
                                            }
                                        }
                                    }
                                    break;
                                }
                        }

                                this.assignParamEntity.PARAMETER_VALUE = this.atParOrgGrpParametersLst[i].PARAMETER_VALUE;
                                if (strOldParamValue != strNewParamValue) {
                                    boolAudit = true;
                                    this.auditSecurity = new MT_ATPAR_SECURITY_AUDIT();
                                    this.auditSecurity.OLD_VALUE = "strOldParamValue";
                                    this.auditSecurity.NEW_VALUE = "strNewParamValue";
                                    this.auditSecurity.FIELD_NAME = "PARAMETER_VALUE";
                                    this.auditSecurity.KEY_1 = this.strOrgGrpId;
                                    this.auditSecurity.KEY_2 = this.strAppId;
                                    this.auditSecurity.KEY_3 = strParamID;
                                    this.auditSecurity.KEY_4 = "";
                                    this.auditSecurity.KEY_5 = "";
                                    this.auditSecurityLst.push(this.auditSecurity);

                                }
                        }
                    }
                    this.assignParamLst.push(this.assignParamEntity);
                }
                await this.atParCommonService.saveAppParameters(this.assignParamLst, this.selectedOrgGrpId, this.strAppId, this.strUserID).
                    catch(this.httpService.handleError).then((res: Response) => {
                        let response = res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUP_PARAMETERS>;
                        this.spinnerService.stop();
                        switch (response.StatType) {
                            case StatusType.Success: {
                                if (this.selectedOrgGrpName == "" || this.selectedOrgGrpName == null) {
                                    this.selectedOrgGrpId = '0';
                                }

                                this.strAppId = '-1';
                                this.atParOrgGrpParametersLst = [];
                                this.isShow = false;
                                this.statusMsgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Organization group Parameters Updated Successfully" });
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
                            case StatusType.Custom: {
                                this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                break;
                            }
                        }
                    });
                if (this.boolAudit == true && this.strAudit == "Y") {
                    let strScreenName = this.strMenuCode;

                    await this.atParCommonService.insertAuditData(this.auditSecurityLst, this.strUserID, strScreenName).
                        catch(this.httpService.handleError).then((res: Response) => {
                            let response = res.json() as AtParWebApiResponse<MT_ATPAR_SECURITY_AUDIT>;

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
                                case StatusType.Custom: {
                                    this.statusMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: response.StatusMessage });
                                    break;
                                }
                            }
                        });
                }
            } catch (ex) {
                this.displayCatchException(ex, "changeInput");
            }

        }

    change(option, event) {
            try {
                if (event != null && event != undefined) {
                    if (option.PARAMETER_ID == "SEND_LOWSTOCK_EMAIL_ALERTS") {

                        if (option.PARAMETER_VALUE == YesNo_Enum.Y.toString() ||
                            option.PARAMETER_VALUE == true) {
                            var filteritem = this.atParOrgGrpParametersLst.filter(x => x.PARAMETER_ID == "EMAILID_FOR_LOWSTOCK_ALERTS");
                            if (filteritem != null) {
                                if (filteritem[0].PARAMETER_VALUE == "") {

                                    filteritem[0].VALIDATION = "Mandatory,EMAIL";
                                } else {
                                    filteritem[0].VALIDATION = "EMAIL";
                                }
                            }

                        }
                    }
                    else if (option.PARAMETER_ID == "SEND_PRODUCT_EXP_EMAIL_ALERTS") {
                        if (option.PARAMETER_VALUE == YesNo_Enum.Y.toString() ||
                            option.PARAMETER_VALUE == true) {
                            var filteritem = this.atParOrgGrpParametersLst.filter(x => x.PARAMETER_ID
                                == "EMAILID_FOR_PRODUCT_EXP_ALERTS");
                            if (filteritem != null) {
                                if (filteritem[0].PARAMETER_VALUE == "") {
                                    filteritem[0].VALIDATION = "Mandatory,EMAIL";
                                } else {
                                    filteritem[0].VALIDATION = "EMAIL";
                                }
                            }
                        }
                    }
                }
            } catch (ex) {
                this.displayCatchException(ex, "change");
            }
        }

        onClick(option, event) {

            if (event != null && event != undefined) {
                if (option.PARAMETER_ID == "LOT_SERIAL_ENABLED" ||
                    option.PARAMETER_ID == "PICK_ENABLE_LOT_SRL_TRACKING") {
                    let paramVal = option.PARAMETER_VALUE;
                    let filterItem = this.atParOrgGrpParametersLst.filter(x => x.PARAMETER_ID == "PICK_SEND_LOT_SRL_INFO_TO_MMIS");
                    let filterItem1 = this.atParOrgGrpParametersLst.filter(x => x.PARAMETER_ID == "SEND_LOT_SERIAL_INFO_TO_MMIS");

                    if (paramVal == "MMIS") {

                        if (filterItem != null && filterItem.length > 0) {
                            if (filterItem[0].PARAMETER_TYPE == "CHECKBOX") {
                                filterItem[0].PARAMETER_VALUE = true;
                                filterItem[0].BLN_DISABLE = true;
                            }
                        }
                        if (filterItem1 != null && filterItem1.length > 0) {
                            if (filterItem1[0].PARAMETER_TYPE == "CHECKBOX") {
                                filterItem1[0].PARAMETER_VALUE = true;
                                filterItem1[0].BLN_DISABLE = true;
                            }
                        }
                    } else if (paramVal == "None") {

                        if (filterItem != null && filterItem.length > 0) {
                            if (filterItem[0].PARAMETER_TYPE == "CHECKBOX") {
                                filterItem[0].PARAMETER_VALUE = false;
                                filterItem[0].BLN_DISABLE = true;
                            }
                        }
                        if (filterItem1 != null && filterItem1.length > 0) {
                            if (filterItem1[0].PARAMETER_TYPE == "CHECKBOX") {
                                filterItem1[0].PARAMETER_VALUE = false;
                                filterItem1[0].BLN_DISABLE = true;
                            }
                        }
                    }
                    else {
                        if (filterItem != null && filterItem.length > 0) {
                            filterItem[0].BLN_DISABLE = false;
                        }
                        if (filterItem1 != null && filterItem1.length > 0) {
                            filterItem1[0].BLN_DISABLE = false;
                        }
                    }
                }
            }
        }

        async bindModelDataChange(orgParameter, event: any) {
            try {
                this.disableButton = false;
                if (event != null && event.TextBoxID != null && event.validationrules != null) {

                    if ("ADT_BILLING_SEND_ADDRESS" == event.TextBoxID.toString()) {
                        this.countRecevAddress = event.validationrules.filter(x => x.status == false).length;
                    }
                    if ("ADT_RECEIVING_APPLICATION" == event.TextBoxID.toString()) {
                        this.countRecevApp = event.validationrules.filter(x => x.status == false).length;
                    }
                    if ("ADT_RECEIVING_FACILITY" == event.TextBoxID.toString()) {
                        this.countRecevFacility = event.validationrules.filter(x => x.status == false).length;
                    }
                    if ("ADT_BILLING_SEND_PORT" == event.TextBoxID.toString()) {
                        this.countSendPort = event.validationrules.filter(x => x.status == false).length;
                    }
                    if ("RECALL_NOTIFICATION_EMAIL" == event.TextBoxID.toString()) {
                        this.recallStatus = event.validationrules.filter(x => x.status == false).length;
                    }
                    if ("PS_USER" == event.TextBoxID.toString()) {
                        this.puserStatus = event.validationrules.filter(x => x.status == false).length;
                    }
                    if ("DEFAULT_BUSINESS_UNIT" == event.TextBoxID.toString()) {
                        this.defaultBUnitStatus = event.validationrules.filter(x => x.status == false).length;
                    }
                    if ("CUSTOM_VIEW_ERPUSER" == event.TextBoxID.toString()) {

                        this.customViewErpUser = event.validationrules.filter(x => x.status == false).length;
                    }
                    if ("ADT_RECEIVING_APPLICATION" == event.TextBoxID.toString()) {
                        this.receiveappStatus = event.validationrules.filter(x => x.status == false).length;
                    }
                    if ("ADT_RECEIVING_FACILITY" == event.TextBoxID.toString()) {
                        this.receiveFacility = event.validationrules.filter(x => x.status == false).length;
                    }
                    if ("COUNT_QTY_THRESHOLD" == event.TextBoxID.toString()) {
                        this.countQtyThreshold = event.validationrules.filter(x => x.status == false).length;
                    }
                    if ("COUNT_DLR_VALUE_THRESHOLD" == event.TextBoxID.toString()) {
                        this.countDlrValueThres = event.validationrules.filter(x => x.status == false).length;
                    }
                    if ("SEND_LOWSTOCK_EMAIL_ALERTS" == event.TextBoxID.toString()) {
                        this.sendLowStockEmailAlertsStatus = event.validationrules.filter(x => x.status == false).length;
                    }
                    if ("SEND_PRODUCT_EXP_EMAIL_ALERTS" == event.TextBoxID.toString()) {
                        this.sendProductExpEmailAlertsStatus = event.validationrules.filter(x => x.status == false).length;
                    }
                    if ("SEND_PRODUCT_EXP_EMAIL_ALERTS" == event.TextBoxID.toString()) {
                        this.sendProductExpEmailAlertsStatus = event.validationrules.filter(x => x.status == false).length;
                    }
                    if ("DEFAULT_PRIORITY" == event.TextBoxID.toString()) {
                        this.defaultPriorityStatus = event.validationrules.filter(x => x.status == false).length;
                    }
                    if ("MAX_NO_OF_REC_DOWNLOAD" == event.TextBoxID.toString()) {
                        this.maxnoOfRecordsStatus = event.validationrules.filter(x => x.status == false).length;
                    }
                    if ("LIMIT_OF_LISTS" == event.TextBoxID.toString()) {
                        this.limiOfListsStatus = event.validationrules.filter(x => x.status == false).length;
                    }
                    if ("BADGE_TRACK_INFO" == event.TextBoxID.toString()) {
                        this.badgeTrackingNo = event.validationrules.filter(x => x.status == false).length;
                    }
                    if ("NO_OF_REQUESTS_FOR_SAME_EQ_ITM" == event.TextBoxID.toString()) {
                        this.noOfRequestsforSame = event.validationrules.filter(x => x.status == false).length;
                    }
                    if ("EMAILID_FOR_LOWSTOCK_ALERTS" == event.TextBoxID.toString()) {
                        this.emailIdLowStockAlerts = event.validationrules.filter(x => x.status == false).length;
                    }

                    if ("EMAILID_FOR_PRODUCT_EXP_ALERTS" == event.TextBoxID.toString()) {
                        this.emailIdProductExpAlerts = event.validationrules.filter(x => x.status == false).length;
                    }
                    if ("PERCENTAGE_OPTIMUM_QTY" == event.TextBoxID.toString()) {
                        this.percentageOptimalQty = event.validationrules.filter(x => x.status == false).length;
                    }
                    if ("EMAILID_FOR_ALERTS" == event.TextBoxID.toString()) {
                        this.emailIdForAlerts = event.validationrules.filter(x => x.status == false).length;
                    }
                    if ("DEFAULT_LEAD_TIME" == event.TextBoxID.toString()) {
                        this.defaultLeadTimeStatus = event.validationrules.filter(x => x.status == false).length;
                    }
                    if (this.countRecevAddress == 0 &&
                        this.countRecevApp == 0 &&
                        this.countRecevFacility == 0 &&
                        this.countSendPort == 0 &&
                        this.recallStatus == 0 &&
                        this.puserStatus == 0 &&
                        this.defaultBUnitStatus == 0 &&
                        this.customViewErpUser == 0 &&
                        this.receiveappStatus == 0 &&
                        this.receiveFacility == 0 &&
                        this.countQtyThreshold == 0 &&
                        this.countDlrValueThres == 0 &&
                        this.sendLowStockEmailAlertsStatus == 0 &&
                        this.sendProductExpEmailAlertsStatus == 0 &&
                        this.defaultPriorityStatus == 0 &&
                        this.maxnoOfRecordsStatus == 0 &&
                        this.limiOfListsStatus == 0 &&
                        this.badgeTrackingNo == 0 &&
                        this.noOfRequestsforSame == 0 &&
                        this.percentageOptimalQty == 0 &&
                        this.emailIdForAlerts == 0 &&
                        this.defaultLeadTimeStatus == 0 &&
                        this.emailIdLowStockAlerts == 0 &&
                        this.emailIdProductExpAlerts==0) {
                        this.disableButton = false;
                    } else {
                        this.disableButton = true;
                    }
                }
            } catch (ex) {
                this.displayCatchException(ex, "bindModelDataChange");
            }
        }

        displayCatchException(ex, funName = "") {
            this.statusMsgs = [];
            this.atParConstant.catchClientError(this.statusMsgs, this.spinnerService, ex.toString(), funName, this.constructor.name);

        }

        ngOnDestroy() {
            this.spinnerService = null;
            this.statusMsgs = [];
            this.atParAppsLst = [];
            this.atParOrgGrpParametersLst = [];
            this.auditSecurity = null;
            this.assignParamEntity = null;
            this.assignParamLst = null;
            this.auditSecurityLst = null;
        }
    }