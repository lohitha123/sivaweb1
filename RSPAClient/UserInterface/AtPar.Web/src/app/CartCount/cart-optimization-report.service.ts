
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';


@Injectable()
export class OptimizationReportService {

    constructor(
        private httpservice: HttpService
    ) { }

    async   getCartOptimizationRep(bUnit, deptID, cartID, fDate, tDate, orgGrpID, profileID, intCntFreq, userID) {
        return  await   this.httpservice.getSync({
            apiMethod: "/api/OptimizationReport/GetCartOptimizationRep",
            params: {
                "bUnit": bUnit,
                "deptID": deptID,
                "cartID": cartID,
                "fDate": fDate,
                "tDate": tDate,
                "orgGrpID": orgGrpID,
                "profileID": profileID,
                "intCntFreq": intCntFreq,
                "userID": userID
            }
        });
    }


    async  updateCartParAuditRep(dicDataItems, userID, orgGrpID) {
        return await this.httpservice.create({
            apiMethod: "/api/OptimizationReport/UpdateCartParAuditRep",
            formData: dicDataItems,
            params: {               
                "userID": userID,
                "orgGrpID": orgGrpID
            }
        }).toPromise();
    }

    async   getCartsForBunit(serverUser, businessUnit, orgGroupID) {
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
