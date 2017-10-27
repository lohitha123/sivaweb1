import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

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




export const CartCountImports = [ActivityReportComponent, AllocateCartsComponent, CartAveragesReportsComponent,
    CartDetailReportComponent, CartPutawayReportComponent, CreateOrdersComponent, CreateRequisitionComponent,
    CriticalItemsComponent, DailyActivityComponent, DailyUserActivityComponent, ItemExceptionReportComponent,
    ItemUsageReportComponent, ManageOrdersComponent, ManageParLocationComponent, OptimizationReportComponent,
    OrderHistoryReportComponent, ParAuditReportComponent, ProcessParametersComponent, ScheduleComplianceReportComponent,
    SetupParLocationsComponent,UserParametersComponent,UserProductivityReportComponent
]; 