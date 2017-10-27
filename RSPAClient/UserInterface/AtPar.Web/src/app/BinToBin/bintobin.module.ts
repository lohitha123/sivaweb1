import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BinToBinComponent } from './bintobin.component';
import { BinAllocateInventoryBusinessUnitsComponent } from './btbn-allocate-inventory-business-units.component';
import { UserParametersComponent } from './btbn-user-parameters.component';

import { BinToBinRoutingModule } from './bintobin-routing.module';
import { SharedModule } from '../Shared/shared.module';


@NgModule({
    imports: [
        BinToBinRoutingModule,
        SharedModule
    ],
    declarations: [
        BinToBinComponent,
        BinAllocateInventoryBusinessUnitsComponent,
        UserParametersComponent
    ]
})

export class BinToBinModule { }

