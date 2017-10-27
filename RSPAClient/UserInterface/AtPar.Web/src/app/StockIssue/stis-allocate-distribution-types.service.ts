import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../Shared/HttpService';
import { MT_ATPAR_SECURITY_AUDIT } from '../Entities/MT_ATPAR_SECURITY_AUDIT';
import { MT_STIS_DISTRIB_TYPE } from '../Entities/MT_STIS_DISTRIB_TYPE';

@Injectable()

export class AllocateDistributionTypesService {
    constructor(private httpService: HttpService, public http: Http) { }

    public async getDistributionTypes(distributionType, userID, orgGroupID) {

        return await this.httpService.getSync({
            apiMethod: "/api/DistributionTypes/GetDistributionTypes",
            params: {
                "distributionType": distributionType,
                "userID": userID,
                "orgGroupID": orgGroupID                
            }
        });
    }
    public async allocateDistributionTypes(loginUserID, selectedUserID, lstDistAllocation: Array<MT_STIS_DISTRIB_TYPE>, searched) {

        return await this.httpService.create({
            apiMethod: "/api/DistributionTypes/AllocateDistributionTypes",
            formData: lstDistAllocation,
            params: {
                "loginUserID": loginUserID,
                "selectedUserID": selectedUserID,
                "searched": searched             
            }
        }).toPromise();
    }
}