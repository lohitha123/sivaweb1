import { Component } from '@angular/core';
import { EnumApps } from '../Shared/AtParEnums';

@Component({
    templateUrl: './app/Putaway/ptwy-user-parameters.html'
})

export class UserParametersComponent {
    ptwyAppId: number = EnumApps.PutAway;
}