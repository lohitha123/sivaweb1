import { Component } from '@angular/core';
import { EnumApps } from '../Shared/AtParEnums';
declare var module: {
    id: string;
}
@Component({
  
    templateUrl: 'pick-user-parameters.component.html'
})

export class UserParametersComponent {
    pickplanAppId: number = EnumApps.PickPlan;
} 