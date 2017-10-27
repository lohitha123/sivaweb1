import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../Shared/HttpService';
import { MT_ATPAR_SECURITY_AUDIT } from '../Entities/MT_ATPAR_SECURITY_AUDIT';

@Injectable()

export class ReasonCodeService {

    constructor(private httpService: HttpService, public http: Http) { }

    public getReasonCodes(reasonCode, desc) {

        return this.httpService.getSync({
            apiMethod: "/api/SetupReasonCodes/GetReasonCodes",
            params: {
                "reasonCode": reasonCode,
                "desc": desc
            }
        });
    }

    public updateReasonCodes(reasonCode, desc) {
        return this.httpService.create({
            apiMethod: "/api/SetupReasonCodes/UpdateReasonCodes",
            params: {
                "reasonCode": reasonCode,
                "desc": desc
            }
        }).toPromise();
    }

    public deleteReasonCode(reasonCode, status) {
        return this.httpService.create({
            apiMethod: "/api/SetupReasonCodes/DeleteReasonCode",
            params: {
                "reasonCode": reasonCode,
                "status": status
            }
        }).toPromise();
    }

    public createReasonCodes(reasonCode, desc, orgGroupID) {
        return this.httpService.create({
            apiMethod: "/api/SetupReasonCodes/CreateReasonCodes",
            params: {
                "reasonCode": reasonCode,
                "desc": desc,
                "orgGrpID": orgGroupID
            }
        }).toPromise();
    }

}
