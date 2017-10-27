import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { PutawayComponent } from './putaway.component';

import { ActivityReportComponent } from './ptwy-activity-report.component';
import { AllocateBusinessUnitsComponent } from './ptwy-allocate-business-units.component';
import { DailyActivityComponent } from './ptwy-daily-activity.component';
import { DailyUserActivityComponent } from './ptwy-daily-user-activity.component';
import { DeviationReportComponent } from './ptwy-deviation-report.component';
import { ReleaseOrdersComponent } from './ptwy-release-orders.component';
import { UserParametersComponent } from './ptwy-user-parameters';


export const routes: Routes = [
    {
        path: '',
        component: PutawayComponent,
        children: [
            { path: 'activityreport', component: ActivityReportComponent },
            { path: 'allocatebusinessunits', component: AllocateBusinessUnitsComponent },
            { path: 'dailyactivity', component: DailyActivityComponent },
            { path: 'dailyuseractivity', component: DailyUserActivityComponent },
            { path: 'deviationreport', component: DeviationReportComponent },
            { path: 'releaseorders', component: ReleaseOrdersComponent },
            { path: 'userparameters', component: UserParametersComponent },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PutawayRoutingModule { }

