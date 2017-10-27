import { Component } from '@angular/core';
import { EnumApps } from '../Shared/AtParEnums';

@Component({
    templateUrl: './app/Deliver/deliver-user-parameters.component.html'
})

export class UserParametersComponent {
    dlvrAppId: number = EnumApps.Deliver;
}