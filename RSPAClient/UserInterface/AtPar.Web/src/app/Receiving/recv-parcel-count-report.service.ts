import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';

@Injectable()
export class ParcelCountReportService {

    constructor(
        private httpService: HttpService
    ) { }

    public async getParcelCountReport(fDate, tDate, carrierID, trackingNo) {
        return this.httpService.getSync({
            apiMethod: "/api/ParcelCountReport/GetParcelCountReport",
            params: {
                "fDate": fDate,
                "tDate": tDate,
                "carrierID": carrierID,
                "trackingNo": trackingNo
            }
        });
    }

    public handleError(error: Response) {
        
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}