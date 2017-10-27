import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Rx';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';

@Injectable()
export class PrefCardOptimizationReportService {


    constructor(private httpservice: HttpService) {
    }

    async getPrefCardOptimizationRpt(pFromDate, pToDate, pProcId, pPhyId) {
        return await this.httpservice.getSync({
           apiMethod: "/api/PrefCardOptimizationReport/GetPrefCardOptimizationRpt",
           params: {
               "pFromDate": pFromDate,
               "pToDate": pToDate,
               "pProcId": pProcId,
               "pPhyId": pPhyId
           }

       });

   }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}