/// <reference path="init/atpar-setup-vendors.component.ts" />
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_component_1 = require("./app.component");
//import { ModalComponent } from './components/modal/modal';
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
//import { MenuComponent } from './AtPar/Menus/MenusComponent';
var http_1 = require("@angular/http");
//import { DataTableModule } from "angular2-datatable";
var common_1 = require("@angular/common");
var login_component_1 = require("./login/login.component");
var customtextboxmodule_1 = require("./common/textbox/customtextboxmodule");
var app_RadioGroupComponent_1 = require("./Common/RadioGroup/app.RadioGroupComponent");
var dropdown_1 = require("./components/dropdown/dropdown");
var dropdownp_1 = require("./components/dropdownp/dropdownp");
var calendar_1 = require("./components/calendar/calendar");
//import { SwitchModule } from './components/switch/switch';
var dialog_1 = require("./components/dialog/dialog");
var datatable_1 = require("./components/datatable/datatable");
var confirmdialog_1 = require("./components/confirmdialog/confirmdialog");
var growl_1 = require("./components/growl/growl");
var accordion_1 = require("./components/accordion/accordion");
var radiobutton_1 = require("./components/radiobutton/radiobutton");
//import { UserUploadAutomationComponent } from './init/atpar-user-upload-automation.component';
//import { UserStatusReportComponent } from './init/atpar-user-status-report.component';
//import { AutoCompleteClientModule } from './components/autocomplete/autocomplete-client/autocomplete-client';
//import { AutoCompleteServerModule } from './components/autocomplete/autocomplete-server/autocomplete-server';
//import { InitImports } from './Init/InitImports';
var atpar_setup_vendors_component_1 = require("./init/atpar-setup-vendors.component");
var spinner_component_1 = require("./components/spinner/spinner-component");
var spinner_service_1 = require("./components/spinner/spinner-service");
var blockui_1 = require("./components/spinner/blockui");
//import { SwitchModule } from './components/switch/switch';
var home_module_1 = require("./Home/home.module");
var Tkit_home_module_1 = require("./Trackit-Home/Tkit-home.module");
var app_routing_module_1 = require("./app-routing.module");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            http_1.HttpModule,
            http_1.JsonpModule,
            router_1.RouterModule,
            customtextboxmodule_1.CustomTextBoxModule,
            calendar_1.CalendarModule,
            //DataTableModule,
            blockui_1.BlockUIModule,
            home_module_1.HomeModule,
            Tkit_home_module_1.TkitHomeModule,
            app_routing_module_1.AppRoutingModule,
            dialog_1.DialogModule,
            dropdownp_1.DropdownpModule,
            confirmdialog_1.ConfirmDialogModule,
            growl_1.GrowlModule,
            radiobutton_1.RadioButtonModule,
            dropdown_1.DropdownModule,
            accordion_1.AccordionModule,
            //SwitchModule,
            //AutoCompleteServerModule, AutoCompleteClientModule, 
            datatable_1.AtParDataTableModule
        ],
        declarations: [
            app_component_1.AppComponent,
            // MenuComponent,
            app_RadioGroupComponent_1.RadioGroupComponent,
            atpar_setup_vendors_component_1.SetupVendorsComponent,
            spinner_component_1.SpinnerComponent,
            //UserUploadAutomationComponent, UserStatusReportComponent,
            login_component_1.LoginComponent,
        ],
        bootstrap: [app_component_1.AppComponent],
        // schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [spinner_service_1.SpinnerService,
            { provide: common_1.APP_BASE_HREF, useValue: '/' },
            { provide: common_1.LocationStrategy, useClass: common_1.PathLocationStrategy },
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map