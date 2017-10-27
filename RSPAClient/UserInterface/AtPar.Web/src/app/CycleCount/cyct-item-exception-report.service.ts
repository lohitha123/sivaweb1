import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';



@Injectable()

export class ItemExceptionReportService {
    constructor(private httpservice: HttpService) {
    }

  

    async getCycleExceptionReport(businessUnit, itemID, eventID, fromDate, toDate, orgGrpId) {
        return await this.httpservice.getSync({
            "apiMethod": "/api/ItemExceptionReport/GetCycleExceptionReport",
          
            params: {
                bUnit: businessUnit,
                itemID: itemID,
                eventID: eventID,
                fromDate: fromDate,
                toDate: toDate,
                orgGrpId: orgGrpId
            }
        })
    }


    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    };
}