import { Component } from '@angular/core';
import { EnumApps } from '../Shared/AtParEnums';

declare var module: {
    id: string;
}
@Component({
  
    templateUrl: 'ptwy-release-orders.component.html'
})

export class ReleaseOrdersComponent {
    putAwayAppId: number = EnumApps.PutAway;
} 
