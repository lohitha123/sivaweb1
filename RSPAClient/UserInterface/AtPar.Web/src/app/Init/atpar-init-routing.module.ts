﻿/// <reference path="atpar-setup-items-addmodify.component.ts" />
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './atpar-add-user.component';
import { AssignProfilesComponent } from './atpar-assign-profiles.component';
import { AuditSetupComponent } from './atpar-audit-setup.component';
import { ChangePasswordComponent } from './atpar-change-password.component';
import { ConfigurationManagerComponent } from './atpar-configuration-manager.component';
import { DefineUserGroupsComponent } from './atpar-define-user-groups.component';
import { ErrorReportComponent } from './atpar-error-report.component';
import { ImportUsersComponent } from './atpar-import-users.component';
import { ManageBarcodeTranslationsComponent } from './atpar-manage-barcode-translations.component';
import { ManageDevicesComponent } from './atpar-manage-devices.component';
import { ManageOrgGroupsComponent } from './atpar-manage-org-groups.component';
import { ManageOrgIdComponent } from './atpar-manage-orgid.component';
import { ManageProfilesComponent } from './atpar-manage-profiles.component';
import { ManageTokensComponent } from './atpar-manage-tokens.component';
import { ManageUsersComponent } from './atpar-manage-users.component';
import { ManageUsersHomeComponent } from './atpar-manage-users-home.component';
import { OrgParametersComponent } from './atpar-org-parameters.component';
import { SecurityConfigurationComponent } from './atpar-security-configuration.component';
import { SetupCostCentersComponent } from './atpar-setup-cost-centers.component';
import { SetupItemsComponent } from './atpar-setup-items.component';
import { SetupLocationGroupsComponent } from './atpar-setup-location-groups.component';
import { SetupLocationsComponent } from './atpar-setup-locations.component';
import { SetupVendorsComponent } from './atpar-setup-vendors.component';
import { UserStatusReportComponent } from './atpar-user-status-report.component';
import { UserStatusReportHomeComponent } from './atpar-user-status-report-home.component'
import { UserUploadAutomationComponent } from './atpar-user-upload-automation.component';

import { SetupCostCentersHome } from './atpar-setup-cost-centers-home.component';
import { SetupCostCentersCrud } from './atpar-setup-cost-centers-crud.component';
import { AtParSharedDataService } from "../Shared/AtParSharedDataService";


import { SetupStorageLocationComponent } from './atpar-setup-storage-location-groups.component';
import { ProcessScheduler } from './atpar-process-scheduler.component';
import { DataArchival } from './atpar-data-archival.component';
import { StationaryPrintDesign } from './atpar-stationary-print-design.component';
import { MaintainPrinters } from './atpar-maintain-printers.component';

import { SetupItemsHomeComponent } from './atpar-setup-items-home.component';
import { SetupModifyItemsComponent } from './atpar-setup-items-addmodify.component';
import { SetupItemsSubstituteItemsComponent } from './atpar-setup-substituteitems.component';
import { SetupModifyVendorsComponent } from './atpar-setup-modify-vendors';
import { SetupVendorsHomeComponent } from './atpar-setup-vendorsHome.component';
import { ModifyOrgIdComponent } from './atpar-manage-orgid-modify.component';
import { ManageOrgIdHomeComponent } from './atpar-manage-orgid-home.component';


import { SetupInventoryComponent } from './atpar-setup-inventory.component';
import { SetupInventoryHome } from './atpar-setup-inventory-home.component';
import { SetupInventoryAddModify } from './atpar-setup-add-modify-inventory.component';
import { SetupStorageLocationAssign } from './atpar-setup-storage-location-groups.component.Assign';
import { SetupStorageLocationGroupsHomeComponent } from './atpar-setup-storage-location-groups.component.home';
import { SetupStorageLocationAddZoneComponent } from './atpar-setup-storage-location-groups.component.addzone';

