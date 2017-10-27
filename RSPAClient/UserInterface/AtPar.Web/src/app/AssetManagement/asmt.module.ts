
import { NgModule } from '@angular/core';

import { AssetManagementComponent } from './asmt.component';
import { AccessPermissionComponent } from './asmt-access-permission.component';
import { LocationGroupsAllocationComponent } from './asmt-location-groups-allocation.component';
import { AssetManagementRoutingModule } from './asmt-routing.module';
import { SharedModule } from '../Shared/shared.module';


@NgModule({
    imports: [
        AssetManagementRoutingModule,
        SharedModule
    ],
    declarations: [
        AssetManagementComponent,
        AccessPermissionComponent,
        LocationGroupsAllocationComponent
    ]
})

export class AssetManagementModule { }

