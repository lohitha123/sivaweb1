
 
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TrackitLoginComponent } from './trackit.login.component'

export const routes: Routes = [
    { path: '', component: TrackitLoginComponent, data: { title: 'trackitlogin' } }
  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class TrackItLoginRoutingModule { }

