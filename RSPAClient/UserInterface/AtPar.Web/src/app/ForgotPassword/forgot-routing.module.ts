import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotComponent } from './index';

export const routes: Routes = [
    {
        path: '',
        component: ForgotComponent,
        data: { title: 'forgot password' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ForgotRoutingModule { }
