import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { VM_USER_STATUS } from '../../app/Entities/VM_USER_STATUS';
import { Observable } from 'rxjs/Rx';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';

@Injectable()
export class UserStatusReportService {

    constructor(private httpservice: HttpService) {
    }

    getUserStatus(serverUserID, userID, firstName, lastName, status, orgGroupID, profileID) {
        return this.httpservice.get({
            apiMethod: "/api/User/GetUserStatus",
            params: {
                "serverUserID": serverUserID,
                "userID": userID,
                "firstName": firstName,
                "lastName": lastName,
                "status": status,
                "orgGroupID": orgGroupID,
                "profileID": profileID
                
            }

        }).map(res => <AtParWebApiResponse<VM_USER_STATUS>>res.json()).catch(this.handleError);
    }

    updateUserStatus(serverUserID, userID, status) {
        return this.httpservice.update({
            apiMethod: "/api/User/UpdateUserStatus",
            params: {
                "serverUserID": serverUserID,
                "userID": userID,
                "status": status
              
            }

        }).map(res => <AtParWebApiResponse<string>>res.json()).catch(this.handleError);
    }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }  
}