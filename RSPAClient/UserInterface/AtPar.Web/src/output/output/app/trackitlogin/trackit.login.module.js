"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var trackit_login_component_1 = require("./trackit.login.component");
var trackit_login_routes_1 = require("./trackit.login.routes");
var shared_module_1 = require("../Shared/shared.module");
var TrackitLoginModule = (function () {
    function TrackitLoginModule() {
    }
    TrackitLoginModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                trackit_login_routes_1.TrackItLoginRoutingModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                trackit_login_component_1.TrackitLoginComponent,
            ],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
        })
    ], TrackitLoginModule);
    return TrackitLoginModule;
}());
exports.TrackitLoginModule = TrackitLoginModule;
//# sourceMappingURL=trackit.login.module.js.map