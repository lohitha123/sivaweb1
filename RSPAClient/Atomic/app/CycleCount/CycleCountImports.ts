import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { ActivityReportComponent } from './cyct-activity-report.component';
import { AllocateEventsComponent } from './cyct-allocate-events.component';
import { AllocateIBUsManualCountsComponent } from './cyct-allocate-ibus-maunal-counts.component';
import { DailyActivityComponent } from './cyct-daily-activity.component';
import { DailyUserActivityComponent } from './cyct-daily-user-activity.component';
import { EventSummaryReportComponent } from './cyct-event-summary-report.component';
import { ItemExceptionReportComponent } from './cyct-item-exception-report.component';
import { ProcessCountsComponent } from './cyct-process-counts.component';
import { ReviewCountsComponent } from './cyct-review-counts.components';
import { SplitEventsComponent } from './cyct-split-events.component';
import { UserParametersComponent} from './cyct-user-parameters.component';





export const CycleCountImports = [ActivityReportComponent, AllocateEventsComponent, AllocateIBUsManualCountsComponent, DailyActivityComponent,
    DailyUserActivityComponent, EventSummaryReportComponent, ItemExceptionReportComponent, ProcessCountsComponent, ReviewCountsComponent,
    SplitEventsComponent, UserParametersComponent];