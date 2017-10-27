"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
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
//import { ManageOrgIdComponent } from './atpar-manage-orgid.component';
var atpar_manage_profiles_component_1 = require("./atpar-manage-profiles.component");
var atpar_manage_tokens_component_1 = require("./atpar-manage-tokens.component");
var atpar_manage_users_component_1 = require("./atpar-manage-users.component");
var atpar_org_parameters_component_1 = require("./atpar-org-parameters.component");
var atpar_security_configuration_component_1 = require("./atpar-security-configuration.component");
var atpar_setup_cost_centers_component_1 = require("./atpar-setup-cost-centers.component");
//import { SetupItemsComponent } from './atpar-setup-items.component';
var atpar_setup_location_groups_component_1 = require("./atpar-setup-location-groups.component");
var atpar_setup_locations_component_1 = require("./atpar-setup-locations.component");
var atpar_setup_vendors_component_1 = require("./atpar-setup-vendors.component");
var atpar_setup_inventory_component_1 = require("./atpar-setup-inventory.component");
//import { UserStatusReportComponent } from './atpar-user-status-report.component';
var atpar_user_upload_automation_component_1 = require("./atpar-user-upload-automation.component");
var atpar_maintain_printers_component_1 = require("./atpar-maintain-printers.component");
//import { UserParametersComponent } from './cart-user-parameters.component';
var atpar_setup_storage_location_groups_component_1 = require("./atpar-setup-storage-location-groups.component");
var atpar_process_scheduler_component_1 = require("./atpar-process-scheduler.component");
var atpar_data_archival_component_1 = require("./atpar-data-archival.component");
var atpar_init_routing_module_1 = require("./atpar-init-routing.module");
var AtparInitModule = (function () {
    function AtparInitModule() {
    }
    return AtparInitModule;
}());
AtparInitModule = __decorate([
    core_1.NgModule({
        imports: [atpar_init_routing_module_1.AtparInitRoutingModule],
        declarations: [
            atpar_init_component_1.AtparInitComponent,
            atpar_add_user_component_1.AddUserComponent,
            atpar_assign_profiles_component_1.AssignProfilesComponent,
            atpar_audit_setup_component_1.AuditSetupComponent,
            atpar_change_password_component_1.ChangePasswordComponent,
            atpar_configuration_manager_component_1.ConfigurationManagerComponent,
            //DefineUserGroupsComponent,
            //ErrorReportComponent,
            atpar_import_users_component_1.ImportUsersComponent,
            //ManageBarcodeTranslationsComponent,
            atpar_manage_devices_component_1.ManageDevicesComponent,
            //ManageOrgGroupsComponent,
            //ManageOrgIdComponent,
            atpar_manage_profiles_component_1.ManageProfilesComponent,
            atpar_manage_tokens_component_1.ManageTokensComponent,
            atpar_manage_users_component_1.ManageUsersComponent,
            atpar_org_parameters_component_1.OrgParametersComponent,
            atpar_security_configuration_component_1.SecurityConfigurationComponent,
            atpar_setup_cost_centers_component_1.SetupcostComponent,
            //SetupItemsComponent,
            atpar_setup_location_groups_component_1.SetupLocationGroupsComponent,
            atpar_setup_locations_component_1.SetupLocationsComponent,
            atpar_setup_storage_location_groups_component_1.SetupStorageLocationGroups,
            atpar_setup_vendors_component_1.SetupVendorsComponent,
            atpar_setup_inventory_component_1.SetupInventoryComponent,
            //UserStatusReportComponent,
            atpar_user_upload_automation_component_1.UserUploadAutomationComponent,
            atpar_maintain_printers_component_1.MaintainPrintersComponent,
            atpar_process_scheduler_component_1.ProcessScheduler,
            atpar_data_archival_component_1.DataArchival,
        ],
    })
], AtparInitModule);
exports.AtparInitModule = AtparInitModule;
//# sourceMappingURL=atpar-init.module.js.map