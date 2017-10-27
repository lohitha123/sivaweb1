/// <reference path="../entities/atparkeyvaluepair.ts" />

import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { RM_ORG_UNITS } from '../../app/Entities/RM_ORG_UNITS';
import { MT_ATPAR_ORG_GROUPS } from '../../app/Entities/MT_ATPAR_ORG_GROUPS';

import { AtParKeyValuePair } from '../../app/Entities/atparkeyvaluepair';
import { Observable } from 'rxjs/Rx';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';


@Injectable()
export class ManageOrgIdServices {
    public headers: Headers;

    constructor(private httpservice: HttpService) {
    }

    getOrgIds(userId, orgId, orgName, status) {
        console.log("details");
        return this.httpservice.get({
            apiMethod: "/api/ManageOrgID/GetOrgUnits",
            params: {
                "userId": userId,
                "orgId": orgId,
                "orgType":'',
                "orgName": orgName,
                "status": status
              
            }
        }).map(res => <AtParWebApiResponse<RM_ORG_UNITS>>res.json()).catch(this.handleError);
    }
    updateOrgIDStatus(userID, orgID, orgType, status) {

        return this.httpservice.create({
            apiMethod: "/api/ManageOrgID/UpdateOrgIDStatus",
            params: {
                "userID": userID,
                "orgID": orgID,
                "orgType": orgType,
                "status": status
                
            }
        }).map(res => <AtParWebApiResponse<any>>res.json()).catch(this.handleError);
    }
    getOrgGrpGroups(userId) {

        return this.httpservice.get({
            apiMethod: "/api/Common/GetOrgGrpIDs",
            params: {
                "userId": userId,
                "orgGrpId": '',
                "name": ''
                
            }

        }).map(res => <MT_ATPAR_ORG_GROUPS[]>res.json()).catch(this.handleError);


    }
    insertUpdateOrgUnits(userID, mode, lstOrgUnits: RM_ORG_UNITS) {
        return this.httpservice.create({
            apiMethod: "/api/ManageOrgID/InsertUpdateOrgUnits",
            params: {
                "userID": userID,
                "mode": mode,
                "newType": 'I',
               
            },
            formData: [lstOrgUnits]
      //  }).map(res => <RM_ORG_UNITS[]>res.json()).catch(this.handleError);

    }).map(res => <AtParWebApiResponse<RM_ORG_UNITS>>res.json()).catch(this.handleError);
    }
    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}