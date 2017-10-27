
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../Shared/HttpService';


@Injectable()
export class PouQuantityOnHandReportService {

    constructor(
        private httpservice: HttpService
    ) { }

    async   getQtyOnHandReportData(businessUnit, cartID, itemID, vendID, userID, serialNumber, negativeStatus, lotNumber, orgGrpID, appID) {
        return await this.httpservice.getSync({
            apiMethod: "/api/QuantityOnHandReport/GetQtyOnHandReportData",
            params: {
                "businessUnit": businessUnit,                
                "cartID": cartID,
                "itemID": itemID,              
                "vendID": vendID,
                "userID": userID,
                "serialNumber": serialNumber,
                "negativeStatus": negativeStatus,
                "lotNumber":lotNumber,
                "orgGrpID": orgGrpID,
                "appId": appID
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

    async getBUnits_Carts(userID, appID, locationType, cartType) {
        return await this.httpservice.getSync({
            apiMethod: "/api/POUCreateOrders/GetBUnits_Carts",
            params: {
                "userID": userID,
                "appID": appID,
                "locationType": locationType,
                "cartType": cartType
            }
        });
    }

    async getVendorsInfo(orgGrpID) {
        return await this.httpservice.getSync({
            apiMethod: "/api/BillonlyAndConsignedItems/GetVendorsInfo",
            params: {
                "orgGrpID": orgGrpID
            }
        });
    }

    

    public handleError(error: Response) {
        
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
