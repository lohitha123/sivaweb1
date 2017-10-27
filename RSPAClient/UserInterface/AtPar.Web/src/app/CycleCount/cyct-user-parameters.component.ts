import { Component } from '@angular/core';
import { EnumApps } from '../Shared/AtParEnums';

declare var module: {
    id: string;
}

@Component({
    templateUrl: 'cyct-user-parameters.component.html'
})

export class UserParametersComponent {
    cyctappId: number = EnumApps.CycleCount;
}