import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { VM_ATPAR_IBU_ALLOCATION } from '../../app/Entities/VM_ATPAR_IBU_ALLOCATION';
import { Observable } from 'rxjs/Rx';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';

@Injectable()
export class BinToBinAllocateBunitService {


    constructor(private httpservice: HttpService) {
    }

    getBUnits(bArray, userID, bUnit, description, serverUserID) {
        return this.httpservice.get({
            apiMethod: "/api/BBAllocBU/GetBUnits",           
            params: {
                "bArray": bArray,
                "appId": "12",
                "userID": userID,
                "bUnit": bUnit,
                "description": description,
                "serverUserID": serverUserID             
            }

        }).map(res => <AtParWebApiResponse<VM_ATPAR_IBU_ALLOCATION>>res.json()).catch(this.handleError);
    }

    allocateBUnits(userID, serverUserID, lstBUnitsAllocation, blnSearched, lstCheckedBUnits: Array<VM_ATPAR_IBU_ALLOCATION>) {
        return this.httpservice.create({
            apiMethod: "/api/BBAllocBU/AllocateBUnits",
            formData: lstCheckedBUnits,           
            params: {
                "appId": "12",
                "userID": userID,
                "serverUserID": serverUserID,
                "lstBUnitsAllocation": lstBUnitsAllocation,                
                "searched": blnSearched,               
                
            }

        }).map(res => <AtParWebApiResponse<VM_ATPAR_IBU_ALLOCATION>>res.json()).catch(this.handleError);
    }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}