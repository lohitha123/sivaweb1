import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';



@Injectable()

export class ErrorReportService {

    constructor(private httpservice: HttpService) {
    }


    async getErrorReport(userID, fromDate, toDate) {
        return await this.httpservice.getSync({
            "apiMethod": "/api/ErrorReport/GetErrorReport",
            params: {
                fromDate: fromDate,
                toDate: toDate,
                userID: userID
            }
        })
    }

    async populateConfigData() {
        return await this.httpservice.getSync({
            "apiMethod": "/api/ErrorReport/PopulateConfigData",
            params: {
            }       
        })
    }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    };
}