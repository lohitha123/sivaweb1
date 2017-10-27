
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit, ViewChild, Input } from '@angular/core';
import { EnumApps } from '../Shared/AtParEnums';

declare var module: {
    id: string;
}

@Component({
  
    templateUrl: 'pick-allocate-location-groups.component.html'
    

})

export class AllocateLocationGroupsComponent  {
    pickPlanAppId: number = EnumApps.PickPlan;
   
} 
