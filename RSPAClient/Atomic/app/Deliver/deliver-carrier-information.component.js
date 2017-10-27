"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var AtParEnums_1 = require("../Shared/AtParEnums");
var CarrierInformationComponent = (function () {
    function CarrierInformationComponent() {
        this.dlvrAppId = AtParEnums_1.EnumApps.Deliver;
    }
    return CarrierInformationComponent;
}());
CarrierInformationComponent = __decorate([
    core_1.Component({
        templateUrl: './app/Deliver/deliver-carrier-information.component.html'
    })
], CarrierInformationComponent);
exports.CarrierInformationComponent = CarrierInformationComponent;
//# sourceMappingURL=deliver-carrier-information.component.js.map