import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { BinToBinComponent } from './bintobin.component';

import { BinAllocateInventoryBusinessUnitsComponent } from './btbn-allocate-inventory-business-units.component';
import { UserParametersComponent } from './btbn-user-parameters.component';


export const routes: Routes = [
    {
        path: '',
        component: BinToBinComponent,
        children: [
            { path: 'allocateinventorybusinessunits', component: BinAllocateInventoryBusinessUnitsComponent },
            { path: 'userparameters', component: UserParametersComponent },

        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class BinToBinRoutingModule { }

