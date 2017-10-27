import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../Shared/HttpService';
import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';



@Injectable()

export class IssueReportService {
    constructor(private httpservice: HttpService) {
    }

    async getOrgGroupAllocInvBUnits(appID, userID, orgGroupID) {
        return await this.httpservice.getSync({
            "apiMethod": "/api/IssueReport/GetOrgGroupAllocInvBUnits",
            params: {
                appID: appID,
                userID: userID,
                orgGroupID: orgGroupID
            }
        })

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

    async getIssueReport(businessUnit, userID, deptID, patientID, issueUser, itemID, itemDesc, price, fromDate, toDate, status, issueLoc, userList) {
        return await this.httpservice.create({
            "apiMethod": "/api/IssueReport/GetIssueReport",
            formData: userList,
            params: {
                bUnit: businessUnit,
                userID: userID,
                deptID: deptID,
                patientID: patientID,
                issueToUser: issueUser,
                itemID: itemID,
                itemDesc: itemDesc,
                price: price,
                fromDt: fromDate,
                toDt: toDate,
                status: status,
                serverUserID: userID,
                issueToLocation: issueLoc
            }
        }).toPromise();
    }


    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    };
}