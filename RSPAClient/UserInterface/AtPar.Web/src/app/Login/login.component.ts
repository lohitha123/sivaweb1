
import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    ElementRef,
    Inject
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

import {
    Title,
    DOCUMENT
} from '@angular/platform-browser';

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
import { MT_ATPAR_APP } from '../Entities/MT_ATPAR_APP';
import { MT_ATPAR_APP_GROUP } from '../Entities/MT_ATPAR_APP_GROUP';
import { VM_REPORTS_MENUS } from '../Entities/VM_REPORTS_MENUS';
import { loginService } from './login.service';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { MenuServices } from '../AtPar/Menus/MenusService';
import { Menus } from '../AtPar/Menus/routepath';

import {
    SelectItem,
    Message
} from './../components/common/api';

import { AuthenticationService } from '../_services/authentication.service';
import { AtParConstants } from '../Shared/AtParConstants';
import { IzendaIntegrate } from '../_helpers/izendaintegrate';
import { HttpService } from '../Shared/HttpService';
import { LeftBarAnimationService } from '../Home/leftbar-animation.service';
/**
*	This class represents the lazy loaded LoginComponent.
*/

declare var module: {
    id: string;
}
@Component({
    selector: 'login-cmp',
    templateUrl: 'login.component.html',
    providers: [
        MenuServices,
        loginService,
        AuthenticationService,
        AtParConstants,
        HttpService
    ],
})

export class LoginComponent implements OnInit {

    model: any = {};
    mhsicon: string = "";
    visibleUserID: boolean = false;
    visiblePassword = false;
    pSSOByPass: boolean;
    trSystemId: boolean = false;
    isSSOEnabled: boolean = false;
    isValidUser: false;
    statusCode: number = -1;
    activeLblUserID: String;
    activeLblPassword: String;
    userId: string = "";
    password: string = "";
    deviceID: string = "";
    systemID: string = "";
    dateTime: string = "";
    accessToken: string = "";
    accessTokenXML: any;
    errorCode: string = "";
    _dbConnectionString: string = "";
    systemRowData: any;
    strServer: string = "";
    strDatabase: string = "";
    strUserID: string = "";
    strPassword: string = "";
    strSSOVariable: string = "";
    strSSOCookie: string = "";
    strSSOLogout: string = "";
    strSystemId: string = "";
    hdnSystemId: string = "";
    strSSOUser: string = "";
    gStrSSOUser: string = "";
    selectedDB: string = "";
    statusMessage: string = "";
    statusType: any;
    ipAddress: any;
    passHash: any;
    decryptpassword: any;
    message: string;
    dropdownData: SelectItem[] = [];
    roleIds: MT_ATPAR_USER_PROFILE_APP_ACL[];
    msgs: Message[] = [];
    _deviceTokenEntry: string[] = [];
    systemData: MT_ATPAR_SYSTEM_DB[];
    menus: Menus[];
    atweb: AtParWebApiResponse<MT_ATPAR_SYSTEM_DB>;
    userToken: AtParWebApiResponse<MT_ATPAR_USER_PROFILE_APP_ACL_ORG>;
    lstApps: List<MT_ATPAR_APP>;
    lstAppGroups: List<MT_ATPAR_APP_GROUP>;
    lstMenus: List<Menus>;
    lstRepMenus: List<VM_REPORTS_MENUS>;
    reportsApp: MT_ATPAR_APP;
    myForm: FormGroup;
    ipData: AtParWebApiResponse<string>;
    breadCrumbName: string = "";
    breadCrumbMenu: Menus;
    savedUserID: boolean = true;
    savedPassword: boolean = true;
    @ViewChild('userID') user: ElementRef;
    @ViewChild('f') formGroup;
    public userID: HTMLDivElement;

