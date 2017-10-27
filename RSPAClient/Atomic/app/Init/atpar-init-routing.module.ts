import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AtparInitComponent } from './atpar-init.component';

import { AddUserComponent } from './atpar-add-user.component';
import { AssignProfilesComponent } from './atpar-assign-profiles.component';
import { AuditSetupComponent } from './atpar-audit-setup.component';
import { ChangePasswordComponent } from './atpar-change-password.component';
import { ConfigurationManagerComponent } from './atpar-configuration-manager.component';
//import { DefineUserGroupsComponent } from './atpar-define-user-groups.component';
//import { ErrorReportComponent } from './atpar-error-report.component';
import { ImportUsersComponent } from './atpar-import-users.component';
//import { ManageBarcodeTranslationsComponent } from './atpar-manage-barcode-translations.component';
import { ManageDevicesComponent } from './atpar-manage-devices.component';
import { ManageOrgGroupsComponent } from './atpar-manage-org-groups.component';
//import { ManageOrgIdComponent } from './atpar-manage-orgid.component';
import { ManageProfilesComponent } from './atpar-manage-profiles.component';
import { ManageTokensComponent } from './atpar-manage-tokens.component';
import { ManageUsersComponent } from './atpar-manage-users.component';
import { OrgParametersComponent } from './atpar-org-parameters.component';
import { SecurityConfigurationComponent } from './atpar-security-configuration.component';
import { SetupcostComponent } from './atpar-setup-cost-centers.component';
import { SetupItemsComponent } from './atpar-setup-items.component';
import { SetupStorageLocationGroups } from './atpar-setup-storage-location-groups.component';
import { SetupLocationGroupsComponent } from './atpar-setup-location-groups.component';
import { SetupLocationsComponent } from './atpar-setup-locations.component';
import { SetupVendorsComponent } from './atpar-setup-vendors.component';
import { SetupInventoryComponent } from './atpar-setup-inventory.component';
import { UserStatusReportComponent } from './atpar-user-status-report.component';
import { UserUploadAutomationComponent } from './atpar-user-upload-automation.component';
import { MaintainPrintersComponent } from './atpar-maintain-printers.component';
//import { UserParametersComponent } from './cart-user-parameters.component';
import { ProcessScheduler } from './atpar-process-scheduler.component';
import { DataArchival } from './atpar-data-archival.component';

export const routes: Routes = [
    {
        path: '',
        component: AtparInitComponent,
        children: [
            { path: 'AddUser', component: AddUserComponent },
            { path: 'AssignProfiles', component: AssignProfilesComponent },
            { path: 'AuditSetup', component: AuditSetupComponent },
            { path: 'ChangePassword', component: ChangePasswordComponent },
            { path: 'ConfigurationManager', component: ConfigurationManagerComponent },
            //{ path: 'DefineUserGroups', component: DefineUserGroupsComponent },
            //{ path: 'ErrorReport', component: ErrorReportComponent },
            { path: 'ImportUsers', component: ImportUsersComponent },
            //{ path: 'ManageBarcodeTranslations', component: ManageBarcodeTranslationsComponent },
            { path: 'ManageDevices', component: ManageDevicesComponent },
            { path: 'ManageOrgGroups', component: ManageOrgGroupsComponent },
            //{ path: 'ManageOrgID', component: ManageOrgIdComponent },
            { path: 'ManageProfiles', component: ManageProfilesComponent },
            { path: 'ManageTokens', component: ManageTokensComponent },
            { path: 'ManageUsers', component: ManageUsersComponent },
            { path: 'OrgParameters', component: OrgParametersComponent },
            { path: 'SecurityConfiguration', component: SecurityConfigurationComponent },
            { path: 'SetupCostCenters', component: SetupcostComponent },
            { path: 'SetupItems', component: SetupItemsComponent },
            { path: 'SetupLocationGroups', component: SetupLocationGroupsComponent },
            { path: 'SetupLocations', component: SetupLocationsComponent },
            { path: 'SetupStorageLocationGroups', component: SetupStorageLocationGroups },
            { path: 'SetUpVendors', component: SetupVendorsComponent },
            { path: 'SetUpInventory', component: SetupInventoryComponent },
            { path: 'UserStatusReport', component: UserStatusReportComponent },
            { path: 'UserUploadAutomation', component: UserUploadAutomationComponent },
            { path: 'MaintainPrinter', component: MaintainPrintersComponent },
            { path: 'ProcessScheduler', component: ProcessScheduler },
            { path: 'DataArchival', component: DataArchival },
            //{ path: 'UserParameter', component: UserParametersComponent}
            //{ path: '', redirectTo: 'AddUser', pathMatch: 'full' }
     ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AtparInitRoutingModule { }

