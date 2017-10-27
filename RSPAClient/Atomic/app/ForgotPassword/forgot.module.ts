import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotComponent, ForgotRoutingModule } from './index';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        ForgotRoutingModule
    ],
    declarations: [ForgotComponent],
    exports: [ForgotComponent]
})

export class ForgotModule { }
