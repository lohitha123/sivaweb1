import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './index';

export const routes: Routes = [
    { path: '', component: LoginComponent, data: {title:'Login'} },
    { path: '/:psystemid', component: LoginComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class LoginRoutingModule {


}

