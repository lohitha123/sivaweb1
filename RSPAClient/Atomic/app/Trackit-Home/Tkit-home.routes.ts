
import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { TkitHomeComponent } from './Tkit-home.component';

import { BodyRoutes } from './Tkit-Body/body.routes';

import {ForgotComponent} from '../forgotpassword/forgot.component';

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
import { DashComponent } from '../TrackIT/tkit-dashboard.component';


export const TkitHomeRoutes: Route[] = [
    {
        path: 'trackithome', component: TkitHomeComponent,
        children: [
            ...BodyRoutes,
            { path: 'AtPar', loadChildren: 'app/Init/atpar-init.module#AtparInitModule' },
            { path: 'forgot-password', component: ForgotComponent},            
            { path: 'allocatelocationgroups', component: AllocateLocationGroupsComponent },
            { path: 'managedepartments', component: ManageDepartmentsComponent },            
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
            { path: 'dashboard', component: DashComponent },
        ]
    }

]
