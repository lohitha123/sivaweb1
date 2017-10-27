import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpService } from '../Shared/HttpService';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import * as Rx from 'rxjs/Rx'
import 'rxjs/add/operator/toPromise';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { MT_ATPAR_USER_PROFILE_APP_ACL_ORG } from '../Entities/MT_ATPAR_USER_PROFILE_APP_ACL_ORG';
import { MT_ATPAR_USER_PROFILE_APP_ACL } from '../Entities/MT_ATPAR_USER_PROFILE_APP_ACL';
import { MT_ATPAR_USER_ORG_GROUPS } from '../Entities/MT_ATPAR_USER_ORG_GROUPS';
import { MT_ATPAR_SYSTEM_DB } from '../Entities/MT_ATPAR_SYSTEM_DB';
import { VM_MT_ATPAR_USER_PROFILE } from '../Entities/VM_MT_ATPAR_USER_PROFILE';

@Injectable()
export class loginService {

    constructor(private httpservice: HttpService) { }
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

    GetSystemIDs(data: string) {
        if (navigator.onLine) {
            return this.httpservice.getSync({
                "apiMethod": "/api/Common/GetSystemIDS",
                params: {
                    "systemID": data
                }
            });
        }
            

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
    IsSSOEnabled() {
        return this.httpservice.getSync({
            "apiMethod": "/api/Login/IsSSOEnabled",
        });

    }
    ValidateSamlResponse(SSOUserIDVariable) {
        return this.httpservice.getSync({
            "apiMethod": "/api/Login/ValidateSamlResponse",
            params: {
                "SSOUserIDVariable": SSOUserIDVariable
            }
        });

    }
    GetSAMLResponse(SSOVariable) {
        return this.httpservice.getSync({
            "apiMethod": "/api/Login/GetSAMLResponse",
            params: {
                "SSOVariable": SSOVariable
            }
        });

    }

    async UpdateIzendaHosting(hostName) {
        return this.httpservice.update({
            "apiMethod": "/api/Login/UpdateHosting",
            params: {
                "HostName": hostName
            }
        }).toPromise();
    }

    async CreateIzendaUser(userId, systemID) {
        return this.httpservice.update({
            "apiMethod": "/api/Login/CreateIzendaUser",
            params: {
                "UserId": userId,
                "SystemId": systemID
            }
        }).toPromise();
    }
}