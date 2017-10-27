import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

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
import { PoNonPoReceiptsComponent} from './recv-po-nonpo-receipts.component';
import { ReleaseOrdersComponent } from './recv-release-orders.component';
import { SetupShipToIdsComponent } from './recv-setup-shiptoids.component';
import { UserParametersComponent} from './recv-user-parameters.component';



export const ReceivingImports = [ActivityReportComponent, AllocateInventoryBusinessUnitsComponent, AllocateShipToIdsComponent, AsnDiscrepancyReportComponent,
    CarrierInformationComponent, CarrierReportComponent, DailyActivityComponent, DailyUserActivityComponent, DeviationReportComponent, LotSerialTrackingReportComponent,
    ManageCarriersComponent, ParcelCountReportComponent, PoNonPoReceiptsComponent, ReleaseOrdersComponent, SetupShipToIdsComponent, UserParametersComponent]