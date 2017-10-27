import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { ActivityReportComponent } from './ptwy-activity-report.component';
import { AllocateBusinessUnitsComponent } from './ptwy-allocate-business-units.component';
import { DailyActivityComponent } from './ptwy-daily-activity.component';
import { DailyUserActivityComponent } from './ptwy-daily-user-activity.component';
import { DeviationReportComponent } from './ptwy-deviation-report.component';
import { PtyReleaseOrdersComponent } from './ptwy-release-orders.component';
import { UserParametersComponent} from './ptwy-user-parameters';




export const PutawayImports = [ActivityReportComponent, AllocateBusinessUnitsComponent, DailyActivityComponent, DailyUserActivityComponent,
    DeviationReportComponent, PtyReleaseOrdersComponent, UserParametersComponent];