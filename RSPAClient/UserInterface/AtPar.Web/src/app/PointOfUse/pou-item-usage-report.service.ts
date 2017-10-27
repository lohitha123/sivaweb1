import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';



@Injectable()

export class ItemUsageReportService {

    constructor(private httpservice: HttpService) {
    }

  
    async getItemUsageReport(bUnit, parLoc, itemID, fromDate, toDate, appID) {
        return await this.httpservice.getSync({
            "apiMethod": "/api/ItemUsageReportPou/GetItemUsageReport",
            params: {
                fromDate: fromDate,
                toDate: toDate,
                businessUnit: bUnit,
                cartID: parLoc,
                itemID: itemID,
                appID: appID
            }
        })
    }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    };
}