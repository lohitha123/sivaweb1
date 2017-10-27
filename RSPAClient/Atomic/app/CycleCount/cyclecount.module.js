"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var cyclecount_component_1 = require("./cyclecount.component");
var cyct_activity_report_component_1 = require("./cyct-activity-report.component");
var cyct_allocate_events_component_1 = require("./cyct-allocate-events.component");
var cyct_allocate_ibus_maunal_counts_component_1 = require("./cyct-allocate-ibus-maunal-counts.component");
var cyct_daily_activity_component_1 = require("./cyct-daily-activity.component");
var cyct_daily_user_activity_component_1 = require("./cyct-daily-user-activity.component");
var cyct_event_summary_report_component_1 = require("./cyct-event-summary-report.component");
var cyct_item_exception_report_component_1 = require("./cyct-item-exception-report.component");
var cyct_process_counts_component_1 = require("./cyct-process-counts.component");
var cyct_review_counts_components_1 = require("./cyct-review-counts.components");
var cyct_split_events_component_1 = require("./cyct-split-events.component");
var cyct_user_parameters_component_1 = require("./cyct-user-parameters.component");
var cyclecount_routing_module_1 = require("./cyclecount-routing.module");
var shared_module_1 = require("../shared/shared.module");
var CycleCountModule = (function () {
    function CycleCountModule() {
    }
    return CycleCountModule;
}());
CycleCountModule = __decorate([
    core_1.NgModule({
        imports: [
            cyclecount_routing_module_1.CycleCountRoutingModule,
            shared_module_1.SharedModule
        ],
        declarations: [
            cyclecount_component_1.CycleCountComponent,
            cyct_activity_report_component_1.ActivityReportComponent,
            cyct_allocate_events_component_1.AllocateEventsComponent,
            cyct_allocate_ibus_maunal_counts_component_1.AllocateIBUsManualCountsComponent,
            cyct_daily_activity_component_1.DailyActivityComponent,
            cyct_daily_user_activity_component_1.DailyUserActivityComponent,
            cyct_event_summary_report_component_1.EventSummaryReportComponent,
            cyct_item_exception_report_component_1.ItemExceptionReportComponent,
            cyct_process_counts_component_1.ProcessCountsComponent,
            cyct_review_counts_components_1.ReviewCountsComponent,
            cyct_split_events_component_1.SplitEventsComponent,
            cyct_user_parameters_component_1.UserParametersComponent
        ]
    })
], CycleCountModule);
exports.CycleCountModule = CycleCountModule;
//# sourceMappingURL=cyclecount.module.js.map