/// <reference path="../../shared/tkithttpservice.ts" />
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { TkitHttpService } from '../../Shared/tkitHttpService';

@Injectable()

export class TrackITUserProfileService {

    constructor(private httpService: TkitHttpService, public http: Http) { }

    public saveRequestorDetails(requestor,passsword,newPassword) {
        return this.httpService.create({
            apiMethod: "/api/CommonTrackIT/UpdateUserDetails",
            formData: requestor,
            params: {
                "pPassword": passsword,
                "newPassword": newPassword
            }
        }).toPromise();
    }

    public getUserDetails(requestorID) {

        return this.httpService.getSync({
            apiMethod: "/api/CommonTrackIT/GetUserDetails",
            params: {
                "requestorID": requestorID
            }
        });
    }

    public getLocations() {

        return this.httpService.getSync({
            apiMethod: "/api/CommonTrackIT/GetLocations"
        });
    }


}
