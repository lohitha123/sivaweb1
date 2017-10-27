import { NgModule } from '@angular/core';


import { TrackITComponent } from './trackit.component';


import { AllocateLocationGroupsComponent } from './tkit-allocate-location-groups.component';
import { ChargeReportComponent } from './tkit-charge-report.component';
import { CheckIn_CheckOutComponent } from './tkit-check-in_check-out.component';
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
import { ManageRequestorHomeComponent } from './tkit-manage-requestor-home.component';
import { ManageRequestorModifyComponent } from './tkit-manage-requestor-modify.component';
import { ManageRequestorComponent } from './tkit-manage-requestor.component';
import { NewItemAuditReportComponent } from './tkit-newitem-audit-report.component';
import { SetupReasonCodesComponent } from './tkit-setup-reason-codes.component';
import { TransactionReportComponent } from './tkit-transaction-report.component';

import { TrackITRoutingModule } from './trackit-routing.module';
import { SharedModule } from '../Shared/shared.module';


@NgModule({
    imports: [
        TrackITRoutingModule,
        SharedModule
    ],
    declarations: [
        TrackITComponent,
        AllocateLocationGroupsComponent,
        ChargeReportComponent,
        CheckIn_CheckOutComponent,
        CheckOutComponent,
        DailyActivityComponent,
        DailyUserActivityComponent,
        DeliveryReportComponent,
        DestructionReportComponent,
        EquipmentTrackingReportComponent,
        InactivateItemsComponent,
        ItemMasterReportComponent,
        ManageDepartmentsComponent,
        ManageEquipmentItemsComponent,
        ManageEquipmentTypeComponent,
        ManageRequestorComponent,
        ManageRequestorHomeComponent,
        ManageRequestorModifyComponent,
        NewItemAuditReportComponent,
        SetupReasonCodesComponent,
        TransactionReportComponent
    ]
})

export class TrackITModule { }

