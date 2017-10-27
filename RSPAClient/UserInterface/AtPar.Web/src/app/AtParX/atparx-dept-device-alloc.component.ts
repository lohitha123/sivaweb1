import { Component } from '@angular/core';
import { EnumApps } from '../Shared/AtParEnums';

declare var module: {
    id: string;
}

@Component({
  
    templateUrl: 'atparx-dept-device-alloc.component.html'
})

export class DepartmentDeviceAllocationComponent {
    atParXAppId: number = EnumApps.Pharmacy;

}