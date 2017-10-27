

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { DeliveryTrackingComponent } from './deliver-track-report.component';
import { DeliveryTrackingRoutingModule } from './deliver-track-report.routes';
import { SharedModule } from '../Shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        DeliveryTrackingRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],

    declarations: [
        DeliveryTrackingComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],

})

export class DeliveryTrackingModule { }
