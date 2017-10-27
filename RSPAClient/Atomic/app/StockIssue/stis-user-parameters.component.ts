import { Component } from '@angular/core';
import { EnumApps } from '../Shared/AtParEnums';

@Component({
    templateUrl: './app/StockIssue/stis-user-parameters.component.html'
})

export class UserParametersComponent {
    stisAppId: number = EnumApps.StockIssue;
}