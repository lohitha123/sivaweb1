import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpService } from '../Shared/HttpService';
import { AtParKeyValuePair } from '../../app/Entities/atparkeyvaluepair';
import { Observable } from 'rxjs/Rx';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { TokenEntry_Enum, EnumApps } from '../Shared/AtParEnums';

@Injectable()

export class DeliverySetupDropOffServices {
    public headers: Headers;

    constructor(private httpservice: HttpService) {
    }

    public getDropOffLocs(locID, locDesc, orgGroupID, deviceTokenEntry) {
        return this.httpservice.getSync({
            apiMethod: "/api/DropOffLocs/GetDropOffLocs",
            params: {
                "locID": locID,
                "locDesc": locDesc,
                "orgGroupID": orgGroupID,
               "deviceTokenEntry": deviceTokenEntry
            }
        })
    }

    public addDropOffLocs(lstDBData, deviceTokenEntry) {
        return this.httpservice.create({
            apiMethod: "/api/DropOffLocs/InsertDropOffLocs",
            formData: lstDBData,
            params: {
                "deviceTokenEntry": deviceTokenEntry
            }
        }).toPromise();
    }

    public UpdateDropOffLocs(drpLocID, locDesc, orgGroupID, userID, prevLocID, deviceTokenEntry) {
        return this.httpservice.create({
            apiMethod: "/api/DropOffLocs/EditUpdateDropOffLocs",
            params: {
                "drpLocID": drpLocID,
                "locDesc": locDesc,
                "orgGroupID": orgGroupID,
                "userID": userID,
                "prevLocID": prevLocID,
                "deviceTokenEntry": deviceTokenEntry
            }
        }).toPromise();
    }

    public statusUpdateDropOffLocS(status, orgGroupID, locID, userID, deviceTokenEntry) {
        return this.httpservice.create({
            apiMethod: "/api/DropOffLocs/UpdateDropOffLocs",
            params: {
                "status": status,
                "orgGroupID": orgGroupID,
                "locID": locID,
                "userID": userID,
                "deviceTokenEntry": deviceTokenEntry
            }
        }).toPromise();
    }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}














