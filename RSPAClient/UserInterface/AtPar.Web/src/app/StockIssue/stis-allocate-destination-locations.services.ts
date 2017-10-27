import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { MT_STIS_DEST_LOC_ALLOCATION } from '../../app/Entities/MT_STIS_DEST_LOC_ALLOCATION';
import { Observable } from 'rxjs/Rx';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';

@Injectable()
export class AllocateDestinationLocationsService {


    constructor(private httpservice: HttpService) {
    }

    allocatedDestLocations(userID, selectedUserID,lstLocations: Array<MT_STIS_DEST_LOC_ALLOCATION> , searched, bUnit) {
        return this.httpservice.create({
            apiMethod: "/api/AllocateDestinationLocations/AllocatedDestLocations",
            formData: lstLocations,
            params: {
                "userID": userID,
                "selectedUserID": selectedUserID,
                "searched": searched,
                "bUnit": bUnit               
            }
        }).map(res => <AtParWebApiResponse<MT_STIS_DEST_LOC_ALLOCATION>>res.json()).catch(this.handleError);
    }

    getAllocInvBUnits(appID, userID,orgGrpId) {
        return this.httpservice.get({
            apiMethod: "/api/AllocateDestinationLocations/GetAllocInvBUnits",
            params: {
                "appID": appID,
                "userID": userID,
                "orgGrpId": orgGrpId                
            }
        }).map(res => <AtParWebApiResponse<MT_STIS_DEST_LOC_ALLOCATION>>res.json()).catch(this.handleError);
    }

    getDestinationLocations(bArray: string[], location, userID, orgGroupID, serverUserID) {
        return this.httpservice.get({
            apiMethod: "/api/AllocateDestinationLocations/GetDestinationLocations",
            params: {
                "bArray": bArray,
                "location": location,
                "userID": userID,
                "orgGroupID": orgGroupID,
                "serverUserID": serverUserID                
            }
        }).map(res => <AtParWebApiResponse<MT_STIS_DEST_LOC_ALLOCATION>>res.json()).catch(this.handleError);

    }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}