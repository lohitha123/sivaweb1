
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { MT_ATPAR_ORG_GROUP_BUNITS } from "../../app/Entities/mt_atpar_org_group_bunits";
import { AtParKeyValuePair } from '../../app/Entities/atparkeyvaluepair';
import { VM_CART_SCHEDULES } from '../entities/VM_CART_SCHEDULES';



import { MT_ATPAR_ORG_GROUPS } from '../entities/mt_atpar_org_groups'
import { Observable } from 'rxjs/Rx';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';
import { MT_ATPAR_TRANSACTION } from '../../app/Entities/mt_atpar_transaction';


@Injectable()
export class AtParReleaseOrdersServices {

    constructor(private httpservice: HttpService) {
    }

   
    async  getRelOrderDetails(appID, userID, bUnit, ordNo, orgGrpID, upDateRequired) {

        return await this.httpservice.getSync({
            apiMethod: "/api/ReleaseOrders/GetReleaseOrders",
            params: {
                "appID": appID,
                "userID": userID,
                "bUnit": bUnit,
                "ordNo": ordNo,
                "orgGrpID": orgGrpID,
                "updateRequired": upDateRequired


            }



        }).catch(this.httpservice.handleError);
    }
   
    async  updateRelOrderDetails(appID, userID, bUnit, ordNo, orgGrpID, updateRequired, transID) {

        return this.httpservice.getSync({
            apiMethod: "/api/ReleaseOrders/GetReleaseOrders",
            params: {
                "appID": appID,
                "userID": userID,
                "bUnit": bUnit,
                "ordNo": ordNo,
                "orgGrpID": orgGrpID,
                "updateRequired": true,
                "transID": transID
               
            }



        }).catch(this.httpservice.handleError);
    }
    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }






}