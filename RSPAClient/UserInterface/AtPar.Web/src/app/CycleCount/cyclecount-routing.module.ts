import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

export const routes: Routes = [
    {
        path: '',
        component: CycleCountComponent,
        children: [
            { path: 'activityreport', component: ActivityReportComponent },
            { path: 'allocateevents', component: AllocateEventsComponent },
            { path: 'allocateibusmanualcounts', component: AllocateIBUsManualCountsComponent },
            { path: 'dailyactivity', component: DailyActivityComponent },
            { path: 'dailyuseractivity', component: DailyUserActivityComponent },
            { path: 'eventsummaryreport', component: EventSummaryReportComponent },
            { path: 'itemexceptionreport', component: ItemExceptionReportComponent },
            { path: 'processcounts', component: ProcessCountsComponent },
            { path: 'reviewcounts', component: ReviewCountsComponent },
            { path: 'splitevents', component: SplitEventsComponent },
            { path: 'userparameters', component: UserParametersComponent },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CycleCountRoutingModule { }

