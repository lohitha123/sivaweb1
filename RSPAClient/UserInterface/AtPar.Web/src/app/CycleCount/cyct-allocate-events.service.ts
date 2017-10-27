import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpService } from '../Shared/HttpService';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import * as Rx from 'rxjs/Rx'
import 'rxjs/add/operator/toPromise';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { TokenEntry_Enum, StatusType } from '../Shared/AtParEnums';

@Injectable()
export class CyctAllocateEventsService {
    deviceTokenEntry: string[] = [];
    constructor(private httpservice: HttpService) {
        this.deviceTokenEntry = JSON.parse(sessionStorage.getItem("DeviceTokenEntry"));
    }
    private headers = new Headers({ 'Content-Type': 'application/json' });

    getAllocateEvents(userID, bUnit, orgGroupID) {
        return this.httpservice.getSync({
            apiMethod: "/api/AllocateEvents/GetAllocateEvents",
            params: {
                "userID": userID,
                "bUnit": bUnit,
                "orgGroupID": orgGroupID,
            }
        });
    }

    updateEvents(lstdsEventDetails, deviceTokenEntry) {
        return this.httpservice.create({
            apiMethod: "/api/AllocateEvents/AllocateEvents",
            formData: lstdsEventDetails,
            params: {
                "deviceTokenEntry": deviceTokenEntry,
            }
        }).map(res => <AtParWebApiResponse<any>>res.json()).catch(this.handleError);;
    }

    public handleError(error: Response) {
        return Observable.throw(error.json().error || 'Server error');
    }
}