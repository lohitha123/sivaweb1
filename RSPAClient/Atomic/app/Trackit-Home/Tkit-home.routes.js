"use strict";
var Tkit_home_component_1 = require("./Tkit-home.component");
var body_routes_1 = require("./Tkit-Body/body.routes");
var forgot_component_1 = require("../forgotpassword/forgot.component");
var tkit_allocate_location_groups_component_1 = require("../TrackIT/tkit-allocate-location-groups.component");
var tkit_manage_departments_component_1 = require("../TrackIT/tkit-manage-departments.component");
var tkit_charge_report_component_1 = require("../TrackIT/tkit-charge-report.component");
var tkit_check_in_component_1 = require("../TrackIT/tkit-check-in.component");
var tkit_check_out_component_1 = require("../TrackIT/tkit-check-out.component");
var tkit_daily_activity_component_1 = require("../TrackIT/tkit-daily-activity.component");
var tkit_daily_user_activity_component_1 = require("../TrackIT/tkit-daily-user-activity.component");
var tkit_delivery_report_component_1 = require("../TrackIT/tkit-delivery-report.component");
var tkit_destruction_report_component_1 = require("../TrackIT/tkit-destruction-report.component");
var tkit_equipment_tracking_report_component_1 = require("../TrackIT/tkit-equipment-tracking-report.component");
var tkit_inactivate_items_component_1 = require("../TrackIT/tkit-inactivate-items.component");
var tkit_item_master_report_component_1 = require("../TrackIT/tkit-item-master-report.component");
var tkit_manage_equipment_items_component_1 = require("../TrackIT/tkit-manage-equipment-items.component");
var tkit_manage_equipment_type_component_1 = require("../TrackIT/tkit-manage-equipment-type.component");
var tkit_manage_requestor_component_1 = require("../TrackIT/tkit-manage-requestor.component");
var tkit_newitem_audit_report_component_1 = require("../TrackIT/tkit-newitem-audit-report.component");
var tkit_setup_reason_codes_component_1 = require("../TrackIT/tkit-setup-reason-codes.component");
var tkit_transaction_report_component_1 = require("../TrackIT/tkit-transaction-report.component");
var tkit_create_request_component_1 = require("../TrackIT/tkit-create-request.component");
var tkit_view_cart_component_1 = require("../TrackIT/tkit-view-cart.component");
var tkit_user_profile_component_1 = require("../TrackIT/tkit-user-profile.component");
var tkit_requestor_status_component_1 = require("../TrackIT/tkit-requestor-status.component");
var tkit_dashboard_component_1 = require("../TrackIT/tkit-dashboard.component");
exports.TkitHomeRoutes = [
    {
        path: 'trackithome', component: Tkit_home_component_1.TkitHomeComponent,
        children: body_routes_1.BodyRoutes.concat([
            { path: 'AtPar', loadChildren: 'app/Init/atpar-init.module#AtparInitModule' },
            { path: 'forgot-password', component: forgot_component_1.ForgotComponent },
            { path: 'allocatelocationgroups', component: tkit_allocate_location_groups_component_1.AllocateLocationGroupsComponent },
            { path: 'managedepartments', component: tkit_manage_departments_component_1.ManageDepartmentsComponent },
            { path: 'chargereport', component: tkit_charge_report_component_1.ChargeReportComponent },
            { path: 'checkinitems', component: tkit_check_in_component_1.CheckInComponent },
            { path: 'checkoutitems', component: tkit_check_out_component_1.CheckOutComponent },
            { path: 'dailyactivity', component: tkit_daily_activity_component_1.DailyActivityComponent },
            { path: 'dailyuseractivity', component: tkit_daily_user_activity_component_1.DailyUserActivityComponent },
            { path: 'deliveryaeport', component: tkit_delivery_report_component_1.DeliveryReportComponent },
            { path: 'destructionreport', component: tkit_destruction_report_component_1.DestructionReportComponent },
            { path: 'equipmenttrackingreport', component: tkit_equipment_tracking_report_component_1.EquipmentTrackingReportComponent },
            { path: 'inactivateitems', component: tkit_inactivate_items_component_1.InactivateItemsComponent },
            { path: 'itemmasterreport', component: tkit_item_master_report_component_1.ItemMasterReportComponent },
            { path: 'manageequipmentitems', component: tkit_manage_equipment_items_component_1.ManageEquipmentItemsComponent },
            { path: 'manageequipmenttype', component: tkit_manage_equipment_type_component_1.ManageEquipmentTypeComponent },
            { path: 'managerequestor', component: tkit_manage_requestor_component_1.ManageRequestorComponent },
            { path: 'newitemauditreport', component: tkit_newitem_audit_report_component_1.NewItemAuditReportComponent },
            { path: 'setupreasoncodes', component: tkit_setup_reason_codes_component_1.SetupReasonCodesComponent },
            { path: 'transactionreport', component: tkit_transaction_report_component_1.TransactionReportComponent },
            { path: 'createrequest', component: tkit_create_request_component_1.CreateRequestComponent },
            { path: 'viewcart', component: tkit_view_cart_component_1.ViewCartComponent },
            { path: 'userprofile', component: tkit_user_profile_component_1.UserprofileComponent },
            { path: 'requestorstatus', component: tkit_requestor_status_component_1.RequestorstatusComponent },
            { path: 'dashboard', component: tkit_dashboard_component_1.DashComponent },
        ])
    }
];
//# sourceMappingURL=Tkit-home.routes.js.map