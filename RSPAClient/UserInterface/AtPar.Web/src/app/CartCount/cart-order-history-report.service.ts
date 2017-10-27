
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';


@Injectable()
export class CartOrderHistoryReportService {

    constructor(
        private httpservice: HttpService
    ) { }

    async  getOrderHistoryRep(pStrSvrUser, pStrBUnit, pStrParLoc, pOrgGroup, pProfileID) {
        return await this.httpservice.getSync({
            apiMethod: "/api/OrderHistoryReport/GetOrderHistoryRep",
            params: {
                "user": pStrSvrUser,
                "bUnit": pStrBUnit,
                "parLoc": pStrParLoc,
                "orgGroup": pOrgGroup,
                "profileID": pProfileID,                            
            }
        });
    }

    async  getCartsForBunit(serverUser, businessUnit, orgGroupID) {
        return await this.httpservice.getSync({
            apiMethod: "/api/CreateOrders/GetCartsForBunit",
            params: {
                "serverUser": serverUser,
                "businessUnit": businessUnit,
                "orgGroupID": orgGroupID
            }
        });
    }


    public handleError(error: Response) {
        
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
