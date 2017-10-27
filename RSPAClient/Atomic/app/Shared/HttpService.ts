import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Message } from './../components/common/api';

@Injectable()
export class HttpService {
    public headers: Headers;
    public BaseUrl: string = window.location.origin;

    constructor(private _http: Http) {
        this._http = _http;
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }
    private request(bundle) {
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
        return bundle.apiMethod + "?" + dataStr;
    }
    public get(bundle) {
        return this._http.get(this.request(bundle).replace(/\+/g, "%2B"));
    }
    public getSync(bundle) {
        return this._http.get(this.request(bundle).replace(/\+/g, "%2B")).toPromise();
    }
    public getSync1(bundle) {
        return this._http.get(this.request(bundle).replace(/\+/g, "%2B")).toPromise();
    }
    public create(bundle) {
        var apiPath = this.BaseUrl + bundle.apiMethod;
        if (bundle.params != undefined)
            apiPath = this.request(bundle).replace(/\+/g, "%2B");
        return this._http.post(apiPath, bundle.formData, { headers: this.headers });
    }
    public create1(bundle) {
        var apiPath = this.BaseUrl + bundle.apiMethod;
        if (bundle.params != undefined)
            apiPath = this.request(bundle).replace(/\+/g, "%2B");
        return this._http.post(apiPath, bundle.formData, { headers: this.headers });
    }
    public update(bundle) {
        var apiPath = this.BaseUrl + bundle.apiMethod;
        if (bundle.params != undefined)
            apiPath = (this.request(bundle)).replace(/\+/g,"%2B");
        return this._http.put(apiPath, bundle.formData, { headers: this.headers });
    }
    public update1(bundle) {
        var apiPath = this.BaseUrl + bundle.apiMethod;
        if (bundle.params != undefined)
            apiPath = this.request(bundle).replace(/\+/g, "%2B");
        return this._http.put(apiPath, bundle.formData, { headers: this.headers });
    }
    public delete(bundle) {
        var apiPath = this.BaseUrl + bundle.apiMethod;
        if (bundle.params != undefined)
            apiPath = this.request(bundle).replace(/\+/g, "%2B");
        return this._http.delete(apiPath, { headers: this.headers });
    }

    public createUpload(bundle,header) {
        var apiPath = this.BaseUrl + bundle.apiMethod;
        if (bundle.params != undefined)
            apiPath = this.request(bundle)
        return this._http.post(apiPath, bundle.formData, { headers: header });
    }



    public handleError(error: Response) {
        let msgs: Message[] = [];
        msgs.push({ severity: 'error', summary: 'error', detail: error.statusText });
        console.log(error.status);
        return Observable.throw(error.json().error || 'Server error');
    }
    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }
}