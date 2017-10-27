
import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    ElementRef, Output, EventEmitter
} from '@angular/core';

import * as CryptoJS from 'crypto-js';

import {
    Router,
    ActivatedRoute,
    Params,
    NavigationExtras
} from '@angular/router';

import {
    Http,
    Response
} from '@angular/http';

import {
    AbstractControl,
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import * as Rx from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import { List } from 'linqts';
import { Title } from '@angular/platform-browser';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';

import {
    TokenEntry_Enum,
    ClientType,
    StatusType,
    EnumApps,
    YesNo_Enum
} from '../Shared/AtParEnums';

import { AtparStatusCodes } from '../Shared/AtParStatusCodes';
import { MT_ATPAR_USER_PROFILE_APP_ACL_ORG } from '../Entities/MT_ATPAR_USER_PROFILE_APP_ACL_ORG';
import { MT_ATPAR_USER_PROFILE_APP_ACL } from '../Entities/MT_ATPAR_USER_PROFILE_APP_ACL';
import { MT_ATPAR_USER_ORG_GROUPS } from '../Entities/MT_ATPAR_USER_ORG_GROUPS';
import { MT_ATPAR_SYSTEM_DB } from '../Entities/MT_ATPAR_SYSTEM_DB';
import { TKIT_REQUESTOR } from '../Entities/TKIT_REQUESTOR';
import { MT_ATPAR_APP } from '../Entities/MT_ATPAR_APP';
import { MT_ATPAR_APP_GROUP } from '../Entities/MT_ATPAR_APP_GROUP';
import { VM_REPORTS_MENUS } from '../Entities/VM_REPORTS_MENUS';
import { TrackitloginService } from './trackit.login.service';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import {
    SelectItem,
    Message
} from './../components/common/api';
import { AuthenticationService } from '../_services/authentication.service';
import { AtParConstants } from '../Shared/AtParConstants';
import { IzendaIntegrate } from '../_helpers/izendaintegrate';
import { HttpService } from '../Shared/HttpService';
import { LeftBarAnimationService } from '../Home/leftbar-animation.service';
import { Menus } from '../AtPar/Menus/routepath';
import { TkitHttpService } from '../Shared/tkitHttpService';


/**
*	This class represents the lazy loaded LoginComponent.
*/

declare var module: {
    id: string;
}

@Component({
    selector: 'my-trackit',
    templateUrl: 'trackit.login.component.html',
    providers: [
        TrackitloginService,
        AuthenticationService,
        AtParConstants,
        TkitHttpService
    ],
})

export class TrackitLoginComponent implements OnInit {
    @Output() oncountbuttonclicked: EventEmitter<number> = new EventEmitter<number>();
    countvalue: number = 0;
    model: any = {};
    mhsicon: string = "";
    visibleUserID: boolean = false;
    visiblePassword = false;
    trSystemId: boolean = false;
    statusCode: number = -1;
    activeLblUserID: String;
    activeLblPassword: String;
    userId: string = "";
    password: string = "";
    deviceID: string = "";
    systemID: string = "";
    dateTime: string = "";
    accessToken: string = "";
    systemRowData: any;
    strSystemId: string = "";
    hdnSystemId: string = "";
    selectedDB: string = "";
    statusMessage: string = "";
    statusType: any;
    passHash: any;
    dropdownData: SelectItem[] = [];
    growlMessage: Message[] = [];
    _deviceTokenEntry: string[] = [];
    systemData: MT_ATPAR_SYSTEM_DB[];
    atweb: AtParWebApiResponse<MT_ATPAR_SYSTEM_DB>;
    myForm: FormGroup;
    loginData: TKIT_REQUESTOR = new TKIT_REQUESTOR();
    loginPswd: string = "";
    savedUserID: boolean = true;
    savedPassword: boolean = true;
    @ViewChild('userID') user: ElementRef;
    @ViewChild('f') formGroup;
    public userID: HTMLDivElement;

    constructor(
        public fb: FormBuilder,
        private router: Router,
        private trackitloginService: TrackitloginService,
        private route: ActivatedRoute,
        private spinnerService: SpinnerService,
        private authenticationservice: AuthenticationService,
        private title: Title,
        private izItergrate: IzendaIntegrate,
        private atParConstant: AtParConstants,
        private leftBarAnimationsewrvice: LeftBarAnimationService,
        private httpService: TkitHttpService
    ) {
        try {
            this.mhsicon = "assets/images/MHSAtpar.png";
            this.httpService.clearAppSession();
            this.title.setTitle('TrackIT Login');
            this.visibleUserID = false;
            this.visiblePassword = false;
            TkitHttpService.previousTime = new Date();
            this.myForm = this.fb.group({
                userID: ['', Validators.required],
                password: ['', Validators.required],

            });
           


        } catch (ex) {
            this.clientErrorMsg(ex, "constructor");
        }
    }

    onFocusUserName() {
        try {
            if (this.model.userID == "undefined") {
                this.visibleUserID = !this.visibleUserID;
            } else { this.visibleUserID = true };
            this.activeLblUserID = this.visibleUserID ? 'input-disturbed' : 'hide-class';
            this.savedUserID = false;
        } catch (ex) {
            this.clientErrorMsg(ex, "onFocusUserName");
        }
    }

    onFocusPassword() {
        try {
            if (this.model.password == "undefined") {
                this.visiblePassword = !this.visiblePassword;
            } else { this.visiblePassword = true; }
            this.activeLblPassword = this.visiblePassword ? 'input-disturbed' : 'hide-class';
            this.savedPassword = false;
        } catch (ex) {
            this.clientErrorMsg(ex, "onFocusPassword");
        }
    }

    formKeyPressEvent(event) {
        try {
            if (event.charCode == 13) {
                if (this.model.userID == null || this.model.userID == undefined || this.model.userID == '') {
                    (<HTMLInputElement>document.getElementById("txtUserID")).focus();
                }
                else if (this.model.password == null || this.model.password == undefined || this.model.password == '') {
                    (<HTMLInputElement>document.getElementById("txtPassword")).focus();
                }
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "formKeyPressEvent");
        }
    }

    async onSubmit(userId, password) {

        try {
            if (userId == null || userId == "" || userId == undefined) {
                this.statusMessage = "Please enter Valid User ID";
                (<HTMLInputElement>document.getElementById("txtUserID")).focus();
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
                return;
            }
            if (password == null || password == "" || password == undefined) {
                this.statusMessage = "Please enter Valid Password";
                (<HTMLInputElement>document.getElementById("txtPassword")).focus();
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
                return;
            }
            this.userId = userId.toUpperCase();
            this.loginPswd = password;

            if (((<HTMLInputElement>document.getElementById("txtPassword")).value == null)
                || ((<HTMLInputElement>document.getElementById("txtPassword")).value == '')) {
                this.model.password = null;
                return;
            }

            //  localStorage.setItem("userId", userId);


            if (this.trSystemId == true) {
                if (this.selectedDB == null || this.selectedDB == "" ||
                    this.selectedDB == undefined || this.selectedDB == "Select System ID") {
                    this.statusMessage = "Please select a SystemId";
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
                    return;
                }
            }
            if (typeof this.hdnSystemId.trim() != 'undefined' && this.hdnSystemId) {
                this.systemID = await this.hdnSystemId;
            }
            else {
                this.systemID = this.selectedDB;
            }
            this.doLoginMethod();
            // this.DoLogin(this.userId, password, this.deviceID, this.systemID)
        } catch (ex) {
            this.clientErrorMsg(ex, "onSubmit");
        }
    }



    async doLoginMethod() {
        await this.DoLogin(this.userId, this.loginPswd, this.deviceID, this.systemID)
    }

    async DoLogin(userID, password, deviceID, SystemID) {
        try {
            this.growlMessage = [];
            HttpService.previousTime = new Date();
            let userName: string = "";
            let showProfile: string = "";
            let OrgGrpId: string = "";
            var key = CryptoJS.enc.Utf8.parse('8080808080808080');
            var iv = CryptoJS.enc.Utf8.parse('8080808080808080');
            //localStorage.setItem("UserLoginPwd", password);
            this.passHash = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(password), key,
                { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
            this.spinnerService.start();
            try {
                let statusCode: number;
                await this.trackitloginService.CheckLogin(userID, this.passHash).
                    then(async (res: Response) => {
                        let data = res.json();
                        this.loginData = data.DataVariable;
                        this.statusType = data.StatType;
                        this.statusMessage = data.StatusMessage;
                        statusCode = data.StatusCode;
                        switch (this.statusType) {
                            case StatusType.Success:
                                {

                                    this.dateTime = new Date().toLocaleString().toString();
                                    this._deviceTokenEntry[TokenEntry_Enum.UserID] = userID;
                                    this._deviceTokenEntry[TokenEntry_Enum.DeviceID] = deviceID;
                                    this._deviceTokenEntry[TokenEntry_Enum.DateTime] = this.dateTime;
                                    this._deviceTokenEntry[TokenEntry_Enum.ClientType] = ClientType.WEB.toFixed().toString();
                                    this._deviceTokenEntry[TokenEntry_Enum.SystemId] = SystemID;
                                    this._deviceTokenEntry[TokenEntry_Enum.DeptID] = "";
                                    //this._deviceTokenEntry[TokenEntry_Enum.AccessToken] = "";
                                    this._deviceTokenEntry[TokenEntry_Enum.OrgGrpID] = this.loginData.ORG_GROUP_ID;
                                    this._deviceTokenEntry[TokenEntry_Enum.AppName] = EnumApps[EnumApps.TrackIT].toString();
                                    localStorage.setItem("tkitDeviceTokenEntry", JSON.stringify(this._deviceTokenEntry));
                                    localStorage.setItem("tkitUserID", userID);
                                    localStorage.setItem("tkituserName", this.loginData.USERNAME);
                                    await this.GetOrgGroupParamValue();
                                    await this.GetTKITMyPreferences();
                                    await this.getRequestedItemsCount();
                                    break;
                                }
                            case StatusType.Warn:
                                {

                                    this.spinnerService.stop();
                                    if (data.StatusCode == AtparStatusCodes.TKIT_E_INACTIVEREQUESTOR) {
                                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
                                    }
                                    else {

                                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
                                    }
                                    break;
                                }
                            case StatusType.Error:
                                {

                                    this.spinnerService.stop();
                                    this.growlMessage = [];
                                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: this.statusMessage });
                                    break;
                                }
                            case StatusType.Custom:
                                {
                                    this.spinnerService.stop();
                                    this.growlMessage = [];
                                    this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.statusMessage });
                                    break;
                                }
                        }

                    });

                if (statusCode == AtparStatusCodes.ATPAR_OK) {
                    await this.router.navigate(['trackitdashboard']);
                }

            }
            catch (ex) {
                this.clientErrorMsg(ex, "DoLogin");
            }


        } catch (ex) {
            this.clientErrorMsg(ex, "DoLogin");
        }
        finally {
            this.spinnerService.stop();
        }
    }

    async GetOrgGroupParamValue() {
        try {
            this.spinnerService.start();
            let trackITAppId: number = EnumApps.TrackIT;
            await this.trackitloginService.GetOrgGroupParamValue("UPDATE_TRACKIT_USER_PROFILE", trackITAppId, this._deviceTokenEntry[TokenEntry_Enum.OrgGrpID]).
                then((res: Response) => {

                    let response = res.json() as AtParWebApiResponse<string>;
                    this.spinnerService.stop();
                    this.growlMessage = [];
                    this.statusType = response.StatType;
                    this.statusMessage = response.StatusMessage;

                    switch (this.statusType) {
                        case StatusType.Success:
                            {
                                localStorage.setItem("tkitUserName", response.DataVariable.toString());
                                break;
                            }
                        case StatusType.Warn:
                            {
                                this.spinnerService.stop();
                                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
                                break;
                            }
                        case StatusType.Error:
                            {
                                this.spinnerService.stop();
                                this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: this.statusMessage });
                                break;
                            }
                        case StatusType.Custom:
                            {
                                this.spinnerService.stop();
                                this.growlMessage.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: this.statusMessage });
                                break;
                            }
                    }

                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "GetOrgGroupParamValue");
        }
    }


    async GetTKITMyPreferences() {
        try {

            this.spinnerService.start();
            await this.trackitloginService.GetTKITMyPreferences("RECORDS_PER_PAGE", this._deviceTokenEntry[TokenEntry_Enum.UserID]).
                then((res: Response) => {
                    let data2 = res.json();
                    if (data2.DataVariable != null) {
                        this._deviceTokenEntry[TokenEntry_Enum.RecordsPerPage] = data2.DataVariable.toString();
                        localStorage.setItem("tkitDeviceTokenEntry", JSON.stringify(this._deviceTokenEntry));
                    }
                });

        }
        catch (ex) {
            this.clientErrorMsg(ex, "GetTKITMyPreferences");
        }

    }

    async GetSystemIds(data: string): Promise<AtParWebApiResponse<MT_ATPAR_SYSTEM_DB>> {
        try {
            this.atweb = new AtParWebApiResponse<MT_ATPAR_SYSTEM_DB>();
            try {
                this.spinnerService.start();
                await this.trackitloginService.GetSystemIDs(data)
                    .then((res: Response) => {
                        let data = res.json();
                        this.atweb = data;
                    })
                return this.atweb;
            }
            catch (ex) {
                this.clientErrorMsg(ex, "GetSystemIds");
                return;
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "GetSystemIds");
        }

    }

    async ngOnInit() {
        try {
            let samplResponse: string = '';
            await this.setDeviceTokenSession();
            this.spinnerService.start();
            var redirect;


            this.route.queryParams.subscribe((params: Params) => {
                redirect = params['redirected'];
            });
            if (HttpService.redirect == "Y") {
                this.statusMessage = "Session Expired";
                this.growlMessage = [];
                this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
            }

            await this.getLoginTemplateStyle();
            await this.LoadData();


            if (this.hdnSystemId.trim() == "" || this.hdnSystemId == "" || this.hdnSystemId == undefined) {
                this.BindDropDown();
            }



        } catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
            return;
        }
        finally {
            this.spinnerService.stop();
        }
    }


    async getLoginTemplateStyle() {
        try {
            let wheight: any;
            let loginHeight: any;
            let loginWidth: any;
            let wWidth: any;
            wheight = window.innerHeight;
            wWidth = window.innerWidth;

            let loginElement: HTMLElement = (<HTMLElement>document.getElementById('divlogin'));

            loginHeight = loginElement.clientHeight;
            loginWidth = loginElement.clientWidth;

            loginElement.style.setProperty('margin', (((wheight / 100) * 45) - (loginHeight / 2)) + 'px ' + '0 0 ' + ((wWidth / 2) - (loginWidth / 2)) + 'px');

        } catch (ex) {
            this.clientErrorMsg(ex, "getLoginTemplateStyle");
            return;
        }

    }


    public async LoadData() {
        try {
            var querySystemID;

            this.route.queryParams.subscribe((params: Params) => {
                querySystemID = params['systemid'];
            });
            if (querySystemID != null) {
                if (querySystemID.trim() != "") {
                    // Checks whether the systemid from the query string exists in the DB or not
                    this.strSystemId = querySystemID.toUpperCase();
                    await this.CheckSystemID(this.strSystemId);
                }
                else {
                    this.hdnSystemId = "";
                    this.trSystemId = false;
                }
            }
            else {

                this.atweb = await this.GetSystemIds("");
                this.systemData = this.atweb.DataList;
                this.statusCode = this.atweb.StatusCode;
                this.statusType = this.atweb.StatType;
                this.statusMessage = this.atweb.StatusMessage;
                switch (this.statusType) {
                    case StatusType.Success: {
                        if (this.systemData.length > 1) {
                            return;
                        }
                        else {
                            this.hdnSystemId = this.systemData[0].SYSTEM_ID;
                            this.trSystemId = false;
                            this._deviceTokenEntry[TokenEntry_Enum.SystemId] = this.hdnSystemId;

                        }
                        break;
                    }
                    case StatusType.Error:
                        this.statusMessage = this.statusMessage;
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: this.statusMessage });
                        break;
                    case StatusType.Warn:
                        this.statusMessage = this.statusMessage;
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
                        break;
                    case StatusType.Custom:
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'custom', summary: AtParConstants.GrowlTitle_Info, detail: this.statusMessage });
                        break;

                }

            }
        } catch (ex) {
            this.clientErrorMsg(ex, "LoadData");
            return;
        }
    }



    private async CheckSystemID(pSystemID: string) {
        try {
            this.atweb = await this.GetSystemIds(pSystemID)
            this.systemData = this.atweb.DataList,
                this.statusCode = this.atweb.StatusCode;

            if (this.statusCode == AtparStatusCodes.ATPAR_OK) {
                var strFilter: string = "";
                strFilter = pSystemID;
                if (this.systemData != null) {
                    if (this.systemData.length > 0) {
                        this.systemRowData = this.systemData.filter(x => x.SYSTEM_ID.toUpperCase() == strFilter);
                    }
                }
                if (this.systemRowData != null) {
                    this.statusType = StatusType.Success;
                }
                else {
                    this.statusType = StatusType.Warn;
                }
            }
            else {
                this.statusType = this.atweb.StatType;
            }
            switch (this.statusType) {
                case StatusType.Success:
                    this.hdnSystemId = this.strSystemId;
                    this._deviceTokenEntry[TokenEntry_Enum.SystemId] = this.strSystemId;
                    this.trSystemId = false;
                    break;
                case StatusType.Error:
                    this.statusMessage = this.atweb.StatusMessage;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: this.statusMessage });
                    this.hdnSystemId = "";
                    this.trSystemId = false;
                    break;
                case StatusType.Warn:
                    this.statusMessage = this.atweb.StatusMessage;
                    if (this.statusCode == AtparStatusCodes.E_NORECORDFOUND) {
                        this.statusMessage = "Not a valid system id.";
                        this.growlMessage = [];
                        this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
                        return;
                    }
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
                    this.hdnSystemId = "";
                    this.trSystemId = false;
                    break;
                case StatusType.Custom:
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'custom', summary: AtParConstants.GrowlTitle_Info, detail: this.statusMessage });
                    break;
            }

        }
        catch (ex) {
            this.clientErrorMsg(ex, "CheckSystemID");
            return;
        }

    }

    async onChange(event) {
        try {


            this._deviceTokenEntry[TokenEntry_Enum.SystemId] = this.selectedDB;
            localStorage.setItem("tkitDeviceTokenEntry", JSON.stringify(this._deviceTokenEntry));
            await this.trackitloginService.GetSystemIDs(this.selectedDB)
                .then((res: Response) => {
                    let data = res.json();
                    this.atweb = data;
                });
        }
        catch (ex) {
            this.clientErrorMsg(ex, "onChange");
            return;
        }
    }


    private async BindDropDown() {
        try {
            this.atweb = await this.GetSystemIds("");
            this.systemData = this.atweb.DataList,
                this.statusCode = this.atweb.StatusCode;
            this.statusType = this.atweb.StatType;
            this.dropdownData.push({ label: "Select System ID", value: "Select System ID" })

            switch (this.statusType) {
                case StatusType.Success:
                    if (this.systemData != null) {
                        if (this.systemData.length > 1) {
                            for (var i = 0; i < this.systemData.length; i++) {
                                this.dropdownData.push({
                                    label: this.systemData[i].SYSTEM_NAME + " (" + this.systemData[i].SYSTEM_ID + ")", value: this.systemData[i].SYSTEM_ID
                                })
                                this.trSystemId = true;
                            }

                        }
                        else {
                            this.hdnSystemId = this.systemData[0].SYSTEM_ID;
                            this.trSystemId = false;
                        }
                    }
                    break;
                case StatusType.Error:
                    this.statusMessage = this.statusMessage;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: this.statusMessage });
                    break;
                case StatusType.Warn:
                    this.statusMessage = this.statusMessage;
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
                    break;
                case StatusType.Custom:
                    this.growlMessage = [];
                    this.growlMessage.push({ severity: 'custom', summary: AtParConstants.GrowlTitle_Info, detail: this.statusMessage });
                    break;
            }

        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindDropDown");
            return;
        }

    }
    setDeviceTokenSession() {
        try {
            this._deviceTokenEntry[TokenEntry_Enum.UserID] = "";
            this._deviceTokenEntry[TokenEntry_Enum.DeviceID] = "";
            this._deviceTokenEntry[TokenEntry_Enum.DateTime] = this.dateTime;
            this._deviceTokenEntry[TokenEntry_Enum.ClientType] = ClientType.WEB.toFixed().toString();
            this._deviceTokenEntry[TokenEntry_Enum.SystemId] = "";
            this._deviceTokenEntry[TokenEntry_Enum.AccessToken] = "";
            this._deviceTokenEntry[TokenEntry_Enum.IdleTime] = "1000";
            this._deviceTokenEntry[TokenEntry_Enum.DeptID] = "";
            this._deviceTokenEntry[TokenEntry_Enum.AppName] = EnumApps[EnumApps.TrackIT].toString()
            localStorage.setItem("tkitDeviceTokenEntry", JSON.stringify(this._deviceTokenEntry));
        } catch (ex) {
            this.clientErrorMsg(ex, "setDeviceTokenSession");
            return;
        }
    }

    clientErrorMsg(strExMsg, funName) {
        this.growlMessage = [];
        this.atParConstant.catchClientError(this.growlMessage, this.spinnerService, strExMsg.toString(), funName, this.constructor.name);
    }


    OnDestroy() {

        this.model = null;
        this.visibleUserID = null;
        this.activeLblUserID = null;
        this.activeLblPassword = null;
        this.visiblePassword = null;
        this.userId = null;
        this.password = null;
        this.deviceID = null;
        this.systemID = null;
        this.dateTime = null;
        this.accessToken = null;
        this.systemData = null;
        this.systemRowData = null;
        this.trSystemId = null;
        this.statusCode = -1;
        this.strSystemId = null;
        this.hdnSystemId = null;
        this.passHash = null;
        this.atweb = null;
        this.selectedDB = null;
        this.statusMessage = null;
        this.statusType = null;
        this.growlMessage = null;
        this.spinnerService.stop();
        this.spinnerService = null;
        this.dropdownData = null;
        this._deviceTokenEntry = null;
        this.myForm = null;

    }

    async getRequestedItemsCount() {
        try {
            await this.trackitloginService.GetRequestedItemsCount()
                .then((res: Response) => {
                    let data = res.json();
                    if (data.DataVariable != null) {
                        this.countvalue = data.DataVariable;
                    }
                    else {
                        this.countvalue = 0;
                    }
                    localStorage.setItem('tkitViewCartItemsCount', this.countvalue.toString());
                    this.spinnerService.emitCountChangedValue(this.countvalue);
                    this.oncountbuttonclicked.emit(this.countvalue);

                })
        }
        catch (ex) {
            this.clientErrorMsg(ex, "getRequestedItemsCount");
        }
    }


}
