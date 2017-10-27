import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpService} from './HttpService';
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { DoubleCalendarModule } from '../components/doublecalendar/doublecalendar';
import { CalendarModule } from '../components/calendar/calendar';
import { Tabs } from '../components/tabcomponent/tabs';
import { Tab } from '../components/tabcomponent/tab';
import { DialogModule } from '../components/dialog/dialog';
import { ConfirmDialogModule } from '../components/confirmdialog/confirmdialog';
import { GrowlModule } from '../components/growl/growl';
import { DataTableModule } from "angular2-datatable";
import { AtParDataTableModule } from '../components/datatable/datatable';
import { TooltipModule } from '../components/tooltip/tooltip';
import { CustomTextBoxModule } from '../common/textbox/customtextboxmodule';
import { RadioGroupComponent } from '../Common/RadioGroup/app.RadioGroupComponent';
import { DropDownComponent } from '../Common/DropDown/app.DropdownComponent';
import { AutoCompleteClientModule } from '../components/autocomplete/autocomplete-client/autocomplete-client';
import { AutoCompleteServerModule } from '../components/autocomplete/autocomplete-server/autocomplete-server';
import { DomHandler } from '../common/dom/domhandler';
import { DropdownModule } from '../components/dropdown/dropdown';
import { RadioButtonModule } from '../components/radiobutton/radiobutton';
import { SwitchModule } from '../components/switch/switch';
import { Atpardiv } from '../components/atpardiv/atpardiv';
import { AtParTextBoxComponent } from '../components/textbox/atpartextbox';
import { AtParTextComponent } from '../components/atpartext/atpartext';
import { AtParTextBoxEnableDisableComponent } from '../components/textbox/atpar-textbox-enable-disable.component';
import { AtParSharedDataService } from "../Shared/AtParSharedDataService";

//import { UserParametersComponent } from '../init/atpar-user-parameters.component';
//import { AtParCarrierInformationComponent } from '../init/atpar-carrier-information.component';
import { DragDropModule} from '../components/dragdrop/dragdrop'
//import { ReleaseOrdersComponent } from '../init/atpar-release-oder.component';

import { LeftBarAnimationService } from '../Home/leftbar-animation.service';

@NgModule({

    imports: [
        CommonModule,
        FormsModule,
        DoubleCalendarModule,
        CalendarModule,
        RadioButtonModule,
        DialogModule,
        ConfirmDialogModule,
        GrowlModule,
        DataTableModule,
        AtParDataTableModule,
        CustomTextBoxModule,
        AutoCompleteClientModule,
        AutoCompleteServerModule,
        TooltipModule,
        DropdownModule,
        SwitchModule,
        ReactiveFormsModule,
        DragDropModule

    ],

    declarations: [
        Tab,
        Tabs,
        RadioGroupComponent,
        DropDownComponent,
        Atpardiv,
        AtParTextBoxComponent,
        //UserParametersComponent,
        //AtParCarrierInformationComponent,
        //ReleaseOrdersComponent,
        AtParTextBoxEnableDisableComponent,
        AtParTextComponent
    ],

    exports: [
        CommonModule,
        FormsModule,
        DoubleCalendarModule,
        CalendarModule,
        RadioButtonModule,
        DialogModule,
        ConfirmDialogModule,
        GrowlModule,
        DataTableModule,
        AtParDataTableModule,
        CustomTextBoxModule,
        AutoCompleteClientModule,
        AutoCompleteServerModule,
        Tab,
        Tabs,
        RadioGroupComponent,
        DropDownComponent,
        TooltipModule,
        DropdownModule,
        SwitchModule,
        Atpardiv,
        AtParTextBoxComponent,
        //UserParametersComponent,
        //AtParCarrierInformationComponent,
        //ReleaseOrdersComponent,
        ReactiveFormsModule,
        AtParTextBoxEnableDisableComponent,
        AtParTextComponent,
        DragDropModule
    ],

    providers: [
        HttpService,
        DomHandler,
        AtParSharedDataService,
        LeftBarAnimationService
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