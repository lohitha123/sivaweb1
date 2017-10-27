import { Component } from '@angular/core';
import { EnumApps } from '../Shared/AtParEnums';

declare var module: {
    id: string;
}

@Component({
  
    templateUrl: 'btbn-user-parameters.component.html'
})

export class UserParametersComponent {
    btbnAppId: number = EnumApps.BinToBin;
}