"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var Rx_1 = require("rxjs/Rx");
var HttpService_1 = require("../Shared/HttpService");
var ReviewChargesCreditsServices = (function () {
    function ReviewChargesCreditsServices(httpService) {
        this.httpService = httpService;
    }
    ReviewChargesCreditsServices.prototype.getDepartmentItems = function (deptID, orgGrpID) {
        return this.httpService.getSync({
            apiMethod: "/api/PreferenceLists/GetDepartmentItems",
            params: {
                "deptID": deptID,
                "orgGrpID": orgGrpID,
            }
        });
    };
    ReviewChargesCreditsServices.prototype.getCharges = function (fromDate, toDate, patientID, examID, accountID, deptID, comments, rstatus, appID) {
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
    };
    ReviewChargesCreditsServices.prototype.getCredits = function (fromDate, toDate, patientID, examID, accountID, deptID, comments, reviewed) {
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
    };
    ReviewChargesCreditsServices.prototype.setReviewed = function (lstReviewed) {
        return this.httpService.create({
            apiMethod: "/api/ReviewCharges_Credits/SetReviewed",
            formData: lstReviewed
        }).toPromise();
    };
    ReviewChargesCreditsServices.prototype.updateCharges = function (transID, dicDataItems) {
        return this.httpService.create({
            apiMethod: "/api/ReviewCharges_Credits/UpdateCharges",
            formData: dicDataItems,
            params: {
                "transID": transID
            }
        }).toPromise();
    };
    ReviewChargesCreditsServices.prototype.insertPouChargeCaptureDetails = function (transactionID, itemID, itemDescription, itemLotNumber, itemSerialnumber, itemChargeCode, itemPrice, lineNo, pQty) {
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
    };
    ReviewChargesCreditsServices.prototype.updateCredits = function (dicDataItems) {
        return this.httpService.create({
            apiMethod: "/api/ReviewCharges_Credits/UpdateCredits",
            formData: dicDataItems
        }).toPromise();
    };
    ReviewChargesCreditsServices.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    ReviewChargesCreditsServices = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [HttpService_1.HttpService])
    ], ReviewChargesCreditsServices);
    return ReviewChargesCreditsServices;
}());
exports.ReviewChargesCreditsServices = ReviewChargesCreditsServices;
//# sourceMappingURL=POU-REVIEW-CHARGES-CREDITS.SERVICE.js.map