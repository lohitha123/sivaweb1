"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var trackit_component_1 = require("./trackit.component");
var tkit_allocate_location_groups_component_1 = require("./tkit-allocate-location-groups.component");
var tkit_charge_report_component_1 = require("./tkit-charge-report.component");
var tkit_check_in_check_out_component_1 = require("./tkit-check-in_check-out.component");
var tkit_check_out_component_1 = require("./tkit-check-out.component");
var tkit_daily_activity_component_1 = require("./tkit-daily-activity.component");
var tkit_daily_user_activity_component_1 = require("./tkit-daily-user-activity.component");
var tkit_delivery_report_component_1 = require("./tkit-delivery-report.component");
var tkit_destruction_report_component_1 = require("./tkit-destruction-report.component");
var tkit_equipment_tracking_report_component_1 = require("./tkit-equipment-tracking-report.component");
var tkit_inactivate_items_component_1 = require("./tkit-inactivate-items.component");
var tkit_item_master_report_component_1 = require("./tkit-item-master-report.component");
var tkit_manage_departments_component_1 = require("./tkit-manage-departments.component");
var tkit_manage_equipment_items_component_1 = require("./tkit-manage-equipment-items.component");
var tkit_manage_equipment_type_component_1 = require("./tkit-manage-equipment-type.component");
var tkit_manage_requestor_home_component_1 = require("./tkit-manage-requestor-home.component");
var tkit_manage_requestor_modify_component_1 = require("./tkit-manage-requestor-modify.component");
var tkit_manage_requestor_component_1 = require("./tkit-manage-requestor.component");
var tkit_newitem_audit_report_component_1 = require("./tkit-newitem-audit-report.component");
var tkit_setup_reason_codes_component_1 = require("./tkit-setup-reason-codes.component");
var tkit_transaction_report_component_1 = require("./tkit-transaction-report.component");
exports.routes = [
    {
        path: '',
        component: trackit_component_1.TrackITComponent,
        children: [
            { path: 'allocatelocationgroups', component: tkit_allocate_location_groups_component_1.AllocateLocationGroupsComponent },
            { path: 'chargereport', component: tkit_charge_report_component_1.ChargeReportComponent },
            { path: 'checkinitems', component: tkit_check_in_check_out_component_1.CheckIn_CheckOutComponent },
            { path: 'checkoutitems', component: tkit_check_out_component_1.CheckOutComponent },
            { path: 'dailyactivity', component: tkit_daily_activity_component_1.DailyActivityComponent },
            { path: 'dailyuseractivity', component: tkit_daily_user_activity_component_1.DailyUserActivityComponent },
            { path: 'deliveryreport', component: tkit_delivery_report_component_1.DeliveryReportComponent },
            { path: 'destructionreport', component: tkit_destruction_report_component_1.DestructionReportComponent },
            { path: 'equipmenttrackingreport', component: tkit_equipment_tracking_report_component_1.EquipmentTrackingReportComponent },
            { path: 'inactivateitems', component: tkit_inactivate_items_component_1.InactivateItemsComponent },
            { path: 'itemmasterreport', component: tkit_item_master_report_component_1.ItemMasterReportComponent },
            { path: 'managedepartments', component: tkit_manage_departments_component_1.ManageDepartmentsComponent },
            { path: 'manageequipmentitems', component: tkit_manage_equipment_items_component_1.ManageEquipmentItemsComponent },
            { path: 'manageequipmenttype', component: tkit_manage_equipment_type_component_1.ManageEquipmentTypeComponent },
            {
                path: 'managerequestor', component: tkit_manage_requestor_component_1.ManageRequestorComponent,
                children: [
                    { path: '', component: tkit_manage_requestor_home_component_1.ManageRequestorHomeComponent },
                    { path: 'addormodify', component: tkit_manage_requestor_modify_component_1.ManageRequestorModifyComponent }
                ]
            },
            { path: 'newitemauditreport', component: tkit_newitem_audit_report_component_1.NewItemAuditReportComponent },
            { path: 'setupreasoncodes', component: tkit_setup_reason_codes_component_1.SetupReasonCodesComponent },
            { path: 'transactionreport', component: tkit_transaction_report_component_1.TransactionReportComponent },
        ]
    }
];
var TrackITRoutingModule = (function () {
    function TrackITRoutingModule() {
    }
    TrackITRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(exports.routes)],
            exports: [router_1.RouterModule]
        })
    ], TrackITRoutingModule);
    return TrackITRoutingModule;
}());
exports.TrackITRoutingModule = TrackITRoutingModule;
//# sourceMappingURL=trackit-routing.module.js.map