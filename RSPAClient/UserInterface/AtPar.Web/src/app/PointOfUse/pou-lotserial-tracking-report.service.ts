import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';

@Injectable()
export class LotSerialTrackReportService {

    constructor(
        private httpService: HttpService
    ) { }

    async  getLotSerialTrackReport(fromDate, toDate, lotNumber, srNo, patientID, examID, accountID, itemId, orgGrpID, deptID, appID) {
        return await this.httpService.getSync({
            apiMethod: "/api/LotSerialTrackingReport/GetLotSerialTrackReport",
            params: {
                "startDate": fromDate,
                "endDate": toDate,
                "lotNumber": lotNumber,
                "srNo": srNo,
                "patientID": patientID,
                "examID": examID,
                "accountID": accountID,
                "itemId": itemId,
                "orgGrpID": orgGrpID,
                "deptID": deptID,
                "appID": appID,
            }
        });
    }
}