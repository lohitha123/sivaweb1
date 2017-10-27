import { Component } from '@angular/core';
import { EnumApps } from '../Shared/AtParEnums';

declare var module: {
    id: string;
}

@Component({
    templateUrl: 'recv-activity-report.component.html'
})

export class ActivityReportComponent {    
    
    recvProductId: number = EnumApps.Receiving;
} 
