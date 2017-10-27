import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


import { AllocateDestinationLocationsComponent } from './stis-allocate-destination-locations.component';
import { AllocateDistributionTypesComponent } from './stis-allocate-distribution-types.component';
import { AllocateInventoryBusinessUnitsComponent } from './stis-allocate-inventory-business-units.component';
import { DailyActivityComponent } from './stis-daily-activity.component';
import { DailyUserActivityComponent } from './stis-daily-user-activity.component';
import { IssueReportComponent } from './stis-issue-report.component';
import { UserParametersComponent } from './stis-user-parameters.component';


export const StockIssueImports = [AllocateDestinationLocationsComponent, AllocateDistributionTypesComponent,
    AllocateInventoryBusinessUnitsComponent, DailyActivityComponent, DailyUserActivityComponent,
    IssueReportComponent, UserParametersComponent
];