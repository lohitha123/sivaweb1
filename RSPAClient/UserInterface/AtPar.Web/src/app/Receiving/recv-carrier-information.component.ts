import { Component } from '@angular/core';
import { EnumApps } from '../Shared/AtParEnums';
declare var module: {
    id: string;
}
@Component({
    templateUrl: 'recv-carrier-information.component.html' 
})

export class CarrierInformationComponent {
    recvAppId: number = EnumApps.Receiving;    
} 
