import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';

@Injectable()

export class CartScheduleComplianceReportServices {
    constructor(
        private httpService: HttpService
    ) { }

    getcomplianceReport(srvUsr,userId,date,orgGrpId) {
        return this.httpService.getSync({
            apiMethod: "/api/ScheduleComplianceReport/GetCartSchedComplianceRep",
            params: {
                "SvrUser": srvUsr,
                "userID": userId,
                "date": date,
                "orgGrpID": orgGrpId
            }
        });

    }

    getHeirarchyUsersList(orgGrpId, appID,userId ) {
        return this.httpService.getSync({
            apiMethod: "/api/ScheduleComplianceReport/GetHeirarchyUsersList",
            params: {
                "orgGrpID": orgGrpId,
                "appID": appID,
                "userID": userId
            }
        });

    }

    public handleError(error: Response) {
        
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
