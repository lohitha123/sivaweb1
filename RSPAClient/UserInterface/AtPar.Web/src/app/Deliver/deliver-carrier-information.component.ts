import { Component } from '@angular/core';
import { EnumApps } from '../Shared/AtParEnums';

declare var module: {
    id: string;
}

@Component({
    templateUrl: 'deliver-carrier-information.component.html'
})

export class CarrierInformationComponent {
    dlvrAppId: number = EnumApps.Deliver;
} 
