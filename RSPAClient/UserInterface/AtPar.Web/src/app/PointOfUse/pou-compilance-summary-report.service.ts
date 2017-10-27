import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';



@Injectable()

export class ParLocationComplianceSummaryReportService {

    constructor(private httpservice: HttpService) {
    }

   

    async getComplianceSummary(pStrFromDate, pStrToDate, pStrDeptID, pStrCartID, pStrOrgGrpID, pAppID) {
        return await this.httpservice.getSync({
            "apiMethod": "/api/ParLocationComplianceSummaryReport/GetComplianceSummary",
            params: {
                pStrFromDate: pStrFromDate,
                pStrToDate: pStrToDate,
                pStrDeptID: pStrDeptID,
                pStrCartID: pStrCartID,
                pStrOrgGrpID: pStrOrgGrpID,
                pAppID: pAppID
            }
        })
    }

    async getDeptCartAllocations(pBusinessUnit, pDeptId, pAppID, pLocationType) {
        return await this.httpservice.getSync({
            "apiMethod": "/api/ParLocationComplianceDetailsReport/GetDeptCartAllocations",
            params: {
                pBusinessUnit: pBusinessUnit,
                pDeptId: pDeptId,
                pAppID: pAppID,
                pLocationType: pLocationType
            }
        })
    }


    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    };
}