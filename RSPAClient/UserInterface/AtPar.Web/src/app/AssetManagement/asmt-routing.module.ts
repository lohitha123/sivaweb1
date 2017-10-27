import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AssetManagementComponent } from './asmt.component';
import { AccessPermissionComponent } from './asmt-access-permission.component';
import { LocationGroupsAllocationComponent } from './asmt-location-groups-allocation.component';


export const routes: Routes = [
    {
        path: '',
        component: AssetManagementComponent,
        children: [
            { path: 'accesspermissions', component: AccessPermissionComponent },
            { path: 'allocatelocationgroups', component: LocationGroupsAllocationComponent },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AssetManagementRoutingModule { }

