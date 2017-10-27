import { NgModule } from '@angular/core';
import { CycleCountComponent } from './cyclecount.component';
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
import { UserParametersComponent } from './cyct-user-parameters.component';
import { CycleCountRoutingModule } from './cyclecount-routing.module';
import { SharedModule } from '../Shared/shared.module';

@NgModule({
    imports: [
        CycleCountRoutingModule,
        SharedModule
    ],
    declarations: [
        CycleCountComponent,
        ActivityReportComponent,
        AllocateEventsComponent,
        AllocateIBUsManualCountsComponent,
        DailyActivityComponent,
        DailyUserActivityComponent,
        EventSummaryReportComponent,
        ItemExceptionReportComponent,
        ProcessCountsComponent,
        ReviewCountsComponent,
        SplitEventsComponent,
        UserParametersComponent
    ]
})

export class CycleCountModule { }

