 

import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { TrackitLoginComponent } from './trackit.login.component';
import { TrackItLoginRoutingModule } from './trackit.login.routes';
import { SharedModule } from '../Shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        TrackItLoginRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],

    declarations: [
        TrackitLoginComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],

})

export class TrackitLoginModule { }
