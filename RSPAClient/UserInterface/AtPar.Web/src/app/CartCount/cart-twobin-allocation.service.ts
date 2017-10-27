import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';
import { MT_CRCT_TWO_BIN_ALLOCATION } from '../../app/Entities/MT_CRCT_TWO_BIN_ALLOCATION';
@Injectable()
export class CartTwoBinService {
    public headers: Headers;

    constructor(private httpservice: HttpService) {

    }
    async  getCartDetails(bunit, cartID) {

        return await this.httpservice.getSync({
            apiMethod: "/api/TwoBinAlloc/GetTwoBinCartsAllocation",
            params: {               
                "bUnit": bunit,
                "cartID": cartID
            }

        })
    }

    async TwoBinSaving(lstDBData, bUnit) {

        return await this.httpservice.create({
            apiMethod: "/api/TwoBinAlloc/TwoBinSaving",
            formData: lstDBData,
            params: {                
                "bUnit": bUnit
            }

        }).toPromise()
    }


    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}