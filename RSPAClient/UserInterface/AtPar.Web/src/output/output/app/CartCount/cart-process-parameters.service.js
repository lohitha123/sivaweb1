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
/// <reference path="../entities/mt_atpar_schedule_header.ts" />
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var Rx_1 = require("rxjs/Rx");
var HttpService_1 = require("../Shared/HttpService");
var CartProcessServices = (function () {
    function CartProcessServices(httpservice) {
        this.httpservice = httpservice;
    }
    //GetUserOrgGroups(UserID, OrgGrpID, _deviceTokenEntry) {
    //    return this.httpservice.get({
    //        apiMethod: "/api/Common/GetUserOrgGroups",
    //        params: {
    //            "user": UserID,
    //            "orgGrpId": OrgGrpID,
    //            "deviceTokenEntry": _deviceTokenEntry
    //        }
    //    }).catch(this.httpservice.handleError).map((res: Response) => res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUPS>);
    //}
    //GetOrgBusinessUnits(OrgGrpID, businessUnitType, deviceTokenEntry) {
    //    return this.httpservice.get({
    //        apiMethod: "/api/Common/GetOrgBusinessUnits",
    //        params: {
    //            "orgGrpID": OrgGrpID,
    //            "businessUnitType": businessUnitType,
    //            "DeviceTokenEntry": deviceTokenEntry
    //        }
    //    }).catch(this.httpservice.handleError)
    //        .map((res: Response) => res.json() as AtParWebApiResponse<MT_ATPAR_ORG_GROUP_BUNITS>);
    //}
    CartProcessServices.prototype.GetProcessParametersCarts = function (OrgGrpID, bUnit, cartID, userID) {
        return this.httpservice.get({
            apiMethod: "/api/ProcessParameters/GetProcessParametersCarts",
            params: {
                "orgGroupID": OrgGrpID,
                "bUnit": bUnit,
                "cartID": cartID,
                "userID": userID
            }
        }).toPromise();
    };
    //GetCartSchedules(OrgGrpID, cartID, bUnit, userID) {
    //    return this.httpservice.get({
    //        apiMethod: "/api/ProcessParameters/GetCartSchedules",
    //        params: {
    //            "orgGroupID": OrgGrpID,
    //            "cartID": cartID,
    //            "bUnit": bUnit,
    //            "userID": userID
    //        }
    //    }).catch(this.httpservice.handleError)
    //        .map((res: Response) => res.json() as AtParWebApiResponse<MT_CRCT_PAR_LOC_SCHEDULE_DETAILS>);
    //}
    CartProcessServices.prototype.GetSheduleIdata = function (orgGroupID) {
        //MT_ATPAR_SCHEDULE_HEADER
        return this.httpservice.get({
            apiMethod: "/api/ProcessParameters/GetSheduleIDs",
            params: {
                "orgGroupID": orgGroupID
            }
        }).toPromise();
    };
    //  thit  insert
    CartProcessServices.prototype.AssignScheduleToCarts = function (lstCartSchedules, orgGroupID, bUnit) {
        return this.httpservice.update({
            apiMethod: "/api/ProcessParameters/AssignScheduleToCarts",
            formData: lstCartSchedules,
            params: {
                "orgGroupID": orgGroupID,
                "bUnit": bUnit
            }
        }).toPromise();
    };
    CartProcessServices.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    CartProcessServices = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [HttpService_1.HttpService])
    ], CartProcessServices);
    return CartProcessServices;
}());
exports.CartProcessServices = CartProcessServices;
//# sourceMappingURL=cart-process-parameters.service.js.map