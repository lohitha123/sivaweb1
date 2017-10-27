import { List, Enumerable } from 'linqts';
import { Title } from '@angular/platform-browser';
import { Component, OnDestroy } from '@angular/core';
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { MT_ATPAR_SECURITY_PARAMS } from '../Entities/MT_ATPAR_SECURITY_PARAMS'
import * as CryptoJS from 'crypto-js';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { TokenEntry_Enum, YesNo_Enum, ClientType, StatusType } from '../Shared/AtParEnums';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { ChangePasswordService } from './atpar-change-password.service';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { SpinnerSentEvent } from '../components/spinner/spinner.sent.event';
import { Headers, Http, Response, Jsonp } from '@angular/http';
import { SecurityConfigurationService } from './atpar-security-configuration.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Message } from './../components/common/api';
import { AtParConstants } from '../Shared/AtParConstants';
import { MT_ATPAR_USER } from '../Entities/MT_ATPAR_USER';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { LeftBarAnimationService } from '../Home/leftbar-animation.service';
import { Menus } from '../AtPar/Menus/routepath';

declare var module: {
    id: string;
}
@Component({
    templateUrl: 'atpar-change-password.component.html',
    providers: [HttpService, ChangePasswordService, AtParConstants, Title]
})

export class ChangePasswordComponent {
    showStyle: boolean = false;
    deviceTokenEntry: string[] = [];
    securityParams: MT_ATPAR_SECURITY_PARAMS;
    growlMsg: Message[] = [];
    complexityOfPwd: string;
    btnSubmit: boolean = true;
    passHash: any;
    txtOldPwd: string = "";
    txtNewPassWd: string = "";
    txtCnfPassWd: string = "";
    txtHintQst: string = "";
    txtHintAns: string = "";
    newPassWd: string = "";
    statusType: any;
    paramuserId: string = '';
    isUserAllowed: boolean = false;
    statusMessage: string = "";
    breadCrumbMenu: Menus;
    message: string = "";
    constructor(private httpService: HttpService,
        public atParConstants: AtParConstants,
        private router: Router,
        private route: ActivatedRoute,
        private title: Title,
        private spinnerService: SpinnerService,
        private changePasswordService: ChangePasswordService,
        private leftBarAnimationService: LeftBarAnimationService) {
        this.breadCrumbMenu = new Menus();

    }

    getMargin() {
        try {
            this.showStyle = this.leftBarAnimationService.getLeftBarMargin();
            if (this.showStyle) {
                return "";
            } else {
                return "0px";
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "getMargin");
        }
    }

