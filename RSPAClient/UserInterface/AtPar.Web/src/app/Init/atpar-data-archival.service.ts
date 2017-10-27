import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../Shared/HttpService';
import { MT_ATPAR_SECURITY_AUDIT } from '../Entities/MT_ATPAR_SECURITY_AUDIT';
import { MT_STIS_DISTRIB_TYPE } from '../Entities/MT_STIS_DISTRIB_TYPE';

@Injectable()
export class DataArchivalService {
    constructor(private httpService: HttpService) {

    }
    public async getPurgeAppIDs(){

        return await this.httpService.getSync({
            apiMethod: "/api/DataArchival/GetPurgeAppIDs",
        });
    }
    public async doArchivalData(appID,archiveDate) {

        return await this.httpService.getSync({
            apiMethod: "/api/DataArchival/DoArchivalData",
            params: {
                "appID": appID,
                "archiveDate": archiveDate,
            }
        });
    }
}