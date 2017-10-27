import { Component } from '@angular/core';
import { EnumApps } from '../Shared/AtParEnums';

declare var module: {
    id: string;
}

@Component({
    templateUrl: 'cyct-activity-report.component.html'
})
export class ActivityReportComponent {
    cyctProductId: number = EnumApps.CycleCount;
}