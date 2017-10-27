import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import * as Rx from 'rxjs/Rx'
import 'rxjs/add/operator/toPromise';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse'; 



@Injectable()

export class loginService {
    url = "http://localhost:8001/";
    Version = "Version.xml";


    constructor(private _http: Http) { }
    private headers = new Headers({ 'Content-Type': 'application/json' });

    public GetAccessToken(pUserID, pPassHash, pLoginType, pDateTime, pDeviceID, pAccessToken, pSSOByPass, pAccessTokenXML, pDeviceTokenEntry): Promise<any> {

        pAccessToken = "1235";

        return this._http.get(this.url + "api/Login/GetAccessToken?pUserID=" + pUserID + "&&pPassword=" + pPassHash + "&&pLoginType=" + pLoginType + "&&pDateTime=" + pDateTime + "&&pDeviceID=" + pDeviceID + "&&pAccessToken=" + pAccessToken + "&&pSSOByPass=" + pSSOByPass + "&&pDeviceTokenEntry=" + pDeviceTokenEntry[0] + "&&pDeviceTokenEntry=" + pDeviceTokenEntry[1] + "&&pDeviceTokenEntry=" + pDeviceTokenEntry[2] + "&&pDeviceTokenEntry=" + pDeviceTokenEntry[3] + "&&pDeviceTokenEntry=" + pDeviceTokenEntry[4] + "&&pDeviceTokenEntry=" + pDeviceTokenEntry[5] + "&&pDeviceTokenEntry=" + pDeviceTokenEntry[6] + "&&pDeviceTokenEntry=" + pDeviceTokenEntry[7] + "&&pDeviceTokenEntry=" + pDeviceTokenEntry[8] + "")
            .toPromise()
            .then(res => res.json());


    }

    GetSystemIDs(data: string): Promise<any> {


        return this._http.get(this.url + "api/Login/GetSystemIDS?pSystemID=" + data)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);



    }
    IsValidUser(_strSSOUser: string, _IsValidUser: boolean, _deviceTokenEntry: string[]) {
    }
    getFileData() {

        return this._http.get(this.Version)
            .map(response => response.text());

    }

    private handleError(error: any): Promise<any> {
        console.error('Web Api not hosted properly or server not available ', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}