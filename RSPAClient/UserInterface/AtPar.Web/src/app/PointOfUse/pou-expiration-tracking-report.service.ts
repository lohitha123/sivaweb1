import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';



@Injectable()

export class ExpirationTrackingReportService {

    constructor(private httpservice: HttpService) {
    }
    
    async getExpItemCnt(orgGrpID, userID, appID) {
        return await this.httpservice.getSync({
            "apiMethod": "/api/ExpirationTrackingReport/GetExpItemCnt",
            params: {
                orgGrpID: orgGrpID,
                userID: userID,
                appID: appID
            }
        })
    }

    async getDeptCartAllocations(businessUnit,deptID, appID,locType) {
        return await this.httpservice.getSync({
            "apiMethod": "/api/ExpirationTrackingReport/GetDeptCartAllocations",
            params: {
                businessUnit: businessUnit,
                deptID: deptID,
                appID: appID,
                locType: locType
            }
        })
    }

    async getExpirationTrackingReport(orgGrpID, duration, fromDate, toDate,deptID, appID, cartID) {
        return await this.httpservice.getSync({
            "apiMethod": "/api/ExpirationTrackingReport/GetExpirationTrackingReport",
            params: {
                orgGrpID: orgGrpID,
                duration: duration,
                fromDate: fromDate,
                toDate: toDate,
                deptID: deptID,
                appID: appID,
                cartID: cartID
            }
        })
    }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    };
}