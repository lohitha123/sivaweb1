import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceivingComponent } from './recv.component';
import { ActivityReportComponent } from './recv-activity-report.component';
import { AllocateInventoryBusinessUnitsComponent } from './recv-allocate-inventory-business-units.component';
import { AllocateShipToIdsComponent } from './recv-allocate-shiptoids.component';
import { AsnDiscrepancyReportComponent } from './recv-asn-discrepancy-report.component';
import { CarrierInformationComponent } from './recv-carrier-information.component';
import { CarrierReportComponent } from './recv-carrier-report.component';
import { DailyActivityComponent } from './recv-daily-activity.component';
import { DailyUserActivityComponent } from './recv-daily-user-activity.component';
import { DeviationReportComponent } from './recv-deviation-report.component';
import { LotSerialTrackingReportComponent } from './recv-lot-serial-tracking-report.component';
import { ManageCarriersComponent } from './recv-manage-carriers.component';
import { ParcelCountReportComponent } from './recv-parcel-count-report.component';
import { PoNonPoReceiptsComponent } from './recv-po-nonpo-receipts.component';
import { ReleaseOrdersComponent } from './recv-release-orders.component';
import { SetupShipToIdsComponent } from './recv-setup-shiptoids.component';
import { UserParametersComponent } from './recv-user-parameters.component';

export const routes: Routes = [
    {
        path: '', component: ReceivingComponent,
        children: [
            { path: 'activityreport', component: ActivityReportComponent },
            { path: 'allocateinventorybusinessunits', component: AllocateInventoryBusinessUnitsComponent },
            { path: 'allocateshiptoids', component: AllocateShipToIdsComponent },
            { path: 'asndiscrepancyreport', component: AsnDiscrepancyReportComponent },
            { path: 'carrierinformation', component: CarrierInformationComponent },
            { path: 'dailyactivity', component: DailyActivityComponent },
            { path: 'dailyuseractivity', component: DailyUserActivityComponent },
            { path: 'deviationreport', component: DeviationReportComponent },
            { path: 'lot/serialtrackingreport', component: LotSerialTrackingReportComponent },
            { path: 'managecarriers', component: ManageCarriersComponent },
            { path: 'parcelcountreport', component: ParcelCountReportComponent },
            { path: 'po/nonporeceipts', component: PoNonPoReceiptsComponent },
            { path: 'releaseorders', component: ReleaseOrdersComponent },
            { path: 'setupshiptoids', component: SetupShipToIdsComponent },
            { path: 'userparameters', component: UserParametersComponent },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ReceivingRoutingModule { }