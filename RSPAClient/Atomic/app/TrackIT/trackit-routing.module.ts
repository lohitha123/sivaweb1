import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { TrackITComponent } from './trackit.component';

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

export const routes: Routes = [
    {
        path: '',
        component: TrackITComponent,
        children: [
            { path: 'allocatelocationgroups', component: AllocateLocationGroupsComponent },
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
            { path: 'managedepartments', component: ManageDepartmentsComponent },
            { path: 'manageequipmentitems', component: ManageEquipmentItemsComponent },
            { path: 'manageequipmenttype', component: ManageEquipmentTypeComponent },
            { path: 'managerequestor', component: ManageRequestorComponent },
            { path: 'newitemauditreport', component: NewItemAuditReportComponent },
            { path: 'setupreasoncodes', component: SetupReasonCodesComponent },
            { path: 'transactionreport', component: TransactionReportComponent },
            { path: 'createrequest', component: CreateRequestComponent  },
            { path: 'viewcart', component: ViewCartComponent },
            { path: 'userprofile', component: UserprofileComponent },
            { path: 'requestorstatus', component: RequestorstatusComponent },
            { path: 'help', component: RequestorstatusComponent },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class TrackITRoutingModule { }

