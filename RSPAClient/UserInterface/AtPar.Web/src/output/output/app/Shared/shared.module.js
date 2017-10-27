"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var HttpService_1 = require("./HttpService");
var tkitHttpService_1 = require("./tkitHttpService");
var event_spinner_service_1 = require("../components/spinner/event.spinner.service");
var doublecalendar_1 = require("../components/doublecalendar/doublecalendar");
var atparcalendar_1 = require("../components/calendar/atparcalendar");
var tabs_1 = require("../components/tabcomponent/tabs");
var tab_1 = require("../components/tabcomponent/tab");
var dialog_1 = require("../components/dialog/dialog");
var maildialog_1 = require("../components/maildialog/maildialog");
var confirmdialog_1 = require("../components/confirmdialog/confirmdialog");
var growl_1 = require("../components/growl/growl");
//import { DataTableModule } from "angular2-datatable";
var multiselect_1 = require("../components/multiselect/multiselect");
var datatable_1 = require("../components/datatable/datatable");
var listbox_1 = require("../components/listbox/listbox");
var tooltip_1 = require("../components/tooltip/tooltip");
//import { CustomTextBoxModule } from '../common/textbox/CustomTextBoxModule';
var app_RadioGroupComponent_1 = require("../Common/RadioGroup/app.RadioGroupComponent");
var app_DropdownComponent_1 = require("../Common/DropDown/app.DropdownComponent");
var autocomplete_client_1 = require("../components/autocomplete/autocomplete-client/autocomplete-client");
var autocomplete_server_1 = require("../components/autocomplete/autocomplete-server/autocomplete-server");
var autocomplete_search_1 = require("../components/autocomplete/autocomplete-search/autocomplete-search");
var domhandler_1 = require("../common/dom/domhandler");
var dropdown_1 = require("../components/dropdown/dropdown");
var dropdownforgrid_1 = require("../components/dropdown/dropdownforgrid");
var radiobutton_1 = require("../components/radiobutton/radiobutton");
var switch_1 = require("../components/switch/switch");
var atpardiv_1 = require("../components/atpardiv/atpardiv");
var atpartextbox_1 = require("../components/textbox/atpartextbox");
var atpartext_1 = require("../components/atpartext/atpartext");
var atpar_textbox_enable_disable_component_1 = require("../components/textbox/atpar-textbox-enable-disable.component");
var AtParSharedDataService_1 = require("../Shared/AtParSharedDataService");
var atpar_user_parameters_component_1 = require("../Init/atpar-user-parameters.component");
var pou_department_user_allocation_home_component_1 = require("../PointOfUse/pou-department-user-allocation.home.component");
var pou_department_user_allocation_Assign_component_1 = require("../PointOfUse/pou-department-user-allocation.Assign.component");
var atpar_carrier_information_component_1 = require("../init/atpar-carrier-information.component");
var dragdrop_1 = require("../components/dragdrop/dragdrop");
var atpar_release_oder_component_1 = require("../init/atpar-release-oder.component");
var atpar_allocate_location_groups_component_1 = require("../init/atpar-allocate-location-groups.component");
var pou_process_parameters_component_1 = require("../PointOfUse/pou-process-parameters.component");
var leftbar_animation_service_1 = require("../Home/leftbar-animation.service");
var atpar_setup_reasons_component_1 = require("../init/atpar-setup-reasons.component");
var pou_department_device_allocation_component_1 = require("../PointOfUse/pou-department-device-allocation.component");
var create_orders_component_1 = require("../PointOfUse/create-orders.component");
var atpartextforgrid_1 = require("../components/atpartext/atpartextforgrid");
var atpar_setup_par_locations_component_1 = require("../init/atpar-setup-par-locations.component");
var pou_department_location_allocation_component_1 = require("../PointOfUse/pou-department-location-allocation.component");
var atpar_manage_par_location_component_1 = require("../init/atpar-manage-par-location.component");
var atpar_manage_orders_component_1 = require("../init/atpar-manage-orders.component");
var Chart_1 = require("../components/Chart/Chart");
var largeradiobutton_1 = require("../components/largeradiobutton/largeradiobutton");
var atpar_activity_report_component_1 = require("../Init/atpar-activity-report.component");
var tabs_pou_1 = require("../components/tabcomponent/tabs-pou");
var customerow_1 = require("../components/datatable/customerow");
var yearview_calender_1 = require("../components/calendar/yearview-calender");
var modal_1 = require("../components/modal/modal");
var radio_1 = require("../components/radio/radio");
var SharedModule = (function () {
    function SharedModule() {
    }
    SharedModule_1 = SharedModule;
    SharedModule.forRoot = function () {
        return {
            ngModule: SharedModule_1,
            providers: [event_spinner_service_1.SpinnerService]
        };
    };
    SharedModule = SharedModule_1 = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                doublecalendar_1.DoubleCalendarModule,
                atparcalendar_1.AtparCalendarModule,
                radiobutton_1.RadioButtonModule,
                dialog_1.DialogModule,
                maildialog_1.MailDialogModule,
                confirmdialog_1.ConfirmDialogModule,
                growl_1.GrowlModule,
                // DataTableModule,
                datatable_1.AtParDataTableModule,
                //CustomTextBoxModule,
                autocomplete_client_1.AutoCompleteClientModule,
                autocomplete_server_1.AutoCompleteServerModule,
                tooltip_1.TooltipModule,
                dropdown_1.DropdownModule,
                dropdownforgrid_1.DropdownInGridModule,
                switch_1.SwitchModule,
                forms_1.ReactiveFormsModule,
                dragdrop_1.DragDropModule,
                autocomplete_search_1.AutoCompleteSearchModule,
                listbox_1.ListboxModule,
                Chart_1.ChartModule,
                largeradiobutton_1.LargeRadioButtonModule,
                multiselect_1.MultiSelectModule,
                radio_1.RadioModule
            ],
            declarations: [
                tab_1.Tab,
                tabs_1.Tabs,
                tabs_pou_1.POUReportTabs,
                app_RadioGroupComponent_1.RadioGroupComponent,
                app_DropdownComponent_1.DropDownComponent,
                atpardiv_1.Atpardiv,
                atpartextbox_1.AtParTextBoxComponent,
                atpar_user_parameters_component_1.UserParametersComponent,
                atpar_carrier_information_component_1.AtParCarrierInformationComponent,
                atpar_release_oder_component_1.ReleaseOrdersComponent,
                atpar_allocate_location_groups_component_1.AllocateLocationGroupsComponent,
                atpar_textbox_enable_disable_component_1.AtParTextBoxEnableDisableComponent,
                atpartext_1.AtParTextComponent,
                atpar_setup_reasons_component_1.SetupReasonsComponent,
                atpar_setup_par_locations_component_1.AtparSetupParLocationsComponent,
                pou_department_user_allocation_home_component_1.DepartmentUserAllocationHomeComponent,
                pou_department_user_allocation_Assign_component_1.DepartmentUserAllocationAssignComponent,
                pou_department_device_allocation_component_1.DepartmentDeviceAllocationComponent,
                create_orders_component_1.CreateOrdersComponent,
                pou_process_parameters_component_1.ProcessParametersComponent,
                atpartextforgrid_1.AtParTextForGridComponent,
                pou_department_location_allocation_component_1.DepartmentLocationAllocationComponent,
                atpar_manage_par_location_component_1.ManageParLocationComponent,
                pou_department_location_allocation_component_1.DepartmentLocationAllocationComponent,
                pou_department_location_allocation_component_1.DepartmentLocationAllocationComponent,
                atpar_manage_orders_component_1.ManageOrdersComponent,
                atpar_activity_report_component_1.AtParActivityReportComponent,
                customerow_1.ColSpanDirective,
                yearview_calender_1.yearviewcalender,
                modal_1.ModalComponent
            ],
            exports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                doublecalendar_1.DoubleCalendarModule,
                atparcalendar_1.AtparCalendarModule,
                radiobutton_1.RadioButtonModule,
                dialog_1.DialogModule,
                maildialog_1.MailDialogModule,
                confirmdialog_1.ConfirmDialogModule,
                growl_1.GrowlModule,
                // DataTableModule,
                datatable_1.AtParDataTableModule,
                //CustomTextBoxModule,
                autocomplete_client_1.AutoCompleteClientModule,
                autocomplete_server_1.AutoCompleteServerModule,
                tab_1.Tab,
                tabs_1.Tabs,
                tabs_pou_1.POUReportTabs,
                app_RadioGroupComponent_1.RadioGroupComponent,
                app_DropdownComponent_1.DropDownComponent,
                tooltip_1.TooltipModule,
                dropdown_1.DropdownModule,
                dropdownforgrid_1.DropdownInGridModule,
                switch_1.SwitchModule,
                atpardiv_1.Atpardiv,
                atpartextbox_1.AtParTextBoxComponent,
                atpar_user_parameters_component_1.UserParametersComponent,
                atpar_carrier_information_component_1.AtParCarrierInformationComponent,
                atpar_release_oder_component_1.ReleaseOrdersComponent,
                atpar_allocate_location_groups_component_1.AllocateLocationGroupsComponent,
                forms_1.ReactiveFormsModule,
                atpar_textbox_enable_disable_component_1.AtParTextBoxEnableDisableComponent,
                atpartext_1.AtParTextComponent,
                dragdrop_1.DragDropModule,
                atpar_setup_reasons_component_1.SetupReasonsComponent,
                atpar_setup_par_locations_component_1.AtparSetupParLocationsComponent,
                pou_department_user_allocation_home_component_1.DepartmentUserAllocationHomeComponent,
                pou_department_user_allocation_Assign_component_1.DepartmentUserAllocationAssignComponent,
                pou_department_device_allocation_component_1.DepartmentDeviceAllocationComponent,
                create_orders_component_1.CreateOrdersComponent,
                autocomplete_search_1.AutoCompleteSearchModule,
                pou_process_parameters_component_1.ProcessParametersComponent,
                atpartextforgrid_1.AtParTextForGridComponent,
                pou_department_location_allocation_component_1.DepartmentLocationAllocationComponent,
                atpar_manage_par_location_component_1.ManageParLocationComponent,
                pou_department_location_allocation_component_1.DepartmentLocationAllocationComponent,
                pou_department_location_allocation_component_1.DepartmentLocationAllocationComponent,
                atpar_manage_orders_component_1.ManageOrdersComponent,
                listbox_1.ListboxModule,
                Chart_1.ChartModule,
                largeradiobutton_1.LargeRadioButtonModule,
                atpar_activity_report_component_1.AtParActivityReportComponent,
                customerow_1.ColSpanDirective,
                yearview_calender_1.yearviewcalender,
                multiselect_1.MultiSelectModule,
                modal_1.ModalComponent,
                radio_1.RadioModule
            ],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                HttpService_1.HttpService,
                domhandler_1.DomHandler,
                AtParSharedDataService_1.AtParSharedDataService,
                leftbar_animation_service_1.LeftBarAnimationService,
                tkitHttpService_1.TkitHttpService
            ]
        })
    ], SharedModule);
    return SharedModule;
    var SharedModule_1;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map