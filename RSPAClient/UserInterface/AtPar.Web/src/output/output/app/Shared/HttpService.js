"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var Rx_1 = require("rxjs/Rx");
var AtParEnums_1 = require("./AtParEnums");
var router_1 = require("@angular/router");
var AtParSharedDataService_1 = require("./AtParSharedDataService");
var AtParConstants_1 = require("../Shared/AtParConstants");
var HttpService = (function () {
    function HttpService(_http, router, route, atParSharedDataService) {
        this._http = _http;
        this.router = router;
        this.route = route;
        this.atParSharedDataService = atParSharedDataService;
        //public Path: string = "/AtPar/AtParWebApi";
        this.Path = "/atparweb34";
        this.t1 = window.location.protocol + "//" + window.location.hostname;
        this.t = this.t1;
        this.BaseUrl = this.t + this.Path;
        this._http = _http;
        this.headers = new http_1.Headers();
        this.headers.append('Content-Type', 'application/json');
    }
    HttpService_1 = HttpService;
    HttpService.prototype.request = function (bundle) {
        var devicetoken;
        devicetoken = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
        var myConsystem;
        var userID;
        if (devicetoken != null) {
            myConsystem = devicetoken[AtParEnums_1.TokenEntry_Enum.SystemId].toString();
            userID = devicetoken[AtParEnums_1.TokenEntry_Enum.UserID].toString();
            this.idleTime = parseInt(devicetoken[AtParEnums_1.TokenEntry_Enum.IdleTime]);
        }
        if (this.idleTime == null) {
            this.idleTime = 100000;
        }
        if (typeof bundle.apiMethod == "undefined") {
            throw "HttpService.request requires an apiMethod parameter in its params object";
        }
        var dataStr = "";
        var firstIteration = true;
        var objtokens = {
            "deviceTokenEntry": devicetoken
        };
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
                        }
                        else if (Object.prototype.toString.call(bundle.params[key]) === '[object Object]') {
                            dataStr += key + "=" + JSON.stringify(bundle.params[key]);
                        }
                        else {
                            dataStr += key + "=" + encodeURI(bundle.params[key]);
                        }
                    }
                    else {
                        if (i > 0)
                            dataStr += "&";
                        dataStr += key + "=" + bundle.params[key];
                    }
                }
            }
        }
        for (var x = 0; x < objtokens.deviceTokenEntry.length; x++) {
            if (firstIteration)
                firstIteration = false;
            else
                dataStr += "&";
            dataStr += "deviceTokenEntry" + "=" + objtokens.deviceTokenEntry[x];
        }
        return bundle.apiMethod + "?" + dataStr;
    };
    HttpService.prototype.get = function (bundle) {
        var apiPath = bundle.apiMethod;
        apiPath = this.request(bundle).replace(/\+/g, "%2B").replace(/\#/g, "%23");
        var oPath = this.BaseUrl + apiPath;
        return this._http.get(oPath);
    };
    HttpService.prototype.getSync = function (bundle) {
        var apiPath = bundle.apiMethod;
        apiPath = this.request(bundle).replace(/\+/g, "%2B").replace(/\#/g, "%23");
        var oPath = this.BaseUrl + apiPath;
        return this._http.get(oPath).toPromise();
    };
    HttpService.prototype.create = function (bundle) {
        HttpService_1.previousTime = new Date();
        var apiPath = bundle.apiMethod;
        apiPath = this.request(bundle).replace(/\+/g, "%2B").replace(/\#/g, "%23");
        var oPath = this.BaseUrl + apiPath;
        return this._http.post(oPath, bundle.formData, { headers: this.headers });
    };
    HttpService.prototype.update = function (bundle) {
        HttpService_1.previousTime = new Date();
        var apiPath = bundle.apiMethod;
        apiPath = this.request(bundle).replace(/\+/g, "%2B").replace(/\#/g, "%23").replace(/\%da/g, "%25da");
        var opath = this.BaseUrl + apiPath;
        return this._http.put(opath, bundle.formData, { headers: this.headers });
    };
    HttpService.prototype.delete = function (bundle) {
        var apiPath = bundle.apiMethod;
        if (bundle.params != undefined)
            apiPath = this.request(bundle).replace(/\+/g, "%2B");
        var opath = this.BaseUrl + apiPath;
        return this._http.post(opath, bundle.formData, { headers: this.headers });
    };
    HttpService.prototype.createUpload = function (bundle, header) {
        HttpService_1.previousTime = new Date();
        var apiPath = bundle.apiMethod;
        if (bundle.params != undefined)
            apiPath = this.request(bundle).replace(/\+/g, "%2B");
        //apiPath = this.request(bundle).replace(/\#/g, "%23");
        var opath = this.BaseUrl + apiPath;
        return this._http.post(apiPath, bundle.formData, { headers: this.headers });
    };
    HttpService.prototype.checkSession = function () {
        try {
            HttpService_1.redirect = "N";
            //If history cleared need to redirect to login
            var devicetoken = JSON.parse(localStorage.getItem("DeviceTokenEntry"));
            if (devicetoken == null) {
                //HttpService.redirect = "Y";
                // this.atParSharedDataService.storage = { "redirected": "Y"};
                this.clearAppSession();
                this.router.navigate(['./login']); //, { relativeTo: this.route });
                HttpService_1.previousTime = new Date();
                return false;
            }
            // this.atParSharedDataService.storage = { "redirected": "N" }
            this.idleTime = parseInt(devicetoken[AtParEnums_1.TokenEntry_Enum.IdleTime]);
            if (HttpService_1.previousTime != null) {
                var time = new Date().getTime() - HttpService_1.previousTime.getTime();
                var x = time / 60000;
                if (x >= this.idleTime) {
                    HttpService_1.redirect = "Y";
                    // this.atParSharedDataService.storage = { "redirected": "Y"};
                    HttpService_1.previousTime = new Date();
                    this.clearAppSession();
                    this.router.navigate(['./login']); //, { relativeTo: this.route });
                    return false;
                }
            }
            HttpService_1.previousTime = new Date();
            return true;
        }
        catch (ex) {
        }
    };
    HttpService.prototype.handleError = function (error) {
        var msgs = [];
        msgs.push({ severity: 'error', summary: AtParConstants_1.AtParConstants.GrowlTitle_Error, detail: error.statusText });
        console.log(error.status);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    HttpService.prototype.extractData = function (res) {
        var body = res.json();
        return body.data || {};
    };
    HttpService.prototype.fileUpload = function (bundle, header) {
        var apiPath = this.BaseUrl + bundle.apiMethod;
        if (bundle.params != undefined)
            apiPath = this.request(bundle);
        return this._http.post(apiPath, bundle.formData, { headers: header });
    };
    HttpService.prototype.clearAppSession = function () {
        try {
            var keys = Object.keys(localStorage);
            var i = keys.length;
            while (i--) {
                if (keys[i].indexOf('tkit') != 0) {
                    if (keys[i] != 'appTabCount') {
                        localStorage.removeItem(keys[i]);
                    }
                }
                ;
            }
            sessionStorage.clear();
        }
        catch (ex) {
        }
    };
    HttpService.previousTime = new Date();
    HttpService = HttpService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, router_1.Router,
            router_1.ActivatedRoute,
            AtParSharedDataService_1.AtParSharedDataService])
    ], HttpService);
    return HttpService;
    var HttpService_1;
}());
exports.HttpService = HttpService;
//# sourceMappingURL=HttpService.js.map