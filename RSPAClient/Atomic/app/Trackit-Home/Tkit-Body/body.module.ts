import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '@angular/common';
import { BodyComponent } from './body.component';
import { WarehouseComponent } from './warehouse.component';

import { LeftBarComponent } from '../Tkit-Left/leftbar.component';


@NgModule({

    imports: [
        CommonModule,
        RouterModule
       
    ],

    declarations: [
        BodyComponent,
        WarehouseComponent,
        LeftBarComponent
      
    ],
    exports: [
        BodyComponent,
        WarehouseComponent,
        LeftBarComponent
        
    ]
})

export class BodyModule { }
