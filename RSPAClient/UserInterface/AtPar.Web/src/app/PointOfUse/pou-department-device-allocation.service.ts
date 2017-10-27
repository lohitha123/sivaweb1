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
export class POUDeptDeviceAllocateService {
    constructor(private httpservice: HttpService) {
   
    }
    private headers = new Headers({ 'Content-Type': 'application/json' });

    getDeptAllocateDetails(departmentID,deptDescr,orgID) {
        return this.httpservice.getSync({
            apiMethod: "/api/DepartmentUserAllocation/GetDepartments",
            params: {
                "departmentID": departmentID,
                "deptDescr": deptDescr,
                "orgGroupID": orgID
            }
        });
    }

    getWorkStationsDetails(departmentID, orgID) {
        return this.httpservice.getSync({
            apiMethod: "/api/DepartmentDeviceAllocation/GetDeptWorkstations",
            params: {
                "departmentID": departmentID,
                "orgGrpID": orgID                
            }
        });
    }


    addHospGroupWorkstations(departmentId, workStationID, workStationDescr, workStationMacAddr, orgGroupID) {
        return this.httpservice.create({
            apiMethod: "/api/DepartmentDeviceAllocation/AddHospGroupWorkstations",
            params: {
                "departmentId": departmentId,
                "workStationID": workStationID,
                "workStationDescr": workStationDescr,
                "workStationMacAddr": workStationMacAddr,
                "orgGroupID": orgGroupID
            }
        }).map(res => <AtParWebApiResponse<any>>res.json()).catch(this.handleError);
    }

    deleteHospgroupWorkstation(departmentID, workStationID) {
        return this.httpservice.create({
            apiMethod: "/api/DepartmentDeviceAllocation/DeleteHospgroupWorkstation",
            params: {
                "departmentId": departmentID,
                "workStationID": workStationID    
            }
        }).toPromise()
    }

    updateHospGroupWorkstations(departmentId, workStationID, workStationDescr, workStationMacAddr) {
        return this.httpservice.create({
            apiMethod: "/api/DepartmentDeviceAllocation/UpdateHospGroupWorkstations",
            params: {
                "departmentId": departmentId,
                "workStationID": workStationID,
                "workStationDescr": workStationDescr,
                "workStationMacAddr": workStationMacAddr
            }
        }).map(res => <AtParWebApiResponse<any>>res.json()).catch(this.handleError);
    }

    async  getCartWorkstations(departmentID, cartId, orgGrpID, appID) {
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

    public handleError(error: Response) {
        return Observable.throw(error.json().error || 'Server error');
    }
}