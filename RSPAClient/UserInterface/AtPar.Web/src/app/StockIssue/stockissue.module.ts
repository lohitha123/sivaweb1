import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockIssueComponent } from './stockissue.component';


import { AllocateDestinationLocationsComponent } from './stis-allocate-destination-locations.component';
import { AllocateDistributionTypesComponent } from './stis-allocate-distribution-types.component';
import { SIAllocateInventoryBusinessUnitsComponent } from './stis-allocate-inventory-business-units.component';
import { DailyActivityComponent } from './stis-daily-activity.component';
import { DailyUserActivityComponent } from './stis-daily-user-activity.component';
import { IssueReportComponent } from './stis-issue-report.component';
import { UserParametersComponent } from './stis-user-parameters.component';

import { StockIssueRoutingModule } from './stockissue-routing.module';
import { SharedModule } from '../Shared/shared.module';


@NgModule({
    imports: [
        StockIssueRoutingModule,
        SharedModule
    ],
    declarations: [
        StockIssueComponent,
        AllocateDestinationLocationsComponent,
        AllocateDistributionTypesComponent,
        SIAllocateInventoryBusinessUnitsComponent,
        DailyActivityComponent,
        IssueReportComponent,
        UserParametersComponent,
        DailyUserActivityComponent

    ]
})

export class StockIssueModule { }

