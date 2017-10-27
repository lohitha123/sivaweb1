"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
//import { RippleDirective } from 'ng2-ripple-directive';
var body_module_1 = require("./Tkit-Body/body.module");
var Tkit_home_component_1 = require("./Tkit-home.component");
var home_module_1 = require("../Home/home.module");
//import { DialogModule } from '../components/dialog/dialog';
var topbar_component_1 = require("./Tkit-Top/topbar.component");
var TkitHomeModule = (function () {
    function TkitHomeModule() {
    }
    return TkitHomeModule;
}());
TkitHomeModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            body_module_1.BodyModule,
            router_1.RouterModule,
            home_module_1.HomeModule,
        ],
        declarations: [
            Tkit_home_component_1.TkitHomeComponent,
            topbar_component_1.TopBarComponent,
        ],
        exports: [
            Tkit_home_component_1.TkitHomeComponent,
            topbar_component_1.TopBarComponent
        ]
    })
], TkitHomeModule);
exports.TkitHomeModule = TkitHomeModule;
//# sourceMappingURL=Tkit-home.module.js.map