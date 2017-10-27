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
// let IzendaSynergy = require("../izenda/izenda_ui");
var izendaintegrate_1 = require("../_helpers/izendaintegrate");
var DashboardViewer = (function () {
    function DashboardViewer(izItergrate) {
        this.izItergrate = izItergrate;
    }
    DashboardViewer.prototype.ngAfterViewInit = function () {
        if (localStorage.getItem('menuName') != null && localStorage.getItem('menuName') != "null" && localStorage.getItem('menuName') != "undefined") {
            this.chVal = localStorage.getItem('menuName').toString();
        }
        if (localStorage.getItem('reportID') != null && localStorage.getItem('reportID') != "null" && localStorage.getItem('reportID') != "undefined") {
            this.reportID = localStorage.getItem('reportID');
            if (this.reportID != "null") {
                this.izItergrate.RenderDashboardViewer(this.reportID);
            }
            else {
                // Dummy report Id to show report does not exsists
                this.izItergrate.RenderDashboardViewer("55757692-U24a-44D0-A572-8b3f61f5bc56");
            }
        }
        else {
            // Dummy report Id to show report does not exsists
            this.izItergrate.RenderDashboardViewer("55757692-U24a-44D0-A572-8b3f61f5bc56");
        }
    };
    DashboardViewer = __decorate([
        core_1.Component({
            templateUrl: 'rootcontainer.html'
        }),
        __metadata("design:paramtypes", [izendaintegrate_1.IzendaIntegrate])
    ], DashboardViewer);
    return DashboardViewer;
}());
exports.DashboardViewer = DashboardViewer;
//# sourceMappingURL=dashboardviewer.component.js.map