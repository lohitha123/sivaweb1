"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="trackitlogin/trackit.login.module.ts" />
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var atpar_page_not_found_component_1 = require("./AtPar/atpar-page-not-found.component");
var index_1 = require("./export/index");
var customurlserializer_1 = require("./_helpers/customurlserializer");
//export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
//    parse(url: string): UrlTree {
//        return super.parse(url.toLowerCase());
//    }
//}
exports.routes = [
    { path: 'pagenotfound', component: atpar_page_not_found_component_1.PageNotFoundComponent },
    { path: 'viewer/reportpart/:id', component: index_1.ExportReportComponent },
    { path: 'report/view/:id', component: index_1.ExportReportViewerComponent },
    { path: 'dashboard/view/:id', component: index_1.ExportDashboardViewerComponent },
    { path: 'login', loadChildren: './Login/login.module#LoginModule' },
    { path: 'login/:systemid', loadChildren: './Login/login.module#LoginModule' },
    { path: 'login/:redirected', loadChildren: './Login/login.module#LoginModule' },
    { path: 'signup', loadChildren: './SignUp/signup.module#SignupModule' },
    { path: 'atpar', loadChildren: './Home/home.module#HomeModule' },
    { path: 'forgot-password', loadChildren: './ForgotPassword/forgot.module#ForgotModule' },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'trackitlogin', loadChildren: './trackitlogin/trackit.login.module#TrackitLoginModule' },
    { path: 'trackitdashboard', loadChildren: './TrackITDashboard/trackit.dashboard.module#TrackitDashboardModule' },
    { path: 'deliverytracking', loadChildren: './DeliveryTracking/deliver-track-report.module#DeliveryTrackingModule' },
    { path: '**', redirectTo: 'pagenotfound', pathMatch: 'full' }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(exports.routes)],
            exports: [router_1.RouterModule],
            providers: [
                {
                    provide: router_1.UrlSerializer,
                    useClass: customurlserializer_1.CustomUrlSerializer
                }
            ],
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map