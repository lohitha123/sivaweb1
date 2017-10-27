/// <reference path="../entities/atparkeyvaluepair.ts" />

import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { PAR_MNGT_VENDOR } from '../../app/Entities/PAR_MNGT_VENDOR';

import { AtParKeyValuePair } from '../../app/Entities/atparkeyvaluepair';
import { MT_ATPAR_ORG_GROUPS } from '../../app/Entities/MT_ATPAR_ORG_GROUPS';
import { Observable } from 'rxjs/Rx';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';


@Injectable()
export class SetupVendorServices {
   // public headers: Headers;


    
    constructor(private httpservice: HttpService) {
    }
   

    getVendorDetails(orgGroupID, vendorID, search) {
        return this.httpservice.get({
            apiMethod: "/api/Vendor/GetVendorDetails",
            params: {
                "orgGroupID": orgGroupID,
                "vendorID": vendorID,
                "search": search,
            }

        }).map(res => <AtParWebApiResponse<PAR_MNGT_VENDOR>>res.json()).catch(this.handleError);
    }


    GetOrgGroup(userId) {
        return this.httpservice.get({
            apiMethod: "/api/Common/GetOrgDetails",
            params: {
                "userId": userId
            }

        }).map(res => <AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>>res.json()).catch(this.handleError);
    }

    CreateVendor(newItem) {
        return this.httpservice.create({
            apiMethod: "/api/Vendor/CreateVendor",
            formData: newItem
        }).map(res => <AtParWebApiResponse<PAR_MNGT_VENDOR>>res.json()).catch(this.handleError);

    }
    UpdateVendor(newItem) {

        return this.httpservice.update({
            apiMethod: '/api/Vendor/UpdateVendor',
            formData: newItem
            //   }).map(res => <PAR_MNGT_VENDOR[]>res.json()).catch(this.handleError);
        }).map(res => <AtParWebApiResponse<PAR_MNGT_VENDOR>>res.json()).catch(this.handleError);
    }

    UpdateVendorStatus(status, vendorid) {

        if (status == true) {
            return this.httpservice.update({
                apiMethod: '/api/Vendor/UpdateVendorStatus',
                params: {
                    "status": 0,
                    "vendorID": vendorid

                }
           // }).map(res => <PAR_MNGT_VENDOR[]>res.json()).catch(this.handleError);
            }).map(res => <AtParWebApiResponse<PAR_MNGT_VENDOR>>res.json()).catch(this.handleError);
        }

        else {
            return this.httpservice.update({
                apiMethod: '/api/Vendor/UpdateVendorStatus',
                params: {
                    "status": 1,
                    "vendorID": vendorid

                }
          //  }).map(res => <PAR_MNGT_VENDOR[]>res.json()).catch(this.handleError);

        }).map(res => <AtParWebApiResponse<PAR_MNGT_VENDOR>>res.json()).catch(this.handleError);
        }
    }


    GetVendorUsers(vendorID, orgGroupID) {
        return this.httpservice.get({
            apiMethod: "/api/Vendor/GetVendorUsers",
            params: {
                "vendorID": vendorID,
                "orgGroupID": orgGroupID
            }

        }).map(res => <AtParWebApiResponse<AtParKeyValuePair>>res.json()).catch(this.handleError);
    }



    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }






}