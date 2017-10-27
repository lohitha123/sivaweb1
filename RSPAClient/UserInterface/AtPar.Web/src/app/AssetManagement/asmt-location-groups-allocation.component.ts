import { Component } from '@angular/core';
import { EnumApps } from '../Shared/AtParEnums';

declare var module: {
    id: string;
}
@Component({
  
    templateUrl: 'asmt-location-groups-allocation.component.html'
})

export class LocationGroupsAllocationComponent {
    assetManagementAppId: number = EnumApps.AssetManagement;
} 