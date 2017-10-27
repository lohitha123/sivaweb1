import { Component } from '@angular/core';
import { EnumApps } from '../Shared/AtParEnums';
declare var module: {
    id: string;
}

@Component({
  
    templateUrl: 'atparx-user-parameters.component.html'
})

export class UserParametersComponent {
    atparXAppId: number = EnumApps.Pharmacy;
}