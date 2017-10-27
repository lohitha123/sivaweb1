
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../Shared/HttpService';


@Injectable()
export class PouTransactionHistoryReportService {

    constructor(
        private httpservice: HttpService
    ) { }

    async  getInventoryTrackHistoryReport(startDate, endDate, bUnit, parLoc, itemID, orgID, negInventory, appID) {
        return await this.httpservice.getSync({
            apiMethod: "/api/TransactionHistoryReport/GetInventoryTrackHistoryReport",
            params: {
                "startDate": startDate,
                "endDate": endDate,
                "bUnit": bUnit,
                "parLoc": parLoc,
                "itemID": itemID,                              
                "orgID": orgID,
                "negInventory": negInventory,
                "appID": appID
            }
        });
    }

    async GetDeptAllocCarts(businessUnit, cartId, display, locationType, appId, orgGrpID) {
        return await this.httpservice.getSync({
            apiMethod: "/api/TransactionHistoryReport/GetDeptAllocCarts",
            params: {
                "businessUnit": businessUnit,
                "cartId": cartId,
                "display": display,
                "locationType": locationType,
                "appId": appId,              
                "orgGrpID": orgGrpID
            }
        });
    }

    async  getUserDepartmentsItems(userID, orgGrpID, synchInvCarts, appID) {
        return await this.httpservice.getSync({
            apiMethod: "/api/QuantityOnHandReport/GetUserdepartmentsitems",
            params: {
                "userID": userID,
                "orgGrpID": orgGrpID,
                "synchInvCarts": synchInvCarts,
                "appID": appID
            }
        });
    }

    public handleError(error: Response) {
        
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
