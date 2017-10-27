
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';
import { MT_POU_DEPT_CART_ALLOCATIONS } from '../Entities/mt_pou_dept_cart_allocations';
import { VM_POU_CART_DETAILS } from '../Entities/VM_POU_CART_DETAILS';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';



@Injectable()
export class CreateOrdersServices {

    constructor(private httpservice: HttpService) {

    }

    async GetBUnits_Carts(userID, appID, locationType, cartType) {
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

    async GetItemsForSelectedLocation(cartID, bUnit, userID, orgGrpID, appID, ) {
        return await this.httpservice.getSync({
            apiMethod: "/api/POUCreateOrders/GetItemsForSelectedLocation",
            params: {
                "cartID": cartID,
                "bUnit": bUnit,
                "userID": userID,
                "orgGrpID": orgGrpID,
                "appID": appID
            }

        });
    }

    async GetCartItemCounts(bUnit, cartID, userID, itemID, orgGrpID, appID) {
        return await this.httpservice.getSync({
            apiMethod: "/api/POUCreateOrders/GetCartItemCounts",
            params: {
                "bUnit": bUnit,
                "cartID": cartID,
                "userID": userID,
                "itemID": itemID,
                "orgGrpID": orgGrpID,
                "appID": appID
            }
        });
    }

    async CreateOrder(dicDataItems, appID) {
        return await this.httpservice.create({
            apiMethod: "/api/POUCreateOrders/CreateOrder",
            formData: dicDataItems,
            params: {
                "appID": appID
            }
        }).toPromise();
    }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
