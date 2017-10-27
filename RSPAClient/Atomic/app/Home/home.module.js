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
//import { MdInputModule, MdNativeDateModule} from '@angular/material/typings';
//import { RippleDirective } from 'ng2-ripple-directive';
var body_module_1 = require("./Body/body.module");
var home_component_1 = require("./home.component");
var modal_1 = require("../components/modal/modal");
var dialog_1 = require("../components/dialog/dialog");
var topbar_component_1 = require("./Top/topbar.component");
var forgot_component_1 = require("../forgotpassword/forgot.component");
var tabs_1 = require("../components/tabcomponent/tabs");
var tab_1 = require("../components/tabcomponent/tab");
var switch_1 = require("../components/switch/switch");
var confirmdialog_1 = require("../components/confirmdialog/confirmdialog");
var dropdown_1 = require("../components/dropdown/dropdown");
var dropdownp_1 = require("../components/dropdownp/dropdownp");
var radiobutton_1 = require("../components/radiobutton/radiobutton");
var datatable_1 = require("../components/datatable/datatable");
var tooltip_1 = require("../components/tooltip/tooltip");
var growl_1 = require("../components/growl/growl");
var accordion_1 = require("../components/accordion/accordion");
var inputswitch_1 = require("../components/inputswitch/inputswitch");
var calendar_1 = require("../components/calendar/calendar");
var doublecalendar_1 = require("../components/doublecalendar/doublecalendar");
var autocomplete_client_1 = require("../components/autocomplete/autocomplete-client/autocomplete-client");
var atpartext_1 = require("../components/atpartext/atpartext");
var atpar_configuration_manager_component_1 = require("../Init/atpar-configuration-manager.component");
var atpar_setup_vendors_component_1 = require("../Init/atpar-setup-vendors.component");
var atpar_setup_items_component_1 = require("../Init/atpar-setup-items.component");
var atpar_setup_cost_centers_component_1 = require("../Init/atpar-setup-cost-centers.component");
var atpar_manage_profiles_component_1 = require("../Init/atpar-manage-profiles.component");
var atpar_manage_org_groups_component_1 = require("../Init/atpar-manage-org-groups.component");
var atpar_add_user_component_1 = require("../Init/atpar-add-user.component");
var atpar_assign_profiles_component_1 = require("../Init/atpar-assign-profiles.component");
var atpar_security_configuration_component_1 = require("../Init/atpar-security-configuration.component");
var atpar_setup_inventory_component_1 = require("../Init/atpar-setup-inventory.component");
var atpar_audit_setup_component_1 = require("../Init/atpar-audit-setup.component");
var atpar_manage_tokens_component_1 = require("../Init/atpar-manage-tokens.component");
var atpar_manage_users_component_1 = require("../Init/atpar-manage-users.component");
var atpar_org_parameters_component_1 = require("../Init/atpar-org-parameters.component");
var atpar_import_users_component_1 = require("../Init/atpar-import-users.component");
var atpar_maintain_printers_component_1 = require("../Init/atpar-maintain-printers.component");
var atpar_manage_devices_component_1 = require("../Init/atpar-manage-devices.component");
var atpar_stationary_print_design_component_1 = require("../Init/atpar-stationary-print-design.component");
var atpar_setup_locations_component_1 = require("../Init/atpar-setup-locations.component");
var atpar_setup_storage_location_groups_component_1 = require("../Init/atpar-setup-storage-location-groups.component");
var atpar_setup_location_groups_component_1 = require("../Init/atpar-setup-location-groups.component");
var atpar_change_password_component_1 = require("../Init/atpar-change-password.component");
var atpar_user_upload_automation_component_1 = require("../Init/atpar-user-upload-automation.component");
var atpar_process_scheduler_component_1 = require("../Init/atpar-process-scheduler.component");
var atpar_data_archival_component_1 = require("../Init/atpar-data-archival.component");
var atpar_user_status_report_component_1 = require("../Init/atpar-user-status-report.component");
var cart_user_parameters_component_1 = require("../CartCount/cart-user-parameters.component");
var cart_allocate_carts_component_1 = require("../CartCount/cart-allocate-carts.component");
var cart_critical_items_component_1 = require("../CartCount/cart-critical-items.component");
var cart_process_parameters_component_1 = require("../CartCount/cart-process-parameters.component");
var cart_create_orders_component_1 = require("../CartCount/cart-create-orders.component");
var cart_2bin_setup_component_1 = require("../CartCount/cart-2bin-setup.component");
var stis_allocate_distribution_types_component_1 = require("../StockIssue/stis-allocate-distribution-types.component");
var recv_carrier_information_component_1 = require("../Receiving/recv-carrier-information.component");
var recv_release_orders_component_1 = require("../Receiving/recv-release-orders.component");
var recv_allocate_inventory_business_units_component_1 = require("../Receiving/recv-allocate-inventory-business-units.component");
var recv_allocate_shiptoids_component_1 = require("../Receiving/recv-allocate-shiptoids.component");
var recv_manage_carriers_component_1 = require("../Receiving/recv-manage-carriers.component");
var recv_setup_shiptoids_component_1 = require("../Receiving/recv-setup-shiptoids.component");
var recv_po_nonpo_receipts_component_1 = require("../Receiving/recv-po-nonpo-receipts.component");
var ptwy_allocate_business_units_component_1 = require("../Putaway/ptwy-allocate-business-units.component");
var ptwy_release_orders_component_1 = require("../Putaway/ptwy-release-orders.component");
var asmt_location_groups_allocation_component_1 = require("../AssetManagement/asmt-location-groups-allocation.component");
var asmt_access_permission_component_1 = require("../AssetManagement/asmt-access-permission.component");
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
var tkit_help_component_1 = require("../TrackIT/tkit-help.component");
var tkit_dashboard_component_1 = require("../TrackIT/tkit-dashboard.component");
var pou_department_device_allocation_component_1 = require("../PointOfUse/pou-department-device-allocation.component");
var pou_setup_item_attributes_component_1 = require("../PointOfUse/pou-setup-item-attributes.component");
var pou_setup_physicians_component_1 = require("../PointOfUse/pou-setup-physicians.component");
var pou_setup_procedures_component_1 = require("../PointOfUse/pou-setup-procedures.component");
var pou_setup_reasons_component_1 = require("../PointOfUse/pou-setup-reasons.component");
var pou_setup_specialty_services_component_1 = require("../PointOfUse/pou-setup-specialty-services.component");
var pou_department_user_allocation_component_1 = require("../PointOfUse/pou-department-user-allocation.component");
var pou_department_loaction_allocation_component_1 = require("../PointOfUse/pou-department-loaction-allocation.component");
var pou_setup_departments_component_1 = require("../PointOfUse/pou-setup-departments.component");
var pou_process_parameters_component_1 = require("../PointOfUse/pou-process-parameters.component");
var pou_create_orders_component_1 = require("../PointOfUse/pou-create-orders.component");
var pou_setup_par_locations_component_1 = require("../PointOfUse/pou-setup-par-locations.component");
var pou_manage_par_location_component_1 = require("../PointOfUse/pou-manage-par-location.component");
var pou_department_location_workstation_allocation_component_1 = require("../PointOfUse/pou-department-location-workstation-allocation.component");
var pou_release_cases_component_1 = require("../PointOfUse/pou-release-cases.component");
var pou_review_charges_credits_component_1 = require("../PointOfUse/pou-review-charges-credits.component");
var pou_manage_cases_component_1 = require("../PointOfUse/pou-manage-cases.component");
var pou_manage_orders_component_1 = require("../PointOfUse/pou-manage-orders.component");
var pou_maintain_non_cart_items_component_1 = require("../PointOfUse/pou-maintain-non-cart-items.component");
var pou_critical_items_component_1 = require("../PointOfUse/pou-critical-items.component");
var pou_setup_case_component_1 = require("../PointOfUse/pou-setup-case.component");
var pou_bill_only_item_maintenance_component_1 = require("../PointOfUse/pou-bill-only-item-maintenance.component");
var pou_preference_lists_component_1 = require("../PointOfUse/pou-preference-lists.component");
var pou_manage_cosigned_item_order_report_componenet_1 = require("../PointOfUse/pou-manage-cosigned-item-order-report.componenet");
var pou_par_optimization_report_component_1 = require("../PointOfUse/pou-par-optimization-report.component");
var cyct_allocate_events_component_1 = require("../CycleCount/cyct-allocate-events.component");
var cyct_split_events_component_1 = require("../CycleCount/cyct-split-events.component");
var cyct_process_counts_component_1 = require("../CycleCount/cyct-process-counts.component");
var cyct_review_counts_components_1 = require("../CycleCount/cyct-review-counts.components");
var deliver_assign_signatories_component_1 = require("../Deliver/deliver-assign-signatories.component");
var deliver_release_packages_component_1 = require("../Deliver/deliver-release-packages.component");
var deliver_setup_drop_off_locations_component_1 = require("../Deliver/deliver-setup-drop-off-locations.component");
var deliver_shiptoid_allocation_for_delivery_of_stock_items_component_1 = require("../Deliver/deliver-shiptoid-allocation-for-delivery-of-stock-items.component");
var pick_allocate_picking_zones_component_1 = require("../Pick/pick-allocate-picking-zones.component");
var pick_order_prefix_component_1 = require("../Pick/pick-order-prefix.component");
var pick_allocate_priority_component_1 = require("../Pick/pick-allocate-priority.component");
var pick_allocate_inventory_business_units_componet_1 = require("../Pick/pick-allocate-inventory-business-units.componet");
var pick_release_orders_component_1 = require("../Pick/pick-release-orders.component");
var pick_allocate_location_groups_component_1 = require("../Pick/pick-allocate-location-groups.component");
var HomeModule = (function () {
    function HomeModule() {
    }
    return HomeModule;
}());
HomeModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            body_module_1.BodyModule,
            router_1.RouterModule,
            switch_1.SwitchModule,
            dialog_1.DialogModule,
            confirmdialog_1.ConfirmDialogModule,
            dropdown_1.DropdownModule,
            dropdownp_1.DropdownpModule,
            radiobutton_1.RadioButtonModule,
            datatable_1.AtParDataTableModule,
            tooltip_1.TooltipModule,
            growl_1.GrowlModule,
            calendar_1.CalendarModule,
            doublecalendar_1.DoubleCalendarModule,
            autocomplete_client_1.AutoCompleteClientModule,
            inputswitch_1.InputSwitchModule,
            accordion_1.AccordionModule,
            forms_1.ReactiveFormsModule,
        ],
        declarations: [
            home_component_1.HomeComponent,
            modal_1.ModalComponent,
            topbar_component_1.TopBarComponent,
            tkit_allocate_location_groups_component_1.AllocateLocationGroupsComponent,
            tkit_manage_departments_component_1.ManageDepartmentsComponent,
            atpartext_1.AtParTextComponent,
            atpar_configuration_manager_component_1.ConfigurationManagerComponent,
            atpar_setup_vendors_component_1.SetupVendorsComponent,
            atpar_setup_cost_centers_component_1.SetupcostComponent,
            atpar_setup_items_component_1.SetupItemsComponent,
            atpar_manage_profiles_component_1.ManageProfilesComponent,
            atpar_manage_org_groups_component_1.ManageOrgGroupsComponent,
            atpar_add_user_component_1.AddUserComponent,
            atpar_assign_profiles_component_1.AssignProfilesComponent,
            atpar_security_configuration_component_1.SecurityConfigurationComponent,
            atpar_setup_inventory_component_1.SetupInventoryComponent,
            atpar_audit_setup_component_1.AuditSetupComponent,
            atpar_manage_tokens_component_1.ManageTokensComponent,
            atpar_manage_users_component_1.ManageUsersComponent,
            atpar_org_parameters_component_1.OrgParametersComponent,
            atpar_import_users_component_1.ImportUsersComponent,
            atpar_maintain_printers_component_1.MaintainPrintersComponent,
            atpar_manage_devices_component_1.ManageDevicesComponent,
            atpar_stationary_print_design_component_1.StationaryPrintDesignComponent,
            cart_user_parameters_component_1.UserParametersComponent,
            cart_allocate_carts_component_1.AllocateCartsComponent,
            cart_critical_items_component_1.CriticalItemsComponent,
            cart_process_parameters_component_1.ProcessParametersComponent,
            cart_create_orders_component_1.CreateOrdersComponent,
            recv_carrier_information_component_1.CarrierInformationComponent,
            recv_release_orders_component_1.ReleaseOrdersComponent,
            recv_allocate_inventory_business_units_component_1.AllocateInventoryBusinessUnitsComponent,
            stis_allocate_distribution_types_component_1.AllocateDistributionTypesComponent,
            atpar_setup_locations_component_1.SetupLocationsComponent,
            atpar_setup_storage_location_groups_component_1.SetupStorageLocationGroups,
            atpar_setup_location_groups_component_1.SetupLocationGroupsComponent,
            ptwy_allocate_business_units_component_1.AllocateBusinessUnitsComponent,
            ptwy_release_orders_component_1.PtyReleaseOrdersComponent,
            asmt_location_groups_allocation_component_1.LocationGroupsAllocationComponent,
            asmt_access_permission_component_1.AccessPermissionComponent,
            atpar_change_password_component_1.ChangePasswordComponent,
            recv_allocate_shiptoids_component_1.AllocateShipToIdsComponent,
            recv_manage_carriers_component_1.ManageCarriersComponent,
            atpar_user_upload_automation_component_1.UserUploadAutomationComponent,
            atpar_process_scheduler_component_1.ProcessScheduler,
            atpar_data_archival_component_1.DataArchival,
            pou_setup_item_attributes_component_1.SetupItemAttributesComponent,
            pou_setup_physicians_component_1.SetupPhysiciansComponent,
            pou_setup_reasons_component_1.SetupReasonsComponent,
            pou_department_device_allocation_component_1.DepartmentDeviceAllocationComponent,
            pou_setup_procedures_component_1.SetupProceduresComponent,
            pou_setup_specialty_services_component_1.SetupSpecialtyServiceComponent,
            cyct_allocate_events_component_1.AllocateEventsComponent,
            cyct_split_events_component_1.SplitEventsComponent,
            recv_setup_shiptoids_component_1.SetupShipToIdsComponent,
            pou_department_user_allocation_component_1.DepartmentUserAllocationComponent,
            pou_department_loaction_allocation_component_1.DepartmentLocationAllocationComponent,
            pou_setup_departments_component_1.SetupDepartmentsComponent,
            pou_process_parameters_component_1.ProcessParamsComponent,
            pou_create_orders_component_1.POUCreateOrdersComponent,
            pou_setup_par_locations_component_1.SetupParLocationsComponent,
            pou_manage_par_location_component_1.ManageParLocationComponent,
            atpar_user_status_report_component_1.UserStatusReportComponent,
            pou_department_location_workstation_allocation_component_1.DepartmentLocationWorkstationAllocationComponent,
            cart_2bin_setup_component_1.ToBinSetup,
            deliver_assign_signatories_component_1.AssignSignatoriesComponent,
            deliver_shiptoid_allocation_for_delivery_of_stock_items_component_1.ShipToIdAllocationForDeliveryOfStockItemsComponent,
            deliver_setup_drop_off_locations_component_1.SetupDropOffLoactionsComponent,
            deliver_release_packages_component_1.ReleasePackagesComponent,
            pou_release_cases_component_1.ReleaseCasesComponent,
            pou_review_charges_credits_component_1.ReviewChargesCreditsComponent,
            pou_manage_cases_component_1.ManageCasesComponent,
            pou_manage_orders_component_1.ManageOrdersComponent,
            pou_maintain_non_cart_items_component_1.MaintainNonCartItemsComponent,
            forgot_component_1.ForgotComponent,
            pick_allocate_picking_zones_component_1.AllocatePickingZonesComponent,
            pick_order_prefix_component_1.OrderPrefixComponent,
            pick_allocate_inventory_business_units_componet_1.PickAllocateInventoryBusinessUnitsComponent,
            pick_allocate_priority_component_1.AllocatePriorityComponent,
            pick_release_orders_component_1.PickReleaseOrdersComponent,
            pick_allocate_location_groups_component_1.PickAllocateLocationGroupsComponent,
            cyct_process_counts_component_1.ProcessCountsComponent,
            pou_critical_items_component_1.POUCriticalItemsComponent,
            pou_setup_case_component_1.SetupCaseComponent,
            pou_bill_only_item_maintenance_component_1.BillOnlyItemMaintenanceComponent,
            pou_preference_lists_component_1.PreferenceListsComponent,
            pou_manage_cosigned_item_order_report_componenet_1.ManageConsignedItemOrderReportComponent,
            pou_par_optimization_report_component_1.ParOptimizationReportComponent,
            cyct_review_counts_components_1.ReviewCountsComponent,
            recv_po_nonpo_receipts_component_1.PoNonPoReceiptsComponent,
            tkit_charge_report_component_1.ChargeReportComponent,
            tkit_check_in_component_1.CheckInComponent,
            tkit_check_out_component_1.CheckOutComponent,
            tkit_daily_activity_component_1.DailyActivityComponent,
            tkit_daily_user_activity_component_1.DailyUserActivityComponent,
            tkit_delivery_report_component_1.DeliveryReportComponent,
            tkit_destruction_report_component_1.DestructionReportComponent,
            tkit_equipment_tracking_report_component_1.EquipmentTrackingReportComponent,
            tkit_inactivate_items_component_1.InactivateItemsComponent,
            tkit_item_master_report_component_1.ItemMasterReportComponent,
            tkit_manage_equipment_items_component_1.ManageEquipmentItemsComponent,
            tkit_manage_equipment_type_component_1.ManageEquipmentTypeComponent,
            tkit_manage_requestor_component_1.ManageRequestorComponent,
            tkit_newitem_audit_report_component_1.NewItemAuditReportComponent,
            tkit_setup_reason_codes_component_1.SetupReasonCodesComponent,
            tkit_transaction_report_component_1.TransactionReportComponent,
            tkit_create_request_component_1.CreateRequestComponent,
            tkit_view_cart_component_1.ViewCartComponent,
            tkit_user_profile_component_1.UserprofileComponent,
            tkit_requestor_status_component_1.RequestorstatusComponent,
            tkit_help_component_1.HelpComponent,
            tkit_dashboard_component_1.DashComponent,
            tab_1.Tab,
            tabs_1.Tabs
        ],
        exports: [
            home_component_1.HomeComponent,
            topbar_component_1.TopBarComponent,
        ]
    })
], HomeModule);
exports.HomeModule = HomeModule;
//# sourceMappingURL=home.module.js.map