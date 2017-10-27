import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';

//import { VM_TKIT_ITEM_DEPT } from '../../app/Entities/VM_TKIT_ITEM_DEPT';


@Injectable()
export class DeliveryReportService {

    constructor(private httpservice: HttpService) {

    }


    async getHeirarchyUsersList(appID, userID, orgGroupID) {
        return await this.httpservice.getSync({
            "apiMethod": "/api/IssueReport/GetHeirarchyUsersList",
            params: {
                appID: appID,
                userID: userID,
                orgGrpID: orgGroupID
            }
        })
    }

    getTrackITDetpartments(deptID, status) {
        return this.httpservice.getSync({
            apiMethod: "/api/DeliveryTrackITReport/GetTKITDepts",
            params: {
                "deptID": deptID,
                "status": status,
                 }

        });
    }


    getTkITDeliverReport(fromDate, toDate, request, recipient, userId, departmentId, itemId, vendorName, descr, location,
        reqId, status) {
        return this.httpservice.getSync({
            apiMethod: "/api/DeliveryTrackITReport/GetTkITDeliverReport",
            params: {
                "fromDate": fromDate,
                "toDate": toDate,
                "request": request,
                "recipient": recipient,
                "userId": userId,
                "departmentId": departmentId,
                "itemId": itemId,
                "vendorName": vendorName,
                "descr": descr,
                "location": location,
                "reqId": reqId,
                "status": status,
            }

        });
    }


    getRequestors(inactiveStatusChk) {
        return this.httpservice.getSync({
            apiMethod: "/api/DeliveryTrackITReport/GetRequestors",
            params: {
                "inactiveStatusChk": inactiveStatusChk,
               
            }

        });
    }



    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}