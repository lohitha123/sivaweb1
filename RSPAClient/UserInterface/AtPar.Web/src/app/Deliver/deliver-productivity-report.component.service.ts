import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';
import { MT_CRCT_USER_ALLOCATION } from '../../app/Entities/MT_CRCT_USER_ALLOCATION';
@Injectable()
export class DeliverProductivityService {
    public headers: Headers;

    constructor(private httpservice: HttpService) {

    }
    async  GetProductivityReport(orgGroupID, fromdate, todate, userid, interval, fTime, toTime) {

        return await this.httpservice.getSync({
            apiMethod: "/api/ProductivityReport/GetProductivityReport",
            params: {
                "orgGroupID": orgGroupID,
                "fromDate": fromdate,
                "toDate": todate,
                "userID": userid,
                "interval": interval,
                "fTime": fTime,
                "toTime": toTime

            }

        })
    }

    async  GetCycleTimeReport(orgGroupID, fromdate, todate, userid, startEvent, endEvent) {

        return await this.httpservice.getSync({
            apiMethod: "/api/ProductivityReport/GetCycleTimeReport",
            params: {
                "orgGroupID": orgGroupID,
                "fromDate": fromdate,
                "toDate": todate,
                "userID": userid,
                "startEvent": startEvent,
                "endEvent": endEvent

            }

        })
    }

    

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}