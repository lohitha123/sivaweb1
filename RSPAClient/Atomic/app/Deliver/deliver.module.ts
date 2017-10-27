import { NgModule } from '@angular/core';


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

import { DeliverRoutingModule } from './deliver-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    imports: [
        DeliverRoutingModule,
        SharedModule
    ],
    declarations: [
        DeliverComponent,
        AllocateBusinessUnitsComponent,
        AllocateLocationGroupsComponent,
        AssignSignatoriesComponent,
        CarrierInformationComponent,
        DailyActivityComponent,
        DailyUserActivityComponent,
        DeliveryReportComponent,
        ExcludeLocationsComponent,
        ProductivityReportComponent,
        ReleasePackagesComponent,
        SetupDropOffLoactionsComponent,
        ShipToIdAllocationForDeliveryOfStockItemsComponent,
        UserParametersComponent
        
    ]
})

export class DeliverModule { }

