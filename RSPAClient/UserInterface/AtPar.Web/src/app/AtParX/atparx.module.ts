import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    AtParXComponent,
    CreateOrdersComponent,
    DepartmentDeviceAllocationComponent,
    DepartmentLocationAllocationComponent,
    SetupDepartmentsComponent,
    ManageParLocationComponent,
    ProcessesComponent,
    SetupParLocationsComponent,
    SetupDropOffLocationComponent,
    SetupReasonsComponent,
    UserParametersComponent,
    DepartmentUserAllocationComponent,
    DepartmentUserAllocationHomeComponent,
    DepartmentUserAllocationAssignComponent
    //AtParXRoutingModule
} from './index';
import { AtParXRoutingModule } from './atparx-routing.module';

import { SharedModule } from '../Shared/shared.module';


@NgModule({
    imports: [
        AtParXRoutingModule,
        SharedModule
    ],
    declarations: [
        AtParXComponent,
        CreateOrdersComponent,
        DepartmentDeviceAllocationComponent,
        DepartmentLocationAllocationComponent,
        DepartmentUserAllocationComponent,
        SetupDepartmentsComponent,
        SetupDropOffLocationComponent,
        SetupParLocationsComponent,
        SetupReasonsComponent,
        UserParametersComponent,
        ProcessesComponent,
        ManageParLocationComponent,
        DepartmentUserAllocationHomeComponent,
        DepartmentUserAllocationAssignComponent
    ]
})

export class AtParXModule { }

