﻿import { Component } from '@angular/core';
import { EnumApps } from '../Shared/AtParEnums';

declare var module: {
    id: string;
}
@Component({
  
    templateUrl: 'atparx-dept-user-alloc-assign.component.html'
})

export class DepartmentUserAllocationAssignComponent {
    atParXAppId: number = EnumApps.Pharmacy;
}