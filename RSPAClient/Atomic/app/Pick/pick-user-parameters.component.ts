import { Component } from '@angular/core';
import { EnumApps } from '../Shared/AtParEnums';

@Component({
    templateUrl: './app/Pick/pick-user-parameters.component.html'
})

export class UserParametersComponent {
    pickplanAppId: number = EnumApps.PickPlan;
} 