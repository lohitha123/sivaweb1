import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
//import { MdInputModule, MdNativeDateModule} from '@angular/material/typings';
//import { RippleDirective } from 'ng2-ripple-directive';

import { BodyModule } from './Body/body.module';

import { HomeComponent } from './home.component';
import { ModalComponent } from '../components/modal/modal';
import { DialogModule } from '../components/dialog/dialog';
import { TopBarComponent } from './Top/topbar.component';
import {ForgotComponent} from '../forgotpassword/forgot.component';

import { Tabs } from '../components/tabcomponent/tabs';
import { Tab } from '../components/tabcomponent/tab';
import { SwitchModule } from '../components/switch/switch';
import { ConfirmDialogModule } from '../components/confirmdialog/confirmdialog';
import { DropdownModule } from '../components/dropdown/dropdown';
import { DropdownpModule } from '../components/dropdownp/dropdownp';
import { RadioButtonModule } from '../components/radiobutton/radiobutton';
import {AtParDataTableModule} from '../components/datatable/datatable';
import { TooltipModule } from '../components/tooltip/tooltip';
import { GrowlModule } from '../components/growl/growl';
import { AccordionModule } from '../components/accordion/accordion';
import {InputSwitchModule} from '../components/inputswitch/inputswitch';
import { CalendarModule } from '../components/calendar/calendar';
import { DoubleCalendarModule } from '../components/doublecalendar/doublecalendar';
import { AutoCompleteClientModule } from '../components/autocomplete/autocomplete-client/autocomplete-client';
import { AtParTextComponent } from '../components/atpartext/atpartext';

import { ConfigurationManagerComponent } from '../Init/atpar-configuration-manager.component';
import { SetupVendorsComponent } from '../Init/atpar-setup-vendors.component';
import { SetupItemsComponent } from '../Init/atpar-setup-items.component';
import { SetupcostComponent } from '../Init/atpar-setup-cost-centers.component';
import { ManageProfilesComponent } from '../Init/atpar-manage-profiles.component';
import { ManageOrgGroupsComponent } from '../Init/atpar-manage-org-groups.component';
import { AddUserComponent } from '../Init/atpar-add-user.component';
import { AssignProfilesComponent } from '../Init/atpar-assign-profiles.component';
import { SecurityConfigurationComponent } from '../Init/atpar-security-configuration.component';
import { SetupInventoryComponent } from '../Init/atpar-setup-inventory.component';
import { AuditSetupComponent } from '../Init/atpar-audit-setup.component';
import { ManageTokensComponent } from '../Init/atpar-manage-tokens.component';
import { ManageUsersComponent } from '../Init/atpar-manage-users.component';
import { OrgParametersComponent } from '../Init/atpar-org-parameters.component';
import { ImportUsersComponent } from '../Init/atpar-import-users.component';
import { MaintainPrintersComponent } from '../Init/atpar-maintain-printers.component';
import { ManageDevicesComponent } from '../Init/atpar-manage-devices.component';
import {StationaryPrintDesignComponent} from '../Init/atpar-stationary-print-design.component';
import { SetupLocationsComponent } from '../Init/atpar-setup-locations.component';
import { SetupStorageLocationGroups } from '../Init/atpar-setup-storage-location-groups.component';
import { SetupLocationGroupsComponent } from '../Init/atpar-setup-location-groups.component';
import { ChangePasswordComponent } from '../Init/atpar-change-password.component';
import { UserUploadAutomationComponent } from '../Init/atpar-user-upload-automation.component';
import { ProcessScheduler } from '../Init/atpar-process-scheduler.component';
import { DataArchival } from '../Init/atpar-data-archival.component';
import { UserStatusReportComponent } from '../Init/atpar-user-status-report.component';

import { UserParametersComponent } from '../CartCount/cart-user-parameters.component';
import { AllocateCartsComponent } from '../CartCount/cart-allocate-carts.component';
import { CriticalItemsComponent } from '../CartCount/cart-critical-items.component';
import { ProcessParametersComponent } from '../CartCount/cart-process-parameters.component';
import { CreateOrdersComponent } from '../CartCount/cart-create-orders.component';
import { ToBinSetup } from '../CartCount/cart-2bin-setup.component';

