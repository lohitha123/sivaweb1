 
import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from './HttpService';
import { TkitHttpService } from './tkitHttpService';

import { SpinnerService } from '../components/spinner/event.spinner.service';
import { DoubleCalendarModule } from '../components/doublecalendar/doublecalendar';
import { AtparCalendarModule } from '../components/calendar/atparcalendar';
import { Tabs } from '../components/tabcomponent/tabs';
import { Tab } from '../components/tabcomponent/tab';
import { MinusSignToParens } from '../components/custompipes/minus-sign-to-parens.pipe'
import { DialogModule } from '../components/dialog/dialog';
import { MailDialogModule } from '../components/maildialog/maildialog';
import { ConfirmDialogModule } from '../components/confirmdialog/confirmdialog';
import { GrowlModule } from '../components/growl/growl';
//import { DataTableModule } from "angular2-datatable";
import { MultiSelectModule } from '../components/multiselect/multiselect';
import { AtParDataTableModule } from '../components/datatable/datatable';
import { ListboxModule } from '../components/listbox/listbox';
import { TooltipModule } from '../components/tooltip/tooltip';
//import { CustomTextBoxModule } from '../common/textbox/CustomTextBoxModule';
import { RadioGroupComponent } from '../Common/RadioGroup/app.RadioGroupComponent';
import { DropDownComponent } from '../Common/DropDown/app.DropdownComponent';
import { AutoCompleteClientModule } from '../components/autocomplete/autocomplete-client/autocomplete-client';
import { AutoCompleteServerModule } from '../components/autocomplete/autocomplete-server/autocomplete-server';
import { AutoCompleteSearchModule } from '../components/autocomplete/autocomplete-search/autocomplete-search';
import { DomHandler } from '../common/dom/domhandler';
import { DropdownModule } from '../components/dropdown/dropdown';
import { DropdownInGridModule } from '../components/dropdown/dropdownforgrid';
import { RadioButtonModule } from '../components/radiobutton/radiobutton';
import { SwitchModule } from '../components/switch/switch';
import { Atpardiv } from '../components/atpardiv/atpardiv';
import { AtParTextBoxComponent } from '../components/textbox/atpartextbox';
import { AtParTextComponent } from '../components/atpartext/atpartext';
import { AtParTextBoxEnableDisableComponent } from '../components/textbox/atpar-textbox-enable-disable.component';
import { AtParSharedDataService } from "../Shared/AtParSharedDataService";

import { UserParametersComponent } from '../Init/atpar-user-parameters.component';
import { DepartmentUserAllocationHomeComponent } from '../PointOfUse/pou-department-user-allocation.home.component';
import { DepartmentUserAllocationAssignComponent } from '../PointOfUse/pou-department-user-allocation.Assign.component';
import { AtParCarrierInformationComponent } from '../init/atpar-carrier-information.component';
import { DragDropModule } from '../components/dragdrop/dragdrop'
import { ReleaseOrdersComponent } from '../init/atpar-release-oder.component';
import { AllocateLocationGroupsComponent } from '../init/atpar-allocate-location-groups.component';
import { ProcessParametersComponent } from '../PointOfUse/pou-process-parameters.component';

import { LeftBarAnimationService } from '../Home/leftbar-animation.service';
import { SetupReasonsComponent } from '../init/atpar-setup-reasons.component';
import { DepartmentDeviceAllocationComponent } from '../PointOfUse/pou-department-device-allocation.component';
import { CreateOrdersComponent } from '../PointOfUse/create-orders.component';
import { AtParTextForGridComponent } from '../components/atpartext/atpartextforgrid';
import { AtparSetupParLocationsComponent } from '../init/atpar-setup-par-locations.component';
import { DepartmentLocationAllocationComponent } from '../PointOfUse/pou-department-location-allocation.component';
import { ManageParLocationComponent } from '../init/atpar-manage-par-location.component';
import { ManageOrdersComponent } from '../init/atpar-manage-orders.component';
import { ChartModule } from '../components/Chart/Chart';
import { LargeRadioButtonModule } from '../components/largeradiobutton/largeradiobutton';
import { AtParActivityReportComponent } from '../Init/atpar-activity-report.component';
import { POUReportTabs } from '../components/tabcomponent/tabs-pou';
import { ColSpanDirective } from '../components/datatable/customerow';
import { yearviewcalender } from '../components/calendar/yearview-calender';
import { ModalComponent } from '../components/modal/modal';

