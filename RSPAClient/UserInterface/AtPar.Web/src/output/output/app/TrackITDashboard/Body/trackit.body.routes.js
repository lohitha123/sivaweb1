"use strict";
/// <reference path="trackit.profile.component.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var trackit_body_component_1 = require("./trackit.body.component");
var trackit_create_request_component_1 = require("./trackit.create.request.component");
var trackit_request_status_component_1 = require("./trackit.request.status.component");
var trackit_requestor_item_visibility_report_1 = require("./trackit.requestor.item.visibility.report");
var trackit_view_cart_1 = require("./trackit.view.cart");
var trackit_profile_component_1 = require("./trackit.profile.component");
exports.BodyRoutes = [
    { path: '', component: trackit_body_component_1.TrackITBodyComponent },
    { path: 'myprofile', component: trackit_profile_component_1.TrackITProfileComponent },
    { path: 'createrequest', component: trackit_create_request_component_1.CreateRequestComponent },
    { path: 'requeststatus', component: trackit_request_status_component_1.RequestStatusComponent },
    { path: 'requestoritemvisibilityreport', component: trackit_requestor_item_visibility_report_1.RequestorItemVisibilityReportComponent },
    { path: 'viewcart', component: trackit_view_cart_1.ViewCartComponent }
];
//# sourceMappingURL=trackit.body.routes.js.map