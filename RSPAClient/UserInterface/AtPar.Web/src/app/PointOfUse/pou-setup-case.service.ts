import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpService } from '../Shared/HttpService';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import * as Rx from 'rxjs/Rx'
import 'rxjs/add/operator/toPromise';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { TokenEntry_Enum, StatusType } from '../Shared/AtParEnums';

@Injectable()
export class POUSetupCaseService {
    constructor(private httpservice: HttpService) {

    }
    private headers = new Headers({ 'Content-Type': 'application/json' });


    async getCaseInfo(strPhysician, strProcedureCode, deviceTokenEntry) {
        return await this.httpservice.getSync({
            "apiMethod": "/api/SetupCase/GetCaseInfo",
            params: {
                "strPhysician": strPhysician,
                "strProcedureCode": strProcedureCode,
                "deviceTokenEntry": deviceTokenEntry

            }

        });


    }


    async getPreferenceListIDs(deviceTokenEntry) {
        return await this.httpservice.getSync({
            "apiMethod": "/api/SetupCase/GetPreferenceListIDs",
            params: {
                "deviceTokenEntry": deviceTokenEntry

            }

        });


    }


    addCaseInfo(caseID, caseDesc, physID, patient, prefID, procID, date, userID, roomNo, status) {
        return this.httpservice.create({
            "apiMethod": "/api/SetupCase/AddCaseInfo",
            params: {
                "caseID": caseID,
                "caseDesc": caseDesc,
                "physID": physID,
                "patient": patient,
                "prefID": prefID,
                "procID": procID,
                "date": date,
                "userID": userID,
                "roomNo": roomNo,
                "status": status
            }

        }).toPromise();

    }

    deleteCaseID(caseID, prefID, procID) {
        return this.httpservice.create({
            apiMethod: "/api/SetupCase/DeleteCaseID",
            params: {
                "caseID": caseID,
                "prefID": prefID,
                "procID": procID,

            }

        }).toPromise();
    }

    public handleError(error: Response) {
        return Observable.throw(error.json().error || 'Server error');
    }
}