import { RadioModule } from '../components/radio/radio';


@NgModule({

    imports: [
        CommonModule,
        FormsModule,
        DoubleCalendarModule,
        AtparCalendarModule,
        RadioButtonModule,
        DialogModule,
        MailDialogModule,
        ConfirmDialogModule,
        GrowlModule,
       // DataTableModule,
        AtParDataTableModule,
        //CustomTextBoxModule,
        AutoCompleteClientModule,
        AutoCompleteServerModule,
        TooltipModule,
        DropdownModule,
        DropdownInGridModule,
        SwitchModule,
        ReactiveFormsModule,
        DragDropModule,
        AutoCompleteSearchModule,
        ListboxModule,
        ChartModule,
        LargeRadioButtonModule,
        MultiSelectModule,
        RadioModule
     

    ],

    declarations: [
        Tab,
        Tabs,
        MinusSignToParens,
        POUReportTabs,
        RadioGroupComponent,
        DropDownComponent,
        Atpardiv,
        AtParTextBoxComponent,
        UserParametersComponent,
        AtParCarrierInformationComponent,
        ReleaseOrdersComponent,
        AllocateLocationGroupsComponent,
        AtParTextBoxEnableDisableComponent,
        AtParTextComponent,
        SetupReasonsComponent,
        AtparSetupParLocationsComponent,
        DepartmentUserAllocationHomeComponent,
        DepartmentUserAllocationAssignComponent,        
        DepartmentDeviceAllocationComponent,
        CreateOrdersComponent,
        ProcessParametersComponent,
        AtParTextForGridComponent,
        DepartmentLocationAllocationComponent,
        ManageParLocationComponent,
        DepartmentLocationAllocationComponent,
        DepartmentLocationAllocationComponent,
        ManageOrdersComponent,
        AtParActivityReportComponent,
        ColSpanDirective,
        yearviewcalender,
        ModalComponent
    
    ],

    exports: [
        CommonModule,
        FormsModule,
        DoubleCalendarModule,
        AtparCalendarModule,
        RadioButtonModule,
        DialogModule,
        MailDialogModule,
        ConfirmDialogModule,
        GrowlModule,
       // DataTableModule,
        AtParDataTableModule,
        //CustomTextBoxModule,
        AutoCompleteClientModule,
        AutoCompleteServerModule,
        Tab,
        Tabs,
        MinusSignToParens,
        POUReportTabs,
        RadioGroupComponent,
        DropDownComponent,
        TooltipModule,
        DropdownModule,
        DropdownInGridModule,
        SwitchModule,
        Atpardiv,
        AtParTextBoxComponent,
        UserParametersComponent,
        AtParCarrierInformationComponent,
        ReleaseOrdersComponent,
        AllocateLocationGroupsComponent,
        ReactiveFormsModule,
        AtParTextBoxEnableDisableComponent,
        AtParTextComponent,
        DragDropModule,
        SetupReasonsComponent,
        AtparSetupParLocationsComponent,
        DepartmentUserAllocationHomeComponent,
        DepartmentUserAllocationAssignComponent,        
        DepartmentDeviceAllocationComponent,
        CreateOrdersComponent,        
        AutoCompleteSearchModule,
        ProcessParametersComponent,
        AtParTextForGridComponent,
        DepartmentLocationAllocationComponent,
        ManageParLocationComponent,
        DepartmentLocationAllocationComponent,
        DepartmentLocationAllocationComponent,
        ManageOrdersComponent,
        ListboxModule,
        ChartModule,
        LargeRadioButtonModule,
        AtParActivityReportComponent,
        ColSpanDirective,
        yearviewcalender,
        MultiSelectModule,
        ModalComponent,
        RadioModule
     
      
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        HttpService,
        DomHandler,
        AtParSharedDataService,
        LeftBarAnimationService,
        TkitHttpService
    ]

})

export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [SpinnerService]
        };
    }
}