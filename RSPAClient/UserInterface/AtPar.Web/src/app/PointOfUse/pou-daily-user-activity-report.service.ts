
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../Shared/HttpService';


@Injectable()
export class DailyUserActivityReportService {

    constructor(
        private httpservice: HttpService
    ) { }

    getDailyUserActivityRep(userID, transType, date,appID) {
        return this.httpservice.getSync({
            apiMethod: "/api/PouDailyUserActivityReport/GetDailyUserActivityRep",
            params: {
                "userID": userID,
                "transType": transType,                                          
                "date": date,                
                "appID": appID
            }
        });
    }

  //(string userID, string transType, string date, int appID, [FromUri] string[] deviceTokenEntry)

    public handleError(error: Response) {
        debugger;
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
