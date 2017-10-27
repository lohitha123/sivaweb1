import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AllocateLocationGroupsComponent } from './tkit-allocate-location-groups.component';
import { ChargeReportComponent } from './tkit-charge-report.component';
import { CheckInComponent } from './tkit-check-in.component';
import { CheckOutComponent } from './tkit-check-out.component';
import { DailyActivityComponent } from './tkit-daily-activity.component';
import { DailyUserActivityComponent } from './tkit-daily-user-activity.component';
import { DeliveryReportComponent } from './tkit-delivery-report.component';
import { DestructionReportComponent } from './tkit-destruction-report.component';
import { EquipmentTrackingReportComponent } from './tkit-equipment-tracking-report.component';
import { InactivateItemsComponent } from './tkit-inactivate-items.component';
import { ItemMasterReportComponent } from './tkit-item-master-report.component';
import { ManageDepartmentsComponent } from './tkit-manage-departments.component';
import { ManageEquipmentItemsComponent } from './tkit-manage-equipment-items.component';
import { ManageEquipmentTypeComponent } from './tkit-manage-equipment-type.component';
import { ManageRequestorComponent } from './tkit-manage-requestor.component';
import { NewItemAuditReportComponent } from './tkit-newitem-audit-report.component';
import { SetupReasonCodesComponent } from './tkit-setup-reason-codes.component';
import { TransactionReportComponent } from './tkit-transaction-report.component';
import { CreateRequestComponent } from './tkit-create-request.component';
import { ViewCartComponent } from './tkit-view-cart.component';
import { UserprofileComponent } from './tkit-user-profile.component';
import { RequestorstatusComponent } from './tkit-requestor-status.component';
import { HelpComponent } from './tkit-help.component';
import { DashComponent } from './tkit-dashboard.component';


export const TrackITImports = [AllocateLocationGroupsComponent, ChargeReportComponent, CheckOutComponent, CheckInComponent,
    DailyActivityComponent, DailyUserActivityComponent, DeliveryReportComponent, DestructionReportComponent,
    EquipmentTrackingReportComponent, InactivateItemsComponent, ItemMasterReportComponent, ManageDepartmentsComponent,
    ManageEquipmentItemsComponent, ManageEquipmentTypeComponent, ManageRequestorComponent, NewItemAuditReportComponent, 
    SetupReasonCodesComponent, TransactionReportComponent, CreateRequestComponent, ViewCartComponent, RequestorstatusComponent, UserprofileComponent, HelpComponent, DashComponent


];