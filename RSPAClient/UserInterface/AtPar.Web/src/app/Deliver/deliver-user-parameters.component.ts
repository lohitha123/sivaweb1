import { Component } from '@angular/core';
import { EnumApps } from '../Shared/AtParEnums';
declare var module: {
    id: string;
}

@Component({
    templateUrl: 'deliver-user-parameters.component.html'
})

export class UserParametersComponent {
    dlvrAppId: number = EnumApps.Deliver;
}