import { AllocateDistributionTypesComponent } from '../StockIssue/stis-allocate-distribution-types.component';

import { CarrierInformationComponent } from '../Receiving/recv-carrier-information.component';
import { ReleaseOrdersComponent } from '../Receiving/recv-release-orders.component';
import { AllocateInventoryBusinessUnitsComponent } from '../Receiving/recv-allocate-inventory-business-units.component';
import { AllocateShipToIdsComponent } from '../Receiving/recv-allocate-shiptoids.component';
import { ManageCarriersComponent } from '../Receiving/recv-manage-carriers.component';
import { SetupShipToIdsComponent } from '../Receiving/recv-setup-shiptoids.component';
import { PoNonPoReceiptsComponent } from '../Receiving/recv-po-nonpo-receipts.component';

import { AllocateBusinessUnitsComponent } from '../Putaway/ptwy-allocate-business-units.component';
import { PtyReleaseOrdersComponent } from '../Putaway/ptwy-release-orders.component';

import { LocationGroupsAllocationComponent } from '../AssetManagement/asmt-location-groups-allocation.component';
import { AccessPermissionComponent } from '../AssetManagement/asmt-access-permission.component';

import { AllocateLocationGroupsComponent } from '../TrackIT/tkit-allocate-location-groups.component';
import { ManageDepartmentsComponent } from '../TrackIT/tkit-manage-departments.component';
import { ChargeReportComponent } from '../TrackIT/tkit-charge-report.component';
import { CheckInComponent } from '../TrackIT/tkit-check-in.component';
import { CheckOutComponent } from '../TrackIT/tkit-check-out.component';
import { DailyActivityComponent } from '../TrackIT/tkit-daily-activity.component';
import { DailyUserActivityComponent } from '../TrackIT/tkit-daily-user-activity.component';
import { DeliveryReportComponent } from '../TrackIT/tkit-delivery-report.component';
import { DestructionReportComponent } from '../TrackIT/tkit-destruction-report.component';
import { EquipmentTrackingReportComponent } from '../TrackIT/tkit-equipment-tracking-report.component';
import { InactivateItemsComponent } from '../TrackIT/tkit-inactivate-items.component';
import { ItemMasterReportComponent } from '../TrackIT/tkit-item-master-report.component';
import { ManageEquipmentItemsComponent } from '../TrackIT/tkit-manage-equipment-items.component';
import { ManageEquipmentTypeComponent } from '../TrackIT/tkit-manage-equipment-type.component';
import { ManageRequestorComponent } from '../TrackIT/tkit-manage-requestor.component';
import { NewItemAuditReportComponent } from '../TrackIT/tkit-newitem-audit-report.component';
import { SetupReasonCodesComponent } from '../TrackIT/tkit-setup-reason-codes.component';
import { TransactionReportComponent } from '../TrackIT/tkit-transaction-report.component';
import { CreateRequestComponent } from '../TrackIT/tkit-create-request.component';
import { ViewCartComponent } from '../TrackIT/tkit-view-cart.component';
import { UserprofileComponent } from '../TrackIT/tkit-user-profile.component';
import { RequestorstatusComponent } from '../TrackIT/tkit-requestor-status.component';
import { HelpComponent } from '../TrackIT/tkit-help.component';
import { DashComponent } from '../TrackIT/tkit-dashboard.component';

