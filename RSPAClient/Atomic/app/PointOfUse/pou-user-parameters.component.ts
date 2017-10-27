import { Component } from '@angular/core';
import { EnumApps } from '../Shared/AtParEnums';

@Component({
    templateUrl: './app/PointOfUse/pou-user-parameters.component.html'
})

export class UserParametersComponent {
    pouAppId: number = EnumApps.PointOfUse;
}