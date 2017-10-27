import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliverComponent } from './deliver.component';
import { AllocateBusinessUnitsComponent } from './deliver-allocate-business-units.component';
import { AllocateLocationGroupsComponent } from './deliver-allocate-location-groups.component';
import { AssignSignatoriesComponent } from './deliver-assign-signatories.component';
import { CarrierInformationComponent } from './deliver-carrier-information.component';
import { DailyActivityComponent } from './deliver-daily-activity.component';
import { DailyUserActivityComponent } from './deliver-daily-user-activity.component';
import { DeliveryReportComponent } from './deliver-delivery-report.component';
import { ExcludeLocationsComponent } from './deliver-exclude-locations.component';
import { ProductivityReportComponent } from './deliver-productivity-report.component';
import { ReleasePackagesComponent } from './deliver-release-packages.component';
import { SetupDropOffLoactionsComponent } from './deliver-setup-drop-off-locations.component';
import { ShipToIdAllocationForDeliveryOfStockItemsComponent } from './deliver-shiptoid-allocation-for-delivery-of-stock-items.component';
import { UserParametersComponent } from './deliver-user-parameters.component';


export const routes: Routes = [
    {
        path: '',
        component: DeliverComponent,
        children: [
            { path: 'allocatebusinessunits', component: AllocateBusinessUnitsComponent },
            { path: 'allocatelocationgroups', component: AllocateLocationGroupsComponent },
            { path: 'assignsignatories', component: AssignSignatoriesComponent },
            { path: 'carrierinformation', component: CarrierInformationComponent },
            { path: 'dailyactivity', component: DailyActivityComponent },
            { path: 'dailyuserActivity', component: DailyUserActivityComponent },
            { path: 'deliveryreport', component: DeliveryReportComponent },
            { path: 'excludelocations', component: ExcludeLocationsComponent },
            { path: 'productivityreport', component: ProductivityReportComponent },
            { path: 'releasepackages', component: ReleasePackagesComponent },
            { path: 'setupdropofflocations', component: SetupDropOffLoactionsComponent },
            { path: 'shiptoidallocationfordeliveryofstockitems', component: ShipToIdAllocationForDeliveryOfStockItemsComponent },
            { path: 'userparameters', component: UserParametersComponent },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DeliverRoutingModule { }

