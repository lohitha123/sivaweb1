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
var CreateOrdersServices = (function () {
    function CreateOrdersServices(httpservice) {
        this.httpservice = httpservice;
    }
    CreateOrdersServices.prototype.getCartsForBunit = function (serverUser, businessUnit, orgGroupID) {
        return this.httpservice.getSync({
            apiMethod: "/api/CreateOrders/GetCartsForBunit",
            params: {
                "serverUser": serverUser,
                "businessUnit": businessUnit,
                "orgGroupID": orgGroupID
            }
        }).catch(this.httpservice.handleError);
    };
    CreateOrdersServices.prototype.getCartPrevCounts = function (orgGroupID, businessUnit, ID, serverUser, profileID) {
        return this.httpservice.getSync({
            apiMethod: "/api/CreateOrders/GetCartPrevCounts",
            params: {
                "orgGroupID": orgGroupID,
                "businessUnit": businessUnit,
                "ID": ID,
                "serverUser": serverUser,
                "profileID": profileID
            }
        }).catch(this.httpservice.handleError);
    };
    CreateOrdersServices.prototype.sendCartCounts = function (dicDataItems, serverUser, businessUnit, ID, profileID, orgGroupID, transID) {
        return this.httpservice.create({
            apiMethod: "/api/CreateOrders/SendCartCounts",
            formData: dicDataItems,
            params: {
                "serverUser": serverUser,
                "businessUnit": businessUnit,
                "ID": ID,
                "profileID": profileID,
                "orgGroupID": orgGroupID,
                "transID": transID
            }
        }).toPromise();
    };
    CreateOrdersServices.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    CreateOrdersServices = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [HttpService_1.HttpService])
    ], CreateOrdersServices);
    return CreateOrdersServices;
}());
exports.CreateOrdersServices = CreateOrdersServices;
//# sourceMappingURL=cart-create-orders.service.js.map