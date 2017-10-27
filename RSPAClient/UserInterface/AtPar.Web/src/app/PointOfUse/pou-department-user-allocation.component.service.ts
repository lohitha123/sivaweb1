import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';
import { MT_CRCT_USER_ALLOCATION } from '../../app/Entities/MT_CRCT_USER_ALLOCATION';
@Injectable()
export class DepartmentUserAllocationServiceComponent {
    public headers: Headers;

    constructor(private httpservice: HttpService) {

    }
    async  GetDeptUsers(departmentID, Description, orgGroupID) {

        return await this.httpservice.getSync({
            apiMethod: "/api/DepartmentUserAllocation/GetDepartments",
            params: {
                "departmentID": departmentID,
                "deptDescr": Description,
                "orgGroupID": orgGroupID

            }

        })
    }

    async  GetDepartmentUsers(departmentID,orgGroupID) {

        return await this.httpservice.getSync({
            apiMethod: "/api/DepartmentUserAllocation/GetDepartmentUsers",
            params: {
                "departmentID": departmentID,
                "orgGroupID": orgGroupID

            }

        })
    }


    async AllocateUserToDepartment(DeptId, userID, OrgGrpId, BlnHomeDept, Mode) {

        return await this.httpservice.create({
            apiMethod: "/api/DepartmentUserAllocation/AllocateUserToDepartment",
            params: {
                "departmentId": DeptId,
                "userId": userID,
                "orgGroupID": OrgGrpId,
                "isHomeDepartment": BlnHomeDept,
                "mode": Mode

            }

        }).toPromise()
    }

    async DeallocateUserToDepartment(DeptID,UserId) {
        return await this.httpservice.create({
            apiMethod: "/api/DepartmentUserAllocation/DeallocateUserToDepartment",
            params: {
                "departmentId": DeptID,
                "userId": UserId

            }

        }).toPromise()
    }


    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}