import { DepartmentDeviceAllocationComponent } from '../PointOfUse/pou-department-device-allocation.component';
import { SetupItemAttributesComponent } from '../PointOfUse/pou-setup-item-attributes.component';
import { SetupPhysiciansComponent } from '../PointOfUse/pou-setup-physicians.component';
import { SetupProceduresComponent } from '../PointOfUse/pou-setup-procedures.component';
import { SetupReasonsComponent } from '../PointOfUse/pou-setup-reasons.component';
import { SetupSpecialtyServiceComponent } from '../PointOfUse/pou-setup-specialty-services.component';
import { DepartmentUserAllocationComponent } from '../PointOfUse/pou-department-user-allocation.component';
import { DepartmentLocationAllocationComponent } from '../PointOfUse/pou-department-loaction-allocation.component';
import { SetupDepartmentsComponent } from '../PointOfUse/pou-setup-departments.component';
import { ProcessParamsComponent } from '../PointOfUse/pou-process-parameters.component';
import { POUCreateOrdersComponent } from '../PointOfUse/pou-create-orders.component';
import { SetupParLocationsComponent } from '../PointOfUse/pou-setup-par-locations.component';
import { ManageParLocationComponent } from '../PointOfUse/pou-manage-par-location.component';
import { DepartmentLocationWorkstationAllocationComponent } from '../PointOfUse/pou-department-location-workstation-allocation.component';
import { ReleaseCasesComponent } from '../PointOfUse/pou-release-cases.component';
import { ReviewChargesCreditsComponent } from '../PointOfUse/pou-review-charges-credits.component';
import { ManageCasesComponent } from '../PointOfUse/pou-manage-cases.component';
import { ManageOrdersComponent } from '../PointOfUse/pou-manage-orders.component';
import { MaintainNonCartItemsComponent } from '../PointOfUse/pou-maintain-non-cart-items.component';
import { POUCriticalItemsComponent } from '../PointOfUse/pou-critical-items.component';
import { SetupCaseComponent } from '../PointOfUse/pou-setup-case.component';
import { BillOnlyItemMaintenanceComponent } from '../PointOfUse/pou-bill-only-item-maintenance.component';
import { PreferenceListsComponent } from '../PointOfUse/pou-preference-lists.component';
import { ManageConsignedItemOrderReportComponent } from '../PointOfUse/pou-manage-cosigned-item-order-report.componenet';
import { ParOptimizationReportComponent } from '../PointOfUse/pou-par-optimization-report.component';

import { AllocateEventsComponent } from '../CycleCount/cyct-allocate-events.component';
import { SplitEventsComponent } from '../CycleCount/cyct-split-events.component';
import { ProcessCountsComponent } from '../CycleCount/cyct-process-counts.component';
import { ReviewCountsComponent } from '../CycleCount/cyct-review-counts.components';

import { AssignSignatoriesComponent } from '../Deliver/deliver-assign-signatories.component';
import { ReleasePackagesComponent } from '../Deliver/deliver-release-packages.component';
import { SetupDropOffLoactionsComponent } from '../Deliver/deliver-setup-drop-off-locations.component';
import { ShipToIdAllocationForDeliveryOfStockItemsComponent } from '../Deliver/deliver-shiptoid-allocation-for-delivery-of-stock-items.component';

import { AllocatePickingZonesComponent } from '../Pick/pick-allocate-picking-zones.component';
import { OrderPrefixComponent } from '../Pick/pick-order-prefix.component';
import { AllocatePriorityComponent } from '../Pick/pick-allocate-priority.component';
import { PickAllocateInventoryBusinessUnitsComponent } from '../Pick/pick-allocate-inventory-business-units.componet';
import { PickReleaseOrdersComponent } from '../Pick/pick-release-orders.component';
import {PickAllocateLocationGroupsComponent} from '../Pick/pick-allocate-location-groups.component';

