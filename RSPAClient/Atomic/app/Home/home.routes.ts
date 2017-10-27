
import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { HomeComponent } from './home.component';

import { BodyRoutes } from './Body/body.routes';

import {ForgotComponent} from '../forgotpassword/forgot.component';

import { ConfigurationManagerComponent } from '../Init/atpar-configuration-manager.component';
import { SetupVendorsComponent } from '../Init/atpar-setup-vendors.component';
import { SetupcostComponent } from '../Init/atpar-setup-cost-centers.component';
import { SetupItemsComponent } from '../Init/atpar-setup-items.component';
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

import {ReleaseOrdersComponent } from '../Receiving/recv-release-orders.component';
import { AllocateInventoryBusinessUnitsComponent } from '../Receiving/recv-allocate-inventory-business-units.component';
import { CarrierInformationComponent } from '../Receiving/recv-carrier-information.component';
import { AllocateShipToIdsComponent } from '../Receiving/recv-allocate-shiptoids.component';
import { ManageCarriersComponent } from '../Receiving/recv-manage-carriers.component';
import { SetupShipToIdsComponent } from '../Receiving/recv-setup-shiptoids.component';
import { PoNonPoReceiptsComponent } from '../Receiving/recv-po-nonpo-receipts.component';

//import { AllocateDestinationLocationsComponent } from '../StockIssue/stis-allocate-destination-locations.component';
import { AllocateDistributionTypesComponent } from '../StockIssue/stis-allocate-distribution-types.component';

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

