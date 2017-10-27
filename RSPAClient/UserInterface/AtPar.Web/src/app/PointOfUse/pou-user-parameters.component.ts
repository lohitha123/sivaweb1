import { Component } from '@angular/core';
import { EnumApps } from '../Shared/AtParEnums';

declare var module: {
    id: string;
}
@Component({
  
    templateUrl: 'pou-user-parameters.component.html'
})

export class UserParametersComponent {
    pouAppId: number = EnumApps.PointOfUse;
}