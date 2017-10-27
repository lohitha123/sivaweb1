import { Component } from '@angular/core';
import { EnumApps } from '../Shared/AtParEnums';

@Component({
    templateUrl: './app/Deliver/deliver-carrier-information.component.html'
})

export class CarrierInformationComponent {
    dlvrAppId: number = EnumApps.Deliver;
} 
