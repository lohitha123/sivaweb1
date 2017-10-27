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
var ng2_image_hover_zoom_1 = require("ng2-image-hover-zoom");
var trackit_body_component_1 = require("./trackit.body.component");
var trackit_create_request_component_1 = require("./trackit.create.request.component");
var trackit_request_status_component_1 = require("./trackit.request.status.component");
var trackit_requestor_item_visibility_report_1 = require("./trackit.requestor.item.visibility.report");
var trackit_view_cart_1 = require("./trackit.view.cart");
var trackit_profile_component_1 = require("./trackit.profile.component");
var shared_module_1 = require("../../Shared/shared.module");
var TrackITBodyModule = (function () {
    function TrackITBodyModule() {
    }
    TrackITBodyModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                ng2_image_hover_zoom_1.ImageZoomModule,
                router_1.RouterModule,
                forms_1.FormsModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                trackit_body_component_1.TrackITBodyComponent,
                trackit_create_request_component_1.CreateRequestComponent,
                trackit_request_status_component_1.RequestStatusComponent,
                trackit_requestor_item_visibility_report_1.RequestorItemVisibilityReportComponent,
                trackit_view_cart_1.ViewCartComponent,
                trackit_profile_component_1.TrackITProfileComponent
            ],
            exports: [
                trackit_body_component_1.TrackITBodyComponent,
            ]
        })
    ], TrackITBodyModule);
    return TrackITBodyModule;
}());
exports.TrackITBodyModule = TrackITBodyModule;
//# sourceMappingURL=trackit.body.module.js.map