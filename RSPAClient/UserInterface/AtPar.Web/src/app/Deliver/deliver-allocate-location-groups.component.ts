import { Component } from '@angular/core';
import { EnumApps } from '../Shared/AtParEnums';
declare var module: {
    id: string;
}

@Component({
    templateUrl: 'deliver-allocate-location-groups.component.html'
})

export class AllocateLocationGroupsComponent {
    deliverAppId: number = EnumApps.Deliver;
} 
