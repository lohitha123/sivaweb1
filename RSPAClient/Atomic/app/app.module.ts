/// <reference path="init/atpar-setup-vendors.component.ts" />

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
//import { ModalComponent } from './components/modal/modal';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
//import { MenuComponent } from './AtPar/Menus/MenusComponent';
import { HttpModule, JsonpModule } from '@angular/http';
//import { DataTableModule } from "angular2-datatable";
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy, APP_BASE_HREF } from '@angular/common';
import { LoginComponent } from './login/login.component';
//import { SetupItemsComponent } from './init/atpar-setup-items.component';
import { DomHandler } from './common/dom/domhandler';
import { CustomTextBoxModule } from './common/textbox/customtextboxmodule';
import { RadioGroupComponent } from './Common/RadioGroup/app.RadioGroupComponent';
import { DropdownModule } from './components/dropdown/dropdown';
import { DropdownpModule } from './components/dropdownp/dropdownp';
import { CalendarModule } from './components/calendar/calendar';
//import { SwitchModule } from './components/switch/switch';
import { DialogModule } from './components/dialog/dialog';
import { AtParDataTableModule } from './components/datatable/datatable';
import { ConfirmDialogModule } from './components/confirmdialog/confirmdialog';
import { GrowlModule } from './components/growl/growl';
import { AccordionModule } from './components/accordion/accordion';
import { RadioButtonModule } from './components/radiobutton/radiobutton';
//import { UserUploadAutomationComponent } from './init/atpar-user-upload-automation.component';
//import { UserStatusReportComponent } from './init/atpar-user-status-report.component';
//import { AutoCompleteClientModule } from './components/autocomplete/autocomplete-client/autocomplete-client';
//import { AutoCompleteServerModule } from './components/autocomplete/autocomplete-server/autocomplete-server';
//import { InitImports } from './Init/InitImports';
import { SetupVendorsComponent } from './init/atpar-setup-vendors.component';
import { SpinnerComponent } from './components/spinner/spinner-component';
import { SpinnerService } from './components/spinner/spinner-service';
import { BlockUIModule } from './components/spinner/blockui';
//import { SwitchModule } from './components/switch/switch';
import { HomeModule } from './Home/home.module';
import { TkitHomeModule } from './Trackit-Home/Tkit-home.module';
import { AppRoutingModule } from './app-routing.module';


@NgModule({

    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        JsonpModule,
        RouterModule,
        CustomTextBoxModule,
        CalendarModule,
        //DataTableModule,
        BlockUIModule,
        HomeModule,
        TkitHomeModule,
        AppRoutingModule,
        DialogModule,
        DropdownpModule,
        ConfirmDialogModule,
        GrowlModule,
        RadioButtonModule,
        DropdownModule,
        AccordionModule,
        //SwitchModule,
        //AutoCompleteServerModule, AutoCompleteClientModule, 
        AtParDataTableModule
    ],
    declarations: [
        AppComponent,
       // MenuComponent,
        RadioGroupComponent,
        SetupVendorsComponent,
        SpinnerComponent,
        //UserUploadAutomationComponent, UserStatusReportComponent,
        LoginComponent,
        //SetupItemsComponent
    ],

    bootstrap: [AppComponent],

   // schemas: [CUSTOM_ELEMENTS_SCHEMA],

    providers: [SpinnerService,
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        //{ provide: LocationStrategy, useClass: HashLocationStrategy },
        
    ]
})
export class AppModule { }







