import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';
import { MT_CRCT_USER_ALLOCATION } from '../../app/Entities/MT_CRCT_USER_ALLOCATION';
@Injectable()
export class ReleaseCasesServiceComponent {
    public headers: Headers;

    constructor(private httpservice: HttpService) {

    }
    async  GetDeptUsers(deviceTokenEntry) {

        return await this.httpservice.getSync({
            apiMethod: "/api/ReleaseCases/GetDepartments",
            params: {
                "departmentID": deviceTokenEntry

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