import { Component } from '@angular/core';
import { EnumApps } from '../Shared/AtParEnums';

declare var module: {
    id: string;
}

@Component({
  
    templateUrl:'atparx-setup-par-locations.component.html'
})

export class SetupParLocationsComponent {
    atparXAppId: number = EnumApps.Pharmacy;
}