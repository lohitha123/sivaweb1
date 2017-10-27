import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login.routes';
@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],

    declarations: [
        LoginComponent,
    ],

})

export class LoginModule { }
