import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { CartCountComponent } from './cartcount.component';

import { ActivityReportComponent } from './cart-activity-report.component';
import { AllocateCartsComponent } from './cart-allocate-carts.component';
import { CartAveragesReportsComponent } from './cart-cart-averages-report.component';
import { CartDetailReportComponent } from './cart-cart-detail-report.component';
import { CartPutawayReportComponent } from './cart-cart-putaway-report.component';
import { CreateOrdersComponent } from './cart-create-orders.component';
import { CreateRequisitionComponent } from './cart-create-requisition.component';
import { CriticalItemsComponent } from './cart-critical-items.component';
import { DailyActivityComponent } from './cart-daily-activity.component';
import { DailyUserActivityComponent } from './cart-daily-user-activity.component';
import { ItemExceptionReportComponent } from './cart-item-exception-report.component';
import { ItemUsageReportComponent } from './cart-item-usage-report.component';
import { ManageOrdersComponent } from './cart-manage-orders.component';
import { ManageParLocationComponent } from './cart-manage-par-location.component';
import { OptimizationReportComponent } from './cart-optimization-report.component';
import { OrderHistoryReportComponent } from './cart-order-history-report.component';
import { ParAuditReportComponent } from './cart-par-audit-report.component';
import { ProcessParametersComponent } from './cart-process-parameters.component';
import { ScheduleComplianceReportComponent } from './cart-schedule-compliance-report.component';
import { SetupParLocationsComponent } from './cart-setup-par-locations.component';
import { UserParametersComponent } from './cart-user-parameters.component';
import { UserProductivityReportComponent } from './cart-user-productivity-report.component';
import { TwoBinAllocationComponent } from './cart-twobin-allocation.component';


export const routes: Routes = [
    {
        path: '',
        component: CartCountComponent,
        children: [
            { path: 'activityreport', component: ActivityReportComponent },
            { path: 'allocatecarts', component: AllocateCartsComponent },
            { path: 'cartaveragesreport', component: CartAveragesReportsComponent },
            { path: 'cartdetailreport', component: CartDetailReportComponent },
            { path: 'cartputawayreport', component: CartPutawayReportComponent },
            { path: 'createorders', component: CreateOrdersComponent },
            { path: 'criticalitems', component: CriticalItemsComponent },
            { path: 'dailyactivity', component: DailyActivityComponent },
            { path: 'dailyuseractivity', component: DailyUserActivityComponent },
            { path: 'itemexceptionreport', component: ItemExceptionReportComponent },
            { path: 'itemusagereport', component: ItemUsageReportComponent },
            { path: 'manageorders', component: ManageOrdersComponent },
            { path: 'manageparlocation', component: ManageParLocationComponent },
            { path: 'optimizationreport', component: OptimizationReportComponent },
            { path: 'orderhistoryreport', component: OrderHistoryReportComponent },
            { path: 'parauditreport', component: ParAuditReportComponent },
            { path: 'processparameters', component: ProcessParametersComponent },
            { path: 'schedulecompliancereport', component: ScheduleComplianceReportComponent },
            { path: 'setupparlocations', component: SetupParLocationsComponent },
            { path: 'userparameters', component: UserParametersComponent },
            { path: 'userproductivityreport', component: UserProductivityReportComponent },
            { path: 'twobinallocation', component: TwoBinAllocationComponent }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CartCountRoutingModule { }

