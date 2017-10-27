import { Component } from '@angular/core';
import { EnumApps } from '../Shared/AtParEnums';
declare var module: {
    id: string;
}

@Component({
  
    templateUrl: 'stis-user-parameters.component.html'
})

export class UserParametersComponent {
    stisAppId: number = EnumApps.StockIssue;
}