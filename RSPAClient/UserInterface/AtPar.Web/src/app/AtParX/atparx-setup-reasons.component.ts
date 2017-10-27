import { Component } from '@angular/core';
import { EnumApps } from '../Shared/AtParEnums';

declare var module: {
    id: string;
}
@Component({
  
    templateUrl: 'atparx-setup-reasons.component.html'
})

export class SetupReasonsComponent {
    atParXAppId: number= EnumApps.Pharmacy;
}