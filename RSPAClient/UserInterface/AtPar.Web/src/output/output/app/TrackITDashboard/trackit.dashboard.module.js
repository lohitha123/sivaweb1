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
var trackit_body_module_1 = require("./Body/trackit.body.module");
var trackit_dashboard_component_1 = require("./trackit.dashboard.component");
var trackit_dashboard_routing_module_1 = require("./trackit.dashboard.routing.module");
var trackit_topbar_component_1 = require("./Top/trackit.topbar.component");
var shared_module_1 = require("../Shared/shared.module");
var atpar_page_not_found_component_1 = require("../AtPar/atpar-page-not-found.component");
var TrackitDashboardModule = (function () {
    function TrackitDashboardModule() {
    }
    TrackitDashboardModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                shared_module_1.SharedModule,
                trackit_body_module_1.TrackITBodyModule,
                trackit_dashboard_routing_module_1.TrackITDashboardRoutingModule,
            ],
            declarations: [
                trackit_dashboard_component_1.TrackITDashboardComponent,
                trackit_topbar_component_1.TrackITTopBarComponent,
                atpar_page_not_found_component_1.SameUrlComponent
            ],
            exports: [
                trackit_dashboard_component_1.TrackITDashboardComponent,
                trackit_topbar_component_1.TrackITTopBarComponent,
            ],
        })
    ], TrackitDashboardModule);
    return TrackitDashboardModule;
}());
exports.TrackitDashboardModule = TrackitDashboardModule;
//# sourceMappingURL=trackit.dashboard.module.js.map