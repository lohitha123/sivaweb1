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
var router_1 = require("@angular/router");
// let IzendaSynergy = require("../izenda/izenda_ui");
var izendaintegrate_1 = require("../_helpers/izendaintegrate");
var viewDashboardComponent = (function () {
    function viewDashboardComponent(izItergrate, route, router) {
        this.izItergrate = izItergrate;
        this.route = route;
        this.router = router;
        this.dom = {};
        this.chVal = "Dashboard Viewer";
    }
    viewDashboardComponent.prototype.ngOnInit = function () {
        //this.route.queryParams.subscribe(params => {
        //    this.reportID = params["reportID"];
        //   // this.appId = params["appId"];
        //});
    };
    viewDashboardComponent.prototype.ngAfterViewInit = function () {
        //let filtersObj: any = {
        //    "filters": [],
        //    "overridingFilterValue":
        //    {  // filter object to pass to api
        //        p1value: '2;#6',            // override filter value at position 1 which is applying on current report, change >30 to >50
        //        p2value: 'Cart Count'
        //    }
        //};
        if (localStorage.getItem('menuName') != null && localStorage.getItem('menuName') != "null" && localStorage.getItem('menuName') != "undefined") {
            this.chVal = localStorage.getItem('menuName').toString();
        }
        if (localStorage.getItem('reportID') != null && localStorage.getItem('reportID') != "null" && localStorage.getItem('reportID') != "undefined") {
            this.reportID = localStorage.getItem('reportID');
            if (this.reportID != "null") {
                this.izItergrate.RenderNewDashboard(this.reportID);
            }
            else {
                // Dummy report Id to show report does not exsists
                this.izItergrate.RenderNewDashboard("55757692-U24a-44D0-A572-8b3f61f5bc56");
            }
        }
        else {
            // Dummy report Id to show report does not exsists
            this.dom = this.izItergrate.RenderNewDashboard("55757692-U24a-44D0-A572-8b3f61f5bc56");
        }
    };
    viewDashboardComponent = __decorate([
        core_1.Component({
            templateUrl: 'rootcontainer.html'
        }),
        __metadata("design:paramtypes", [izendaintegrate_1.IzendaIntegrate, router_1.ActivatedRoute, router_1.Router])
    ], viewDashboardComponent);
    return viewDashboardComponent;
}());
exports.viewDashboardComponent = viewDashboardComponent;
//# sourceMappingURL=viewDashboard.js.map