import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Headers, RequestOptions } from '@angular/http';
import { URLSearchParams } from "@angular/http";
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { TokenEntry_Enum, EnumApps } from '../Shared/AtParEnums';

@Injectable()
export class CartItemUsageService {

    constructor(private http: Http, private httpService: HttpService) {
        this.http = http;
    }

    async GetCartItemInfo(orgGroupID, businessUnit, cartID, serverUser, profileID) {

        return await this.httpService.getSync({
            "apiMethod": "/api/Common/GetCartItemInfo",
            params: {
                "orgGroupID": orgGroupID,
                "businessUnit": businessUnit,
                "cartID": cartID,
                "serverUser": serverUser,
                "profileID": profileID//Profile ID               
            }
        });
    }

    async GetItemUsageDetails(ItemId, fromdate, todate, bunit, cartId,serveruser) {

        return await this.httpService.getSync({
            "apiMethod": "/api/ItemUsageReport/GetItemUsageDetails",
            params: {
                "itemID": ItemId,
                "fDate": fromdate,
                "toDate": todate,
                "bUnit": bunit,
                "cartId": cartId,
                "srvrUserID": serveruser
                    
            }
        });
    }

    
}