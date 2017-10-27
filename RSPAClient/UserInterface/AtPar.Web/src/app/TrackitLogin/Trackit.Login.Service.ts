import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { TkitHttpService } from '../Shared/tkitHttpService';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import * as Rx from 'rxjs/Rx'
import 'rxjs/add/operator/toPromise';


@Injectable()
export class TrackitloginService {

    constructor(private httpservice: TkitHttpService) { }
    private headers = new Headers({ 'Content-Type': 'application/json' });

    public GetAccessToken(userID, passHash, loginType,
        dateTime, deviceID, accessToken,
        SSOByPass) {

        return this.httpservice.get({
            "apiMethod": "/api/Login/GetAccessToken",
            params: {
                "userID": userID,
                "pPassword": passHash,
                "loginType": loginType,
                "dateTime": dateTime,
                "deviceID": deviceID,
                "accessToken": accessToken,
                "SSOByPass": SSOByPass
            }
        });
    }

    CheckLogin(userId, password) {
        return this.httpservice.getSync({
            "apiMethod": "/api/TrackITLogin/CheckLogin",
            params: {
                "userID": userId,
                "pPassword":password
            }
        });


    }

    GetSystemIDs(data: string) {
        return this.httpservice.getSync({
            "apiMethod": "/api/Common/GetSystemIDs",
            params: {
                "systemID": data
            }
        });


    }


    GetOrgGroupParamValue(orgParamName, appID, orgGroupID) {
        return this.httpservice.getSync({
            "apiMethod": "/api/Common/GetOrgGroupParamValue",
            params: {
                "orgParamName": orgParamName,
                "appID": appID,
                "orgGroupID": orgGroupID
            }
        });


    }
    GetAppRoleIDs(userID) {
        return this.httpservice.getSync({
            "apiMethod": "/api/User/GetAppRoleIDs",
            params: {
                "UserId": userID
            }
        });
    }

    GetUserOrgGrpID(userID) {
        return this.httpservice.getSync({
            "apiMethod": "/api/Common/GetUserOrgGrpID",
            params: {
                "userID": userID
            }
        });

    }
    GetRecordsPerPage(userID) {
        return this.httpservice.getSync({
            "apiMethod": "/api/User/GetUser",
            params: {
                "userId": userID
            }
        });

    }

    GetTKITMyPreferences(preference, requestorID)
    {
        return this.httpservice.getSync({
            "apiMethod": "/api/CommonTrackIT/GetTKITMyPreferences",
            params: {
                "preference": preference,
                "requestorID": requestorID

            }
        });

    }
    IsValidUser(userID) {
        return this.httpservice.getSync({
            "apiMethod": "/api/Login/IsValidUser",
            params: {
                "userId": userID
            }
        });

    }
    GetIpAddress() {
        return this.httpservice.getSync({
            "apiMethod": "/api/Login/GetIpAddress",
        });

    }
   
    GetRequestedItemsCount() {
        return this.httpservice.getSync({
            "apiMethod": "/api/ViewCart/GetRequestedItemsCount",
            params: {

            }
        });
    }

   
}