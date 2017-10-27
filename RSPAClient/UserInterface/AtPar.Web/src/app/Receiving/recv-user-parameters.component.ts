import { Component } from '@angular/core';
import { EnumApps } from '../Shared/AtParEnums';

declare var module: {
    id: string;
}

@Component({
    templateUrl: 'recv-user-parameters.component.html'
})

export class UserParametersComponent {
    recvAppId: number = EnumApps.Receiving;
}