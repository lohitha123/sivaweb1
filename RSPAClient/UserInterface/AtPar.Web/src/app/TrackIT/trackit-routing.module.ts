import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


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

export const routes: Routes = [
    {
        path: '',
        component: TrackITComponent,
        children: [
            { path: 'allocatelocationgroups', component: AllocateLocationGroupsComponent },
            { path: 'chargereport', component: ChargeReportComponent },
            { path: 'checkinitems', component: CheckIn_CheckOutComponent },
            { path: 'checkoutitems', component: CheckOutComponent },
            { path: 'dailyactivity', component: DailyActivityComponent },
            { path: 'dailyuseractivity', component: DailyUserActivityComponent },
            { path: 'deliveryreport', component: DeliveryReportComponent },
            { path: 'destructionreport', component: DestructionReportComponent },
            { path: 'equipmenttrackingreport', component: EquipmentTrackingReportComponent },
            { path: 'inactivateitems', component: InactivateItemsComponent },
            { path: 'itemmasterreport', component: ItemMasterReportComponent },
            { path: 'managedepartments', component: ManageDepartmentsComponent },
            { path: 'manageequipmentitems', component: ManageEquipmentItemsComponent },
            { path: 'manageequipmenttype', component: ManageEquipmentTypeComponent },
            {
                path: 'managerequestor', component: ManageRequestorComponent,
                children: [
                    { path: '', component: ManageRequestorHomeComponent },
                    { path: 'addormodify', component: ManageRequestorModifyComponent }
                ]
            },
            { path: 'newitemauditreport', component: NewItemAuditReportComponent },
            { path: 'setupreasoncodes', component: SetupReasonCodesComponent },
            { path: 'transactionreport', component: TransactionReportComponent },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class TrackITRoutingModule { }

