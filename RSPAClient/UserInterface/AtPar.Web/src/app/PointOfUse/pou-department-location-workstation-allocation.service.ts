import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { VM_MT_POU_USER_DEPARTMENTS } from '../../app/Entities/VM_MT_POU_USER_DEPARTMENTS';

import { MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS } from '../../app/Entities/MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS';


@Injectable()
export class POUDeptLocWrkAllocService {

    constructor(private httpservice: HttpService) {

    }

    async  getUserDepartments(userID, orgGrpID) {
        return this.httpservice.getSync({
            apiMethod: "/api/Common/GetUserDepartments",
            params: {
                "userID": userID,
                "orgGrpID": orgGrpID

            }

        });
    }



    async  GetCartWorkstations(departmentID, cartId, orgGrpID, appID) {
        return this.httpservice.getSync({
            apiMethod: "/api/DeptLocWrkStationAllocation/GetCartWorkstations",
            params: {
                "departmentID": departmentID,
                "cartId": cartId,
                "orgGrpID": orgGrpID,
                "appID": appID

            }

        });
    }
   

    async GetDeptAllocCarts(businessUnit, cartId, display, locationType, appId, deptID, orgGrpID) {
        return this.httpservice.getSync({
            apiMethod: "/api/DeptLocWrkStationAllocation/GetDeptAllocCarts",
            params: {
                "businessUnit": businessUnit,
                "cartId": cartId,           
                "display": display,
                "locationType": locationType,
                "appId": appId,
                "deptID": deptID,
                "orgGrpID": orgGrpID
                
               
            }

        });
    }




     SaveDeptCartAllocations(lstWrkStationAllocDetails, deptID, appID) {
         return this.httpservice.create({
             apiMethod: "/api/DeptLocWrkStationAllocation/SaveDeptCartAllocations",
             formData: lstWrkStationAllocDetails,
             params: {


                 "deptID": deptID,
                 "appID": appID

             }

         }).toPromise();

    }



    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}