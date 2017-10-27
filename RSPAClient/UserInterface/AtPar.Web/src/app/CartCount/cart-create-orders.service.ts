
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';
import { MT_CRCT_USER_ALLOCATION } from '../Entities/mt_crct_user_allocation';

@Injectable()
export class CreateOrdersServices {

    constructor(
        private httpservice: HttpService
    ) { }

    getCartsForBunit(serverUser, businessUnit, orgGroupID) {
        return this.httpservice.getSync({
            apiMethod: "/api/CreateOrders/GetCartsForBunit",
            params: {
                "serverUser": serverUser,
                "businessUnit": businessUnit,
                "orgGroupID": orgGroupID
            }
        }).catch(this.httpservice.handleError);
    }

    getCartPrevCounts(orgGroupID, businessUnit, ID, serverUser, profileID) {
        return this.httpservice.getSync({
            apiMethod: "/api/CreateOrders/GetCartPrevCounts",
            params: {
                "orgGroupID": orgGroupID,
                "businessUnit": businessUnit,
                "ID": ID,
                "serverUser": serverUser,
                "profileID": profileID
            }
        }).catch(this.httpservice.handleError);
    }
   
    sendCartCounts(dicDataItems, serverUser, businessUnit, ID, profileID, orgGroupID, transID) {
        return this.httpservice.create({
            apiMethod: "/api/CreateOrders/SendCartCounts",
            formData: dicDataItems,
            params: {
                "serverUser": serverUser,
                "businessUnit": businessUnit,
                "ID": ID,
                "profileID": profileID,
                "orgGroupID": orgGroupID,
                "transID": transID
            }

        }).toPromise();          
    }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
