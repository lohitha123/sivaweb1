import { Component } from '@angular/core';
import { EnumApps } from '../Shared/AtParEnums';

declare var module: {
    id: string;
}
@Component({
  
    templateUrl: 'atparx-dept-location-alloc.component.html'
})

export class DepartmentLocationAllocationComponent {
    atParXAppId: number = EnumApps.Pharmacy;
}