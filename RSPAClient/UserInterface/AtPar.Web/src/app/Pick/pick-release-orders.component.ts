import { Component } from '@angular/core';
import { EnumApps } from '../Shared/AtParEnums';

declare var module: {
    id: string;
}
@Component({
  
    templateUrl: 'pick-release-orders.component.html'
})

export class ReleaseOrdersComponent {
    pickPlanAppId: number = EnumApps.PickPlan;
} 