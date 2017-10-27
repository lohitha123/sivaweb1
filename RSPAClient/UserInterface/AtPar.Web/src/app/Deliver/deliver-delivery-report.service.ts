import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';

@Injectable()
export class DeliveryReportServiceComponent {
    public headers: Headers;

    constructor(private httpservice: HttpService) {

    }
    public async  GetDeliveryReportData(OrgGroupID, fromDate, ToDate, srvrUserID, PoId, DeliverTo, TrackingNo, DeliverdBy,
        DeptId, VendorName, ItmDesc, Loc, ItemId,
        Carrier, Requestor, BlnTflag, DeliveryLoc, Status, CurrStatus, LocDescr, PakageType,
        Pallet) {

        return await this.httpservice.getSync({
            apiMethod: "/api/DeliveryReport/GetDeliveryReportData",
            params: {
                "orgGroupId": OrgGroupID,
                "fromDate": fromDate,
                "ToDate": ToDate,
                "srvrUserID": srvrUserID,
                "PoId": PoId,
                "DeliverTo": DeliverTo,
                "TrackingNo": TrackingNo,
                "DeliverdBy": DeliverdBy,
                "DeptId": DeptId,
                "VendorName": VendorName,
                "ItmDesc": ItmDesc,
                "Loc": Loc,
                "ItemId": ItemId,
                "Carrier": Carrier,
                "Requestor": Requestor,
                "BlnTflag": BlnTflag,
                "DeliveryLoc": DeliveryLoc,
                "Status": Status,
                "CurrStatus": CurrStatus,
                "LocDescr": LocDescr,
                "PakageType": PakageType,
                "Pallet": Pallet

            }

        })
    }


    public handleError(error: Response) {

        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}