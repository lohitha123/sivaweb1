
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import { AtParWebApiResponse } from '../Shared/AtParWebApiResponse';
import { HttpService } from '../Shared/HttpService';
import { VM_DEPARTMENT_CART_ITEMS } from '../Entities/VM_DEPARTMENT_CART_ITEMS';

@Injectable()
export class ReviewChargesCreditsServices {

    constructor(
        private httpService: HttpService
    ) { }

    getDepartmentItems(deptID, orgGrpID) {
        return this.httpService.getSync({
            apiMethod: "/api/PreferenceLists/GetDepartmentItems",
            params: {
                "deptID": deptID,
                "orgGrpID": orgGrpID,
            }
        });
    }

    getCharges(fromDate, toDate, patientID, examID, accountID, deptID, comments, rstatus, appID) {
        return this.httpService.getSync({
            apiMethod: "/api/ReviewCharges_Credits/GetCharges",
            params: {
                "fromDate": fromDate,
                "toDate": toDate,
                "patientID": patientID,
                "examID": examID,
                "accountID": accountID,
                "deptID": deptID,
                "comments": comments,
                "status": rstatus,
                "appID": appID,
            }
        });
    }

    getCredits(fromDate, toDate, patientID, examID, accountID, deptID, comments, reviewed) {
        return this.httpService.getSync({
            apiMethod: "/api/ReviewCharges_Credits/GetCredits",
            params: {
                "fromDate": fromDate,
                "toDate": toDate,
                "patientID": patientID,
                "examID": examID,
                "accountID": accountID,
                "deptID": deptID,
                "comments": comments,
                "reviewed": reviewed
            }
        });
    }

    setReviewed(lstReviewed) {
        return this.httpService.create({
            apiMethod: "/api/ReviewCharges_Credits/SetReviewed",
            formData: lstReviewed
        }).toPromise();
    }

    updateCharges(transID, dicDataItems) {
        return this.httpService.create({
            apiMethod: "/api/ReviewCharges_Credits/UpdateCharges",
            formData: dicDataItems,
            params: {
                "transID": transID
            }
        }).toPromise();
    }

    insertPouChargeCaptureDetails(transactionID, itemID, itemDescription, itemLotNumber, itemSerialnumber, itemChargeCode, itemPrice, lineNo, pQty) {
        return this.httpService.create({
            apiMethod: "/api/ReviewCharges_Credits/InsertPouChargeCaptureDetails",
            params: {
                "transactionID": transactionID,
                "itemID": itemID,
                "itemDescription": itemDescription,
                "itemLotNumber": itemLotNumber,
                "itemSerialnumber": itemSerialnumber,
                "itemChargeCode": itemChargeCode,
                "itemPrice": itemPrice,
                "lineNo": lineNo,
                "pQty": pQty
            }
        }).toPromise();
    }

    updateCredits(dicDataItems) {
        return this.httpService.create({
            apiMethod: "/api/ReviewCharges_Credits/UpdateCredits",
            formData: dicDataItems
        }).toPromise();
    }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
