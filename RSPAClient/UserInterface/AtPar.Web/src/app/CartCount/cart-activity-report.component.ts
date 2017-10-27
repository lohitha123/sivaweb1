import { Component } from '@angular/core';
import { EnumApps } from '../Shared/AtParEnums';

declare var module: {
    id: string;
}
@Component({    
    templateUrl: 'cart-activity-report.component.html'    
})

export class ActivityReportComponent {
    crctProductId: number = EnumApps.CartCount;        
} 