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
export class ProcessSchedulerService {
    deviceTokenEntry: string[] = [];
    constructor(private httpservice: HttpService) {
        this.deviceTokenEntry = JSON.parse(sessionStorage.getItem("DeviceTokenEntry"));
    }
    private headers = new Headers({ 'Content-Type': 'application/json' });
    getScheduleIDs(orgID) {
        return this.httpservice.getSync({
            apiMethod: "/api/ProcessParameters/GetSheduleIDs",
            params: {
                "orgGroupID": orgID
            }
        });
    }

    getSheduleDetails(schedID) {
        return this.httpservice.getSync({
            apiMethod: "/api/ProcessScheduler/GetSheduleDetails",
            params: {
                "schedID": schedID
            }
        });
    }

    getOrgGroupIDS() {
        return this.httpservice.getSync({
            apiMethod: "/api/Common/GetOrgGroupIDS",
            params: {
                
            }
        });
    }
    async getUserOrgGroups(userId, orgGrpId) {
        return await this.httpservice.getSync({
            "apiMethod": "/api/Common/GetUserOrgGroups",
            params: {
                "user": userId,
                "orgGrpID": orgGrpId
               
            }
        });

    }

    createNewSchedule(lstdsSchedule, strOrgGrpId, schedID, schedDescr, userID, schedType, startTime, endTime, interval, mode) {
        return this.httpservice.create({
            apiMethod: "/api/ProcessScheduler/CreateNewSchedule",
            formData: lstdsSchedule,
            params: {
                "orgGroupID": strOrgGrpId,
                "schedID": schedID,
                "schedDescr": schedDescr,
                "userID": userID,
                "schedType": schedType,
                "startTime": startTime,
                "endTime": endTime,
                "interval": interval,
                "mode": mode
            }
        }).map(res => <AtParWebApiResponse<any>>res.json()).catch(this.handleError);
    }

    public handleError(error: Response) {
        return Observable.throw(error.json().error || 'Server error');
    }
}