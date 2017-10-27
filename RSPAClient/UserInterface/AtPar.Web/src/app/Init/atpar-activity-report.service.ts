import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';
import { VM_MT_ATPAR_TRANSACTION } from '../Entities/VM_MT_ATPAR_TRANSACTION';

@Injectable()
export class AtParActivityReportServices {

    constructor(
        private httpService: HttpService
    ) { }

    getActivityReportData(fDate, tDate, appId, fltr, orgGroupId) {
        return this.httpService.getSync({
            apiMethod: "/api/ActivityReport/GetActivityReportData",
            params: {
                "fDate": fDate,
                "tDate": tDate,
                "appId": appId,
                "fltr": fltr,
                "orgGroupId": orgGroupId
            }
        });
    }

    public handleError(error: Response) {
       
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
