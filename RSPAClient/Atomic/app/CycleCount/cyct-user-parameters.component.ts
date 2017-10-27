import { Component } from '@angular/core';
import { EnumApps } from '../Shared/AtParEnums';

@Component({
    templateUrl: './app/CycleCount/cyct-user-parameters.component.html'
})

export class UserParametersComponent {
    cyctappId: number = EnumApps.CycleCount;
}