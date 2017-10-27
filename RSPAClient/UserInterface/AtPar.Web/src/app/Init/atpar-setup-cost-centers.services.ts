import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { PAR_MNGT_COST_CENTER } from '../../app/Entities/PAR_MNGT_COST_CENTER';
import { MT_POU_DEPT } from '../../app/Entities/MT_POU_DEPT';
import { Observable } from 'rxjs/Rx';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';
import { MT_ATPAR_ORG_GROUPS } from "../../app/Entities/mt_atpar_org_groups";
@Injectable()
export class SetupCostCentersServices {
    public headers: Headers;
   
    constructor(private httpservice: HttpService) {

    }
    getOrgGroupList(userId) {

        return this.httpservice.get({
            apiMethod: "/api/Common/GetOrgDetails",
            params: {
                "userId": userId

            }

        }).map(res => <MT_ATPAR_ORG_GROUPS[]>res.json()).catch(this.handleError);
    }
    getDepartments() {
        return this.httpservice.get({
            apiMethod: "/api/CostCenter/GetDepartments",
            params: {}

        }).map(res => <MT_POU_DEPT[]>res.json()).catch(this.handleError);
    }

    getCostCentersWithoutSearch(orgGroupID) {

        return this.httpservice.get({

            apiMethod: "/api/CostCenter/GetCostCenters",

            params: {

                "orgGroupID": orgGroupID
            }

        }).map(res => <PAR_MNGT_COST_CENTER[]>res.json()).catch(this.handleError);
    }

    getCostCentersWithSearch(orgGroupID, search) {

        return this.httpservice.get({

            apiMethod: "/api/CostCenter/GetCostCenters",

            params: {
    
                "orgGroupID": orgGroupID,
                "search": search
            }

        }).map(res => <PAR_MNGT_COST_CENTER[]>res.json()).catch(this.handleError);
    }


    createCostCenter(newItem) {

        return this.httpservice.create({
            apiMethod: "/api/CostCenter/InsertCostCenter",
            formData: newItem
        }).map(res => <PAR_MNGT_COST_CENTER[]>res.json()).catch(this.handleError);

    }

    updateCostCenter(newItem) {
     
        return this.httpservice.update({
            apiMethod: '/api/CostCenter/UpdateCostCenter',
            formData: newItem
        }).map(res => <PAR_MNGT_COST_CENTER[]>res.json()).catch(this.handleError);

    }
   
    updateCostCenterStatus(status, orgId, costCenterCode, deptId) {

        if (status == false) {
            return this.httpservice.update({

                apiMethod: '/api/CostCenter/UpdateCostCenterStatus',

                params: {
                    "status": 1,
                    "orgID": orgId,
                    "costCenterCode": costCenterCode, 
                    "deptID": deptId
                }
            }).map(res => <PAR_MNGT_COST_CENTER[]>res.json()).catch(this.handleError);
        }
        else {

            return this.httpservice.update({

                apiMethod: '/api/CostCenter/UpdateCostCenterStatus',

                params: {
                    "status": 0,
                    "orgID": orgId,
                    "costCenterCode": costCenterCode,
                    "deptID": deptId
                }
            }).map(res => <PAR_MNGT_COST_CENTER[]>res.json()).catch(this.handleError);

        }
    }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}