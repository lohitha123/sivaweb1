"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var PAR_MNGT_VENDOR_1 = require("../../app/Entities/PAR_MNGT_VENDOR");
var OrgParametersComponent = (function () {
    function OrgParametersComponent() {
        this.pop = false;
        this.loading = true;
        this.newItem = new PAR_MNGT_VENDOR_1.PAR_MNGT_VENDOR();
    }
    OrgParametersComponent.prototype.go = function () {
        this.pop = !this.pop;
    };
    return OrgParametersComponent;
}());
OrgParametersComponent = __decorate([
    core_1.Component({
        templateUrl: './app/Init/atpar-org-parameters.component.html'
    })
], OrgParametersComponent);
exports.OrgParametersComponent = OrgParametersComponent;
//# sourceMappingURL=atpar-org-parameters.component.js.map