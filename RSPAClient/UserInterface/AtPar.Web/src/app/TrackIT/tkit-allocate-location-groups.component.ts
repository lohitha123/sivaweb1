import { Component } from '@angular/core';
import { EnumApps } from '../Shared/AtParEnums';
declare var module: {
    id: string;
}
@Component({
  
    templateUrl: 'tkit-allocate-location-groups.component.html'
})

export class AllocateLocationGroupsComponent {
    trackITAppId: number = EnumApps.TrackIT;
} 