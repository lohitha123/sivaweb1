import { Component } from '@angular/core';
import { EnumApps } from '../Shared/AtParEnums';

@Component({
    templateUrl: './app/Receiving/recv-user-parameters.component.html'
})

export class UserParametersComponent {
    recvAppId: number = EnumApps.Receiving;
}