export const HomeRoutes: Route[] = [
    {
        path: 'home', component: HomeComponent,
        children: [
            ...BodyRoutes,
            { path: 'AtPar', loadChildren: 'app/Init/atpar-init.module#AtparInitModule' },
            { path: 'forgot-password', component: ForgotComponent},
            { path: 'ConfigurationManager', component: ConfigurationManagerComponent },
            { path: 'SetUpVendors', component: SetupVendorsComponent },
            { path: 'SetupCostCenters', component: SetupcostComponent },
            { path: 'SetupItems', component: SetupItemsComponent },
            { path: 'ManageProfiles', component: ManageProfilesComponent },
            { path: 'ManageOrgGroups', component: ManageOrgGroupsComponent },
            { path: 'AddUser', component: AddUserComponent },
            { path: 'AssignProfiles', component: AssignProfilesComponent },
            { path: 'SecurityConfiguration', component: SecurityConfigurationComponent },
            { path: 'SetUpInventory', component: SetupInventoryComponent },
            { path: 'AuditSetup', component: AuditSetupComponent },
            { path: 'ManageTokens', component: ManageTokensComponent },
            { path: 'ManageUsers', component: ManageUsersComponent },
            { path: 'OrgParameters', component: OrgParametersComponent },
            { path: 'ImportUsers', component: ImportUsersComponent },
            { path: 'Maintainprinter', component: MaintainPrintersComponent },
            { path: 'ManageDevices', component: ManageDevicesComponent },
            { path: 'StationaryPrintDesign', component: StationaryPrintDesignComponent },
            { path: 'UserParameter', component: UserParametersComponent },
            { path: 'AllocateCart', component: AllocateCartsComponent },
            { path: 'CriticalItem', component: CriticalItemsComponent },
            { path: 'ProcessParameter', component: ProcessParametersComponent },
            { path: 'carrierinformation', component: CarrierInformationComponent },
            { path: 'releaseorders', component: ReleaseOrdersComponent },
            { path: 'allocateinventorybusinessunits', component: AllocateInventoryBusinessUnitsComponent },
           // { path: 'allocatedestinationlocations', component: AllocateDestinationLocationsComponent },
            { path: 'allocatedistributiontypes', component: AllocateDistributionTypesComponent },
            { path: 'createorders', component: CreateOrdersComponent },
            { path: 'SetupLocations', component: SetupLocationsComponent },
            { path: 'SetupStorageLocationGroups', component: SetupStorageLocationGroups },
            { path: 'SetupLocationGroups', component: SetupLocationGroupsComponent },
            { path: 'allocatebusinessunits', component: AllocateBusinessUnitsComponent },
            { path: 'ptyreleaseorders', component: PtyReleaseOrdersComponent },
            { path: 'ChangePassword', component: ChangePasswordComponent },
            { path: 'LocationGroupAllocation', component: LocationGroupsAllocationComponent },
            { path: 'AccessPermission', component: AccessPermissionComponent },
            { path: 'allocateshiptoids', component: AllocateShipToIdsComponent },
            { path: 'managecarriers', component: ManageCarriersComponent },
            { path: 'UserUploadAutomation', component: UserUploadAutomationComponent },
            { path: 'ProcessScheduler', component: ProcessScheduler },
            { path: 'DataArchival', component: DataArchival },
            { path: 'allocatelocationgroups', component: AllocateLocationGroupsComponent },
            { path: 'managedepartments', component: ManageDepartmentsComponent },
            { path: 'setupitemattributes', component: SetupItemAttributesComponent },
            { path: 'setupphysicians', component: SetupPhysiciansComponent },
            { path: 'setupprocedures', component: SetupProceduresComponent },
            { path: 'setupreasons', component: SetupReasonsComponent },
            { path: 'setupspecialty/service', component: SetupSpecialtyServiceComponent },
            { path: 'departmentdeviceallocation', component: DepartmentDeviceAllocationComponent },
            { path: 'allocateevents', component: AllocateEventsComponent },
            { path: 'splitevents', component: SplitEventsComponent },
            { path: 'setupshiptoids', component: SetupShipToIdsComponent },
            { path: 'departmentlocationallocation', component: DepartmentLocationAllocationComponent },
            { path: 'departmentuserallocation', component: DepartmentUserAllocationComponent },
            { path: 'setupdepartments', component: SetupDepartmentsComponent },   
            { path: 'processes', component: ProcessParamsComponent },
            { path: 'poucreateorders', component: POUCreateOrdersComponent },
            { path: 'manageparlocation', component: ManageParLocationComponent },
            { path: 'setupparlocations', component: SetupParLocationsComponent },
            { path: 'UserStatusReport', component: UserStatusReportComponent },
            { path: 'departmentlocationworkstationallocation', component: DepartmentLocationWorkstationAllocationComponent },
            { path: 'Tobininsetup', component: ToBinSetup },
            { path: 'assignsignatories', component: AssignSignatoriesComponent },
            { path: 'releasepackages', component: ReleasePackagesComponent },
            { path: 'setupdropofflocations', component: SetupDropOffLoactionsComponent },
            { path: 'shiptoidallocationfordeliveryofstockitems', component: ShipToIdAllocationForDeliveryOfStockItemsComponent }, 
            { path: 'maintainnoncartitems', component: MaintainNonCartItemsComponent },
            { path: 'managecases', component: ManageCasesComponent },
            { path: 'manageorders', component: ManageOrdersComponent },
            { path: 'releasecases', component: ReleaseCasesComponent },
            { path: 'reviewcharges/credits', component: ReviewChargesCreditsComponent },
            { path: 'allocatepickingzones', component: AllocatePickingZonesComponent },
            { path: 'orderprefix', component: OrderPrefixComponent },
            { path: 'pickallocateinventorybusinessunits', component: PickAllocateInventoryBusinessUnitsComponent }, 
            { path: 'allocatepriority', component: AllocatePriorityComponent }, 
            { path: 'pickreleaseorders', component: PickReleaseOrdersComponent },
            { path: 'pickallocatelocationgroups', component: PickAllocateLocationGroupsComponent },
            { path: 'processcounts', component: ProcessCountsComponent },
            { path: 'billonlyitemmaintenance', component: BillOnlyItemMaintenanceComponent },
            { path: 'poucriticalitems', component: POUCriticalItemsComponent },
            { path: 'preferencelists', component: PreferenceListsComponent },
            { path: 'setupcase', component: SetupCaseComponent },
            { path: 'paroptimizationreport', component: ParOptimizationReportComponent },
            { path: 'manageconsigneditemorderreport', component: ManageConsignedItemOrderReportComponent },
            { path: 'reviewcounts', component: ReviewCountsComponent },
            { path: 'po/nonporeceipts', component: PoNonPoReceiptsComponent },
            { path: 'chargereport', component: ChargeReportComponent },
            { path: 'checkinitems', component: CheckInComponent },
            { path: 'checkoutitems', component: CheckOutComponent },
            { path: 'dailyactivity', component: DailyActivityComponent },
            { path: 'dailyuseractivity', component: DailyUserActivityComponent },
            { path: 'deliveryaeport', component: DeliveryReportComponent },
            { path: 'destructionreport', component: DestructionReportComponent },
            { path: 'equipmenttrackingreport', component: EquipmentTrackingReportComponent },
            { path: 'inactivateitems', component: InactivateItemsComponent },
            { path: 'itemmasterreport', component: ItemMasterReportComponent },
            { path: 'manageequipmentitems', component: ManageEquipmentItemsComponent },
            { path: 'manageequipmenttype', component: ManageEquipmentTypeComponent },
            { path: 'managerequestor', component: ManageRequestorComponent },
            { path: 'newitemauditreport', component: NewItemAuditReportComponent },
            { path: 'setupreasoncodes', component: SetupReasonCodesComponent },
            { path: 'transactionreport', component: TransactionReportComponent },
            { path: 'createrequest', component: CreateRequestComponent },
            { path: 'viewcart', component: ViewCartComponent },
            { path: 'userprofile', component: UserprofileComponent },
            { path: 'requestorstatus', component: RequestorstatusComponent },
            { path: 'help', component: HelpComponent },
            { path: 'dashboard', component: DashComponent },
        ]
    }

]
