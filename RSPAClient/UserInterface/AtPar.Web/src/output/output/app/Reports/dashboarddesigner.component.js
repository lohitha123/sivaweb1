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
//let IzendaSynergy = require("../izenda/izenda_ui");
var IzendaSynergy = require("../../assets/Izenda/izenda_ui");
var DashboardDesignerComponent = (function () {
    function DashboardDesignerComponent() {
        this.currentUserContext = {};
        this.chVal = "DashboardDesigner";
    }
    DashboardDesignerComponent.prototype.ngAfterViewInit = function () {
        //this.currentUserContext = { token: "4sl1Fd78wsfHajxJN+9S+ewGi9L2ZnD+aLRkvMGJRURvPoeXiAppU6qv3IZ658zlz8KDR2aSCX7HppEvUbp5YA==" };
        //IzendaSynergy.setCurrentUserContext(this.currentUserContext);
        IzendaSynergy.renderNewDashboardPage(document.getElementById('izenda-root'));
    };
    DashboardDesignerComponent = __decorate([
        core_1.Component({
            templateUrl: 'rootcontainer.html'
        }),
        __metadata("design:paramtypes", [])
    ], DashboardDesignerComponent);
    return DashboardDesignerComponent;
}());
exports.DashboardDesignerComponent = DashboardDesignerComponent;
//# sourceMappingURL=dashboarddesigner.component.js.map