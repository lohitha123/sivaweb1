import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TkitLoginComponent } from './Tkit-login.component';
import { TkitLoginRoutingModule } from './Tkit-login.routes';
@NgModule({
    imports: [
        CommonModule,
        TkitLoginRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],

    declarations: [
        TkitLoginComponent,
    ],

})

export class TkitLoginModule { }
