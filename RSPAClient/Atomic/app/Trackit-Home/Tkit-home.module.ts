import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
//import { RippleDirective } from 'ng2-ripple-directive';

import { BodyModule } from './Tkit-Body/body.module';

import { TkitHomeComponent } from './Tkit-home.component';
import { HomeModule } from '../Home/home.module';
//import { DialogModule } from '../components/dialog/dialog';
import { TopBarComponent } from './Tkit-Top/topbar.component';

@NgModule({

    imports: [
        CommonModule,
        FormsModule,
        BodyModule,
        RouterModule,
        HomeModule,
        //SwitchModule,
        //DialogModule,
        //ConfirmDialogModule,
        //DropdownModule,
        //RadioButtonModule,
        //AtParDataTableModule,
        //TooltipModule,
        //GrowlModule,
        //CalendarModule,
        //DoubleCalendarModule,
        //AutoCompleteClientModule,
        //InputSwitchModule,
    ],

    declarations: [
        TkitHomeComponent,
        TopBarComponent,
       
    ],
    exports: [
        TkitHomeComponent,
        TopBarComponent
    ]
})

export class TkitHomeModule { }