@NgModule({

    imports: [
        CommonModule,
        FormsModule,
        BodyModule,
        RouterModule,
        SwitchModule,
        DialogModule,
        ConfirmDialogModule,
        DropdownModule,
        DropdownpModule,
        RadioButtonModule,
        AtParDataTableModule,
        TooltipModule,
        GrowlModule,
        CalendarModule,
        DoubleCalendarModule,
        AutoCompleteClientModule,
        InputSwitchModule,
        AccordionModule,
        ReactiveFormsModule,
    ],

    declarations: [
        HomeComponent,
        ModalComponent,
        TopBarComponent,
        AllocateLocationGroupsComponent,
        ManageDepartmentsComponent,
        AtParTextComponent,
        ConfigurationManagerComponent,
        SetupVendorsComponent,
        SetupcostComponent,
        SetupItemsComponent,
        ManageProfilesComponent,
        ManageOrgGroupsComponent,
        AddUserComponent,
        AssignProfilesComponent,
        SecurityConfigurationComponent,
        SetupInventoryComponent,
        AuditSetupComponent,
        ManageTokensComponent,
        ManageUsersComponent,
        OrgParametersComponent,
        ImportUsersComponent,
        MaintainPrintersComponent,
        ManageDevicesComponent,
        StationaryPrintDesignComponent,
        UserParametersComponent,
        AllocateCartsComponent,
        CriticalItemsComponent,
        ProcessParametersComponent,
        CreateOrdersComponent,
        CarrierInformationComponent,
        ReleaseOrdersComponent,
        AllocateInventoryBusinessUnitsComponent,
        AllocateDistributionTypesComponent,
        SetupLocationsComponent,
        SetupStorageLocationGroups,
        SetupLocationGroupsComponent,
        AllocateBusinessUnitsComponent,
        PtyReleaseOrdersComponent,
        LocationGroupsAllocationComponent,
        AccessPermissionComponent,
        ChangePasswordComponent,
        AllocateShipToIdsComponent,
        ManageCarriersComponent,
        UserUploadAutomationComponent,
        ProcessScheduler,
        DataArchival,
        SetupItemAttributesComponent,
        SetupPhysiciansComponent,
        SetupReasonsComponent,
        DepartmentDeviceAllocationComponent,
        SetupProceduresComponent,
        SetupSpecialtyServiceComponent,
        AllocateEventsComponent,
        SplitEventsComponent,
        SetupShipToIdsComponent,
        DepartmentUserAllocationComponent,
        DepartmentLocationAllocationComponent,
        SetupDepartmentsComponent,
        ProcessParamsComponent,
        POUCreateOrdersComponent,
        SetupParLocationsComponent,
        ManageParLocationComponent,
        UserStatusReportComponent,
        DepartmentLocationWorkstationAllocationComponent,
        ToBinSetup,
        AssignSignatoriesComponent,
        ShipToIdAllocationForDeliveryOfStockItemsComponent,
        SetupDropOffLoactionsComponent,
        ReleasePackagesComponent,
        ReleaseCasesComponent,
        ReviewChargesCreditsComponent,
        ManageCasesComponent,
        ManageOrdersComponent,
        MaintainNonCartItemsComponent,
        ForgotComponent,
        AllocatePickingZonesComponent,
        OrderPrefixComponent,
        PickAllocateInventoryBusinessUnitsComponent,
        AllocatePriorityComponent,
        PickReleaseOrdersComponent,
        PickAllocateLocationGroupsComponent,
        ProcessCountsComponent,
        POUCriticalItemsComponent,
        SetupCaseComponent,
        BillOnlyItemMaintenanceComponent,
        PreferenceListsComponent,
        ManageConsignedItemOrderReportComponent,
        ParOptimizationReportComponent,
        ReviewCountsComponent,
        PoNonPoReceiptsComponent,
        ChargeReportComponent,
        CheckInComponent,
        CheckOutComponent,
        DailyActivityComponent,
        DailyUserActivityComponent,
        DeliveryReportComponent,
        DestructionReportComponent,
        EquipmentTrackingReportComponent,
        InactivateItemsComponent,
        ItemMasterReportComponent,
        ManageEquipmentItemsComponent,
        ManageEquipmentTypeComponent,
        ManageRequestorComponent,
        NewItemAuditReportComponent,
        SetupReasonCodesComponent,
        TransactionReportComponent,
        CreateRequestComponent,
        ViewCartComponent,
        UserprofileComponent,
        RequestorstatusComponent,
        HelpComponent,
        DashComponent,
        Tab,
        Tabs
       
    ],
    exports: [
        HomeComponent,
        TopBarComponent,
    ]
})

export class HomeModule { }
