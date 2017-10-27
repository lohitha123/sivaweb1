import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TkitLoginComponent } from './index';

export const routes: Routes = [
    {
        path: '',
        component: TkitLoginComponent,
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})


export class TkitLoginRoutingModule { }

