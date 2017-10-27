
import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { BodyComponent } from './body.component';
//import { WarehouseComponent } from './warehouse.component';

export const BodyRoutes: Route[] = [
    { path: '', component: BodyComponent },
    //{ path: 'warehouse', component: WarehouseComponent }
]
