import { Component } from '@angular/core';
import { EnumApps } from '../Shared/AtParEnums';

declare var module: {
    id: string;
}

@Component({
  
    templateUrl: 'ptwy-user-parameters.html'
})

export class UserParametersComponent {
    ptwyAppId: number = EnumApps.PutAway;
}