import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx'
import { MT_ATPAR_SECURITY_PARAMS } from '../Entities/MT_ATPAR_SECURITY_PARAMS'
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse'

@Injectable()
export class SecurityConfigurationService
{
    constructor(private httpService: HttpService) {

    }
    async getSecurityParams() {
        
        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetSecurityParams"
        }).catch(this.httpService.handleError);
    }

    async updateSecurityParams(params) {

        return await this.httpService.create({
           apiMethod: "/api/SecurityConfiguration/UpdateSecurityParams",
           formData: params
        }).catch(this.httpService.handleError).toPromise();
    }
}


