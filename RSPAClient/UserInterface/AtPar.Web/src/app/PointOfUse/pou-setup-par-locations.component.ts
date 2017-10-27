import { Component } from '@angular/core';
import { EnumApps } from '../Shared/AtParEnums';

declare var module: {
    id: string;
}
@Component({
  
    templateUrl: 'pou-setup-par-locations.component.html'
})



export class SetupParLocationsComponent {
    pouAppId: number = EnumApps.PointOfUse;
} 
