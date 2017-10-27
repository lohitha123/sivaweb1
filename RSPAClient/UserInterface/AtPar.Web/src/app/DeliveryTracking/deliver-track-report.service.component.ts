import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';

@Injectable()
export class DeliveryTrackReportServiceComponent {
    public headers: Headers;

    constructor(private httpservice: HttpService) {

    }
    public async GetDeliveryTrackingReportData(trackNo, poId, deptID, fromDate, toDate, vendorName,
        itemDesc, itemID, carrierID,
        DeliveryLoc, requestor, receiver, selectedStatus, currentStatus, systemID, locDescr) {

        return await this.httpservice.getSync({
            apiMethod: "/api/DeliverTrack/GetDeliveryTrackingReportData",
            params: {
               "trackNo":trackNo,
                "poId":poId,
                "deptID": deptID,
                "fromDate": fromDate,
                "toDate":toDate,
                "vendorName" :vendorName,
                "itemDesc": itemDesc,
                "itemID": itemID,
                "carrierID":carrierID,
                "strDeliveryLoc" :DeliveryLoc,
                "requestor":requestor,
                "receiver": receiver,
                "selectedStatus": selectedStatus,
                "currentStatus": currentStatus,
                "systemID": systemID,
                "locDescr": locDescr
                
            }

        })
    }

    public async ValidateSystemID(systemID) {

        return await this.httpservice.getSync({
            apiMethod: "/api/DeliverTrack/ValidateSystemID",
            params: {
                "systemID": systemID,
               
            }

        })
    }


    public handleError(error: Response) {

        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}