    constructor(
        public fb: FormBuilder,
        private router: Router,
        private loginService: loginService,
        private route: ActivatedRoute,
        private spinnerService: SpinnerService,
        private menulistService: MenuServices,
        private authenticationservice: AuthenticationService,
        private title: Title,
        private izItergrate: IzendaIntegrate,
        private atParConstant: AtParConstants,
        private leftBarAnimationsewrvice: LeftBarAnimationService,
        @Inject(DOCUMENT) private document,
        private httpService: HttpService
    ) {
        try {
            this.mhsicon = "assets/images/MHSAtpar.png";
            this.httpService.clearAppSession();
            this.title.setTitle('Login');
            this.visibleUserID = false;
            this.visiblePassword = false;
            this.lstAppGroups = new List<MT_ATPAR_APP_GROUP>();
            this.lstApps = new List<MT_ATPAR_APP>();
            this.lstMenus = new List<Menus>();
            HttpService.previousTime = new Date();
            this.myForm = this.fb.group({
                userID: ['', Validators.required],
                password: ['', Validators.required],
            });
            this.breadCrumbMenu = new Menus();

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
                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
                return;
            }

            if (password == null || password == "" || password == undefined) {
                this.statusMessage = "Please enter Valid Password";
                (<HTMLInputElement>document.getElementById("txtPassword")).focus();
                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
                return;
            }

            this.userId = userId.toUpperCase();

            if (((<HTMLInputElement>document.getElementById("txtPassword")).value == null)
                || ((<HTMLInputElement>document.getElementById("txtPassword")).value == '')) {
                this.model.password = null;
                return;
            }

            localStorage.setItem("userId", userId);

            if (this.trSystemId == true) {
                if (this.selectedDB == null || this.selectedDB == "" ||
                    this.selectedDB == undefined || this.selectedDB == "Select System ID") {
                    this.statusMessage = "Please select a SystemId";
                    this.msgs = [];
                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
                    return;
                }
            }

            if (typeof this.hdnSystemId.trim() != 'undefined' && this.hdnSystemId) {
                this.systemID = await this.hdnSystemId;
            }
            else {
                this.systemID = this.selectedDB;
            }
            try {

                await this.loginService.GetIpAddress()
                    .then((res: Response) => {
                        let data = res.json();
                        this.deviceID = data.DataVariable.toString();
                    });
            }
            catch (ex) {
                this.clientErrorMsg(ex, "onSubmit");
                console.log('GetIpAddress failed :' + ex.toString());
            }


            try {
                await this.loginService.CreateIzendaUser(this.userId, this.systemID).then((res: Response) => {
                    let data = res.json();
                });

            }
            catch (ex) {
                this.clientErrorMsg(ex, "CreateIzendaUser");
                console.log('CreateIzendaUser failed :' + ex.toString());
            }

            await this.DoLogin(this.userId, password, this.deviceID, this.pSSOByPass, this.systemID);

        } catch (ex) {
            this.clientErrorMsg(ex, "onSubmit");
            console.log('on submit failed :' + ex.toString());
        }
    }

    async DoLogin(userID, password, deviceID, pSSOByPass, SystemID) {

        try {
            this.msgs = [];
            HttpService.previousTime = new Date();
            var key = CryptoJS.enc.Utf8.parse('8080808080808080');
            var iv = CryptoJS.enc.Utf8.parse('8080808080808080');

            // Storing Password for Old application will remove later
            localStorage.setItem("UserLoginPwd", password);

            this.passHash = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(password), key,
                { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
            this.spinnerService.start();
            try {
                await this.loginService.GetAppRoleIDs(userID)
                    .then((res: Response) => {
                        let data = res.json();
                        this.roleIds = data.DataList;
                        if (this.roleIds != null) {
                            if (this.roleIds.length > 0) {
                                this._deviceTokenEntry[TokenEntry_Enum.LdapUser] = this.roleIds[0].LDAP_USER;
                                this._deviceTokenEntry[TokenEntry_Enum.ProfileID] = this.roleIds[0].PROFILE_ID
                            }
                        }

                    });

            }
            catch (ex) {
                this.clientErrorMsg(ex, "DoLogin");
                console.log('GetAppRoleIDs failed:' + ex.toString());
            }

            try {
                let orgGrpId: string = "";
                await this.loginService.GetUserOrgGrpID(userID)
                    .then((res: Response) => {
                        let data = res.json();
                        if (data.DataVariable != null && data.DataVariable != "") {
                            orgGrpId = data.DataVariable.toString();
                            this._deviceTokenEntry[TokenEntry_Enum.OrgGrpID] = data.DataVariable.toString();
                            sessionStorage.setItem("OrgGroupID", orgGrpId);
                        }

                    });
            }
            catch (ex) {
                this.clientErrorMsg(ex, "DoLogin");
                console.log('GetUserOrgGrpID failed :' + ex.toString());
            }

            try {

                await this.loginService.GetRecordsPerPage(userID)
                    .then((res: Response) => {
                        let data1 = res.json();
                        if (data1.Data != null) {
                            this._deviceTokenEntry[TokenEntry_Enum.RecordsPerPage] = data1.Data.RECORDS_PER_PAGE.toString();
                            if (data1.Data.IDLE_TIME != null) {
                                this._deviceTokenEntry[TokenEntry_Enum.IdleTime] = data1.Data.IDLE_TIME.toString();
                            }
                        }

                    });
            }
            catch (ex) {
                this.clientErrorMsg(ex, "DoLogin");
                console.log('GetRecordsPerPage failed:' + ex.toString());
            }

            try {
                await this.UpdateIzendaHosting(window.location.protocol.toString() + "//" + window.location.hostname.toString());
            }
            catch (ex) {
                this.clientErrorMsg(ex, "DoLogin");
                console.log('UpdateIzendaHosting failed:' + ex.toString());

            }

            this.pSSOByPass = false;
            this.accessToken = "";
            this.dateTime = new Date().toLocaleString().toString();
            var dateStr = new Date().toLocaleString().replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
            this.dateTime = dateStr.replace(',', '')
            this._deviceTokenEntry[TokenEntry_Enum.UserID] = userID;
            this._deviceTokenEntry[TokenEntry_Enum.DeviceID] = deviceID;
            this._deviceTokenEntry[TokenEntry_Enum.DateTime] = this.dateTime;
            this._deviceTokenEntry[TokenEntry_Enum.ClientType] = ClientType.WEB.toFixed().toString();
            this._deviceTokenEntry[TokenEntry_Enum.SystemId] = SystemID;
            this._deviceTokenEntry[TokenEntry_Enum.AccessToken] = "";
            this._deviceTokenEntry[TokenEntry_Enum.AppName] = EnumApps[EnumApps.Init].toString();
            localStorage.setItem("DeviceTokenEntry", JSON.stringify(this._deviceTokenEntry));

            try {
                await this.loginService.GetAccessToken(userID, this.passHash, ClientType.WEB,
                    this.dateTime, this.deviceID, this.accessToken,
                    this.pSSOByPass)
                    .subscribe((response: Response) => {
                        let data = response.json();
                        this.accessTokenXML = data.DataVariable,
                            this.statusCode = data.StatusCode;
                        this.statusType = data.StatType;
                        this.statusMessage = data.StatusMessage;

                        switch (this.statusType) {
                            case StatusType.Success:
                                this.GetConnectionDetails(JSON.parse(localStorage.getItem("DeviceTokenEntry")));
                                this.GetMenuList();
                                break;
                            case StatusType.Error:
                                this.setDeviceTokenSession();
                                this.spinnerService.stop();
                                this.msgs = [];
                                this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: this.statusMessage });
                                break;
                            case StatusType.Warn:
                                this.spinnerService.stop();
                                if (this.statusCode == AtparStatusCodes.ATPAR_E_PASSWORDEXPIRED ||
                                    this.statusCode == AtparStatusCodes.ATPAR_E_PASSWORDRESETREQ) {

                                    let navigationExtras: NavigationExtras = {
                                        queryParams: { 'userId': this.userId }
                                    };

                                    this.breadCrumbMenu.APP_NAME = 'Change Password';
                                    this.breadCrumbMenu.ROUTE = 'changepassword'
                                    this.breadCrumbMenu.IS_DIV = false;
                                    //var groupModules = this.breadCrumbMenu;
                                    localStorage.setItem('BreadCrumbMenus', JSON.stringify(this.breadCrumbMenu));
                                    this.router.navigate(['atpar/changepassword'], navigationExtras);
                                }
                                else {
                                    this.setDeviceTokenSession();
                                    this.msgs = [];
                                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
                                    var txtvalue = <HTMLInputElement>document.getElementById("txtUserID");
                                    var txtpsw = <HTMLInputElement>document.getElementById("txtPassword");
                                    txtpsw.value = null;
                                    txtvalue.focus();

                                }
                                break;
                            case StatusType.Custom:
                                this.setDeviceTokenSession();
                                this.spinnerService.stop();
                                this.msgs = [];
                                this.msgs.push({ severity: 'custom', summary: AtParConstants.GrowlTitle_Info, detail: this.statusMessage });
                                break;
                            default:
                                this.setDeviceTokenSession();
                                this.spinnerService.stop();
                                this.msgs = [];
                                this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Login Failed" });
                                break;

                        }
                    });
            }

            catch (ex) {
                this.clientErrorMsg(ex, "DoLogin");
                console.log('GetAccessToken failed :' + ex.toString());
            }

            try {

                this.izItergrate.DoIzendaConfig();
                var tenant, username1, password1;

                if (userID == 'ADMIN') {
                    tenant = undefined;
                    username1 = 'IzendaAdmin@system.com';
                    password1 = 'Izenda@123';
                }
                else {
                    tenant = 'AtParMT';
                    username1 = userID;
                    password1 = 'AtparReports@123';
                }

                var iztoken = this.authenticationservice.login(tenant, username1, password1)
                    .subscribe(result => {

                        if (result === true) {
                            console.log('reports login successful');
                        } else {
                            console.log('reports login failed');
                        }
                    },
                    error => {
                        console.log(error);
                    });

            }
            catch (ex) {
                this.clientErrorMsg(ex, "DoLogin");
                console.log('reports login failed');
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "DoLogin");
            console.log('reports login failed :' + ex.toString());
        }
    }

    async UpdateIzendaHosting(hostName: string) {
        try {
            await this.loginService.UpdateIzendaHosting(hostName).then((res: Response) => {
                let data = res.json();

            });

        }
        catch (ex) {
            this.clientErrorMsg(ex, "UpdateIzendaHosting");
            console.log('UpdateIzendaHosting failed :' + ex.toString());
        }
    }

    async GetSystemIds(data: string): Promise<AtParWebApiResponse<MT_ATPAR_SYSTEM_DB>> {

        try {
            this.atweb = new AtParWebApiResponse<MT_ATPAR_SYSTEM_DB>();
            try {
                this.spinnerService.start();
                await this.loginService.GetSystemIDs(data)
                    .then((res: Response) => {
                        let data = res.json();
                        this.atweb = data;
                    })
                return this.atweb;
            }
            catch (ex) {
                this.clientErrorMsg(ex, "GetSystemIds");
                console.log('GetSystemIDs failed :' + ex.toString());
            }
        } catch (ex) {
            this.clientErrorMsg(ex, "GetSystemIds");
            console.log('GetSystemIDs failed :' + ex.toString());
        }

    }

    async ngOnInit() {

        try {
            let samplResponse: string = '';
            let strSSOUser: string = '';
            await this.setDeviceTokenSession();
            this.spinnerService.start();
            var redirect;
            this.route.queryParams.subscribe((params: Params) => {
                this.message = params['statusMessage'];
                if (this.message != '' && this.message != null) {
                    this.msgs = [];
                    this.msgs.push({ severity: 'success', summary: AtParConstants.GrowlTitle_Success, detail: this.message });
                }
            });

            this.route.queryParams.subscribe((params: Params) => {
                redirect = params['redirected'];
            });
            if (HttpService.redirect == "Y") {
                this.statusMessage = "Session Expired";
                this.msgs = [];
                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
            }

            await this.getLoginTemplateStyle();
            await this.LoadData();

            if (this.hdnSystemId.trim() == "" || this.hdnSystemId == "" || this.hdnSystemId == undefined) {
                this.BindDropDown();
            }
            //await this.loginService.IsSSOEnabled()
            //    .then((res: Response) => {
            //        let data = res.json() as AtParWebApiResponse<number>;
            //        switch (data.StatType) {
            //            case StatusType.Success: {
            //                this.statusCode = data.StatusCode;
            //                this.statusType = data.StatType
            //                this.isSSOEnabled = data.DataDictionary['isEnabled'];
            //                this.strSSOVariable = data.DataDictionary['SSOVariable'];
            //                this.strSSOCookie = data.DataDictionary['SSOCookie'];
            //                this.strSSOLogout = data.DataDictionary['SSORedirect'];
            //                break;
            //            }
            //            case StatusType.Error: {
            //                this.msgs = [];
            //                this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: "Failed to get the SSO Check value" });
            //                break;
            //            }
            //            case StatusType.Warn: {
            //                if (data.StatusCode == AtparStatusCodes.E_ATPARSERVICESTOPPED) {
            //                    this.msgs = [];
            //                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "AtPar application service is stopped, this should be running to communicate with server." });
            //                }
            //                this.msgs = [];
            //                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
            //                break;
            //            }
            //            case StatusType.Custom: {
            //                this.msgs = [];
            //                this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
            //                break;
            //            }
            //        }
            //        if (data.StatType != StatusType.Success) {
            //            return;
            //        }
            //        if (this.isSSOEnabled == true) {

            //            this.GetConnectionDetails(JSON.parse(localStorage.getItem("DeviceTokenEntry")));
            //            if (this.strSSOVariable != null || this.strSSOVariable != '' || this.strSSOVariable != undefined) {
            //                this.route.queryParams.subscribe((params: Params) => {
            //                    samplResponse = params['SAMLResponse'];

            //                });
            //                this.loginService.GetSAMLResponse(this.strSSOVariable)
            //                    .then((res: Response) => {
            //                        let data = res.json() as AtParWebApiResponse<number>;
            //                        let inputLength = data.DataDictionary["inputLenth"];

            //                        if (inputLength != 0) {
            //                            if (samplResponse != null) {
            //                                if (samplResponse.length > 0) {

            //                                    this.loginService.ValidateSamlResponse(this.strSSOVariable)
            //                                        .then((res: Response) => {
            //                                            let data = res.json() as AtParWebApiResponse<number>;
            //                                            return;

            //                                        });
            //                                }
            //                            }
            //                        }
            //                        strSSOUser = data.DataDictionary["strSSOUser"];
            //                        strSSOUser = strSSOUser.toUpperCase();
            //                        localStorage.setItem("userId", strSSOUser);
            //                        this.gStrSSOUser = strSSOUser;


            //                    });
            //            }

            //            this.SSOLogin(strSSOUser, this.isSSOEnabled);
            //        }
            //        else {
            //            if (this.hdnSystemId.trim() == "" || this.hdnSystemId != "") {
            //                this.trSystemId = false;
            //            }
            //            else {
            //                this.trSystemId = true;
            //            }
            //            this.gStrSSOUser = '';

            //        }

            //    });

        } catch (ex) {
            this.clientErrorMsg(ex, "ngOnInit");
            console.log('ngOnInit failed :' + ex.toString());
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
            this.clientErrorMsg(ex, 'getLoginTemplateStyle');
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
            this._deviceTokenEntry[TokenEntry_Enum.AppName] = EnumApps[EnumApps.Init].toString()
            localStorage.setItem("DeviceTokenEntry", JSON.stringify(this._deviceTokenEntry));
        } catch (ex) {
            this.clientErrorMsg(ex, "setDeviceTokenSession");
            console.log('setDeviceTokenSession failed :' + ex.toString());
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
                sessionStorage.setItem("lstSystemIDs", JSON.stringify(this.systemData));
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

            }
        } catch (ex) {
            this.clientErrorMsg(ex, "LoadData");
            console.log('LoadData failed :' + ex.toString());
        }
    }

    async GetConnectionDetails(_deviceTokenEntry: string[]) {

        try {
            this.systemData = (JSON.parse(sessionStorage.getItem("lstSystemIDs"))).filter((x) => x.SYSTEM_ID == _deviceTokenEntry[TokenEntry_Enum.SystemId]);
            if (this.systemData != null) {
                if (this.systemData.length > 0) {
                    this.strServer = this.systemData[0].SERVER;
                    this.strDatabase = this.systemData[0].DATASOURCE;
                    this.strUserID = this.systemData[0].USERID;
                    this.strPassword = this.systemData[0].PASSWORD;
                }
            }
            this._dbConnectionString = "data source=" + this.strServer + ";database=" + this.strDatabase + ";user id=" + this.strUserID + ";password=" + this.strPassword;
            localStorage.setItem("LocalDbConncetionString", this._dbConnectionString);

        }
        catch (ex) {
            this.clientErrorMsg(ex, "GetConnectionDetails");
            console.log('GetConnectionDetails failed :' + ex.toString());
        }
    }

    async GetMenuList() {

        try {
            this.lstAppGroups = new List<MT_ATPAR_APP_GROUP>();
            this.lstApps = new List<MT_ATPAR_APP>();
            this.lstMenus = new List<Menus>();
            this.reportsApp = new MT_ATPAR_APP();

            await this.menulistService.getGroupMenuList(
                this._deviceTokenEntry[TokenEntry_Enum.ProfileID],
                this._deviceTokenEntry[TokenEntry_Enum.UserID]
            )
                .then((res: Response) => {
                    try {
                        let data = res.json() as AtParWebApiResponse<number>;
                        switch (data.StatType) {
                            case StatusType.Success: {
                                this.statusCode = data.StatusCode;
                                this.statusType = data.StatType
                                this.lstAppGroups = data.DataDictionary['lstAppGroups'];
                                this.lstApps = data.DataDictionary['lstApps'];
                                this.lstMenus = data.DataDictionary['lstMenus'];
                                this.lstRepMenus = data.DataDictionary['lstReportMenus'];
                                this.reportsApp = data.DataDictionary['reportsApp'];
                                localStorage.setItem('MenuList', JSON.stringify(this.lstMenus));
                                localStorage.setItem('AppGroups', JSON.stringify(this.lstAppGroups));
                                localStorage.setItem('Apps', JSON.stringify(this.lstApps));
                                localStorage.setItem('ReportMenus', JSON.stringify(this.lstRepMenus));
                                localStorage.setItem('reportsApp', JSON.stringify(this.reportsApp));
                                break;
                            }
                            case StatusType.Error: {
                                this.msgs = [];
                                this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: data.StatusMessage });
                                break;
                            }
                            case StatusType.Warn: {
                                this.msgs = [];
                                this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: data.StatusMessage });
                                break;
                            }
                            case StatusType.Custom: {
                                this.msgs = [];
                                this.msgs.push({ severity: 'info', summary: AtParConstants.GrowlTitle_Info, detail: data.StatusMessage });
                                break;
                            }
                        }
                        if (data.StatType != StatusType.Success) {
                            return;
                        }

                    } catch (ex) {
                        this.clientErrorMsg(ex, "GetMenuList");
                        console.log('getGroupMenuList failed :' + ex.toString());
                    }

                });
            this.breadCrumbMenu.APP_NAME = "Home";
            this.breadCrumbMenu.MENU_NAME = "";
            await this.router.navigate(['atpar']);
            this.spinnerService.emitChangeBreadCrumbEvt(JSON.stringify(this.breadCrumbMenu))
        }
        catch (ex) {
            this.clientErrorMsg(ex, "GetMenuList");
            console.log('getGroupMenuList failed :' + ex.toString());
        }
        finally {
            this.spinnerService.stop();
        }
    }

    private async BindDropDown() {

        try {
            this.systemData = JSON.parse(sessionStorage.getItem("lstSystemIDs"));
            this.dropdownData.push({ label: "Select System ID", value: "Select System ID" })
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

        }
        catch (ex) {
            this.clientErrorMsg(ex, "BindDropDown");
            console.log('BindDropDown failed :' + ex.toString());
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
                    this.msgs = [];
                    this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: this.statusMessage });
                    this.hdnSystemId = "";
                    this.trSystemId = false;
                    break;
                case StatusType.Warn:
                    this.statusMessage = this.atweb.StatusMessage;
                    if (this.statusCode == AtparStatusCodes.E_NORECORDFOUND) {
                        this.statusMessage = "Not a valid system id.";
                        this.msgs = [];
                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
                        return;
                    }
                    this.msgs = [];
                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
                    this.hdnSystemId = "";
                    this.trSystemId = false;
                    break;
                case StatusType.Custom:
                    this.msgs = [];
                    this.msgs.push({ severity: 'custom', summary: AtParConstants.GrowlTitle_Info, detail: this.statusMessage });
                    break;
            }

        }
        catch (ex) {
            this.clientErrorMsg(ex, "CheckSystemID");
            console.log('CheckSystemID failed :' + ex.toString());
        }

    }

    async onChange(event) {

        try {
            this._deviceTokenEntry[TokenEntry_Enum.SystemId] = this.selectedDB;
            localStorage.setItem("DeviceTokenEntry", JSON.stringify(this._deviceTokenEntry));
        }
        catch (ex) {
            this.clientErrorMsg(ex, "onChange");
            console.log('onChange failed :' + ex.toString());
        }

    }

    clientErrorMsg(ex, funName) {
        this.msgs = [];
        this.atParConstant.catchClientError(this.msgs, this.spinnerService, ex.toString(), funName, this.constructor.name);
    }

    async SSOLogin(_strSSOUser: string, _IsSSOEnabled: boolean) {

        try {
            await this.loginService.IsValidUser(_strSSOUser)
                .then((res: Response) => {
                    let data: AtParWebApiResponse<any> = res.json();
                    if (data.StatusCode == AtparStatusCodes.ATPAR_OK) {
                        this.msgs = [];
                        this.msgs.push({
                            severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: "Not a Valid User"
                        });
                        return;
                    }
                    if (data.DataVariable == true) {
                        this._deviceTokenEntry[TokenEntry_Enum.UserID] = _strSSOUser;
                        this._deviceTokenEntry[TokenEntry_Enum.DeviceID] = this.deviceID;
                        this._deviceTokenEntry[TokenEntry_Enum.DateTime] = this.dateTime;;
                        this._deviceTokenEntry[TokenEntry_Enum.ClientType] = ClientType.WEB.toString();

                    }
                    if (typeof this.hdnSystemId.trim() != 'undefined' && this.hdnSystemId) {
                        this._deviceTokenEntry[TokenEntry_Enum.SystemId] = this.hdnSystemId;
                    }
                    localStorage.setItem("DeviceTokenEntry", JSON.stringify(this._deviceTokenEntry));


                    this.loginService.GetAccessToken(_strSSOUser, '', ClientType.WEB,
                        this.dateTime, this.deviceID, '',
                        this.pSSOByPass)
                        .subscribe((response: Response) => {
                            let data = response.json();
                            this.accessTokenXML = data.DataVariable,
                                this.statusCode = data.StatusCode;
                            this.statusType = data.StatType;
                            this.statusMessage = data.StatusMessage;

                            switch (this.statusType) {
                                case StatusType.Success:
                                    this.GetMenuList();
                                    break;
                                case StatusType.Error:
                                    this.setDeviceTokenSession();
                                    this.spinnerService.stop();
                                    this.msgs = [];
                                    this.msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: this.statusMessage });
                                    break;
                                case StatusType.Warn:
                                    this.spinnerService.stop();
                                    if (this.statusCode == AtparStatusCodes.ATPAR_E_PASSWORDEXPIRED ||
                                        this.statusCode == AtparStatusCodes.ATPAR_E_PASSWORDRESETREQ) {

                                        let navigationExtras: NavigationExtras = {
                                            queryParams: { 'userId': this.userId }
                                        };
                                        this.router.navigate(['atpar/changepassword'], navigationExtras);
                                    }
                                    else {
                                        this.setDeviceTokenSession();
                                        this.msgs = [];
                                        this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Warn, detail: this.statusMessage });
                                        var txtvalue = <HTMLInputElement>document.getElementById("txtUserID");
                                        var txtpsw = <HTMLInputElement>document.getElementById("txtPassword");
                                        txtpsw.value = null;
                                        txtvalue.focus();

                                    }
                                    break;
                                case StatusType.Custom:
                                    this.setDeviceTokenSession();
                                    this.spinnerService.stop();
                                    this.msgs = [];
                                    this.msgs.push({ severity: 'custom', summary: AtParConstants.GrowlTitle_Info, detail: this.statusMessage });
                                    break;
                                default:
                                    this.setDeviceTokenSession();
                                    this.spinnerService.stop();
                                    this.msgs = [];
                                    this.msgs.push({ severity: 'warn', summary: AtParConstants.GrowlTitle_Info, detail: "Login Failed" });
                                    break;

                            }
                        });
                });

            return await AtparStatusCodes.ATPAR_OK;

        }

        catch (ex) {
            return await AtparStatusCodes.E_SERVERERROR;
        }

    }

    OnDestroy() {

        this.model = null;
        this.visibleUserID = null;
        this.activeLblUserID = null;
        this.activeLblPassword = null;
        this.visiblePassword = null;
        this.menus = null;
        this.lstMenus = null;
        this.userId = null;
        this.password = null;
        this.deviceID = null;
        this.systemID = null;
        this.pSSOByPass = null;
        this.dateTime = null;
        this.accessToken = null;
        this.accessTokenXML = null;
        this.systemData = null;
        this.errorCode = null;
        this.systemRowData = null;
        this.strServer = null;
        this.strDatabase = null;
        this.strUserID = null;
        this.strPassword = null;
        this.trSystemId = null;
        this.statusCode = -1;
        this.isSSOEnabled = null;
        this.isValidUser = null;
        this.strSSOVariable = null;
        this.strSSOCookie = null;
        this.strSSOLogout = null;
        this.strSystemId = null;
        this.hdnSystemId = null;
        this.strSSOUser = null;
        this.gStrSSOUser = null;
        this.ipAddress = null;
        this.passHash = null;
        this.decryptpassword = null;
        this.roleIds = null;
        this.atweb = null;
        this.userToken = null;
        this.selectedDB = null;
        this.statusMessage = null;
        this.statusType = null;
        this.msgs = null;
        this.spinnerService.stop();
        this.spinnerService = null;
        this._dbConnectionString = null;
        this.dropdownData = null;
        this._deviceTokenEntry = null;
        this.lstApps = null;
        this.lstAppGroups = null;
        this.myForm = null;
        this.ipData = null;
    }

}
