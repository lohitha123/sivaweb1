import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';

@Injectable()
export class ReleasePackagesServiceComponent {
    public headers: Headers;

    constructor(private httpservice: HttpService) {

    }

    async  GetReleasePackages(appId, userId, orgGroupId, bunit, trckNoOrPoIdOrLoc, flag, transId) {
        return await this.httpservice.getSync({
            apiMethod: "/api/ReleasePackages/GetReleasePackages",
            params: {
                "appId": appId,
                "userId": userId,
                "orgGroupId": orgGroupId,
                "bunit": bunit,
                "trckNoOrPoIdOrLoc": trckNoOrPoIdOrLoc,
                "flag": flag,
                "transId": transId,
            }
        })
    }

    async  GetCases(deviceTokenEntry) {
        return await this.httpservice.getSync({
            apiMethod: "/api/ReleaseCases/GetDownloadCases",
            params: {
                "departmentID": deviceTokenEntry
            }
        })
    }

    async  ProcessReleaseCases(pIsUpdate, pTransID, pDeptID, pCaseID, deviceTokenEntry, transactionIdlist) {
        return await this.httpservice.getSync({
            apiMethod: "/api/ReleaseCases/ProcessReleaseCases",
            params: {
                "pIsUpdate": pIsUpdate,
                "pTransID": pTransID,
                "pDeptID": pDeptID,
                "pCaseID": pCaseID,
                "deviceTokenEntry": deviceTokenEntry,
                "tranIDs": transactionIdlist
            }
        })
    }

    async  GetDepartmentUsers(departmentID, orgGroupID) {
        return await this.httpservice.getSync({
            apiMethod: "/api/DepartmentUserAllocation/GetDepartmentUsers",
            params: {
                "departmentID": departmentID,
                "orgGroupID": orgGroupID
            }
        })
    }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}