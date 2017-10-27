/// <reference path="../entities/mt_atpar_schedule_header.ts" />
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { MT_ATPAR_ORG_GROUP_BUNITS } from "../../app/Entities/mt_atpar_org_group_bunits";
import { AtParKeyValuePair } from '../../app/Entities/atparkeyvaluepair';
import { VM_CART_SCHEDULES } from '../entities/VM_CART_SCHEDULES';
import { MT_ATPAR_ORG_GROUPS } from '../../app/Entities/MT_ATPAR_ORG_GROUPS';
import { MT_CRCT_PAR_LOC_SCHEDULE_DETAILS } from '../entities/mt_crct_par_loc_schedule_details';
import { MT_CRCT_USER_ALLOCATION } from '../entities/mt_crct_user_allocation';
import { MT_ATPAR_SCHEDULE_HEADER } from '../Entities/MT_ATPAR_SCHEDULE_HEADER';
import { Observable } from 'rxjs/Rx';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';


@Injectable()
export class CartProcessServices {

    constructor(private httpservice: HttpService) {
    }

    //GetUserOrgGroups(UserID, OrgGrpID, _deviceTokenEntry) {
    //    return this.httpservice.get({
    //        apiMethod: "/api/Common/GetUserOrgGroups",
    //        params: {
    //            "user": UserID,
    //            "orgGrpId": OrgGrpID,
    //            "deviceTokenEntry": _deviceTokenEntry

    //        }



    //    }).catch(this.httpservice.handleError).map((res: Response) => res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>);
    //}

   
    //GetOrgBusinessUnits(OrgGrpID, businessUnitType, deviceTokenEntry) {
    //    return this.httpservice.get({
    //        apiMethod: "/api/Common/GetOrgBusinessUnits",
    //        params: {
    //            "orgGrpID": OrgGrpID,
    //            "businessUnitType": businessUnitType,
    //            "DeviceTokenEntry": deviceTokenEntry

    //        }


    //    }).catch(this.httpservice.handleError)
    //        .map((res: Response) => res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUP_BUNITS>);
    //}

    GetProcessParametersCarts(OrgGrpID, bUnit, cartID, userID) {
        return this.httpservice.get({
            apiMethod: "/api/ProcessParameters/GetProcessParametersCarts",
            params: {
                "orgGroupID": OrgGrpID,

                "bUnit": bUnit,
                "cartID": cartID,
                "userID": userID               
            }

        }).toPromise();
       
    }

    //GetCartSchedules(OrgGrpID, cartID, bUnit, userID) {
    //    return this.httpservice.get({
    //        apiMethod: "/api/ProcessParameters/GetCartSchedules",
    //        params: {
    //            "orgGroupID": OrgGrpID,
    //            "cartID": cartID,
    //            "bUnit": bUnit,

    //            "userID": userID
    //        }

    //    }).catch(this.httpservice.handleError)
    //        .map((res: Response) => res.json() as AtParWebApiResponse<MT_CRCT_PAR_LOC_SCHEDULE_DETAILS>);


    //}

    GetSheduleIdata(orgGroupID) {
        //MT_ATPAR_SCHEDULE_HEADER
        return this.httpservice.get({
            apiMethod: "/api/ProcessParameters/GetSheduleIDs",
            params: {
                "orgGroupID": orgGroupID

            }

        }).toPromise();


    }


    //  thit  insert
       AssignScheduleToCarts(lstCartSchedules: Array<MT_CRCT_PAR_LOC_SCHEDULE_DETAILS>, orgGroupID, bUnit) {

        return  this.httpservice.update({
            apiMethod: "/api/ProcessParameters/AssignScheduleToCarts",
            formData: lstCartSchedules,
            params: {
                "orgGroupID": orgGroupID,
                "bUnit": bUnit
            }

        }) .toPromise();
    }

  
    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }






}