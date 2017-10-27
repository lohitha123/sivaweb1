import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PutawayComponent } from './putaway.component';


import { ActivityReportComponent } from './ptwy-activity-report.component';
import { AllocateBusinessUnitsComponent } from './ptwy-allocate-business-units.component';
import { DailyActivityComponent } from './ptwy-daily-activity.component';
import { DailyUserActivityComponent } from './ptwy-daily-user-activity.component';
import { DeviationReportComponent } from './ptwy-deviation-report.component';
import { ReleaseOrdersComponent } from './ptwy-release-orders.component';
import { UserParametersComponent } from './ptwy-user-parameters';

import { PutawayRoutingModule } from './putaway-routing.module';
import { SharedModule } from '../Shared/shared.module';


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
        ReleaseOrdersComponent,
        UserParametersComponent
    ]
})

export class PutawayModule { }

