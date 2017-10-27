import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Rx';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';

@Injectable()
export class LowStockReportService {


    constructor(private httpservice: HttpService) {
    }

    async getLowStockRep(orgGrpID, appID) {
        return await this.httpservice.getSync({
            apiMethod: "/api/LowStockReport/GetLowStockRep",
            params: {
                "orgGrpID": orgGrpID,
                "appID": appID
            }

        });


    }
    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}