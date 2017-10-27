
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Headers, RequestOptions } from '@angular/http';
import { URLSearchParams } from "@angular/http";
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';

import { VM_MT_ATPAR_USER_PARAMS } from '../Entities/VM_MT_ATPAR_USER_PARAMS';
import { MT_ATPAR_SECURITY_AUDIT } from '../Entities/MT_ATPAR_SECURITY_AUDIT';
import { MT_ATPAR_USER_APP_PARAMETERS } from '../entities/mt_atpar_user_app_parameters';

@Injectable()
export class AtParUserParameterService {
    //userData: VM_MT_ATPAR_USER_PARAMS[];//Remove
    //auditData: MT_ATPAR_SECURITY_AUDIT[];//Remove
    //userAppParamData: MT_ATPAR_USER_APP_PARAMETERS[];//Remove
    public headers: Headers;

    constructor(private http: Http, private httpService: HttpService) {
        this.http = http;
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    async getUserParameters(appId, userId) {

       return await this.httpService.getSync({
            "apiMethod": "/api/UserParams/GetUserParams",
            params: {
                "appID": appId,
                "userID": userId
              
            }
        });

    }

    async GetParameterValues(parameterId, fieldName, tableName, whereCondition,userId) {

        return await this.httpService.getSync({
            "apiMethod": "/api/UserParams/GetParameterValues",
            params: {
                "parameterID": parameterId,
                "fieldName": fieldName,
                "tableName": tableName,
                "whereCondition": whereCondition,
                "userID": userId  
            }
        });

    } 
  
    async getAuditAllowed(appId) {

        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetAuditAllowed",
            params: {
                "appId": appId,
                "menuCode": "mt_user_parameter.aspx"
               
            }
        });
    }

    async setUserParams(userAppParamList: MT_ATPAR_USER_APP_PARAMETERS[]) {
        return await this.httpService.update({
            "apiMethod": "/api/UserParams/SetUserParams",
            formData: userAppParamList,
            params: {
                
            }
        }).toPromise();//.catch(this.httpService.handleError)//.map((res: Response) => res.json() as AtParWebApiResponse<number>);
           // .map(res => <AtParWebApiResponse<number>>res.json()).catch(this.httpService.handleError);    
    }

    async insertAuditData(auditSecurityLst: Array<MT_ATPAR_SECURITY_AUDIT>, userId, pStrFunction) {
        return await this.httpService.create({
            "apiMethod": "/api/Common/InsertAuditData",

            formData: auditSecurityLst,

            params: {
                "pStrUser": userId,
                "pStrFunction": pStrFunction
                
            }

        }).toPromise();
        //.catch(this.httpService.handleError).map((res: Response) => res.json() as AtParWebApiResponse<MT_ATPAR_SECURITY_AUDIT>);
    }
   
    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}