"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
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
exports.routes = [
    {
        path: '',
        component: cyclecount_component_1.CycleCountComponent,
        children: [
            { path: 'activityreport', component: cyct_activity_report_component_1.ActivityReportComponent },
            { path: 'allocateevents', component: cyct_allocate_events_component_1.AllocateEventsComponent },
            { path: 'allocateibusmanualcounts', component: cyct_allocate_ibus_maunal_counts_component_1.AllocateIBUsManualCountsComponent },
            { path: 'dailyactivity', component: cyct_daily_activity_component_1.DailyActivityComponent },
            { path: 'dailyuseractivity', component: cyct_daily_user_activity_component_1.DailyUserActivityComponent },
            { path: 'eventsummaryreport', component: cyct_event_summary_report_component_1.EventSummaryReportComponent },
            { path: 'itemexceptionreport', component: cyct_item_exception_report_component_1.ItemExceptionReportComponent },
            { path: 'processcounts', component: cyct_process_counts_component_1.ProcessCountsComponent },
            { path: 'reviewcounts', component: cyct_review_counts_components_1.ReviewCountsComponent },
            { path: 'splitevents', component: cyct_split_events_component_1.SplitEventsComponent },
            { path: 'userparameters', component: cyct_user_parameters_component_1.UserParametersComponent },
        ]
    }
];
var CycleCountRoutingModule = (function () {
    function CycleCountRoutingModule() {
    }
    return CycleCountRoutingModule;
}());
CycleCountRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(exports.routes)],
        exports: [router_1.RouterModule]
    })
], CycleCountRoutingModule);
exports.CycleCountRoutingModule = CycleCountRoutingModule;
//# sourceMappingURL=cyclecount-routing.module.js.map