import { Component } from '@angular/core';
import { EnumApps } from '../Shared/AtParEnums';

declare var module: {
    id: string;
}

@Component({
  
    templateUrl: 'pou-setup-reasons.component.html'
})

export class SetupReasonsComponent {
    pouAppId: number = EnumApps.PointOfUse;
}