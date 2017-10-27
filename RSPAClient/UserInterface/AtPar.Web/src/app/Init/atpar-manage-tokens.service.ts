import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx'
import { MT_ATPAR_TOKENS } from '../Entities/MT_ATPAR_TOKENS'
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse'

@Injectable()
export class ManageTokensService {
    constructor(private httpService: HttpService) {

    }
    getLiveTokens(pChkValue) {
        return this.httpService.get({
            apiMethod: "/api/Token/GetLiveTokens",
            params: {
                "pChkValue": pChkValue
            }
        }).catch(this.httpService.handleError).map((res: Response) => res.json() as AtParWebApiResponse<MT_ATPAR_TOKENS>);
    }

    deleteTokenEntry(strAccessToken) {
        return this.httpService.create({
            apiMethod: "/api/Token/DeleteTokenEntry",
            params: {
                "strAccessToken": strAccessToken
            }
        }).catch(this.httpService.handleError).map((res: Response) => res.json() as AtParWebApiResponse<MT_ATPAR_TOKENS>);
    }

    runTokenGC() {
        return this.httpService.create({
            apiMethod: "/api/Token/RunTokenGC"
        }).catch(this.httpService.handleError).map((res: Response) => res.json() as AtParWebApiResponse<MT_ATPAR_TOKENS>);
    }

    public handleError(error: Response) {
        console.log(error);
        return Observable.throw(error.json().error || 'server-error');
    }
}
