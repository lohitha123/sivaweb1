import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Rx';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';

@Injectable()
export class PrefCardPerformanceDetailsService {


    constructor(private httpservice: HttpService) {
    }

    async getPrefCardPerformanceDetailsRpt(pFromDate, pToDate, pProcId, pPhyId) {
        return await this.httpservice.getSync({
            apiMethod: "/api/PrefCardPerformanceDetails/GetPrefCarDPerformanceDtls",
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