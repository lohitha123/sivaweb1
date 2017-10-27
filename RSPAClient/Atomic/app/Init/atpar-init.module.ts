import { NgModule } from '@angular/core';


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
//import { SetupItemsComponent } from './atpar-setup-items.component';
import { SetupLocationGroupsComponent } from './atpar-setup-location-groups.component';
import { SetupLocationsComponent } from './atpar-setup-locations.component';
import { SetupVendorsComponent } from './atpar-setup-vendors.component';
import { SetupInventoryComponent } from './atpar-setup-inventory.component';
//import { UserStatusReportComponent } from './atpar-user-status-report.component';
import { UserUploadAutomationComponent } from './atpar-user-upload-automation.component';
import { MaintainPrintersComponent } from './atpar-maintain-printers.component';
//import { UserParametersComponent } from './cart-user-parameters.component';
import {SetupStorageLocationGroups} from './atpar-setup-storage-location-groups.component';
import { ProcessScheduler } from './atpar-process-scheduler.component';
import { DataArchival } from './atpar-data-archival.component';

import { AtparInitRoutingModule } from './atpar-init-routing.module';


@NgModule({
    imports: [AtparInitRoutingModule],

    declarations: [
        AtparInitComponent,
        AddUserComponent,
        AssignProfilesComponent,
        AuditSetupComponent,
        ChangePasswordComponent,
        ConfigurationManagerComponent,
        //DefineUserGroupsComponent,
        //ErrorReportComponent,
        ImportUsersComponent,
        //ManageBarcodeTranslationsComponent,
        ManageDevicesComponent,
        //ManageOrgGroupsComponent,
        //ManageOrgIdComponent,
        ManageProfilesComponent,
        ManageTokensComponent,
        ManageUsersComponent,
        OrgParametersComponent,
        SecurityConfigurationComponent,
        SetupcostComponent,
        //SetupItemsComponent,
        SetupLocationGroupsComponent,
        SetupLocationsComponent,
        SetupStorageLocationGroups,
        SetupVendorsComponent,
        SetupInventoryComponent,
        //UserStatusReportComponent,
        UserUploadAutomationComponent,
        MaintainPrintersComponent,
        ProcessScheduler,
        DataArchival,
    ],
})


export class AtparInitModule { }