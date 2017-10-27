import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { PickComponent } from './pick.component';

import { ActivityReportComponent } from './pick-activity-report.component';
import { PickAllocateInventoryBusinessUnitsComponent } from './pick-allocate-inventory-business-units.componet';
import { PickAllocateLocationGroupsComponent } from './pick-allocate-location-groups.component';
import { AllocatePickingZonesComponent } from './pick-allocate-picking-zones.component';
import { AllocatePriorityComponent } from './pick-allocate-priority.component';
import { DailyActivityComponent } from './pick-daily-activity.component';
import { DailyUserActivityComponent } from './pick-daily-user-activity.component';
import { DeviationReportComponent } from './pick-deviation-report.component';
import { OrderPrefixComponent } from './pick-order-prefix.component';
import { PickStatusReportComponent } from './pick-pick-status-report-component';
import { PickReleaseOrdersComponent } from './pick-release-orders.component';
import { UserParametersComponent } from './pick-user-parameters.component';


export const routes: Routes = [
    {
        path: '',
        component: PickComponent,
        children: [
            { path: 'activityreport', component: ActivityReportComponent },
            { path: 'allocateinventorybusinessunits', component: PickAllocateInventoryBusinessUnitsComponent },
            { path: 'allocatelocationgroups', component: PickAllocateLocationGroupsComponent },
            { path: 'allocatepickingzones', component: AllocatePickingZonesComponent },
            { path: 'allocatepriority', component: AllocatePriorityComponent },
            { path: 'dailyactivity', component: DailyActivityComponent },
            { path: 'dailyuseractivity', component: DailyUserActivityComponent },
            { path: 'deviationreport', component: DeviationReportComponent },
            { path: 'orderprefix', component: OrderPrefixComponent },
            { path: 'pickstatusreport', component: PickStatusReportComponent },
            { path: 'pickreleaseorders', component: PickReleaseOrdersComponent },
            { path: 'userparameters', component: UserParametersComponent },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PickRoutingModule { }

