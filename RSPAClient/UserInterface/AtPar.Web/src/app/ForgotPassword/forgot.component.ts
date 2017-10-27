import { Component, OnDestroy } from '@angular/core';
import { HttpService } from '../Shared/HttpService';
import { Headers, Http, Response, Jsonp } from '@angular/http';
import { Title } from '@angular/platform-browser';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { MT_ATPAR_APP } from '../entities/mt_atpar_app';
import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import * as CryptoJS from 'crypto-js';
import { SpinnerService } from '../components/spinner/event.spinner.service';
//import { SpinnerSentEvent } from '../components/spinner/spinner.sent.event';
import { MT_ATPAR_SYSTEM_DB } from '../Entities/MT_ATPAR_SYSTEM_DB';
import { TokenEntry_Enum, ClientType } from '../Shared/AtParEnums';
import { StatusType } from '../Shared/AtParEnums'
import { Message } from './../components/common/api';
import { AtParConstants } from '../Shared/AtParConstants';
import { MT_ATPAR_SECURITY_PARAMS } from '../Entities/MT_ATPAR_SECURITY_PARAMS';

declare var module: {
    id: string;
}
@Component({
  
    selector: 'forgot-cmp',
    templateUrl: 'forgot.component.html',
    providers: [HttpService, AtParConstants]
})

export class ForgotComponent {
    mhsatparicon: string = "";

    msgs: Message[] = [];
    model: any = {};
    activelabel: string;
    visible = false;
    activelabelH: string;
    visibleH = false;
    activelabelN: string;
    visibleNewpass = false;
    activelabelC: string;
    visibleCpass = false;
    hintQuestion: any;
    showHint: boolean = false;
    userExist: boolean = false;
    passHash: any;
    _deviceTokenEntry: string[] = [];
    _userID: string;
    ipAddress: any;
    deviceID: string = "";
    systemID: string = "";
    errorMessage: string = "";
    selectedItem: any;
    selectedValue: string = "";
    atweb: AtParWebApiResponse<MT_ATPAR_SYSTEM_DB>;
    systemData: MT_ATPAR_SYSTEM_DB[];
    securityParams: MT_ATPAR_SECURITY_PARAMS;
    statusCode: number = -1;
    values: any[] = [];
    trSystemId: boolean = false;
    hdnSystemId: string = "";

