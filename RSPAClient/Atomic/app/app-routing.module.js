"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var home_routes_1 = require("./Home/home.routes");
var Tkit_home_routes_1 = require("./Trackit-Home/Tkit-home.routes");
var router_2 = require("@angular/router");
var LowerCaseUrlSerializer = (function (_super) {
    __extends(LowerCaseUrlSerializer, _super);
    function LowerCaseUrlSerializer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LowerCaseUrlSerializer.prototype.parse = function (url) {
        return _super.prototype.parse.call(this, url.toLowerCase());
    };
    return LowerCaseUrlSerializer;
}(router_2.DefaultUrlSerializer));
exports.LowerCaseUrlSerializer = LowerCaseUrlSerializer;
exports.routes = [
    { path: 'login', loadChildren: 'app/Login/login.module#LoginModule' },
    { path: 'trackitlogin', loadChildren: 'app/Trackit-login/Tkit-login.module#TkitLoginModule' },
    { path: 'forgot-password', loadChildren: 'app/ForgotPassword/forgot.module#ForgotModule' }
].concat(home_routes_1.HomeRoutes, Tkit_home_routes_1.TkitHomeRoutes, [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'logn', pathMatch: 'full' }
]);
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(exports.routes)],
        exports: [router_1.RouterModule],
        providers: [
            {
                provide: router_1.UrlSerializer,
                useClass: LowerCaseUrlSerializer
            }
        ],
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map