import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';
@Injectable()
export class PostPickQAService {

    constructor(
        private httpService: HttpService
    ) { }

    async  getCasesforQA(fromDate, toDate, caseReviewType, deptID, serviceCode, CaseID) {
        return await this.httpService.getSync({
            apiMethod: "/api/PostPickQA/GetCasesforQA",
            params: {
                "startDate": fromDate,
                "endDate": toDate,
                "reviewType": caseReviewType,
                "deptID": deptID,
                "serviceCode": serviceCode,
                "CaseID": CaseID,
            }
        });
    }
    async  getPostPickQAItems(caseID, appID) {
        return await this.httpService.getSync({
            apiMethod: "/api/PostPickQA/GetPostPickQAItems",
            params: {
                "caseID": caseID,
                "appID": appID,
            }
        });
    }
    async  buildReportPrint(appID, objectID, section, dsPrint) {
        return await this.httpService.create({
            apiMethod: "/api/PostPickQA/BuildReportPrint",
            formData: dsPrint,
            params: {
                "appID": appID,
                "objectID": objectID,
                "section": section
            }
        }).toPromise();
    }

}