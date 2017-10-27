
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login.routes';
import { SharedModule} from '../Shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],

    declarations: [
        LoginComponent,
    ],

})

export class LoginModule {


}
