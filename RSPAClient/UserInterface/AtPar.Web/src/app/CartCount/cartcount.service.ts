import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Headers, RequestOptions } from '@angular/http';
import { URLSearchParams } from "@angular/http";
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { TokenEntry_Enum, EnumApps } from '../Shared/AtParEnums';
import { MT_CRCT_USER_ALLOCATION } from '../entities/mt_crct_user_allocation';
import { VM_MT_CRCT_CRITICAL_ITEMS } from '../entities/vm_mt_crct_critical_items';

@Injectable()
export class CriticalCommonService {

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

    async GetCartBunitsInfo(orgGroupID, serverUser, businessUnit) {

        return await this.httpService.getSync({
            "apiMethod": "/api/CriticalItems/GetCartBunitsInfo",
            params: {
                "orgGroupID": orgGroupID,
                "serverUser": serverUser,
                "bUnit": businessUnit              
            }
        });
    }


    async AllocateCartItemInfo(lstCheckedCarts,businessUnit, cartID, serverUser) {

        return await this.httpService.create({
            "apiMethod": "/api/CriticalItems/AllocateCartItemInfo",
            formData: lstCheckedCarts,
            params: {
                "bUnit": businessUnit,
                "cartID": cartID,
                "serverUser": serverUser                            
            }
        }).toPromise();
    }
}