import { Component, OnDestroy,Inject } from '@angular/core';
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { MT_ATPAR_SECURITY_PARAMS } from '../Entities/MT_ATPAR_SECURITY_PARAMS'
import * as CryptoJS from 'crypto-js';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { TokenEntry_Enum, YesNo_Enum, ClientType, StatusType } from '../Shared/AtParEnums';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { SpinnerSentEvent } from '../components/spinner/spinner.sent.event';
import { Headers, Http, Response, Jsonp } from '@angular/http';
import { SecurityConfigurationService } from './atpar-security-configuration.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Message } from './../components/common/api';
import { AtParConstants } from '../Shared/AtParConstants';
import { DOCUMENT } from '@angular/platform-browser';

declare var module: {
    id: string;
}
@Component({
    providers: [HttpService, SecurityConfigurationService],
    templateUrl: 'atpar-security-configuration.component.html',
})
export class SecurityConfigurationComponent {
    public securityParams = new MT_ATPAR_SECURITY_PARAMS()

    chkPassWdResetReq: boolean = false;
    chkMaintainPassWdHistory: boolean = false;
    chkPassWdHistory: boolean = false;
    chkSecAudit: boolean = false;
    chkPassWdReqHHT: boolean = false;
    chkRegisteredDevices: boolean = false;
    pswComplexity: any[] = [];
    values: any[] = [];
    growlMsgs: Message[] = [];
    minLengthStatus: number = 0;
    maxLengthStatus: number = 0;
    pswExpPeriodStatus: number = 0;
    noOfLoginAttemptsStatus: number = 0;
    ldapPswExpStatus: number = 0;
    loading: boolean = false;
    constructor(private httpService: HttpService, @Inject(DOCUMENT)  private  document,
        private spinnerService: SpinnerService, private secConfigService: SecurityConfigurationService
        , public atParConstants: AtParConstants
    ) {

    }
    async  getSecurityParams() {
        try {
            var atweb = new AtParWebApiResponse<MT_ATPAR_SECURITY_PARAMS>();
            this.spinnerService.start();
            await this.secConfigService.getSecurityParams().then((res: Response) => {

                atweb = res.json() as AtParWebApiResponse<MT_ATPAR_SECURITY_PARAMS>
                this.spinnerService.stop();
                switch (atweb.StatType) {

                    case StatusType.Success: {
                        this.securityParams.PASSWD_MAX_LENGTH = atweb.Data.PASSWD_MAX_LENGTH;
                        this.securityParams.PASSWD_MIN_LENGTH = atweb.Data.PASSWD_MIN_LENGTH;
                        this.securityParams.PASSWD_EXP_PERIOD = atweb.Data.PASSWD_EXP_PERIOD;
                        this.securityParams.ALLOWED_INVALID_LOGIN_ATTEMPTS = atweb.Data.ALLOWED_INVALID_LOGIN_ATTEMPTS;
                        this.securityParams.LDAP_PASS_EXP_ALTMSG = atweb.Data.LDAP_PASS_EXP_ALTMSG;
                        this.securityParams.LOGIN_HISTORY = atweb.Data.LOGIN_HISTORY;
                        this.securityParams.PASSWD_COMPLEXITY = atweb.Data.PASSWD_COMPLEXITY;
                        if (atweb.Data.ALLOW_REG_DEVICES.toString() === YesNo_Enum[YesNo_Enum.N])
                            this.chkRegisteredDevices = false;
                        else
                            this.chkRegisteredDevices = true;
                        if (atweb.Data.CHECK_PASSWD_HISTORY === YesNo_Enum[YesNo_Enum.N])
                            this.chkPassWdHistory = false;
                        else
                            this.chkPassWdHistory = true;
                        if (atweb.Data.MAINTAIN_PASSWD_HISTORY === YesNo_Enum[YesNo_Enum.N])
                            this.chkMaintainPassWdHistory = false;
                        else
                            this.chkMaintainPassWdHistory = true;
                        if (atweb.Data.MAINTAIN_SECURITY_AUDIT === YesNo_Enum[YesNo_Enum.N])
                            this.chkSecAudit = false;
                        else
                            this.chkSecAudit = true;
                        if (atweb.Data.PASSWD_RESET_REQUIRED === YesNo_Enum[YesNo_Enum.N])
                            this.chkPassWdResetReq = false;
                        else
                            this.chkPassWdResetReq = true;;
                        if (atweb.Data.PASS_REQ_HHT_USERS === YesNo_Enum[YesNo_Enum.N])
                            this.chkPassWdReqHHT = false;
                        else
                            this.chkPassWdReqHHT = true;
                        break;
                    }
                    case StatusType.Error: {
                        this.growlMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: atweb.StatusMessage.toString() });
                        break;
                    }
                    case StatusType.Warn: {
                        this.growlMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: atweb.StatusMessage.toString() });
                        break;
                    }
                    case StatusType.Custom: {
                        this.growlMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: atweb.StatusMessage.toString() });
                        break;
                    }
                }
            });

            this.spinnerService.stop();
        } catch (ex) {
            this.clientErrorMsg(ex, "getSecurityParams")
        }
    }

    async ngOnInit() {
        this.values.push({ label: '1', value: '1' });
        this.values.push({ label: '2', value: '2' });
        this.pswComplexity.push({ label: '0', value: '0' });
        this.pswComplexity.push({ label: '1', value: '1' });
        this.pswComplexity.push({ label: '2', value: '2' });
        this.pswComplexity.push({ label: '3', value: '3' });

        await this.getSecurityParams();
    }

    async  updateSecurityParams() {
        this.growlMsgs = [];
        try {
            let minPaswLength = this.securityParams.PASSWD_MIN_LENGTH
            let maxPaswLength = this.securityParams.PASSWD_MAX_LENGTH;
            let minLoginAttempts = this.securityParams.ALLOWED_INVALID_LOGIN_ATTEMPTS;
            var atweb = new AtParWebApiResponse<MT_ATPAR_SECURITY_PARAMS>();


            this.spinnerService.start();
            if ((minPaswLength < 1) || (maxPaswLength < 1 || maxPaswLength > 20) || (minLoginAttempts < 1) || parseInt(maxPaswLength.toString()) < parseInt(minPaswLength.toString())) {
                if (parseInt(maxPaswLength.toString()) < parseInt(minPaswLength.toString())) {
                    this.growlMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Maximum Password length should be greater than or equal to Minimum Password length" });
                    //this.growlMsgs.find("Maximum Password length should be greater than or equal to Minimum Password length")
                    this.spinnerService.stop();
                }
                if (minPaswLength < 1 || minPaswLength > 20) {
                    this.growlMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Minimum Password Length Should be between 1 and 20" });
                    this.spinnerService.stop();
                }
                if (maxPaswLength < 1 || maxPaswLength > 20) {
                    this.growlMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Maximum Password Length Should be between 1 and 20" });
                    this.spinnerService.stop();
                }

                if (minLoginAttempts < 1) {
                    this.growlMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Login Attempts Should be Number and greater than zero" });
                    this.spinnerService.stop();
                }
                return;
            }

            else {
                if (this.chkRegisteredDevices == false)
                    this.securityParams.ALLOW_REG_DEVICES = YesNo_Enum[YesNo_Enum.N];
                else
                    this.securityParams.ALLOW_REG_DEVICES = YesNo_Enum[YesNo_Enum.Y];

                if (this.chkPassWdHistory == false)
                    this.securityParams.CHECK_PASSWD_HISTORY = YesNo_Enum[YesNo_Enum.N];
                else
                    this.securityParams.CHECK_PASSWD_HISTORY = YesNo_Enum[YesNo_Enum.Y];

                if (this.chkMaintainPassWdHistory == false)
                    this.securityParams.MAINTAIN_PASSWD_HISTORY = YesNo_Enum[YesNo_Enum.N];
                else
                    this.securityParams.MAINTAIN_PASSWD_HISTORY = YesNo_Enum[YesNo_Enum.Y];

                if (this.chkSecAudit == false)
                    this.securityParams.MAINTAIN_SECURITY_AUDIT = YesNo_Enum[YesNo_Enum.N];
                else
                    this.securityParams.MAINTAIN_SECURITY_AUDIT = YesNo_Enum[YesNo_Enum.Y];

                if (this.chkPassWdResetReq == false)
                    this.securityParams.PASSWD_RESET_REQUIRED = YesNo_Enum[YesNo_Enum.N];
                else
                    this.securityParams.PASSWD_RESET_REQUIRED = YesNo_Enum[YesNo_Enum.Y];

                if (this.chkPassWdReqHHT == false)
                    this.securityParams.PASS_REQ_HHT_USERS = YesNo_Enum[YesNo_Enum.N];
                else
                    this.securityParams.PASS_REQ_HHT_USERS = YesNo_Enum[YesNo_Enum.Y];


                await this.secConfigService.updateSecurityParams(this.securityParams).then((res: Response) => {

                    atweb = res.json() as AtParWebApiResponse<MT_ATPAR_SECURITY_PARAMS>
                    this.spinnerService.stop();
                    switch (atweb.StatType) {
                        case StatusType.Success: {

                            this.getSecurityParams();
                            this.growlMsgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: "Security Parameters Updated Successfully" });
                            document.getElementById('PASSWD_MIN_LENGTH').focus();
                            break;
                        }
                        case StatusType.Error: {

                            this.growlMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: atweb.StatusMessage.toString() });
                            this.getSecurityParams();
                            break;
                        }
                        case StatusType.Warn: {

                            this.growlMsgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: atweb.StatusMessage.toString() });
                            this.getSecurityParams();
                            break;
                        }
                        case StatusType.Custom: {

                            this.growlMsgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: atweb.StatusMessage.toString() });
                            break;
                        }
                    }
                    this.atParConstants.scrollToTop();
                });
            }



            this.spinnerService.stop();

        }
        catch (ex) {
            this.clientErrorMsg(ex, "updateSecurityParams")
        }
    }

    clientErrorMsg(strExMsg, funName) {
        this.growlMsgs = [];
        this.atParConstants.catchClientError(this.growlMsgs, this.spinnerService, strExMsg.toString, funName, this.constructor.name);
    }

    ngOnDestroy() {
        this.securityParams = null;
        this.chkPassWdResetReq = false;
        this.chkMaintainPassWdHistory = false;
        this.chkPassWdHistory = false;
        this.chkSecAudit = false;
        this.chkPassWdReqHHT = false;
        this.pswComplexity = [];
        this.chkRegisteredDevices = false;
        this.values = [];
        this.growlMsgs = [];
        this.spinnerService.stop();
        this.securityParams = null;
        this.spinnerService = null;

    }

    bindModelDataChange(event: any) {
        if ("PASSWD_MIN_LENGTH" == event.TextBoxID.toString()) {
            this.minLengthStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("PASSWD_MAX_LENGTH" == event.TextBoxID.toString()) {
            this.maxLengthStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("PASSWD_EXP_PERIOD" == event.TextBoxID.toString()) {
            this.pswExpPeriodStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("ALLOWED_INVALID_LOGIN_ATTEMPTS" == event.TextBoxID.toString()) {
            this.noOfLoginAttemptsStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if ("LDAP_PASS_EXP_ALTMSG" == event.TextBoxID.toString()) {
            this.ldapPswExpStatus = event.validationrules.filter(x => x.status == false).length;
        }
        if (this.minLengthStatus == 0 && this.maxLengthStatus == 0 && this.pswExpPeriodStatus == 0 && this.noOfLoginAttemptsStatus == 0 && this.ldapPswExpStatus == 0) {
            this.loading = false;
        }
        else {
            this.loading = true;
        }
    }
}