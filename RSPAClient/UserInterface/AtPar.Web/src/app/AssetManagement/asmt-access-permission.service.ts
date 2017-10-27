import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';
import { Observable } from 'rxjs/Rx';



@Injectable()

export class AtParAccessPermissionService {

    constructor(private httpService: HttpService) {
    }
  
    async getAccessFields(appID, orgGroupId, userId, screenName) {
        return await this.httpService.getSync({
            "apiMethod": "/api/AccessPermissions/GetAccessFields",
            params: {
                "appId": appID,
                "orgGroupId": orgGroupId,
                "userId": userId,
                "screenName": screenName
            }
        });
    }
    updateAccessFields(newUser, orgGroupId, userId) {
        return this.httpService.update({
            "apiMethod": "/api/AccessPermissions/UpdateAccessFields",
            formData: newUser,
            params: {
                orgGroupId: orgGroupId,
                userId: userId
            }
        }).toPromise();
    }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    };
}