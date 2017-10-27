"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var atpar_init_component_1 = require("./atpar-init.component");
var atpar_add_user_component_1 = require("./atpar-add-user.component");
var atpar_assign_profiles_component_1 = require("./atpar-assign-profiles.component");
var atpar_audit_setup_component_1 = require("./atpar-audit-setup.component");
var atpar_change_password_component_1 = require("./atpar-change-password.component");
var atpar_configuration_manager_component_1 = require("./atpar-configuration-manager.component");
//import { DefineUserGroupsComponent } from './atpar-define-user-groups.component';
//import { ErrorReportComponent } from './atpar-error-report.component';
var atpar_import_users_component_1 = require("./atpar-import-users.component");
//import { ManageBarcodeTranslationsComponent } from './atpar-manage-barcode-translations.component';
var atpar_manage_devices_component_1 = require("./atpar-manage-devices.component");
var atpar_manage_org_groups_component_1 = require("./atpar-manage-org-groups.component");
//import { ManageOrgIdComponent } from './atpar-manage-orgid.component';
var atpar_manage_profiles_component_1 = require("./atpar-manage-profiles.component");
var atpar_manage_tokens_component_1 = require("./atpar-manage-tokens.component");
var atpar_manage_users_component_1 = require("./atpar-manage-users.component");
var atpar_org_parameters_component_1 = require("./atpar-org-parameters.component");
var atpar_security_configuration_component_1 = require("./atpar-security-configuration.component");
var atpar_setup_cost_centers_component_1 = require("./atpar-setup-cost-centers.component");
var atpar_setup_items_component_1 = require("./atpar-setup-items.component");
var atpar_setup_storage_location_groups_component_1 = require("./atpar-setup-storage-location-groups.component");
var atpar_setup_location_groups_component_1 = require("./atpar-setup-location-groups.component");
var atpar_setup_locations_component_1 = require("./atpar-setup-locations.component");
var atpar_setup_vendors_component_1 = require("./atpar-setup-vendors.component");
var atpar_setup_inventory_component_1 = require("./atpar-setup-inventory.component");
var atpar_user_status_report_component_1 = require("./atpar-user-status-report.component");
var atpar_user_upload_automation_component_1 = require("./atpar-user-upload-automation.component");
var atpar_maintain_printers_component_1 = require("./atpar-maintain-printers.component");
//import { UserParametersComponent } from './cart-user-parameters.component';
var atpar_process_scheduler_component_1 = require("./atpar-process-scheduler.component");
var atpar_data_archival_component_1 = require("./atpar-data-archival.component");
exports.routes = [
    {
        path: '',
        component: atpar_init_component_1.AtparInitComponent,
        children: [
            { path: 'AddUser', component: atpar_add_user_component_1.AddUserComponent },
            { path: 'AssignProfiles', component: atpar_assign_profiles_component_1.AssignProfilesComponent },
            { path: 'AuditSetup', component: atpar_audit_setup_component_1.AuditSetupComponent },
            { path: 'ChangePassword', component: atpar_change_password_component_1.ChangePasswordComponent },
            { path: 'ConfigurationManager', component: atpar_configuration_manager_component_1.ConfigurationManagerComponent },
            //{ path: 'DefineUserGroups', component: DefineUserGroupsComponent },
            //{ path: 'ErrorReport', component: ErrorReportComponent },
            { path: 'ImportUsers', component: atpar_import_users_component_1.ImportUsersComponent },
            //{ path: 'ManageBarcodeTranslations', component: ManageBarcodeTranslationsComponent },
            { path: 'ManageDevices', component: atpar_manage_devices_component_1.ManageDevicesComponent },
            { path: 'ManageOrgGroups', component: atpar_manage_org_groups_component_1.ManageOrgGroupsComponent },
            //{ path: 'ManageOrgID', component: ManageOrgIdComponent },
            { path: 'ManageProfiles', component: atpar_manage_profiles_component_1.ManageProfilesComponent },
            { path: 'ManageTokens', component: atpar_manage_tokens_component_1.ManageTokensComponent },
            { path: 'ManageUsers', component: atpar_manage_users_component_1.ManageUsersComponent },
            { path: 'OrgParameters', component: atpar_org_parameters_component_1.OrgParametersComponent },
            { path: 'SecurityConfiguration', component: atpar_security_configuration_component_1.SecurityConfigurationComponent },
            { path: 'SetupCostCenters', component: atpar_setup_cost_centers_component_1.SetupcostComponent },
            { path: 'SetupItems', component: atpar_setup_items_component_1.SetupItemsComponent },
            { path: 'SetupLocationGroups', component: atpar_setup_location_groups_component_1.SetupLocationGroupsComponent },
            { path: 'SetupLocations', component: atpar_setup_locations_component_1.SetupLocationsComponent },
            { path: 'SetupStorageLocationGroups', component: atpar_setup_storage_location_groups_component_1.SetupStorageLocationGroups },
            { path: 'SetUpVendors', component: atpar_setup_vendors_component_1.SetupVendorsComponent },
            { path: 'SetUpInventory', component: atpar_setup_inventory_component_1.SetupInventoryComponent },
            { path: 'UserStatusReport', component: atpar_user_status_report_component_1.UserStatusReportComponent },
            { path: 'UserUploadAutomation', component: atpar_user_upload_automation_component_1.UserUploadAutomationComponent },
            { path: 'MaintainPrinter', component: atpar_maintain_printers_component_1.MaintainPrintersComponent },
            { path: 'ProcessScheduler', component: atpar_process_scheduler_component_1.ProcessScheduler },
            { path: 'DataArchival', component: atpar_data_archival_component_1.DataArchival },
        ]
    }
];
var AtparInitRoutingModule = (function () {
    function AtparInitRoutingModule() {
    }
    return AtparInitRoutingModule;
}());
AtparInitRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(exports.routes)],
        exports: [router_1.RouterModule]
    })
], AtparInitRoutingModule);
exports.AtparInitRoutingModule = AtparInitRoutingModule;
//# sourceMappingURL=atpar-init-routing.module.js.map