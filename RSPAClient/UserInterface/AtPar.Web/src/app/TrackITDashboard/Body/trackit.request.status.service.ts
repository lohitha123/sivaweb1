import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { TkitHttpService } from '../../Shared/tkitHttpService';
import { AtParWebApiResponse } from '../../Shared/AtParWebApiResponse';

@Injectable()
export class TkitRequestStatusService {

    constructor(private httpService: TkitHttpService) {
    }

    async getTkitMyPreferences(preference, requestorId) {
        return await this.httpService.getSync({
            "apiMethod": "/api/CommonTrackIT/GetTKITMyPreferences",
            params: {
                "preference": preference,
                "requestorID": requestorId,
            }
        });
    }

    async getOrderIds(fromDate, toDate, status) {
        return await this.httpService.getSync({
            "apiMethod": "/api/RequestStatus/GetOrderIDs",
            params: {
                "fromDate": fromDate,
                "toDate": toDate,
                "status": status,
            }
        });
    }

    async getOrderDetails(requestId, status, deptId) {
        return await this.httpService.getSync({
            "apiMethod": "/api/RequestStatus/GetOrderDetails",
            params: {
                "requestID": requestId,
                "status": status,
                "deptID": deptId,
            }
        });
    }

    async updateOrder(userId: string, serverUserId: string, lstOrderDetails) {
        return await this.httpService.update({
            "apiMethod": "/api/RequestStatus/UpdateOrder",
            formData: lstOrderDetails,
            params: {
                "userID": userId,
                "serverUserID": serverUserId
            }
        }).toPromise();
    }
       
   
}