    constructor(
        
        private httpservice: HttpService,
        private http: Http,
        private spinnerService: SpinnerService,
        private jsonp: Jsonp,
        private title: Title,
        private atParConstant: AtParConstants) {

        //this.title.setTitle(AtParConstants.PRODUCT_NAME + ' - Forgot Password');
        this.title.setTitle('Forgot Password');
        try {
            this.jsonp.get('//api.ipify.org/?format=jsonp&callback=JSONP_CALLBACK').
                subscribe(response =>
                    this.ipAddress = response.json().ip,
            )
        }
        catch (ex) {
            this.errorMessage = "General Client Error";
            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: this.errorMessage });
        }
    }
    clientErrorMsg(strExMsg) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, strExMsg.toString());
    }
    async setDeviceTokenSession() {
        try {
            let dateTime = new Date().toLocaleString().toString();
            this._deviceTokenEntry[TokenEntry_Enum.UserID] = "";
            this._deviceTokenEntry[TokenEntry_Enum.DeviceID] = "";
            this._deviceTokenEntry[TokenEntry_Enum.DateTime] = dateTime;
            this._deviceTokenEntry[TokenEntry_Enum.ClientType] = ClientType.WEB.toFixed().toString();
            this._deviceTokenEntry[TokenEntry_Enum.SystemId] = "";
            this._deviceTokenEntry[TokenEntry_Enum.AccessToken] = "";
            this._deviceTokenEntry[TokenEntry_Enum.RecordsPerPage] = "";
            this._deviceTokenEntry[TokenEntry_Enum.IdleTime] = "1000";
            this._deviceTokenEntry[TokenEntry_Enum.DeptID] = "";
            this._deviceTokenEntry[TokenEntry_Enum.AppName] = "Init";
            this._deviceTokenEntry[TokenEntry_Enum.ProfileID] = "";
            this._deviceTokenEntry[TokenEntry_Enum.OrgGrpID] = "";
            this._deviceTokenEntry[TokenEntry_Enum.LdapUser] = "";

            localStorage.setItem("DeviceTokenEntry", JSON.stringify(this._deviceTokenEntry));
        } catch (ex) {
            this.clientErrorMsg(ex);
        }
    }
    labeluserid() {
        if (this.model.userid == "undefined") {
            this.visible = !this.visible;
        } else { this.visible = true };
        this.activelabel = this.visible ? 'input-disturbed' : 'hide-class';
    }

    labelHint() {
        if (this.model.hanswer == "undefined") {
            this.visibleH = !this.visibleH;
        } else { this.visibleH = true };
        this.activelabelH = this.visibleH ? 'input-disturbed' : 'hide-class';
    }
    labelNewpass() {
        if (this.model.npassword == "undefined") {
            this.visibleNewpass = !this.visibleNewpass;
        } else { this.visibleNewpass = true };
        this.activelabelN = this.visibleNewpass ? 'input-disturbed' : 'hide-class';
    }
    labelCpass() {
        if (this.model.cpassword == "undefined") {
            this.visibleCpass = !this.visibleCpass;
        } else { this.visibleCpass = true };
        this.activelabelC = this.visibleCpass ? 'input-disturbed' : 'hide-class';
    }

    async onBlurUserid(e) {
        this.showHint = false;
        this.userExist = false;
        this.model.hanswer = '';
        this.model.npassword = '';
        this.model.cpassword = '';
        this.msgs = [];
        if (e.target.value != '') {
            if (this.trSystemId == true) {
                if (this.selectedValue == null || this.selectedValue == "" || this.selectedValue == undefined || this.selectedValue == "0") {

                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select a SystemID" });

                    return;
                }
            }
            this.spinnerService.start();

            try {
                this.setDeviceTokenEntry(e.target.value.toString());
                await this.httpservice.getSync({
                    "apiMethod": "/api/ForgotPassword/GetForgotHashPassword",
                    params: {
                        "userID": this._userID
                    }
                }).catch(this.httpservice.handleError)                   
                    .then(
                    (res: Response) => {
                        let res2 = res.json() as AtParWebApiResponse<MT_ATPAR_APP>
                        setTimeout(() => {
                            this.spinnerService.stop();
                        }, 500);

                        switch (res2.StatType) {
                            case StatusType.Success:
                                if (res2.DataVariable != "" && res2.DataVariable != null) {
                                    this.showHint = true;
                                    this.userExist = true;
                                    this.hintQuestion = res2.DataVariable;
                                    var txtvalue = <HTMLInputElement>document.getElementById("hanswer");
                                    txtvalue.disabled = false;
                                    txtvalue.focus();
                                    txtvalue.autofocus = true;
                                    break;
                                }
                            case StatusType.Warn: {
                                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res2.StatusMessage });
                                this.hintQuestion = '';
                                this.showHint = false;
                                this.userExist = false;
                                break;
                            }
                            case StatusType.Error: {
                                this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res2.StatusMessage });
                                this.hintQuestion = '';
                                this.showHint = false;
                                this.userExist = false;
                                break;
                            }
                            case StatusType.Custom: {
                                this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res2.StatusMessage });
                                this.hintQuestion = '';
                                this.showHint = false;
                                this.userExist = false;
                                break;
                            }
                        }

                    });
            }
            catch (exMsg) {
                this.clientErrorMsg(exMsg);
            }
        }

    }

    onSubmit(user, form) {

        this.msgs = [];
        let newPassword:string = user.npassword;
        if (this.trSystemId == true) {
            if (this.selectedValue == "0") {
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Please select a SystemID" });
                return;
            }
        }
        if (user.npassword.trim() != user.cpassword.trim()) {

            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Password not matched' });
            return;
        }
        if (newPassword.match(" ")) {
            this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: 'Space is not allowed in Password' });
            return;
        }
        else {
            try {
                this.deviceID = this.ipAddress;
                this.setDeviceTokenEntry(user.userID);
                var key = CryptoJS.enc.Utf8.parse('8080808080808080');
                var iv = CryptoJS.enc.Utf8.parse('8080808080808080');

                this.passHash = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(user.npassword.trim()), key,
                    { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });

                this.httpservice.get({
                    "apiMethod": "/api/ForgotPassword/GetForgotHashPassword",
                    params: {
                        "userId": this._userID,
                        "hintQ": this.hintQuestion,
                        "hintA": user.hanswer,
                        "pPassword": this.passHash
                    }
                }).catch(this.httpservice.handleError)
                    .map((res: Response) => res.json() as AtParWebApiResponse<MT_ATPAR_APP>)
                    .subscribe(
                    (res2) => {
                        switch (res2.StatType) {
                            case StatusType.Success: {

                                this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: 'Password Updated Successfully' });
                                this.model = {};
                                this.showHint = false;
                                this.userExist = false;
                                form._submitted = false;
                                break;
                            }
                            case StatusType.Warn: {
                                if (res2.StatusCode == AtparStatusCodes.ATPAR_E_PASSWORDMINLENGTH) {
                                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res2.StatusMessage.split("1%")[0] + " " + this.securityParams.PASSWD_MIN_LENGTH });
                                }
                                else if (res2.StatusCode == AtparStatusCodes.ATPAR_E_PASSWORDMAXLENGTH) {
                                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res2.StatusMessage.split("1%")[0] + " " + this.securityParams.PASSWD_MAX_LENGTH });

                                } else {
                                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: res2.StatusMessage });
                                }
                                this.model.hanswer = '';
                                this.model.npassword = '';
                                this.model.cpassword = '';
                                this.userExist = true;
                                form._submitted = false;
                                var txtvalue = <HTMLInputElement>document.getElementById("hanswer");
                                txtvalue.focus();
                                break;
                            }
                            case StatusType.Error: {
                                this.showHint = true;

                                this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: res2.StatusMessage });
                                this.model.hanswer = '';
                                this.model.npassword = '';
                                this.model.cpassword = '';
                                this.userExist = true;
                                form._submitted = false;
                                var txtvalue = <HTMLInputElement>document.getElementById("hanswer");
                                txtvalue.focus();
                                break;
                            }
                            case StatusType.Custom: {
                                this.showHint = true;

                                this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: res2.StatusMessage });
                                this.model.hanswer = '';
                                this.model.npassword = '';
                                this.model.cpassword = '';
                                this.userExist = true;
                                form._submitted = false;
                                var txtvalue = <HTMLInputElement>document.getElementById("hanswer");
                                txtvalue.focus();
                                break;
                            }
                        }

                    });
            }
           
                catch (exMsg) {
                    this.clientErrorMsg(exMsg);
                }            
        }

    }

    async ngOnInit() {

        this.mhsatparicon = "assets/images/MHSAtpar.png";
        await this.setDeviceTokenSession();
        this.spinnerService.start();
        await this.BindDropDown();
        await this.getSecurityParams();
        if (this.trSystemId === false)
        {
            document.getElementById('userid').focus();
        }
        this.spinnerService.stop();

    }

    ngOnDestroy() {
        this.statusCode = -1;
        this._deviceTokenEntry = [];
        this.activelabel = "";
        this.activelabelC = "";
        this.activelabelH = "";
        this.activelabelN = "";
        this.selectedValue = "";
        this.deviceID = "";
        this.hdnSystemId = "";
        this.ipAddress = null;
        this.model = {};
        this.systemID = null;
        this.deviceID = null;
        this.systemID = null;
        this.msgs = null;
        this.selectedItem = null
        this.selectedValue = "";
        this.atweb = null;
        this.systemData = null;
        this.statusCode = -1;
        this.values = [];
        this.trSystemId = false;
        this.hdnSystemId = "";
        this.msgs = [];
    }

    private async BindDropDown() {
        try {
            this.atweb = await this.GetSystemIds("");

            this.systemData = this.atweb.DataList;
            this.statusCode = this.atweb.StatusCode;
            this.values.push({ label: 'Select System ID', value: '0' });
            switch (this.atweb.StatType) {

                case StatusType.Success: {

                    if (this.systemData != null) {
                        if (this.systemData.length > 1) {
                            for (var i = 0; i < this.systemData.length; i++) {
                                this.values.push({
                                    label: this.systemData[i].SYSTEM_NAME + " (" + this.systemData[i].SYSTEM_ID + ")", value: this.systemData[i].SYSTEM_ID
                                });
                            }
                            this.trSystemId = true;
                        }
                        else {
                            this.hdnSystemId = this.systemData[0].SYSTEM_ID;
                            this.trSystemId = false;
                        }
                    }
                    break;
                }

                case StatusType.Warn: {
                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.atweb.StatusMessage });
                    break;
                }

                case StatusType.Error: {
                    this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: this.atweb.StatusMessage });
                    break;
                }
                case StatusType.Custom: {
                    this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: this.atweb.StatusMessage });
                    break;
                }
            }
        }
        catch (exMsg) {
            this.clientErrorMsg(exMsg);
        }

    }

    setDeviceTokenEntry(user) {
        this._userID = user.toUpperCase();
        this._deviceTokenEntry[TokenEntry_Enum.UserID] = user.toUpperCase();
        this._deviceTokenEntry[TokenEntry_Enum.DeviceID] = this.deviceID;
        this._deviceTokenEntry[TokenEntry_Enum.DateTime] = new Date().toLocaleString();//format("MM/dd/yyyy HH:mm:ss");
        this._deviceTokenEntry[TokenEntry_Enum.ClientType] = ClientType.WEB.toFixed().toString();
        //this._deviceTokenEntry[TokenEntry_Enum.SystemId] = (this.selectedValue == "" || this.selectedValue == undefined) ? this.hdnSystemId : this.selectedValue;
        
    }

    async GetSystemIds(data: string): Promise<AtParWebApiResponse<MT_ATPAR_SYSTEM_DB>> {
        this.atweb = new AtParWebApiResponse<MT_ATPAR_SYSTEM_DB>();
        try {
            await this.httpservice.getSync({
                "apiMethod": "/api/Common/GetSystemIDS",
                params: {
                    "systemID": data
                }
            }).catch(this.httpservice.handleError).then((res: Response) => {
                this.atweb = res.json() as AtParWebApiResponse<MT_ATPAR_SYSTEM_DB>


            });
            return this.atweb;
        }
        catch (ex) {
            this.spinnerService.stop();
            this.errorMessage = "General Client Error";
            this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: this.errorMessage });
            return this.atweb;
        }

    }
    async getSecurityParams() {

        return await this.httpservice.getSync({
            "apiMethod": "/api/Common/GetSecurityParams"
        }).catch(this.httpservice.handleError).then((res: Response) => {

            let atweb = res.json() as AtParWebApiResponse<MT_ATPAR_SECURITY_PARAMS>
            this.spinnerService.stop();
            switch (atweb.StatType) {

                case StatusType.Success: {
                    this.securityParams = atweb.Data;
                    break;
                }
            }
        });
    }

    async onChange(event) {
        if (event != null) {
            this._deviceTokenEntry[TokenEntry_Enum.SystemId] = event.value;
            this._deviceTokenEntry[TokenEntry_Enum.UserID] = "";
            this._deviceTokenEntry[TokenEntry_Enum.IdleTime] = "1000";
            localStorage.setItem("DeviceTokenEntry", JSON.stringify(this._deviceTokenEntry));
            await this.GetSystemIds(event.value);
        }
    }
}
