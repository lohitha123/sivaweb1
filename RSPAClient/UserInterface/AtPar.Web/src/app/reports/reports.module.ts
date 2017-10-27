import { NgModule } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { ReportsRoutingModule } from './reports-routing.module';
import { SharedModule } from '../Shared/shared.module';

import { ReportViewerComponent } from './reportviewer.component';
import { DashboardDesignerComponent } from './dashboarddesigner.component';
import { SettingsComponent } from './reportsetting.component';
import { ReportDesignerComponent } from './reportdesigner.component';
import { ReportComponent } from './reportlist.component';
import { DashboardComponent } from './dashboard.component';
import { ReportCustomFilterComponent } from './reportcustomfilter.component';
import { ReportPartComponent } from './reportpart.component';
//import { ExportReportComponent } from './export.component';
import { ViewReportComponent } from './viewreport';
//import { ExportReportComponent, ExportReportViewerComponent, ExportDashboardViewerComponent } from '../export/index';
import { ViewPouReport } from './ViewPouReport';
import { CustomReportComponent } from './customreport';
import { viewDashboardComponent } from './viewDashboard';
import { DashboardViewer } from './dashboardviewer.component';
import { IzendaIntegrate } from "../_helpers/izendaintegrate";
import { UrlSerializer } from "@angular/router";
import { CustomUrlSerializer } from "../_helpers/customurlserializer";

@NgModule({
    imports: [
        ReportsRoutingModule,
        SharedModule
    ],
    declarations: [
        ReportsComponent,
        ReportDesignerComponent,
        SettingsComponent,
        ReportComponent,
        ReportViewerComponent,
        DashboardComponent,
        DashboardDesignerComponent,     
        ReportCustomFilterComponent,
        ReportPartComponent,     
        ViewReportComponent,      
        ViewPouReport,
        viewDashboardComponent,
        DashboardViewer,
        CustomReportComponent
    ],
    providers: [
        IzendaIntegrate,
        { provide: UrlSerializer, useClass: CustomUrlSerializer }
    ]
})

export class ReportsModule { }
