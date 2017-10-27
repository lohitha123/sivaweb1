import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpService } from '../Shared/HttpService';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import * as Rx from 'rxjs/Rx'
import 'rxjs/add/operator/toPromise';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { TokenEntry_Enum, StatusType } from '../Shared/AtParEnums';

@Injectable()
export class POUDeptLocationAllocateService {
    constructor(private httpservice: HttpService) {

    }
    private headers = new Headers({ 'Content-Type': 'application/json' });

    getUserDepartments(userID, orgGrpID) {
        return this.httpservice.getSync({
            apiMethod: "/api/Common/GetUserDepartments",
            params: {
                "userID": userID,
                "orgGrpID": orgGrpID
            }
        });
    }




    getDeptCartAllocationDetails(businessUnit, cartId, display, locationType) {
        return this.httpservice.getSync({
            apiMethod: "/api/DepartmentLocationAllocation/GetDeptCartAllocationDetails",
            params: {
                "businessUnit": businessUnit,
                "cartId": cartId,
                "display": display,
                "locationType": locationType
            }
        });
    }

    updateEvents(lstDeptCartAllocations, deptId, orgGroupId, appId) {
        return this.httpservice.create({
            apiMethod: "/api/DepartmentLocationAllocation/SaveDeptCartAlloc",
            formData: lstDeptCartAllocations,
            params: {
                "deptId": deptId,
                "orgGroupId": orgGroupId,
                "appId": appId
            }
        }).map(res => <AtParWebApiResponse<any>>res.json()).catch(this.handleError);;
    }


    public handleError(error: Response) {
        return Observable.throw(error.json().error || 'Server error');
    }
}