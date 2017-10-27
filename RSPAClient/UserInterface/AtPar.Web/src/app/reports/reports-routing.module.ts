import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReportsComponent } from './reports.component';


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
import { viewDashboardComponent } from './viewDashboard';
import { DashboardViewer } from './dashboardviewer.component';
import { CustomReportComponent } from './customreport';

export const routes: Routes = [
    {
        path: '',
        component: ReportsComponent,
        children: [
            { path: 'dashboarddesigner', component: DashboardDesignerComponent },
            { path: 'settings', component: SettingsComponent },            
            { path: 'reportdesigner', component: ReportDesignerComponent },
            { path: 'report', component: ReportComponent },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'reportcustomfilter', component: ReportCustomFilterComponent },
            { path: 'reportpart', component: ReportPartComponent },
            { path: 'reportviewer', component: ReportViewerComponent },
            //{ path: 'viewer/reportpart/:id', component: ExportReportComponent }, 
            { path: 'viewreport', component: ViewReportComponent }, 
            //{ path: 'report/view/:id', component: ExportReportViewerComponent },  
            //{ path: 'dashboard/view/:id', component: ExportDashboardViewerComponent },  
            { path: 'ViewPouReport', component: ViewPouReport },  
            { path: 'viewDashboard', component: viewDashboardComponent }, 
            { path: 'dashboardviewer', component: DashboardViewer },
            { path: 'customreport/:id', component: CustomReportComponent }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ReportsRoutingModule { }

