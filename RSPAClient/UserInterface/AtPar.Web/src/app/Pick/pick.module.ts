import { NgModule } from '@angular/core';


import { PickComponent } from './pick.component';


import { ActivityReportComponent } from './pick-activity-report.component';
import { PickAllocateInventoryBusinessUnitsComponent } from './pick-allocate-inventory-business-units.componet';
import { AllocateLocationGroupsComponent } from './pick-allocate-location-groups.component';
import { AllocatePickingZonesComponent } from './pick-allocate-picking-zones.component';
import { AllocatePriorityComponent } from './pick-allocate-priority.component';
import { DailyActivityComponent } from './pick-daily-activity.component';
import { DailyUserActivityComponent } from './pick-daily-user-activity.component';
import { DeviationReportComponent } from './pick-deviation-report.component';
import { OrderPrefixComponent } from './pick-order-prefix.component';
import { PickStatusReportComponent } from './pick-pick-status-report-component';
import { ReleaseOrdersComponent } from './pick-release-orders.component';
import { UserParametersComponent } from './pick-user-parameters.component';


import { PickRoutingModule } from './pick-routing.module';
import { SharedModule } from '../Shared/shared.module';




@NgModule({
    imports: [
        PickRoutingModule,
        SharedModule
    ],
    declarations: [
        PickComponent,
        ActivityReportComponent,
        PickAllocateInventoryBusinessUnitsComponent,
        AllocateLocationGroupsComponent,
        AllocatePickingZonesComponent,
        AllocatePriorityComponent,
        DailyActivityComponent,
        DailyUserActivityComponent,
        DeviationReportComponent,
        OrderPrefixComponent,
        PickStatusReportComponent,
        ReleaseOrdersComponent,
        UserParametersComponent
    ]
})

export class PickModule { }

