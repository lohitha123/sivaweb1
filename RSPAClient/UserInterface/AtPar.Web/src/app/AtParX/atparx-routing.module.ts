import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
} from './index';

export const routes: Routes = [
    {
        path: '',
        component: AtParXComponent,
        children: [
            { path: 'createorders', component: CreateOrdersComponent },
            { path: 'departmentdeviceallocation', component: DepartmentDeviceAllocationComponent },
            { path: 'departmentlocationallocation', component: DepartmentLocationAllocationComponent },
            {
                path: 'departmentuserallocation', component: DepartmentUserAllocationComponent,
                children: [
                    { path: '', component: DepartmentUserAllocationHomeComponent },
                    { path: 'assign', component: DepartmentUserAllocationAssignComponent }

                ]
            },
            { path: 'setupdepartments', component: SetupDepartmentsComponent },
            { path: 'manageparlocation', component: ManageParLocationComponent },
            { path: 'processes', component: ProcessesComponent },
            { path: 'setupparlocations', component: SetupParLocationsComponent },
            { path: 'setupdropofflocations', component: SetupDropOffLocationComponent },
            { path: 'setupreasons', component: SetupReasonsComponent },
            { path: 'userparameters', component: UserParametersComponent },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AtParXRoutingModule { }

