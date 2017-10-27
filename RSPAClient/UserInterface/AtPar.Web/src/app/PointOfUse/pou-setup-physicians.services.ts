import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpService } from '../Shared/HttpService';
import { AtParKeyValuePair } from '../../app/Entities/atparkeyvaluepair';
import { Observable } from 'rxjs/Rx';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';

import { TokenEntry_Enum, EnumApps } from '../Shared/AtParEnums';


@Injectable()
export class SetupPhysicianServices {
    public headers: Headers;

    constructor(private httpservice: HttpService) {
    }


    public addPhysican(physicianId, fName, lName, minitial, userID) {
        return this.httpservice.create({
            apiMethod: "/api/Physician/AddPhysicianHeader",
            params: {
                "physicianId": physicianId,
                "fName": fName,
                "lName": lName,
                "minitial": minitial,
                "userID": userID
            }
        }).toPromise();
    }
        
    public getPhysiciansList(strPhysicianID, strFname, strLname, strMinitial) {
        return this.httpservice.getSync({
            apiMethod: "/api/Physician/GetPhysicianList",
            params: {
                "strPhysicianID": strPhysicianID,
                "strFname": strFname,
                "strLname": strLname,
                "strMinitial": strMinitial
            }
        })

    }
    
    public deletePhysican(physicianId, physicianStatus, userID) {
        return this.httpservice.update({
            apiMethod: "/api/Physician/DeletePhysician",
            params: {
                "physicianId": physicianId,
                "physicianStatus": physicianStatus,
                "userID": userID
            }

        }).toPromise();
    }
    
    public updatePhysicians(physicianId, fName, lName, minitial, userID) {
        return this.httpservice.update({
            apiMethod: "/api/Physician/UpdatePhysicianDetails",
            params: {
                "physicianId": physicianId,
                "fName": fName,
                "lName": lName,
                "minitial": minitial,
                "userID": userID
            }

        }).toPromise();
    }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}














