import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Message } from './../components/common/api';
import { TokenEntry_Enum, YesNo_Enum } from './AtParEnums';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AtParSharedDataService } from "./AtParSharedDataService";
import { AtParConstants } from '../Shared/AtParConstants';

@Injectable()
export class HttpService {

    public headers: Headers;
    public Path: string = "/AtPar/AtParWebApi";
    public t1 = window.location.protocol + "//" + window.location.hostname;
    public t = this.t1;
    
    public BaseUrl: string = this.t + this.Path;
    public static previousTime: Date = new Date();
    public idleTime: number;
    public static redirect: string;
    constructor(
        private _http: Http, private router: Router,
        private route: ActivatedRoute,
        private atParSharedDataService: AtParSharedDataService
    ) {
        this._http = _http;
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    private request(bundle) {
        let devicetoken: any;
        devicetoken = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        let myConsystem: string;
        let userID: string;

        if (devicetoken != null) {
            myConsystem = devicetoken[TokenEntry_Enum.SystemId].toString();
            userID = devicetoken[TokenEntry_Enum.UserID].toString();
            this.idleTime = parseInt(devicetoken[TokenEntry_Enum.IdleTime]);
        }

        if (this.idleTime == null) {
            this.idleTime = 100000;
        }


        if (typeof bundle.apiMethod == "undefined") {
            throw "HttpService.request requires an apiMethod parameter in its params object";
        }

        var dataStr = "";

        var firstIteration = true;
        let objtokens = {
            "deviceTokenEntry": devicetoken
        }
        //assemble params into data string format
        if (typeof bundle.params != "undefined") {

            for (var key in bundle.params) {
                if (bundle.params.hasOwnProperty(key)) {
                    if (firstIteration)
                        firstIteration = false;
                    else
                        dataStr += "&";

                    //accepts an array and assigns all values to key
                    if (key != "pPassword" && key != "confXml" && key != "pwd" && key != "newPassword") {
                        if (Object.prototype.toString.call(bundle.params[key]) === '[object Array]') {
                            for (var i = 0; i < bundle.params[key].length; i++) {
                                if (i > 0)
                                    dataStr += "&";
                                dataStr += key + "=" + encodeURI(bundle.params[key][i]);
                            }
                        } else if (Object.prototype.toString.call(bundle.params[key]) === '[object Object]') {
                            dataStr += key + "=" + JSON.stringify(bundle.params[key]);
                        }
                        else {
                            dataStr += key + "=" + encodeURI(bundle.params[key]);
                        }
                    } else {
                        if (i > 0)
                            dataStr += "&";
                        dataStr += key + "=" + bundle.params[key];
                    }
                }
            }

        }
        for (let x = 0; x < objtokens.deviceTokenEntry.length; x++) {
            if (firstIteration)
                firstIteration = false;
            else
                dataStr += "&";

            dataStr += "deviceTokenEntry" + "=" + objtokens.deviceTokenEntry[x];
        }

        return bundle.apiMethod + "?" + dataStr;
    }

    public get(bundle) {
        var apiPath = bundle.apiMethod;
        apiPath = this.request(bundle).replace(/\+/g, "%2B").replace(/\#/g, "%23");
        let oPath = this.BaseUrl + apiPath;
        return this._http.get(oPath);
    }

    public getSync(bundle) {
        var apiPath = bundle.apiMethod;
        apiPath = this.request(bundle).replace(/\+/g, "%2B").replace(/\#/g, "%23");
        let oPath = this.BaseUrl + apiPath;
        return this._http.get(oPath).toPromise();
    }

    public create(bundle) {

        HttpService.previousTime = new Date();
        var apiPath = bundle.apiMethod;
        apiPath = this.request(bundle).replace(/\+/g, "%2B").replace(/\#/g, "%23");
        let oPath = this.BaseUrl + apiPath;
        return this._http.post(oPath, bundle.formData, { headers: this.headers });
    }

    public update(bundle) {
        HttpService.previousTime = new Date();
        var apiPath = bundle.apiMethod;
        apiPath = this.request(bundle).replace(/\+/g, "%2B").replace(/\#/g, "%23").replace(/\%da/g, "%25da");
        let opath = this.BaseUrl + apiPath;
        return this._http.put(opath, bundle.formData, { headers: this.headers });

    }

    public delete(bundle) {

        var apiPath = bundle.apiMethod;
        if (bundle.params != undefined)
            apiPath = this.request(bundle).replace(/\+/g, "%2B");

        let opath = this.BaseUrl + apiPath;
        return this._http.post(opath, bundle.formData, { headers: this.headers });
    }

    public createUpload(bundle, header) {
        HttpService.previousTime = new Date();
        var apiPath = bundle.apiMethod;
        if (bundle.params != undefined)
            apiPath = this.request(bundle).replace(/\+/g, "%2B");
        //apiPath = this.request(bundle).replace(/\#/g, "%23");
        let opath = this.BaseUrl + apiPath;
        return this._http.post(apiPath, bundle.formData, { headers: this.headers });
    }

    public checkSession() {
        try {
            HttpService.redirect = "N";

            //If history cleared need to redirect to login
            let devicetoken = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            if (devicetoken == null) {
                //HttpService.redirect = "Y";
                // this.atParSharedDataService.storage = { "redirected": "Y"};

                this.clearAppSession();

                this.router.navigate(['./login']);//, { relativeTo: this.route });
                HttpService.previousTime = new Date();
                return false;
            }

            // this.atParSharedDataService.storage = { "redirected": "N" }
            this.idleTime = parseInt(devicetoken[TokenEntry_Enum.IdleTime]);
            if (HttpService.previousTime != null) {
                var time = new Date().getTime() - HttpService.previousTime.getTime();
                let x = time / 60000;
                if (x >= this.idleTime) {
                    HttpService.redirect = "Y";
                    // this.atParSharedDataService.storage = { "redirected": "Y"};
                    HttpService.previousTime = new Date();

                    this.clearAppSession();

                    this.router.navigate(['./login']);//, { relativeTo: this.route });
                    return false;

                }
            }
            HttpService.previousTime = new Date();
            return true;
        } catch (ex) {
        }

    }

    public handleError(error: Response) {
        let msgs: Message[] = [];
        msgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: error.statusText });
        console.log(error.status);
        return Observable.throw(error.json().error || 'Server error');
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    public fileUpload(bundle, header) {
        var apiPath = this.BaseUrl + bundle.apiMethod;
        if (bundle.params != undefined)
            apiPath = this.request(bundle)
        return this._http.post(apiPath, bundle.formData, { headers: header });
    }

    public clearAppSession() {
        try {
            let keys = Object.keys(localStorage);
            let i = keys.length;
            while (i--) {
                if (keys[i].indexOf('tkit') != 0) {
                    if (keys[i] != 'appTabCount') {
                        localStorage.removeItem(keys[i]);
                    }
                };
            }
            sessionStorage.clear();
        }
        catch (ex) {

        }
    }

}