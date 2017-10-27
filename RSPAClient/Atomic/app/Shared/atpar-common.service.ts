import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Headers, RequestOptions } from '@angular/http';
import { URLSearchParams } from "@angular/http";
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { TokenEntry_Enum, EnumApps } from '../Shared/AtParEnums';
import { MT_ATPAR_SECURITY_AUDIT } from '../entities/mt_atpar_security_audit';
import { MT_ATPAR_ORG_GROUP_PARAMETERS } from '../entities/mt_atpar_org_group_parameters';

@Injectable()
export class AtParCommonService {

    constructor(private http: Http, private httpService: HttpService) {
        this.http = http;      
    }

    async getOrgGrpIDs(orgGroupId, orgGroupName, deviceTokenEntry: string[]) {

        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetOrgGrpIDs",
            params: {
                "userID": deviceTokenEntry[TokenEntry_Enum.UserID],
                "orgGrpID": orgGroupId,
                "name": orgGroupName,
                "deviceTokenEntry": deviceTokenEntry
            }
        });
    }

    async getOrgGroupIDS(deviceTokenEntry: string[]) {
        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetOrgGroupIDS",
            params: {
                "deviceTokenEntry": deviceTokenEntry
            }
        });
    }

    async getOrgBusinessUnits(deviceTokenEntry: string[], orgGroupID: string,  bUnitType: any) {

        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetOrgBusinessUnits",
            params: {
                "orgGrpId": orgGroupID,
                "businessUnitType": bUnitType,
                "deviceTokenEntry": deviceTokenEntry
            }
        });
    }    

    async getAuditAllowed(appId, menuCode, deviceTokenEntry: string[]) {

        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetAuditAllowed",
            params: {
                "appId": appId,
                "menuCode": menuCode,
                "deviceTokenEntry": deviceTokenEntry
            }
        });
    }

    async doAuditData(userId, appId, strMenuCode, lstConfigData) {

        return this.httpService.create({
            apiMethod: "/api/Common/DoAuditData",
            formData: lstConfigData,
            params: {
                "userID": userId,
                "appId": appId,
                "strFunctionName": strMenuCode
            }
        }).toPromise();
    }

    async getMyPreferences(preference, deviceTokenEntry: string[]) {

        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetMyPreferences",
            params: {
                "preference": preference,//"RECORDS_PER_PAGE"
                "uId": deviceTokenEntry[TokenEntry_Enum.UserID],
                "deviceTokenEntry": deviceTokenEntry
            }
        });
    }

    async getOrgBUnits(orgGroupId, deviceTokenEntry: string[]) {

        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetOrgBUnits",
            params: {
                "userID": deviceTokenEntry[TokenEntry_Enum.UserID],
                "orgGrpID": orgGroupId,
                "deviceTokenEntry": deviceTokenEntry
            }
        });
    }

    async insertAuditData(auditSecurityLst: Array<MT_ATPAR_SECURITY_AUDIT>, userId, pStrFunction, deviceTokenEntry: string[]) {
        return await this.httpService.create({
            "apiMethod": "/api/Common/InsertAuditData",

            formData: auditSecurityLst,

            params: {
                "pStrUser": userId,
                "pStrFunction": pStrFunction,
                "deviceTokenEntry": deviceTokenEntry
            }

        }).toPromise();
    }

    async getApps(userId, deviceTokenEntry: string[]) {

        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetApps",
            params: {
                "userID": userId,
                "deviceTokenEntry": deviceTokenEntry
            }
        });
    }

    async getAppParameters(userId, orgGroupId, appID, deviceTokenEntry: string[]) {

        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetAppParameters",
            params: {
                "userID": userId,
                "orgGrpID": orgGroupId,
                "appID": appID,
                "deviceTokenEntry": deviceTokenEntry
            }
        });
    }

    async getCheckRecall() {

        return await this.httpService.getSync({
            "apiMethod": "/api/Common/CheckRecall",
        });
    }

    async saveAppParameters(lstAppParams: Array<MT_ATPAR_ORG_GROUP_PARAMETERS>, orgGrpId, appId, userId, deviceTokenEntry: string[]) {
        return await this.httpService.create({
            "apiMethod": "/api/Common/SaveAppParameters",

            formData: lstAppParams,

            params: {
                "orgGrpID": orgGrpId,
                "appID": appId,
                "user": userId,
                "deviceTokenEntry": deviceTokenEntry
            }

        }).toPromise();

    }
        
    async getUsersList(userId, appId, orgGrpId, deviceTokenEntry: string[]) {
        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetUsersList",
            params: {
                "userID": userId,
                "appID": appId,
                "orgGrpID": orgGrpId,
                "deviceTokenEntry": deviceTokenEntry
            }
        });
    }

    async getUserOrgGroups(userId, orgGrpId, deviceTokenEntry: string[]) {
        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetUserOrgGroups",
            params: {
                "user": userId,
                "orgGrpID": orgGrpId,
                "deviceTokenEntry": deviceTokenEntry
            }
        });

    }

    async getEnterpriseSystem() {
        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetEnterpriseSystem"
          
        });
    }

    async getPrintersData(appID, printerName, deviceTokenEntry: string[]) {
        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetPrintersData",
            params: {
                "appID": appID,
                "printerName": printerName,
                "deviceTokenEntry": deviceTokenEntry
            }
        })
    }

    async getProfileParamValue(profileID, appID, parameterID) {
        return await this.httpService.getSync({
            apiMethod: "/api/Common/GetProfileParamValue",
            params: {
                "profileID": profileID,
                "appID": appID,
                "parameterID": parameterID,
            }
        })
    }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}