import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { MT_DELV_EXCLUDE_LOC } from '../../app/Entities/MT_DELV_EXCLUDE_LOC';
import { Observable } from 'rxjs/Rx';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';

@Injectable()
export class ExcludeLocationsService {

    public headers: Headers;
    constructor(private httpservice: HttpService) {
    }

    getAllLocations(setID, location, deviceTokenEntry: string[]) {
        return this.httpservice.get({
            apiMethod: "/api/ExcludeLocs/GetAllLocations",
            params: {
                "setID": setID,
                "location": location,
                "deviceTokenEntry": deviceTokenEntry
            }
        }).map(res => <AtParWebApiResponse<MT_DELV_EXCLUDE_LOC>>res.json()).catch(this.handleError);
    }

    excludeLocs(lstLocs: Array<MT_DELV_EXCLUDE_LOC>, deviceTokenEntry) {
        return this.httpservice.create({
            apiMethod: "/api/ExcludeLocs/ExcludeLocs",
            formData: lstLocs,
            params: {
                "deviceTokenEntry": deviceTokenEntry
            }
        }).map(res => <AtParWebApiResponse<MT_DELV_EXCLUDE_LOC>>res.json()).catch(this.handleError);
    }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}