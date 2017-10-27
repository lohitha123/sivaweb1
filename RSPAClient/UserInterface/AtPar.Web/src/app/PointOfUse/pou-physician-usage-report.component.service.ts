import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';
import { VM_POU_PHYSICIAN_USAGE_HEADER } from '../../app/Entities/VM_POU_PHYSICIAN_USAGE_HEADER';
@Injectable()
export class PhysicianUsageReportServiceComponent {
    public headers: Headers;

    constructor(private httpservice: HttpService) {

    }
    async  GetPhysicianUsage(pStrPhysicianID, pStrProcedure, pStrFromDate, pStrToDate, OrgGrpID) {

        return await this.httpservice.getSync({
            apiMethod: "/api/PhysicianUsageReport/GetPhysicianUsage",
            params: {
                "pStrPhysicianID": pStrPhysicianID,
                "pStrProcedure": pStrProcedure,
                "pStrFromDate": pStrFromDate,
                "pStrToDate": pStrToDate,
                "OrgGrpID": OrgGrpID
            }

        })
    }

    async  GetPhysicianCompareDetails(lstPhysicianUsageHeader: VM_POU_PHYSICIAN_USAGE_HEADER[]) {

        return await this.httpservice.create({
            apiMethod: "/api/PhysicianUsageReport/GetPhysicianCompareDetails",
            formData: lstPhysicianUsageHeader,
            params: {

            },

        }).toPromise();
    }
    

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}