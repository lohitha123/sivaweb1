"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var HttpService_1 = require("./HttpService");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var doublecalendar_1 = require("../components/doublecalendar/doublecalendar");
var calendar_1 = require("../components/calendar/calendar");
var tabs_1 = require("../components/tabcomponent/tabs");
var tab_1 = require("../components/tabcomponent/tab");
var dialog_1 = require("../components/dialog/dialog");
var confirmdialog_1 = require("../components/confirmdialog/confirmdialog");
var growl_1 = require("../components/growl/growl");
var angular2_datatable_1 = require("angular2-datatable");
var datatable_1 = require("../components/datatable/datatable");
var tooltip_1 = require("../components/tooltip/tooltip");
var customtextboxmodule_1 = require("../common/textbox/customtextboxmodule");
var app_RadioGroupComponent_1 = require("../Common/RadioGroup/app.RadioGroupComponent");
var app_DropdownComponent_1 = require("../Common/DropDown/app.DropdownComponent");
var autocomplete_client_1 = require("../components/autocomplete/autocomplete-client/autocomplete-client");
var autocomplete_server_1 = require("../components/autocomplete/autocomplete-server/autocomplete-server");
var domhandler_1 = require("../common/dom/domhandler");
var dropdown_1 = require("../components/dropdown/dropdown");
var radiobutton_1 = require("../components/radiobutton/radiobutton");
var switch_1 = require("../components/switch/switch");
var atpardiv_1 = require("../components/atpardiv/atpardiv");
var atpartextbox_1 = require("../components/textbox/atpartextbox");
var atpartext_1 = require("../components/atpartext/atpartext");
var atpar_textbox_enable_disable_component_1 = require("../components/textbox/atpar-textbox-enable-disable.component");
var AtParSharedDataService_1 = require("../Shared/AtParSharedDataService");
//import { UserParametersComponent } from '../init/atpar-user-parameters.component';
//import { AtParCarrierInformationComponent } from '../init/atpar-carrier-information.component';
var dragdrop_1 = require("../components/dragdrop/dragdrop");
//import { ReleaseOrdersComponent } from '../init/atpar-release-oder.component';
var leftbar_animation_service_1 = require("../Home/leftbar-animation.service");
var SharedModule = SharedModule_1 = (function () {
    function SharedModule() {
    }
    SharedModule.forRoot = function () {
        return {
            ngModule: SharedModule_1,
            providers: [event_spinner_service_1.SpinnerService]
        };
    };
    return SharedModule;
}());
SharedModule = SharedModule_1 = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            doublecalendar_1.DoubleCalendarModule,
            calendar_1.CalendarModule,
            radiobutton_1.RadioButtonModule,
            dialog_1.DialogModule,
            confirmdialog_1.ConfirmDialogModule,
            growl_1.GrowlModule,
            angular2_datatable_1.DataTableModule,
            datatable_1.AtParDataTableModule,
            customtextboxmodule_1.CustomTextBoxModule,
            autocomplete_client_1.AutoCompleteClientModule,
            autocomplete_server_1.AutoCompleteServerModule,
            tooltip_1.TooltipModule,
            dropdown_1.DropdownModule,
            switch_1.SwitchModule,
            forms_1.ReactiveFormsModule,
            dragdrop_1.DragDropModule
        ],
        declarations: [
            tab_1.Tab,
            tabs_1.Tabs,
            app_RadioGroupComponent_1.RadioGroupComponent,
            app_DropdownComponent_1.DropDownComponent,
            atpardiv_1.Atpardiv,
            atpartextbox_1.AtParTextBoxComponent,
            //UserParametersComponent,
            //AtParCarrierInformationComponent,
            //ReleaseOrdersComponent,
            atpar_textbox_enable_disable_component_1.AtParTextBoxEnableDisableComponent,
            atpartext_1.AtParTextComponent
        ],
        exports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            doublecalendar_1.DoubleCalendarModule,
            calendar_1.CalendarModule,
            radiobutton_1.RadioButtonModule,
            dialog_1.DialogModule,
            confirmdialog_1.ConfirmDialogModule,
            growl_1.GrowlModule,
            angular2_datatable_1.DataTableModule,
            datatable_1.AtParDataTableModule,
            customtextboxmodule_1.CustomTextBoxModule,
            autocomplete_client_1.AutoCompleteClientModule,
            autocomplete_server_1.AutoCompleteServerModule,
            tab_1.Tab,
            tabs_1.Tabs,
            app_RadioGroupComponent_1.RadioGroupComponent,
            app_DropdownComponent_1.DropDownComponent,
            tooltip_1.TooltipModule,
            dropdown_1.DropdownModule,
            switch_1.SwitchModule,
            atpardiv_1.Atpardiv,
            atpartextbox_1.AtParTextBoxComponent,
            //UserParametersComponent,
            //AtParCarrierInformationComponent,
            //ReleaseOrdersComponent,
            forms_1.ReactiveFormsModule,
            atpar_textbox_enable_disable_component_1.AtParTextBoxEnableDisableComponent,
            atpartext_1.AtParTextComponent,
            dragdrop_1.DragDropModule
        ],
        providers: [
            HttpService_1.HttpService,
            domhandler_1.DomHandler,
            AtParSharedDataService_1.AtParSharedDataService,
            leftbar_animation_service_1.LeftBarAnimationService
        ]
    })
], SharedModule);
exports.SharedModule = SharedModule;
var SharedModule_1;
//# sourceMappingURL=shared.module.js.map