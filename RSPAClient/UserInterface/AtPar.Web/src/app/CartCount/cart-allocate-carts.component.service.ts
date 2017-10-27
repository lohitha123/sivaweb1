import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';
import { MT_CRCT_USER_ALLOCATION } from '../../app/Entities/MT_CRCT_USER_ALLOCATION';
@Injectable()
export class CartCountAllocationServices {
    public headers: Headers;

    constructor(private httpservice: HttpService) {

    }
    async  getCartDetails(orgGroupID, UserID, Bunit, parlocation, order) {

        return await this.httpservice.getSync({
            apiMethod: "/api/AllocateCarts/GetCarts",
            params: {
                "orgGroupID": orgGroupID,
                "userID": UserID,
                "bUnit": Bunit,
                "cartID": parlocation,
                "order": order,
               
            }

        })
    }

    async AllocateCarts(lstDBData, userID, seletedUserID, bUnit, cartID) {

        return await this.httpservice.create({
            apiMethod: "/api/AllocateCarts/AllocateCarts",
            formData: lstDBData,
            params: {
                "userID": userID,
                "seletedUserID": seletedUserID,
                "bUnit": bUnit,
                "cartID": cartID
              
            }

        }).toPromise()
    }

    async CopyCarts(lstDBData, userID, seletedUserID, bUnit, cartID) {

        return await this.httpservice.create({
            apiMethod: "/api/AllocateCarts/CopyCarts",
            formData: lstDBData,
            params: {
                "userID": userID,
                "seletedUserID": seletedUserID,
                "bUnit": bUnit,
                "cartID": cartID

            }

        }).toPromise()
    }


    async MoveCarts(lstDBData, userID, seletedUserID, bUnit, cartID) {

        return await this.httpservice.update({
            apiMethod: "/api/AllocateCarts/MoveCarts",
            formData: lstDBData,
            params: {
                "userID": userID,
                "seletedUserID": seletedUserID,
                "bUnit": bUnit,
                "cartID": cartID

            }

        }).toPromise()
    }

    async DeleteCarts(lstDBData, seletedUserID) {

        return await this.httpservice.create({
            apiMethod: "/api/AllocateCarts/DeleteCarts",
            formData: lstDBData,
            params: {
                "userID": seletedUserID
                
            }

        }).toPromise()
    }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}