export const AtParRoutes: Routes = [

    { path: 'adduser', component: AddUserComponent },
    { path: 'assignprofiles', component: AssignProfilesComponent },
    { path: 'auditsetup', component: AuditSetupComponent },
    { path: 'changepassword', component: ChangePasswordComponent },
    { path: 'configurationmanager', component: ConfigurationManagerComponent },
    { path: 'defineusergroups', component: DefineUserGroupsComponent },
    { path: 'errorreport', component: ErrorReportComponent },
    { path: 'importusers', component: ImportUsersComponent },
    { path: 'managebarcodetranslations', component: ManageBarcodeTranslationsComponent },
    { path: 'managedevices', component: ManageDevicesComponent },
    { path: 'manageorggroups', component: ManageOrgGroupsComponent },
    { path: 'assign', component: SetupStorageLocationAssign },
    { path: 'addZone', component: SetupStorageLocationAddZoneComponent },
    //{ path: 'manageorgid', component: ManageOrgIdComponent },
    {
        path: 'manageorgid', component: ManageOrgIdHomeComponent,
        children: [
            { path: '', component: ManageOrgIdComponent },
            { path: 'addOrgId', component: ModifyOrgIdComponent }
        ]
    },
    { path: 'manageprofiles', component: ManageProfilesComponent },
    { path: 'managetokens', component: ManageTokensComponent },

    { path: 'orgparameters', component: OrgParametersComponent },
    { path: 'securityconfiguration', component: SecurityConfigurationComponent },
    {
        path: 'setupcostcenters', component: SetupCostCentersComponent,
        children: [
            { path: '', component: SetupCostCentersHome },
            { path: 'addormodify', component: SetupCostCentersCrud }
        ]
    },




    {
        path: 'setupitems', component: SetupItemsComponent,
        children: [
            { path: '', component: SetupItemsHomeComponent },
            { path: 'setupmodifyitems', component: SetupModifyItemsComponent },
            { path: 'setupsubstituteitems', component: SetupItemsSubstituteItemsComponent }

        ]
    },
    { path: 'setuplocationgroups', component: SetupLocationGroupsComponent },
    { path: 'setuplocations', component: SetupLocationsComponent },


    {
        path: 'setupvendors', component: SetupVendorsComponent,
        children: [
            { path: '', component: SetupVendorsHomeComponent },
            { path: 'setupmodifyvendors', component: SetupModifyVendorsComponent }
        ]
    },
    {
        path: 'manageusers', component: ManageUsersComponent,
        children: [
            { path: '', component: ManageUsersHomeComponent },
            { path: 'adduser', component: AddUserComponent }
        ]
    },
    {
        path: 'userstatusreport', component: UserStatusReportComponent,
        children: [
            { path: '', component: UserStatusReportHomeComponent },
            { path: 'adduser', component: AddUserComponent }
        ]
    },
    { path: 'useruploadautomation', component: UserUploadAutomationComponent },
    {
        path: 'setupstoragelocationgroups', component: SetupStorageLocationComponent,
        children: [
            { path: '', component: SetupStorageLocationGroupsHomeComponent },
            { path: 'assign', component: SetupStorageLocationAssign },
            { path: 'addZone', component: SetupStorageLocationAddZoneComponent }
        ]
    },
    { path: 'processscheduler', component: ProcessScheduler },
    { path: 'dataarchival', component: DataArchival },
    { path: 'stationaryprintdesign', component: StationaryPrintDesign },
    { path: 'maintainprinters', component: MaintainPrinters },
    {
        path: 'setupinventory', component: SetupInventoryComponent,
        children: [
            { path: '', component: SetupInventoryHome },
            { path: 'addormodifyinventory', component: SetupInventoryAddModify }
        ]
    }

]

@NgModule({
    imports: [RouterModule.forChild(AtParRoutes)],
    exports: [RouterModule]

})

export class AtparInitRoutingModule { }

