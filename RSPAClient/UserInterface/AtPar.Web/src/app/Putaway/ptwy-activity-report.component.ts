import { Component } from '@angular/core';
import { EnumApps } from '../Shared/AtParEnums';

declare var module: {
    id: string;
}
@Component({
  
    templateUrl: 'ptwy-activity-report.component.html'
})

export class ActivityReportComponent {
    ptwyProductId: number = EnumApps.PutAway;
} 
