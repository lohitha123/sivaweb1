import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit, ViewChild, Input } from '@angular/core';
import { EnumApps } from '../Shared/AtParEnums'; 

declare var module: {
    id: string;
}

@Component({
  
    templateUrl: 'pou-manage-par-location.component.html',
  
})

export class ManageParLocationComponent {
    POUAppId: number = EnumApps.PointOfUse;

}