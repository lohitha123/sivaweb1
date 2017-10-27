import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';



@Injectable()

export class PrefCardPerformanceSummaryReportService {

    constructor(private httpservice: HttpService) {
    }

    //async getPhysiciansByPrefOrProc(flag) {
    //    return await this.httpservice.getSync({
    //        "apiMethod": "/api/PrefCardPerformanceDetails/GetPhysiciansByPrefOrProc",
    //        params: {
    //            flag: flag
    //        }
    //    })
    //} 

    async getPrefPerformanceRpt(fromDate, toDate, procId, phyId) {
        return await this.httpservice.getSync({
            "apiMethod": "/api/PrefCardPerformanceSummary/GetPrefPerformanceRpt",
            params: {
                fromDate: fromDate,
                toDate: toDate,
                procId: procId,
                phyId: phyId
            }
        })
    } 

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    };
}