    ngOnInit() {
        this.title.setTitle('Change Password');
        try {
            if (localStorage.getItem('AppGroups') != null && localStorage.getItem('AppGroups') != undefined && localStorage.getItem('AppGroups') != '') {
                this.isUserAllowed = true;
            }
            else {
                this.isUserAllowed = false;
            }
            this.deviceTokenEntry = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            setTimeout(function () {
                let txtOldPswdValue = <HTMLInputElement>document.getElementById("oldPwd");
                txtOldPswdValue.focus();
            }, 500);
            if (this.deviceTokenEntry[TokenEntry_Enum.LdapUser] == "Y") {

                this.btnSubmit = false;
                this.growlMsg.push({
                    severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "The current login is a LDAP user, to change the password please refer to your organization's policy"
                });
            }
            else {
                this.route.queryParams.subscribe((params: Params) => {
                    this.paramuserId = params['userId'];

                });

                this.getSecurityParams();
            }

          
        }
        catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
        }
    }

    //=============  START GETSECURITYPARAMS EVENT=========//

    getSecurityParams() {
        this.growlMsg = [];
        try {
            this.spinnerService.start();
            this.changePasswordService.GetSecurityParams().catch(this.httpService.handleError).
                then((res: Response) => {
                    let atweb = res.json() as AtParWebApiResponse<MT_ATPAR_SECURITY_PARAMS>;
                    this.securityParams = atweb.Data;
                    this.spinnerService.stop();
                    switch (atweb.StatType) {
                        case StatusType.Success: {
                            this.SetPassWdComplexityDescr(this.securityParams)
                            break;
                        }
                        case StatusType.Error: {
                            this.growlMsg.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: atweb.StatusMessage.toString() });
                            break;
                        }
                        case StatusType.Warn: {
                            this.growlMsg.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: atweb.StatusMessage.toString() });
                            break;
                        }
                        case StatusType.Custom: {
                            this.growlMsg.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: atweb.StatusMessage.toString() });
                            break;
                        }
                    }
                });

            this.spinnerService.stop();
        }
        catch (ex) {
            this.spinnerService.stop();
            this.clientErrorMsg(ex, "getSecurityParams");
        }
    }

    //=============  END GETSECURITYPARAMS EVENT=========//



    //=============  START GET THE PASSWORD COMPLEXITY FROM SECURITY CONFIGURATION SCREEN=========//

    SetPassWdComplexityDescr(Data: MT_ATPAR_SECURITY_PARAMS) {
        this.complexityOfPwd = "Complexity of the password is ";
        switch (Data.PASSWD_COMPLEXITY) {
            case 0:
                this.complexityOfPwd = this.complexityOfPwd + "<b>Any Characters.</b>";
                break;
            case 1:
                this.complexityOfPwd = this.complexityOfPwd + "<b>Alphabets.</b> ie; Combination of A-Z, a-z";
                break;
            case 2:
                this.complexityOfPwd = this.complexityOfPwd + "<b>Alphanumerics.</b> ie; Combination of A-Z, a-z and 0-9";
                break;
            case 3:
                this.complexityOfPwd = this.complexityOfPwd + "<b>Alphanumeric and Non Alphanumeric.</b> </br> ie; Combination of A-Z, a-z, and 0-9 and ! @ # $";
                break;
        }
    }
    //=============  END GET THE PASSWORD COMPLEXITY FROM SECURITY CONFIGURATION SCREEN=========//



    //=============  START SUBMITT CLICK EVENT=========//
    async btnSubmitClick() {
        this.growlMsg = [];
        try {
            var userId = this.deviceTokenEntry[TokenEntry_Enum.UserID];
            if (this.txtOldPwd.trim() == null || this.txtOldPwd.trim() == undefined || this.txtOldPwd.trim() == '') {
                this.growlMsg.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter Old Password ' });
                let txtOldPasswdValue = <HTMLInputElement>document.getElementById("oldPwd");
                this.txtOldPwd = '';
                txtOldPasswdValue.focus();
                return;
            }
            if (this.txtNewPassWd.trim()== null || this.txtNewPassWd.trim()== undefined || this.txtNewPassWd.trim()== '') {
                this.growlMsg.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: ' Please enter valid New Password' });
                let txtNewPasswdValue = <HTMLInputElement>document.getElementById("newPwd");
                this.txtNewPassWd = '';
                txtNewPasswdValue.focus();
                return;
            }
            if (this.txtCnfPassWd.trim() == null || this.txtCnfPassWd.trim() == undefined || this.txtCnfPassWd.trim() == '') {
                this.growlMsg.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: '  Please enter valid Confirm Password' });
                let txtConfPasswdValue = <HTMLInputElement>document.getElementById("confPwd");
                txtConfPasswdValue.focus();
                return;
            }
            if (this.txtCnfPassWd!= this.txtNewPassWd) {

                this.growlMsg.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: ' New Password and Confirm Password doesnot matched' });
                this.txtCnfPassWd = '';
                var txtConfPassWdValue = <HTMLInputElement>document.getElementById("confPwd");
                txtConfPassWdValue.focus();
                return;

            }

            if (this.txtHintQst.trim() == null || this.txtHintQst.trim() == undefined || this.txtHintQst.trim()== '') {
                this.growlMsg.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: ' Please enter valid Hint Question' });
                let txthintQstvalue = <HTMLInputElement>document.getElementById("hintQst");
                this.txtHintQst = '';
                txthintQstvalue.focus();
                return;
            }
            if (this.txtHintAns.trim() == null || this.txtHintAns.trim() == undefined || this.txtHintAns.trim() == '') {
                this.growlMsg.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Please enter valid Hint Answer' });
                let txthintAnsvalue = <HTMLInputElement>document.getElementById("hintAns");
                this.txtHintAns = '';
                txthintAnsvalue.focus();
                return;
            }
            if (this.txtCnfPassWd!= this.txtNewPassWd) {
                this.growlMsg.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: ' New Password and Confirm Password doesnot matched' });
                this.txtCnfPassWd = '';
                var txtConfPassWdValue = <HTMLInputElement>document.getElementById("confPwd");
                txtConfPassWdValue.focus();
                return;
            }
          
            this.spinnerService.start();
            if (this.txtOldPwd != "") {
                this.passHash = CryptoJS.SHA256(this.txtOldPwd + userId).toString();
            }
            else {
                this.passHash = "";
            }
          
            var key = CryptoJS.enc.Utf8.parse('8080808080808080');
            var iv = CryptoJS.enc.Utf8.parse('8080808080808080');

            let newPwd = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(this.txtNewPassWd), key,
                { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });

            //let navigationExtras: NavigationExtras = null;

            await this.changePasswordService.HashUpdatePassword(this.deviceTokenEntry[TokenEntry_Enum.UserID], this.passHash, newPwd, this.txtHintQst, this.txtHintAns)
                .catch(this.httpService.handleError).then((res: Response) => {
                    this.growlMsg = [];
                    let atweb = res.json() as AtParWebApiResponse<MT_ATPAR_USER>;
                    this.statusType = atweb.StatType
                    this.spinnerService.stop();
                    switch (this.statusType) {
                        case StatusType.Success:
                            this.statusMessage = "password updated successfully";
                            this.growlMsg.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: this.statusMessage });
                            document.getElementById('oldPwd').focus();
                            if (this.paramuserId != null ||
                                this.paramuserId != undefined) {
                                let navigationExtras: NavigationExtras = {
                                    queryParams: { 'statusMessage': this.statusMessage }
                                };
                                this.router.navigate(['login'], navigationExtras);
                            }
                            break;
                        case StatusType.Error: {
                            this.spinnerService.stop();
                            this.growlMsg.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: atweb.StatusMessage.toString() });
                            break;
                        }
                        case StatusType.Warn: {
                            if (atweb.StatusCode == AtparStatusCodes.ATPAR_E_PASSWORDNOTMATCHED) {

                                this.growlMsg.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "old " + atweb.StatusMessage.toString() });
                                (<HTMLInputElement>document.getElementById("oldPwd")).focus();
                            }
                            else if (atweb.StatusCode == AtparStatusCodes.ATPAR_E_PASSWORDMINLENGTH) {

                                this.growlMsg.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: atweb.StatusMessage.split("1%")[0] + " " + this.securityParams.PASSWD_MIN_LENGTH });
                                (<HTMLInputElement>document.getElementById("oldPwd")).focus();
                            }
                            else if (atweb.StatusCode == AtparStatusCodes.ATPAR_E_PASSWORDMAXLENGTH) {

                                this.growlMsg.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: atweb.StatusMessage.split("1%")[0] + " " + this.securityParams.PASSWD_MAX_LENGTH });
                                (<HTMLInputElement>document.getElementById("oldPwd")).focus();
                            }
                            else {

                                this.growlMsg.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: atweb.StatusMessage.toString() });
                                (<HTMLInputElement>document.getElementById("oldPwd")).focus();
                            }
                            break;
                        }
                        case StatusType.Custom: {

                            this.growlMsg.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: atweb.StatusMessage.toString() });
                            break;
                        }
                    }
                });
        }
        catch (ex) {
            this.spinnerService.stop();
            this.clientErrorMsg(ex, "btnSubmitClick");
        }
        this.txtOldPwd = '';
        this.txtNewPassWd = '';
        this.txtCnfPassWd = '';
        this.txtHintQst = '';
        this.txtHintAns = '';

    }
    clientErrorMsg(strExMsg, funName) {
        this.growlMsg = [];
        this.atParConstants.catchClientError(this.growlMsg, this.spinnerService, strExMsg.toString, funName, this.constructor.name);
    }
    //=============  END SUBMITT CLICK EVENT=========//


    //============= START CLEARING THE GLOBAL VARIBLES=========//
    ngOnDestroy() {
        this.deviceTokenEntry = null;
        this.growlMsg = [];
        this.securityParams = null;
        this.complexityOfPwd = null;
        this.passHash = null;
        this.txtOldPwd = null
        this.txtNewPassWd = null;
        this.txtCnfPassWd = null;
        this.txtHintQst = null;
        this.txtHintAns = null;
        this.statusType = null;
        this.spinnerService.stop();
        this.spinnerService = null;
    }

    //=============  END CLEARING THE GLOBAL VARIBLES=========//



}
