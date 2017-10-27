import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';

@Injectable()
export class AssignSignatoriesService {
    public headers: Headers;

    constructor(private httpservice: HttpService) {

    }

    async getCodes(code) {
        return await this.httpservice.getSync({
            apiMethod: "/api/AssignSignatories/GetCodes",
            params: {
                "code": code
            }
        })
    }

    async getAuthSign(code) {
        return await this.httpservice.getSync({
            apiMethod: "/api/AssignSignatories/GetAuthSign",
            params: {
                "code": code
            }
        })
    }

    deleteAuthSign(costCenterCode, userId) {
        var inputParams = { "costCenterCode": costCenterCode }
        if (userId == null) {
            inputParams["userId"] = " ";
        }

        return this.httpservice.update({
            apiMethod: "/api/AssignSignatories/DeleteAuthSign",
            params: {
                "costCenterCode": costCenterCode,
                "userId": userId,
            }
        }).map(res => <AtParWebApiResponse<any>>res.json()).catch(this.handleError);
    }

    addAuthSign(costCenterCode, userId, firstName, lastName, middleName) {
        return this.httpservice.update({
            apiMethod: "/api/AssignSignatories/AddAuthSign",
            params: {
                "costCenterCode": costCenterCode,
                "userId": userId,
                "firstName": firstName,
                "lastName": lastName,
                "middleName": middleName
            }
        }).map(res => <AtParWebApiResponse<any>>res.json()).catch(this.handleError);
    }

    updateAuthSign(newCostCenterCode, oldCostCenterCode) {
        return this.httpservice.update({
            apiMethod: "/api/AssignSignatories/UpdateAuthSign",
            params: {
                "newCostCenterCode": newCostCenterCode,
                "oldCostCenterCode": oldCostCenterCode
            }
        }).map(res => <AtParWebApiResponse<any>>res.json()).catch(this.handleError);
    }
    
    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}