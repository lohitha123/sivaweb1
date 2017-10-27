import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';



@Injectable()

export class CaseReviewReportService {
    constructor(private httpservice: HttpService) {
    }

    async getCasesInformation(depID) {   
            return await this.httpservice.getSync({
                "apiMethod": "/api/CaseReviewReport/GetCasesInformation",
                params: {
                    depID: depID
                }
            })
      
    }

    async  getCaseReview(caseID) {
        return await this.httpservice.getSync({
            "apiMethod": "/api/CaseReviewReport/GetCaseReview",
            params: {
                caseID: caseID
            }
        })
    }


    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    };
}