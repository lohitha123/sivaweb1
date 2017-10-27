
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Headers, RequestOptions } from '@angular/http';
import { URLSearchParams } from "@angular/http";
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { TokenEntry_Enum, EnumApps } from '../Shared/AtParEnums';
import { MT_ATPAR_SECURITY_AUDIT } from '../Entities/MT_ATPAR_SECURITY_AUDIT';
import { MT_ATPAR_ORG_GROUP_BUNITS } from '../entities/mt_atpar_org_group_bunits';


@Injectable()
export class ManageOrgGroupsService {
  
    public headers: Headers;
    constructor(private http: Http, private httpService: HttpService) {
        this.http = http;        
    }

    async saveOrgGroupsInfo(orgGroupId, orgGroupName, prvOrgID, userId) {
        return await this.httpService.create({
            "apiMethod": "/api/ManageOrgGroups/SaveOrgGroupsInfo",

            params: {
                "orgGrpID": orgGroupId,
                "orgGrpName": orgGroupName,
                "prvOrgID": prvOrgID,
                "user": userId
            }

        }).toPromise();
    }

    async saveOrgGroupsBUnits(userId, orgGroupId, orgGrpParamsLst: Array<MT_ATPAR_ORG_GROUP_BUNITS>) {
        return await this.httpService.create({
            "apiMethod": "/api/ManageOrgGroups/SaveOrgGroupsBUnits",

            formData: orgGrpParamsLst,

            params: {
                "userID": userId,
                "orgGrpID": orgGroupId
            }

        }).toPromise();

    }

    async updateOrgGroupsInfo(orgGroupName, prvOrgID, userId) {
        return await this.httpService.update({
            "apiMethod": "/api/ManageOrgGroups/UpdateOrgGroupsInfo",

            params: {
                "orgGrpName": orgGroupName,
                "prvOrgID": prvOrgID,            
                "user": userId
            }

        }).toPromise();
    }
    
    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}