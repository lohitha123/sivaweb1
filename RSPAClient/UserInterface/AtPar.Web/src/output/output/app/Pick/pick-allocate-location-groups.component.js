"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AtParEnums_1 = require("../Shared/AtParEnums");
var AllocateLocationGroupsComponent = (function () {
    function AllocateLocationGroupsComponent() {
        this.pickPlanAppId = AtParEnums_1.EnumApps.PickPlan;
    }
    AllocateLocationGroupsComponent = __decorate([
        core_1.Component({
            templateUrl: 'pick-allocate-location-groups.component.html'
        })
    ], AllocateLocationGroupsComponent);
    return AllocateLocationGroupsComponent;
}());
exports.AllocateLocationGroupsComponent = AllocateLocationGroupsComponent;
//# sourceMappingURL=pick-allocate-location-groups.component.js.map