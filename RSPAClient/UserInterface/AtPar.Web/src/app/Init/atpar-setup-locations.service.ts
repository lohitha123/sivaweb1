import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { URLSearchParams } from "@angular/http";
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';
import { VM_MT_ATPAR_INSERT_UPDATE_LOC_IDS } from "../../app/Entities/VM_MT_ATPAR_INSERT_UPDATE_LOC_IDS";

@Injectable()
export class SetupLocationServices {
    // public headers: Headers;

    constructor(private httpservice: HttpService) {
    }
    

   async InsertUpdateLocIDs(lstLocationdetails: Array<VM_MT_ATPAR_INSERT_UPDATE_LOC_IDS>, mode, newOrgID) {
        return await this.httpservice.create({
            apiMethod: "/api/SetupLocations/InsertUpdateLocIDs",
            formData: lstLocationdetails,
            params: {
                "mode": mode,
                "newOrgID": newOrgID
              
            },
        }).toPromise();//.map(res => res.json()).catch(this.handleError);

    }
  
    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }






}