import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';

@Injectable()

export class BackOrderReportService {

    constructor(private httpservice: HttpService) {
    }


    async getBackOrderReportData(pStrBusinessUnit, pStrCartId, pStrUserId, pStrFromDate, pStrToDate, pOrgGrpID, pAppID) {
        return await this.httpservice.getSync({
            "apiMethod": "/api/BackOrderReport/GetBackOrderReportData",
            params: {
                pStrBusinessUnit: pStrBusinessUnit,
                pStrCartId: pStrCartId,
                pStrUserId: pStrUserId,
                pStrFromDate: pStrFromDate,
                pStrToDate: pStrToDate,
                pOrgGrpID: pOrgGrpID,
                pAppID: pAppID
            }
        })
    }

    async getBUnits_Carts(userID, appID, locationType, cartType) {
        return await this.httpservice.getSync({
            "apiMethod": "/api/BackOrderReport/GetBUnits_Carts",
            params: {
                userID: userID,
                appID: appID,
                locationType: locationType,
                cartType: cartType
            }
        })
    }


    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    };
}
