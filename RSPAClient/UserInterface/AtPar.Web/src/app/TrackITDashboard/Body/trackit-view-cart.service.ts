import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { TkitHttpService } from '../../Shared/tkitHttpService';

@Injectable()

export class TrackITViewCartService {

    constructor(private httpService: TkitHttpService, public http: Http) { }

    public getLocations() {

        return this.httpService.getSync({
            apiMethod: "/api/CommonTrackIT/GetLocations"
        });
    }

    public deleteCartItem(id) {
        return this.httpService.create({
            apiMethod: "/api/ViewCart/DeleteCartItem",
            params: {
                "id": id
            }
        }).toPromise();
    }

    public clearCart() {
        return this.httpService.create({
            apiMethod: "/api/ViewCart/ClearCart"            
        }).toPromise();
    }
     
    public getPatients(itemID) {

        return this.httpService.getSync({
            apiMethod: "/api/CreateRequest/GetPatientList",
            params: {
                "itemID": itemID
            }
        });
    }    

     

    async  getCartItems() {
        return this.httpService.getSync({
            apiMethod: "/api/CommonTrackIT/GetCartItems"            
        });
    }

    async  getLatestValue(appId, fieldName) {
        return this.httpService.getSync({
            apiMethod: "/api/CommonTrackIT/GetLatestValue",
            params: {
                "appId": appId,
                "fieldName": fieldName
            }
        });
    }

    async  getOrgGroupParamValue(orgGpId, appId, fieldName) {
        return this.httpService.getSync({
            apiMethod: "/api/Common/GetOrgGroupParamValue",
            params: {
                "orgGroupID": orgGpId,
                "appID": appId,
                "orgParamName": fieldName
            }
        });
    }

    public submitCart(itemDetails, comments, requestor, requrestID) {
        return this.httpService.create({
            apiMethod: "/api/ViewCart/PlaceOrder",
            formData: itemDetails,
            params: {
                "comments": comments,
                "requestor": requestor,
                "requrestID": requrestID
            }
        }).toPromise();
    }

    GetRequestedItemsCount() {
        return this.httpService.getSync({
            "apiMethod": "/api/ViewCart/GetRequestedItemsCount",
            params: {

            }
        });
    }

}
