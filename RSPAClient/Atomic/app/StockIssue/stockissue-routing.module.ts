import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { StockIssueComponent } from './stockissue.component';

import { AllocateDestinationLocationsComponent } from './stis-allocate-destination-locations.component';
import { AllocateDistributionTypesComponent } from './stis-allocate-distribution-types.component';
import { AllocateInventoryBusinessUnitsComponent } from './stis-allocate-inventory-business-units.component';
import { DailyActivityComponent } from './stis-daily-activity.component';
import { DailyUserActivityComponent } from './stis-daily-user-activity.component';
import { IssueReportComponent } from './stis-issue-report.component';
import { UserParametersComponent } from './stis-user-parameters.component';


export const routes: Routes = [
    {
        path: '',
        component: StockIssueComponent,
        children: [
            { path: 'allocatedestinationlocations', component: AllocateDestinationLocationsComponent },
            { path: 'allocatedistributiontypes', component: AllocateDistributionTypesComponent },
            { path: 'allocateinventorybusinessunits', component: AllocateInventoryBusinessUnitsComponent },
            { path: 'dailyactivity', component: DailyActivityComponent },
            { path: 'dailyuseractivity', component: DailyUserActivityComponent },
            { path: 'issuereport', component: IssueReportComponent },
            { path: 'userparameters', component: UserParametersComponent },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class StockIssueRoutingModule { }

