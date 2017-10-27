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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var Rx_1 = require("rxjs/Rx");
var HttpService = (function () {
    function HttpService(_http) {
        this._http = _http;
        this.BaseUrl = window.location.origin;
        this._http = _http;
        this.headers = new http_1.Headers();
        this.headers.append('Content-Type', 'application/json');
    }
    HttpService.prototype.request = function (bundle) {
        if (typeof bundle.apiMethod == "undefined") {
            throw "HttpService.request requires an apiMethod parameter in its params object";
        }
        var dataStr = "";
        var firstIteration = true;
        //assemble params into data string format
        if (typeof bundle.params != "undefined") {
            for (var key in bundle.params) {
                if (bundle.params.hasOwnProperty(key)) {
                    if (firstIteration)
                        firstIteration = false;
                    else
                        dataStr += "&";
                    //accepts an array and assigns all values to key
                    if (key != "pPassword" && key != "confXml" && key != "pwd") {
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
        return bundle.apiMethod + "?" + dataStr;
    };
    HttpService.prototype.get = function (bundle) {
        return this._http.get(this.request(bundle).replace(/\+/g, "%2B"));
    };
    HttpService.prototype.getSync = function (bundle) {
        return this._http.get(this.request(bundle).replace(/\+/g, "%2B")).toPromise();
    };
    HttpService.prototype.getSync1 = function (bundle) {
        return this._http.get(this.request(bundle).replace(/\+/g, "%2B")).toPromise();
    };
    HttpService.prototype.create = function (bundle) {
        var apiPath = this.BaseUrl + bundle.apiMethod;
        if (bundle.params != undefined)
            apiPath = this.request(bundle).replace(/\+/g, "%2B");
        return this._http.post(apiPath, bundle.formData, { headers: this.headers });
    };
    HttpService.prototype.create1 = function (bundle) {
        var apiPath = this.BaseUrl + bundle.apiMethod;
        if (bundle.params != undefined)
            apiPath = this.request(bundle).replace(/\+/g, "%2B");
        return this._http.post(apiPath, bundle.formData, { headers: this.headers });
    };
    HttpService.prototype.update = function (bundle) {
        var apiPath = this.BaseUrl + bundle.apiMethod;
        if (bundle.params != undefined)
            apiPath = (this.request(bundle)).replace(/\+/g, "%2B");
        return this._http.put(apiPath, bundle.formData, { headers: this.headers });
    };
    HttpService.prototype.update1 = function (bundle) {
        var apiPath = this.BaseUrl + bundle.apiMethod;
        if (bundle.params != undefined)
            apiPath = this.request(bundle).replace(/\+/g, "%2B");
        return this._http.put(apiPath, bundle.formData, { headers: this.headers });
    };
    HttpService.prototype.delete = function (bundle) {
        var apiPath = this.BaseUrl + bundle.apiMethod;
        if (bundle.params != undefined)
            apiPath = this.request(bundle).replace(/\+/g, "%2B");
        return this._http.delete(apiPath, { headers: this.headers });
    };
    HttpService.prototype.createUpload = function (bundle, header) {
        var apiPath = this.BaseUrl + bundle.apiMethod;
        if (bundle.params != undefined)
            apiPath = this.request(bundle);
        return this._http.post(apiPath, bundle.formData, { headers: header });
    };
    HttpService.prototype.handleError = function (error) {
        var msgs = [];
        msgs.push({ severity: 'error', summary: 'error', detail: error.statusText });
        console.log(error.status);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    HttpService.prototype.extractData = function (res) {
        var body = res.json();
        return body.data || {};
    };
    return HttpService;
}());
HttpService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], HttpService);
exports.HttpService = HttpService;
//# sourceMappingURL=HttpService.js.map