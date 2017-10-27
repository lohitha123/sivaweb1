"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="atpar-setup-items-addmodify.component.ts" />
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var atpar_add_user_component_1 = require("./atpar-add-user.component");
var atpar_assign_profiles_component_1 = require("./atpar-assign-profiles.component");
var atpar_audit_setup_component_1 = require("./atpar-audit-setup.component");
var atpar_change_password_component_1 = require("./atpar-change-password.component");
var atpar_configuration_manager_component_1 = require("./atpar-configuration-manager.component");
var atpar_define_user_groups_component_1 = require("./atpar-define-user-groups.component");
var atpar_error_report_component_1 = require("./atpar-error-report.component");
var atpar_import_users_component_1 = require("./atpar-import-users.component");
var atpar_manage_barcode_translations_component_1 = require("./atpar-manage-barcode-translations.component");
var atpar_manage_devices_component_1 = require("./atpar-manage-devices.component");
var atpar_manage_org_groups_component_1 = require("./atpar-manage-org-groups.component");
var atpar_manage_orgid_component_1 = require("./atpar-manage-orgid.component");
var atpar_manage_profiles_component_1 = require("./atpar-manage-profiles.component");
var atpar_manage_tokens_component_1 = require("./atpar-manage-tokens.component");
var atpar_manage_users_component_1 = require("./atpar-manage-users.component");
var atpar_manage_users_home_component_1 = require("./atpar-manage-users-home.component");
var atpar_org_parameters_component_1 = require("./atpar-org-parameters.component");
var atpar_security_configuration_component_1 = require("./atpar-security-configuration.component");
var atpar_setup_cost_centers_component_1 = require("./atpar-setup-cost-centers.component");
var atpar_setup_items_component_1 = require("./atpar-setup-items.component");
var atpar_setup_location_groups_component_1 = require("./atpar-setup-location-groups.component");
var atpar_setup_locations_component_1 = require("./atpar-setup-locations.component");
var atpar_setup_vendors_component_1 = require("./atpar-setup-vendors.component");
var atpar_user_status_report_component_1 = require("./atpar-user-status-report.component");
var atpar_user_status_report_home_component_1 = require("./atpar-user-status-report-home.component");
var atpar_user_upload_automation_component_1 = require("./atpar-user-upload-automation.component");
var atpar_setup_cost_centers_home_component_1 = require("./atpar-setup-cost-centers-home.component");
var atpar_setup_cost_centers_crud_component_1 = require("./atpar-setup-cost-centers-crud.component");
var atpar_setup_storage_location_groups_component_1 = require("./atpar-setup-storage-location-groups.component");
var atpar_process_scheduler_component_1 = require("./atpar-process-scheduler.component");
var atpar_data_archival_component_1 = require("./atpar-data-archival.component");
var atpar_stationary_print_design_component_1 = require("./atpar-stationary-print-design.component");
var atpar_maintain_printers_component_1 = require("./atpar-maintain-printers.component");
var atpar_setup_items_home_component_1 = require("./atpar-setup-items-home.component");
var atpar_setup_items_addmodify_component_1 = require("./atpar-setup-items-addmodify.component");
var atpar_setup_substituteitems_component_1 = require("./atpar-setup-substituteitems.component");
var atpar_setup_modify_vendors_1 = require("./atpar-setup-modify-vendors");
var atpar_setup_vendorsHome_component_1 = require("./atpar-setup-vendorsHome.component");
var atpar_manage_orgid_modify_component_1 = require("./atpar-manage-orgid-modify.component");
var atpar_manage_orgid_home_component_1 = require("./atpar-manage-orgid-home.component");
var atpar_setup_inventory_component_1 = require("./atpar-setup-inventory.component");
var atpar_setup_inventory_home_component_1 = require("./atpar-setup-inventory-home.component");
var atpar_setup_add_modify_inventory_component_1 = require("./atpar-setup-add-modify-inventory.component");
var atpar_setup_storage_location_groups_component_Assign_1 = require("./atpar-setup-storage-location-groups.component.Assign");
var atpar_setup_storage_location_groups_component_home_1 = require("./atpar-setup-storage-location-groups.component.home");
var atpar_setup_storage_location_groups_component_addzone_1 = require("./atpar-setup-storage-location-groups.component.addzone");
exports.AtParRoutes = [
    { path: 'adduser', component: atpar_add_user_component_1.AddUserComponent },
    { path: 'assignprofiles', component: atpar_assign_profiles_component_1.AssignProfilesComponent },
    { path: 'auditsetup', component: atpar_audit_setup_component_1.AuditSetupComponent },
    { path: 'changepassword', component: atpar_change_password_component_1.ChangePasswordComponent },
    { path: 'configurationmanager', component: atpar_configuration_manager_component_1.ConfigurationManagerComponent },
    { path: 'defineusergroups', component: atpar_define_user_groups_component_1.DefineUserGroupsComponent },
    { path: 'errorreport', component: atpar_error_report_component_1.ErrorReportComponent },
    { path: 'importusers', component: atpar_import_users_component_1.ImportUsersComponent },
    { path: 'managebarcodetranslations', component: atpar_manage_barcode_translations_component_1.ManageBarcodeTranslationsComponent },
    { path: 'managedevices', component: atpar_manage_devices_component_1.ManageDevicesComponent },
    { path: 'manageorggroups', component: atpar_manage_org_groups_component_1.ManageOrgGroupsComponent },
    { path: 'assign', component: atpar_setup_storage_location_groups_component_Assign_1.SetupStorageLocationAssign },
    { path: 'addZone', component: atpar_setup_storage_location_groups_component_addzone_1.SetupStorageLocationAddZoneComponent },
    //{ path: 'manageorgid', component: ManageOrgIdComponent },
    {
        path: 'manageorgid', component: atpar_manage_orgid_home_component_1.ManageOrgIdHomeComponent,
        children: [
            { path: '', component: atpar_manage_orgid_component_1.ManageOrgIdComponent },
            { path: 'addOrgId', component: atpar_manage_orgid_modify_component_1.ModifyOrgIdComponent }
        ]
    },
    { path: 'manageprofiles', component: atpar_manage_profiles_component_1.ManageProfilesComponent },
    { path: 'managetokens', component: atpar_manage_tokens_component_1.ManageTokensComponent },
    { path: 'orgparameters', component: atpar_org_parameters_component_1.OrgParametersComponent },
    { path: 'securityconfiguration', component: atpar_security_configuration_component_1.SecurityConfigurationComponent },
    {
        path: 'setupcostcenters', component: atpar_setup_cost_centers_component_1.SetupCostCentersComponent,
        children: [
            { path: '', component: atpar_setup_cost_centers_home_component_1.SetupCostCentersHome },
            { path: 'addormodify', component: atpar_setup_cost_centers_crud_component_1.SetupCostCentersCrud }
        ]
    },
    {
        path: 'setupitems', component: atpar_setup_items_component_1.SetupItemsComponent,
        children: [
            { path: '', component: atpar_setup_items_home_component_1.SetupItemsHomeComponent },
            { path: 'setupmodifyitems', component: atpar_setup_items_addmodify_component_1.SetupModifyItemsComponent },
            { path: 'setupsubstituteitems', component: atpar_setup_substituteitems_component_1.SetupItemsSubstituteItemsComponent }
        ]
    },
    { path: 'setuplocationgroups', component: atpar_setup_location_groups_component_1.SetupLocationGroupsComponent },
    { path: 'setuplocations', component: atpar_setup_locations_component_1.SetupLocationsComponent },
    {
        path: 'setupvendors', component: atpar_setup_vendors_component_1.SetupVendorsComponent,
        children: [
            { path: '', component: atpar_setup_vendorsHome_component_1.SetupVendorsHomeComponent },
            { path: 'setupmodifyvendors', component: atpar_setup_modify_vendors_1.SetupModifyVendorsComponent }
        ]
    },
    {
        path: 'manageusers', component: atpar_manage_users_component_1.ManageUsersComponent,
        children: [
            { path: '', component: atpar_manage_users_home_component_1.ManageUsersHomeComponent },
            { path: 'adduser', component: atpar_add_user_component_1.AddUserComponent }
        ]
    },
    {
        path: 'userstatusreport', component: atpar_user_status_report_component_1.UserStatusReportComponent,
        children: [
            { path: '', component: atpar_user_status_report_home_component_1.UserStatusReportHomeComponent },
            { path: 'adduser', component: atpar_add_user_component_1.AddUserComponent }
        ]
    },
    { path: 'useruploadautomation', component: atpar_user_upload_automation_component_1.UserUploadAutomationComponent },
    {
        path: 'setupstoragelocationgroups', component: atpar_setup_storage_location_groups_component_1.SetupStorageLocationComponent,
        children: [
            { path: '', component: atpar_setup_storage_location_groups_component_home_1.SetupStorageLocationGroupsHomeComponent },
            { path: 'assign', component: atpar_setup_storage_location_groups_component_Assign_1.SetupStorageLocationAssign },
            { path: 'addZone', component: atpar_setup_storage_location_groups_component_addzone_1.SetupStorageLocationAddZoneComponent }
        ]
    },
    { path: 'processscheduler', component: atpar_process_scheduler_component_1.ProcessScheduler },
    { path: 'dataarchival', component: atpar_data_archival_component_1.DataArchival },
    { path: 'stationaryprintdesign', component: atpar_stationary_print_design_component_1.StationaryPrintDesign },
    { path: 'maintainprinters', component: atpar_maintain_printers_component_1.MaintainPrinters },
    {
        path: 'setupinventory', component: atpar_setup_inventory_component_1.SetupInventoryComponent,
        children: [
            { path: '', component: atpar_setup_inventory_home_component_1.SetupInventoryHome },
            { path: 'addormodifyinventory', component: atpar_setup_add_modify_inventory_component_1.SetupInventoryAddModify }
        ]
    }
];
var AtparInitRoutingModule = (function () {
    function AtparInitRoutingModule() {
    }
    AtparInitRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(exports.AtParRoutes)],
            exports: [router_1.RouterModule]
        })
    ], AtparInitRoutingModule);
    return AtparInitRoutingModule;
}());
exports.AtparInitRoutingModule = AtparInitRoutingModule;
//# sourceMappingURL=atpar-init-routing.module.js.map