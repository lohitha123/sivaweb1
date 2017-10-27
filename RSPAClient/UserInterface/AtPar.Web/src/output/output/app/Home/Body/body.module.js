"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var body_component_1 = require("./body.component");
var atpar_profile_component_1 = require("../../AtPar/atpar-profile.component");
var atpar_downloads_component_1 = require("../../AtPar/atpar-downloads.component");
var atpar_init_module_1 = require("../../Init/atpar-init.module");
var pointofuse_module_1 = require("../../PointOfUse/pointofuse.module");
var shared_module_1 = require("../../Shared/shared.module");
var BodyModule = (function () {
    function BodyModule() {
    }
    BodyModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule,
                atpar_init_module_1.AtparInitModule,
                pointofuse_module_1.PointOfUseModule,
                forms_1.FormsModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                body_component_1.BodyComponent,
                atpar_profile_component_1.AtparProfile,
                atpar_downloads_component_1.AtparDownloads
            ],
            exports: [
                body_component_1.BodyComponent,
            ]
        })
    ], BodyModule);
    return BodyModule;
}());
exports.BodyModule = BodyModule;
//# sourceMappingURL=body.module.js.map