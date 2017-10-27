import { Component } from '@angular/core';
import { EnumApps } from '../Shared/AtParEnums';
declare var module: {
    id: string;
}

@Component({
  
    templateUrl: 'atparx-dept-user-alloc-home.component.html'
})

export class DepartmentUserAllocationHomeComponent {
    atParXAppId: number = EnumApps.Pharmacy;
}