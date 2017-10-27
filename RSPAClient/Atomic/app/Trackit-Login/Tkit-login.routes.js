"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var index_1 = require("./index");
exports.routes = [
    {
        path: '',
        component: index_1.TkitLoginComponent,
    }
];
var TkitLoginRoutingModule = (function () {
    function TkitLoginRoutingModule() {
    }
    return TkitLoginRoutingModule;
}());
TkitLoginRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(exports.routes)],
        exports: [router_1.RouterModule]
    })
], TkitLoginRoutingModule);
exports.TkitLoginRoutingModule = TkitLoginRoutingModule;
//# sourceMappingURL=Tkit-login.routes.js.map