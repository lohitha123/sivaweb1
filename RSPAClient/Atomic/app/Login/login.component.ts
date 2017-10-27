import { Component, OnInit, Inject, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
//import * as CryptoJS from 'crypto-js';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Response, Jsonp } from '@angular/http';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import * as Rx from 'rxjs/Rx'
import 'rxjs/add/operator/toPromise';
import { SelectItem } from './../components/common/api';
import { DOCUMENT } from '@angular/platform-browser';

/**
*	This class represents the lazy loaded LoginComponent.
*/

//@Component({
//    moduleId: module.id,
//    //selector:'my-app',
//    selector: 'login-cmp',
//    templateUrl: 'login.component.html',
//   // providers: [loginService],
//})

@Component({
    moduleId: module.id,
    selector: 'login-cmp',
    templateUrl: 'login.component.html'
})

export class LoginComponent {
    model: any = {};
    visible: boolean = false;
    activelabel: String;
    visible1: boolean = false;
    activelabel1: String;
    returnUrl: string;
    xyz = false;
    nav = false;
    dropdownData: any;
    visibleUserID: boolean = false;
    visiblePassword = false;
    pSSOByPass: boolean;
    trSystemId: boolean = false;
    isSSOEnabled: boolean = false;

    statusCode: number = -1;
    activeLblUserID: String;
    activeLblPassword: String;
    nameU: string = '';
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
    name: any;
    userLab: boolean = true;
    passLab: boolean = true;
    decryptpassword: any;
    @ViewChild('userID') user: ElementRef;
    @ViewChild('f') formGroup;

    public userID: HTMLDivElement;

    constructor(
        private router: Router,
        @Inject(DOCUMENT) private document
    ) {
        this.visible = false;
        this.xyz = false;
        try {
            this.visibleUserID = false;
            this.visiblePassword = false;
        } catch (ex) {
            //this.clientErrorMsg(ex);
        }        
        console.log(this.userLab);
    }
    
    labeluser() {
        this.visible = !this.visible;
        this.activelabel = this.visible ? 'input-disturbed' : 'hide-class';
    }

    labelpass() {
        this.visible1 = !this.visible1;
        this.activelabel1 = this.visible ? 'input-disturbed' : 'hide-class';
    }
    login() {
        console.log('success');
        alert(this.userID);
        this.router.navigate(['home']);

    }
    onFocusUserName() {
        try {
            if (this.model.userID == "undefined") {
                this.visibleUserID = !this.visibleUserID;
            } else { this.visibleUserID = true };
            this.activeLblUserID = this.visibleUserID ? 'input-disturbed' : 'hide-class';
            this.userLab = false;
        } catch (ex) {
            //this.clientErrorMsg(ex);
        }
    }

    onFocusPassword() {
        try {
            if (this.model.password == "undefined") {
                this.visiblePassword = !this.visiblePassword;
            } else { this.visiblePassword = true; }
            this.activeLblPassword = this.visiblePassword ? 'input-disturbed' : 'hide-class';
            this.passLab = false;
        } catch (ex) {
            //this.clientErrorMsg(ex);
        }
    }
}