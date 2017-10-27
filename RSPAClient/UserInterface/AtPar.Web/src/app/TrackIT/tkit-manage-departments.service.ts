import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../Shared/HttpService';
import { MT_ATPAR_SECURITY_AUDIT } from '../Entities/MT_ATPAR_SECURITY_AUDIT';

@Injectable()

export class ManageDepartmentsService {

    constructor(private httpService: HttpService, public http: Http) { }

    public getDepartments(department, status, orgGroupID) {

        return this.httpService.getSync({
            apiMethod: "/api/ManageDepartments/GetTKITAllDepts",
            params: {
                "deptID": department,
                "status": status,
                "OrgGrpID": orgGroupID
            }
        });
    }

    

    public saveDepartment(deptID, desc, status, mode, orgGroupID, userID) {
        return this.httpService.create({
            apiMethod: "/api/ManageDepartments/SaveDeptData",
            params: {
                "deptID": deptID,
                "deptDescr": desc,
                "status": status,
                "mode": mode,
                "orgGrpID": orgGroupID,
                "userID": userID
            }
        }).toPromise();
    }
    
    
}
