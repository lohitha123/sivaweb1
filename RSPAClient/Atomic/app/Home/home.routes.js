"use strict";
var home_component_1 = require("./home.component");
var body_routes_1 = require("./Body/body.routes");
var forgot_component_1 = require("../forgotpassword/forgot.component");
var atpar_configuration_manager_component_1 = require("../Init/atpar-configuration-manager.component");
var atpar_setup_vendors_component_1 = require("../Init/atpar-setup-vendors.component");
var atpar_setup_cost_centers_component_1 = require("../Init/atpar-setup-cost-centers.component");
var atpar_setup_items_component_1 = require("../Init/atpar-setup-items.component");
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
var recv_release_orders_component_1 = require("../Receiving/recv-release-orders.component");
var recv_allocate_inventory_business_units_component_1 = require("../Receiving/recv-allocate-inventory-business-units.component");
var recv_carrier_information_component_1 = require("../Receiving/recv-carrier-information.component");
var recv_allocate_shiptoids_component_1 = require("../Receiving/recv-allocate-shiptoids.component");
var recv_manage_carriers_component_1 = require("../Receiving/recv-manage-carriers.component");
var recv_setup_shiptoids_component_1 = require("../Receiving/recv-setup-shiptoids.component");
var recv_po_nonpo_receipts_component_1 = require("../Receiving/recv-po-nonpo-receipts.component");
//import { AllocateDestinationLocationsComponent } from '../StockIssue/stis-allocate-destination-locations.component';
var stis_allocate_distribution_types_component_1 = require("../StockIssue/stis-allocate-distribution-types.component");
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
exports.HomeRoutes = [
    {
        path: 'home', component: home_component_1.HomeComponent,
        children: body_routes_1.BodyRoutes.concat([
            { path: 'AtPar', loadChildren: 'app/Init/atpar-init.module#AtparInitModule' },
            { path: 'forgot-password', component: forgot_component_1.ForgotComponent },
            { path: 'ConfigurationManager', component: atpar_configuration_manager_component_1.ConfigurationManagerComponent },
            { path: 'SetUpVendors', component: atpar_setup_vendors_component_1.SetupVendorsComponent },
            { path: 'SetupCostCenters', component: atpar_setup_cost_centers_component_1.SetupcostComponent },
            { path: 'SetupItems', component: atpar_setup_items_component_1.SetupItemsComponent },
            { path: 'ManageProfiles', component: atpar_manage_profiles_component_1.ManageProfilesComponent },
            { path: 'ManageOrgGroups', component: atpar_manage_org_groups_component_1.ManageOrgGroupsComponent },
            { path: 'AddUser', component: atpar_add_user_component_1.AddUserComponent },
            { path: 'AssignProfiles', component: atpar_assign_profiles_component_1.AssignProfilesComponent },
            { path: 'SecurityConfiguration', component: atpar_security_configuration_component_1.SecurityConfigurationComponent },
            { path: 'SetUpInventory', component: atpar_setup_inventory_component_1.SetupInventoryComponent },
            { path: 'AuditSetup', component: atpar_audit_setup_component_1.AuditSetupComponent },
            { path: 'ManageTokens', component: atpar_manage_tokens_component_1.ManageTokensComponent },
            { path: 'ManageUsers', component: atpar_manage_users_component_1.ManageUsersComponent },
            { path: 'OrgParameters', component: atpar_org_parameters_component_1.OrgParametersComponent },
            { path: 'ImportUsers', component: atpar_import_users_component_1.ImportUsersComponent },
            { path: 'Maintainprinter', component: atpar_maintain_printers_component_1.MaintainPrintersComponent },
            { path: 'ManageDevices', component: atpar_manage_devices_component_1.ManageDevicesComponent },
            { path: 'StationaryPrintDesign', component: atpar_stationary_print_design_component_1.StationaryPrintDesignComponent },
            { path: 'UserParameter', component: cart_user_parameters_component_1.UserParametersComponent },
            { path: 'AllocateCart', component: cart_allocate_carts_component_1.AllocateCartsComponent },
            { path: 'CriticalItem', component: cart_critical_items_component_1.CriticalItemsComponent },
            { path: 'ProcessParameter', component: cart_process_parameters_component_1.ProcessParametersComponent },
            { path: 'carrierinformation', component: recv_carrier_information_component_1.CarrierInformationComponent },
            { path: 'releaseorders', component: recv_release_orders_component_1.ReleaseOrdersComponent },
            { path: 'allocateinventorybusinessunits', component: recv_allocate_inventory_business_units_component_1.AllocateInventoryBusinessUnitsComponent },
            // { path: 'allocatedestinationlocations', component: AllocateDestinationLocationsComponent },
            { path: 'allocatedistributiontypes', component: stis_allocate_distribution_types_component_1.AllocateDistributionTypesComponent },
            { path: 'createorders', component: cart_create_orders_component_1.CreateOrdersComponent },
            { path: 'SetupLocations', component: atpar_setup_locations_component_1.SetupLocationsComponent },
            { path: 'SetupStorageLocationGroups', component: atpar_setup_storage_location_groups_component_1.SetupStorageLocationGroups },
            { path: 'SetupLocationGroups', component: atpar_setup_location_groups_component_1.SetupLocationGroupsComponent },
            { path: 'allocatebusinessunits', component: ptwy_allocate_business_units_component_1.AllocateBusinessUnitsComponent },
            { path: 'ptyreleaseorders', component: ptwy_release_orders_component_1.PtyReleaseOrdersComponent },
            { path: 'ChangePassword', component: atpar_change_password_component_1.ChangePasswordComponent },
            { path: 'LocationGroupAllocation', component: asmt_location_groups_allocation_component_1.LocationGroupsAllocationComponent },
            { path: 'AccessPermission', component: asmt_access_permission_component_1.AccessPermissionComponent },
            { path: 'allocateshiptoids', component: recv_allocate_shiptoids_component_1.AllocateShipToIdsComponent },
            { path: 'managecarriers', component: recv_manage_carriers_component_1.ManageCarriersComponent },
            { path: 'UserUploadAutomation', component: atpar_user_upload_automation_component_1.UserUploadAutomationComponent },
            { path: 'ProcessScheduler', component: atpar_process_scheduler_component_1.ProcessScheduler },
            { path: 'DataArchival', component: atpar_data_archival_component_1.DataArchival },
            { path: 'allocatelocationgroups', component: tkit_allocate_location_groups_component_1.AllocateLocationGroupsComponent },
            { path: 'managedepartments', component: tkit_manage_departments_component_1.ManageDepartmentsComponent },
            { path: 'setupitemattributes', component: pou_setup_item_attributes_component_1.SetupItemAttributesComponent },
            { path: 'setupphysicians', component: pou_setup_physicians_component_1.SetupPhysiciansComponent },
            { path: 'setupprocedures', component: pou_setup_procedures_component_1.SetupProceduresComponent },
            { path: 'setupreasons', component: pou_setup_reasons_component_1.SetupReasonsComponent },
            { path: 'setupspecialty/service', component: pou_setup_specialty_services_component_1.SetupSpecialtyServiceComponent },
            { path: 'departmentdeviceallocation', component: pou_department_device_allocation_component_1.DepartmentDeviceAllocationComponent },
            { path: 'allocateevents', component: cyct_allocate_events_component_1.AllocateEventsComponent },
            { path: 'splitevents', component: cyct_split_events_component_1.SplitEventsComponent },
            { path: 'setupshiptoids', component: recv_setup_shiptoids_component_1.SetupShipToIdsComponent },
            { path: 'departmentlocationallocation', component: pou_department_loaction_allocation_component_1.DepartmentLocationAllocationComponent },
            { path: 'departmentuserallocation', component: pou_department_user_allocation_component_1.DepartmentUserAllocationComponent },
            { path: 'setupdepartments', component: pou_setup_departments_component_1.SetupDepartmentsComponent },
            { path: 'processes', component: pou_process_parameters_component_1.ProcessParamsComponent },
            { path: 'poucreateorders', component: pou_create_orders_component_1.POUCreateOrdersComponent },
            { path: 'manageparlocation', component: pou_manage_par_location_component_1.ManageParLocationComponent },
            { path: 'setupparlocations', component: pou_setup_par_locations_component_1.SetupParLocationsComponent },
            { path: 'UserStatusReport', component: atpar_user_status_report_component_1.UserStatusReportComponent },
            { path: 'departmentlocationworkstationallocation', component: pou_department_location_workstation_allocation_component_1.DepartmentLocationWorkstationAllocationComponent },
            { path: 'Tobininsetup', component: cart_2bin_setup_component_1.ToBinSetup },
            { path: 'assignsignatories', component: deliver_assign_signatories_component_1.AssignSignatoriesComponent },
            { path: 'releasepackages', component: deliver_release_packages_component_1.ReleasePackagesComponent },
            { path: 'setupdropofflocations', component: deliver_setup_drop_off_locations_component_1.SetupDropOffLoactionsComponent },
            { path: 'shiptoidallocationfordeliveryofstockitems', component: deliver_shiptoid_allocation_for_delivery_of_stock_items_component_1.ShipToIdAllocationForDeliveryOfStockItemsComponent },
            { path: 'maintainnoncartitems', component: pou_maintain_non_cart_items_component_1.MaintainNonCartItemsComponent },
            { path: 'managecases', component: pou_manage_cases_component_1.ManageCasesComponent },
            { path: 'manageorders', component: pou_manage_orders_component_1.ManageOrdersComponent },
            { path: 'releasecases', component: pou_release_cases_component_1.ReleaseCasesComponent },
            { path: 'reviewcharges/credits', component: pou_review_charges_credits_component_1.ReviewChargesCreditsComponent },
            { path: 'allocatepickingzones', component: pick_allocate_picking_zones_component_1.AllocatePickingZonesComponent },
            { path: 'orderprefix', component: pick_order_prefix_component_1.OrderPrefixComponent },
            { path: 'pickallocateinventorybusinessunits', component: pick_allocate_inventory_business_units_componet_1.PickAllocateInventoryBusinessUnitsComponent },
            { path: 'allocatepriority', component: pick_allocate_priority_component_1.AllocatePriorityComponent },
            { path: 'pickreleaseorders', component: pick_release_orders_component_1.PickReleaseOrdersComponent },
            { path: 'pickallocatelocationgroups', component: pick_allocate_location_groups_component_1.PickAllocateLocationGroupsComponent },
            { path: 'processcounts', component: cyct_process_counts_component_1.ProcessCountsComponent },
            { path: 'billonlyitemmaintenance', component: pou_bill_only_item_maintenance_component_1.BillOnlyItemMaintenanceComponent },
            { path: 'poucriticalitems', component: pou_critical_items_component_1.POUCriticalItemsComponent },
            { path: 'preferencelists', component: pou_preference_lists_component_1.PreferenceListsComponent },
            { path: 'setupcase', component: pou_setup_case_component_1.SetupCaseComponent },
            { path: 'paroptimizationreport', component: pou_par_optimization_report_component_1.ParOptimizationReportComponent },
            { path: 'manageconsigneditemorderreport', component: pou_manage_cosigned_item_order_report_componenet_1.ManageConsignedItemOrderReportComponent },
            { path: 'reviewcounts', component: cyct_review_counts_components_1.ReviewCountsComponent },
            { path: 'po/nonporeceipts', component: recv_po_nonpo_receipts_component_1.PoNonPoReceiptsComponent },
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
            { path: 'help', component: tkit_help_component_1.HelpComponent },
            { path: 'dashboard', component: tkit_dashboard_component_1.DashComponent },
        ])
    }
];
//# sourceMappingURL=home.routes.js.map