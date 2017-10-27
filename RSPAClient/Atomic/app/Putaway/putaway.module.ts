import { NgModule } from '@angular/core';


import { PutawayComponent } from './putaway.component';


import { ActivityReportComponent } from './ptwy-activity-report.component';
import { AllocateBusinessUnitsComponent } from './ptwy-allocate-business-units.component';
import { DailyActivityComponent } from './ptwy-daily-activity.component';
import { DailyUserActivityComponent } from './ptwy-daily-user-activity.component';
import { DeviationReportComponent } from './ptwy-deviation-report.component';
import { PtyReleaseOrdersComponent } from './ptwy-release-orders.component';
import { UserParametersComponent } from './ptwy-user-parameters';

import { PutawayRoutingModule } from './putaway-routing.module';
import { SharedModule } from '../shared/shared.module'


@NgModule({
    imports: [
        PutawayRoutingModule,
        SharedModule
    ],
    declarations: [
        PutawayComponent,
        ActivityReportComponent,
        AllocateBusinessUnitsComponent,
        DailyActivityComponent,
        DailyUserActivityComponent,
        DeviationReportComponent,
        PtyReleaseOrdersComponent,
        UserParametersComponent
    ]
})

export class PutawayModule { }

