import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';

@Injectable()
export class SetupDepartmentService {
    public headers: Headers;

    constructor(private httpservice: HttpService) {

    }
    async getDeptDetails(strDeptId, strOrgGroupID,search) {
        return await this.httpservice.getSync({
            apiMethod: "/api/Department/GetDeptDetails",
            params: {
                "strDeptId": strDeptId,
                "strOrgGroupID": strOrgGroupID,
                "search": search
            }

        })
    }
    updateDeptStatus(strDeptID, intStatus, strOrgGroupID, appID) {
        return this.httpservice.update({
            apiMethod: "/api/Department/UpdateDeptStatus",
            params: {
                "strDeptID": strDeptID,
                "intStatus": intStatus,
                "strOrgGroupID": strOrgGroupID,
                "appID": appID
            }
        }).map(res => <AtParWebApiResponse<any>>res.json()).catch(this.handleError);
    }
    createDepartment(department) {
        return this.httpservice.create({
            apiMethod: "/api/Common/InsertPouDept",
            formData: [department]
        }).map(res => <AtParWebApiResponse<any>>res.json()).catch(this.handleError);
        
    }
    updateDepartment(department, appID) {
        return this.httpservice.update({
            apiMethod: "/api/Common/UpdatePouDept",
            formData: [department],
            params: {
                "appID": appID
            }
        }).map(res => <AtParWebApiResponse<any>>res.json()).catch(this.handleError);
    }
    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}